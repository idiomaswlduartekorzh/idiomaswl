# TOEFL iBT 2026 — calidad y reutilización del banco Complete the Words

> `artifact_id`: `toefl-2026-ctw-bank-quality-audit`
>
> `artifact_version`: `2026-08-09.v2`
>
> `grain`: un registro por bloque fuente Complete the Words
>
> `population`: 40 bloques, dos por cada uno de los 20 sets
>
> `official_rule`: `CTW-OF-001`
>
> `source_snapshot`: `50b3b8d7dd04826cf625052e7910b844c305894d43b2eae5fda01f881d3d512d`
>
> `block_text_fingerprint`: `bb2bfbff86dc717a9e87a0cca3e4428276e02481e0c85f6079534a9215ab06c8`
>
> `verified_at`: 9 de agosto de 2026
>
> `status`: auditoría documental cerrada; implementación y release bloqueados

Este informe amplía la fase documental de T12 sin modificar código, contenido fuente,
scoring, persistencia ni audio. La matriz canónica por bloque está en
`docs/toefl-2026-complete-the-words-bank-quality-audit-2026-08-09.tsv`.

## Resumen técnico

- **Ninguno de los 40 bloques actuales es Complete the Words fiel.** Todos presentan
  seis huecos, guardan la palabra completa como clave y dependen del scorer
  incompatible ya documentado. El requisito público es un texto académico de unas
  70–100 palabras con primera oración intacta y diez palabras parcialmente
  incompletas.
- **El banco escrito sí permite una preservación alta.** Los 20 textos personales se
  conservan fuera de CTW como práctica A; los 20 textos académicos se preservan como
  fuentes para variantes derivadas. No se propone borrar ni sobrescribir ninguno.
- **La longitud no equivale a preparación.** Diecisiete de los 20 académicos están en
  70–100 palabras y catorce permiten derivar mecánicamente diez posiciones bajo la
  regla conservadora. Tres textos dentro del rango producen una palabra de una letra
  o con apóstrofo; ETS no publicó en las fuentes revisadas cómo adjudicar esos casos.
  Otros tres académicos tienen 58, 67 y 67 palabras.
- **La auditoría factual completa cambia la candidata del Set 1.** Sólo 6/20 textos
  académicos pasan en alcance general y 14 necesitan reparación. El Sol requiere
  `plasma` y limitar un absoluto sobre toda vida; `t1-r-cw2-v3` incorpora ambos
  cambios, queda en 76 palabras y conserva la máscara. Además, el texto de volcanes
  del Set 8 contiene una construcción no natural, el claim del Set 19 dice “student”
  aunque la voz declara ser docente y un par de mensajes de calefacción presenta
  similitud interna alta.
- **La procedencia interna se recuperó para 40/40 bloques, pero 0/40 pasa derechos.** Instrucción y template de
  todos ellos apuntan al commit `58c2fb0c84f955b1c249708b0fbd1bf0dbb14e43`, cuyo
  mensaje declara contenido original WeLearn y coautoría de Claude Opus 4.8. Esto
  mejora la trazabilidad, pero no sustituye attestation del owner, licencia,
  comprobación de similitud ni aprobación independiente.

## Hallazgos que gobiernan la decisión

