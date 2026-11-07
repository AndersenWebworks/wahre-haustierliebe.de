// Baut den Volltext-Suchindex (assets/search-index.json) aus den fertig gebauten Seiten.
// Der Index wird im Browser erst geladen, wenn jemand die Suche benutzt.
import fs from 'node:fs/promises';

const ENTITIES = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ', shy: '', hellip: '…', ndash: '–', mdash: '—', laquo: '«', raquo: '»', bdquo: '„', ldquo: '“', rdquo: '”', lsquo: '‘', rsquo: '’', auml: 'ä', ouml: 'ö', uuml: 'ü', Auml: 'Ä', Ouml: 'Ö', Uuml: 'Ü', szlig: 'ß', euro: '€', middot: '·' };

function decodeEntities(text) {
  return text.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (match, name) => {
    if (name[0] === '#') {
      const code = name[1].toLowerCase() === 'x' ? parseInt(name.slice(2), 16) : parseInt(name.slice(1), 10);
      return Number.isFinite(code) ? String.fromCodePoint(code) : '';
    }
    return Object.prototype.hasOwnProperty.call(ENTITIES, name) ? ENTITIES[name] : match;
  });
}

function squash(text) {
  return decodeEntities(text.replace(/<[^>]+>/g, ' ')).replace(/­/g, '').replace(/\s+/g, ' ').trim();
}

// Zerlegt den sichtbaren Text von <main> in Abschnitte [Überschrift, [Textblöcke]].
function extractSections(html) {
  const mainMatch = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i);
  let body = mainMatch ? mainMatch[1] : html;
  body = body
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/<(script|style|svg|noscript|template|form|button|select|textarea|aside)\b[\s\S]*?<\/\1>/gi, ' ')
    .replace(/<nav\b[\s\S]*?<\/nav>/gi, ' ')
    .replace(/<(img|input)\b[^>]*>/gi, ' ');
  const sections = [];
  let current = { h: '', blocks: [] };
  let buffer = '';
  const flush = () => {
    const text = squash(buffer);
    buffer = '';
    if (text) current.blocks.push(text);
  };
  const startSection = (heading) => {
    flush();
    if (current.h || current.blocks.length) sections.push(current);
    current = { h: heading, blocks: [] };
  };
  // Überschriften (h1 bis h3) beginnen Abschnitte; übrige Blockgrenzen trennen nur Textblöcke.
  const tokenRe = /<(h[1-3])\b[^>]*>([\s\S]*?)<\/\1>|<\/?(?:p|li|ul|ol|dl|dd|dt|tr|table|section|div|article|figure|figcaption|blockquote|details|summary|br|h[4-6])\b[^>]*>/gi;
  let last = 0;
  let match;
  while ((match = tokenRe.exec(body))) {
    buffer += ` ${body.slice(last, match.index)}`;
    last = match.index + match[0].length;
    if (match[1]) startSection(squash(match[2]));
    else flush();
  }
  buffer += ` ${body.slice(last)}`;
  flush();
  if (current.h || current.blocks.length) sections.push(current);
  return sections;
}

function cleanTitle(title) {
  return String(title || '').replace(/\s*-\s*Wa\(h\)re Haustier\(liebe\)\s*$/, '').trim();
}

export async function buildSearchIndex({ pages, glossaryTerms, readPageHtml }) {
  const extracted = [];
  for (const page of pages) {
    const html = await readPageHtml(page);
    extracted.push({ page, sections: html ? extractSections(html) : [] });
  }

  // Textblöcke, die auf vielen Seiten wörtlich vorkommen (Hinweise, Fußbereiche), werden nicht indexiert.
  const blockCount = new Map();
  for (const { sections } of extracted) {
    const seen = new Set();
    for (const section of sections) for (const block of section.blocks) seen.add(block);
    for (const block of seen) blockCount.set(block, (blockCount.get(block) || 0) + 1);
  }

  const indexPages = extracted.map(({ page, sections }) => {
    const units = [];
    const glossaryPage = page.id === 'glossar';
    for (const section of sections) {
      const blocks = section.blocks.filter((block) => !(blockCount.get(block) >= 4 && block.length > 25));
      const text = blocks.join(' ');
      if (glossaryPage && !section.h) continue;
      if (glossaryPage) { if (section.h) units.push([section.h, '']); continue; }
      if (!section.h && !text) continue;
      units.push([section.h, text]);
    }
    return { i: page.id, t: cleanTitle(page.title), d: page.description || '', s: units };
  });

  const indexGlossary = glossaryTerms.map((term) => [term.key, term.title, term.summary, term.description]);
  const json = JSON.stringify({ v: 1, p: indexPages, g: indexGlossary });
  return json;
}
