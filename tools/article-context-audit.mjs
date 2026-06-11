import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import fs from 'node:fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const playwrightModule = pathToFileURL(path.resolve(projectRoot, '..', 'ClautzGPT', 'node_modules', 'playwright', 'index.js')).href;
const playwright = await import(playwrightModule);
const { chromium } = playwright.default ?? playwright;

const articlePages = [
  'mensch',
  'hunde',
  'hund-im-buero',
  'katzen',
  'voegel',
  'kleintiere',
  'exoten',
  'pferde',
  'kastration',
  'qualzucht',
  'adoption',
  'selbsttest',
  'notfall',
  'wissen',
  'glossar',
  'hitzefalle-auto',
  'ernaehrung-taurin',
  'realhaltung',
  'zucht-und-vermehrung',
  'wildtierhaltung',
  'wildkatzenbaby-gefunden',
  'noch-nicht-bereit',
];

const pageFiles = {
  mensch: 'mensch/index.html',
  hunde: 'hunde/index.html',
  'hund-im-buero': 'hund-im-buero/index.html',
  katzen: 'katzen/index.html',
  voegel: 'voegel/index.html',
  kleintiere: 'kleintiere/index.html',
  exoten: 'exoten/index.html',
  pferde: 'pferde/index.html',
  kastration: 'kastration/index.html',
  qualzucht: 'qualzucht/index.html',
  adoption: 'adoption/index.html',
  selbsttest: 'selbsttest/index.html',
  notfall: 'notfall/index.html',
  wissen: 'wissen/index.html',
  glossar: 'glossar/index.html',
  'hitzefalle-auto': 'hitzefalle-auto/index.html',
  'ernaehrung-taurin': 'ernaehrung-taurin/index.html',
  realhaltung: 'realhaltung/index.html',
  'zucht-und-vermehrung': 'zucht-und-vermehrung/index.html',
  wildtierhaltung: 'wildtierhaltung/index.html',
  'wildkatzenbaby-gefunden': 'wildkatzenbaby-gefunden/index.html',
  'noch-nicht-bereit': 'noch-nicht-bereit/index.html',
};

const viewports = [
  { name: 'desktop', width: 1440, height: 1100 },
  { name: 'mobile', width: 390, height: 900 },
];

const outDir = path.join(projectRoot, 'screenshots', 'article-context-audit');
await fs.mkdir(outDir, { recursive: true });

const browser = await chromium.launch();
const report = [];

