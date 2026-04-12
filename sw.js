const CACHE_NAME = 'powertech-v2';
const ASSETS = [
  'index.html',
  'manifest.json',
  'PTHW8.html'
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)));
});

self.addEventListener('fetch', (e) => {
  e.respondWith(caches.match(e.request).then(res => res || fetch(e.request)));
});