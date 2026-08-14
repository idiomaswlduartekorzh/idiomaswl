# TOEFL iBT 2026 — auditoría editorial global inicial

> `audit_id`: `toefl-2026-editorial-audit`
>
> `audit_version`: `2026-08-09.v1`
>
> `official_registry`: `toefl-ibt-2026@2026-08-09.v2`
>
> `source_inventory`: `docs/toefl-2026-editorial-inventory-2026-08-09.tsv`
>
> `source_inventory_sha256`:
> `fbeb7d5d7580f12accc526266e11f46e598d7c1d4010c331b8323af96dbd69e6`
>
> `item_audit`: `docs/toefl-2026-editorial-audit-2026-08-09.tsv`
>
> `item_audit_sha256`:
> `0b670a0b2178c185ef00c969d405ffb726413024d0aed7af227bdbc178d09ee3`
>
> `reviewed_at`: 9 de agosto de 2026
>
> `decision_status`: T05 cerrada para clasificación editorial inicial
>
> `release_status`: `blocked_not_validated`

Este documento cierra T05 de `docs/toefl-2026-alignment-loop.md`: los 1.140 ítems
del inventario T03 tienen una decisión inicial A/B/C/D/E y hallazgos trazables. No
convierte ningún ítem en publicable, no modifica textos, runtime o scoring y no
aprueba ningún audio. Los 260 MP3 permanecen inmutables y sus tres capas de QA siguen
en T06–T08.

## 1. Resultado ejecutivo

La intuición de que el banco no está todavía alineado como simulacro oficial es
correcta, pero la causa no es simplemente que todo sea demasiado corto. El patrón es
mixto:

- el volumen total de cada set es insuficiente para un TOEFL completo;
- Reading Academic y Academic Talk son, por el contrario, demasiado largos para la
  unidad que actualmente producen y concentran pocas oportunidades de respuesta;
- 476 MCQ permiten detectar la clave porque la respuesta correcta es la única opción
  más larga por caracteres;
- Complete the Words, multiselect, Speaking y parte de Writing tienen desacoples entre
  unidad editorial, interacción o scoring;
- dos Build a Sentence no son reparables con un cambio menor y deben reemplazarse;
- 440 ítems dependen de audio todavía no adjudicado y 1.140 carecen de autoría,
  procedencia y derechos documentados.

La política sigue siendo conservar primero. La clasificación obtenida es:

| Clase inicial | Acción editorial | Ítems | Porcentaje |
|---|---|---:|---:|
| A | Conservar como candidato editorial | 53 | 4,6 % |
| B | Reparar antes del piloto | 857 | 75,2 % |
| C | Segmentar o derivar preservando el original | 228 | 20,0 % |
| D | Reemplazar preservando historial | 2 | 0,2 % |
| E | Generar una brecha inexistente | 0 | 0,0 % |
| **Total** |  | **1.140** | **100,0 %** |

`A` en este artefacto significa **candidato editorial a conservar**, no activo
aprobado de extremo a extremo. El contrato general exige además derechos, QA técnico,
alineación, accesibilidad y revisión independiente. Por eso incluso las 53 filas A
mantienen `release_status=blocked_not_validated`; una auditoría posterior puede
degradarlas. `E=0` sólo significa que T05 no inventó filas para contenido que aún no
existe. T20 medirá la brecha del blueprint después de los pilotos T12–T19.

## 2. Cobertura y método

### 2.1 Universo revisado

- 20 sets `src/data/mocks/toefl-set-1.ts` a `toefl-set-20.ts`;
- 940 objetos fuente;
- 1.140 unidades de respuesta: cada blank de Complete the Words tiene identidad
  propia y el resto conserva una unidad por objeto;
- 13 partes y las doce familias del registro oficial;
- 1.140/1.140 IDs enlazados con T03, 0 faltantes, 0 extras y 0 duplicados;
- 21 campos de auditoría por fila y 0 campos obligatorios vacíos.

La revisión combinó lectura completa de estímulos, instrucciones, opciones, claves,
prompts y respuestas con mediciones reproducibles de longitud, densidad, patrones de
respuesta, orden de tiles, duplicación interna y cobertura. Los detectores automáticos
se usaron para localizar riesgos; la decisión editorial se hizo sobre el contenido y
su contrato de tarea, no sólo sobre una regla estadística.

### 2.2 Regla de clasificación inicial

