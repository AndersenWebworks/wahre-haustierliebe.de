# Worker Issue 018: Crawl-, Link- und Build-Audit für echte Seiten

## Ziel

Definiere einen harten lokalen Audit für den fertigen statischen Seiten-Build.

## Quellen

- Aktueller Stand: `index.html`
- Vorhandene Audit-Tools: `tools/image-layout-audit.mjs`, `tools/article-context-audit.mjs`, `tools/startpage-image-context-audit.mjs`
- GEO/SEO-Guide: `C:\Andersen\Webworks\GitHub\Webworks\ClautzGPT\data\context\source\SEO_GEO_AVO_AGENT_VISIBILITY_GUIDE.md`

## Arbeitsmodus

Read-only auditieren. Keine Dateien ändern, nicht committen, nicht pushen. Keine Websuche, kein Serverstart, kein Server-Restart.

## Prüffragen

- Wie prüft man lokal, dass alle echten Seiten existieren, 200-artig per Datei erreichbar sind und keine Hash-Links als Hauptnavigation übrig bleiben?
- Wie prüft man eindeutige H1, Title, Description, Canonical und JSON-LD pro Seite?
- Wie prüft man interne Links, Asset-Pfade und Sitemap-Konsistenz?
- Welche bestehenden Playwright-Audits müssen von `index.html#route` auf echte Pfade umgestellt werden?

## Ergebnis

Liefere:

- Audit-Checkliste.
- konkrete Testfälle.
- Vorschlag für ein `tools/static-pages-audit.mjs`.
- P0-Kriterien, bei denen der Build nicht abgenommen werden darf.
