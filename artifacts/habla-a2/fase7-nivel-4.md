# Nivel — escenario 4 · `a-charge-i-did-not-make` (ficha en inglés, versión corregida)

Auditado: `artifacts/habla-a2/fase7-fichas-4-a-charge-i-did-not-make.md` (estado del 20 ago 2026,
después de aplicar los 66 hallazgos de las cuatro auditorías de fase 7).
Contra: `artifacts/habla-a2/fase7-modelo-ficha-en.md`, `artifacts/habla-a2/caja-de-herramientas-a2.md`
y `src/data/grammar/registry.ts` (`ingles/a1`, 26 temas; `ingles/a2`, 22 temas), leídos slug a slug.

**Veredicto: pasa con cambios.**

La corrección funcionó donde más dolía. Los dos «You did it if» ya no tienen **ni una pasiva** —
había seis — y la forma prohibida (`couldn't have answered`) desapareció. El bloque de cierre
común está entero en A2. La pantalla de B, que era once líneas seguidas sin verbo, ahora tiene
verbos. En todo el archivo queda **una sola pasiva** (`those words are forbidden`) donde antes
había diez. Eso es el 80 % del problema resuelto.

Lo que queda no es residuo. Hay **una estructura prohibida viva** —`what you'd have to admit`,
`would` + `have to`, o sea condicional hipotético con modal— y está en la etiqueta de la fila de
datos que activa la carta, o sea en la pieza que decide el desenlace. Sigue el error de forma de
la auditoría anterior sin corregir: `I've never paid extra data` le falta la preposición, y viaja
al `rationale` de `present-perfect-ever-never`. Y hay una definición de vocabulario que **no es
inglés**: `in one time`.

El vocabulario nuevo está bien construido —`idle`, `to block extra data`, `an alert`, `to lend`
son definiciones modelo— pero al rehacer las tablas se perdieron glosas que la ficha necesita.
`cap` se usa **cuatro veces y su fila se borró**. `gigas`, `survey` y `bonus` nunca la tuvieron.
Y el defecto que la corrección arregló en `block` reaparece intacto en otras dos palabras:
**`form` significa dos cosas dentro de la pantalla de B**, y **`line` significa dos cosas dentro
de la pantalla de A**.

Los `grammarReferences` son lo mejor del archivo: **12 de 12 slugs existen, 12 de 12 títulos
coinciden carácter por carácter**, los cuatro con sufijo `-a2` llevan el sufijo y los que no lo
llevan no lo llevan. Ningún enlace devuelve null.

Y una cosa que no es de nivel pero bloquea el cierre del archivo: la tabla de presupuesto tiene
**`PLACEHOLDER_A` y `PLACEHOLDER_B` sin rellenar**. Contadas con el criterio que el propio
archivo declara: **A = 356 palabras, B = 467**, contra un tope de 350. B se pasa en un 33 %.

---

## Resumen por las cuatro puertas

| puerta | veredicto | lo que hay que tocar |
|---|---|---|
| 1 · inglés que se DICE | **pasa con cambios** | `paid extra data` → `paid for extra data` (sin corregir desde la auditoría anterior); 12 formas por rol donde §10 pone el tope en 10; el bloque 5 de A perdió su criterio de éxito |
| 2 · inglés que se LEE | **pasa con cambios** | 1 forma prohibida (`what you'd have to admit`), 1 pasiva, 2 pseudo-clefts, la restricción 1 de B (55 palabras sin verbo principal), y B con 467 palabras de prosa |
| 3 · vocabulario | **no pasa** | `in one time` no es inglés; `form` y `line` con dos sentidos en la misma pantalla; `cap` sin glosa y usado 4 veces; `gigas`, `survey`, `bonus` sin glosa |
| 4 · `grammarReferences` | **pasa** | 12/12 existen y 12/12 títulos coinciden; 2 rationales citan mal y falta `past-simple-irregular` |

---

## 1 · El inglés que hay que DECIR — A2 hablado

### 1.1 La ruta mínima sigue en pie

Con los tres exponentes nuevos (`In June the company changed its system, and the SMS stopped.`,
`If you give me the day and the hour, I'll block it today.`, `I'm sorry about this charge.`) el
escenario se recorre entero sin salir de A2:

| # | quién | lo que se dice |
|---|---|---|
| 1 | A | Good morning. I think there's a mistake on my bill. This bill is from August 5. There is a charge of 42,000 pesos. I didn't use this data. |
| 2 | B | Good morning. I'm sorry about this charge. Let me look. I see two blocks of usage here, not one. When did it start? |
| 3 | A | I opened this line in 2017, and I've never paid for extra data, not once. Why didn't I get a message? |
| 4 | B | The alert only works in the app. In June the company changed its system, and the SMS stopped. I can give you a credit note. A credit note is money which goes on your next bill. |
| 5 | A | *(carta)* What does that cost me? What happens with the 42,000? Can you check the days one by one? |
| 6 | B | Block one: Sunday, July 26, one to seven, six hours of video. Block two: July 21 to 24, between two and five in the morning. The phone was idle. What were you doing that afternoon? |
| 7 | A | I lent my phone to my nephew that Sunday. He is twelve. He watched soccer on the TV with my data. |
| 8 | B | Just to check — was the phone with you all month? |
| 9 | A | No. Only that Sunday. |
| 10 | B | I can do it in money or in gigas, but not both. Which one do you want? |
| 11 | A | The credit note. And the other 17,000? |
| 12 | B | If you give me the day and the hour, I'll block it today. With this plan there's no block. Which one do you want? |
| 13 | A | If you block it today, I'll sign now. And I'd like a written claim. |
| 14 | B | Your claim number is R-2208. |
| 15 | A | R-2208. |

Presente simple, pasado simple (regular, irregular y `to be`), pasado continuo, present perfect
con `never`, `can`, `will`, primer condicional, relativo con `which`, cuantificadores. **Cabe.**

Y las dos condiciones cruzadas que el `rationale` de `first-conditional` prometía **ahora
existen de verdad**, una en cada ficha. Igual el `will`: antes no había ninguno en todo el
archivo y la referencia no estaba ganada; ahora hay dos, uno por rol.

### 1.2 GRAVE — el error de forma sigue ahí

`I've never paid extra data, not once.` (línea 80)

En inglés se paga **por** algo. `pay for extra data`. Sin la preposición la frase es
agramatical, y es el exponente que sostiene los nueve años de historial de A — el argumento
entero del rol. Es el hallazgo 1.2 de la auditoría anterior, señalado como el único error de
forma del archivo, y **no se aplicó**. Además el `rationale` de `present-perfect-ever-never`
(línea 224) lo cita tal cual, así que el error también está en la referencia de gramática que
se le enseña al estudiante.

→ `I've never paid for extra data, not once.` En los dos sitios.

### 1.3 MEDIO — 12 formas por rol, no 9

El archivo declara «exponentes 9 y 9» y cuenta filas. Pero tres filas de A y tres de B llevan
dos o tres formas dentro:

- A · `your nine years` → 2 formas · `measure what they offer` → **3 formas**
- B · `put a price on what you offer` → 2 · `get the fact you're missing` → 2 (en dos filas) · `answer the missing warning` → 2

Total real: **12 formas decibles por rol**. §10 pone el tope en 6-10 precisamente para que un A2
no se ahogue, y la caja de herramientas se saca de la cuenta por lo mismo. No es un error de
nivel de lengua —las doce son A2— pero es carga de memoria por encima del tope declarado, y la
contabilidad del propio archivo la esconde.

→ o se declaran 12 y se justifica, o se pliegan dos: `And the other 17,000?` cabe dentro de
`What happens with the 42,000?` (es la misma jugada, más tarde), y en B `The alert only works in
the app.` + `In June the company changed its system…` son una sola respuesta.

### 1.4 MEDIO — el bloque 5 de A perdió el criterio que lo obligaba

El «You did it if» anterior de A tenía *«why this matters beyond money, said out loud»*. La
versión nueva **no tiene ningún criterio sobre el bloque 5** de la caja. Pero:

- la línea de la caja de A sigue pidiendo el bloque 5 (línea 72),
- y el `rationale` de `connectors-a2` (línea 228) apoya la mitad de su justificación en él:
  *«El because de la razón lo pone el bloque 5 de la caja ("It's important for me because…"),
  que es donde las simulaciones se pasaban al español»*.

O sea: la caja lo pide, la referencia de gramática lo da por hecho, y nada lo mide. En un
escenario cuyo cierre se juega en dinero, el bloque 5 es justo lo que no va a salir solo.

→ devolver un criterio a A: `You said out loud why this is important for you — and it wasn't
only the money.`

### 1.5 Lo que está limpio

Ni present perfect de duración con *for/since*, ni `could` de cortesía, ni pasiva, ni preguntas
incrustadas, ni modal + infinitivo perfecto, ni condicional hipotético, ni `would rather` /
`would prefer` en **ningún** exponente de las dos tablas. `I'd like a written claim.` es la
única forma con `'d` y es un bloque léxico de A2 estándar, no un condicional; no hay tema de
registro que la ancle, pero tampoco lo necesita.

