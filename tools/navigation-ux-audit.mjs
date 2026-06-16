import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const playwrightModule = pathToFileURL(path.resolve(projectRoot, '..', 'ClautzGPT', 'node_modules', 'playwright', 'index.js')).href;
const playwright = await import(playwrightModule);
const { chromium } = playwright.default ?? playwright;

const outDir = path.join(projectRoot, 'screenshots', 'navigation-ux-audit');
await fs.mkdir(outDir, { recursive: true });

const browser = await chromium.launch();
const failures = [];
const screenshots = [];

function issue(label, detail) {
  failures.push({ label, detail });
}

async function capture(page, name) {
  const target = path.join(outDir, `${name}.png`);
  await page.screenshot({ path: target, fullPage: true });
  screenshots.push(`screenshots/navigation-ux-audit/${name}.png`);
}

const desktop = await browser.newContext({ viewport: { width: 1366, height: 768 } });
const desktopPage = await desktop.newPage();
await desktopPage.goto(pathToFileURL(path.join(projectRoot, 'index.html')).href, { waitUntil: 'load' });
await desktopPage.click('button[aria-controls="tierarten-menu"]');
await desktopPage.waitForTimeout(150);

const desktopMenu = await desktopPage.evaluate(() => {
  const menu = document.getElementById('tierarten-menu');
  const rect = menu.getBoundingClientRect();
  return {
    display: getComputedStyle(menu).display,
    top: rect.top,
    bottom: rect.bottom,
    width: rect.width,
    height: rect.height,
    viewportHeight: innerHeight,
    activePanel: document.querySelector('.browse-panel.is-active')?.dataset.browsePanel || '',
    visiblePanels: Array.from(document.querySelectorAll('.browse-panel')).filter((panel) => getComputedStyle(panel).display !== 'none').length,
  };
});

if (desktopMenu.display === 'none') issue('desktop-menu-hidden', desktopMenu);
if (desktopMenu.bottom > desktopMenu.viewportHeight - 8) issue('desktop-menu-outside-viewport', desktopMenu);
if (desktopMenu.visiblePanels !== 1) issue('desktop-visible-panel-count', desktopMenu);
if (desktopMenu.activePanel !== 'hunde') issue('desktop-initial-panel', desktopMenu);

await desktopPage.hover('[data-browse-tab="voegel"]');
await desktopPage.waitForTimeout(100);
const tabState = await desktopPage.evaluate(() => ({
  activeTab: document.querySelector('.browse-tab.is-active')?.dataset.browseTab || '',
  activePanel: document.querySelector('.browse-panel.is-active')?.dataset.browsePanel || '',
  visibleItems: Array.from(document.querySelectorAll('.browse-panel.is-active .dropdown-item')).map((item) => item.textContent.trim()),
  featuredInHead: document.querySelectorAll('.browse-panel.is-active .browse-panel-head .dropdown-item-featured').length,
  featuredInGrid: document.querySelectorAll('.browse-panel.is-active .browse-panel-grid .dropdown-item-featured').length,
}));
if (tabState.activeTab !== 'voegel' || tabState.activePanel !== 'voegel') issue('desktop-tab-switch-failed', tabState);
if (!tabState.visibleItems.includes('Freiflug')) issue('desktop-tab-content-missing', tabState);
if (tabState.featuredInHead !== 0 || tabState.featuredInGrid !== 1) issue('desktop-overview-placement', tabState);
await capture(desktopPage, 'desktop-tierarten-panel');

await desktopPage.click('[data-browse-tab="katzen"]');
await desktopPage.waitForLoadState('load');
const tabClickState = await desktopPage.evaluate(() => ({
  path: window.location.pathname,
  title: document.querySelector('h1')?.textContent.trim() || '',
  menuOpen: document.getElementById('tierarten-menu') ? getComputedStyle(document.getElementById('tierarten-menu')).display !== 'none' : false,
}));
if (!tabClickState.path.endsWith('/katzen/') && !tabClickState.path.endsWith('/katzen/index.html') && !tabClickState.title.includes('Katzen')) issue('desktop-tab-click-overview-failed', tabClickState);
if (tabClickState.menuOpen) issue('desktop-tab-click-menu-still-open', tabClickState);

