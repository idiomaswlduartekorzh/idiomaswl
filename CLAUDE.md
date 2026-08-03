@AGENTS.md

> **Operación obligatoria:** antes de modificar contenido, integrar cambios o publicar, leer `docs/OPERACION-REPOSITORIO.md`. El repositorio canónico es `idiomaswl`; la rama `main` es la base de producción. No publicar desde un árbol con cambios sin commit ni desde el repositorio histórico `Welearnmiguel`.

---

# Idiomas WeLearn — Memoria Técnica del Proyecto

> Última verificación contra el código: **2026-08-02**, sobre `main`. Si algo de
> aquí contradice al código, gana el código — y corrige este archivo.

## Quién es WeLearn

Academia de idiomas **con sede en Bucaramanga, Colombia**, que además enseña en línea. La sede física no es un detalle: el posicionamiento de SEO local depende de ella, y por eso **no se escribe "100% online"** en el sitio.

Fundadores: **José David Duarte Silva** (políglota, 8 idiomas, cara visible) y **Zhanna Korzh** (directora académica, políglota — estudió en Francia e Inglaterra).

Producto: clases de **8 idiomas** (inglés, coreano, francés, alemán, italiano, portugués, japonés, ruso) + preparación de exámenes (IELTS, TOEFL, ICFES, Goethe, DELF, CILS, CELPE-Bras, TOPIK, Cambridge B2) + plataforma con método propio de 17 pasos. Sitio: **idiomaswl.com**.

---

## ⚠️ Datos personales de estudiantes

Los certificados de examen **sin tachar** llevan nombre, foto de la cara, correo, dirección, fecha de nacimiento y número de pasaporte de personas reales.

- Los originales viven **fuera del repo**, en `~/Documents/welearn-certificados-originales/`.
- Al repo solo entran los recortes **ya tachados**, en `public/images/resultados/`.
- **Nunca los pongas en `public/`.** Next.js sirve todo `public/` en la raíz de la URL, y el CLI de Vercel sube el árbol local, no lo que hay en git. En agosto de 2026 había 39 HEIC originales en `public/reports tests/` justo por eso.
- Protegido en dos capas: `.gitignore` (que no entren al historial) y `.vercelignore` (que no salgan en un despliegue por CLI).

---

## Stack técnico

| Capa | Tecnología |
|------|-----------|
| Framework | Next.js 16.2.6 (App Router, layout `src/`) |
| Runtime | React 19.2.4 + TypeScript 5 |
| CSS | Tailwind CSS v4 (plugin de PostCSS) |
| Animaciones | Framer Motion 12 + Lenis (scroll suave) |
| Audio | WaveSurfer.js 7 + @wavesurfer/react |
| Auth + DB | Supabase (`@supabase/ssr` + `@supabase/supabase-js`) |
| Iconos | Lucide React |
| Gráficas | Recharts |
| Hangul | hangul-js (romanización coreana) |
| Deploy | Vercel |

**Memoria:** la máquina de desarrollo tiene 8 GB. Usa `npm run dev:safe`, nunca `npm run dev`. **No abras el preview del navegador** — la tumba. Verifica con `npm run build` y los validadores. Si algo se cuelga: `npm run panic`. Detalle en `docs/SAFE_DEVELOPMENT_GUIDE.md`.

## Estructura

```
src/
  app/
    (site)/       páginas públicas: home, exámenes, práctica, blog, landings, dashboard
    (auth)/       login, registro
    (labs)/       experimentos de IA (evaluación de writing y speaking)
    courses/[lang]/step/[stepId]   lecciones del método
    api/          rutas de API (evaluación de pronunciación, etc.)
  components/
    lesson/       motor de lecciones (stages step001–step007, engine, grammar)
    hub/          FoundersBand, PracticeBand, LocalBand — bloques de landing de idioma
    icfes/        OnboardingFlow, DiagnosticTest, IcfesStudentFlow, IcfesDashboardClient
  data/           exams.ts, blog.ts, mocks/, grammar/, practica/, stepsMeta.ts
  lib/            clientes de Supabase (admin/client/server), actions/, utils/
  middleware.ts   protege /dashboard/ (requiere sesión de Supabase)
public/
  assets/korean/  assets por step. Los steps 008–019 (552 MB) NO se commitean
  audio/          audio de simulacros y práctica, comprimido a 64k mono
  images/         logos, avatares, resultados (recortes tachados)
docs/             documentación viva. docs/_archivo/ es histórico, no es referencia
```

