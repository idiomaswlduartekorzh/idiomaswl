# Calibración de nivel — inglés A2 · escenario 4 (nuevo) · `the-pot-is-already-on`

Auditoría de `habla-calibrador-nivel` sobre `artifacts/habla-a2/fase8-fichas-4nuevo.md`
(diseño: `fase8-escenario-4nuevo.md`). Norma: §4, §10 y §11 de
`docs/habla-acompanado-blueprint.md`. Anclas verificadas slug a slug contra
`src/data/grammar/registry.ts` → `src/data/grammar/ingles/a2/`.

**Veredicto: CABE CON CAMBIOS.** El motor es A2 y la ruta mínima existe, pero **solo después
de tocar 6 exponentes**: hoy hay dos turnos del rol B que un A2 no puede producir, y con ellos
dentro la ruta mínima se rompe. Nada de esto exige cambiar el escenario ni subirlo de nivel.

No reescribo las fichas. Nombro el cambio y vuelve a `habla-fichas-de-rol`.

---

## 1 · El acto de habla existe en el nivel (§4)

| acto declarado | §4 hoy | veredicto |
|---|---|---|
| `recomendar` | **no aparece en ninguna fila** de §4 | material A2 — `should-advice` es tema publicado de A2. §4 tiene un hueco, no el escenario |
| `insistir` | fila **B1** | sostenido **solo si** §4 acepta la versión A2 del diseño (§0) |
| `conceder-con-condición` | fila **A2** («conceder poniendo una condición simple») | ✔ |

Los seis actos que además **produce** el mapa de 18 turnos —`pedir-aclaración`, `dar-dato/razón`,
`quejarse`, `proponer-alternativa`, `rechazar`, `conceder`— están todos en A2 o por debajo.

**Sobre `insistir`.** La definición operativa del diseño (volver a pedir con **razón nueva** +
**condición simple**, sin atenuador largo, sin reproche indirecto, sin ironía) es producible
enteramente con `connectors-a2`, `have-to-must` y `first-conditional`, los tres de A2. Los cuatro
turnos de `insistir` de este escenario (5, 9, 10, 13) no piden nada más. **Confirmo el nivel del
acto tal como lo define §0 del diseño.** Escribir esa fila en §4 es de `habla-blueprint`, no mío:
mientras no esté, este escenario declara un acto que la norma sitúa un nivel más arriba.

**Y confirmo la regla de dosis**, porque aquí se ve: `insistir` cuatro veces sin reloj físico es
grosería. Con la olla y la moto corriendo, cada repetición tiene un porqué nuevo que no es la
terquedad del hablante. El escenario cumple su propia regla.

---

## 2 · Cada exponente, uno por uno

### ROLE A — Fabián

| # | exponente | veredicto |
|---|---|---|
| 1 | `How many are coming at one?` | ✔ present continuous futuro + *how many* |
| 2 | `The cassava goes in at twelve, and it's ready at one.` | ✔ presente de horario. **Pero `cassava` no está glosada** (ver §5) |
| 3 | `This pot doesn't leave the fire.` | ✔ presente negativo |
| 4 | `I have to know before twelve, because the chicken goes in then.` | ✔ `have to` + `because` |
| 5 | `The second chicken came out of the fridge at seven.` | ✔ pasado irregular |
| 6 | `If you don't tell me a number, I'll cook for four.` | ✔ primer condicional |
| 7 | `You should tell them to leave the water at one thirty.` | **CAMBIA** |
| 8 | `Two rounds, then: some at one and the rest at three.` | **CAMBIA** |
| 9 | `The container can go, but only if you come back at three.` | ✔ `can` + `but` + `only if` + presente |

**A7 sale, entra:** `You should tell them: get out of the water at one thirty.`
Dos motivos. `tell + objeto + to-infinitivo` es complemento directivo, no A2. Y *leave the
water* es ambiguo para un A2 leído: se parsea antes como «deja el agua ahí» que como «sal del
río». Ancla: `should-advice` + imperativo (A1).

**A8 sale, entra:** `We can do it in two rounds: some at one, and the rest at three.`
Es el **único** exponente de `proponer-alternativa` que tiene A (turno 15) y hoy es una frase
sin verbo. §10 avisa exactamente de esto: un escenario cuyo acto es proponer alternativas y no
tiene ninguna forma de proponer una. Ancla: `can-ability` (A1) + `quantifiers` (*some / the rest*).

### ROLE B — Duván

