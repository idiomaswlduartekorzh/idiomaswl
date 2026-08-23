# Escenario 4 · `the-pot-is-already-on` — las cinco parejas sobre el texto de hoy

Se juega contra **`artifacts/habla-a2/fase8-fichas-4nuevo.md` tal como está en disco el 22 de
agosto de 2026**, commit `0d285409` (último que la tocó: `948648b3`, los diecisiete arreglos de
nivel). Caja común: `artifacts/habla-a2/caja-de-herramientas-a2.md`. Ronda anterior:
`fase11-simulacion-4.md`.

**Aquí no se arregla nada.** Se juega, se cuenta y se diagnostica.

## Lo que cambió desde la ronda anterior, y por eso se rejuega

| # | Pasada | Qué entró | Qué tiene que probar esta ronda |
|---|---|---|---|
| 1 | **carga** (`fase12-carga.md`) | A gana `How many are coming back at …?` en la fila `asking how many, and how they get back` | si tapa el hueco que mató a la pareja floja en el turno 17 |
| 2 | **carga** | los tres criterios de A y las tres líneas de `Only A can say` dejan de ser datos y llevan **el precio dentro** | si eso saca al callado del telegrama… o si le carga a A palabras que no tiene cómo decir |
| 3 | **carga** | quinta regla del cierre: *un número sin hora no es una línea* y *nada sale de este patio gratis* · `Yeah` y `that works` prohibidos | si para al atajista y si para el asentimiento |
| 4 | **calcabilidad** (`fase13-calcable-4.md`) | tres etiquetas renombradas, las dos tablas reordenadas, restricción 3 de B reescrita | si la cola de la tabla de B sigue siendo su final de partida |
| 5 | **nivel** (`948648b3`) | `And what can I take cold?` → `And what can I take? It has to be cold.`, fuera la pasiva de la pantalla común, fuera dos relativas libres de los criterios, nueve modismos de encabezados | si la pregunta abierta de B —la única de las dos fichas— sobrevive partida en dos |

---

## Cómo se leen estas transcripciones

**Cada jugador ve SOLO su ficha.** La carta es pantalla aparte y solo de A; se abre cuando termina
el segundo turno de ella (global 5). La pantalla de cierre es común.

| Marca | Qué significa |
|---|---|
| `[F]` | tomó una forma de su tabla «Out loud…» o de la caja y la dijo como suya — **eso es el ejercicio** |
| `[D]` | miró la tabla de datos, su reloj propio o la carta |
| `[V]` | miró el bloque de vocabulario |
| `[L]` | **leyó en voz alta algo que no está escrito para decirse** |
| `[X]` | se atascó: pausa larga, reinicio, frase abandonada |
| `[ES]` | se pasó al español, entero o a medias |
| `[!]` | se salió del papel: rompió una restricción de su ficha, o habló de meta |

`FAB` = rol **A**, Fabián (arranca, manda `a>b`, tiene la carta y la nevera). `AST` = rol **B**,
Astrid (la moto de las 11:40, los tres datos del regreso y el mensaje de las diez).

**Los perfiles.** El A2 **sólido** falla en tercera persona, en preposición y en pregunta sin
auxiliar. El A2 **flojo** produce `I no can`, `two persons`, `he go`, presente por pasado y frases a
medias. El **callado** contesta con una a tres palabras y no inicia nada. El **atajista** habla más
suelto de lo que le toca —va a cerrar, no a aprender— y se salta lo que le estorbe.

### REGLA 1 · El handicap, de qué lado cae — declarado antes de jugar

| Pareja | Handicap en | Qué lado es ése | fase8 | fase11 | **fase13 (esta)** |
|---|---|---|---|---|---|
| 1 · sólido + sólido | ninguno | — | — | — | — |
| 2 · sólido + flojo | **flojo = A · Fabián** | **el motor**: arranca, manda, los tres `insistir`, la carta — y además el que concede la nevera | A | B | **A · invertido** |
| 3 · flojo + flojo | los dos | — | — | — | — |
| 4 · el callado | **callado = B · Astrid** | el que concede el viaje y **el único que tiene los tres datos del regreso** | B | A | **B · invertido** |
| 5 · el atajista | **atajista = A · Fabián** | el que manda y no puede irse: está atado al fuego | B | B | **A · invertido, y es la primera vez** |

**Los tres handicaps se movieron, y el del atajista se mueve por primera vez.** Estuvo dos rondas
seguidas en B porque ahí es donde el texto le había escrito un freno. Esta ronda va en **A** —que es
el lado que **no puede marcharse**, porque tiene veinte litros de agua hirviendo— y la salida por B
se juega aparte en **§5b**, cuatro turnos, para no perder la serie.

**Advertencia declarada sobre la pareja 2.** Este escenario es el único del set donde **el mismo rol
pide y concede**: A pide el número y A abre la nevera. Ponerle el handicap al flojo en A amordaza a
la vez al motor y al que otorga, que es el reparto más hostil posible. Va a propósito —le tocaba por
alternancia— y el efecto sobre el reparto se mide en §D1 sin excusarlo.

### REGLA 2 · Un solo contador de palabras, y aquí está dicho cuál

**Bruto: todo lo que sale por la boca** — inglés, español, muletillas, repeticiones y lo leído en voz
alta de la ficha. **No cuenta**: la etiqueta del turno, las marcas entre corchetes, los segundos y
cualquier línea que no sea un turno. **El mismo criterio en las cinco parejas y en la contraprueba.**
Contado con `artifacts/habla-a2/fase13-scripts/carga-4.mjs`, que es copia literal del criterio de
`fase11-scripts/carga-4.mjs` — para que las cifras de esta ronda se puedan restar de las de aquella.
El criterio contrario —descontar lo leído— se declara en §D8 y **no se usa para juzgar**.

### REGLA 3 · La puerta del 40 % se juzga solo sobre perfil parejo

Se mide **únicamente** en la pareja 1 (sólido+sólido) y la 3 (flojo+flojo). En la 4 la cifra no
significa nada: el perfil del callado *es* producir tres palabras por turno. Al callado se le mide
otra cosa, en §D3: **si produjo las piezas que solo él tiene**.

### Modelo de minutos

Turno de sólido ≈ 8–26 s · turno de flojo con consulta ≈ 10–24 s · turno monosilábico ≈ 1–5 s ·
pausa entre turnos: 3 s con un sólido en la pareja, 5 s en la floja · lectura de la carta en
silencio ≈ 12 s (22 s si la lee dos veces). Presupuesto de la ficha: **7 minutos · 9 turnos por
rol · 18 globales**.

### Las ocho piezas del cierre, como están escritas hoy