for (const viewport of viewports) {
  const context = await browser.newContext({ viewport });
  const page = await context.newPage();

  for (const pageId of articlePages) {
    await page.goto(pathToFileURL(path.join(projectRoot, pageFiles[pageId])).href, { waitUntil: 'load' });
    await page.waitForTimeout(250);
    await page.evaluate(async () => {
      const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
      const max = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
      for (let y = 0; y <= max; y += 720) {
        window.scrollTo(0, y);
        await delay(55);
      }
      window.scrollTo(0, 0);
      await delay(120);
    });

    await page.addStyleTag({ content: '.site-header{position:static!important;top:auto!important}' });

    const active = page.locator(`.page#${pageId}`).first();
    const hero = page.locator(`#${pageId} .hero`).first();
    if (await hero.count()) {
      await hero.screenshot({ path: path.join(outDir, `${viewport.name}-${pageId}-hero.png`) });
    }

    const enhancement = page.locator(`#${pageId} [data-enhancement]`).first();
    if (await enhancement.count()) {
      await enhancement.screenshot({ path: path.join(outDir, `${viewport.name}-${pageId}-enhancement.png`) });
    }

    const data = await page.evaluate((id) => {
      const activePage = document.querySelector(`.page#${id}`);
      if (!activePage) return { page: id, missingPage: true };

      const hero = activePage.querySelector('.article-hero-media');
      const heroImg = hero?.querySelector('img');
      const enhancements = Array.from(activePage.querySelectorAll('[data-enhancement]'));
      const contextCards = Array.from(activePage.querySelectorAll('.image-context-card'));
      const visibleImages = Array.from(activePage.querySelectorAll('img')).filter((img) => {
        const rect = img.getBoundingClientRect();
        const style = getComputedStyle(img);
        return rect.width > 0 && rect.height > 0 && style.display !== 'none' && style.visibility !== 'hidden';
      });

      const srcCounts = visibleImages.reduce((acc, img) => {
        const src = img.getAttribute('src');
        if (src) acc[src] = (acc[src] || 0) + 1;
        return acc;
      }, {});

      const imageIssues = visibleImages.flatMap((img) => {
        const rect = img.getBoundingClientRect();
        const style = getComputedStyle(img);
        const naturalRatio = img.naturalWidth && img.naturalHeight ? img.naturalWidth / img.naturalHeight : 0;
        const displayRatio = rect.width / rect.height;
        const ratioDelta = naturalRatio && displayRatio ? Math.abs(Math.log(naturalRatio / displayRatio)) : 0;
        const reasons = [];
        if (!img.complete || img.naturalWidth === 0) reasons.push('not-loaded');
        if (rect.width < 90 || rect.height < 90) reasons.push('too-small');
        if (style.objectFit === 'cover' && ratioDelta > 0.8) reasons.push('heavy-cover-crop');
        if (srcCounts[img.getAttribute('src')] > 1) reasons.push('duplicate-visible-image');
        return reasons.length ? [{ src: img.getAttribute('src'), rendered: { width: Math.round(rect.width), height: Math.round(rect.height) }, reasons }] : [];
      });

      const contextIssues = contextCards.flatMap((card) => {
        const img = card.querySelector('img');
        if (!img) return [];
        const caption = card.querySelector('figcaption, .context-caption');
        const reasons = [];
        if (!card.dataset.imagePurpose || card.dataset.imagePurpose.length < 30) reasons.push('missing-image-purpose');
        if (!card.dataset.shareReason || card.dataset.shareReason.length < 30) reasons.push('missing-share-reason');
        if (!caption || caption.textContent.trim().length < 12) reasons.push('missing-visible-caption');
        return reasons.length ? [{ src: img.getAttribute('src'), reasons }] : [];
      });

      return {
        page: id,
        heroHasImage: Boolean(heroImg),
        heroHasPurpose: Boolean(hero?.dataset.imagePurpose && hero.dataset.shareReason),
        enhancementCount: enhancements.length,
        imageContextCards: contextCards.length,
        visibleImageCount: visibleImages.length,
        duplicateVisibleImages: Object.entries(srcCounts).filter(([, count]) => count > 1),
        horizontalOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
        imageIssues,
        contextIssues,
        screenshotHero: `screenshots/article-context-audit/${viewport.name}-${id}-hero.png`,
        screenshotEnhancement: enhancements.length ? `screenshots/article-context-audit/${viewport.name}-${id}-enhancement.png` : null,
      };
    }, pageId);

    if (await active.count()) {
      await active.screenshot({ path: path.join(outDir, `${viewport.name}-${pageId}-page.png`) });
    }

    report.push({ viewport: viewport.name, ...data });
  }

  await context.close();
}

await browser.close();
await fs.writeFile(path.join(outDir, 'report.json'), JSON.stringify(report, null, 2));

const failures = report.filter((entry) =>
  !entry.heroHasImage ||
  !entry.heroHasPurpose ||
  entry.enhancementCount < 1 ||
  entry.visibleImageCount < 1 ||
  entry.duplicateVisibleImages.length > 0 ||
  entry.horizontalOverflow ||
  entry.imageIssues.length > 0 ||
  entry.contextIssues.length > 0
);

console.log(JSON.stringify({
  checked: report.length,
  failures: failures.length,
  byPage: failures.map((entry) => ({
    viewport: entry.viewport,
    page: entry.page,
    heroHasImage: entry.heroHasImage,
    heroHasPurpose: entry.heroHasPurpose,
    enhancementCount: entry.enhancementCount,
    visibleImageCount: entry.visibleImageCount,
    duplicateVisibleImages: entry.duplicateVisibleImages,
    horizontalOverflow: entry.horizontalOverflow,
    imageIssues: entry.imageIssues,
    contextIssues: entry.contextIssues,
    screenshotHero: entry.screenshotHero,
    screenshotEnhancement: entry.screenshotEnhancement,
  })),
}, null, 2));

if (failures.length) process.exitCode = 1;
