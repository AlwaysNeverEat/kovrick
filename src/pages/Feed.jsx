import Header from "../components/Header.jsx";
import PostCard from "../components/PostCard.jsx";
import { usePosts } from "../context/PostsContext.jsx";
import "./Feed.css";

export default function Feed() {
  const { posts } = usePosts();

  return (
    <>
      <Header />
      <main className="feed container">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
        <p className="feed__end">Это весь коврик на сегодня 🧶</p>
      </main>
    </>
  );
}
