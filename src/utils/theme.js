export const THEMES = ["system", "light", "dark"];
const THEME_KEY = "kovrick:theme";

export function getStoredTheme() {
  try {
    const t = localStorage.getItem(THEME_KEY);
    return THEMES.includes(t) ? t : "system";
  } catch {
    return "system";
  }
}

export function applyTheme(theme) {
  const root = document.documentElement;
  if (theme === "dark" || theme === "light") {
    root.dataset.theme = theme;
  } else {
    delete root.dataset.theme;
  }
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch {
    // ignore
  }
}
