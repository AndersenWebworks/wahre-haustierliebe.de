// share.js – Ergebnis-Screen der WHL-PWA
// Persönliche Texte pro Modus/Stufe, Sammlung freigeschalteter Tierarten.

import {
  loadQuestions,
  loadSession,
  clearSession,
  saveSession,
  pickQuestions,
  getHighscore,
  buildWikiUrl,
  formatNumber,
  DEFAULT_MODE,
  loadResultateTexte
} from "./whl.js";
import { baueResultatText } from "../data/resultateTexte.js";
import { badgeSticker } from "./sticker.js";

const els = {
  score: document.getElementById("score-value"),
  total: document.getElementById("score-total"),
  percent: document.getElementById("score-percent"),
  highscoreLine: document.getElementById("highscore-line"),
  message: document.getElementById("result-message"),
  modeLabel: document.getElementById("result-mode"),
  wikiList: document.getElementById("wiki-list"),
  wikiSection: document.getElementById("wiki-section"),
  categoryBadges: document.getElementById("category-badges"),
  categoryBadgesCard: document.getElementById("category-badges-card"),
  againBtn: document.getElementById("again-btn"),
  shareBtn: document.getElementById("share-btn"),
  shareCard: document.getElementById("share-card"),
  snackbar: document.getElementById("snackbar")
};

let state = null;
let data = null;

async function init() {
  state = loadSession();
  if (!state || !state.questions) {
    location.href = "index.html";
    return;
  }
  if (!state.mode) state.mode = DEFAULT_MODE;
  data = await loadQuestions();
  await loadResultateTexte();
  paint();
}

function paint() {
  const total = state.questions.length || 15;
  const score = state.score || 0;
  const pct = Math.round((score / total) * 100);
  els.score.textContent = formatNumber(score);
  els.total.textContent = formatNumber(total);
  els.percent.textContent = pct + "% richtig";

  const modeInfo = data.modes && data.modes[state.mode];
  const modeLabel = modeInfo ? modeInfo.label : "Klassisch";
  if (els.modeLabel) {
    els.modeLabel.textContent = `Modus · ${modeLabel}`;
    els.modeLabel.dataset.mode = state.mode;
  }

  const prev = typeof state.prevHighscore === "number" ? state.prevHighscore : getHighscore(state.mode, state.category);
  const best = Math.min(getHighscore(state.mode, state.category), total);
  let highscoreLine;
  if (state.newRecord) {
    highscoreLine = prev > 0
      ? `Neuer Highscore (${modeLabel}): ${score} von ${total}. Vorher waren es ${Math.min(prev, total)}.`
      : `Dein erster Highscore (${modeLabel}): ${score} von ${total}.`;
  } else {
    highscoreLine = `Dein Highscore (${modeLabel}) bleibt ${best} von ${total}.`;
  }
  els.highscoreLine.textContent = highscoreLine;

  const satz = baueResultatText(state.mode, score, total);
  els.message.textContent = satz.satz;
  els.message.dataset.stage = satz.stufe;
  document.body.dataset.mode = state.mode;

  renderCategoryBadges();
  renderWikiList();

  els.againBtn.addEventListener("click", playAgain);
  els.shareBtn.addEventListener("click", onShareClick);
}

function renderCategoryBadges() {
  if (!els.categoryBadges) return;
  const cats = data.categories || {};
  const seen = new Set();
  state.questions.forEach(qStub => {
    const q = data.questions.find(qq => qq.id === qStub.id);
    if (!q) return;
    seen.add(q.category);
  });
  els.categoryBadges.innerHTML = "";
  if (els.categoryBadgesCard) els.categoryBadgesCard.hidden = seen.size === 0;
  if (seen.size === 0) return;
  for (const categoryKey of seen) {
    const meta = cats[categoryKey] || { label: categoryKey };
    const li = document.createElement("li");
    li.className = "category-badge";
    li.innerHTML = `
      <img src="${escapeHtml(badgeSticker(categoryKey))}" alt="" width="32" height="32">
      <span>${escapeHtml(meta.label || categoryKey)}</span>
    `;
    els.categoryBadges.appendChild(li);
  }
}