| ID | Severidad | Confianza | Qué falló y evidencia | Riesgo | Remediación mínima |
|---|---|---|---|---|---|
| `DQ-CTW-001` | Crítica | Alta | 0/40 bloques tienen diez huecos; 40/40 tienen seis y 240/240 claves almacenan palabra completa. | La interacción solicita una unidad y el scorer evalúa otra; el resultado no es confiable. | Implementar la variante del Set 1 con diez claves de letras faltantes y outcomes por hueco. |
| `DQ-CTW-002` | Alta | Alta | 20/40 estímulos son mensajes, reseñas o solicitudes personales. | Se presenta como CTW oficial una tarea cuyo estímulo no coincide con el texto académico descrito por ETS. | Reclasificar los 20 como práctica A y mantenerlos fuera del denominador CTW. |
| `DQ-CTW-003` | Alta | Alta | 17/20 académicos miden 70–100 palabras; los Sets 9, 16 y 20 miden 58, 67 y 67. | Tres fuentes no alcanzan siquiera el rango aproximado para una variante oficial. | Crear versiones reparadas y trazables; no rellenar ni sobrescribir el original. |
| `DQ-CTW-004` | Alta | Media-alta | Entre los 17 académicos de longitud elegible, tres producen `a` o `water's` en una posición objetivo. Las fuentes ETS revisadas no explican una excepción para una letra o apóstrofo. | Una derivación automática podría crear un input sin prefijo visible o mezclar puntuación con la respuesta. | Fallar cerrado y adjudicar la tokenización; no inventar una regla local atribuida a ETS. |
| `DQ-CTW-005` | Alta | Alta | Sólo 2/20 académicos conservan actualmente intacta su primera oración; 18 contienen al menos un hueco allí. | Se elimina el contexto que ETS conserva antes de comenzar la alternancia. | Derivar la máscara desde el texto reconstruido, nunca reciclar las posiciones legacy. |
| `DQ-CTW-006` | Alta | Alta | `t8-r-cw2` dice `reaches onto the surface`; `t19-r-cw1` anuncia un estudiante, pero el emisor dice ser docente; `t20-r-cw1` tiene `bag → bag`. | Lenguaje no natural, claim contradictorio y hueco sin respuesta respectivamente. | Reparar en versiones nuevas antes de reutilizar; conservar el original y su hallazgo. |
| `DQ-CTW-007` | Media | Alta | `t4-r-cw1` y `t6-r-cw1` son el único par de 780 con Jaccard de trigramas ≥0,10 y coseno ≥0,70: 0,2427 y 0,8080. | Exposición redundante y falsa amplitud del banco. | Adjudicar cuál función pedagógica conserva cada uno o retirar una variante de nuevas composiciones sin borrar fuente. |
| `DQ-CTW-008` | Alta | Alta | Una consulta distintiva por cada académico encontró una oración exacta preexistente en `t4-r-cw2` y otra en `t16-r-cw2`; además, `t13`, `t17` y `t20` usan formulaciones stock/cercanas. | Aunque no demuestra copia, reutilizar esa redacción sin reescribir crea riesgo de derechos y de baja originalidad. | Reescritura independiente, búsqueda ampliada, attestation y segunda aprobación. |
| `DQ-CTW-009` | Alta | Alta | 40/40 tienen origen Git interno, pero 0/40 objetos guardan autoría, licencia, attestation o segunda aprobación como campos. | El historial puede perderse al migrar el contenido y no prueba por sí solo los derechos. | Materializar el registro de derechos por objeto antes de cualquier publicación del derivado. |
| `DQ-CTW-010` | Alta | Alta | La revisión de 95 oraciones contra fuentes primarias deja 6/20 pases factuales generales y 14/20 reparaciones de definición, absoluto, evidencia o alcance. | Una máscara técnicamente correcta puede evaluar vocabulario sobre una premisa falsa o engañosa. | Conservar cada fuente y crear versión B reparada antes de derivar C; usar la matriz factual como gate. |

## Alcance, datos y definiciones

La población son los dos objetos `wordcomplete` de cada archivo
`src/data/mocks/toefl-set-1.ts` a `toefl-set-20.ts`. El grano es un bloque fuente, no
un hueco: 40 filas, 20 académicas y 20 personales. Los 240 huecos legacy siguen
inventariados en T03/T05 y no se confunden con las 200 posiciones candidatas de los
20 textos académicos.

Definiciones operativas:

- `official_genre_match`: el estímulo se presenta como texto académico;
- `official_length_match`: conteo por tokens separados por espacio entre 70 y 100,
  inclusive; es una operacionalización de “about 70–100”, no un umbral psicométrico;
- `current_first_sentence_blank_count`: placeholders legacy antes del primer final de
  oración, ignorando abreviaturas de tratamiento comunes;
