# Escenario 2 · `no-appointment-until-thursday` — simulación de las cinco parejas sobre el texto FINAL

Cinco conversaciones completas, turno a turno, contra el texto **final** de las fichas
(`artifacts/habla-a2/fase7-fichas-2-no-appointment-until-thursday.md`, pasada quirúrgica del 22 ago
2026), con la caja común `artifacts/habla-a2/caja-de-herramientas-a2.md` y el motor de
`artifacts/habla-a2/fase4-escenarios-1-3.md` §2.

Se añaden una **contraprueba** del atajista por el otro lado (§C) y una **sexta** conversación que
no es un perfil sino un ataque: **el lector**, el que intenta salir del paso leyendo su ficha en
voz alta (§L).

**Aquí no se arregla nada.** Se juega, se cuenta, se diagnostica.

---

## Cómo se leen estas transcripciones

Cada jugador ve **solo su ficha**. Si un jugador usa un dato del otro lado sin que se lo hayan
dicho en voz alta, va marcado **⚠ FILTRACIÓN**.

**Numeración global.** `B1`, `A2`, `B3`… Los impares son de B (arranca B, por diseño) y los pares
de A. Así el turno de la carta —«se abre al terminar el turno global 5»— se lee sin contar.
**La carta es de A y solo de A.** B no la ve nunca.

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
**flojo** produce `I no can`, `the doctor no is`, `two painkiller`, presente por pasado y frases a
medias. El **callado** contesta con una a tres palabras y no inicia nada. El **atajista** habla
más suelto de lo que le toca —va a cerrar, no a aprender— y se salta lo que le estorbe. El
**lector** no improvisa: recorre sus tablas de arriba abajo.

### El handicap, y de qué lado cae — declarado antes de jugar

En la ronda anterior de **este mismo escenario** (`fase7-simulacion-2.md`) el handicap cayó sobre
**B en las tres parejas** —flojo B, callado B, atajista B—, y B es el motor: arranca, pide, trae
el imposible del jueves y trae el dato pivote. Esta ronda lo reparte a mano, **invierte los tres**
y lo escribe:

| Pareja | Quién lleva el handicap | Qué lado es ése | Respecto a la ronda anterior |
|---|---|---|---|
| 1 · sólido + sólido | ninguno | — | — |
| 2 · sólido + flojo | **flojo = A**, el mostrador | **el que concede y manda** (`a>b`): tiene la agenda, la sede del Centro, la nota y la carta | **invertido** |
| 3 · flojo + flojo | los dos | — | — |
| 4 · el callado | **callado = A**, el mostrador | **el que concede**: no arranca, y la mala noticia es su estado por defecto | **invertido** |
| 5 · el atajista | **atajista = A**, el mostrador | el que tiene todas las salidas y **el que recibe la carta** | **invertido** — y por eso va §C, la contraprueba con el atajista en B |

**Los tres handicaps cambian de lado respecto a la ronda anterior**, y el que se movió a A en la
pareja 5 se compensa con la contraprueba del §C.

### Un solo contador de palabras, y aquí está dicho

**Se cuenta en bruto todo lo que sale por la boca**: inglés, español, muletillas, repeticiones,
nombres y números, y **también lo que el jugador lee en voz alta de su ficha** (`[L]`). **No se
cuenta**: la etiqueta del turno, las marcas entre corchetes, el cronómetro `(NN s)`, las líneas de
comentario que empiezan por `>`, las tablas ni los diagnósticos. **El mismo criterio en las cinco
parejas, en la contraprueba y en el lector** — es el de `fase11-scripts/carga-3.mjs`, y aquí se
ejecuta con `fase11-scripts/carga-2.mjs`, que es el mismo con el formato de turno de esta
simulación.

### Modelo de minutos

Turno de sólido ≈ 8–28 s · turno de flojo con consulta ≈ 10–26 s · turno monosilábico ≈ 1–4 s ·
pausa entre turnos: 3 s con un sólido delante, 4 s en la floja · lectura de la carta en silencio
≈ 12 s · el rato del mostrador escribiéndole a la doctora, dentro del turno. Presupuesto de la
ficha: **6 minutos · 9 turnos por rol (18 globales)**.

### Las piezas del cierre — la única medida que vale para el callado

| # | de quién | qué es |
|---|---|---|
| C1 | **B dice · A comprueba** | día, hora y sede de la cita, y a qué hora tiene que estar allí |
| C2 | **A dice · B repite** | el precio y quién lo paga (o: nada, lo cubre el plan) |
| C3 | **B dice de memoria · A lee de vuelta** | el celular, dígito a dígito |
| C4 | **B dice lo suyo · A dice la señal** | qué hace esta noche · la señal que significa hospital |
| **sólo A** | A | *fully booked* hoy y mañana · jueves 10, 7:00, con los diez minutos antes (forms + X-ray) · la sede del **Centro**, Calle 36, *emergency check* hasta las 8:00 · los **40.000** que no cubre el plan · la **referral note** con el motivo exacto · el **sábado 12 a las 9:00** y su condición · **la pregunta abierta** · la puerta entreabierta de las 5:20 **sin nombre y sin motivo** · el número equivocado del archivo · lo de esta noche · la señal del hospital |
| **sólo B** | B | el **jueves imposible con sus dos números** (7:00 en Girón · camión a las 6:30, la llave es suya · 40 minutos) · **el pedazo de muela del domingo y el borde que corta la lengua** · el dolor comparado · que el número del archivo es de su hermana · **su número de memoria** · los sábados libres · los 70.000 · que está libre hasta las siete |
| oculto A | A | de quién es la cita de las 5:20 y por qué — **no debe salir** |

---

## 1 · SÓLIDO + SÓLIDO

Sin handicap. La carta entra en la pantalla de A al terminar el turno global 5.

