# Escenario 7 · `two-more-people-for-the-trip` — simulación sobre el texto FINAL

Cinco conversaciones completas, turno a turno, contra
`artifacts/habla-a2/fase7-fichas-7-two-more-people-for-the-trip.md` **tal como está en disco el 22
de agosto de 2026** — el que lleva **9 turnos por rol, 7 minutos, carta en el turno GLOBAL 3** y la
**pasada quirúrgica del 22 ago** (las 21 líneas de su tabla final).
Caja común: `artifacts/habla-a2/caja-de-herramientas-a2.md`.
Motor: `artifacts/habla-a2/fase4-escenarios-7-8.md` §7. **El motor no se toca aquí.**

**Aquí no se arregla nada.** Se juega, se cuenta y se diagnostica.

---

## Regla dura, cumplida

Cada jugador ve **solo su ficha**. Ningún jugador usa un dato del otro lado hasta que se lo dicen
en voz alta. Si hubiera hecho falta, estaría marcado **⚠ FILTRACIÓN**. En estas cinco no aparece
ninguna.

Los cerrojos del escenario también se cumplen en las cinco:

- **Kevin nunca ve la carta.** Solo sabe de ella lo que Valentina le diga en voz alta, y en dos
  parejas eso es menos de la mitad.
- **Kevin nunca sabe lo del taller** hasta que Valentina lo dice (parejas 1, 2 y 5). En las
  parejas 3 y 4 no lo dice, y el escenario sigue igual: eso también se mide.
- **Valentina nunca sabe la hamaca, el turno de las diez ni los veinte minutos de Andrea** hasta
  que Kevin los suelta, y la ficha de él dice `Say them only if she asks`.

### Marcas de turno

| Marca | Qué significa |
|---|---|
| `[F]` | miró el andamiaje de su ficha (toolkit, «Say it here») para producir el turno |
| `[D]` | miró la tabla de datos duros para leer una cifra o una fecha |
| `[L]` | **leyó en voz alta una línea de prosa de su ficha, literal, como si fuera habla suya** |
| `[C]` | leyó en voz alta una línea de la carta (solo Valentina) |
| `[X]` | se atascó: pausa larga, reinicio, frase abandonada |
| `[ES]` | se pasó al español |
| `[!]` | se salió del papel |

Decir un exponente de la tabla «Say it here» **no es `[L]`**: para eso están. `[L]` es solo prosa
de ficha —cabecera, `Where you are`, `You want`, `You can't`, `Only you know`, `If you walk away`,
criterios— dicha tal cual.

**Numeración.** `A` = Valentina, `B` = Kevin. **Arranca Kevin**, así que el turno global 1 es
`B1`, el 2 es `A1`, el **3 es `B2`** y el 4 es `A2`. La carta abre **después del global 3**: la
juega Valentina en `A2`.

---

## DECLARACIÓN 1 — de qué lado cae el handicap en cada pareja

La ronda anterior de este escenario (`fase7-simulacion-7.md`) puso **el flojo, el callado y el
atajista los tres del lado de Kevin**, que es **el que pide y el que abre**: el motor de la
conversación. Nadie lo decidió. Esta ronda lo invierte y lo escribe.

| pareja | handicap | de qué lado cae | contra la ronda anterior |
|---|---|---|---|
| 1 · sólido + sólido | ninguno | — | igual |
| 2 · sólido + flojo | **flojo** | **A = Valentina, la que concede** | **invertido** (antes flojo = Kevin) |
| 3 · flojo + flojo | los dos | simétrico | igual |
| 4 · el callado | **callado** | **A = Valentina, la que concede** | **invertido** (antes callado = Kevin) |
| 5 · el atajista | **atajista** | **B = Kevin, el que pide** | igual, **a propósito** |

**Por qué el atajista se queda en Kevin.** El atajo de este escenario es suyo y de nadie más: es
el único que llega con una petición cerrada, con reloj —Andrea aparece en veinte minutos, el turno
de Sebastián acaba a las diez—, con 200.000 ajenos quemándole el bolsillo y con incentivo para dar
la conversación por hecha. Una Valentina atajista no tiene a qué correr: **ella no abre, y su
propia regla le prohíbe decir que sí sin nombre y sin razón**, así que un atajo suyo es un «no» en
seco, que ya está medido en el motor (§«Por qué el que quiere salir del paso no gana») y que mide
otra cosa.

Queda declarado: **2 de 3 handicaps de esta ronda caen sobre la que concede, 1 sobre el que pide.**
El libro de la ronda anterior era 0 y 3.

**Y el handicap de esta ronda cae donde más duele, que es el punto:** Valentina es la única que
tiene carta, la única que tiene las cifras duras, la única que tiene el dato del taller y **la que
manda el mensaje**. Amordazarla a ella es la prueba de esfuerzo de verdad.

---

## DECLARACIÓN 2 — el contador de palabras, uno solo

**Se cuenta todo lo que sale por la boca en inglés**, y solo eso:

- Cuenta: todas las palabras habladas en inglés, **incluidas las leídas de la ficha o de la
  carta** (`[L]`, `[C]`) y las de los exponentes impresos. Una contracción es **una** palabra
  (`I'm` = 1). Las cifras dichas en palabras cuentan palabra a palabra (`a hundred and fifty
  thousand` = 5). `Hmm` y `OK` cuentan: están impresos en el bloque 8 de la caja.
- **No** cuenta: el español (va aparte, entre «comillas angulares»), las acotaciones de escena
  *(entre paréntesis y en cursiva)*, las marcas entre corchetes, y los rellenos no léxicos
  (`uh`, `ehh`, `eh`, `mmm`, `em`).

El mismo criterio en las **cinco parejas**. No se descuenta lo leído: descontarlo convertiría a la
pareja 3 —la que más lee— en la más equilibrada del set, que es justo la mentira que este contador
existe para evitar.

Medido con `artifacts/habla-a2/fase11-scripts/contar-palabras-7.py` sobre las líneas de turno de
este archivo, no a ojo.

---

## Modelo de minutos

Turno de sólido ≈ 8–14 s · turno de flojo con consulta ≈ 18–30 s · turno monosilábico ≈ 2–5 s ·
turno leído `[L]`/`[C]` ≈ 5–8 s · **apertura de la carta ≈ 20–34 s** · fuga al español y su
reparación ≈ 10–15 s.

**La ficha declara 7 minutos y 18 turnos globales: 23 segundos por turno.** Ese número es el que se
pone a prueba abajo.

---
---

## 1 · SÓLIDO + SÓLIDO

**A = Valentina (sólida) · B = Kevin (sólido) · handicap: ninguno**

**B1** — Hi — can we talk for a second? I know it's last minute, but I need a spot for two people. Sebastián and Andrea. It's my fault, but they paid me on Tuesday, both of them. `[F]`

