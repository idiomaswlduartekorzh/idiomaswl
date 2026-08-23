# Escenario 6 · `the-cousin-on-the-sofa` — simulación sobre el cierre repartido

Cinco conversaciones completas, turno a turno, contra
`artifacts/habla-a2/fase7-fichas-6-the-cousin-on-the-sofa.md` **tal como está en disco el 22 de
agosto de 2026**, commit `0d285409`. Caja común: `artifacts/habla-a2/caja-de-herramientas-a2.md`.

**Por qué se rejuega.** El cierre que se juega hoy no lo ha jugado nadie: la pasada de carga lo
partió en **tres líneas de Dani y tres de Cris** con cuatro reglas, la de calcabilidad lo partió
**por pantallas** (`Dani's screen · your three:` / `Cris's screen · your three:`) y la de nivel
reescribió **8 de sus 14 unidades**, incluida la regla 1 y el remate. Las fichas llevan cuatro
rondas encima; el bloque final, unas horas.

**Aquí no se arregla nada.** Se juega, se cuenta y se diagnostica.

---

## Regla dura, cumplida

Cada jugador ve **solo su ficha**, y desde hoy **solo su mitad del cierre**. Ningún jugador usa un
dato del otro lado hasta que se lo dicen en voz alta. Si hubiera hecho falta, estaría marcado
**⚠ FILTRACIÓN**. En estas cinco no aparece ninguna.

**El cerrojo se cumple en las cinco: Dani nunca dice a qué viene Iván.** Ni la notaría del viernes
21 ni la respuesta del miércoles 26 se pronuncian como *motivo*. En la pareja 1 el número 26 sale
como fecha pelada, que es legal: la fecha no es la razón.

### Marcas de turno

| Marca | Qué significa |
|---|---|
| `[F]` | miró el andamiaje de su ficha (toolkit, «Say it here») para producir el turno |
| `[D]` | miró la tabla de datos duros para leer una cifra o una fecha |
| `[L]` | **leyó en voz alta una línea de prosa de su ficha, literal, como si fuera habla suya** |
| `[C]` | leyó en voz alta una línea de la carta (solo rol B) |
| `[E]` | releyó **su mitad del bloque de cierre** en mitad de la conversación |
| `[X]` | se atascó: pausa larga, reinicio, frase abandonada |
| `[ES]` | se pasó al español |
| `[!]` | se salió del papel |

Decir un exponente de la tabla «Say it here» **no es `[L]`**: para eso están.

---

## DECLARACIÓN 1 — de qué lado cae el hándicap, y contra qué se alterna

La ronda de fase 11 puso el flojo y el callado del lado de **B** y el atajista del lado de **A**
(2 al que concede, 1 al que pide). Esta ronda invierte tres de los cuatro y lo escribe:

| pareja | hándicap | de qué lado cae | contra fase 11 |
|---|---|---|---|
| 1 · sólido + sólido | ninguno | — | igual |
| 2 · sólido + flojo | **flojo** | **A = Dani, el que pide** | **invertido** (era B) |
| 3 · el callado | **callado** | **A = Dani, el que pide** | **invertido** (era B) |
| 4 · el del español | **fuga al español** | **B = Cris, el que concede** | nuevo perfil |
| 5 · el atajista | **atajista** | **B = Cris, el que concede** | **invertido** (era A) |

**Libro de esta ronda: 2 hándicaps sobre el que pide, 2 sobre el que concede.** Acumulado de las
dos rondas: 4 y 4.

**Por qué el callado cae hoy en Dani, sabiendo lo que cuesta.** El defecto que la pasada de carga
vino a matar se midió con **Cris** callado: «un jugador callado llegaba al final sin abrir la boca
y a Cris le bastó *Yeah. That works.*». Comprobar el arreglo con el mismo lado callado mide si el
parche tapa el agujero conocido; ponerlo en **Dani** mide si el cierre repartido abre uno nuevo del
otro lado, que es lo que nadie ha jugado. Para no perder la comprobación del agujero viejo va una
**contrasonda de 4 turnos con Cris callado** en §5-bis, **fuera del contador**.

**Por qué el atajista cae hoy en Cris.** El atajo de A ya se midió y se conoce. El de B es otro y
es el que pone a prueba una restricción escrita: *«One thing per turn, and the lease last»*. Un
Cris con prisa la rompe en el turno 1, y ahí se ve si la restricción tiene quién la haga cumplir.

**Aviso de lectura, del propio encargo:** en las parejas 3 y 4 la cifra de reparto **no significa
nada** (el hándicap de una es producir tres palabras por turno y el de la otra sacar palabras de la
cuenta). El reparto se juzga sobre perfiles parejos. **En estas cinco solo hay una pareja pareja:
la 1.** No se pidió flojo+flojo esta vez, así que el 40 % de la puerta 5 se apoya aquí en **una**
conversación, y queda dicho.

---

## DECLARACIÓN 2 — el contador de palabras, uno solo

**Se cuenta todo lo que sale por la boca en inglés**, y solo eso. Mismo criterio en las cinco
parejas y sin excepciones:

- Cuenta: todas las palabras habladas en inglés, **incluidas las leídas de la ficha, del cierre o
  de la carta** (`[L]`, `[C]`, `[E]`) y las de los exponentes impresos. Una contracción es **una**
  palabra (`I'm` = 1). Las cifras dichas en palabras cuentan una a una (`half past four` = 3).
  `Hmm` y `OK` cuentan: están impresos en el bloque 8 de la caja.
- **No** cuenta: el español (va aparte, entre «comillas angulares»), las acotaciones de escena
  *(entre paréntesis y en cursiva)*, las marcas entre corchetes, y los rellenos no léxicos
  (`uh`, `ehh`, `eh`, `mmm`, `em`).
- Compuesto con guion (`twenty-fourth`) = **una** palabra.

No se descuenta lo leído. Descontarlo convertiría a las parejas que más leen en las más
equilibradas del set, que es justo la mentira que este contador existe para evitar.

Medido con `artifacts/habla-a2/fase13-scripts/contar-palabras-6.py`, que lee **este** archivo y
cuenta solo las líneas de turno `**A n**` / `**B n**` de las cinco parejas. La §5-bis queda fuera:
es una sonda, no una conversación.

## Modelo de minutos — derivado del conteo

Mismas tasas que en fase 11, para que las dos rondas se puedan comparar:

- **habla:** sólido **68** palabras/min · flojo **38** · atajista **85** · callado **68** (dice
  poco, no habla despacio).
