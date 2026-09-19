# Adjudicación independiente del board editorial ICFES

**Expediente:** `board-20260912-editorial-adjudication-16c6469e`

**Commit observado:** `16c6469e2c07ebb618e47e047a22def32b839ae0`

**Candidate digest observado:** `015255242a3f92a5ccc180148c5985f5178f85d589b9c5cba6ea993f8093410e` — provisional y ligado al contrato comercial obsoleto.

**Veredicto editorial:** **BLOCKED**

**Aprobación humana:** **no emitida**. Esta adjudicación fue producida por un agente independiente como insumo del board. No suplanta la firma humana `editorial-adjudicator` exigida por el harness.

## Resultado ejecutivo

Se adjudicaron los **65/65 hallazgos** de los dos expedientes: 25 del especialista de inglés y 40 del especialista de formato. La cobertura fuente es 23/23 mocks y 1.035/1.035 preguntas. El ledger final contiene:

| Decisión | Hallazgos |
|---|---:|
| `CONFIRMED_FIX_REQUIRED` | 48 |
| `REJECTED_FALSE_POSITIVE` | 17 |
| `NEEDS_AUTHORITATIVE_EXTERNAL_EVIDENCE` | 0 |
| **Total** | **65** |

Hay 40 entradas que mantienen bloqueo de producción y 39 grupos bloqueantes después de deduplicar el solapamiento ENG-005/FMT-008. No se editó ninguna pregunta, clave, precio ni archivo de producto; no se creó `mock-24`.

La corrección más importante a los expedientes es esta: `getGuidedMockQuestions()` consume `getMock()`, y `getMock()` aplica `normalizeIcfesMock()` antes del adaptador. Por lo tanto:

- la cuadrícula de vocabulario sí llega como Parte 1;
- los avisos sí llegan como Parte 2;
- la Parte 7 legada se sustituye por `CURRENT_PART_SEVEN`, que sí es cloze;
- ENG-001, ENG-002 y ENG-003 son falsos positivos;
- ENG-009, ENG-015, ENG-020, ENG-023 y ENG-026 describen Parte 7 legada que el estudiante no ve;
- FMT-001 sí se confirma precisamente porque el candidato antiguo no incluyó esas transformaciones dentro de su frontera de hash.

## Cobertura y método

Leí completos `english-specialist.json/.md` e `icfes-format-specialist.json/.md`, inspeccioné directamente el registry, el normalizador, la Parte 7 compartida, el adaptador guiado, las fuentes citadas y el harness vigente. Los 28 hallazgos que el revisor de formato remitió a adjudicación —FMT-006 y FMT-014 a FMT-040— recibieron una decisión explícita: 23 confirmados y 5 rechazados.

No se navegó. Las dos fuentes primarias citadas por el revisor fueron vendorizadas dentro del expediente y verificadas textual y visualmente. Esto permitió cerrar las cuatro conclusiones normativas sin sustituir la fuente por memoria. Dentro de FMT-006 se adjudicaron además sus 35 ítems: 15 deben moverse o reescribirse por evaluar idea principal, propósito, tema, tono o postura global; 20 son paráfrasis o significados contextuales compatibles con Parte 5 y no requieren corrección taxonómica, aunque siguen sujetos a la corrección separada de tres opciones.

## Verificación criptográfica

Se recalcularon los hashes de los 26 archivos del expediente de inglés y de los tres archivos compartidos adicionales del expediente de formato: **29/29 coinciden**. También se ejecutó el normalizador real y se recalcularon los 23 hashes de los mocks efectivos: **23/23 coinciden**.

| Ancla | Reportado | Recalculado | Estado |
|---|---|---|---|
| `rawBundleDigest` | `7e970c3c32fa3ce8a3edba96f9d8eb59a3c09a553ffb6f61e29ae137a367b81b` | igual | PASS |
| `runtimeBundleDigest` | `29f07e778b985659e21b604c6e90e68f9c5d25d217ebaa31b92da652a6cfef35` | igual | PASS |
| `reviewedContentDigest` | `969e508e4905681916e4985d7b5a428f6132cd238cc216feb240dddecb84377c` | igual | PASS |
| `sourceReportsDigest` | `2ee81f43398bd77c2c411bfe498f43aed5ca8e4d11db9c3b7ad893ea51ab9453` | — | ancla de entrada |
| `authoritativeSourcesDigest` | `0455037e9422934de88f616b733918463d2541f34111a8ab989fd844c98ea747` | — | ancla de fuentes oficiales |
| `allEvidenceInputsDigest` | `4cfbb2d11a839b99f3d3a0e5d1c9896da7758ca88821cf05b7a0bbc60beb45dd` | — | reportes + fuentes oficiales |
| `decisionLedgerDigest` | `edf44663159972f968357f072e1913f0b11b542a05ca8abe2aa3b8d83669b9cd` | — | ancla de decisiones |

