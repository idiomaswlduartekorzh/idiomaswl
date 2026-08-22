# Fase 9 · ¿Se puede leer en voz alta? — escenario 8, `cancel-the-gym-i-am-leaving`

**Auditado:** `artifacts/habla-a2/fase7-fichas-8-cancel-the-gym-i-am-leaving.md` tal como está en
disco hoy (22 ago 2026), con la pasada de `proponer-alternativa` y el reparto de género
(`B = Milena` → `B = Mauricio`) ya aplicados. Los informes de fase 7 y 8 se leyeron solo para
saber qué se dijo antes; nada se dio por bueno ni por malo por venir de ahí. **Se revoca una
conclusión de `fase7-calcable-8.md`** (§Revocación).

**Regla aplicada (§11, con las dos correcciones del 21 ago):**
- Tablas → notas, nunca frases. `here` → nota de propósito, sin comillas y sin pronombre + verbo
  conjugado.
- Prosa → inglés A2 legible, oraciones cortas y completas, escritas **sobre** el jugador.
- Prueba única: *si la línea se puede decir tal cual y el turno avanza, está mal escrita.*
- **La segunda persona no protege sola** (regla nueva de `fase9-calcable-1.md`): antes de dar una
  línea por segura hay que preguntar si el que escucha puede ser sujeto de ese predicado.

**Fuera de alcance por diseño:** las dos tablas `Say it here`, el bloque `After — both screens, in
Spanish`, `grammarReferences` y las notas de corrección. **La carta de Édison** se trata como
documento de tercero, igual que en el escenario 1: es un mensaje ajeno, citarlo en voz alta es su
función. Aun así se revisó: sus cuatro filas son notas (`none authorized · not one`, `not Thursday
— inventory count`) y no filtran nada que Mauricio no tenga que decir de todos modos.

**Techo de prosa, contador canónico** (`node artifacts/habla-a2/fase7-scripts/prosa-canonica.mjs`,
corrido hoy): ROLE A **445**, ROLE B **444**, tope 450. Cumple. Efecto de las reescrituras, al
final del informe: A **446**, B **446**, con un corte de pago en cada ficha.

---

## Veredicto

**NO PASA · 7 líneas decibles sobre 104 unidades** (64 oraciones de prosa —32 por rol— + 40 filas
de tabla en alcance: 10 de datos y 10 de vocabulario por rol). Más **2 defectos de forma** en la
columna `here` de Mauricio: no son decibles, pero son cláusulas con pronombre + verbo conjugado
dentro de una tabla, que es lo que §11 prohíbe ahí al pie de la letra.

**Reparto: ROLE A 3, ROLE B 4.** Se concentran en los dos bloques que más daño hacen —`Only you
know` (4 de las 7) y las restricciones de Mauricio (2)—, es decir, justo donde vive lo que el otro
no puede saber.

| bloque | unidades | decibles |
|---|---|---|
| A · `You can, but you don't have to` | 2 | **1** |
| A · `Only you know` | 9 | **2** |
| B · `You can't` | 7 | **2** |
| B · `Only you know` | 10 | **2** |
| B · vocabulario `here` (tabla) | 10 | 0 decibles + **2 de forma** |
| las otras 66 unidades | 66 | 0 |

**Por qué NO PASA y no PASA CON CAMBIOS.** Dos de las siete son fatales por sí solas:

- **la n.º 4**, `You can't cancel a plan inside its minimum term.`, es **el «no» entero del
  escenario** impreso listo para pronunciar, con el «you» aterrizando exactamente en Tatiana. El
  ejercicio existe para que Mauricio construya ese rechazo; la ficha se lo lee.
- **la n.º 7**, `Wilmer is gone because he promised three or four members what he could not give.`,
  es una viñeta de `Only you know` en tercera persona pura, sin una sola deixis que la ancle: se
  levanta de la pantalla y se dice. Es el caso que §11 declara fatal —el dato oculto ya convertido
  en frase—, el mismo mecanismo que tumbó el escenario 1.

