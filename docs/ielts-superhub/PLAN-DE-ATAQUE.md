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

### Reanudación operativa — 4 de septiembre de 2026

- Estado: `EN_VALIDACION`; no listo para integrar ni desplegado.
- Checkpoint remoto recuperado: `2e0ec45d`; base `origin/main` verificada:
  `8350ddf1a5a5a4e4f6345da2717a7bb7e0f1e4d3`.
- Workspace: `/Volumes/WELEARN_DEV/idiomaswl-ielts-superhub`, dentro de la imagen de
  desarrollo de la USB. El volumen pasó verificación APFS de solo lectura al reanudar.
- Pendientes recuperados: contrato de candidatas privadas Listening y banco privado
  Speaking Part 1. Sus pruebas anteriores no sustituyen la nueva auditoría adversarial.
- Reserva de compartidos en esta fase: sólo scripts IELTS de `package.json`, runner
  `scripts/run-ielts-superhub-harness.mjs` y este documento; no se cambia sitemap,
  navegación, catálogos mixtos, configuración de despliegue ni código TOEFL.
- Integración: aplazada. SHA integrado en main, deployment y smoke de producción:
  no aplican a este incremento privado.

Resultado histórico del checkpoint de reanudación, anterior a los ASR nuevos:

- `npm run harness:ielts`: `APPROVE` técnico; nueve etapas completas, incluidas
  preservación, alcance, catálogo, 9 mutaciones del harness, 81 pruebas Listening y
  15 pruebas Speaking. Informe reproducible: `tmp/ielts-superhub-harness/latest-truth.json`.
- TypeScript `--noEmit --incremental false`: exit 0. ESLint de las superficies
  modificadas y `git diff --check`: exit 0.
- Auditorías independientes: cerrados los hallazgos reproducidos de imports escapados,
  rutas dinámicas, config mutable, manifests incompletos, getter generador, rutas API
  alternativas, archivos públicos con NUL y symlinks de fuentes/manifests/artefactos.
- CLI privada: integridad `PASS`; preparación técnica `BLOCKED` exclusivamente por
  `ASR_INPUT_AUDIO_SHA256_MISSING` en Parts 2/3. Part 4: `READY`. Publicación: `BLOCK`
  en las tres candidatas, sin autoaprobaciones ni cambios de los manifests Listening.
- `node scripts/check-ielts-listening-release.mjs --release`: `BLOCK` esperado por
  escucha humana pendiente de Part 1. No se ejecutó build completo ni release harness;
  no se infiere aptitud para producción de las pruebas locales.
- Continuación cada cinco minutos en esta tarea: `continuar-ielts-superhub-en-usb`.
  Requiere USB montada y equipo/app disponibles; no integra ni despliega. Próximo trabajo
  útil: generar evidencia ASR nueva y trazable para Parts 2/3 con la cadena existente,
  sin completar hashes retroactivamente; luego avanzar la siguiente pieza privada del
  producto, conservando las revisiones humanas. No repetir auditorías sin cambios.

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
- MP3 y ASR viven sólo en `docs/ielts-superhub/candidates/`; el ASR actual contiene nueve
  evidencias directas y apoyo contextual para Q30, con cautelas y sin aprobación humana;
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
suite Listening del checkpoint de Part 4 pasó 56 pruebas; esa evidencia no equivale a aprobación
humana.

Puerta: `npm run harness:ielts:release` sin bloqueos para el recurso promocionado.

### Fase 3 — Speaking y consolidación

El primer incremento es exclusivamente privado y textual:

- banco `welearn-speaking-part-1-bank-001`: seis topic packs y 24 preguntas originales;
- receta `welearn-speaking-part-1-001`: `seat-choices` + `indoor-light`, ocho preguntas
  en orden fijo; estos conteos son diseño WeLearn, no una regla oficial IELTS;
- duración de referencia de Part 1 completo: 4–5 minutos, sin tiempo oficial por pregunta;
- no captura de respuestas, audio, grabación, persistencia, red, identidad, banda,
  evaluación, feedback automático ni respuestas modelo;
- fuente `server-only`, contrato de campos permitidos, manifiesto no aprobado y pruebas
  de mutación de estructura, privacidad y aislamiento;
- futura canonical única `/practica/ielts/speaking/part-1`; los packs no tienen páginas
  independientes. No se crea el hub padre hasta disponer de inventario suficiente;
- no se conecta al recorder, submission ni evaluador de los mocks existentes.

La implementación de landing indexable + sesión noindex será otra promoción auditada.
No se promete una banda automática ni se presenta una estimación como evaluación oficial.