await desktopPage.click('.nav-link-search');
await desktopPage.fill('#site-search-input', 'Teflon');
await desktopPage.waitForTimeout(100);
const searchState = await desktopPage.evaluate(() => ({
  open: document.getElementById('site-search')?.classList.contains('open') || false,
  results: Array.from(document.querySelectorAll('#site-search-results .site-search-result')).map((item) => item.textContent.trim()),
  overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
}));
if (!searchState.open) issue('desktop-search-not-open', searchState);
if (!searchState.results.some((text) => text.includes('Teflon') || text.includes('Küchenluft'))) issue('desktop-search-result-missing', searchState);
if (searchState.overflow > 1) issue('desktop-search-overflow', searchState);
await capture(desktopPage, 'desktop-search');
await desktop.close();

const mobile = await browser.newContext({ viewport: { width: 390, height: 900 } });
const mobilePage = await mobile.newPage();
await mobilePage.goto(pathToFileURL(path.join(projectRoot, 'index.html')).href, { waitUntil: 'load' });
await mobilePage.click('.hamburger');
await mobilePage.waitForTimeout(150);
const mobileRoot = await mobilePage.evaluate(() => ({
  open: document.getElementById('mobile-nav')?.classList.contains('open') || false,
  activeView: document.querySelector('.mobile-nav-view.is-active')?.dataset.mobileNavView || '',
  branchCount: document.querySelectorAll('.mobile-nav-branch').length,
  overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
}));
if (!mobileRoot.open) issue('mobile-menu-not-open', mobileRoot);
if (mobileRoot.activeView !== 'root') issue('mobile-root-not-active', mobileRoot);
if (mobileRoot.branchCount < 7) issue('mobile-branch-count-low', mobileRoot);
if (mobileRoot.overflow > 1) issue('mobile-root-overflow', mobileRoot);
await capture(mobilePage, 'mobile-root');

await mobilePage.click('button[onclick="openMobileNavPanel(\'katzen\')"]');
await mobilePage.waitForTimeout(100);
const mobilePanel = await mobilePage.evaluate(() => ({
  activeView: document.querySelector('.mobile-nav-view.is-active')?.dataset.mobileNavView || '',
  links: Array.from(document.querySelectorAll('.mobile-nav-view.is-active .mobile-nav-link')).map((item) => item.textContent.trim()),
  overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
}));
if (mobilePanel.activeView !== 'katzen') issue('mobile-drilldown-failed', mobilePanel);
if (!mobilePanel.links.includes('Wildkatzenbaby gefunden?')) issue('mobile-panel-link-missing', mobilePanel);
if (mobilePanel.overflow > 1) issue('mobile-panel-overflow', mobilePanel);
await capture(mobilePage, 'mobile-katzen-panel');

await mobilePage.click('.mobile-nav-view.is-active .mobile-nav-back');
await mobilePage.fill('#mobile-site-search-input', 'Hamster');
await mobilePage.waitForTimeout(100);
const mobileSearch = await mobilePage.evaluate(() => ({
  activeView: document.querySelector('.mobile-nav-view.is-active')?.dataset.mobileNavView || '',
  results: Array.from(document.querySelectorAll('#mobile-site-search-results .site-search-result')).map((item) => item.textContent.trim()),
  overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
}));
if (mobileSearch.activeView !== 'root') issue('mobile-search-not-root', mobileSearch);
if (!mobileSearch.results.some((text) => text.includes('Hamster'))) issue('mobile-search-result-missing', mobileSearch);
if (mobileSearch.overflow > 1) issue('mobile-search-overflow', mobileSearch);
await capture(mobilePage, 'mobile-search');
await mobile.close();

await browser.close();

const report = {
  checkedStates: 6,
  failures: failures.length,
  failuresByState: failures,
  screenshots,
};

await fs.writeFile(path.join(outDir, 'report.json'), JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));

if (failures.length) process.exitCode = 1;