| # | de quién | qué es | qué le añadió la pasada de carga |
|---|---|---|---|
| A1 | Fabián | qué entra a la olla a las doce, para cuántos, **y qué pierde esta noche si el número llega tarde** | la cláusula del precio |
| A2 | Fabián | qué sale del patio, qué se queda, **y qué cuesta eso el lunes y el martes** | la cláusula del precio |
| A3 | Fabián | qué necesita a la una y no puede hacer con el fuego prendido (el portón) | — |
| B1 | Astrid | cuántos vuelven de verdad, **y antes de qué hora** | — (pero la regla 4 nueva la endurece) |
| B2 | Astrid | quién va en moto, quién camina, **y cuánto dura esa caminata** | — |
| B3 | Astrid | qué les dice a los seis del río, **y antes de qué hora** | — |
| J | los dos | la hora de la segunda tanda y quién está en el portón cuando llegan los primeros | — |
| ABIERTO | los dos | quién no come con los demás, y quién lo arregla — con nombre y hora | — |

---

## 1 · SÓLIDO + SÓLIDO

Handicap: **ninguno**.

**FAB-1** `[F]` Come here a second, before you go anywhere. How many are coming back at one? I have to know before twelve. (11 s)

**AST-2** `[F]` `[D]` About the river. They left at ten because it was very hot, all of them. And I'm heading out at eleven forty — Marcela's bike is by the gate. (14 s)

**FAB-3** `[F]` `[D]` Eleven forty? Hold on. The cassava goes in at twelve, and it's ready at one. Right now I only have broth and one chicken. That's twelve servings, and the pot doesn't leave this patio. (18 s)

**AST-4** `[F]` You should turn the fire down and put a lid on it. Then you come with me and we eat there. (10 s)

*Fabián abre la carta y la lee en silencio (12 s). Ninguno comenta que existe.*

**FAB-5** `[F]` `[D]` My mother called. She's coming at one with my uncle and my aunt and two from the church. Five more people, and she's on the road already. She brings nothing. So I can't ask for everybody at one anymore. How many are coming back at one? (24 s)

**AST-6** `[F]` I got here at nine, and I didn't sit down one time. Sunday is my only day off, and now I have to fix a plan I didn't make. (15 s)

**FAB-7** `[F]` I know. I know. You should tell them: get out of the water at one thirty. Not at two — at two the sun on that road is very bad. (15 s)

**AST-8** `[F]` What is ready now? And what can I take? It has to be cold. (7 s)

**FAB-9** `[F]` `[V]` Nothing is ready. It's simmering — I mean, it's cooking slow in the water, and the cassava is raw. The second chicken came out of the fridge at seven and I cut it. If I don't put it in before twelve, it goes bad tonight. (24 s)

**AST-10** `[F]` `[V]` They ate at seven and nothing is open there on a Sunday. They're starving. I can't show up empty-handed, so I need something before I head out. (16 s)

**FAB-11** `[F]` There's rice and chicken in there from Saturday, in one container, and that's my lunch on Monday and on Tuesday. I work in the week. I don't cook. (16 s)

**AST-12** `[X]` `[F]` OK. At ten I told you everybody comes back at one. That's not true now. Édgar wrote at eleven eleven: no car before four. (16 s)

**FAB-13** `[F]` Four o'clock. So how many are coming back at one, and how do you all get back from the river? Because if you don't tell me a number, I'll cook for seven and the rest is not my problem. (20 s)

**AST-14** `[F]` `[D]` Nobody at one. Seven of us, and before two thirty. Marcela can take two on the bike, one and one, and the rest walk from the river — forty minutes, and there's no shade. They can be out of the water at one thirty. (23 s)

**FAB-15** `[F]` We can do it in two rounds: my mother and the church people at one, and the rest at two thirty. Or the container goes now and everybody eats here at two thirty. (18 s)

**AST-16** `[F]` `[V]` Nothing big fits on that bike. Only the small cooler, between my feet. The pot doesn't go — I'm not carrying a hot pot on a bike. (16 s)

**FAB-17** `[F]` The container can go, but only if you're back at the gate at one. Somebody has to be at the gate at one, and it can't be me — the fire. (17 s)

**AST-18** `[F]` I'll bring some of them back, but only if there's a plate at two thirty for the ones who walk. Marcela comes this way at twelve forty. I come back with her, and I open the gate at one. (21 s)

**FAB-19** `[F]` `[D]` Good. So the cassava and the second chicken go in at twelve, and that's twelve servings. If your number comes at one and not now, that chicken goes in the trash tonight. (18 s)

**AST-20** `[F]` And I tell the six before twelve thirty: out of the water at one thirty, walk on the shade side, food here at two thirty. (14 s)

**FAB-21** `[F]` And the container leaves now, the pot stays. That container is Monday and Tuesday — so on Monday I buy my lunch, and that's on you. (14 s)

**AST-22** `[F]` Fine, Monday is on me. Édgar doesn't eat with us — he gets here at four, and I keep him a plate before I go home. So, we're clear then. (16 s)

**FAB-23** `[F]` We're clear. Second round at two thirty, you at the gate at one. Thanks — really. Now go, it's eleven thirty-eight. (12 s)

### Diagnóstico 1

**Llega al cierre, y a la primera.** 23 turnos: **12 de A y 11 de B**, contra los 9 por rol
declarados: **+3 y +2**. Habla 6:15, veintidós pausas de 3 s (1:06) y 12 s de carta →
**7:33**, un **8 %** por encima del presupuesto.

**Piezas: 8 de 8.** A1 en FAB-19 · A2 en FAB-21 · A3 en FAB-17 · B1 en AST-14 · B2 en AST-14 ·
B3 en AST-20 · J en FAB-23 con AST-18 · ABIERTO en AST-22, con nombre (Édgar) y hora (cuatro).

**Las dos cláusulas de precio se pagan con dos turnos enteros.** En la ronda anterior A1 y A2
cabían las dos en un turno (FAB-19 de aquella partida las decía juntas en 43 palabras). Hoy no: la
pasada de carga metió *«y qué pierdes esta noche»* y *«y qué cuesta el lunes y el martes»* dentro de
las líneas, y este par —sólido— **necesitó partirlas en FAB-19 y FAB-21**. Eso es exactamente lo que
la pasada quería (contenido, no dato), y tiene un precio contable: **A pasa de 349 a 381 palabras**
mientras B pasa de 286 a 305, y se ve en §D1.

**La forma nueva se usó dos veces, y las dos como motor.** FAB-1 abre con ella detrás de la fila
`opening` —la ficha le prohíbe abrir con la pregunta y él no lo hace— y FAB-13 la repite pegada a
`And how do you all get back from …?`. Las dos veces la respuesta de Astrid **produce lengua**, no
un número suelto: AST-14 trae B1 y B2 en el mismo turno porque la pregunta viene doble.

**La pregunta partida en dos aguanta.** `What is ready now? And what can I take? It has to be cold.`
sale entera en AST-8, y el arreglo de nivel no le quitó el filo: FAB-9 no puede contestarla con sí
ni con no.

**Ni un `[ES]`.** Los tres sitios donde el set se pasa al español —decir lo que uno pierde (FAB-11),
desdecirse (AST-12) y la aritmética de la carta— los resuelven en inglés. La aritmética, ojo, **la
esquivan**: nadie dice «diecisiete». FAB-5 dice *«five more people»* y ahí se queda.