| # | exponente | veredicto |
|---|---|---|
| 1 | `They left at ten because of the heat.` | **CAMBIA** |
| 2 | `I'm heading out at eleven forty. Édgar takes one person.` | ✔ |
| 3 | `You should turn the fire down and come with me.` | ✔ separable con sustantivo en medio, permitido |
| 4 | `They can eat at three, and you cook once.` | ✔ |
| 5 | `I got here at nine, and I didn't change the plan.` | ✔ |
| 6 | `What's ready right now, and what stays good cold?` | **CAMBIA** |
| 7 | `Nothing big fits on that bike.` | ✔ límite, pero pide glosar `to fit` (ver §5) |
| 8 | `I can't show up empty-handed, so I'm not leaving with nothing.` | **CAMBIA** |
| 9 | `I'll bring back the ones I can, but only if there's a plate for them.` | **CAMBIA** |

**B1 sale, entra:** `They left at ten because it was hot.`
`connectors-a2` enseña `because` + oración. `because of` + sustantivo no está en el tema y es
justo la forma que el hispanohablante calca mal. Ancla: `connectors-a2` + `past-simple-be`.

**B6 sale, entra:** `What is ready now? And what can I take cold?`
*stays good cold* es idiomatismo nativo (verbo copulativo + dos adjetivos apilados): un A2 lo
entiende y no lo produce, y este es el turno del dato que **solo sale preguntando abierto**
(§3.3). Si el exponente no es producible, la cura del ping-pong no ocurre.

**B8 sale, entra:** `I can't show up empty-handed, so I need something before I go.`
`I'm not leaving with nothing` es concordancia negativa: lógicamente dice lo contrario de lo que
quiere decir, y es la trampa exacta del hispanohablante. Ancla: `connectors-a2` (*so*).

**B9 sale, entra:** `I'll bring some of them back, but only if there's a plate for them.`
*the ones I can* elide el complemento del modal detrás de un relativo sin pronombre. Es B1+, y
es la **concesión con condición de B**, o sea la línea que cierra el escenario por su lado.
Ancla: `will-future` + `first-conditional` + `quantifiers`.

Con los seis cambios, los 18 exponentes quedan dentro de A2 hablado. **Cero** `could` de
cortesía, `would rather`, pasiva, pregunta incrustada o condicional hipotético.

---

## 3 · Lo que hay que LEER: prosa A2 legible (§11)

La ficha declara «prosa legible, no telegrama». Se cumple en la mayor parte, y falla en once
líneas. Cinco son telegramas y seis son idiomatismo por encima del nivel.

**Rol A — telegrama, la falta grave:**

- `In before twelve, it feeds twelve. Not in, it goes bad tonight.` → es literalmente el patrón
  que §11 prohíbe (`if nobody goes: her news, tonight`). Entra: *If it goes in before twelve, it
  feeds twelve. If it doesn't go in, it goes bad tonight.*
- `Twelve plates and nobody at the table.` → *There are twelve plates and nobody at the table.*

**Rol A — por encima del nivel:**

- `before the fire gets to twelve` → *before twelve o'clock*. El fuego no llega a las doce.
- `not stubbornness` → fuera la palabra. *Raw cassava and hot water are the reason.*
- `You don't say the group did wrong.` → inglés torcido. *You don't say the group made a mistake.*
- `Put two ways on the table before the yes.` → *You put two options on the table before he says yes.*
- `That's firewood, not habit.` → metáfora indescifrable en L2. *It's a wood fire. It needs you.*
- `If he rides off with nothing settled` → *If he rides off and you have no answer*.
- `you haven't said so` → *you haven't told him*.

**Rol B — el más cargado, y con el único `would` del set:**

- `You told him at ten that everybody would be here at one` → **`would`.** Es futuro
  desplazado, no condicional hipotético, pero no hay ningún tema de A2 que lo sostenga.
  Entra: *At ten you told him one thing: everybody back here at one.*
- `at 11:11 she wrote that she stays there until four` → concordancia de tiempos rota en el
  propio inglés. *Her message came at 11:11: she stays there until four.*
- `That card is your strongest and it cuts both ways: play it early, and he answers that they
  should walk back.` → modismo B2 + imperativo condicional + subordinada reportada, todo en una
  línea. *That card is your best one, and it can also hurt you. If you play it early, he says
  the easy thing: they can walk back.*
- `Only what fits between your feet goes on that bike.` → relativa libre en sujeto.
  *On that bike you can only carry something small, between your feet.*
- `Nothing big rides between your feet. A cooler does. A pot never will.` → dos elipsis con
  proverbo. *Nothing big rides between your feet. A cooler fits. A pot never fits.*
- `The heat took six of your friends down to the river at ten.` → causativo figurado.
  *Six of your friends went down to the river at ten, because it was very hot.*
- `Six people at a river with no food, no store, no car until four — and your message sent them
  there.` → sin verbo principal. *Six people are at a river with no food, no store and no car
  until four. Your message sent them there.*
- `Behind you, lunch for twelve and one man alone at the fire.` → *Behind you there is lunch for
  twelve, and one man alone at the fire.*

