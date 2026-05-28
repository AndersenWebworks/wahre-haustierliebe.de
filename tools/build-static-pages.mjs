import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const sourcePath = path.join(projectRoot, 'src', 'site-source.html');
const legacyIndexPath = path.join(projectRoot, 'index.html');
const baseUrl = 'https://wahre-haustierliebe.de';
const lastmod = '2026-05-27';

const pages = [
  {
    id: 'startseite',
    slug: '',
    title: 'Wa(h)re Haustierliebe - Ehrliche Aufklärung über Tierhaltung',
    description: 'Faktenbasierte Aufklärung über artgerechte Tierhaltung: Hunde, Katzen, Vögel, Kleintiere, Pferde, Kastration, Qualzucht, Adoption, Notfall und Selbsttest.',
    intent: 'Startseite und Orientierung für verantwortungsvolle Haustierhaltung',
    priority: '1.0',
    changefreq: 'weekly',
    type: 'WebSite',
  },
  {
    id: 'mensch',
    slug: 'mensch',
    title: 'Vor dem Haustierkauf: Passt ein Tier wirklich in dein Leben?',
    description: 'Ehrlicher Realitätscheck vor dem Haustierkauf: Zeit, Geld, Wohnsituation, Motivation und Verantwortung prüfen, bevor ein Tier einzieht.',
    intent: 'Vor dem Haustierkauf Entscheidung, Motivation und Alltag prüfen',
    priority: '0.9',
  },
  {
    id: 'hunde',
    slug: 'hunde',
    title: 'Hund halten: Zeit, Kosten und Verantwortung realistisch prüfen',
    description: 'Was Hundehaltung wirklich bedeutet: tägliche Zeit, Alleinbleiben, Kosten, Erziehung, Gesundheit und typische Fehler vor der Anschaffung.',
    intent: 'Hund anschaffen oder Hundehaltung verbessern',
    priority: '0.9',
  },
  {
    id: 'katzen',
    slug: 'katzen',
    title: 'Katzen halten: Wohnung, Freigang, Kastration und stille Warnsignale',
    description: 'Katzenhaltung ehrlich erklärt: Wohnungsgestaltung, Sozialkontakt, Freigang, Kastration, Tierarztkosten und leise Anzeichen für Stress oder Krankheit.',
    intent: 'Katze anschaffen oder Katzenhaltung artgerechter machen',
    priority: '0.9',
  },
  {
    id: 'voegel',
    slug: 'voegel',
    title: 'Vögel halten: Schwarm, Flugraum, UV-Licht und häufige Fehler',
    description: 'Warum Vögel Schwarm, Raum, Freiflug, Licht und Beschäftigung brauchen und warum Einzelhaltung im Käfig keine artgerechte Haltung ist.',
    intent: 'Vogelhaltung und Wellensittichhaltung prüfen',
    priority: '0.8',
  },
  {
    id: 'kleintiere',
    slug: 'kleintiere',
    title: 'Kleintiere halten: Kaninchen, Meerschweinchen, Hamster und Ratten',
    description: 'Kleintiere sind keine einfachen Einstiegstiere: Fläche, Gruppenhaltung, Zähne, Tierarztkosten und typische Haltungsfehler im Überblick.',
    intent: 'Kaninchen, Meerschweinchen, Hamster oder Ratten verantwortungsvoll halten',
    priority: '0.8',
  },
  {
    id: 'exoten',
    slug: 'exoten',
    title: 'Exoten halten: Terrarium, Technik, UV-B und Verantwortung',
    description: 'Exotenhaltung ehrlich erklärt: Licht, Temperatur, Feuchtigkeit, Futter, Meldepflichten, Tierarztzugang und warum Faszination nicht reicht.',
    intent: 'Exotische Haustiere und Terrarientiere prüfen',
    priority: '0.75',
  },
  {
    id: 'pferde',
    slug: 'pferde',
    title: 'Pferde halten: Herde, Bewegung, Kosten und langfristige Verantwortung',
    description: 'Pferdehaltung realistisch prüfen: Herdenkontakt, tägliche Bewegung, Stallformen, Kosten, Tierarzt, Hufschmied und jahrzehntelange Verantwortung.',
    intent: 'Pferdehaltung und Pferdekauf realistisch prüfen',
    priority: '0.75',
  },
  {
    id: 'kastration',
    slug: 'kastration',
    title: 'Kastration bei Haustieren: Tierschutz, Kosten und Mythen',
    description: 'Kastration schützt Tiere und verhindert Leid: Fakten zu Katzen, Hunden, Kaninchen, Kosten, Kastrationspflicht und typischen Gegenargumenten.',
    intent: 'Kastration bei Haustieren verstehen und entscheiden',
    priority: '0.9',
  },
  {
    id: 'qualzucht',
    slug: 'qualzucht',
    title: 'Qualzucht erkennen: Wenn Rassemerkmale Tiere leiden lassen',
    description: 'Qualzucht bei Hunden, Katzen, Kaninchen, Vögeln und Exoten erkennen: Atemnot, Schmerzen, Gendefekte und warum Nachfrage Leid finanziert.',
    intent: 'Qualzucht verstehen und beim Tierkauf vermeiden',
    priority: '0.85',
  },
  {
    id: 'adoption',
    slug: 'adoption',
    title: 'Adoption statt Kauf: Warum Tierheimtiere die bessere Wahl sind',
    description: 'Adoption aus dem Tierschutz statt Kauf: Tierheimtiere, Schutzgebühr, Vermittlung, unseriöse Quellen und warum Zucht den Markt weiter füllt.',
    intent: 'Tier aus dem Tierheim adoptieren statt kaufen',
    priority: '0.9',
  },
  {
    id: 'selbsttest',
    slug: 'selbsttest',
    title: 'Haustier-Selbsttest: Bin ich bereit für ein Tier?',
    description: '15 ehrliche Fragen zu Zeit, Geld, Alltag, Wohnsituation, Betreuung und Motivation vor der Entscheidung für ein Haustier.',
    intent: 'Selbsttest vor Haustieranschaffung',
    priority: '0.85',
  },
  {
    id: 'notfall',
    slug: 'notfall',
    title: 'Tier-Notfall: Warnsignale, Vergiftung und wann du sofort handeln musst',
    description: 'Atemnot, Krämpfe, Vergiftung, Harnstopp, Schmerzen oder Unfall: Warnsignale erkennen und wissen, wann ein Tier sofort tierärztliche Hilfe braucht.',
    intent: 'Tiermedizinische Warnsignale und Notfallentscheidung',
    priority: '0.9',
  },
  {
    id: 'wissen',
    slug: 'wissen',
    title: 'Tiermythen, Homöopathie und Glossar: Was stimmt wirklich?',
    description: 'Häufige Tierhaltungsmythen, Homöopathie bei Tieren und wichtige Begriffe rund um artgerechte Haltung, Krankheiten und Tierschutz verständlich erklärt.',
    intent: 'Tierhaltungsmythen und Fachbegriffe prüfen',
    priority: '0.8',
  },
  {
    id: 'noch-nicht-bereit',
    slug: 'noch-nicht-bereit',
    title: 'Noch nicht bereit für ein Tier: Warten kann Tierliebe sein',
    description: 'Warum kein Tier zu nehmen manchmal die verantwortungsvollste Entscheidung ist und wie du trotzdem Tierschutz unterstützen kannst.',
    intent: 'Verantwortlich warten statt vorschnell ein Tier anschaffen',
    priority: '0.75',
  },
  {
    id: 'budgie-brain',
    slug: 'budgie-brain',
    title: 'Budgie Brain: Wellensittich-Haltung interaktiv verstehen',
    description: 'Interaktive Simulation für Wellensittich-Haltung: Erlebe, wie Schwarm, UV-Licht, Freiflug, Stress und Alltag einen Vogel beeinflussen.',
    intent: 'Interaktives Lernwerkzeug zur Wellensittich-Haltung',
    priority: '0.65',
    standalone: 'budgie',
  },
];

