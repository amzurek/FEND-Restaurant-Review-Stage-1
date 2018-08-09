var cacheName = 'restaurant-app-version-1';
var cacheNameSave = 'restaurant-app-save';

self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(cacheName).then(function(cache) {
            console.log('Cache opened!');
            return cache.addAll([
                '/',
                '../index.html',
                '../restaurant.html',
                '../css/styles.css',
                '../data/restaurants.json',
                '../img/1.jpg',
                '../img/2.jpg',
                '../img/3.jpg',
                '../img/4.jpg',
                '../img/5.jpg',
                '../img/6.jpg',
                '../img/7.jpg',
                '../img/8.jpg',
                '../img/9.jpg',
                '../img/10.jpg',
                '../js/main.js',
                '../js/dbhelper.js',
                '../js/restaurant_info.js' 
            ]);
        })
    );
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.key()
    .then(function(keysList) {
    return Promise.all(keysList.map(function(key) {
      if (key != cacheName && key != cacheNameSave) {
        return caches
        .delete(key);
      }
    }))
  }));
  return self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.open(cacheName)
    .then(function(cache) {
      return cache.match(e.request)
      .then(function(response) {
        return response || fetch(e.request)
        .then(function(response) {
          cache.put(e.request, response.clone());
          return response;
        });
      });
    })
    .catch(err => console.log(err, e.request))
  );
});
