# Fase 13 · Calibrador de nivel — escenario 3 `swap-the-saturday-shift` (**el molde**)

Auditado: `artifacts/habla-a2/fase7-modelo-ficha-en.md` **tal como está en disco** el 22 ago 2026,
sobre `ed220acf`, después de la pasada quirúrgica (25 filas) y del renombrado de etiquetas de la
tabla de exponentes de ROLE B. Contador canónico verificado en el momento de auditar:
**A 436 · B 443**, techo 450.

Segunda pasada del calibrador: existe `fase9-nivel-3.md`. Este informe **no lo repite**; verifica
qué de aquél llegó al archivo, qué se deshizo por el camino, y audita lo que el renombrado y la
fusión de oraciones introdujeron.

---

## VEREDICTO — **CABE CON CAMBIOS**

El acto de habla es A2, la ruta mínima se escribe entera en A2 (§6 de este informe) y las bandas,
las tablas y el reparto de la caja están dentro de §4 y §11. Lo que se cae son **22 renglones**,
ninguno de motor, y de ellos hay que mirar tres cosas antes que nada:

1. **Una regresión.** El commit `ae708726` —una pasada de *calcabilidad*— **deshizo el arreglo N1
   del informe de nivel anterior** y volvió a meter la pasiva en el punto 4 del cierre, con otra
   cara: `— the name, written in the message`. La pasiva que se quitó por B1 volvió como participio
   reducido, que es peor. Y el punto 3 del mismo cierre lleva una pasiva con *get* que nunca se
   miró: `Which shift gets paid back`.
2. **La condición de B —la pieza que decide el desenlace— exige una estructura sin anclaje A2.**
   `the café group says **that they asked you for it**` obliga a una completiva de reporte. No hay
   tema de `reported speech` por debajo de B1 en el registro. Se reescribe **sin** completiva y
   sale más corta.
3. **La oración fundida de B** (fila 25 de la pasada quirúrgica) es hoy la más larga y la más
   subordinada de las dos fichas: 31 palabras, una principal coordinada, un participio adjunto y
   **dos absolutas con `with`** encadenadas. Es lo primero que lee ROLE B.

**Coste total, medido con `prosa-canonica.mjs` aplicando los 22 cambios:** ROLE A **436 → 431**,
ROLE B **443 → 441**. Los dos bajan. No hace falta comprar aire en ningún sitio.

---

## 1 · El acto de habla existe en A2 (§4 del blueprint)

`pedir-favor` + `conceder-con-condicion`. Los dos están literalmente en la fila A2 de §4: «pedir un
favor, dar una razón, disculparse, proponer alternativa, quejarse con educación, **conceder
poniendo una condición simple**». Poder igual, desenlace parcial, 7 min, 7 turnos por rol
(bandas A2: 5-8 y 6-9). **Nada que subir de nivel.**

Lo que en el molde roza B1 y por qué se queda:

| Parece B1 | Qué es | Veredicto |
|---|---|---|
| B sostiene su condición y no la mueve | es **una** condición, dicha una vez, sin contraoferta ni matiz — eso es conceder con condición simple | se queda |
| Cierre en cinco puntos = «resumir el acuerdo» (B1) | son cinco **datos** enumerados, no una reformulación. Cada uno se dice en una oración | se queda **si** caen las dos pasivas de los puntos 3 y 4 |
| A tiene que **rechazar** la propuesta de B tras la carta | lo hace con `There's a problem: …` + una razón, que es «dar una razón», A2 | se queda |
| B usa el bloque 7 («decir no sin decir no») | cinco fórmulas memorizadas de la caja común, ya verificadas A2 | se queda |

**El acto se puede hacer con la ficha + la caja, con una excepción**, y es de reparto de bloques:
ROLE A no tiene el bloque **3** `[receives]`. Ver hallazgo **T1**.

---

## 2 · Tabla forma → tema del registro · ROLE A

Registro: `src/data/grammar/registry` → `src/data/grammar/ingles/{a1,a2}`. Slugs verificados uno a
uno: los seis temas A2 que llevan sufijo existen **solo** con él; los demás existen **sin** él.

