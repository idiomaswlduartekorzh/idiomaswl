# Plan de módulo — `sat-set-1-m2-facil`

**Variante: M2-fácil.** Es la rama **estándar** del módulo 2: la que se sirve a quien no llega al corte del módulo 1.

Dificultad: objetivo **6 fáciles, 16 medios, 5 difíciles**, con media medida ≤ 9,3 en la escala de cinco ejes del calibrador. Esas cifras salen de una medición, no de un deseo: el 13 · 11 · 3 original era **inalcanzable con este reparto de tipos** —once ítems de 27 no pueden bajar de la banda media sin acercar las opciones, que es justo lo que reabre la prueba a ciegas, y tres no pueden bajar de difícil—, así que pedir trece fáciles obligaba a clavar en su mínimo a catorce ítems de quince. Lo que distingue a las dos ramas es la **media**, no la ausencia de los otros niveles: un M2-difícil de 27 ítems difíciles no reproduce el examen, y un M2-fácil sin ningún ítem difícil deja de medir a quien va bien (blueprint §2).

**Y la lección que costó tres calibraciones:** un módulo fácil se escribe fácil desde el primer día. Ablandar ítems ya endurecidos contra la prueba a ciegas no funciona —el margen por texto se agota en tres o cuatro puntos— y aflojar las opciones deshace el trabajo. Si falta banda fácil, se escriben ítems nuevos diseñados para eso.

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

> ⚠️ **q10 y q15 se reescribieron enteros el 22 ago 2026 y sus filas vuelven a decir la medida.**
> No se ablandaron: pasaje, opciones y razones son nuevos, y de cada uno solo se conservaron
> tipo, dominio, tema, **clave** y posición. Medían 13 los dos —el máximo del módulo— y miden
> **8** (q10) y **9** (q15), así que los dos quedan declarados **2**. La fila 15 baja de 3 a 2;
> la 10 ya estaba en 2. Desglose por eje en la cabecera del bloque, «UNDÉCIMA PASADA». Puerta 9
> intacta: `central-ideas-details` q09 2 → q10 2 e `inferences` q14 2 → q15 2. Con eso la cuenta
> declarada del módulo pasa de 8 · 11 · 8 a **8 · 12 · 7**, y en II quedan dos difíciles (q12 y
> q13) en vez de tres. **Los dos ítems vuelven a la cola de auditoría por R2**: la prueba a
> ciegas y la clave única hay que medirlas sobre los abanicos nuevos.

> ⚠️ **Cuarta calibración de CS y EOI, 22 ago 2026 — la banda fácil de lectura deja de estar
> vacía.** De veinte ítems de lectura, **ninguno** estaba en 5-7 contra dos del módulo 1.
> `q01`, `q02` y `q03` medían **8** cada uno, al ras del suelo de la banda media, y bajan a
> **7** por dos ejes y ninguna opción: L en `q02` y `q03` —la evidencia que decide la clave
> pasa a una sola oración pegada al hueco— y T en `q01` —se glosa «transit» y se cae el
> cociente de una parte en diez mil—. La fila 1 no se mueve (el plan ya decía **1**; era el
> `meta` el que declaraba 2 y ahora dice la medida). En EOI, `q25` se reescribió entero
> —pasaje y razones nuevos, **las cuatro opciones intactas**, y conservando tipo, dominio,
> tema, **clave D** y posición— y baja de **11** a **9**. Con esto la cuenta declarada del
> módulo pasa de 8 · 12 · 7 a **9 · 11 · 7** y la media medida baja unos 5 puntos de suma.
> Puerta 9 intacta: `words-in-context` va 1 · 1 · 1 · 1 y `transitions` mide **9 · 9 · 9** en
> el orden en que van, o sea no decreciente —se midió antes de decidir, y por eso **no** se
> intercambiaron `q25` y `q26`, que es lo que habría hecho aplicar la regla de la curva a
> ojo—. Desglose por eje en «DUODÉCIMA PASADA» (bloque CS) y «CALIBRACIÓN, cuarta pasada»
> (bloque EOI). Por R2 los cuatro vuelven a la cola de auditoría.

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
| 15 | `q15` | II | `inferences` | humanidades | 2 | **C** |
| 16 | `q16` | SEC | `boundaries` | historia | 1 | **A** |
| 17 | `q17` | SEC | `form-structure-sense` | ciencia | 1 | **C** |
| 18 | `q18` | SEC | `boundaries` | humanidades | 1 | **A** |
| 19 | `q20` | SEC | `boundaries` | historia | 1 | **C** |
| 20 | `q19` | SEC | `form-structure-sense` | humanidades | 2 | **B** |
| 21 | `q21` | SEC | `form-structure-sense` | ciencia | 2 | **D** |
| 22 | `q22` | SEC | `boundaries` | humanidades | 2 | **B** |
| 23 | `q23` | EOI | `rhetorical-synthesis` | humanidades | 3 | **D** |
| 24 | `q24` | EOI | `rhetorical-synthesis` | historia | 3 | **A** |
| 25 | `q26` | EOI | `transitions` | literatura | 2 | **C** |
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