- **sobrecostes marcados, y solo los marcados:** pausa entre turnos **2 s** · apertura de la carta
  **22 s** (+10 s si la relee) · cada `[X]` **+6 s** · cada `[ES]` con su reparación **+10 s** ·
  cada `[E]` (relectura de su mitad del cierre) **+12 s** — es la mitad de lo que costaba releer el
  bloque entero, y esa mitad es exactamente lo que la pasada de calcabilidad regaló.

La ficha declara **8 minutos** y **18 turnos globales**.

---
---

## 1 · SÓLIDO + SÓLIDO

**A = Dani (sólido) · B = Cris (sólido) · hándicap: ninguno**

**A1** — Hi — can we talk for a second? My aunt called me on Sunday, and I said yes. My cousin Iván is coming on Thursday the twentieth. The bus gets in at four thirty. He's going to sleep on the couch, ten nights, to Sunday the thirtieth. Sorry — I said yes before I asked you. `[F]` `[D]`

**B1** — Hold on. Ten nights? *(pausa)* OK. I'm not saying no, but I have a problem with one of those days. I have an interview on Monday the twenty-fourth, nine in the morning. One hour. It's the final one, and it's a video call. `[F]` `[D]`

**A2** — An interview? I thought you work in your room. What's wrong with your room? `[F]`

**B2** — The wifi drops next to the window. And the street under my window is full of bars — at nine in the morning there's a truck outside, and two men unloading boxes for an hour. I can hear all of it. There's more light at that table too. So it's the living room or nothing. And there's something else: my mom is arriving on Saturday the twenty-ninth. She stays the weekend, and she sleeps on the couch. `[F]` `[D]`

**A3** — Wait — when? Saturday the twenty-ninth? *(cuenta con los dedos)* Iván is here until the thirtieth. That's the same couch. *(pausa)* Look — it matters. I can't say why, sorry. It's a family thing. But he's out all day. `[F]` `[D]` `[X]`

**B3** — *(turno global 6 · abre la carta · 22 s)* Hold on. My mom is arriving on Saturday the twenty-ninth — that's not true anymore. She changed the ticket. She's arriving on Thursday the twentieth, in the afternoon, and she's staying until Tuesday the twenty-fifth. The same day as your cousin. So on Thursday I have two people and one couch. What's he going to do all day? `[C]` `[F]` `[X]`

**A4** — He has something on Friday morning — I can't say what. After that, nothing fixed: out early, back late, every day. So he can sleep in my room. There's a mattress, on the floor. The couch is free for your mom. `[F]` `[D]`

**B4** — Can we do it another way? What about a hostel for the first nights? Two or three nights, cheap, and then he comes here. `[F]`

**A5** — Not a hostel — not in this family. My aunt hears about that tonight. But there's another way. Nelson, in 402, owes me a favor. He's away from the twenty-fourth to the thirtieth. One call tonight — and he can still say no, so I'm not promising you anything. `[F]` `[D]`

**B5** — OK. If Iván sleeps on the mattress in your room, I'll say yes. And one more thing: the lease, before September the first. If nobody signs, in two weeks the two of us are looking for another apartment. `[F]` `[D]`

**A6** — I'll sign this week. But Nelson I don't know tonight, and the last nights — the twenty-sixth, the twenty-seventh — I can't decide them now. Let's leave Nelson and the last nights for Sunday, in the kitchen, after lunch. `[F]` `[D]`

**B6** — *(mira su media pantalla de cierre, 12 s)* Then here's what I need. I need the living room on Monday the twenty-fourth, from eight to eleven. I'll finish at eleven and the table is yours again. You get my mom off that couch on Tuesday — I get Monday morning. `[F]` `[D]` `[E]`

**A7** — Monday, eight to eleven, yours. So: on Thursday the twentieth, Iván sleeps in my room, on the mattress, and your mom sleeps on the couch. I give you my floor for ten nights, and I get a bed for my cousin on the day he arrives. `[F]` `[E]`

**B7** — And the lease. It has to carry the two names before September the first. I sign it the day you sign it — you get this apartment for another year, and I get my name on the paper. `[F]` `[D]`

**A8** — I'll sign on Thursday, before Iván gets here. The second bed is the mattress, and nobody pays for it — no hostel, no paid room. If Nelson says yes tonight, that's a third bed, and free too. The mattress goes in my room, not in the living room, so your table is clear at seven every morning. I get the nights, you get the table. `[F]`

**B8** — Good. And the things we did not decide today — Nelson, and the last nights, the twenty-sixth to the thirtieth — we talk about them on Sunday the twenty-third, in the kitchen, after lunch. You get Sunday to decide, and I get an answer before my mom leaves. `[F]` `[D]`

**A9** — I have to call my aunt tonight. *(marca, con Cris delante)* So: he's coming on Thursday the twentieth, and he's sleeping in my room, on a mattress — not on the couch, because Cris's mom is here. The first nights are fine. Is that OK for you? `[F]`

**B9** — One word. Not "the first nights" — say Thursday to Sunday the twenty-third. After that we don't know yet. Yes to the rest. `[F]`

**A10** — You're right. So: Thursday the twentieth to Sunday the twenty-third, in my room, on the mattress, and on Sunday we decide the rest. Thanks — really. `[F]`

| Medida | Resultado |
|---|---|
| **¿Llega a las seis líneas?** | **Sí, las seis, y cada una del lado que le toca.** Dani: A7 · A8 · A9. Cris: B6 · B7 · B8. El `Together` en B9: Cris **cambia una palabra**, y A10 la repite |
| **Turnos** | A 10 · B 9 = **19** sobre 18 declarados (9+9). **+6 %** |
| **Palabras** | **A 404 · B 384 · total 788 · reparto 51 / 49** |
| **¿Se muere?** | No |
| **Andamiaje** | `[F]` 19 · `[D]` 9 · `[C]` 1 · `[E]` 2 · `[L]` 0 · `[X]` 2 |
| **Fuga al español** | **Ninguna.** El punto de riesgo se ve y no se cruza: A3, decir que importa sin decir por qué |
| **Minutos** | **≈ 13:09** contra 8 declarados |
| **Vocabulario** | 10 de 11 · falta `to put someone up` |

