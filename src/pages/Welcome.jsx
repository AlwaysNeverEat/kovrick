import { useNavigate } from "react-router-dom";
import { useStore } from "../context/StoreContext.jsx";
import ProfileForm from "../components/ProfileForm.jsx";
import Logo from "../components/Logo.jsx";
import "./Welcome.css";

export default function Welcome() {
  const navigate = useNavigate();
  const { register, t } = useStore();

  function handleSubmit(values) {
    register(values);
    navigate("/", { replace: true });
  }

  return (
    <div className="welcome">
      <div className="welcome__inner container">
        <Logo size="lg" as="div" />
        <p className="welcome__subtitle">{t("welcome.subtitle")}</p>

        <ProfileForm
          initialValues={{ name: "", username: "", bio: "", location: "", avatarUrl: null }}
          submitLabel={t("profileForm.register")}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}
