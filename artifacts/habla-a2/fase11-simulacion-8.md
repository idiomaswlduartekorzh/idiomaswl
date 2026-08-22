# Escenario 8 · `cancel-the-gym-i-am-leaving` — simulación sobre el texto FINAL

Cinco parejas completas turno a turno, más dos partidas de control, contra
`artifacts/habla-a2/fase7-fichas-8-cancel-the-gym-i-am-leaving.md` **tal como está en disco el 22
de agosto de 2026**: el que lleva `B = Mauricio` (pasada de género del 21 ago), la fila de
exponentes `offering a way`, el objetivo de Mauricio que nombra la vía, y **la pasada quirúrgica
de fase 9** (las nueve líneas de calcabilidad y las doce de nivel).
Caja común: `artifacts/habla-a2/caja-de-herramientas-a2.md`.
Motor: `artifacts/habla-a2/fase4-escenarios-7-8.md` §8. **El motor no se toca aquí.**

**Aquí no se arregla nada.** Se juega, se cuenta y se diagnostica.

---

## Regla dura, cumplida

Cada jugador ve **solo su ficha**. Ningún jugador usa un dato del otro lado hasta que se lo dicen
en voz alta. Si hubiera hecho falta, estaría marcado **⚠ FILTRACIÓN**. En las cinco parejas y en
las dos partidas de control: **cero filtraciones**.

Dos cerrojos del escenario, comprobados uno a uno en las siete partidas:

- **Mauricio nunca pregunta el destino.** Pregunta la fecha de vuelta y pide una razón. En ningún
  turno sale «where are you going». Tatiana tampoco lo dice: nombra el aeropuerto de salida
  (Bucaramanga, que es dato suyo) y nada más.
- **La carta se abre al terminar el turno global 3 y solo en la pantalla de Mauricio.** Arranca
  Tatiana, así que el 3 es el segundo de ella y él la juega en el turno 4, que es su segundo.
  Tatiana no la ve nunca en ninguna partida.

### Marcas de turno

| Marca | Qué significa |
|---|---|
| `[F]` | miró el andamiaje de su ficha (caja, «Say it here») para producir el turno |
| `[D]` | miró la tabla de datos duros para leer una cifra o una fecha |
| `[L]` | **leyó en voz alta una línea de prosa de su ficha, literal, como si fuera habla suya** |
| `[C]` | leyó en voz alta una línea de la carta de Édison (solo Mauricio) |
| `[X]` | se atascó: pausa larga, reinicio, frase abandonada |
| `[ES]` | se pasó al español |
| `[!]` | se salió del papel: rompió una restricción o habló de meta |

Decir un exponente de «Say it here» **no es `[L]`**: para eso están. `[L]` es solo prosa de ficha
—cabecera, `Where you are`, `You want`, `You can't`, `Only you know`, `If you walk away`,
criterios de éxito— dicha tal cual.

### Perfiles

El A2 **sólido** falla en tercera persona, preposición y pregunta sin auxiliar. El A2 **flojo**
produce `I no can`, `she no have`, verbo sin conjugar, presente por pasado y frases a medias. El
**callado** contesta con una a tres palabras y nunca ofrece nada. El **atajista** habla más suelto
de lo que le toca —viene a salir de ahí— y se salta lo que le estorbe.

---

## DECLARACIÓN 1 — de qué lado cae el handicap, y contra qué se alterna

La ronda anterior de este escenario (`fase7-simulacion-8.md`) puso **el callado y el atajista del
lado de A** —Tatiana, la que pide, que es el motor: abre, trae el problema y tiene el dato
oculto— y solo el flojo del lado de B. Libro de aquella ronda: **2 handicaps sobre el que pide, 1
sobre el que concede.** Nadie lo decidió; salió así.

Esta ronda invierte los tres y lo escribe:

| pareja | handicap | de qué lado cae | contra la ronda anterior |
|---|---|---|---|
| 1 · sólido + sólido | ninguno | — | igual |
| 2 · sólido + flojo | **flojo** | **A = Tatiana, la que pide** | **invertido** (antes flojo = B) |
| 3 · flojo + flojo | los dos | simétrico | igual |
| 4 · el callado | **callado** | **B = Mauricio, el que concede** | **invertido** (antes callado = A) |
| 5 · el atajista | **atajista** | **B = Mauricio, el que concede** | **invertido** (antes atajista = A) |

**Libro de esta ronda: 2 handicaps sobre el que concede, 1 sobre el que pide.** Exactamente el
espejo del anterior.

**Por qué el atajista se mueve a B, y qué se pierde al moverlo.** La ronda anterior cerró con un
hallazgo abierto: *«el atajista gana el escenario 8»*, medido con la atajista en A. Ese hallazgo
no se puede confirmar ni desmentir jugándolo otra vez del mismo lado, así que aquí se juega el
lado que nunca se probó —un Mauricio con cuatro personas en fila que quiere despachar— y el lado A
se recupera aparte, en la **partida 5-bis**, como control de cuatro turnos contra el texto final.
Las dos preguntas quedan contestadas y ninguna se contesta con la ronda vieja.

---

## DECLARACIÓN 2 — el contador de palabras, uno solo

**Se cuenta todo lo que sale por la boca en inglés**, y solo eso:

- **Cuenta:** toda palabra hablada en inglés, **incluidas las leídas de la ficha o de la carta**
  (`[L]`, `[C]`) y las de los exponentes impresos. Una contracción es **una** palabra (`I'm` = 1).
  Las cifras dichas en palabras cuentan palabra a palabra (`ninety-two thousand` = 2, `A dash two
  five zero eight two five` = 7). `Hmm` y `OK` cuentan: están impresos en el bloque 8 de la caja.
- **No cuenta:** el español (va aparte, entre «comillas angulares»), las acotaciones de escena
  *(entre paréntesis y en cursiva)*, las marcas entre corchetes y los rellenos no léxicos
  (`uh`, `ehh`, `eh`, `mmm`, `em`).

El mismo criterio en las **cinco parejas** y en las dos partidas de control. **No se descuenta lo
leído.** Descontarlo dejaría a la pareja 3 —la que más lee— como la más repartida del set, que es
justo la mentira que este contador existe para evitar.

Medido con `python3 artifacts/habla-a2/fase11-scripts/contar-palabras-8.py` sobre las líneas de
turno de este archivo. No a ojo.

---

## Modelo de minutos

