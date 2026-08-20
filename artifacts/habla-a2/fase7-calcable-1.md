# Escenario 1 · `the-bike-in-the-parking-lot` — ¿se puede leer en voz alta?

Auditoría de calcabilidad contra la regla de §11 del blueprint:

> La ficha se escribe **en notas, no en frases**. `Exam: Saturday 12, 8:00 a.m.` sí.
> `I'm taking the exam on Saturday at eight.` no, jamás, ni en los datos ni en la situación ni
> en los objetivos. Las frases decibles viven **solo** en la tabla de exponentes.
>
> Prueba: si una línea se puede decir tal cual en la conversación y el turno avanza, está mal
> escrita.

Auditado: `artifacts/habla-a2/fase7-fichas-1-the-bike-in-the-parking-lot.md`.
Fuera de alcance por diseño: las dos tablas *Say it here* (líneas 78-86 y 151-159), que son
exponentes y ahí las frases van a propósito; el bloque *After* (líneas 196-201) y la nota de
diseño de la carta (176-179), que están en español; y `grammarReferences` (203-229), que es
metadato de código y no llega a pantalla.

---

## Veredicto

**PASA CON CAMBIOS.** La estructura aguanta: las dos tablas de datos —20 filas entre las dos—
están escritas en notas puras y no hay una sola línea calcable en ellas. Pero **7 líneas se
pueden decir tal cual y el turno avanza**, y una de ellas le entrega al estudiante el dato
oculto convertido en frase lista para pronunciar. Son 7 reescrituras de una línea cada una; no
hay que rehacer nada.

Unidades de pantalla en inglés auditadas, sin contar exponentes: **73**.
Fallan **7** (9,6 %). Otras **10** están a un pronombre de fallar.

---

## Dónde se concentran

| sección | unidades | FALLA | riesgo | estado |
|---|---|---|---|---|
| Tabla de vocabulario, columna `here` | 20 | **3** | 2 | **la peor** — y es la pieza nueva de §11 |
| `Only you know` (dato oculto) | 6 | **1** | 2 | la más cara: es lo que no se puede soltar |
| `You can't` (restricciones) | 6 | **1** | 1 | |
| `You did it if` (criterios) | 2 | **1** | 1 | |
| `You want` (objetivo) | 2 | **1** | 0 | solo ROLE A; el de B está bien |
| `If you walk away with nothing` | 2 | 0 | 2 | |
| `Where you are` (situación) | 2 | 0 | 1 | |
| **Facts** (10 + 10 filas) | 20 | **0** | 1 | **limpia** |
| `Both screens — how it ends` | 6 | **0** | 0 | **limpia** |
| Tabla de vocabulario, columna `what it is` | 20 | **0** | 0 | **limpia** (son definiciones, no jugadas) |
| Toolkit | 2 | 0 | 0 | limpia de calcable (ver §Aparte) |
| La carta | 1 | 0 | 1 | excepción razonada |

**Dos concentraciones, y son distintas.**

1. **La columna `here` del vocabulario.** Tres de las siete. Es la sección que §11 añadió, la
   única sin recorrido de auditoría previo, y la que se escribió con el reflejo de «dar un
   ejemplo». Un ejemplo en vocabulario es una frase, y una frase es exactamente lo prohibido.
2. **El reparto entre roles: 5 de las 7 son de ROLE A, 2 de ROLE B.** No es casualidad. B se
   escribió con topes en nota (`Cap: 350,000 cash, bike alone`) y A con el mismo tope en frase
   (`Under 390,000 only if something else in the deal moves.`). La ficha de A es la floja.

**Un tercer patrón, y es el más fácil de arreglar:** 3 de las 7 líneas fallidas **repiten una
frase que ya está en la tabla de exponentes de esa misma ficha**. El exponente existe. El cuerpo
de la ficha no tiene ninguna razón para volver a decirlo, y al decirlo lo saca del único sitio
donde el estudiante sabe que hay frases.

---

## Las 7 que fallan

### 1 · GRAVE — le regalan el dato oculto ya pronunciable
**Línea 63**, ROLE A, vocabulario, entrada `to fit`, columna `here`:

> `| to fit | to be the right size for something | *the new gears fit my next bike* — why you'd take them off |`

