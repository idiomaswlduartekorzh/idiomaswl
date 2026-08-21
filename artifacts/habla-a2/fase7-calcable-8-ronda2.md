# Escenario 8 · `cancel-the-gym-i-am-leaving` — ¿se puede leer en voz alta? (ronda 2)

Auditoría de calcabilidad contra la regla de §11 del blueprint
(`docs/habla-acompanado-blueprint.md`, líneas 249-258):

> La ficha se escribe **en notas, no en frases**. `Exam: Saturday 12, 8:00 a.m.` sí.
> `I'm taking the exam on Saturday at eight.` no, jamás, ni en los datos ni en la situación ni
> en los objetivos. Las frases decibles viven **solo** en la tabla de exponentes.
>
> Prueba para el redactor: si una línea de tu ficha se puede decir tal cual en la conversación y
> el turno avanza, esa línea está mal escrita. Reescríbela como dato.

Auditado: `artifacts/habla-a2/fase7-fichas-8-cancel-the-gym-i-am-leaving.md`, en su estado de hoy
—después de la corrección que aplicó las 18 fallas de la ronda 1 más los 21 hallazgos graves de
nivel y naturalidad—. La ronda 1 queda copiada íntegra en
`artifacts/habla-a2/fase7-calcable-8-ronda1.md`; este archivo la reemplaza y la cita cuando hace
falta.

Fuera de alcance por diseño: las dos tablas *Say it here* (líneas 87-99 y 166-178), que son
exponentes y ahí las frases van a propósito; la cabecera del set (1-24), en español; el bloque
*After* (211-215), también en español; `grammarReferences` (219-254) y los dos anexos finales
(258-330), que son metadato del redactor y no llegan a pantalla.

## Cómo se marcó cada línea

Mismo criterio que en los escenarios 1, 2, 4, 5, 6, 7 y que en la ronda 1 de este, para que las
cifras se comparen:

- **FALLA** — la línea, o una cláusula autónoma donde el ojo puede parar, es un enunciado inglés
  bien formado que ese rol le puede decir al otro **sin tocar una palabra**, apuntando a la
  persona correcta, y el turno avanza.
- **RIESGO** — es oración, pero dicha *tal cual* apunta mal: hace falta un cambio (un pronombre,
  un posesivo) para que funcione en la boca. No falla la prueba literal; la sostiene un pronombre.
- **Limpia** — nota sin verbo conjugado. Las elipsis naturales (`No log, no case`,
  `Ticket bought, in your name`, `Wilmer, fired last month`) cuentan como limpias: son
  exactamente la forma que §11 pide.

**Las filas de tabla se leen de corrido, etiqueta incluida**, y **los dos puntos no se oyen**.
Esta segunda mitad es nueva y es el eje de toda la ronda: en el papel, `Card: expires August 31`
y `Card expires August 31` son dos cosas distintas; **en la boca son la misma**. La ronda 1 dio
por buena esa distinción y aquí se corrige.

---

## Veredicto

**PASA CON CAMBIOS**, y esta vez el margen es real: de las 18 frases decibles de la ronda 1 no
queda ni una. Pero **no se puede publicar todavía**, porque entraron seis nuevas y las seis
entraron por la puerta de los arreglos.

Unidades de pantalla en inglés auditadas, sin contar exponentes: **108** (las mismas que en la
ronda 1; la ficha creció en palabras, no en unidades).
Fallan **6** (5,6 %), repartidas en **5 unidades**. Otras **38** están a un pronombre de fallar.

| escenario | unidades | FALLA | % | sección peor |
|---|---|---|---|---|
| 7 · `two-more-people-for-the-trip` (ronda 2) | 105 | 5 | 4,8 % | la carta |
| **8 · `cancel-the-gym-i-am-leaving` (ronda 2)** | **108** | **6** | **5,6 %** | **`Only you know`, otra vez** |
| 1 · `the-bike-in-the-parking-lot` | 73 | 7 | 9,6 % | vocabulario `here` |
| 4 · `a-charge-i-did-not-make` | 89 | 9 | 10,1 % | Facts, ROLE B |
| 6 · `the-cousin-on-the-sofa` (ronda 1) | 95 | 16 | 16,8 % | la carta |
| **8 · `cancel-the-gym…` (ronda 1)** | 108 | 18 | 16,7 % | `Only you know` |
| 2 · `no-appointment-until-thursday` | 94 | 18 | 19,1 % | vocabulario `here` |
| 5 · `late-again-on-monday` | 96 | 22 | 22,9 % | Facts |