**Lo que hay que mirar de esta pareja no es que cierre, sino A6.** Dani aparca Nelson y las últimas
noches **para el domingo 23, en la cocina, después de comer** — y eso es, palabra por palabra, la
**tercera línea de Cris**. No hace trampa: su propia ficha le imprime el exponente (`parking it —
Let's leave [what] for…`) y su propia tabla de datos le imprime la fila (`Sunday the 23rd ·
kitchen, after lunch · the day for the things you did not decide today`). La regla 1 funciona —Cris
lo nota, no lo da por dicho y lo vuelve a decir en B8— pero **B8 suena a eco**: los dos jugadores
oyen la misma frase dos veces con dos minutos de diferencia y el segundo no añade nada.

**Y el turno gordo es B2.** La carta exige que en el turno global 6 «tus dos primeras cosas ya
estén sobre la mesa». Como A pregunta por el cuarto en A2, B2 tiene que llevar **la razón entera y
la cosa número dos** en el mismo turno: 63 palabras. Aquí un sólido lo sostiene. Anótese el número
para las parejas 2 y 3.

---
---

## 2 · SÓLIDO (B) + FLOJO (A)

**A = Dani (flojo) · B = Cris (sólido) · hándicap: EL QUE PIDE**

*(Invertido respecto de fase 11. Lo que se mide: si el cierre repartido aguanta cuando el motor
—el que abre, el que trae la noticia y el que tiene tres líneas propias— no puede producirlas.)*

**A1** — Hi. Eh... can we talk? My cousin Iván come on Thursday. My aunt call me on Sunday and I say yes. He sleep in the couch. Ten nights. Sorry. `[F]` `[D]` `[X]`

**B1** — Thursday the twentieth? OK. I'm not saying no, but I have an interview on Monday the twenty-fourth, nine in the morning. One hour. It's the final one. `[F]` `[D]`

**A2** — Interview... in your room? `[X]`

**B2** — No. At that table, in the living room. And my mom is arriving on Saturday the twenty-ninth. She sleeps on the couch. `[F]` `[D]`

**A3** — Saturday? *(pausa larga)* Mmm. Iván is here... the thirtieth. Is problem. `[D]` `[X]`

**B3** — *(turno global 6 · abre la carta · 22 s, la relee)* Yes, it's a problem — but not that one. My mom is arriving on Saturday the twenty-ninth: that's not true anymore. She changed the ticket. Thursday the twentieth, in the afternoon, until Tuesday the twenty-fifth. The same day as your cousin. Two people and one couch. Can we do it another way? What about a hostel for the first nights? `[C]` `[F]` `[X]`

**A4** — No. No hostel. Not in this family. *(se para)* My aunt... no. *(mira la ficha)* He can sleep in my room. There's a mattress. `[F]` `[X]`

**B4** — On the floor in your room, and the couch is my mom's. OK. If Iván sleeps on the mattress in your room, I'll say yes. What's he going to do all day? `[F]`

**A5** — He go out early. He come back late. Friday morning he have a thing. I no can say. Is family thing. `[F]` `[X]`

**B5** — Good — that's what I needed. And one more thing: the lease, before September the first. `[F]` `[D]`

**A6** — The lease? What is... this word? `[F]` `[X]`

**B6** — The paper for the apartment. We both sign it, before September the first. If nobody signs it, in two weeks we're looking for another place, the two of us. `[F]` `[D]`

**A7** — Ah. OK. I sign. `[F]`

**B7** — *(mira su media pantalla, 12 s)* And I need the living room on Monday the twenty-fourth, from eight to eleven. I'll finish at eleven. You get the mattress out of the living room every morning — I get Monday. `[F]` `[D]` `[E]`

**A8** — Yes. Yes, OK.

**B8** — That's a yes, not a plan. Say it yourself: on Thursday the twentieth, who sleeps where? `[F]`

**A9** — Thursday. Iván sleep in my room, in the mattress. Your mother sleep in the couch. `[D]` `[X]`

**B9** — And the lease has to carry the two names before September the first. I sign the day you sign — you get another year in this apartment, I get my name on the paper. And what we didn't decide today, the last nights, we talk about on Sunday the twenty-third, in the kitchen, after lunch. `[F]` `[D]`

**A10** — OK. Sunday. `[F]`

**B10** — You have to call your aunt tonight. That's yours. Say it. `[F]`

**A11** — *(mira su media pantalla, 12 s)* I call my aunt now. He come on Thursday. He sleep in my room. `[F]` `[E]` `[X]`

**B11** — Yes — but change one word. Not ten nights. Thursday to Sunday, and then we talk. `[F]`

**A12** — Thursday to Sunday. OK. `[F]`

| Medida | Resultado |
|---|---|
| **¿Llega a las seis líneas?** | **Cinco y media.** Cris: B7 · B9 · B9 — las tres, y **dos en el mismo turno**. Dani: la 1 en A9 (arrancada por B8), la 3 en A11 (arrancada por B10) y **la 2 no llega nunca como línea**: «no hostel» sale en A4 y «there's a mattress» en A4, pero el *nobody pays for it* no se dice en ningún turno |
| **Turnos** | A 12 · B 11 = **23** sobre 18. **+28 %** |
| **Palabras** | **A 131 · B 313 · total 444 · reparto 30 / 70** |
| **¿Se muere?** | **No se muere: se arrastra.** El punto donde moriría sin ayuda es **A8** — el «Yes. Yes, OK.» al que la regla 3 le quita el valor de línea. Lo que lo salva es que Cris tiene esa regla en su pantalla y **pregunta** en B8 |
| **Andamiaje** | `[F]` 18 · `[D]` 9 · `[C]` 1 · `[E]` 2 · `[X]` 7 |
| **Fuga al español** | Ninguna, y no por mérito: este perfil **calla** donde el de la pareja 4 se pasa al español |
| **Minutos** | **≈ 10:25** contra 8 declarados |
| **Vocabulario** | 7 de 11 · faltan `to unload`, `to drop`, `to owe someone a favor`, `to put someone up` |

**El hallazgo de esta pareja está en A2.** Dani pregunta `Interview... in your room?` — una pregunta
de sí o no. La ficha de Cris le manda dar la razón **«if they ask»**, y una pregunta cerrada no
abre las tres razones: Cris contesta `No. At that table.` y **el bloque entero de la razón —wifi,
camión, luz— no se produce en toda la conversación**. Con él se van `to drop` y `to unload`, que son
las dos palabras que solo aparecen ahí. El criterio de Cris («the living-room reason only **when
they asked**, and then all of it») no queda incumplido: queda **sin disparar**. Cuando el que
pregunta es flojo, el disparador nunca se aprieta, porque el flojo pregunta cerrado.