**`/` renderiza el home directamente** (`src/app/(site)/page.tsx` reexporta `home/HomePage`). No hay redirección a `/home`.

## Medición instalada (NO TOCAR)

| Herramienta | ID / Archivo |
|---|---|
| Google Tag Manager | GTM-57NXLPZV — en `src/app/layout.tsx` (noscript + script `afterInteractive`) |
| Google Search Console | `google83bce1714af81f14.html` en `/public/` |
| Meta Pixel | 1295707616059871 — vía GTM |
| Google Analytics 4 | vía GTM |

Eventos publicados: `click_whatsapp` y `lead_simulacro`, cada uno con tag de GA4 y de Meta Pixel.

## Auth / Backend

- `src/lib/supabase/`: `admin.ts` (service role), `client.ts` (navegador), `server.ts` (SSR).
- El middleware protege `/dashboard/:path*` → redirige a `/login`.
- Tablas activas: `leads`, `user_progress`, `profiles` (con columna `plan`), `exam_submissions`, `daily_activity`, `game_sessions`. Todas con RLS.
- Migraciones en `supabase/migrations/`, hasta `20260706b_icfes_v2_vocabulary_static.sql`. Que un archivo exista **no garantiza** que se haya ejecutado en el SQL Editor: verifícalo contra la base antes de asumirlo.
- Server actions en `src/lib/actions/`: `assignPlan`, `assignSubject`, `gameSessions`, `icfes`, `inviteStudent`, `saveExamResult`, `saveLead`, `saveProgress`, `scoreSubmission`, `signOut`, `trackActivity`, `updateProfile`, `vocabulary`.
- `src/lib/utils/streak.ts` → `calculateStreak(dates: string[]): number`.

---

## Decisiones de producto bloqueadas

1. **WhatsApp es el CRM y el canal de cierre.** Todo CTA va a WhatsApp con mensaje pre-escrito. Número definitivo: **573005004253**.
2. **Los simulacros son el imán de leads.** Se pide contacto (email + WhatsApp + nombre + idioma) alrededor del simulacro.
3. **Dos voces**: David (políglota, cercano) y WeLearn/Zhanna (autoridad, rigor pedagógico). En las landings de francés e inglés, Zhanna debe aparecer en el hero o muy cerca — son los idiomas que ella estudió.
4. **Posicionamiento**: "Aprender un idioma, en serio." Academia humana especializada en exámenes, con sede real. No Duolingo, no Open English.
5. **Miembro Fundador**: preventa de coreano, 50 cupos, precio especial vitalicio.
6. **SEO de intención**: landings capturables por Google Ads con quality score alto.
7. **Zona protegida**: `/examenes`, `src/data/exams.ts`, `src/data/mocks/` y su CSS. David aprobó ese diseño (fondo azul marino, texto blanco, acento rojo). No rediseñar sin pedirlo.

---

## Navegación

```js
// src/components/SiteNav.tsx
Home (/) · Idiomas (/clases-de-idiomas) · Exámenes (/examenes) · Práctica (/practica) · Quiénes somos (/quienes-somos)
```

Cinco entradas. Blog, Precios, Nivel Radar y las landings sueltas de inglés y coreano **se retiraron del nav a propósito**: el peso de enlazado interno va al superhub `/clases-de-idiomas`.

⚠️ **Nunca borres "Práctica" del nav.** Desaparece con frecuencia en force-pushes. Se activa con `pathname.startsWith('/practica')`.

## Contenido publicado

