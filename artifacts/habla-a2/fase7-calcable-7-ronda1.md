# Escenario 7 · `two-more-people-for-the-trip` — ¿se puede leer en voz alta?

Auditoría de calcabilidad contra la regla de §11 del blueprint
(`docs/habla-acompanado-blueprint.md`, líneas 252-258):

> La ficha se escribe **en notas, no en frases**. `Exam: Saturday 12, 8:00 a.m.` sí.
> `I'm taking the exam on Saturday at eight.` no, jamás, ni en los datos ni en la situación ni
> en los objetivos. Las frases decibles viven **solo** en la tabla de exponentes, que es donde
> el estudiante sabe que va a buscarlas.
>
> Prueba para el redactor: si una línea de tu ficha se puede decir tal cual en la conversación y
> el turno avanza, esa línea está mal escrita. Reescríbela como dato.

Auditado: `artifacts/habla-a2/fase7-fichas-7-two-more-people-for-the-trip.md`.

Fuera de alcance por diseño: las dos tablas *Say it here* (líneas 85-95 y 160-170), que son
exponentes y ahí las frases van a propósito; las bandas del diseñador (9-24) y el bloque *After*
(212-217), que están en español; y `grammarReferences` (220-253) más los dos anexos de cuenta y
hallazgos (257-328), que son metadato y no llegan a pantalla.

## Cómo se marcó cada línea

Las mismas tres marcas del informe del escenario 2, y el mismo criterio de tabla:

- **FALLA** — la línea, o una cláusula autónoma donde el ojo puede parar, es un enunciado inglés
  bien formado que **ese** rol le puede decir al otro **apuntando a la persona correcta**, y el
  turno avanza.
- **RIESGO** — es oración, pero dicha *tal cual* apunta mal: hace falta un cambio (un pronombre,
  un posesivo) para que funcione en la boca. No falla la prueba literal; la sostiene un pronombre.
- **Limpia** — nota sin verbo conjugado. Las notas elípticas naturales (`no name + ID, no entry`,
  `six people, and maybe five seats`) cuentan como limpias: son exactamente la forma que §11
  pide, y son las reescrituras que este mismo informe propone.

**Las filas de tabla se leen de corrido, etiqueta incluida.** Un `| etiqueta | celda |` es una
sola línea, así que si la etiqueta pone el sujeto y el verbo, la fila es una oración aunque la
celda sea nota impecable. Por eso las filas 58, 62 y 134 están marcadas: sus celdas están bien
escritas y sus **rótulos** no.

---

## Veredicto

**PASA CON CAMBIOS.** Es la ficha más limpia de las tres medidas hasta ahora, y no por poco.

Unidades de pantalla en inglés auditadas, sin contar exponentes: **105**.
Fallan **5** (4,8 %). Otras **24** (22,9 %) están a un pronombre de fallar.

| escenario | unidades | FALLA | % |
|---|---|---|---|
| 1 · `the-bike-in-the-parking-lot` | 73 | 7 | 9,6 % |
| 2 · `no-appointment-until-thursday` | 94 | 18 | 19,1 % |
| **7 · `two-more-people-for-the-trip`** | **105** | **5** | **4,8 %** |

La pasada de desconjugación que declara la cabecera del fichero («la forma: notas, no frases»)
**funcionó, y funcionó donde más dolía**: las veinte filas de datos tienen las veinte celdas en
nota —cero verbos conjugados, que es justo lo que hundió al escenario 2— y los seis puntos de
`Only you know` están escritos en participio y sustantivo (`100,000 collected from each of them`,
`two people let down`). El dato oculto de Kevin, que en el escenario 2 era el hallazgo más caro,
aquí es intocable.

**Pero tres de los cinco fallos son graves, y dos de esos tres están en la carta.** La carta es
ahora el punto flojo del fichero, y es el único sitio donde el escenario se puede resolver
leyendo.

---

## Dónde se concentran

