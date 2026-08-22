# Fase 9 · ¿Se puede leer en voz alta? — escenario 5, `late-again-on-monday`

**Auditado:** `artifacts/habla-a2/fase7-fichas-5-late-again-on-monday.md` tal como está en disco
hoy (22 ago 2026), con la reescritura a inglés+vocabulario, los arreglos de la ronda 2 y el
reparto de género ya aplicados (Camilo / doña Amparo / la vecina del 3). Los informes
`fase7-calcable-5-ronda1.md` y `fase7-calcable-5.md` se leyeron **solo** para saber qué se dijo
antes: ninguna línea se dio por buena por venir marcada como arreglada, y **dos de sus
conclusiones se revocan** (§Revocaciones).

**Regla aplicada (§11 con las dos correcciones del 21 ago):**
- Tablas → notas, nunca frases. Columna `here` → nota de propósito, sin comillas y sin
  pronombre + verbo conjugado.
- Prosa → inglés A2 legible, oraciones cortas y completas, escritas **sobre** el jugador.
- Prueba única: *si la línea se puede decir tal cual y el turno avanza, está mal escrita.*
- Principio de deixis (heredado de `fase9-calcable-1.md`): **la segunda persona no protege sola**.
  Protege cuando el que escucha no puede sostener el predicado. `You have promised twice` está a
  salvo dicho a Amparo; `You don't want a written warning in your file` no lo está, porque Amparo
  también tiene expediente — y es su secreto.

**Fuera de alcance por diseño:** las dos tablas `Say it here` (82-92 y 166-176), el bloque final
en español (222-226) y todo lo que va de la línea 228 abajo (`grammarReferences`, presupuesto,
hallazgos, pasada de género). **Dentro de alcance y auditada:** la carta (189-203), que es
pantalla de B y va en inglés.

**Techo de prosa, contador canónico** (`node artifacts/habla-a2/fase7-scripts/prosa-canonica.mjs`,
corrido hoy): **ROLE A 448 · ROLE B 439**, tope 450. Cumple, y coincide con lo que la ficha
declara en su tabla de presupuesto. Las reescrituras de abajo dejan **A ≈ 447 y B ≈ 446**: dentro
del techo, sin quitar ninguna pieza. Las cinco de tabla y las dos de la carta **no cuentan prosa**
(el script salta las filas `|` y la carta no es una ficha para él).

---

## Veredicto

**NO PASA · 12 líneas decibles sobre 138 unidades** (79 oraciones de prosa —40 en A, 39 en B— +
39 filas de tabla en alcance —10 datos + 10 vocabulario en A, 10 + 9 en B— + 8 unidades de la
carta + 12 del cierre compartido). Más **4 defectos de forma** que no son decibles pero incumplen
§11 al pie de la letra, tres de ellos en la columna `here`.

**Reparto: ROLE A 4 · ROLE B 8.** El desequilibrio de las dos rondas anteriores no solo se
mantiene: se agrava. **B mete oración justo donde juega** —su apertura, su condición, su precio y
su dato oculto—.

| bloque | unidades | decibles | forma |
|---|---|---|---|
| **B · `Only you know` (dato oculto)** | 7 | **2** | 0 |
| **B · `Where you are`** | 2 | **2** | 0 |
| **B · `You want`** | 2 | **1** | 0 |
| B · `You can't` | 5 | 1 | 0 |
| B · `Facts` (tabla) | 10 | 1 | 0 |
| B · carta | 8 | 1 | 0 |
| B · vocabulario `here` (tabla) | 9 | 0 | **2** |
| B · vocabulario `what it is` (tabla) | 9 | 0 | 1 |
| A · `Facts` (tabla) | 10 | **2** | 0 |
| A · `You want` | 2 | **1** | 0 |
| A · `If you walk away with nothing` | 2 | **1** | 0 |
| A · vocabulario `here` (tabla) | 10 | 0 | 1 |
| todo lo demás (64 unidades) | 64 | 0 | 0 |

**Se cae por tres, y las tres son de B.** Dos están en `Only you know`, que es el caso que §11
declara fatal («en un escenario llegó a entregar el dato oculto ya convertido en frase lista para
pronunciar»), y la tercera imprime la concesión condicional entera —el acto que da nombre al
escenario— fuera de la tabla de exponentes, donde el exponente sí está bien hecho, con hueco.

