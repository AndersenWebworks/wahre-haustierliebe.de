import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const pagesPath = path.join(projectRoot, 'ai', 'pages.json');
const outputPath = path.join(projectRoot, '.clautz', 'public-copy-surface.json');
const playwrightModule = pathToFileURL(path.resolve(projectRoot, '..', 'ClautzGPT', 'node_modules', 'playwright', 'index.js')).href;
const playwright = await import(playwrightModule);
const { chromium } = playwright.default ?? playwright;

const pageIndex = JSON.parse(await fs.readFile(pagesPath, 'utf8'));
const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({ javaScriptEnabled: false });
const surfacePages = [];
const maxSurfacePartChars = 40000;

function appendSurfaceParts({ route, title, content }) {
  const parts = [];
  let current = [];
  let currentChars = 0;

  for (const value of content) {
    if (current.length > 0 && currentChars + value.length > maxSurfacePartChars) {
      parts.push(current);
      current = [];
      currentChars = 0;
    }
    current.push(value);
    currentChars += value.length;
  }
  if (current.length > 0) parts.push(current);

  if (parts.length === 1) {
    surfacePages.push({ route, title, content: parts[0] });
    return;
  }

  parts.forEach((part, index) => {
    const partNumber = index + 1;
    surfacePages.push({
      route: `${route}#copy-part-${partNumber}`,
      title: `${title} (Teil ${partNumber} von ${parts.length})`,
      content: part,
    });
  });
}

try {
  for (const entry of pageIndex.pages) {
    const route = new URL(entry.url).pathname;
    const segments = route.split('/').filter(Boolean);
    const localPath = path.join(projectRoot, ...segments);
    const page = await context.newPage();
    await page.goto(pathToFileURL(localPath).href, { waitUntil: 'domcontentloaded' });

    const content = await page.evaluate(() => {
      const selector = 'h1,h2,h3,h4,p,li,dt,dd,th,td,summary,button,label,a,input,textarea,select,option,img';
      const values = [];

      for (const element of document.querySelectorAll(selector)) {
        if (element.closest('[aria-hidden="true"]')) continue;

        const nestedTextElement = element.matches('a,button')
          && element.parentElement?.closest('h1,h2,h3,h4,p,li,th,td,summary,label');

        const candidates = [
          nestedTextElement ? null : element.innerText,
          element.getAttribute('aria-label'),
          element.getAttribute('placeholder'),
          element.getAttribute('alt'),
        ];
        const seenInElement = new Set();

        for (const candidate of candidates) {
          const value = candidate?.trim();
          if (!value || seenInElement.has(value)) continue;
          seenInElement.add(value);
          values.push(value);
        }
      }

      return values;
    });

    appendSurfaceParts({ route, title: await page.title(), content });
    await page.close();
  }
} finally {
  await browser.close();
}

await fs.mkdir(path.dirname(outputPath), { recursive: true });
await fs.writeFile(outputPath, `${JSON.stringify({
  version: 1,
  project: 'wahre-haustierliebe',
  pages: surfacePages,
}, null, 2)}\n`, 'utf8');

console.log(JSON.stringify({ pages: surfacePages.length, output: path.relative(projectRoot, outputPath) }));
