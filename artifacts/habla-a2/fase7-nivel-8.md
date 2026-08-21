# Escenario 8 · `cancel-the-gym-i-am-leaving` — auditoría de NIVEL (versión en inglés)

Auditado: `artifacts/habla-a2/fase7-fichas-8-cancel-the-gym-i-am-leaving.md` (330 líneas).
Contra: §4 y §11 de `docs/habla-acompanado-blueprint.md`, el molde
`artifacts/habla-a2/fase7-modelo-ficha-en.md`, la caja `artifacts/habla-a2/caja-de-herramientas-a2.md`
y `src/data/grammar/ingles/{a1,a2}` para los slugs.

> La vuelta anterior queda guardada en `artifacts/habla-a2/fase7-nivel-8-ronda2.md`. Esta auditoría
> se hizo sobre el archivo entero desde cero, no sobre aquel informe: coincide en algunas cosas y
> no en otras, y donde no coincide es porque el hallazgo es nuevo o porque el anterior daba por
> cerrado algo que sigue abierto (el presupuesto, señaladamente).

La ficha está entera en inglés, así que se auditan **tres cosas donde antes había una**:

1. el inglés que el estudiante tiene que **decir** — A2 hablado, con lista de prohibidas;
2. el inglés que tiene que **leer** — A2 leído, que aguanta un poco más;
3. las **20 entradas de vocabulario** (10 por rol), **una a una**: cada definición tiene que estar
   en inglés más fácil que la palabra que define.

**VEREDICTO: PASA CON CAMBIOS.**

La mitad hablada está limpia, y no lo digo a ojo: los dieciocho exponentes pasan la lista negra
por patrón sobre el archivo entero, y los doce anclajes de gramática existen los doce, con nivel
y título carácter por carácter. **Los fallos están todos en las dos piezas nuevas** — la prosa que
hay que leer y el bloque de vocabulario — y en la puerta que se entregó abierta.

**Seis graves, ocho medios, once leves. Ninguno toca el motor** (conflicto, asimetría, carta,
cierre y `grammarReferences` se quedan como están).

---

## 0 · Lo que pasa limpio, y conviene no romper

**Estructuras prohibidas en el inglés hablado: cero.** Buscadas por patrón, no leídas por encima:

| prohibida | en los 18 exponentes | en el cuerpo de las fichas (L27-210) |
|---|---|---|
| present perfect de duración con `for` / `since` | **0** | **0** |
| `could` de cortesía | **0** | **0** (la única aparición está en un `rationale`, explicando que no se usa) |
| `would` / `would rather` / `would prefer` | **0** | **0** |
| pasiva `be` + participio | **0** | **1** — línea 74, ver M3 |
| modal + infinitivo perfecto | **0** | **0** |
| condicional hipotético (2.º) | **0** | **0** — todos los `if` son de primero |
| pregunta incrustada | **0** | 2 fragmentos nominales, ver M5 |

**Los 18 exponentes, uno a uno: los 18 son A2.** `So I have to…?`, `I'm leaving on…`,
`I don't want to pay for…`, `Is there any other way?`, `What will happen if…?`,
`I know it's not your fault, but…`, `I can show you, but I can't leave it.`, `Let me copy that.`,
`So it's …, on the …?` · `Has this person ever been a member here?`,
`Write the number down, please: …`, `I have to be careful, because…`, `I can't do that, but I can…`,
`I need a paper that says…`, `Let me check that. One moment, please.`, `Can you sign here, please?`,
`I know, and I'm sorry.`, `That's not enough — it doesn't say…`. Ninguno pide una estructura que
un A2 no haya visto. El único phrasal separable (`write the number down`) lleva **sustantivo** en
medio, no pronombre, que es lo que prohíbe la caja.

**Los 12 `grammarReferences` existen los 12, con el nivel correcto y el título exacto.** Verificado
slug a slug contra `src/data/grammar/ingles/{a1,a2}`:

