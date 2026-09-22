# WHL PWA – Pflegeanleitung

Diese PWA lebt von den Fragen. Sie sitzt unter `pwa/` im Projektordner und ist eine statische Web-App ohne Build-Step, ohne Framework, ohne Tracking.

## Aufbau

```
pwa/
├── index.html          Start-Screen, Modus- und Kategorie-Auswahl
├── quiz.html           Session, eine Frage pro Bildschirm
├── ergebnis.html       Score, Highscore, Wiki-Brücke, Teilen
├── manifest.json        Web-App-Manifest (App-Name, Farben, Icons)
├── sw.js               Service Worker, offline-fähig (Cache-Version whl-pwa-v2)
├── css/
│   └── whl-pwa.css     WHL-Designtokens, Mobile-Layout, Modus-Akzente, Animationen
├── js/
│   ├── whl.js          Datenladen, Storage, Helfer, Modi-Akzente
│   ├── app.js          Start-Screen, Modus- und Kategorie-Auswahl, bester Run
│   ├── quiz.js         Session, Timer, Tap-Moment, Fall-Szene, Difficulty
│   ├── share.js        Ergebnis, persönliche Texte pro Modus, Tier-Badges
│   └── sticker.js      Sticker-Auswahl pro Kategorie und Modus
├── data/
│   ├── questions.js    Fragenkatalog als ESM-Modul (Single Source of Truth)
│   └── resultateTexte.js  Persönliche Ergebnis-Texte pro Modus und Stufe
├── icons/
│   ├── icon.svg        App-Icon, Standard
│   └── icon-maskable.svg   App-Icon, maskable (Android)
├── sticker/            SVG-Sticker für Tier-Stempel (Kategorien + Szenen)
│   ├── pfote.svg  blatt.svg  sonne.svg  piepmatz.svg
│   ├── kralle.svg  feder.svg  flosse.svg
│   └── hund.svg  katze.svg  welli.svg  meeri.svg
│       halsband.svg  fenster.svg  kaefig.svg  napf.svg
└── PFLEGE.md           Diese Datei
```

Hinweis: `data/questions.json` ist nur noch ein Deprecated-Eintrag und wird nicht geladen. Die kanonische Datenquelle ist `data/questions.js`.

## Modi

Die PWA kennt drei Spielweisen mit eigenem Fragenpool, eigener Akzentfarbe und eigenem Highscore:

