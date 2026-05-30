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
| M1.1 | Landing inglés/IELTS alta conversión — `/clases-de-ingles` | **HECHO** — `public/images/david-duarte.jpg` en producción + 3 testimonios reales (Leonardo, Carlos, Karen) |
| M1.2 | Botón WhatsApp flotante en todas las páginas | **HECHO** — `src/components/WhatsAppFloat.tsx`, mensaje por URL, evento GTM `click_whatsapp` |
| M1.3 | Captura de leads en simulacros (email + WA + nombre + idioma) | **HECHO** — tabla `leads` en Supabase (ya existe) + `saveLead` action + `LeadCaptureModal` en ExamReport |
| M1.4 | Eventos de conversión GA4 + Meta Pixel (click_whatsapp, lead_simulacro, etc.) | **HECHO** — GTM-57NXLPZV configurado: 4 tags, 2 triggers, 5 variables, Versión 4 publicada |
| M1.5 | Página de precios reescrita (corregir incoherencias, CTA a WhatsApp) | **HECHO** — `src/app/(site)/precios/PreciosClient.tsx` usa `waLink()` para todos los CTAs. Precios: Prep $180K, Intensivo 2x $280K, 4x $480K |

### NIVEL 2 — REPLICAR EL MOTOR

| ID | Misión | Estado |
|----|--------|--------|
| M2.1 | Landing de coreano | **HECHO** — `src/app/(site)/clases-de-coreano/` con JSON-LD, sección Miembro Fundador, TOPIK comparador, FAQ, sección Diagnóstico TOPIK |
| M2.2 | Landing de ICFES inglés | **HECHO** — `src/app/(site)/preparacion-icfes/` con escala de puntajes, estructura del examen, plan de prep |
| M2.3 | SEO técnico base (meta tags, schema.org, sitemap, robots) | **HECHO** — sitemap.ts, robots.ts, JSON-LD @graph en todas las landing pages (Course + LocalBusiness + BreadcrumbList + Person + FAQPage), Blog + BlogPosting en /blog, Article en /blog/[slug], OG images en todas las rutas públicas |

### NIVEL 3 — PRODUCTO SUSCRIPCIÓN

| ID | Misión | Estado |
|----|--------|--------|
| M3.1 | Panel de estudiante MVP (solo coreano) | **HECHO** — dashboard conectado a Supabase: exam stats reales, racha real (`daily_activity`), progreso coreano (`user_progress`), planes (autodidacta/preparacion/intensivo), logout, panel admin con listado de estudiantes y asignación de planes |
| M3.2 | Pasos 18, 19, 20 del método | **PENDIENTE** — necesita contenido de David |
| M3.3 | Página de pre-venta Miembro Fundador | **HECHO** — `src/app/(site)/miembro-fundador/` con 50 cupos, 6 beneficios, timeline, comparador, Course JSON-LD |

### NIVEL 4 — CRECIMIENTO ORGÁNICO

| ID | Misión | Estado |
|----|--------|--------|
| M4.1 | Blog / artículos SEO | **HECHO** — `/blog` con **30 artículos** (IELTS×13, TOEFL×4, ICFES×3, Coreano×6, Migración×3, Alemán×1, Portugués×1, Método×1, Francés×1) + filtro interactivo + OG per-article + Article+BreadcrumbList JSON-LD + CTAs hacia landings |
| M4.2 | Sistema de testimonios en video | **PENDIENTE** — necesita videos de David |
| M4.3 | Optimización de performance (Lighthouse mobile > 90) | **PARCIAL** — OG images edge en todas las rutas públicas, BreadcrumbList en todas las páginas, poweredByHeader: false, next/font/google para Geist. Pendiente: medir Lighthouse mobile en producción |

---

## Notas técnicas activas

