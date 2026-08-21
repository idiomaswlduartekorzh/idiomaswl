# Calibración de nivel — escenario 4 (nuevo) · `the-pot-is-already-on`

Auditor: `habla-calibrador-nivel`. Fuentes: `docs/habla-acompanado-blueprint.md` §2, §4, §6, §9,
§10, §11 · `artifacts/habla-a2/fase8-fichas-4nuevo.md` · `artifacts/habla-a2/fase8-escenario-4nuevo.md`
· `artifacts/habla-a2/fase7-modelo-ficha-en.md` · `artifacts/habla-a2/caja-de-herramientas-a2.md`
· `src/data/grammar/registry.ts` (`getTopicBySlug('ingles','a2',…)`).

**Veredicto: CABE CON CAMBIOS.** El motor es A2 y la ruta mínima se escribe entera con lengua de
A2 (§4 de este informe). Lo que no está en nivel es **la prosa de lectura del rol B, la carta y
seis exponentes**, más dos anclas de gramática que faltan. Ninguno de los defectos obliga a
subir el escenario de nivel: todos se arreglan cambiando la línea.

**Yo no reescribo la ficha.** Cada cambio va nombrado —qué sale, qué entra— y vuelve a
`habla-fichas-de-rol`.

---

## 1 · El acto de habla existe en el nivel (§4)

| acto declarado | §4 dice | veredicto |
|---|---|---|
| `recomendar` | no está en ninguna de las tres filas por nombre | **cabe**: se produce entero con `should` + verbo base, que es A2 (`should-advice`). Los tres turnos aconsejan **sobre el lado del otro**, nunca sobre el propio, y eso lo mantiene fuera del consejo indirecto de B1 |
| `conceder-con-condicion` | A2 literal: «conceder poniendo una condición simple» | **cabe** |
| `insistir` | **B1** | **cabe solo con la enmienda de §4 que el propio diseño propone** (§0 de `fase8-escenario-4nuevo.md`) |

**El bloqueo, dicho sin adornos.** Hoy §4 pone `insistir` en B1 y el escenario produce **cuatro**
turnos de `insistir` (globales 5, 9, 10, 13). Leída la enmienda propuesta —volver a pedir lo mismo
con **razón nueva** y **condición simple**, con `because/so/but`, `have to` y primer condicional, y
sin atenuador largo, sin reproche indirecto y sin ironía—, **las cuatro realizaciones escritas caen
dentro de ella**: turno 5 `have to` + razón nueva, 9 razón nueva sola, 10 razón + condición,
13 razón + condición. Ninguna usa una estructura fuera de A2.

Es decir: el escenario **no** empuja `insistir` hacia B1 por la lengua; el problema es de
etiqueta, y es de `habla-blueprint`, no de esta ficha. **Dependencia declarada:** si §4 no se
enmienda, este escenario publica un acto que el blueprint prohíbe en A2 y la puerta 8 lo tumba.
No se arregla en la ficha.

## 2 · Exponente por exponente

Dieciocho filas (9 + 9). **Doce están en nivel sin tocarlas. Seis salen o se reescriben.**

### ROLE A — Fabián

| # | forma | veredicto |
|---|---|---|
| 1 | `How many are coming at one?` | **A2** · pregunta directa con *how many* + presente continuo de futuro |
| 2 | `The cassava goes in at twelve, and it's ready at one.` | **A2** · presente simple de horario + *and* |
| 3 | `This pot doesn't leave the fire.` | **A2** · presente simple negativo |
| 4 | `I have to know before twelve, because the chicken goes in then.` | **A2** · `have to` + *because* |
| 5 | `The second chicken came out of the fridge at seven.` | **A2** · pasado simple + *out of* |
| 6 | `If you don't tell me a number, I'll cook for four.` | **A2** · primer condicional |
| 7 | `You should tell them to leave the water at one thirty.` | **FUERA** |
| 8 | `Two rounds, then: some at one and the rest at three.` | **A2 con reserva** |
| 9 | `The container can go, but only if you come back at three.` | **A2** · `can` + *only if* |

