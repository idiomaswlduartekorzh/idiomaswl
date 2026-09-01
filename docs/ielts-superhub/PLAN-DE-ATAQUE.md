# Plan de ataque — IELTS Practice Superhub

Estado actual: Fase 0 implementada; Fase 1 construida como piloto original y bloqueada
para integración hasta una escucha humana final del MP3. Fase 2 ya tiene una candidata
interna de Part 2 con contenido, MP3, mapa y evidencia ASR originales, pero no tiene ruta,
catálogo, sitemap, registro ni assets bajo `public/`. Part 3 también existe como candidata
privada original con tres voces, opción única, matching, MP3 y ASR. Part 4 tiene una
candidata privada de monólogo académico y note completion, con MP3, ASR y diez evidencias
reconciliadas. Matching y note completion permanecen deliberadamente no proyectables al
DTO público. El harness técnico puede aprobar estas candidatas aisladas, mientras el gate
estricto de release bloquea cualquier promoción sin aprobación humana.

Rama: `codex/ielts-superhub`

Base obligatoria: `origin/main` del repositorio canónico `idiomaswl`

Fuera de alcance: cualquier ruta, dato, componente, prueba o documento exclusivo de TOEFL

## Objetivo

Convertir `/practica/ielts` en un superhub SEO internacional que conecte intención de
búsqueda, instrucción original y práctica real, sin degradar ninguna de las superficies
IELTS ya publicadas.

El producto mantiene dos fronteras deliberadas:

1. `/practica/ielts/**` contiene recursos editoriales indexables.
2. `/examenes/ielts/practica/set-*` contiene sesiones funcionales `noindex, nofollow`.

Las sesiones existentes no se convertirán en landings SEO. Los nuevos hubs explican,
clasifican y conducen a una sesión; las respuestas, el estado del intento y la revisión
permanecen fuera del índice.

## Línea base que no puede disminuir

- 108 URLs IELTS protegidas en la candidata: 96 documentadas y 12 publicadas en sitemap
  que deben reconciliarse con el catálogo compartido antes de integrar.
- 77 archivos `page.tsx` bajo el árbol IELTS, incluidos templates dinámicos.
- Academic, General Training, Reading, Writing Task 1 y Writing Task 2.
- 14 tipos de pregunta y 6 habilidades de Reading.
- Tres podcasts IELTS dentro del hub mediante `ExamPodcastShelf`.
- 20 mocks registrados como `ielts:set-1` a `ielts:set-20`.
- Sesiones completas con Listening, Reading, Writing, Speaking, entrega y resultados.
- `robots: { index: false, follow: false }` en toda sesión de examen.
- MP3 presentes para Sets 1–12. Sets 13–20 permanecen bloqueados hasta que exista y se
  certifique su audio.

## Decisión editorial irreversible de Fase 1

El Set 1 histórico no se usa como fuente del superhub. La auditoría encontró que su Part
1 reproduce la estructura y gran parte de los datos de Cambridge IELTS 10 Test 1. Se
preserva para no romper el sistema existente, pero no se enlaza, proyecta ni reutiliza en
una URL indexable nueva.

El piloto usa `welearn-listening-part-1-001`: guion, diez preguntas y explicaciones
originales de WeLearn. El MP3 se genera con Piper y el modelo VCTK, cuyo MODEL_CARD
declara el corpus de entrenamiento bajo CC BY 4.0; la atribución es visible en la landing.
Su manifiesto de procedencia y derechos está en
`docs/ielts-superhub/originality/welearn-listening-part-1-001.json`.

## Arquitectura objetivo

```text
/practica/ielts
├── /listening
│   └── /part-1                    (piloto construido)
├── /reading                         (preservado)
├── /writing                         (puente futuro, sin mover rutas actuales)
├── /speaking
├── /academic                        (preservado)
└── /general-training                (preservado)

/examenes/ielts/practica/set-*       (preservado, noindex)
/practica/ielts/listening/sesion     (piloto construido, noindex)
```

No se crean `/part-2`, `/part-3`, `/part-4` ni `/practice-tests` hasta que cada URL tenga
contenido original completo. Una biblioteca de tests requiere al menos dos pruebas de
cuatro partes y 40 preguntas; no se publican placeholders para reservar keywords.

Listening y Speaking son compartidos por Academic y General Training. No se crearán
duplicados bajo ambas modalidades. Las rutas nuevas se publican sólo cuando su práctica,
metadata, fuente oficial, audio y auditoría están completas.

## Estrategia SEO internacional

