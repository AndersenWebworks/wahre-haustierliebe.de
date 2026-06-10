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
  { id: 'startseite', file: 'index.html' },
  { id: 'mensch', file: 'mensch/index.html' },
  { id: 'hunde', file: 'hunde/index.html' },
  { id: 'katzen', file: 'katzen/index.html' },
  { id: 'voegel', file: 'voegel/index.html' },
  { id: 'kleintiere', file: 'kleintiere/index.html' },
  { id: 'exoten', file: 'exoten/index.html' },
  { id: 'pferde', file: 'pferde/index.html' },
  { id: 'kastration', file: 'kastration/index.html' },
  { id: 'qualzucht', file: 'qualzucht/index.html' },
  { id: 'adoption', file: 'adoption/index.html' },
  { id: 'selbsttest', file: 'selbsttest/index.html' },
  { id: 'notfall', file: 'notfall/index.html' },
  { id: 'wissen', file: 'wissen/index.html' },
  { id: 'glossar', file: 'glossar/index.html' },
  { id: 'hitzefalle-auto', file: 'hitzefalle-auto/index.html' },
  { id: 'ernaehrung-taurin', file: 'ernaehrung-taurin/index.html' },
  { id: 'realhaltung', file: 'realhaltung/index.html' },
  { id: 'zucht-und-vermehrung', file: 'zucht-und-vermehrung/index.html' },
  { id: 'wildtierhaltung', file: 'wildtierhaltung/index.html' },
  { id: 'wildkatzenbaby-gefunden', file: 'wildkatzenbaby-gefunden/index.html' },
  { id: 'noch-nicht-bereit', file: 'noch-nicht-bereit/index.html' },
];

const viewports = [
  { name: 'desktop', width: 1440, height: 1100 },
  { name: 'narrow', width: 1200, height: 1000 },
  { name: 'tablet', width: 820, height: 1000 },
  { name: 'mobile', width: 390, height: 900 },
  { name: 'small-mobile', width: 360, height: 880 },
];

const outDir = path.join(projectRoot, 'screenshots', 'layout-consistency-audit');
await fs.mkdir(outDir, { recursive: true });

function roundRect(rect) {
  return {
    left: Math.round(rect.left),
    right: Math.round(rect.right),
    top: Math.round(rect.top),
    bottom: Math.round(rect.bottom),
    width: Math.round(rect.width),
    height: Math.round(rect.height),
  };
}

const browser = await chromium.launch();
const report = [];

