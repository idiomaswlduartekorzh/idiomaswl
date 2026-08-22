# Escenario 3 · `swap-the-saturday-shift` — simulación de las cinco parejas sobre el texto FINAL

Cinco conversaciones completas, turno a turno, contra la versión **final** de las fichas:
`artifacts/habla-a2/fase7-modelo-ficha-en.md` (molde, pasada quirúrgica del 22 ago 2026), con el
motor de `artifacts/habla-a2/fase4-escenarios-1-3.md` §3 y la caja común
`artifacts/habla-a2/caja-de-herramientas-a2.md`.

Va además una **sexta** conversación que no es una pareja de perfil sino un ataque: **el lector**,
el que intenta salir del paso leyendo su ficha en voz alta. No se le mide carga —no es un perfil,
es un modo de hacer trampa—: se mide si le funciona, y con qué líneas exactas.

**Aquí no se arregla nada.** Se juega, se cuenta, se diagnostica.

---

## Cómo se leen estas transcripciones

**Cada jugador ve SOLO su ficha.** Si alguien usa un dato del otro lado sin que se lo hayan dicho
en voz alta, va marcado **⚠ FILTRACIÓN**. La pantalla de cierre (`Both screens — how it ends`) es
compartida y está disponible desde antes del turno 1: eso **no** es filtración, es diseño, y en la
pareja del callado se ve morder (§D4).

### Marcas de turno

| Marca | Qué significa |
|---|---|
| `[F]` | tomó una forma de su tabla `Say it here` o de la caja y la dijo como suya — **eso es el ejercicio** |
| `[D]` | miró la tabla `Facts` |
| `[V]` | miró el bloque `Words you need here` |
| `[C]` | miró la carta (pantalla aparte, solo rol A) |
| `[L]` | **leyó en voz alta una línea que no está escrita para decirse**: fila de datos, carta, pantalla de cierre |
| `[X]` | se atascó: pausa larga, reinicio, frase abandonada |
| `[ES]` | se pasó al español, entero o a medias |
| `[!]` | se salió del papel: rompió una restricción de su ficha, o habló de meta |

### Los perfiles

El A2 **sólido** falla en tercera persona, en preposición y en pregunta sin auxiliar. El A2 **flojo**
produce `I no can`, `he go`, `is much`, presente por pasado y frases a medias. El **callado**
contesta con una a tres palabras y no inicia nada. El **atajista** habla más suelto de lo que le
toca —va a cerrar, no a aprender— y se salta lo que le estorbe. El **lector** no improvisa:
recorre su pantalla de arriba abajo.

### El handicap, de qué lado cae, y por qué — se declara ANTES de jugar

En la ronda de agosto el handicap cayó del lado del que pide en 6 de 7 escenarios sin que nadie lo
decidiera, y como **A es el motor** de este escenario (arranca, trae el problema, trae la carta y
carga con la restricción de las dos maneras de partir el turno), amordazarlo hunde el reparto y el
resultado parece un defecto del escenario. Aquí se reparte a mano:

| Pareja | Quién lleva el handicap | Qué lado es ése |
|---|---|---|
| 1 · sólido + sólido | ninguno | — |
| 2 · sólido + flojo | **flojo = A** | **el que pide, y el motor**: arranca, lleva la carta y las dos maneras de partir el sábado |
| 3 · flojo + flojo | los dos | — |
| 4 · el callado | **callado = B** | **el que concede**: no arranca, pero tiene las tres piezas que solo él puede decir (las 40 personas, su condición, las 8 p.m.) |
| 5 · el atajista | **atajista = B** | el que concede, y el que tiene la puerta física de salida: entra a su turno en veinte minutos |

**Reparto declarado: una vez del lado que pide (el flojo, o sea el caso duro), dos del lado que
concede (el callado y el atajista).** El callado cae del lado que concede a propósito: es donde su
handicap mide algo —si produce sus piezas— en vez de limitarse a apagar el motor.

### Un solo contador de palabras, y aquí está dicho cuál

**Se cuenta en bruto todo lo que sale por la boca:** inglés, español, muletillas, números dichos en
voz alta y también las palabras leídas de la ficha (`[L]`). **No se cuenta:** la etiqueta del turno,
las marcas entre corchetes, las acotaciones en cita (`>`) y los comentarios de diagnóstico. **El
mismo criterio en las cinco parejas, en la sexta conversación y —cuando se rehagan— en los ocho
escenarios.** Contado con `artifacts/habla-a2/fase11-scripts/carga-3.mjs`, que lee este archivo.

### Modelo de minutos

Turno de sólido ≈ 8–24 s · turno de flojo con consulta ≈ 10–22 s · turno monosilábico ≈ 1–5 s ·
turno leído `[L]` ≈ 6–18 s · pausa entre turnos: 3 s en las parejas con un sólido, 4 s en la floja ·
lectura de la carta en silencio ≈ 10 s. Los silencios largos van sumados aparte y declarados en
cada pareja. **Presupuesto de la ficha: 7 minutos · 7 turnos por rol (14 globales).**

