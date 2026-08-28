const CACHE_NAME = 'manos-abiertas-v2';
const STATIC_CACHE = 'static-v2';
const DYNAMIC_CACHE = 'dynamic-v2';
const API_CACHE = 'api-v2';
const IMAGE_CACHE = 'images-v2';

const STATIC_ASSETS = [
  '/',
  '/manifest.json',
  '/offline.html',
  '/icon-192.png',
  '/icon-512.png'
];

const CACHE_STRATEGIES = {
  static: 'cache-first',
  api: 'network-first',
  images: 'stale-while-revalidate',
  fonts: 'cache-first',
  dynamic: 'network-first'
};

const CACHE_EXPIRY = {
  static: 30 * 24 * 60 * 60 * 1000, // 30 days
  api: 5 * 60 * 1000, // 5 minutes
  images: 7 * 24 * 60 * 60 * 1000, // 7 days
  fonts: 30 * 24 * 60 * 60 * 1000, // 30 days
  dynamic: 24 * 60 * 60 * 1000 // 1 day
};

interface CacheEntry {
  response: Response;
  timestamp: number;
  etag?: string;
}

const cacheStorage = {
  async get(cacheName: string, request: Request): Promise<Response | undefined> {
    const cache = await caches.open(request.cache || CACHE_NAME);
    const response = await cache.match(request);
    if (!response) return undefined;

    const cached = await cache.match(request);
    if (!cached) return undefined;

    const cloned = cached.clone();
    const cachedData = await cloned.json().catch(() => ({ timestamp: Date.now() }));
    
    if (cachedData.timestamp && Date.now() - cachedData.timestamp > this.getExpiry(request.url)) {
      await this.delete(request);
      return undefined;
    }

    return cached;
  },

  async put(cacheName: string, request: Request, response: Response): Promise<void> {
    const cache = await caches.open(this.getCacheName(request.url));
    const responseToStore = response.clone();
    const metadata = {
      timestamp: Date.now(),
      url: request.url,
      headers: Object.fromEntries(response.headers.entries())
    };
    
    const responseWithMeta = new Response(responseToStore.body, {
      status: response.status,
      statusText: response.statusText,
      headers: {
        ...Object.fromEntries(response.headers.entries()),
        'sw-timestamp': Date.now().toString()
      }
    });

    await cache.put(request, responseWithMeta);
  },

  async delete(request: Request): Promise<void> {
    const cache = await caches.open(this.getCacheName(request.url));
    await cache.delete(request);
  },

  getCacheName(url: string): string {
    try {
      const urlObj = new URL(url);
      const pathname = urlObj.pathname;
      
      if (pathname.startsWith('/api/')) return 'api';
      if (pathname.match(/\.(png|jpg|jpeg|webp|avif|svg|gif)$/i)) return 'images';
      if (pathname.match(/\.(woff|woff2|ttf|eot)$/i)) return 'fonts';
      if (pathname === '/' || pathname.startsWith('/_next/static/')) return 'static';
      return 'dynamic';
    } catch {
      return 'dynamic';
    }
  },

  getExpiry(url: string): number {
    const cacheType = this.getCacheName(url);
    const expiries: Record<string, number> = {
      static: 30 * 24 * 60 * 60 * 1000,
      api: 5 * 60 * 1000,
      images: 7 * 24 * 60 * 60 * 1000,
      fonts: 30 * 24 * 60 * 60 * 1000,
      dynamic: 24 * 60 * 60 * 1000
    };
    return expiries[cacheType] || 24 * 60 * 60 * 1000;
  }
};

async function fetchWithCache(request: Request): Promise<Response> {
  const cacheName = cacheStorage.getCacheName(request.url);
  const cache = await caches.open(cacheName);
  
  const cachedResponse = await cache.match(request);
  if (cachedResponse) {
    const cachedData = await cachedResponse.clone().json().catch(() => ({ timestamp: Date.now() }));
    const expiry = getExpiryForUrl(request.url);
    
    if (cachedData.timestamp && Date.now() - cachedData.timestamp < getExpiry(request.url)) {
      return cachedResponse;
    }
  }

  try {
    const networkResponse = await fetch(request.clone());
    
    if (networkResponse.ok) {
      const cache = await caches.open(cacheStorage.getCacheName(request.url));
      const responseToCache = networkResponse.clone();
      const metadata = {
        timestamp: Date.now(),
        headers: Object.fromEntries(networkResponse.headers.entries())
      };
      
      const responseToStore = new Response(networkResponse.body, {
        status: networkResponse.status,
        statusText: networkResponse.statusText,
        headers: {
          ...Object.fromEntries(networkResponse.headers.entries()),
          'sw-timestamp': Date.now().toString()
        }
      });
      
      const cache = await caches.open(cacheName);
      await cache.put(request, responseToCache);
    }
    
    return networkResponse;
  } catch (error) {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    if (request.mode === 'navigate') {
      return caches.match('/offline.html');
    }
    
    throw new Error('Network error and no cache available');
  }
}

