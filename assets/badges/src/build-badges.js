// Generates the Pivvot Certified Vision Framer badge options as SVG.
const fs = require('fs');
const path = require('path');

const C = {
  navy: '#1F378C', magenta: '#E43D96', orange: '#F15A25',
  pink: '#F1A2C7', lavender: '#9596C6', white: '#FFFFFF',
};
const FONT = "PoppinsBadge, Poppins, 'Segoe UI', Helvetica, Arial, sans-serif";
// Poppins (SIL OFL) subset to the badge's characters and embedded, so the SVG renders
// correctly anywhere, including as an <img> where external fonts can't load.
// The Pivvot Vision Framing wordmark (the Canva "Cert Badge") is set in a squared
// condensed face; Saira Semi Condensed (SIL OFL) matches it and is embedded the same way.
const WM = "PivvotWordmark, 'Saira Semi Condensed', 'Arial Narrow', sans-serif";
const face = (fam, file, w) =>
  `@font-face{font-family:${fam};font-weight:${w};src:url(data:font/woff2;base64,${fs.readFileSync(path.join(__dirname, 'fonts', `${file}-${w}.woff2`)).toString('base64')}) format('woff2')}`;
const FACES = [600, 700, 800].map((w) => face('PoppinsBadge', 'pb', w)).join('')
  + [500, 700, 800].map((w) => face('PivvotWordmark', 'ss', w)).join('');

// The Vision Frame icon from the certification handouts, rebuilt as vectors.
// Outer square s, inner window inset 20% (matches icon-vision-frame.png).
function frame(x, y, s, { inset = 0.2, sw = s * 0.018, window = C.white } = {}) {
  const i = s * inset, a = x, b = y, c = x + s, d = y + s;
  const p = (pts) => pts.map((q) => q.join(',')).join(' ');
  return `<g stroke="${C.navy}" stroke-width="${sw.toFixed(2)}" stroke-linejoin="round">
    <polygon fill="${C.pink}" points="${p([[a, b], [c, b], [c - i, b + i], [a + i, b + i]])}"/>
    <polygon fill="${C.lavender}" points="${p([[c, b], [c, d], [c - i, d - i], [c - i, b + i]])}"/>
    <polygon fill="${C.magenta}" points="${p([[a, d], [c, d], [c - i, d - i], [a + i, d - i]])}"/>
    <polygon fill="${C.orange}" points="${p([[a, b], [a + i, b + i], [a + i, d - i], [a, d]])}"/>
    <rect x="${a + i}" y="${b + i}" width="${s - 2 * i}" height="${s - 2 * i}" fill="${window}" stroke-linejoin="miter"/>
    <rect x="${a}" y="${b}" width="${s}" height="${s}" fill="none" stroke-linejoin="miter"/>
  </g>`;
}

const grad = (id, x2 = '1', y2 = '0') => `<linearGradient id="${id}" x1="0" y1="0" x2="${x2}" y2="${y2}">
    <stop offset="0" stop-color="${C.magenta}"/><stop offset="1" stop-color="${C.orange}"/></linearGradient>`;

const svg = (w, h, title, body) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img" aria-label="${title}">
  <title>${title}</title>
  <style>${FACES}</style>
  ${body}