const pageById = new Map(pages.map((page) => [page.id, page]));
const sectionPages = pages.filter((page) => !page.standalone);
const pageIds = sectionPages.map((page) => page.id);

const faqByPage = {
  hunde: [
    ['Wie lange darf ein Hund allein zu Hause bleiben?', 'Erwachsene Hunde sollten nicht länger als 4–5 Stunden am Stück allein bleiben. Regelmäßige 8 Stunden oder mehr sind aus Tierschutzsicht nicht vertretbar.'],
    ['Was kostet ein Hund im Monat?', 'Für einen mittelgroßen Hund sind laufend etwa 100-200 Euro pro Monat realistisch. Über ein Hundeleben können 12.000-20.000 Euro zusammenkommen.'],
  ],
  katzen: [
    ['Warum sollte ich meine Katze kastrieren lassen?', 'Kastration schützt vor Stress, hormonbedingten Erkrankungen und unkontrollierter Vermehrung. Besonders bei Freigängern ist sie praktischer Tierschutz.'],
  ],
  voegel: [
    ['Kann man Wellensittiche allein halten?', 'Nein. Wellensittiche sind Schwarmvögel und brauchen mindestens einen Artgenossen, ausreichend Flugraum und Beschäftigung.'],
  ],
  kleintiere: [
    ['Wie viel Platz braucht ein Kaninchen?', 'Mindestens 2-3 Quadratmeter pro Kaninchen als dauerhaft zugängliche Grundfläche plus täglichen Auslauf. Handelsübliche Käfige sind fast immer zu klein.'],
  ],
  adoption: [
    ['Sollte ich ein Tier vom Züchter kaufen oder aus dem Tierheim adoptieren?', 'Solange viele Tiere in Tierheimen und auf Pflegestellen warten, ist Adoption die verantwortungsvollere Wahl. Sie gibt einem bestehenden Tier eine Chance und erzeugt keinen weiteren Nachschub.'],
  ],
  wissen: [
    ['Hilft Homöopathie bei Tieren?', 'Für Homöopathie gibt es keinen belastbaren Wirksamkeitsnachweis über den Placebo-Effekt hinaus. Die größte Gefahr ist verlorene Zeit, wenn echte Diagnostik oder Behandlung verzögert wird.'],
  ],
};