| # | forma (exponente) | tema del registro | slug | por qué lo sostiene |
|---|---|---|---|---|
| 1 | `What are you doing on …?` | Present Continuous para el futuro A2 | `present-continuous-future-a2` | el propio tema trae la interrogativa: *Are you working next Saturday?* |
| 2 | `How does … work for you?` | Present simple interrogativo A1 | `present-simple-questions` | `do/does` + sujeto + base. **Ojo:** la acepción de `work` = «venirle bien» no la ancla ningún tema; vale como fórmula memorizada, no como forma productiva (ver **X1**) |
| 3 | `Can I ask you a …?` | Can para habilidad A1 | `can-ability` | el tema cubre explícitamente permiso y petición: *Can I come in?*, *Can you help me?* |
| 4 | `Can we write it in … today?` | ídem + Preposiciones de tiempo A1 | `can-ability` · `prepositions-time` | `can` + base; `today` sin preposición, que es lo que el tema enseña frente a *in today* |
| 5 | `There's a problem: …` | There is / There are A1 | `there-is-there-are` | contracción afirmativa singular, la del propio tema |
| 6 | `I can take your shift on …` | Can A1 + Preposiciones de tiempo A1 | `can-ability` · `prepositions-time` | `on` + día y `on` + fecha están en la tabla del tema (*on Monday*, *on July 5th*) |
| 7 | `I'll do the stock count on …` | El Futuro con Will A2 | `will-future` | compromiso espontáneo con `'ll`, que es el uso que el tema separa de `going to` |
| 8 | `We can do it two ways: … or …` | Can A1 + Cuantificadores A2 | `can-ability` · `quantifiers` | `two ways` es contable plural con numeral; el `or` lo cubre `connectors-a2` |
| 9 | `I can be here at …` | Can A1 + Decir la hora A1 | `can-ability` · `telling-time` | `at` + hora exacta, y la forma digital (*six thirty*) que el tema autoriza |
| 10 | `I'm taking the IELTS on …` | Present Continuous futuro A2 | `present-continuous-future-a2` | plan confirmado con expresión de tiempo, que el tema declara **esencial** |
| 11 | `I paid … and there's no …` | Past Simple irregulares A2 + There is A1 + Conectores A2 | `past-simple-irregular` · `there-is-there-are` · `connectors-a2` | `paid` es irregular; *there is no + sustantivo* está aceptado en el tema; `and` en `connectors-a2` |

**Las once formas de A tienen tema.** Ninguna se cae por nivel.

## 2 bis · Tabla forma → tema del registro · ROLE B

| # | forma (exponente) | tema del registro | slug | por qué lo sostiene |
|---|---|---|---|---|
| 1 | `How about …?` | **ninguno** | — | no hay tema en ningún nivel del registro de inglés. Se queda **como fórmula memorizada** (ver **X1**): no exige estructura, solo `about` + sustantivo o `-ing` |
| 2 | `What if you …?` | El Primer Condicional A2 | `first-conditional` | condicional elíptico con presente en la cláusula `if`, que es la regla dura del tema |
| 3 | `What exactly do you need — the … or the …?` | Present simple interrogativo A1 + Preguntas con WH A1 | `present-simple-questions` · `wh-questions` | `do` + sujeto + base con `what` delante |
| 4 | `I can do it, but only if …` | Primer Condicional A2 + Can A1 + Conectores A2 | `first-conditional` · `can-ability` · `connectors-a2` | el tema autoriza **literalmente** `can` dentro de la cláusula `if`: *If you can come, please let me know*. Y `but` es de `connectors-a2` |
| 5 | `My bus leaves at …` | Present simple afirmativo A1 + Decir la hora A1 + Preposiciones de tiempo A1 | `present-simple-affirmative` · `telling-time` · `prepositions-time` | misma forma que el ejemplo del propio tema, *The class starts at eight*. La **lectura de horario futuro** no la enseña ningún tema, pero no es forma nueva: se infiere del contexto (ver **X2**) |
| 6 | `There's a reservation for …` | There is / There are A1 | `there-is-there-are` | afirmativa singular con `for` + número |
| 7 | `That shift is not a …` | Verb to be A1 + Demostrativos A1 | `verb-to-be` · `demonstratives` | negativa de `be` con `that` + sustantivo |
| 8 | `I did two swaps …` | Past Simple irregulares A2 | `past-simple-irregular` | `did` como léxico irregular, no como auxiliar |
| 9 | `After the third one, no more …` | Cuantificadores A2 (parcial) | `quantifiers` | **anclaje flojo**: el tema cubre much/many/a lot of/some/any/few/little, **no** `no` como determinante ni el ordinal como pronombre (`the third one`). Ver **R11** |

**Ocho de nueve tienen tema.** La 1 se queda como fórmula, la 9 se reescribe.

### Lo que el escenario ejercita y el registro no cubre — se deja dicho, no se inventa slug

| forma | dónde vive hoy | decisión |
|---|---|---|
| `How about …?` | exponente de B | se queda: fórmula memorizada, sin estructura |
| completiva de reporte `say/write **that** + oración` | **prosa de la condición de B** | **se saca** (R3): es la pieza que decide el desenlace y no puede depender de un hueco del registro |
| pronombres posesivos `theirs` / `yours` / `nobody else's` | prosa de A y de B | se sacan (R6, R8, R9): el registro solo tiene `possessive-adjectives` (my/your) y `possessive-s` |
| `nobody` / `anybody` como cuantificadores negativos | prosa de A | se reduce a uno (R-A3) |
| numerales por encima de mil | datos duros de los dos | **no se toca**: léxico pre-A1, y la ficha ya escribe `about` delante de cada cifra. El hueco es del registro (no hay tema de numerales en ningún nivel del inglés), no del escenario |

---

## 3 · Hallazgos, arreglo y coste en palabras

Coste medido aplicando el cambio sobre el archivo real, con la misma tokenización del contador
canónico. `0` = neutro. Negativo = libera aire.

### Bloque N — pasivas que hay que **decir** o leer en el cierre (no cuenta presupuesto)

