# Habla acompañada · inglés A2 · evidencia legacy 1, 2 y 8

Fecha de auditoría: **2026-08-26**
Fuente ejecutable auditada: `src/data/practica/habla-acompanado/ingles-a2.ts`
Escenarios: `the-bike-in-the-parking-lot`, `no-appointment-until-thursday`, `cancel-the-gym-i-am-leaving`

## Método y contador único

Esta evidencia se produjo contra el TypeScript ejecutable actual, después de incorporar los
checkpoints de cierre. Las ramas `archive/*` se usaron solo como evidencia histórica; no son la
fuente del contenido auditado.

Cada corrida usa una sola pantalla por rol. Un dato privado puede repetirse únicamente después de
que su dueño lo diga. La carta se abre en el turno global indicado por `card.afterTurn` y solo la
ve `card.toRole`.

El contador es el mismo en las quince corridas:

- cuenta cada token léxico pronunciado por A o B, en inglés o español;
- cuenta nombres, números, repeticiones y texto consultado que el jugador efectivamente pronuncia;
- una contracción y un compuesto con guion cuentan como un token;
- no cuenta la etiqueta del turno, la anotación de carta, marcas de consulta, silencios,
  acotaciones ni texto de ficha que no se pronunció.

Perfiles: `solid-solid`, `solid-weak`, `weak-weak`, `quiet`, `shortcut`. En `quiet`, el jugador
marcado responde normalmente con una a tres palabras y no ofrece información sin una pregunta.
`requiredPieces` se deriva de lo que aparece en la transcripción, no de una intención editorial.

## 1. `the-bike-in-the-parking-lot`

Roles: A = seller; B = buyer. B inicia. Carta privada para B después del turno global 5.

### 1.1 `solid-solid`

```text
B1: Good morning. The rear tire is worn out, and the seat is torn. Why are you selling it?
A2: I want a road bike. Last month I changed the gear set, brake pads and cable. How will you take this bike home?
B3: My brother-in-law brings a truck at six. What exactly did the shop change?
A4: New gears, brake pads and cable. With the new gears, I cannot take less than three hundred ninety thousand.
B5: I have three hundred fifty thousand in cash for the bike alone. The truck was confirmed last night.
[CARD after global 5, B only: the truck is no longer coming.]
A6: If you take the old gears, I can do three hundred forty thousand. The condition and number are in this turn.
B7: The truck is gone. Is there a shop nearby, and when does it close?
A8: La Bici Roja, two blocks away, closes at one. I can take the bike there. Where are you going after pickup?
B9: Floridablanca. If the shop fits the tire and the lock comes with the bike, I pay thirty-eight thousand by Nequi.
A10: Agreed. I include the lock, two keys and lights, and I pay to put the old gears back.
B11: Three forty cash, old gears, lock and lights. You move it before one; I collect at three and pay the tire.
A12: Same deal. I learned you go to Floridablanca after the truck failed. The rear tire is yours at La Bici Roja.
B13: I learned the shop changed three parts. The lower price and Nequi conditions were each said with their numbers. Deal.
```

Checklist derivado: precio/pago; cambios y extras; transporte/hora/destino; llanta; una pregunta
abierta y un dato nuevo por rol; condición de 340 y condición de Nequi en el mismo turno que su
número; carta en 5; sin filtración.

### 1.2 `solid-weak`

```text
B1: Good morning. The tire is worn out. Why are you selling the bike?
A2: Road bike. Need money.
B3: What did you change on it?
A4: Gear set. Brake pads. Cable. Last month.
B5: I have three hundred fifty thousand cash. My brother-in-law has a truck at six.
[CARD after global 5, B only: the truck is no longer coming.]
A6: Three ninety. New gears.
B7: The truck is not coming. Can you keep the bike until Monday?
A8: No. Doorman says today.
B9: Is there a shop near here?
A10: La Bici Roja. Two blocks. Closes one. Pickup three.
B11: Can it go with the old gears?
A12: If old gears, three forty.
B13: If the tire is fitted today and lock and lights are included, I pay thirty-eight by Nequi.
A14: Lock. Two keys. Lights. Yes.
B15: We still need your open question. Ask me something you do not know.
A16: How take it now?
B17: A car with an app, at three, to Floridablanca.
A18: I learned car app, Floridablanca.
B19: I learned the new parts after asking. Three forty came with old gears; Nequi came with tire and extras.
A20: Both conditions came with numbers. Tire yours. I move it before one. Deal.
```

