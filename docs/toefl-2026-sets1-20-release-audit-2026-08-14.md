# TOEFL 2026 — acta consolidada de Sets 1–20

Fecha: 14 de agosto de 2026

Revalidación de producto: 21 de agosto de 2026

Revalidación de longitud de opciones: 31 de agosto de 2026

Owner y firma de derechos: José David Duarte Silva

Dictamen actualizado: **los 20 sets tienen contenido, navegación, 400/400 audios y
captura real de respuestas construidas cerrados**. La entrega privada vuelve a corregir
Reading, Listening y Build en el servidor, conserva Email/Discussion y sube las 11
grabaciones de Speaking antes de mostrar resultados. Writing recibe una estimación
pedagógica entera 0–5 por tarea y Speaking queda para revisión humana 0–5 por familia.
No se calcula banda 1–6, overall ETS ni equivalencia `/120`.

Los reportes detallados e inventarios intermedios se retiraron de la rama operativa
después de crear el respaldo remoto
`archive/toefl-2026-full-audit-20260820`. Aquí se conserva el dictamen consolidado;
producto, pruebas, guardianes, manifiesto y paquete de audio permanecen versionados.

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

## Revisión transversal de longitud de opciones — 31 de agosto de 2026

El owner detectó en Reading Set 2 que la respuesta correcta podía reconocerse con
frecuencia por ser la opción más larga. La medición se hizo sobre las 400 preguntas de
selección única que ve el estudiante en los módulos 1 y 2 de Sets 1–20, resolviendo
también las claves que sólo existen en el registro privado del servidor.

Antes de la corrección, marcar siempre la única opción más larga acertaba 14/20 en Set
2 y entre 55 % y 85 % en otros trece sets. Se reescribieron distractores conservando las
claves y la evidencia de cada pasaje. Después de la corrección, todos los sets quedan
entre 8/20 y 10/20; Set 2 queda en 9/20. Ninguna clave supera por ocho palabras o más al
mejor distractor.

`npm run check:toefl-option-length` reproduce la medición y forma parte de `prebuild`.
Falla cerrado si no encuentra exactamente 20 preguntas auditables por set, si la
estrategia de la opción más larga supera 50 % o si reaparece un outlier de ocho palabras.
Los bancos editados avanzaron su versión de contenido sin cambiar IDs ni respuestas.

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
14 Listening, 2 Repeat y 4 Interview por set. Los 400 archivos fueron liberados el
21 de agosto de 2026 y el guardián comprueba ruta, tamaño y hash antes de cada build.

## Auditoría de contenido y scoring

| Superficie | Estado comprobado | Resultado que puede mostrarse |
|---|---|---|
| Reading 40 | Los dos módulos, render, respuestas e IDs privados pasan guardianes en Sets 1–20. La entrega se recalifica en servidor. | Aciertos brutos de práctica; no score ETS. |
| Listening 34 | Los 34 ítems tienen medio liberado y las 680 claves viven sólo en servidor. La entrega se recalifica en servidor. | Aciertos brutos de práctica; no score ETS. |
| Build a Sentence 10 | Orden, IDs, renderer y claves privadas pasan guardianes en Sets 1–20. La entrega se recalifica en servidor. | Aciertos brutos de práctica; no score ETS. |
| Email + Discussion 2 | Prompts originales presentes, relojes de 7/10 minutos, persistencia privada y rúbricas separadas. | Estimación pedagógica entera 0–5 por tarea; sin conversión 1–6. |
| Repeat 7 + Interview 4 | Los 11 estímulos tienen audio y cada avance exige una grabación real que se conserva hasta confirmar la entrega privada. | Revisión humana entera 0–5 por familia; sin conversión 1–6. |

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
- cualquier medio faltante futuro queda visible y excluido del scoring;
- 11 grabaciones de Speaking sobreviven el avance y se confirman por tamaño en un bucket privado;
- los dos textos quedan guardados incluso si el motor automático está ocupado;
- panel administrador con textos, reportes, audios temporales y cierre humano de Speaking;
- resultado sin overall parcial, sin banda aproximada y sin conversión `/120`;
- persistencia probada al recargar y vista 320×900 sin overflow horizontal;
- VoiceOver T13, T16 y T17 aprobados por el owner.

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
- el despliegue directo desde el commit limpio `50ec7ed6` evitó esa clonación. El
  preview `dpl_CC274qEYiqZWye8rWZMEXqBPy29a` quedó `READY`: catálogo protegido PASS,
  compilación PASS, TypeScript PASS, 1.822/1.822 páginas y ruta
  `examenes/[exam]/practica/[mockId]` presente en el manifiesto. El alias estable de
  la rama fue asignado al nuevo preview y conserva SSO: Set 1 responde 302 al login
  cuando se solicita sin sesión y HTTP 200 mediante la comprobación autenticada del
  CLI;
- la revisión visual del owner detectó que los campos de Complete the Words heredaban
  el `line-height` alto del párrafo y parecían tarjetas verticales. Se conservaron sin
  cambios las 10 posiciones oficiales y el scoring, pero los campos pasaron a huecos
  subrayados compactos: 26 px de alto en 1.440 px y 24 px en 390 px. Chromium verificó
  foco visible, Tab 1→2, consola sin errores y móvil sin overflow (390/390); el checker
  CTW impide reintroducir `font: inherit` y la altura genérica del input;
- el commit limpio `ecf0b591` se publicó sólo como preview directo. El despliegue
  `dpl_3HHzkaRN4rjaPAPyQ7B4WrVA5s6q` quedó `READY`: catálogo protegido PASS,
  compilación Turbopack PASS en 2,2 minutos, TypeScript PASS, 1.822/1.822 páginas y
  ruta `examenes/[exam]/practica/[mockId]` presente. El alias protegido estable apunta
  a este artefacto y una petición anónima a Set 1 continúa recibiendo 302 al SSO;
