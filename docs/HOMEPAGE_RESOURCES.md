# Homepage WeLearn — Recursos Técnicos (Entregable A)

> Listado de recursos para construir el homepage "high-tech educativo premium" con motion cinematográfico **SEO/AEO-friendly**, sin WebGL pesado.
> Decisión D1 (locked): motion premium 2D, cero canvas 3D. Prioridad absoluta: Core Web Vitals + indexabilidad.
> **Titular:** el 95% se hace con lo que YA está instalado. Casi cero dependencias nuevas.

---

## 1. Filosofía técnica

**"Premium sin peso."** Cada recurso se elige por su relación impacto-visual / costo-en-performance. Si un efecto amenaza LCP/CLS/INP o la indexabilidad, se recorta el efecto, nunca el SEO. Todo motion:
- Se monta como **capa de mejora progresiva** sobre HTML SSR semántico.
- Respeta `prefers-reduced-motion`.
- Reserva espacio (sin layout shift) y difiere lo no-crítico.
- Nunca es el vehículo de contenido indexable.

---

## 2. Librerías — YA INSTALADAS (usar, no instalar)

| Paquete | Versión | Uso en el homepage |
|---|---|---|
| `framer-motion` | ^12.38 | Motor de todo el motion: reveals, stagger, parallax, layout, `useScroll`, `useTransform`, text mask, magnetic/tilt. **Base del sistema.** |
| `lenis` | ^1.3.23 | Scroll suave (smooth scroll) — la sensación "premium" del scroll cinematográfico. Ya usado en el proyecto. |
| `next` | 16.2.6 | SSR/RSC (Capa 1 indexable), `next/dynamic` (diferir Capa 2), `next/image`, metadata API, `next/font`. |
| `react` / `react-dom` | 19.2.4 | Server Components para el contenido SEO; Client Components solo para lo interactivo. |
| `lucide-react` | ^1.16 | Iconografía consistente (ya en uso). |
| `tailwindcss` | ^4 | Sistema de estilos/tokens. |
| `recharts` | ^3.8 | (Opcional) micro-visualización de datos si se quiere un gráfico de progreso/resultados. |

> **Motion primitives ya construidos** en `src/app/(site)/home/HomeAnimations.tsx`: `FadeUp`, `StaggerGrid/Item`, `HeroLeft/Item/Card`, `StatsRow/StatItem`, `StepRow`, `CountUp`, `TiltCard`, `TeamCard`, `TestimonialCard`. **Se reutilizan y amplían.** No reinventar.

---

## 3. Dependencias nuevas — evaluación (default: NINGUNA)

| Candidata | ¿Instalar? | Motivo |
|---|---|---|
| `three` / `@react-three/fiber` (WebGL) | ❌ NO | Contradice D1 (riesgo SEO/CWV). Prohibido. |
| `gsap` | ❌ NO (por defecto) | Framer Motion + Lenis cubren todo lo necesario. Solo reconsiderar si se pide un timeline scroll ultra-complejo. |
| `split-type` (animación letra a letra) | ⚠️ Opcional | Ligero (~2KB). Solo si el efecto de texto del hero lo exige y no se logra con CSS/Framer. Evaluar en Fase C. |
| `@number-flow/react` (conteo animado) | ⚠️ Opcional | `CountUp` propio ya existe; no hace falta. |
| `next-sitemap` | ❌ NO | Ya hay `sitemap.ts` y `robots.ts` nativos. |

**Conclusión:** el build arranca con **cero instalaciones**. Cualquier alta se justifica en su fase con presupuesto de KB.

---

## 4. Técnicas de motion (el "high-tech premium" concreto)

Cada técnica con su primitiva y su nota de performance:

| Técnica | Cómo | Sección | Perf |
|---|---|---|---|
| **Scroll reveals** (fade/slide/stagger) | `FadeUp`/`Stagger` (existen) | todas | `once:true`, GPU transform |
| **Hero text mask multilingüe** | `AnimatePresence` + máscara de texto rotando idioma | Hero | Arranca post-hidratación; H1 SSR estático primero (LCP seguro) |
| **Smooth scroll cinematográfico** | Lenis (existe) | global | Respetar reduced-motion |
| **Parallax por capas** | `useScroll` + `useTransform` (translateY) | hero, método, CTA | Solo `transform`, nunca `top`/`margin` |
| **Sticky scroll / scrollytelling ligero** | `position: sticky` + progreso con `useScroll` | Método (11 pasos → 4 fases) | CSS-first, JS mínimo |
| **Línea de tiempo que se "dibuja"** | `scaleY`/`pathLength` con scroll progress | Método | SVG + transform |
| **Count-up de stats** | `CountUp` (existe) | Franja de prueba | En viewport, una vez |
| **Magnetic buttons / hover premium** | `useMotionValue` + spring en el CTA | CTAs | Solo en `@media (hover:hover)` |
| **Tilt cards 3D-fake (CSS transform)** | `TiltCard` (existe) | idiomas, exámenes | `perspective` CSS, sin WebGL |
| **Marquee de sellos de examen** | CSS animation / Framer loop | Franja de prueba | `will-change` acotado |
| **Gradientes/mesh animados (CSS)** | CSS `@property` + keyframes o SVG | fondos de sección | CSS puro, 0 JS |
| **Number/progress meters** | Framer + SVG | resultados | ligero |