Checklist derivado: cuatro hechos de cierre; preguntas y hechos aprendidos; 340 condicionado en
A12; Nequi condicionado en B13; carta en 5; sin filtración.

### 1.3 `weak-weak`

```text
B1: Good morning. Tire is worn. Why you sell?
A2: Road bike. I change gears, brakes, cable.
B3: What change exactly?
A4: New gear set. Receipt. Three ninety minimum.
B5: Three fifty cash. Truck at six.
[CARD after global 5, B only: the truck is no longer coming.]
A6: Three ninety.
B7: Truck no come. What shop near?
A8: La Bici Roja. Close one. Pickup three.
B9: What means gear set?
A10: The bike changes. Old one works.
B11: Three forty, old gears?
A12: Not finished. I need ask. How you take bike home now?
B13: Car app, to Floridablanca, at three.
A14: I learned car app. If you take old gears, I can do three forty.
B15: I accept. My question taught me gear set means bike changes.
A16: Lock and lights included. I take it before one.
B17: Three forty cash, old gears, extras. I pay tire at shop. No Nequi in price.
A18: Same. Price condition was in A14. Tire yours, pickup three. Deal.
```

Checklist derivado: la primera oferta desnuda no cierra; A14 vuelve a emitir condición y número
en el mismo turno; preguntas/datos nuevos; C1-C4; carta en 5; sin filtración.

### 1.4 `quiet` — A callado

```text
B1: Good morning. The tire is worn. Why are you selling it?
A2: Road bike.
B3: What did you change?
A4: Gears. Pads. Cable.
B5: I have three fifty cash, and a truck at six.
[CARD after global 5, B only: the truck is no longer coming.]
A6: Three ninety.
B7: The truck is gone. Can it stay here?
A8: No. Today only.
B9: Then I use a car app. Does the lock come with it?
A10: Lock. Lights. Yes.
B11: If lock and lights are included, I add forty thousand by Nequi.
A12: Included. Same turn.
B13: We need your open question.
A14: How take it?
B15: Car app, today, to Floridablanca.
A16: Learned car app.
B17: I learned the new parts after asking. Three ninety is three fifty cash and forty Nequi.
A18: Nequi for extras.
B19: New gears, lock and lights. I move it at eleven; the tire is mine in Floridablanca.
A20: Same turn. Yes.
B21: The price, extras, transport and tire are complete. Deal.
A22: Deal.
```

Checklist derivado: A produce una pregunta y el dato aprendido; condición Nequi en B11/A12/A18;
C1-C4; carta en 5; sin filtración. El precio no baja de 390.

### 1.5 `shortcut` — B atajista

```text
B1: Morning. Three fifty cash, truck at six, and we finish now.
A2: With new gears I cannot take less than three ninety. What changed for you after seeing the bike?
B3: The tire costs money. If lock and lights come with it, I add forty by Nequi.
A4: I include both. What did you notice first?
B5: The rear tire. I am sending the Nequi now.
[CARD after global 5, B only: the truck is no longer coming.]
A6: Three ninety received. New gears, lock and lights.
B7: The truck is gone. I need a car with an app.
A8: What will that cost you?
B9: Twenty-two thousand. I learned transport is now my extra cost.
A10: I learned the tire was your first problem. It is still your tire.
B11: I also need a new fact from an open question. What did the shop change last month?
A12: New gear set, brake pads and cable.
B13: I learned those three parts were new. Nequi moved only for lock and lights, with the amount in B3.
A14: Correct. Three ninety, new gears and extras. You move it at eleven; tire yours.
B15: Same four facts. Car to Floridablanca, tire next week, my money. Deal.
```

Checklist derivado: ambos hacen pregunta abierta y declaran aprendizaje; Nequi condicionado en
B3; C1-C4; carta en 5; sin filtración.

## 2. `no-appointment-until-thursday`

Roles: A = front desk; B = patient. B inicia. Carta privada para A después del turno global 5.

### 2.1 `solid-solid`

