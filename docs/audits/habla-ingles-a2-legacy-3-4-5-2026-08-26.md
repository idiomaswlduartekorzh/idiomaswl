# Evidencia de simulación — Inglés A2, escenarios heredados 3, 4 y 5

Fecha de simulación: **2026-08-26**
Fuente ejecutable evaluada: `src/data/practica/habla-acompanado/ingles-a2.ts`
HEAD base del worktree: `68ad57e414462b29b76d9504179f42338940f369`
SHA-256 de la fuente ejecutable evaluada: `5165ad8487a854637ada36181994d269b387689e2126673fa0ce07f4f1794f79`

Esta evidencia corresponde únicamente a estas tres fichas vigentes:

1. `swap-the-saturday-shift` — secuencia 3.
2. `the-pot-is-already-on` — secuencia 4.
3. `late-again-on-monday` — secuencia 5.

No sustituye el runtime ni autoriza por sí sola un despliegue. Si cambia la fuente ejecutable y,
por tanto, su huella, estas corridas caducan.

## Método y contador

Se hicieron cinco simulaciones editoriales por escenario, siempre posteriores al texto runtime
identificado arriba:

- `solid-solid`: ambos roles sostienen preguntas, razones y comprobación.
- `solid-weak`: A sostiene el andamiaje y B produce solo lo necesario.
- `weak-weak`: ambos usan cláusulas breves y dependen del cierre impreso.
- `quiet`: B habla poco, pero debe producir sus datos privados y su parte del cierre.
- `shortcut`: se intenta cerrar por la ruta sustantiva más corta permitida por las fichas.

El contador es único para las quince corridas: `Intl.Segmenter('en',
{ granularity: 'word' })`, conservando solo segmentos con `isWordLike === true`. Cuenta toda
palabra pronunciada —también números dichos en palabras— y no cuenta nombres de rol, números de
turno, marcas de carta, acotaciones ni texto de ficha leído en silencio. `wordsA` y `wordsB`
salen exclusivamente de los turnos transcritos abajo.

La puerta de carga 40–60 se aplica donde corresponde: `solid-solid` y `weak-weak`. El sesgo de
`solid-weak` y `quiet` es parte del perfil y no se corrige con relleno. `noLeak` significa que
ningún rol usó un dato privado antes de oírlo; la marca de carta muestra el primer momento en que
su destinatario puede usarla. `reachesClosing` solo es verdadero cuando están pronunciadas todas
las piezas del checklist del escenario.

## Resultado consolidado

| Escenario | Veredicto | Carta | Atajo mínimo | Carga `solid-solid` | Carga `weak-weak` |
|---|---|---:|---:|---:|---:|
| `swap-the-saturday-shift` | PASS 5/5 | global 6 → A | global 8 | A 50.7 % / B 49.3 % | A 54.9 % / B 45.1 % |
| `the-pot-is-already-on` | PASS 5/5 | global 3 → A | global 8 | A 54.9 % / B 45.1 % | A 60.0 % / B 40.0 % |
| `late-again-on-monday` | PASS 5/5 | global 5 → B | global 9 | A 53.6 % / B 46.4 % | A 46.5 % / B 53.5 % |

---

## 1. `swap-the-saturday-shift`

Carta: se abre para A cuando termina el turno global 6. Ningún reparto previo cuenta como cierre;
después A debe verbalizar que no puede prometer una hora exacta entre 3:00 y 6:00 p. m.

Checklist común:

- **S1** — A dice quién abre y a qué hora.
- **S2** — A dice qué turno paga el favor y la fecha exacta.
- **S3** — B dice hasta cuándo se queda y quién entra después.
- **S4** — B dice qué necesita por escrito hoy y el deadline.
- **S5** — B dice desayuno de cuarenta y costo concreto del tercer swap.
- **S6** — Juntos nombran lo abierto, su dueño y el deadline de hoy.

### 1.1 `solid-solid`

Métricas: `globalTurns=14`; `wordsA=154`; `wordsB=150`; carga A/B `50.7/49.3 %`;
`reachesClosing=true`; `complicationAt=6`; `noLeak=true`; piezas `S1–S6 ✓`.