- `mechanically_derivable`: texto académico de 70–100 palabras con diez objetivos en
  posiciones pares 2–20 posteriores a la primera oración y tokens alfabéticos de dos
  o más letras;
- `candidate_token_issue`: caso que la regla pública no permite resolver sin una
  decisión adicional; no significa que ETS necesariamente rechace el texto;
- clase A/B/C/D/E: acción de preservación del documento maestro, no nivel de
  fidelidad del producto ni estado de release.

Fuentes oficiales vigentes utilizadas:

- [Updated TOEFL iBT Test Overview](https://www.ets.org/content/dam/ets-org/pdfs/toefl/toefl-ibt-test-overview.pdf): género, longitud, oración inicial, alternancia,
  diez palabras y unidad de respuesta;
- [ETS — Validity by Design](https://www.ca.ets.org/content/ets-org/br/en/home/toefl/blog/ibt-validity-by-design.html): segunda mitad de cada segunda palabra y constructo C-test;
- [TOEFL iBT Practice Test 2](https://www.ets.org/pdfs/toefl/toefl-ibt-full-length-practice-test-2.pdf): dos muestras de diez respuestas y advertencia de que el papel no es réplica exacta.

Las muestras oficiales revisadas usan objetivos alfabéticos de al menos dos letras,
pero eso no demuestra una política general de exclusión. La ausencia de una excepción
pública para `a` o `water's` se registra como incertidumbre, no como regla ETS nueva.

## Los académicos: catorce máscaras mecánicas, pero no catorce ítems aprobados

| Bloque | Palabras | Máscara candidata | Hallazgo previo a derivar | Acción de preservación |
|---|---:|---|---|---|
| `t1-r-cw2` | 79 | Mecánica | `gas`/absoluto sobre vida requieren reparación | B — `v3` factual de 76 palabras y luego C |
| `t2-r-cw2` | 76 | Mecánica | Huddling y clima necesitan alcance por especie | B — precisar y luego C |
| `t3-r-cw2` | 77 | Mecánica | `known universe` no es verificable | B — reparar superlativo y luego C |
| `t4-r-cw2` | 72 | Tokenización pendiente | `a`; absoluto reproductivo; oración exacta preexistente | B — hechos, reescritura, token y luego C |
| `t5-r-cw2` | 79 | Mecánica | Evidencia humana y ranking de rutina sobredichos | B — calificar evidencia y luego C |
| `t6-r-cw2` | 70 | Tokenización pendiente | `a`; declive de abejas globalizado | B — precisar población, token y luego C |
| `t7-r-cw2` | 72 | Mecánica | Pase factual general; derechos pendientes | C — derivar tras derechos |
| `t8-r-cw2` | 70 | Mecánica | Gramática y garantía implícita de pronóstico | B — reparar versión y luego C |
| `t9-r-cw2` | 58 | Longitud y token bloquean | Pase factual; corto; objetivo `a` | B — extender, adjudicar y luego C |
| `t10-r-cw2` | 78 | Mecánica | Pase factual general; derechos pendientes | C — derivar tras derechos |
| `t11-r-cw2` | 81 | Mecánica | Definición de desertificación incorrecta | B — reparar definición y luego C |
| `t12-r-cw2` | 75 | Mecánica | La Luna sí tiene una exosfera tenue | B — precisar atmósfera y luego C |
| `t13-r-cw2` | 75 | Mecánica | Estimación/escope y frase stock | B — precisar y reescribir antes de C |
| `t14-r-cw2` | 71 | Tokenización pendiente | Pase factual; objetivo `water's` | C — adjudicar y resolver derechos |
| `t15-r-cw2` | 72 | Mecánica | Escape se confunde con ciclo de vida | B — precisar y luego C |
| `t16-r-cw2` | 67 | Longitud y token bloquean | Pase factual; corto; `a`; oración exacta preexistente | B — extender, reescribir, adjudicar y luego C |
| `t17-r-cw2` | 77 | Mecánica | Redes de captura y propiedad del material imprecisas; frase stock | B — precisar y reescribir antes de C |
| `t18-r-cw2` | 84 | Mecánica | Absoluto falso sobre agua dulce y toda vida | B — reparar y luego C |
| `t19-r-cw2` | 73 | Mecánica | Pase factual general; derechos pendientes | C — derivar tras derechos |
| `t20-r-cw2` | 67 | Longitud bloquea | Ciclo de vida/tendencia y frase stock | B — reparar longitud, hechos y redacción antes de C |

Las catorce máscaras mecánicas producen 140 reconstrucciones exactas bajo la regla
documental. No son 140 ítems listos para release: únicamente `t1-r-cw2-v3` tiene una
reparación factual y adjudicación editorial específica para piloto; aun éste conserva
derechos y revisión independiente pendientes. El detalle de 95 oraciones y sus
fuentes está en la auditoría factual/derechos adjunta.

## Los 20 textos personales se conservan fuera de CTW

Seis mensajes miden 70–100 palabras (`t2`, `t4`, `t14`, `t17`, `t18` y `t19`), pero
la longitud no corrige el género. Dieciséis pueden preservarse directamente como
fuentes para práctica A de comunicación/vocabulario. Cuatro necesitan reparación:

| Bloque(s) | Hallazgo | Decisión |
|---|---|---|
| `t4-r-cw1`, `t6-r-cw1` | Dos solicitudes de reparación de calefacción con similitud interna alta | B — adjudicar redundancia y luego reclasificar |
| `t19-r-cw1` | Instrucción dice estudiante; el texto dice docente | B — corregir claim en versión nueva y reclasificar |
| `t20-r-cw1` | Un hueco conserva `bag` completo y no pide letras | B — reparar la práctica derivada y reclasificar |
| Otros 16 | Lenguaje inicialmente natural; no son texto académico CTW | C — preservar y reclasificar como práctica A |

No se recomienda convertir estos mensajes en académicos mediante reescritura. Eso
destruiría el activo que ya existe y ocultaría que el banco necesita más CTW académico,
no mensajes disfrazados.

## Procedencia, similitud y derechos

`git blame` confirma que la línea de instrucción y la línea de template de 40/40
bloques proceden de `58c2fb0c84f955b1c249708b0fbd1bf0dbb14e43`, creado por José
David Duarte Silva el 23 de julio de 2026. El mensaje del commit declara “contenido
original WeLearn” y registra coautoría de Claude Opus 4.8.

La revisión interna comparó 780 pares mediante coseno de frecuencia léxica y Jaccard
de trigramas. Sólo el par `t4-r-cw1`/`t6-r-cw1` superó simultáneamente 0,70 y 0,10.
No existen hashes de texto completo duplicados.

La revisión externa buscó una frase distintiva de cada uno de los 20 académicos. No
encontró un bloque completo idéntico, pero sí la oración de `t4-r-cw2` sobre
comunicación por feromonas en una publicación de 2025 y la oración de `t16-r-cw2`
sobre desplazamiento de pocos centímetros al día en National Geographic, ambas
anteriores al commit fuente. También encontró formulaciones stock o cercanas en
rainforests, arañas y energía renovable; por ejemplo, este
[material educativo de energía de 2022](https://ngridenergyworld.com/wp-content/uploads/2022/08/37665_NGrid_S_REW_bk_el_0922.pdf).

Ese resultado no prueba copia ni originalidad. El buscador no es un corpus exhaustivo,
las frases científicas pueden ser convencionales y la fecha indexada puede no ser la
fecha de creación. Por eso 40/40 quedan
`internal_origin_pending_owner_attestation_similarity_and_independent_review`.

## Método y controles de robustez

1. Se importaron los 20 módulos actuales con el stripping nativo de TypeScript de
   Node y se reconstruyó cada texto reemplazando `{{n}}` por la respuesta fuente.
2. Se midieron conteos, hashes, blanks, posición de primera oración y compatibilidad
   de longitud del prefijo legacy.
3. Sólo en los 20 académicos se derivaron posiciones pares 2–20 después de la primera
   oración. Prefijo más letras faltantes debe reconstruir exactamente el token.
4. Una palabra de una letra o con puntuación interna falla cerrado como
   `candidate_token_issue`; no se salta ni se recoloca sin una regla aprobada.
5. Se compararon 780 pares internos y se ejecutó una consulta externa distintiva por
   cada texto académico; las búsquedas siguen siendo una muestra y se rotulan como tal.
6. Se trazaron instrucción/template por `git blame`, además del hash de cada texto y
   fingerprints agregados.
7. Una segunda matriz contrastó las 95 oraciones académicas con fuentes primarias y
   registró pase, reparación, similitud, representación, reutilización y release.

No se incluyó un gráfico: con 40 filas y excepciones nominales, la decisión depende de
IDs, reglas y acciones exactas. Un gráfico resumiría los conteos, pero ocultaría qué
bloques necesitan tokenización, reparación factual o reclasificación; las tablas y el
TSV son la representación más fiel.

### Corrección de una métrica anterior

La primera ronda informó 5/40 primeras oraciones intactas. El detector trataba `Ms.`
y `Mr.` como finales de oración en `t7-r-cw1` y `t14-r-cw1`. Tras ignorar
abreviaturas de tratamiento, el resultado reproducible es 3/40 en todo el banco y,
para la población realmente elegible, 2/20 académicos (`t10-r-cw2` y `t18-r-cw2`).
La decisión central no cambia; la evidencia se corrige antes de implementación.

## Limitaciones e incertidumbre

- El rango 70–100 es aproximado y el conteo por espacios es una convención auditable,
  no el ensamblador interno de ETS.
- Las fuentes públicas revisadas no especifican el tratamiento de palabras de una
  letra, contracciones, posesivos, guiones o números. Las cinco ocurrencias afectadas
  permanecen sin derivar.
- La revisión factual de 20/20 textos ya está completa documentalmente, pero no
  sustituye revisión experta independiente, nivel de lectura ni pilotaje.
- La búsqueda externa es muestral. Ningún `no exact match` libera derechos.
- No existe segunda persona revisora ni datos de estudiantes; dificultad,
  discriminación y funcionamiento diferencial siguen sin validación.
- No se modificó ni se volvió a ejecutar la UI: la evidencia Playwright vigente sigue
  describiendo el runtime anterior y T12 permanece abierta.

## Próximos pasos recomendados

1. Obtener attestation del owner y revisión independiente de `t1-r-cw2-v3`.
2. Cuando el owner autorice código, implementar sólo la rebanada Set 1 con diez
   inputs, letras faltantes, outcomes por ID y disclosure de práctica A parcial.
3. Preservar los 16 MCQ de la página pública y los 20 textos personales en prácticas
   A correctamente rotuladas; no mezclarlos en CTW oficial.
4. Después de cerrar T12, usar ambas matrices como entrada de T20: reparar primero
   las dos coincidencias exactas, los claims de alta severidad, los tres textos
   cortos, la gramática del Set 8 y los casos de tokenización; generar contenido sólo
   para brechas E demostradas.
5. Convertir las reglas estables en tests cuando exista autorización de código:
   unicidad, 10 targets, primera oración intacta, reconstrucción, longitud de input,
   género/longitud, claves de letras faltantes y rights gate.

## Preguntas que siguen abiertas

- ¿Existe una regla ETS no publicada en las fuentes revisadas para saltar o tratar
  palabras de una letra y tokens con apóstrofo?
- ¿El owner puede atestiguar la cadena de creación y derechos del commit `58c2fb0`?
- ¿Los dos mensajes de calefacción deben servir objetivos pedagógicos distintos o una
  variante debe retirarse de nuevas composiciones?
- ¿Qué segunda persona adjudicará lenguaje, hechos, máscaras y derechos antes del
  piloto y firmará la revisión de las 95 oraciones?

## Estado de T12

Esta auditoría documental está completa, pero T12 continúa `[ ]`. Su gate exige
interacción y scoring fieles, que no existen y que no se implementan sin autorización
explícita. Complete the Words no usa audio; la escucha humana, Whisper y ElevenLabs
permanecen al final de la fase no-audio por decisión del owner.