Fuentes oficiales congeladas:

- `icfes-saber-11-2026-2-guide.pdf`, SHA-256 `9022a58a6ab2ff9d488b5c94be3392acf9da3433038de1ede3f822fa55d2eeb3`. Se inspeccionaron las páginas 12 y 63-65.
- `icfes-english-infographic-2025-09.pdf`, SHA-256 `10edf6b9ae7737f71bc376dac085033b01a243cd9b207cf70599c85dae686e5d`. Se inspeccionó su única página.

La guía confirma: 55 preguntas de Inglés en el cuadernillo estándar; distribución 11/11/11/18/16/11/22; Parte 2 selecciona lugar A-C; Parte 4 usa A-C; Parte 5 es lectura literal/paráfrasis con A-C; Parte 6 cubre intención y aspectos generales/particulares con A-D. La infografía confirma de forma independiente la tarea de lugar de Parte 2 y las siete partes.

El digest editorial efectivo debe incluir:

1. `icfes-mock-01.ts` a `icfes-mock-23.ts`.
2. `normalize-icfes-mock.ts`, `icfes-current-part-seven.ts` e `index.ts`.
3. `guided-mocks.ts` y `guided-registry.ts`, porque producen el feedback que se vendería.
4. `own-mock-expansion-manifest.json`.
5. Las dos fuentes oficiales vendorizadas que fijan la línea base normativa.
6. Un hash JSON canónico por cada mock después de normalizar y un bundle digest sobre el ledger ordenado.

Un hash del módulo crudo, por sí solo, no identifica el examen ni el feedback efectivo que recibe el estudiante.

## Ledger completo de decisiones

La evidencia y el plan por hallazgo están completos en `editorial-adjudication.json`; esta tabla conserva la trazabilidad íntegra de los 65 IDs.

### Expediente de inglés

| ID | Decisión | Bloquea | Fundamento adjudicado |
|---|---|---:|---|
| ENG-001 | `REJECTED_FALSE_POSITIVE` | no | El runtime remapea `matching-grid` a Parte 1 antes del adaptador guiado. |
| ENG-002 | `REJECTED_FALSE_POSITIVE` | no | El runtime remapea `notices-grid` a Parte 2 antes del adaptador guiado. |
| ENG-003 | `REJECTED_FALSE_POSITIVE` | no | La Parte 7 efectiva se sustituye por el cloze compartido antes del adaptador. |
| ENG-004 | `CONFIRMED_FIX_REQUIRED` | sí | Los 1.035 registros reciben `reviewedAt` y `editorialStatus='reviewed'` sin consultar un digest aprobado. |
| ENG-005 | `CONFIRMED_FIX_REQUIRED` | sí | Se confirma la concentración B/C de P5/P6; se rechaza la subafirmación sobre P7 legado. Solapa FMT-008. |
| ENG-006 | `CONFIRMED_FIX_REQUIRED` | no | “The largest Amazon country” es impreciso y no estándar. |
| ENG-007 | `CONFIRMED_FIX_REQUIRED` | no | La comparación elíptica deja ambiguos objeto y clase de comparación. |
| ENG-008 | `CONFIRMED_FIX_REQUIRED` | sí | “Passion and determination” exige `compensate`. |
| ENG-009 | `REJECTED_FALSE_POSITIVE` | no | La opción citada pertenece a Parte 7 legada sustituida. |
| ENG-010 | `REJECTED_FALSE_POSITIVE` | no | “Musical history” es idiomático y es la única opción defendible del set real. |
| ENG-011 | `CONFIRMED_FIX_REQUIRED` | no | UNESCO sustenta significancia/reconocimiento, no necesariamente popularidad global. |
| ENG-013 | `CONFIRMED_FIX_REQUIRED` | sí | La frase convierte erróneamente el clima en “la ciudad de la eterna primavera”. |
| ENG-014 | `CONFIRMED_FIX_REQUIRED` | no | La respuesta clave de mock-16:p3q2 no es idiomática. Solapa FMT-037. |
| ENG-015 | `REJECTED_FALSE_POSITIVE` | no | El error ortográfico está en Parte 7 legada sustituida. |
| ENG-016 | `REJECTED_FALSE_POSITIVE` | no | La pregunta es simple, pero la clave es la única afirmación presente; baja discriminación no invalida el ítem. |
| ENG-017 | `CONFIRMED_FIX_REQUIRED` | sí | mock-20:p5q3 no ofrece ninguna opción que responda la acción solicitada. |
| ENG-018 | `CONFIRMED_FIX_REQUIRED` | sí | La oración de golf es no idiomática y separa sujeto/verbo con coma. |
| ENG-019 | `CONFIRMED_FIX_REQUIRED` | sí | El pasaje de arte y su clave contienen redacción no nativa sostenida. |
| ENG-020 | `REJECTED_FALSE_POSITIVE` | no | El pasaje “doing nothing” es Parte 7 legada sustituida. |
| ENG-021 | `CONFIRMED_FIX_REQUIRED` | sí | El pasaje de enfermería mantiene errores de naturalidad y coherencia visibles. |
| ENG-022 | `CONFIRMED_FIX_REQUIRED` | no | El anuncio clave no resume fielmente el texto de gap year. |
| ENG-023 | `REJECTED_FALSE_POSITIVE` | no | El pasaje de millennials es Parte 7 legada sustituida. |
| ENG-024 | `CONFIRMED_FIX_REQUIRED` | no | El pasaje efectivo de cartas contiene redacción no idiomática reiterada. |
| ENG-025 | `CONFIRMED_FIX_REQUIRED` | sí | La entrevista efectiva y sus distractores contienen múltiples defectos de naturalidad. |
| ENG-026 | `REJECTED_FALSE_POSITIVE` | no | El pasaje de campamento es Parte 7 legada sustituida. |

