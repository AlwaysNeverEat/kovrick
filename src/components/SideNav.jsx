import { NavLink, useLocation, useNavigate } from "react-router-dom";
import Logo from "./Logo.jsx";
import GearIcon from "./GearIcon.jsx";
import BellIcon from "./BellIcon.jsx";
import { useStore } from "../context/StoreContext.jsx";
import "./SideNav.css";

export default function SideNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUsername, unreadNotifications, t } = useStore();

  return (
    <aside className="side-nav">
      <Logo size="md" as="div" />
      <nav className="side-nav__links">
        <NavLink to="/" end className={({ isActive }) => `side-nav__link${isActive ? " is-active" : ""}`}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path
              d="M4 11L12 4L20 11V19.5C20 20.05 19.55 20.5 19 20.5H14V14.5H10V20.5H5C4.45 20.5 4 20.05 4 19.5V11Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinejoin="round"
            />
          </svg>
          {t("nav.feed")}
        </NavLink>
        <NavLink to="/search" className={({ isActive }) => `side-nav__link${isActive ? " is-active" : ""}`}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
            <path d="M20 20L16.5 16.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          {t("nav.search")}
        </NavLink>
        <NavLink to="/notifications" className={({ isActive }) => `side-nav__link${isActive ? " is-active" : ""}`}>
          <span className="side-nav__icon-wrap">
            <BellIcon size={22} />
            {unreadNotifications > 0 && <span className="side-nav__badge" aria-hidden="true" />}
          </span>
          {t("nav.notifications")}
        </NavLink>
        <NavLink
          to={`/profile/${currentUsername}`}
          className={({ isActive }) => `side-nav__link${isActive ? " is-active" : ""}`}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="8" r="3.6" stroke="currentColor" strokeWidth="2" />
            <path d="M4.5 20C5.6 16.5 8.4 14.5 12 14.5C15.6 14.5 18.4 16.5 19.5 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          {t("nav.profile")}
        </NavLink>
        <NavLink to="/settings" className={({ isActive }) => `side-nav__link${isActive ? " is-active" : ""}`}>
          <GearIcon size={22} />
          {t("nav.settings")}
        </NavLink>
      </nav>

      <button
        type="button"
        className="btn btn--primary btn--block"
        onClick={() => navigate("/create", { state: { backgroundLocation: location } })}
      >
        {t("nav.create")}
      </button>

      <p className="side-nav__footnote">{t("nav.footnote")}</p>
    </aside>
  );
}
