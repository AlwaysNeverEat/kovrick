import { useEffect, useRef, useState } from "react";
import Header from "../components/Header.jsx";
import PostCard from "../components/PostCard.jsx";
import { useStore } from "../context/StoreContext.jsx";
import "./Feed.css";

export default function Feed() {
  const { posts, currentUsername } = useStore();
  const [highlightId, setHighlightId] = useState(null);
  const prevTopId = useRef(posts[0]?.id);
  const mounted = useRef(false);

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      prevTopId.current = posts[0]?.id;
      return undefined;
    }
    const top = posts[0];
    if (top && top.id !== prevTopId.current && top.username === currentUsername) {
      window.scrollTo({ top: 0, behavior: "auto" });
      setHighlightId(top.id);
      prevTopId.current = top.id;
      const t = setTimeout(() => setHighlightId(null), 1600);
      return () => clearTimeout(t);
    }
    prevTopId.current = top?.id;
    return undefined;
  }, [posts, currentUsername]);

  const entries = posts
    .flatMap((post) => [
      { key: post.id, post, at: post.createdAt },
      ...post.repostedBy.map((r) => ({
        key: `${post.id}~rp~${r.username}`,
        post,
        repostedBy: r.username,
        at: r.at,
      })),
    ])
    .sort((a, b) => new Date(b.at) - new Date(a.at));

  return (
    <>
      <Header />
      <main className="feed container">
        {entries.map((entry) => (
          <PostCard
            key={entry.key}
            post={entry.post}
            repostedBy={entry.repostedBy}
            highlighted={!entry.repostedBy && entry.post.id === highlightId}
          />
        ))}
        <p className="feed__end">Это весь коврик на сегодня 🧶</p>
      </main>
    </>
  );
}
