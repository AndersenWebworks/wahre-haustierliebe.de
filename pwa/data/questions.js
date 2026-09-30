// data/questions.js - kanonische Fragenquelle der WHL-PWA
// Drei Modi: klassisch, mythen, fall. Jede Frage trägt optional
// `interaktion` (vierKarten | jaNein) und `sticker` (Fall-Sticker).
// Bei interaktion "jaNein" wird `correctJaNein` statt correctIndex ausgewertet.
// Jede Frage braucht einen `wikiPath`, der auf eine bestehende Seite zeigt.

export const version = "2026-09-30.4";

export const categories = {
  hunde: { label: "Hunde", blurb: "Alltag, Bindung und Bewegung" },
  katzen: { label: "Katzen", blurb: "Revier, Freigang und Verantwortung" },
  kleintiere: { label: "Kleintiere", blurb: "Kleine Tiere, große Ansprüche" },
  voegel: { label: "Vögel", blurb: "Schwarmleben und sensible Sinne" },
  exoten: { label: "Exoten", blurb: "Reptilien, Schildkröten und Fische" },
  pferde: { label: "Pferde", blurb: "Herde, Platz und Haltung" },
  tierschutz: { label: "Tierschutz", blurb: "Adoption, Zucht und Notfälle" }
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
    id: "hunde-abgabealter-102",
    mode: "klassisch",
    interaktion: "vierKarten",
    category: "hunde",
    difficulty: "mittel",
    text: "Welche Beobachtung spricht dafür, die Abgabe eines Welpen zu verschieben?",
    options: [
      "Er frisst selbstständig und erkundet seine Umgebung",
      "Er ist kleiner und unreifer als seine Geschwister",
      "Er spielt ausdauernd mit seinen Wurfgeschwistern",
      "Er sucht häufig Kontakt zu seinen Wurfgeschwistern"
    ],
    correctIndex: 1,
    explanation: "Ist ein Welpe kleiner oder unreifer als seine Geschwister, kann ein späterer Umzug besser sein. Gesundheit und Entwicklung des einzelnen Welpen zählen mehr als ein schneller Abschluss.",
    wikiPath: "/hunde/abgabealter/",
    sourceRef: "https://wahre-haustierliebe.de/hunde/abgabealter/"
  },
  {
    id: "hunde-buero-101",
    mode: "klassisch",
    interaktion: "vierKarten",
    category: "hunde",
    difficulty: "leicht",
    text: "Welcher Platz im Büro passt am besten zu einem Hund?",
    options: [
      "An der Empfangstheke mit Blick auf Besucher",
      "An einem ruhigen Platz abseits der Laufwege",
      "An einer sonnigen Fensterfront mit Aussicht",
      "An der Kaffeeküche nahe bei den Kollegen"
    ],
    correctIndex: 1,
    explanation: "Der Ruheplatz soll zugfrei, nicht zu warm und abseits von Laufwegen, Türen und lauten Geräten liegen. Dort soll dein Hund länger ungestört schlafen können.",
    wikiPath: "/hunde/hund-im-buero/",
    sourceRef: "https://wahre-haustierliebe.de/hunde/hund-im-buero/"
  },
  {
    id: "hunde-buero-102",
    mode: "klassisch",
    interaktion: "vierKarten",
    category: "hunde",
    difficulty: "mittel",
    text: "Wann wird eine Box im Büro zum Problem?",
    options: [
      "Wenn sie mit einer weichen Decke ausgelegt ist",
      "Wenn sie unter deinem Schreibtisch offen steht",
      "Wenn dein Hund sie freiwillig zum Schlafen nutzt",
      "Wenn sie geschlossen lange die Bewegung ersetzt"
    ],
    correctIndex: 3,
    explanation: "Eine offene Box kann ein Rückzugsort sein, wenn sie wirklich sein Bereich ist. Eine verschlossene Box über längere Zeit ist dagegen keine Ruhe, sondern Unterbringung und kann tierschutzrechtlich problematisch sein.",
    wikiPath: "/hunde/hund-im-buero/",
    sourceRef: "https://wahre-haustierliebe.de/hunde/hund-im-buero/"
  },
  {
    id: "hunde-sozial-101",
    mode: "klassisch",
    interaktion: "vierKarten",
    category: "hunde",
    difficulty: "leicht",
    text: "Wie viel Bewegung braucht ein Hund je nach Rasse und Alter täglich?",
    options: [
      "15–30 Minuten",
      "1–3 Stunden",
      "4–6 Stunden",
      "30–45 Minuten"
    ],
    correctIndex: 1,
    explanation: "Je nach Rasse und Alter sind es täglich etwa ein bis drei Stunden. Dazu kommen Geistesarbeit, Nähe zu Bezugspersonen und ein verlässlicher Tagesrhythmus.",
    wikiPath: "/hunde/soziale-beduerfnisse/",
    sourceRef: "https://wahre-haustierliebe.de/hunde/soziale-beduerfnisse/"
  },
  {
    id: "hunde-sozial-102",
    mode: "klassisch",
    interaktion: "vierKarten",
    category: "hunde",
    difficulty: "mittel",
    text: "Dein Hund ist nach dem Spaziergang noch aufgedreht. Was lastet viele Hunde besser aus als noch mehr Tempo?",
    options: [
      "Ruhige Nasenarbeit mit Futterbeutel und Spuren",
      "Schnelle Ballspiele mit vielen Wiederholungen",
      "Längeres Toben in einer großen Hundegruppe",
      "Eine zusätzliche zügige Runde am Fahrrad"
    ],
    correctIndex: 0,
    explanation: "Suchen statt hochdrehen: Geruchsspuren, Futterbeutel oder versteckte Leckerchen fordern den Kopf und beruhigen. Mehr Tempo macht viele Hunde eher nervöser.",
    wikiPath: "/hunde/soziale-beduerfnisse/",
    sourceRef: "https://wahre-haustierliebe.de/hunde/soziale-beduerfnisse/"
  },
  {
    id: "hunde-sozial-103",
    mode: "klassisch",
    interaktion: "vierKarten",
    category: "hunde",
    difficulty: "knifflig",
    text: "Welche Alltagssignale sorgen für echte Sicherheit und sind nicht nur Kunststücke?",
    options: [
      "Pfötchen geben, Rolle, Männchen und Slalom",
      "Sitz auf Distanz, Bellen auf Kommando und Peng",
      "Rückruf, Decke, Warten und ruhiges Anleinen",
      "Apportieren, Aufräumen, Türöffnen und Zeigen"
    ],
    correctIndex: 2,
    explanation: "Rückruf, Decke, Warten, Tauschen und ruhiges Anleinen tragen im Alltag. Sie geben deinem Hund Orientierung, wenn es draußen unübersichtlich wird.",
    wikiPath: "/hunde/soziale-beduerfnisse/",
    sourceRef: "https://wahre-haustierliebe.de/hunde/soziale-beduerfnisse/"
  },
  {
    id: "hunde-stadtfest-101",
    mode: "klassisch",
    interaktion: "vierKarten",
    category: "hunde",
    difficulty: "mittel",
    text: "Welche Kombination kann auf Überforderung hindeuten?",
    options: [
      "Lefzenlecken und auffälliges Gähnen",
      "Schwanzwedeln und aufmerksames Schauen",
      "Schnüffeln am Boden an lockerer Leine",
      "Kurzes Schütteln nach dem Anhalten"
    ],
    correctIndex: 0,
    explanation: "Lefzenlecken, auffälliges Gähnen und Kopfabwenden gehören zu den Zeichen von Überforderung, ebenso Wegziehen, ständiges Scannen oder Futterverweigerung. Ein einzelnes Signal beweist noch nichts, der Zusammenhang zählt.",
    wikiPath: "/hunde/stadtfest-rummel/",
    sourceRef: "https://wahre-haustierliebe.de/hunde/stadtfest-rummel/"
  },
  {
    id: "hunde-garten-101",
    mode: "klassisch",
    interaktion: "vierKarten",
    category: "hunde",
    difficulty: "mittel",
    text: "Was verlangt die Tierschutz-Hundeverordnung für den Auslauf?",
    options: [
      "Täglich mindestens 60 Minuten Spaziergang",
      "Ein Grundstück ab einer festen Mindestgröße",
      "Ausreichend Auslauf, passend zu Rasse und Alter",
      "Feste Gassirunden zu bestimmten Tageszeiten"
    ],
    correctIndex: 2,
    explanation: "Die Verordnung schreibt keine starre Minutenformel vor. Auslauf und Sozialkontakte müssen zu Rasse, Alter und Gesundheit des Hundes passen. Wichtig ist, dass er aus der immer gleichen Haltungsumgebung herauskommt.",
    wikiPath: "/hunde/garten-auslauf/",
    sourceRef: "https://wahre-haustierliebe.de/hunde/garten-auslauf/"
  },
  {
    id: "hunde-allein-101",
    mode: "klassisch",
    interaktion: "vierKarten",
    category: "hunde",
    difficulty: "mittel",
    text: "Welche regelmäßige Obergrenze fürs Alleinbleiben erwachsener Hunde empfehlen TASSO und Tierschutzbund?",
    options: [
      "2–3 Stunden",
      "4–5 Stunden",
      "6–7 Stunden",
      "8–9 Stunden"
    ],
    correctIndex: 1,
    explanation: "Erwachsene Hunde sollten nicht länger als vier bis fünf Stunden am Stück allein sein. In Ausnahmen sind es bis zu sechs Stunden, nicht als Regel.",
    wikiPath: "/hunde/allein-zu-hause/",
    sourceRef: "https://wahre-haustierliebe.de/hunde/allein-zu-hause/"
  },
  {
    id: "hunde-allein-102",
    mode: "klassisch",
    interaktion: "vierKarten",
    category: "hunde",
    difficulty: "knifflig",
    text: "Welche Dauer ist für das Alleinbleiben erwachsener Hunde als Ausnahme vertretbar, nicht als Regel?",
    options: [
      "5 Stunden",
      "7 Stunden",
      "8 Stunden",
      "6 Stunden"
    ],
    correctIndex: 3,
    explanation: "In Ausnahmen, nicht als Regel, sind bis zu sechs Stunden vertretbar. Ein normaler Arbeitstag von acht Stunden ohne Betreuung ist es nicht.",
    wikiPath: "/hunde/allein-zu-hause/",
    sourceRef: "https://wahre-haustierliebe.de/hunde/allein-zu-hause/"
  },
  {
    id: "hunde-kosten-101",
    mode: "klassisch",
    interaktion: "vierKarten",
    category: "hunde",
    difficulty: "knifflig",
    text: "Mit welcher jährlichen Futterkostenspanne solltest du für einen mittelgroßen Hund rechnen?",
    options: [
      "100–250 €",
      "300–500 €",
      "600–1.500 €",
      "1.600–3.000 €"
    ],
    correctIndex: 2,
    explanation: "Für Futter kannst du mit 600 bis 1.500 Euro im Jahr rechnen. Das ist eine Orientierung für mittelgroße Hunde; große Hunde oder Spezialfutter können deutlich mehr kosten.",
    wikiPath: "/hunde/kosten/",
    sourceRef: "https://wahre-haustierliebe.de/hunde/kosten/"
  },
  {
    id: "hunde-kosten-102",
    mode: "klassisch",
    interaktion: "vierKarten",
    category: "hunde",
    difficulty: "leicht",
    text: "Wann sollte die Rücklage für tierärztliche Notfälle stehen?",
    options: [
      "Sobald die erste Tierarztrechnung kommt",
      "Wenn er älter wird und öfter kränkelt",
      "Sobald die Versicherung abgeschlossen ist",
      "Bevor dein Hund bei dir einzieht"
    ],
    correctIndex: 3,
    explanation: "Lege das Geld für den Notfall zurück, bevor der Hund einzieht, und behandle es nicht als Reserve für normale Ausgaben. Auch eine Versicherung ersetzt die eigene Rücklage nicht.",
    wikiPath: "/hunde/kosten/",
    sourceRef: "https://wahre-haustierliebe.de/hunde/kosten/"
  },
  {
    id: "hunde-kosten-103",
    mode: "klassisch",
    interaktion: "vierKarten",
    category: "hunde",
    difficulty: "knifflig",
    text: "Was ist in den planbaren Grundkosten für einen Hund ausdrücklich nicht enthalten?",
    options: [
      "Hundesteuer, Haftpflicht und Krankenversicherung",
      "Urlaub, Betreuung und medizinische Ausnahmefälle",
      "Futter, Impfungen und Vorsorge beim Tierarzt",
      "Anschaffung und Erstausstattung mit Körbchen"
    ],
    correctIndex: 1,
    explanation: "Urlaub, Betreuung und medizinische Ausnahmefälle sind in den planbaren Grundkosten ausdrücklich nicht enthalten.",
    wikiPath: "/hunde/kosten/",
    sourceRef: "https://wahre-haustierliebe.de/hunde/kosten/"
  },
  {
    id: "hunde-kastration-101",
    mode: "klassisch",
    interaktion: "vierKarten",
    category: "hunde",
    difficulty: "knifflig",
    text: "Welche Erkrankung der Hündin kann eine Kastration verhindern?",
    options: [
      "Hüftdysplasie bei großen Hunderassen",
      "Harninkontinenz nach dem Eingriff",
      "Gebärmuttervereiterung (Pyometra)",
      "Gelenkleiden bei großen Hunderassen"
    ],
    correctIndex: 2,
    explanation: "Bei Hündinnen verhindert die Kastration die Pyometra und senkt bei früher Durchführung das Risiko für Mammatumoren. Dem stehen unter anderem mögliche Harninkontinenz sowie Gelenk- und Tumorrisiken gegenüber.",
    wikiPath: "/hunde/kastration/",
    sourceRef: "https://wahre-haustierliebe.de/hunde/kastration/"
  },
  {
    id: "hunde-zwinger-101",
    mode: "klassisch",
    interaktion: "vierKarten",
    category: "hunde",
    difficulty: "knifflig",
    text: "Wovon hängt die vorgeschriebene Zwingergröße ab?",
    options: [
      "Vom Körpergewicht des Hundes",
      "Von der Körperlänge des Hundes",
      "Vom Bewegungsdrang des Hundes",
      "Von der Schulterhöhe des Hundes"
    ],
    correctIndex: 3,
    explanation: "Die Tierschutz-Hundeverordnung koppelt die Zwingergröße an die Schulterhöhe. Dazu gehören Auslauf außerhalb des Zwingers, Witterungsschutz, Umgang mit einer Betreuungsperson und regelmäßig möglicher Kontakt zu Artgenossen.",
    wikiPath: "/hunde/hofhaltung-und-zwinger/",
    sourceRef: "https://wahre-haustierliebe.de/hunde/hofhaltung-und-zwinger/"
  },
  {
    id: "hunde-gesundheit-101",
    mode: "klassisch",
    interaktion: "vierKarten",
    category: "hunde",
    difficulty: "knifflig",
    text: "Ab welchem Lebensjahr haben viele Hunde Zahnstein oder Zahnfleischentzündungen?",
    options: [
      "Ab dem ersten Lebensjahr",
      "Ab dem dritten Lebensjahr",
      "Ab dem sechsten Lebensjahr",
      "Ab dem neunten Lebensjahr"
    ],
    correctIndex: 1,
    explanation: "Schon ab dem dritten Jahr treten Zahnstein, Zahnfleischentzündungen oder lockere Zähne häufig auf. Unbehandelt bedeutet das Schmerzen, Futterverweigerung und Infektionen.",
    wikiPath: "/hunde/gesundheit/",
    sourceRef: "https://wahre-haustierliebe.de/hunde/gesundheit/"
  },
  {
    id: "hunde-gesundheit-102",
    mode: "klassisch",
    interaktion: "vierKarten",
    category: "hunde",
    difficulty: "knifflig",
    text: "Welche Unterlagen solltest du beim Kauf eines Rassehundes prüfen, um auf HD und ED zu achten?",
    options: [
      "Die Impfnachweise aller Wurfgeschwister",
      "Die allgemeine Gesundheitsbescheinigung",
      "Den Stammbaum mit Eintrag zur Zuchtzulassung",
      "Die HD- und ED-Befunde der Elterntiere"
    ],
    correctIndex: 3,
    explanation: "Hüft- und Ellbogendysplasie sind bei vielen großen Rassen verbreitet und teilweise erblich bedingt. Deshalb solltest du auf HD- und ED-Befunde der Elterntiere achten.",
    wikiPath: "/hunde/gesundheit/",
    sourceRef: "https://wahre-haustierliebe.de/hunde/gesundheit/"
  },
  {
    id: "hunde-entscheidung-103",
    mode: "klassisch",
    interaktion: "vierKarten",
    category: "hunde",
    difficulty: "leicht",
    text: "Für welche Zeitspanne solltest du bereit sein, die Verantwortung für einen Hund zu übernehmen?",
    options: [
      "3–5 Jahre",
      "10–15 Jahre",
      "6–8 Jahre",
      "20–25 Jahre"
    ],
    correctIndex: 1,
    explanation: "Du solltest bereit sein, 10–15 Jahre Verantwortung zu tragen. Zeit, Betreuung und Versorgung gehören zu dieser Entscheidung.",
    wikiPath: "/hunde/entscheidung/",
    sourceRef: "https://wahre-haustierliebe.de/hunde/entscheidung/"
  },
  {
    id: "hunde-hitzefalle-101",
    mode: "klassisch",
    interaktion: "vierKarten",
    category: "hunde",
    difficulty: "leicht",
    text: "Wie kühlen sich Hunde vor allem ab?",
    options: [
      "Durch Hecheln und Verdunstung im Maul",
      "Durch Schwitzen über die gesamte Haut",
      "Durch ein wärmeleitendes, dichtes Fell",
      "Durch Wärmeabgabe über große Ohren"
    ],
    correctIndex: 0,
    explanation: "Hunde schwitzen nicht wie Menschen über die Haut, sondern kühlen sich vor allem durch Hecheln. Dafür brauchen sie kühlere Luft und Wasser. Im heißen Auto kippt dieses System.",
    wikiPath: "/hitzefalle-auto/",
    sourceRef: "https://wahre-haustierliebe.de/hitzefalle-auto/"
  },
  {
    id: "hunde-hitzefalle-102",
    mode: "klassisch",
    interaktion: "vierKarten",
    category: "hunde",
    difficulty: "knifflig",
    text: "Welches Zeichen weist bei einem Hund in der Hitze auf einen Notfall hin?",
    options: [
      "Leichtes Hecheln mit kurzen Trinkpausen",
      "Ruhiges Liegen mit langsamem Blinzeln",
      "Gähnen und Schütteln nach dem Aufstehen",
      "Dunkelrote oder bläuliche Schleimhäute"
    ],
    correctIndex: 3,
    explanation: "Dunkelrote oder bläuliche Schleimhäute, taumelnder Gang, Erbrechen, Krämpfe oder Kollaps sind Notfallzeichen. Bring den Hund in eine kühlere Umgebung, kühle kontrolliert und nimm sofort tierärztlichen Kontakt auf. Trinkwasser gibt es nur, wenn er wach und schluckfähig ist; flöße es nicht ein.",
    wikiPath: "/hitzefalle-auto/",
    sourceRef: "https://wahre-haustierliebe.de/hitzefalle-auto/"
  },
  {
    id: "hunde-urlaub-102",
    mode: "klassisch",
    interaktion: "vierKarten",
    category: "hunde",
    difficulty: "mittel",
    text: "Was braucht dein Hund in der Regel für eine Reise innerhalb Europas?",
    options: [
      "EU-Heimtierausweis mit Chip und gültiger Tollwutimpfung",
      "Deutschen Impfpass mit nachgewiesener Staupe-Impfung",
      "Schriftliche Reisegenehmigung durch das Veterinäramt",
      "Gesundheitszeugnis, das höchstens ein Jahr alt ist"
    ],
    correctIndex: 0,
    explanation: "Für Hunde, Katzen und Frettchen gilt in der Regel der EU-Heimtierausweis mit Chip und Tollwutimpfung. Je nach Land kommen Entwurmung, Leinen- oder Maulkorbpflicht dazu. Prüfe das vor der Buchung.",
    wikiPath: "/tiere-und-urlaub/",
    sourceRef: "https://wahre-haustierliebe.de/tiere-und-urlaub/"
  },
  {
    id: "hunde-uebersicht-101",
    mode: "klassisch",
    interaktion: "vierKarten",
    category: "hunde",
    difficulty: "mittel",
    text: "Mit welcher Kostenspanne solltest du über zwölf Jahre Hundeleben rechnen, Notfälle nicht eingerechnet?",
    options: [
      "5.000–10.000 €",
      "14.000–37.000 €",
      "45.000–55.000 €",
      "60.000–70.000 €"
    ],
    correctIndex: 1,
    explanation: "Rechnet man die Kostentabelle mit etwa 100–240 Euro im Monat und der Anschaffung über zwölf Jahre hoch, kommen rund 14.000–37.000 Euro zusammen, im Mittel etwa 26.000 Euro. Notfälle und chronische Krankheiten kommen noch hinzu.",
    wikiPath: "/hunde/",
    sourceRef: "https://wahre-haustierliebe.de/hunde/"
  },
  {
    id: "hunde-uebersicht-102",
    mode: "klassisch",
    interaktion: "vierKarten",
    category: "hunde",
    difficulty: "leicht",
    text: "Wie viel kosten die laufenden Ausgaben für einen mittelgroßen Hund pro Monat etwa?",
    options: [
      "100–240 Euro",
      "20–50 Euro",
      "300–400 Euro",
      "500–600 Euro"
    ],
    correctIndex: 0,
    explanation: "Für einen mittelgroßen Hund fallen laufend etwa 100–240 Euro im Monat an, wenn eine Krankenversicherung dazugehört.",
    wikiPath: "/hunde/",
    sourceRef: "https://wahre-haustierliebe.de/hunde/"
  },
  {
    id: "hunde-qualzucht-101",
    mode: "klassisch",
    interaktion: "vierKarten",
    category: "hunde",
    difficulty: "mittel",
    text: "Warum können Möpse und Französische Bulldoggen durch ihre Kopfform Atem- und Hitzeprobleme haben?",
    options: [
      "Weil ihre großen Augen die Atmung bei Wärme beeinträchtigen",
      "Weil ihre Hautfalten die Atmung bei Bewegung behindern können",
      "Weil ihre kurzen Atemwege die Atmung beeinträchtigen können",
      "Weil ihr kurzer Körper die Atmung im Schlaf behindern kann"
    ],
    correctIndex: 2,
    explanation: "Die stark verkürzten Atemwege können chronische Atemnot verursachen. Bei Hitze kann die eingeschränkte Temperaturregulation lebensgefährlich werden.",
    wikiPath: "/qualzucht/",
    sourceRef: "https://wahre-haustierliebe.de/qualzucht/"
  },
  {
    id: "hunde-adoption-102",
    mode: "klassisch",
    interaktion: "vierKarten",
    category: "hunde",
    difficulty: "knifflig",
    text: "Ab wann darf ein Hundewelpe in der Regel von der Mutter getrennt werden?",
    options: [
      "In der Regel bereits im Alter von sechs Wochen",
      "In der Regel bereits im Alter von vier Wochen",
      "In der Regel erst im Alter von über acht Wochen",
      "In der Regel erst im Alter von über zehn Wochen"
    ],
    correctIndex: 2,
    explanation: "Eine frühere Trennung ist nur zulässig, wenn sie nach tierärztlichem Urteil zum Schutz vor Schmerzen, Leiden oder Schäden nötig ist.",
    wikiPath: "/adoption/",
    sourceRef: "https://wahre-haustierliebe.de/adoption/"
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
    id: "katzen-uebersicht-101",
    mode: "klassisch",
    interaktion: "vierKarten",
    category: "katzen",
    difficulty: "knifflig",
    text: "Wie viele Streunerkatzen leben in Deutschland schätzungsweise?",
    options: [
      "Etwa 200.000",
      "Etwa 700.000",
      "Etwa 2 Millionen",
      "Etwa 5 Millionen"
    ],
    correctIndex: 2,
    explanation: "Der Deutsche Tierschutzbund schätzt die Zahl auf rund 2 Millionen. Kastration verhindert die unkontrollierte Vermehrung, aus der solche Zahlen entstehen.",
    wikiPath: "/katzen/",
    sourceRef: "https://wahre-haustierliebe.de/katzen/"
  },
  {
    id: "katzen-sozial-101",
    mode: "klassisch",
    interaktion: "vierKarten",
    category: "katzen",
    difficulty: "mittel",
    text: "Zwei Katzen sollen zusammenziehen. Wovon hängt es vor allem ab, ob das gutgeht?",
    options: [
      "Von gleichem Geschlecht und ähnlicher Körpergröße",
      "Von gleicher Rasse und möglichst ähnlichem Aussehen",
      "Von gleichen Fütterungszeiten und ähnlichen Vorlieben",
      "Von Alter, Temperament und früher Sozialisierung"
    ],
    correctIndex: 3,
    explanation: "Nicht jede Katze versteht sich mit jeder anderen. Alter, Temperament und Sozialisierung spielen eine große Rolle, sonst wird es genauso stressig wie Einzelhaltung.",
    wikiPath: "/katzen/sozialverhalten/",
    sourceRef: "https://wahre-haustierliebe.de/katzen/sozialverhalten/"
  },
  {
    id: "katzen-wohnung-101",
    mode: "klassisch",
    interaktion: "vierKarten",
    category: "katzen",
    difficulty: "mittel",
    text: "In deiner Wohnung leben drei Katzen. Wie viele Toiletten gelten als praktische Ausgangsregel?",
    options: [
      "Drei Toiletten",
      "Vier Toiletten",
      "Zwei Toiletten",
      "Sechs Toiletten"
    ],
    correctIndex: 1,
    explanation: "Als Ausgangsregel gilt: Anzahl der Katzen plus eine Toilette. Für drei Katzen sind das vier Toiletten an getrennten, ruhigen Standorten, damit keine Katze die Zugänge blockieren kann.",
    wikiPath: "/katzen/wohnungshaltung/",
    sourceRef: "https://wahre-haustierliebe.de/katzen/wohnungshaltung/"
  },
  {
    id: "katzen-freigang-102",
    mode: "klassisch",
    interaktion: "vierKarten",
    category: "katzen",
    difficulty: "knifflig",
    text: "In einer Kamerastudie beobachtete man Freigängerkatzen. Wie viele von ihnen überquerten mindestens eine Straße?",
    options: [
      "15 Prozent",
      "45 Prozent",
      "30 Prozent",
      "80 Prozent"
    ],
    correctIndex: 1,
    explanation: "In der Kamerastudie überquerten 45 Prozent der beobachteten Katzen während des Untersuchungszeitraums mindestens eine Straße. Das ist keine allgemeine Sterberate für Freigängerkatzen, zeigt aber, dass auch ruhige Straßen überquert werden.",
    wikiPath: "/katzen/wohnungshaltung/",
    sourceRef: "https://wahre-haustierliebe.de/katzen/wohnungshaltung/"
  },
  {
    id: "katzen-kastration-101",
    mode: "klassisch",
    interaktion: "vierKarten",
    category: "katzen",
    difficulty: "mittel",
    text: "Der Kostenvoranschlag für die Kastration liegt über der OP-Position der GOT. Wie kommt das?",
    options: [
      "Bei weiblichen Katzen ist ein pauschaler Gebärmutterzuschlag fällig",
      "Der GOT-Betrag wird allein nach dem Körpergewicht berechnet",
      "Die Notdienstgebühr fällt bei jeder geplanten Operation an",
      "Untersuchung, Narkose, Überwachung und Nachsorge kommen hinzu"
    ],
    correctIndex: 3,
    explanation: "Der Gesamtpreis besteht nicht allein aus der Operation. Untersuchung, Narkose, Überwachung, Medikamente, Material und Nachsorge gehören dazu.",
    wikiPath: "/katzen/kastration/",
    sourceRef: "https://wahre-haustierliebe.de/katzen/kastration/"
  },
  {
    id: "katzen-streuner-101",
    mode: "klassisch",
    interaktion: "vierKarten",
    category: "katzen",
    difficulty: "leicht",
    text: "Woher stammen die meisten der rund 2 Millionen Streunerkatzen in Deutschland?",
    options: [
      "Von Wildkatzen, die in Siedlungen gezogen sind",
      "Von unkastrierten Freigängerkatzen und ihren Nachkommen",
      "Von Tierheimkatzen, die aus der Haltung entlaufen sind",
      "Von Auslandskatzen, die nach Deutschland gebracht wurden"
    ],
    correctIndex: 1,
    explanation: "Die meisten sind Nachkommen unkastrierter Freigänger. Streunerkatzen sind deshalb kein Naturproblem, sondern die Folge fehlender Kastration.",
    wikiPath: "/katzen/kastration/",
    sourceRef: "https://wahre-haustierliebe.de/katzen/kastration/"
  },
  {
    id: "katzen-schnurren-101",
    mode: "klassisch",
    interaktion: "vierKarten",
    category: "katzen",
    difficulty: "knifflig",
    text: "Wo entsteht das Schnurren im Körper einer Katze?",
    options: [
      "Im Brustkorb, wo Rippen und Muskeln vibrieren",
      "Im Zwerchfell, das rhythmisch zuckt und Luft presst",
      "Im Kehlkopf, wo Luft an den Stimmlippen schwingt",
      "Im Kiefer, wo die Muskeln fein zittern"
    ],
    correctIndex: 2,
    explanation: "Beim Atmen strömt Luft durch die Stimmritze, und das Gewebe schwingt langsam und regelmäßig. Wie eine einzelne Katze das genau steuert, ist noch nicht ganz geklärt.",
    wikiPath: "/katzen/stilles-leiden/",
    sourceRef: "https://wahre-haustierliebe.de/katzen/stilles-leiden/"
  },
  {
    id: "katzen-kosten-101",
    mode: "klassisch",
    interaktion: "vierKarten",
    category: "katzen",
    difficulty: "knifflig",
    text: "Was kostet eine Katze über 16 Jahre ungefähr?",
    options: [
      "3.000–5.000 €",
      "5.000–8.000 €",
      "10.000–21.500 €",
      "30.000–40.000 €"
    ],
    correctIndex: 2,
    explanation: "Rechnet man die Kostentabelle über 16 Jahre hoch, kommen mit Anschaffung rund 10.000–21.500 € zusammen, im Mittel etwa 15.700 €. Notfälle und unerwartete Behandlungen kommen noch hinzu.",
    wikiPath: "/katzen/kosten/",
    sourceRef: "https://wahre-haustierliebe.de/katzen/kosten/"
  },
  {
    id: "katzen-kosten-102",
    mode: "klassisch",
    interaktion: "vierKarten",
    category: "katzen",
    difficulty: "knifflig",
    text: "Wie viel kostet Futter in guter Qualität für eine Katze im Jahr?",
    options: [
      "100–250 €",
      "1.500–2.000 €",
      "2.500–3.000 €",
      "350–700 €"
    ],
    correctIndex: 3,
    explanation: "Für Futter in guter Qualität sind 350–700 € im Jahr realistisch. Streu kommt mit 120–250 € und die tierärztliche Routineversorgung mit 80–200 € jährlich hinzu.",
    wikiPath: "/katzen/kosten/",
    sourceRef: "https://wahre-haustierliebe.de/katzen/kosten/"
  },
  {
    id: "katzen-streuner-102",
    mode: "klassisch",
    interaktion: "vierKarten",
    category: "katzen",
    difficulty: "leicht",
    text: "Wo leben Streunerkatzen in Deutschland typischerweise?",
    options: [
      "In Gartenanlagen, auf Bauernhöfen und an Futterstellen",
      "Vor allem in Wäldern, weit entfernt von Siedlungen",
      "In Innenstädten und dort besonders in Fußgängerzonen",
      "Auf Friedhöfen und in leerstehenden Gebäuden"
    ],
    correctIndex: 0,
    explanation: "Streunerkatzen leben mitten unter uns. Viele sind Nachkommen von Hauskatzen, deren Halter die Kastration nicht für nötig hielten.",
    wikiPath: "/katzen/streunerkatzen/",
    sourceRef: "https://wahre-haustierliebe.de/katzen/streunerkatzen/"
  },
  {
    id: "katzen-kitten-101",
    mode: "klassisch",
    interaktion: "vierKarten",
    category: "katzen",
    difficulty: "knifflig",
    text: "Ab welchem Alter fällt einem Kitten der Umzug ins neue Zuhause am leichtesten?",
    options: [
      "10 Wochen",
      "8 Wochen",
      "14 Wochen",
      "12 Wochen"
    ],
    correctIndex: 2,
    explanation: "Acht Wochen sind nur eine Untergrenze, zehn bis zwölf ein tierwohlgerechtes Mindestalter. Mit 14 Wochen sind Kitten selbstständiger und robuster, der Übergang fällt leichter.",
    wikiPath: "/katzen/entscheidung/",
    sourceRef: "https://wahre-haustierliebe.de/katzen/entscheidung/"
  },
  {
    id: "katzen-kitten-102",
    mode: "klassisch",
    interaktion: "vierKarten",
    category: "katzen",
    difficulty: "knifflig",
    text: "Welche Tierarzt-Rücklage solltest du haben, bevor ein Kitten einzieht?",
    options: [
      "Mindestens 500–1.000 €",
      "Mindestens 100–200 €",
      "Mindestens 250–400 €",
      "Mindestens 2.000–3.000 €"
    ],
    correctIndex: 0,
    explanation: "Kitten sind in den ersten Monaten anfällig für Durchfall, Erkältungen, Verletzungen und Parasiten. Größere Notfälle können schnell einen niedrigen vierstelligen Betrag kosten.",
    wikiPath: "/katzen/entscheidung/",
    sourceRef: "https://wahre-haustierliebe.de/katzen/entscheidung/"
  },
  {
    id: "katzen-tierarzt-101",
    mode: "klassisch",
    interaktion: "vierKarten",
    category: "katzen",
    difficulty: "knifflig",
    text: "Gegen welche Krankheiten wird ein Kätzchen um die achte Lebenswoche zuerst geimpft?",
    options: [
      "Tollwut und FeLV (Leukose)",
      "Katzenschnupfen und Tollwut",
      "Katzenschnupfen und Katzenseuche",
      "Katzenseuche und FeLV (Leukose)"
    ],
    correctIndex: 2,
    explanation: "Die erste Impfung ist eine Kombi gegen Katzenschnupfen und Katzenseuche. Tollwut und FeLV kommen erst ab der zweiten Impfung um die zwölfte Woche infrage.",
    wikiPath: "/katzen/kaetzchen-tierarzt/",
    sourceRef: "https://wahre-haustierliebe.de/katzen/kaetzchen-tierarzt/"
  },
  {
    id: "katzen-tierarzt-102",
    mode: "klassisch",
    interaktion: "vierKarten",
    category: "katzen",
    difficulty: "knifflig",
    text: "In welchem Alter wird ein Kätzchen grob gerechnet kastriert?",
    options: [
      "Lebensmonat 1–2",
      "Lebensmonat 4–8",
      "Lebensmonat 10–12",
      "Lebensmonat 13–15"
    ],
    correctIndex: 1,
    explanation: "Der vierte bis achte Lebensmonat ist eine grobe Orientierung. Den passenden Termin legt deine Tierarztpraxis fest; eine frühe Kastration verhindert Nachwuchs und verringert bestimmte hormonabhängige Risiken.",
    wikiPath: "/katzen/kaetzchen-tierarzt/",
    sourceRef: "https://wahre-haustierliebe.de/katzen/kaetzchen-tierarzt/"
  },
  {
    id: "katzen-wildkatze-101",
    mode: "klassisch",
    interaktion: "vierKarten",
    category: "katzen",
    difficulty: "knifflig",
    text: "Welches Merkmal spricht bei einem getigerten Jungtier im Wald eher für eine Wildkatze?",
    options: [
      "Ein spitzer Schwanz mit Ringen bis in die Spitze",
      "Ein Aalstrich, der über den Schwanz weiterläuft",
      "Ein glänzendes, sehr kontrastreiches Tigerfell",
      "Ein buschiger Schwanz mit stumpfem, schwarzem Ende"
    ],
    correctIndex: 3,
    explanation: "Bei der Wildkatze ist der Schwanz buschig, stumpf und dunkel geringelt, und der Aalstrich endet meist an der Schwanzwurzel. Kein Merkmal beweist etwas allein.",
    wikiPath: "/katzen/wildkatzenbaby-gefunden/",
    sourceRef: "https://wahre-haustierliebe.de/katzen/wildkatzenbaby-gefunden/"
  },
  {
    id: "katzen-wildkatze-102",
    mode: "klassisch",
    interaktion: "vierKarten",
    category: "katzen",
    difficulty: "knifflig",
    text: "Du hast ein Wildkatzenjunges entdeckt, ohne akute Gefahr. Wann schaust du aus sicherem Abstand noch einmal nach?",
    options: [
      "Nach 1–2 Stunden",
      "Nach 3–4 Stunden",
      "Nach 6–12 Stunden",
      "Nach 2–3 Tagen"
    ],
    correctIndex: 2,
    explanation: "Die Mutter lässt ihre Jungen beim Jagen zeitweise allein. Wartest du in der Nähe, bleibt sie womöglich deinetwegen fern.",
    wikiPath: "/katzen/wildkatzenbaby-gefunden/",
    sourceRef: "https://wahre-haustierliebe.de/katzen/wildkatzenbaby-gefunden/"
  },
  {
    id: "katzen-taurin-101",
    mode: "klassisch",
    interaktion: "vierKarten",
    category: "katzen",
    difficulty: "leicht",
    text: "Warum muss Taurin zuverlässig im Katzenfutter enthalten sein?",
    options: [
      "Es ersetzt Vitamine, die beim Erhitzen verloren gehen",
      "Es macht das Futter für wählerische Katzen schmackhafter",
      "Es verlängert die Haltbarkeit von Nassfutter im Napf",
      "Katzen können es nicht ausreichend selbst bilden"
    ],
    correctIndex: 3,
    explanation: "Katzen bilden Taurin nicht in ausreichender Menge selbst, es muss über die Nahrung kommen. In der Natur steckt es vor allem in Beutetieren, Muskelfleisch und Herzgewebe.",
    wikiPath: "/ernaehrung-taurin/",
    sourceRef: "https://wahre-haustierliebe.de/ernaehrung-taurin/"
  },
  {
    id: "katzen-taurin-102",
    mode: "klassisch",
    interaktion: "vierKarten",
    category: "katzen",
    difficulty: "knifflig",
    text: "Für welche Körperfunktionen ist Taurin bei Katzen besonders wichtig?",
    options: [
      "Herzfunktion und Netzhaut der Augen",
      "Zahnschmelz und Krallenwachstum",
      "Nierenfunktion und Blasengesundheit",
      "Fellglanz und Darmflora"
    ],
    correctIndex: 0,
    explanation: "Taurin spielt unter anderem für Herz, Netzhaut, Gallensäuren, Fortpflanzung und Entwicklung eine Rolle. Fehlt es, können Herz, Augen und Stoffwechsel leiden.",
    wikiPath: "/ernaehrung-taurin/",
    sourceRef: "https://wahre-haustierliebe.de/ernaehrung-taurin/"
  },
  {
    id: "katzen-kastration-102",
    mode: "klassisch",
    interaktion: "vierKarten",
    category: "katzen",
    difficulty: "knifflig",
    text: "Was bedeuten die 5,7 Prozent bei der Gebärmuttervereiterung der Katze in der großen schwedischen Studie?",
    options: [
      "Die Sterblichkeit unter den erkrankten Katzen der Studie",
      "Der Anteil aller unkastrierten Katzen, die erkranken",
      "Der Anteil aller Katzen, die eine Kastration nicht überleben",
      "Der Anteil der Katzen, die zusätzlich Gesäugetumoren bekommen"
    ],
    correctIndex: 0,
    explanation: "Das ist die Sterblichkeit unter den erkrankten Tieren und nicht der Anteil aller unkastrierten Katzen. Die Gebärmuttervereiterung bleibt ein tierärztlicher Notfall.",
    wikiPath: "/kastration/",
    sourceRef: "https://wahre-haustierliebe.de/kastration/"
  },
  {
    id: "katzen-kastration-103",
    mode: "klassisch",
    interaktion: "vierKarten",
    category: "katzen",
    difficulty: "knifflig",
    text: "Um wie viel war das Risiko für Gesäugekrebs in einer großen Studie gesenkt, wenn Katzen vor dem sechsten Lebensmonat kastriert wurden?",
    options: [
      "Um 41 Prozent",
      "Um 66 Prozent",
      "Um 91 Prozent",
      "Um 99 Prozent"
    ],
    correctIndex: 2,
    explanation: "Bei einer Kastration vor zwölf Monaten waren es noch 86 Prozent. Das ist eine statistische Verbindung aus einer Beobachtungsstudie und keine Garantie für das einzelne Tier.",
    wikiPath: "/kastration/",
    sourceRef: "https://wahre-haustierliebe.de/kastration/"
  },
  {
    id: "katzen-qualzucht-102",
    mode: "klassisch",
    interaktion: "vierKarten",
    category: "katzen",
    difficulty: "knifflig",
    text: "Welchen Bereich betrifft der Gendefekt hinter den Faltohren der Scottish Fold?",
    options: [
      "Den Knorpel ausschließlich in den gefalteten Ohrmuscheln",
      "Den Knorpel im ganzen Körper, nicht nur in den Ohren",
      "Den Gehörgang ausschließlich auf der Innenseite der Ohren",
      "Die Haarwurzeln ausschließlich am Rand der Ohrmuscheln"
    ],
    correctIndex: 1,
    explanation: "Der Gendefekt betrifft den gesamten Knorpel im Körper. Die fortschreitende Knorpelerkrankung kann chronische Gelenkschmerzen und eingeschränkte Beweglichkeit verursachen.",
    wikiPath: "/qualzucht/",
    sourceRef: "https://wahre-haustierliebe.de/qualzucht/"
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
    id: "kleintiere-beschaeftigung-101",
    mode: "klassisch",
    interaktion: "vierKarten",
    category: "kleintiere",
    difficulty: "leicht",
    text: "Du möchtest deinen Meerschweinchen Abwechslung bieten. Was passt?",
    options: [
      "Feste Spielrunden mit Hochheben und Festhalten auf dem Schoß",
      "Ein übersichtliches Gehege ohne Tunnel, Ebenen oder Zweige",
      "Tunnel, erhöhte Ebenen, Zweige und verteiltes Frischfutter",
      "Einen Standort mit viel Trubel, damit sie mehr zu sehen haben"
    ],
    correctIndex: 2,
    explanation: "Tunnel, erhöhte Ebenen, Verstecke, Zweige und verteiltes Frischfutter bereichern den Alltag. Die Tiere können selbst erkunden, statt hochgehoben oder festgehalten zu werden.",
    wikiPath: "/kleintiere/",
    sourceRef: "https://wahre-haustierliebe.de/kleintiere/"
  },
  {
    id: "kleintiere-kaninchen-abgabe-101",
    mode: "klassisch",
    interaktion: "vierKarten",
    category: "kleintiere",
    difficulty: "knifflig",
    text: "Du möchtest ein junges Kaninchenpaar aufnehmen. Ab welchem Alter empfiehlt der Deutsche Tierschutzbund den Einzug mindestens?",
    options: [
      "Mit vier Wochen",
      "Mit sechs Wochen",
      "Mit acht Wochen",
      "Mit zehn Wochen"
    ],
    correctIndex: 3,
    explanation: "Zehn Wochen sind die Mindestempfehlung, zwölf Wochen die vorsichtigere Orientierung. Selbstständiges Fressen allein heißt noch nicht, dass ein Jungtier bereit für einen Umzug ist.",
    wikiPath: "/kleintiere/kaninchen/",
    sourceRef: "https://wahre-haustierliebe.de/kleintiere/kaninchen/"
  },
  {
    id: "kleintiere-kaninchen-gruppe-101",
    mode: "klassisch",
    interaktion: "vierKarten",
    category: "kleintiere",
    difficulty: "mittel",
    text: "Welche Zweiergruppe passt für Kaninchen am besten?",
    options: [
      "Ein kastrierter Rammler und eine Häsin, die sich vertragen",
      "Ein unkastrierter Rammler und eine Häsin, die sich vertragen",
      "Ein Kaninchen und ein Meerschweinchen, die sich vertragen",
      "Ein Kaninchen, das jeden Tag Zeit mit dir verbringen darf"
    ],
    correctIndex: 0,
    explanation: "Kaninchen sind Gruppentiere und brauchen mindestens einen passenden Kaninchenpartner. Für eine gemischtgeschlechtliche Gruppe ohne Nachwuchs sollte der Rammler kastriert sein.",
    wikiPath: "/kleintiere/kaninchen/",
    sourceRef: "https://wahre-haustierliebe.de/kleintiere/kaninchen/"
  },
  {
    id: "kleintiere-meeri-abgabe-101",
    mode: "klassisch",
    interaktion: "vierKarten",
    category: "kleintiere",
    difficulty: "knifflig",
    text: "Wie alt sollen Meerschweinchen-Jungtiere laut Deutschem Tierschutzbund bei der Übernahme mindestens sein?",
    options: [
      "Vier Wochen",
      "Sechs Wochen",
      "Acht Wochen",
      "Zehn Wochen"
    ],
    correctIndex: 2,
    explanation: "Acht Wochen sind eine klare Orientierung gegen die besonders frühe Abgabe. In den ersten Wochen lernen Jungtiere von Mutter, Geschwistern und erwachsenen Tieren, wie eine Gruppe funktioniert.",
    wikiPath: "/kleintiere/meerschweinchen/",
    sourceRef: "https://wahre-haustierliebe.de/kleintiere/meerschweinchen/"
  },
  {
    id: "kleintiere-meeri-reife-101",
    mode: "klassisch",
    interaktion: "vierKarten",
    category: "kleintiere",
    difficulty: "knifflig",
    text: "Ab welchem Alter können Meerschweinchen-Weibchen schon trächtig werden?",
    options: [
      "Ab etwa drei Wochen",
      "Ab etwa acht Wochen",
      "Ab etwa vier Monaten",
      "Ab etwa einem Jahr"
    ],
    correctIndex: 0,
    explanation: "Meerschweinchen werden sehr früh geschlechtsreif, lange bevor sie ausgewachsen sind. Deshalb muss das Geschlecht fachkundig bestimmt werden, sonst folgt schnell ungewollter Nachwuchs.",
    wikiPath: "/kleintiere/meerschweinchen/",
    sourceRef: "https://wahre-haustierliebe.de/kleintiere/meerschweinchen/"
  },
  {
    id: "kleintiere-hamster-einstreu-101",
    mode: "klassisch",
    interaktion: "vierKarten",
    category: "kleintiere",
    difficulty: "knifflig",
    text: "Wie tief sollte grabfähige Einstreu im Goldhamstergehege mindestens sein?",
    options: [
      "15 Zentimeter",
      "30 Zentimeter",
      "45 Zentimeter",
      "60 Zentimeter"
    ],
    correctIndex: 1,
    explanation: "Nur mit mindestens 30 Zentimetern kann der Hamster Tunnel, Schlafkammern und Vorratsplätze anlegen. Das Graben gehört zu seinem natürlichen Verhalten.",
    wikiPath: "/kleintiere/hamster/",
    sourceRef: "https://wahre-haustierliebe.de/kleintiere/hamster/"
  },
  {
    id: "kleintiere-hamster-laufrad-101",
    mode: "klassisch",
    interaktion: "vierKarten",
    category: "kleintiere",
    difficulty: "knifflig",
    text: "Welchen Durchmesser sollte ein Laufrad für Goldhamster haben?",
    options: [
      "12–17 Zentimeter",
      "18–23 Zentimeter",
      "25–30 Zentimeter",
      "35–40 Zentimeter"
    ],
    correctIndex: 2,
    explanation: "Empfohlen werden 25–30 Zentimeter Durchmesser. Dazu gehören eine geschlossene Lauffläche, eine geschlossene Rückseite und ein stabiler Stand.",
    wikiPath: "/kleintiere/hamster/",
    sourceRef: "https://wahre-haustierliebe.de/kleintiere/hamster/"
  },
  {
    id: "kleintiere-ratten-tumor-101",
    mode: "klassisch",
    interaktion: "vierKarten",
    category: "kleintiere",
    difficulty: "knifflig",
    text: "Tumore sind bei Ratten sehr verbreitet. Was kann eine Operation pro Tumor kosten?",
    options: [
      "20–50 Euro",
      "100–300 Euro",
      "500–800 Euro",
      "1.000–1.500 Euro"
    ],
    correctIndex: 1,
    explanation: "Eine Operation kann pro Tumor 100–300 Euro kosten. Tumore sind bei Ratten sehr verbreitet, deshalb gehört Geld für tierärztliche Behandlung zur Planung.",
    wikiPath: "/kleintiere/ratten/",
    sourceRef: "https://wahre-haustierliebe.de/kleintiere/ratten/"
  },
  {
    id: "kleintiere-chinchilla-alter-101",
    mode: "klassisch",
    interaktion: "vierKarten",
    category: "kleintiere",
    difficulty: "knifflig",
    text: "Wie alt können Chinchillas werden?",
    options: [
      "25–30 Jahre",
      "15–20 Jahre",
      "8–10 Jahre",
      "5–8 Jahre"
    ],
    correctIndex: 1,
    explanation: "Chinchillas können 15–20 Jahre alt werden. Damit übernehmen ihre Menschen eine ähnlich lange Verpflichtung wie bei einem Hund.",
    wikiPath: "/kleintiere/degus-chinchillas/",
    sourceRef: "https://wahre-haustierliebe.de/kleintiere/degus-chinchillas/"
  },
  {
    id: "kleintiere-chinchilla-bad-101",
    mode: "klassisch",
    interaktion: "vierKarten",
    category: "kleintiere",
    difficulty: "mittel",
    text: "Womit pflegen Chinchillas ihr Fell?",
    options: [
      "Mit einem Wasserbad in lauwarmem Wasser und anschließendem Trocknen",
      "Mit einem Staubbad in gewöhnlichem Vogelsand aus dem Zoohandel",
      "Mit einem Staubbad in gewöhnlichem Spielsand aus der Gartensandkiste",
      "Mit einem Staubbad in speziellem Chinchilla-Sand, ohne Wasserzusatz"
    ],
    correctIndex: 3,
    explanation: "Chinchillas baden im Staub, nicht im Wasser. Dafür brauchen sie speziellen Chinchilla-Sand.",
    wikiPath: "/kleintiere/degus-chinchillas/",
    sourceRef: "https://wahre-haustierliebe.de/kleintiere/degus-chinchillas/"
  },
  {
    id: "kleintiere-realhaltung-101",
    mode: "klassisch",
    interaktion: "vierKarten",
    category: "kleintiere",
    difficulty: "leicht",
    text: "Warum sagt der niedrige Kaufpreis eines Hamsters wenig über die Haltungskosten aus?",
    options: [
      "Weil der Kaufpreis die Versorgung bis zum Lebensende mit abdeckt",
      "Weil Futter, Einstreu, Tierarzt und Notfälle über Jahre hinzukommen",
      "Weil laufende Kosten erst nach dem ersten Krankheitsfall entstehen",
      "Weil ein günstiger Hamster meist auch weniger Versorgung braucht"
    ],
    correctIndex: 1,
    explanation: "Ein niedriger Kaufpreis ist ein falscher Anker. Untersuchungen, Medikamente oder Operationen müssen bezahlt werden können, auch wenn sie unerwartet nötig sind.",
    wikiPath: "/realhaltung/",
    sourceRef: "https://wahre-haustierliebe.de/realhaltung/"
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
  {
    id: "voegel-abgabe-101",
    mode: "klassisch",
    interaktion: "vierKarten",
    category: "voegel",
    difficulty: "knifflig",
    text: "Welche ethische Altersuntergrenze solltest du bei der geplanten Abgabe junger Wellensittiche einhalten?",
    options: [
      "Sechs Wochen",
      "Acht Wochen",
      "Zehn Wochen",
      "Zwölf Wochen"
    ],
    correctIndex: 3,
    explanation: "Zwölf Wochen sind weder Gesetz noch automatische Freigabe. Ist der Vogel noch nicht sicher, selbstständig oder sozial gefestigt, bleibt er länger bei seinem Schwarm.",
    wikiPath: "/voegel/",
    sourceRef: "https://wahre-haustierliebe.de/voegel/"
  },
  {
    id: "voegel-futterfest-101",
    mode: "klassisch",
    interaktion: "vierKarten",
    category: "voegel",
    difficulty: "leicht",
    text: "Ein Jungvogel wird als „futterfest“ angeboten. Was sagt das über ihn aus?",
    options: [
      "Dass er sicher fliegt und in einer Gruppe zurechtkommt",
      "Nur, dass er selbstständig frisst und trinkt, mehr nicht",
      "Dass er stabil zunimmt und keine Krankheitszeichen zeigt",
      "Dass er bereit für den Umzug in ein neues Zuhause ist"
    ],
    correctIndex: 1,
    explanation: "Futterfest sagt nur etwas über die Nahrungsaufnahme. Ob ein Jungvogel körperlich stabil, sicher flugfähig und sozial gefestigt ist, muss zusätzlich stimmen.",
    wikiPath: "/voegel/",
    sourceRef: "https://wahre-haustierliebe.de/voegel/"
  },
  {
    id: "voegel-schwarm-gruppe-101",
    mode: "klassisch",
    interaktion: "vierKarten",
    category: "voegel",
    difficulty: "mittel",
    text: "Warum sind vier oder mehr Wellensittiche oft besser als nur ein Paar?",
    options: [
      "Sie haben mehr Auswahl unter passenden sozialen Partnern",
      "Sie brauchen in der Gruppe deutlich weniger Flugraum pro Tier",
      "Sie werden dadurch zahmer und binden sich stärker an Menschen",
      "Sie bleiben ruhiger, weil sie untereinander weniger rufen"
    ],
    correctIndex: 0,
    explanation: "Mindestens zwei, besser vier oder mehr passende Wellensittiche ermöglichen soziale Kontakte. Eine Gruppe bietet mehr soziale Wahl; bestehende Paare sollen zusammenbleiben.",
    wikiPath: "/voegel/schwarmhaltung/",
    sourceRef: "https://wahre-haustierliebe.de/voegel/schwarmhaltung/"
  },
  {
    id: "voegel-uv-zapfen-101",
    mode: "klassisch",
    interaktion: "vierKarten",
    category: "voegel",
    difficulty: "knifflig",
    text: "Wie viele Zapfentypen haben Wellensittiche in der Netzhaut?",
    options: [
      "Zwei",
      "Drei",
      "Vier",
      "Fünf"
    ],
    correctIndex: 2,
    explanation: "Menschen haben drei Zapfentypen, Wellensittiche vier. Einer davon nimmt UVA wahr, deshalb sehen sie Gefieder in anderen Farben als wir.",
    wikiPath: "/voegel/uv-licht/",
    sourceRef: "https://wahre-haustierliebe.de/voegel/uv-licht/"
  },
  {
    id: "voegel-kueche-lueften-101",
    mode: "klassisch",
    interaktion: "vierKarten",
    category: "voegel",
    difficulty: "mittel",
    text: "Du willst das Vogelzimmer lüften. Was gilt?",
    options: [
      "Ein dauerhaft gekipptes Fenster hinter dem Käfig ist ideal",
      "Ein leiser Ventilator im Raum sorgt für sanften Luftaustausch",
      "Lüften ist nötig, aber ohne Zugluft auf Sitz- und Schlafplätze",
      "Lüften stört die Vögel zu sehr, deshalb bleibt es lieber aus"
    ],
    correctIndex: 2,
    explanation: "Lüften ist nötig, darf aber keine Zugluft auf Schlaf- und Sitzplätze lenken. Ventilatoren müssen im Vogelbereich ausgeschaltet sein.",
    wikiPath: "/voegel/kuechenluft-teflon/",
    sourceRef: "https://wahre-haustierliebe.de/voegel/kuechenluft-teflon/"
  },
  {
    id: "voegel-freiflug-mass-101",
    mode: "klassisch",
    interaktion: "vierKarten",
    category: "voegel",
    difficulty: "knifflig",
    text: "Welche Mindestmaße empfiehlt der Tierschutzbund für 2–6 Wellensittiche bei täglich mehrstündigem Freiflug?",
    options: [
      "1 Meter lang, 0,5 Meter breit und 1 Meter hoch",
      "1,5 Meter lang, 0,8 Meter breit und 1,5 Meter hoch",
      "3 Meter lang, 2 Meter breit und 2,5 Meter hoch",
      "2 Meter lang, 1 Meter breit und 2 Meter hoch"
    ],
    correctIndex: 3,
    explanation: "Die Voliere braucht mindestens zwei Meter Länge, einen Meter Breite und zwei Meter Höhe. Diese Mindestwerte sind kein Ideal; täglich mehrstündiger Freiflug gehört zur genannten Empfehlung.",
    wikiPath: "/voegel/freiflug/",
    sourceRef: "https://wahre-haustierliebe.de/voegel/freiflug/"
  },
  {
    id: "voegel-freiflug-flaeche-101",
    mode: "klassisch",
    interaktion: "vierKarten",
    category: "voegel",
    difficulty: "knifflig",
    text: "Wie viel Grundfläche wird für Wellensittiche ohne Freiflug bei zwei Metern Höhe mindestens empfohlen?",
    options: [
      "1 Quadratmeter",
      "2 Quadratmeter",
      "4 Quadratmeter",
      "6 Quadratmeter"
    ],
    correctIndex: 2,
    explanation: "Ohne Freiflug werden mindestens vier Quadratmeter Grundfläche bei zwei Metern Höhe empfohlen. Das sind Mindestwerte, kein Ideal.",
    wikiPath: "/voegel/freiflug/",
    sourceRef: "https://wahre-haustierliebe.de/voegel/freiflug/"
  },
  {
    id: "voegel-partner-spiegel-101",
    mode: "klassisch",
    interaktion: "vierKarten",
    category: "voegel",
    difficulty: "mittel",
    text: "Was passiert, wenn ein Wellensittich einen Spiegel im Käfig hat?",
    options: [
      "Er erkennt sich selbst und putzt sich danach ausgiebig",
      "Er sucht Kontakt zu einem anderen Vogel, der nie antwortet",
      "Er ignoriert das Bild nach kurzer Zeit und wird ruhiger",
      "Er lernt vom Bild neue Laute und übt sie danach täglich"
    ],
    correctIndex: 1,
    explanation: "Der Vogel erkennt sein Spiegelbild nicht als sich selbst. Das führt zu Frustration und Aggressivität, denn eine Antwort bleibt aus.",
    wikiPath: "/voegel/partnerersatz/",
    sourceRef: "https://wahre-haustierliebe.de/voegel/partnerersatz/"
  },
  {
    id: "voegel-ruhe-stunden-101",
    mode: "klassisch",
    interaktion: "vierKarten",
    category: "voegel",
    difficulty: "knifflig",
    text: "Wie viele Stunden ungestörte Nachtruhe brauchen Wellensittiche mindestens?",
    options: [
      "6 Stunden",
      "8 Stunden",
      "10 Stunden",
      "12 Stunden"
    ],
    correctIndex: 2,
    explanation: "Wellensittiche sind tagaktiv und brauchen mindestens zehn Stunden Ruhe am Stück. Fernseher, Gespräche und wechselndes Licht können sie immer wieder aufwecken.",
    wikiPath: "/voegel/ruhe-schlaf/",
    sourceRef: "https://wahre-haustierliebe.de/voegel/ruhe-schlaf/"
  },
  {
    id: "voegel-ernaehrung-alltag-101",
    mode: "klassisch",
    interaktion: "vierKarten",
    category: "voegel",
    difficulty: "mittel",
    text: "Was gehört zur täglichen Grundversorgung von Wellensittichen?",
    options: [
      "Saatenmischung und zuckerreiche Knabberstangen als Hauptfutter",
      "Ein ständig volles Körnerschälchen, aber ohne Frischfutter",
      "Körner, dazu gelegentlich Reste vom Familientisch als Snack",
      "Frisches Wasser, Saaten, dazu frische Gräser, Kräuter, Gemüse"
    ],
    correctIndex: 3,
    explanation: "Zucker- und fettreiche Knabberstangen, menschliche Essensreste und unkontrollierte Leckerligaben gehören nicht in die Grundversorgung.",
    wikiPath: "/voegel/ernaehrung/",
    sourceRef: "https://wahre-haustierliebe.de/voegel/ernaehrung/"
  },
  {
    id: "voegel-alltag-alter-101",
    mode: "klassisch",
    interaktion: "vierKarten",
    category: "voegel",
    difficulty: "knifflig",
    text: "Wie alt können Wellensittiche werden?",
    options: [
      "3–5 Jahre",
      "5–8 Jahre",
      "10–15 Jahre",
      "20–25 Jahre"
    ],
    correctIndex: 2,
    explanation: "Wellensittiche können zehn bis fünfzehn Jahre alt werden, größere Papageien mehrere Jahrzehnte. Wohnungswechsel, Beruf, Kinder und das eigene Alter gehören deshalb in die Entscheidung.",
    wikiPath: "/voegel/alltag-kosten-betreuung/",
    sourceRef: "https://wahre-haustierliebe.de/voegel/alltag-kosten-betreuung/"
  },
  {
    id: "voegel-qual-stirn-101",
    mode: "klassisch",
    interaktion: "vierKarten",
    category: "voegel",
    difficulty: "leicht",
    text: "Welches Zuchtmerkmal nimmt manchen Schauwellensittichen die Sicht?",
    options: [
      "Ein kurz gezüchteter Schwanz, der das Gleichgewicht stört",
      "Ein extrem langes Stirngefieder über den Augen",
      "Ein besonders schwerer Körper, der den Kopf absenkt",
      "Ein zu langer Schnabel, der das Blickfeld verdeckt"
    ],
    correctIndex: 1,
    explanation: "Schauwellensittiche werden auf Größe und Kopfgefieder gezüchtet. Manche können kaum noch sehen und sind dadurch unsicher, stressanfällig und in ihrer Bewegung eingeschränkt.",
    wikiPath: "/voegel/qualzucht/",
    sourceRef: "https://wahre-haustierliebe.de/voegel/qualzucht/"
  },
  {
    id: "exoten-exoten-101",
    mode: "klassisch",
    interaktion: "vierKarten",
    category: "exoten",
    difficulty: "mittel",
    text: "Welche rechtlichen Fragen musst du vor dem Kauf eines Exoten klären?",
    options: [
      "Ob Händlerpreis und Körpergröße zur Art passen",
      "Ob Artenschutz, Meldepflicht und Herkunftsnachweis gelten",
      "Ob Farbe und Verhalten zum Angebot im Laden passen",
      "Ob Verkaufsname und Foto dem gewünschten Tier entsprechen"
    ],
    correctIndex: 1,
    explanation: "Bei vielen Arten gelten Artenschutz, Meldepflichten und Herkunftsnachweise. Prüfe sie, bevor das Tier einzieht, nicht erst danach.",
    wikiPath: "/exoten/",
    sourceRef: "https://wahre-haustierliebe.de/exoten/"
  },
  {
    id: "exoten-reptilien-101",
    mode: "klassisch",
    interaktion: "vierKarten",
    category: "exoten",
    difficulty: "mittel",
    text: "Wozu dient UV-B bei den meisten Reptilien?",
    options: [
      "Damit der Körper Vitamin D3 für die Kalziumaufnahme bildet",
      "Damit der Körper Vitamin C für die Kalziumaufnahme bildet",
      "Damit der Körper Kalzium unabhängig von Vitamin D3 aufnimmt",
      "Damit der Körper Vitamin D3 auch ohne UV-B aus Licht bildet"
    ],
    correctIndex: 0,
    explanation: "UV-B ist für die Bildung von Vitamin D3 nötig, das die Kalziumaufnahme ermöglicht. Fehlt Kalzium, können die Knochen erweichen.",
    wikiPath: "/exoten/reptilien/",
    sourceRef: "https://wahre-haustierliebe.de/exoten/reptilien/"
  },
  {
    id: "exoten-reptilien-102",
    mode: "klassisch",
    interaktion: "vierKarten",
    category: "exoten",
    difficulty: "knifflig",
    text: "Mit welchen monatlichen Stromkosten musst du bei einem Terrarium schnell rechnen?",
    options: [
      "Etwa 5–10 Euro",
      "Etwa 10–20 Euro",
      "Etwa 80–120 Euro",
      "Etwa 30–60 Euro"
    ],
    correctIndex: 3,
    explanation: "UV-Lampen, Wärmelampen und weitere Terrarientechnik können schnell 30–60 Euro Stromkosten im Monat verursachen. Futter und regelmäßiger Lampentausch kommen hinzu.",
    wikiPath: "/exoten/reptilien/",
    sourceRef: "https://wahre-haustierliebe.de/exoten/reptilien/"
  },
  {
    id: "exoten-reptilien-103",
    mode: "klassisch",
    interaktion: "vierKarten",
    category: "exoten",
    difficulty: "knifflig",
    text: "Wie breit sollte ein Terrarium als Faustregel mindestens sein?",
    options: [
      "2× die Körperlänge des Tieres",
      "3× die Körperlänge des Tieres",
      "5× die Körperlänge des Tieres",
      "4× die Körperlänge des Tieres"
    ],
    correctIndex: 2,
    explanation: "In der Tiefe und in der Höhe rechnet die Faustregel mit dem Dreifachen. Für kletternde Arten braucht es deutlich mehr.",
    wikiPath: "/exoten/reptilien/",
    sourceRef: "https://wahre-haustierliebe.de/exoten/reptilien/"
  },
  {
    id: "exoten-schildkroeten-101",
    mode: "klassisch",
    interaktion: "vierKarten",
    category: "exoten",
    difficulty: "knifflig",
    text: "Wie alt können europäische Landschildkröten werden?",
    options: [
      "20–30 Jahre, manche Arten werden noch älter",
      "50–80 Jahre, manche Arten werden noch älter",
      "10–15 Jahre, manche Arten werden noch älter",
      "35–45 Jahre, manche Arten werden noch älter"
    ],
    correctIndex: 1,
    explanation: "Wer eine Schildkröte aufnimmt, vererbt sie womöglich an die eigenen Kinder. Das ist eine Entscheidung, die über das eigene Leben hinausreicht.",
    wikiPath: "/exoten/schildkroeten/",
    sourceRef: "https://wahre-haustierliebe.de/exoten/schildkroeten/"
  },
  {
    id: "exoten-schildkroeten-102",
    mode: "klassisch",
    interaktion: "vierKarten",
    category: "exoten",
    difficulty: "knifflig",
    text: "Bei welchen Temperaturen halten viele Landschildkröten ihre Winterruhe?",
    options: [
      "Bei 4–8 °C über mehrere Monate",
      "Bei 0–2 °C über einige Wochen",
      "Bei 10–14 °C über mehrere Monate",
      "Bei 15–18 °C über einige Wochen"
    ],
    correctIndex: 0,
    explanation: "Viele Landschildkrötenarten brauchen eine jährliche Winterruhe bei kontrollierten 4–8 °C über mehrere Monate. Ohne sie drohen Stoffwechselstörungen sowie Leber- und Nierenschäden.",
    wikiPath: "/exoten/schildkroeten/",
    sourceRef: "https://wahre-haustierliebe.de/exoten/schildkroeten/"
  },
  {
    id: "exoten-fische-102",
    mode: "klassisch",
    interaktion: "vierKarten",
    category: "exoten",
    difficulty: "knifflig",
    text: "Welches Mindestvolumen brauchen Goldfische?",
    options: [
      "100 Liter",
      "200 Liter",
      "50 Liter",
      "30 Liter"
    ],
    correctIndex: 1,
    explanation: "Goldfische brauchen mindestens 200 Liter, besser noch einen Teich. Goldfische werden 20–30 cm groß und brauchen einen leistungsstarken Filter sowie regelmäßige Wasserpflege.",
    wikiPath: "/exoten/fische/",
    sourceRef: "https://wahre-haustierliebe.de/exoten/fische/"
  },
  {
    id: "exoten-fische-103",
    mode: "klassisch",
    interaktion: "vierKarten",
    category: "exoten",
    difficulty: "knifflig",
    text: "Was kostet ein vollständig eingerichtetes 200-Liter-Aquarium ungefähr?",
    options: [
      "Etwa 300–800 Euro",
      "Etwa 100–200 Euro",
      "Etwa 1.200–1.800 Euro",
      "Etwa 50–100 Euro"
    ],
    correctIndex: 0,
    explanation: "Darin stecken Becken, Filter, Heizung, Beleuchtung und Einrichtung. Dazu kommen laufend 20–50 Euro im Monat für Strom, Futter, Wasseraufbereitung und Ersatzteile.",
    wikiPath: "/exoten/fische/",
    sourceRef: "https://wahre-haustierliebe.de/exoten/fische/"
  },
  {
    id: "pferde-herde-101",
    mode: "klassisch",
    interaktion: "vierKarten",
    category: "pferde",
    difficulty: "leicht",
    text: "Ein Pferd steht allein auf der Koppel. Womit muss es rechnen?",
    options: [
      "Mit mehr Gelassenheit durch die ungestörte Ruhe",
      "Mit mehr Selbstständigkeit durch die Zeit allein",
      "Mit mehr Sicherheit durch den Kontakt zum Menschen",
      "Mit chronischem Stress, Koppen, Weben oder Apathie"
    ],
    correctIndex: 3,
    explanation: "Als Fluchttiere und Herdentiere fressen, ruhen und bewegen sich Pferde in der Natur gemeinsam. Allein sind sie isoliert, mit chronischem Stress und Apathie als Folge.",
    wikiPath: "/pferde/herde/",
    sourceRef: "https://wahre-haustierliebe.de/pferde/herde/"
  },
  {
    id: "pferde-platzbedarf-101",
    mode: "klassisch",
    interaktion: "vierKarten",
    category: "pferde",
    difficulty: "knifflig",
    text: "Wie viel befestigte Fläche braucht ein Pferd mindestens im Offenstall mit Auslauf und Weide?",
    options: [
      "50 m² pro Pferd plus Zugang zur Weide",
      "150 m² pro Pferd plus Zugang zur Weide",
      "300 m² pro Pferd plus Zugang zur Weide",
      "20 m² pro Pferd plus Zugang zur Weide"
    ],
    correctIndex: 1,
    explanation: "Ein Pferd braucht mindestens 150 m² befestigte Fläche plus Weidezugang. Dazu gehört tägliches Reiten oder Bewegen.",
    wikiPath: "/pferde/platzbedarf/",
    sourceRef: "https://wahre-haustierliebe.de/pferde/platzbedarf/"
  },
  {
    id: "pferde-platzbedarf-102",
    mode: "klassisch",
    interaktion: "vierKarten",
    category: "pferde",
    difficulty: "knifflig",
    text: "Wie weit laufen Wildpferde ungefähr pro Tag?",
    options: [
      "15–30 Kilometer",
      "3–5 Kilometer",
      "5–10 Kilometer",
      "40–60 Kilometer"
    ],
    correctIndex: 0,
    explanation: "Sie grasen dabei im Schritt. Diese Mischung aus Bewegung und Nahrungsaufnahme kann keine Koppel der Welt vollständig ersetzen.",
    wikiPath: "/pferde/platzbedarf/",
    sourceRef: "https://wahre-haustierliebe.de/pferde/platzbedarf/"
  },
  {
    id: "pferde-haltungsformen-101",
    mode: "klassisch",
    interaktion: "vierKarten",
    category: "pferde",
    difficulty: "leicht",
    text: "Welche Haltungsform ist für Pferde am artgerechtesten?",
    options: [
      "Einzelbox mit täglichem Reiten und Kontakt auf der Stallgasse",
      "Paddockbox mit Einzelhaltung und eigenem täglichen Auslauf",
      "Anbindestand mit täglichem Auslauf und regelmäßigem Reiten",
      "Offenstall oder Aktivstall mit Zugang zu Unterstand und Weide"
    ],
    correctIndex: 3,
    explanation: "Dort können sich Pferde frei bewegen, Sozialkontakte pflegen und selbst entscheiden, wann sie fressen, ruhen oder laufen.",
    wikiPath: "/pferde/haltungsformen/",
    sourceRef: "https://wahre-haustierliebe.de/pferde/haltungsformen/"
  },
  {
    id: "pferde-haltungsformen-102",
    mode: "klassisch",
    interaktion: "vierKarten",
    category: "pferde",
    difficulty: "mittel",
    text: "Welche zusätzliche Versorgung muss bei Boxenhaltung täglich gesichert sein?",
    options: [
      "Eine Reitstunde zusammen mit täglichem Kontakt zum Menschen",
      "Ein kurzer Hofgang zusammen mit mehrmals täglichem Füttern",
      "Mehrstündiger Auslauf zusammen mit Kontakt zu Artgenossen",
      "Eine große Box zusammen mit Sichtkontakt durch ein Fenster"
    ],
    correctIndex: 2,
    explanation: "Boxenhaltung ist nur mit täglich mehrstündigem Auslauf und Sozialkontakt vertretbar. Die Box allein reicht für das bewegungsfreudige Pferd nicht.",
    wikiPath: "/pferde/haltungsformen/",
    sourceRef: "https://wahre-haustierliebe.de/pferde/haltungsformen/"
  },
  {
    id: "pferde-kosten-101",
    mode: "klassisch",
    interaktion: "vierKarten",
    category: "pferde",
    difficulty: "knifflig",
    text: "Mit welcher laufenden Monatssumme musst du für ein Pferd ohne Unterricht, Turniere und Notfälle rechnen?",
    options: [
      "Etwa 100–200 Euro",
      "Etwa 340–920 Euro",
      "Etwa 150–300 Euro",
      "Etwa 1.000–1.500 Euro"
    ],
    correctIndex: 1,
    explanation: "Für Stallmiete, Futter, Hufschmied, Tierarzt, Versicherung und Ausrüstung fallen monatlich 340–920 Euro an. Reitunterricht, Turniergebühren und Notfall-Operationen sind nicht eingerechnet.",
    wikiPath: "/pferde/kosten/",
    sourceRef: "https://wahre-haustierliebe.de/pferde/kosten/"
  },
  {
    id: "pferde-kosten-102",
    mode: "klassisch",
    interaktion: "vierKarten",
    category: "pferde",
    difficulty: "knifflig",
    text: "Welcher dieser Posten hat die höchste Obergrenze der monatlichen Kosten?",
    options: [
      "Die Stallmiete für Offenstall oder Box",
      "Das Futter aus Heu, Kraftfutter und Mineralfutter",
      "Der Hufschmied alle sechs bis acht Wochen",
      "Die Ausrüstung mit Sattel, Trense und Decken"
    ],
    correctIndex: 0,
    explanation: "Die Stallmiete reicht bis 450 Euro im Monat. Die nächsthöhere Obergrenze liegt beim Futter mit 200 Euro.",
    wikiPath: "/pferde/kosten/",
    sourceRef: "https://wahre-haustierliebe.de/pferde/kosten/"
  },
  {
    id: "pferde-kosten-103",
    mode: "klassisch",
    interaktion: "vierKarten",
    category: "pferde",
    difficulty: "knifflig",
    text: "Wie viel kann eine Notfall-Operation bei Kolik kosten?",
    options: [
      "300–800 Euro",
      "800–1.500 Euro",
      "15.000–20.000 Euro",
      "3.000–10.000 Euro"
    ],
    correctIndex: 3,
    explanation: "Kolik-Operationen können 3.000–10.000 Euro kosten. Diese Notfallkosten sind nicht in der laufenden Monatssumme enthalten.",
    wikiPath: "/pferde/kosten/",
    sourceRef: "https://wahre-haustierliebe.de/pferde/kosten/"
  },
  {
    id: "pferde-reitbeteiligung-101",
    mode: "klassisch",
    interaktion: "vierKarten",
    category: "pferde",
    difficulty: "leicht",
    text: "Was zählt bei einer Reitbeteiligung mehr als Eigentum?",
    options: [
      "Regelmäßige Reitstunden und passende neue Ausrüstung",
      "Eine gute Reittechnik und möglichst viele Turniererfolge",
      "Verlässlich Zeit für die Versorgung und Pflege einplanen",
      "Regelmäßig bezahlen und vor allem am Wochenende reiten"
    ],
    correctIndex: 2,
    explanation: "Zeit, Pflege und Verlässlichkeit zählen mehr als Eigentum. Eine Reitbeteiligung bedeutet, Versorgung und Kosten zu teilen.",
    wikiPath: "/pferde/reitbeteiligung/",
    sourceRef: "https://wahre-haustierliebe.de/pferde/reitbeteiligung/"
  },
  {
    id: "pferde-entscheidung-101",
    mode: "klassisch",
    interaktion: "vierKarten",
    category: "pferde",
    difficulty: "knifflig",
    text: "Für welchen Zeitraum sollst du Verantwortung für ein Pferd einplanen?",
    options: [
      "Für 25–35 Jahre",
      "Für 10–15 Jahre",
      "Für 15–20 Jahre",
      "Für 40–50 Jahre"
    ],
    correctIndex: 0,
    explanation: "Plane 25–35 Jahre Verantwortung ein. Dazu gehören tägliche Versorgung, ausreichendes Budget und Rücklagen für Notfälle.",
    wikiPath: "/pferde/entscheidung/",
    sourceRef: "https://wahre-haustierliebe.de/pferde/entscheidung/"
  },
  {
    id: "tierschutz-urlaub-101",
    mode: "klassisch",
    interaktion: "vierKarten",
    category: "tierschutz",
    difficulty: "knifflig",
    text: "Wie hoch kann die Geldbuße fürs Aussetzen eines Haustiers maximal ausfallen?",
    options: [
      "500 Euro",
      "5.000 Euro",
      "25.000 Euro",
      "100.000 Euro"
    ],
    correctIndex: 2,
    explanation: "Das Tierschutzgesetz verbietet es, ein Tier auszusetzen oder zurückzulassen, um sich der Halterpflicht zu entziehen. Die Geldbuße kann bis zu 25.000 Euro betragen. Schweres Leiden oder Tod können zusätzlich strafrechtlich relevant sein.",
    wikiPath: "/tiere-und-urlaub/",
    sourceRef: "https://wahre-haustierliebe.de/tiere-und-urlaub/"
  },
  {
    id: "tierschutz-urlaub-103",
    mode: "klassisch",
    interaktion: "vierKarten",
    category: "tierschutz",
    difficulty: "leicht",
    text: "Welche Transportart ist für Haustiere besonders belastend?",
    options: [
      "Transport im Frachtraum eines Flugzeugs",
      "Fahrt im gesicherten Auto mit Pausen",
      "Bahnfahrt in einem ruhigen Abteil",
      "Überfahrt auf einer Fähre in Begleitung"
    ],
    correctIndex: 0,
    explanation: "Flugreisen sollten nicht leichtfertig geplant werden, der Transport im Frachtraum ist für Tiere besonders belastend. Ein gesichertes Auto mit Pausen, Wasser und kühleren Tageszeiten kann dagegen die angenehmste Reiseart sein.",
    wikiPath: "/tiere-und-urlaub/",
    sourceRef: "https://wahre-haustierliebe.de/tiere-und-urlaub/"
  },
  {
    id: "tierschutz-adoption-101",
    mode: "klassisch",
    interaktion: "vierKarten",
    category: "tierschutz",
    difficulty: "knifflig",
    text: "Wie viele Tiere werden jährlich ungefähr neu in deutschen Tierheimen aufgenommen?",
    options: [
      "Rund 35.000",
      "Rund 100.000",
      "Rund 1 Million",
      "Rund 350.000"
    ],
    correctIndex: 3,
    explanation: "Adoption gibt einem bereits vorhandenen Tier eine Chance und erzeugt keinen weiteren Nachschub.",
    wikiPath: "/adoption/",
    sourceRef: "https://wahre-haustierliebe.de/adoption/"
  },
  {
    id: "tierschutz-zucht-103",
    mode: "klassisch",
    interaktion: "vierKarten",
    category: "tierschutz",
    difficulty: "knifflig",
    text: "Für welche Tätigkeit kann nach § 11 Tierschutzgesetz eine Erlaubnis nötig sein?",
    options: [
      "Nur ab dem dritten Wurf eines Tieres innerhalb eines Jahres",
      "Nur bei Rassetieren mit Stammbaum und Zuchtpapieren des Verbands",
      "Bei gewerbsmäßiger Zucht oder gewerbsmäßigem Handel mit Tieren",
      "Nur bei Tieren, die an Käufer im Ausland verkauft werden"
    ],
    correctIndex: 2,
    explanation: "Bei gewerbsmäßiger Zucht oder Handel kann eine Erlaubnis nach § 11 Tierschutzgesetz nötig sein. Die behördliche Erlaubnis verhindert aber nicht automatisch Tierleid.",
    wikiPath: "/zucht-und-vermehrung/",
    sourceRef: "https://wahre-haustierliebe.de/zucht-und-vermehrung/"
  },
  {
    id: "tierschutz-notdienst-101",
    mode: "klassisch",
    interaktion: "vierKarten",
    category: "tierschutz",
    difficulty: "leicht",
    text: "Welcher Schritt klärt vor der Fahrt, ob der tierärztliche Notdienst wirklich erreichbar ist?",
    options: [
      "Die Bewertungen lesen und die bestbewertete Praxis auswählen",
      "Die gespeicherte Liste lesen und der angegebenen Zeit vertrauen",
      "Die Praxis anrufen und ihre Erreichbarkeit bestätigen lassen",
      "Die Adresse prüfen und ohne Rückfrage direkt dorthin fahren"
    ],
    correctIndex: 2,
    explanation: "Notdienste wechseln kurzfristig, und manche Listen gelten nur für bestimmte Kreise. Ein kurzer Anruf spart im Ernstfall Zeit.",
    wikiPath: "/notfall/tierarzt-notdienst/",
    sourceRef: "https://wahre-haustierliebe.de/notfall/tierarzt-notdienst/"
  },
  {
    id: "tierschutz-notdienst-102",
    mode: "klassisch",
    interaktion: "vierKarten",
    category: "tierschutz",
    difficulty: "knifflig",
    text: "Welche Organisation ist die Dachorganisation der Landestierärztekammern?",
    options: [
      "Der Deutsche Tierschutzbund",
      "Die Bundestierärztekammer (BTK)",
      "Der Tierschutzverein TASSO e. V.",
      "Die Tierärztekammer Berlin"
    ],
    correctIndex: 1,
    explanation: "Die Bundestierärztekammer ist die Dachorganisation der Landes- und Tierärztekammern. Suche den Notdienst über Bundesland oder Kammerbereich und lass seine Erreichbarkeit telefonisch bestätigen.",
    wikiPath: "/notfall/tierarzt-notdienst/",
    sourceRef: "https://wahre-haustierliebe.de/notfall/tierarzt-notdienst/"
  },
  {
    id: "tierschutz-notfallplan-101",
    mode: "klassisch",
    interaktion: "vierKarten",
    category: "tierschutz",
    difficulty: "leicht",
    text: "Wie viele Betreuungspersonen müssen für deinen Notfallplan mindestens ausdrücklich zugesagt haben?",
    options: [
      "Zwei Personen: eine Hauptperson und eine Ersatzperson",
      "Eine Person: eine Hauptperson ohne feste Ersatzperson",
      "Drei Personen: eine Hauptperson und zwei Ersatzpersonen",
      "Vier Personen: eine Hauptperson und drei Ersatzpersonen"
    ],
    correctIndex: 0,
    explanation: "Du brauchst eine Hauptperson und mindestens eine Ersatzperson. Beide müssen zugestimmt haben, das Tier kennen und die Anleitung besitzen.",
    wikiPath: "/notfallplan-haustier/",
    sourceRef: "https://wahre-haustierliebe.de/notfallplan-haustier/"
  },
  {
    id: "tierschutz-notfallplan-103",
    mode: "klassisch",
    interaktion: "vierKarten",
    category: "tierschutz",
    difficulty: "knifflig",
    text: "Wie oft solltest du den Notfallplan mindestens prüfen?",
    options: [
      "Einmal im Jahr, zum Beispiel zum Jahreswechsel",
      "Alle zwei Jahre, gemeinsam mit dem Impfpass",
      "Mindestens zweimal im Jahr, unabhängig vom Anlass",
      "Nur bei einem Umzug oder Tierarztwechsel"
    ],
    correctIndex: 2,
    explanation: "Sofort prüfst du ihn außerdem nach einem Umzug, Medikamentenwechsel, einer neuen Telefonnummer oder einem weiteren Tier.",
    wikiPath: "/notfallplan-haustier/",
    sourceRef: "https://wahre-haustierliebe.de/notfallplan-haustier/"
  },
  {
    id: "tierschutz-warten-101",
    mode: "klassisch",
    interaktion: "vierKarten",
    category: "tierschutz",
    difficulty: "knifflig",
    text: "Welche Notfallreserve solltest du für deinen „Später“-Plan vor dem Einzug eines Tieres aufbauen?",
    options: [
      "1.000–2.000 Euro",
      "100–200 Euro",
      "300–500 Euro",
      "5.000–8.000 Euro"
    ],
    correctIndex: 0,
    explanation: "Der Puffer sollte da sein, bevor das Tier einzieht. Wer vorher Rücklagen aufbaut, startet ruhiger in ein Leben mit Tier.",
    wikiPath: "/noch-nicht-bereit/",
    sourceRef: "https://wahre-haustierliebe.de/noch-nicht-bereit/"
  },
  {
    id: "tierschutz-warten-102",
    mode: "klassisch",
    interaktion: "vierKarten",
    category: "tierschutz",
    difficulty: "knifflig",
    text: "Wie lange sollte deine Wohnsituation vor dem Tiereinzug mindestens stabil absehbar sein?",
    options: [
      "Eine Perspektive von mindestens sechs Monaten",
      "Eine Perspektive von mindestens einem Jahr",
      "Eine Perspektive von mindestens fünf Jahren",
      "Eine Perspektive von mindestens 2–3 Jahren"
    ],
    correctIndex: 3,
    explanation: "Deine Wohnsituation sollte für mindestens 2–3 Jahre stabil absehbar sein. Eine Anschaffung soll warten, solange Wohnung, Geld, Zeit oder Betreuung noch nicht verlässlich geklärt sind.",
    wikiPath: "/noch-nicht-bereit/",
    sourceRef: "https://wahre-haustierliebe.de/noch-nicht-bereit/"
  },
  {
    id: "tierschutz-artgerecht-101",
    mode: "klassisch",
    interaktion: "vierKarten",
    category: "tierschutz",
    difficulty: "leicht",
    text: "Was bedeutet „artgerecht“ bei der Haltung eines Haustieres?",
    options: [
      "Eine Haltung nach den gesetzlichen Mindestanforderungen",
      "Eine Haltung mit besonders viel Kontakt zu Menschen",
      "Eine Haltung nach den natürlichen Bedürfnissen der Tierart",
      "Eine Haltung mit stets frei verfügbarem Futter und Wasser"
    ],
    correctIndex: 2,
    explanation: "Artgerecht heißt, die natürlichen Bedürfnisse der Tierart zu erfüllen. Dazu gehören Platz, Sozialstruktur, Ernährung, Beschäftigung, Klima, Rückzug und Gesundheitsvorsorge.",
    wikiPath: "/glossar/",
    sourceRef: "https://wahre-haustierliebe.de/glossar/"
  },
  {
    id: "tierschutz-qualzucht-definition-102",
    mode: "klassisch",
    interaktion: "vierKarten",
    category: "tierschutz",
    difficulty: "leicht",
    text: "Was bedeutet „Qualzucht“?",
    options: [
      "Zucht auf Merkmale, die Schmerzen oder Funktionsstörungen verursachen",
      "Zucht auf Merkmale, die von einem anerkannten Rassestandard abweichen",
      "Zucht auf Merkmale, die ausschließlich durch enge Verpaarung entstehen",
      "Zucht auf Merkmale, die sich von wild lebenden Verwandten unterscheiden"
    ],
    correctIndex: 0,
    explanation: "Entscheidend sind die Folgen eines Zuchtmerkmals für das Tier: Schmerzen, Leiden, Schäden oder eingeschränkte normale Funktionen. Ein beliebtes Rassemerkmal kann trotzdem Atmung, Bewegung oder Sinneswahrnehmung belasten.",
    wikiPath: "/glossar/",
    sourceRef: "https://wahre-haustierliebe.de/glossar/"
  },
  {
    id: "tierschutz-beobachtereffekt-107",
    mode: "klassisch",
    interaktion: "vierKarten",
    category: "tierschutz",
    difficulty: "mittel",
    text: "Was meint der Beobachtereffekt nach der Gabe von Globuli?",
    options: [
      "Leichte Beschwerden werden ohne Wirkung des Mittels besser",
      "Eine parallele tierärztliche Behandlung bessert die Beschwerden",
      "Die Erwartung verändert die Deutung des Tierverhaltens",
      "Eine veränderte Pflege verbessert den Zustand des Tieres"
    ],
    correctIndex: 2,
    explanation: "Wer fest mit einer Wirkung rechnet, kann das Verhalten seines Tieres anders deuten. Eine Besserung kann außerdem durch Spontanheilung, veränderte Pflege oder eine gleichzeitige tierärztliche Behandlung entstehen.",
    wikiPath: "/wissen/",
    sourceRef: "https://wahre-haustierliebe.de/wissen/"
  },
  {
    id: "tierschutz-kompetenzillusion-111",
    mode: "klassisch",
    interaktion: "vierKarten",
    category: "tierschutz",
    difficulty: "mittel",
    text: "Du bist mit einem Haustier aufgewachsen. Was beschreibt die Kompetenz-Illusion?",
    options: [
      "Erfahrungen aus der Kindheit werden grundsätzlich als wertlos angesehen",
      "Kindheitserinnerungen werden mit Wissen über Tierbedürfnisse verwechselt",
      "Erfahrungen mit eigenen Tieren werden wegen neuer Ratgeber unterschätzt",
      "Erfahrung mit schwierigen Tieren wird als fehlende Begabung ausgelegt"
    ],
    correctIndex: 1,
    explanation: "Mit einem Haustier aufzuwachsen vermittelt Erinnerungen, aber nicht automatisch Wissen über artgerechte Haltung. Die Perspektive und Bedürfnisse des Tieres können dabei unbemerkt fehlen.",
    wikiPath: "/mensch/",
    sourceRef: "https://wahre-haustierliebe.de/mensch/"
  },
  {
    id: "tierschutz-kognitive-dissonanz-112",
    mode: "klassisch",
    interaktion: "vierKarten",
    category: "tierschutz",
    difficulty: "knifflig",
    text: "Eine gescheiterte Tierhaltung wird allein der Rasse zugeschrieben. Was meint dabei „kognitive Dissonanz“?",
    options: [
      "Eine Unsicherheit beim Unterscheiden ähnlicher Tierrassen",
      "Eine Überforderung durch widersprüchliche Erziehungstipps",
      "Eine Ablehnung von Tierhaltung nach schlechten Erfahrungen",
      "Eine Spannung zwischen Selbstbild und tatsächlichem Verhalten"
    ],
    correctIndex: 3,
    explanation: "Das Eingeständnis, nicht vorbereitet gewesen zu sein, kann dem eigenen Selbstbild widersprechen. Menschen können diese Spannung durch Schuldverschiebung auf Tier, Rasse oder Pech abwehren.",
    wikiPath: "/mensch/",
    sourceRef: "https://wahre-haustierliebe.de/mensch/"
  },

  // ============ MYTHEN-CHECK ============
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
    id: "mythen-hund-abgabealter-101",
    mode: "mythen",
    interaktion: "jaNein",
    correctJaNein: false,
    category: "hunde",
    difficulty: "mittel",
    text: "„Die achte Woche ist der beste Zeitpunkt, um einen Welpen abzugeben.“",
    explanation: "Ein Alter von über acht Wochen ist die gesetzliche Untergrenze, nicht automatisch der beste Umzugstermin. Der Deutsche Tierschutzbund empfiehlt 9–11 Wochen als guten Aufnahmezeitpunkt: Dann ist der Welpe vollständig entwöhnt und hat wichtige Lernzeit bei Mutter und Geschwistern verbracht.",
    wikiPath: "/hunde/abgabealter/",
    sourceRef: "https://wahre-haustierliebe.de/hunde/abgabealter/"
  },
  {
    id: "mythen-hund-abgabealter-102",
    mode: "mythen",
    interaktion: "jaNein",
    correctJaNein: true,
    category: "hunde",
    difficulty: "knifflig",
    text: "„Ein Welpe darf früher von der Mutter getrennt werden, wenn dies nach tierärztlichem Urteil zum Schutz vor Schmerzen, Leiden oder Schäden nötig ist.“",
    explanation: "Die Tierschutz-Hundeverordnung erlaubt diese Ausnahme zum Schutz des Muttertieres oder des Welpen. Eine frühere Trennung braucht dieses tierärztliche Urteil.",
    wikiPath: "/hunde/abgabealter/",
    sourceRef: "https://wahre-haustierliebe.de/hunde/abgabealter/"
  },
  {
    id: "mythen-hund-buero-101",
    mode: "mythen",
    interaktion: "jaNein",
    correctJaNein: false,
    category: "hunde",
    difficulty: "mittel",
    text: "„Ein Hund, der stundenlang reglos im Büro liegt, ist automatisch entspannt.“",
    explanation: "Viele Hunde halten Stress still aus. Entscheidend ist, ob er freiwillig ruht, trinkt, normal frisst und nach dem Bürotag weder überdreht noch erschöpft ist.",
    wikiPath: "/hunde/hund-im-buero/",
    sourceRef: "https://wahre-haustierliebe.de/hunde/hund-im-buero/"
  },
  {
    id: "mythen-hund-buero-102",
    mode: "mythen",
    interaktion: "jaNein",
    correctJaNein: true,
    category: "hunde",
    difficulty: "leicht",
    text: "„Für einen Bürohund braucht es die Zustimmung von Arbeitgeber und Team, nicht nur die der Halterin.“",
    explanation: "Ein Bürohund ist keine private Einzelentscheidung. Arbeitgeber, Kolleginnen und Kollegen sowie Themen wie Allergien, Angst und Hygiene müssen mitgedacht werden.",
    wikiPath: "/hunde/hund-im-buero/",
    sourceRef: "https://wahre-haustierliebe.de/hunde/hund-im-buero/"
  },
  {
    id: "mythen-hund-sozial-101",
    mode: "mythen",
    interaktion: "jaNein",
    correctJaNein: false,
    category: "hunde",
    difficulty: "leicht",
    text: "„Ein Hund ist dann gut ausgelastet, wenn er nach dem Auspowern völlig erschöpft ist.“",
    explanation: "Gute Beschäftigung heißt nicht, einen Hund bis zum Umfallen auszupowern. Es geht um gemeinsame Orientierung: suchen, warten, verstehen und wieder herunterfahren.",
    wikiPath: "/hunde/soziale-beduerfnisse/",
    sourceRef: "https://wahre-haustierliebe.de/hunde/soziale-beduerfnisse/"
  },
  {
    id: "mythen-hund-sozial-102",
    mode: "mythen",
    interaktion: "jaNein",
    correctJaNein: true,
    category: "hunde",
    difficulty: "leicht",
    text: "„Zur Beschäftigung eines Hundes gehören auch Schlaf und Reizpausen.“",
    explanation: "Nach jeder Beschäftigung braucht ein Hund Ruhe. Ein Dauerprogramm macht viele Hunde nicht glücklich, sondern nervös.",
    wikiPath: "/hunde/soziale-beduerfnisse/",
    sourceRef: "https://wahre-haustierliebe.de/hunde/soziale-beduerfnisse/"
  },
  {
    id: "mythen-hund-stadtfest-102",
    mode: "mythen",
    interaktion: "jaNein",
    correctJaNein: false,
    category: "hunde",
    difficulty: "mittel",
    text: "„Ein vorher positiv trainierter Maulkorb macht es vertretbar, einen überforderten Hund durch die Menge zu führen.“",
    explanation: "Ein Maulkorb kann bei manchen Hunden sinnvoll sein, ersetzt aber keinen Abstand und keine Ruhe. Er ist kein Werkzeug, um einen überforderten Hund trotzdem durch die Menge zu bringen.",
    wikiPath: "/hunde/stadtfest-rummel/",
    sourceRef: "https://wahre-haustierliebe.de/hunde/stadtfest-rummel/"
  },
  {
    id: "mythen-hund-allein-102",
    mode: "mythen",
    interaktion: "jaNein",
    correctJaNein: false,
    category: "hunde",
    difficulty: "mittel",
    text: "„Ein Hund, der nichts zerstört und nicht in die Wohnung macht, leidet nicht unter dem Alleinsein.“",
    explanation: "Ein Hund kann still leiden, ohne dass es sichtbar wird. Dass er nichts zerstört, sagt nichts darüber, wie es ihm geht.",
    wikiPath: "/hunde/allein-zu-hause/",
    sourceRef: "https://wahre-haustierliebe.de/hunde/allein-zu-hause/"
  },
  {
    id: "mythen-hund-kosten-102",
    mode: "mythen",
    interaktion: "jaNein",
    correctJaNein: false,
    category: "hunde",
    difficulty: "mittel",
    text: "„Solange ein Hund gesund ist, bleibt er auch günstig.“",
    explanation: "Auch ein gesunder Hund braucht Futter, Vorsorge, Versicherung, Steuer und gegebenenfalls Betreuung. Medikamente, Spezialfutter oder eine plötzliche Erkrankung können die Kosten zusätzlich erhöhen.",
    wikiPath: "/hunde/kosten/",
    sourceRef: "https://wahre-haustierliebe.de/hunde/kosten/"
  },
  {
    id: "mythen-hund-kastration-103",
    mode: "mythen",
    interaktion: "jaNein",
    correctJaNein: true,
    category: "hunde",
    difficulty: "knifflig",
    text: "„Bei Rüden kann eine Kastration bei Erkrankungen von Hoden oder Prostata sinnvoll sein.“",
    explanation: "Sinnvoll kann sie bei klar hormonabhängigem Verhalten oder bei Erkrankungen von Hoden, Prostata oder Perianaldrüsen sein. Als Standardantwort taugt sie trotzdem nicht.",
    wikiPath: "/hunde/kastration/",
    sourceRef: "https://wahre-haustierliebe.de/hunde/kastration/"
  },
  {
    id: "mythen-hund-zwinger-101",
    mode: "mythen",
    interaktion: "jaNein",
    correctJaNein: false,
    category: "hunde",
    difficulty: "mittel",
    text: "„Zwingerhaltung ist für Hunde in Deutschland grundsätzlich verboten.“",
    explanation: "Zwingerhaltung bleibt rechtlich möglich, aber nur als enger Rahmen. Grundsätzlich verboten ist die Anbindehaltung.",
    wikiPath: "/hunde/hofhaltung-und-zwinger/",
    sourceRef: "https://wahre-haustierliebe.de/hunde/hofhaltung-und-zwinger/"
  },
  {
    id: "mythen-hund-gesundheit-101",
    mode: "mythen",
    interaktion: "jaNein",
    correctJaNein: false,
    category: "hunde",
    difficulty: "leicht",
    text: "„Eine Zahnkontrolle ist unnötig, solange dein Hund keine Schmerzen zeigt.“",
    explanation: "Deshalb ist die regelmäßige Zahnkontrolle beim Tierarzt auch ohne sichtbare Beschwerden wichtig. Unbehandelt führen Zahnprobleme zu Schmerzen, Futterverweigerung und Infektionen.",
    wikiPath: "/hunde/gesundheit/",
    sourceRef: "https://wahre-haustierliebe.de/hunde/gesundheit/"
  },
  {
    id: "mythen-hund-gesundheit-102",
    mode: "mythen",
    interaktion: "jaNein",
    correctJaNein: true,
    category: "hunde",
    difficulty: "mittel",
    text: "„Pfotenlecken und Ohrenentzündungen können ein Hinweis auf eine Allergie sein.“",
    explanation: "Hunde reagieren auf Futtermittelunverträglichkeiten, Umweltallergien und Flohspeichelallergie häufig mit Juckreiz, Ohrenentzündungen, Pfotenlecken oder Fellverlust. Die Diagnostik ist oft langwierig.",
    wikiPath: "/hunde/gesundheit/",
    sourceRef: "https://wahre-haustierliebe.de/hunde/gesundheit/"
  },
  {
    id: "mythen-hund-entscheidung-101",
    mode: "mythen",
    interaktion: "jaNein",
    correctJaNein: false,
    category: "hunde",
    difficulty: "leicht",
    text: "„Für die Entscheidung für einen Hund reicht es, wenn eine Person im Haushalt einverstanden ist.“",
    explanation: "Alle Personen im Haushalt müssen einverstanden sein. Außerdem sollte geklärt sein, wer täglich Zeit, Betreuung, Bewegung und Kosten übernimmt, auch bei Arbeit, Krankheit und Urlaub.",
    wikiPath: "/hunde/entscheidung/",
    sourceRef: "https://wahre-haustierliebe.de/hunde/entscheidung/"
  },
  {
    id: "mythen-hund-entscheidung-102",
    mode: "mythen",
    interaktion: "jaNein",
    correctJaNein: true,
    category: "hunde",
    difficulty: "knifflig",
    text: "„Möpse, Französische Bulldoggen und Teacup-Hunde haben zusätzlich angezüchtete Gesundheitsprobleme.“",
    explanation: "Bei diesen Rassen sind gesundheitliche Probleme zum Teil angezüchtet. Wer sich dafür interessiert, sollte das vor der Entscheidung ehrlich einrechnen.",
    wikiPath: "/hunde/entscheidung/",
    sourceRef: "https://wahre-haustierliebe.de/hunde/entscheidung/"
  },
  {
    id: "mythen-hund-hitzefalle-101",
    mode: "mythen",
    interaktion: "jaNein",
    correctJaNein: false,
    category: "hunde",
    difficulty: "mittel",
    text: "„Ein überhitzter Hund sollte mit eiskaltem Wasser gekühlt werden.“",
    explanation: "Kühle den Hund kontrolliert mit kühlem, nicht eiskaltem Wasser und Luftzug. Wasser zum Trinken gibt es nur, wenn er wach und schluckfähig ist; einflößen solltest du es nie.",
    wikiPath: "/hitzefalle-auto/",
    sourceRef: "https://wahre-haustierliebe.de/hitzefalle-auto/"
  },
  {
    id: "mythen-hund-hitzefalle-102",
    mode: "mythen",
    interaktion: "jaNein",
    correctJaNein: true,
    category: "hunde",
    difficulty: "knifflig",
    text: "„Auch wenn ein Hund nach einer Überhitzung erholt wirkt, sollte er tierärztlich abgeklärt werden.“",
    explanation: "Ein Hitzschlag kann Organe, Kreislauf und Nervensystem schädigen, auch wenn der Hund sich scheinbar erholt.",
    wikiPath: "/hitzefalle-auto/",
    sourceRef: "https://wahre-haustierliebe.de/hitzefalle-auto/"
  },
  {
    id: "mythen-hund-vegan-101",
    mode: "mythen",
    interaktion: "jaNein",
    correctJaNein: true,
    category: "hunde",
    difficulty: "mittel",
    text: "„Eine vegane Ernährung ist beim Hund nicht automatisch ausgeschlossen.“",
    explanation: "Hunde sind ernährungsphysiologisch flexibler als Katzen. Eine vegane Ernährung braucht vollständiges, bedarfsgerechtes Futter, tierärztliche Begleitung und regelmäßige Kontrolle.",
    wikiPath: "/ernaehrung-taurin/",
    sourceRef: "https://wahre-haustierliebe.de/ernaehrung-taurin/"
  },
  {
    id: "mythen-wildtier-103",
    mode: "mythen",
    interaktion: "jaNein",
    correctJaNein: true,
    category: "hunde",
    difficulty: "knifflig",
    text: "„Hunde können in Schutzgebieten auch selbst in Lebensgefahr geraten.“",
    explanation: "Heiße Quellen, steile Kanten, Wildtierkontakt oder giftige Pflanzen können tödlich sein. Regeln in Nationalparks schützen auch die Hunde.",
    wikiPath: "/wildtierhaltung/",
    sourceRef: "https://wahre-haustierliebe.de/wildtierhaltung/"
  },
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
    id: "mythen-katzen-warnsignal-101",
    mode: "mythen",
    interaktion: "jaNein",
    correctJaNein: true,
    category: "katzen",
    difficulty: "leicht",
    text: "„Bei Katzen ist eine Verhaltensänderung oft das einzige Warnsignal für Schmerz.“",
    explanation: "Katzen verbergen Schmerz instinktiv. Rückzug, Unsauberkeit oder verändertes Fressverhalten sind deshalb Hinweise und keine Trotzreaktion.",
    wikiPath: "/katzen/",
    sourceRef: "https://wahre-haustierliebe.de/katzen/"
  },
  {
    id: "mythen-katzen-zweitkatze-102",
    mode: "mythen",
    interaktion: "jaNein",
    correctJaNein: false,
    category: "katzen",
    difficulty: "leicht",
    text: "„Zwei Katzen zu halten ist immer besser als eine Katze allein.“",
    explanation: "Viele Katzen profitieren von einem passenden Artgenossen, aber nicht jede versteht sich mit jeder. Zwei Katzen zusammenzuwerfen und auf ein Zurechtraufen zu hoffen, kann genauso stressig sein wie Einzelhaltung.",
    wikiPath: "/katzen/sozialverhalten/",
    sourceRef: "https://wahre-haustierliebe.de/katzen/sozialverhalten/"
  },
  {
    id: "mythen-katzen-gruppen-101",
    mode: "mythen",
    interaktion: "jaNein",
    correctJaNein: true,
    category: "katzen",
    difficulty: "mittel",
    text: "„In der Natur schlafen Katzen in losen Gruppen zusammen und putzen sich gegenseitig.“",
    explanation: "Katzen jagen zwar allein, bilden in der Natur aber lose Gruppen. Sie schlafen zusammen, putzen sich und teilen Ressourcen.",
    wikiPath: "/katzen/sozialverhalten/",
    sourceRef: "https://wahre-haustierliebe.de/katzen/sozialverhalten/"
  },
  {
    id: "mythen-katzen-chip-101",
    mode: "mythen",
    interaktion: "jaNein",
    correctJaNein: false,
    category: "katzen",
    difficulty: "leicht",
    text: "„Ein Mikrochip verrät, wo deine Katze gerade ist.“",
    explanation: "Der Chip enthält nur eine Nummer und ist kein Ortungsgerät. Erst die Registrierung mit aktuellen Kontaktdaten macht ein gefundenes Tier zuordenbar.",
    wikiPath: "/katzen/wohnungshaltung/",
    sourceRef: "https://wahre-haustierliebe.de/katzen/wohnungshaltung/"
  },
  {
    id: "mythen-katzen-kippfenster-101",
    mode: "mythen",
    interaktion: "jaNein",
    correctJaNein: true,
    category: "katzen",
    difficulty: "leicht",
    text: "„Ein gekipptes Fenster kann für eine Katze lebensgefährlich sein.“",
    explanation: "Katzen können in Kippfenstern eingeklemmt werden und schwerste innere Verletzungen erleiden. Fenster und Balkon müssen deshalb technisch gesichert sein.",
    wikiPath: "/katzen/wohnungshaltung/",
    sourceRef: "https://wahre-haustierliebe.de/katzen/wohnungshaltung/"
  },
  {
    id: "mythen-katzen-vermehrung-101",
    mode: "mythen",
    interaktion: "jaNein",
    correctJaNein: true,
    category: "katzen",
    difficulty: "knifflig",
    text: "„Eine einzige unkastrierte Katze kann in wenigen Jahren für Hunderte Nachkommen verantwortlich sein.“",
    explanation: "Jeder ungeplante Wurf vergrößert die Zahl der Tiere, die ein Zuhause und medizinische Versorgung brauchen. Kastration ist deshalb praktischer Tierschutz.",
    wikiPath: "/katzen/kastration/",
    sourceRef: "https://wahre-haustierliebe.de/katzen/kastration/"
  },
  {
    id: "mythen-katzen-alter-101",
    mode: "mythen",
    interaktion: "jaNein",
    correctJaNein: false,
    category: "katzen",
    difficulty: "mittel",
    text: "„Wenn eine Katze nicht mehr auf ihren Lieblingsplatz springt, liegt das immer nur am Alter.“",
    explanation: "Gelenk- und Rückenschmerzen wie Arthrose werden leicht als Altern übersehen. Ein kurzes Video aus dem Alltag hilft der Praxis bei der Einschätzung.",
    wikiPath: "/katzen/stilles-leiden/",
    sourceRef: "https://wahre-haustierliebe.de/katzen/stilles-leiden/"
  },
  {
    id: "mythen-katzen-harnverschluss-101",
    mode: "mythen",
    interaktion: "jaNein",
    correctJaNein: true,
    category: "katzen",
    difficulty: "leicht",
    text: "„Bei Katern kann ein Harnröhrenverschluss lebensbedrohlich werden.“",
    explanation: "Ein Harnröhrenverschluss kann bei Katern lebensbedrohlich werden. Wenn dein Kater erfolglos auf dem Katzenklo presst, zählt Zeit: Ruf sofort eine Tierarztpraxis oder Tierklinik an.",
    wikiPath: "/katzen/stilles-leiden/",
    sourceRef: "https://wahre-haustierliebe.de/katzen/stilles-leiden/"
  },
  {
    id: "mythen-katzen-zweitkatze-101",
    mode: "mythen",
    interaktion: "jaNein",
    correctJaNein: true,
    category: "katzen",
    difficulty: "mittel",
    text: "„Bei zwei Katzen verdoppeln sich die laufenden Kosten annähernd.“",
    explanation: "Futter, Streu und Tierarzt fallen für jedes Tier an. Plane deshalb bei zwei Katzen annähernd die doppelten laufenden Kosten ein.",
    wikiPath: "/katzen/kosten/",
    sourceRef: "https://wahre-haustierliebe.de/katzen/kosten/"
  },
  {
    id: "mythen-katzen-gloeckchen-101",
    mode: "mythen",
    interaktion: "jaNein",
    correctJaNein: false,
    category: "katzen",
    difficulty: "mittel",
    text: "„Ein Glöckchen am Halsband schützt Vögel zuverlässig vor Katzen.“",
    explanation: "Ein Halsband mit Glöckchen stresst die meisten Katzen und hilft gegen die Vogeljagd kaum.",
    wikiPath: "/katzen/entscheidung/",
    sourceRef: "https://wahre-haustierliebe.de/katzen/entscheidung/"
  },
  {
    id: "mythen-katzen-tollwut-101",
    mode: "mythen",
    interaktion: "jaNein",
    correctJaNein: false,
    category: "katzen",
    difficulty: "mittel",
    text: "„Für reine Wohnungskatzen ist die Tollwut-Impfung immer Pflicht.“",
    explanation: "Bei reinen Wohnungskatzen ist sie nicht zwingend, das klärt die Praxis individuell. Bei Freigang sieht es anders aus.",
    wikiPath: "/katzen/kaetzchen-tierarzt/",
    sourceRef: "https://wahre-haustierliebe.de/katzen/kaetzchen-tierarzt/"
  },
  {
    id: "mythen-katzen-kastrationszeit-101",
    mode: "mythen",
    interaktion: "jaNein",
    correctJaNein: true,
    category: "katzen",
    difficulty: "mittel",
    text: "„Kätzinnen werden oft etwas früher kastriert als Kater.“",
    explanation: "Kater werden mit Erreichen der Geschlechtsreife kastriert, Kätzinnen häufig etwas früher. Den genauen Termin legt die Tierarztpraxis fest.",
    wikiPath: "/katzen/kaetzchen-tierarzt/",
    sourceRef: "https://wahre-haustierliebe.de/katzen/kaetzchen-tierarzt/"
  },
  {
    id: "mythen-katzen-geruch-101",
    mode: "mythen",
    interaktion: "jaNein",
    correctJaNein: false,
    category: "katzen",
    difficulty: "mittel",
    text: "„Hat ein Mensch ein Wildtierjunges berührt, nimmt die Mutter es nie wieder an.“",
    explanation: "So pauschal ist der Satz nicht seriös. Bei Wildkatzen geht es vor allem um Störung, Stress und falsche Versorgung, deshalb bleibt die Regel: nicht anfassen.",
    wikiPath: "/katzen/wildkatzenbaby-gefunden/",
    sourceRef: "https://wahre-haustierliebe.de/katzen/wildkatzenbaby-gefunden/"
  },
  {
    id: "mythen-katzen-verwechslung-101",
    mode: "mythen",
    interaktion: "jaNein",
    correctJaNein: true,
    category: "katzen",
    difficulty: "mittel",
    text: "„Junge Wildkatzen lassen sich mit bloßem Auge oft nicht sicher von getigerten Hauskatzenjungen unterscheiden.“",
    explanation: "Sie sehen einander zum Verwechseln ähnlich, und auch wildfarbene Hauskatzen können ähnlich aussehen. Die Einordnung gehört in fachkundige Hände.",
    wikiPath: "/katzen/wildkatzenbaby-gefunden/",
    sourceRef: "https://wahre-haustierliebe.de/katzen/wildkatzenbaby-gefunden/"
  },
  {
    id: "mythen-katzen-appetit-101",
    mode: "mythen",
    interaktion: "jaNein",
    correctJaNein: false,
    category: "katzen",
    difficulty: "leicht",
    text: "„Wenn die Katze ihr Futter gern frisst, ist es auch vollständig.“",
    explanation: "Appetit beweist nicht, dass alle essenziellen Nährstoffe stimmen. Entscheidend ist eine bedarfsgerechte, vollständige Zusammensetzung.",
    wikiPath: "/ernaehrung-taurin/",
    sourceRef: "https://wahre-haustierliebe.de/ernaehrung-taurin/"
  },
  {
    id: "mythen-katzen-taurinzusatz-101",
    mode: "mythen",
    interaktion: "jaNein",
    correctJaNein: false,
    category: "katzen",
    difficulty: "mittel",
    text: "„Zugesetztes Taurin im Katzenfutter ist ein Zeichen für schlechtes Futter.“",
    explanation: "Natürliche Gehalte schwanken, und Verarbeitung, Lagerung und Rezeptur brauchen Sicherheitsmargen. Der Zusatz ist oft Teil einer kontrollierten Versorgung.",
    wikiPath: "/ernaehrung-taurin/",
    sourceRef: "https://wahre-haustierliebe.de/ernaehrung-taurin/"
  },
  {
    id: "mythen-katzen-kater-101",
    mode: "mythen",
    interaktion: "jaNein",
    correctJaNein: false,
    category: "katzen",
    difficulty: "mittel",
    text: "„Nach der Kastration kann ein Kater weder kämpfen noch markieren.“",
    explanation: "Die Kastration mindert testosteronabhängiges Streunen, Paarungskämpfe und Harnmarkieren, löscht erlerntes Verhalten aber nicht sicher. Auch eine Ansteckung mit FIV und FeLV bleibt möglich.",
    wikiPath: "/kastration/",
    sourceRef: "https://wahre-haustierliebe.de/kastration/"
  },
  {
    id: "mythen-katzen-sterilisation-101",
    mode: "mythen",
    interaktion: "jaNein",
    correctJaNein: false,
    category: "katzen",
    difficulty: "mittel",
    text: "„Sterilisation und Kastration sind bei Katzen dasselbe.“",
    explanation: "Bei der Sterilisation werden nur Samenleiter oder Eileiter unterbrochen, bei der Kastration werden die Keimdrüsen entfernt. Nach einer Sterilisation bleiben Geschlechtshormone, Rolligkeit und die meisten hormonabhängigen Erkrankungsrisiken bestehen.",
    wikiPath: "/kastration/",
    sourceRef: "https://wahre-haustierliebe.de/kastration/"
  },
  {
    id: "mythen-adoption-102",
    mode: "mythen",
    interaktion: "jaNein",
    correctJaNein: true,
    category: "katzen",
    difficulty: "knifflig",
    text: "„Für Kätzchen gibt es in Deutschland kein gesetzliches Mindestabgabealter.“",
    explanation: "Gesetzliche Mindestgrenzen, fachliche Empfehlungen sowie Impf- und Transportregeln sind voneinander zu unterscheiden. Ein für den Transport geltendes Alter ist nicht automatisch ein Abgabealter.",
    wikiPath: "/adoption/",
    sourceRef: "https://wahre-haustierliebe.de/adoption/"
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
    id: "mythen-kleintiere-einstieg-101",
    mode: "mythen",
    interaktion: "jaNein",
    correctJaNein: false,
    category: "kleintiere",
    difficulty: "leicht",
    text: "„Kleintiere sind ideale Einstiegstiere für Kinder.“",
    explanation: "Klein bedeutet nicht einfach: Sozialkontakt, Platz, passendes Futter, Ruhe und Tierarztzugang müssen zur Tierart passen. Kleintiere sind deshalb keine unkomplizierten Kindertiere.",
    wikiPath: "/kleintiere/",
    sourceRef: "https://wahre-haustierliebe.de/kleintiere/"
  },
  {
    id: "mythen-kleintiere-artgenosse-101",
    mode: "mythen",
    interaktion: "jaNein",
    correctJaNein: false,
    category: "kleintiere",
    difficulty: "leicht",
    text: "„Ein Kaninchen ist für ein einzelnes Meerschweinchen ein passender Artgenosse.“",
    explanation: "Artgenossen bedeutet: Tiere derselben Art. Kaninchen und Meerschweinchen sprechen verschiedene Sprachen; zusammen ersetzen sie keinen Partner der eigenen Art.",
    wikiPath: "/kleintiere/",
    sourceRef: "https://wahre-haustierliebe.de/kleintiere/"
  },
  {
    id: "mythen-kleintiere-hochheben-101",
    mode: "mythen",
    interaktion: "jaNein",
    correctJaNein: true,
    category: "kleintiere",
    difficulty: "leicht",
    text: "„Die meisten Kleintiere mögen es nicht, hochgehoben und festgehalten zu werden.“",
    explanation: "Die meisten Kleintiere sind Fluchttiere. Hochheben, Festhalten und laute Umgebungen mögen sie meist nicht.",
    wikiPath: "/kleintiere/",
    sourceRef: "https://wahre-haustierliebe.de/kleintiere/"
  },
  {
    id: "mythen-kleintiere-kaninchen-28tage-101",
    mode: "mythen",
    interaktion: "jaNein",
    correctJaNein: false,
    category: "kleintiere",
    difficulty: "knifflig",
    text: "„Die 28-Tage-Regel ist eine Empfehlung für den Umzug eines Heimtierkaninchens.“",
    explanation: "Die Regel von über 28 Tagen in § 37 der Tierschutz-Nutztierhaltungsverordnung betrifft das Absetzen von Jungtieren in Zuchtbeständen. Für den Umzug eines Heimtierkaninchens ist sie keine Empfehlung.",
    wikiPath: "/kleintiere/kaninchen/",
    sourceRef: "https://wahre-haustierliebe.de/kleintiere/kaninchen/"
  },
  {
    id: "mythen-kleintiere-kaninchen-zaehne-101",
    mode: "mythen",
    interaktion: "jaNein",
    correctJaNein: true,
    category: "kleintiere",
    difficulty: "leicht",
    text: "„Kaninchenzähne wachsen ein Leben lang.“",
    explanation: "Falsches Futter kann zu Zahnfehlstellungen führen, die sehr schmerzhaft sind und tierärztlich behandelt werden müssen. Die lebenslang wachsenden Zähne machen die passende Ernährung besonders wichtig.",
    wikiPath: "/kleintiere/kaninchen/",
    sourceRef: "https://wahre-haustierliebe.de/kleintiere/kaninchen/"
  },
  {
    id: "mythen-kleintiere-meeri-gesetz-101",
    mode: "mythen",
    interaktion: "jaNein",
    correctJaNein: false,
    category: "kleintiere",
    difficulty: "knifflig",
    text: "„Für die Abgabe von Meerschweinchen gibt es ein eigenes bundesweites Mindestalter in Wochen.“",
    explanation: "Die bekannte Acht-Wochen-Regel stammt aus der Tierschutz-Hundeverordnung und gilt für Welpen. Für Meerschweinchen zählen trotzdem die allgemeinen Pflichten aus § 2 des Tierschutzgesetzes.",
    wikiPath: "/kleintiere/meerschweinchen/",
    sourceRef: "https://wahre-haustierliebe.de/kleintiere/meerschweinchen/"
  },
  {
    id: "mythen-kleintiere-meeri-schreckstarre-101",
    mode: "mythen",
    interaktion: "jaNein",
    correctJaNein: false,
    category: "kleintiere",
    difficulty: "mittel",
    text: "„Ein Meerschweinchen, das ruhig auf dem Schoß sitzt, genießt den Kontakt immer.“",
    explanation: "Stillsitzen kann auch eine Schreckstarre sein. Meerschweinchen sind Fluchttiere und werden nicht gern hochgehoben.",
    wikiPath: "/kleintiere/meerschweinchen/",
    sourceRef: "https://wahre-haustierliebe.de/kleintiere/meerschweinchen/"
  },
  {
    id: "mythen-kleintiere-hamster-kugel-101",
    mode: "mythen",
    interaktion: "jaNein",
    correctJaNein: false,
    category: "kleintiere",
    difficulty: "leicht",
    text: "„In einer Hamsterkugel bekommt ein Goldhamster gefahrlosen Auslauf.“",
    explanation: "Kugeln und Hamsterautos nehmen dem Tier Rückzug, Orientierung und die Kontrolle über seine Bewegung. Sie können Stress, Stürze und Verletzungen verursachen.",
    wikiPath: "/kleintiere/hamster/",
    sourceRef: "https://wahre-haustierliebe.de/kleintiere/hamster/"
  },
  {
    id: "mythen-kleintiere-hamster-eiweiss-101",
    mode: "mythen",
    interaktion: "jaNein",
    correctJaNein: true,
    category: "kleintiere",
    difficulty: "mittel",
    text: "„Zum Futter eines Goldhamsters gehört auch tierisches Eiweiß.“",
    explanation: "Goldhamster sind keine reinen Pflanzenfresser. Neben einer zuckerfreien Futtermischung und geeignetem Grünfutter gehört tierisches Eiweiß zur Ernährung.",
    wikiPath: "/kleintiere/hamster/",
    sourceRef: "https://wahre-haustierliebe.de/kleintiere/hamster/"
  },
  {
    id: "mythen-kleintiere-ratten-toilette-101",
    mode: "mythen",
    interaktion: "jaNein",
    correctJaNein: true,
    category: "kleintiere",
    difficulty: "leicht",
    text: "„Heimratten legen feste Toilettenecken an.“",
    explanation: "Ratten sind reinlich und putzen sich ausgiebig. Ihr Ruf als Schmuddeltiere passt nicht zu dem, wie sie wirklich leben.",
    wikiPath: "/kleintiere/ratten/",
    sourceRef: "https://wahre-haustierliebe.de/kleintiere/ratten/"
  },
  {
    id: "mythen-kleintiere-ratten-hamsterkaefig-101",
    mode: "mythen",
    interaktion: "jaNein",
    correctJaNein: false,
    category: "kleintiere",
    difficulty: "mittel",
    text: "„Ein großer Hamsterkäfig reicht für Ratten, wenn sie täglich Auslauf bekommen.“",
    explanation: "Ratten brauchen eine große, hohe Voliere mit mehreren Ebenen, Klettermöglichkeiten und Häuschen. Der tägliche Auslauf kommt zusätzlich dazu, er ersetzt den Lebensraum nicht.",
    wikiPath: "/kleintiere/ratten/",
    sourceRef: "https://wahre-haustierliebe.de/kleintiere/ratten/"
  },
  {
    id: "mythen-kleintiere-degu-diabetes-101",
    mode: "mythen",
    interaktion: "jaNein",
    correctJaNein: true,
    category: "kleintiere",
    difficulty: "knifflig",
    text: "„Degus neigen stark zu Diabetes, deshalb brauchen sie zuckerfreies Futter.“",
    explanation: "Degus neigen stark zu Diabetes und brauchen deshalb zuckerfreies Futter. Sichere Nagemöglichkeiten gehören ebenfalls dauerhaft ins Gehege.",
    wikiPath: "/kleintiere/degus-chinchillas/",
    sourceRef: "https://wahre-haustierliebe.de/kleintiere/degus-chinchillas/"
  },
  {
    id: "mythen-kleintiere-degu-tagaktiv-101",
    mode: "mythen",
    interaktion: "jaNein",
    correctJaNein: false,
    category: "kleintiere",
    difficulty: "mittel",
    text: "„Degus sind nachtaktiv und werden erst am Abend munter.“",
    explanation: "Degus sind tagaktiv. Chinchillas sind dagegen dämmerungs- und nachtaktiv; die beiden Arten haben unterschiedliche Tagesrhythmen.",
    wikiPath: "/kleintiere/degus-chinchillas/",
    sourceRef: "https://wahre-haustierliebe.de/kleintiere/degus-chinchillas/"
  },
  {
    id: "mythen-qualzucht-102",
    mode: "mythen",
    interaktion: "jaNein",
    correctJaNein: true,
    category: "kleintiere",
    difficulty: "mittel",
    text: "„Hängeohren bei Widderkaninchen können chronische Ohrenentzündungen verursachen.“",
    explanation: "Bei Widderkaninchen sind die Gehörgänge verengt. Das kann Bakterien und Parasiten begünstigen und zu Entzündungen, Gehörproblemen und Schmerzen führen.",
    wikiPath: "/qualzucht/",
    sourceRef: "https://wahre-haustierliebe.de/qualzucht/"
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
  {
    id: "mythen-voegel-gesetz-101",
    mode: "mythen",
    interaktion: "jaNein",
    correctJaNein: false,
    category: "voegel",
    difficulty: "mittel",
    text: "„Das deutsche Recht legt für die Abgabe von Wellensittichen eine feste Woche fest.“",
    explanation: "Eine gesetzliche Abgabewoche gibt es nicht. Das ist trotzdem kein Freibrief, denn das Tierschutzgesetz verlangt, die Bedürfnisse des Tieres zu berücksichtigen.",
    wikiPath: "/voegel/",
    sourceRef: "https://wahre-haustierliebe.de/voegel/"
  },
  {
    id: "mythen-voegel-schwarm-andereart-101",
    mode: "mythen",
    interaktion: "jaNein",
    correctJaNein: false,
    category: "voegel",
    difficulty: "leicht",
    text: "„Ein Vogel anderer Art ist ein guter Partner für einen einzelnen Wellensittich.“",
    explanation: "Andere Arten haben eine andere Körpersprache, andere Aktivitätszeiten und teils andere Ansprüche. Nur artgleiche Sozialpartner ersetzen den Schwarm.",
    wikiPath: "/voegel/schwarmhaltung/",
    sourceRef: "https://wahre-haustierliebe.de/voegel/schwarmhaltung/"
  },
  {
    id: "mythen-voegel-schwarm-paar-101",
    mode: "mythen",
    interaktion: "jaNein",
    correctJaNein: true,
    category: "voegel",
    difficulty: "leicht",
    text: "„Ein bestehendes Wellensittich-Paar sollte nicht getrennt werden.“",
    explanation: "Bestehende Paare sollen zusammenbleiben. Neue Tiere werden erst nach vogelkundiger Untersuchung langsam und beaufsichtigt mit dem Bestand zusammengeführt.",
    wikiPath: "/voegel/schwarmhaltung/",
    sourceRef: "https://wahre-haustierliebe.de/voegel/schwarmhaltung/"
  },
  {
    id: "mythen-voegel-uv-lampe-101",
    mode: "mythen",
    interaktion: "jaNein",
    correctJaNein: false,
    category: "voegel",
    difficulty: "mittel",
    text: "„Solange eine Vogellampe für uns hell leuchtet, liefert sie auch genug UV.“",
    explanation: "Die UV-Leistung nimmt ab, obwohl die Lampe für menschliche Augen noch hell wirkt. Das Austauschintervall richtet sich nach dem konkreten Leuchtmittel.",
    wikiPath: "/voegel/uv-licht/",
    sourceRef: "https://wahre-haustierliebe.de/voegel/uv-licht/"
  },
  {
    id: "mythen-voegel-kueche-oele-101",
    mode: "mythen",
    interaktion: "jaNein",
    correctJaNein: false,
    category: "voegel",
    difficulty: "leicht",
    text: "„Ätherische Öle sind für Vögel ungefährlich, weil sie natürlich sind.“",
    explanation: "Vogelatemwege reagieren empfindlich auf Duftkerzen, ätherische Öle, Raumsprays und Parfüm. „Natürlich“ bedeutet nicht ungefährlich.",
    wikiPath: "/voegel/kuechenluft-teflon/",
    sourceRef: "https://wahre-haustierliebe.de/voegel/kuechenluft-teflon/"
  },
  {
    id: "mythen-voegel-kueche-backofen-101",
    mode: "mythen",
    interaktion: "jaNein",
    correctJaNein: true,
    category: "voegel",
    difficulty: "knifflig",
    text: "„Je nach Produkt können auch selbstreinigende Backöfen für Vögel gefährliche Dämpfe freisetzen.“",
    explanation: "Beschichtete PTFE-Oberflächen können beim starken Erhitzen Dämpfe freisetzen. Das betrifft je nach Produkt auch Backbleche und Geräte.",
    wikiPath: "/voegel/kuechenluft-teflon/",
    sourceRef: "https://wahre-haustierliebe.de/voegel/kuechenluft-teflon/"
  },
  {
    id: "mythen-voegel-freiflug-sandpapier-101",
    mode: "mythen",
    interaktion: "jaNein",
    correctJaNein: false,
    category: "voegel",
    difficulty: "mittel",
    text: "„Sandpapierstangen halten Wellensittichen die Krallen kurz und sind deshalb empfehlenswert.“",
    explanation: "Sandpapierstangen und einheitliche Plastikstangen schaden mehr, als sie helfen. Naturäste mit verschiedenen Durchmessern sind die bessere Grundausstattung.",
    wikiPath: "/voegel/freiflug/",
    sourceRef: "https://wahre-haustierliebe.de/voegel/freiflug/"
  },
  {
    id: "mythen-voegel-partner-beobachten-101",
    mode: "mythen",
    interaktion: "jaNein",
    correctJaNein: true,
    category: "voegel",
    difficulty: "mittel",
    text: "„Wellensittiche sind vor allem Tiere zum Beobachten, nicht zum Kuscheln.“",
    explanation: "Anfassen, Festhalten und Kuscheln dürfen nie erzwungen werden. Neues wird schrittweise angeboten, damit scheue Tiere Abstand halten können.",
    wikiPath: "/voegel/partnerersatz/",
    sourceRef: "https://wahre-haustierliebe.de/voegel/partnerersatz/"
  },
  {
    id: "mythen-voegel-ruhe-decke-101",
    mode: "mythen",
    interaktion: "jaNein",
    correctJaNein: false,
    category: "voegel",
    difficulty: "leicht",
    text: "„Eine Käfigabdeckung darf nachts die Luftzirkulation behindern.“",
    explanation: "Der Schlafbereich muss ruhig, dunkel und frei von Zugluft sein. Eine Abdeckung darf die Luftzirkulation nicht behindern.",
    wikiPath: "/voegel/ruhe-schlaf/",
    sourceRef: "https://wahre-haustierliebe.de/voegel/ruhe-schlaf/"
  },
  {
    id: "mythen-voegel-ernaehrung-napf-101",
    mode: "mythen",
    interaktion: "jaNein",
    correctJaNein: true,
    category: "voegel",
    difficulty: "leicht",
    text: "„Ein ständig voller Körnernapf begünstigt Übergewicht bei Wellensittichen.“",
    explanation: "In der Natur suchen Wellensittiche große Teile des Tages nach Nahrung. Ein immer gefüllter Napf nimmt ihnen diese Beschäftigung.",
    wikiPath: "/voegel/ernaehrung/",
    sourceRef: "https://wahre-haustierliebe.de/voegel/ernaehrung/"
  },
  {
    id: "mythen-voegel-alltag-automat-101",
    mode: "mythen",
    interaktion: "jaNein",
    correctJaNein: false,
    category: "voegel",
    difficulty: "mittel",
    text: "„Ein voller Futterautomat ersetzt die Versorgung im Urlaub.“",
    explanation: "Urlaub, Krankheit und Familiennotfälle brauchen eine eingewiesene Betreuung, die täglich kommt und Veränderungen erkennt. Ein Automat sieht nicht, wenn ein Vogel krank ist.",
    wikiPath: "/voegel/alltag-kosten-betreuung/",
    sourceRef: "https://wahre-haustierliebe.de/voegel/alltag-kosten-betreuung/"
  },
  {
    id: "mythen-voegel-alltag-notfall-101",
    mode: "mythen",
    interaktion: "jaNein",
    correctJaNein: true,
    category: "voegel",
    difficulty: "leicht",
    text: "„Ein einziger akuter Tierarztfall kann die laufenden Monatskosten deutlich übersteigen.“",
    explanation: "Deshalb ist eine Rücklage kein Extra. Zu den Kosten zählen außerdem Voliere, Fensterschutz, Beleuchtung samt Strom, Naturäste und Frischfutter.",
    wikiPath: "/voegel/alltag-kosten-betreuung/",
    sourceRef: "https://wahre-haustierliebe.de/voegel/alltag-kosten-betreuung/"
  },
  {
    id: "mythen-voegel-zucht-hobby-101",
    mode: "mythen",
    interaktion: "jaNein",
    correctJaNein: false,
    category: "voegel",
    difficulty: "leicht",
    text: "„Zucht ist eine harmlose Erweiterung der Wellensittich-Haltung.“",
    explanation: "Eiablage belastet den Körper der Henne und kann zu Legenot und Kalziummangel führen. Dazu kommen Risiken bei Brut und Aufzucht und der Bedarf an vielen neuen Plätzen.",
    wikiPath: "/voegel/zucht-eier/",
    sourceRef: "https://wahre-haustierliebe.de/voegel/zucht-eier/"
  },
  {
    id: "mythen-voegel-zucht-tierheim-101",
    mode: "mythen",
    interaktion: "jaNein",
    correctJaNein: true,
    category: "voegel",
    difficulty: "mittel",
    text: "„Der Deutsche Tierschutzbund rät von der Zucht ab, weil viele Wellensittiche in Tierheimen auf ein Zuhause warten.“",
    explanation: "Jedes Jungtier braucht Platz, soziale Partner, medizinische Versorgung und ein dauerhaft geeignetes Zuhause. Nachwuchs schafft zusätzliche Tiere, obwohl schon viele ein Zuhause suchen.",
    wikiPath: "/voegel/zucht-eier/",
    sourceRef: "https://wahre-haustierliebe.de/voegel/zucht-eier/"
  },
  {
    id: "mythen-voegel-krank-trinken-101",
    mode: "mythen",
    interaktion: "jaNein",
    correctJaNein: true,
    category: "voegel",
    difficulty: "mittel",
    text: "„Mehr Trinken als sonst kann bei Vögeln ein Warnsignal sein.“",
    explanation: "Vögel verbergen Krankheit als Beutetiere lange. Auch weniger Fressen, veränderter Kot oder eine veränderte Stimme sollten ernst genommen werden.",
    wikiPath: "/voegel/krankheit-erkennen/",
    sourceRef: "https://wahre-haustierliebe.de/voegel/krankheit-erkennen/"
  },
  {
    id: "mythen-voegel-krank-praxis-101",
    mode: "mythen",
    interaktion: "jaNein",
    correctJaNein: false,
    category: "voegel",
    difficulty: "leicht",
    text: "„Jede Kleintierpraxis behandelt Vögel routiniert.“",
    explanation: "Nicht jede Kleintierpraxis kennt sich mit Vögeln aus. Die vogelkundige Tierarztpraxis sucht man am besten vor dem Notfall, samt Transportbox.",
    wikiPath: "/voegel/krankheit-erkennen/",
    sourceRef: "https://wahre-haustierliebe.de/voegel/krankheit-erkennen/"
  },
  {
    id: "mythen-voegel-qual-standard-101",
    mode: "mythen",
    interaktion: "jaNein",
    correctJaNein: true,
    category: "voegel",
    difficulty: "mittel",
    text: "„Was unter Züchtern als ‚Rassestandard‘ gilt, kann trotzdem Qualzucht sein.“",
    explanation: "Bei Schauwellensittichen gilt das lange Stirngefieder als Standard. Für die Vögel ist es eine Belastung.",
    wikiPath: "/voegel/qualzucht/",
    sourceRef: "https://wahre-haustierliebe.de/voegel/qualzucht/"
  },
  {
    id: "mythen-voegel-entscheid-zoegern-101",
    mode: "mythen",
    interaktion: "jaNein",
    correctJaNein: true,
    category: "voegel",
    difficulty: "leicht",
    text: "„Wer bei mehreren Voraussetzungen für die Vogelhaltung zögert, sollte keine Vögel aufnehmen.“",
    explanation: "Verzicht ist keine Lieblosigkeit, sondern eine verantwortliche Entscheidung. Die entscheidende Frage ist nicht, ob du Vögel schön findest, sondern ob dein Alltag zu ihnen passt.",
    wikiPath: "/voegel/entscheidung/",
    sourceRef: "https://wahre-haustierliebe.de/voegel/entscheidung/"
  },
  {
    id: "mythen-voegel-entscheid-tierheim-101",
    mode: "mythen",
    interaktion: "jaNein",
    correctJaNein: true,
    category: "voegel",
    difficulty: "mittel",
    text: "„Wer keine Vögel aufnimmt, kann ihnen trotzdem helfen.“",
    explanation: "Tierheime, Auffangstationen und Lebenshöfe lassen sich unterstützen, ohne neue Tiere in Gefangenschaft nachzufragen.",
    wikiPath: "/voegel/entscheidung/",
    sourceRef: "https://wahre-haustierliebe.de/voegel/entscheidung/"
  },
  {
    id: "mythen-notfall-102",
    mode: "mythen",
    interaktion: "jaNein",
    correctJaNein: true,
    category: "voegel",
    difficulty: "mittel",
    text: "„Ein aufgeplusterter Vogel, der mit geschlossenen Augen am Käfigboden sitzt, ist ein Notfall.“",
    explanation: "Bei dieser Haltung wartest du nicht ab. Ruf sofort die Tierarztpraxis oder den Notdienst an.",
    wikiPath: "/notfall/",
    sourceRef: "https://wahre-haustierliebe.de/notfall/"
  },
  {
    id: "mythen-exoten-101",
    mode: "mythen",
    interaktion: "jaNein",
    correctJaNein: false,
    category: "exoten",
    difficulty: "leicht",
    text: "„Wenn ein Reptil oder ein Fisch ruhig bleibt und nicht auffällt, geht es ihm gut.“",
    explanation: "Leise Tiere zeigen Fehler oft erst spät. Ein ruhiges Tier ist deshalb nicht automatisch ein zufriedenes, denn Temperatur, Licht und Futter entscheiden über sein Wohlergehen.",
    wikiPath: "/exoten/",
    sourceRef: "https://wahre-haustierliebe.de/exoten/"
  },
  {
    id: "mythen-exoten-102",
    mode: "mythen",
    interaktion: "jaNein",
    correctJaNein: true,
    category: "exoten",
    difficulty: "mittel",
    text: "„Schon kleine Fehler in der Exotenhaltung können bleibende Organschäden verursachen.“",
    explanation: "Kleine Haltungsfehler können irreparable Organschäden verursachen. Temperatur, UV-B, Feuchtigkeit und Futter gehören deshalb zur Versorgung.",
    wikiPath: "/exoten/",
    sourceRef: "https://wahre-haustierliebe.de/exoten/"
  },
  {
    id: "mythen-reptilien-101",
    mode: "mythen",
    interaktion: "jaNein",
    correctJaNein: false,
    category: "exoten",
    difficulty: "leicht",
    text: "„Bartagamen, Kornnattern und Leopardgeckos sind Anfängertiere, die kaum Technik brauchen.“",
    explanation: "Sie wirken unkompliziert, weil sie nicht bellen und nicht haaren. Dahinter steckt aber ein Zusammenspiel aus Temperaturzonen, Luftfeuchtigkeit, UV-Licht und passendem Futter.",
    wikiPath: "/exoten/reptilien/",
    sourceRef: "https://wahre-haustierliebe.de/exoten/reptilien/"
  },
  {
    id: "mythen-reptilien-102",
    mode: "mythen",
    interaktion: "jaNein",
    correctJaNein: true,
    category: "exoten",
    difficulty: "mittel",
    text: "„Viele der im Handel angebotenen Terrarien sind für ihre Tiere zu klein.“",
    explanation: "Die meisten Terrarien im Handel sind zu klein. Als Faustregel gilt mindestens die fünffache Körperlänge in der Breite.",
    wikiPath: "/exoten/reptilien/",
    sourceRef: "https://wahre-haustierliebe.de/exoten/reptilien/"
  },
  {
    id: "mythen-schildkroeten-101",
    mode: "mythen",
    interaktion: "jaNein",
    correctJaNein: false,
    category: "exoten",
    difficulty: "leicht",
    text: "„Europäische Landschildkröten können dauerhaft in einem Wohnungsterrarium leben.“",
    explanation: "Europäische Landschildkröten brauchen ein großes Freigehege im Garten. Sie sind keine Wohnungstiere.",
    wikiPath: "/exoten/schildkroeten/",
    sourceRef: "https://wahre-haustierliebe.de/exoten/schildkroeten/"
  },
  {
    id: "mythen-fische-101",
    mode: "mythen",
    interaktion: "jaNein",
    correctJaNein: false,
    category: "exoten",
    difficulty: "leicht",
    text: "„Goldfische bleiben klein und passen deshalb ins Glas.“",
    explanation: "Goldfische erreichen 20–30 cm und können 15 Jahre und älter werden. Das klassische Goldfischglas gilt als tierschutzwidrig.",
    wikiPath: "/exoten/fische/",
    sourceRef: "https://wahre-haustierliebe.de/exoten/fische/"
  },
  {
    id: "mythen-pferde-101",
    mode: "mythen",
    interaktion: "jaNein",
    correctJaNein: false,
    category: "pferde",
    difficulty: "leicht",
    text: "„Wer ein eigenes Grundstück hat, kann dort ohne Weiteres ein Pferd halten.“",
    explanation: "Ein Grundstück allein erfüllt die Anforderungen nicht. Es braucht geeignete Flächen, tägliche Bewegung, Sozialkontakt, Witterungsschutz und eine dauerhaft gesicherte Versorgung.",
    wikiPath: "/pferde/",
    sourceRef: "https://wahre-haustierliebe.de/pferde/"
  },
  {
    id: "mythen-pferde-102",
    mode: "mythen",
    interaktion: "jaNein",
    correctJaNein: false,
    category: "pferde",
    difficulty: "mittel",
    text: "„Regelmäßiges Reiten macht aus einer Haltung ohne Herde eine gute Haltung.“",
    explanation: "Reiten ersetzt keine pferdegerechte Haltung. Herde, Bewegung, Raufutter und Witterungsschutz braucht das Pferd zusätzlich.",
    wikiPath: "/pferde/",
    sourceRef: "https://wahre-haustierliebe.de/pferde/"
  },
  {
    id: "mythen-herde-101",
    mode: "mythen",
    interaktion: "jaNein",
    correctJaNein: false,
    category: "pferde",
    difficulty: "leicht",
    text: "„Ein Esel auf der Koppel ersetzt dem Pferd den Artgenossen.“",
    explanation: "Mindestens ein Artgenosse ist Pflicht. Esel oder Ziegen können ein Pferd begleiten, ersetzen aber kein weiteres Pferd.",
    wikiPath: "/pferde/herde/",
    sourceRef: "https://wahre-haustierliebe.de/pferde/herde/"
  },
  {
    id: "mythen-herde-102",
    mode: "mythen",
    interaktion: "jaNein",
    correctJaNein: true,
    category: "pferde",
    difficulty: "leicht",
    text: "„Pferde fressen, ruhen und bewegen sich in der Natur gemeinsam im Familienverband.“",
    explanation: "Darum ist ein Pferd kein Solist. Sozialkontakt ist für Pferde ein Grundbedürfnis und keine Dekoration.",
    wikiPath: "/pferde/herde/",
    sourceRef: "https://wahre-haustierliebe.de/pferde/herde/"
  },
  {
    id: "mythen-platzbedarf-101",
    mode: "mythen",
    interaktion: "jaNein",
    correctJaNein: false,
    category: "pferde",
    difficulty: "knifflig",
    text: "„Für reine Weidehaltung reichen etwa 500 m² pro Pferd.“",
    explanation: "Je nach Boden braucht ein Pferd 1.000–2.000 m², und selbst das ist nur ein Mindestmaß.",
    wikiPath: "/pferde/platzbedarf/",
    sourceRef: "https://wahre-haustierliebe.de/pferde/platzbedarf/"
  },
  {
    id: "mythen-platzbedarf-102",
    mode: "mythen",
    interaktion: "jaNein",
    correctJaNein: true,
    category: "pferde",
    difficulty: "leicht",
    text: "„Tägliches Bewegen des Pferdes ist Pflicht und kein Bonus.“",
    explanation: "Tägliches Reiten oder Bewegen ist Pflicht. Wildpferde legen 15–30 km pro Tag zurück und grasen dabei im Schritt.",
    wikiPath: "/pferde/platzbedarf/",
    sourceRef: "https://wahre-haustierliebe.de/pferde/platzbedarf/"
  },
  {
    id: "mythen-haltungsformen-101",
    mode: "mythen",
    interaktion: "jaNein",
    correctJaNein: false,
    category: "pferde",
    difficulty: "leicht",
    text: "„Dauerhaftes Anbinden ist für Pferde eine vertretbare Haltungsform.“",
    explanation: "Das Tier kann sich nicht drehen, nicht liegen und nicht mit Artgenossen umgehen. Der Deutsche Tierschutzbund lehnt Anbindehaltung klar ab.",
    wikiPath: "/pferde/haltungsformen/",
    sourceRef: "https://wahre-haustierliebe.de/pferde/haltungsformen/"
  },
  {
    id: "mythen-haltungsformen-102",
    mode: "mythen",
    interaktion: "jaNein",
    correctJaNein: true,
    category: "pferde",
    difficulty: "mittel",
    text: "„Boxenhaltung ist in vielen Reitställen der Standard.“",
    explanation: "Boxenhaltung ist Standard in vielen Reitställen. Vertretbar ist sie aber nur mit täglich mehrstündigem Auslauf und Sozialkontakt.",
    wikiPath: "/pferde/haltungsformen/",
    sourceRef: "https://wahre-haustierliebe.de/pferde/haltungsformen/"
  },
  {
    id: "mythen-kosten-102",
    mode: "mythen",
    interaktion: "jaNein",
    correctJaNein: true,
    category: "pferde",
    difficulty: "knifflig",
    text: "„Der Hufschmied kommt in der Regel alle 6–8 Wochen.“",
    explanation: "Für den Hufschmied fallen 30–80 Euro monatlich an. Er kommt alle 6–8 Wochen.",
    wikiPath: "/pferde/kosten/",
    sourceRef: "https://wahre-haustierliebe.de/pferde/kosten/"
  },
  {
    id: "mythen-reitbeteiligung-101",
    mode: "mythen",
    interaktion: "jaNein",
    correctJaNein: false,
    category: "pferde",
    difficulty: "mittel",
    text: "„Eine Reitbeteiligung ist nur ein Kompromiss für alle, die sich kein Pferd leisten können.“",
    explanation: "Sie ist kein Kompromiss, sondern oft die bessere Wahl. Du teilst Versorgung und Kosten und merkst nach ein paar Monaten, ob du wirklich bereit bist.",
    wikiPath: "/pferde/reitbeteiligung/",
    sourceRef: "https://wahre-haustierliebe.de/pferde/reitbeteiligung/"
  },
  {
    id: "mythen-reitbeteiligung-102",
    mode: "mythen",
    interaktion: "jaNein",
    correctJaNein: true,
    category: "pferde",
    difficulty: "leicht",
    text: "„Viele Pferdebesitzer suchen aktiv nach zuverlässigen Reitbeteiligungen.“",
    explanation: "Viele Pferdebesitzer suchen Hilfe bei der täglichen Versorgung. Zuverlässige Reitbeteiligungen sind deshalb gefragt.",
    wikiPath: "/pferde/reitbeteiligung/",
    sourceRef: "https://wahre-haustierliebe.de/pferde/reitbeteiligung/"
  },
  {
    id: "mythen-entscheidung-101",
    mode: "mythen",
    interaktion: "jaNein",
    correctJaNein: false,
    category: "pferde",
    difficulty: "mittel",
    text: "„Wer Zeit und Geld hat, muss sich über Stall und Platz kaum Gedanken machen.“",
    explanation: "Zur Entscheidung gehört auch, dass Stall oder Koppel genug Platz für artgerechte Haltung bieten. Dazu kommen ein Artgenosse sowie Hufschmied und Tierarzt in erreichbarer Nähe.",
    wikiPath: "/pferde/entscheidung/",
    sourceRef: "https://wahre-haustierliebe.de/pferde/entscheidung/"
  },
  {
    id: "mythen-urlaub-101",
    mode: "mythen",
    interaktion: "jaNein",
    correctJaNein: true,
    category: "tierschutz",
    difficulty: "mittel",
    text: "„Für Katzen, Vögel und viele Kleintiere ist Betreuung zu Hause oft stressärmer als die Reise.“",
    explanation: "Katzen hängen meist stark an ihrem Revier, und Vögel und Kleintiere reagieren empfindlich auf Hitze, Lärm und Stress. Betreuung im vertrauten Zuhause ist oft besser, aber sie muss mehr sein als „mal kurz nachsehen“.",
    wikiPath: "/tiere-und-urlaub/",
    sourceRef: "https://wahre-haustierliebe.de/tiere-und-urlaub/"
  },
  {
    id: "mythen-adoption-101",
    mode: "mythen",
    interaktion: "jaNein",
    correctJaNein: false,
    category: "tierschutz",
    difficulty: "leicht",
    text: "„Je jünger ein Tier bei der Übernahme ist, desto besser.“",
    explanation: "Ein Jungtier ist kein fertiges kleines Haustier. Von Mutter und Geschwistern lernt es, wie Nähe, Spiel, Grenzen und Stress funktionieren.",
    wikiPath: "/adoption/",
    sourceRef: "https://wahre-haustierliebe.de/adoption/"
  },
  {
    id: "mythen-zucht-102",
    mode: "mythen",
    interaktion: "jaNein",
    correctJaNein: true,
    category: "tierschutz",
    difficulty: "knifflig",
    text: "„Eine behördliche Erlaubnis verhindert nicht automatisch Tierleid.“",
    explanation: "Hobbyzucht, Onlinehandel, Vollzug und Nachweise sind in der Praxis kompliziert. Eine Erlaubnis nach § 11 Tierschutzgesetz löst nicht jedes Problem.",
    wikiPath: "/zucht-und-vermehrung/",
    sourceRef: "https://wahre-haustierliebe.de/zucht-und-vermehrung/"
  },
  {
    id: "mythen-notfall-101",
    mode: "mythen",
    interaktion: "jaNein",
    correctJaNein: false,
    category: "tierschutz",
    difficulty: "mittel",
    text: "„Bei Vergiftungsverdacht solltest du dein Tier möglichst schnell zum Erbrechen bringen.“",
    explanation: "Bei ätzenden Substanzen verschlimmert Erbrechen die Verletzung. Sichere Substanz und Verpackung, ruf die Tierarztpraxis an und fahr sofort hin.",
    wikiPath: "/notfall/",
    sourceRef: "https://wahre-haustierliebe.de/notfall/"
  },
  {
    id: "mythen-notdienst-101",
    mode: "mythen",
    interaktion: "jaNein",
    correctJaNein: false,
    category: "tierschutz",
    difficulty: "leicht",
    text: "„Es gibt eine zentrale bundesweite Suche für den tierärztlichen Notdienst.“",
    explanation: "Die Notdienste sind je nach Bundesland und Region unterschiedlich organisiert. Die Landestierärztekammern sind der verlässlichere Einstieg.",
    wikiPath: "/notfall/tierarzt-notdienst/",
    sourceRef: "https://wahre-haustierliebe.de/notfall/tierarzt-notdienst/"
  },
  {
    id: "mythen-notfallplan-101",
    mode: "mythen",
    interaktion: "jaNein",
    correctJaNein: false,
    category: "tierschutz",
    difficulty: "leicht",
    text: "„Es reicht, wenn eine vertraute Person einen Schlüssel zur Wohnung hat.“",
    explanation: "Die Person muss wissen, dass sie zuständig ist, das Tier kennen, erreichbar sein und auf eine aktuelle schriftliche Anleitung zugreifen können.",
    wikiPath: "/notfallplan-haustier/",
    sourceRef: "https://wahre-haustierliebe.de/notfallplan-haustier/"
  },
  {
    id: "mythen-notfallplan-102",
    mode: "mythen",
    interaktion: "jaNein",
    correctJaNein: true,
    category: "tierschutz",
    difficulty: "mittel",
    text: "„Ein Notfallplan ist erst brauchbar, wenn eine andere Person dein Tier ohne Raten versorgen kann.“",
    explanation: "Am besten testest du das: Gib jemandem die Mappe und lass ihn einen normalen Versorgungsgang übernehmen. Jede Rückfrage zeigt, was noch fehlt.",
    wikiPath: "/notfallplan-haustier/",
    sourceRef: "https://wahre-haustierliebe.de/notfallplan-haustier/"
  },
  {
    id: "mythen-wildtier-101",
    mode: "mythen",
    interaktion: "jaNein",
    correctJaNein: false,
    category: "tierschutz",
    difficulty: "mittel",
    text: "„In Deutschland gibt es ein einheitliches bundesweites Gefahrtiergesetz für die private Haltung.“",
    explanation: "Tierschutz-, Arten- und Naturschutzrecht gelten bundesweit. Gefahrtierregeln unterscheiden sich aber je nach Bundesland.",
    wikiPath: "/wildtierhaltung/",
    sourceRef: "https://wahre-haustierliebe.de/wildtierhaltung/"
  },
  {
    id: "mythen-wildtier-102",
    mode: "mythen",
    interaktion: "jaNein",
    correctJaNein: false,
    category: "tierschutz",
    difficulty: "leicht",
    text: "„Wer genug Platz hat, kann auch einen Luchs artgerecht halten.“",
    explanation: "Platz ist nur ein Baustein. Wildtiere brauchen komplexe Lebensbedingungen, Sicherheit und Fachversorgung, die private Haushalte praktisch nicht leisten.",
    wikiPath: "/wildtierhaltung/",
    sourceRef: "https://wahre-haustierliebe.de/wildtierhaltung/"
  },
  {
    id: "mythen-warten-102",
    mode: "mythen",
    interaktion: "jaNein",
    correctJaNein: true,
    category: "tierschutz",
    difficulty: "mittel",
    text: "„Ehrenamt im Tierheim zeigt dir, wie viel Zeit ein Tier wirklich braucht.“",
    explanation: "Du erlebst Fütterung, Reinigung, Körpersprache und sichere Handgriffe. Das hilft, die Anschaffung eines eigenen Tieres realistischer zu beurteilen.",
    wikiPath: "/noch-nicht-bereit/",
    sourceRef: "https://wahre-haustierliebe.de/noch-nicht-bereit/"
  },
  {
    id: "mythen-tierheim-abgabegruende-113",
    mode: "mythen",
    interaktion: "jaNein",
    correctJaNein: false,
    category: "tierschutz",
    difficulty: "leicht",
    text: "„Tiere landen vor allem wegen eigener Verhaltensprobleme im Tierheim.“",
    explanation: "Häufig liegt der Grund bei den Menschen, etwa bei Scheidung, Umzug, Überforderung oder Allergie. Das Tier selbst ist oft unproblematisch, und Tierheime kennen das Verhalten ihrer Schützlinge.",
    wikiPath: "/mensch/",
    sourceRef: "https://wahre-haustierliebe.de/mensch/"
  },

  // ============ FALL-ENTSCHEIDUNG ============
  {
    id: "fall-hund-stadtfest-001",
    mode: "fall",
    interaktion: "vierKarten",
    sticker: ["hund","halsband"],
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
    sticker: ["hund","sonne"],
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
    id: "fall-hund-urlaub-001",
    mode: "fall",
    interaktion: "vierKarten",
    sticker: ["hund","halsband"],
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
    id: "fall-hund-buero-101",
    mode: "fall",
    interaktion: "vierKarten",
    sticker: ["hund","pfote"],
    category: "hunde",
    difficulty: "mittel",
    text: "Dein Chef sagt: „Bring Bello doch gleich für den ganzen Tag mit, dann sehen wir ja, ob es klappt.“ Was schlägst du vor?",
    options: [
      "Erst ein kurzer, ruhiger Test mit klarer Betreuung",
      "Ein voller Tag, dann sieht man alles auf einmal",
      "Nur zu den Meetings, dort lernt er alle kennen",
      "Eine Woche testen und die Kollegen befragen"
    ],
    correctIndex: 0,
    explanation: "Ein guter Einstieg ist keine Acht-Stunden-Probe. Nach einem kurzen Test zählt, ob er schlafen, trinken, sich lösen und danach normal herunterfahren konnte. Erst wenn das mehrfach trägt, wird aus Mitkommen Alltag.",
    wikiPath: "/hunde/hund-im-buero/",
    sourceRef: "https://wahre-haustierliebe.de/hunde/hund-im-buero/"
  },
  {
    id: "fall-hund-stadtfest-102",
    mode: "fall",
    interaktion: "vierKarten",
    sticker: ["hund","halsband"],
    category: "hunde",
    difficulty: "mittel",
    text: "Du musst deinen Hund ausnahmsweise über einen vollen Weihnachtsmarkt führen. Was planst du?",
    options: [
      "Mitten durchs Gedränge, damit er sich gewöhnt",
      "Kurz bleiben, Randbereiche nutzen, früh gehen",
      "Ständig Leckerchen geben, dann bleibt er ruhig",
      "Locker an der Leine vor den Essensständen warten"
    ],
    correctIndex: 1,
    explanation: "Plane nicht den schönsten Platz für dich, sondern den ruhigsten für deinen Hund: Abstand zu Lautsprechern und Gedränge, Wasser dabei, kurze sichere Leine. Geh, bevor dein Hund kippt.",
    wikiPath: "/hunde/stadtfest-rummel/",
    sourceRef: "https://wahre-haustierliebe.de/hunde/stadtfest-rummel/"
  },
  {
    id: "fall-hund-gesundheit-101",
    mode: "fall",
    interaktion: "vierKarten",
    sticker: ["hund","pfote"],
    category: "hunde",
    difficulty: "mittel",
    text: "Dein großer Hund geht steif und hat weniger Lust, sich zu bewegen. Was ist im Hinblick auf HD und ED sinnvoll?",
    options: [
      "Die Zeichen als normale Trägheit einordnen",
      "Die tägliche Bewegung zunächst steigern",
      "Die Ursache möglichst früh abklären lassen",
      "Die Futtermenge zunächst deutlich senken"
    ],
    correctIndex: 2,
    explanation: "Lahmheit, steifer Gang und Bewegungsunlust können auf Hüft- oder Ellbogendysplasie hinweisen. Je früher sie erkannt wird, desto besser lässt sie sich behandeln.",
    wikiPath: "/hunde/gesundheit/",
    sourceRef: "https://wahre-haustierliebe.de/hunde/gesundheit/"
  },
  {
    id: "hunde-qualzucht-103",
    mode: "fall",
    interaktion: "vierKarten",
    sticker: ["hund","pfote"],
    category: "hunde",
    difficulty: "mittel",
    text: "Du triffst eine Halterin mit einem röchelnden Mops. Was kannst du ihr ohne Vorwürfe erklären?",
    options: [
      "Röcheln kann mit verkürzten Atemwegen und Atemnot zusammenhängen",
      "Röcheln ist bei Möpsen vor allem ein Zeichen körperlicher Entspannung",
      "Röcheln ist bei Möpsen nur dann bedenklich, wenn sie vorher gerannt sind",
      "Röcheln betrifft bei Möpsen nur den Schlaf und stört ihre Atmung nicht"
    ],
    correctIndex: 0,
    explanation: "Verkürzte Atemwege können chronische Atemnot verursachen. Informiere Halter, statt sie zu beschämen.",
    wikiPath: "/qualzucht/",
    sourceRef: "https://wahre-haustierliebe.de/qualzucht/"
  },
  {
    id: "hunde-adoption-103",
    mode: "fall",
    interaktion: "vierKarten",
    sticker: ["hund","halsband"],
    category: "hunde",
    difficulty: "mittel",
    text: "Ein Verkäufer will einen Welpen ohne Muttertier auf einem Parkplatz übergeben. Was tust du?",
    options: [
      "Du kaufst den Welpen und meldest den Verdacht erst nach der Übergabe",
      "Du kaufst nicht und meldest den Verdacht beim Veterinäramt oder der Polizei",
      "Du kaufst den Welpen, wenn du zuvor ein Foto vom Impfpass bekommst",
      "Du kaufst den Welpen und klärst die Herkunft später in der Tierarztpraxis"
    ],
    correctIndex: 1,
    explanation: "Ein Mitleidskauf beendet die Lage nicht zuverlässig und kann das Geschäft dahinter weiterfinanzieren. Der Deutsche Tierschutzbund empfiehlt, verdächtige Verkäufe dem Veterinäramt oder der Polizei zu melden.",
    wikiPath: "/adoption/",
    sourceRef: "https://wahre-haustierliebe.de/adoption/"
  },
  {
    id: "hunde-wildtier-101",
    mode: "fall",
    interaktion: "vierKarten",
    sticker: ["hund","blatt"],
    category: "hunde",
    difficulty: "mittel",
    text: "Im Wald ist Brut- und Setzzeit. Dein Hund hat noch nie gejagt. Was tust du?",
    options: [
      "Ableinen, sofern dein Hund bisher noch nie Wildtiere verfolgt hat",
      "Anleinen, den Rückruf nicht überschätzen und Ortsregeln beachten",
      "Ableinen, sofern du mit deinem Hund auf dem Hauptweg bleibst",
      "Ableinen, sofern dein Hund zuverlässig auf deinen Rückruf hört"
    ],
    correctIndex: 1,
    explanation: "Leine den Hund an, überschätze den Rückruf nicht und beachte die Regeln vor Ort. Auch ein bisher friedlicher Hund kann Wildtiere verletzen oder töten.",
    wikiPath: "/wildtierhaltung/",
    sourceRef: "https://wahre-haustierliebe.de/wildtierhaltung/"
  },
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
    id: "fall-katze-unsauber-001",
    mode: "fall",
    interaktion: "vierKarten",
    sticker: ["katze","fenster"],
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
    id: "fall-katze-umzug-101",
    mode: "fall",
    interaktion: "vierKarten",
    sticker: ["katze","napf"],
    category: "katzen",
    difficulty: "mittel",
    text: "Ihr seid gestern umgezogen, und deine Katze versteckt sich unter dem Bett. Was tust du?",
    options: [
      "Sie gleich durch die ganze neue Wohnung führen",
      "Sie regelmäßig zur Beruhigung aus dem Versteck holen",
      "Sie im ruhigen Startbereich selbst ankommen lassen",
      "Alle vertrauten Decken für einen frischen Start waschen"
    ],
    correctIndex: 2,
    explanation: "Die Katze bestimmt das Tempo. Ein ruhiger Startbereich mit Toilette, Wasser, Futter und Rückzug gibt Sicherheit, weitere Räume kommen schrittweise dazu. Vertraute Gerüche helfen ihr dabei.",
    wikiPath: "/katzen/wohnungshaltung/",
    sourceRef: "https://wahre-haustierliebe.de/katzen/wohnungshaltung/"
  },
  {
    id: "fall-kitten-zwei-101",
    mode: "fall",
    interaktion: "vierKarten",
    sticker: ["katze","pfote"],
    category: "katzen",
    difficulty: "mittel",
    text: "Du arbeitest tagsüber außer Haus und möchtest ein Kitten aufnehmen. Was ist der artgerechte Weg?",
    options: [
      "Ein Kitten aufnehmen und jeden Abend mit ihm spielen",
      "Zwei Kitten aus demselben Wurf zusammen aufnehmen",
      "Ein Kitten aufnehmen und es tagsüber per Kamera sehen",
      "Ein Kitten aufnehmen und tagsüber das Radio anlassen"
    ],
    correctIndex: 1,
    explanation: "Kitten lernen Beißhemmung, Körpersprache und Spielregeln voneinander. Wer berufstätig ist, für den ist ein zweites Kitten kein Bonus, sondern der artgerechte Weg.",
    wikiPath: "/katzen/entscheidung/",
    sourceRef: "https://wahre-haustierliebe.de/katzen/entscheidung/"
  },
  {
    id: "fall-kitten-anzeige-101",
    mode: "fall",
    interaktion: "vierKarten",
    sticker: ["katze","halsband"],
    category: "katzen",
    difficulty: "mittel",
    text: "Eine private Anzeige bietet Kitten für 0–150 € Schutzgebühr mit Parkplatzübergabe an. Was tust du?",
    options: [
      "Bei der Parkplatzübergabe nur den aktuellen Impfpass prüfen",
      "Zusagen und die Haltung nach der Übergabe überprüfen",
      "Nur das Mindestalter erfragen und dann am Parkplatz zusagen",
      "Vor der Zusage Muttertier, Geschwister und Haltung besichtigen"
    ],
    correctIndex: 3,
    explanation: "Sehr niedrige Schutzgebühren und Parkplatzübergaben sind typische Warnzeichen für Vermehrer. Seriös sind Besichtigung mit Muttertier, Impfpass, Chipnummer und schriftlicher Vertrag.",
    wikiPath: "/katzen/entscheidung/",
    sourceRef: "https://wahre-haustierliebe.de/katzen/entscheidung/"
  },
  {
    id: "fall-kitten-durchfall-101",
    mode: "fall",
    interaktion: "vierKarten",
    sticker: ["katze","napf"],
    category: "katzen",
    difficulty: "mittel",
    text: "Dein Kitten hat seit 14 Stunden Durchfall, ist aber noch munter. Was tust du?",
    options: [
      "Jetzt die Tierarztpraxis oder den Notdienst anrufen",
      "Bis zum nächsten Morgen auf Besserung warten",
      "Mit einem Fastentag erst den Darm zur Ruhe bringen",
      "Zunächst Hausmittel gegen den Durchfall ausprobieren"
    ],
    correctIndex: 0,
    explanation: "Kitten können sich schnell verschlechtern. Hält Durchfall oder Erbrechen länger als zwölf Stunden an, ist ein Anruf in der Tierarztpraxis oder beim Notdienst fällig.",
    wikiPath: "/katzen/kaetzchen-tierarzt/",
    sourceRef: "https://wahre-haustierliebe.de/katzen/kaetzchen-tierarzt/"
  },
  {
    id: "fall-wildkatze-mitgenommen-101",
    mode: "fall",
    interaktion: "vierKarten",
    sticker: ["katze","blatt"],
    category: "katzen",
    difficulty: "mittel",
    text: "Du hast ein getigertes Kätzchen aus dem Wald schon mit nach Hause genommen. Was jetzt?",
    options: [
      "Ihm Katzenmilch anbieten, damit es bis morgen durchhält",
      "Getrennt von Haustieren ruhig halten und Fachstelle anrufen",
      "Es ins nächste Tierheim bringen, dort kennt man sich aus",
      "Es zu deinen Katzen setzen, damit es sich nicht einsam fühlt"
    ],
    correctIndex: 1,
    explanation: "Jetzt hilft Schadensbegrenzung statt Schuldgefühl: warm, dunkel, getrennt von Haustieren und sofort BUND-Wildkatzenkontakt, Auffangstation oder Naturschutzbehörde anrufen. Kontakt zu Hauskatzen kann Krankheiten übertragen.",
    wikiPath: "/katzen/wildkatzenbaby-gefunden/",
    sourceRef: "https://wahre-haustierliebe.de/katzen/wildkatzenbaby-gefunden/"
  },
  {
    id: "fall-katze-wurf-101",
    mode: "fall",
    interaktion: "vierKarten",
    sticker: ["katze","pfote"],
    category: "katzen",
    difficulty: "leicht",
    text: "Deine Nachbarin will ihre junge Kätzin vor der Kastration einmal Junge bekommen lassen, das sei gesünder. Was sagst du?",
    options: [
      "Ein Wurf schützt sie später vor einer Gebärmuttervereiterung",
      "Nur ein einziger Wurf schadet nicht und macht sie ruhiger",
      "Ein Wurf ist gut, sofern sie schon älter als ein Jahr ist",
      "Dafür gibt es keinen Beleg, und ein Wurf hat eigene Risiken"
    ],
    correctIndex: 3,
    explanation: "Für einen gesundheitlichen oder seelischen Vorteil durch einen Wurf gibt es keinen tiermedizinischen Beleg. Trächtigkeit und Geburt bringen Risiken wie Schwergeburt oder Gesäugeentzündung, und jedes Jungtier braucht ein Zuhause.",
    wikiPath: "/kastration/",
    sourceRef: "https://wahre-haustierliebe.de/kastration/"
  },
  {
    id: "katzen-teebaumoel-juckreiz-110",
    mode: "fall",
    interaktion: "vierKarten",
    sticker: ["katze","pfote"],
    category: "katzen",
    difficulty: "mittel",
    text: "Deine Katze kratzt sich. Dir wird Teebaumöl fürs Fell empfohlen. Was tust du?",
    options: [
      "Den Juckreiz tierärztlich gezielt abklären lassen",
      "Das Teebaumöl stark verdünnt auf das Fell tupfen",
      "Das Teebaumöl auf ihren Schlafplatz statt aufs Fell geben",
      "Das Teebaumöl zuerst auf einer kleinen Hautstelle testen"
    ],
    correctIndex: 0,
    explanation: "Teebaumöl und konzentrierte ätherische Öle sind für Katzen tabu, auch auf Fell oder Schlafplatz. Sie nehmen Bestandteile unter anderem über die Haut und beim Putzen auf; Juckreiz und Parasiten brauchen eine gezielte Behandlung.",
    wikiPath: "/wissen/",
    sourceRef: "https://wahre-haustierliebe.de/wissen/"
  },
  {
    id: "fall-kind-kaninchen-001",
    mode: "fall",
    interaktion: "vierKarten",
    sticker: ["napf","fenster"],
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
    id: "fall-spontankauf-zoo-001",
    mode: "fall",
    interaktion: "vierKarten",
    sticker: ["meeri","napf"],
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
    id: "fall-meeri-geschlecht-101",
    mode: "fall",
    interaktion: "vierKarten",
    sticker: ["meeri","napf"],
    category: "kleintiere",
    difficulty: "knifflig",
    text: "Beim Kauf heißt es: „Das Geschlecht sehen wir später, das Böckchen wird irgendwann kastriert.“ Was tust du?",
    options: [
      "Du kaufst sie und hältst das Böckchen bis dahin allein",
      "Du kaufst sie, denn kastriert wird ja ohnehin später",
      "Du kaufst nur zwei, die sich sofort gut zu verstehen scheinen",
      "Du gehst und suchst Tiere mit sicher bestimmtem Geschlecht"
    ],
    correctIndex: 3,
    explanation: "Ein Irrtum beim Geschlecht kann ungewollte Trächtigkeit und Inzucht auslösen. Nach einer Kastration können Böckchen noch bis zu sechs Wochen zeugungsfähig sein.",
    wikiPath: "/kleintiere/meerschweinchen/",
    sourceRef: "https://wahre-haustierliebe.de/kleintiere/meerschweinchen/"
  },
  {
    id: "fall-ratten-einzeln-101",
    mode: "fall",
    interaktion: "vierKarten",
    sticker: ["kaefig","pfote"],
    category: "kleintiere",
    difficulty: "leicht",
    text: "Deine zahme Ratte lebt allein im Käfig und wirkt zufrieden. Was tust du?",
    options: [
      "Du planst eine Gruppe mit mindestens einer weiteren Ratte",
      "Du planst mehr Zeit mit ihr ein, das ersetzt Artgenossen",
      "Du wartest ab, bis sie erste Anzeichen von Einsamkeit zeigt",
      "Du lässt sie jeden Tag eine Stunde länger im Zimmer laufen"
    ],
    correctIndex: 0,
    explanation: "Ratten sind hochsozial und brauchen mindestens zwei, besser drei oder mehr Tiere in der Gruppe. Einzelhaltung kann zu Depressionen und Verhaltensstörungen führen.",
    wikiPath: "/kleintiere/ratten/",
    sourceRef: "https://wahre-haustierliebe.de/kleintiere/ratten/"
  },
  {
    id: "fall-degu-einzeln-101",
    mode: "fall",
    interaktion: "vierKarten",
    sticker: ["kaefig","pfote"],
    category: "kleintiere",
    difficulty: "leicht",
    text: "Du kannst dir viel Zeit für einen Degu nehmen und überlegst, nur einen aufzunehmen. Was passt?",
    options: [
      "Einen Degu nehmen, denn deine Zeit ersetzt den Artgenossen",
      "Einen Degu nehmen und bei Bedarf später einen zweiten holen",
      "Mindestens zwei Degus in einer großen Voliere zusammen halten",
      "Einen Degu nehmen und ihn jeden Abend aus dem Käfig lassen"
    ],
    correctIndex: 2,
    explanation: "Degus sind Kolonietiere und brauchen eine Gruppe aus mindestens 2–3 Tieren. Zeit mit dir ersetzt die Artgenossen nicht.",
    wikiPath: "/kleintiere/degus-chinchillas/",
    sourceRef: "https://wahre-haustierliebe.de/kleintiere/degus-chinchillas/"
  },
  {
    id: "kleintiere-notfall-101",
    mode: "fall",
    interaktion: "vierKarten",
    sticker: ["napf","blatt"],
    category: "kleintiere",
    difficulty: "mittel",
    text: "Dein Kaninchen frisst seit dem Morgen nichts mehr. Was tust du?",
    options: [
      "Frisches Grünfutter anbieten und erst morgen die Praxis anrufen",
      "Es warm halten und erst heute Abend über einen Anruf entscheiden",
      "Heu und Wasser anbieten und erst morgen den Kot genauer prüfen",
      "Sofort eine kaninchenerfahrene Praxis anrufen und alles schildern"
    ],
    correctIndex: 3,
    explanation: "Kaninchen können nicht erbrechen, und die Verdauung kann gefährlich langsamer werden. Ein Kaninchen, das nicht frisst, ist kein Fall für morgen.",
    wikiPath: "/notfall/",
    sourceRef: "https://wahre-haustierliebe.de/notfall/"
  },
  {
    id: "kleintiere-realhaltung-102",
    mode: "fall",
    interaktion: "vierKarten",
    sticker: ["napf","sonne"],
    category: "kleintiere",
    difficulty: "mittel",
    text: "Dein Kind verspricht, sich allein um einen Hamster zu kümmern. Wer trägt die letzte Verantwortung?",
    options: [
      "Die Erwachsenen, während das Kind bei der Versorgung helfen darf",
      "Das Kind, sobald es einen festen Wochenplan für die Versorgung hat",
      "Das Kind, sobald es eine Probewoche mit dem Tier geschafft hat",
      "Das Kind, sofern es jeden Tag an die vereinbarten Aufgaben denkt"
    ],
    correctIndex: 0,
    explanation: "Wenn ein Kind keine Lust mehr hat oder krank ist, bleibt das Tier trotzdem vollständig abhängig. Verantwortung lernt ein Kind an erwachsenen Vorbildern.",
    wikiPath: "/realhaltung/",
    sourceRef: "https://wahre-haustierliebe.de/realhaltung/"
  },
  {
    id: "fall-voegel-pfanne-001",
    mode: "fall",
    interaktion: "vierKarten",
    sticker: ["welli","kaefig"],
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
    sticker: ["welli","napf"],
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
  },
  {
    id: "fall-voegel-zufrueh-101",
    mode: "fall",
    interaktion: "vierKarten",
    sticker: ["welli","kaefig"],
    category: "voegel",
    difficulty: "mittel",
    text: "Dein Wellensittich wurde mit fünf Wochen einzeln abgegeben und lebt jetzt bei dir. Was hilft ihm?",
    options: [
      "Vogelkundige Untersuchung, gute Ernährung und ein Artgenosse",
      "Viel Zeit mit dir, damit er sich an dich statt an Vögel bindet",
      "Ein Spiegel im Käfig, damit er sich weniger allein fühlt",
      "Absolute Ruhe im Käfig und erst nach Monaten ein Partner"
    ],
    correctIndex: 0,
    explanation: "Der Vogel braucht Unterstützung, keinen Vorwurf. Nach der Untersuchung folgen ein geeigneter Artgenosse und eine ruhige Vergesellschaftung.",
    wikiPath: "/voegel/",
    sourceRef: "https://wahre-haustierliebe.de/voegel/"
  },
  {
    id: "fall-voegel-katze-101",
    mode: "fall",
    interaktion: "vierKarten",
    sticker: ["katze","welli"],
    category: "voegel",
    difficulty: "leicht",
    text: "Dein Wellensittich fliegt durchs Zimmer, deine Katze schaut ihm gebannt zu. Was tust du?",
    options: [
      "Du bringst die Katze für die Freiflugzeit in einen anderen Raum",
      "Du bleibst im Zimmer und greifst ein, wenn es einmal ernst wird",
      "Du lässt die beiden sich gewöhnen, so lernt die Katze Respekt",
      "Du lässt die Katze davor sitzen, sobald der Vogel im Käfig ist"
    ],
    correctIndex: 0,
    explanation: "Katzenkontakt ist kein Spiel, sondern ein Verletzungs- und Dauerstressrisiko. Die Tiere müssen zuverlässig getrennt sein.",
    wikiPath: "/voegel/kuechenluft-teflon/",
    sourceRef: "https://wahre-haustierliebe.de/voegel/kuechenluft-teflon/"
  },
  {
    id: "fall-voegel-einrichtung-101",
    mode: "fall",
    interaktion: "vierKarten",
    sticker: ["kaefig","piepmatz"],
    category: "voegel",
    difficulty: "mittel",
    text: "In deiner Voliere hängen Leitern, Spielzeug und Stangen dicht an dicht. Was änderst du?",
    options: [
      "Du hängst noch mehr Spielzeug auf, damit sie beschäftigt sind",
      "Du räumst Flugbahnen frei und lässt passende Naturäste stehen",
      "Du tauschst alles gegen leicht zu reinigende Plastikstangen",
      "Du lässt alles, weil sie ohnehin im Freiflug fliegen können"
    ],
    correctIndex: 1,
    explanation: "Sitzäste und Einrichtung dürfen keine Flugbahn zustellen. Überfüllte Spielzeugkäfige schaden mehr, als sie helfen.",
    wikiPath: "/voegel/freiflug/",
    sourceRef: "https://wahre-haustierliebe.de/voegel/freiflug/"
  },
  {
    id: "fall-voegel-spiegel-101",
    mode: "fall",
    interaktion: "vierKarten",
    sticker: ["welli","napf"],
    category: "voegel",
    difficulty: "leicht",
    text: "Dein Wellensittich füttert seinen Spiegel im Käfig. Was tust du?",
    options: [
      "Du lässt den Spiegel hängen, so hat er wenigstens Gesellschaft",
      "Du ergänzt einen Plastikvogel, damit er nicht nur Glas füttert",
      "Du entfernst den Spiegel, damit er ihn nicht weiter füttert",
      "Du lässt den Spiegel hängen und streichelst ihn dafür öfter"
    ],
    correctIndex: 2,
    explanation: "Fütterungsversuche am Spiegel können zu Kropfentzündungen führen. Ein Spiegel ist keine Gesellschaft, und auch ein Plastikvogel ersetzt keinen passenden Artgenossen.",
    wikiPath: "/voegel/partnerersatz/",
    sourceRef: "https://wahre-haustierliebe.de/voegel/partnerersatz/"
  },
  {
    id: "fall-voegel-abend-101",
    mode: "fall",
    interaktion: "vierKarten",
    sticker: ["welli","sonne"],
    category: "voegel",
    difficulty: "leicht",
    text: "Abends läuft im Wohnzimmer der Fernseher, dort steht auch die Voliere. Was tust du?",
    options: [
      "Einen anderen Raum finden, in dem sie ungestört schlafen können",
      "Den Ton leiser stellen und das Zimmerlicht später etwas dimmen",
      "Eine dichte Decke über die Voliere legen und weiter fernsehen",
      "Den Fernseher bis spät laufen lassen, sie schlafen später ein"
    ],
    correctIndex: 0,
    explanation: "Wer den einzigen geeigneten Platz abends selbst weiter nutzen will, braucht einen anderen Raum oder eine Haltungslösung, in der die Vögel trotzdem ungestört schlafen können.",
    wikiPath: "/voegel/ruhe-schlaf/",
    sourceRef: "https://wahre-haustierliebe.de/voegel/ruhe-schlaf/"
  },
  {
    id: "fall-voegel-dick-101",
    mode: "fall",
    interaktion: "vierKarten",
    sticker: ["napf","welli"],
    category: "voegel",
    difficulty: "mittel",
    text: "Dein Wellensittich ist zu dick geworden. Was tust du?",
    options: [
      "Du halbierst ab morgen einfach die tägliche Körnerportion",
      "Du klärst mit einer vogelkundigen Praxis die Futterumstellung",
      "Du gibst ab sofort nur noch Frischfutter, bis das Gewicht stimmt",
      "Du gibst die gewohnte Futtermenge nur noch jeden zweiten Tag"
    ],
    correctIndex: 1,
    explanation: "Eine abrupte Diät ist gefährlich. Übergewicht, Gewichtsverlust oder eine größere Futterumstellung gehören in vogelkundige Hände.",
    wikiPath: "/voegel/ernaehrung/",
    sourceRef: "https://wahre-haustierliebe.de/voegel/ernaehrung/"
  },
  {
    id: "fall-voegel-eier-101",
    mode: "fall",
    interaktion: "vierKarten",
    sticker: ["welli","kaefig"],
    category: "voegel",
    difficulty: "mittel",
    text: "Deine Wellensittichhenne hat Eier gelegt. Was tust du?",
    options: [
      "Du bietest einen Nistkasten an, damit sie zur Ruhe kommt",
      "Du stimmst das Vorgehen mit einer vogelkundigen Praxis ab",
      "Du entfernst die Eier sofort und fragst nicht weiter nach",
      "Du lässt sie brüten, denn ein bisschen Nachwuchs ist schön"
    ],
    correctIndex: 1,
    explanation: "Eier sollten weder planlos entfernt noch ausgebrütet werden. Wiederholte Eiablage gehört vogelkundig abgeklärt, statt sie mit Internettricks zu behandeln.",
    wikiPath: "/voegel/zucht-eier/",
    sourceRef: "https://wahre-haustierliebe.de/voegel/zucht-eier/"
  },
  {
    id: "fall-voegel-neu-101",
    mode: "fall",
    interaktion: "vierKarten",
    sticker: ["welli","piepmatz"],
    category: "voegel",
    difficulty: "mittel",
    text: "Ein neuer Wellensittich soll zu deinem Schwarm ziehen. Was tust du zuerst?",
    options: [
      "Du setzt ihn sofort dazu, damit alle sich aneinander gewöhnen",
      "Du hältst ihn erst allein, bis er sich an dich gewöhnt hat",
      "Du lässt ihn vor dem Kontakt mit dem Bestand untersuchen",
      "Du beobachtest ihn nur und holst bei Auffälligkeiten Hilfe"
    ],
    correctIndex: 2,
    explanation: "Neue Vögel sollten untersucht werden, bevor sie mit dem Bestand in Kontakt kommen. Eine vogelkundige Praxis, ihre Erreichbarkeit und eine sichere Transportbox gehören schon vor einem Notfall zur Planung.",
    wikiPath: "/voegel/krankheit-erkennen/",
    sourceRef: "https://wahre-haustierliebe.de/voegel/krankheit-erkennen/"
  },
  {
    id: "voegel-zucht-anbieter-102",
    mode: "fall",
    interaktion: "vierKarten",
    sticker: ["welli","piepmatz"],
    category: "voegel",
    difficulty: "mittel",
    text: "Ein Vogelanbieter spricht nur über Wunschfarbe und Preis, nicht über Alter oder Herkunft. Wie bewertest du das?",
    options: [
      "Du wertest die Farbauswahl als Nachweis guter Zuchtbedingungen",
      "Du wertest die schnelle Abgabe als Zeichen gut vorbereiteter Tiere",
      "Du wertest fehlende Tierdaten als Schutz der Züchterprivatsphäre",
      "Du wertest fehlende Tierdaten als Warnsignal und fragst nach"
    ],
    correctIndex: 3,
    explanation: "Unklare Herkunft und eine Abgabe nach Farbe oder Niedlichkeit sind Warnzeichen. Seriöse Züchter kennen Alter, Gesundheit und Abstammung ihrer Tiere und beraten.",
    wikiPath: "/zucht-und-vermehrung/",
    sourceRef: "https://wahre-haustierliebe.de/zucht-und-vermehrung/"
  },
  {
    id: "exoten-schildkroeten-103",
    mode: "fall",
    interaktion: "vierKarten",
    sticker: ["blatt","sonne"],
    category: "exoten",
    difficulty: "mittel",
    text: "Du sollst eine griechische Landschildkröte ohne Artenschutzpapiere kaufen. Was tust du?",
    options: [
      "Kaufen, wenn du eine Quittung mit Namen und Preis bekommst",
      "Kaufen, wenn du die Meldung nach dem Einzug selbst übernimmst",
      "Kaufen, wenn der Händler die legale Herkunft mündlich zusagt",
      "Nicht kaufen, solange die gültigen Artenschutzpapiere fehlen"
    ],
    correctIndex: 3,
    explanation: "Die meisten Landschildkrötenarten sind geschützt und meldepflichtig. Kaufe deshalb nur mit gültigen Papieren.",
    wikiPath: "/exoten/schildkroeten/",
    sourceRef: "https://wahre-haustierliebe.de/exoten/schildkroeten/"
  },
  {
    id: "exoten-fische-101",
    mode: "fall",
    interaktion: "vierKarten",
    sticker: ["flosse","napf"],
    category: "exoten",
    difficulty: "mittel",
    text: "Du kaufst ein Aquarium und willst sofort Fische einsetzen. Wie lange soll es vorher einlaufen?",
    options: [
      "Einen Tag einlaufen lassen, dann die Fische einsetzen",
      "Zwei Wochen einlaufen lassen, dann die Fische einsetzen",
      "4–6 Wochen einlaufen lassen, dann die Fische einsetzen",
      "Eine Woche einlaufen lassen, dann die Fische einsetzen"
    ],
    correctIndex: 2,
    explanation: "Ein Aquarium braucht 4–6 Wochen Einlaufphase vor dem Einsetzen der ersten Fische. Ein Kauf von Aquarium und Fischen am selben Tag kann zu Massensterben führen.",
    wikiPath: "/exoten/fische/",
    sourceRef: "https://wahre-haustierliebe.de/exoten/fische/"
  },
  {
    id: "pferde-entscheidung-102",
    mode: "fall",
    interaktion: "vierKarten",
    sticker: ["napf","sonne"],
    category: "pferde",
    difficulty: "mittel",
    text: "Du bist krank oder verreist. Wie muss die Versorgung deines Pferdes organisiert sein?",
    options: [
      "Nur jeden zweiten Tag versorgen, wenn es auf die Weide kann",
      "Nur abends versorgen, wenn du gerade krank zu Hause bist",
      "Einige Tage aussetzen, wenn im Offenstall genug Futter liegt",
      "Täglich versorgen, auch bei Krankheit und im Urlaub"
    ],
    correctIndex: 3,
    explanation: "Dein Pferd braucht tägliche Versorgung an 365 Tagen im Jahr, auch bei Krankheit, Urlaub und schlechtem Wetter. Diese Versorgung muss also auch während deiner Abwesenheit gesichert sein.",
    wikiPath: "/pferde/entscheidung/",
    sourceRef: "https://wahre-haustierliebe.de/pferde/entscheidung/"
  },
  {
    id: "tierschutz-notfall-102",
    mode: "fall",
    interaktion: "vierKarten",
    sticker: ["pfote","sonne"],
    category: "tierschutz",
    difficulty: "mittel",
    text: "Dein Tier bekommt plötzlich einen Krampfanfall. Was tust du zuerst?",
    options: [
      "Du rufst die Praxis an, sicherst die Umgebung und merkst dir die Dauer",
      "Du öffnest vorsichtig das Maul und hältst die Zunge mit den Fingern frei",
      "Du duschst das Tier mit kaltem Wasser ab und wartest, bis es aufwacht",
      "Du hältst das Tier fest im Arm und bietest ihm zur Beruhigung Wasser an"
    ],
    correctIndex: 0,
    explanation: "Bei Krämpfen rufst du sofort die Tierarztpraxis oder Tierklinik an. Sichere die Umgebung, merke dir die Dauer und stecke nichts ins Maul.",
    wikiPath: "/notfall/",
    sourceRef: "https://wahre-haustierliebe.de/notfall/"
  },
  {
    id: "tierschutz-notfallplan-102",
    mode: "fall",
    interaktion: "vierKarten",
    sticker: ["halsband","napf"],
    category: "tierschutz",
    difficulty: "mittel",
    text: "Du schreibst eine Notfallkarte fürs Portemonnaie. Was gehört darauf?",
    options: [
      "Die Krankheiten deiner Tiere und ein Hinweis auf den Schlüsselort",
      "Den Zugangscode der Wohnung und die Namen der Tiere",
      "Den Medikamentenplan und die Adresse der Tierarztpraxis",
      "Anzahl und Art der Tiere, deine Adresse und zwei Kontaktpersonen"
    ],
    correctIndex: 3,
    explanation: "Die Karte soll Helfer nur darauf aufmerksam machen, dass zu Hause Tiere warten. Medizinische Details, Zugangscodes und Schlüsselverstecke gehören nicht darauf.",
    wikiPath: "/notfallplan-haustier/",
    sourceRef: "https://wahre-haustierliebe.de/notfallplan-haustier/"
  },
  {
    id: "tierschutz-chip-registrieren-105",
    mode: "fall",
    interaktion: "vierKarten",
    sticker: ["pfote"],
    category: "tierschutz",
    difficulty: "mittel",
    text: "Dein Tier ist frisch gechippt. Wie wird die Nummer in einem Haustierregister mit deinen Daten verknüpft?",
    options: [
      "Chipnummer und Halterdaten im Impfpass nachtragen lassen",
      "Chipnummer und Halterdaten beim Haustierregister eintragen",
      "Chipnummer und Halterdaten in der Praxisakte ergänzen lassen",
      "Chipnummer und Halterdaten auf einer Halsbandmarke notieren"
    ],
    correctIndex: 1,
    explanation: "Der Mikrochip trägt eine eindeutige Nummer. Erst die Registrierung mit Halterdaten in einem Haustierregister macht diese Nummer für die Rückvermittlung wirklich nutzbar.",
    wikiPath: "/glossar/",
    sourceRef: "https://wahre-haustierliebe.de/glossar/"
  },
  {
    id: "tierschutz-vermittlung-angaben-115",
    mode: "fall",
    interaktion: "vierKarten",
    sticker: ["pfote","napf"],
    category: "tierschutz",
    difficulty: "mittel",
    text: "Du brauchst Hilfe bei der Vermittlung deines Tieres. Wie beschreibst du es?",
    options: [
      "Alter und Rasse angeben, Erkrankungen bis zur Zusage aussparen",
      "Futter und Zubehör angeben, Ängste erst nach der Abgabe erklären",
      "Alter, Krankheiten, Medikamente, Verhalten und Bedürfnisse angeben",
      "Herkunft und Impfungen angeben, Medikamente erst nachträglich ergänzen"
    ],
    correctIndex: 2,
    explanation: "Eine sichere Vermittlung braucht ehrliche Angaben zu Alter, Herkunft, Krankheiten, Medikamenten, Ängsten, Verhalten und Bedürfnissen. Ein Tierheim oder eine seriöse Tierschutzorganisation kann damit passende Hilfe oder Vermittlung klären.",
    wikiPath: "/mensch/",
    sourceRef: "https://wahre-haustierliebe.de/mensch/"
  }
];