Las reparaciones son todas de línea: el motor, los dos números, la carta y los tres puntos del
cierre no se tocan.

---

## Revocación de `fase7-calcable-8.md`

Aquel informe cerró en **PASA CON CAMBIOS · 7 líneas** y su clasificación separaba **FALLA** de
**RIESGO** con este criterio: si la línea «apunta mal» y basta cambiar un pronombre, no falla.
Con ese criterio dio por salvadas dos de las siete de hoy, y sobre todo bendijo el arreglo que él
mismo pidió: `It's all you have today.` → `Today you have nothing else.` y `The form takes a
reason, not a destination.` → `On the form you write a reason, not a destination.`

**Los dos arreglos no arreglaron nada.** Pasar una línea a segunda persona no la protege cuando el
que escucha **puede ser sujeto del predicado**, y aquí puede: tener hoy nada más y escribir una
razón en un formulario son cosas que Tatiana sostiene sin despeinarse. Las dos líneas nuevas se
dicen tal cual y el turno avanza. La ronda anterior midió el pronombre; hay que medir el verbo.

---

## Las siete, literal, con reescritura

### 1 · ROLE A · `You can, but you don't have to` (línea 47)

> `The dates are enough.`

Sin deixis, oración completa, y es su argumento: no tiene que decir a dónde va. Tatiana la lee y
el turno avanza.

**Reescritura:** `He cannot ask for more than your dates.`
(«he» apunta a un tercero en la boca de Tatiana y no avanza nada · 4 → 8 palabras)

### 2 · GRAVE — ROLE A · `Only you know`, viñeta 2 (línea 51)

> `He never wrote it down, he is gone, and you have no paper.`

Las dos primeras cláusulas son tercera persona pura sobre Wilmer —el argumento entero de Tatiana—
y la tercera, dicha a Mauricio, **aterriza bien**: «usted no tiene ningún papel», que es
precisamente lo que ella quiere hacerle admitir. Se dice entera. Y la mitad anterior de la viñeta,
`you leave the country, they cancel it`, es la promesa de Wilmer en *you* genérico: también se
pronuncia sin tocarla.

**Reescritura de la viñeta completa:**
`**Wilmer** sold you the plan and promised you out loud that they cancel for people who leave the
country. You never got that promise on paper, and he is gone.`
(30 → 30 palabras, neutro en presupuesto; `promised you` y `you never got` no los sostiene un
empleado del gimnasio)

### 3 · ROLE A · `Only you know`, viñeta 3 (línea 52)

> `The price stopped her.`

Tercera persona sin anclaje. Dicha después de nombrar a Yurany, avanza sola: es la carta de la
cesión.

**Reescritura:** fundir con la oración protegida que la precede —
`**Yurany**, from work, asked you about this gym two weeks ago, and the price stopped her.`
(15 → 16 palabras; al dejar de ser unidad autónoma desaparece la línea decible)

### 4 · GRAVE — ROLE B · `You can't`, restricción 1 (línea 116)

> `You can't cancel a plan inside its minimum term.`

**El rechazo central del escenario, servido hecho.** El «you» aterriza en Tatiana, el predicado lo
sostiene ella, la frase es A2 impecable y con ella Mauricio despacha el conflicto entero sin
producir una palabra. Es la primera línea de su primera restricción: la lee en el turno 2.

**Reescritura:** `A cancellation inside the minimum term is not yours to give.`
(«not yours to give» no lo puede sostener una socia: no da nada · 9 → 11 palabras)

### 5 · GRAVE — ROLE B · `You can't`, restricción 3 (línea 118)

> `On the form you write a reason, not a destination.`

Se dice tal cual y hace el trabajo del turno: le entrega a Tatiana la información que ella
necesita para no tener que revelar su destino, que es una de las tensiones del escenario. Es el
arreglo de `The form takes a reason, not a destination.` — cambió el sujeto y no cambió el riesgo.

