// data/questions.js - kanonische Fragenquelle der WHL-PWA
// Drei Modi: klassisch, mythen, fall. Jede Frage trägt optional
// `interaktion` (vierKarten | jaNein) und `sticker` (Fall-Sticker).
// Bei interaktion "jaNein" wird `correctJaNein` statt correctIndex ausgewertet.
// Jede Frage braucht einen `wikiPath`, der auf eine bestehende Seite zeigt.

export const version = "2026-09-30.1";

export const categories = {
  hunde: { label: "Hunde", blurb: "Alltag, Bindung und Bewegung" },
  katzen: { label: "Katzen", blurb: "Revier, Freigang und Verantwortung" },
  kleintiere: { label: "Kleintiere", blurb: "Kleine Tiere, große Ansprüche" },
  voegel: { label: "Vögel", blurb: "Schwarmleben und sensible Sinne" }
};

export const modes = {
  klassisch: {
    key: "klassisch",
    label: "Klassisch",
    blurb: "Wiki-Wissen gemischt",
    kicker: "Welche Antwort trägt wirklich?",
    scoreLabel: "Klassisch"
  },
  mythen: {
    key: "mythen",
    label: "Mythen-Check",
    blurb: "Was stimmt wirklich?",
    kicker: "Stimmt das wirklich?",
    scoreLabel: "Mythen-Check"
  },
  fall: {
    key: "fall",
    label: "Fall-Entscheidung",
    blurb: "Was tust du konkret?",
    kicker: "Was tust du?",
    scoreLabel: "Fall-Entscheidung"
  }
};

export const difficulties = ["leicht", "mittel", "knifflig"];