| sección | unidades | FALLA | riesgo | estado |
|---|---|---|---|---|
| **La carta** (5 filas + 4 vocab + 2 prosa + encabezado) | 12 | **2** | 3 | **la peor, y es nueva**: 40 % de los fallos en 11 % de las unidades |
| `Only you know` — ROLE A | 3 | **1** | 2 | 3 de 3 unidades tocadas |
| Vocabulario, columna `what it is` — ROLE A | 9 | **1** | 1 | ahí está el único grave de ficha |
| `Your toolkit` — ROLE A | 1 | **1** | 0 | 1 de 1 |
| `You can't` — ROLE A | 3 | 0 | 1 | toda en la restricción 1 |
| Tabla de datos — ROLE A | 10 | 0 | 2 | **celdas limpias, rótulos no** |
| Notas de registro (A + B) | 4 | 0 | 2 | la misma frase en las dos |
| `You did it if` (A + B) | 2 | 0 | 2 | las dos |
| `Your toolkit` — ROLE B | 1 | 0 | 1 | 1 de 1 |
| Vocabulario, columna `here` — ROLE B | 10 | 0 | 2 | |
| `You can't` — ROLE B | 3 | 0 | 1 | toda en la restricción 1 |
| `Only you know` — ROLE B | 3 | 0 | 1 | |
| Tabla de datos — ROLE B | 10 | 0 | 1 | un rótulo |
| Encabezados de rol | 2 | 0 | 1 | solo el de A |
| Vocabulario `what it is` — ROLE B | 10 | 0 | 1 | la misma fila compartida |
| `Your own rule` — A · `And a reason you can repeat` — B | 2 | 0 | 2 | |
| `If you walk away with nothing` — A | 1 | 0 | 1 | |
| Vocabulario, columna `here` — ROLE A | 9 | 0 | 0 | **limpia** (9/9) |
| `Where you are` (A + B) | 2 | 0 | 0 | **limpia** |
| `You want` (A + B) | 2 | 0 | 0 | **limpia** |
| `If you walk away with nothing` — B | 1 | 0 | 0 | **limpia** |
| `Both screens — how it ends` | 5 | 0 | 0 | **limpia** (5/5) |

**Reparto entre roles: ROLE A 3, ROLE B 0, la carta 2, pantalla compartida 0.** Es el reparto más
desequilibrado de los tres escenarios medidos, y tiene una explicación de contenido: **Valentina
es la que sabe cosas.** Tiene la reserva, la lista, el sexto y el carro del mecánico, y cada vez
que la ficha se pone a explicarle *por qué* sabe algo, escribe una oración. Kevin, que solo tiene
dinero de otros y prisa, se anota sin explicar.

**Cuatro patrones, y el primero es el que hay que arreglar antes de publicar.**

1. **La carta no se protege sola** — el mismo defecto que el hallazgo 17 del escenario 2, y aquí
   es peor. En el escenario 1 el mensaje citado era `I'm going to Barrancabermeja`, que leído en
   voz alta por el estudiante sale mentira y por eso **obliga** al estilo indirecto, que era el
   ejercicio. Aquí la nota de voz de doña Nubia ya está escrita **en tercera persona sobre doña
   Nubia** (`she asks him first thing`, `she charges you`). Valentina leyéndola en voz alta no
   produce nada falso: produce estilo indirecto correcto, gratis. La transformación entera —
   recibir la noticia, decidir cuánto contar— se evapora, y la propia carta avisa en su cierre de
   que esa decisión es el ejercicio: *«Kevin learns only what you tell him. You decide how much.»*

2. **El único grave de ficha está en una definición de vocabulario, y es invisible si se audita
   la fila una sola vez.** La fila `to owe someone` está **duplicada palabra por palabra** en las
   dos fichas (líneas 72 y 144). En la de Kevin, `you did not pay it yet` dicho a Valentina es
   falso —Valentina sí pagó— y se queda en riesgo. En la de Valentina, dicho a Kevin, es **cierto,
   es su reclamo de apertura y duplica el exponente de la línea 87**. La misma cadena de
   caracteres es riesgo en una pantalla y fallo grave en la otra. Lo mismo pasa con `a spot` y
   `the guard at the gate`: tres definiciones compartidas literalmente entre roles, cuando §11
   pide vocabulario propio de **este** rol.

