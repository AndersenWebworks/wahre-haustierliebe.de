import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const playwrightModule = pathToFileURL(path.resolve(projectRoot, '..', 'ClautzGPT', 'node_modules', 'playwright', 'index.js')).href;
const playwright = await import(playwrightModule);
const { chromium } = playwright.default ?? playwright;

const baseUrl = 'https://wahre-haustierliebe.de';
const outDir = path.join(projectRoot, 'screenshots', 'full-page-visual-audit');

const viewports = [
  { name: 'desktop', width: 1440, height: 1100 },
  { name: 'mobile', width: 390, height: 900 },
];

const pagesWithoutArticleHero = new Set(['startseite', 'budgie-brain', 'impressum', 'datenschutz']);

function pageFileFromUrl(url) {
  const parsed = new URL(url);
  let pathname = parsed.pathname.replace(/^\/+/, '');
  if (!pathname || pathname.endsWith('/')) pathname = `${pathname}index.html`;
  if (!path.extname(pathname)) pathname = `${pathname}/index.html`;
  return pathname;
}

function safeName(value) {
  return value.replace(/[^a-z0-9-]+/gi, '-').replace(/^-+|-+$/g, '') || 'startseite';
}

const sitemap = await fs.readFile(path.join(projectRoot, 'sitemap.xml'), 'utf8');
const pages = Array.from(sitemap.matchAll(/<loc>([^<]+)<\/loc>/g), (match) => {
  const url = match[1];
  return {
    url,
    file: pageFileFromUrl(url),
  };
}).filter((page) => page.url.startsWith(baseUrl));

await fs.mkdir(outDir, { recursive: true });

const browser = await chromium.launch();
const report = [];

