import { HashRouter, Routes, Route, useLocation } from "react-router-dom";
import { StoreProvider, useStore } from "./context/StoreContext.jsx";
import SideNav from "./components/SideNav.jsx";
import BottomNav from "./components/BottomNav.jsx";
import Toast from "./components/Toast.jsx";
import Feed from "./pages/Feed.jsx";
import PostPage from "./pages/PostPage.jsx";
import Profile from "./pages/Profile.jsx";
import Composer from "./components/Composer.jsx";
import Search from "./pages/Search.jsx";
import TagPage from "./pages/TagPage.jsx";
import Welcome from "./pages/Welcome.jsx";
import EditProfile from "./pages/EditProfile.jsx";
import Settings from "./pages/Settings.jsx";
import "./App.css";

function AppShell() {
  const { currentUsername } = useStore();
  const location = useLocation();

  if (!currentUsername) {
    return (
      <div className="app-shell">
        <div className="app-shell__main">
          <Welcome />
        </div>
      </div>
    );
  }

  const background =
    location.state?.backgroundLocation || (location.pathname === "/create" ? { pathname: "/" } : null);

  return (
    <div className="app-shell">
      <SideNav />
      <div className="app-shell__main">
        <Routes location={background || location}>
          <Route path="/" element={<Feed />} />
          <Route path="/post/:id" element={<PostPage />} />
          <Route path="/profile/:username" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/settings/profile" element={<EditProfile />} />
          <Route path="/search" element={<Search />} />
          <Route path="/tag/:tag" element={<TagPage />} />
          <Route path="*" element={<Feed />} />
        </Routes>
        <BottomNav />
      </div>

      {background && (
        <Routes>
          <Route path="/create" element={<Composer />} />
        </Routes>
      )}

      <Toast />
    </div>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <HashRouter>
        <AppShell />
      </HashRouter>
    </StoreProvider>
  );
}