**B1** `[F]` Good afternoon. I don't have an appointment. Can you help me, please? My tooth hurts a lot. **(11 s)**

**A2** `[F]` Good afternoon. Sit down here a second. … What happened? **(9 s)**

**B3** `[F]` `[D]` It's worse than yesterday, and it hurts more when I drink something cold. I take two painkillers a day since Sunday night. On Sunday a piece of my lower back tooth broke, and now the edge cuts my tongue when I talk. **(25 s)**

**A4** `[F]` `[D]` I'm afraid we're fully booked today and tomorrow. The first opening is Thursday the tenth, seven in the morning — a first consultation, thirty minutes. And you come ten minutes early, because there are forms and an X-ray. **(22 s)**

**B5** `[F]` `[D]` I can't come at seven, because I open the warehouse in Girón at seven. And on Thursday the truck comes at six thirty and the key is mine, nobody else has it. From here to Girón is forty minutes. Is there any other day? What days do you have after eight thirty? I can wait here today — I'm free until seven. **(29 s)**

> **Fin del turno global 5. La carta entra en la pantalla de A.** La lee en silencio, 12 s. Ya tiene
> el motivo exacto desde B3; le falta la fecha del tratamiento.

**A6** `[F]` `[V]` Hold on. … Maybe I have something later today, but I can't promise. For tonight there is our other branch, in Centro, Calle 36: an emergency check, no appointment, until eight. It's forty thousand, and that one you pay yourself. I write you a referral note and you take it there. **(27 s)**

**B7** `[F]` What does "referral note" mean? … And forty thousand — I have seventy thousand with me, if that helps. But does my plan cover it there? **(16 s)**

**A8** `[F]` It's a paper with your exact problem on it. No note, no patient at Centro. And no — the plan covers it here, and only here. At Centro you pay the forty thousand yourself. **(19 s)**

**B9** `[F]` Then I prefer to wait here. Nobody is waiting for me at home. Is there any day here after eight thirty? **(13 s)**

**A10** `[F]` `[D]` Saturday the twelfth, nine in the morning, is free. But Saturday is only for patients we saw before. If the doctor sees you today, Saturday is yours for the full treatment. Can you come on Saturday? **(21 s)**

**B11** `[F]` Yes. I don't work on Saturdays. Saturday the twelfth at nine, I can. **(9 s)**

**A12** `[F]` `[D]` Good. I'm writing to the doctor now — I never call her, she's with a patient. … And the number in your file is three one zero, two one eight, four four seven one. Is that yours? **(22 s)**

**B13** `[F]` That's my sister's number. Mine is three one zero — five four two — eight eight — zero six. **(15 s)**

**A14** `[F]` Let me repeat it: three one zero, five four two, eight eight, zero six. … The doctor says yes. Today at six fifteen, here in Cabecera, fifteen minutes, to file the edge down. **(21 s)**

**B15** `[F]` Six fifteen today, here in Cabecera. And Saturday the twelfth at nine, here too — I come at ten to nine, for the forms and the X-ray. What do I pay? **(18 s)**

**A16** `[F]` That's what I have on the screen, the two of them. You pay nothing: the plan covers it here. Not today, not Saturday. **(14 s)**

**B17** `[F]` Nothing today, nothing Saturday. Good. Tonight I put something cold on my face ten minutes, I don't chew on that side, and soft food. No cold drinks — that's the one that hurts. **(19 s)**

**A18** `[F]` That's it. And if the pain goes to your ear or your eye, don't wait for me: go to the emergency room tonight, the hospital. So, we're clear then. See you at six fifteen. **(20 s)**

> Los dos dijeron su mitad de los cuatro puntos y **ninguno dijo los cuatro**. **Saben que
> terminó**: `So, we're clear then.` sale de la caja, bloque 2, y los dos la reconocen.

**Minutos:** 18 turnos = 5 min 30 s de habla · 17 pausas × 3 s = 51 s · carta 12 s.
**Total ≈ 6 min 33 s** frente a **6 declarados**. Dentro (+9 %).

**Piezas:** C1 ✅ (B15, A16 comprueba) · C2 ✅ (A16 dice, B17 repite) · C3 ✅ (B13 de memoria, A14 de
vuelta) · C4 ✅ (B17 lo suyo, A18 la señal). Las de A: *fully booked* ✅, jueves con los diez minutos
✅, Centro con las 8:00 ✅, los 40.000 ✅, la nota con el motivo exacto ✅, el sábado con su condición
✅, **la pregunta abierta antes de proponer nada ✅ (A2)**, la puerta de las 5:20 ✅ sin nombre y sin
motivo (A6). Las de B: el jueves imposible con los dos números ✅ (B5), el pedazo de muela ✅ (B3,
provocado por A2), el dolor comparado ✅, el número de la hermana ✅, su número de memoria ✅, los
sábados ✅, los 70.000 ✅. **El oculto de A no salió.** Cero filtraciones.

---

## 2 · SÓLIDO + FLOJO — handicap en A, el mostrador

**El flojo es el que manda y el que recibe la carta.** B, sólido, no puede inventar ninguna de las
salidas: su ficha le dice que la sede, la nota, el precio y el sábado los trae el otro. Su tercera
columna nombra lo que le van a decir, nunca lo que puede pedir.

**B1** `[F]` Good afternoon. I don't have an appointment. Can you help me, please? My tooth hurts a lot. **(11 s)**

**A2** `[X]` `[F]` `[D]` Good afternoon. Eh… today is… full. And tomorrow too. `[D]` Thursday ten, seven o'clock in the morning. **(17 s)**

**B3** `[F]` Thursday at seven I can't, because I open the warehouse in Girón at seven, and on Thursday the truck comes at six thirty and I have the key. Girón is forty minutes from here. Is there any other day? **(21 s)**