**El titular: las seis frases decibles que quedan no las escribió el redactor. Las escribieron
los auditores.** Cuatro son copia literal de la reescritura que propuso otro informe de fase 7
—dos de la ronda 1 de este mismo archivo, una de `fase7-nivel-8.md`, una de
`fase7-naturalidad-8.md`— y una quinta salió de quitar una pasiva que `fase7-nivel-8.md` marcó.
Ninguna estaba en el borrador original.

**Reparto por rol: 3 de ROLE A, 3 de ROLE B, 0 en la carta, 0 en pantalla compartida.** Es el
primer reparto simétrico del escenario 8 —en la ronda 1 Milena cargaba el doble— y **la carta,
que era la segunda peor pantalla, hoy está limpia**: sus cuatro filas son notas
(`not authorized · not one`, `collections on the 12th · the system, on its own`) y no hay una
sola oración en ellas.

Ninguna de las seis obliga a rehacer una sección. Las seis son reescrituras de una línea, y en
tres casos la reescritura correcta **ya está escrita en otra parte del mismo archivo**.

---

## Qué pasó con las 18 de la ronda 1

Las dieciocho, aplicadas. Se verifica una por una sobre el texto de hoy:

| # | ronda 1 decía | hoy | estado |
|---|---|---|---|
| 1 | `Dates are enough.` (41) | `dates: enough` (43) | aplicada |
| 2 | `The September 5 charge bounces whatever you do` (44) | `**September 5 charge: bounces, whatever you do.**` (46) | **aplicada tal cual — y sigue fallando: falla 1** |
| 3-4 | `Yurany … asked about this gym two weeks ago; the price stopped her` (47) | `her question about this gym: two weeks ago · what stopped her: the price` (49) | aplicada (queda riesgo) |
| 5 | `yours moved, and that started all this` (77) | `yours, moved — the start of all this` (79) | aplicada, limpia |
| 6 | `it isn't the money` / `your destination is yours` (83) | `not the money` / `your destination stays yours` (85) | **a medias: un verbo por otro — riesgo R10** |
| 7 | `Opening a case isn't filing a change` (117) | `a case ≠ a change · the case: today, yes.` (121) | aplicada, limpia |
| 8-9 | `Opening the case today fixes the date.` + `Édison then resolves…` (121) | `**The case, opened today: the date, fixed.** Édison's answer, later, on the case date.` (125) | aplicada, limpia |
| 10 | `Transfers exist.` (122) | `**A transfer: real, and not on the board.**` (126) | aplicada, limpia |
| 11 | `A freeze is not a cancellation.` (123) | `**A freeze ≠ a cancellation** · in her head, the same word.` (127) | aplicada, limpia |
| 12 | `Wilmer was fired for promising things to sell` (125) | `**Wilmer, fired last month** — promises made to close a sale…` (129) | aplicada, limpia |
| 13 | `A freeze … stops the charge` (137) | `charge: stopped · the 3 months: moved to the end` (141) | aplicada, limpia |
| 14 | `Édison signs it` (140) | `signature: Édison` (144) | aplicada, limpia |
| 15 | `he left at 5:00 and doesn't answer at night` (142) | `out since 5:00 · no answer at night` (146) | aplicada, limpia **y replicada en el escenario 7** |
| 16 | `Édison does, second floor. You don't` (155) | `Édison's, second floor — not yours` (156) | aplicada, limpia |
| 17 | `the system sends it to collections…` (190) | `**collections on the 12th** · the system, on its own` (194) | aplicada, limpia |
| 18 | cita `"let me check"` fuera de exponentes (193) | `no more checking with anyone` (197) | aplicada; la frase vive ahora donde debe, en el exponente 175 |

**14 de 18 salieron limpias.** Las cuatro que no —2, 6, y las dos consecuencias colaterales que
se ven abajo— comparten un mecanismo, y ese mecanismo es el hallazgo de esta ronda.

---

## La causa: el arreglo escribe la frase

