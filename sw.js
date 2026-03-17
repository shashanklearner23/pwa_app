const CACHE_NAME = 'ai-hub-cache-v2';
const ASSETS = [
  '/pwa_app/',
  '/pwa_app/index.html',
  '/pwa_app/manifest.json',
  '/pwa_app/sw.js'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim());
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
