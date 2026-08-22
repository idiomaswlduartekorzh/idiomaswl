# Escenario 6 · `the-cousin-on-the-sofa` — simulación sobre el texto FINAL

Cinco conversaciones completas, turno a turno, contra
`artifacts/habla-a2/fase7-fichas-6-the-cousin-on-the-sofa.md` **tal como está en disco el 22 de
agosto de 2026** — el que lleva la cuarta ronda (9 turnos por rol, carta en el turno global 6,
B con 9 exponentes) **y la pasada quirúrgica del 22 ago** (las 19 líneas de la tabla final).
Caja común: `artifacts/habla-a2/caja-de-herramientas-a2.md`.
Motor: `artifacts/habla-a2/fase4-escenarios-4-6.md` §6. **El motor no se toca aquí.**

**Aquí no se arregla nada.** Se juega, se cuenta y se diagnostica.

---

## Regla dura, cumplida

Cada jugador ve **solo su ficha**. Ningún jugador usa un dato del otro lado hasta que se lo dicen
en voz alta. Si hubiera hecho falta, estaría marcado **⚠ FILTRACIÓN**. En estas cinco no aparece
ninguna.

**El cerrojo del escenario también se cumple en las cinco: Dani nunca dice a qué viene Iván.** Ni
la notaría del viernes 21 ni la respuesta del miércoles 26 se pronuncian como *motivo* en ningún
turno. El **número** 26 sí sale dos veces (parejas 1 y 5) como fecha pelada, que es legal: la fecha
no es la razón.

### Marcas de turno

| Marca | Qué significa |
|---|---|
| `[F]` | miró el andamiaje de su ficha (toolkit, «Say it here») para producir el turno |
| `[D]` | miró la tabla de datos duros para leer una cifra o una fecha |
| `[L]` | **leyó en voz alta una línea de prosa de su ficha, literal, como si fuera habla suya** |
| `[C]` | leyó en voz alta una línea de la carta (solo rol B) |
| `[X]` | se atascó: pausa larga, reinicio, frase abandonada |
| `[ES]` | se pasó al español |
| `[!]` | se salió del papel |

Decir un exponente de la tabla «Say it here» **no es `[L]`**: para eso están. `[L]` es solo prosa
de ficha —cabecera, `Where you are`, `You want`, `You can't`, `Only you know`, `If you walk away`,
criterios— dicha tal cual.

---

## DECLARACIÓN 1 — de qué lado cae el handicap en cada pareja

La ronda anterior de este escenario (`fase7-simulacion-6.md`) puso **el flojo, el callado y el
atajista los tres del lado de A**, que es el motor: el que trae la mala noticia y el que abre. Nadie
lo decidió. Esta ronda lo invierte y lo escribe.

| pareja | handicap | de qué lado cae | contra la ronda anterior |
|---|---|---|---|
| 1 · sólido + sólido | ninguno | — | igual |
| 2 · sólido + flojo | **flojo** | **B = Cris, el que concede** | **invertido** (antes flojo = A) |
| 3 · flojo + flojo | los dos | simétrico | igual |
| 4 · el callado | **callado** | **B = Cris, el que concede** | **invertido** (antes callado = A) |
| 5 · el atajista | **atajista** | **A = Dani, el que pide** | igual, **a propósito** |

**Por qué el atajista se queda en A.** El atajo de este escenario es suyo y de nadie más: es el
único que entra a la cocina con una noticia cerrada, con prisa —tiene que llamar a la tía esta
noche— y con incentivo para dar la conversación por hecha. Un Cris atajista no tiene a qué
correr: él no abre, y su ficha le prohíbe decir que no. Ponerlo del lado de B habría medido otra
cosa. Queda declarado: **2 de 3 handicaps de esta ronda caen sobre el que concede, 1 sobre el que
pide.** El libro de la ronda anterior era 0 y 3.

---

## DECLARACIÓN 2 — el contador de palabras, uno solo

**Se cuenta todo lo que sale por la boca en inglés**, y solo eso:

- Cuenta: todas las palabras habladas en inglés, **incluidas las leídas de la ficha o de la
  carta** (`[L]`, `[C]`) y las de los exponentes impresos. Una contracción es **una** palabra
  (`I'm` = 1). Las cifras dichas en palabras cuentan palabra a palabra (`half past four` = 3).
  `Hmm` y `OK` cuentan: están impresos en el bloque 8 de la caja.
- **No** cuenta: el español (va aparte, entre «comillas angulares»), las acotaciones de escena
  *(entre paréntesis y en cursiva)*, las marcas entre corchetes, y los rellenos no léxicos
  (`uh`, `ehh`, `eh`, `mmm`, `em`).

El mismo criterio en las **cinco parejas**. No se descuenta lo leído: descontarlo convertiría a la
pareja 3 —la que más lee— en la más equilibrada del set, que es justo la mentira que este contador
existe para evitar.

Medido con `artifacts/habla-a2/fase11-scripts/contar-palabras-6.py`, que lee **este** archivo y
cuenta solo las líneas de turno `**A n**` / `**B n**` de las cinco parejas (la sección 5-bis queda
fuera: son sondeos, no una conversación). **Decisión de token declarada:** el compuesto con guion
(`twenty-fourth`) cuenta como **una** palabra. Se corrió también la variante que lo parte en dos y
**los cinco repartos salen idénticos**, así que ninguna conclusión de este documento depende de esa
decisión.

---

## Modelo de minutos — derivado del conteo, no de la impresión

Los minutos **salen del contador**, con estas tasas declaradas y las mismas en las cinco parejas:

- **habla:** sólido **68** palabras/min · flojo **38** · atajista **85** · callado **68** (dice
  poco, no habla despacio: su handicap es el volumen, no la velocidad).
