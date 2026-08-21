# Escenario 4 (nuevo) · `the-pot-is-already-on` — simulación de las cinco parejas

Cinco conversaciones completas, turno a turno, contra la versión actual de las fichas:
`artifacts/habla-a2/fase8-fichas-4nuevo.md`, con el motor de
`artifacts/habla-a2/fase8-escenario-4nuevo.md` y la caja común
`artifacts/habla-a2/caja-de-herramientas-a2.md`.

Se añade una **sexta** conversación que no es una pareja de perfil, sino un ataque: **el lector**,
el que intenta salir del paso leyendo su ficha en voz alta. Va aparte porque no se le puede medir
carga: no es un perfil, es un modo de hacer trampa.

**Aquí no se arregla nada.** Se juega, se cuenta, se diagnostica.

---

## Cómo se leen estas transcripciones

Cada jugador ve **solo su ficha**. Si un jugador usa un dato del otro lado sin que se lo hayan
dicho en voz alta, va marcado **⚠ FILTRACIÓN**. En esta ronda hubo **cero filtraciones por
descuido** y **una filtración estructural**, producida por la pantalla de cierre compartida:
está disponible en las seis conversaciones desde antes del turno 1, y se ve morder en la
pareja 4. Diagnosticada en el §D0.

### Marcas de turno

| Marca | Qué significa |
|---|---|
| `[F]` | tomó una forma de su tabla «Out loud…» o de la caja y la dijo como suya — **eso es el ejercicio** |
| `[D]` | miró la tabla de datos duros o su reloj propio |
| `[V]` | miró el bloque de vocabulario |
| `[L]` | **leyó en voz alta una línea que no está escrita para decirse**: fila de datos, carta, pantalla de cierre |
| `[X]` | se atascó: pausa larga, reinicio, frase abandonada |
| `[ES]` | se pasó al español, entero o a medias |
| `[!]` | se salió del papel: rompió una restricción de su ficha o habló de meta |

### Los perfiles

El A2 **sólido** falla en tercera persona, en preposición y en pregunta sin auxiliar. El A2
**flojo** produce `I no can`, `two persons`, `he go`, presente por pasado y frases a medias. El
**callado** contesta con una a tres palabras y no inicia nada. El **atajista** habla más suelto de
lo que le toca —va a cerrar, no a aprender— y se salta lo que le estorbe. El **lector** no
improvisa: recorre su tabla de exponentes de arriba abajo.

### El handicap, y de qué lado cae — se declara antes de jugar

**Regla nueva de esta ronda.** En la ronda de agosto el handicap cayó del lado del que pide en 6
de 7 escenarios sin que nadie lo decidiera. Aquí se reparte a mano y se escribe:

| Pareja | Quién lleva el handicap | Qué lado es ése |
|---|---|---|
| 1 · sólido + sólido | ninguno | — |
| 2 · sólido + flojo | **flojo = A · Fabián** | **el motor**: arranca, manda (`a>b`), y suyos son los tres `insistir` y la carta |
| 3 · flojo + flojo | los dos | — |
| 4 · el callado | **callado = B · Duván** | **el que concede y el que trae el dato**: no arranca, pero tiene las tres líneas que solo él puede decir |
| 5 · el atajista | **atajista = B · Duván** | el que tiene la puerta de salida física (la moto de las 11:40) |

Es decir: **el handicap cae una vez de cada lado.** Y como el reparto de esta ronda es el opuesto
al de la anterior en la pareja 2 —el flojo es el motor, no el que pide—, al final va una
**contraprueba** (§C) con el callado del otro lado, seis turnos, para medir cuánto de lo que se ve
es del escenario y cuánto del reparto.

### Un solo contador de palabras, y aquí está dicho

**Se cuenta en bruto todo lo que sale por la boca**: inglés, español, muletillas, y también las
palabras leídas en voz alta de la ficha (`[L]`). **No se cuenta**: la etiqueta del turno, las
marcas entre corchetes, los segundos y los comentarios en cita. **El mismo criterio en las cinco
parejas, en la sexta conversación y —cuando se rehagan— en los ocho escenarios.** Contado con
`artifacts/habla-a2/fase8-scripts/carga.mjs`, que lee este mismo archivo.

Se dice también lo que el criterio contrario haría, en la única pareja donde cambiaría algo, y
**no se usa para juzgar** (§D6).

### Modelo de minutos

Turno de sólido ≈ 8–24 s · turno de flojo con consulta ≈ 10–22 s · turno monosilábico ≈ 1–5 s ·
turno leído `[L]` ≈ 6–18 s · pausa entre turnos: 3 s en las parejas con un sólido, 4 s en la
floja · lectura de la carta en silencio ≈ 10 s · silencios largos y vueltas al fuego, sumados
aparte y declarados en cada pareja. Presupuesto de la ficha: **7 minutos · 9 turnos por rol**.

### Las seis piezas del cierre

Es la única medida que vale para el callado, y la que decide si el atajista gana.

| # | de quién | qué es |
|---|---|---|
| A1 | Fabián | qué entra a la olla a las doce, **y para cuántos** |
| A2 | Fabián | qué sale de este patio ahora y qué no |
| A3 | Fabián | qué necesita a la una que no puede hacer con el fuego prendido (el portón) |
| B1 | Duván | cuántos vuelven de verdad, **y antes de qué hora** |
| B2 | Duván | cómo llegan, sin el carro de Marcela |
| B3 | Duván | qué les dice a los seis, **y antes de qué hora** |
| J | los dos | la hora de la segunda tanda y quién está en el portón |
| ABIERTO | los dos | quién no come con los demás, con nombre y hora |

---

## 1 · SÓLIDO + SÓLIDO

Sin handicap. A = Fabián sólido · B = Duván sólido. La carta entra al terminar el turno global 4,
en la pantalla de A.

**F1** `[F]` Hey — good thing you stayed. Listen: the chicken goes in at twelve. How many are coming at one? And help me with the big table. **(14 s)**

**D2** `[F]` `[V]` They left at ten, because of the heat. They're waiting for you down there. And… I'm heading out at eleven forty. Édgar takes one person. **(16 s)**

> Los dos relojes en la mesa antes del turno 3. El bloque propio de cada ficha funciona: B no da el número, da su hora.

**F3** `[F]` `[D]` No. This pot doesn't leave the fire. The cassava goes in at twelve, and it's ready at one. A sancocho don't travel on a bike. **(15 s)**

**D4** `[F]` `[V]` You should turn the fire down and put a lid. We take it in the cooler, and you come with me. **(13 s)**

