@AGENTS.md

---

# Idiomas WeLearn — Memoria Técnica del Proyecto

## Quién es WeLearn

Academia de idiomas online con sede en Bucaramanga, Colombia. Fundadores: **José David Duarte Silva** (políglota 8 idiomas, cara visible) y **Zhanna Korzh** (directora académica). Producto: clases de idiomas (inglés, coreano, francés, alemán, italiano, portugués) + preparación de exámenes (IELTS, TOEFL, ICFES, Goethe, DELF, CILS, CELPE-Bras) + plataforma con método propio de 17 pasos. Sitio: **idiomaswl.com**.

---

## Stack técnico

| Capa | Tecnología |
|------|-----------|
| Framework | Next.js 16.2.6 (App Router, `src/` layout) |
| Runtime | React 19.2.4 + TypeScript 5 |
| CSS | Tailwind CSS v4 (PostCSS plugin) |
| Animaciones | Framer Motion 12 + Lenis (scroll suave) |
| Audio | WaveSurfer.js 7 + @wavesurfer/react |
| Auth + DB | Supabase (`@supabase/ssr` + `@supabase/supabase-js`) |
| UI icons | Lucide React |
| Charts | Recharts |
| Hangul | hangul-js (romanización coreana) |
| Build | Next.js built-in (webpack/turbopack) |
| Deploy | Vercel |

## Estructura de carpetas clave

```
src/
  app/
    (site)/           ← páginas públicas: home, examenes, precios, metodo, practica, dashboard
    (auth)/           ← login, registro
    courses/[lang]/step/[stepId]  ← lecciones del método
    api/practica/submit-audio     ← API route para evaluación de pronunciación
    auth/callback/    ← callback OAuth de Supabase
  components/
    lesson/           ← motor de lecciones (stages step001–step007, engine, grammar)
  data/               ← exams.ts, stepsMeta.ts, korean-cycle-texts.ts
  lib/                ← clientes Supabase (admin/client/server), actions, storage.ts
  middleware.ts       ← protege /dashboard/ (requiere sesión Supabase)
public/
  assets/korean/      ← assets de audio/imagen por step (step001–step019+)
  audio/              ← audios generales
  ielts/              ← material IELTS
  images/             ← logos, avatares
  google83bce1714af81f14.html  ← Search Console
```

## Medición instalada (NO TOCAR)

| Herramienta | ID / Archivo | Estado |
|-------------|-------------|--------|
| Google Tag Manager | GTM-57NXLPZV | En `src/app/layout.tsx` — noscript + afterInteractive script |
| Google Search Console | google83bce1714af81f14.html | En `/public/` |
| Meta Pixel | 1295707616059871 | Vía GTM |
| Google Analytics 4 | — | Vía GTM |

## Auth / Backend

- Supabase ya integrado: `src/lib/supabase/` tiene admin.ts (service role), client.ts (browser), server.ts (SSR)
- Middleware protege `/dashboard/:path*` → redirige a `/login`
- Variables de entorno: en Vercel y `.env.local` local (no commitear)

---

## Decisiones de producto bloqueadas

1. **WhatsApp es el CRM y canal de cierre.** Todo CTA → WhatsApp con mensaje pre-escrito.
2. **Simulacros = imán de leads.** Pedir contacto (email + WhatsApp + idioma) antes/después del simulacro.
3. **Dos motores**: David (políglota, cercano) + WeLearn/Zhanna (autoridad, rigor pedagógico).
4. **Posicionamiento**: "Aprender un idioma, en serio." Academia humana especializada en exámenes. No Duolingo, no Open English.
5. **Pre-venta Miembro Fundador**: 50 cupos coreano, precio especial vitalicio.
6. **Pricing**: Debe corregir incoherencia (si se implementan paquetes de horas). Precio por hora debe ser decreciente con volumen.
7. **SEO de intención**: Landings capturables por Google Ads con quality score alto.

---

## Misiones priorizadas

### NIVEL 1 — CAJA URGENTE

