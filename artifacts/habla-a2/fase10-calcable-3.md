# Fase 10 · Verificación tras la pasada quirúrgica — escenario 3, `swap-the-saturday-shift` (EL MOLDE)

**Auditado:** `artifacts/habla-a2/fase7-modelo-ficha-en.md`, tal como está en disco hoy (22 ago 2026,
sin commitear). **Contra:** `artifacts/habla-a2/fase9-calcable-3.md` (9 hallazgos).

**Prueba única, la misma:** *si la línea entera se puede decir tal cual y el turno avanza, está mal
escrita.* **Fuera de alcance:** las dos tablas `Say it here` (son exponentes, ahí las frases van a
propósito) y el bloque final en español.

**Techo de prosa** (`node artifacts/habla-a2/fase7-scripts/prosa-canonica.mjs`, ejecutado hoy):
ROLE A **441**, ROLE B **443**, tope 450. Cumple, y la tabla de presupuesto del archivo ya dice 443.

---

## Veredicto

**PASA CON CAMBIOS · 3 líneas decibles sobre 114 unidades** (63 oraciones de prosa de rol —31 en A,
32 en B— + 38 filas de tabla + 5 oraciones de la carta + 8 líneas de `how it ends`).

Bajo el mismo criterio del informe anterior: **de 9 a 3**. Los nueve hallazgos citados están
**arreglados, nueve de nueve**. Pero **dos de las tres que quedan son nuevas**, y las dos las
introdujo esta misma pasada — ninguna viene de una cita de calcabilidad: salen de los arreglos
`nivel N1` (quitar la pasiva) y `nivel R2` (simplificar la nota de la carta). Corregir el estilo
volvió a escribir dos oraciones en tercera persona sin ancla, que es exactamente la forma del
defecto. La tercera es preexistente y no estaba citada: la tenía en la tabla «al filo» como
cláusula, pero la oración entera que la contiene tampoco tiene ninguna marca de segunda persona.

**La pasada quirúrgica sí se respetó.** `git diff` contra `e99f9de4`: 21 líneas tocadas más el
changelog. Cada una corresponde a una cita de `fase9-calcable-3` o de `fase9-nivel-3`. Ninguna
sección reordenada, ningún dato, nombre ni pieza de motor movido, ninguna de las 55 oraciones
declaradas sanas reescrita. Nadie volvió a redactar la ficha.

---

## 1 · Hallazgo por hallazgo — los nueve

| # | dónde | estado | línea nueva |
|---|---|---|---|
| 1 | B · `Only you know` 1 | **arreglado** | `You read in the group on Friday that forty people are coming for a company breakfast at nine on Saturday the 12th.` (l. 125) |
| 2 | B · `Only you know` 2 | **arreglado** | `Your fixed weekends are the days that pay you in tips.` (l. 126) |
| 3 | B · `Only you know` 3 | **arreglado** | `You work a wedding for sixty people on Saturday the 19th.` (l. 127) |
| 4 | B · `Where you are` 3 | **arreglado** | fundida en adjunto sin verbo conjugado: `…your shift starts in twenty minutes, with Nayibe at the other café until six.` (l. 116) |
| 5 | A · `You can't` 1 | **arreglado** | `You can't offer money, because Nayibe said in front of everybody that nobody pays anybody for a shift.` (l. 48) |
| 6 | A · `You can't` 3 | **arreglado** | `You can't call Nayibe now, because she is at the Autopista café until six.` (l. 50) |
| 7 | A · vocab `non-refundable`, col. `what it is` | **arreglado** | `money you pay and never get back` (l. 76) — sintagma, ya no oración; 31 caracteres |
| 8 | A · vocab `shift`, col. `here` | **arreglado** | `one Saturday shift · the only thing you need from them` (l. 77) — nota de propósito, sin verbo conjugado |
| 9 | B · `You can't` 1, última oración | **arreglado** | `Your one condition is the way to be safe, and you don't negotiate it: today, in writing, the café group says that they asked you for it.` (l. 121) — la cláusula queda dentro de una oración anclada en `Your` |

Nueve arreglados, ninguno a medias, ninguno igual. Dos efectos colaterales buenos:

- El `You can say this one out loud` de B (l. 127) ya no convierte la ficha en guion: la línea de
  arriba está anclada, así que ya no dice *qué* decir seguido de *cómo*.
- Con la fila `on condition that` fuera (cambio 21), desaparece también la celda que el informe
  anterior dejó señalada sin contar (`your one condition, and it doesn't move`).

## 2 · El cepillo entero — las 3 que hay ahora

### A · NUEVA · Carta, nota bajo el correo (l. 198)

> `That plan does not work now.`

Tercera persona, oración completa, cero deixis. Es **decible palabra por palabra y avanza el turno**:
es justo el movimiento de mala noticia de A cuando abre la carta, y coincide con el exponente
`There's a problem: …` que la tabla le da como tronco para que lo produzca él. La ficha se lo
entrega hecho. Antes esta nota era `Anything you two agreed with you coming in after the exam has
just lost its time` — enrevesada, pero anclada en `you two` / `you coming in`. Al simplificarla
(cambio 14, nivel R2) se partió en dos y la segunda mitad se quedó sin sujeto de segunda persona.