**Patrón, y es el mismo de la ronda 2 con otra ropa:** las tres rondas han arreglado *palabras* y
conservado *formas*. `it never reaches her file` pasó a `it never reaches his file` — se cambió el
posesivo y quedó intacto el pronombre + verbo conjugado que §11 nombra por su nombre. Lo mismo con
`nobody pays you for those two nights` (R9 de la ronda 2), que hoy es `Nobody pays those two
nights.`: se le quitó el `you`, y con eso dejó de apuntar mal y **pasó de riesgo a falla**.

---

## Revocaciones del informe anterior

1. **`Facts` no está limpia.** La ronda 2 cerró con «**las veinte filas de `Facts` están
   limpias**» y lo usó como prueba de que la regla ampliada se había aplicado a rajatabla. Hoy
   fallan tres: `The 5:50 bus` (52) y `The warehouse job` (55) en A, y `The others` (141) en B.
   Las tres llevan verbo conjugado y las tres se leen de corrido como enunciado. La 141 (`they see
   everything`) es además pronombre + verbo, el disparador literal.
2. **`Where you are` de B no estaba limpia y nadie la miró.** La ronda 2 la marcó «limpia — la
   narración de A se pasó a nota», midiendo solo la de A. La de B contiene **dos** de las doce
   decibles de hoy, y una de ellas es el primer turno de la ficha: `It is 7:35 and the store is
   still shut.` B es quien arranca; esa línea es literalmente lo primero que tiene que producir.

---

## Las doce, literal, con reescritura

### 1 · GRAVE — ROLE B · `You want`, línea 114
> `First you need the WHAT CHANGES line and two mornings of training.`

Dicha a Camilo aterriza perfecta: «primero necesitas el renglón y dos mañanas de capacitación».
Es **la condición entera del acto `conceder-con-condicion`**, en una oración bien formada, fuera
de la tabla de exponentes — donde el exponente sí está bien hecho y con hueco
(`If you write this line today, I can…`). El estudiante que lee su objetivo en voz alta se salta
el único acto que este escenario existe para hacerle producir.

**Reescritura:** `He gives you the WHAT CHANGES line and two mornings of training first.`
(tercera persona: no se puede decir a la cara del que es «he» · 12 → 13 palabras)

### 2 · GRAVE — ROLE B · `Only you know`, línea 123
> `Nobody taught her the truck.`

Cinco palabras, pasado simple, sin deixis que la frene. Es **el argumento con el que Alba deja de
ser alternativa**, y Amparo lo diría tal cual. Está en el bloque del dato oculto.

**Reescritura:** `You never taught her the truck.`
(el predicado pasa a Amparo, que es la única que pudo enseñar: dicho a Camilo es falso y no avanza
· 5 → 6 palabras)

### 3 · GRAVE — ROLE B · `Only you know`, línea 124
> `Nobody pays those two nights.`

Es su precio, dicho entero, y es **el exponente 174 a una palabra** (`Nobody pays me for those two
nights.`). La frase existe dos veces en la misma pantalla: una en su sitio y otra en el dato
oculto. La ronda 2 la marcó riesgo cuando decía `nobody pays you for those two nights`; quitarle
el `you` le quitó lo único que la hacía apuntar mal.

**Reescritura (la viñeta entera, para no dejar la mitad suelta):**
`You can give the training on two Thursdays after closing, 6:30 to 8:30, in your own unpaid time.
You don't want to offer it.`
(el coste va pegado a la cláusula que ya falla al decirse —Camilo no da capacitación— y
desaparece la oración autónoma · 24 → 23 palabras)

### 4 · ROLE B · `Where you are`, línea 112
> `It is 7:35 and the store is still shut.`

B arranca. Ésta es su primera jugada —el reproche con el hecho delante— y está impresa lista para
pronunciar, sin un solo pronombre que la gire.

### 5 · ROLE B · `Where you are`, línea 112
> `The truck comes at ten past seven.`

Su argumento central: por qué el retraso importa. Hecho compartido, deixis cero, se dice tal cual y
Camilo aprende algo. Además duplica en oración lo que la fila `The truck` (133) ya trae en nota.

