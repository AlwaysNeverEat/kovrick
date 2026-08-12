import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { seedUsers, initialPosts, commentsFor, initials } from "../data/mockData.js";
import { avatarDataUri } from "../utils/rugPattern.js";
import { detectLang, translate, SUPPORTED_LANGS } from "../i18n/dictionary.js";
import { getStoredTheme, applyTheme } from "../utils/theme.js";

const StoreContext = createContext(null);
const SESSION_KEY = "kovrick:session";
const LANG_KEY = "kovrick:lang";

function loadLang() {
  try {
    const stored = localStorage.getItem(LANG_KEY);
    if (SUPPORTED_LANGS.includes(stored)) return stored;
  } catch {
    // ignore
  }
  return detectLang();
}

let nextPostId = 1000;
let nextCommentId = 1000;

function buildSeedUsers() {
  return Object.fromEntries(seedUsers.map((u) => [u.username, u]));
}

function buildSeedPosts() {
  return initialPosts.map((p) => ({ ...p, reposts: 0, repostedBy: [], quotedPostId: null }));
}

function buildSeedComments() {
  const map = {};
  for (const p of initialPosts) map[p.id] = commentsFor(p.id);
  return map;
}

function loadSession() {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function StoreProvider({ children }) {
  const [session] = useState(loadSession);
  const [users, setUsers] = useState(() => {
    const base = buildSeedUsers();
    if (session?.profile?.username && !base[session.profile.username]) {
      base[session.profile.username] = session.profile;
    }
    return base;
  });
  const [currentUsername, setCurrentUsername] = useState(() => session?.currentUsername || null);
  const [posts, setPosts] = useState(buildSeedPosts);
  const [comments, setComments] = useState(buildSeedComments);
  const [toast, setToast] = useState(null);
  const [lang, setLangState] = useState(loadLang);
  const [theme, setThemeState] = useState(getStoredTheme);

  useEffect(() => {
    try {
      localStorage.setItem(LANG_KEY, lang);
    } catch {
      // ignore
    }
  }, [lang]);

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  useEffect(() => {
    if (!currentUsername) {
      localStorage.removeItem(SESSION_KEY);
      return;
    }
    const profile = users[currentUsername];
    if (profile) {
      localStorage.setItem(SESSION_KEY, JSON.stringify({ currentUsername, profile }));
    }
  }, [currentUsername, users]);

  useEffect(() => {
    if (!toast) return undefined;
    const t = setTimeout(() => setToast(null), 2500);
    return () => clearTimeout(t);
  }, [toast]);

  const getUser = useCallback((username) => users[username], [users]);

  const avatarFor = useCallback(
    (username) => {
      const u = users[username];
      if (u?.avatarUrl) return u.avatarUrl;
      return avatarDataUri(username, initials(u?.name || username || "?"));
    },
    [users]
  );

  const t = useCallback((key, vars) => translate(lang, key, vars), [lang]);

  const setLang = useCallback((next) => {
    if (SUPPORTED_LANGS.includes(next)) setLangState(next);
  }, []);

  const setTheme = useCallback((next) => setThemeState(next), []);

  const getPost = useCallback((id) => posts.find((p) => p.id === id), [posts]);

  const getComments = useCallback((postId) => comments[postId] || [], [comments]);

  const showToast = useCallback((message) => setToast(message), []);

  const toggleLike = useCallback((id) => {
    setPosts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 } : p))
    );
  }, []);

  const toggleRepost = useCallback(
    (id) => {
      if (!currentUsername) return;
      setPosts((prev) =>
        prev.map((p) => {
          if (p.id !== id) return p;
          const already = p.repostedBy.some((r) => r.username === currentUsername);
          return already
            ? { ...p, reposts: p.reposts - 1, repostedBy: p.repostedBy.filter((r) => r.username !== currentUsername) }
            : {
                ...p,
                reposts: p.reposts + 1,
                repostedBy: [...p.repostedBy, { username: currentUsername, at: new Date().toISOString() }],
              };
        })
      );
    },
    [currentUsername]
  );

  const addPost = useCallback(
    ({ text = "", image = null, quotedPostId = null }) => {
      const id = `local-${nextPostId++}`;
      setPosts((prev) => [
        {
          id,
          username: currentUsername,
          text,
          image,
          createdAt: new Date().toISOString(),
          likes: 0,
          comments: 0,
          liked: false,
          nsfw: false,
          reposts: 0,
          repostedBy: [],
          quotedPostId,
        },
        ...prev,
      ]);
      setComments((prev) => ({ ...prev, [id]: [] }));
      return id;
    },
    [currentUsername]
  );

  const deletePost = useCallback((id) => {
    setPosts((prev) => prev.filter((p) => p.id !== id));
    setComments((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  }, []);

  const addComment = useCallback(
    (postId, text) => {
      if (!currentUsername) return;
      const comment = {
        id: `${postId}-c-${nextCommentId++}`,
        username: currentUsername,
        text,
        createdAt: new Date().toISOString(),
      };
      setComments((prev) => ({ ...prev, [postId]: [...(prev[postId] || []), comment] }));
      setPosts((prev) => prev.map((p) => (p.id === postId ? { ...p, comments: p.comments + 1 } : p)));
    },
    [currentUsername]
  );

  const register = useCallback(({ name, username, bio, location, avatarUrl }) => {
    const profile = {
      username,
      name,
      bio: bio || "",
      location: location || "",
      avatarUrl: avatarUrl || null,
      joined: null,
      joinedAt: new Date().toISOString(),
      followers: 0,
      following: 0,
    };
    setUsers((prev) => ({ ...prev, [username]: profile }));
    setCurrentUsername(username);
  }, []);

  const logout = useCallback(() => setCurrentUsername(null), []);

  const updateProfile = useCallback(
    ({ name, username: newUsername, bio, location, avatarUrl }) => {
      const oldUsername = currentUsername;
      if (!oldUsername) return;

      setUsers((prev) => {
        const oldProfile = prev[oldUsername];
        const updated = { ...oldProfile, name, username: newUsername, bio, location, avatarUrl: avatarUrl || null };
        if (newUsername === oldUsername) return { ...prev, [oldUsername]: updated };
        const next = { ...prev };
        delete next[oldUsername];
        next[newUsername] = updated;
        return next;
      });

      if (newUsername !== oldUsername) {
        setPosts((prev) =>
          prev.map((p) => ({
            ...p,
            username: p.username === oldUsername ? newUsername : p.username,
            repostedBy: p.repostedBy.map((r) =>
              r.username === oldUsername ? { ...r, username: newUsername } : r
            ),
          }))
        );
        setComments((prev) => {
          const next = {};
          for (const [postId, list] of Object.entries(prev)) {
            next[postId] = list.map((c) => (c.username === oldUsername ? { ...c, username: newUsername } : c));
          }
          return next;
        });
        setCurrentUsername(newUsername);
      }
    },
    [currentUsername]
  );

  const value = useMemo(
    () => ({
      users,
      currentUsername,
      posts,
      toast,
      lang,
      t,
      theme,
      getUser,
      avatarFor,
      getPost,
      getComments,
      toggleLike,
      toggleRepost,
      addPost,
      deletePost,
      addComment,
      register,
      logout,
      updateProfile,
      showToast,
      setLang,
      setTheme,
    }),
    [
      users,
      currentUsername,
      posts,
      toast,
      lang,
      t,
      theme,
      getUser,
      avatarFor,
      getPost,
      getComments,
      toggleLike,
      toggleRepost,
      addPost,
      deletePost,
      addComment,
      register,
      logout,
      updateProfile,
      showToast,
      setLang,
      setTheme,
    ]
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}
