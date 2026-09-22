// quiz.js - Session-Screen der WHL-PWA
// Tap-Moment, Modus-Identität, Spannungsbogen, WHL-Wärme.

import {
  loadQuestions,
  loadSession,
  saveSession,
  setHighscore,
  markSeen,
  buildWikiUrl,
  TIME_PER_QUESTION,
  DEFAULT_MODE,
  schwierigkeitFuer,
  difficultyDots,
  modeAkzent
} from "./whl.js";
import {
  headerSticker,
  tapSticker,
  fallStickerListe,
  stickerUrl
} from "./sticker.js";

const els = {
  progressFill: document.getElementById("progress-fill"),
  progressText: document.getElementById("progress-text-text"),
  progressStickerImg: document.getElementById("progress-sticker-img"),
  difficultyIndicator: document.getElementById("difficulty-indicator"),
  timerFill: document.getElementById("timer-fill"),
  timerText: document.getElementById("timer-text"),
  modeLabel: document.getElementById("quiz-mode-label"),
  kicker: document.getElementById("question-kicker"),
  category: document.getElementById("question-category"),
  text: document.getElementById("question-text"),
  options: document.getElementById("options"),
  explanation: document.getElementById("explanation"),
  fallScene: document.getElementById("fall-scene"),
  score: document.getElementById("score-live"),
  streak: document.getElementById("streak-live")
};

const JA_NEIN_BUTTONS = [
  { text: "Stimmt", value: true },
  { text: "Stimmt nicht", value: false }
];

let state = null;
let data = null;
let currentQuestion = null;
let currentOptions = [];
let currentIndex = 0;
let timerHandle = null;
let timeLeft = TIME_PER_QUESTION;
let isAnswered = false;
let streak = 0;
let bestStreak = 0;

const RING_CIRCUM = 2 * Math.PI * 10;
const prefersReducedMotion = (() => {
  try {
    return window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  } catch (e) {
    return false;
  }
})();

async function init() {
  state = loadSession();
  if (!state || !state.questions || state.questions.length === 0) {
    location.href = "index.html";
    return;
  }
  data = await loadQuestions();
  state.questions = state.questions.map(stub => data.questions.find(question => question.id === stub.id) || stub);
  if (!state.mode) state.mode = DEFAULT_MODE;
  applyModeAccent(state.mode);
  paintModeBadge();
  showQuestion(0);
  document.addEventListener("keydown", handleKey);
}

function applyModeAccent(modeKey) {
  const accent = modeAkzent(modeKey);
  document.body.dataset.mode = modeKey;
  document.documentElement.style.setProperty("--mode-accent", accent.accent);
  document.documentElement.style.setProperty("--mode-accent-light", accent.accentLight);
  document.documentElement.style.setProperty("--mode-tap-glow", accent.tapGlow);
}

function paintModeBadge() {
  if (!els.modeLabel) return;
  const info = data.modes && data.modes[state.mode];
  els.modeLabel.textContent = info ? info.label : "Klassisch";
  els.modeLabel.dataset.mode = state.mode;
}

function handleKey(event) {
  if (isAnswered) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      nextQuestion();
    }
    return;
  }
  // Klassisch/Fall: Zifferntasten 1–4. Mythen: 1=Stimmt, 2=Stimmt nicht.
  const number = Number.parseInt(event.key, 10);
  const isJaNein = aktuelleInteraktion() === "jaNein";
  const max = isJaNein ? 2 : 4;
  if (number >= 1 && number <= max) {
    els.options.querySelectorAll(".option-btn")[number - 1]?.click();
  }
}

function aktuelleInteraktion() {
  const q = currentQuestion;
  if (!q) return "vierKarten";
  return q.interaktion || "vierKarten";
}