| # | dónde | qué hay | por qué se cae | qué entra | coste |
|---|---|---|---|---|---|
| **N1** | `how it ends`, punto 4 | `Who asked for the swap — the name, written in the message.` | **regresión de `ae708726`**: participio pasivo reducido. No hay tema de pasiva en A1 ni A2. El informe anterior ya lo había quitado | `4. Who asked for the swap — the name, in the message.` | 0 (fuera del contador) |
| **N2** | `how it ends`, punto 3 | `Which shift gets paid back, and on what exact day.` | pasiva con `get`. Nunca se miró | `3. Which shift pays the favor back, and on what exact day.` | 0 |
| **N3** | `how it ends`, entradilla | `You finish when the two of you say out loud, together, the message that goes to the café group today:` | objeto desplazado tras dos adverbiales + relativa. Es la instrucción que los dos tienen que entender para cerrar | `Today a message goes to the café group. You finish when the two of you say it out loud, together:` | 0 |
| **N4** | `You want` de A | `and it has to be written in the café group today` | pasiva, y en la **línea del objetivo de A** | `and the message has to go to the café group today` | **0 A** |
| **N5** | `You can't` 2 de B | `and the ticket is paid` | `be` + participio. Calca del español, pero la regla del set es cero pasiva y N1 se quitó por lo mismo | `and you already paid for it` | **+1 B** |

> **N1 es el hallazgo de conjunto.** Una pasada de calcabilidad deshizo un arreglo de nivel sin
> saberlo, porque el veredicto de nivel anterior nunca se pegó en el archivo como bloque cerrado.
> Las tres pasivas viven **solo en el molde**: `grep` sobre las otras siete fichas devuelve cero.
> Si se copia el molde antes de arreglarlo, se copian ocho veces.

### Bloque R — prosa fuera del A2 leído

