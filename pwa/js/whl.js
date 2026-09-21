// whl.js – gemeinsame Helfer für die WHL-PWA
// Daten, Storage, Service-Worker, Sortierung.

const STORAGE_KEYS = {
  HIGHSCORE: "whl_quiz_highscore_v1",
  SEEN: "whl_quiz_seen_v1",
  FAV: "whl_quiz_fav_v1",
  SESSION: "whl_quiz_session_v1",
  VERSION: "whl_quiz_version_seen",
  INSTALL_HINT: "whl_quiz_install_hinted"
};

const QUIZ_SIZE = 15;
const TIME_PER_QUESTION = 30; // sanfter Hinweis, kein Druck

let _dataPromise = null;

export async function loadQuestions() {
  if (!_dataPromise) {
    const mod = await import("../data/questions.js");
    _dataPromise = Promise.resolve({
      version: mod.version,
      categories: mod.categories,
      questions: mod.questions
    });
  }
  return _dataPromise;
}

export function pickQuestions(data, categoryKey) {
  const all = data.questions || [];
  if (!categoryKey || categoryKey === "all") {
    return shuffle(all).slice(0, QUIZ_SIZE);
  }
  const filtered = all.filter(q => q.category === categoryKey);
  return shuffle(filtered).slice(0, Math.min(QUIZ_SIZE, filtered.length));
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

export function getHighscore(categoryKey) {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.HIGHSCORE);
    if (!raw) return 0;
    const data = JSON.parse(raw);
    if (!categoryKey || categoryKey === "all") return data.all || 0;
    return data[categoryKey] || 0;
  } catch (e) {
    return 0;
  }
}

export function setHighscore(categoryKey, score) {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.HIGHSCORE);
    const data = raw ? JSON.parse(raw) : {};
    const key = (!categoryKey || categoryKey === "all") ? "all" : categoryKey;
    const prev = data[key] || 0;
    if (score > prev) {
      data[key] = score;
      localStorage.setItem(STORAGE_KEYS.HIGHSCORE, JSON.stringify(data));
      return true;
    }
    return false;
  } catch (e) {
    return false;
  }
}

export function markSeen(questionIds) {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SEEN);
    const arr = raw ? JSON.parse(raw) : [];
    const merged = Array.from(new Set([...arr, ...questionIds])).slice(-30);
    localStorage.setItem(STORAGE_KEYS.SEEN, JSON.stringify(merged));
    localStorage.setItem(STORAGE_KEYS.FAV, guessFav(merged));
  } catch (e) { /* ignoriert */ }
}

function guessFav(seen) {
  const counts = {};
  const recent = seen.slice(-15);
  for (const id of recent) counts[id] = (counts[id] || 0) + 1;
  return Object.keys(counts).slice(-3).join(",");
}

export function getLastSummary() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.HIGHSCORE);
    if (!raw) return null;
    const data = JSON.parse(raw);
    return data;
  } catch (e) {
    return null;
  }
}

export function registerServiceWorker() {
  if (!("serviceWorker" in navigator)) return;
  if (location.protocol === "file:") return;
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("sw.js").catch(() => { /* still ok */ });
  });
}

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