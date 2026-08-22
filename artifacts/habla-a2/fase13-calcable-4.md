# Fase 13 · Calcabilidad con las dos tablas DENTRO — escenario 4, `the-pot-is-already-on`

**Auditado:** `artifacts/habla-a2/fase8-fichas-4nuevo.md` tal como está hoy en disco (22 ago 2026;
último commit que toca el archivo: `0a57fe20`, sin cambios sin commitear). Leído del disco: **ninguna
cifra declarada dentro del documento se ha dado por buena**.

**Contra:** `fase10-calcable-4.md` (la pasada anterior de calcabilidad de este escenario) y el método
de `fase12-calcable-3.md`. Entra en la auditoría lo que añadió la **pasada de carga**
(`fase12-carga.md` §1: la forma `How many are coming back at …?`, la primera oración de
`The lunch happened if`, las tres líneas de `Only A can say` y la quinta regla) y lo que añadió la
**séptima pasada** (registro en cabecera y columna `register`).

**Alcance:** prosa de las dos fichas, filas de datos, filas de vocabulario, carta,
`how it ends` / `The lunch happened if` / `You rode off right if`, **y las dos tablas de exponentes**.
En las tablas no se audita si sus formas son decibles —lo son a propósito— sino las cinco preguntas
de §11: la tabla leída en orden ¿es la conversación?, ¿agrupada por función y alfabética?, ¿más filas
que turnos?, ¿la columna `what it does here` son notas?, ¿alguna secuencia de filas reproduce el
arranque o el cierre?

**Techo de prosa, medido hoy** con el único contador válido
(`node artifacts/habla-a2/fase7-scripts/prosa-canonica.mjs`): **ROLE A 446 · ROLE B 450**, tope 450.
Cumple, y **B no tiene un solo hueco**. Todos los arreglos de abajo cuestan **cero o menos**.

---

## Veredicto

**DEVUELTO · 2 líneas decibles sobre 160 unidades · 3 defectos estructurales, los tres en las
tablas de exponentes.**

Lo que devuelve el escenario **no es una frase de prosa**: es que **la cola de la tabla de ROLE B es
su cierre en orden** —el mismo defecto exacto que `fase12-calcable-3.md` §2 encontró en el molde— y
que estas dos tablas son **las únicas dos de las dieciséis del set** cuya cabecera no le dice al
estudiante que la lista **no va en orden**. Las dos cosas se dan juntas en la misma ficha: la tabla
más parecida a un guion es la única sin el aviso que impide leerla como guion.

El cepillo de prosa queda casi limpio: **una** línea decible (l. 114), heredada, que ninguna de las
dos pasadas anteriores marcó pese a haber marcado su gemela en el rol A. La segunda decible está en
una celda `what it does here`, columna que entra hoy por primera vez.

**160 unidades** = 63 oraciones de prosa de rol (31 A + 32 B) + 47 filas de datos y vocabulario
(24 A + 23 B) + **18 filas de exponentes (9 + 9), contadas por primera vez** + 13 unidades de la
carta + 19 líneas de `how it ends`.

---

## 1 · La pasada anterior: qué sigue vivo

`fase10-calcable-4.md` cerró 12 hallazgos de fase 9 y dejó **uno abierto (N1)** y **tres riesgos sin
marcar**.

| de fase 10 | estado hoy | línea literal de hoy |
|---|---|---|
| **N1** · `The group agreed to this plan on Friday.` (l. 23) | **arreglado** | `You lit the fire at nine, for Friday's plan: everybody here at one.` — el dato quedó como nota tras dos puntos, exactamente como se pidió |
| riesgo 1 · l. 118 | **vivo, y sigue sin contar** | `You have not said a word about it.` — `it` no tiene referente para Fabián, así que dicha tal cual no avanza |
| riesgo 2 · l. 201 | **vivo, y sigue sin contar** | `You can't be that somebody.` — en boca de A juega contra su propio interés |
| riesgo 3 · l. 75 | **vivo, y sigue sin contar** | `why one o'clock needs a second person` — sintagma, sin verbo conjugado en la matriz |