---

## 2 · SÓLIDO (Astrid, B) + FLOJO (Fabián, A)

Handicap: **flojo = A · Fabián**, el motor y el que otorga a la vez. *(Invertido respecto de la
ronda anterior. Declarado en la REGLA 1, con la advertencia de que es el reparto más hostil que
admite este escenario.)*

**FAB-1** `[F]` `[X]` Come here a second, before you… go. How many are coming back at one? (9 s)

**AST-2** `[F]` `[D]` About the river — they left at ten because it was very hot. And I'm heading out at eleven forty, Marcela's bike is by the gate. (14 s)

**FAB-3** `[X]` `[D]` `[V]` Eleven forty? No, no. The cassava go in at twelve. Is ready at one. `[X]` Now is only broth. (13 s)

**AST-4** `[F]` You should turn the fire down and put a lid on it, and we eat at the river. What is ready now? And what can I take? It has to be cold. (16 s)

*Fabián lee la carta. Tarda 20 s: la lee dos veces.*

**FAB-5** `[D]` `[X]` My mother call me. She come at one. With four more people. `[X]` `[ES]` o sea cinco más, con ella. `[X]` And she is in the road already. (18 s)

**AST-6** `[F]` `[X]` Five more people at one? So that's seventeen people and twelve plates. (8 s)

**FAB-7** `[X]` `[F]` Yes. `[X]` I have to know before twelve, because… the second chicken. `[X]` If you don't tell me a number, I cook for twelve. (16 s)

**AST-8** `[F]` `[V]` They ate at seven and nothing is open there on a Sunday. They're starving. I can't show up empty-handed, so I need something before I head out. (16 s)

**FAB-9** `[X]` `[V]` Nothing is ready. Is… raw. The cassava is raw. `[X]` And the chicken is out of the fridge from seven. If I no put it at twelve, it go bad. (19 s)

**AST-10** `[F]` So you're saying: the chicken goes in before twelve, or you lose it tonight. (7 s)

**FAB-11** `[X]` `[F]` Yes. That. `[X]` And in the fridge is rice and chicken from Saturday. In one container. `[X]` `[ES]` ese es mi almuerzo del lunes y del martes. (17 s)

**AST-12** `[F]` `[X]` OK. At ten I told you everybody comes back at one. That's not true now — Édgar's car is not coming back before four. (14 s)

**FAB-13** `[X]` `[F]` Four?! `[X]` And how do you all get back from the river? (7 s)

**AST-14** `[F]` `[D]` Marcela can take two on the bike, one and one, and the rest walk from the river. Forty minutes and no shade. They can be out of the water at one thirty. (19 s)

**FAB-15** `[F]` `[X]` OK. `[X]` So how many are coming back at one? (6 s)

**AST-16** `[F]` Nobody at one. Seven of us, and before two thirty. (6 s)

**FAB-17** `[F]` `[X]` Two thirty. `[X]` We can do it in two rounds: my mother at one, and the rest at two thirty. (11 s)

**AST-18** `[F]` `[V]` Nothing big fits on that bike — only the small cooler, between my feet. I'll bring some of them back, but only if there's a plate at two thirty. (17 s)

**FAB-19** `[F]` `[D]` `[X]` The container can go, but only if you are at the gate at one. `[X]` Somebody has to be at the gate at one, and it can't be me. (17 s)

**AST-20** `[F]` Twelve forty Marcela comes this way, I come back with her, and I open the gate at one. And I tell the six before twelve thirty: out of the water at one thirty. Édgar eats at four when he gets here — I keep him a plate. (23 s)

**FAB-21** `[X]` `[D]` Good. `[X]` The cassava and the chicken go in at twelve. Twelve plates. `[X]` `[ES]` y si el número me llega a la una, se me daña la gallina esta noche. (18 s)

**AST-22** `[F]` `[X]` So, we're clear then. (3 s)

**FAB-23** `[X]` Clear. `[X]` Go, is eleven thirty-nine. (5 s)

### Diagnóstico 2

**No se muere, y llega.** 23 turnos (12 A / 11 B). Habla 4:59, veintidós pausas de 5 s (1:50) y
20 s de carta → **7:09**: **la pareja que más se acerca al presupuesto de las cinco**, +2 %.

**El flojo se sostiene, y se sostiene con andamiaje concreto, no con suerte.** Los turnos donde
Fabián produce lengua entera —FAB-1, FAB-7, FAB-13, FAB-15, FAB-17, FAB-19— son **seis filas de su
tabla dichas casi literales**, con el `…` rellenado. Sin esas filas este perfil no pasa de FAB-9.

**Y dos de esas seis son la fila nueva.** FAB-13 y FAB-15 son `And how do you all get back from …?`
y `How many are coming back at …?`. En la ronda anterior esos dos turnos —el 13 y el 15— fueron
*«¿y a qué hora?»* y *«How many? How many persons?»* en boca del flojo, y de ahí no volvió al
inglés. **Hoy los dice en inglés y la conversación sigue.** Es el arreglo más visible del texto.

**Piezas: 6 de 8, y las dos que faltan fallan por la cláusula nueva.**

| pieza | ¿dicha? | dónde |
|---|---|---|
| A1 | **a medias** | FAB-21: el qué y el cuántos en inglés; **el precio, en español** |
| A2 | **a medias** | FAB-19 dice qué sale y qué se queda; **el coste del lunes y el martes se dijo en español** en FAB-11 |
| A3 | sí | FAB-19 |
| B1 | sí | AST-16 — número y hora, y la hora es la de verdad |
| B2 | sí | AST-14 |
| B3 | sí | AST-20 |
| J | sí | AST-20 con FAB-17 |
| ABIERTO | sí | AST-20 (Édgar, cuatro, ella le guarda plato) |

**Las dos mitades que faltan son las dos que la pasada de carga añadió.** A ninguna de las dos le
corresponde una forma en la tabla de A: `what it costs you` cubre *«There's rice and chicken in there
from …, and that's my lunch on …»* —el qué hay y de quién es— pero **no cubre qué pasa si no lo
tiene el lunes**; y para *«pierdo la gallina esta noche»* la fila más cercana es
`If you don't tell me a number, I'll cook for …`, que habla de cocinar, no de perder. El flojo tiene
la palabra (`to go bad`, en su vocabulario) y **no tiene la oración**.

**Una repetición que la regla 1 del cierre castiga y el aula no.** AST-10 reformula la pieza de él
—*«the chicken goes in before twelve, or you lose it tonight»*— usando el bloque 3 de la caja. Está
permitido como reparación, pero **dice la mitad de A1 antes que él**, y FAB-11 la firma con *«Yes.
That.»*. Por la regla, A1 sigue sin decirse hasta FAB-21; por cómo se vive en clase, los dos creen
que ya estaba.

