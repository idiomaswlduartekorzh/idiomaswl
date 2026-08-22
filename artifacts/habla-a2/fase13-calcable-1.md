# Fase 13 · Calcabilidad con las tablas de exponentes DENTRO — escenario 1, `the-bike-in-the-parking-lot`

**Auditado:** `artifacts/habla-a2/fase7-fichas-1-the-bike-in-the-parking-lot.md` tal como está hoy
en disco (22 ago 2026, commit `0a57fe20`; la última vez que se tocó la ficha fue `ae708726`).
**Contra:** `artifacts/habla-a2/fase9-calcable-1.md` y `artifacts/habla-a2/fase10-calcable-1.md`.
**Método:** `artifacts/habla-a2/fase12-calcable-3.md`, aplicado aquí por primera vez.

**Alcance ampliado (§11 del blueprint, commit `a677b077`).** Además del cepillo de siempre sobre
prosa, `Facts`, vocabulario, carta y `how it ends`, entran **las dos tablas `Say it here`**. No se
audita si sus formas se pueden decir —lo son a propósito—, sino si **la tabla leída en orden es la
conversación**.

**Cepillo:** *si la línea entera se puede decir tal cual y el turno avanza, está mal escrita.*

**Techo de prosa, medido hoy** (`node artifacts/habla-a2/fase7-scripts/prosa-canonica.mjs`):
ROLE A **444** · ROLE B **436**, tope 450. Cumple. **La cifra que declara el propio archivo en la
línea 431 —«ROLE A 443»— está caducada por una palabra**: son 444, y eso deja **6 palabras de aire**
en A, no 7.

---

## Veredicto

**PASA CON CAMBIOS · 1 línea decible sobre 149 unidades · 5 defectos en las dos tablas `Say it
here`, uno de ellos duro (más filas que turnos, en los dos roles).**

149 unidades = 73 oraciones de prosa de rol (**A 36 · B 37**, el mismo denominador de la fase 10)
+ 40 filas de `Facts` y vocabulario + **18 filas de exponentes (9 + 9), contadas por primera vez**
+ 14 líneas de `how it ends` + 4 de la carta.

La prosa está prácticamente cerrada: los 8 hallazgos de `fase9-calcable-1` siguen arreglados, el
único que `fase10-calcable-1` dejó abierto —el 5— **se cerró bien** en `ae708726`, y solo queda
**una** línea que se levanta entera. Lo que impide el PASA limpio no es prosa: es la tabla de
exponentes, que en esta ficha nunca se había mirado como objeto y **tiene una fila más que turnos
tiene el rol**, en A y en B.

---

## 1 · Qué queda vivo de las pasadas anteriores

| informe | hallazgo | estado hoy |
|---|---|---|
| `fase9-calcable-1` | 1, 2 (grave), 3 (grave), 4, 6, 7, 8 | **muertos**, verificados uno a uno sobre el disco |
| `fase9-calcable-1` · 5 | l. 51, `You need the shop for that, before one.` | **muerto.** Hoy dice `Take the gears off here. Your shop does that, and it closes at one.` — `your shop` en boca de A apunta al taller de B, que no existe: se invierte y se rompe. El predicado dejó de ser uno que el oyente pueda sostener, que era exactamente lo que `fase10-calcable-1` §2 pedía |
| `fase10-calcable-1` · al filo | `Moving the bike counts.` (l. 129) | **vivo, y esta vez se cuenta.** Ver §2 |
| `fase10-calcable-1` · al filo | `A smaller number needs a condition…` (l. 49) · `After that, nothing moves.` (l. 130) · `Without it, you have to pay…` (l. 134) · `45,000 you can ask for…` (l. 162) · `small, but you count it` (l. 158) | **vivas, siguen al filo**, ninguna se cuenta. Ver §4 |
| `fase10-calcable-1` · §5 | la regla que falta en §11 y la l. 66 del molde | **vivas**, fuera de este archivo |

Ninguna de las 20 celdas `here` de vocabulario empieza por pronombre + verbo conjugado, ninguna
lleva comillas ni cursiva, ninguna filtra el dato oculto: **20/20 limpias**, igual que en la fase 10.

---

## 2 · La única línea decible

### GRAVE-MEDIO · ROLE B · `You can't` 2, línea 129

> `Moving the bike counts.`

Literal de la línea entera del punto 2:

> `2. Move the 70,000 in Nequi for nothing. That money moves only when you get something more in the deal, and you say the condition out loud, in the same turn. Moving the bike counts.`