**A4** `[X]` `[D]` Eh… no. `[D]` Only Thursday. The doctor… is full. Seven o'clock, thirty minutes. And… ten minutes before. Forms. And… `[V]` X-ray. **(24 s)**

**B5** `[F]` I understand, but I can't be here at seven and in Girón at seven. What days do you have after eight thirty? I'm free this afternoon until seven — I can wait here. **(19 s)**

> **Fin del turno global 5. La carta entra en la pantalla de A.** La lee dos veces, 20 s. Le pide dos
> cosas que no tiene: el motivo exacto y la fecha de vuelta.

**A6** `[X]` `[ES]` Eh… `[X]` … Es que… — sorry. `[F]` Let me think for a second. … `[F]` What happened? **(20 s)**

**B7** `[F]` `[D]` On Sunday a piece of my lower back tooth broke. The edge cuts my tongue when I talk. And it's worse than yesterday — worse when I drink something cold. Two painkillers a day since Sunday. **(21 s)**

**A8** `[X]` `[D]` Ah. OK. OK. … `[X]` I write to the doctor now. She no is free — I never call, I write. `[D]` She go out at six thirty. **(22 s)**

**B9** `[F]` Thank you. And if she can't see me today, is there another day here? Saturday I don't work. **(12 s)**

**A10** `[D]` `[X]` Saturday twelve, nine in the morning. Is free. But… `[D]` Saturday is only for patient of before. Not first time. `[X]` If the doctor see you today… Saturday is for you. **(26 s)**

**B11** `[F]` So today first, and then Saturday the twelfth at nine. Yes, I can do Saturday. Does my plan cover it here? **(13 s)**

**A12** `[F]` `[D]` `[X]` The plan covers it here, and only here. … Other place, you pay all. Eh — `[D]` in Centro, Calle 36, is forty thousand, and the plan no pay that. **(23 s)**

**B13** `[F]` Forty thousand at Centro — I have seventy thousand with me, if that helps. But here it's free? **(12 s)**

**A14** `[X]` `[D]` Here, nothing. Free. Today and Saturday. … `[X]` Eh — the number. `[D]` Three one zero, two one eight, four four seven one. Is your number? **(24 s)**

**B15** `[F]` That's my sister's number. Mine is three one zero — five four two — eight eight — zero six. **(15 s)**

**A16** `[F]` `[X]` Let me repeat it: three one zero… five four two… eight eight… zero six. Yes? … `[D]` And the doctor say yes. Today, six fifteen. Fifteen minutes. **(26 s)**

**B17** `[F]` Six fifteen today, here in Cabecera. And Saturday the twelfth at nine, here too — ten minutes early, for the forms and the X-ray. Tonight I put something cold ten minutes and I don't chew on that side. **(21 s)**

**A18** `[D]` `[X]` Yes. Correct. … `[D]` And pain in the ear, or the eye — hospital. Tonight. Not here. **(15 s)**

> **Saben que terminó**, pero el cierre lo sostiene B: A comprueba con `Yes. Correct.` y su mitad de
> los puntos 2 y 4 sale de la tabla `Facts` en telegrama. Ninguno dijo los cuatro puntos, así que la
> condición nueva del cierre se cumple **por accidente**, no por reparto.

**Minutos:** 5 min 42 s de habla · 17 pausas (mezcla, 3,5 s) = 60 s · carta 20 s · dos relecturas
largas de `Facts` de A, +35 s. **Total ≈ 7 min 37 s** frente a 6. **+27 %.**

**Dónde se pasaría al español:** **A6**, exactamente, y es el turno de la carta. No en el dato —los
datos se leen— sino en **el hueco entre recibir una tarea y no tener con qué empezarla**: el flojo
arranca con `es que…`. Caja bloque 5 y bloque 8. Lo que lo salva es que la pregunta pivote de su
tabla mide **dos palabras** (`What happened?`) y cabe entera detrás de un `Let me think for a
second.`

**Piezas de A (el handicapado):** *fully booked* ✅ (A2, en telegrama), jueves con los diez minutos
✅ (A4), la pregunta abierta ✅ pero **tres turnos tarde** (A6, no A2: propuso el jueves antes de
preguntar nada, que es justo lo que su criterio de éxito prohíbe), el sábado con su condición ✅
(A10), el plan ✅ (A12), los 40.000 del Centro ✅ (A12) — pero **la `referral note` no aparece nunca**,
porque no hizo falta mandarlo al Centro, y **la puerta de las 5:20 tampoco**: el flojo no tiene la
forma para insinuar sin prometer. El oculto no salió.

---

## 3 · FLOJO + FLOJO — el caso real de dos compañeros de clase

Sin sólido que sostenga. Los dos con la ficha delante todo el rato.

**B1** `[X]` `[F]` `[D]` Good afternoon. Eh… I no have appointment. Can you help me, please? … My tooth hurt. Much. **(19 s)**

**A2** `[X]` `[D]` Good afternoon. Eh… today is full. Tomorrow too. `[D]` Thursday, seven a.m. **(16 s)**

**B3** `[X]` `[D]` Thursday, seven? … No. `[D]` I work in Girón. Seven o'clock. `[X]` And Thursday… the truck. Six thirty. **(21 s)**

**A4** `[X]` … Mm. `[D]` It's the first… opening. Thursday. **(11 s)**

**B5** `[X]` `[ES]` Pero es que no puedo. `[X]` … `[F]` I no can. Other day? **(14 s)**

> **Fin del turno global 5. La carta entra en la pantalla de A.** La lee tres veces, 26 s. Cara de
> susto: le pide el motivo exacto y una fecha, y no tiene ninguno de los dos.

**A6** `[X]` `[ES]` … Eh… ¿qué le pongo? — sorry. `[X]` … One moment. **(16 s)**

**B7** `[X]` `[ES]` ¿Sí? … Eh. `[ES]` ¿Entonces qué hago? **(9 s)**