function getCacheName(url: string): string {
  try {
    const urlObj = new URL(url);
    const pathname = urlObj.pathname;
    
    if (pathname.startsWith('/api/')) return 'api';
    if (pathname.match(/\.(png|jpg|jpeg|webp|avif|svg|gif)$/i)) return 'images';
    if (pathname.match(/\.(woff|woff2|ttf|eot)$/i)) return 'fonts';
    if (pathname === '/' || pathname.startsWith('/_next/static/')) return 'static';
    return 'dynamic';
  } catch {
    return 'dynamic';
  }
}

function getExpiry(url: string): number {
  const cacheType = getCacheName(url);
  const expiries: Record<string, number> = {
    static: 30 * 24 * 60 * 60 * 1000,
    api: 5 * 60 * 1000,
    images: 7 * 24 * 60 * 60 * 1000,
    fonts: 30 * 24 * 60 * 60 * 1000,
    dynamic: 24 * 60 * 60 * 1000
  };
  return expiries[cacheType] || 24 * 60 * 60 * 1000;
}

async function handleAPIRequest(request: Request): Promise<Response> {
  const url = new URL(request.url);
  
  if (request.method === 'GET') {
    const cached = await caches.match(request);
    if (cached) {
      const cachedData = await cached.clone().json().catch(() => ({ timestamp: Date.now() }));
      if (cachedData.timestamp && Date.now() - cachedData.timestamp < 5 * 60 * 1000) {
        return cachedResponse;
      }
    }
    
    try {
      const response = await fetch(request);
      if (response.ok) {
        const cache = await caches.open('api');
        const responseToCache = response.clone();
        const metadata = {
          timestamp: Date.now(),
          headers: Object.fromEntries(response.headers.entries())
        };
        
        const responseToCache = new Response(response.body, {
          status: response.status,
          statusText: response.statusText,
          headers: {
            ...Object.fromEntries(response.headers.entries()),
            'sw-timestamp': Date.now().toString()
          }
        });
        
        const cache = await caches.open('api');
        await cache.put(request, responseToCache);
      }
      return response;
    } catch {
      const cached = await caches.match(request);
      if (cached) return cached;
      return new Response(JSON.stringify({ error: 'Offline' }), { status: 503, headers: { 'Content-Type': 'application/json' } });
    }
  }
  
  try {
    const response = await fetch(request);
    return response;
  } catch {
    return new Response(JSON.stringify({ error: 'Offline', offline: true }), { 
      status: 503, 
      headers: { 'Content-Type': 'application/json' } 
    });
  }
}

async function handleImageRequest(request: Request): Promise<Response> {
  const cachedResponse = await caches.match(request);
  if (cachedResponse) {
    const cachedData = await cachedResponse.clone().json().catch(() => ({ timestamp: Date.now() }));
    if (cachedData.timestamp && Date.now() - cachedData.timestamp < 7 * 24 * 60 * 60 * 1000) {
      return cachedResponse;
    }
  }

  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open('images');
      const responseToCache = response.clone();
      const responseToStore = new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers: {
          ...Object.fromEntries(response.headers.entries()),
          'sw-timestamp': Date.now().toString()
        }
      });
      const cache = await caches.open('images');
      await cache.put(request, responseToCache);
    }
    return response;
  } catch {
    const cached = await caches.match(request);
    if (cached) return cached;
    return new Response('', { status: 503 });
  }
}

async function handleStaticRequest(request: Request): Promise<Response> {
  const cachedResponse = await caches.match(request);
  if (cachedResponse) return cachedResponse;

  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open('static');
      await cache.put(request, response.clone());
    }
    return response;
  } catch {
    const cached = await caches.match(request);
    if (cached) return cached;
    if (request.mode === 'navigate') {
      return caches.match('/offline.html');
    }
    throw new Error('Offline and no cache');
  }
}

async function handleDynamicRequest(request: Request): Promise<Response> {
  const cachedResponse = await caches.match(request);
  if (cachedResponse) {
    const cachedData = await cachedResponse.clone().json().catch(() => ({ timestamp: Date.now() }));
    if (cachedData.timestamp && Date.now() - cachedData.timestamp < 24 * 60 * 60 * 1000) {
      return cachedResponse;
    }
  }

  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open('dynamic');
      const responseToCache = response.clone();
      const responseToStore = new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers: {
          ...Object.fromEntries(response.headers.entries()),
          'sw-timestamp': Date.now().toString()
        }
      });
      const cache = await caches.open('dynamic');
      await cache.put(request, responseToCache);
    }
    return response;
  } catch {
    const cached = await caches.match(request);
    if (cached) return cached;
    if (request.mode === 'navigate') {
      return caches.match('/offline.html');
    }
    throw new Error('Offline and no cache');
  }
}

