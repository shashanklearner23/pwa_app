const CACHE_NAME = 'ai-tool-v1'; // Updated name for your AI Tool branding
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './sw.js'
];

// Install Event: Caches the essential files
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('AI Tool: Caching shell assets');
      return cache.addAll(ASSETS);
    }).then(() => self.skipWaiting())
  );
});

// Activate Event: Takes control of the page immediately
self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim());
});

// Fetch Event: Required for the PWA "Download" button to work
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Returns the cached file if available, otherwise goes to the network
      return response || fetch(event.request);
    })
  );
});
