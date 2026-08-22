# Fase 13 · Calcabilidad con las tablas `Say it here` DENTRO — escenario 8, `cancel-the-gym-i-am-leaving`

**Auditado:** `artifacts/habla-a2/fase7-fichas-8-cancel-the-gym-i-am-leaving.md` **tal como está hoy
en disco** (22 ago 2026, árbol de trabajo sobre `0a57fe20`). No se ha tocado ni una letra del archivo.

**Contra:** `artifacts/habla-a2/fase10-calcable-8.md` (1 decible viva + 1 reserva) y el método de
`artifacts/habla-a2/fase12-calcable-3.md`.

**Alcance, ampliado por §11 del blueprint (commit `a677b077`):** prosa de las dos fichas, `Facts`,
vocabulario, **las dos tablas `Say it here`**, la carta de Édison y `Both screens — how it ends`.
Fuera: el debrief en español, `grammarReferences` y las notas de corrección (salvo una cita
arrastrada que se señala al final).

**Contador vivo, ejecutado hoy** (`node artifacts/habla-a2/fase7-scripts/prosa-canonica.mjs`):
**ROLE A 449 · ROLE B 450**, techo 450. Las dos cifras que declara el archivo en su tabla de
presupuesto (línea 271-272) coinciden con la medición: **no están caducadas**. B sigue **clavada en
el techo**: cero palabras de aire.

---

## Veredicto

**PASA CON CAMBIOS · 2 líneas decibles sobre 145 unidades · 2 defectos estructurales en las tablas
de exponentes.**

145 unidades = 63 oraciones de prosa de rol (32 A + 31 B) + 20 filas de `Facts` + 20 filas de
vocabulario + **16 filas de exponentes (8 + 8), contadas por primera vez en este escenario** + 13
unidades de la carta (4 filas + 9 oraciones) + 13 líneas de `how it ends`.

**Lo que sigue vivo de la pasada anterior:** de los nueve hallazgos de `fase9-calcable-8.md` que
verificó la fase 10, **el único que quedaba a medias —el n.º 5— está arreglado**. La línea
`Édison reads a reason on that form, and never a destination.` ya no existe; en su sitio (l. 120)
está `You can ask her for a reason, and never a destination.`, que es la reescritura que la fase 10
propuso y que sí se cae al decirse. **Lo que no se aplicó es la reserva del n.º 7**, que la fase 10
dejó anotada y contada como arreglada «por consistencia»: hoy se cuenta, porque es decible en cuanto
la conversación llega a Wilmer, y llegar a Wilmer está en el diseño. Es el **hallazgo 2** de abajo.

Las dos tablas de exponentes **nunca se habían mirado**: `fase12-tablas.md` normalizó las de los
escenarios 2, 5, 6 y 7, y `fase12-calcable-3.md` la del molde. El 8 se quedó fuera de las dos
pasadas. Ahí están los dos defectos estructurales, y ninguno cuesta prosa.

---

## 1 · Hallazgo 1 — la carta dice una frase entera, y es justo la que ella necesita

**Literal, línea 190, tabla de la carta de Édison:**

> `| The charge on the 5th, bounced | **collections on the 12th** · the system, on its own · a transfer before the 12th stops it |`

**Sitio:** `## The card — Mauricio's screen only`, tercera fila.

Las otras once celdas de esa tabla son notas: `none authorized · not one`, `up to 60 days`,
`not Thursday — inventory count`. Esta no. `a transfer before the 12th stops it` es
sujeto + verbo conjugado + objeto, tercera persona, **sin una sola deixis que la rompa**: Mauricio
la levanta de la pantalla, la dice tal cual y le entrega a Tatiana exactamente el dato que el
arreglo de equidad N4 metió en el escenario —que el cobro se puede pagar desde donde esté—. El
turno avanza. Es el mismo mecanismo que la fase 10 declaró fatal en su hallazgo 5, y aquí vive en
una tabla, donde §11 prohíbe las frases sin matices: *«En las tablas se escribe en notas, no en
frases»*.

