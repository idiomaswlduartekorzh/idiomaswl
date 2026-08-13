# TOEFL iBT 2026 — registro oficial versionado de formato y divergencias

> `registry_id`: `toefl-ibt-2026`
>
> `registry_version`: `2026-08-09.v2`
>
> `official_effective_date`: 21 de enero de 2026
>
> `verified_at`: 9 de agosto de 2026
>
> `review_by`: 9 de septiembre de 2026, o antes de cualquier release TOEFL
>
> `status`: fuente normativa interna para alineación; no es material oficial de ETS
>
> `scope`: formato, tareas, tiempos, navegación, adaptatividad, scoring y disclosures

Este registro materializa T01 del documento maestro
`docs/toefl-2026-alignment-loop.md`. Sustituye el enlace interno que los 20 sets y el
cliente hacían a este archivo cuando todavía no existía. No autoriza cambios de
runtime, publicación, generación de contenido ni consumo de APIs.

## 1. Cómo se usa y qué no demuestra

Cada afirmación de formato en el producto debe apuntar a una regla de este registro.
Si ETS cambia una fuente, primero se versiona este documento y después se evalúa la
implementación. Una práctica de WeLearn puede apartarse de una regla solamente si:

1. registra la divergencia;
2. explica su motivo pedagógico u operativo;
3. muestra una divulgación comprensible al estudiante;
4. no afirma equivalencia psicométrica, adaptativa ni oficial;
5. tiene responsable y fecha de revisión.

Cumplir cantidades y tiempos tampoco demuestra equivalencia con TOEFL. La selección
adaptativa, la calibración y el scoring de ETS no son reproducibles sólo con un
porcentaje de aciertos. “Alineado” en este repositorio significa correspondencia
documentada de diseño, nunca afiliación, aprobación o certificación de ETS.

## 2. Registro de fuentes y jerarquía

