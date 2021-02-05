const staticCacheName = 'site-static-v2';
const assets = [
    './index.html',
    './src/icon192.png',
    './src/bus.js',
    './src/links.js',
    './src/menu.js',
    './src/style.css',
    './src/timetable.js',
    './src/user.js',
];
// install event
self.addEventListener('install', evt => {
    evt.waitUntil(
        caches.open(staticCacheName).then((cache) => {
            console.log('caching shell assets');
            cache.addAll(assets);
        })
    );
});
// activate event
self.addEventListener('activate', evt => {
    evt.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(keys
                .filter(key => key !== staticCacheName)
                .map(key => caches.delete(key))
            );
        })
    );
});
// fetch event
self.addEventListener('fetch', evt => {
    evt.respondWith(
        caches.match(evt.request).then(cacheRes => {
            return cacheRes || fetch(evt.request);
        })
    );
});
// cashe update
self.addEventListener('message', function (event) {
    switch (event.data) {
        case 'updateCache':
            console.log("updating...");
            event.waitUntil(
                caches
                    .open(CACHE_NAME)
                    .then(function (cache) {
                        return cache.addAll(urlsToCache);
                    })
            );
            break;
        default:
    }
});