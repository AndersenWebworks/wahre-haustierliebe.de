# Worker Issue 017: Design-Regression durch den Seiten-Split

## Ziel

Prüfe, welche visuellen und UX-Risiken entstehen, wenn die Hash-SPA in echte Einzelseiten gesplittet wird.

## Quellen

- Aktueller Stand: `index.html`
- Designreferenzen: `references/design/Wahre Haustierliebe v2 standalone.html`, `references/design/Wahre Haustierliebe v4 standalone.html`
- Vorhandene Audit-Tools: `tools/*.mjs`

## Arbeitsmodus

Read-only auditieren. Keine Dateien ändern, nicht committen, nicht pushen. Playwright darf Screenshots unter `.worker-runs/issue-017/` ablegen. Kein Serverstart, kein Server-Restart.

## Prüffragen

- Welche JS-Hydration ist nur wegen Hash-Routing nötig und muss auf statischen Seiten anders funktionieren?
- Welche Komponenten müssen nach dem Split sichtbar gleich bleiben?
- Welche Navigation muss von Button-UI auf Link-UI wechseln, ohne optisch zu brechen?
- Welche mobilen Risiken entstehen durch neue URL-/Header-/Footer-Struktur?

## Ergebnis

Liefere:

- konkrete Regression-Risiken.
- CSS/JS-Hinweise für statische Seiten.
- Abnahmekriterien Desktop, Tablet, Mobile.
- Welche bestehenden Audits angepasst werden müssen.
