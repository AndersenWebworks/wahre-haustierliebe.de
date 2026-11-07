// Prüft, dass jede Seite aus ai/pages.json (außer Impressum und Datenschutz) im Desktop-Menü und im Handymenü
// verlinkt ist, und zwar auf jeder gebauten Seite. Reine Textprüfung der gebauten HTML-Dateien.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const pages = JSON.parse(fs.readFileSync(path.join(root, 'ai', 'pages.json'), 'utf8')).pages;
const excluded = new Set(['impressum', 'datenschutz']);
const routeOf = (page) => page.url.replace('https://wahre-haustierliebe.de', '').replace(/index\.html$/, '') || '/';
const expected = pages.filter((page) => !excluded.has(page.id)).map(routeOf);

function resolve(href, fromRoute) {
  if (/^(https?:|mailto:|tel:)/.test(href)) return null;
  const base = new URL('https://x.test' + fromRoute);
  const url = new URL(href, base);
  return url.pathname.replace(/index\.html$/, '');
}

function section(html, startMarker, endMarker) {
  const a = html.indexOf(startMarker);
  const b = html.indexOf(endMarker, a);
  return a < 0 || b < 0 ? '' : html.slice(a, b);
}

const problems = [];
let checked = 0;
for (const page of pages) {
  const route = routeOf(page);
  const file = path.join(root, route === '/' ? '' : route.replace(/^\//, ''), 'index.html');
  if (!fs.existsSync(file)) { problems.push({ page: page.id, problem: 'Datei fehlt' }); continue; }
  const html = fs.readFileSync(file, 'utf8');
  const desktop = section(html, '<header class="site-header">', '</header>');
  const mobile = section(html, 'id="mobile-nav"', '<main');
  for (const [name, part] of [['Desktop', desktop], ['Handy', mobile]]) {
    const links = new Set(Array.from(part.matchAll(/href="([^"]+)"/g)).map((m) => resolve(m[1], route)).filter(Boolean));
    const missing = expected.filter((target) => !links.has(target));
    if (missing.length) problems.push({ page: page.id, menu: name, missing });
  }
  checked += 1;
}
console.log(JSON.stringify({ seiten: checked, erwartet: expected.length, probleme: problems.length, details: problems.slice(0, 5) }, null, 2));
if (problems.length) process.exitCode = 1;
