// sw.js - This file needs to be in the root of the directory to work,
//         so do not move it next to the other scripts

const CACHE_NAME = 'lab-7-starter';

// Once the service worker has been installed, feed it some initial URLs to cache
self.addEventListener('install', function (event) {
  /**
   * TODO - Part 2 Step 2
   * Create a function as outlined above
   */
  //sarah added:
   event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);s
      })
  );


});

/**
 * Once the service worker 'activates', this makes it so clients loaded
 * in the same scope do not need to be reloaded before their fetches will
 * go through this service worker
 */
self.addEventListener('activate', function (event) {
  /**
   * TODO - Part 2 Step 3s
   * Create a function as outlined above, it should be one line
   */
  //sarah added
  //  var cacheAllowlist = ['pages-cache-v1', 'blog-posts-cache-v1'];

  // event.waitUntil(
  //   caches.keys().then(function(cacheNames) {
  //     return Promise.all(
  //       cacheNames.map(function(cacheName) {
  //         if (cacheAllowlist.indexOf(cacheName) === -1) {
  //           return caches.delete(cacheName);
  //         }
  //       })
  //     );
  //   })
  // );

  event.waitUntil(clients.claim());

  
});

// Intercept fetch requests and store them in the cache
self.addEventListener('fetch', function (event) {
  /**
   * TODO - Part 2 Step 4
   * Create a function as outlined above
   */


  //sarah add:
  
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }

        //var fetchRequest = event.request.clone();

        return fetch(event.request).then(
          function(response) {
            // Check if we received a valid response
            if(!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            var responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then(function(cache) {
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        );
      })
    );



});