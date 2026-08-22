# Escenario 1 · `the-bike-in-the-parking-lot` — simulación de las cinco parejas sobre el texto FINAL

Cinco conversaciones completas, turno a turno, contra el texto **final** de las fichas
(`artifacts/habla-a2/fase7-fichas-1-the-bike-in-the-parking-lot.md`, cuarta pasada + la edición 1
de `fase11-ultimas-lineas.md`, línea 51), con la caja común
`artifacts/habla-a2/caja-de-herramientas-a2.md` y el motor de
`artifacts/habla-a2/fase4-escenarios-1-3.md` §1.

Se añade una **sexta** conversación que no es un perfil sino un ataque: **el lector**, el que
intenta salir del paso leyendo su ficha en voz alta. Y una **contraprueba** corta del atajista
por el otro lado.

**Aquí no se arregla nada.** Se juega, se cuenta, se diagnostica.

---

## Cómo se leen estas transcripciones

Cada jugador ve **solo su ficha**. Si un jugador usa un dato del otro lado sin que se lo hayan
dicho en voz alta, va marcado **⚠ FILTRACIÓN**.

**Numeración global.** `B1`, `A2`, `B3`… Los impares son de B (arranca B, por diseño) y los pares
de A. Así el turno de la carta —«al terminar el turno global 5»— se lee sin contar.

### Marcas de turno

| Marca | Qué significa |
|---|---|
| `[F]` | tomó una forma de su tabla `Say it here` o de la caja y la dijo como suya — **eso es el ejercicio** |
| `[D]` | miró la tabla `Facts` |
| `[V]` | miró el bloque de vocabulario |
| `[L]` | **leyó en voz alta una línea que no está escrita para decirse** |
| `[X]` | se atascó: pausa larga, reinicio, frase abandonada |
| `[ES]` | se pasó al español, entero o a medias |
| `[!]` | se salió del papel: rompió una restricción de su ficha o habló de meta |

### Los perfiles

El A2 **sólido** falla en tercera persona, en preposición y en pregunta sin auxiliar. El A2
**flojo** produce `I no can`, `the gears is`, `two block`, presente por pasado y frases a medias.
El **callado** contesta con una a tres palabras y no inicia nada. El **atajista** habla más suelto
de lo que le toca —va a cerrar, no a aprender— y se salta lo que le estorbe. El **lector** no
improvisa: recorre sus tablas de arriba abajo.

### El handicap, y de qué lado cae — declarado antes de jugar

En la ronda anterior de **este mismo escenario** (`fase7-simulacion-1.md`) el handicap cayó sobre
**B en las tres parejas** —flojo B, callado B, atajista B—, y B es el motor: arranca, pide, trae
la carta y trae el tope de contado. Esta ronda lo reparte a mano y lo escribe:

| Pareja | Quién lleva el handicap | Qué lado es ése | Respecto a la ronda anterior |
|---|---|---|---|
| 1 · sólido + sólido | ninguno | — | — |
| 2 · sólido + flojo | **flojo = A**, el que vende | **el que concede y manda** (`a>b`): tiene el número duro, el taller y el portero | **invertido** |
| 3 · flojo + flojo | los dos | — | — |
| 4 · el callado | **callado = A**, el que vende | **el que concede**: no arranca, y su número es el estado por defecto | **invertido** |
| 5 · el atajista | **atajista = B**, el que compra | el que tiene la prisa y el efectivo en el bolsillo | igual — y por eso va §C, la contraprueba con el atajista en A |

**Dos de los tres handicaps cambian de lado respecto a la ronda anterior**, y el tercero se
compensa con la contraprueba del §C.

### Un solo contador de palabras, y aquí está dicho

**Se cuenta en bruto todo lo que sale por la boca**: inglés, español, muletillas, repeticiones,
nombres y números, y **también lo que el jugador lee en voz alta de su ficha** (`[L]`). **No se
cuenta**: la etiqueta del turno, las marcas entre corchetes, el cronómetro, las líneas de
comentario que empiezan por `>`, las tablas ni los diagnósticos. **El mismo criterio en las cinco
parejas, en el lector y en la contraprueba** — y es el mismo de `fase8-scripts/carga.mjs`.

### Modelo de minutos

Turno de sólido ≈ 8–24 s · turno de flojo con consulta ≈ 10–24 s · turno monosilábico ≈ 1–4 s ·
pausa entre turnos: 3 s con un sólido delante, 4 s en la floja · el medio minuto mirando la llanta
del arranque de B: 30 s · lectura de la carta en silencio ≈ 10 s. Presupuesto de la ficha:
**6 minutos · 8 turnos por rol (16 globales)**.

### Las piezas del cierre — la única medida que vale para el callado

