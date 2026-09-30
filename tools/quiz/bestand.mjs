// Schreibt die Liste aller vorhandenen Fragen nach tools/quiz/arbeit/bestand.txt,
// damit neue Fragenpakete keine Dubletten erzeugen.
import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";
const here = path.dirname(fileURLToPath(import.meta.url));
const m = await import(pathToFileURL(path.resolve(here, "../../pwa/data/questions.js")).href);
fs.mkdirSync(path.join(here, "arbeit"), { recursive: true });
fs.writeFileSync(path.join(here, "arbeit", "bestand.txt"), m.questions.map(q => `${q.id} | ${q.wikiPath} | ${q.text}`).join("\n"));
console.log("bestand.txt:", m.questions.length, "Fragen");