- **8 landings de idioma** (`/clases-de-<idioma>`) más el superhub `/clases-de-idiomas` y la landing local `/clases-de-ingles-bucaramanga`.
- **124 artículos de blog** en `src/data/blog.ts`, con filtro interactivo, OG por artículo y JSON-LD `Article` + `BreadcrumbList`. *(El número "35" que arrastraba este archivo llevaba meses desactualizado.)*
- **Enlazado bidireccional**: las landings enlazan al blog ("Del blog WeLearn") y los artículos enlazan de vuelta a las landings.
- **JSON-LD** en todas las landings: `Course` + `LocalBusiness` + `BreadcrumbList` + `Person` + `FAQPage`. `Blog`/`BlogPosting` en `/blog`.
- **OG images** con renderizado edge en todas las rutas públicas.
- **Componentes de hub compartidos** (`src/components/hub/`): añadir un idioma nuevo es enchufar `FoundersBand` + `PracticeBand` + `LocalBand`, no copiar CSS.

## Plataforma

Rutas de dashboard: `/dashboard`, `/dashboard/student` (+ `/progreso`, `/perfil`, `/icfes`), `/dashboard/admin` (+ `/audios`, `/live/create`, `/live/[setId]`, `/live/session/[code]`), `/dashboard/welearn`.

- El dashboard de estudiante lee datos reales de Supabase: estadísticas de simulacros, racha (`daily_activity`), progreso (`user_progress`), plan.
- `markStepComplete` ya se llama desde `LessonRuntime.tsx` al terminar una lección.
- El admin tiene listado de estudiantes con búsqueda, filtro por plan y asignación en línea.
- `/dashboard/welearn` sigue con datos de relleno.

---

## Lo que sigue abierto

| Qué | Estado |
|---|---|
| **Pasos 18, 19 y 20 del método** | Necesita contenido de David |
| **Testimonios en vídeo** | Necesita los vídeos de David |
| **Gramática: 465 temas enriquecidos** | Commiteado en `8fd6396` y `47a19b1`, pero **en `feature/icfes-mock-21-23`, no en `main`**. Esa rama se separó el 18 de julio y va 76 commits por detrás. El trabajo existe y no está en producción |
| **Revisión de Zhanna** | Directorios `grammar/coreano/`, `japones/` y `ruso/` enteros |
| **Audio pendiente** | Goethe (58), DELF (30), IELTS sets 13–20. Guiones listos en `docs/GUIONES-PENDIENTES-MASTER.md` |
| **Lighthouse mobile > 90** | Sin medir en producción |
| **`practica/speaking`** | El trabajo más en crudo del proyecto. Ver `korean-speaking-1/` y `(labs)/labs/speaking` |

---

## Validadores

Corren solos en el `prebuild`, pero conviene lanzarlos antes de commitear:

```bash
npm run check:practica-catalog     # catálogo de práctica
npm run check:grammar-exercises    # formato de ejercicios de gramática
npm run audit:ielts                # rutas IELTS contra docs/ielts-toefl-route-map.md
```

**Formato de huecos en gramática:** los huecos son `[[n]]` contiguos y su número debe coincidir con `blanks`. Nunca `___` en `freeText`, `guidedText` ni `dual`. David y Zhanna no aparecen dentro de los ejercicios, solo en testimonios.

## Convenciones de contenido

- **Redundancia pedagógica**: TEMA → EXPLICACIÓN → EJEMPLOS → EJERCICIOS. Interiorizar exige práctica abundante: mínimo 15–17 ejercicios por tema.
- **Gramática**: el molde v2 está en `docs/gramatica-content-spec.md`. Tablas de máximo 4 columnas (legibilidad móvil); los paradigmas verbales llevan las 6 personas.
- **Audio**: los mp3 de simulacros se commitean comprimidos a 64k mono y se sirven como estáticos desde Vercel. `src/lib/examAudio.ts` los resuelve desde el CDN si `NEXT_PUBLIC_EXAM_AUDIO_BASE` está definida, y cae al archivo local si no.
