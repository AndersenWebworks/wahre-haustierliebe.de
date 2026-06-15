import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import fs from 'node:fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const playwrightModule = pathToFileURL(path.resolve(projectRoot, '..', 'ClautzGPT', 'node_modules', 'playwright', 'index.js')).href;
const playwright = await import(playwrightModule);
const { chromium } = playwright.default ?? playwright;

const pages = [
  'startseite',
  'mensch',
  'hunde',
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
  'tiere-und-urlaub',
  'hitzefalle-auto',
  'ernaehrung-taurin',
  'realhaltung',
  'zucht-und-vermehrung',
  'wildtierhaltung',
  'wildkatzenbaby-gefunden',
  'noch-nicht-bereit',
];

const pageFiles = {
  startseite: 'index.html',
  mensch: 'mensch/index.html',
  hunde: 'hunde/index.html',
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
  'tiere-und-urlaub': 'tiere-und-urlaub/index.html',
  'hitzefalle-auto': 'hitzefalle-auto/index.html',
  'ernaehrung-taurin': 'ernaehrung-taurin/index.html',
  realhaltung: 'realhaltung/index.html',
  'zucht-und-vermehrung': 'zucht-und-vermehrung/index.html',
  wildtierhaltung: 'wildtierhaltung/index.html',
  'wildkatzenbaby-gefunden': 'katzen/wildkatzenbaby-gefunden/index.html',
  'noch-nicht-bereit': 'noch-nicht-bereit/index.html',
};

const viewports = [
  { name: 'desktop', width: 1440, height: 1100 },
  { name: 'mobile', width: 390, height: 900 },
];

const allowedRepeatedImages = new Set([
  'assets/images/wahre-haustierliebe-logo.png',
  'assets/images/wahre-haustierliebe-mark.png',
]);

const outDir = path.join(projectRoot, 'screenshots', 'image-audit');
await fs.mkdir(outDir, { recursive: true });

const browser = await chromium.launch();
const report = [];

for (const viewport of viewports) {
  const context = await browser.newContext({ viewport });
  const page = await context.newPage();

  for (const pageId of pages) {
    await page.goto(pathToFileURL(path.join(projectRoot, pageFiles[pageId])).href, { waitUntil: 'load' });
    await page.waitForTimeout(250);
    await page.evaluate(async () => {
      const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
      const max = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
      for (let y = 0; y <= max; y += 650) {
        window.scrollTo(0, y);
        await delay(60);
      }
      window.scrollTo(0, 0);
      await delay(120);
    });

    const data = await page.evaluate((id) => {
      const active = document.querySelector(`.page#${id}`);
      if (!active) return { page: id, missingPage: true };

      const hero = active.querySelector('.hero');
      const heroStyle = hero ? getComputedStyle(hero) : null;
      const heroBg = heroStyle ? heroStyle.backgroundImage : '';
      const heroImgs = Array.from(hero?.querySelectorAll('img') || []);
      const contentImgs = Array.from(active.querySelectorAll('img'));
      const visibleImgs = contentImgs.filter((img) => {
        const rect = img.getBoundingClientRect();
        const style = getComputedStyle(img);
        return rect.width > 0 && rect.height > 0 && style.visibility !== 'hidden' && style.display !== 'none';
      });

      const imageIssues = visibleImgs.map((img) => {
        const rect = img.getBoundingClientRect();
        const style = getComputedStyle(img);
        const naturalRatio = img.naturalWidth && img.naturalHeight ? img.naturalWidth / img.naturalHeight : 0;
        const displayRatio = rect.width / rect.height;
        const ratioDelta = naturalRatio && displayRatio ? Math.abs(Math.log(naturalRatio / displayRatio)) : 0;
        const reasons = [];

        if (!img.complete || img.naturalWidth === 0) reasons.push('not-loaded');
        if (rect.width < 80 || rect.height < 80) reasons.push('too-small-for-content-image');
        if (style.objectFit === 'cover' && ratioDelta > 0.75) reasons.push('heavy-cover-crop');
        if (rect.height < 0.38 * rect.width && !img.closest('.hero')) reasons.push('very-flat-crop');

        return {
          src: img.getAttribute('src'),
          alt: img.getAttribute('alt') || '',
          className: img.className || '',
          rendered: { width: Math.round(rect.width), height: Math.round(rect.height) },
          natural: { width: img.naturalWidth, height: img.naturalHeight },
          objectFit: style.objectFit,
          objectPosition: style.objectPosition,
          reasons,
        };
      }).filter((entry) => entry.reasons.length);

      const srcCounts = visibleImgs.reduce((acc, img) => {
        const src = img.getAttribute('src');
        if (src) acc[src] = (acc[src] || 0) + 1;
        return acc;
      }, {});
      const duplicateVisibleImages = Object.entries(srcCounts)
        .filter(([, count]) => count > 1)
        .map(([src, count]) => ({ src, count }));

      const sectionsWithoutImages = Array.from(active.querySelectorAll('section, .section, .content-section, .article-section, .card-grid, .container > .card'))
        .filter((section) => {
          const rect = section.getBoundingClientRect();
          const style = getComputedStyle(section);
          if (rect.width === 0 || rect.height === 0 || style.display === 'none') return false;
          return !section.querySelector('img');
        })
        .length;

      return {
        page: id,
        activeHeight: Math.round(active.getBoundingClientRect().height),
        heroHasImage: heroImgs.length > 0 || heroBg.includes('url('),
        heroBackground: heroBg,
        visibleImageCount: visibleImgs.length,
        imageIssues,
        duplicateVisibleImages,
        sectionsWithoutImages,
        horizontalOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
      };
    }, pageId);

    const fileName = `${viewport.name}-${pageId}.png`;
    await page.screenshot({ path: path.join(outDir, fileName), fullPage: true });
    report.push({ viewport: viewport.name, screenshot: `screenshots/image-audit/${fileName}`, ...data });
  }

  await context.close();
}

