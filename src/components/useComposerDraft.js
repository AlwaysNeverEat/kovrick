import { useRef, useState } from "react";
import { useStore } from "../context/StoreContext.jsx";

const MAX_LENGTH = 500;

export default function useComposerDraft({ quotedPostId = null, onPublished } = {}) {
  const { addPost, showToast } = useStore();
  const fileRef = useRef(null);
  const textRef = useRef(null);
  const [text, setText] = useState("");
  const [preview, setPreview] = useState(null);

  const canPublish = text.trim().length > 0 || !!preview;
  const isDirty = canPublish;

  function handleFile(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setPreview(reader.result);
    reader.readAsDataURL(file);
  }

  function clearPreview() {
    setPreview(null);
    if (fileRef.current) fileRef.current.value = "";
  }

  function reset() {
    setText("");
    clearPreview();
  }

  function publish(e) {
    e.preventDefault();
    if (!canPublish) return;
    addPost({ text: text.trim(), image: preview, quotedPostId });
    showToast("Пост опубликован");
    reset();
    onPublished?.();
  }

  return {
    fileRef,
    textRef,
    text,
    setText,
    preview,
    canPublish,
    isDirty,
    maxLength: MAX_LENGTH,
    handleFile,
    clearPreview,
    reset,
    publish,
  };
}
