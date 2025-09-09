'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"flutter_bootstrap.js": "183f3d188ccc1cb136f4ce2f34a213bc",
"version.json": "485057a2c11d994910c58ab278c2ad35",
"index.html": "004dd51104f99b8731aa3a442d732067",
"/": "004dd51104f99b8731aa3a442d732067",
"main.dart.js": "0e843f41f6865b81f2df7113bb7ceffa",
"flutter.js": "83d881c1dbb6d6bcd6b42e274605b69c",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"manifest.json": "fc5d443fd684bfffa40c4ffcd6b53f88",
"assets/AssetManifest.json": "3983138cc471b1b0f705ac53f1240316",
"assets/NOTICES": "00d0b32a2e353d1b55b4aa1243f8208e",
"assets/FontManifest.json": "337eaf84af8eac0fc6976047b01f3eed",
"assets/AssetManifest.bin.json": "0c8bd3135e23672b0df11f2fa16d2a55",
"assets/packages/bootstrap_icons/fonts/BootstrapIcons.ttf": "b2ba1585f0ec2d2725ec1c7f43d8d00e",
"assets/packages/font_awesome_flutter/lib/fonts/fa-solid-900.ttf": "db3f813ec9499155b3062dc1489f9a59",
"assets/packages/font_awesome_flutter/lib/fonts/fa-regular-400.ttf": "3ca5dc7621921b901d513cc1ce23788c",
"assets/packages/font_awesome_flutter/lib/fonts/fa-brands-400.ttf": "4769f3245a24c1fa9965f113ea85ec2a",
"assets/packages/esc_pos_utils/resources/capabilities.json": "ae5c3288b81125ab9c54fff02d30387e",
"assets/shaders/ink_sparkle.frag": "ecc85a2e95f5e9f53123dcaf8cb9b6ce",
"assets/AssetManifest.bin": "beb4ffff3913e1eb55ea4daa1db93e9e",
"assets/fonts/MaterialIcons-Regular.otf": "ca4b8422895caef3c944228d0d01f2a0",
"assets/assets/svg/flutter.svg": "aca9d2f1b543b968e0bae09f7294039e",
"assets/assets/svg/name_app.svg": "7acb112f0cc945dacced7f2af9e79981",
"assets/assets/svg/google.svg": "95e2a6d013d7b5dad7ce5d48e26b6be7",
"assets/assets/images/empty_cart.png": "a85fcd4ab5dec0f75a47abe0d69a6bc8",
"assets/assets/images/category.png": "6b98ddccb7266ef02fbc54a2c14ff939",
"assets/assets/images/Fondo%2520de%2520%25E2%2580%259Ctruck2%25E2%2580%259D%2520eliminado.png": "dfc62755b48d41e0d98a7cf80d868c4c",
"assets/assets/images/truck.webp": "866f52c395205c1225fee492a85b6f96",
"assets/assets/images/no-image.jpg": "588d9346b5f8bacef5cce7c184d6ec6d",
"assets/assets/images/tuali.jpg": "6b13efd13fa1d16e1ab59f762d4ee20d",
"assets/assets/images/jp.jpg": "1f452db266e5de6a50a3241805b98982",
"assets/assets/images/tresga_logo.png": "c733799799bb9e5712968f758f8f26db",
"assets/assets/images/background.jpg": "bdf51b4a87126da20ba5bd5b4c637836",
"assets/assets/images/ss.png": "0475828e5091b7df515225dfcbed650c",
"assets/assets/images/sh.png": "78bb8a0525a1996054182f16e7877053",
"assets/assets/images/coke_image.jpeg": "3f9a787e7329dbaaa429a4e1ed7a9f40",
"assets/assets/images/coin.svg": "d3c615d827be9d615359c698a8b6f80c",
"assets/assets/images/tuali_no_bg.png": "5b2e9a17e384ef707e5aea7f071d6dd3",
"assets/assets/images/logo.png": "280061a25e491cd2ab4a6ffd889bc66c",
"assets/assets/images/empty_2.png": "1c16508487b090e7b31afe8e0c572cb0",
"assets/assets/images/waiting.png": "596d91380a1e0d492b0b680127d472ee",
"assets/assets/images/backgroundf.webp": "3089ca5ad79511e5b42752abfe4b03b3",
"assets/assets/images/truck2.jpg": "97315013b7ca904c20272a58fb1eba96",
"assets/assets/images/not_found.png": "22a4da67bac14c199c180db4e0b3625d",
"assets/assets/images/bg.jpg": "e0d797daed444f3d93e9b049b49ad892",
"assets/assets/images/example.png": "2a0f34d920501764030d4b6e133e9303",
"canvaskit/skwasm.js": "ea559890a088fe28b4ddf70e17e60052",
"canvaskit/skwasm.js.symbols": "e72c79950c8a8483d826a7f0560573a1",
"canvaskit/canvaskit.js.symbols": "bdcd3835edf8586b6d6edfce8749fb77",
"canvaskit/skwasm.wasm": "39dd80367a4e71582d234948adc521c0",
"canvaskit/chromium/canvaskit.js.symbols": "b61b5f4673c9698029fa0a746a9ad581",
"canvaskit/chromium/canvaskit.js": "8191e843020c832c9cf8852a4b909d4c",
"canvaskit/chromium/canvaskit.wasm": "f504de372e31c8031018a9ec0a9ef5f0",
"canvaskit/canvaskit.js": "728b2d477d9b8c14593d4f9b82b484f3",
"canvaskit/canvaskit.wasm": "7a3f4ae7d65fc1de6a6e7ddd3224bc93"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"flutter_bootstrap.js",
"assets/AssetManifest.bin.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