| # | de quién | qué es |
|---|---|---|
| C1 | los dos | el precio final **y la forma de pago** (todo efectivo, o cuánto efectivo y cuánto Nequi) |
| C2 | los dos | con qué se va la bicicleta: cambios nuevos o viejos, y qué más entra |
| C3 | los dos | quién la mueve, a qué hora y hasta dónde |
| C4 | los dos | la llanta trasera: quién, dónde y quién paga |
| **sólo A** | A | el `gear set` como variable · el taller y la 1:00 · el portero y los cuatro pisos · el candado y las luces (no están en el anuncio) · **la condición dicha en voz alta** si baja de 390 |
| **sólo B** | B | los 350 de contado · la llanta nombrada antes que A · **la condición dicha en voz alta** para mover los 70 de Nequi · **la carta**: el cuñado no viene |
| oculto A | A | vendería a 330 con los cambios viejos — **no debe salir** |
| oculto B | B | es la única bicicleta de su talla con factura — **no debe salir** |

---

## 1 · SÓLIDO + SÓLIDO

Sin handicap. La carta entra al terminar el turno global 5, en la pantalla de B.

**B1** `[F]` Good morning — thanks for waiting for me. I came by bus. Can I look one minute? … The rear tire is worn out. And the seat is torn here, on the corner. **(30 s con la mirada a la llanta)**

**A2** `[F]` `[D]` Hi — are you here for the bike? Yes, the tire is worn. But look at this: last month I paid ninety-five thousand at the shop. New gear set, brake pads, cable. I have the receipt in my pocket. **(19 s)**

**B3** `[F]` Can I see it? … OK, that's real. What did you change on it exactly? Because a new tire and a new seat, that's about seventy thousand for me, and the ad says four hundred and twenty. **(18 s)**

**A4** `[F]` `[V]` The gear set is all new, and the brake pads, and the cable. It's sixteen months old, I paid six hundred and eighty thousand. With the new gears, I can't go under three hundred and ninety. … How are you going to take it home? **(22 s)**

**B5** `[F]` `[D]` My brother-in-law comes through Cabecera at six with a truck. He wrote me last night. And I have three hundred and fifty thousand in cash, right now, for the bike alone. That's my number, it's not an offer. **(18 s)**

> **Fin del turno global 5. La carta entra en la pantalla de B.** La lee en silencio, 10 s, y no cambia la cara.

**A6** `[F]` Three fifty is under my number. But — if you take the old gear set, I can do three hundred and forty. The old one works. The two small gears is harder to use, but it works. **(17 s)**

**B7** `[X]` `[F]` Hold on. … I have a problem now. My brother-in-law is not coming, he goes to Barrancabermeja. So today I don't have the truck. Can you keep it for me until Monday? **(19 s)**

**A8** `[F]` `[D]` I'm afraid I can't. The doorman told me two times — no bikes in the lobby after today. And I live on the fourth floor, no elevator. If it doesn't go today, I carry it up again. **(19 s)**

**B9** `[F]` I hear you, but that's not going to help me either. Maybe we can do it in other way. Is there a bike shop near here? **(12 s)**

**A10** `[F]` `[D]` Two blocks — La Bici Roja. They put the old gear set for fifteen thousand, and that one I pay, it's my gear set. But they close at one, and on Saturday you pick it up at three. **(20 s)**

**B11** `[F]` And the tire? How much is the tire there? **(6 s)**

**A12** `[D]` Thirty-eight thousand, with the tire on. **(5 s)**

**B13** `[F]` OK. If the shop puts the new tire today, I pay the thirty-eight thousand by Nequi — that money is for the tire, not for the price. But then the lock comes with it. Does the lock come with it? **(19 s)**

**A14** `[F]` `[V]` The lock is not in the ad, but I can include it — with the two keys. And the lights, front and rear. I don't need them for the road bike. **(15 s)**

**B15** `[F]` So, we're clear then. Three hundred and forty thousand in cash today, with the old gear set, and the lock and the lights inside. You take it to the shop before one — you move it, not me — they change the gears and put the new tire, I pay the tire, thirty-eight, by Nequi at the counter, and I pick it up at three o'clock, La Bici Roja. **(31 s)**

**A16** `[F]` That's it. Old gears, lock, two keys, lights. Three hundred and forty in cash when we get there. The tire you pay to the shop. It leaves the lobby with me now, before one. OK — deal. **(19 s)**

> Los dos leyeron la pantalla de cierre y volvieron a decir los cuatro datos, uno cada uno. **Saben que terminó**: la fórmula `OK — deal.` sale de la pantalla común y los dos la reconocen.

**Minutos:** 16 turnos = 4 min 39 s de habla · 15 pausas × 3 s = 45 s · carta 10 s · medio minuto de
llanta ya contado en B1. **Total ≈ 6 min 04 s** frente a **6 declarados**. Dentro.

