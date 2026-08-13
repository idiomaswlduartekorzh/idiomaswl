# TOEFL iBT 2026 — auditoría y contrato del piloto Complete the Words

> `artifact_id`: `toefl-2026-complete-the-words-pilot`
>
> `artifact_version`: `2026-08-09.v4`
>
> `official_registry_base`: `toefl-ibt-2026@2026-08-09.v2`
>
> `official_detail_addendum`: `ctw-detail@2026-08-09.v1`
>
> `data_contract`: `toefl-data-render-scoring@2026-08-09.v1`
>
> `source_object`: `object:t1-r-cw2`
>
> `candidate_object`: `object:t1-r-cw2-v3`
>
> `verified_at`: 9 de agosto de 2026
>
> `review_by`: 9 de septiembre de 2026, o antes de implementar/publicar el piloto
>
> `status`: T12 auditada y especificada; candidata factual v3 documentada; interacción, scoring, derechos y revisión independiente pendientes

Este documento materializa la fase documental de T12 de
`docs/toefl-2026-alignment-loop.md`. Contrasta el banco y el runner actuales con las
reglas públicas de ETS, adjudica una muestra reutilizada del Set 1 y fija un contrato
verificable para su futura implementación. No modifica código, banco, scoring,
persistencia ni audio.

T12 **permanece abierta**. La auditoría factual completa encontró que el texto fuente
del Set 1 necesita dos correcciones pequeñas antes de implementarse. La variante
documental `v3` las incorpora sin alterar la máscara ya adjudicada, pero el producto
actual sigue mostrando seis huecos no oficiales y evalúa una unidad distinta de la
que solicita la interfaz. La casilla sólo podrá cerrarse después de una autorización
explícita para implementar, probar y volver a pasar las siete auditorías.

## 1. Decisión ejecutiva

La intuición del owner era correcta para Complete the Words:

- el banco tiene 40 bloques y 240 huecos, seis por bloque; ETS define diez palabras
  incompletas por texto y el blueprint registrado suma 30 respuestas de esta familia;
- sólo 3/40 bloques actuales dejan intacta la primera oración; en la población
  académica son 2/20;
- 20/40 estímulos son mensajes personales, aunque el formato detallado de ETS pide
  textos académicos de aproximadamente 70–100 palabras;
- el runner pide únicamente las letras faltantes, pero el scorer compara esa entrada
  contra la palabra completa, por lo que una respuesta fiel como `ght` para `li___`
  se considera incorrecta frente a la clave `light`;
- el Set 1 contiene una fuente académica de 79 palabras sobre el Sol, pero `hot gas`
  es menos preciso que `plasma` y `anything to live` es un absoluto incompatible con
  ecosistemas de chemosíntesis. La variante `v3` corrige esas dos expresiones, queda
  en 76 palabras y mantiene las diez posiciones y claves ya derivadas;
- la revisión de los 20 textos académicos dejó 6 pases factuales generales, 14
  reparaciones, dos coincidencias exactas preexistentes y tres formulaciones stock o
  cercanas. Los 20 continúan bloqueados para release.

El bloque personal `t1-r-cw1` se preserva, pero no se usa como simulación oficial de
Complete the Words. Puede conservarse como práctica libre de vocabulario con el
disclosure apropiado. El bloque académico `t1-r-cw2` se preserva como fuente y se
deriva a `t1-r-cw2-v3`; el original no se sobrescribe. `v2` se conserva sólo como
candidata documental supersedida.

## 2. Evidencia oficial vigente y regla operativa

### 2.1 Fuentes primarias