- **Korean assets (steps 008-019)**: 552MB en disco local, excluidos de git (`.gitignore`) y de Vercel (`.vercelignore`). NO commitear.
- **`public/images/david-duarte.jpg`**: ✅ En producción (commitida y desplegada).
- **Testimonios reales**: Leonardo Pinto (Inglés/USA), Daniel Zuluaga (Celpe-Bras/USP), Karen Ayala (Goethe/Alemán), Carlos Torres (TOEFL/Maestría). En home y clases-de-ingles.
- **Supabase tablas activas**: `leads`, `user_progress`, `profiles` (con columna `plan`), `exam_submissions`, `daily_activity`. Todas existen y tienen RLS.
- **Supabase migración pendiente**: `supabase/migrations/20260529200000_plan_and_activity.sql` — David debe ejecutar en SQL Editor. Añade columna `plan` a `profiles` y tabla `daily_activity`.
- **`saveProgress.ts`**: acción de servidor para marcar pasos como completados. Pendiente: llamar a `markStepComplete('korean', stepId)` al final de cada lección coreana.
- **GTM**: ✅ Configurado y publicado. Version 4: tags click_whatsapp (GA4+Meta Pixel), lead_simulacro (GA4+Meta Pixel). Triggers: Click WhatsApp, Lead Simulacro. Variables: dataLayer.
- **Nav links**: Home, Inglés, Coreano, Exámenes, Blog, Precios (en `SiteNav.tsx`). Correcto.
- **BreadcrumbList**: añadido a todos los pages: clases-de-ingles, clases-de-coreano, preparacion-icfes, miembro-fundador, precios, metodo, leccion, blog, blog/[slug].
- **Blog bidireccional**: landing pages → blog (secciones "Del blog WeLearn"); blog → landing pages (CTAs + links en cierre de artículo); home → blog (sección "09 — Blog" con 4 artículos recientes).
- **30 artículos blog**: 1-25 (IELTS×12, TOEFL×3, ICFES×2, Coreano×5, Migración×3) + 26-Goethe, 27-Celpe-Bras, 28-Método aprendizaje, 29-IELTS Writing Task 1, 30-DELF/DALF.
- **TOPIK Diagnóstico**: `src/data/mocks/topik-set-1.ts` (30 preguntas MCQ al estilo TOPIK I, 3 partes: 빈칸/안내문/지문), `TOPIKPracticeClient.tsx` (quiz → LeadCaptureModal → results con nivel). Ruta: `/examenes/topik/practica/set-1`. Sección en `/clases-de-coreano`. Scoring: 70%+ = Nivel 2, 40-69% = Nivel 1, <40% = Iniciante.
- **OG images**: todas las rutas públicas tienen `opengraph-image.tsx` con edge rendering: /home, /leccion, /metodo, /blog, /blog/[slug], /clases-de-ingles, /clases-de-coreano, /preparacion-icfes, /miembro-fundador, /precios, /examenes, /practica. Root `/` redirige a /home.
- **WA number**: `573005004253` — definitivo. Está en `WhatsAppFloat.tsx` y `PreciosClient.tsx`.
- **Platform actions**: `src/lib/actions/` tiene: `assignPlan.ts`, `signOut.ts`, `trackActivity.ts`, `saveProgress.ts`, `saveLead.ts`, `scoreSubmission.ts`.
- **Platform utils**: `src/lib/utils/streak.ts` — `calculateStreak(dates: string[]): number`.
- **Dashboard routes**: `/dashboard/student` (StudentDashboardClient), `/dashboard/admin` (JoseDashboard/ZhannaDashboard), `/dashboard/welearn` (WelearnDashboardClient — datos aún placeholder).
- **Admin StudentList**: `src/app/(site)/dashboard/admin/StudentList.tsx` — tabla de estudiantes con búsqueda, filtro por plan, asignación inline de plan con server action.
- **`PracticaClient.tsx`, `IcfesStressPractice.tsx`, `korean-speaking-1/`**: trabajo en progreso sin commitear en ramas de funcionalidad.
