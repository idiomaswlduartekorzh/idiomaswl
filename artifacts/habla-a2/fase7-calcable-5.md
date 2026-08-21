# Escenario 5 · `late-again-on-monday` — ¿se puede leer en voz alta? · **ronda 2**

Auditoría de calcabilidad contra §11 del blueprint (`docs/habla-acompanado-blueprint.md`,
líneas 250-258):

> La ficha se escribe **en notas, no en frases**. `Exam: Saturday 12, 8:00 a.m.` sí.
> `I'm taking the exam on Saturday at eight.` no, jamás, ni en los datos ni en la situación ni
> en los objetivos. Las frases decibles viven **solo** en la tabla de exponentes, que es donde
> el estudiante sabe que va a buscarlas.
>
> Prueba para el redactor: si una línea de tu ficha se puede decir tal cual en la conversación y
> el turno avanza, esa línea está mal escrita. Reescríbela como dato.

Y, para el bloque de vocabulario, el disparador explícito de §11 (línea 279):

> Si la celda contiene algo entrecomillado o algo que empiece por **un pronombre y un verbo
> conjugado**, reescríbela.

Auditado: `artifacts/habla-a2/fase7-fichas-5-late-again-on-monday.md`, versión del árbol de
trabajo (21 ago 2026). La ronda 1 está guardada íntegra en
`artifacts/habla-a2/fase7-calcable-5-ronda1.md`; sus líneas ya no corresponden a este fichero.

Fuera de alcance por diseño: las dos tablas *Say it here* (80-88 y 161-169), que son exponentes y
ahí las frases van a propósito; el metadato de producción de la carta (198-201), el bloque
*After* (215-219) y todo lo que va de la línea 221 abajo (`grammarReferences`, presupuesto y
hallazgos), que están en español o son metadato de código y no llegan a pantalla.

## Cómo se marcó cada línea

Mismas tres marcas que en los escenarios 1 y 2 y que en la ronda 1, para que los informes se
puedan comparar:

- **FALLA** — la línea, o una cláusula autónoma donde el ojo puede parar, es un enunciado inglés
  bien formado que ese rol le puede decir al otro **tal cual** y el turno avanza.
- **RIESGO** — es oración, pero dicha verbatim apunta mal: hace falta un cambio (un pronombre, un
  posesivo, un subordinante) para que funcione en la boca.
- **META** — es oración, pero dicha en voz alta no produce nada: instrucciones al jugador
  (`Don't show it`), criterios en pasado (`You said sorry once`), acotación escénica. No cuentan.

**Las filas de tabla se leen de corrido, etiqueta incluida.** Una unidad puede llevar más de un
riesgo: se cuentan cláusulas, no renglones.

---

## Veredicto

**PASA CON CAMBIOS.** Cinco fallas sobre 112 unidades de pantalla en inglés (4,5 %), y trece
cláusulas a un pronombre de fallar.

| escenario | unidades | FALLA | % | graves |
|---|---|---|---|---|
| 1 · `the-bike-in-the-parking-lot` | 73 | 7 | 9,6 % | — |
| 2 · `no-appointment-until-thursday` | 94 | 18 | 19,1 % | 3 |
| 5 · `late-again-on-monday` — ronda 1 | 111 | 5 | 4,5 % | 1 |
| **5 · `late-again-on-monday` — ronda 2** | **112** | **5** | **4,5 %** | **1** |

**Las cinco de la ronda 1 están arregladas. Las cinco de esta ronda son otras cinco líneas.**
Once de los doce riesgos de la ronda 1 también se cerraron. El fichero no empeoró: cambió de
sitio el defecto.

**El hallazgo que importa no es el número, es la trazabilidad:** las cinco fallas de hoy están
**todas** en líneas que esta ronda escribió o tocó, y **cuatro de las cinco sustituyeron una
frase decible por otra frase decible**. Se cambiaron las palabras y se conservó la forma. Abajo,
línea a línea contra `git show HEAD:`.

**La grave** es la restricción 1 de Liliana: el motivo que tiene prohibido decir está impreso
como primer condicional entero, listo para leer — y es la línea que el propio fichero declara
haber arreglado en esta ronda.

