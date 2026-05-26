# Worker Issue 008: V2/V4-Designreferenzen gegen aktuellen Stand prüfen

## Ziel

Prüfe mit Playwright, welche starken Designmuster aus den lokalen Referenzen im aktuellen Stand fehlen, verwässert sind oder falsch angewendet werden.

## Referenzen

- `references/design/Wahre Haustierliebe v2 standalone.html`
- `references/design/Wahre Haustierliebe v4 standalone.html`
- `references/design/extracted/v2.html`
- `references/design/extracted/v4.html`

## Aktueller Stand

- Live: `https://andersenwebworks.tailcb6eb8.ts.net:3100/wahre-haustierliebe-current/index.html`
- Lokal: `index.html`

## Arbeitsmodus

Read-only auditieren. Keine Dateien ändern, nicht committen, nicht pushen. Screenshots unter `screenshots/` oder `.worker-runs/` sind erlaubt.

Nutze Playwright aktiv:

- V2 und V4 lokal öffnen
- Desktop und Mobile betrachten
- Startseite, Artikel-Hero, Karten, Wissensmodule, Tabellen, Hinweis-/Warnboxen, Share-Flächen und Footer vergleichen
- aktuelle Seiten ebenfalls per Playwright öffnen

Keine Brave-/Websuche. Keine Bildgenerierung. Keine Serverstarts oder Restarts.

## Erwartetes Ergebnis

Liefere:

- die 5-10 wichtigsten Designschwächen im aktuellen Stand
- welche V2/V4-Muster jeweils als Vorbild dienen sollten
- welche Seiten oder Komponenten betroffen sind
- welche Muster nicht übernommen werden sollten, weil sie Annemaries Content oder die ruhige Tierschutzwirkung schwächen würden
- konkrete Fix-Issues mit Akzeptanzkriterien

Wichtig: Kein pauschales "mehr Design". Es muss sichtbar begründet sein: Rhythmus, Hierarchie, Lesbarkeit, Bild-/Text-Nachbarschaft, mobile Enge, Share-Wirkung.