| slug | archivo | nivel en el registro | título coincide |
|---|---|---|---|
| `have-to-must` | `a2/have-to-must.ts` | A2 | sí |
| `first-conditional` | `a2/first-conditional.ts` | A2 | sí |
| `relative-clauses-a2` | `a2/relative-clauses.ts` | A2 | sí |
| `present-perfect-ever-never` | `a2/present-perfect-ever-never.ts` | A2 | sí |
| `connectors-a2` | `a2/connectors.ts` | A2 | sí |
| `present-continuous-future-a2` | `a2/present-continuous-future.ts` | A2 | sí |
| `can-ability` | `a1/can-ability.ts` | A1 | sí |
| `present-simple-questions` | `a1/present-simple-questions.ts` | A1 | sí |
| `present-simple-negative` | `a1/present-simple-negative.ts` | A1 | sí |
| `imperative` | `a1/imperative.ts` | A1 | sí |
| `prepositions-time` | `a1/prepositions-time.ts` | A1 | sí |
| `there-is-there-are` | `a1/there-is-there-are.ts` | A1 | sí |

**El sufijo `-a2` está bien manejado, que es donde se cae este set.** Lo llevan los tres que el
registro escribe así (`relative-clauses-a2`, `connectors-a2`, `present-continuous-future-a2`) y no
lo llevan los que no (`have-to-must`, `first-conditional`, `present-perfect-ever-never`). Si se
invirtiera cualquiera de los seis, `getTopicBySlug` devolvería `null` sin que nada se ponga rojo.

**Las citas de los `rationale`: 11 de 12 apuntan a algo que existe de verdad.** Comprobadas contra
la ficha y contra la caja. La que falla es `prepositions-time` (ver L5).

**Variedad americana: sostenida.** `business days` (×3), `a round-trip ticket`, `a one-way ticket`,
`in line`, `gym`, `member`. Los tres britanismos que quedan en el archivo (`direct debit`,
`working days`, `return ticket`) están **solo** en las notas de corrección, explicando que se
quitaron. En el cuerpo de las fichas: cero.

**Los topes de forma del §11: cumplidos.** Datos 10 filas + 10 filas · vocabulario 10 + 10 ·
exponentes 9 + 9 · 8 turnos por rol y 8 minutos, dentro de la banda A2 del §4 (6-9 turnos, 5-8 min).

**La regla de la asimetría del léxico se cumple.** El mismo objeto entra por lados distintos:
`one way` en el vocabulario de Tatiana, `a round-trip ticket` / `a one-way ticket` en los datos de
Milena. No hay ni una fila repetida entre los dos bloques.

**La lógica de la carta cuadra.** Arranca A → turno 1 Tatiana, 2 Milena, 3 Tatiana (su segundo),
4 Milena juega la carta. La cabecera lo dice bien. El problema de la carta es de redacción, no de
aritmética (M4).

---

## 1 · GRAVES — seis

### G1 · `one way` significa dos cosas distintas, las dos en negrita, y las dos en el criterio de éxito

Es el peor de todos porque no se ve leyendo: se ve contando.

| línea | qué dice | qué significa |
|---|---|---|
| 48 | «Ticket bought, in your name. August 30. **One way.**» | un tipo de tiquete |
| 64 | «Your flight · ticket bought, in your name, **one way**» | un tipo de tiquete |
| 77 | vocabulario: `one way` — *a ticket that takes you there and not back* | un tipo de tiquete |
| 102 | «**one** way, and what you need for it» | **una opción de dos** |
| 181 | «**one** way, and what it needs» | **una opción de dos** |
| 206 | «Which way she tries first… **One way, not two.**» | **una opción de dos** |

Y encima el escenario entero está construido sobre la segunda acepción: `way one` / `way two` en
las celdas `here` de Milena (154, 155), `Is there any other way?` como exponente (94),
`ask for another way out` como etiqueta de función. Un A2 que acaba de aprender en el glosario que
`one way` es un tiquete lee «**one** way, and what you need for it» en su criterio de éxito y
entiende *el tiquete de ida*. La ficha se lo ha enseñado ella misma.

Hay un segundo defecto en la misma fila: la entrada es `one way` y la definición empieza por
*a ticket*, o sea que define un sustantivo con la cabecera de otra cosa.

**Arreglo, mínimo y suficiente:** la entrada pasa a **`a one-way ticket`** — *a ticket that takes
you there and not back*. Con eso desaparece la colisión (nadie confunde «a one-way ticket» con
«one way» = una opción), se alinea con `a one-way ticket` que Milena ya tiene en sus datos (140), y
se arregla de paso la falta de guion (L1). En los datos de Tatiana: `**one way**` → `**one-way**`.

