const CACHE_NAME = 'matecraft-shell-v7';
const BASE = '/kids/ingles-ajedrez/practica/';
const PRECACHE = [
  "index.html",
  "app.js",
  "openings.js",
  "manifest.webmanifest?v=20261127-ui",
  "icon.svg",
  "vendor/chess.js/chess.js",
  "vendor/cm-chessboard/assets/chessboard.css",
  "vendor/cm-chessboard/assets/pieces/standard.svg",
  "vendor/cm-chessboard/src/Chessboard.js",
  "vendor/cm-chessboard/src/extensions/accessibility/Accessibility.js",
  "vendor/cm-chessboard/src/extensions/accessibility/I18n.js",
  "vendor/cm-chessboard/src/extensions/arrows/Arrows.js",
  "vendor/cm-chessboard/src/extensions/auto-border-none/AutoBorderNone.js",
  "vendor/cm-chessboard/src/extensions/html-layer/HtmlLayer.js",
  "vendor/cm-chessboard/src/extensions/markers/Markers.js",
  "vendor/cm-chessboard/src/extensions/markers/README.md",
  "vendor/cm-chessboard/src/extensions/persistence/Persistence.js",
  "vendor/cm-chessboard/src/extensions/piece-rotation/PieceRotation.js",
  "vendor/cm-chessboard/src/extensions/piece-rotation/README.md",
  "vendor/cm-chessboard/src/extensions/promotion-dialog/PromotionDialog.js",
  "vendor/cm-chessboard/src/extensions/right-click-annotator/RightClickAnnotator.js",
  "vendor/cm-chessboard/src/lib/Svg.js",
  "vendor/cm-chessboard/src/lib/Utils.js",
  "vendor/cm-chessboard/src/model/ChessboardState.js",
  "vendor/cm-chessboard/src/model/Extension.js",
  "vendor/cm-chessboard/src/model/Position.js",
  "vendor/cm-chessboard/src/view/ChessboardView.js",
  "vendor/cm-chessboard/src/view/PositionAnimationsQueue.js",
  "vendor/cm-chessboard/src/view/VisualMoveInput.js",
  "data/attraction.json",
  "data/clearance.json",
  "data/deflection.json",
  "data/discoveredAttack.json",
  "data/endgame.json",
  "data/fork.json",
  "data/interference.json",
  "data/intermezzo.json",
  "data/mateIn1.json",
  "data/mateIn2.json",
  "data/mateIn3.json",
  "data/mateIn4.json",
  "data/mateIn5.json",
  "data/pin.json",
  "data/sacrifice.json"
];
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(PRECACHE.map(path => BASE + path))).then(() => self.skipWaiting()));
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key.startsWith('matecraft-') && key !== CACHE_NAME).map(key => caches.delete(key)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET' || new URL(event.request.url).origin !== self.location.origin) return;
  if (event.request.mode === 'navigate' || event.request.destination === 'document') {
    event.respondWith(fetch(event.request).catch(() => caches.match(event.request).then(cached => cached || caches.match(BASE + 'index.html'))));
    return;
  }
  event.respondWith(caches.match(event.request).then(cached => cached || fetch(event.request).then(response => {
    if (response.ok) {
      const copy = response.clone();
      caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy));
    }
    return response;
  })));
});
