# Worker Issue 005: Wissens- und Schutzseiten verdichten

## Integrationsstand

Zentral integriert am 22.05.2026: Kastration, Qualzucht und Wissen nutzen jetzt stärkere Mythos/Fakt-, Signal- und Lösungsabschnitte. Qualzucht und Wissen haben zusätzliche kontextgebundene Bildmodule mit eigener Commons-Datei und sichtbarer Caption.

## Ziel

Entwickle einen konkreten Verdichtungsplan für die Seiten, die Mythen, Leidvermeidung und Prävention erklären. Diese Seiten müssen sharebare Aha-Momente erzeugen, ohne Schock- oder Schuldästhetik.

## Seiten

- `kastration`
- `qualzucht`
- `wissen`

## Kontext

Diese Seiten tragen den Kern der Mission: Wissen schützt Tiere. Sie müssen sachlich bleiben, aber visuell so stark sein, dass Besucher konkrete Irrtümer weitergeben wollen.

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

- Welche 3-5 Aussagen sind wirklich teilbar?
- Welche Layoutform macht sie stärker? Zum Beispiel Mythos-vs-Fakt, Kosten-/Folgenband, ruhige Warnkarte, Vergleichstabelle, Glossaranker.
- Wo sind Bilder sinnvoll und wo würden sie nur dekorieren?
- Pro Bildslot: Textnachbarschaft, Gefühl, Share-Grund, Motividee, Ratio, Crop-Hinweis, Ausschlusskriterien.
- Welche Warnungen dürfen sichtbar stark sein, ohne sensationsgierig zu wirken?
- Welche Playwright-Kontakt-Sheets müssen die Nachbarschaft von Bild und Aussage prüfen?

Besonders streng prüfen:

- Qualzucht-Bilder dürfen unbequem sein, aber nicht Clickbait.
- Kastration braucht Tierschutz-/Präventionskontext, keine OP-Ästhetik.
- Wissen/Mythen braucht Aha-Zeilen statt beliebiger Haustierbilder.