3. **La desconjugación llegó a las celdas y no a los rótulos.** Las veinte celdas de datos están
   en nota; tres rótulos llevan el verbo: `| You paid |` (58), `| You owe Valentina |` (134) y la
   celda `you put him in` de la fila 62. Es el defecto exacto de `| Today I can stay |` en el
   escenario 2, y los tres son **la jugada central de su rol**: `I paid six hundred thousand`,
   `I owe you a hundred thousand`, `I put him in`. El rótulo es un encabezado de columna, no un
   sujeto.

4. **Casi todo lo que queda lo sostiene un pronombre, y es el pronombre más fácil de cambiar que
   hay.** 20 de las 24 unidades en riesgo son oraciones en segunda persona dirigidas al jugador
   (`You paid 600,000`, `The 200,000 on you are…`, `two people moved their weekend for you`,
   `you can't pay tonight`). La ficha le habla al jugador de tú, así que la traducción mental que
   necesita es exactamente `you → I`: la protección no es que la frase apunte a un absurdo, es que
   apunta al de enfrente. Es más delgada que la del escenario 2, donde varios riesgos salían
   ridículos al decirse. Aquí ninguno sale ridículo: salen invertidos.

---

## Los 3 graves

### 1 · GRAVE — la deuda, ya pronunciada, dentro de una definición
**Línea 72**, ROLE A, vocabulario, fila `to owe someone`, columna `what it is`:

> `| to owe someone | to have to pay money to a person, and you did not pay it yet | the debt on his side · day: July 30 |`

`You did not pay it yet.` — pasado simple, negativo, segunda persona, y **la segunda persona
apunta a Kevin, que es exactamente quien no pagó**. Se lee de corrido y es el reclamo de apertura
de Valentina. Es el único fallo del fichero que no necesita cambiar ni una letra.

Y ya está montado tres tablas más abajo: el exponente de la línea 87 dice
`You haven't paid me yet.` con la glosa *«say it once, and don't fight about it»*. La ficha da la
misma jugada dos veces, una donde el estudiante sabe que hay frases y otra donde no debería
haberlas — el patrón exacto del hallazgo 9 del escenario 2.

Lo que hay que ver es que **la fila está copiada tal cual en la ficha de Kevin (línea 144)**, y
allí es inocua: `you did not pay it yet` dicho a Valentina es falso. Auditar la fila una vez y
darla por buena es el error que este hallazgo enseña.

**Reescritura (las dos fichas, misma cadena):**
`to have to pay money to a person, and the money still not paid`

### 2 · GRAVE — la carta dicta la noticia, hecha frase
**Línea 188**, la carta, fila `When you find out`:

> `| When you find out | she asks him first thing and calls you **before 7:00 a.m.** |`

Dos cláusulas conjugadas en una celda. `She asks him first thing.` es autónoma, es cierta, se dice
tal cual y **es la noticia entera de la carta**: que nada se cierra esta noche y que hay respuesta
a las 7:00. La segunda mitad —`and calls you before 7:00 a.m.`— se salva por un pronombre
(doña Nubia llama a Valentina, no a Kevin), y con cambiarlo queda el resto.

Aquí es donde la carta debía costar trabajo. Su propio cierre lo dice: *«It gives you more work…
Kevin learns only what you tell him. You decide how much.»* Si la fila se lee, no hay decisión que
tomar: se lee y ya está contado.

**Reescritura:** `| When you find out | her question to him first thing · her call to you **before 7:00 a.m.** |`

### 3 · GRAVE — el precio de la carta, decible **y** ambiguo
**Línea 185**, la carta, fila `Price`:

> `| Price | **150,000 pesos** *(a hundred and fifty thousand)* · both nights · **she charges you** |`

`She charges you.` es oración completa, presente simple, tres palabras. Y tiene **dos lecturas, y
las dos funcionan**:

- la que la ficha quiere: *doña Nubia se lo cobra a Valentina* — el hueco de 50.000 que la banda
  del diseñador explica en la línea 16;
- la que sale al leerla en voz alta delante de Kevin: *te lo cobra a ti* — una exigencia de pago
  perfectamente jugable, y además una de las salidas que Valentina puede querer.

Es decir: no solo es decible, es que **decirla resuelve una jugada real por accidente**, y de paso
la ambigüedad es un defecto de contenido con independencia de §11 — las mismas tres palabras dicen
dos cosas opuestas según quién las lea.

