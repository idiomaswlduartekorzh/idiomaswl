# Escenario 7 · `two-more-people-for-the-trip` — auditoría de NIVEL (2.ª pasada, versión en inglés)

Auditado: `artifacts/habla-a2/fase7-fichas-7-two-more-people-for-the-trip.md`, versión del 20 ago
2026 (la que ya aplicó los hallazgos de la 1.ª pasada).
Contra: `src/data/grammar/registry.ts` y `src/data/grammar/ingles/{a1,a2}` para los slugs, el
molde `artifacts/habla-a2/fase7-modelo-ficha-en.md` y la caja
`artifacts/habla-a2/caja-de-herramientas-a2.md`.

Se auditan las tres cosas del encargo: lo que el estudiante **dice** (A2 hablado), lo que tiene que
**leer** (A2 leído), y las **21 entradas de vocabulario** una a una. Más los **11 anclajes**.

**Veredicto: PASA CON CAMBIOS.**

La mitad hablada está limpia y la comprobación de slugs pasa entera: los once existen y los once
títulos son idénticos al registro, carácter por carácter. Lo que sigue roto es lo mismo que en la
pasada anterior, movido de sitio: **la ficha se leyó como un problema de longitud y se resolvió
quitando verbos**. Al quitar verbos, cuatro líneas quedaron en un inglés que no es A2 leído — y
una de ellas es la única salida que tiene el escenario. Y el recorte se llevó por delante **tres
definiciones de vocabulario cuyas palabras siguen en la ficha**, una de ellas dentro de un
exponente que el estudiante tiene que decir.

**Aviso de presupuesto, medido antes de proponer nada.** Con el método que declara la propia
ficha (líneas no iniciadas por `|`, entre encabezado de rol y separador), reproduzco **374 y 370**
exactos. También medí a los hermanos con la misma regla y las mismas líneas:

| ficha | ROLE A | ROLE B | rango medido |
|---|---|---|---|
| **7 · two-more-people** | **374** | **370** | 29-99 · 103-174 |
| 6 · the-cousin-on-the-sofa | 402 | 414 | 26-96 · 100-169 |
| 1 · the-bike-in-the-parking-lot | 435 | 429 | 25-96 · 100-170 |
| 8 · cancel-the-gym (estado actual del árbol) | 440 | 465 | 29-103 · 107-182 |

Es decir: **la ficha 7 es la más corta del set por 30-90 palabras.** No estaba apretada. Las
33 palabras que cuestan las correcciones de abajo (+14 en A, +6 en B, más las de la carta, que va
fuera del presupuesto por §9) la dejan en 388 y 376, todavía por debajo de las otras tres. Y hay
una segunda vía que no cuesta nada: **el bloque de vocabulario es una tabla, y el método de la
propia ficha no cuenta las líneas que empiezan por `|`**. Añadir una fila de vocabulario cuesta
cero palabras de prosa. El único tope que aplica ahí es el 8-10 del §11, y ROLE A va con 9.

*(Nota menor: la tabla de cuentas de la ficha atribuye 398/400 a la ficha 8. Hoy mide 440/465
porque la 8 tiene cambios sin commitear de otra sesión. La medición era cierta cuando se tomó; el
argumento que sostiene —que el 350 declarado no sale de este método— sigue de pie.)*

---

## 0. Lo que pasa limpio, y no hay que tocar

**Los 18 exponentes hablados son A2 o por debajo.** Nueve por rol. Comprobados uno a uno y
también por patrón sobre el archivo entero:

| prohibida | en los 18 exponentes | dónde aparece en el resto |
|---|---|---|
| present perfect de duración con `for` / `since` | **0** | `since 6:00 p.m.` (l. 45, sin verbo) → **M-2** |
| `could` de cortesía | **0** | 0 · `could` solo aparece dentro de un `rationale`, para decir que no entra |
| pasiva | **0** | l. 119 (`100,000 collected`), l. 148 (`were meant to pay`), l. 208 (`is not decided`), l. 173 (`is settled`) → G-3, M-6, M-9 |
| preguntas incrustadas | **0** | l. 37, 173, 210 → M-1, M-9 |
| modal + infinitivo perfecto | **0** | **0** — el `have to have answered` de la pasada anterior está corregido |
| condicional hipotético / `would` | **0** | **0** |
| `would rather` / `would prefer` | **0** | **0** |

