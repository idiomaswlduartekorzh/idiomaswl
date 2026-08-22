# Fase 10 · Verificación de la pasada quirúrgica — escenario 1, `the-bike-in-the-parking-lot`

**Auditado:** `artifacts/habla-a2/fase7-fichas-1-the-bike-in-the-parking-lot.md` en disco hoy
(22 ago 2026), contra `artifacts/habla-a2/fase9-calcable-1.md`. Se leyó además el diff completo
contra `HEAD` para comprobar que la pasada fue quirúrgica y no una reescritura.

**Fuera de alcance, igual que en fase 9:** las dos tablas `Say it here`, el bloque final en español,
la carta de WhatsApp y la pantalla compartida bajo `When you agree, say it:`.

---

## Veredicto

**PASA CON CAMBIOS · 1 línea decible sobre 113 unidades.** No es nueva: es el hallazgo 5, aplicado
al pie de la letra y **mal reparado por la reescritura que este mismo informe prescribió en fase 9**.
El defecto grave —el dato oculto redactado como oferta— está cerrado.

Denominador: 73 oraciones de prosa (ROLE A 36 · ROLE B **37**, una más que en fase 9 porque la línea
135 se partió en dos al reescribirla) + 40 filas de tabla en alcance. 112 → **113 unidades**.

**Prosa dentro de techo**, verificado con el contador canónico: ROLE A **443**, ROLE B **436**,
tope 450.

---

## 1 · La pasada se respetó: nadie reescribió

Diff contra `HEAD`: **20 líneas de cuerpo modificadas y ni una más**, más una sección de bitácora
añadida al final (`Cuarta pasada, 22 ago 2026`). Las 20 están todas citadas por `fase9-calcable-1`
(8) o por `fase9-nivel-1` (12: líneas 59, 94, 112, 113, 130, 134, 135, 163, 190, 191, 192, 222).
No se movió ninguna sección, ninguna tabla, ningún dato del motor, ningún exponente, ningún
`rationale`. Las referencias de línea de fase 9 siguen apuntando a donde apuntaban.

---

## 2 · Hallazgo por hallazgo

| # | dónde | estado | línea nueva |
|---|---|---|---|
| 1 | A · `You want` (46) | **arreglado** | `You will not sell it for less than 390,000 with the new gears on.` |
| 2 | GRAVE · A · `Only you know` (54) | **arreglado** | `You would sell it for 330,000 with the old gears back on, and lose nothing.` |
| 3 | GRAVE · A · `Only you know` (56) | **arreglado** | `You never put the lock or the lights in the ad, and no buyer has asked.` |
| 4 | A · `Only you know` (57) | **arreglado** | `You heard the same speech about the tire from all three buyers before.` |
| 5 | A · `You can't` 3 (51) | **a medias** | `You need the shop for that, before one.` |
| 6 | A · tabla `Facts` (69) | **arreglado** | `| The old gear set | still works · the two small gears, hard to use |` |
| 7 | B · `You want` (125) | **arreglado** | `You cannot pay more than 350,000 in cash, and only for the bike alone.` |
| 8 | forma · A · vocab `worn out` (89) | **arreglado** | `the rear tire · their argument, not yours` |

**El 2 se comprueba en la dirección que importa.** `You would sell it for 330,000…` en boca de A y
dirigida a B significaría que **B** vende: imposible. El número de 330.000 deja de estar disponible
como oferta leída, que era lo único que hundía la ficha. Igual el 1 (`you will not sell it`), el 7
(`you cannot pay`) y el 3 (`you never put … in the ad`, y B no puso el anuncio).

**Por qué el 5 sigue abierto.** `You need the shop for that, before one.` cae justo en la trampa que
la §Revocación de fase 9 describe, y la reescritura la ignoró por venir de mí: `need` es un predicado
que **el que escucha puede sostener**, y en inglés hablado el `you` genérico lo hace todavía más
cómodo. Si B pregunta si se pueden dejar los platos viejos, A dice tal cual «You need the shop for
that, before one» y el turno avanza con naturalidad. Antes de la pasada (`That needs the shop,
before one`) era decible por falta de deixis; ahora lo es por deixis que aterriza en el otro.
Se cambió el síntoma, no la clase.