| Clase | Aplicación en T05 |
|---|---|
| A | No apareció un defecto editorial específico en esta pasada; conservar como candidato, con gates externos aún abiertos. |
| B | El material base sirve, pero requiere corrección pequeña, interacción fiel, mejor distractor, rotulación o política explícita. |
| C | El material contiene valor reutilizable, pero su longitud/densidad exige derivar unidades nuevas sin destruir el original. |
| D | La unidad falla materialmente y no puede arreglarse responsablemente sin reemplazarla. |
| E | Se reserva para una necesidad del blueprint sin activo fuente; no se crean placeholders en T05. |

La columna `item_severity` describe el defecto editorial primario. Los bloqueos
transversales aparecen aparte en `finding_ids`, `audio_status`, `rights_status`,
`expert_status` y `release_status` para no convertir ausencia de evidencia en una
aprobación implícita.

## 3. Distribución por tarea

| Parte | Regla | Familia | A | B | C | D | E | Total |
|---:|---|---|---:|---:|---:|---:|---:|---:|
| 1 | R-001 | Complete the Words | 0 | 240 | 0 | 0 | 0 | 240 |
| 2 | R-002 | Read in Daily Life, bloque 1 | 27 | 33 | 0 | 0 | 0 | 60 |
| 3 | R-002 | Read in Daily Life, bloque 2 | 12 | 28 | 0 | 0 | 0 | 40 |
| 4 | R-003 | Read an Academic Passage | 0 | 0 | 120 | 0 | 0 | 120 |
| 5 | L-001 | Listen and Choose a Response | 0 | 100 | 0 | 0 | 0 | 100 |
| 6 | L-002 | Listen to a Conversation | 7 | 65 | 8 | 0 | 0 | 80 |
| 7 | L-003 | Listen to an Announcement | 7 | 53 | 0 | 0 | 0 | 60 |
| 8 | L-004 | Listen to an Academic Talk | 0 | 0 | 100 | 0 | 0 | 100 |
| 9 | W-001/W-004 | Build a Sentence | 0 | 118 | 0 | 2 | 0 | 120 |
| 10 | W-002 | Write an Email | 0 | 20 | 0 | 0 | 0 | 20 |
| 11 | W-003 | Academic Discussion | 0 | 20 | 0 | 0 | 0 | 20 |
| 12 | S-001 | Listen and Repeat | 0 | 100 | 0 | 0 | 0 | 100 |
| 13 | S-002 | Take an Interview | 0 | 80 | 0 | 0 | 0 | 80 |
| **Total** |  |  | **53** | **857** | **228** | **2** | **0** | **1.140** |

## 4. Catálogo de hallazgos

Los conteos no son mutuamente excluyentes: un ítem puede heredar varios hallazgos.

