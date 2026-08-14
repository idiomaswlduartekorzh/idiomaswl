# TOEFL iBT 2026 — contrato datos → render → respuesta → scoring → reporte

> `contract_id`: `toefl-data-render-scoring`
>
> `contract_version`: `2026-08-09.v1`
>
> `official_registry`: `toefl-ibt-2026@2026-08-09.v2`
>
> `fidelity_policy`: `toefl-fidelity-disclosure@2026-08-09.v1`
>
> `source_inventory`: `docs/toefl-2026-editorial-inventory-2026-08-09.tsv`
>
> `source_inventory_sha256`:
> `fbeb7d5d7580f12accc526266e11f46e598d7c1d4010c331b8323af96dbd69e6`
>
> `source_fingerprint`:
> `50b3b8d7dd04826cf625052e7910b844c305894d43b2eae5fda01f881d3d512d`
>
> `status`: contrato T09 aprobado para implementación en T12–T19; el runtime
> existente continúa bloqueado y no hereda aprobación
>
> `review_by`: 9 de septiembre de 2026, o antes de cualquier release TOEFL

Este documento cierra la decisión de datos de T09 del tablero maestro. Define una
sola identidad y una sola unidad de respuesta desde la composición hasta el reporte.
No modifica los 20 sets, el runner, el scoring, la persistencia ni los 260 MP3. Los
pilotos T12–T19 deben implementar este contrato por familia y demostrarlo con UI y
E2E antes de retirar cada bloqueo.

La matriz normativa y medible vive en
`docs/toefl-2026-data-render-scoring-contract-2026-08-09.tsv`. Tiene trece filas:
las doce familias oficiales y una fila separada para la variante local `multiselect`
de Academic Reading. La fila separada no afirma que `multiselect` sea una familia
oficial independiente; evita que el banco existente vuelva a perderla.

## 1. Pregunta que resuelve T09

Para cada unidad incluida en una composición deben poder responderse, sin leer el
componente que casualmente la dibuja, estas preguntas:

1. ¿Cuál es su ID estable y de qué original/versionado proviene?
2. ¿Qué estímulo y tarea gobiernan la unidad?
3. ¿Qué debe presentar la interfaz?
4. ¿Qué respuesta puede producir el estudiante?
5. ¿Existe un evaluador válido para esa respuesta?
6. ¿Cuál es el resultado de evaluación, incluido pendiente o fallo técnico?
7. ¿Cómo aparece la unidad en conteos y reporte?
8. ¿Qué versiones de política, registro y scoring permiten interpretar el resultado?

Una rama `default: return null`, un contador reconstruido desde JSX o una banda sin
resultados por unidad incumplen el contrato aunque la página compile.

## 2. Línea base medida antes de T09

### 2.1 Autoridades inspeccionadas

- los 20 `src/data/mocks/toefl-set-*.ts`;
- `src/data/mocks/types.ts`;
- `Toefl2026PracticeClient.tsx`;
- `src/components/ExamReport.tsx`;
- `src/lib/actions/saveExamResult.ts`;
- inventario T03 y auditoría T05;
- registro oficial T01 y política de fidelidad T02.

Huellas al medir:

| Activo | SHA-256 |
|---|---|
| `types.ts` | `c8fca69d7a73f92dfaed6c9095f250e6bdd088a33e6393acac06c4bbc8f7bd13` |
| `Toefl2026PracticeClient.tsx` | `ed33cfe60ea8e2922db55111a7209defbae9cf9215bb686a2761e78b6a1ac21b` |
| `ExamReport.tsx` | `a100dc8d563fddfcd46dd2842485021c3bc427d06ef69f2162d77a25ef7701c1` |
| `saveExamResult.ts` | `5289db02219add3c784d2af621a31bdc0825cd7bcf48d997ddb68c90df867f4d` |

### 2.2 Conteos actuales

| Medición | Resultado |
|---|---:|
| Unidades fuente T03 | 1.140 |
| Unidades que el progreso intenta representar | 1.120 |
| Unidades omitidas | 20 `multiselect` |
| Unidades incluidas en un denominador automático | 900 |
| De esas 900, Complete the Words con unidad de respuesta rota | 240 |
| Respuestas escritas capturadas pero autoevaluadas | 40 |
| Tareas orales sin captura de habla | 180 |
| Resultados trazables por `item_id` en `ExamReportData` | 0 |
| `scoring_version`, `policy_version` o `registry_version` persistidos | 0 |

