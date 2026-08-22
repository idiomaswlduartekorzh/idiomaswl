# Fase 9 · ¿Se puede leer en voz alta? — escenario 4 nuevo, `the-pot-is-already-on`

**Auditado:** `artifacts/habla-a2/fase8-fichas-4nuevo.md` **tal como está en disco hoy** (22 ago
2026), con la tercera pasada (las cinco auditorías de fase 8) y la cuarta (reparto de género)
ya aplicadas. `fase8-calcable-4nuevo.md` se leyó **solo** para saber qué se dijo antes: ninguna
de sus 27 correcciones se dio por buena sin volver a mirar la línea. **Dos de ellas no cerraron
el agujero** (§Regresiones) y **una fila que aquel informe no marcó** sí está mal.

**Regla aplicada (§11 del blueprint, con las dos correcciones del 21 ago):**
- **Tablas** → notas, nunca frases. Nada de sujeto + verbo conjugado en una fila.
- **Prosa** → inglés A2 legible, oraciones cortas y completas, escritas **sobre** el jugador.
- **Prueba única:** si la línea se puede decir tal cual y el turno avanza, está mal escrita.
- **`here`** → nota de propósito, sin comillas y sin cláusula con verbo conjugado.

**Fuera de alcance por diseño:** las dos tablas `Say it here` (líneas 86-95 y 169-178) y el
bloque `After — both screens, in Spanish` (223-227). También el metadato del redactor a partir
de la línea 231 (recuento, notas de pasada), que no llega a pantalla.

**Criterio de marcado**, heredado de `fase9-calcable-1` y `fase8-calcable-4nuevo`:
- **DECIBLE** — enunciado inglés bien formado, o cláusula autónoma donde el ojo puede parar, que
  ese rol le puede decir al otro **sin tocar una palabra**, apuntando a la persona correcta, y el
  turno **avanza**.
- **La segunda persona no protege sola.** Protege cuando el que escucha **no puede sostener el
  predicado** (`You lit the fire at nine` a Astrid es falso: se cae sola). No protege cuando el
  predicado lo sostienen los dos, ni cuando el `you` se lee como impersonal.
- **Las filas se leen de corrido, etiqueta incluida.** Los dos puntos no se oyen.
- **Riesgo / limpia** — apunta mal (hay que girar un pronombre), o es nota sin verbo conjugado.

**Techo de prosa, contador canónico** (`fase7-scripts/prosa-canonica.mjs`, corrido hoy sobre la
copia `fase7-fichas-4nuevo-TMP.md` y borrada después): **ROLE A 445 · ROLE B 449**, tope 450.
Cumple, pero con **5 y 1 palabras de margen**: las reescrituras de abajo están calculadas para
dejar A en **449** y B en **449**. Ninguna pide quitar una pieza.

---

## Veredicto

**NO PASA · 10 líneas decibles sobre 153 unidades en alcance (6,5 %)**, más **2 defectos de
forma** en tabla que no son decibles pero incumplen §11 al pie de la letra.

**Reparto: ROLE A 5 · ROLE B 5 · la carta 0 decibles (1 defecto de forma).**

Se cae por una sola, la **B1**: `You know Édgar's car is not coming back.` La cláusula sale
entera de la envoltura y es **el dato oculto nº 1 de B, ya convertido en frase pronunciable** —el
fallo que §11 declara fatal («en un escenario llegó a entregar el dato oculto ya convertido en
frase lista para pronunciar»)—. El motor del escenario consiste en que ese carro se revela
tarde: el mapa lo deja salir «en el turno 16 lo más tarde». Hoy sale leyendo la ficha antes del
turno 1. Con esa línea ahí, el escenario se resuelve leyendo.

La segunda grave es **B2**, que entrega el exponente de B con la elipsis ya rellenada.

