// data/resultateTexte.js – persönliche Ergebnis-Texte pro Modus und Score-Stufe
// Drei Bänder: niedrig (0–40 %), mittel (41–75 %), hoch (76–100 %).
// Die Artikelliste steht auf der Ergebnisseite unter dem Ergebnis.

export const STAGE_LABELS = {
  niedrig: "niedrig",
  mittel: "mittel",
  hoch: "hoch"
};

const TEXTE = {
  klassisch: {
    hoch: [
      "Stark. Du weißt, was Tiere im Alltag wirklich brauchen.",
      "Das sitzt. Selbst die kniffligen Fragen haben dich nicht aufgehalten.",
      "Beeindruckend. Da steckt echtes Wissen dahinter, kein Glück."
    ],
    mittel: [
      "Eine runde Sache. Was noch gefehlt hat, findest du unten in den Artikeln.",
      "Gut gemacht. Ein, zwei Lücken, und die Artikel unten schließen sie schnell.",
      "Solide Basis. Mit den Artikeln unten wird daraus nächstes Mal mehr."
    ],
    niedrig: [
      "Ein Anfang. Unten stehen die Artikel zu genau den Fragen, die gehakt haben.",
      "Das waren harte Brocken. Die Artikel unten erklären, was dahintersteckt.",
      "Jede Runde bringt etwas. Unten findest du den Hintergrund zu jeder Frage."
    ]
  },
  mythen: {
    hoch: [
      "Kaum ein Mythos kommt an dir vorbei.",
      "Stark. Du trennst Wissen und Hörensagen sauber.",
      "Du liest genau hin und fällst auf keine bequeme Ausrede herein."
    ],
    mittel: [
      "Die meisten Mythen hast du durchschaut. Die zähen erklären die Artikel unten.",
      "Guter Riecher. Ein paar Irrtümer sind hartnäckig, unten steht, warum.",
      "Ordentlich sortiert. Für den Rest lohnt sich ein Blick in die Artikel unten."
    ],
    niedrig: [
      "Diese Mythen sind zäh, sie halten sich seit Jahren. Unten stehen die Fakten.",
      "Viele Irrtümer klingen einfach plausibel. Die Artikel unten räumen damit auf.",
      "Mythen haben es in sich. Unten liest du nach, was wirklich stimmt."
    ]
  },
  fall: {
    hoch: [
      "Du entscheidest sicher, und zwar im Sinne des Tieres.",
      "Stark. Im Ernstfall weißt du, was zu tun ist.",
      "Klarer Kopf, gutes Gespür. Genau das zählt im echten Leben."
    ],
    mittel: [
      "Meist richtig entschieden. Die Feinheiten stehen in den Artikeln unten.",
      "Guter Kompass. Die Artikel unten helfen bei den kniffligen Fällen.",
      "Du hast das Tier im Blick. Unten steht, worauf es im Detail ankommt."
    ],
    niedrig: [
      "Echte Fälle sind selten eindeutig. Die Artikel unten machen dich sicherer.",
      "Hier lag die gut gemeinte Lösung oft daneben. Unten steht, warum.",
      "Nicht jeder Griff sitzt sofort. Unten findest du, worauf es ankommt."
    ]
  }
};

// Einheit, die im persönlichen Ergebnis-Satz vor dem Score steht.
const MODE_EINHEIT = {
  klassisch: "richtig",
  mythen: "richtig eingeordnet",
  fall: "Fällen gut entschieden"
};

function stageOf(score, total) {
  const pct = total > 0 ? score / total : 0;
  if (pct >= 0.76) return "hoch";
  if (pct >= 0.41) return "mittel";
  return "niedrig";
}

function pickFromList(list) {
  return list[Math.floor(Math.random() * list.length)];
}

export function baueResultatText(modeKey, score, total) {
  const mode = TEXTE[modeKey] || TEXTE.klassisch;
  const stufe = stageOf(score, total);
  const warm = pickFromList(mode[stufe]);
  const einheit = MODE_EINHEIT[modeKey] || MODE_EINHEIT.klassisch;
  return {
    stufe,
    label: STAGE_LABELS[stufe],
    warm,
    satz: `${score} von ${total} ${einheit}. ${warm}`
  };
}
