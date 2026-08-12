import { Link, useNavigate } from "react-router-dom";
import Logo from "./Logo.jsx";
import "./Header.css";

export default function Header({ title, desktopTitle, showBack = false }) {
  const navigate = useNavigate();

  return (
    <header className="app-header">
      <div className="app-header__row container">
        <div className="app-header__side">
          {showBack && (
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
          )}
        </div>

        <div className="app-header__center">
          {title ? (
            <h1 className="app-header__title">{title}</h1>
          ) : (
            <>
              <Link to="/" className="app-header__logo-link" aria-label="Коврик">
                <Logo size="sm" />
              </Link>
              {desktopTitle && (
                <h1 className="app-header__title app-header__title--desktop">{desktopTitle}</h1>
              )}
            </>
          )}
        </div>

        <div className="app-header__side" />
      </div>
    </header>
  );
}
