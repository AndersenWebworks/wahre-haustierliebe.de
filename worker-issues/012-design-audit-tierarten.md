# Worker Issue 012: Design-Audit Tierarten-Unterseiten

## Ziel

Prüfe diese Tierarten-Seiten einzeln gegen die lokalen V2/V4-Designvorlagen und liefere konkrete optische Nacharbeitspunkte:

- `#voegel`
- `#kleintiere`
- `#exoten`
- `#pferde`

## Quellen

- Aktueller Stand: `index.html`
- Live-Spiegel, falls erreichbar: `https://andersenwebworks.tailcb6eb8.ts.net:3100/wahre-haustierliebe-current/index.html`
- V2-Referenz: `references/design/Wahre Haustierliebe v2 standalone.html`
- V4-Referenz: `references/design/Wahre Haustierliebe v4 standalone.html`
- Content-Quelle: `references/content/annemarie-content-source.html`

## Arbeitsmodus

Read-only auditieren. Keine Dateien ändern, nicht committen, nicht pushen.

Nutze Playwright aktiv:

- V2 und V4 auf Desktop und Mobile öffnen.
- Die zugewiesenen Seiten auf Desktop, Tablet und Mobile öffnen.
- Screenshots oder Kontakt-Sheets unter `.worker-runs/issue-012/` ablegen.
- Nicht nur technische Fehler melden. Bewerte optisch: Rhythmus, Hierarchie, Nähe zu V2/V4, Bild-/Text-Nachbarschaft, Kartenqualität, mobile Enge, Share-Wirkung.

Keine Brave-/Websuche. Keine Bildgenerierung. Kein Serverstart, kein Server-Restart, kein PM2.

## Prüffragen

- Haben die Tierarten-Seiten eigene visuelle Signatur oder wirken sie wie kopierte Textseiten?
- Sind die Kosten-/Haltungsbereiche lesbar, prägnant und mobile sauber?
- Tragen Bild und Caption den jeweiligen Tierschutzgedanken oder sitzen sie nur dekorativ daneben?
- Gibt es genug V2/V4-artige Verdichtung: Faktenkarten, Signalboxen, Zitatband, Entscheidungsblock?
- Wo bricht die mobile Gestaltung bei langen deutschen Begriffen oder Tabellen ein?

## Ergebnis

Liefere pro Seite:

- 2-5 harte Designbefunde.
- Konkrete Änderungsvorschläge an Komponenten oder CSS-Klassen.
- Akzeptanzkriterien für Desktop und Mobile.
- Priorität: `P0` für sichtbare Layout-/Designfehler, `P1` für starke optische Schwächen, `P2` für Feinschliff.

Bewerte hart. Ein grüner Audit zählt nicht, wenn die Seite optisch schwach bleibt.
