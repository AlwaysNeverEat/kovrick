import { useNavigate } from "react-router-dom";
import { useStore } from "../context/StoreContext.jsx";
import { timeAgo } from "../utils/time.js";
import "./QuotedPost.css";

export default function QuotedPost({ postId }) {
  const navigate = useNavigate();
  const { getPost, getUser, avatarFor } = useStore();
  const post = getPost(postId);

  if (!post) {
    return <div className="quoted-post quoted-post--gone">Пост удалён</div>;
  }

  const user = getUser(post.username);

  function open(e) {
    e.stopPropagation();
    navigate(`/post/${post.id}`);
  }

  return (
    <div
      className="quoted-post"
      role="button"
      tabIndex={0}
      onClick={open}
      onKeyDown={(e) => e.key === "Enter" && open(e)}
    >
      <div className="quoted-post__head">
        <img className="quoted-post__avatar" src={avatarFor(post.username)} alt="" />
        <span className="quoted-post__name">{user?.name || post.username}</span>
        <span className="quoted-post__handle">@{post.username}</span>
        <span className="quoted-post__dot">·</span>
        <span className="quoted-post__time">{timeAgo(post.createdAt)}</span>
      </div>
      {post.text && <p className="quoted-post__text">{post.text}</p>}
      {post.image && <img className="quoted-post__image" src={post.image} alt="" loading="lazy" />}
    </div>
  );
}