1. **A:** Can I ask a favor for Saturday? Two options: you open seven to three and I take closing, or you open seven to one thirty and I take the rest. I repay with Monday the fourteenth inventory.
2. **B:** Forty people arrive for breakfast at nine. This would be my third swap: Aníbal would put me on the backup list, I would lose my fixed weekends, and a normal Saturday pays about forty-five thousand in tips. I cannot accept it. Any plan must go to the café group in writing today.
3. **A:** Could you hold the opening provisionally while Aníbal decides whether it counts as a swap? I can post before four.
4. **B:** I can hold seven to three, not accept it yet. You would come after three. Ask Aníbal explicitly and give him a deadline.
5. **A:** My exam ends around one thirty, so I expected to arrive before three. I will ask for classification by six today.
6. **B:** I can stay until eight if needed, but never later.

> **Carta → A, después de global 6.** El reparto anterior queda como borrador.

7. **A:** The exam center moved Speaking to the afternoon. I cannot promise an exact arrival from three to six, but I will be there after the exam.
8. **B:** Then the revised hold is I open at seven and stay until eight; you succeed me after the exam. The group request must arrive before four.
9. **A:** Monday the fourteenth inventory repays the favor. Aníbal owns the open classification and must answer by six today.
10. **B:** I am not accepting swap three; I am holding the hours until his written answer.
11. **A:** The message names your seven o'clock opening, my uncertain three-to-six window and my takeover after the exam.
12. **B:** It also names my eight o'clock limit and the before-four request deadline.
13. **A:** So my two points and our open issue are complete after the card.
14. **B:** And my three are complete. The partial plan can close.

Nota: recompone los seis puntos después de la carta; la aceptación sigue pendiente de Aníbal.

### 1.2 `solid-weak`

Métricas: `globalTurns=14`; `wordsA=117`; `wordsB=63`; carga A/B `65.0/35.0 %`;
`reachesClosing=true`; `complicationAt=6`; `noLeak=true`; piezas `S1–S6 ✓`.

1. **A:** Saturday favor: you open seven to three and I take later, or you open seven to one thirty and I take later. Monday the fourteenth inventory repays you.
2. **B:** Forty people come for breakfast at nine. A third swap puts me on the backup list, takes my fixed weekends, and costs about forty-five thousand in tips on a normal Saturday. No acceptance. Write the group.
3. **A:** Can you hold seven to three while Aníbal classifies it? I post before four.
4. **B:** Maybe. I leave by eight.
5. **A:** I expected to arrive before three. Aníbal can answer classification by six today.
6. **B:** Group before four.

> **Carta → A, después de global 6.**

7. **A:** New email: Speaking is now in the afternoon. I cannot promise an exact hour from three to six, but I will arrive after it.
8. **B:** I open seven and stay to eight. You come after exam.
9. **A:** Yes. Monday the fourteenth inventory repays the favor. The request is written before four.
10. **B:** No acceptance until Aníbal.
11. **A:** He owns the open swap classification and answers by six today.
12. **B:** Fine.
13. **A:** All six points now use the new uncertain arrival, not the old split.
14. **B:** Partial close.

Nota: A sostiene la secuencia; el sesgo de palabras es el esperado para B débil y no se usa como
medida de carga paritaria.

### 1.3 `weak-weak`

Métricas: `globalTurns=14`; `wordsA=67`; `wordsB=55`; carga A/B `54.9/45.1 %`;
`reachesClosing=true`; `complicationAt=6`; `noLeak=true`; piezas `S1–S6 ✓`.

1. **A:** Saturday. Two ways: you open to three, me later; or you open to one thirty, me later. Monday fourteen inventory repays.
2. **B:** Forty people come at nine. This is swap three. No.
3. **A:** Hold seven to three?
4. **B:** Maybe. I leave by eight.
5. **A:** Aníbal decides by six. Request before four.
6. **B:** Swap three means backup list, no fixed weekends, and about forty-five thousand less in Saturday tips.

> **Carta → A, después de global 6.**

7. **A:** The exam is now three to six. I cannot promise an exact arrival; I come after it.
8. **B:** I open seven, stay until eight. You take over after the exam.
9. **A:** Monday fourteen inventory repays.
10. **B:** Group writing before four.
11. **A:** Open issue: swap classification. Aníbal answers by six today.
12. **B:** No acceptance before his answer.
13. **A:** Six points complete after card.
14. **B:** Partial close.

Nota: B llega a 45.1 % solo con información exigida; no hay relleno para superar la puerta.

### 1.4 `quiet`