Ninguna de las sustituciones se puede decir tal cual en la conversación: todas siguen hablando
**de** él en segunda persona. La prueba de calcabilidad no se relaja. Verificarla otra vez es de
`habla-calcable`; aquí solo garantizo que lo propuesto no la empeora.

---

## 4 · Los datos duros, y la trampa del `since`

Horas (11:20, 11:40, 12:00, 12:40, 1:00, 1:30, 3:00, 4:00, 11:11), fecha (*Sunday, September 20*)
y numerales (six, twelve, sixteen) son todos decibles en A2: `telling-time` y las fechas son A1.
**Ningún dato hay que cambiarlo por indecible.** Pero tres notas empujan solas a la estructura
prohibida:

| ficha | nota de hoy | entra | por qué |
|---|---|---|---|
| A · datos | `on since 9:00` | `lit at 9:00` | *on since nine* se rinde como `It's been on since nine` — present perfect de duración, prohibido |
| A · datos | `out of the fridge since 7:00` | `cut at 7:00 · out of the fridge` | igual |
| B · datos | `six people since 10:00` | `six people · they went at 10:00` | igual |

La ficha se defiende diciendo que *since* «vive en la tabla, donde es una nota». Es cierto para
la puerta de calcabilidad y falso para la de nivel: la nota es el molde del que sale la frase, y
esta nota solo tiene un molde, y es B1. Con `lit at 9:00` la frase que sale es `I lit the fire at
nine` — pasado simple, A2, y además es la que ya está en la prosa.

---

## 5 · El bloque de vocabulario

**Las 20 glosas son más simples que la palabra que definen, con dos excepciones y dos bajas.**

**Rewrite (glosa más pesada que la entrada):**

- `to go bad — to stop being safe to eat` → `to become bad, so you can't eat it`.
  *stop + gerundio + adjetivo + infinitivo* es más gramática que la que enseña la entrada.

**Baja 1 — `a lid` (rol A) sale.** Falla la prueba de §11 («¿puede este rol llegar al cierre sin
esta palabra?»): no aparece en ningún dato duro de A, en ningún exponente de A, y **tampoco en
ninguno de B**, así que no es de las «que le va a soltar el otro». Su columna `here` —*the small
thing he'll tell you to do*— promete un turno que no existe en el mapa de 18.

**Entra en su sitio:** `cassava and plantain — a white root and a green banana, cooked in water`.
Están en la prosa de A, en la tabla del fuego, en la tabla de datos y **dentro del exponente A2**,
y hoy no se glosan en ninguna parte. Un A2 no colombiano no las tiene, y son la razón física del
«no» de todo el escenario.

**Baja 2 — `to pick someone up` (rol B) sale.** El propio diseño (§10) mandaba comprobarlo, y
choca: el escenario 7 ya publica `to give someone a ride — to take a person somewhere in your
car`, y aquí se glosa `to take someone in your car`. Misma definición, mismo campo, dos entradas.
Además no aparece en ningún exponente de B.

**Entra en su sitio:** `to fit — to be small enough for a space`. Está en el encabezado del
bloque propio de B (*The bike, and what fits*), en la fila `nothing big` de los datos, y **es el
verbo del «no» rotundo de B** (`Nothing big fits on that bike.`). Es la palabra que hoy se usa
tres veces sin definirse.

Las 18 restantes pasan. La columna `here` es nota de propósito en las veinte: ni una comilla, ni
un ejemplo, ni una celda que empiece por pronombre y verbo conjugado.

---

## 6 · La ruta mínima — la prueba que decide

Doce turnos, solo lengua de A2, con los seis exponentes ya corregidos. Cierra las tres líneas de
cada rol, la conjunta y la que queda abierta con nombre y hora.

> **F1** — The chicken goes in at twelve. How many are coming at one?
> **D1** — They left at ten because it was hot. And I'm heading out at eleven forty.
> **F2** — This pot doesn't leave the fire. The cassava goes in at twelve, and it's ready at one. `[A-1]`
> **D2** — You should turn the fire down and come with me.
> **F3** — I have to know before twelve, because the second chicken goes in then. My mother comes at one with four more. I need somebody at the gate, and I can't leave the fire. `[carta + A-3]`
> **D3** — I got here at nine, and I didn't change the plan. What is ready now? And what can I take cold?
> **F4** — There's rice and chicken in the fridge, from Saturday. That's my lunch on Monday and Tuesday. `[A-2]`
> **D4** — I can't show up empty-handed, so I need something before I go. Marcela's car stays there until four. Six come back: Édgar takes two, and the rest walk. `[B-1 + B-2]`
> **F5** — We can do it in two rounds: some at one, and the rest at three.
> **D5** — I'll tell them before one: out of the water at one thirty. `[B-3]`
> **F6** — The container can go, but only if you come back at three. And you're at the gate when my mother comes. `[conceder + conjunta]`
> **D6** — Three o'clock, and I'm at the gate. I'll bring some of them back, but only if there's a plate for them. My aunt eats in the second round — I tell her myself. `[conceder + lo abierto]`