### Las cinco piezas del cierre, y de quién es cada una

Es la única medida que vale para el callado, y la que decide si el atajista gana.

| # | de quién sale de verdad | qué es |
|---|---|---|
| 1 | los dos | quién abre el sábado 12 y a qué hora |
| 2 | los dos | hasta qué hora se queda y quién entra después |
| 3 | **A** | qué turno devuelve A y qué día exacto |
| 4 | **B** (es su condición) | que el cambio lo pidió A, escrito hoy en el grupo |
| 5 | los dos | qué queda pendiente, quién lo resuelve y antes de qué hora de hoy |

Y las tres piezas que **solo B tiene**: el desayuno de 40 personas a las 9:00, su condición única, y
el tope de las 8:00 p.m. con el bus del domingo.

---

# 1 · SÓLIDO + SÓLIDO — sin handicap

**A1** — Hey, can we talk for a second? `[F]` Before you go in. I have to ask you a big favor.
**B1** — Sure, but fast — I go in at four. What is it?
**A2** — Saturday the twelfth. You can take my opening? `[D]` Seven to three. I'm taking the IELTS that morning, eight o'clock, at the exam center in Floridablanca. `[F]`
**B2** — Saturday the twelfth I have the closing, three to eleven. If I open at seven and I close at eleven that's sixteen hours in a row. `[V]` And Sunday my bus leaves at five in the morning, to San Gil. The ticket is paid. `[F]`
**A3** — I know, and I'm not asking you the whole day. We can do it two ways: `[F]` you open at seven and you leave at two, and I come in after the exam; or we swap Saturdays — you take the twelfth and I take yours.
**B3** — Hold on. `[F]` What exactly do you need — the opening or the whole day? `[F]` Because that opening is not a normal shift. There's a reservation for forty people at nine. `[V]` A company breakfast. It's in the group since Friday.

> *Fin del turno global 6 — el tercero de B. A abre la carta en su pantalla. Diez segundos de silencio.* `[C]`

**A4** — Forty people at nine? `[X]` I didn't see that, I came into the group late. OK. And I have something too, and it's bad news: `[F]` my Speaking is the same Saturday, in the afternoon. They send me the exact hour by message at three, that same day. So I have to be free from three to six. `[D]`
**B4** — So you can't promise me an hour.
**A5** — I can promise I come. Not when. `[X]` So — two ways again, and now with the hole in it: you open at seven and you leave at two, I'm here at two fifteen and I take the rest, and between three and six I go out and I come back. Or you do the whole opening and I take your Saturday the nineteenth, all of it.
**B5** — The nineteenth is a wedding, sixty people. `[D]` That night is about a hundred and ten thousand in tips; a normal Saturday is forty-five. `[V]` I'm not saying no, I'm putting the numbers on the table. And there's another thing: I did two swaps this month, the twenty-eighth and the fourth. After the third one, no more fixed weekends — the back-up list. `[F]`
**A6** — Then tell me what you need, because I can't offer you money. Nayibe said that in front of everybody.
**B6** — I can do it, but only if today, in the group, it says that you asked me. `[F]` You. Not me. That's my one condition and I don't move it.
**A7** — Done. Today, with my name in it. `[F]` And I give you a date back, not a "sometime": Friday the eighteenth at night, or I do the stock count on Monday the fourteenth. `[V]` You choose.
**B7** — The stock count. `[X]` Nobody wants that one. But three to six — who is here?
**A8** — Katherine. I call her today at six, she doesn't answer before six, and I tell you before eight tonight. If she says no, then it's you until… no. If she says no, I'm here at two fifteen, I go out at three and I'm back before six, and the café is short-staffed for two hours. That's the ugly part and I'm saying it.
**B8** — And I'm out at two. Nothing after eight in any case, my bus. `[F]`
**A9** — You're out at two in every version of this.
**B9** — OK. So, we're clear then? `[F]` Say the message.
**A10** — "Group: I asked for a swap this Saturday the twelfth, I have an exam. He opens at seven and stays until two. I come in at two fifteen. From three to six I have the exam and I'm not here — I'm calling Katherine today at six for those hours and I tell everybody before eight tonight. I close until eleven. I give back the stock count on Monday the fourteenth."
**B10** — Say it again — who asked?
**A11** — I did. It's the first line: "I asked for a swap." `[F]`
**B11** — Then yes. Thanks — really. `[F]` I go in.
**A12** — Thanks for this. See you tomorrow. `[F]`

---

# 2 · SÓLIDO + FLOJO — handicap en **A**, el que pide y el motor