**Reescritura:** `| Price | **150,000 pesos** *(a hundred and fifty thousand)* · both nights · **charged to your reservation** |`

---

## Los 2 leves

### 4 · Línea 47, ROLE A, `Only you know`
> `- **Sebastián you know**, last year's trip. **Andrea you've never seen.**`

`Sebastián you know, last year's trip.` dicho a Kevin **también es cierto**: Kevin conoce a
Sebastián, es su amigo. Las dos lecturas —«Sebastián lo conozco yo» y «Sebastián lo conoces tú»—
son verdad, así que la frase se dice tal cual y aterriza. La segunda mitad, `Andrea you've never
seen.`, sí apunta mal (Kevin sí ha visto a Andrea) y se queda en riesgo, pero es un riesgo caro:
`Andrea I've never seen` es la asimetría que mueve toda la mitad de Valentina y que el exponente
`Who exactly is …?` existe para explotar.

Aparte de calcable, la construcción es un objeto antepuesto (`Sebastián you know`), que no es A2
leído: §11 pide «frases cortas, presente y pasado simple, cero subordinación larga».

**Reescritura:** `- **Sebastián: yes**, last year's trip. **Andrea: never in your life.**` *(11 palabras por 11)*

### 5 · Línea 81, ROLE A, `Your toolkit`
> `… · **6**, Hernán's car stays out · **7** \`[grants]\` · …`

`Hernán's car stays out.` — presente simple, tercera persona, cierta, decible y **es un rechazo
jugable**: la restricción 3 de Valentina en una frase. El bloque 6 de la caja es «decir que no»;
la línea le entrega el no ya redactado.

Vale la pena decirlo porque en el escenario 2 los dos bloques `Your toolkit` se dieron por limpios
—«ni una línea decible, son instrucciones meta»—. Aquí dejaron de serlo: la línea de Kevin trae
además `two people moved their weekend for you` y `you can't pay tonight`, que son sus dos
argumentos centrales a un pronombre de distancia. El toolkit se está convirtiendo en guion.

**Reescritura:** `**6**, not Hernán's car` *(4 palabras por 5)*

---

## Las 24 en riesgo — oración completa, a un pronombre de funcionar

**Riesgo caro** — el cambio es `you → I` (o `your → my`) y lo que sale es una jugada central:

| # | línea | cita | qué sale con un pronombre | en nota |
|---|---|---|---|---|
| R1 | 46 (A, dato oculto) | `**The sixth was yours, Wednesday**` | `The sixth was mine.` — **la carta oculta de A**, y la propia línea dice *never to Kevin's face* | `**The sixth: yours, Wednesday**` |
| R2 | 62 (A, datos) | `\| The sixth \| Hernán · Wednesday · you put him in · car + gas \|` | `I put him in.` — el mismo secreto, otra vez, en la tabla de datos | `… · put in by you · car + gas` |
| R3 | 28 (A, encabezado) | `You paid for the house — it's in your name` | `It's in my name.` — la base entera de su poder | `The house, paid by you — reservation in your name` |
| R4 | 58 (A, datos, rótulo) | `\| You paid \| **600,000 pesos** … \|` | `I paid six hundred thousand pesos.` | `\| Out of your pocket \| **600,000 pesos** … \|` |
| R5 | 40 (A, `You can't` 1) | `You paid 600,000; his part is missing.` | `I paid 600,000. Your part is missing.` — dos jugadas en una línea | ver reescritura de presupuesto, abajo |
| R6 | 40 (A, `You can't` 1) | `You *can* cover his, not a stranger's.` | `I can cover yours…` — la concesión, ya redactada | ídem |
| R7 | 49 (A, `If you walk away…`) | `Nobody has paid you.` | `Nobody has paid me.` — y duplica el exponente 87 | `… all five his · nothing paid.` |
| R8 | 70 (A, vocab `reservation`) | `the owner keeps the house for you, and your name is the one she has` | `My name is the one she has.` — dos cláusulas, y una definición que dejó de ser definición | `when the owner keeps the house for one person, under that person's name` |
| R9 | 47 (A, dato oculto) | `**Andrea you've never seen.**` | `Andrea I've never seen.` — la asimetría del escenario | ver leve 4 |
| R10 | 45 (A, dato oculto) | `Tell him and he can use it.` | `You can use it.` — la concesión del carro | `Told to him, one more car tomorrow.` |
| R11 | 30 (A) y 104 (B, nota de registro) | `You travel together tomorrow.` | `We travel together tomorrow.` — el cierre de las dos fichas | `Same car tomorrow.` |
| R12 | 114 (B, `You can't` 1) | `The 200,000 on you are Sebastián's and Andrea's.` | `The 200,000 on me are…` — **la defensa central de Kevin** | `The 200,000 on you: Sebastián's and Andrea's.` |
| R13 | 134 (B, datos, rótulo) | `\| You owe Valentina \| **100,000 pesos** … \|` | `I owe you a hundred thousand.` — su admisión de apertura | `\| Owed to Valentina \| **100,000 pesos** … \|` |
| R14 | 156 (B, toolkit) | `two people moved their weekend for you` | `…for me.` — su argumento del bloque 5, entero | `two weekends moved because of you` |
| R15 | 156 (B, toolkit) | `you can't pay tonight` | `I can't pay tonight.` — su imposibilidad, entera | `no money tonight` |
| R16 | 144 (B, vocab `to owe someone`) | `you did not pay it yet` | `I did not pay it yet.` — la misma cadena que falla en la ficha de A | ver grave 1 |
| R17 | 188 (carta) | `and calls you **before 7:00 a.m.**` | `and calls me before seven.` | ver grave 2 |