**7 sale.** `tell + objeto + to + infinitivo` es orden indirecto: subordinada de infinitivo con
sujeto propio, y §4 deja fuera del A2 el discurso indirecto. Y `leave the water` se lee como
«dejar el agua», no como «salir del agua».
**Entra:** `You should call them. They have to leave at one thirty.` — `should` + `have to`, dos
oraciones, las dos anclables.

**8, reserva.** Es una elipsis sin verbo (`Two rounds, then:`). Se sostiene como habla real, pero
el A2 que la lee no sabe reproducirla. **Mejor:** `We can do two rounds: some at one, the rest at
three.` — le devuelve el verbo y no le quita nada al acto.

### ROLE B — Duván

| # | forma | veredicto |
|---|---|---|
| 1 | `They left at ten because of the heat.` | **A2** · pasado simple + *because of* |
| 2 | `I'm heading out at eleven forty. Édgar takes one person.` | **A2** · presente continuo de futuro |
| 3 | `You should turn the fire down and come with me.` | **A2** · `should` + phrasal separado por **sustantivo**, no por pronombre: la prohibición de la caja no aplica |
| 4 | `They can eat at three, and you cook once.` | **A2 con reserva** |
| 5 | `I got here at nine, and I didn't change the plan.` | **A2** · pasado simple afirmativo y negativo |
| 6 | `What's ready right now, and what stays good cold?` | **FUERA** |
| 7 | `Nothing big fits on that bike.` | **FUERA** |
| 8 | `I can't show up empty-handed, so I'm not leaving with nothing.` | **FUERA** |
| 9 | `I'll bring back the ones I can, but only if there's a plate for them.` | **FUERA** |

**4, reserva.** `you cook once` significa «cocinas **una sola** vez» y sin *only* se lee «cocinas
una vez». **Entra:** `They can eat at three, and you only cook once.`

**6 sale.** `stay good cold` es verbo copulativo resultativo + adjetivo depictivo: dos capas que
no existen en A2, y encima es **la** pregunta abierta que cura el ping-pong (§3.3). Si esa
pregunta no se puede decir, el escenario pierde su cura.
**Entra:** `What is ready now, and what doesn't need the fire?` — sigue siendo abierta, sigue sin
poderse contestar con sí o no, y es presente simple afirmativo + negativo.

**7 sale.** `nothing big` (indefinido + adjetivo pospuesto) es A2 alto/B1 y es el **no rotundo**
del rol.
**Entra:** `Big things don't fit on that bike.`

**8 sale.** Dos negaciones en una oración (`can't` … `not leaving with nothing`). El A2 la
desarma mal y puede entenderla al revés, que es lo peor que le puede pasar a un turno de insistir.
**Entra:** `I can't show up empty-handed. If there's nothing, I don't go.` — misma insistencia,
misma condición, primer condicional.

**9 sale.** `the ones I can` es relativa de objeto sin pronombre **y** con elipsis del verbo tras
el modal. Es la concesión con condición del rol: la pieza que cierra el escenario no puede ser la
más difícil de la ficha.
**Entra:** `I can bring some people back, but only if there's food for them.`

**Cuenta tras los cambios:** 9 exponentes por rol, dentro del 6-9 de §11.

## 3 · Lo que hay que LEER — prosa A2 legible (§11)

§11 permite que el A2 **leído** aguante más que el hablado. Aun así hay doce líneas que un A2 no
reconstruye, y tres de ellas son exactamente el telegrama que §11 prohibió el 21 de agosto.

### Telegramas en prosa (§11: la prosa va en oraciones cortas y **completas**)

