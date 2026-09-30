// Erzeugt docs/quiz-lektorat.md: alle Fragen nach Thema und Modus, richtige Antwort fett.
import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const m = await import(pathToFileURL(path.join(root, "pwa/data/questions.js")).href);
let out = `# Quiz-Lektorat\n\nStand: Fragenkatalog ${m.version}, ${m.questions.length} Fragen.\n\nAlle Fragen der Quiz-App unter wahre-haustierliebe.de/pwa/, sortiert nach Thema und Spielweise. Die richtige Antwort ist **fett** markiert. Beim Mythen-Check steht dahinter, ob die Aussage stimmt.\n\nKorrekturen bitte direkt hier eintragen oder die ID der Frage nennen (zum Beispiel \`hunde-kosten-101\`).\n`;
for (const [ck, c] of Object.entries(m.categories)) {
  const qs = m.questions.filter(q => q.category === ck);
  if (!qs.length) continue;
  out += `\n## ${c.label} (${qs.length})\n`;
  for (const [mk, md] of Object.entries(m.modes)) {
    const mq = qs.filter(q => q.mode === mk);
    if (!mq.length) continue;
    out += `\n### ${md.label}\n`;
    for (const q of mq) {
      out += `\n**${q.text}**  \n\`${q.id}\` · ${q.difficulty} · [Wiki](https://wahre-haustierliebe.de${q.wikiPath})\n\n`;
      if (q.options) q.options.forEach((o, i) => { out += `- ${i === q.correctIndex ? "**" + o + "**" : o}\n`; });
      else out += `- ${q.correctJaNein ? "**Stimmt**" : "**Stimmt nicht**"}\n`;
      out += `\n> ${q.explanation}\n`;
    }
  }
}
fs.writeFileSync(path.join(root, "docs/quiz-lektorat.md"), out);
console.log("docs/quiz-lektorat.md:", m.questions.length, "Fragen");