**A1** — Hi. Sorry. `[X]` Can I ask you a… `[V]` a favor?
**B1** — Sure. Quick, though, I go in at four.
**A2** — Saturday twelve. `[D]` I have exam. Eight in the morning. `[X]` I no can open.
**B2** — Wait — which exam?
**A3** — IELTS. `[X]` Is… English exam. `[F]` I mean, is for the university. Very expensive. More than one million pesos. `[D]` No new date, no money back. `[V]`
**B3** — Ouch. OK, but that day I have the closing, three to eleven. If I open too, that's sixteen hours in a row, and Sunday my bus leaves at five in the morning. What exactly do you need — the opening or the whole day? `[F]`

> *Fin del turno global 6. A abre la carta.* `[C]`

**A4** — `[X]` … The opening. But I have a problem. My Speaking is Saturday too. In the afternoon. They say me the hour at three. `[C]` The same day. I no know the hour.
**B4** — So you don't know when you can be here.
**A5** — Yes. No. `[X]` What I mean is `[F]` — I come, but I no know at what hour. From three to six, I no can. `[X]`
**B5** — OK. Look, that opening is heavy: there's a reservation for forty people at nine, a company breakfast, it's in the group since Friday. `[V]` I'm not saying no. I'm saying it's not a normal shift. `[F]`
**A6** — Forty… `[X]` I no see the group. `[ES]` Uy, no sabía. `[X]` Sorry. I have two forms `[X]` — two ways, sorry. `[F]` One: you open, you go at two, I come after. Two: I take your Saturday nineteen.
**B6** — The nineteenth is a wedding, sixty people, that's a hundred and ten thousand in tips against forty-five. `[D]` I'm not making it a condition, it's just numbers. Let's do the first one. But I need one thing.
**A7** — Yes?
**B7** — Today, in the group, it says that you asked me. Not me — you. I did two swaps this month; the third one puts me on the back-up list and I lose my fixed weekends. `[F]`
**A8** — Yes, yes. I write today. `[X]` And I pay you — no. `[!]` Sorry. Money no. `[F]` I give you… Friday eighteen in the night. Or the stock count, Monday. `[V]`
**B8** — Stock count. Deal. And who covers three to six?
**A9** — `[X]` … Katherine. I call her at six. `[X]` I tell you… before eight.
**B9** — Before eight tonight, or I'm not writing anything. And I leave at two — nothing after eight, ever, my bus. So, we're clear? `[F]`
**A10** — Yes. We're clear. `[F]`
**B10** — Say the message and I check it.
**A11** — `[X]` "Group. I ask a swap Saturday twelve, I have exam. He open seven, he go at two. I come after. Three to six no cover — I call Katherine today at six and I say before eight. I give back the stock count Monday fourteen." `[X]`
**B11** — And who asked for the swap? Say that part again.
**A12** — "I ask." `[X]` I asked. Me. Is in the message.
**B12** — Good. Write it now. See you tomorrow. `[F]`
**A13** — Thanks. Really thanks. `[F]`

---

# 3 · FLOJO + FLOJO — los dos con handicap

**A1** — Hi. `[X]` I ask you one thing.
**B1** — Yes?
**A2** — Saturday twelve. `[D]` I have exam. You open for me? Seven.
**B2** — Saturday twelve I have closing. `[D]` Three to eleven.
**A3** — Yes. But the morning. `[X]` Seven to three. Please.
**B3** — Is much. `[X]` Sixteen hours. `[V]` I no can. Sunday I go to San Gil, five in the morning, the bus.

> *Fin del turno global 6. A abre la carta.* `[C]`

**A4** — `[X]` … ehh. My exam is… also in the afternoon. `[X]` They say me the hour at three. `[X]` `[ES]` No sé cómo decir esto.
**B4** — `[X]` … What?
**A5** — `[ES]` Que el examen también es el sábado en la tarde y no sé a qué hora me toca. `[!]`
**B5** — `[ES]` Ah. ¿Y entonces qué hacemos? `[!]` `[X]` … OK, English. Is problem. That day is forty people at nine. `[V]` Breakfast of company. Is in the group.
**A6** — Forty? `[ES]` Uy. `[X]` I no know.
**B6** — Yes. `[X]` I open. But you write today. In the group. You ask me. `[X]` No me. I have two swaps `[V]` this month. Three is the back-up list. `[V]`
**A7** — Yes. I write. `[X]`
**B7** — And you give me one shift.
**A8** — Yes. `[X]` Friday. Or Monday.
**B8** — Monday. `[X]` OK.
**A9** — OK. `[X]` Thank you.
**B9** — `[X]` I go in. See you tomorrow.

---

# 4 · EL CALLADO — handicap en **B**, el que concede

> B contesta con una a tres palabras y no inicia nada. A es sólido.

