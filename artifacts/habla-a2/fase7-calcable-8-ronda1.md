# Escenario 8 · `cancel-the-gym-i-am-leaving` — ¿se puede leer en voz alta?

Auditoría de calcabilidad contra la regla de §11 del blueprint
(`docs/habla-acompanado-blueprint.md`, líneas 249-258):

> La ficha se escribe **en notas, no en frases**. `Exam: Saturday 12, 8:00 a.m.` sí.
> `I'm taking the exam on Saturday at eight.` no, jamás, ni en los datos ni en la situación ni
> en los objetivos. Las frases decibles viven **solo** en la tabla de exponentes.
>
> Prueba para el redactor: si una línea de tu ficha se puede decir tal cual en la conversación y
> el turno avanza, esa línea está mal escrita. Reescríbela como dato.

Auditado: `artifacts/habla-a2/fase7-fichas-8-cancel-the-gym-i-am-leaving.md`.

Fuera de alcance por diseño: las dos tablas *Say it here* (líneas 85-95 y 162-174), que son
exponentes y ahí las frases van a propósito; la cabecera del set (1-23), en español; el bloque
*After* (207-212), también en español; `grammarReferences` (215-248), metadato de código que no
llega a pantalla; y la cuenta de palabras del final (252-263), que es del redactor.

## Cómo se marcó cada línea

Mismo criterio que en los escenarios 1, 2, 4, 5 y 7, para que las seis cifras se comparen:

- **FALLA** — la línea, o una cláusula autónoma donde el ojo puede parar, es un enunciado inglés
  bien formado que ese rol le puede decir al otro **sin tocar una palabra** y el turno avanza.
- **RIESGO** — es oración, pero dicha *tal cual* apunta mal: hace falta un cambio (un pronombre,
  un posesivo) para que funcione en la boca. No falla la prueba literal; la sostiene un pronombre.

**Las filas de tabla se leen de corrido, etiqueta incluida.** `| A freeze | … stops the charge |`
se lee como una sola línea. Y §11 da además una prueba escrita solo para el vocabulario, que
aquí se aplica tal cual y se cuenta aparte: *si la celda contiene algo entrecomillado o algo que
empiece por un pronombre y un verbo conjugado, reescríbela*.

---

## Veredicto

**PASA CON CAMBIOS**, y con la misma advertencia del 7, agravada: **tal como está no se puede
publicar.** No por la cifra —que es la tercera mejor de las seis— sino por dónde cae.

Unidades de pantalla en inglés auditadas, sin contar exponentes: **108**.
Fallan **18** (16,7 %). Otras **38** están a un pronombre de fallar.

| escenario | unidades | FALLA | % | sección peor |
|---|---|---|---|---|
| 1 · `the-bike-in-the-parking-lot` | 73 | 7 | 9,6 % | vocabulario `here` |
| 4 · `a-charge-i-did-not-make` | 89 | 9 | 10,1 % | Facts, ROLE B |
| 7 · `two-more-people-for-the-trip` | 101 | 16 | 15,8 % | vocabulario `here` |
| **8 · `cancel-the-gym-i-am-leaving`** | **108** | **18** | **16,7 %** | **`Only you know`** |
| 2 · `no-appointment-until-thursday` | 94 | 18 | 19,1 % | vocabulario `here` |
| 5 · `late-again-on-monday` | 96 | 22 | 22,9 % | Facts (empatada con `here`) |

**Ocho de las dieciocho son bloqueantes, y todas caen en el mismo sitio: `Only you know`.** Es la
primera vez en las seis auditorías que la sección de los datos ocultos es la peor de la ficha, y
lo es por goleada: **10 unidades, 8 fallas**.

**Cuatro de los cinco secretos de Milena se leen en voz alta.** Los cuatro, seguidos, en la misma
pantalla:

> - **Opening the case today fixes the date.** Édison then resolves with the case date. (121)
> - **Transfers exist.** (122)
> - **A freeze is not a cancellation.** (123)
> - **Wilmer was fired for promising things to sell**, and not alone. (125)

Y **dos de los cinco de Tatiana**: el rebote del cobro del 5 (44) y Yurany entera (47).

El escenario 8 es el que más depende de la asimetría de todo el set —su desenlace es *sin
acuerdo*, así que lo único que se mide es si cada una sacó lo que la otra tenía escondido—. Con
estas ocho líneas la asimetría no se negocia: se lee.