En la ronda 1 la causa era el sujeto abstracto: *a freeze*, *the system*, *Édison* — sujetos sin
pronombre que dar la vuelta. La regla que salió de allí sigue siendo buena («si el sujeto de la
línea no es *you* ni *I*, el verbo sobra») y **se aplicó**. Lo que no se vio venir es que los
otros informes de fase 7 empujan en dirección contraria, y que sus reescrituras entran en la
ficha sin volver a pasar por §11.

**Los tres choques, documentados:**

1. **`fase7-nivel-8.md`, G2** marcó tres participios absolutos como sintaxis B2 y pidió
   convertirlos en presente simple o primer condicional. La tabla de cambios de la línea 138 dice,
   literal:

   > | 121 | `No number: cut-off missed, plan renewed, 92,000 more.` | `No number: she misses the cut-off, the plan renews, and she pays 92,000 more.` |

   Esa misma línea 121 es la que **la ronda 1 había llamado «impecable: misma información, cero
   verbos»** y había puesto como modelo. Nivel tiene razón en que el absoluto encadenado no es A2
   leído; §11 tiene razón en que la cláusula finita se lee en voz alta. Nadie arbitró, y ganó el
   que escribió después.

2. **`fase7-nivel-8.md`, M-5** propuso para la línea 50:

   > `You fly, and the plan is still running. There is no counter here for you after Thursday.`

   Sustituye el absoluto `with the plan running` por una cláusula finita en tercera persona. Es la
   falla 2 de esta ronda.

3. **`fase7-naturalidad-8.md`, A.3** aportó ocho palabras que hacían falta de verdad —sin ellas la
   restricción 3 de Milena parece un capricho— y las aportó en forma de oración:

   > `**The form takes a reason, not a destination.**`

   Es la falla 3.

4. **`fase7-nivel-8.md`, línea 253** marcó la pasiva `can be done` en la definición de
   `to authorize`. Quitarla produjo `to say yes officially, and only some people in a company can`
   — una cláusula finita con elipsis verbal. Es la falla 6, y con ella **se rompe la racha de cinco
   fichas seguidas con la columna `what it is` limpia**, que era el mejor dato del set.

**Y el quinto mecanismo es de casa: los dos puntos no protegen.** La ronda 1 escribió, sobre su
propio arreglo de la línea 44: *«De paso, `Card expires August 31` → `Card: expires August 31`
mata el verbo con dos puntos.»* No lo mata. El signo se ve y no se oye: leídas en voz alta, las
dos cadenas son idénticas. Lo que mata el verbo es cambiarlo por un sustantivo o un participio, y
**la propia ficha lo hace bien dieciséis líneas más abajo**, en la fila de datos:

> `| Your card | expiry: **August 31** · a new one: **8 business days** |`

Sustantivo (`expiry`), no verbo (`expires`). Misma información, mismo espacio, imposible de leer
como frase. La ficha contiene su propia corrección, otra vez.

**Regla que sale de aquí, para los 23 niveles que vienen:** *ningún informe de fase 7 propone una
reescritura sin pasarla por la prueba de §11.* Nivel y naturalidad tienen permiso para pedir que
una línea cambie; el que la escribe tiene que escribirla en notas. Cuando nivel diga «este
absoluto es B2», la salida **no** es la cláusula finita: es el sustantivo
(`cut-off missed` → `no case before the cut-off`), la fila de datos o los dos puntos **con
sustantivo detrás**.

---

## Dónde se concentran

| sección | unidades | FALLA | riesgo | ronda 1 | estado |
|---|---|---|---|---|---|
| **`Only you know`** (5 + 5) | 10 | **3** | 6 | 8 | **la peor otra vez**, pero de 8 a 3 |
| **`You can't`** (3 + 3) | 6 | **1** | 2 | 1 | la de B es nueva, y viene de naturalidad |
| **Vocabulario `what it is`** (10 + 10) | 20 | **1** | 3 | 0 | **racha de cinco fichas, rota** |
| **`If you walk away with nothing`** (2) | 2 | **1** | 2 | 0 | 1 de 2 unidades; viene de nivel M-5 |
| **Facts** (10 + 10) | 20 | 0 | 3 | 3 | **limpia en los dos roles** |
| **La carta** | 7 | 0 | 4 | 2 | **limpia**: las 4 filas, en nota |
| Vocabulario `here` (10 + 10) | 20 | 0 | 7 | 2 | |
| Nota de registro + `Your screen only` (4) | 4 | 0 | 4 | 0 | todo meta |
| `You want` (1 + 5) | 6 | 0 | 2 | 0 | |
| `Your toolkit` (2) | 2 | 0 | 2 | 1 | |
| `You did it if` (2) | 2 | 0 | 2 | 0 | meta |
| `Not about money` + `You can, but you don't have to` (A) | 2 | 0 | 1 | 1 | |
| `Where you are` (2) | 2 | 0 | 0 | 0 | **limpia** |
| `Both screens — how it ends` (5) | 5 | 0 | 0 | 0 | **limpia** |
| **total** | **108** | **6** | **38** | **18** | |

