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
| M1.1 | Landing inglés/IELTS alta conversión — `/clases-de-ingles` | **HECHO** — pendiente foto `public/images/david-duarte.jpg` y testimonios reales |
| M1.2 | Botón WhatsApp flotante en todas las páginas | **HECHO** — `src/components/WhatsAppFloat.tsx`, mensaje por URL, evento GTM `click_whatsapp` |
| M1.3 | Captura de leads en simulacros (email + WA + nombre + idioma) | **PENDIENTE** |
| M1.4 | Eventos de conversión GA4 + Meta Pixel (click_whatsapp, lead_simulacro, etc.) | **PENDIENTE** |
| M1.5 | Página de precios reescrita (corregir incoherencias, CTA a WhatsApp) | **PENDIENTE** |

### NIVEL 2 — REPLICAR EL MOTOR

| ID | Misión | Estado |
|----|--------|--------|
| M2.1 | Landing de coreano | **PENDIENTE** |
| M2.2 | Landing de ICFES inglés | **PENDIENTE** |
| M2.3 | SEO técnico base (meta tags, schema.org, sitemap, robots) | **PENDIENTE** |

### NIVEL 3 — PRODUCTO SUSCRIPCIÓN

| ID | Misión | Estado |
|----|--------|--------|
| M3.1 | Panel de estudiante MVP (solo coreano) | **PENDIENTE** |
| M3.2 | Pasos 18, 19, 20 del método | **PENDIENTE** |
| M3.3 | Página de pre-venta Miembro Fundador | **PENDIENTE** |

### NIVEL 4 — CRECIMIENTO ORGÁNICO

| ID | Misión | Estado |
|----|--------|--------|
| M4.1 | Blog / artículos SEO | **PENDIENTE** |
| M4.2 | Sistema de testimonios en video | **PENDIENTE** |
| M4.3 | Optimización de performance (Lighthouse mobile > 90) | **PENDIENTE** |

---

## Notas técnicas activas

- `.vercelignore` excluye steps 8-9 de coreano — hay archivos untracked de steps 8-19 pendientes de commit
- `PracticaClient.tsx`, `IcfesStressPractice.tsx`, `korean-speaking-1/`, `korean-intro-speaking-1.ts` — trabajo en progreso sin commitear
- La página `/precios` actual es de suscripción (no tiene paquetes de horas 1:1) — puede necesitar una sección separada
- No hay WhatsApp flotante en ninguna página — pendiente M1.2
- No hay landing de inglés/IELTS — pendiente M1.1