La caja referenciada (1, 3, 5, 8, 2 y medio 4 en A; 1, 4, 3, 7, 6, 2 en B) está verificada y
limpia.

---

## 2 · El inglés que hay que LEER — A2 leído

La regla: si la instrucción no cabe en A2 leído, la instrucción es demasiado complicada. Va la
versión corta al lado.

### GRAVE — 2.1 Una forma prohibida, en la fila que activa la carta

Línea 54, tabla de datos de A:

> | If they ask · **what you'd have to admit** | nephew, 12 · Sunday July 26 · 1 to 7 p.m. · a farm, no wifi |

`you'd have to admit` = `would` + `have to` + infinitivo: **condicional hipotético con modal**,
la penúltima de la lista de prohibidas. Y `admit` es B1. Está en la etiqueta de la fila que la
carta del turno global 5 convierte en obligación —la restricción 3 de A depende de ella—, así
que si no se entiende, el desenlace del escenario se queda sin motor.

→ `| If they ask you directly · the true answer | nephew, 12 · Sunday July 26 · 1 to 7 p.m. · a farm, no wifi |`

Es la única forma prohibida que queda en todo el archivo.

### GRAVE — 2.2 La restricción 1 de B: 55 palabras, y casi ninguna con verbo

Tal cual está (línea 103):

> Over **25,000 pesos** — counter cap · above it, nobody's signature, not today. **Retention plan
> ≠ money back:** a change of plan, and it costs three things — day, hour and activity in the
> form, and the form only takes what the customer says, not what your screen says · six months
> signed · no block. One missing, no plan.

Se arregló lo que era vocabulario (`compensation` fuera, `not money back` dentro) y se dejó
intacto lo que era sintaxis. Sigue teniendo: el símbolo `≠`, cinco `·` haciendo de puntuación,
`above it, nobody's signature` sin verbo, `six months signed` (participio suelto), `One missing,
no plan` (dos elipsis en cuatro palabras), y la palabra `cap` sin glosar. Es la restricción más
importante de B y la peor escrita del archivo.

→ versión A2, en frases:

> 1. Don't give more than **25,000 pesos**. That is your limit at this counter, and nobody can
>    sign for more today. **A retention plan is not money back:** it is a different plan, and it
>    costs three things — the day, the hour and the activity in the form; six months minimum
>    term; and no block. The form only takes what the customer says, not what your screen says.
>    If one of the three is missing, there is no plan.

Sale más largo, y ahí está el problema real: ver 2.3.

### GRAVE — 2.3 La prosa de B está un 33 % por encima del tope, y la tabla no lo dice

La tabla de presupuesto tiene **`PLACEHOLDER_A palabras` y `PLACEHOLDER_B palabras` literales,
sin rellenar** (líneas 251-252). Contadas con el criterio que el propio archivo declara —todo lo
que no es tabla, título ni cita de cabecera, incluidas las etiquetas en negrita y los números de
lista—:

| ficha | declarado | contado | tope |
|---|---|---|---|
| ROLE A | `PLACEHOLDER_A` | **356** | 350 |
| ROLE B | `PLACEHOLDER_B` | **467** | 350 |

A se pasa por seis palabras: es ruido. B se pasa por **117**, y eso ya no es contabilidad. Las
dos líneas del dato oculto (80 palabras), el «You want» (63) y el «You did it if» (108) son los
tres bloques que se comieron el presupuesto. El archivo decidió, con razón, no subir el tope a
420 (hallazgo 16), pero entonces hay que quitar de B, y la reescritura de 2.2 suma. Lo que sobra
en B, en mi lectura, es la segunda mitad de la línea 109 (las cuatro reclamaciones idénticas ya
están dichas en la primera frase) y la repetición de `you want` tres veces en la línea 100.

### MEDIO — 2.4 La única pasiva que queda

Línea 109: *«Your instruction: pay up to the cap, don't argue — and **those words are
forbidden**.»*

Pasiva + `forbidden` (B1). En un archivo cuyo primer mandamiento es que no haya ninguna, y en el
dato oculto del rol que tiene que callárselo.

→ `Your boss said: pay up to your limit, and don't argue. You can't say this to the customer.`

### MEDIO — 2.5 Dos pseudo-clefts con pregunta incrustada dentro

| dónde | como está | versión A2 |
|---|---|---|
| B · You want | **What it does not have is** who had the phone and what the phone was doing | Your screen does not say **who had the phone**. It does not say **what the phone was doing**. |
| la carta | **What it is worth is** your decision. | You decide what to do with it. |