Turno de sólido ≈ 8–14 s · turno de flojo con consulta ≈ 18–30 s · turno monosilábico ≈ 3–6 s ·
turno leído `[L]` ≈ 5–8 s · apertura de la carta ≈ 20–25 s · fuga al español y su reparación
≈ 10–15 s · fecha con ordinal ≈ 4–6 s · glosa de una palabra del oficio ≈ 12–18 s.

**Y dos partidas que este escenario tiene y ningún otro del set:** el dictado de la cédula con su
repetición (≈ 30–45 s) y el dictado del número de caso con la devolución dígito a dígito
(≈ 40–60 s). Nueve de los datos duros de este escenario son fechas u horas; el modelo las cobra
todas.

**Declarado en las dos cabeceras: 8 turnos por rol, 16 turnos globales, 8 minutos.** Eso son 30
segundos por turno. Ese es el número que se pone a prueba abajo.

---
---

## 1 · SÓLIDO + SÓLIDO

**A = Tatiana (sólida) · B = Mauricio (sólido) · handicap: ninguno**

**A1** — Good evening. Sorry to bother you. `[F]` I know it's a bad moment, there are people behind me. I'm here about my plan. `[F]` I'm leaving on the thirtieth of August, and I want to end the plan today. `[D]`

**B1** — Good evening. Let me check that. One moment… `[F]` Tatiana. Twelve months, signed on July the thirteenth. Ninety-two thousand a month, the charge on the fifth. `[D]` I have to be careful, because there is a minimum: three months, to October the thirteenth. `[F]` `[D]` A cancellation inside the minimum is not mine to give. It comes from retention.

**A2** — So I have to pay two more months for a gym I can't use? `[F]` I don't want to pay for that. `[F]` What will happen if I do nothing? `[F]`

> *Fin del turno global 3. Mauricio abre la carta en su pantalla, 22 s. Tatiana no la ve.*

**B2** — I have the answer from retention right now. Cancellations for travel: none authorized. Not one. `[C]` And this is the part that costs money, so listen to it: on the fifth we charge your card. If the charge doesn't go through, on the twelfth it goes to collections. `[C]` The system does that alone. A transfer before the twelfth stops it. `[C]` I know, and I'm sorry about that. `[F]`

**A3** — Sorry, what does "collections" mean? `[F]`

**B3** — Collections is the part of the company that calls you when you don't pay. `[F]` I mean — not me. People in an office in another city. `[F]`

**A4** — `[X]` … Then I have to tell you something. The charge on the fifth is not going to go through. My card expires on the thirty-first, and the new one takes eight business days. `[D]` It's not about the money. `[F]` It's about two months of a gym, and I'm not in the country.

**B4** — `[X]` … OK. That changes the order of things. `[F]` I can't do that, but I can do two things. `[F]` The first one is a freeze. To freeze a membership is to stop the payments and keep the plan — up to sixty days, and the three months move to the end. `[D]` But I need a paper that says when you go and when you come back. `[F]` A round-trip ticket. A letter from your work with the two dates. A booking in your name with the two dates. `[D]`

**A5** — I have the email from the embassy on my phone. My appointment in Bogotá is September the third. `[D]` I can show you, but I can't leave it. `[F]` It has my passport number and my address.

**B5** — That's not enough — it doesn't say when you come back. `[F]` When do you come back?

**A6** — I don't have that date. Nobody can give me one yet. My ticket is one-way, in my name, out of Bucaramanga on the thirtieth. `[D]`

**B6** — Then the freeze is dead. `[X]` There is another way, but it is not the one you came for: `[F]` a transfer. To transfer a plan is to put the plan in another person's name. `[F]` Thirty thousand pesos, the two of you here, with your ID. `[D]` And one question opens it or closes it: has this person ever been a member here? `[F]`

**A7** — `[X]` … Yurany, from my work. She asked me about this gym two weeks ago, and the price stopped her. `[D]` She was never a member here. I see her tomorrow night. My only free hour is Thursday, twelve to one, and Thursday is my last day here. `[D]` So it's Thursday at twelve, with Yurany, with our two IDs and thirty thousand pesos?

**B7** — Twelve is fine. The cut-off is Thursday at six in the evening — after six, one more month, ninety-two thousand. `[D]` And today, before you go, I open a case. That is not the cancellation. `[F]` A case is a visit written down, with a number and today's date. It needs your signature, your ID and a reason — no paper. If Thursday goes wrong, the case is the only thing with today's date on it. Can you sign here, next to your name? `[F]`

**A8** — Let me copy that first. `[F]` So today you write the case, and you don't write the cancellation. And you don't file the change, because I don't have the two dates. `[F]` My ID: one zero nine eight, six two two, four one seven. `[D]` *(firma el libro de visitas)*

**B8** — Write this down, please: `[F]` A, two five zero eight two five. Tuesday, August the twenty-fifth. `[D]`

**A9** — Let me copy… `[F]` So it's A dash two five zero eight two five, on the twenty-fifth? `[F]` And if the charge bounces on the fifth, I send a transfer from anywhere before the twelfth. `[D]` After that, nothing.

**B9** — That's it. Thursday before six. Thanks for your time. `[F]`

**A10** — Thank you. `[F]`

### Diagnóstico 1

| Medida | Resultado |
|---|---|
| **¿Llega al cierre?** | **Sí, entero.** Firma en A8 · número y fecha en B8 · devolución en A9 |
| **Los tres puntos** | **3 de 3.** Punto 1 en A8 con sus propias palabras · punto 2 en A7 (una vía, con su condición) · punto 3 en A9 + B2 |
| **Turno donde se muere** | No se muere |
| **Turnos** | A 10 · B 9 = **19** sobre 16 declarados (**+19 %**) |
| **Andamiaje** | `[F]` 23 · `[D]` 14 · `[C]` 3 · `[L]` **0** · `[X]` 4 |
| **Fuga al español** | Ninguna. El punto de riesgo (A4, decir qué le cuesta) lo sostiene el bloque 5 de la caja |
| **Minutos** | **6 min 05 s** — 19 turnos ≈ 4:00 · carta 0:22 · cédula 0:35 · caso y devolución 0:50 · pausas 0:18. Declarado 8:00 → **−24 %** |
| **¿Sabe que terminó?** | **Sí.** A9 devuelve el número y B9 lo confirma. Nadie pregunta si ya |

**El dato oculto sale en A4, y sale tarde a propósito.** Tatiana lo aguanta tres turnos y lo suelta
justo después de que Mauricio nombre cobranzas, que es cuando deja de sonar a plan para no pagar y
empieza a sonar a aviso. Su ficha le dice «you choose the moment» y esta pareja lo juega: es el
único turno de las cinco en el que el silencio inicial se convierte en argumento.

