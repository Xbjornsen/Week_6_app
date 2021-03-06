/* global fetch, self, caches, Promise */
var CACHE_TITLE = 'my-site-cache';
var CACHE_VERSION = 'v6';
var CACHE_NAME = CACHE_TITLE + '-' + CACHE_VERSION;
var urlsToCache = [
  '.',
  'index.html',
    'states.html',
  'image/1.jpg',
  'image/3.jpg',
  'image/4.jpg',
  'j.js',
    'nav.js',
    'nav.css',
    'main.css'

];

self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache)
      })
      .catch(function(err) { console.error(err); })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
            console.log('loaded from cache', response);
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});
self.addEventListener('activate', function(event) {

  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
                    if(cacheName !== CACHE_NAME && cacheName.indexOf(CACHE_TITLE) === 0) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});