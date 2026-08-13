# TOEFL iBT 2026 — línea base reproducible T00

> Unidad: T00 — Congelar línea base.
>
> Captura principal: 2026-08-09T00:46:17-05:00 (America/Bogota).
>
> Alcance: inventario y evidencia de partida. Este artefacto no valida la calidad
> editorial, técnica o humana de ningún ítem o audio y no autoriza generación.

## 1. Gate de T00

T00 exige:

1. inventario reproducible;
2. estado Git documentado;
3. cambios concurrentes/ajenos documentados;
4. ninguna modificación de código, contenido TOEFL o MP3 durante la unidad.

Resultado: **gate satisfecho**. Las métricas se reconstruyeron desde las fuentes
TypeScript, las referencias usadas por el cliente y los archivos MP3 reales. No se
usaron como verdad los checklists históricos que todavía dicen “por producir”.

## 2. Estado exacto del repositorio al iniciar T00

| Campo | Valor capturado |
|---|---|
| Repositorio canónico | `git@github.com:idiomaswlduartekorzh/idiomaswl.git` |
| Rama | `codex/ielts-task2-introduction-pilot` |
| Upstream | `origin/codex/ielts-task2-introduction-pilot` |
| HEAD | `cf037bf68d766b8bc2cb81f930a4b5a42ffbeb78` |
| Diferencia con upstream | 0 behind / 7 ahead |
| Archivos tracked modificados | 6 |
| Archivos untracked antes de crear este artefacto | 7 |

La rama no fue creada para TOEFL y contiene trabajo IELTS activo. No se cambió de
rama, no se hizo fetch, rebase, merge, commit, push, reset, checkout destructivo ni
deploy. T00 se aisló en documentación para no mezclar la implementación TOEFL con el
trabajo concurrente.

### 2.1 Rutas presentes y preservadas

```text
 M scripts/check-ielts-task2-alignment.mjs
 M src/app/(site)/practica/ielts/academic/writing/task2/analisis-pregunta/PromptAnalysisClient.tsx
 M src/app/(site)/practica/ielts/academic/writing/task2/analisis-pregunta/PromptAnalysisPracticeEngine.tsx
 M src/app/(site)/practica/ielts/academic/writing/task2/analisis-pregunta/PromptAnalysisWorkshop.tsx
 M src/app/(site)/practica/ielts/academic/writing/task2/tarea-completa/TareaCompletaTask2Client.tsx
 M src/app/(site)/practica/ielts/academic/writing/task2/tarea-completa/page.tsx
?? docs/ielts-reading-loop.md
?? docs/ielts-task2-loop.md
?? docs/toefl-2026-alignment-loop.md
?? src/app/(site)/practica/ielts/academic/writing/task2/analisis-pregunta/analysis-drills.ts
?? src/app/(site)/practica/ielts/academic/writing/task2/tarea-completa/task2-prompt-bank.ts
?? tests/e2e/ielts-task2-analisis.spec.ts
?? tests/e2e/ielts-task2-tarea-completa.spec.ts
```

La presencia de `docs/toefl-2026-alignment-loop.md` corresponde al documento maestro
creado en la iteración anterior. Las demás rutas se trataron como trabajo concurrente
y no se editaron.

## 3. Fuentes inventariadas

### 3.1 Contenido

- `src/data/mocks/toefl-set-1.ts` a `toefl-set-20.ts`;
- `src/data/mocks/types.ts`;
- `src/app/(site)/examenes/[exam]/practica/[mockId]/Toefl2026PracticeClient.tsx`.

### 3.2 Medios

- `public/audio/toefl/set-1/` a `public/audio/toefl/set-20/`;
- todas las propiedades `audioUrl` de sección e ítem de los 20 sets.

### 3.3 Definición de unidad contabilizada

- Una pregunta normal cuenta como una unidad.
- Cada blank de `wordcomplete` cuenta como una unidad.
- Un `multiselect` cuenta como una unidad, no como dos selecciones.
- `questionObjects` cuenta objetos fuente, aunque un objeto agrupe varios blanks.
- `visible/progress` cuenta sólo tipos contemplados por `renderQuestion` y por el
  mapa de progreso actual. Esto no implica que la interacción sea fiel ni válida.

## 4. Inventario global reproducido

| Métrica | Resultado |
|---|---:|
| Archivos de set | 20 |
| Sets con `format: 'toefl-2026'` | 20 |
| Secciones por set | 13 |
| Tiempo declarado por set | 86 min |
| Objetos de pregunta | 940 |
| IDs de pregunta únicos | 940 |
| IDs duplicados | 0 |
| Unidades fuente | 1.140 |
| Unidades incluidas por renderer/progreso | 1.120 |
| Brecha renderer/fuente | 20, un `multiselect` por set |
| Referencias de audio | 260 |
| Referencias de audio únicas | 260 |
| MP3 reales | 260 |
| Referencias sin archivo | 0 |
| MP3 huérfanos | 0 |

