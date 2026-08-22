# Calibración de nivel — inglés A2 · escenario 4 (nuevo) · `the-pot-is-already-on`

Auditoría de `habla-calibrador-nivel` sobre **el texto de hoy** de
`artifacts/habla-a2/fase8-fichas-4nuevo.md` (tercera pasada del 21 ago 2026 + cuarta pasada de
reparto de género, ya aplicadas en el archivo). Norma: §4, §10 y §11 de
`docs/habla-acompanado-blueprint.md`. Anclas verificadas slug a slug contra
`src/data/grammar/registry.ts` → `src/data/grammar/ingles/a2/`.

Las auditorías de fase 8 se usan solo como registro de lo que se dijo antes. Nada se da por
bueno por venir de ellas: los 18 exponentes, las 20 glosas y las dos prosas se han vuelto a
leer sobre el archivo actual.

> **Veredicto: CABE CON CAMBIOS.** El motor es A2, la ruta mínima existe y **ningún exponente
> está fuera de nivel**: los seis que la pasada anterior mandó cambiar están cambiados y no ha
> entrado ninguno nuevo por encima del nivel. Lo que queda son **dos arreglos de nivel** (una
> definición en pasiva y un acto central sin forma), **una incoherencia aritmética en la carta**
> y **una lista de prosa que hoy pide más inglés del que da**. Nada exige subir el escenario de
> nivel ni tocar el motor.

No reescribo las fichas. Nombro el cambio y vuelve a `habla-fichas-de-rol`.

---

## 0 · Las bandas de la cabecera (§4)

| qué | declarado | §4 A2 | veredicto |
|---|---|---|---|
| minutos | **7 min**, en cabecera y en las dos fichas (`9 turns · 7 minutes`) | 5–8 | ✔ |
| turnos por rol | **9** (18 globales), en cabecera y en las dos fichas | 6–9 | ✔ |
| misma unidad en las dos fichas | sí: las dos dicen «9 turns · 7 minutes» | — | ✔ |

Aquí no hay rastro de los `12` ni de los `17` que declaraban otras fichas. La banda está bien
puesta y bien repetida.

**Pero la carta contradice la banda.** Dice: *«When her fourth turn ends — global turn 5, and
it's yours.»* Con **A hablando primero**, los turnos de ella son los globales 2, 4, 6 y 8: su
cuarto turno termina en el **global 8**, y el siguiente turno de A es el **9**, no el 5. El
global 5 es el **tercer** turno de A, o sea justo después del **segundo** de ella.

**Cambio 1 — elige una de las dos y bórrala de la otra:**
- `When her second turn ends — global turn 5, and it's yours.` ← recomendada: es la que deja la
  carta a mitad de camino y la que casa con el mapa de 18 turnos del diseño.
- `When her fourth turn ends — global turn 9, and it's yours.`

No es una pega de estilo: la carta es la que reparte la segunda mitad de la conversación de A,
y con dos relojes distintos escritos en la misma línea el jugador lento la abre tarde y el
rápido la abre pronto.

---

## 1 · El acto de habla existe en el nivel (§4)

| acto declarado | §4 hoy | veredicto |
|---|---|---|
| `recomendar` | **no aparece en ninguna fila** de §4 | material A2: `should-advice` es tema publicado del nivel. El hueco es de §4, no del escenario |
| `insistir` | fila **B1** | **el único punto donde la norma y la ficha no coinciden.** Lo que el escenario produce sí es A2 (ver abajo) |
| `conceder-con-condición` | fila **A2** («conceder poniendo una condición simple») | ✔ |

Los actos que además **produce** el mapa de turnos —`pedir-aclaración`, `dar-dato/razón`,
`quejarse`, `proponer-alternativa`, `rechazar`, `conceder`— están todos en A2 o por debajo.

**Sobre `insistir`.** Aquí insistir es *volver a pedir con una razón nueva y ponerle un precio a
la espera*. Se produce entero con `have-to-must`, `connectors-a2` y `first-conditional`, los
tres del nivel: `I have to know before …, because …` · `If you don't tell me a number, I'll
cook for …` · `They ate at seven, and nothing is open …`. No hay atenuador largo, ni reproche
indirecto, ni ironía — que es lo que pone `insistir` en B1. **Confirmo que lo escrito es A2.**
Escribir la fila en §4 es de `habla-blueprint`; mientras no esté, este escenario declara un acto
que la norma sitúa un nivel más arriba. **No es motivo para bajar ni subir la ficha.**

