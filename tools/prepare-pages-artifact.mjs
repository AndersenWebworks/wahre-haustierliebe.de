import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const artifactRoot = path.join(projectRoot, '.pages-artifact');
const pagesMetadataPath = path.join(projectRoot, 'ai', 'pages.json');

const fixedPublicPaths = [
  'ai',
  'assets',
  'llms-full.txt',
  'llms.txt',
  'robots.txt',
  'site.webmanifest',
  'sitemap.xml',
  'CNAME',
];

function publicPathFromPageUrl(pageUrl) {
  const url = new URL(pageUrl);
  let relativePath = decodeURIComponent(url.pathname);

  while (relativePath.startsWith('/')) {
    relativePath = relativePath.slice(1);
  }

  if (relativePath === '' || relativePath === 'index.html') {
    return 'index.html';
  }

  if (relativePath.endsWith('/index.html')) {
    return relativePath;
  }

  if (relativePath.endsWith('/')) {
    return `${relativePath.slice(0, -1)}/index.html`;
  }

  return path.extname(relativePath) ? relativePath : `${relativePath}/index.html`;
}

async function getPagePublicPaths() {
  const [pagesMetadata, sitemap] = await Promise.all([
    fs.readFile(pagesMetadataPath, 'utf8').then((content) => JSON.parse(content)),
    fs.readFile(path.join(projectRoot, 'sitemap.xml'), 'utf8'),
  ]);
  const metadataPaths = pagesMetadata.pages.map((page) => publicPathFromPageUrl(page.url));
  const sitemapPaths = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => publicPathFromPageUrl(match[1]));
  const metadataSet = new Set(metadataPaths);
  const sitemapSet = new Set(sitemapPaths);
  const missingFromSitemap = metadataPaths.filter((publicPath) => !sitemapSet.has(publicPath));
  const missingFromMetadata = sitemapPaths.filter((publicPath) => !metadataSet.has(publicPath));

  if (missingFromSitemap.length || missingFromMetadata.length) {
    throw new Error([
      missingFromSitemap.length ? `Sitemap missing AI pages: ${missingFromSitemap.join(', ')}` : '',
      missingFromMetadata.length ? `AI pages missing sitemap URLs: ${missingFromMetadata.join(', ')}` : '',
    ].filter(Boolean).join(' | '));
  }

  return metadataPaths;
}

async function copyPublicPath(relativePath) {
  const source = path.resolve(projectRoot, relativePath);
  const target = path.resolve(artifactRoot, relativePath);
  if (!source.startsWith(`${projectRoot}${path.sep}`) || !target.startsWith(`${artifactRoot}${path.sep}`)) {
    throw new Error(`Public path escapes project root: ${relativePath}`);
  }
  const stat = await fs.stat(source);

  if (stat.isDirectory()) {
    await fs.cp(source, target, { recursive: true });
    return;
  }

  await fs.mkdir(path.dirname(target), { recursive: true });
  await fs.copyFile(source, target);
}

await fs.rm(artifactRoot, { recursive: true, force: true });
await fs.mkdir(artifactRoot, { recursive: true });

const publicPaths = new Set([...fixedPublicPaths, ...(await getPagePublicPaths())]);

for (const publicPath of publicPaths) {
  await copyPublicPath(publicPath);
}

for (const pagePath of await getPagePublicPaths()) {
  await fs.access(path.join(artifactRoot, pagePath));
}

console.log(`Prepared GitHub Pages artifact at ${path.relative(projectRoot, artifactRoot)} (${publicPaths.size} public paths)`);