**Reescritura:** `Édison reads a reason on that form, and never a destination.`
(el sujeto es un tercero que Tatiana no conoce: dicho en voz alta no avanza · 10 → 11 palabras)

### 6 · ROLE B · `Only you know`, viñeta 1 (línea 121)

> `Today you have nothing else.`

Dicha a Tatiana: «hoy no tiene nada más», que es exactamente el cierre de puerta que Mauricio
necesita dar cuando ofrece el caso. Segunda persona que aterriza en el otro.

**Reescritura:** `You have nothing else behind this counter today.`
(«behind this counter» excluye a la socia · 5 → 8 palabras)

### 7 · GRAVE — ROLE B · `Only you know`, viñeta 4 (línea 124)

> `Wilmer is gone because he promised three or four members what he could not give.`

**Dato oculto en frase pronunciable.** Tercera persona pura, causal completa, nivel A2: Mauricio la
lee y desactiva de un golpe la carta de Tatiana (la promesa de Wilmer). Es su información privada
y la ficha se la da dicha.

**Reescritura:** `You know why Wilmer is gone: he promised three or four members what he could not
give.`
(«you know why» dicho a Tatiana es falso —ella no lo sabe— y no avanza · 15 → 17 palabras)

---

## Los dos defectos de forma — columna `here` de Mauricio

No son decibles (el `she` apunta a quien escucha), pero incumplen §11 en la letra: cláusula con
pronombre + verbo conjugado dentro de una tabla. Son el mismo patrón que reincidió en el
escenario 1 (`they say it before you do`). Ninguno cuesta prosa.

| línea | literal | reescritura |
|---|---|---|
| 154 | `way one · to her, it sounds like a cancellation` | `way one · in her ears, the same word as a cancellation` |
| 156 | `way two · she does not know it exists` | `way two · not on her screen` |

La 154 llegó ahí en la ronda de la tarde (punto 7 de las notas: la viñeta *«A freeze ≠ a
cancellation»* se migró a esta celda) y arrastró la cláusula consigo. Ojo: el `rationale` de
`present-simple-negative` cita esa celda literal, así que si se cambia, se cambia también ahí.

---

## La lupa sobre la columna `here` — 18 celdas limpias de 20

Es el punto de riesgo declarado por §11 y hoy **no filtra ningún dato oculto** en ninguno de los
dos roles. Ninguna celda lleva comillas ni cursiva de cita.

- Las de Tatiana son nota de propósito, las diez: `the 5th of every month, and what it pays for`,
  `what Wilmer never gave you · what you want today`, `the reason he says no`, `where the whole
  problem starts`. Dicen para qué sirve la palabra, nunca qué se dice con ella. Los sintagmas del
  tipo `why it can't work` o `what you came for` son nominales, no cláusulas: no se pueden decir
  como turno.
- Las tres de Mauricio que más cerca estaban de filtrar aguantan por quedarse en **función**:
  `a cancellation` → `the word she came for · the one you can't say yes to`; `proof` → `your whole
  no · what her email has not got`; `to open a case` → `the only thing you can hand her today`.
- Las dos que caen (154 y 156) lo hacen por forma, no por filtración.
- La columna `what it is` usa cláusulas de diccionario en las dos fichas (`when the bank says no,
  and the money does not leave your card`, `the part of a company that calls you when you do not
  pay`). Es definición, no turno, y es la práctica de todo el set: no se cuenta.

## Las dos tablas `Facts` — 20 de 20 filas limpias

Ni una fila con verbo conjugado. Todo son elipsis con `·` (`expiry: August 31 · a new one: 8
business days`, `her signature + her ID + her reason · no proof needed · keeps today's date`) o
participios sin auxiliar (`ticket bought, in your name, one-way`, `moved from November 14`). La
fila nueva del reporte a cobranzas (`a transfer from anywhere, before the 12th · nothing else
after that`) entró en forma de nota y no rompe nada. Es el bloque mejor escrito de la ficha.

## Al filo, señaladas y no contadas

Ninguna avanza un turno tal cual, pero todas viven del mismo mecanismo. Si la próxima pasada tiene
margen, ánclense.