`What X is is Y` es una estructura de énfasis de B2, y aquí carga encima dos preguntas
incrustadas. El estudiante que la desmonta mal se lleva justo el dato que el escenario le está
escondiendo.

En la misma línea 100: `a way out that stops this from happening again` — `way out` es idiom y
`stop somebody from -ing` es B1. → `and you need something that stops the same bill next month`.

### MEDIO — 2.6 El dato oculto y la pérdida de A: no se tocaron

Fueron señalados en la auditoría anterior (su 2.5) y siguen igual. En la pantalla de B se
arreglaron; en la de A, no.

| dónde | como está | versión A2 |
|---|---|---|
| A · Only you know | Maybe part of the charge. How much, and what he did: you don't know yet. You don't say it first — **you think the claim dies with it**. | Maybe some of the charge is his. You don't know how much, and you don't know what he did. Don't say it first: you think that if you say it, they will say no to everything. |
| A · If you walk away with nothing | 42,000 you didn't spend, **nothing stopping next month**, and this counter again in thirty days — on **a morning off work you don't have**. | You pay 42,000 you didn't spend. Nothing stops the same bill next month. And in thirty days you come back to this counter — on another free morning, and you don't have one. |
| A · You want | **Only the money, and the same bill comes back in thirty days.** | If you only get the money, the same bill comes back in thirty days. |
| A · You can't 1 | **Nine years on that number: work, and three forms.** | That number is nine years old. You use it for work, and it is on three official forms. |
| A · You can't 2 | **Something that is not money = probably a sale.** Before any yes: the 42,000, its cost to **you**, the full answer. | If they offer something that is not money, it is probably a sale. Before you say yes you need three things: the 42,000, what it costs you, and the full answer. |
| A · You can't 3 | If they ask you **straight** | If they ask you **directly** |

`the claim dies with it` es metáfora, `nothing stopping next month` es un participio sin sujeto,
`a morning off work you don't have` apila un compuesto y una relativa, y `= probably a sale` no
tiene verbo. La restricción 3 en cambio **sí quedó bien** (`If they ask you straight — did
someone else use the phone? — you say the truth.`): solo hay que cambiar `straight` por
`directly`, que es la palabra que el A2 tiene.

### MEDIO — 2.7 La columna «what it does here» — arreglada a medias

De las 13 celdas que la auditoría anterior marcó, **8 están corregidas** (`this is a fact, not an
opinion`, `ask about the message you never got`, `explain the hard word with easy words`, `the
afternoon and the night are not the same thing`, `answer about the message that never came`,
`let them pick instead of picking for them`, `say what they lose when they say yes`, `day by day,
not one big block`). Quedan estas:

| rol | como está | versión A2 |
|---|---|---|
| A | **back to the money** every time they offer something else, and ask **the price of a gift** | Go back to the money every time they offer something else. And ask what a free thing costs you. |
| A | the yes, **in exchange for** something that starts today | You say yes, but only if something starts today. |
| A | your history in two lines, and **neither one** is a threat | your history in two lines, and they are not a threat |
| B | the uncomfortable one, softer, and still **pointing at nobody** | the hard question, in a softer way. It still doesn't accuse anybody. |
| B | **their information for something that starts today** | You give them something today, and they give you the information. |
| B (función) | **show what you're allowed to show** | show what you can show |
| B (función) | **hand over** the choice | give them the choice |

`you're allowed to` es la construcción que la auditoría anterior ya había marcado dentro de la
definición de `a cap`: se borró de allí y sobrevivió aquí.

### MEDIO — 2.8 El «You did it if» de A es un párrafo de 104 palabras

Las pasivas se fueron —eso era lo grave y está resuelto— pero el bloque sigue siendo **una sola
frase con cinco `·` dentro**, contra el de B, que sí se pasó a frases con punto. Es el bloque que
más se relee y la asimetría entre las dos pantallas no tiene motivo.

Y dentro quedan tres cosas:

- `or you said out loud that **yours** has nothing` — el antecedente de `yours` (el acuerdo, el
  trato) no aparece en ninguna parte del criterio. → `or you said out loud that your agreement
  doesn't have it.`
- `without looking **here**` — la nota de cierre del archivo (línea 302) afirma que se aplicó
  `without looking at this screen`. No se aplicó: la ficha dice `here`. Es un desajuste entre el
  archivo y su propio registro de cambios.
- `you chose **the form**, not them` — ver 3.2.

→ pasarlo a viñetas, como el de B.

### MEDIO — 2.9 La carta

