import { useStore } from "../context/StoreContext.jsx";
import "./Toast.css";

export default function Toast() {
  const { toast } = useStore();
  if (!toast) return null;

  return (
    <div className="toast" role="status" aria-live="polite">
      {toast}
    </div>
  );
}