La demanda se mide; no se inventa. Cada URL nueva empieza como hipótesis y sólo recibe
una intención propietaria después de triangular:

1. consultas y páginas de Search Console (país, dispositivo, query e impresión);
2. Google Trends mundial a cinco años, comparando tanto términos literales como el topic
   IELTS y revisando diferencias regionales;
3. Keyword Planner para volumen mensual por país e idioma;
4. SERP viva: títulos, People Also Ask, refinamientos, vídeo y tipo de página dominante;
5. brecha interna: impresiones sin landing, posición 8–30 o canibalización entre URLs.

El primer universo de investigación de Listening es:

| Intención candidata | Ruta propietaria propuesta | Estado |
|---|---|---|
| IELTS listening / IELTS listening practice | `/practica/ielts/listening` | hipótesis por validar |
| IELTS listening part 1–4 | `/practica/ielts/listening/part-{n}` | estructura oficial, demanda por medir |
| IELTS listening practice test / mock test | `/practica/ielts/listening/practice-tests` | hipótesis por validar |
| IELTS listening question types | `/practica/ielts/listening/tipos-de-preguntas` | candidato de Fase 2 |
| IELTS listening map labelling, multiple choice, note completion | hijos por tipo sólo si hay demanda y práctica única | no crear aún |
| IELTS listening score / band score | guía explicativa, nunca calculadora “oficial” | no crear aún |
| IELTS listening tips | integrar por parte/habilidad; evitar una landing genérica duplicada | no crear aún |

El corte de evidencia observable y las decisiones `create / merge / defer` del 1 de
septiembre de 2026 están documentados en
[`SEO-DEMAND-MAP-2026-09-01.md`](SEO-DEMAND-MAP-2026-09-01.md). Autocomplete y la SERP
sirven para descubrir lenguaje e intención, no para afirmar volumen; Search Console,
Trends y Keyword Planner siguen siendo puertas de cuantificación antes de escalar rutas.

Cada página indexable debe tener H1 y title alineados con la consulta, respuesta directa,
ejemplo original, práctica funcional, explicación posterior, enlaces a la siguiente
acción y una razón real para existir separada. Las sesiones, filtros y resultados no son
landings y permanecen fuera del sitemap.

## Estrategia EAO, GEO e IA

No se tratará EAO/GEO como un conjunto de “trucos” distintos de SEO. Google indica que
las mismas bases de contenido útil, indexabilidad y snippets aplican a AI Overviews y AI
Mode. La implementación será:

- respuesta autocontenida de 40–80 palabras cerca del H1;
- bloques con subtítulos descriptivos y anclas estables que una máquina pueda recuperar;
- separación visible entre `Formato oficial IELTS` y `Método de práctica WeLearn`;
- fuente primaria, fecha de verificación, autor/revisor y límites de la afirmación;
- transcripción para audio y texto alternativo que describa la función educativa;
- contenido principal renderizado en servidor, canonical propio y enlaces HTML rastreables;
- datos estructurados sólo si describen contenido visible y elegible; no se promete un
  rich result de FAQ para un sitio educativo;
- ninguna respuesta, audio personal o payload de evaluación en markup indexable;
- evaluación mensual de citación/visibilidad con un set fijo de prompts, separando la
  evidencia de Search Console de observaciones manuales en motores generativos.

En arquitectura de información, el grafo es `hub → skill/part → práctica → revisión →
reparación`. No se generan páginas programáticas por combinación de keyword: una URL
existe únicamente cuando tiene intención, recurso y feedback propios.

Fuentes de referencia revisadas el 31 de agosto de 2026:

- [IELTS Listening test format](https://ielts.org/take-a-test/test-types/ielts-academic-test/ielts-academic-format-listening)
- [IELTS sample test questions](https://ielts.org/take-a-test/preparation-resources/sample-test-questions)
- [Google Search Essentials](https://developers.google.com/search/docs/essentials)
- [AI features and your website](https://developers.google.com/search/docs/appearance/ai-features)
- [Google guide to generative AI features](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide)
- [Google Trends: compare terms](https://support.google.com/trends/answer/4359550)
- [Google Trends data limitations](https://support.google.com/trends/answer/4365533)
- [Canonical and sitemap guidance](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls)
- [Structured data policies](https://developers.google.com/search/docs/appearance/structured-data/sd-policies)

## Fases y puertas

### Fase 0 — Contrato, agentes y harness

Entregables:

- manifiesto de preservación y estado editorial;
- contratos de agentes y reglas de handoff;
- validador de verdad actual;
- auditor de alcance que impide tocar TOEFL;
- runner agregado con reporte JSON;
- pruebas de mutación para demostrar que el harness falla cuando debe.

Puerta: `npm run harness:ielts -- --compare-git-ref=origin/main`.

### Fase 1 — Piloto original Listening Part 1

Entregables:

- hub `/practica/ielts/listening`;
- capa SSR de seis entidades oficiales de tipos de pregunta, con anchors estables,
  decisiones, trampas, ejemplos originales y fuentes primarias en la misma canonical;
- landing Part 1 sin páginas vacías para Part 2–4;
- contrato público allowlist independiente del banco histórico;
- DTO público sin `answer` ni `answers`;
- audio aislado, con duración, checksum, generador reproducible y derechos de voz
  documentados; las voces de sistema de macOS están expresamente prohibidas;
- sesión parcial `noindex` con intento versionado;
- scoring de las diez respuestas exclusivamente en servidor;
- explicación y modelo de respuesta únicamente después de una entrega completa;
- enlace desde el hub IELTS sin cambiar rutas ni runners de simulacros existentes.

Puerta técnica: preservación del full mock Set 1 + pruebas de payload + checksum y
licencia de audio + SEO renderizado + recorrido móvil/escritorio. Puerta humana: escuchar
el MP3 completo y aprobar pronunciación, ritmo e inteligibilidad en el manifiesto; esa
misma aprobación reemplaza las etiquetas visibles de piloto.

### Fase 2 — Partes 2–4 originales

Se replica el contrato con guiones y audios originales. Los Sets 1–12 históricos siguen
preservados como deuda separada y no se convierten automáticamente en landings.

Part 2 avanza como `welearn-listening-part-2-001` en estado `draft`:

- Questions 11–15 usan opción única A–C con scoring exacto en servidor;
- Questions 16–20 usan etiquetado de mapa A–H con SVG original y controles HTML nativos;
- source, MP3, SVG y ASR viven fuera de toda superficie pública;
- el audio candidato se valida por hash y por metadata MPEG leída sin binarios externos;
- el source se audita por AST y sólo puede llegar a la UI/scorer mediante adaptadores
  canónicos; cualquier expresión dinámica, mutación o referencia no autorizada bloquea;
- catálogo, source, manifiesto y SVG deben reconciliar URL, path, dimensiones y `areaKeys`;
- landings, MP3, SVG, sitemap y marcadores huérfanos bloquean el gate inverso;
- transcript, guion del generador y claves 11–20 tienen pruebas de deriva y mutación;
- escucha humana y revisión visual/accesible siguen siendo bloqueos no delegables.

La promoción de Part 2 será atómica: assets aprobados, source con metadata final,
manifiesto aprobado, entrada de catálogo, registro estático, landing, sitemap, enlaces y
marcadores entran en el mismo cambio o el gate falla.

Part 3 avanza como `welearn-listening-part-3-001` en estado `draft`:

- Questions 21–25 usan opción única A–C; Questions 26–30 usan matching reutilizable A–C;
- el escenario educativo, el guion, las preguntas y las explicaciones son originales y
  fueron contrastados contra el corpus local con ventanas de diez palabras;
- el concepto inicial de cabinas silenciosas fue descartado por colisión temática local y
  pública antes de redactar la candidata definitiva;
- 48 turnos de tres roles se reconcilian por AST con el transcript y tres IDs Piper únicos;
- un ledger independiente fija el generador completo, renderer, modelo, configuración y
  versión de Piper; cualquier deriva cambia la huella y bloquea la reproducción;
- MP3 y ASR viven sólo en `docs/ielts-superhub/candidates/`; diez evidencias críticas están
  presentes, con errores de ASR documentados como cautelas y no como aprobación humana;
- el inventario inverso compara las huellas de candidatos privados contra todo `public/`,
  por lo que renombrar un binario no evita la detección de una filtración;
- el source mantiene audio `0`/hash cero y está fuera de catálogo, registro, sitemap,
  landings y `public/`;
- matching se valida y califica internamente, pero `projectIeltsListeningPractice` lo
  rechaza hasta que DTO público, renderer accesible y promoción se auditen juntos;
- el inspector AST canónico convierte únicamente fuentes profundas y estáticas; código
  dinámico, referencias desviadas o adaptadores no canónicos bloquean.

La promoción de Part 3 también será atómica. Además de escuchar las tres voces, un humano
debe aprobar su diferenciación, naturalidad musical, ritmo y justicia de distractores; un
ASR correcto no satisface esas puertas.

Part 4 avanza como `welearn-listening-part-4-001` en estado `draft`:

- un único lecturer desarrolla el tema original
  `From Fuzz to Wear-Off: Understanding Fabric Pilling` en 14 segmentos y 699 palabras,
  sin reutilizar bancos IELTS ni TOEFL;
- Questions 31–40 usan note completion con `ONE WORD ONLY`; el contrato liga el límite
  visible, el límite de transporte y cada blank, y bloquea instrucciones contradictorias;
- las claves `surface`, `friction`, `ball`, `attached`, `detach`, `strength`, `contrast`,
  `lighting`, `procedure` y `balance` están fijadas por test contra el source real;
- cada clave tiene evidencia inequívoca en el transcript y evidencia observable en ASR,
  en orden, mientras su contexto visible no contiene la respuesta;
- source y generador se reconcilian párrafo por párrafo; el ledger fija generador,
  renderer, Piper, modelo, configuración, speaker y parámetros de voz;
- el MP3 candidato dura 253.08 segundos, es mono 44.1 kHz/96 kbps y permanece junto con
  su ASR únicamente en `docs/ielts-superhub/candidates/`;
- la investigación editorial verificó el mecanismo de pilling y acotó la comparación de
  muestras sin reproducir un estándar técnico ni exigir conocimiento previo;
- la candidata no figura en registro, catálogo, sitemap, ruta, canonical, marcador ni
  asset público; el source conserva duración cero y hash cero;
- note completion se puede validar y puntuar en servidor, pero su proyección pública
  falla hasta implementar juntos el DTO allowlist y un renderer accesible;
- la canonical futura única es `/practica/ielts/listening/part-4`; `Section 4` será un
  sinónimo visible, no otra URL indexable; el manifiesto prohíbe también variantes de
  práctica, note completion y tips que competirían con esa canonical;
- el artículo `/blog/ielts-listening-errores-comunes` conserva la intención de consejos y
  errores; la futura landing posee práctica, Questions 31–40, audio y academic monologue.

La promoción de Part 4 será atómica y requiere escucha humana completa, revisión humana
de ciencia textil y justicia editorial, metadata final del source, renderer accesible,
registro, catálogo, landing, canonical, sitemap y asset público en un mismo cambio. La
suite Listening actual pasa 56 pruebas; esa evidencia técnica no equivale a aprobación
humana.

Puerta: `npm run harness:ielts:release` sin bloqueos para el recurso promocionado.

### Fase 3 — Speaking y consolidación

Se replica el patrón de landing indexable + sesión noindex. No se promete una banda
automática y no se presenta una estimación como evaluación oficial.

### Fase 4 — Autoridad y medición

- enlazado contextual desde el corpus IELTS del blog;
- grafo hub → habilidad → parte → práctica → reparación;
- Search Console por query/página/país/dispositivo;
- eventos `practice_start`, `part_complete`, `review_open`, `transcript_open` y
  `next_practice_click`;
- revisión de indexación, CTR, inicio, finalización y retorno a 30/60/90 días.

## Reglas de publicación

1. Una intención principal por URL.
2. Una sola H1, canonical propio, metadata propia y contenido principal SSR.
3. Una sesión o resultado nunca entra al sitemap.
4. Ningún set sin audio físico y auditado puede aparecer como práctica Listening activa.
5. `Official IELTS format` y `WeLearn practice strategy` deben distinguirse visiblemente.
6. Todo contenido interactivo debe mostrar respuesta explicada después de entregar.
7. No se copian preguntas, audios ni marcas de terceros.
8. Toda voz sintética requiere MODEL_CARD, licencia compatible y atribución visible; no
   se publican salidas de voces del sistema operativo.
9. No se despliega desde el worktree: producción sale únicamente de un commit integrado
   en `main`.
10. TOEFL no se modifica en esta rama.

## Orden de verificación por cambio

1. `npm run check:ielts:scope -- --compare-git-ref=origin/main`
2. `npm run check:ielts:truth`
3. prueba estrecha del componente o dato modificado
4. `npm run check:practica-catalog`
5. `npx tsc --noEmit --pretty false --incremental false`
6. recorrido de navegador de la historia modificada
7. `npm run harness:ielts:release` antes de integrar

El build global puede contener deuda preexistente documentada, pero una modificación del
superhub nunca puede introducir deuda nueva ni convertir un warning conocido en una falsa
certificación.