Ninguna de las 18 obliga a rehacer una sección. Las 18 son reescrituras de una línea, y en tres
casos la reescritura ya está escrita en otra parte del mismo archivo (ver «El regalo»).

---

## Dónde se concentran

| sección | unidades | FALLA | riesgo | estado |
|---|---|---|---|---|
| **`Only you know`** (5 + 5) | 10 | **8** | 5 | **la peor de las seis auditorías** — 5 de B, 3 de A |
| **Facts** (10 + 10) | 20 | **3** | 5 | las tres son de ROLE B; **la de A, limpia** |
| La carta | 7 | **2** | 3 | una de ellas, cita fuera de exponentes |
| **Vocabulario `here`** (10 + 10) | 20 | **2** | 13 | mejor que en 1, 2 y 7 — pero 13 en riesgo |
| `You can't` (3 + 3) | 6 | **1** | 3 | la de B es la definición del cierre |
| `Not about money` + `A permission` (A) | 2 | **1** | 2 | |
| `Your toolkit` (2) | 2 | **1** | 2 | |
| **Vocabulario `what it is`** (10 + 10) | 20 | **0** | 0 | **limpia** (20/20, quinta vez seguida) |
| `You want` (1 + 5) | 6 | 0 | 1 | |
| `You did it if` (2) | 2 | 0 | 0 | **limpia en los dos roles** |
| `Both screens — how it ends` (5) | 5 | 0 | 0 | **limpia** |
| `Where you are` (2) | 2 | 0 | 1 | |
| `If you walk away with nothing` (2) | 2 | 0 | 2 | |
| Nota de registro + `Your screen only` (4) | 4 | 0 | 1 | |
| **total** | **108** | **18** | **38** | |

**Reparto por rol: 6 de ROLE A, 10 de ROLE B, 2 en la carta** —que es pantalla de Milena, así que
en la práctica **B carga 12 y A carga 6, el doble**. Es el reparto más desigual de las seis
auditorías: en el 5 y en el 7 estaba simétrico.

---

## La causa: el rol B habla en reglas, y una regla no tiene pronombre que se dé la vuelta

En el escenario 7 el cortafuegos lo rompían las **personas** ausentes. Aquí lo rompen los
**sujetos abstractos**, que es peor, porque son el oficio entero de Milena.

Un dato escrito como `you pay for the gas` **no se puede leer en voz alta**: dicho al otro, el
«you» se da la vuelta. El pronombre protege sin que el redactor haga nada. Pero Milena no habla
de «you» ni de «I»: habla de *a freeze*, *a transfer*, *a case*, *the plan*, *the system*,
*cancellations*, *the charge*. **Ninguno de esos sujetos se da la vuelta al decirlo**, y todos
llevan verbo conjugado en presente porque son reglas.

| línea | sujeto sin pronombre | lo que se escribió |
|---|---|---|
| 117 | opening a case | `Opening a case isn't filing a change` |
| 121 | opening the case | `Opening the case today fixes the date.` |
| 121 | Édison | `Édison then resolves with the case date.` |
| 122 | transfers | `Transfers exist.` |
| 123 | a freeze | `A freeze is not a cancellation.` |
| 125 | Wilmer | `Wilmer was fired for promising things to sell` |
| 137 | a freeze | `A freeze … stops the charge` |
| 140 | Édison | `Édison signs it` |
| 142 | Édison | `he left at 5:00 and doesn't answer at night` |
| 155 | Édison | `Édison does, second floor.` |
| 190 | the system | `the system sends it to collections … on the 12th` |

Once de las doce fallas de Milena son eso. Y **cinco de las once son Édison**, que no está en la
sala: es el escenario 7 otra vez, con un solo ausente en vez de cuatro.

**El caso de Tatiana es distinto y más fino.** Sus dos fallas de dato oculto son las dos líneas
donde deja de hablar de sí misma: `The September 5 charge bounces…` (el sujeto es el cobro, no
ella) y `Yurany … asked about this gym two weeks ago; the price stopped her` (el sujeto es
Yurany). Sus otros tres secretos —el tiquete, el pasaporte, Wilmer— están escritos en primera
persona implícita o en nominal, y **los tres salen limpios**. La línea 46 es el modelo:

> `- **Ticket bought, in your name.** August 30. **One way.**`