> **Aquí se muere.** Turno global 7, catorce segundos de silencio. La carta cae en el lado flojo y
> **es una tarea con hora, no una palanca**: A no puede usarla sin dos datos que solo salen
> hablando, y no tiene forma para pedirlos. B no sabe que la carta existe, así que no puede
> ayudarle. Ninguno de los dos abre la caja: ni el bloque 8 ni el bloque 3. Lo que los saca **no es
> una forma: es una fila de datos**. A vuelve a `Facts` y lee la única línea de su ficha que se
> puede leer y significa algo.

**A8** `[D]` `[L]` Centro, Calle 36. Emergency check, no appointment, until eight p.m. Forty thousand pesos, out of your pocket, not on the plan. **(19 s)**

**B9** `[X]` `[V]` Forty thousand… `[F]` What does "emergency check" mean? **(9 s)**

**A10** `[X]` `[V]` `[F]` It's like… eh… the doctor look your tooth. Fast. `[X]` No appointment. `[ES]` Una valoración. `[F]` I mean — fifteen minutes, for the pain. **(23 s)**

**B11** `[X]` `[D]` OK. I have seventy thousand. … `[D]` And my plan? Here only? **(12 s)**

**A12** `[F]` `[D]` The plan covers it here, and only here. `[X]` In Centro, you pay. **(13 s)**

**B13** `[X]` … `[D]` And other day here? `[X]` I no work Saturday. **(10 s)**

**A14** `[D]` `[X]` Saturday twelve. Nine a.m. `[D]` … Only patient of before. `[X]` … Eh. But you go to Centro today, so… OK. Saturday for you. **(24 s)**

**B15** `[X]` `[L]` OK. … "The patient says the day, the time and the branch." `[D]` Centro, Calle 36, today, before eight. Forty thousand. `[X]` And Saturday twelve, nine, here. **(24 s)**

**A16** `[L]` `[X]` Yes. … "The front desk says the price, and who pays it." `[D]` Forty thousand — you. Saturday — the plan. Nothing. **(19 s)**

**B17** `[L]` `[D]` "The patient says the cell number from memory." `[D]` Three one zero, five four two, eight eight, zero six. `[X]` … The other number is my sister. **(22 s)**

**A18** `[X]` `[D]` … Zero six. OK. `[L]` "The patient says what they will do about the pain tonight." **(13 s)**

**B19** `[X]` `[D]` Eh… cold. Ten minutes. `[D]` No chew this side. Soft food. **(12 s)**

**A20** `[D]` `[L]` Pain moving to the ear or the eye — hospital emergency room, tonight. **(11 s)**

> **Saben que terminó — pero por la pantalla, no por la conversación.** Los cuatro puntos salen
> porque los dos **leyeron el enunciado en voz alta y contestaron a su propia lectura** (`[L]` en
> B15, A16, B17, A18). Y se pasaron dos turnos del presupuesto: 20 globales, no 18.

**Minutos:** 5 min 17 s de habla · 19 pausas × 4 s = 76 s · carta 26 s · el silencio de 14 s del
turno 7 · dos consultas largas de vocabulario, +25 s. **Total ≈ 7 min 38 s**… más los **2 min 15 s
de arranque en frío** que esta pareja se toma antes de B1 leyendo su ficha entera en silencio.
**Total real ≈ 9 min 53 s frente a 6 declarados. +65 %.**

**Dónde se pasan al español:** **B5** (el rechazo del jueves **con su razón**: tiene los dos números
en `Facts` pero no la subordinada con `because`; caja bloque 5), **A6** (la carta, otra vez el
bloque 8 sin abrir) y **A10** (glosar `emergency check`, caja bloque 4, que su ficha le asigna y
ningún flojo abre). Tres puntos y **dos son el mismo agujero**: decir por qué te importa a ti.

**Lo que falló y no se ve en el cierre:** A mandó a B al Centro **sin `referral note`** (A8 lee la
fila y se salta la condición, que vive en la fila de al lado) y luego le dio el sábado con un
`so… OK` (A14) sin que nadie comprobara nada. Su ficha dice `no note, no patient at Centro`. **En
tiempo real no hay quien lo pare:** la nota se escribe, no se dice, y lo que no se dice no lo
audita la conversación. Y el pedazo de muela **no salió nunca**: sin pregunta abierta, la carta
quedó sin contestar y el 6:15 —la mejor salida de las tres— no existió para esta pareja.

---

## 4 · EL CALLADO — handicap en A, el mostrador y el que concede

A contesta con una a tres palabras y no inicia nada. B, sólido. **Es el reparto invertido respecto
a la ronda anterior**, y es la prueba dura: la mala noticia es el estado por defecto de A, así que
hay que ver si **consigue su objetivo asintiendo**.

**B1** `[F]` Good afternoon. I don't have an appointment. Can you help me, please? My tooth hurts a lot. **(11 s)**

**A2** Good afternoon. **(2 s)**

**B3** `[F]` Can the dentist see me today? **(4 s)**

**A4** `[D]` No. Fully booked. **(3 s)**

**B5** `[F]` Today and tomorrow? … Then is there any other day? What days do you have after eight thirty? **(13 s)**

> **Fin del turno global 5. La carta entra en la pantalla de A.** La lee, 12 s, y no dice nada de
> ella.

**A6** `[D]` Thursday. Seven a.m. **(3 s)**

**B7** `[F]` I can't come at seven, because I open the warehouse in Girón at seven. And on Thursday the truck comes at six thirty, and the key is mine. Girón is forty minutes from here. **(20 s)**

**A8** `[F]` What happened? **(2 s)**

**B9** `[F]` `[D]` On Sunday a piece of my lower back tooth broke, and the edge cuts my tongue when I talk. It's worse than yesterday, and worse with cold drinks. **(17 s)**

**A10** `[X]` One moment. **(2 s)**

