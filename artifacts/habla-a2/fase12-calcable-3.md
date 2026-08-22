# Fase 12 · Calcabilidad con la tabla de exponentes DENTRO — escenario 3, `swap-the-saturday-shift`

**Auditado:** `artifacts/habla-a2/fase7-modelo-ficha-en.md` tal como está hoy en disco (22 ago 2026,
sin commitear). **Contra:** `artifacts/habla-a2/fase10-calcable-3.md` (3 hallazgos).

**Cambio de alcance de esta pasada.** Las dos tablas `Say it here` **ya no están fuera de alcance**.
Durante cinco rondas se declararon fuera porque sus frases son decibles a propósito, y por eso nadie
las miró. Aquí no se audita si sus frases se pueden decir —claro que sí—, sino **si la tabla leída en
orden es la conversación**: agrupada por función, alfabética por función, sin más filas que turnos, y
sin ninguna secuencia de filas que reproduzca el arranque o el cierre.

**Cepillo de siempre** sobre prosa, tablas de datos, vocabulario, carta y `how it ends`: *si la línea
entera se puede decir tal cual y el turno avanza, está mal escrita.*

**Techo de prosa** (`node artifacts/habla-a2/fase7-scripts/prosa-canonica.mjs`, ejecutado hoy):
ROLE A **436**, ROLE B **443**, tope 450. Cumple.

---

## Veredicto

**PASA CON CAMBIOS · 0 líneas decibles sobre 126 unidades · 1 defecto estructural en la tabla de
exponentes de ROLE B.**

126 unidades = 62 oraciones de prosa de rol (30 A + 32 B) + 38 filas de datos y vocabulario
+ **12 filas de exponentes (6 + 6), contadas por primera vez** + 5 oraciones de la carta
+ 9 líneas de `how it ends`.

Los tres hallazgos de la fase 10 están **arreglados, tres de tres**, y ninguno de los arreglos
introdujo una línea nueva. El cepillo de prosa queda a cero: es la primera vez en el molde. Lo que
frena el PASA limpio no es una frase, es la **tabla de exponentes de B**, que hasta hoy nadie había
mirado como objeto.

---

## 1 · Los tres de la fase 10

| # | dónde | estado | línea de hoy |
|---|---|---|---|
| A | Carta, nota bajo el correo (l. 198) | **arreglado** | `Maybe you agreed that you come in after the exam, and now you can't.` — una sola oración, la deixis manda hasta el final; la tercera persona sin ancla desapareció |
| B | `how it ends`, punto 4 (l. 217) | **arreglado** | `Who asked for the swap — the name, written in the message.` — sin verbo conjugado, vuelve al paralelismo de los otros cuatro puntos, y sin pasiva |
| C | A · `Where you are`, oración 2 (l. 43) | **arreglado** | fundida con la anterior: `It is Tuesday, 3:40 in the afternoon, and you are in the back room of the café, with the machine off and Nayibe at the other one.` — el adjunto no tiene verbo conjugado y la aposición `the manager` se fue |

Efecto colateral: A pierde una oración de prosa (31 → 30) y cinco palabras (441 → **436**). La tabla
de presupuesto del archivo sigue diciendo 441 para ROLE A: **fila desactualizada**, corregir a 436.

## 2 · La tabla `Say it here` — auditada como objeto

### Lo que cumplen las dos

| prueba | ROLE A | ROLE B |
|---|---|---|
| agrupada por función (una función por fila, no por turno) | sí, 6 funciones | sí, 6 funciones |
| orden alfabético por función | sí: *asking about theirs · asking for it · bad news · paying it back · splitting it · the exam* | sí: *another way · asking what they need · the nine o'clock reservation · what saying yes costs you · what you can't move · your condition* |
| filas ≤ turnos (7 por rol) | 6 ≤ 7 | 6 ≤ 7 |
| dentro del 6-9 de §11 | 6 | 6 |
| columna `what it does here` en notas, no en líneas decibles | 6/6 limpias | 6/6 limpias |
| columna `form` en troncos con `…`, ninguna oración cerrada | 11/11 troncos | 9/9 troncos |

### ROLE A — la tabla NO es la conversación

Contra el arco del diseño (`fase4-escenarios-1-3.md` §3, «Comprobación de los tres primeros
turnos»), A1 mezcla *asking for it* + *the exam* + *splitting it*. La tabla los deja en las
posiciones **2, 6 y 5**: el turno 1 está partido y su pieza más pesada —el examen— cae en la última
fila. La cola (`paying it back → splitting it → the exam`) va del turno ~5 al turno 1, o sea al
revés. **Ninguna secuencia reproduce arranque ni cierre.**

Dos cosas que ayudan y conviene copiar al resto del set:

- La fila `asking for it` mete en **la misma celda** la apertura (`Can I ask you a …?`) y el cierre
  del canal (`Can we write it in … today?`). Una función que aparece dos veces en la conversación se
  cobra una sola fila, y eso rompe la linealidad por dentro.