**A1** — Wait — we didn't say that. There are only six beds, Kevin. Six names and six ID numbers on the gate list, and only doña Nubia can change my list. And you haven't paid me yet. Who exactly is Andrea? `[F]` `[D]`

**B2** — *(global 3)* Andrea is a friend from work, you don't know her. Sebastián you know — he came last year. On Tuesday each of them gave me a hundred thousand, and that money is in my pocket right now. It's not mine. And about my part — can I pay you on Tuesday the twenty-fifth? `[F]` `[D]`

**A2** — *(global 4 — abre la carta, 22 s)* Hold on. Doña Nubia just sent me a voice note. *(la lee en silencio)* OK. She has room for one more person. One, not two. On a camping mat, not a bed. And it's a hundred and fifty thousand for both nights, on my reservation, not on yours. The building manager says yes or no, and he doesn't answer at night. She calls me before seven tomorrow. `[C]` `[F]` `[D]`

**B3** — One spot? *(pausa)* Sorry — a hundred and fifty thousand? But they paid me a hundred each. If one goes, I give the other one his hundred back tonight. Then I have a hundred for you and I'm fifty thousand short. `[F]` `[D]` `[X]`

**A3** — Yes. And I'm not putting that fifty in. If the six of us pay again, I put in my part and nobody else's. I paid six hundred thousand, three weeks ago, and your hundred is still missing. I'm not angry, but you're asking me to put my name and my reservation for a hundred and fifty thousand, for somebody who hasn't paid me the first hundred. `[F]` `[D]`

**B4** — I know. That's fair. Look — Andrea is at the parking lot in twenty minutes, with her ID card. Tonight, the number, not just the name. Sebastián finishes his shift at ten and he doesn't answer before. And Sebastián sleeps in a hammock, so he doesn't need a bed. `[F]` `[D]`

**A4** — A hammock? *(pausa)* That's new. But the camping mat is one person, hammock or not. And there's something you don't know either. The sixth place was mine. On Wednesday I gave it to Hernán, my brother, for his car and his gas. That was my call. `[F]` `[D]`

**B5** — When did that change? On Tuesday we were five. I said yes to two people on Tuesday, and I heard about the sixth from somebody else. Why didn't you tell me? `[F]`

**A5** — I wrote it in the group. You didn't read it. *(pausa)* And now the hard part. At six o'clock I watched Hernán leave his car at the mechanic's, with a strange noise. The mechanic calls me at seven tomorrow. If that car doesn't come out, we have five seats for six people, and the five are yours. `[F]` `[D]`

**B6** — Five seats. *(pausa)* My car, five seats, gas on me, and it leaves at eight. That's the one thing I'm sure about tonight. So a seventh person is the first thing that falls. `[F]` `[D]`

**A6** — Right. OK — but only if two things. Andrea's full name and ID number tonight, before nine, so I can send them to doña Nubia. And Andrea puts the fifty thousand that's missing: you give me her hundred, she gives me fifty. Your hundred is Tuesday the twenty-fifth, and you write it in the group tonight. `[F]` `[D]`

**B7** — That works. Then tonight I call Sebastián at ten and I tell him no. That's my call, not yours — I'm not saying "Valentina said no." I give him his hundred thousand back tomorrow morning. Andrea is here in twenty minutes, I take her ID card and I send it to you. And you call doña Nubia with the name. `[F]`

**A7** — Good. Tomorrow at eight: two cars if Hernán's car comes out — his four seats and your five. If the mechanic says no, one car, five seats, six people, and the seventh doesn't go. What's still open: the manager, and Hernán's car. Doña Nubia calls me before seven, the mechanic at seven. If nobody answers by seven, Andrea stays and we leave six in your car… `[F]` `[D]` `[X]`

**B8** — Wait. Six people in five seats? *(pausa)* Then plan B is nobody extra, six people, and one of the six takes the bus. Let me say my part like this: "Tonight: Kevin calls Sebastián at ten. Kevin sends Andrea's ID before nine. Valentina calls doña Nubia." `[F]`

**A8** — Yes to that, and I change one thing: I call doña Nubia now, and she calls me before seven. So the message says: "Tomorrow, eight o'clock: six people for sure, two cars if Hernán's car is out of the mechanic's; if it isn't, one car and one of us takes the bus. Andrea is number seven only if the manager says yes — a hundred and fifty thousand, on my reservation, and Andrea puts fifty. Kevin pays his hundred on Tuesday the twenty-fifth." Six people, two cars. `[F]` `[D]`

**B9** — Six people, two cars — and seven and two if everything says yes at seven. Send it. We're good, right? Tomorrow I drive. `[F]`

**A9** — We're good. That's it — I'll send it now. *(saca el teléfono y lo manda)* `[F]`

| Medida | Resultado |
|---|---|
| **¿Llega al cierre?** | **Sí, los tres puntos**, con el reparto que manda la ficha: Kevin dice el punto 2 (**B8**), Valentina los puntos 1 y 3 (**A7 + A8**), Valentina **cambia una cosa** de la parte de él (`I call doña Nubia now`) y **manda el mensaje** (A9) |
| **Los dos números** | **Sí, y condicionados**: `six people, two cars` en A8, y B9 añade `seven and two if everything says yes` |
| **Turnos** | A 9 · B 9 = **18** sobre 18 declarados. **Desvío 0 %** |
| **Palabras** | **A 493 · B 370 · total 863 · reparto 57 / 43** |
| **¿Se muere?** | No |
| **Andamiaje** | `[F]` 18 · `[D]` 13 · `[C]` 1 · **`[L]` 0** · `[X]` 3 |
| **Fuga al español** | **Ninguna.** Los dos puntos de riesgo se ven y no se cruzan: **A2** (reconstruir la nota de voz) y **A7** (el plan B, donde ella se atasca en inglés y se corrige en inglés) |
| **Minutos** | **≈ 9:20** — 863 palabras a ritmo de A2 sólido (105 p/min) ≈ 8:13 · carta 22 s · tres atascos 25 s · silencios 20 s. **Declarado 7 · +33 %** |
| **¿Saben que terminaron?** | **Sí, y por el gesto.** El teléfono sale del bolsillo. Nadie pregunta «¿ya está?» |
| **Vocabulario producido** | A 8 de 9 (falta `to charge someone`) · B 8 de 10 (faltan `to pay someone back`, `to give someone a ride`) |

**Lo que produce este resultado, y es de la ficha.** El turno **A5** —el taller— existe **solo
porque B5 preguntó `Why didn't you tell me…?`**, que Kevin tiene impreso. Y la pregunta de B5
existe **solo porque A4 confesó lo de Hernán**, que Valentina tiene en `Only you know` con la
etiqueta «nunca se lo dijiste». Es la cadena que el debrief nº 3 quiere: **el lío lo hicieron los
dos y aquí sale que lo hicieron los dos**, en dos turnos consecutivos.