> A le escribe a la doctora en silencio. **Tiene el motivo exacto; no tiene la fecha de vuelta, que
> la carta también le pide.** No la pide. `[!]`

**B11** `[F]` Is there another branch? And does my plan cover it here? **(8 s)**

**A12** Centro. Calle 36. **(3 s)**

**B13** `[F]` What is there at Centro? What does it cost? **(6 s)**

**A14** `[D]` Emergency check. Forty thousand. **(4 s)**

**B15** `[F]` Forty thousand — do I pay that myself? Does my plan cover it there? **(9 s)**

**A16** No. Only here. **(3 s)**

**B17** `[F]` Then I wait here. I'm free until seven, and nobody is waiting for me at home. Can the doctor see me later today? **(14 s)**

**A18** `[D]` Six fifteen. Today. **(3 s)**

**B19** `[F]` Six fifteen today, here in Cabecera. And what do I pay? **(8 s)**

**A20** Nothing. Your plan. **(3 s)**

**B21** `[F]` Nothing. Good. My number: three one zero — five four two — eight eight — zero six. The one in your file is my sister's. **(17 s)**

**A22** `[D]` … Zero six. Yes. **(3 s)**

**B23** `[F]` And tonight, after six fifteen — what do I do with the pain? **(8 s)**

**A24** `[D]` Something cold. Ten minutes. **(4 s)**

**B25** `[F]` `[L]` OK. "The front desk says the sign that means hospital tonight, and where to go." … What's the sign? **(12 s)**

**A26** `[D]` Pain to the ear. Or the eye. Hospital, tonight. **(7 s)**

> **Creen que terminó, y les falta una pieza que ninguno de los dos echa en falta:** la cita del
> tratamiento completo. B se va con los quince minutos de las 6:15 y con nada después. Nadie lo
> comprueba, porque el punto 1 del cierre pide **una** cita y esa está dicha.

**Minutos:** 3 min 09 s de habla · 25 pausas × 3 s = 75 s · carta 12 s · **siete esperas de B
delante de un silencio de A**, +45 s. **Total ≈ 5 min 21 s** frente a 6, **con 26 turnos globales en
vez de 18**. Dura menos y son ocho turnos más: la conversación no es más corta, es más pobre.

**Al callado no se le mide el reparto. Se le mide qué produjo.**

| pieza que solo tiene A | ¿salió? | dónde |
|---|---|---|
| *fully booked* hoy y mañana | ✅ | A4, tres palabras |
| jueves 10, 7:00 | ✅ | A6 |
| **los diez minutos antes, forms y X-ray** | ❌ | nunca — y era el segundo número de esa cita |
| **la pregunta abierta** | ✅ | **A8, `What happened?` — dos palabras, y cabe entera en el perfil** |
| la sede del Centro | ⚠️ **concedido** | A12, contestando a una pregunta que trae la ficha de B |
| *emergency check* y los 40.000 | ⚠️ **concedido** | A14, misma causa |
| el plan solo aquí | ⚠️ **concedido, y en dos palabras** | A16, `Only here.` |
| **la `referral note` y su condición** | ❌ | nunca — no hizo falta, pero tampoco se ofreció |
| **el sábado 12 y su condición** | ❌ | nunca aparece |
| la puerta de las 5:20 sin nombre | ❌ | nunca — llega a las 6:15 por la carta, sin insinuar nada |
| lo de esta noche | ✅ a medias | A24: lo frío y los diez minutos; **sin `don't chew`, sin comida blanda, sin bebidas** |
| la señal del hospital | ✅ **en telegrama** | A26 — la fila de `Facts` sobrevive muda; **el primer condicional no** |
| el oculto (de quién es la de las 5:20) | ✅ no salió | — |

**El defecto, con nombre: A consigue las tres cosas de su objetivo con 44 palabras** —una fecha
(6:15), un celular comprobado (a medias: leyó de vuelta dos dígitos, no diez) y algo para esta
noche—, y **cuatro de sus piezas exclusivas salen como respuesta a preguntas que trae la ficha de
B**, no como producción suya: la sede, el precio, el plan y la hora. La causa está en el reparto de
información: **la ficha de B tiene una fila entera (`before you leave`) que le manda preguntar
exactamente lo que A tiene que decir**, y el bloque 3 le manda preguntar cada palabra del oficio.
Con el callado detrás del mostrador, esa fila se convierte en el guion de los dos.

**Lo que el escenario sí le cobra:** el sábado, los diez minutos de antes y la nota no salen, y **la
carta se contesta a medias** — A le escribe a la doctora el motivo sin la fecha de vuelta, que es la
mitad de lo que la carta exige. La ficha lo declara incumplido en `You did it if`; **la
conversación no lo declara nunca**, y ahí es donde el escenario deja pasar el silencio.

**Y una cosa que sí funciona y conviene no perder:** la pregunta que da vuelta al escenario mide
**dos palabras**. Un mudo la puede hacer, y este mudo la hizo. El pivote no depende de la fluidez.

---

## 5 · EL ATAJISTA — handicap en A, el mostrador y **el que recibe la carta**

A va a cerrar en tres turnos: jueves, y si no, la nota al Centro y a otra cosa. B, sólido.

**B1** `[F]` Good afternoon. I don't have an appointment. Can you help me, please? My tooth hurts a lot. **(11 s)**

**A2** `[F]` `[D]` `[!]` Good afternoon. I'll be quick with you: we're fully booked today and tomorrow. The first opening is Thursday the tenth at seven in the morning. Do you take it? **(17 s)**

**B3** `[F]` `[D]` I can't come at seven, because I open the warehouse in Girón at seven, and on Thursday the truck comes at six thirty and the key is mine. Forty minutes from here. Any other day? **(21 s)**

**A4** `[F]` `[D]` Then Centro. Our other branch, Calle 36 — emergency check, no appointment, until eight tonight. Forty thousand, out of your pocket, the plan doesn't pay it there. I write you the referral note now and you go. **(23 s)**

