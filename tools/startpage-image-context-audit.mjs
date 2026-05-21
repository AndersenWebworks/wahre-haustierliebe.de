import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import fs from 'node:fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const playwrightModule = pathToFileURL(path.resolve(projectRoot, '..', 'ClautzGPT', 'node_modules', 'playwright', 'index.js')).href;
const playwright = await import(playwrightModule);
const { chromium } = playwright.default ?? playwright;

const viewports = [
  { name: 'desktop', width: 1440, height: 1200 },
  { name: 'mobile', width: 390, height: 1000 },
];

const sectionShots = [
  { name: 'hero', selector: '#startseite .hero' },
  { name: 'entry-cards', selector: '#startseite .entry-cards' },
  { name: 'animal-grid', selector: '#startseite .animal-grid' },
  { name: 'share-focus', selector: '#startseite .share-focus' },
];

const outDir = path.join(projectRoot, 'screenshots', 'startpage-context-audit');
await fs.mkdir(outDir, { recursive: true });

const fileUrl = pathToFileURL(path.join(projectRoot, 'index.html')).href;
const browser = await chromium.launch();
const report = [];

for (const viewport of viewports) {
  const context = await browser.newContext({ viewport });
  const page = await context.newPage();
  await page.goto(`${fileUrl}#startseite`, { waitUntil: 'load' });
  await page.waitForTimeout(250);
  await page.evaluate(async () => {
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    const max = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
    for (let y = 0; y <= max; y += 620) {
      window.scrollTo(0, y);
      await delay(70);
    }
    window.scrollTo(0, 0);
    await delay(160);
  });

  await page.screenshot({ path: path.join(outDir, `${viewport.name}-full.png`), fullPage: true });
  await page.addStyleTag({ content: '.site-header{position:static!important;top:auto!important}' });
  for (const shot of sectionShots) {
    const locator = page.locator(shot.selector).first();
    if (await locator.count()) {
      await locator.screenshot({ path: path.join(outDir, `${viewport.name}-${shot.name}.png`) });
    }
  }

  const data = await page.evaluate(() => {
    const active = document.querySelector('#startseite');
    const cards = Array.from(active.querySelectorAll('.image-context-card')).map((card) => {
      const img = card.querySelector('img');
      const caption = card.querySelector('figcaption, .context-caption, .animal-card-caption');
      const rect = card.getBoundingClientRect();
      const imgRect = img?.getBoundingClientRect();
      const cardText = card.textContent.replace(/\s+/g, ' ').trim();
      const surroundingText = card.closest('.entry-card, .animal-card, .share-focus, .hero-visual-card')?.textContent.replace(/\s+/g, ' ').trim() || cardText;
      const src = img?.getAttribute('src') || '';
      const reasons = [];

      if (!card.dataset.imagePurpose || card.dataset.imagePurpose.length < 24) reasons.push('missing-or-thin-image-purpose');
      if (!card.dataset.shareReason || card.dataset.shareReason.length < 24) reasons.push('missing-or-thin-share-reason');
      if (!caption || caption.textContent.trim().length < 8) reasons.push('missing-visible-context-caption');
      if (!img) reasons.push('missing-image');
      if (img && (!img.complete || img.naturalWidth === 0)) reasons.push('image-not-loaded');
      if (imgRect && (imgRect.width < 110 || imgRect.height < 95)) reasons.push('image-too-small-for-context');
      if (imgRect && imgRect.height < imgRect.width * 0.32) reasons.push('image-too-flat');
      if (rect.width > document.documentElement.clientWidth + 1) reasons.push('card-overflows-viewport');

      return {
        purpose: card.dataset.imagePurpose || '',
        shareReason: card.dataset.shareReason || '',
        src,
        caption: caption?.textContent.trim() || '',
        cardText,
        surroundingText,
        rendered: imgRect ? { width: Math.round(imgRect.width), height: Math.round(imgRect.height) } : null,
        reasons,
      };
    });

    const srcCounts = cards.reduce((acc, card) => {
      if (card.src) acc[card.src] = (acc[card.src] || 0) + 1;
      return acc;
    }, {});

    for (const card of cards) {
      if (card.src && srcCounts[card.src] > 3) card.reasons.push('image-reused-more-than-three-times-on-startpage');
    }

    return {
      cardCount: cards.length,
      horizontalOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
      repeatedSources: Object.entries(srcCounts).filter(([, count]) => count > 3),
      cards,
    };
  });

  report.push({
    viewport: viewport.name,
    screenshots: sectionShots.map((shot) => `screenshots/startpage-context-audit/${viewport.name}-${shot.name}.png`),
    ...data,
  });
  await context.close();
}

await browser.close();

await fs.writeFile(path.join(outDir, 'report.json'), JSON.stringify(report, null, 2));

const failures = report.flatMap((entry) =>
  entry.cards
    .filter((card) => card.reasons.length)
    .map((card) => ({
      viewport: entry.viewport,
      src: card.src,
      caption: card.caption,
      purpose: card.purpose,
      reasons: card.reasons,
      rendered: card.rendered,
    }))
);

const pageFailures = report.filter((entry) => entry.horizontalOverflow || entry.cardCount < 12);

console.log(JSON.stringify({
  checkedViewports: report.length,
  contextCards: report.map((entry) => ({ viewport: entry.viewport, count: entry.cardCount })),
  failures: failures.length + pageFailures.length,
  cardFailures: failures,
  pageFailures: pageFailures.map((entry) => ({
    viewport: entry.viewport,
    horizontalOverflow: entry.horizontalOverflow,
    cardCount: entry.cardCount,
  })),
  screenshots: report.flatMap((entry) => entry.screenshots),
}, null, 2));

if (failures.length || pageFailures.length) process.exitCode = 1;
