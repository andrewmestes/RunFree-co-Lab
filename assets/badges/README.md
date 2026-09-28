# Certified Vision Framer badge — draft options

Six directions for the badge that Pivvot Vision Framing certified framers
("Certified Vision Framers") can use on their website, in an email
signature, or on LinkedIn. The issuer on every badge is Pivvot Vision
Framing. All are built from the Vision Frame icon on the certification
handouts (`../icon-vision-frame.png`) except Option F, which uses the
blue Vision Frame from the process overview (`../tool-5-vision-frame.png`).
Options E and F use the stacked wordmark from the "Pivvot Vision Framing
Cert Badge" design in Canva.

| File | Direction | Inspired by |
|---|---|---|
| `option-a-frame-seal` | Circular seal, ring text around the frame | ICF, Scrum Alliance, SHRM |
| `option-b-credential-hexagon` | Hexagon with a gradient "Certified" ribbon | AWS, Microsoft, PMI (Credly) |
| `option-c-open-frame` | The badge *is* the Vision Frame | Google Cloud, Apple |
| `option-d-signature-lockup` | Horizontal pill for signatures and footers | HubSpot Academy, Google Cloud |
| `option-e-cert-wordmark` | The Canva cert-badge wordmark inside the frame (recommended) | The existing Pivvot cert badge |
| `option-f-process-frame` | Option E's layout on the blue process-overview frame | The process overview icon |

Each comes as an SVG (fonts subset and embedded, so it renders correctly as an
`<img>` anywhere) and a transparent PNG at 2×. These are drafts; once a
direction is chosen, produce the final export pack (1200/600/300px PNGs,
dark-background variant) from the same source.

## Regenerating

`src/build-badges.js` draws all four from shared geometry and writes the
SVGs into this folder: `node src/build-badges.js`. PNGs were rendered from
the SVGs in headless Chromium at 2×.

The wordmark is set in Saira Semi Condensed, the closest open-license match
to the Canva cert badge's typeface. Poppins (Indian Type Foundry) and Saira
Semi Condensed (Omnibus-Type) are both SIL Open Font License 1.1;
`src/fonts/` holds subsets limited to the characters the badges use
(`pb-*` Poppins, `ss-*` Saira Semi Condensed).