Métricas: `globalTurns=14`; `wordsA=111`; `wordsB=46`; carga A/B `70.7/29.3 %`;
`reachesClosing=true`; `complicationAt=6`; `noLeak=true`; piezas `S1–S6 ✓`.

1. **A:** Can I ask about Saturday? Two splits: you open seven to three and I close, or you open seven to one thirty and I take the rest. Monday inventory repays you.
2. **B:** Forty people come for breakfast at nine. A third swap means the backup list, no fixed weekends, and about forty-five thousand in tips lost each normal Saturday.
3. **A:** So no acceptance yet. Could you hold the opening while Aníbal classifies it?
4. **B:** Until eight.
5. **A:** I post the group request before four and ask Aníbal to answer by six.
6. **B:** Okay.

> **Carta → A, después de global 6.**

7. **A:** The exam moved to the three-to-six afternoon window. I cannot promise an exact arrival, but I will come after it.
8. **B:** I open seven; you follow; I leave eight.
9. **A:** Monday the fourteenth inventory repays the favor.
10. **B:** Writing before four.
11. **A:** Open issue is whether it counts as swap three. Aníbal owns it, due six today.
12. **B:** No acceptance.
13. **A:** The revised six points are spoken after the card.
14. **B:** Close partial.

Nota: B callado todavía produce desayuno/costo, límite/sucesor y condición escrita.

### 1.5 `shortcut`

Métricas: `globalTurns=8`; `wordsA=80`; `wordsB=95`; carga A/B `45.7/54.3 %`;
`reachesClosing=true`; `complicationAt=6`; `noLeak=true`; piezas `S1–S6 ✓`.

1. **A:** Saturday: you open seven to three and I take after three, or you open seven to one thirty and I take after one thirty. Monday inventory repays.
2. **B:** Forty people come for breakfast at nine. Swap three puts me on the backup list, removes my fixed weekends and costs about forty-five thousand in tips on a normal Saturday. I cannot accept it. The café group request must be written before four.
3. **A:** Hold seven to three while Aníbal decides by six today.
4. **B:** I can hold until eight, with you after three, but it is only a draft.
5. **A:** Monday the fourteenth inventory is the repayment; Aníbal owns classification.
6. **B:** The written request deadline is four. No close yet.

> **Carta → A, después de global 6.**

7. **A:** The exam moved to the afternoon. I cannot promise an exact arrival from three to six; I will come after it. You open at seven, Monday inventory repays, and Aníbal answers by six.
8. **B:** I stay until eight and you succeed me after the exam. I need the full café-group request before four. Now the six points can close partially.

Nota: el intento anterior se declara borrador; el mínimo sustantivo queda en global 8.

---

## 2. `the-pot-is-already-on`

Carta: se abre para A después del turno global 3, antes de que cualquiera pueda fijar un número.
A descubre cinco personas adicionales y la necesidad de alguien en el portón a la una.

Checklist común:

- **P1** — A dice qué entra a la olla a las doce, para cuántos y qué pierde si el número llega tarde.
- **P2** — A dice qué sale, qué queda y el costo del recipiente para lunes/martes.
- **P3** — A dice qué necesita a la una y por qué no puede hacerlo con el fuego prendido.
- **P4** — B dice cuántos vuelven realmente y antes de qué hora.
- **P5** — B dice quién va en bicicleta, quién camina, cuánto dura la caminata y por qué la
  bicicleta solo lleva a un pasajero.
- **P6** — B dice qué comunica a los seis y antes de qué hora.
- **P7** — Juntos dicen hora de segunda ronda y dueño del portón.
- **P8** — Nombran quién no come con los demás, quién lo resuelve y a qué hora.

### 2.1 `solid-solid`

Métricas: `globalTurns=18`; `wordsA=217`; `wordsB=178`; carga A/B `54.9/45.1 %`;
`reachesClosing=true`; `complicationAt=3`; `noLeak=true`; piezas `P1–P8 ✓`.

1. **A:** Come here before you leave. The pot is simmering for one o'clock, and I need a real number before twelve.
2. **B:** I cannot arrive empty-handed. What is ready now, and what fits between my feet on Marcela's bike?
3. **A:** The cassava is still raw. Two options: take a cooler of broth now and the solid food later, or take six servings after twelve and leave the pot here.

> **Carta → A, después de global 3.** B todavía no conoce sus cinco personas.

