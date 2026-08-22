# Fase 9 · ¿Se puede leer en voz alta? — escenario 3, `swap-the-saturday-shift` (EL MOLDE)

**Auditado:** `artifacts/habla-a2/fase7-modelo-ficha-en.md`, tal como está en disco hoy
(22 ago 2026), con la segunda pasada y el reparto de género ya aplicados. Los informes de fase 7 y
8 se leyeron solo para saber qué se dijo antes; nada se dio por bueno ni por malo por venir de ahí.

**Regla aplicada (§11, con las dos correcciones del 21 ago):**
- Tablas → notas, nunca frases.
- Prosa → inglés A2 legible, oraciones cortas y completas, escritas **sobre** el jugador.
- Prueba única: *si la línea se puede decir tal cual y el turno avanza, está mal escrita.*

**Fuera de alcance por diseño:** las dos tablas `Say it here` y el bloque final en español.
Sí se revisaron —y aguantan— la carta del rol A y la pantalla compartida `how it ends`.

**Techo de prosa, contador canónico** (`node artifacts/habla-a2/fase7-scripts/prosa-canonica.mjs`,
ejecutado hoy): ROLE A **441**, ROLE B **445**, tope 450. Cumple. Con los nueve arreglos de abajo
queda A **442** y B **446**: no hay que quitar ninguna pieza.

---

## Veredicto

**NO PASA COMO MOLDE · 9 líneas decibles sobre 100 unidades** (62 oraciones de prosa —31 por rol— +
38 filas de tabla: 8 datos + 10 vocabulario en A, 10 + 10 en B).

No es el número, es **dónde están**. Las tres viñetas de `Only you know` del rol B —el desayuno de
cuarenta, las propinas de los fines de semana fijos y la boda del 19— son las tres oraciones en
tercera persona, sin una sola marca de segunda persona, y son **las tres jugadas decisivas de B**.
La ficha se las entrega escritas. Junto a una de ellas escribe además `You can say this one out
loud`: le dice al estudiante que la diga, y se la deja hecha en la línea de arriba.

El patrón es uno solo y es el inverso del que protege al resto de la ficha: mientras la prosa dice
*you / your*, pronunciarla se rompe sola —el «you» pasaría a ser el otro jugador—. Las nueve que
fallan o no tienen deixis (7) o la tienen invertida y aun así sirven (1), o son tabla escrita como
oración (2, contando la de `here`).

Cuenta comparable con el escenario 1 (mismo criterio de línea entera): **9 aquí contra 5 allí**, y
allí ninguna caía en el bloque de dato oculto. Siendo éste el archivo contra el que se reescriben
los otros siete, la forma «dato oculto = oración en tercera persona» se propagaría al set entero.

**Concentración:** `Only you know` de B 3 · `You can't` 3 (2 en A, 1 en B) · vocabulario de A 2 ·
`Where you are` de B 1. Prosa 7, tabla 2. Rol A 4, rol B 5.

---

## Las nueve, literal, con reescritura

### 1 · GRAVE — ROLE B, `Only you know`, viñeta 1

> `On Saturday the 12th there is a company breakfast: forty people at nine in the morning, announced in the group on Friday.`

Tercera persona pura, oración completa, y es **la carta de B**: el turno en que suelta esto es el
que cambia el tamaño del favor. El exponente correspondiente es un tronco (`There's a reservation
for …`) precisamente para que B produzca el resto; la prosa se lo da entero y con hora.

**Reescritura:** `You read in the group on Friday that forty people are coming for a company breakfast at nine on Saturday the 12th.`
(22 palabras contra 22 · coste 0; el dato queda subordinado a un verbo en segunda persona que B no
puede pronunciar sin mentir)

### 2 · GRAVE — ROLE B, `Only you know`, viñeta 2 (segunda oración)

> `The fixed weekends are the days with tips.`

Ocho palabras sin deixis, y es el argumento económico de B: dicha tal cual explica por qué el tercer
cambio le cuesta dinero, y el turno avanza.

**Reescritura:** `Your fixed weekends are the days that pay you in tips.` (10 contra 8 · +2)

### 3 · GRAVE — ROLE B, `Only you know`, viñeta 3

> `On Saturday the 19th there is a wedding for sixty people.`

