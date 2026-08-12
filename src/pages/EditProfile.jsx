import { useNavigate } from "react-router-dom";
import Header from "../components/Header.jsx";
import ProfileForm from "../components/ProfileForm.jsx";
import { useStore } from "../context/StoreContext.jsx";
import "./EditProfile.css";

export default function EditProfile() {
  const navigate = useNavigate();
  const { currentUsername, getUser, updateProfile, showToast, t } = useStore();
  const me = getUser(currentUsername);

  if (!me) return null;

  function handleSubmit(values) {
    updateProfile(values);
    showToast(t("toast.profileUpdated"));
    navigate(`/profile/${values.username}`, { replace: true });
  }

  return (
    <>
      <Header title={t("profile.editProfile")} showBack />
      <main className="edit-profile container">
        <ProfileForm initialValues={me} submitLabel={t("profileForm.save")} onSubmit={handleSubmit} />
      </main>
    </>
  );
}
