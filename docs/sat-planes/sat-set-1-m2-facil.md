# Plan de módulo — `sat-set-1-m2-facil`

**Variante: M2-fácil.** Es la rama **estándar** del módulo 2: la que se sirve a quien no llega al corte del módulo 1.

Dificultad: **12 fáciles, 10 medios, 5 difíciles** según las etiquetas que hay hoy en el código (era 13 · 11 · 3 antes de la calibración del 22 ago 2026). Lo que distingue a las dos ramas es la **media**, no la ausencia de los otros niveles: un M2-difícil de 27 ítems difíciles no reproduce el examen, y un M2-fácil sin ningún ítem difícil deja de medir a quien va bien (blueprint §2, «Módulo 1 vs módulo 2»).

> ⚠️ **Ese 12 · 10 · 5 está pendiente de re-medición y se espera que vuelva a 12 · 12 · 3.** El
> calibrador midió `q23` y `q24` en 14 —el techo de los dos módulos— y por eso llevan etiqueta 3;
> las dos mediciones son **anteriores** a la rebaja de sus cuadernos de notas, que bajó los textos
> de 144,3 y 146,2 a 122,7 y 115,8 palabras-SAT y adelantó a las tres primeras viñetas los hechos
> que matan a los distractores. Si al re-medir caen por debajo de 13, la etiqueta honrada es 2. No
> se ha bajado a ojo: una etiqueta se cambia con la medida delante, y el 3 es el único número
> firmado que hay.

> ⚠️ **Bloque II (`q09`–`q15`) re-etiquetado el 22 ago 2026, con la medida delante.** Las filas
> 9 a 15 de esta tabla ya no dicen la dificultad del plan: dicen la medida. Cinco números son del
> calibrador tal cual (q09 2, q11 2, q12 3, q13 2, q14 3); dos los remidió el redactor tras bajar
> el pasaje —q10 de 12 a 10, o sea **medio**, y q15 de 14 a 13, que sigue **difícil**— y el
> desglose por eje está en la cabecera de `src/data/mocks/sat/blocks/sat-set-1-m2-facil-ii.ts`,
> «OCTAVA PASADA». Con este bloque re-etiquetado, la cuenta declarada del módulo pasa de
> 12 · 10 · 5 a **8 · 11 · 8**, y tres de los ocho difíciles están en II. El plan pedía tres
> difíciles en el módulo entero: eso ya no se arregla dentro de este bloque, porque bajar más
> exige acercar las opciones entre sí y ahí es donde vive el trabajo contra la prueba a ciegas.
> Es una decisión de módulo.

## Lo que este plan fija y no se negocia ítem a ítem

- **27 ítems, todos puntuables.** Reparto 8 · 7 · 7 · 5, el único que suma 27 dejando los cuatro dominios a menos de dos puntos de su peso oficial.
- **Orden de dominios fijo**: CS → II → SEC → EOI, el mismo que en el módulo 1.
- **Dentro de cada dominio, dificultad creciente.** En CS, II y EOI además agrupada por tipo; SEC es la excepción y va de menos a más sin agrupar.
- **Las claves salen de aquí.** Corregir el reparto después de escribir es lo que fuerza distractores malos (ver `pedagogy_defectos_de_conjunto`).
- **Longitud del texto: 25–150 palabras de 6 caracteres** (caracteres totales ÷ 6). No se estima a ojo.

## El enunciado ya no se elige: lo fija el tipo

Contrastado el 20 ago 2026 con un examen oficial de práctica de College Board. **Es la única parte del examen oficial que se ha usado, y solo para esto: ni un texto ni una pregunta salen de ahí.** Cinco enunciados del módulo 1 estaban desalineados y hubo que rehacerlos; aquí se fijan por adelantado para que no vuelva a pasar.

| tipo | enunciado oficial |
|---|---|
| `words-in-context` | Which choice completes the text with the most logical and precise word or phrase? |
| `text-structure-purpose` | Which choice best describes the overall structure of the text? / Which choice best describes the function of the underlined sentence in the text as a whole? / Which choice best states the main purpose of the text? |
| `cross-text-connections` | Based on the texts, how would the author of Text 2 most likely respond to …? |
| `central-ideas-details` | Which choice best states the main idea of the text? / According to the text, …? |
| `command-of-evidence-textual` | Which finding, if true, would most directly support/weaken …? / Which quotation from … most effectively illustrates the claim? |
| `command-of-evidence-quantitative` | Which choice most effectively uses data from the table to complete the text? |
| `inferences` | Which choice most logically completes the text? |
| `boundaries` | Which choice completes the text so that it conforms to the conventions of Standard English? |
| `form-structure-sense` | Which choice completes the text so that it conforms to the conventions of Standard English? |
| `rhetorical-synthesis` | The student wants to … . Which choice most effectively uses relevant information from the notes to accomplish this goal? |
| `transitions` | Which choice completes the text with the most logical transition? |

⚠️ **No se usa «As used in the text, what does the word X most nearly mean?»**: aparece cero veces en el examen oficial. Es del SAT de papel, anterior al digital.

## Las 27 filas