| dónde | está escrito | entra |
|---|---|---|
| A · dato oculto | `In before twelve, it feeds twelve. Not in, it goes bad tonight.` | `If it goes in before twelve, it feeds twelve. If it doesn't, it goes bad tonight.` |
| A · lo que se pierde | `Twelve plates and nobody at the table.` | `There are twelve plates and nobody at the table.` |
| B · lo que se pierde | `Six people at a river with no food, no store, no car until four…` · `Behind you, lunch for twelve and one man alone at the fire.` | dos oraciones con verbo: `Six people are at the river…` · `Here, there is lunch for twelve and one man alone at the fire.` |
| B · bloque propio | `Nothing big rides between your feet. A cooler does. A pot never will.` | `Only small things ride between your feet. A cooler fits. A pot never fits.` (la elipsis con pro-verbo `does`/`will` es B1 de lectura) |

### Léxico y estructura por encima del nivel

| dónde | está escrito | entra |
|---|---|---|
| A · restricción 1 | `…are the reason, not stubbornness.` | `…are the reason. It is not that you don't want to.` (*stubbornness* no es A2) |
| A · restricción 2 | `You don't say the group did wrong.` | `You don't say the group made a mistake.` |
| A · dato oculto | `…and you haven't said so.` | `…and you haven't told him.` (el pro-forma `say so` no es A2) |
| A · encabezado | `If he rides off with nothing settled` | `If he leaves and nothing is decided` → mejor sin pasiva: `If he leaves with no plan` |
| A · bloque propio | `That's firewood, not habit.` | `A wood fire needs this. It is not a habit.` |
| A · caja | `…the reason is nobody's.` | `…and the reason is not yours or his.` |
| B · situación | `The heat took six of your friends down to the river at ten.` | `It was very hot, so six of your friends went down to the river at ten.` |
| B · restricción 3 | `Only what fits between your feet goes on that bike.` | `On that bike you can only carry small things. They go between your feet.` (relativa libre en posición de sujeto) |
| B · dato oculto | `That card is your strongest and it cuts both ways: play it early, and he answers that they should walk back.` | `This is your best card, but it is dangerous. If you say it early, he says they should walk back.` (*cut both ways* es idioma opaco; el imperativo+`and` como condicional es B1) |

### Discurso indirecto con retroceso de tiempo — los tres únicos casos del archivo

Grep completo: **cero `could` de cortesía, cero pasiva, cero `would rather`, cero present perfect
de duración con *for/since* en prosa** (los tres `since` viven en tablas, como notas: correcto).
Quedan tres retrocesos, todos en el rol B y la carta:

1. `You wrote in the chat that lunch was coming.` → `You wrote in the chat: lunch is coming.`
2. `at 11:11 she wrote that she stays there until four` → **además está mal en inglés** (retroceso a
   medias). Entra: `at 11:11 she wrote in the chat: she is there until four.`
3. `You told him at ten that everybody would be here at one, and you haven't shown him.` → `would`
   es la forma que §4 deja fuera, y `you haven't shown him` se queda sin objeto. Entra:
   `At ten you told him everybody comes back at one. You have not shown him the new message.`

## 4 · La ruta mínima — la prueba que decide

Escrita **solo** con lengua A2 y con los exponentes ya corregidos. Nueve turnos, se llega al
cierre con las seis líneas obligatorias y la carta dentro.

> **1 · A** — `The chicken goes in at twelve. How many are coming at one?`
> **2 · B** — `They left at ten because of the heat. I'm heading out at eleven forty.`
> **3 · A** — `The cassava goes in at twelve, and it's ready at one. This pot doesn't leave the fire.`
> **4 · B** — `You should turn the fire down and come with me.`
> **5 · A** *(carta)* — `My mom is coming at one with four more people. I have to know before twelve, because the chicken goes in then.`
> **6 · B** — `I got here at nine, and I didn't change the plan. What is ready now, and what doesn't need the fire?`
> **7 · A** — `You should call them. They have to leave at one thirty. We can do two rounds: some at one, the rest at three.`
> **8 · B** — `Big things don't fit on that bike. I can't show up empty-handed. If there's nothing, I don't go.`
> **9 · A** — `There's rice and chicken in the fridge. The container can go, but only if you come back at three.`
> **9 · B** — `I can bring some people back, but only if there's food for them. I'll tell them at twelve.`