La introducción muestra 56 actividades por set porque el conteo nace de las ramas
que el runner conoce, no de una composición validada. Reading y Listening colapsan
780 unidades en dos strings `raw`; Build influye en una banda compuesta sin desglose;
Email, Discussion y las 180 tareas de Speaking pueden afectar bandas a partir de
autoevaluación. Ninguna unidad conserva outcome trazable en el reporte.

### 2.3 Fallos concretos de paridad

1. **Complete the Words:** la interfaz muestra `prefix` fuera del input y pide las
   letras faltantes, pero el código compara el input con `answer`, que es la palabra
   completa. La práctica oficial revisada describe y clavea letras faltantes.
2. **Academic multiselect:** 20 objetos existen en fuente; `renderQuestion` cae en
   `default`, progreso y scoring no los cuentan, y el reporte desconoce su existencia.
3. **Speaking Repeat:** 100 tareas se marcan respondidas al renderizarse, sin respuesta.
4. **Interview:** 80 textareas de notas se tratan como progreso aunque no son la
   respuesta oral solicitada.
5. **Reporte y persistencia:** no existe una entidad outcome por unidad. El reporte
   combina medidas incompatibles, muestra `Overall Band` y una aproximación `/120`,
   y la acción de guardado no recibe versiones, ruta, conteos ni respuestas TOEFL.
6. **Precisión persistida:** la UI admite medias bandas, pero el sanitizador general
   redondea `totalScore` a entero antes de guardar. T11 debe resolver el schema; T09
   prohíbe interpretar ambos valores como la misma medición.

## 3. Invariantes normativos

### INV-001 — Identidad estable

Cada unidad tiene `item_id`, `content_version`, `source_item_id` cuando sea derivada,
`set_id`, `section`, `task_rule` y `task_family`. El ID de un objeto agrupador no puede
sustituir los IDs de sus respuestas: cada blank de Complete the Words conserva el ID
que T03 ya fijó.

### INV-002 — Composición explícita

La composición enumera `item_id`; no infiere el universo recorriendo JSX. Un ítem
incluido que no tenga renderer compatible hace fallar cerrada la composición. No se
permite omitirlo y reducir el contador en silencio.

### INV-003 — Unidad única de respuesta

Datos, UI y evaluador comparten `response_kind`. Si la UI pide letras faltantes, el
canon de scoring son letras faltantes. Si pide IDs de opción, el scorer no usa índices
dependientes del orden visual. Si hay tiles duplicados, se usan IDs de instancia y no
el texto como identidad.

### INV-004 — Respuesta separada de progreso

`presented`, `responded` y `evaluated` son estados diferentes. Reproducir audio,
mostrar un prompt, revelar una transcripción o escribir notas no prueba una respuesta
oral. Ningún estado se incrementa por el mero render.

### INV-005 — Outcome total y tipado

Cada unidad incluida produce exactamente un outcome reportable al cerrar el intento:

| Estado | Significado | ¿Entra en numerador? | ¿Entra en denominador? |
|---|---|---:|---:|
| `not_presented` | El intento terminó antes de que la unidad fuera mostrada | No | No; obliga a declarar intento incompleto |
| `unanswered` | Era evaluable, pero no hubo respuesta antes del cierre | No | Sí, si la unidad era puntuable y válida |
| `pending_evaluation` | Respuesta capturada; falta evaluador/rúbrica | No | No en un agregado numérico todavía |
| `scored` | Evaluación válida y versionada | Según `raw_points` | Sí |
| `technical_failure` | El sistema impidió capturar/evaluar | No | No; se reporta aparte |
| `invalidated` | Ítem, clave o interacción inválidos | No | No; se reporta el motivo |
| `not_evaluated` | El producto declara práctica sin evaluación | No | No; nunca se convierte en cero |

No existe el estado implícito `undefined` para una unidad cerrada.

### INV-006 — Puntos y escalas separados

`raw_points` y `max_raw_points` pertenecen al outcome. Una estimación agregada requiere
`scoring_version`, población/alcance declarado y metodología. Las reglas locales no
se llaman IRT, equating, banda ETS ni comparable `/120`. Ausencia de un evaluador
válido para Email, Discussion o Speaking impide el overall numérico.

### INV-007 — Reporte derivado, no recontado

El reporte consume outcomes cerrados. No vuelve a recorrer el banco ni el estado de
React para reconstruir denominadores. Debe mostrar, por sección y familia:

- fuente incluida;
- presentada;
- respondida;
- evaluada;
- correcta/puntos sólo cuando corresponda;
- pendiente;
- fallo técnico;
- invalidada o no evaluada.

