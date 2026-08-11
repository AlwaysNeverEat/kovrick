import { useState } from "react";
import "./PostMedia.css";

export default function PostMedia({ image, nsfw, onInteract }) {
  const [revealed, setRevealed] = useState(false);
  if (!image) return null;

  return (
    <div className={`post-media${nsfw && !revealed ? " is-blurred" : ""}`}>
      <img src={image} alt="" loading="lazy" />
      {nsfw && !revealed && (
        <div className="nsfw-overlay">
          <span className="nsfw-overlay__badge">18+</span>
          <p className="nsfw-overlay__label">Возможен деликатный контент</p>
          <button
            type="button"
            className="btn btn--primary"
            onClick={(e) => {
              onInteract?.(e);
              setRevealed(true);
            }}
          >
            Показать
          </button>
        </div>
      )}
    </div>
  );
}