Dos lecturas de esta tabla:

- **Las secciones de datos duros aguantaron.** `Facts` (20 unidades) y la carta (7) están hoy sin
  una sola oración, y en la ronda 1 sumaban cinco fallas entre las dos. La disciplina de notas
  llegó a las tablas y se quedó.
- **Las secciones de prosa son las que se ensucian, y se ensucian al corregirlas.** Las cuatro
  secciones con falla son las cuatro que los otros informes tocaron. La sección peor sigue siendo
  `Only you know` por la misma razón que en la ronda 1: es donde la ficha explica *por qué*
  importa un dato, y explicar es conjugar.
- **El suelo de riesgo no se mueve: 38 antes, 38 ahora.** Es estructural, no un defecto:
  la ficha le habla al jugador de *tú*, así que casi cada instrucción es una oración en segunda
  persona a la que le falta un pronombre para volverse jugada. Ese cortafuegos es lo único que
  sostiene 20 de las 38.

---

## Las 6, una por una

### ROLE A — Tatiana (3)

**1 · línea 46 · `Only you know` 1 · FALLA ×2 — BLOQUEANTE**

> `- **Card: expires August 31.** New one: 8 business days, to an address you won't be at. **September 5 charge: bounces, whatever you do.** If you say it early, it sounds like a plan to stop paying. You choose when to say it.`

Dos frases decibles en la misma viñeta, y las dos son **la reescritura que propuso la ronda 1**.

- `Card expires August 31.` — presente simple, tercera persona, sujeto sin pronombre que gire,
  cierto, y es la razón entera de que el cobro no vaya a pasar. Los dos puntos son un signo de
  puntuación: no se pronuncian.
- `September 5 charge bounces, whatever you do.` — el `you` apunta a **Milena, que es a quien se
  lo diría**: no hay nada que corregir en la boca. Y es el dato oculto número 1, el único que la
  ficha le dice explícitamente que tiene que medir cuándo suelta («You choose when to say it»).
  Escrito así, no hay nada que medir: se lee.

Que sea decible es peor aquí que en cualquier otra línea del archivo, porque la pregunta 3 del
debrief en español (línea 215) está construida sobre la suposición de que callárselo cuesta:
*«Tatiana sabía desde el primer turno que el cobro del 5 iba a rebotar. ¿Lo contó? ¿En qué
turno?»*

**Nota** (mismo número de palabras, cero verbos; el sustantivo lo copia de la fila 62 y el
participio, de la carta, línea 194):

> `- **Card: expiry August 31.** New one: 8 business days, to an address you won't be at. **September 5 charge: bounced, whatever you do.** If you say it early, it sounds like a plan to stop paying. You choose when to say it.`

**2 · línea 52 · `If you walk away with nothing` · FALLA**

> `**If you walk away with nothing** · Thursday: your last day here. You fly, and the plan is still running. No counter here for you after Thursday.`

`The plan is still running.` es cláusula autónoma, presente continuo, tercera persona, cierta, y
es **su queja entera** dicha en cinco palabras: el título del rol es literalmente
*«You're leaving, and the plan is still running»*. La primera mitad (`You fly`) la salva el
pronombre; la segunda no tiene pronombre que la salve.

Viene de `fase7-nivel-8.md` M-5, que sustituyó el absoluto `You fly with the plan running` —el
absoluto era B2 y había que quitarlo, eso es correcto— por dos cláusulas finitas.

**Nota** (−1 palabra):