self.addEventListener('install', (event: ExtendableEvent) => {
  event.waitUntil(
    Promise.all([
      caches.open('static').then(cache => cache.addAll([
        '/',
        '/manifest.json',
        '/offline.html',
        '/icon-192.png',
        '/icon-512.png'
      ])),
      caches.open('static').then(cache => cache.addAll([
        '/icon-72.png',
        '/icon-96.png',
        '/icon-128.png',
        '/icon-144.png',
        '/icon-152.png',
        '/icon-192.png',
        '/icon-384.png',
        '/icon-512.png'
      ]))
    ]).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event: ExtendableEvent) => {
  event.waitUntil(
    Promise.all([
      caches.keys().then(keys => {
        return Promise.all(
          keys.filter(key => !['static', 'dynamic', 'api', 'images', 'fonts'].includes(key))
            .map(key => caches.delete(key))
        );
      }),
      clients.claim()
    ]);
  });
});

self.addEventListener('fetch', (event: FetchEvent) => {
  const { request } = event;
  const url = new URL(request.url);

  if (url.origin !== location.origin) {
    return;
  }

  if (request.method !== 'GET' && request.method !== 'HEAD') {
    return;
  }

  const pathname = new URL(request.url).pathname;

  if (pathname.startsWith('/api/')) {
    event.respondWith(handleAPIRequest(request));
    return;
  }

  if (pathname.match(/\.(png|jpg|jpeg|webp|avif|svg|gif|ico)$/i)) {
    event.respondWith(handleImageRequest(request));
    return;
  }

  if (pathname.match(/\.(woff|woff2|ttf|eot)$/i)) {
    event.respondWith(handleStaticRequest(request));
    return;
  }

  if (pathname === '/' || pathname.startsWith('/_next/static/') || pathname.match(/\.(css|js|map)$/)) {
    event.respondWith(handleStaticRequest(request));
    return;
  }

  event.respondWith(handleDynamicRequest(request));
});

self.addEventListener('message', (event: ExtendableMessageEvent) => {
  if (event.data?.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data?.type === 'CLEAR_CACHE') {
    caches.keys().then(keys => {
      Promise.all(
        keys.filter(k => !['static', 'dynamic', 'api', 'images', 'fonts'].includes(k))
          .map(key => caches.delete(key))
      );
    });
  }
  
  if (event.data?.type === 'SYNC_NOW') {
    event.waitUntil(syncData());
  }
});

async function syncData(): Promise<void> {
  const registration = await self.registration;
  if ('sync' in registration) {
    await registration.sync.register('sync-data');
  }
}

self.addEventListener('sync', (event: SyncEvent) => {
  if (event.tag === 'sync-data') {
    event.waitUntil(syncOfflineData());
  }
});

async function syncOfflineData(): Promise<void> {
  // Sync offline data to server
  console.log('Syncing offline data...');
}

self.addEventListener('push', (event: PushEvent) => {
  if (!event.data) return;

  const data = event.data.json();
  const options: NotificationOptions = {
    body: data.body || 'Nueva notificación de Manos Abiertas',
    icon: '/icon-192.png',
    badge: '/icon-72.png',
    vibrate: [200, 100, 200],
    data: data.data || {},
    actions: data.actions || [],
    requireInteraction: data.requireInteraction || false,
    silent: data.silent || false,
    tag: data.tag || 'manos-abiertas-notification',
    renotify: true
  };

  event.waitUntil(
    self.registration.showNotification(data.title || 'Manos Abiertas', options)
  );
}

self.addEventListener('notificationclick', (event: NotificationEvent) => {
  event.notification.close();
  
  const data = event.notification.data;
  const action = event.action;
  
  let url = '/';
  if (data.url) url = data.url;
  else if (action === 'open') url = data.url || '/';
  else if (action === 'dismiss') return;

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true })
      .then(windowClients => {
        for (const client of windowClients) {
          if (client.url === url && 'focus' in client) {
            return client.focus();
          }
        }
        return clients.openWindow(url);
      })
  );
}

self.addEventListener('notificationclose', (event: NotificationEvent) => {
  console.log('Notification closed:', event.notification.tag);
});

self.addEventListener('periodicsync', (event: SyncEvent) => {
  if (event.tag === 'content-update') {
    event.waitUntil(updateContent());
  }
});

async function updateContent(): Promise<void> {
  console.log('Updating content in background...');
}

declare const self: ServiceWorkerGlobalScope;
declare const clients: Clients;
declare const caches: CacheStorage;
declare const caches: CacheStorage;