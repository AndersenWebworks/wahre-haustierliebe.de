# Worker Issue 004: Entscheidungs- und Conversion-Seiten verdichten

## Integrationsstand

Zentral integriert am 22.05.2026: Mensch, Selbsttest, Notfall, Adoption und Noch-nicht-bereit haben jetzt eigene Entscheidungs-, Share- oder Handlungsbänder. Der Selbsttest bekommt einen sichtbaren Vorab-Share-Impuls und die Ergebnis-Share-Mechanik bleibt erhalten.

## Ziel

Entwickle einen konkreten Verdichtungsplan für die Seiten, die direkt auf Entscheidung, Teilen und Handlung wirken. Diese Seiten sind für die Conversion wichtiger als reine Tierarteninformationen.

## Seiten

- `mensch`
- `selbsttest`
- `notfall`
- `adoption`
- `noch-nicht-bereit`

## Kontext

Die Seite soll Menschen nicht beschämen. Sie soll den inneren Satz verschieben von "Ich liebe Tiere" zu "Liebe heißt, Bedürfnisse wirklich zu kennen".

Die Conversion ist Teilen:

- "Lies das, bevor du dir ein Tier holst."
- "Schick das jemandem, der gerade über ein Tier nachdenkt."
- "Speicher das, bevor du es im Notfall brauchst."

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

- Welche emotionale Rolle hat die Seite in der Besuchsreise?
- Welche Textstellen müssen visuell herausgehoben werden?
- Welche v2/v4-Layoutmuster passen: starke Zitatfläche, Entscheidungsband, Checkliste, Notfallkarte, Share-CTA, ruhige Bildfläche?
- Pro Bildslot: Textnachbarschaft, Gefühl, Share-Grund, Motividee, Ratio, Crop-Hinweis, Ausschlusskriterien.
- Welche Share-CTA gehört auf die Seite?
- Welche Playwright-Screenshots/Kontakt-Sheets müssen nach Umsetzung geprüft werden?

Besonders streng prüfen:

- Kein zufälliges Tierporträt neben Entscheidungstext.
- Notfall nicht dramatisieren, sondern ruhig handlungsfähig machen.
- "Noch nicht bereit" als entlastende Tierliebe zeigen, nicht als Scheitern.