**⚠ COLISIÓN DE LÉXICO, y es del texto, no de los jugadores.** `a transfer` significa **dos cosas
distintas, una en cada pantalla**: en los datos de Tatiana es el giro de dinero que para a
cobranzas antes del 12; en los de Mauricio es la cesión del plan por 30.000 pesos. Aquí no muerde
porque los dos son sólidos y el contexto los separa (A9 dice `send a transfer`, B6 dice `transfer
a plan`), pero **ninguna de las dos fichas avisa de la otra acepción**, y el vocabulario de
Mauricio glosa solo la suya. En la pareja 2 muerde. Queda anotado.

---
---

## 2 · SÓLIDO + FLOJO

**A = Tatiana (floja) · B = Mauricio (sólido) · handicap: EL FLOJO, del lado del que PIDE**

*Es la inversión declarada: la ronda anterior puso al flojo en B. Aquí el motor es el que va
tocado, que es la condición dura de la prueba.*

**A1** — Good evening. Sorry to bother you. `[F]` I… I want cancel my plan. Today. `[X]`

**B1** — Good evening. Let me check that. One moment… `[F]` Tatiana. Twelve months, signed on July the thirteenth. Ninety-two thousand, the charge on the fifth. `[D]` I have to be careful, because there is a minimum: three months, to October the thirteenth. `[F]` `[D]` A cancellation inside the minimum is not mine to give.

**A2** — `[X]` … Sorry, I no understand. What does "minimum" mean? `[F]`

> *Fin del turno global 3. Mauricio abre la carta, 22 s.*

**B2** — The minimum is the time you have to stay after you sign. `[F]` I mean — you signed on July the thirteenth, so it is three months, to October the thirteenth. It's not my rule. `[F]` And I have the answer from retention here, right now: cancellations for travel, none authorized. Not one. `[C]` I know, and I'm sorry about that. `[F]`

**A3** — But I'm leaving on the thirty of August. `[D]` `[F]` The ticket is buy. I no can come here in October. `[X]`

**B3** — When do you come back?

**A4** — `[X]` … No. No return. It's one way. I no want pay two months for gym I no can use. `[F]` `[X]` «Es que no es por la plata, es que yo no voy a estar acá.» `[ES]`

**B4** — Sorry, I didn't catch that. `[F]` Can you say it again, in English?

**A5** — `[X]` … It's not about the money. It's about… I am not here. `[F]`

**B5** — I understand. I can't do that, but I can do two things. `[F]` Number one: a freeze. To freeze a membership is to stop the payments and keep the plan. Sixty days, and the three months move to the end. `[D]` But I need a paper that says when you go **and** when you come back. `[F]`

**A6** — I have email. From the embassy. `[D]` I can show you, but I can't… `[X]` … give.

**B6** — That's not enough — it doesn't say when you come back. `[F]` Does it have a date to come back?

**A7** — No. `[X]`

**B7** — Then there is another way, but it is not a cancellation: `[F]` a transfer. Thirty thousand pesos. Another person takes your plan, the two of you here, with your ID. `[D]` Has this person ever been a member here? `[F]`

**A8** — `[X]` … Thirty thousand for the bank? `[D]` I no understand. I have to pay thirty thousand before the twelve? `[D]` `[X]`

> *⚠ Aquí muerde la colisión anotada en la pareja 1: ella oye `transfer` y va a la fila de sus
> datos, «a transfer from anywhere, before the 12th».*

**B8** — No — not that. Let me say that again. `[F]` To transfer a plan is to put your plan in another person's name. `[F]` Not money to a bank. Another person, here, with you, with an ID.

**A9** — Ah. `[X]` … Yurany. From my work. She ask me about this gym two weeks ago. `[D]` She never was member here.

**B9** — Good. Then Thursday? The cut-off is Thursday at six in the evening — after six, one more month, ninety-two thousand. `[D]`

**A10** — Thursday twelve. One hour. It's my last day. `[D]` `[X]`

**B10** — Twelve is fine. And today I open a case. That is not the cancellation `[F]` — it's a visit written down, with a number and today's date. Your signature, your ID and a reason. Can you sign here, next to your name? `[F]`

**A11** — `[X]` … Yes. My ID: one zero nine eight, six two two… `[D]` `[X]` … four one seven.

**B11** — Write this down, please: `[F]` A, two five zero eight two five. Tuesday, August the twenty-fifth. `[D]`

**A12** — `[X]` … Again, please. Slowly. `[F]`

**B12** — A. Two, five, zero, eight, two, five. `[F]`

**A13** — A two five zero eight two five. Twenty-five. `[D]` … Thank you.

**B13** — And on the fifth we charge your card. If it doesn't go through, on the twelfth it goes to collections. `[C]` A transfer before the twelfth stops it — money, not the plan. `[C]` `[F]` Thursday before six. Thanks for your time. `[F]`

**A14** — Thank you. `[X]`

### Diagnóstico 2

| Medida | Resultado |
|---|---|
| **¿Llega al cierre?** | **Sí, pero lo cierra él.** Firma en A11 · número en B11 · devolución en A13 |
| **Los tres puntos** | **1 de 3, y el que sale es de él.** Punto 2 sí (A10 pone día y hora). Punto 1 **lo dice Mauricio en B10 y ella solo firma**: nunca lo dice «in her own words». Punto 3 lo dice él entero en B13; ella no aporta la mitad que es suya |
| **Turno donde se muere** | No se muere, pero **A4 es el turno donde el escenario deja de ser de dos**: a partir de ahí Mauricio pregunta y ella contesta |
| **El dato oculto** | **No sale nunca.** Tatiana no dice que la tarjeta vence el 31. Mauricio la avisa de cobranzas sin saber que el cobro va a rebotar seguro |
| **Turnos** | A 14 · B 13 = **27** sobre 16 declarados (**+69 %**) |
| **Andamiaje** | `[F]` 21 (18 de Mauricio) · `[D]` 15 · `[C]` 3 · `[L]` 0 · `[X]` 13 (11 de Tatiana) · `[ES]` 1 |
| **Fuga al español** | **A4**, y es exactamente el punto que la caja marca: decir qué le cuesta a ella. La reparación la trae Mauricio con el bloque 3, no ella |
| **Minutos** | **9 min 50 s** — 27 turnos ≈ 7:15 · carta 0:22 · cédula 0:40 · caso, repetición y devolución 0:55 · fuga y reparación 0:14 · pausas 0:24. Declarado 8:00 → **+23 %** |
| **¿Sabe que terminó?** | Sí. La devolución del número en A13 lo marca, y B13 cierra |

