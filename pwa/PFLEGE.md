# WHL PWA – Pflegeanleitung

Diese PWA lebt von den Fragen. Sie sitzt unter `pwa/` im Projektordner und ist eine statische Web-App ohne Build-Step, ohne Framework, ohne Tracking.

## Aufbau

```
pwa/
├── index.html          Start-Screen, Modus- und Kategorie-Auswahl
├── quiz.html           Session, eine Frage pro Bildschirm
├── ergebnis.html       Score, Highscore, Wiki-Brücke, Teilen
├── manifest.json        Web-App-Manifest (App-Name, Farben, Icons)
├── sw.js               Service Worker, offline-fähig
├── css/
│   └── whl-pwa.css     WHL-Designtokens, Mobile-Layout
├── js/
│   ├── whl.js          Datenladen, Storage, Helfer, Modi-Verwaltung
│   ├── app.js          Start-Screen, Modus- und Kategorie-Auswahl
│   ├── quiz.js         Session, Timer, Streak, Auswertung
│   └── share.js        Ergebnis, Highscore pro Modus, Sharing
├── data/
│   └── questions.js    Fragenkatalog als ESM-Modul (Single Source of Truth)
├── icons/
│   ├── icon.svg        App-Icon, Standard
│   └── icon-maskable.svg   App-Icon, maskable (Android)
└── PFLEGE.md           Diese Datei
```

Hinweis: `data/questions.json` ist nur noch ein Deprecated-Eintrag und wird nicht geladen. Die kanonische Datenquelle ist `data/questions.js`.

## Modi

Die PWA kennt drei Spielweisen mit eigenem Fragenpool:

| Modus | Kürzel | Wann passt er |
| --- | --- | --- |
| `klassisch` | Klassisch | Wiki-Wissen gemischt, eine Frage pro Bildschirm |
| `mythen` | Mythen-Check | Was stimmt wirklich? Stimmt-nicht-Aussagen mit knapper Erklärung |
| `fall` | Fall-Entscheidung | Was tust du konkret? Alltagssituationen mit vier tragfähigen Antworten |

Modi-Definitionen liegen oben in `data/questions.js` unter dem `modes`-Export. Jede Frage trägt das passende `mode`-Feld. Highscores werden pro Modus und pro Kategorie separat gespeichert.

## Eine Frage anlegen oder ändern

Bearbeite `data/questions.js`. Jede Frage ist ein Objekt im `questions`-Export. Pflichtfelder:

| Feld | Bedeutung |
| --- | --- |
| `id` | Eindeutige ID, Schema `<kategorie>-<thema>-<zahl>` |
| `mode` | Schlüssel aus dem `modes`-Export: `klassisch`, `mythen` oder `fall` |
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
  mode: "klassisch",
  category: "hunde",
  difficulty: "leicht",
  text: "Drei Bürotage pro Woche dauern jeweils acht Stunden. Welche Lösung ist für einen erwachsenen Hund wirklich tragfähig?",
  options: [
    "Eine verlässliche Betreuung oder Zwischenrunde unterbricht den Tag",
    "Eine lange Morgenrunde gleicht einen ganzen Arbeitstag allein aus",
    "Im Garten zählt die Zeit nicht als Alleinsein",
    "Nach ein paar Wochen gewöhnt sich jeder Hund an acht Stunden"
  ],
  correctIndex: 0,
  explanation: "Hunde sind soziale Lebewesen. Für die meisten erwachsenen Hunde sind etwa vier Stunden allein bereits die obere Grenze.",
  wikiPath: "/hunde/allein-zu-hause/",
  sourceRef: "https://wahre-haustierliebe.de/hunde/allein-zu-hause/"
}
```

Nach jeder Änderung: die `version`-Konstante oben in `data/questions.js` um YYYY-MM-DD.N hochzählen, zum Beispiel `2026-09-22.2`. Beim nächsten App-Start erscheint die Snackbar „Es gibt neue Fragen — laden?".

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

- Drei Quiz-Modi mit eigenem Fragenpool und eigenem Highscore.
- Kein Multiplayer, keine Lobby, keine Jagd, kein Risiko.
- Timer-Ring ist sanft (30 Sekunden), färbt sich erst spät um; keine Eile, kein „On Fire"-Pathos.
- Antwortpositionen werden pro Frage zufällig gemischt, damit das Auge nicht auswendig lernt.
- Streak-Toast ab drei Treffern in Folge, kein Punktezähler über den Score hinaus.
- Erklärung pro Antwort, Wiki-Brücke immer mit dabei.
- Highscore bleibt in `localStorage`, niemals im Netz, getrennt pro Modus und Kategorie.
- Keine Cookies, kein Tracking, keine externe Analytics.
- Sharing läuft über die Web Share API; Fallback ist die Zwischenablage.

## Test vor dem Live-Deploy

1. Im Browser öffnen: `https://wahre-haustierliebe.de/pwa/`.
2. Jeden Modus einmal komplett durchspielen.
3. Auf dem Handy die Seite aufrufen, „Zum Startbildschirm hinzufügen" antippen.
4. Flugmodus aktivieren, prüfen, ob die App weiterläuft.
5. Wiki-Link in einer Antwort antippen, prüfen, ob die echte Wiki-Seite öffnet.
6. Highscore nach Reload prüfen — sowohl pro Modus als auch nach Kategorie.

## Bekannte Grenzen

- PWA-Icons liegen als SVG vor. Manche Apple-Versionen verlangen PNG. Falls apple-touch-icon als PNG gebraucht wird, einmal als 180 × 180 px aus `icons/icon.svg` rendern und als `icons/apple-touch-icon.png` ablegen, dann in den HTML-Head-Dateien wieder einbinden.
- Der Fragenkatalog hat 27 Fragen in drei Modi (15 Klassisch, 6 Mythen-Check, 6 Fall-Entscheidung). Mittel und schwer wachsen mit dem Bestand.
- Push-Benachrichtigungen sind bewusst nicht im MVP — die PWA läuft statisch ohne Server.
- Die PWA ist als Beta markiert: sie steht unter `robots.txt` mit `Disallow: /pwa/` und ist weder in `sitemap.xml` noch in `ai/pages.json` eingetragen. Sie taucht deshalb auch nicht in `llms.txt` oder `llms-full.txt` auf.

## Quellenpflicht

Jede Frage hat einen `sourceRef`. Wird eine Frage entfernt oder geändert, müssen der Eintrag in `data/questions.js` und der verlinkte Wiki-Artikel zusammen gepflegt werden. Keine Frage ohne Wiki-Anker.
