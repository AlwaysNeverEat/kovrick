import { NavLink, useNavigate } from "react-router-dom";
import Logo from "./Logo.jsx";
import { CURRENT_USERNAME } from "../data/mockData.js";
import "./SideNav.css";

export default function SideNav() {
  const navigate = useNavigate();

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
          Лента
        </NavLink>
        <NavLink
          to={`/profile/${CURRENT_USERNAME}`}
          className={({ isActive }) => `side-nav__link${isActive ? " is-active" : ""}`}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="8" r="3.6" stroke="currentColor" strokeWidth="2" />
            <path d="M4.5 20C5.6 16.5 8.4 14.5 12 14.5C15.6 14.5 18.4 16.5 19.5 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          Профиль
        </NavLink>
      </nav>

      <button type="button" className="btn btn--primary btn--block" onClick={() => navigate("/create")}>
        Создать
      </button>

      <p className="side-nav__footnote">визуальный прототип · без бэкенда</p>
    </aside>
  );
}
