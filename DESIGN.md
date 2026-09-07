# DESIGN.md — Pivvot Vision Framing co::Lab landing page

A single-page, cold-traffic landing page with live Meta ad spend behind it.
Read this before touching `index.html`. Every value below is measured from
the shipped CSS.

---

## 0. Two rules that matter most

1. **This is a RunFree.Co property, so it wears RunFree's brand** — magenta,
   orange, navy, Poppins. Do **not** bring The Clarity Project's teal here,
   and do not take this palette back to visionclarity.org. Same owner, two
   brands; keep them apart.
2. **Copy is governed by a fact sheet.** Every number and inclusion must
   match `../Vision Frame Knowledge Base/frameworks/colab-offer-facts.md`.
   When the page and that file disagree, the page is wrong. Known traps it
   documents: it is **10 months** (not 12); write **"over 40 hours of vision
   framing content"**, never "40+ hours in the room" (10 × 4h is exactly
   40); **$2,500 total**, never "per year"; **Pivvot** has two v's;
   **Hero-Maker** is hyphenated.

---

## 1. Stack & deploy

Static `index.html` with inline `<style>` and inline scripts; no build.
Assets in `assets/`. Companion pages: `roadmap.html`, `overview/`,
`vision-check/`.

**GitHub push does NOT deploy this project.** Deploy is manual:

```
vercel --prod --yes
vercel alias set <deployment-url> runfree-colab.vercel.app
```

The Vercel project is `pivvot-colab`; the URL Andrew says out loud is
**https://runfree-colab.vercel.app**. Deploying changes a page that ads are
actively sending people to — verify locally first, every time.

---

## 2. Colour

```
--primary   #E43D96   magenta — CTAs, accents
--secondary #F15A25   orange
--navy      #1F378C   tags, partner badge
--dark      #111827   headings, .final background
--fg        #4b5563   body text
--muted     #f9fafb   alternate section bg (.muted-sec)
--border    #e5e7eb
--grad      linear-gradient(90deg, #E43D96, #F15A25)   buttons, .band, gradient text
```

Gradient text (`background-clip:text`) is used for small labels and the
quote marks only — never on body copy.

---

## 3. Type

- Poppins throughout, self-hosted.
- Body 16.5px / 1.7, colour `--fg`.
- `h1` 64px / 800 on desktop, tight leading; `h2` `clamp(1.7rem, 3.6vw, 2.4rem)` / 800.
- `.kicker` eyebrow above every `h2`; `.sub` subtitle below it; `.micro`
  for the "Free · 30 minutes · no commitment" reassurance line.

---

## 4. Layout

- `section { padding: 5.5rem 0 }`; `.muted-sec` alternates the background
  with hairline borders; `.band` (gradient) and `.final` (dark) are the two
  full-colour sections.
- Cards (`.step`, `.quote`, `.inc-group`, `.stage-panel`) share
  `border-radius: 1rem`, white background, `--border` hairline.
- Breakpoints: 860px (hero stacks, journey collapses), 640px, 480px.
- The hero is **not** a `<section>`; it's `.hero-copy` + `.hero-photo`.
  That matters for the reveal system (§6).

---

## 5. Conversion architecture (don't break these)

- **Primary CTA everywhere = the free 30-minute TidyCal call**
  `https://tidycal.com/andrew-estes/discovery-call`. Say "free" and
  "30 minutes"; never "15".
- **Register (GHL form `ZY5JqH…`) is secondary** — it's a commitment form
  with $2,500 fine print. It should never out-rank the call.
- Urgency is data-driven: the seat counter, the "4 of 8" copy, and the
  start date are marked with `<!-- SEATS-DATE -->` / `<!-- SEAT` comments.
  Update all of them together when a seat sells.
- Meta pixel fires on clicks via `data-ev="Schedule|InitiateCheckout|Contact"`.
  Keep those attributes on any CTA you add or move.
- A sticky mobile call bar appears after the hero and hides at `.final`.
- Never post, publish, or spend ad money without Andrew's explicit OK.

---

## 6. Motion

Progressive enhancement, added 2026-09-07. Nothing here is required for
the page to work.

- The first tag in `<head>` sets `html.js`. **All hidden-until-reveal rules
  are scoped to `html.js`**, so a no-JS visitor sees everything instantly.
- Every `<section>` reveals its heading block (`.wrap > .kicker, h2, .sub`)
  when it scrolls into view. **The hero is deliberately excluded** — cold
  traffic must see the headline and CTA at first paint.
- Containers with `.stg` stagger their direct children 0.05s → 0.5s:
  `.steps`, `.stats`, `.quotes`, `.included`, `.faq`, `.journey-track`.
- One `IntersectionObserver` at the end of `<body>`, threshold `.12`,
  `rootMargin 0 0 -8%`. It sits alongside the three the page already had
  (stage auto-advance, count-up stats, sticky bar).
- `prefers-reduced-motion: reduce` disables all of it with `!important`,
  and the JS marks everything `.in` up front.
- Easing everywhere: `cubic-bezier(.2,.7,.2,1)`.

---

## 7. Images

- **Every `<img>` carries `width` and `height`** (intrinsic size) so the
  layout never shifts while lazy images load. CSS still controls display
  size. Add them to any image you introduce.
- Hero uses `srcset` (`hero-andrew-900.jpg 900w, hero-andrew.jpg 1800w`) with
  `fetchpriority="high"`; it's the LCP element. Everything below the fold is
  `loading="lazy"`.
- Headshots render at 52px: keep sources ≤ 320px. Will Mancini's cutout is
  `will-mancini.webp` (alpha preserved).
- Brand-film stills (`hero-andrew`, `andrew-whiteboard`, `team-huddle`,
  `andrew-laptop`) are the approved photos. Andrew's rule for this page:
  ad photos, not personal ones.
- `og-colab.png` (1200×630) is the share image; regenerate it whenever the
  headline changes.

---

## 8. Accessibility floor

Skip link; real `<button>`s for the stage journey (`role="tablist"`);
`:focus-visible` on controls; `alt` on content photos, `alt=""` on the
decorative tool icons; reduced motion honoured.