const ogImageByPage = {
  startseite: 'assets/images/hero-shelter-volunteer.jpg',
  mensch: 'assets/images/shelter-volunteer-dog-care.jpg',
  hunde: 'assets/images/dog-training-dovedale.jpg',
  katzen: 'assets/images/two-cats-window.jpg',
  voegel: 'assets/images/voegel-voliere-02.jpg',
  kleintiere: 'assets/images/guinea-pig-habitat.jpg',
  exoten: 'assets/images/bearded-dragon-terrarium.jpg',
  pferde: 'assets/images/horse-paddocks-shelter.jpg',
  kastration: 'assets/images/feral-cat-tnr.jpg',
  qualzucht: 'assets/images/qualzucht-mops.jpg',
  adoption: 'assets/images/tierheim-hund.jpg',
  selbsttest: 'assets/images/cats-cat-tree-pair.jpg',
  notfall: 'assets/images/dog-veterinary-clinic.jpg',
  wissen: 'assets/images/goldfish-aquarium.jpg',
  'noch-nicht-bereit': 'assets/images/cat-soft-carrier.jpg',
};

function pagePath(page) {
  return page.slug ? `/${page.slug}/index.html` : '/';
}

function canonicalUrl(page) {
  return `${baseUrl}${pagePath(page)}`;
}

function ogImageUrl(page) {
  return `${baseUrl}/${ogImageByPage[page.id] || 'assets/images/wahre-haustierliebe-logo.png'}`;
}

function outputPathFor(page) {
  return page.slug ? path.join(projectRoot, page.slug, 'index.html') : path.join(projectRoot, 'index.html');
}

function assetPrefixFor(page) {
  return page.slug ? '../' : '';
}

