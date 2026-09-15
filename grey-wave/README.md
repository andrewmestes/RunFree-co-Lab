# Grey Wave Church — website

Static, multi-page site (plain HTML + one shared `styles.css` + one tiny
`site.js`, no build step) for Lance Hurley's new church for people 55 and
better. Working name: **Grey Wave**. Domain still unconfirmed (see RESEARCH.md).

## Pages

| Path | What it does |
|---|---|
| `/` | Home: who we are, when and where, next step. Purpose, "New here?", latest message, three upcoming events, connect grid, story, CTA band. |
| `/im-new/` | What to expect, "Good to know", **Plan a Visit form** (`#plan`), directions, FAQ. The primary call to action everywhere points here. |
| `/about/` | Story, purpose, beliefs (`#believe`), leadership (`#leadership`), Ignite partnership. |
| `/messages/` | Latest message (video slot), current series with the 12-week list, archive, Lance's earlier sermons, subscribe. |
| `/events/` | Weekly regulars, fall calendar, printable PDF slot. |
| `/connect/` | Groups (`#groups`), serve teams (`#serve`), care (`#care`), **prayer request form** (`#prayer`), interest form. |
| `/give/` | Online giving button, checks, IRA/QCD and estate note, where it goes, giving FAQ. |
| `/contact/` | General email + church phone, form, address, embedded map. |

Every page shares the same header (logo, Watch button, text-size control,
seven nav links, "Plan a Visit" button), footer (times, quick links,
newsletter signup, contact), and a Watch / Plan a Visit bar pinned to the
bottom on phones.

## Church-website practices this follows

- The homepage answers **who, when/where, and what's my next step** above the fold and in the navy strip right under the hero.
- **Plan a Visit** is the one primary call to action, repeated in the nav, hero, bands, and mobile bar. It lands on a form, not a person's cell phone.
- Standard doors people look for: I'm New, About, Messages, Events, Connect, Give, Contact.
- **Give** is in the nav and has its own page, with online, check, and IRA options and a "where it goes" panel.
- **Messages** are watchable online with a subscribe path (YouTube, podcast, Monday email).
- **Prayer request** and **care** have their own forms, so the church, not one pastor, receives them.
- General church email and office phone in the footer and contact page. Lance's email appears only on his leadership card.
- Newsletter signup in every footer.
- Service time and address in the header strip, footer, I'm New, and Contact. Google Maps link everywhere the address appears.
- Built for 55+ readers: 19px base type with an A/A/A control, Atkinson Hyperlegible body, Fraunces headings, 58px buttons, AA contrast, no motion, printable.

## Deploy on Vercel

The folder is self-contained. Either copy it into its own repo and import it
(framework preset "Other", no build command, output directory `.`), or import
`RunFree-co-Lab` and set *Root Directory* to `grey-wave`. Folder-style URLs
(`/im-new/`) work without any config. Add the domain under Project → Domains.

## Placeholders to fill before launch

Search for these strings:

- `[TIME]` — Sunday service time (appears in every header strip, footer, and form page).
- `[CHURCH PHONE]` — an office or Google Voice number that goes to voicemail, not a personal cell.
- `hello@greywavechurch.org` — swap for the real address once the domain is settled.
- `[MAILING ADDRESS]` on the Give page.
- `href="#"` on: the **Give online** buttons (point at Tithe.ly, Pushpay, Planning Center Giving, etc.), the **Watch / Listen / Notes** buttons on Messages, the **YouTube / Podcast** buttons, the **fall calendar PDF**, and the Facebook / YouTube icons in the footer.
- `assets/ph-*.svg` — placeholder photo slots, each labeled with the photo that belongs there. Replace with real photos of real people; that is the single biggest upgrade this site can get.
- The video block on Messages has an HTML comment showing where the YouTube embed goes.
- All forms post via `mailto:`. Before launch, point them at a form service (Formspree, Basin, Netlify/Vercel forms, or your church management system's connect card) so submissions land in an inbox reliably.

## Content that is proposed, not confirmed

Weekday groups (Tuesday coffee, Wednesday Bible study, grief group), the
special Sundays on the events page, sermon titles other than Lance's real
ones, the finance-team description on Give, and the "Elders coming 2027"
card are all proposals for Lance to keep, edit, or cut. RESEARCH.md separates
what is sourced from what is drafted.
