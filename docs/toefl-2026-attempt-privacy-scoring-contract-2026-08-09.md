# TOEFL iBT 2026 — contrato de intentos, privacidad y scoring

> `contract_id`: `toefl-2026-attempt-privacy-scoring`
>
> `contract_version`: `2026-08-09.v1`
>
> `retention_policy_version`: `toefl-retention@2026-08-09.v1`
>
> `scoring_policy_version`: `toefl-local-scoring@2026-08-09.v1`
>
> `official_registry`: `toefl-ibt-2026@2026-08-09.v2`
>
> `fidelity_policy`: `toefl-fidelity-disclosure@2026-08-09.v1`
>
> `data_contract`: `toefl-data-render-scoring@2026-08-09.v1`
>
> `time_navigation_contract`: `toefl-2026-time-modules-navigation@2026-08-09.v1`
>
> `verified_at`: 9 de agosto de 2026
>
> `review_by`: 9 de septiembre de 2026, o antes de cualquier piloto/release TOEFL
>
> `status`: contrato normativo de T11; no implementado en el producto actual

Este documento materializa T11 de `docs/toefl-2026-alignment-loop.md`. Aprueba el
contrato lógico de persistencia, consentimiento, acceso, borrado, retención y scoring
para los modos TOEFL de WeLearn. No cambia código, base de datos, audio ni contenido.

La aprobación de este contrato **no equivale a aprobación jurídica ni a autorización
de piloto**. Antes de tratar datos de estudiantes reales, WeLearn debe identificar al
Responsable del Tratamiento, publicar su política y aviso de privacidad, habilitar los
canales de derechos, aprobar encargados/subencargados y obtener revisión jurídica
colombiana. Hasta entonces, las prácticas pueden funcionar sin persistencia de
respuestas en servidor y con resultados locales acotados.

## 1. Autoridad, fuentes y límites

### 1.1 Fuentes oficiales TOEFL

