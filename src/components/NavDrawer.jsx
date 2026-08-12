import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import GearIcon from "./GearIcon.jsx";
import { useStore } from "../context/StoreContext.jsx";
import "./NavDrawer.css";

export default function NavDrawer({ onClose }) {
  const navigate = useNavigate();
  const { currentUsername, getUser, avatarFor, logout, lang, t } = useStore();
  const user = getUser(currentUsername);
  const localeTag = lang === "en" ? "en-US" : "ru-RU";

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    function onKey(e) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  function handleLogout() {
    onClose();
    logout();
    navigate("/", { replace: true });
  }

  return (
    <div className="nav-drawer__backdrop" onClick={onClose}>
      <div
        className="nav-drawer"
        role="dialog"
        aria-modal="true"
        aria-label={t("nav.menu")}
        onClick={(e) => e.stopPropagation()}
      >
        <Link to={`/profile/${currentUsername}`} className="nav-drawer__account" onClick={onClose}>
          <img className="nav-drawer__avatar" src={avatarFor(currentUsername)} alt="" />
          <span className="nav-drawer__name">{user?.name}</span>
          <span className="nav-drawer__handle">@{currentUsername}</span>
        </Link>

        {user && (
          <p className="nav-drawer__counts">
            <span>
              <strong>{user.following.toLocaleString(localeTag)}</strong> {t("profile.following")}
            </span>
            <span>
              <strong>{user.followers.toLocaleString(localeTag)}</strong> {t("profile.followers")}
            </span>
          </p>
        )}

        <nav className="nav-drawer__links">
          <Link to={`/profile/${currentUsername}`} className="nav-drawer__link" onClick={onClose}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="8" r="3.6" stroke="currentColor" strokeWidth="2" />
              <path
                d="M4.5 20C5.6 16.5 8.4 14.5 12 14.5C15.6 14.5 18.4 16.5 19.5 20"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            {t("nav.profile")}
          </Link>
          <Link to="/settings" className="nav-drawer__link" onClick={onClose}>
            <GearIcon size={22} />
            {t("nav.settings")}
          </Link>
        </nav>

        <button type="button" className="nav-drawer__link nav-drawer__link--danger" onClick={handleLogout}>
          {t("settings.logout")}
        </button>

        <p className="nav-drawer__footnote">{t("nav.footnote")}</p>
      </div>
    </div>
  );
}
