# Escenario 8 · `cancel-the-gym-i-am-leaving` — auditoría de NIVEL (versión en inglés, 2.ª vuelta)

Auditado: `artifacts/habla-a2/fase7-fichas-8-cancel-the-gym-i-am-leaving.md` (330 líneas, la
versión ya corregida — la 1.ª vuelta se hizo sobre 263).
Contra: `artifacts/habla-a2/caja-de-herramientas-a2.md`, el molde
`artifacts/habla-a2/fase7-modelo-ficha-en.md` y `src/data/grammar/ingles/{a1,a2}` para los slugs.

Tres cosas donde antes había una:

1. el inglés que el estudiante **dice** (A2 hablado, con lista negra),
2. el inglés que **lee** (A2 leído, que aguanta un poco más),
3. las **20 entradas de vocabulario** (10 por rol), una a una: cada definición tiene que ser más
   fácil que la palabra que define.

**Veredicto: PASA CON CAMBIOS.**

La mitad hablada sigue impecable y los doce anclajes de gramática están verificados slug a slug y
título a título contra el registro. La 1.ª vuelta se aplicó de verdad: `have to have answered`,
`what gets written`, `road`, `payable`, `goes after`, `so it counts`, `can be done` y los tres
absolutos que llevaban reglas dentro **ya no están**. Lo que queda es de la misma familia y en
sitios nuevos: la prosa de lectura volvió a apretarse al reescribirse, el vocabulario nuevo trae
**dos definiciones de veinte** que se explican con algo más difícil que la palabra, y la puerta
del presupuesto se entregó **abierta** (`PENDIENTE_A`, `PENDIENTE_B`, `PENDIENTE_C`) y, contada
con la regla del propio archivo, no pasa. **Cinco graves. Ninguno toca el motor.**

---

## 0 · Lo que pasa limpio (y conviene no romper)

**Estructuras prohibidas en los 18 exponentes hablados: cero.** Verificado por patrón sobre el
archivo entero, no a ojo:

| prohibida | en exponentes | en todo el archivo |
|---|---|---|
| present perfect de duración con `for` / `since` | **0** | `since` aparece 1 vez, y no es present perfect (L-4) |
| `could` de cortesía | **0** | 1, dentro de un `rationale` que explica que no se usa |
| `would` / `would rather` / `would prefer` | **0** | **0** |
| pasiva `be` + participio | **0** | **1** en todo el cuerpo de las fichas (L-1) |
| modal + infinitivo perfecto | **0** | **0** — `have to have answered` corregido |
| condicional hipotético (2.º) | **0** | **0** — los `if` son todos de primer condicional |
| pasiva con `get` | **0** | **0** — `what gets written` corregido |

**Los 18 exponentes, uno a uno, son A2 o menos.** Tatiana: `So I have to…?` · `I'm leaving on…`
· `I don't want to pay for…` · `Is there any other way?` · `What will happen if…?` · `I know it's
not your fault, but…` · `I can show you, but I can't leave it.` · `Let me copy that.` ·
`So it's …, on the …?`. Milena: `Has this person ever been a member here?` ·
`Write the number down, please: …` · `I have to be careful, because…` · `I can't do that, but I
can…` · `I need a paper that says…` · `Let me check that. One moment, please.` · `Can you sign
here, please?` · `I know, and I'm sorry.` · `That's not enough — it doesn't say…`.
Nueve y nueve, dentro del 6-10 del §10. **Este bloque no hay que tocarlo.**

**Los doce `grammarReferences` existen los doce, con el slug y el título exactos.** Comprobado
contra `src/data/grammar/ingles/{a1,a2}`, campo `slug` y campo `title`, carácter a carácter:

