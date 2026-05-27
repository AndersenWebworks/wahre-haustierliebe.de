import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const baseUrl = 'https://wahre-haustierliebe.de';

const pages = [
  { id: 'startseite', file: 'index.html', canonical: `${baseUrl}/` },
  { id: 'mensch', file: 'mensch/index.html', canonical: `${baseUrl}/mensch/index.html` },
  { id: 'hunde', file: 'hunde/index.html', canonical: `${baseUrl}/hunde/index.html` },
  { id: 'katzen', file: 'katzen/index.html', canonical: `${baseUrl}/katzen/index.html` },
  { id: 'voegel', file: 'voegel/index.html', canonical: `${baseUrl}/voegel/index.html` },
  { id: 'kleintiere', file: 'kleintiere/index.html', canonical: `${baseUrl}/kleintiere/index.html` },
  { id: 'exoten', file: 'exoten/index.html', canonical: `${baseUrl}/exoten/index.html` },
  { id: 'pferde', file: 'pferde/index.html', canonical: `${baseUrl}/pferde/index.html` },
  { id: 'kastration', file: 'kastration/index.html', canonical: `${baseUrl}/kastration/index.html` },
  { id: 'qualzucht', file: 'qualzucht/index.html', canonical: `${baseUrl}/qualzucht/index.html` },
  { id: 'adoption', file: 'adoption/index.html', canonical: `${baseUrl}/adoption/index.html` },
  { id: 'selbsttest', file: 'selbsttest/index.html', canonical: `${baseUrl}/selbsttest/index.html` },
  { id: 'notfall', file: 'notfall/index.html', canonical: `${baseUrl}/notfall/index.html` },
  { id: 'wissen', file: 'wissen/index.html', canonical: `${baseUrl}/wissen/index.html` },
  { id: 'noch-nicht-bereit', file: 'noch-nicht-bereit/index.html', canonical: `${baseUrl}/noch-nicht-bereit/index.html` },
  { id: 'budgie-brain', file: 'budgie-brain/index.html', canonical: `${baseUrl}/budgie-brain/index.html` },
];

const pageIds = new Set(pages.map((page) => page.id));
const canonicalSet = new Set(pages.map((page) => page.canonical));

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
  const ogUrl = firstGroup(html, /<meta property="og:url" content="([^"]+)"/i).trim();
  const h1Count = matchesAll(html, /<h1\b/gi).length;
  const mainCount = matchesAll(html, /<main\b/gi).length;
  const jsonLdBlocks = matchesAll(html, /<script type="application\/ld\+json">\s*([\s\S]*?)\s*<\/script>/gi);

  if (title.length < 20 || title.length > 90) issues.push(`bad-title-length:${title.length}`);
  if (description.length < 70 || description.length > 180) issues.push(`bad-description-length:${description.length}`);
  if (canonical !== page.canonical) issues.push(`canonical-mismatch:${canonical}`);
  if (ogUrl !== page.canonical) issues.push(`og-url-mismatch:${ogUrl}`);
  if (h1Count !== 1) issues.push(`h1-count:${h1Count}`);
  if (mainCount !== 1) issues.push(`main-count:${mainCount}`);
  if (!html.includes(`data-static-site="true"`)) issues.push('missing-static-site-marker');
  if (!html.includes(`data-page-id="${page.id}"`)) issues.push('missing-page-id-marker');

  const schemaTypes = [];
  for (const block of jsonLdBlocks) {
    try {
      const parsed = JSON.parse(block[1]);
      schemaTypes.push(parsed['@type']);
    } catch (error) {
      issues.push(`invalid-jsonld:${error.message}`);
    }
  }
  if (page.id !== 'budgie-brain' && !schemaTypes.includes('BreadcrumbList')) issues.push('missing-breadcrumb-schema');
  if (page.id === 'budgie-brain') {
    if (!schemaTypes.includes('LearningResource')) issues.push('missing-learning-resource-schema');
  } else if (!schemaTypes.includes(page.id === 'startseite' ? 'WebSite' : 'WebPage')) {
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
    ...matchesAll(html, /href="([^"]+\.(?:css|js))"/gi).map((match) => match[1]),
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
  for (const bot of ['OAI-SearchBot', 'PerplexityBot', 'Claude-SearchBot']) {
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

  const failures = [
    ...report.flatMap((entry) => entry.issues.map((issue) => `${entry.file}:${issue}`)),
    ...sitemapIssues.map((issue) => `sitemap.xml:${issue}`),
    ...robotsIssues.map((issue) => `robots.txt:${issue}`),
    ...llmsIssues.map((issue) => `llms-full.txt:${issue}`),
    ...aiIssues,
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