---

## 2 · Cada exponente, uno por uno (§1 del encargo)

Estructuras prohibidas: **cero** en las dos tablas. Verificado a mano y con búsqueda literal
sobre el archivo: no hay `would`, no hay `could` de cortesía, no hay pasiva en ningún exponente,
no hay present perfect con *for/since*, no hay pregunta incrustada, no hay modal + infinitivo
perfecto, no hay condicional hipotético, no hay `would rather` / `would prefer`. El único
present perfect del archivo es **normal** (`you have not said a word about it`, prosa de B) y lo
sostiene `present-perfect-basic`, tema publicado de A2: **se queda**.

### ROLE A — Fabián (9 filas · 11 formas)

| fila | forma(s) | veredicto |
|---|---|---|
| advice, about her side | `You should tell them: get out of the water at …` | ✔ `should-advice` + imperativo (A1). El `tell + obj + to-inf` que caía antes ya no está |
| asking again, with a new reason | `I have to know before …, because …` · `If you don't tell me a number, I'll cook for …` | ✔ `have-to-must`, `connectors-a2`, `first-conditional` |
| asking how they get back | `And how do you all get back from …?` | ✔ wh + presente simple. `you all` es americano informal y aquí es correcto |
| opening | `Come here a second, before you …` | ✔ imperativo + `before` + oración |
| the gate, at one | `Somebody has to be at the gate at …, and it can't be …` | ✔ |
| the pot, and how many | `The cassava goes in at …, and it's ready at …` · `That's twelve servings, and the pot doesn't leave …` | ✔ de nivel, **pero la fila no cumple su propio título**: ver cambio 2 |
| two rounds | `We can do it in two rounds: some at …, and the rest at …` | ✔ `can` (A1) + `quantifiers` |
| what it costs you | `There's rice and chicken in there from …, and that's my lunch on …` | ✔ |
| yes, with a string | `The container can go, but only if …` | ✔ |

**Cambio 2 — el acto central de A no tiene forma.** El objetivo de A es *un número*, y su
restricción 3 le pide a ella **tres** cosas: cuántos, antes de qué hora y cómo vuelven. De las
tres, solo *cómo vuelven* tiene forma en la tabla. La fila se llama **«the pot, and how many»**
y dentro no hay ningún *how many*. Un A2 puede producir la pregunta sin ayuda —wh + presente es
A1— así que **no es un fallo de nivel, es un agujero de andamiaje** (§2 «Andamiaje», puerta 4),
y es el agujero justo en el turno del que depende el escenario.

> **Entra**, en la fila `the pot, and how many`: `How many are coming back at …?`
> No filtra nada: el objetivo de A ya dice que quiere un número, y la forma no nombra ni la
> moto ni el carro. Y es la que devuelve el anclaje a `present-continuous-future-a2` (ver §5).

### ROLE B — Astrid (9 filas · 14 formas)

| fila | forma(s) | veredicto |
|---|---|---|
| advice, about his side | `You should turn the fire down and …` · `Put a lid on it and …` | ✔ separable con sustantivo en medio, permitido |
| asking what's ready | `What is ready now?` · `And what can I take cold?` | ✔ con reserva: `take … cold` es adjetivo predicativo del objeto, entendible pero poco producible. **Alternativa segura:** `And what can I take? It has to be cold.` |
| complaining | `I got here at nine, and I didn't …` | ✔ |
| insisting, with a new reason | `They ate at seven, and nothing is open …` · `I can't show up empty-handed, so I need something before I …` | ✔ la concordancia negativa (`I'm not leaving with nothing`) ya no está |
| opening, and what happened | `About the river …` · `They left at ten because it was …` | ✔ `because` + oración, no `because of` |
| saying no to the bike | `Nothing big fits on …` | ✔ |
| taking it back | `At ten I told you …. That's not true now.` | ✔ **si el hueco se llena con un número o un sintagma** (*«twelve»*, *«everybody»*). Con una oración detrás pide estilo indirecto, que es B1. Conviene que la columna de la derecha lo diga: *«a number, not a sentence»* |
| who rides and who walks | `Marcela can take …, and the rest walk from …` · `They can be out of the water at …` | ✔ |
| yes, with a string | `I'll bring some of them back, but only if …` | ✔ el `the ones I can` ya no está |