La suma de filas debe reconciliar con el total de composición y conservar `item_id`.

### INV-008 — Versiones y disclosure viajan con el intento

Todo intento conserva `fidelity_level`, `validation_status`, `mode`, `adaptivity`,
`policy_version`, `official_registry_version`, `composition_version`,
`scoring_version` o `none`, `route_id`, `timing_model`, `disclosure_ids` y
`review_by`. Un campo ausente nunca se rellena suponiendo C/D u oficialidad.

### INV-009 — Normalización específica por respuesta

No existe una función global que quite puntuación a cualquier respuesta:

- missing letters: NFC, trim exterior, casefold inglés y coincidencia exacta;
- opción simple: ID estable exacto;
- selección múltiple: conjunto exacto de IDs y cardinalidad explícita;
- tiles: secuencia exacta de IDs contra una o más secuencias adjudicadas;
- texto/audio: se conserva el original; una rúbrica versionada evalúa sin mutarlo.

### INV-010 — Fallo cerrado

Tipo desconocido, renderer ausente, key inválida, cardinalidad incoherente, respuesta
sin evaluador o versión faltante producen error/estado bloqueado. Nunca `return null`,
autoaprobación, cero silencioso ni exclusión del denominador sin razón.

## 4. Modelo conceptual mínimo

No es un schema de base de datos; T11 decidirá persistencia y privacidad. Sí es la
frontera que las implementaciones deben respetar.

### 4.1 Definición de unidad

| Grupo | Campos mínimos |
|---|---|
| Identidad | `item_id`, `content_version`, `source_item_id`, `set_id` |
| Alineación | `section`, `task_rule`, `task_family`, `fidelity_level` |
| Presentación | `renderer_kind`, `stimulus_ids`, `instructions_id`, `a11y_contract` |
| Respuesta | `response_kind`, `cardinality`, `required`, `response_schema_version` |
| Evaluación | `evaluator_kind`, `max_raw_points`, `scoring_version`, `normalization_id` |
| Gobernanza | `editorial_status`, `rights_status`, `audio_status`, `review_by` |

### 4.2 Respuestas permitidas

| `response_kind` | Payload conceptual | Usos TOEFL |
|---|---|---|
| `missing_letters_text` | texto de las letras que faltan | Complete the Words |
| `selected_option_id` | ID estable de opción | R/L selección única |
| `selected_option_ids` | conjunto de IDs estables | variante local `multiselect` |
| `ordered_tile_instance_ids` | secuencia de IDs de instancia | Build a Sentence |
| `text_response` | texto original + metadatos de captura | Email/Discussion |
| `audio_response_ref` | referencia privada + duración/estado técnico | Repeat/Interview |

`number[]`, texto visual de opción o booleano `done` no son contratos persistibles.

### 4.3 Outcome y reporte

Un outcome conserva como mínimo:

- `attempt_id`, `item_id`, `response_id` o `none`;
- `presentation_status` y `response_status`;
- uno de los estados de INV-005;
- `raw_points`, `max_raw_points` sólo cuando apliquen;
- `evaluator_kind` y `scoring_version` o `none`;
- `reason_codes` para fallo, invalidación o no evaluación;
- timestamp y versiones de contenido/composición.

El reporte agrega outcomes; no guarda únicamente una etiqueta final. Los datos
personales, texto y voz no deben viajar dentro del agregado público.

## 5. Contrato por familia

La matriz TSV es normativa. Este resumen explica las decisiones que no caben en una
celda.

### 5.1 Reading

- **Complete the Words:** una unidad es una secuencia de letras faltantes, no el objeto
  de seis blanks ni la palabra completa. Se conserva la palabra canónica para validar
  que `prefix + missing + suffix` la reconstruye, pero el scorer compara la respuesta
  con `missing`.
- **Daily Life y Academic single-select:** opciones con IDs estables; el orden visual
  puede cambiar sin cambiar la clave.
- **Academic multiselect local:** exactamente `selectCount`, score binario por conjunto
  exacto y un punto máximo. T13 debe decidir si la variante sigue alineada con el
  formato vigente; T09 sólo garantiza que no desaparezca ni se degrade a selección
  única.

### 5.2 Listening

Cada pregunta MCQ es una unidad. El audio compartido es estímulo, no punto adicional.
Un fallo de reproducción invalida las unidades afectadas y se reporta como técnico,
no como error lingüístico. T14/T15 implementan orden, visuales y navegación; T08 sigue
siendo requisito de aprobación humana de los medios.

### 5.3 Writing