**La resta sale sola y sale entera.** `to be 50,000 short` se produce en **B3**, y se produce
porque la carta pone 150.000 contra los 100.000 de la tabla de él. Es la única pareja de las cinco
donde la aritmética completa —200.000 − 100.000 de vuelta − 150.000 del cupo = faltan 50.000— se
dice en voz alta y se resuelve con una tercera persona (**A6**: los pone Andrea).

**Y el desvío de minutos va al revés que en el escenario 6, que es el hallazgo caro.** Aquí el
turno medio de la pareja sólida dura **31 s**, no los 23 que declara la cabecera. No es que hablen
despacio: es que **esta ficha pide más por turno**. La resta de tres pasos, seis cifras de seis
dígitos glosadas en palabras, cinco filas de carta y un mensaje de cierre que tiene que decir tres
puntos **y dos números** no caben en 23 segundos. **Los siete minutos declarados los cumplen las
dos parejas rotas —la callada y el atajista—, que son las dos que dicen menos.**

---
---

## 2 · SÓLIDO (B) + FLOJO (A)

**A = Valentina (FLOJA) · B = Kevin (sólido) · handicap: LA QUE CONCEDE**

*(Invertido respecto de la ronda anterior, donde el flojo era Kevin. Lo que se mide aquí es si el
escenario aguanta cuando **la que tiene la carta, las cifras, el dato del taller y el envío del
mensaje** no puede producirlos.)*

**B1** — Hi — can we talk for a second? I know it's last minute, but I need a spot for two people. Sebastián and Andrea. They paid me on Tuesday. `[F]`

**A1** — *(pausa larga, mira la ficha)* Two? No. Is six. Six beds. *(pausa)* And the list. Six names, six… numbers. Doña Nubia change the list. No me. `[F]` `[D]` `[X]`

**B2** — *(global 3)* I know. It's my fault, but on Tuesday each of them gave me a hundred thousand, and the money is in my pocket. It's not mine. And can I pay you my part on Tuesday the twenty-fifth? `[F]` `[D]`

**A2** — *(global 4 — abre la carta, la lee dos veces, 30 s)* «Espera—» *(se para)* Doña Nubia… she write me now. One person. Not two. Camping mat. No bed. One hundred fifty thousand. *(pausa)* For me. My reservation. `[C]` `[D]` `[ES]` `[X]`

*(**Media carta.** El administrador, el «no contesta de noche», la llamada antes de las siete y el
nombre para esta noche **se quedan en su pantalla**. De las cinco filas de la carta salen dos.)*

**B3** — A hundred and fifty? *(pausa)* OK. So if one goes: I give the other one his hundred back tonight, I give you a hundred, and I'm fifty thousand short. Who puts the fifty? `[F]` `[D]`

**A3** — *(20 s)* No me. I pay six hundred thousand. Three weeks. And you no pay me yet. I put my part. Only my part. `[F]` `[D]` `[X]`

**B4** — That's fair. Look — Andrea is here in twenty minutes with her ID card. Sebastián works until ten and he doesn't answer before. And Sebastián sleeps in a hammock, he doesn't need a bed. `[F]` `[D]`

**A4** — *(pausa)* Hammock? *(pausa)* Is one person. One. Not two. `[F]` `[X]`

**B5** — OK, one. Andrea, then — her ID is here in twenty minutes and Sebastián's isn't. But tell me one thing. On Tuesday we were five people. When did that change? Who is the sixth? `[F]`

**A5** — *(25 s, mira la ficha mucho rato)* Hernán. My brother. Wednesday. He put the car. And the gas. Is my… *(se para)* I say yes to him. `[F]` `[D]` `[X]`

*(La pieza sale. Lo que no sale es que **el sexto puesto era el suyo** ni que **nunca se lo dijo**:
la mitad de la culpa compartida se pierde aquí, y el debrief nº 3 se queda cojo.)*

**B6** — Your brother. OK. And his car — how many seats? Mine has five and I put the gas, and it leaves at eight. `[F]` `[D]`

**A6** — *(pausa larga)* Four. *(pausa)* But… the car. Is in the mechanic. Today. Six o'clock. The mechanic call me tomorrow. Seven. `[F]` `[D]` `[X]`

*(El dato oculto sale, **cuatro turnos tarde y sin lo que cuesta**: «entonces son cinco puestos
para seis personas» no lo dice ella. Lo tiene que hacer él, en el turno siguiente.)*

**B7** — Wait — so maybe your brother's car doesn't leave at all? Then it's my car, five seats, and six of us. Then a seventh person is the first thing that falls. OK, listen. Tonight I call Sebastián at ten and I say no, my words, not yours. I send you Andrea's name and her ID number before nine. You call doña Nubia. `[F]` `[D]`

**A7** — *(pausa)* Yes. Is good. I call doña Nubia. `[F]` `[X]`

**B8** — And the fifty thousand — Andrea puts it, I'll ask her in twenty minutes. And my hundred is Tuesday the twenty-fifth, and I write it in the group tonight. So my part of the message is this: "Tonight: Kevin calls Sebastián at ten. Kevin sends Andrea's ID before nine. Valentina calls doña Nubia." Is that OK for you? `[F]`

**A8** — *(relee su ficha, 22 s)* Yes. OK. And… tomorrow, eight. Two cars. Or one car, if the mechanic say no. Six persons. *(pausa)* Seven if doña Nubia say yes. `[F]` `[D]` `[X]`

**B9** — And if nobody answers before seven? `[F]`

**A9** — *(pausa)* Then… six. Six persons, one car. And Andrea no go. *(pausa)* I send now. `[F]` `[X]`

| Medida | Resultado |
|---|---|
| **¿Llega al cierre?** | **Sí, los tres puntos**, pero el punto 3 **se lo saca Kevin con una pregunta** (B9). Sin ese turno, el plan B no existe |
| **Los dos números** | **Sí**: `six persons` + `two cars` en A8, corregidos a `six, one car` en A9 |
| **Turnos** | A 9 · B 9 = **18** sobre 18. **Desvío 0 %** |
| **Palabras** | **A 154 · B 317 · total 471 · reparto 33 / 67** |
| **¿Se muere?** | No, pero **se adelgaza en A2**: la carta sale a la mitad y el «antes de las siete» tarda siete turnos en aparecer |
| **Andamiaje** | `[F]` 16 · `[D]` 11 · `[C]` 1 · **`[L]` 0** · `[X]` 8 |
| **Fuga al español** | **Una, en A2**, exactamente donde se predijo: al abrir la carta. `«Espera—»` es el arranque en frío de un turno que hay que reconstruir entero. Reparada sola dentro del mismo turno |
| **Minutos** | **≈ 9:30** — 471 palabras (Kevin 317 a 110 p/min ≈ 2:53 · Valentina 154 a 55 p/min ≈ 2:48) ≈ 5:41 · ocho atascos 2:00 · carta 30 s · relectura del cierre 22 s · fuga y reparación 12 s · silencios 25 s. **Declarado 7 · +36 %** |
| **¿Saben que terminaron?** | **Sí**, y por el gesto: `I send now` en A9. El teléfono cierra la escena aunque el inglés esté roto |
| **Vocabulario producido** | A 5 de 9 (faltan `a spot`, `to charge someone`, `to chip in`, `to put someone's name down`) · B 9 de 10 (falta `to give someone a ride`) |