---

## Dónde se concentran

| sección | unidades | FALLA | RIESGO | estado |
|---|---|---|---|---|
| **`You can't` (restricciones)** | 6 | **2** | 0 | **la novedad mala**: en la ronda 1 iba a cero |
| **Vocabulario, columna `here`** | 20 | **3** | 3 | **la peor otra vez, la tercera ronda seguida** |
| `Only you know` (dato oculto) | 5 | 0 | 3 | la grave de la ronda 1 se cerró; queda el tercer secreto de B en casi-prosa |
| `Your toolkit` | 2 | 0 | 3 | dos unidades, tres cláusulas |
| Nota de registro (`>` inicial) | 2 | 0 | 2 | **retrocede**: la de B era el modelo y ahora tiene dos verbos conjugados |
| `Before you speak` (B) · `Your screen only` | 3 | 0 | 1 | |
| La carta | 8 | **0** | 1 | sigue limpia |
| **Facts** (10 + 10 filas) | 20 | **0** | 0 | **limpia** — en la ronda 1 fallaban 2 |
| Vocabulario, columna `what it is` | 20 | **0** | 0 | limpia, 20/20, tercera ronda sin una sola |
| `Where you are` (situación) | 2 | **0** | 0 | limpia — la narración de A se pasó a nota |
| `You want` (objetivo) | 2 | **0** | 0 | limpia |
| `If you walk away with nothing` | 2 | **0** | 0 | limpia |
| `You did it if` (criterios) | 14 | **0** | 0 | limpia — texto meta en pasado |
| `Both screens — how it ends` | 6 | **0** | 0 | limpia (tres frases prescritas, a propósito) |

Reparto por rol: **A falla 2** (líneas 33 y 67), **B falla 3** (115, 146, 149). En riesgos el
desequilibrio es fuerte: **A 3, B 10**.

---

## La concentración que explica el informe entero

**La reescritura movió las palabras y dejó la forma.** Esto es lo que se ve al poner cada falla
de hoy al lado de lo que había en el mismo sitio en `HEAD`:

| hoy | en `HEAD` | qué pasó |
|---|---|---|
| 33 · `If the store finds out, the promotion goes to somebody else.` | `If they find out, the job goes to somebody else.` | condicional decible → **condicional decible**. La línea se reescribió entera para sacar `want out` y nadie miró la oración |
| 67 · `…· that is why the keys matter` | `…— that's the job you want` | pronombre + cópula → **pronombre + cópula**. Celda nueva, forma vieja |
| 115 · `Write the WHAT CHANGES line yourself.` | `Fill out the WHAT CHANGES line yourself.` | imperativo decible → **imperativo decible, y más fácil de decir**: se cambió la jerga (`fill out`→`write`), que era el defecto que se estaba arreglando |
| 146 · `…· nobody else teaches them` | `two of them, and you give them yourself` | cláusula conjugada → **cláusula conjugada**. Entrada nueva (`training` entró a B en esta ronda), forma heredada |
| 149 · `…· and you have one too` | `you can write it, and it costs you too` (celda `written warning`) | cláusula conjugada → **cláusula conjugada**. Entrada nueva (`your file` entró a B), forma heredada |

Ninguna de las cinco es descuido de una línea que nadie miró: **las cinco están en renglones que
esta ronda abrió**. El canje de vocabulario documentado en el propio fichero (`warehouse` y
`delivery note` entran en A; `training` y `store folder` entran en B) trajo tres de ellas.

**Regla operativa para las fichas que falten:** cuando se canjea una entrada de vocabulario o se
reescribe una restricción, **la celda nueva se audita contra §11 antes de darla por buena**, igual
que si fuera una ficha nueva. Cambiar el contenido de una celda no la hereda limpia: hereda su
forma, que es justo lo que §11 prohíbe.

---

## La grave — el motivo que no se puede decir, escrito para decirlo

### 1 · GRAVE — restricción 1 de Liliana, en primer condicional
**Línea 33**, ROLE A, `You can't`:

> `1. Say why you can't work on Saturday mornings. If the store finds out, the promotion goes to somebody else. Say no to the day. Don't say why.`

