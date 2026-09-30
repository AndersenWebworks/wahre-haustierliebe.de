// quiz.js - Session-Screen der WHL-PWA
// Tap-Moment, Modus-Identität, Spannungsbogen, WHL-Wärme.

import {
  loadQuestions,
  loadSession,
  saveSession,
  getHighscore,
  setHighscore,
  markSeen,
  buildWikiUrl,
  TIME_PER_QUESTION,
  DEFAULT_MODE,
  difficultyDots,
  DIFFICULTY_LABELS,
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
  if (!Array.isArray(state.answers)) state.answers = [];
  applyModeAccent(state.mode);
  paintModeBadge();
  showQuestion(0);
  document.addEventListener("keydown", handleKey);
  document.addEventListener("visibilitychange", handleVisibility);
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
    // Enter auf dem Wiki-Link soll den Link öffnen, nicht weiterblättern.
    if (event.target && event.target.closest && event.target.closest("a, button")) return;
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      nextQuestion();
    }
    return;
  }
  // Klassisch/Fall: Zifferntasten 1–4. Mythen: 1=Stimmt, 2=Stimmt nicht.
  const number = Number.parseInt(event.key, 10);
  const max = aktuelleInteraktion() === "jaNein" ? 2 : 4;
  if (number >= 1 && number <= max) {
    els.options.querySelectorAll(".option-btn")[number - 1]?.click();
  }
}

// Der Timer ist ein sanfter Hinweis. Wer die App verlässt, verliert keine Zeit.
function handleVisibility() {
  if (isAnswered || !currentQuestion) return;
  if (document.hidden) clearInterval(timerHandle);
  else startTimer(false);
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
  startTimer(true);
  window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
}

function paintHeader() {
  if (els.progressStickerImg) {
    els.progressStickerImg.src = headerSticker(currentQuestion.category);
    els.progressStickerImg.alt = "";
  }
  if (els.difficultyIndicator) {
    const level = currentQuestion.difficulty || "leicht";
    const filled = difficultyDots(level);
    els.difficultyIndicator.querySelectorAll(".difficulty-dot").forEach((dot, dotIndex) => {
      dot.dataset.active = dotIndex < filled ? "on" : "off";
    });
    els.difficultyIndicator.dataset.level = level;
    els.difficultyIndicator.title = `Schwierigkeit: ${DIFFICULTY_LABELS[level] || level}`;
  }
}