> `**If you walk away with nothing** · Thursday: your last day here. You fly · the plan, still running. No counter here for you after Thursday.`

**3 · línea 85 · `Your toolkit` · FALLA a medias, contada como riesgo (R10)**

Se anota aquí porque es la falla 6 de la ronda 1 y sigue viva en otra forma:
`your destination is yours` → `your destination stays yours`. Se cambió un verbo conjugado por
otro verbo conjugado. Hoy solo la salva el posesivo (dicha a Milena dice *el destino de Milena*).
La nota está abajo, en la tabla de riesgo caro.

### ROLE B — Milena (3)

**4 · línea 122 · `You can't` 3 · FALLA — BLOQUEANTE**

> `3. Ask her destination, her purpose, or her plan B. Allowed: **when she comes back**. **The form takes a reason, not a destination.**`

`The form takes a reason, not a destination.` — presente simple, sujeto abstracto, ocho palabras,
negrita y punto final. Apunta a la persona correcta porque no apunta a ninguna: es una regla, y
las reglas se dicen igual leídas que pensadas. Y **es exactamente la jugada**: la restricción 3
existe para que Milena tenga que explicarle a Tatiana, con sus palabras, por qué le pide el motivo
y no el destino. Aquí la explicación viene impresa.

Es el aporte A.3 de `fase7-naturalidad-8.md`, y el contenido hace falta: sin él, el objetivo 4 de
Milena es impracticable. Lo que sobra es la forma.

**Nota** (−1 palabra, misma información):

> `3. Ask her destination, her purpose, or her plan B. Allowed: **when she comes back**. **The form: a reason, not a destination.**`

**5 · línea 125 · `Only you know` 1 · FALLA**

> `- **The case, opened today: the date, fixed.** Édison's answer, later, on the case date. No number: she misses the cut-off, the plan renews, **92,000 more** *(ninety-two thousand)*. It's all you have today.`

La primera mitad de la viñeta es el arreglo de la ronda 1 y está impecable. La que falla es la
cola: `It's all you have today.`

Dicha por Milena a Tatiana, el `you` gira —pasa a significar *todo lo que tienes tú*— y **las dos
lecturas son ciertas y las dos son jugables**: el caso es todo lo que Milena puede dar hoy y es
todo lo que Tatiana se lleva hoy. Es el mismo defecto que la falla grave 3 del escenario 7
(`she charges you`): una cadena que dice dos cosas según quién la lea, y las dos funcionan. Aquí
además la lectura girada es el **cierre del no**, que es la línea que a Milena más le cuesta
producir.

`She misses the cut-off, the plan renews` se queda en riesgo por consistencia con la ronda 1, que
ya juzgó `the plan renews` como riesgo y no como falla («solo lo salva que en habla pediría
*will renew*»). Pero es el riesgo más caro del archivo y viene de nivel G2: ver R12.

**Nota** (−1 palabra):

> `- **The case, opened today: the date, fixed.** Édison's answer, later, on the case date. No number: cut-off missed, plan renewed, **92,000 more** *(ninety-two thousand)*. Nothing else today.`

*(Si nivel insiste en que `cut-off missed, plan renewed` es B2, la salida no es conjugar: es
`No number: no case before Thursday · one more month · 92,000 more`.)*

**6 · línea 156 · vocabulario `what it is`, `retention / to authorize` · FALLA**

> `| retention / to authorize | the people who talk to members who want to leave · to say yes officially, and only some people in a company can | Édison's, second floor — not yours |`

`Only some people in a company can.` es una oración completa con elipsis verbal —inglés bien
formado, A2 leído, sin pronombre que gire— y es **la justificación entera de su no**. La celda
existe para que Milena sepa qué significa *authorize* y pueda glosarlo con sus palabras (bloque 4
de la caja, que la línea 164 le asigna con `[jargon]`). Glosado ya viene.

Sale de quitar la pasiva `can be done` que marcó `fase7-nivel-8.md` (línea 253). La pasiva había
que quitarla; lo que entró en su lugar es una cláusula finita.

**Nota:**

> `| retention / to authorize | the people who talk to members who want to leave · to say yes officially — a yes only some people in a company can give | Édison's, second floor — not yours |`