`If the store finds out, the promotion goes to somebody else.` — diez palabras, primer
condicional bien formado, sujetos impersonales, cero pronombres que haya que girar. Se lee tal
cual y el turno avanza: es una explicación completa de lo que está en juego.

Tres cosas la hacen la peor línea del fichero:

1. **Está en el renglón que le prohíbe explicarse.** La restricción dice `Don't say why` dos
   frases después de imprimirle un porqué listo para pronunciar. Si el estudiante lee su ficha en
   voz alta —que es el riesgo entero que §11 existe para cerrar—, lo primero que se cae es la
   restricción que sostiene el escenario.
2. **Es una de las diez estructuras declaradas del escenario.** `first-conditional` está en la
   lista de `grammarReferences`, y su `rationale` **cita esta misma línea** como ejemplo de «lo
   que Liliana no puede decir». La ficha le entrega hecha, fuera de la tabla de exponentes, una
   instancia de la estructura que el ejercicio existe para hacerle producir.
3. **El fichero declara de sí mismo que arregló esta línea.** El hallazgo 6 (línea 314 y
   siguientes) dice que `want out` está ahora fuera «con la línea entera reescrita como primer
   condicional». Se reescribió, sí — y la reescritura es el defecto. Y el propio hallazgo 6
   avisa, dos renglones más abajo, de por qué esto es caro: *«Una ficha que declara de sí misma un
   cambio que no hizo es peor que el fallo»*. Aquí hizo el cambio y el cambio empeoró la línea,
   que es la versión siguiente del mismo problema.

**Reescritura:**

> `1. Say why you can't work on Saturday mornings. The store finding out = the promotion to somebody else. Say no to the day. Don't say why.`

(Gerundio nominal y `=`, los dos ya usados en este mismo fichero: línea 118, `one written today =
the question back`, y línea 195 en la carta. Diez palabras → nueve; el `=` no cuenta como palabra
para `prosa.mjs`.)

**Y hay que tocar una segunda cosa:** el `rationale` de `first-conditional` (línea 229) cita esta
frase como segundo ejemplo. Al desaparecer de pantalla, la cita se queda sin respaldo. La primera
mitad del `rationale` —el exponente 169 de Amparo, `If you write this line today, I can give you
the keys.`— sí está impresa donde debe, en la tabla de exponentes, y sostiene sola la referencia.
Se borra la segunda mitad de la frase del `rationale`, desde `También lo que Liliana no puede
decir`.

---

## Las otras 4 que fallan

### 2 · Línea 67 — ROLE A, vocabulario, celda `here` de `delivery note`
> `| delivery note | the paper that says what comes on the truck | signed by the person who opens the store · that is why the keys matter |`

La primera mitad de la celda es nota impecable —participio, sin verbo conjugado— y es
exactamente la reescritura que pidió la ronda 1 para la fila de datos. La segunda mitad,
`that is why the keys matter`, es pronombre + cópula: el disparador que §11 nombra por su nombre.
Dicha tal cual, después de explicar el papel del camión, es el argumento de Liliana para pedir
las llaves y el turno avanza.

Es además la celda que la ronda anterior tenía como `that's the job you want`: **la misma forma,
con otro complemento**.

**Reescritura:** `| delivery note | the paper that says what comes on the truck | signed by the person who opens the store · the reason the keys matter |`

### 3 · Línea 115 — ROLE B, `You can't` 3
> `3. Write the WHAT CHANGES line yourself. That line: her words, nobody else's.`

La segunda mitad está bien: es la reescritura que pidió la ronda 1 (`Her words on it, or no
paper.` → nota) y funciona. La primera es un imperativo en segunda persona, y ahí está el
mecanismo: **la acción prohibida la hace Amparo, pero el `yourself` escrito se reasigna solo a
quien escucha**. Leído en voz alta a Liliana, `Write the WHAT CHANGES line yourself` deja de ser
una prohibición y se convierte en la jugada correcta de Amparo, dicha entera y gratis. El
exponente 161 ya tiene esa función (`This line is for you, not for me.`): la restricción la
regala fuera de la tabla.