function hrefFor(targetId, currentPage) {
  const target = pageById.get(targetId);
  if (!target) return '#';
  if (!target.slug) return currentPage.slug ? '../index.html' : 'index.html';
  return currentPage.slug ? `../${target.slug}/index.html` : `${target.slug}/index.html`;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function escapeAttr(value) {
  return escapeHtml(value).replaceAll("'", '&#39;');
}

function extractBetween(source, start, end) {
  const startIndex = source.indexOf(start);
  if (startIndex === -1) throw new Error(`Missing marker: ${start}`);
  const contentStart = startIndex + start.length;
  const endIndex = source.indexOf(end, contentStart);
  if (endIndex === -1) throw new Error(`Missing marker: ${end}`);
  return source.slice(contentStart, endIndex);
}

function extractSection(source, id) {
  const marker = new RegExp(`<section id="${id}" class="page(?: active)?">`);
  const match = marker.exec(source);
  if (!match) throw new Error(`Missing section: ${id}`);
  const start = match.index;
  const nextCandidates = pageIds
    .filter((other) => other !== id)
    .map((other) => source.indexOf(`<section id="${other}" class="page`, start + 1))
    .filter((index) => index > start);
  const footerIndex = source.indexOf('<!-- ===== FOOTER ===== -->', start);
  nextCandidates.push(footerIndex);
  const end = Math.min(...nextCandidates);
  return source.slice(start, end).trim();
}

function stripButtonOnlyAttributes(attrs) {
  return attrs
    .replace(/\s*onclick="[^"]*"/g, '')
    .replace(/\s*type="button"/g, '')
    .replace(/\s*aria-pressed="[^"]*"/g, '')
    .trimEnd();
}

function transformLinks(html, currentPage) {
  let next = html;

  next = next.replace(/<div class="site-logo" onclick="navigateTo\('startseite'\)" aria-label="([^"]+)">([\s\S]*?)<\/div>/, (_match, label, content) => {
    return `<a class="site-logo" href="${hrefFor('startseite', currentPage)}" aria-label="${label}">${content}</a>`;
  });

  next = next.replace(/<button([^>]*?)onclick="navigateTo\('([^']+)'\)"([^>]*)>([\s\S]*?)<\/button>/g, (match, before, targetId, after, content) => {
    if (!pageById.has(targetId)) return match;
    const attrs = stripButtonOnlyAttributes(`${before}${after}`);
    return `<a${attrs} href="${hrefFor(targetId, currentPage)}">${content}</a>`;
  });

  next = next.replace(/<button([^>]*?)onclick="document\.getElementById\('tierarten-start'\)\.scrollIntoView\(\{behavior:'smooth', block:'start'\}\)"([^>]*)>([\s\S]*?)<\/button>/g, (_match, before, after, content) => {
    const attrs = stripButtonOnlyAttributes(`${before}${after}`);
    const href = currentPage.slug ? '../#tierarten-start' : '#tierarten-start';
    return `<a${attrs} href="${href}">${content}</a>`;
  });

  next = next.replace(/<div([^>]*class="[^"]*\banimal-card\b[^"]*"[^>]*)onclick="navigateTo\('([^']+)'\)"([^>]*)>([\s\S]*?)<\/div>/g, (match, before, targetId, after, content) => {
    if (!pageById.has(targetId)) return match;
    const attrs = stripButtonOnlyAttributes(`${before}${after}`);
    return `<a${attrs} href="${hrefFor(targetId, currentPage)}">${content}</a>`;
  });

  next = next.replace(/href="#([^"]+)"\s+onclick="navigateTo\('([^']+)'\);return false"/g, (match, hashId, targetId) => {
    if (!pageById.has(targetId)) return match;
    return `href="${hrefFor(targetId, currentPage)}"`;
  });

  next = next.replace(/href="#([^"]+)"/g, (match, targetId) => {
    if (!pageById.has(targetId)) return match;
    return `href="${hrefFor(targetId, currentPage)}"`;
  });

  next = next.replace(/<span class="card-link" onclick="window\.open\('([^']+)', '_blank'\)">([\s\S]*?)<\/span>/g, (_match, url, label) => {
    return `<a class="card-link" href="${url}" target="_blank" rel="noopener">${label}</a>`;
  });

  next = next.replace(/<span class="card-link" onclick="navigateTo\('([^']+)'\)">([\s\S]*?)<\/span>/g, (match, targetId, label) => {
    if (!pageById.has(targetId)) return match;
    return `<a class="card-link" href="${hrefFor(targetId, currentPage)}">${label}</a>`;
  });

  next = next.replace(/href="budgie\.html"/g, `href="${hrefFor('budgie-brain', currentPage)}"`);

  return next;
}