**Riesgo meta** — es oración, pero habla del juego, no dentro del juego. No hace avanzar el turno;
va listado porque son verbos conjugados en una ficha que §11 quiere en notas:

| # | línea | cita |
|---|---|---|
| R18 | 30 · 104 | `you can interrupt` (las dos notas de registro) |
| R19 | 37 (A) | `Decide nothing until he says who they are and why they matter.` |
| R20 | 81 (A, toolkit) | `he comes to you` |
| R21 | 98 (A, criterios) | `Kevin knows the beds and the gate list` · `the 100,000 got a date` · `you left with a fact…` · `the no was yours` · `tomorrow you still ride together` |
| R22 | 111 (B) | `that one gets you a question back` |
| R23 | 121 (B, dato oculto) | `**Three things she doesn't know:**` |
| R24 | 147 · 149 (B, vocab `here`) | `how the six were meant to pay · five did` · `how much is missing, once the numbers are out` |
| R25 | 173 (B, criterios) | `Valentina knows what tonight costs you` · `your car's 8:00 is settled` · … |
| R26 | 179 · 198 (carta, prosa meta) | `Kevin opens here` · `Kevin learns only what you tell him.` |
| R27 | 195 (carta, vocab `here`) | `the seventh person, if there is one` |

*(R11 y R16 cuentan una unidad por ficha; el total de unidades tocadas es 24.)*

---

## Aparte 1: la tabla de datos sí es, esta vez, la sección segura

Vale la pena escribirlo porque es la corrección del Aparte 1 del escenario 2, que decretó que la
tabla de datos había dejado de ser fiable. Aquí las **veinte celdas** de las dos tablas están en
nota, sin un solo verbo conjugado:

| ROLE A | ROLE B |
|---|---|
| `a guard at the gate · 3 bedrooms · **6 beds**` | `5 seats · gas on you` |
| `6 names + 6 ID numbers · changes: doña Nubia only` | `call center shift until 10:00 p.m., no answer before · hammock, no bed` |
| `4 seats · at the mechanic's · mechanic: 7:00 a.m.` | `at the parking lot in 20 minutes · no way there except your car` |

La regla operativa que pedía aquel informe —«en una celda de datos no entra un verbo conjugado»—
está aplicada. Lo que faltó fue extenderla al **rótulo**: los tres riesgos de datos de esta ficha
(R2, R4, R13) son rótulos, no celdas. La regla completa es: *ni el rótulo ni la celda llevan
verbo conjugado; el rótulo es un encabezado de columna, no un sujeto.*

## Aparte 2: `Only you know` de Kevin es el modelo que hay que copiar

Los tres puntos del dato oculto de Kevin (líneas 119-121) están escritos como debe escribirse un
dato oculto, y son el contraejemplo dentro del propio fichero de lo que falla en el de Valentina:

> `- **Tuesday: 100,000 collected from each of them.** If nobody goes: 200,000 back tonight, two people let down.`

Participio (`collected`, `let down`), dos puntos en vez de verbo, condición sin cláusula
principal. Cero decible, y sin embargo el estudiante sabe exactamente qué tiene y qué pierde.
Enfrente, el mismo bloque de Valentina (45-47) tiene tres puntos y los tres llevan verbo. La
diferencia no está en la dificultad del dato: está en que uno se escribió desde la libreta y el
otro desde la boca del personaje.

## Aparte 3: no es calcabilidad, pero se ve desde aquí

- **Línea 204** — `each of you says **his** own part of the message`. Valentina es una de las dos.
- **Líneas 179 y 198** — son la prosa más densa de todo el fichero (`Global turn 3 = the third
  turn of the conversation, not your third one. Kevin opens here, so turn 3 is his second one and
  you play the card on turn 4.`) y están en la pantalla que el estudiante abre **a mitad de turno,
  con el reloj corriendo**. §11 pide para el inglés A2 leído «frases cortas, presente y pasado
  simple, cero subordinación larga». Ese bloque no lo cumple.
- **Línea 114** — `The 200,000 … are` — concordancia dudosa con una cantidad. La reescritura de
  R12 la resuelve de paso al cambiar el verbo por dos puntos.
- **Tres filas de vocabulario compartidas literalmente entre las dos fichas** (`to owe someone`,
  `a spot`, `the guard at the gate`, columna `what it is`). §11 dice «solo las de **este** rol en
  **este** escenario». Aquí solo cambia la columna `here`, y el grave 1 es la factura de eso.
- **Línea 81** — la línea `Your toolkit` de Valentina encadena seis incisos con guiones largos
  anidados y sin un punto, igual que en el escenario 2. Se apunta otra vez, para la pasada de
  nivel.

---

## Efecto sobre el presupuesto de prosa

Medido con el método declarado en el propio fichero (líneas 259-262: toda línea que no empieza
por `|`, entre el encabezado de un rol y el separador siguiente). Verificado: da **374** y
**370**, las cifras que el fichero declara.

**Ninguna reescritura añade palabras.** De las 22 propuestas, seis tocan prosa contada; las demás
están dentro de tablas, que no cuentan.

| ficha | reescrituras de prosa | delta | antes | después |
|---|---|---|---|---|
| ROLE A | 30 (−1), 40 (−1), 45 (0), 46 (−1), 47 (0), 49 (−1), 81 (−1) | **−5** | 374 | **369** |
| ROLE B | 104 (−1), 111 (−2), 114 (−2), 156 (−2) | **−7** | 370 | **363** |
| La carta | ninguna (los tres arreglos son filas de tabla) | 0 | 94 | 94 |

Las dos fichas bajan. El control que el fichero declara —«el mismo texto medido con la misma
regla antes y después»— sigue en verde, y con ocho y doce palabras más de margen que ahora.

Las dos reescrituras de prosa que no son de una palabra:

**Línea 40** (30 palabras → 29):
> `1. Put money in for somebody else. 600,000 out of your pocket, his part missing. His, yes; a stranger's, no. Your share of a new split: fine, nobody else's.`

**Línea 111** (38 → 36), solo la cola:
> `… — not just Valentina's name — that one: a question back, and a call to Valentina.`

---

## Lo que hay que hacer antes de publicar

**Bloqueante — los tres graves.** Mientras estén, el escenario se puede resolver leyendo: la
apertura de Valentina (grave 1) y la noticia entera de la carta (graves 2 y 3), que es la pieza
que el diseño quiere que cueste.

**Después, en este orden:** los tres rótulos con verbo (R2, R4, R13), que son las tres jugadas
centrales; los cuatro riesgos del dato oculto y del toolkit (R1, R9, R14, R15); y el resto, que
son de una palabra cada uno.

**Y una regla para el resto del set, que sale de aquí:** cuando una fila de vocabulario esté
duplicada entre las dos fichas, hay que leerla **dos veces, una por pantalla**. La misma cadena
puede ser inocua en un rol y ser el fallo grave del fichero en el otro, y el segundo no se ve
desde el primero.