**Reescritura de 4 y 5 juntas:** `The store you open is still shut at 7:35. You are alone at the
door when the truck comes at ten past seven, and you have opened alone three Mondays.`
(`the store you open` y `you are alone at the door` son falsos de Camilo: no se sostienen en su
boca · 24 → 29 palabras, y B tiene 11 de margen)

### 6 · ROLE B · `You can't` 2, línea 118
> `2. You can't give the keys with nothing in writing: the other four would see it.`

La primera mitad se protege sola (Camilo no da llaves). La segunda es cláusula autónoma donde el
ojo para: `the other four would see it` es **la razón por la que exige papel**, y dicha así avanza.
(Aparte de nivel, no de esta pasada: `would` de consecuencia hipotética está declarado fuera en la
línea 19 de la propia ficha.)

**Reescritura:** `2. You can't give the keys with nothing in writing, not with the other four
watching.`

### 7 · ROLE B · `Facts`, línea 141
> `| The others | four people in the store · they see everything |`

Pronombre + verbo conjugado en una tabla de datos: el disparador literal de §11 y una frase que
Amparo suelta tal cual para justificar el papel.

**Reescritura:** `| The others | four people in the store · eyes on everything |`

### 8 · ROLE B · la carta, línea 202
> `- The other four can see any change. So he gives something back, and they see that too.`

La segunda oración va en tercera persona y se protege. La primera se dice tal cual y **es justo lo
que la carta le manda comunicar**: que ya no cabe trato discreto. La carta es la pieza que hasta
ahora venía limpia en las tres rondas.

**Reescritura:** `- Nothing you give him now stays between the two of you. So he gives something
back, and they see that too.`

### 9 · ROLE A · `You want`, línea 30
> `You don't want a written warning in your file.`

Es el objetivo de Camilo escrito en segunda persona, y **la segunda persona aquí no protege: la
sostiene Amparo**. Ella tiene expediente, y que le caiga un llamado de atención propio es su
secreto de la línea 126. Leído en voz alta, el objetivo de A se convierte en la única frase que
toca el punto débil de B — que A no debería conocer. Es la deixis del hallazgo revocado en el
escenario 1, con el agravante de que aquí filtra hacia la otra ficha.

**Reescritura:** `You want to walk out with no warning about you on paper.`
(9 → 11 palabras; A tiene 2 de margen y recupera 3 en la falla 10)

### 10 · ROLE A · `If you walk away with nothing`, línea 41
> `The bonus goes with it, the warehouse job goes to somebody else, and so do the keys.`

Deixis cero, presente simple, tres cláusulas encadenadas y perfectamente fluidas después de que
Amparo mencione el llamado de atención. Y no es una frase cualquiera: **es el punto 3 del cierre**
(«di lo que te cuesta») resuelto de una lectura.

**Reescritura:** `Your bonus goes with it, and so do the warehouse job and the keys.`
(`your bonus` dicho a Amparo no se sostiene: ella no pierde bonificación, pierde un llamado de
atención · 17 → 14 palabras)

### 11 · ROLE A · `Facts`, línea 52
> `| The 5:50 bus | at the store 6:45 · but the daycare takes Matías at 6:40, never before |`

Oración completa dentro de la tabla de datos, y es **la restricción que sostiene su explicación
entera**. Se dice tal cual y el turno avanza. La ficha presume de esta línea en su hallazgo 7
(414-415) como el arreglo que sustituyó a la imagen del niño esperando solo: el arreglo cambió el
contenido y dejó la frase.

**Reescritura:** `| The 5:50 bus | at the store 6:45 · daycare, never before 6:40 |`

### 12 · ROLE A · `Facts`, línea 55
> `| The warehouse job | nobody in that job from April · the keys and the delivery note go together |`

Presente simple, sujeto compuesto, cero deixis. Camilo la dice para enseñar que conoce el oficio, y
es media argumentación por las llaves.

**Reescritura:** `| The warehouse job | nobody in that job from April · keys and delivery note,
always together |`

---

## Lupa sobre la columna `here` — 19 celdas, una por una

**Es la mejor noticia del informe: ninguna de las 19 es decible verbatim.** El canje de la ronda 2
(`the reason the keys matter`, `nobody else to teach them`, `and one of your own`, `still blank ·
one line on it for your words`) se aplicó y aguantó. **Pero sobreviven dos celdas con la forma que
§11 manda reescribir sin discutir el contenido**, y una de ellas es exactamente la que la ronda 2
marcó como R8 y esta ronda «arregló» cambiando el posesivo.