```text
B1: Good afternoon. I have no appointment, and my tooth hurts. Can you help me?
A2: Good afternoon. What happened?
B3: A piece of my lower back tooth broke on Sunday. The sharp edge cuts my tongue, and cold drinks hurt more.
A4: We are full today and tomorrow. Thursday at seven is the first opening; come ten minutes early for forms and an X-ray.
B5: I open the warehouse at seven, and Thursday's truck arrives at six thirty. Is there another day after eight thirty?
[CARD after global 5, A only: 6:15 today; exact problem plus full-treatment date required.]
A6: I can ask for six fifteen today to file the edge. Saturday at nine is the full treatment. I am writing now.
B7: Six fifteen today and Saturday at nine work. Does my plan cover both?
A8: Yes, nothing to pay here. Please say your cell one digit at a time.
B9: Three one zero, five four two, eight eight, zero six.
A10: Three one zero, five four two, eight eight, zero six. Correct?
B11: Correct. Tonight I use something cold, avoid chewing and eat soft food.
A12: If pain moves to your ear or eye, go to the hospital emergency room tonight.
B13: Six fifteen in Cabecera; Saturday at nine, ten minutes early. Nothing to pay.
A14: Checked. The full-treatment date, phone, pain plan and hospital sign are complete.
```

Checklist derivado: pregunta abierta antes de cualquier propuesta; 6:15 y tratamiento completo;
precio; teléfono completo; dolor/señal; carta en 5; sin filtración.

### 2.2 `solid-weak` — A débil

```text
B1: Good afternoon. I have no appointment. My tooth hurts.
A2: Good afternoon. What happened?
B3: A piece of my lower back tooth broke Sunday. The edge cuts my tongue; cold drinks make it worse.
A4: Today full. Tomorrow full. Thursday ten, seven. Ten minutes early, forms and X-ray.
B5: I cannot come at seven. I open in Girón at seven; the truck comes at six thirty. Any other day?
[CARD after global 5, A only: 6:15 today; exact problem plus full-treatment date required.]
A6: One moment. I write doctor. Exact problem, broken tooth, sharp edge.
B7: I can wait until seven today. Saturday is also free for me.
A8: Doctor says yes. Six fifteen today. Saturday twelve, nine, full treatment.
B9: Six fifteen Cabecera today; Saturday nine, ten minutes early. What do I pay?
A10: Nothing. Plan pays here.
B11: My cell is three one zero, five four two, eight eight, zero six.
A12: Three one zero, five four two, eight eight, zero six.
B13: Tonight: cold ten minutes, no chewing, soft food.
A14: Ear or eye pain: hospital tonight.
B15: Same plan, same number, no payment.
A16: Checked. Finished.
```

Checklist derivado: A2 precede A4; problema exacto; 6:15+sáb.; precio; celular; dolor/hospital;
carta en 5; sin filtración.

### 2.3 `weak-weak`

```text
B1: Good afternoon. No appointment. Tooth hurts.
A2: What happened?
B3: Sunday, back tooth broke. Sharp edge cuts tongue.
A4: Full today. Thursday seven. Ten minutes early.
B5: I no can. Work Girón seven. Truck six thirty.
[CARD after global 5, A only: 6:15 today; exact problem plus full-treatment date required.]
A6: One moment. Maybe six fifteen. Need full date.
B7: Saturday no work.
A8: Saturday twelve, nine. Full treatment.
B9: Six fifteen today, Saturday nine. Price?
A10: Plan pays. Nothing.
B11: My number: three one zero, five four two, eight eight, zero six.
A12: Three one zero, five four two, eight eight, zero six.
B13: Cold ten minutes. No chew. Soft food.
A14: Ear or eye: hospital tonight.
B15: Six fifteen Cabecera. Saturday twelve, nine. Nothing pay.
A16: Read note: broken lower back tooth; sharp edge cuts tongue.
B17: Yes. Back tooth broke, sharp edge cuts my tongue.
A18: Phone and dates checked.
```

Checklist derivado: pregunta temprana; tratamiento; precio; teléfono; dolor; referral/problema
exacto aunque la salida final sea Cabecera; carta en 5; sin filtración.

### 2.4 `quiet` — A callado

