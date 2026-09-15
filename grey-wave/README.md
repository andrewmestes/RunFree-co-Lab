# Grey Wave Church — draft website

A single static page (`index.html`, inline CSS/JS, no build) for Lance Hurley's
new church plant for people 55+ south of Chicago.
Andrew's note: Lance lives about 20 minutes south of Chicago and is planting
there. Published sources put him in Bourbonnais, and the preview season venue
(Adventure Christian Church, 70 Ken Hayes Dr, Bourbonnais) comes from Andrew's
meeting notes. Confirm the venue and town with Lance before launch.
Working name: **Grey Wave**. Domain is still unconfirmed (see RESEARCH.md).

## Deploy on Vercel

This folder is self-contained. Two options:

1. **Own repo (recommended once the name/domain is settled).** Copy this folder
   into a new GitHub repo, import it in Vercel, framework preset "Other". No
   build command, output directory `.`.
2. **From this repo.** Import `RunFree-co-Lab` in Vercel and set
   *Root Directory* to `grey-wave`. Everything else default.

Then add the domain (greywavechurchplanting.org or whatever Lance registered)
under Project → Domains.

## Before it goes live

Search the page for `[TIME]` and replace with the Sunday service time. Also:

- Confirm the meeting location. The page names Adventure Christian Church in
  Bourbonnais in the hero card, schedule, contact block and footer. If the
  plant meets somewhere in the south suburbs instead, replace all four.

- Replace the photo placeholder in the "Our pastor" section with a real photo
  of Lance and Darla (`assets/lance-darla.jpg`, ~1200px wide).
- Confirm the phone number. (815) 685-1939 is Lance's number on Ignite's
  published materials; swap if Grey Wave gets its own line.
- The contact form posts via `mailto:`. Swap the `action` for a Formspree,
  GoHighLevel, or Vercel Forms endpoint before launch.
- The 12-week sermon list is a draft. Titles marked in RESEARCH.md as Lance's
  real sermon titles are the anchors; the rest are proposals.
- Generate a share image at `assets/og-grey-wave.png` (1200×630).

## Design notes

Built for readers 55 and better:

- 19px base type, with an A / A / A text-size control in the header
  (22px and 25px), remembered per visitor.
- Atkinson Hyperlegible for body copy, Source Serif 4 for headings.
- Navy / gold / silver on cream. Contrast on all text is AA or better.
- 56px-tall buttons, 44px+ tap targets, a phone number in the header on
  every screen, and a level of animation that rounds to zero.
- The page prints cleanly as a hand-out (nav, form and buttons drop out).
