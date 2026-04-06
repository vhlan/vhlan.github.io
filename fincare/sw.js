// FinCare Service Worker v1.0
// Strategi: Cache-First untuk aset statis, Network-First untuk CDN

const CACHE_NAME = 'fincare-v1';
const RUNTIME_CACHE = 'fincare-runtime-v1';

// Aset lokal yang di-cache saat install
const PRECACHE_ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icons/icon-72x72.png',
  './icons/icon-96x96.png',
  './icons/icon-128x128.png',
  './icons/icon-144x144.png',
  './icons/icon-152x152.png',
  './icons/icon-192x192.png',
  './icons/icon-384x384.png',
  './icons/icon-512x512.png',
];

// CDN assets yang di-cache saat pertama kali diakses
const CDN_URLS = [
  'https://cdn.tailwindcss.com',
  'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js',
];

// ===================== INSTALL =====================
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(PRECACHE_ASSETS))
      .then(() => self.skipWaiting())
  );
});

// ===================== ACTIVATE =====================
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME && name !== RUNTIME_CACHE)
          .map((name) => caches.delete(name))
      );
    }).then(() => self.clients.claim())
  );
});

// ===================== FETCH — Strategi Caching =====================
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET & browser-extension
  if (request.method !== 'GET') return;
  if (url.protocol === 'chrome-extension:') return;

  // Google Fonts — Stale While Revalidate
  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    event.respondWith(staleWhileRevalidate(request, RUNTIME_CACHE));
    return;
  }

  // CDN Libraries — Cache First (jarang berubah)
  if (isCdnAsset(request.url)) {
    event.respondWith(cacheFirst(request, RUNTIME_CACHE));
    return;
  }

  // Aset lokal — Cache First
  if (url.origin === self.location.origin) {
    event.respondWith(cacheFirst(request, CACHE_NAME));
    return;
  }

  // Lainnya — Network First dengan fallback
  event.respondWith(networkFirst(request));
});

// ===================== STRATEGI =====================

async function cacheFirst(request, cacheName) {
  const cached = await caches.match(request);
  if (cached) return cached;
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    return new Response('Offline — aset tidak tersedia', { status: 503 });
  }
}

async function networkFirst(request) {
  try {
    const response = await fetch(request);
    return response;
  } catch {
    const cached = await caches.match(request);
    return cached || new Response('Offline', { status: 503 });
  }
}

async function staleWhileRevalidate(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  const networkFetch = fetch(request).then((response) => {
    if (response.ok) cache.put(request, response.clone());
    return response;
  }).catch(() => {});
  return cached || networkFetch;
}

function isCdnAsset(url) {
  return CDN_URLS.some((cdn) => url.startsWith(cdn)) ||
    url.includes('cdnjs.cloudflare.com') ||
    url.includes('cdn.tailwindcss.com');
}

// ===================== PUSH NOTIFICATION =====================
self.addEventListener('push', (event) => {
  let data = {
    title: 'FinCare',
    body: 'Ada notifikasi baru dari FinCare',
    icon: './icons/icon-192x192.png',
    badge: './icons/icon-96x96.png',
    tag: 'fincare-notif',
    data: { url: './' }
  };

  if (event.data) {
    try {
      const payload = event.data.json();
      data = { ...data, ...payload };
    } catch {
      data.body = event.data.text();
    }
  }

  const options = {
    body: data.body,
    icon: data.icon,
    badge: data.badge,
    tag: data.tag,
    renotify: true,
    requireInteraction: false,
    vibrate: [200, 100, 200],
    data: data.data,
    actions: [
      { action: 'open', title: '📊 Buka App' },
      { action: 'dismiss', title: 'Tutup' }
    ]
  };

  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

// ===================== NOTIFICATION CLICK =====================
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === 'dismiss') return;

  const targetUrl = (event.notification.data && event.notification.data.url) || './';

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true })
      .then((clientList) => {
        // Fokus ke tab yang sudah ada
        for (const client of clientList) {
          if (client.url.includes('fincare') && 'focus' in client) {
            return client.focus();
          }
        }
        // Buka tab baru
        if (clients.openWindow) {
          return clients.openWindow(targetUrl);
        }
      })
  );
});

// ===================== BACKGROUND SYNC (future-ready) =====================
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-transactions') {
    // Placeholder untuk sinkronisasi data di masa depan
    event.waitUntil(Promise.resolve());
  }
});

// ===================== MESSAGE dari halaman =====================
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  if (event.data && event.data.type === 'SCHEDULE_NOTIFICATION') {
    // Terima jadwal notifikasi dari halaman utama
    const { title, body, delay } = event.data;
    setTimeout(() => {
      self.registration.showNotification(title, {
        body,
        icon: './icons/icon-192x192.png',
        badge: './icons/icon-96x96.png',
        vibrate: [200, 100, 200],
        tag: 'fincare-scheduled'
      });
    }, delay || 0);
  }
});