Y con esta cae el mejor dato acumulado del set: **cinco fichas seguidas con la columna
`what it is` limpia en 20 de 20**. Conviene revisar esa columna en las ocho antes de publicar,
porque el mecanismo que la ensució aquí —quitar una pasiva de una definición— es de los que se
repiten.

---

## Las 38 de riesgo

No fallan la prueba literal: hace falta girar un pronombre o un posesivo. Se listan porque son
verbos conjugados en una ficha que §11 quiere en notas, y porque **11 de las 38 son jugadas
centrales a un pronombre de distancia**.

### Riesgo caro — el cambio es `you → I` y lo que sale es una jugada

| # | línea | cita literal | qué sale con un pronombre | en nota |
|---|---|---|---|---|
| R1 | 40 (A, `You can't` 2) | `You work 7:00–6:00.` | `I work seven to six.` — su imposibilidad entera | `Your hours: 7:00–6:00.` *(la fila 66 ya lo escribe así)* |
| R2 | 47 (A, dato oculto) | `The 3-month minimum: in writing, and you signed it.` | `I signed it.` — la admisión que le da la razón a Milena | `The 3-month minimum: in writing, and signed by you.` |
| R3 | 47 (A, dato oculto) | `*leaves the country → they cancel it*` | `They cancel it.` — la promesa de Wilmer, su único argumento | `*leaves the country → no plan*` |
| R4 | 52 (A) | `You fly` | `I fly.` | ver falla 2 |
| R5 | 60 (A, Facts, **rótulo**) | `\| What you signed \|` | `What I signed: a three-month minimum.` | `\| Signed by you \|` |
| R6 | 73 (A, vocab `what it is`) | `to end it, so you stop paying and you stop going` | `so I stop paying and I stop going` | `to end it — no more paying, no more going` |
| R7 | 75 (A, vocab `what it is`) | `when the bank says no, and the money does not leave your card` | `the money does not leave my card` — el argumento del rebote | `when the bank says no, and the money stays on the card` |
| R8 | 77 (A, vocab `here`) | `yours, and you bought it` | `I bought it.` — el tiquete, que es lo que no se discute | `yours, already bought` |
| R9 | 81 (A, vocab `here`) | `what Wilmer never gave you` | `what Wilmer never gave me` | `never given by Wilmer` |
| R10 | 85 (A, toolkit) | `your destination stays yours` | `my destination stays mine` — el rechazo del bloque 6 | `**6**, not your destination` |
| R11 | 116 (B, `You want` 3) | `the complaint comes to you` | `the complaint comes to me` — por qué necesita la firma | `the complaint, yours` |
| R12 | 125 (B, dato oculto) | `she misses the cut-off, the plan renews` | `you miss the cut-off, the plan renews` — **la consecuencia entera**, y `the plan renews` no tiene pronombre que lo salve | `cut-off missed, plan renewed` |
| R13 | 131 (B, lo que pierde) | `the next complaint has your name` | `the next complaint has my name` | `the next complaint, with your name on it` |
| R14 | 189 (carta) | `he finally answers the one you sent at the start` | `the one I sent at the start` — que Édison contestó es justo lo que ella decide si cuenta | `his answer to the one you sent at the start` |

### Riesgo meta — es oración, pero habla del juego y no dentro del juego