**Por qué se levanta.** Es la única oración de las 73 de prosa que **no tiene deixis que se
invierta**: no hay `you`, no hay `your`, no hay tiempo pasado de criterio, no hay jerga de juego.
B se la dice a A tal cual, cuatro palabras, y el turno avanza — y no avanza en cualquier dirección:
avanza justo por donde el escenario tiene su bisagra, poner el transporte dentro del trato como la
«segunda variable». La ficha le entrega hecha la jugada que el diseño quiere que descubra hablando
(`fase4-escenarios-1-3.md` §1: «se cierra con lo que entra o sale del trato — y eso hay que
descubrirlo hablando»).

Las dos pasadas anteriores la dejaron «al filo · ya estaba». Con el cepillo de la fase 12 no
sobrevive: `After that, nothing moves.` no se cuenta porque su `that` no tiene referente en la mesa;
`Moving the bike counts.` sí lo tiene —la bicicleta está delante de los dos— y por eso es decible
de verdad.

**Arreglo (4 palabras por 4 palabras, prosa neta 0):** fundirla con la oración anterior, para que
quede dentro de una línea que sí se invierte en `you get something more`.

```
… and you say the condition out loud, in the same turn — moving the bike counts.
```

No se pierde el dato (que mover la bicicleta cuenta como «something more»), no se toca el motor y
el contador no se mueve.

---

## 3 · Las dos tablas `Say it here`, auditadas como objeto

### Lo que cumplen las dos

| prueba | ROLE A (l. 96-108) | ROLE B (l. 174-186) |
|---|---|---|
| agrupada por función, no por turno | sí, 9 funciones | sí, 9 funciones |
| orden alfabético por función | **sí**, verificado con script | **sí**, verificado con script |
| dentro del 6-9 de §11 | 9 | 9 |
| columna `what it does here` sin líneas decibles | **0 decibles** de 9 | **0 decibles** de 9 |
| columna `form` en troncos con `…` | 11 de 13 (las 2 cerradas son las fórmulas vagas del bloque 6) | 13 de 15 (las mismas 2) |
| **filas ≤ turnos** | **NO · 9 filas para 8 turnos** | **NO · 9 filas para 8 turnos** |

### T1 · DURO, los dos roles — hay más filas que turnos

La ficha declara `A 8 turnos · B 8 turnos` (l. 28, y `About 8 turns` en l. 41 y l. 120). Las dos
tablas traen **9 filas**. §11 lo prohíbe con esas palabras: «que no haya más filas que turnos». Una
tabla con más filas que turnos ya no es andamiaje que se consulta: es un guion con margen, y le dice
al estudiante que hay al menos una jugada por turno esperándole escrita.

El defecto es viejo y nadie lo vio porque la ficha solo se comprobó contra la banda 6-9 —lo dice
ella misma en la l. 332: *«sigue en 9 filas, dentro del 6-9»*—, que es la otra prueba, no esta.
Además el motor (`fase4-escenarios-1-3.md` §1) sigue diciendo **6 turnos por rol**; con 6, 9 filas
es peor todavía. Esa discrepancia 6/8 vive fuera de este archivo y no se toca aquí.

**Arreglo, coste 0 de prosa** (las filas de tabla no las cuenta el contador canónico): una fusión
por rol, la misma técnica que el molde ya usa —una función que aparece dos veces en la conversación
se cobra una sola fila—.

- **ROLE A:** fundir `the clock` (l. 105) y `why today` (l. 108) en una sola fila `the clock`. Las
  dos son el reloj: una lo pone (`The shop closes at …`) y la otra lo convierte en razón
  (`If it doesn't go today, I …`). Queda:

  | the clock | `The shop closes at …` · `If it doesn't go today, I …` | a problem for both of you · say why today, don't ask for pity |

  9 palabras de nota por las 21 de las dos celdas actuales, y **de paso muere T4**.
- **ROLE B:** fundir `asking for more` (l. 179) y `moving the deal` (l. 183) en `moving the deal`.
  Sus dos celdas `here` ya dicen lo mismo con otras palabras («ask for something more inside the
  deal instead of asking for less» / «offer another way when the price stops moving»). Queda:

  | moving the deal | `Does the lock come …?` · `If you …, I can …` · `Maybe we can …` | ask for more inside the deal instead of less · the extra money moves only with a condition said out loud |

  Se conserva `if it can't leave now` en fila propia: es el salvavidas de después de la carta y
  enterrarlo sería perder una pieza.

Las dos quedan en **8 filas para 8 turnos**, dentro del 6-9.

### T2 · MEDIO, ROLE B — las dos mitades del arranque están en la cola

El arranque de B, según la comprobación de los tres primeros turnos del diseño, es: *saluda, señala
la rueda de atrás y dice cuánto le falta de arreglos*. En la tabla eso son dos filas:

