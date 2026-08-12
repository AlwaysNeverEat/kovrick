import { useLocation, useNavigate } from "react-router-dom";
import { useStore } from "../context/StoreContext.jsx";
import "./ComposeFab.css";

export default function ComposeFab() {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useStore();

  return (
    <button
      type="button"
      className="compose-fab"
      onClick={() => navigate("/create", { state: { backgroundLocation: location } })}
      aria-label={t("nav.createPost")}
    >
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
        <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      </svg>
    </button>
  );
}