| # | línea | cita |
|---|---|---|
| R15 | 29 (A, encabezado) | `Shouting buys nothing: she signs nothing.` |
| R16 | 30 · 109 (las dos notas de registro) | `Don't show it, don't read from it.` |
| R17 | 36 (A) | `Two months of a gym you can't use: the problem.` |
| R18 | 46 (A) | `If you say it early, it sounds like a plan to stop paying.` · `You choose when to say it.` |
| R19 | 49 (A, dato oculto) | `what stopped her: the price` |
| R20 | 58 (A, Facts) | `four people behind you` |
| R21 | 73 (A, vocab `here`) | `in Spanish *cancelar* can mean *to pay*` — decible y bien formada; **la salva la ficción**: las dos son colombianas y nadie le explica español a una recepcionista de Bucaramanga |
| R22 | 77 · 79 · 82 (A, vocab) | `a ticket that takes you there and not back` · `a day and a time an office gives you` · `what she asks for` |
| R23 | 102 (A, criterios) | `she gave you two ways you didn't know about, and you asked for one of them` |
| R24 | 108 (B, encabezado) | `She starts.` |
| R25 | 118 (B, `You want` 4) | `which way she tries first` |
| R26 | 121 (B, `You can't` 2) | `if the proof doesn't have both dates` |
| R27 | 126 (B, dato oculto) | `If you don't say it, she never knows.` |
| R28 | 143 (B, Facts) | `keeps today's date` (y el rótulo imperativo `Open a case today`) |
| R29 | 152 · 157 · 160 (B, vocab `here`) | `the one you can't say yes to` · `then out of your hands` · `the only thing you can hand her today` |
| R30 | 157 (B, vocab `what it is`) | `the part of a company that calls you when you do not pay` — ver el aparte 2 |
| R31 | 164 (B, toolkit) | `you open the service, even if she speaks first` · `digit by digit is the job` |
| R32 | 181 (B, criterios) | `what she writes today and what she doesn't` |
| R33 | 187 (carta) | `She opens here, so turn 3 is her second one and you play the card on turn 4. She never sees this screen.` |
| R34 | 196 (carta, **rótulo**) | `\| Where he is \|` — verbo conjugado en la etiqueta |
| R35 | 197 (carta) | `She only learns what you tell her.` · `The no is yours.` |
| R36 | 203 · 209 (cierre común) | `That last repeat ends the game.` — protegida por los nombres propios: no es la voz de nadie |

*(R16, R22, R29 y R31 agrupan varias citas de la misma unidad; el total de líneas tocadas es 38.)*

---

## La prueba escrita de §11 para el vocabulario, contada aparte

> *Si la celda contiene algo entrecomillado o algo que empiece por un pronombre y un verbo
> conjugado, reescríbela.*

**1 celda de 40 la incumple**, frente a 4 en la ronda 1 y 8 en el escenario 7:

| rol | fila | celda | por qué |
|---|---|---|---|
| A | `one way` | `yours, and you bought it` | empieza por pronombre, y el verbo va detrás de la coma |

Las tres que la incumplían en la ronda 1 —`to bounce` (`yours will…`), `an appointment`
(`yours moved…`), `proof` (`you can't…`)— están arregladas. Y **las comillas desaparecieron de
las dos fichas**: `"cancel"` es hoy *cancelar* en cursiva, mención de palabra y no cita, que es
lo correcto.

---

## Aparte 1 · La carta pasó de ser la pantalla peor a ser la mejor

Vale la pena escribirlo porque contradice el hallazgo central del escenario 7, donde la carta era
el punto flojo del fichero. Aquí sus cuatro filas están en nota, sin un verbo:

| fila | celda |
|---|---|
| `Cancellations for travel` | `**not authorized · not one**` |
| `A freeze` | `**yes** · up to 60 days · **only with the two dates**` |
| `The charge on the 5th, bounced` | `**collections on the 12th** · the system, on its own · after that: nobody here` |
| `Where he is` | `**not Thursday — inventory count** · **Wednesday, 9 to 5, second floor**` |

La tercera es la misma información que en la ronda 1 ocupaba una condicional completa de
veintitrés palabras (falla 17). Hoy es un participio en el rótulo (`bounced`) y tres notas. Es el
modelo del que salen las reescrituras de las fallas 1 y 5 de esta ronda.

Lo que le queda a la carta es prosa **meta** (R33, R35): dos párrafos que explican la mecánica del
turno 3 con subordinación larga, en la pantalla que Milena abre **a mitad de conversación, con el
reloj corriendo**. No es calcable, pero §11 pide para el inglés A2 leído «frases cortas, presente
y pasado simple, cero subordinación larga», y ese bloque no lo cumple. Es la tercera vez que se
apunta lo mismo (escenarios 6 y 7); conviene arreglar el molde, no las tres cartas.

## Aparte 2 · La columna `what it is` de Milena es su trabajo, impreso

Fuera del recuento, porque son sintagmas nominales y no oraciones: **el bloque 4 de la caja
(`[jargon]`, glosar lo que uno dice) es de Milena, y la columna `what it is` de su tabla es
precisamente la glosa que tiene que producir.**

> `| collections | the part of a company that calls you when you do not pay | … |`