> **Regla de oro de motion:** animar solo `transform` y `opacity` (compositor GPU). Nunca animar propiedades que disparen layout/reflow.

---

## 5. Recursos visuales / assets a preparar (de David)

| Asset | Estado | Nota |
|---|---|---|
| Foto de David Duarte | ✅ existe (`public/images/david-duarte.jpg`) | Usar en Equipo con tratamiento editorial (duotono) |
| Foto de Zhanna Korzh | ⚠️ falta | Ideal para paridad visual en Equipo |
| Foto/render de la sede en Bucaramanga | ⚠️ falta | Refuerza `LocalBusiness` + confianza presencial |
| Logo WeLearn (SVG optimizado) | verificar | `public/images/welearn-logo.png` referido en schema; ideal SVG |
| Sellos/logos de exámenes | ⚠️ generar | IELTS, TOEFL, TOPIK, Goethe, DELF, CELPE-Bras, ICFES (versión monocroma para franja de prueba) |
| Reseñas reales (capturas/textos) | ⚠️ recolectar | Para testimonios + `AggregateRating` |
| Video corto de David (opcional) | ⚠️ pendiente (M4.2) | Si existe, `poster` + lazy, nunca autoplay pesado |
| Ilustración/iconografía de idiomas | usar Lucide + tipografía nativa | 한 · Fr · De… (ya en el catálogo actual) |

**Formatos e implementación:**
- Imágenes vía `next/image` (AVIF/WebP, `sizes`, dimensiones explícitas → CLS 0).
- Iconos: Lucide (SVG inline, tree-shakeable).
- Tipografía: `next/font` (Geist ya en uso) — self-hosted, sin FOUT, buen LCP. Considerar un display face de alto contraste para H1/H2 (self-hosted vía `next/font/local` si no es Google Font).

---

## 6. Recursos SEO / AEO (técnicos)

| Recurso | Estado | Acción |
|---|---|---|
| JSON-LD `@graph` | ✅ parcial en home | Ampliar: `LocalBusiness` (Bucaramanga, NAP), `AggregateRating` (real), `sameAs` (TikTok/IG), `Course` por idioma |
| `FAQPage` schema | ✅ existe | Ampliar con las 8 Q/A de `HOMEPAGE_KEYWORDS.md` §3 |
| `BreadcrumbList` | ✅ patrón en el sitio | Incluir |
| `sitemap.ts` / `robots.ts` | ✅ existen | Verificar que el home esté y priorizado |
| `opengraph-image.tsx` | ✅ existe (edge) | Mantener/actualizar |
| Metadata API (`title`/`description`/`canonical`) | ✅ existe | Reoptimizar con keywords de research |
| Core Web Vitals | ⚠️ medir | PageSpeed Insights móvil; meta > 90 |
| Rich Results Test | ⚠️ validar | Antes de cerrar |
| GTM eventos | ✅ base | Añadir eventos del blueprint §6 |

---

## 7. Presupuesto de performance (definición de "impecable")

| Métrica | Meta | Cómo se protege |
|---|---|---|
| LCP | < 2.5s (ideal < 2.0s) | H1 texto SSR = elemento LCP; motion diferido; imágenes optimizadas |
| CLS | < 0.1 | Dimensiones en imágenes; espacio reservado para animaciones |
| INP | < 200ms | JS mínimo en Client Components; hidratación selectiva |
| JS inicial (home) | Vigilar | RSC por defecto; `'use client'` solo donde hay interacción; `next/dynamic ssr:false` para Capa 2 |
| Lighthouse mobile | > 90 en las 4 categorías | QA en Fase D |
| Peso de dependencias nuevas | ~0 KB | Sin WebGL; altas justificadas por KB |

---

## 8. Lo que NO usamos (y por qué)
- ❌ **WebGL / Three.js / React Three Fiber** → riesgo LCP/CWV + contenido no indexable. (Decisión D1.)
- ❌ **Gate de navegador / página-canvas** (el patrón de cornrevolution) → invisible para Google/IA.
- ❌ **Autoplay de video pesado / sliders con librerías grandes** → peso y CLS.
- ❌ **Animaciones sobre propiedades que causan reflow** (`width`, `top`, `margin`).
- ❌ **Dependencias nuevas sin justificación de KB.**

---

## 9. Resumen para arrancar el build
1. **Stack:** Framer Motion + Lenis + Next 16 RSC + Tailwind v4 + `next/image`/`next/font`. **Cero instalaciones nuevas.**
2. **Reutilizar** los primitives de `HomeAnimations.tsx`; ampliarlos, no reemplazarlos.
3. **Assets a pedir a David:** foto Zhanna, foto sede, sellos de exámenes, reseñas reales, dirección exacta.
4. **Orden:** Fase A (estructura+copy+schema, sin motion) → B (sistema visual) → C (motion premium) → D (instrumentación + QA CWV). Cada fase verificable y commiteable por separado.

---

*Con este listado (A) y el research SERP (B), el homepage se puede codear sobre terreno firme, sin adivinar recursos ni contenido.*