### G2 · `a cancellation` se define con `for good`, que es más difícil que la palabra

> Línea 152: `| a cancellation | the end of a plan, for good | … |`

`for good` es un modismo que significa *para siempre*, y es opaco: no se deduce ni de *for* ni de
*good*, y un hispanohablante que lo lea palabra por palabra entiende *para bien*. `cancellation`,
en cambio, es transparente desde el español. **La definición es más difícil que el término.** Es
exactamente el fallo que esta auditoría busca, y es el único de los veinte que lo comete dentro de
la propia columna `what it is`.

**Arreglo:** `the end of a plan — it does not come back`. Seis palabras, todas A1, y conserva el
matiz de definitivo, que es lo que la fila necesita para oponerse a `to freeze a membership`.

### G3 · El presupuesto se entregó abierto — y, contado con la regla del propio archivo, no pasa

La tabla de la línea 279 dice `PENDIENTE_A`, `PENDIENTE_B`, `PENDIENTE_C`. No es un detalle de
maquetación: es la única puerta del §11 que la ficha no puede pasar sola, y se entregó sin cerrar.

La conté con la regla escrita en el propio archivo (prosa sí, tablas no, fechas y cifras cuentan):

| ficha | prosa | tope | pasa |
|---|---|---|---|
| ROLE A — Tatiana | **380** | ≤ 350 | **no, +30** |
| ROLE B — Milena | **396** | ≤ 350 | **no, +46** |
| La carta | 97 | fuera de la ficha | — |

Desglose, por si hay que recortar con criterio y no a bulto:

| bloque | A | B |
|---|---|---|
| cabecera (2 líneas de cita) | 28 | 26 |
| situación | 17 | 28 |
| objetivo | 16 | **52** |
| «not about money» | 18 | — |
| restricciones | 47 | 55 |
| permiso | 19 | — |
| **dato oculto** | **111** | **114** |
| si te vas sin nada | 26 | 20 |
| línea de la caja | 34 | 46 |
| criterio de éxito | 64 | 55 |

**Dónde está el sobrante, con nombre:** el dato oculto se lleva 111 y 114 palabras, casi un tercio
de cada ficha. En A, la viñeta de `Wilmer` (47) y la de `Yurany` (52 con la del pasaporte) dicen en
prosa cosas que ya están en la tabla de datos. En B, el objetivo son 52 palabras con cuatro puntos
numerados, cuando tres de los cuatro caben en tres palabras cada uno.

**Y hay un defecto en el instrumento, no solo en el número.** El comando que el archivo publica
como reproducible (línea 273) usa `[-0-9]\+`, que es sintaxis GNU. En el macOS donde se escribió,
`sed` es BSD y **no** soporta `\+` en expresión básica: el patrón no casa, los marcadores de lista
`1.` `2.` `3.` sobreviven y se cuentan como palabras. Con el comando tal cual sale **383 / 403**;
con `\{1,\}`, que es lo portable, sale **380 / 396**. La diferencia es exactamente el número de
ítems numerados de cada ficha (3 y 7). Un presupuesto que no se puede recalcular en la máquina
donde se escribió no es una puerta, es un adorno.

**Arreglo:** cambiar `\+` por `\{1,\}` en el bloque `bash`, y rellenar la tabla con 380 / 396 / 97
**después** de recortar. Hay que quitar ~30 palabras a A y ~46 a B, y el sitio evidente son las
dos viñetas de dato oculto y el objetivo de B.

### G4 · `line` lleva cinco significados en once apariciones, y dos de ellos son de carga

| significado | dónde |
|---|---|
| la fila de gente | «Four in line» (111) · «four people in line» (137) |
| **el límite que no se puede cruzar** | **título del rol B** (106) · «without crossing the line» (113) · «the line you can't cross» (153) · «why that line costs you» (172) |
| ¿fila? ¿límite? — no se sabe | «paperwork, and a line» (126) |
| espera al teléfono | etiqueta de función «hold the line» (175) |
| un renglón de un papel | «point at the missing line, not at the whole paper» (178) |

Las dos primeras acepciones conviven **en la misma pantalla de Milena**: su título dice que hay una
línea que no puede cruzar y su primera línea de situación dice que hay cuatro personas en la fila.
La quinta («the missing line») es la que más duele, porque aparece en un exponente que Milena
**dice en voz alta** para rechazar un papel, y ahí `line` ya no es ni la fila ni el límite.

