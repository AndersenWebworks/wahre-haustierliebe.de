# Worker Issue 016: GEO/SEO-Metadaten und Schema pro Einzelseite

## Ziel

Prüfe, welche Metadaten, JSON-LD-Strukturen und Maschinenlese-Dateien für die neue statische Einzelseitenstruktur nötig sind.

## Quellen

- Aktueller Stand: `index.html`
- GEO/SEO-Guide: `C:\Andersen\Webworks\GitHub\Webworks\ClautzGPT\data\context\source\SEO_GEO_AVO_AGENT_VISIBILITY_GUIDE.md`
- Lokale Seiteninhalte: alle `<section class="page">` in `index.html`

## Arbeitsmodus

Read-only auditieren. Keine Dateien ändern, nicht committen, nicht pushen. Keine Websuche, kein Serverstart, kein Server-Restart.

## Prüffragen

- Welche eindeutigen `<title>`, Meta Descriptions und Canonicals braucht jede Seite?
- Welche Schema.org-Typen sind sichtbar gedeckt und nicht überzogen?
- Welche FAQPage-Einträge sind legitim, weil die Antworten sichtbar auf der Seite stehen?
- Was gehört in `robots.txt`, `sitemap.xml`, `llms.txt` und optionale `/ai/*.json`?
- Welche Angaben dürfen nicht als Fake-Authority oder irreführendes Schema markiert werden?

## Ergebnis

Liefere:

- Metadaten-Anforderungen pro Seitengruppe.
- Schema.org-Empfehlung mit Grenzen.
- konkrete Validierungschecks.
- P0/P1/P2-Risiken.