| # | nivel | slug | archivo | slug | título |
|---|---|---|---|---|---|
| 1 | a2 | `have-to-must` | `a2/have-to-must.ts` | ✅ | ✅ |
| 2 | a2 | `first-conditional` | `a2/first-conditional.ts` | ✅ | ✅ |
| 3 | a2 | `relative-clauses-a2` | `a2/relative-clauses.ts` | ✅ **con sufijo** | ✅ |
| 4 | a2 | `present-perfect-ever-never` | `a2/present-perfect-ever-never.ts` | ✅ | ✅ |
| 5 | a2 | `connectors-a2` | `a2/connectors.ts` | ✅ **con sufijo** | ✅ |
| 6 | a1 | `can-ability` | `a1/can-ability.ts` | ✅ | ✅ |
| 7 | a1 | `present-simple-questions` | `a1/present-simple-questions.ts` | ✅ | ✅ |
| 8 | a1 | `present-simple-negative` | `a1/present-simple-negative.ts` | ✅ | ✅ |
| 9 | a1 | `imperative` | `a1/imperative.ts` | ✅ | ✅ |
| 10 | a1 | `prepositions-time` | `a1/prepositions-time.ts` | ✅ | ✅ |
| 11 | a2 | `present-continuous-future-a2` | `a2/present-continuous-future.ts` | ✅ **con sufijo** | ✅ |
| 12 | a1 | `there-is-there-are` | `a1/there-is-there-are.ts` | ✅ | ✅ |

Los tres con sufijo `-a2` están escritos **con** el sufijo, que es como existen; sin él
`getTopicBySlug` devuelve `null`. Correcto. Ojo al copiar esta lista a otro escenario:
`used-to-a2`, `past-continuous-a2` y `prepositions-movement-a2` **sí** llevan sufijo, y
`have-to-must`, `first-conditional`, `present-perfect-basic`, `quantifiers`, `superlatives`,
`should-advice` y `will-future` **no**. No hay regla: hay que abrir el archivo.

**Dos `rationale` afirman cosas sobre el contenido del tema, y las dos son ciertas.**
`can-ability` dice que el tema enseña can «como permiso y petición»: el archivo trae
`Can I open the window?` y `Can you help me?` en la sección SEO y `Can + subject + verb?` en el
`formula`. ✅ `there-is-there-are` dice que trae «la interrogativa con there is/are y con any»:
la tabla del `guide` trae `Is there a café nearby?` y `Are there any bookshops?`. ✅

**Las cuatro citas rotas de la 1.ª vuelta están arregladas.** `The person who can do that is…`,
`That's why I'm here today.`, `Let me say that again.`, `I need it because…` y
`What does "…" mean?` existen las cinco, literales, en la caja de herramientas. Once de los doce
`rationale` citan cadenas que están impresas en pantalla (ver L-6 para el que no).

**El reparto de bloques sigue coherente.** Tatiana: 1 `[asks]`, 2, 3 `[receives]`, 5, 6, 8.
Milena: 1 `[grants]`, 2, 3, 4 `[jargon]`, 5, 7 `[grants]`. La reparación queda cubierta por los
dos lados —ella pregunta con el 3, ella se reformula con el 4—, que es lo que este escenario
necesita más que ningún otro del set.

**Los glosados de cifras están ahora en las dos fichas.** `92,000` → *(ninety-two thousand)* en
la de Tatiana y en la de Milena (era el M-11 de la 1.ª vuelta), `135,000` y `30,000` también.

**El debrief va en español.** Correcto y sin discusión: es la única parte donde el estudiante
produce pensamiento abstracto.

---

## 1 · GRAVE — cinco cosas que rompen el nivel

### G1 · `line` significa cinco cosas distintas en la misma ficha, y ninguna se glosa

Milena lee la palabra `line` **ocho veces**, con estos sentidos:

| línea | dice | sentido |
|---|---|---|
| 106 | `ROLE B — The one line you can't cross` | la regla |
| 111 | `Four in line.` | la fila de gente |
| 113 | `To serve her without crossing the line.` | la regla (modismo B2) |
| 126 | `paperwork, and a line` | ¿la fila? ¿la regla? — no se recupera |
| 137 | `four people in line` | la fila |
| 153 | `the line you can't cross` | la regla |
| 172 | `why that line costs you` | la regla |
| 175 | `hold the line` | modismo de teléfono, y aquí no hay teléfono |
| 178 | `point at the missing line, not at the whole paper` | un renglón de un papel |

Y en la de Tatiana, dos más con un sexto sentido: `the one line that keeps your data` (97) y
`a whole line to read` (98), donde `line` es *una frase*.

