# Worker Issue 003: Tierarten-Unterseiten verdichten

## Integrationsstand

Zentral integriert am 22.05.2026: Tierarten-Unterseiten haben jetzt eine erste Verdichtungsschicht aus Metrik-, Mythos/Fakt-, Quote- und Vergleichsmodulen. Nicht alle vorgeschlagenen Bildslots wurden umgesetzt, weil ohne eigenes gutes Commons-Motiv keine Ersatzbilder eingebaut werden.

## Ziel

Entwickle einen konkreten Verdichtungsplan für die Tierarten-Unterseiten, damit sie stärker wie teilbare Wissensseiten wirken und weniger wie lange Textartikel mit einem Hero-Bild.

## Seiten

- `hunde`
- `katzen`
- `voegel`
- `kleintiere`
- `exoten`
- `pferde`

## Kontext

Die Website verkauft nichts und sammelt keine Spenden. Die Conversion ist: Menschen sollen Wissen teilen, damit Tiere weniger aus Unwissenheit leiden.

Aktuelle harte Bildregel:

`Seite/Section -> Text daneben -> gewünschtes Gefühl -> Share-Grund -> Motiv -> Ratio/Crop -> Ausschlusskriterien`

Kein Bild darf nur "passen", weil die Tierart stimmt. Es muss neben dem konkreten Text eine Aussage tragen.

## Arbeitsmodus

Read-only planen. Keine Dateien ändern, nicht committen, nicht pushen.

Nutze als lokale Quellen:

- `index.html`
- `references/design/Wahre Haustierliebe v2 standalone.html`
- `references/design/Wahre Haustierliebe v4 standalone.html`
- vorhandene Screenshots unter `screenshots/`
- vorhandene Playwright-Audits unter `tools/`

Keine Brave-/Websuche. Keine Bildgenerierung. Keine Serverstarts oder Restarts.

## Erwartetes Ergebnis

Für jede Seite:

- Welche 2-4 Abschnitte sollten visuell verdichtet werden?
- Welche v2/v4-Muster passen dazu? Zum Beispiel Kampagnenband, Quick-Facts, Vergleich, Doorway, Mythos-Zeile, CTA-Fläche.
- Wo gehört ein Bild hin, wo besser kein Bild?
- Pro vorgeschlagenem Bildslot: Textnachbarschaft, Gefühl, Share-Grund, Motividee, Ratio, Crop-Hinweis, Ausschlusskriterien.
- Konkrete Akzeptanzkriterien für Playwright-Kontakt-Sheets.

Wichtig: Keine generischen "mehr Bilder"-Vorschläge. Jeder Vorschlag muss direkt neben einem vorhandenen Textabschnitt funktionieren.
