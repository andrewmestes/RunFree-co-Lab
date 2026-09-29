# Certified Vision Framer badge — options

Badge options for Pivvot Vision Framing certified framers ("Certified
Vision Framers") to use on a website, in an email signature, or on a
profile. All are built on the Vision Frame from the certification handouts
(`../icon-vision-frame.png`); two also carry the stacked PIVVOT / VISION /
FRAMING wordmark from the "Pivvot Vision Framing Cert Badge" design in Canva.

Each badge comes as an SVG (fonts subset and embedded, so it renders
correctly as an `<img>` anywhere) and a transparent PNG at 2×.

| | Hexagon | Lockup |
|---|---|---|
| Issuer line over the frame | `hex-1-issuer-line` | `lockup-3-issuer-line` |
| Frame beside the stacked wordmark (same height) | `hex-2-side-by-side` | `lockup-2-side-by-side` |
| Frame only | — | `lockup-1-frame-only` |

The hexagon has a swallow-tail ribbon with folds, a bottom line measured to
fit the narrowing lower half, and a short gradient rule anchoring the
point. Every line is sized against the hexagon's width at its own height
with 24px clearance to the inner hairline. The lockup's text is justified
to one width ("Vision Framer" sets it) and its pill is sized to that block.

"CERTIFIED" and the wordmark are meant to be set in **Industry** (the face
the Canva cert badge appears to use). Industry is commercial and not
available here, so Saira Semi Condensed stands in (500 for CERTIFIED). To
use the real face, add the Industry font files to `src/fonts/` and point
the `PivvotWordmark` @font-face rules in `src/build-badges.js` at them.

## Regenerating

`node src/build-badges.js` draws every badge from shared marks and writes
the SVGs into this folder. Text is laid out from advance widths in
`src/fonts/metrics.json` (exported from the fonts with fontTools). PNGs
were rendered from the SVGs in headless Chromium at 2×. Earlier rounds are
in git history.

Poppins (Indian Type Foundry) and Saira Semi Condensed (Omnibus-Type) are
both SIL Open Font License 1.1; `src/fonts/` holds subsets limited to the
characters the badges use (`pb-*` Poppins, `ss-*` Saira Semi Condensed).