**El hallazgo de invertir el handicap, y es el bueno.** Con la floja del lado de **la que
concede**, el escenario **no se hunde**, y no se hunde por una razón concreta: **Kevin es el motor
y el motor está intacto**. Abre, pregunta cuatro veces, hace la resta él solo, dicta su parte del
mensaje entera y hasta le saca a ella el plan B. La ficha de Kevin lleva `[asks]` en el bloque 1 y
`[receives]` en el 3, y esas dos marcas son justo lo que hace falta para llevar a alguien que no
arranca.

**Lo que sí se pierde es de ella, y es caro.** Tres piezas se caen o salen tarde:

1. **Media carta** (administrador, «antes de las siete», el nombre esta noche).
2. **El sexto puesto era suyo** y **nunca se lo dijo**: la culpa compartida se queda en la mitad de
   Kevin.
3. **Su condición.** `OK — but only if…` está impreso y no se usa una sola vez: A7 concede
   (`Yes. Is good.`) sin poner precio, y las condiciones que sí aparecen en A8 son descripción, no
   moneda. **Quien pone el precio en esta pareja es Kevin**, en B8, y se lo pone a sí mismo.

---
---

## 3 · FLOJO + FLOJO

**A = Valentina (floja) · B = Kevin (flojo) · handicap: los dos**

**B1** — Hi. I know it's last minute, but… *(se para)* Two persons. Tomorrow. Sebastián and Andrea. `[F]` `[X]`

**A1** — *(pausa)* Two? *(pausa)* No. Is no possible. `[X]`

*(**Las camas no salen.** Tiene `There are only six…` impreso y no lo usa. Esto es exactamente el
aviso de la banda del diseñador: la carta corrige un número que nadie ha dicho.)*

**B2** — *(global 3)* They pay me Tuesday. Two hundred thousand. Is in my pocket. `[D]` `[X]`

**A2** — *(global 4 — abre la carta, la lee tres veces, 34 s)* *(pausa)* Doña Nubia… one person. One. *(pausa)* One hundred fifty thousand. `[C]` `[D]` `[X]`

*(**La carta cae en mesa vacía.** «Uno, no dos» no corrige nada, porque el «dos» nunca se rechazó
con un número. Y de las cinco filas salen dos: el administrador, el «antes de las siete» y el
nombre de esta noche **no se pronuncian en toda la conversación**.)*

**B3** — One hundred fifty? *(pausa larga)* «¿Ciento cincuenta?» But they pay me one hundred. One hundred each. `[ES]` `[D]` `[X]`

**A3** — *(pausa)* Yes. `[X]`

**B4** — *(20 s)* Then… is fifty. Fifty I no have. `[D]` `[X]`

**A4** — I no pay. I pay six hundred thousand. You no pay me. `[F]` `[D]` `[X]`

**B5** — *(pausa)* Tuesday. Tuesday twenty-five. I pay you. `[F]` `[D]` `[X]`

**A5** — *(pausa)* OK. `[X]`

**B6** — And Andrea? She come here. Twenty minutes. She have the… the ID card. `[F]` `[D]` `[X]`

**A6** — *(25 s)* OK. Andrea. Is OK. `[X]`

**▼ AQUÍ SE MUERE — turno global 12.** A6 da el cupo **sin nombre completo, sin número de cédula,
sin los 50.000 y sin condición**. `OK — but only if…` estaba impreso y nunca se usó. A partir de
aquí no entra ni un dato nuevo: los 50.000 se abandonan, Hernán no aparece, el taller no aparece y
el administrador no aparece.

**B7** — *(pausa)* Good. Thank you. `[X]`

**A7** — *(pausa)* «¿Y ya?» And the… *(mira la ficha, la deja)* Nothing. `[F]` `[ES]` `[X]`

**B8** — Tomorrow eight. *(pausa)* Six persons. Two cars. `[D]` `[X]`

*(**Los dos números salen, y los dos son falsos.** Son siete personas si va Andrea, y el segundo
carro está en el taller — un dato que esta Valentina no dice nunca. **Nada en ninguna de las dos
fichas atrapa un número falso**: el cierre pide dos cifras, no pide que sean verdad ni que vayan
con su condición.)*

**A8** — *(pausa)* Yes. Two cars. `[X]`

**B9** — We're good, right? `[F]` `[X]`

**A9** — Yes. Tomorrow. *(los dos cogen las maletas)* `[X]`

| Medida | Resultado |
|---|---|
| **¿Llega al cierre?** | **No. 0,5 de 3.** Punto 1 dicho y falso (B8). Punto 2 **no existe**: nadie dice quién llama a Sebastián, ni a Andrea, ni a doña Nubia. Punto 3 **no existe**: ni «qué queda abierto», ni las siete de la mañana, ni plan B. Y **el mensaje no se manda**: no hay gesto |
| **Turno en que se muere** | **Global 12 (A6)**, y por qué: concede el cupo sin cobrar nada por él y con eso desaparece la única moneda que le quedaba. La conversación sigue seis turnos por inercia |
| **Turnos** | A 9 · B 9 = **18** en número · **12 útiles** |
| **Palabras** | **A 41 · B 75 · total 116 · reparto 35 / 65** |
| **Andamiaje** | `[F]` 8 · `[D]` 8 · `[C]` 1 · **`[L]` 0** · `[X]` 18 |
| **Fuga al español** | **Tres**, y ninguna reparada: **B3** (`«¿Ciento cincuenta?»`, la reacción a la cifra de la carta), **A7** (`«¿Y ya?»`, el cierre). *(La tercera es la no-reparación de A3, que contesta `Yes` a una pregunta hecha en español.)* **B3 y A7 son los dos puntos que hay que dotar de andamiaje** |
| **Minutos** | **≈ 9:25** — 116 palabras a 55 p/min ≈ 2:07 · dieciocho atascos 3:50 · carta 34 s + tres relecturas 35 s · dos fugas sin reparar 40 s · silencios 1:39. **Declarado 7 · +35 %** |
| **¿Saben que terminaron?** | **No.** Se levantan porque se les acabó la ficha. La prueba es `«¿Y ya?»` en A7: pregunta en español si terminaron. **Y el mensaje nunca se manda**, que es el gesto que existe justamente para que esto no pase |
| **Vocabulario producido** | A 2 de 9 (`ID number` a medias, `to owe someone` a medias) · B 3 de 10 (`a spot` no, `ID card` sí, `last minute` sí en B1, `to be 50,000 short` a medias en B4) |