### Contrato transversal de candidatas privadas

El auditor común de Listening reconcilia source ↔ manifiesto ↔ directorio de candidata y
devuelve tres decisiones distintas: `integrity`, `machineReadiness` y
`publicationDecision`. La última siempre es `BLOCK` en este contrato privado.

El comando `node scripts/check-ielts-listening-private-candidates.mjs` certifica sólo
integridad/aislamiento; `--require-machine-ready` exige además evidencia técnica completa.
Los errores se reportan como códigos e identificadores, sin contenido privado ni mensajes
de excepciones. Ningún modo sustituye la escucha o revisión editorial humana.

Deuda observada al reanudar: Parts 2 y 3 carecían del campo `inputAudioSha256` en el
manifiesto ASR. Se generaron ejecuciones nuevas con la entrada exacta, se preservó la
evidencia anterior en un archivo histórico y se incorporó la procedencia nueva junto
con el contrato y sus pruebas. La incorporación pasó el harness técnico; no se rellenaron
hashes retrospectivos en los ASR anteriores. Part 4 conserva su vínculo previo.
Todas las candidatas permanecen bloqueadas para publicación humana.

#### Reproducción ASR sin modificar candidatas

El runner `scripts/transcribe-ielts-listening-candidate.py` prepara una ejecución nueva
para Part 2, 3 o 4 bajo `tmp/ielts-asr-runs/`. Conserva una copia exacta del MP3 de entrada,
comprueba el modelo local Whisper small y genera `asr.json` + `provenance.json` con hashes,
fechas y opciones. No sustituye el ASR anterior, no edita manifiestos y no aprueba contenido.

La ejecución utiliza CPU y dos threads; dependencias, temporales y cachés nuevos viven
en la USB. El checkpoint del modelo ya existente se lee sin modificarlo. La promoción de
esta evidencia exige revisar el resultado, conservar los artefactos anteriores y actualizar
juntos los contratos y los hashes; ejecutar el runner por sí solo no elimina los bloqueos.

Preparación local del 4 de septiembre: instalación finalizada con exit 0 en el entorno
aislado `tmp/ielts-whisper-venv`, `openai-whisper==20250625`. Las ejecuciones reales de
Parts 2 y 3 finalizaron con exit 0, con snapshots y procedencia verificadas. Se
incorporaron a los manifests privados sin declarar preparación para publicación.

Verificación del runner: ocho pruebas stdlib aprobadas con Python 3.9.6, revisión
adversarial independiente y `check:ielts:scope` aprobados. Se cerró una filtración
reproducible por stderr; se comprueba silencio de ambos streams en éxito y excepción.
La evidencia incluye versiones de Python, Torch y NumPy y huella del binario FFmpeg.
Estas pruebas usan un backend simulado: no se presentan como ASR real ni cambian
`machineReadiness` de las candidatas. No se añadió Python al build de la aplicación web.

Las ejecuciones nuevas están en `tmp/ielts-asr-runs/part-2-w991_efa` y
`tmp/ielts-asr-runs/part-3-w1feknit`; no hay procesos ASR pendientes ni razón para repetirlas.
La revisión independiente encontró diez claves respaldadas en Part 2. En Part 3, Q21–29
tienen evidencia directa y Q30 apoyo contextual con el nombre Lara truncado como La;
ese cierre requiere escucha humana y no certifica diferenciación de voces.

Registro de hashes, tiempos, evidencia y cautelas nuevas:
[`ASR-RECONCILIATION-2026-09-04.md`](ASR-RECONCILIATION-2026-09-04.md).
Incorporación actual: evidencia anterior archivada, ASR/procedencia nuevos y contratos
conectados; pruebas individuales Parts 2/3, suite común y harness técnico aprobados.
No cambiaron los gates humanos, MP3, mapa, source ni superficies públicas.
El archivo histórico se exige sólo para las dos candidatas 001 reemplazadas; candidatas
nuevas requieren procedencia, no historia inventada. Serializar pruebas y ASR por las
esperas de I/O observadas en la USB.