**Nota de banda, no de nivel:** las dos tablas tienen **9 filas** (§11: exponentes 6-9 ✔), pero
**11 y 14 formas**. Si el guardián cuenta formas y no filas, B se pasa de 10. Hay que **declarar
la unidad** —es de `habla-blueprint`—; contando filas, las dos fichas cumplen.

---

## 3 · Lo que hay que LEER: prosa A2 legible (§11)

La prosa de hoy está **muy por encima** de la de la pasada anterior: fuera el telegrama, fuera
el `would`, fuera `stays good cold` y `That's firewood, not habit`. Las oraciones son cortas y
completas y hablan **sobre** el jugador. Quedan **doce sitios** donde la ficha pide más inglés
del que un A2 leído da, y en todos hay versión corta.

**Aviso de presupuesto:** medido con el contador canónico, A está en **445** y B en **449** sobre
450. A tiene 5 palabras de margen y B **una**. Por eso cada sustitución de abajo lleva su saldo,
y el saldo total es negativo en las dos fichas.

### ROLE A (445 → ~438 con los seis cambios)

| # | hoy | entra | por qué | saldo |
|---|---|---|---|---|
| 3 | `You lit the fire at nine, for a plan the whole group agreed to on Friday.` | `You lit the fire at nine. The group agreed to this plan on Friday.` | relativa sin pronombre + preposición al final, en la primera línea de la ficha | −2 |
| 4 | **`What you're after`** | **`What you want`** | *be after* = «querer» es modismo B1+, y es un encabezado: si no se entiende, no se entiende el objetivo | −1 |
| 5 | `how many plates you fill at one` | `how many plates at one` | pregunta incrustada + `you fill` (no es él quien llena los platos, es la olla) | −3 |
| 6 | `You put two ways on the table before she says yes.` | `You offer two options before she says yes.` | *put on the table* es modismo; y `two ways` choca con `your way out` del vocabulario | −3 |
| 7 | `because that is what a wood fire costs` | `because a wood fire needs that` | relativa libre + `cost` figurado | −2 |
| 8 | `(the fire explains the pot, not the jar)` | `(the fire explains the pot)` | **`the jar` no existe en ninguna ficha del set** — buscado en los ocho escenarios. Es un resto de otro texto y el lector no puede resolverlo | −3 |
| 9 | `The chicken went in at twelve for a real number.` (cierre) | `The chicken went in at twelve, because you had a real number.` | tal como está, nadie sabe qué es «entrar para un número» | +3 |
| 10 | `You asked for what one o'clock needs.` (cierre) | `You asked for help at one o'clock.` | relativa libre + la hora personificada, en el criterio de cierre, que es lo que **hay** que entender | 0 |

### ROLE B (449 → ~444)

| # | hoy | entra | por qué | saldo |
|---|---|---|---|---|
| 11 | **`The patio, and one foot outside it`** | **`The patio, and the road`** | metáfora en el encabezado de situación | −3 |
| 12 | **`Three lines you don't cross`** | **`Three things you won't do`** | modismo; y A ya usa la versión llana, así que además empareja las dos fichas | 0 |
| 13 | `You watched six of them leave for the river at ten in the heat.` | `You saw six of them go to the river at ten, in the heat.` | `watch + obj + infinitivo` es percepción compleja; `saw … go` es la misma pieza más barata. **Sigue en segunda persona: no se puede decir tal cual** | −1 |
| 14 | `His eleven eleven message is on your phone` | `His 11:11 message is on your phone` | `eleven eleven` escrito con letras se lee como dos números sueltos; en tabla ya va como cifra | −1 |
| 15 | `Today you know it is wrong and he doesn't.` | `Today you know it is wrong. He doesn't know.` | elipsis verbal sobre `know`: en L1 se adivina, en L2 no | +1 |
| 16 | `You give it once, and you choose when.` | `You correct it once, and you choose when.` | el `it` de `give it` no tiene antecedente: lo que se da una sola vez es la corrección | 0 |
| 17 | `You held one condition` (cierre) | `You kept one condition` | *hold a condition* no es inglés | 0 |
| 18 | `then hang a price on it` (columna derecha de exponentes) | `then say what the wait costs you` | modismo en una celda de instrucción. A dice lo mismo en llano dos filas más arriba | +2 |