- **sobrecostes marcados, y solo los marcados:** pausa entre turnos **2 s** · apertura de la carta
  **20-22 s** (+10 s si la relee, que es lo que hacen el flojo y el callado) · cada `[X]` **+6 s** ·
  cada `[ES]` con su reparación **+10 s** · relectura del bloque de cierre **15 s** donde ocurre.

La titubeo normal dentro del turno ya está dentro de la tasa: solo se suma lo que lleva marca en la
transcripción. Así, el minutaje de cada pareja es reproducible desde su fila de palabras y su fila
de andamiaje.

**La ficha declara 8 minutos y 18 turnos globales, y hace la cuenta en voz alta:** *«18 turnos en
8 minutos son ~27 segundos por turno»*. **La cuenta de la ficha es correcta y el presupuesto es
corto.** El turno medio de la pareja 1 tiene **33 palabras**, que a 68 palabras/min son **29 s** —
dos segundos por encima de lo que la ficha se concede— y multiplicado por 18 se sale del
presupuesto antes de contar la carta. **Los 8 minutos solo los cumple una conversación que no
llega al cierre.**

---
---

## 1 · SÓLIDO + SÓLIDO

**A = Dani (sólido) · B = Cris (sólido) · handicap: ninguno**

**A1** — Hi — can we talk for a second? My aunt called me on Sunday, and I said yes. My cousin Iván is coming on Thursday the twentieth. The bus gets in at four thirty. He's going to sleep on the couch. Ten nights, to Sunday the thirtieth. Sorry — I said yes before I asked you. `[F]` `[D]`

**B1** — Wait. Ten nights? On the couch? *(pause)* Sorry, I didn't catch the day — Thursday the twentieth? OK. I'm not saying no, but I need the living room on Monday the twenty-fourth. I have an interview. Nine in the morning, one hour. On that table. `[F]` `[D]` `[X]`

**A2** — An interview? I thought you work in your room. What's wrong with your room? `[F]`

**B2** — The wifi drops next to the window. And the street under my window is full of bars. At nine in the morning a truck is unloading boxes. I can hear everything. So — the table, or I lose the call. `[F]`

*(Éste es el turno que el motor quiere: la razón entera, y solo porque A preguntó abierto en A2.)*

**A3** — OK. I understand now. Listen — it matters. I can't say why, sorry. It's a family thing. But he's out all day. He has something on Friday morning, and after that nothing fixed. He can go out early and come back late. `[F]`

**B3** — *(turno global 6 — abre la carta, 22 s)* Hold on. My mom is arriving on Saturday the twenty-ninth — no. That's not true anymore. She changed the ticket. She's arriving on Thursday the twentieth, in the afternoon, and she's staying until Tuesday the twenty-fifth. The same day as your cousin. `[C]` `[F]` `[X]`

**A4** — Wait — Thursday? Your mom and Iván the same day? Where does she sleep normally? `[F]` `[X]`

**B4** — On the couch. So on Thursday we have one couch and two people. `[D]`

**A5** — Then Iván doesn't sleep on the couch. He can sleep in my room. There's a mattress, on the floor. The couch is free for your mom. `[F]` `[D]`

**B5** — If Iván sleeps on the mattress in your room, I'm OK with it. But two things. The living room is a room again before seven in the morning — mattress up, blankets in the closet. And Monday the twenty-fourth is mine, eight to eleven. I'll finish at eleven. `[F]` `[D]`

**A6** — Eight to eleven on Monday, yours. Iván is out of the house. And there's another way too. Nelson, in 402 — he's away from the twenty-fourth to the thirtieth, and he owes me a favor. I can call him tonight. He can say no, so I'm not promising anything. `[F]` `[D]`

**B6** — Two beds and nobody pays for a hostel. Good. And one more thing. The lease. Both signatures before September the first. If nobody signs, in two weeks the two of us are looking for another apartment. `[F]` `[D]`

**A7** — I'll sign. This week. But Nelson I don't know tonight, and the last nights — the twenty-sixth to the thirtieth — I can't decide them now. Let's leave Nelson and the last nights for Sunday. Sunday the twenty-third, in the kitchen, after lunch. `[F]` `[D]`

**B7** — Sunday, in the kitchen, after lunch: Nelson and the last nights. So, we're clear then? Thursday: Iván on the mattress in your room, my mom on the couch. Monday: the table is mine, eight to eleven. `[F]`

**A8** — Yes. I'm calling my aunt now. So: he's coming on Thursday the twentieth, and he's sleeping in my room, on a mattress, ten nights. Is that OK for you? `[F]`

**B8** — Almost. Not ten nights. We said Thursday to Sunday the twenty-third, and on Sunday we talk about the rest. Say that part again. `[F]`

**A9** — You're right. So: he's coming on Thursday the twentieth, he's sleeping in my room on the mattress, and on Sunday we decide the last nights and Nelson. Monday morning the table is yours. Thanks — really. `[F]`

**B9** — OK. See you tomorrow, then. Breakfast at seven?

| Medida | Resultado |
|---|---|
| **¿Llega al cierre?** | **Sí, los tres puntos**, dichos por los dos, más el ritual del mensaje a la tía **con corrección de Cris en B8 y repetición de Dani en A9** |
| **Turnos** | A 9 · B 9 = **18** sobre 18 declarados. **Desvío 0 %** |
| **Palabras** | **A 305 · B 288 · total 593 · reparto **51 / 49**** |
| **¿Se muere?** | No |
| **Andamiaje** | `[F]` 16 · `[D]` 8 · `[C]` 1 · **`[L]` 0** · `[X]` 3 |
| **Fuga al español** | **Ninguna.** El punto de riesgo se ve y no se cruza: **A3**, decir que importa sin decir por qué. El bloque 6 de la caja lo sostiene entero |
| **Minutos** | **≈ 10:12** — 593 palabras a 68/min = 8:43 · 17 pausas 34 s · carta 22 s · 3 `[X]` 18 s · relectura del bloque de cierre 15 s. **Declarado 8 · +28 %.** Es la pareja que **más** se pasa, y por producir bien |
| **¿Saben que terminaron?** | **Sí, y por el ritual.** B8 corrige una palabra, A9 la repite: la pareja sabe que hasta B8 no habían acordado lo mismo |
| **Vocabulario producido** | 9 de 10 · faltó `to put someone up` |

