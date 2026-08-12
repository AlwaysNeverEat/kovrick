import { useStore } from "../context/StoreContext.jsx";
import "./Logo.css";

export default function Logo({ size = "md", as: Tag = "span" }) {
  const { t } = useStore();
  const label = t("brand.name");

  return (
    <Tag className={`logo logo--${size}`}>
      {label}
    </Tag>
  );
}