Se levanta entera. Es la peor de las nueve porque la línea siguiente —`You can say this one out
loud`— convierte la ficha en guion: dice qué decir y a continuación cómo se dice.

**Reescritura:** `You work a wedding for sixty people on Saturday the 19th.` (11 contra 11 · coste 0)

### 4 · GRAVE — ROLE B, `Where you are`, oración 3

> `Nayibe, the manager, is at the other café until six.`

Sin deixis y decible palabra por palabra: es lo que dice cualquiera de los dos para cerrar la puerta
de «pregúntale a la jefa». Además la aposición `the manager` sobra entre dos que trabajan con ella.

**Reescritura:** disolverla dentro de la oración anterior, que ya está protegida:
`You are in the back room, tying your apron, and your shift starts in twenty minutes, with Nayibe at the other café until six.`
(el adjunto no tiene verbo conjugado: no se levanta · −2 palabras)

### 5 · GRAVE — ROLE A, `You can't`, restricción 1 (segunda oración)

> `Nayibe said it in front of everybody: nobody pays anybody for a shift.`

Tercera persona, y es exactamente lo que A dice cuando el dinero asoma. `nobody pays anybody for a
shift` es, encima, una sentencia memorizable: la mejor línea de la ficha, regalada.

**Reescritura:** `You can't offer money, because Nayibe said in front of everybody that nobody pays anybody for a shift.`
(18 contra 17 · +1; funde las dos oraciones y la regla queda subordinada)

### 6 · GRAVE — ROLE A, `You can't`, restricción 3 (segunda oración)

> `She is at the Autopista café until six.`

La gemela de la 4, en el otro rol. Ocho palabras sin ancla, decibles, y el turno avanza: es la
razón por la que hay que resolverlo entre ellos dos.

**Reescritura:** `You can't call Nayibe now, because she is at the Autopista café until six.`
(14 contra 14 · coste 0)

### 7 · GRAVE — ROLE A, `Words you need here`, fila `non-refundable`, columna `what it is`

> `| non-refundable | you pay it and nobody gives it back | the exam in one word · your hardest number |`

`you pay it and nobody gives it back` es una **oración completa con dos verbos conjugados dentro de
una tabla**, donde §11 solo admite notas, y es el argumento del millón de pesos dicho en A2 perfecto.
Es además la reaparición de la falta que la segunda pasada dio por corregida: al fundir `refund`
(`you don't get one, and that's your argument`) con `non-refundable`, el pronombre + verbo se mudó de
la columna `here` a la columna `what it is`. La fusión movió el defecto, no lo quitó. Las otras 19
glosas del archivo son sintagmas (`the hours you work in one day`, `a table kept for people who
called first`): ésta es la única que es frase.

**Reescritura:** `money you pay and never get back` (32 caracteres, dentro del listón de 45 · fila de
tabla, no toca el presupuesto)

### 8 · MEDIA — ROLE A, `Words you need here`, fila `shift`, columna `here`

> `| shift | the hours you work in one day | one Saturday shift, and everything turns on it |`

La columna señalada como la más calcable del formato. `and everything turns on it` es cláusula con
sujeto y verbo conjugado, y el conjunto se dice tal cual como súplica —«One Saturday shift, and
everything turns on it»— y avanza: dramatiza lo que está en juego sin que el estudiante produzca nada.

**Reescritura:** `one Saturday shift · the only thing you need from them` (nota de propósito, sin
verbo conjugado)

### 9 · MEDIA — ROLE B, `You can't`, restricción 1 (última oración)

> `You don't negotiate that one.`

Aquí la deixis no protege: es una regla **sobre la conducta del otro**, así que sobrevive al cambio
de referente. B se la suelta a A tal cual —«You don't negotiate that one»— y sostiene la condición.
Es la fuga por la que se cuelan las segundas personas escritas en modo norma.

**Reescritura:** fundirla en la oración anterior, que sí está anclada:
`Your one condition is the way around it, and you don't negotiate it: today, in writing, the café group says that they asked you for it.`
(+1 palabra; desaparece la oración suelta)

**Efecto sobre el techo:** ROLE A +1 → **442/450**. ROLE B −2+2+0+0+1 = +1 → **446/450**. Cabe.

---

## Al filo, señaladas y no contadas