**Tres `[ES]`, los tres en A, y los tres en el mismo sitio: el precio.** FAB-5 (aritmética de la
carta), FAB-11 (lo que cuesta el tarro) y FAB-21 (lo que se pierde esta noche).

---

## 3 · FLOJO + FLOJO

Handicap: **los dos**. El caso real de dos compañeros de clase.

**FAB-1** `[F]` `[X]` Come here a second. `[X]` How many are coming back at one? (7 s)

**AST-2** `[X]` `[D]` They go to the river. At ten. `[X]` Hot. And I go at eleven forty. (11 s)

**FAB-3** `[X]` `[D]` The cassava go in at twelve. Ready at one. `[X]` Now is only broth. (12 s)

**AST-4** `[F]` `[X]` You should put a lid. `[X]` And come with me. (6 s)

*Fabián lee la carta. Tarda 22 s: la lee dos veces.*

**FAB-5** `[D]` `[X]` My mother come at one. With four persons. `[X]` `[ES]` o sea que somos diecisiete. `[X]` And twelve plates. (17 s)

**AST-6** `[X]` `[ES]` ¿diecisiete? `[X]` I get here at nine. I no sit. `[X]` Sunday is my day off. (11 s)

**FAB-7** `[X]` `[F]` You should tell them… `[X]` get out of the water at one thirty. (10 s)

**AST-8** `[F]` What is ready now? (3 s)

**FAB-9** `[X]` `[V]` Nothing. Is raw. The cassava is raw. `[X]` And the chicken… `[ES]` la saqué a las siete. (14 s)

**AST-10** `[X]` `[V]` `[F]` They are starving. They no eat. `[F]` I can't show up empty-handed. (10 s)

**FAB-11** `[F]` `[X]` How many are coming back at one? (5 s)

**AST-12** `[X]` Six. `[X]` Six persons. (4 s)

**FAB-13** `[F]` `[X]` Six. `[X]` And how do you all get back from the river? (7 s)

**AST-14** `[X]` `[D]` `[X]` Marcela can take two. In the bike. `[X]` And the other… walk. `[X]` Forty minutes. (13 s)

**FAB-15** `[X]` Forty minutes. `[X]` `[F]` If you don't tell me a number, I cook for twelve. (9 s)

**AST-16** `[F]` `[X]` At ten I told you… all at one. `[X]` That's not true now. `[X]` `[ES]` el carro de Édgar no vuelve hasta las cuatro. (15 s)

**FAB-17** `[X]` `[ES]` ¿las cuatro? `[X]` `[F]` The container can go, but only if… `[X]` `[ES]` si vuelves. (10 s)

**AST-18** `[X]` `[ES]` ¿me lo das entonces? `[X]` OK. (5 s)

**FAB-19** `[F]` `[D]` Somebody has to be at the gate at one. `[X]` And it can't be me. (8 s)

**AST-20** `[X]` OK. `[X]` I open the gate. (4 s)

**FAB-21** `[X]` `[ES]` y si me dices tarde se me daña la gallina de esta noche, `[X]` `[!]` profe, ¿cómo digo eso? (10 s)

**AST-22** `[X]` `[ES]` yo creo que ya está. `[X]` `[F]` So, we're clear then. (6 s)

**FAB-23** `[F]` `[X]` OK. See you tomorrow, then. (4 s)

### Diagnóstico 3

**Se muere en el turno 21, cuatro turnos más tarde que la vez pasada, y por otra cosa.** FAB-21 es
un `[!]`: intenta la cláusula de precio de A1, no le sale, y pregunta al profesor. Los dos turnos
siguientes son un cierre de cortesía sacado del bloque 2 de la caja.

**El hueco que mataba en el 17 está tapado, y se puede señalar el turno exacto donde no murió.** En
la ronda anterior, FAB-13 fue *«no, es que dime cuántos son»* y FAB-15 *«¿y a qué hora?»*: dos
turnos en español seguidos de un `[!]` en el 17. **Hoy FAB-11 y FAB-13 son la fila nueva, dicha en
inglés**, y lo que devuelven es lo que antes no existía: AST-12 da un número y **AST-14 produce B2 a
medias — moto, gente, minutos —, que la ronda anterior ni se rozó**. La pareja floja llega ocho
turnos más allá con dos piezas más en la mano.

**Piezas: 1 de 8 entera, dos a medias.**

| pieza | veredicto |
|---|---|
| A3 | **sí**, FAB-19, y sale entera porque es una fila completa de su tabla y **viene de la carta** |
| B2 | **a medias**: dos personas en moto, «the other walk», cuarenta minutos. Falta la hora de salir del agua |
| B1 | **NO, y por la regla nueva**: AST-12 dice *«Six persons»* sin hora, y la quinta regla dice que **un número sin hora no es una línea**. La hora que sí aparece (AST-16) es la del carro que **no** viene, y va en español |
| A1 · A2 · B3 · J · ABIERTO | no se rozan |

**La quinta regla, aquí, hace daño y hace bien a la vez.** Le quita a esta pareja la única pieza que
habrían dado por buena (`Six persons`) y les impide cerrar con un número desnudo. Es el
comportamiento correcto de una regla — y también es la razón de que la cuenta baje de 2 a 1.

**Nueve `[ES]` en veintitrés turnos** (antes: once en diecinueve). Bajan en cantidad y **se mueven de
sitio**: ya no están en preguntar el número, están en el precio (FAB-9, FAB-21), en la aritmética de
la carta (FAB-5, AST-6) y en el dato oculto de ella (AST-16).

**Minutos: 3:21 de habla, 1:50 de pausas y 22 s de carta → 5:33**, contra los 5:08 de la ronda
anterior. Sigue muriéndose antes de terminar; muere **veinticinco segundos y cuatro turnos más
tarde**, y con dos piezas y media en la mano en vez de ninguna.

---

## 4 · EL CALLADO — y esta vez le toca el que trae los tres datos

Handicap: **callado = B · Astrid**. *(Invertido respecto de la ronda anterior.)* Cae en el lado que
**concede** —no en el motor—, que es donde la nota de encargo dice que hay que ponerlo. Fabián es
sólido y juega en serio.

**FAB-1** `[F]` Come here a second, before you go anywhere. How many are coming back at one? I have to know before twelve. (11 s)

**AST-2** `[D]` The river. At ten. (2 s)

**FAB-3** `[F]` `[D]` The river, I know. The cassava goes in at twelve, and it's ready at one. That's twelve servings, and the pot doesn't leave this patio. (14 s)

**AST-4** `[F]` Put a lid on it. (2 s)

*Fabián lee la carta en silencio (12 s).*

**FAB-5** `[F]` `[D]` My mother called. She's coming at one with four more people, and she's on the road already. She brings nothing. So now it's five more at one, and I have twelve servings. I have to know before twelve, because the second chicken goes in at twelve or it goes bad tonight. (26 s)

**AST-6** Five more? (2 s)