- **Build a Sentence:** la unidad incluye contexto, esqueleto, slots y tiles. Una
  permutación de tiles sin contexto no satisface el contrato aunque el orden sea
  calificable. Variantes aceptadas requieren adjudicación explícita.
- **Email/Discussion:** capturar texto no equivale a evaluarlo. Hasta T17/T11, el
  outcome es `pending_evaluation` o `not_evaluated`; no se solicita al estudiante una
  banda para mezclarla con aciertos.

### 5.4 Speaking

Repeat e Interview requieren una referencia a audio realmente capturado. Denegación de
micrófono, grabación vacía o fallo de subida son estados técnicos. Sin respuesta oral,
el outcome no puede ser `scored`, el progreso no avanza como Speaking evaluado y la
unidad no entra en un overall.

## 6. Contadores canónicos

Por composición, sección y familia se guardan/derivan estos contadores:

| Campo | Definición |
|---|---|
| `source_units` | IDs incluidos en la composición versionada |
| `presentable_units` | IDs con renderer y contrato compatibles antes de iniciar |
| `presented_units` | IDs realmente mostrados en el intento |
| `not_presented_units` | IDs incluidos que el intento cerró antes de mostrar |
| `responded_units` | IDs con respuesta válida para su `response_kind` |
| `evaluable_units` | IDs con evaluador válido/versionado |
| `evaluated_units` | IDs cuyo outcome terminó `scored` |
| `pending_units` | Respuestas capturadas pendientes de evaluación |
| `technical_failure_units` | Fallos del sistema separados del desempeño |
| `invalidated_units` | Unidades retiradas del score con reason code |
| `reported_units` | Outcomes representados en el reporte; debe igualar `source_units` al cerrar |

Gates:

```text
antes de iniciar:
  source_units == presentable_units

al cerrar el intento:
  source_units == reported_units
  source_units == not_presented + unanswered + pending_evaluation + scored
                  + technical_failure + invalidated + not_evaluated
  presented_units == source_units - not_presented

para cualquier agregado numérico:
  sólo outcomes scored/unanswered de unidades evaluables y válidas
  pending/not_evaluated/technical_failure/invalidated nunca se convierten en cero
```

La frase del tablero “visible = calificable = reportable” se interpreta como ausencia
de pérdida silenciosa: toda unidad incluida debe tener renderer, respuesta/evaluación
explícita y outcome reportable. Cuando una respuesta construida aún no tiene evaluador,
el reporte dice pendiente/no evaluada y bloquea el agregado; no finge que fue
calificable.

## 7. Política de agregación para los sets B actuales

Hasta T11 y los pilotos:

- no Overall Band;
- no conversión aproximada `/120`;
- no claims de admisión;
- no mezcla de aciertos, autoevaluación y tareas sin captura;
- sí pueden mostrarse aciertos por familia que haya pasado su piloto, con numerador,
  denominador y versión local;
- las familias no evaluadas aparecen con conteo y estado, no como cero;
- el reporte lleva DS-000, DS-B-001–004 y cualquier disclosure específico aplicable.

La persistencia actual de `ExamReportData` no satisface este contrato. T11 debe diseñar
la migración y retención; T09 no autoriza almacenar respuestas de texto o voz.

## 8. Reutilización y migración

No se reescriben los 1.140 ítems en T09.

| Banco existente | Decisión de preservación |
|---|---|
| 240 blanks | Conservar palabra/prefix/suffix; derivar y validar missing letters en T12 |
| 540 MCQ visibles de R/L | Conservar texto/opciones; asignar IDs estables de opción sin cambiar contenido |
| 20 multiselect | Conservar íntegros; implementar variante o invalidar con reason code, nunca omitir |
| 120 Build | Conservar tiles/clave; añadir contexto/versiones en T16 y reemplazar sólo los 2 D |
| 40 prompts escritos | Conservar; separar captura de evaluación en T17 |
| 100 Repeat + 80 Interview | Conservar estímulos/prompts; captura y privacidad pertenecen a T18/T19/T11 |
| 260 MP3 | Inmutables; T09 no cambia manifiesto ni estado T08 |

Las opciones deben recibir IDs derivados de `item_id + option_slot` en una primera
versión, preservando el orden y la clave actuales. Un futuro shuffle usa esos IDs y
registra el orden presentado. Los tiles necesitan `tile_instance_id` porque el mismo
texto puede aparecer más de una vez.

## 9. Requisitos de implementación para T12–T19

Cada piloto debe demostrar:

1. composición con IDs y versión;
2. todos los tipos incluidos tienen renderer exhaustivo;
3. respuesta tipada y recuperable;
4. progreso derivado de respuesta, no de render;
5. outcome por unidad, incluidos fallos;
6. agregados derivados de outcomes;
7. reporte con reconciliación de conteos;
8. teclado, lector de pantalla, móvil y estados de error;
9. prueba unitaria/integración de clave, cardinalidad y normalización;
10. Playwright que cubra respuesta, recarga, cierre y reporte.

Un piloto puede implementar sólo su familia, pero no puede introducir un segundo
contrato paralelo. T11 es responsable de persistencia, privacidad, retención y
versionado del intento; T10 de relojes/módulos/navegación.

## 10. Siete auditorías de T09

### 10.1 Full-stack, datos y repositorio

Pasa para contrato. Se reconciliaron 1.140 unidades T03 con tipos, renderer, progreso,
scoring, `ExamReportData` y guardado. La matriz suma 940 objetos y 1.140 unidades;
13/13 filas tienen respuesta, renderer, outcome, agregación, bloqueo y unidad posterior.
No se tocó código, banco, audio, base de datos ni trabajo IELTS concurrente.

### 10.2 Experto TOEFL vigente

Pasa para contrato. ETS fue reabierto el 9 de agosto de 2026: 50/47/12/11, Reading y
Listening multietapa, un punto máximo por ítem puntuado de R/L, Build 1, Email y
Discussion 5, y Speaking 5 por respuesta. Las prácticas oficiales se usan para
confirmar letras faltantes, contexto/slots de Build y captura oral sin preparación,
no como contenido a copiar ni blueprint universal.

### 10.3 Editorial y diseño instruccional

Pasa como frontera de interacción. Se separaron estímulo, unidad, respuesta y outcome;
una variante lingüística exige adjudicación y una tarea inválida no se arregla
cambiando sólo la clave. Los hallazgos T05 siguen bloqueando cada piloto.

### 10.4 Audio técnico, lingüístico y humano

No aplica a aprobar audio: ningún MP3, manifiesto o transcripción cambió. El contrato
modela fallo técnico, respuesta oral y dependencia T08 sin adjudicar activos. T14,
T15, T18 y T19 continúan bloqueadas hasta reabrir/cerrar T08.

### 10.5 Multiperspectiva, anti-sesgo y derechos

Pasa para minimización y trazabilidad. El contrato no copia material ETS, no infiere
autoría/licencia, mantiene `rights_status` y evita que falla técnica, discapacidad o
denegación de micrófono se contabilicen como bajo desempeño. `GOV-001` sigue abierto
en 1.140 unidades.

### 10.6 UI/UX y accesibilidad

Pasa como contrato, no como certificación del runner. Define grupos de opción con
cardinalidad anunciada, IDs estables, tiles operables por teclado, inputs nombrados,
captura/fallback oral y reportes no dependientes del color. Los pilotos deben probar
las superficies reales.

### 10.7 Playwright E2E

No aplica a cerrar la decisión documental: no cambió runtime. Ejecutar la UI actual
sólo reconfirmaría defectos ya medidos y no probaría una implementación inexistente.
T12–T19 deben aportar E2E por familia; T09 registra los asserts que esas pruebas deben
hacer.

## 11. Gate de salida T09

| Criterio | Evidencia |
|---|---|
| Todas las familias representables | 12 familias + variante multiselect en 13 filas normativas |
| Unidad fuente inequívoca | 1.140 unidades reconciliadas con T03 |
| Respuesta tipada | 6 `response_kind` sin booleano `done` |
| Renderer exigible | 13/13 filas con `required_renderer` |
| Calificación explícita | 13/13 con máximo, evaluador/normalización y bloqueo |
| Reporte sin pérdidas | Outcome total + `source_units == reported_units` |
| Agregación responsable | Pending/fallo/invalidated no se convierten en cero; sin overall inválido |
| Versiones y disclosures | Campos obligatorios de T01/T02/T09 definidos |
| Banco y MP3 preservados | 0 cambios de contenido, código o audio |

**Estado T09:** cerrable para contrato. Esto no significa que el runtime actual pase
la paridad: significa que T12–T19 ya tienen una única frontera verificable para
implementarla. La próxima primera unidad elegible es T10 — contrato de tiempo,
módulos y navegación.

## 12. Historial

| Versión | Fecha | Cambio |
|---|---|---|
| `2026-08-09.v1` | 2026-08-09 | Contrato inicial: 1.140 unidades, 13 perfiles, 10 invariantes, respuestas/outcomes tipados y política de agregación B. |
