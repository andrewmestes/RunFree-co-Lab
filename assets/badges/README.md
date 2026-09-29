# Certified Vision Framer badge — draft options

Badge options for Pivvot Vision Framing certified framers ("Certified
Vision Framers") to use on a website, in an email signature, or on a
profile. The issuer on every badge is Pivvot Vision Framing.

Each badge comes as an SVG (fonts subset and embedded, so it renders
correctly as an `<img>` anywhere) and a transparent PNG at 2×.

## Round 2 — hexagon and signature lockup, three marks each

The same two layouts, built with each of the three marks:

| Mark | Hexagon | Lockup |
|---|---|---|
| Vision Frame from the certification handouts (`../icon-vision-frame.png`) | `hex-1-frame` | `lockup-1-frame` |
| PIVVOT / VISION / FRAMING wordmark from the "Pivvot Vision Framing Cert Badge" design in Canva | `hex-2-wordmark` | `lockup-2-wordmark` |
| Vision Frame from the process overview (`../tool-5-vision-frame.png`) | `hex-3-blue-frame` | `lockup-3-blue-frame` |

The hexagon has a swallow-tail ribbon with folds, a bottom line measured to
fit the narrowing lower half, and a short gradient rule anchoring the
point. The lockup's pill is sized to its text.

## Round 1 — earlier directions

| File | Direction | Inspired by |
|---|---|---|
| `option-a-frame-seal` | Circular seal, ring text around the frame | ICF, Scrum Alliance, SHRM |
| `option-b-credential-hexagon` | First hexagon (superseded by `hex-*`) | AWS, Microsoft, PMI (Credly) |
| `option-c-open-frame` | The badge *is* the Vision Frame | Google Cloud, Apple |
| `option-d-signature-lockup` | First lockup (superseded by `lockup-*`) | HubSpot Academy, Google Cloud |
| `option-e-cert-wordmark` | The Canva cert-badge wordmark inside the frame | The existing Pivvot cert badge |
| `option-f-process-frame` | Option E's layout on the blue process-overview frame | The process overview icon |

## Regenerating

`src/build-badges.js` draws every badge from shared marks and writes the
SVGs into this folder: `node src/build-badges.js`. Text is laid out from
advance widths in `src/fonts/metrics.json` (exported from the fonts with
fontTools) so lockups size themselves to their text. PNGs were rendered
from the SVGs in headless Chromium at 2×.

The wordmark is set in Saira Semi Condensed, the closest open-license match
to the Canva cert badge's typeface. Poppins (Indian Type Foundry) and Saira
Semi Condensed (Omnibus-Type) are both SIL Open Font License 1.1;
`src/fonts/` holds subsets limited to the characters the badges use
(`pb-*` Poppins, `ss-*` Saira Semi Condensed).