| dónde | literal | por qué no cuenta hoy |
|---|---|---|
| A · `Not about money` | `The problem is not the 92,000 pesos, but two months of a gym you cannot use.` | la primera mitad se dice sola, pero `a gym you cannot use` aterriza en un empleado que sí puede usar el gimnasio y rompe la línea |
| A · `You can't` 2 | `You work all day, and your only free hour is Thursday the 27th, 12:00 to 1:00.` | forma de `Your limit is…`, pero puesta en Mauricio no comunica la disponibilidad de ella: no hace el trabajo del turno |
| A · `If you walk away with nothing` | `Thursday is your last day here, and after that nobody at this counter can help you.` | la segunda mitad es una línea **de Mauricio**, no de ella; dicha por Tatiana no avanza |
| A · `Only you know` 4 | `You still have no return date, and nobody can give you one yet.` | el predicado lo sostiene cualquiera, pero puesto en él no transmite el vacío de ella |
| B · `You can't` 1 | `That answer belongs to retention, in writing, and not to you.` | media línea decible y útil (`belongs to retention, in writing`); la salva el `not to you` final, que apunta al hablante |
| B · `You can't` 2 | `Today you can open a case, and she will hear the two words as one.` | la oferta de la primera mitad aterriza bien; la coordinada con `she` rompe la lectura entera |
| B · `Only you know` 2 | `Your second way is a transfer, and she cannot see it.` | `Your second way is a transfer` se dice solo; lo corta `and she cannot see it` |
| B · `Only you know` 3 | `It's hard to say out loud.` | oración sin deixis, pero es meta del jugador: en el mostrador no significa nada |

## Lo que aguanta bien, y conviene no romper al arreglar

Las 66 unidades restantes están escritas con predicados que el otro **no puede sostener**, que es
la protección de verdad y no el pronombre: `You can't come back in office hours.`, `You fly on the
30th, and you keep paying.`, `You can't ask her where she is going, why, or what her plan B is.`,
`Last month you got a written warning: a freeze with no proof, for helping too much.`, `She leaves
with no signature and no reason, and the next complaint has your name on it.` Las cabeceras
(`Don't show it, don't read from it.`), las líneas de la caja (`Blocks 1 [asks] at the worst hour…`)
y los dos `You did it if` son metadato del juego, no turnos. La pantalla compartida `Both screens —
how it ends` habla de los jugadores por su nombre (`Tatiana signs the visit log.`): tampoco es
decible como turno.

## Presupuesto después de las reescrituras

| ficha | hoy | delta de las reescrituras | corte que lo paga | queda |
|---|---|---|---|---|
| ROLE A | 445 | +5 (n.º 1 +4, n.º 2 0, n.º 3 +1) | `four people behind you` de `Where you are`, que repite literal la fila `Now` de sus datos (−4) | **446** |
| ROLE B | 444 | +8 (n.º 4 +2, n.º 5 +1, n.º 6 +3, n.º 7 +2) | `It's hard to say out loud.` (−6), que además está señalada al filo | **446** |

Los dos defectos de forma son de tabla y no cuestan prosa. **Ninguna pieza del escenario se
pierde:** los dos cortes son una repetición y una acotación de tono.

## Nota menor, no cuenta como hallazgo

La nota de corrección de la línea 401 sigue citando `the reason she says no` cuando la tabla ya
dice `the reason he says no`: es una cita histórica del arreglo anterior al reparto de género y
está en el bloque de notas en español, fuera de pantalla. Conviene actualizarla para que nadie la
lea como el texto vigente.

## Para el guardián

La regla que `fase9-calcable-1.md` propuso añadir a §11 —*protege el verbo, no el pronombre*—
habría cazado las cuatro líneas de Mauricio de este informe **antes** de que la ronda anterior las
diera por arregladas. Aquí se confirma con un caso peor: en el escenario 1 el «you» mal anclado
regalaba un precio; aquí regala el rechazo que sostiene el escenario entero.