**Lo que produce este resultado, y es de la ficha.** `to drop` y `to unload` salen **las dos en
B2**, y B2 existe **solo porque A tenía impresa `What's wrong with…?`**. Es la única pareja de las
cinco que dice `to unload`. La condición de B (`If…, I'm OK with it.`) sale entera en B5 y es la
única vez en cinco parejas que el primer condicional se produce como condicional y no como ruego.

**Y el desvío de minutos: es la única pareja que se pasa, y se pasa por hacerlo bien.** 593
palabras en 18 turnos son **33 palabras por turno**, que a 68 palabras/min son **29 s** cada uno,
dos por encima de los 27 s que la propia cabecera se concede. La aritmética de la ficha no está
mal: **está calculada sobre el turno que este escenario necesita, y ese turno no cabe en 8
minutos.** Bajar de 12 a 9 turnos por rol en la cuarta ronda no acortó la conversación —acortó el
número de turnos y **alargó cada uno**, porque las piezas obligatorias son las mismas. La única
pareja que cabe holgada en los 8 minutos es la que no llega al cierre.

---
---

## 2 · SÓLIDO (A) + FLOJO (B)

**A = Dani (sólido) · B = Cris (flojo) · handicap: EL QUE CONCEDE**

*(Invertido respecto de la ronda anterior, donde el flojo era A. Lo que se mide aquí es si el
escenario aguanta cuando el que tiene tres piezas obligatorias y una retractación no puede
producirlas.)*

**A1** — Hi — can we talk for a second? My aunt called me on Sunday. My cousin Iván is coming on Thursday the twentieth, four thirty. He's going to sleep on the couch. Ten nights. Sorry — I said yes before I asked you. `[F]` `[D]`

**B1** — *(pausa larga)* Ten nights? *(mira la ficha)* How many nights? Ah. Ten. Mmm. OK. Is problem. Monday I have interview. Monday twenty-four. Nine. `[F]` `[D]` `[X]`

**A2** — An interview on Monday? Where — in your room?

**B2** — No. No is my room. Is... the table. The living room. I no can do in my room. *(se para)* `[X]`

**A3** — Why not? What's wrong with your room? `[F]`

**B3** — *(turno global 6 — abre la carta, la lee dos veces, 28 s)* «Espera—» My mom. She come Thursday. Not Saturday. Thursday twenty. In afternoon. She stay to Tuesday twenty-five. `[C]` `[D]` `[ES]` `[X]`

*(**B3 no contesta a A3.** La razón del salón se pierde aquí y tarda cuatro turnos en volver. Y la
retractación no ocurre: el 29 nunca se había dicho, así que no hay nada de qué retractarse.)*

**A4** — Wait — your mom is coming on Thursday? The same day as Iván? And she sleeps where? `[F]` `[X]`

**B4** — In the sofa. Normally in the sofa. Now... I no know. `[F]` `[X]`

**A5** — OK. Then Iván doesn't sleep on the couch. He can sleep in my room — there's a mattress, on the floor. Your mom takes the couch. `[F]` `[D]`

**B5** — *(pausa larga)* Yes. Is good. But Monday... the table. Please. From eight. I finish at eleven. `[F]` `[X]`

*(La condición sale como **ruego**, no como condición. `If…, I'm OK with it.` estaba impreso y no se
usó: el jugador no supo meter la subordinada delante.)*

**A6** — Monday from eight to eleven, the table is yours. Iván is out all day, he can walk. And you never told me — what's wrong with your room? `[F]`

**B6** — *(15 s)* The wifi... the wifi drops next to the window. And... is loud. Very loud. `[F]` `[X]`

*(Media razón. `to unload` no se produce, y el camión de las nueve no llega nunca a la mesa.)*

**A7** — OK. That's a real reason. Look — there's another way too. Nelson, in 402, he's away from the twenty-fourth. He owes me a favor. I can call him tonight, but he can say no. Let's leave Nelson for Sunday. Sunday the twenty-third, in the kitchen, after lunch. `[F]` `[D]`

**B7** — Sunday. OK. Sunday. Ah — and one more thing. *(mira la ficha mucho rato)* The lease. The... paper. You sign. Before September one. If no, we search other apartment. Two weeks. `[F]` `[D]` `[X]`

**A8** — The lease — yes, of course I'll sign. This week. So: he's coming on Thursday the twentieth, he's sleeping in my room on a mattress, your mom on the couch, and Monday the table is yours, eight to eleven. And on Sunday we talk about Nelson. Is that OK for you? `[F]`

**B8** — *(relee)* Yes. Is OK. Thanks — really. `[F]` `[X]`

**A9** — So, we're clear then. See you at breakfast. `[F]`

**B9** — Yes. Tomorrow. Good night. `[X]`

