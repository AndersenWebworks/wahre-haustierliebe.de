// quiz.js - Session-Screen der WHL-PWA
import {
  loadQuestions,
  loadSession,
  saveSession,
  setHighscore,
  markSeen,
  buildWikiUrl,
  TIME_PER_QUESTION,
  DEFAULT_MODE
} from "./whl.js";

const els = {
  progressFill: document.getElementById("progress-fill"),
  progressText: document.getElementById("progress-text"),
  timerFill: document.getElementById("timer-fill"),
  timerText: document.getElementById("timer-text"),
  modeLabel: document.getElementById("quiz-mode-label"),
  kicker: document.getElementById("question-kicker"),
  category: document.getElementById("question-category"),
  text: document.getElementById("question-text"),
  options: document.getElementById("options"),
  explanation: document.getElementById("explanation"),
  score: document.getElementById("score-live"),
  streak: document.getElementById("streak-live")
};

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

async function init() {
  state = loadSession();
  if (!state || !state.questions || state.questions.length === 0) {
    location.href = "index.html";
    return;
  }
  data = await loadQuestions();
  state.questions = state.questions.map(stub => data.questions.find(question => question.id === stub.id) || stub);
  if (!state.mode) state.mode = DEFAULT_MODE;
  paintModeBadge();
  showQuestion(0);
  document.addEventListener("keydown", handleKey);
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
  const number = Number.parseInt(event.key, 10);
  if (number >= 1 && number <= 4) {
    els.options.querySelectorAll(".option-btn")[number - 1]?.click();
  }
}

function showQuestion(index) {
  if (!state.questions[index]) {
    finishQuiz();
    return;
  }
  currentIndex = index;
  currentQuestion = state.questions[index];
  currentOptions = shuffleOptions(currentQuestion.options, currentQuestion.correctIndex);
  isAnswered = false;
  timeLeft = TIME_PER_QUESTION;

  const meta = data.categories[currentQuestion.category] || { label: currentQuestion.category };
  els.category.textContent = meta.label;
  els.text.textContent = currentQuestion.text;
  els.options.innerHTML = "";
  els.explanation.hidden = true;
  els.explanation.className = "explanation";
  els.explanation.innerHTML = "";

  const kicker = (data.modes && data.modes[state.mode] && data.modes[state.mode].kicker) || "Welche Antwort trägt wirklich?";
  if (els.kicker) els.kicker.textContent = kicker;

  currentOptions.forEach((option, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "option-btn";
    button.setAttribute("role", "option");
    button.innerHTML = `<span class="option-letter">${String.fromCharCode(65 + index)}</span><span>${escapeHtml(option.text)}</span>`;
    button.addEventListener("click", () => onSelect(index));
    els.options.appendChild(button);
  });

  updateStatus();
  startTimer();
  window.scrollTo({ top: 0, behavior: "smooth" });
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
      onSelect(-1, { timeout: true });
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

function onSelect(index, options = {}) {
  if (isAnswered) return;
  isAnswered = true;
  clearInterval(timerHandle);

  const correctIndex = currentOptions.findIndex(option => option.correct);
  const isCorrect = !options.timeout && currentOptions[index]?.correct === true;
  els.options.querySelectorAll(".option-btn").forEach((button, optionIndex) => {
    button.disabled = true;
    if (optionIndex === correctIndex) button.classList.add("correct");
    if (optionIndex === index && !isCorrect) button.classList.add("wrong");
  });

  if (isCorrect) {
    streak += 1;
    bestStreak = Math.max(bestStreak, streak);
    state.score += 1;
  } else {
    streak = 0;
  }
  state.answers.push({ id: currentQuestion.id, correct: isCorrect, timeout: Boolean(options.timeout) });
  saveSession(state);
  updateStatus();
  showExplanation(isCorrect, options.timeout);
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
