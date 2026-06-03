import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const artifactRoot = path.join(projectRoot, '.pages-artifact');

const publicPaths = [
  'index.html',
  'adoption',
  'ai',
  'assets',
  'budgie-brain',
  'css',
  'exoten',
  'hunde',
  'js',
  'kastration',
  'katzen',
  'kleintiere',
  'llms-full.txt',
  'llms.txt',
  'mensch',
  'noch-nicht-bereit',
  'notfall',
  'pferde',
  'qualzucht',
  'robots.txt',
  'selbsttest',
  'sitemap.xml',
  'voegel',
  'wissen',
  'CNAME',
];

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

for (const publicPath of publicPaths) {
  await copyPublicPath(publicPath);
}

console.log(`Prepared GitHub Pages artifact at ${path.relative(projectRoot, artifactRoot)}`);
