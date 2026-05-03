const CACHE_NAME = 'powertech-v2';
const ASSETS = [
  'index.html',
  'manifest.json',
  'PTHW8.html',
  'q6.png',
  'q7.png',
  'q8.png',
  'q37.png',
  'q38.png',
  'sw.js'
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)));
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then(res => {
      if (res) return res;
      return fetch(e.request).then(response => {
        // Cache images dynamically on first fetch
        if (e.request.url.match(/\.(png|jpg|jpeg|gif|svg)$/i)) {
          const clonedRes = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(e.request, clonedRes));
        }
        return response;
      }).catch(() => {
        // Fallback for offline - optional
        return new Response('Offline - Resource not available');
      });
    })
  );
});