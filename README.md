# wahre-haustierliebe.de

Standalone-Projekt für Wa(h)re Haustierliebe: eine private, werbefreie Aufklärungsseite über verantwortungsvolle Haustierhaltung.

## Aktueller Stand

Die Seite ist seit dem 27.05.2026 keine Hash-SPA mehr. Aus einer gepflegten HTML-Quelle werden echte statische Einzelseiten erzeugt:

- `index.html`
- `mensch/index.html`
- `hunde/index.html`
- `katzen/index.html`
- `voegel/index.html`
- `kleintiere/index.html`
- `exoten/index.html`
- `pferde/index.html`
- `kastration/index.html`
- `qualzucht/index.html`
- `adoption/index.html`
- `selbsttest/index.html`
- `notfall/index.html`
- `wissen/index.html`
- `noch-nicht-bereit/index.html`
- `budgie-brain/index.html`

Wichtig: Der aktuelle Tailnet-/Static-Server liefert Unterordner nicht automatisch als Directory Index aus. Deshalb nutzen Canonicals, Sitemap und interne Links für Unterseiten bewusst `slug/index.html` statt nur `slug/`.

## Quellen

- `src/site-source.html`: gepflegte Hauptquelle der Haustierliebe-Seite.
- `src/budgie-source.html`: Quelle für die interaktive Budgie-Brain-Seite.
- `references/content/annemarie-content-source.html`: unveränderte Content-Quelle aus der migrierten Annemarie-Version.
- `references/design/Wahre Haustierliebe v2 standalone.html`: Designreferenz.
- `references/design/Wahre Haustierliebe v4 standalone.html`: Designreferenz.
- `references/design/extracted/v2.html`: entpackte Lesekopie der v2-Designreferenz.
- `references/design/extracted/v4.html`: entpackte Lesekopie der v4-Designreferenz.

## Build

Der Generator baut aus den Quellen die öffentlichen HTML-Seiten, CSS-/JS-Assets und GEO/SEO-Dateien:

```powershell
node tools/build-static-pages.mjs
```

Er erzeugt oder aktualisiert:

- echte HTML-Seiten pro Thema
- `assets/site.css`
- `assets/site.js`
- `sitemap.xml`
- `robots.txt`
- `llms.txt`
- `llms-full.txt`
- `ai/site.json`
- `ai/pages.json`
- `ai/faq.json`

Der Build rendert die Seiten zusätzlich mit Playwright vor. Dadurch stehen Hero, Kicker, Verdichtungsmodule, Tabellenlabels und andere JS-verstärkte Bereiche direkt im HTML und sind nicht nur nach clientseitiger Hydration sichtbar.

## GitHub Pages

Die geplante Live-Version läuft statisch über GitHub Pages mit Custom Domain:

```text
wahre-haustierliebe.de
```

Der Pages-Workflow veröffentlicht nicht den gesamten Repo-Root, sondern nur ein öffentliches Artefakt aus `.pages-artifact/`. Dadurch bleiben Quellen, Tools, Referenzen, Screenshots und Worker-Artefakte außerhalb der ausgelieferten Website.

Vor einem Pages-Deploy müssen die statischen Dateien lokal gebaut und committed sein:

```powershell
node tools/build-static-pages.mjs
node tools/prepare-pages-artifact.mjs
```

Der zweite Befehl ist eine lokale Sichtprüfung des Pages-Artefakts; das Verzeichnis `.pages-artifact/` wird nicht versioniert.

Der Pages-Workflow ist bis zur GitHub-Pages-Aktivierung bewusst nur manuell auslösbar. Nach der Umstellung in den Repository-Settings kann der Workflow manuell gestartet oder wieder auf Push-Deploy erweitert werden.

## GEO/SEO/AVO

Die Seitenstruktur folgt dem Clautz-GEO/SEO-Guide:

- echte crawlbare URLs pro Thema
- eigener `<title>`, Meta Description, Canonical und `og:url` pro Seite
- genau ein H1 und ein `main` pro Seite
- interne Links als normale `<a href>` statt Hash-Routing als Hauptnavigation
- Sitemap und Robots-Datei
- `llms.txt`, `llms-full.txt` und maschinenlesbare `/ai/*.json`
- JSON-LD pro Seite, sichtbar gedeckt durch den Seiteninhalt

Es wird keine künstliche Autoritätsrolle behauptet. Deshalb gibt es kein pauschales `publisher: Organization` in den WebPage-Schemata und keine FAQPage-Auszeichnung ohne sichtbaren FAQ-Block.

## Audits

Nach Änderungen mindestens ausführen:

```powershell
node tools/build-static-pages.mjs
node tools/static-pages-audit.mjs
node tools/layout-consistency-audit.mjs
node tools/image-layout-audit.mjs
node tools/article-context-audit.mjs
node tools/startpage-image-context-audit.mjs
```

Die Audits prüfen unter anderem:

- echte Dateien und interne Links
- Metadaten, Canonicals, OpenGraph und JSON-LD
- Sitemap, Robots, `llms-full.txt` und `/ai/*.json`
- fehlende Assets und Bildcredits
- konsistente Paddings, Margins, Textbreiten, Tabellenbreiten und Section-Rhythmik
- horizontales Overflow auf Desktop und Mobile
- Artikel-Heros, Bildkontext und v2/v4-artige Verdichtungsmodule
- Startseiten-Hero, Doorway-Karten, Aha-Karten, Tierarten-Grid und Teilen-Zone

Screenshots aus Audits liegen unter `screenshots/` und werden nicht versioniert.

## Bilder und Credits

`assets/images/` enthält lokale Kopien von Wikimedia-Commons-Bildern und das lokale Markenasset. Jedes verwendete Bild ist in `assets/image-credits.json` mit Quelle, Lizenz, Urheber und Einsatzort dokumentiert. Zusätzlich stehen sichtbare Bildnachweise im Footer der öffentlichen Seiten.

Verwendete Lizenzen: Public domain, CC0, CC BY 2.0, CC BY 4.0, CC BY-SA 2.0, CC BY-SA 2.5, CC BY-SA 3.0, CC BY-SA 4.0, FAL.

## Abgrenzung

- `vermehrer` ist Archiv und wird für dieses Projekt nicht verändert.
- Die Dateien `v2` und `v4` liefern Designmuster, nicht den Zielcontent.
- Der Content kommt aus Annemaries migrierter Version.
- Der Designmix übernimmt nur visuelle Muster aus `v2` und `v4`: warme Wissensseite, starke Startseite, Karten, Artikel-Lesbarkeit, Hinweise, Tabellen und CTA-Flächen.
- Worker-Issues dokumentieren Audit- und Migrationsslices; Integration, Prüfung, Commit und Push passieren zentral.