| fila | función | forma | turno del diseño |
|---|---|---|---|
| **7** | `opening` | `Good morning — thanks for …` | **B1, primera mitad** |
| 8 | `saying no` | `That's more than I can …` | medio |
| **9** | `the bike` | `The rear tire is …` · `A new tire and a new seat — that's about …` | **B1, segunda mitad** |

Las tres últimas filas leídas de arriba abajo entregan el saludo y el ataque a la llanta con una
sola fila en medio. No es la cola-cierre del escenario 3 —ahí eran tres turnos seguidos— pero es la
misma familia: **el arranque completo vive en el último tercio de la tabla y se lee de un vistazo**.
En A no pasa: su fila `opening` cae en la 5, y su turno 1 real (`the price`) en la 8.

**Arreglo, 1 palabra por 1 palabra, coste 0 de prosa:** renombrar la función `opening` de B (l. 184)
a `greeting`. Con el alfabético, `greeting` cae en la fila 3-4 y se separa de `the bike`, que queda
la última. Orden resultante tras T1 + T2: *asking about theirs · closing the question · greeting ·
if it can't leave now · money · moving the deal · saying no · the bike* → mediotardío, reactivo,
B1a, post-carta, B2, tardío, medio, B1b. La cola termina en el turno 1, que es la forma que
`fase12-calcable-3` dio por buena. **El `opening` de A no se toca**: ahí no estorba, y además es la
fila que suple la apertura de igual a igual que le falta a la caja (pendiente 2 del propio archivo).

### T3 · FORMA, los dos roles — la cabecera no dice que el andamiaje es opcional

Línea 96 y línea 174:

> `### Say it here — grouped by job, not in order · **don't read it out loud**`

Las cuatro fichas normalizadas en `fase12-tablas.md` (escenarios 2, 5, 6 y 7) llevan hoy:

> `### Say it here — grouped by job, not in order · use it or don't · **don't read it out loud**`

Falta `use it or don't`, que es requisito de §10-§11 y es justo lo que baja la presión de leer la
tabla como guion. **Coste medido, no estimado:** el contador canónico sí cuenta esta línea (no
empieza por `|`). Aplicado sobre una copia: **ROLE A 444 → 449 · ROLE B 436 → 441**. Cabe, pero deja
A con **1 palabra de aire**. Si la pasada quirúrgica quiere margen, la manera limpia de pagarlo es
la l. 44: `You put it on Marketplace three weeks ago, and…` → `You put it on Marketplace, and…`
(−3 palabras; `posted three weeks ago` ya está en la fila `Ad price` de `Facts`).

### T4 · FORMA, ROLE A l. 105 — la nota es una oración cerrada con punto

> `| the clock | `The shop closes at …` | the clock is a problem for both of you. Say it |`

Es la única celda de las 18 de la columna `what it does here` con oración cerrada, punto incluido y
un imperativo detrás. No es decible —`both of you` dicho a una sola persona se rompe— pero es el
patrón exacto que §11 prohíbe en las columnas de nota. **Muere con la fusión de T1** (`a problem for
both of you · say why today, don't ask for pity`), sin edición aparte.

### T5 · FORMA, ROLE A l. 100 — la columna `form` dice *cuándo* decirlo

> `| asking about theirs | `How are you going to …?` · later: `Is that still …?` | … |`

`later:` es una instrucción de orden metida en la columna de formas: el único sitio de las dos
tablas que le dice al estudiante en qué momento soltar algo. Es lo mismo que `fase12-calcable-3`
reprochó a `I can do it, but only if …` en la última fila del molde. Y sobra: su propia celda `here`
ya explica el porqué («their answer can change in the middle of it»).

**Arreglo, −1 palabra:** borrar `later:`.

### Lo que la tabla de A hace bien y conviene no romper

- Su turno 1 real (`the price`: recibo y número) está en la **fila 8 de 9**, y la fila 1 es la
  pregunta de transporte, que es material de cierre. Leída en orden, la tabla de A **no es la
  conversación**.
- La concesión con condición (`If you …, I can …`) está en la fila 4, en mitad de la tabla, y su
  celda `here` dice la regla («the condition goes in the same turn, out loud») sin decir el turno.
- Ninguna secuencia de filas de A reproduce el cierre: el cierre de este escenario son los cuatro
  datos de la pantalla compartida, y ninguna fila los nombra. Los dos leaks que `fase12-tablas`
  encontró en los escenarios 2 y 5 —celdas que decían *«that's point 3 of the close»*— **aquí no
  existen**.

---

## 4 · Al filo, señaladas y no contadas

