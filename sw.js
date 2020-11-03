self.addEventListener('install', event => {
    console.log('Install event!');
})

self.addEventListener('activate', event => {
    console.log('Activate event!');
})

self.addEventListener('fetch', event => {
    console.log('Fetch intercepted for:', event.request.url);
})

var cacheName = 'cache-v1';
var resourcesToPrecache = [
    '/',
    'index.html',
    'images/front.jpg'
];

self.addEventListener('install', event => {
    console.log('Service worker install event!');
    event.waitUntil(
        caches.open(cacheName)
            .then(cache => {
                return cache.addAll(resourcesToPrecache);
            })
    );
})

self.addEventListener('fetch', event => {
    event.respondWith(caches.match(event.request)
        .then(cachedResponse => {
            return cachedResponse || fetch(event.request);
        })
    );
})