**Arreglo (tres sustituciones, ninguna toca el motor):**
- 126: `paperwork, and a line.` → `paperwork, and a wait.`
- 175, etiqueta: `hold the line` → `slow it down`
- 178: `point at the missing line` → `point at the missing date` — que además es más exacto: lo que
  falta en el papel de Tatiana son las dos fechas, y así lo dice la fila «Proof that works».

Con eso `line` se queda en dos sentidos, el límite y la fila, que es lo máximo que aguanta un A2.

### G5 · Cinco metáforas opacas, y todas cargan peso — cuatro de las cinco, en el rol de Milena

| línea | metáfora | qué se supone que significa |
|---|---|---|
| 126 | «real, and **not on the board**» | no se anuncia, no está en la lista |
| 155 | «way two · **not on her map**» | ella no sabe que existe |
| 154 | «way one · **in her ear**, a cancellation» | para ella suena a cancelación |
| 157 | «then **out of your hands**» | ya no depende de ti |
| 27, 52 | «the plan **is still running**» | el plan sigue activo |

Ninguna está en el vocabulario, ninguna se deduce, y las dos primeras dicen **lo mismo** con dos
imágenes distintas (un tablero y un mapa) a nueve líneas de distancia. `is still running` es la
peor colocada de las cinco: está en el **título del rol A**, la primerísima línea que lee Tatiana,
y `run` para un A2 es *correr*.

**Arreglo, uno por uno:**
- 27, título: `…and the plan is still running` → `…and you are still paying`. Es más corto, es
  literal, y dice exactamente el conflicto.
- 52: `the plan is still running` → `you are still paying`.
- 126: `real, and not on the board` → `real, and she can't see it`.
- 155: `not on her map` → `she doesn't know it exists`.
- 154: `in her ear, a cancellation` → `she hears the word cancellation`.
- 157: `then out of your hands` → `then nobody here can stop it` — que además dice lo mismo que la
  carta («after that: nobody here») y refuerza en vez de repetir.

### G6 · `proof` sostiene el rol de Milena entero y no está en su vocabulario

Aparece **ocho veces** y en **cuatro de sus diez filas de datos**: «Proof that works» (139),
«Proof that doesn't» (140), «A freeze · with proof» (141), «no proof needed» (143), «proof with
both dates» (144), y en las restricciones (121) y en el dato oculto (128). Y también en la ficha de
Tatiana (47: «No proof»).

La prueba de selección del §11 es literal: *¿puede este rol llegar al cierre sin esta palabra?*
Milena no puede — la mitad de sus turnos consisten en explicar qué papel sirve y cuál no. La
palabra no es transparente: `prueba` en español es primero *examen* y luego *evidencia*, y aquí
sólo vale la segunda. Es la única del oficio que la escena exige y que el bloque no cubre.

Mientras tanto, `retention / to authorize` ocupa una fila con **dos** entradas apretadas, y
`retention` es precisamente jerga que **Milena produce** y que puede glosar con el bloque 4 de la
caja (`In other words, …`), que es lo que la propia cabecera del archivo dice que tiene que poder
hacer. Es la fila más prescindible del bloque.

**Arreglo:** `retention / to authorize` sale y entra:

> `proof` — *a paper that shows something is true*

Se queda en 10 filas, no se toca el tope, y `retention` sigue viva en los datos (146) y en la línea
de la caja (164), que es donde le toca. Si se prefiere no sacar `retention`, la que sobra es
`the visit log`, que la fila «Open a case today» ya describe entera.

---

## 2 · MEDIOS — ocho

### M1 · Sentidos difíciles de palabras fáciles: `take`, `count`, `go`, `have … wrong`

Aparte de `run` (que va en G5), hay cuatro verbos de A1 usados en una acepción que no es la de A1:

| línea | uso | qué significa | arreglo |
|---|---|---|---|
| 122 | «The form **takes** a reason, not a destination» | exige, admite | `The form needs a reason, not a destination.` |
| 158 | `a cut-off` — «the last moment a change can still **count** for this month» | valer | `the last moment to make a change for this month` |
| 161 | `the visit log` — «the book where every visit **goes**» | se anota | `the book with every visit to the counter, with a name and a signature` |
| 197 | «one office day that you may still **have wrong**» | sobre el que puedes estar equivocado | `one office day — and yours may be the wrong one` |