> **Carta · pantalla de Fabián · 10 s en silencio.** `recomendar` de B sobre la olla de A: la dirección que el set no tenía.

**F5** `[F caja 8]` `[F]` Hold on. Hold on — my mom is calling me. She's coming at one with four more people, from the church. They bring nothing. So now I have to know before twelve, because the chicken goes in then. How many come back? **(24 s)**

**D6** `[F]` I got here at nine, and I didn't change the plan. Why is me the one who fix this? **(12 s)**

**F7** `[F]` `[D]` You should tell them to leave the water at one thirty. At two the sun is very strong and there's no shade on that road. **(15 s)**

**D8** `[F]` What's ready right now? And what stays good cold? **(8 s)**

**F9** `[D]` Right now, only broth and chicken. Cold… there's rice and chicken from Saturday in the fridge. That's my lunch for Monday and Tuesday. I work, I don't cook. **(19 s)**

> Dato oculto 2 y 3 de A, juntos y sin leer la tabla como frase.

**D10** `[V]` They ate at seven. Nothing more. They're starving, and on Sunday nothing is open there. I can't show up empty-handed, so I'm not leaving with nothing. **(18 s)**

**F11** `[F]` `[D]` The second chicken came out of the fridge at seven. It's cut. If you don't tell me a number before twelve, I cook for four. **(16 s)**

**D12** `[D]` Marcela's car isn't coming back. She wrote at eleven eleven: she stays there until four. I told you at ten that everybody was here at one. That's not true now. **(21 s)**

> Turno 12: la corrección. Le costó diez turnos y la suelta cuando ya tiene medio sí — exactamente lo que dice su restricción 2.

**F13** `[F]` `[X]` OK. OK. Two rounds, then: some at one and the rest at three. Or the container goes now, and everybody eats here at three. **(16 s)**

**D14** `[F]` `[V]` Nothing big fits on that bike. The small cooler fits. Give me the container, and Édgar brings two people back at twelve forty. **(16 s)**

**F15** `[F]` The container can go, but only if you come back at three — no, wait. Before that. My mom is at the gate at one and I can't leave this fire. Somebody has to be there, and it can't be me. **(23 s)**

**D16** `[F]` Then Wilmer comes back with Édgar at twelve forty, and he opens the gate. I stay at the river. I tell the six at twelve, when I get there: out of the water at one thirty, and they walk. Food at three. **(24 s)**

> B1, B2 y B3 en un solo turno, y ninguna se la dijo A por él.

**F17** The cassava and the second chicken go in at twelve, for sixteen. Five plates at one for my mom, and the rest at three. Wilmer is at the gate at one. **(21 s)**

**D18** `[F]` And I'll bring back the ones I can, but only if there's a plate for them at three. Marcela doesn't come, so save her a plate. I call her at three. **(22 s)**

**F19** `[F caja 2]` Fine. So we're clear then: table at twelve thirty, gate at one, second round at three, and one plate in the fridge for Marcela. Now help me with the table — I haven't sat down since six. **(24 s)**

### Diagnóstico 1

**Llegan.** Las ocho piezas del cierre salen: A1 (F17), A2 (F3+F15), A3 (F15), B1 (D16), B2
(D16), B3 (D16), J (F17+D16) y la abierta (D18: Marcela, con nombre y hora). Ninguno dijo la
línea del otro. Nadie asintió: no hay un `sure` ni un `okay` haciendo de compromiso.

**Turnos: 10 + 9 = 19**, uno por encima de los 18 previstos, y el que sobra es el `dar-dato` de A
sobre el tarro (F9) que el mapa pone en el turno 11 y aquí se adelanta al 9 porque B pregunta
abierto. El mapa aguanta con un desplazamiento.

**El dato oculto 4 de A —no ha comido desde las seis— sale en la última frase y sale solo.** No
está en ningún criterio de cierre y aun así lo produjo el escenario, porque a esa altura ya hay
confianza. Es la mejor señal de que no están recitando.

---

## 2 · SÓLIDO (Duván, B) + FLOJO (Fabián, A)

**Handicap del lado del motor.** El flojo es el que arranca, el que manda y el dueño de los tres
`insistir` y de la carta. Es el reparto que la ronda anterior nunca probó.

**F1** `[D]` `[X]` Eh… hello. The chicken… go in at twelve. How many… persons come at one? **(10 s)**

**D2** `[F]` Six went down at ten because of the heat. They're waiting. And I'm heading out at eleven forty — Édgar takes one person. **(15 s)**

**F3** `[X]` `[D]` `[V]` No, no. The pot… no leave the fire. Is… raw. The yuca — the cassava go in at twelve. Ready to the one. **(16 s)**

> Se salva con **una palabra de su bloque de vocabulario**: `raw` le da el «no» físico que su gramática no le da. El vocabulario aquí no es adorno, es la prótesis.

**D4** `[F]` You should turn the fire down and come with me. Put a lid on it. **(9 s)**

> **Carta · pantalla de Fabián.**

**F5** `[X]` `[ES]` `[L]` `[!]` … Espere. "Your mother is on the phone. She's coming at one with four more people —" ah, no. Sorry. My mother come at one. With four persons. **(22 s)**

> **El flojo lee la carta en voz alta**, y la carta dice literalmente *Don't show it, and don't read it out loud*. Se corrige solo, pero ya la leyó. Pasa en las dos parejas donde hay un flojo del lado A.

**D6** `[F]` I got here at nine, and I didn't change the plan. Now I'm the messenger for everybody? **(11 s)**

**F7** `[D]` `[X]` You… you should say to them… one thirty. The sun. Eh… no shade. **(13 s)**

**D8** `[F]` What's ready right now, and what stays good cold? **(7 s)**

**F9** `[D]` `[V]` Now is only broth. Cold… `[ES]` el arroz del sábado, en la nevera. Is… my lunch, Monday, Tuesday. **(17 s)**

> **Primer sitio de español, y es el del bloque 5 de la caja**: decir qué pierde él. Tiene `leftovers` en su vocabulario y no lo usa; lo que no tiene es cómo decir *mis almuerzos de la semana*.

**D10** `[F]` `[V]` They ate at seven. They're starving, and nothing is open there today. I can't show up empty-handed, so I'm not leaving with nothing. **(17 s)**

**F11** `[D]` `[X]` The second chicken… is out of the fridge from the seven. `[X]` If you no say me a number… I cook for four. **(18 s)**

> El tercer `insistir` **sí sale**, roto y todo: `first-conditional` con *if* + presente es lo único que necesita, y está anclado. La versión A2 de `insistir` del §0 del diseño aguanta en boca de un flojo.

