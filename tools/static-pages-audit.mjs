import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const baseUrl = 'https://wahre-haustierliebe.de';

const pages = [
  { id: 'startseite', file: 'index.html', canonical: `${baseUrl}/` },
  { id: 'impressum', file: 'impressum/index.html', canonical: `${baseUrl}/impressum/index.html` },
  { id: 'datenschutz', file: 'datenschutz/index.html', canonical: `${baseUrl}/datenschutz/index.html` },
  { id: 'kontakt', file: 'kontakt/index.html', canonical: `${baseUrl}/kontakt/index.html` },
  { id: 'mitmachen', file: 'mitmachen/index.html', canonical: `${baseUrl}/mitmachen/index.html` },
  { id: 'petitionen', file: 'petitionen/index.html', canonical: `${baseUrl}/petitionen/index.html` },
  { id: 'mensch', file: 'mensch/index.html', canonical: `${baseUrl}/mensch/index.html` },
  { id: 'hunde', file: 'hunde/index.html', canonical: `${baseUrl}/hunde/index.html` },
  { id: 'hund-im-buero', file: 'hunde/hund-im-buero/index.html', canonical: `${baseUrl}/hunde/hund-im-buero/index.html` },
  { id: 'hunde-soziale-beduerfnisse', file: 'hunde/soziale-beduerfnisse/index.html', canonical: `${baseUrl}/hunde/soziale-beduerfnisse/index.html` },
  { id: 'hunde-stadtfest-rummel', file: 'hunde/stadtfest-rummel/index.html', canonical: `${baseUrl}/hunde/stadtfest-rummel/index.html` },
  { id: 'hunde-garten-auslauf', file: 'hunde/garten-auslauf/index.html', canonical: `${baseUrl}/hunde/garten-auslauf/index.html` },
  { id: 'hunde-allein-zu-hause', file: 'hunde/allein-zu-hause/index.html', canonical: `${baseUrl}/hunde/allein-zu-hause/index.html` },
  { id: 'hunde-kosten', file: 'hunde/kosten/index.html', canonical: `${baseUrl}/hunde/kosten/index.html` },
  { id: 'hunde-kastration', file: 'hunde/kastration/index.html', canonical: `${baseUrl}/hunde/kastration/index.html` },
  { id: 'hunde-hofhaltung-und-zwinger', file: 'hunde/hofhaltung-und-zwinger/index.html', canonical: `${baseUrl}/hunde/hofhaltung-und-zwinger/index.html` },
  { id: 'hunde-gesundheit', file: 'hunde/gesundheit/index.html', canonical: `${baseUrl}/hunde/gesundheit/index.html` },
  { id: 'hunde-entscheidung', file: 'hunde/entscheidung/index.html', canonical: `${baseUrl}/hunde/entscheidung/index.html` },
  { id: 'hunde-abgabealter', file: 'hunde/abgabealter/index.html', canonical: `${baseUrl}/hunde/abgabealter/index.html` },
  { id: 'katzen', file: 'katzen/index.html', canonical: `${baseUrl}/katzen/index.html` },
  { id: 'katzen-sozialverhalten', file: 'katzen/sozialverhalten/index.html', canonical: `${baseUrl}/katzen/sozialverhalten/index.html` },
  { id: 'katzen-wohnungshaltung', file: 'katzen/wohnungshaltung/index.html', canonical: `${baseUrl}/katzen/wohnungshaltung/index.html` },
  { id: 'katzen-kastration', file: 'katzen/kastration/index.html', canonical: `${baseUrl}/katzen/kastration/index.html` },
  { id: 'katzen-stilles-leiden', file: 'katzen/stilles-leiden/index.html', canonical: `${baseUrl}/katzen/stilles-leiden/index.html` },
  { id: 'katzen-kosten', file: 'katzen/kosten/index.html', canonical: `${baseUrl}/katzen/kosten/index.html` },
  { id: 'katzen-streunerkatzen', file: 'katzen/streunerkatzen/index.html', canonical: `${baseUrl}/katzen/streunerkatzen/index.html` },
  { id: 'katzen-entscheidung', file: 'katzen/entscheidung/index.html', canonical: `${baseUrl}/katzen/entscheidung/index.html` },
  { id: 'voegel', file: 'voegel/index.html', canonical: `${baseUrl}/voegel/index.html` },
  { id: 'voegel-schwarmhaltung', file: 'voegel/schwarmhaltung/index.html', canonical: `${baseUrl}/voegel/schwarmhaltung/index.html` },
  { id: 'voegel-uv-licht', file: 'voegel/uv-licht/index.html', canonical: `${baseUrl}/voegel/uv-licht/index.html` },
  { id: 'voegel-kuechenluft-und-daempfe-sind-lebensgefahr', file: 'voegel/kuechenluft-teflon/index.html', canonical: `${baseUrl}/voegel/kuechenluft-teflon/index.html` },
  { id: 'voegel-freiflug-ist-nicht-optional', file: 'voegel/freiflug/index.html', canonical: `${baseUrl}/voegel/freiflug/index.html` },
  { id: 'voegel-partnerersatz', file: 'voegel/partnerersatz/index.html', canonical: `${baseUrl}/voegel/partnerersatz/index.html` },
  { id: 'voegel-ruhe-und-schlaf', file: 'voegel/ruhe-schlaf/index.html', canonical: `${baseUrl}/voegel/ruhe-schlaf/index.html` },
  { id: 'voegel-ernaehrung', file: 'voegel/ernaehrung/index.html', canonical: `${baseUrl}/voegel/ernaehrung/index.html` },
  { id: 'voegel-alltag-kosten-betreuung', file: 'voegel/alltag-kosten-betreuung/index.html', canonical: `${baseUrl}/voegel/alltag-kosten-betreuung/index.html` },
  { id: 'voegel-zucht-und-eier', file: 'voegel/zucht-eier/index.html', canonical: `${baseUrl}/voegel/zucht-eier/index.html` },
  { id: 'voegel-krankheit-erkennen', file: 'voegel/krankheit-erkennen/index.html', canonical: `${baseUrl}/voegel/krankheit-erkennen/index.html` },
  { id: 'voegel-qualzucht', file: 'voegel/qualzucht/index.html', canonical: `${baseUrl}/voegel/qualzucht/index.html` },
  { id: 'voegel-entscheidung', file: 'voegel/entscheidung/index.html', canonical: `${baseUrl}/voegel/entscheidung/index.html` },
  { id: 'kleintiere', file: 'kleintiere/index.html', canonical: `${baseUrl}/kleintiere/index.html` },
  { id: 'kleintiere-kaninchen', file: 'kleintiere/kaninchen/index.html', canonical: `${baseUrl}/kleintiere/kaninchen/index.html` },
  { id: 'kleintiere-meerschweinchen', file: 'kleintiere/meerschweinchen/index.html', canonical: `${baseUrl}/kleintiere/meerschweinchen/index.html` },
  { id: 'kleintiere-hamster', file: 'kleintiere/hamster/index.html', canonical: `${baseUrl}/kleintiere/hamster/index.html` },
  { id: 'kleintiere-ratten', file: 'kleintiere/ratten/index.html', canonical: `${baseUrl}/kleintiere/ratten/index.html` },
  { id: 'kleintiere-degus-und-chinchillas', file: 'kleintiere/degus-chinchillas/index.html', canonical: `${baseUrl}/kleintiere/degus-chinchillas/index.html` },
  { id: 'exoten', file: 'exoten/index.html', canonical: `${baseUrl}/exoten/index.html` },
  { id: 'exoten-reptilien', file: 'exoten/reptilien/index.html', canonical: `${baseUrl}/exoten/reptilien/index.html` },
  { id: 'exoten-schildkroeten', file: 'exoten/schildkroeten/index.html', canonical: `${baseUrl}/exoten/schildkroeten/index.html` },
  { id: 'exoten-fische', file: 'exoten/fische/index.html', canonical: `${baseUrl}/exoten/fische/index.html` },
  { id: 'pferde', file: 'pferde/index.html', canonical: `${baseUrl}/pferde/index.html` },
  { id: 'pferde-herde', file: 'pferde/herde/index.html', canonical: `${baseUrl}/pferde/herde/index.html` },
  { id: 'pferde-platzbedarf', file: 'pferde/platzbedarf/index.html', canonical: `${baseUrl}/pferde/platzbedarf/index.html` },
  { id: 'pferde-haltungsformen', file: 'pferde/haltungsformen/index.html', canonical: `${baseUrl}/pferde/haltungsformen/index.html` },
  { id: 'pferde-kosten', file: 'pferde/kosten/index.html', canonical: `${baseUrl}/pferde/kosten/index.html` },
  { id: 'pferde-reitbeteiligung', file: 'pferde/reitbeteiligung/index.html', canonical: `${baseUrl}/pferde/reitbeteiligung/index.html` },
  { id: 'pferde-entscheidung', file: 'pferde/entscheidung/index.html', canonical: `${baseUrl}/pferde/entscheidung/index.html` },
  { id: 'kastration', file: 'kastration/index.html', canonical: `${baseUrl}/kastration/index.html` },
  { id: 'qualzucht', file: 'qualzucht/index.html', canonical: `${baseUrl}/qualzucht/index.html` },
  { id: 'adoption', file: 'adoption/index.html', canonical: `${baseUrl}/adoption/index.html` },
  { id: 'selbsttest', file: 'selbsttest/index.html', canonical: `${baseUrl}/selbsttest/index.html` },
  { id: 'notfall', file: 'notfall/index.html', canonical: `${baseUrl}/notfall/index.html` },
  { id: 'tierarzt-notdienst', file: 'notfall/tierarzt-notdienst/index.html', canonical: `${baseUrl}/notfall/tierarzt-notdienst/index.html` },
  { id: 'wissen', file: 'wissen/index.html', canonical: `${baseUrl}/wissen/index.html` },
  { id: 'glossar', file: 'glossar/index.html', canonical: `${baseUrl}/glossar/index.html` },
  { id: 'tiere-und-urlaub', file: 'tiere-und-urlaub/index.html', canonical: `${baseUrl}/tiere-und-urlaub/index.html` },
  { id: 'notfallplan-haustier', file: 'notfallplan-haustier/index.html', canonical: `${baseUrl}/notfallplan-haustier/index.html` },
  { id: 'hitzefalle-auto', file: 'hitzefalle-auto/index.html', canonical: `${baseUrl}/hitzefalle-auto/index.html` },
  { id: 'ernaehrung-taurin', file: 'ernaehrung-taurin/index.html', canonical: `${baseUrl}/ernaehrung-taurin/index.html` },
  { id: 'realhaltung', file: 'realhaltung/index.html', canonical: `${baseUrl}/realhaltung/index.html` },
  { id: 'zucht-und-vermehrung', file: 'zucht-und-vermehrung/index.html', canonical: `${baseUrl}/zucht-und-vermehrung/index.html` },
  { id: 'wildtierhaltung', file: 'wildtierhaltung/index.html', canonical: `${baseUrl}/wildtierhaltung/index.html` },
  { id: 'wildkatzenbaby-gefunden', file: 'katzen/wildkatzenbaby-gefunden/index.html', canonical: `${baseUrl}/katzen/wildkatzenbaby-gefunden/index.html` },
  { id: 'noch-nicht-bereit', file: 'noch-nicht-bereit/index.html', canonical: `${baseUrl}/noch-nicht-bereit/index.html` },
];

