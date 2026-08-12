import { useNavigate } from "react-router-dom";
import Header from "../components/Header.jsx";
import { useStore } from "../context/StoreContext.jsx";
import { THEMES } from "../utils/theme.js";
import "./Settings.css";

const THEME_KEYS = {
  system: "settings.themeSystem",
  light: "settings.themeLight",
  dark: "settings.themeDark",
};

export default function Settings() {
  const navigate = useNavigate();
  const { theme, setTheme, lang, setLang, logout, t } = useStore();

  function handleLogout() {
    logout();
    navigate("/", { replace: true });
  }

  return (
    <>
      <Header title={t("settings.title")} showBack />
      <main className="settings container">
        <section className="settings__section">
          <h2 className="settings__title">{t("settings.theme")}</h2>
          <div className="settings__segmented" role="radiogroup" aria-label={t("settings.theme")}>
            {THEMES.map((value) => (
              <button
                key={value}
                type="button"
                role="radio"
                aria-checked={theme === value}
                className={`settings__segment${theme === value ? " is-active" : ""}`}
                onClick={() => setTheme(value)}
              >
                {t(THEME_KEYS[value])}
              </button>
            ))}
          </div>
        </section>

        <section className="settings__section">
          <h2 className="settings__title">{t("settings.language")}</h2>
          <div className="settings__segmented" role="radiogroup" aria-label={t("settings.language")}>
            <button
              type="button"
              role="radio"
              aria-checked={lang === "ru"}
              className={`settings__segment${lang === "ru" ? " is-active" : ""}`}
              onClick={() => setLang("ru")}
            >
              Русский
            </button>
            <button
              type="button"
              role="radio"
              aria-checked={lang === "en"}
              className={`settings__segment${lang === "en" ? " is-active" : ""}`}
              onClick={() => setLang("en")}
            >
              English
            </button>
          </div>
        </section>

        <section className="settings__section">
          <h2 className="settings__title">{t("settings.account")}</h2>
          <button type="button" className="settings__row" onClick={() => navigate("/settings/profile")}>
            {t("profile.editProfile")}
          </button>
          <button type="button" className="settings__row settings__row--danger" onClick={handleLogout}>
            {t("settings.logout")}
          </button>
        </section>
      </main>
    </>
  );
}
