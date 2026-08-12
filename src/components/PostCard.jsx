import { Link, useNavigate } from "react-router-dom";
import { useStore } from "../context/StoreContext.jsx";
import { timeAgo } from "../utils/time.js";
import { renderRichText } from "../utils/richText.jsx";
import PostMedia from "./PostMedia.jsx";
import PostActions from "./PostActions.jsx";
import QuotedPost from "./QuotedPost.jsx";
import "./PostCard.css";

function RepostBylineIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <path d="M7 7H15C16.66 7 18 8.34 18 10V13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M9.4 4.4L7 7L9.4 9.6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function PostCard({ post, repostedBy, highlighted }) {
  const navigate = useNavigate();
  const { getUser, avatarFor } = useStore();
  const user = getUser(post.username);
  const reposter = repostedBy ? getUser(repostedBy) : null;

  const openPost = () => navigate(`/post/${post.id}`);
  const stop = (e) => e.stopPropagation();

  return (
    <article
      className={`post-card${highlighted ? " is-new" : ""}`}
      onClick={openPost}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && openPost()}
    >
      {repostedBy && (
        <div className="post-card__repost-byline">
          <RepostBylineIcon />
          {reposter?.name || repostedBy} сделал(а) репост
        </div>
      )}

      <div className="post-card__row">
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

          {post.text && <p className="post-card__text">{renderRichText(post.text)}</p>}

          {post.quotedPostId && <QuotedPost postId={post.quotedPostId} />}

          {post.image && <PostMedia image={post.image} nsfw={post.nsfw} onInteract={stop} />}

          <PostActions post={post} size="sm" onComment={openPost} />
        </div>
      </div>
    </article>
  );
}