### 4.1 Estructura idéntica de cada set

| Sección | Unidades fuente por set | Unidades atendidas por el cliente |
|---|---:|---:|
| Reading | 23 | 22 |
| Listening | 17 | 17 |
| Writing | 8 | 8 |
| Speaking | 9 | 9 |
| Total | 57 | 56 |

“Atendidas por el cliente” no significa “correctamente simuladas”. Por ejemplo,
Repeat entra al progreso como completada sin respuesta grabada y Speaking usa notas
como sustituto de captura oral.

### 4.2 Unidades por familia

| Familia | Por set | Total 20 sets |
|---|---:|---:|
| Complete the Words | 12 | 240 |
| Read in Daily Life | 5 | 100 |
| Read an Academic Passage | 6 | 120 |
| Listen and Choose a Response | 5 | 100 |
| Listen to a Conversation | 4 | 80 |
| Listen to an Announcement | 3 | 60 |
| Listen to an Academic Talk | 5 | 100 |
| Build a Sentence | 6 | 120 |
| Write an Email | 1 | 20 |
| Write for an Academic Discussion | 1 | 20 |
| Listen and Repeat | 5 | 100 |
| Take an Interview | 4 | 80 |
| Total | 57 | 1.140 |

### 4.3 Objetos fuente por tipo

| Tipo | Objetos | Observación |
|---|---:|---|
| `wordcomplete` | 40 | Agrupan 240 blanks |
| `mcq` | 540 | Reading y Listening |
| `multiselect` | 20 | No renderizados ni calificados |
| `sentencebuild` | 120 | 0 con prompt contextual |
| `write` | 40 | Email + Discussion |
| `repeat` | 100 | Sin captura oral actual |
| `speak` | 80 | Interfaz actual guarda notas |
| Total | 940 | 1.140 unidades al expandir blanks |

## 5. Línea base de texto y contenido

| Medición | Conteo | Media | Mínimo | Máximo |
|---|---:|---:|---:|---:|
| Pasaje académico Reading | 20 | 310,5 palabras | 263 | 342 |
| Transcripción Conversation | 20 | 217,9 | 179 | 260 |
| Transcripción Announcement | 20 | 142,4 | 119 | 165 |
| Transcripción Academic Talk | 20 | 308,6 | 268 | 345 |

Hallazgos estructurales adicionales reproducidos:

- 120/120 ítems Build a Sentence carecen de `prompt` contextual;
- 20/120 presentan `tiles` ya en el mismo orden que `answer`;
- 240/240 blanks Complete the Words muestran un `prefix`;
- el modelo almacena la palabra completa como `answer`;
- la interfaz presenta el prefijo fuera del input, pero el scoring compara el input
  aislado con la palabra completa.

Estos son hallazgos de contrato, no todavía una adjudicación editorial A/B/C/D/E.

## 6. Línea base de audio

| Métrica | Resultado |
|---|---:|
| Archivos MP3 | 260 |
| Tamaño total | 45.440.352 bytes (aprox. 44 MiB en `du`) |
| Archivo mínimo | 12.164 bytes |
| Archivo máximo | 1.150.267 bytes |
| Duración total | 94,354 min |
| Media por set | 4,718 min |
| Mínimo por set | 4,016 min (Set 7) |
| Máximo por set | 5,424 min (Set 20) |

### 6.1 Distribución de archivos

| Familia de asset | Por set | Total |
|---|---:|---:|
| `listen-choose-1..5.mp3` | 5 | 100 |
| `conversation.mp3` | 1 | 20 |
| `announcement.mp3` | 1 | 20 |
| `academic-talk.mp3` | 1 | 20 |
| `repeat-1..5.mp3` | 5 | 100 |
| Total | 13 | 260 |

### 6.2 Duración real por set

| Set | Minutos | Set | Minutos |
|---|---:|---|---:|
| 1 | 4,787 | 11 | 4,589 |
| 2 | 5,276 | 12 | 4,514 |
| 3 | 4,882 | 13 | 4,473 |
| 4 | 4,880 | 14 | 4,695 |
| 5 | 4,165 | 15 | 4,876 |
| 6 | 4,635 | 16 | 5,201 |
| 7 | 4,016 | 17 | 4,750 |
| 8 | 4,548 | 18 | 5,093 |
| 9 | 4,322 | 19 | 4,759 |
| 10 | 4,469 | 20 | 5,424 |

