# Escenario 7 · `two-more-people-for-the-trip` — auditoría de NIVEL (3.ª pasada)

Auditado: `artifacts/habla-a2/fase7-fichas-7-two-more-people-for-the-trip.md`.
Contra: `src/data/grammar/registry.ts` y `src/data/grammar/ingles/{a1,a2}/*.ts` (slug a slug),
`docs/habla-acompanado-blueprint.md` §4, §9, §10 y §11, y
`artifacts/habla-a2/caja-de-herramientas-a2.md`.

**Antes de nada, un hecho que cambia cómo hay que leer este informe.** La ficha **no se ha tocado
desde la 2.ª pasada**:

| archivo | última modificación |
|---|---|
| `fase7-fichas-7-two-more-people-for-the-trip.md` | 20 ago 2026, **16:30** |
| el informe de la 2.ª pasada | 20 ago 2026, **21:12** |
| `fase7-naturalidad-7.md` | 20 ago 2026, 21:16 |
| `fase7-simulacion-7.md` | 20 ago 2026, 21:19 |

Es decir: los cinco graves y los diez medios de la pasada anterior **siguen enteros dentro del
archivo**, no porque se hayan revisado y descartado, sino porque nadie ha vuelto a escribir la
ficha después. Para no borrar ese trabajo, el informe anterior se conserva en
`artifacts/habla-a2/fase7-nivel-7-ronda2.md` y este archivo lleva la pasada nueva, que es la
convención que ya usa el directorio (`fase7-nivel-6-ronda1.md` + `fase7-nivel-6.md`).

Lo que hace esta pasada, entonces, es tres cosas: **reverificar por mi cuenta** lo que se puede
comprobar contra el repo (los once anclajes, las afirmaciones de los `rationale`, las 21
definiciones), **confirmar cuáles de los quince hallazgos anteriores siguen vivos** —todos— y
**añadir los ocho que la pasada anterior no vio**, uno de los cuales es que **el arreglo que
aceptó para su propio G-2 dice lo contrario del dato**.

**Veredicto: PASA CON CAMBIOS.** Con un aviso: es la segunda vez seguida que sale así con los
mismos graves. «Pasa con cambios» no es un aprobado mientras los cambios no existan en el archivo.

---

## 0. Lo que compruebo limpio, por mi cuenta

**Los 18 exponentes hablados (9 + 9) son A2 o por debajo.** Barrido de las siete estructuras
prohibidas del encargo sobre el archivo entero, no solo sobre las tablas:

| prohibida | en los 18 exponentes | en el resto del archivo |
|---|---|---|
| present perfect de duración con `for`/`since` | 0 | `at the mechanic's **since** 6:00 p.m.` (l. 45) → sigue vivo, ver §2 · M-2 |
| `could` de cortesía | 0 | 0 — `could` solo aparece en un `rationale`, para decir que no entra |
| pasiva | 0 | l. 119 (`100,000 collected`), 119 (`let down`), 148 (`were meant to pay`), 173 (`is settled`), 208 (`is not decided`) |
| preguntas incrustadas | 0 | l. 37 (`who they are` / `why they matter`), l. 173 (`what tonight costs you`), l. 210 |
| modal + infinitivo perfecto | 0 | 0 |
| condicional hipotético / `would` | 0 | 0 |
| `would rather` / `would prefer` | 0 | 0 |

**Confirmo el diagnóstico de fondo de las dos pasadas anteriores, y lo firmo con mis propias
palabras:** el estudiante no va a *decir* nada por encima de su nivel. Todo el problema está en lo
que le hacemos *leer*, y tiene una causa concreta y declarada por la propia ficha: la sección
«Cuenta de palabras» (l. 281-285) dice que se liberaron «unas 45 palabras por ficha» **quitando
verbos conjugados de dieciséis líneas**. Quitar el verbo no hace una frase más fácil para un A2:
la hace más difícil, porque le obliga a reconstruir la oración. El presupuesto se pagó con
legibilidad.

**Los once anclajes existen y los once títulos son exactos** (tabla en §4). Ninguno devolvería
`null`.

