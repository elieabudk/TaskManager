const CACHE_NAME = 'my-pwa-cache-v1';
const urlsToCache = [
  '/',
  '/login.html',
  '/stilo_password.css',
  '/inicio_registr_front.js',
  '/script2.js'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  // No interceptar peticiones de API y AUTH para evitar problemas con autenticación
  if (event.request.url.includes('/api/') || event.request.url.includes('/auth/')) {
    return;
  }
  
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response;
        }
        // Configurar fetch para seguir redirecciones
        return fetch(event.request, {
          redirect: 'follow'
        });
      })
  );
});