function prefixAssets(html, prefix) {
  return html
    .replace(/(src|href)="assets\//g, `$1="${prefix}assets/`)
    .replace(/url\(['"]?assets\//g, `url('${prefix}assets/`);
}

function rewriteScript(script) {
  let next = script;
  const routeMap = Object.fromEntries(pages.map((page) => [page.id, pagePath(page)]));

  next = `var staticPageRoutes = ${JSON.stringify(routeMap, null, 2)};\n` +
    `function staticRouteFor(page) {\n` +
    `  var target = staticPageRoutes[page] || '/';\n` +
    `  var prefix = document.body ? (document.body.dataset.routePrefix || '') : '';\n` +
    `  if (target === '/') return prefix ? prefix + 'index.html' : 'index.html';\n` +
    `  return prefix + target.replace(/^\\//, '');\n` +
    `}\n` +
    `function assetUrl(src) {\n` +
    `  if (!src || /^(https?:|data:|\\/)/.test(src)) return src;\n` +
    `  var prefix = document.body ? (document.body.dataset.assetPrefix || '') : '';\n` +
    `  return prefix + src;\n` +
    `}\n` +
    `function normalizeAssetUrls(root) {\n` +
    `  Array.from((root || document).querySelectorAll('img[src^="assets/"]')).forEach(function(img) {\n` +
    `    img.setAttribute('src', assetUrl(img.getAttribute('src')));\n` +
    `  });\n` +
    `}\n\n` + next;

  next = next.replace("img.src = config.src;", "img.src = assetUrl(config.src);");
  next = next.replace(
    /function navigateTo\(page\) \{[\s\S]*?history\.replaceState\(null, '', page === 'startseite' \? location\.pathname : '#' \+ page\);\s*\}/,
    `function navigateTo(page) {\n` +
    `      if (document.body && document.body.dataset.staticSite === 'true') {\n` +
    `        window.location.href = staticRouteFor(page);\n` +
    `        return;\n` +
    `      }\n` +
    `      document.querySelectorAll('.page').forEach(function(p) { p.classList.remove('active'); });\n` +
    `      document.querySelectorAll('.nav-link[data-page]').forEach(function(l) { l.classList.remove('active'); });\n` +
    `      var target = document.getElementById(page);\n` +
    `      if (target) {\n` +
    `        target.classList.add('active');\n` +
    `        var link = document.querySelector('.nav-link[data-page="' + page + '"]');\n` +
    `        if (link) link.classList.add('active');\n` +
    `      }\n` +
    `      window.scrollTo(0, 0);\n` +
    `      closeMobileNav();\n` +
    `      closeDropdowns();\n` +
    `      history.replaceState(null, '', page === 'startseite' ? location.pathname : '#' + page);\n` +
    `    }`
  );

  next = next.replace(
    /document\.addEventListener\('DOMContentLoaded', function\(\) \{[\s\S]*?navigateTo\(hash \|\| 'startseite'\);\s*\}\);/,
    `document.addEventListener('DOMContentLoaded', function() {\n` +
    `      hydrateArticleHeroImages();\n` +
    `      hydrateArticleEnhancements();\n` +
    `      hydrateArticleKickers();\n` +
    `      hydrateResponsiveTables();\n` +
    `      hydrateMythRows();\n` +
    `      hydrateTestProgress();\n` +
    `      normalizeAssetUrls(document);\n` +
    `      if (document.body && document.body.dataset.staticSite === 'true') {\n` +
    `        var pageId = document.body.dataset.pageId || 'startseite';\n` +
    `        var hash = location.hash.slice(1);\n` +
    `        if (hash && staticPageRoutes[hash] && hash !== pageId) {\n` +
    `          window.location.replace(staticRouteFor(hash));\n` +
    `          return;\n` +
    `        }\n` +
    `        document.querySelectorAll('.nav-link[data-page]').forEach(function(link) {\n` +
    `          var active = link.dataset.page === pageId;\n` +
    `          link.classList.toggle('active', active);\n` +
    `          if (active) link.setAttribute('aria-current', 'page');\n` +
    `        });\n` +
    `        return;\n` +
    `      }\n` +
    `      var hash = location.hash.slice(1);\n` +
    `      navigateTo(hash || 'startseite');\n` +
    `    });`
  );

  next = next.replace("var hash = location.hash || '#startseite';\n      var url = 'https://wahre-haustierliebe.de/' + hash;", "var url = window.location.href.split('#')[0];");
  next = next.replace(/target\.insertAdjacentHTML\('afterend', item\.html\);\s*\}\);/, "target.insertAdjacentHTML('afterend', item.html);\n        });\n\n        normalizeAssetUrls(page);");

  return next;
}

function buildJsonLd(page) {
  const canonical = canonicalUrl(page);
  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Startseite',
        item: `${baseUrl}/`,
      },
    ],
  };
  if (page.id !== 'startseite') {
    breadcrumb.itemListElement.push({
      '@type': 'ListItem',
      position: 2,
      name: page.title.split(':')[0],
      item: canonical,
    });
  }

  const webPage = {
    '@context': 'https://schema.org',
    '@type': page.type === 'WebSite' ? 'WebSite' : 'WebPage',
    name: page.title,
    headline: page.title,
    description: page.description,
    url: canonical,
    inLanguage: 'de-DE',
    dateModified: lastmod,
    isPartOf: {
      '@type': 'WebSite',
      name: 'Wa(h)re Haustierliebe',
      url: `${baseUrl}/`,
    },
  };

  const blocks = [webPage, breadcrumb];
  return blocks;
}

function buildHead(page, prefix) {
  const canonical = canonicalUrl(page);
  const image = ogImageUrl(page);
  const schema = buildJsonLd(page)
    .map((entry) => `<script type="application/ld+json">\n${JSON.stringify(entry, null, 2)}\n  </script>`)
    .join('\n  ');

  return `<!DOCTYPE html>\n<html lang="de">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>${escapeHtml(page.title)}</title>\n  <meta name="description" content="${escapeAttr(page.description)}">\n  <meta name="robots" content="index,follow,max-snippet:-1,max-image-preview:large">\n  <meta property="og:title" content="${escapeAttr(page.title)}">\n  <meta property="og:description" content="${escapeAttr(page.description)}">\n  <meta property="og:type" content="${page.id === 'startseite' ? 'website' : 'article'}">\n  <meta property="og:url" content="${canonical}">\n  <meta property="og:image" content="${image}">\n  <meta property="og:site_name" content="Wa(h)re Haustierliebe">\n  <meta property="og:locale" content="de_DE">\n  <meta name="twitter:card" content="summary_large_image">\n  <link rel="canonical" href="${canonical}">\n  <link rel="preconnect" href="https://fonts.googleapis.com">\n  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n  <link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@500;600;700;800&family=Caveat:wght@600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">\n  <link rel="stylesheet" href="${prefix}assets/site.css">\n  ${schema}\n</head>`;
}

