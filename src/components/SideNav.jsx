import { NavLink } from "react-router-dom";
import Logo from "./Logo.jsx";
import { CURRENT_USERNAME } from "../data/mockData.js";
import "./SideNav.css";

const items = [
  { to: "/", label: "Лента", end: true },
  { to: "/create", label: "Создать" },
  { to: `/profile/${CURRENT_USERNAME}`, label: "Профиль" },
];

export default function SideNav() {
  return (
    <aside className="side-nav">
      <Logo size="lg" as="div" />
      <nav className="side-nav__links">
        {items.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) => `side-nav__link${isActive ? " is-active" : ""}`}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
      <p className="side-nav__footnote">визуальный прототип · без бэкенда</p>
    </aside>
  );
}
