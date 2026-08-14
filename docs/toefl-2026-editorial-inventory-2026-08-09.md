# TOEFL iBT 2026 — inventario editorial de los 20 sets

> `inventory_id`: `toefl-2026-editorial-inventory`
>
> `inventory_version`: `2026-08-09.v1`
>
> `snapshot_date`: 9 de agosto de 2026
>
> `official_registry`: `toefl-ibt-2026@2026-08-09.v2`
>
> `source_fingerprint`:
> `50b3b8d7dd04826cf625052e7910b844c305894d43b2eae5fda01f881d3d512d`
>
> `inventory_sha256`:
> `fbeb7d5d7580f12accc526266e11f46e598d7c1d4010c331b8323af96dbd69e6`
>
> `status`: cerrado para T03; no equivale a aprobación editorial

Este documento cierra T03 de
`docs/toefl-2026-alignment-loop.md`. Su registro fila por fila está en
`docs/toefl-2026-editorial-inventory-2026-08-09.tsv`. No modifica ni duplica el
contenido de los sets: conserva los textos y los objetos TypeScript como fuente de
verdad y añade una capa normalizada de identidad, tarea, estado y parentesco.

T03 responde **qué existe y dónde está**. T05 decidirá, después de leer cada contenido,
si es reutilizable como A/B/C, si requiere reparación D o si debe retirarse E.

## 1. Decisión de granularidad

Se registran cinco clases de entidad:

| `record_type` | Qué representa | Total |
|---|---|---:|
| `set` | Una composición completa existente | 20 |
| `section` | Uno de los 13 bloques fuente de un set | 260 |
| `stimulus` | Entrada sustantiva que el estudiante debe leer u oír | 480 |
| `question_object` | Objeto `Question` conservado en TypeScript | 940 |
| `item_unit` | Unidad individual de respuesta/progreso | 1.140 |
| **Total** | Registros con ID único | **2.840** |

La distinción evita dos pérdidas de información:

1. Los 40 objetos `wordcomplete` contienen 240 blanks. El inventario conserva ambos
   niveles: objeto fuente e ítem respondible.
2. Un audio y su transcripción candidata son un solo estímulo multimodal, no dos
   estímulos artificialmente duplicados.

Una pregunta MCQ continúa siendo un `question_object` y una `item_unit`. No se
duplica su texto como estímulo independiente: el estímulo es el pasaje o audio al que
la pregunta apunta. Las tareas sin contexto externo, como Build a Sentence en su forma
actual, conservan el ítem y dejan visible la ausencia de estímulo contextual para T05.

## 2. Fuentes y límites

Incluido:

- `src/data/mocks/toefl-set-1.ts` a `toefl-set-20.ts`;
- los 20 `MockExam`, sus 260 secciones, 940 objetos y 1.140 unidades;
- estímulos textuales y audiovisuales enlazables desde esos objetos;
- la tarea oficial aplicable mediante los `rule_id` de T01;
- estado editorial, validación, reutilización pendiente y visibilidad estructural.

No incluido deliberadamente:

- una evaluación lingüística o factual del contenido;
- una clase A/B/C/D/E inventada sin lectura y adjudicación;
- hashes, duración, loudness, codec o QA por MP3, que pertenecen a T04–T08;
- rutas, scoring, tiempos o captura de respuestas, que pertenecen a T09–T19;
- textos completos, claves, transcripciones o archivos de audio duplicados dentro del
  inventario.

## 3. Esquema TSV

Las primeras ocho líneas de `toefl-2026-editorial-inventory-2026-08-09.tsv` fijan
identidad, versión, registro oficial, huella fuente, alcance y defaults heredados.
Después aparece una fila por entidad.