**Lo que fase 10 no podía ver:** declaró las dos tablas «fuera de alcance por diseño». Ahí estaban
los tres defectos que devuelven hoy el escenario.

**Lo que fase 10 sí podía ver y no vio:** la l. 114. Fase 9 marcó `If it goes in before twelve, you
feed twelve.` como decible **por el `you` impersonal** (hallazgo A3, arreglado). La misma estructura
vive intacta en el rol B desde entonces, dos veces, y no se citó ninguna de las dos.

---

## 2 · Las dos tablas, auditadas como objeto

### Lo que cumplen las dos

| prueba | ROLE A | ROLE B |
|---|---|---|
| una función por fila, no un turno por fila | sí, 9 funciones | sí, 9 funciones |
| orden alfabético estricto por función | **sí** (verificado por script) | **sí** |
| filas ≤ turnos (9 por rol) | 9 ≤ 9 | 9 ≤ 9 |
| dentro del 6-9 de §11 | 9 | 9 |
| `form` en troncos con `…` | **12 de 12** | **12 de 14** · las dos sin elipsis son `What is ready now?` y `And what can I take cold?`, preguntas abiertas **sin ningún dato dentro**: permitidas por el criterio de `fase12-tablas.md` §4 |
| `what it does here` en notas | 9 de 9 limpias | **8 de 9** — ver hallazgo 4 |

Nota de contexto para quien mida el conjunto: la pasada de carga añadió **una forma** a la fila 3 de
A sin añadir fila, así que el recuento de filas aguantó. Las formas ya no son 18 como declara el
archivo: son **26** (12 + 14).

### HALLAZGO 1 · GRAVE · ROLE B — la cola de la tabla es el cierre de B, en orden

Turnos según el mapa canónico de los 18 (`fase8-escenario-4nuevo.md` §9), que es el único mapa de
turnos del escenario:

| fila | función | turno | qué pieza del cierre lleva |
|---|---|---|---|
| 1 | advice, about his side | 4 | — |
| 2 | asking what's ready | 8 | — |
| 3 | complaining | 6 | — |
| 4 | insisting, with a new reason | 10 | — |
| 5 | opening, and what happened | 2 | — |
| 6 | saying no to the bike | 16 | — |
| **7** | **taking it back** (`At ten I told you …. That's not true now.`) | 14-16 | **línea 1 de B**: «how many really come back, and before what time — not what you said at ten» |
| **8** | **who rides and who walks** (`Marcela can take …, and the rest walk from …` · `They can be out of the water at …`) | 14 | **líneas 2 y 3 de B**: «who rides and who walks, and how long that walk takes» · «what B tells the six, and before what hour» |
| **9** | **yes, with a string** (`I'll bring some of them back, but only if …`) | **18** | **su último movimiento**: conceder con condición |

Las **tres últimas filas, leídas de arriba abajo, son las tres líneas del cierre de B y su turno
final, en ese orden y sin nada intercalado**: me desdigo → doy el plan en personas y minutos →
concedo con condición. Un B que lea 7-8-9 y las diga tiene su mitad del cierre resuelta **sin
escuchar a A**, y la fila 9 en última posición hasta le dice *cuándo* soltar la condición. Es
palabra por palabra el defecto que `fase12-calcable-3.md` §2 encontró en el molde y que
`fase13-calcable-3.md` ya cerró allí.

Agravante: la etiqueta `who rides and who walks` **repite literalmente** las palabras de la línea 2
del cierre común (l. 211). Es el mismo tipo de fuga que `fase12-tablas.md` §1 sacó del escenario 2
(«the fourth point of the close»): la tabla no solo reproduce el cierre, lo señala.

**Arreglo — dos etiquetas de la columna `function`, cero palabras de prosa** (el contador no cuenta
líneas que empiezan por `|`; verificado en `prosa-canonica.mjs`):

- `who rides and who walks` → **`bikes and feet`**
- `yes, with a string` → **`granting it, with a string`** (mismo verbo que el `granting it` con el
  que se cerró el molde: criterio único en el set)

