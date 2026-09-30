# Prüfauftrag: Quizfragen gegen die Quellseiten prüfen und korrigieren

Projekt (nur lesen): C:/Andersen/Webworks/GitHub/Webworks/wahre-haustierliebe.de
Regeln für die Fragen: `tools/quiz/SPEC.md` (vollständig lesen).
Bestand (Dubletten vermeiden): `bestand.txt` im Arbeitsordner `tools/quiz/arbeit/`.

Du prüfst EINE Eingabedatei (siehe Auftrag). Für JEDE Frage:
1. Öffne die Seite `<projekt><wikiPath>index.html` und prüfe: Steht die Aussage der richtigen Antwort und der Erklärung wirklich dort? Zahlen exakt wie auf der Seite?
2. Ist die als richtig markierte Antwort eindeutig die beste? Ist KEINE Falschantwort laut Seite ebenfalls richtig oder teilweise richtig? (Häufigster Fehler: ein Distraktor, den die Seite eigentlich empfiehlt.) Bei Mythen: stimmt `correctJaNein` zur Seite?
3. Herausforderung: Ist die richtige Antwort an Länge, Ausführlichkeit oder Ton erkennbar? Optionen auf ähnliche Länge bringen, Distraktoren als plausible Irrtümer formulieren.
4. Sprache: Duden-Rechtschreibung, Kommas (Nebensätze, erweiterte Infinitive), „…“-Anführungszeichen, Halbgeviertstrich bei Zahlspannen ohne Leerzeichen, KEIN Geviertstrich, keine Emojis, Du-Form, warm, nicht belehrend. Die Lektorin liest mit: Sprachfehler sind Bugs.
5. Format laut SPEC (Felder, Kategorien, IDs eindeutig, Mythen ohne options, Sticker nur aus der Liste, sourceRef = https://wahre-haustierliebe.de + wikiPath).
6. difficulty ehrlich.

Korrigiere, was sich korrigieren lässt. Entferne Fragen, die sich nicht belegen lassen, Dubletten zum Bestand oder untereinander, und Fragen, deren Antwort strittig bleibt.

Ausgabe (nur diese zwei Dateien im Arbeitsordner `tools/quiz/arbeit/` schreiben, sonst nichts ändern, keine Git-Operation):
- `geprueft-<paket>.json`: das korrigierte, gültige JSON-Array.
- `review-<paket>.md`: je geänderter oder entfernter Frage eine Zeile: id, was, warum.
Letzte Antwort: Anzahl vorher/nachher, Anzahl korrigiert, entfernt, und die drei wichtigsten Befunde.
