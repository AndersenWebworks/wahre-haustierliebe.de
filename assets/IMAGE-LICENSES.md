# Wa(h)re Haustierliebe Bildlizenzen

Stand: 03.06.2026

Die maschinenlesbare Nachweistabelle liegt in `image-credits.json`. Sie ist die verbindliche Asset-Tabelle für die statische Website.

## Status

- `assets/images/` enthält 27 lokale Bilddateien.
- `image-credits.json` enthält 27 Einträge.
- Für jede lokale Bilddatei gibt es einen Nachweiseintrag.
- Für jeden Nachweiseintrag gibt es eine lokale Bilddatei.
- 25 Inhaltsbilder sind mit externer Quelle, Urheber, Lizenz, Nutzungsort, Alt-Text und Bearbeitungsvermerk dokumentiert.
- 2 Dateien sind lokale Markenassets des Projekts: `wahre-haustierliebe-logo.png` und `wahre-haustierliebe-mark.png`.

## Lizenzgruppen

| Lizenz | Anzahl |
| --- | ---: |
| CC BY 2.0 | 2 |
| CC BY 4.0 | 3 |
| CC BY-SA 2.0 | 3 |
| CC BY-SA 2.5 | 1 |
| CC BY-SA 3.0 | 5 |
| CC BY-SA 4.0 | 5 |
| CC0 | 4 |
| FAL | 1 |
| Public domain | 1 |
| Local project brand asset | 2 |

## Personenmotive

Seit 03.06.2026 enthält die statische Website keine bewusst eingesetzten Bilder mit erkennbaren Menschen, Gesichtern, Körpern oder Händen mehr. Neue Bilder mit Personenmotiven gehören nicht auf die Website, solange keine separate Prüfung der Persönlichkeitsrechte und eine klare Freigabe dokumentiert sind.

## Pflegevertrag

Jedes neue Bild in `assets/images/` braucht vor Verwendung einen Eintrag in `image-credits.json` mit:

- `localPath`
- `fileTitle`
- `sourceUrl`
- `originalUrl`, falls bekannt oder sinnvoll
- `author`
- `license`
- `licenseUrl`, falls die Lizenz nicht Public Domain oder lokales Markenasset ist
- `usedFor`
- `alt`
- `modifications`

Wenn ein Bild keine belegbare Quelle, keine passende Lizenz oder keine klare lokale Rechtebasis hat, gehört es nicht auf die Website.

## Sichtbare Nachweise

Die Inhaltsseiten rendern die Bildnachweise im Footer als einklappbaren Block "Bildnachweise anzeigen". Der Footer darf aus UX-Gründen kompakter sein als `image-credits.json`, aber er darf keine Bildquelle verschweigen, die sichtbar auf der Seite verwendet wird.

## Markenassets

`wahre-haustierliebe-logo.png` und `wahre-haustierliebe-mark.png` sind als lokale Projekt-Markenassets dokumentiert. Wenn diese Dateien später aus externem Material abgeleitet werden, muss die konkrete Herkunft hier und in `image-credits.json` nachgetragen werden.