Orden alfabético resultante y turnos que produce leído de arriba abajo:

`advice, about his side`(4) · `asking what's ready`(8) · **`bikes and feet`**(14) · `complaining`(6) ·
**`granting it, with a string`**(18) · `insisting, with a new reason`(10) · `opening, and what
happened`(2) · `saying no to the bike`(16) · **`taking it back`**(14-16)

Las tres piezas del cierre quedan en las filas **3, 5 y 9**, separadas por `complaining` y por tres
filas más. La cola pasa a ser `opening` → `saying no` → `taking it back`: turnos 2 · 16 · 16, y ya
no acaba en el otorgamiento. Sigue alfabética, sigue con 9 filas, ninguna forma cambia.

### HALLAZGO 2 · ROLE A — el otorgamiento en la última fila, y la carga acercó la tabla al arranque

Mismo mapa canónico:

| fila | función | turno | pieza del cierre |
|---|---|---|---|
| 1 | advice, about her side | 7 | — |
| 2 | asking again, with a new reason | 9 y 13 | — |
| **3** | **asking how many, and how they get back** (`How many are coming back at …?`) | **1** | — |
| **4** | **opening** (`Come here a second, before you …`) | **1** | — |
| 5 | the gate, at one | 5 (carta) | línea 3 de A |
| 6 | the pot, and how many | 3 | línea 1 de A |
| 7 | two rounds | 15 | la pieza conjunta («the time of the second round») |
| 8 | what it costs you | 11 | línea 2 de A, el precio |
| **9** | **yes, with a string** (`The container can go, but only if …`) | **17** | el otorgamiento |

Dos cosas, ninguna tan grave como la de B pero las dos del mismo tipo:

1. **Las cinco últimas filas llevan todo el cierre de A** y las cuatro primeras no llevan nada. Y las
   filas **8→9** leídas en orden son exactamente la quinta regla del cierre —«nothing leaves this
   patio for free: say what you give, and say what you get for it»— servida en dos filas contiguas:
   digo lo que me cuesta, y concedo con condición. La última fila vuelve a decir *cuándo* soltar la
   condición por su posición.
2. **La pasada de carga movió la fila 3 del turno 13 al turno 1** al meterle `How many are coming
   back at …?`, y la dejó **pegada encima de `opening`**. El arranque de A ya no está repartido por
   la tabla: son dos filas contiguas, 3 y 4. Leídas de arriba abajo salen invertidas (pregunta,
   luego apertura), y por eso **no se cuenta**; pero es un clic más cerca del guion que antes de la
   carga, y conviene que quede escrito.

**Arreglo — una etiqueta, cero palabras de prosa:**

- `yes, with a string` → **`granting it, with a string`**

Orden resultante: `advice, about her side`(7) · `asking again…`(9) · `asking how many…`(1) ·
**`granting it, with a string`**(17) · `opening`(1) · `the gate, at one`(5) · `the pot, and how
many`(3) · `two rounds`(15) · `what it costs you`(11).

Con esa sola celda se arreglan las dos cosas a la vez: el otorgamiento sale de la última fila y se va
a la cuarta, y **de paso separa la fila 3 de `opening`**, que quedan en 3 y 5. La cola pasa a ser
3 · 15 · 11: ya no es el cierre en orden.

*Opcional, también gratis:* `what it costs you` → `the Monday container` (cae entre `the gate` y
`the pot`, deja la cola en 5 · 11 · 3 · 15 y quita el eco de la línea 2 del cierre).

### HALLAZGO 3 · las dos cabeceras — únicas 2 de 16 sin `not in order`

> l. 83 · `### Out loud, in this patio — grouped by job · **don't read it out loud**`
> l. 166 · `### Out loud, before the bike — grouped by job · **don't read it out loud**`

Verificado por búsqueda literal sobre los ocho archivos: **las otras catorce tablas del set dicen
`grouped by job, not in order`**. Estas dos dicen solo `grouped by job`. `not in order` es la única
frase de la ficha que le dice al estudiante que la lista **no es la conversación**, y falta
precisamente en la ficha cuya cola sí lo era. Son además las dos únicas que no se llaman `Say it
here`, con lo que la sección tampoco es reconocible entre escenarios.

