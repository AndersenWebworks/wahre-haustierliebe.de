// data/questions.js - kanonische Fragenquelle der WHL-PWA
// Drei Modi: klassisch, mythen, fall. Jede Frage trägt optional
// `interaktion` (vierKarten | jaNein) und `sticker` (Fall-Sticker).
// Bei interaktion "jaNein" wird `correctJaNein` statt correctIndex ausgewertet.

export const version = "2026-09-23.1";

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

export const questions = [
  // ============ KLASSISCH (15 Fragen) ============
  {
    id: "hunde-allein-001",
    mode: "klassisch",
    interaktion: "vierKarten",
    category: "hunde",
    difficulty: "leicht",
    text: "Drei Bürotage pro Woche dauern jeweils acht Stunden. Welche Lösung ist für einen erwachsenen Hund wirklich tragfähig?",
    options: [
      "Eine verlässliche Betreuung oder Zwischenrunde unterbricht den Tag, damit er nicht regelmäßig lange allein bleibt",
      "Eine lange Morgenrunde gleicht einen ganzen Arbeitstag allein vollständig aus",
      "Im Garten zählt die Zeit nicht als Alleinsein",
      "Nach ein paar Wochen gewöhnt sich jeder Hund an acht Stunden"
    ],
    correctIndex: 0,
    explanation: "Hunde sind soziale Lebewesen. Für die meisten erwachsenen Hunde sind etwa vier Stunden allein bereits die obere Grenze. Ein normaler Arbeitstag braucht deshalb eine passende Betreuungslösung.",
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
      "Vor allem ein höherer Zaun",
      "Abwechslung draußen, gemeinsame Zeit und die Möglichkeit, Umwelt und Gerüche wahrzunehmen",
      "Nichts, denn Fläche ersetzt Spaziergänge",
      "Ein zweiter Futternapf im Garten"
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
    difficulty: "leicht",
    text: "Ein Hofhund hat Futter, täglichen Auslauf und einen großen Zwinger. Warum kann die Haltung dennoch scheitern?",
    options: [
      "Weil Hunde nur in Wohnungen leben dürfen",
      "Weil ein Hund grundsätzlich keinen Auslauf braucht",
      "Weil Größe und Versorgung die dauerhafte soziale Isolation von seiner Familie nicht ersetzen",
      "Weil ein Zwinger nie für kurze Ruhephasen genutzt werden darf"
    ],
    correctIndex: 2,
    explanation: "Hunde leben in sozialen Beziehungen. Versorgung ist wichtig, aber sie ersetzt weder Zugehörigkeit noch regelmäßigen Kontakt zur Bezugsperson.",
    wikiPath: "/hunde/hofhaltung-und-zwinger/",
    sourceRef: "https://wahre-haustierliebe.de/hunde/hofhaltung-und-zwinger/"
  },
  {
    id: "hunde-sozial-001",
    mode: "klassisch",
    interaktion: "vierKarten",
    category: "hunde",
    difficulty: "leicht",
    text: "Welcher Alltag gibt einem Hund am ehesten Sicherheit, ohne ihn zu langweilen?",
    options: [
      "Verlässliche Rituale mit gemeinsamer Zeit, ergänzt durch passende Bewegung, neue Gerüche und Ruhe",
      "Jeden Tag exakt dieselbe Runde ohne Ansprache",
      "Möglichst viele wechselnde Menschen und Orte ohne feste Abläufe",
      "Futter zur gleichen Uhrzeit, alles andere ist nebensächlich"
    ],
    correctIndex: 0,
    explanation: "Hunde profitieren von Verlässlichkeit, aber auch von sinnvoller Abwechslung. Bindung, Ruhe, Bewegung und neue Eindrücke gehören zusammen.",
    wikiPath: "/hunde/soziale-beduerfnisse/",
    sourceRef: "https://wahre-haustierliebe.de/hunde/soziale-beduerfnisse/"
  },
  {
    id: "katzen-wohnung-001",
    mode: "klassisch",
    interaktion: "vierKarten",
    category: "katzen",
    difficulty: "leicht",
    text: "Eine Katze lebt nur in der Wohnung. Welche Veränderung verbessert ihr Revier am deutlichsten?",
    options: [
      "Ein größerer Futternapf",
      "Dauerhaft laufendes Fernsehen als Gesellschaft",
      "Mehr vertikale Wege, Rückzugsorte, Kratzmöglichkeiten und abwechslungsreiche Beschäftigung",
      "Das Katzenklo direkt neben dem Futterplatz"
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
      "Dass sie nie wieder ihr Revier verlässt",
      "Unkontrollierten Nachwuchs und damit weiteren Druck auf Katzenpopulationen",
      "Dass sie keine tierärztliche Versorgung mehr braucht",
      "Dass sie automatisch zur Wohnungskatze wird"
    ],
    correctIndex: 1,
    explanation: "Kastration verhindert unkontrollierte Vermehrung und ist ein zentraler Beitrag gegen weiteres Katzenleid durch ungewollten Nachwuchs.",
    wikiPath: "/katzen/kastration/",
    sourceRef: "https://wahre-haustierliebe.de/katzen/kastration/"
  },
  {
    id: "katzen-sozial-001",
    mode: "klassisch",
    interaktion: "vierKarten",
    category: "katzen",
    difficulty: "leicht",
    text: "Zwei Wohnungskatzen geraten plötzlich häufiger aneinander. Welche Anpassung kann Revierdruck sinnvoll senken?",
    options: [
      "Mehr getrennte Ruhe-, Kratz-, Futter- und Höhenplätze, damit Ausweichen möglich wird",
      "Ein gemeinsamer Lieblingsplatz, damit sie sich aneinander gewöhnen",
      "Das Katzenklo entfernen, damit mehr Platz entsteht",
      "Die Katzen tagsüber grundsätzlich getrennt einsperren"
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
    difficulty: "leicht",
    text: "Du findest ein Jungtier allein im hohen Gras. Es wirkt ruhig und unverletzt. Was ist der beste erste Schritt?",
    options: [
      "Sofort mitnehmen, damit es nicht friert",
      "Aus Abstand beobachten, nicht berühren und bei Zweifel Wildtierhilfe oder Fachleute kontaktieren",
      "Mit Kuhmilch füttern und dann abwarten",
      "Für ein Foto hochheben und danach zurücksetzen"
    ],
    correctIndex: 1,
    explanation: "Jungtiere sind häufig nicht verlassen, auch wenn die Mutter gerade nicht sichtbar ist. Beobachten statt vorschnell eingreifen schützt sie oft am besten.",
    wikiPath: "/katzen/wildkatzenbaby-gefunden/",
    sourceRef: "https://wahre-haustierliebe.de/katzen/wildkatzenbaby-gefunden/"
  },
  {
    id: "kleintiere-hamster-001",
    mode: "klassisch",
    interaktion: "vierKarten",
    category: "kleintiere",
    difficulty: "leicht",
    text: "Ein Goldhamster hat ein großes Laufrad, aber nur einen üblichen Zoohandelskäfig. Was fehlt am deutlichsten?",
    options: [
      "Ein zweites Laufrad",
      "Ein Artgenosse als Beschäftigung",
      "Zusammenhängende Grundfläche von mindestens einem Quadratmeter mit tiefer Einstreu und Struktur",
      "Ein heller Standort direkt am Fenster"
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
      "Weil sie in einem großen Gehege einander nicht wiedererkennen",
      "Weil Goldhamster territoriale Einzelgänger sind und Konflikte oft erst später eskalieren",
      "Weil Goldhamster nur mit Kaninchen zusammenleben dürfen",
      "Weil sie nachts grundsätzlich schlafen"
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
      "Ein größerer Futternapf",
      "Der tägliche Kontakt zu passenden Artgenossen mit eigener Kommunikation und Nähe",
      "Ein Spiegel als Ersatz für ein anderes Meerschweinchen",
      "Vor allem ein leiser Fernseher"
    ],
    correctIndex: 1,
    explanation: "Meerschweinchen sind soziale Gruppentiere. Menschen können Zuwendung geben, aber keinen Artgenossen ersetzen.",
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
      "Er braucht zu viel Wasser",
      "Er ist tagsüber oft in seiner Ruhephase und kann durch Wecken und Anfassen stark gestresst werden",
      "Er darf nie beobachtet werden",
      "Er ist nur im Sommer aktiv"
    ],
    correctIndex: 1,
    explanation: "Goldhamster sind nachtaktiv und brauchen tagsüber Ruhe. Sie sind keine Spielgefährten für Kinderhände.",
    wikiPath: "/kleintiere/hamster/",
    sourceRef: "https://wahre-haustierliebe.de/kleintiere/hamster/"
  },
  {
    id: "voegel-kueche-001",
    mode: "klassisch",
    interaktion: "vierKarten",
    category: "voegel",
    difficulty: "leicht",
    text: "Ein Vogelkäfig steht im offenen Wohnbereich neben der Küche. Welche unsichtbare Gefahr wird leicht unterschätzt?",
    options: [
      "Das Geräusch der Spülmaschine",
      "Dämpfe von antihaftbeschichtetem Kochgeschirr, Rauch und starke Kochdünste können lebensgefährlich sein",
      "Dass Vögel den Geruch von Brot nicht mögen",
      "Dass die Küche immer zu hell ist"
    ],
    correctIndex: 1,
    explanation: "Vögel reagieren sehr empfindlich auf belastete Luft. Dämpfe von antihaftbeschichtetem Kochgeschirr können für sie tödlich sein.",
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
      "Ja, wenn täglich mehrere Stunden gesprochen wird",
      "Nein, menschliche Zuwendung ersetzt keinen Artgenossen und keine Schwarmkommunikation",
      "Ja, wenn ein Spiegel im Käfig hängt",
      "Nur dann nicht, wenn der Vogel fliegen darf"
    ],
    correctIndex: 1,
    explanation: "Wellensittiche sind Schwarmtiere. Ein Mensch kann Nähe geben, aber keinen passenden Artgenossen ersetzen.",
    wikiPath: "/voegel/schwarmhaltung/",
    sourceRef: "https://wahre-haustierliebe.de/voegel/schwarmhaltung/"
  },
  {
    id: "voegel-uv-001",
    mode: "klassisch",
    interaktion: "vierKarten",
    category: "voegel",
    difficulty: "leicht",
    text: "Warum ist ein heller Platz hinter einer Fensterscheibe für Vögel kein vollständiger Ersatz für geeignetes UV-Licht?",
    options: [
      "Weil Glas für Vögel grundsätzlich unsichtbar ist",
      "Weil Fensterscheiben einen großen Teil des UV-Anteils filtern, den Vögel für Wahrnehmung und Vitamin-D-Stoffwechsel nutzen",
      "Weil Tageslicht nur im Winter zu schwach ist",
      "Weil Vögel ausschließlich künstliches Licht brauchen"
    ],
    correctIndex: 1,
    explanation: "Fensterglas lässt Licht herein, filtert aber einen großen Teil des UV-Anteils. Vögel nehmen ihre Umwelt anders wahr als wir und brauchen passende Bedingungen.",
    wikiPath: "/voegel/uv-licht/",
    sourceRef: "https://wahre-haustierliebe.de/voegel/uv-licht/"
  },

  // ============ MYTHEN-CHECK (9 Fragen: 6 bestehend + 3 neue) ============
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
      "Stimmt nicht. Die meisten erwachsenen Katzen vertragen Milchzucker nicht und reagieren mit Verdauungsproblemen.",
      "Stimmt, aber nur wenn es laktosefreie Spezialmilch ist.",
      "Stimmt, solange die Milch Zimmertemperatur hat."
    ],
    correctIndex: 1,
    explanation: "Erwachsene Katzen verlieren meist das Enzym Laktase. Frisches Wasser ist das passende Getränk. Wer Leckerli will, findet katzenfreundliche Alternativen.",
    wikiPath: "/katzen/ernaehrung-milch/",
    sourceRef: "https://www.tieraerzteverband.de/"
  },
  {
    id: "mythen-hunde-farben-001",
    mode: "mythen",
    interaktion: "jaNein",
    correctJaNein: false,
    category: "hunde",
    difficulty: "leicht",
    text: "Stimmt das? „Hunde sehen ihre Umwelt nur in Schwarz-Weiß.\"",
    options: [
      "Stimmt. Hundeaugen haben keine Farbrezeptoren.",
      "Stimmt nicht. Hunde sehen Farben, aber im blau-gelb-Bereich weniger differenziert als Menschen.",
      "Stimmt, aber nur nachts.",
      "Stimmt, solange die Hunderasse klein ist."
    ],
    correctIndex: 1,
    explanation: "Hunde haben zwei funktionierende Zapfentypen für blau-gelbe Bereiche. Rot und Grün unterscheiden sie schlechter, komplett farblos sehen sie aber nicht.",
    wikiPath: "/hunde/sinneswahrnehmung/",
    sourceRef: "https://www.tieraerzteverband.de/"
  },
  {
    id: "mythen-wellensittich-einzeln-001",
    mode: "mythen",
    interaktion: "jaNein",
    correctJaNein: false,
    category: "voegel",
    difficulty: "leicht",
    text: "Stimmt das? „Ein Wellensittich allein mit viel Zuwendung ist ein glücklicher Anfängervogel.\"",
    options: [
      "Stimmt. Mit täglichem Freiflug und Ansprache ist er versorgt.",
      "Stimmt nicht. Wellensittiche sind Schwarmvögel; ein Einzeltier leidet auch bei liebevoller Pflege dauerhaft.",
      "Stimmt, solange er sprechen kann.",
      "Stimmt, solange ein Spiegel im Käfig hängt."
    ],
    correctIndex: 1,
    explanation: "Ein Spiegel ist kein Artgenosse. Wellensittiche brauchen mindestens einen passenden Partner, um arteigenes Verhalten zeigen zu können.",
    wikiPath: "/voegel/schwarmhaltung/",
    sourceRef: "https://wahre-haustierliebe.de/voegel/schwarmhaltung/"
  },
  {
    id: "mythen-hamster-partner-001",
    mode: "mythen",
    interaktion: "jaNein",
    correctJaNein: false,
    category: "kleintiere",
    difficulty: "leicht",
    text: "Stimmt das? „Goldhamster fühlen sich mit einem Artgenossen wohler und sind dann aktiver.\"",
    options: [
      "Stimmt. Hamster sind sehr gesellig.",
      "Stimmt nicht. Goldhamster sind territoriale Einzelgänger und können sich gegenseitig schwer verletzen.",
      "Stimmt, aber nur bei jungen Tieren.",
      "Stimmt, solange das Gehege groß genug ist."
    ],
    correctIndex: 1,
    explanation: "Auch ein zweites Hamsterleben nebeneinander ist Stress. Die Verletzungsgefahr steigt mit zunehmendem Alter deutlich an.",
    wikiPath: "/kleintiere/hamster/",
    sourceRef: "https://wahre-haustierliebe.de/kleintiere/hamster/"
  },
  {
    id: "mythen-hund-wedelt-001",
    mode: "mythen",
    interaktion: "jaNein",
    correctJaNein: false,
    category: "hunde",
    difficulty: "leicht",
    text: "Stimmt das? „Wenn ein Hund mit dem Schwanz wedelt, signalisiert er immer Freundlichkeit.\"",
    options: [
      "Stimmt. Wedeln heißt: alles gut.",
      "Stimmt nicht. Wedeln zeigt Erregung – die kann freudig, aber auch unsicher, gestresst oder drohend sein.",
      "Stimmt, aber nur bei großen Hunden.",
      "Stimmt, solange die Rute hoch getragen wird."
    ],
    correctIndex: 1,
    explanation: "Erregung heißt nicht automatisch Freude. Körperhaltung, Rutenhöhe, Muskelspannung und Gesichtsausdruck gehören zur ganzen Lesart dazu.",
    wikiPath: "/hunde/koerpersprache/",
    sourceRef: "https://www.tieraerzteverband.de/"
  },
  {
    id: "mythen-reptil-uv-001",
    mode: "mythen",
    interaktion: "jaNein",
    correctJaNein: false,
    category: "kleintiere",
    difficulty: "leicht",
    text: "Stimmt das? „Reptilien kommen in der Wohnung mit Wärmelampe und Tageslicht gut zurecht.\"",
    options: [
      "Stimmt. Wärme reicht für die meisten Arten.",
      "Stimmt nicht. Viele Reptilien brauchen UV-B-Licht für den Vitamin-D-Stoffwechsel; Fensterglas filtert diesen Anteil heraus.",
      "Stimmt, solange es eine Heizmatte gibt.",
      "Stimmt, wenn das Terrarium nah am Fenster steht."
    ],
    correctIndex: 1,
    explanation: "Fenster lassen sichtbares Licht, aber kaum UV-B durch. Für viele Reptilien ist eine artgerechte UV-B-Quelle entscheidend.",
    wikiPath: "/kleintiere/reptilien-uv-licht/",
    sourceRef: "https://www.tieraerzteverband.de/"
  },
  {
    id: "mythen-welli-sprache-001",
    mode: "mythen",
    interaktion: "jaNein",
    correctJaNein: true,
    category: "voegel",
    difficulty: "leicht",
    text: "Stimmt das? „Wellensittiche können eine kleine Auswahl an Wörtern und Pfeiftönen erlernen und bei ihren Menschen einsetzen.\"",
    options: [
      "Stimmt. Vor allem junge Hähne lernen oft mehrere Wörter und Melodien.",
      "Stimmt nicht. Wellensittiche sind reine Schwarmvögel ohne Stimmkontrolle.",
      "Stimmt, aber nur mit Video-Training.",
      "Stimmt, aber nur einzeln gehalten."
    ],
    correctIndex: 0,
    explanation: "Wellensittiche sind ausgesprochen sprachbegabt. Gerade Hähne imitieren Wörter, Pfeiftöne und kurze Melodien mit erstaunlicher Treue.",
    wikiPath: "/voegel/wellensittich-sprache/",
    sourceRef: "https://wahre-haustierliebe.de/voegel/sprache-wellensittich/"
  },
  {
    id: "mythen-meeri-heu-001",
    mode: "mythen",
    interaktion: "jaNein",
    correctJaNein: true,
    category: "kleintiere",
    difficulty: "leicht",
    text: "Stimmt das? „Frisches Heu ist für Meerschweinchen das Hauptfutter und sollte immer erreichbar sein.\"",
    options: [
      "Stimmt. Heu deckt den Bedarf an Rohfaser und ist als Dauerangebot unverzichtbar.",
      "Stimmt nicht. Heu ist nur ein Zusatz, Gemüse reicht völlig.",
      "Stimmt, aber nur im Winter.",
      "Stimmt, solange es aus dem Zoogeschäft kommt."
    ],
    correctIndex: 0,
    explanation: "Heu ist für Meerschweinchen das eigentliche Grundnahrungsmittel. Es hält den Verdauungstrakt in Bewegung und sorgt für passenden Zahnabrieb.",
    wikiPath: "/kleintiere/meerschweinchen-ernaehrung/",
    sourceRef: "https://wahre-haustierliebe.de/kleintiere/meerschweinchen/"
  },
  {
    id: "mythen-hund-garten-001",
    mode: "mythen",
    interaktion: "jaNein",
    correctJaNein: true,
    category: "hunde",
    difficulty: "leicht",
    text: "Stimmt das? „Ein eingezäunter Garten gleicht den täglichen Spaziergang vollständig aus.\"",
    options: [
      "Stimmt. Der Garten reicht völlig, wenn er groß genug ist.",
      "Stimmt nicht. Spaziergänge bringen neue Gerüche, Begegnungen und Bewegung, die ein Garten allein nicht bieten kann.",
      "Stimmt, solange der Hund stubenrein ist.",
      "Stimmt, solange kein Schnee liegt."
    ],
    correctIndex: 1,
    explanation: "Der Garten ist ein schöner Rückzugsort, aber kein Ersatz für gemeinsame Spaziergänge. Gerüche, Begegnungen und Wege außerhalb des eigenen Grundstücks bleiben wichtig.",
    wikiPath: "/hunde/garten-auslauf/",
    sourceRef: "https://wahre-haustierliebe.de/hunde/garten-auslauf/"
  },

  // ============ FALL-ENTSCHEIDUNG (6 Fragen) ============
  {
    id: "fall-fundtier-garten-001",
    mode: "fall",
    interaktion: "vierKarten",
    sticker: ["katze"],
    category: "katzen",
    difficulty: "leicht",
    text: "Im Garten sitzt ein Jungtier, das scheinbar hilflos wirkt. Die Mutter ist nirgends zu sehen. Was tust du zuerst?",
    options: [
      "Schnell ins Haus holen und mit Kuhmilch versorgen.",
      "Aus Abstand beobachten, das Muttertier suchen und nur bei klarer Notlage eine Wildtierhilfe kontaktieren.",
      "Ein Handtuch darüberlegen und warten, bis die Mutter zurückkommt.",
      "Den Tierarzt des Vertrauens anrufen und das Tier dorthin bringen."
    ],
    correctIndex: 1,
    explanation: "Mütter verstecken sich oft in der Nähe. Voreiliges Eingreifen kann die Rückkehr verhindern. Bei Unsicherheit eine regionale Wildtierhilfe anrufen.",
    wikiPath: "/katzen/wildkatzenbaby-gefunden/",
    sourceRef: "https://wahre-haustierliebe.de/katzen/wildkatzenbaby-gefunden/"
  },
  {
    id: "fall-hund-knurrt-besuch-001",
    mode: "fall",
    interaktion: "vierKarten",
    sticker: ["hund", "halsband"],
    category: "hunde",
    difficulty: "leicht",
    text: "Dein Hund knurrt Besucher an der Haustür an und du hast Gäste eingeladen. Was tust du jetzt?",
    options: [
      "Den Hund sofort anschreien, damit er gehorcht.",
      "Hund räumlich trennen, mit Decke oder Box, Gäste begrüßen und das Verhalten später mit einer Fachperson einordnen.",
      "Hund an der Leine festhalten und Gäste hereinlassen.",
      "Gäste wieder ausladen, weil das Training heute nicht passt."
    ],
    correctIndex: 1,
    explanation: "Knurren ist eine klare Mitteilung. Sie ernst nehmen, Situation managen und mit einer Hundeschule oder Verhaltensberatung an der Ursache arbeiten.",
    wikiPath: "/hunde/aggression-besuch/",
    sourceRef: "https://wahre-haustierliebe.de/hunde/"
  },
  {
    id: "fall-kind-kaninchen-001",
    mode: "fall",
    interaktion: "vierKarten",
    sticker: ["meeri", "fenster"],
    category: "kleintiere",
    difficulty: "leicht",
    text: "Ein siebenjähriges Kind wünscht sich sehnlich ein Kaninchen zum Kuscheln und Spielen. Was tust du als Elternteil?",
    options: [
      "Ein Kaninchen aus dem Zoogeschäft kaufen und zu Weihnachten überraschen.",
      "Erst gemeinsam die Bedürfnisse eines Kaninchens durchgehen, Zeit und Platz prüfen und gegebenenfalls mit einer Patenschaft im Tierheim starten.",
      "Zwei Kaninchen holen, damit sie sich gegenseitig haben.",
      "Ein Zwergkaninchen holen, weil das angeblich pflegeleichter ist."
    ],
    correctIndex: 1,
    explanation: "Kaninchen sind keine Kuscheltiere. Sie brauchen Platz, Rückzug, einen Partner und tägliche Versorgung über viele Jahre. Ein Tierheim-Pate-Tag klärt die Erwartungen.",
    wikiPath: "/kleintiere/kaninchen-fuer-kinder/",
    sourceRef: "https://wahre-haustierliebe.de/kleintiere/"
  },
  {
    id: "fall-katze-ungesund-001",
    mode: "fall",
    interaktion: "vierKarten",
    sticker: ["katze", "fenster"],
    category: "katzen",
    difficulty: "leicht",
    text: "Deine Wohnungskatze pinkelt seit wenigen Tagen wiederholt neben das Katzenklo. Was tust du?",
    options: [
      "Die Katze für die Unsauberkeit maßregeln, damit sie es wieder richtig macht.",
      "Tierärztliche Abklärung organisieren und parallel die Toiletten-Situation prüfen – Anzahl, Standort, Sauberkeit, Stressoren.",
      "Das Katzenklo einfach öfter putzen und abwarten.",
      "Einen Duftstein in die Ecke stellen, damit die Katze nicht mehr hinläuft."
    ],
    correctIndex: 1,
    explanation: "Unsauberkeit ist fast immer ein Signal – gesundheitlich, sozial oder durch Revierstress. Tierärztliche Abklärung steht am Anfang, saubere Ressourcen ergänzen das Bild.",
    wikiPath: "/katzen/ungesund-verhalten/",
    sourceRef: "https://wahre-haustierliebe.de/katzen/"
  },
  {
    id: "fall-hund-urlaub-001",
    mode: "fall",
    interaktion: "vierKarten",
    sticker: ["hund", "halsband"],
    category: "hunde",
    difficulty: "leicht",
    text: "Der Sommerurlaub steht vor der Tür. Eine passende Hundebetreuung im Haushalt wäre ideal, ist aber ausgebucht. Was tust du?",
    options: [
      "Den Hund spontan mit ins Auto nehmen und die Tageinfach am Strand verbringen.",
      "Frühzeitig eine seriöse Pension mit Vor- und Nachbesuch organisieren, oder den Hund zuhause von vertrauten Personen versorgen lassen.",
      "Den Hund allein in der Wohnung mit Futtervorrat für eine Woche lassen.",
      "Den Hund im Garten anbinden und regelmäßig füttern."
    ],
    correctIndex: 1,
    explanation: "Hunde brauchen auch im Urlaub verlässliche Bezugspersonen, gewohnte Rhythmen und keine langen Alleinzeiten. Vorausplanen ist alles.",
    wikiPath: "/hunde/urlaub/",
    sourceRef: "https://wahre-haustierliebe.de/hunde/"
  },
  {
    id: "fall-spontankauf-zoo-001",
    mode: "fall",
    interaktion: "vierKarten",
    sticker: ["meeri", "napf"],
    category: "kleintiere",
    difficulty: "leicht",
    text: "Im Zoofachgeschäft sitzen auffallend süße Jungtiere, das Preis Schild ist günstig und du überlegst spontan zuzuschlagen. Was tust du?",
    options: [
      "Zugreifen, solange die Tiere da sind.",
      "Nicht zuschlagen und erst zu Hause in Ruhe prüfen, ob die Haltung dauerhaft tragfähig ist.",
      "Die Jungtiere als Überraschung für die Kinder mitnehmen.",
      "Drei Tiere mitnehmen, damit sie sich nicht allein fühlen."
    ],
    correctIndex: 1,
    explanation: "Spontankäufe sind die häufigste Quelle für späteres Tierleid. Eine bewusste Entscheidung nach Kosten, Zeit, Platz und Lebensdauer verhindert viel Schaden.",
    wikiPath: "/kleintiere/spontankauf/",
    sourceRef: "https://wahre-haustierliebe.de/kleintiere/"
  }
];