**Arreglo, 7 → 6 palabras** (la fila empieza por `|`, así que no cuesta prosa en ningún caso):

> `| The charge on the 5th, bounced | **collections on the 12th** · the system, on its own · only a transfer before the 12th |`

Sin verbo conjugado, mismo contenido, y la elipsis obliga a Mauricio a construir el verbo en voz
alta. Si se prefiere igual número de palabras: `a transfer before the 12th, nothing else` (7),
que además calca la fila `If the charge bounces` de los datos de Tatiana y refuerza el paralelismo.

---

## 2 · Hallazgo 2 — el secreto de Wilmer se puede leer en cuanto Tatiana lo nombra

**Literal, línea 126, ROLE B · `Only you know`, cuarta viñeta:**

> `- You know why Wilmer is gone: he promised three or four members a cancellation, and could not give it. You know he wasn't the only one.`

**Sitio:** prosa de Mauricio, dato oculto.

`You know why…` es en inglés un giro retórico de apertura, no un anclaje: lo que sigue a los dos
puntos es tercera persona pura sobre un tercero que no está en la sala. Tatiana trae a Wilmer en su
propia viñeta 2 —*«**Wilmer** sold you the plan and promised you out loud…»*—, o sea que el diseño
garantiza que su nombre sale. En cuanto sale, Mauricio levanta la línea entera de la pantalla, la
dice tal cual, y **entrega su secreto completo**: por qué Wilmer se fue y que no fue el único. El
turno avanza. La fase 10 la contó como «arreglada con reserva» y escribió la reserva; la reserva
sigue en pie sobre el mismo texto.

Decibilidad condicionada al estado de la conversación es decibilidad: la prueba de §11 no dice
«desde el primer turno».

**Arreglo, 26 → 18 palabras** (ROLE B, estrictamente menos, y sobra para pagar el hallazgo 4):

> `- Wilmer promised three or four members a cancellation, he is gone, and the others still work with you.`

Una sola oración —no dos, para no repetir el fallo de N3, N8 y N9, que fue partirlas y dejar la
primera mitad suelta—, y la coordinada final aterriza en un `you` que apunta a quien escucha: dicha
a Tatiana, «the others still work with you» es falsa y la línea se cae. Conserva las dos piezas del
secreto (el motivo y que no fue el único) y añade cero información nueva.

---

## 3 · Hallazgo 3 (estructural) — la tabla de Mauricio no está en orden alfabético

**Literal, líneas 173-174, ROLE B · `Say it here`:**

> `| talking about the paper | …`
> `| taking her side | …`

`taking` va **antes** que `talking` (`k` < `l`). Son las dos últimas filas de la tabla, y están
cambiadas. Es incumplimiento directo de §11 —*«agrupada por función y ordenada alfabéticamente por
función»*— y no es cosmético: el orden alfabético es la única herramienta que tiene el formato para
desordenar la conversación, y una tabla que casi está ordenada invita a leerla como lista.

**Arreglo: intercambiar las dos filas enteras. Cero palabras, cero prosa.** Orden resultante:
*asking again for the reason · asking her for something · buying yourself a turn · dictating a
number · offering another way · saying no with a door open · **taking her side** · **talking about
the paper***.

Comprobado que el intercambio **no crea guion**: la cola queda `saying no with a door open → taking
her side → talking about the paper`, que en la mesa es no → disculpa → papel, mitad de la
conversación y ni arranque ni cierre. El cierre de Mauricio (firmar y dictar) sigue repartido entre
las filas 2 y 4, con `buying yourself a turn` intercalada.

---

## 4 · Hallazgo 4 (estructural) — las dos cabeceras no dicen que el andamiaje es opcional

**Literal, líneas 90 y 163:**

> `### Say it here — grouped by job, not in order · **don't read it out loud**`

**Sitio:** cabecera de las dos tablas de exponentes.