Cero verbos conjugados, tres datos duros, imposible de leer como frase. Está **una línea encima**
de la peor de las dos suyas.

**Corolario para los 23 niveles que vienen:** todo rol de mostrador, ventanilla, recepción o
soporte —es decir, la mitad de los escenarios de cualquier set— tiene el cortafuegos del
pronombre desactivado de fábrica. Su ficha necesita la disciplina de notas *más* apretada, no
igual. La regla práctica: **si el sujeto de la línea no es «you» ni «I», el verbo sobra.**

---

## El regalo: la ficha ya se escribió bien, en la misma pantalla

Como en el 7, el archivo contiene su propia reescritura. Tres veces, y una de ellas a cuatro
líneas de distancia:

**El congelamiento.**
- Bien — 189, carta: `A freeze` → `**yes** · up to 60 days · **only with the two dates**`
- Mal — 137, Facts: `A freeze` → `up to **60 days**, with proof · stops the charge · **moves the 3 months to the end**`

**Un hecho pasado, con culpa, sobre alguien.**
- Bien — 124: `**Written warning last month** for a freeze filed with no proof`
- Mal — 125: `**Wilmer was fired for promising things to sell**`

**Una regla que separa dos cosas.**
- Bien — 136, Facts: `Proof that doesn't` → `an email with no dates · **a one-way ticket**`
- Mal — 117: `Opening a case isn't filing a change`

La línea 124 y la 125 son **el mismo tipo de dato** —un hecho pasado, con culpa, sobre alguien—
escritas con dos disciplinas distintas, pegadas la una a la otra. Eso descarta que el problema
sea de diseño y lo deja donde §11 ya lo había señalado: es una manera de escribir que se cuela
cuando el redactor explica *por qué* importa un dato en vez de anotarlo.

**Y la carta escribe el congelamiento sin verbo mientras `Facts` lo escribe con verbo.** La carta
es la pantalla mejor escrita del archivo en forma de nota (`not authorized · not one`,
`not Thursday — inventory count`) y a la vez la que suelta la frase más larga y más completa de
las 108 (190). Misma pantalla, dos manos.

---

## La contradicción con `grammarReferences`

La línea 238 justifica el anclaje `present-simple-negative` así:

> `Sostiene «I don't want to pay for…» … y «A freeze isn't a cancellation» si Milena decide marcar la diferencia.`

Es decir: el anclaje gramatical existe **para que Milena construya esa frase**. La línea 123 se la
da hecha, en negrita y con punto final. El anclaje queda sin trabajo que sostener.

Lo mismo, más suave, con la 230 (`present-perfect-ever-never`, que sostiene
`Has she ever been a member here?`): el exponente está bien puesto en la tabla de B, pero la
línea 47 le da a Tatiana el dato de Yurany **ya conjugado**, así que puede soltarlo leyendo antes
de que la pregunta llegue. La pregunta se queda sin nada que abrir.

---

## Las 18, una por una

### ROLE A — Tatiana (6)

**1 · línea 41 · `A permission, not a rule` · FALLA**
> `**A permission, not a rule** · Your destination and your reason: nobody's business. Dates are enough.`

`Dates are enough.` es un enunciado bien formado, sujeto en tercera persona, sin pronombre que
gire. Es literalmente la jugada del permiso: negarse a decir a dónde va y ofrecer las fechas.
Se lee y el turno avanza.
**Nota:** `Your destination and your reason: nobody's business · dates: enough.`

**2 · línea 44 · `Only you know` 1 · FALLA — BLOQUEANTE**
> `- **Card expires August 31.** New one: 8 working days, to an address you won't be at. The September 5 charge **bounces whatever you do**. Said early, it sounds like a plan to stop paying. Yours to time.`

`The September 5 charge bounces…` es su dato oculto nº 1 y el único que la ficha le dice
explícitamente que tiene que **medir cuándo suelta** («Yours to time»). Escrito así, no hay nada
que medir: se lee. El sujeto es *the charge*, no ella, así que ningún pronombre lo frena.
**Nota:** `**Card: expires August 31.** New one: 8 working days, to an address you won't be at.
**September 5 charge: bounces, whatever you do.** Said early, it sounds like a plan to stop
paying. Yours to time.`
*(De paso, `Card expires August 31` → `Card: expires August 31` mata el verbo con dos puntos.)*

