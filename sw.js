const CACHE_NAME = 'powertech-v3';
const ASSETS = [
  './',
  'index.html',
  'MacroEconQuiz1R1.html',
  'Powertechquiz3R1.html',
  'Powertechquiz3R2.html',
  'Powertechquiz3R3.html',
  'Powertechquiz3R4.html',
  'Powertechquiz3R5.html',
  'Powertechquiz3R6.html',
  'PowertechTest1R1.html',
  'PowertechTest1R2.html',
  'PowertechTest1R3.html',
  'PowertechTest1R4.html',
  'PowertechTest1R5.html',
  'PowertechTest1R6.html',
  'PTHW8.html',
  'manifest.json'
];

self.addEventListener('install', (e) => {
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(
      keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
    )).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  const isNavigationRequest = request.mode === 'navigate' || request.destination === 'document';

  if (isNavigationRequest && url.origin === self.location.origin) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
          return response;
        })
        .catch(() => caches.match(request).then((cached) => cached || caches.match('./')))
    );
    return;
  }

  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached;
      return fetch(request).then((response) => {
        const copy = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
        return response;
      });
    })
  );
});