| bloque | unidades | decibles |
|---|---|---|
| B · `What you haven't said yet` | 8 | **2** (una GRAVE) |
| A · dato oculto, objetivo, restricción 1, lo que se pierde, prosa del reloj | 5 bloques | **5** |
| B · situación | 3 | **1** |
| B · tablas de datos y reloj (13 filas) | 13 | **2** |
| A · vocabulario `here` (10 celdas) | 10 | 0 decibles + **1 de forma** |
| La carta (7 filas + 3 prosa) | 10 | 0 decibles + **1 de forma** |
| todo lo demás (~104 unidades) | ~104 | **0** |

**Denominador:** 32 oraciones de prosa de A + 34 celdas/filas de A (6 reloj + 8 datos + 20 de
vocabulario) + 32 de prosa de B + 33 de tabla de B (6 + 7 + 20) + 10 de la carta + 12 de
`Both screens`. Total **153**.

**La columna `here`, que el encargo manda mirar con lupa: 19 de 20 limpias.** En los dos roles
son sintagmas nominales de propósito (`the clock on the second chicken`, `one word for your first
no`, `the verb of your flat no`), sin comillas y sin ejemplo. **Ninguna entrega un dato oculto**,
que es lo que pasó en una ronda anterior del set. La única que se sale es de forma, no de
contenido (D1). La columna `what it is`: 20 de 20 limpias, ninguna glosa con sujeto y predicado.

---

## Regresiones respecto de `fase8-calcable-4nuevo`

1. **La nº 19 se deshizo a medias.** Aquel informe cambió `| At the river | six people since
   10:00 · they ate at 7:00 |` por `… last food 7:00`. La ficha de hoy dice
   `| At the river | six people · they went at 10:00 · last food 7:00 |`: se limpió el `ate` y
   **entró un `went` conjugado en su lugar**. Es la **B4** de abajo.
2. **La nº 16 se «arregló» con la envoltura que no protege.** El informe anterior propuso
   `You know Marcela's car isn't coming back. …` — y la reescritura *contiene* la frase que
   había que quitar. La ficha la adoptó tal cual (con Édgar tras el reparto de género). Es la
   **B1**, la grave.
3. **Fila que aquel informe no miró:** `| 11:40 | Édgar passes · one passenger |` se quedó sin
   marcar mientras se marcaban las de las 12:40 y las 4:00, que tienen exactamente el mismo
   defecto. Hoy es `| 11:40 | Marcela passes · one passenger |`. Es la **B3**.

---

## ROLE A · las cinco, literal y con reescritura

### A1 · `What you're after` (línea 25)

> `You want the river after lunch, not instead of it.`

Es la posición entera de A, en una oración que le puede soltar a Astrid tal cual: *tú el río lo
quieres después del almuerzo, no en vez del almuerzo*. El `you` **no protege**, porque «querer el
río» lo sostienen los dos y en boca de A se oye como imposición argumentativa, que es justo su
jugada. Es la nº 3 del informe anterior (`The river comes after lunch, not instead of it.`)
girada a segunda persona: el giro no la curó.

**Reescritura:** `You are cooking for one o'clock, not for a river trip.`
(*you are cooking* es imposible en boca de Astrid · 10 → 11 palabras, **+1**)

### A2 · `Three things you won't do`, restricción 1 (línea 28)

> `You keep the pot on the fire, because it is raw cassava in twenty liters of hot water.`

La subordinada va sola: **`It is raw cassava in twenty liters of hot water.`** Es el «no» físico
de A —su argumento central— bien formado y en el registro del patio.

**Reescritura:** `You keep the pot on the fire, because you have raw cassava in twenty liters of hot water.`
(18 → 19, **+1**)

### A3 · `Nobody out there knows this`, viñeta 2 (línea 34)

> `If it goes in before twelve, you feed twelve. If it doesn't, you lose it tonight.`

**El agujero del `you` impersonal.** Aquí el sujeto no es A ni B: es el genérico inglés, y por
eso las dos condicionales se dicen tal cual sin apuntar mal. Es el dato oculto nº 2 servido como
argumento cerrado, y la aritmética del escenario (doce platos) sale del turno con él.

