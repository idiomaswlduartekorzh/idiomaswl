# TOEFL iBT 2026 — contrato de tiempo, módulos y navegación

> `contract_id`: `toefl-2026-time-modules-navigation`
>
> `contract_version`: `2026-08-09.v1`
>
> `official_registry`: `toefl-ibt-2026@2026-08-09.v2`
>
> `fidelity_policy`: `toefl-fidelity-disclosure@2026-08-09.v1`
>
> `data_contract`: `toefl-data-render-scoring@2026-08-09.v1`
>
> `verified_at`: 9 de agosto de 2026
>
> `review_by`: 9 de septiembre de 2026, o antes de cualquier release TOEFL
>
> `status`: contrato normativo de T10; no implementado en el runner actual

Este documento materializa T10 de `docs/toefl-2026-alignment-loop.md`. Define la
máquina de estados, los relojes, las fronteras irreversibles y el manejo de
excepciones para los modos `learn`, `practice`, `exam_fixed`, `exam_adaptive` y
`review`. No cambia código, contenido, audio, scoring ni persistencia.

Su objetivo no es copiar la plataforma de ETS ni prometer equivalencia operacional.
El objetivo es impedir que una práctica WeLearn se presente como simulacro alineado
si su orden, reloj, navegación o adaptatividad contradicen el formato oficial que
WeLearn declara estar entrenando.

## 1. Alcance, autoridad y límites

### 1.1 Fuentes oficiales revalidadas