### Las dos pantallas comunes (fuera del recuento de prosa)

| # | hoy | entra | por qué |
|---|---|---|---|
| 19 | `Six things get said out loud, three by each of you.` | `Each of you says three things out loud. Six in total.` | **`get` + participio es pasiva.** Está en la pantalla que leen los dos, y es la regla que decide si el juego terminó |
| 20 | `Nobody nods their way through.` | `Nobody just says yes.` | *nod your way through* es modismo nativo. La frase siguiente ya explica el sentido con `Sure, okay and fine` |

Ninguna de las veinte sustituciones se puede decir tal cual en la conversación: todas siguen
hablando **del** jugador en segunda persona. Volver a pasar la puerta de calcabilidad es de
`habla-calcable`; aquí solo garantizo que lo propuesto no la empeora.

**Lo que sí está bien y conviene no «arreglar»:** `you have not said a word about it`
(present perfect normal, A2 publicado), `If it doesn't, you lose it tonight` (elipsis corta y
sostenida por la oración anterior), `On that bike you carry only what fits between your feet`
(la relativa libre ya no está en sujeto) y el bloque entero de «lo que se pierde» de los dos
roles, que es de lo más legible del set.

---

## 4 · Los datos duros son decibles (§5 del encargo)

Horas (6:00, 7:00, 9:00, 11:20, 11:40, 11:55, 12:00, 12:40, 1:00, 1:30, 2:00, 4:00), fecha
(*Sunday, September 20*) y numerales (six, seven, twelve, forty, fifteen) son todos decibles con
`telling-time` y las fechas de A1. **No hay que cambiar ningún dato por indecible.**

**Las tres trampas de `since` que señaló la pasada anterior están cerradas**, verificado por
búsqueda literal: no queda un solo `since` en el archivo. Hoy se lee `fire lit` en el reloj,
`cut at 7:00 · out of the fridge` en los datos de A y `six people · they went at 10:00` en los
de B. De esas notas sale pasado simple, que es del nivel; de `on since 9:00` salía present
perfect de duración, que no lo es.

`~12:40` y `11:2x` se dicen sin problema (*around twelve forty*, *eleven twenty-something*) y
además son notas de tabla, no frases.

---

## 5 · El bloque de vocabulario (§3 del encargo)

Veinte entradas, diez por rol: **una por fila, una línea cada una, definición y no traducción**.
La columna `here` es nota de propósito en las veinte: ni una comilla, ni un ejemplo, ni una
celda que empiece por pronombre + verbo conjugado. **Dieciocho glosas son más simples que la
palabra que definen. Dos no.**

**Cambio 3 — `a round` (rol A). La definición está en pasiva.**

- Hoy: `a round — one time that everybody is served`
- Entra: **`a round — one time when everybody gets food`**

*is served* es exactamente la estructura que el nivel no tiene, puesta en la casilla que existe
para simplificar. Y la palabra la obliga a decir el cierre conjunto («the time of the second
round»), así que no se puede resolver quitándola.

**Cambio 4 — `to hang out` (rol B). La definición no es inglés.**

- Hoy: `to hang out — to spend easy time with friends`
- Entra: **`to hang out — to spend free time with friends, doing nothing special`**

*easy time* no significa nada; el estudiante no puede reparar lo que no reconoce.

Las otras dieciocho pasan sin tocar. Cuatro que conviene dejar como están porque están bien
resueltas: `cassava — a white root you boil and eat, like a potato` (la razón física de todo el
«no» del escenario, y hasta esta pasada no se glosaba), `to fit — to be small enough for a
space` (se usa tres veces), `a lid — the top that closes a pot` (bien movida a B, que es quien
la dice) y `empty-handed — with nothing in your hands`.