| ID | Sev. | Ítems | Hallazgo | Decisión/ruta |
|---|---|---:|---|---|
| `GOV-001` | bloqueo de release | 1.140 | Autoría, procedencia y derechos no están registrados por ítem. | Mantener bloqueado; adjudicación independiente antes de publicación. |
| `R001-001` | alta | 240 | La fuente agrupa seis blanks por objeto, mientras interacción, progreso y scoring no tienen aún contrato por unidad oficial. | B; resolver paridad en T09/T12 sin reescribir el texto útil. |
| `R001-002` | alta | 1 | `item:t20-r-cw1:blank-1` revela la respuesta completa: `prefix='bag'`, `answer='bag'`. | B; corregir una variante, conservar original e historial. |
| `ED-001` | media | 12 | `t4-r-cw1` y `t6-r-cw1` son textos casi duplicados sobre reparación de calefacción. | B; diversificar uno y volver a revisar sus seis blanks. |
| `ED-002` | alta | 476 | La clave MCQ es la única opción más larga por caracteres; el formato de la respuesta funciona como pista. | B cuando es el defecto principal; C si el estímulo ya debe derivarse. |
| `R003-001` | alta | 120 | Los 20 pasajes académicos tienen 263–342 palabras, media 310,5, por encima de la unidad compleja de referencia de hasta ~200 palabras. | C; derivar/segmentar unidades con sentido y preservar el pasaje fuente. |
| `R003-002` | crítica | 20 | Los 20 multiselect existen en fuente pero el renderer actual no los representa. | C + bloqueo T09/T13; no simplificar la clave a selección única. |
| `L001-001` | alta | 100 | Choose a Response no conserva transcripción fuente canónica. | B editorial provisional; recuperar/adjudicar en T07, no inferir desde opciones. |
| `L001-002` | alta | 100 | Los distractores son con frecuencia semánticamente inconexos y la respuesta natural destaca formalmente. | B; reconstruir distractores después de adjudicar lo oído. |
| `L002-001` | alta | 8 | Las conversaciones de sets 18 y 20 tienen 260 y 256 palabras, por encima del umbral de referencia de 250. | C; segmentar/derivar sólo si cada unidad conserva contexto natural. |
| `AUD-001` | pendiente T06–T08 | 440 | El ítem depende de un MP3 aún no aprobado técnica, lingüística ni humanamente. | No decide por sí solo la clase editorial; bloquea release y audio QA. |
| `L004-001` | alta | 100 | Los 20 Academic Talks tienen 268–345 palabras, media 308,6, y sólo cinco preguntas cada uno. | C; obtener unidades alineadas sin sobrescribir los audios/textos fuente. |
| `L004-002` | alta | 5 | El talk del set 17 contiene `fungthreads` donde corresponde “fungal threads”. | Corregir en una variante al derivar; preservar el original. |
| `W001-001` | alta | 120 | Build a Sentence carece del contexto/esqueleto que define la tarea actual. | B salvo los dos D; diseñar contrato en T09/T16. |
| `W001-002` | alta | 120 | Sólo existe una secuencia exacta; no hay política de variantes lingüísticamente válidas. | B salvo los dos D; scoring explícito y revisado. |
| `W001-003` | alta | 20 | Un ítem por set presenta los tiles ya en el orden de la respuesta. | B; barajar de forma reproducible sin alterar la solución. |
| `W001-004` | crítica | 2 | `t6-w-bs6` y `t10-w-bs6` no forman una respuesta gramatical/semántica válida con sus tiles. | D; reemplazar, nunca declarar arreglados sólo cambiando la clave. |
| `W002-001` | alta | 20 | Email impone 80–120 palabras sin identificarlo como objetivo local WeLearn y sin rúbrica/explicación explícita. | B; rotular alcance local y definir feedback responsable en T17. |
| `W003-001` | alta | 20 | Discussion impone ≥100 palabras como objetivo local sin rúbrica/explicación explícita. | B; rotular alcance local y definir feedback responsable en T17. |
| `S001-001` | crítica | 100 | Repeat no captura respuesta oral y el progreso puede avanzar sin evidencia de producción. | B + bloqueo T18; captura real, permisos, fallback y progreso veraz. |
| `S002-001` | alta | 80 | Interview no implementa escenario audiovisual ni captura/persistencia de cuatro respuestas. | B + bloqueo T19. |
| `S002-002` | alta | 80 | La instrucción permite tomar notas antes, en conflicto con la condición oficial sin preparación. | B; corregir contrato e instrucciones en T19. |
| `REP-001` | media | 20 | Los 20 Q4 piden predicción a veinte años; 19 usan casi la misma construcción verbal. | B por banco; diversificar función discursiva y formulación. |

## 5. Hallazgos por familia

### 5.1 Reading

Complete the Words conserva material aprovechable, pero no está listo como tarea fiel.
Hay 240 blanks distribuidos en 40 objetos. Once blanks omiten como máximo una letra y
56 omiten como máximo dos; uno no omite ninguna. No aparecieron prefixes/suffixes
incompatibles ni claves fuera de rango. El defecto `bag → bag` es reparable, y el par
de textos de calefacción debe diversificarse sin descartar el resto del banco.

Los dos bloques Daily Life miden 64–101 y 73–108 palabras. La guía oficial usa
“generally” para textos simples y admite textos complejos de hasta aproximadamente
200 palabras, por lo que T05 no convirtió cada texto por encima de 50 en defecto. La
decisión por ítem se concentró en coherencia, clave y pistas formales: 61/100 respuestas
correctas son la única opción más larga.

Los 20 Academic Reading miden 263–342 palabras, media 310,5. El problema no es falta
de texto, sino exceso de longitud por unidad y baja densidad: seis respuestas por
pasaje. Los 120 ítems quedan C para derivación controlada, incluidos los 20 multiselect
que además permanecen invisibles en el renderer.

### 5.2 Listening

Esta pasada auditó guion, opciones, claves y densidad; no escuchó ni aprobó MP3. Los
440 ítems dependientes de audio mantienen `audio_status=pending_T06_T07_T08`.

- Choose a Response: 100/100 claves son la única opción más larga; no existe
  transcripción fuente canónica para contrastar lo pronunciado.
- Conversation: 179–260 palabras, media 217,9. Ocho ítems de los sets 18 y 20 son C
  por exceso de longitud; 73/80 claves presentan pista de longitud.
- Announcement: 119–165 palabras, media 142,45; 53/60 claves presentan pista de
  longitud.
- Academic Talk: 268–345 palabras, media 308,6; los 100 ítems son C. El talk del set
  17 hereda además el error `fungthreads`.

