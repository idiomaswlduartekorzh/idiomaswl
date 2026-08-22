# Fase 13 · Verificación corta de calcabilidad — escenario 3, `swap-the-saturday-shift`

**Auditado:** `artifacts/habla-a2/fase7-modelo-ficha-en.md` tal como está hoy en disco (22 ago 2026;
último commit que toca el archivo: `0a57fe20`, sin cambios sin commitear).
**Contra:** `artifacts/habla-a2/fase12-calcable-3.md` (3 arreglos pedidos).

## Veredicto

**PASA · 0 líneas decibles · la tabla de exponentes de B ya no es un guion.**

Los tres arreglos están escritos en el archivo, citados abajo. Ninguna línea que lee el
estudiante necesita cambio. Queda **un arreglo de archivo** (el registro de cambios ya no
describe el archivo), que no toca ficha ni presupuesto y va devuelto a `habla-fichas-de-rol`.

## 1 · Los tres cambios — verificados sobre el disco

| # | pedido | estado | línea literal de hoy |
|---|---|---|---|
| 1 | dos etiquetas de `function` en ROLE B | **aplicado** (l. 173-174) | `| granting it | `I can do it, but only if …` | grant it with **one** condition, and hold it |` y `| the bus on Sunday | `My bus leaves at …` | the hard limit, said once, with the hour in it |` |
| 2 | fila de presupuesto de ROLE A | **aplicado** (l. 253) | `| ROLE A | **436 palabras** | 450 |` — y la l. 260 también dice hoy `ROLE A **436**, ROLE B **443**` |
| 3 | fundir oraciones 1 y 2 de `Where you are` de B | **aplicado** (l. 116) | `It is Tuesday, 3:40 in the afternoon, and you are in the back room tying your apron, with your shift twenty minutes away and Nayibe at the other café until six.` |

## 2 · La tabla `Say it here` de ROLE B, releída con el orden nuevo

| fila | función | turno del diseño |
|---|---|---|
| 1 | another way | medio-tardío |
| 2 | asking what they need | temprano |
| 3 | granting it | **cierre** |
| 4 | the bus on Sunday | B2 |
| 5 | the nine o'clock reservation | libre |
| 6 | what saying yes costs you | **B1** |

- **¿Sigue alfabética?** Sí: *another way · asking what they need · granting it · the bus on
  Sunday · the nine o'clock reservation · what saying yes costs you*. El artículo cuenta como
  parte de la etiqueta, igual que en ROLE A (*…· the exam*): mismo criterio en las dos tablas.
- **¿6 filas para 7 turnos?** Sí, 6 ≤ 7, y dentro del 6-9 de §11. La columna `form` sigue en
  troncos: 9 de 9 acaban en `…`, ninguna oración cerrada.
- **¿La cola es un guion?** No. Las tres últimas filas son ahora **B2 → libre → B1**: la tabla
  termina en el primer turno de B, al revés. El otorgamiento —lo único que decide el desenlace—
  queda en mitad de la lista, y `I can do it, but only if …` ya no dice *cuándo* soltarlo por su
  posición. El defecto de la fase 12 está cerrado.

Al filo, señalado y **no contado**: las filas 2→3 (`What exactly do you need — the … or the …?`
→ `I can do it, but only if …`) se pueden leer como «pregunto qué necesita y concedo». Son dos
filas de siete turnos y saltarse las cuatro de en medio hace fallar el propio `You did it if` de
B —no soltó la carta de las cuarenta personas, no dijo lo que le cuesta—, así que no es el arco:
es un atajo que la ficha castiga. Mismo criterio con que la fase 12 dejó fuera las filas 1→2 de A.

## 3 · Cepillo sobre la frase fundida de B (texto nuevo)

`It is Tuesday, 3:40 in the afternoon, and you are in the back room tying your apron, with your
shift twenty minutes away and Nayibe at the other café until six.`

**No es decible.** Dicha entera a A se invierte en `tying your apron` —A no se está poniendo el
delantal— y lo demás son adjuntos sin verbo conjugado. Lo que la salva no es la fusión sola: al
fundir se cambió `your shift starts in twenty minutes` (verbo conjugado, decible sin dueño) por
`with your shift twenty minutes away`, nominal. La hora, que suelta sí se podía decir, ya no es
oración. Cero coste: B sigue en **443**.

## 4 · Contador canónico

`node artifacts/habla-a2/fase7-scripts/prosa-canonica.mjs`, ejecutado hoy: **ROLE A 436 · ROLE B
443**, techo 450. Cumple, y coincide con lo que el archivo declara de sí mismo.
De paso: el set entero está hoy **16/16 dentro del techo** (media 446, peor 450). Los 7
desbordes que la fase 12 dejó anotados fuera de encargo están cerrados.

## 5 · Hallazgo nuevo — de archivo, no de ficha

La tabla **«Pasada quirúrgica (22 ago 2026)»** ya no describe el archivo. Declara en su entrada
«Solo las líneas citadas por `fase9-calcable-3.md` y `fase9-nivel-3.md`. Ninguna otra», y hoy el
archivo lleva encima tres cambios de la fase 12 que no figuran en ninguna de sus 22 filas. Su
fila 5 dice además que en `Where you are` de B se fundieron «oraciones 2 y 3», cuando hoy la
fusión incluye la 1. Es el mismo defecto que arregló `c424fdbb` en la ficha 5: el archivo
declarando de sí mismo algo que dejó de ser suyo.

**Arreglo** (cero prosa: el contador no cuenta filas de tabla): añadir a esa tabla las filas 23
`B · exponentes | `your condition` → `granting it`, `what you can't move` → `the bus on Sunday``,
24 `presupuesto, fila ROLE A | 441 → 436`, 25 `B · `Where you are` | oraciones 1 y 2 fundidas`,
las tres con origen `calcable 12`; y en la entrada, añadir `fase12-calcable-3.md` a las fuentes.

**Devuelto a `habla-fichas-de-rol`.**