| ficha | palabra | celda `here` | veredicto |
|---|---|---|---|
| A | a set of keys | `the second set · one of the two things on the desk` | limpia |
| A | **a written warning** | **`don't leave with this one`** | **forma**: imperativo, no nota de propósito. No es decible (dicho a Amparo no se sostiene), pero es una orden al jugador metida en la columna que §11 define como «para qué le sirve». → `not this one, not today` |
| A | commitment sheet | `still blank · one line on it for your words` | limpia (arreglo de la ronda 2, sostenido) |
| A | daycare | `at 6:40, not before and not after` | limpia |
| A | delivery note | `signed by the person who opens the store · the reason the keys matter` | limpia (arreglo de la ronda 2, sostenido) |
| A | road work | `twenty-five minutes more on the bus` | limpia |
| A | to fill out | `the WHAT CHANGES line · your words, not hers` | limpia |
| A | to pick up | `her two boys, Wednesdays at five · the price of your mornings` | limpia |
| A | warehouse | `the job you want · and the room you know best` | limpia (sintagma; no se levanta como enunciado) |
| A | your file | `one warning in it · bonus gone, job gone` | limpia |
| B | commitment sheet | `the only safe signature of the three` | limpia |
| B | **delivery note** | **`the boxes are checked with it · two people, always`** | **forma**: oración pasiva conjugada en una celda de notas. Dicha a Camilo es opaca (`it` sin referente) y por eso no la cuento decible, pero es frase, no nota. → `checked against the boxes · two people, always` |
| B | incident form | `today's paper · a question he can ask` | limpia |
| B | review date | `September 14 · the day somebody can see if it is true` | limpia por los pelos (relativa dentro de sintagma) |
| B | **store folder** | **`the middle paper · it never reaches his file`** | **forma, y es reincidencia**: pronombre + verbo conjugado, el disparador que §11 cita textualmente. La ronda 2 lo marcó (R8) con `her`; se cambió a `his` y la forma quedó. Con `your` en vez de `his` es su jugada entera para vender el papel del medio. → `the middle paper · never in his file` |
| B | training | `two mornings · your price for the keys · nobody else to teach them` | limpia (arreglo de la ronda 2, sostenido) |
| B | warehouse | `the reason you are asking him · not the three Mondays` | limpia |
| B | written warning | `the heaviest of the three · expensive for you too` | limpia |
| B | your file | `where a written warning goes · his today · and one of your own` | limpia (arreglo de la ronda 2, sostenido) |

**Cuarto defecto de forma, en la columna vecina:** `| review date | the day you look at it again:
did it work? |` (150). La definición termina en una **pregunta directa**, que es la forma de
ejemplo que §11 aparta de este bloque («no como ejemplo»). No es decible aquí —la pregunta se hace
el 14 de septiembre, no hoy—, pero la columna `what it is` es la única de la ficha que llevaba
20/20 limpias en tres rondas y ésta es la primera que se sale. → `the day you look at it again and
see if it worked`.

---

## Lo que está bien, y conviene no romper al arreglar

- **`You can't` de A (7 unidades, 0 fallas).** La restricción 1 —el motivo que tiene prohibido
  decir— fue la falla grave de las dos rondas anteriores, primero como `want out` y después como
  primer condicional entero. Hoy es `You can't say why your Saturday mornings are taken.` y **se
  protege sola**: dicha a Amparo habla de las mañanas de ella. Arreglada de verdad.
- **`You did it if`, 14 unidades, 0 fallas** en las dos fichas: criterios en pasado, que no se
  levantan en la boca.
- **`Your toolkit`, 12 unidades, 0 fallas.** El bloque que en la ronda 2 producía tres de los trece
  riesgos ahora va a línea por bloque y en tercera persona (`she called you in, so you only
  answer`, `he gives you times`).
- **`Only you know` de A, 6 unidades, 0 fallas.** El secreto del fútbol está escrito con `You
  coach…`, y Amparo no entrena a nadie: el predicado no lo sostiene quien escucha. Es el modelo de
  cómo se escribe un dato oculto, y es el contraste exacto con las dos fallas del `Only you know`
  de B.