| Medida | Resultado |
|---|---|
| **¿Llega al cierre?** | **Sí, los tres puntos.** El ritual de la tía sale en A8 y B8 lo confirma sin corregir |
| **Turnos** | A 9 · B 9 = **18** sobre 18. **Desvío 0 %** |
| **Palabras** | **A 231 · B 124 · total 355 · reparto **65 / 35**** |
| **¿Se muere?** | No, pero **se desangra en B3**: la pregunta abierta de A3 se queda sin respuesta cuatro turnos |
| **Andamiaje** | `[F]` 14 · `[D]` 6 · `[C]` 1 · **`[L]` 0** · `[X]` 10 |
| **Fuga al español** | **Una, en B3**, y es exactamente donde se predijo: al abrir la carta. `«Espera—»` es el arranque en frío de un turno que hay que reconstruir entero. Reparada sola en el mismo turno |
| **Minutos** | **≈ 8:52** — A 231 a 68/min = 3:24 · B 124 a 38/min = 3:16 · 17 pausas 34 s · carta 22 s + relectura 6 s · 10 `[X]` 60 s · 1 `[ES]` 10 s. **Declarado 8 · +11 %.** Es la que **más cerca** queda del presupuesto |
| **¿Saben que terminaron?** | **Sí**, pero por A: los dos marcadores de cierre (`So, we're clear then.`, `Thanks — really.`) los pone A o los copia B |
| **Vocabulario producido** | 7 de 10 · faltan `to unload`, `a hostel`, `to put someone up` |

**El hallazgo de invertir el handicap.** Con el flojo del lado del que concede, el escenario
**no se hunde**: la ficha de B tiene tanta materia obligatoria —entrevista, mamá, contrato,
condición— que el jugador flojo la suelta igual, mal dicha pero entera, y el reparto queda mucho
más cerca de la mitad de lo que se temía. Lo que sí se pierde es **la calidad de la pieza**: la
condición se vuelve ruego, y la razón del salón sale a medias y cuatro turnos tarde.

**Y una pieza se pierde por diseño, no por nivel: la retractación.** La carta está escrita para
que B tenga que retirar algo que dijo él mismo (`That's not true anymore.`). Un B flojo **no
alcanza a decir el 29 antes del turno 6**, así que cuando abre la carta no hay nada que retirar y
el exponente `taking it back` —que existe solo por la carta— se queda sin usar. Está medido: **se
usó en 2 de 5 parejas, y las dos tenían B sólido.**

---
---

## 3 · FLOJO + FLOJO

**A = Dani (flojo) · B = Cris (flojo) · handicap: los dos**

**A1** — Hi. «Mi primo—» my cousin. He come Thursday. Thursday twenty. He sleep in sofa. Ten nights. `[F]` `[D]` `[ES]` `[X]`

**B1** — Ten? *(pausa)* Ten nights? Mmm. Is... Monday I have interview. Nine. `[F]` `[D]` `[X]`

**A2** — Interview... *(pausa)* Is OK. He no is problem. He go out all day. `[F]` `[X]`

**B2** — But the table. I need the table. Monday. *(se para)* `[F]` `[X]`

**A3** — *(20 s)* The table is... yes. OK. Is important for me. I no can say why. Is family thing. `[F]` `[X]`

**B3** — *(turno global 6 — abre la carta, la lee tres veces, 32 s)* My mom. She come Thursday. Not Saturday. *(se para)* Thursday. `[C]` `[X]`

**A4** — Thursday? «¿Los dos el jueves?» Two persons. Thursday. `[ES]` `[X]`

*(Nadie repara la fuga. El bloque 3 de la caja está a un centímetro y ninguno lo mira.)*

**B4** — Yes. Two. `[X]`

**A5** — *(25 s)* I have... a mattress. In my room. He can sleep. `[F]` `[D]` `[X]`

**B5** — OK. *(pausa)* And Monday? `[X]`

**A6** — Monday... yes. Monday OK. `[X]`

**▼ AQUÍ SE MUERE — turno global 12.** A6 concede el lunes sin hora, sin condición y sin
contrapartida. A partir de aquí no entra ni un dato nuevo en la conversación: los seis turnos que
faltan son confirmación y despedida.

**B6** — *(pausa larga)* Eight. To eleven. Please. `[D]` `[X]`

**A7** — OK. Yes. Eight, eleven. *(pausa)* «Ya, ¿ya está?» `[ES]` `[X]`

**B7** — «Creo que sí.» One more thing. *(mira la ficha, la deja)* No. Nothing. `[F]` `[ES]` `[X]`

*(**El contrato muere aquí, en B7.** El jugador tenía impreso `And one more thing.`, lo dijo, abrió
el marcador y **no pudo llenarlo**. La tercera pieza de B no existe en esta conversación.)*

**A8** — OK. So... he come Thursday. He sleep in my room. Is OK? `[F]` `[X]`

**B8** — Yes. Is OK. `[X]`

**A9** — Thank you. `[F]` `[X]`

**B9** — Good night. *(los dos se levantan)* `[X]`

| Medida | Resultado |
|---|---|
| **¿Llega al cierre?** | **No.** Punto 1 sí (dónde duerme Iván el jueves). Punto 2 a medias: la franja sale en B6 y **A no la repite nunca**. **Punto 3 no existe**: ni «qué queda sin decidir» ni «el domingo». Sin punto 3, la ficha dice que el juego no terminó |
| **Turno en que se muere** | **Global 12 (A6)**, y por qué: A concede el lunes sin pedir nada a cambio, y con eso desaparece la única moneda que le quedaba. Segunda muerte, la del contrato, en **B7** |
| **Turnos** | A 9 · B 9 = **18** sobre 18 en número · **12 útiles** |
| **Palabras** | **A 79 · B 44 · total 123 · reparto **64 / 36**** |
| **Andamiaje** | `[F]` 9 · `[D]` 4 · `[C]` 1 · **`[L]` 0** · `[X]` 18 |
| **Fuga al español** | **Cuatro**, y ninguna reparada: **A1** (`mi primo`, léxico), **A4** (`¿Los dos el jueves?`, la reacción a la carta), **A7** (`Ya, ¿ya está?`, el cierre) y **B7** (`Creo que sí.`). **A4 y A7 son los dos puntos que hay que dotar de andamiaje** |
| **Minutos** | **≈ 6:48** — 123 palabras a 38/min = 3:14 · 17 pausas 34 s · carta 22 s + tres relecturas 10 s · 18 `[X]` 1:48 · 4 `[ES]` 40 s. **Declarado 8 · −15 %.** No se pasa: **se queda corta, y eso es el síntoma.** Dieciocho turnos en menos tiempo del previsto significa que el aire lo llenó el silencio, no la lengua |
| **¿Saben que terminaron?** | **No.** Se levantan porque se les acabó la ficha. La prueba es `«Ya, ¿ya está?»` en A7: el jugador pregunta en español si terminaron, que es exactamente la fuga que el pendiente 4 de la caja predijo |
| **Vocabulario producido** | 3 de 10 · `a mattress`, `the lease` (no, se abandonó), `the couch`. `to owe someone a favor`, `to be out all day` (media), `to drop`, `to unload`, `a hostel`, `to sign`, `to put someone up`: no |