**Reescritura:** `Maybe you agreed that you come in after the exam, and now you can't.`
(13 palabras contra 15 · −2; una sola oración, con la deixis mandando hasta el final)

### B · NUEVA · `how it ends`, punto 4 (l. 217)

> `Who asked for the swap. The message says the name.`

`The message says the name.` es una oración con verbo conjugado en tercera persona, en la pantalla
**compartida**, y no es inocua: la condición única de B es precisamente que el mensaje del grupo diga
que fueron ellos quienes se lo pidieron. Un jugador puede soltarla tal cual —«The message says the
name»— para sostener su condición, y el turno avanza. Rompe además el paralelismo del checklist: los
puntos 1, 2, 3 y 5 son sintagmas sin verbo principal (`Who opens on Saturday 12, and at what time.`)
y éste ya no. Antes era pasiva (`That the swap was asked for by…`); quitarla (cambio 11, nivel N1)
la volvió una frase pronunciable.

**Reescritura:** `Who asked for the swap — the name, written in the message.`
(sin verbo conjugado, vuelve a la forma de los otros cuatro puntos, y la pasiva sigue fuera)

### C · PREEXISTENTE, no citada · ROLE A, `Where you are`, oración 2 (l. 43)

> `It is 3:40 in the afternoon, the machine is off, and Nayibe, the manager, is at the other café.`

Ninguna marca de segunda persona en toda la oración: se levanta entera y es lo que cualquiera de los
dos dice para cerrar la puerta de «pregúntale a la jefa». **No es nueva y la pasada hizo bien en no
tocarla**: mi informe anterior solo la citó como cláusula dentro de la tabla «al filo» (fila 5), y la
regla era no tocar lo no citado. Pero es la gemela exacta de los hallazgos 4 y 6, que sí se
arreglaron en los dos sitios donde se citaron; hoy A sigue diciendo dos veces dónde está Nayibe —una
aquí sin ancla y otra anclada en `You can't` 3— y ésta es la que se puede pronunciar.

**Reescritura (calcada del arreglo 4, que ya funciona en B):** fundir con la oración anterior, que sí
está anclada: `It is Tuesday, 3:40 in the afternoon, and you are in the back room of the café, with
the machine off and Nayibe at the other one.` (25 palabras contra 27 · −2 · el adjunto no tiene verbo
conjugado y de paso se va la aposición `the manager`, que sobra entre dos que trabajan con ella)

## 3 · Al filo — señaladas, no contadas

| dónde | literal | por qué no cuenta |
|---|---|---|
| B · `Only you know` 1 | `That opening is the worst shift of the month` | la oración sigue con `and they don't know it — they joined the group late`, que dicho a A se rompe. Ya estaba en la lista anterior; hoy resalta más, porque es lo único sin anclar que queda en ese bloque |
| A · `Your toolkit` (l. 90) | `they are going to ask this: who else did you ask?` | **de forma nueva** (cambio 18): el estilo indirecto pasó a cita literal, así que la ficha de A ahora lleva escrita una línea de B. La oración entera empieza en `Block 6 is for…` y no se levanta; si se toca la fila, volver a `they are going to ask who else you asked` en indirecto |
| B · `Only you know` 3 | `You can say this one out loud: it is just numbers.` | instrucción de pantalla, no turno |
| todas las de la lista anterior | — | siguen igual: `it has to be written in the café group today`, `Saturday is in four days`, `you are going to need exactly this favor next month` |

## 4 · Lo que sigue limpio

- **Las 38 filas de tabla.** 18 datos duros (8 A + 10 B) y 20 glosas de vocabulario: ninguna tiene
  oración con sujeto y verbo conjugado. La columna `here`, punto de riesgo declarado, está **20 de
  20** limpia tras el arreglo 8. Las dos filas nuevas o retocadas de B aguantan: `a swap · when two
  people change days · swap number three · the thing you can't say yes to` y `a reservation · a table
  you save for people who call first` (sintagma con relativa, no oración).
- **Las 55 oraciones declaradas sanas** siguen rompiéndose al pronunciarse: `Your bus to San Gil
  leaves at 5:00 on Sunday morning`, `You already asked Katherine and Elkin`, `This person is your
  last option`.
- **Los cambios de nivel que no eran de calcabilidad no metieron nada más:** `You waited half an
  hour`, `offer two ways to split the shift before they say yes`, `if they learn that, the favor
  costs you more`, `You said your condition once. You never changed it.` — todas anclan en segunda
  persona y se invierten al decirse.
- **El correo de la carta** sigue en notas.

## 5 · Fuera de encargo, visto al ejecutar el contador

`fase7-fichas-4-a-charge-i-did-not-make.md`, ROLE B: **457 palabras**, sigue por encima del techo de
450 y el contador sale con código 1. No es este escenario, pero el molde no puede darse por cerrado
con el guardián del set en rojo por otra ficha.

---

**Para cerrar el molde hacen falta tres líneas**, dos de ellas creadas hoy: la nota de la carta, el
punto 4 de `how it ends` y la segunda oración de `Where you are` de A. Ninguna cuesta presupuesto
(−2, 0, −2). Con ellas el molde queda en **0 decibles sobre 114** y puede usarse como patrón para
reescribir los otros siete.
