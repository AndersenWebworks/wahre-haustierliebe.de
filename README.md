# wahre-haustierliebe.de

Neues sauberes Projekt für die Standalone-Version von Wa(h)re Haustierliebe.

## Quellen

- `index.html`: aktueller Arbeitsstand. Startet mit Annemaries migrierter Content-Version.
- `references/content/annemarie-content-source.html`: unveränderte Content-Quelle aus `ClautzGPT/public/wahre-haustierliebe.html`.
- `references/design/Wahre Haustierliebe v2 standalone.html`: reine Designreferenz.
- `references/design/Wahre Haustierliebe v4 standalone.html`: reine Designreferenz.
- `references/design/extracted/v2.html`: entpackte Lesekopie der v2-Designreferenz.
- `references/design/extracted/v4.html`: entpackte Lesekopie der v4-Designreferenz.

## Abgrenzung

- `vermehrer` ist Archiv und wird für dieses Projekt nicht verändert.
- Die Dateien `v2` und `v4` liefern nur Designideen, nicht den Zielcontent.
- Der Content kommt aus Annemaries migrierter Version.
- Der Designmix übernimmt nur visuelle Muster aus `v2` und `v4`: warme Wissensseite, starke Startseite, Karten, Artikel-Lesbarkeit, Hinweise, Tabellen und CTA-Flächen.
- Routing, IDs, Selbsttest, Glossar, Share-Funktionen und Annemaries Content bleiben aus `index.html`.
- `screenshots/` ist lokale Prüfevidenz und wird nicht versioniert.

## Arbeitsstand 21.05.2026

- `index.html` ist die aktuelle Arbeitsbasis.
- Übernommen sind ein warmer V2/V4-Designmix für Header, Hero, Statistikbereich, Einstiegskarten, Tierartenkarten, Inhaltsseiten, Tabellen, Hinweisboxen, Selbsttest, Share-Leisten und Footer.
- Die Wissensseite nutzt jetzt eine V4-inspirierte Mythen-Suche, aber mit Annemaries migriertem Content.
- Der Startseiten-Hash wird nicht mehr in die URL geschrieben, damit mobile Browser nicht unter den Sticky Header scrollen.
- Claude-Worker konnte in dieser Session nicht laufen, weil die lokale Claude-CLI `Invalid API key` gemeldet hat. Die Designextraktion wurde deshalb direkt aus den lokalen Referenzdateien gemacht.
- Kein ClautzGPT-Wiki-Update: Es wurde kein ClautzGPT-Code geändert, sondern nur dieser externe Zielordner.