**FAB-7** `[F]` Five more. You should tell them: get out of the water at one thirty. At two the sun on that road is very bad. (12 s)

**AST-8** `[F]` What is ready now? (3 s)

**FAB-9** `[F]` `[V]` Nothing is ready. It's simmering — I mean, it's cooking slow, and the cassava is raw. Nothing is cold. (11 s)

**AST-10** `[V]` The cooler? (2 s)

**FAB-11** `[F]` There's rice and chicken in there from Saturday, in one container, and that's my lunch on Monday and on Tuesday. So no, not for free. How many are coming back at one? (18 s)

**AST-12** Six. (1 s)

**FAB-13** `[F]` Six at one? (2 s)

**AST-14** `[X]` Not at one. (2 s)

**FAB-15** `[F]` Then before what hour? A number with no hour is nothing to me. (7 s)

**AST-16** `[X]` Two thirty. (2 s)

**FAB-17** `[F]` And how do you all get back from the river? (5 s)

**AST-18** `[D]` Bike. And walking. (3 s)

**FAB-19** Who's on the bike, and who walks? And how long is that walk? (8 s)

**AST-20** `[D]` Two on the bike. The rest walk. Forty minutes. (7 s)

**FAB-21** `[F]` OK. The container can go, but only if you're back at the gate at one. Somebody has to be at the gate at one, and it can't be me — the fire. (17 s)

**AST-22** Yeah. (1 s)

**FAB-23** `[!]` That's not a line, it says it right here. Say it. (6 s)

**AST-24** `[X]` Marcela comes at twelve forty. I come back. I open the gate at one. (8 s)

**FAB-25** `[F]` `[D]` Good. So the cassava and the second chicken go in at twelve, twelve servings, and if that number comes at one instead of now I throw that chicken away tonight. The container leaves, the pot stays, and Monday I buy my lunch. Two rounds: my mother at one, the rest at two thirty. (28 s)

**AST-26** OK. (1 s)

**FAB-27** And the six? What do you tell them, and when? (6 s)

**AST-28** `[X]` Before twelve thirty. Out of the water at one thirty. (7 s)

**FAB-29** `[F]` So, we're clear then. It's eleven thirty-nine. (5 s)

**AST-30** Clear. (1 s)

### Diagnóstico 4 — al callado no se le miden palabras, se le mide qué produjo

**No se le aplica la puerta del 40 %.** Su cifra va en §D1 marcada como no computable.

**Las piezas que solo ella tiene:**

| pieza | ¿la produjo? | cómo |
|---|---|---|
| **B1** — cuántos vuelven y antes de qué hora | **sí, en tres trozos y a la fuerza** | `Six.` (12) · `Not at one.` (14) · `Two thirty.` (16). **Hicieron falta tres preguntas de Fabián, y una de ellas es la regla nueva citada en voz alta** (FAB-15) |
| **B2** — quién va en moto, quién camina, cuánto dura | **sí, y es la única que la obliga a hablar** | AST-18 lo intenta en tres palabras (`Bike. And walking.`) y **no basta**: FAB-19 tiene que pedir las tres partes por su nombre y AST-20 produce **diez palabras seguidas, su turno más largo de la partida** |
| **B3** — qué les dice a los seis y antes de qué hora | **a medias, y preguntada** | AST-28, después de que FAB-27 le pregunte las dos mitades. Nunca dice a quién ni por qué |
| **su dato oculto nº 1** (el carro de Édgar, no antes de las cuatro) | **NO** | no sale en toda la conversación. Sale el *«Two thirty»*, que es la consecuencia, **nunca la causa** |
| **su dato oculto nº 3** (comieron a las siete, no hay nada abierto) | **NO** | su mejor carta no se juega nunca. Con ella no dice ni una vez por qué necesita comida |
| **desdecirse del mensaje de las diez** | **NO** | y esto es lo grave: **la restricción 2 de su ficha es corregirlo, y no lo corrige**. `Not at one` es un dato nuevo, no una retractación |
| **su condición** | **NO** | la condición de la partida la pone él (FAB-21). Ella la acepta |
| **su objetivo** | **SÍ — con doce palabras en cuatro turnos** | `Six.` · `Not at one.` · `Two thirty.` · `Bike. And walking.` le abren la nevera, porque son literalmente las tres cosas que pide la restricción 3 de A |

**El defecto, nombrado: sí, gana asintiendo — y gana en el lado que otorga, que es peor.** La
restricción 3 de A pide **tres piezas de información**: cuántos, antes de qué hora y cómo vuelven.
Las tres **caben en doce palabras** y ninguna exige una oración. En la ronda anterior el callado era
A y el diagnóstico fue *«las tres cosas son datos que él recibe»*; hoy el callado es B, es **quien
las produce**, y sigue saliendo con el tarro. **Cambiar el hándicap de lado no salvó esa
restricción**, y eso vale la pena escribirlo porque era la hipótesis contraria.

**Lo que sí resiste el telegrama, y es nuevo.** **B2 es la única pieza de las ocho que un callado no
puede dar en tres palabras**, y la razón está escrita en la propia glosa de la fila: *«the plan in
people and minutes, not in one number»*. Es el mismo criterio que la ronda anterior encontró en A3
—la pieza que viene de la carta—, y confirma la regla: **las piezas que piden un plan o un precio
resisten; las que piden un dato, no**.

**La regla del `Yeah` funciona, pero necesita policía.** AST-22 dice `Yeah`, la regla nueva lo
prohíbe, y **FAB-23 la hace cumplir citando la pantalla** — eso es un `[!]` técnico: habla de meta,
no de patio. Le arranca a ella ocho palabras (AST-24) que sin la regla no existirían. **La regla
compra lengua; el que la cobra es el compañero, no el escenario.**

**El motor amordazado no era el problema, y esto lo confirma.** Con el callado en A (ronda anterior)
la conversación duró 3:06 y salieron 6,5 piezas; con el callado en B dura más y salen menos piezas
de B. **El lado que concede es el que más se hunde al amordazarlo**, porque tres de las ocho piezas
son suyas y las tres piden hora, plan o destinatario.

**Piezas: 4,5 de 8.** A1 · A2 · A3 · J en FAB-25 y AST-24 · B1 sí, a la fuerza · B2 sí · B3 a medias
· **ABIERTO no**: nadie nombra a Édgar, porque el único que sabe que existe es la que no habla.
**Minutos: 3:40 de habla, 1:27 de pausas, 12 s de carta → 5:19**, y de esos 3:40 **habla 2:56
Fabián**: 176 segundos contra 44.

---

## 5 · EL ATAJISTA — y esta vez está atado al fuego

Handicap: **atajista = A · Fabián**. *(Primera vez en A. Estuvo en B en las dos rondas anteriores
porque ahí es donde el texto le había escrito un freno; la salida por B se juega en §5b.)* Astrid es
sólida y juega en serio.

**FAB-1** Look, I don't have time for this. Everybody here at one, I cook for twelve, done. Tell them and go. (11 s)