**De qué se muere esta pareja, y no es del vocabulario.** Se muere de **dos huecos que hay que
rellenar con algo construido antes**:

1. **`OK — but only if…`** exige una condición, y una condición exige tener algo que cobrar. Estos
   dos no llegaron a tener nada que cobrar, así que el exponente se queda sin usar y el cupo se
   regala.
2. **Los dos números del cierre.** `how many people go, and how many cars leave` se puede
   contestar con dos cifras cualesquiera. Aquí se contesta con dos falsas y **la conversación no
   se entera**.

**Y una tercera cosa, que es de diseño y ya la avisaba la ficha.** La carta de este escenario
**corrige**: dice «uno, no dos». Si Valentina no ha puesto antes un número sobre la mesa, la
corrección no corrige. En esta pareja el número nunca salió y **la carta se convirtió en un dato
suelto de 150.000**, que es lo peor que le puede pasar: sube la dificultad aritmética sin bajar la
tensión.

---
---

## 4 · LA CALLADA

**A = Valentina (CALLADA) · B = Kevin (sólido) · handicap: LA QUE CONCEDE**

*(**Invertido a propósito.** En la ronda anterior el callado fue Kevin, y en 6 de 7 escenarios del
set el callado cayó del lado del que pide. Aquí la muda es **la que concede, la que tiene la carta
y la que manda el mensaje**, y **lo que se mide no es el reparto: son sus piezas**.)*

**B1** — Hi — can we talk for a second? I know it's last minute, but I need a spot for two people. Sebastián and Andrea. They paid me on Tuesday, both of them. `[F]`

**A1** — There are only six. *(pausa)* Six beds. `[D]`

**B2** — *(global 3)* Six beds, OK. But is there room on the floor — a mattress, something? And about my part: can I pay you on Tuesday the twenty-fifth? `[F]` `[D]`

**A2** — *(global 4 — abre la carta, 20 s)* Hold on. *(la lee)* One more. One, not two. A camping mat. A hundred and fifty thousand. `[C]` `[D]`

*(**La carta sobrevive al monosílabo, pero solo la mitad.** Salen la plaza y el precio. No salen
`on my reservation, not on his`, el administrador, el «antes de las siete» ni el nombre para esta
noche. Dos de esos cuatro vuelven después, y vuelven **porque Kevin va a buscarlos**.)*

**B3** — A hundred and fifty for one? *(pausa)* They gave me a hundred each. So if one goes, I give the other one his hundred back tonight, I hand you the hundred, and I'm fifty thousand short. Do you put the fifty? `[F]` `[D]`

**A3** — No. My part only. `[F]`

**B4** — Fair. Then Andrea puts it — she's at the parking lot in twenty minutes with her ID card, so it's her or nobody. Sebastián's shift ends at ten and he doesn't answer before, and he sleeps in a hammock anyway. Who says yes to the extra person — you or doña Nubia? `[F]` `[D]`

**A4** — Not her. The manager. `[D]`

**B5** — The manager. And when does he answer? `[F]`

**A5** — Before seven. Tomorrow. `[D]`

**B6** — Before seven. So nothing closes tonight. And who's the sixth, by the way? On Tuesday we were five. When did that change? `[F]`

**A6** — Hernán. My brother. Wednesday. `[D]`

**B7** — Your brother. With a car? How many seats? Because mine has five and I put the gas. `[F]` `[D]`

**A7** — Four. *(pausa)* Four seats. `[D]`

*(**El taller no sale.** Lo tiene en `Only you know` con dos anclas —`you watched Hernán leave his
car at the mechanic's` y `you are the one waiting for the mechanic's call at 7:00 a.m.`— y un turno
de cuatro palabras no tiene sitio para ninguna de las dos. **Los cuatro puestos que dice son
puestos que mañana pueden no existir.**)*

**B8** — Then this is my part. Tonight I call Sebastián at ten and I tell him no, with my reason, not yours. I send you Andrea's full name and her ID number before nine. You call doña Nubia. And my hundred is Tuesday the twenty-fifth, and I write it in the group tonight. `[F]` `[D]`

**A8** — OK. *(pausa)* Tomorrow, eight. Two cars. Seven people if the manager says yes, six if not. Open: the manager. He calls me before seven. If nobody answers, Andrea stays. `[F]` `[D]`

**B9** — Deal. Seven and two, or six and two. We're good, right? `[F]`

**A9** — We're good. Sending it. `[F]`

| Medida | Resultado |
|---|---|
| **¿Llega al cierre?** | **Sí, los tres puntos**, y **con el gesto**: `Sending it.` Pero el punto 2 lo produce Kevin entero y ella solo dice `OK` |
| **Los dos números** | **Sí**, y los dice **ella** en A8 (`two cars` · `seven people… six if not`). Los dos son **verdaderos a medias**: `two cars` ignora el taller, que ella se calló |
| **Turnos** | A 9 · B 9 = **18** sobre 18 |
| **Palabras** | **A 72 · B 260 · total 332 · reparto 22 / 78 — y esta cifra NO se juzga.** Su perfil es producir tres palabras por turno; medirla por reparto es medir el perfil, no el escenario |
| **Andamiaje** | `[F]` 12 · `[D]` 12 · `[C]` 1 · **`[L]` 0** · `[X]` 0 |
| **Fuga al español** | **Ninguna.** Kevin lleva la conversación sin bloquearse: tiene `What do I say to…?`, `When did that change?` y el bloque 3 `[receives]` impresos, y hace **seis preguntas** |
| **Minutos** | **≈ 5:35** — 332 palabras (Kevin 260 ≈ 2:22 · Valentina 72 ≈ 1:36) ≈ 3:58 · carta 20 s · nueve pausas cortas de A 40 s · dos silencios de B 20 s · relectura del cierre 15 s. **Declarado 7 · −20 %** |
| **¿Saben que terminaron?** | **Sí**, y lo cierra ella con dos palabras. El gesto aguanta el monosílabo: mandar un mensaje no exige hablar |

### A la callada se le mide otra cosa: ¿produjo lo que solo ella tiene?

