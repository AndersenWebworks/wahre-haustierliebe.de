# Worker Issue 019: Spacing-, Padding- und Margin-Rhythmus

## Ziel

Prüfe die echte statische Haustierliebe-Seite mit Fokus auf vertikale Rhythmik, Abstände, Containerbreiten und optische Konsistenz. Ziel ist nicht "formal kein Overflow", sondern ein professioneller, ruhiger und einladender Layoutfluss.

## Seiten

- `index.html`
- `mensch/index.html`
- `hunde/index.html`
- `katzen/index.html`
- `voegel/index.html`
- `kleintiere/index.html`
- `exoten/index.html`
- `pferde/index.html`
- `kastration/index.html`
- `qualzucht/index.html`
- `adoption/index.html`
- `selbsttest/index.html`
- `notfall/index.html`
- `wissen/index.html`
- `noch-nicht-bereit/index.html`
- `budgie-brain/index.html`

## Quellen

- Aktueller Build: die statischen HTML-Dateien im Repo-Root und Unterordnern.
- Pflegequelle: `src/site-source.html`
- CSS-Output: `assets/site.css`
- Designreferenzen:
  - `references/design/Wahre Haustierliebe v2 standalone.html`
  - `references/design/Wahre Haustierliebe v4 standalone.html`
  - `references/design/extracted/v2.html`
  - `references/design/extracted/v4.html`
- Vorhandene Audits: `tools/*.mjs`

## Arbeitsmodus

Arbeite in deinem eigenen Claude-Worktree oder liefere einen Patch-Vorschlag, der zentral übernommen werden kann. Nicht committen, nicht pushen. Keine Serverstarts und keine Restarts. Playwright-Screenshots/Reports nur unter `.worker-runs/issue-019/`.

Wenn du direkt editierst, beschränke dich auf:

- `src/site-source.html`
- optional ein neues oder geändertes Audit unter `tools/`
- optional `README.md`, falls die neue Audit-Regel dokumentiert werden muss

Danach `node tools/build-static-pages.mjs` laufen lassen.

## Prüffragen

- Wirken einzelne Seiten durch zu große vertikale Lücken auseinandergezogen?
- Sind Abstände zwischen Hero, Artikelanfang, Enhancement-Modulen, H2-Blöcken, Tabellen und Callouts konsistent?
- Gibt es Container, die optisch zu breit oder zu schmal wirken?
- Sind mobile Abstände ergonomisch oder werden große Flächen leer?
- Gibt es doppelte Abstandseffekte durch `.section`, `.article-rhythm`, `h2`-Margins und Box-Margins?

## Ergebnis

Liefere:

- konkrete Befunde mit Seite, Viewport und betroffener Komponente.
- direkte Fixes oder einen eng umsetzbaren Patchvorschlag.
- Akzeptanzkriterien für Desktop, Tablet und Mobile.
- falls nötig: Folge-Issue-Datei unter `worker-issues/` nur für echte Restarbeit.

Bewerte hart. Ein grüner technischer Audit reicht nicht, wenn der Rhythmus sichtbar komisch wirkt.