| ID | Fuente ETS | Evidencia utilizada |
|---|---|---|
| ETS-CTW-1 | [Updated TOEFL iBT Test Overview](https://www.ets.org/content/dam/ets-org/pdfs/toefl/toefl-ibt-test-overview.pdf) | Texto académico de unas 70–100 palabras; primera oración intacta; se elimina la segunda mitad de cada segunda palabra; diez palabras incompletas por texto; la respuesta son las letras faltantes. |
| ETS-CTW-2 | [Inside the TOEFL iBT Updates: Validity by Design](https://www.ca.ets.org/content/ets-org/br/en/home/toefl/blog/ibt-validity-by-design.html) | Confirma en abril de 2026 la regla de la segunda mitad de palabras alternas y el constructo C-test: comprensión de texto, vocabulario, sintaxis y ortografía. |
| ETS-CTW-3 | [TOEFL iBT Reading Content](https://www.ets.org/toefl/test-takers/ibt/about/content/reading.html) | Describe la interacción como completar letras parcialmente ausentes dentro de un texto breve usando vocabulario y contexto. |
| ETS-CTW-4 | [Teacher Resources Practice Test 1](https://www.ets.org/content/dam/ets-org/pdfs/toefl/toefl-ibt-teachers-resources-practice-test-1.pdf) | Muestra diez inputs por texto y claves formadas por las letras ausentes. También advierte que el material en papel no reproduce exactamente la interfaz real. |
| ETS-CTW-5 | [TOEFL iBT Test Specifications 2026](https://www.ets.org/content/dam/ets-india/pdfs/toefl/toefl-ibt-test-specifications-2026.pdf) | El blueprint base registrado en T01 asigna 30 respuestas a Complete the Words y Reading forma parte del diseño adaptativo de dos etapas. |

El Test Overview es un PDF oficial grande que el visor web no pudo abrir completo,
pero el índice oficial recuperó su sección y su ejemplo el 9 de agosto de 2026. La
misma regla central queda corroborada por la publicación de investigación ETS-CTW-2
y por el Practice Test oficial. No se copia ningún pasaje de ETS al banco.

### 2.2 Regla `CTW-OF-001`

Para un texto elegible:

1. El estímulo es un texto académico coherente de aproximadamente 70–100 palabras.
2. La primera oración queda completamente intacta.
3. Tras esa oración, la primera palabra queda intacta y se enmascara la segunda;
   después se alternan palabra intacta y palabra enmascarada.
4. Se enmascaran exactamente diez palabras y luego el resto del texto permanece
   intacto.
5. En cada palabra objetivo se conserva la primera mitad y se elimina la segunda. Si
   la longitud es impar, el ejemplo oficial conserva la parte menor y solicita la
   parte mayor.
6. Puntuación y respuesta operan sobre las letras faltantes, no sobre la palabra
   completa.
7. Puntuación máxima: un punto por hueco presentado, sin crédito parcial local en
   esta versión del contrato.

Los puntos 3 y 5 son una operacionalización reproducida del ejemplo público de ETS,
no una afirmación sobre su algoritmo interno de ensamblaje. T20/T24 deberán confirmar
la composición de forma y la ruta adaptativa; un bloque piloto de diez respuestas no
puede presentarse como examen completo.

## 3. Línea base medida

### 3.1 Banco completo: 20 sets

| Métrica | Estado actual | Criterio de alineación | Resultado |
|---|---:|---:|---|
| Bloques Complete the Words | 40 | Inventario, no gate | Medido |
| Huecos | 240 | 10 por bloque; 30 respuestas en blueprint base | 0/40 bloques con diez |
| Huecos por bloque | 6 en 40/40 | 10 | Falla |
| Textos de 70–100 palabras | 23/40 | 40/40 candidatos oficiales | Falla |
| Textos académicos | 20/40 | 40/40 candidatos oficiales | Falla |
| Textos académicos de 70–100 palabras | 17/20 académicos | Todos los usados en piloto | 17 elegibles por longitud; 14 derivables mecánicamente y 3 pendientes de tokenización |
| Primera oración intacta | 3/40 en conjunto; 2/20 académicos | 40/40 | Falla |
| Prefijo compatible sólo por longitud con regla de mitad | 136/240 | 240/240 y alternancia correcta | Insuficiente; no prueba el patrón |
| Hueco con cero letras ausentes | 1 | 0 | Falla: `bag → bag` |
| Clave almacenada | Palabra completa en 240/240 | Letras faltantes | Falla |
| Procedencia/derechos registrada por ítem | 0/240 | 240/240 antes de release | Bloquea release |

El conteo reconstruye cada hueco y separa tokens por espacios, de modo que la misma
regla puede repetirse sobre los 40 textos. El rango actual es 56–84 palabras, con
media 70,5. Entre los 20 bloques académicos, 17 están ya dentro de 70–100 palabras;
los Sets 9, 16 y 20 tienen 58, 67 y 67 palabras respectivamente. Esos 17 aportan 170
posiciones candidatas, pero no equivalen a 170 respuestas aprobadas: catorce textos
permiten una derivación mecánica conservadora y tres producen `a` o `water's` en una
posición objetivo que exige adjudicar tokenización. Además, lenguaje, hechos,
derechos y revisión independiente siguen siendo gates separados. El detalle fila
por fila está en
`docs/toefl-2026-complete-the-words-bank-quality-audit-2026-08-09.md` y su matriz
TSV. No es todavía el manifiesto de producción T20: una forma fija completa necesita
más material y una forma adaptativa requiere además ruta/calibración.

### 3.2 Set 1

| Objeto | Palabras | Género | Huecos actuales | Primera oración | Dictamen |
|---|---:|---|---:|---|---|
| `t1-r-cw1` | 64 | Mensaje personal a una amiga | 6 | Tiene hueco | Preservar fuera de CTW oficial; no reescribir ni borrar. |
| `t1-r-cw2` | 79 | Explicación académica breve sobre el Sol | 6 | Tiene hueco | Fuente preservable, pero requiere reparación factual B antes de derivar. |

Los huecos actuales de `t1-r-cw2` son `gas`, `light`, `fusion`, `minutes`, `cold` y
`climate`. No forman la alternancia oficial y el primero rompe la oración inicial.

### 3.3 Runner y scoring actuales

La inspección estática y Playwright observaron lo siguiente:

| Capa | Estado observado | Impacto |
|---|---|---|
| Render | Muestra `prefix` y un textbox cuyo placeholder tiene tantos guiones como `missingLength`. | Comunica que el estudiante escribe sólo las letras ausentes. |
| Estado de respuesta | Guarda literalmente lo escrito en el textbox. | Correcto como forma de captura, pero sin límite/validación. |
| Scorer | Normaliza lo escrito y lo compara con `blank.answer`, que contiene la palabra completa. | Contrato incompatible: la respuesta solicitada falla. |
| Normalización | Elimina puntuación de forma general. | Contradice T09: no debe convertir entradas distintas en equivalentes silenciosos. |
| Resultado | Suma CTW a un raw de Reading y después a una banda local inválida. | No hay outcome por hueco, reconciliación ni reporte trazable. |
| Longitud | `maxLength = -1`; `endextra` fue aceptado para un hueco de tres letras. | Permite entradas imposibles y feedback tardío. |
| Asistencia del navegador | `spellcheck = true`; autocomplete no está desactivado explícitamente. | Puede introducir ayuda ajena al constructo de ortografía/contexto. |
| Nombre accesible | Hay dos controles distintos llamados `Blank 1`, sin pasaje, prefijo ni longitud. | Ambigüedad para lector de pantalla y dictado por voz. |
| Teclado | Tab avanzó del primer al segundo hueco en orden de lectura. | Pasa en la muestra actual. |
| Layout | Desktop y 390 px reordenan el texto sin scroll horizontal visible. | Pasa de forma básica; requiere repetir tras implementar diez huecos. |
| Estructura | Los dos CTW y todas las demás tareas de Reading se montan en una sola página larga. | No reproduce una secuencia modular; T10/T24 gobiernan el cierre real. |

El único error de consola fue un script de analítica bloqueado por la CSP
(`unpkg.com` desde Google Tag Manager). No se atribuye a CTW, pero se conserva como
hallazgo técnico separado.

### 3.4 Segunda superficie publicada: lección de `Complete the Words`

La ruta
`/practica/toefl/reading/formato-2026/complete-the-words` no estaba incluida en el
inventario de los 20 simulacros. Su auditoría añade 16 unidades escritas al alcance
de T12. Son activos distintos de los 240 huecos de los sets.

| Dimensión | Estado observado | Dictamen |
|---|---|---|
| Claim visible/SEO | Título, metadata, canonical, FAQ y JSON-LD la presentan como práctica actual de `Complete the Words`. | Falla material: el nombre oficial se aplica a otra interacción. |
| Estímulo | Una oración independiente con una palabra completa omitida. | No es el texto académico de 70–100 palabras ni conserva/enmascara mitades alternas. |
| Respuesta | Cuatro palabras completas como opciones. | No solicita las letras faltantes. |
| Interacción | 0 inputs, 0 botones de tarea, 0 radios y 0 formularios. Las opciones son `span` estáticos. | No existe respuesta, envío, scoring, feedback por intento ni teclado de tarea. |
| Revelación | La opción correcta aparece verde desde la primera pintura y la clave completa está debajo. | Sirve como ejemplo resuelto, no como práctica medible. |
| Banco | 16 IDs únicos, cuatro opciones y clave válida en 16/16. | El contenido puede preservarse fuera de CTW. |
| Posición de clave | A=13, B=2, C=1, D=0; 81,25 % en A. | Pista de posición severa si se convierte en ejercicio interactivo sin rebalancear. |
| Longitud | La respuesta es la única opción más larga en 3/16 y comparte máximo en 2 adicionales. | Riesgo secundario; no es el defecto principal. |
| Léxico | 15 respuestas correctas únicas; `limited` se repite en dos ítems. | Reutilizable con control de exposición. |
| Editorial | Claves inequívocas y lenguaje natural, pero muchos distractores son semánticamente remotos. | Baja discriminación; requiere reparación antes de pilotaje. |
| Móvil | El primer ítem refluye correctamente a 390 px. | Pasa layout básico; no compensa la ausencia de controles. |

Clasificación por capa:

- superficie/claim como `Complete the Words`: **D — reemplazar**, porque no se
  repara cambiando sólo una etiqueta o una opción;
- 16 ejercicios de selección léxica: **B — reparar y reclasificar** como práctica A
  de `contextual word choice`/vocabulario, preservando IDs y texto;
- pasaje candidato `t1-r-cw2-v3`: **B → C — reparación versionada y derivación** para ocupar la ruta CTW real cuando
  se autorice implementación.

La matriz individual vive en
`docs/toefl-2026-complete-the-words-learning-surface-audit-2026-08-09.tsv`.

### 3.5 Procedencia recuperada del historial

La afirmación anterior “sin autor ni fecha” era demasiado amplia. El objeto no tiene
campos de derechos, pero Git aporta evidencia histórica:

- `t1-r-cw2` y su texto actual proceden del commit
  `58c2fb0c84f955b1c249708b0fbd1bf0dbb14e43`, autor/committer José David Duarte
  Silva, 23 de julio de 2026. El mensaje declara el lote TOEFL como contenido original
  WeLearn y registra coautoría de Claude Opus 4.8;
- los 16 ejercicios léxicos y su metadata proceden de
  `07a0fe768866dd18f2bb70c59c22ebdd0b5c074d`, autor/committer José David Duarte
  Silva, 14 de julio de 2026;
- la página que los pinta fue incorporada en
  `850229a33106aabb0b4be452905f52d20eb9419c`, autor/committer José David Duarte
  Silva, 16 de julio de 2026.

Se buscaron literalmente tres frases distintivas del pasaje y tres de los ejercicios
en el índice web. No apareció una coincidencia exacta; sí aparecieron formulaciones
genéricas sobre los mismos hechos solares. Este control reduce riesgo, pero no es una
búsqueda exhaustiva ni demuestra por sí solo originalidad de un texto coescrito con
IA.

Por tanto, el estado correcto pasa de `blocked_missing_provenance` a
`internal_commit_origin_identified_pending_owner_attestation_and_similarity_review`.
Sigue bloqueando release hasta que el owner confirme la cadena de creación/derechos,
se archive esa declaración por objeto y una revisión independiente acepte el texto.

## 4. Reutilización y adjudicación editorial del Set 1

### 4.1 Texto fuente preservado

> The sun is a giant ball of hot gas at the center of our solar system. It provides
> the light and heat that make life on Earth possible. Deep inside the sun, a process
> called nuclear fusion releases enormous amounts of energy. This energy travels
> through space and reaches Earth in about eight minutes. Without the sun, our planet
> would be far too cold for anything to live. Scientists study the sun to understand
> how it affects our climate.

La fuente no se altera ni se borra. La auditoría factual posterior determinó dos
reparaciones necesarias: el Sol es plasma, no simplemente gas caliente; y existen
ecosistemas basados en chemosíntesis, de modo que `anything to live` es absoluto.
`t1-r-cw2-v2`, que conservaba el texto palabra por palabra, queda supersedida como
candidata documental.

### 4.2 Versión renderizada candidata `t1-r-cw2-v3`

> The sun is a giant ball of plasma at the center of our solar system. It prov____
> the li___ and he__ that ma__ life o_ Earth poss____. Deep ins___ the s__, a
> pro____ called nuc____ fusion releases enormous amounts of energy. This energy
> travels through space and reaches Earth in about eight minutes. Without the sun,
> most forms of life on Earth could not survive. Scientists study the sun to
> understand how it affects our climate.

| Ítem candidato | Posición tras la primera oración | Palabra canónica | Prefijo visible | Respuesta faltante | Reconstrucción |
|---|---:|---|---|---|---|
| `item:t1-r-cw2-v3:blank-01` | 2 | `provides` | `prov` | `ides` | `provides` |
| `item:t1-r-cw2-v3:blank-02` | 4 | `light` | `li` | `ght` | `light` |
| `item:t1-r-cw2-v3:blank-03` | 6 | `heat` | `he` | `at` | `heat` |
| `item:t1-r-cw2-v3:blank-04` | 8 | `make` | `ma` | `ke` | `make` |
| `item:t1-r-cw2-v3:blank-05` | 10 | `on` | `o` | `n` | `on` |
| `item:t1-r-cw2-v3:blank-06` | 12 | `possible` | `poss` | `ible` | `possible` |
| `item:t1-r-cw2-v3:blank-07` | 14 | `inside` | `ins` | `ide` | `inside` |
| `item:t1-r-cw2-v3:blank-08` | 16 | `sun` | `s` | `un` | `sun` |
| `item:t1-r-cw2-v3:blank-09` | 18 | `process` | `pro` | `cess` | `process` |
| `item:t1-r-cw2-v3:blank-10` | 20 | `nuclear` | `nuc` | `lear` | `nuclear` |

La matriz canónica y auditable está en
`docs/toefl-2026-complete-the-words-pilot-audit-2026-08-09.tsv`.

### 4.3 Dictamen editorial

| Dimensión | Resultado | Evidencia/condición |
|---|---|---|
| Inglés y naturalidad | Aprobado documentalmente para piloto | La variante v3 conserva gramática, cohesión, registro y progresión naturales. |
| Constructo | Aprobado para piloto | Los diez objetivos exigen contexto, morfología, sintaxis y ortografía; no dependen de trivia. |
| Longitud/género | Aprobado | 76 palabras y explicación académica. |
| Hechos | Aprobado documentalmente para piloto | [NASA Sun Facts](https://science.nasa.gov/sun/facts/) sustenta plasma, centro, energía, fusión y dependencia de la vida; [NASA — luz y fusión](https://svs.gsfc.nasa.gov/11084/) sustenta unos ocho minutos; [NOAA — chemosynthesis](https://oceanexplorer.noaa.gov/ocean-fact/photochemo/) demuestra por qué se limitó el absoluto sobre toda vida. |
| Dificultad | Aprobación provisional | La muestra cubre palabras funcionales y léxicas, pero T20 debe balancear dificultad entre bloques y T26 debe validar con datos. |
| Sesgo | Aprobado | Tema no personal, no exige experiencia cultural específica, religión, ideología, salud o situación económica. |
| Derechos/procedencia | Bloquea release | Git identifica autor, fecha, commit y un claim interno de “contenido original WeLearn”, pero el objeto no guarda licencia/attestation y la coautoría con IA exige revisión de similitud. Debe archivarse declaración del owner o sustituirse por una fuente con derechos claros. |
| Revisión independiente | Pendiente antes de release | Una segunda persona debe confirmar texto, claves, máscara y derechos. El mismo agente no puede ser la única evidencia de generación y aprobación. |

Resultado preciso: **variante v3 aprobada documentalmente como candidata del piloto**;
**implementación, release y validación psicométrica no aprobados**.

## 5. Contrato del futuro piloto

### 5.1 Identidad y datos

El objeto derivado conserva `source_object_id` y hash de la fuente, y registra además
el texto reparado, su hash y las dos decisiones editoriales. Recibe un `object_id` y
`content_version` nuevos. Cada hueco incluye como mínimo:

- `item_id` estable y único;
- posición de palabra después de la primera oración;
- palabra canónica completa;
- prefijo visible y letras faltantes;
- longitud exacta de la entrada;
- regla/versiones oficial, editorial, derechos y scoring;
- estados de validación, retiro y release;
- procedencia del texto y de la derivación.

La invariante de construcción exige que `prefijo + letras faltantes` reproduzca
exactamente la palabra canónica. Cualquier discrepancia invalida el ítem y falla
cerrado; el runner no intenta adivinar la clave.

### 5.2 Interacción

- El control recibe exclusivamente las letras ausentes.
- Su longitud máxima es igual a la respuesta esperada; no se trunca silenciosamente.
- En el piloto inglés se aceptan letras latinas. Espacios internos, dígitos,
  puntuación o longitud distinta producen un estado inválido anunciado, no una
  transformación oculta.
- Se aplica NFC, recorte exterior y comparación sin distinción de mayúsculas propia
  del inglés. No se elimina puntuación interna ni se aceptan sinónimos.
- `spellcheck`, autocorrección, autocapitalización y autocomplete se desactivan cuando
  el navegador lo permita.
- Pegar sigue disponible por accesibilidad, pero no puede saltarse longitud ni
  validación.
- La respuesta se conserva al navegar dentro del alcance permitido por T10 y no se
  cierra hasta el evento normativo correspondiente.
- En modo examen no aparece corrección inmediata ni se revela la palabra. En modo
  práctica el feedback sólo aparece al cerrar el bloque y se rotula como local.

### 5.3 Accesibilidad

- Cada input tiene un nombre único equivalente a “Pasaje 1, hueco 2 de 10, prefijo
  li, faltan 3 letras”; la descripción no revela la respuesta.
- El prefijo, el control y la puntuación forman una misma unidad semántica; no se
  comunica la longitud sólo por ancho o guiones.
- El orden de foco sigue el orden de lectura 1→10; no hay trampas de teclado.
- Error, vacío, guardado y cierre se anuncian mediante texto y región viva moderada,
  nunca sólo con color.
- El zoom de 200 %, reflow a 320 px, modo oscuro, reduced motion y lector de pantalla
  deben conservar contexto, foco y puntuación.
- Al volver a un bloque, el foco retorna al último hueco activo o al encabezado
  canónico definido por T10.

### 5.4 Scoring y outcomes

Cada hueco presentado vale como máximo un punto. El evaluador compara la respuesta
normalizada con **las letras faltantes normalizadas**. La palabra completa sólo sirve
para la invariante de reconstrucción y para feedback cerrado.

Estados T09 aplicables:

- `scored`, con 1 o 0 y razón `exact_match`/`mismatch`;
- `unanswered`, 0 únicamente si el hueco fue presentado y el bloque se cerró;
- `not_presented`, fuera del denominador;
- `technical_failure` o `invalidated`, fuera del score de desempeño;
- `pending_evaluation` y `not_evaluated` no son resultados válidos para esta familia
  autoevaluable y señalan configuración defectuosa.

El reporte reconcilia presentados, calificables, correctos, incorrectos, vacíos,
fallos e invalidados por `item_id`. El piloto puede mostrar `8/10` y porcentaje local;
no puede emitir banda 1–6, `/120`, CEFR, total TOEFL, claim de admisión ni score
oficial. Un solo bloque debe anunciarse como práctica parcial fija.

## 6. Gate de implementación y pruebas exigidas

T12 sólo puede cerrarse cuando una implementación autorizada demuestre todo lo
siguiente sobre `t1-r-cw2-v3`:

1. Render de un texto académico de 76 palabras, primera oración intacta y diez huecos
   en las posiciones 2–20 de la matriz.
2. Diez IDs únicos y diez outcomes reconciliables; ningún índice visual actúa como
   identidad persistente.
3. Las diez claves de letras faltantes obtienen 10/10; escribir las diez palabras
   completas obtiene 0/10 o error de longitud, nunca 10/10.
4. Mayúsculas y espacios exteriores siguen la política; puntuación, dígitos, espacios
   internos y longitud incorrecta no se limpian silenciosamente.
5. Recarga, Back/Next permitidos y doble cierre preservan respuesta/idempotencia según
   T10/T11.
6. Teclado 1→10, nombres únicos, errores anunciados, foco de retorno y reflow a 320 px
   pasan en Chromium; la revisión manual cubre lector de pantalla y zoom.
7. El resultado dice práctica parcial WeLearn, muestra 10 como denominador y no
   presenta escala oficial.
8. Los hashes de texto fuente, derivación, contrato y matriz quedan fijados; una
   modificación exige nueva versión y revisión.
9. La procedencia/derechos del texto y la revisión editorial independiente quedan
   registradas antes de cualquier release a estudiantes.
10. No se toca ningún MP3, manifiesto o pipeline de audio.
11. La ruta pública deja de presentar los 16 MCQ estáticos como CTW; conserva esos
   activos en una práctica A honesta y usa el bloque derivado de diez inputs para CTW.
12. Metadata, FAQ, JSON-LD, título visible e interacción describen la misma tarea.

## 7. Siete auditorías — ronda documental y estado real

### 7.1 Full-stack, datos y seguridad de repositorio — `documento pasa / runtime falla`

Se trazaron fuente, variante reparada, tipo, ambos renderers, estado, scorer, reporte
y persistencia. La fuente se preserva sin sobrescribir; la derivación tiene texto,
IDs y claves versionados. El
runner falla por unidad de respuesta incompatible, ausencia de outcomes por ítem y
score agregado no permitido. La lección pública falla por claim/datos/render sin
interacción. No se inspeccionó ni imprimió `.env.local`, no se tocó trabajo IELTS ni
se llamó una API.

### 7.2 Experto TOEFL vigente — `especificación pasa / runtime falla`

La muestra candidata cumple texto académico 76, oración inicial intacta, alternancia,
diez huecos, mitad de palabra y letras faltantes. El banco actual falla 6/10, género
en 20 bloques, oración inicial en 37/40 —18/20 académicos— y clave en 240. La lección
publicada añade 16 MCQ de palabra completa que tampoco son CTW. Un bloque no se
presenta como forma
completa ni adaptativa.

### 7.3 Editor lingüístico y diseñador instruccional — `v3 pasa documentalmente / banco requiere reparación`

Texto, coherencia, hechos, dificultad inicial y diez reconstrucciones de v3 fueron
revisados manualmente. La auditoría de las 95 oraciones dejó 6/20 pases factuales y
14/20 textos que requieren reparación versionada; ninguno se sobrescribió. Los 16
ejercicios extra tienen claves correctas, pero 81,25 % de A, distractores débiles y
deben reclasificarse como selección léxica. La dificultad entre formas y la
validación empírica quedan para T20/T26.

### 7.4 Auditor técnico, lingüístico y humano de audio — `diferida por el owner`

Complete the Words no usa audio. No se abrió, reprodujo, transcribió, generó ni
modificó ningún MP3. La auditoría humana/Whisper/ElevenLabs permanece al final de la
fase no-audio, como se indicó explícitamente.

### 7.5 Multiperspectiva, anti-sesgo y derechos — `registro pasa / release bloqueado`

El tema es accesible y no exige vivencias particulares. Se preserva el mensaje
personal sin forzarlo dentro del formato académico. La búsqueda externa halló una
oración exacta preexistente en hormigas y otra en glaciares, además de tres familias
stock/cercanas; no prueba copia, pero sí exige reescritura y revisión ampliada. Git
aporta origen interno y un claim de autoría, pero faltan attestation del owner,
revisión de similitud exhaustiva y aprobación independiente. Los 20/20 textos quedan
bloqueados para release.

### 7.6 UI/UX y accesibilidad — `runtime falla con elementos preservables`

Pasan tabulación y reflow básico del runner. Fallan nombre único, contexto audible,
límite de longitud y desactivación de ayudas. En la lección pasan lectura y reflow,
pero 16 grupos de opciones son texto genérico no enfocable: no existe operación con
teclado ni estado accesible de respuesta. El contrato fija los criterios correctivos.

### 7.7 Playwright extremo a extremo — `línea base reproducida / gate falla`

En `http://localhost:3011/examenes/toefl/practica/set-1` se verificaron doce textboxes,
dos etiquetas repetidas por cada número, aceptación de `endextra`, `maxLength = -1`,
`spellcheck = true`, avance de foco por Tab y reflow a 390 px. El contador de Reading
subió al introducir `end`, lo que demuestra captura, pero el código confirma que el
cierre lo compararía contra `weekend`. En la ruta de aprendizaje se verificaron 16
ítems y 32 artículos —banco más clave—, con cero inputs, botones de tarea, radios o
formularios; la respuesta A del primer ítem ya estaba verde. No se ejecutó Listening.

Evidencia visual:

- `output/playwright/toefl-t12-current-complete-the-words-2026-08-09.png`
  — SHA-256 `145363b9912f37a1038b912789dc519c15fadb2fc581abd066543291db0ab029`;
- `output/playwright/toefl-t12-current-complete-the-words-mobile-2026-08-09.png`
  — SHA-256 `261380217231071b39a5b2ba735c47d20463d435007319ce8cbfe870493071f2`.
- `output/playwright/toefl-t12-current-learning-page-item-2026-08-09.png`
  — SHA-256 `5b61e292aecec982c179b8b76ecd21f2a6314db21bd1bdb7592983140f8a0716`;
- `output/playwright/toefl-t12-current-learning-page-item-mobile-2026-08-09.png`
  — SHA-256 `472f991a9cc6e973813dbd343b32e5d8a5ffcee39cd0fbfa2ab1180cbbe24a57`.

## 8. Archivos preservados y huellas iniciales

| Ruta | SHA-256 |
|---|---|
| `src/app/(site)/examenes/[exam]/practica/[mockId]/Toefl2026PracticeClient.tsx` | `ed33cfe60ea8e2922db55111a7209defbae9cf9215bb686a2761e78b6a1ac21b` |
| `src/data/mocks/toefl-set-1.ts` | `f6213c5a1c8638e7fa6a4940196bef91ede57c61f0d7695e2640304e475625db` |
| `src/data/mocks/types.ts` | `c8fca69d7a73f92dfaed6c9095f250e6bdd088a33e6393acac06c4bbc8f7bd13` |
| `src/app/(site)/practica/toefl/reading/formato-2026/complete-the-words/page.tsx` | `29afdf3bed6cc259575322f09adc2e40b89297c39e06ab74f78c1322720be4a3` |
| `src/data/practica-exams/seo-catalog.ts` | `aebd26a1aa6a9cdae60f7b0208c3f5f6c3138889f8aeb4f3ae15efbe888734de` |

Estas huellas deben seguir iguales al cerrar esta ronda documental. Cualquier cambio
concurrente exige detener la futura implementación, inspeccionar el diff y rebasar la
especificación sobre el estado nuevo sin borrar trabajo ajeno.

## 9. Estado y siguiente paso autorizado

Estado de T12: **abierta y detenida antes de código por instrucción del owner**. La
candidata factual v3 está documentada; derechos y revisión independiente siguen
bloqueando release.

El siguiente paso, cuando exista autorización explícita, es una rebanada vertical
pequeña sólo para `t1-r-cw2-v3`: variante de datos derivada, renderer de diez inputs,
scoring de letras faltantes, outcomes/reporte local y pruebas. La misma rebanada debe
corregir el claim de la ruta pública y preservar sus 16 MCQ como práctica A de
selección léxica. No se expande todavía a los otros 19 sets y no se toca audio.
Después de pasar las siete auditorías, T12 puede cerrarse y T13 será la primera unidad
elegible.