El salto de numeración ENG-011 → ENG-013 ya existe en el expediente fuente; no falta una entrada: el archivo contiene 25 objetos únicos y todos fueron adjudicados.

### Expediente de formato

| ID | Decisión | Bloquea | Fundamento adjudicado |
|---|---|---:|---|
| FMT-001 | `CONFIRMED_FIX_REQUIRED` | sí | Los 23 hashes efectivos difieren del manifiesto crudo; faltan dependencias runtime/guided en la frontera. |
| FMT-002 | `REJECTED_FALSE_POSITIVE` | no | Es una salvaguarda ya aplicada (“práctica propia abreviada”), no una falla. |
| FMT-003 | `CONFIRMED_FIX_REQUIRED` | sí | Guía p.64 e infografía: P2 exige escoger el lugar A-C; 77/115 ítems hacen otra tarea. |
| FMT-004 | `CONFIRMED_FIX_REQUIRED` | sí | Guía p.64: P4 usa tres opciones A-C; los 184 ítems usan A-D. |
| FMT-005 | `CONFIRMED_FIX_REQUIRED` | sí | Guía p.65: P5 usa tres opciones A-C; los 161 ítems usan A-D. |
| FMT-006 | `CONFIRMED_FIX_REQUIRED` | sí | Guía p.65: 15/35 ítems son generales/intención/tono y deben mover/reformular; 20/35 sí son paráfrasis locales. |
| FMT-007 | `CONFIRMED_FIX_REQUIRED` | sí | Las 23 Partes 7 repiten A/B/C/D/A/B/C/D/A/B. |
| FMT-008 | `CONFIRMED_FIX_REQUIRED` | sí | B/C concentra 145/161 claves P5 y 100/115 P6. Solapa ENG-005. |
| FMT-009 | `CONFIRMED_FIX_REQUIRED` | sí | El ejemplo `trophy` duplica una palabra A–G en mock-21. |
| FMT-010 | `CONFIRMED_FIX_REQUIRED` | no | Diez diálogos llevan metadato `mcq`. |
| FMT-011 | `CONFIRMED_FIX_REQUIRED` | no | Veinte títulos de catálogo no corresponden al tema ejecutable. |
| FMT-012 | `CONFIRMED_FIX_REQUIRED` | sí | Páginas públicas prometen “simulacros completos” mientras el runtime declara 45 preguntas abreviadas. |
| FMT-013 | `REJECTED_FALSE_POSITIVE` | no | El resultado ya dice “estimado” y niega predicción/equivalencia con puntaje oficial. |
| FMT-014 | `REJECTED_FALSE_POSITIVE` | no | `cooked` es la única opción general e idiomática para griddle o pan sin aceite indicado. |
| FMT-015 | `CONFIRMED_FIX_REQUIRED` | sí | `voice communication` y `voice messages` son plausibles. |
| FMT-016 | `CONFIRMED_FIX_REQUIRED` | sí | `social`, `digital` y `online media` son plausibles. |
| FMT-017 | `CONFIRMED_FIX_REQUIRED` | sí | `natural regions` y `natural zones` son plausibles. |
| FMT-018 | `CONFIRMED_FIX_REQUIRED` | sí | Periodos húmedos/secos afectan varias opciones, no solo agricultura. |
| FMT-019 | `CONFIRMED_FIX_REQUIRED` | sí | `active social media users/accounts` son plausibles. |
| FMT-020 | `CONFIRMED_FIX_REQUIRED` | sí | `platform`, `website` y `channel` permiten la acción descrita. |
| FMT-021 | `CONFIRMED_FIX_REQUIRED` | sí | `share` y `send` aceptan naturalmente el complemento. |
| FMT-022 | `CONFIRMED_FIX_REQUIRED` | sí | Hour/day/week completan “several times a…”. |
| FMT-023 | `CONFIRMED_FIX_REQUIRED` | sí | Tool/network/service son descripciones posibles sin otra pista. |
| FMT-024 | `CONFIRMED_FIX_REQUIRED` | sí | City/town/settlement pueden nombrar el lugar fundado. |
| FMT-025 | `REJECTED_FALSE_POSITIVE` | no | `attracted great attention` es colocación natural; `attracted great focus` no es equivalente idiomático. |
| FMT-026 | `CONFIRMED_FIX_REQUIRED` | sí | “Plays a critical role/part” admite dos respuestas estándar. |
| FMT-027 | `CONFIRMED_FIX_REQUIRED` | sí | La tecnología puede hacer la observación posible o más fácil. |
| FMT-028 | `REJECTED_FALSE_POSITIVE` | no | La oración siguiente sobre horas y pausas selecciona localmente `time`. |
| FMT-029 | `REJECTED_FALSE_POSITIVE` | no | “Writing notes in class” es la actividad convencional y la paráfrasis posterior la confirma. |
| FMT-030 | `REJECTED_FALSE_POSITIVE` | no | `breaks` retoma explícitamente “short breaks” de la frase anterior. |
| FMT-031 | `CONFIRMED_FIX_REQUIRED` | sí | Review/check son naturales antes de releer apuntes. |
| FMT-032 | `CONFIRMED_FIX_REQUIRED` | sí | Might/should/would expresan sentidos posibles sin pista modal. |
| FMT-033 | `CONFIRMED_FIX_REQUIRED` | sí | La frase pide `when`, ausente; `because` inventa causalidad. |
| FMT-034 | `CONFIRMED_FIX_REQUIRED` | sí | Other/more beautiful paintings son ambas construcciones válidas. |
| FMT-035 | `CONFIRMED_FIX_REQUIRED` | sí | Early warning signs/signals son colocaciones estándar. |
| FMT-036 | `CONFIRMED_FIX_REQUIRED` | sí | Sorpresa y evaluación positiva responden naturalmente al mismo estímulo. |
| FMT-037 | `CONFIRMED_FIX_REQUIRED` | sí | La preferencia por té es respuesta coherente y la clave además es no idiomática. |
| FMT-038 | `CONFIRMED_FIX_REQUIRED` | sí | Entusiasmo y rechazo por ruido son respuestas conversacionales coherentes. |
| FMT-039 | `CONFIRMED_FIX_REQUIRED` | sí | “Great deal” y “still too expensive” responden coherentemente a “half price”. |
| FMT-040 | `CONFIRMED_FIX_REQUIRED` | sí | Aceptar o rechazar por cansancio son respuestas coherentes al anuncio. |