**B5** `[F]` `[V]` Wait — what does "referral note" mean? And forty thousand of my seventy… does my plan cover the treatment there? **(15 s)**

> **Fin del turno global 5. La carta entra en la pantalla de A.** La mira 4 s **y sigue**. `[!]` Le
> pide dos datos que no tiene y una respuesta antes de las 4:45; ya ha decidido cerrar por el otro
> lado.

**A6** `[F]` `[D]` `[!]` It's a paper with the problem on it — no note, no patient at Centro. I'm writing "pain in a lower molar", done. And no: the plan covers you here and only here, so the treatment we do here. Saturday the twelfth at nine. After Centro you're a patient we saw, so Saturday is yours. OK? **(29 s)**

**B7** `[F]` `[X]` Saturday at nine — yes, I don't work on Saturdays. But… I'm free until seven today, and nobody is waiting for me at home. Can I wait here instead? **(18 s)**

**A8** `[F]` `[!]` There's nothing today. Take the note and go now — you have until eight, and the doctor here is out at six thirty. **(13 s)**

**B9** `[F]` OK. So: today Centro, Calle 36, before eight, forty thousand mine. And Saturday the twelfth at nine, here in Cabecera. What time do I have to be here on Saturday? **(19 s)**

**A10** `[F]` `[D]` Ten minutes early — there are forms and an X-ray. **(7 s)**

**B11** `[F]` And the number you have is my sister's. Mine is three one zero — five four two — eight eight — zero six. **(16 s)**

**A12** `[F]` Let me repeat it: three one zero, five four two, eight eight, zero six. Anything else? **(12 s)**

**B13** `[F]` Yes — what do I do tonight with the pain, after Centro? **(8 s)**

**A14** `[F]` `[D]` Put something cold on your face for ten minutes. Don't chew on that side, soft food, no hot drinks and no cold drinks. And if the pain goes to your ear or your eye, go to the emergency room tonight. **(21 s)**

**B15** `[F]` So: Centro before eight, forty thousand, mine. Saturday the twelfth at nine here, ten minutes early, and nothing to pay because the plan covers it here. Tonight, something cold ten minutes and no chewing on that side. And if it goes to my ear, hospital. **(24 s)**

**A16** `[F]` That's it. Take the note. See you Saturday at nine. **(7 s)**

> **Saben que terminó.** 16 turnos globales, no 3 — pero **cerró**, y cerró un trato que la ficha
> admite: es la zona de acuerdo nº 2 del diseño, entera.

**Minutos:** 4 min 21 s de habla · 15 pausas × 3 s = 45 s · carta 4 s. **Total ≈ 5 min 10 s** frente
a 6. **−14 %.**

**¿Gana el atajista? Sí. Gana el trato y el cierre, y lo que se pierde no lo nota nadie en la
mesa.**

- Cerró en 16 turnos **una de las tres salidas diseñadas** —Centro esta noche, tratamiento aquí el
  sábado— **sin romper una sola restricción decible**: no prometió cita hoy, no habló de otro
  paciente, dejó fecha escrita y algo para esta noche, y B respetó su tope de las 8:30.
- **Lo que se saltó fue la pregunta abierta**, que es su criterio de éxito nº 6, y con ella el
  motivo exacto. La `referral note` sale con `"pain in a lower molar"` en vez de un pedazo de muela
  partido que corta la lengua. **Su propia ficha dice `a referral note with the exact problem`** — y
  **nada en la conversación lo comprueba, porque la nota se escribe, no se dice**. Es el mismo
  agujero que abrió la pareja 3 por incompetencia y este abre por prisa.
- **La carta no lo frena.** En el escenario 1 la carta le quitaba al atajista una palanca que ya
  había puesto sobre la mesa; aquí **la carta es una tarea con plazo, y una tarea se ignora**. Cae
  además en su propia pantalla, así que nadie se entera de que la ignoró. **El 6:15 de hoy —los
  quince minutos que le habrían quitado el borde que corta— no existe para este paciente**, y el
  paciente no sabrá nunca que existió.
- **Lo que sí sostiene el escenario:** el jueves. No pudo colocarlo ni empujándolo en el segundo
  turno, porque el imposible de B tiene dos números y un motivo físico. El atajo por la agenda está
  cerrado; el atajo **por la vía rápida al Centro**, no.

---

## §C · CONTRAPRUEBA — el atajista del otro lado (B), cuatro turnos

Porque en la pareja 5 el handicap cayó en A. B atajista, A sólido. Se juega solo hasta ver si la
salida rápida existe también por el lado del que pide.

**B1** `[F]` `[!]` Good afternoon. I have no appointment, my tooth hurts, and I have seventy thousand pesos here. Put me in today, at any hour, and I pay. **(15 s)**

**A2** `[F]` `[D]` I'm afraid I can't. We're fully booked today and tomorrow, and money doesn't open a chair here — your plan covers it here anyway, you don't pay. The first opening is Thursday the tenth at seven in the morning. **(22 s)**

**B3** `[X]` `[!]` Then Thursday, fine. Seven. Write it. **(6 s)**

**A4** `[F]` `[D]` Thursday the tenth, seven in the morning — a first consultation, thirty minutes. Come ten minutes early, there are forms and an X-ray. What's your cell number? **(18 s)**

> **Y aquí se ve que por este lado no hay atajo, hay automutilación.** B ha cerrado en cuatro turnos
> **la única hora de la semana a la que no puede llegar**: a las 7:00 está recibiendo el camión en
> Girón con la llave del depósito. La cita que acaba de firmar es la cuarta silla vacía que la
> ficha de A castiga. El atajo de B **solo existe rompiendo su restricción 1**, y eso no es un
> agujero del escenario: es salirse del papel, y va marcado `[!]`. **La restricción del jueves está
> bien escrita.**