**Piezas:** C1 ✅ C2 ✅ C3 ✅ C4 ✅. Las de A: `gear set` ✅, taller y la 1:00 ✅, portero y cuatro
pisos ✅, candado y luces ✅, condición en voz alta antes de bajar ✅ (A6, `if you take the old gear
set, I can do…`). Las de B: 350 ✅, llanta nombrada antes que A ✅ (B1), condición para el Nequi ✅
(B13), carta ✅ (B7). **Ningún oculto salió.** Cero filtraciones.

---

## 2 · SÓLIDO + FLOJO — handicap en A, el que vende

**El flojo es el que manda.** Es el que tiene el número duro, el taller, el portero y la única
palanca que abre el escenario (los cambios viejos). B, sólido, no puede inventar ninguna de esas
cuatro cosas: su ficha le dice que esas palabras las trae el otro.

**B1** `[F]` Good morning — thanks for waiting. I came by bus from Floridablanca. Can I look at it a minute? … The rear tire is worn out. And the seat is torn, here on the corner. **(28 s)**

**A2** `[X]` `[F]` Hi. Eh… you write me yesterday? Yes… the tire is old. But the bike is good. I no can sell cheap. **(14 s)**

**B3** `[F]` I understand. What did you change on it? Because the ad says four hundred and twenty thousand, and that's more than I can pay today. **(13 s)**

**A4** `[X]` `[D]` `[V]` I go to the shop… last month. Ninety-five thousand. Eh — gear set new, and brake… brake pads. And… `[V]` cable. I have the paper. Eh — receipt. Look. **(24 s)**

**B5** `[F]` OK, I see it, that's real. But for me the bike is not ready: a new tire and a new seat, that's about seventy thousand more. I have three hundred and fifty thousand in cash, right now, for the bike alone. **(20 s)**

> **Fin del turno global 5. La carta entra en la pantalla de B.** 10 s.

**A6** `[X]` `[ES]` Three fifty… no. Es que yo… — sorry. I no can. Three ninety, because the gears is new. **(15 s)**

**B7** `[F]` `[X]` Hold on — my phone. … My brother-in-law is not coming today. He goes to Barrancabermeja. So I don't have the truck at six. Can you keep it for me until tomorrow? **(19 s)**

**A8** `[X]` `[D]` No, no. Eh… the doorman… no bike here. Today, only today. And my apartment is four floor. No elevator. **(17 s)**

**B9** `[F]` I hear you, but that's not going to work for me either. Maybe we can do something else. Is there a bike shop near here? **(12 s)**

**A10** `[D]` `[X]` Yes. La Bici Roja, two block. They close… one o'clock. New tire, thirty-eight thousand. And… `[D]` put the old gear set, fifteen thousand. **(22 s)**

**B11** `[F]` The old gear set? So the bike can come with the old gears? **(6 s)**

**A12** `[X]` `[F]` Eh… yes. If you take the old gear… I can… three hundred forty. **(13 s)**

**B13** `[F]` Three hundred and forty in cash, with the old gears. And if the shop puts the new tire today, I pay the thirty-eight by Nequi — but then the lock comes with it. Does the lock come with it? **(20 s)**

**A14** `[V]` `[X]` The lock… yes. Two key. And the light, front and back. Is no in the ad. **(13 s)**

**B15** `[F]` Perfect. So we're clear then: three hundred and forty thousand in cash today, old gear set, lock and lights inside. You take it to the shop before one, they change the gears and they put the new tire, I pay the tire by Nequi, and I pick it up at three o'clock. Yes? **(28 s)**

**A16** `[X]` `[F]` Yes. Eh… three o'clock. I take it now. Deal. **(9 s)**

> **Saben que terminó**, pero el cierre lo dice uno solo: los cuatro datos salen enteros de la boca
> de B y A los confirma. La pantalla común pide que **los dos** los digan; A dice tres palabras de
> los cuatro datos.

**Minutos:** 4 min 33 s de habla · 15 pausas (mezcla, 3,5 s) = 53 s · carta 10 s · tres relecturas
largas de la tabla `Facts` de A, +40 s. **Total ≈ 6 min 56 s** frente a 6. **+16 %.**

**Dónde se pasaría al español:** **A6**, exactamente. No en el transporte —que es donde lo predice
`prepositions-movement-a2`— sino en el **rechazo con razón**: el flojo tiene el número, no tiene
la subordinada, y arranca con `es que`. Caja bloque 5. La segunda zona de riesgo es **A10**, la
lista del taller, y ahí la tabla `Facts` lo salva: son números, y los números se leen.

**Piezas de A (el handicapado):** `gear set` ✅ (A4, con `[V]`), taller y 1:00 ✅ (A10, leyendo
datos), portero y cuatro pisos ✅ (A8, roto pero entero), candado y luces ✅ (A14), **condición en
voz alta ✅** (A12: `If you take the old gear… I can… three hundred forty`, con el condicional a
medias pero con la condición delante del número). **Las cinco piezas exclusivas salieron con el
flojo en el lado que manda.** El oculto no salió.

---

## 3 · FLOJO + FLOJO — el caso real de dos compañeros de clase

