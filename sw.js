// ========================================================
// Service Worker for Murottal Quran (Offline PWA) - Pink Edition
// ========================================================

const CACHE_NAME = 'quran-rose-v2.6-header-adzan-fix';
const STATIC_ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './css/style.css',
  './css/player.css',
  './css/extra.css',
  './js/quran-data.js',
  './js/dzikir-data.js',
  './js/prayer-times.js',
  './js/asmaul-husna-data.js',
  './js/wudhu-data.js',
  './js/salat-data.js',
  './js/sholawat-data.js',
  './js/kartun-illustrations.js',
  './js/storage.js',
  './js/audio-manager.js',
  './js/kajian.js',
  './js/app.js',
  './assets/icons/logo.svg',
  './assets/images/banner_sholat.jpg',
  './assets/images/banner_wudhu.jpg',
  './assets/audio/adzan-madinah.mp3'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Audio files bypass SW cache, handled directly by IndexedDB
  if (url.pathname.endsWith('.mp3') || url.hostname.includes('archive.org') || url.hostname.includes('cdn.equran.id')) {
    return;
  }

  // Navigation requests: Network-First so updates show immediately
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).then((res) => {
        const copy = res.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
        return res;
      }).catch(() => caches.match('./index.html'))
    );
    return;
  }

  // Core assets: Cache-first with network fallback
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) return cachedResponse;
      return fetch(event.request).then((networkResponse) => {
        if (
          networkResponse.status === 200 &&
          (url.hostname.includes('fonts.googleapis.com') || url.hostname.includes('fonts.gstatic.com'))
        ) {
          const clone = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
        }
        return networkResponse;
      });
    })
  );
});