**Seis afirmaciones de los `rationale` sobre el contenido de los temas: comprobadas y ciertas.**
`past-simple-questions` sí avisa de «Did she went?» (l. 18 y 39). `present-perfect-ever-never` sí
trabaja `yet` en negativos (l. 30). `past-simple-irregular` **no** tiene `pay` entre sus 30
—recorrí los cuatro grupos de la l. 56-59— y sí trabaja `said`. `will-future` sí trae los usos
«promesa» y «decisión espontánea» (l. 32-33). `can-ability` sí enseña permiso y petición (l. 26 y
47). `imperative` sí trae `Listen!` / `Repeat!` y el negativo con `don't` (l. 25).

**Dos decisiones que hay que defender de futuras pasadas**, porque parecen errores y no lo son:
`Can I pay you on …?` con `can` y no `could` (el registro es informal y `can` es A1), y
`OK — I'll say it like this: …` / `What do I say to Andrea?`, que resuelven el cierre en estilo
directo y evitan el discurso indirecto, que es B1. De acuerdo con la pasada anterior en las dos.

---

## 1. Lo que esta pasada añade — ocho hallazgos nuevos

### N-1 · GRAVE — el arreglo aceptado para `Don't, and you bargain blind.` dice lo contrario del dato

> Ficha, l. 45: `Hernán's car: at the mechanic's since 6:00 p.m., engine noise · call back:
> 7:00 a.m. **Tell him and he can use it. Don't, and you bargain blind.**`
> Informe de la 2.ª pasada, G-2: **Cambio.** `Tell him, and he can use the car. Say nothing, and
> you talk without knowing.`

El arreglo propuesto —y todavía no aplicado, por suerte— convierte el dato en su contrario. El
carro de Hernán **está en el taller**; `he can use the car` dice que Kevin puede usarlo. Si eso
entra en la ficha, Valentina lee que hay un carro disponible que no existe, y el escenario pierde
las cuatro plazas de las que depende todo su cálculo de puestos.

Y hay un problema anterior a la redacción: **la línea original tampoco decide qué hace el dato.**
`Don't, and you bargain blind` dice que si Valentina *no* lo cuenta, negocia a ciegas — pero ella
es la única que lo sabe, así que no negocia a ciegas por callárselo. Las dos mitades no encajan.
Antes de reescribir hay que decidir el trato, y el trato razonable es este: si lo cuenta, el carro
de Kevin pasa a ser imprescindible y él gana la mano; si se lo calla, ella promete puestos que
quizá no tenga.

**Cambio.** `Tell him, and his car is the only car. Say nothing, and you promise seats you maybe
don't have.` (19 palabras donde había 13; +6 · con el `since` de M-2 arreglado en la misma línea,
el saldo de la línea entera se queda en +8.)

Esto es lo primero que hay que resolver, porque el arreglo malo ya está escrito y aprobado en el
informe anterior: **si alguien aplica esa tanda a ciegas, mete el error en la ficha.**

### N-2 · MEDIO — el `rationale` de `connectors-a2` afirma dos cosas que no se sostienen, y es el que sostiene un descarte

> `rationale` (l. 241): «§4 exige además que el rechazo de A2 lleve razón, y esa razón la dan
> `because` y `so`: no viven en las tablas de exponentes de este escenario, **viven en el bloque 5
> de la caja de herramientas**, que los dos roles tienen asignado.»

Comprobado contra `caja-de-herramientas-a2.md`, bloque 5, las cinco filas: `It's important for me
because…`, `I need it because…`, `If I don't…, I…`, `That's why I'm here today.`, `It's not about
the money. It's about…`. **`because` está dos veces. `so` no está.** En toda la caja, `so` aparece
solo como marcador de discurso (`So, we're clear then.`, `So, you're saying…?`), que no es el
conector causal que el `rationale` reclama.

Segunda mitad: §4 del blueprint no «exige que el rechazo lleve razón». Lista «dar una razón» entre
los actos que se le pueden pedir a un A2, junto a «quejarse con educación» y «conceder poniendo una
condición simple». Es una lista de lo que cabe, no un requisito sobre el rechazo.

