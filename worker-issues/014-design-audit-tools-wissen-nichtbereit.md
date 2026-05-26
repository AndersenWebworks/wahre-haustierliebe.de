# Worker Issue 014: Design-Audit Selbsttest, Notfall, Wissen, Noch nicht bereit

## Ziel

Prüfe diese Seiten einzeln gegen die lokalen V2/V4-Designvorlagen und liefere konkrete optische Nacharbeitspunkte:

- `#selbsttest`
- `#notfall`
- `#wissen`
- `#noch-nicht-bereit`

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
- Screenshots oder Kontakt-Sheets unter `.worker-runs/issue-014/` ablegen.
- Nicht nur technische Fehler melden. Bewerte optisch: Rhythmus, Hierarchie, Nähe zu V2/V4, Interaktionsflächen, Formular-/Accordion-Qualität, mobile Enge, Share-Wirkung.

Keine Brave-/Websuche. Keine Bildgenerierung. Kein Serverstart, kein Server-Restart, kein PM2.

## Prüffragen

- Fühlen sich Selbsttest, Notfall und Wissen wie gestaltete Nutzwerkzeuge an oder wie einfache Formular-/Accordion-Blöcke?
- Sind Touch-Ziele, Abstände und Gruppierungen mobile wirklich angenehm?
- Ist Notfall deutlich, aber nicht panisch gestaltet?
- Ist die Wissenssuche optisch klar und hochwertig?
- Hat `#noch-nicht-bereit` genug emotionale Eigenständigkeit und klare Alternativen?

## Ergebnis

Liefere pro Seite:

- 2-5 harte Designbefunde.
- Konkrete Änderungsvorschläge an Komponenten oder CSS-Klassen.
- Akzeptanzkriterien für Desktop und Mobile.
- Priorität: `P0` für sichtbare Layout-/Designfehler, `P1` für starke optische Schwächen, `P2` für Feinschliff.

Bewerte hart. Ein grüner Audit zählt nicht, wenn die Seite optisch schwach bleibt.