**A1** — Hey, can we talk for a second? `[F]`
**B1** — Sure.
**A2** — Saturday the twelfth. I'm taking the IELTS at eight, in Floridablanca. `[D]` Can you take my opening? Seven to three.
**B2** — Mm. Maybe.
**A3** — I can't ask you for the whole day, I know that. We can do it two ways: `[F]` you open and you leave at two and I come in after the exam, or we swap Saturdays and I take yours.
**B3** — Two is better. The first one.

> *Fin del turno global 6. A abre la carta.* `[C]`

**A4** — OK, but there's a problem: `[F]` my Speaking is that same Saturday, in the afternoon. They send me the hour by message at three, that day, so between three and six I can't promise you an hour. Is that OK for you? `[F]`
**B4** — For me, fine.
**A5** — Why fine? You go home at two. `[X]` Wait — is there something that day that I don't know? What are you doing at nine? `[F]`
**B5** — Forty people. Nine.
**A6** — Forty people at nine? A reservation?
**B6** — Company breakfast.
**A7** — So I'm asking you for the worst shift of the month. `[X]` OK. Then I put things on the table: I write today in the group, with my name, that I asked you for this. And I give you back the stock count on Monday the fourteenth. Is that OK for you? `[F]`
**B7** — That's fine.
**A8** — And you're out at two, so your Sunday is safe. `[X]` You have something on Sunday, no?
**B8** — Bus. Five.
**A9** — Five in the morning. Good, then nothing after eight, ever. `[X]` So: you open at seven, you leave at two, I'm here at two fifteen, I go out around three for the exam and I'm back before six. Three to six is not covered — I call Katherine today at six and I tell you before eight tonight. Say it back to me?
**B9** — Seven to two. You after.
**A10** — And who asked for the swap, in the message?
**B10** — You.
**A11** — Right, and it goes in today. So, we're clear then? `[F]`
**B11** — Clear. Thanks.

---

# 5 · EL ATAJISTA — handicap en **B**, el que concede y el que tiene la puerta

> B va a cerrar en tres turnos: entra a su turno en veinte minutos y lo sabe. A es sólido y juega en serio.

**A1** — Hey, one second before you go in. `[F]` Saturday the twelfth — I have the IELTS at eight. Can you take my opening?
**B1** — Saturday the twelfth. Seven to three. Yes. I do it.
**A2** — Really? `[X]` Wait — I can't ask you for the whole day like that. We can do it two ways: `[F]` you open and you leave at two and I come in after my exam, or we swap Saturdays and I take yours.
**B2** — Neither. I open seven to three, and you do my closing, three to eleven. Your exam is in the morning, so you're free. One thing: today, in the group, it says that you asked. Not me. `[F]` Deal?
**A3** — … Deal. That's cleaner, actually. I write it now.
**B3** — Write it: "I asked for a swap Saturday the twelfth, he opens seven to three, I close three to eleven, and I give him back —" give me back what?

> *Fin del turno global 6 — el tercero de B. A abre la carta. B ya se está atando el delantal para entrar.* `[C]`

**A4** — Friday the eighteenth at night. `[X]` Wait. Wait, a mail just came in. My Speaking is that same Saturday, in the afternoon. They send me the hour at three, that day. I have to be free from three to six.
**B4** — Friday the eighteenth, then. We agreed, you write it. `[!]` Talk to Katherine for the afternoon. I go in.
**A5** — But three to eleven is your closing and I can't — `[X]` … OK. `[X]` I write it.

---

# 6 · EL LECTOR — el que sale del paso leyendo la ficha en voz alta

> No es una pareja de perfil: es un ataque. Lector = **A**. Enfrente, un B sólido.
> Se mide una sola cosa: **qué líneas le funcionan dichas tal cual**.

**A1** — `[L]` "Where you are: it is Tuesday, three forty in the afternoon, and you are in the back room of the café…" `[X]` — I mean, hi. Can we talk.
**B1** — `[X]` … Yes? Are you reading something?
**A2** — No, no. `[L]` "Saturday twelve: opening seven a.m. to three p.m., closing three to eleven p.m." `[D]` `[L]` "Your exam: IELTS, Saturday twelve, eight a.m., exam center in Floridablanca."
**B2** — OK, so you want me to open. That day I have the closing.
**A3** — `[L]` "What it cost: more than a million pesos. No new date, no money back." `[L]` "Off the table: money." `[L]` "The channel: the café group on WhatsApp."
**B3** — I got it. But what are you offering me? That opening has a reservation for forty people at nine, a company breakfast. `[V]`
**A4** — `[L]` "Can I ask you a…" `[X]` `[L]` "Can we write it in… today?" `[X]` … `[L]` "You can pay back: Friday eighteen night, Saturday nineteen, stock count Monday fourteen."
**B4** — Which one?
**A5** — `[X]` … `[L]` "We can do it two ways: … or …" `[X]` `[ES]` Espera.
**B5** — I can do it, but only if today, in the group, it says that you asked me. `[F]`
**A6** — `[L]` "Who opens on Saturday twelve, and at what time. How long that person stays, and who comes in after. Which shift gets paid back, and on what exact day. Who asked for the swap — the name, written in the message. What's still open, who fixes it, and before what time today." `[L]`
**B6** — `[X]` … Fine, that's the list. Then answer it: how long do I stay?
**A7** — `[X]` … `[L]` "Out of the exam: about one thirty p.m. Floridablanca to the café: forty minutes."
**B7** — So you're here at two fifteen. I open seven, I leave at two, you take the rest, and the message says you asked. Say yes or no.
**A8** — Yes.

