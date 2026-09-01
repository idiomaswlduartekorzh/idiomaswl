# HR-04 — revalidación de fuentes oficiales TOEFL (borrador)

> Estado: **PENDIENTE DE REVISIÓN ACADÉMICA HUMANA**  
> Fecha de consulta: 2026-09-01  
> Alcance: claims editoriales del hub y catálogo de ejercicios; no autoriza implementación, publicación ni equivalencia con ETS.  
> Gate: D8 permanece bloqueante hasta que D7 registre una revisión académica humana identificada.

## 1. Conclusión de curaduría

Las fuentes oficiales vigentes sostienen una arquitectura pública de cuatro secciones y doce familias de tarea para el TOEFL iBT aplicable desde el 21 de enero de 2026. Este es el alcance factual mínimo que necesita el catálogo aprobado en HR-02/HR-03.

La revalidación **no** autoriza a llamar oficial, adaptativa o psicométricamente equivalente a la práctica de WeLearn. Tampoco recomienda publicar todavía conteos o tiempos: las fuentes oficiales consultadas presentan esos números con formulaciones diferentes y requieren resolución académica antes de incorporarlos a HR-04.

## 2. Fuentes oficiales consultadas

| ID | Fuente ETS | Uso permitido en este borrador | SHA-256 de la descarga 2026-09-01 |
|---|---|---|---|
| ETS-CONTENT | [Test Content and Structure](https://www.ets.org/toefl/test-takers/ibt/about/content.html) | fecha efectiva, secciones, familias, adaptación, escala publicada | `2a7877f6450ce7d0a166ae1cd37feef9f8c5462a40bfcb512a4e24555b1c25ea` |
| ETS-SPEC | [2026 Update — Test Blueprint and Specifications](https://www.ets.org/content/dam/ets-india/pdfs/toefl/toefl-ibt-test-specifications-2026.pdf) | blueprint, CEFR, adaptación multietapa y scoring de tareas | `72196bd328b2e2eb7e08ee031382fa174b1b80ca23b3073b9bd8743c6f39289f` |
| ETS-OVERVIEW | [Updated TOEFL iBT Test Overview](https://www.ets.org/pdfs/toefl/toefl-ibt-test-overview.pdf) | orden y formulación pública “up to” para ítems/tiempos | `ce5e0eef3ea47b9964b0b1b034e96fa3b2aa0681347f17b381196cb0661249f0` |
| ETS-READING | [Reading Section](https://www.ets.org/toefl/test-takers/ibt/about/content/reading.html) | descripción visible de las tres tareas | `cb855cff5751da901202f5ba90f41272d823ce853378f62be7926ed91d256ceb` |
| ETS-LISTENING | [Listening Section](https://www.ets.org/toefl/test-takers/ibt/about/content/listening.html) | descripción visible de las cuatro tareas; contiene inconsistencia editorial señalada abajo | `0227402a7547b1bdef76629f590af74f0b64ead1410fddc7cac28aba31c9e827` |
| ETS-WRITING | [Writing Section](https://www.ets.org/toefl/test-takers/ibt/about/content/writing.html) | descripción visible de las tres tareas | `81a9494ae4ab97748f556418942cff28b94aa2d4f0b72f80877e42d2795877ea` |
| ETS-SPEAKING | [Speaking Section](https://www.ets.org/toefl/test-takers/ibt/about/content/speaking.html) | descripción visible de las dos tareas | `340dcf2c2906302ec1e6cafc598bd2e49e3f96fe8dc4fc207eba25d541fb4abb` |
| ETS-SCORES | [Understanding Scores](https://www.ets.org/toefl/test-takers/ibt/scores/understand-scores.html) | escala y transición; no autoriza una conversión local | `ba202eeb3a5a87ade9cebcb9374bd75df58f450d7539133d19010f357794182d` |

Los hashes identifican la respuesta descargada en esa fecha; no sustituyen una revisión semántica ni garantizan que ETS no cambie la página después.

## 3. Matriz de claims propuesta

| Claim ID | Afirmación candidata | Estado de curaduría | Evidencia | Regla editorial |
|---|---|---|---|---|
| C01 | El formato actualizado del TOEFL iBT entró en vigor el 21 de enero de 2026. | lista para revisión académica | ETS-CONTENT | Mostrar fecha de revisión junto al claim. |
| C02 | El examen vigente conserva cuatro secciones: Reading, Listening, Writing y Speaking. | lista para revisión académica | ETS-CONTENT, ETS-OVERVIEW | Usar ese orden cuando se describa el recorrido oficial. El catálogo puede agrupar por sección sin afirmar que reproduce el recorrido. |
| C03 | Reading reúne Complete the Words, Read in Daily Life y Read an Academic Passage. | lista para revisión académica | ETS-CONTENT, ETS-SPEC, ETS-READING | Mantener los nombres oficiales en inglés y explicar en español. |
| C04 | Listening reúne Listen and Choose a Response, Listen to a Conversation, Listen to an Announcement y Listen to an Academic Talk. | lista para revisión académica con nota | ETS-CONTENT, ETS-SPEC, ETS-LISTENING | No repetir el encabezado erróneo “two task types” de ETS-LISTENING; la tabla y el blueprint enumeran cuatro. |
| C05 | Writing reúne Build a Sentence, Write an Email y Write for an Academic Discussion. | lista para revisión académica | ETS-CONTENT, ETS-SPEC, ETS-WRITING | Usar el nombre completo “Write for an Academic Discussion” en claims normativos. |
| C06 | Speaking reúne Listen and Repeat y Take an Interview. | lista para revisión académica | ETS-CONTENT, ETS-SPEC, ETS-SPEAKING | No prometer evaluación oral si una actividad no captura respuesta. |
| C07 | Reading y Listening del TOEFL iBT oficial usan un diseño adaptativo multietapa; la práctica sectional de WeLearn será fija. | lista para revisión académica | ETS-CONTENT, ETS-SPEC | Siempre emparejar el hecho oficial con el disclosure local; nunca describir WeLearn como adaptativo. |
| C08 | ETS reporta cuatro secciones y un overall en escala 1–6 con incrementos de medio punto. | lista para revisión académica, fuera del copy mínimo del catálogo | ETS-CONTENT, ETS-SCORES | No derivar ni prometer equivalencias locales. Preferir omitir scoring en el catálogo. |
| C09 | Los conteos/tiempos públicos son 50/30, 47/29, 12/23 y 11/8. | **bloqueado** | ETS-CONTENT dice cifras base y variación; ETS-OVERVIEW usa “up to”; ETS-SPEC conserva una nota de posibles revisiones previa al lanzamiento | No publicar en HR-04 hasta resolución académica explícita y selección de formulación. |
| C10 | La práctica de WeLearn es material original no oficial y no reproduce el motor adaptativo ni el scoring de ETS. | obligatorio | contrato interno + C07/C08 | Debe ser visible cerca del CTA, no escondido en FAQ o schema. |

## 4. Copy mínimo candidato para revisión

### Descripción del catálogo

> Practica por tipo de ejercicio. Organizamos las doce familias de tarea del TOEFL iBT vigente en Reading, Listening, Writing y Speaking para que encuentres rápido qué entrenar.

### Disclosure visible

> Material original de WeLearn, no afiliado con ETS. Estas actividades usan recorridos fijos de práctica y no reproducen la adaptación ni la puntuación oficial del TOEFL iBT.

### Descripción AEO/GEO breve

> La sección Ejercicios TOEFL de WeLearn reúne práctica por tarea en cuatro grupos: Reading, Listening, Writing y Speaking. Cada tarjeta indica si abre una práctica individual, una guía con banco o un simulacro que contiene esa tarea.

Este copy es un borrador de curaduría. No se incorpora a producto hasta la decisión académica de D7/D8.

## 5. Claims prohibidos mientras D8 siga abierto

- “Simulacro oficial TOEFL” o “ejercicios oficiales TOEFL”.
- “Formato idéntico”, “réplica exacta” o “mismo nivel adaptativo”.
- “Puntuación TOEFL” para cualquier cálculo propio de WeLearn.
- Equivalencias locales 1–6, 0–120, CEFR o admisión sin validación psicométrica.
- Conteos y tiempos oficiales en HR-04 hasta resolver C09.
- Schema, metadata o FAQ con un claim que no aparezca con el mismo alcance y disclosure en contenido visible.

## 6. Inconsistencias que debe resolver el revisor académico

1. **Cifras exactas frente a “hasta”.** ETS-CONTENT muestra números base y advierte que pueden variar por adaptación; ETS-OVERVIEW formula los mismos valores como máximos. Recomendación de curaduría: omitir cifras en el catálogo y, si se necesitan en una guía, usar “hasta” con fuente y fecha.
2. **Encabezado erróneo de Listening.** ETS-LISTENING afirma “two task types” y a continuación lista cuatro. ETS-CONTENT y ETS-SPEC también listan cuatro. Recomendación: sostener cuatro familias con triangulación, dejando constancia del error visible.
3. **Documento técnico pre-lanzamiento.** ETS-SPEC advierte que sus especificaciones podían recibir revisiones menores hasta el lanzamiento. Recomendación: usarlo para detalles técnicos solo cuando una fuente pública posterior no contradiga el claim.
4. **Nombre abreviado.** La IU aprobada usa “Academic Discussion”; el claim normativo debe presentar primero “Write for an Academic Discussion” y puede usar la forma corta después.

## 7. Decisión humana necesaria

El revisor académico debe registrar nombre, rol, fecha, SHA/digest revisado y una decisión explícita sobre C01–C10. Puede aprobar C01–C08 y C10 dejando C09 bloqueado. Sin ese registro:

- HR-04 permanece `pending-human-review`;
- no se restaurará `docs/toefl-ibt-2026-official-format.md` como registro normativo;
- no se implementarán claims sensibles ni se cruzará el gate editorial.

