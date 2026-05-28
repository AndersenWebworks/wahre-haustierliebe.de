# Worker Issue 020: Tabellenbreite, Container-Fit und Lesbarkeit

## Ziel

Prüfe und verbessere alle Tabellen. Konkreter Nutzerhinweis: Die Tabelle "Was kostet ein Hund?" und wahrscheinlich weitere Tabellen füllen nicht sauber 100 % der Containerbreite oder wirken im Container falsch eingerückt.

## Seiten mit Tabellen

Mindestens prüfen:

- `hunde/index.html`
- `katzen/index.html`
- `pferde/index.html`
- `kastration/index.html`
- `adoption/index.html`

Zusätzlich per DOM alle `.cost-table`-Vorkommen erfassen.

## Quellen

- Pflegequelle: `src/site-source.html`
- CSS-Output: `assets/site.css`
- vorhandene Tabellen-Hydration in `src/site-source.html`
- vorhandene Audits: `tools/*.mjs`

## Arbeitsmodus

Arbeite in deinem eigenen Claude-Worktree oder liefere einen Patch-Vorschlag, der zentral übernommen werden kann. Nicht committen, nicht pushen. Keine Serverstarts und keine Restarts. Screenshots/Reports nur unter `.worker-runs/issue-020/`.

Wenn du direkt editierst, beschränke dich auf:

- `src/site-source.html`
- optional ein neues oder geändertes Audit unter `tools/`

Danach `node tools/build-static-pages.mjs` laufen lassen.

## Prüffragen

- Füllt jede Desktop-/Tablet-Tabelle die sichtbare Containerbreite?
- Gibt es Tabellen, deren `display: block`, `min-width` oder Scroll-Wrapper optisch zu schmal wirkt?
- Sind Tabellen in breiten Content-Containern richtig ausgerichtet?
- Sind mobile Kartenansichten lesbar und nicht unnötig redundant?
- Gibt es Tabellen mit zu engen Spalten, abgeschnittenem Text oder unnötigem horizontalem Scrollen?

## Ergebnis

Liefere:

- Liste aller Tabellen mit gemessener Tabellenbreite, Containerbreite und Viewports.
- konkrete Fixes oder Patchvorschlag.
- eine Audit-Regel, die Tabellenbreiten künftig prüft.
- falls nötig: Folge-Issue-Datei unter `worker-issues/` nur für echte Restarbeit.