**El flojo se sostiene, pero se sostiene colgado.** El andamiaje que lo salva no es el suyo: es el
bloque 4 de Mauricio (`Let me say that again`, `I mean…`) y su bloque 3. Tatiana sobrevive porque
al otro lado hay alguien obligado por su ficha a glosar. Con ese mismo flojo delante de un
Mauricio callado o atajista, B8 no existe y la cesión se cae.

**Lo que se pierde por poner el handicap en el motor** se ve en una fila: el dato oculto. El
escenario entero está construido sobre que Tatiana **elija** cuándo decir que el cobro va a
rebotar; un A2 flojo no elige nada, porque cada turno se le va en sobrevivir el turno. La pieza
que solo ella tiene no aparece, y el escenario no tiene ningún mecanismo que la reclame.

---
---

## 3 · FLOJO + FLOJO

**A = Tatiana (floja) · B = Mauricio (flojo) · handicap: los dos, simétrico**

*El caso real de dos compañeros de clase.*

**A1** — Good evening. `[X]` I… my plan. I want cancel. Today. `[F]`

**B1** — Good evening. `[F]` One moment… `[F]` `[X]` … Tatiana? Twelve months. July thirteen. `[D]` … Ninety-two thousand.

**A2** — Yes. I no can go more. I'm leaving. The thirty. `[D]`

> *Fin del turno global 3. Mauricio abre la carta y la ojea 10 s: se queda con la primera fila y
> no lee las otras tres.*

**B2** — `[X]` … No. I no can cancel. Minimum three months. October thirteen. `[D]` It's… `[X]` retention. Not me.

**A3** — `[X]` … What does "retention" mean? `[F]`

**B3** — `[X]` … Retention is… `[X]` «¿cómo se dice?» `[ES]` … is a office. Second floor. `[D]` `[X]`

**A4** — But I no am here in October. I am in other country. I no want pay. `[F]` `[X]`

**B4** — I know, and I'm sorry about… `[F]` `[X]` … this.

**A5** — `[X]` … Is there another way? `[F]`

**B5** — `[X]` There is another way, but… `[F]` `[X]` … «espere» `[ES]` … a freeze. Freeze.

**A6** — What does "freeze" mean? `[F]`

**B6** — `[X]` … Freeze is… you no pay two months. The plan is stop. `[X]` But I need paper. Two dates.

**A7** — `[X]` I have email. Embassy. `[D]` I can show you, but I can't… `[X]`

**B7** — `[X]` … «a ver» `[ES]` … Two dates? You go and you come back?

**A8** — No come back. One way. `[D]`

**B8** — Then no. `[X]` … It's not enough.

**A9** — «O sea que yo tengo que pagar dos meses más de un gimnasio al que no puedo ir.» `[ES]`

> *Aquí se muere. Turno global 17.*

**B9** — «Pues sí, es que la permanencia son tres meses, ¿sí me entiende?» `[ES]`

**A10** — «¿Y no hay nada más que se pueda hacer?» `[ES]`

**B10** — «Yo le puedo abrir un caso.» `[ES]` … I open a case. Today. `[X]` Your ID. Your signature. And a reason.

**A11** — `[X]` … What is a case? `[F]`

**B11** — `[X]` … A case is… a paper. With number. Today. `[X]` «Es como una constancia.» `[ES]`

**A12** — `[X]` … OK. My ID: one zero nine eight, six two two, four one seven. `[D]` *(firma)*

**B12** — `[X]` Write this… please. `[F]` A. Two five zero eight two five. `[D]`

**A13** — `[X]` … Again? `[F]`

**B13** — A. Two, five, zero, eight, two, five. Twenty-five August. `[D]`

**A14** — A two five zero eight two five. Twenty-five. `[D]` … Thank you.

**B14** — Thank you. `[X]` … Bye.

### Diagnóstico 3

| Medida | Resultado |
|---|---|
| **Turno donde se muere** | **Turno global 17 (A9)**, y el 18 lo confirma. Punto exacto: **el bloque 5 de la caja** —decir qué le cuesta a ella—, el mismo sitio que en la pareja 2. Aquí no hay nadie que repare y se quedan en español cuatro turnos |
| **¿Llega al cierre?** | **El gesto sí, el contenido no.** Firma, número dictado y número devuelto: los tres se ejecutan (A12, B12-B13, A14) |
| **Los tres puntos** | **0 de 3.** Ninguno se contesta en voz alta. La firma llega antes que las tres respuestas, que es justo el orden que el cierre prohíbe |
| **Lo que nunca se produce** | La cesión (**la segunda vía no se nombra**) · la hora de corte del jueves · cobranzas y el 12 · Yurany · el rebote de la tarjeta · Édison |
| **Turnos** | A 14 · B 14 = **28** sobre 16 declarados (**+75 %**) |
| **Andamiaje** | `[F]` 12 · `[D]` 12 · `[L]` 0 · `[X]` 24 · `[ES]` **6** |
| **Fuga al español** | Primera en B3 (una palabra), **cascada en A9-B10**, y B11 vuelve a caer para glosar «caso» |
| **Minutos** | **10 min 30 s** — 28 turnos ≈ 8:10 · carta 0:10 · cédula 0:45 · caso y devolución 0:55 · cuatro turnos de español y su vuelta 0:30. Declarado 8:00 → **+31 %** |
| **¿Sabe que terminó?** | **Cree que sí, y es lo peor del diagnóstico.** El número devuelto cierra el juego según las dos fichas, y aquí cierra una conversación vacía |

**El hallazgo duro de esta pareja: el gesto de cierre es un dictado, y un dictado no comprueba
nada.** Firmar, oír siete caracteres y repetirlos es la única parte de este escenario que un A2
flojo puede hacer **entera y sin entender una palabra de lo anterior**. Las dos fichas ponen las
tres preguntas *antes* de la firma («Before she signs, you two have to answer out loud»), pero
nada en el gesto obliga a que se hayan contestado: quien manda el orden es Mauricio, y un Mauricio
flojo pide la firma en cuanto tiene una frase que le sirve.

**La carta se desperdicia entera.** Un flojo la ojea, se queda con la primera fila —la que solo le
confirma lo que ya había dicho— y no llega a la tercera, que es la única información nueva del
escenario. Cobranzas y el 12 no existen en esta partida.

---
---

## 4 · EL CALLADO