| ID | Misión | Estado |
|----|--------|--------|
| M1.1 | Landing inglés/IELTS alta conversión — `/clases-de-ingles` | **HECHO** — pendiente foto real `public/images/david-duarte.jpg` y 3 testimonios reales |
| M1.2 | Botón WhatsApp flotante en todas las páginas | **HECHO** — `src/components/WhatsAppFloat.tsx`, mensaje por URL, evento GTM `click_whatsapp` |
| M1.3 | Captura de leads en simulacros (email + WA + nombre + idioma) | **HECHO** — tabla `leads` en Supabase + `saveLead` action + `LeadCaptureModal` en ExamReport. ⚠️ Pendiente: crear tabla `leads` en Supabase dashboard |
| M1.4 | Eventos de conversión GA4 + Meta Pixel (click_whatsapp, lead_simulacro, etc.) | **PENDIENTE GTM** — código ya dispara `window.dataLayer.push()`. Falta: crear triggers + tags en GTM-57NXLPZV y publicar versión |
| M1.5 | Página de precios reescrita (corregir incoherencias, CTA a WhatsApp) | **HECHO** — `src/app/(site)/precios/PreciosClient.tsx` usa `waLink()` para todos los CTAs |

### NIVEL 2 — REPLICAR EL MOTOR

| ID | Misión | Estado |
|----|--------|--------|
| M2.1 | Landing de coreano | **HECHO** — `src/app/(site)/clases-de-coreano/` con JSON-LD, sección Miembro Fundador, TOPIK comparador, FAQ |
| M2.2 | Landing de ICFES inglés | **HECHO** — `src/app/(site)/preparacion-icfes/` con escala de puntajes, estructura del examen, plan de prep |
| M2.3 | SEO técnico base (meta tags, schema.org, sitemap, robots) | **HECHO** — sitemap.ts actualizado, JSON-LD (Course + LocalBusiness) en todas las landing pages, metadata canónica |

### NIVEL 3 — PRODUCTO SUSCRIPCIÓN

| ID | Misión | Estado |
|----|--------|--------|
| M3.1 | Panel de estudiante MVP (solo coreano) | **PENDIENTE** |
| M3.2 | Pasos 18, 19, 20 del método | **PENDIENTE** |
| M3.3 | Página de pre-venta Miembro Fundador | **HECHO** — `src/app/(site)/miembro-fundador/` con 50 cupos, 6 beneficios, timeline, comparador |

### NIVEL 4 — CRECIMIENTO ORGÁNICO

| ID | Misión | Estado |
|----|--------|--------|
| M4.1 | Blog / artículos SEO | **HECHO** — `/blog` con 5 artículos estáticos (IELTS, ICFES, Coreano, TOEFL, TOPIK I), filtro interactivo por categoría, OG image por artículo, JSON-LD Article |
| M4.2 | Sistema de testimonios en video | **PENDIENTE** |
| M4.3 | Optimización de performance (Lighthouse mobile > 90) | **PARCIAL** — viewport export, prefers-reduced-motion, image sizes, FAQ schema en home/coreano/ICFES, OG dinámicos edge |

---

## Notas técnicas activas

- **Korean assets (steps 008-019)**: 552MB en disco local, excluidos de git (`.gitignore`) y de Vercel (`.vercelignore`). NO commitear.
- **`public/images/david-duarte.jpg`**: aún no existe. La landing de inglés tiene `fill` con `objectFit: cover` listo para recibirla.
- **Testimonios**: la landing `/clases-de-ingles` tiene 3 testimonios placeholder. Reemplazar con reales cuando David los tenga.
- **Supabase `leads` tabla**: la acción `saveLead` ya existe pero la migración SQL no se ha ejecutado en el dashboard de Supabase.
- **GTM M1.4**: el código ya hace `window.dataLayer.push({ event: 'click_whatsapp' })` y `{ event: 'lead_simulacro' }`. Solo falta crear los triggers y tags en tagmanager.google.com (GTM-57NXLPZV) y publicar.
- **`/registro` links**: todos los links de marketing corregidos a `/clases-de-ingles`. El único `/registro` que permanece es el de `AuthForm.tsx` (correcto, apunta a `(auth)/registro`).
- **Nav links**: Home, Inglés, Coreano, Exámenes, Método, Precios. Lección y Práctica quitados del nav principal (son features de app, no marketing).
- **WA number**: `573005004253` — definitivo. Está en `WhatsAppFloat.tsx` y `PreciosClient.tsx`.
- **`PracticaClient.tsx`, `IcfesStressPractice.tsx`, `korean-speaking-1/`**: trabajo en progreso sin commitear en ramas de funcionalidad.
