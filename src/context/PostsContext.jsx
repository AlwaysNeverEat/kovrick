import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { initialPosts, CURRENT_USERNAME } from "../data/mockData.js";

const PostsContext = createContext(null);

let nextId = 1000;

export function PostsProvider({ children }) {
  const [posts, setPosts] = useState(initialPosts);

  const toggleLike = useCallback((id) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 }
          : p
      )
    );
  }, []);

  const addPost = useCallback((text, imageDataUrl) => {
    const id = `local-${nextId++}`;
    setPosts((prev) => [
      {
        id,
        username: CURRENT_USERNAME,
        text,
        image: imageDataUrl || null,
        createdAt: new Date().toISOString(),
        likes: 0,
        comments: 0,
        liked: false,
        nsfw: false,
      },
      ...prev,
    ]);
    return id;
  }, []);

  const getPost = useCallback((id) => posts.find((p) => p.id === id), [posts]);

  const incrementComments = useCallback((id) => {
    setPosts((prev) => prev.map((p) => (p.id === id ? { ...p, comments: p.comments + 1 } : p)));
  }, []);

  const value = useMemo(
    () => ({ posts, toggleLike, addPost, getPost, incrementComments }),
    [posts, toggleLike, addPost, getPost, incrementComments]
  );

  return <PostsContext.Provider value={value}>{children}</PostsContext.Provider>;
}

export function usePosts() {
  const ctx = useContext(PostsContext);
  if (!ctx) throw new Error("usePosts must be used within PostsProvider");
  return ctx;
}