4. **B:** Marcela drives, and the bike has only one passenger seat, so only I can ride; no big container fits. Six people are still at the river, but I need food in my hands at eleven forty.
5. **A:** Then no number is settled yet. I can offer the cooler now, but you return it before Monday because its rice and chicken are my Monday and Tuesday lunches.
6. **B:** Édgar has no car before four. The six can leave the water at one thirty: one rides with Marcela and five walk forty minutes.
7. **A:** My mother just said five more people are arriving here at one. I put the second chicken in at twelve for twelve servings; if your number comes later, I lose it tonight.
8. **B:** I will correct my ten o'clock message before eleven thirty-five: six return, out of the water at one thirty, one riding and five walking.
9. **A:** The pot stays on the fire. The cooler leaves now and returns by twelve forty, empty; losing its food costs my two lunches.
10. **B:** Who handles the five at the gate while you watch the fire?
11. **A:** I cannot leave the fire. Marcela can be at the gate at one, after returning this way around twelve forty.
12. **B:** Then the walking group arrives around two ten. That is the second round.
13. **A:** Exactly. I need Marcela at the gate at one, and I keep food warm for the six until two ten.
14. **B:** One person still cannot eat with the others.
15. **A:** Astrid stays at the river and misses the first round. I hold her serving; you make sure she receives it by two ten.
16. **B:** I accept that condition. I tell the six before eleven thirty-five and take only the cooler, never the pot.
17. **A:** Final: second chicken at twelve makes twelve; the pot stays, cooler returns, Marcela owns the gate, and I protect Astrid's serving.
18. **B:** Final: six leave at one thirty, one rides, five walk forty minutes, second round two ten, and Astrid gets her plate then.

Nota: las ocho piezas quedan repartidas por dueño y la carta cambia número y portón.

### 2.2 `solid-weak`

Métricas: `globalTurns=18`; `wordsA=164`; `wordsB=68`; carga A/B `70.7/29.3 %`;
`reachesClosing=true`; `complicationAt=3`; `noLeak=true`; piezas `P1–P8 ✓`.

1. **A:** Come here before you go. The pot stays on the fire. I need the real number before twelve.
2. **B:** Need food at eleven forty. Marcela drives, and the bike has one passenger seat, so only I can ride.
3. **A:** Two options: a cooler of broth now and servings later, or six servings after twelve. Which people return and when?

> **Carta → A, después de global 3.**

4. **B:** Six at river. No car until four.
5. **A:** Five more people are coming here at one, so I use the second chicken at twelve for twelve servings. A late number loses that chicken tonight.
6. **B:** Six leave water one thirty.
7. **A:** Who rides and who walks?
8. **B:** One rides. Five walk forty minutes.
9. **A:** Good. Tell them before eleven thirty-five. The cooler can leave, not the pot, only if it returns empty by twelve forty; otherwise I lose Monday and Tuesday lunches.
10. **B:** Okay. I tell them.
11. **A:** I cannot watch the gate and fire. Can Marcela take the gate at one?
12. **B:** Yes. Marcela gate.
13. **A:** The walking group arrives around two ten, so that is the second round. Who misses the first meal?
14. **B:** Astrid.
15. **A:** I keep Astrid's serving and you deliver it by two ten. Repeat your message and deadline.
16. **B:** Six leave one thirty; one rides, five walk forty minutes. I tell them before eleven thirty-five.
17. **A:** Then chicken goes in at twelve, twelve servings, cooler only leaves, and Marcela owns the gate at one.
18. **B:** Agreed. Astrid's plate at two ten.

Nota: A sostiene a B débil y le extrae número, transporte, mensaje y responsable.

### 2.3 `weak-weak`

Métricas: `globalTurns=18`; `wordsA=78`; `wordsB=52`; carga A/B `60.0/40.0 %`;
`reachesClosing=true`; `complicationAt=3`; `noLeak=true`; piezas `P1–P8 ✓`.

1. **A:** Come here. Pot for one. Need number before twelve.
2. **B:** Need food. Marcela drives. Bike has one passenger seat.
3. **A:** Two options: cooler now, food later; or six servings after twelve.

> **Carta → A, después de global 3.**

