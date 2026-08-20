# TOEFL 2026 — acta consolidada de Sets 1–20 para preview

Fecha: 14 de agosto de 2026

Revalidación de rama y preview: 20 de agosto de 2026

Owner y firma de derechos: José David Duarte Silva

Dictamen actualizado: **preview técnico pre-audio listo para revisión humana; no apto
todavía para producción ni para venderse como producto terminado**.

## Qué significa el dictamen

Los veinte sets ya tienen contenido escrito, composición, navegación y resultados para
una práctica fija alineada con las familias de tarea TOEFL iBT vigentes desde el 21 de
enero de 2026. La forma reproduce el volumen de la práctica oficial publicada por ETS:
40 Reading, 34 Listening, 12 Writing y 11 Speaking, para 97 interacciones.

El examen operacional publicado por ETS usa una base aproximada de 50 Reading y 47
Listening y cambia según la ruta adaptativa. Por eso el producto se presenta como
**simulacro alineado no adaptativo de ruta fija**, no como réplica adaptativa, examen
oficial ni equivalencia psicométrica. Writing y Speaking construidos tampoco reciben
una banda inventada.

Fuentes oficiales revalidadas el 14 de agosto de 2026:

- [ETS — Test Content and Structure](https://www.ets.org/content/ets-org/language-master/in/home/toefl/institutions/ibt/about/content-structure.html);
- [ETS — 2026 Test Blueprint and Specifications](https://www.ets.org/content/dam/ets-india/pdfs/toefl/toefl-ibt-test-specifications-2026.pdf);
- [ETS — Full-length Practice Test 1](https://www.ets.org/content/dam/ets-org/pdfs/toefl/toefl-ibt-full-length-practice-test-1.pdf).

ETS advierte que su práctica alineada está adaptada para práctica y no es una réplica
exacta. WeLearn conserva esa misma limitación de forma visible.

## Revisión manual del owner sobre Reading Set 1 — 20 de agosto de 2026

José David Duarte Silva reportó que los textos parecían demasiado cortos, que los
huecos de Complete the Words se veían muy juntos y que Listening se detenía al pasar
del primer al segundo ítem. La comparación se repitió contra el blueprint y el Full-length
Practice Test 1 vigente de ETS.

ETS admite textos sencillos de aproximadamente 15–50 palabras y textos complejos de
hasta 200; Read in Daily Life aparece en sets de 2 o 3 preguntas y el pasaje académico
de la práctica publicada lleva 5. Complete the Words se presenta como un párrafo con
10 palabras incompletas: después de una primera oración intacta, se oculta la segunda
mitad de cada segunda palabra. Por tanto, la concentración de huecos es parte de la
mecánica; la interfaz sólo debe mantener el párrafo legible.

| Bloque observado | Palabras | Preguntas/huecos | Dictamen |
|---|---:|---:|---|
| M1 Complete the Words — The Sun | 76 | 10 | Conforme; párrafo continuo y patrón alternado. |
| M1 Bookshop notice | 57 | 3 | Conforme con Daily Life de 3 ítems. |
| M1 Delivery messages | 75 | 2 | Conforme; `DELIVERY APP` identifica turnos, no copias del texto. |
| M1 The Green Sahara | 187 | 5 | Conforme con pasaje académico cercano a 200 palabras. |
| M2 Complete the Words — Kelp Forests | 84 | 10 | Conforme; párrafo continuo y patrón alternado. |
| M2 Campus bicycle repair station | 63 | 2 | Conforme con Daily Life de 2 ítems. |
| M2 Study-room reservation confirmation | 72 | 3 | Conforme con Daily Life de 3 ítems. |
| M2 Mangrove Forests | 188 | 5 | Conforme con pasaje académico cercano a 200 palabras. |

No se expandieron esos textos porque hacerlo los alejaría de la forma oficial. Se
mejoró únicamente el espaciado, ancho de lectura, interlineado y contraste de los
huecos. El bloqueo de Listening sí era un defecto: React conservaba el estado interno
de reproducción terminada del reproductor al sustituir el ítem 1 por el 2. El segundo MP3 existía,
pero su botón quedaba inerte mientras la navegación esperaba que terminara. El commit
`155f8828` asigna identidad por medio a cada panel, remonta el reproductor al cambiar
de audio y etiqueta los medios realmente pendientes con una acción explícita de
omisión. Ningún MP3 fue abierto ni modificado.

## Inventario verificado por set

Cada ruta fue solicitada de forma independiente contra el build de producción local.
`PASS` significa HTTP 200, título correcto, 97 interacciones, 8 etapas, 25 bloqueos por
medio y disclosure de ruta fija visibles en el HTML inicial.

| Set | Ruta | Reading | Listening | Writing | Speaking | Audio nuevo | Runtime |
|---:|---|---:|---:|---:|---:|---:|---|
| 1 | `set-1` | 40 | 34 | 12 | 11 | 20 | PASS |
| 2 | `set-2` | 40 | 34 | 12 | 11 | 20 | PASS |
| 3 | `set-3` | 40 | 34 | 12 | 11 | 20 | PASS |
| 4 | `set-4` | 40 | 34 | 12 | 11 | 20 | PASS |
| 5 | `set-5` | 40 | 34 | 12 | 11 | 20 | PASS |
| 6 | `set-6` | 40 | 34 | 12 | 11 | 20 | PASS |
| 7 | `set-7` | 40 | 34 | 12 | 11 | 20 | PASS |
| 8 | `set-8` | 40 | 34 | 12 | 11 | 20 | PASS |
| 9 | `set-9` | 40 | 34 | 12 | 11 | 20 | PASS |
| 10 | `set-10` | 40 | 34 | 12 | 11 | 20 | PASS |
| 11 | `set-11` | 40 | 34 | 12 | 11 | 20 | PASS |
| 12 | `set-12` | 40 | 34 | 12 | 11 | 20 | PASS |
| 13 | `set-13` | 40 | 34 | 12 | 11 | 20 | PASS |
| 14 | `set-14` | 40 | 34 | 12 | 11 | 20 | PASS |
| 15 | `set-15` | 40 | 34 | 12 | 11 | 20 | PASS |
| 16 | `set-16` | 40 | 34 | 12 | 11 | 20 | PASS |
| 17 | `set-17` | 40 | 34 | 12 | 11 | 20 | PASS |
| 18 | `set-18` | 40 | 34 | 12 | 11 | 20 | PASS |
| 19 | `set-19` | 40 | 34 | 12 | 11 | 20 | PASS |
| 20 | `set-20` | 40 | 34 | 12 | 11 | 20 | PASS |
| **Total** | **20 rutas** | **800** | **680** | **240** | **220** | **400** | **20/20** |

Los 97 ítems están escritos en cada set. “Audio nuevo” cuenta archivos, no preguntas:
14 Listening, 2 Repeat y 4 Interview por set. Como algunos estímulos de Listening se
comparten entre preguntas, los 20 archivos pendientes bloquean 25 interacciones por
set: 19 Listening y 6 Speaking.

## Auditoría de contenido y scoring

| Superficie | Estado comprobado | Resultado que puede mostrarse |
|---|---|---|
| Reading 40 | Los dos módulos, render, respuestas e IDs privados pasan guardianes en Sets 1–20. | Aciertos brutos locales. |
| Listening 34 | 15 interacciones por set reutilizan medios; 19 quedan bloqueadas. Las 680 claves viven sólo en servidor. | Aciertos brutos sólo sobre ítems presentados; bloqueos nunca son errores. |
| Build a Sentence 10 | Orden, IDs, renderer y claves privadas pasan guardianes en Sets 1–20. | Aciertos brutos locales. |
| Email + Discussion 2 | Prompts originales presentes y relojes de 7/10 minutos aplicados. | `not_evaluated`; sin banda automática. |
| Repeat 7 + Interview 4 | Composición completa; 5 Repeat reutilizables y 6 prompts bloqueados por set. Captura real local disponible cuando el estímulo esté listo. | `not_evaluated`; sin autoevaluación 1–6. |

La revisión de segunda persona fue dispensada expresamente por el owner. El acta no
afirma independencia editorial. La firma de derechos declara autoría propia del banco;
no convierte el material en contenido oficial ETS. Las revisiones factuales, de
unicidad, paridad datos→render→scoring y procedencia registradas en los lotes anteriores
se conservan como evidencia.

## Experiencia comprobada

- ocho etapas en orden irreversible;
- Reading editable dentro del módulo activo;
- Listening y Speaking avanzan un ítem a la vez, sin volver atrás;
- deadline absoluto tras recarga para los relojes publicados o declarados;
- no se inventan segundos por respuesta de Listening o Speaking;
- audio listo de una sola reproducción; respuesta bloqueada hasta que termine;
- medio faltante visible y excluido del scoring;
- captura de Speaking temporal en la pestaña, sin carga a servidor y sin nota;
- resultado sin overall parcial, sin banda aproximada y sin conversión `/120`;
- persistencia probada al recargar y vista 320×900 sin overflow horizontal;
- VoiceOver T13 aprobado por el owner; T16 y T17 siguen pendientes.

## Evidencia automática

- Reading fijo: checker PASS y unit 3/3;
- Listening fijo: checker PASS y unit 3/3;
- Speaking fijo: checker PASS y unit 2/2;
- sesión fija: checker PASS y unit 3/3;
- CTW 8/8, Reading 8/8, Build 9/9 y Writing 8/8;
- TypeScript PASS, ESLint dirigido PASS y diff dirigido TOEFL sin errores;
- build Webpack de producción PASS, 1.365/1.365 rutas. El `npm run build` exacto
  ejecutó primero todos los guardianes y después Turbopack rechazó únicamente el
  symlink externo de `node_modules` propio de este worktree temporal; no reportó una
  falla de aplicación. La repetición oficial con `--webpack` compiló completa;
- smoke HTML del build: 20/20 rutas PASS;
- guardianes globales PASS: catálogo 465, escritura 480, 24 series y 480 MP3 de
  práctica auditiva ajenos a TOEFL preservados;
- después de incorporar `origin/main` `16b80b03`, los ocho guardianes TOEFL y sus 44
  pruebas unitarias volvieron a pasar. Los guardianes de inmutabilidad de audio se
  limitaron correctamente a `public/audio/toefl/`: siguen bloqueando cualquier cambio
  de audio TOEFL, pero no confunden un MP3 nuevo de otro producto traído por `main` con
  una regresión TOEFL;
- el preview Vercel del merge `b32d25da` ejecutó el `npm run build` exacto con
  Turbopack y Node 24: guardianes PASS, compilación PASS, TypeScript PASS y
  1.822/1.822 páginas estáticas generadas. El despliegue
  `dpl_DhWVcV8HmU2uBUVcbevP92mTEbjy` quedó `READY` y asociado al alias protegido de
  la rama. Su manifiesto de outputs contiene la ruta
  `examenes/[exam]/practica/[mockId]` usada por los veinte sets;
- el despliegue Git posterior `dpl_7pkH2W2xTbV2DqSyh56Chf8zjkuN`, correspondiente
  al arreglo `155f8828`, no llegó a publicarse: la clonación consumió 39:13 y Vercel
  lo cerró con `BUILD_EXCEEDED_MAXIMUM_TIME` al alcanzar el límite total de 45
  minutos. Antes del corte sí pasó guardianes, compilación, TypeScript y generación
  de rutas. El siguiente intento debe evitar esa clonación lenta y permanecer como
  preview protegido, nunca producción;
- ningún audio fue abierto, reproducido, transcrito, generado ni modificado.

## Gates para declarar “producto terminado”

| Gate | Estado | Qué falta |
|---|---|---|
| Contenido escrito y composición | CERRADO | 20×97 presentes y auditados. |
| Runner, clocks y resultados honestos | CERRADO | Pruebas y build pasan. |
| Producción local de las 20 rutas | CERRADO | Smoke 20/20 pasa. |
| VoiceOver T16/T17 | ABIERTO | Revisión humana del owner en Build, Email y Discussion. |
| Rama contra `origin/main` | CERRADO | `origin/main` `16b80b03` está incorporado en `b32d25da`; 0 commits detrás, catálogo, TypeScript y guardianes TOEFL PASS. |
| Build del preview Vercel | ABIERTO | El preview anterior sigue `READY`, pero no contiene `155f8828`. El intento nuevo agotó los 45 minutos por la clonación lenta; falta publicar el arreglo desde un commit limpio. |
| Revisión humana del preview | ABIERTO | Después del nuevo `READY`, el owner debe probar CTW y el avance Listening 1→2, y aprobar T16/T17 con VoiceOver. La protección SSO no se debilita. |
| Aprobación de audio | ABIERTO | Manifiesto exacto, voces, muestra y costo; requiere autorización explícita. |
| Generación y QA de audio | BLOQUEADO | Crear sólo el lote aprobado y luego revisar técnica, texto/voz y experiencia. |
| Producción | BLOQUEADO | Requiere cierre de todos los gates anteriores y autorización separada. |

Conclusión: los 20 simulacros y el arreglo están **listos para un nuevo preview técnico
pre-audio**, pero `155f8828` todavía no está publicado porque el primer intento agotó
el tiempo de infraestructura de Vercel. Aún no están listos para venderse o desplegarse
en producción como producto terminado: faltan el preview `READY`, la aprobación humana
de CTW, Listening y VoiceOver T16/T17, y después el gate separado de manifiesto, voces,
muestra, costo, generación y QA de los 400 audios.
