// app.js – Start-Screen der WHL-PWA
import {
  loadQuestions,
  registerServiceWorker,
  checkQuestionUpdate,
  pickQuestions,
  saveSession,
  getLastSummary,
  getHighscore
} from "./whl.js";

const grid = document.getElementById("category-grid");
const startBtn = document.getElementById("start-btn");
const modeAllBtn = document.getElementById("mode-all");
const scoreSummary = document.getElementById("score-summary");

let selectedCategory = "all";
let data = null;

function renderCategories() {
  grid.innerHTML = "";
  const allBtn = makeCategoryBtn({ key: "all", label: "Alle Themen", blurb: "Bunt gemischt" });
  grid.appendChild(allBtn);
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
  if (key === selectedCategory) btn.setAttribute("aria-checked", "true");
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
  modeAllBtn.setAttribute("aria-pressed", String(key === "all"));
  renderScoreSummary();
}

function renderScoreSummary() {
  const data = getLastSummary();
  if (!data) {
    scoreSummary.textContent = "Noch keine Runde gespielt.";
    return;
  }
  const key = selectedCategory === "all" ? "all" : selectedCategory;
  const hs = data[key] || 0;
  if (selectedCategory === "all") {
    scoreSummary.textContent = `Dein Highscore (alle Themen): ${hs} von 15.`;
  } else {
    const label = (data && data.categories && data.categories[selectedCategory] && data.categories[selectedCategory].label) || "Thema";
    scoreSummary.textContent = `Dein Highscore im Thema ${label}: ${hs} von 15.`;
  }
}

function startQuiz() {
  if (!data) return;
  const picks = pickQuestions(data, selectedCategory);
  if (picks.length === 0) {
    scoreSummary.textContent = "Für dieses Thema sind noch keine Fragen hinterlegt.";
    return;
  }
  const session = {
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