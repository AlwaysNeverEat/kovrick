import { useNavigate, Link } from "react-router-dom";
import { getUser, avatarFor } from "../data/mockData.js";
import { usePosts } from "../context/PostsContext.jsx";
import { timeAgo } from "../utils/time.js";
import PostMedia from "./PostMedia.jsx";
import "./PostCard.css";

export default function PostCard({ post }) {
  const navigate = useNavigate();
  const { toggleLike } = usePosts();
  const user = getUser(post.username);

  const openPost = () => navigate(`/post/${post.id}`);
  const stop = (e) => e.stopPropagation();

  return (
    <article
      className="post-card"
      onClick={openPost}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && openPost()}
    >
      <Link to={`/profile/${post.username}`} onClick={stop}>
        <img className="post-card__avatar" src={avatarFor(post.username)} alt="" />
      </Link>

      <div className="post-card__main">
        <div className="post-card__head">
          <Link to={`/profile/${post.username}`} className="post-card__who" onClick={stop}>
            <span className="post-card__name">{user?.name || post.username}</span>
            <span className="post-card__handle">@{post.username}</span>
          </Link>
          <span className="post-card__dot">·</span>
          <time className="post-card__time" dateTime={post.createdAt}>
            {timeAgo(post.createdAt)}
          </time>
        </div>

        {post.text && <p className="post-card__text">{post.text}</p>}

        {post.image && <PostMedia image={post.image} nsfw={post.nsfw} onInteract={stop} />}

        <div className="post-card__footer">
          <button
            type="button"
            className={`post-card__action post-card__action--like${post.liked ? " is-liked" : ""}`}
            onClick={(e) => {
              stop(e);
              toggleLike(post.id);
            }}
            aria-pressed={post.liked}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill={post.liked ? "currentColor" : "none"}>
              <path
                d="M12 20.5S3 15 3 8.9C3 5.9 5.4 3.5 8.4 3.5C10.2 3.5 11.4 4.5 12 5.2C12.6 4.5 13.8 3.5 15.6 3.5C18.6 3.5 21 5.9 21 8.9C21 15 12 20.5 12 20.5Z"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinejoin="round"
              />
            </svg>
            <span>{post.likes}</span>
          </button>

          <button type="button" className="post-card__action" onClick={openPost}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                d="M4 12C4 7.58 7.8 4 12.5 4C17.2 4 21 7.58 21 12C21 16.42 17.2 20 12.5 20C11.1 20 9.78 19.68 8.62 19.1L4 20.5L5.3 16.62C4.48 15.36 4 13.74 4 12Z"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinejoin="round"
              />
            </svg>
            <span>{post.comments}</span>
          </button>
        </div>
      </div>
    </article>
  );
}
