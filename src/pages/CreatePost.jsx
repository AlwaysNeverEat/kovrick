import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header.jsx";
import { usePosts } from "../context/PostsContext.jsx";
import { avatarFor, CURRENT_USERNAME } from "../data/mockData.js";
import "./CreatePost.css";

export default function CreatePost() {
  const navigate = useNavigate();
  const { addPost } = usePosts();
  const fileRef = useRef(null);
  const [text, setText] = useState("");
  const [preview, setPreview] = useState(null);

  const canPublish = text.trim().length > 0 || preview;

  function handleFile(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setPreview(reader.result);
    reader.readAsDataURL(file);
  }

  function handlePublish(e) {
    e.preventDefault();
    if (!canPublish) return;
    const id = addPost(text.trim(), preview);
    navigate(`/post/${id}`);
  }

  return (
    <>
      <Header title="Новый пост" showBack />
      <main className="create container">
        <form className="create__form" onSubmit={handlePublish}>
          <div className="create__row">
            <img className="create__avatar" src={avatarFor(CURRENT_USERNAME)} alt="" />
            <textarea
              className="create__text"
              placeholder="Что постелить на ленту сегодня?"
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={4}
              maxLength={500}
              autoFocus
            />
          </div>

          {preview && (
            <div className="create__preview">
              <img src={preview} alt="Предпросмотр" />
              <button
                type="button"
                className="create__remove"
                onClick={() => {
                  setPreview(null);
                  if (fileRef.current) fileRef.current.value = "";
                }}
                aria-label="Удалить фото"
              >
                ✕
              </button>
            </div>
          )}

          <div className="create__toolbar">
            <label className="create__photo-btn" aria-label="Добавить фото">
              <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} className="visually-hidden" />
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M4 17L8.5 11L12 15L15 12L20 17" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                <rect x="3" y="4" width="18" height="16" rx="2.4" stroke="currentColor" strokeWidth="1.8" />
                <circle cx="8" cy="8.5" r="1.6" fill="currentColor" />
              </svg>
            </label>
            <span className="create__counter">{text.length}/500</span>
          </div>

          <button type="submit" className="btn btn--primary btn--block create__submit" disabled={!canPublish}>
            Опубликовать
          </button>
          <p className="create__note">Это прототип: пост появится только у вас в браузере, никуда не отправляется.</p>
        </form>
      </main>
    </>
  );
}
