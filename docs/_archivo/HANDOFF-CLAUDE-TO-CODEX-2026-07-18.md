# Handoff: Claude → Codex — 2026-07-18

**Autor:** Claude (Sonnet 5), sesión en `codex/production-baseline-2026-07-17`.
**Destinatario:** Codex, próxima sesión en este repositorio.
**Motivo:** dejar registro explícito de qué se cambió, qué se integró a `main`,
y — más importante — un conflicto real detectado entre mi trabajo y trabajo
tuyo previo, para que no se repita ni se pierda contexto.

---

## 1. Resumen de la tarea ejecutada

Objetivo del usuario: conectar el motor de corrección con IA (Gemini + Groq +
Nemotron) a todos los exámenes de `/examenes` que tengan sección de Writing,
y dejar la arquitectura lista para agregar exámenes nuevos.

Trabajo real ejecutado, en orden:

1. **Fix urgente no planeado**: Groq deprecó `meta-llama/llama-4-scout-17b-16e-instruct`
   (17 jun 2026) sin aviso — el proveedor devolvía `model_not_found` en
   silencio, degradando siempre a Gemini. Reemplazado por
   `llama-3.3-70b-versatile` (texto). Se evaluó `qwen/qwen3.6-27b` como
   reemplazo de visión para IELTS Task 1 (sí lee el gráfico correctamente,
   verificado con un gráfico real) pero Groq lo limita a 8.000 tokens/min
   (modelo "preview") y el esquema completo de respuesta no cabe en ese
   presupuesto — descartado. IELTS Task 1 queda sin respaldo de visión, solo
   Gemini.
2. **Nemotron 3 (NVIDIA)** sumado como tercer motor de respaldo, solo texto
   (`src/lib/labs/providers/nvidia.ts`).
3. **Generalización de arquitectura**: `taskNumber` pasó de `1|2` fijo a
   `1|2|3|4` en toda la cadena (`route.ts`, `useWritingAssessment.ts`,
   `WritingAssessmentPanel.tsx`). `ExamAdapter.taskIdFor` ahora también
   recibe `mockId` (no solo el número de tarea) — lo necesita DELF/DALF,
   donde el nivel B1/B2 depende del SET, no de la tarea.
4. **4 familias de examen nuevas conectadas al motor**, cada una con su
   escala de puntaje oficial real investigada (nunca inventada):
   Goethe-Zertifikat B1, CILS/CELI B1, DELF/DALF (nivel-aware B1/B2),
   CELPE-Bras (0-5 holístico, 4 tareas reales localizadas por
   `section.part`, no por `taskNumber` — ese campo venía repetido 1,2,1,2 en
   el mock existente).
5. Bug lateral corregido: `WritingAssessmentPanel` coloreaba la banda
   siempre sobre escala `/9`, afectando ya a TOEFL/Cambridge (`/5`) en
   silencio — se agregó prop `maxScore`.

Verificación ejecutada en cada paso: `npx tsc --noEmit`, `eslint` sobre los
archivos tocados, `npm run check:practica-catalog`, `next build`, y `curl`
real contra el mock verdadero de cada familia (no solo datos de prueba) —
incluida una prueba cruzada en CELPE-Bras que confirmó que las 4 tareas usan
prompts distintos y no uno compartido por error.

## 2. Estado de integración a `main` — YA HECHO

- Dos commits integrados a `main` vía **fast-forward limpio** (sin merge
  commit, sin force-push):
  - `7111ed5` — `feat(labs): resumen IELTS estilo TRF, gate de lead, y tercer motor de respaldo`
  - `9bd1b3f` — `fix(labs): reemplaza modelo Groq deprecado y extiende el motor a Goethe/CILS/DELF/CELPE-Bras`
- `main` en GitHub está en `9bd1b3f` al momento de escribir esto.
- Deploy a producción disparado automáticamente por la integración GitHub↔Vercel
  (no requirió `vercel deploy` manual). Verificado con `curl` real contra
  `https://www.idiomaswl.com/api/labs/exam-writing-assess` — responde
  correctamente (banda real, `engineUsed: "groq"`).
- Archivos tocados (commit `9bd1b3f`, ver diff completo con
  `git show 9bd1b3f --stat`): exclusivamente dentro de `src/lib/labs/`,
  `src/app/api/labs/`, `src/components/labs/`, y las 3 páginas de práctica
  (`IELTSPracticeClient.tsx`, `TOEFLPracticeClient.tsx`,
  `LanguagePracticeClient.tsx`). **Cero superposición** con archivos de
  visuales de IELTS Task 1 — verificado explícitamente con `comm` antes de
  integrar.

## 3. ⚠️ Conflicto detectado con tu trabajo — acción pendiente tuya

Al empezar esta sesión, el árbol de trabajo (working tree local, no
committeado) tenía cambios sin commitear en 18 archivos, todos relacionados
con visuales de IELTS Task 1 (`Content.tsx`, `Task1ChartTypeGuide.tsx`,
`comparaciones/*`, `mapas/Content.tsx`, `sitemap.ts`, `docs/ielts-toefl-*`,
etc.) — ver lista completa abajo. No los toqué ni los commiteé (no eran
míos, y el usuario pidió explícitamente no tocar nada fuera de mi tarea).

