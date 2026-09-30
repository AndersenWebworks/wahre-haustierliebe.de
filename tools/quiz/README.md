# Quiz-Werkzeuge

Werkzeuge für den Fragenkatalog der Quiz-PWA (`pwa/data/questions.js`). Alle Befehle laufen aus dem Projektordner. Zwischenstände landen in `tools/quiz/arbeit/` (per `.gitignore` ausgeschlossen).

| Datei | Zweck |
| --- | --- |
| `merge.mjs` | Prüft den Katalog und optional neue Pakete: Pflichtfelder, existierende Wiki-Pfade, Dubletten, Geviertstriche, Zahlspannen, Redaktionssprache („laut Seite“), Längen-Hinweis und Verteilung. Mit `--write --version …` schreibt es den Katalog sortiert neu. |
| `bestand.mjs` | Schreibt `arbeit/bestand.txt` mit allen vorhandenen Fragen, damit neue Pakete nichts doppeln. |
| `lektorat.mjs` | Erzeugt `docs/quiz-lektorat.md` für das Lektorat. |
| `extract.cjs` | Zieht den sichtbaren Text von Wiki-Seiten: `node tools/quiz/extract.cjs tools/quiz/arbeit hunde/kosten katzen/kastration` |
| `show.cjs` | Zeigt ein Paket lesbar an: `node tools/quiz/show.cjs tools/quiz/arbeit/final-hunde.json` |
| `patch.cjs` | Ändert oder entfernt einzelne Fragen per JSON-Liste `[{ "id": "…", "text": "…" }, { "id": "…", "remove": true }]`. |
| `sol.sh` | Startet einen Sol-6.1-Lauf per `codex exec` mit leerem stdin. |
| `SPEC.md` | Auftrag zum Schreiben neuer Fragen. |
| `REVIEW.md` | Auftrag zum Prüfen eines Pakets gegen die Quellseiten. |
| `CLEANUP.md` | Auftrag zum Entfernen von Quellverweisen, ohne Fakten zu ändern. |

## Ablauf für neue Fragen

1. `node tools/quiz/bestand.mjs`
2. Fragen schreiben lassen: pro Themenpaket ein Lauf mit `SPEC.md` und einer Seitenliste, Ausgabe `arbeit/neu-<paket>.json`.
3. Jedes Paket in einem frischen Lauf prüfen lassen: `bash tools/quiz/sol.sh review-<paket> "Lies tools/quiz/REVIEW.md und tools/quiz/SPEC.md und befolge REVIEW.md. Paket: <paket>. Eingabe: tools/quiz/arbeit/neu-<paket>.json."`
4. Nachbesserung: `bash tools/quiz/sol.sh cleanup-<paket> "Lies tools/quiz/CLEANUP.md und befolge es. Paket: <paket>. Eingabe: tools/quiz/arbeit/geprueft-<paket>.json."`
5. Selbst lesen (`show.cjs`), einzelne Fragen mit `patch.cjs` korrigieren.
6. `node tools/quiz/merge.mjs tools/quiz/arbeit/final-*.json` muss „Probleme 0“ melden.
7. `node tools/quiz/merge.mjs --write --version YYYY-MM-DD.N tools/quiz/arbeit/final-*.json`
8. `node tools/quiz/lektorat.mjs`, im Browser eine Runde spielen, committen, pushen.

Erfahrungen aus der ersten Runde (30.09.2026): Von 298 Rohfragen blieben nach der Prüfung 243. Der häufigste Fehler war ein Distraktor, den die Quellseite eigentlich empfiehlt. Die Meldung „426 Upgrade Required“ am Anfang eines Sol-Laufs ist harmlos.