**Reescritura:** `If you put it in before twelve, you feed twelve. If you don't, you lose it tonight.`
(el sujeto pasa a ser el que manda en la olla, que no es Astrid · 16 → 18, **+2**)

### A4 · `If she rides off and you have no answer` (línea 37)

> `You lose the chicken tonight, and you see these same people here next Sunday.`

La segunda mitad se dice entera y apunta bien: Astrid **también** ve a esa misma gente el domingo
que viene. Dicha por A se convierte en su presión social, que es exactamente para lo que existe.
La nº 10 del informe anterior sobrevivió con un `you` delante.

**Reescritura:** `You lose the chicken tonight, and next Sunday they are back in your patio.`
(`your patio` en boca de A apunta al patio de Astrid, que no existe · 14 → 13, **−1**)

### A5 · `What the fire is doing while you talk` (línea 41)

> `You look at it every twenty minutes, because that is what a wood fire costs.`

`That is what a wood fire costs.` es oración completa, en registro y en el punto exacto en que A
tiene que justificar no salir del patio. Es la nº 11 (`That's firewood, not habit.`) con otra
ropa: se cambió la frase, no la forma.

**Reescritura:** `You look at it every twenty minutes, because you cook on wood and not on gas.`
(14 → 15, **+1**)

**Balance de prosa de A:** +1 +1 +2 −1 +1 = **+4 → 449 / 450.** Si se prefiere margen, la
situación paga sola: `for a plan the whole group agreed to on Friday` → `for Friday's plan, with
everybody there` (−2).

---

## ROLE B · las cinco, literal y con reescritura

### B1 · GRAVE — `What you haven't said yet`, viñeta 1 (línea 117)

> `You know Édgar's car is not coming back. His eleven eleven message is on your phone, and you have not said a word about it.`

**El dato oculto, ya redactado como frase.** `Édgar's car is not coming back.` es tercera
persona pura, apunta a un carro —no hay pronombre que girar—, y es la carta que el escenario
existe para que se juegue tarde. La envoltura `You know…` no cierra nada: los dos puntos no se
oyen y un `You know` tampoco. Y la viñeta de al lado avisa —*If you play it early, … you lose the
card*— de lo que la propia ficha acaba de poner por escrito en voz decible.

**Reescritura:** `You read Édgar's message at eleven eleven: no car back before four. You have not said a word about it.`
(el dato queda como **nota** tras dos puntos, que es lo que §11 pide —«reescríbela como dato»—, y
la hora ya vive en su reloj, fila `4:00` · 25 → 20, **−5**)

### B2 · GRAVE — `What you haven't said yet`, viñeta 3 (línea 119)

> `You know they ate at seven and that nothing is open there on a Sunday.`

Leída en voz alta y sin el `that`, sale **`They ate at seven and nothing is open there on a
Sunday.`** — que es el exponente de B `They ate at seven, and nothing is open …` **con la elipsis
ya rellenada**. Los troncos con `…` existen (nota 4 del redactor) para que el que lee mejor no
gane el turno leyendo; esta línea le devuelve el final del tronco doce líneas más arriba.

**Reescritura:** `You hold two facts he doesn't: last food at seven, and nothing open there on a Sunday.`
(`he` apunta mal en boca de Astrid, y el resto es lista de notas · 15 → 17, **+2**)

### B3 · tabla `The bike, and what fits`, fila 11:40 (línea 129)

> `| 11:40 | Marcela passes · one passenger |`

Sujeto + verbo conjugado en fila de tabla. Leída de corrido: *Marcela passes at eleven forty, one
passenger* — que es el reloj con el que B empuja todo el escenario. Mismo defecto que las filas
12:40 y 4:00, que **sí** se corrigieron en la pasada anterior.

**Reescritura:** `| 11:40 | Marcela's bike by the gate · one passenger |`

### B4 · tabla `The numbers you're carrying`, fila «At the river» (línea 141)

> `| At the river | six people · they went at 10:00 · last food 7:00 |`

`they went at 10:00` es verbo conjugado con sujeto, y de corrido da *they went at ten*, que es el
contenido del turno 2 de B. Regresión de la corrección nº 19 del informe anterior.