function paintQuestion() {
  const meta = data.categories[currentQuestion.category] || { label: currentQuestion.category };
  els.category.textContent = meta.label;
  els.text.textContent = currentQuestion.text;
  els.explanation.hidden = true;
  els.explanation.className = "explanation";
  els.explanation.innerHTML = "";

  const kicker = (data.modes && data.modes[state.mode] && data.modes[state.mode].kicker) || "Welche Antwort trägt wirklich?";
  if (els.kicker) els.kicker.textContent = kicker;

  // Fall-Sticker-Szene: 1–2 SVGs über der Frage, rein dekorativ.
  if (els.fallScene) {
    if (state.mode === "fall") {
      els.fallScene.innerHTML = fallStickerListe(currentQuestion)
        .map(name => `<img src="${escapeHtml(stickerUrl(name))}" alt="" width="40" height="40">`)
        .join("");
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
    currentOptions = JA_NEIN_BUTTONS.map(item => ({
      text: item.text,
      correct: item.value === (currentQuestion.correctJaNein === true)
    }));
    els.options.setAttribute("aria-label", "Stimmt das? Wähle Stimmt oder Stimmt nicht.");
  } else {
    currentOptions = shuffleOptions(currentQuestion.options || [], currentQuestion.correctIndex);
    els.options.setAttribute("aria-label", "Antwortmöglichkeiten");
  }

  currentOptions.forEach((option, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = interaktion === "jaNein" ? "option-btn option-btn--ja-nein" : "option-btn";
    button.setAttribute("role", "option");
    button.innerHTML = `<span class="option-letter">${String.fromCharCode(65 + index)}</span><span class="option-text">${escapeHtml(option.text)}</span>`;
    button.addEventListener("click", () => answer(index));
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

function startTimer(reset) {
  clearInterval(timerHandle);
  if (reset) timeLeft = TIME_PER_QUESTION;
  paintTimer();
  timerHandle = setInterval(() => {
    timeLeft -= 1;
    if (timeLeft <= 0) {
      clearInterval(timerHandle);
      timeLeft = 0;
      paintTimer();
      answer(-1, { timeout: true });
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

// Gemeinsame Auswertung für vier Karten und Stimmt / Stimmt nicht.
function answer(index, options = {}) {
  if (isAnswered) return;
  isAnswered = true;
  clearInterval(timerHandle);

  const timedOut = Boolean(options.timeout);
  const correctIndex = currentOptions.findIndex(option => option.correct);
  const isCorrect = !timedOut && currentOptions[index]?.correct === true;
  const buttons = els.options.querySelectorAll(".option-btn");

  buttons.forEach((button, buttonIndex) => {
    button.disabled = true;
    if (buttonIndex === correctIndex) button.classList.add("correct");
    if (buttonIndex === index && !isCorrect) button.classList.add("wrong");
  });

  playTapMoment(buttons, index, correctIndex, isCorrect, timedOut);

  if (isCorrect) {
    streak += 1;
    bestStreak = Math.max(bestStreak, streak);
    state.score = (state.score || 0) + 1;
  } else {
    streak = 0;
  }
  state.answers.push({ id: currentQuestion.id, correct: isCorrect, timeout: timedOut, mode: state.mode });
  saveSession(state);
  updateStatus();
  showExplanation(isCorrect, timedOut);
}

// Tap-Moment: Glow bei richtig, Shake bei falsch, danach leuchtet die richtige
// Antwort nach. Bei reduzierter Bewegung bleiben nur Farben und Piktogramme.
function playTapMoment(buttons, index, correctIndex, isCorrect, timedOut) {
  const sticker = tapSticker(currentQuestion.category);
  const chosen = buttons[index];
  const correctBtn = buttons[correctIndex];

  triggerTapGlow(correctBtn);
  if (isCorrect) {
    showTapIcon(chosen, sticker, true);
    return;
  }
  if (timedOut) {
    showTapIcon(correctBtn, sticker, true);
    return;
  }
  triggerTapShake(chosen);
  showTapIcon(chosen, sticker, false);
  if (prefersReducedMotion) {
    showTapIcon(correctBtn, sticker, true);
  } else {
    setTimeout(() => showTapIcon(correctBtn, sticker, true), 380);
  }
}

function triggerTapShake(button) {
  if (!button || prefersReducedMotion) return;
  button.classList.remove("is-shaking");
  void button.offsetWidth; // Reflow, damit die Animation neu startet
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
  void icon.offsetWidth;
  icon.dataset.visible = "true";
  setTimeout(() => {
    icon.dataset.visible = "false";
    setTimeout(() => icon.remove(), 250);
  }, 850);
}

function introFor(isCorrect, timedOut) {
  if (timedOut) return "Die Zeit ist um.";
  if (aktuelleInteraktion() === "jaNein") {
    if (isCorrect) return "Richtig erkannt.";
    return currentQuestion.correctJaNein ? "Doch, das stimmt." : "Das stimmt so nicht.";
  }
  return isCorrect ? "Treffer." : "Die stärkere Antwort ist markiert.";
}

function showExplanation(isCorrect, timedOut) {
  const intro = introFor(isCorrect, timedOut);
  const isLast = currentIndex + 1 === state.questions.length;
  const streakNote = streak >= 3 ? `<div class="streak">${streak} Treffer in Folge</div>` : "";
  els.explanation.innerHTML = `
    <p><strong>${intro}</strong> ${escapeHtml(currentQuestion.explanation || "Mehr dazu im verlinkten Wiki-Artikel.")}</p>
    <div class="explanation-actions">
      <a class="primary-btn" style="width:auto;" href="${escapeHtml(buildWikiUrl(currentQuestion.wikiPath))}" target="_blank" rel="noopener">Hintergrund lesen</a>
      <button type="button" class="ghost-btn" id="next-btn">${isLast ? "Ergebnis ansehen" : "Nächste Frage"}</button>
    </div>
    ${streakNote}
  `;
  els.explanation.classList.add(isCorrect ? "correct" : "wrong");
  els.explanation.hidden = false;
  const nextBtn = document.getElementById("next-btn");
  nextBtn.addEventListener("click", nextQuestion);
  nextBtn.focus({ preventScroll: true });
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
  state.prevHighscore = getHighscore(state.mode, state.category);
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
