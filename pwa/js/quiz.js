// quiz.js – Session-Screen der WHL-PWA
import {
  loadQuestions,
  loadSession,
  saveSession,
  clearSession,
  setHighscore,
  markSeen,
  buildWikiUrl,
  QUIZ_SIZE,
  TIME_PER_QUESTION
} from "./whl.js";

const els = {
  progressFill: document.getElementById("progress-fill"),
  progressText: document.getElementById("progress-text"),
  timerFill: document.getElementById("timer-fill"),
  timerText: document.getElementById("timer-text"),
  category: document.getElementById("question-category"),
  text: document.getElementById("question-text"),
  options: document.getElementById("options"),
  explanation: document.getElementById("explanation")
};

let state = null;
let currentQuestion = null;
let currentIndex = 0;
let timerHandle = null;
let timeLeft = TIME_PER_QUESTION;
let isAnswered = false;
let streak = 0;
let bestStreak = 0;
let data = null;

const RING_CIRCUM = 2 * Math.PI * 10;

async function init() {
  state = loadSession();
  if (!state || !state.questions || state.questions.length === 0) {
    location.href = "index.html";
    return;
  }
  data = await loadQuestions();
  state.questions = state.questions.map(s => {
    const full = data.questions.find(q => q.id === s.id);
    return full ? full : s;
  });
  if (!data) {
    location.href = "index.html";
    return;
  }
  showQuestion(0);
  document.addEventListener("keydown", handleKey);
}

function handleKey(ev) {
  if (isAnswered) {
    if (ev.key === "Enter" || ev.key === " ") {
      ev.preventDefault();
      nextQuestion();
    }
    return;
  }
  const num = parseInt(ev.key, 10);
  if (!isNaN(num) && num >= 1 && num <= 4) {
    const btns = els.options.querySelectorAll(".option-btn");
    if (btns[num - 1]) btns[num - 1].click();
  }
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

  const meta = data.categories[currentQuestion.category] || { label: currentQuestion.category };
  els.category.textContent = meta.label || currentQuestion.category;

  els.text.textContent = currentQuestion.text;
  els.options.innerHTML = "";
  els.explanation.hidden = true;
  els.explanation.className = "explanation";
  els.explanation.innerHTML = "";

  currentQuestion.options.forEach((opt, i) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "option-btn";
    btn.setAttribute("role", "option");
    btn.innerHTML = `<span class="option-letter">${String.fromCharCode(65 + i)}</span><span>${escapeHtml(opt)}</span>`;
    btn.addEventListener("click", () => onSelect(i));
    els.options.appendChild(btn);
  });

  updateProgress();
  startTimer();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function updateProgress() {
  const total = state.questions.length;
  const done = currentIndex;
  const pct = (done / total) * 100;
  els.progressFill.style.width = pct + "%";
  els.progressText.textContent = `Frage ${done + 1} von ${total}`;
}

function startTimer() {
  if (timerHandle) clearInterval(timerHandle);
  timeLeft = TIME_PER_QUESTION;
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
  onSelect(-1, { timeout: true });
}

function onSelect(index, opts = {}) {
  if (isAnswered) return;
  isAnswered = true;
  if (timerHandle) clearInterval(timerHandle);

  const correctIndex = currentQuestion.correctIndex;
  const isCorrect = !opts.timeout && index === correctIndex;

  const btns = els.options.querySelectorAll(".option-btn");
  btns.forEach((btn, i) => {
    btn.disabled = true;
    if (i === correctIndex) btn.classList.add("correct");
    if (i === index && !isCorrect) btn.classList.add("wrong");
  });

  if (isCorrect) {
    streak += 1;
    if (streak > bestStreak) bestStreak = streak;
    state.score += 1;
  } else {
    streak = 0;
  }
  state.answers.push({
    id: currentQuestion.id,
    correct: isCorrect,
    timeout: !!opts.timeout
  });
  saveSession(state);

  showExplanation(isCorrect);
}

function showExplanation(isCorrect) {
  const exp = currentQuestion.explanation || "Mehr dazu im verlinkten Wiki-Artikel.";
  els.explanation.innerHTML = `
    <p><strong>${isCorrect ? "Stimmt." : "Nicht ganz."}</strong> ${escapeHtml(exp)}</p>
    <div class="explanation-actions">
      <a class="primary-btn" style="width:auto;" href="${escapeHtml(buildWikiUrl(currentQuestion.wikiPath))}" target="_blank" rel="noopener">Wiki-Artikel öffnen</a>
      <button type="button" class="ghost-btn" id="next-btn">Nächste Frage</button>
    </div>
    ${streak >= 3 ? `<div class="streak" aria-live="polite">${streak} richtige Antworten in Folge</div>` : ""}
  `;
  els.explanation.classList.remove("correct", "wrong");
  els.explanation.classList.add(isCorrect ? "correct" : "wrong");
  els.explanation.hidden = false;
  const nextBtn = document.getElementById("next-btn");
  if (nextBtn) nextBtn.addEventListener("click", nextQuestion);
}

function nextQuestion() {
  if (currentIndex + 1 >= state.questions.length) {
    finishQuiz();
  } else {
    showQuestion(currentIndex + 1);
  }
}

function finishQuiz() {
  if (timerHandle) clearInterval(timerHandle);
  const total = state.questions.length;
  const score = state.score || 0;
  const newRecord = setHighscore(state.category, score);
  markSeen(state.questions.map(q => q.id));
  state.finishedAt = Date.now();
  state.score = score;
  state.total = total;
  state.bestStreak = bestStreak;
  state.newRecord = newRecord;
  saveSession(state);
  location.href = "ergebnis.html";
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;", "'": "&#39;"
  }[c]));
}

window.addEventListener("online", () => document.body.classList.remove("is-offline"));
window.addEventListener("offline", () => document.body.classList.add("is-offline"));

init();