La clase de cada **asset** MP3 sigue sin decidirse. T05 sólo decide la acción editorial
inicial del ítem; T06, T07 y T08 deben poder degradar o bloquear cualquier decisión.

### 5.3 Writing

Build a Sentence es la familia escrita con el mayor desacople de interacción. Los 120
ítems carecen de contexto/esqueleto y de política de variantes. Veinte ya muestran los
tiles en orden. Dos son D:

- `item:t6-w-bs6`: “The more she practised, the harder confident became” no expresa
  correctamente la correlación esperada y los tiles no permiten “the more confident
  she became”.
- `item:t10-w-bs6`: “Not knowing the answer, she left the exam, blank” incluye `blank`
  como tile final y no forma una oración válida.

Email y Academic Discussion presentan temas naturales y diversos, pero sus objetivos
de 80–120 y ≥100 palabras son reglas locales no rotuladas, y no hay rúbrica ni
explicación de evaluación en el contrato actual. Los 40 prompts son B, conservables
con correcciones de producto/editoriales antes de piloto.

### 5.4 Speaking

Las 100 frases Repeat miden 4–18 palabras, media 10,21. Su defecto crítico no es la
longitud del texto, sino que el flujo no captura producción oral ni demuestra que la
respuesta ocurrió.

Los 80 prompts Interview miden 18–34 palabras, media 24,69. Todos comienzan con
`Interviewer:`; el cuarto slot repite una predicción a veinte años en los 20 sets y el
tercero recurre con frecuencia a decisiones binarias de gasto institucional. No se
detectó un estereotipo dañino manifiesto en esta revisión, pero la estructura es
campus-céntrica y repetitiva. Además, la instrucción actual permite preparación con
notas y no existe escenario audiovisual ni captura real.

## 6. Calidad de clave, similitud y hechos

### 6.1 Pistas de longitud

| Familia MCQ | Clave única más larga | Total aplicable | Tasa |
|---|---:|---:|---:|
| Daily Life, parte 2 | 33 | 60 | 55,0 % |
| Daily Life, parte 3 | 28 | 40 | 70,0 % |
| Academic Reading de respuesta única | 95 | 100 | 95,0 % |
| Choose a Response | 100 | 100 | 100,0 % |
| Conversation | 73 | 80 | 91,3 % |
| Announcement | 53 | 60 | 88,3 % |
| Academic Talk | 94 | 100 | 94,0 % |

Las posiciones de clave están razonablemente repartidas; el problema principal no es
“siempre A/B/C/D”, sino que la opción correcta suele ser formalmente más completa y
específica. La reparación debe mejorar distractores y paralelismo, no sólo reordenar
opciones.

### 6.2 Duplicación

- 0 IDs duplicados;
- 0 opciones duplicadas dentro de una pregunta;
- 0 claves fuera de rango;
- 0 duplicados exactos de objetos detectados;
- un par casi duplicado relevante: `t4-r-cw1` y `t6-r-cw1`, que afecta 12 blanks.

No se ejecutó búsqueda externa de similitud/plagio. La ausencia de duplicados internos
no demuestra originalidad ni derechos.

### 6.3 Hechos y procedencia

La revisión leyó coherencia y señales de error, pero no reconstruyó la procedencia de
cada afirmación factual. Como control puntual, la afirmación sobre la Gran Barrera de
Coral se contrastó con fuentes primarias y no se registró como defecto: NOAA la
describe como la mayor estructura viva y visible desde el espacio, y NASA documenta
su observación desde la ISS. Véanse
https://oceanservice.noaa.gov/facts/gbrlargeststructure.html y
https://www.nasa.gov/image-article/great-barrier-reef-near-whitsunday-islands/.

Ese control puntual no permite extrapolar que todos los hechos estén validados. La
procedencia por ítem permanece abierta mediante `GOV-001`.

## 7. Representación, sensibilidad y derechos

La medición léxica del corpus encontró fuerte concentración universitaria: 199 usos de
“student”, 188 de “professor”, 65 de “library”, 31 de “university” y 30 de “campus”.
Las referencias explícitas a familia, discapacidad, vejez, pueblos indígenas y
regiones fuera del contexto anglófono son mucho menores. Es un indicador de cobertura,
no un diagnóstico demográfico ni prueba de sesgo por sí solo.

Decisiones:

- no se encontró contenido manifiestamente estereotipado o dañino que exigiera retiro
  inmediato;
- sí se registra riesgo de monotonía de roles, campus y funciones discursivas;
- una revisión independiente debe evaluar sensibilidad, acentos, nombres, roles y
  diversidad temática antes de validar lotes;
