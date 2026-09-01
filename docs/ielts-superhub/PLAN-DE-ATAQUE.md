# Plan de ataque — IELTS Practice Superhub

Estado inicial: Fase 0 implementada; Fase 1 bloqueada hasta certificar el piloto

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

- 106 URLs IELTS actualmente indexables: 96 documentadas y 10 publicadas que deben
  reconciliarse con el catálogo antes de expandir.
- 74 archivos `page.tsx` bajo el árbol IELTS, incluidos templates dinámicos.
- Academic, General Training, Reading, Writing Task 1 y Writing Task 2.
- 14 tipos de pregunta y 6 habilidades de Reading.
- Tres podcasts IELTS dentro del hub mediante `ExamPodcastShelf`.
- 20 mocks registrados como `ielts:set-1` a `ielts:set-20`.
- Sesiones completas con Listening, Reading, Writing, Speaking, entrega y resultados.
- `robots: { index: false, follow: false }` en toda sesión de examen.
- MP3 presentes para Sets 1–12. Sets 13–20 permanecen bloqueados hasta que exista y se
  certifique su audio.

## Arquitectura objetivo

```text
/practica/ielts
├── /listening
│   ├── /part-1
│   ├── /part-2
│   ├── /part-3
│   ├── /part-4
│   └── /practice-tests
├── /reading                         (preservado)
├── /writing                         (puente futuro, sin mover rutas actuales)
├── /speaking
├── /academic                        (preservado)
└── /general-training                (preservado)

/examenes/ielts/practica/set-*       (preservado, noindex)
/practica/ielts/listening/sesion     (futuro, noindex)
```

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

### Fase 1 — Piloto Listening Set 1 / Part 1

Entregables:

- hub `/practica/ielts/listening`;
- hubs Part 1–4 y biblioteca de tests;
- extractor puro que consume `MockExam.sections` sin copiar preguntas;
- DTO público sin `answer` ni `answers`;
- audio segmentado o cue points auditados;
- sesión parcial `noindex` con intento versionado;
- enlaces desde el hub IELTS, Academic, General Training y contenido relacionado.

Puerta: preservación del full mock Set 1 + pruebas de payload + auditoría de audio + SEO
renderizado + recorrido móvil/escritorio.

### Fase 2 — Sets 1–12

Se expanden únicamente los sets con MP3 físico. Cada promoción de estado exige cuatro
partes de diez preguntas, transcript, clave válida, rango de audio y revisión editorial.

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
8. No se despliega desde el worktree: producción sale únicamente de un commit integrado
   en `main`.
9. TOEFL no se modifica en esta rama.

## Orden de verificación por cambio

1. `npm run check:ielts:scope -- --compare-git-ref=origin/main`
2. `npm run check:ielts:truth`
3. prueba estrecha del componente o dato modificado
4. `npm run check:practica-catalog`
5. `npx tsc --noEmit --pretty false`
6. recorrido de navegador de la historia modificada
7. `npm run harness:ielts:release` antes de integrar

El build global puede contener deuda preexistente documentada, pero una modificación del
superhub nunca puede introducir deuda nueva ni convertir un warning conocido en una falsa
certificación.