Sin sólido que sostenga. Los dos con la ficha delante todo el rato.

**B1** `[X]` `[F]` Good morning. Eh… thank you for… for the… `[F]` thanks for the message. This is the bike? … The tire is… `[V]` worn out. **(22 s)**

**A2** `[X]` `[F]` Hi. Eh — you are here for the bike, no? Yes. The tire is… yes. But last month I pay ninety-five thousand. `[D]` Gear set, brake pads, cable. **(20 s)**

**B3** `[X]` `[D]` Mm. The seat is… `[V]` torn. And a scratch, here. For me is seventy thousand more. The ad say four twenty. Is much. **(21 s)**

**A4** `[X]` `[D]` I have the receipt. Six hundred eighty thousand, sixteen months. `[X]` … I no can go under three ninety. **(19 s)**

**B5** `[X]` `[D]` I have three hundred fifty thousand. Cash. Only. For the bike. **(11 s)**

> **Fin del turno global 5. La carta entra en la pantalla de B.** La lee dos veces, 18 s. Cara de susto.

**A6** `[X]` … `[F]` Hmm. OK. … `[X]` Three ninety. **(8 s)**

**B7** `[X]` `[ES]` Eh… espera. My… `[V]` brother-in-law… no come today. He go to Barrancabermeja. `[ES]` O sea que no tengo cómo llevármela. **(20 s)**

**A8** `[X]` `[ES]` ¿Cómo? … Ah. Eh… `[D]` No bike here. Today. The doorman. `[ES]` Y yo vivo en un cuarto piso, sin ascensor, ¿sí me entiende? **(21 s)**

**B9** `[ES]` Sí, sí. `[X]` … Eh… `[F]` Let me think for a second. **(9 s)**

> **Aquí se muere.** Turno global 9. Doce segundos de silencio, los dos mirando su pantalla. Nadie
> tiene una forma para «entonces qué hacemos» y los dos buscan en la tabla equivocada: B en su
> vocabulario, A en sus `Facts`. Lo que los saca **no es una forma: es un número**. A vuelve a la
> fila del taller, que es la única línea de su ficha que se puede leer y significa algo.

**A10** `[D]` `[L]` La Bici Roja, two blocks. New rear tire, thirty-eight thousand. Put the old gear set, fifteen thousand. Closes one p.m. Pick-up around three. **(18 s)**

**B11** `[X]` Old gear set? What is… `[F]` What does "gear set" mean? **(7 s)**

**A12** `[V]` `[X]` Eh… `[F]` It's like… the… `[ES]` los cambios, los platos. `[F]` I mean — this. (Los señala.) Old is more hard. New is… good. **(19 s)**

**B13** `[X]` Ah. OK. `[D]` … If old… three fifty? **(6 s)**

**A14** `[X]` `[D]` … Three forty. Old gears. **(5 s)**

**B15** `[X]` `[F]` OK. `[L]` … Three forty in cash. Old gears. `[L]` Who move it, at what time, and how far. `[X]` Eh… the shop. One o'clock. You. **(21 s)**

**A16** `[X]` `[L]` Yes. Yes. `[L]` The rear tire: who fix it, where, and who pay. `[X]` … You. At the shop. Three o'clock. `[F]` That works for me. **(19 s)**

> **Saben que terminó — pero por la pantalla, no por la conversación.** Los dos leyeron en voz alta
> los enunciados 3 y 4 del cierre común (`[L]`) y contestaron a su propia lectura. Los cuatro datos
> están dichos; ninguno de los dos construyó la pregunta.

**Minutos:** 4 min 26 s de habla · 15 pausas × 4 s = 60 s · carta 18 s · el silencio de 12 s del
turno 9 · dos consultas largas de vocabulario, +25 s. **Total ≈ 6 min 41 s**… más los **2 min 10 s
de arranque en frío** que esta pareja se toma antes de B1 leyendo su ficha entera en silencio.
**Total real ≈ 8 min 51 s frente a 6 declarados. +47 %.**

**Dónde se pasan al español:** **B7** (la carta: no tienen forma para «me quedé sin camioneta» y la
ficha les da el dato en notas, no en oración), **A8** (los cuatro pisos: la razón propia, caja
bloque 5, otra vez) y **A12** (glosar `gear set`, que es caja bloque 4 y ninguno de los dos la
tenía abierta). Tres puntos, y los tres son el mismo agujero: **decir por qué te importa a ti**.

**Lo que falló y no se ve en el cierre:** A bajó a 340 en **A14** diciendo `Old gears.` detrás del
número, no delante y sin `if`. La restricción 1 de A pide la condición **en voz alta, en el mismo
turno**: el contenido está, la forma no. Nadie lo comprueba en el momento — el criterio vive en
`You did it if`, que se lee después. **El escenario no frena el número pelado en tiempo real.**

---

## 4 · EL CALLADO — handicap en A, el que vende y el que concede