| ID | Fuente ETS | Regla que gobierna T11 |
|---|---|---|
| ETS-S1 | [Understanding TOEFL Scores](https://www.ets.org/toefl/test-takers/ibt/scores/understand-scores.html) | Desde el 21-01-2026 ETS reporta cuatro secciones y total en escala 1–6, en pasos de 0,5; el total es el promedio de secciones redondeado al medio punto. Durante dos años añade una estimación global comparable 0–120. |
| ETS-S2 | [TOEFL iBT Test Content](https://www.ets.org/toefl/test-takers/ibt/about/content.html) | Reading y Listening son adaptativos; los conteos/times pueden variar. Writing y Speaking son respuestas construidas. |
| ETS-S3 | [TOEFL iBT Test Specifications 2026](https://www.ets.org/content/dam/ets-india/pdfs/toefl/toefl-ibt-test-specifications-2026.pdf) | Blueprint, dos etapas R/L, máximos raw 35/35/20/55 y distinción entre machine-scored y AI-scored. |
| ETS-S4 | [TOEFL iBT Information Bulletin 2025–2026](https://www.ets.org/content/dam/ets-org/pdfs/toefl/toefl-ibt-bulletin.pdf) | ETS no emite score si no se responde al menos una pregunta en R/L y una tarea en S/W; los scores oficiales siguen controles propios de ETS. |
| ETS-S5 | [Test Content and Structure — institutions](https://www.ets.org/content/ets-org/language-master/in/home/toefl/institutions/ibt/about/content-structure.html) | ETS combina AI y raters certificados para Speaking/Writing; eso no autoriza a WeLearn a imitar el resultado con autoevaluación. |

### 1.2 Fuentes oficiales colombianas de privacidad

| ID | Fuente oficial | Regla que gobierna T11 |
|---|---|---|
| COL-P1 | [Ley 1581 de 2012](https://www1.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=49981) | Finalidad informada, libertad/consentimiento previo, expreso e informado, acceso restringido, seguridad y confidencialidad; derechos del titular; prueba consultable de la autorización. |
| COL-P2 | [Decreto 1377 de 2013](https://www1.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=53646), compilado en el Decreto 1074 de 2015 | Sólo conservar durante un tiempo razonable y necesario para la finalidad; cumplida la finalidad, suprimir salvo obligación legal o contractual. |
| COL-P3 | [SIC — políticas de tratamiento](https://sedeelectronica.sic.gov.co/publicaciones/boletin-juridico/concepto/politicas-de-tratamiento-de-datos-personales) | La política debe estar disponible; el aviso identifica el tratamiento, finalidad y cómo consultar la política. |
| COL-P4 | [SIC — política externa y manual interno](https://sedeelectronica.sic.gov.co/publicaciones/boletin-juridico/concepto/diferencia-entre-politica-de-tratamiento-de-datos-y-manuales-internos-de-tratamiento-de-datos) | La política informa al titular; el manual interno documenta seguridad, accesos, conservación y eliminación. |
| COL-P5 | [SIC — marketing y supresión](https://sedeelectronica.sic.gov.co/publicaciones/boletin-juridico/concepto/derecho-la-tranquilidad-y-supresion-de-datos-personales) | Marketing exige autorización demostrable y debe detenerse/suprimirse cuando lo solicite el titular. |

T11 traduce estas fuentes a controles de producto. No determina por sí solo todas las
obligaciones legales, tributarias, contractuales o transfronterizas aplicables a la
entidad operadora de WeLearn.

### 1.3 Fuera de alcance

- calidad, transcripción, escucha humana, reparación o generación de audio: T08 y
  T14–T22; permanecen diferidos por decisión del owner;
- implementación física, migraciones, UI, API, RLS, bucket o proveedor de IA;
- validación psicométrica, calibración o equivalencia con ETS: T24/T26/T27;
- política corporativa general de privacidad para productos distintos de TOEFL;
- consejo jurídico o certificación de cumplimiento.

T11 sí define cómo deberá tratarse una futura respuesta oral, pero no abre, escucha,
transcribe, modifica ni genera ningún audio.

## 2. Línea base observada y diagnóstico

| Área | Estado actual | Riesgo/efecto |
|---|---|---|
| Inicio del guardado | `ExamReport` llama `saveExamResult` automáticamente al montar el resultado. | No hay decisión explícita de guardar ni recibo de autorización; un remontaje puede duplicar filas. |
| Confirmación | El error de guardado se ignora y el usuario no recibe acuse. | La pantalla puede sugerir resultado persistido aunque el servidor haya fallado. |
| Identidad | `exam_submissions` duplica `user_email` y `user_name`; permite `user_id = NULL`. | Se mezcla contenido evaluativo con PII y se crean registros anónimos sin token de titular. |
| Intento | No hay `attempt_id`, idempotency key, composición, ruta, modo, nivel de fidelidad ni clocks. | No se puede reconstruir qué vio el usuario ni conciliar T09/T10. |
| Respuestas/outcomes | TOEFL guarda sólo agregados; no IDs de ítem, respuestas ni outcomes. | Visible ≠ calificable ≠ reportable; no se distingue pendiente, fallo técnico o no presentado. |
| Scoring | El cliente genera escala 1–6 y aproximación `/120` lineales y mezcla respuestas objetivas con autoevaluación de W/S. | Claim parecido a score oficial sin método validado; una práctica corta parece predecir el examen completo. |
| Rounding | `clampScore` usa `Math.round`. | Destruye medios puntos y altera resultados recibidos. |
| Mensajes | El reporte afirma, por ejemplo, preparación para admisión universitaria según el total local. | ETS no fija aprobados y cada institución define requisitos; el claim no está sustentado. |
| Lectura SQL | La policy llamada `Admins read all` usa `USING (true)` y no restringe rol. | Su nombre no aplica seguridad. Si existen grants de lectura, podría exponer todas las filas; estado productivo no verificado. |
| Borrado | Borrar el usuario aplica `ON DELETE SET NULL`; quedan email/nombre y submission. | El borrado de cuenta no elimina ni desidentifica el resultado. |
| Derechos | Perfil sólo remite a WhatsApp; no hay exportación ni borrado verificable en producto. | No hay caso, estado, SLA ni trazabilidad de consultas/reclamos. |
| Leads | Nombre, WhatsApp, email, score y UTM se capturan sin consentimiento separado visible. | La finalidad comercial se mezcla con el examen y con analítica de marketing. |
| Texto/rating | Migraciones IELTS guardan textos/respuestas y email del revisor sin política de retención. | El patrón no debe heredarse a TOEFL. |
| Audio existente | La ruta de `practica` usa bucket público, acepta envío anónimo y pone el username en la ruta. | Patrón expresamente prohibido para futuras respuestas TOEFL. No se inspeccionó el contenido de ningún audio. |
| Registro | No se encontró una página pública de política/aviso en las rutas auditadas. | Bloquea un piloto real con persistencia hasta publicación y aprobación. |

La policy SQL se clasifica `critical_unverified`, no “brecha explotada”: la auditoría
no consultó producción, grants efectivos, usuarios ni datos. Debe corregirse y
probarse antes de habilitar persistencia TOEFL.

### 2.1 Huellas del punto auditado

| Ruta | SHA-256 inicial |
|---|---|
| `src/lib/actions/saveExamResult.ts` | `5289db02219add3c784d2af621a31bdc0825cd7bcf48d997ddb68c90df867f4d` |
| `src/components/ExamReport.tsx` | `a100dc8d563fddfcd46dd2842485021c3bc427d06ef69f2162d77a25ef7701c1` |
| `supabase/migrations/20260518000000_exam_submissions.sql` | `99fe8d428562a23d648302c39bc2816a42a3998a5ea04fc561215f7f66ccbc4f` |
| `supabase/migrations/20260522_ielts_review_columns.sql` | `dfce0fb8ffbbb18e662c65f7357667722a66ede755d81529769eff4a1a3f654a` |
| `src/lib/actions/scoreSubmission.ts` | `29790b218e622d5feaba7395614f92f2ca267ffe0acb0341117dc272880704c2` |
| `src/components/LeadCaptureModal.tsx` | `d8b3d05b0f45ee908590d6fcc309862d6308381928806f866e90db02c82a5732` |
| `src/lib/actions/saveLead.ts` | `cceb007c8c18d7fd5d89d7691264b6bb387207a54ff83e6c7f42b4b9b2313796` |
| `supabase/migrations/20260528000000_leads.sql` | `9bc31215b2a8421b0c693954edb66a3d2fb61e57901dce02a16e1d0d9b9be046` |
| `src/app/api/practica/submit-audio/route.ts` | `efd8c141938d3a3e48d22e60266313f60e027d5d8acb059d3637449fc2b3deae` |
| `supabase/migrations/20260525000000_cycle_submissions.sql` | `e8497b8a95230a84de5c7bb5ac941c78bd761f44ae65d9006c7dcc0946a30b28` |
| `PerfilClient.tsx` | `6823e3e01d0b21ebf8cfde39a50793d25bc8939fb3ba39e264b90c33418d6c70` |
| `AuthForm.tsx` | `347a86e404dc676d7eaa7617401c0d3180c020605b8bed1c949a8d387eba4252` |

## 3. Principios invariantes

### APS-001 — Local primero; servidor sólo con aviso y acción inequívoca

Completar o ver resultados no depende de guardar en servidor. Un intento no
autenticado permanece en memoria/dispositivo por defecto. Persistir exige aviso
previo, acción inequívoca y recibo consultable; nunca ocurre por montar un componente.

### APS-002 — Un intento es una evidencia versionada

Antes de empezar se congelan `attempt_id`, modo, fidelidad, composición, registro
oficial, política, ruta, tiempos, scoring y disclosures. El resultado siempre puede
reconstruir qué versión produjo cada outcome.

### APS-003 — Datos mínimos y separados por finalidad

Perfil/PII, intento académico, respuesta construida, telemetría técnica y lead
comercial son dominios separados. Email, teléfono, nombre y UTM no se copian al
intento. Un join exige finalidad y permiso explícitos.

### APS-004 — Estado, no ausencia ambigua

Cada posición usa exactamente un outcome T09: `not_presented`, `unanswered`,
`pending_evaluation`, `scored`, `technical_failure`, `invalidated` o
`not_evaluated`. `NULL`, `0` o campo faltante no sustituyen el estado.

### APS-005 — Escritura idempotente y cierre inmutable

Toda mutación incluye `attempt_id`, secuencia esperada e idempotency key. Un cierre
repetido devuelve el mismo resultado. Recalificar crea un nuevo `score_run`; no
sobrescribe la evidencia anterior.

### APS-006 — Menor privilegio y ninguna lectura pública

El propietario ve/exporta/suprime lo permitido; un rater sólo recibe casos asignados;
operaciones administrativas están justificadas y auditadas. No hay `USING (true)`,
bucket público ni URL permanente para respuesta construida.

### APS-007 — Retención por clase, no “para siempre”

Cada registro nace con `retention_class`, `delete_after` y policy version. Un job
verificable elimina primario, derivados, objetos huérfanos y copias al vencer. Una
retención legal excepcional requiere `legal_hold_id`, motivo, alcance y vencimiento.

### APS-008 — Score local no es score ETS

WeLearn no emite resultados oficiales. La escala 1–6, el comparable 0–120, CEFR y
claims de admisión no se calculan con porcentajes lineales. Sólo pueden aparecer como
estimación WeLearn después de validación documentada y siempre fuera de la marca ETS.

### APS-009 — Lo pendiente o incompleto no se inventa

Sin evaluación válida de las cuatro habilidades no hay total. Autoevaluación,
respuesta faltante, fallo técnico o tarea no presentada nunca se convierten en
correctas/incorrectas ni rellenan un score.

### APS-010 — No entrenamiento ni identificación biométrica por defecto

Respuestas, voz, transcripciones y ratings no se reutilizan para entrenar modelos,
crear voiceprints, reconocer identidad, inferir emociones ni publicidad. Cualquier
investigación futura exige finalidad, revisión, autorización separada y dataset
desidentificado.

### APS-011 — Derechos operables

El titular puede conocer, acceder, exportar, corregir, revocar autorizaciones
opcionales y solicitar supresión mediante un canal autenticado y uno alterno. Cada
caso tiene recibo, estado, responsable, plazo y resolución.

### APS-012 — Menores fallan cerrado

El primer piloto persistente se limita a mayores de 18 años. Menores no guardan texto
o voz hasta que exista flujo jurídicamente revisado de representante, interés
superior, lenguaje apropiado, revocación y derechos. No se infiere edad del desempeño.

## 4. Modelo lógico mínimo

| Entidad | Propósito | Campos normativos mínimos |
|---|---|---|
| `exam_attempt` | Cabecera y estado canónico. | `attempt_id`, `subject_id` nullable, `status`, `mode`, `fidelity_level`, `validation_status`, versiones T01/T02/T09/T10, `composition_version`, `route_id`, counts/timing, `started_at`, `closed_at`, `retention_class`, `delete_after`. |
| `attempt_event` | Secuencia T10 y recuperación. | `event_id`, `attempt_id`, `transition_id`, `seq`, `idempotency_key`, `from/to`, actor, tiempos autorizados, reason code; nunca answer payload/PII. |
| `item_response` | Respuesta versionada. | `response_id`, `attempt_id`, `item_id`, `response_version`, tipo, valor o asset ref, `presented_at`, `submitted_at`, `sealed_at`, hash. |
| `item_outcome` | Estado T09. | `attempt_id`, `item_id`, outcome, `score_run_id` nullable, razón y timestamps. |
| `constructed_asset` | Texto/voz/derivado separado. | asset UUID opaco, tipo, bucket privado, checksum, provider/provenance, owner, `delete_after`; jamás PII en object key. |
| `route_decision` | Ruta fija/adaptativa. | stage, input snapshot hash, policy version, decision/result, created_at; immutable. |
| `score_run` | Ejecución de scoring. | `score_run_id`, attempt snapshot hash, scorer/rubric/model/prompt versions, status, coverage, uncertainty, supersedes, timestamps. |
| `score_component` | Numerador/denominador y rúbrica. | skill/task/item, raw earned/max, outcome, evaluator type, rater pseudonymous ID, feedback provenance. |
| `disclosure_receipt` | Qué texto vio el usuario. | disclosure ID/version/language/surface, shown_at, acknowledgement if required, text hash. |
| `authorization_receipt` | Prueba de autorización por finalidad. | purpose ID, notice/policy version, choice, actor/guardian status, timestamp, revocation status; sin copiar la respuesta. |
| `privacy_request` | Consulta/reclamo/supresión. | case ID, subject proof ref, type, received/due/resolved, status, scope, resolution; payload sensible separado. |
| `access_audit` | Acceso privilegiado. | actor pseudonymous ID, role, resource class/ID, purpose/reason, timestamp, decision; no respuesta en log. |

Restricciones obligatorias:

- UUID opacos; unicidad de `attempt_id + item_id + response_version` y de
  `attempt_id + idempotency_key`;
- claves foráneas con cascada o job de borrado explícito; nunca `SET NULL` que deje
  PII duplicada;
- RLS con `TO` y predicados comprobables; pruebas negativas anon/usuario A/usuario B/
  rater/no asignado/admin;
- service role sólo del lado servidor y jamás como sustituto de autorización;
- storage privado con URL firmada corta y revocable; limpieza de uploads huérfanos;
- logs, analytics y errores no incluyen prompt, respuesta, teléfono, email ni URL
  firmada;
- cualquier proveedor externo registra encargado, región, subencargados, categorías,
  retención y prohibición de entrenamiento antes de recibir datos.

## 5. Contrato de persistencia por modo

| Modo/nivel | Estado por defecto | Servidor | Resultado permitido |
|---|---|---|---|
| `learn` A | Efímero local. | Sólo progreso opcional, tras aviso/acción. | Feedback por actividad; sin score TOEFL. |
| `practice` A/B anónimo | Efímero local; se borra al cerrar/resetear. | No se crea submission automáticamente. | Conteos raw y porcentaje local por tareas `scored`; incompletitud visible. |
| `practice` A/B autenticado | Igual hasta seleccionar “Guardar mi progreso”. | Guarda snapshot mínimo e idempotente. | Igual; historial local WeLearn. |
| `exam_fixed` C | Preflight, autorización y versiones obligatorias. | Intento durable y recuperable. | Estimación WeLearn sólo si el método está validado para esa composición. |
| `exam_adaptive` D | Igual, con ruta/política/calibración. | Eventos/ruta/outcomes durables. | Estimación WeLearn con cobertura, versión e incertidumbre; nunca oficial. |
| `review` | Sólo lectura de un snapshot cerrado. | No reabre ni sobrescribe. | Muestra score run seleccionado y cualquier revisión posterior por versión. |

Abandonar antes de autorizar guardado descarta el contenido local. Si la autorización
se revoca durante un intento durable, se deja de recolectar lo opcional y se ofrece
terminar sin guardar o iniciar borrado; el producto no promete retroactividad cuando
exista una obligación documentada, pero debe explicar la excepción.

## 6. Retención aprobada v1

Los plazos son máximos operativos propios de WeLearn, contados desde el evento
indicado. No se presentan como plazos impuestos por ETS o como dictamen legal. El
usuario puede pedir supresión antes; una excepción sólo procede si está documentada.

| Clase | Máximo | Inicio | Al vencer |
|---|---:|---|---|
| `R00_EPHEMERAL` | Sesión activa | Inicio local | Borrar al cerrar/resetear; ningún backup. |
| `R01_ATTEMPT_CORE` | 24 meses | Cierre/abandono | Borrar cabecera identificable, versiones, ruta, outcomes y scores. |
| `R02_SELECTED_RESPONSE` | 12 meses | Cierre | Borrar valor/hash de respuesta; conservar sólo agregado irreversiblemente anónimo si cumple regla. |
| `R03_WRITING_TEXT` | 180 días | Cierre o feedback | Borrar texto, revisiones y copias de proveedor. |
| `R04_VOICE_SOURCE` | 30 días tras feedback, hard max 90 días desde captura | Captura | Borrar objeto y URLs; verificar derivados/huérfanos. |
| `R05_VOICE_DERIVED` | 90 días | Captura | Borrar transcripción/features; voiceprints prohibidos desde origen. |
| `R06_EVENT_ROUTE_TIMING` | 24 meses | Cierre | Borrar eventos identificables; conservar métricas sólo desidentificadas. |
| `R07_SCORE_RATER_AUDIT` | 24 meses | Cierre del score run | Borrar componentes/rater link; no conserva texto/audio. |
| `R08_DISCLOSURE_AUTH_PROOF` | 36 meses | Fin del último tratamiento relacionado | Borrar recibo; conservar sólo evidencia adicional si una obligación revisada lo exige. |
| `R09_TECH_LOG` | 30 días | Evento | Borrar/rotar. |
| `R10_SECURITY_ACCESS_LOG` | 90 días técnica; 24 meses para acceso privilegiado | Evento | Borrar/rotar; legal hold explícito si hay incidente. |
| `R11_WRITER_LEASE` | 7 días | Cierre | Borrar lease/idempotency residue no necesario. |
| `R12_PRIVACY_CASE` | 36 meses | Resolución | Borrar payload; conservar mínimo auditado sólo si está justificado. |
| `R13_MARKETING_LEAD` | 12 meses | Última interacción significativa | Suprimir al vencer o al retirar autorización; separado del intento. |
| `R14_ACCOMMODATION_DETAIL` | 30 días | Cierre | Borrar detalle; conservar sólo flag/version no sensible con el intento. |
| `R15_ORPHAN_UPLOAD` | 24 horas | Upload fallido/no vinculado | Borrar automáticamente. |
| `R16_BACKUP` | 30 días | Borrado primario | Expirar sin restaurar el dato eliminado al entorno activo. |
| `R17_DEIDENTIFIED_ANALYTICS` | Indefinido condicionado | Desidentificación aprobada | Revalidar anualmente; si es reversible o celda <10, aplica R01, no R17. |

Reglas de ejecución:

1. `delete_after` se calcula al crear/cerrar y se recalcula de forma auditada, nunca
   se deja `NULL` por omisión.
2. Un job diario produce conteos: elegibles, borrados, fallidos, huérfanos y edad del
   registro más vencido. Fallo >24 h bloquea nuevos pilotos persistentes.
3. La supresión del usuario inicia cascada en primario en 24 h y deja backups expirar
   en máximo 30 días; la UI explica ese desfase.
4. Pseudonimizar no vuelve anónimo. Sólo R17 admite conservación indefinida tras una
   prueba documentada de irreversibilidad, ausencia de claves y celdas mínimas de 10.
5. Proveedores no reciben un plazo mayor. Si no permiten borrado/exportación o usan
   datos para entrenar, no son elegibles para respuestas TOEFL.

## 7. Autorización, aviso y derechos

### 7.1 Finalidades separadas

| Purpose ID | Finalidad | Obligatoria para |
|---|---|---|
| `PURPOSE_LOCAL_RUN` | Ejecutar práctica en dispositivo. | Usar la práctica; no implica servidor. |
| `PURPOSE_SAVE_PROGRESS` | Guardar/reanudar intento y mostrar historial. | Persistencia académica opcional. |
| `PURPOSE_CONSTRUCTED_EVAL` | Evaluar texto o voz y entregar feedback. | Enviar respuestas construidas. |
| `PURPOSE_PRODUCT_ANALYTICS` | Mejorar estabilidad/flujo con telemetría mínima. | Sólo analítica autorizada/configurada; sin respuestas. |
| `PURPOSE_RESEARCH` | Validación/calibración con dataset aprobado. | Opt-in separado; no preseleccionado. |
| `PURPOSE_MARKETING` | Contacto comercial por canal elegido. | Opt-in separado; nunca requisito para resultados. |

Aceptar `PURPOSE_SAVE_PROGRESS` no acepta marketing, investigación, entrenamiento de
IA ni publicación. Negarse a marketing no reduce score, feedback ni acceso al
resultado.

### 7.2 Flujo mínimo

1. Antes de recolección: identificar Responsable, contacto, categorías, finalidad,
   obligatoriedad, destinatarios/proveedores, transferencias, plazo, derechos y enlace
   a la política en castellano claro.
2. Mostrar modo/nivel y disclosure T02 antes de iniciar.
3. Pedir cada autorización opcional con control no preseleccionado y registrar su
   versión/hash/idioma/hora. No agrupar progreso + marketing.
4. Antes de texto/voz: aviso contextual y posibilidad real de no enviar.
5. Tras guardar: acuse con `attempt_id`, estado, fecha de borrado, exportar y borrar.
6. Cambiar materialmente una finalidad exige nuevo aviso/autorización; no se infiere
   del uso previo.

### 7.3 Derechos y operación

- consulta/acceso/exportación: objetivo máximo 10 días hábiles; si se extiende,
  informar motivo y nueva fecha hasta 5 días hábiles adicionales;
- corrección, revocación o supresión mediante reclamo: objetivo máximo 15 días
  hábiles; extensión motivada hasta 8 días hábiles adicionales;
- marcar `claim_in_progress` dentro de dos días hábiles cuando aplique;
- exportar JSON/CSV legible con intentos, versiones, respuestas vigentes, outcomes,
  score runs, autorizaciones y accesos privilegiados asociados;
- corregir perfil/PII; una respuesta histórica sellada no se edita: se anota la
  disputa, se invalida o se crea nueva versión/revisión;
- revocar marketing detiene contacto de inmediato y borra el lead según el flujo;
- verificación de identidad proporcional: no pedir documentos adicionales si la
  sesión autenticada y un desafío bastan.

La política pública debe nombrar el canal real. “Escríbenos por WhatsApp” puede ser
alternativa, no el único mecanismo ni el registro operativo del caso.

## 8. Política de scoring local

### 8.1 Lo permitido por nivel

| Nivel | Puede mostrar | No puede mostrar |
|---|---|---|
| A/B | Correctas/posibles por tarea y sección; porcentaje local sobre outcomes `scored`; feedback formativo; estado de W/S. | Band 1–6, `/120`, CEFR, “score oficial”, predicción de admisión o total con autoevaluación. |
| C | Lo anterior y una **estimación diagnóstica WeLearn** si la forma fija, rúbrica y conversión fueron validadas para la población declarada. | Marca/score ETS, equivalencia exacta, score sin cuatro secciones válidas o sin intervalo/cobertura. |
| D | Estimación WeLearn versionada con ruta, calibración, cobertura e incertidumbre. | Claim adaptativo si la ruta no fue tomada por política T24 o ítems expuestos influyen sin control. |

El estado actual es B. Hasta validación, el contrato exige retirar/no producir el
band 1–6 lineal, el aproximado `/120` y los mensajes de “ready for admission”.

### 8.2 Denominadores y completitud

- Sólo `scored` entra en numerador y denominador objetivo.
- `unanswered` puede ser cero únicamente si la tarea fue presentada, era calificable,
  el tiempo/interacción fue válido y la política versionada así lo define.
- `not_presented`, `technical_failure`, `invalidated`, `pending_evaluation` y
  `not_evaluated` quedan fuera y se muestran por separado.
- Sin al menos una respuesta evaluable por sección no existe total; para una
  simulación, además deben cumplirse composición y cobertura del nivel declarado.
- Una práctica corta nunca predice el full test sin estudio específico. Muestra su
  alcance real: tareas/ítems presentados, evaluados y pendientes.

### 8.3 R/L, W/S y autoevaluación

- Reading/Listening actuales producen raw correctos y porcentaje local. No hay IRT,
  equating ni band oficial.
- Writing/Speaking usan rúbricas WeLearn publicadas y versionadas. Su salida se llama
  feedback/rating local, no score ETS.
- Una evaluación automática futura permanece `pending_evaluation` o
  `experimental` hasta demostrar validez, sesgo, estabilidad y acuerdo con humanos;
  registra provider/model/prompt/rubric versions sin guardar secretos.
- La autoevaluación sirve para reflexión pedagógica. Nunca aporta puntos, banda,
  total ni predicción.
- Rating humano usa identificador opaco, conflicto de interés, evidencia de rúbrica,
  y segunda revisión para casos de baja confianza/disputa. El email del rater no se
  copia al score.

### 8.4 Versionado, revisión y exposición

Un `score_run` es inmutable y contiene snapshot hash, scoring version, denominadores,
coverage, evaluator type y estados. Recalificar crea un run nuevo con `supersedes_id`;
el reporte muestra cuál está vigente y por qué cambió.

El intento registra exposiciones previas. Ítems vistos pueden servir para práctica,
pero no para claims predictivos sin una política pública que controle exposición. No
se mezclan score runs de composiciones, rutas o versiones incompatibles.

Los valores de medio punto se conservan como decimal; no se redondean al guardar.
El redondeo final sólo ocurre en el método validado y debe tener tests de frontera.

## 9. Disclosures canónicos aprobados

| ID | Momento | Texto canónico en español |
|---|---|---|
| `DS-APS-001` | Inicio A/B | **Práctica local de WeLearn.** Este contenido entrena tipos de tarea TOEFL iBT 2026, pero es abreviado, no adaptativo y no es un examen oficial de ETS. |
| `DS-APS-002` | Antes de guardar | **Guardar es opcional.** Si eliges guardar, conservaremos el estado y resultados de este intento durante un máximo de 24 meses. Las respuestas seleccionadas se eliminan antes, a los 12 meses. Puedes continuar y ver tu resultado sin aceptar marketing. |
| `DS-APS-003` | Resultado B | **Resultado local, no score TOEFL.** Las cifras muestran únicamente las tareas objetivas que WeLearn pudo calificar en esta práctica. No equivalen a la escala oficial 1–6 ni a 0–120 y no predicen admisión. |
| `DS-APS-004` | Incompleto | **Resultado incompleto.** Se presentan por separado las respuestas calificadas, pendientes, no evaluadas y afectadas por fallos técnicos. No calculamos un total cuando falta evaluación válida de alguna habilidad. |
| `DS-APS-005` | Texto | **Respuesta escrita.** Si la envías para feedback, guardaremos el texto hasta 180 días y luego lo eliminaremos. No se usará para entrenar modelos ni para marketing sin una autorización distinta. |
| `DS-APS-006` | Voz futura | **Grabación de voz.** Si la envías para feedback, se almacenará en privado y se eliminará 30 días después del feedback y, en todo caso, antes de 90 días desde la captura. No crearemos una huella de voz ni la usaremos para identificarte o entrenar modelos. |
| `DS-APS-007` | IA/proveedor futuro | **Evaluación asistida.** La respuesta podrá procesarse por el proveedor y versión indicados aquí para generar feedback de WeLearn. Verás qué datos recibe, dónde se procesan y cuándo se borran antes de decidir. Este resultado no es emitido por ETS. |
| `DS-APS-008` | Fallo técnico | **No fue un error académico.** Esta tarea no se calificó porque ocurrió un problema técnico. Queda fuera del denominador y puedes iniciar un intento nuevo. |
| `DS-APS-009` | Lead | **Contacto opcional.** Autorizo que WeLearn me contacte por el canal elegido para orientación comercial. Esta elección no afecta mi práctica ni mi resultado y puedo retirarla. |
| `DS-APS-010` | Guardado exitoso | **Intento guardado.** Identificador: `{attempt_id}`. Fecha máxima de conservación: `{delete_after}`. Puedes exportarlo o solicitar su eliminación desde `{rights_url}`. |

Los placeholders deben resolverse antes de mostrar. Si faltan responsable, proveedor,
plazo o URL de derechos, el control de consentimiento queda deshabilitado y no se
envía el dato.

## 10. Seguridad, proveedores y respuestas construidas

### 10.1 Reglas de acceso

| Actor | Puede | No puede |
|---|---|---|
| Titular autenticado | Leer/exportar/suprimir sus intentos; ver autorizaciones y score runs. | Leer otro subject, cambiar respuesta sellada o rating. |
| Anónimo | Trabajar localmente; usar token opaco sólo para la sesión. | Listar registros, acceder por URL pública o aportar PII al object key. |
| Rater asignado | Leer sólo respuesta necesaria, rúbrica y contexto mínimo durante la asignación. | Ver email/teléfono/marketing, descargar lote completo o conservar copia. |
| Soporte | Ver metadatos técnicos mínimos con ticket/razón. | Ver respuesta por defecto. |
| Admin privacidad | Tramitar caso y ejecutar/exportar/borrar con auditoría. | Acceso masivo sin propósito. |
| Servicio | Ejecutar mutación estrecha e idempotente. | Eludir RLS para una petición no autorizada. |

### 10.2 Gate de proveedor externo

Antes de usar ElevenLabs, Whisper, OpenAI u otro proveedor con una respuesta real se
documentan y aprueban: contrato/rol de encargado, datos exactos, región y transferencia,
subencargados, cifrado, retención/zero-retention, borrado, entrenamiento, incidentes,
acceso humano, modelo/versión, costo y fallback. La existencia de una API key no
constituye aprobación. Las claves nunca se copian al documento, repo, logs o cliente.

No se buscó ni utilizó la key de ElevenLabs. T11 no necesita una API para cerrarse.

### 10.3 Patrón obligatorio para voz futura

- preflight de micrófono antes del clock y autorización contextual;
- upload directo o mediado a bucket privado con key opaca;
- confirmación idempotente sólo después de checksum/metadata y vínculo al intento;
- si falla el vínculo, borrar el objeto en máximo 24 h;
- URL firmada de minutos, no pública/permanente;
- proveedor recibe sólo el asset y contexto mínimo, sin nombre/email/teléfono;
- borrado coordinado de fuente, transcripción, features, cache y proveedor;
- el fallo queda `technical_failure`, no cero académico.

El bucket/ruta pública de `practica/submit-audio` queda expresamente fuera de
elegibilidad para TOEFL.

## 11. Controles de aceptación para implementación futura

T11 documental está cerrado, pero un piloto persistente sigue bloqueado hasta pasar:

1. política y aviso públicos con Responsable, contacto y canal de derechos;
2. revisión jurídica de finalidades, autorizaciones, menores, proveedores y plazos;
3. migración versionada conforme al modelo, sin copiar PII a intentos;
4. RLS/storage tests negativos para anon, owner, otro usuario, rater y admin;
5. guardado explícito, acuse, idempotencia, recovery y reconciliación T09/T10;
6. export/delete end-to-end, cascada y backup expiry demostrados;
7. job de retención con dry-run, métricas, alertas y prueba de huérfanos;
8. reporte B sin 1–6, `/120`, CEFR, autoevaluación puntuada ni admisión;
9. score runs inmutables, versionados y con cobertura/estados;
10. lead comercial separado y no condicionado;
11. piloto limitado a 18+ hasta aprobar flujo de menores;
12. proveedor evaluado antes de texto/voz y ningún secreto expuesto;
13. Playwright de consentimiento aceptado/rechazado/revocado, guardado fallido,
    doble submit, acceso cruzado, export, delete y resultado incompleto;
14. auditoría de accesibilidad: teclado, foco, mensajes, checkbox no preseleccionado,
    lector de pantalla y alternativa a micrófono cuando el modo lo permita.

## 12. Auditorías de T11

### Auditoría 1 — full-stack, datos y repositorio

`pass_for_contract`. Se trazaron UI → server action → tablas/policies → reporte,
leads, scoring, perfil y patrón de storage. Se registraron hashes y no se consultó
producción. El runtime falla el contrato y no queda aprobado.

### Auditoría 2 — TOEFL

`pass_for_contract`. Escala, completitud, adaptatividad, blueprint y evaluación W/S se
trazaron a ETS-S1–S5. Se separó explícitamente método ETS de scoring local; ninguna
tabla de conversión se reutiliza como algoritmo.

### Auditoría 3 — editorial y pedagógica

`pass_for_contract`. Feedback, autoevaluación y score se separan; errores técnicos no
castigan; la exposición previa limita interpretación; los mensajes explican alcance
sin ansiedad ni promesas de admisión.

### Auditoría 4 — audio

`not_executed_by_owner_decision`. No se abrió, reprodujo, transcribió, editó ni generó
audio. Sólo se fijó el contrato futuro de privacidad/retención que T11 requiere. T08
sigue diferido hasta cerrar la fase no-audio.

### Auditoría 5 — multiperspectiva, anti-sesgo y derechos

`pass_for_contract`. Se contemplaron titular, anónimo, menor, rater, soporte, admin y
proveedor; se prohibieron voiceprints/emoción, mezcla comercial y scoring de
autoevaluación. El piloto inicial es 18+ y los derechos tienen canal, estados y SLA.

### Auditoría 6 — UI/UX y accesibilidad

`pass_as_requirements`. Se definieron consentimiento no preseleccionado, rechazo sin
penalidad, acuse, export/delete, estados comprensibles y errores no académicos. No se
afirma que la UI actual los cumpla.

### Auditoría 7 — E2E

`not_applicable_to_document_only`. No cambió runtime. La sección 11 fija los casos
obligatorios; cargar una página o probar sólo happy path no retira blockers.

## 13. Decisión y gate

T11 aprueba:

- modelo lógico de intento, eventos, respuestas, outcomes y score runs;
- finalidades y autorizaciones separadas;
- calendario de retención v1 con borrado, backups y huérfanos;
- disclosures `DS-APS-001–010`;
- política de scoring por nivel A/B/C/D;
- roles, acceso, derechos, menores y gate de proveedores.

T11 **no aprueba** el runtime, la base actual, el bucket existente, un score TOEFL
local, un proveedor, un piloto con usuarios ni una auditoría de audio. El gate
documental “persistencia, disclosure y retención aprobados” queda satisfecho; los
controles de la sección 11 son blockers de implementación/release.

La matriz normalizada asociada es
`docs/toefl-2026-attempt-privacy-scoring-contract-2026-08-09.tsv`.