Las otras dos restricciones de B no tienen el problema porque nombran acciones que solo Amparo
puede hacer (`Fire her, cut her pay`, `Give the keys with nothing in writing`): leídas en voz alta
no son ninguna jugada. La 3 es la única que apunta a la otra persona.

Y lo que se le hizo en esta ronda la empeoró: `Fill out` → `Write` era el arreglo de jerga del
hallazgo 5 (`fill out` no está glosado en la pantalla de B), y sustituyó un phrasal opaco por el
verbo A2 más común que existe. Más limpio de leer **y más fácil de decir**.

**Reescritura:** `3. Writing that line for her. That line: her words, nobody else's.`

(Gerundio: no es enunciado, no se levanta en la boca, y desaparece la segunda persona. Once
palabras → diez.)

### 4 · Línea 146 — ROLE B, vocabulario, celda `here` de `training`
> `| training | hours when somebody teaches you the job | two mornings · your price for the keys · nobody else teaches them |`

Las dos primeras mitades son nota perfecta. `nobody else teaches them` es sujeto + verbo
conjugado en presente simple, cuatro palabras, decible verbatim — y es **el argumento con el que
Amparo justifica el precio de las llaves**, que es el punto 3 del cierre. La entrada es nueva en
esta ronda; la forma viene de la celda que sustituyó.

**Reescritura:** `| training | hours when somebody teaches you the job | two mornings · your price for the keys · nobody else to teach them |`

(Infinitivo en vez de presente: mismo contenido, cero verbos conjugados, misma longitud.)

### 5 · Línea 149 — ROLE B, vocabulario, celda `here` de `your file`
> `| your file | the papers about you that the company keeps | where a written warning goes · hers today · and you have one too |`

`and you have one too` es la más corta de las cinco y la más rara: **lo que quiere decir es que
Amparo también tiene expediente** —su vulnerabilidad, el eco de los dos lunes—, pero está escrito
en segunda persona. Y en segunda persona apunta perfectamente a Liliana: dicho tal cual delante
de ella, `you have one too` es una frase bien formada, se entiende, y el turno avanza (con otro
significado: que Liliana también va a tener uno). Falla por lo mismo que fallaría la versión
correcta, y encima falla diciendo lo contrario de lo que la ficha quería.

**Reescritura:** `| your file | the papers about you that the company keeps | where a written warning goes · hers today · and one of your own |`

---

## Los 13 en riesgo — oración completa, a un cambio de funcionar

