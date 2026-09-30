// app.js – Start-Screen der WHL-PWA
import {
  loadQuestions,
  registerServiceWorker,
  checkQuestionUpdate,
  pickQuestions,
  poolFor,
  roundSize,
  saveSession,
  getHighscore,
  getBestRun,
  DEFAULT_MODE
} from "./whl.js";

const modeGrid = document.getElementById("mode-grid");
const grid = document.getElementById("category-grid");
const startBtn = document.getElementById("start-btn");
const scoreSummary = document.getElementById("score-summary");
const bestRunLine = document.getElementById("best-run-line");
const snackbar = document.getElementById("snackbar");

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
  // Ein Thema ohne Fragen in diesem Modus fällt auf "Alle Themen" zurück.
  if (selectedCategory !== "all" && poolFor(data, selectedMode, selectedCategory).length === 0) {
    selectedCategory = "all";
  }
  renderCategories();
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
  const count = poolFor(data, selectedMode, key).length;
  const size = Math.min(count, roundSize(data, selectedMode, key));
  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "category-btn";
  btn.dataset.category = key;
  btn.setAttribute("role", "radio");
  btn.setAttribute("aria-checked", String(key === selectedCategory));
  btn.disabled = count === 0;
  const countText = count === 0
    ? "In diesem Modus noch keine Fragen"
    : `${size} ${size === 1 ? "Frage" : "Fragen"} pro Runde`;
  btn.innerHTML = `
    <span class="category-btn-label">${escapeHtml(label)}</span>
    <span class="category-btn-blurb">${escapeHtml(blurb || "")}</span>
    <span class="category-btn-count">${escapeHtml(countText)}</span>
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

function labelFor(modeKey, categoryKey) {
  const modeLabel = (data.modes && data.modes[modeKey] && data.modes[modeKey].label) || "Klassisch";
  const catLabel = (!categoryKey || categoryKey === "all")
    ? "alle Themen"
    : ((data.categories && data.categories[categoryKey] && data.categories[categoryKey].label) || "Thema");
  return { modeLabel, catLabel };
}

function renderScoreSummary() {
  const score = getHighscore(selectedMode, selectedCategory);
  const total = roundSize(data, selectedMode, selectedCategory);
  const { modeLabel, catLabel } = labelFor(selectedMode, selectedCategory);
  if (!score) {
    scoreSummary.textContent = `Noch keine Runde im Modus ${modeLabel} (${catLabel}) gespielt.`;
  } else {
    scoreSummary.textContent = `Highscore ${modeLabel} · ${catLabel}: ${Math.min(score, total)} von ${total}.`;
  }
  renderBestRun();
}

function renderBestRun() {
  if (!bestRunLine || !data) return;
  const best = getBestRun(data);
  if (!best) {
    bestRunLine.textContent = "Dein bester Run beginnt hier.";
    bestRunLine.dataset.empty = "true";
    return;
  }
  const { catLabel } = labelFor(best.mode, best.category);
  bestRunLine.textContent = `Dein bester Run: ${best.score} von ${best.total} (${best.modeLabel} · ${catLabel}).`;
  bestRunLine.dataset.empty = "false";
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

function showSnackbar(msg) {
  if (!snackbar) return;
  snackbar.textContent = msg;
  snackbar.classList.add("is-visible");
  setTimeout(() => snackbar.classList.remove("is-visible"), 4000);
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
    renderModes();
    renderCategories();
    renderScoreSummary();
    if (checkQuestionUpdate(data)) {
      showSnackbar("Neue Fragen sind da. Viel Spaß beim Spielen!");
    }
  } catch (e) {
    scoreSummary.textContent = "Fragenkatalog konnte nicht geladen werden. Versuche es später erneut.";
    startBtn.disabled = true;
    return;
  }
  startBtn.addEventListener("click", startQuiz);
}

init();