| nº | id | dominio | tipo | tema | dificultad | clave |
|---|---|---|---|---|---|---|
| 1 | `q01` | CS | `words-in-context` | ciencia | 1 | **B** |
| 2 | `q02` | CS | `words-in-context` | literatura | 1 | **C** |
| 3 | `q03` | CS | `words-in-context` | humanidades | 2 | **D** |
| 4 | `q04` | CS | `words-in-context` | historia | 2 | **A** |
| 5 | `q05` | CS | `text-structure-purpose` | ciencia | 1 | **B** |
| 6 | `q06` | CS | `text-structure-purpose` | literatura | 1 | **C** |
| 7 | `q07` | CS | `text-structure-purpose` | humanidades | 2 | **A** |
| 8 | `q08` | CS | `cross-text-connections` | humanidades | 3 | **D** |
| 9 | `q09` | II | `central-ideas-details` | ciencia | 2 | **B** |
| 10 | `q10` | II | `central-ideas-details` | literatura | 2 | **B** |
| 11 | `q11` | II | `command-of-evidence-textual` | humanidades | 2 | **D** |
| 12 | `q12` | II | `command-of-evidence-textual` | historia | 3 | **C** |
| 13 | `q13` | II | `command-of-evidence-quantitative` | ciencia | 2 | **A** |
| 14 | `q14` | II | `inferences` | literatura | 3 | **A** |
| 15 | `q15` | II | `inferences` | humanidades | 3 | **C** |
| 16 | `q16` | SEC | `boundaries` | historia | 1 | **A** |
| 17 | `q17` | SEC | `form-structure-sense` | ciencia | 1 | **C** |
| 18 | `q18` | SEC | `boundaries` | humanidades | 1 | **A** |
| 19 | `q19` | SEC | `form-structure-sense` | humanidades | 2 | **B** |
| 20 | `q20` | SEC | `boundaries` | historia | 2 | **C** |
| 21 | `q21` | SEC | `form-structure-sense` | ciencia | 2 | **D** |
| 22 | `q22` | SEC | `boundaries` | humanidades | 3 | **B** |
| 23 | `q23` | EOI | `rhetorical-synthesis` | humanidades | 3 | **D** |
| 24 | `q24` | EOI | `rhetorical-synthesis` | historia | 3 | **A** |
| 25 | `q26` | EOI | `transitions` | literatura | 1 | **C** |
| 26 | `q25` | EOI | `transitions` | ciencia | 2 | **D** |
| 27 | `q27` | EOI | `transitions` | humanidades | 3 | **B** |

> **Las filas 25 y 26 llevan a propósito los ids cruzados.** El calibrador midió el grupo de
> transiciones en 11 · 8 · 13 y el plan pide dificultad creciente dentro de cada tipo, así que
> `q25` y `q26` se intercambiaron enteros —objeto de ítem y objeto de meta— y el grupo va ahora
> 8 · 11 · 13. **Los ids no se renumeran**: cambiar `q25` por `q26` en el código deja sin sentido
> las actas, los informes a ciegas y este plan, que se refieren a los ítems por id y no por
> puesto. El puesto es la columna «nº»; el id es el nombre del ítem, y es el nombre lo que no se
> toca.

> **Las claves de esta tabla se rebarajaron el 21 ago 2026, y hay que copiarlas del código
> hacia aquí, nunca al revés.** El reparto original estaba bien en el módulo entero
> —A7 B7 C7 D6— y **apilado dentro de cada bloque**: convenciones tenía la D de clave en
> cuatro de siete y la A en ninguna, y lectura no tenía ni una D en ocho ítems. Marcando
> siempre D se sacaba un 57 % del bloque de gramática sin leer nada, y quien conociera solo
> ese sesgo sacaba un 35,8 % del examen entero.
>
> Lo que enseñó el arreglo: **el reparto se recalcula de una vez sobre los 27, nunca bloque
> a bloque.** Al equilibrar lectura por su cuenta, la D del módulo saltó de 6 a 9 y quedó a
> un ítem de romper el límite por el otro extremo. Cambiar una clave es reordenar las
> opciones de su ítem —y sus razones, que viajan con la opción—, no reescribir nada.
>
> El guardián ya cuenta por dominio desde `df7bac77`: ninguna letra puede faltar en un
> bloque de cuatro ítems o más, ni pasar del 40 %.

## Reparto de claves

| letra | veces | % |
|---|---|---|
| A | 7 | 25.9 % |
| B | 7 | 25.9 % |
| C | 7 | 25.9 % |
| D | 6 | 22.2 % |

Dentro del 20–30 % que exige la puerta 1, sin tres claves iguales seguidas, y sin calcar la secuencia del módulo 1.

## Las tres reglas que más ítems han devuelto

Salen de haber escrito el módulo 1, no de teoría. Están enteras en `docs/sat-ingles-blueprint.md` §4 bis.

1. **R8 · el juego de opciones se diseña antes de decidir la clave.** Cuatro objetos indistinguibles primero; solo después se mira cuál sostiene el texto. Es lo que bajó la prueba a ciegas veinte puntos de una sola pasada.
2. **Ningún distractor muerto, y ninguno sinónimo de otro.** Para cada opción hay que poder escribir la frase «el estudiante que elige esta es el que…». Si no se puede, fuera. Y dos sinónimos se cancelan entre sí: el que quedó suelto gana sin leer — así se perdió `q01`.
3. **La clave no puede ser la lectura más interesante.** Si de las cuatro opciones una suena a «la respuesta lista», se adivina sin texto por muy bien escrito que esté el pasaje.