---

## §L · EL LECTOR — el que sale del paso leyendo la ficha en voz alta

No es un perfil, es un ataque. Se juega **A lector** contra **B sólido**, porque A es quien tiene
las nueve filas de exponentes de mostrador, y se prueba después por el lado de B.

**B1** `[F]` Good afternoon. I don't have an appointment. Can you help me, please? My tooth hurts a lot. **(11 s)**

**A2** `[L]` "Bad news. We're fully booked today and tomorrow. The first opening is…" — eh… `[D]` Thursday, seven a.m. **(14 s)**

**B3** `[F]` I can't come at seven, because I open the warehouse in Girón at seven, and on Thursday the truck comes at six thirty. Any other day? **(15 s)**

**A4** `[L]` "Their side. What happened?" **(4 s)**

**B5** `[F]` `[D]` On Sunday a piece of my lower back tooth broke, and the edge cuts my tongue. It's worse than yesterday. **(13 s)**

**A6** `[L]` "Money. The plan covers it here, and only here. At Centro you pay… yourself." — eh… `[D]` forty thousand. **(15 s)**

**B7** `[X]` Centro? … Where is Centro? What is there? **(6 s)**

**A8** `[L]` `[X]` "Sending them across town. You should go to our… branch, on… — before…" `[D]` Calle 36. Before eight. **(15 s)**

**B9** `[F]` And what do I do tonight? **(4 s)**

**A10** `[L]` "Tonight. Put something cold on your face for ten minutes. Don't chew on that side." **(11 s)**

**B11** `[F]` OK. And when do I not wait? **(5 s)**

**A12** `[L]` "The sign for the hospital. If the pain goes to your ear, go to the emergency room tonight." **(11 s)**

**Qué pasó, línea por línea.**

1. **Por el lado de A, leer la ficha SÍ saca del paso — y saca de dos de los cuatro puntos del
   cierre.** Estas dos filas de `Say it here` de A son oraciones completas, en primera o segunda
   persona, sin una deixis que las voltee, y **dichas leídas funcionan y no delatan la ficha**.
   Literales, líneas 87 y 93 de `fase7-fichas-2-no-appointment-until-thursday.md`:

   > `The plan covers it here, and only here.`

   > `If the pain goes to your ear, go to the emergency room tonight.`

   La primera es **el punto 2 del cierre** («el mostrador dice el precio y quién lo paga») y la
   segunda es **la mitad del mostrador del punto 4**. Las dos se despachan en voz alta sin entender
   nada. Se le suman `Put something cold on your face for ten minutes.` y `Don't chew on that
   side.` (línea 92), que son las instrucciones de esta noche enteras, y `What happened?` (línea
   90), que es **la pregunta pivote del escenario**: el lector la lanza sin saber para qué sirve y
   **le funciona igual**, porque el que contesta es el otro.
2. **Lo que sí frena al lector son los números.** Las cuatro filas con dato —`The first opening
   is…`, `You should go to our… branch, on… — before…`, `At Centro you pay… yourself.`, `Come ten
   minutes early — there are…`— son troncos con puntos suspensivos y se quedan colgando (A2, A6,
   A8). Para cerrarlas hay que ir a `Facts`, **y eso es legítimo**: son tablas, y leer números en
   voz alta detrás de un mostrador es habla real. El arreglo del 21 de agosto —tronco donde había
   oración— funciona **exactamente donde hay cifra, y no donde no la hay**.
3. **Las líneas de prosa se voltean, como deben.** `You can't ask Dr. Restrepo anything before
   5:00`, `You have an appointment at 5:20 today…` y `You never ask Dr. Restrepo for favors` están
   en segunda persona sobre el jugador: leídas en voz alta delatan la ficha y no significan nada
   para B. **Cae, y ahí el texto final aguanta.**
4. **Por el lado de B el ataque rinde menos, pero no cero.** Cinco de sus nueve filas son oraciones
   enteras y utilizables sueltas (`Is there any other day?`, `What days do you have after eight
   thirty?`, `I don't have an appointment. Can you help me, please?`, `It's worse than yesterday.`,
   `I can wait here.` / `I don't work on Saturdays.`). Leídas **en el orden de la tabla** —que es
   alfabético por función desde la pasada del 21— salen al revés: pide otro día **antes** de decir
   que no tiene cita, y A tiene que reparar. Y las dos que llevan su dato propio están truncadas
   (`That's my sister's number. Mine is…`, `A piece of my tooth broke on Sunday, and…`), así que
   **su número y su motivo no se pueden leer: hay que decirlos**.

**Veredicto del lector:** por el lado de B no cierra —le faltan el número y el motivo, que son
suyos y están truncados—. **Por el lado de A cierra media conversación leyendo**, incluidos dos de
los cuatro puntos del cierre y la pregunta que da vuelta al escenario. Es el hallazgo más caro de
esta ronda y **no lo produce un perfil malo: lo produce una tabla bien escrita en el lado que más
prosa tiene que decir**.

---

## Diagnóstico

### D1 · Reparto de palabras — un solo contador, el declarado arriba

Medido con `node artifacts/habla-a2/fase11-scripts/carga-2.mjs` sobre este mismo archivo. **La
puerta 5 se juzga solo sobre las parejas de perfil parejo** (1 y 3).

| pareja | handicap | turnos A/B | palabras A | palabras B | reparto A/B | ¿puerta 5? |
|---|---|---|---|---|---|---|
| 1 · sólido + sólido | ninguno | 9/9 | **289** | **256** | **53,0 / 47,0** | **PASA** |
| 2 · sólido + flojo | A (mostrador) | 9/9 | 188 | 232 | 44,8 / 55,2 | no cuenta |
| 3 · flojo + flojo | los dos | 10/10 | **141** | **129** | **52,2 / 47,8** | **PASA** |
| 4 · el callado | A (mostrador) | 13/13 | 44 | 221 | 16,6 / 83,4 | no cuenta — se le mide otra cosa |
| 5 · el atajista | A (mostrador) | 8/8 | 217 | 205 | 51,4 / 48,6 | no cuenta |

