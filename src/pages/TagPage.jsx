import { useMemo } from "react";
import { useParams, Navigate } from "react-router-dom";
import Header from "../components/Header.jsx";
import PostCard from "../components/PostCard.jsx";
import { useStore } from "../context/StoreContext.jsx";
import { extractTags } from "../utils/richText.jsx";
import "./Feed.css";

export default function TagPage() {
  const { tag } = useParams();
  const { posts } = useStore();
  const normalized = (tag || "").toLowerCase();

  const tagged = useMemo(
    () => posts.filter((p) => extractTags(p.text).includes(normalized)),
    [posts, normalized]
  );

  if (!normalized) return <Navigate to="/" replace />;

  return (
    <>
      <Header title={`#${normalized}`} showBack />
      <main className="feed container">
        {tagged.length === 0 ? (
          <p className="feed__end">Постов с #{normalized} пока нет.</p>
        ) : (
          tagged.map((post) => <PostCard key={post.id} post={post} />)
        )}
      </main>
    </>
  );
}
