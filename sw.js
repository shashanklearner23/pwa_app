const CACHE_NAME = 'ai-tool-v1';

// Install event - Use relative paths (./) for GitHub Pages compatibility
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll([
          './',
          './index.html',
          './manifest.json'
        ]);
      })
  );
});

// Fetch event - The logic that allows the app to load from cache
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(cachedResponse => {
        // Return cached version if found
        if (cachedResponse) {
          return cachedResponse;
        }

        // Otherwise, fetch from network
        return fetch(event.request)
          .then(response => {
            // Only cache valid responses
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            const responseToCache = response.clone();
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });

            return response;
          })
          .catch(error => {
            console.error('Fetch failed; returning offline fallback if applicable.', error);
          });
      })
  );
});