| ID | Fuente ETS | Uso en este contrato |
|---|---|---|
| S1 | [TOEFL iBT Test Content](https://www.ets.org/toefl/test-takers/ibt/about/content.html) | Orden, volúmenes, tiempos base, exclusión de instrucciones y variación adaptativa. |
| S2 | [TOEFL iBT Test Specifications 2026](https://www.ets.org/content/dam/ets-india/pdfs/toefl/toefl-ibt-test-specifications-2026.pdf) | Dos etapas, tiempos estimados de router/módulo y carácter lineal de Writing/Speaking. |
| S3 | [Teacher FAQ](https://www.ets.org/content/dam/ets-org/pdfs/toefl/teacher-faq.pdf) | Secuencia, módulos, enrutamiento y prohibición de saltar o regresar entre etapas. |
| S4 | [Teacher Resources Practice Test 1](https://www.ets.org/content/dam/ets-org/pdfs/toefl/toefl-ibt-teachers-resources-practice-test-1.pdf) | Navegación dentro de Reading, avance de Listening, relojes de tarea/respuesta y ausencia de preparación oral. |

La jerarquía de resolución de conflictos es la del registro T01. S4 ilustra la
interacción y no sustituye el blueprint de S1/S2. Toda decisión propia se marca
`local`; un valor no publicado se deja versionable o bloqueado, no se inventa.

### 1.2 Reglas oficiales que gobiernan T10

- `GEN-001`: orden Reading → Listening → Writing → Speaking.
- `GEN-002–005`: referencias base 30, 29, 23 y 8 minutos.
- `GEN-006`: las instrucciones quedan fuera del tiempo base; ítems y tiempo pueden
  variar por adaptación.
- `GEN-007`: no hay descanso programado.
- `ADP-001–002`: Reading y Listening tienen dos etapas; el primer módulo enruta el
  segundo.
- `ADP-003`: no se salta entre etapas ni se vuelve al módulo 1 después de iniciar el
  módulo 2.
- `ADP-004`: Reading permite Next/Back dentro del módulo activo.
- `ADP-005` y `L-009`: Listening es pregunta por pregunta y sólo hacia adelante.
- `W-002–003`: Email tiene 7 minutos y Academic Discussion 10.
- `S-003–004`: no hay preparación oral; Repeat se escucha una vez y cada respuesta
  tiene reloj.

### 1.3 Fuera de alcance

T10 no decide:

- umbrales de ruta, calibración, IRT o equivalencia de dificultad: T24;
- schema físico, retención, consentimiento o privacidad: T11;
- segundos exactos no publicados por respuesta de Speaking: T18/T19;
- interacción final de cada familia: T12–T19;
- calidad, regeneración o aprobación humana de audio: T08/T14/T15/T18/T19;
- cambios de producto, código, base de datos o despliegue.

## 2. Línea base observada y diagnóstico

| Dimensión | Estado actual en los 20 sets | Consecuencia |
|---|---|---|
| Tiempo declarado | Los 20 archivos tienen `timeMinutes: 86`. | Un único valor local para experiencias de igual estructura. |
| Reloj | `Timer` usa 5.160 segundos en estado React y un `setInterval` del navegador. | No hay reloj por sección, módulo, pregunta, tarea o respuesta. |
| Autoridad temporal | El contador nace al montar la fase `exam`; no existe `deadline_at` durable. | Recargar reinicia la experiencia y perder foco/suspender el dispositivo puede desincronizarla. |
| Orden | `SKILL_ORDER` es R→L→W→S. | El orden nominal existe, pero no es una frontera. |
| Navegación | Cuatro tabs activos y botones de habilidad anterior/siguiente. | Se puede saltar y regresar entre secciones libremente. |
| Presentación | Se renderizan juntas todas las secciones y preguntas de la habilidad activa. | No hay posición canónica de ítem ni cierre individual. |
| Módulos | No hay `module_id`, etapa, ruta ni política de enrutamiento en `MockExam`. | Reading/Listening son lineales y no adaptativos. |
| Cierre | El botón final o el reloj cambian a autoevaluación/resultados. | No existen cierres idempotentes de ítem, módulo o sección. |
| Recuperación | Respuestas, fase y reloj sólo viven en memoria del cliente. | Recarga, caída o segunda pestaña no se reconcilian. |
| Audio y navegación | Un reproductor impide repetir mientras permanece montado. Cambiar de habilidad desmonta el panel y permite recrearlo. | El “una vez” no es una propiedad durable del intento. No se audita aquí la calidad del MP3. |
| Writing | Email y Discussion comparten el reloj global. | No existen relojes de 7 y 10 minutos. |
| Speaking | No hay reloj por respuesta; Interview ofrece “notas de preparación”. | Contradice `S-003–004`; T18/T19 siguen bloqueados. |

La suma de tiempos base publicados es 90 minutos, mientras el runner muestra 86.
La diferencia aritmética de 4 minutos confirma que no reproduce ni siquiera la suma
base pública; además, ETS indica permitir aproximadamente dos horas de tiempo total
incluyendo pasos externos a esos tiempos base. La comparación no debe ocultar que
WeLearn también presenta sólo 56 actividades atendidas frente a 120 ítems publicados:
86 minutos no es una versión proporcional ni validada del examen.
La diferencia de cuatro minutos, aislada, tampoco identifica una ruta oficial:
algunas rutas estimadas por S2 son más cortas. La divergencia concluyente es que los
20 sets usan el mismo 86 sin módulos, ruta ni relojes por alcance.

El estado actual conserva la clasificación T02: `Nivel B · Práctica abreviada`,
`audited_with_blockers`, ruta fija no adaptativa y navegación de práctica. Puede
conservar temporalmente sus 86 minutos sólo con `DS-B-002`; no puede llamarlos tiempo
oficial ni usarlos para nivel C/D.

### 2.1 Huellas de los componentes inspeccionados

| Ruta | SHA-256 inicial |
|---|---|
| `Toefl2026PracticeClient.tsx` | `ed33cfe60ea8e2922db55111a7209defbae9cf9215bb686a2761e78b6a1ac21b` |
| `src/components/exam-runner/primitives.tsx` | `38fc4e1f7c8a22d149887ace477cde8f16ad15a575627de8976072632522bf93` |
| `src/data/mocks/types.ts` | `c8fca69d7a73f92dfaed6c9095f250e6bdd088a33e6393acac06c4bbc8f7bd13` |
| Registro T01 | `3df60a09b407e9378f9640e25f15977539d441ca0f1750f6a2d73488593dee82` |
| Contrato T02 | `55a41c8cbe6a9f3bbd7897a91b26263fa51e11784ddeea1b3dde7432c7ec8e90` |
| Contrato T09 | `30a2aa732cf94b150caea27586695f4c1906c33e4ffd3290d87c0c907acf00a3` |

Estas huellas preservan el punto auditado; no autorizan reemplazar cambios
concurrentes si una implementación futura encuentra otra versión.

## 3. Principios invariantes

### TMN-001 — La composición precede al reloj

Antes de iniciar, el intento fija `composition_version`, `official_registry_version`,
`timing_model_id`, `mode`, `adaptivity`, `route_id` cuando corresponda y el perfil de
acomodación. Si falta una versión o el total no reconcilia, el intento falla cerrado.

### TMN-002 — Un solo estado canónico

UI, temporizador, navegación, progreso y outcomes consumen la misma posición
canónica: intento → sección → módulo/tarea → ítem/respuesta. El tab activo o el árbol
montado en React no son la fuente de verdad.

### TMN-003 — El tiempo deriva de un deadline

En `exam_fixed` y `exam_adaptive`, el tiempo restante se deriva de un
`deadline_at` autorizado y de una referencia de tiempo durable. Un intervalo del
navegador sólo repinta la UI. Recarga, pestaña oculta, suspensión o reloj local
alterado no crean segundos.

### TMN-004 — Las instrucciones no consumen tiempo base

Los estados `directions` y los chequeos de volumen/permisos ocurren antes del evento
que inicia el reloj correspondiente. No se usan instrucciones como tiempo de
preparación para Speaking.

### TMN-005 — Cerrar es irreversible

Cerrar un ítem forward-only, una respuesta oral, una tarea timed, un módulo o una
sección sella respuestas y outcomes. Repetir la misma transición devuelve el mismo
resultado; nunca reabre ni duplica eventos.

### TMN-006 — La ruta se selecciona una vez

En C, el segundo módulo se predetermina en la composición y se rotula como fijo. En D,
la política de T24 usa el snapshot sellado del módulo 1 y produce una única decisión
versionada. Si falla, no se elige una ruta por defecto.

### TMN-007 — No presentado no significa incorrecto

Cuando expira o se abandona un intento, T09 gobierna los outcomes: lo nunca mostrado
queda `not_presented`; lo mostrado y puntuable sin respuesta puede quedar
`unanswered`; un fallo de sistema queda `technical_failure`. El reloj no modifica
claves ni denominadores por sí mismo.

### TMN-008 — Una divergencia es modo, no excepción oculta

`learn` y `practice` pueden permitir pausa, Back, pistas o cambio de habilidad si lo
declaran. C/D no heredan esas libertades. No existe un flag genérico “TOEFL 2026” que
active claims sin `fidelity_level` y `mode`.

### TMN-009 — Accesibilidad no es baja fidelidad

Una acomodación aprobada modifica el perfil temporal o la interacción antes del
inicio y queda versionada. No cambia el constructo ni se muestra como ventaja. Una
extensión manual silenciosa a mitad de intento está prohibida.

### TMN-010 — Fallar cerrado preserva la interpretación

Ruta ausente, deadline inválido, transición imposible, evento tardío ambiguo,
contenido cambiado o versión incompatible bloquean el avance evaluativo. Nunca se
degrada silenciosamente de adaptativo a fijo ni de reloj específico a global.

## 4. Modelo conceptual mínimo de estado

T10 fija los campos lógicos; T11 decidirá su almacenamiento físico.

| Entidad | Estados permitidos | Campos mínimos adicionales |
|---|---|---|
| Intento | `created`, `directions`, `active`, `submitting`, `closed`, `abandoned`, `invalidated` | `attempt_id`, `mode`, versiones, `transition_seq`, lease de escritor. |
| Sección | `locked`, `directions`, `active`, `closed` | `section`, `ordinal`, `started_at`, `closed_at`. |
| Módulo/tarea | `locked`, `ready`, `active`, `closing`, `closed` | `module_id`, `stage`, `route_role`, `timer_scope`, composición. |
| Ítem/respuesta | `not_presented`, `presented`, `responded`, `closed` | `item_id`, `presented_at`, `response_version`, `closed_at`. |
| Reloj | `not_started`, `running`, `expired`, `stopped`, `suspended_technical` | `clock_id`, `budget_seconds`, `started_at`, `deadline_at`, `accommodation_profile_id`. |
| Ruta | `not_required`, `predetermined`, `pending`, `selected`, `failed` | `route_id`, `routing_policy_version`, `decision_id`, snapshot/hash de entrada. |

`responded` no es un final: una respuesta queda editable sólo mientras la frontera
que la contiene siga activa y la navegación lo permita. `closed` sí es final.

### 4.1 Jerarquía de posición

```text
attempt
└── section (Reading → Listening → Writing → Speaking)
    ├── module (Reading/Listening: stage 1 → stage 2)
    │   └── item
    └── task block (Writing/Speaking: secuencia lineal)
        └── item or constructed response
```

Sólo una sección, un módulo/bloque y un ítem forward-only pueden estar activos en un
instante. Reading puede conservar varias respuestas editables dentro del módulo
activo, pero sigue teniendo una posición focal única para navegación y recuperación.

## 5. Perfiles de modo y navegación

| Regla | `learn` | `practice` | `exam_fixed` | `exam_adaptive` | `review` |
|---|---|---|---|---|---|
| Nivel esperado | A | A/B | C | D | Hereda intento cerrado |
| Orden de secciones | Flexible y declarado | Libre o fijo, declarado | R→L→W→S | R→L→W→S | Libre, sólo lectura |
| Segundo módulo R/L | No requerido | Puede no existir | Predeterminado y visible como fijo | Seleccionado una vez por política T24 | Muestra ruta tomada |
| Reading dentro de módulo | Ayudas/reintentos permitidos | Configuración local visible | Next/Back | Next/Back | Libre lectura |
| Retorno entre módulos | Puede existir si no afirma examen | Permitido sólo como práctica declarada | No | No | Sí, sólo lectura |
| Listening | Puede repetir/navegar si se declara | Regla local explícita | Una reproducción; pregunta a pregunta; no Back | Igual | Reproducción sólo si derechos/política lo permiten |
| Writing | Flexible | Reloj local explícito | Lineal; 7 min Email, 10 min Discussion | Igual | Sólo lectura |
| Speaking | Entrenamiento con ayudas rotuladas | Sin confundir notas con respuesta | Lineal, sin prep, reloj por respuesta | Igual | Respuesta/reporte según consentimiento |
| Pausa de usuario | Permitida | Permitida sólo si configuración lo dice | No | No | No hay reloj |
| Reintento | Permitido | Nuevo intento; no reabre el cerrado | Nuevo intento | Nuevo intento/ruta nueva | No modifica |
| Resultado | Formativo acotado | Diagnóstico parcial WeLearn | Estimación versionada WeLearn | Estimación + ruta | Resultado congelado |

El modo B actual puede conservar navegación libre y reloj global como una decisión
pedagógica local, pero debe mostrar `DS-B-002`: “El temporizador es una guía global
de WeLearn y no reproduce los relojes por módulo, pregunta o respuesta del examen” y
“Este modo permite navegación de práctica y no replica las restricciones del examen”.

## 6. Registro de relojes

Los valores siguientes son configuración normativa inicial, no constantes a copiar
en JSX. Cada forma fija o ruta adaptativa conserva su propia versión.

| `timer_scope` | Presupuesto de referencia | Estado de fuente | Inicio/fin contractual | Acción al expirar |
|---|---:|---|---|---|
| `directions` | Sin cargo al tiempo base | `verified` S1/S3 | Antes de cada reloj; termina al confirmar. | No produce respuesta ni preparación. |
| `practice_global_current` | 5.160 s | `local` | Al entrar en `exam`; termina al enviar/salir. | Cierra la práctica, declara su alcance abreviado y cualquier incompletitud real. |
| `reading_stage_1` | 1.080–1.260 s | `verified` S2, estimado | Al activar módulo 1; termina en submit/expiry. La composición fija el valor exacto. | Sella módulo 1 y solicita ruta. |
| `reading_stage_2` | 540 s | `verified` S2, estimado | Al activar módulo 2; termina en submit/expiry. | Sella Reading y avanza a Listening. |
| `listening_stage_1` | 1.080 s | `verified` S2, estimado | Al activar módulo 1; los ítems muestran reloj por pregunta según S3/S4. | Sella módulo 1 y solicita ruta. |
| `listening_stage_2_lower` | 420 s | `verified` S2, estimado | Al activar ruta lower. | Sella Listening. |
| `listening_stage_2_upper` | 660 s | `verified` S2, estimado | Al activar ruta upper. | Sella Listening. |
| `writing_section` | 1.380 s total | `verified` S1/S2 | Reconciliación de los tres bloques lineales. | Sella Writing. |
| `writing_build_block` | 360 s candidato | `derived_local`, no claim ETS independiente | Es el remanente 23−7−10; T17 debe adjudicarlo antes de C/D. | Sella las diez respuestas pendientes y avanza. |
| `writing_email` | 420 s | `verified` S2/S4 | Al presentar el prompt; submit/expiry. | Sella respuesta y avanza. |
| `writing_discussion` | 600 s | `verified` S2/S4 | Al presentar el prompt; submit/expiry. | Sella respuesta y avanza. |
| `speaking_section` | 480 s total | `verified` S1/S2 | Reconciliación de siete Repeat y cuatro Interview. | Sella Speaking/intento. |
| `speaking_response` | Requerido, valor todavía no aprobado | `unverified_blocker` | Después del prompt/audio, sin preparación; submit/expiry. | Sella captura u outcome técnico y avanza. |

Lectura correcta de S2:

- Reading totaliza router más el módulo segundo: aproximadamente 27–30 minutos;
- Listening totaliza 25 minutos por ruta lower o 29 por ruta upper;
- la página pública resume aproximadamente 30 y 29 porque tiempo e ítems pueden variar;
- Writing y Speaking son lineales, no adaptativos.

No se fuerza a todas las rutas a durar 90 minutos. Sí se exige que
`timing_model_id` declare el total de la ruta y reconcilie cada presupuesto. El
tiempo de direcciones, chequeos y una acomodación aprobada se reporta aparte.
Los relojes de pregunta, tarea o respuesta son particiones del presupuesto de su
módulo/sección, no minutos adicionales: su suma y sus eventos de inicio/fin deben
reconciliar exactamente con la forma o ruta configurada.

### 6.1 Contrato de un reloj

Cada reloj incluye:

| Campo | Regla |
|---|---|
| `clock_id` | Único por intento y frontera. |
| `timer_scope` | Uno de los scopes versionados del registro. |
| `budget_seconds` | Entero positivo derivado de forma/ruta y acomodación. |
| `source_status` | `verified`, `derived_local`, `local` o `unverified_blocker`. |
| `start_event` / `stop_event` | Eventos explícitos de la matriz de transiciones. |
| `started_at` / `deadline_at` | Autoridad durable; no se reconstruyen desde segundos en React. |
| `expiry_action` | Transición idempotente y outcome por cada unidad afectada. |
| `pause_policy` | `none`, `user_allowed_practice` o `technical_hold_audited`. |
| `accommodation_profile_id` | Fijado antes del inicio; `standard` también es explícito. |
| `visibility_policy` | Visible, anunciable y con alertas no dependientes sólo del color. |

### 6.2 Reglas de expiración

1. El servidor o autoridad durable decide si una respuesta llegó antes del deadline.
2. La UI puede mostrar `00:00`, pero no decide por sí sola el orden entre autosave y
   expiración.
3. Expirar cierra la frontera una sola vez y conserva la última versión aceptada a
   tiempo.
4. Las unidades nunca presentadas quedan `not_presented`; las presentadas sin
   respuesta siguen T09.
5. En Reading, expirar el módulo sella todas sus respuestas y continúa a ruta/cierre.
6. En Listening y Speaking, expirar la pregunta/respuesta sella esa unidad y avanza;
   no concede un Back posterior.
7. En Writing, expirar Email/Discussion sella el texto aceptado, incluso vacío, y
   avanza.
8. Un fallo técnico no se convierte automáticamente en expiry académico.

## 7. Máquina de estados canónica

La matriz ejecutable completa está en
`docs/toefl-2026-time-modules-navigation-contract-2026-08-09.tsv`. Estas son sus
fronteras principales.

### 7.1 Inicio

1. `created → directions` sólo después de validar composición, versiones, tiempos,
   disclosures, medios requeridos y perfil de acomodación.
2. `directions → active` crea el primer deadline y activa Reading.
3. C/D siempre empiezan en Reading módulo 1. `practice` puede usar su flujo local si
   lo divulga; `review` requiere un intento ya cerrado.

### 7.2 Reading

- Next y Back sólo cambian el foco dentro del módulo activo.
- Envío explícito requiere confirmación si quedan unidades presentadas sin responder.
- Expiración o confirmación sellan el módulo 1.
- C usa la ruta predeterminada; D llama una sola vez a la política T24 sobre el
  snapshot sellado.
- Activar módulo 2 vuelve imposible abrir o modificar el módulo 1.
- Al cerrar módulo 2, Reading queda cerrada y sólo entonces se habilita Listening.

### 7.3 Listening

- Cada pregunta se presenta en secuencia y tiene una frontera de reloj declarada.
- Next o expiry sella la respuesta actual; Back no es un evento permitido.
- La reproducción única se registra en el intento, no en el montaje del componente.
- No se activa módulo 2 hasta sellar módulo 1 y resolver la ruta fija/adaptativa.
- Cerrar módulo 2 cierra Listening y habilita Writing.

Los segundos exactos por pregunta y el evento preciso que inicia cada reloj deben
quedar adjudicados por familia en T14/T15. La ausencia de ese dato bloquea nivel C/D;
no autoriza un reparto uniforme inventado de 18/7/11 minutos.

### 7.4 Writing

- Los bloques son Build a Sentence → Email → Academic Discussion.
- La secuencia es lineal. Como decisión local conservadora, una tarea enviada o
  expirada queda cerrada; T17 debe contrastar cualquier navegación operacional más
  específica antes del piloto.
- Email usa 420 segundos y Discussion 600.
- El candidato de 360 segundos para Build es una inferencia aritmética local que
  requiere adjudicación; no se presenta como dato explícito de ETS.
- Cerrar Discussion cierra Writing y habilita Speaking.

### 7.5 Speaking

- No hay estado de preparación ni campo “notas de preparación” en C/D.
- Cada prompt se entrega, comienza la ventana de respuesta configurada y termina por
  submit o expiry.
- Repeat registra una única reproducción durable; Interview conserva cuatro capturas
  separadas.
- El valor exacto de cada ventana es un release blocker hasta T18/T19.
- Cerrar la respuesta 11 cierra Speaking y lleva el intento a `submitting`.

### 7.6 Cierre y review

- `submitting` materializa un outcome T09 para cada unidad de la composición.
- Sólo al reconciliar composición, transiciones y outcomes se llega a `closed`.
- `review` consume el snapshot cerrado y no acepta respuestas ni mutaciones.
- Reintentar crea un `attempt_id` nuevo; nunca reabre el anterior.

## 8. Contrato de ruta

| Campo | Nivel C | Nivel D |
|---|---|---|
| `adaptivity` | `fixed_modules` | `multistage` |
| `route_state` al inicio | `predetermined` | `pending` para R/L |
| Fuente de módulo 2 | Composición versionada | Decisión T24 sobre snapshot módulo 1 |
| Uso del desempeño | Ninguno | Obligatorio según política validada |
| Mutabilidad | Inmutable | Se selecciona una vez y queda inmutable |
| Error | Bloquea inicio si falta | Bloquea transición; nunca usa ruta por defecto |
| Disclosure | “Ruta fija no adaptativa” | “Adaptativo WeLearn”; nunca “adaptativo ETS” |

El identificador debe distinguir forma y rutas, por ejemplo
`fixed:<composition_version>:R-<route>:L-<route>` para C. En D se añaden
`routing_policy_version`, `decision_id`, hash del snapshot y motivo auditable. T10 no
define cortes de puntuación ni bancos lower/upper; hacerlo antes de T24 fingiría
calibración.

## 9. Excepciones y política de recuperación

| Excepción | Política obligatoria | Resultado prohibido |
|---|---|---|
| Doble click/retry de red | `idempotency_key` por transición; devolver la transición ya aceptada. | Dos cierres, dos rutas o dos respuestas. |
| Recarga/reconexión | Recuperar snapshot, secuencia, deadline y frontera cerrada; el reloj C/D continúa. | Reiniciar tiempo, reabrir módulo o perder respuestas. |
| Pestaña oculta/device sleep | Recalcular desde deadline durable al volver. | Confiar en ticks perdidos del navegador. |
| Varias pestañas | Una lease de escritura; las demás quedan bloqueadas o sólo lectura. | Dos escritores y rutas divergentes. |
| Reloj local alterado | Ignorar hora del dispositivo para adjudicar deadline. | Ganar/perder tiempo por cambiar el sistema. |
| Autosave en el deadline | Ordenar por sello autorizado; conservar última versión recibida a tiempo. | Convertir una carrera en cero silencioso. |
| Respuesta tardía | Rechazar como mutación evaluativa y registrar evento tardío. | Sobrescribir la respuesta sellada. |
| Navegación Back/browser history | Restaurar la posición canónica; mostrar bloqueo accesible. | Reabrir sección, módulo o pregunta forward-only. |
| Cerrar navegador/abandono | C/D siguen corriendo; al vencer se cierran o quedan abandonados según política T11. | Pausa implícita o intento nuevo con mismo ID. |
| Configuración/versión inválida | Fallar antes de empezar o invalidar con evidencia si cambió durante el intento. | Usar defaults no versionados. |
| Falla de enrutamiento | Mantener módulo 2 bloqueado, registrar `route_state=failed` y escalar. | Elegir lower/upper al azar o fijo oculto. |
| Contenido retirado durante intento | El snapshot del intento no muta; si no puede evaluarse, `invalidated`. | Cambiar pregunta/clave en vivo. |
| Audio no carga o se corta | Registrar incidente; usar `technical_hold_audited` sólo con política aprobada, o `technical_failure`. | Contarlo como error académico o habilitar replays ilimitados ocultos. |
| Permiso/micrófono/captura falla | Diagnóstico antes de Speaking; durante respuesta, preservar incidente y outcome técnico. | Marcar silencio del sistema como bajo desempeño. |
| Red caída | Cache local puede ayudar, pero T11 debe reconciliar; el reloj C/D no se extiende por defecto. | Afirmar que se guardó sin acuse durable. |
| Acomodación | Perfil versionado antes de inicio; budgets derivados y disclosure privado apropiado. | Extensión manual silenciosa o label de menor fidelidad. |
| Incidente técnico administrado | Pausa sólo el clock afectado, con inicio/fin, actor, razón y reconciliación. | Botón de pausa de usuario en C/D. |
| Valor temporal no verificado | Bloquear el claim/piloto C/D de la familia afectada. | Inventar segundos para completar el total. |
| Expiry durante submit final | `submitting` idempotente usa respuestas selladas y produce outcomes una vez. | Reporte parcial sin declarar incompletitud. |

T11 debe decidir retención, autorización y privacidad de estos eventos. Este contrato
exige que existan donde son necesarios, no que se guarden indefinidamente.

## 10. Eventos que T11 debe poder recuperar

Como mínimo:

- inicio de intento y versiones fijadas;
- inicio/fin de directions;
- activación/cierre de cada sección y módulo;
- `presented`, respuesta y cierre por `item_id`;
- inicio, deadline, expiry y suspensión técnica de cada reloj;
- reproducción consumida cuando la regla es una sola vez;
- snapshot, política y resultado de cada decisión de ruta;
- transición secuencial con `idempotency_key`;
- writer lease y conflictos de varias pestañas;
- fallos técnicos, permiso denegado y respuesta tardía;
- abandono, submit, reconciliación y cierre.

Una implementación puede compactar eventos, pero debe reconstruir sin ambigüedad el
estado canónico y demostrar que un cierre irreversible no se revirtió.

## 11. Disclosures y claims por nivel

| Situación | Disclosure obligatorio |
|---|---|
| B con 86 minutos y tabs libres | `DS-000`, `DS-B-001`, `DS-B-002` y demás T02 aplicables. |
| C | Nivel C, forma/ruta fija, no adaptativa, tiempos y composición versionados, score WeLearn. |
| D | Nivel D, adaptatividad WeLearn, ruta tomada/política versionada, score WeLearn. |
| Reloj local o flexible | Duración y reglas reales; no compararlo como tiempo oficial. |
| Acomodación | Explicar el funcionamiento al estudiante sin divulgar información sensible en reportes compartidos. |
| Fallo o intento incompleto | Separar unidades no presentadas, sin respuesta y fallos técnicos. |

Prohibidos: “reloj oficial”, “misma ruta que ETS”, “adaptativo ETS”, “condiciones
reales” o “simulacro completo” mientras no pase el gate correspondiente de T02/T23/T25.

## 12. Invariantes comprobables para implementación futura

1. C/D nunca activa una sección fuera de R→L→W→S.
2. C/D siempre tiene dos módulos en Reading y Listening.
3. Módulo 2 no empieza hasta cerrar módulo 1 y sellar/seleccionar una ruta.
4. No existe transición de módulo 2 a módulo 1.
5. Reading admite Back sólo dentro del módulo activo.
6. Listening no expone Back y Next sella el ítem actual.
7. Un replay o remontaje no restablece una reproducción ya consumida.
8. Email muestra 420 segundos; Discussion 600.
9. Speaking tiene 0 segundos de preparación y una captura/reloj por respuesta.
10. Un refresh conserva posición, respuestas aceptadas, ruta y deadline.
11. Dos pestañas no pueden escribir simultáneamente.
12. Expiry y submit son idempotentes y producen exactamente un cierre.
13. Unidades nunca mostradas quedan `not_presented`, no incorrectas.
14. Un fallo técnico no entra al denominador como error académico.
15. El total por ruta reconcilia con sus clocks y versión.
16. Un valor `unverified_blocker` impide validar C/D.
17. El review es inmutable y conserva la ruta/configuración del intento.
18. B no hereda claims C/D por tener las doce familias o `format: toefl-2026`.
19. C/D no ofrece descanso ni pausa de usuario entre secciones; las directions
    excluidas del tiempo base no funcionan como pausa programada.

## 13. Asserts E2E que heredan T12–T25

- rótulo, modo, ruta fija/adaptativa y disclosures correctos al entrar;
- directions sin consumo de reloj base;
- Reading Next/Back dentro del módulo y bloqueo tras avanzar de etapa;
- Listening forward-only, cierre al avanzar y recuperación tras recarga;
- Email 7:00, Discussion 10:00 y expiry idempotente;
- Speaking sin prep, captura y reloj por cada respuesta;
- refresh, pestaña secundaria, background y deadline reconciliados;
- ruta fija no depende de respuestas; ruta adaptativa sí depende de snapshot T24;
- errores de audio/micrófono separados del desempeño;
- intento incompleto y `not_presented` reconciliados en reporte;
- teclado, lector de pantalla, móvil, alertas de tiempo y foco tras transición;
- consola, requests, hidratación y capturas en cada frontera irreversible.

Playwright no se ejecuta para aprobar este documento porque el runtime no cambió.
Cada piloto debe ejecutar los asserts aplicables contra un servidor controlado; una
prueba que sólo carga la página no valida T10.

## 14. Auditorías de T10

1. **Full-stack/datos/repositorio — pasa para contrato.** Se trazaron datos, cliente,
   timer, navegación, outcomes T09 y futura recuperación T11. Las huellas iniciales
   evitan confundir este documento con una implementación. No se tocó runtime.
2. **TOEFL vigente — pasa para contrato.** Orden, dos etapas, fronteras, Next/Back de
   Reading, forward-only de Listening, 7/10 minutos y Speaking sin preparación
   derivan de S1–S4. Los segundos no publicados quedan bloqueados.
3. **Editorial/pedagógica — pasa.** Modo de aprendizaje, práctica y examen no mezclan
   ayudas ni restricciones; instrucciones no se convierten en preparación oculta.
4. **Audio — no aplica a aprobar activos.** Ningún MP3, transcripción o manifiesto se
   modificó. La reproducción única y el fallo técnico sólo se modelan como estado;
   T08 continúa diferida para el final de la fase no-audio.
5. **Multiperspectiva/anti-sesgo/derechos — pasa para contrato.** Acomodaciones y
   fallos no se convierten en desempeño; los claims respetan marca/no afiliación y no
   se amplían derechos de reproducción.
6. **UI/UX/accesibilidad — pasa como requisitos, no para el runner actual.** Se fijan
   foco, anuncios, teclado, redundancia al color, recuperación, permisos y alertas.
   El runner actual sigue bloqueado hasta implementación y E2E.
7. **Playwright — no aplica.** No hubo cambio de UI/runtime. Los 19 invariantes y
   asserts de la sección 13 son el contrato de prueba de T12–T25.

## 15. Gate y decisiones de salida

El gate de T10 queda satisfecho documentalmente porque:

- existe una máquina de estados jerárquica con transición tabular;
- están definidas las fronteras irreversibles de secciones, módulos, ítems y tareas;
- los cinco modos tienen permisos y claims distintos;
- cada reloj tiene alcance, autoridad, inicio, fin y expiry;
- rutas fijas y adaptativas no se confunden;
- excepciones de tiempo, red, pestañas, medios, permisos y accesibilidad fallan de
  forma interpretable;
- los valores oficiales, locales, inferidos y todavía no verificados están separados.

T10 no valida el runner. Los 20 sets continúan B con blockers; T11 recibe los eventos
y requisitos de persistencia/privacidad; T17 adjudica el reloj de Build; T18/T19
adjudican relojes por respuesta; T24 define la política adaptativa. Ninguna de esas
dependencias reabre la state machine salvo que cambie una regla oficial o se descubra
una transición imposible.
