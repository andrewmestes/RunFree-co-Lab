// Generates the Pivvot Vision Framing "Certified Vision Framer" badge options as SVG.
//
//   node build-badges.js [outDir]
//
// Round 2 (current): three hexagon badges (H1–H3) and three signature lockups
// (L1–L3), each with a different central mark: the handout Vision Frame, the
// Pivvot Vision Framing wordmark, or the process-overview (blue) Vision Frame.
// Round 1 (A–F) is kept for reference.
const fs = require('fs');
const path = require('path');

// ---------------------------------------------------------------- palette
const C = {
  navy: '#1F378C', magenta: '#E43D96', orange: '#F15A25',
  pink: '#F1A2C7', lavender: '#9596C6', white: '#FFFFFF',
  // Process-overview Vision Frame (tool-5-vision-frame.png)
  deep: '#252E67', periwinkle: '#7987BB',
  // Ribbon tails and folds: the gradient's end colours, darkened
  magentaDk: '#B42A72', magentaDkr: '#8C1E58', orangeDk: '#C4441A', orangeDkr: '#963211',
};

// ------------------------------------------------------------------ fonts
// Poppins (brand face) and Saira Semi Condensed (matches the Pivvot Vision
// Framing wordmark in the Canva cert badge). Both SIL OFL, subset to the
// characters the badges use and embedded, so the SVG renders correctly as an
// <img> anywhere.
const FONT = "PoppinsBadge, Poppins, 'Segoe UI', Helvetica, Arial, sans-serif";
const WM = "PivvotWordmark, 'Saira Semi Condensed', 'Arial Narrow', sans-serif";
const fontDir = path.join(__dirname, 'fonts');
const face = (fam, file, w) =>
  `@font-face{font-family:${fam};font-weight:${w};src:url(data:font/woff2;base64,${fs.readFileSync(path.join(fontDir, `${file}-${w}.woff2`)).toString('base64')}) format('woff2')}`;
const FACES = [600, 700, 800].map((w) => face('PoppinsBadge', 'pb', w)).join('')
  + [500, 700, 800].map((w) => face('PivvotWordmark', 'ss', w)).join('');

// Advance widths exported from the fonts, so layouts can be sized to their text.
const METRICS = JSON.parse(fs.readFileSync(path.join(fontDir, 'metrics.json'), 'utf8'));
function measure(text, key, size, ls = 0) {
  const m = METRICS[key];
  let u = 0;
  for (const ch of text) u += m.adv[ch] ?? m.adv['M'];
  return (u / m.upm) * size + ls * (text.length - 1);
}
const capHeight = (key, size) => (METRICS[key].cap / METRICS[key].upm) * size;
// Largest size ≤ max at which `text` fits in `maxW` (tracking scales with size).
function fit(text, key, max, ls, maxW) {
  let size = max;
  while (size > 8 && measure(text, key, size, ls * size / max) > maxW) size -= 0.5;
  return { size, ls: +(ls * size / max).toFixed(2) };
}

// ------------------------------------------------------------------ marks
// The Vision Frame icon from the certification handouts (icon-vision-frame.png):
// four bevels, inner window inset 20%.
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

// The Vision Frame icon from the process overview (tool-5-vision-frame.png): a
// deep navy bevelled frame inside a ring of periwinkle tiles, with see-through
// gaps between pieces. Proportions measured from the 301px source.
function frameBlue(x, y, s, id, { window = C.white } = {}) {
  const u = s / 301, band = 33 * u, nav = 42 * u, win = 75 * u, gap = 9 * u, mid = s / 2;
  const sq = (o) => `M${x + o},${y + o}H${x + s - o}V${y + s - o}H${x + o}Z`;
  const ln = (x1, y1, x2, y2) => `<line x1="${x + x1}" y1="${y + y1}" x2="${x + x2}" y2="${y + y2}"/>`;
  return `<mask id="${id}" maskUnits="userSpaceOnUse" x="${x}" y="${y}" width="${s}" height="${s}">
    <rect x="${x}" y="${y}" width="${s}" height="${s}" fill="#fff"/>
    <g stroke="#000" stroke-width="${gap.toFixed(2)}">
      ${ln(0, 0, s, s)}${ln(s, 0, 0, s)}
      ${ln(mid, 0, mid, band)}${ln(mid, s - band, mid, s)}${ln(0, mid, band, mid)}${ln(s - band, mid, s, mid)}
    </g></mask>
  ${window ? `<rect x="${x + win}" y="${y + win}" width="${s - 2 * win}" height="${s - 2 * win}" fill="${window}"/>` : ''}
  <g mask="url(#${id})" fill-rule="evenodd">
    <path fill="${C.periwinkle}" d="${sq(0)}${sq(band)}"/>
    <path fill="${C.deep}" d="${sq(nav)}${sq(win)}"/>
  </g>`;
}