| # | línea | sección | cita | por qué inquieta | en nota |
|---|---|---|---|---|---|
| R1 | 25 | A · nota de registro | `She's the supervisor` | **la única de la ronda 1 que no se aplicó** (era su R7). Cosmética: no avanza ningún turno. Sigue aquí porque la línea de B ya no la compensa (ver R2) | `Your supervisor; two years together.` |
| R2 | 103 | B · nota de registro | `She's formal with you; you're direct with her.` | **retroceso medible**: en `HEAD` esta línea era `Formal. Supervisor, two years together.` — sin un verbo conjugado, y la ronda 1 la puso de modelo. Ahora son dos cláusulas conjugadas | `Formal from her, direct from you.` |
| R3 | 106 | B · `Before you speak` | `Without them, this is a lecture.` | pronombre + cópula. No avanza turno (es meta), pero es la forma que §11 prohíbe, en el bloque que abre la ficha | `Without them: a lecture.` |
| R4 | 120 | B · `Only you know` | `You could give the training on two Thursdays after closing, 6:30 to 8:30` | **el riesgo más caro del fichero**: es el tercer secreto de Amparo —lo que podría ofrecer y no piensa ofrecer— escrito como oferta ya construida. `You could`→`I could` y es una concesión entera. Es el mismo defecto que la ronda 1 marcó como grave dos viñetas más arriba, y esa sí se arregló | `Possible: the training on two Thursdays after closing, 6:30 to 8:30` |
| R5 | 120 | B · `Only you know` | `you don't plan to offer it` | segunda mitad de la misma viñeta; cláusula conjugada. Se arregla en la misma pasada | `not on the table today, your call` |
| R6 | 119 | B · `Only you know` | `never learned to count a truck` | predicado sin sujeto: fragmento, no enunciado. Pero es lo único de la entrada de Alba con verbo conjugado, y toda la entrada es nota pura salvo eso | `no training on the truck` |
| R7 | 148 | B · vocab `incident form` | `the paper you are writing · she can ask` | dos cláusulas en una celda. `she can ask` verbatim apunta mal, pero es el dato que la hace vulnerable; `the paper you are writing` leído a Liliana se lo asigna a ella | `today's paper · a question she can ask` |
| R8 | 147 | B · vocab `store folder` | `it never reaches her file` | pronombre + verbo conjugado, el disparador literal de §11. Verbatim `her`→`your` y es su jugada para vender el papel del medio | `never in her file` |
| R9 | 155 | B · `Your toolkit` | `nobody pays you for those two nights` | `you`→`me` y **es el exponente 166 palabra por palabra** (`Nobody pays me for those two nights.`). La frase existe dos veces en la misma pantalla: una en su sitio y otra fuera | `two nights nobody pays` (la misma nota que ya usa la línea 120) |
| R10 | 145 | B · vocab `warehouse` | `why you chose her, and not Alba` | interrogativa incrustada; el ojo para en `you chose her`. Es el criterio 3 de su propio cierre | `the reason for her, not Alba` |
| R11 | 74 | A · `Your toolkit` | `she asked you to come` | cláusula conjugada; verbatim apunta mal (`you`→`me`) | `her call, not yours` |
| R12 | 74 | A · `Your toolkit` | `you cannot say yes` | `you`→`I` y es el criterio 4 de A resuelto de una lectura. Menos grave que en la ronda 1 (que lo tenía en una frase entera), pero es la misma función | `Saturday mornings: never a yes` |
| R13 | 194 | La carta | `A quiet deal is no good now.` | sujeto + cópula, la única cláusula levantable de las ocho unidades de la carta. Verbatim es críptico para Liliana, que no sabe qué pasó en el pasillo — pero se dice, y ella pregunta | `Nothing quiet, not now.` |

**Nueve de los trece son de ROLE B, y siete llevan verbo conjugado de verdad** (no fragmento, no
sintagma). El patrón de la ronda 1 se mantiene y se agudiza: **A se protege por accidente
—sintagmas y segundas personas mal apuntadas—, B mete oración justo donde juega**. Sus riesgos
están en el dato oculto (R4, R5, R6), en el vocabulario del oficio (R7, R8, R10) y en la caja de
herramientas (R9): las tres piezas con las que negocia.

---

## Aparte 1 · lo que la ronda 1 arregló, y quedó arreglado

Vale la pena dejarlo escrito, porque es la parte que no vuelve a fallar y explica de dónde salen
las cuatro secciones limpias:

| ronda 1 | hoy | estado |
|---|---|---|
| `The first two Mondays never reached the incident form.` | `The first two Mondays · never on the **incident form** · one written today = the question back…` | **arreglado**, con la reescritura literal que se propuso |
| celda `stock` · `somebody has to check what arrives` | entrada eliminada del canje de vocabulario | arreglado por retirada |
| A · `whoever opens the store signs the delivery note` | `the delivery note signed by the person who opens the store` | arreglado |
| B · `whoever opens the store signs the delivery note` | `one signature on the delivery note · from the person who opens` | arreglado **y desduplicado**: la frase ya no está verbatim en las dos fichas |
| celda `daycare` · `nothing moves it` | `6:40 sharp, nothing before and nothing after` | arreglado |

Y de los doce riesgos: **once cerrados**. Sobrevive R7 (hoy R1, `She's the supervisor`), que era el
único declarado cosmético. La regla ampliada que salió de aquel informe —*en una celda de datos no
entra un verbo conjugado, tampoco con sujeto impersonal*— se aplicó a rajatabla: **las veinte
filas de `Facts` están limpias**, y era la sección que en el escenario 2 fue la novedad mala.

Lo que no se trasladó es que **esa misma regla vale para la columna `here` del vocabulario y para
las restricciones**. Las cinco fallas de hoy están en esos dos sitios.