**A = Tatiana (sólida) · B = Mauricio (callado) · handicap: EL CALLADO, del lado del que CONCEDE**

*Inversión declarada: la ronda anterior lo puso en A. Aquí el amordazado es el que tiene el
mostrador, las dos vías, la carta y el número de caso.*

**A1** — Good evening. Sorry to bother you. `[F]` I'm here about my plan. I'm leaving on the thirtieth of August, and I want to end it today. `[D]`

**B1** — One moment. `[F]` … Tatiana. July thirteenth. `[D]`

**A2** — Yes. Twelve months, ninety-two thousand. `[D]` Can you cancel it today? `[F]`

> *Fin del turno global 3. Mauricio abre la carta, la lee entera, 20 s, y no dice nada de ella.*

**B2** — No. Minimum. Three months. `[D]`

**A3** — `[X]` … Three months to when? `[F]`

**B3** — October thirteenth. `[D]`

**A4** — So I have to pay two more months for a gym I can't use? `[F]` I don't want to pay for that. `[F]` Is there another way? `[F]`

**B4** — A freeze. `[F]`

**A5** — What does "freeze" mean? `[F]`

**B5** — `[X]` … You stop paying. The plan stays. Sixty days. `[D]`

**A6** — And what do you need for that? `[F]`

**B6** — A paper. Two dates. `[F]`

**A7** — I have the email from the embassy. My appointment in Bogotá is September the third. `[D]` I can show you, but I can't leave it. `[F]`

**B7** — `[X]` … Not enough. No return date. `[F]`

**A8** — I don't have a return date. My ticket is one-way. `[D]` … Is there another way? `[F]`

**B8** — `[X]` … No.

> *⚠ Y sí la hay: la cesión. Su ficha dice «Your second way is a transfer, and she does not know
> about it… If you never say it, she never knows». La dice nadie.*

**A9** — Then what will happen if I do nothing? `[F]` On the fifth. `[D]`

**B9** — We charge. Ninety-two thousand. `[D]`

**A10** — And if the card says no? `[F]`

**B10** — `[X]` … Collections. The twelfth. `[C]`

**A11** — What does "collections" mean? `[F]`

**B11** — They call you. Another office. `[F]`

**A12** — `[X]` … OK. My card expires on the thirty-first, so it's going to say no. `[D]` I can send a transfer from anywhere before the twelfth. `[D]` After the twelfth, nothing. Is that right? `[F]`

**B12** — Right. `[F]`

**A13** — So today you can't cancel it and you can't freeze it. `[F]` Can you write something today? `[F]`

**B13** — A case. Sign here. And your ID. And a reason. `[F]`

**A14** — So a case is not a cancellation? `[F]`

**B14** — No. `[F]`

**A15** — `[X]` … My reason: I'm leaving the country on the thirtieth, and I can't use the plan. `[F]` My ID: one zero nine eight, six two two, four one seven. `[D]` *(firma)* What's the number? `[F]`

**B15** — A, two five zero eight two five. Today. `[D]`

**A16** — Let me copy… `[F]` So it's A dash two five zero eight two five, on the twenty-fifth of August? `[F]`

**B16** — Yes. `[F]`

**A17** — Thanks for your time. `[F]`

### Diagnóstico 4 — al callado se le mide OTRA COSA

**El reparto de palabras de esta pareja no se usa para nada.** Su perfil es producir tres palabras
por turno; medir el 40 % aquí sería medir el handicap. La cifra se publica más abajo por
transparencia y **queda fuera de la puerta 5**, como manda la regla.

Lo que sí se mide: **¿produjo las piezas que solo él tiene?**

| Pieza que solo Mauricio tiene | ¿La produjo? | Cómo |
|---|---|---|
| La permanencia y su fecha (13 oct) | **Sí** | B2-B3, arrancada a preguntas |
| La primera vía: congelar, sus 60 días y su condición | **Sí** | B4-B6, tres turnos y tres preguntas de ella |
| Por qué su papel no sirve | **Sí** | B7, cuatro palabras |
| **La segunda vía: la cesión** | **NO** | **B8 dice «No» a una vía que tiene en pantalla** |
| Cobranzas y el 12 (única información nueva de la carta) | **Sí, a medias** | B10, y solo porque ella preguntó por la tarjeta |
| La hora de corte del jueves, 6 p.m. | **NO** | Nadie la nombra en toda la partida |
| Édison: piso, días y horas | **NO** | No se pregunta y no se ofrece |
| Su parte del cierre: número y fecha en voz alta | **Sí** | B15 |

**El defecto, nombrado: Mauricio consigue su objetivo asintiendo.** Su ficha le pide una firma y
una vía que ella pueda usar. **La firma la consigue** —B13, siete palabras— y con ella el juego se
cierra según las tres condiciones del cierre común. Los puntos 1 y 3 del cierre **los formula
Tatiana y él los valida con una palabra**: A14 «So a case is not a cancellation?» → B14 «No»;
A12 con las tres cifras enteras → B12 «Right». Un rol que puede cerrar el escenario diciendo
«no», «right» y «yes» a las frases del otro **no está obligado a producir por el gesto de cierre**,
solo a estar de acuerdo. Es el mismo agujero que la pareja 3 destapa por el otro lado.

**Y hay un agujero peor, que solo se ve con el callado en B.** La cesión —la pieza que el diseño
declara como su segunda vía, la que ella no puede ni sospechar porque **no está en su pantalla**—
desaparece sin dejar rastro y **nada la reclama**. Tatiana usa dos veces su exponente `Is there
another way?` (A4 y A8), que es todo lo que su ficha le da, y a la segunda recibe un «No» falso.
El cierre no pregunta por la segunda vía; el «You did it if» de Mauricio sí («two ways she didn't
bring in»), pero ese criterio se lee **después**, en el debrief, y no bloquea nada.

| Medida | Resultado |
|---|---|
| **¿Llega al cierre?** | Sí, los tres gestos (A15, B15, A16) |
| **Los tres puntos** | **3 de 3 formalmente, 1 de 3 producidos por él.** Punto 2 es el más falso: la vía que ella «elige» es la única que le dejaron ver, y está muerta |
| **Turno donde se muere** | No se muere. **Se vacía en B8** |
| **Turnos** | A 17 · B 16 = **33** sobre 16 declarados (**+106 %**) |
| **Palabras (fuera de la puerta 5)** | ver tabla final |
| **Andamiaje** | `[F]` 26 (14 de Mauricio) · `[D]` 13 · `[C]` **1** de cuatro filas · `[L]` 0 · `[X]` 8 |
| **Fuga al español** | Ninguna, y no es mérito: Tatiana nunca llega a quedarse sin turno porque él nunca le devuelve una frase larga que no entienda |
| **Minutos** | **5 min 45 s** — 33 turnos ≈ 3:20 · carta 0:20 · cédula 0:35 · caso y devolución 0:50 · pausas 0:40. Declarado 8:00 → **−28 %** |
| **¿Sabe que terminó?** | Sí. Ella devuelve el número y él confirma |