**D12** Marcela's car isn't coming back — she wrote at eleven eleven, she stays until four. I told you at ten that everybody was here at one. It's not true now. **(19 s)**

**F13** `[X]` `[ES]` ¿Y entonces cómo vuelven? … eh. How they come? **(10 s)**

**D14** `[F]` Édgar comes back this way at twelve forty. He takes two. The rest walk at one thirty, forty minutes. They can eat at three, and you cook once. **(19 s)**

**F15** `[F]` `[D]` OK. The… container go, but only if you come at three. **(10 s)**

**D16** `[F]` I'll bring back the ones I can, but only if there's a plate for them. **(9 s)**

**F17** `[X]` `[ES]` Yes. Yes. Y alguien en el portón a la una… `[X]` Somebody must be in the… gate. At one. I no can, the fire. **(19 s)**

**D18** Wilmer opens the gate, then. He comes with Édgar. I tell the six at twelve: out of the water at one thirty. **(14 s)**

**F19** `[F caja 2]` OK. See you at three, then. **(5 s)**

### Diagnóstico 2

**El flojo se sostiene, pero pierde una pieza y media.** Produce A2 (F3+F15) y A3 (F17, tarde y a
medias en español). **No produce A1**: nunca dice para cuántos entra la segunda gallina. Dice que
se daña y dice que cocina para cuatro; el número real —dieciséis, doce, el que sea— no aparece en
ninguna de sus diecinueve frases. La pieza abierta (quién no come con los demás) **no se dice**.
Cierre: 6 de 8.

**Lo que lo sostiene es el vocabulario, no los exponentes.** `raw`, `to go bad`, `leftovers`,
`no shade` — cuatro de sus diez entradas hacen trabajo estructural. De sus nueve exponentes usa
tres.

**Y una cosa que no se esperaba: con el handicap en el motor, la conversación no se alarga, se
encoge.** 4:20 de habla contra 5:37 de la pareja sólida, con el mismo número de turnos (19). El
flojo no tarda más: dice menos —162 palabras contra las 300 del sólido en el mismo asiento—. Quien lo compensa es el sólido del otro lado, que sube su turno medio.

---

## 3 · FLOJO + FLOJO

Los dos con handicap. Es el caso real de dos compañeros de clase.

**F1** `[D]` `[X]` Eh… the chicken. Twelve. How many persons? **(6 s)**

**D2** `[X]` `[ES]` ¿Cómo? … eh. They go to the river. Ten o'clock. Hot. **(9 s)**

**F3** `[X]` `[V]` The pot no go. Is… raw. **(6 s)**

**D4** `[X]` `[ES]` `[L]` Pero apáguela… eh. You… "You should turn the fire down and come with me." **(12 s)**

> Primera lectura literal de un exponente, con la entonación de quien lee. La fila entera, tal cual.

> **Carta · pantalla de Fabián.**

**F5** `[L]` `[!]` "Your mother is on the phone. She's coming at one with four more people — your aunt and three from the church." … My mother. One o'clock. **(18 s)**

**D6** `[X]` I… I no can. I go eleven forty. Moto. **(8 s)**

**F7** `[X]` `[ES]` Pero es que si no me dices cuántos… eh. How many? **(9 s)**

**D8** `[ES]` No sé. `[X]` Six? **(4 s)**

**F9** `[D]` `[L]` "Servings at one: twelve." Twelve. **(6 s)**

**D10** `[V]` `[X]` I… empty-handed. No. I no go empty-handed. **(8 s)**

**F11** `[X]` `[ES]` La segunda gallina se daña. Eh… the chicken… go bad. Tonight. **(12 s)**

**D12** `[X]` … OK. **(2 s)**

> **Aquí se muere.** Turno global 12. B contesta con un `OK` que no es ninguna de sus tres líneas —lo prohíbe la regla del cierre— y a partir de aquí la conversación corre en español con fichas en inglés encima.

**F13** `[X]` `[ES]` ¿Y entonces qué hacemos? **(5 s)**

**D14** `[ES]` `[X]` Pues… llevo la nevera pequeña, ¿no? I take the… cooler. **(10 s)**

**F15** `[X]` `[ES]` Yes. Cooler. Pero devuélvete a las tres. Eh… you come three. **(11 s)**

**D16** OK. Three. **(3 s)**

**F17** `[L]` `[!]` "Together, once: the time of the second round, and who's at the gate when the first people arrive." … Eh. Gate? **(14 s)**

> Leen la pantalla de cierre en voz alta para saber qué les falta. Es la segunda vez que la ficha se dice en lugar de usarse.

**D18** `[ES]` Ah, el portón. `[X]` Yo… Wilmer. **(6 s)**

**F19** `[ES]` Listo. **(2 s)**

### Diagnóstico 3

**Muere en el turno 12 y sigue andando cuarenta segundos más en español.** No es un colapso por
falta de conflicto —el conflicto está vivo hasta el final— sino por falta de material para el
cuarto y quinto `insistir`: los dos han gastado su razón nueva y ninguno tiene una tercera que
pueda decir en inglés.

**Cierre: 2 de 8.** A2 medio dicho (F3), J medio dicho (D18, en español, con el nombre solo). A1,
A3, B1, B2, B3 y la pieza abierta, no. Y las dos veces que se acercaron a una pieza fue leyendo:
F9 leyó la fila de datos, F17 leyó la pantalla de cierre.

**El escenario no los mata: los deja hablando.** Eso es mejor que un colapso en tres turnos, y
peor de lo que parece, porque **produce cinco minutos de conversación con dos compromisos**. La
sensación de haber jugado no coincide con lo producido.

---

## 4 · EL CALLADO — y le toca el lado que trae los datos

Handicap en **B (Duván)**: el que concede y el dueño de las tres líneas que solo él puede decir.
A es sólido. Es el ataque directo al punto 3 del §11 del diseño, que promete que aquí un callado
no consigue su objetivo asintiendo.

**F1** `[F]` Hey. The chicken goes in at twelve. How many are coming at one? **(11 s)**

**D2** Six. **(2 s)**

**F3** `[F]` `[D]` Six? At what time? The cassava goes in at twelve and it's ready at one. This pot doesn't leave the fire. **(14 s)**

**D4** I know. **(2 s)**

> **Carta · pantalla de Fabián.**

**F5** `[F]` Hold on. My mom's coming at one with four more people. So I have to know before twelve, because the chicken goes in then. Are the six back at one or not? **(20 s)**

**D6** Maybe. **(2 s)**