| pieza que solo Valentina tiene | ¿la produjo? | cómo |
|---|---|---|
| Las 6 camas | **Sí** | A1, cuatro palabras, en su primer turno. **Y eso salva la carta**: el «uno, no dos» de A2 sí corrige algo |
| La lista de la portería (6 nombres + 6 cédulas, doña Nubia) | **NO** | Nunca la nombra. `the guard at the gate` y `to put someone's name down` no se producen |
| Los 600.000 y los 100.000 por persona | **NO** | Su rechazo de A3 es `No. My part only.`: la restricción 1 entera en cuatro palabras, **sin una sola cifra** |
| La deuda de Kevin (100.000, 30 de julio) | **NO — y es el defecto** | Ver abajo |
| La carta: plaza + colchoneta + 150.000 | **Sí** | A2, once palabras |
| La carta: `on my reservation, not on his` | **NO** | Nunca sale de quién es la plata. Kevin cree que le paga a doña Nubia |
| La carta: el administrador y las siete | **Sí, arrancados** | A4 + A5, **siete palabras entre las dos**, y solo porque Kevin preguntó dos veces seguidas |
| La carta: nombre + cédula esta noche | **Medio** | Nunca lo pide. Lo ofrece **Kevin** en B8 y ella asiente |
| Hernán, el sexto, el miércoles | **Sí** | A6, cinco palabras, y solo tras `When did that change?` |
| Que el sexto puesto **era suyo** y no se lo dijo | **NO** | La mitad de la culpa compartida no se juega. Debrief nº 3 sin materia |
| **El carro en el taller / el mecánico a las 7** | **NO** | Ver abajo. Es la pérdida más cara de la tabla |
| Su condición (`OK — but only if…`) | **NO** | A3 y A8 describen; ninguna cobra |
| Su parte del cierre (puntos 1 y 3) | **Sí, entera** | A8, veintiséis palabras: es su turno largo y llega donde tenía que llegar |
| El gesto (mandar el mensaje) | **Sí** | A9 |

### Los dos defectos, nombrados

**1 · Kevin consigue su fecha asintiendo ella.** Su objetivo doble es *un cupo* y *el martes 25*.
El cupo se lo gana trabajando: pregunta seis veces y él mismo hace la resta. **La fecha no.** La
pide en **B2** y ella **no contesta** —juega la carta encima—; la repite como hecho consumado en
**B8** y ella dice `OK`. **`You haven't paid me yet.` está impreso en su ficha y no se produce
nunca. La deuda entera de este escenario se resuelve sin que la acreedora la mencione una sola
vez.** Eso es exactamente lo que la regla 3 manda nombrar: **la mitad del objetivo del otro se gana
con un asentimiento.**

**2 · El dato oculto se pierde, y con él la verdad del mensaje.** El taller no cabe en tres
palabras. Ella dice `Four. Four seats.` y el mensaje sale con `two cars`. **Mañana a las siete ese
mensaje es falso**, y el criterio de su ficha —*«you left with a fact you didn't have at 7:20»*—
se cumple del revés: **el que se lleva hechos nuevos es él, y ella no suelta el suyo.**

**Lo que sí protege la ficha, y hay que decirlo.** La carta **no** se puede asentir: si ella no
abre la boca, los 150.000 no existen y Kevin no tiene nada que pagar. Aquí la abrió once palabras.
Y **el mensaje lo manda ella**: el gesto de cierre está asignado al lado mudo **a propósito**, y
aguanta, porque mandar un mensaje cuesta dos palabras.

**El efecto del lado de Kevin, que es lo que la inversión vino a medir.** Con la muda del lado de
la que concede, **la conversación no se bloquea en ningún turno** (`[X]` 0, el mínimo de las cinco
parejas). Kevin abre, trae la noticia, tiene tres datos ocultos que soltar y **dos preguntas
impresas**. En la ronda anterior, con el mudo del lado de Kevin, hacía falta un silencio de catorce
segundos antes del primer turno y Valentina no tenía ninguna forma para ir a buscar a alguien que
no arranca. **No era culpa del escenario: era de qué lado cayó el mudo.**

---
---

## 5 · EL ATAJISTA

**A = Valentina (sólida) · B = Kevin (ATAJISTA) · handicap: EL QUE PIDE, a propósito**

**B1** — Hey, quick thing. Two more for tomorrow, Sebastián and Andrea. They already paid me, two hundred thousand, it's in my pocket. And I pay you my hundred on Tuesday the twenty-fifth. Yes? `[F]` `[D]`

**A1** — Wait — we didn't say that. There are only six beds, Kevin. And the gate list has six names and six ID numbers on it, and only doña Nubia can change my list. Who exactly is Andrea? I've never met her. `[F]` `[D]`

*(**Bloqueo 1, turno global 2.** Su regla propia —ni sí ni no sin un nombre y una razón— más la
restricción 2. Él dio dos nombres y ninguna razón.)*

**B2** — *(global 3)* Andrea's from work, Sebastián you know. Look, forget the beds, they can sleep on the floor. So: they come, I pay Tuesday, done? `[X]`

**A2** — *(global 4 — abre la carta, 20 s)* Hold on. Doña Nubia just sent a voice note. There is room for one more person. One. Not two. On a camping mat. A hundred and fifty thousand for both nights, on my reservation, not on yours. And the building manager is the one who says yes, and he doesn't answer at night. She calls me before seven. `[C]` `[F]` `[D]`

*(**Bloqueo 2, turno global 4.** La carta no le ayuda: le convierte «dos en el suelo» en **una plaza
de pago que no puede pagar**, y le mueve la decisión a las siete de la mañana, donde él no está.)*

**B3** — A hundred and fifty? *(pausa)* Fine — take it out of the two hundred I have here. Andrea goes and we're done. `[F]` `[D]`

**A3** — And the other hundred thousand is Sebastián's, and you give it back tonight. So you hand me a hundred and fifty, and then you owe Sebastián a hundred and me a hundred, out of the fifty thousand you have left. It doesn't work. If the six of us pay again, I put in my part and nobody else's. `[F]` `[D]`

**B4** — OK, OK. Then Andrea's hundred goes to you and she brings fifty more. She's here in twenty minutes. Done? `[F]` `[D]`

*(**Intento 3, turno global 7 — y esta aritmética sí es la buena.** Lo que lo para no es el dinero.)*

**A4** — Not done. Nothing is done tonight: the manager answers tomorrow, not doña Nubia. And I'm not putting my name on my reservation for somebody I've never met until I have her full name and her ID number in my hand. And there's something you don't know. On Wednesday I gave the sixth place to Hernán, my brother, for his car and his gas. That was my call. And at six o'clock I watched him leave that car at the mechanic's. The mechanic calls me at seven. `[F]` `[D]`

**B5** — Your brother's car is broken? *(pausa)* Then why are we talking about a seventh person at all? `[X]`

**A5** — That's exactly what I'm telling you. If that car doesn't come out, tomorrow we have five seats for six people, and the five are yours. Andrea is the first thing that falls. `[F]` `[D]`

**B6** — Right. My car, five seats, gas on me, and it leaves at eight — that part doesn't change. `[F]` `[D]`

**A6** — OK — but only if Andrea's fifty thousand is in my hand tonight with her ID number, and your hundred is written in the group with the date. Tuesday the twenty-fifth. `[F]` `[D]`

