import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header.jsx";
import { useStore } from "../context/StoreContext.jsx";
import { timeAgo } from "../utils/time.js";
import { formatCount } from "../utils/format.js";
import "./Notifications.css";

function HeartGlyph() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 20.5S3 15 3 8.9C3 5.9 5.4 3.5 8.4 3.5C10.2 3.5 11.4 4.5 12 5.2C12.6 4.5 13.8 3.5 15.6 3.5C18.6 3.5 21 5.9 21 8.9C21 15 12 20.5 12 20.5Z" />
    </svg>
  );
}

function CommentGlyph() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M4 12C4 7.58 7.8 4 12.5 4C17.2 4 21 7.58 21 12C21 16.42 17.2 20 12.5 20C11.1 20 9.78 19.68 8.62 19.1L4 20.5L5.3 16.62C4.48 15.36 4 13.74 4 12Z" />
    </svg>
  );
}

export default function Notifications() {
  const { notifications, getUser, avatarFor, markAllNotificationsRead, lang, t } = useStore();

  useEffect(() => {
    markAllNotificationsRead();
  }, [markAllNotificationsRead]);

  return (
    <>
      <Header title={t("notifications.title")} />
      <main className="notifications container">
        {notifications.length === 0 ? (
          <p className="notifications__empty">{t("notifications.empty")}</p>
        ) : (
          <ul className="notifications__list">
            {notifications.map((n) => {
              const user = getUser(n.lastFromUsername);
              const name = user?.name || n.lastFromUsername;
              const isLike = n.lastType === "like";
              const isUnread = n.likeCount > n.seenLikes || n.commentCount > n.seenComments;
              return (
                <li key={n.id} className={`notification${isUnread ? " is-unread" : ""}`}>
                  <Link to={`/post/${n.postId}`} className="notification__row">
                    <span className={`notification__glyph notification__glyph--${n.lastType}`}>
                      {isLike ? <HeartGlyph /> : <CommentGlyph />}
                    </span>
                    <img className="notification__avatar" src={avatarFor(n.lastFromUsername)} alt="" />
                    <div className="notification__body">
                      <p className="notification__text">
                        {isLike
                          ? n.likeCount > 1
                            ? t("notifications.likeMany", { name, rest: formatCount(n.likeCount - 1, lang) })
                            : t("notifications.likeOne", { name })
                          : t("notifications.commentLead", { name })}
                      </p>
                      {!isLike && <p className="notification__quote">«{n.lastText}»</p>}
                      {isLike && n.commentCount > 0 && (
                        <p className="notification__extra">{t("notifications.alsoComments", { count: formatCount(n.commentCount, lang) })}</p>
                      )}
                      {!isLike && n.likeCount > 0 && (
                        <p className="notification__extra">{t("notifications.alsoLikes", { count: formatCount(n.likeCount, lang) })}</p>
                      )}
                      <time className="notification__time" dateTime={n.createdAt}>
                        {timeAgo(n.createdAt, lang)}
                      </time>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </main>
    </>
  );
}