**Arreglo — coste EXACTAMENTE cero en los dos roles** (medido: la cabecera actual son 16 palabras y
la propuesta también son 16; ojo, el contador canónico **sí** cuenta los encabezados `###`, que es
como los escenarios 2, 5, 6 y 7 se pasaron del techo en `fase12-calcable-2.md` §3):

```
### Say it here — by job, not in order · **don't read it out loud**
```

Se escribe `by job` y no `grouped by job` porque la literal del set son 17 palabras: A podría
pagarla (447) y **B no** (451). Y **no se añade `use it or don't`**: cuesta cinco palabras más y
`fase12-calcable-2.md` §3 pide quitarlo de las cuatro fichas donde entró, no propagarlo.

### HALLAZGO 4 · `what it does here` — una celda que no es nota

> l. 176 · `| taking it back | … | the sentence this whole scene is waiting for. Late is fine; never is not | informal |`

**`Late is fine; never is not.`** es la **única oración cerrada** de las 18 glosas de las dos tablas:
verbo conjugado, sin ninguna deixis que girar, y dicha por Astrid defiende su propia rectificación.
La columna tiene que ser nota, y aquí es línea. Segundo problema en la misma celda: *«this whole
scene»* le habla al estudiante del escenario desde dentro de la mesa, cosa que no hace ninguna de las
otras 17.

**Arreglo — 14 palabras → 9, cero prosa** (celda de tabla):

`the sentence this scene waits for · late, not never`

---

## 3 · El cepillo — prosa, datos, vocabulario, carta, cierre

**Una decible.** Repasadas las 63 oraciones de prosa de rol, las 47 filas de datos y vocabulario, las
13 unidades de la carta y las 19 líneas del cierre.

### D1 · ROLE B, restricción 3 (l. 114) — heredada, nunca citada

> `3. On that bike you carry only what fits between your feet.`

Oración completa, con **`you` impersonal**: dicha por Astrid a Fabián no se invierte —nadie oye «tus
pies» como los pies de Fabián en una regla general sobre esa moto— y **el turno avanza**: es su no
en seco a la idea de mandar la olla. Su propio exponente para ese movimiento es un tronco
(`Nothing big fits on …`, l. 175), o sea que la ficha le da en la prosa, entera y gratis, la frase
que la tabla le hace construir.

Es la misma estructura que fase 9 marcó y fase 10 verificó como cerrada en el rol A (`If it goes in
before twelve, you feed twelve.` → `If you put it in before twelve, you feed twelve.`). Aquí no se
aplicó el mismo criterio.

**Arreglo — 12 palabras → 10 (−2 en ROLE B: 450 → 448):**

`3. On that bike, only what fits between your feet.`

Sin verbo conjugado en la matriz: sintagma, como las siete filas que la tercera pasada ya convirtió
por esta misma razón. Y de paso le devuelve a B el margen que la séptima pasada le quitó.

### D2 · la gemela, en la misma ficha (l. 125) — al filo, señalada y no contada

> `Between your feet you can carry a cooler, and nothing bigger.`

No se cuenta porque `you can carry` atribuye la capacidad **al oyente**, y Fabián no va en la moto:
dicha tal cual se oye mal y hay que reparar. Pero es la misma frase dos veces en la misma ficha, y
**quien toque la 114 tiene que mirar esta en el mismo movimiento** o el arreglo dura un turno.

**Arreglo si se toca — 11 palabras → 8 (−3 en ROLE B):** `Between your feet: a cooler, and nothing
bigger.`

### Lo demás, al filo y no contado

