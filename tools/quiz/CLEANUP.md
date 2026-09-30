# Nachbesserung: Quellverweise aus Quizfragen entfernen

Die Fragen sind fachlich geprüft. Es geht NUR noch um Redaktionssprache: Ein Quiz spricht nicht über seine Quelle. Formulierungen wie „laut Seite“, „die Seite nennt“, „der Text empfiehlt“, „die Tabelle nennt“, „laut Checkliste“, „laut Kostenübersicht“, „die Zeitachse nennt“, „der Notfallplan nennt“ und jedes „nennt/nennen“ mit Bezug auf die Quelle werden zu direkten Aussagen oder Fragen umformuliert.

Beispiele:
- „Welche Lebenserwartung nennt die Seite für europäische Landschildkröten?“ → „Wie alt können europäische Landschildkröten werden?“
- „Die Seite nennt mindestens 200 Liter und bevorzugt Teichhaltung.“ → „Goldfische brauchen mindestens 200 Liter, besser noch einen Teich.“
- „Boxenhaltung ist laut Seite nur mit … vertretbar.“ → „Boxenhaltung ist nur mit … vertretbar.“
- Eine Aussage über die Quelle selbst („Für den Hufschmied nennt die Kostentabelle einen Rhythmus von 6–8 Wochen.“) wird zur Sachaussage („Der Hufschmied kommt in der Regel alle 6–8 Wochen.“).
- Wo eine Zahl nur eine Einschätzung einer Organisation ist, nenne die Organisation (z. B. „Der Deutsche Tierschutzbund empfiehlt …“), nicht „die Seite“.

Regeln:
- Fakten, Zahlen, richtige Antwort, correctIndex, correctJaNein, IDs, Kategorien, Pfade und Schwierigkeit NICHT ändern.
- Nach der Umformulierung muss die Frage eindeutig bleiben. Optionen ähnlich lang halten (±15 Zeichen), die richtige Antwort darf nicht durch die Umformulierung auffallen.
- Deutsch nach Duden, „…“, Halbgeviertstrich bei Zahlspannen ohne Leerzeichen, kein Geviertstrich, Du-Form.
- Alles andere bleibt Wort für Wort gleich.

Prüfen: `node tools/quiz/merge.mjs tools/quiz/arbeit/<deine-ausgabedatei>` im Projektordner. Es muss „Probleme 0“ melden. Das Skript nicht ändern.

Ausgabe: `final-<paket>.json` im Arbeitsordner `tools/quiz/arbeit/` (nur diese Datei schreiben, keine Git-Operation, Projekt nur lesen). Letzte Antwort: Anzahl geänderter Fragen und Ergebnis des Prüfskripts.
