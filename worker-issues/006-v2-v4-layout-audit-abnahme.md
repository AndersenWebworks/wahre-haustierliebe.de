# Worker Issue 006: V2/V4-Layout-Audit und Abnahmekriterien

## Integrationsstand

Zentral integriert am 22.05.2026: Article-Heros haben jetzt Bildzweck, Share-Grund und sichtbare Caption. Der neue `tools/article-context-audit.mjs` erstellt Kontakt-Screenshots für Unterseiten und prüft Verdichtungsmodule, Bildmetadaten, Crops, sichtbare Duplikate und Overflow.

## Ziel

Vergleiche den aktuellen Stand mit den v2/v4-Designreferenzen und formuliere konkrete Abnahmekriterien für die nächste Umsetzungsrunde "Unterseiten verdichten".

## Fokus

Nicht noch einmal nur "Bilder laden" prüfen. Der Audit muss erkennen, ob Bild, Text, Ratio, Crop und Share-Wirkung zusammen funktionieren.

## Arbeitsmodus

Read-only auditieren. Keine Dateien ändern, nicht committen, nicht pushen.

Nutze als lokale Quellen:

- `index.html`
- `references/design/Wahre Haustierliebe v2 standalone.html`
- `references/design/Wahre Haustierliebe v4 standalone.html`
- `tools/image-layout-audit.mjs`
- `tools/startpage-image-context-audit.mjs`
- vorhandene Screenshots unter `screenshots/`

Keine Brave-/Websuche. Keine Bildgenerierung. Keine Serverstarts oder Restarts.

## Erwartetes Ergebnis

- Welche v2/v4-Muster fehlen im aktuellen Stand noch am stärksten?
- Welche Unterseiten sind aktuell am dünnsten und warum?
- Welche Bild-/Text-Nachbarschaften sind riskant oder schwach?
- Welche zusätzlichen Playwright-Kontakt-Sheets sollten gebaut werden?
- Welche Testregeln müssen härter werden, damit schlechte Workarounds nicht grün werden?
- Priorisierte Umsetzungsliste für die nächsten 1-2 Codex-Integrationsschritte.

Bewerte hart. Ein formal grüner Test reicht nicht, wenn die Seite gestalterisch und emotional schwach bleibt.