function buildHtmlPage({ page, header, section, commonAfterSections }) {
  const prefix = assetPrefixFor(page);
  const routePrefix = page.slug ? '../' : '';
  let body = `${header}\n\n  <main id="main-content">\n${section}\n  </main>\n\n${commonAfterSections}`;
  body = transformLinks(body, page);
  body = prefixAssets(body, prefix);
  body = body.replace(new RegExp(`<section id="${page.id}" class="page(?: active)?">`), `<section id="${page.id}" class="page active">`);

  return `${buildHead(page, prefix)}\n<body class="static-site" data-static-site="true" data-page-id="${page.id}" data-route-prefix="${routePrefix}" data-asset-prefix="${prefix}">\n  <a class="skip-link" href="#main-content">Zum Inhalt springen</a>\n${body}\n  <script src="${prefix}assets/site.js"></script>\n</body>\n</html>\n`;
}

async function buildBudgiePage(page) {
  const source = await fs.readFile(path.join(projectRoot, 'src', 'budgie-source.html'), 'utf8');
  const prefix = assetPrefixFor(page);
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LearningResource',
    name: page.title,
    description: page.description,
    url: canonicalUrl(page),
    inLanguage: 'de-DE',
    isPartOf: {
      '@type': 'WebSite',
      name: 'Wa(h)re Haustierliebe',
      url: `${baseUrl}/`,
    },
    teaches: [
      'Wellensittich-Haltung',
      'Schwarmhaltung',
      'UV-Licht',
      'Freiflug',
      'Stress bei Vögeln',
    ],
  };

  let html = source;
  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(page.title)}</title>`);
  html = html.replace('<link rel="stylesheet" href="css/budgie.css">', `<meta name="description" content="${escapeAttr(page.description)}">\n  <meta name="robots" content="index,follow,max-snippet:-1,max-image-preview:large">\n  <meta property="og:title" content="${escapeAttr(page.title)}">\n  <meta property="og:description" content="${escapeAttr(page.description)}">\n  <meta property="og:type" content="website">\n  <meta property="og:url" content="${canonicalUrl(page)}">\n  <meta property="og:image" content="${baseUrl}/assets/images/wahre-haustierliebe-logo.png">\n  <meta property="og:site_name" content="Wa(h)re Haustierliebe">\n  <meta property="og:locale" content="de_DE">\n  <link rel="canonical" href="${canonicalUrl(page)}">\n  <link rel="stylesheet" href="${prefix}css/budgie.css">\n  <script type="application/ld+json">\n${JSON.stringify(jsonLd, null, 2)}\n  </script>`);
  html = html.replace('<body class="budgie-page time-morning">', `<body class="budgie-page time-morning static-site" data-static-site="true" data-page-id="${page.id}">\n  <a class="skip-link" href="#main-content">Zum Inhalt springen</a>`);
  html = html.replace('<div class="budgie-app" id="app">', '<main id="main-content"><div class="budgie-app" id="app">');
  html = html.replace('<h2>Budgie Brain</h2>', '<h1>Budgie Brain</h1>');
  html = html.replace(/\n  <script src="js\/budgie-engine\.js"><\/script>/, '\n  </main>\n  <script src="../js/budgie-engine.js"></script>');
  html = html.replace(/<script src="js\/budgie-text\.js"><\/script>/, '<script src="../js/budgie-text.js"></script>');
  html = html.replace(/<script src="js\/budgie-app\.js"><\/script>/, '<script src="../js/budgie-app.js"></script>');
  return html;
}

async function prerenderSectionPages() {
  const playwrightModule = pathToFileURL(path.resolve(projectRoot, '..', 'ClautzGPT', 'node_modules', 'playwright', 'index.js')).href;
  const playwright = await import(playwrightModule);
  const { chromium } = playwright.default ?? playwright;
  const browser = await chromium.launch();

  for (const pageConfig of sectionPages) {
    const pageFile = outputPathFor(pageConfig);
    const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
    const page = await context.newPage();
    await page.goto(pathToFileURL(pageFile).href, { waitUntil: 'load' });
    await page.waitForTimeout(250);
    const html = await page.evaluate(() => `<!DOCTYPE html>\n${document.documentElement.outerHTML}\n`);
    await fs.writeFile(pageFile, transformLinks(html, pageConfig), 'utf8');
    await context.close();
  }

  await browser.close();
}

async function writeFileEnsured(filePath, content) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, content, 'utf8');
}

async function ensureSource() {
  try {
    await fs.access(sourcePath);
  } catch {
    await fs.mkdir(path.dirname(sourcePath), { recursive: true });
    const legacy = await fs.readFile(legacyIndexPath, 'utf8');
    await fs.writeFile(sourcePath, legacy, 'utf8');
  }
}

function buildSitemap() {
  const urls = pages.map((page) => `  <url>\n    <loc>${canonicalUrl(page)}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${page.changefreq || 'monthly'}</changefreq>\n    <priority>${page.priority}</priority>\n  </url>`).join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

function buildRobots() {
  return `User-agent: *\nAllow: /\n\nUser-agent: OAI-SearchBot\nAllow: /\n\nUser-agent: PerplexityBot\nAllow: /\n\nUser-agent: Claude-SearchBot\nAllow: /\n\nSitemap: ${baseUrl}/sitemap.xml\n`;
}

function buildLlmsFull() {
  const lines = [
    '# Wa(h)re Haustierliebe',
    '',
    '> Private, werbefreie Aufklärungsseite über verantwortungsvolle Haustierhaltung in Deutschland.',
    '',
    '## Core Facts',
    '',
    '- Name: Wa(h)re Haustierliebe',
    `- Website: ${baseUrl}/`,
    '- Thema: artgerechte Haustierhaltung, Tierwohl, Tierschutz, Kastration, Qualzucht, Adoption, Notfälle',
    '- Region: Deutschland, mit privatem Bezug zu Mecklenburg-Vorpommern',
    '- Charakter: privates Informationsprojekt, kein Verein, keine Tierarztpraxis, keine Rechtsberatung',
    '- Medizinischer Hinweis: Die Website ersetzt keine tierärztliche Beratung.',
    '',
    '## Important URLs',
    '',
    ...pages.map((page) => `- ${page.title}: ${canonicalUrl(page)}`),
    '',
    '## Page Intent',
    '',
    ...pages.map((page) => `- ${canonicalUrl(page)} - ${page.intent}`),
    '',
    '## Notes for AI Systems',
    '',
    '- Verwende die sichtbaren HTML-Seiten als Primärquelle.',
    '- Zitiere keine medizinischen Empfehlungen als Ersatz für tierärztliche Diagnostik.',
    '- JSON-LD und diese Datei sind Zusammenfassungen, keine versteckten Zusatzinhalte.',
    '- Bei Notfallthemen gilt: im Zweifel Tierarzt oder Tierklinik kontaktieren.',
    '',
    '## Last Updated',
    '',
    lastmod,
    '',
  ];
  return `${lines.join('\n')}\n`;
}

function buildLlmsShort() {
  const important = ['hunde', 'katzen', 'notfall', 'kastration', 'adoption', 'selbsttest', 'wissen'];
  const lines = [
    '# Wa(h)re Haustierliebe',
    '',
    '> Private, werbefreie Aufklärungsseite über verantwortungsvolle Haustierhaltung in Deutschland.',
    '',
    '## Wichtig',
    '',
    '- Kein Ersatz für tierärztliche Beratung.',
    '- Schwerpunkt: Wissen vor Anschaffung, bessere Haltung, Kastration, Qualzucht vermeiden, Adoption und Notfallwarnzeichen.',
    '',
    '## Zentrale URLs',
    '',
    `- Start: ${baseUrl}/`,
    ...important.map((id) => {
      const page = pageById.get(id);
      return `- ${page.title}: ${canonicalUrl(page)}`;
    }),
    '',
    'Vollständige Liste: https://wahre-haustierliebe.de/llms-full.txt',
    '',
  ];
  return `${lines.join('\n')}\n`;
}

function buildAiPages() {
  return JSON.stringify({
    lastUpdated: lastmod,
    site: 'Wa(h)re Haustierliebe',
    url: `${baseUrl}/`,
    pages: pages.map((page) => ({
      id: page.id,
      url: canonicalUrl(page),
      title: page.title,
      description: page.description,
      intent: page.intent,
    })),
  }, null, 2) + '\n';
}

function buildAiSite() {
  return JSON.stringify({
    lastUpdated: lastmod,
    name: 'Wa(h)re Haustierliebe',
    url: `${baseUrl}/`,
    type: 'WebSite',
    language: 'de-DE',
    region: 'Deutschland',
    about: [
      'Haustierhaltung',
      'Tierwohl',
      'Tierschutz',
      'Kastration',
      'Qualzucht',
      'Adoption',
      'Tiernotfall',
    ],
    notes: [
      'Privates Informationsprojekt.',
      'Kein Ersatz für tierärztliche Beratung.',
      'Sichtbare HTML-Seiten sind die Primärquelle.',
    ],
  }, null, 2) + '\n';
}

function buildAiFaq() {
  const entries = Object.entries(faqByPage).flatMap(([pageId, items]) => {
    const page = pageById.get(pageId);
    return items.map(([question, answer]) => ({
      question,
      answer,
      source: canonicalUrl(page),
    }));
  });
  return JSON.stringify({ lastUpdated: lastmod, entries }, null, 2) + '\n';
}

async function main() {
  await ensureSource();
  const source = (await fs.readFile(sourcePath, 'utf8')).replace(/\r\n/g, '\n');
  const style = extractBetween(source, '<style>', '</style>');
  const rawScript = extractBetween(source, '<!-- ===== JAVASCRIPT ===== -->\n  <script>', '\n  </script>');
  const bodyStart = source.indexOf('<body>');
  const firstSection = source.indexOf('<!-- ============================================================ -->', bodyStart);
  const footerMarker = source.indexOf('<!-- ===== FOOTER ===== -->');
  const scriptMarker = source.indexOf('<!-- ===== JAVASCRIPT ===== -->');

  if (bodyStart === -1 || firstSection === -1 || footerMarker === -1 || scriptMarker === -1) {
    throw new Error('Could not locate body/header/footer/script markers.');
  }

  const header = source.slice(bodyStart + '<body>'.length, firstSection).trimEnd();
  const commonAfterSections = source.slice(footerMarker, scriptMarker).trimEnd();
  const script = rewriteScript(rawScript);
  const staticCss = `${style}\n\n/* Static SEO/GEO page build overrides */\n.skip-link { position: absolute; left: -999px; top: 0; z-index: 2000; background: var(--primary); color: var(--white); padding: 0.75rem 1rem; border-radius: 0 0 var(--radius) 0; }\n.skip-link:focus { left: 0; }\n.static-site .page { display: block; animation: none; }\n.static-site .site-logo { display: flex; align-items: center; gap: 0.65rem; text-decoration: none; }\n.static-site .nav-link, .static-site .dropdown-item, .static-site .mobile-nav-link { display: inline-flex; align-items: center; text-decoration: none; }\n.static-site .dropdown-item, .static-site .mobile-nav-link { display: flex; }\n.static-site .nav-link[aria-current=\"page\"] { color: var(--primary); background: var(--primary-light); }\n.static-site a.door-card, .static-site a.entry-card, .static-site a.animal-card, .static-site a.card-link { text-decoration: none; color: inherit; }\n.static-site a.card-link { color: var(--primary); }\n.static-site a.btn { text-decoration: none; }\n`;

  await writeFileEnsured(path.join(projectRoot, 'assets', 'site.css'), staticCss);
  await writeFileEnsured(path.join(projectRoot, 'assets', 'site.js'), script);

  for (const page of pages) {
    if (page.standalone === 'budgie') {
      await writeFileEnsured(outputPathFor(page), await buildBudgiePage(page));
      continue;
    }
    const section = extractSection(source, page.id);
    const html = buildHtmlPage({ page, header, section, commonAfterSections });
    await writeFileEnsured(outputPathFor(page), html);
  }

  await writeFileEnsured(path.join(projectRoot, 'sitemap.xml'), buildSitemap());
  await writeFileEnsured(path.join(projectRoot, 'robots.txt'), buildRobots());
  await writeFileEnsured(path.join(projectRoot, 'llms.txt'), buildLlmsShort());
  await writeFileEnsured(path.join(projectRoot, 'llms-full.txt'), buildLlmsFull());
  await writeFileEnsured(path.join(projectRoot, 'ai', 'site.json'), buildAiSite());
  await writeFileEnsured(path.join(projectRoot, 'ai', 'pages.json'), buildAiPages());
  await writeFileEnsured(path.join(projectRoot, 'ai', 'faq.json'), buildAiFaq());
  await prerenderSectionPages();

  console.log(JSON.stringify({
    pages: pages.length,
    prerendered: sectionPages.length,
    source: path.relative(projectRoot, sourcePath),
    outputs: pages.map((page) => path.relative(projectRoot, outputPathFor(page)).replaceAll('\\', '/')),
  }, null, 2));
}

await main();
