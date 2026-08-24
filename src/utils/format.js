const SUFFIXES = {
  ru: ["", "К", "М", "Млрд"],
  en: ["", "K", "M", "B"],
};

// Compact counter: plain up to 999, then one decimal while the leading
// digit is single (1К…9.9К, 1М…9.9М…), integer once it's double-digit
// (10К…999К), rolling over to the next suffix instead of ever printing
// a 4-digit lead (so it never grows past ~4 characters).
export function formatCount(n, lang = "ru") {
  const suffixes = SUFFIXES[lang] || SUFFIXES.ru;
  const neg = n < 0;
  const abs = Math.abs(Math.round(n));

  if (abs < 1000) return `${neg ? "-" : ""}${abs}`;

  let tier = 0;
  let value = abs;
  while (value >= 1000 && tier < suffixes.length - 1) {
    value /= 1000;
    tier += 1;
  }

  let display = value < 10 ? Math.round(value * 10) / 10 : Math.round(value);
  if (display >= 1000 && tier < suffixes.length - 1) {
    tier += 1;
    display = display / 1000;
    display = display < 10 ? Math.round(display * 10) / 10 : Math.round(display);
  }

  const text = Number.isInteger(display) ? String(display) : display.toFixed(1);
  return `${neg ? "-" : ""}${text}${suffixes[tier]}`;
}
