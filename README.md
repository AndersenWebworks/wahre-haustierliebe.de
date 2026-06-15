# wahre-haustierliebe.de

Standalone-Projekt für Wa(h)re Haustierliebe: eine private, werbefreie Aufklärungsseite über verantwortungsvolle Haustierhaltung.

## Aktueller Stand

Die Seite ist seit dem 27.05.2026 keine Hash-SPA mehr. Aus einer gepflegten HTML-Quelle werden echte statische Einzelseiten erzeugt:

- `index.html`
- `mensch/index.html`
- `hunde/index.html`
- `hunde/hund-im-buero/index.html`
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
- `notfall/tierarzt-notdienst/index.html`
- `wissen/index.html`
- `tiere-und-urlaub/index.html`
- `katzen/wildkatzenbaby-gefunden/index.html`
- `noch-nicht-bereit/index.html`
- `kontakt/index.html`
- `impressum/index.html`
- `datenschutz/index.html`

Wichtig: Der aktuelle Tailnet-/Static-Server liefert Unterordner nicht automatisch als Directory Index aus. Deshalb nutzen Canonicals, Sitemap und interne Links für Unterseiten bewusst `slug/index.html` statt nur `slug/`.

Derzeit pausiert: `budgie-brain/index.html` bleibt als `noindex`-Hinweisseite erhalten, ist aber nicht Teil von Navigation, Sitemap, `llms*` oder `/ai/pages.json`.

Neu in Planung: `docs/tier-tamagotchi-konzept.md` hält das spätere Tier-Tamagotchi als Arbeitsunterprojekt von `wahrehaustierliebe.de` fest. Es ist noch nicht live, nicht deploybereit und ersetzt das pausierte Budgie-Brain nicht, sondern dokumentiert die neue Cutout-/Educational-Game-Richtung.

## Quellen

- `src/site-source.html`: gepflegte Hauptquelle der Haustierliebe-Seite.
- `src/budgie-source.html`: pausierte Quelle für die interaktive Budgie-Brain-Seite.
- `docs/tier-tamagotchi-konzept.md`: interne Arbeitsdoku für das geplante Tier-Tamagotchi-Unterprojekt.
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
- `site.webmanifest`
- `llms.txt`
- `llms-full.txt`
- `ai/site.json`
- `ai/pages.json`
- `ai/faq.json`
- `assets/icons/*.png`

Der Build rendert die Seiten zusätzlich mit Playwright vor. Dadurch stehen Hero, Kicker, Verdichtungsmodule, Tabellenlabels und andere JS-verstärkte Bereiche direkt im HTML und sind nicht nur nach clientseitiger Hydration sichtbar. Social-Preview-Bilder kommen aus den echten Website-Bildern: Startseite und Fallbacks nutzen das offizielle Logo, Unterseiten ihr erstes Inhaltsbild.

## GitHub Pages

Die Live-Version läuft statisch über GitHub Pages mit Custom Domain:

```text
wahre-haustierliebe.de
```

Der Pages-Workflow veröffentlicht nicht den gesamten Repo-Root, sondern nur ein öffentliches Artefakt aus `.pages-artifact/`. Dadurch bleiben Quellen, Tools, Referenzen, Screenshots, Worker-Artefakte und interne Projektdokumente außerhalb der ausgelieferten Website.

Vor einem Pages-Deploy müssen die statischen Dateien lokal gebaut und committed sein:

```powershell
node tools/build-static-pages.mjs
node tools/prepare-pages-artifact.mjs
```

Der zweite Befehl ist eine lokale Sichtprüfung des Pages-Artefakts; das Verzeichnis `.pages-artifact/` wird nicht versioniert.

Der Pages-Workflow läuft automatisch bei jedem Push auf `main` und kann zusätzlich manuell gestartet werden. Das Pages-Artefakt übernimmt die öffentlichen Seiten aus `ai/pages.json`, damit neue Unterseiten nicht in einer zweiten Deploy-Liste vergessen werden.

## Kontaktformular

Die Kontaktseite bleibt GitHub-Pages-tauglich und nutzt keinen serverseitigen Mailversand. Das Formular baut per JavaScript einen vorbereiteten `mailto:`-Entwurf an `mail@andersen-webworks.de`. Nutzer prüfen und senden die Mail anschließend in ihrem eigenen E-Mail-Programm.

Dadurch liegen keine SMTP-Zugangsdaten im Repository und es ist kein externer Formdienst nötig. Eine serverseitige Versandbestätigung gibt es bei diesem statischen Weg nicht.

## GEO/SEO/AVO

Die Seitenstruktur folgt dem Clautz-GEO/SEO-Guide:

- echte crawlbare URLs pro Thema
- eigener `<title>`, Meta Description, Canonical und `og:url` pro Seite
- genau ein H1 und ein `main` pro Seite
- interne Links als normale `<a href>` statt Hash-Routing als Hauptnavigation
- Sitemap und Robots-Datei
- `llms.txt`, `llms-full.txt` und maschinenlesbare `/ai/*.json`
- JSON-LD pro Seite, sichtbar gedeckt durch den Seiteninhalt
- vollständige Open-Graph- und X/Twitter-Card-Tags pro Seite
- 1200x630-Social-Cards mit offiziellem Logo, Fallback-Logo-Card für Startseite und ungezielte Seiten
- App-/Favicon-Metadaten mit Manifest und lokalen PNG-Icons

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

`assets/images/` enthält lokale Kopien von Wikimedia-Commons-Bildern und die lokalen Markenassets. Jedes verwendete Bild ist in `assets/image-credits.json` mit Quelle, Lizenz, Urheber und Einsatzort dokumentiert. Der Pflegevertrag steht in `assets/IMAGE-LICENSES.md`. Zusätzlich stehen sichtbare Bildnachweise im Footer der öffentlichen Seiten.

Seit 03.06.2026 werden keine bewusst eingesetzten Bilder mit erkennbaren Menschen, Gesichtern, Körpern oder Händen mehr verwendet. Neue Personenmotive brauchen vor Einsatz eine separate Prüfung der Persönlichkeitsrechte und eine klare Freigabe.

Verwendete Lizenzen: Public domain, CC0, CC BY 2.0, CC BY 4.0, CC BY-SA 2.0, CC BY-SA 2.5, CC BY-SA 3.0, CC BY-SA 4.0, FAL.

## Abgrenzung

- `vermehrer` ist Archiv und wird für dieses Projekt nicht verändert.
- Die Dateien `v2` und `v4` liefern Designmuster, nicht den Zielcontent.
- Der Content kommt aus Annemaries migrierter Version.
- Der Designmix übernimmt nur visuelle Muster aus `v2` und `v4`: warme Wissensseite, starke Startseite, Karten, Artikel-Lesbarkeit, Hinweise, Tabellen und CTA-Flächen.
- Worker-Issues dokumentieren Audit- und Migrationsslices; Integration, Prüfung, Commit und Push passieren zentral.