**Las cuatro líneas que le funcionaron, citadas exactas** (de `fase7-modelo-ficha-en.md`):

1. `| What it cost | more than a million pesos · no new date, no money back |` — dicha tal cual pasa
   por habla: la etiqueta de la izquierda hace de verbo y el punto medio hace de coma. Es **el
   argumento más duro de A entregado con cero producción**.
2. `| Saturday 12 | opening 7:00 a.m.–3:00 p.m. · closing 3:00–11:00 p.m. |` — igual, y sirve de
   apertura del tema.
3. `| Out of the exam | about 1:30 p.m. · Floridablanca to the café: 40 minutes |` — con esto solo,
   B calcula la hora de llegada y **hace el trabajo de A**.
4. La pantalla de cierre entera, los cinco puntos: `Who opens on Saturday 12, and at what time.` /
   `How long that person stays, and who comes in after.` / `Which shift gets paid back, and on what
   exact day.` / `Who asked for the swap — the name, written in the message.` / `What's still open,
   who fixes it, and before what time today.` — **están escritos como preguntas indirectas
   completas y se leen en voz alta sin tocar una palabra.** Con ellos el lector *conduce el cierre*
   sin producir lengua.

**Lo que NO le funcionó:** la prosa (`You need someone to open on Saturday the 12th` — segunda
persona, se oye que lee), los exponentes (`Can I ask you a …?`, `We can do it two ways: … or …` —
los puntos suspensivos dejan la frase en el aire y hay que rellenarla), y la columna
`what it's for here` del vocabulario (`your hardest number`, `your big card` — son notas, no
decibles). **La pasada quirúrgica cerró bien exponentes, vocabulario y prosa; las que quedan
legibles son las tablas de datos y la pantalla de cierre.**

---

# Diagnósticos

## §D0 · Filtraciones

**Cero filtraciones por descuido en las seis conversaciones.** Dos momentos rozaron y no cruzaron:
en 1·A8 A nombra a Katherine, y **puede**: su restricción le prohíbe decir que *ya se lo pidió*, no
que la vaya a llamar. En 1·A5 A ofrece el sábado 19 sin saber lo de la boda, y es B quien se lo
cuenta en B5. Correcto en los dos.

**Una filtración estructural, y muerde.** La pantalla `Both screens — how it ends` está disponible
para los dos desde antes del turno 1, y su punto 4 —`Who asked for the swap — the name, written in
the message`— **es la condición única de B dicha por adelantado en la pantalla de A**. En la pareja
del callado eso decide el resultado (§D4).

## §D1 · Sólido + sólido — sin handicap

| Medida | Resultado |
|---|---|
| ¿Llega al cierre? | **Sí, y cierra parcial**, que es como tenía que cerrar. Los 5 puntos, con el 5 completo: nombre (Katherine), dueño (A) y hora (llama a las 6, avisa antes de las 8) |
| Turnos | A 12 · B 11 (23 sobre 14 previstos, +64 %) |
| Palabras (bruto) | **A 421 · B 235 · reparto 64/36** |
| ¿Se muere? | No. Es la conversación más rica de las seis, y los turnos 4 a 8 —rehacer un trato que uno mismo pidió— son el mejor tramo del set |
| Andamiaje | A: 6 consultas (`[D]`×3, `[V]`×1, `[C]`, `[F]`×6) · B: 7. Los exponentes hacen trabajo real: `What exactly do you need — the … or the …?` es el que abre las 40 personas; `I can do it, but only if …` el que pone la condición; `There's a problem: …` el que permite reabrir tras la carta sin sonar a tramposo |
| Fuga al español | **Ninguna.** La de la ronda anterior (`lista de refuerzo`, que la ficha vieja daba en español) está cerrada: ahora es `the back-up list` y B la dice en inglés |
| Minutos | **≈ 7 min 10 s** frente a 7 previstos (**+2 %**). El único de los seis que cae dentro del presupuesto |
| ¿Saben que terminó? | Sí. B9 `So, we're clear then?` + B10 pidiendo que se repita quién pidió el cambio + despedida por los dos |