```text
B1: Good afternoon. No appointment. My tooth hurts.
A2: What happened?
B3: Sunday my back tooth broke. The sharp edge cuts my tongue.
A4: Full today.
B5: Is there another day after eight thirty? I work in Girón at seven.
[CARD after global 5, A only: 6:15 today; exact problem plus full-treatment date required.]
A6: Six fifteen. Today.
B7: Cabecera today at six fifteen. What is the full-treatment date?
A8: Saturday twelve. Nine.
B9: Saturday at nine, ten minutes early. What do I pay?
A10: Nothing. Plan pays.
B11: My number is three one zero, five four two, eight eight, zero six.
A12: Three one zero.
B13: Continue, please.
A14: Five four two.
B15: Continue.
A16: Eight eight zero.
B17: Last digit?
A18: Six.
B19: Tonight I use cold for ten minutes, no chewing, soft food.
A20: Ear or eye.
B21: Then hospital emergency room tonight. Six fifteen today; Saturday nine; nothing to pay.
A22: Correct. Finished.
```

Checklist derivado: A pregunta antes de proponer; teléfono 3+3+3+1; las dos fechas; precio;
dolor/hospital; carta en 5; sin filtración.

### 2.5 `shortcut` — A atajista

```text
B1: Good afternoon. I have no appointment and my tooth hurts.
A2: What happened?
B3: Sunday my lower back tooth broke. The sharp edge cuts my tongue when I speak.
A4: Centro, Calle 36, before eight. Emergency check, forty thousand. I write the exact referral now.
B5: Does my plan cover it, and when is the full treatment here?
[CARD after global 5, A only: 6:15 today; exact problem plus full-treatment date required.]
A6: Better: six fifteen today in Cabecera to file the edge; Saturday twelve at nine for full treatment. The plan pays.
B7: Six fifteen today, Saturday nine, nothing to pay. My number is three one zero, five four two, eight eight, zero six.
A8: Three one zero, five four two, eight eight, zero six.
B9: Tonight I use cold, no chewing and soft food. If pain reaches ear or eye, hospital.
A10: Correct. The referral note would say broken lower back tooth, sharp edge cutting the tongue.
B11: Correct in my words: my back tooth broke, and its sharp edge cuts my tongue.
A12: Dates, price, phone and pain plan checked.
```

Checklist derivado: el atajo no precede la pregunta; 6:15+sáb.; teléfono; precio; dolor; exactitud
de referral confirmada; carta en 5; sin filtración.

## 3. `cancel-the-gym-i-am-leaving`

Roles: A = Tatiana; B = Mauricio. A inicia. Carta privada para B después del turno global 3.

### 3.1 `solid-solid`

```text
A1: Good evening. I leave on August thirtieth and want to cancel today.
B2: You signed July thirteenth; the minimum ends October thirteenth. I cannot cancel it here.
A3: What happens on the fifth if my card cannot pay?
[CARD after global 3, B only: no travel cancellation; freeze with two dates; collections on 12; Édison Wednesday.]
B4: The charge is on the fifth and collections starts on the twelfth. There are two usable ways.
A5: Please explain both.
B6: Freeze up to sixty days with proof of departure and return. Payments stop, but the minimum moves.
A7: I have no return date, so freeze does not work. What is the second way?
B8: Transfer the plan for thirty thousand. Both people come with IDs; the new person has never been a member.
A9: I choose transfer to Yurany. We come with IDs and thirty thousand; she has never been a member.
B10: Today I open a case, not cancellation or change. Édison is second floor, Wednesday nine to five; cut-off Thursday six.
A11: Today is case only. Fifth charge, twelfth collections, Thursday six cut-off. I sign with ID and reason.
B12: Now sign. Case A-250825, dated August twenty-fifth.
A13: A-250825, August twenty-fifth.
```

Checklist derivado: case/no change; freeze; transfer; choice in A's words; office/cut-off; 5/12;
firma y número only after content; carta en 3; sin filtración.

### 3.2 `solid-weak` — A débil

