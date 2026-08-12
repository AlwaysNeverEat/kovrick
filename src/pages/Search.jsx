import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header.jsx";
import PostCard from "../components/PostCard.jsx";
import { useStore } from "../context/StoreContext.jsx";
import { extractTags } from "../utils/richText.jsx";
import "./Search.css";

export default function Search() {
  const { posts, users, avatarFor } = useStore();
  const [query, setQuery] = useState("");
  const q = query.trim().toLowerCase();

  const people = useMemo(() => {
    if (!q) return [];
    return Object.values(users).filter(
      (u) => u.name.toLowerCase().includes(q) || u.username.toLowerCase().includes(q)
    );
  }, [users, q]);

  const matchedPosts = useMemo(() => {
    if (!q) return [];
    return posts.filter((p) => (p.text || "").toLowerCase().includes(q));
  }, [posts, q]);

  const popularTags = useMemo(() => {
    const counts = new Map();
    for (const p of posts) {
      for (const tag of extractTags(p.text)) {
        counts.set(tag, (counts.get(tag) || 0) + 1);
      }
    }
    return [...counts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 10);
  }, [posts]);

  return (
    <>
      <Header title="Поиск" />
      <main className="search container">
        <div className="search__field-wrap">
          <svg className="search__icon" width="18" height="18" viewBox="0 0 24 24" fill="none">
            <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
            <path d="M20 20L16.5 16.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <input
            className="search__field"
            type="search"
            placeholder="Искать по Коврику"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />
        </div>

        {!q ? (
          <section className="search__section">
            <h2 className="search__title">Популярные теги</h2>
            {popularTags.length === 0 ? (
              <p className="search__empty">Тегов пока нет.</p>
            ) : (
              <ul className="search__tags">
                {popularTags.map(([tag, count]) => (
                  <li key={tag}>
                    <Link to={`/tag/${encodeURIComponent(tag)}`} className="search__tag">
                      <span>#{tag}</span>
                      <span className="search__tag-count">{count}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </section>
        ) : (
          <>
            <section className="search__section">
              <h2 className="search__title">Люди</h2>
              {people.length === 0 ? (
                <p className="search__empty">Никого не нашлось.</p>
              ) : (
                <ul className="search__people">
                  {people.map((u) => (
                    <li key={u.username}>
                      <Link to={`/profile/${u.username}`} className="search__person">
                        <img src={avatarFor(u.username)} alt="" />
                        <span>
                          <strong>{u.name}</strong>
                          <small>@{u.username}</small>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </section>

            <section className="search__section search__section--posts">
              <h2 className="search__title">Посты</h2>
              {matchedPosts.length === 0 ? (
                <p className="search__empty">Постов не нашлось.</p>
              ) : (
                matchedPosts.map((post) => <PostCard key={post.id} post={post} />)
              )}
            </section>
          </>
        )}
      </main>
    </>
  );
}
