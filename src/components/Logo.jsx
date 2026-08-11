import { useMemo } from "react";
import "./Logo.css";

export default function Logo({ size = "md", as: Tag = "span" }) {
  const label = useMemo(() => {
    const lang = (navigator.language || "en").toLowerCase();
    return lang.startsWith("ru") ? "Коврик" : "Kovrick";
  }, []);

  return (
    <Tag className={`logo logo--${size}`}>
      {label}
    </Tag>
  );
}
