// share.js – Ergebnis-Screen der WHL-PWA
// Persönliche Texte pro Modus/Stufe, Sammlung freigeschalteter Tierarten.

import {
  loadQuestions,
  loadSession,
  clearSession,
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

  const prev = getHighscore(state.mode, state.category);
  const highscoreLine = state.newRecord
    ? `Neuer Highscore (${modeLabel}): ${score} von ${total}. Vorheriger Stand: ${prev}.`
    : `Dein Highscore (${modeLabel}) bleibt ${prev} von ${total}.`;
  els.highscoreLine.textContent = highscoreLine;

  const satz = baueResultatText(state.mode, score, total);
  els.message.textContent = satz.satz;
  els.message.dataset.stage = satz.stufe;
  document.body.dataset.mode = state.mode;

  renderCategoryBadges();
  renderWikiList();

  els.againBtn.addEventListener("click", () => {
    clearSession();
    location.href = "index.html";
  });
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
  if (seen.size === 0) {
    els.categoryBadges.hidden = true;
    return;
  }
  els.categoryBadges.hidden = false;
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

function renderWikiList() {
  const cats = data.categories || {};
  const seen = new Set();
  els.wikiList.innerHTML = "";
  let any = false;
  state.questions.forEach(qStub => {
    const q = data.questions.find(qq => qq.id === qStub.id);
    if (!q || seen.has(q.id)) return;
    seen.add(q.id);
    any = true;
    const meta = cats[q.category] || { label: q.category };
    const url = buildWikiUrl(q.wikiPath);
    const li = document.createElement("li");
    li.innerHTML = `
      <span class="topic">${escapeHtml(meta.label || q.category)}</span>
      <a href="${escapeHtml(url)}" target="_blank" rel="noopener">${escapeHtml(q.text)}</a>
    `;
    els.wikiList.appendChild(li);
  });
  if (els.wikiSection) {
    els.wikiSection.hidden = !any;
  }
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
