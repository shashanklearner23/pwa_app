const CACHE_NAME = 'pwa-app-v1';
const ASSETS_TO_CACHE = [
  '/pwa_app/',
  '/pwa_app/index.html',
  '/pwa_app/manifest.json'
];

// Install Event
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// Fetch Event (Allows offline viewing of the main page)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
