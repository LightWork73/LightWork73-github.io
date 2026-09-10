const CACHE_NAME = 'powertech-v1';
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
  'manifest.json'
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)));
});

self.addEventListener('fetch', (e) => {
  e.respondWith(caches.match(e.request).then(res => res || fetch(e.request)));
});