function showQuestion(index) {
  if (!state.questions[index]) {
    finishQuiz();
    return;
  }
  currentIndex = index;
  currentQuestion = state.questions[index];
  isAnswered = false;
  timeLeft = TIME_PER_QUESTION;

  paintHeader();
  paintQuestion();
  paintOptions();
  updateStatus();
  startTimer();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function paintHeader() {
  // Tier-Sticker und Difficulty-Indikator.
  if (els.progressStickerImg) {
    els.progressStickerImg.src = headerSticker(currentQuestion.category);
    els.progressStickerImg.alt = "";
  }
  if (els.difficultyIndicator) {
    const level = schwierigkeitFuer(currentIndex, state.questions.length);
    const filled = difficultyDots(level);
    const dots = els.difficultyIndicator.querySelectorAll(".difficulty-dot");
    dots.forEach((dot, dotIndex) => {
      dot.dataset.active = dotIndex < filled ? "on" : "off";
    });
    els.difficultyIndicator.dataset.level = level;
  }
}

function paintQuestion() {
  const meta = data.categories[currentQuestion.category] || { label: currentQuestion.category };
  els.category.textContent = meta.label;
  els.text.textContent = currentQuestion.text;
  els.explanation.hidden = true;
  els.explanation.className = "explanation";
  els.explanation.innerHTML = "";

  // Kicker pro Modus.
  const kicker = (data.modes && data.modes[state.mode] && data.modes[state.mode].kicker) || "Welche Antwort trägt wirklich?";
  if (els.kicker) els.kicker.textContent = kicker;

  // Fall-Sticker-Szene: 1–2 SVGs über der Frage.
  if (els.fallScene) {
    if (state.mode === "fall") {
      const stickers = fallStickerListe(currentQuestion);
      els.fallScene.innerHTML = stickers.map((name, i) => {
        const alt = ["", ""];
        alt[i] = `Sticker ${name}`;
        return `<img src="${escapeHtml(stickerUrl(name))}" alt="${escapeHtml(alt[i] || "")}" width="40" height="40">`;
      }).join("");
      els.fallScene.hidden = false;
    } else {
      els.fallScene.innerHTML = "";
      els.fallScene.hidden = true;
    }
  }
}

function paintOptions() {
  const interaktion = aktuelleInteraktion();
  els.options.dataset.interaktion = interaktion;
  els.options.innerHTML = "";

  if (interaktion === "jaNein") {
    els.options.setAttribute("aria-label", "Stimmt das? Wähle Stimmt oder Stimmt nicht.");
    JA_NEIN_BUTTONS.forEach((item, idx) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "option-btn option-btn--ja-nein";
      button.setAttribute("role", "option");
      button.dataset.jaNeinValue = String(item.value);
      button.innerHTML = `<span class="option-letter">${String.fromCharCode(65 + idx)}</span><span class="option-text">${escapeHtml(item.text)}</span>`;
      button.addEventListener("click", () => onJaNeinSelect(item.value));
      els.options.appendChild(button);
    });
    return;
  }

  // vierKarten
  currentOptions = shuffleOptions(currentQuestion.options, currentQuestion.correctIndex);
  els.options.setAttribute("aria-label", "Antwortmöglichkeiten");
  currentOptions.forEach((option, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "option-btn";
    button.setAttribute("role", "option");
    button.innerHTML = `<span class="option-letter">${String.fromCharCode(65 + index)}</span><span class="option-text">${escapeHtml(option.text)}</span>`;
    button.addEventListener("click", () => onSelect(index));
    els.options.appendChild(button);
  });
}

function updateStatus() {
  const total = state.questions.length;
  const pct = (currentIndex / total) * 100;
  els.progressFill.style.width = `${pct}%`;
  els.progressText.textContent = `Frage ${currentIndex + 1} von ${total}`;
  els.score.textContent = String(state.score || 0);
  els.streak.textContent = String(streak);
}

function startTimer() {
  clearInterval(timerHandle);
  paintTimer();
  timerHandle = setInterval(() => {
    timeLeft -= 1;
    if (timeLeft <= 0) {
      clearInterval(timerHandle);
      onTimeout();
      return;
    }
    paintTimer();
  }, 1000);
}