- **La columna `what it is`, 19 celdas, 0 decibles** (una de forma, la de arriba).
- **El cierre compartido** (212-220) y sus tres frases entrecomilladas: ritual, pantalla común, a
  propósito. **No cuentan**. Se repite la nota de la ronda 2 para el motor y no para esta pasada:
  `"Tell me again: who takes Matías, and what time do you get here?"` es pregunta **de B** impresa
  también en la pantalla de A; si algún día el cierre se parte por rol, se va con B.

---

## Riesgos anotados y no contados (no avanzan turno, o son opacos)

| línea | cita | por qué no cuenta |
|---|---|---|
| 28 | `It is Monday, August 17, 7:35 a.m.` · `Two things are on the desk.` | decibles, pero nadie anuncia la fecha ni describe lo que los dos están viendo: no avanzan |
| 110 | `Without them, this is a complaint.` | pronombre + cópula en prosa (permitido) y críptica dicha en voz alta |
| 124 | `You can give the training on two Thursdays…` | Camilo no da capacitación: se sostiene a un pronombre de ser la concesión entera. Se arregla dentro de la falla 3 |
| 126 | `you get a warning of your own, with two Mondays to explain` | `of your own` pide un contraste que Camilo no tiene delante; queda a medio camino |
| 78 | `Block 6: Saturday mornings are the one thing you don't explain.` | dicha a Amparo habla de las mañanas de ella |
| 99 | `Somebody can check the WHAT CHANGES line next Monday` | criterio, presente, pero sin referente en la mesa hasta que el renglón exista |
| 201 | `A secret deal does not work now.` | se dice, pero Camilo no estuvo en el pasillo: no avanza, pregunta |

---

## Resumen de cambios pedidos

Doce obligatorios y cuatro de forma. Ninguno toca el motor, los dos números, la carta como pieza
ni el cierre.

| # | línea | cambio |
|---|---|---|
| 1 | 114 | `First you need the WHAT CHANGES line and two mornings of training.` → `He gives you the WHAT CHANGES line and two mornings of training first.` |
| 2 | 123 | `Nobody taught her the truck.` → `You never taught her the truck.` |
| 3 | 124 | `…6:30 to 8:30. Nobody pays those two nights.` → `…6:30 to 8:30, in your own unpaid time.` |
| 4-5 | 112 | `It is 7:35 and the store is still shut. The truck comes at ten past seven, and…` → `The store you open is still shut at 7:35. You are alone at the door when the truck comes at ten past seven, and…` |
| 6 | 118 | `: the other four would see it.` → `, not with the other four watching.` |
| 7 | 141 | `they see everything` → `eyes on everything` |
| 8 | 202 | `The other four can see any change.` → `Nothing you give him now stays between the two of you.` |
| 9 | 30 | `You don't want a written warning in your file.` → `You want to walk out with no warning about you on paper.` |
| 10 | 41 | `The bonus goes with it, the warehouse job goes to somebody else, and so do the keys.` → `Your bonus goes with it, and so do the warehouse job and the keys.` |
| 11 | 52 | `but the daycare takes Matías at 6:40, never before` → `daycare, never before 6:40` |
| 12 | 55 | `the keys and the delivery note go together` → `keys and delivery note, always together` |
| F1 | 63 | `don't leave with this one` → `not this one, not today` |
| F2 | 148 | `the boxes are checked with it` → `checked against the boxes` |
| F3 | 151 | `it never reaches his file` → `never in his file` |
| F4 | 150 | `the day you look at it again: did it work?` → `the day you look at it again and see if it worked` |

**Efecto sobre el presupuesto** (contador canónico, estimado sobre los deltas de prosa; las cinco
de tabla y la de la carta no cuentan): **A 448 → ≈447**, **B 439 → ≈446**. Las dos dentro de 450.
Hay que **volver a correr `prosa-canonica.mjs` después de aplicar**, no declarar la cifra: es el
fallo que este mismo fichero cometió dos rondas seguidas y que creó el script.

**Y una cosa que la ficha tendrá que actualizar de sí misma:** el párrafo de presupuesto (líneas
298-300) y el hallazgo 7 (414-415) presumen de líneas que aquí se reescriben. Si se cambia la 52 y
no la 415, la ficha vuelve a declarar de sí misma algo que dejó de ser cierto.