Un A2 colombiano no desambigua esto. Y no es adorno: la línea 126 es **el secreto de la cesión**
—la única alternativa que Milena puede sacar de la manga— y la 113 es **su objetivo entero**.
`hold the line` es además semánticamente falso: la etiqueta de un exponente que dice
`Let me check that. One moment, please.` no es «no cuelgue».

**Cambios.** Dejar `line` para **un** sentido —la regla— y sacar los otros:

| línea | dice | debe decir |
|---|---|---|
| 111, 137 | `four in line` / `four people in line` | `four people waiting` |
| 113 | `To serve her without crossing the line.` | `To help her without breaking the rule.` |
| 126 | `paperwork, and a line` | `papers, and a long wait` |
| 175 (etiqueta) | `hold the line` | `slow it down` |
| 178 | `point at the missing line` | `point at what the paper doesn't say` |
| 97 | `the one line that keeps your data` | `the one sentence that keeps your data` |
| 98 | `a whole line to read` | `a whole sentence to read` |

Con eso `the one line you can't cross` (título), `the line you can't cross` (vocabulario) y
`why that line costs you` (exponente) quedan los tres con el mismo sentido y se refuerzan.

### G2 · Dos definiciones de veinte se explican con algo más difícil que la palabra que definen

Las veinte, una a una. Dieciocho pasan; dos no. (Las quince que ya pasaban en la 1.ª vuelta
siguen bien, y las cinco que fallaban entonces —`to bounce`, `collections`, `to file a change`,
`to authorize`, `cut-off`— se rehicieron: **cuatro quedaron bien y una no**.)

**Ficha de Tatiana**

| # | palabra | definición | veredicto |
|---|---|---|---|
| 1 | to cancel a plan | *to end it, so you stop paying and you stop going* | ✅ todo A1 · y la nota del falso amigo (*cancelar* = pagar) es lo mejor de las dos listas |
| 2 | to renew | *when a plan starts again for one more month, by itself* | ✅ (L-3: el lema es verbo y la definición es una temporal) |
| 3 | to bounce | *when the bank says no, and the money does not leave your card* | ✅ **arreglado** — fuera `go through` |
| 4 | to expire | *to stop working after a date* | ✅ |
| 5 | one way | *a ticket that takes you there and not back* | ✅ |
| 6 | business days | *days when offices open — not Saturday, not Sunday* | ✅ (L-2: `are open`) |
| 7 | an appointment | *a day and a time an office gives you* | ✅ |
| 8 | a charge / to charge someone | *money a company takes from you for something* | ✅ la mitad (L-3) |
| 9 | in writing | *on paper, not only said out loud* | ✅ |
| 10 | ID | *the card with your name and your number on it* | ✅ |

**Ficha de Milena**

| # | palabra | definición | veredicto |
|---|---|---|---|
| 11 | a cancellation | *the end of a plan, **for good*** | ❌ **falla** |
| 12 | the minimum | *the shortest time a member has to stay after signing* | ✅ justo en el límite |
| 13 | to freeze a membership | *to stop the payments for some weeks and keep the plan* | ✅ |
| 14 | to transfer a plan | *to put a plan in another person's name* | ✅ |
| 15 | retention / to authorize | *the people who talk to members who want to leave · to say yes officially, and only some people in a company can* | ✅ de nivel (L-3 por meter dos palabras sin relación en una fila) |
| 16 | collections | *the part of a company that calls you when you do not pay* | ✅ **arreglado** |
| 17 | a cut-off | *the last moment a change can still **count** for this month* | ❌ **falla** |
| 18 | to file a change | *to put the change in the computer, so it is official* | ✅ **arreglado** |
| 19 | to open a case | *to write down her visit, and give it a number and a date* | ✅ **arreglado** |
| 20 | the visit log | *the book where every visit to the counter goes, with a name and a signature* | ✅ (`goes` = «se escribe» es figurado, pero el resto lo sostiene) |

Los dos fallos:

- **`a cancellation` ← `for good`.** *For good* es un modismo B1/B2 que significa «para siempre»,
  y no tiene nada que ver con el sentido de *good* que un A2 conoce. La palabra definida,
  *cancellation*, es un cognado transparente (*cancelación*): la definición es **más difícil que
  el lema**, que es exactamente lo que la regla prohíbe. Y esta fila es la primera que Milena lee.
  → `when a plan stops and never starts again`
- **`a cut-off` ← `count`.** Ya fallaba en la 1.ª vuelta por lo mismo y el recambio no se aplicó:
  `count` en su acepción abstracta de «ser válido» es B1, no lo cubre ningún anclaje, y *cut-off*
  es opaca de entrada, así que la definición tiene que abrirla y no la abre. Además la misma
  acepción reaparece **en el criterio de éxito de Tatiana** (línea 102, `the last hour that still
  counts`) — y *cut-off* no está en la lista de Tatiana, así que ella se encuentra `counts` sin
  ningún sitio donde haberlo visto.
  → definición: `the last hour. After it, your change goes to the next month.`
  → línea 102: `the last hour that still works for this month`

### G3 · La puerta del presupuesto se entregó abierta, y contada no pasa

La tabla final (líneas 277-281) dice **`PENDIENTE_A`**, **`PENDIENTE_B`** y **`PENDIENTE_C`**. El
archivo escribe la regla de conteo y hasta el `sed` que la reproduce, y luego no la corre. Una
puerta que no informa un número no es una puerta.

Corrida sobre el archivo, con la regla del propio archivo (la prosa que ella misma enumera:
cabecera del rol, situación, objetivo, restricciones, permiso, dato oculto, lo que se pierde,
línea de la caja y criterio de éxito; sin tablas, sin carta, sin cierre, sin debrief, contando
fechas y cifras):

| ficha | palabras de prosa | presupuesto | |
|---|---|---|---|
| ROLE A — Tatiana | **383** | ≤ 350 | **+33** |
| ROLE B — Milena | **403** | ≤ 350 | **+53** |
| La carta (prosa: 187, 189, 197) | **97** | fuera de la ficha | — |

Las dos se pasan, y la de Milena se pasa por un 15 %. No hace falta quitar piezas: los cambios de
G1, G4, G5 y de M-3, M-5 y M-11 recortan lo suficiente porque casi todos sustituyen sintaxis
comprimida por frases simples **más cortas**, no más largas. Hay que recontar después y escribir
el número.

### G4 · Vuelven los participios absolutos, y otra vez llevan una regla dentro

Es la misma construcción que fue G2 en la 1.ª vuelta y G3 en el escenario 6. Los tres casos de
entonces se arreglaron; al reescribir aparecieron cuatro nuevos, y tres están en **datos ocultos**,
que es lo que decide cómo se juega:

| línea | dice | qué se pierde si no se entiende |
|---|---|---|
| 125 | `The case, opened today: the date, fixed.` | **lo único que Milena puede ofrecer hoy.** Dos absolutos encadenados sin un solo verbo conjugado |
| 128 | `Written warning last month for a freeze filed with no proof` | por qué Milena no puede ayudar de más — su miedo entero |
| 129 | `promises made to close a sale` | por qué la promesa de Wilmer no vale |
| 48 | `Ticket bought, in your name.` | el dato que hace que la fecha de Tatiana no se discuta |

El molde permite frases completas en «Only you know» —el modelo escribe *«You already asked
Katherine and Elkin. Both said no.»*—, así que aquí no hay que elegir entre notas y nivel.

**Cambios.**

| línea | debe decir |
|---|---|
| 125 | `If you open the case today, it keeps today's date.` |
| 128 | `Last month you filed a freeze with no proof, and you got a written warning. You helped too much.` |
| 129 | `He promised things that don't exist, to sell more.` |
| 48 | `You bought the ticket. It has your name on it.` |

### G5 · El secreto de la cesión está escrito en dos sintagmas que no se pueden descifrar

> Línea 126: `**A transfer: real, and not on the board.** Not your first offer: paperwork, and a
> line. If you don't say it, she never knows.`

`not on the board` no dice nada: no hay ningún *board* en la escena, ni en los datos, ni en el
vocabulario. Probablemente significa «no está en el cartel de precios», y eso hay que adivinarlo.
`paperwork, and a line` es el caso 4 de G1.