La prueba de §11 —«¿puede este rol llegar al cierre sin esta palabra?»— la pasan las veinte:
`a day off` y `to hang out` son las dos razones nuevas de B, y sin ellas B se queda muda a
partir del turno 10.

---

## 6 · La ruta mínima — la prueba que decide (§4 del encargo)

Doce turnos (6 por rol, ≤9 ✔ · >6 globales ✔), **solo con lo que hay hoy en las fichas** más el
`How many are coming back at …?` del cambio 2. Cierra las tres líneas de cada rol, la conjunta,
y deja lo abierto con nombre y hora. Cero estructura de las prohibidas.

> **F1** — Come here a second, before you head out. The cassava goes in at twelve, and it's ready at one. That's twelve servings, and the pot doesn't leave the fire. `[A-1]`
> **A1** — About the river. They left at ten because it was very hot. And I'm on Marcela's bike at eleven forty.
> **F2** — I have to know before twelve, because the second chicken goes in then. How many are coming back at one? `[cambio 2]`
> **A2** — At ten I told you twelve. That's not true now. Six are there, and they can be out of the water at one thirty. Marcela can take one, and the rest walk from the river — forty minutes. `[B-1 + B-2]`
> **F3** — `[carta]` There's rice and chicken in there from Saturday, and that's my lunch on Monday and Tuesday. Somebody has to be at the gate at one, and it can't be me. `[A-2 + A-3]`
> **A3** — I can't show up empty-handed, so I need something before I head out. What is ready now? And what can I take? It has to be cold.
> **F4** — If you don't tell me a number, I'll cook for seven. You should tell them: get out of the water at one thirty.
> **A4** — I'll tell them before one: out of the water at one thirty. They ate at seven, and nothing is open there. `[B-3]`
> **F5** — We can do it in two rounds: some at one, and the rest at three. `[conjunta 1]`
> **A5** — You should turn the fire down and put a lid on it. Marcela brings me back at twelve forty, and I'm at the gate at one. `[conjunta 2]`
> **F6** — The container can go, but only if you come back at three. My aunt eats in the second round, and I tell her myself. `[conceder + lo abierto]`
> **A6** — I'll bring some of them back, but only if there's a plate for them. `[conceder]`

**La ruta se escribe entera con lengua de A2 y no se rompe en ningún punto.** Ese es el
argumento de que el escenario es del nivel. La pasada anterior se rompía en dos sitios (`What
stays good cold?` y `I'll bring back the ones I can`): hoy no se rompe en ninguno. Siete
minutos aguantan doce turnos con holgura, y los 18 del techo caben en la banda.

---

## 7 · `grammarReferences` — anclado slug a slug

Verificado contra `src/data/grammar/ingles/a2/` (21 temas). **Los siete existen con ese slug
exacto.** Los que devolverían `null` y **no** aparecen aquí: `connectors`,
`present-continuous-future`, `relative-clauses`, `past-continuous`, `used-to`,
`prepositions-movement` — los seis reales llevan sufijo `-a2`.

```ts
grammarReferences: [
  {
    slug: 'should-advice',
    title: 'Should y Shouldn\'t en Inglés A2',
    rationale: 'Los dos «recomendar», y en las dos direcciones: cada uno aconseja sobre el lado del otro, nunca sobre el propio.',
  },
  {
    slug: 'have-to-must',
    title: 'Have to y Must en Inglés A2',
    rationale: 'La obligación física del que manda: hay que saber el número antes de las doce, y alguien tiene que estar en el portón a la una.',
  },
  {
    slug: 'connectors-a2',
    title: 'Conectores en Inglés A2: because, so, although, however, but',
    rationale: 'La razón nueva de cada «insistir» y el contraste de cada concesión: because, so, but.',
  },
  {
    slug: 'first-conditional',
    title: 'El Primer Condicional en Inglés A2',
    rationale: 'Las dos concesiones con condición y el precio de la espera: If you don\'t tell me a number, I\'ll cook for… / but only if…',
  },
  {
    slug: 'past-simple-irregular',
    title: 'Past Simple Verbos Irregulares en Inglés A2',
    rationale: 'Lo que ya pasó y nadie puede cambiar: se fueron a las diez, comieron a las siete, ella llegó a las nueve, y lo que dijo a las diez.',
  },
  {
    slug: 'quantifiers',
    title: 'Cuantificadores en Inglés A2',
    rationale: 'El número que decide la gallina y el reparto de las dos tandas: how many, some, the rest, nothing.',
  },
  {
    slug: 'present-continuous-future-a2',
    title: 'Present Continuous para el futuro en Inglés A2: planes concretos',
    rationale: 'Los dos relojes puestos uno al lado del otro: How many are coming back at one? / I\'m on Marcela\'s bike at eleven forty.',
  },
]
```