for (const viewport of viewports) {
  const context = await browser.newContext({ viewport });
  const page = await context.newPage();

  for (const pageInfo of pages) {
    await page.goto(pathToFileURL(path.join(projectRoot, pageInfo.file)).href, { waitUntil: 'load' });
    await page.waitForTimeout(180);
    await page.evaluate(async () => {
      const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
      const max = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
      for (let y = 0; y <= max; y += 900) {
        window.scrollTo(0, y);
        await delay(30);
      }
      window.scrollTo(0, 0);
      await delay(80);
    });

    if (['startseite', 'hunde', 'adoption', 'selbsttest', 'wissen'].includes(pageInfo.id)) {
      await page.screenshot({ path: path.join(outDir, `${viewport.name}-${pageInfo.id}.png`), fullPage: true });
    }

    const data = await page.evaluate((id) => {
      const issues = [];
      const rectFor = (element) => {
        const rect = element.getBoundingClientRect();
        return {
          left: rect.left,
          right: rect.right,
          top: rect.top,
          bottom: rect.bottom,
          width: rect.width,
          height: rect.height,
        };
      };
      const rounded = (rect) => ({
        left: Math.round(rect.left),
        right: Math.round(rect.right),
        top: Math.round(rect.top),
        bottom: Math.round(rect.bottom),
        width: Math.round(rect.width),
        height: Math.round(rect.height),
      });
      const contentWidth = (element) => {
        const rect = rectFor(element);
        const style = getComputedStyle(element);
        return rect.width - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight);
      };

      const viewportWidth = document.documentElement.clientWidth;
      const horizontalOverflow = document.documentElement.scrollWidth - viewportWidth;
      if (horizontalOverflow > 1) issues.push(`horizontal-overflow:${horizontalOverflow}`);

      const active = document.querySelector(`.page#${id}`) || document.querySelector('main') || document.body;
      const sections = Array.from(active.querySelectorAll(':scope > .section'));
      const sectionMetrics = sections.map((section, index) => {
        const style = getComputedStyle(section);
        const paddingTop = parseFloat(style.paddingTop);
        const paddingBottom = parseFloat(style.paddingBottom);
        const rect = rectFor(section);
        if (id !== 'startseite' && viewportWidth >= 900 && (paddingTop > 100 || paddingBottom > 100)) {
          issues.push(`section-padding-too-large:${index}:${Math.round(paddingTop)}:${Math.round(paddingBottom)}`);
        }
        if (viewportWidth < 700 && (paddingTop > 78 || paddingBottom > 78)) {
          issues.push(`mobile-section-padding-too-large:${index}:${Math.round(paddingTop)}:${Math.round(paddingBottom)}`);
        }
        return {
          index,
          className: section.className,
          background: style.backgroundColor,
          paddingTop: Math.round(paddingTop),
          paddingBottom: Math.round(paddingBottom),
          height: Math.round(rect.height),
        };
      });

      const textBlocks = Array.from(active.querySelectorAll('.section > .container > p, .section > .container > ul, .section > .container > ol'))
        .filter((element) => {
          const rect = rectFor(element);
          const style = getComputedStyle(element);
          return rect.width > 0 && rect.height > 0 && style.display !== 'none' && !element.closest('.share-callout, .support-box');
        })
        .map((element) => ({ tag: element.tagName.toLowerCase(), text: element.textContent.replace(/\s+/g, ' ').trim().slice(0, 80), rect: rectFor(element) }));

      for (const block of textBlocks) {
        if (viewportWidth >= 900 && block.rect.width > 860) {
          issues.push(`text-line-too-wide:${block.tag}:${block.rect.width}:${block.text}`);
        }
      }

      const tables = Array.from(active.querySelectorAll('.cost-table')).map((table, index) => {
        const container = table.closest('.container') || table.parentElement;
        const tableRect = rectFor(table);
        const containerContentWidth = container ? contentWidth(container) : tableRect.width;
        const tbody = table.querySelector('tbody');
        const firstRow = table.querySelector('tbody tr');
        const tbodyRect = tbody ? rectFor(tbody) : null;
        const firstRowRect = firstRow ? rectFor(firstRow) : null;
        const display = getComputedStyle(table).display;
        const mode = viewportWidth <= 760 ? 'card' : 'table';

        if (Math.abs(tableRect.width - containerContentWidth) > 3) {
          issues.push(`table-not-container-width:${index}:${Math.round(tableRect.width)}:${Math.round(containerContentWidth)}`);
        }
        if (mode === 'table') {
          if (display !== 'table') issues.push(`desktop-table-display-not-table:${index}:${display}`);
          if (tbodyRect && tbodyRect.width < tableRect.width - 3) issues.push(`tbody-shrinks:${index}:${Math.round(tbodyRect.width)}:${Math.round(tableRect.width)}`);
          if (firstRowRect && firstRowRect.width < tableRect.width - 3) issues.push(`table-row-shrinks:${index}:${Math.round(firstRowRect.width)}:${Math.round(tableRect.width)}`);
        } else if (display !== 'block') {
          issues.push(`mobile-table-display-not-card:${index}:${display}`);
        }

        return {
          index,
          display,
          mode,
          table: rounded(tableRect),
          containerContentWidth: Math.round(containerContentWidth),
          tbody: tbodyRect ? rounded(tbodyRect) : null,
          firstRow: firstRowRect ? rounded(firstRowRect) : null,
        };
      });

      return {
        id,
        horizontalOverflow,
        sectionMetrics,
        textBlocks: textBlocks.slice(0, 12),
        tables,
        issues,
      };
    }, pageInfo.id);

    report.push({ viewport: viewport.name, file: pageInfo.file, ...data });
  }

  await context.close();
}

await browser.close();

await fs.writeFile(path.join(outDir, 'report.json'), JSON.stringify(report, null, 2));

const failures = report.flatMap((entry) =>
  entry.issues.map((issue) => ({
    viewport: entry.viewport,
    file: entry.file,
    issue,
  })),
);

console.log(JSON.stringify({
  checked: report.length,
  failures: failures.length,
  failures,
  screenshots: [
    'screenshots/layout-consistency-audit/desktop-startseite.png',
    'screenshots/layout-consistency-audit/desktop-hunde.png',
    'screenshots/layout-consistency-audit/mobile-hunde.png',
    'screenshots/layout-consistency-audit/desktop-adoption.png',
    'screenshots/layout-consistency-audit/mobile-adoption.png',
  ],
}, null, 2));

if (failures.length) process.exitCode = 1;