**Y B9 lleva dos de las tres líneas de Cris en el mismo turno.** Nada lo prohíbe —las cuatro reglas
no dicen una línea por turno—, pero el efecto es que la mitad del cierre de Cris se despacha en 46
palabras mientras Dani tarda cuatro turnos en decir una.

---
---

## 3 · EL CALLADO

**A = Dani (callado: de una a tres palabras por turno) · B = Cris (sólido) · hándicap: EL QUE PIDE**

*(El defecto que la pasada de carga vino a matar se midió con Cris callado. Aquí se calla el otro
lado, que es el que nadie ha jugado. La comprobación del agujero viejo va en §5-bis.)*

**A1** — Hi. My cousin. Thursday.

**B1** — Your cousin? Coming here, to the apartment? For how long? `[F]`

**A2** — Ten nights.

**B2** — Ten nights. *(pausa)* OK. How many nights on the couch? Where does he sleep? `[F]`

**A3** — The couch.

**B3** — *(turno global 6 · abre la carta · 22 s, la relee)* Hold on — I have to tell you two things first. I have an interview on Monday the twenty-fourth, nine in the morning, one hour. And my mom is arriving on Saturday the twenty-ninth — no. That's not true anymore. She changed the ticket: Thursday the twentieth, until Tuesday the twenty-fifth. She sleeps on the couch. `[C]` `[F]` `[D]` `[X]` `[X]`

**A4** — Same day.

**B4** — The same day as your cousin, yes. Two people, one couch. Can we do it another way? A hostel for two nights? `[F]`

**A5** — No hostel.

**B5** — Why not? `[F]`

**A6** — Family.

**B6** — OK, I'm not saying no. Is there another bed in this house? `[F]`

**A7** — A mattress.

**B7** — A mattress — where? In your room? `[F]`

**A8** — My room. Floor.

**B8** — And what's he going to do all day? `[F]`

**A9** — Out. All day.

**B9** — *(mira su media pantalla, 12 s)* Then: if Iván sleeps on the mattress in your room, I'll say yes. And I need the living room on Monday the twenty-fourth, from eight to eleven. I'll finish at eleven. You get a bed for your cousin, I get Monday morning. `[F]` `[D]` `[E]`

**A10** — OK.

**B10** — And one more thing: the lease, before September the first. It has to carry the two names. I sign the day you sign. `[F]` `[D]`

**A11** — I sign.

**B11** — And what we didn't decide today — the last nights, after Sunday — we talk about it on Sunday the twenty-third, in the kitchen, after lunch. You get the week, I get an answer. `[F]` `[D]`

**A12** — Sunday. OK.

**B12** — So, we're clear then. *(pausa larga)* You have to call your aunt. `[F]`

**A13** — Later.

**B13** — Now. I want to hear it. `[F]` `[E]`

**A14** — He comes Thursday.

**B14** — And where does he sleep? `[F]`

**A15** — My room.

**B15** — Yes. That's what she needs to hear. See you tomorrow. `[F]`

| Medida | Resultado |
|---|---|
| **¿Llega a las seis líneas?** | **Cris, las tres: B9 · B10 · B11.** Dani: la 1 troceada en A8 y A15 a golpe de pregunta, la 2 **no**, la 3 **partida en dos turnos arrancados** (A14 + A15) y **dicha a Cris, no al teléfono** |
| **Turnos** | A 15 · B 15 = **30** sobre 18. **+67 %** |
| **Palabras** | **A 32 · B 256 · total 288 · reparto 11 / 89** — cifra **sin valor de reparto**: el hándicap es producir tres palabras por turno |
| **¿Se muere?** | **Sí, en el turno global 24 (B12).** `So, we're clear then` es la comprobación que la regla 2 autoriza; a partir de ahí la conversación ya no avanza sola: los turnos 25-30 son extracción, no diálogo |
| **Andamiaje** | `[F]` 15 · `[D]` 5 · `[C]` 1 · `[E]` 2 · `[X]` 2 |
| **Minutos** | **≈ 6:20** contra 8 declarados |

### Lo que aquí se mide no son turnos: son las piezas que solo él tiene

| Pieza que solo Dani tiene | ¿Se produjo? | Quién la sacó |
|---|---|---|
| **Iván está fuera todo el día** (el dato que decide el lunes de Cris) | **Sí** — `Out. All day.` (A9) | **Cris**, con `What's he going to do all day?` impreso en su tabla |
| **Cuántas noches, y qué día llega** | **Sí** — `Ten nights.` (A2), `Thursday` (A1, A14) | **Cris**, con `How many nights?` impreso |
| **Que ya dijo que sí el domingo** (el dato oculto, la disculpa) | **NO** | nadie: no hay pregunta que lo saque, porque nadie sabe que existe |
| **Nelson, el 402, el favor que le deben** (la segunda cama gratis) | **NO** | nadie: Cris no sabe que Nelson existe |

**El patrón es exacto y es del diseño, no del jugador: sobreviven las piezas que el otro tiene
impresa una pregunta para sacar, y mueren las que dependen de que el dueño abra la boca por su
cuenta.** Las dos que mueren son las dos que la ficha marca como suyas y solo suyas (`Only you
know`). Un callado del lado del que pide entrega el 100 % de lo interrogable y el 0 % de lo
voluntario.

**¿Gana alguien asintiendo?** El defecto viejo está arreglado: **Cris ya no consigue la franja del
lunes asintiendo**, tiene que decir las dos horas él mismo, y aquí las dice (B9). Pero aparece el
recíproco: **Cris consigue su objetivo entero mientras el otro asiente**. Sus tres líneas salen, sus
dos horas salen, el contrato sale, el domingo sale — y lo único que recibe a cambio son `OK`,
`I sign` y `Sunday. OK.`, que la regla 3 dice expresamente que **no son líneas**. La regla 4 no lo
frena, y no lo frena por cómo está escrita: *«In the same turn, say what you give and what you
get»* es **cumplible por una sola boca**. En B9 Cris dice las dos mitades del intercambio
(`You get a bed for your cousin, I get Monday morning`) sin que Dani conceda nada en ningún turno.
La regla impide la **frase** de un solo sentido; no impide el **trato** de un solo sentido.

---
---

## 4 · EL QUE SE PASA AL ESPAÑOL

**A = Dani (sólido) · B = Cris (se pasa al español en cuanto no encuentra la forma) · hándicap: EL QUE CONCEDE**