**AST-2** `[F]` `[D]` About the river — they left at ten because it was very hot. I'm heading out at eleven forty and I can't show up empty-handed. They ate at seven and nothing is open there on a Sunday. What is ready now? And what can I take? It has to be cold. (24 s)

**FAB-3** `[!]` Nothing's cold. Look — open the fridge, take the container, it's Saturday's rice and chicken. Take it. One o'clock, everybody here. (14 s)

**AST-4** `[F]` `[X]` …Are you sure? At ten I told you everybody comes back at one. That's not true now — Édgar's car is not coming back before four. (14 s)

*Fabián abre la carta y la ojea (5 s).*

**FAB-5** Four, one, whatever. My mother's coming at one with four more, and I have twelve plates either way. Go, the bike is leaving. (14 s)

**AST-6** `[F]` Then who is at the gate at one? You can't leave the fire. (7 s)

**FAB-7** You. Twelve forty, you're back, you open it. Bye. (6 s)

**AST-8** `[X]` `[F]` …OK. I'll be back at twelve forty. (5 s)

### Diagnóstico 5 — ¿gana el atajista?

**No gana lo suyo, pero se sale con la suya en algo peor: rompe su propia restricción y no hay nada
que se lo impida.**

| | pareja 1 (sólidos) | pareja 5 (atajista en A) |
|---|---|---|
| Turnos | 23 | **8** |
| Habla | 6:15 | **1:35** |
| Consigue su objetivo (un número, antes de las doce) | sí | **no** — nunca pregunta cuántos |
| Cumple su restricción 3 (no abre la nevera sin las tres cosas) | sí | **no. La abre en el turno 3, sin ninguna** |
| Cumple la quinta regla (nada sale gratis) | sí | **no. Regala el tarro sin condición** |
| Segunda gallina | entra a las doce | **no entra** |
| Piezas del cierre | 8 de 8 | **0 de 8** |
| Exponentes propios usados | A 9 de 9 | **A 0 de 9** |

**El atajo por el lado A existe y es de una sola línea: dar el tarro.** La restricción 3 de A —*«You
don't open the fridge until she gives you three things»*— es una promesa que se hace a sí mismo, y
**la ficha no tiene ningún mecanismo que la sostenga**: no hay candado, no hay tercero, no hay
consecuencia dentro de la escena. En cuanto la rompe, el motivo entero de la conversación
desaparece: ella ya tiene comida en las manos y no le queda nada que negociar. **Ocho turnos y la
escena se apaga.**

**Y la quinta regla, que se escribió para esto, no lo alcanza.** *«Nothing leaves this patio for
free: say what you give, and say what you get for it»* está en **la pantalla del cierre**, es decir,
en la lista de lo que cuenta como línea. Al que no piensa cerrar, esa pantalla no le aplica: FAB-3
regala el tarro y no está diciendo ninguna línea, está terminando la escena. **La regla mide el
cierre; el atajista no llega al cierre.**

**Lo que sí para el escenario por este lado.** No puede irse: veinte litros de agua hirviendo, la
yuca cruda y un portón fuera de la vista lo dejan clavado al patio. Por eso su atajo **no es
marcharse, es rendirse**, y le cuesta la segunda gallina, el almuerzo del lunes y del martes, y a la
una tiene a la mamá, al tío, a la tía y a dos de la iglesia delante de un portón que no abre nadie.
**El escenario no lo premia: sencillamente no lo castiga dentro de la conversación.**

**La puerta de los turnos sí lo ve.** Cuatro por rol, por debajo del suelo de seis.

### 5b · Contraprueba — el atajista en B, contra el texto de hoy

Cuatro turnos. Mide si la forma nueva de A y la quinta regla frenan la salida que la ronda anterior
declaró abierta. Fabián, sólido.

**FAB-1** `[F]` Come here a second, before you go anywhere. How many are coming back at one? I have to know before twelve. (11 s)

**AST-2** Six, back here at one, like I told you at ten. Nothing changed. On the bike Marcela takes two, two and two — three trips, fifteen minutes each. That's how we get back. How many, before what hour, how they get back: that's three things. `[F]` Now, I'm heading out at eleven forty and I can't show up empty-handed. What's in the fridge? (33 s)

**FAB-3** `[F]` The container can go, but only if you're back at the gate at one. Somebody has to be at the gate at one, and it can't be me. (14 s)

**AST-4** Gate at one, done. `[F]` Thanks — really. It's eleven thirty-nine, I have to run. (8 s)

**Sigue ganando, y esta ronda gana más rápido.** Sale a las 11:40 con el tarro, cumpliendo sus tres
restricciones al pie de la letra —no llega con las manos vacías, no corrige el mensaje de las diez
*«hasta tener algo en las manos»*, y no se lleva nada que no quepa entre los pies— y satisfaciendo la
restricción 3 de Fabián con **dos datos falsos**: el *seis a la una* y las *tres vueltas de moto*.

**La quinta regla no lo para: la cumple.** Da algo (el portón a la una) y recibe algo (el tarro).
Está escrita contra el que se lleva la cosa gratis, y el atajista **nunca quiso irse gratis: quiso
irse rápido**.

**Y hay un efecto de sentido contrario que hay que decir.** La forma nueva de A —`How many are
coming back at …?` en el turno 1— **le acorta el camino**: la ronda anterior el atajista necesitó
treinta segundos de plan de transporte inventado para colar sus tres cosas, porque Fabián no había
preguntado nada concreto. Hoy la pregunta llega en el primer turno y la mentira entra pegada a ella.
**Cuatro turnos, contra los diez de la ronda anterior.** La forma nueva reparte carga cuando el otro
juega en serio, y **abrevia el fraude cuando no**.

---

## D · LOS DIAGNÓSTICOS, MEDIDOS

### D1 · Palabras por rol, contadas — y la puerta del 40 %

Contador único de la REGLA 2: **bruto, todo lo que sale por la boca, español incluido**. Script:
`artifacts/habla-a2/fase13-scripts/carga-4.mjs`.

| # | conversación | turnos A/B | palabras **FAB (A)** | palabras **AST (B)** | total | reparto A/B |
|---|---|---|---|---|---|---|
| 1 | sólido + sólido | 12/11 | 381 | 305 | 686 | **55,5 / 44,5** |
| 2 | sólido (B) + flojo (A) | 12/11 | 232 | 253 | 485 | 47,8 / 52,2 |
| 3 | flojo + flojo | 12/11 | 145 | 108 | 253 | **57,3 / 42,7** |
| 4 | el callado (B) | 15/15 | 322 | 62 | 384 | 83,9 / 16,1 — *no computable* |
| 5 | el atajista (A) | 4/4 | 72 | 95 | 167 | 43,1 / 56,9 |
| 5b | contraprueba, atajista en B | 2/2 | 49 | 74 | 123 | 39,8 / 60,2 |

