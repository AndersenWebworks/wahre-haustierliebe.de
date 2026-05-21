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
  'noch-nicht-bereit',
];

const viewports = [
  { name: 'desktop', width: 1440, height: 1100 },
  { name: 'mobile', width: 390, height: 900 },
];

const outDir = path.join(projectRoot, 'screenshots', 'image-audit');
await fs.mkdir(outDir, { recursive: true });

const fileUrl = pathToFileURL(path.join(projectRoot, 'index.html')).href;
const browser = await chromium.launch();
const report = [];

for (const viewport of viewports) {
  const context = await browser.newContext({ viewport });
  const page = await context.newPage();

  for (const pageId of pages) {
    await page.goto(`${fileUrl}#${pageId}`, { waitUntil: 'load' });
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

const failures = report.filter((entry) =>
  !entry.heroHasImage ||
  entry.visibleImageCount === 0 ||
  entry.imageIssues.length > 0 ||
  entry.horizontalOverflow
);

console.log(JSON.stringify({
  checked: report.length,
  failures: failures.length,
  byPage: failures.map((entry) => ({
    viewport: entry.viewport,
    page: entry.page,
    heroHasImage: entry.heroHasImage,
    visibleImageCount: entry.visibleImageCount,
    imageIssues: entry.imageIssues,
    sectionsWithoutImages: entry.sectionsWithoutImages,
    horizontalOverflow: entry.horizontalOverflow,
    screenshot: entry.screenshot,
  })),
}, null, 2));

if (failures.length) process.exitCode = 1;