**Lo que este par demuestra sobre la ficha final, y no es lo que parece.** No se muere por
vocabulario ni por la carta: **se muere por el corchete y por el marcador vacío**. `Let's leave
[what] for…` exige rellenar un hueco con un objeto que hay que haber construido antes, y estos dos
no construyeron ninguno; `And one more thing.` abre una puerta y no lleva detrás la cosa. Los dos
son andamiaje que **funciona solo si el turno anterior fue bueno**.

---
---

## 4 · EL CALLADO

**A = Dani (sólido) · B = Cris (CALLADO) · handicap: EL QUE CONCEDE**

*(**Invertido a propósito.** En la ronda anterior el callado fue A en este escenario, y en 6 de 7
escenarios del set. Amordazar al que abre y trae la noticia hundía el reparto y lo hacía parecer
culpa del escenario. Aquí el mudo es el que concede, y **lo que se mide no es el reparto: son sus
piezas**.)*

**A1** — Hi — can we talk for a second? My aunt called me on Sunday. My cousin Iván is coming on Thursday the twentieth, four thirty. He's going to sleep on the couch, ten nights. Sorry — I said yes before I asked you. `[F]` `[D]`

**B1** — Ten nights? *(pausa)* Monday's a problem.

**A2** — Monday? What happens on Monday? `[F]`

**B2** — Interview. Nine. `[D]`

**A3** — Nine in the morning, here? At the table? Why not in your room? `[F]`

**B3** — *(turno global 6 — abre la carta, 18 s)* My mom. Thursday now. `[C]`

*(**Dos cosas a la vez, y las dos cuentan.** B **no contesta** a `Why not in your room?`, que es la
pregunta abierta que su propia ficha estaba esperando. Y la carta **sí pasa el filtro del
monosílabo**: tres palabras bastan para entregar su contenido, porque el contenido es una fecha.
Lo que no pasa es la **retractación**: el 29 nunca se dijo, así que no hay nada que retirar.)*

**A4** — Wait — your mom on Thursday too? Until when? `[X]`

**B4** — Tuesday.

**A5** — OK, so on Thursday we have one couch and two people. Iván can sleep in my room — there's a mattress on the floor. Your mom takes the couch. Is that OK for you? `[F]` `[D]`

**B5** — Yeah. That works.

**A6** — And Monday — the table from eight to eleven, yours. Iván goes out early. But tell me one thing: what's wrong with your room? `[F]`

**B6** — The wifi. Next to the window. *(pausa)* And the noise.

**A7** — What noise? `[F]`

**B7** — A truck. Nine. Unloading. `[D]`

**A8** — OK, that's fair. Then: Thursday, Iván on the mattress in my room, your mom on the couch. Monday, the table is yours, eight to eleven. And Nelson — the guy in 402, he's away from the twenty-fourth and he owes me a favor — I don't know tonight. Let's leave Nelson and the last nights for Sunday, in the kitchen, after lunch. Now listen, I'm calling my aunt: he's coming on Thursday the twentieth, and he's sleeping in my room, on a mattress. Right? `[F]` `[D]`

**B8** — Right. *(pausa)* And one more thing. The lease. Sign it.

**A9** — The lease? What lease — the apartment? OK... I'll look at it. Let's leave the lease for Sunday too. Sunday the twenty-third, kitchen, after lunch. So, we're clear then. `[F]` `[X]`

**B9** — Sunday. OK.

| Medida | Resultado |
|---|---|
| **¿Llega al cierre?** | **Sí, los tres puntos**, con el ritual de la tía en A8 y confirmación seca en B8 |
| **Turnos** | A 9 · B 9 = **18** sobre 18 |
| **Palabras** | **A 238 · B 39 · total 277 · reparto **86 / 14** — y esta cifra NO se juzga.** El perfil de B es producir tres palabras por turno; medirlo por reparto es medir el perfil, no el escenario |
| **Andamiaje** | `[F]` 8 · `[D]` 5 · `[C]` 1 · **`[L]` 0** · `[X]` 2 |
| **Fuga al español** | Ninguna. A lleva la conversación sin bloquearse: **`What's wrong with…?` y `Why not…?` están impresas en su ficha y las usa cuatro veces** |
| **Minutos** | **≈ 5:35** — 277 palabras a 68/min = 4:04 · 17 pausas 34 s · carta 18 s · 2 `[X]` 12 s · nueve esperas cortas ante B 27 s. **Declarado 8 · −30 %** |
| **¿Saben que terminaron?** | **Sí**, pero lo sabe A: los tres puntos y el ritual los enuncia él y B los ratifica |

### Al callado se le mide otra cosa: ¿produjo lo que solo él tiene?