Y esta línea es **la bisagra del escenario**: la cesión es la segunda salida, la que Tatiana no
puede pedir porque no sabe que existe, y la ficha de Milena dice que no es lo primero que ofrece.
Si Milena no entiende su propia carta, la salida no se juega y el escenario se queda con un solo
«no».

**Cambio.**

> **A transfer: real, but not on the price list.** Not your first offer: it takes papers, and a
> long wait. If you don't say it, she never knows.

---

## 2 · MEDIO — catorce sitios donde el inglés leído se pasa de A2

Ninguno rompe el juego solo; juntos hacen que la ficha se lea a trompicones. Todos en prosa de
lectura o en columnas de explicación; **ninguno en un exponente**.

| id | línea | lo que dice | por qué | cambio |
|---|---|---|---|---|
| M-1 | 85, 164 | `a number to copy **by ear**` · `a reason **copied by ear**` | *by ear* es modismo B2, y es lo único que explica a cada una en qué consiste su trabajo de reparación | `a number you have to copy while she says it` · `an ID and a reason you copy while she says them` |
| M-2 | 29 | `Shouting **buys** nothing: she signs nothing.` | *buy* figurado (es la construcción que se quitó de la carta en la 1.ª vuelta, reaparecida en la primera línea que lee Tatiana) | `Don't shout. If you shout, she signs nothing.` |
| M-3 | 46 | `to an address **you won't be at**` · `bounces, **whatever you do**` | relativa de cero con preposición al final; *whatever* concesivo es B1 | `to an address. You will not be there.` · `and you can't stop that` |
| M-4 | 49 | `**what stopped her**: the price` | relativa libre en función de sujeto, B1 | `she didn't sign, because of the price` |
| M-5 | 111 | `Her plan: **Wilmer's sale** · Wilmer, gone.` | genitivo como predicado: nadie recupera «Wilmer se la vendió» | `Wilmer sold her the plan. Wilmer is gone.` |
| M-6 | 113 | `without **crossing the line**` | modismo B2 (ver G1) | `without breaking the rule` |
| M-7 | 122 | `**Ask her destination**, her **purpose**, or her plan B.` | *ask her destination* no es inglés (sería *ask about*), y *purpose* es B1 abstracto | `Don't ask where she is going, why, or what she will do if you say no.` |
| M-8 | 131 | `no reason **for the box**` | *the box* aparece por primera y única vez: no tiene referente | `no reason written on the form` |
| M-9 | 139 | `name + **date out and date back**` | no es inglés, y es **la regla que decide qué papel sirve** — de ella dependen los dos rechazos de Milena | `name + the day she leaves and the day she comes back` |
| M-10 | 195 | `Where he is \| not Thursday — **inventory count**` | la pregunta es *dónde* y la respuesta es *cuándo*; y *inventory count* es jerga sin glosar, en la carta, que se lee **en mitad de la conversación** | `When he's there \| not Thursday — that day he counts the machines · Wednesday, 9 to 5, second floor` |
| M-11 | 197 | `one office day **that you may still have wrong**` | *have something wrong* + *may* epistémico + relativa; es la frase que le dice a Milena para qué sirve la carta | `and one day of the week: you may have said the wrong day.` |
| M-12 | 99, 175, 203, 209 | `read it back` · `slow her down without sending her away` · `repeats them back` · `says them back` | **phrasal separable con pronombre en medio**, que está en la lista negra de la caja. Cuatro veces, y una en la pantalla que leen las dos | `read the number back` · `make her wait, but don't send her away` · `and Tatiana repeats the number and the date` |
| M-13 | 203 | la frase que dice cuándo se acaba el juego: 27 palabras, tres cláusulas coordinadas con *when*, un infinitivo de finalidad y una completiva sin *that* | es la única frase que **las dos** tienen que entender igual, y es la más larga del documento | partirla en tres pasos numerados: `1. Tatiana signs the visit log. 2. Milena says the case number and the date out loud. 3. Tatiana says them back.` |
| M-14 | 97 | `the one line that keeps your data **and still cooperates**` | *cooperate* es B1/B2 y una frase no coopera | `the one sentence that keeps your data and still helps her` |