for (const viewport of viewports) {
  const context = await browser.newContext({ viewport });
  const page = await context.newPage();

  for (const pageInfo of pages) {
    const filePath = path.join(projectRoot, pageInfo.file);
    await page.goto(pathToFileURL(filePath).href, { waitUntil: 'load' });
    await page.evaluate(() => {
      for (const image of document.images) image.loading = 'eager';
    });
    await page.waitForFunction(() => document.fonts?.ready || true, undefined, { timeout: 5000 }).catch(() => {});
    await page.waitForFunction(
      () => Array.from(document.images).every((image) => image.complete && image.naturalWidth > 0),
      undefined,
      { timeout: 7000 },
    ).catch(() => {});

    await page.evaluate(async () => {
      const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
      const max = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
      for (let y = 0; y <= max; y += Math.max(500, Math.round(window.innerHeight * 0.75))) {
        window.scrollTo(0, y);
        await delay(35);
      }
      window.scrollTo(0, 0);
      await delay(100);
    });
    await page.waitForFunction(
      () => Array.from(document.images).every((image) => image.complete && image.naturalWidth > 0),
      undefined,
      { timeout: 7000 },
    ).catch(() => {});

    const data = await page.evaluate(() => {
      const issues = [];
      const pageId = document.body.dataset.pageId || 'unknown';
      const active = document.querySelector(`.page#${CSS.escape(pageId)}`) || document.querySelector('main') || document.body;
      const viewportWidth = document.documentElement.clientWidth;
      const horizontalOverflow = document.documentElement.scrollWidth - viewportWidth;
      if (horizontalOverflow > 1) issues.push(`horizontal-overflow:${horizontalOverflow}`);

      const h1 = active.querySelector('h1');
      if (!h1 || !h1.textContent.trim()) issues.push('missing-h1');

      const hero = active.querySelector('.hero');
      const pagesWithoutArticleHero = new Set(['startseite', 'budgie-brain', 'impressum', 'datenschutz']);
      if (!pagesWithoutArticleHero.has(pageId)) {
        const media = hero?.querySelector('.article-hero-media');
        const image = media?.querySelector('img');
        const mediaRect = media?.getBoundingClientRect();
        if (!media || !image) {
          issues.push('missing-article-hero-image');
        } else {
          if (!image.complete || image.naturalWidth === 0) issues.push('hero-image-not-loaded');
          if (mediaRect.width < 220 || mediaRect.height < 160) issues.push(`hero-image-too-small:${Math.round(mediaRect.width)}x${Math.round(mediaRect.height)}`);
          if (!image.getAttribute('width') || !image.getAttribute('height')) issues.push('hero-image-missing-dimensions');
          if (!image.getAttribute('alt')?.trim()) issues.push('hero-image-missing-alt');
        }
      }

      const visibleImages = Array.from(active.querySelectorAll('img')).filter((image) => {
        const rect = image.getBoundingClientRect();
        const style = getComputedStyle(image);
        return rect.width > 0 && rect.height > 0 && style.display !== 'none' && style.visibility !== 'hidden';
      });
      for (const image of visibleImages) {
        const rect = image.getBoundingClientRect();
        const style = getComputedStyle(image);
        if (!image.complete || image.naturalWidth === 0) issues.push(`image-not-loaded:${image.getAttribute('src')}`);
        if (!image.getAttribute('alt') && image.getAttribute('aria-hidden') !== 'true') issues.push(`image-missing-alt:${image.getAttribute('src')}`);
        if (style.objectFit === 'cover') {
          const naturalRatio = image.naturalWidth / image.naturalHeight;
          const renderedRatio = rect.width / rect.height;
          if (naturalRatio && renderedRatio && Math.abs(Math.log(naturalRatio / renderedRatio)) > 1.05) {
            issues.push(`image-heavy-crop:${image.getAttribute('src')}:${Math.round(rect.width)}x${Math.round(rect.height)}`);
          }
        }
      }

      const readableBlocks = Array.from(active.querySelectorAll('h1,h2,h3,h4,p,li,a,button,figcaption,summary,td,th')).filter((element) => {
        const rect = element.getBoundingClientRect();
        const style = getComputedStyle(element);
        return rect.width > 0 && rect.height > 0 && style.display !== 'none' && style.visibility !== 'hidden' && element.textContent.trim();
      });

      for (const element of readableBlocks) {
        const rect = element.getBoundingClientRect();
        const text = element.textContent.replace(/\s+/g, ' ').trim().slice(0, 80);
        if (rect.left < -1 || rect.right > viewportWidth + 1) issues.push(`text-outside-viewport:${element.tagName.toLowerCase()}:${text}`);
        const isFramedText = Boolean(element.closest('.info-box, .warning-box, .highlight-box, .share-callout, .faq-item, .animal-topic-grid, .quick-facts, .support-box, .article-rhythm, .evidence-card, .hero-evidence-grid, .proof-card'));
        if (pageId !== 'startseite' && !isFramedText && viewportWidth >= 900 && ['P', 'LI'].includes(element.tagName) && rect.width > 920) {
          issues.push(`text-line-too-wide:${element.tagName.toLowerCase()}:${Math.round(rect.width)}:${text}`);
        }
        if (['A', 'BUTTON', 'SUMMARY'].includes(element.tagName) && !element.closest('.card, .info-box, .warning-box, .highlight-box, .table-wrapper, .article-rhythm')) {
          const parent = element.parentElement?.getBoundingClientRect();
          if (parent && rect.width > parent.width + 2 && parent.width > 0) {
            issues.push(`control-text-overflow:${element.tagName.toLowerCase()}:${text}`);
          }
        }
      }

      const heroRect = hero?.getBoundingClientRect();
      return {
        pageId,
        title: h1?.textContent.replace(/\s+/g, ' ').trim() || '',
        horizontalOverflow,
        activeHeight: Math.round(active.getBoundingClientRect().height),
        heroHeight: heroRect ? Math.round(heroRect.height) : 0,
        visibleImageCount: visibleImages.length,
        issues,
      };
    });

    const screenshot = `${viewport.name}-${safeName(data.pageId)}.png`;
    await page.screenshot({ path: path.join(outDir, screenshot), fullPage: true });
    report.push({
      viewport: viewport.name,
      file: pageInfo.file,
      url: pageInfo.url,
      screenshot: `screenshots/full-page-visual-audit/${screenshot}`,
      ...data,
    });
  }

  await context.close();
}

await browser.close();

await fs.writeFile(path.join(outDir, 'report.json'), JSON.stringify(report, null, 2));

const failures = report.filter((entry) => entry.issues.length);
console.log(JSON.stringify({
  pages: pages.length,
  checkedViews: report.length,
  failures: failures.length,
  failuresByPage: failures.map((entry) => ({
    viewport: entry.viewport,
    file: entry.file,
    pageId: entry.pageId,
    title: entry.title,
    issues: entry.issues,
    screenshot: entry.screenshot,
  })),
}, null, 2));

if (failures.length) process.exitCode = 1;
