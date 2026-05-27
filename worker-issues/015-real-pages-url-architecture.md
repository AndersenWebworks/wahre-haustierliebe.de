# Worker Issue 015: Echte Einzelseiten und URL-Architektur

## Ziel

Prüfe den geplanten Umbau von der Hash-SPA zu echten statischen Einzelseiten für Wa(h)re Haustierliebe.

## Quellen

- Aktueller Stand: `index.html`
- GEO/SEO-Guide: `C:\Andersen\Webworks\GitHub\Webworks\ClautzGPT\data\context\source\SEO_GEO_AVO_AGENT_VISIBILITY_GUIDE.md`
- Designreferenzen: `references/design/Wahre Haustierliebe v2 standalone.html`, `references/design/Wahre Haustierliebe v4 standalone.html`
- Content-Quelle: `references/content/annemarie-content-source.html`

## Arbeitsmodus

Read-only auditieren. Keine Dateien ändern, nicht committen, nicht pushen. Keine Websuche, kein Serverstart, kein Server-Restart.

## Prüffragen

- Welche echten URLs braucht die Seite mindestens?
- Welche Slugs sind für SEO/GEO sinnvoll und stabil?
- Was muss aus Hash-Routing herausgezogen werden, damit Crawler und AI-Agents die Seiten ohne JavaScript verstehen?
- Welche internen Links müssen echte `<a href>`-Links werden?
- Welche Redirect-/Kompatibilitätsrisiken entstehen durch alte `#route`-Links?

## Ergebnis

Liefere:

- Seitenliste mit URL, Suchintention und Priorität.
- konkrete Akzeptanzkriterien für Crawlability und Semantik.
- Risiken beim Generator-/Ein-Datei-Ansatz.
- kurze Abnahme-Checkliste.