## Orden de remediación

1. Mantener congelados lanzamiento, cobro y expansión; no crear `mock-24`.
2. Corregir la frontera criptográfica para que identifique contenido y feedback efectivos, y retirar la certificación automática `reviewed`.
3. Conservar en el candidato las fuentes oficiales ya vendorizadas y sus hashes; mantener la adjudicación explícita 15/20 de FMT-006.
4. Definir la postura de formato: alinear P2/P4/P5 con la referencia congelada o rotular cada desviación como práctica suplementaria. Corregir ya el claim público “simulacro completo”.
5. Reparar primero los pasajes, luego sus preguntas dependientes; empezar por el ítem sin respuesta válida `mock-20:p5q3` y los defectos de naturalidad/clave confirmados.
6. Corregir las ambigüedades de una-mejor-respuesta, el banco de ejemplo de mock-21 y los metadatos/títulos.
7. Rebalancear opciones completas en P5/P6 y eliminar el ciclo común de P7 sin cambiar la semántica correcta.
8. Regenerar hashes y ejecutar una revisión independiente nueva sobre cada ítem/explicación tocado.
9. Solo después de dos PASS independientes y una nueva adjudicación puede una persona autorizada firmar el hash exacto del candidato reconciliado.

## Veredicto

El gate editorial permanece **BLOCKED**. El candidato no puede activar detalle pago ni aparecer en el manifiesto de lanzamiento. La fábrica de expansión puede conservarse como infraestructura, pero la cola debe permanecer en `not-started` y `catalogEligible=false` hasta cerrar esta remediación y las aprobaciones humanas hash-bound.

El contrato comercial observado en `16c6469e` sigue obsoleto. Este expediente no modifica precios y no aprueba el contrato; al reconciliar COP 12.900 / 49.900 / 99.900, la evidencia editorial solo puede reemitirse si sus hashes de contenido efectivo permanecen idénticos. Cualquier cambio editorial exige revisión nueva del contenido afectado.
