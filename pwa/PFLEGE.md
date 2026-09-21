# WHL PWA – Pflegeanleitung

Diese PWA lebt von den Fragen. Sie sitzt unter `pwa/` im Projektordner und ist eine statische Web-App ohne Build-Step, ohne Framework, ohne Tracking.

## Aufbau

```
pwa/
├── index.html          Start-Screen, Kategorie-Auswahl
├── quiz.html           Session, eine Frage pro Bildschirm
├── ergebnis.html       Score, Highscore, Wiki-Brücke, Teilen
├── manifest.json        Web-App-Manifest (App-Name, Farben, Icons)
├── sw.js               Service Worker, offline-fähig
├── css/
│   └── whl-pwa.css     WHL-Designtokens, Mobile-Layout
├── js/
│   ├── whl.js          Datenladen, Storage, Helfer
│   ├── app.js          Start-Screen
│   ├── quiz.js         Session, Timer, Auswertung
│   └── share.js        Ergebnis, Highscore, Sharing
├── data/
│   └── questions.js    Fragenkatalog als ESM-Modul (Single Source of Truth)
├── icons/
│   ├── icon.svg        App-Icon, Standard
│   └── icon-maskable.svg   App-Icon, maskable (Android)
└── PFLEGE.md           Diese Datei
```

Hinweis: `data/questions.json` ist nur noch ein Deprecated-Eintrag und wird nicht geladen. Die kanonische Datenquelle ist `data/questions.js`.

## Eine Frage anlegen oder ändern

Bearbeite `data/questions.js`. Jede Frage ist ein Objekt im `questions`-Export. Pflichtfelder:

| Feld | Bedeutung |
| --- | --- |
| `id` | Eindeutige ID, Schema `<kategorie>-<thema>-<zahl>` |
| `category` | Schlüssel aus dem `categories`-Export: `hunde`, `katzen`, `kleintiere`, `voegel` |
| `difficulty` | Aktuell nur `leicht` im MVP |
| `text` | Die Frage, kurz, konkret, ohne Belehr-Ton |
| `options` | Genau vier Antworten, alle plausibel |
| `correctIndex` | Index der richtigen Antwort, 0–3 |
| `explanation` | 1–3 Sätze, warm und ohne erhobenen Zeigefinger |
| `wikiPath` | Wiki-Pfad relativ zur Domain, mit führendem `/` |
| `sourceRef` | Vollständige URL auf die Wiki-Seite |

Beispiel-Eintrag:

```js
{
  id: "hunde-allein-001",
  category: "hunde",
  difficulty: "leicht",
  text: "Wie lange darf ein erwachsener Hund allein zu Hause bleiben?",
  options: [
    "Einen ganzen Arbeitstag, das schafft er schon",
    "Bis zu vier Stunden, mit Vorbereitung",
    "Hunde dürfen nie allein bleiben",
    "So lange er schläft, stört es ihn nicht"
  ],
  correctIndex: 1,
  explanation: "Hunde sind soziale Lebewesen. Vier Stunden sind für die meisten erwachsenen Hunde das Maximum.",
  wikiPath: "/hunde/allein-zu-hause/",
  sourceRef: "https://wahre-haustierliebe.de/hunde/allein-zu-hause/"
}
```

Nach jeder Änderung: die `version`-Konstante oben in `data/questions.js` um YYYY-MM-DD.N hochzählen, zum Beispiel `2026-09-21.2`. Beim nächsten App-Start erscheint die Snackbar „Es gibt neue Fragen — laden?".

## Farben und Tonalität

Das Stylesheet lebt von den WHL-Designtokens. Neue Komponenten greifen diese Farben auf:

| Variable | Wert | Verwendung |
| --- | --- | --- |
| `--primary` | `#2A7B6F` | Hauptakzente, primäre Buttons |
| `--primary-dark` | `#1F5F56` | Hover, geteilte Inhalte |
| `--secondary` | `#C2553A` | Warnungen, falsche Antwort |
| `--accent` | `#E8A73D` | Belohnungen, Streak |
| `--bg` | `#F8F6F2` | Hintergrund |
| `--bg-alt` | `#F0EDE8` | Karten-Hintergrund, Erklärungs-Box |
| `--text` | `#2D2926` | Standardtext |
| `--text-muted` | `#6B6560` | Sekundärtext, Hinweise |

Neue Texte sind warm, kurz und ohne Belehrung. Beispiel: „Stimmt." statt „Korrekt!".

## Mechanik-Regeln

- Kein Multiplayer, keine Lobby, keine Jagd, kein Risiko.
- Timer-Ring ist sanft (30 Sekunden), keine Eile, kein „On Fire"-Pathos.
- Erklärung pro Antwort, Wiki-Brücke immer mit dabei.
- Highscore bleibt in `localStorage`, niemals im Netz.
- Keine Cookies, kein Tracking, keine externe Analytics.
- Sharing läuft über die Web Share API; Fallback ist die Zwischenablage.

## Test vor dem Live-Deploy

1. Im Browser öffnen: `https://wahre-haustierliebe.de/pwa/`.
2. Eine vollständige Runde in der Browser-Konsole mit DevTools laufen lassen.
3. Auf dem Handy die Seite aufrufen, „Zum Startbildschirm hinzufügen" antippen.
4. Flugmodus aktivieren, prüfen, ob die App weiterläuft.
5. Wiki-Link in einer Antwort antippen, prüfen, ob die echte Wiki-Seite öffnet.

## Bekannte Grenzen

- PWA-Icons liegen als SVG vor. Manche Apple-Versionen verlangen PNG. Falls apple-touch-icon als PNG gebraucht wird, einmal als 180 × 180 px aus `icons/icon.svg` rendern und als `icons/apple-touch-icon.png` ablegen, dann in den HTML-Head-Dateien wieder einbinden.
- Der Fragenkatalog hat 15 Fragen im MVP. Mittel und schwer wachsen mit dem Bestand.
- Mehrere Quiz-Modi (Mythen-Check, Tier-Fall) sind verschoben.
- Push-Benachrichtigungen sind bewusst nicht im MVP — die PWA läuft statisch ohne Server.

## Quellenpflicht

Jede Frage hat einen `sourceRef`. Wird eine Frage entfernt oder geändert, muss der Eintrag in `data/questions.js` und der verlinkte Wiki-Artikel zusammen gepflegt werden. Keine Frage ohne Wiki-Anker.