| ID | Fuente oficial | Autoridad usada | Fecha verificada | Observación |
|---|---|---|---|---|
| S1 | [ETS — TOEFL iBT Test Content](https://www.ets.org/toefl/test-takers/ibt/about/content.html) | Estructura operacional publicada, orden, totales y tiempos | 2026-08-09 | Controla los números públicos vigentes; advierte variación por adaptación. |
| S2 | [ETS — TOEFL iBT Test Specifications 2026](https://www.ets.org/content/dam/ets-india/pdfs/toefl/toefl-ibt-test-specifications-2026.pdf) | Blueprint, rangos, CEFR, estímulos, scoring y diseño adaptativo | 2026-08-09 | Especificación técnica; se reconcilia con S1 y S3 en detalles operacionales. |
| S3 | [ETS — Teacher FAQ](https://www.ets.org/content/dam/ets-org/pdfs/toefl/teacher-faq.pdf) | Secuencia, navegación, pretest, scoring y operación | 2026-08-09 | Aclara la experiencia del examen actualizado. |
| S4 | [ETS — Teacher Resources Practice Test 1](https://www.ets.org/content/dam/ets-org/pdfs/toefl/toefl-ibt-teachers-resources-practice-test-1.pdf) | Ejemplos de instrucciones e interacción | 2026-08-09 | Adaptada para papel; no es réplica exacta ni blueprint universal. |
| S5 | [ETS — Full-length Practice Test 2](https://www.ets.org/pdfs/toefl/toefl-ibt-full-length-practice-test-2.pdf) | Segunda muestra de instrucciones e interacción | 2026-08-09 | Adaptada para papel; sus 40 R/34 L no sustituyen S1/S2. |

### 2.1 Regla de resolución de conflictos

1. S1 controla la estructura pública vigente.
2. S2 controla rangos, constructos, CEFR, estímulos y modelo técnico.
3. S3 controla aclaraciones operacionales y de experiencia.
4. S4/S5 sólo ilustran instrucciones e interacción.
5. Una decisión propia de WeLearn se rotula como local y nunca corrige a ETS.

Si dos fuentes oficiales no pudieran reconciliarse, la afirmación queda `unverified`
y no se publica como hecho hasta resolverla. Las prácticas en papel no se usan para
rebajar los 50 ítems de Reading o 47 de Listening publicados por S1.

### 2.2 Política de revalidación y versionado

- Revalidar mensualmente mientras continúe la expansión y antes de cada release.
- Guardar fecha, URL y resultado de cada revisión; una redirección no cuenta como
  verificación del contenido.
- Incrementar `.vN` para aclaraciones sin cambio material y la fecha de versión para
  cambios de reglas, blueprint o producto.
- Registrar cualquier cambio en la sección 12 y reabrir las unidades afectadas.
- No congelar una cifra o claim en UI sin su `rule_id` y versión del registro.
- Conservar versiones anteriores; no reescribir la historia de una práctica ya
  intentada por estudiantes.

## 3. Reglas normativas reconciliadas

Estados posibles: `verified`, `local-only` y `unverified`. En esta versión, todas las
reglas siguientes están `verified` en las fuentes citadas.

### 3.1 Examen general y operación

| Rule ID | Regla | Fuente |
|---|---|---|
| GEN-001 | Orden: Reading → Listening → Writing → Speaking. | S1, S3 |
| GEN-002 | Referencia publicada: Reading 50 preguntas y aproximadamente 30 minutos. | S1 |
| GEN-003 | Referencia publicada: Listening 47 preguntas y aproximadamente 29 minutos. | S1 |
| GEN-004 | Referencia publicada: Writing 12 preguntas y aproximadamente 23 minutos. | S1 |
| GEN-005 | Referencia publicada: Speaking 11 preguntas y aproximadamente 8 minutos. | S1 |
| GEN-006 | Las duraciones excluyen instrucciones y la prueba completa requiere aproximadamente dos horas; volumen y tiempo pueden variar por adaptación. | S1, S3 |
| GEN-007 | No hay descanso programado y se permite tomar notas. | S3 |

### 3.2 Adaptatividad y navegación

| Rule ID | Regla | Fuente |
|---|---|---|
| ADP-001 | Reading y Listening usan diseño multietapa adaptativo de dos etapas. | S2, S3 |
| ADP-002 | El desempeño en el primer módulo enruta la dificultad del segundo. | S2, S3 |
| ADP-003 | No se puede saltar entre etapas ni volver al módulo 1 después de iniciar el módulo 2. | S3 |
| ADP-004 | En Reading se permite avanzar y retroceder dentro del módulo activo. | S3 |
| ADP-005 | Listening avanza pregunta por pregunta y no permite regresar a preguntas anteriores. | S3 |

### 3.3 Puntuación y pretest

| Rule ID | Regla | Fuente |
|---|---|---|
| SCORE-001 | Los totales de 50 R y 47 L incluyen ítems de pretest no puntuados; cada estudiante recibe pretest en Reading o Listening, no en ambas. | S2, S3 |
| SCORE-002 | Cada ítem puntuado de Reading y Listening aporta un punto bruto; la puntuación considera ambas etapas, dificultad, IRT y equating. | S2, S3 |
| SCORE-003 | Máximos brutos publicados: Reading 35 y Listening 35 puntos puntuados. | S2 |
| SCORE-004 | Writing suma 20 puntos brutos: Build 10×1, Email 5 y Discussion 5; Speaking suma 55: 11×5. | S2 |
| SCORE-005 | Las cuatro secciones se reportan en escala 1–6 con incrementos de 0,5; el overall es el promedio de las cuatro secciones redondeado al medio punto más cercano. | S1, S2, S3 |
| SCORE-006 | ETS mantiene un overall comparable 0–120 durante dos años desde enero de 2026; una conversión lineal local no reproduce esa comparabilidad. | S1, S3 |

### 3.4 Reading

| Rule ID | Regla | Fuente |
|---|---|---|
| R-001 | Complete the Words: 30 respuestas; referencia CEFR B1–C1+. | S2 |
| R-002 | Read in Daily Life: 5–15 respuestas; referencia CEFR A1–C1. | S2 |
| R-003 | Read an Academic Passage: 5–15 respuestas; referencia CEFR B1–C2. | S2 |
| R-004 | Los estímulos sencillos suelen tener 15–50 palabras; los complejos pueden llegar a 200. | S2 |
| R-005 | El texto permanece visible durante la tarea; los sets de Daily Life tienen dos o tres ítems. | S2, S4, S5 |
| R-006 | La sección participa en la adaptación y navegación modular definidas en ADP-001–004. | S2, S3 |

### 3.5 Listening

| Rule ID | Regla | Fuente |
|---|---|---|
| L-001 | Listen and Choose a Response: 15–19 respuestas; CEFR A1–B2. | S2 |
| L-002 | Listen to a Conversation: 10 respuestas; CEFR A2–C1. | S2 |
| L-003 | Listen to an Announcement: 6–10 respuestas; CEFR A2–C1. | S2 |
| L-004 | Listen to an Academic Talk: 8–16 respuestas; CEFR A2–C2. | S2 |
| L-005 | Los enunciados breves tienen como máximo seis sílabas acentuadas; los estímulos intermedios tienen 35–100 palabras y los monólogos extendidos hasta 250. | S2 |
| L-006 | Se espera ritmo natural, con lenguaje idiomático y vocabulario académico cuando corresponde. | S2 |
| L-007 | El conjunto busca diversidad equilibrada de acentos y voces, incluidos Estados Unidos/Canadá, Australia y Reino Unido. | S2 |
| L-008 | Cada input tiene representación visual del hablante o hablantes y la grabación se reproduce una sola vez. | S2, S4, S5 |
| L-009 | El reloj opera por pregunta y la navegación es sólo hacia adelante. | S3, S4, S5 |

### 3.6 Writing

| Rule ID | Regla | Fuente |
|---|---|---|
| W-001 | Build a Sentence: 10 respuestas; CEFR A1–C2. | S2 |
| W-002 | Write an Email: una respuesta; CEFR B1–C2; referencia de 7 minutos. | S2, S4, S5 |
| W-003 | Write for an Academic Discussion: una respuesta; CEFR B1–C2; referencia de 10 minutos. | S2, S4, S5 |
| W-004 | Build a Sentence presenta contexto/pregunta, esqueleto de oración y banco de palabras. | S2, S4, S5 |
| W-005 | Los prompts pueden definir audiencia, propósito y situación, y simulan escritura real o académica. | S2 |
| W-006 | Email y Discussion se califican con rúbricas hasta cinco puntos; no por existencia de texto ni autoevaluación. | S2, S3 |
| W-007 | Las fuentes oficiales revisadas no publican un mínimo numérico universal de palabras; cualquier mínimo de WeLearn es una regla pedagógica local y debe rotularse. | S1–S5 |

### 3.7 Speaking

| Rule ID | Regla | Fuente |
|---|---|---|
| S-001 | Listen and Repeat: siete respuestas; CEFR A1–C2. | S2 |
| S-002 | Take an Interview: cuatro respuestas; CEFR A1–C2. | S2 |
| S-003 | Ninguna de las dos tareas concede tiempo de preparación. | S2, S3, S4, S5 |
| S-004 | En Repeat el estímulo se reproduce una sola vez y cada respuesta tiene reloj. | S2, S4, S5 |
| S-005 | La sección inicia con un escenario presentado oralmente y por escrito, con contexto visual. | S2, S4, S5 |
| S-006 | Los prompts pueden entregarse por audio o video y progresan en complejidad. | S2 |
| S-007 | Interview puede pedir descripción, explicación, opinión, sugerencia, predicción o narración. | S2 |
| S-008 | Cada respuesta construida se califica hasta cinco puntos; la práctica necesita capturar respuesta para evaluar desempeño, aunque el score local siga sin ser oficial. | S2, S3 |

Total de esta versión: **48 reglas verificadas**.

## 4. Blueprint oficial de referencia

| Sección | Familia | Volumen oficial | CEFR | WeLearn actual por set |
|---|---|---:|---|---:|
| Reading | Complete the Words | 30 | B1–C1+ | 12 |
| Reading | Read in Daily Life | 5–15 | A1–C1 | 5 |
| Reading | Read an Academic Passage | 5–15 | B1–C2 | 6 fuente / 5 visibles |
| Listening | Choose a Response | 15–19 | A1–B2 | 5 |
| Listening | Conversation | 10 | A2–C1 | 4 |
| Listening | Announcement | 6–10 | A2–C1 | 3 |
| Listening | Academic Talk | 8–16 | A2–C2 | 5 |
| Writing | Build a Sentence | 10 | A1–C2 | 6 |
| Writing | Email | 1 | B1–C2 | 1 |
| Writing | Academic Discussion | 1 | B1–C2 | 1 |
| Speaking | Listen and Repeat | 7 | A1–C2 | 5 |
| Speaking | Take an Interview | 4 | A1–C2 | 4 |

Los rangos son propiedades del blueprint oficial, no metas aisladas. Agregar ítems
sin corregir interacción, reloj, módulos, navegación y scoring no cierra la brecha.

## 5. Fotografía reconciliada de WeLearn

Fuente interna de inventario: `docs/toefl-2026-baseline-2026-08-09.md`.

| Dimensión | Estado observado al 2026-08-09 |
|---|---|
| Banco | 20 sets, 940 objetos y 1.140 unidades fuente; estructura idéntica. |
| Cliente | 1.120 unidades visibles/calificables; omite 20 `multiselect`. |
| Volumen por set | 57 unidades fuente, 56 atendidas: R 23/22, L 17, W 8, S 9. |
| Tiempo | `timeMinutes: 86` y un único reloj global. |
| Navegación | Tabs y pie permiten cambiar libremente entre habilidades y regresar. |
| Adaptatividad | No existen dos módulos ni rutas adaptativas en R/L. |
| Scoring | Banda local lineal desde porcentaje; overall promedio y aproximación 0–120 lineal. |
| Writing | Build se califica automáticamente; Email/Discussion por autoevaluación. |
| Speaking | Sin captura oral; Repeat progresa sin respuesta e Interview guarda notas. |
| Audio | 260 referencias = 260 MP3; un solo play en el reproductor. |
| Visuales | Sin imágenes de Listening ni contexto visual/audio para Speaking. |
| Copy público | Conviven “Formato oficial vigente”, “Formato 2026” y metadatos históricos. |

### 5.1 Elementos preservables o parcialmente alineados

- El arreglo operativo conserva el orden nominal Reading → Listening → Writing →
  Speaking, aunque la navegación libre lo invalida como simulación fiel.
- Están presentes las doce familias de tarea del formato actualizado.
- Email, Academic Discussion e Interview tienen el conteo nominal requerido.
- Reading mantiene el estímulo visible.
- Los 260 MP3 existen, sus referencias resuelven y el reproductor impide un segundo
  play después de iniciado.
- La UI muestra bandas 1–6 y el reporte incluye una advertencia de estimación local,
  pero la fórmula y otros claims todavía producen una impresión excesiva de score.

## 6. Matriz de alineación por dominio

| Dominio | Estado | Evidencia/razón |
|---|---|---|
| Orden nominal | Parcial | `SKILL_ORDER` es correcto; tabs permiten romperlo. |
| Volumen | Divergente | 56 visibles frente a 120 publicados; la brecha varía por familia. |
| Tareas | Parcial | Doce familias presentes, pero varias interacciones no son fieles. |
| Tiempo | Divergente | 86 minutos globales; faltan relojes modulares, por pregunta y respuesta. |
| Adaptatividad | Divergente | No hay etapas ni enrutamiento en Reading/Listening. |
| Navegación | Divergente | Se puede volver a secciones/preguntas donde ETS no lo permite. |
| Scoring | Divergente | Porcentaje lineal y autoevaluación no representan IRT/rúbricas ETS. |
| Reading | Parcial | Texto visible y familias presentes; volumen, longitud e interacción fallan. |
| Listening | Parcial | Audio de un play preservable; volumen, longitudes, visuales y navegación fallan. |
| Writing | Parcial | Email/Discussion cuentan correctamente; Build, relojes y scoring fallan. |
| Speaking | Divergente | Faltan grabación, contexto, relojes y dos Repeat por set. |
| Accesibilidad | No verificado | No existe todavía auditoría E2E específica por interacción TOEFL. |
| Derechos/originalidad | No verificado | T01 no adjudica los 940 objetos; corresponde a T05. |
| Calidad de audio | No verificado | Existencia no demuestra técnica, naturalidad o concordancia; T04–T08. |

## 7. Registro de divergencias activas

Los `student_disclosure` siguientes conservan el diagnóstico redactado en T01. La
biblioteca canónica aprobada, sus reglas de colocación y el mapeo DIV-001–020 viven en
`docs/toefl-2026-fidelity-and-disclosure-contract.md`. El runtime todavía no los
implementa; una divergencia no se considera resuelta por existir el texto.

### DIV-001 — Rótulo de oficialidad superior a la fidelidad real

- `severity`: crítica
- `rule_ids`: GEN-001–007, ADP-001–005, SCORE-001–006
- `official_rule`: una experiencia completa combina estructura, tiempos, navegación,
  adaptatividad y scoring; la similitud de tareas no la vuelve oficial.
- `welearn_behavior`: cliente, títulos y comentarios usan “Formato oficial vigente” o
  “Formato 2026” para una práctica abreviada, fija y con scoring local.
- `evidence`: `Toefl2026PracticeClient.tsx`, `src/data/mocks/toefl-set-*.ts`.
- `reason`: herencia del primer prototipo; no es una justificación aceptable.
- `student_disclosure`: “Práctica abreviada WeLearn inspirada en el TOEFL iBT actual.
  No es un examen oficial, completo ni adaptativo y su resultado no es una puntuación ETS.”
- `owner`: Producto TOEFL + Legal/Contenido
- `review_date`: 2026-09-09
- `target_units`: T02, T23, T25
- `status`: abierta

### DIV-002 — Ficha pública histórica y orden anterior

- `severity`: crítica
- `rule_ids`: GEN-001–005, W-001–003, S-001–002
- `official_rule`: cuatro secciones en orden R/L/W/S con tareas y tiempos 2026.
- `welearn_behavior`: `src/data/exams.ts` conserva R/L/S/W, 54–72 preguntas y las
  antiguas tareas/tiempos de Speaking y Writing.
- `evidence`: `src/data/exams.ts`.
- `reason`: metadata no migrada; no es intencional.
- `student_disclosure`: “Esta ficha está en actualización; consulta dentro de la
  práctica el alcance exacto incluido y no la uses como descripción del examen oficial.”
- `owner`: Producto TOEFL
- `review_date`: 2026-09-09
- `target_units`: T02, T32
- `status`: abierta

### DIV-003 — Tres conteos locales incompatibles

- `severity`: alta
- `rule_ids`: GEN-002–005
- `official_rule`: S1 publica 50/47/12/11 por sección.
- `welearn_behavior`: catálogo dice 42, fuentes contienen 57 y cliente cuenta 56 por
  set; la introducción muestra 56.
- `evidence`: `src/data/exams.ts`, `toefl-set-*.ts`, `Toefl2026PracticeClient.tsx`.
- `reason`: distintas capas contaron catálogo, fuente y renderer.
- `student_disclosure`: “Este set contiene 56 actividades calificables y es más corto
  que el TOEFL iBT completo.”
- `owner`: Ingeniería de exámenes
- `review_date`: 2026-09-09
- `target_units`: T02, T03, T09
- `status`: abierta

### DIV-004 — Reloj global de 86 minutos

- `severity`: crítica
- `rule_ids`: GEN-002–006, L-009, W-002–003, S-004
- `official_rule`: existen tiempos de sección/tarea y relojes por pregunta o respuesta.
- `welearn_behavior`: cada set declara 86 minutos y el cliente usa un único temporizador.
- `evidence`: `toefl-set-*.ts`, `Toefl2026PracticeClient.tsx`.
- `reason`: simplificación técnica inicial.
- `student_disclosure`: “El temporizador es una guía global de WeLearn y no reproduce
  los relojes por módulo, pregunta o respuesta del examen.”
- `owner`: Ingeniería de exámenes
- `review_date`: 2026-09-09
- `target_units`: T10, T17–T19
- `status`: abierta

### DIV-005 — Navegación libre

- `severity`: crítica
- `rule_ids`: ADP-003–005, L-009
- `official_rule`: vuelta limitada dentro del módulo de Reading; sin retorno entre
  etapas ni a preguntas previas de Listening.
- `welearn_behavior`: tabs y pie permiten cambiar entre habilidades y volver libremente.
- `evidence`: `Toefl2026PracticeClient.tsx`.
- `reason`: runner de práctica, no state machine de examen.
- `student_disclosure`: “Este modo permite navegación de práctica y no replica las
  restricciones del examen.”
- `owner`: Ingeniería de exámenes + UX
- `review_date`: 2026-09-09
- `target_units`: T02, T10
- `status`: abierta

### DIV-006 — Sin módulos adaptativos ni pretest

- `severity`: crítica
- `rule_ids`: ADP-001–003, SCORE-001–003
- `official_rule`: Reading/Listening tienen dos etapas, enrutamiento y pretest embebido.
- `welearn_behavior`: ruta fija única, sin módulos, enrutamiento, dificultad calibrada
  ni ítems no puntuados identificables.
- `evidence`: `toefl-set-*.ts`, `Toefl2026PracticeClient.tsx`.
- `reason`: alcance del prototipo fijo.
- `student_disclosure`: “Ruta fija no adaptativa; no incluye el modelo de pretest ni la
  selección de dificultad de ETS.”
- `owner`: Psicometría + Ingeniería de exámenes
- `review_date`: 2026-09-09
- `target_units`: T02, T24, T25
- `status`: abierta

### DIV-007 — Conversión lineal presentada como score

- `severity`: crítica
- `rule_ids`: SCORE-002–006
- `official_rule`: R/L dependen de etapas, dificultad, IRT y equating; W/S requieren
  evaluación construida; overall oficial promedia cuatro bandas.
- `welearn_behavior`: `pctToBand` convierte porcentaje linealmente, deriva un 0–120
  lineal y añade interpretaciones de admisión tipo “100+”/“80–99”.
- `evidence`: `Toefl2026PracticeClient.tsx`.
- `reason`: estimador heurístico anterior no validado.
- `student_disclosure`: “Resultado diagnóstico de WeLearn, no score TOEFL. No predice
  admisión ni sustituye los métodos de puntuación de ETS.”
- `owner`: Psicometría + Producto TOEFL
- `review_date`: 2026-09-09
- `target_units`: T02, T11, T23
- `status`: abierta

### DIV-008 — Writing y Speaking dependen de autoevaluación

- `severity`: crítica
- `rule_ids`: SCORE-004–005, W-006, S-008
- `official_rule`: respuestas construidas se califican con criterios específicos y
  vinculación entre formas; Speaking necesita una respuesta observable.
- `welearn_behavior`: Email/Discussion se autoevalúan y Speaking no se graba; la banda
  mezcla esos valores como si fueran comparables.
- `evidence`: `Toefl2026PracticeClient.tsx`.
- `reason`: no existe pipeline de captura/rúbrica validado.
- `student_disclosure`: “Las secciones abiertas son reflexión guiada. Mientras no se
  evalúen las respuestas, no generan una banda comparable.”
- `owner`: Evaluación + Ingeniería
- `review_date`: 2026-09-09
- `target_units`: T11, T17–T19
- `status`: abierta

### DIV-009 — Volumen abreviado por familia

- `severity`: alta
- `rule_ids`: R-001–003, L-001–004, W-001, S-001
- `official_rule`: blueprint de la sección 4.
- `welearn_behavior`: todos los sets quedan por debajo en Complete Words, las cuatro
  familias de Listening, Build y Repeat; el total visible es 56 frente a 120 publicado.
- `evidence`: línea base T00 y `toefl-set-*.ts`.
- `reason`: banco diseñado como práctica corta.
- `student_disclosure`: “Práctica abreviada: reduce el número de tareas y no reproduce
  la resistencia ni duración del examen completo.”
- `owner`: Diseño instruccional TOEFL
- `review_date`: 2026-09-09
- `target_units`: T02, T20, T23
- `status`: abierta

### DIV-010 — Contrato roto en Complete the Words

- `severity`: alta
- `rule_ids`: R-001, SCORE-002
- `official_rule`: la respuesta visible y la unidad calificada deben corresponder a la
  interacción Complete the Words.
- `welearn_behavior`: se muestra el prefijo fuera del input, pero el scoring compara lo
  escrito con la palabra completa almacenada.
- `evidence`: 240/240 blanks en línea base; `Toefl2026PracticeClient.tsx`.
- `reason`: desalineación entre modelo de datos y renderer.
- `student_disclosure`: “Esta interacción está en validación y no debe usarse para
  estimar desempeño hasta corregir su calificación.”
- `owner`: Ingeniería de exámenes
- `review_date`: 2026-09-09
- `target_units`: T09, T12
- `status`: abierta

### DIV-011 — Multiselect invisible

- `severity`: crítica
- `rule_ids`: R-003, SCORE-002
- `official_rule`: cada ítem presentado debe tener interacción y scoring coherentes.
- `welearn_behavior`: un `multiselect` por set existe en fuente pero no se renderiza,
  progresa ni califica: 20 objetos omitidos.
- `evidence`: línea base T00; `Toefl2026PracticeClient.tsx`.
- `reason`: renderer sin rama para el tipo.
- `student_disclosure`: “El set actual omite una actividad de Reading; el conteo visible
  ya excluye ese ítem.”
- `owner`: Ingeniería de exámenes
- `review_date`: 2026-09-09
- `target_units`: T09, T13
- `status`: abierta

### DIV-012 — Pasajes académicos sobre el rango publicado

- `severity`: media
- `rule_ids`: R-004
- `official_rule`: estímulos complejos pueden llegar a 200 palabras.
- `welearn_behavior`: 20/20 pasajes académicos miden 263–342 palabras.
- `evidence`: línea base T00, `toefl-set-*.ts`.
- `reason`: redacción anterior sin restricción de longitud 2026.
- `student_disclosure`: “Algunos pasajes son más largos que la referencia del formato
  actual; sirven como práctica extendida, no como réplica.”
- `owner`: Edición TOEFL
- `review_date`: 2026-09-09
- `target_units`: T05, T13
- `status`: abierta

### DIV-013 — Estímulos largos de Listening excedidos

- `severity`: alta
- `rule_ids`: L-005–006
- `official_rule`: monólogo extendido hasta 250 palabras; estímulos intermedios 35–100.
- `welearn_behavior`: 20/20 Academic Talks miden 268–345 palabras y dos conversaciones
  superan 250; la adjudicación fina por clase de estímulo aún está pendiente.
- `evidence`: línea base T00, transcripciones de `toefl-set-*.ts`.
- `reason`: guiones creados antes de fijar el contrato 2026.
- `student_disclosure`: “Algunos audios son práctica extendida y superan la longitud de
  referencia del formato actual.”
- `owner`: Edición y Audio TOEFL
- `review_date`: 2026-09-09
- `target_units`: T05, T07, T15
- `status`: abierta

### DIV-014 — Listening sin representación visual

- `severity`: alta
- `rule_ids`: L-008
- `official_rule`: cada input incluye representación del hablante o hablantes.
- `welearn_behavior`: ninguno de los 20 sets tiene imagen de sección/pregunta para las
  tareas de Listening.
- `evidence`: `toefl-set-*.ts`, `Toefl2026PracticeClient.tsx`.
- `reason`: el lote existente produjo audio pero no visuales.
- `student_disclosure`: “La práctica conserva el audio, pero todavía no reproduce el
  contexto visual del examen.”
- `owner`: Diseño + Accesibilidad
- `review_date`: 2026-09-09
- `target_units`: T15, T20
- `status`: abierta

### DIV-015 — Build a Sentence sin contexto

- `severity`: alta
- `rule_ids`: W-001, W-004
- `official_rule`: contexto/pregunta, esqueleto y banco de palabras forman la tarea.
- `welearn_behavior`: 120/120 carecen de prompt contextual y 20/120 entregan los tiles
  ya en el orden correcto.
- `evidence`: línea base T00, `toefl-set-*.ts`.
- `reason`: modelo simplificado de ordenar palabras.
- `student_disclosure`: “Ejercicio de orden de palabras inspirado en la tarea; todavía
  no reproduce todo el contexto de Build a Sentence.”
- `owner`: Diseño instruccional + Ingeniería
- `review_date`: 2026-09-09
- `target_units`: T09, T16
- `status`: abierta

### DIV-016 — Reglas locales y reloj ausente en escritura abierta

- `severity`: alta
- `rule_ids`: W-002–003, W-005–007
- `official_rule`: Email 7 minutos y Discussion 10; las fuentes revisadas no publican
  un mínimo universal de palabras.
- `welearn_behavior`: no hay reloj individual y los 20 Emails exigen 80–120 palabras;
  las 20 Discussions exigen mínimo 100, sin rotularlo como criterio local.
- `evidence`: `toefl-set-*.ts`, `Toefl2026PracticeClient.tsx`.
- `reason`: andamiaje pedagógico confundido con instrucción de examen.
- `student_disclosure`: “Los objetivos de palabras son recomendaciones de WeLearn. El
  reloj de esta versión no replica los 7/10 minutos por tarea.”
- `owner`: Edición TOEFL + UX
- `review_date`: 2026-09-09
- `target_units`: T02, T10, T17
- `status`: abierta

### DIV-017 — Repeat incompleto y sin respuesta oral

- `severity`: crítica
- `rule_ids`: S-001, S-004, S-005, S-008
- `official_rule`: siete repeticiones, una reproducción, contexto y respuesta oral con
  reloj.
- `welearn_behavior`: cinco por set; sin grabación ni reloj; se puede revelar el texto
  objetivo y el progreso se completa sin hablar.
- `evidence`: `toefl-set-*.ts`, `Toefl2026PracticeClient.tsx`.
- `reason`: reproductor demostrativo sin captura.
- `student_disclosure`: “Modo de práctica auditiva, no simulación de Speaking: no graba
  ni evalúa tu repetición y contiene cinco estímulos.”
- `owner`: Speaking TOEFL + Ingeniería
- `review_date`: 2026-09-09
- `target_units`: T10, T11, T18
- `status`: abierta

### DIV-018 — Interview usa notas como sustituto de habla

- `severity`: crítica
- `rule_ids`: S-002–003, S-005–008
- `official_rule`: cuatro respuestas orales sin preparación, dentro de escenario y con
  prompts/contexto audiovisuales.
- `welearn_behavior`: cuatro prompts, pero sin grabación, reloj, audio ni visuales; un
  textarea de “Notas de preparación” introduce una conducta contraria a la tarea.
- `evidence`: `toefl-set-*.ts`, `Toefl2026PracticeClient.tsx`.
- `reason`: interfaz de reflexión previa reutilizada.
- `student_disclosure`: “Guía de práctica no cronometrada; todavía no captura ni evalúa
  la entrevista y las notas no forman parte del formato oficial.”
- `owner`: Speaking TOEFL + UX
- `review_date`: 2026-09-09
- `target_units`: T10, T11, T19
- `status`: abierta

### DIV-019 — Falta contrato audiovisual y de tiempos de Speaking

- `severity`: alta
- `rule_ids`: S-003–006
- `official_rule`: escenario aurally/en texto, contexto visual, prompts audio/video,
  progresión y reloj por respuesta, sin preparación.
- `welearn_behavior`: no hay escenario audiovisual común, visuales, clocks de respuesta
  ni secuencia controlada; los prompts son texto estático.
- `evidence`: `toefl-set-*.ts`, `Toefl2026PracticeClient.tsx`.
- `reason`: Speaking se modeló como notas de estudio.
- `student_disclosure`: “Los prompts escritos son preparación de habilidad y no replican
  la presentación audiovisual ni el tiempo del examen.”
- `owner`: Speaking TOEFL + Diseño + Ingeniería
- `review_date`: 2026-09-09
- `target_units`: T10, T18, T19
- `status`: abierta

### DIV-020 — Documentación interna contradictoria

- `severity`: media
- `rule_ids`: gobernanza de S1–S5 y este registro
- `official_rule`: claims y decisiones deben apoyarse en fuente/versionado vigente.
- `welearn_behavior`: documentos históricos describen los 260 audios como pendientes o
  “TOEFL completo”; los comentarios referían a este registro inexistente hasta T01.
- `evidence`: `docs/exam-media-production-checklist.md`,
  `docs/COWORK-audio-batch-runbook.md`, comentarios de sets/cliente.
- `reason`: documentos de distintas fases nunca reconciliados.
- `student_disclosure`: “No aplica directamente; impedir que metadata histórica alimente
  claims públicos.”
- `owner`: Gobernanza de contenido
- `review_date`: 2026-09-09
- `target_units`: T01, T32, T33
- `status`: parcialmente resuelta; este registro ya existe, documentos históricos siguen

## 8. Reconciliación de documentos internos

| Documento | Papel vigente | Decisión T01 |
|---|---|---|
| `docs/toefl-2026-alignment-loop.md` | Maestro de ejecución y gates | Normativo para secuencia. |
| `docs/toefl-2026-baseline-2026-08-09.md` | Inventario congelado T00 | Fuente de cantidades/hashes hasta T03/T04. |
| Este registro | Verdad oficial fechada y divergencias | Normativo para claims y contratos TOEFL. |
| `docs/toefl-2026-fidelity-and-disclosure-contract.md` | Taxonomía A/B/C/D y copy canónico | Normativo para nivel, estado, downgrade y disclosures. |
| `docs/ielts-toefl-audit.md` | Hallazgos previos de alto nivel | Histórico; validar contra este registro. |
| `docs/ielts-toefl-migration-plan.md` | Secuencia histórica IELTS/TOEFL | No describe el estado actual. |
| `docs/exam-media-production-checklist.md` | Checklist anterior de producción | No usar “por producir” como inventario. |
| `docs/COWORK-audio-batch-runbook.md` | Runbook de generación | No autoriza gasto ni prueba calidad. |
| `docs/exam-media-batch-manifest.md` | Referencias de lote | Reconciliar con manifiesto individual T04. |

Los comentarios en código que apuntan a este archivo ya resuelven a un artefacto real,
pero su frase “follows specific official blueprint” no certifica los sets. La
divergencia DIV-001 prevalece hasta que el producto alcance y declare su nivel real.

## 9. Gates que este registro impone

- T02 cerró la taxonomía A/B/C/D y los disclosures de DIV-001–020; toda implementación
  debe usar `toefl-fidelity-disclosure@2026-08-09.v1` o una versión posterior.
- T03/T05 deben adjudicar cada estímulo/ítem; este registro no aprueba calidad editorial.
- T04–T08 deben demostrar calidad y concordancia de audio; 260 archivos existentes no
  equivalen a 260 aprobados.
- T09 debe hacer que todo lo visible sea representable, calificable y reportable.
- T10 debe definir módulos, relojes y navegación como state machine.
- T11 debe impedir score compuesto sin evidencia de respuestas construidas.
- T20 sólo puede pedir generación para brechas D/E después de intentar reutilización.
- T23 puede declarar nivel C únicamente con blueprint completo fijo y disclosure no
  adaptativo; T25 es el primer gate posible para nivel D.

## 10. Auditorías de T01

1. **Full-stack/datos/repositorio — pasa para alcance documental.** Se contrastaron
   fuente, renderer, scoring, metadata pública y comentarios; no se modificó runtime.
2. **Experto TOEFL vigente — pasa.** S1–S5 fueron reabiertas el 2026-08-09 y sus
   aparentes diferencias quedaron jerarquizadas; las prácticas en papel no se usaron
   como blueprint.
3. **Editorial/instruccional — pasa para precisión del registro.** Se separaron hecho
   oficial, decisión local y asunto todavía no verificado; no se aprobaron ítems.
4. **Audio técnico/lingüístico/humano — no aplica a aprobación de assets.** Ningún MP3
   cambió; L-005–009 y S-004–006 fijan el contrato que T04–T08 deben auditar.
5. **Multiperspectiva/derechos — pasa para documentación.** Sólo se resumieron fuentes
   públicas oficiales; no se copiaron preguntas, guiones ni audio. “Alineado” queda
   separado de afiliación u oficialidad.
6. **UI/UX/accesibilidad — no certifica UI.** DIV-001–019 capturan los claims, flujos y
   ausencias que deben resolver T02/T09/T10/T17–T19; E2E sigue pendiente.
7. **Playwright — no aplica.** T01 no cambia runtime y cargar la UI no probaría el gate
   de fuentes, fechas, reglas y divergencias reconciliadas.

## 11. Gate de salida T01

| Criterio | Resultado |
|---|---|
| Fuentes oficiales identificadas y fechadas | Pasa: S1–S5, verificadas 2026-08-09. |
| Jerarquía y conflictos reconciliados | Pasa: sección 2.1 y caveat de prácticas. |
| Reglas estructuradas y trazables | Pasa: 48 reglas con `rule_id`. |
| Estado actual contrastado | Pasa: secciones 4–6 y línea base T00. |
| Divergencias con campos obligatorios | Pasa: DIV-001–020. |
| Fecha de próxima revisión | Pasa: 2026-09-09 o antes de release. |
| Código, contenido y audio preservados | Pasa: cambio exclusivamente documental. |

Estado T01: **cerrable**. Próxima unidad elegible: T02 — taxonomía de niveles A/B/C/D
y disclosures.

## 12. Historial de versiones

| Versión | Fecha | Cambio | Revisor |
|---|---|---|---|
| `2026-08-09.v1` | 2026-08-09 | Registro inicial S1–S5, 48 reglas y 20 divergencias reconciliadas con T00. | Codex; requiere gobernanza humana antes de publicación |
| `2026-08-09.v2` | 2026-08-09 | Enlace normativo a la taxonomía y biblioteca de disclosures aprobadas en T02; sin cambios en las 48 reglas oficiales. | Codex; implementación pública aún pendiente |
