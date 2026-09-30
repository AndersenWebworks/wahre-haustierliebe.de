// whl.js – gemeinsame Helfer für die WHL-PWA
// Daten, Storage, Service-Worker, Modi-Verwaltung.

const STORAGE_KEYS = {
  HIGHSCORE: "whl_quiz_highscore_v2",
  SEEN: "whl_quiz_seen_v1",
  SESSION: "whl_quiz_session_v2",
  VERSION: "whl_quiz_version_seen",
  DAILY: "whl_quiz_daily_v1"
};

export const QUIZ_SIZE = 10;
const SEEN_LIMIT = 400;
export const TIME_PER_QUESTION = 30; // sanfter Hinweis, kein Druck
export const DEFAULT_MODE = "klassisch";

let _dataPromise = null;

export async function loadQuestions() {
  if (!_dataPromise) {
    const mod = await import("../data/questions.js");
    _dataPromise = Promise.resolve({
      version: mod.version,
      categories: mod.categories,
      modes: mod.modes,
      questions: mod.questions
    });
  }
  return _dataPromise;
}

export async function loadResultateTexte() {
  const mod = await import("../data/resultateTexte.js");
  return mod;
}

// Alle Fragen zu Modus und Kategorie. "all" oder leer heißt: nicht filtern.
export function poolFor(data, modeKey, categoryKey) {
  const all = (data && data.questions) || [];
  const mode = (!modeKey || modeKey === "all") ? null : modeKey;
  const cat = (!categoryKey || categoryKey === "all") ? null : categoryKey;
  return all.filter(q => (!mode || q.mode === mode) && (!cat || q.category === cat));
}

// Wählt die Runde zufällig aus dem Pool, noch nicht gesehene Fragen zuerst,
// und ordnet sie dann von leicht nach knifflig. So entsteht der Spannungsbogen
// aus der echten Schwierigkeit, und Wiederholungen kommen erst später.
export function pickQuestions(data, modeKey, categoryKey) {
  const pool = poolFor(data, modeKey, categoryKey);
  const seen = new Set(getSeen());
  const fresh = shuffle(pool.filter(q => !seen.has(q.id)));
  const known = shuffle(pool.filter(q => seen.has(q.id)));
  const picks = fresh.concat(known).slice(0, Math.min(QUIZ_SIZE, pool.length));
  return picks
    .map((q, i) => ({ q, i }))
    .sort((a, b) => difficultyRank(a.q.difficulty) - difficultyRank(b.q.difficulty) || a.i - b.i)
    .map(entry => entry.q);
}

export function roundSize(data, modeKey, categoryKey) {
  return Math.min(QUIZ_SIZE, poolFor(data, modeKey, categoryKey).length);
}

export function shuffle(arr) {
  const out = arr.slice();
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

export function loadSession() {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEYS.SESSION);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}

export function saveSession(session) {
  try {
    sessionStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify(session));
  } catch (e) { /* ignoriert */ }
}

export function clearSession() {
  try { sessionStorage.removeItem(STORAGE_KEYS.SESSION); } catch (e) { /* ignoriert */ }
}

function readHighscores() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.HIGHSCORE);
    return raw ? (JSON.parse(raw) || {}) : {};
  } catch (e) {
    return {};
  }
}

function modeKeyOf(modeKey) {
  return (!modeKey || modeKey === "all") ? DEFAULT_MODE : modeKey;
}

function categoryKeyOf(categoryKey) {
  return (!categoryKey || categoryKey === "all") ? "all" : categoryKey;
}

export function getHighscore(modeKey, categoryKey) {
  const data = readHighscores();
  const mData = data[modeKeyOf(modeKey)] || {};
  return mData[categoryKeyOf(categoryKey)] || 0;
}

export function setHighscore(modeKey, categoryKey, score) {
  try {
    const data = readHighscores();
    const m = modeKeyOf(modeKey);
    const c = categoryKeyOf(categoryKey);
    if (!data[m]) data[m] = {};
    const prev = data[m][c] || 0;
    if (score > prev) {
      data[m][c] = score;
      localStorage.setItem(STORAGE_KEYS.HIGHSCORE, JSON.stringify(data));
      return true;
    }
    return false;
  } catch (e) {
    return false;
  }
}

// Liefert den persönlichen "besten Run" der gesamten Historie.
// Einbezogen werden alle Modi und alle Kategorien; der höchste Anteil richtiger
// Antworten gewinnt, bei Gleichstand die größere Runde.
export function getBestRun(data) {
  const stored = readHighscores();
  const modes = (data && data.modes) || {};
  let best = null;
  for (const [modeKey, cats] of Object.entries(stored)) {
    const modeLabel = (modes[modeKey] && modes[modeKey].label) || modeKey;
    for (const [categoryKey, score] of Object.entries(cats || {})) {
      if (typeof score !== "number" || score <= 0) continue;
      const total = roundSize(data, modeKey, categoryKey);
      if (!total) continue;
      const shown = Math.min(score, total);
      const ratio = shown / total;
      if (!best || ratio > best.ratio || (ratio === best.ratio && total > best.total)) {
        best = { score: shown, total, ratio, mode: modeKey, modeLabel, category: categoryKey };
      }
    }
  }
  return best;
}