- el owner indicó “continúa” después de revisar el arreglo, por lo que el gate humano
  específico del espaciado CTW queda aprobado. Esto no aprueba producción ni audios;
- se incorporó después el `origin/main` `b5e615cb` mediante `d16a75bb`, sin perder lo
  añadido por SAT/IELTS/Habla. El único conflicto fue aditivo en los tipos compartidos:
  quedaron `moduleId` para TOEFL e `insights` para SAT. La rama quedó 0 commits detrás;
- tras esa reconciliación volvieron a pasar catálogo 465, guardianes globales, SAT,
  los ocho guardianes TOEFL, 44/44 pruebas, TypeScript y ESLint dirigido. El build de
  producción con Webpack compiló en 104 s, terminó TypeScript en 63 s y generó
  1.834/1.834 páginas, incluida la ruta dinámica de los simulacros;
- `main` avanzó otra vez durante la cola de Vercel. `a6707877` se incorporó sin
  conflictos en `50d1ba6f`; la rama quedó nuevamente 0 commits detrás. Los ocho
  guardianes TOEFL, 44/44 pruebas, TypeScript, catálogo, guardianes globales, IELTS,
  SAT y el build Webpack de 1.834/1.834 páginas volvieron a pasar;
- Vercel retiró antes de compilar los intentos reconciliados Git
  `dpl_BFxacEDNESe67QAprZwGnJw6K8KD` y directo
  `dpl_13NNLoLdYLag9e9g44TUyBjigi2p` al entrar una producción y dos previews IELTS.
  No existe un fallo de aplicación asociado. El alias estable TOEFL sigue sirviendo
  el preview anterior aprobado `dpl_3HHzkaRN4rjaPAPyQ7B4WrVA5s6q` como `READY`;
- el intento posterior `dpl_Ch1VKomZPfWwTLSk8xCa75RNLaD2`, commit `1dd7b7e`, terminó
  `READY`: catálogo 465, compilación, TypeScript, 1.834/1.834 páginas y ruta dinámica
  de simulacro PASS. El alias protegido se movió a este artefacto; Set 1 responde 200
  con bypass autenticado y 302/SSO sin sesión;
- José David Duarte Silva declaró **“voiceover ok”** el 2026-08-20 después de recibir
  los checklists T16 y T17. Ambas matrices quedan cerradas y sin pendiente humano;
- Chromium/Playwright restauró Set 1 directamente en Listening Módulo 1 sin reproducir
  audio. El ítem 1/18, marcado localmente como reproducción ya consumida, avanzó al
  2/18; el segundo ítem montó un reproductor nuevo, volvió a desactivar respuestas y
  avance, y conservó el aviso de escucha completa. En el ítem 6/18, primer medio
  ausente, la UI mostró el estado bloqueado, desactivó sus opciones y el control
  `Omitir ítem sin audio y continuar` avanzó al 7/18. Consola: cero errores; únicamente
  avisos no bloqueantes de `preload` CSS;
- ningún audio fue reproducido, escuchado, transcrito, generado ni modificado.

## Gates para declarar “producto terminado”

| Gate | Estado | Qué falta |
|---|---|---|
| Contenido escrito y composición | CERRADO | 20×97 presentes y auditados. |
| Runner, clocks y resultados honestos | CERRADO | Pruebas y build pasan. |
| Producción local de las 20 rutas | CERRADO | Smoke 20/20 pasa. |
| VoiceOver T16/T17 | CERRADO | José David Duarte Silva aprobó ambos checklists con “voiceover ok” el 2026-08-20. |
| Rama contra `origin/main` | CERRADO | `origin/main` `a6707877` está incorporado en `50d1ba6f`; 0 commits detrás, catálogo, TypeScript, build y guardianes TOEFL PASS. |
| Build del preview Vercel | CERRADO | `dpl_Ch1VKomZPfWwTLSk8xCa75RNLaD2`, commit `1dd7b7e`, está `READY`; 1.834/1.834 páginas y Set 1 autenticado 200. El alias protegido apunta al artefacto. |
| Revisión funcional y accesible del preview | CERRADO | Espaciado CTW y VoiceOver T16/T17 aprobados por el owner. Playwright confirmó Listening 1→2, reproductor reiniciado y omisión explícita 6→7 sin reproducir audio. La protección SSO no se debilitó. |
| Audio y QA | CERRADO | 400/400 archivos, 34.140.872 bytes, normalización -18 LUFS y contraste de guion con Whisper; hash de release `9235dd4…21741`. |
| Captura y corrección | CERRADO | Entrega firmada, subida privada, scoring objetivo servidor, dos reportes de Writing y revisión humana de Speaking. |
| Seguridad de datos | CERRADO | Bucket privado, URLs firmadas, service role sólo servidor, rate limit durable y comprobante HMAC de 2 horas. |
| Producción final | CERRADO | Commit `a821cde3` integrado en `main`; deployment Vercel `dpl_CxuR1H2KPUUbHUpQVJ2uYFH2sG8k` `READY` y activo en `www.idiomaswl.com`. Smoke productivo: 20/20 rutas, 400/400 audios, API privada y recorrido E2E con 11/11 grabaciones PASS. |

Conclusión: los 20 simulacros cumplen el alcance declarado de **simulacro alineado no
adaptativo de ruta fija** y tienen cerrados los gates locales de contenido, audio,
navegación, captura y corrección. “Terminado” describe ese producto WeLearn; no significa
examen oficial, réplica adaptativa ni equivalencia psicométrica con ETS.
