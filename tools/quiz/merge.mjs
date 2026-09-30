// Prüft den Fragenkatalog und führt neue Fragenpakete (JSON-Arrays) ein.
// Nur prüfen:            node tools/quiz/merge.mjs [paket.json ...]
// Prüfen und schreiben:  node tools/quiz/merge.mjs --write --version 2026-10-01.1 paket.json ...
// Beim Schreiben wird pwa/data/questions.js nach Modus und Kategorie sortiert neu erzeugt.
import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..").split(path.sep).join("/");
const args = process.argv.slice(2);
const write = args.includes("--write");
const vIndex = args.indexOf("--version");
const version = vIndex >= 0 ? args[vIndex + 1] : null;
const files = args.filter((f, i) => f !== "--write" && f !== "--version" && !(vIndex >= 0 && i === vIndex + 1));
if (write && !version) { console.log("Beim Schreiben bitte --version YYYY-MM-DD.N angeben."); process.exit(1); }
const file = root + "/pwa/data/questions.js";
const m = await import(pathToFileURL(file).href + "?t=" + Date.now());
const stickers = new Set(fs.readdirSync(root + "/pwa/sticker").map(f => f.replace(".svg", "")));
let all = m.questions.slice();
for (const f of files) all = all.concat(JSON.parse(fs.readFileSync(f, "utf8")));
const ids = new Set(); const texts = new Map(); let problems = 0;
const P = (q, msg) => { problems++; console.log("PROBLEM", q.id, msg); };
const ORDER = ["id","mode","interaktion","correctJaNein","sticker","category","difficulty","text","options","correctIndex","explanation","wikiPath","sourceRef"];
for (const q of all) {
  if (ids.has(q.id)) P(q, "doppelte id"); ids.add(q.id);
  const t = (q.text || "").toLowerCase().replace(/[^a-zäöüß0-9]/g, "");
  if (texts.has(t)) P(q, "gleicher Text wie " + texts.get(t)); texts.set(t, q.id);
  if (!m.modes[q.mode]) P(q, "mode " + q.mode);
  if (!m.categories[q.category]) P(q, "category " + q.category);
  if (!["leicht","mittel","knifflig"].includes(q.difficulty)) P(q, "difficulty");
  if (!q.wikiPath || !fs.existsSync(root + q.wikiPath + "index.html")) P(q, "wikiPath " + q.wikiPath);
  if (q.sourceRef !== "https://wahre-haustierliebe.de" + q.wikiPath) P(q, "sourceRef");
  if (!q.explanation || !q.text) P(q, "text/explanation fehlt");
  if (/(der Text|laut Text|laut Seite|die Seite|dieser Seite|laut Übersicht|laut Zeitachse|die Übersicht nennt|laut Tabelle|die Tabelle|der Tabelle|Checkliste|\bnennt\b|\bnennen\b|empfiehlt die Seite|laut Plan|der Notfallplan nennt|Kostenübersicht)/i.test(q.text + " " + (q.options || []).join(" ") + " " + q.explanation)) P(q, "Redaktionssprache (Text/Seite)");
  const blob = JSON.stringify(q);
  if (blob.includes("—")) P(q, "Geviertstrich");
  if (/\d ?- ?\d/.test(q.text + (q.options || []).join(" ") + q.explanation)) P(q, "Bindestrich in Zahlspanne?");
  if (q.interaktion === "jaNein") {
    if (q.mode !== "mythen") P(q, "jaNein außerhalb mythen");
    if (typeof q.correctJaNein !== "boolean") P(q, "correctJaNein");
    if (q.options || q.correctIndex !== undefined) P(q, "mythen mit options");
    if (!/^„.*“$/.test(q.text)) P(q, "Mythen-Text nicht in „…“");
  } else {
    if (q.interaktion !== "vierKarten") P(q, "interaktion");
    if (!Array.isArray(q.options) || q.options.length !== 4) P(q, "options");
    if (!(q.correctIndex >= 0 && q.correctIndex < 4)) P(q, "correctIndex");
  }
  if (q.sticker) { if (q.mode !== "fall") P(q, "sticker außerhalb fall"); for (const s of q.sticker) if (!stickers.has(s)) P(q, "sticker " + s); }
  for (const k of Object.keys(q)) if (!ORDER.includes(k)) P(q, "unbekanntes Feld " + k);
}
const stat = {}; let longest = 0, four = 0; const pos = [0,0,0,0];
for (const q of all) {
  const k = q.mode + "/" + q.category; stat[k] = (stat[k] || 0) + 1;
  if (q.options) { four++; pos[q.correctIndex]++; const L = q.options.map(o => o.length); if (L[q.correctIndex] === Math.max(...L)) longest++; }
}
const my = all.filter(q => q.mode === "mythen");
console.log("Gesamt", all.length, "Probleme", problems);
console.log("längste=richtig", longest, "/", four, "Positionen", pos.join(","));
console.log("Mythen true/false", my.filter(q => q.correctJaNein).length, "/", my.filter(q => !q.correctJaNein).length);
console.log(Object.entries(stat).sort().map(([k, v]) => k + ":" + v).join("  "));
const diff = {}; for (const q of all) diff[q.difficulty] = (diff[q.difficulty] || 0) + 1; console.log("Schwierigkeit", JSON.stringify(diff));
if (!write) process.exit(problems ? 1 : 0);
if (problems) { console.log("Nicht geschrieben wegen Problemen."); process.exit(1); }
// Datei neu erzeugen: Kopf unverändert bis "export const questions", dann sortiert nach Modus und Kategorie.
const src = fs.readFileSync(file, "utf8");
const head = src.slice(0, src.indexOf("export const questions")).replace(/export const version = "[^"]*";/, `export const version = "${version}";`);
const modeOrder = Object.keys(m.modes), catOrder = Object.keys(m.categories);
all.sort((a, b) => modeOrder.indexOf(a.mode) - modeOrder.indexOf(b.mode) || catOrder.indexOf(a.category) - catOrder.indexOf(b.category));
const TITLES = { klassisch: "KLASSISCH", mythen: "MYTHEN-CHECK", fall: "FALL-ENTSCHEIDUNG" };
let out = head + "export const questions = [\n"; let lastMode = null;
all.forEach((q, i) => {
  if (q.mode !== lastMode) { out += (lastMode ? "\n" : "") + `  // ============ ${TITLES[q.mode]} ============\n`; lastMode = q.mode; }
  const lines = ORDER.filter(k => q[k] !== undefined).map(k => {
    if (k === "options") return `    options: [\n${q.options.map(o => "      " + JSON.stringify(o)).join(",\n")}\n    ]`;
    return `    ${k}: ${JSON.stringify(q[k])}`;
  });
  out += "  {\n" + lines.join(",\n") + "\n  }" + (i < all.length - 1 ? "," : "") + "\n";
});
out += "];\n";
fs.writeFileSync(file, out);
console.log("geschrieben:", file);
