# Certified Vision Framer badge — draft options

Four directions for the badge Pivvot-certified Vision Framers can use on
their website, in an email signature, or on LinkedIn. All four are built
from the Vision Frame icon on the certification handouts
(`../icon-vision-frame.png`) and use only the brand colours and Poppins
from `DESIGN.md`.

| File | Direction | Inspired by |
|---|---|---|
| `option-a-frame-seal` | Circular seal, ring text around the frame | ICF, Scrum Alliance, SHRM |
| `option-b-credential-hexagon` | Hexagon with a gradient "Certified" ribbon | AWS, Microsoft, PMI (Credly) |
| `option-c-open-frame` | The badge *is* the Vision Frame (recommended) | Google Cloud, Apple |
| `option-d-signature-lockup` | Horizontal pill for signatures and footers | HubSpot Academy, Google Cloud |

Each comes as an SVG (Poppins subset embedded, so it renders correctly as an
`<img>` anywhere) and a transparent PNG at 2×. These are drafts; once a
direction is chosen, produce the final export pack (1200/600/300px PNGs,
dark-background variant) from the same source.

## Regenerating

`src/build-badges.js` draws all four from shared geometry and writes the
SVGs into this folder: `node src/build-badges.js`. PNGs were rendered from
the SVGs in headless Chromium at 2×.

Poppins is © Indian Type Foundry, SIL Open Font License 1.1; `src/fonts/`
holds subsets limited to the characters the badges use.