**3 y 4 · línea 47 · `Only you know` 4 · FALLA ×2 — BLOQUEANTE**
> `- **Yurany**, from work, asked about this gym two weeks ago; the price stopped her. Back Wednesday night.`

Dos cláusulas, las dos decibles tal cual: `Yurany, from work, asked about this gym two weeks ago.`
y `The price stopped her.` Es el dato que abre la cesión —el único camino que a Tatiana le queda
si Milena la ofrece— y sale leyendo, sin que Milena pregunte nada.
**Nota:** `- **Yurany**, from work · her question about this gym: two weeks ago · what stopped
her: the price · back Wednesday night.`

**5 · línea 77 · vocabulario `here`, `an appointment` · FALLA**
> `| an appointment | a day and a time an office gives you | yours moved, and that started all this |`

`That started all this.` se dice tal cual y explica por qué está ahí. Además la celda **empieza
por pronombre y verbo conjugado** (`yours moved`), que es la prueba escrita de §11.
**Nota de propósito:** `yours, moved — the start of all this`

**6 · línea 83 · `Your toolkit` · FALLA**
> `… · **5**, it isn't the money · **6**, your destination is yours · **8**. Not 4, not 7.`

`It isn't the money.` es una oración corta, perfecta de nivel y exactamente su posición en el
regateo. Se dice sin cambiar nada.
**Nota:** `· **5**, not the money · **6**, your destination stays yours ·`

### ROLE B — Milena (10)

**7 · línea 117 · `You can't` 2 · FALLA**
> `2. File a change with no proof with both dates. *(Opening a case isn't filing a change — that you can do today.)*`