function paintTimer() {
  const ratio = Math.max(0, timeLeft / TIME_PER_QUESTION);
  els.timerFill.setAttribute("stroke-dashoffset", String(RING_CIRCUM * (1 - ratio)));
  els.timerText.textContent = String(timeLeft);
  els.timerFill.classList.remove("soft", "late");
  if (timeLeft <= 5) els.timerFill.classList.add("late");
  else if (timeLeft <= 12) els.timerFill.classList.add("soft");
}

function onTimeout() {
  if (isAnswered) return;
  if (aktuelleInteraktion() === "jaNein") {
    onJaNeinSelect(null, { timeout: true });
  } else {
    onSelect(-1, { timeout: true });
  }
}

function onSelect(index, options = {}) {
  if (isAnswered) return;
  isAnswered = true;
  clearInterval(timerHandle);

  const correctIndex = currentOptions.findIndex(option => option.correct);
  const isCorrect = !options.timeout && currentOptions[index]?.correct === true;
  const buttons = els.options.querySelectorAll(".option-btn");
  buttons.forEach((button, buttonIndex) => {
    button.disabled = true;
    if (buttonIndex === correctIndex) button.classList.add("correct");
    if (buttonIndex === index && !isCorrect) button.classList.add("wrong");
  });

  // Tap-Moment: Shake bei falsch, Glow bei richtig, dann bei falsch die richtige nachzeichnen.
  if (!options.timeout && index >= 0) {
    triggerTapShake(buttons[index]);
  }
  triggerTapGlow(buttons[correctIndex]);
  if (!isCorrect && !options.timeout) {
    const assetUrl = tapSticker(currentQuestion.category);
    showTapIcon(buttons[index], `sticker/${assetUrl.split("/").pop()}`, false);
    if (prefersReducedMotion) return;
    setTimeout(() => {
      const correctBtn = buttons[correctIndex];
      if (!correctBtn) return;
      showTapIcon(correctBtn, assetUrl, true);
    }, 380);
  } else if (isCorrect) {
    showTapIcon(buttons[index], tapSticker(currentQuestion.category), true);
  }

  if (isCorrect) {
    streak += 1;
    bestStreak = Math.max(bestStreak, streak);
    state.score += 1;
  } else {
    streak = 0;
  }
  state.answers.push({ id: currentQuestion.id, correct: isCorrect, timeout: Boolean(options.timeout), mode: state.mode });
  saveSession(state);
  updateStatus();
  showExplanation(isCorrect, options.timeout);
}

function onJaNeinSelect(value, options = {}) {
  if (isAnswered) return;
  isAnswered = true;
  clearInterval(timerHandle);

  const correct = currentQuestion.correctJaNein === true;
  const isCorrect = !options.timeout && value === correct;
  const buttons = els.options.querySelectorAll(".option-btn");
  // Buttons sind Stimmt (idx 0), Stimmt nicht (idx 1)
  const correctIndex = correct ? 0 : 1;
  const selectedIndex = value === true ? 0 : (value === false ? 1 : -1);

  buttons.forEach((button, buttonIndex) => {
    button.disabled = true;
    if (buttonIndex === correctIndex) button.classList.add("correct");
    if (buttonIndex === selectedIndex && !isCorrect) button.classList.add("wrong");
  });

  if (!options.timeout && selectedIndex >= 0) {
    triggerTapShake(buttons[selectedIndex]);
  }
  triggerTapGlow(buttons[correctIndex]);
  if (!isCorrect && !options.timeout) {
    const assetUrl = tapSticker(currentQuestion.category);
    showTapIcon(buttons[selectedIndex], assetUrl, false);
    if (!prefersReducedMotion) {
      setTimeout(() => {
        const correctBtn = buttons[correctIndex];
        if (correctBtn) showTapIcon(correctBtn, assetUrl, true);
      }, 380);
    }
  } else if (isCorrect) {
    showTapIcon(buttons[selectedIndex], tapSticker(currentQuestion.category), true);
  }

  if (isCorrect) {
    streak += 1;
    bestStreak = Math.max(bestStreak, streak);
    state.score += 1;
  } else {
    streak = 0;
  }
  state.answers.push({ id: currentQuestion.id, correct: isCorrect, timeout: Boolean(options.timeout), mode: state.mode });
  saveSession(state);
  updateStatus();
  showExplanation(isCorrect, options.timeout);
}