Las dos del medio están **dentro de definiciones de vocabulario**, que es donde menos se puede
gastar una acepción rara: la fila existe para quitar una dificultad, no para meter otra.

### M2 · Cinco cláusulas de participio reducido, todas en la ficha de Milena

| línea | fragmento |
|---|---|
| 125 | «**The case, opened today: the date, fixed.**» |
| 128 | «for a freeze **filed** with no proof» |
| 129 | «promises **made** to close a sale» · «not the only seller **doing** it» |
| 164 | «an ID and a reason **copied** by ear» |

El §11 pide «frases cortas, presente y pasado simple, cero subordinación larga». Un participio
reducido no es subordinación larga, pero **es la construcción que un A2 no ha visto** y aquí van
cinco seguidas en el bloque de información oculta, que es justo el que hay que leer bien porque no
se puede volver a él sin dejar de mirar a la otra persona. La 125 es doble: dos absolutas
encadenadas en once palabras.

**Arreglo:**
- 125: `**The case, opened today: the date, fixed.**` → `**Open the case today, and the date does not move.**`
- 128: `for a freeze filed with no proof` → `for a freeze with no proof`
- 129: `promises made to close a sale` → `he promised things, to close a sale` · `and not the only seller doing it` → `and he was not the only one`
- 164: `an ID and a reason copied by ear` → `an ID and a reason, and you copy them by ear`

### M3 · La única pasiva del cuerpo está en una definición de vocabulario

> Línea 74: `| to renew | … | your plan, on the 5th, **if nothing is written** · 92,000 more |`

Es la única `be` + participio de las líneas 27 a 210, verificado por patrón incluyendo participios
irregulares. La pasiva está en la lista negra y aquí no hace falta para nada.

**Arreglo:** `your plan, on the 5th, **with nothing in writing** · 92,000 more`. Además reutiliza
`in writing`, que Tatiana tiene glosado tres filas más abajo: la ficha se refuerza a sí misma en
vez de gastar una estructura prohibida.

### M4 · En la pantalla de la carta, «She opens here» apunta a la persona equivocada

> Línea 185: `## The card — **Milena's** screen only`
> Línea 187: «**She** opens here, so turn 3 is her second one and you play the card on turn 4.»

La aritmética es correcta, pero el antecedente más cercano de `she` es **Milena**, que es de quien
habla el encabezado dos líneas antes — y `she` aquí es **Tatiana**. Milena está leyendo su propia
pantalla, y la frase le dice que ella abre cuando quien abre es la otra. Es un turno de conflicto
por una palabra.

**Arreglo:** `**Tatiana** opens here, so turn 3 is her second one and you play the card on turn 4.`

Y en la misma pantalla, línea 189: «he finally answers **the one you sent** at the start» — `the one`
sin antecedente en esa pantalla (el mensaje que ella mandó no se menciona antes). → `he finally
answers your message from the start.`

### M5 · La etiqueta «Where he is» se responde con un día

> Línea 195: `| Where he is | **not Thursday — inventory count** · **Wednesday, 9 to 5, second floor** |`

La pregunta es *dónde* y la respuesta empieza por *cuándo*. En una tabla de cuatro filas que se lee
en diez segundos a mitad de conversación, eso cuesta una relectura entera. Y es el dato que Milena
tiene que pasar en voz alta con día, hora y piso.

**Arreglo:** `| When you can find him | **not Thursday — inventory count** · **Wednesday, 9 to 5, second floor** |`

También hay dos preguntas incrustadas en forma de sintagma nominal, que se leen pero no se dicen:
«**and which way she tries first**» (117) y «**Which way she tries first**, and what she has to
bring» (206). Son fragmentos de lista, no oraciones, y en A2 leído pasan — pero si se toca la 206,
la versión corta es `Her first choice, and what she has to bring.`

### M6 · La frase que cierra el juego tiene 34 palabras y tres cláusulas coordinadas

> Línea 203: «**It ends when Tatiana signs the visit log, Milena says the case number and the date
> out loud, and Tatiana repeats them back to check she copied them right.**»