> Now you know. It is not an idea any more. And you can't lie. You also have the one thing **they
> keep asking for**: the day, the hours, and what the phone was doing. **What it is worth is your
> decision.** And **if your plan was the written claim**, read that box again…

Mejoró mucho (`suspicion` fuera, la casilla citada con las mismas palabras que el exponente de
B), pero:

- `keep + -ing` es B1 → `the one thing they asked for two times`
- el pseudo-cleft, ya en 2.5
- `if your plan was the written claim` — pasado simple en la prótasis, que un hispanohablante lee
  como segundo condicional (irreal). Aquí es real y presente. → `Maybe your plan was the written
  claim. Read that box again: with you all month — yes or no?`

### LEVE — 2.10 El cierre común: dos palabras que nadie glosó

El bloque está en A2 y es el mejor arreglo del archivo. Dos palabras se quedaron fuera del filtro:

- `the **advisor** says the number` — `advisor` no es A2 y no está en ninguna de las dos tablas de
  vocabulario. Ni B se llama así en su propia ficha (se llama «behind the counter»). → `the person
  behind the counter says the number`.
- `the customer repeats it out loud, **digit by digit**` — `digit` no es A2. → `one number at a time`.
- `You finish when both of you **have said** these three things` — present perfect de futuro en
  una temporal, que es B1. → `You finish when you both say these three things out loud.`
- `Point 2 is not **decoration**` — B1, pero es un guiño para el profesor más que instrucción; lo
  dejaría.

### LEVE — 2.11 Cuatro filas de datos

Las tablas pueden ser telegráficas. Estas cuatro no se recuperan:

| como está | versión A2 |
|---|---|
| A · `connection **drops** often` | the internet stops often |
| A · `**gigas are worth more to you than they look**` | you need your data more than other people |
| B · `SMS alert: **dead since the June system change**` | the SMS alert stopped in June, when the company changed its system |
| B · `early exit **= pay it back**` | if they leave before six months, they pay the 42,000 again |

`gigas are worth more to you than they look` es comparativo + `be worth` + `than they look`: tres
piezas de B1 en siete palabras, y encima con `gigas` sin glosar (ver 3.4).

### Lo que quedó bien y no hay que volver a tocar

Los dos «You did it if» sin una sola pasiva · el bloque de cierre común entero · el «Where you
are» y el «You want» de B, con verbos · la restricción 2 y 3 de B · la línea de la caja de A
(salvo `restriction 3 wins`, que es metáfora leve) · la casilla `with you all month`, ahora
idéntica en las tres apariciones · `the afternoon and the night are not the same thing`, que
mata el `overnight`.

---

## 3 · El vocabulario, una a una

Regla aplicada: **la definición tiene que estar en inglés más sencillo que la palabra que
define**, y no puede apoyarse en una palabra que el estudiante todavía no tiene en esa pantalla.

### ROLE A

| # | palabra | definición | veredicto |
|---|---|---|---|
| 1 | a bill | the paper that says what you pay for one month | **bien** |
| 2 | a charge | money the company puts on your bill | **bien** — se apoya en `bill`, que va arriba |
| 3 | extra data | data **over** your 8 GB — your plan does not pay for it · *to share data:* to send one phone's data to another screen, like a TV | **flojo** — `over` de cantidad es B1; y son dos entradas en una fila |
| 4 | credit note | money the company puts on your next bill, not money in your hand | **bien** — arreglada |
| 5 | in cash | in paper money and coins, in your hand · *a refund in cash* = your money back that way | **bien** — arreglada, y `refund` queda glosado de paso |
| 6 | to block extra data | to stop it before it happens | **bien** |
| 7 | an alert | a short message. It tells you before something happens | **bien** — arreglada |
| 8 | a written claim | a paper. The store writes it, you sign it, and they send it to another office | **bien** — arreglada |
| 9 | minimum term | the months you can't leave after you sign | **bien** |
| 10 | to lend | to give a thing to someone for a short time | **bien** |

Nueve de diez cumplen la regla. Solo `extra data`:
→ `data you use over your 8 GB. It is not in your plan, so you pay more.`

La columna «here» sí arrastra tres:
- `in cash` → *«the form you walked in for»*: phrasal (`walk in for`) + colisión de `form` (3.2).
  → `the way you came here for — ask for it`
- `to block extra data` → *«the piece your deal has to have»*: metáfora, y `deal` no está glosado.
  → `they'll offer it — your agreement needs it`
- `extra data` → *«the line on the bill you don't accept»*: colisión de `line` (3.5).

### ROLE B