// The stacked PIVVOT / VISION / FRAMING wordmark from the Canva cert badge:
// three lines justified to one width (light, extra-bold, bold).
const WM_LINES = [['PIVVOT', 500, 56], ['VISION', 800, 56], ['FRAMING', 700, 48]];
const WM_GAP = 20;
function wordmark(cx, top, w, { fill = C.navy, scale = 1 } = {}) {
  let y = top, out = '';
  for (const [t, wt, sz0] of WM_LINES) {
    const sz = sz0 * scale;
    y += capHeight(`ss-${wt}`, sz);
    out += `<text x="${(cx - w / 2).toFixed(1)}" y="${y.toFixed(1)}" font-family="${WM}" font-weight="${wt}" font-size="${sz.toFixed(1)}" fill="${fill}" textLength="${w}" lengthAdjust="spacing">${t}</text>`;
    y += WM_GAP * scale;
  }
  return out;
}
const wordmarkHeight = (scale = 1) =>
  WM_LINES.reduce((h, [, wt, sz]) => h + capHeight(`ss-${wt}`, sz * scale), 0) + (WM_LINES.length - 1) * WM_GAP * scale;

// ---------------------------------------------------------------- helpers
const grad = (id, from = C.magenta, to = C.orange, vertical = false) =>
  `<linearGradient id="${id}" x1="0" y1="0" x2="${vertical ? 0 : 1}" y2="${vertical ? 1 : 0}">
    <stop offset="0" stop-color="${from}"/><stop offset="1" stop-color="${to}"/></linearGradient>`;

const svg = (w, h, title, body) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img" aria-label="${title}">
  <title>${title}</title>
  <style>${FACES}</style>
  ${body}
