// app.js – Start-Screen der WHL-PWA
import {
  loadQuestions,
  registerServiceWorker,
  checkQuestionUpdate,
  pickQuestions,
  saveSession,
  getLastSummary,
  getHighscore,
  getBestRun,
  DEFAULT_MODE
} from "./whl.js";

const modeGrid = document.getElementById("mode-grid");
const grid = document.getElementById("category-grid");
const startBtn = document.getElementById("start-btn");
const scoreSummary = document.getElementById("score-summary");
const bestRunLine = document.getElementById("best-run-line");

let selectedMode = DEFAULT_MODE;
let selectedCategory = "all";
let data = null;

function renderModes() {
  modeGrid.innerHTML = "";
  const modes = data.modes || {};
  for (const [key, info] of Object.entries(modes)) {
    modeGrid.appendChild(makeModeBtn({ key, label: info.label, blurb: info.blurb }));
  }
}

function makeModeBtn({ key, label, blurb }) {
  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "mode-card";
  btn.dataset.mode = key;
  btn.setAttribute("role", "radio");
  btn.setAttribute("aria-checked", String(key === selectedMode));
  btn.innerHTML = `
    <span class="mode-card-label">${escapeHtml(label)}</span>
    <span class="mode-card-blurb">${escapeHtml(blurb || "")}</span>
  `;
  btn.addEventListener("click", () => selectMode(key));
  return btn;
}

function selectMode(key) {
  selectedMode = key;
  for (const btn of modeGrid.querySelectorAll(".mode-card")) {
    btn.setAttribute("aria-checked", String(btn.dataset.mode === key));
  }
  renderScoreSummary();
}

function renderCategories() {
  grid.innerHTML = "";
  grid.appendChild(makeCategoryBtn({ key: "all", label: "Alle Themen", blurb: "Bunt gemischt" }));
  const cats = data.categories || {};
  for (const [key, info] of Object.entries(cats)) {
    grid.appendChild(makeCategoryBtn({ key, label: info.label, blurb: info.blurb }));
  }
}

function makeCategoryBtn({ key, label, blurb }) {
  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "category-btn";
  btn.dataset.category = key;
  btn.setAttribute("role", "radio");
  btn.setAttribute("aria-checked", String(key === selectedCategory));
  btn.innerHTML = `
    <span class="category-btn-label">${escapeHtml(label)}</span>
    <span class="category-btn-blurb">${escapeHtml(blurb || "")}</span>
  `;
  btn.addEventListener("click", () => selectCategory(key));
  return btn;
}

function selectCategory(key) {
  selectedCategory = key;
  for (const btn of grid.querySelectorAll(".category-btn")) {
    btn.setAttribute("aria-checked", String(btn.dataset.category === key));
  }
  renderScoreSummary();
}

function renderScoreSummary() {
  const score = getHighscore(selectedMode, selectedCategory);
  const total = (data && data.questions) ? countQuestionsFor(data, selectedMode, selectedCategory) : 15;
  const modeLabel = (data.modes && data.modes[selectedMode] && data.modes[selectedMode].label) || "Klassisch";
  const catLabel = selectedCategory === "all"
    ? "alle Themen"
    : ((data.categories && data.categories[selectedCategory] && data.categories[selectedCategory].label) || "Thema");
  if (!score) {
    scoreSummary.textContent = `Noch keine Runde im Modus ${modeLabel} (${catLabel}) gespielt.`;
  } else {
    scoreSummary.textContent = `Highscore ${modeLabel} · ${catLabel}: ${score} von ${total}.`;
  }
  renderBestRun();
}

function renderBestRun() {
  if (!bestRunLine || !data) return;
  const best = getBestRun(data.modes || {});
  if (!best) {
    bestRunLine.textContent = "Dein bester Run beginnt hier.";
    bestRunLine.dataset.empty = "true";
    return;
  }
  const sameMode = best.mode === selectedMode;
  const totalGuess = guessBestTotal(best);
  bestRunLine.textContent = sameMode
    ? `Dein bester Run: ${best.score} von ${totalGuess} (${best.modeLabel}).`
    : `Dein bester Run: ${best.score} von ${totalGuess} (${best.modeLabel}).`;
  bestRunLine.dataset.empty = "false";
}

function guessBestTotal(best) {
  if (!data || !data.questions) return 15;
  const modePool = data.questions.filter(q => q.mode === best.mode);
  if (best.category && best.category !== "all") {
    const inCat = modePool.filter(q => q.category === best.category);
    if (inCat.length) return inCat.length;
  }
  return modePool.length || 15;
}

function countQuestionsFor(data, modeKey, categoryKey) {
  const all = data.questions || [];
  let pool = all;
  if (modeKey && modeKey !== "all") pool = pool.filter(q => q.mode === modeKey);
  if (categoryKey && categoryKey !== "all") pool = pool.filter(q => q.category === categoryKey);
  return pool.length;
}

function startQuiz() {
  if (!data) return;
  const picks = pickQuestions(data, selectedMode, selectedCategory);
  if (picks.length === 0) {
    scoreSummary.textContent = "Für diese Kombination sind noch keine Fragen hinterlegt.";
    return;
  }
  const session = {
    mode: selectedMode,
    category: selectedCategory,
    startedAt: Date.now(),
    questions: picks.map(q => ({ id: q.id, text: q.text })),
    answers: [],
    score: 0
  };
  saveSession(session);
  location.href = "quiz.html";
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;", "'": "&#39;"
  }[c]));
}

function attachOffline() {
  const update = () => document.body.classList.toggle("is-offline", !navigator.onLine);
  window.addEventListener("online", update);
  window.addEventListener("offline", update);
  update();
}

async function init() {
  registerServiceWorker();
  attachOffline();
  try {
    data = await loadQuestions();
    checkQuestionUpdate(data);
    renderModes();
    renderCategories();
    renderScoreSummary();
  } catch (e) {
    scoreSummary.textContent = "Fragenkatalog konnte nicht geladen werden. Versuche es später erneut.";
    startBtn.disabled = true;
    return;
  }
  startBtn.addEventListener("click", startQuiz);
}

init();