const pageIds = new Set(pages.map((page) => page.id));
const canonicalSet = new Set(pages.map((page) => page.canonical));
const decorativeGlyphPattern = /[❌✅⚠🐕🐈🦜🏆🧪💚❤]/u;

function matchesAll(source, pattern) {
  return Array.from(source.matchAll(pattern));
}

function firstGroup(source, pattern) {
  return source.match(pattern)?.[1] || '';
}

function stripHash(value) {
  return String(value).split('#')[0];
}

function isExternalHref(href) {
  return /^(https?:|mailto:|tel:|wa:|#)/i.test(href);
}

function fileForHref(page, href) {
  const clean = stripHash(href);
  if (!clean || clean === '.') return path.join(projectRoot, page.file);
  if (clean.startsWith('/')) {
    let rooted = path.join(projectRoot, clean.slice(1));
    if (clean.endsWith('/') || !path.extname(clean)) rooted = path.join(rooted, 'index.html');
    return rooted;
  }
  const baseDir = path.dirname(path.join(projectRoot, page.file));
  let resolved = path.resolve(baseDir, clean);
  if (clean.endsWith('/') || !path.extname(clean)) resolved = path.join(resolved, 'index.html');
  return resolved;
}

async function exists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function auditPage(page) {
  const filePath = path.join(projectRoot, page.file);
  const html = await fs.readFile(filePath, 'utf8');
  const issues = [];

  const title = firstGroup(html, /<title>([\s\S]*?)<\/title>/i).trim();
  const description = firstGroup(html, /<meta name="description" content="([^"]+)"/i).trim();
  const canonical = firstGroup(html, /<link rel="canonical" href="([^"]+)"/i).trim();
  const ogTitle = firstGroup(html, /<meta property="og:title" content="([^"]+)"/i).trim();
  const ogUrl = firstGroup(html, /<meta property="og:url" content="([^"]+)"/i).trim();
  const ogImage = firstGroup(html, /<meta property="og:image" content="([^"]+)"/i).trim();
  const ogImageType = firstGroup(html, /<meta property="og:image:type" content="([^"]+)"/i).trim();
  const ogImageWidth = firstGroup(html, /<meta property="og:image:width" content="([^"]+)"/i).trim();
  const ogImageHeight = firstGroup(html, /<meta property="og:image:height" content="([^"]+)"/i).trim();
  const ogImageAlt = firstGroup(html, /<meta property="og:image:alt" content="([^"]+)"/i).trim();
  const twitterCard = firstGroup(html, /<meta name="twitter:card" content="([^"]+)"/i).trim();
  const twitterTitle = firstGroup(html, /<meta name="twitter:title" content="([^"]+)"/i).trim();
  const twitterDescription = firstGroup(html, /<meta name="twitter:description" content="([^"]+)"/i).trim();
  const twitterImage = firstGroup(html, /<meta name="twitter:image" content="([^"]+)"/i).trim();
  const twitterImageAlt = firstGroup(html, /<meta name="twitter:image:alt" content="([^"]+)"/i).trim();
  const h1Count = matchesAll(html, /<h1\b/gi).length;
  const mainCount = matchesAll(html, /<main\b/gi).length;
  const jsonLdBlocks = matchesAll(html, /<script type="application\/ld\+json">\s*([\s\S]*?)\s*<\/script>/gi);

  if (title.length < 20 || title.length > 90) issues.push(`bad-title-length:${title.length}`);
  if (description.length < 70 || description.length > 180) issues.push(`bad-description-length:${description.length}`);
  if (ogTitle.length < 30 || ogTitle.length > 90) issues.push(`bad-og-title-length:${ogTitle.length}`);
  if (canonical !== page.canonical) issues.push(`canonical-mismatch:${canonical}`);
  if (ogUrl !== page.canonical) issues.push(`og-url-mismatch:${ogUrl}`);
  if (!ogImage.startsWith(`${baseUrl}/assets/images/`) && !ogImage.startsWith(`${baseUrl}/assets/social/`)) issues.push(`bad-og-image:${ogImage}`);
  if (!['image/png', 'image/jpeg'].includes(ogImageType)) issues.push(`bad-og-image-type:${ogImageType}`);
  if (!Number.isInteger(Number(ogImageWidth)) || Number(ogImageWidth) <= 0) issues.push(`bad-og-image-width:${ogImageWidth}`);
  if (!Number.isInteger(Number(ogImageHeight)) || Number(ogImageHeight) <= 0) issues.push(`bad-og-image-height:${ogImageHeight}`);
  if (ogImageAlt.length < 20) issues.push('missing-og-image-alt');
  if (twitterCard !== 'summary_large_image') issues.push(`bad-twitter-card:${twitterCard}`);
  if (!twitterTitle) issues.push('missing-twitter-title');
  if (!twitterDescription) issues.push('missing-twitter-description');
  if (twitterImage !== ogImage) issues.push(`twitter-image-mismatch:${twitterImage}`);
  if (twitterImageAlt !== ogImageAlt) issues.push('twitter-alt-mismatch');
  if (h1Count !== 1) issues.push(`h1-count:${h1Count}`);
  if (mainCount !== 1) issues.push(`main-count:${mainCount}`);
  if (!html.includes(`data-static-site="true"`)) issues.push('missing-static-site-marker');
  if (!html.includes(`data-page-id="${page.id}"`)) issues.push('missing-page-id-marker');
  if (decorativeGlyphPattern.test(html)) issues.push('decorative-emoji-left-in-html');

  const schemaTypes = [];
  for (const block of jsonLdBlocks) {
    try {
      const parsed = JSON.parse(block[1]);
      schemaTypes.push(parsed['@type']);
    } catch (error) {
      issues.push(`invalid-jsonld:${error.message}`);
    }
  }
  if (!schemaTypes.includes('BreadcrumbList')) issues.push('missing-breadcrumb-schema');
  if (!schemaTypes.includes(page.id === 'startseite' ? 'WebSite' : 'WebPage')) {
    issues.push('missing-webpage-schema');
  }

  const staleHashLinks = matchesAll(html, /href="#([^"]+)"/gi)
    .map((match) => match[1])
    .filter((target) => pageIds.has(target));
  if (staleHashLinks.length) issues.push(`stale-route-hash-links:${staleHashLinks.join(',')}`);
  if (/onclick="navigateTo\('/.test(html)) issues.push('inline-navigateTo-left-in-html');

  const hrefs = matchesAll(html, /href="([^"]+)"/gi).map((match) => match[1]);
  for (const href of hrefs) {
    if (isExternalHref(href)) {
      if (href.startsWith('#')) {
        const target = href.slice(1);
        if (target && !html.includes(`id="${target}"`)) issues.push(`missing-anchor-target:${href}`);
      }
      continue;
    }

    const targetFile = fileForHref(page, href);
    if (!targetFile.startsWith(projectRoot)) {
      issues.push(`href-outside-project:${href}`);
      continue;
    }
    if (!(await exists(targetFile))) issues.push(`broken-internal-href:${href}`);
  }

  const assetRefs = [
    ...matchesAll(html, /src="([^"]+)"/gi).map((match) => match[1]),
    ...matchesAll(html, /href="([^"]+\.(?:css|js|png|webmanifest))"/gi).map((match) => match[1]),
  ].filter((ref) => !/^(https?:|mailto:|tel:|#)/i.test(ref));

  for (const ref of assetRefs) {
    const targetFile = path.resolve(path.dirname(filePath), stripHash(ref));
    if (!targetFile.startsWith(projectRoot)) {
      issues.push(`asset-outside-project:${ref}`);
      continue;
    }
    if (!(await exists(targetFile))) issues.push(`missing-asset:${ref}`);
  }

  return {
    id: page.id,
    file: page.file,
    title,
    descriptionLength: description.length,
    canonical,
    schemaTypes,
    issues,
  };
}

async function main() {
  const report = [];
  for (const page of pages) report.push(await auditPage(page));

  const sitemap = await fs.readFile(path.join(projectRoot, 'sitemap.xml'), 'utf8');
  const sitemapUrls = matchesAll(sitemap, /<loc>([^<]+)<\/loc>/g).map((match) => match[1]);
  const sitemapIssues = [
    ...pages.filter((page) => !sitemapUrls.includes(page.canonical)).map((page) => `missing-sitemap-url:${page.canonical}`),
    ...sitemapUrls.filter((url) => !canonicalSet.has(url)).map((url) => `unexpected-sitemap-url:${url}`),
  ];

  const robots = await fs.readFile(path.join(projectRoot, 'robots.txt'), 'utf8');
  const robotsIssues = [];
  if (!robots.includes(`Sitemap: ${baseUrl}/sitemap.xml`)) robotsIssues.push('robots-missing-sitemap');
  for (const bot of ['OAI-SearchBot', 'ChatGPT-User', 'GPTBot', 'PerplexityBot', 'ClaudeBot', 'Claude-SearchBot', 'Googlebot']) {
    if (!robots.includes(`User-agent: ${bot}`)) robotsIssues.push(`robots-missing:${bot}`);
  }

  const llmsFull = await fs.readFile(path.join(projectRoot, 'llms-full.txt'), 'utf8');
  const llmsIssues = pages
    .filter((page) => !llmsFull.includes(page.canonical))
    .map((page) => `llms-full-missing:${page.canonical}`);

  const aiFiles = ['ai/site.json', 'ai/pages.json', 'ai/faq.json'];
  const aiIssues = [];
  for (const aiFile of aiFiles) {
    try {
      JSON.parse(await fs.readFile(path.join(projectRoot, aiFile), 'utf8'));
    } catch (error) {
      aiIssues.push(`${aiFile}:${error.message}`);
    }
  }

  const css = await fs.readFile(path.join(projectRoot, 'assets', 'site.css'), 'utf8');
  const sourceHtml = await fs.readFile(path.join(projectRoot, 'src', 'site-source.html'), 'utf8');
  const iconIssues = [];
  if (/\.signal-card::before\s*,\s*\.rhythm-card::before/.test(css) || /\.signal-card::before\s*,\s*\.rhythm-card::before/.test(sourceHtml)) {
    iconIssues.push('empty-card-number-pseudo-selector');
  }
  for (const [label, source] of [['src/site-source.html', sourceHtml]]) {
    if (decorativeGlyphPattern.test(source)) iconIssues.push(`${label}:decorative-emoji-left-in-source`);
  }

  const failures = [
    ...report.flatMap((entry) => entry.issues.map((issue) => `${entry.file}:${issue}`)),
    ...sitemapIssues.map((issue) => `sitemap.xml:${issue}`),
    ...robotsIssues.map((issue) => `robots.txt:${issue}`),
    ...llmsIssues.map((issue) => `llms-full.txt:${issue}`),
    ...aiIssues,
    ...iconIssues,
  ];

  console.log(JSON.stringify({
    checkedPages: report.length,
    failures: failures.length,
    pageSummary: report.map((entry) => ({
      id: entry.id,
      file: entry.file,
      title: entry.title,
      descriptionLength: entry.descriptionLength,
      schemaTypes: entry.schemaTypes,
      issues: entry.issues,
    })),
    sitemapUrls: sitemapUrls.length,
    failuresBySource: failures,
  }, null, 2));

  if (failures.length) process.exitCode = 1;
}

await main();
