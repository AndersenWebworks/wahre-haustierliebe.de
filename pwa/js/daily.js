// daily.js – Frage des Tages auf dem Start-Screen der WHL-PWA
// Eine Frage pro Kalendertag, für alle gleich, direkt auf der Startseite
// beantwortbar. Die Tagesserie zählt Tage in Folge, an denen gespielt wurde.

import {
  dailyQuestion,
  getDaily,
  saveDaily,
  todayKey,
  buildWikiUrl,
  modeAkzent,
  shuffle
} from "./whl.js";
import { headerSticker } from "./sticker.js";

const JA_NEIN = [
  { text: "Stimmt", value: true },
  { text: "Stimmt nicht", value: false }
];

export function renderDaily(root, data) {
  if (!root || !data) return;
  const key = todayKey();
  const question = dailyQuestion(data, key);
  if (!question) {
    root.hidden = true;
    return;
  }
  const accent = modeAkzent(question.mode);
  root.style.setProperty("--mode-accent", accent.accent);
  root.style.setProperty("--mode-accent-light", accent.accentLight);
  root.style.setProperty("--mode-tap-glow", accent.tapGlow);
  root.dataset.mode = question.mode;
  root.hidden = false;

  const catLabel = (data.categories[question.category] || {}).label || question.category;
  const modeInfo = (data.modes && data.modes[question.mode]) || {};
  const stored = getDaily();
  const answeredToday = stored.date === key && stored.id === question.id;

  const options = question.interaktion === "jaNein"
    ? JA_NEIN.map(item => ({ text: item.text, correct: item.value === (question.correctJaNein === true) }))
    : shuffle((question.options || []).map((text, index) => ({ text, correct: index === question.correctIndex })));

  root.innerHTML = `
    <div class="daily-head">
      <h2 id="daily-title">Frage des Tages</h2>
      <p class="daily-streak" id="daily-streak"></p>
    </div>
    <p class="daily-meta">
      <img src="${escapeHtml(headerSticker(question.category))}" alt="" width="18" height="18">
      <span>${escapeHtml(catLabel)} · ${escapeHtml(modeInfo.label || "")}</span>
    </p>
    <p class="daily-text">${escapeHtml(question.text)}</p>
    <div class="options daily-options" data-interaktion="${escapeHtml(question.interaktion || "vierKarten")}" role="listbox" aria-label="Antwortmöglichkeiten"></div>
    <div class="explanation" id="daily-explanation" hidden></div>
  `;

  const optionsEl = root.querySelector(".daily-options");
  const buttons = options.map((option, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = question.interaktion === "jaNein" ? "option-btn option-btn--ja-nein" : "option-btn";
    button.setAttribute("role", "option");
    button.innerHTML = `<span class="option-letter">${String.fromCharCode(65 + index)}</span><span class="option-text">${escapeHtml(option.text)}</span>`;
    button.addEventListener("click", () => answer(index));
    optionsEl.appendChild(button);
    return button;
  });

  paintStreak(root, stored.date === key || stored.date === previousDay(key) ? stored : {});

  if (answeredToday) {
    reveal(-1, stored.correct, true);
  }

  function answer(index) {
    const isCorrect = options[index]?.correct === true;
    const saved = saveDaily(key, question.id, isCorrect);
    paintStreak(root, saved);
    reveal(index, isCorrect, false);
  }

  function reveal(index, isCorrect, fromStorage) {
    const correctIndex = options.findIndex(option => option.correct);
    buttons.forEach((button, buttonIndex) => {
      button.disabled = true;
      if (buttonIndex === correctIndex) button.classList.add("correct");
      if (buttonIndex === index && !isCorrect) button.classList.add("wrong");
    });
    const intro = fromStorage
      ? (isCorrect ? "Heute schon gewusst." : "Heute schon gespielt.")
      : question.interaktion === "jaNein"
        ? (isCorrect ? "Richtig erkannt." : (question.correctJaNein ? "Doch, das stimmt." : "Das stimmt so nicht."))
        : (isCorrect ? "Treffer." : "Die stärkere Antwort ist markiert.");
    const explanation = root.querySelector("#daily-explanation");
    explanation.innerHTML = `
      <p><strong>${intro}</strong> ${escapeHtml(question.explanation || "")}</p>
      <div class="explanation-actions">
        <a class="ghost-btn" style="width:auto;" href="${escapeHtml(buildWikiUrl(question.wikiPath))}" target="_blank" rel="noopener">Hintergrund lesen</a>
      </div>
      <p class="daily-next">Morgen wartet eine neue Frage.</p>
    `;
    explanation.classList.add(isCorrect ? "correct" : "wrong");
    explanation.hidden = false;
  }
}

function paintStreak(root, stored) {
  const el = root.querySelector("#daily-streak");
  if (!el) return;
  const streak = stored && stored.streak ? stored.streak : 0;
  el.textContent = streak >= 2 ? `${streak} Tage in Folge dabei` : "";
  el.hidden = streak < 2;
}

function previousDay(key) {
  const [y, m, d] = key.split("-").map(Number);
  return todayKey(new Date(y, m - 1, d - 1));
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, character => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;", "'": "&#39;"
  }[character]));
}