Es la instrucción más importante del archivo —es la que dice cuándo se para— y es la más larga:
un `when` con tres sujetos distintos, un infinitivo de finalidad y una completiva sin `that`
dentro. Choca de frente con «cero subordinación larga» del §11.

**Arreglo, tres frases cortas:**

> **Three things end it. Tatiana signs the visit log. Milena says the case number and the date out
> loud. Tatiana says them back.**

Y en la 209, `That last repeat ends the game` → `That is the end of the game` (`repeat` como
sustantivo no es A2 y además no es lo que un nativo diría aquí).

### M7 · El vuelo del 30 y la cita del 3 no se pueden conciliar leyendo la ficha

| línea | dato |
|---|---|
| 63 | Cita: **3 de septiembre**, Bogotá · pasaporte 10-15 días hábiles **después** |
| 64 | Vuelo: **30 de agosto** · tiquete comprado, a su nombre, **one way** |
| 50 | **No return date** |

Con el título del rol («You're leaving»), la promesa de Wilmer («leaves the country → they cancel
it») y el bloque de pruebas de Milena, la lectura natural es que Tatiana **sale del país el 30 de
agosto**. Pero entonces no puede estar en Bogotá el 3 de septiembre, y su pasaporte llega quince
días hábiles después de una cita a la que no fue. La lectura que sí cuadra —el 30 se va de
Bucaramanga a Bogotá, y del país sale más tarde— **no está escrita en ninguna parte**, y la ficha
le prohíbe a Tatiana decir su destino, así que tampoco se resuelve hablando.

No es un fallo del motor: es que la fila no dice de dónde sale el vuelo. Se arregla con dos
palabras y **sin** revelar el destino, que es lo que el diseño protege.

**Arreglo:** `| Your flight | **August 30**, **out of Bucaramanga** · ticket bought, in your name, one-way |`

### M8 · `retention / to authorize`: dos entradas en una fila, y dos relativas encajadas

> Línea 156: `| retention / to authorize | the people who talk to members who want to leave · to say
> yes officially, and only some people in a company can | … |`

Tres problemas en una celda: (a) son dos palabras distintas compartiendo fila, y el §11 cuenta
entradas, no filas; (b) `the people who talk to members who want to leave` mete **dos relativas
encajadas**, y es la definición más subordinada de las veinte — para definir la palabra menos
necesaria; (c) `and only some people in a company can` es una elipsis que acaba en un modal
desnudo, que es lectura de B1.

Si se aplica G6, la fila desaparece y esto se cierra solo. Si se decide conservarla, la versión
corta es: `retention` — *the people who talk to a member who wants to leave*, y `to authorize` sale
del bloque y se queda solo en la línea de la caja.

### M9 · El anclaje `imperative` es más flaco de lo que dice su `rationale`

El `rationale` (línea 246) le atribuye tres exponentes —`Let me say that again.`,
`Let me check that. One moment, please.`, `Let me copy that.`— y lo llama «la mitad de la
reparación que faltaba entera». Comprobado el tema en `src/data/grammar/ingles/a1/imperative.ts`:
lo que enseña es **`let's` + verbo** (propuesta que incluye al hablante: *Let's go*, *Let's eat*,
*Let's not waste time*). La estructura `Let me` + verbo aparece **una sola vez** en todo el tema, y
dentro de un ítem cuya pregunta es dónde va `please` (`Please let me sit here`).

No es un slug inexistente ni un nivel equivocado: el anclaje **existe y es A1**. Pero la reparación
del escenario 8 —que es la que el archivo declara como pieza clave— se apoya en una forma que el
tema roza de pasada.

**Arreglo (elegir uno):**
- **a)** dejarlo, y bajar el tono del `rationale`: la forma vive en el bloque 4 de la caja, y el
  anclaje aporta el imperativo, no el `let me`. Es lo honesto y no cuesta nada.
- **b)** añadir cobertura de `Let me + verbo base` al tema A1 — pero eso es tocar
  `src/data/grammar/`, fuera del alcance de esta ficha, y afecta a los otros siete escenarios.

Recomiendo **(a)**. Es una línea de `rationale`, no un cambio de contenido.

---

## 3 · LEVES — once