**El estudiante no va a decir nada prohibido.** Sigue siendo cierto lo que decía la pasada
anterior: el problema es lo que le hacemos leer.

**Dos aciertos de diseño que conviene no perder en una pasada futura:**

- **`OK — I'll say it like this: …` evita el estilo indirecto.** El cierre pide a Kevin repetir un
  mensaje y a Valentina corregirlo. Escrito con «tell her that…» esto se vuelve reported speech,
  que es B1. Con `like this:` + comillas se resuelve en estilo directo y se queda en A2. Lo mismo
  hace `What do I say to Andrea?`.
- **`Can I pay you on …?` en vez de `Could I…?`.** Es la petición central de Kevin y está resuelta
  con `can`, que sí existe en A1. El registro informal lo permite y el `rationale` lo dice.

**Los once anclajes existen y los once títulos son exactos.** Verificado slug a slug (tabla en
§4). Ninguno devuelve `null`; los cinco de A1 van sin sufijo y `connectors-a2` lleva el suyo, que
es como está en el registro.

**Seis afirmaciones de los `rationale` sobre el contenido de los temas: verificadas y ciertas.**
`past-simple-questions` sí avisa de «Did she went?» (l. 18, 39, 87). `present-perfect-ever-never`
sí trabaja `yet` en negativos (l. 30). `past-simple-irregular` **no** tiene `pay` entre sus 30
—el encabezado es literalmente «Los 30 verbos irregulares esenciales de A2», l. 54— y sí trabaja
`said`. `will-future` sí trae «promesa» y «decisión espontánea» (l. 32-33). `can-ability` sí
enseña permiso y petición (l. 47, 86, 197). `imperative` sí trae `Listen!` y `Repeat!` y el
negativo con `don't` (l. 25, 47). La corrección del `paid` de la pasada anterior está aplicada y
bien aplicada.

**Once definiciones de vocabulario de veintiuna pasan sin tocar:** `a spot`, `to owe someone`,
`ID number`, `the guard at the gate`, `to charge someone`, `to fit`, `ID card`, `to be short`,
`to give someone a ride`, `a shift`, `a hammock`, más las dos de la carta (`a camping mat`,
`the building manager`). `to fit | to have enough space for people or things` es el arreglo del
falso amigo `room`, y está bien hecho: la definición ya no choca con las `3 bedrooms` de la tabla.

---

## 1. GRAVE — cinco

### G-1 · La única salida del escenario está escrita en la línea más comprimida de la ficha

> Línea 40: `1. Put money in for somebody else. You paid 600,000; his part is missing. You *can*
> cover his, not a stranger's. **Your share of a new split: fine, nobody else's.**`

La banda del diseñador (l. 15-18) dice, con todas las letras, que esa última frase es lo que
impide que el escenario se atasque: sin ella, «desatascar el escenario exigía romper la ficha». Es
la pieza de la que depende el desenlace. Y es la frase peor escrita de las dos fichas:

- **`split` como sustantivo** («un reparto») no está en ninguna de las nueve filas de vocabulario
  de Valentina. Es B1 en esta acepción.
- **`share` como sustantivo** tampoco está, y `to cover` («cubrir la parte de otro») tampoco.
  Las tres palabras que cargan la frase son las tres que no se explican.