**F7** `[F]` Maybe isn't a number, Duván. You should tell them to leave the water at one thirty — at two there's no shade on that road. **(15 s)**

**D8** OK. **(1 s)**

**F9** `[F]` `[D]` The second chicken came out of the fridge at seven. If you don't tell me a number before twelve, I cook for four. **(15 s)**

**D10** Six. Édgar takes one. **(4 s)**

**F11** `[L]` `[D]` Édgar takes one at eleven forty — you're going? And the others? Marcela's car? **(11 s)**

> **⚠ FILTRACIÓN ESTRUCTURAL.** Marcela no está en ninguna parte de la ficha de A. Está en la pantalla de cierre compartida: *«Only B can say: … how they get here without Marcela's car»*. A lee ahí que el carro es un problema **antes del turno 1**. Ver §D0.

**D12** Until four. **(3 s)**

**F13** `[F]` `[X]` Until four? So nobody comes back at one. OK. There's rice and chicken from Saturday in the fridge — that's my Monday and Tuesday. It goes, but only if you come back at three. **(24 s)**

**D14** Deal. **(1 s)**

**F15** `[F]` And somebody has to be at the gate at one. I can't leave the fire. Who? **(11 s)**

**D16** Wilmer. **(1 s)**

**F17** `[F]` Wilmer with Édgar at twelve forty. And what do you tell the six, and when? **(13 s)**

**D18** At twelve. Food at three. **(5 s)**

**F19** Second round at three, then. And Marcela? Nobody eats with her. **(10 s)**

**D20** I'll call her. **(3 s)**

### Diagnóstico 4 — al callado no se le miden palabras, se le mide qué produjo

| pieza | ¿la produjo? | cómo |
|---|---|---|
| **B1** cuántos vuelven y **antes de qué hora** | **a medias** | dijo `Six` dos veces; la hora nunca. El «antes de las tres» lo montó A en F13 y B lo aceptó con `Deal` |
| **B2** cómo llegan sin el carro de Marcela | **a medias** | `Édgar takes one` + `Until four` + `Wilmer`. Nueve palabras; el cómo lo ensambló A |
| **B3** qué les dice a los seis y antes de qué hora | **sí** | `At twelve. Food at three.` — cinco palabras, y son la pieza entera |
| dato oculto 1 (Marcela no vuelve) | **solo bajo pregunta** | y la pregunta salió de la filtración, no de la conversación |
| dato oculto 3 (los seis sin comer) | **no** | su carta más fuerte no se juega nunca |

**El veredicto que importa: el callado consigue su objetivo.** En el turno 13 tiene el tarro
concedido, y hasta ese turno ha dicho **doce palabras**. La restricción 3 de A —*nothing leaves
the fridge before you have a number and a name*— se satisface con `Six` y `Wilmer`: **dos
palabras cumplen la condición que el escenario puso para proteger la nevera.**

**Y hay una causa concreta, que no es el perfil del jugador: la lista de cierre de A no pide dos
de las tres líneas de B.** *«He told you how many come back, and before what hour»* está; cómo
llegan sin el carro y qué les dice a los seis, **no**. Si A sigue su propia ficha y no la pantalla
compartida, B se va habiendo dicho un número. Lo que aquí obligó a B a producir B3 fue que A leyó
la pantalla compartida —y ésa es la misma que filtra a Marcela—.

**La promesa del §11.3 se cumple a medias.** Es verdad que no consigue nada asintiendo: `OK` y
`Deal` no le abren la nevera. Pero **las tres líneas de B son datos, y un dato cabe en tres
palabras**. Producir no es lo mismo que hablar, y este cierre solo exige lo primero.

---

## 5 · EL ATAJISTA — se va a las 11:40 con el tarro y sin la verdad

Handicap del lado de **B (Duván)**: el que tiene la puerta física. A es sólido y juega a fondo.

**F1** `[F]` The chicken goes in at twelve. How many are coming at one? **(11 s)**

**D2** Nobody's coming, man. Everybody's at the river. Turn the fire down, put a lid on it, give me the cooler and I'm gone at eleven forty. Édgar's outside. **(18 s)**

**F3** `[F]` `[D]` No. This pot doesn't leave the fire. It's raw — the cassava goes in at twelve. And nothing leaves that fridge before I have a number and a name. **(18 s)**

**D4** Then give me the rice from yesterday. It's cold, it fits in the cooler, and they've eaten nothing since seven. Two minutes and I'm out. **(17 s)**

> **Carta · pantalla de Fabián.**

**F5** `[F]` Hold on. My mom's coming at one with four more people. I need to know how many come back and before what hour. And I need somebody at the gate at one. **(20 s)**

**D6** I can't help you with that. I'm on the bike at eleven forty. They'll come when they come. Give me the cooler. **(15 s)**

**F7** `[F]` Then I cook for four, and that container is my lunch on Monday. Give me a number, Duván. **(13 s)**

**D8** `[X]` Six. Around three. Fine — six, and Édgar brings two at twelve forty. Can I take it now? **(13 s)**

**F9** `[F]` Two at twelve forty. Who's at the gate at one? **(8 s)**

**D10** `[!]` Wilmer. Wilmer's at the gate. Look, it's eleven thirty-eight. **(9 s)**

**F11** `[F]` The container goes, but only if there's a plate for six at three and you're back with them. **(12 s)**

**D12** Yes. Done. See you at three. **(5 s)**

### Diagnóstico 5 — ¿gana el atajista?

**Sí, y por una grieta que está en el texto de su propia restricción.**

| | pareja 1 (sólidos) | pareja 5 (atajista) |
|---|---|---|
| Turnos | 10 + 9 | **6 + 6** |
| Minutos | 6:25 de habla | **2:59** |
| Sale a las 11:40 con comida en las manos | sí | **sí** |
| Da un número y un nombre | sí | **sí** (`Six`, `Wilmer`) |
| Corrige lo que dijo a las diez | sí, turno 12 | **no, nunca** |
| Sale el carro de Marcela | sí | **no** |
| Salen los seis sin comer desde las siete | sí | como argumento, no como dato |
| Piezas del cierre | 8 de 8 | **3 de 8** (A2, A3 parcial, J) |
| Exponentes propios usados | 8 y 8 de 9 | **1 de 9** |

**La grieta.** La restricción 2 de Duván dice: *«You don't correct the ten o'clock message until
something is in your hands.»* El disparador para decir la verdad es **el momento exacto en que ya
no necesita hablar**. Cumplirla al pie de la letra y marcharse es legal: no rompe ninguna de sus
tres líneas rojas, y las restricciones de A tampoco lo frenan, porque `Six` y `Wilmer` las
satisfacen. **El atajista no gana rompiendo el escenario: gana obedeciéndolo.**