| # | palabra | definición | veredicto |
|---|---|---|---|
| 1 | a charge | money the company puts on the bill | **bien** |
| 2 | extra data | data over the 8 GB in the plan — the plan does not pay for it · *to share data:* … | **flojo** — igual que en A |
| 3 | a discount | money you take off a bill, **in one time** or in parts | **falla — no es inglés** |
| 4 | usage | the data a phone used in one month | **bien** |
| 5 | idle | on, but nobody is using it | **bien** — la mejor de las dos fichas |
| 6 | a retention plan | a cheaper plan you give so a customer stays | **bien** |
| 7 | minimum term | the months a customer can't leave **after signing** | **flojo** — gerundio; A dice `after you sign`, que es mejor. Unificar |
| 8 | a form | a paper with boxes you write in | **la definición es buena, la palabra colisiona** (3.2) |
| 9 | a written claim | a paper you write and they sign, and it goes to another office | **bien** |
| 10 | nephew | your brother's or your sister's son | **bien** |

La columna «here» de B arrastra tres más:
- `a discount` → *«**way out three** cuts the 42,000 into three bills»*: **no hay ninguna lista
  numerada de "ways out" en la ficha de B**. La referencia no apunta a nada.
  → `the retention plan cuts the 42,000 into three bills — you need the word to offer it`
- `idle` → *«it **clears** whoever had the phone»*: `clear` en sentido de exculpar es B2, y
  `whoever` es B1. → `it shows that the person with the phone did not do this`
- `a retention plan` → *«your **last card**»* y `minimum term` → *«it goes **on the table**»*: dos
  idioms seguidos. Leves, pero son la columna que explica por qué usar la palabra.

### GRAVE — 3.1 `in one time` no existe en inglés

> | a discount | money you take off a bill, **in one time** or in parts |

Es un calco directo de «de una vez». En inglés es `all at once`. Está en una **definición de
vocabulario**, que es exactamente el sitio donde el estudiante da por bueno lo que lee.

→ `money you take off a bill. You can take it off all at once, or in parts.`

### GRAVE — 3.2 `form` significa dos cosas dentro de la pantalla de B

Es el mismo defecto que la corrección arregló en `block`, sin arreglar aquí.

**`form` = papel con casillas:**
- B · vocabulario: *«a form | a paper with boxes you write in»*
- B · restricción 1: *«day, hour and activity in the form, and the form only takes what the customer says»*
- B · datos: *«day, hour and activity in the form»*
- B · vocabulario `nephew`: *«and it goes in the form»*

**`form` = manera, opción de compensación:**
- B · criterio de éxito: *«You offered two **forms**, and the customer chose.»*
- A · criterio de éxito: *«you chose the **form**, not them.»*
- A · vocabulario `in cash`: *«the **form** you walked in for»*

B lee los dos sentidos en su propia pantalla, y el segundo está en su criterio de éxito. A lee
solo el segundo, pero lo lee dos veces sin que nadie se lo defina. Y las dos «forms» que B
ofrece son la nota de crédito y las gigas — que no son formularios.

→ dejar `form` **solo** para el papel, que es donde está glosado, y usar `option` para la
elección:
- B · criterio: `You offered two options, and the customer chose.`
- A · criterio: `You chose the option. They didn't choose for you.`
- A · vocabulario `in cash` · here: `the way you came here for — ask for it`

### GRAVE — 3.3 `cap` se usa cuatro veces y su fila de vocabulario se borró

La auditoría anterior marcó la definición de `a cap` como floja (*«the most one person is allowed
to give»*, pasiva). Se resolvió **borrando la fila**, no arreglando la definición. Pero la
palabra sigue en la ficha, cuatro veces y en cuatro sitios distintos:

- restricción 1 de B: `counter cap`
- datos de B: `Your cap | up to 25,000 pesos`
- dato oculto de B: `pay up to the cap`
- columna «what it does here» de B: `mark the limit without naming your cap`

`cap` no es A2 y ahora no está glosada en ninguna parte. Encima el criterio de éxito de B ya usa
la palabra fácil: *«You kept your **limit**»*.

→ dos salidas, las dos válidas: (a) devolver la fila con definición A2 —`the biggest amount you
can give`— o (b) cambiar las cuatro apariciones a `limit`, que es la palabra que el criterio de
éxito ya usa y que A2 sí tiene. Recomiendo (b): ahorra una fila de vocabulario, que es lo que
falta.

### MEDIO — 3.4 Tres palabras que mandan y no están glosadas