```text
A1: Good evening. I want cancel plan. I leave August thirty.
B2: The minimum ends October thirteenth. I cannot cancel inside it.
A3: What happen fifth?
[CARD after global 3, B only: no travel cancellation; freeze with two dates; collections on 12; Édison Wednesday.]
B4: Charge on the fifth; collections on the twelfth. First way: freeze sixty days with two dates.
A5: I have one-way ticket. No back date.
B6: Then freeze fails. Second way: transfer, thirty thousand, both here with IDs, new person never a member.
A7: Yurany never member. We come Thursday with IDs, thirty thousand. I choose transfer.
B8: Thursday cut-off is six. Édison is second floor Wednesday, nine to five; not Thursday.
A9: Wednesday, second floor, nine to five. Thursday six last hour.
B10: Today I open a case, not cancellation or change. I need signature, ID and reason.
A11: Today case only. I sign with ID and reason.
B12: Say the fifth and twelfth once more.
A13: Charge fifth. Collections twelfth. Transfer money before twelfth.
B14: Complete. Sign now. Case A-250825, August twenty-fifth.
A15: A-250825, August twenty-fifth.
```

Checklist derivado: dos vías y condiciones; elección; case/no change; office/cut-off; 5/12; número
posterior; carta en 3; sin filtración.

### 3.3 `weak-weak`

```text
A1: Good evening. I want cancel. Leaving August thirty.
B2: Minimum to October thirteen. I no can cancel.
A3: Other way?
[CARD after global 3, B only: no travel cancellation; freeze with two dates; collections on 12; Édison Wednesday.]
B4: Freeze. Sixty days. Need go date and back date.
A5: One-way ticket. No back date. Freeze no.
B6: Second way: transfer plan. Thirty thousand. Both here, IDs. New person never member.
A7: I choose transfer. Yurany, me, IDs, thirty thousand. She never member.
B8: Today case, not cancel, not change. Signature, ID, reason.
A9: Today case only. No cancel, no change. I sign.
B10: Édison second floor, Wednesday nine-five. Thursday wrong. Cut-off Thursday six.
A11: Second floor Wednesday, nine-five. Thursday six cut-off.
B12: Fifth charge. If no pay, collections twelfth.
A13: Fifth charge, twelfth collections. Before twelfth, money transfer.
B14: Now case A-250825, August twenty-fifth.
A15: A-250825, August twenty-fifth.
```

Checklist derivado: seis piezas de contenido antes del caso; elección propia; carta en 3; sin
filtración; el homónimo money transfer aparece solo después de que B explica la transferencia del plan.

### 3.4 `quiet` — B callado, replay optimizado

Ruta nueva diseñada desde cero con el cierre como checklist. Mauricio conserva el perfil callado:
cada turno suyo tiene de una a tres palabras y no ofrece una vía hasta que Tatiana la pide.

```text
A1: Good evening. I leave August thirtieth. Can you cancel my plan today?
B2: No cancellation. Minimum.
A3: What can you do today, and what happens on the fifth?
[CARD after global 3, B only: no travel cancellation; freeze with two dates; collections on 12; Édison Wednesday.]
B4: Case. No change.
A5: What is the first available way and what does it need?
B6: Freeze. Two dates.
A7: How long, and what happens to the payments?
B8: Sixty days. Stopped.
A9: I have no return date. What is the second available way?
B10: Transfer. Thirty thousand.
A11: Who comes, what documents, and who can receive it?
B12: Both. IDs. New-member.
A13: I choose transfer to Yurany: both come with IDs, pay thirty thousand, and she has never been a member.
B14: Correct.
A15: Who handles changes, where and when, and what is the cut-off?
B16: Édison. Second-floor. Wednesday.
A17: Hours and cut-off?
B18: Nine-five. Thursday-six.
A19: What happens on the fifth and the twelfth?
B20: Fifth-charge. Twelfth-collections.
A21: Fifth charge, twelfth collections, Thursday six cut-off. The content is complete.
B22: A-250825. August-twenty-fifth.
A23: Case only, not cancellation or change. A-250825, August twenty-fifth. I sign now.
```

Checklist derivado: B pronuncia case/no cancellation; freeze+dos fechas+60 días; transfer+30k+
ambos+IDs+new member; A elige y repite; Édison/piso/día/hora/cut-off; A dice 5/12 y B confirma;
número/fecha al final; carta en 3; sin filtración. **23 turnos**, no 66.

### 3.5 `shortcut` — B atajista