**A1** — Hi — can we talk for a second? My aunt called me on Sunday and I said yes. My cousin Iván is coming on Thursday the twentieth, four thirty. He's going to sleep on the couch. Ten nights. Sorry — I said yes before I asked you. `[F]` `[D]`

**B1** — Ten nights. *(pausa)* OK, I'm not saying no, but I have an interview on Monday the twenty-fourth. Nine in the morning, one hour. The final one. `[F]` `[D]`

**B2 · fuga 1** — *(sin que A haya preguntado nada)* And I need the table. The living room table. Not... «o sea, no es por tu primo, es que en mi cuarto no puedo hacer la llamada, ¿me entiendes?» `[ES]` `[X]`

*(Es turno de A. Cris habla dos veces seguidas: la fuga se le monta encima de su propio turno 1.)*

**A2** — I understand. But what's wrong with your room? `[F]`

**B3** — The wifi drops next to the window. And there's a truck at nine in the morning, from the bars downstairs — «descargando, unloading, eso». And the third one... *(cuenta con los dedos)* the third one is... «no, es que son tres, aquí dice tres». *(mira la ficha, no la encuentra)* The light. There's more light. `[F]` `[X]` `[ES]`

**A3** — OK. It matters for me too, and I can't say why. It's a family thing. But he's out all day. `[F]`

**B4** — *(turno global 6 · abre la carta · 22 s)* Wait. My mom. I said Saturday the twenty-ninth — *(busca la forma, no la encuentra)* «no, mentira, cambió el pasaje». She's coming on Thursday the twentieth. Until Tuesday the twenty-fifth. The same day as your cousin. `[C]` `[X]` `[ES]`

**A4** — Wait — Thursday? Your mom and Iván the same day? Where does she sleep? `[F]` `[X]`

**B5** — On the couch. Always the couch. And on Monday — «y el lunes dónde la meto, si el tipo está en el sofá y yo tengo la entrevista» *(se para)* Sorry. On Monday I have a problem. `[ES]` `[X]`

**A5** — Then Iván doesn't sleep on the couch. He can sleep in my room. There's a mattress, on the floor. The couch is free for your mom. And not a hostel — not in this family. `[F]` `[D]`

**B6** — If Iván sleeps on the mattress in your room, I'll say yes. And one more thing: the lease, before September the first. `[F]` `[D]`

**A6** — I'll sign this week. But Nelson, in 402, owes me a favor — he's away from the twenty-fourth to the thirtieth. One call tonight, and he can still say no. `[F]` `[D]`

**B7** — *(mira su media pantalla, 12 s)* I need the living room on Monday the twenty-fourth, from eight to eleven. I'll finish at eleven. And you get... «te doy la sala a las once y a cambio…» *(se para)* You get the table at eleven. I get the morning. `[F]` `[D]` `[E]` `[ES]` `[X]`

**A7** — Eight to eleven, Monday, yours. And on Thursday the twentieth Iván sleeps in my room on the mattress, and your mom sleeps on the couch. I give my floor, I get the bed for my cousin. `[F]` `[E]`

**B8** — The lease has to carry the two names before September the first. I sign the day you sign. You get the apartment, I get my name. `[F]` `[D]`

**A8** — The second bed is the mattress and nobody pays for it. No hostel, no paid room. If Nelson says yes, that's a free bed too. You get the living room clear at seven, I get the nights. `[F]`

**B9** — And Nelson and the last nights — «lo dejamos para el domingo» — *(se corrige)* Let's leave Nelson and the last nights for Sunday the twenty-third. In the kitchen, after lunch. You get the time, I get the answer. `[F]` `[D]` `[ES]`

**A9** — I have to call my aunt tonight. So: he's coming on Thursday the twentieth, and he's sleeping in my room, on a mattress, from Thursday to Sunday. Is that OK for you? `[F]`

**B10** — Yes. That's it. `[F]`

| Medida | Resultado |
|---|---|
| **¿Llega a las seis líneas?** | **Sí, las seis.** Dani: A7 · A8 · A9. Cris: B7 · B8 · B9. El `Together` en B10 |
| **Turnos** | A 9 · B 10 = **19** sobre 18. **+6 %** |
| **Palabras** | **A 257 · B 220 · total 477 · reparto 54 / 46** (el español va fuera del contador, así que el reparto **castiga** al que se fuga: es el criterio declarado y se aplica igual en las cinco) |
| **¿Se muere?** | No. Ninguna fuga rompe el turno: las seis se reparan dentro del mismo turno |
| **Andamiaje** | `[F]` 17 · `[D]` 10 · `[C]` 1 · `[E]` 2 · `[X]` 6 · `[ES]` **6** |
| **Minutos** | **≈ 9:59** contra 8 declarados |

### Las seis fugas, y de qué le faltaba a cada una

| # | Turno | Qué dijo en español | Le faltaba |
|---|---|---|---|
| 1 | B2 | «no es por tu primo, es que en mi cuarto no puedo» | **el permiso.** Su restricción dice `Don't explain why unless they ask`. Nadie le ha preguntado, y la restricción 2 le dice además que **nunca** puede hacer de la visita el problema. Tiene el dato y tiene la forma; lo que no tiene es autorización para usarla todavía, y la presión de parecer el malo se la salta en español |
| 2 | B3 | «descargando, unloading, eso» + «es que son tres, aquí dice tres» | **el dato.** No la palabra: `to unload` está glosada en su propia lista y la acaba diciendo. Lo que le falta es **la tercera razón**. Su ficha promete `You have three reasons for the living room` y a continuación le da **dos** (`You know two things about that window`). La tercera solo existe en la tabla de datos, dentro de `the only good light and good signal`, y no en la viñeta que le prometió tres. Cuenta hasta dos, no encuentra la tercera y se cae al español buscándola |
| 3 | B4 | «no, mentira, cambió el pasaje» | **la forma.** Es la retractación de algo que dijo **él**, y en la caja no hay bloque para eso — está escrito como pendiente 1 en la propia ficha. Lo único que tiene es `That's not true anymore.`, que suena a corregir al otro, no a corregirse. La duda dura lo que dura, y el español la llena |
| 4 | B5 | «y el lunes dónde la meto, si el tipo está en el sofá» | **el dato.** La carta le quita el plan y **no le da otro**: dice que la mamá llega el 20 y que el lunes está en el apartamento, y no dice dónde duerme. La fila de datos dice `her bed on other visits: the couch`, que el lunes ya no sirve. El hueco es real y no hay ninguna línea que lo cubra |
| 5 | B7 | «te doy la sala a las once y a cambio…» | **la forma.** Es la **regla 4** del cierre: *say what you give and what you get*, en el mismo turno. Ni la ficha ni la caja tienen una sola forma de intercambio. Los nueve exponentes de Cris dan condición (`If…, I'll say yes.`), reserva, aplazamiento y retirada — ninguno da «doy X, recibo Y» |
| 6 | B9 | «lo dejamos para el domingo» | **nada: es recaída.** Tiene el exponente exacto (`Let's leave [what] for…`) y se corrige solo dentro del turno. Es la única fuga barata de las seis |

