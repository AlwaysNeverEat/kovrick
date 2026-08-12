export function timeAgo(isoString) {
  const diffMs = Date.now() - new Date(isoString).getTime();
  const min = Math.round(diffMs / 60000);
  if (min < 1) return "сейчас";
  if (min < 60) return `${min} мин`;
  const hrs = Math.round(min / 60);
  if (hrs < 24) return `${hrs} ч`;
  const days = Math.round(hrs / 24);
  if (days < 7) return `${days} д`;
  const weeks = Math.round(days / 7);
  return `${weeks} нед`;
}

function pluralize(n, one, few, many) {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return one;
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return few;
  return many;
}

export function timeAgoLong(isoString) {
  const diffMs = Date.now() - new Date(isoString).getTime();
  const min = Math.round(diffMs / 60000);
  if (min < 1) return "только что";
  if (min < 60) return `${min} ${pluralize(min, "минуту", "минуты", "минут")} назад`;
  const hrs = Math.round(min / 60);
  if (hrs < 24) return `${hrs} ${pluralize(hrs, "час", "часа", "часов")} назад`;
  const days = Math.round(hrs / 24);
  if (days < 7) return `${days} ${pluralize(days, "день", "дня", "дней")} назад`;
  const weeks = Math.round(days / 7);
  return `${weeks} ${pluralize(weeks, "неделю", "недели", "недель")} назад`;
}