| # | dónde | qué | arreglo |
|---|---|---|---|
| L1 | 48, 64, 77 | `one way` sin guion en la ficha de A, `a one-way ticket` con guion en la de B (140) | unificar en `one-way` (se resuelve con G1) |
| L2 | 74, 75 | `to renew` y `to bounce` son verbos definidos con «when a plan…» / «when the bank…» | «to start again by itself, for one more month» / «to fail, so the money does not leave your card» |
| L3 | 78 | `days when offices open` | `days when offices are open` |
| L4 | 80 | la fila es `a charge / to charge someone` y sólo define el sustantivo | o se define el verbo, o la fila se queda en `a charge` |
| L5 | 248 | el `rationale` de `prepositions-time` cita `on July 13`, `on September 3`, `at six p.m.`, `from nine to five` — **ninguna de las cuatro cadenas aparece en la ficha**: los datos van sin preposición (`signed July 13`, `September 3, Bogotá`, `9:00 a.m.–5:00 p.m.`) | es el único de los doce que incumple la regla que el propio archivo se puso («cada uno cita ahora la forma que el alumno ve en pantalla»). Reescribir: el tema sostiene la preposición **que el alumno pone**, porque la ficha da las fechas desnudas a propósito |
| L6 | 94 | `Is there any other way?` — el tema `there-is-there-are` trae `Is there a…?` y `Are there any…?`, pero **`Is there any` no aparece ni una vez** (singular + `any` sólo sale en negativas) | `Is there another way?` cae exactamente sobre el patrón que el tema sí enseña, y es igual de natural |
| L7 | 98 | la celda dice «a whole line **to read** in the last turn», y la cabecera del rol dice «Don't read from it» | «keeps her talking while your hands are busy» — nota de propósito, que es lo que pide el §11 |
| L8 | 59, 65 | `92,000 pesos` con coma y `1.098.622.417` con punto, en la misma tabla | es el uso real colombiano, pero conviene una nota o unificar; hoy la tabla enseña dos sistemas |
| L9 | 131 | «no reason for **the box**» — `the box` es la casilla del formulario, y no está en ninguna parte | `no reason on the form` (`the form` sí aparece, línea 122) |
| L10 | 75 | `to bounce` para un cobro de tarjeta: un nativo americano dice *declined*, y el archivo explica bien por qué no lo usa (es pasiva) | se queda. Si alguna vez hace falta cambiarlo, la salida **activa** es `the charge doesn't go through` — no hace falta volver a la pasiva |
| L11 | 152, 189 | `the one you can't say yes to` · `the one you sent at the start` — elipsis con `the one` y antecedente lejos o fuera de pantalla | `the word you can't say yes to` · ver M4 |

---

## 4 · Las 20 definiciones, una a una

Regla: la definición tiene que estar en inglés **más fácil** que la palabra. Se revisa la columna
`what it is` y, cuando arrastra el fallo, la columna `here`.

### ROLE A — Tatiana

| # | palabra | definición | veredicto |
|---|---|---|---|
| 1 | `to cancel a plan` | to end it, so you stop paying and you stop going | **pasa.** Todo A1. La nota del falso amigo (*cancelar* = pagar) es correcta para Colombia y se gana el sitio |
| 2 | `to renew` | when a plan starts again for one more month, by itself | **pasa con reserva** — L2 (verbo definido con «when»), M3 (la celda `here` lleva la única pasiva) |
| 3 | `to bounce` | when the bank says no, and the money does not leave your card | **pasa.** Más fácil que la palabra. L2, L10 |
| 4 | `to expire` | to stop working after a date | **pasa.** La mejor del bloque: seis palabras, forma verbal correcta, cero jerga |
| 5 | `one way` | a ticket that takes you there and not back | **NO PASA** — G1. La definición es buena; la entrada es la que rompe |
| 6 | `business days` | days when offices open — not Saturday, not Sunday | **pasa con reserva** — L3 |
| 7 | `an appointment` | a day and a time an office gives you | **pasa.** Relativa sin `that`, que en A2 leído aguanta |
| 8 | `a charge / to charge someone` | money a company takes from you for something | **pasa a medias** — L4: el verbo del encabezado no se define |
| 9 | `in writing` | on paper, not only said out loud | **pasa** |
| 10 | `ID` | the card with your name and your number on it | **pasa** |

### ROLE B — Milena