## Aparte 2 · el cierre compartido y las frases prescritas

`Both screens — how it ends` (205-213) contiene tres frases entrecomilladas que se dicen en voz
alta a propósito: `"This cost you ___."`, `"And who else pays for this?"` y
`"Say it back to me: who takes Matías, and what time do you get here?"`. **No cuentan como
fallas**: son el ritual del cierre, y el cierre es pantalla compartida por definición.

Se anota una sola cosa, para el motor y no para esta pasada: la tercera es una pregunta **de
Amparo**, impresa donde Liliana también la lee. En una pantalla compartida eso es correcto; si en
algún momento el cierre se parte por rol, esa línea se va con B y no con las dos.

## Aparte 3 · no es calcabilidad, pero se ve desde aquí

1. **El presupuesto de prosa no está medido en el fichero, y no cuadra.** La tabla de la línea 258
   sigue con los marcadores sin sustituir (`PROSA_A`, `PROSA_A_H3`, `PROSA_B`, `PROSA_B_H3`), y el
   párrafo de al lado afirma que la ficha de B «entraba en esta ronda con 351 medidas —por encima
   del tope— y baja». Corrido el instrumento que el propio fichero declara:

   ```
   node artifacts/habla-a2/fase5-scripts/prosa.mjs artifacts/habla-a2/fase7-fichas-5-late-again-on-monday.md
    341    ok     ROLE A — Liliana, warehouse assistant
    425  SE PASA  ROLE B — doña Amparo, supervisor
   ```

   Con `--con-h3`: **359** y **443**, las dos por encima. **La ficha de B se pasa del tope de §11
   en 75 palabras**, no baja de 351. No es un hallazgo de calcabilidad y no se arregla desde aquí
   —tocarlo cambia qué líneas existen y habría que reauditar—, pero **queda escalado**: la ronda
   siguiente no puede volver a declarar cifras sin correr el script, que es exactamente el
   hallazgo que creó el script.

2. **Efecto de mis reescrituras sobre esa cuenta.** Ninguna añade palabras. En prosa contada:
   A pierde 1 (falla 1) y 1 más con R1; B pierde 1 (falla 3), 2 con R2, 4 con R3, 2 con R9 y ~1
   con R5. Las tres fallas de vocabulario están en tablas y no cuentan. Total aproximado: **A
   −2 → 339, B −10 → 415**. Sigue por encima del tope: el hueco de B es trabajo aparte.

3. **Las líneas meta opacas siguen ahí**, aunque menos que en la ronda 1: `Without them, this is a
   lecture.` (106), `A quiet deal is no good now.` (194), `Any change the other four can see = …`
   (195). No son calcables, pero tampoco son A2 leído.

4. **Los dos bloques `Your toolkit`** (74 y 155) repiten el defecto señalado en los escenarios 1 y
   2 y en la ronda 1: cinco incisos anidados sin un punto, guiones largos dentro de guiones
   largos. §11 pide «frases cortas, cero subordinación larga». Es el sitio del que salen tres de
   los trece riesgos.

---

## Resumen de cambios pedidos

Cinco obligatorios (las fallas) y uno de arrastre:

| # | línea | cambio |
|---|---|---|
| 1 | 33 | `If the store finds out, the promotion goes to somebody else.` → `The store finding out = the promotion to somebody else.` |
| 1b | 229 | borrar del `rationale` de `first-conditional` la cita que deja de existir (`También lo que Liliana no puede decir…`) |
| 2 | 67 | `that is why the keys matter` → `the reason the keys matter` |
| 3 | 115 | `Write the WHAT CHANGES line yourself.` → `Writing that line for her.` |
| 4 | 146 | `nobody else teaches them` → `nobody else to teach them` |
| 5 | 149 | `and you have one too` → `and one of your own` |

Los trece riesgos van en la tabla de arriba con su reescritura. Se recomiendan en bloque **R4 y
R5** (el tercer secreto de Amparo, que es el mismo defecto que la ronda 1 declaró grave) y **R2**
(la cabecera de B, que era el modelo del fichero y dejó de serlo en esta ronda).