`fase12-tablas.md` §2 dejó las ocho cabeceras de los escenarios 2, 5, 6 y 7 idénticas y con las
**tres** advertencias, porque §10-§11 exigen que el andamiaje se declare opcional:

> `### Say it here — grouped by job, not in order · use it or don't · **don't read it out loud**`

El escenario 8 se quedó fuera de aquella pasada y le falta `use it or don't`. Sin esa línea, la
tabla se lee como lista de tareas: es la mitad barata de la defensa contra el guion, y la otra
mitad —el alfabético— la acaba de fallar el rol B.

**Arreglo: añadir `use it or don't ·` a las dos cabeceras. +5 fichas de contador cada una** (el `·`
cuenta como palabra en `prosa-canonica.mjs`, y las cabeceras `###` **sí** entran en el conteo). No
es gratis, y por eso va con su corte pagado en el mismo informe:

| | hoy | corte | cabecera | queda |
|---|---|---|---|---|
| ROLE A | 449 | −4 (h. 5, abajo) −4 (`Tuesday, 6:40 p.m.` de `Where you are`) | +5 | **446** |
| ROLE B | 450 | −8 (hallazgo 2) | +5 | **447** |

El corte de A no quita ninguna pieza: `· Tuesday, 6:40 p.m.` de la línea 36 repite literalmente la
fila `Now` de su propia tabla de datos (`Tuesday, August 25, 6:40 p.m.`), que es el mismo argumento
con el que la fase 9 le quitó a Mauricio `four people are in line`. Se corta prosa, no piezas.

---

## 5 · Al filo — señaladas y no contadas