Frase completa, primera persona, presente simple, verbatim decible. Y no es una frase
cualquiera: **es el secreto**. La propia ficha dice tres líneas antes (35) «Say it in turn one
and you give it away», y luego lo deja escrito en cursiva, listo para leer.

Mírese junto al exponente de la línea 83: `I can put the old gear set back on.` Los exponentes
le dan a A la **jugada** y le esconden el **motivo** a propósito. El vocabulario le devuelve el
motivo hecho frase. Se anula la asimetría del escenario.

**Reescritura:** `right size for your next road bike · your reason to take them off`

### 2 · repite un exponente, palabra por palabra
**Línea 139**, ROLE B, vocabulario, entrada `to come with`:

> `| to come with | to be included in the price | *does the lock come with it?* — how you add instead of asking for less |`

Pregunta decible, jugada real, y **ya está en la línea 157**: `Does the lock come with it?`
Está dos veces: una donde debe, otra donde no.

**Reescritura:** `the lock, the lights · how you add instead of asking for less`

### 3 · jugada de defensa lista para leer
**Línea 37**, ROLE A, `Only you know`:

> `- Fourth buyer in three weeks. The other three said the same about the tire.`

La primera mitad es nota. La segunda es una oración completa en past simple y es una jugada
buena: desactiva la queja de B sobre la llanta. Se lee y avanza.

**Reescritura:** `Fourth buyer in three weeks · the other three, same speech about the tire.`

### 4 · el objetivo, escrito como oferta
**Línea 27**, ROLE A, `You want`:

> `**You want** · The bike out of here **today**, **one payment**. Under 390,000 only if something else in the deal moves.`

La primera oración es nota impecable. La segunda es un enunciado elíptico perfectamente decible
en una negociación —y es **la jugada nuclear de A**, el `conceder-con-condicion` entero.
Compárese con el `You want` de B (línea 100), que dice el mismo tipo de tope en nota:
`Cap: 350,000 cash, bike alone`. Ese es el registro correcto.

**Reescritura:** `Floor 390,000 with the new gears on · lower only against something else in the deal.`

### 5 · cláusula suelta dentro de una restricción
**Línea 32**, ROLE A, `You can't` 3:

> `3. Take the gears off here. Shop work, and the shop closes at 1:00.`

