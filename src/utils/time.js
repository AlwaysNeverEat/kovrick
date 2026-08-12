function pluralizeRu(n, one, few, many) {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return one;
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return few;
  return many;
}

function pluralizeEn(n, one, many) {
  return n === 1 ? one : many;
}

export function timeAgo(isoString, lang = "ru") {
  const diffMs = Date.now() - new Date(isoString).getTime();
  const min = Math.round(diffMs / 60000);
  if (lang === "en") {
    if (min < 1) return "now";
    if (min < 60) return `${min}m`;
    const hrs = Math.round(min / 60);
    if (hrs < 24) return `${hrs}h`;
    const days = Math.round(hrs / 24);
    if (days < 7) return `${days}d`;
    const weeks = Math.round(days / 7);
    return `${weeks}w`;
  }
  if (min < 1) return "сейчас";
  if (min < 60) return `${min} мин`;
  const hrs = Math.round(min / 60);
  if (hrs < 24) return `${hrs} ч`;
  const days = Math.round(hrs / 24);
  if (days < 7) return `${days} д`;
  const weeks = Math.round(days / 7);
  return `${weeks} нед`;
}

export function timeAgoLong(isoString, lang = "ru") {
  const diffMs = Date.now() - new Date(isoString).getTime();
  const min = Math.round(diffMs / 60000);

  if (lang === "en") {
    if (min < 1) return "just now";
    if (min < 60) return `${min} ${pluralizeEn(min, "minute", "minutes")} ago`;
    const hrs = Math.round(min / 60);
    if (hrs < 24) return `${hrs} ${pluralizeEn(hrs, "hour", "hours")} ago`;
    const days = Math.round(hrs / 24);
    if (days < 7) return `${days} ${pluralizeEn(days, "day", "days")} ago`;
    const weeks = Math.round(days / 7);
    return `${weeks} ${pluralizeEn(weeks, "week", "weeks")} ago`;
  }

  if (min < 1) return "только что";
  if (min < 60) return `${min} ${pluralizeRu(min, "минуту", "минуты", "минут")} назад`;
  const hrs = Math.round(min / 60);
  if (hrs < 24) return `${hrs} ${pluralizeRu(hrs, "час", "часа", "часов")} назад`;
  const days = Math.round(hrs / 24);
  if (days < 7) return `${days} ${pluralizeRu(days, "день", "дня", "дней")} назад`;
  const weeks = Math.round(days / 7);
  return `${weeks} ${pluralizeRu(weeks, "неделю", "недели", "недель")} назад`;
}