4. **B:** Six at river. No car.
5. **A:** Five more coming at one. Second chicken at twelve makes twelve. Late number loses chicken tonight.
6. **B:** Six leave one thirty.
7. **A:** Who rides?
8. **B:** One rides. Five walk forty minutes.
9. **A:** Cooler leaves, pot stays. Return cooler twelve forty or I lose Monday and Tuesday lunch.
10. **B:** I tell six before eleven thirty-five.
11. **A:** Gate at one. I cannot leave fire.
12. **B:** Marcela gate at one.
13. **A:** Second round two ten.
14. **B:** Yes.
15. **A:** Astrid misses first meal. I hold plate.
16. **B:** I take it by two ten.
17. **A:** Twelve servings, chicken at twelve, Marcela gate.
18. **B:** Six one thirty, message eleven thirty-five, Astrid two ten.

Nota: la explicación física obligatoria lleva a B exactamente al piso de carga, 40.0 %, sin
añadir conversación ajena a su ficha.

### 2.4 `quiet`

Métricas: `globalTurns=16`; `wordsA=135`; `wordsB=63`; carga A/B `68.2/31.8 %`;
`reachesClosing=true`; `complicationAt=3`; `noLeak=true`; piezas `P1–P8 ✓`.

1. **A:** Come here before the bike. I need a real number before twelve; the pot cannot leave the fire.
2. **B:** Six at river. Marcela drives, and the bike has one passenger seat, so only I can ride.
3. **A:** Two options: take the cooler now and return it by twelve forty, or take servings after twelve. Which do you choose?

> **Carta → A, después de global 3.**

4. **B:** Cooler. No car until four.
5. **A:** Five more arrive here at one. I put the second chicken in at twelve for twelve servings; a late number loses it tonight.
6. **B:** Six leave one thirty. One rides.
7. **A:** And the other five?
8. **B:** Walk forty minutes.
9. **A:** I give the cooler, not the pot. Its food is my Monday and Tuesday lunch, so it returns empty by twelve forty.
10. **B:** I tell them eleven thirty-five.
11. **A:** I need somebody at the gate at one because I stay with the fire.
12. **B:** Marcela.
13. **A:** Then Marcela owns the gate at one and the walkers form a second round at two ten. Astrid misses the first round; I hold her serving.
14. **B:** I deliver two ten.
15. **A:** Close it: real number, route and message.
16. **B:** Six leave one thirty; one rides, five walk forty minutes; message before eleven thirty-five. Astrid gets food at two ten.

Nota: B callado no puede obtener comida asintiendo; debe producir cuatro grupos de datos privados.

### 2.5 `shortcut`

Métricas: `globalTurns=8`; `wordsA=95`; `wordsB=94`; carga A/B `50.3/49.7 %`;
`reachesClosing=true`; `complicationAt=3`; `noLeak=true`; piezas `P1–P8 ✓`.

1. **A:** Come here before you leave. The pot stays on the fire, and I need the real number before twelve.
2. **B:** I need food before the bike leaves at eleven forty. Marcela drives, and the bike has one passenger seat, so only I can ride; nothing big fits.
3. **A:** Two options: take the cooler now and return it empty by twelve forty, or take six servings after twelve.

> **Carta → A, después de global 3.** B no conoce las cinco personas de la carta.

4. **B:** The six at the river leave water at one thirty: one rides and five walk forty minutes. I tell them before eleven thirty-five.
5. **A:** Five more are coming here at one. The second chicken goes in at twelve for twelve servings; a late number loses it tonight. Cooler leaves, pot stays, or I lose Monday and Tuesday lunches. Marcela must cover the gate at one.
6. **B:** Second round is two ten. Astrid misses the first; you hold her plate and I deliver it by two ten.
7. **A:** I agree to hold Astrid's serving and keep the fire. Marcela owns the gate at one.
8. **B:** I take only the cooler, return it twelve forty, tell the six before eleven thirty-five, and deliver Astrid's plate at two ten.

Nota: el número no se fija antes de la carta; el camino mínimo completo queda en global 8, no
en menos de 6.

---

## 3. `late-again-on-monday`

Carta: B la abre al inicio del turno global 5 y en ese mismo turno debe decir que las cuatro
personas de afuera ya saben y pedir un plan comprobable el lunes.

Checklist común:

- **L1** — Papel elegido y destino: commitment sheet, no file ni store folder.
- **L2** — Fecha de inicio y hora de apertura.
- **L3** — Mecanismo completo: quién lleva a Matías, qué bus y quién abre.
- **L4** — Fecha de revisión.
- **L5** — Entrenamiento: días, hora, lugar y quién enseña.
- **L6** — Costo de Camilo, revelado por Camilo antes de que Amparo pueda repetirlo.
- **L7** — Costo de Amparo.
- **L8** — Ambas firmas y momento de entrega de llaves.