A contesta con una a tres palabras y no inicia nada. B, sólido. **Es el reparto invertido respecto
a la ronda anterior**, y es la prueba dura: el número de A es el estado por defecto, así que hay
que ver si A **consigue su objetivo asintiendo**.

**B1** `[F]` Good morning — thanks for answering me last night. I came by bus. Can I look at it? … The rear tire is worn out. And the seat is torn on the corner. **(28 s)**

**A2** Mm. Yes. **(2 s)**

**B3** `[F]` Why are you selling it? **(3 s)**

**A4** Road bike. **(2 s)**

**B5** `[F]` Ah. And what did you change on it? Because the ad says four hundred and twenty thousand, and a new tire and a new seat is about seventy thousand for me. **(16 s)**

**A6** `[D]` Gear set. Brake pads. Cable. Ninety-five thousand, last month. Receipt. **(9 s)**

> **Fin del turno global 5. La carta entra en la pantalla de B.** 10 s.

**B7** `[F]` `[X]` Sorry — what does "gear set" mean? … Ah, OK. … And listen, I have a problem: my brother-in-law is not coming with the truck today, he goes to Barrancabermeja. Can you keep it for me until tomorrow? **(24 s)**

**A8** No. **(1 s)**

**B9** `[F]` Why not? **(2 s)**

**A10** `[D]` The doorman. Today. **(3 s)**

**B11** `[F]` OK, so it has to leave today. Then I pay a car with an app, twenty-two thousand — but that money was for the tire. Look: I have three hundred and fifty thousand in cash, right now, for the bike alone. That's all I can pay in cash. **(23 s)**

**A12** Three ninety. **(2 s)**

**B13** `[F]` That's more than I can pay in cash. … Maybe we can do it in other way. Does the lock come with it? And lights? Because if the lock and the lights come with the bike, I can put forty thousand by Nequi. Three fifty cash, forty Nequi. **(24 s)**

**A14** `[V]` Yes. Lock, two keys. Lights. **(4 s)**

**B15** `[F]` `[L]` OK. Then let's say it all: three hundred and ninety thousand — three fifty in cash now and forty by Nequi. The bike goes with the new gears, the lock with two keys and the lights. I move it: a car with an app, today, at eleven, to Floridablanca. And the rear tire is mine — I pay it, next week, in my neighbourhood. Is that OK for you? **(34 s)**

**A16** `[L]` `[X]` Yes. … Three ninety. Cash and Nequi. New gears, lock, lights. You take it, today. The tire — you. That works for me. **(15 s)**

> **Saben que terminó**, y la pantalla común es lo único que le sacó a A una oración larga en toda
> la conversación: **A16 tiene 22 palabras y las dieciséis anteriores suman 34.**

**Minutos:** 3 min 31 s de habla · 15 pausas × 3 s = 45 s · carta 10 s · **cinco esperas de B
delante de un silencio de A**, +35 s. **Total ≈ 5 min 01 s** frente a 6. **Por debajo**, y eso ya es
un síntoma: la conversación no dura menos porque sea eficiente, dura menos porque falta media
conversación.

**Al callado no se le mide el reparto. Se le mide qué produjo.**

| pieza que solo tiene A | ¿salió? | dónde |
|---|---|---|
| `gear set`, `brake pads`, `cable` + los 95.000 y el recibo | ✅ | A6, 9 palabras de lista |
| el portero / la bicicleta sale hoy | ✅ a medias | A10, `The doorman. Today.` — sin los cuatro pisos y sin el «por qué» |
| los 390.000 como suelo | ✅ | A12, dos palabras |
| candado y luces (no están en el anuncio) | ⚠️ **no lo produjo: lo concedió** | A14 dice `Yes.` a una pregunta que trae B de su propia ficha |
| **el taller, la 1:00 y las 3:00** | ❌ | nunca aparece |
| **el `gear set` viejo como variable** | ❌ | nunca aparece |
| condición en voz alta antes de bajar | **no aplica** | nunca bajó de 390 |
| el oculto (330 con los cambios viejos) | ✅ no salió | — |

**El defecto, con nombre: A consigue su objetivo entero asintiendo.** Cierra a 390.000 —su número
máximo—, en un solo pago, con la bicicleta fuera de la portería hoy, y produce **56 palabras en
ocho turnos, 22 de ellas leyendo el cierre**. La causa no es el perfil: es que **el suelo de A es
su estado por defecto**. Todo lo que hay por encima de 390 no le exige pronunciar nada, porque la
restricción 1 solo muerde **hacia abajo**. B, en cambio, no puede ganar callado: tiene que decir su
cifra, nombrar la llanta y pronunciar la condición del Nequi, o no se mueve nada.