### 6.3 Huellas agregadas de preservación

Las huellas se calculan sobre la salida ordenada `sha256 ruta`, por lo que detectan
cambios de contenido y de inventario/ruta:

| Conjunto | SHA-256 agregado |
|---|---|
| 260 MP3 TOEFL | `dab2fdb8340d2dc72df4d70923985bdfd876174a922d646a3795bb39a5619842` |
| 20 fuentes `toefl-set-*.ts` | `50b3b8d7dd04826cf625052e7910b844c305894d43b2eae5fda01f881d3d512d` |

Estas huellas no sustituyen el manifiesto individual T04. Sirven para saber si el
banco cambió antes de que T04 asigne metadata a cada asset.

## 7. Comparación oficial fechada

Fuentes reabiertas el 9 de agosto de 2026:

- [ETS — Test Content and Structure](https://www.ets.org/toefl/test-takers/ibt/about/content.html);
- [ETS — TOEFL iBT 2026 Test Blueprint and Specifications](https://www.ets.org/content/dam/ets-india/pdfs/toefl/toefl-ibt-test-specifications-2026.pdf);
- [ETS — Full-length Practice Test 2](https://www.ets.org/pdfs/toefl/toefl-ibt-full-length-practice-test-2.pdf), usada sólo como ejemplo adaptado.

La página operativa seguía publicando 50 ítems/30 min para Reading, 47/29 para
Listening, 12/23 para Writing y 11/8 para Speaking, con variación posible al adaptar.
La especificación seguía definiendo Reading y Listening como tests de dos etapas.

| Sección | WeLearn fuente | WeLearn cliente | ETS publicado |
|---|---:|---:|---:|
| Reading | 23 | 22 | 50 |
| Listening | 17 | 17 | 47 |
| Writing | 8 | 8 | 12 |
| Speaking | 9 | 9 | 11 |

Esta tabla prueba una brecha de volumen; no afirma que igualar números produzca por sí
solo fidelidad, adaptatividad o equivalencia psicométrica.

## 8. Hallazgos de fidelidad congelados, no corregidos en T00

1. `multiselect`: 20 objetos fuente no son renderizados, incluidos en progreso ni
   calificados por el cliente.
2. Complete the Words: el input recibe letras faltantes, pero el scoring espera la
   palabra completa.
3. Build a Sentence: 120 sin contexto y 20 ya ordenados correctamente.
4. Listen and Repeat: el progreso marca cada ítem como hecho sin captura.
5. Take an Interview: la UI ofrece “Notas de preparación” y no captura audio.
6. Writing/Speaking: el resultado combina reglas locales y autoevaluación.
7. Navegación/tiempo: 86 minutos globales y libre cambio de skill; no hay módulos
   adaptativos ni cierre irreversible.

Estos hallazgos quedan abiertos para las unidades que dependen de T01/T03/T09. No se
reclasificó ningún activo ni se modificó el producto en T00.

## 9. Reproducción

### 9.1 Git

```bash
date -Iseconds
git status --short --branch
git rev-parse HEAD
git branch --show-current
git remote get-url origin
git rev-parse --abbrev-ref --symbolic-full-name '@{upstream}'
git rev-list --left-right --count '@{upstream}'...HEAD
```

### 9.2 Conteo y huella de archivos

```bash
find public/audio/toefl -type f -name '*.mp3' -print | sort | wc -l
find public/audio/toefl -type f -name '*.mp3' -print0 | sort -z | xargs -0 shasum -a 256 | shasum -a 256
find src/data/mocks -maxdepth 1 -type f -name 'toefl-set-*.ts' -print0 | sort -z | xargs -0 shasum -a 256 | shasum -a 256
```

### 9.3 Importación semántica

Se importaron los 20 módulos con Node y TypeScript stripping:

```bash
node --experimental-strip-types --input-type=module -e '
const handled = new Set(["mcq","dialog","wordcomplete","sentencebuild","write","repeat","speak"]);
const units = q => q.type === "wordcomplete" ? q.blanks.length : 1;
for (let n = 1; n <= 20; n++) {
  const mock = (await import("./src/data/mocks/toefl-set-" + n + ".ts")).default;
  const questions = mock.sections.flatMap(section => section.questions);
  const source = questions.reduce((sum, q) => sum + units(q), 0);
  const visible = questions.filter(q => handled.has(q.type)).reduce((sum, q) => sum + units(q), 0);
  const refs = mock.sections.flatMap(section => [section.audioUrl, ...section.questions.map(q => q.audioUrl)]).filter(Boolean);
  console.log(mock.id, mock.format, mock.timeMinutes, mock.sections.length, questions.length, source, visible, refs.length);
}
'
```

Las duraciones se obtuvieron con FFprobe 8.1.1 desde cada MP3, nunca desde metadata
escrita a mano:

```bash
ffprobe -v error -show_entries format=duration -of csv=p=0 public/audio/toefl/set-1/conversation.mp3
```

La medición completa aplicó ese comando a los 260 archivos y agregó por set.

### 9.4 Guardias del repositorio ejecutados al cerrar

| Comando | Resultado |
|---|---|
| `git diff --check` | Pasa, sin errores |
| `npm run check:practica-catalog` | Pasa: 465 temas y módulos protegidos |
| `npx tsc --noEmit` | Pasa |
| `npm run build` | Pasa; prebuild completo y 1.263 páginas estáticas generadas |

El prebuild ejecutó además los validadores de lectura, currículo de escritura,
series de escucha, IELTS Task 2 y vocabulario. Sus resultados fueron verdes. El aviso
existente de cobertura de vocabulario inglés A1 y la advertencia de Edge Runtime no
son fallos de T00.

## 10. Siete auditorías de T00

### 10.1 Full-stack, datos y repositorio — PASA para T00

- Origen canónico, HEAD, rama, upstream y dirty tree registrados.
- 20 módulos importan correctamente.
- 940 IDs son únicos.
- 260 referencias tienen archivo y no existen MP3 huérfanos.
- Se documentó la disparidad fuente/renderer.
- No se leyeron secretos ni se modificaron rutas concurrentes.

Este pase sólo prueba la línea base, no el producto final.

### 10.2 Experto TOEFL — PASA para T00

- La fuente oficial fue reabierta en la fecha de captura.
- Las cifras locales se compararon con la página operativa y el blueprint.
- La práctica en PDF no se usó como blueprint universal.
- Se preservó la distinción entre volumen, adaptatividad y scoring.

### 10.3 Editorial y diseño instruccional — NO APLICA, justificado

T00 no edita ni aprueba ítems. Sólo congela conteos y métricas. Los defectos
estructurales observables se registraron sin asignar clasificación A/B/C/D/E. La
auditoría editorial completa corresponde a T05 después de T03.

### 10.4 Audio técnico, lingüístico y humano — PASA sólo integridad de inventario

- Se comprobaron existencia, correspondencia, tamaño, duración y huella agregada.
- No se afirmó loudness, clipping, ASR, naturalidad ni aprobación humana.
- T04/T06/T07/T08 permanecen abiertas para esas capas.

### 10.5 Multiperspectiva, anti-sesgo y derechos — NO APLICA, justificado

No se creó, copió ni publicó contenido. Las fuentes ETS se usaron sólo para reglas y
comparación. La revisión de sesgo, similitud y derechos de los ítems queda en T05.

### 10.6 UI/UX y accesibilidad — NO APLICA a cierre de interfaz, justificado

Se inspeccionó el renderer sólo para establecer qué tipos contempla. No hubo cambio
de UI y T00 no puede certificar teclado, foco, móvil o lector de pantalla. Esos gates
permanecen abiertos en las unidades de piloto.

### 10.7 Playwright E2E — NO APLICA, justificado

No cambió el runtime y el gate T00 es un inventario de fuentes/activos. Ejecutar una
carga de página no probaría ninguna condición adicional de T00. La cobertura E2E
permanece obligatoria para las rebanadas que cambien la experiencia.

## 11. Antes/después y rollback

| Estado | Antes | Después |
|---|---|---|
| Evidencia T00 | Sólo cifras diagnósticas en el master | Artefacto fechado y reproducible |
| Huella del banco | No registrada | Fuentes y audio con fingerprint agregado |
| Código TOEFL | Sin cambios de T00 | Sin cambios de T00 |
| MP3 TOEFL | 260 | 260, sin sobrescritura |
| Tablero | T00 abierta | T00 cerrable |

Rollback documental: retirar este archivo y revertir la casilla/entrada T00 del
master. No existe rollback de contenido o audio porque no fueron modificados.

## 12. Riesgos residuales y siguiente unidad

- El árbol permanece sucio por trabajo concurrente; futuras unidades con código
  deben aislarse antes de tocar rutas compartidas.
- Las huellas son agregadas; T04 debe registrar cada archivo individualmente.
- No existe todavía un inventario editorial por ítem; T03 sigue abierta.
- La evidencia oficial todavía debe convertirse en registro de reglas y divergencias
  versionado; la siguiente primera unidad elegible es **T01**.