| Modus | Kürzel | Akzent | Wann passt er |
| --- | --- | --- | --- |
| `klassisch` | Klassisch | warmes Grün (#2A7B6F) | Wiki-Wissen gemischt, eine Frage pro Bildschirm, vier Karten |
| `mythen` | Mythen-Check | ruhiges Blau (#3C6B95) | Was stimmt wirklich? Zwei große Buttons „Stimmt“ / „Stimmt nicht“ |
| `fall` | Fall-Entscheidung | warmes Orange (#D97A3B) | Was tust du konkret? Alltagssituationen mit vier Karten + Fall-Sticker-Szene |

Modi-Definitionen liegen oben in `data/questions.js` unter dem `modes`-Export. Die Akzentfarben liegen in `js/whl.js` unter `MODE_AKZENTE` und werden per JS auf `document.documentElement` als `--mode-accent`, `--mode-accent-light` und `--mode-tap-glow` gesetzt. Fallback ist jeweils das Klassisch-Grün.

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
| `correctIndex` | Index der richtigen Antwort, 0–3 (für `interaktion: "vierKarten"`) |
| `explanation` | 1–3 Sätze, warm und ohne erhobenen Zeigefinger |
| `wikiPath` | Wiki-Pfad relativ zur Domain, mit führendem `/` |
| `sourceRef` | Vollständige URL auf die Wiki-Seite |

Optionale Felder pro Frage:

| Feld | Modi | Bedeutung |
| --- | --- | --- |
| `interaktion` | alle | `"vierKarten"` (Default) oder `"jaNein"` — wechselt das Antwortlayout |
| `correctJaNein` | `mythen` | `true` = „Stimmt“, `false` = „Stimmt nicht“ — Pflicht bei `interaktion: "jaNein"` |
| `sticker` | `fall` | Array von Sticker-Namen aus `pwa/sticker/` ohne `.svg`, 1–2 Stück; Fallback pro Kategorie wenn leer |

Beispiel-Eintrag (Klassisch):

```js
{
  id: "hunde-allein-001",
  mode: "klassisch",
  interaktion: "vierKarten",
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

Beispiel-Eintrag (Mythen-Check, jaNein):

```js
{
  id: "mythen-katzen-milch-001",
  mode: "mythen",
  interaktion: "jaNein",
  correctJaNein: false,
  category: "katzen",
  difficulty: "leicht",
  text: "Stimmt das? „Eine Schale Milch ist für jede Katze ein passendes Leckerli.\"",
  options: [
    "Stimmt. Milch gehört seit jeher zur Katze dazu.",
    "Stimmt nicht. Die meisten erwachsenen Katzen vertragen Milchzucker nicht."
  ],
  wikiPath: "/katzen/ernaehrung-milch/"
}
```

Beispiel-Eintrag (Fall-Entscheidung, mit Sticker):

```js
{
  id: "fall-hund-knurrt-besuch-001",
  mode: "fall",
  interaktion: "vierKarten",
  sticker: ["hund", "halsband"],
  category: "hunde",
  text: "Dein Hund knurrt Besucher an der Haustür an. Was tust du jetzt?",
  options: [ /* vier Antworten */ ],
  correctIndex: 1
}
```

Nach jeder Änderung: die `version`-Konstante oben in `data/questions.js` um YYYY-MM-DD.N hochzählen, zum Beispiel `2026-09-23.1`. Beim nächsten App-Start erscheint die Snackbar „Es gibt neue Fragen — laden?".

Wenn neue Sticker hinzukommen, müssen sie unter `pwa/sticker/` abgelegt und in `pwa/sw.js` (`APP_SHELL`) eingetragen werden, damit der Service Worker sie offline vorhält.

## Tap-Moment (Game-Design-Hebel)

Der Tipper auf eine Antwort ist der lebendigste Moment der App. Visuelle Reaktion, kein Sound:

- **Richtig**: warmes Glow (mode-spezifische Akzentfarbe), kleines SVG-Piktogramm blendet kurz seitlich der Antwortkarte ein (`headerSticker`/`tapSticker`).
- **Falsch**: kurze Shake-Animation (CSS-Keyframes `whl-shake`), kleines Piktogramm erscheint. Nach 380 ms leuchtet die richtige Antwort warm nach.
- **`prefers-reduced-motion: reduce`**: Animationen werden deaktiviert, Piktogramme bleiben sichtbar, ohne Bewegung.

## Spannungsbogen und WHL-Wärme

- Quiz-Header zeigt drei Difficulty-Dots (leicht / mittel / knifflig) je nach Frage-Position (Frage 1–3 = leicht, 4–6 = mittel, ab 7 = knifflig).
- Tier-Sticker neben der Fragenummer, passend zur Kategorie (`headerSticker` aus `js/sticker.js`).
- Persönliche Ergebnis-Texte: pro Modus und Stufe (niedrig / mittel / hoch) liegt ein Pool warmer Sätze in `data/resultateTexte.js`. Generiert wird via `baueResultatText(mode, score, total)`.
- Sammlung freigeschalteter Tierarten auf der Ergebnis-Seite zeigt die in der Runde vorgekommenen Kategorien mit Sticker.
- Startseite zeigt zusätzlich „Dein bester Run: X von Y (Modus).“ über alle Kategorien hinweg.

## Farben und Tonalität

Das Stylesheet lebt von den WHL-Designtokens. Neue Komponenten greifen diese Farben auf:

| Variable | Wert | Verwendung |
| --- | --- | --- |
| `--primary` | `#2A7B6F` | Klassisch-Akzent, primäre Buttons |
| `--primary-dark` | `#1F5F56` | Hover, geteilte Inhalte |
| `--secondary` | `#C2553A` | Warnungen, falsche Antwort |
| `--accent` | `#E8A73D` | Belohnungen, Streak |
| `--bg` | `#F8F6F2` | Hintergrund |
| `--bg-alt` | `#F0EDE8` | Karten-Hintergrund, Erklärungs-Box |
| `--text` | `#2D2926` | Standardtext |
| `--text-muted` | `#6B6560` | Sekundärtext, Hinweise |
| `--mode-accent` | je nach Modus | Akzentfarbe der aktiven Runde |
| `--mode-accent-light` | je nach Modus | Helle Variante für Hintergründe |
| `--mode-tap-glow` | je nach Modus | Glow-Farbe beim Tap-Moment |

Neue Texte sind warm, kurz und ohne Belehrung. Beispiel: „Stimmt." statt „Korrekt!".

## Mechanik-Regeln

- Drei Quiz-Modi mit eigenem Fragenpool, eigener Akzentfarbe und eigenem Highscore.
- Kein Multiplayer, keine Lobby, keine Jagd, kein Risiko.
- Timer-Ring ist sanft (30 Sekunden), färbt sich erst spät um; keine Eile, kein „On Fire"-Pathos.
- Antwortpositionen werden pro Frage zufällig gemischt (nur „vierKarten“), damit das Auge nicht auswendig lernt.
- jaNein-Modus zeigt zwei feste Buttons ohne Mischen.
- Streak-Toast ab drei Treffern in Folge, kein Punktezähler über den Score hinaus.
- Erklärung pro Antwort, Wiki-Brücke immer mit dabei.
- Highscore bleibt in `localStorage`, niemals im Netz, getrennt pro Modus und Kategorie.
- Keine Cookies, kein Tracking, keine externe Analytics.
- Sharing läuft über die Web Share API; Fallback ist die Zwischenablage.

## Test vor dem Live-Deploy

1. Im Browser öffnen: `https://wahre-haustierliebe.de/pwa/`.
2. Jeden Modus einmal komplett durchspielen (Klassisch, Mythen-Check, Fall-Entscheidung).
3. Auf dem Handy die Seite aufrufen, „Zum Startbildschirm hinzufügen" antippen.
4. Flugmodus aktivieren, prüfen, ob die App weiterläuft.
5. Wiki-Link in einer Antwort antippen, prüfen, ob die echte Wiki-Seite öffnet.
6. Highscore nach Reload prüfen — sowohl pro Modus als auch nach Kategorie.
7. Im Betriebssystem „Bewegung reduzieren" aktivieren, prüfen, ob Tap-Moment ohne Animation, aber mit sichtbarem Piktogramm erscheint.

## Bekannte Grenzen

- PWA-Icons liegen als SVG vor. Manche Apple-Versionen verlangen PNG. Falls apple-touch-icon als PNG gebraucht wird, einmal als 180 × 180 px aus `icons/icon.svg` rendern und als `icons/apple-touch-icon.png` ablegen, dann in den HTML-Head-Dateien wieder einbinden.
- Der Fragenkatalog hat 30 Fragen in drei Modi (15 Klassisch, 9 Mythen-Check, 6 Fall-Entscheidung). Mittel und schwer wachsen mit dem Bestand.
- Push-Benachrichtigungen sind bewusst nicht im MVP — die PWA läuft statisch ohne Server.
- Die PWA ist als Beta markiert: sie steht unter `robots.txt` mit `Disallow: /pwa/` und ist weder in `sitemap.xml` noch in `ai/pages.json` eingetragen. Sie taucht deshalb auch nicht in `llms.txt` oder `llms-full.txt` auf.

## Quellenpflicht

Jede Frage hat einen `sourceRef`. Wird eine Frage entfernt oder geändert, müssen der Eintrag in `data/questions.js` und der verlinkte Wiki-Artikel zusammen gepflegt werden. Keine Frage ohne Wiki-Anker.
