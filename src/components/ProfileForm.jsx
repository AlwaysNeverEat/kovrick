import { useRef, useState } from "react";
import { avatarDataUri } from "../utils/rugPattern.js";
import { initials } from "../data/mockData.js";
import { useStore } from "../context/StoreContext.jsx";
import "./ProfileForm.css";

const HANDLE_RE = /^[a-z0-9_.]{3,20}$/;

function CameraIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path
        d="M4 8.5C4 7.4 4.9 6.5 6 6.5H8L9 4.5H15L16 6.5H18C19.1 6.5 20 7.4 20 8.5V17C20 18.1 19.1 19 18 19H6C4.9 19 4 18.1 4 17V8.5Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="12.5" r="3.3" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  );
}

export default function ProfileForm({ initialValues, submitLabel, onSubmit }) {
  const { users, currentUsername, t } = useStore();
  const [name, setName] = useState(initialValues.name || "");
  const [username, setUsername] = useState(initialValues.username || "");
  const [bio, setBio] = useState(initialValues.bio || "");
  const [location, setLocation] = useState(initialValues.location || "");
  const [avatarUrl, setAvatarUrl] = useState(initialValues.avatarUrl || null);
  const fileRef = useRef(null);

  const handle = username.trim().toLowerCase();
  let handleError = "";
  if (handle && !HANDLE_RE.test(handle)) {
    handleError = t("profileForm.handleInvalid");
  } else if (handle && Boolean(users[handle]) && handle !== currentUsername) {
    handleError = t("profileForm.handleTaken");
  }

  const canSubmit = name.trim().length > 0 && handle.length > 0 && !handleError;

  function handleAvatarFile(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setAvatarUrl(reader.result);
    reader.readAsDataURL(file);
  }

  function removeAvatar() {
    setAvatarUrl(null);
    if (fileRef.current) fileRef.current.value = "";
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!canSubmit) return;
    onSubmit({ name: name.trim(), username: handle, bio: bio.trim(), location: location.trim(), avatarUrl });
  }

  return (
    <form className="profile-form" onSubmit={handleSubmit}>
      <div className="profile-form__avatar-wrap">
        <img
          className="profile-form__avatar"
          src={avatarUrl || avatarDataUri(handle || "?", initials(name || "?"))}
          alt=""
        />
        <label className="profile-form__avatar-edit" aria-label={t("profileForm.editAvatar")}>
          <input ref={fileRef} type="file" accept="image/*" onChange={handleAvatarFile} className="visually-hidden" />
          <CameraIcon />
        </label>
        {avatarUrl && (
          <button
            type="button"
            className="profile-form__avatar-remove"
            onClick={removeAvatar}
            aria-label={t("profileForm.removeAvatar")}
          >
            ✕
          </button>
        )}
      </div>

      <label className="profile-form__field">
        <span>{t("profileForm.name")}</span>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={40}
          placeholder={t("profileForm.namePlaceholder")}
          required
        />
      </label>

      <label className="profile-form__field">
        <span>{t("profileForm.handle")}</span>
        <div className="profile-form__handle-wrap">
          <span className="profile-form__at">@</span>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value.replace(/\s/g, ""))}
            maxLength={20}
            placeholder={t("profileForm.handlePlaceholder")}
            required
          />
        </div>
        {handleError && <small className="profile-form__error">{handleError}</small>}
      </label>

      <label className="profile-form__field">
        <span>{t("profileForm.bio")}</span>
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          maxLength={140}
          rows={3}
          placeholder={t("profileForm.bioPlaceholder")}
        />
      </label>

      <label className="profile-form__field">
        <span>{t("profileForm.location")}</span>
        <input
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          maxLength={40}
          placeholder={t("profileForm.locationPlaceholder")}
        />
      </label>

      <button type="submit" className="btn btn--primary btn--block" disabled={!canSubmit}>
        {submitLabel}
      </button>
    </form>
  );
}