**Se escribe.** Presente simple, presente continuo de futuro, pasado simple, `have to`, `should`,
`can`, primer condicional, `because`/`so`/`but`, *how many*. Nada más. **El escenario es A2.**

Y de paso: la ruta mínima **no cierra** con menos de nueve turnos por rol, porque las seis líneas
del cierre están repartidas tres y tres. Puerta 11 (nadie lo resuelve en menos de 6 turnos) la
pasa por diseño, no por suerte.

## 5 · Los datos duros son decibles

| dato | cómo se dice | veredicto |
|---|---|---|
| horas en punto y con minutos | *at nine · at twelve · at one · at three · eleven forty · one thirty* | **A2** (`telling-time`, A1) |
| números hasta doce y dieciséis | *twelve servings · four more people* | **A2** |
| fecha completa | domingo 20 de septiembre | **nunca hace falta decirla**: vive en la tabla y no entra en ninguna de las seis líneas del cierre. Correcto |
| 11:11 | no se dice: es la hora de un mensaje que B enseña o no enseña | correcto |
| ~12:40 | el `~` no se pronuncia. Si B tiene que decirlo, dice *about twelve forty* | **entra en la caja de datos como nota**, ya lo está |

Ningún dato obliga a una estructura fuera de nivel. **No hay que cambiar ningún dato.**

## 6 · El bloque de vocabulario — la definición más simple que la palabra

Veinte entradas, diez por rol: dentro del 8-10 de §11. Ninguna glosa pasa de una línea, ninguna
lleva comillas, y **ninguna de las veinte celdas `here` empieza por pronombre + verbo conjugado**
—la trampa que §11 marca como la más calcable de la ficha—. Comprobado una a una.

**Dieciséis entradas pasan tal cual.** Tres observaciones y una corrección obligatoria:

1. **`to go bad — to stop being safe to eat`.** La glosa usa `stop + -ing` y un adjetivo con
   infinitivo: es más difícil que la palabra que define. **Entra:** `to become old and not good to
   eat`.
2. **`to pick someone up` ya existe en el set.** El escenario 1 (`the-bike-in-the-parking-lot`,
   ficha B) trae `to pick something up — to go somewhere later and take it`. Es el mismo phrasal
   con otro sentido, y el encargo del diseño (§10) pedía cero repeticiones: mandó comprobar
   `to give someone a ride`, `a spot` y `to be short`, y se le escapó éste. **No es de nivel, es de
   conjunto:** o se cambia por `a ride` (que no está en el set: comprobado) o se acepta la
   repetición a sabiendas. Lo devuelvo nombrado; decide `habla-conjunto`.
3. **`a lid` está en la ficha equivocada.** §11 admite meter en el vocabulario «las que le va a
   soltar el otro» — pero *el otro tiene que poder soltarlas*. `a lid` está en **A**, y su columna
   `here` dice «the small thing he'll tell you to do»: se lo tiene que decir **B**, y B no tiene
   `lid` ni en su vocabulario ni en sus exponentes (el suyo es `turn the fire down`). O `a lid`
   pasa a B, o la celda `here` de A deja de prometer que B lo va a decir.
4. **`to cool off` es la entrada más floja de las veinte.** Prueba de §11: ¿llega B al cierre sin
   ella? Sí — no aparece en ninguna de sus tres líneas obligatorias; solo explica por qué se
   fueron a las diez. Es la candidata natural a ceder el sitio si entra `a lid` en B.