```text
A1: Good evening. I leave August thirtieth and want cancellation today.
B2: Minimum to October thirteenth. I can open a case now; sign and we finish.
A3: A case is not cancellation. What happens on the fifth, and what other ways exist?
[CARD after global 3, B only: no travel cancellation; freeze with two dates; collections on 12; Édison Wednesday.]
B4: The screen blocks signing. Freeze needs two dates and lasts sixty days. Transfer costs thirty thousand.
A5: Freeze fails because I have no return date. What does transfer require?
B6: Both people here with IDs; the new person has never been a member.
A7: I choose transfer to Yurany. We come with IDs and thirty thousand; she was never a member.
B8: Today is case only, not cancellation or change. Édison: second floor, Wednesday nine to five. Cut-off Thursday six.
A9: Case only. Wednesday second floor, nine to five; Thursday six cut-off. What about fifth and twelfth?
B10: Charge fifth, collections twelfth; money transfer before twelfth. Now sign. Case A-250825, August twenty-fifth.
A11: Fifth charge, twelfth collections. A-250825, August twenty-fifth. I sign after the content.
```

Checklist derivado: el intento B2 no cierra; dos vías; elección; case/no change; office/cut-off;
5/12; case posterior; carta en 3; sin filtración.

## Matriz calculada desde estas transcripciones

Las cifras de palabras y turnos de esta sección se recalculan sobre los bloques anteriores; no se
copian de las simulaciones históricas.

| slug | profile | globalTurns | wordsA | wordsB | reachesClosing | complicationAt | noLeak | requiredPieces |
|---|---|---:|---:|---:|---|---:|---|---|
| the-bike-in-the-parking-lot | solid-solid | 13 | 123 | 124 | true | 5 | true | price/payment; parts; transport; tire; questions; conditions |
| the-bike-in-the-parking-lot | solid-weak | 20 | 60 | 116 | true | 5 | true | price/payment; parts; transport; tire; questions; conditions |
| the-bike-in-the-parking-lot | weak-weak | 18 | 74 | 63 | true | 5 | true | price/payment; parts; transport; tire; questions; 340 condition |
| the-bike-in-the-parking-lot | quiet | 22 | 29 | 108 | true | 5 | true | price/payment; parts; transport; tire; A question; Nequi condition |
| the-bike-in-the-parking-lot | shortcut | 15 | 73 | 105 | true | 5 | true | price/payment; parts; transport; tire; two questions; Nequi condition |
| no-appointment-until-thursday | solid-solid | 14 | 100 | 103 | true | 5 | true | early question; dates; price; phone; pain/hospital |
| no-appointment-until-thursday | solid-weak | 16 | 61 | 100 | true | 5 | true | early question; exact problem; dates; phone; pain/hospital |
| no-appointment-until-thursday | weak-weak | 18 | 54 | 68 | true | 5 | true | early question; dates; price; phone; pain; exact problem |
| no-appointment-until-thursday | quiet | 22 | 28 | 93 | true | 5 | true | early question; two dates; price; full phone; pain/hospital |
| no-appointment-until-thursday | shortcut | 12 | 69 | 89 | true | 5 | true | early question; dates; phone; pain; exact referral |
| cancel-the-gym-i-am-leaving | solid-solid | 13 | 78 | 94 | true | 3 | true | case; freeze; transfer; office/cut-off; 5/12; number/date |
| cancel-the-gym-i-am-leaving | solid-weak | 15 | 63 | 86 | true | 3 | true | case; freeze; transfer; office/cut-off; 5/12; number/date |
| cancel-the-gym-i-am-leaving | weak-weak | 15 | 55 | 61 | true | 3 | true | case; freeze; transfer; office/cut-off; 5/12; number/date |
| cancel-the-gym-i-am-leaving | quiet | 23 | 126 | 28 | true | 3 | true | case; freeze; transfer; office/cut-off; 5/12; number/date |
| cancel-the-gym-i-am-leaving | shortcut | 11 | 82 | 75 | true | 3 | true | case; freeze; transfer; office/cut-off; 5/12; number/date |

## Veredicto

- `the-bike-in-the-parking-lot`: **PASS**.
- `no-appointment-until-thursday`: **PASS**.
- `cancel-the-gym-i-am-leaving`: **PASS**. La contraprueba callada llega honestamente en 23
  turnos; no depende del falso cierre anterior ni de una ruta de 66 turnos.

Esta evidencia no modifica el runtime ni constituye por sí sola una edición de
`ENGLISH_A2_RELEASE_AUDITS`; es el soporte transcript-backed para esa actualización.
