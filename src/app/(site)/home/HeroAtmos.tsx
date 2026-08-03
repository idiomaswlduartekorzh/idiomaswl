'use client';

/* ═══════════════════════════════════════════════════════════════════════════
   WeLearn · HeroAtmos — capa de atmósfera del hero
   ───────────────────────────────────────────────────────────────────────────
   Sustituye/complementa a `.wlh-hero__aurora`. Estrategia de tres niveles,
   de más barato a más caro, y NUNCA bloquea el LCP:

   nivel 0 — gradientes CSS (los orbes que ya existen). 0 bytes de red.
   nivel 1 — imagen AVIF/WebP de aurora (~6–11 KB). Es el poster del video.
   nivel 2 — loop de video (50 KB webm / 176 KB mp4), y SOLO si:
             · no hay prefers-reduced-motion
             · no hay Save-Data ni conexión 2g/3g
             · el hero está en viewport
             · ya pasó el LCP (lo montamos en requestIdleCallback)

   El <video> se monta después del primer render, con preload="none", muted,
   playsInline y loop. Si algo falla, se queda el nivel 1 y nadie se entera.
   ═══════════════════════════════════════════════════════════════════════════ */

import { useEffect, useState } from 'react';

type Conn = { saveData?: boolean; effectiveType?: string };

/* ─────────────────────────────────────────────────────────────────────────────
   `'requestIdleCallback' in window` NO sirve como comprobación aquí: lib.dom
   ya declara esa propiedad en `Window`, así que TypeScript deduce que la rama
   `else` es imposible y estrecha `window` a `never` — de ahí el error
   "Property 'setTimeout' does not exist on type 'never'".
   Comprobar el `typeof` de la propiedad consulta lo mismo en runtime sin
   estrechar `window`, y de paso quita los casts `as number`.
   ────────────────────────────────────────────────────────────────────────── */
type IdleHandle = { idle: boolean; id: number };

const scheduleIdle = (fn: () => void, timeout: number, fallbackMs: number): IdleHandle =>
  typeof window.requestIdleCallback === 'function'
    ? { idle: true,  id: window.requestIdleCallback(fn, { timeout }) }
    : { idle: false, id: window.setTimeout(fn, fallbackMs) };

const cancelIdle = (h: IdleHandle): void => {
  if (h.idle && typeof window.cancelIdleCallback === 'function') window.cancelIdleCallback(h.id);
  else window.clearTimeout(h.id);
};

export default function HeroAtmos({
  poster = '/atmos/hero-aurora',
  video = '/atmos/aurora-loop',
}: { poster?: string; video?: string }) {
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const c = (navigator as Navigator & { connection?: Conn }).connection;
    if (c?.saveData) return;
    if (c?.effectiveType && /2g|3g/.test(c.effectiveType)) return;

    // Pantallas pequeñas: el video es puro coste, la imagen ya cuenta la historia.
    if (window.innerWidth < 900) return;

    const handle = scheduleIdle(() => setShowVideo(true), 2500, 1600);

    return () => cancelIdle(handle);
  }, []);

  return (
    <div className="wlh-hero__aurora wlp-atmos" aria-hidden="true">
      {/* nivel 1 — siempre presente, es el poster */}
      <picture>
        <source srcSet={`${poster}.avif`} type="image/avif" />
        <img src={`${poster}.webp`} alt="" decoding="async" fetchPriority="low" />
      </picture>

      {/* nivel 2 — solo cuando se cumplen todas las condiciones */}
      {showVideo && (
        <video
          className="wlp-atmos__vid"
          autoPlay muted loop playsInline
          preload="none"
          poster={`${poster}.webp`}
          onCanPlay={e => (e.currentTarget.style.opacity = '1')}
        >
          <source src={`${video}.webm`} type="video/webm" />
          <source src={`${video}.mp4`} type="video/mp4" />
        </video>
      )}

      {/* nivel 0 — los orbes CSS que ya existían, encima de todo */}
      <span className="wlp-atmos__orb wlp-atmos__orb--a" />
      <span className="wlp-atmos__orb wlp-atmos__orb--b" />
    </div>
  );
}