// Artikel zu den Fragen der Runde. Was falsch lief, steht oben, weil sich
// dort das Weiterlesen am meisten lohnt. Mehrere Fragen zu einem Artikel
// ergeben nur einen Eintrag.
function renderWikiList() {
  const cats = data.categories || {};
  const answers = new Map((state.answers || []).map(a => [a.id, a.correct]));
  const byPath = new Map();
  state.questions.forEach(qStub => {
    const q = data.questions.find(qq => qq.id === qStub.id);
    if (!q) return;
    const key = q.wikiPath || q.id;
    const entry = byPath.get(key) || { q, wrong: false };
    if (answers.get(q.id) !== true) entry.wrong = true;
    byPath.set(key, entry);
  });
  const entries = [...byPath.values()].sort((a, b) => Number(b.wrong) - Number(a.wrong));
  els.wikiList.innerHTML = "";
  for (const { q, wrong } of entries) {
    const meta = cats[q.category] || { label: q.category };
    const li = document.createElement("li");
    li.innerHTML = `
      <span class="topic">${escapeHtml(meta.label || q.category)}<span class="answer-state${wrong ? "" : " is-correct"}">${wrong ? "Nachlesen lohnt sich" : "Gewusst"}</span></span>
      <a href="${escapeHtml(buildWikiUrl(q.wikiPath))}" target="_blank" rel="noopener">${escapeHtml(q.text)}</a>
    `;
    els.wikiList.appendChild(li);
  }
  if (els.wikiSection) els.wikiSection.hidden = entries.length === 0;
}

// Neue Runde mit demselben Modus und Thema, ohne Umweg über den Start.
function playAgain() {
  const picks = pickQuestions(data, state.mode, state.category);
  clearSession();
  if (picks.length === 0) {
    location.href = "index.html";
    return;
  }
  saveSession({
    mode: state.mode,
    category: state.category,
    startedAt: Date.now(),
    questions: picks.map(q => ({ id: q.id, text: q.text })),
    answers: [],
    score: 0
  });
  location.href = "quiz.html";
}

function buildShareText() {
  const total = state.questions.length || 15;
  const score = state.score || 0;
  const pct = Math.round((score / total) * 100);
  const modeInfo = data.modes && data.modes[state.mode];
  const modeLabel = modeInfo ? modeInfo.label : "Klassisch";
  const cats = data.categories || {};
  const catLabel = cats[state.category]?.label || "Tierschutz";
  return [
    `WHL Quiz – ${modeLabel} · ${catLabel}`,
    `Mein Stand: ${score} von ${total} (${pct} % richtig)`,
    "Spiel mit auf https://wahre-haustierliebe.de/pwa/",
    "Mehr Wissen auf https://wahre-haustierliebe.de/"
  ].join("\n");
}

async function onShareClick() {
  const text = buildShareText();
  els.shareCard.hidden = false;
  els.shareCard.textContent = text;

  if (navigator.share) {
    try {
      await navigator.share({
        title: "WHL Quiz – Wa(h)re Haustier(liebe)",
        text,
        url: "https://wahre-haustierliebe.de/pwa/"
      });
      return;
    } catch (e) { /* fallback unten */ }
  }
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text);
      showSnackbar("Text in die Zwischenablage kopiert.");
      return;
    }
  } catch (e) { /* fall through */ }
  showSnackbar("Du kannst den Text im Feld unten markieren und kopieren.");
}

function showSnackbar(msg) {
  els.snackbar.textContent = msg;
  els.snackbar.classList.add("is-visible");
  setTimeout(() => els.snackbar.classList.remove("is-visible"), 2800);
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;", "'": "&#39;"
  }[c]));
}

init();
