import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useStore } from "../context/StoreContext.jsx";
import Logo from "./Logo.jsx";
import NavDrawer from "./NavDrawer.jsx";
import "./Header.css";

export default function Header({ title, desktopTitle, showBack = false, right }) {
  const navigate = useNavigate();
  const { currentUsername, avatarFor, t } = useStore();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="app-header">
        <div className="app-header__row container">
          <div className="app-header__side">
            {showBack ? (
              <button
                type="button"
                className="app-header__back"
                onClick={() => navigate(-1)}
                aria-label={t("header.back")}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M15 5L8 12L15 19" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            ) : (
              /* Top-level screens open the nav drawer from the avatar; sub-screens
                 give that slot to the back arrow, like the mobile Twitter app. */
              <button
                type="button"
                className="app-header__menu"
                onClick={() => setMenuOpen(true)}
                aria-label={t("nav.openMenu")}
                aria-haspopup="dialog"
                aria-expanded={menuOpen}
              >
                <img className="app-header__menu-avatar" src={avatarFor(currentUsername)} alt="" />
              </button>
            )}
          </div>

          <div className="app-header__center">
            {title ? (
              <h1 className="app-header__title">{title}</h1>
            ) : (
              <>
                <Link to="/" className="app-header__logo-link" aria-label={t("brand.name")}>
                  <Logo size="sm" />
                </Link>
                {desktopTitle && (
                  <h1 className="app-header__title app-header__title--desktop">{desktopTitle}</h1>
                )}
              </>
            )}
          </div>

          <div className="app-header__side">{right}</div>
        </div>
      </header>

      {/* Rendered outside <header> on purpose: the header's own z-index would
          trap the drawer underneath the bottom nav. */}
      {menuOpen && <NavDrawer onClose={() => setMenuOpen(false)} />}
    </>
  );
}