**Lo que sí pierde, y el ejercicio no se lo puede cobrar**, es lo mismo que en el escenario 7:
está fuera de la ventana. A cocina para dieciséis creyendo que seis vuelven a las tres. El carro
no viene, la caminata son cuarenta minutos sin sombra a las dos de la tarde y nadie del río ha
oído la hora. A las tres el patio tiene la comida y no tiene la gente. Eso pasa a las 15:00; el
ejercicio se acabó a las 11:43.

**Y el contraatajista, el de A, sí lo para el escenario.** Se probó en tres turnos: *«One o'clock
or nothing»* y se da la vuelta. B se va a las 11:40 vacío, y A se queda con doce platos, la
segunda gallina dañada, la mamá y cuatro personas a la una y **nadie en el portón**. A **no
consigue su objetivo declarado** —un número antes de las doce—, así que por ese lado el reverso
del §3.1 aguanta. La asimetría es real: **la salida rápida le funciona a B y no le funciona a A**,
y es porque B se lleva un objeto y A solo se lleva silencio.

---

## 6 · EL LECTOR — el que recorre su tabla de exponentes de arriba abajo

No es una pareja de perfil: es la prueba de la segunda mitad de la puerta 4, la que dice que **la
tabla leída en orden tampoco puede ser la conversación**. Lee A; B es sólido y no sabe que el otro
está leyendo.

**F1** `[L]` How many are coming at one? **(6 s)**

**D2** `[F]` They left at ten because of the heat. And I'm heading out at eleven forty — Édgar takes one person. **(14 s)**

**F3** `[L]` The cassava goes in at twelve, and it's ready at one. This pot doesn't leave the fire. **(12 s)**

**D4** `[F]` You should turn the fire down and come with me. **(7 s)**

> **Carta · pantalla de Fabián.** La lee y no la usa: no tiene fila.

**F5** `[L]` I have to know before twelve, because the chicken goes in then. **(9 s)**

**D6** `[F]` I got here at nine, and I didn't change the plan. **(8 s)**

**F7** `[L]` The second chicken came out of the fridge at seven. **(8 s)**

**D8** `[F]` What's ready right now, and what stays good cold? **(7 s)**

**F9** `[L]` If you don't tell me a number, I'll cook for four. **(8 s)**

**D10** `[F]` `[V]` I can't show up empty-handed, so I'm not leaving with nothing. **(9 s)**

**F11** `[L]` You should tell them to leave the water at one thirty. **(8 s)**

**D12** `[F]` They can eat at three, and you cook once. **(7 s)**

**F13** `[L]` Two rounds, then: some at one and the rest at three. **(9 s)**

**D14** `[F]` Nothing big fits on that bike. **(5 s)**

**F15** `[L]` The container can go, but only if you come back at three. **(9 s)**

**D16** `[F]` I'll bring back the ones I can, but only if there's a plate for them. **(9 s)**

### Diagnóstico 6 — la tabla de A es su conversación, en orden

**Ocho de los nueve turnos de A están en su tabla, y el orden de la tabla es el orden del mapa.**
Fila 1 → turno 1 · filas 2 y 3 → turno 3 · fila 4 → turno 5 · fila 5 → turno 9 · fila 6 → turno
13 · fila 7 → turno 7 · fila 8 → turno 15 · fila 9 → turno 17. **Un solo salto**: el `recomendar`
de la fila 7, que en el mapa va antes de los dos últimos `insistir`. Leída de arriba abajo, la
tabla de Fabián produce una conversación que suena bien durante quince turnos.

La de Duván es igual de completa y está **menos ordenada**: filas → turnos 2, 2, 4, 14, 6, 8, 16,
10, 18. Dos desplazamientos. Un lector del lado B suena más raro que uno del lado A.

**Lo que salva al escenario no es la puerta 4: es el cierre.** El lector no dice **A1** (para
cuántos entra la gallina: ninguna fila trae un número) ni **A3** (el portón, que solo existe en la
carta y no tiene fila). Del otro lado tampoco salen B1, B2 ni B3, porque **ninguna fila de la
tabla de Duván contiene un número de personas, una hora de regreso ni el encargo a los seis**.
Cierre del lector: **2 de 8**, y las dos son las que la tabla sí trae (A2 y J parcial).

**El diagnóstico, entonces, es doble y hay que decirlo entero:** la tabla de exponentes de este
escenario **es** un guion —el de A casi perfecto—, y aun así el lector no cierra, porque las seis
piezas del cierre están escritas justamente donde la tabla no llega: los números, las horas y la
tarea que trae la carta. Es una defensa real, pero es la única, y no es la que la puerta 4 dice
que debería estar funcionando.

---

## C · CONTRAPRUEBA DE ALTERNANCIA — el callado del otro lado

Seis turnos, para medir cuánto de la pareja 4 es del escenario y cuánto del lado en que cayó el
handicap. **Callado = A (Fabián)**, el motor. B es sólido.

**F1** Twelve. How many? **(3 s)**

**D2** `[F]` They left at ten because of the heat. I'm heading out at eleven forty. What's ready right now, and what stays good cold? **(15 s)**

**F3** Broth. Nothing cold. **(3 s)**

**D4** `[F]` `[V]` They're starving and nothing is open there. I can't show up empty-handed, so I'm not leaving with nothing. What's in the fridge? **(16 s)**

**F5** Saturday's rice. Mine. **(3 s)**

**D6** `[F]` Then say a time. When do we eat, and who opens the gate? **(9 s)**

**F7** Three. Wilmer. **(2 s)**

**D8** `[F]` OK — I'll bring back the ones I can, but only if there's a plate for them at three. **(11 s)**

