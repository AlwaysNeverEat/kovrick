import { Link } from "react-router-dom";

const TOKEN_RE = /([#@][\p{L}\p{N}_]+)/gu;
const TAG_RE = /#[\p{L}\p{N}_]+/gu;

function stop(e) {
  e.stopPropagation();
}

export function renderRichText(text) {
  if (!text) return null;
  return text.split(TOKEN_RE).map((part, i) => {
    if (!part) return null;
    if (part[0] === "#") {
      const tag = part.slice(1).toLowerCase();
      return (
        <Link key={i} to={`/tag/${encodeURIComponent(tag)}`} className="rich-token" onClick={stop}>
          {part}
        </Link>
      );
    }
    if (part[0] === "@") {
      return (
        <Link key={i} to={`/profile/${encodeURIComponent(part.slice(1))}`} className="rich-token" onClick={stop}>
          {part}
        </Link>
      );
    }
    return part;
  });
}

export function extractTags(text) {
  if (!text) return [];
  return (text.match(TAG_RE) || []).map((t) => t.slice(1).toLowerCase());
}
