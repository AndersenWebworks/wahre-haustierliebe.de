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

`assets/images/` enthält lokale Kopien von Wikimedia-Commons-Bildern (31 Dateien, davon aktuell 30 im HTML verwendet). Jedes verwendete Bild ist in `assets/image-credits.json` mit Quellenangabe, Lizenz, Urheber und Einsatzort dokumentiert. Zusätzlich stehen sichtbare Bildnachweise im Footer von `index.html`, weil README/JSON allein für CC-/FAL-Bilder nicht reicht. Verwendete Lizenzen: Public domain, CC0, CC BY 2.0, CC BY 4.0, CC BY-SA 2.0, CC BY-SA 2.5, CC BY-SA 3.0, CC BY-SA 4.0, FAL.

Bildverwendung auf der Startseite:
- Hero: großes Commons-Foto mit Mensch-Tier-Moment im Tierheim plus Zahlen-/Teilen-Panel. Kein Gebäude-Ersatzbild und kein Logo-Tier.
- Logo-Marke (Header): neutrales typografisches Markenzeichen, kein einzelnes Tierfoto.
- Statistik-Badges: abstrakte, nicht-tierdominante Marker statt zufälliger Tierfotos.
- Einstiegskarten: v4-artige Doorway-Karten ohne zufällige Fotos. Die Bilder sitzen stattdessen dort, wo sie eine konkrete Share-Erkenntnis tragen.
- Aha-Karten: drei starke Bild/Text-Paare für stille Katzenprobleme, Kleintierfläche und rechtzeitige Tierarzthilfe.
- Tierarten-Grid: wo möglich Haltungskontext statt bloßer Porträts.
- „Noch nicht bereit"-Karten: Hilfswege ohne eigenes Tier werden mit passenden Situationsbildern gezeigt.
- Unterseiten: jede Route erhält ein eigenes Hero-Bild mit klarer emotionaler Aufgabe für Wissensaufbau und Teilen. Im aktuellen HTML kommt keine Bilddatei mehrfach vor.
- `tools/image-layout-audit.mjs`: Playwright-Audit für Desktop und Mobile. Er erstellt Screenshots unter `screenshots/image-audit/` und meldet fehlende Hero-Bilder, bildlose Seiten, starke Crops, sichtbare Bildwiederholungen pro Seite, globale Bildquellen-Duplikate im HTML, fehlende lokale Bilddateien, fehlende Credits und horizontales Overflow.
- `tools/startpage-image-context-audit.mjs`: Playwright-Audit für die Startseite. Er erstellt Kontakt-Screenshots von Hero, Doorway-Karten, Aha-Karten, Tierarten-Grid und Teilen-Zone unter `screenshots/startpage-context-audit/` und prüft, ob jedes Bild einen sichtbaren Kontext, einen Zweck, einen Share-Grund und keine sichtbare Wiederholung hat.
- `tools/article-context-audit.mjs`: Playwright-Audit für alle Unterseiten. Er erstellt Kontakt-Screenshots von Hero und erstem Verdichtungsmodul unter `screenshots/article-context-audit/` und prüft Article-Hero-Metadaten, mindestens ein v2/v4-artiges Verdichtungsmodul pro Unterseite, Bild-Captions, Crops, sichtbare Bildduplikate und horizontales Overflow.

## Arbeitsstand 21.05.2026

- `index.html` ist die aktuelle Arbeitsbasis.
- Übernommen sind ein warmer V2/V4-Designmix für Header, Hero, Statistikbereich, Einstiegskarten, Tierartenkarten, Inhaltsseiten, Tabellen, Hinweisboxen, Selbsttest, Share-Leisten und Footer.
- Die Wissensseite nutzt jetzt eine V4-inspirierte Mythen-Suche, aber mit Annemaries migriertem Content.
- Der Startseiten-Hash wird nicht mehr in die URL geschrieben, damit mobile Browser nicht unter den Sticky Header scrollen.
- Worker Issue 001 (zweiter Durchlauf): Emoji-Badges aus Tierartenkarten (HTML), Statistik-Badges (CSS `::before`) und Logo-Marke (CSS `::before`) vollständig entfernt. Einstiegskarten und Tierartenkarten nutzen jetzt lokale Wikimedia-Bilder, Warnzeichen wurden aus der Notfall-Einstiegskarte entfernt. Bild-Höhe in Tierartenkarten auf 110 px erhöht, Trennlinie unter Bild ergänzt. Die vier „Noch nicht bereit"-Karten nutzen ebenfalls Bildmedien statt Emoji-Köpfe.
- Bildstrategie-Nachzug: Bilder werden nicht mehr nach Tierart-Abdeckung gewählt, sondern nach Share-Wirkung. Ziel ist Wissensweitergabe, nicht Spenden, Verkauf oder niedliche Haustierästhetik. Startseiten-Pilot 3 folgt stärker v2/v4: große Hero-Fläche, klare Doorway-Karten, drei bildgestützte Aha-Karten, höherwertige Tierkarten und eine fokussierte Teilen-Zone ohne recyceltes Foto.
- Worker-Integration 22.05.2026: Unterseiten bekommen eine erste Verdichtungsschicht aus v2/v4-artigen Modulen: Metrik-Karten, Mythos/Fakt-Paare, Quote-Bänder, Signal-Karten, Entscheidungs- und Share-Callouts. Article-Heros haben jetzt maschinenlesbaren Bildzweck, Share-Grund und sichtbare Captions. Neue Bildslots bleiben streng eindeutig; wenn kein gutes eigenes Commons-Motiv vorhanden ist, wird ein Text-/Faktenmodul statt eines Ersatzbildes genutzt.
