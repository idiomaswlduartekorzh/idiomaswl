# Idiomas WeLearn

Sitio y plataforma de **idiomaswl.com** — academia de idiomas con sede en
Bucaramanga, Colombia. Clases de 8 idiomas, preparación de exámenes oficiales
(IELTS, TOEFL, ICFES, Goethe, DELF, CILS, CELPE-Bras, TOPIK), simulacros
gratuitos y un motor de práctica de gramática, escritura, lectura y escucha.

## Antes de tocar nada

Lee **[`docs/OPERACION-REPOSITORIO.md`](docs/OPERACION-REPOSITORIO.md)**. Define
qué es contenido protegido, cómo se integra y desde dónde se publica. Resumen de
lo que más se incumple:

- El repositorio canónico es `idiomaswl`. `Welearnmiguel` es histórico: no se usa
  como fuente ni se publica desde ahí.
- Producción sale de `main` y solo de `main`. Nunca desde un árbol con cambios
  sin commit.
- **Nunca metas datos personales de estudiantes en el repo.** Los certificados
  sin tachar viven fuera, en `~/Documents/welearn-certificados-originales/`. Al
  repo solo entran los recortes ya tachados de `public/images/resultados/`. Ojo
  con `public/`: Next.js lo sirve entero en la raíz de la URL, y el CLI de Vercel
  sube el árbol local, no lo que hay en git.

`AGENTS.md` y `CLAUDE.md` son las instrucciones para agentes de IA que trabajen
en el repo.

## Arrancar

```bash
npm install
npm run dev:safe
```

**Usa `dev:safe`, no `dev`.** La máquina de desarrollo tiene 8 GB de RAM y el dev
server normal la tumba. `dev:safe` limita el heap y vigila el consumo; si algo se
desmadra, `npm run panic` mata los procesos. El detalle está en
[`docs/SAFE_DEVELOPMENT_GUIDE.md`](docs/SAFE_DEVELOPMENT_GUIDE.md).

Por la misma razón: **no abras el preview del navegador**. Verifica con `build` y
los validadores.

Las variables de entorno van en `.env.local` (no se commitea) y en Vercel.

## Comandos

| Comando | Qué hace |
|---|---|
| `npm run dev:safe` | Dev server con límite de memoria |
| `npm run panic` | Mata los procesos de Node colgados |
| `npm run build` | Build de producción. Ejecuta antes los validadores del `prebuild` |
| `npm run check:practica-catalog` | Valida el catálogo de práctica |
| `npm run check:grammar-exercises` | Valida el formato de los ejercicios de gramática |
| `npm run check:exam-practice-content` | Valida el contenido de práctica de exámenes |
| `npm run audit:ielts` | Audita las rutas IELTS contra `docs/ielts-toefl-route-map.md` |
| `npm run clean` | Borra `.next`, `.turbo` y la caché de node_modules |

## Stack

Next.js 16.2.6 (App Router, layout `src/`) · React 19.2.4 · TypeScript 5 ·
Tailwind CSS v4 · Framer Motion + Lenis · WaveSurfer.js · Supabase (auth + DB) ·
Vercel.

## Mapa del repo

```
src/
  app/(site)/       páginas públicas: home, exámenes, práctica, blog, landings, dashboard
  app/(auth)/       login y registro
  app/(labs)/       experimentos de IA (evaluación de writing y speaking)
  app/courses/      lecciones del método de 17 pasos
  app/api/          rutas de API (evaluación de pronunciación, etc.)
  components/       UI compartida; lesson/ es el motor de lecciones; hub/ los bloques de landing
  data/             exámenes, simulacros, gramática y contenido de práctica
  lib/              clientes de Supabase, server actions y utilidades
  middleware.ts     protege /dashboard/
public/             audio, imágenes y vídeo de producción
docs/               documentación viva. docs/_archivo/ es histórico: no es referencia
scripts/            validadores y herramientas de build
supabase/           migraciones SQL
```

## Documentación

Empieza por `docs/OPERACION-REPOSITORIO.md`. De ahí, según lo que vayas a tocar:
`PLAN-ATAQUE-SEO-FASES.md` (SEO vigente), `ielts-toefl-route-map.md` (mapa de
rutas, lo consume `audit:ielts`), `SAFE_DEVELOPMENT_GUIDE.md` (memoria) y los
`reading-*` para el motor de lectura.

`docs/_archivo/` guarda documentos que ya no describen el estado del proyecto. Si
uno de ellos contradice al código, gana el código.