export const questions = [
  // ============ KLASSISCH ============
  {
    id: "hunde-allein-001",
    mode: "klassisch",
    interaktion: "vierKarten",
    category: "hunde",
    difficulty: "leicht",
    text: "Drei Bürotage pro Woche dauern jeweils acht Stunden. Welche Lösung ist für einen erwachsenen Hund wirklich tragfähig?",
    options: [
      "Eine verlässliche Betreuung oder Zwischenrunde, die den Tag unterbricht",
      "Eine besonders lange Morgenrunde, die ihn für den restlichen Tag müde macht",
      "Ein gesicherter Garten, in dem er sich tagsüber frei bewegen kann",
      "Eine Eingewöhnung in kleinen Schritten, bis acht Stunden klappen"
    ],
    correctIndex: 0,
    explanation: "Hunde sind soziale Lebewesen. Für die meisten erwachsenen Hunde sind etwa vier Stunden allein bereits die obere Grenze. Ein normaler Arbeitstag braucht deshalb eine Betreuungslösung.",
    wikiPath: "/hunde/allein-zu-hause/",
    sourceRef: "https://wahre-haustierliebe.de/hunde/allein-zu-hause/"
  },
  {
    id: "hunde-garten-001",
    mode: "klassisch",
    interaktion: "vierKarten",
    category: "hunde",
    difficulty: "leicht",
    text: "Ein Hund hat einen großen, sicheren Garten. Was fehlt ihm trotzdem als fester Teil seines Alltags?",
    options: [
      "Ein höherer Zaun, damit er sich auf dem Grundstück sicherer fühlt",
      "Gemeinsame Wege draußen mit neuen Gerüchen und Begegnungen",
      "Ein zweiter Liegeplatz im Garten, damit er draußen ruhen kann",
      "Mehr Spielzeug im Garten, damit er sich allein beschäftigt"
    ],
    correctIndex: 1,
    explanation: "Ein Garten kann ein schöner Rückzugsort sein. Er ersetzt aber weder gemeinsame Bewegung noch neue Eindrücke, Gerüche und Begegnungen außerhalb des eigenen Grundstücks.",
    wikiPath: "/hunde/garten-auslauf/",
    sourceRef: "https://wahre-haustierliebe.de/hunde/garten-auslauf/"
  },
  {
    id: "hunde-zwinger-001",
    mode: "klassisch",
    interaktion: "vierKarten",
    category: "hunde",
    difficulty: "mittel",
    text: "Ein Hofhund hat Futter, täglichen Auslauf und einen großen Zwinger. Warum kann die Haltung dennoch scheitern?",
    options: [
      "Weil ein Zwinger im Winter grundsätzlich zu kalt und zugig für jeden Hund ist",
      "Weil täglicher Auslauf für einen Hofhund meist zu viel Bewegung ist",
      "Weil Platz und Versorgung die Trennung von seiner Familie nicht ausgleichen",
      "Weil Hunde auf Höfen fast immer zu wenig Beschäftigung haben"
    ],
    correctIndex: 2,
    explanation: "Hunde leben in sozialen Beziehungen. Versorgung ist wichtig, aber sie ersetzt weder Zugehörigkeit noch regelmäßigen Kontakt zu ihren Menschen.",
    wikiPath: "/hunde/hofhaltung-und-zwinger/",
    sourceRef: "https://wahre-haustierliebe.de/hunde/hofhaltung-und-zwinger/"
  },
  {
    id: "hunde-sozial-001",
    mode: "klassisch",
    interaktion: "vierKarten",
    category: "hunde",
    difficulty: "mittel",
    text: "Welcher Alltag gibt einem Hund am ehesten Sicherheit, ohne ihn zu langweilen?",
    options: [
      "Jeden Tag exakt dieselbe Runde zur selben Uhrzeit, ohne Ausnahmen",
      "Möglichst viel Abwechslung mit neuen Orten und Menschen an jedem Tag",
      "Verlässliche Rituale, ergänzt durch neue Gerüche, Bewegung und Ruhe",
      "Feste Fütterungszeiten, dazu freie Zeit, die er sich selbst einteilt"
    ],
    correctIndex: 2,
    explanation: "Hunde profitieren von Verlässlichkeit, aber auch von sinnvoller Abwechslung. Bindung, Ruhe, Bewegung und neue Eindrücke gehören zusammen.",
    wikiPath: "/hunde/soziale-beduerfnisse/",
    sourceRef: "https://wahre-haustierliebe.de/hunde/soziale-beduerfnisse/"
  },
  {
    id: "hunde-gesundheit-001",
    mode: "klassisch",
    interaktion: "vierKarten",
    category: "hunde",
    difficulty: "knifflig",
    text: "Welches Gesundheitsproblem ist bei Hunden in Deutschland am häufigsten?",
    options: [
      "Allergien und Hautprobleme",
      "Übergewicht",
      "Hüft- und Ellbogendysplasie",
      "Ohrenentzündungen"
    ],
    correctIndex: 1,
    explanation: "Etwa 40 Prozent der Hunde in Deutschland sind übergewichtig. Die Ursache ist fast immer menschengemacht: zu viel Futter, zu viele Leckerlis, zu wenig Bewegung.",
    wikiPath: "/hunde/gesundheit/",
    sourceRef: "https://wahre-haustierliebe.de/hunde/gesundheit/"
  },
  {
    id: "katzen-wohnung-001",
    mode: "klassisch",
    interaktion: "vierKarten",
    category: "katzen",
    difficulty: "leicht",
    text: "Eine Katze lebt nur in der Wohnung. Welche Veränderung verbessert ihr Revier am deutlichsten?",
    options: [
      "Ein Fensterplatz mit Blick nach draußen als tägliche Unterhaltung",
      "Ein zweiter Futterplatz, damit sie mehr Auswahl im Revier hat",
      "Mehr Höhe, Rückzugsorte, Kratzmöglichkeiten und Beschäftigung",
      "Ein großes Katzenbett an ihrem liebsten Platz im Wohnzimmer"
    ],
    correctIndex: 2,
    explanation: "Wohnungskatzen können gut leben, wenn die Wohnung wirklich ihr Revier wird: mit Höhe, Rückzug, Kratzmöglichkeiten und Beschäftigung.",
    wikiPath: "/katzen/wohnungshaltung/",
    sourceRef: "https://wahre-haustierliebe.de/katzen/wohnungshaltung/"
  },
  {
    id: "katzen-kastration-001",
    mode: "klassisch",
    interaktion: "vierKarten",
    category: "katzen",
    difficulty: "leicht",
    text: "Eine unkastrierte Katze streift regelmäßig draußen herum. Welches Problem verhindert Kastration am direktesten?",
    options: [
      "Dass sie sich draußen verläuft und nicht mehr zurückfindet",
      "Ungewollten Nachwuchs, der die Zahl der Streunerkatzen erhöht",
      "Dass sie sich bei Revierkämpfen mit Nachbarkatzen verletzt",
      "Dass sie Vögel und Mäuse im Garten jagt"
    ],
    correctIndex: 1,
    explanation: "In Deutschland leben rund zwei Millionen Streunerkatzen, die meisten stammen von unkastrierten Freigängern ab. Kastration ist der wirksamste Schutz vor weiterem Katzenleid.",
    wikiPath: "/katzen/kastration/",
    sourceRef: "https://wahre-haustierliebe.de/katzen/kastration/"
  },
  {
    id: "katzen-sozial-001",
    mode: "klassisch",
    interaktion: "vierKarten",
    category: "katzen",
    difficulty: "mittel",
    text: "Zwei Wohnungskatzen geraten plötzlich häufiger aneinander. Welche Anpassung kann Revierdruck sinnvoll senken?",
    options: [
      "Getrennte Ruhe-, Kratz-, Futter- und Höhenplätze, damit Ausweichen möglich wird",
      "Ein gemeinsamer großer Kuschelplatz, damit sie sich wieder aneinander gewöhnen",
      "Mehr gemeinsames Spiel mit beiden gleichzeitig, damit sie Energie abbauen",
      "Eine dritte Katze, die als ruhiger Puffer zwischen den beiden vermittelt"
    ],
    correctIndex: 0,
    explanation: "Katzen brauchen Möglichkeiten, einander auszuweichen. Mehrere getrennte Ressourcen und Rückzugsorte reduzieren Konflikte oft deutlich.",
    wikiPath: "/katzen/wohnungshaltung/",
    sourceRef: "https://wahre-haustierliebe.de/katzen/wohnungshaltung/"
  },
  {
    id: "katzen-wildkatze-001",
    mode: "klassisch",
    interaktion: "vierKarten",
    category: "katzen",
    difficulty: "mittel",
    text: "Beim Waldspaziergang findest du ein getigertes Kätzchen allein im Gras. Es wirkt ruhig und unverletzt. Was ist der beste erste Schritt?",
    options: [
      "Es warm einpacken und ins nächste Tierheim bringen",
      "Leise Abstand nehmen und später aus der Ferne nachsehen",
      "Ihm etwas lauwarme Milch anbieten und dann abwarten",
      "Es an einen geschützteren Ort in der Nähe setzen"
    ],
    correctIndex: 1,
    explanation: "Es kann eine junge Europäische Wildkatze sein. Allein gefunden heißt nicht verlassen: Die Mutter ist oft nur auf Nahrungssuche. Bei akuter Gefahr rufst du eine zuständige Stelle an.",
    wikiPath: "/katzen/wildkatzenbaby-gefunden/",
    sourceRef: "https://wahre-haustierliebe.de/katzen/wildkatzenbaby-gefunden/"
  },
  {
    id: "katzen-schnurren-001",
    mode: "klassisch",
    interaktion: "vierKarten",
    category: "katzen",
    difficulty: "knifflig",
    text: "Eine Katze schnurrt, frisst aber seit gestern kaum und versteckt sich. Wie ordnest du das Schnurren ein?",
    options: [
      "Als Zeichen, dass sie sich trotz allem wohlfühlt",
      "Als Laut, der die anderen Warnzeichen nicht aufhebt",
      "Als Hinweis, dass sie nur etwas Ruhe braucht",
      "Als Bitte um Streicheleinheiten und Nähe"
    ],
    correctIndex: 1,
    explanation: "Schnurren ist kein Gesundheitszeugnis. Katzen schnurren auch, wenn sie angespannt, ängstlich oder krank sind. Rückzug und Appetitlosigkeit gehören tierärztlich abgeklärt.",
    wikiPath: "/katzen/stilles-leiden/",
    sourceRef: "https://wahre-haustierliebe.de/katzen/stilles-leiden/"
  },
  {
    id: "kleintiere-hamster-001",
    mode: "klassisch",
    interaktion: "vierKarten",
    category: "kleintiere",
    difficulty: "mittel",
    text: "Ein Goldhamster hat ein großes Laufrad, aber nur einen üblichen Zoohandelskäfig. Was fehlt am deutlichsten?",
    options: [
      "Ein zweites Laufrad in anderer Größe für Abwechslung",
      "Täglicher Auslauf in einer Kugel durch die Wohnung",
      "Viel zusammenhängende Grundfläche mit tiefer Einstreu",
      "Mehr Klettermöglichkeiten auf mehreren Etagen"
    ],
    correctIndex: 2,
    explanation: "Goldhamster brauchen Platz zum Graben, Laufen und Rückzug. Ein Laufrad ersetzt keine ausreichend große, strukturierte Grundfläche.",
    wikiPath: "/kleintiere/hamster/",
    sourceRef: "https://wahre-haustierliebe.de/kleintiere/hamster/"
  },
  {
    id: "kleintiere-hamster-002",
    mode: "klassisch",
    interaktion: "vierKarten",
    category: "kleintiere",
    difficulty: "leicht",
    text: "Zwei Goldhamster wirken im Zoogeschäft friedlich. Warum ist das kein guter Grund, sie dauerhaft zusammen zu halten?",
    options: [
      "Weil sie im Geschäft nur wegen der fremden, lauten Umgebung ruhig sind",
      "Weil sie Einzelgänger sind und Revierkämpfe oft erst später beginnen",
      "Weil zwei Hamster im Gehege doppelt so viel Futter brauchen",
      "Weil Geschwister sich später meistens nicht mehr erkennen"
    ],
    correctIndex: 1,
    explanation: "Goldhamster sind Einzelgänger. Selbst wenn sie zunächst ruhig wirken, können Revierkonflikte später gefährlich werden.",
    wikiPath: "/kleintiere/hamster/",
    sourceRef: "https://wahre-haustierliebe.de/kleintiere/hamster/"
  },
  {
    id: "kleintiere-meeri-001",
    mode: "klassisch",
    interaktion: "vierKarten",
    category: "kleintiere",
    difficulty: "leicht",
    text: "Ein einzelnes Meerschweinchen bekommt viel Aufmerksamkeit von seinem Menschen. Was fehlt ihm trotzdem?",
    options: [
      "Ein größerer Auslauf, in dem es sich allein beschäftigen kann",
      "Artgenossen, mit denen es in seiner eigenen Sprache kommuniziert",
      "Ein Kuscheltier im Gehege, an das es sich nachts anlehnen kann",
      "Mehr Abwechslung im Futter mit wechselnden Kräutern"
    ],
    correctIndex: 1,
    explanation: "Meerschweinchen sind soziale Gruppentiere. Ein Mensch kann Futter geben, Schutz bieten und Vertrauen aufbauen. Er kann kein Meerschweinchen sein.",
    wikiPath: "/kleintiere/meerschweinchen/",
    sourceRef: "https://wahre-haustierliebe.de/kleintiere/meerschweinchen/"
  },
  {
    id: "kleintiere-kind-001",
    mode: "klassisch",
    interaktion: "vierKarten",
    category: "kleintiere",
    difficulty: "leicht",
    text: "Ein sechsjähriges Kind wünscht sich ein Tier zum Spielen am Nachmittag. Warum ist ein Goldhamster dafür meist keine gute Wahl?",
    options: [
      "Weil er für Kinderhände zu schnell und zu schwer zu fangen ist",
      "Weil er tagsüber schläft und Wecken und Anfassen ihn stressen",
      "Weil er nur mit viel Training zutraulich wird",
      "Weil er sehr leicht Erkältungen von Menschen bekommt"
    ],
    correctIndex: 1,
    explanation: "Goldhamster sind nachtaktiv und brauchen tagsüber Ruhe. Sie sind keine Spielgefährten für Kinderhände.",
    wikiPath: "/kleintiere/hamster/",
    sourceRef: "https://wahre-haustierliebe.de/kleintiere/hamster/"
  },
  {
    id: "kleintiere-kaninchen-001",
    mode: "klassisch",
    interaktion: "vierKarten",
    category: "kleintiere",
    difficulty: "knifflig",
    text: "Wie viel dauerhaft zugängliche Fläche empfiehlt die Tierärztliche Vereinigung für Tierschutz mindestens pro Kaninchen?",
    options: [
      "Einen halben Quadratmeter",
      "Einen Quadratmeter",
      "Zwei bis drei Quadratmeter",
      "Sechs Quadratmeter"
    ],
    correctIndex: 2,
    explanation: "Die TVT empfiehlt mindestens 2–3 m² pro Kaninchen als Grundfläche, die immer zugänglich ist, nicht nur als Auslauf. Handelsübliche Käfige haben oft nur 0,5–1 m².",
    wikiPath: "/kleintiere/kaninchen/",
    sourceRef: "https://wahre-haustierliebe.de/kleintiere/kaninchen/"
  },
  {
    id: "kleintiere-ratten-001",
    mode: "klassisch",
    interaktion: "vierKarten",
    category: "kleintiere",
    difficulty: "knifflig",
    text: "Wie alt werden Farbratten in der Regel?",
    options: [
      "Ein bis zwei Jahre",
      "Zwei bis drei Jahre",
      "Vier bis sechs Jahre",
      "Acht bis zehn Jahre"
    ],
    correctIndex: 1,
    explanation: "Ratten werden meist nur zwei bis drei Jahre alt. Man baut in kurzer Zeit eine starke Bindung auf und verliert das Tier früh. Tumore sind bei Ratten sehr verbreitet.",
    wikiPath: "/kleintiere/ratten/",
    sourceRef: "https://wahre-haustierliebe.de/kleintiere/ratten/"
  },
  {
    id: "voegel-kueche-001",
    mode: "klassisch",
    interaktion: "vierKarten",
    category: "voegel",
    difficulty: "mittel",
    text: "Ein Vogelkäfig steht im offenen Wohnbereich neben der Küche. Welche unsichtbare Gefahr wird leicht unterschätzt?",
    options: [
      "Die Wärme vom Herd, die den Käfig zu stark aufheizt",
      "Dämpfe von antihaftbeschichtetem Kochgeschirr",
      "Der Geruch von Gewürzen, der die Atemwege reizt",
      "Das Klappern von Geschirr, das die Vögel erschreckt"
    ],
    correctIndex: 1,
    explanation: "Vögel reagieren sehr empfindlich auf belastete Luft. Dämpfe von überhitztem, antihaftbeschichtetem Kochgeschirr können für sie tödlich sein.",
    wikiPath: "/voegel/kuechenluft-teflon/",
    sourceRef: "https://wahre-haustierliebe.de/voegel/kuechenluft-teflon/"
  },
  {
    id: "voegel-schwarm-001",
    mode: "klassisch",
    interaktion: "vierKarten",
    category: "voegel",
    difficulty: "leicht",
    text: "Ein Wellensittich spricht viel mit seinem Menschen und wirkt anhänglich. Reicht das als Ersatz für einen zweiten Vogel?",
    options: [
      "Ja, wenn täglich mehrere Stunden mit ihm gesprochen wird",
      "Nein, ein Mensch ersetzt keinen Artgenossen im Schwarm",
      "Ja, wenn er genug Spielzeug und Abwechslung hat",
      "Nein, aber ein Spiegel im Käfig gleicht das gut aus"
    ],
    correctIndex: 1,
    explanation: "Wellensittiche sind Schwarmtiere. Ein Mensch kann Nähe geben, aber keinen passenden Artgenossen ersetzen. Auch ein Spiegel ist keine Gesellschaft.",
    wikiPath: "/voegel/schwarmhaltung/",
    sourceRef: "https://wahre-haustierliebe.de/voegel/schwarmhaltung/"
  },
  {
    id: "voegel-uv-001",
    mode: "klassisch",
    interaktion: "vierKarten",
    category: "voegel",
    difficulty: "knifflig",
    text: "Warum ist ein heller Platz hinter einer Fensterscheibe für Vögel kein vollständiger Ersatz für geeignetes UV-Licht?",
    options: [
      "Weil Vögel direktes Sonnenlicht hinter Glas nicht vertragen",
      "Weil Glas einen großen Teil des UV-Anteils herausfiltert",
      "Weil das Licht am Fenster zu stark schwankt",
      "Weil Fensterplätze im Winter zu kalt werden"
    ],
    correctIndex: 1,
    explanation: "Fensterglas lässt Licht herein, filtert aber einen großen Teil des UV-Anteils. Vögel nutzen UV-Licht für ihre Wahrnehmung und den Vitamin-D-Stoffwechsel.",
    wikiPath: "/voegel/uv-licht/",
    sourceRef: "https://wahre-haustierliebe.de/voegel/uv-licht/"
  },
  {
    id: "voegel-krankheit-001",
    mode: "klassisch",
    interaktion: "vierKarten",
    category: "voegel",
    difficulty: "knifflig",
    text: "Womit fällt eine Krankheit bei Wellensittichen oft am frühesten auf, bevor man von außen etwas sieht?",
    options: [
      "Mit einer regelmäßigen Kontrolle auf einer grammgenauen Waage",
      "Mit einem genauen Blick auf die Farbe des Gefieders jeden Morgen",
      "Mit dem Zählen der Pfiffe über den Tag",
      "Mit der Beobachtung, wie oft er zum Spiegel fliegt"
    ],
    correctIndex: 0,
    explanation: "Vögel verbergen Krankheit als Beutetiere lange. Ein regelmäßiges Gewicht auf einer grammgenauen Waage zeigt Veränderungen oft, bevor sie von außen auffallen.",
    wikiPath: "/voegel/krankheit-erkennen/",
    sourceRef: "https://wahre-haustierliebe.de/voegel/krankheit-erkennen/"
  },

  // ============ MYTHEN-CHECK ============
  {
    id: "mythen-katzen-einzelgaenger-001",
    mode: "mythen",
    interaktion: "jaNein",
    correctJaNein: false,
    category: "katzen",
    difficulty: "leicht",
    text: "„Katzen sind Einzelgänger und leben am liebsten allein.“",
    explanation: "Katzen jagen allein, leben aber nicht automatisch allein. Viele Katzen, besonders in reiner Wohnungshaltung, brauchen einen passenden Artgenossen.",
    wikiPath: "/katzen/sozialverhalten/",
    sourceRef: "https://wahre-haustierliebe.de/katzen/sozialverhalten/"
  },
  {
    id: "mythen-katzen-schnurren-001",
    mode: "mythen",
    interaktion: "jaNein",
    correctJaNein: false,
    category: "katzen",
    difficulty: "mittel",
    text: "„Eine Katze, die schnurrt, ist zufrieden und gesund.“",
    explanation: "Schnurren ist ein Laut, kein Gesundheitszeugnis. Katzen schnurren auch, wenn sie angespannt, ängstlich oder krank sind. Es zählt das Gesamtbild.",
    wikiPath: "/katzen/stilles-leiden/",
    sourceRef: "https://wahre-haustierliebe.de/katzen/stilles-leiden/"
  },
  {
    id: "mythen-katzen-kastration-wohnung-001",
    mode: "mythen",
    interaktion: "jaNein",
    correctJaNein: true,
    category: "katzen",
    difficulty: "knifflig",
    text: "„Auch eine Katze, die nie nach draußen geht, profitiert von der Kastration.“",
    explanation: "Auch ohne Freigang bleiben Eierstöcke und Gebärmutter hormonell aktiv. Damit bleiben etwa das Risiko einer Gebärmuttervereiterung und von Gesäugetumoren bestehen.",
    wikiPath: "/katzen/kastration/",
    sourceRef: "https://wahre-haustierliebe.de/katzen/kastration/"
  },
  {
    id: "mythen-hund-garten-001",
    mode: "mythen",
    interaktion: "jaNein",
    correctJaNein: false,
    category: "hunde",
    difficulty: "leicht",
    text: "„Ein eingezäunter Garten ersetzt den täglichen Spaziergang vollständig.“",
    explanation: "Der Garten ist ein schöner Rückzugsort, aber kein Ersatz für gemeinsame Spaziergänge. Gerüche, Begegnungen und Wege außerhalb des Grundstücks bleiben wichtig.",
    wikiPath: "/hunde/garten-auslauf/",
    sourceRef: "https://wahre-haustierliebe.de/hunde/garten-auslauf/"
  },
  {
    id: "mythen-hund-auto-001",
    mode: "mythen",
    interaktion: "jaNein",
    correctJaNein: false,
    category: "hunde",
    difficulty: "leicht",
    text: "„Bei 22 Grad kann der Hund zehn Minuten im Auto warten, wenn das Fenster einen Spalt offen ist.“",
    explanation: "Ein parkendes Auto heizt sich auch bei moderaten Temperaturen schnell auf. Schatten, Fensterspalt oder „nur kurz“ sind kein verlässlicher Schutz.",
    wikiPath: "/hitzefalle-auto/",
    sourceRef: "https://wahre-haustierliebe.de/hitzefalle-auto/"
  },
  {
    id: "mythen-hund-kastration-001",
    mode: "mythen",
    interaktion: "jaNein",
    correctJaNein: false,
    category: "hunde",
    difficulty: "knifflig",
    text: "„Kastration ist beim Hund genauso Routine wie bei der Katze.“",
    explanation: "Beim Hund ist Kastration eine Einzelfallentscheidung. Möglicher Nutzen und Risiken wie Harninkontinenz oder Gelenkprobleme werden tierärztlich abgewogen.",
    wikiPath: "/hunde/kastration/",
    sourceRef: "https://wahre-haustierliebe.de/hunde/kastration/"
  },
  {
    id: "mythen-hund-uebergewicht-001",
    mode: "mythen",
    interaktion: "jaNein",
    correctJaNein: true,
    category: "hunde",
    difficulty: "mittel",
    text: "„Rund vier von zehn Hunden in Deutschland sind übergewichtig.“",
    explanation: "Etwa 40 Prozent der Hunde sind zu schwer. Übergewicht belastet Gelenke, Herz und Stoffwechsel und verkürzt die Lebenserwartung messbar.",
    wikiPath: "/hunde/gesundheit/",
    sourceRef: "https://wahre-haustierliebe.de/hunde/gesundheit/"
  },
  {
    id: "mythen-hamster-partner-001",
    mode: "mythen",
    interaktion: "jaNein",
    correctJaNein: false,
    category: "kleintiere",
    difficulty: "leicht",
    text: "„Goldhamster fühlen sich mit einem Artgenossen wohler und sind dann aktiver.“",
    explanation: "Goldhamster sind territoriale Einzelgänger. Zu zweit bedeutet für sie Dauerstress, und die Gefahr schwerer Verletzungen steigt mit dem Alter.",
    wikiPath: "/kleintiere/hamster/",
    sourceRef: "https://wahre-haustierliebe.de/kleintiere/hamster/"
  },
  {
    id: "mythen-ratten-geruch-001",
    mode: "mythen",
    interaktion: "jaNein",
    correctJaNein: false,
    category: "kleintiere",
    difficulty: "mittel",
    text: "„Ratten riechen von Natur aus streng, das lässt sich kaum vermeiden.“",
    explanation: "Ratten sind reinlich, legen feste Toilettenecken an und putzen sich ausgiebig. Der typische Geruch entsteht durch zu kleine Käfige und seltene Reinigung.",
    wikiPath: "/kleintiere/ratten/",
    sourceRef: "https://wahre-haustierliebe.de/kleintiere/ratten/"
  },
  {
    id: "mythen-kaninchen-heu-001",
    mode: "mythen",
    interaktion: "jaNein",
    correctJaNein: true,
    category: "kleintiere",
    difficulty: "leicht",
    text: "„Heu ist für Kaninchen das Hauptfutter, nicht das Trockenfutter aus der Zoohandlung.“",
    explanation: "Heu ist die Grundlage, dazu kommt täglich frisches Grünfutter. Trockenfutter-Pellets sind oft zu energiereich und fördern Zahnprobleme.",
    wikiPath: "/kleintiere/kaninchen/",
    sourceRef: "https://wahre-haustierliebe.de/kleintiere/kaninchen/"
  },
  {
    id: "mythen-chinchilla-hitze-001",
    mode: "mythen",
    interaktion: "jaNein",
    correctJaNein: true,
    category: "kleintiere",
    difficulty: "knifflig",
    text: "„Für Chinchillas können schon Temperaturen über 25 Grad lebensgefährlich werden.“",
    explanation: "Chinchillas sind extrem hitzeempfindlich. Sie brauchen kühle Räume, Staubbäder statt Wasser und können 15–20 Jahre alt werden.",
    wikiPath: "/kleintiere/degus-chinchillas/",
    sourceRef: "https://wahre-haustierliebe.de/kleintiere/degus-chinchillas/"
  },
  {
    id: "mythen-wellensittich-einzeln-001",
    mode: "mythen",
    interaktion: "jaNein",
    correctJaNein: false,
    category: "voegel",
    difficulty: "leicht",
    text: "„Ein einzelner Wellensittich mit viel Zuwendung ist ein glücklicher Anfängervogel.“",
    explanation: "Wellensittiche sind Schwarmvögel. Ein Einzeltier leidet auch bei liebevoller Pflege. Sie brauchen mindestens einen passenden Partner.",
    wikiPath: "/voegel/schwarmhaltung/",
    sourceRef: "https://wahre-haustierliebe.de/voegel/schwarmhaltung/"
  },
  {
    id: "mythen-voegel-kaefig-001",
    mode: "mythen",
    interaktion: "jaNein",
    correctJaNein: true,
    category: "voegel",
    difficulty: "mittel",
    text: "„Ein schmaler, hoher Käfig nützt Wellensittichen wenig, weil sie waagerecht fliegen.“",
    explanation: "Wellensittiche fliegen horizontal. Entscheidend sind Länge und freie Flugbahnen, dazu täglicher Freiflug.",
    wikiPath: "/voegel/freiflug/",
    sourceRef: "https://wahre-haustierliebe.de/voegel/freiflug/"
  },
  {
    id: "mythen-voegel-stutzen-001",
    mode: "mythen",
    interaktion: "jaNein",
    correctJaNein: false,
    category: "voegel",
    difficulty: "knifflig",
    text: "„Gestutzte Flugfedern machen die Wohnung für einen Vogel sicherer.“",
    explanation: "Stutzen nimmt dem Vogel seine wichtigste Bewegungsmöglichkeit, erschwert Flucht und Landung und kann Stürze begünstigen. Der Raum muss zum Vogel passen, nicht umgekehrt.",
    wikiPath: "/voegel/freiflug/",
    sourceRef: "https://wahre-haustierliebe.de/voegel/freiflug/"
  },

  // ============ FALL-ENTSCHEIDUNG ============
  {
    id: "fall-fundtier-garten-001",
    mode: "fall",
    interaktion: "vierKarten",
    sticker: ["katze"],
    category: "katzen",
    difficulty: "knifflig",
    text: "Am Waldrand sitzt ein getigertes Kätzchen, das hilflos wirkt. Die Mutter ist nirgends zu sehen. Was tust du zuerst?",
    options: [
      "Es vorsichtig mitnehmen und in der nächsten Tierarztpraxis abgeben",
      "Leise zurückgehen und nach einigen Stunden aus der Ferne nachsehen",
      "In der Nähe warten, bis die Mutter zurückkommt",
      "Es in die Sonne setzen, damit es nicht auskühlt"
    ],
    correctIndex: 1,
    explanation: "Es kann eine junge Wildkatze sein. Wer in der Nähe wartet, hält die Mutter womöglich fern. Nur bei akuter Gefahr, etwa Verletzung oder Straße, sofort eine zuständige Stelle anrufen.",
    wikiPath: "/katzen/wildkatzenbaby-gefunden/",
    sourceRef: "https://wahre-haustierliebe.de/katzen/wildkatzenbaby-gefunden/"
  },
  {
    id: "fall-hund-stadtfest-001",
    mode: "fall",
    interaktion: "vierKarten",
    sticker: ["hund", "halsband"],
    category: "hunde",
    difficulty: "leicht",
    text: "Am Wochenende ist Stadtfest mit Musik und Gedränge. Dein Hund läuft sonst gut an der Leine mit. Was tust du?",
    options: [
      "Ihn mitnehmen, weil er ja brav mitläuft und dabei sein soll",
      "Ihn zu Hause lassen, wo er in Ruhe schlafen kann",
      "Ihn mitnehmen und ihm unterwegs viele Leckerlis geben",
      "Ihn mitnehmen und nur bei lauten Bühnen kurz auf den Arm nehmen"
    ],
    correctIndex: 1,
    explanation: "Brav mitlaufen heißt nicht entspannt sein. Lärm, Enge und fremde Hände sind für viele Hunde purer Stress. Die freundlichste Entscheidung ist oft: Der Hund bleibt zu Hause.",
    wikiPath: "/hunde/stadtfest-rummel/",
    sourceRef: "https://wahre-haustierliebe.de/hunde/stadtfest-rummel/"
  },
  {
    id: "fall-hund-auto-001",
    mode: "fall",
    interaktion: "vierKarten",
    sticker: ["hund", "sonne"],
    category: "hunde",
    difficulty: "mittel",
    text: "Auf dem Supermarktparkplatz hechelt ein Hund stark in einem geschlossenen Auto in der Sonne. Was tust du?",
    options: [
      "Einen Zettel mit deiner Nummer an die Scheibe hängen und weitergehen",
      "Halterin oder Halter suchen lassen und Polizei oder Feuerwehr rufen",
      "Abwarten, ob in den nächsten zehn Minuten jemand zurückkommt",
      "Wasser über das Autodach gießen, damit es abkühlt"
    ],
    correctIndex: 1,
    explanation: "Bei Hitzestress zählt Handeln, nicht Abwarten. Halterin oder Halter ausrufen lassen, Polizei oder Feuerwehr rufen und die Situation mit Fotos festhalten.",
    wikiPath: "/hitzefalle-auto/",
    sourceRef: "https://wahre-haustierliebe.de/hitzefalle-auto/"
  },
  {
    id: "fall-kind-kaninchen-001",
    mode: "fall",
    interaktion: "vierKarten",
    sticker: ["napf", "fenster"],
    category: "kleintiere",
    difficulty: "leicht",
    text: "Ein siebenjähriges Kind wünscht sich sehnlich ein Kaninchen zum Kuscheln. Was tust du als Elternteil?",
    options: [
      "Ein Kaninchen kaufen und es zu Weihnachten als Überraschung schenken",
      "Erst klären, ob Platz, Zeit und ein zweites Tier über Jahre drin sind",
      "Ein einzelnes Kaninchen holen, das sich ganz auf das Kind einstellt",
      "Ein Zwergkaninchen holen, weil es klein und pflegeleicht ist"
    ],
    correctIndex: 1,
    explanation: "Kaninchen sind Fluchttiere, keine Kuscheltiere. Sie brauchen viel Platz, mindestens einen Artgenossen und tägliche Versorgung über viele Jahre. Die Verantwortung liegt bei den Erwachsenen.",
    wikiPath: "/kleintiere/kaninchen/",
    sourceRef: "https://wahre-haustierliebe.de/kleintiere/kaninchen/"
  },
  {
    id: "fall-katze-unsauber-001",
    mode: "fall",
    interaktion: "vierKarten",
    sticker: ["katze", "fenster"],
    category: "katzen",
    difficulty: "mittel",
    text: "Deine Wohnungskatze pinkelt seit ein paar Tagen immer wieder neben das Katzenklo. Was tust du?",
    options: [
      "Sie konsequent ins Klo setzen, sobald sie daneben geht",
      "Tierärztlich abklären lassen und die Toilettensituation prüfen",
      "Ein anderes Streu ausprobieren und ein paar Wochen in Ruhe abwarten",
      "Die Stelle mit einem Duftspray unattraktiv machen"
    ],
    correctIndex: 1,
    explanation: "Unsauberkeit ist selten Protest. Häufig stecken Stress, Schmerzen oder Harnwegserkrankungen dahinter. Lieber einmal zu viel zum Tierarzt.",
    wikiPath: "/katzen/stilles-leiden/",
    sourceRef: "https://wahre-haustierliebe.de/katzen/stilles-leiden/"
  },
  {
    id: "fall-hund-urlaub-001",
    mode: "fall",
    interaktion: "vierKarten",
    sticker: ["hund", "halsband"],
    category: "hunde",
    difficulty: "knifflig",
    text: "Der Urlaub ist gebucht, dein Hund ist alt und kurzatmig. Die vertraute Nachbarin hätte Zeit. Was tust du?",
    options: [
      "Ihn mitnehmen, weil er dich im Urlaub sonst zu sehr vermisst",
      "Ihn bei der Nachbarin lassen, nach einem Probetag vorab",
      "Kurzfristig die günstigste freie Tierpension buchen",
      "Ihn mitnehmen und die Fahrt in einem Stück durchziehen"
    ],
    correctIndex: 1,
    explanation: "Die Frage ist nicht, ob du dein Tier irgendwie mitnehmen kannst, sondern welche Lösung es am wenigsten belastet. Betreuung durch vertraute Menschen vorher proben.",
    wikiPath: "/tiere-und-urlaub/",
    sourceRef: "https://wahre-haustierliebe.de/tiere-und-urlaub/"
  },
  {
    id: "fall-spontankauf-zoo-001",
    mode: "fall",
    interaktion: "vierKarten",
    sticker: ["meeri", "napf"],
    category: "kleintiere",
    difficulty: "leicht",
    text: "Im Zoofachgeschäft sitzen süße junge Meerschweinchen, das Preisschild ist günstig. Du überlegst spontan zuzugreifen. Was tust du?",
    options: [
      "Zwei mitnehmen, damit keines allein bleibt, und das Gehege nachkaufen",
      "Erst zu Hause prüfen, ob Platz, Zeit und Kosten dauerhaft passen",
      "Eines mitnehmen und später bei Bedarf ein zweites dazuholen",
      "Nach dem jüngsten Tier fragen, damit es sich besser eingewöhnt"
    ],
    correctIndex: 1,
    explanation: "Spontankäufe sind eine häufige Quelle für spätere Abgaben. Wer Platz, Zeit, Kosten und Gruppenhaltung vorher klärt, entscheidet für das Tier und nicht für den Moment.",
    wikiPath: "/kleintiere/meerschweinchen/",
    sourceRef: "https://wahre-haustierliebe.de/kleintiere/meerschweinchen/"
  },
  {
    id: "fall-voegel-pfanne-001",
    mode: "fall",
    interaktion: "vierKarten",
    sticker: ["welli", "kaefig"],
    category: "voegel",
    difficulty: "mittel",
    text: "Eine beschichtete Pfanne ist auf dem Herd überhitzt, es qualmt. Deine Wellensittiche sitzen im Nebenraum. Was tust du?",
    options: [
      "Die Vögel sofort in einen gut belüfteten Raum bringen und lüften",
      "Die Tür zum Nebenraum schließen und abwarten, bis es aufhört",
      "Ein Tuch über den Käfig legen, damit sie nichts einatmen",
      "Nur die Küche kurz lüften, der Nebenraum ist weit genug weg"
    ],
    correctIndex: 0,
    explanation: "Stark erhitzte Beschichtungen können Dämpfe freisetzen, die Vögel in Minuten töten. Atemnot oder deutliche Schwäche danach sind ein Notfall für eine vogelkundige Praxis.",
    wikiPath: "/voegel/kuechenluft-teflon/",
    sourceRef: "https://wahre-haustierliebe.de/voegel/kuechenluft-teflon/"
  },
  {
    id: "fall-voegel-krank-001",
    mode: "fall",
    interaktion: "vierKarten",
    sticker: ["welli", "napf"],
    category: "voegel",
    difficulty: "knifflig",
    text: "Dein Wellensittich sitzt tagsüber aufgeplustert, frisst weniger und wippt beim Atmen mit dem Schwanz. Was tust du?",
    options: [
      "Ihm zwei Tage Ruhe gönnen und das Futter aufwerten",
      "Zeitnah eine vogelkundige Tierarztpraxis aufsuchen",
      "Den Käfig wärmer stellen und die Nacht abwarten",
      "Ihm Vitamintropfen ins Trinkwasser geben"
    ],
    correctIndex: 1,
    explanation: "Vögel zeigen Krankheit als Beutetiere oft erst spät. Aufplustern außerhalb der Ruhe, weniger Fressen und Schwanzwippen beim Atmen müssen schnell abgeklärt werden.",
    wikiPath: "/voegel/krankheit-erkennen/",
    sourceRef: "https://wahre-haustierliebe.de/voegel/krankheit-erkennen/"
  }
];
