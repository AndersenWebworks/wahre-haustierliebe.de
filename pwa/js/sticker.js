// sticker.js – gemeinsame Sticker-Helfer für die WHL-PWA
// Eine Kategorie oder ein Modus entscheidet, welcher Sticker angezeigt wird.

const CATEGORY_HEADER = {
  hunde: "pfote",
  katzen: "kralle",
  kleintiere: "pfote",
  voegel: "feder"
};

const CATEGORY_TAP = {
  hunde: "pfote",
  katzen: "blatt",
  kleintiere: "blatt",
  voegel: "piepmatz"
};

const CATEGORY_BADGE = {
  hunde: "hund",
  katzen: "katze",
  kleintiere: "meeri",
  voegel: "welli"
};

export function headerSticker(category) {
  const key = CATEGORY_HEADER[category] || "pfote";
  return `sticker/${key}.svg`;
}

export function tapSticker(category) {
  const key = CATEGORY_TAP[category] || "blatt";
  return `sticker/${key}.svg`;
}

export function badgeSticker(category) {
  const key = CATEGORY_BADGE[category] || "pfote";
  return `sticker/${key}.svg`;
}

// Fall-Sticker-Szenen werden in der Frage selbst hinterlegt (question.sticker).
// Wenn ein Fall keine Sticker hat, fallen wir auf die Kategorie zurück.

const FALL_FALLBACK = {
  hunde: ["hund", "halsband"],
  katzen: ["katze", "fenster"],
  kleintiere: ["meeri", "napf"],
  voegel: ["welli", "kaefig"]
};

export function fallStickerListe(question) {
  if (question && Array.isArray(question.sticker) && question.sticker.length > 0) {
    return question.sticker;
  }
  return FALL_FALLBACK[question.category] || ["pfote"];
}

export function stickerUrl(name) {
  return `sticker/${name}.svg`;
}