Importa más de lo que parece porque **este `rationale` es el argumento con el que la ficha descarta
el hallazgo #14** (l. 304-308). El descarte en sí es correcto —§11 fija 6-9 exponentes y Valentina
va con 9, así que un décimo lo rompe—, pero la salida alternativa que se dio por buena se apoya en
un `so` que no existe donde dice.

**Cambio.** `…y esa razón la da because, que vive en el bloque 5 de la caja de herramientas
(«It's important for me because…», «I need it because…»), que los dos roles tienen asignado.`

### N-3 · MEDIO — `to be short`: discrepo del ✅ de la pasada anterior

> l. 150: `| to be short | to not have enough of something | how much is missing, once the numbers
> are out |`

La definición es simple, sí. El problema es **la palabra de entrada**: `to be short`, sin
complemento, es en inglés corriente *ser bajo de estatura*. El sentido que hace falta aquí vive en
la colocación (`we're 50,000 short`, `to be short of money`), y es justo el sentido que la carta
necesita cuando aparece el hueco de los 50.000. Tal como está, un A2 hispanohablante que aprenda
la fila y la use dirá `I am short` y no habrá dicho nada de dinero.

La columna «here» tampoco ayuda: `once the numbers are out` es una temporal con `once` sobre una
idiomática (`the numbers are out`).

**Cambio.** `| to be 50,000 short | to not have all the money you need | the money that is missing,
when you say the numbers |`

### N-4 · LEVE — el `rationale` de `past-simple-questions` describe mal sus propios exponentes

> «…son preguntas en pasado con did, **una negativa y otra con WH**.»

`Why didn't you tell me…?` y `When did that change?` son **las dos** preguntas con WH; lo que las
distingue es que la primera además es negativa. **Cambio:** «…las dos con WH, y una de ellas
además negativa».

### N-5 · LEVE — 10 turnos por rol, contra los 6-9 que fija §4 para A2

La banda del diseñador (l. 10) y las dos cabeceras (l. 30, 104) declaran **10 turnos por rol**.
La tabla de §4 del blueprint da a A2 **6-9 turnos por rol** y 5-8 minutos. Los 7 minutos entran; los
turnos no.

No es un defecto de este escenario: medido sobre el set, **cinco de las siete fichas de fase 7 se
salen** (2 y 4 con 10, 6 con 12, 5 con 17, 7 con 10); solo la 1 y la 8 se quedan en 8. Y el propio
§4 dice que «si un escenario dura más de lo que dice, se corrige el número», es decir, que el
número que se corrige es el de la tabla. Pero **nadie lo ha corregido**, así que hoy el blueprint y
el set se contradicen por escrito. Es tarea de quien consolide el conjunto, no de esta ficha.

### N-6 · LEVE — dos signos aritméticos usados como lengua

> l. 42 (ROLE A): `Hernán + car: one package · **−4 seats** without him.`
> l. 115 (ROLE B): `**No trip = money back**, tonight.`

`+` en `name + ID` funciona porque une dos cosas de una lista. `−4` y `=` no: piden que el
estudiante lea una resta y una ecuación como si fueran una frase, y la resta además tiene signo
negativo pegado a un sustantivo. **Cambios:** `No Hernán, no car: 4 seats less.` ·
`No trip, no money: you give it back tonight.`

### N-7 · LEVE — el bloque 7 está marcado `[grants]` y Kevin lo tiene asignado

La caja marca el bloque 7 («Saying no without saying "no"») como `[grants]`, es decir, para quien
puede dar o negar. La ficha de Valentina lo tiene con la marca (l. 81) y **la de Kevin también lo
tiene** (l. 156), aunque Kevin es `[asks]`. La ficha lo hace a propósito y lo explica (l. 300):
Kevin necesita decir que no al *cuándo* del pago. Está bien pensado, pero entonces **la marca
`[grants]` del bloque 7 en la caja es demasiado estrecha**, porque negarse a pagar hoy también es
negar. Apunte para quien toque la caja, no para esta ficha.