`Take the gears off here` está bien (infinitivo bajo «You can't», no es enunciado). Pero
`the shop closes at 1:00` es una cláusula completa que se levanta entera, y **duplica el
exponente de la línea 82**: `The shop closes at one.`

**Reescritura:** `Take the gears off here. Shop work · shop closed from 1:00.`

### 6 · cláusula decible en el vocabulario
**Línea 60**, ROLE A, vocabulario, entrada `gear set`:

> `| gear set | the parts that change how hard you pedal | the new one is on the bike, and it's your card |`

`The new one is on the bike.` es oración completa, tercera persona, verbatim correcta y jugada
real (plantar que el grupo nuevo está montado es lo que sostiene el precio).

**Reescritura:** `the new one, on the bike · your card`

### 7 · los criterios de éxito abren con una jugada
**Línea 89**, ROLE A, `You did it if`:

> `The bike leaves the lobby today, and you both said **at what time and with whom** · …`

El resto del bloque está en pasado y dirigido al lector («you both said», «nobody found out»):
eso no se puede decir en la conversación. Pero **arranca** con `The bike leaves the lobby today`,
presente simple, tercera persona, decible tal cual, y dice lo mismo que el exponente de la
línea 81 (`It can't stay here after today.`).

El `You did it if` de B (línea 162) no tiene este problema: abre con `You leave with the bike`,
segunda persona, que dicho en voz alta no es jugada de nadie.

**Reescritura:** `Bike out of the lobby today, with a time and a name said out loud · …`

---

## Las 10 en riesgo — oración completa, a un pronombre de funcionar

No fallan la prueba literal: dichas *tal cual*, la segunda persona apunta al interlocutor y el
enunciado sale falso o absurdo. Fallan si el estudiante hace el único cambio obvio.

| # | línea | cita | por qué inquieta | en nota |
|---|---|---|---|---|
| 8 | 35 (A, dato oculto) | `The new gear set **fits the road bike you want next**.` | oración completa; `you`→`I` y es el secreto entero | `New gear set · right size for the road bike you want next.` |
| 9 | 112 (B, lo que pierdes) | `The only one in your size with papers stays here, and the bus every day.` | `your`→`my` y es justo lo que la restricción 3 prohíbe decir | `The only one in your size with papers, left here · the bus again, every day.` |
| 10 | 105 (B, `You can't` 3) | `Say this is the only one that works for you.` | lleva dentro la revelación prohibida ya redactada | `Show that no other bike works for you.` |
| 11 | 162 (B, criterios) | `nobody found out this is the only one that works for you` | misma frase, segunda aparición | `nobody found out no other bike works for you` |
| 12 | 98 (B, situación) | `You wrote last night, came by bus.` | `You`→`I` y es literalmente la apertura de B | `Wrote last night · came by bus.` |
| 13 | 39 (A, lo que pierdes) | `…and the road bike stays where it is.` | cláusula completa que roza el dato oculto | `…and the road bike, still out of reach.` |
| 14 | 133 (B, vocab `second-hand`) | `…and why the price isn't the ad price` | `the price isn't the ad price` se levanta y es jugada | `what you came to buy · your reason for a price under the ad` |
| 15 | 142 (B, vocab `to pick something up`) | `if the bike doesn't leave now, you need a day and a time` | condicional completo en la columna `here` | `no bike today → a day and a time instead` |
| 16 | 49 (A, Facts) | `The old gear set \| it works · harder on the two small gears` | `It works.` es decible, pero son dos palabras y no mueven nada. El `·` impide que se lea como una oración con `but`, que es justo lo que el escenario quiere que el estudiante construya solo. **Único roce en 20 filas de datos.** | `still works · harder on the two small gears` |
| 17 | 173 (la carta) | `No truck today. I'm going to Barrancabermeja. Sorry.` | ver abajo | se deja |

**La carta se deja como está.** Es el único sitio con inglés en primera persona fuera de los
exponentes y es correcto que lo sea: es un documento citado, un WhatsApp de un tercero. Escribirlo
en notas lo volvería falso. Y se protege solo: leído en voz alta por B, `I'm going to
Barrancabermeja` sale mentira —B no va a ninguna parte— y le obliga a la transformación que es
el ejercicio (pasar el mensaje a estilo indirecto). Solo `No truck today.` es levantable, tres
palabras, y está en pantalla aparte que se abre una vez.

---

## Aparte: de dónde viene el defecto

No es un descuido de este escenario. **El molde lo autoriza.** En
`artifacts/habla-a2/fase7-modelo-ficha-en.md`, línea 66:

> `| to be off | to not be working | *I'm off on Friday the 18th* |`

Oración completa, primera persona, en cursiva, en la columna `here` del vocabulario — el mismo
patrón exacto de la línea 63 del escenario 1. Quien escribió el escenario 1 copió el molde bien.

Revisados los siete ficheros `fase7-fichas-*`: **el escenario 1 es el único que arrastró el
patrón** (2 casos, líneas 63 y 139). El resto de las columnas `here` están en notas. Pero
mientras la línea 66 del molde siga como está, va a volver a salir en los escenarios que falten.

**Recomendación:** arreglar el molde a la vez. `| to be off | to not be working | Friday the
18th is yours, not the café's |` — no; en notas: `| to be off | to not be working | your Friday
18 and Saturday 19 · what you're offering back |`. Y añadir al molde una línea explícita: *en la
columna `here` no va nunca una frase entre comillas ni en cursiva; para eso está la tabla de
exponentes, seis centímetros más abajo.*

---

## Aparte 2: no es calcabilidad, pero se ve desde aquí

Los dos bloques `Your toolkit` (líneas 72 y 145) no tienen ni una línea decible —son
instrucciones meta— pero son, con diferencia, **la prosa más densa de las dos fichas**: guiones
largos anidados, dos puntos dentro de paréntesis, y subordinación de tres niveles. La línea 72
tiene 78 palabras en una sola tirada. §11 pide «frases cortas, presente y pasado simple, cero
subordinación larga» para el inglés A2 leído. Ese bloque no lo cumple. No lo apunto como fallo
de esta auditoría —no es lo que se me pidió medir— pero quien haga la pasada de nivel debería
mirarlo antes de que la ficha salga.

Los presupuestos de prosa declarados al final del fichero (344 y 349 palabras, tope 350) siguen
válidos después de las reescrituras propuestas: todas cambian frases por notas y **restan**
palabras. Ninguna añade.