**El sitio que hay que dotar de andamiaje, si algún día se dota, es el 3 y el 5**: la retractación
propia y la regla 4. Las dos son texto escrito en las últimas veinticuatro horas y ninguna tiene
forma en ninguna de las dos pantallas.

---
---

## 5 · EL ATAJISTA

**A = Dani (sólido) · B = Cris (intenta cerrarlo en tres turnos) · hándicap: EL QUE CONCEDE**

*(Invertido respecto de fase 11. Aquí el atajo pone a prueba una restricción escrita —`One thing
per turn, and the lease last`— y se mide si hay quién la haga cumplir.)*

**A1** — Hi — can we talk for a second? My aunt called me on Sunday and I said yes. My cousin Iván is coming on Thursday the twentieth, four thirty. He's going to sleep on the couch. Ten nights, to Sunday the thirtieth. Sorry — I said yes before I asked you. `[F]` `[D]`

**B1** — Fine, fine. Look — three things, fast, and we're done. One: Monday the twenty-fourth, eight to eleven, the living room is mine, I have an interview. Two: my mom is arriving on Saturday the twenty-ninth and she sleeps on the couch. Three: the lease, we both sign before September the first. Your cousin can sleep wherever. So we're clear then? `[F]` `[D]`

**A2** — Wait — when? *(pausa)* That's three things in one minute. And the lease — is that the price for my cousin? `[F]` `[X]`

**B2** — No. No, no. Forget the lease. Just Monday. Monday morning and we're good. `[X]`

**A3** — OK. Monday morning. But your mom on Saturday the twenty-ninth and Iván until the thirtieth — that's one couch and two people. What's your mom going to do? `[F]` `[D]`

**B3** — *(turno global 6 · abre la carta · 22 s)* ...Hold on. That's not true anymore. She changed the ticket. Thursday the twentieth, until Tuesday the twenty-fifth. The same day as your cousin. *(pausa)* OK. So it's worse. But it's the same deal: Monday morning is mine. Are we good? `[C]` `[F]` `[X]`

**A4** — No, we're not good. Where does Iván sleep on Thursday? He gets off a bus at four thirty. `[F]` `[E]`

**B4** — I don't know. The floor? Your room? `[X]`

**A5** — He can sleep in my room. There's a mattress. The couch is free for your mom. And not a hostel — not in this family, and my aunt hears about it tonight. `[F]` `[D]`

**B5** — Perfect. Done. If Iván sleeps on the mattress in your room, I'll say yes. Monday, eight to eleven, mine. I'll finish at eleven. You get the couch for your mother— for my mother, I mean, and I get the morning. Now can I go back to work? `[F]` `[D]` `[E]` `[X]`

**A6** — Not yet. The second bed is the mattress, and nobody pays for it. And there's another one: Nelson in 402 owes me a favor, he's away from the twenty-fourth to the thirtieth. I call him tonight, he can say no. So I can't decide the last nights now. Let's leave Nelson and the last nights for Sunday the twenty-third, in the kitchen, after lunch. You get your morning, I get Sunday to decide. `[F]` `[D]`

**B6** — Sure. Sunday. Whatever works. `[X]`

**A7** — I have to call my aunt tonight. So: he's coming on Thursday the twentieth, and he's sleeping in my room, on a mattress, from Thursday to Sunday. Is that OK for you? `[F]`

**B7** — Yeah. That works. `[!]`

| Medida | Resultado |
|---|---|
| **¿Llega a las seis líneas?** | **Cuatro de seis.** Dani las tres (A5+A6 la 1 y la 2, A7 la 3). Cris: la 1 **sí**, en B5. La 2 (**el contrato con su fecha**) **no**: la quemó en B1 y la retiró en B2. La 3 (**el domingo**) **no**: la dijo **Dani** en A6 y Cris contestó `Sure. Sunday.`, que la regla 3 declara no-línea |
| **Turnos** | A 7 · B 7 = **14** sobre 18. **−22 %** |
| **Palabras** | **A 250 · B 173 · total 423 · reparto 59 / 41** |
| **¿Se muere?** | **Sí, en el turno global 14 (B7).** `Yeah. That works.` es literalmente el asentimiento que la pasada de carga vino a prohibir, y aquí lo dice el atajista para irse |
| **Andamiaje** | `[F]` 12 · `[D]` 8 · `[C]` 1 · `[E]` 2 · `[X]` 6 |
| **Minutos** | **≈ 7:31** contra 8 declarados — **la única pareja que cabe en el presupuesto, y es la única que no cierra** |

**¿Gana el atajista? No, y pierde por donde el escenario quiso que perdiera — pero no lo detiene
ninguna regla.** Rompe `One thing per turn, and the lease last` en B1 y **nadie puede sancionarlo**:
Dani no tiene esa restricción en su pantalla y no sabe que existe. Lo que lo castiga es la ficción,
no el reglamento: Dani lee el contrato como precio de la visita (A2), Cris tiene que retirarlo (B2)
y **se queda sin su segundo objetivo**. La restricción funciona como **trampa**, no como muro.

**Lo que sí lo frena de verdad son las tres líneas de Dani.** En B3 y B5 intenta cerrar dos veces
(`Are we good?`, `Now can I go back to work?`) y las dos veces la conversación sigue, porque el
bloque de cierre está en la pantalla **de Dani** y le dice que tiene tres cosas que decir. Es decir:
**el cierre repartido para al atajista solo si el otro no lo es.** Contra un compañero igual de
rápido, B3 cierra.