| dónde | literal | por qué no cuenta |
|---|---|---|
| A · `You can't` 1 (l. 49) | `A smaller number needs a condition, and you say the condition out loud, in the same turn.` | la primera mitad sí se diría; la línea **entera** no, porque `in the same turn` es jerga de juego. Si la pasada quirúrgica quiere blindarla: `A smaller number needs a condition from you, said out loud, in the same turn.` (16 → 14 palabras) |
| B · `Where you are` (l. 123) | `You are in the lobby of a building in Cabecera.` | es la única oración de la ficha que **no se invierte** —A también está en ese lobby— pero decirla no abre ni cierra nada: no avanza ningún turno. Gemela de la que `fase12-calcable-3` señaló en el molde |
| B · `You can't` 3 (l. 130) | `After that, nothing moves.` | `that` sin referente en la mesa |
| B · `Only you know` 2 (l. 134) | `Without it, you have to pay to move the bike, and you need that money for the tire.` | la coordinada no la sostiene el vendedor |
| A · `You want` (l. 46) | `You have to get the bike out today, and…` | la coordinada del dinero la rompe |
| B · vocab `lock` (l. 162) · `a scratch` (l. 158) | `45,000 you can ask for, and it costs them nothing` · `small, but you count it` | pronombre + verbo **incrustado**, no inicial. Mismo criterio que fase 9 y fase 10 |
| Carta (l. 203) | `No truck today.` | **la señalo aunque no la cuente.** Es la única línea de todo el archivo que B puede levantar entera y que mueve la conversación. Se sostiene la decisión del hallazgo 26: es un documento de un tercero citado, leer en voz alta un WhatsApp es conducta real y no calco, y las otras dos oraciones (`I'm going to Barrancabermeja.`) se invierten. **No tocar** |
| `how it ends` (l. 223) | `That works for me.` · `OK — deal.` · `Let's do that, then.` | son exponentes a propósito (bloque 2 de la caja, que no los tiene todavía). Ojo de forma: son los únicos exponentes fuera de las dos tablas y viven en la única pantalla **sin** el aviso `don't read it out loud`. No se cuenta; se anota para cuando la caja los absorba |

`how it ends` (l. 215-222) y los cuatro puntos del cierre: **0 decibles**. Son sintagmas sin verbo
conjugado (`Who moves it, at what time, and how far.`) o instrucciones con `you both`, que en boca
de uno de los dos es incoherente.

---

## 5 · Cifras caducadas dentro del propio documento

| línea | qué dice | qué es verdad hoy |
|---|---|---|
| 431 | `ROLE A **443** · ROLE B **436**` | **444** y 436 con el contador canónico. Cambiar el 443 por 444 |
| 332 | `(sigue en 9 filas, dentro del 6-9)` | cierto en la banda 6-9, **falso** en la otra prueba de §11: 9 filas > 8 turnos. Con la fusión de T1 pasa a `8 filas` |
| 28 · 41 · 120 | `A 8 turnos · B 8 turnos` | consistente dentro del archivo, pero el motor (`fase4-escenarios-1-3.md` §1) sigue diciendo **6 turnos por rol**. Fuera de este archivo; se anota porque de ese número depende T1 |
| 41 · 120 | `About 8 turns · 6 minutes.` | las fichas 2 y 6 dicen `About 9 turns each`. Aquí falta `each`, y la ficha presume en la l. 293 que la unidad está clara en las dos pantallas. +1 palabra por rol si se corrige; con T3 aplicado, A quedaría en **450 clavado** |

---

## 6 · Lista de arreglos para `habla-fichas-de-rol`, con presupuesto

Ninguno reescribe nada: son seis ediciones puntuales, y cinco de las seis no tocan el contador.

| # | dónde | arreglo | coste en prosa |
|---|---|---|---|
| 1 | B · l. 129 | `… in the same turn — moving the bike counts.` (funde la oración suelta) | **0** |
| 2 | A · l. 105 + l. 108 | fusión en una fila `the clock` con las dos formas | **0** (tabla) |
| 3 | B · l. 179 + l. 183 | fusión en una fila `moving the deal` con las tres formas | **0** (tabla) |
| 4 | B · l. 184 | `opening` → `greeting` | **0** (tabla) |
| 5 | A · l. 100 | borrar `later:` | **0** (tabla) |
| 6 | l. 96 y l. 174 | añadir `· use it or don't` a las dos cabeceras | **+5 por rol** → A 449, B 441 |

Si además se corrige `About 8 turns` → `About 8 turns each` (+1), **A queda en 450 clavado**: en ese
caso hay que pagarlo antes con la l. 44 (`You put it on Marketplace three weeks ago, and…` →
`You put it on Marketplace, and…`, −3 palabras, dato duplicado en `Facts`).

Con los seis aplicados: **0 líneas decibles sobre 149 unidades**, las dos tablas en 8 filas para 8
turnos, y ninguna secuencia de filas que reproduzca el arranque ni el cierre.