Para poder rebasar mi trabajo sobre el `main` actualizado sin que esos
cambios bloquearan el rebase, los saqué con `git stash push -u` (mensaje:
`codex-worktree-leftovers-not-mine-2026-07-18`), hice el rebase, y traté de
restaurarlos después con `git stash pop`.

**Resultado: conflictos reales de merge en 7 de los 18 archivos** (`Content.tsx`,
`Task1ChartTypeGuide.tsx`, `comparaciones/Content.tsx` —borrado en main,
modificado en el stash—, `comparaciones/page.tsx`, `mapas/Content.tsx`,
`overview/Content.tsx`, `procesos/Content.tsx`). Esto confirma que ese
contenido sin commitear era una versión **anterior/desactualizada** de un
trabajo que ya rehiciste y subiste a `main` por otra vía — la rama
`codex/ielts-task1-visual-release` (commit `d326db6`, "Align IELTS Task 1
visuals and English content") ya está mergeada en `main` y cubre
sustancialmente lo mismo.

**No resolví esos conflictos — no era mi lugar decidir cuál versión es la
buena.** Descarté el intento de pop fallido del working tree
(`git reset --hard HEAD`, seguro porque HEAD ya tenía mi rebase correcto) y
dejé el contenido completo, intacto, guardado en:

```
stash@{0}: On codex/production-baseline-2026-07-17: codex-worktree-leftovers-not-mine-2026-07-18
```

**Acción sugerida para ti:** revisa `git stash show -p stash@{0}` y decide —
si `d326db6` ya cubre ese trabajo, `git stash drop stash@{0}` lo descarta
sin riesgo (el contenido real ya vive en `main`). Si había algo en el stash
que NO llegó a `d326db6` (por ejemplo los archivos nuevos sin trackear:
`Task1BodyLesson.tsx`, `Task1BodyPracticeEngine.tsx`, `body-1/`, `body-2/`,
`mapas/MapPracticeEngine.tsx`, `procesos/ProcessPracticeEngine.tsx`,
`docs/ielts-task1-visual-prompts-batch-01.md`, `public/images/ielts/` — esos
quedaron como archivos sueltos sin trackear en el working tree, NO en el
stash, así que siguen ahí tal cual), revísalo antes de decidir si se
descarta o se retoma.

## 4. Estado del working tree al cierre de esta sesión

- `git status` limpio de cambios trackeados.
- Archivos sin trackear presentes (no tocados, dejados tal cual estaban):
  `.playwright-mcp/`, `docs/ielts-task1-visual-prompts-batch-01.md`,
  `ielts-processes-production.png`, `public/images/ielts/`,
  `Task1BodyLesson.tsx`, `Task1BodyPracticeEngine.tsx`, `body-1/`, `body-2/`,
  `mapas/MapPracticeEngine.tsx`, `procesos/ProcessPracticeEngine.tsx`.
- Un stash pendiente de revisión (`stash@{0}`, ver sección 3).
- Rama local `codex/production-baseline-2026-07-17` == `origin/main` == `9bd1b3f`.

## 5. Pendiente real para el producto (no es código)

- **`NVIDIA_API_KEY` falta en las variables de entorno de producción de
  Vercel** (`GROQ_API_KEY`, `GEMINI_API_KEY` y `LABS_ENABLED` sí están). El
  respaldo Nemotron degrada a `not_configured` en prod hasta que el usuario
  la agregue — quedó pendiente de que él la pase.
- **Calibración de rúbricas** (Goethe/CILS/DELF/CELPE-Bras, y la de IELTS
  que ya estaba pendiente de antes): falta que Zhanna revise 8-10 ensayos
  reales por idioma contra el motor, objetivo ±0.5 de margen. JSON válido no
  es lo mismo que calificar bien — nadie ha validado la calidad pedagógica
  de las rúbricas nuevas todavía.
- **Decisión de producto sin tomar**: ¿todos los exámenes deberían usar el
  resumen tipo TRF + gate de WhatsApp que tiene IELTS
  (`IELTSSummaryReport.tsx`), o cada uno mantiene su reporte actual más
  simple (`WritingAssessmentPanel.tsx`)? No se tocó — deliberadamente fuera
  de alcance de esta sesión.

## 6. Contrato técnico que cualquiera debe respetar al tocar este código

- `route.ts` → `ADAPTERS: Record<string, ExamAdapter>` es el punto único de
  registro por familia de examen. Cada adaptador aporta `isFreeMock`,
  `getAssignment`, `rubric`, `taskIdFor`.
- Ninguna rúbrica inventa una escala de puntaje — cada una usa la escala
  oficial real de su examen (ver comentario "FUENTE" al inicio de cada
  archivo en `src/lib/labs/rubrics/`).
- `src/data/exams.ts` y `src/data/mocks/**` son de solo lectura para este
  motor — se lee contenido existente, nunca se reescribe. Si un examen
  necesita contenido de Writing que no existe, se crea un archivo nuevo, no
  se edita uno existente.