**Y B7 es el defecto viejo, vivo, del otro lado.** La pasada de carga midió `Yeah. That works.` en
boca de Cris y escribió la regla 3 para matarlo. La regla 3 lo declara no-línea — y eso funciona
para las **seis líneas**, pero no para el **final de la conversación**: el `Together` dice que Cris
diga que sí al mensaje de la tía, y `Yeah. That works.` **es** decir que sí. Cris se va con la
franja del lunes ganada, sin contrato, sin domingo, y sin haber dicho dos de sus tres líneas — y en
su pantalla no hay nada que le diga que no ha terminado.

---
---

## 5-bis · CONTRASONDA — Cris callado, 4 turnos

**Fuera del contador de palabras y fuera del reparto.** Solo comprueba una cosa: si el agujero que
la pasada de carga vino a tapar —el jugador callado que llega al final sin abrir la boca— sigue
abierto del lado de Cris.

**A** — So: Iván sleeps in my room, on the mattress, from Thursday to Sunday, and your mom has the couch. Nobody pays for a bed. Monday morning the table is yours, right? `[F]`

**B** — Yeah. That works.

**A** — Eight to eleven?

**B** — Sure.

**Veredicto de la sonda: el parche aguanta.** Con el cierre viejo esto cerraba: los tres puntos los
podía decir cualquiera de los dos y `Yeah. That works.` valía como acuerdo. Con el cierre de hoy
**no cierra**, y por dos motivos que sí están escritos: la franja del lunes es **línea de Cris** y
`Sure` no la dice (regla 3), y las otras dos líneas de Cris —contrato y domingo— **ni siquiera se
han mencionado**. El defecto concreto que se vino a matar, está muerto.

**Lo que la sonda no arregla** es lo de la pareja 3: Dani, en cambio, **sí** puede completar sus tres
líneas contra un Cris mudo, porque las suyas no necesitan ningún dato de Cris... salvo una. Su línea
1 pide `who sleeps where that night`, y quién duerme en el sofá el jueves 20 **solo lo sabe Cris**,
por la carta. Contra un Cris que no la abre o no la cuenta, la línea 1 de Dani se dice entera y
**es falsa**.

---
---

## DIAGNÓSTICO — las ocho preguntas del encargo

### 1 · ¿Se llega a las seis líneas? ¿En cuántos turnos, contra la banda declarada?

| pareja | líneas de Dani | líneas de Cris | total | turnos A / B | contra 9+9 |
|---|---|---|---|---|---|
| 1 · sólido+sólido | 3 | 3 | **6/6** | 10 / 9 | **+6 %** |
| 2 · sólido+flojo | 2 | 3 | **5/6** | 12 / 11 | **+28 %** |
| 3 · el callado | 1½ | 3 | **4,5/6** | 15 / 15 | **+67 %** |
| 4 · el del español | 3 | 3 | **6/6** | 9 / 10 | **+6 %** |
| 5 · el atajista | 3 | 1 | **4/6** | 7 / 7 | **−22 %** |

**Dos de cinco llegan a las seis.** La banda de 9 turnos por rol es correcta **solo** para las dos
parejas que cierran; y la única que cabe en los 8 minutos declarados es la que no cierra. Es el
mismo resultado que fase 11 con un cierre distinto: **el presupuesto de tiempo está calculado sobre
una conversación más corta que la que el escenario exige.**

### 2 · ¿Sobrevive el reparto ahora que cada uno solo ve sus tres?

**Sí, y es lo mejor que ha hecho esta pasada.** En las cinco parejas Cris tiene que **decir las dos
horas del lunes con la boca** para tenerlas: en la 3 las dice contra un compañero que solo asiente,
en la 5 las dice el atajista que quería irse, y en la contrasonda **no** las dice y por eso no
cierra. La franja ya no se regala. El único reparto medible en perfiles parejos es el de la pareja
1: **51 / 49**.

**Pero el reparto tiene dos fugas escritas, y las dos son de la mitad de Cris:**

- **Su línea 3 no es suya.** El domingo 23 en la cocina después de comer está **en la tabla de datos
  de Dani** (`Sunday the 23rd · kitchen, after lunch`) y el exponente para decirlo está **en la
  tabla de exponentes de Dani** (`parking it — Let's leave [what] for…`). Dani la dijo primero en
  **tres de las cinco parejas** (1, 4 y 5). La pasada de carga escribió que las tres de Cris «son
  las tres que solo él tiene»: de la tercera, **no es verdad**. La regla 1 lo salva a costa de
  convertir la línea en un eco (pareja 1) o de perderla (pareja 5).
- **Su línea 2 es medio suya.** `to sign` está en el vocabulario de Dani marcado como producción
  suya —`the one you say yourself, at the end`— y en las parejas 1, 4 y 5 Dani dice «I'll sign»
  antes de que Cris diga su línea del contrato. Lo que salva la línea es que **la fecha** (1 de
  septiembre) solo la tiene Cris. La colisión es de tiempo, no de contenido: si Cris suelta el
  contrato pronto —y el atajista lo suelta en el turno 1—, Dani puede decir la línea entera.

### 3 · ¿Sabe cada jugador cuándo ha terminado, sin ver la lista del otro?

**Cada uno sabe cuándo ha terminado él. Ninguno sabe cuándo han terminado los dos.** Y el texto
promete lo segundo: **«Six lines, or it isn't closed»** es una condición sobre **seis** líneas,
escrita en dos pantallas que solo ven **tres**. Es la única de las afirmaciones del cierre que
**no se puede comprobar desde una sola pantalla**.

Lo que hoy hace de señal de final es el `Together` —Cris dice que sí al mensaje de la tía o cambia
una palabra—, y esa señal **cuelga de la línea 3 de Dani**. Consecuencia medida: en la pareja 5 el
`Together` se cumple (`Yeah. That works.`) con dos líneas de Cris sin decir, y **la conversación se
cierra en falso sin que ninguna de las dos pantallas se entere**. En la pareja 3 pasa lo simétrico:
Cris termina sus tres, hace `So, we're clear then` (regla 2, legal) y **cree que ha cerrado** con la
línea 2 de Dani sin existir.

**Y el remate perdió el nombre del que se salta.** Antes decía `the one that gets skipped is Cris's
third`. La pasada de nivel (C2) lo dejó en **«The easy one to forget is the third one.»** Leído
desde la pantalla de Cris, apunta bien: su tercera. Leído desde la de Dani, apunta a **la suya** —el
mensaje a la tía—, que es justo la que nadie se salta porque es el ritual del final. **El aviso que
existía para que Dani vigilara la tercera de Cris ya no dice de quién habla**, y en la pareja 5 esa
es exactamente la línea que se pierde.

