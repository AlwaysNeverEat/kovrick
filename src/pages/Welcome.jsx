import { useNavigate } from "react-router-dom";
import { useStore } from "../context/StoreContext.jsx";
import ProfileForm from "../components/ProfileForm.jsx";
import Logo from "../components/Logo.jsx";
import "./Welcome.css";

export default function Welcome() {
  const navigate = useNavigate();
  const { users, register, login } = useStore();

  function handleSubmit(values) {
    register(values);
    navigate("/", { replace: true });
  }

  function handleDemoLogin() {
    login("lenavolna");
    navigate("/", { replace: true });
  }

  return (
    <div className="welcome">
      <div className="welcome__inner container">
        <Logo size="lg" as="div" />
        <h1 className="welcome__title">Добро пожаловать в Коврик</h1>
        <p className="welcome__subtitle">
          Это визуальный прототип без бэкенда. Заполните анкету, чтобы посмотреть, как выглядит своя лента и профиль.
        </p>

        <ProfileForm
          initialValues={{ name: "", username: "", bio: "", location: "" }}
          submitLabel="Зарегистрироваться"
          onSubmit={handleSubmit}
          isUsernameTaken={(u) => Boolean(users[u])}
        />

        <button type="button" className="btn btn--outline btn--block welcome__demo" onClick={handleDemoLogin}>
          Войти как Лена Волна (демо)
        </button>
      </div>
    </div>
  );
}