De paso, otra contradicción de documentación que hay que dejar escrita: la caja dice «no ocupa
ninguno de los **6-10** exponentes propios de cada rol (§10 del blueprint)»; §11 fija **6-9** para
A1-A2. §10 y §11 del blueprint no dicen lo mismo. La ficha se acoge a §11, que es la tabla
específica de presupuesto, y hace bien.

### N-8 · LEVE — corrección al informe anterior, para que no se propague

El informe de la 2.ª pasada dice «en el registro de inglés A2 sólo **cinco** slugs llevan sufijo» y
acto seguido enumera **seis**. Son seis: `connectors-a2`, `past-continuous-a2`,
`prepositions-movement-a2`, `present-continuous-future-a2`, `relative-clauses-a2`, `used-to-a2`.
Verificado uno a uno. El resto de esa sección es correcto: 21 temas en A2, ninguno de *question
tags*.

---

## 2. Lo que sigue vivo de la 2.ª pasada — los quince, verificados línea a línea

Ninguno está aplicado. Reproduzco la tabla con la línea comprobada hoy sobre el archivo, para que
quien reescriba no tenga que abrir dos informes. **Los arreglos propuestos allí valen tal cual,
con una excepción: G-2, que hay que sustituir por N-1.**

| # | línea | qué | gravedad |
|---|---|---|---|
| G-1 | 40 · ROLE A | `Your share of a new split: fine, nobody else's` — `split`, `share` y `cover` sin fila de vocabulario, más tres elipsis posesivas encadenadas, en la frase de la que depende el desenlace | grave |
| G-2 | 45 · ROLE A | `Don't, and you bargain blind.` — imperativo elíptico, imperativo + `and` condicional ×2, `bargain` sin fila. **El arreglo propuesto está mal: ver N-1** | grave |
| G-3 | 98, 173 | `the money got said` ×2 (*get*-passive, y además no significa nada en inglés) y `got a date` ×2 | grave |
| G-4 | 47 · ROLE A | `Sebastián you know` / `Andrea you've never seen` — objeto delante, dos veces, tres líneas antes del primer turno | grave |
| G-5 | vocabulario | `last minute` (dentro de un exponente que Kevin **dice**), `to let someone down`, `to split the cost`, `to collect` y `to bargain` están en la ficha y no tienen fila | grave |
| M-1 | 37 · ROLE A | `Decide nothing until he says who they are and why they matter` — imperativo negativo + `until` + **dos preguntas incrustadas**, en la regla que gobierna todos sus turnos y que además contradice su propio exponente `Who exactly is …?` | medio |
| M-2 | 45 · ROLE A | `since 6:00 p.m.` — la palabra que el `rationale` de `present-perfect-ever-never` dice haber dejado fuera a propósito, once líneas antes | medio |
| M-3 | anclaje 4 | `If I don't have it tonight, I can't …` — `first-conditional` autoriza `can`/`must`/`have to` **en la cláusula `if`**, no en la de resultado, y su error nº 3 empuja hacia `will` | medio |
| M-4 | 76 · vocab A | `who pays who, out loud` — doble WH en una cláusula | medio |
| M-5 | 153, 111 | `the bed count, not the wall you thought` (la celda que tiene que revelar el giro del escenario) · `that one gets you a question back` | medio |
| M-6 | 148, 149 · vocab B | `how the six were meant to pay` (pasiva + `be meant to`, B1) · `to whoever doesn't go` | medio |
| M-7 | 114, 131 | dos sentidos idiomáticos de `on you` a quince líneas uno de otro, ninguno explicado | medio |
| M-8 | 162, 163, 165 | la columna de instrucciones de Kevin: `the lateness`, `own it`, `the half of the mess that isn't yours` | medio |
| M-9 | 204, 173, 208 | `each of you says **his** own part` con una jugadora que se llama Valentina · `is settled` · `is not decided` | medio |
| M-10 | 188, 198 | `first thing` sin fila · `Open it early and you win nothing` (imperativo + `and`, el patrón que G-2 retira) | medio |
| L-1 | anclaje 3 | el `rationale` invoca `said` como patrón de `paid`; el tema usa `paid` justamente para contrastar la **pronunciación** | leve |
| L-3 | 35, 42, 49, 115, 123 | `for anyone new` · `one package` · `all five his` · `past tonight` · `two people to face` | leve |

