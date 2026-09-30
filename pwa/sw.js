// sw.js – WHL-PWA Service Worker
// Strategie: network-first mit Cache als Rückfallebene. Online kommt immer der
// aktuelle Stand vom Server, offline läuft die App aus dem Cache weiter.
// Dadurch bleibt nach einem Deploy keine alte Fassung hängen. CACHE_VERSION
// nur erhöhen, wenn sich die APP_SHELL-Liste ändert.

const CACHE_VERSION = "whl-pwa-v5";
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
  "./js/daily.js",
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
    caches.open(CACHE_VERSION)
      .then(cache => cache.addAll(APP_SHELL.map(url => new Request(url, { cache: "reload" }))))
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
  event.respondWith(networkFirst(req));
});

async function networkFirst(req) {
  const cache = await caches.open(CACHE_VERSION);
  try {
    // no-cache: am HTTP-Cache vorbei beim Server nachfragen (ETag spart Daten).
    const res = await fetch(req, { cache: "no-cache" });
    if (res && res.status === 200 && res.type === "basic") {
      cache.put(req, res.clone());
    }
    return res;
  } catch (e) {
    const cached = await cache.match(req, { ignoreSearch: true });
    if (cached) return cached;
    if (req.mode === "navigate") {
      const fallback = await cache.match("./index.html");
      if (fallback) return fallback;
    }
    return new Response("Offline", { status: 503 });
  }
}
