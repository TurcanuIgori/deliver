// this code is used to registre SW
// navigator.serviceWorker.register('js/handler/command-worker.js', {scope: '/command'})
//     .then(function(reg) {
//         // registration worked
//         console.log('Registration succeeded. Scope is ' + reg.scope);
//     }).catch(function(error) {
//     // registration failed
//     console.log('Registration failed with ' + error);
// });
self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request).then(function (resp) {
            return resp || fetch(event.request).then(function (response) {
                caches.open('v1').then(function (cache) {
                    cache.put(event.request, response.clone());
                });
                return response;
            });
        }).catch(function () {
            return caches.match('/command/gallery/myLittleVader.jpg');
        })
    );
});

self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open('v2').then(function (cache) {
            return cache.addAll([
                '/command/',
                '/command/index.html',
                '/command/style.css',
                '/command/app.js',
                '/command/image-list.js',
                // include other new resources for the new version...
            ]);
        })
    );
});


self.addEventListener('activate', function (event) {
    var cacheWhitelist = ['v2'];

    event.waitUntil(
        caches.keys().then(function (keyList) {
            return Promise.all(keyList.map(function (key) {
                if (cacheWhitelist.indexOf(key) === -1) {
                    return caches.delete(key);
                }
            }));
        })
    );
});