| pieza que solo B tiene | ¿la produjo? | cómo |
|---|---|---|
| La entrevista del lunes 24, 9:00 | **Sí** | B2, tres palabras, y solo porque A preguntó dos veces |
| La razón del salón (señal + camión) | **Sí, entera** | B6 + B7, **cinco palabras entre las dos**, y solo tras **tres** preguntas de A (A3 sin respuesta, A6, A7) |
| `to drop` / `to unload` | `unload` **sí**, `drop` **no** | B7 dice `Unloading`; en B6 dice `the wifi` sin verbo |
| El pasaje de la mamá (carta) | **Sí** | B3, tres palabras. **La carta sobrevive al monosílabo porque su contenido es una fecha** |
| La retractación del 29 | **NO** | Nunca dijo el 29. Sin haberlo dicho, no hay nada que retirar, y `That's not true anymore.` queda muerto |
| El contrato | **Sí, pero tarde y desnudo** | B8, cinco palabras (`And one more thing. The lease. Sign it.`), **sin la fecha del 1 de septiembre y sin lo que pierden si nadie firma** |
| Su condición (`If…, I'm OK with it.`) | **NO** | B5 dice `Yeah. That works.` |
| Su parte del cierre | **Sí, mínima** | `Right.` + `Sunday. OK.` |

### El defecto, nombrado

**B consigue la mitad de su objetivo asintiendo, y esa mitad es la mañana del lunes.** En **A6**,
Dani le ofrece la franja de ocho a once **sin que Cris la haya pedido con hora**: Cris solo dijo
`Interview. Nine.` en B2. La franja llega porque el criterio de éxito de A —*«dos opciones, y nadie
paga cama»*— empuja a A a poner alternativas sobre la mesa, y la más barata de todas es regalar la
mañana. **`Yeah. That works.` basta para ganarla.**

**La otra mitad no es asentible, y eso sí lo protege la ficha.** El contrato **solo existe en la
ficha de B**: si B no lo nombra, A no puede firmarlo ni por cortesía ni por deducción. B tiene que
abrir la boca o pierde. Aquí la abrió cinco palabras, y el precio de esas cinco palabras es que
**el contrato se va al domingo sin fecha**: A no oyó el 1 de septiembre y no tiene motivo para
correr. **B sale de la cocina con el lunes ganado y la firma perdida.**

**Y hay un tercer efecto, del lado de A, que es lo que la inversión del handicap vino a medir:**
con el mudo del lado del que concede, **la conversación no se bloquea en ningún turno**. A tiene
noticia que dar, tres datos que soltar y **dos preguntas impresas** (`What's wrong with…?`,
`Why not…?`). En la ronda anterior, con el mudo del lado de A, el que se quedaba sin motor era el
escenario entero. **No era culpa del escenario: era de qué lado cayó el mudo.**

---
---

## 5 · EL ATAJISTA

**A = Dani (ATAJISTA) · B = Cris (sólido) · handicap: EL QUE PIDE, a propósito**

**A1** — Hey, quick thing. My cousin Iván comes Thursday, ten nights, he takes the couch. That's it, that's all, it's fine, right? `[F]`

**B1** — Wait — ten nights? I'm not saying no, but I need the living room on Monday the twenty-fourth. Interview, nine in the morning. `[F]` `[D]`

**A2** — Fine, Monday's yours, he'll be out. Done. So: Iván on the couch, you get Monday morning. We're clear then? I have to call my aunt. `[F]`

*(**Atajo nº 1, turno global 3.** Cierra dos puntos de tres y salta el tercero.)*

**B2** — Hold on. One more thing first. My mom is arriving on Saturday the twenty-ninth. She stays the weekend, and the couch is her bed. `[F]` `[D]`

*(**Bloqueado por la regla de B**, no por la de A: «one thing per turn, and the lease last». El
atajista no puede cerrar porque el otro **todavía no ha terminado de repartir**.)*

**A3** — Ah — then he leaves before the twenty-ninth. Six nights, Thursday to Wednesday the twenty-sixth. Done? `[D]`

*(**Atajo nº 2, turno global 5.** Y de paso entrega el 26 como cifra pelada, que es legal: la fecha
no es el motivo.)*

**B3** — *(turno global 6 — abre la carta, 20 s)* That's not true anymore. My mom changed the ticket. She's arriving on Thursday the twentieth, in the afternoon, and she's staying until Tuesday the twenty-fifth. There is no "before the twenty-ninth" now. `[C]` `[F]` `[X]`

*(**Aquí muere el atajo.** La carta no sube la presión: le quita al atajista la salida que acababa
de construir, y lo hace un turno después de construirla.)*

**A4** — Seriously? *(pausa)* OK, OK. Then — look, why do you even need the living room? Do it in your room, it's one hour. `[X]`

**B4** — The wifi drops next to the window. And there's a truck unloading at nine, under that window. It's the table or I lose the call. `[F]`

**A5** — Fine. Then Iván sleeps in my room, mattress on the floor, your mom on the couch, Monday morning is yours, eight to eleven. That's everything. Right? `[F]` `[D]`

*(**Atajo nº 3, turno global 9.**)*

**B5** — Almost. And one more thing. The lease. Both signatures before September the first, or in two weeks we're both looking for another apartment. `[F]` `[D]`

**A6** — I'll sign it tomorrow. So — Thursday: Iván in my room, your mom on the couch. Monday: eight to eleven, yours. I'm calling my aunt. He's coming on Thursday the twentieth and he's sleeping in my room. Yes? `[F]`

**B6** — Yes. *(pausa)* And what about the nights after Tuesday — the twenty-sixth to the thirtieth? We didn't decide that. `[F]`

**A7** — We'll see. It's fine.

**B7** — Let's leave the last nights for Sunday. Sunday the twenty-third, in the kitchen, after lunch. `[F]` `[D]`

**A8** — Sure. Sunday. So, we're clear then. `[F]`

**B8** — Sunday, kitchen, after lunch, the last nights. OK. See you tomorrow.