| Campo | Contrato |
|---|---|
| `record_type` | `set|section|stimulus|question_object|item_unit` |
| `record_id` | ID global, estable y único dentro de esta versión |
| `set_id` | `set-1` a `set-20` |
| `part` | Parte 1–13; vacío sólo para la composición completa |
| `task_rule` | Regla oficial T01 que gobierna la tarea |
| `source_type` | Tipo fuente o clase de estímulo |
| `parent_id` | Set, sección u objeto del que depende |
| `editorial_state` | Estado permitido por el ciclo editorial |
| `validation_status` | Evidencia disponible, separada del estado |
| `reuse_status` | `pending_T05` hasta adjudicación A/B/C/D/E |
| `renderer_status` | `handled|unhandled|mixed`; descripción estructural, no calidad |

Defaults normalizados:

- `content_version = legacy_unversioned`;
- `authorship_status = not_recorded`;
- `provenance_status = not_recorded`.

No se inventa una autoría ni una procedencia. Su ausencia queda registrada como deuda
editorial transversal y deberá resolverse antes de `validated`.

## 4. Gramática de IDs

| Entidad | Patrón | Ejemplo |
|---|---|---|
| Set | `set:{set_id}` | `set:set-1` |
| Sección | `section:{set_id}:part-{N}` | `section:set-1:part-4` |
| Pasaje compartido | `stimulus:{set_id}:part-{N}:passage` | `stimulus:set-1:part-4:passage` |
| Audio compartido | `stimulus:{set_id}:part-{N}:audio` | `stimulus:set-1:part-6:audio` |
| Estímulo por objeto | `stimulus:{question_id}:{kind}` | `stimulus:t1-l-cr1:audio` |
| Objeto fuente | `object:{question_id}` | `object:t1-r-ap6` |
| Ítem ordinario | `item:{question_id}` | `item:t1-r-ap6` |
| Blank | `item:{question_id}:blank-{num}` | `item:t1-r-cw1:blank-1` |

Los 2.840 `record_id` son únicos y todas las referencias `parent_id` resuelven a
otra fila del inventario.

## 5. Mapeo oficial y cobertura

| Regla T01 | Familia de tarea | Secciones | Estímulos | Objetos | Ítems |
|---|---|---:|---:|---:|---:|
| R-001 | Complete the Words | 20 | 40 | 40 | 240 |
| R-002 | Read in Daily Life | 40 | 40 | 100 | 100 |
| R-003 | Read an Academic Passage | 20 | 20 | 120 | 120 |
| L-001 | Listen and Choose a Response | 20 | 100 | 100 | 100 |
| L-002 | Listen to a Conversation | 20 | 20 | 80 | 80 |
| L-003 | Listen to an Announcement | 20 | 20 | 60 | 60 |
| L-004 | Listen to an Academic Talk | 20 | 20 | 100 | 100 |
| W-001 + W-004 | Build a Sentence y contrato de contexto | 20 | 0 | 120 | 120 |
| W-002 | Write an Email | 20 | 20 | 20 | 20 |
| W-003 | Write for an Academic Discussion | 20 | 20 | 20 | 20 |
| S-001 | Listen and Repeat | 20 | 100 | 100 | 100 |
| S-002 | Take an Interview | 20 | 80 | 80 | 80 |
| **Total** | **12 familias** | **260** | **480** | **940** | **1.140** |

Cada set aporta exactamente 142 registros:

```text
1 set + 13 secciones + 24 estímulos + 47 objetos + 57 ítems = 142
```

La igualdad de conteos por set no demuestra igualdad de calidad, dificultad ni
fidelidad. Sólo prueba cobertura inventarial.

## 6. Desglose de estímulos

| `source_type` | Total | Estado de fuente |
|---|---:|---|
| `wordcomplete_template` | 40 | Texto fuente |
| `section_passage` | 60 | Texto fuente compartido |
| `question_audio_without_transcript` | 100 | Audio por ítem; sin transcripción canónica en el objeto |
| `section_audio_with_transcript_candidate` | 60 | Audio largo con transcripción fuente no adjudicada |
| `writing_stimulus` | 40 | Situación/discusión escrita |
| `repeat_audio_with_script_candidate` | 100 | Audio con `targetSentence` candidato |
| `interview_text_prompt` | 80 | Prompt textual en el banco actual |
| **Total** | **480** | |

Hay 260 estímulos con audio, uno por cada referencia MP3 congelada en T00:

```text
100 Choose Response + 60 audios largos + 100 Repeat = 260
```

Esto no es todavía el manifiesto T04. “Con transcripción candidata” significa que el
texto existe en la fuente; no que coincida con el MP3 ni que haya pasado revisión ASR,
lingüística o humana.

## 7. Objetos y unidades

| Tipo fuente | Objetos | Unidades |
|---|---:|---:|
| `wordcomplete` / `wordcomplete_blank` | 40 | 240 |
| `mcq` | 540 | 540 |
| `multiselect` | 20 | 20 |
| `sentencebuild` | 120 | 120 |
| `write` | 40 | 40 |
| `repeat` | 100 | 100 |
| `speak` | 80 | 80 |
| **Total** | **940** | **1.140** |

En `renderer_status` quedan explícitos los 20 objetos y 20 ítems `multiselect`
`unhandled`. Las 20 secciones que los contienen y los 20 sets figuran como `mixed`;
los 2.760 registros restantes figuran como `handled`. Este campo sólo informa la
paridad estructural observada en T00, no certifica scoring, captura ni accesibilidad.

## 8. Política de estado conservadora

| Entidad | `editorial_state` | `validation_status` | `reuse_status` |
|---|---|---|---|
| 20 sets | `draft` | `audited_with_blockers` | `pending_T05` |
| 2.820 registros hijos | `draft` | `legacy_unverified` | `pending_T05` |

`draft` es la única asignación defendible porque no hay evidencia estructurada de
revisión editorial, experta, de derechos o de audio. Los archivos preexistían, pero
antigüedad o disponibilidad pública no equivalen a validación.

T03 no asigna A/B/C/D/E. Una fila sólo podrá cambiar a
`editorial_review → expert_review → audio_review → pilot → validated` cuando exista
la evidencia exigida por el contrato maestro. Los sets conservan nivel de fidelidad B
y `audited_with_blockers` según T02; ese nivel de producto no aprueba sus ítems.

## 9. Hallazgos de enrutamiento para las siguientes unidades

Sin adjudicar calidad, el inventario confirma estas colas:

- 20 `multiselect` están presentes en fuente pero no atendidos por el renderer;
- 40 objetos Complete the Words deben auditarse como 240 respuestas;
- 100 audios Choose Response no tienen transcripción canónica en el objeto;
- 60 transcripciones de audios largos y 100 `targetSentence` de Repeat son sólo
  candidatos hasta T07/T08;
- 120 Build a Sentence no tienen `prompt` contextual en la fuente; T00 ya registró
  20 con tiles en el orden de la clave;
- 40 respuestas escritas y 180 respuestas orales requieren contratos de captura,
  rúbrica, privacidad y scoring en T09–T19;
- autoría, versión de contenido y procedencia no están modeladas en los 940 objetos.

Estas son rutas de revisión, no condenas del contenido ni autorización para
regenerarlo.

## 10. Reproducción

### 10.1 Integridad del artefacto y de los activos

```bash
wc -l -c docs/toefl-2026-editorial-inventory-2026-08-09.tsv
shasum -a 256 docs/toefl-2026-editorial-inventory-2026-08-09.tsv
find src/data/mocks -maxdepth 1 -type f -name 'toefl-set-*.ts' -print0 | sort -z | xargs -0 shasum -a 256 | shasum -a 256
find public/audio/toefl -type f -name '*.mp3' -print0 | sort -z | xargs -0 shasum -a 256 | shasum -a 256
```

Resultados esperados:

| Medición | Esperado |
|---|---|
| TSV | 2.849 líneas; 338.997 bytes |
| SHA-256 TSV | `fbeb7d5d7580f12accc526266e11f46e598d7c1d4010c331b8323af96dbd69e6` |
| SHA-256 agregado fuentes | `50b3b8d7dd04826cf625052e7910b844c305894d43b2eae5fda01f881d3d512d` |
| SHA-256 agregado MP3 | `dab2fdb8340d2dc72df4d70923985bdfd876174a922d646a3795bb39a5619842` |

