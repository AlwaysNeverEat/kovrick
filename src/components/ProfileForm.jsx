import { useState } from "react";
import { avatarDataUri } from "../utils/rugPattern.js";
import { initials } from "../data/mockData.js";
import "./ProfileForm.css";

const HANDLE_RE = /^[a-z0-9_.]{3,20}$/;

export default function ProfileForm({ initialValues, submitLabel, onSubmit, isUsernameTaken, extra }) {
  const [name, setName] = useState(initialValues.name || "");
  const [username, setUsername] = useState(initialValues.username || "");
  const [bio, setBio] = useState(initialValues.bio || "");
  const [location, setLocation] = useState(initialValues.location || "");

  const handle = username.trim().toLowerCase();
  let handleError = "";
  if (handle && !HANDLE_RE.test(handle)) {
    handleError = "3–20 символов: латиница, цифры, точка, подчёркивание";
  } else if (handle && isUsernameTaken(handle)) {
    handleError = "Этот ник уже занят";
  }

  const canSubmit = name.trim().length > 0 && handle.length > 0 && !handleError;

  function handleSubmit(e) {
    e.preventDefault();
    if (!canSubmit) return;
    onSubmit({ name: name.trim(), username: handle, bio: bio.trim(), location: location.trim() });
  }

  return (
    <form className="profile-form" onSubmit={handleSubmit}>
      <img className="profile-form__avatar" src={avatarDataUri(handle || "?", initials(name || "?"))} alt="" />

      <label className="profile-form__field">
        <span>Имя</span>
        <input value={name} onChange={(e) => setName(e.target.value)} maxLength={40} placeholder="Как вас называть" required />
      </label>

      <label className="profile-form__field">
        <span>Ник</span>
        <div className="profile-form__handle-wrap">
          <span className="profile-form__at">@</span>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value.replace(/\s/g, ""))}
            maxLength={20}
            placeholder="nickname"
            required
          />
        </div>
        {handleError && <small className="profile-form__error">{handleError}</small>}
      </label>

      <label className="profile-form__field">
        <span>О себе</span>
        <textarea value={bio} onChange={(e) => setBio(e.target.value)} maxLength={140} rows={3} placeholder="Пара слов о себе" />
      </label>

      <label className="profile-form__field">
        <span>Город</span>
        <input value={location} onChange={(e) => setLocation(e.target.value)} maxLength={40} placeholder="Где вы живёте" />
      </label>

      <button type="submit" className="btn btn--primary btn--block" disabled={!canSubmit}>
        {submitLabel}
      </button>

      {extra}
    </form>
  );
}