**Aviso sobre el séptimo.** `present-continuous-future-a2` **solo se sostiene si entra el cambio
2** (`How many are coming back at …?`). Tal como está la tabla hoy, **ningún exponente** usa
present continuous de futuro —la forma `How many are coming at one?` de la pasada anterior se
perdió al reagrupar por función—, y un ancla sin exponente que la ejercite es adorno. Si el
cambio 2 no entra, este bloque sale y quedan seis.

**Dos que se podrían citar y no cito, por no inflar:** `past-simple-be` (`because it was …`, un
solo exponente) y `will-future` (los dos `I'll …` viven dentro de condicionales, que ya cubre
`first-conditional`). Si `habla-fichas-de-rol` los quiere, los slugs y títulos exactos son
`past-simple-be` → *Past Simple de "to be" en Inglés A2* y `will-future` → *El Futuro con Will
en Inglés A2*.

**Lo que se usa y no se cita, porque es A1 y §4 ancla al registro del nivel:** `wh-questions`,
`imperative`, `can-ability`, `telling-time`, `present-simple-affirmative` y
`present-simple-negative`. Sostienen media tabla de exponentes (`The cassava goes in at …`,
`Nothing big fits on …`, `Come here a second`, `We can do it in two rounds`) y por eso el
escenario aguanta: la mitad de lo que hay que decir está por debajo del nivel, no en el borde.

---

## 8 · Recuento de prosa, comprobado

Medido **solo** con `artifacts/habla-a2/fase7-scripts/prosa-canonica.mjs`, copiando el archivo a
`fase7-fichas-4nuevo-TMP.md` y borrando la copia después:

| ficha | declarado en el archivo | medido hoy | techo §11 |
|---|---|---|---|
| ROLE A — Fabián | 445 | **445** | 450 ✔ |
| ROLE B — Astrid | 449 | **449** | 450 ✔ |

**Lo declarado es exacto.** Con los cambios de §3 A baja a ~438 y B a ~444: **las dos siguen
dentro y con más aire que hoy**, y no se quita ninguna de las ocho piezas obligatorias.

(De paso, y no es mío: en la misma corrida, `fase7-fichas-4-a-charge-i-did-not-make.md` da
**B = 457**, fuera de techo. Es la ficha que este escenario sustituye; si esa se retira, el set
queda 16/16 dentro. Se lo paso nombrado a quien lleve el conjunto.)

---

## 9 · Lo que no es mío

- **Que §4 recoja `recomendar` y la versión A2 de `insistir`.** Confirmo que lo que este
  escenario produce es A2 con material publicado; escribir las filas es de `habla-blueprint`.
- **Declarar si los 6-10 exponentes se cuentan por filas o por formas.** Por filas, 9 y 9 ✔.
  Por formas, 11 y 14, y B se pasa. También de `habla-blueprint`.
- **La puerta de calcabilidad** sobre las veinte sustituciones de §3: de `habla-calcable`. Aquí
  solo garantizo que ninguna baja el listón —las veinte siguen en segunda persona o en nota.
- **Los dos pendientes que la propia ficha deja escritos** (el cuidado y el reparto de nombres
  fuera de escena) son de `habla-equidad`; la cuarta pasada ya cerró el segundo con el cambio de
  vehículo entre Édgar y Marcela, y esta auditoría no lo revisa.