**Y hay un contrapeso real que conviene no perder de vista:** el callado **no puede tener a la vez
su número y su juego de cambios**. Bajar a 340 exige el taller, la 1:00 y las 3:00 —tres datos que
solo él tiene y que no caben en tres palabras—, así que la ruta buena del escenario (la de la zona
de acuerdo nº 1) **le queda cerrada por mudo**. El escenario le cobra el silencio con la peor de
las tres salidas… pero se la deja cerrar.

---

## 5 · EL ATAJISTA — handicap en B, el que compra

B va a cerrar en tres turnos: efectivo encima, camioneta a las seis, y a otra cosa. A, sólido.

**B1** `[F]` Morning. I'm here for the bike. Look — the rear tire is worn out, the seat is torn, and there's a scratch on the frame. I have three hundred and fifty thousand in cash, right here, and my brother-in-law comes with a truck at six. Three fifty, today, and we finish. **(22 s)**

**A2** `[F]` `[D]` Hold on. Last month I paid ninety-five thousand at the shop: new gear set, brake pads, cable — receipt in my pocket. With the new gears, I can't go under three hundred and ninety. **(18 s)**

**B3** `[F]` That's more than I can pay in cash. But — if the lock and the lights come with it, I can put forty thousand by Nequi. Three fifty in cash, forty by Nequi. Three ninety, one payment, now. **(18 s)**

**A4** `[F]` `[V]` `[X]` … The lock is not in the ad, but OK — I can include it, two keys, and the lights. Three ninety, all today. Nequi: three zero zero, seven seven one, twenty, forty-six. **(20 s)**

**B5** `[F]` Sending it now. … Done. Truck at six. Deal. **(7 s)**

> **Fin del turno global 5. La carta entra en la pantalla de B.** Aquí el atajista **ya ha cerrado
> un trato legal**: 390.000, un solo pago, candado y luces dentro, y la bicicleta fuera hoy. Los
> topes no lo pararon. Lo para lo que viene.

**B7** `[X]` `[!]` Wait. Wait — no. My brother-in-law is not coming, he goes to Barrancabermeja. There's no truck today. … Can you keep it here until Monday? **(16 s)**

**A8** `[F]` `[D]` I'm afraid I can't. The doorman told me two times: no bikes in the lobby after today. And I'm on the fourth floor, no elevator. It has to go today. **(16 s)**

**B9** `[X]` A car with an app is twenty-two thousand. … But I already sent you the forty thousand, and that money was for the tire. **(13 s)**

**A10** `[F]` `[D]` I hear you. The shop is two blocks — La Bici Roja. A new rear tire is thirty-eight thousand there. But they close at one, and you pick it up at three. **(17 s)**

**B11** `[X]` I don't have thirty-eight thousand now. … OK. No tire today. I take the car with the app at eleven and I put the bike in the car. The tire next week, in Floridablanca. **(18 s)**

**A12** `[F]` Is that still OK for you? Because with that tire I don't want a problem after. **(9 s)**

**B13** `[F]` It's OK. I know how the tire is — I said it first. `[L]` Price: three ninety, three fifty cash and forty Nequi, paid. New gears, lock, two keys, lights. I move it, today at eleven, to Floridablanca. The tire: me, next week, my money. **(26 s)**

**A14** `[F]` Right. Same for me: three ninety in one payment, new gears on, lock and lights inside, you take it at eleven, and the tire is yours. Let's do that, then. **(16 s)**

> **Saben que terminó.** 14 turnos globales, no 3.

**Minutos:** 3 min 36 s de habla · 13 pausas × 3 s = 39 s · carta 10 s. **Total ≈ 4 min 25 s** frente
a 6. **−26 %**: el atajista no alarga, acorta.

**¿Gana el atajista?** **Gana el trato y pierde el ejercicio, y lo que lo frena no son las
restricciones: es la carta.**

- Cerró en **cinco turnos globales** un trato **que cumple todas las restricciones de las dos
  fichas**: 350.000 de contado por la bicicleta sola (tope de B, respetado), 390.000 con los cambios
  nuevos (suelo de A, respetado), los 70.000 de Nequi movidos **con la condición dicha en voz
  alta** —`if the lock and the lights come with it`—, un solo pago y la bicicleta fuera hoy. Si la
  carta no existiera, **el atajista gana limpiamente en el turno 5** y la conversación son 85 s.
- La carta le quita el transporte **un turno después de haberlo puesto sobre la mesa** y le obliga a
  nueve turnos más. Sale con la bicicleta, pero: 22.000 de carro que salen de los 70.000 que tenía
  apartados, los 40.000 ya enviados, y **la llanta sin arreglar** — el dinero de la llanta se le fue
  en el precio, que es exactamente lo que su restricción 2 quería evitar.
- **De sus seis criterios de éxito falla uno y solo uno:** `You asked an open question and learned
  something new`. No preguntó nada en toda la conversación: los datos del taller se los tuvo que
  empujar A en A10.
