<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Repository and production guardrail

Read `docs/OPERACION-REPOSITORIO.md` before changing content, deploying, merging, or changing Git remotes. The canonical repository is `idiomaswl`; production must come from its `main` branch only. Do not use `Welearnmiguel` as a source or publish from an uncommitted working tree.

## Antes de integrar tu rama en `main` — léelo

Si tu rama nació antes del **7 de agosto de 2026**, `main` lleva por delante trabajo que no
está en ella. Integrar sin actualizar primero **borra ese trabajo de producción**, y lo hace
en silencio: nadie lo borra a propósito, se pierde al resolver el merge.

Haz esto siempre, en este orden:

```bash
git fetch origin
git rebase origin/main        # o merge; lo que no vale es integrar sin actualizar
npm run check:practica-catalog
npx tsc --noEmit
npm run build
```

Si `check:practica-catalog` falla, **no lo silencies ni bajes ningún umbral**: te está
diciendo que tu rama se llevó por delante algo publicado. Recupéralo con
`git checkout origin/main -- <ruta>`.

### Lo que hay en `main` y no debe caerse

**Escucha — 480 lecciones de audio, 8 idiomas × 3 niveles.** Es la parte más fácil de
tirar sin querer, porque son 24 rutas y 480 mp3 que ninguna página de IELTS ni de ICFES
importa, así que un merge puede quitarlas sin que nada se ponga rojo a simple vista.

Protegido por el guardián (el build se para si desaparecen):

- las 24 series en `src/data/practica/series/`, con sus 20 episodios cada una
- las 24 rutas `src/app/(site)/practica/<idioma>/<nivel>/escucha/page.tsx`
- `src/components/practica/ListeningPlayer.tsx` y `ListeningJourney.tsx`
- `src/data/practica/listening-shuffle.ts`
- los 480 mp3 de `public/audio/<idioma>/<nivel>/`

Contexto completo en [`docs/escucha-estado.md`](docs/escucha-estado.md). Dos cosas que
conviene saber antes de tocar nada de ahí:

1. **La serie es la única fuente de verdad.** El generador de audio lee los mismos turnos
   que se pintan en pantalla. No edites un `*-listening.ts` para cambiar contenido: deriva
   de su serie.
2. **La duración de cada episodio sale del mp3**, no se escribe a mano. Si cambias audio,
   corre `node scripts/sync-listening-durations.mjs --write`. Si la inventas, la barra de
   progreso del reproductor miente.

**IELTS e ICFES** tienen sus propios marcadores protegidos en el mismo guardián
(`IELTSHubClient`, `IcfesAdaptiveGame`, `ICFES_SMART_BANK_SUMMARY`, Task 1, Nivel Radar).
Valen la misma regla: si el guardián se queja de ellos, tu rama se llevó algo por delante.

**Habla acompañada — 200 escenarios publicados.** Antes de tocarla, lee
[`docs/METODOLOGIA-HABLA-ACOMPANADA.md`](docs/METODOLOGIA-HABLA-ACOMPANADA.md) y
[`docs/habla-acompanado-blueprint.md`](docs/habla-acompanado-blueprint.md). El runtime en
`src/data/practica/habla-acompanado/` es la única fuente ejecutable; `artifacts/`, `outputs/` y
ramas `archive/*` son evidencia histórica, no contenido recuperable por copia. Un cambio de ficha
invalida su auditoría. Antes de integrar exige 20/20 escenarios, cinco perfiles frescos con
`check:habla-release:<objetivo>`, `check:habla-acompanada`, catálogo, TypeScript y build. Nunca
bajes pisos ni publiques un `12/12` como si certificara un conjunto de 20.

### Tu rama solo existe en este portátil

Las ramas `codex/*` no están en `origin`. Compruébalo con
`git ls-remote --exit-code --heads origin <rama>`. Si además tu worktree está bajo `/tmp`,
macOS lo borra solo y no hay copia en ningún sitio. Empuja como respaldo antes de nada:

```bash
git push -u origin HEAD
```
