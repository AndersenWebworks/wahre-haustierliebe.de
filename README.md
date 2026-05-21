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

## Bilder und Credits

`assets/images/` enthält lokale Kopien von Wikimedia-Commons-Bildern (8 Dateien). Jedes Bild ist in `assets/image-credits.json` mit Quellenangabe, Lizenz und Urheber dokumentiert. Zusätzlich stehen sichtbare Bildnachweise im Footer von `index.html`, weil README/JSON allein für CC-/FAL-Bilder nicht reicht. Verwendete Lizenzen: Public Domain, CC BY 3.0, CC BY 4.0, CC BY-SA 3.0, CC BY-SA 4.0, FAL.

Bildverwendung auf der Startseite:
- Hero: `hund-labrador-portrait.jpg`
- Logo-Marke (Header): `hund-labrador-portrait.jpg` (CSS-Kreis)
- Statistik-Badges (CSS `::before`): Kaninchen → Katze → neutraler Nicht-Emoji-Marker
- Einstiegskarten: Katze (Überlegungsphase), Hund (Haltungsinfos), Warnsymbol (Notfall, kein Bild)
- Tierarten-Grid: je ein Foto pro Tierart, Emoji-Badges vollständig entfernt
- „Noch nicht bereit"-Karten: Bildmedien statt Emoji-Köpfe, mit vorhandenen Commons-Dateien.
- Unterseiten: jede Route erhält ein echtes Hero-Bild aus der Commons-Bildschicht. Sonderseiten nutzen passendere Motive, unter anderem Mops für Qualzucht und Tierheimhund für Adoption.
- `tools/image-layout-audit.mjs`: Playwright-Audit für Desktop und Mobile. Er erstellt Screenshots unter `screenshots/image-audit/` und meldet fehlende Hero-Bilder, bildlose Seiten, starke Crops und horizontales Overflow.

## Arbeitsstand 21.05.2026

- `index.html` ist die aktuelle Arbeitsbasis.
- Übernommen sind ein warmer V2/V4-Designmix für Header, Hero, Statistikbereich, Einstiegskarten, Tierartenkarten, Inhaltsseiten, Tabellen, Hinweisboxen, Selbsttest, Share-Leisten und Footer.
- Die Wissensseite nutzt jetzt eine V4-inspirierte Mythen-Suche, aber mit Annemaries migriertem Content.
- Der Startseiten-Hash wird nicht mehr in die URL geschrieben, damit mobile Browser nicht unter den Sticky Header scrollen.
- Worker Issue 001 (zweiter Durchlauf): Emoji-Badges aus Tierartenkarten (HTML), Statistik-Badges (CSS `::before`) und Logo-Marke (CSS `::before`) vollständig entfernt und durch lokale Wikimedia-Bilder ersetzt. Einstiegskarten 1 und 2 nutzen jetzt Bildthumbnails statt Emoji-Kreise. Warnzeichen (⚠) in Karte 3 bleibt als UI-Symbol erhalten. Bild-Höhe in Tierartenkarten auf 110 px erhöht, Trennlinie unter Bild ergänzt. Die vier „Noch nicht bereit"-Karten nutzen ebenfalls Bildmedien statt Emoji-Köpfe.
