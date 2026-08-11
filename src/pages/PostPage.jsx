import { useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import Header from "../components/Header.jsx";
import PostMedia from "../components/PostMedia.jsx";
import { usePosts } from "../context/PostsContext.jsx";
import { getUser, avatarFor, CURRENT_USERNAME } from "../data/mockData.js";
import { commentsFor } from "../data/mockData.js";
import { timeAgo } from "../utils/time.js";
import "./PostPage.css";

export default function PostPage() {
  const { id } = useParams();
  const { getPost, toggleLike, incrementComments } = usePosts();
  const post = getPost(id);
  const [comments, setComments] = useState(() => commentsFor(id));
  const [draft, setDraft] = useState("");

  if (!post) return <Navigate to="/" replace />;

  const user = getUser(post.username);

  function submitComment(e) {
    e.preventDefault();
    const text = draft.trim();
    if (!text) return;
    setComments((prev) => [
      ...prev,
      { id: `${id}-local-${prev.length}`, username: CURRENT_USERNAME, text, createdAt: new Date().toISOString() },
    ]);
    incrementComments(id);
    setDraft("");
  }

  return (
    <>
      <Header title="Пост" showBack />
      <main className="post-page container">
        <article className="post-page__post">
          <Link to={`/profile/${post.username}`} className="post-page__who">
            <img className="post-page__avatar" src={avatarFor(post.username)} alt="" />
            <span className="post-page__names">
              <span className="post-page__name">{user?.name || post.username}</span>
              <span className="post-page__handle">@{post.username}</span>
            </span>
          </Link>

          {post.text && <p className="post-page__text">{post.text}</p>}
          {post.image && <PostMedia image={post.image} nsfw={post.nsfw} />}

          <time className="post-page__time" dateTime={post.createdAt}>
            {timeAgo(post.createdAt)} назад
          </time>

          <div className="post-page__actions">
            <button
              type="button"
              className={`post-page__like${post.liked ? " is-liked" : ""}`}
              onClick={() => toggleLike(post.id)}
              aria-pressed={post.liked}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill={post.liked ? "currentColor" : "none"}>
                <path
                  d="M12 20.5S3 15 3 8.9C3 5.9 5.4 3.5 8.4 3.5C10.2 3.5 11.4 4.5 12 5.2C12.6 4.5 13.8 3.5 15.6 3.5C18.6 3.5 21 5.9 21 8.9C21 15 12 20.5 12 20.5Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
              </svg>
              <span>Нравится · {post.likes}</span>
            </button>
          </div>
        </article>

        <section className="post-page__comments" aria-label="Комментарии">
          <h2 className="post-page__comments-title">Комментарии · {comments.length}</h2>
          {comments.map((c) => {
            const cu = getUser(c.username);
            return (
              <div className="comment" key={c.id}>
                <img className="comment__avatar" src={avatarFor(c.username)} alt="" />
                <div className="comment__body">
                  <div className="comment__meta">
                    <span className="comment__name">{cu?.name || c.username}</span>
                    <time className="comment__time" dateTime={c.createdAt}>
                      {timeAgo(c.createdAt)}
                    </time>
                  </div>
                  <p className="comment__text">{c.text}</p>
                </div>
              </div>
            );
          })}
        </section>

        <form className="comment-form" onSubmit={submitComment}>
          <img className="comment-form__avatar" src={avatarFor(CURRENT_USERNAME)} alt="" />
          <input
            className="comment-form__input"
            placeholder="Комментарий…"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            aria-label="Новый комментарий"
          />
          <button type="submit" className="btn btn--primary comment-form__submit" disabled={!draft.trim()}>
            Отправить
          </button>
        </form>
      </main>
    </>
  );
}
