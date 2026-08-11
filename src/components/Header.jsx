import { Link, useNavigate } from "react-router-dom";
import Logo from "./Logo.jsx";
import "./Header.css";

export default function Header({ title, showBack = false }) {
  const navigate = useNavigate();

  return (
    <header className="app-header">
      <div className="app-header__row container">
        {showBack ? (
          <button
            type="button"
            className="app-header__back"
            onClick={() => navigate(-1)}
            aria-label="Назад"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M15 5L8 12L15 19" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        ) : (
          <Link to="/" className="app-header__logo-link" aria-label="Коврик">
            <Logo size="sm" />
          </Link>
        )}
        {title ? <h1 className="app-header__title">{title}</h1> : <span className="app-header__spacer" />}
        <span className="app-header__end" />
      </div>
    </header>
  );
}
