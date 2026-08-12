import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useStore } from "../context/StoreContext.jsx";
import "./BottomNav.css";

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUsername, avatarFor } = useStore();

  function openComposer() {
    navigate("/create", { state: { backgroundLocation: location } });
  }

  return (
    <nav className="bottom-nav" aria-label="Основная навигация">
      <div className="bottom-nav__row">
        <NavLink
          to="/"
          end
          className={({ isActive }) => `bottom-nav__item${isActive ? " is-active" : ""}`}
          aria-label="Лента"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M4 11L12 4L20 11V19.5C20 20.05 19.55 20.5 19 20.5H14V14.5H10V20.5H5C4.45 20.5 4 20.05 4 19.5V11Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinejoin="round"
            />
          </svg>
        </NavLink>

        <NavLink
          to="/search"
          className={({ isActive }) => `bottom-nav__item${isActive ? " is-active" : ""}`}
          aria-label="Поиск"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
            <path d="M20 20L16.5 16.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </NavLink>

        <button type="button" className="bottom-nav__item" onClick={openComposer} aria-label="Создать пост">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
          </svg>
        </button>

        <NavLink
          to={`/profile/${currentUsername}`}
          className={({ isActive }) => `bottom-nav__item${isActive ? " is-active" : ""}`}
          aria-label="Профиль"
        >
          <img className="bottom-nav__avatar" src={avatarFor(currentUsername)} alt="" />
        </NavLink>
      </div>
    </nav>
  );
}