| palabra | dónde manda | por qué hace falta |
|---|---|---|
| **gigas** | exponente de B (`in money or in gigas`), restricción 2 de B, punto 1 del cierre común, y datos de A (`gigas are worth more to you`) | A tiene que **elegir entre dinero y gigas** sin que nadie le diga qué es una giga aquí, y la palabra está en su propia tabla de datos y en el bloque de cierre que los dos leen |
| **a survey** | dato oculto de B, y la pérdida de B | es el motor entero del rol B — su bono depende de ella — y aparece tres veces sin explicación |
| **a bonus** | lo mismo | `Your bonus depends on that survey` es la frase que hace que B quiera cerrar hoy |

`gigas` es la urgente: es la única de las tres que alguien tiene que **decir en voz alta**, y
está en el cierre común. → `gigas | the data in your plan. 8 GB = eight gigas | you can take the
money back in gigas instead of pesos`.

`survey` y `bonus` solo se leen, pero se leen en el bloque que decide qué quiere B, y ninguna de
las dos es A2 leído. Si no cabe fila —y en B no cabe, ver 2.3— se pueden desactivar por
redacción: `When they leave, the customer gets a short list of questions about you. Your extra
money at the end of the month depends on those answers.`

### MEDIO — 3.5 `line` significa dos cosas dentro de la pantalla de A

**`line` = línea telefónica:** restricción 1 (`Cancel the line`), datos (`Your line | opened in
2017`), exponente (`I opened this line in 2017.`).
**`line` = renglón de la factura:** vocabulario `extra data`, columna «here» (*«the line on the
bill you don't accept»*), y en B (*«the line they're fighting»*).

Es la misma palabra en la misma tabla, y el sentido de «renglón» aparece **solo** en la columna
que explica el vocabulario, o sea sin apoyo ninguno.

→ en los dos sitios, `charge`, que ya está glosada y es la palabra del escenario:
- A: `the charge on the bill you don't accept`
- B: `the charge they're fighting — you have to say what it means`

### 3.6 `block` — verificado, resuelto

La solución del hallazgo 35 (barrera siempre en verbo, tramo siempre en sustantivo **con
cualificador**) funciona: `to block extra data` / `I'll block it today` frente a `two blocks of
usage` / `I see two blocks of usage here, not one`. Las tres capas —exponente, criterio de éxito
y vocabulario— dicen lo mismo. Queda un cabo: `usage` está glosada solo en B, y A tiene que
repetirla de vuelta («the customer said it back to you»). Es aceptable: A lleva el bloque 3
`[receives]` y B lleva el 4 `[jargon]`, o sea que la reparación está diseñada. Solo conviene que
la columna «here» de `usage` en B lo diga: *«the word you need to say the numbers — and they
won't know it»*.

---

## 4 · `grammarReferences` — slug a slug contra el registro

Verificado contra `src/data/grammar/registry.ts` → `ingles/a1` (26 temas) e `ingles/a2` (22
temas), leyendo el campo `slug` y el campo `title` de cada archivo.

**Los doce slugs existen y los doce títulos coinciden carácter por carácter.**

| # | slug | nivel real | existe | título coincide |
|---|---|---|---|---|
| 1 | `wh-questions` | A1 | sí | sí |
| 2 | `past-simple-questions` | A2 | sí | sí |
| 3 | `past-continuous-a2` | A2 | sí | sí |
| 4 | `past-simple-be` | A2 | sí | sí |
| 5 | `present-perfect-ever-never` | A2 | sí | sí |
| 6 | `relative-clauses-a2` | A2 | sí | sí |
| 7 | `connectors-a2` | A2 | sí | sí |
| 8 | `first-conditional` | A2 | sí | sí |
| 9 | `quantifiers` | A2 | sí | sí |
| 10 | `will-future` | A2 | sí | sí |
| 11 | `past-simple-regular` | A2 | sí | sí |
| 12 | `can-ability` | A1 | sí | sí |

**Los cuatro casos del sufijo están bien resueltos.** En el registro, tres de los temas de esta
lista viven en archivos sin sufijo pero declaran slug **con** sufijo — `past-continuous.ts` →
`past-continuous-a2`, `relative-clauses.ts` → `relative-clauses-a2`, `connectors.ts` →
`connectors-a2` — y la ficha los escribe con sufijo. Los otros nueve no lo llevan en el registro
y tampoco aquí. **Ningún enlace devuelve null.**

Y la corrección cerró los dos huecos reales de la auditoría anterior: `wh-questions` entró (las
wh de presente que sostienen el escenario ya no estaban huérfanas) y `will-future` dejó de citar
frases inexistentes, porque ahora hay dos `will` de verdad en la ficha.

Verifiqué las trece frases citadas en los rationales contra el texto de la ficha. **Once
aparecen literalmente.** Dos no:

### MEDIO — 4.1 `present-perfect-ever-never` cita el error de forma

Cita `"I've never paid extra data, not once"`, que es lo que la ficha dice y es agramatical
(§1.2). El rationale es correcto en lo demás —explica bien que es la salida al `since`/`for` de
duración, que sería B1— pero propaga el error a la página de gramática.

→ arreglar los dos a la vez: `I've never paid for extra data, not once.`

### MEDIO — 4.2 `past-simple-regular` cita algo que la carta no dice

> *«y el consumo, con pasado simple: la carta dice que el sobrino vio soccer toda la tarde»*

La carta **no dice ninguna frase en pasado simple**. Dice una tabla: `What Brayan did | the TV ·
your mobile data, not wifi · soccer`. Son sustantivos. La única forma de pasado regular que
existe de verdad en la ficha es `I opened this line in 2017` — que el rationale ya cita, y que
basta.

→ cortar la segunda mitad del rationale, o meter la frase: si se quiere que el estudiante diga
`He watched soccer all afternoon`, tiene que estar en algún sitio.

### MEDIO — 4.3 Un hueco de cobertura: `past-simple-irregular`

El exponente con el que A entrega el dato que decide el escenario es
**`I lent my phone to my nephew that Sunday.`** — pasado irregular. Y la ruta mínima necesita
además `got`, `did`, `was`, `had`. El registro tiene `past-simple-irregular` (A2) y la lista no
lo referencia, mientras sí referencia `past-simple-regular`, que solo cubre `opened`.

→ añadir `{ slug: 'past-simple-irregular', title: 'Past Simple Verbos Irregulares en Inglés A2', … }`.
Slug y título verificados en `src/data/grammar/ingles/a2/past-simple-irregular.ts`: existen así,
sin sufijo.

### LEVE — 4.4 El `because` de `connectors-a2` se apoya en algo que ya no se mide

La mitad del rationale delega en el bloque 5 de la caja. Ver §1.4: la ficha ya no tiene ningún
criterio de éxito que obligue a usarlo. La referencia se sostiene igual por el `but` del
mostrador, que sí está; pero si se devuelve el criterio de A, se sostienen las dos mitades.

### LEVE — 4.5 `there-is-there-are` sin referencia

`I think there's a mistake on my bill.` es el exponente con el que A **abre el escenario**, y
`With this plan there's no block.` es de B. El tema existe en A1 —slug `there-is-there-are`,
título «There is / There are en inglés A1», verificado— y no está en la lista. Doce
referencias ya son muchas; lo anoto por si se prefiere cambiar `can-ability` (A1, y el uso de la
ficha es permiso y ofrecimiento, no habilidad) por esta.

---

## 5 · Qué hay que tocar, por orden

1. **`what you'd have to admit`** (2.1). Es la única forma prohibida viva y está en la fila que
   activa la carta.
2. **`I've never paid for extra data`** (1.2 y 4.1), en el exponente y en el rationale. Es el
   único error de gramática del inglés hablado y viene sin corregir de la auditoría anterior.
3. **`in one time` → `all at once`** (3.1). Una definición de vocabulario que no es inglés.
4. **`form`: dejarlo solo para el papel, `option` para la elección** (3.2), en los dos criterios
   de éxito y en la columna «here» de A.
5. **`cap` → `limit`** en las cuatro apariciones (3.3), o devolver la fila de vocabulario.
6. **Reescribir la restricción 1 de B** (2.2) y **quitar 117 palabras de la prosa de B** (2.3).
   Van juntos: la reescritura suma y el tope es 350.
7. **Rellenar `PLACEHOLDER_A` y `PLACEHOLDER_B`** con el conteo real (356 y 467), y volver a
   medir después de 6.
8. **Glosar `gigas`** (3.4) — está en el cierre común y hay que decirla. `survey` y `bonus`,
   por redacción si no cabe fila.
9. **`line` → `charge`** en los dos sitios donde significa renglón (3.5).
10. **Los cuatro bloques de prosa de A que no se tocaron** (2.6): dato oculto, pérdida, «You
    want» y las restricciones 1 y 2.
11. **La pasiva `those words are forbidden`** (2.4) y **los dos pseudo-clefts** (2.5).
12. **Devolver a A el criterio del bloque 5** (1.4) y **añadir `past-simple-irregular`** (4.3).
13. Los LEVE: `advisor`, `digit by digit`, `have said` del cierre común (2.10); las cuatro filas
    de datos (2.11); la columna «what it does here» que quedó a medias (2.7); y pasar el «You did
    it if» de A a viñetas, como el de B (2.8).