**Contra la ronda anterior, donde el callado era Tatiana:** allí el escenario se hundía porque el
motor no arrancaba y todo el mundo lo veía. **Aquí no se hunde: se falsifica.** La conversación
tiene 33 turnos, suena a trámite normal y termina en su sitio, y sin embargo se ha perdido la
mitad del contenido del mostrador. **Es el peor resultado de las cinco parejas, y es el que menos
se nota.**

---
---

## 5 · EL ATAJISTA

**A = Tatiana (sólida) · B = Mauricio (atajista) · handicap: EL ATAJISTA, del lado del que CONCEDE**

*Inversión declarada. Su atajo es real y está escrito en su ficha: son las 6:40 p.m., hay cuatro
personas en fila, y él necesita exactamente tres cosas para acabar la visita —firma, cédula y una
razón—, las tres suyas y ninguna de ellas cara.*


**A1** — Good evening. Sorry to bother you. `[F]` I'm here about my plan. I'm leaving on the thirtieth of August, and I want to end the plan today. `[D]`

**B1** — Good evening. Signed July the thirteenth, minimum three months, to October the thirteenth. `[D]` I can't cancel that, and it isn't mine to give — it comes from retention. `[F]` But I can open a case today, right now: your signature, your ID and a reason. It keeps today's date. `[F]`

**A2** — `[X]` … Wait. Is a case a cancellation? `[F]` What will happen on the fifth? `[F]`

> *Fin del turno global 3. Mauricio abre la carta y la ojea 8 s.*

**B2** — It isn't a cancellation, it's a visit with a number. `[F]` On the fifth we charge your card, and if it doesn't go through, on the twelfth it goes to collections. `[C]` Cancellations for travel: none authorized. `[C]` I know, and I'm sorry about that. `[F]` Can you sign here, next to your name? `[F]`

**A3** — Is there another way? `[F]` I don't want to pay for two months of a gym I can't use. `[F]`

**B3** — There is another way, but it needs a paper: `[F]` a freeze. Sixty days, the payments stop. I need a paper with the two dates — when you go and when you come back. `[D]`

**A4** — I have the email from the embassy, and it has one date. September the third, Bogotá. `[D]` I can show you, but I can't leave it. `[F]` My ticket is one-way. `[D]` … Is there another way? `[F]`

**B4** — `[X]` … No. That's what I have. `[F]` Your reason, please, and your ID, and I open the case. There are four people behind you. `[!]`

**A5** — `[X]` … My reason: I'm leaving the country on the thirtieth. My ID: one zero nine eight, six two two, four one seven. `[D]` *(firma)*

**B5** — Write this down, please: `[F]` A, two five zero eight two five. Today, the twenty-fifth.

**A6** — Let me copy… `[F]` So it's A dash two five zero eight two five, on the twenty-fifth? `[F]` … And what do I do before the twelfth? `[F]`

**B6** — A transfer, from anywhere. `[C]` That stops collections. Thanks for your time. `[F]`

**A7** — `[X]` … Thank you.

### Diagnóstico 5 — ¿gana el atajista?

| Medida | Resultado |
|---|---|
| **¿Llega al cierre?** | **Sí, y en siete turnos.** Firma A5 · número B5 · devolución A6 |
| **Los tres puntos** | **2 de 3, y ninguno lo pide él.** Punto 1 lo saca ella preguntando (A2) · punto 3 sale en B2 porque la carta se lo pone delante · **punto 2 no existe: no hay ninguna vía que ella pueda usar** |
| **Turno donde se muere** | No se muere. **B4 es la mentira que lo gana**: hay una segunda vía y dice que no |
| **Turnos** | A 7 · B 6 = **13** sobre 16 declarados (**−19 %**) |
| **Andamiaje** | `[F]` 15 · `[D]` 8 · `[C]` 4 · `[L]` 0 · `[X]` 4 · **`[!]` 1** (mete prisa en voz alta, B4) |
| **Fuga al español** | Ninguna |
| **Minutos** | **3 min 20 s** — 13 turnos ≈ 2:05 · carta 0:08 · cédula 0:30 · caso y devolución 0:35. Declarado 8:00 → **−58 %** |
| **¿Sabe que terminó?** | Sí |
| **¿Gana?** | **Sí.** Consigue las tres cosas que su ficha le pide firmadas en 3:20, y **el escenario no tiene con qué pararle** |

**Se lo permite el escenario, y se lo permite por dos sitios a la vez.** El primero: la única
palanca que Tatiana tiene contra un mostrador que se cierra es `Is there another way?`, y la usa
dos veces (A3, A4). A la segunda recibe un «No». **No hay ninguna comprobación en el cierre que
diga que Mauricio tenía dos vías**, así que su «no» cuesta cero. El segundo: **las tres cosas que
él necesita se las da ella sin resistencia**, porque firmar, dar la cédula y decir una razón son
también el billete de salida de ella. Nadie tira del otro lado del gesto que cierra el juego.

**Rompe restricción y le sale gratis.** En B4 mete prisa en voz alta apoyándose en la fila, que su
propia cabecera —*Counter, formal · please, sorry, thank you, also for the no*— no autoriza. No hay
sanción posible: la partida se cierra dos turnos después.

---

## 5-bis · CONTROL — el atajista del lado A, contra el texto final

*No es una de las cinco parejas y no entra en ninguna cuenta de reparto. Está aquí por una razón
sola: la ronda anterior dejó abierto que «el atajista gana el escenario 8» con la atajista en A, y
la ficha ha cambiado desde entonces (Mauricio, el objetivo que nombra la vía, la fila `offering a
way`). Se vuelve a jugar cuatro turnos para ver si el cambio lo cierra.*

**A = Tatiana (atajista) · B = Mauricio (sólido)**

**A1** — Good evening — sorry, I'm in a hurry, there are people behind me. `[F]` I need to end my plan today. I'm leaving the country on the thirtieth, one-way, ticket bought, and I'm not coming back. What do you need from me? `[D]`