`Opening a case isn't filing a change.` es **el punto 1 del cierre común** («what gets written
today and what doesn't»), escrito como frase lista. El sujeto es un gerundio: no hay pronombre
que gire. Se lee y el criterio de éxito queda cumplido sin haber producido nada.
**Nota:** `*(a case ≠ a change · the case: today, yes.)*`

**8 y 9 · línea 121 · `Only you know` 1 · FALLA ×2 — BLOQUEANTE**
> `- **Opening the case today fixes the date.** Édison then resolves with the case date. No number: cut-off missed, plan renewed, **92,000 more**. It's all you have today.`

Dos oraciones seguidas, las dos decibles. La primera es lo único que Milena puede darle hoy —su
carta entera— y está en negrita con punto final. La segunda mete a Édison, que no está en la
sala, con verbo conjugado. La tercera parte de la viñeta (`No number: cut-off missed, plan
renewed`) está **impecable**: misma información, cero verbos.
**Nota:** `- **The case, opened today: the date, fixed.** Édison's answer, later, on the case
date. No number: cut-off missed, plan renewed, **92,000 more**. It's all you have today.`

**10 · línea 122 · `Only you know` 2 · FALLA — BLOQUEANTE**
> `- **Transfers exist.** Not on the board, not your first offer: paperwork, and a line. Unsaid, she never knows.`

Dos palabras, y son el segundo camino entero. La propia viñeta remata `Unsaid, she never knows`
—es decir, la ficha sabe que ese secreto es la moneda del escenario— y lo escribe en la forma que
se suelta sin querer, leyendo.
**Nota:** `- **A transfer: on the books, off the board.** Not your first offer: paperwork, and a
line. Unsaid, she never knows.`

**11 · línea 123 · `Only you know` 3 · FALLA — BLOQUEANTE**
> `- **A freeze is not a cancellation.** She'll think it is.`

La falla más clara del archivo. Es la frase que el anclaje `present-simple-negative` existe para
sostener (línea 238), y está entregada hecha. También es lo que la celda de vocabulario 150 le
pide que explique con sus palabras (`she hears "cancel" unless you explain it`): no hace falta
explicar, hace falta leer.
**Nota:** `- **A freeze ≠ a cancellation** · her ear: cancellation.`

**12 · línea 125 · `Only you know` 5 · FALLA — BLOQUEANTE**
> `- **Wilmer was fired for promising things to sell**, and not alone.`

Pasiva en pasado, sujeto ausente de la sala, negrita, punto final. Es el dato que le da la razón
a Tatiana y el que más le cuesta a Milena soltar; se lee del tirón. La línea de encima —el mismo
tipo de dato— está escrita en nota.
**Nota:** `- **Wilmer, fired last month** — promises made to close a sale · and not the only one.`

**13 · línea 137 · `Facts` · FALLA**
> `| A freeze | up to **60 days**, with proof · stops the charge · **moves the 3 months to the end** |`

Leída de corrido con la etiqueta, `A freeze stops the charge` y `A freeze moves the 3 months to
the end` son dos oraciones bien formadas. La etiqueta es un sustantivo, no un `you`: el
cortafuegos no existe. La carta escribe la misma fila sin un solo verbo (189).
**Nota:** `| A freeze | up to **60 days**, with proof · charge: stopped · the 3 months: **moved
to the end** |`

**14 · línea 140 · `Facts` · FALLA**
> `| File a change | needs proof with **both dates** · Édison signs it · **not today** |`

`Édison signs it.` se dice tal cual y es media respuesta a «¿quién autoriza?».
**Nota:** `| File a change | proof with **both dates** · signature: Édison · **not today** |`

**15 · línea 142 · `Facts` · FALLA**
> `| Édison (retention) | 2nd floor · Wednesday to Friday, **9:00 a.m.–5:00 p.m.** · he left at 5:00 and doesn't answer at night |`

`He left at five and doesn't answer at night.` es la explicación entera de por qué hoy no hay
respuesta. **Es literalmente la misma cadena que ya se marcó en el escenario 7** (`he doesn't
answer at night`, línea 180 de aquella ficha, sobre el administrador del edificio): el defecto
sobrevivió de un archivo al siguiente.
**Nota:** `| Édison (retention) | 2nd floor · Wednesday to Friday, **9:00 a.m.–5:00 p.m.** · out
since 5:00 · no answer at night |`

**16 · línea 155 · vocabulario `here`, `to authorize` · FALLA**
> `| to authorize | to say officially that a thing can be done | Édison does, second floor. You don't |`

`Édison does.` es la respuesta a la pregunta que Tatiana va a hacer, dicha sin tocar nada.
**Nota de propósito:** `Édison's, second floor — not yours`

### La carta (2)

**17 · línea 190 · FALLA**
> `| If the charge on the 5th bounces | the system sends it to **collections on its own, on the 12th** — after that nobody here handles it |`

Leída de corrido es **una condicional completa y bien formada**, con dos sujetos en tercera
persona y ningún pronombre que gire: `If the charge on the 5th bounces, the system sends it to
collections on its own, on the 12th.` Y `nobody here handles it` es una segunda cláusula
autónoma. Es el punto 3 del cierre común —qué pasa el 5 y el 12— entregado entero.

Lo agrava la nota de la propia carta (193): *«It brings one thing you have to tell her anyway —
the 12th»*. La ficha sabe que ese dato hay que decirlo, y lo escribe **como se dice**.
**Nota:** `| The charge on the 5th, bounced | **collections on the 12th**, by the system, on its
own · after that: nobody here |`

**18 · línea 193 · FALLA — cita fuera de la tabla de exponentes**
> `And from here on, "let me check" is gone: the no is yours to hold.`

`"let me check"` es **una frase inglesa decible, entrecomillada, fuera de la tabla de
exponentes** — lo único que §11 prohíbe por escrito además de las oraciones. Y es la peor de
todas para regalar: es el exponente para ganar tiempo, justo el que la nota le está diciendo que
ya no puede usar. Mismo defecto que `*"Valentina said no"*` en el escenario 7 (línea 105).
**Nota:** `And from here on, no more checking with anyone: the no is yours to hold.`

---

## Las 38 de riesgo, agrupadas por qué las salva

No fallan la prueba literal —hace falta girar un pronombre— pero conviene saber que ahí están.

**Trece en vocabulario `here`, que sigue siendo la columna más poblada de riesgo.**
ROLE A (7): 72 (`you never press a button`), 73 (`yours will, on September 5`), 74 (`the reason
it bounces`), 75 (`it fails for one missing line`), 78 (`say out loud what gets charged`,
imperativo al estudiante en vez de nota de propósito), 79 (`what Wilmer never gave you`), 80
(`she says a number — make her slow down`).
ROLE B (6): 148 (`hers says three months, and she signed it`), 150 (`she hears "cancel" unless
you explain it`), 151 (`the one she doesn't know exists`), 152 (`you can't file anything without
it`), 153 (`it's out of your hands`), 157 (`the only thing you can hand her today`).

**Cinco en `Facts`.** A: 56 (`four people behind you`), 60 (`Your card expires August 31` leído de
corrido), 62 (`You fly August 30`). B: 134 (`ends October 13`), 139 (`without it she misses the
cut-off and the plan renews` — `the plan renews` es lo más cerca de fallar de las 38; solo lo
salva que en habla pediría `will renew`).

**Cinco en `Only you know`.** A: 44 (`Said early, it sounds like a plan to stop paying`), 45
(`The 3-month minimum was written, and you signed it`). B: 121 (`It's all you have today`), 123
(`She'll think it is`) y 124 (`It costs to say it`).

**Tres en `You can't`.** A: 38 (`You work 7:00–6:00`). B: 116 (`That's retention's, in writing` —
gramatical, pero suena raro dicho a un socio: solo eso lo separa de fallar), 117 (`that you can
do today`).

**Tres en la carta.** 185 (`he finally answers the one you sent at the start`), 193 (`Opening it
early buys you nothing`, `She only learns what you tell her`).

**Dos en `If you walk away with nothing`** — 50 (`Thursday is your last day here`, `You fly with
the plan running`) y 127 (`the next complaint has your name`).

**Dos en `Your toolkit`** — 83 (`your destination is yours`) y 160 (`digit by digit is the job`).

**Y sueltas:** 27 (`Shouting buys nothing: she signs nothing`), 30 (`Four people behind you`,
`Straight from work`), 34 (`Two months of a gym you can't use: no`), 41 (`Your destination and
your reason: nobody's business`), 112 (`complaints land on you`, y `No log, no case` —
nominal, pero es una fórmula inglesa idiomática que se suelta tal cual y hace avanzar el turno:
la única «nota» del archivo que se comporta como frase).

---

## La prueba escrita de §11 para el vocabulario, contada aparte

> *Si la celda contiene algo entrecomillado o algo que empiece por un pronombre y un verbo
> conjugado, reescríbela.*

**4 celdas de 20 la incumplen** (frente a 8 de 20 en el escenario 7 — mejora real):

| rol | celda | por qué |
|---|---|---|
| A | to bounce | empieza `yours will…` |
| A | an appointment | empieza `yours moved…` |
| B | a contract | empieza `hers says…` |
| B | proof | empieza `you can't…` |

**Dos citas dentro de la ficha, las dos fuera de la tabla de exponentes:** `"cancel"` (150, una
palabra suelta: incumple la letra, no hace daño) y **`"let me check"`** (193, frase entera y
decible: contada arriba como falla nº 18).

La columna `what it is` está **limpia en las 20**: ninguna definición empieza por pronombre,
ninguna lleva comillas, ninguna es traducción. **Quinta ficha seguida sin una sola marca** — el
problema nunca fue escribir vocabulario en inglés.

---

## Lo que hay que hacer, en orden

1. **Las cuatro viñetas de `Only you know` de Milena** — 121, 122, 123, 125. Mientras estén, el
   rol que sostiene la asimetría entera del escenario la suelta leyendo, y un escenario cuyo
   desenlace es *sin acuerdo* se queda sin nada que medir.
2. **Las dos de Tatiana** — 44 (el rebote del 5) y 47 (Yurany). La 44 es la única línea de la
   ficha que pide explícitamente medir el momento de soltarla; escrita así, no hay momento.
3. **Las dos de la carta** — 190 (la condicional completa) y 193 (la cita `"let me check"`).
4. **Las tres filas de `Facts` de Milena** — 137, 140, 142. La 142 es reincidencia del escenario
   7: conviene arreglarla en los dos archivos a la vez.
5. **Las cuatro sueltas** — 41, 83, 117, 155.
6. **Las trece de vocabulario `here` en riesgo**, y de paso las 4 que incumplen la prueba escrita.
7. **Las cinco filas de `Facts` en riesgo**, quitando el verbo del valor: la etiqueta ya dice de
   quién es el dato.

Ninguna toca el motor: ni el conflicto, ni la asimetría, ni las restricciones como *contenido*,
ni la carta como pieza, ni el cierre, ni el debrief, ni los doce `grammarReferences`. Lo que
cambia es la forma de la línea.

Y hay que rehacer la cuenta de prosa del final del archivo (**348 / 348, tope 350**): quitar
verbos conjugados baja el conteo, no lo sube, así que el presupuesto no corre peligro — pero dos
cifras a dos palabras del tope dejan de ser ciertas en cuanto se toque una línea, y hay que
volver a medirlas.