| # | palabra | definición | veredicto |
|---|---|---|---|
| 1 | `a cancellation` | the end of a plan, **for good** | **NO PASA** — G2. La definición es más difícil que el término |
| 2 | `the minimum` | the shortest time a member has to stay after signing | **pasa.** Superlativo + `has to` + gerundio tras preposición: todo A2 |
| 3 | `to freeze a membership` | to stop the payments for some weeks and keep the plan | **definición pasa** · **`here` no pasa** — G5 («in her ear») |
| 4 | `to transfer a plan` | to put a plan in another person's name | **definición pasa** · **`here` no pasa** — G5 («not on her map») |
| 5 | `retention / to authorize` | the people who talk to members who want to leave · to say yes officially, and only some people in a company can | **NO PASA** — M8. Dos entradas, dos relativas encajadas, una elipsis con modal desnudo |
| 6 | `collections` | the part of a company that calls you when you do not pay | **pasa.** La mejor del bloque: define una abstracción con una acción concreta |
| 7 | `a cut-off` | the last moment a change can still **count** for this month | **pasa a medias** — M1 (`count` = valer) |
| 8 | `to file a change` | to put the change in the computer, so it is official | **pasa** |
| 9 | `to open a case` | to write down her visit, and give it a number and a date | **pasa** |
| 10 | `the visit log` | the book where every visit to the counter **goes** | **pasa con reserva** — M1 (`goes` = se anota) |

**Cuenta: 20 revisadas · 12 pasan limpias · 5 pasan con reserva · 3 no pasan.** Y una que falta y
debería estar: **`proof`** (G6).

**Lo que el bloque hace bien y no hay que perder al corregir:** ninguna definición traduce, todas
describen; ninguna celda `what it is` lleva comillas ni empieza por pronombre + verbo conjugado
(la regla anticalco del §11); y las dos listas no comparten ni una fila, que es lo que sostiene la
asimetría del escenario.

---

## 5 · Lo que **no** hay que cambiar

- **La mitad hablada.** Los 18 exponentes están bien y no necesitan tocarse, salvo la etiqueta de
  función de dos de ellos (G4, L7) y una posible sustitución opcional en L6.
- **Los 12 slugs y los 12 títulos.** Verificados contra el registro. Lo único que se toca ahí es
  texto de dos `rationale` (L5, M9) — texto explicativo, no anclaje.
- **`to bounce`.** El razonamiento del archivo es correcto: cambiarlo por `to be declined` metería
  una pasiva. Se queda.
- **La carta, el cierre y el debrief como piezas.** Los cambios que propongo en M4, M5 y M6 son de
  redacción dentro de esas pantallas; ni la posición del disparo (`afterTurn: 3`) ni la condición
  de cierre se mueven.
- **Que hoy nadie consiga la cancelación.** Es el desenlace de diseño y el debrief lo explica bien.

---

## 6 · Resumen ejecutable

| prioridad | qué | dónde |
|---|---|---|
| 1 | `one way` → `a one-way ticket` en la entrada y `one-way` en los datos | 48, 64, 77 |
| 2 | `for good` → `it does not come back` | 152 |
| 3 | recortar ~30 palabras a A y ~46 a B, arreglar `\+` → `\{1,\}` y rellenar la tabla con 380/396/97 | 45-50, 113-118, 124-129, 273, 279-281 |
| 4 | tres sustituciones para dejar `line` en dos sentidos | 126, 175, 178 |
| 5 | seis metáforas a literal (`running`, `board`, `map`, `ear`, `hands`) | 27, 52, 126, 154, 155, 157 |
| 6 | `retention / to authorize` fuera, `proof` dentro | 156 |
| 7 | `take`/`count`/`go`/`have wrong` a su acepción de A1 | 122, 158, 161, 197 |
| 8 | cinco participios reducidos a oración simple | 125, 128, 129, 164 |
| 9 | `if nothing is written` → `with nothing in writing` | 74 |
| 10 | `She opens here` → `Tatiana opens here`; `Where he is` → `When you can find him` | 187, 189, 195 |
| 11 | la frase de cierre, en tres | 203, 209 |
| 12 | `out of Bucaramanga` en la fila del vuelo | 64 |
| 13 | los once leves | ver §3 |

Ninguno de los trece toca el motor. Los tres primeros son los que hoy impiden publicar.
