const { chromium } = require('playwright');
const [,, htmlPath, outPng, w, h, full] = process.argv;
(async () => {
  const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' + (require('fs').existsSync('/opt/pw-browsers/chromium/chrome') ? '/chrome' : '') }).catch(async () => chromium.launch());
  const page = await browser.newPage({ viewport: { width: +w, height: +h }, deviceScaleFactor: 1 });
  const errors = [];
  page.on('pageerror', e => errors.push('pageerror: ' + e.message));
  page.on('console', m => { if (m.type() === 'error') errors.push('console: ' + m.text()); });
  page.on('requestfailed', r => errors.push('requestfailed: ' + r.url().slice(0, 90)));
  await page.goto('file://' + htmlPath, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(500);
  await page.screenshot({ path: outPng, fullPage: full === 'full' });
  const bodyW = await page.evaluate(() => [document.documentElement.scrollWidth, document.documentElement.clientWidth]);
  console.log(outPng, 'scrollWidth/clientWidth', bodyW.join('/'), errors.length ? '\n' + errors.join('\n') : 'no errors');
  await browser.close();
})().catch(e => { console.error(e); process.exit(1); });
