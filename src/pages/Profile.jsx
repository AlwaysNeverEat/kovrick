import { useMemo, useState } from "react";
import { useParams, useNavigate, Navigate } from "react-router-dom";
import Header from "../components/Header.jsx";
import { useStore } from "../context/StoreContext.jsx";
import "./Profile.css";

function GearIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M19.4 13.5c.04-.33.06-.66.06-1s-.02-.67-.06-1l2.1-1.65a.5.5 0 0 0 .12-.64l-2-3.46a.5.5 0 0 0-.6-.22l-2.48 1a7.4 7.4 0 0 0-1.73-1L14.4 2.5a.5.5 0 0 0-.5-.42h-4a.5.5 0 0 0-.5.42l-.35 2.53a7.4 7.4 0 0 0-1.73 1l-2.48-1a.5.5 0 0 0-.6.22l-2 3.46a.5.5 0 0 0 .12.64L4.5 11.5c-.04.33-.06.66-.06 1s.02.67.06 1l-2.1 1.65a.5.5 0 0 0-.12.64l2 3.46a.5.5 0 0 0 .6.22l2.48-1c.53.43 1.11.77 1.73 1l.35 2.53a.5.5 0 0 0 .5.42h4a.5.5 0 0 0 .5-.42l.35-2.53a7.4 7.4 0 0 0 1.73-1l2.48 1a.5.5 0 0 0 .6-.22l2-3.46a.5.5 0 0 0-.12-.64L19.4 13.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function RepostBadgeIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
      <path d="M7 7H15C16.66 7 18 8.34 18 10V13" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M9.4 4.4L7 7L9.4 9.6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M17 17H9C7.34 17 6 15.66 6 14V11" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M14.6 19.6L17 17L14.6 14.4" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Profile() {
  const { username } = useParams();
  const navigate = useNavigate();
  const { posts, getUser, avatarFor, currentUsername, lang, t } = useStore();
  const [following, setFollowing] = useState(false);

  const user = getUser(username);
  const isSelf = username === currentUsername;

  const ownPosts = useMemo(() => posts.filter((p) => p.username === username), [posts, username]);

  const gridEntries = useMemo(() => {
    const own = ownPosts.map((p) => ({ key: p.id, post: p, at: p.createdAt, isRepost: false }));
    const reposts = posts
      .filter((p) => p.repostedBy.some((r) => r.username === username))
      .map((p) => {
        const r = p.repostedBy.find((r2) => r2.username === username);
        return { key: `${p.id}~rp`, post: p, at: r.at, isRepost: true };
      });
    return [...own, ...reposts].sort((a, b) => new Date(b.at) - new Date(a.at));
  }, [posts, ownPosts, username]);

  if (!user) return <Navigate to="/" replace />;

  const joinedLabel = user.joinedAt ? t("profile.joinedNow") : user.joined;
  const localeTag = lang === "en" ? "en-US" : "ru-RU";

  return (
    <>
      <Header
        title={user.name}
        showBack
        right={
          isSelf && (
            <button
              type="button"
              className="profile__settings-btn"
              onClick={() => navigate("/settings")}
              aria-label={t("profile.openSettings")}
            >
              <GearIcon />
            </button>
          )
        }
      />
      <main className="profile container">
        <section className="profile__card">
          <img className="profile__avatar" src={avatarFor(username)} alt="" />
          <h2 className="profile__name">{user.name}</h2>
          <p className="profile__handle">@{user.username}</p>
          {user.bio && <p className="profile__bio">{user.bio}</p>}

          <dl className="profile__meta">
            {user.location && (
              <div>
                <dt>{t("profile.location")}</dt>
                <dd>{user.location}</dd>
              </div>
            )}
            <div>
              <dt>{t("profile.joined")}</dt>
              <dd>{joinedLabel}</dd>
            </div>
          </dl>

          <div className="profile__stats">
            <div>
              <strong>{ownPosts.length}</strong>
              <span>{t("profile.posts")}</span>
            </div>
            <div>
              <strong>{user.followers.toLocaleString(localeTag)}</strong>
              <span>{t("profile.followers")}</span>
            </div>
            <div>
              <strong>{user.following.toLocaleString(localeTag)}</strong>
              <span>{t("profile.following")}</span>
            </div>
          </div>

          {isSelf ? (
            <button
              type="button"
              className="btn btn--outline btn--block"
              onClick={() => navigate("/settings/profile")}
            >
              {t("profile.editProfile")}
            </button>
          ) : (
            <button
              type="button"
              className={`btn btn--block ${following ? "btn--ghost" : "btn--primary"}`}
              onClick={() => setFollowing((v) => !v)}
              aria-pressed={following}
            >
              {following ? t("profile.followingBtn") : t("profile.follow")}
            </button>
          )}
        </section>

        <h3 className="profile__grid-title">{t("profile.gridTitle")}</h3>
        {gridEntries.length === 0 ? (
          <p className="profile__empty">{t("profile.empty")}</p>
        ) : (
          <div className="profile__grid">
            {gridEntries.map((entry) => {
              const p = entry.post;
              return (
                <button
                  key={entry.key}
                  type="button"
                  className="profile__tile"
                  onClick={() => navigate(`/post/${p.id}`)}
                  aria-label={p.text?.slice(0, 40) || t("post.title")}
                >
                  {p.image ? (
                    <img src={p.image} alt="" loading="lazy" className={p.nsfw ? "is-blurred" : ""} />
                  ) : (
                    <span className="profile__tile-text-wrap">
                      <span className="profile__tile-text">{p.text}</span>
                    </span>
                  )}
                  {p.nsfw && <span className="profile__tile-badge">18+</span>}
                  {entry.isRepost && (
                    <span className="profile__tile-repost" title={t("profile.repostBadge")} aria-label={t("profile.repostBadge")}>
                      <RepostBadgeIcon />
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </main>
    </>
  );
}