| dónde | literal | por qué no cuenta, y qué haría falta |
|---|---|---|
| **A · `Only you know` 1 (l. 50)** | `Say it too early and it sounds like a plan to stop paying. You choose the moment.` | son instrucciones al jugador dentro de una viñeta de dato oculto, y sobreviven la inversión: dichas a Mauricio son gramaticales. No avanzan turno porque no llevan contenido del escenario —es el caso de `That is the plan.` del molde—. **Aun así, `You choose the moment.` sobra**: la frase anterior ya dice que revelarlo pronto le cuesta caro. Quitarla son 4 palabras, y son las que pagan la cabecera de A (hallazgo 4) |
| **B · `Only you know` 1 (l. 123)** | `Without that number she misses the cut-off and pays **92,000** more.` | única oración **autónoma y en tercera persona** de toda la prosa de Mauricio. Lo que la salva es que el sujeto `she` **es la persona a la que le hablaría**: dicha a Tatiana, la referencia se rompe y ella preguntaría «¿quién?». Es la misma protección que la fase 10 aceptó en `…and she will think a case is a cancellation.` No cuenta, pero **es la línea que hay que mirar primero la próxima vez que alguien parta una oración de esta viñeta en dos** |
| **A · tabla, filas 3-4-5** | `asking for a way out` → `checking what you heard` → `copying it down` | tres filas contiguas que pertenecen las tres al desenlace (`What will happen if…?` = el 5 y el 12; `So it's …, on the …?` = el «says them back» del cierre; `Let me copy…`). No es guion porque **el orden interno está invertido**: en la mesa se copia y después se devuelve, y la tabla las da al revés. Si se quiere margen, la etiqueta `checking what you heard` → `the number and the date, back` la manda a la fila 7 (entre `saying what it costs you` y `the paper you can't hand over`) y deja `copying it down` sola. Cero prosa |
| **B · tabla, filas 2 → 4** | `asking her for something` (`Can you sign here, next to…?`) … `dictating a number` (`Write this down, please: …`) | firmar y dictar son los dos movimientos del cierre de Mauricio y salen en el orden de la mesa, pero con `buying yourself a turn` intercalada. El criterio de `fase12-tablas.md` («sin nada intercalado») se cumple por una fila |
| **B · tabla, fila 2, glosa** | `what opens the case and ends the visit` | nombra el cierre, que es lo que `fase12-tablas.md` §1 borró en los escenarios 2 y 5 («that's point 3 of the close»). Aquí no da número de punto ni contenido, así que es nota de propósito legítima. Al filo |
| **A · vocabulario, `to cancel a plan`** | `what you came for — careful: in Spanish *cancelar* can mean *to pay*` | lleva una cláusula conjugada, pero es metalingüística y en español: no se puede decir en el mostrador y no avanza nada. Es además el aviso de falso amigo más valioso de la ficha. Se deja |
| **`how it ends`, l. 199** | `Tatiana signs the visit log.` · `Mauricio says the case number and the date out loud.` | tercera persona con verbo conjugado, pero es pantalla compartida y acotación de reglas: pronunciarlas es hablar del juego, no jugarlo |

---

## 6 · Lo que el cepillo dio limpio

- **20 filas de `Facts`** (10 + 10, dentro del tope de §11): elipsis, participios y sintagmas. Ni un
  verbo conjugado con sujeto. `charge: stopped`, `the 3 months: moved to the end`, `out since 5:00`.
- **20 celdas `here` de vocabulario**: las veinte siguen limpias, como en la fase 10. Ninguna empieza
  por pronombre + verbo conjugado y ninguna entrecomilla una línea.
- **Las 26 formas de las dos tablas** (12 en A, 14 en B — las cifras declaradas en la línea 271-272
  son exactas): todas son troncos con `…` o preguntas abiertas sin dato dentro (`Is there another
  way?`, `What will happen if…?`), que es el criterio de §4 de `fase12-tablas.md`. Ninguna oración
  cerrada con dato.
- **Las 16 celdas `what it does here`**: las dieciséis son notas o imperativos dirigidos al jugador
  (`buy the seconds your hands need`, `aim at the company, not at the person`). Ninguna es una línea
  decible.
- **Filas ≤ turnos:** 8 filas y 8 turnos por rol en los dos. Cumple, **al límite**: cada turno tiene
  su fila. Dentro del 6-9 de §11. Si alguna ronda futura añade una novena fila sin añadir turno, el
  escenario incumple.
- **El arranque no está en ninguna de las dos tablas.** El saludo vive en el bloque 1 de la caja de
  herramientas, que las dos fichas señalan y ninguna copia; la petición de Tatiana también. La fila
  `your date` (`I'm leaving on…`), que es su contenido de apertura, cae la **última** de las ocho.
- **Las 9 oraciones de la carta y las 13 de `how it ends`**: salvo la fila del hallazgo 1, ninguna se
  levanta entera. `She only learns what you tell her.` y `The no is yours.` se invierten al decirse.

---

## 7 · Cita arrastrada, ya avisada y todavía viva

Línea 441, dentro de las notas en español: cita `the reason she says no` cuando la tabla de
vocabulario de Tatiana (l. 81) dice `the reason **he** says no` desde la pasada de género. La fase 10
la señaló (entonces l. 403) y sigue igual. Está fuera de pantalla y no cuenta como decible, pero es
una nota que se lee como vigente y no lo es.

---

## 8 · Resumen para `habla-fichas-de-rol`

| # | tipo | sitio | arreglo | coste |
|---|---|---|---|---|
| 1 | decible | carta, l. 190 | `only a transfer before the 12th` | 7 → 6 palabras · 0 prosa |
| 2 | decible | B · `Only you know` 4, l. 126 | `Wilmer promised three or four members a cancellation, he is gone, and the others still work with you.` | 26 → 18 · B −8 |
| 3 | estructural | B · tabla, l. 173-174 | intercambiar las dos filas | 0 |
| 4 | estructural | cabeceras, l. 90 y 163 | añadir `use it or don't ·` | +5 cada una, pagadas: A −4 (`You choose the moment.`) −4 (`Tuesday, 6:40 p.m.`), B con el sobrante del n.º 2 |

Presupuesto resultante, con los cuatro aplicados: **A 446 · B 447**. Es la primera vez que este
escenario tendría margen en los dos roles desde el 21 de agosto.