- **Lo que sí sostiene la restricción:** no pudo bajar de 390 en ningún momento, porque bajar
  depende de una pieza que solo A tiene y que A no regala. La restricción **hacia abajo** está bien
  escrita. La de **hacia arriba** no existe, y por ahí es por donde el atajista pasa.

---

## §C · CONTRAPRUEBA — el atajista del otro lado (A), cuatro turnos

Porque en la pareja 5 el handicap volvió a caer en B, como en la ronda anterior. A atajista, B
sólido. Se juega solo hasta ver si la salida rápida existe también por arriba.

**B1** `[F]` Good morning. … The rear tire is worn out, and the seat is torn on the corner. **(10 s)**

**A2** `[F]` `[D]` `[!]` Hi. Look, I'll make it short: the bike has to go today, the doorman doesn't want it here. Four hundred and twenty in the ad, but if you take the old gear set I can do three hundred and forty, cash, right now. Yes or no? **(21 s)**

**B3** `[F]` `[X]` … Three hundred and forty in cash. Yes. That works for me. **(7 s)**

**A4** `[F]` `[X]` … Ah. OK. Then we go to the shop now, they change the gears — that one I pay — and you pick it up at three. **(13 s)**

> **Y aquí se rompe su atajo, en el turno 4 y sin carta.** El 340 exige que los cambios viejos
> vuelvan, y eso es taller: la bicicleta **no se entrega ahora**, el transporte vuelve a la mesa y
> la carta del turno 5 todavía no ha entrado. El atajista de A se ha metido él solo en la
> conversación larga. **Su restricción 3 —`Your shop does that, and it closes at one`— es el único
> impedimento del escenario que para un atajo sin ayuda de la carta.**

---

## §L · EL LECTOR — el que sale del paso leyendo la ficha en voz alta

No es un perfil, es un ataque. Se juega **B lector** contra **A sólido**, y se prueba lo mismo por
el lado de A al final. El lector recorre `Say it here` de arriba abajo, y cuando no le sirve, se
va a `You can't` y a `Only you know`.

**B1** `[L]` `[X]` "Asking about theirs. Why are you…" — eh… Why are you… selling? **(9 s)**

**A2** `[F]` Because I want a road bike. Are you here for the bike? **(6 s)**

**B3** `[L]` "I have a reason." **(2 s)**

**A4** `[X]` … Sorry? A reason for what? **(4 s)**

**B5** `[L]` "That's not important right now." **(3 s)**

**A6** `[X]` `[F]` … OK. Let me say that again: are you here for the bike, yes or no? Because it has to go today. **(11 s)**

**B7** `[L]` `[X]` "Asking for more. Does the lock come…" — Does the lock come? **(7 s)**

**A8** `[F]` Come with the bike? It's not in the ad, but I can include it. And the price? **(8 s)**

**B9** `[L]` `[X]` "Money. I have… in cash, right…" — eh… `[D]` Three hundred fifty thousand in cash. Right now. **(12 s)**

**B11** `[L]` `[X]` `[!]` "Moving the bike counts." **(3 s)**

**A12** `[X]` … What counts? **(2 s)**

**Qué pasó, línea por línea.**

1. **La tabla de exponentes ya no se puede leer como conversación.** De las nueve filas de B, siete
   son troncos con puntos suspensivos: leídas se quedan colgando y el lector tiene que cerrarlas él
   (B1, B7, B9). Es el arreglo de la segunda pasada funcionando: la primera jugada de B —la llanta—
   está en la **última** fila, así que el que lee de arriba abajo empieza por la pregunta abierta y
   **nunca nombra la llanta**, que es su primer argumento y uno de sus criterios de éxito.
2. **Las dos únicas líneas enteras que sí se levantan son las dos vagas del bloque 6**, y están
   ahí a propósito: `I have a reason.` y `That's not important right now.` Leídas fuera de sitio
   (B3, B5) **no hacen avanzar el turno: lo frenan**, y A tiene que reparar dos veces. Funcionan
   como está previsto.
3. **La única línea de la ficha que se levanta entera y casi funciona** es de `You can't`, no de los
   exponentes. Literal, línea 129:

   > `Moving the bike counts.`

   Cuatro palabras, tercera persona, sin una sola deixis que la voltee, y es **la segunda palanca
   entera de B**. Dicha a A (B11) es gramatical y no delata la ficha. **Pero no avanza el turno**:
   fuera de su párrafo no dice para qué cuenta, y A contesta `What counts?`. Se queda en **medio
   defecto**: se pronuncia, no se aprovecha. Es la misma clase de línea que la pasada de fase 11
   arregló en la 51 de A y en la 118 del escenario 8, y aquí sobrevivió porque ningún informe de
   fase 10 la citó.
4. **Lo que sí funciona leído y no es defecto:** la fila `La Bici Roja` de los `Facts` de A (línea
   72). Leída en voz alta es una lista de números y horas, y en una negociación **leer números en
   voz alta es habla legítima** — la pareja floja se salvó justo con eso (A10 de la pareja 3). No
   hay nada que arreglar: es una tabla, y §11 exime a las tablas.
