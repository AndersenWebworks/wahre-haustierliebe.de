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
    return relativePath.slice(0, -'/index.html'.length);
  }

  if (relativePath.endsWith('/')) {
    return relativePath.slice(0, -1);
  }

  return relativePath;
}

async function getPagePublicPaths() {
  const pagesMetadata = JSON.parse(await fs.readFile(pagesMetadataPath, 'utf8'));
  return pagesMetadata.pages.map((page) => publicPathFromPageUrl(page.url));
}

async function copyPublicPath(relativePath) {
  const source = path.join(projectRoot, relativePath);
  const target = path.join(artifactRoot, relativePath);
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

console.log(`Prepared GitHub Pages artifact at ${path.relative(projectRoot, artifactRoot)}`);
