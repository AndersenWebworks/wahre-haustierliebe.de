// sw.js – WHL-PWA Service Worker
// Strategien: App-Shell cache-first; Fragen-JSON stale-while-revalidate.
// v2: Game-Design-Pass – neue Sticker, Sticker-Helfer, Textmodul,
//     mode-Akzente und CSS-Animations ergänzt.

const CACHE_VERSION = "whl-pwa-v2";
const APP_SHELL = [
  "./",
  "./index.html",
  "./quiz.html",
  "./ergebnis.html",
  "./manifest.json",
  "./css/whl-pwa.css",
  "./js/whl.js",
  "./js/app.js",
  "./js/quiz.js",
  "./js/share.js",
  "./js/sticker.js",
  "./data/questions.js",
  "./data/resultateTexte.js",
  "./icons/icon.svg",
  "./icons/icon-maskable.svg",
  "./sticker/pfote.svg",
  "./sticker/blatt.svg",
  "./sticker/sonne.svg",
  "./sticker/piepmatz.svg",
  "./sticker/kralle.svg",
  "./sticker/feder.svg",
  "./sticker/flosse.svg",
  "./sticker/hund.svg",
  "./sticker/katze.svg",
  "./sticker/welli.svg",
  "./sticker/meeri.svg",
  "./sticker/halsband.svg",
  "./sticker/fenster.svg",
  "./sticker/kaefig.svg",
  "./sticker/napf.svg"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_VERSION).then(cache => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_VERSION).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", event => {
  const req = event.request;
  if (req.method !== "GET") return;

  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  // Fragen-Daten: stale-while-revalidate
  if (url.pathname.endsWith("/data/questions.js") || url.pathname.endsWith("/data/resultateTexte.js")) {
    event.respondWith(staleWhileRevalidate(req));
    return;
  }

  // App-Shell: cache-first
  event.respondWith(cacheFirst(req));
});

async function cacheFirst(req) {
  const cache = await caches.open(CACHE_VERSION);
  const cached = await cache.match(req);
  if (cached) return cached;
  try {
    const res = await fetch(req);
    if (res && res.status === 200 && res.type === "basic") {
      cache.put(req, res.clone());
    }
    return res;
  } catch (e) {
    const fallback = await cache.match("./index.html");
    return fallback || new Response("Offline", { status: 503 });
  }
}

async function staleWhileRevalidate(req) {
  const cache = await caches.open(CACHE_VERSION);
  const cached = await cache.match(req);
  const network = fetch(req).then(res => {
    if (res && res.status === 200) cache.put(req, res.clone());
    return res;
  }).catch(() => cached);
  return cached || network;
}
