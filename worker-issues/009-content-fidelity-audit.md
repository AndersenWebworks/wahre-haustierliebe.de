# Worker Issue 009: Content-Treue zu Annemaries Quelle

## Ziel

Prüfe, ob der sichtbare Content im aktuellen `index.html` inhaltlich 1:1 zu Annemaries Content-Quelle passt oder ob beim Designumbau Text verloren, verfälscht, gekürzt, doppelt, falsch verschoben oder mit unpassenden neuen Aussagen ergänzt wurde.

## Quellen

- Zielstand: `index.html`
- Content-Quelle: `references/content/annemarie-content-source.html`

## Arbeitsmodus

Read-only auditieren. Keine Dateien ändern, nicht committen, nicht pushen. Lokale Audit-Artefakte unter `.worker-runs/` sind erlaubt.

Erlaubt:

- DOM/Text-Extraktion per Node oder Playwright
- Abschnittsvergleich nach Seiten-IDs
- manuelle Stichproben an kritischen Stellen

Nicht erlaubt:

- Text "verbessern"
- Annemaries Formulierungen glätten
- externe Quellen nachrecherchieren
- Serverstarts oder Restarts

## Prüfpunkte

- Sind alle Seiten und Hauptabschnitte aus der Quelle im Zielstand vorhanden?
- Wurden Sätze inhaltlich verändert?
- Gibt es versehentliche Dopplungen?
- Sind Links/Anker semantisch gleich geblieben?
- Wurden neue Designmodule mit Texten eingefügt, die Annemaries Inhalt widersprechen oder tonlich herausfallen?
- Gibt es Stellen, an denen Designstruktur den Sinn verändert?

## Erwartetes Ergebnis

Liefere:

- Liste harter Abweichungen mit Quelle/Ziel-Kontext
- Liste akzeptabler Layout-Ergänzungen, falls sie den Sinn nicht verändern
- priorisierte Fix-Issues mit klarer Vorgabe: Quelle wiederherstellen, Dopplung entfernen, Link korrigieren oder Modultext prüfen

Content-Treue ist hier höher gewichtet als Design. Wenn Design und Quelle kollidieren, gewinnt die Quelle.
