const CACHE_NAME='matecraft-shell-v2';
const SHELL=['/kids/ingles-ajedrez/practica/','/kids/ingles-ajedrez/practica/manifest.webmanifest'];
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE_NAME).then(cache=>cache.addAll(SHELL)).then(()=>self.skipWaiting())));
self.addEventListener('activate',event=>event.waitUntil(self.clients.claim()));
self.addEventListener('fetch',event=>{if(event.request.method!=='GET')return;if(event.request.mode==='navigate'||event.request.destination==='document'){event.respondWith(fetch(event.request).catch(()=>caches.match(event.request)));return}event.respondWith(caches.match(event.request).then(cached=>cached||fetch(event.request).then(response=>{const copy=response.clone();caches.open(CACHE_NAME).then(cache=>cache.put(event.request,copy));return response}).catch(()=>cached)))});
