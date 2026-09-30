import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

// Playwright liegt in ClautzGPT neben diesem Projekt. Worktrees liegen tiefer, deshalb wird aufwärts gesucht.
export function playwrightModuleUrl(projectRoot) {
  for (let dir = projectRoot; path.dirname(dir) !== dir; dir = path.dirname(dir)) {
    const candidate = path.join(path.dirname(dir), 'ClautzGPT', 'node_modules', 'playwright', 'index.js');
    if (fs.existsSync(candidate)) return pathToFileURL(candidate).href;
  }
  return pathToFileURL(path.resolve(projectRoot, '..', 'ClautzGPT', 'node_modules', 'playwright', 'index.js')).href;
}