| dónde | literal | por qué no cuenta |
|---|---|---|
| cierre, regla 5 (l. 221) · **nueva de la pasada de carga** | `And nothing leaves this patio for free: say what you give, and say what you get for it.` | la cláusula `nothing leaves this patio for free` es oración cerrada sin deixis y **es** el movimiento `granting it` de A, en una pantalla que leen los dos. No se cuenta porque la unidad entera arranca en `And` y sigue en dos imperativos al jugador: dicha entera no avanza. **Vigilar si alguien vuelve a tocar las reglas** |
| A · `The lunch happened if` (l. 98) | `The chicken went in at twelve for a real number.` | única oración de la lista que no está en segunda persona, pero es pasado y a las 11:20 es falsa: no mueve turno |
| A y B · `The lunch happened if` / `You rode off right if` | `What is open has a name and an hour…` | rúbrica sobre la partida, no turno. Ya estaba |
| A l. 89 y B l. 171 | `the one question she can't answer with yes or no` / `the one question he can't answer with yes or no` | notas, no líneas; se anota solo porque la misma glosa aparece en los dos roles |
| los tres riesgos de fase 10 (ll. 75, 118, 201) | ver §1 | siguen exactamente como los describió fase 10 |

---

## 4 · El archivo ya no se describe a sí mismo

Cero coste (todo son filas de tabla) y hay que arreglarlo con lo demás, porque el que mida después
va a creerle al documento antes que al contador:

| # | dónde | qué dice | qué es verdad hoy |
|---|---|---|---|
| 1 | ll. 246-247, tabla **El recuento de prosa** | `ROLE A 444` · `ROLE B 449` | **446 y 450**, medido hoy con `prosa-canonica.mjs`. Lo dice la propia séptima pasada en la l. 391, pero la tabla que se presenta como el recuento vigente **no se actualizó**. Tres cifras para una ficha: exactamente lo que el contador único existe para impedir |
| 2 | l. 262, punto 4 del changelog | «leída de arriba abajo da los turnos 7 · 9 · 13 · 1 · 5 · 3 · 15 · 11 · 17» | **falso desde la pasada de carga**: la fila 3 dejó de ser el turno 13 y pasó a ser el turno 1 al ganar `How many are coming back at …?`. La secuencia real es 7 · 9 · **1** · 1 · 5 · 3 · 15 · 11 · 17 |
| 3 | l. 262, misma celda | «troncos con `…` en las **dieciocho** formas» | las formas son **26** (12 en A, 14 en B); 24 llevan elipsis y las 2 que no la llevan la tienen permitida por no contener ningún dato |
| 4 | ll. 244-248 y §§ de pasadas | ninguna pasada registra las de la 6.ª y 7.ª en la tabla de recuento | mismo defecto que `fase13-calcable-3.md` §5 encontró en el molde: el registro dejó de describir el archivo |

**De paso, y no es de calcabilidad:** la carta sigue diciendo *«When her fourth turn ends — global
turn 5»* (l. 187). Con A abriendo, el turno global 5 es el **segundo** turno de ella. Lleva tres
pasadas declarado abierto y el arreglo cuesta **cero palabras**: `fourth` → `second`. Y el toolkit de
A (l. 81) sigue nombrando `the jar`, que no existe en ninguna de las dos fichas: es hallazgo de nivel,
sigue vivo, sigue sin tocar.

---

## 5 · La cuenta del arreglo

| hallazgo | qué se toca | coste en ROLE A | coste en ROLE B |
|---|---|---|---|
| 1 · cola de B = su cierre | 2 celdas `function` | 0 | 0 |
| 2 · otorgamiento en la última fila de A | 1 celda `function` | 0 | 0 |
| 3 · cabeceras sin `not in order` | 2 encabezados `###` | 0 (16 → 16) | 0 (16 → 16) |
| 4 · glosa que es línea | 1 celda | 0 | 0 |
| D1 · l. 114 | 1 oración de prosa | 0 | **−2** |
| *(opcional)* D2 · l. 125 | 1 oración de prosa | 0 | −3 |
| archivo · §4 | 4 filas de tabla y un `fourth` → `second` | 0 | 0 |

**Después: ROLE A 446 · ROLE B 448** (o 445 con D2), techo 450. Ni un dato, ni una hora, ni un
nombre, ni un turno del mapa, ni una forma de exponente. **Devuelto a `habla-fichas-de-rol`.**
