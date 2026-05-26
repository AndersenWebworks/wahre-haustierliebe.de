# Worker Issue 011: Design-Audit Startseite, Mensch, Hunde, Katzen

## Ziel

Prüfe diese Seiten einzeln gegen die lokalen V2/V4-Designvorlagen und liefere konkrete optische Nacharbeitspunkte:

- `#startseite`
- `#mensch`
- `#hunde`
- `#katzen`

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
- Screenshots oder Kontakt-Sheets unter `.worker-runs/issue-011/` ablegen.
- Nicht nur technische Fehler melden. Bewerte optisch: Rhythmus, Hierarchie, Nähe zu V2/V4, Bild-/Text-Nachbarschaft, Kartenqualität, mobile Enge, Share-Wirkung.

Keine Brave-/Websuche. Keine Bildgenerierung. Kein Serverstart, kein Server-Restart, kein PM2.

## Prüffragen

- Wirkt die Seite wie eine bewusst gestaltete V2/V4-inspirierte Wissensseite oder wie ein alter Template-Artikel?
- Sitzt die wichtigste Headline im richtigen visuellen Gewicht?
- Haben Hero, Bild, Lead, Karten und CTA eine erkennbare Dramaturgie?
- Sind Verdichtungsmodule wirklich hilfreich oder nur dekorative Kacheln?
- Welche V2/V4-Muster fehlen konkret?
- Welche Details machen die Seite noch billig, generisch oder unfertig?

## Ergebnis

Liefere pro Seite:

- 2-5 harte Designbefunde.
- Konkrete Änderungsvorschläge an Komponenten oder CSS-Klassen.
- Akzeptanzkriterien für Desktop und Mobile.
- Priorität: `P0` für sichtbare Layout-/Designfehler, `P1` für starke optische Schwächen, `P2` für Feinschliff.

Bewerte hart. Ein grüner Audit zählt nicht, wenn die Seite optisch schwach bleibt.
