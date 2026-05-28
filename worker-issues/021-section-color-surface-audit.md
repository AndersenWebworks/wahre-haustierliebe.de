# Worker Issue 021: Sektionsfarben und Flächenlogik

## Ziel

Prüfe die Sektionsfarben, Flächenwechsel und Kartenhintergründe gegen die V2/V4-Designreferenzen. Ziel ist ein konsistenter, warmer, professioneller Look ohne zufällige Farbwechsel oder matschige Flächen.

## Fokus

- Startseite: Hero, Doorway-Sektion, Insight-Sektion, Tierarten-Grid, Share-/Support-Zonen.
- Unterseiten: Hero-Farbe, erste Content-Sektion, Info-/Warn-/Highlightboxen, Enhancement-Module, Share-Callouts.
- Budgie-Brain: eigenständige Tool-Seite, aber visuell nicht aus dem Projekt fallen.

## Quellen

- `src/site-source.html`
- `assets/site.css`
- `references/design/Wahre Haustierliebe v2 standalone.html`
- `references/design/Wahre Haustierliebe v4 standalone.html`
- `references/design/extracted/v2.html`
- `references/design/extracted/v4.html`

## Arbeitsmodus

Arbeite in deinem eigenen Claude-Worktree oder liefere einen Patch-Vorschlag, der zentral übernommen werden kann. Nicht committen, nicht pushen. Keine Serverstarts und keine Restarts. Screenshots/Reports nur unter `.worker-runs/issue-021/`.

Wenn du direkt editierst, beschränke dich auf:

- `src/site-source.html`
- optional `src/budgie-source.html`
- optional ein neues oder geändertes Audit unter `tools/`

Danach `node tools/build-static-pages.mjs` laufen lassen.

## Prüffragen

- Sind `section`, `section-alt`, `section-white`, Callouts und Cards farblich bewusst gesetzt?
- Gibt es Stellen, wo Cream/Mint/White ohne Rhythmus wechseln?
- Sind Warnflächen deutlich, aber nicht schrill?
- Sind Gelb-/Akzentflächen sparsam und hilfreich?
- Gibt es doppelte Flächenrahmen oder Cards-in-Cards?

## Ergebnis

Liefere:

- harte Farb-/Flächenbefunde mit Seite und Komponente.
- direkte Fixes oder eng umsetzbaren Patchvorschlag.
- Kriterien, wann eine Sektionsfarbe bewusst und wann zufällig wirkt.
- falls nötig: Folge-Issue-Datei unter `worker-issues/` nur für echte Restarbeit.