Cláusulas decibles que van **dentro** de una oración anclada en segunda persona, así que la línea
entera no se levanta. No cuentan con el criterio de línea entera (el mismo del escenario 1), pero el
ojo del estudiante se para en la coma, y tres de ellas son movimientos reales. Si en una pasada
futura sobra margen, se anclan.

| dónde | literal | por qué no cuenta hoy |
|---|---|---|
| B · `Only you know` 2 | `That opening is the worst shift of the month` | la oración sigue con `and they don't know it — they joined the group late`, que dicho a A se rompe |
| A · `You want` | `it has to be written in the café group today` | va detrás de `You need someone to open on Saturday the 12th, and…` |
| A · `Where you are` | `Saturday is in four days` | va detrás de `You have been waiting half an hour for the right moment` |
| B · `If you walk away with nothing` | `you are going to need exactly this favor next month` | la deixis invertida aquí **sí** serviría a B, pero la primera cláusula (`You work with this person every day`) rompe la línea |
| A · `Where you are` | `Nayibe, the manager, is at the other café` | va dentro de la oración de las 3:40 y la máquina apagada; con el arreglo 6 conviene revisarla a la vez |

---

## La lupa sobre la columna `here` — 19 de 20 celdas limpias

Era el punto de riesgo declarado. **Cae una: la fila `shift` de A** (hallazgo 8). El resto no
entrega nada dicho:

- Ninguna celda lleva comillas ni cursiva. La cursiva que cayó en la ronda anterior
  (`to be off · *I'm off on Friday the 18th*`, `in a row · *sixteen hours in a row*`) ya no está:
  hoy son `your free days, for when you offer them back` y `the words for sixteen hours with no
  break`. Correcto: dicen para qué sirve la palabra, no qué se dice con ella.
- Ninguna empieza por pronombre + verbo conjugado.
- Ninguna filtra el dato oculto ya hecho frase. Las tres más cerca se quedan en función:
  `a reservation → forty people at nine · your big card`; `the back-up list → what swap number three
  costs you`; `to split a shift → your way out · two ways, before the yes`.
- Una segunda celda roza la regla de notas sin ser decible: `on condition that → your one condition,
  and it doesn't move` (verbo conjugado, pero `your` invierte el referente y no es un turno). No se
  cuenta; si se toca la fila, `your one condition · the part that never moves`.

Las 20 glosas de `what it is` son sintagmas de diccionario salvo la de `non-refundable`
(hallazgo 7), que es la única frase de las veinte.

## Las tablas `Facts` — las 18 filas son notas

Ninguna tiene verbo conjugado: `opening 7:00 a.m.–3:00 p.m. · closing 3:00–11:00 p.m.`,
`third swap → the back-up list, no more fixed weekends`, `more than a million pesos · no new date,
no money back`, `wedding, sixty people — about 110,000`. Aguantan las 8 de A y las 10 de B.

## La carta y la pantalla compartida — limpias

El correo citado va en notas (`Exact time: by message at 3:00 p.m. that day`). La prosa que lo
acompaña está anclada: `from three to six on Saturday you can't promise an hour` dicha a B
significaría que el que no puede prometer es B. `You can promise that you will be there` está al
filo —un cambio de pronombre y sale—, pero no se levanta tal cual. Los cinco puntos de
`how it ends` son fragmentos de checklist, no turnos, y —a diferencia del escenario 1— esta pantalla
no lleva exponentes entrecomillados.

## El resto de la prosa — por qué aguanta

Las 55 oraciones restantes se rompen al pronunciarse: `Your bus to San Gil leaves at 5:00 on Sunday
morning` dicha a A sería el bus de A; `You already asked Katherine and Elkin` significaría que
preguntó A; `Your Speaking test is on Sunday the 13th, for now` mueve el examen al otro jugador. Las
instrucciones de pantalla (`Don't read from it.`), los códigos de la caja (`Yours: 1 [asks], 2, 4
[jargon]…`) y los criterios de `You did it if` (en pasado, y sobre el juego) no son turnos.

## Fuera de encargo, visto al ejecutar el contador

`fase7-fichas-4-a-charge-i-did-not-make.md`, ROLE B: **457 palabras**, por encima del techo de 450.
El contador canónico lo marca con `*` y sale con código 1. No es este escenario, pero el molde no
puede darse por cerrado mientras el guardián del set esté en rojo por otra ficha.
