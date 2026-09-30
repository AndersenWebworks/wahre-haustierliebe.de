# Handoff: WHL-Quiz (PWA) – Stand 30.09.2026

**Auftrag für diese Sitzung: noch nicht loslegen.** Lies dich ein, bestätige kurz, dass du den Stand kennst, und warte auf den nächsten Auftrag von Erik.

## Worum es geht

Kostenlose Lern-Quiz-PWA als Werbung für wahre-haustierliebe.de. Die Website ist die Substanz, das Quiz macht neugierig und führt nach jeder Antwort in den passenden Wiki-Artikel. Ton: verspielt und warm wie die Seite, nicht belehrend, aber eine echte Herausforderung. Kein Tracking, keine Werbung, kein Server. Die PWA ist Beta: erreichbar unter https://wahre-haustierliebe.de/pwa/, aber per `robots.txt` gesperrt und weder in Sitemap noch in `ai/pages.json` oder `llms.txt`.

Ursprung und Konzept: Webchat-Sitzung „Wa(h)re Haustier(liebe): WHL-Quizduell entwickeln“ (21./22.09.2026). Vorlage war das Quizduell in ClautzGPT, übernommen wurde nur, was zu WHL passt: kein Speed-Bonus, kein Multiplayer, keine Casino-Toasts.

## Wo alles liegt

Repo: `C:/Andersen/Webworks/GitHub/Webworks/wahre-haustierliebe.de`, Branch `main`, Deploy = Push (GitHub Pages über `.github/workflows/pages.yml`). Für dieses Projekt ist automatisches Pushen nach geprüften Änderungen freigegeben.

- `pwa/PFLEGE.md` – Pflegeanleitung, Fragenschema, Regeln. Zuerst lesen.
- `pwa/data/questions.js` – Fragenkatalog (Single Source of Truth), Version `2026-09-30.4`, 280 Fragen: 122 Klassisch, 115 Mythen-Check, 43 Fall-Entscheidung. Kategorien: hunde, katzen, kleintiere, voegel, exoten, pferde, tierschutz.
- `pwa/data/resultateTexte.js` – Ergebnistexte pro Modus und Stufe.
- `pwa/js/whl.js` – Daten, Storage, Rundenauswahl (10 Fragen, ungesehene zuerst, sortiert leicht → knifflig), Frage-des-Tages-Logik.
- `pwa/js/app.js` – Startseite (Modus, Thema mit Poolgröße, Highscore, bester Run).
- `pwa/js/daily.js` – Frage des Tages mit Tagesserie.
- `pwa/js/quiz.js` – Quiz-Ablauf, Tap-Moment, Timer (pausiert im Hintergrund).
- `pwa/js/share.js` – Ergebnisseite, Artikelliste (falsch Beantwortetes zuerst), „Noch eine Runde“.
- `pwa/js/sticker.js`, `pwa/sticker/` – Sticker. Neue Themen nutzen vorhandene Sticker (Flosse, Blatt, Pfote).
- `pwa/sw.js` – Service Worker, network-first mit Offline-Cache (`whl-pwa-v5`). `CACHE_VERSION` nur erhöhen, wenn sich `APP_SHELL` ändert.
- `docs/quiz-lektorat.md` – Lektoratsliste aller Fragen für Annemarie (nicht öffentlich ausgeliefert), neu erzeugen mit `node tools/quiz/lektorat.mjs`.
- `tools/quiz/` – Werkzeuge und Briefings für neue Fragen, siehe `tools/quiz/README.md`.
- Website-Quelle: `src/site-source.html`, Generator `tools/build-static-pages.mjs`, Pages-Artefakt `tools/prepare-pages-artifact.mjs`. Build und Audits laut `README.md`.

## Was in der Session vom 30.09. passiert ist

