// data/resultateTexte.js – persönliche Ergebnis-Texte pro Modus und Score-Stufe
// Drei Bänder: niedrig (0-40 %), mittel (41-75 %), hoch (76-100 %).
// Keine Standardliste, jeder Text eine kleine echte Aussage.

export const STAGE_LABELS = {
  niedrig: "niedrig",
  mittel: "mittel",
  hoch: "hoch"
};

const TEXTE = {
  klassisch: {
    hoch: [
      "Sehr warm. Du hast ein echtes Gespür für das, was Tiere wirklich brauchen.",
      "Stark. Das Wissen sitzt – und du weißt es auch zu formulieren.",
      "Beeindruckend. Du kennst dich aus und spürst die Verantwortung dahinter."
    ],
    mittel: [
      "Eine runde Sache. Was du noch nicht wusstest, findest du oben in den Wiki-Links.",
      "Gut gemacht. Eine oder zwei Lücken – das Wiki füllt sie dir in zwei Minuten.",
      "Solide Basis. Die Artikel zu deinen Fragen lohnen sich heute besonders."
    ],
    niedrig: [
      "Ein warmer Anfang. Schau dir die Artikel zu deinen Fragen direkt oben in Ruhe an.",
      "Gut gestartet. Die Auflösungen liegen oben – danach läuft es Runde für Runde besser.",
      "Erste Schritte sind gemacht. Die Wiki-Links oben machen aus jeder Antwort eine kleine Lektion."
    ]
  },
  mythen: {
    hoch: [
      "Du hast die meisten Mythen souverän entlarvt. Weiter so.",
      "Stark aufgelöst. Wissen und Glauben trennst du sauber.",
      "Mythen-Fallen geöffnet – du liest genau hin."
    ],
    mittel: [
      "Du sortierst Wissen und Glauben schon gut. Ein paar Mythen sind zäh – oben liegt die Auflösung.",
      "Halber Durchblick, halbe Routine. Die Artikel oben helfen dir beim Rest.",
      "Die meisten Mythen hast du erkannt. Die letzten findest du oben in der Liste."
    ],
    niedrig: [
      "Viele Mythen halten sich hartnäckig. Direkt oben liegen die Fakten dazu.",
      "Mythen sind zäh, aber du hast dich getraut. Die Auflösung findest du oben.",
      "Erste Annahme, dann Fakten. Oben liegen die Wiki-Links, die sie bestätigen."
    ]
  },
  fall: {
    hoch: [
      "Du entscheidest im Alltag sicher – genau das zählt im echten Leben.",
      "Stark. Deine Instinkte treffen, und du gibst dem Tier den Vorzug.",
      "So muss Hand-in-Hand-Wissen aussehen. Das sitzt."
    ],
    mittel: [
      "Du liegst meist richtig. Die Feinheiten zu deinen Fällen findest du oben.",
      "Guter Kompass. Die Artikel oben helfen dir beim letzten Schliff.",
      "Du hast das Tier im Blick. Eine kleine Anpassung, dann läuft es rund."
    ],
    niedrig: [
      "Jeder Fall ist anders. Schau dir die Begründungen oben in Ruhe an – sie machen dich sicherer.",
      "Der Anfang ist gemacht. Direkt oben liegen die Wege, die du heute schon geklärt hast.",
      "Nicht jeder Griff sitzt auf Anhieb. Die Auflösungen oben zeigen dir, worauf es ankommt."
    ]
  }
};

// Einheit, die im persönlichen Ergebnis-Satz vor dem Score steht.
const MODE_EINHEIT = {
  klassisch: "richtig",
  mythen: "Mythen geknackt",
  fall: "Fälle richtig entschieden"
};

function stageOf(score, total) {
  const pct = total > 0 ? score / total : 0;
  if (pct >= 0.76) return "hoch";
  if (pct >= 0.41) return "mittel";
  return "niedrig";
}

function pickFromList(list, score, total) {
  // Leichte, deterministische Variation: Score + Index mischen, ohne Math.random.
  const seed = (score * 7 + total + 3) % list.length;
  return list[seed];
}

export function baueResultatText(modeKey, score, total) {
  const mode = TEXTE[modeKey] || TEXTE.klassisch;
  const stufe = stageOf(score, total);
  const bandTexte = mode[stufe];
  const warm = pickFromList(bandTexte, score, total);
  const einheit = MODE_EINHEIT[modeKey] || MODE_EINHEIT.klassisch;
  return {
    stufe,
    label: STAGE_LABELS[stufe],
    warm,
    satz: `${score} von ${total} ${einheit} – ${warm}`
  };
}

export function besteRunSatz(highscore, bestModeLabel) {
  if (!highscore || highscore.score <= 0) {
    return "Noch keine Runde gespielt – direkt loslegen.";
  }
  const { score, total, modeLabel } = highscore;
  const label = bestModeLabel || modeLabel || "Quiz";
  return `Dein bester Run: ${score} von ${total} (${label}).`;
}
