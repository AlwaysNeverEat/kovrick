import { useState } from "react";
import { useStore } from "../context/StoreContext.jsx";
import "./PostMedia.css";

export default function PostMedia({ image, nsfw, onInteract }) {
  const { t } = useStore();
  const [revealed, setRevealed] = useState(false);
  if (!image) return null;

  return (
    <div className={`post-media${nsfw && !revealed ? " is-blurred" : ""}`}>
      <img src={image} alt="" loading="lazy" />
      {nsfw && !revealed && (
        <div className="nsfw-overlay">
          <span className="nsfw-overlay__badge">18+</span>
          <p className="nsfw-overlay__label">{t("nsfw.label")}</p>
          <button
            type="button"
            className="btn btn--primary"
            onClick={(e) => {
              onInteract?.(e);
              setRevealed(true);
            }}
          >
            {t("nsfw.reveal")}
          </button>
        </div>
      )}
    </div>
  );
}
