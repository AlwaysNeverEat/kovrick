import { HashRouter, Routes, Route } from "react-router-dom";
import { PostsProvider } from "./context/PostsContext.jsx";
import SideNav from "./components/SideNav.jsx";
import BottomNav from "./components/BottomNav.jsx";
import Feed from "./pages/Feed.jsx";
import PostPage from "./pages/PostPage.jsx";
import Profile from "./pages/Profile.jsx";
import CreatePost from "./pages/CreatePost.jsx";
import "./App.css";

export default function App() {
  return (
    <PostsProvider>
      <HashRouter>
        <div className="app-shell">
          <SideNav />
          <div className="app-shell__main">
            <Routes>
              <Route path="/" element={<Feed />} />
              <Route path="/post/:id" element={<PostPage />} />
              <Route path="/profile/:username" element={<Profile />} />
              <Route path="/create" element={<CreatePost />} />
              <Route path="*" element={<Feed />} />
            </Routes>
            <BottomNav />
          </div>
        </div>
      </HashRouter>
    </PostsProvider>
  );
}