La cifra de la pareja 4 va marcada a propósito: **el perfil del callado es producir tres palabras por
turno**, así que su 16,1 % mide el hándicap, no el escenario. (La ronda anterior, con el callado en
A, dio 16,7 % del otro lado: el hándicap pesa lo mismo caiga donde caiga.)

**Veredicto de la puerta 5 (40 %), sobre las dos parejas de perfil parejo:**

| pareja parejo | lado menor | ronda anterior | ¿pasa el 40 %? |
|---|---|---|---|
| 1 · sólido + sólido | **44,5 %** | 45,0 % | **sí**, −0,5 puntos |
| 3 · flojo + flojo | **42,7 %** | 36,5 % | **sí, +6,2 puntos** |

**La puerta 5 se pasa por las dos, y el movimiento entero está en la pareja floja.** Y no sale de
darle más a B: sale de que **los dos turnos que A gastaba preguntando en español ahora producen
respuesta**. En bruto, B pasa de 72 a 108 palabras (+50 %) y A de 125 a 145 (+16 %): **B crece tres
veces más rápido que A**, y crece justo en los dos turnos que cuelgan de la fila nueva —AST-12 y
AST-14—. Es el mecanismo exacto que `fase11-simulacion-4` §D1 había predicho: *«no se arregla dándole
más a B, se arregla quitándole a A los turnos que gasta preguntando lo que no sabe preguntar»*.

**Y hay un contrapeso medido que va en la dirección contraria.** En la pareja sólida A **sube de 349
a 381 palabras** y B de 286 a 305: el reparto **empeora medio punto** (45,0 → 44,5 %). La causa es la
misma pasada: las dos cláusulas de precio de A1 y A2 no caben en un turno, y FAB-19 y FAB-21 son hoy
dos turnos donde la ronda anterior había uno. **El arreglo de la carga solo reparte donde había
español que quitar; donde no lo había, carga a A.**

**Y una tercera cosa, que contradice la regla general del encargo y hay que decirla.** La nota de
montaje dice que amordazar al que pide hunde el reparto. **Aquí pasa lo contrario:** con el flojo en
A —el que pide— el reparto es **47,8 / 52,2**, el más parejo de las cinco; con el flojo en B, la
ronda anterior, fue 63,1 / 36,9. La razón es de este escenario y no del perfil: **aquí el que pide es
también el que concede**, y su ficha lleva además la carta, la física de la olla y la nevera. Tiene
tanto contenido obligatorio que **un flojo en A produce más que un flojo en B**. El lado barato de
este escenario es **B**, no A.

### D2 · Dónde se muere, y por qué

| pareja | ¿muere? | turno | causa |
|---|---|---|---|
| 1 · sólido+sólido | no | — | cierra en 23 turnos con las 8 piezas |
| 2 · sólido+flojo (flojo en A) | no | — | se sostiene con seis filas de la tabla de A dichas casi literales |
| 3 · flojo+flojo | **SÍ** | **21** | `[!]`: A intenta la **cláusula de precio de A1** —lo que pierde esta noche— y no tiene forma para ella. Tiene la palabra (`to go bad`) y no tiene la oración |
| 4 · el callado (B) | no | — | lo sostiene A a base de preguntas, y una de ellas es la regla nueva citada en voz alta |
| 5 · el atajista (A) | **se apaga** | 3 | no es muerte por lengua: rompe su restricción 3, regala el tarro y la escena se queda sin motivo |

**El turno de la muerte se movió del 17 al 21, y con él la causa.** Del 13 al 19 la pareja floja
ahora habla en inglés y produce dos piezas y media. **Muere donde el texto acaba de subir la
apuesta**, no donde la tenía baja.

### D3 · Del callado: qué produjo — y el defecto nombrado

Detalle en §4. Resumen medido:

- **Piezas que solo ella tiene: B1 sí (en tres trozos, a la fuerza) · B2 sí (y es la única que la
  obliga a producir un turno largo) · B3 a medias, preguntada.**
- **Sus dos datos ocultos: ninguno.** Ni el carro de Édgar ni el hambre de los seis. La consecuencia
  (`Two thirty`) sale; la causa, nunca.
- **Su restricción 2 —corregir el mensaje de las diez— no se cumple.** Da un dato nuevo y jamás
  dice que lo de antes era falso. **La pieza de conversación más cara de su ficha es la única que no
  requiere ningún exponente que ella no tenga** —`At ten I told you …. That's not true now.` está en
  su tabla, entera, sin huecos— y aun así no sale: **desdecirse no es una forma, es una decisión**, y
  un callado no toma decisiones caras.
- **Su condición: no la pone ella, la pone él.**
- **Sí consigue su objetivo asintiendo**: doce palabras en cuatro turnos le abren la nevera, porque
  la restricción 3 de A cuenta **piezas de información**, y tres datos caben en tres palabras cada
  uno. **Va nombrado como defecto: cambiar el hándicap de lado no lo arregló.**
- **`Yeah` ya está prohibido y la prohibición muerde** (AST-22 → FAB-23 → AST-24, ocho palabras
  ganadas). Pero la cobra el compañero citando la pantalla, que es meta y va marcado `[!]`.

### D4 · ¿Gana el atajista?

**Por el lado A, no gana: se rinde, y el texto no tiene con qué impedírselo.** Rompe su restricción
3 en el turno 3 regalando el tarro, y con eso apaga la escena en ocho turnos y 0 de 8 piezas. La
quinta regla nueva —*nada sale gratis*— **no lo alcanza, porque vive en la pantalla del cierre y él
no llega al cierre**.

**Por el lado B, sigue ganando, y ahora en cuatro turnos en vez de diez** (§5b). Cumple sus tres
restricciones y satisface la de A con dos datos falsos. **La restricción cuenta piezas, no verdad**,
y la forma nueva de A le sirve la ocasión en el primer turno.

### D5 · Dónde se pasa alguien al español, y por qué exactamente

Marcas `[ES]`: **0** en la pareja 1 · **3** en la 2 (las tres en A) · **9** en la 3 · **0** en la 4
y la 5. Cuatro sitios, y **el que mataba ya no está**:

| # | Momento | Quién | ¿Qué le falta? |
|---|---|---|---|
| 1 | **La cláusula de precio de A1** — *«si el número llega tarde, pierdo la gallina esta noche»* (FAB-21 de la 2 y de la 3) | A | **Le falta la forma.** La pasada de carga metió el precio dentro de la línea del cierre y **no le dio exponente**. Lo más cercano, `If you don't tell me a number, I'll cook for …`, habla de cocinar, no de perder. El vocabulario le da `to go bad`; la oración no se la da nadie |
| 2 | **La cláusula de precio de A2** — *«ese es mi almuerzo del lunes y del martes»* (FAB-11 de la 2, FAB-9 de la 3) | A | **Le falta la mitad de la forma.** `There's rice and chicken in there from …, and that's my lunch on …` cubre qué hay y de quién es, y **se corta justo antes de qué pasa el lunes sin él** |
| 3 | **La aritmética de la carta** — doce raciones, cinco de la iglesia, diecisiete personas (FAB-5 y AST-6 de la 3) | los dos | **Le falta la forma, y no es de este escenario**: ningún exponente de ninguna de las dieciséis fichas maneja restas. La pareja sólida lo esquiva no restando |
| 4 | **El dato oculto de ella** — *«el carro de Édgar no vuelve hasta las cuatro»* (AST-16 de la 3) | B | **Le falta el permiso, no la forma.** `At ten I told you …. That's not true now.` está entera en su tabla y ella **la dice en inglés**; lo que se le va al español es la razón, que la ficha guarda en una nota tras dos puntos y **no tiene fila propia en ninguna tabla** |