function getSeen() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SEEN);
    const arr = raw ? JSON.parse(raw) : [];
    return Array.isArray(arr) ? arr : [];
  } catch (e) {
    return [];
  }
}

// Merkt sich gespielte Fragen. Ist ein Pool komplett gesehen, beginnt er von
// vorn, weil pickQuestions dann nur noch bekannte Fragen findet.
export function markSeen(questionIds) {
  try {
    const ids = new Set(questionIds);
    const merged = getSeen().filter(id => !ids.has(id)).concat(questionIds).slice(-SEEN_LIMIT);
    localStorage.setItem(STORAGE_KEYS.SEEN, JSON.stringify(merged));
  } catch (e) { /* ignoriert */ }
}

// ---------- Frage des Tages ----------

export function todayKey(date = new Date()) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function hashString(text) {
  let h = 2166136261;
  for (let i = 0; i < text.length; i++) {
    h ^= text.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

// Für alle Menschen am selben Tag dieselbe Frage, ohne Server.
export function dailyQuestion(data, key = todayKey()) {
  const all = ((data && data.questions) || []).slice().sort((a, b) => a.id.localeCompare(b.id));
  if (!all.length) return null;
  return all[hashString("whl-" + key) % all.length];
}

export function getDaily() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.DAILY);
    return raw ? (JSON.parse(raw) || {}) : {};
  } catch (e) {
    return {};
  }
}

function dayBefore(key) {
  const [y, m, d] = key.split("-").map(Number);
  return todayKey(new Date(y, m - 1, d - 1));
}

// Speichert die Antwort von heute. Die Serie zählt Tage in Folge, an denen
// jemand mitgespielt hat, egal ob richtig oder falsch.
export function saveDaily(key, questionId, correct) {
  const prev = getDaily();
  if (prev.date === key) return prev;
  const streak = prev.date === dayBefore(key) ? (prev.streak || 0) + 1 : 1;
  const next = {
    date: key,
    id: questionId,
    correct: Boolean(correct),
    streak,
    best: Math.max(prev.best || 0, streak),
    total: (prev.total || 0) + 1,
    right: (prev.right || 0) + (correct ? 1 : 0)
  };
  try { localStorage.setItem(STORAGE_KEYS.DAILY, JSON.stringify(next)); } catch (e) { /* ignoriert */ }
  return next;
}

export function registerServiceWorker() {
  if (!("serviceWorker" in navigator)) return;
  if (location.protocol === "file:") return;
  const register = () => navigator.serviceWorker.register("sw.js").catch(() => { /* still ok */ });
  if (document.readyState === "complete") register();
  else window.addEventListener("load", register);
}

// true, wenn seit dem letzten Besuch eine neue Fragenversion angekommen ist.
export function checkQuestionUpdate(data) {
  try {
    const seen = localStorage.getItem(STORAGE_KEYS.VERSION);
    if (seen && seen === data.version) return false;
    localStorage.setItem(STORAGE_KEYS.VERSION, data.version);
    return seen !== null;
  } catch (e) {
    return false;
  }
}

export function formatNumber(n) {
  return new Intl.NumberFormat("de-DE").format(n);
}

export function buildWikiUrl(path) {
  if (!path) return "https://wahre-haustierliebe.de/";
  if (/^https?:/i.test(path)) return path;
  const clean = path.startsWith("/") ? path : "/" + path;
  return "https://wahre-haustierliebe.de" + clean;
}

// Schwierigkeit einer Frage: leicht, mittel oder knifflig.
export function difficultyRank(level) {
  if (level === "knifflig") return 2;
  if (level === "mittel") return 1;
  return 0;
}

export function difficultyDots(level) {
  return difficultyRank(level) + 1;
}

export const DIFFICULTY_LABELS = {
  leicht: "leicht",
  mittel: "mittel",
  knifflig: "knifflig"
};

// Mode-Akzente für die unterschiedliche Anmutung der drei Modi.
export const MODE_AKZENTE = {
  klassisch: {
    accent: "#2A7B6F",
    accentLight: "#EDF6F4",
    tapGlow: "rgba(42,123,111,0.32)"
  },
  mythen: {
    accent: "#3C6B95",
    accentLight: "#E8EFF7",
    tapGlow: "rgba(60,107,149,0.32)"
  },
  fall: {
    accent: "#D97A3B",
    accentLight: "#FCEFE6",
    tapGlow: "rgba(217,122,59,0.32)"
  }
};

export function modeAkzent(modeKey) {
  return MODE_AKZENTE[modeKey] || MODE_AKZENTE.klassisch;
}