**B1** — Good evening. Let me check that. One moment… `[F]` Signed July the thirteenth, minimum three months, to October the thirteenth. `[D]` A cancellation inside the minimum is not mine to give. `[F]`

**A2** — Fine. Then what CAN you do? All of it, please. `[F]`

> *Turno global 3. Carta.*

**B2** — Two things, and one of them is dead already. `[F]` A freeze: sixty days, payments stop, but I need a paper with the two dates, and one-way has one. `[D]` And a transfer: another person takes the plan, thirty thousand pesos, the two of you here with your ID. Has this person ever been a member here? `[F]` And retention says it right now: cancellations for travel, none authorized. `[C]`

**A3** — Yurany, from work. Never a member. Thursday, twelve, both of us, with our IDs and thirty thousand. `[D]` What do I sign?

**B3** — The cut-off is Thursday at six, so twelve is fine. `[D]` Sign here, next to your name, your ID and a reason. Today's case keeps today's date. `[F]` And on the fifth: if the card says no, on the twelfth it goes to collections. `[C]`

**A4** — One zero nine eight, six two two, four one seven. `[D]` *(firma)* The number?

**B4** — A, two five zero eight two five. Tuesday the twenty-fifth. `[D]`

**A5** — A dash two five zero eight two five, the twenty-fifth. Thursday at twelve. Thank you. `[F]`

**Resultado del control: sigue ganando, y ahora gana más rápido.** 9 turnos, **2 min 40 s**, y sale
con la cesión cerrada, día y hora, número de caso y el aviso del 12. Falla el punto 1 del cierre
(no le interesa qué es un caso, le interesa el número) y las coordenadas de Édison, que no
necesita porque la cesión se hace en el mostrador.

**Y el cambio de la ficha lo empeora.** El objetivo nuevo de Mauricio —«She has to leave with a way
she can use»— le **obliga** a poner las dos vías encima del mostrador aunque se las pidan con
prisa y de mala manera. En B2, la atajista consigue con cinco palabras («what CAN you do? All of
it») lo que a la pareja sólida le cuesta seis turnos. La corrección que hacía la ficha más honesta
hizo el atajo más barato.

---

## 6 · CONTROL — el que sale del paso LEYENDO SU FICHA en voz alta

*Tampoco es una pareja. Es la prueba que solo se puede hacer desde que la ficha está en inglés: un
jugador que no produce nada y **lee su prosa tal cual**, como si fuera habla suya.*

**A = Tatiana (lectora) · B = Mauricio (sólido)**

**A1** — `[L]` "The problem is not the ninety-two thousand pesos."

**B1** — Good evening. Let me check that. One moment… `[F]` Tatiana, July the thirteenth. `[D]` Sorry — what do you need?

**A2** — `[L]` "You still have no return date, and nobody can give you one yet."

> *⚠ Mauricio **no** marca el `you`. Contesta como si ella hubiera dicho «I have no return date»,
> porque en el mostrador el referente es obvio y el error de persona es normal en A2.*

**B2** — `[C]` `[F]` Then a freeze is not possible: I need a paper that says when you go and when you come back. `[F]` A cancellation inside the minimum is not mine to give.

**A3** — `[L]` "It has my passport number, my address and my case number — I can show the screen, nothing more."

**B3** — That's not enough — it doesn't say when you come back. `[F]` There is another way, but it costs thirty thousand: a transfer. Has this person ever been a member here? `[F]`

**A4** — `[L]` "Yurany, from work, asked you about this gym two weeks ago, and the price stopped her."

**B4** — `[X]` … Asked me? … OK — she was never a member. `[F]` Good. Then before you go: your signature, your ID and a reason. And tell me in your own words — what do I write today, and what don't I write? `[F]`

**A5** — `[X]` … `[X]` … `[L]` "You want to end the plan today, with no charge on September the fifth."

**B5** — `[X]` … That's what you want. It isn't what I write. `[F]` Say it again?

**A6** — `[X]` … *(silencio)*

### Diagnóstico 6 — dónde gana el lector y dónde se estrella

**Gana cinco turnos seguidos, y la línea que mejor le funciona es esta, literal de su ficha:**

> **"The problem is not the 92,000 pesos"** — de `Not about money`.

Es media oración: la pasada de fase 9 la protegió con dos puntos («…pesos: you pay for two months,
and you cannot go»), y **los dos puntos no se oyen**. El lector se para ahí, la frase sale entera,
en primera persona implícita, sin un `you` que la delate, y es exactamente el argumento de
Tatiana. Funciona. La segunda mitad, la que lleva el `you`, no la lee.

**El mismo truco funciona en la ficha de Mauricio, y ahí hay dos líneas enteras:**

> **"Édison reads a reason on that form, and never a destination."** — de `You can't` 3.
> **"…he promised three or four members a cancellation, and could not give it."** — de `Only you know` 4, parando en los dos puntos.

Las dos son tercera persona, no llevan `you`, son decibles tal cual y hacen avanzar el turno.

**El cortafuegos del `you` es ortográfico, no acústico.** A2 y A4 son líneas escritas *sobre* la
jugadora («You still have no return date», «Yurany… asked **you**») y el lector las dice apuntando
al mostrador. Mauricio **no las rechaza**: en A2 ni se entera, y en A4 tarda medio turno («Asked
me?») y sigue. En un mostrador donde el referente es evidente y donde los errores de persona son
la norma del nivel, **la segunda persona no protege la línea**: solo la vuelve rara.

**Y se estrella en un sitio y solo en uno: el punto 1 del cierre.** «Tatiana says it, in her own
words». Es la única cosa del escenario que exige parafrasear, y no hay ninguna línea de ficha que
sirva para contestarla: A5 lee su objetivo, que es lo que ella quiere y no lo que él escribe, y
B5 lo caza. **La puerta contra el lector existe, es una sola, y está en manos del otro jugador.**
Con un Mauricio flojo, callado o atajista —tres de las cinco parejas de arriba— nadie hace esa
pregunta y **el lector cierra el escenario sin producir una frase propia**.

---
---

## Las cinco parejas, en una tabla

Palabras medidas con `fase11-scripts/contar-palabras-8.py`, criterio único de la DECLARACIÓN 2.

