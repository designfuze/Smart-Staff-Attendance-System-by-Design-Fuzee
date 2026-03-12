// Service Worker for JNDPS Attendance
const CACHE_NAME = 'jndps-cache-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/login.html',
  '/teacher.html',
  '/admin.html',
  '/css/style.css',
  '/js/app.js',
  '/js/auth.js',
  '/js/attendance.js',
  '/images/logo.png',
  '/images/icon-192.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