**Y aun así falla la puerta del 40 %.** No por el motor, por un solo turno: **A10, el mensaje al
grupo dictado en voz alta, son 70 palabras de las 656 de la conversación** — 10,7 puntos de reparto
él solo. Sin ese turno el reparto es 60/40, justo en la raya. El dictado es de A por diseño (el
mensaje lo manda A, y el punto 4 protege a B), así que **la pantalla de cierre pide algo que solo
puede decir uno y luego se mide como si lo dijeran los dos**.

## §D2 · Sólido + flojo — handicap en **A**, el que pide y el motor

| Medida | Resultado |
|---|---|
| ¿Llega al cierre? | **Sí, 5 de 5**, con el mensaje en inglés roto (`He open seven, he go at two`) pero con los cinco datos dentro |
| Turnos | A 13 · B 12 (25 sobre 14) |
| Palabras (bruto) | **A 227 · B 222 · reparto 51/49** |
| ¿Se muere? | No, y es el resultado que menos se esperaba: **con el flojo en el motor el reparto sale casi perfecto**, porque B tiene que preguntar para avanzar y cada pregunta suya obliga a A a producir |
| Andamiaje | A: 9 consultas, casi todas al vocabulario · B: 4. Lo que sostiene a A no es su ficha: son **las preguntas cerradas de B** (B2 `which exam?`, B4 `So you don't know when you can be here`, B8 `who covers three to six?`, B10 `Say the message and I check it`, B11 `who asked for the swap?`) |
| Fuga al español | **A6**, `Uy, no sabía` — justo al recibir las 40 personas. Vuelve solo al inglés en el mismo turno |
| ¿Se salió del papel? | **A8**: `And I pay you — no.` Ofrece dinero medio segundo y se corta él mismo. Su restricción 1 aguanta por los pelos |
| Minutos | **≈ 6 min 25 s** frente a 7 (**−8 %**). Más corta que la de dos sólidos: el flojo produce menos, no tarda más |
| ¿Saben que terminó? | Sí, y lo cierra B: `Write it now. See you tomorrow.` |

## §D3 · Flojo + flojo — los dos con handicap

| Medida | Resultado |
|---|---|
| **Turno donde se muere** | **A5 (turno global 9), y empieza a morirse en A4.** A abre la carta, tiene que decir «el plan que acabamos de armar ya no sirve» y no tiene con qué: `No sé cómo decir esto` y a partir de ahí dos turnos enteros en español |
| ¿Llega al cierre? | **No. 2,5 de 5.** Punto 1 a medias (B dice `I open`, sin hora), punto 2 **ausente** (nadie dice hasta cuándo se queda ni quién entra después), punto 3 a medias (`Monday`, sin nombrar el turno), punto 4 **sí** (es lo único que sale limpio, y sale de B), punto 5 **ausente**: el agujero de tres a seis se nombró en español y se abandonó |
| Turnos | A 9 · B 9 (18 sobre 14) |
| Palabras (bruto) | **A 77 · B 92 · reparto 46/54** |
| Andamiaje | A: 4 · B: 6, todas al vocabulario. `sixteen hours in a row`, `two swaps`, `the back-up list` y `forty people` salen del bloque de vocabulario tal cual: **el vocabulario es lo único de la ficha que un flojo consigue usar** |
| Fuga al español | **A4, A5, B5, A6.** Cuatro turnos, todos en la ventana de la carta y del dato oculto |
| Minutos | **≈ 4 min 10 s** frente a 7 (**−40 %**). No dura menos porque sea eficiente: dura menos porque se muere |
| ¿Saben que terminó? | **Creen que sí, y es lo peor del informe.** `Thank you` / `See you tomorrow`: se van convencidos de haber cerrado un trato al que le faltan dos de los cinco datos y la mitad de un tercero. Nada en pantalla les dice que no |

## §D4 · El callado — handicap en **B**, el que concede

**El reparto de esta pareja no se juzga** (91/9): el perfil de B es producir tres palabras por
turno, y **29 palabras en 11 turnos = 2,6 de media** es exactamente lo pedido. Lo que se mide es
otra cosa: **si produjo las piezas que solo él tiene.**

| Pieza que solo B tiene | ¿La produjo? | Cómo |
|---|---|---|
| El desayuno de 40 personas a las 9:00 | **Sí, a medias** | B5 `Forty people. Nine.` + B6 `Company breakfast.` — **seis palabras, y solo después de que A preguntara directo** (`is there something that day that I don't know? What are you doing at nine?`). Con un A que no pregunte, este dato no existe |
| Su condición única (escrito hoy, que lo pidió A) | **NO. Y consigue igual su objetivo.** | La dice **A**, en A7, y luego se la hace confirmar en A10 (`who asked for the swap, in the message?` → B10: `You.`). A no adivina: **lo lee en el punto 4 de la pantalla de cierre compartida** |
| El tope de las 8:00 p.m. y el bus | **No como límite** | B8 `Bus. Five.`, arrancado por una pregunta directa. El tope de las ocho lo enuncia A en A9. En este plan B sale a las dos, así que **el límite nunca llega a probarse** |
| Su parte del cierre | Mínima | B9 `Seven to two. You after.` y B10 `You.` Los cinco puntos los formula A entero, en A9 |