### 10.2 Conteo tabular

```bash
awk -F '\t' 'NR>9 {count[$1]++; ids[$2]++} END {
  for (kind in count) print kind, count[kind]
  duplicates=0
  for (id in ids) if (ids[id]>1) duplicates++
  print "duplicate_record_ids", duplicates
  print "records", NR-9
}' docs/toefl-2026-editorial-inventory-2026-08-09.tsv | sort
```

La regeneración semántica importa los 20 módulos con
`node --experimental-strip-types`, recorre sets y secciones en orden fuente y aplica
estas reglas deterministas:

1. una fila `set` por módulo y una `section` por parte;
2. estímulo de sección por cada `passage` o `audioUrl`;
3. un `question_object` por objeto fuente;
4. estímulo de objeto para `wordcomplete.template`, `Question.audioUrl`,
   `write.stimulus` o `speak.text`;
5. una `item_unit` por objeto, excepto `wordcomplete`, que produce una por blank;
6. tarea derivada únicamente de `part` mediante la tabla de la sección 5;
7. orden estable `set → section → shared stimulus → object → object stimulus → unit`.

La comparación exacta entre esa regeneración en memoria y el TSV pasó sin diferencias.

## 11. Siete auditorías de T03

1. **Full-stack, datos y repositorio — pasa para inventario.** Los 20 módulos importan,
   las 2.840 filas se regeneran desde fuente, todos los padres resuelven y no se tocó
   runtime, scoring, catálogo ni cambios ajenos.
2. **TOEFL vigente — pasa para clasificación de tarea.** Las 13 partes se enlazan a las
   12 familias y reglas R-001–S-002 del registro `2026-08-09.v2`. Los conteos
   abreviados no se presentan como blueprint completo.
3. **Editorial/pedagógica — pasa para cola de revisión.** Ningún contenido recibe
   aprobación automática; estado, ausencias de autoría/procedencia y granularidad de
   blanks quedan visibles. La auditoría sustantiva sigue abierta en T05.
4. **Audio — pasa sólo para cobertura referencial.** Los 260 estímulos de audio están
   inventariados y la huella agregada no cambió. No se escuchó, transcribió, generó ni
   aprobó ningún MP3; T04–T08 conservan esos gates.
5. **Multiperspectiva, anti-sesgo y derechos — pasa para trazabilidad.** El TSV no copia
   contenido ni atribuye autoría inexistente. Sensibilidad, representación, hechos,
   similitud y derechos siguen pendientes de revisión fila por fila en T05.
6. **UI/UX y accesibilidad — no certifica la interfaz.** La omisión estructural de
   `multiselect` queda marcada. T03 no cambia UI; interacción y accesibilidad se
   resuelven en T09/T12–T19.
7. **Playwright — no aplica.** No cambió ninguna superficie renderizada. Ejecutarlo no
   demostraría el gate documental de identidad, tarea y estado.

## 12. Gate de salida T03

| Criterio | Resultado |
|---|---|
| 20 sets inventariados | Pasa: 20/20 |
| Todas las secciones con ID, tarea y estado | Pasa: 260/260 |
| Todos los estímulos con ID, tarea y estado | Pasa: 480/480 |
| Todos los objetos fuente con ID, tarea y estado | Pasa: 940/940 |
| Todas las unidades con ID, tarea y estado | Pasa: 1.140/1.140 |
| IDs globales únicos | Pasa: 2.840/2.840 |
| Padres resolubles | Pasa: 2.820/2.820 |
| Reutilización no prejuzgada | Pasa: 2.840 `pending_T05` |
| Código, contenido y audio preservados | Pasa |

Estado T03: **cerrado**.

Próxima primera unidad elegible: T04 — manifiesto maestro de 260 audios.

## 13. Historial

| Versión | Fecha | Cambio |
|---|---|---|
| `2026-08-09.v1` | 2026-08-09 | Inventario inicial: 20 sets, 260 secciones, 480 estímulos, 940 objetos y 1.140 unidades con identidad, tarea y estado conservador. |
