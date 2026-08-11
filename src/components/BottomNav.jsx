import { NavLink } from "react-router-dom";
import { CURRENT_USERNAME } from "../data/mockData.js";
import { avatarFor } from "../data/mockData.js";
import "./BottomNav.css";

export default function BottomNav() {
  return (
    <nav className="bottom-nav" aria-label="Основная навигация">
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

      <NavLink to="/create" className="bottom-nav__item" aria-label="Создать пост">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
        </svg>
      </NavLink>

      <NavLink
        to={`/profile/${CURRENT_USERNAME}`}
        className={({ isActive }) => `bottom-nav__item${isActive ? " is-active" : ""}`}
        aria-label="Профиль"
      >
        <img className="bottom-nav__avatar" src={avatarFor(CURRENT_USERNAME)} alt="" />
      </NavLink>
    </nav>
  );
}
