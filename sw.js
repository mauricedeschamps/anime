const CACHE_NAME = 'anime-quotes-v1';
const urlsToCache = [
  '/',
  'index.html',
  'manifest.json',
  'sw.js'
  // アイコンは必要に応じて追加（動的キャッシュでも可）
];

// インストール時
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
  self.skipWaiting();
});

// フェッチ時: キャッシュファースト
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});

// 古いキャッシュの削除
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(name => name !== CACHE_NAME)
          .map(name => caches.delete(name))
      );
    })
  );
  self.clients.claim();
});