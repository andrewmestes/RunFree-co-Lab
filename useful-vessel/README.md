# Useful Vessel Home Services — one-page site

A single self-contained file: `useful-vessel/index.html`. No build step, no
dependencies, no framework. Open it in a browser to preview it; drop it on any
host to publish it. Served from this repo it lives at `/useful-vessel/`.

## ⚠️ Fill these in before publishing

The Facebook page could not be reached from the build environment (Meta blocks
automated fetches and the network proxy blocks the domain), so every
business-specific fact below is a **placeholder**. Search the file for each
string and replace it.

| Find | Replace with |
|---|---|
| `(555) 123-4567` | real phone — also update the `tel:+15551234567` links |
| `hello@usefulvessel.co` | real email (appears in the page **and** in `BUSINESS_EMAIL` in the script) |
| `YOUR CITY` | primary city/town |
| `YOUR COUNTY` | county or metro area |
| `Springfield, Fairview, Oakdale, Cedar Grove, Millport, Riverton` | towns you actually serve |
| `facebook.com/usefulvessel` | real Facebook page URL |
| `usefulvessel.co` | real domain (in `og:url`, `og:image`, `twitter:image`, `canonical`, and the JSON-LD block) |
| `Mon–Fri 8a–6p · Sat 9a–2p` | real hours (also in the JSON-LD `openingHoursSpecification`) |
| `"addressRegion": "ST"` | two-letter state |

Then search for the comment marker **`FILL:`** — those spots need your own
words rather than a find-and-replace:

- **About** — the owner's real name and story. Two or three honest paragraphs.
- **Reviews** — three real reviews pasted from the Facebook page. The three
  cards ship as visible `[ bracketed placeholders ]` so they can't go live by
  accident. Either fill them in or delete the whole `<section id="reviews">`.
- **Trust bar + FAQ** — license number and insurance wording, matched to the
  real status of the business. The FAQ currently claims liability insurance and
  no specialty-trade license; correct it either way.
- **FAQ** — the payment methods actually accepted.

## Brand assets

Generated from the supplied logo and stored in `../assets/`:

| File | What it is |
|---|---|
| `uv-mark.png` | the house/mountain/swoosh mark alone, background keyed out |
| `uv-wordmark.png` | "Useful Vessel / Home Services" alone, background keyed out |
| `uv-logo.png` | the full stacked lockup, background keyed out |
| `uv-favicon-64.png`, `uv-apple-touch.png` | browser tab and iOS home-screen icons |
| `uv-og.jpg` | 1200×630 link-preview card for Facebook/SMS shares |

The transparent versions were cut with a flood fill from the image corners
rather than a brightness key, so the **white areas inside** the logo (the snow
caps, the light swoosh, the house face) are preserved rather than punched out.

One consequence worth knowing: those interior areas are near-white, so **the
logo needs a light background.** On white or `#F5F5F5` it reads exactly as
designed. That's why the dark footer puts it on a paper-coloured chip
(`.logo-chip`) instead of placing it directly on the dark ground — don't drop
the raw logo onto a dark panel, the snow and swoosh highlights will disappear.

### Palette

Sampled from the logo itself, then adjusted only where contrast required it:

| Token | Value | Use |
|---|---|---|
| `--ink` | `#061728` | the logo navy — headings, dark sections, primary buttons (18.1:1 on white) |
| `--sage` | `#8E9A85` | the logo sage — rules, decorative fills |
| `--sage-dk` | `#5E6C54` | sage darkened for text/links on light grounds (5.6:1) |
| `--sage-lt` | `#A7B29C` | sage lightened for text and buttons on dark grounds (8.2:1) |
| `--sage-icon` | `#4F5C46` | small glyphs, which need more weight than body text (5.9:1 on the chip) |
| `--paper` | `#F5F5F5` | the logo's own ground — alternating sections |
| `--body` | `#4A5A68` | body copy (7.1:1 on white) |

Raw sage is only 2.95:1 on white, so it is never used for text or as a button
under white type. The button system instead follows the logo's own hierarchy:
**ink buttons on light grounds, sage buttons with ink type on dark grounds.**

Type is Poppins for headings (geometric, matching the wordmark) and Inter for
body copy.

## Optional

- The **2 Timothy 2:21 block** in the About section is an inference about where
  the name comes from. Delete it for a fully secular site — it's marked
  `OPTIONAL:` in the source.
- To swap the "Our promise" card for a **photo** of the owner or the work truck,
  the About section carries a `TIP:` comment with the one-line replacement.

## Where form submissions go

Both forms (hero and contact) share one handler near the bottom of the file:

```js
var FORM_ENDPOINT  = "";                      // empty → mailto fallback
var BUSINESS_EMAIL = "hello@usefulvessel.co";
```

- **Left empty** (the default) the form opens the visitor's mail client with a
  pre-filled message to `BUSINESS_EMAIL`. Works with no backend at all.
- **Set `FORM_ENDPOINT`** to a Formspree / GoHighLevel / Zapier / custom URL and
  the form POSTs the fields as JSON instead: `name`, `phone`, `email`, `town`,
  `job`.

Either way the visitor sees the same "Request sent" confirmation.

## What's in the page

Sticky header with click-to-call · hero with inline estimate form · trust bar ·
12 service cards · about + promise · 3-step process · service area · reviews ·
8-question FAQ · contact section with the full form · footer · sticky
tap-to-call bar on mobile.

SEO: title/description, canonical, Open Graph, and a `HomeAndConstructionBusiness`
JSON-LD block covering phone, hours, service area, and the service list — this is
what lets Google show hours and a call button in local results. Update it along
with the visible text; stale structured data is worse than none.

## Verified

Rendered in Chromium at 320 → 1920 px: no horizontal overflow at any width, no
console or page errors, balanced markup, valid JSON-LD, every sprite reference
and page anchor resolves. Form checked for: empty submit blocked, too-short
phone blocked and flagged, valid submit shows the confirmation.

Every colour pairing above was checked against WCAG AA before being used.

Poppins and Inter load from Google Fonts with system-sans fallbacks. The layout
was tested against the *fallback* fonts, so it holds even if Google Fonts is
blocked or slow.
