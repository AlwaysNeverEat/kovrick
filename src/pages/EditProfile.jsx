import { useNavigate } from "react-router-dom";
import Header from "../components/Header.jsx";
import ProfileForm from "../components/ProfileForm.jsx";
import { useStore } from "../context/StoreContext.jsx";
import "./EditProfile.css";

export default function EditProfile() {
  const navigate = useNavigate();
  const { users, currentUsername, getUser, updateProfile, logout, showToast } = useStore();
  const me = getUser(currentUsername);

  if (!me) return null;

  function handleSubmit(values) {
    updateProfile(values);
    showToast("Профиль обновлён");
    navigate(`/profile/${values.username}`, { replace: true });
  }

  function handleLogout() {
    logout();
    navigate("/", { replace: true });
  }

  return (
    <>
      <Header title="Редактировать профиль" showBack />
      <main className="edit-profile container">
        <ProfileForm
          initialValues={me}
          submitLabel="Сохранить"
          onSubmit={handleSubmit}
          isUsernameTaken={(u) => Boolean(users[u]) && u !== currentUsername}
          extra={
            <button type="button" className="btn btn--ghost btn--block edit-profile__logout" onClick={handleLogout}>
              Выйти
            </button>
          }
        />
      </main>
    </>
  );
}
