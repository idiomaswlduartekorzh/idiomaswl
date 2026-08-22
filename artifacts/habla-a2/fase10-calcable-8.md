# Fase 10 · Verificación de la pasada quirúrgica — escenario 8, `cancel-the-gym-i-am-leaving`

**Verificado:** `artifacts/habla-a2/fase7-fichas-8-cancel-the-gym-i-am-leaving.md` en disco hoy
(22 ago 2026) contra `artifacts/habla-a2/fase9-calcable-8.md`. Se leyó además el diff completo
frente a `f1c64228` para comprobar el alcance de la pasada, y se volvió a correr
`prosa-canonica.mjs`.

**Alcance:** igual que en fase 9. Fuera: las dos tablas `Say it here` (son exponentes, las frases
van a propósito), el bloque `After — both screens, in Spanish`, `grammarReferences`, la carta de
Édison y las notas de corrección.

---

## Veredicto

**PASA CON CAMBIOS · 1 línea decible sobre 103 unidades** (63 oraciones de prosa —32 de Tatiana,
31 de Mauricio— + 40 filas de tabla en alcance). Venía de **7 decibles + 2 defectos de forma sobre
104**. La única que queda **no es nueva**: es la n.º 5, que cambió de sujeto y siguió siendo
decible. **Cero decibles nuevas.**

**La pasada quirúrgica se respetó.** El diff toca **25 líneas** del cuerpo de las fichas y las
veinticinco están citadas: las 9 de `fase9-calcable-8.md` y las 12 de `fase9-nivel-8.md` (con
solapamiento en tres líneas), más los dos cortes de presupuesto que los dos informes pidieron por
su nombre —`four people behind you` de la ficha de Tatiana y `Tuesday, 6:40 p.m.,` de la de
Mauricio (`fase9-nivel-8.md`, línea 197)— y `It's hard to say out loud.`, que este informe señaló
al filo y usó para pagar. **Ninguna línea no citada cambió**: ni un dato, ni un nombre, ni una fila
de `Facts`, ni una fila de exponentes, ni una pieza del motor. Nadie reescribió bloques.

**Presupuesto, medido hoy:** ROLE A **449**, ROLE B **450**, techo 450. Cumple, pero **B queda a
cero palabras de margen**: la próxima corrección de Mauricio, por pequeña que sea, tiene que venir
con su corte pagado en la misma frase.

---

## 1 · Hallazgo por hallazgo

| n.º | dónde | estado | línea nueva |
|---|---|---|---|
| 1 | A · `You can, but you don't have to` (l. 47) | **arreglado** | `He cannot ask for more than your dates.` |
| 2 | A · `Only you know` 2 (l. 51) | **arreglado** | `**Wilmer** sold you the plan and promised you out loud that they cancel for people who leave the country. You never got that promise on paper, and he is gone.` |
| 3 | A · `Only you know` 3 (l. 52) | **arreglado** | `**Yurany**, from work, asked you about this gym two weeks ago, and the price stopped her.` (fundida: deja de ser unidad) |
| 4 | B · `You can't` 1 (l. 116) | **arreglado** | `A cancellation inside the minimum term is not yours to give.` |
| 5 | B · `You can't` 3 (l. 118) | **A MEDIAS** | `Édison reads a reason on that form, and never a destination.` |
| 6 | B · `Only you know` 1 (l. 121) | **arreglado** | `You have nothing else behind this counter today.` |
| 7 | B · `Only you know` 4 (l. 124) | **arreglado, con reserva** | `You know why Wilmer is gone: he promised three or four members a cancellation, and could not give it.` |
| F1 | B · vocabulario, `to freeze a membership` (l. 154) | **arreglado** | `way one · in her ears, the same word as a cancellation` — sin verbo conjugado |
| F2 | B · vocabulario, `to transfer a plan` (l. 156) | **arreglado** | `way two · not on her screen` — sin verbo conjugado |

Los dos defectos de forma quedan limpios y el `rationale` de `present-simple-negative` se actualizó
con la celda nueva (l. 237), que era la cita arrastrada que este informe avisó.

### La n.º 5 sigue decible — el sujeto cambió, el riesgo no

> `Édison reads a reason on that form, and never a destination.`

