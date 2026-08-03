'use client';

/* ═══════════════════════════════════════════════════════════════════════════
   WeLearn · HeroPills — "que las pastillas se muevan"
   ───────────────────────────────────────────────────────────────────────────
   Decisiones de rendimiento (importan para el Lighthouse mobile > 90):

   1. SSR-safe. Las pastillas se renderizan en el HTML del servidor con su
      posición en `style`. No hay CLS y son rastreables por Google.
   2. Cero JS en el primer render. El motor arranca en requestIdleCallback,
      después del LCP. Si el JS nunca carga, la sección sigue siendo una
      lista de enlaces perfectamente usable.
   3. UN solo requestAnimationFrame para las 16 pastillas. No 16 MotionValues
      de Framer Motion: a esta cardinalidad, el rAF único es ~10x más barato.
   4. Solo se anima `transform` (compositor). Nunca left/top/width.
   5. IntersectionObserver pausa el bucle cuando la sección sale de viewport.
   6. prefers-reduced-motion apaga la deriva y el magnetismo, no el contenido.
   7. Sin hover magnético en táctil (pointer: coarse): sería ruido y batería.
   ═══════════════════════════════════════════════════════════════════════════ */

import { useEffect, useRef, useState, useCallback } from 'react';
import Link from 'next/link';

type Pill = {
  id: string;
  glyph?: string;
  label: string;
  href: string;
  x: number;      // % dentro del campo
  y: number;      // % dentro del campo
  depth: number;  // 0–1 · plano de profundidad (parallax + amplitud)
  exam?: boolean;
};

/* ── Datos ──────────────────────────────────────────────────────────────────
   Rutas verificadas contra las páginas y slugs reales del catálogo.          */
export const HERO_PILLS: Pill[] = [
  { id:'en', glyph:'En', label:'Inglés',    href:'/clases-de-ingles',    x:16, y:10, depth:1.0 },
  { id:'ko', glyph:'한', label:'Coreano',   href:'/clases-de-coreano',   x:58, y:4,  depth:.85 },
  { id:'fr', glyph:'Fr', label:'Francés',   href:'/clases-de-frances',   x:4,  y:33, depth:.7 },
  { id:'de', glyph:'De', label:'Alemán',    href:'/clases-de-aleman',    x:60, y:29, depth:1.0 },
  { id:'it', glyph:'It', label:'Italiano',  href:'/clases-de-italiano',  x:24, y:52, depth:.8 },
  { id:'pt', glyph:'Pt', label:'Portugués', href:'/clases-de-portugues', x:63, y:53, depth:.65 },
  { id:'ja', glyph:'日', label:'Japonés',   href:'/practica/japones',    x:8,  y:71, depth:.9 },
  { id:'ru', glyph:'Ру', label:'Ruso',      href:'/practica/ruso',       x:47, y:76, depth:.75 },

  { id:'ielts',  label:'IELTS',      href:'/examenes/ielts',         x:38, y:20, depth:.55, exam:true },
  { id:'toefl',  label:'TOEFL',      href:'/examenes/toefl',         x:78, y:16, depth:.5,  exam:true },
  { id:'icfes',  label:'ICFES',      href:'/preparacion-icfes',     x:36, y:38, depth:.6,  exam:true },
  { id:'topik',  label:'TOPIK',      href:'/examenes/topik',         x:80, y:41, depth:.45, exam:true },
  { id:'goethe', label:'Goethe',     href:'/examenes/goethe',        x:44, y:63, depth:.55, exam:true },
  { id:'delf',   label:'DELF',       href:'/examenes/delf-dalf',     x:2,  y:53, depth:.5,  exam:true },
  { id:'cils',   label:'CILS',       href:'/examenes/cils-celi',     x:74, y:68, depth:.45, exam:true },
  { id:'celpe',  label:'CELPE‑Bras', href:'/examenes/celpe-bras',   x:20, y:88, depth:.5, exam:true },
];

/* ── Parámetros del sistema de movimiento ──────────────────────────────────
   Estos cuatro números SON la identidad del movimiento. Tocarlos cambia la
   personalidad de la marca; documentarlos evita que se toquen por accidente. */
const SPRING_K = 0.14;   // rigidez del resorte magnético
const SPRING_D = 0.76;   // amortiguación (1 = sin fricción)
const MAGNET_R = 150;    // radio de atracción, px
const MAGNET_MAX = 16;   // desplazamiento máximo, px

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

type Node = {
  el: HTMLAnchorElement;
  depth: number;
  ax: number; ay: number;   // amplitud de la órbita
  px: number; py: number;   // período de la órbita, ms
  ph: number;               // fase
  mx: number; my: number;   // offset magnético actual
  vx: number; vy: number;   // velocidad del resorte
  near: boolean;
};