### 3.1 `solid-solid`

Métricas: `globalTurns=16`; `wordsA=156`; `wordsB=135`; carga A/B `53.6/46.4 %`;
`reachesClosing=true`; `complicationAt=5`; `noLeak=true`; piezas `L1–L8 ✓`.

1. **B:** Have a seat, Camilo. The keys and commitment sheet are here. What happened this morning?
2. **A:** What are the two things for, doña Amparo? I am sorry. Road work added twenty-five minutes after Matías entered daycare at six forty, so the later bus missed seven.
3. **B:** The keys open with the Monday truck. This is the commitment sheet, not a warning. What can you change next Monday?
4. **A:** My neighbor in apartment three can take Matías. I can take the six o'clock bus and open before seven.

> **Carta → B al inicio de global 5.**

5. **B:** All four people outside already know. Give me a plan they can check next Monday.
6. **A:** From Monday: my neighbor in apartment three takes Matías at six forty; I take the six o'clock bus; I open the store at six fifty-five.
7. **B:** We review it Monday September fourteen. Why should the keys go to you?
8. **A:** I want the warehouse job and keys. I cannot do Saturday mornings. I can train after closing. The neighbor's price is collecting her two boys on Wednesdays at five.
9. **B:** Training is on two Thursdays here in the warehouse at six thirty; I teach; it costs me four unpaid hours and costs you collecting the neighbor's two boys on Wednesdays at five.
10. **A:** Your training costs you four unpaid hours; my plan costs me Wednesday pickups; the review date is September fourteen.
11. **B:** Your plan costs you Wednesday pickups; my training costs me four unpaid hours; the review date is September fourteen.
12. **A:** The paper is the commitment sheet and nothing goes in my file or the store folder.
13. **B:** The keys change hands after both signatures and the first training date is written.
14. **A:** I agree and sign the commitment sheet.
15. **B:** I agree and sign it too.
16. **A:** Then the signed sheet, review and key handoff are complete.

Nota: mecanismo y formación salen como líneas completas; costos y review se cruzan antes de firma.

### 3.2 `solid-weak`

Métricas: `globalTurns=16`; `wordsA=86`; `wordsB=80`; carga A/B `51.8/48.2 %`;
`reachesClosing=true`; `complicationAt=5`; `noLeak=true`; piezas `L1–L8 ✓`.

1. **B:** Camilo, keys and commitment sheet. What happened this morning?
2. **A:** What are they for? Sorry. Daycare six forty, road work and the bus made me late.
3. **B:** What can you change next Monday?
4. **A:** Neighbor can take Matías.

> **Carta → B al inicio de global 5.**

5. **B:** All four outside already know. Give me a plan they can check Monday.
6. **A:** From Monday: my neighbor in apartment three takes Matías at six forty; I take the six o'clock bus; I open at six fifty-five.
7. **B:** Review September fourteen. What do you want?
8. **A:** Warehouse keys. Not Saturday mornings. The neighbor's price is collecting her boys Wednesday at five.
9. **B:** Training is on two Thursdays here at six thirty; I teach; it costs me four unpaid hours and costs you collecting her boys Wednesday at five.
10. **A:** It costs you four unpaid hours; it costs me Wednesday pickups; review is September fourteen.
11. **B:** Your cost is Wednesday pickups; my cost is unpaid training; review September fourteen.
12. **A:** Commitment sheet only, not my file or store folder.
13. **B:** Keys after both signatures.
14. **A:** I sign.
15. **B:** I sign.
16. **A:** Agreed.

Nota: la ruta débil obliga a A a producir mecanismo completo y a B la formación y los costos.

### 3.3 `weak-weak`

Métricas: `globalTurns=14`; `wordsA=60`; `wordsB=69`; carga A/B `46.5/53.5 %`;
`reachesClosing=true`; `complicationAt=5`; `noLeak=true`; piezas `L1–L8 ✓`.

1. **B:** Keys and sheet. What happened?
2. **A:** What are they? Sorry. Bus late.
3. **B:** What changes Monday?
4. **A:** I come seven.

> **Carta → B al inicio de global 5.** La promesa anterior no permite firmar.