Los otros dieciocho pares palabra/glosa son correctos y **más simples que la palabra**:
*simmer/cook slowly in hot water*, *firewood/wood you burn to make a fire*, *raw/not cooked yet*,
*a serving/the food for one person*, *leftovers/food from an earlier meal*, *to be starving/very,
very hungry*, *a cooler/a box that keeps food cold*, *empty-handed/with nothing in your hands*,
*the shade/a place out of the sun*. Y los campos son los que el set no tenía: cocina, fuego,
transporte, cuerpo.

## 7 · Dos cosas que no son de nivel y tumbarían la ficha igual

Se dicen aquí porque se ven leyendo los exponentes, y vuelven con lo demás a `habla-fichas-de-rol`.

**a · La carta es calcable, y es el único sitio del archivo donde eso pasa.** El párrafo del turno
5 está en oraciones de tercera persona que se dicen tal cual y hacen avanzar el turno: `She's
coming at one with four more people.` · `They're not bringing anything.` · `They already left the
house.` Los siete escenarios del set entregan la carta **en tabla de notas** con comentario no
decible encima (comprobado en 1, 2, 4, 5, 6, 7 y 8, y en el molde). **Cambio:** el párrafo pasa
entero a la tabla de notas que ya está debajo —`Mother · 1:00 · +4 (aunt + 3 from church) ·
already left · brings nothing`— y en prosa se deja solo comentario que no se puede pronunciar, al
modo del molde. Además, `Somebody told her there was lunch here` es el cuarto retroceso de tiempo
del archivo: pasa a nota.

**b · El disparador no está en turnos globales, y §6 avisa de esto por su nombre.** La carta dice
`Turn 5.` y nada más. A arranca, así que **su** turno 5 es el global 9 —fuera de la ventana 3-6—.
Los siete escenarios del set lo escriben explícito («global turn 5 · A's third turn, because A
starts: A, B, A, B, **A**»). **Cambio:** `Global turn 5 — your third turn, because you start:
A, B, A, B, **A**.`

**c · Menor.** La cabecera dice `9 turns · 7 minutes` en los dos roles; el molde dice `7 turns
each`. El acta del guardián (punto 7) pidió la unidad escrita. **Entra:** `9 turns each`.

**Lo que sí está bien y no se toca:** prosa medida con el contador canónico —**A 432 · B 441**,
reproducido por mí con las reglas de `prosa-canonica.mjs`, los dos bajo 450—; diez filas de datos
duros por rol; el reparto de bloques de la caja (A sin 3 y sin 7, B sin 4) es coherente con quién
tiene la jerga; y las nueve piezas de §2 están las nueve en cada rol.

## 8 · `grammarReferences` — anclado slug a slug contra el registro

Comprobado con `src/data/grammar/registry.ts` y `src/data/grammar/ingles/a2/`. **Ojo con la trampa
del sufijo: el nombre del archivo no es el slug.** `connectors.ts` declara `connectors-a2`, y
`getTopicBySlug('ingles','a2','connectors')` devuelve **null**. Lo mismo con
`present-continuous-future-a2`, `past-continuous-a2`, `relative-clauses-a2`,
`prepositions-movement-a2` y `used-to-a2`.

Los cinco del diseño existen. **Falta corregir un título y faltan dos anclas**: dos exponentes de
la ruta mínima (`I'm heading out at eleven forty`, `How many are coming at one?` y `I'll cook for
four`, `I'll bring back…`) no tenían tema que los sostuviera.