**Qué falta ahí, en concreto:** un predicado que B no pueda ocupar. Sirve anclarlo en lo que A hizo
o tiene —el taller que se los puso, el reloj de A— en vez de en una regla del mundo. Orientación,
no reescritura cerrada: algo del tipo `You watched La Bici Roja put them on, and they are the only
ones who take them off before one.` Lo decide `habla-fichas-de-rol`; la restricción de contenido
—platos fuera solo en taller, antes de la una— no se toca.

---

## 3 · Cepillo entero: ¿aparecieron nuevas? No

Las 12 líneas que entraron por `fase9-nivel-1` no fueron auditadas nunca por calcabilidad, así que
se pasaron una a una. Ninguna es decible:

| línea nueva | por qué aguanta |
|---|---|
| 130 `Say that this is the only bike for you.` | imperativa de restricción, como las otras cinco de los dos bloques `You can't`; dicha a A es una orden, no un turno |
| 134 `Your brother-in-law is bringing his truck at six.` | A no tiene cuñado en este trato: dicha a él no significa nada |
| 134 `Without it, you have to pay to move the bike, and you need that money for the tire.` | **al filo** — `you have to pay to move the bike` sí podría aterrizar en A (a él la bici también le tiene que salir hoy), pero la coordinada `you need that money for the tire` no la sostiene el vendedor, y `without it` cuelga de un camión que A todavía no conoce |
| 135 `You already gave the Nequi money a job: the tire, the seat and the lock.` · `Not the price.` | A **recibe** por Nequi, no reparte esos 70.000: no le cuadra a nadie |
| 112 · 191 `They named the rear tire before you did.` / `You named the rear tire before they did.` | criterios en pasado, metadatos del juego |
| 113 · 190 `…and they said yes.` | fragmento dentro de un criterio en pasado |
| 192 `They never found out that this is the only bike for you.` | criterio en pasado; contiene el dato oculto de B en cláusula subordinada, pero la oración entera no se puede pronunciar (y decir solo la subordinada es exactamente lo que la restricción 3 prohíbe) |
| 59 `You lose another Saturday with a fifth buyer` | B es comprador, no tiene compradores |
| 94 `Block **6** is for when they ask why.` | metadato con marcado, no turno |
| 163 `inside the price, with no extra money` | definición sin verbo conjugado |
| 222 `Say all four. If you both say the same, it's closed.` | instrucción de pantalla compartida; `you both` en boca de uno de los dos es incoherente |

**Al filo, señaladas y no contadas** (todas menos una ya venían de fase 9; ninguna avanza un turno):

| dónde | literal | estado |
|---|---|---|
| A · `You want` 46 | `You have to get the bike out today, and…` | ya estaba · la coordinada la rompe |
| A · `You can't` 1 (49) | `A smaller number needs a condition, and you say the condition out loud…` | ya estaba · segunda mitad es instrucción |
| A · `Facts`, `Money` (74) | `…the road bike: 750,000, you have 360,000` | ya estaba |
| B · `You can't` 2 (129) | `Moving the bike counts.` | ya estaba |
| B · `You can't` 3 (130) | `After that, nothing moves.` | ya estaba |
| B · `Only you know` 2 (134) | `Without it, you have to pay…` | **nueva**, entró por fase 9-nivel · misma familia que la 5: obligación en segunda persona |
| B · vocab `lock`, `here` (162) | `45,000 you can ask for, and it costs them nothing` | ya estaba · pronombre + verbo, no al inicio |
| B · vocab `a scratch`, `here` (158) | `small, but you count it` | ya estaba · misma forma que la anterior; fase 9 no la contó y se mantiene el criterio |

## 4 · La columna `here` — 20 de 20 limpias

Con el arreglo del 8, ninguna celda de las dos tablas de vocabulario empieza por pronombre + verbo
conjugado, ninguna lleva comillas ni cursiva, y ninguna filtra dato oculto. Quedan dos con
pronombre + verbo **incrustado** (`lock` y `a scratch` de B), no decibles y no contadas, pero son el
patrón que reincide: si el molde se arregla algún día, arréglense con él.

## 5 · Lo que sigue pendiente fuera de esta ficha

Sin cambio desde fase 9, y las dos siguen siendo la causa raíz:

1. **§11 no dice que la segunda persona no protege sola.** La reparación fallida del hallazgo 5 es
   la prueba: se aplicó la letra («ponle un *you*») sin la regla («protege el verbo»).
2. **`fase7-modelo-ficha-en.md`, línea 66**, sigue con la oración completa entrecomillada en la
   columna `here`.
