# Plan de módulo — `sat-set-1-m2-dificil`

**Variante: M2-difícil.** Es la rama **exigente** del módulo 2: la que se sirve a quien llega o pasa al corte del módulo 1.

**Estado:** implementado y firmado el 23 de agosto de 2026 en
`src/data/mocks/sat/sat-set-1-m2-dificil.ts`. Acta:
`docs/sat-auditorias/sat-set-1-m2-dificil.json`.

Dificultad: **3 fáciles, 10 medios, 14 difíciles**. Lo que distingue a las dos ramas es la **media**, no la ausencia de los otros niveles: un M2-difícil de 27 ítems difíciles no reproduce el examen, y un M2-fácil sin ningún ítem difícil deja de medir a quien va bien (blueprint §2, «Módulo 1 vs módulo 2»).

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
| 1 | `q01` | CS | `words-in-context` | ciencia | 2 | **C** |
| 2 | `q02` | CS | `words-in-context` | literatura | 2 | **D** |
| 3 | `q03` | CS | `words-in-context` | humanidades | 3 | **B** |
| 4 | `q04` | CS | `words-in-context` | historia | 3 | **A** |
| 5 | `q05` | CS | `text-structure-purpose` | ciencia | 2 | **A** |
| 6 | `q06` | CS | `text-structure-purpose` | literatura | 3 | **B** |
| 7 | `q07` | CS | `text-structure-purpose` | humanidades | 3 | **D** |
| 8 | `q08` | CS | `cross-text-connections` | humanidades | 3 | **C** |
| 9 | `q09` | II | `central-ideas-details` | ciencia | 1 | **A** |
| 10 | `q10` | II | `central-ideas-details` | literatura | 2 | **D** |
| 11 | `q11` | II | `command-of-evidence-textual` | humanidades | 2 | **B** |
| 12 | `q12` | II | `command-of-evidence-textual` | historia | 3 | **C** |
| 13 | `q13` | II | `command-of-evidence-quantitative` | ciencia | 3 | **C** |
| 14 | `q14` | II | `inferences` | literatura | 2 | **A** |
| 15 | `q15` | II | `inferences` | humanidades | 3 | **B** |
| 16 | `q16` | SEC | `boundaries` | historia | 1 | **B** |
| 17 | `q17` | SEC | `form-structure-sense` | ciencia | 2 | **D** |
| 18 | `q18` | SEC | `boundaries` | humanidades | 2 | **C** |
| 19 | `q19` | SEC | `form-structure-sense` | humanidades | 3 | **A** |
| 20 | `q20` | SEC | `boundaries` | historia | 3 | **C** |
| 21 | `q21` | SEC | `form-structure-sense` | ciencia | 3 | **D** |
| 22 | `q22` | SEC | `boundaries` | humanidades | 3 | **A** |
| 23 | `q23` | EOI | `rhetorical-synthesis` | humanidades | 2 | **B** |
| 24 | `q24` | EOI | `rhetorical-synthesis` | historia | 3 | **A** |
| 25 | `q25` | EOI | `transitions` | ciencia | 1 | **B** |
| 26 | `q26` | EOI | `transitions` | literatura | 2 | **D** |
| 27 | `q27` | EOI | `transitions` | humanidades | 3 | **B** |

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
