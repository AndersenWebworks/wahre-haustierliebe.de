# Auftrag: neue Quizfragen für die WHL-Quiz-PWA

Projekt: `C:/Andersen/Webworks/GitHub/Webworks/wahre-haustierliebe.de`
Kanonischer Katalog (nur lesen, NICHT ändern): `pwa/data/questions.js`
Pflegeregeln (lesen): `pwa/PFLEGE.md`
Bestehende Fragen (nicht doppeln): `bestand.txt` im Arbeitsordner (erzeugt mit `node tools/quiz/bestand.mjs`)

## Ziel
Aus den dir zugewiesenen Wiki-Seiten neue Quizfragen schreiben. Die PWA ist ein kostenloses Lern-Quiz als Werbung für die Seite: verspielt, warm, nicht belehrend, aber eine echte Herausforderung. Das Wissen steht auf der Seite; das Quiz macht Lust, dort weiterzulesen.

## Quelle
Jede Seite liegt als `<pfad>/index.html` im Projekt. Lies den sichtbaren Text (auch FAQ, Tabellen, Mythos/Fakt-Boxen). Jede Aussage in Frage, richtiger Antwort und Erklärung muss auf DIESER Seite stehen. Kein Modellwissen, keine Zahlen, die nicht auf der Seite stehen. Keine lokalen Vereinsdaten oder Spendenaufrufe als Quizstoff.

## Menge
Pro Seite 3–5 Fragen, je nach Stoff. Pro Seite möglichst mindestens 1 Klassisch und 1 Mythen-Check; Fall-Entscheidung, wo die Seite eine Alltagssituation mit richtigem Handeln hergibt. Übersichtsseiten (z. B. `/hunde/`) nur, wenn sie eigenen Stoff haben.

## Format
Schreibe EINE Datei `neu-<paket>.json` in den Arbeitsordner `tools/quiz/arbeit/`: ein JSON-Array von Objekten.

Klassisch / Fall (vier Karten):
{"id":"<kategorie>-<thema>-<nnn>","mode":"klassisch"|"fall","interaktion":"vierKarten","category":"<kat>","difficulty":"leicht"|"mittel"|"knifflig","text":"…","options":["…","…","…","…"],"correctIndex":0-3,"explanation":"…","wikiPath":"/pfad/","sourceRef":"https://wahre-haustierliebe.de/pfad/","sticker":["…"]}
`sticker` nur bei mode "fall", 1–2 Namen aus: pfote, blatt, sonne, piepmatz, kralle, feder, flosse, hund, katze, welli, meeri, halsband, fenster, kaefig, napf.

Mythen-Check (Stimmt / Stimmt nicht):
{"id":"mythen-<thema>-<nnn>","mode":"mythen","interaktion":"jaNein","correctJaNein":true|false,"category":"<kat>","difficulty":"…","text":"„Aussage.“","explanation":"…","wikiPath":"/pfad/","sourceRef":"https://wahre-haustierliebe.de/pfad/"}
Kein `options`, kein `correctIndex`. Text ist NUR die Aussage in deutschen Anführungszeichen „…“, ohne „Stimmt das?“.

Kategorien: hunde, katzen, kleintiere, voegel, exoten, pferde, tierschutz (tierschutz = tierartübergreifende Seiten wie Adoption, Qualzucht, Notfall, Zucht, Urlaub; wenn eine allgemeine Seite klar eine Tierart betrifft, nimm die Tierart).

## Qualität (wichtig)
- Herausforderung: Die richtige Antwort darf NICHT an Länge, Ausführlichkeit oder „vernünftigem Ton“ erkennbar sein. Alle vier Optionen ähnlich lang (±15 Zeichen), gleich gebaut, jede Falschantwort ein plausibler, verbreiteter Irrtum. Keine Scherz- oder Unsinnsantworten, kein „schlagen oder streicheln“.
- Richtige Antwort über die Fragen hinweg auf verschiedene Positionen verteilen (0–3).
- Mythen: gut gemischt, etwa 40–50 % `true`. Gute Mythen sind verbreitete Irrtümer („Kleintiere sind gute Einstiegstiere“) oder überraschende wahre Fakten.
- Zahlenfragen sind gut, wenn die Zahl auf der Seite steht und die Falschzahlen plausibel sind.
- difficulty ehrlich: leicht = Grundwissen, mittel = braucht Nachdenken, knifflig = Detailwissen von der Seite. Ungefähr ein Drittel je Stufe.
- Erklärung 1–3 Sätze, warm, konkret, ohne erhobenen Zeigefinger, ohne „Wusstest du“. Sie nennt den Grund, nicht nur das Ergebnis.
- Fragetext kurz und konkret, gern eine kleine Alltagsszene. Du-Form.
- Sprache: Deutsch nach Duden, echte Umlaute und ß, Komma vor Nebensätzen und erweiterten Infinitiven, Anführungszeichen „…“, Zahlspannen mit Halbgeviertstrich ohne Leerzeichen (2–3), niemals Geviertstrich (—), keine Emojis. Die Lektorin liest mit: Sprachfehler sind Bugs.
- Keine Doppelung zu `bestand.txt` (gleiche Aussage anders formuliert zählt als Doppelung).
- IDs eindeutig, Schema wie oben, Zählung ab der nächsten freien Hunderterstufe (Bestand prüfen, z. B. `hunde-kosten-201`), damit nichts mit dem Bestand kollidiert.

## Abnahme
- Datei ist gültiges JSON (prüfe mit `node -e "JSON.parse(require('fs').readFileSync('<datei>','utf8'))"`).
- Jeder wikiPath existiert als `<projekt><wikiPath>index.html`.
- Am Ende kurze Rückmeldung: Anzahl je Modus, je Kategorie, Anteil true bei Mythen, und Seiten, zu denen du bewusst nichts geschrieben hast (mit Grund).
- Du änderst KEINE Projektdateien, kein Git. Du schreibst nur deine eine JSON-Datei in den Arbeitsordner.