- **Dos elipsis encadenadas con genitivo:** `cover his` (= *his part*) y `not a stranger's`
  (= *not a stranger's part*), y luego `nobody else's`. Tres posesivos sin nombre detrás.
- **`Put money in for somebody else`** es un phrasal (`put in`) que en la ficha de Kevin sí se
  explica (`to chip in`) y en la de Valentina no.

Si Valentina lee esto como «no puedo poner dinero de más», dice que no a lo único que cierra el
escenario, y el fallo no se ve: parece una negociación dura, no una ficha mal leída.

**Cambio.**

> 1. Put money in for another person. You paid 600,000, and Kevin's part is missing. You **can**
>    pay his part, not a stranger's. If the six pay a new price together, you pay your part —
>    nothing more.

37 palabras donde había 30. **+7.** Y añadir a la tabla de Valentina, que va con 9 de 10:

> `| to split the cost | to pay one price between all of you, the same for each | the six of you, if the price changes |`

Cero palabras de prosa (es fila de tabla).

### G-2 · `Don't, and you bargain blind.`

> Línea 45: `Tell him and he can use it. **Don't, and you bargain blind.**`

Es la decisión táctica más importante de Valentina —contarle o no que el carro de Hernán está en
el taller— y está escrita con: imperativo elíptico (`Don't,` sin verbo detrás), construcción
imperativo + `and` con valor condicional dos veces seguidas, `to bargain` (B1, sin fila de
vocabulario) y `blind` como adverbio en una colocación idiomática.

La pasada anterior ya había arreglado esta línea y había propuesto *«Tell him and he can use it.
Don't tell him and you decide without knowing.»* La reescritura la volvió a comprimir y le
devolvió la metáfora. Es un retroceso.

**Cambio.** `Tell him, and he can use the car. Say nothing, and you talk without knowing.`

15 palabras donde había 13. **+2.**

### G-3 · `the money got said` — dos veces, y no es inglés

> Línea 98 (ROLE A) y línea 173 (ROLE B): `… **the money got said**, and tomorrow you still ride
> together.`
> Línea 98: `the 100,000 **got a date**` · línea 173: `the 100,000 **got one exact date**`

Tres *get*-passives en las dos listas de «You did it if» — la parte que el estudiante lee al final
para saber si lo hizo bien. El *get*-passive no es A2 ni de lejos, pero el problema mayor es que
**`the money got said` no significa nada en inglés**: el dinero no «se dice». Un nativo lo lee dos
veces y no lo resuelve.

Que la casilla lleve pasiva es estilo del set (el molde escribe `what's still open was said out
loud`), así que no propongo quitar la voz pasiva. Propongo quitar el *get* y la colocación
imposible.

**Cambio.** En las dos listas: `you talked about the money, and tomorrow you still ride together.`
Y `the 100,000 has a date` / `the 100,000 has one exact date, said in the group`.

Saldo: **+1 en A, 0 en B.**

### G-4 · Los dos datos ocultos de Valentina están escritos con el objeto delante

> Línea 47: `**Sebastián you know**, last year's trip. **Andrea you've never seen.**`

Objeto + sujeto + verbo, dos veces. Es una topicalización marcada: existe en inglés, pero es
recurso literario, no A2 leído. Dos problemas, y el segundo es peor que el primero:

1. Se lee mal. Un hispanohablante de A2 que ve `Sebastián you know` tiende a leerlo como *Sebastián
   te conoce*, que es exactamente lo contrario, y ahí se cae el reparto entero de la escena
   (Valentina pregunta por Andrea **porque** no la conoce).
2. **Se lo estamos modelando justo antes de que hable.** El orden OSV es el error de transferencia
   clásico del español al inglés. La ficha no debería enseñarlo tres líneas antes del primer turno.

**Cambio.** `You know Sebastián — last year's trip. You have never met Andrea.`

12 palabras donde había 10. **+2.** `have never met` sigue anclado en
`present-perfect-ever-never`, igual que el `you've never seen` que sustituye.

### G-5 · El recorte se llevó tres definiciones, y dejó las tres palabras dentro

Comparado el bloque de vocabulario de esta versión (21 entradas) con el de la anterior (20), tres
palabras perdieron su fila **y siguen en la ficha**:

| palabra | dónde sigue | por qué importa |
|---|---|---|
| `last minute` | **línea 162, dentro de un exponente**: `I know it's last minute, but …` | es de las nueve frases que Kevin **tiene que decir**. Le pedimos decir una expresión cuya fila borramos |
| `to let someone down` | línea 119: `two people let down` | participio pasivo de un phrasal idiomático, en el dato oculto que le da su motivo |
| `to split the cost` | línea 40: `a new split` | ver **G-1** |

Y hay dos más que nunca tuvieron fila y la piden: **`to collect`** (l. 119, `100,000 collected
from each of them`, y otra vez en la tabla de datos) y **`to bargain`** (l. 45, ver G-2).

Esto no es un problema de sitio: **las filas de vocabulario no cuentan en el presupuesto de prosa**
(el método de la propia ficha excluye las líneas que empiezan por `|`). El tope real es 8-10 filas
por rol: **ROLE A tiene 9 y le cabe una** (la de G-1). **ROLE B tiene 10 y está lleno**, así que
ahí la salida es quitar la palabra difícil de la prosa, no explicarla:

- l. 119: `two people let down` → **`two people you have to say no to`**. (+3)
- l. 119: `100,000 collected from each of them` → **`each of them gave you 100,000`**. (0)

Saldo en B: **+3.**

---

## 2. MEDIO — el inglés que hay que leer

### M-1 · La regla que gobierna todos los turnos de Valentina sigue sin caber en A2 leído

> Línea 37: `**Your own rule** · Decide nothing until he says who they are and why they matter.`

Esta frase es literalmente la propuesta de la pasada anterior, así que el hallazgo es contra mí
mismo: **la versión corta que propuse sigue siendo demasiado.** Tiene tres cosas encima del nivel
a la vez: `Decide nothing` (imperativo negativo con cuantificador, en vez de `Don't decide
anything`), una subordinada con `until`, y **dos preguntas incrustadas encadenadas** (`who they
are`, `why they matter`). Es la instrucción que decide cómo juega Valentina de principio a fin, y
si la lee mal el fallo es invisible.

**Cambio, esta vez en frases sueltas:**

> **Your own rule** · Don't say yes yet. First ask two things: who are they? Why do they matter?

En preguntas directas, que es donde el A2 vive, y además queda alineado con el exponente
`Who exactly is …?` que ya tiene. 15 palabras donde había 12. **+3.**

### M-2 · `since`, en la línea que la propia ficha decidió proteger de `since`

> Línea 45: `Hernán's car: at the mechanic's **since** 6:00 p.m.`

El `rationale` de `present-perfect-ever-never` (l. 233) dice, textual: *«El 30 de julio va como
fecha suelta a propósito: con since, el A2 escribe present perfect donde no toca.»* La ficha aplica
esa regla a la deuda y la rompe once líneas antes con el carro. No hay verbo, así que no hay
present perfect impreso — pero la palabra queda en la cabeza del estudiante dos minutos antes de
hablar, que es exactamente el mecanismo del que avisa el `rationale`.

**Cambio.** `Hernán's car: went to the mechanic's at 6:00 p.m., engine noise · still there`. (+2)

### M-3 · `If I don't have it tonight, I can't …` no es lo que enseña `first-conditional`

El tema `a2/first-conditional` es explícito: la cláusula de resultado va con **will/won't + base**,
y `can`/`must`/`have to` se admiten **en la cláusula `if`**, no en la de resultado (l. 31). Su
lista de errores incluye *«If you study, you pass ❌ → you'll pass ✓ — el resultado futuro lleva
will»*. El exponente de Valentina pone el modal justo donde el tema no lo pone.

La frase es inglés natural y A2 decible, así que el anclaje no está mal elegido: está mal citado.
Dos salidas, y prefiero la primera porque no toca el `rationale` de nadie más:

1. **`If I don't have it tonight, I won't send the list.`** — plantilla exacta del tema, y dice lo
   mismo.
2. Dejar `can't` y añadir media línea al `rationale`: *«el resultado con `can't` es extensión
   natural del patrón, no está en el tema»*.

### M-4 · `who pays who, out loud` — el mismo doble WH que ya se quitó una vez

> Línea 76, columna «here» de `to charge someone`.

Dos pronombres interrogativos en una sola cláusula. Es la construcción que la pasada anterior
señaló como sintaxis de C1 en `who rides where` y que se quitó del cierre. Volvió en la tabla de
vocabulario. (Y de paso: en inglés correcto sería `who pays whom`.)

**Cambio.** `say out loud who pays`. (0)

### M-5 · Dos idiomáticas de la columna «here» que tapan justo lo que tienen que abrir

> Línea 153: `a hammock | a bed you hang between two trees | Sebastián's bed — **the bed count,
> not the wall you thought**`
> Línea 111: `not just Valentina's name — **that one gets you a question back**, and a call to
> Valentina.`

La primera es el giro del escenario: la hamaca desmonta el argumento de las seis camas. La celda
que tiene que hacerlo evidente dice `the bed count, not the wall you thought`, que es una elipsis
(*not the wall you thought it was*) sobre una metáfora (*el muro*) que en ningún sitio de la ficha
se ha establecido. La segunda tiene un *get* causativo (`gets you a question back`) y cambia de
interlocutor sin avisar: el `you` de esa línea le habla a Andrea, no a Valentina, que es con quien
Kevin está hablando — y por eso `a call to Valentina` se lee como un absurdo.

**Cambios.**
- `Sebastián's bed — so one bed less than she thinks`. (0)
- `not just «Valentina said yes» — Andrea will ask more, and she will call Valentina.` (+3)

### M-6 · `how the six were meant to pay` y `to whoever doesn't go`

> Línea 148: `to chip in | … | how the six **were meant to** pay · five did`
> Línea 149: `to pay someone back | … | tonight, **to whoever doesn't go**`

`be meant to` es B1 y encima va en pasiva. `whoever` es B1. Las dos están en la columna que
tendría que ser la más fácil de la tabla.

**Cambios.** `how the six agreed to pay · five did` (0) · `tonight, to the people who don't go`. (+1)

### M-7 · Dos sentidos de `on you` en la misma ficha, ninguno explicado

> Línea 114: `The **200,000 on you** are Sebastián's and Andrea's.` (= el dinero que llevas encima)
> Línea 131, tabla: `Your car | 5 seats · **gas on you**` (= la gasolina la pagas tú)

Misma preposición, dos usos idiomáticos distintos, a quince líneas uno de otro, y la ficha de
Valentina repite el segundo (`gas on him`, l. 64). El primero además arrastra una concordancia
rara (`The 200,000 … are`).

**Cambio.** `The 200,000 in your pocket are not yours: they are Sebastián's and Andrea's.` (+4)
`gas on you` se queda: en la tabla, con `5 seats` al lado, se resuelve solo.

### M-8 · La columna de instrucciones de Kevin quedó más difícil que la de Valentina

La pasada anterior arregló cuatro celdas de ROLE A (`let it land…`, `come back at something
decided…`, `say what falls apart…`, `take what he dictated…`) y todas están aplicadas. En ROLE B
quedaron tres sin tocar:

| línea | como está | cambio |
|---|---|---|
| 162 | `put **the lateness** in front before she does` | `say you are late before she says it` |
| 163 | `**own it** without **dropping what you came for**` | `say it is your fault, and still ask for what you want` |
| 165 | `open **the half of the mess that isn't yours**` | `ask about the part that is not your fault` |

`lateness` es una nominalización más rara que `late`; `own it` en el sentido de *asumirlo* es B2;
`the half of the mess that isn't yours` es relativa + metáfora + negación en cinco palabras.
Saldo: **+6.**

### M-9 · La pantalla compartida — tres cosas

> Línea 204: `It ends like this: **each of you says his own part** of the message for the WhatsApp
> group **out loud** — …`
> Línea 173: `**your car's 8:00 is settled**, and who rides in it`
> Línea 208: `**What is not decided yet**, your next call tomorrow, …`

1. **`his own part`** con una pareja en la que un jugador **es Valentina**. Es el genérico
   masculino, y aquí no es sólo anticuado: contradice la línea siguiente, que reparte los puntos
   por nombre. **Cambio:** `each of you says your own part`.
2. **`out loud` a nueve palabras del verbo**, con el sintagma largo en medio. **Cambio:** partir la
   frase: `It ends like this: each of you says your own part of the message out loud. It is the
   message for the WhatsApp group.`
3. **Dos pasivas de estado** (`is settled`, `is not decided`) en el sitio donde el estudiante mira
   para saber si terminó, y una de ellas coordinada con una incrustada (`and who rides in it`).
   La pasada anterior propuso el arreglo de la primera y **no se aplicó**, aunque la ficha declara
   en su §«Hallazgos no aplicados» que se aplicaron todos los medios menos tres, y este no es
   ninguno de los tres. **Cambios:** `your car leaves at 8:00, and you know who rides in it` ·
   `What you still don't know`.

Saldo: **+4 en la pantalla compartida** (fuera del presupuesto de las fichas), **+2 en B**.

### M-10 · La carta: `first thing` y el aviso de cierre

> Línea 188: `she asks him **first thing** and calls you before 7:00 a.m.`
> Línea 198: `**Open it early and you win nothing.** … And you have to change something you
> already said.`

`first thing` (= a primera hora) es idiomático y sin fila; leído literalmente da *«le pregunta la
primera cosa»*, que en un contexto de listas y nombres hasta cuadra. Y `Open it early and you win
nothing` repite el imperativo + `and` condicional de G-2, que es la construcción que estamos
quitando en la otra pantalla.

**Cambios.** `she asks him early in the morning and calls you before 7:00 a.m.` ·
`If you open it early, you win nothing.` — que además es primer condicional, ya anclado.
La carta va fuera del presupuesto (§9).

---

## 3. El vocabulario, una a una

21 entradas: 9 de Valentina, 10 de Kevin, 2 de la carta. Criterio: **la definición tiene que estar
en inglés más fácil que la palabra que define.**

Sobre las repeticiones: `a spot`, `to owe someone` y `the guard at the gate` aparecen en las dos
fichas con la misma definición. **Eso está bien y no es desperdicio**: cada estudiante ve sólo su
pantalla, así que una palabra que los dos necesitan tiene que estar dos veces. (La pasada anterior
celebraba que las 20 entradas fueran distintas; era un elogio equivocado.)

| # | entrada | veredicto |
|---|---|---|
| 1 | `a spot \| one free place for one person, in a house or in a car` | ✅ el modelo del bloque |
| 2 | `to owe someone \| to have to pay money to a person, and you did not pay it yet` | ✅ un tiempo por cláusula, `yet` anclado |
| 3 | `ID number \| the number on the card that says who you are` | ✅ arreglada la circularidad de la pasada anterior |
| 4 | `the guard at the gate \| the person at the door who checks the list` | ✅ |
| 5 | `to charge someone \| to ask a person for money for something` | ✅ (la columna «here» falla → M-4) |
| 6 | `to fit \| to have enough space for people or things` | ✅ arreglado el falso amigo `room` |
| 7 | `ID card \| the card with your photo and your number on it` | ✅ |
| 8 | `to be short \| to not have enough of something` | ✅ |
| 9 | `to give someone a ride \| to take a person somewhere in your car` | ✅ |
| 10 | `a shift \| the hours you work in one day` | ✅ idéntica al molde |
| 11 | `a hammock \| a bed you hang between two trees` | ✅ (la columna «here» falla → M-5) |
| 12 | `a camping mat \| a thin bed you put on the floor` | ✅ |
| 13 | `the building manager \| the person who says yes or no about the building` | ✅ |
| 14 | `reservation \| the owner keeps the house for you, and **your name is the one she has**` | **medio** |
| 15 | `to pay someone back \| to give back money **that is not yours**` | **medio** |
| 16 | `to chip in \| **to put in** some money, when everybody in the group **puts in** some` | leve |
| 17 | `the mechanic \| the person who **repairs** cars` | leve |
| 18 | `to put someone's name down \| to **write a person** on a list` | leve |
| — | `to split the cost` / `to cover` | **falta** → G-1 |
| — | `last minute` | **falta, y está dentro de un exponente** → G-5 |
| — | `to let someone down`, `to collect`, `to bargain` | **faltan** → G-5, G-2 |

**14 · `reservation`.** La definición es más difícil que la palabra por dos razones. Una:
`reservation` es cognado transparente para un hispanohablante (*reserva*) y no necesitaba
explicación; la fila se gasta en la palabra fácil mientras `split` se queda sin ninguna. Dos:
`your name is the one she has` es una estructura pseudo-hendida con `the one` como proforma, que
es más difícil que todo lo que hay alrededor. **Cambio:** `the owner keeps the house for you, with
your name on it`.

**15 · `to pay someone back`.** La definición dice `money that is not yours`, y eso no es
devolver un préstamo: eso es devolver algo ajeno. Sirve para este escenario (Kevin devuelve los
200.000 que recogió) pero es falsa como definición de la palabra, y el estudiante se la lleva mal
aprendida. **Cambio:** `to give money back to the person who gave it to you`.

**16 · `to chip in`.** Define `put in` con `put in`: `to put in some money, when everybody in the
group puts in some`. Circular. **Cambio:** `to give some money, when everybody in the group gives
some`.

**17 · `the mechanic`.** `to repair` es menos frecuente que `mechanic` (que además es cognado).
**Cambio:** `the person who fixes cars`.

**18 · `to put someone's name down`.** `to write a person on a list` no es colocación posible: se
escribe el nombre, no la persona. **Cambio:** `to write a person's name on a list`.

---

## 4. Los `grammarReferences`, slug a slug

**La comprobación pasa entera.** Contrastado contra `src/data/grammar/ingles/{a1,a2}`, leyendo el
campo `slug` y el campo `title` de cada archivo:

| # | nivel | slug | existe | título exacto | archivo |
|---|---|---|---|---|---|
| 1 | a2 | `past-simple-questions` | sí | sí | `a2/past-simple-questions.ts` |
| 2 | a2 | `present-perfect-ever-never` | sí | sí | `a2/present-perfect-ever-never.ts` |
| 3 | a2 | `past-simple-irregular` | sí | sí | `a2/past-simple-irregular.ts` |
| 4 | a2 | `first-conditional` | sí | sí | `a2/first-conditional.ts` |
| 5 | a2 | `will-future` | sí | sí | `a2/will-future.ts` |
| 6 | a2 | `connectors-a2` | sí | sí | `a2/connectors.ts` · **el archivo se llama `connectors.ts`, el slug interno sí es `connectors-a2`** |
| 7 | a1 | `there-is-there-are` | sí | sí | `a1/there-is-there-are.ts` |
| 8 | a1 | `can-ability` | sí | sí | `a1/can-ability.ts` |
| 9 | a1 | `wh-questions` | sí | sí | `a1/wh-questions.ts` |
| 10 | a1 | `prepositions-time` | sí | sí | `a1/prepositions-time.ts` |
| 11 | a1 | `imperative` | sí | sí | `a1/imperative.ts` |

Sobre el sufijo: en el registro de inglés A2 sólo cinco slugs lo llevan (`connectors-a2`,
`relative-clauses-a2`, `present-continuous-future-a2`, `past-continuous-a2`, `used-to-a2`,
`prepositions-movement-a2`). Los cinco anclajes de A1 de esta ficha van sin sufijo, que es como
existen. **Ninguna referencia devolvería `null`.**

**Los `rationale` reescritos en esta pasada son ciertos**, incluido el de `past-simple-irregular`,
que era el que afirmaba algo falso. Dos apuntes, ninguno grave:

- **L-1 · `past-simple-irregular`.** El `rationale` dice que `paid` *«sigue el mismo patrón -aid
  que el tema sí trabaja en said»*. Es cierto en la escritura, pero la **única** vez que la palabra
  `paid` aparece en ese archivo es para decir lo contrario en el sonido: *«said /sɛd/ … rima con
  "bed", no con "paid"»* (l. 186). Merece media línea: *«…mismo patrón de escritura -aid, aunque
  el tema use precisamente paid para contrastar la pronunciación de said»*. Así el profesor que
  abra el tema encuentra lo que la ficha le prometió.
- **M-3** (arriba) es el otro: `first-conditional` no cubre el modal en la cláusula de resultado.

**Lo que la ficha declara sobre los anclajes que faltan, comprobado y correcto:** no hay tema de
*question tags* entre los 21 slugs de inglés A2 —los conté— así que `We're good, right?` no tiene
dónde anclarse y hace bien en quedarse como *chunk*. Y `relative-clauses-a2` existe, pero trata
relativas con `who/which/that`, no la relativa libre de `that's not what we said`. Forzar ese slug
sería mentir en el registro. De acuerdo con las dos decisiones.

---

## 5. Resumen, por sitio

| # | dónde | qué | gravedad | palabras |
|---|---|---|---|---|
| G-1 | l. 40 · ROLE A | la excepción que desatasca el escenario: `split`, `share`, `cover` sin fila + tres elipsis posesivas | grave | +7 · +1 fila |
| G-2 | l. 45 · ROLE A | `Don't, and you bargain blind.` — imperativo elíptico + `bargain` sin fila | grave | +2 |
| G-3 | l. 98, 173 | `the money got said` ×2 y `got a date` ×2 — *get*-passive, y uno no es inglés | grave | +1 · 0 |
| G-4 | l. 47 · ROLE A | `Sebastián you know` / `Andrea you've never seen` — OSV modelado antes de hablar | grave | +2 |
| G-5 | vocabulario | tres filas borradas cuyas palabras siguen dentro, una en un exponente (`last minute`) | grave | +3 en B · filas 0 |
| M-1 | l. 37 · ROLE A | «Your own rule»: imperativo negativo + `until` + dos incrustadas | medio | +3 |
| M-2 | l. 45 · ROLE A | `since`, que la propia ficha decidió dejar fuera | medio | +2 |
| M-3 | anclaje #4 | `can't` en la cláusula de resultado; el tema sólo enseña `will` ahí | medio | 0 |
| M-4 | l. 76 · vocab A | `who pays who` — doble WH, el patrón ya retirado una vez | medio | 0 |
| M-5 | l. 153, 111 | `the wall you thought` (el giro del escenario) · `gets you a question back` | medio | +3 |
| M-6 | l. 148, 149 · vocab B | `were meant to` (pasiva B1) · `whoever` | medio | +1 |
| M-7 | l. 114, 131 | dos sentidos de `on you` sin explicar | medio | +4 |
| M-8 | l. 162, 163, 165 | la columna de instrucciones de Kevin quedó sin la pasada que sí tuvo la de Valentina | medio | +6 |
| M-9 | l. 204, 173, 208 | `his own part` con una jugadora que es Valentina · dos pasivas de estado · una de ellas ya señalada y no aplicada | medio | +2 |
| M-10 | l. 188, 198 | `first thing` · imperativo + `and` condicional en la carta | medio | fuera |
| L-1 | anclaje #3 | el `rationale` invoca `said` como patrón de `paid`; el tema usa `paid` para contrastarlos | leve | 0 |
| L-2 | vocab 14-18 | cinco definiciones que no son más fáciles que su palabra (`reservation`, `to pay someone back`, `to chip in`, `the mechanic`, `to put someone's name down`) | leve-medio | 0 |
| L-3 | l. 35, 42, 49, 115, 123 | `for anyone new` · `Drop … one package` · `all five his` · `past tonight` · `two people to face` | leve | ~+4 |

**Saldo:** ROLE A **+14** (374 → 388), ROLE B **+6** (370 → 376), la carta y la pantalla
compartida fuera del presupuesto por §9. Las dos fichas siguen siendo **las más cortas del set**
(la que le sigue, la 6, mide 402/414). **Cero cambios en los once slugs. Cero cambios en los
dieciocho exponentes hablados**, salvo el `won't` opcional de M-3.
