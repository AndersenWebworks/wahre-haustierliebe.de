# Worker Issue 007: Live-Audit aller Seiten auf Layoutfehler

## Ziel

Prüfe den aktuellen Live-Stand unter:

`https://andersenwebworks.tailcb6eb8.ts.net:3100/wahre-haustierliebe-current/index.html`

auf Desktop und Mobile mit Playwright. Es geht nicht um theoretische Codekritik, sondern um sichtbare Layoutfehler, Brüche, Überläufe, abgeschnittene Inhalte, schwache Hierarchie und unstimmige Komponenten.

## Seiten

- `startseite`
- `mensch`
- `hunde`
- `katzen`
- `voegel`
- `kleintiere`
- `exoten`
- `pferde`
- `kastration`
- `qualzucht`
- `adoption`
- `selbsttest`
- `notfall`
- `wissen`
- `noch-nicht-bereit`

## Viewports

- Desktop: 1440 x 1100
- Mobile: 390 x 900
- Optional schmal: 360 x 800, wenn Mobile-Grenzfaelle auffallen

## Arbeitsmodus

Read-only auditieren. Keine Dateien ändern, nicht committen, nicht pushen. Screenshots und lokale Audit-Artefakte unter `screenshots/` oder `.worker-runs/` sind erlaubt.

Nutze Playwright aktiv:

- jede Hash-Seite direkt öffnen
- einmal von oben bis unten scrollen
- Fullpage-Screenshot und mindestens einen Above-the-fold-Screenshot pro Seite prüfen
- horizontales Overflow messen
- Header/Nav, Hero, Cards, Tabellen, CTA-/Share-Flächen und Footer visuell prüfen
- Selbsttest einmal kurz bedienen, falls ohne Seiteneffekt möglich

Keine Brave-/Websuche. Keine Bildgenerierung. Keine Serverstarts oder Restarts.

## Quellen im Repo

- `index.html`
- `tools/image-layout-audit.mjs`
- `tools/startpage-image-context-audit.mjs`
- `tools/article-context-audit.mjs`
- vorhandene Screenshots unter `screenshots/`

## Erwartetes Ergebnis

Liefere einen priorisierten Bericht mit:

- Blocker oder echte Layoutfehler zuerst
- pro Befund: Seite, Viewport, sichtbarer Effekt, wahrscheinliche Ursache, Screenshot-Pfad falls erzeugt
- konkrete Akzeptanzkriterien fuer eine Fix-Runde
- Follow-up-Issues, falls Arbeit sinnvoll aufgeteilt werden muss

Bewerte hart: "funktioniert technisch" reicht nicht, wenn es sichtbar billig, gequetscht oder inkonsistent wirkt.
