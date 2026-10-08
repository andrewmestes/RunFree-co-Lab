# Nexus Staff Transfer Portal (ThinkNEXT 2026 gag)

**Live page:** https://claude.ai/artifact/XFnKbLFaSsu19MmPu7vjLu
The QR code on the slide points there. The artifact is private until you share it:
open the link, use the page's **Share** menu, and allow anyone with the link.

Files:
- `index.html` — the whole site, self-contained (Nexus logo embedded, fonts from Google Fonts). Drop it on any host if you want a different URL.
- `nexus-transfer-portal-slide.png` — 1920x1080 slide image, ready to drop into Keynote/PowerPoint/ProPresenter.
- `nexus-transfer-portal-slide.pptx` — the same slide as a one-slide PowerPoint file (speaker notes carry the URL).
- `qr.png` — the bare QR code (1120px), if you want it on something else.
- `tools/` — the generator scripts. To re-point the QR at a new URL, regenerate with
  `make_slide.py <scratch dir> <nexus repo> <URL> <out dir>` (needs the Nexus logo files from the `andrewmestes/nexus` repo, Playwright, qrcode and pptxgenjs).

Facts used on the page: Mountain View Christian Church (Creston/Kalispell, MT; lead pastor Brad Hooley; Sundays 10:00 AM; planted out of Family Life) and Hope Chapel Kealapono (Pearl City, Oʻahu; senior pastor John Honold; Saturdays 9:30 AM). Everything else is a joke.