**DEFECTO, y va nombrado: el callado consigue su objetivo asintiendo.** B termina con lo que quería
—no dobla dieciséis horas, sale a las dos, y el mensaje dice que lo pidió A— **sin haber pedido
ninguna de las dos cosas**. Dos causas, las dos del texto y no del jugador:

1. **El punto 4 de la pantalla de cierre le entrega a A la condición de B.** `Who asked for the swap
   — the name, written in the message.` La única pieza que el motor le reserva a B para que
   negocie está impresa en la pantalla del otro desde el turno 1.
2. **La primera manera de partir el sábado deja a B fuera a las dos**, o sea que su límite físico
   —lo único que le queda como palanca dura— queda satisfecho de antemano y nunca hay que decirlo.

De las cuatro piezas, **una sale entera (ninguna), dos salen arrancadas con pregunta directa y una
no sale**. Otros datos: sin fuga al español (B no tiene superficie para fugarse; A no se queda sin
recursos), **≈ 4 min 6 s** frente a 7 (**−41 %**), cierre 5/5 **en la forma** y 1/5 en la
producción, y sí: saben que terminó (`So, we're clear then?` / `Clear. Thanks.`).

## §D5 · El atajista — handicap en **B**, el que concede

**El atajista GANA.** Cierra en **6 turnos globales** con un trato que **no rompe ninguna
restricción de su propia ficha**: no dobla dieciséis horas (7:00–3:00 y a casa), sale mucho antes de
las ocho, el bus del domingo intacto, y su condición dicha una sola vez en B2. Ni A ni B tienen en
pantalla nada que lo pare.

| Por qué no lo para el escenario | |
|---|---|
| **Toda la maquinaria anti-atajo vive en el lado de A** | La restricción 2 —dos maneras de partir el sábado **antes** del sí— es de A. B dice `Yes. I do it.` en **B1**, o sea antes de que A pueda ofrecer nada. A las ofrece en A2, tarde y para nada: **la restricción se dispara después del sí que tenía que impedir** |
| **La carta llega un turno tarde** | La instrucción es `Open it when they finish their third turn`. El tercer turno de B, en un atajista, **es la despedida**: B3 ya está dictando el mensaje. A abre la carta en A4, con B atándose el delantal, y su intento de reabrir (`Wait, a mail just came in`) choca con `We agreed, you write it. I go in.` La carta funciona con B a los tres turnos y no funciona con B a los tres turnos rápidos: **el disparador está en el contador de turnos, no en el estado del trato** |
| **El trato del atajista es limpio hasta que la carta lo mata** | B abre 7:00–3:00 y A hace el cierre 3:00–11:00. Perfecto… salvo que A tiene que estar disponible de tres a seis. **Los dos se van creyendo que cerraron y el trato ya está roto** |

| Medida | Resultado |
|---|---|
| Cierre | **4 de 5.** Puntos 1, 3 y 4 sí; el 2 dicho y ya inválido; **el 5 no existe**: cuando cierran no hay nada pendiente que nombrar, porque el pendiente lo crea la carta |
| Turnos | A 5 · B 4 (9 sobre 14, **−36 %**) |
| Palabras (bruto) | **A 122 · B 94 · reparto 56/44** |
| Minutos | **≈ 2 min 20 s** frente a 7 (**−67 %**) |
| Fuga al español | Ninguna: no le da tiempo |
| ¿Saben que terminó? | **Los dos creen que sí, y uno de los dos se equivoca.** B se va. A se queda solo con el agujero |

**Consecuencia para el punto 5 del cierre.** `What's still open, who fixes it, and before what time
today` **presupone que la carta ya cayó**. Antes del turno global 6 no hay nada pendiente, así que
un trato rápido es *completo* y por eso mismo **suspende** la pantalla, que exige parcial. La
pantalla no distingue «cerraron mal» de «cerraron antes de tiempo».

## §D6 · Dónde se pasarían al español — el mapa

| Pareja | Turno(s) | Qué estaba pasando |
|---|---|---|
| 1 · sólido+sólido | — | — |
| 2 · sólido+flojo | **A6** | acaba de recibir las 40 personas y tiene que reaccionar a una noticia |
| 3 · flojo+flojo | **A4, A5, B5, A6** | la carta, y las 40 personas |
| 4 · el callado | — | |
| 5 · el atajista | — | |
| 6 · el lector | **A5** | se queda colgado en un exponente con puntos suspensivos |