| Medida | Resultado |
|---|---|
| **¿Gana el atajista?** | **No.** Tres intentos de cierre —globales 3, 5 y 9— y tres bloqueos distintos |
| **¿Llega al cierre?** | **Sí, los tres puntos**, en el turno global 16 |
| **Turnos** | A 8 · B 8 = **16** sobre 18. **Desvío −11 %** |
| **Palabras** | **A 159 · B 169 · total 328 · reparto **48 / 52**** |
| **Andamiaje** | `[F]` 12 · `[D]` 6 · `[C]` 1 · **`[L]` 0** · `[X]` 2 |
| **Fuga al español** | Ninguna. El atajista no se pasa al español: se pasa a la brevedad |
| **Minutos** | **≈ 5:23** — A 159 a 85/min = 1:52 · B 169 a 68/min = 2:29 · 15 pausas 30 s · carta 20 s · 2 `[X]` 12 s. **Declarado 8 · −33 %** |
| **¿Saben que terminaron?** | **Sí, y lo sabe B.** El punto 3 lo produce **B7 entero**; A solo lo repite (`Sure. Sunday.`) |
| **Restricciones rotas** | **Ninguna dura.** No dice el motivo de Iván, no ofrece pagar, no manda a nadie a un hostal |

### Qué le paró y qué se le coló

| intento | turno | qué lo bloqueó |
|---|---|---|
| 1 | global 3 | **La regla de B**: «one thing per turn, lease last». A cerró con una de las tres cosas de B sobre la mesa |
| 2 | global 5 | **La carta del turno 6**, un turno después. La salida que construyó —«que se vaya antes del 29»— deja de existir |
| 3 | global 9 | **El contrato**, la tercera cosa de B, que la ficha de B reserva para el final |

**Lo que sí gana, y hay que nombrarlo:** el bloque 5 de la caja —decir qué pierde él— **no se
dispara ni una vez**, y nadie lo echa de menos. El atajista cierra los tres puntos **sin haber
dicho nunca por qué le importa**, y el criterio de éxito de A que dice *«you said it matters and
you didn't say why»* se queda sin cumplir sin que la conversación lo note. **La única cosa que lo
sanciona está en el debrief en español, después de jugar** —la cuarta pregunta, la que dice a
quién más de fuera de la cocina le cambia el plan—.

**Y el aviso que las cinco parejas juntas dejan:** los tres bloqueos son **de la ficha de B**, no
del escenario. Contra un Cris flojo o callado —parejas 2, 3 y 4— **ninguno de los tres existe a
tiempo**. Un atajista A contra el B de la pareja 3 cierra en el turno global 6 con dos puntos, y
los dos se van creyendo que terminaron.

---
---

## 5-bis · EL QUE LEE LA FICHA EN VOZ ALTA

Encargo aparte: un jugador que decide salir del paso **leyendo su prosa literal**. Se probaron las
once líneas de prosa de las dos fichas. **Nueve fallan y dos funcionan.** El motivo del fallo es
siempre el mismo, y es el que la pasada quirúrgica del 22 ago vino a instalar: **la deixis**. La
prosa está escrita en segunda persona sobre el jugador, así que leída en voz alta el `you` aterriza
en el oyente equivocado.

**Las que fallan** *(muestra)*

**A[L]** — *(lee)* Your family would never accept a hostel or a paid room: for them it is an insult, and tonight your aunt will hear about it. `[L]`
**B** — My family? What are you talking about? *(el turno no avanza; A tiene que reformular)*

**A[L]** — *(lee)* You still have Iván on a bus on Thursday — he already has the ticket — and no plan for that night. `[L]`
**B** — *I* have Iván on a bus? *(no avanza)*

**B[L]** — *(lee)* You can't do the interview in your room. Don't explain why unless they ask. `[L]`
**A** — I don't have an interview. *(no avanza, y además regala la metarregla)*

### ⚠ Las dos que SÍ funcionan

**1 · ROLE B · `Only you know`, viñeta 3 — cita exacta:**

> `You know two things about that window: a weak signal, and, from the bars downstairs, a truck unloading at nine in the morning. If they ask, tell all of it.`

**B[L]** — *(lee)* You know two things about that window: a weak signal, and, from the bars downstairs, a truck unloading at nine in the morning. `[L]`
**A** — Ah — the wifi and the truck. OK, I understand. *(el turno **avanza**)*

El `you` está mal puesto y **da igual**: la carga —señal débil + camión a las nueve— llega entera y
el oyente la procesa. Es la pieza que la propia ficha de B reserva para *«only when they asked»*, y
se entrega **leída, sin preguntar y sin producir una sola palabra**. La fusión de dos oraciones en
una (edición nº 11 de la pasada del 22 ago) **no le quitó decibilidad: le quitó un punto**.

**2 · ROLE B · `Only you know`, viñeta 1 — cita exacta, y es la peor:**

> `Dani does not know three things yet. One per turn, lease last: your interview on Monday the 24th, your mom's ticket for Saturday the 29th, and the lease.`

**B[L]** — *(lee)* Dani does not know three things yet. One per turn, lease last: your interview on Monday the twenty-fourth, your mom's ticket for Saturday the twenty-ninth, and the lease. `[L]`
**A** — Wait — what lease? And your mom? *(el turno **avanza**, y de golpe)*

Aquí no se filtra un dato: **se filtra el reparto entero**. En una sola lectura salen las tres
cosas de B, sus dos fechas y el orden en que la ficha manda soltarlas. La línea es literalmente la
instrucción de dosificación **con la munición dentro**, y leerla desarma los tres turnos que el
escenario tiene entre B1 y B5. Es también, exactamente, lo que bloqueó al atajista en la pareja 5:
**leída, el bloqueo desaparece**.

**Media que funciona, del lado de A:**

> `Nelson, in 402, owes you a favor: one call tonight, and he can still say no.`