Milena leyendo esa celda a Tatiana produce la glosa entera, y el `you` **apunta bien** (es Tatiana
quien no paga). No hace avanzar el turno como enunciado autónomo —es un sintagma nominal, no una
frase— y por eso no cuenta como falla. Pero es la definición completa de una de las seis palabras
de jerga que la línea 164 le manda glosar.

En la ficha de Tatiana la misma columna es inocua: ella no tiene que glosar nada, tiene que
**preguntar** (`What does "…" mean?`). La asimetría del bloque de vocabulario, que §11 pide por
razones de contenido, tiene una consecuencia de calcabilidad que no está escrita en ninguna parte:
**para el rol que glosa, la columna `what it is` es guion; para el que pregunta, es apoyo.**

No propongo tocarlo en este escenario —quitarle la definición a Milena la deja sin poder hacer su
trabajo—. Lo dejo apuntado para el molde: quizá la columna del rol que glosa deba escribirse con
sinónimos sueltos y no con definición completa (`collections | calls, debt, after the due date`).

## Aparte 3 · El presupuesto de prosa se rompió, y las tres cifras siguen en `PENDIENTE`

La tabla del final del archivo (líneas 277-281) declara `PENDIENTE_A`, `PENDIENTE_B` y
`PENDIENTE_C`. Medidas con el método que el propio archivo declara —solo prosa, sin tablas, sin
carta, sin cierre ni debrief, fechas y cifras incluidas—:

| ficha | palabras de prosa | presupuesto | estado |
|---|---|---|---|
| ROLE A — Tatiana | **383** | ≤ 350 | **+33 sobre el tope** |
| ROLE B — Milena | **403** | ≤ 350 | **+53 sobre el tope** |
| La carta | **97** | fuera de la ficha | — |

En la ronda 1 eran 348 y 348, a dos palabras del tope. La corrección añadió 35 y 55 palabras, que
es lo que cabía esperar de unos arreglos que convierten elipsis en oraciones: **un absoluto son
tres palabras y su cláusula finita son seis.** Es el mismo choque, medido en el otro eje.

Las seis reescrituras de este informe **restan** cuatro palabras entre las dos fichas, así que no
resuelven el desbordamiento: hace falta una pasada de recorte aparte, y conviene hacerla
**después** de esta, porque cada verbo que se cae se lleva una o dos palabras con él.

---

## Lo que hay que hacer, en orden

1. **Las dos frases de la línea 46** — el rebote del 5 y la caducidad de la tarjeta. Es el
   temporizador de Tatiana y la pregunta 3 del debrief depende de él. `expires` → `expiry`,
   `bounces` → `bounced`, que es como ya lo escriben la fila 62 y la carta.
2. **La línea 122** (`The form takes a reason…`) y **la 156** (`only some people in a company
   can`). Las dos son de Milena, las dos son su justificación del no, y las dos vienen de
   arreglos de otros informes: hay que devolverles el contenido sin devolverles el verbo.
3. **La línea 52** (`the plan is still running`) y **la cola de la 125**
   (`It's all you have today`).
4. **Los 14 riesgos caros**, empezando por R12 (la cola de la 125, que es la consecuencia entera),
   R1, R2, R8 y R10 — las cuatro jugadas que hoy están a un pronombre.
5. **Los dos rótulos con verbo**: `What you signed` (60) y `Where he is` (196). La regla completa
   del escenario 7 sigue vigente: *ni el rótulo ni la celda llevan verbo conjugado; el rótulo es
   un encabezado de columna, no un sujeto.*
6. **La celda `one way` de Tatiana** (77), única que incumple la prueba escrita.
7. **Rehacer la cuenta de prosa** y bajar de 383 y 403 a 350. Es trabajo aparte, y va después.

Ninguna toca el motor: ni el conflicto, ni la asimetría, ni las restricciones como *contenido*,
ni la carta como pieza, ni el cierre, ni el debrief, ni los doce `grammarReferences`. Lo que
cambia es la forma de la línea.

**Y una regla para el resto del set, que sale de aquí y no de esta ficha:** las reescrituras que
proponen los informes de nivel, naturalidad y tensión **entran en la ficha sin pasar por §11**, y
en este archivo son cuatro de las seis frases decibles que quedan. Antes de aplicar un hallazgo de
otro informe hay que leer su reescritura en voz alta. Si el turno avanza, el hallazgo tiene razón
y la reescritura no.