- La apertura de verdad (bloque **1** de la caja) **no está en la tabla**: la ficha la señala en
  `Your toolkit`. La tabla no puede empezar por el saludo porque el saludo no vive en ella.

Al filo, sin contar: las filas 1→2 (`asking about theirs` → `asking for it`) sí se pueden leer como
«pregunto por su sábado, luego pido el favor», que es un arranque plausible. Son **dos** filas, la
apertura real no está en ninguna, y el orden inverso es igual de plausible. No es un guion.

### ROLE B — DEFECTO: la cola de la tabla es el arco de B en orden

| fila | función | turno del diseño |
|---|---|---|
| 1 | another way | medio-tardío |
| 2 | asking what they need | temprano |
| 3 | the nine o'clock reservation | libre («when you wanted, not before») |
| **4** | **what saying yes costs you** (`I did two swaps …`) | **B1** — es literalmente lo que B dice en el turno 1 de la comprobación del diseño |
| **5** | **what you can't move** (`My bus leaves at …`) | **B2** — literalmente el turno 2 |
| **6** | **your condition** (`I can do it, but only if …`) | **el otorgamiento: el último movimiento de B** |

Las tres últimas filas, leídas de arriba abajo, son **coste → límite → concesión con condición**:
el turno 1 de B, el turno 2 de B y su movimiento de cierre, en ese orden y sin nada intercalado. Es
la forma exacta del defecto que abrió esta pasada: la cola de la tabla es el cierre. Un B que lea
las tres últimas filas de arriba abajo y las diga tiene el escenario resuelto sin escuchar a A —y
`I can do it, but only if …` en la última fila hasta le dice *cuándo* soltar la condición.

El alfabético no se toca (es la regla). Lo que hay que tocar son **las etiquetas de función**, que
por casualidad se ordenan igual que los turnos. Con dos renombres el orden se rompe sin perder
legibilidad:

- `your condition` → `granting it` (pasa de la fila 6 a la 3)
- `what you can't move` → `the bus on Sunday` (pasa de la 5 a la 4)

Orden resultante: *another way · asking what they need · granting it · the bus on Sunday · the nine
o'clock reservation · what saying yes costs you* → turnos medio, temprano, cierre, B2, libre, B1. El
otorgamiento queda en mitad de la tabla y la cola termina en el turno 1. **Devuelto a
`habla-fichas-de-rol`: son dos celdas de la columna `function`, cero prosa, cero presupuesto.**

## 3 · El cepillo — prosa, datos, vocabulario, carta, cierre

**Cero decibles.** Repasadas las 62 oraciones de prosa de rol, las 38 filas de datos y vocabulario,
las 5 de la carta y las 9 de `how it ends`. Ninguna se levanta entera haciendo avanzar un turno:
todas anclan en segunda persona y **se invierten al decirse** (si B dice `Nayibe said … the third one
puts you on the back-up list`, el `you` cambia de dueño y la frase se rompe), o son sintagmas sin
verbo conjugado.

Al filo, señaladas y no contadas:

| dónde | literal | por qué no cuenta |
|---|---|---|
| B · `Where you are`, oración 1 (l. 116) | `It is Tuesday, 3:40 in the afternoon.` | es la gemela de la que se acaba de fundir en A, y sigue suelta. No se cuenta porque decir la hora no hace avanzar ningún turno: no cierra ninguna puerta, al contrario que la de A, que cerraba la de «pregúntale a la jefa». **Si alguien vuelve a tocar B, fúndase con la oración 2**, igual que en A |
| B · `Only you know` 1 | `That opening is the worst shift of the month` | la oración sigue con `and they don't know it — they joined the group late`, que dicho a A se rompe. Ya estaba en las dos listas anteriores |
| A · `Your toolkit` (l. 90) | `they are going to ask this: who else did you ask?` | cita literal de una línea de **B** dentro de la ficha de **A**. No es decible por A (invertiría el sentido) y la oración empieza en `Block 6 is for…`. Sigue igual que en la fase 10 |
| B · `Only you know` 3 | `You can say this one out loud: it is just numbers.` | instrucción de pantalla, no turno |
| `how it ends`, cierre | `That is the plan.` | nueva desde el cambio 19. Tercera persona con verbo conjugado, pero de tres palabras y sin contenido del escenario: pronunciarla no mueve ninguno de los cinco puntos |

## 4 · Fuera de encargo

El contador canónico sigue en rojo por otras fichas: **7 de 16 pasan de 450** (2A 455, 2B 454, 5A 452,
5B 453, 6A 451, 6B 455, 7A 462). Este escenario cumple; el guardián del set, no.

---

**Para cerrar el molde hace falta un solo arreglo**, y no es una frase: **dos etiquetas de función en
la tabla de exponentes de ROLE B**, para que su cola deje de ser el cierre en orden. Con eso el molde
queda en 0 decibles sobre 126 y las dos tablas dejan de ser guion.