---

## 3 · LEVE — siete cosas de higiene

**L-1 · La única pasiva del cuerpo.** Línea 74, `if nothing is written`. Está en la columna
«here» del vocabulario, se lee y no se dice, pero no cuesta nada: → `if nobody writes anything`.

**L-2 · `days when offices open`** (78). Se lee como «los días en que las oficinas abren [la
puerta]». → `days when offices are open`.

**L-3 · Tres filas de vocabulario cargan dos cosas.** `a charge / to charge someone` (80) pone
dos lemas y define solo el sustantivo; `retention / to authorize` (156) mete un departamento y un
verbo sin relación en una fila; `to renew` (74) es un verbo definido con una temporal (*when a
plan starts again*). Las tres son consecuencia del tope de 10 y de la decisión documentada en la
nota 5 de la cabecera. Si el tope se respeta, al menos que la definición cubra los dos lemas:
`a charge = money a company takes from you · to charge someone = to take it from them`.

**L-4 · `out since 5:00`** (146). No es present perfect, así que no infringe la prohibición, pero
es *since* de duración a un metro de un A2 que va a producir *he is out since five*. → `he leaves
at 5:00`. (Aparte, y fuera de mi lane: esa misma fila dice `no answer at night` y la carta trae
un mensaje de Édison **a las 6:52 p.m.**; si es deliberado —«por fin contesta»— conviene que la
fila lo diga.)

**L-5 · `That last repeat ends the game.`** (209). *Repeat* no es sustantivo en este sentido.
→ `That last check ends the game.`

**L-6 · El `rationale` de `prepositions-time` cita cadenas que no están impresas.** Cita
`«on July 13»`, `«at six p.m.»`, `«from nine to five»`; la ficha escribe `July 13`,
`6:00 p.m.` y `9:00 a.m.–5:00 p.m.`. Es defendible —son formas de **producción**, no de
lectura—, pero es el único de los doce que no cita pantalla, y quien vaya a verificarlo no las va
a encontrar. Decir en el propio `rationale` que son las formas que el alumno tiene que producir a
partir de la tabla de datos lo cierra.

**L-7 · Milena no lleva el bloque 8 y sí lleva un exponente de ganar tiempo.** La línea 164 dice
`Not 6, not 8`, y su exponente 6 es `Let me check that. One moment, please.`, cuya explicación es
«slow her down». No es un error —la carta se lo quita después del turno 3, y la columna lo dice—,
pero la línea del toolkit y la tabla se contradicen a simple vista. Una coma lo arregla:
`Not 6, not 8 — the little you have of 8 is your own, and the card takes it.`

---

## 4 · Qué hay que tocar, en orden

1. **G2** — dos definiciones: `a cancellation` (fuera `for good`) y `a cut-off` (fuera `count`),
   más el eco de `counts` en la línea 102. Es lo que más barato sale y más caro cuesta si se queda.
2. **G5** — línea 126, el secreto de la cesión.
3. **G4** — cuatro absolutos → cuatro frases simples. Líneas 48, 125, 128, 129.
4. **G1** — `line`: siete sustituciones, y el título se queda como está.
5. **M-1 a M-14**, por orden de línea.
6. **L-1 a L-7.**
7. **G3** — recontar las tres cifras y escribirlas en la tabla, sustituyendo `PENDIENTE_*`. Al
   final, no al principio: los pasos 1-6 mueven el número.

**Lo que no se toca:** los 18 exponentes, los 12 slugs con sus títulos, el reparto de bloques de
la caja, las dieciocho definiciones que pasan, el debrief en español y el motor entero —conflicto,
asimetría, secretos, carta en `afterTurn: 3`, cierre—. Y la nota 4 de la cabecera del archivo
sigue vigente: si se quiere que la carta llegue con algo que corregir, eso se cambia en
`fase4-escenarios-7-8.md`, no aquí.

**Fuera del alcance de esta auditoría:** la contradicción de Édison (L-4, segundo párrafo) es de
coherencia, no de nivel; y el reparto medido en turnos y no en palabras (H65 de la 1.ª vuelta)
sigue siendo del blueprint.