**Sobre M-9.3, que merece una línea propia.** El arreglo de `your car's 8:00 is settled` ya se
propuso en la pasada **anterior a la anterior** y no se aplicó, y sin embargo la ficha declara en
su §«Hallazgos no aplicados» (l. 291) que «se aplicaron los 23 graves y todos los medios salvo los
tres que siguen», y este no es ninguno de los tres. **La declaración de la ficha sobre sí misma no
es exacta**, y eso es lo que hace que el mismo defecto sobreviva tres rondas.

---

## 3. El vocabulario, una a una

21 entradas: 9 de Valentina, 10 de Kevin, 2 en la pantalla de la carta. Los tres números están
dentro de §11 (8-10 por rol; la carta va aparte por §9). Criterio aplicado: **la definición tiene
que estar en inglés más fácil que la palabra que define, y tiene que ser verdad fuera de este
escenario.**

Que `a spot`, `to owe someone` y `the guard at the gate` estén en las dos fichas con la misma
definición **no es desperdicio**: cada estudiante ve una sola pantalla.

| # | entrada | veredicto |
|---|---|---|
| 1 | `a spot \| one free place for one person, in a house or in a car` | ✅ el modelo del bloque |
| 2 | `to owe someone \| to have to pay money to a person, and you did not pay it yet` | ✅ |
| 3 | `ID number \| the number on the card that says who you are` | ✅ |
| 4 | `the guard at the gate \| the person at the door who checks the list` | ✅ define de paso el `gate` del término |
| 5 | `to charge someone \| to ask a person for money for something` | ✅ definición · la columna «here» falla (M-4) |
| 6 | `to fit \| to have enough space for people or things` | ✅ `space` y no `room`: el falso amigo, bien esquivado |
| 7 | `ID card \| the card with your photo and your number on it` | ✅ |
| 8 | `to give someone a ride \| to take a person somewhere in your car` | ✅ |
| 9 | `a shift \| the hours you work in one day` | ✅ idéntica al ejemplo del blueprint |
| 10 | `a hammock \| a bed you hang between two trees` | ✅ definición · la columna «here» falla (M-5) |
| 11 | `a camping mat \| a thin bed you put on the floor` | ✅ |
| 12 | `the building manager \| the person who says yes or no about the building` | ✅ |
| 13 | **`to be short`** | **medio → N-3**: la entrada sin complemento significa *ser bajo* |
| 14 | `reservation \| the owner keeps the house for you, and your name is the one she has` | **medio**: `your name is the one she has` es una pseudo-hendida, más difícil que la palabra (que además es cognado). → `…for you, with your name on it` |
| 15 | `to pay someone back \| to give back money that is not yours` | **medio**: falsa como definición (devolver un préstamo no es devolver algo ajeno). → `to give money back to the person who gave it to you` |
| 16 | `to chip in \| to put in some money, when everybody in the group puts in some` | leve: define un phrasal con otro phrasal del mismo sentido. → `to give some money, when everybody in the group gives some` |
| 17 | `the mechanic \| the person who repairs cars` | leve: `repair` es menos frecuente que `mechanic`. → `the person who fixes cars` |
| 18 | `to put someone's name down \| to write a person on a list` | leve: no es colocación posible; se escribe el nombre. → `to write a person's name on a list` |
| — | `to split the cost` · `to cover` · `last minute` · `to let someone down` · `to collect` · `to bargain` · `engine` | **faltan**, y las siete palabras están dentro de la ficha (ver G-1 y G-5) |

**Dónde meterlas.** ROLE A va con 9 filas y le cabe una: la de G-1 (`to split the cost`). ROLE B va
con 10 y está lleno, así que ahí la salida no es explicar, es **quitar la palabra difícil de la
prosa** (`two people let down` → `two people you have to say no to`; `100,000 collected from each
of them` → `each of them gave you 100,000`). Las filas de vocabulario no cuentan en el presupuesto
de prosa —el propio método de la ficha excluye las líneas que empiezan por `|`—, así que el tope
que manda aquí es el 8-10 de §11, no las palabras.