Validación estrecha terminada: 34/34 pruebas privadas readiness+CLI aprobadas (213 s,
con esperas de I/O USB, sin fallos). Sesión `71487` completada; no reanudar ni duplicar.
Además, Part2/Part3 aprobaron 10/10. `test:ielts:listening` conserva todos sus archivos
y ahora usa `--test-concurrency=1` para que el harness también limite el I/O simultáneo.
Harness técnico terminado (sesión `75925` completada): APPROVE, nueve etapas completas;
90 pruebas Listening, 15 Speaking y 9 mutaciones del harness aprobadas. Informe nuevo
terminado a las 15:32:29.335 UTC. CLI privada: Parts 2–4 con integridad PASS y preparación
técnica READY, siempre con publicación BLOCK. El gate humano estricto terminó con exit 1
por la escucha pendiente de Part 1, como se esperaba. No repetir harness ni ASR sin
cambios nuevos. ESLint de los cuatro archivos modificados del contrato/pruebas aprobó
con exit 0. Se guarda un checkpoint local; el push sigue pendiente de autorización y no
se reintenta por otra vía. No hay procesos de validación pendientes de este incremento.

Paquete privado preparado: [`REVISION-HUMANA-LISTENING.md`](REVISION-HUMANA-LISTENING.md),
basado en `70648c0b`. Reúne los cuatro audios existentes (15:12 acumulados, no un mock
completo), fuentes, manifests, mapa y ASR vigente; checklist y ficha empiezan pendientes.
Se verificaron los 18 enlaces locales, las ocho huellas audio/source y la del mapa.
Una revisión independiente confirmó los bloqueos específicos y Q30 contextual; se
incorporaron identidad del mapa y confirmación explícita de la persona revisora.
No cambia aprobaciones, manifests, audios ni superficies públicas. No se repite el harness
aprobado por este incremento exclusivamente documental. `git diff --check` y
`check:ielts:scope -- --compare-git-ref=origin/main` aprobaron sin cambios en TOEFL.

Contrato privado de controles preparado en `src/lib/ielts/listening-draft-input-contract.ts`:
matching y note completion reciben únicamente specs de entrada, sin importar fuentes,
audio ni claves. Hay estados `incomplete`/`invalid`/`ready`, errores por pregunta, límite
de 80 caracteres y de una a tres palabras según el spec, política de reutilización
explícita e IDs/nombres por instancia.
`ready` significa sólo que ese bloque tiene entradas válidas; no evalúa respuestas ni
certifica un intento, accesibilidad, contenido o publicación. No hay renderer conectado,
proyección nueva, persistencia, red o cambios en el endpoint. La política `once-only` es
una ayuda privada adicional: el validador de transporte actual no comprueba esa política.

Verificación estrecha: 16/16 pruebas aprobadas (10 nuevas y 6 existentes de matching y
notes), incluyendo los rechazos de proyección pública vigentes. TypeScript aislado del
nuevo módulo, sin emisión ni caché incremental: exit 0. Revisión adversarial independiente:
un P2 reproducido por getters heredados en arrays se cerró exigiendo `Array.prototype`;
ambas mutaciones comprueban cero ejecuciones y error genérico. No se copiarán estos
resultados como prueba de accesibilidad: controles nativos, asociaciones reales, foco,
teclado y recorrido de navegador todavía deben implementarse y probarse.

Validación ampliada terminada: sesión `68922` completada con exit 0; no reanudar ni
duplicar. Harness técnico APPROVE, nueve etapas PASS: 100 pruebas Listening (incluidas
las diez nuevas), 15 Speaking y nueve mutaciones. Las 108 URLs IELTS, 20 mocks, 480
audios generales y el catálogo protegido siguen íntegros. Parts 2–4 conservan integridad
PASS y preparación técnica READY, siempre con publicación BLOCK.
Informe de esta ejecución: `tmp/ielts-superhub-harness/latest-truth.json`, desde
`2026-09-04T16:15:19.549Z` hasta `2026-09-04T16:21:06.685Z`; SHA-256
`47dc9eda1c71aac19c111aa09baca1ea3ba240a10c9006c645ccd136933d6175`.
ESLint del código final, TypeScript aislado del módulo y `git diff --check`: exit 0.
No se ejecutaron build global, navegador, TypeScript global ni release harness; el
incremento no cambia interfaces activas ni aprobaciones humanas. Checkpoint sólo local
en la USB: cuatro archivos, sin cambios ajenos ni TOEFL. El respaldo remoto sigue
pendiente de autorización; no hubo push, merge, PR ni despliegue.

Próximo avance acotado: renderer privado con fixtures sintéticos para matching, seguido
de notes, sin importar candidatas ni habilitar rutas. Mantener los rechazos del projector
y el estado humano pendiente. Antes de editar componentes, leer guías locales de Next
y diseño; probar el camino exacto sin build global. La cuantificación de demanda sigue
pendiente de datos verificables.

El checkpoint del runner `d393bbc0` está únicamente en la USB: su push fue rechazado por
el control automático y se solicitó autorización explícita para enviarlo al repositorio
canónico. No reintentar ese envío mientras siga pendiente la autorización.

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