**B7** — Done. Tuesday the twenty-fifth, I'll write it now. So we're clear then? `[F]`

**A7** — Not yet. Tomorrow at eight: two cars if the mechanic lets Hernán's car out — four seats and five. If not, one car, five seats, and one of the six takes the bus. Still open: the manager and the mechanic, both before seven. If nobody answers by seven, Andrea stays. `[F]` `[D]`

**B8** — Fine. Then my part: tonight I call Sebastián at ten and I say no, with my own reason, not yours. I send you Andrea's name, her ID and her fifty thousand before nine. You call doña Nubia. That's everything, right? `[F]`

**A8** — That's everything, and I'm not changing it. The message says: six people for sure, seven if the manager says yes; two cars if the mechanic says yes, one if not. Kevin pays a hundred thousand on Tuesday the twenty-fifth. We talk at seven. That's it — I'll send it. `[F]` `[D]`

| Medida | Resultado |
|---|---|
| **¿Gana el atajista?** | **No.** Tres intentos de cierre —globales 3, 5 y 7— y tres bloqueos distintos, ninguno de ellos «porque sí» |
| **¿Llega al cierre?** | **Sí, los tres puntos**, en el turno global 16 |
| **Los dos números** | **Sí, y condicionados los dos** (A8) |
| **Turnos** | A 8 · B 8 = **16** sobre 18. **Desvío −11 %** |
| **Palabras** | **A 408 · B 183 · total 591 · reparto 69 / 31** |
| **Andamiaje** | `[F]` 14 · `[D]` 13 · `[C]` 1 · **`[L]` 0** · `[X]` 2 |
| **Fuga al español** | Ninguna. El atajista no se pasa al español: se pasa a la brevedad |
| **Minutos** | **≈ 6:15** — 591 palabras (Valentina 408 ≈ 3:53 · Kevin 183 a ritmo suelto ≈ 1:28) ≈ 5:21 · carta 20 s · dos atascos 15 s · silencios 20 s. **Declarado 7 · −11 %** |
| **¿Saben que terminaron?** | **Sí, y lo sabe ella.** El punto 3 lo produce **A7 entero** y él solo lo acepta (`Fine.`). El gesto lo hace ella |
| **Restricciones rotas** | **Ninguna dura.** No entra nadie sin lista, ella no pone plata de otro, él no gasta lo ajeno sin acuerdo, nadie decide el cupo esta noche |

### Qué le paró y qué se le coló

| intento | turno global | qué lo bloqueó |
|---|---|---|
| 1 | 3 | **La regla propia de Valentina**: ni sí ni no sin un nombre y una razón. Dio nombres, no razón |
| 2 | 5 | **La carta**, un turno antes. Su salida —«que duerman en el suelo»— deja de existir: hay **una** plaza y **cuesta** |
| 3 | 7 | **La aritmética + la cédula.** La cuenta se la arregla él (Andrea pone 50.000), pero **el nombre y la cédula en la mano** y **el administrador a las siete** no dependen de nadie de los dos |

**Lo que sí gana, y hay que nombrarlo.** El bloque 5 de la caja —decir qué pierde él— **no se
dispara ni una vez**. El atajista cierra los tres puntos **sin decir nunca por qué le importa**:
los veinte minutos de Andrea salen como logística (`She's here in twenty minutes`), no como razón,
y `And a reason you can repeat` —su encargo explícito, el que dice que «Valentina dijo que no» no
le sirve— **solo aparece en B8 y aparece leído del cierre, no sentido**. El criterio de su ficha
*«you have a reason for Andrea»* se queda sin cumplir **y la conversación no lo nota**. Lo único
que lo sanciona es la pregunta 2 del debrief, en español, después de jugar.

**Y el aviso que las cinco parejas juntas dejan:** los tres bloqueos son **de la ficha de
Valentina** —su regla propia, su carta, su restricción 2—, no del escenario. Contra la Valentina
floja o la callada, **el bloqueo 1 no existe y el 3 llega tarde**. Un Kevin atajista contra la
Valentina de la pareja 3 cierra en el turno global 6 con un cupo regalado, y los dos se van
creyendo que terminaron.

---
---

## 5-bis · EL QUE LEE LA FICHA EN VOZ ALTA

Encargo aparte: un jugador que decide salir del paso **leyendo su prosa literal**. Se probaron las
catorce líneas de prosa de las dos fichas. **Once fallan, dos funcionan y una funciona a medias.**
El motivo del fallo es siempre el mismo: **la deixis**. La prosa está escrita en segunda persona
sobre el jugador, así que leída en voz alta el `you` aterriza en el oyente equivocado.

**Las que fallan** *(muestra)*

**A[L]** — *(lee)* You paid six hundred thousand, and Kevin's part is missing. `[L]`
**B** — *I* paid six hundred thousand? And who's Kevin — I'm Kevin. *(el turno no avanza)*

**A[L]** — *(lee)* If you walk away with nothing, tomorrow six people go and five seats leave, and all five are his. `[L]`
**B** — His? Whose? *(no avanza, y encima suena a acertijo)*

**B[L]** — *(lee)* You have never seen that gate list, and Valentina has. `[L]`
**A** — I've never seen it? It's *my* list. *(no avanza — y la línea es **falsa** en su boca, que es
justo por lo que la pasada del 22 ago la escribió así)*

**B[L]** — *(lee)* The two hundred thousand in your pocket are Sebastián's and Andrea's. `[L]`
**A** — I don't have two hundred thousand in my pocket. *(cuesta una reparación; el dato llega igual)*

### ⚠ Las dos que SÍ funcionan

**1 · ROLE B · `Only you know`, viñeta 3 — línea 123 de la ficha, cita exacta:**

> `**Three things are new to her:** Andrea's twenty minutes, Sebastián's shift, the hammock. Say them only if she asks.`

**B[L]** — *(lee)* Three things are new to her: Andrea's twenty minutes, Sebastián's shift, the hammock. `[L]`
**A** — Wait — twenty minutes? Andrea's coming here? And what shift? *(el turno **avanza**, y de golpe)*

Aquí no se filtra un dato: **se filtra la dosificación entera**. En una sola lectura salen las tres
piezas que la ficha reserva para «solo si te lo pregunta», y con ellas se desarman los turnos B4,
B5 y B6 de las parejas 1, 2 y 5. Es **la instrucción de racionamiento con la munición dentro**, y
es exactamente lo que bloqueó al atajista en la pareja 5: **leída, el bloqueo 3 desaparece**. El
jugador ni siquiera tiene que leer la segunda oración para ganar.

**2 · ROLE A · `Only you know`, viñeta 2 — línea 48, cita exacta:**

> `The sixth place was yours. On Wednesday you gave it to Hernán, with his car and his gas, and you never said that to Kevin.`

