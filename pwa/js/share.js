// share.js – Ergebnis-Screen der WHL-PWA
import {
  loadQuestions,
  loadSession,
  clearSession,
  getHighscore,
  buildWikiUrl,
  formatNumber,
  DEFAULT_MODE
} from "./whl.js";

const els = {
  score: document.getElementById("score-value"),
  total: document.getElementById("score-total"),
  percent: document.getElementById("score-percent"),
  highscoreLine: document.getElementById("highscore-line"),
  message: document.getElementById("result-message"),
  modeLabel: document.getElementById("result-mode"),
  wikiList: document.getElementById("wiki-list"),
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

  els.message.textContent = pickMessage(score, total);

  renderWikiList();

  els.againBtn.addEventListener("click", () => {
    clearSession();
    location.href = "index.html";
  });
  els.shareBtn.addEventListener("click", onShareClick);
}

function renderWikiList() {
  const cats = data.categories || {};
  const seen = new Set();
  els.wikiList.innerHTML = "";
  state.questions.forEach(qStub => {
    const q = data.questions.find(qq => qq.id === qStub.id);
    if (!q || seen.has(q.id)) return;
    seen.add(q.id);
    const meta = cats[q.category] || { label: q.category };
    const url = buildWikiUrl(q.wikiPath);
    const li = document.createElement("li");
    li.innerHTML = `
      <span class="topic">${escapeHtml(meta.label || q.category)}</span>
      <a href="${escapeHtml(url)}" target="_blank" rel="noopener">${escapeHtml(q.text)}</a>
    `;
    els.wikiList.appendChild(li);
  });
}

function pickMessage(score, total) {
  const pct = score / total;
  if (pct >= 0.9) return "Wirklich stark. Du kennst die Bedürfnisse der Tiere.";
  if (pct >= 0.7) return "Sehr ordentlich. Ein paar Lücken, aber das Wiki hilft.";
  if (pct >= 0.5) return "Ein guter Anfang. Die Artikel zu deinen Fragen lohnen sich.";
  return "Lies die Artikel in Ruhe – danach läuft es Runde für Runde besser.";
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