**La columna «here», que §11 marca como la más calcable de la ficha:** ninguna de las 21 celdas
contiene comillas ni empieza por pronombre + verbo conjugado. **Esa puerta pasa limpia.** Lo que
falla en cuatro de ellas es el nivel de lectura, no el calco: M-4, M-5 (×2), M-6 (×2) y N-3.

---

## 4. Los `grammarReferences`, slug a slug

**Pasa entera.** Leído el campo `slug` y el campo `title` de cada archivo de
`src/data/grammar/ingles/{a1,a2}`:

| # | nivel | slug declarado | existe | título idéntico | archivo real |
|---|---|---|---|---|---|
| 1 | a2 | `past-simple-questions` | sí | sí | `a2/past-simple-questions.ts` |
| 2 | a2 | `present-perfect-ever-never` | sí | sí | `a2/present-perfect-ever-never.ts` |
| 3 | a2 | `past-simple-irregular` | sí | sí | `a2/past-simple-irregular.ts` |
| 4 | a2 | `first-conditional` | sí | sí | `a2/first-conditional.ts` |
| 5 | a2 | `will-future` | sí | sí | `a2/will-future.ts` |
| 6 | a2 | `connectors-a2` | sí | sí | `a2/connectors.ts` — el archivo no lleva el sufijo, el `slug` interno sí |
| 7 | a1 | `there-is-there-are` | sí | sí | `a1/there-is-there-are.ts` |
| 8 | a1 | `can-ability` | sí | sí | `a1/can-ability.ts` |
| 9 | a1 | `wh-questions` | sí | sí | `a1/wh-questions.ts` |
| 10 | a1 | `prepositions-time` | sí | sí | `a1/prepositions-time.ts` |
| 11 | a1 | `imperative` | sí | sí | `a1/imperative.ts` |

Sobre el sufijo, que es la trampa del encargo: en inglés A2 lo llevan **seis** slugs
(`connectors-a2`, `past-continuous-a2`, `prepositions-movement-a2`,
`present-continuous-future-a2`, `relative-clauses-a2`, `used-to-a2`). La ficha usa uno de los seis
y lo escribe con sufijo. **Los cinco anclajes de A1 van sin sufijo, que es como existen.** Ninguna
de las once referencias devolvería `null` por `getTopicBySlug`.

**Cobertura de los exponentes.** Los 18 quedan anclados salvo `We're good, right?` y la mitad
relativa de `Wait — that's not what we said.`, que la ficha declara sin anclaje a propósito.
Comprobado: no hay tema de *question tags* entre los 21 slugs de A2 —los conté—, y
`relative-clauses-a2` trata `who/which/that`, no la relativa libre. **De acuerdo con las dos
decisiones: forzar un slug ahí sería mentir en el registro.**

**Precisión de los `rationale`:** de los once, ocho son exactos, dos flojean (M-3 y L-1, de la
pasada anterior) y uno afirma algo que no está donde dice (N-2).

---

## 5. Orden en que yo lo haría

1. **N-1**, antes que nada, porque el arreglo equivocado ya está escrito y aprobado en el informe
   anterior. Si esa tanda se aplica a ciegas, el error entra en la ficha.
2. Los cuatro graves restantes (G-1, G-3, G-4, G-5), que son cinco líneas y cinco filas de tabla.
3. M-1 y M-2, que están en las dos líneas que deciden cómo juega Valentina.
4. El resto de los medios, y las cinco filas de vocabulario de §3.
5. N-2 y N-4, que son dos frases de `rationale` y no tocan la ficha jugable.
6. N-5 y N-7, a la mesa de quien consolide el conjunto: son del blueprint y de la caja, no de este
   escenario.

**Saldo de prosa estimado si se aplica todo:** ROLE A pasa de 374 a ~394, ROLE B de 370 a ~376.
Las dos siguen siendo **las fichas más cortas del set** —la siguiente, la 6, mide 402/414—, así
que **no hay que cortar nada para pagar estos arreglos**. La pasada anterior ya lo midió y lo
confirmo con el mismo método: el problema de esta ficha nunca fue que fuera larga.
