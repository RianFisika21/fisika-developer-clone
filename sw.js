var CACHE_NAME = "fisika-3d-v1";
var CORE_ASSETS = [
  "./",
  "./index.html",
  "./modul.html",
  "./style.css",
  "./app.js",
  "./addons.js"
];

self.addEventListener("install", function(e) {
  e.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(CORE_ASSETS);
    })
  );
  self.skipWaiting();
});

self.addEventListener("fetch", function(e) {
  if (e.request.method !== "GET") return;
  var url = e.request.url;

  // Pustaka CDN (Three.js, Chart.js, Font): Cache-First agar cepat & offline-ready
  if (url.indexOf("cdnjs.cloudflare.com") !== -1 || url.indexOf("cdn.jsdelivr.net") !== -1) {
    e.respondWith(
      caches.match(e.request).then(function(cached) {
        return cached || fetch(e.request).then(function(res) {
          var copy = res.clone();
          caches.open(CACHE_NAME).then(function(c) { c.put(e.request, copy); });
          return res;
        });
      })
    );
    return;
  }

  // File lokal GitHub Pages: Network-First dengan fallback Cache saat offline
  e.respondWith(
    fetch(e.request).then(function(res) {
      var copy = res.clone();
      caches.open(CACHE_NAME).then(function(c) { c.put(e.request, copy); });
      return res;
    }).catch(function() {
      return caches.match(e.request);
    })
  );
});
