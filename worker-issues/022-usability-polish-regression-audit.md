# Worker Issue 022: Usability-Polish und finale Layout-Regression

## Ziel

Führe nach den Layout-/Spacing-/Tabellen-/Farbfixes eine harte UX-Regression aus. Ziel: professionell, konsistent, einladend, gut lesbar, keine sichtbaren Kleinigkeiten wie schiefe Abstände, zu kleine Targets, kaputte Tabellen oder komische Sektionen.

## Seiten

Alle statischen Seiten, Desktop 1440, Narrow 1200, Tablet 820/1024, Mobile 390/360.

## Quellen

- öffentlicher statischer Build im Repo
- `src/site-source.html`
- `assets/site.css`
- Designreferenzen V2/V4
- vorhandene Audits `tools/*.mjs`

## Arbeitsmodus

Erst nach den anderen Fixes ausführen. Read-only auditieren oder nur Audit-Regeln ergänzen. Nicht committen, nicht pushen. Keine Serverstarts und keine Restarts. Screenshots/Reports nur unter `.worker-runs/issue-022/`.

## Prüffragen

- Sind H1/H2, Textblöcke, Callouts, Tabellen und Cards über alle Seiten konsistent?
- Gibt es sichtbare Spacing-Ausreißer oder Flächenbrüche?
- Funktionieren Touch-Ziele, Header, Navigation, Tabellen und Buttons auf Mobile?
- Sind die Seiten optisch nah genug an V2/V4, ohne Content zu verfälschen?
- Sind technische Audits stark genug, um die gefundenen Fehler künftig zu stoppen?

## Ergebnis

Liefere:

- P0/P1/P2-Befunde.
- Liste, welche Befunde bereits gefixt sind und welche Folge-Issues brauchen.
- klare Abnahmekriterien.
- wenn alles sauber ist: explizit "keine Folge-Issues nötig" mit Begründung.