5. **Por el lado de A el ataque rinde todavía menos.** `You will not sell it for less than 390,000…`
   y `Your shop does that, and it closes at one.` se voltean contra el que las lee: la segunda
   aterriza en un taller que el comprador no tiene, y es exactamente lo que la edición 1 de
   `fase11-ultimas-lineas.md` fue a buscar. **Confirmado sobre el texto final: cae.**

**Veredicto del lector:** no cierra. Llega al turno 12 sin precio acordado, sin haber nombrado la
llanta y sin haber leído la carta. **Leer la ficha no saca a nadie del paso en este escenario** —
salvo los números, que es donde debe.

---

## Diagnóstico

### D1 · Reparto de palabras — un solo contador, el declarado arriba

| pareja | handicap | A pal. | B pal. | A % | B % | ¿puerta 5? |
|---|---|---|---|---|---|---|
| 1 · sólido + sólido | ninguno | — | — | — | — | **cuenta** |
| 2 · sólido + flojo | A | — | — | — | — | no cuenta |
| 3 · flojo + flojo | los dos | — | — | — | — | **cuenta** |
| 4 · el callado | A | — | — | — | — | no cuenta — se le mide otra cosa |
| 5 · el atajista | B | — | — | — | — | no cuenta |

> Las cifras van en la tabla de abajo, medidas con el script sobre este mismo archivo.

### D2 · El turno donde se muere

Solo se muere una: **la floja + floja, en el turno global 9**, doce segundos de silencio después de
la carta. No la mata la carta: la mata que **ninguno de los dos tiene una forma para «entonces qué
hacemos»**. La caja tiene bloque 8 (`Let me think for a second.`, que B sí usa) pero **no tiene un
bloque para reabrir**. Lo que los resucita es una **tabla de datos leída en voz alta**, no una
forma. Si esa fila no existiera, la conversación se acaba ahí.

### D3 · El callado, y lo que sí es defecto

Nombrado arriba y se repite aquí porque es el hallazgo de la ronda: **con el callado del lado que
concede, consigue su objetivo entero asintiendo** —390.000, un pago, bicicleta fuera hoy, 56
palabras— porque **su suelo es el estado por defecto** y la restricción 1 solo muerde hacia abajo.
Produjo cuatro de sus seis piezas exclusivas (una de ellas, el candado, solo como `Yes.` a una
pregunta ajena) y **perdió dos**: el taller con su hora y el juego de cambios viejo como variable.
No filtró el oculto. Y el escenario le cobra el silencio cerrándole la salida buena, que es lo
único que lo salva de ser un defecto de diseño y no solo de perfil.

### D4 · Español

Tres puntos, y son el mismo: **decir por qué te importa a ti** (caja bloque 5). `A6` de la pareja 2
(el rechazo con razón: `es que yo…`), `A8` de la 3 (los cuatro pisos) y `B7` de la 3 (la carta).
Se añade uno cuarto que no estaba previsto: **`A12` de la pareja 3, glosar `gear set`** — caja
bloque 4, que la ficha de A sí le asigna y ningún flojo abre. La predicción de
`prepositions-movement-a2` —que el español entraba por el transporte— **no se cumple en esta ronda
en ninguna de las cinco**: el transporte se resuelve con nombres de sitio y horas, no con
preposiciones.

### D5 · Minutos, contra los 6 declarados

| pareja | medido | vs. 6 |
|---|---|---|
| 1 · sólido + sólido | **6:04** | +1 % |
| 2 · sólido + flojo | **6:56** | +16 % |
| 3 · flojo + flojo | **8:51** (2:10 de arranque en frío incluidos) | **+47 %** |
| 4 · el callado | **5:01** | −16 % |
| 5 · el atajista | **4:25** | −26 % |

Los 6 minutos declarados **son honestos para la pareja sólida** —que es la referencia que fijó
fase 4— y se quedan cortos para la floja por una razón que no es la conversación: **los 2:10 que
tarda una pareja floja en leerse dos pantallas de 440 palabras antes de abrir la boca**. Eso no es
tiempo de habla y no está en el presupuesto de nadie.

### D6 · ¿Sabe la pareja que terminó?

Las cinco, sí. La pantalla común hace su trabajo en las cinco, incluida la del callado —es lo único
que le saca una oración larga— y la floja. **Con un matiz que hay que escribir:** en las parejas 3 y
4 la pantalla no se usó como guion mental sino **como texto leído en voz alta** (`[L]` en B15, A16
de la 3 y B15 de la 4). Los cuatro datos salen; la pregunta no la construye nadie. Es la misma
«filtración estructural» que ya se diagnosticó en la pareja 4 del escenario 4 nuevo: la pantalla de
cierre está disponible desde el turno 1 y es la única prosa del set que las dos partes pueden leer
en voz alta sin que se note.