| pareja | handicap y lado | turnos (decl. 16) | palabras A / B | reparto | minutos (decl. 8:00) | ¿cierre? | muere en |
|---|---|---|---|---|---|---|---|
| 1 · sólido + sólido | ninguno | **19** | **319 / 409** | **44 / 56** | 6:05 (−24 %) | sí, 3 de 3 puntos | — |
| 2 · sólido + flojo | flojo en **A**, el que pide | **27** | **156 / 385** | **29 / 71** | 9:50 (+23 %) | sí, 1 de 3 puntos | — (se desequilibra en A4) |
| 3 · flojo + flojo | los dos | **28** | **91 / 119** | **43 / 57** | 10:30 (+31 %) | gesto sí, 0 de 3 puntos | **turno global 17** |
| 4 · el callado | callado en **B**, el que concede | **33** | **239 / 64** | **79 / 21** *(fuera de la puerta 5)* | 5:45 (−28 %) | sí, 1 de 3 producidos por él | — (se vacía en B8) |
| 5 · el atajista | atajista en **B**, el que concede | **13** | **136 / 176** | **44 / 56** | 3:20 (−58 %) | sí, 2 de 3 puntos | — |
| *5-bis · control, atajista en A* | *atajista en A* | *9* | *98 / 147* | *40 / 60* | *2:40* | *sí* | *—* |
| *6 · control, el lector* | *lee la ficha* | *11* | *69 / 125* | *36 / 64* | *2:30* | *no* | *punto 1 del cierre* |

### Puerta 5 — el 40 %, juzgado solo sobre las parejas de perfil parejo

| pareja | lado menor | veredicto |
|---|---|---|
| 1 · sólido + sólido | **44 %** | **PASA** |
| 3 · flojo + flojo | **43 %** | **PASA** |

**Las otras tres no entran, y se dice por qué.** La 4 (79/21) mide el handicap del callado, no el
escenario. La 2 (29/71) mide el handicap del flojo puesto sobre el motor. La 5 mide a alguien que
viene a irse. **Contra la ronda anterior:** allí la pareja del callado dio 21/79 con el handicap en
A y aquí da 79/21 con el handicap en B — **la misma cifra, girada**, que es exactamente lo que
avisa la regla: el número sigue al handicap, no al escenario.

**Lo que sí se aprende del par 2 aunque no cuente para la puerta:** poner el flojo en el motor
cuesta **15 puntos de reparto** contra la ronda anterior (44/56 con el flojo en B → 29/71 con el
flojo en A) **sobre el mismo texto, sin tocar una línea**. Si esta pareja se hubiera medido para la
puerta, el escenario habría parecido roto y no lo está.

---

## Respuestas a lo que se preguntaba

**1 · Turno donde se muere.** Solo una pareja se muere: la **3**, en el **turno global 17** —el
`[ES]` de A9—, y el sitio es el que la caja marca en negrita: el bloque 5, decir qué le cuesta a
ella. La pareja 2 llega al mismo sitio (A4) y sobrevive porque enfrente hay un sólido con el
bloque 4. **Ese es el punto que hay que dotar de andamiaje, y es el mismo en las dos.**

**2 · Dónde se pasarían al español.** Tres sitios, en este orden de frecuencia:

1. **Decir qué se pierde** (A4 de la pareja 2, A9 de la 3). Bloque 5 de la caja, que existe y no
   basta cuando el que lo necesita es flojo.
2. **Glosar una palabra del oficio siendo Mauricio** (B3 y B11 de la pareja 3: `retention`,
   `case`). El bloque 4 es suyo y un flojo no lo opera: pide la palabra y no puede devolverla.
3. **El regateo largo del papel** (B7-B8 de la 3), donde hay que decir por qué un papel no vale
   sin repetir el papel.

**3 · Minutos reales contra los declarados.** Declarado **8:00 y 16 turnos globales** —30 s por
turno—. Medido: **3:20 · 5:45 · 6:05 · 9:50 · 10:30**. Ninguna pareja da 8:00 y **ninguna da 16
turnos**: el rango real es de 13 a 33. El turno de A2 de este escenario dura entre 5 y 20 segundos,
nunca 30, y lo que descuadra el reloj no son los turnos sino **tres bloques fijos que el
presupuesto no nombra**: la carta (0:08–0:22), el dictado de la cédula (0:30–0:45) y el dictado del
número de caso con su devolución (0:35–0:55). **Entre 1:15 y 2:00 de cada partida son dictado**, y
eso no depende del nivel de nadie.

**4 · ¿Sabe la pareja que terminó?** **Las cinco dicen que sí**, y ese es el problema. El gesto de
cierre —firma, número, número devuelto— se ejecutó **entero en las cinco**, incluida la 3, donde no
se había contestado ni una de las tres preguntas, y la 4, donde faltaba media pantalla de Mauricio.
El cierre de este escenario **no comprueba nada de lo que las fichas dicen que hay que contestar
antes de firmar**: es un dictado, y un dictado lo ejecuta cualquiera.

**5 · Del callado, lo que se le mide.** Produjo **4 de 8** de sus piezas propias, y las cuatro a
preguntas de ella. Faltan la **cesión** (dijo «No» a una vía que tiene en pantalla), la **hora de
corte**, las **coordenadas de Édison** y tres de las cuatro filas de la carta. **Y consiguió su
objetivo asintiendo:** los puntos 1 y 3 del cierre los formuló Tatiana y él los validó con «No» y
«Right»; la firma se la dieron. **Va nombrado como defecto:** el gesto de cierre acepta la
conformidad como si fuera producción.

**6 · ¿Gana el atajista?** **Sí, por los dos lados.**
- **En B** (esta ronda): cierra en **3:20** con la firma, la cédula y la razón, y deja a Tatiana sin
  ninguna vía usable. Su «No» de B4 es falso y **no le cuesta nada**, porque nada en el cierre
  pregunta si tenía una segunda vía.
- **En A** (control 5-bis, contra el texto final): **2:40**, y sale con la cesión cerrada, día,
  hora, número y aviso del 12. El hallazgo abierto de la ronda anterior **sigue abierto**, y el
  objetivo nuevo de Mauricio —«a way she can use»— lo abarata: cinco palabras de la atajista
  («what CAN you do?») le sacan en un turno lo que a la pareja sólida le cuesta seis.

**7 · El lector.** Aguanta cinco turnos leyendo y **cae solo en el punto 1 del cierre**, que es la
única cosa del escenario que exige parafrasear. La línea que le funciona verbatim es
**«The problem is not the 92,000 pesos»** —media oración protegida por unos dos puntos que no se
oyen— y en la ficha de Mauricio hay dos enteras: **«Édison reads a reason on that form, and never a
destination.»** y **«…he promised three or four members a cancellation, and could not give it.»**
El `you` de la prosa **no protege en voz alta**: Mauricio no rechazó ninguna de las dos líneas que
le llegaron apuntándole a él.