| # | dónde | qué hay | por qué se cae | qué entra | coste |
|---|---|---|---|---|---|
| **R1** | **B · `Where you are`** (la oración fundida) | `It is Tuesday, 3:40 in the afternoon, and you are in the back room tying your apron, with your shift twenty minutes away and Nayibe at the other café until six.` | 31 palabras: principal coordinada + participio adjunto (`tying`) + **dos absolutas con `with`**. §11 pide «oraciones cortas y completas, cero subordinación larga». Y `twenty minutes away` usa `away` en sentido temporal, que un A2 lee como distancia | `It is Tuesday, 3:40 in the afternoon, and you are tying your apron in the back room. Your shift starts in twenty minutes, and Nayibe is at the other café until six.` | **+1 B** |
| **R2** | **A · `Where you are`** | `…in the back room of the café, with the machine off and Nayibe at the other one.` | dos problemas: la absoluta con `with`, y **`the other one` no tiene antecedente claro**. El más cercano es `the machine`, así que se lee «Nayibe en la otra máquina» — que contradice la restricción 3 («she is at the Autopista café until six»). Es un fallo de comprensión, no de estilo | `…and you are in the back room. The machine is off, and Nayibe is at the other café.` | **−2 A** |
| **R3** | **B · `You can't` 1** (la condición) | `Your one condition is the way to be safe, and you don't negotiate it: today, in writing, the café group says **that they asked you for it**.` | (a) completiva de reporte sin anclaje A2; (b) 24 palabras con tres capas; (c) `the café group says` es metonimia (habla un grupo de WhatsApp); (d) `count as` idiomático. **Es la oración más difícil de la ficha y describe la pieza que decide el desenlace** | `You can't say yes to anything Nayibe can call swap number three. You have one condition and you never change it: today they have to ask you for it in the café group, in writing.` Hablado queda: `I can do it, but only if you ask me in the group today.` — sin completiva | **−5 B** |
| **R4** | B · `You want` | `But not by working sixteen hours, and not if this counts as your third swap.` | **no es una oración completa** (fragmento), y `by + -ing` no tiene tema en el registro. §11 corregido el 21 ago prohíbe el telegrama en la prosa | `But you don't want to work sixteen hours, and this can't be your third swap.` | **0 B** |
| **R5** | B · `Only you know` 1 | `You read in the group on Friday that forty people are coming…` | 22 palabras; el verbo queda a cinco palabras de su completiva; y **`read` es homógrafo**: en papel, un A2 no sabe si es presente o pasado hasta llegar a `on Friday` | `On Friday you read in the group that forty people are coming for a company breakfast. It is at nine on Saturday the 12th.` | **+2 B** |
| **R6** | A · `Your toolkit` | `are your words and nobody else's in that back room` | genitivo elíptico de `nobody else`. El registro tiene `possessive-s` sobre nombres, no esto | `are your words. Nobody else in that back room uses them` | **+1 A** |
| **R7** | A · `Only you know` 1 | `if they learn that, the favor costs you more` | condicional cero (presente + presente). `first-conditional` enseña `if` + presente → **will**, y marca *«If you study, you pass» ❌* como error en contexto futuro. La ficha enseña por exposición lo contrario de lo que enseña su propio tema | `if they learn that, the favor will cost you more` | **+1 A** |
| **R8** | B · `You did it if` | `You never once said that the problem is theirs.` | `never once` es enfático idiomático; `theirs` es posesivo pronominal sin tema | `You never said that this is their problem.` | **−1 B** |
| **R9** | B · `Your toolkit` | `**5** (yours has numbers in it)` | mismo posesivo pronominal | `**5** (your reason has numbers in it)` | **+1 B** |
| **R10** | B · `Your toolkit` | `You have a card to drop, and **what you choose is when**.` | pseudo-hendida con complemento wh desnudo. Sintaxis B1 larga | `You have a card to drop, and you choose the moment.` (`the moment` es cognado de *el momento*) | **−1 B** |
| **R11** | B · `Only you know` 2 | `…that the third one puts you on the back-up list, **with no more fixed weekends**.` | tercera absoluta con `with`; `no more` como determinante no está en `quantifiers`; `the third one` es ordinal como pronombre, sin tema | `…that the third swap puts you on the back-up list. Then you lose your fixed weekends.` | **+1 B** |
| **R12** | B · `You did it if` | `You are out by 8:00 p.m.` | `be out` idiomático y `by` de plazo, que `prepositions-time` no cubre (solo in/on/at) | `You leave before 8:00 p.m.` — y coincide palabra por palabra con su restricción («can't stay after 8:00 p.m.») | **−1 B** |
| **R13** | A · `You did it if` | `You put two ways to split it **on the table** before they said yes.` | **el mismo modismo que R3 del informe anterior sacó de `You can't` 2**, sobrevivió en el criterio que comprueba esa misma restricción. Y `you both said **who and at what time**` son dos preguntas incrustadas, la clase que la fila 18 de la pasada quirúrgica ya arregló en otro sitio | `Someone opens on the 12th, and you both said the name and the hour. You offered two ways to split it before they said yes.` — el criterio pasa a decir lo mismo que la restricción | **−3 A** |
| **R14** | A · `You did it if` | `You brought up the change in your own Saturday yourself, before closing.` | phrasal `bring up` + `yourself` enfático + gerundio tras preposición, todo en doce palabras | `You told them about the change in your own Saturday before you closed.` | **+1 A** |
| **R15** | A · `You did it if` | `Nobody found out who else you asked.` | pregunta incrustada (misma clase que la fila 18) + phrasal | `Nobody knows about Katherine and Elkin.` | **−1 A** |
| **R16** | A · `You can't` 1 | `You can't offer money, because Nayibe said in front of everybody that nobody pays anybody for a shift.` | 18 palabras y tres capas; el verbo queda a cinco palabras de su completiva; y `nobody … anybody` es concordancia negativa sin tema, la trampa clásica del hispanohablante | `You can't offer money. Nayibe said in front of everybody that nobody pays for a shift here.` | **−1 A** |

### Bloque T — reparto de la caja

| # | qué | por qué | qué entra | coste |
|---|---|---|---|---|
| **T1** | **ROLE A no tiene el bloque 3 `[receives]`** (`Yours: 1, 2, 4, 5, 6, 8. Not 3, not 7.`) | El vocabulario de B contiene cuatro palabras que **A nunca ve glosadas y B le va a decir**: `the back-up list`, `to be short-staffed`, `a rush`, `to double a shift`. La ficha marca a A como `[jargon]` (IELTS, Speaking, exam center) y a B como `[receives]`, pero el argot **va en las dos direcciones**. Sin el bloque 3, A no tiene con qué pedir que se lo repitan. **El escenario 1 sí da el bloque 3 a los dos roles**: el molde es el que se sale, y es el que se copia | `Yours: **1** \`[asks]\`, **2**, **3** \`[receives]\`, **4** \`[jargon]\` … **5**, **6** and **8**. Not 7.` | **0 A** (+2 y −2) |

### Bloque V — variedad americana (§11)

| # | qué | por qué | qué entra | coste |
|---|---|---|---|---|
| **V1** | `stock count` (4 sitios: prosa de A, tabla de datos, vocabulario, exponente) | En inglés americano una tienda hace **`inventory`**. `stock count` / `stocktake` es británico. Y `inventory` es cognado de *inventario*: más americano **y** más fácil para el estudiante. §11 fija la variedad para los 8 escenarios y los 23 niveles que vienen | `the inventory` en los cuatro sitios (solo la prosa cuenta presupuesto) | **−1 A** |
| **V2** | `back-up list` | En inglés americano el sustantivo es `backup`, una palabra | `the backup list` | 0 |
| **V3** | **caja común**, bloque 1: `you called them, not the other way round` | `the other way round` es británico; americano es `the other way around`. **No es de este escenario: es de `caja-de-herramientas-a2.md`, que leen los dieciséis roles** | `the other way around` | 0 (otro archivo) |
| **V4** | `how it ends`, punto 1: `on Saturday 12` | el resto de la ficha dice `Saturday the 12th`. En americano se dice con `the` y ordinal; la mezcla obliga al estudiante a leer dos formatos del mismo dato | `on Saturday the 12th` | 0 |

### Bloque X — se quedan, dichos como lo que son

| # | qué | decisión |
|---|---|---|
| **X1** | `How about …?` y `How does … work for you?` | Se quedan **como fórmulas memorizadas**, no como formas productivas. Ninguna tiene tema; ninguna exige estructura nueva; las dos son troncos con hueco. Constará así en `grammarReferences`, en la nota final |
| **X2** | `My bus leaves at …` (presente simple con valor de horario futuro) | Se queda. La **forma** es idéntica a la que enseña `present-simple-affirmative` (*The class starts at eight*); lo nuevo es la lectura, y sale del contexto. El registro no tiene tema del presente de horario en ningún nivel: se deja constancia, no se cambia el dato |
| **X3** | `If you walk away with nothing` (rótulo de sección) | Modismo, pero es **etiqueta fija del set**: el estudiante la ve dieciséis veces y el propio texto que sigue la glosa. Cambiarla aquí obliga a cambiar ocho fichas. Se deja **anotada para el puerto a A1**, donde `walk away with` no será transparente |
| **X4** | `drop the card` / `You dropped the forty-people breakfast` | Metáfora, pero aparece tres veces en la ficha de B y el propio escenario la enseña. Se deja |
| **X5** | columna `what it does here` de B: `warn them it weighs more than they think` | Es la celda menos legible de las dos fichas (metáfora + comparativa + `that` omitido). No es defecto de nivel de una forma que se diga, pero conviene: `warn them: this favor is bigger than they think`. **Opcional, coste 0** (tabla) |

---

## 4 · La prosa es A2 leído — resultado del barrido

Barridas las **32 oraciones de prosa** de las dos fichas más la carta y el cierre. Fuera de nivel:
las 16 de **R** y las 5 de **N**. Las demás cumplen: cortas, completas, sobre el jugador, presente
o pasado simple, y ninguna decible tal cual.

Lo que **sí** está bien y merece quedar escrito, porque es lo que el molde tiene que enseñar:

- `You already swapped twice this month.` — `already` con past simple es **americano correcto** y
  está bien elegido frente al present perfect británico. Punto a favor del molde.
- `you have not said that yet` — present perfect **normal**, con `yet`, sin `for` ni `since`.
  Anclado en `present-perfect-ever-never`.
- `the money you paid for it` y `anything Nayibe can call swap number three` — relativas de
  contacto. **Están ancladas**: `relative-clauses-a2` enseña explícitamente la omisión del relativo
  en función de objeto (*The book (that) I read*). No se tocan.
- `Your fixed weekends are the days that pay you in tips.` — relativa con `that`, anclada.
- `there's no new date` — `there is no + sustantivo` está aceptado literalmente en
  `there-is-there-are`.
- `you are going to need exactly this favor next month` — `going-to` A1.
- `That opening is the worst shift of the month` — `superlatives` A2.

**Carta (pantalla aparte, no cuenta presupuesto), un menor:**
`Maybe you agreed that you come in after the exam, and now you can't.` — `agreed that you come` es
concordancia temporal rota; el inglés natural pide `would come`, que es B1. Sale del nivel por los
dos lados. Alternativa A2 sin reporte: **`Maybe your plan was to come in after the exam. Now that
plan does not work.`** Si calcabilidad la rechaza por decible, la restricción de nivel es: **ni
reporte con verbo desplazado, ni pasiva**; §11 autoriza forma de nota en la carta.

---

## 5 · Los datos duros son decibles

| dato | forma | tema que lo sostiene | veredicto |
|---|---|---|---|
| 3:40 · 7:00 · 1:30 · 8:00 · 5:00 · 6:30 | `three forty`, `one thirty`, `six thirty` | `telling-time` A1 (autoriza la forma digital) | ✅ |
| `Saturday the 12th` · `Friday the 18th` · `Monday the 14th` | `on` + fecha con ordinal | `prepositions-time` A1 (*on July 5th*) | ✅ |
| `Tuesday, September 8` | `on September 8` | `prepositions-time` A1 (*on June 15*) | ✅ |
| `at nine` · `after eight` · `until six` | preposición + hora | `prepositions-time` + `telling-time` | ✅ |
| `45,000` · `110,000` · `more than a million` | léxico numeral | **ninguno**: el registro de inglés no tiene tema de numerales en ningún nivel | ✅ se dice igual; la ficha ya pone `about` delante de cada cifra, que es lo que permite redondear. **Hueco del registro, no del escenario** |
| `forty people` · `sixty people` · `sixteen hours` · `two swaps` | numeral + contable plural | `quantifiers` A2 · `plural-nouns` A1 | ✅ |
| `by 8:00 p.m.` | plazo con `by` | ninguno (`prepositions-time` solo in/on/at) | ❌ → **R12**, se dice `before 8:00 p.m.` |

**Nada que cambiar en los datos.** Solo la preposición de R12.

---

## 6 · La ruta mínima — se escribe entera en A2, y por eso el escenario cabe

Siete turnos por rol, carta al turno global 6, cierre en cinco puntos. Escrita **con la ficha ya
corregida**. Solo A2 y solo formas de la tabla forma→tema de §2.

| turno | quién | línea | anclajes |
|---|---|---|---|
| 1 | A | `Hi — can we talk for a second? Can I ask you a favor? I'm taking the IELTS on Saturday the 12th at eight.` | caja 1 · `can-ability` · `present-continuous-future-a2` · `prepositions-time` |
| 2 | B | `What exactly do you need — the opening or the closing?` | `present-simple-questions` · `wh-questions` |
| 3 | A | `The opening. We can do it two ways: you open and I come in at two, or you do seven to eleven and I do eleven to three.` | `can-ability` · `telling-time` · `connectors-a2` |
| 4 | B | `There's a reservation for forty people at nine. That shift is not a normal shift. And I did two swaps this month. Nayibe said the third swap puts me on the backup list.` | `there-is-there-are` · `verb-to-be` · `past-simple-irregular` · `quantifiers` |
| 5 | A | `There's a problem: I paid more than a million pesos and there's no new date. I can take your shift on Friday the 18th.` | `there-is-there-are` · `past-simple-irregular` · `comparatives` · `can-ability` |
| 6 | B | `What if you come in after the exam?` → **se abre la carta** | `first-conditional` |
| 7 | A | `There's a problem. I have to be free from three to six. I can be here at six thirty.` | `have-to-must` · `telling-time` |
| 8 | B | `I can do it, but only if you ask me in the group today. My bus leaves at five on Sunday, so I can't stay after eight.` | `first-conditional` · `can-ability` · `connectors-a2` · `present-simple-affirmative` |
| 9 | A | `OK. I'll write it now. I'll do the inventory on Monday the 14th.` | `will-future` · `prepositions-time` |
| 10-14 | los dos | `You open at seven.` · `You stay until six thirty.` · `I come in at six thirty and I close.` · `You do the inventory on Monday the 14th.` · `I asked you for the swap — the name goes in the message.` · `We can't stay after eight. You ask Nayibe before six.` | `telling-time` · `past-simple-irregular` · `object-pronouns` · `can-ability` |

**Ningún turno pide una estructura de fuera del nivel.** Y dos comprobaciones que son las que
deciden:

- **Con el punto 4 en pasiva, el cierre no se escribe en A2.** `I asked you for the swap` sí;
  *the swap was asked for* no tiene tema hasta B1. Ése es N1.
- **Con la condición de B como está hoy, el turno 8 no se escribe en A2**: obliga a
  `the message says that you asked me`. Con R3 aplicado, el turno 8 sale entero con
  `first-conditional` + presente simple. Ése es el cambio que decide el desenlace.

---

## 7 · Bandas, tablas y las tres reglas nuevas de la tabla de exponentes

| Qué | Declarado | Techo §4 / §11 | |
|---|---|---|---|
| Minutos | 7, en las dos pantallas y en la cabecera | 5-8 | ✅ |
| Turnos por rol | «About 7 turns **each**», misma palabra en las tres | 6-9 | ✅ |
| Prosa | A **436** · B **443** (medido hoy) | 450 | ✅ · con los 22 cambios: **431 / 441** |
| Datos | A 8 filas · B 10 | ≤ 10 | ✅ |
| Vocabulario | A 10 · B 10, una entrada por fila | 8-10 | ✅ |
| Exponentes | A 6 · B 6 | 6-9, y **≤ turnos declarados (7)** | ✅ |

Las tres reglas que entraron en §11 con `ed220acf`, comprobadas sobre el archivo de hoy:

1. **Agrupada por función y alfabética por función.** A: *asking about theirs · asking for it ·
   bad news · paying it back · splitting it · the exam*. B: *another way · asking what they need ·
   granting it · the bus on Sunday · the nine o'clock reservation · what saying yes costs you*.
   ✅ las dos.
2. **La fila que concede, ni primera ni última.** `granting it` cae **tercera de seis** en B, y se
   llama exactamente como §11 manda. ✅ El renombrado del 22 ago hizo su trabajo.
3. **Ninguna etiqueta nombra un momento ni lleva palabras literales del cierre.** `the bus on
   Sunday` y `the nine o'clock reservation` nombran **asunto**, no posición: el domingo y las nueve
   pertenecen al mundo del escenario, no al orden de la conversación. ✅ Y ninguna secuencia de
   filas reproduce el arranque (que está partido entre las filas 2 y 6 de A) ni el cierre.

**Nada que cambiar en la cabecera, en las tablas ni en el orden.** El renombrado y el reordenado
son correctos y este informe los da por buenos.

---

## 8 · `grammarReferences` — **sigue haciendo falta**, y aquí está entero

Comprobado sobre el archivo de hoy: el molde **sigue sin bloque `grammarReferences`**. Es la única
de las ocho fichas sin él (`fase7-fichas-1`, `-2` y `-4` lo tienen, en su propia sección `##`). La
pasada quirúrgica lo dejó fuera a propósito —«es una pieza nueva, no una línea citada»— y esa razón
ya no vale: esto no es una pasada quirúrgica, es la recalibración del molde.

**Dónde va:** en su propia sección `## \`grammarReferences\` — escenario 3`, como en el escenario 1.
**No cuesta presupuesto**: el contador solo mide de `## ROLE A` / `## ROLE B` hasta la siguiente
cabecera de nivel 2.

**Qué cambia frente al bloque de `fase9-nivel-3` §8** (que nunca se pegó):

- `quantifiers` ya **no** se justifica con `nobody pays anybody` — el tema no cubre `nobody` ni
  `anybody`. Se justifica con lo que sí enseña: `how many`, `not many`, `a lot of`, `some`, `any`.
- entran `relative-clauses-a2`, `superlatives` y `object-pronouns`, que el bloque anterior no tenía
  y que sostienen tres piezas reales (las relativas de contacto de la prosa, la carta grande de B, y
  el punto 4 del cierre ya sin pasiva).
- `present-perfect-basic` se sustituye por `present-perfect-ever-never`, que es el tema que
  realmente enseña `already` y `yet`, que es el uso del escenario.
- `will-future` y el resto conservan la rationale, con `inventory` en vez de `stock count`.

Diecisiete entradas (el escenario 1 lleva catorce). Si se quiere el mismo tamaño, el orden en que
se caen es: `superlatives`, `relative-clauses-a2`, `comparatives`.

```ts
grammarReferences: [
  { slug: 'first-conditional', level: 'a2', title: 'El Primer Condicional en Inglés A2',
    rationale: 'El acto de B es conceder-con-condicion y se pronuncia aquí: "I can do it, but only if you ask me in the group today". El tema autoriza literalmente can dentro de la cláusula if ("If you can come, please let me know"), que es lo que hace decible la condición sin discurso indirecto. También sostiene "What if you …?", el tronco con que B propone en vez de negar.' },
  { slug: 'have-to-must', level: 'a2', title: 'Have to y Must en Inglés A2',
    rationale: 'Los dos límites duros del escenario son obligaciones, no gustos: "I have to be free from three to six" (A, después de la carta) y "I have to leave at eight" (B, por el bus). El tema también trae "don\'t have to" (no es necesario), que es como B usa el bloque 3 de la caja sin quedar mal.' },
  { slug: 'will-future', level: 'a2', title: 'El Futuro con Will en Inglés A2',
    rationale: 'El pago del favor se compromete en will y con fecha exacta: "I\'ll do the inventory on Monday the 14th", "I\'ll write it in the group now". El tema separa este uso —decisión que se toma en el momento— del going to, que es lo que distingue una promesa de un plan.' },
  { slug: 'present-continuous-future-a2', level: 'a2', title: 'Present Continuous para el futuro en Inglés A2: planes concretos',
    rationale: 'El plan fijo de A es un presente continuo con expresión de tiempo, que el tema declara esencial: "I\'m taking the IELTS on Saturday the 12th". Y la interrogativa del propio tema ("Are you working next Saturday?") es la que sostiene el exponente con que A abre por el lado del otro: "What are you doing on Saturday?".' },
  { slug: 'past-simple-irregular', level: 'a2', title: 'Past Simple Verbos Irregulares en Inglés A2',
    rationale: 'Los cuatro verbos que cargan el pasado del escenario son irregulares: paid ("I paid more than a million pesos"), did ("I did two swaps this month"), said ("Nayibe said the third swap puts me on the backup list") y el del punto 4 del cierre: "I asked you for the swap" — que solo es decible en activa.' },
  { slug: 'past-simple-questions', level: 'a2', title: 'Preguntas y Negativos en Past Simple A2',
    rationale: 'La pregunta que A no puede contestar y que su propia ficha le anuncia —"Who else did you ask?"— es past simple directo, con did y sin inversión rara. Es la razón de ser del bloque 6 de la caja.' },
  { slug: 'present-perfect-ever-never', level: 'a2', title: 'Present Perfect con Ever, Never, Already y Yet',
    rationale: 'Lo que queda pendiente —el punto 5 del cierre— se dice con already y yet: "I haven\'t talked to Nayibe yet", "Have you already written it in the group?". Es present perfect de experiencia y de balance, sin for ni since: la duración se queda fuera de A2.' },
  { slug: 'quantifiers', level: 'a2', title: 'Cuantificadores en Inglés A2',
    rationale: 'El tamaño del favor se discute contando: "How many people are coming?" — "Forty", "There aren\'t many people on Saturday morning", "I don\'t have much time", "a lot of tips". El escenario entero se juega en cuántos, y sin estos el estudiante dice números sueltos sin marco.' },
  { slug: 'comparatives', level: 'a2', title: 'Comparativos en Inglés A2',
    rationale: 'B defiende su coste comparando: "the wedding is bigger than a normal Saturday", "110,000 is more than 45,000". Y A cifra lo que pierde con la misma estructura: "more than a million pesos". Sin comparativo, el coste de cada lado se dice como queja, no como dato.' },
  { slug: 'connectors-a2', level: 'a2', title: 'Conectores en Inglés A2: because, so, although, however, but',
    rationale: 'La columna vertebral de dar razones, que es el acto A2 del escenario: "I want to help, but sixteen hours is too much", "my bus leaves at five, so I can\'t stay after eight", "because there\'s no new date". El but es además lo que sujeta el exponente de concesión de B.' },
  { slug: 'relative-clauses-a2', level: 'a2', title: 'Cláusulas de relativo en Inglés A2: who, which, that',
    rationale: 'Sostiene lo que se dice y lo que se lee. Se dice: "the person who opens", "the shift that pays it back", "the days that pay me in tips". Y se lee: la ficha usa dos relativas de contacto ("the money you paid for it", "anything Nayibe can call swap number three") y este tema es el que enseña que el relativo se omite cuando es objeto.' },
  { slug: 'superlatives', level: 'a2', title: 'Superlativos en Inglés A2',
    rationale: 'La carta grande de B es un superlativo: "That is the worst shift of the month". Es la frase que cambia el tamaño del favor, y sin el tema se dice "that shift is very bad", que no obliga a A a mover nada.' },
  { slug: 'can-ability', level: 'a1', title: 'Can para habilidad en inglés A1',
    rationale: 'Sostiene la petición, la propuesta y la concesión de los dos lados: "Can I ask you a favor?", "Can we write it in the group today?", "We can do it two ways", "I can be here at six thirty", "I can do it, but only if…". El tema cubre explícitamente permiso y petición, y sustituye a los "Could I…?" de cortesía que el registro no ancla en ningún nivel.' },
  { slug: 'telling-time', level: 'a1', title: 'Decir la hora en inglés A1',
    rationale: 'El punto 1 del cierre exige quién abre y a qué hora, y el escenario entero son horas: 7:00, 3:00, 8:00, 1:30, 6:30. El tema autoriza la forma digital (three forty, six thirty), que es la única que hace decibles 3:40 y 6:30 sin quarter past ni half past.' },
  { slug: 'prepositions-time', level: 'a1', title: 'Preposiciones de tiempo en inglés A1',
    rationale: 'La fecha exacta con que se paga el favor no vale sin la preposición: "on Saturday the 12th", "on Friday the 18th", "at eight", "in the afternoon". El tema trae on + día y on + fecha con ordinal, que es exactamente el formato de los datos duros.' },
  { slug: 'there-is-there-are', level: 'a1', title: 'There is / There are en inglés A1',
    rationale: 'Las dos malas noticias del escenario entran con there is: "There\'s a problem: …" (A, cuando llega la carta) y "There\'s a reservation for forty people at nine" (B, su carta grande). Y la pérdida de A se dice en negativa: "there\'s no new date", forma que el tema acepta.' },
  { slug: 'present-simple-questions', level: 'a1', title: 'Present simple interrogativo en inglés A1',
    rationale: 'Las dos preguntas abiertas obligatorias son present simple con do/does: "What exactly do you need — the opening or the closing?" (B, antes de contestar nada) y "How does Saturday work for you?" (A). La primera es la que impide que B conceda a ciegas.' },
]
```

**Nota que acompaña al bloque, para que nadie invente slugs después:** dos exponentes del escenario
no tienen tema en ningún nivel del registro de inglés y **se quedan como fórmulas memorizadas**, no
como formas productivas: `How about …?` (B) y la acepción de `work` en `How does … work for you?`
(A). Ninguna exige estructura nueva —las dos son troncos con hueco— y ninguna justifica subir el
escenario de nivel; sí justifican que la ficha las entregue enteras. Igual con `reported-speech`,
que solo existe en B1: por eso la condición de B se reescribe sin completiva (R3).

---

## Devuelto a `habla-fichas-de-rol`

**22 cambios. Ninguno de motor.** No se tocan: la asimetría, la condición única de B, las tres
salidas, el cierre en cinco puntos, los datos duros, los minutos, los turnos, el orden ni las
etiquetas de las tablas de exponentes, ni el reparto de bloques de la caja **salvo T1**.

| bloque | qué | coste A | coste B |
|---|---|---|---|
| N1-N3 | pasivas del cierre (regresión de `ae708726`) + entradilla | — | — |
| N4 | pasiva en `You want` de A | 0 | — |
| N5 | pasiva `the ticket is paid` | — | +1 |
| R1-R5 | la oración fundida de B, `the other one` de A, la condición de B, el fragmento de `You want`, el homógrafo `read` | −2 | −2 |
| R6-R12 | posesivos pronominales, condicional cero, pseudo-hendida, `never once`, `no more`, `by 8:00` | +2 | 0 |
| R13-R16 | `on the table`, preguntas incrustadas y phrasals en los criterios y en `You can't` 1 | −4 | — |
| T1 | bloque 3 `[receives]` para A | 0 | — |
| V1-V2 | `stock count` → `inventory`, `back-up` → `backup` | −1 | — |
| V4 | `Saturday 12` → `Saturday the 12th` | — | — |
| §8 | pegar el bloque `grammarReferences` en su propia sección `##` | 0 | 0 |
| **total** | **verificado con `prosa-canonica.mjs` sobre el archivo real** | **436 → 431** | **443 → 441** |

**Fuera de este archivo, uno solo:** `caja-de-herramientas-a2.md`, bloque 1 —
`the other way round` → `the other way around` (V3). Lo leen los dieciséis roles.

**Y el aviso de conjunto:** las tres pasivas (N1, N2, N4) y la oración fundida (R1) viven **solo en
el molde**; `grep` sobre las otras siete devuelve cero. Este archivo es del que se copian los otros
siete y los 23 niveles que vienen. Arreglarlo aquí cuesta 22 renglones; copiarlo cuesta ocho veces
eso, y después ya nadie sabe de dónde salió.