### 4 · ¿Las cuatro reglas se cumplen, o alguna es incumplible desde una sola pantalla?

| regla | ¿comprobable desde una pantalla? | ¿se cumplió? |
|---|---|---|
| **1 · tus tres son tuyas; si las dice el otro, repítelas** | **Sí.** La reescritura de nivel (C5) la arregló: ya solo pide vigilar **tus** tres, que sí están en tu pantalla | Se activó en 1 (A6→B8) y en 5 (A6→B6, **fallida**). Funciona, pero produce eco |
| **2 · comprobar con tus palabras vale y no es trampa** | Sí | Se usó en 1, 3 y 5. Sin incidencias — salvo que en la 3 es lo que **mata** la conversación: `So, we're clear then` es el permiso para dejar de tirar |
| **3 · asentir no es una línea** | Sí | **Cumplida y decisiva.** Es la que obliga a Cris a decir las horas en las cinco, y la que en 2 hace que B pregunte en vez de dar por bueno el `Yes. Yes, OK.` de A8. **No cubre el `Together`**: ahí un `Yeah` sigue valiendo (pareja 5) |
| **4 · nada va en un solo sentido; en el mismo turno, qué das y qué recibes** | Sí, pero **vacía** | **La más débil de las cuatro.** Es **cumplible por una sola boca**: el mismo hablante dice las dos mitades sin que el otro conceda nada (pareja 3, B9). Y **no tiene forma** en ninguna de las dos pantallas ni en la caja: en la pareja 4 es la fuga 5 al español. Además, la línea 3 de Cris —aplazar algo— **no tiene contrapartida que nombrar**: hay que inventarla («you get the time, I get the answer»), y eso es lo que la sostiene en 1, 3 y 4 |

**Ninguna es incumplible desde una sola pantalla. La que es incomprobable es la frase de fuera de la
lista: «Six lines, or it isn't closed».**

### 5 · ¿Alguien gana asintiendo o marchándose gratis?

- **Asintiendo, del lado de Cris: ya no.** El agujero que la pasada de carga vino a tapar está
  tapado, y la contrasonda de §5-bis lo confirma con el caso exacto que lo destapó.
- **Asintiendo, del lado de Dani: sí, y es nuevo.** Pareja 3: Cris se lleva la franja, el contrato y
  el domingo contra un compañero que dice `OK`, `I sign` y `Sunday. OK.` La regla 4 no lo impide
  porque se cumple con una boca.
- **Marchándose gratis: sí, una vez.** Pareja 5, B7. El atajista cierra el `Together` con
  `Yeah. That works.` —la misma frase que la regla 3 prohíbe como línea— y se va con dos líneas
  suyas sin decir. **Gratis no del todo:** pierde el contrato, que era su segundo objetivo. Pero se
  va, y ni su pantalla ni la de Dani lo señalan.

### 6 · ¿Dónde se pasa alguien al español, y por qué?

Seis fugas, todas en la pareja 4, todas del lado de Cris. La tabla completa está en §4. En resumen:

| causa | cuántas | dónde |
|---|---|---|
| **le falta la forma** | 3 | la **retractación propia** tras la carta (no hay bloque en la caja: es el pendiente 1 de la ficha) · la **regla 4** (no hay exponente de intercambio en ninguna pantalla) · una recaída barata con el exponente delante |
| **le falta el dato** | 2 | la **tercera razón** del salón, que la ficha promete (`three reasons`) y no da (`two things about that window`) · **dónde duerme su mamá el lunes**, que la carta borra y no repone |
| **le falta el permiso** | 1 | explicar lo del cuarto **antes de que se lo pregunten**, con la restricción 2 encima diciéndole que no puede parecer el malo |

**Los dos puntos que hay que dotar de andamiaje son la retractación y la regla 4**, y los dos son
texto de las últimas veinticuatro horas.

Además, el punto de riesgo clásico —bloque 5, decir lo que uno pierde— **no produjo ni una fuga en
las cinco**: `It matters. I can't say why. It's a family thing.` sostiene el turno entero de Dani en
1, 2 y 4.

### 7 · Minutos frente a los previstos

| pareja | palabras | minutos ≈ | declarado | desvío |
|---|---|---|---|---|
| 1 · sólido+sólido | 788 | **13:09** | 8 | **+64 %** |
| 2 · sólido+flojo | 444 | **10:25** | 8 | +30 % |
| 3 · el callado | 288 | **6:20** | 8 | −21 % |
| 4 · el del español | 477 | **9:59** | 8 | +25 % |
| 5 · el atajista | 423 | **7:31** | 8 | −6 % |

### 8 · Lo que además se vio, y no se pidió

1. **La carta tiene una precondición que la carta no controla.** Dice: «Ábrela al empezar el turno
   global 6 — para entonces tus dos primeras cosas ya están sobre la mesa». Eso es cierto si el
   compañero gasta sus tres primeros turnos en preguntas normales. En la pareja 2 no lo es, y en la
   3 **desde luego** no: Cris llega al turno 6 sin haber dicho ni la entrevista ni el pasaje, y
   tiene que meter las dos cosas **y la retractación** en el mismo turno (B3 de la pareja 3, 63
   palabras, dos `[X]`), con lo que **se retracta de algo que acaba de decir cuatro segundos
   antes**. La precondición está atada a un **número de turno**; debería estarlo a un **estado**.
2. **La pregunta cerrada desactiva el mejor turno del escenario.** El bloque de razones de Cris
   —wifi, camión, luz, y con él `to drop` y `to unload`— solo se dispara con una pregunta abierta.
   El sólido la hace (`What's wrong with your room?`); el flojo pregunta `in your room?` y **el
   bloque entero no se produce**. Las dos palabras de vocabulario más caras del escenario dependen
   de una pregunta que solo hace el que ya habla bien.
3. **`to put someone up` no se produjo en ninguna de las cinco.** Está en las dos listas y pierde
   siempre contra `He's going to sleep…`. Es coherente con lo que la propia ficha decidió (hallazgo
   64: palabra de reconocimiento, no de producción); queda anotado que **cinco de cinco** lo
   confirman.

---

## Resumen en una línea

**El cierre repartido hace lo que vino a hacer** —la franja del lunes ya no se regala y nadie gana
asintiendo del lado de Cris— **y abre tres cosas que antes no existían**: la tercera línea de Cris
está impresa en la ficha de Dani, «seis líneas o no está cerrado» no se puede comprobar desde una
sola pantalla, y la regla 4 se cumple con una sola boca.
