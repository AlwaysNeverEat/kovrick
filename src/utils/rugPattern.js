// Procedural woven-rug swatches used as stand-ins for real photos in this
// mock-data prototype. Deterministic per seed so the feed looks stable
// across renders without ever hitting the network.

const PALETTE = ["#c1432a", "#e3a72e", "#1f6f6b", "#33355e", "#8b3a52", "#3f7d3a"];
const BASES = ["#faf3e7", "#f0e6d4", "#221b15", "#2a2118"];

function hashSeed(seed) {
  let h = 2166136261;
  const s = String(seed);
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h);
}

function mulberry32(a) {
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function pick(rng, arr) {
  return arr[Math.floor(rng() * arr.length)];
}

/**
 * Builds a deterministic kilim-style SVG pattern as a data URI.
 * variant: "diamond" | "stripe" | "chevron"
 */
export function rugPatternDataUri(seed, { width = 480, height = 360, variant } = {}) {
  const rng = mulberry32(hashSeed(seed));
  const base = pick(rng, BASES);
  const accents = [...PALETTE].sort(() => rng() - 0.5).slice(0, 3);
  const v = variant || pick(rng, ["diamond", "stripe", "chevron", "grid"]);
  const tile = 40 + Math.floor(rng() * 3) * 20;

  let defsPattern = "";
  if (v === "diamond") {
    defsPattern = `
      <rect width="${tile}" height="${tile}" fill="${base}"/>
      <polygon points="${tile / 2},2 ${tile - 2},${tile / 2} ${tile / 2},${tile - 2} 2,${tile / 2}" fill="${accents[0]}" opacity="0.9"/>
      <circle cx="${tile / 2}" cy="${tile / 2}" r="${tile * 0.12}" fill="${accents[1]}"/>
    `;
  } else if (v === "stripe") {
    const bands = 6;
    let rects = "";
    for (let i = 0; i < bands; i++) {
      rects += `<rect x="0" y="${(i * tile) / bands}" width="${tile}" height="${tile / bands}" fill="${i % 2 === 0 ? accents[i % 3] : base}"/>`;
    }
    defsPattern = `<rect width="${tile}" height="${tile}" fill="${base}"/>${rects}`;
  } else if (v === "chevron") {
    defsPattern = `
      <rect width="${tile}" height="${tile}" fill="${base}"/>
      <polyline points="0,${tile / 2} ${tile / 2},0 ${tile},${tile / 2}" stroke="${accents[0]}" stroke-width="${tile * 0.14}" fill="none"/>
      <polyline points="0,${tile} ${tile / 2},${tile / 2} ${tile},${tile}" stroke="${accents[1]}" stroke-width="${tile * 0.14}" fill="none"/>
    `;
  } else {
    defsPattern = `
      <rect width="${tile}" height="${tile}" fill="${base}"/>
      <rect x="0" y="0" width="${tile * 0.5}" height="${tile * 0.5}" fill="${accents[0]}"/>
      <rect x="${tile * 0.5}" y="${tile * 0.5}" width="${tile * 0.5}" height="${tile * 0.5}" fill="${accents[1]}"/>
      <rect x="${tile * 0.22}" y="${tile * 0.22}" width="${tile * 0.56}" height="${tile * 0.56}" fill="none" stroke="${accents[2]}" stroke-width="${tile * 0.06}"/>
    `;
  }

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
    <defs>
      <pattern id="p" width="${tile}" height="${tile}" patternUnits="userSpaceOnUse">
        ${defsPattern}
      </pattern>
    </defs>
    <rect width="${width}" height="${height}" fill="url(#p)"/>
    <rect width="${width}" height="${height}" fill="${accents[2]}" opacity="0.04"/>
  </svg>`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

/** Small circular monogram avatar, woven-stripe background + initials. */
export function avatarDataUri(seed, initials) {
  const rng = mulberry32(hashSeed(seed));
  const accents = [...PALETTE].sort(() => rng() - 0.5).slice(0, 2);
  const size = 96;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="${accents[0]}"/>
        <stop offset="1" stop-color="${accents[1]}"/>
      </linearGradient>
    </defs>
    <rect width="${size}" height="${size}" fill="url(#g)"/>
    <text x="50%" y="53%" text-anchor="middle" dominant-baseline="middle" font-family="Dela Gothic One, sans-serif" font-size="34" fill="#fff7ef">${initials}</text>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}