</svg>
`;

const TITLE = 'Pivvot Vision Framing: Certified Vision Framer';

// A · The Frame Seal — circular credential seal (ICF, Scrum Alliance, SHRM).
function seal(p = 'a') {
  const cx = 300, cy = 300;
  const arc = (r, top) => top
    ? `M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`
    : `M ${cx - r} ${cy} A ${r} ${r} 0 0 0 ${cx + r} ${cy}`;
  const txt = (id, s, size, ls, font = FONT) =>
    `<text font-family="${font}" font-weight="700" font-size="${size}" letter-spacing="${ls}" fill="${C.white}" text-anchor="middle"><textPath href="#${id}" startOffset="50%">${s}</textPath></text>`;
  const fs_ = 184, fx = cx - fs_ / 2;
  return svg(600, 600, TITLE, `<defs>${grad(p + 'g')}
    <path id="${p}top" d="${arc(231, true)}"/><path id="${p}bot" d="${arc(254, false)}"/></defs>
  <circle cx="${cx}" cy="${cy}" r="296" fill="url(#${p}g)"/>
  <circle cx="${cx}" cy="${cy}" r="284" fill="${C.navy}"/>
  ${txt(p + 'top', 'CERTIFIED VISION FRAMER', 29, 5)}
  ${txt(p + 'bot', 'PIVVOT VISION FRAMING', 31, 6, WM)}
  ${frame(cx - 262 - 11, cy - 11, 22, { sw: 1.4 })}
  ${frame(cx + 262 - 11, cy - 11, 22, { sw: 1.4 })}
  <circle cx="${cx}" cy="${cy}" r="202" fill="url(#${p}g)"/>
  <circle cx="${cx}" cy="${cy}" r="194" fill="${C.white}"/>
  ${frame(fx, cy - fs_ / 2, fs_)}`);
}

// B · The Credential Hexagon — digital-badge silhouette (AWS, Microsoft, Credly).
function hexagon(p = 'b') {
  const cx = 300, cy = 330, R = 290;
  const hex = (r) => [-90, -30, 30, 90, 150, 210]
    .map((deg) => { const t = (deg * Math.PI) / 180; return `${(cx + r * Math.cos(t)).toFixed(1)},${(cy + r * Math.sin(t)).toFixed(1)}`; })
    .join(' ');
  return svg(600, 660, TITLE, `<defs>${grad(p + 'g')}</defs>
  <polygon points="${hex(R)}" fill="${C.navy}"/>
  <polygon points="${hex(R - 16)}" fill="${C.white}"/>
  <polygon points="${hex(R - 28)}" fill="none" stroke="${C.lavender}" stroke-width="2"/>
  <text x="${cx}" y="160" font-family="${WM}" font-weight="700" font-size="21" letter-spacing="2.5" fill="${C.navy}" text-anchor="middle">PIVVOT VISION FRAMING</text>
  ${frame(cx - 80, 182, 160)}
  <polygon points="6,372 44,410 6,448 70,448 70,372" fill="#B3265F"/>
  <polygon points="594,372 556,410 594,448 530,448 530,372" fill="#C2410C"/>
  <polygon points="30,360 570,360 570,436 30,436" fill="url(#${p}g)"/>
  <text x="${cx}" y="412" font-family="${FONT}" font-weight="800" font-size="38" letter-spacing="10" fill="${C.white}" text-anchor="middle">CERTIFIED</text>
  <text x="${cx}" y="498" font-family="${FONT}" font-weight="800" font-size="31" letter-spacing="3" fill="${C.navy}" text-anchor="middle">VISION FRAMER</text>`);
}

// C · The Open Frame — the badge is the Vision Frame itself.
function openFrame(p = 'c') {
  const s = 580, x = 10, y = 10, i = 118;
  return svg(600, 600, TITLE, `<defs>${grad(p + 'g')}</defs>
  ${frame(x, y, s, { inset: i / s, sw: 12 })}
  <text x="300" y="82" font-family="${WM}" font-weight="700" font-size="26" letter-spacing="3" fill="${C.navy}" text-anchor="middle">PIVVOT VISION FRAMING</text>
  <text x="300" y="536" font-family="${FONT}" font-weight="800" font-size="30" letter-spacing="12" fill="${C.white}" text-anchor="middle">CERTIFIED</text>
  <text x="300" y="286" font-family="${FONT}" font-weight="800" font-size="70" letter-spacing="-1" fill="${C.navy}" text-anchor="middle">Vision</text>
  <text x="300" y="360" font-family="${FONT}" font-weight="800" font-size="70" letter-spacing="-1" fill="${C.navy}" text-anchor="middle">Framer</text>
  <rect x="250" y="388" width="100" height="8" rx="4" fill="url(#${p}g)"/>`);
}

// D · The Signature Lockup — horizontal credential chip (Google Cloud, HubSpot Academy).
function lockup(p = 'd') {
  return svg(900, 280, TITLE, `<defs>${grad(p + 'g', '0', '1')}</defs>
  <rect x="3" y="3" width="894" height="274" rx="137" fill="${C.white}" stroke="${C.navy}" stroke-width="6"/>
  ${frame(62, 55, 170)}
  <rect x="274" y="62" width="6" height="156" rx="3" fill="url(#${p}g)"/>
  <text x="316" y="102" font-family="${WM}" font-weight="700" font-size="28" letter-spacing="4" fill="${C.magenta}">PIVVOT VISION FRAMING</text>
  <text x="314" y="166" font-family="${FONT}" font-weight="800" font-size="54" fill="${C.navy}">Certified</text>
  <text x="314" y="226" font-family="${FONT}" font-weight="800" font-size="54" fill="${C.navy}">Vision Framer</text>`);
}

// E · The Cert Wordmark — the existing Pivvot Vision Framing cert badge (stacked
// wordmark, each line set to the same width) framed by the handout Vision Frame.
function wordmark(p = 'e') {
  const s = 580, x = 10, y = 10, i = 96, w = 300, lx = 300 - w / 2;
  const line = (t, wt, size, by) =>
    `<text x="${lx}" y="${by}" font-family="${WM}" font-weight="${wt}" font-size="${size}" fill="${C.navy}" textLength="${w}" lengthAdjust="spacing">${t}</text>`;
  return svg(600, 600, TITLE, `
  ${frame(x, y, s, { inset: i / s, sw: 12 })}
  <text x="300" y="68" font-family="${FONT}" font-weight="800" font-size="28" letter-spacing="12" fill="${C.navy}" text-anchor="middle">CERTIFIED</text>
  <text x="300" y="552" font-family="${FONT}" font-weight="800" font-size="26" letter-spacing="7" fill="${C.white}" text-anchor="middle">VISION FRAMER</text>
  ${line('PIVVOT', 500, 88, 250)}
  ${line('VISION', 800, 88, 332)}
  ${line('FRAMING', 700, 76, 406)}`);
}

const out = process.argv[2] || path.join(__dirname, '..');
fs.mkdirSync(out, { recursive: true });
const files = {
  'option-a-frame-seal.svg': seal(),
  'option-b-credential-hexagon.svg': hexagon(),
  'option-c-open-frame.svg': openFrame(),
  'option-d-signature-lockup.svg': lockup(),
  'option-e-cert-wordmark.svg': wordmark(),
};
for (const [n, s] of Object.entries(files)) fs.writeFileSync(path.join(out, n), s);
module.exports = { seal, hexagon, openFrame, lockup, wordmark };
console.log('wrote', Object.keys(files).join(', '));