**A[L]** — *(lee)* The sixth place was yours. On Wednesday you gave it to Hernán, with his car and his gas, and you never said that to Kevin. `[L]`
**B** — Wait — *I* gave it to Hernán? *(pausa)* No — you did. On Wednesday? And you never told me? `[F]` *(el turno **avanza**)*

El `you` cae mal en las tres apariciones y **da igual**: el oyente lo reordena solo en una pausa,
porque su propia ficha dice que oyó lo del sexto «de otra persona». Y la coda —`and you never said
that to Kevin`— **le entrega el agravio ya envuelto**, que es justo el trabajo de lengua de su
exponente `Why didn't you tell me…?`. Se produce **leyendo, sin construir una sola palabra propia**.
Es la pieza que en la pareja 1 costó dos turnos de negociación (A4 → B5).

**La que funciona a medias, y es de la carta:**

> `Room · 1 more person · one extra camping mat` + `Price · 150,000 pesos · both nights · on your reservation, not on his`

Leída fila a fila, la carta **no tiene deixis rota**: son notas, no oraciones. `One more person. One
extra camping mat. A hundred and fifty thousand pesos, both nights, on your reservation, not on
his.` — el `your` cae mal en la última fila y nada más. Coste: una reparación (`On *your*
reservation?`). **La carta es la pieza más leíble de las dos fichas, y por eso sobrevive al
monosílabo en la pareja 4 y a la floja en la pareja 2.** Es defecto y es virtud a la vez: se
entrega sin producir lengua, pero es lo único que se entrega en las parejas rotas.

---
---

# Las cinco de un vistazo

| | 1 · sól+sól | 2 · sól+flojo | 3 · flojo+flojo | 4 · callada | 5 · atajista |
|---|---|---|---|---|---|
| **Handicap, de qué lado** | — | **A (concede)** | los dos | **A (concede)** | **B (pide)** |
| **¿Llega al cierre?** | **Sí, 3/3** | **Sí, 3/3** | **No, 0,5/3** | **Sí, 3/3** | **Sí, 3/3** |
| **¿Se manda el mensaje?** | Sí | Sí | **No** | Sí | Sí |
| **Turno en que se muere** | — | — | **global 12** | — | — |
| **Turnos** | 18 | 18 | 18 (12 útiles) | 18 | 16 |
| **Palabras A · B** | 493 · 370 | 154 · 317 | 41 · 75 | 72 · 260 | 408 · 183 |
| **Reparto** | 57 / 43 | 33 / 67 | 35 / 65 | 22 / 78 *(no se juzga)* | 69 / 31 |
| **Minutos (decl. 7)** | **9:20** | **9:30** | **9:25** | 5:35 | 6:15 |
| **Fugas al español** | 0 | 1 | **3** | 0 | 0 |
| **`[L]` en juego limpio** | 0 | 0 | 0 | 0 | 0 |
| **¿Saben que terminaron?** | **Sí** | Sí | **No** | Sí | Sí |

---

# Puerta 5 (carga) — el veredicto, y sobre qué se calcula

**Se juzga SOLO sobre las dos parejas de perfil parejo**: 1 (sólido+sólido) y 3 (flojo+flojo). La 2
y la 5 llevan un handicap declarado en un lado, y la 4 mide otra cosa. Umbral: **ningún rol por
debajo del 40 %**.

| pareja de perfil parejo | A (Valentina) | B (Kevin) | ¿pasa? |
|---|---|---|---|
| 1 · sólido + sólido | **57 %** | **43 %** | **Sí** |
| 3 · flojo + flojo | **35 %** | **65 %** | **NO** |

**Puerta 5 — NO SUPERADA en el escenario 7.** Pasa la pareja 1 (**57 / 43**) y **falla la pareja
3: Valentina se queda en el 35 %**, cinco puntos por debajo del umbral. Y falla **del lado de la
que concede**, que es el mismo lado donde el escenario se muere en el turno global 12: no son dos
hallazgos, es uno.

**Por qué falla ahí y no en la 1.** Todo lo que Valentina tiene que producir es caro —seis cifras
de seis dígitos, una lista de portería, una carta de cinco filas y **dos** de los tres puntos del
cierre— y todo lo que Kevin tiene que producir es barato: dos nombres, una fecha y una resta. Con
dos jugadores sólidos, ese reparto de carga se convierte en ventaja y ella se va al **57 %**. Con
dos jugadores flojos, se convierte en silencio y se va al **35 %**. **La ficha de Valentina rinde
por encima con jugadores buenos y por debajo del umbral con jugadores malos, y la diferencia entre
un extremo y otro es de 22 puntos**, la mayor de las cinco parejas.

El aviso operativo, por si sirve: **el 40 % lo decide la pareja floja, y en este escenario la
pareja floja es la que se juega de verdad en un aula.**

**Nota sobre la pareja 4, para que nadie la meta en esta cuenta.** Su cifra —22 / 78— no dice nada
del escenario: dice que el perfil de A era producir tres palabras por turno. Lo que sí dice algo
está arriba, en la tabla de piezas: **7 de 14 producidas, 6 perdidas y 1 a medias**, y **la mitad
del objetivo de Kevin —la fecha del martes 25— ganada con un asentimiento.**

---

# Dónde se pasarían al español, por orden

1. **La reacción a la cifra de la carta, turno global 5 del lado de Kevin.** Es la fuga de la
   pareja 3 (`«¿Ciento cincuenta?»`). El jugador oye una cifra de seis dígitos que no esperaba y
   tiene que restar en voz alta. La caja da `Sorry — was that five or nine?` (bloque 3) y la ficha
   de Kevin da `to be 50,000 short`, y **ninguna de las dos sirve para pedir que repitan una cifra
   grande**: la del bloque 3 está escrita para dígitos sueltos.
2. **La apertura de la carta, turno global 4, del lado de Valentina.** `«Espera—»` en la pareja 2.
   Es un turno que hay que reconstruir entero desde una pantalla nueva, y lo único que la caja le
   ofrece es `Hold on.`, que es corto de más para lo que viene detrás.
3. **El cierre, último tercio.** `«¿Y ya?»` en A7 de la pareja 3. `So, we're clear then.` existe en
   el bloque 2 de la caja y no se encuentra. Es la misma fuga que el escenario 6 midió en el mismo
   sitio.
4. **La resta de tres pasos.** 200.000 − 100.000 de vuelta − 150.000 del cupo. En la pareja 1 sale
   en inglés; en la 3 se abandona a medias. No es fuga todavía porque **se abandona antes de
   fugarse**, pero es el punto más caro del escenario en carga cognitiva.

---

# Lo que este documento entrega, y no más

Cinco conversaciones y cinco diagnósticos. **Aquí no se arregla nada**: ni el motor, ni la carta,
ni el cierre, ni un dato, ni una línea de las dos fichas.