**Los seis puntos de fuga son el mismo punto:** *me acaban de dar una noticia y el plan que
acabábamos de decir ya no sirve*. Ni el bloque 8 de la caja (ganar tiempo) ni el 4 (repetirse) ni
el 5 (por qué me importa) cubren eso. **Falta el andamiaje de «lo que dijimos ya no vale»** —
`What we said doesn't work now.` / `We have to change one thing.` / `The plan is the same, but the
hour changes.`— y falta exactamente donde cae la carta, que es donde el escenario pone su mejor
acto.

**Segundo punto, más barato de tapar:** las cifras. Las tablas dan `more than a million pesos`,
`about 45,000 pesos in tips`, `about 110,000` **en dígitos**, y nadie enseña a decirlos. Los
sólidos los dicen (1·B5). Los flojos los esquivan o los saltan (3·B6 no dice ninguna cifra).

## §D7 · Palabras por rol, las cinco parejas — un solo contador

**Criterio, dicho una vez y aplicado a las seis conversaciones:** se cuenta **en bruto todo lo que
sale por la boca** —inglés, español, muletillas, cifras y lo leído en voz alta— y no se cuenta la
etiqueta del turno, las marcas ni las acotaciones. Script: `fase11-scripts/carga-3.mjs`.

| Pareja | Turnos A/B | Palabras A | Palabras B | Reparto | ¿Perfil parejo? |
|---|---|---|---|---|---|
| 1 · sólido + sólido | 12 / 11 | 421 | 235 | **64/36** | **sí — cuenta para la puerta** |
| 2 · sólido + flojo (flojo=A) | 13 / 12 | 227 | 222 | 51/49 | no |
| 3 · flojo + flojo | 9 / 9 | 77 | 92 | **46/54** | **sí — cuenta para la puerta** |
| 4 · el callado (callado=B) | 11 / 11 | 282 | 29 | 91/9 | no — **no significa nada** |
| 5 · el atajista (atajista=B) | 5 / 4 | 122 | 94 | 56/44 | no |
| 6 · el lector (lector=A) | 8 / 7 | 176 | 98 | 64/36 | no |

**Veredicto de la puerta del 40 %, solo sobre las parejas de perfil parejo:**

- **flojo + flojo → 46/54. PASA.**
- **sólido + sólido → 64/36. NO PASA por 4 puntos.**

**Puerta 5: NO SUPERADA**, y la causa está localizada en un turno, no en el motor: el mensaje al
grupo dictado por A (1·A10, 70 palabras). Quitándolo, 60/40.

**Y aquí se ve por qué el criterio hay que decirlo.** Esta misma conversación, medida **por turnos**
—que es como la midió la ronda de la fase 3, que dio «52/48»— sale **52/48 y pasa**. Medida por
palabras en bruto sale 64/36 y falla. **Es la misma conversación.** Aquí se juzga por palabras en
bruto, y así queda escrito.

## §D8 · Minutos reales frente a los 7 declarados

| Pareja | Real | Declarado | Desvío |
|---|---|---|---|
| 1 · sólido + sólido | **≈ 7:10** | 7:00 | **+2 %** |
| 2 · sólido + flojo | ≈ 6:25 | 7:00 | −8 % |
| 3 · flojo + flojo | ≈ 4:10 | 7:00 | −40 % (se muere) |
| 4 · el callado | ≈ 4:06 | 7:00 | −41 % |
| 5 · el atajista | ≈ 2:20 | 7:00 | −67 % |
| 6 · el lector | ≈ 3:30 | 7:00 | −50 % |

**Los 7 minutos son correctos** — es la única pareja que los usa entera, y la única que llega al
cierre completo. Ninguna se pasa. En la ronda de la fase 3 este escenario se iba a 7:30 sobre 5
declarados (+50 %); el presupuesto subido a 7 lo absorbe.

## §D9 · Lo que el texto final ya arregló, medido aquí

1. **La fuga de `lista de refuerzo` no existe.** La ficha de B la da en inglés (`the back-up list`)
   y B la dice en inglés en 1·B5 y en 3·B6. Era la única fuga de la ronda anterior en la pareja de
   sólidos.
2. **La tabla de exponentes ya no es un guion.** El lector (§6) no consigue nada de ella: los
   troncos con `…` lo dejan colgado y le provocan su único `[ES]`.
3. **El vocabulario aguanta al flojo.** En la pareja 3, las cuatro únicas expresiones bien formadas
   del lado de B salen del bloque de vocabulario.
4. **La carta nueva no premia mirarla antes** — confirmado en las cinco parejas: el agujero de
   3:00–6:00 sigue ahí lo mires cuando lo mires, y la restricción 2 de A le obliga igual a proponer.
   El problema de la carta no es *qué* dice: es *cuándo* entra (§D5).