function triggerTapShake(button) {
  if (!button || prefersReducedMotion) return;
  button.classList.remove("is-shaking");
  // reflow, damit die Animation neu startet
  void button.offsetWidth;
  button.classList.add("is-shaking");
  setTimeout(() => button.classList.remove("is-shaking"), 360);
}

function triggerTapGlow(button) {
  if (!button) return;
  button.classList.add("is-glowing");
  setTimeout(() => button.classList.remove("is-glowing"), 1100);
}

function showTapIcon(button, assetUrl, positive) {
  if (!button) return;
  const existing = button.querySelector(".option-tap-icon");
  if (existing) existing.remove();
  const icon = document.createElement("span");
  icon.className = `option-tap-icon${positive ? " is-positive" : " is-negative"}`;
  icon.setAttribute("aria-hidden", "true");
  icon.innerHTML = `<img src="${escapeHtml(assetUrl)}" alt="">`;
  button.appendChild(icon);
  if (prefersReducedMotion) return;
  // Reflow + kurze Einblendung
  void icon.offsetWidth;
  icon.dataset.visible = "true";
  setTimeout(() => {
    icon.dataset.visible = "false";
    setTimeout(() => icon.remove(), 250);
  }, 850);
}

function showExplanation(isCorrect, timedOut) {
  const intro = isCorrect ? "Treffer." : timedOut ? "Die Zeit ist um." : "Die stärkere Antwort ist markiert.";
  const streakNote = streak >= 3 ? `<div class="streak" aria-live="polite">${streak} Treffer in Folge</div>` : "";
  els.explanation.innerHTML = `
    <p><strong>${intro}</strong> ${escapeHtml(currentQuestion.explanation || "Mehr dazu im verlinkten Wiki-Artikel.")}</p>
    <div class="explanation-actions">
      <a class="primary-btn" style="width:auto;" href="${escapeHtml(buildWikiUrl(currentQuestion.wikiPath))}" target="_blank" rel="noopener">Hintergrund lesen</a>
      <button type="button" class="ghost-btn" id="next-btn">${currentIndex + 1 === state.questions.length ? "Ergebnis ansehen" : "Nächste Frage"}</button>
    </div>
    ${streakNote}
  `;
  els.explanation.classList.add(isCorrect ? "correct" : "wrong");
  els.explanation.hidden = false;
  document.getElementById("next-btn").addEventListener("click", nextQuestion);
}

function nextQuestion() {
  if (currentIndex + 1 >= state.questions.length) finishQuiz();
  else showQuestion(currentIndex + 1);
}

function finishQuiz() {
  clearInterval(timerHandle);
  const score = state.score || 0;
  state.finishedAt = Date.now();
  state.total = state.questions.length;
  state.bestStreak = bestStreak;
  state.newRecord = setHighscore(state.mode, state.category, score);
  markSeen(state.questions.map(question => question.id));
  saveSession(state);
  location.href = "ergebnis.html";
}

function shuffleOptions(options, correctIndex) {
  const result = options.map((text, index) => ({ text, correct: index === correctIndex }));
  for (let index = result.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [result[index], result[swapIndex]] = [result[swapIndex], result[index]];
  }
  return result;
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, character => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;", "'": "&#39;"
  }[character]));
}

window.addEventListener("online", () => document.body.classList.remove("is-offline"));
window.addEventListener("offline", () => document.body.classList.add("is-offline"));
init();