**Lo que dice la contraprueba.** Con el callado en el motor, **B conduce sin ayuda**: su exponente
de pregunta abierta (*What's ready right now, and what stays good cold?*) es el único de las dos
fichas que fuerza una respuesta larga, y aquí hace de motor de repuesto. A produce A1 a medias
(`Twelve`), A2 a medias (`Mine`) y **nunca produce A3**, porque el portón viene de la carta y la
carta no se abre sola en boca de un callado.

**Las dos direcciones fallan por lo mismo, no por el lado:** las seis líneas del cierre son datos,
y un dato cabe en dos palabras. **Amordazar al motor aquí no hunde el reparto** como en la ronda
anterior —y la razón es que el que no manda tiene una pregunta abierta en su ficha—. Pero
tampoco es simétrico: con el callado en A se pierde **la pieza de la carta**, que es la única que
no se puede contestar con un número.

---

## D · LOS DIAGNÓSTICOS, MEDIDOS

Todo lo de aquí abajo sale de `artifacts/habla-a2/fase8-scripts/carga.mjs` corriendo sobre este
mismo archivo. Una línea:

```
node artifacts/habla-a2/fase8-scripts/carga.mjs
```

### D0 · La filtración estructural: la pantalla de cierre le cuenta a A el lado de B

No es un descuido de ningún jugador. La ficha trae, **visible para los dos**, esto:

> **Only B can say:** how many really come back, and before what time · **how they get here
> without Marcela's car** · what B tells the six at the river, and before what hour.

De ahí A sabe, **antes del turno 1 y sin que nadie hable**: que existe una tal Marcela, que
Marcela tiene carro, y que ese carro es un problema. Es exactamente el dato oculto nº 1 de Duván
—«el carro de Marcela no vuelve»— reducido a su titular y regalado al otro lado.

Se ve morder en la **pareja 4**, turno F11: A pregunta *«And the others? Marcela's car?»* a un
jugador que no ha dicho la palabra *Marcela* en toda la conversación. En las parejas 1, 5 y 6 no
llega a marcarse porque el jugador de A tenía material propio de sobra; **la disponibilidad, sin
embargo, es la misma en las seis**.

Y no es un descuido del redactor: la **puerta 7** exige que el cierre esté escrito **idéntico en
las dos fichas**, y la **puerta 1** exige que cada ficha tenga un dato que la otra no. Un cierre
idéntico que nombra el contenido de las líneas rompe la puerta 1 por construcción. El escenario 4
nuevo es el primero del set donde las líneas del cierre llevan **nombres propios y hechos**
dentro, y por eso es el primero donde se nota. No se arregla aquí; se nombra.

### D1 · Palabras por rol, contadas — el 40 % de la puerta 5

Contador único, criterio bruto, declarado arriba. **La puerta se juzga solo sobre las dos parejas
de perfil parejo.**

| conversación | A · Fabián | B · Duván | reparto | turnos | ¿puerta 5? |
|---|---|---|---|---|---|
| **1 · sólido + sólido** | **300** | **226** | **57,0 / 43,0** | 10+9 | **pasa** |
| **3 · flojo + flojo** | **101** | **61** | **62,3 / 37,7** | 10+9 | **FALLA — B en 37,7 %** |
| 2 · flojo (A) + sólido (B) | 162 | 180 | 47,4 / 52,6 | 10+9 | *no se juzga* |
| 4 · el callado (B) | 201 | 21 | 90,5 / 9,5 | 10+10 | *no se juzga — §D3* |
| 5 · el atajista (B) | 118 | 107 | 52,4 / 47,6 | 6+6 | *no se juzga* |
| 6 · el lector (A) | 90 | 90 | 50,0 / 50,0 | 8+8 | *no se juzga* |
| C · contraprueba, callado en A | 11 | 76 | 12,6 / 87,4 | 4+4 | *no se juzga* |

**Veredicto de la puerta 5: 1 de 2. No pasa.** La pareja sólida cae dentro con margen (43,0 %); la
floja deja a Duván en **37,7 %**, dos puntos y tres décimas por debajo del suelo.

**Y la causa no es el perfil, es el reparto de piezas.** Las tres líneas de Duván son **datos**:
un número, un medio de transporte y un encargo con hora. Cabe todo en quince palabras. Las tres de
Fabián son **explicaciones** —qué entra a la olla y para cuántos, qué sale del patio y qué no, qué
necesita a la una— y ninguna se dice en menos de diez. Con los dos jugadores fuertes, Fabián
compensa hablando de más y el reparto aguanta; en cuanto los dos son flojos, **lo que se cae
primero es el relleno de B, porque el contenido de B nunca lo necesitó**. El escenario reparte
turnos 9/9 y contenido 60/40.

### D2 · Dónde se muere, y por qué

| pareja | ¿muere? | turno | causa |
|---|---|---|---|
| 1 · sólido + sólido | no | — | llega al cierre con 8 de 8 piezas y un turno de más |
| 2 · flojo (A) + sólido (B) | no | — | el sólido de B sostiene; A pierde A1 y la pieza abierta. **6 de 8** |
| **3 · flojo + flojo** | **sí** | **global 12** | se acaban las razones nuevas para el 4.º y 5.º `insistir` |
| 4 · el callado (B) | no | — | llega, pero lo lleva A entero. **§D3** |
| 5 · el atajista (B) | no | — | **cierra antes de tiempo, y eso es peor. §D4** |
| 6 · el lector (A) | no | — | suena bien quince turnos y cierra 2 de 8. **§D5** |

**El turno 12 de la pareja floja, entero:** `D12 — … OK.` Dos palabras, y una de ellas está
prohibida por la tercera regla del cierre (*Nobody nods. Sure, okay and fine are none of the six
lines*). Lo que se agotó ahí no es la voluntad: es el material. `insistir` en su versión A2 exige
**una razón nueva cada vez**, y el escenario le da a Fabián cuatro razones distintas (la yuca, la
mamá, la gallina de las siete, el tarro) pero a Duván **dos** (el hambre de los seis y la moto de
Édgar). En el turno 10 Duván ya gastó las dos. A partir de ahí solo le queda asentir o pasarse al
español, y hace las dos cosas.

Después del 12 la conversación **sigue andando cuarenta segundos en español** con las fichas en
inglés encima, y los dos únicos momentos en que se acerca a una pieza son lecturas en voz alta
(F9 lee la fila `Servings at 1:00 | twelve`; F17 lee la pantalla de cierre para saber qué falta).
Es peor que un colapso limpio: **produce cinco minutos con sensación de haber jugado y dos
compromisos de ocho**.

### D3 · Del callado no se miden palabras: se mide qué produjo

Handicap en **B (Duván)** — el lado que concede y el que trae los datos. Las 21 palabras de la
tabla D1 no significan nada; su perfil dice literalmente que produce de una a tres palabras por
turno. Lo que sí significa algo:

| pieza que **solo** él tiene | ¿la produjo? | con qué |
|---|---|---|
| **B1** cuántos vuelven y **antes de qué hora** | **a medias** | `Six` (×2). La hora nunca: el «antes de las tres» lo montó A en F13 y B lo firmó con `Deal` |
| **B2** cómo llegan sin el carro de Marcela | **a medias** | `Édgar takes one` · `Until four` · `Wilmer` — nueve palabras sueltas que ensambló A |
| **B3** qué les dice a los seis y antes de qué hora | **sí, entera** | `At twelve. Food at three.` |
| dato oculto 1 · el carro no vuelve | solo preguntado | y la pregunta salió de la filtración del §D0, no de la conversación |
| dato oculto 3 · los seis sin comer desde las siete | **no** | su carta más fuerte no se juega nunca |
| su condición (`only if…`) | **no** | la condición la puso A y B la aceptó |

**El defecto, nombrado: el callado consigue su objetivo asintiendo, casi.** Sale a las 11:40 con
el tarro en las manos, que es todo lo que quería, y en el turno 13 —donde A ya se lo concede—
lleva **doce palabras dichas**. La restricción que el escenario puso para proteger la nevera es
*«Nothing leaves the fridge before you have a number and a name»*, y **se satisface con `Six` y
`Wilmer`: dos palabras**.

**Peor:** *Wilmer* **no existe en ninguna de las dos fichas**. Los seis del río no tienen nombre en
ningún sitio —solo Édgar, Marcela y la mamá, y ninguno de los tres sirve para el portón—, así que
el «nombre» que exige la restricción de A es necesariamente inventado y por tanto
**incomprobable**. La condición no puede fallar.

**Y hay una causa de diseño, no de jugador: la lista de cierre de A no le pide dos de las tres
líneas de B.** *«He told you how many come back, and before what hour»* está en *The lunch
happened if*; **cómo llegan sin el carro** y **qué les dice a los seis**, no. Si A sigue su propia
ficha —que es lo que hará— B se va habiendo dicho un número. Lo que obligó a B a producir B3 fue
que A leyó la pantalla compartida, y ésa es la misma que filtra a Marcela. **La única defensa del
callado y la única filtración del escenario son el mismo párrafo.**

La promesa del §11.3 del diseño —«un jugador callado no consigue su objetivo asintiendo»— **se
cumple a medias**: es verdad que `OK` y `Deal` no le abren la nevera, pero las tres líneas de B
son datos y un dato cabe en tres palabras. **Producir no es hablar, y este cierre solo exige lo
primero.**

### D4 · El atajista gana

**Sí, gana.** Sale a las 11:40 con comida en las manos, sin corregir lo que dijo a las diez, sin
soltar el carro de Marcela y sin usar sus exponentes.

| | pareja 1 (sólidos) | pareja 5 (atajista) |
|---|---|---|
| Turnos | 10+9 = 19 | **6+6 = 12** |
| Habla | 5:37 | **2:39** |
| Palabras | 300 / 226 | 118 / 107 |
| Sale con el tarro | sí | **sí** |
| Da «un número y un nombre» | sí | **sí** (`Six`, `Wilmer`) |
| Corrige lo de las diez | sí, turno 12 | **nunca** |
| Sale el carro de Marcela | sí | **no** |
| Piezas del cierre | **8 de 8** | **3 de 8** (A2 · A3 parcial · J) |
| Exponentes propios usados | A 9/9 · B 8/9 | **B 1 de 9** |

**Dónde está la grieta, literal.** Restricción 2 de Duván: *«You don't correct the ten o'clock
message until something is in your hands.»* El disparador para decir la verdad es **el instante
exacto en que ya no necesita seguir hablando**. Cumplirla al pie de la letra y montarse en la moto
es legal: no rompe ninguna de sus tres líneas rojas. Y las restricciones de A tampoco lo frenan,
porque `Six` + `Wilmer` las satisfacen (§D3). **El atajista no gana rompiendo el escenario: gana
obedeciéndolo.**

**La puerta 11 no lo ve.** Dice *«nadie lo resuelve en menos de 6 turnos»* y él usó exactamente 6
por rol. Pasa el suelo literal con el 47 % del presupuesto de turnos y el 37 % de las piezas.

**Lo que sí pierde está fuera de la ventana del ejercicio**, y por eso el ejercicio no se lo puede
cobrar: a las tres, Fabián tiene comida para dieciséis y no tiene gente, porque el carro no viene,
la caminata son cuarenta minutos sin sombra a las dos de la tarde y nadie del río ha oído una
hora. Eso ocurre a las 15:00; el juego se acabó a las 11:43.

**El atajista del otro lado sí lo para el escenario.** Contraprobado en tres turnos: A dice *«One
o'clock or nothing»* y se da la vuelta. B se va vacío y A se queda con doce platos, la segunda
gallina dañada, la mamá y cuatro personas a la una y **nadie en el portón** — es decir, **A no
consigue su objetivo declarado**. Por ese lado el reverso del §3.1 del blueprint aguanta.
**La asimetría es real y es física: la salida rápida le funciona a quien se lleva un objeto, y no
le funciona a quien solo se lleva silencio.**

### D5 · El lector, y lo que dice de la puerta 4

Ocho de los nueve turnos del lector están en su tabla, **y el orden de la tabla es casi el orden
del mapa de los 18 turnos**: filas 1·2·3·4·5·6·7·8·9 → turnos 1·3·3·5·9·13·7·15·17. Un solo salto.
Leída de arriba abajo, la tabla de Fabián produce quince turnos que suenan bien. La de Duván está
menos ordenada (dos desplazamientos), así que **un lector del lado B suena más raro que uno del
lado A** — que es lo contrario de lo que conviene, porque el lado A es el motor.

**Lo que salva al escenario no es la puerta 4: es el cierre.** El lector no dice **A1** (ninguna
fila trae un número de raciones) ni **A3** (el portón solo existe en la carta, y la carta no tiene
fila). Del otro lado no salen B1, B2 ni B3, porque **ninguna fila de la tabla de Duván contiene un
número de personas, una hora de regreso ni el encargo a los seis**. Cierre del lector: **2 de 8**.

Es una defensa real y es la única. La puerta 4 dice que *«la tabla leída en orden tampoco puede
ser la conversación»*; aquí **sí lo es durante quince turnos**, y lo que la desmiente llega al
final.

### D6 · Dónde se pasarían al español — el punto exacto que hay que andamiar

Marcas `[ES]`: **ninguna** en la pareja 1, **tres** en la 2, **once** en la 3, **ninguna** en la 4,
la 5 y el lector. Y no caen donde sea: caen en tres sitios, siempre los mismos.

| # | Momento | Quién | Qué le falta |
|---|---|---|---|
| **1** | **Decir qué pierdo yo** — `el arroz del sábado… es mi almuerzo del lunes y el martes` (F9 de la 2), `la segunda gallina se daña` (F11 de la 3) | A | Lo predice el bloque **5** de la caja, que ya avisa de que es «el punto exacto donde las parejas se pasaron al español en las ocho simulaciones». Fabián tiene `leftovers` y `to go bad` en su vocabulario y **no los usa**: lo que no tiene es cómo decir *mis almuerzos de la semana* |
| **2** | **Preguntar el cómo** — `¿y entonces cómo vuelven?` (F13 de la 2), `¿y entonces qué hacemos?` (F13 de la 3) | **A, siempre** | **Aquí no hay andamiaje de ninguna clase.** Las nueve filas de Fabián son afirmaciones y una sola pregunta, la del número. **B2 —cómo llegan sin el carro— solo sale si alguien la pregunta, y el único que puede preguntarla es A, que no tiene con qué.** Duván sí tiene su pregunta abierta (*What's ready right now, and what stays good cold?*); Fabián no tiene la suya |
| **3** | **El encargo que trae la carta** — `y alguien en el portón a la una…` (F17 de la 2) | A | La carta le pone **una obligación nueva en el turno 5** y no le da una sola forma para nombrarla. **A3 no tiene fila**, y por eso no la dice ni el lector ni el flojo ni el callado de la contraprueba |

Los tres son del lado **A**. Los dos últimos son del mismo tipo: **el escenario le pide a Fabián
dos cosas que su tabla no cubre** —preguntar abierto y encargar una tarea—, y las dos aparecen
después del turno 5, cuando ya no queda margen.

### D7 · Minutos, contra los 7 previstos

Modelo declarado: turno de sólido 8–24 s · turno de flojo con consulta 10–22 s · monosilábico
1–5 s · turno leído 6–18 s · pausa entre turnos 3 s con un sólido en la pareja y 4 s en la floja ·
lectura de la carta en silencio 10 s · silencios largos y vueltas al fuego, sumados aparte y
declarados aquí.

| conversación | habla | +pausas | +carta | +silencios | **total** | vs. 7:00 |
|---|---|---|---|---|---|---|
| 1 · sólido + sólido | 5:37 | 6:31 | 6:41 | +0:20 | **7:01** | **clavado, sin margen** |
| 2 · flojo (A) + sólido (B) | 4:20 | 5:14 | 5:24 | +0:45 | **6:09** | dentro |
| 3 · flojo + flojo | 2:31 | 3:25 | 3:35 | +1:40 | **5:15** | **corto** |
| 4 · el callado (B) | 2:48 | 3:45 | 3:55 | +0:35 | **4:30** | corto |
| 5 · el atajista (B) | 2:39 | 3:12 | 3:22 | +0:05 | **3:27** | **la mitad** |
| 6 · el lector (A) | 2:15 | 3:00 | 3:10 | +0:10 | **3:20** | la mitad |

**El riesgo de este escenario no es pasarse, es quedarse corto.** Solo la pareja sólida gasta los
siete minutos, y los gasta enteros: **no le sobra ni un turno**, y de hecho necesitó 19 (uno más
que los 18 del mapa). Todas las demás terminan entre el 47 % y el 88 % del presupuesto. La floja
llega a 5:15 con **dos** compromisos, que es el peor sitio donde puede caer un ejercicio: dura lo
suficiente para parecer que pasó algo.

### D8 · El otro contador — declarado, y no usado para juzgar

Lo exige §5: un solo contador. Éste es el que se usó (bruto). Se deja escrito lo que daría el
contrario —**descontar lo que el jugador lee en voz alta de su ficha**, las marcas `[L]`— para que
nadie tenga que adivinarlo:

| conversación | bruto (el que vale) | descontando lo leído |
|---|---|---|
| 1 · sólido + sólido | 57,0 / 43,0 | 57,0 / 43,0 *(no hay `[L]`)* |
| **3 · flojo + flojo** | **62,3 / 37,7 — falla** | **52,0 / 48,0 — pasaría** |
| 2 · flojo + sólido | 47,4 / 52,6 | 43,0 / 57,0 |
| 6 · el lector | 50,0 / 50,0 | **0,0 / 100,0** |

**Es exactamente el aviso del blueprint, reproducido en un solo archivo:** la misma conversación
falla la puerta con un criterio y la pasa con el otro. Se juzga con el bruto, y se juzga con el
bruto en las cinco parejas, en el lector, en la contraprueba y —cuando se rehagan— en los ocho
escenarios.

---

## E · RESUMEN PARA EL GUARDIÁN

| puerta | qué dice | aquí |
|---|---|---|
| **1 · Asimetría** | cada ficha con un dato que la otra no | **rota en un punto** — la pantalla de cierre le da a A el titular del dato oculto nº 1 de B (§D0) |
| **4 · Andamiaje** | la tabla leída en orden no puede ser la conversación | **rota** — la de A es el mapa en orden, 15 turnos seguidos; lo que la detiene es el cierre, no la tabla (§D5) |
| **5 · Carga** | ningún rol bajo el 40 % en las parejas parejas | **rota** — sólidos 57,0/43,0 pasa · flojos **62,3/37,7** falla (§D1) |
| **5b · El callado produce** | no consigue el objetivo asintiendo | **rota a medias** — sale con el tarro tras 12 palabras; `Six` + un nombre inventado satisfacen la condición que protege la nevera (§D3) |
| **11 · Simulación** | la sólida llega · la floja llega con andamiaje · nadie resuelve en menos de 6 turnos | **la sólida llega 8/8 · la floja muere en el turno 12 con 2/8 · el atajista cierra en 6 por rol y pasa el suelo literal** (§D2, §D4) |
| 2 · Zona de acuerdo | existe y no es obvia | **aguanta** — las tres salidas aparecen solas en la pareja sólida; la obvia (apagar y llevar) la tumba la física en el turno 3 de las seis conversaciones |
| 6 · Complicación | turno global 3–6, a un solo rol | **aguanta** — entra al terminar el global 4, a A, en las seis |
| 3 · Cero frase calcable | — | **fuera de este informe**: es de `fase8-calcable-4nuevo.md`. Lo que sí se vio: **dos jugadores flojos leyeron la carta en voz alta** pese al *don't read it out loud*, y uno leyó la pantalla de cierre para saber qué le faltaba |

**El motor está vivo** —nadie cierra en tres turnos, los dos pierden si se van, y la pareja sólida
produce ocho piezas de ocho en siete minutos justos—. **Lo que no está en su sitio es el reparto
del contenido:** las tres líneas de Duván son datos de tres palabras y las tres de Fabián son
explicaciones de quince, y de ahí salen a la vez el 37,7 % de la puerta 5, el callado que gana
asintiendo y el atajista que gana obedeciendo.