```ts
grammarReferences: [
  { slug: 'first-conditional',
    title: 'El Primer Condicional en Inglés A2',
    rationale: 'Las dos concesiones con condición y los dos insistir con condición: If you don\'t tell me a number, I\'ll cook for four.' },
  { slug: 'have-to-must',
    title: 'Have to y Must en Inglés A2',
    rationale: 'La obligación física de los dos relojes: I have to know before twelve · They have to leave at one thirty.' },
  { slug: 'connectors-a2',
    title: 'Conectores en Inglés A2: because, so, although, however, but',
    rationale: 'La razón nueva que convierte repetir en insistir: because, so, but.' },
  { slug: 'should-advice',
    title: 'Should y Shouldn\'t en Inglés A2',
    rationale: 'Los tres recomendar, y en las dos direcciones: cada uno aconseja sobre el lado del otro.' },
  { slug: 'quantifiers',
    title: 'Cuantificadores en Inglés A2',
    rationale: 'El número que decide la segunda gallina: how many, enough, some, the rest.' },
  { slug: 'present-continuous-future-a2',
    title: 'Present Continuous para el futuro en Inglés A2: planes concretos',
    rationale: 'Las dos horas que chocan, dichas como plan cerrado: How many are coming at one? · I\'m heading out at eleven forty.' },
  { slug: 'will-future',
    title: 'El Futuro con Will en Inglés A2',
    rationale: 'La consecuencia y la promesa del cierre: I\'ll cook for four · I\'ll bring back…' },
]
```

**Lo que NO se debe añadir**, aunque sostenga lengua de la ficha: `can-ability` y `telling-time`
son de **A1**. Con `getTopicBySlug('ingles','a2', …)` devuelven `null` igual que un slug
inventado. Si algún día hace falta enlazar A1 desde una ficha A2, eso es producto nuevo y va a
`habla-integracion`.

## 9 · Resumen de cambios, para `habla-fichas-de-rol`

| # | qué | dónde |
|---|---|---|
| 1 | sale `You should tell them to leave the water at one thirty.` · entra `You should call them. They have to leave at one thirty.` | exponentes A, fila 7 |
| 2 | `Two rounds, then: …` → `We can do two rounds: some at one, the rest at three.` | exponentes A, fila 8 |
| 3 | `…and you cook once.` → `…and you only cook once.` | exponentes B, fila 4 |
| 4 | sale `What's ready right now, and what stays good cold?` · entra `What is ready now, and what doesn't need the fire?` | exponentes B, fila 6 |
| 5 | sale `Nothing big fits on that bike.` · entra `Big things don't fit on that bike.` | exponentes B, fila 7 |
| 6 | sale `I can't show up empty-handed, so I'm not leaving with nothing.` · entra `I can't show up empty-handed. If there's nothing, I don't go.` | exponentes B, fila 8 |
| 7 | sale `I'll bring back the ones I can…` · entra `I can bring some people back, but only if there's a plate for them.` | exponentes B, fila 9 |
| 8 | cuatro telegramas de prosa a oraciones completas | A: dato oculto y pérdida · B: pérdida y bloque propio |
| 9 | nueve líneas de léxico/estructura fuera de nivel (§3 de este informe) | prosa de A y de B |
| 10 | tres retrocesos de tiempo (`was coming`, `she stays`, `would be`) a estilo directo | prosa de B |
| 11 | `to go bad` cambia de glosa | vocabulario A |
| 12 | `a lid`: o pasa a B (cediendo `to cool off`), o su celda `here` deja de prometer que B lo dice | vocabulario A y B |
| 13 | `to pick someone up` repite phrasal del escenario 1 — decisión de conjunto | vocabulario B |
| 14 | la carta pasa de párrafo decible a tabla de notas | pantalla de la carta |
| 15 | `Turn 5.` → `Global turn 5 — your third turn (A, B, A, B, **A**).` | pantalla de la carta |
| 16 | `9 turns` → `9 turns each` | cabecera de los dos roles |
| 17 | `grammarReferences`: se corrige el título de `connectors-a2` y entran `present-continuous-future-a2` y `will-future` | datos del escenario |

**Fuera de mi alcance y bloqueante:** la enmienda de §4 que declara `insistir` en A2. Es de
`habla-blueprint`. Sin ella, la puerta 8 no la pasa este escenario ni la pasan `poner-limite` y
`negociar` en los siete que ya están publicados.