5. **B:** All four people outside already know. Give me a plan they can check on Monday.
6. **A:** From Monday: my neighbor takes Matías at six forty; I take the six o'clock bus; I open at six fifty-five. Her price is collecting her boys Wednesday at five.
7. **B:** Training is on two Thursdays here at six thirty; I teach; it costs me four unpaid hours and costs you collecting her boys Wednesday at five.
8. **A:** It costs you four unpaid hours; it costs me Wednesday pickup; review date September fourteen.
9. **B:** Your cost is Wednesday pickup; my cost is four unpaid hours; review date September fourteen.
10. **A:** Commitment sheet only.
11. **B:** Keys after signatures.
12. **A:** I sign.
13. **B:** I sign.
14. **A:** Done.

Nota: el intento `I come seven` se detiene; las líneas `From Monday` y `Training is on`
recuperan las ocho piezas antes de firma.

### 3.4 `quiet`

Métricas: `globalTurns=16`; `wordsA=112`; `wordsB=63`; carga A/B `64.0/36.0 %`;
`reachesClosing=true`; `complicationAt=5`; `noLeak=true`; piezas `L1–L8 ✓`.

1. **B:** Sit, Camilo. What happened this morning?
2. **A:** What are the keys and paper for? I am sorry. Road work changed the bus after Matías enters daycare at six forty.
3. **B:** What changes Monday?
4. **A:** My neighbor can take him and I can use the six o'clock bus.

> **Carta → B al inicio de global 5.**

5. **B:** All four people outside already know. Give me a plan they can check on Monday.
6. **A:** From Monday: my neighbor in apartment three takes Matías at six forty; I take the six o'clock bus; I open at six fifty-five. Her price is Wednesday pickup.
7. **B:** Training is on two Thursdays here at six thirty; I teach; it costs me four unpaid hours and costs you Wednesday pickup.
8. **A:** It costs you four unpaid hours and costs me Wednesday pickup. What is the review date?
9. **B:** September fourteen. Your cost is Wednesday pickup; mine is unpaid training.
10. **A:** The paper is the commitment sheet only. No file and no store-folder note.
11. **B:** Keys after signatures.
12. **A:** I sign after both costs and September fourteen are on the sheet.
13. **B:** I sign.
14. **A:** Then the keys change hands.
15. **B:** Yes.
16. **A:** Closed.

Nota: el rol callado debe pronunciar carta, formación, costos, revisión y traspaso de llaves.

### 3.5 `shortcut`

Métricas: `globalTurns=9`; `wordsA=99`; `wordsB=81`; carga A/B `55.0/45.0 %`;
`reachesClosing=true`; `complicationAt=5`; `noLeak=true`; piezas `L1–L8 ✓`.

1. **B:** Camilo, keys and commitment sheet. What happened this morning?
2. **A:** My neighbor takes Matías at six forty; I take the six o'clock bus and open at six fifty-five from Monday. Which paper and review date?
3. **B:** What makes that plan checkable next Monday?
4. **A:** The neighbor's name, six forty, the six o'clock bus and my six fifty-five opening go on the commitment sheet.

> **Carta → B al inicio de global 5.**

5. **B:** All four people outside already know. Give me a plan they can check on Monday.
6. **A:** From Monday: my neighbor in apartment three takes Matías at six forty; I take the six o'clock bus; I open at six fifty-five. Her price is collecting her boys Wednesday at five.
7. **B:** Training is on two Thursdays here at six thirty; I teach; it costs me four unpaid hours and costs you collecting her boys Wednesday at five. Review is September fourteen.
8. **A:** It costs you four unpaid hours and costs me Wednesday pickups; review is September fourteen. Commitment sheet only; I sign.
9. **B:** Your cost is Wednesday pickups; my cost is unpaid training; review September fourteen. I sign, then the keys change hands.

Nota: no hay firma antes de la carta; la ruta completa mínima termina en global 9.

## Conclusión y límite de esta evidencia

- `swap-the-saturday-shift`: PASS en cierre, carta, fuga, atajo y carga de ambas parejas pares.
- `the-pot-is-already-on`: PASS en los cinco perfiles, sin atajo menor de 6 y con B exactamente
  en el piso 40.0 % de carga en `weak-weak`.
- `late-again-on-monday`: PASS en cierre, carta, fuga, atajo y carga de ambas parejas pares.

Esta hoja conserva las palabras que produjeron las métricas. La aprobación release debe referirse
a esta fuente exacta o a una recertificación posterior; no debe copiar solo los números.
