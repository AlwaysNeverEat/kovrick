import { useMemo, useState } from "react";
import { useParams, useNavigate, Navigate } from "react-router-dom";
import Header from "../components/Header.jsx";
import { usePosts } from "../context/PostsContext.jsx";
import { getUser, avatarFor, CURRENT_USERNAME } from "../data/mockData.js";
import "./Profile.css";

export default function Profile() {
  const { username } = useParams();
  const navigate = useNavigate();
  const { posts } = usePosts();
  const [following, setFollowing] = useState(false);

  const user = getUser(username);
  const userPosts = useMemo(() => posts.filter((p) => p.username === username), [posts, username]);
  const isSelf = username === CURRENT_USERNAME;

  if (!user) return <Navigate to="/" replace />;

  return (
    <>
      <Header title={user.name} showBack />
      <main className="profile container">
        <div className="stripe-band" />
        <section className="profile__card">
          <img className="profile__avatar" src={avatarFor(username)} alt="" />
          <h2 className="profile__name">{user.name}</h2>
          <p className="profile__handle">@{user.username}</p>
          <p className="profile__bio">{user.bio}</p>

          <dl className="profile__meta">
            <div>
              <dt>Место</dt>
              <dd>{user.location}</dd>
            </div>
            <div>
              <dt>С нами</dt>
              <dd>{user.joined}</dd>
            </div>
          </dl>

          <div className="profile__stats">
            <div>
              <strong>{userPosts.length}</strong>
              <span>постов</span>
            </div>
            <div>
              <strong>{user.followers.toLocaleString("ru-RU")}</strong>
              <span>подписчиков</span>
            </div>
            <div>
              <strong>{user.following.toLocaleString("ru-RU")}</strong>
              <span>подписок</span>
            </div>
          </div>

          {isSelf ? (
            <button type="button" className="btn btn--outline btn--block" onClick={() => navigate("/create")}>
              Новый пост
            </button>
          ) : (
            <button
              type="button"
              className={`btn btn--block ${following ? "btn--ghost" : "btn--primary"}`}
              onClick={() => setFollowing((v) => !v)}
              aria-pressed={following}
            >
              {following ? "Вы подписаны" : "Подписаться"}
            </button>
          )}
        </section>

        <div className="fringe" />

        <h3 className="profile__grid-title">Коврик из постов</h3>
        {userPosts.length === 0 ? (
          <p className="profile__empty">Пока пусто — первый пост впереди.</p>
        ) : (
          <div className="profile__grid">
            {userPosts.map((p) => (
              <button
                key={p.id}
                type="button"
                className="profile__tile"
                onClick={() => navigate(`/post/${p.id}`)}
                aria-label={p.text?.slice(0, 40) || "Пост"}
              >
                {p.image ? (
                  <img src={p.image} alt="" loading="lazy" className={p.nsfw ? "is-blurred" : ""} />
                ) : (
                  <span className="profile__tile-text">{p.text}</span>
                )}
                {p.nsfw && <span className="profile__tile-badge">18+</span>}
              </button>
            ))}
          </div>
        )}
      </main>
    </>
  );
}
