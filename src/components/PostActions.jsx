import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useStore } from "../context/StoreContext.jsx";
import { formatCount } from "../utils/format.js";
import "./PostActions.css";

function HeartIcon({ filled }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"}>
      <path
        d="M12 20.5S3 15 3 8.9C3 5.9 5.4 3.5 8.4 3.5C10.2 3.5 11.4 4.5 12 5.2C12.6 4.5 13.8 3.5 15.6 3.5C18.6 3.5 21 5.9 21 8.9C21 15 12 20.5 12 20.5Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CommentIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path
        d="M4 12C4 7.58 7.8 4 12.5 4C17.2 4 21 7.58 21 12C21 16.42 17.2 20 12.5 20C11.1 20 9.78 19.68 8.62 19.1L4 20.5L5.3 16.62C4.48 15.36 4 13.74 4 12Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function RepostIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M7 7H15C16.66 7 18 8.34 18 10V13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M9.4 4.4L7 7L9.4 9.6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M17 17H9C7.34 17 6 15.66 6 14V11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M14.6 19.6L17 17L14.6 14.4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function MoreIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <circle cx="5" cy="12" r="1.7" fill="currentColor" />
      <circle cx="12" cy="12" r="1.7" fill="currentColor" />
      <circle cx="19" cy="12" r="1.7" fill="currentColor" />
    </svg>
  );
}

function stop(e) {
  e.stopPropagation();
}

export default function PostActions({ post, size = "sm", onComment }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUsername, toggleLike, toggleRepost, deletePost, showToast, lang, t } = useStore();
  const [repostMenuOpen, setRepostMenuOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const repostRef = useRef(null);
  const menuRef = useRef(null);

  const isOwn = post.username === currentUsername;
  const reposted = post.repostedBy.some((r) => r.username === currentUsername);

  useEffect(() => {
    function onDocClick(e) {
      if (repostRef.current && !repostRef.current.contains(e.target)) setRepostMenuOpen(false);
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
        setConfirmDelete(false);
      }
    }
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  function handleRepost(e) {
    stop(e);
    toggleRepost(post.id);
    setRepostMenuOpen(false);
    showToast(reposted ? t("toast.repostUndone") : t("toast.reposted"));
  }

  function handleQuote(e) {
    stop(e);
    setRepostMenuOpen(false);
    navigate("/create", { state: { backgroundLocation: location, quotedPostId: post.id } });
  }

  function handleDelete(e) {
    stop(e);
    deletePost(post.id);
    setMenuOpen(false);
    showToast(t("toast.postDeleted"));
  }

  return (
    <div className={`post-actions post-actions--${size}`}>
      <button
        type="button"
        className={`post-actions__btn post-actions__btn--like${post.liked ? " is-active" : ""}`}
        onClick={(e) => {
          stop(e);
          toggleLike(post.id);
        }}
        aria-pressed={post.liked}
      >
        <HeartIcon filled={post.liked} />
        <span>{formatCount(post.likes, lang)}</span>
      </button>

      <button
        type="button"
        className="post-actions__btn"
        onClick={(e) => {
          stop(e);
          if (onComment) onComment(e);
          else navigate(`/post/${post.id}`);
        }}
      >
        <CommentIcon />
        <span>{formatCount(post.comments, lang)}</span>
      </button>

      <div className="post-actions__menu-wrap" ref={repostRef}>
        <button
          type="button"
          className={`post-actions__btn post-actions__btn--repost${reposted ? " is-active" : ""}`}
          onClick={(e) => {
            stop(e);
            setRepostMenuOpen((v) => !v);
          }}
          aria-pressed={reposted}
          aria-label={t("postActions.repost")}
        >
          <RepostIcon />
          <span>{formatCount(post.reposts, lang)}</span>
        </button>
        {repostMenuOpen && (
          <div className="post-actions__dropdown" onClick={stop}>
            <button type="button" onClick={handleRepost}>
              {reposted ? t("postActions.undoRepost") : t("postActions.repost")}
            </button>
            <button type="button" onClick={handleQuote}>
              {t("postActions.quote")}
            </button>
          </div>
        )}
      </div>

      {isOwn && (
        <div className="post-actions__menu-wrap post-actions__menu-wrap--end" ref={menuRef}>
          <button
            type="button"
            className="post-actions__btn post-actions__btn--more"
            onClick={(e) => {
              stop(e);
              setMenuOpen((v) => !v);
            }}
            aria-label={t("postActions.more")}
          >
            <MoreIcon />
          </button>
          {menuOpen && (
            <div className="post-actions__dropdown post-actions__dropdown--end" onClick={stop}>
              {!confirmDelete ? (
                <button
                  type="button"
                  className="post-actions__danger"
                  onClick={(e) => {
                    stop(e);
                    setConfirmDelete(true);
                  }}
                >
                  {t("postActions.deletePost")}
                </button>
              ) : (
                <>
                  <p className="post-actions__confirm-text">{t("postActions.deleteConfirm")}</p>
                  <button type="button" className="post-actions__danger" onClick={handleDelete}>
                    {t("postActions.deleteYes")}
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      stop(e);
                      setConfirmDelete(false);
                    }}
                  >
                    {t("postActions.cancel")}
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
