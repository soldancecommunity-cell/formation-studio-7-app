// ネットなしで開くための Service Worker（build-pwa.mjs が作る）
const CACHE = 'fs7-b7e0d5be544e';
const FILES = ["./","./index.html","./manifest.webmanifest","./vendor/three.min.js","./icons/icon-180.png","./icons/icon-192.png","./icons/icon-512.png"];
self.addEventListener('install', e => e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES.map(f => new Request(f, { cache: 'reload' })))).then(() => self.skipWaiting())));
self.addEventListener('activate', e => e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k.startsWith('fs7-') && k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())));
self.addEventListener('fetch', e => {
  const r = e.request;
  if (r.method !== 'GET' || new URL(r.url).origin !== location.origin) return;
  e.respondWith(caches.open(CACHE).then(c => c.match(r, { ignoreSearch: true }).then(hit => hit || (r.mode === 'navigate' ? c.match('./index.html') : fetch(r)))));
});