**El sitio nº 1 de la ronda anterior —preguntar el número— ha desaparecido de esta lista.** Los dos
sitios nuevos, 1 y 2, son **los dos que la pasada de carga acaba de crear**: escribió el precio dentro
de los criterios y de las líneas del cierre, y no lo escribió en la tabla de exponentes. **Ese es el
punto exacto que hay que dotar de andamiaje, y son dos filas de A.**

### D6 · Minutos reales contra los 7 declarados

| pareja | habla | pausas | carta | **total** | contra 7:00 |
|---|---|---|---|---|---|
| 1 · sólido+sólido | 6:15 | 1:06 | 0:12 | **7:33** | **+8 %** |
| 2 · sólido+flojo (A) | 4:59 | 1:50 | 0:20 | **7:09** | **+2 %** |
| 3 · flojo+flojo | 3:21 | 1:50 | 0:22 | **5:33** | **muere en el 21** |
| 4 · el callado (B) | 3:40 | 1:27 | 0:12 | **5:19** | −24 % |
| 5 · el atajista (A) | 1:35 | 0:21 | 0:05 | **2:01** | −71 % |
| 5b · atajista en B | 1:06 | 0:09 | — | **1:15** | −82 % |

**La banda real del escenario es 2:01 – 7:33.** El presupuesto lo clava la pareja **2** (+2 %), no la
1 (+8 %), y eso tiene explicación: el flojo dice menos palabras por turno, pero gasta el doble de
pausa. Comparado con la ronda anterior: la sólida sube 33 s —los dos turnos de precio—, la floja sube
de 5:08 a **5:33** viviendo cuatro turnos más, y la del callado pasa de 4:16 a 5:19 al cambiar de
lado, porque **al que otorga hay que interrogarlo y cada pregunta es un turno de A**.

### D7 · ¿Sabe la pareja que terminó?

| pareja | ¿lo sabe? | qué se lo dijo |
|---|---|---|
| 1 | **sí** | AST-22 y FAB-23 recorren las piezas y ponen la hora encima |
| 2 | **sí, y con razón** | 6 de 8 piezas dichas; las dos que faltan las creen dichas porque salieron en español |
| 3 | **no** | AST-22 y FAB-23 usan `So, we're clear then` y `See you tomorrow, then` con **una pieza dicha**. La caja sigue dándoles un final sin darles un acuerdo |
| 4 | **cree que sí** | FAB-29 cierra por los dos; falta ABIERTO y ninguno lo echa de menos, porque el único que sabe que Édgar existe es la que no habla |
| 5 | **ninguno de los dos** | la escena no se cierra: se apaga |

### D8 · El otro contador — declarado, y no usado

Si en vez del criterio bruto se descontara lo leído en voz alta (`[L]`), **ninguna de las seis
conversaciones cambiaría**: no hay una sola marca `[L]` en esta ronda —no se jugó al lector— y las
cifras son idénticas con los dos criterios. Se deja escrito para que nadie compare estos números con
los de un archivo medido de otra manera.

### D9 · Dos cosas vistas al jugar que no son de ninguna pareja

1. **La ficha no documenta su última pasada.** El registro interno del archivo termina en «Pasada de
   calcabilidad», y **los diecisiete arreglos de nivel del commit `948648b3` no están escritos en
   ninguna tabla del archivo** —incluido el cambio de `And what can I take cold?`, que es el que más
   se oye en las cinco parejas—. No afecta al juego; afecta a quien lo mida después.
2. **La carta ya cuenta bien su turno** (`her second turn ends — global turn 5`) y en las cinco
   partidas cayó donde dice: después de AST-4. El pendiente que el archivo declaraba abierto en la
   quinta pasada está cerrado por la de calcabilidad, y las dos secciones se contradicen entre sí.

---

## E · RESUMEN

| medida | resultado |
|---|---|
| **¿Se llega a las seis líneas del cierre?** | 1: **8/8** · 2: **6/8** (A1 y A2 a medias, la mitad en español) · 3: **1/8 y muere** · 4: **4,5/8** · 5: **0/8** |
| **Turnos por rol contra la banda (9 por rol)** | 1: 12/11 · 2: 12/11 · 3: 12/11 · 4: 15/15 · 5: 4/4. **Ninguna pareja que llega al cierre lo hace en 9: hacen falta 11-12, y el callado 15** |
| **¿La forma nueva de A tapa el hueco del turno 17?** | **Sí, y se puede señalar el turno.** En la pareja floja, FAB-11 y FAB-13 son la fila nueva dicha en inglés donde antes había dos turnos en español y un `[!]`. La muerte se desplaza del 17 al 21 y cambia de causa |
| **Puerta 5 · 40 %, solo perfil parejo** | 1: **44,5 % pasa** (era 45,0) · 3: **42,7 % pasa** (era 36,5). **La puerta 5 se pasa por las dos**, y el movimiento entero está en la pareja floja: B crece un 50 % y A un 16 % |
| **El callado** | produce B1 a la fuerza y B2 —la única pieza a prueba de telegrama—, **no produce ninguno de sus dos datos ocultos, no corrige el mensaje de las diez y no pone ninguna condición**. Y **sí consigue su objetivo asintiendo: doce palabras en cuatro turnos abren la nevera.** Va nombrado |
| **El atajista** | en **A** no gana lo suyo pero **rompe su restricción 3 en el turno 3 y apaga la escena**, y la quinta regla no lo alcanza porque vive en la pantalla del cierre. En **B** sigue ganando con dos datos falsos, y ahora en 4 turnos en vez de 10 |
| **Español** | 4 puntos. Desaparece el que mataba (preguntar el número) y **aparecen dos nuevos: las dos cláusulas de precio que la pasada de carga escribió en los criterios sin escribirlas en la tabla de exponentes** |
| **Minutos** | declarados 7:00 · reales **2:01 – 7:33** · el presupuesto lo clava la pareja 2 (+2 %); la sólida se pasa un 8 % |
| **Hándicap, declarado** | flojo **A** (era B) · callado **B** (era A) · atajista **A** por primera vez, con contraprueba en B |
| **Contador** | uno solo: **bruto, todo lo hablado**, `fase13-scripts/carga-4.mjs`, copia literal del criterio de `fase11-scripts/carga-4.mjs`. El criterio alterno no cambiaría ninguna cifra |