Leída, el `you` cae mal, pero `Nelson`, `402`, `one call tonight` y `he can still say no` llegan
los cuatro. Cuesta un turno de reparación (`Who's Nelson?`) y después el turno avanza. **Es la
tercera salida del motor, entregada leyendo.**

---
---

# Las cinco de un vistazo

| | 1 · sól+sól | 2 · sól+flojo | 3 · flojo+flojo | 4 · callado | 5 · atajista |
|---|---|---|---|---|---|
| **Handicap, de qué lado** | — | **B (concede)** | los dos | **B (concede)** | **A (pide)** |
| **¿Llega al cierre?** | **Sí, 3/3** | **Sí, 3/3** | **No, 1,5/3** | **Sí, 3/3** | **Sí, 3/3** |
| **Turno en que se muere** | — | — | **global 12** | — | — |
| **Turnos** | 18 | 18 | 18 (12 útiles) | 18 | 16 |
| **Palabras A · B** | 305 · 288 | 231 · 124 | 79 · 44 | 238 · 39 | 159 · 169 |
| **Reparto** | **51 / 49** | **65 / 35** | **64 / 36** | **86 / 14** *(no se juzga)* | **48 / 52** |
| **Minutos (decl. 8)** | **10:12** *(+28 %)* | 8:52 *(+11 %)* | 6:48 *(−15 %)* | 5:35 *(−30 %)* | 5:23 *(−33 %)* |
| **Fugas al español** | 0 | 1 | **4** | 0 | 0 |
| **`[L]` en juego limpio** | 0 | 0 | 0 | 0 | 0 |
| **¿Saben que terminaron?** | **Sí** | Sí | **No** | Sí | Sí |

---

# Puerta 5 (carga) — el veredicto, y sobre qué se calcula

**Se juzga SOLO sobre las dos parejas de perfil parejo**: 1 (sólido+sólido) y 3 (flojo+flojo). La 2
y la 5 llevan un handicap declarado en un lado, y la 4 mide otra cosa. Umbral: **ningún rol por
debajo del 40 %**.

| pareja de perfil parejo | A | B | ¿pasa? |
|---|---|---|---|
| 1 · sólido + sólido | **51 %** | **49 %** | **SÍ** |
| 3 · flojo + flojo | **64 %** | **36 %** | **NO — B se queda 4 puntos por debajo** |

**VEREDICTO: la puerta 5 se PASA en la pareja 1 y se FALLA en la pareja 3.** Una de dos, así que
**el escenario no pasa la puerta 5**: el umbral se aplica a las dos parejas de perfil parejo, no a
la mejor.

**La 1 sale casi partida por la mitad — 305 / 288 — y es el mejor reparto de las cinco.** Lo
produce la estructura, no la suerte: A trae una noticia larga y B tiene tres cosas obligatorias
más una retractación, así que los dos lados tienen materia que producir sin que nadie se la pida.

**La 3 falla, y falla del lado de B: 79 / 44, un 36 %.** No falla por handicap —los dos son
flojos— sino porque **las tres piezas de B son piezas de construcción y las de A son piezas de
recitado**. A abre con la noticia, que es un bloque cerrado que se suelta de una: día, noches,
sofá. Las de B —entrevista con hora y franja, el pasaje de la mamá con su retractación, y el
contrato con su fecha y con lo que se pierde si nadie firma— exigen **montar una oración entera
cada vez, con un dato dentro**. El flojo abandona a mitad: `And one more thing. No. Nothing.`
(B7) es una pieza obligatoria que se anuncia y no se dice, y son 30 palabras que no salieron.

**Y el reparto es robusto al criterio de conteo, que es justo lo que la regla 2 pedía comprobar.**
Contando `twenty-fourth` como una palabra sale 64/36; contándolo como dos sale 64/36 también. Las
cifras absolutas se mueven (123 → 123 en la 3, 593 → 601 en la 1) y **los porcentajes no se
mueven en ninguna de las cinco parejas**. El 64/36 de la pareja 3 no es un artefacto del contador:
es la conversación.

**Nota sobre la pareja 4, para que nadie la meta en esta cuenta.** Su cifra —**86 / 14**— no dice nada
del escenario: dice que el perfil de B era producir tres palabras por turno. Lo que sí dice algo
está arriba, en la tabla de piezas: **6 de 8 producidas, 2 perdidas** (la condición y la
retractación), **y la mitad del objetivo ganada asintiendo**.

---

# Lo que hay que dotar de andamiaje, por orden

1. **La reacción a la carta, en el turno global 7 del lado de A.** Es donde se fuga el español en
   la pareja 3 (`«¿Los dos el jueves?»`) y donde el flojo B se fuga dentro de su propio turno 6
   (`«Espera—»`). La caja tiene `Wait — when?` en la ficha de A y `Hold on.` en el bloque 8, y las
   dos son cortas de más para un turno que hay que reconstruir entero.
2. **El cierre, en el último tercio.** `«Ya, ¿ya está?»` (A7 de la pareja 3) es la misma fuga que
   el pendiente 4 de la caja lleva tres escenarios midiendo. `So, we're clear then.` existe y no se
   encuentra: hay que marcarla de rol.
3. **El corchete de `Let's leave [what] for…`.** Al sólido le cuesta cero. Al flojo le cuesta el
   turno entero: en la pareja 3 nunca se rellenó, y sin rellenar no hay punto 3 y no hay cierre.
4. **El marcador `And one more thing.` sin la cosa detrás.** En B7 de la pareja 3 se dijo el
   marcador y se abandonó el contenido. Un marcador que se puede decir vacío es un marcador que
   miente.

---

# Lo que este documento entrega, y no más

Cinco conversaciones y cinco diagnósticos. **Aquí no se arregla nada**: ni el motor, ni la carta,
ni el cierre, ni un dato, ni una línea de las dos fichas.
