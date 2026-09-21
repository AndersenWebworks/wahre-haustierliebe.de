// data/questions.js – kanonische Fragenquelle der WHL-PWA
// ESM-Export statt separater JSON-Datei: funktioniert in jeder statischen Umgebung,
// ist GitHub-Pages-konform (application/javascript MIME-Type).

export const version = "2026-09-21.1";

export const categories = {
  hunde: { label: "Hunde", blurb: "Was Hunde wirklich brauchen" },
  katzen: { label: "Katzen", blurb: "Was Katzen wirklich brauchen" },
  kleintiere: { label: "Kleintiere", blurb: "Hamster, Kaninchen, Meerschweinchen und Co." },
  voegel: { label: "Vögel", blurb: "Was Wellensittich und Co. wirklich brauchen" }
};

export const questions = [
  {
    id: "hunde-allein-001",
    category: "hunde",
    difficulty: "leicht",
    text: "Wie lange darf ein erwachsener, gesunder Hund normalerweise allein zu Hause bleiben?",
    options: [
      "Einen ganzen Arbeitstag, das schafft er schon",
      "Bis zu vier Stunden, mit Vorbereitung",
      "Hunde dürfen nie allein bleiben",
      "So lange er schläft, stört es ihn nicht"
    ],
    correctIndex: 1,
    explanation: "Hunde sind soziale Lebewesen. Vier Stunden sind für die meisten erwachsenen Hunde das Maximum, Welpen und alte Hunde brauchen kürzere Intervalle. Ein normaler Arbeitstag ohne Betreuung ist für die meisten Hunde zu lang.",
    wikiPath: "/hunde/allein-zu-hause/",
    sourceRef: "https://wahre-haustierliebe.de/hunde/allein-zu-hause/"
  },
  {
    id: "hunde-garten-001",
    category: "hunde",
    difficulty: "leicht",
    text: "Reicht ein eigener Garten, damit ein Hund artgerecht gehalten wird?",
    options: [
      "Ja, ein großer Garten ersetzt Spaziergänge vollständig",
      "Nein, der Garten ist kein Ersatz für gemeinsame Bewegung draußen",
      "Ja, solange er dort frei laufen kann",
      "Nur wenn genug andere Hunde im Garten sind"
    ],
    correctIndex: 1,
    explanation: "Ein Garten bietet Rückzug, aber Hunde brauchen Begegnungen, neue Gerüche, gemeinsames Laufen mit ihrer Bezugsperson. Ein Garten allein macht noch keinen Hund glücklich.",
    wikiPath: "/hunde/garten-auslauf/",
    sourceRef: "https://wahre-haustierliebe.de/hunde/garten-auslauf/"
  },
  {
    id: "hunde-zwinger-001",
    category: "hunde",
    difficulty: "leicht",
    text: "Ist es vertretbar, einen Familienhund die meiste Zeit im Zwinger zu halten?",
    options: [
      "Ja, im Zwinger fühlt sich der Hund geborgen",
      "Nur nachts, tagsüber ist er frei",
      "Nein, Zwingerhaltung ist keine artgerechte Haltung",
      "Ja, solange der Zwinger groß genug ist"
    ],
    correctIndex: 2,
    explanation: "Hunde leben in sozialen Familienverbänden. Ein Zwinger isoliert sie. Auch ein großer Zwinger ersetzt nicht den Kontakt zu ihrer Bezugsperson.",
    wikiPath: "/hunde/hofhaltung-und-zwinger/",
    sourceRef: "https://wahre-haustierliebe.de/hunde/hofhaltung-und-zwinger/"
  },
  {
    id: "hunde-sozial-001",
    category: "hunde",
    difficulty: "leicht",
    text: "Was braucht ein Hund jeden Tag am meisten von seiner Bezugsperson?",
    options: [
      "Nur Futter und Wasser",
      "Lange Spaziergänge ohne Kontakt",
      "Zeit, Aufmerksamkeit und gemeinsame Rituale",
      "Ein gleichförmiges Tagesprogramm ohne Ansprache"
    ],
    correctIndex: 2,
    explanation: "Hunde binden sich eng. Was ihnen fehlt, ist nicht nur Bewegung, sondern vor allem verlässliche gemeinsame Zeit, Ansprache und Rituale mit ihren Menschen.",
    wikiPath: "/hunde/soziale-beduerfnisse/",
    sourceRef: "https://wahre-haustierliebe.de/hunde/soziale-beduerfnisse/"
  },
  {
    id: "katzen-wohnung-001",
    category: "katzen",
    difficulty: "leicht",
    text: "Reicht eine Wohnung, damit eine Katze artgerecht leben kann?",
    options: [
      "Ja, solange sie genug zu fressen hat",
      "Nein, jede Katze braucht Freigang",
      "Ja, wenn die Wohnung ein vollständiges Katzenrevier mit Rückzug und Höhe bietet",
      "Nur wenn ein zweiter Hund im Haushalt lebt"
    ],
    correctIndex: 2,
    explanation: "Wohnungskatzen können sehr gut leben, wenn die Wohnung vollständig für sie eingerichtet ist: Rückzugsorte, erhöhte Plätze, Kratzmöglichkeiten und Beschäftigung. Freigang ist nicht zwingend, aber er birgt eigene Risiken.",
    wikiPath: "/katzen/wohnungshaltung/",
    sourceRef: "https://wahre-haustierliebe.de/katzen/wohnungshaltung/"
  },
  {
    id: "katzen-kastration-001",
    category: "katzen",
    difficulty: "leicht",
    text: "Warum ist die Kastration von Freigängerkatzen besonders wichtig?",
    options: [
      "Weil kastrierte Katzen länger leben",
      "Weil sie dann nicht mehr markieren",
      "Weil unkastrierte Freigänger unkontrolliert für Nachwuchs sorgen",
      "Weil es in manchen Bundesländern Pflicht ist"
    ],
    correctIndex: 2,
    explanation: "Eine unkastrierte Freigängerkatze kann in wenigen Jahren für zahlreichen ungewollten Nachwuchs sorgen. Kastration ist der wirksamste Beitrag gegen verwilderte Katzenpopulationen.",
    wikiPath: "/katzen/kastration/",
    sourceRef: "https://wahre-haustierliebe.de/katzen/kastration/"
  },
  {
    id: "katzen-sozial-001",
    category: "katzen",
    difficulty: "leicht",
    text: "Wie sieht ein gesundes Katzenrevier in der Wohnung aus?",
    options: [
      "Ein großes Körbchen und ein paar Spielzeugmäuse",
      "Rückzugsorte, erhöhte Plätze, Kratzgelegenheiten und ruhige Ecken",
      "Ein eigener Garten für jede Katze",
      "Ein offenes Katzenklo in der Mitte des Wohnzimmers"
    ],
    correctIndex: 1,
    explanation: "Katzen brauchen ein vollständiges Wohnungsrevier mit Rückzug, Höhe, Kratzgelegenheiten und ruhigen Plätzen. Eine einzige Liegefläche reicht nicht, um die Bedürfnisse einer Wohnungskatze zu erfüllen.",
    wikiPath: "/katzen/wohnungshaltung/",
    sourceRef: "https://wahre-haustierliebe.de/katzen/wohnungshaltung/"
  },
  {
    id: "katzen-wildkatze-001",
    category: "katzen",
    difficulty: "leicht",
    text: "Sie finden ein scheinbar verlassenes Wildkatzenbaby. Was ist richtig?",
    options: [
      "Sofort mitnehmen und mit Flasche aufziehen",
      "In eine Decke wickeln und aufwärmen",
      "Aus der Ferne beobachten und im Zweifel einen Experten rufen",
      "Mit Katzenmilch füttern"
    ],
    correctIndex: 2,
    explanation: "Wildkatzenmütter lassen ihre Jungen oft allein, während sie auf Nahrungssuche sind. Ein vermeintlich verlassenes Jungtier ist häufig gar nicht verlassen. Beobachten statt handeln schützt das Leben des Jungtiers.",
    wikiPath: "/katzen/wildkatzenbaby-gefunden/",
    sourceRef: "https://wahre-haustierliebe.de/katzen/wildkatzenbaby-gefunden/"
  },
  {
    id: "kleintiere-hamster-001",
    category: "kleintiere",
    difficulty: "leicht",
    text: "Wie viel Grundfläche braucht ein Goldhamster als dauerhaftes Zuhause?",
    options: [
      "Einen handelsüblichen Käfig",
      "Mindestens einen Quadratmeter zusammenhängende Grundfläche",
      "Einen Hamsterkäfig mit Laufrad",
      "Ein Terrarium mit Sand"
    ],
    correctIndex: 1,
    explanation: "Goldhamster brauchen deutlich mehr Platz als die Käfige im Zoohandel. Ein Quadratmeter zusammenhängende Fläche mit tiefer Einstreu ist die Untergrenze, damit sie graben, laufen und sich zurückziehen können.",
    wikiPath: "/kleintiere/hamster/",
    sourceRef: "https://wahre-haustierliebe.de/kleintiere/hamster/"
  },
  {
    id: "kleintiere-hamster-002",
    category: "kleintiere",
    difficulty: "leicht",
    text: "Darf ein Goldhamster zusammen mit einem Artgenossen leben?",
    options: [
      "Ja, Goldhamster sind sehr gesellig",
      "Ja, am besten zu zweit im selben Käfig",
      "Nein, Goldhamster sind Einzelgänger",
      "Nur zwei Männchen zusammen"
    ],
    correctIndex: 2,
    explanation: "Goldhamster sind strenge Einzelgänger. Ein vermeintlicher Partner bedeutet Stress und Revierkämpfe. Artgenossen werden in freier Natur sofort vertrieben.",
    wikiPath: "/kleintiere/hamster/",
    sourceRef: "https://wahre-haustierliebe.de/kleintiere/hamster/"
  },
  {
    id: "kleintiere-meeri-001",
    category: "kleintiere",
    difficulty: "leicht",
    text: "Darf ein Meerschweinchen einzeln gehalten werden?",
    options: [
      "Ja, solange es genug Auslauf hat",
      "Ja, wenn der Mensch viel Zeit mit ihm verbringt",
      "Nein, Meerschweinchen brauchen immer Artgenossen",
      "Nur in großen Gehegen"
    ],
    correctIndex: 2,
    explanation: "Meerschweinchen sind soziale Gruppentiere. Ein Mensch kann einen Artgenossen nicht ersetzen. Einzelhaltung macht Meerschweinchen auf Dauer krank.",
    wikiPath: "/kleintiere/meerschweinchen/",
    sourceRef: "https://wahre-haustierliebe.de/kleintiere/meerschweinchen/"
  },
  {
    id: "kleintiere-kind-001",
    category: "kleintiere",
    difficulty: "leicht",
    text: "Ist der Goldhamster ein geeignetes erstes Haustier für ein kleines Kind?",
    options: [
      "Ja, Hamster sind pflegeleicht",
      "Ja, wenn das Kind das Futter gibt",
      "Nein, Goldhamster sind nachtaktiv, stressanfällig und brauchen viel Ruhe",
      "Nur in den ersten Wochen, danach reicht ein Käfig"
    ],
    correctIndex: 2,
    explanation: "Goldhamster sind keine Kindertiere. Sie sind nachtaktiv, möchten tagsüber ihre Ruhe und reagieren auf grelles Licht und Lärm empfindlich. Das passt nicht zu Kinderhänden.",
    wikiPath: "/kleintiere/hamster/",
    sourceRef: "https://wahre-haustierliebe.de/kleintiere/hamster/"
  },
  {
    id: "voegel-kueche-001",
    category: "voegel",
    difficulty: "leicht",
    text: "Warum ist Küchenluft für Vögel besonders gefährlich?",
    options: [
      "Weil Vögel nicht gern kochen",
      "Weil Teflondämpfe und Kochdünste für Vögel tödlich sein können",
      "Weil Vögel die Wärme nicht vertragen",
      "Weil Vögel kein Brot mögen"
    ],
    correctIndex: 1,
    explanation: "Beim Erhitzen von antihaftbeschichtetem Kochgeschirr entstehen Dämpfe, die für Vögel tödlich sind. Auch Rauch und intensive Kochdünste sind gefährlich. Vögel und Küche passen nicht zusammen.",
    wikiPath: "/voegel/kuechenluft-teflon/",
    sourceRef: "https://wahre-haustierliebe.de/voegel/kuechenluft-teflon/"
  },
  {
    id: "voegel-schwarm-001",
    category: "voegel",
    difficulty: "leicht",
    text: "Darf ein Wellensittich einzeln gehalten werden?",
    options: [
      "Ja, Wellensittiche sind Einzelgänger",
      "Ja, solange der Mensch viel mit ihm spricht",
      "Nein, Wellensittiche brauchen mindestens einen Artgenossen",
      "Nur in der Mauser"
    ],
    correctIndex: 2,
    explanation: "Wellensittiche sind Schwarmtiere. Ein Mensch kann einen Artgenossen nicht ersetzen. Einzelhaltung führt auf Dauer zu Verhaltensstörungen.",
    wikiPath: "/voegel/schwarmhaltung/",
    sourceRef: "https://wahre-haustierliebe.de/voegel/schwarmhaltung/"
  },
  {
    id: "voegel-uv-001",
    category: "voegel",
    difficulty: "leicht",
    text: "Brauchen Vögel UV-Licht?",
    options: [
      "Nein, normales Tageslicht reicht",
      "Ja, UV-Licht ist wichtig für die Vitamin-D-Synthese und das Federkleid",
      "Nur im Sommer",
      "Nur in der Wachstumsphase"
    ],
    correctIndex: 1,
    explanation: "Vögel sehen UV-Licht und brauchen es für die Vitamin-D-Synthese und ein gesundes Federkleid. Fenster filtern den UV-Anteil heraus, deshalb ist eine spezielle UV-Lampe im Vogelzimmer sinnvoll.",
    wikiPath: "/voegel/uv-licht/",
    sourceRef: "https://wahre-haustierliebe.de/voegel/uv-licht/"
  }
];