Es tercera persona pura, A2, sin una sola deixis que la rompa: Mauricio la levanta de la pantalla,
la dice y le entrega a Tatiana justo lo que ella necesita —que en el formulario no va el destino—,
que es una de las dos tensiones del escenario. **Es el mismo mecanismo que este informe declaró
fatal en la n.º 7**, y la justificación que se escribió al aplicarla («el sujeto es un tercero que
Tatiana no conoce») no protege: Mauricio nombra a Édison en su restricción 3 y su propio «You did
it if» le pide decir el piso, los días y las horas de Édison. Que ella no lo conozca al empezar es
precisamente lo que la línea remedia al pronunciarse.

**Reescritura, coste 0 palabras:** `You can ask her for a reason, and never for a destination.`
(el `her` apunta a quien escucha y la línea se cae · 11 → 11 palabras). Encaja además con la frase
anterior de la misma restricción, `You can ask when she comes back.`

### La n.º 7, arreglada con reserva

`You know why Wilmer is gone: …` se sostiene sobre un anclaje falso —Tatiana no lo sabe—, igual
que la viñeta 1 de Tatiana (`You already know the September 5 charge will bounce…`), que este
informe dio por buena. Se cuenta como arreglada por consistencia. La reserva: en inglés, «you know
why…» es también un giro retórico, y **después** de que Tatiana juegue la carta de Wilmer la línea
vuelve a ser pronunciable. Es decibilidad condicionada al estado de la conversación, no de salida.

---

## 2 · Cepillo entero — ninguna decible nueva

Se repasaron una a una las 63 oraciones de prosa y las 40 filas en alcance.

**Prosa de Tatiana (32).** Las cinco líneas que tocó la pasada de nivel no abren nada:
`If you shout, he signs nothing.` (cabecera, metadato), `You are at the front desk of a gym in
Cabecera. You come straight from work.` (dicho a Mauricio es cierto y **no avanza nada**: no hace
trabajo de turno), `You want to end the plan today, with no charge on September 5.` (puesto en él,
falso), `It has your passport number…` (falso en él), y `The problem is not the 92,000 pesos: you
pay for two months, and you cannot go.`, donde los dos puntos mantienen la frase como una sola
unidad y la coordinada aterriza en un empleado que sí puede ir al gimnasio.

**Prosa de Mauricio (31).** `You are alone at the front desk in Cabecera, y…` (falso en ella),
`That answer comes from retention, in writing, and not from you.` (el `not from you` apunta al
hablante y se cae), `…and she will think a case is a cancellation.` (la `she` corta la lectura),
`…and she does not know about it.` (igual), `You have nothing else behind this counter today.`
(el mostrador excluye a la socia).

**Dos costuras nuevas, señaladas y no contadas:**

| dónde | literal | por qué no cuenta |
|---|---|---|
| B · `Only you know` 3 (l. 123) | `Last month you gave a freeze with no proof. You got a written warning for helping too much.` | la pasada de nivel partió una oración en dos y creó dos unidades autónomas —lo que ella misma evitó en N3, N8 y N9—; aquí sale bien porque ninguno de los dos predicados lo sostiene una socia, pero es el mismo movimiento que en otra línea habría regalado un turno |
| A · `Only you know` 3 (l. 52) | `**Yurany**, from work, asked you about this gym two weeks ago, and the price stopped her.` | al fundir, el `asked you` puede leerse como el «you» institucional del gimnasio; lo salva que Yurany preguntó a **Tatiana**, no al mostrador, y Mauricio lo desmentiría |

**Tablas.** Las 20 filas de `Facts` siguen siendo elipsis y participios: ni un verbo conjugado con
sujeto. Las 20 celdas `here` de vocabulario están **limpias las veinte** por primera vez: las dos
que caían por forma se arreglaron y `proof` pasó a `what her email does not have`, que sigue siendo
sintagma nominal.

**Al filo de fase 9:** las ocho siguen igual salvo `It's hard to say out loud.`, que desapareció
para pagar presupuesto. Ninguna empeoró.

## 3 · Lo que queda pendiente y no es de esta ronda

- **Nota menor, ya avisada:** la línea 403 del bloque de notas en español sigue citando
  `the reason she says no` cuando la tabla dice `the reason he says no`. Es una cita histórica,
  está fuera de pantalla y no cuenta como hallazgo, pero conviene que nadie la lea como vigente.
- **Margen de prosa de Mauricio: cero.** Ver arriba.

## 4 · Para el guardián

La regla *protege el verbo, no el pronombre* funcionó: seis de siete arreglos la aplican y aguantan
el cepillo. La que falló lo hizo por la vía contraria —**quitar toda deixis**—, que es el otro
modo de dejar una línea decible. Conviene escribirlo junto a la regla: una línea sin `you` y sin
`she` no está protegida, está suelta.