await browser.close();

await fs.writeFile(path.join(outDir, 'report.json'), JSON.stringify(report, null, 2));

const sourceHtmlPath = path.join(projectRoot, 'src', 'site-source.html');
const htmlSource = await fs.readFile(sourceHtmlPath, 'utf8').catch(() => fs.readFile(path.join(projectRoot, 'index.html'), 'utf8'));
const sourceImageRefs = Array.from(
  htmlSource.matchAll(/(?:src:\s*'|src=\")([^'\"]*assets\/images\/[^'\"]+)/g),
  (match) => match[1]
);
const sourceImageCounts = sourceImageRefs.reduce((acc, src) => {
  acc[src] = (acc[src] || 0) + 1;
  return acc;
}, {});
const duplicateSourceImages = Object.entries(sourceImageCounts)
  .filter(([src, count]) => count > 1 && !allowedRepeatedImages.has(src))
  .map(([src, count]) => ({ src, count }));

const uniqueSourceImages = [...new Set(sourceImageRefs)];
const missingImageFiles = [];
for (const src of uniqueSourceImages) {
  try {
    await fs.access(path.join(projectRoot, src));
  } catch {
    missingImageFiles.push(src);
  }
}

const imageCredits = JSON.parse(await fs.readFile(path.join(projectRoot, 'assets', 'image-credits.json'), 'utf8'));
const creditedImages = new Set(imageCredits.map((entry) => entry.localPath.replaceAll('\\', '/')));
const missingCredits = uniqueSourceImages.filter((src) => !creditedImages.has(src));

const failures = report.filter((entry) =>
  (entry.page !== 'startseite' && !entry.heroHasImage) ||
  entry.visibleImageCount === 0 ||
  entry.imageIssues.length > 0 ||
  entry.duplicateVisibleImages.length > 0 ||
  entry.horizontalOverflow
);

console.log(JSON.stringify({
  checked: report.length,
  sourceImages: {
    totalRefs: sourceImageRefs.length,
    uniqueRefs: uniqueSourceImages.length,
    duplicateSourceImages,
    missingImageFiles,
    missingCredits,
  },
  failures: failures.length + duplicateSourceImages.length + missingImageFiles.length + missingCredits.length,
  byPage: failures.map((entry) => ({
    viewport: entry.viewport,
    page: entry.page,
    heroHasImage: entry.heroHasImage,
    visibleImageCount: entry.visibleImageCount,
    imageIssues: entry.imageIssues,
    duplicateVisibleImages: entry.duplicateVisibleImages,
    sectionsWithoutImages: entry.sectionsWithoutImages,
    horizontalOverflow: entry.horizontalOverflow,
    screenshot: entry.screenshot,
  })),
}, null, 2));

if (failures.length || duplicateSourceImages.length || missingImageFiles.length || missingCredits.length) process.exitCode = 1;