1. Fehler behoben: Blockade bei „Bewegung reduzieren“, falsch gewertete Mythen-Frage, falscher Vorher-Highscore, unsichtbare Themenkarte, stiller Themenwechsel bei leeren Pools, Timer-Ring-Darstellung, abgeschnittenes Logo.
2. Service Worker auf network-first umgestellt: Nach einem Deploy bleibt keine alte Fassung mehr hängen (Eriks Cache-Bust-Wunsch).
3. Katalog von 43 auf 280 Fragen ausgebaut, aus rund 70 Wiki-Seiten. Ablauf: vier `clautz-worker`-Pakete plus ein Sol-6.1-Paket, danach je ein frischer Sol-6.1-Prüflauf gegen die Quellseiten, dann eine Sol-Nachbesserung gegen Redaktionssprache („laut Seite“), zuletzt eigene Durchsicht. 55 Rohfragen wurden verworfen.
4. Frage des Tages, neue Themen Exoten/Pferde/Tierschutz, 10er-Runden.
5. Website korrigiert: Pferde-Checkliste 340–920 € im Monat, Prostata-Aussage präzisiert mit Quelle (Ruetten et al. 2021). Hundekosten hat Erik danach selbst aus der Kostentabelle nachgeschärft (Commit `c85aa05`): etwa 100–240 € im Monat mit Krankenversicherung, über zwölf Jahre mit Anschaffung rund 14.000–37.000 €, im Mittel etwa 26.000 €, Notfälle nicht eingerechnet. Das ist der gültige Stand, auch im Quiz.
6. Separate Aufgabe hat Quelle und Generator auf den veröffentlichten Stand gebracht (Commit `81492f4`), damit ein Build nichts mehr zurückbaut.

## Erkenntnisse für die Weiterarbeit

- **Qualitätsregeln für Fragen** (auch in `PFLEGE.md`): jede Aussage muss auf der verlinkten Seite stehen; richtige Antwort nicht an Länge oder Ton erkennbar; Falschantworten sind plausible Irrtümer, nie teilweise richtig; Mythen etwa halb „Stimmt“, halb „Stimmt nicht“; kein „laut Seite“, „die Tabelle nennt“ o. Ä. im Quiztext; Duden, „…“, Halbgeviertstrich bei Zahlspannen, kein Geviertstrich.
- **Häufigster Fehler beim Fragenschreiben:** ein Distraktor, den die Quellseite eigentlich empfiehlt. Deshalb jede Frage gegen die Seite prüfen lassen.
- **Werkzeuge:** liegen in `tools/quiz/` (Prüf- und Merge-Skript, Bestands- und Lektoratsliste, Seiten-Extraktor, Patch-Helfer, Sol-Aufruf) mit Ablauf in `tools/quiz/README.md`. Die Briefings für Fragenpakete, Prüfläufe und Nachbesserung sind `SPEC.md`, `REVIEW.md` und `CLEANUP.md` dort.
- **Sol 6.1 per `codex exec`:** immer mit `< /dev/null` starten, sonst hängt der Lauf auf „Reading additional input from stdin“. Die Websocket-Meldung „426 Upgrade Required“ am Start ist harmlos. Kontingent laut Eriks Stand bis einschließlich 03.10.2026.
- **Build:** Seiten nicht direkt in den generierten HTML-Dateien ändern, sondern in `src/site-source.html` bzw. im Generator, sonst driften Quelle und veröffentlichter Stand wieder auseinander. Vor jedem Commit nach einem Build den Diff prüfen, besonders `robots.txt` (PWA-Sperre) und `sitemap.xml`.
- **Selbst gezeichnete Icons:** Erik fand sie schlecht; keine neuen Sticker zeichnen, vorhandene nutzen oder ganz weglassen.

## Offene Punkte (nicht ungefragt anfangen)

- Lektorat durch Annemarie anhand `docs/quiz-lektorat.md`; ihre Korrekturen dann in `questions.js` übernehmen und die Liste neu erzeugen.
- Pferde und Exoten haben noch wenige Fall-Fragen (1 bzw. 2).
- Frage des Tages kann sich ändern, wenn neue Fragen dazukommen (bewusst einfach gehalten).
- Mögliche nächste Ausbaustufen: Fragen aus neuen Wiki-Seiten nachziehen, Teilen-Karte als Bild, später eventuell Aufnahme in die Website-Navigation, wenn die Beta endet.
