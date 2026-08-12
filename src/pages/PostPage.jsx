import { useRef, useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import Header from "../components/Header.jsx";
import PostMedia from "../components/PostMedia.jsx";
import PostActions from "../components/PostActions.jsx";
import QuotedPost from "../components/QuotedPost.jsx";
import { useStore } from "../context/StoreContext.jsx";
import { renderRichText } from "../utils/richText.jsx";
import { timeAgoLong, timeAgo } from "../utils/time.js";
import "./PostPage.css";

export default function PostPage() {
  const { id } = useParams();
  const { getPost, getUser, avatarFor, getComments, addComment, currentUsername } = useStore();
  const post = getPost(id);
  const [draft, setDraft] = useState("");
  const commentInputRef = useRef(null);

  if (!post) return <Navigate to="/" replace />;

  const user = getUser(post.username);
  const comments = getComments(id);

  function submitComment(e) {
    e.preventDefault();
    const text = draft.trim();
    if (!text) return;
    addComment(id, text);
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

          {post.text && <p className="post-page__text">{renderRichText(post.text)}</p>}

          {post.quotedPostId && <QuotedPost postId={post.quotedPostId} />}

          {post.image && <PostMedia image={post.image} nsfw={post.nsfw} />}

          <time className="post-page__time" dateTime={post.createdAt}>
            {timeAgoLong(post.createdAt)}
          </time>

          <div className="post-page__actions">
            <PostActions post={post} size="lg" onComment={() => commentInputRef.current?.focus()} />
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
                  <p className="comment__text">{renderRichText(c.text)}</p>
                </div>
              </div>
            );
          })}
        </section>

        <form className="comment-form" onSubmit={submitComment}>
          <img className="comment-form__avatar" src={avatarFor(currentUsername)} alt="" />
          <input
            ref={commentInputRef}
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