**Reescritura:** `| At the river | six people · there since 10:00 · last food 7:00 |`

### B5 · situación (línea 107) — blanda

> `You watched six of them leave for the river at ten in the heat.`

El `you` no protege: **Fabián también los vio irse**, así que la oración apunta bien y funciona
como apertura de reproche. Y entrega el contenido del exponente `They left at ten because it was
…` sin obligar a rellenar el tronco (*in the heat* ya está puesto). *Blanda: es contexto que los
dos comparten, y por eso aporta poco; pero es un turno válido dicho tal cual.*

**Reescritura:** `You came at nine to help him, and at eleven twenty you are still the only one who did.`
(`him` en boca de Astrid apunta a un tercero que no existe · 16 → 19, **+3**)

**Balance de prosa de B:** −5 +2 +3 = **0 → 449 / 450.** Las dos filas de tabla no cuentan prosa.

---

## Los dos defectos de forma (no decibles, pero §11 los prohíbe)

**D1 · ROLE A, vocabulario, celda `here` de `a round` (línea 69)**

> `| a round | one time that everybody is served | the second one is half of your way out |`

`The second one is half of your way out.` es **cláusula con verbo conjugado**, no nota de
propósito. No es decible —en el patio nadie dice eso—, pero §11 pide reescribir la celda que no
sea sintagma nominal. Es la única de las 20 que se sale.

**Reescritura:** `half of your way out — the second one`

**Vigilar, sin marcar:** `why one o'clock needs a second person` (celda `here` de *to keep an eye
on something*). La envoltura `why` es la convención aceptada en el set, pero la cláusula interna
roza la tercera línea obligatoria de A. Si se toca algo más de esa columna, esta es la siguiente.

**D2 · La carta, fila `Where she heard it` (línea 195)**

> `| Where she heard it | somebody told her, lunch here |`

`somebody told her` es verbo conjugado en fila de tabla, y la carta es **la única pantalla que se
lee con el otro delante y se habla tres segundos después**. Viene de la reescritura propuesta en
el informe anterior, que arregló las otras cinco filas y dejó el verbo en ésta.

**Reescritura:** `| Where she heard it | word from somebody · lunch here |`

---

## Lo que está bien y no se debe tocar al corregir

- **Las 20 celdas `what it is` y 19 de las 20 `here`.** La columna que §11 marca como la más
  peligrosa está limpia de contenido: ni comillas, ni ejemplos, ni un solo dato oculto servido.
  Ninguna de las diez correcciones de arriba las toca.
- **La carta, salvo D2.** Rehecha en notas: `Coming at 1:00 | her, your aunt, three from the
  church`, `Bringing | nothing`. Pasó de 6 fallas en 9 unidades a **0 decibles**.
- **`Both screens — how it ends`.** Las seis obligaciones siguen escritas como preguntas
  indirectas (*what goes in the pot at twelve, and for how many*), que es la forma que no se
  puede leer en voz alta. 12 unidades, cero decibles. El `So, we're clear then` de la regla 2 es
  una frase de confirmación autorizada a propósito y no es ninguna de las seis: no cuenta.
- **El reloj de A (6 filas) y sus datos duros (8 filas): limpios los 14.** `then dry`,
  `out of sight from the fire`, `second chicken now or never`. Ahí la corrección anterior sí
  cerró.
- **Las restricciones de B (líneas 112-114) y las tres viñetas de `At ten you gave him…`**: cero
  decibles, con `him`/`he` haciendo el cortafuegos donde toca.

## El coste de la corrección

Ninguna reescritura toca el motor: ni un dato, ni una hora, ni un acto del mapa de 18 turnos, ni
el reparto de género. Cinco son giros de prosa, tres son quitar un verbo de una fila y una es
partir una celda de vocabulario en sintagma. Con las cifras de arriba, **A queda en 449 y B en
449**, los dos bajo el techo, sin quitar ninguna de las ocho piezas obligatorias.
