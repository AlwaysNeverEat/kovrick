import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useStore } from "../context/StoreContext.jsx";
import useComposerDraft from "./useComposerDraft.js";
import QuotedPost from "./QuotedPost.jsx";
import "./Composer.css";

export default function Composer() {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUsername, avatarFor, t } = useStore();
  const backgroundLocation = location.state?.backgroundLocation || { pathname: "/" };
  const quotedPostId = location.state?.quotedPostId || null;

  function close() {
    navigate(backgroundLocation, { replace: true });
  }

  const draft = useComposerDraft({ quotedPostId, onPublished: close });
  const { fileRef, textRef, text, setText, preview, canPublish, maxLength } = draft;

  useEffect(() => {
    textRef.current?.focus();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    function onKey(e) {
      if (e.key === "Escape") close();
    }
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleBackdropClick() {
    if (!draft.isDirty) close();
  }

  return (
    <div className="composer-backdrop" onClick={handleBackdropClick}>
      <div
        className="composer"
        role="dialog"
        aria-modal="true"
        aria-label={quotedPostId ? t("composer.quoteDialog") : t("composer.newPost")}
        onClick={(e) => e.stopPropagation()}
      >
        <header className="composer__header">
          <button type="button" className="composer__close" onClick={close} aria-label={t("composer.close")}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M5 5L19 19M19 5L5 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
          <span className="composer__header-spacer" />
          <button
            type="submit"
            form="composer-form"
            className="btn btn--primary composer__submit"
            disabled={!canPublish}
          >
            {t("composer.publish")}
          </button>
        </header>

        <form id="composer-form" className="composer__form" onSubmit={draft.publish}>
          <div className="composer__row">
            <img className="composer__avatar" src={avatarFor(currentUsername)} alt="" />
            <textarea
              ref={textRef}
              className="composer__text"
              placeholder={t("composer.placeholder")}
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={4}
              maxLength={maxLength}
            />
          </div>

          {quotedPostId && (
            <div className="composer__quoted">
              <QuotedPost postId={quotedPostId} />
            </div>
          )}

          {preview && (
            <div className="composer__preview">
              <img src={preview} alt={t("composer.previewAlt")} />
              <button
                type="button"
                className="composer__remove"
                onClick={draft.clearPreview}
                aria-label={t("composer.removePhoto")}
              >
                ✕
              </button>
            </div>
          )}

          <div className="composer__toolbar">
            <label className="composer__photo-btn" aria-label={t("composer.addPhoto")}>
              <input ref={fileRef} type="file" accept="image/*" onChange={draft.handleFile} className="visually-hidden" />
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M4 17L8.5 11L12 15L15 12L20 17"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <rect x="3" y="4" width="18" height="16" rx="2.4" stroke="currentColor" strokeWidth="1.8" />
                <circle cx="8" cy="8.5" r="1.6" fill="currentColor" />
              </svg>
            </label>
            <span className="composer__counter">{text.length}/{maxLength}</span>
          </div>
          <p className="composer__note">{t("composer.note")}</p>
        </form>
      </div>
    </div>
  );
}