**Escrita sin los cambios, la ruta se rompe en D3 y en D6**: `What stays good cold?` y `I'll
bring back the ones I can` son las dos únicas piezas que un A2 no puede producir, y son
justamente el dato de pregunta abierta y la concesión final de B. Ese es el argumento de peso
para que los seis cambios entren, y también la prueba de que el escenario es A2 **con** ellos:
todo lo demás de la ruta ya está en el nivel.

Doce turnos > 6 (puerta 11 ✔) y ≤ 18 (§4: 9 por rol ✔). Siete minutos aguantan.

---

## 7 · `grammarReferences` — anclado slug a slug

Verificado contra `src/data/grammar/ingles/a2/`. **Los cinco del diseño existen**; el título de
`connectors-a2` estaba abreviado y aquí va el literal. **Faltaban dos** que los exponentes usan y
nadie ancló: el present continuous de futuro (`How many are coming at one?`, `I'm heading out at
eleven forty`) y el pasado irregular (`came out`, `got here`, `left at ten`). Listo para pegar:

```ts
grammarReferences: [
  {
    slug: 'first-conditional',
    title: 'El Primer Condicional en Inglés A2',
    rationale: 'Las dos concesiones con condición y el tercer «insistir»: If you don\'t tell me a number, I\'ll cook for four.',
  },
  {
    slug: 'have-to-must',
    title: 'Have to y Must en Inglés A2',
    rationale: 'La obligación física del que manda: hay que quedarse con el fuego, y hay que saber el número antes de las doce.',
  },
  {
    slug: 'connectors-a2',
    title: 'Conectores en Inglés A2: because, so, although, however, but',
    rationale: 'La razón nueva de cada «insistir» y el contraste de cada concesión: because, so, but.',
  },
  {
    slug: 'should-advice',
    title: 'Should y Shouldn\'t en Inglés A2',
    rationale: 'Los tres «recomendar», y en las dos direcciones: cada uno aconseja sobre el lado del otro.',
  },
  {
    slug: 'present-continuous-future-a2',
    title: 'Present Continuous para el futuro en Inglés A2: planes concretos',
    rationale: 'Los dos relojes puestos uno al lado del otro: How many are coming at one? / I\'m heading out at eleven forty.',
  },
  {
    slug: 'past-simple-irregular',
    title: 'Past Simple Verbos Irregulares en Inglés A2',
    rationale: 'Lo que ya pasó y nadie puede cambiar: se fueron a las diez, la gallina salió a las siete, él llegó a las nueve.',
  },
  {
    slug: 'quantifiers',
    title: 'Cuantificadores en Inglés A2',
    rationale: 'El número que decide la gallina y el reparto de las dos tandas: how many, some, the rest, nothing.',
  },
]
```

**Corrección al diseño:** la justificación de `quantifiers` decía «*how many, enough, too much*».
El tema publica *much, many, a lot of, few, little, some, any*: `enough` y `too much` no están en
él y no pueden citarse como ancla. La versión de arriba ya lo corrige.

**Comprobado que no se cuela ninguno sin sufijo.** El diseño usa `connectors-a2`, que es el slug
real. Los que devolverían `null` y no aparecen: `connectors`, `past-continuous`, `used-to`,
`relative-clauses`, `prepositions-movement`, `present-continuous-future`. `can-ability`,
`wh-questions`, `imperative` y `telling-time` sostienen exponentes de este escenario pero son de
**A1**: se usan, no se citan, porque §4 ancla al registro **del nivel**.

---

## 8 · Lo que no es mío

- **Que §4 recoja `recomendar` y la versión A2 de `insistir`.** Confirmo que los dos son A2 con
  el material publicado; escribir las filas es de `habla-blueprint`. Sin ellas, este escenario
  declara dos actos que la norma no le concede.
- **La puerta 4 en el conjunto de la tabla.** Los nueve exponentes de A, leídos en orden, son casi
  el arco de sus nueve turnos (1, 3, 3, 5, 9, 13, 7, 15, 17). Fila a fila no resuelve nada; la
  tabla entera se acerca a la conversación. Es de `habla-calcable`, y se lo paso nombrado.
- **El recuento de prosa.** Las sustituciones de §3 alargan la prosa: `In before twelve…` pasa de
  10 a 16 palabras, y B suma unas 25. A partía de 432 y B de 441 sobre un techo de 450. **B se
  pasa con estos cambios.** Hay que recortar en otra parte, y el sitio barato es el bloque `What
  you haven't said yet` de B, hoy el más retórico. Medirlo es del contador canónico, no mío.
