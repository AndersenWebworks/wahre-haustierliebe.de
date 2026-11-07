import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { playwrightModuleUrl } from './playwright-module.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const playwrightModule = playwrightModuleUrl(projectRoot);
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
  groups: Array.from(document.querySelectorAll('.mobile-group')).map((g) => g.dataset.mobileGroup),
  notfallOpen: document.querySelector('.mobile-group-alarm')?.open || false,
  notfallVisible: (() => { const el = document.querySelector('.mobile-group-alarm .mobile-nav-link'); if (!el) return false; const r = el.getBoundingClientRect(); return r.height > 0 && r.top >= 0 && r.bottom <= innerHeight; })(),
  overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
}));
if (!mobileRoot.open) issue('mobile-menu-not-open', mobileRoot);
if (mobileRoot.activeView !== 'root') issue('mobile-root-not-active', mobileRoot);
if (mobileRoot.groups.join(',') !== 'ich-will,tierarten,notfall,nachschlagen,mitmachen') issue('mobile-groups-wrong', mobileRoot);
if (!mobileRoot.notfallOpen || !mobileRoot.notfallVisible) issue('mobile-notfall-not-visible', mobileRoot);
if (mobileRoot.overflow > 1) issue('mobile-root-overflow', mobileRoot);
await capture(mobilePage, 'mobile-root');

await mobilePage.click('summary:has-text("Tierarten")');
await mobilePage.click('.mobile-subgroup-summary:has-text("Katzen")');
await mobilePage.waitForTimeout(100);
const mobilePanel = await mobilePage.evaluate(() => {
  const small = Array.from(document.querySelectorAll('#mobile-nav summary, #mobile-nav .mobile-nav-link'))
    .filter((el) => el.offsetParent !== null)
    .map((el) => ({ text: el.textContent.trim(), height: Math.round(el.getBoundingClientRect().height) }))
    .filter((item) => item.height < 44);
  return {
    links: Array.from(document.querySelectorAll('.mobile-subgroup[data-mobile-group="katzen"] .mobile-nav-link')).map((item) => item.textContent.trim()),
    notfallLinks: Array.from(document.querySelectorAll('.mobile-group-alarm .mobile-nav-link')).map((item) => item.textContent.trim()),
    expanded: document.querySelector('.mobile-subgroup[data-mobile-group="katzen"]')?.open || false,
    small,
    overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
  };
});
if (!mobilePanel.expanded) issue('mobile-group-expand-failed', mobilePanel);
if (!mobilePanel.links.includes('Kätzchen: Tierarzt im ersten Jahr')) issue('mobile-panel-link-missing', mobilePanel);
if (!mobilePanel.notfallLinks.includes('Wildkatzenbaby gefunden?')) issue('mobile-notfall-link-missing', mobilePanel);
if (mobilePanel.small.length) issue('mobile-target-below-44px', mobilePanel.small);
if (mobilePanel.overflow > 1) issue('mobile-panel-overflow', mobilePanel);
await capture(mobilePage, 'mobile-katzen-panel');

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

// Tastaturbedienung der Desktop-Menüs: Pfeil nach unten öffnet, Escape schließt, aria-expanded folgt.
const kbContext = await browser.newContext({ viewport: { width: 1280, height: 800 } });
const kbPage = await kbContext.newPage();
await kbPage.goto(pathToFileURL(path.join(projectRoot, 'index.html')).href, { waitUntil: 'load' });
for (const menuId of ['ich-will-menu', 'tierarten-menu', 'notfall-menu', 'nachschlagen-menu', 'mitmachen-menu']) {
  const toggle = kbPage.locator(`button[aria-controls="${menuId}"]`);
  const label = (await toggle.textContent()).trim();
  await toggle.focus();
  await kbPage.keyboard.press('ArrowDown');
  await kbPage.waitForTimeout(80);
  const opened = await kbPage.evaluate((id) => ({
    expanded: document.querySelector(`button[aria-controls="${id}"]`).getAttribute('aria-expanded'),
    visible: getComputedStyle(document.getElementById(id)).display !== 'none',
    focusInside: document.getElementById(id).contains(document.activeElement),
    haspopup: document.querySelector(`button[aria-controls="${id}"]`).getAttribute('aria-haspopup'),
  }), menuId);
  if (opened.expanded !== 'true' || !opened.visible || !opened.focusInside || opened.haspopup !== 'true') issue('keyboard-open-failed', { menuId, label, opened });
  await kbPage.keyboard.press('Escape');
  await kbPage.waitForTimeout(80);
  const closed = await kbPage.evaluate((id) => ({
    expanded: document.querySelector(`button[aria-controls="${id}"]`).getAttribute('aria-expanded'),
    focusOnToggle: document.activeElement === document.querySelector(`button[aria-controls="${id}"]`),
  }), menuId);
  if (closed.expanded !== 'false' || !closed.focusOnToggle) issue('keyboard-escape-failed', { menuId, label, closed });
}
const notfallItems = await kbPage.evaluate(() => Array.from(document.querySelectorAll('#notfall-menu .dropdown-item')).map((el) => el.textContent.trim()));
if (!notfallItems.includes('Tierärztlicher Notdienst') || !notfallItems.includes('Hund im Auto bei Hitze') || !notfallItems.includes('Wildkatzenbaby gefunden?')) issue('desktop-notfall-items-missing', notfallItems);
await kbContext.close();

await browser.close();

const report = {
  checkedStates: 7,
  failures: failures.length,
  failuresByState: failures,
  screenshots,
};

await fs.writeFile(path.join(outDir, 'report.json'), JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));

if (failures.length) process.exitCode = 1;