</svg>
`;

const TITLE = 'Pivvot Vision Framing: Certified Vision Framer';
const text = (x, y, t, { font = FONT, wt = 700, size, ls = 0, fill, anchor = 'middle' }) =>
  `<text x="${x}" y="${y}" font-family="${font}" font-weight="${wt}" font-size="${size}" letter-spacing="${ls}" fill="${fill}" text-anchor="${anchor}">${t}</text>`;

// =============================================================== ROUND 2
// H · Hexagon badge (digital-credential silhouette: AWS, Microsoft, Credly).
//   mark: 'frame' | 'wordmark' | 'blue'
function hexBadge(mark, p) {
  const W = 600, H = 660, cx = 300, cy = 325, R = 290;
  const blue = mark === 'blue';
  const ink = blue ? C.deep : C.navy;            // band, labels
  const hair = blue ? C.periwinkle : C.lavender; // inner hairline
  const hex = (r) => [-90, -30, 30, 90, 150, 210]
    .map((deg) => { const t = (deg * Math.PI) / 180; return `${(cx + r * Math.cos(t)).toFixed(1)},${(cy + r * Math.sin(t)).toFixed(1)}`; })
    .join(' ');
  // Half-width of a hexagon of radius r at height y. Text is fitted against the
  // inner hairline hexagon (R - 28) so nothing touches that line.
  const halfAt = (y, r = R - 28) => {
    const d = Math.abs(y - cy);
    return d <= r / 2 ? r * Math.cos(Math.PI / 6) : Math.max(0, 2 * Math.cos(Math.PI / 6) * (r - d));
  };
  const clear = 24; // minimum gap between any text and the hairline

  // Ribbon: body in front; swallow-tailed tails sit behind it and 16px lower,
  // with a darker fold triangle where the body wraps back to each tail.
  const rb = { top: 372, h: 80, x1: 40, x2: 560 }, tail = { w: 46, over: 16, drop: 16, notch: 16 };
  const rbBot = rb.top + rb.h, tTop = rb.top + tail.drop, tBot = rbBot + tail.drop, tMid = tTop + rb.h / 2;
  const lt = rb.x1 - tail.w + tail.over, rt = rb.x2 + tail.w - tail.over;
  const ribbon = `
  <polygon fill="${C.magentaDk}" points="${lt},${tTop} ${rb.x1 + tail.over},${tTop} ${rb.x1 + tail.over},${tBot} ${lt},${tBot} ${lt + tail.notch},${tMid}"/>
  <polygon fill="${C.orangeDk}" points="${rt},${tTop} ${rb.x2 - tail.over},${tTop} ${rb.x2 - tail.over},${tBot} ${rt},${tBot} ${rt - tail.notch},${tMid}"/>
  <polygon fill="${C.magentaDkr}" points="${rb.x1},${rbBot} ${rb.x1 + tail.over},${rbBot} ${rb.x1 + tail.over},${tBot}"/>
  <polygon fill="${C.orangeDkr}" points="${rb.x2},${rbBot} ${rb.x2 - tail.over},${rbBot} ${rb.x2 - tail.over},${tBot}"/>
  <rect x="${rb.x1}" y="${rb.top}" width="${rb.x2 - rb.x1}" height="${rb.h}" fill="url(#${p}g)"/>
  ${text(cx, (rb.top + rb.h / 2 + capHeight('pb-800', 38) / 2).toFixed(1), 'CERTIFIED', { wt: 800, size: 38, ls: 10, fill: C.white })}`;

  // Bottom line, sized to fit the narrowing lower half with ≥14px clearance,
  // then a short gradient rule to anchor the point of the hexagon.
  // In the narrowing lower half the line's baseline corners are the tight spot.
  const vfY = 502;
  const vf = fit('VISION FRAMER', 'pb-700', 28, 4, 2 * (halfAt(vfY) - clear));
  const bottom = `
  ${text(cx, vfY, 'VISION FRAMER', { wt: 700, size: vf.size, ls: vf.ls, fill: ink })}
  <rect x="${cx - 24}" y="533" width="48" height="6" rx="3" fill="url(#${p}g)"/>`;

  // Centre zone: issuer label + mark, or the wordmark under a small frame emblem.
  let centre;
  if (mark === 'wordmark') {
    const w = 212, scale = 1.06, top = 186;
    centre = `${frame(cx - 26, 104, 52)}${wordmark(cx, top, w, { fill: ink, scale })}`;
  } else {
    // Issuer line in Poppins (brand face), fitted to the hairline at its cap top.
    const ly = 180, lCap = capHeight('pb-600', 20);
    const lb = fit('PIVVOT VISION FRAMING', 'pb-600', 20, 3.5, 2 * (halfAt(ly - lCap) - clear));
    const s = 152, y = 196;
    centre = `${text(cx, ly, 'PIVVOT VISION FRAMING', { wt: 600, size: lb.size, ls: lb.ls, fill: ink })}
    ${blue ? frameBlue(cx - s / 2, y, s, p + 'm') : frame(cx - s / 2, y, s)}`;
  }

  return svg(W, H, TITLE, `<defs>${grad(p + 'g')}</defs>
  <polygon points="${hex(R)}" fill="${ink}"/>
  <polygon points="${hex(R - 16)}" fill="${C.white}"/>
  <polygon points="${hex(R - 28)}" fill="none" stroke="${hair}" stroke-width="2"/>
  ${centre}
  ${ribbon}
  ${bottom}`);
}

// L · Signature lockup (horizontal credential: HubSpot Academy, Google Cloud).
//   mark: 'frame' | 'wordmark' | 'blue'. The pill is sized to its text.
function lockupBadge(mark, p) {
  const H = 260, cy = H / 2, stroke = 5;
  const blue = mark === 'blue';
  const ink = blue ? C.deep : C.navy;
  const accent = blue ? C.periwinkle : C.magenta;
  const ruleGrad = blue ? grad(p + 'g', C.periwinkle, C.deep, true) : grad(p + 'g', C.magenta, C.orange, true);

  let left, ruleX, textX, lines, textEnd;
  if (mark === 'wordmark') {
    const w = 210, top = cy - wordmarkHeight() / 2;
    left = wordmark(50 + w / 2, top, w, { fill: ink });
    ruleX = 50 + w + 44; textX = ruleX + 40;
    // Right side: small CERTIFIED eyebrow, then Vision Framer on one line.
    const eb = { size: 24, ls: 8 }, big = { size: 66 };
    const blockH = capHeight('pb-700', eb.size) + 22 + capHeight('pb-800', big.size);
    const t0 = cy - blockH / 2;
    lines = `${text(textX, (t0 + capHeight('pb-700', eb.size)).toFixed(1), 'CERTIFIED', { wt: 700, size: eb.size, ls: eb.ls, fill: accent, anchor: 'start' })}
    ${text(textX - 3, (t0 + blockH).toFixed(1), 'Vision Framer', { wt: 800, size: big.size, fill: ink, anchor: 'start' })}`;
    textEnd = textX + Math.max(measure('CERTIFIED', 'pb-700', eb.size, eb.ls), measure('Vision Framer', 'pb-800', big.size) - 3);
  } else {
    const s = 160, y = cy - s / 2;
    left = blue ? frameBlue(50, y, s, p + 'm') : frame(50, y, s);
    ruleX = 50 + s + 40; textX = ruleX + 40;
    const eb = { size: 21, ls: 3.5 }, big = { size: 52 }, bigCap = capHeight('pb-800', big.size);
    const blockH = capHeight('pb-600', eb.size) + 20 + bigCap + 14 + bigCap;
    const t0 = cy - blockH / 2;
    const y1 = t0 + capHeight('pb-600', eb.size), y2 = y1 + 20 + bigCap, y3 = y2 + 14 + bigCap;
    lines = `${text(textX, y1.toFixed(1), 'PIVVOT VISION FRAMING', { wt: 600, size: eb.size, ls: eb.ls, fill: accent, anchor: 'start' })}
    ${text(textX - 3, y2.toFixed(1), 'Certified', { wt: 800, size: big.size, fill: ink, anchor: 'start' })}
    ${text(textX - 3, y3.toFixed(1), 'Vision Framer', { wt: 800, size: big.size, fill: ink, anchor: 'start' })}`;
    textEnd = textX + Math.max(measure('PIVVOT VISION FRAMING', 'pb-600', eb.size, eb.ls), measure('Vision Framer', 'pb-800', big.size) - 3);
  }
  const W = Math.round(textEnd + 64);
  return svg(W, H, TITLE, `<defs>${ruleGrad}</defs>
  <rect x="${stroke / 2}" y="${stroke / 2}" width="${W - stroke}" height="${H - stroke}" rx="${(H - stroke) / 2}" fill="${C.white}" stroke="${ink}" stroke-width="${stroke}"/>
  ${left}
  <rect x="${ruleX}" y="${cy - 72}" width="6" height="144" rx="3" fill="url(#${p}g)"/>
  ${lines}`);
}

// =============================================================== ROUND 1
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

// B · The Credential Hexagon (round 1) — superseded by hexBadge().
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

// D · The Signature Lockup (round 1) — superseded by lockupBadge().
function lockup(p = 'd') {
  return svg(900, 280, TITLE, `<defs>${grad(p + 'g', C.magenta, C.orange, true)}</defs>
  <rect x="3" y="3" width="894" height="274" rx="137" fill="${C.white}" stroke="${C.navy}" stroke-width="6"/>
  ${frame(62, 55, 170)}
  <rect x="274" y="62" width="6" height="156" rx="3" fill="url(#${p}g)"/>
  <text x="316" y="102" font-family="${WM}" font-weight="700" font-size="28" letter-spacing="4" fill="${C.magenta}">PIVVOT VISION FRAMING</text>
  <text x="314" y="166" font-family="${FONT}" font-weight="800" font-size="54" fill="${C.navy}">Certified</text>
  <text x="314" y="226" font-family="${FONT}" font-weight="800" font-size="54" fill="${C.navy}">Vision Framer</text>`);
}

// E · The Cert Wordmark — the Canva cert-badge wordmark framed by the handout frame.
function certWordmark(p = 'e') {
  const s = 580, x = 10, i = 96, w = 300, lx = 300 - w / 2;
  const line = (t, wt, size, by) =>
    `<text x="${lx}" y="${by}" font-family="${WM}" font-weight="${wt}" font-size="${size}" fill="${C.navy}" textLength="${w}" lengthAdjust="spacing">${t}</text>`;
  return svg(600, 600, TITLE, `
  ${frame(x, x, s, { inset: i / s, sw: 12 })}
  <text x="300" y="68" font-family="${FONT}" font-weight="800" font-size="28" letter-spacing="12" fill="${C.navy}" text-anchor="middle">CERTIFIED</text>
  <text x="300" y="552" font-family="${FONT}" font-weight="800" font-size="26" letter-spacing="7" fill="${C.white}" text-anchor="middle">VISION FRAMER</text>
  ${line('PIVVOT', 500, 88, 250)}
  ${line('VISION', 800, 88, 332)}
  ${line('FRAMING', 700, 76, 406)}`);
}

// F · The Process Frame — Option E's layout on the process-overview Vision Frame.
function processFrame(p = 'f') {
  const x = 10, s = 580, u = s / 301, w = 230, lx = 300 - w / 2;
  const top = x + (42 + 75) / 2 * u, bot = x + s - (42 + 75) / 2 * u;
  const line = (t, wt, size, by) =>
    `<text x="${lx}" y="${by}" font-family="${WM}" font-weight="${wt}" font-size="${size}" fill="${C.deep}" textLength="${w}" lengthAdjust="spacing">${t}</text>`;
  return svg(600, 600, TITLE, `
  ${frameBlue(x, x, s, p + 'm')}
  <text x="300" y="${(top + 9).toFixed(1)}" font-family="${FONT}" font-weight="800" font-size="24" letter-spacing="9" fill="${C.white}" text-anchor="middle">CERTIFIED</text>
  <text x="300" y="${(bot + 9).toFixed(1)}" font-family="${FONT}" font-weight="800" font-size="23" letter-spacing="5" fill="${C.white}" text-anchor="middle">VISION FRAMER</text>
  ${line('PIVVOT', 500, 67, 262)}
  ${line('VISION', 800, 67, 324)}
  ${line('FRAMING', 700, 58, 380)}`);
}

// ================================================================== write
const out = process.argv[2] || path.join(__dirname, '..');
fs.mkdirSync(out, { recursive: true });
const files = {
  // Round 2
  'hex-1-frame.svg': hexBadge('frame', 'h1'),
  'hex-2-wordmark.svg': hexBadge('wordmark', 'h2'),
  'hex-3-blue-frame.svg': hexBadge('blue', 'h3'),
  'lockup-1-frame.svg': lockupBadge('frame', 'l1'),
  'lockup-2-wordmark.svg': lockupBadge('wordmark', 'l2'),
  'lockup-3-blue-frame.svg': lockupBadge('blue', 'l3'),
  // Round 1
  'option-a-frame-seal.svg': seal(),
  'option-b-credential-hexagon.svg': hexagon(),
  'option-c-open-frame.svg': openFrame(),
  'option-d-signature-lockup.svg': lockup(),
  'option-e-cert-wordmark.svg': certWordmark(),
  'option-f-process-frame.svg': processFrame(),
};
for (const [n, s] of Object.entries(files)) fs.writeFileSync(path.join(out, n), s);
module.exports = { hexBadge, lockupBadge, seal, hexagon, openFrame, lockup, certWordmark, processFrame };
console.log('wrote', Object.keys(files).join(', '));
