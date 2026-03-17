const CACHE_NAME = 'ai-pwa-app-v1';
const ASSETS_TO_CACHE = [
  '/pwa_app/',
  '/pwa_app/index.html',
  '/pwa_app/manifest.json'
];

// Install Event
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // Use {cache: 'reload'} to ensure we get fresh files during install
      return cache.addAll(ASSETS_TO_CACHE);
    }).then(() => self.skipWaiting()) // Forces the waiting service worker to become active
  );
});

// Activate Event
self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim()); // Immediately take control of the page
});

// Fetch Event
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