export default function HeroPills({
  onSelect,
  activeId = null,
}: {
  onSelect?: (id: string) => void;
  activeId?: string | null;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const nodesRef = useRef<Node[]>([]);
  const rafRef = useRef<number | null>(null);
  const runningRef = useRef(false);
  const idleReadyRef = useRef(false);
  const visibleRef = useRef(true);
  const t0Ref = useRef(0);
  const pointerRef = useRef({ x: -9999, y: -9999, inside: false });
  const activeRef = useRef<string | null>(activeId);
  const [reduced, setReduced] = useState(false);

  useEffect(() => { activeRef.current = activeId; }, [activeId]);

  /* ── prefers-reduced-motion ─────────────────────────────────────────────── */
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const on = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);

  /* ── Bucle de animación ─────────────────────────────────────────────────── */
  const tick = useCallback((now: number) => {
    const t = now - t0Ref.current;
    const compact = window.matchMedia('(max-width: 760px)').matches;
    const fine = window.matchMedia('(pointer: fine)').matches;
    const p = pointerRef.current;

    for (const n of nodesRef.current) {
      // 1 · idle drift — órbita de Lissajous, amplificada si hay foco en otra
      const amp = (activeRef.current ? 1.35 : 1) * (compact ? 0.5 : 1);
      const dx = compact ? 0 : Math.sin(t / n.px + n.ph) * n.ax * amp * n.depth;
      const dy = Math.cos(t / n.py + n.ph * 1.7) * n.ay * amp * n.depth;

      // 2 · hover magnético — atrae de cerca, aparta en el borde del radio
      let tx = 0, ty = 0, near = false;
      if (fine && p.inside && !n.el.dataset.active) {
        const r = n.el.getBoundingClientRect();
        const ox = p.x - (r.left + r.width / 2);
        const oy = p.y - (r.top + r.height / 2);
        const dist = Math.hypot(ox, oy);
        if (dist < MAGNET_R && dist > 0.5) {
          const f = 1 - dist / MAGNET_R;
          const pull = f * f;                                   // caída cuadrática
          const hovering = dist < r.width * 0.62;
          const sign = hovering ? 1 : (f > 0.55 ? 1 : -0.42);   // atrae / aparta
          tx = (ox / dist) * pull * MAGNET_MAX * sign;
          ty = (oy / dist) * pull * MAGNET_MAX * sign;
          near = hovering;
        }
      }

      n.vx = (n.vx + (tx - n.mx) * SPRING_K) * SPRING_D;
      n.vy = (n.vy + (ty - n.my) * SPRING_K) * SPRING_D;
      n.mx += n.vx; n.my += n.vy;

      n.el.style.transform =
        `translate3d(${(dx + n.mx).toFixed(2)}px,${(dy + n.my).toFixed(2)}px,0)` +
        (near ? ' scale(1.07)' : '');

      if (near !== n.near) {
        n.near = near;
        n.el.classList.toggle('is-near', near);
      }
    }
    rafRef.current = requestAnimationFrame(tick);
  }, []);

  const start = useCallback(() => {
    if (
      runningRef.current ||
      reduced ||
      !idleReadyRef.current ||
      !visibleRef.current ||
      document.hidden
    ) return;
    runningRef.current = true;
    t0Ref.current = performance.now() - 4000;   // entra con las órbitas ya dispersas
    rafRef.current = requestAnimationFrame(tick);
  }, [tick, reduced]);

  const stop = useCallback(() => {
    runningRef.current = false;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = null;
  }, []);

  /* ── Montaje: construir nodos y arrancar DESPUÉS del primer render ──────── */
  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    nodesRef.current = Array.from(
      wrap.querySelectorAll<HTMLAnchorElement>('.wlp-pill')
    ).map((el, i) => ({
      el, depth: Number(el.dataset.depth ?? 1),
      ax: 6 + (i % 5) * 2.2,              // 6 → 14.8 px
      ay: 5 + ((i * 3) % 5) * 2.0,        // 5 → 13 px
      px: 9000 + (i % 7) * 1450,          // 9 → 17.7 s
      py: 11000 + ((i * 5) % 6) * 1300,   // 11 → 17.5 s
      ph: (i * 1.618) % (Math.PI * 2),    // fase áurea ⇒ nunca sincronizan
      mx: 0, my: 0, vx: 0, vy: 0, near: false,
    }));

    if (reduced) {
      nodesRef.current.forEach(n => { n.el.style.transform = ''; });
      return;
    }

    // El hero es el LCP: no competimos con él.
    const handle = scheduleIdle(() => {
      idleReadyRef.current = true;
      start();
    }, 900, 400);

    const io = new IntersectionObserver(
      es => {
        visibleRef.current = es[0].isIntersecting;
        visibleRef.current ? start() : stop();
      },
      { threshold: 0 }
    );
    io.observe(wrap);

    const onVis = () => (document.hidden ? stop() : start());
    document.addEventListener('visibilitychange', onVis);

    return () => {
      idleReadyRef.current = false;
      stop(); io.disconnect();
      document.removeEventListener('visibilitychange', onVis);
      cancelIdle(handle);
    };
  }, [start, stop, reduced]);

  /* ── Puntero ────────────────────────────────────────────────────────────── */
  const onMove = (e: React.PointerEvent) => {
    pointerRef.current = { x: e.clientX, y: e.clientY, inside: true };
  };
  const onLeave = () => { pointerRef.current.inside = false; };

  return (
    <div
      ref={wrapRef}
      className={`wlp-field${activeId ? ' is-rail' : ''}`}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      role="group"
      aria-label="Idiomas y exámenes que enseñamos"
    >
      {HERO_PILLS.map(p => {
        const active = activeId === p.id;
        return (
          <Link
            key={p.id}
            href={p.href}
            data-depth={p.depth}
            data-active={active ? '1' : undefined}
            aria-current={active ? 'true' : undefined}
            className={
              'wlp-pill' +
              (p.exam ? ' wlp-pill--exam' : '') +
              (active ? ' is-active' : '') +
              (activeId && !active ? ' is-dim' : '')
            }
            style={{ left: `${p.x}%`, top: `${p.y}%` }}
            onClick={e => {
              // Progressive enhancement: sin JS es un enlace normal.
              if (!onSelect) return;
              if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
              e.preventDefault();
              onSelect(p.id);
            }}
          >
            {p.glyph && <span className="wlp-pill__glyph">{p.glyph}</span>}
            <span className="wlp-pill__lbl">{p.label}</span>
          </Link>
        );
      })}
    </div>
  );
}