- ningún ítem tiene autoría, licencia o procedencia documental suficiente para release;
- no se atribuye ElevenLabs, ETS ni ningún tercero sin evidencia.

## 8. Matriz de rutas posteriores

| Hallazgo | Unidad propietaria |
|---|---|
| QA técnico/lingüístico/humano de 260 MP3 | T06–T08 |
| Paridad dato → render → scoring → reporte | T09 |
| Tiempo, módulos, navegación y no-prep | T10 |
| Captura, privacidad, persistencia y scoring abierto | T11 |
| Complete the Words | T12 |
| Daily/Academic/multiselect | T13 |
| Choose a Response | T14 |
| Conversation/Announcement/Academic Talk | T15 |
| Build a Sentence | T16 |
| Email/Discussion | T17 |
| Repeat | T18 |
| Interview | T19 |
| Brechas D/E y costo de generación | T20 |

Ninguna corrección editorial se implementa en T05. Cada piloto debe conservar el
contenido fuente, producir variantes versionadas cuando corresponda y registrar
`source_item_id`, transformación, fecha y responsable.

## 9. Las siete auditorías de T05

### Auditoría 1 — full-stack, datos y repositorio

Pasa para el gate documental. La matriz tiene 1.140 filas únicas, coincide 1:1 con
los `item_unit` de T03, no presenta padres ausentes y conserva la ruta fuente. No se
tocaron runtime, schema, scoring, worktree ajeno ni remotos.

### Auditoría 2 — TOEFL

Pasa para diagnóstico inicial. Se contrastaron las doce familias y longitudes con el
registro oficial versionado. No se afirma completitud, adaptatividad ni equivalencia
psicométrica. Las divergencias se enlazan a T09–T20.

### Auditoría 3 — editorial y pedagógica

Pasa el gate T05: 1.140/1.140 ítems tienen clase, acción y hallazgos. Se revisaron
instrucciones, estímulos, prompts, opciones, claves y respuestas. No se confunde esta
primera pasada con adjudicación independiente ni publicación.

### Auditoría 4 — audio

No aplica como aprobación auditiva. Se identificaron 440 ítems dependientes de 260
MP3 y se preservó su fingerprint. No se reprodujo, transcribió, normalizó, recortó,
generó ni sobrescribió audio; T06–T08 siguen abiertas.

### Auditoría 5 — anti-sesgo, similitud y derechos

Pasa sólo para registro de riesgos. Se midieron repetición y concentración temática,
se hizo búsqueda interna de similitud y un control factual puntual. Derechos,
procedencia, similitud externa y revisión especializada permanecen como bloqueos
explícitos en las 1.140 filas.

### Auditoría 6 — UI/UX y accesibilidad

No certifica UI. No hubo cambio visual. T03 aporta `renderer_status`; T05 conserva los
20 multiselect `unhandled` y enruta interacción/accesibilidad a T09/T13. Speaking se
mantiene bloqueado por captura inexistente en T18/T19.

### Auditoría 7 — Playwright

No aplica. Ninguna superficie renderizada cambió y una prueba E2E no demostraría
calidad editorial. La cobertura documental se valida por paridad fuente↔T03↔TSV.

## 10. Reproducción y gate

Controles reproducidos al cerrar:

```bash
shasum -a 256 docs/toefl-2026-editorial-audit-2026-08-09.tsv
find src/data/mocks -maxdepth 1 -type f -name 'toefl-set-*.ts' -print0 | sort -z | xargs -0 shasum -a 256 | shasum -a 256
find public/audio/toefl -type f -name '*.mp3' -print0 | sort -z | xargs -0 shasum -a 256 | shasum -a 256
git diff --check
npm run check:practica-catalog
npx tsc --noEmit
npm run build
```

Huellas preservadas:

- fuentes TOEFL: `50b3b8d7dd04826cf625052e7910b844c305894d43b2eae5fda01f881d3d512d`;
- MP3 TOEFL: `dab2fdb8340d2dc72df4d70923985bdfd876174a922d646a3795bb39a5619842`.

Gate T05:

- [x] 1.140/1.140 ítems clasificados A/B/C/D/E;
- [x] cada fila tiene acción, severidad, hallazgos y ruta posterior;
- [x] 0 IDs faltantes, extras o duplicados respecto de T03;
- [x] clases D identificadas de forma explícita;
- [x] clase E separada de brechas futuras, sin generar contenido prematuramente;
- [x] derechos, revisión independiente, audio y release permanecen bloqueados donde
  corresponde;
- [x] originales de texto y audio intactos.

**Estado final:** T05 cerrada para auditoría editorial inicial. La siguiente unidad
elegible es T06, auditoría técnica global de audio.
