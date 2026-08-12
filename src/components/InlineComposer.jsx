import { useLayoutEffect, useRef } from "react";
import { useStore } from "../context/StoreContext.jsx";
import useComposerDraft from "./useComposerDraft.js";
import "./InlineComposer.css";

export default function InlineComposer() {
  const { currentUsername, avatarFor } = useStore();
  const formRef = useRef(null);
  const draft = useComposerDraft();
  const { fileRef, textRef, text, setText, preview, canPublish, maxLength } = draft;

  useLayoutEffect(() => {
    const el = textRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  }, [text, textRef]);

  function handleKeyDown(e) {
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
      e.preventDefault();
      formRef.current?.requestSubmit();
    }
  }

  return (
    <form
      ref={formRef}
      className={`inline-composer${canPublish ? " is-active" : ""}`}
      onSubmit={draft.publish}
      aria-label="Новый пост"
    >
      <img className="inline-composer__avatar" src={avatarFor(currentUsername)} alt="" />

      <div className="inline-composer__body">
        <textarea
          ref={textRef}
          className="inline-composer__text"
          placeholder="Что постелить на ленту сегодня?"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={1}
          maxLength={maxLength}
        />

        {preview && (
          <div className="inline-composer__preview">
            <img src={preview} alt="Предпросмотр" />
            <button
              type="button"
              className="inline-composer__remove"
              onClick={draft.clearPreview}
              aria-label="Удалить фото"
            >
              ✕
            </button>
          </div>
        )}

        <div className="inline-composer__toolbar">
          <label className="inline-composer__photo-btn" aria-label="Добавить фото">
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              onChange={draft.handleFile}
              className="visually-hidden"
            />
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

          <span className="inline-composer__end">
            {canPublish && <span className="inline-composer__counter">{text.length}/{maxLength}</span>}
            <button type="submit" className="btn btn--primary inline-composer__submit" disabled={!canPublish}>
              Опубликовать
            </button>
          </span>
        </div>
      </div>
    </form>
  );
}