Las dos parejas parejas pasan con margen, y pasan **por la misma razón**: el cierre reescrito el 21
de agosto le da al paciente tres de los cuatro puntos. En la ronda anterior este escenario medía
**86/14 en palabras con 50/50 en turnos**; el reparto por dueño lo arregló de verdad y aquí queda
demostrado sobre el texto final.

### D2 · El turno donde se muere

Solo se muere una: **la floja + floja, en el turno global 7**, catorce segundos de silencio justo
después de la carta. **No la mata el imposible del jueves: la mata la carta**, porque en este
escenario la carta no es una palanca que se recibe sino **una tarea con hora que exige dos datos
que solo salen hablando**. Cae en la pantalla de A, y si A es flojo no tiene con qué empezarla ni
B sabe que existe para ayudarle. Lo que los resucita es **una fila de `Facts` leída en voz alta**
—la del Centro, que es toda números y horas—, igual que en el escenario 1. Si esa fila no
existiera, la conversación se acaba ahí.

### D3 · El callado, y lo que sí es defecto

**Con el callado detrás del mostrador consigue su objetivo entero con 44 palabras** —fecha,
celular y algo para esta noche— y **cuatro de sus piezas exclusivas salen como `Yes/No` a preguntas
que trae la ficha del otro**: la sede, el precio del `emergency check`, el plan y la hora. La causa
tiene nombre y está en el reparto de información, no en el perfil: **la fila `before you leave` de
B le manda preguntar justo lo que A tiene que decir**, y su bloque 3 le manda preguntar cada
palabra del oficio. El mostrador mudo se deja llevar por el guion del paciente.

Lo que **no** consigue, y hay que apuntarlo a favor del escenario: el sábado del tratamiento, los
diez minutos de antes con `forms` y `X-ray`, la `referral note` y su condición, y **la mitad de la
carta** (le escribe a la doctora el motivo sin la fecha de vuelta). Y hay una pieza que sobrevive
al mutismo y no debería sorprender: **la pregunta pivote mide dos palabras**, `What happened?`, y
el callado la hizo. El pivote de este escenario no depende de la fluidez, y eso es un acierto del
diseño.

### D4 · Español

Tres puntos, y dos son el mismo: **decir por qué te importa a ti** (caja bloque 5) y **el hueco de
la carta** (bloque 8, que ningún flojo abre).

| dónde | qué se rompió |
|---|---|
| `A6` de la pareja 2 · `A6` de la 3 | **el turno de la carta.** Recibir una tarea y no tener con qué empezarla. `es que…`, `¿qué le pongo?` |
| `B5` de la pareja 3 | **el rechazo del jueves con su razón.** Tiene los dos números en `Facts` y no tiene el `because`: `pero es que no puedo` |
| `A10` de la pareja 3 | **glosar `emergency check`**, caja bloque 4, que la ficha de A le asigna explícitamente y ningún flojo abre: `una valoración` |

**El punto exacto que hay que dotar de andamiaje es el turno 6 de A**, el de después de la carta —y
no está en ninguna de las dos tablas de exponentes, porque no es una jugada del escenario sino el
arranque de una tarea.

### D5 · Minutos, contra los 6 declarados

| pareja | medido | turnos globales | vs. 6 min |
|---|---|---|---|
| 1 · sólido + sólido | **6:33** | 18 | +9 % |
| 2 · sólido + flojo | **7:37** | 18 | +27 % |
| 3 · flojo + flojo | **9:53** (2:15 de arranque en frío incluidos) | **20** | **+65 %** |
| 4 · el callado | **5:21** | **26** | −11 % |
| 5 · el atajista | **5:10** | 16 | −14 % |

Los 6 minutos **son honestos para la pareja sólida**, que es la referencia que fijó fase 4. La
floja se va al 65 % por dos cosas que no son conversación: **2:15 leyendo dos pantallas de 450
palabras antes de abrir la boca**, y los 26 s que tarda un flojo en leer tres veces una carta que
le pide dos datos. Y el callado enseña que los minutos engañan: dura **menos** tiempo con **ocho
turnos más** que el presupuesto.

### D6 · ¿Sabe la pareja que terminó?

Las cinco creen que sí, y **una se equivoca**. La pantalla común hace su trabajo en la 1, la 2 y
la 5. En la **3** los cuatro puntos salen porque los dos **leyeron el enunciado en voz alta y
contestaron a su propia lectura** (`[L]` en B15, A16, B17, A18): la pantalla de cierre está
disponible desde el turno 1 y es la única prosa del set que las dos partes pueden leer en voz alta
sin que se note. En la **4** se cierran los cuatro puntos y **falta la cita del tratamiento**: el
paciente se va con quince minutos hoy y con nada después, y **nadie lo echa en falta, porque el
punto 1 pide una cita y esa está dicha**.

### D7 · Lo que este escenario deja pasar, dicho aparte

1. **La `referral note` con el motivo exacto no se comprueba en voz alta.** Se escribe. La pareja 3
   mandó a alguien al Centro sin nota y el atajista mandó una nota que dice `pain in a lower
   molar`. Ninguna de las dos cosas la para nadie en la mesa.
2. **La carta cae en la pantalla del que manda, y una tarea se puede ignorar.** El atajista de A la
   miró cuatro segundos y siguió: cerró igual, por una salida legal, y el paciente nunca sabrá que
   existían quince minutos hoy a las 6:15.
3. **Dos de los cuatro puntos del cierre de A se despachan leyendo una línea de su tabla.**
   Nombradas y citadas en §L.
