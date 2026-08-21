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

Auditado: `artifacts/habla-a2/fase7-fichas-7-two-more-people-for-the-trip.md`, versión de trabajo
del 21 de agosto de 2026 (la que declara 374 y 370 palabras de prosa).

**Esta es la ronda 2.** Ya existía un informe sobre esta misma versión del fichero; está
conservado en `fase7-calcable-7-ronda1.md` y **no se ha borrado**. Esta pasada se hizo línea por
línea sin mirarlo, y el contraste con él está en su propia sección al final: convergen casi
exactamente, pero la ronda 1 tiene **tres números de línea equivocados** y le falta el motivo
gramatical del fallo más grave.

Fuera de alcance por diseño: las dos tablas *Say it here* (87-95 y 162-170), que son exponentes y
ahí las frases van a propósito; las bandas del diseñador (9-24) y el bloque *After* (212-217), que
están en español; y `grammarReferences` (220-253) más los dos anexos (257-328), que son metadato y
no llegan a pantalla.

---

## Cómo se marcó cada línea

- **FALLA** — la línea, o una cláusula autónoma donde el ojo puede parar, es un enunciado inglés
  bien formado que **ese** rol le puede decir al otro **apuntando a la persona correcta**, y el
  turno avanza. Es la prueba literal de §11.
- **RIESGO** — es oración con verbo conjugado, pero dicha *tal cual* apunta mal: hace falta un
  cambio (un pronombre, un posesivo) para que funcione en la boca. No falla la prueba literal; la
  sostiene un pronombre. Se separa en **caro** (lo que sale con ese cambio es una jugada central)
  y **meta** (habla del juego, no dentro del juego: no hace avanzar ningún turno).
- **Limpia** — nota sin verbo conjugado en posición autónoma. Las elipsis naturales
  (`no name + ID, no entry`, `six people, and maybe five seats`, `If nobody goes: 200,000 back
  tonight`) cuentan como limpias: son exactamente la forma que §11 pide.

**Las filas de tabla se leen de corrido, rótulo incluido.** Un `| rótulo | celda |` es una sola
unidad de pantalla: si el rótulo pone sujeto y verbo, la fila es una oración aunque la celda esté
impecable. Por eso 58, 62 y 134 están marcadas.

**Unidad de pantalla** = una línea de prosa, un punto de lista, una fila de datos, o **una celda**
de las columnas `what it is` y `here` del vocabulario (que se auditan por separado, porque fallan
por motivos distintos).

---

## Veredicto

**PASA CON CAMBIOS.** La ficha aguanta: la pasada de desconjugación que declara su cabecera
funcionó, y funcionó donde más dolía. Pero quedan **cinco líneas decibles**, y **dos de ellas
están en la carta**, que es justo la pieza que el diseño quiere que cueste trabajo.

| | |
|---|---|
| Unidades de pantalla en inglés auditadas (sin exponentes) | **106** |
| **Decibles (FALLA)** | **5** — 4,7 % |
| A un pronombre de ser decibles (RIESGO) | 26 — 24,5 % |
| Limpias | 75 — 70,8 % |

| escenario | unidades | FALLA | % |
|---|---|---|---|
| 1 · `the-bike-in-the-parking-lot` | 73 | 7 | 9,6 % |
| 2 · `no-appointment-until-thursday` | 94 | 18 | 19,1 % |
| **7 · `two-more-people-for-the-trip`** | **106** | **5** | **4,7 %** |

Lo que hay que reconocer antes de listar los fallos: **las veinte celdas de las dos tablas de
datos están en nota, sin un solo verbo conjugado**, y ese fue el defecto que hundió al escenario
2. El dato oculto de Kevin (119-121) está escrito en participio y dos puntos. Esta ficha se
escribió, en su mayor parte, desde la libreta y no desde la boca del personaje.

---

## Dónde se concentran

| sección | unidades | FALLA | riesgo | estado |
|---|---|---|---|---|
| **La carta** (encabezados + 5 filas + 2 prosa) | 9 | **2** | 2 | **la peor, y con diferencia**: 40 % de los fallos en el 8,5 % de las unidades |
| Vocabulario, columna `what it is` (A 9 + B 10 + carta 2) | 21 | **1** | 2 | el fallo está en una fila **compartida entre las dos fichas** |
| `Only you know` (A 3 + B 3) | 6 | **1** | 3 | los cuatro son de **A**; los tres de B están limpios |
| `Your toolkit` (A + B) | 2 | **1** | 1 | 2 de 2 unidades tocadas — dejó de ser sección meta |
| Vocabulario, columna `here` (A 9 + B 10 + carta 2) | 21 | 0 | 3 | **el vuelco del informe**: era la peor sección en los escenarios 1 y 2 |
| **Facts** (A 10 + B 10) | 20 | 0 | 3 | celdas limpias 20/20 · los tres riesgos son **rótulos** |
| `You can't` (A 3 + B 3) | 6 | 0 | 2 | los dos en la restricción 1 de cada rol |
| Nota de registro (A 2 + B 2) | 4 | 0 | 2 | la misma frase en las dos |
| `You did it if` (A + B) | 2 | 0 | 2 | las dos, y las dos meta |
| `Your own rule` (A) · `And a reason you can repeat` (B) | 2 | 0 | 2 | |
| `Both screens — how it ends` | 5 | 0 | 2 | ninguna avanza turno; ver *Aparte 3* |
| Cabeceras de rol | 2 | 0 | 1 | solo la de A |
| `If you walk away with nothing` (A + B) | 2 | 0 | 1 | solo la de A |
| `Where you are` (A + B) | 2 | 0 | 0 | **limpia** |
| `You want` (A + B) | 2 | 0 | 0 | **limpia** |

**Reparto: ROLE A 3 · ROLE B 0 · la carta 2 · pantalla compartida 0.**

**Las tres concentraciones, dichas enteras.**

1. **La carta.** Es el 8,5 % de la pantalla y el 40 % de los fallos, y no se protege sola. En el
   escenario 1 el mensaje citado (`I'm going to Barrancabermeja`) salía mentira leído en voz alta,
   y por eso **obligaba** al estilo indirecto, que era el ejercicio. Aquí la nota de voz de doña
   Nubia ya viene escrita **en tercera persona sobre doña Nubia** (`she asks him first thing`,
   `she charges you`): Valentina leyéndola no produce nada falso, produce estilo indirecto
   correcto y gratis. Y la propia carta dice en su cierre qué se pierde con eso —
   *«Kevin learns only what you tell him. You decide how much.»* Si la fila se lee, no hay
   decisión que tomar.

2. **Todo lo que falla es de Valentina, y falla por explicar.** Kevin tiene cero decibles en 45
   unidades. La diferencia no es de dificultad: **Valentina es la que sabe cosas** —la reserva, la
   lista, el sexto, el carro del mecánico— y cada vez que la ficha se pone a explicarle *por qué*
   sabe algo, escribe una oración. Kevin, que solo tiene dinero de otros y prisa, se anota sin
   explicar.

3. **La desconjugación llegó a las celdas y no a los bordes.** Las veinte celdas de datos están en
   nota; los tres riesgos de la tabla son **rótulos** (`| You paid |`, `| You owe Valentina |`) o
   una celda que conserva el verbo del rótulo (`you put him in`). Y las dos líneas `Your toolkit`,
   que en el escenario 2 se dieron por limpias («son instrucciones meta»), aquí ya no lo son.

Un cuarto patrón, que no es concentración sino textura: **de los 26 riesgos, 21 son oraciones en
segunda persona dirigidas al jugador.** La ficha le habla al jugador de tú, así que la traducción
mental que hace falta es exactamente `you → I`. Es una protección más delgada que la del escenario
2, donde varios riesgos salían ridículos al decirse. Aquí ninguno sale ridículo: **salen
invertidos**, que es un paso más corto.

---

## Las 5 decibles — cita literal y reescritura en nota

### 1 · GRAVE — la deuda, ya pronunciada, dentro de una definición de vocabulario
**Línea 72**, ROLE A, fila `to owe someone`, columna `what it is`:

> `| to owe someone | to have to pay money to a person, and you did not pay it yet | the debt on his side · day: July 30 |`

`You did not pay it yet.` — pasado simple negativo, segunda persona, y **la segunda persona apunta
a Kevin, que es exactamente quien no pagó**. Se dice tal cual, es cierta y es el reclamo de
apertura de Valentina. Es el único fallo del fichero que no necesita cambiar ni una letra.

Tres tablas más abajo, el exponente de la línea 87 dice la misma jugada donde debe estar:
`You haven't paid me yet.` con la glosa *«say it once, and don't fight about it»*.

**Y aquí hay una segunda factura que no es de calcabilidad: la versión que regala el vocabulario
está en el tiempo verbal equivocado.** `did not pay … yet` es exactamente el error de A2 contra el
que existe el anclaje `present-perfect-ever-never` de este mismo fichero, cuyo *rationale* (línea
232) dice: *«El yet es lo que convierte el cobro en un recordatorio y no en una acusación, y es
tema explícito.»* O sea: la línea 72 no solo entrega la jugada fuera de la tabla de exponentes,
la entrega **mal conjugada**, y compite con el exponente que el escenario puso ahí para enseñar la
forma buena. Si el estudiante calca, calca el error.

**Y la fila está copiada palabra por palabra en la ficha de Kevin (línea 144)**, donde es inocua:
`you did not pay it yet` dicho a Valentina es falso, porque Valentina sí pagó. Auditar la fila una
vez y darla por buena es el error que este hallazgo enseña.

**Reescritura** (las dos fichas, misma cadena):
`to have to pay money to a person, and the money still not paid`

### 2 · GRAVE — la carta dicta la noticia, hecha frase
**Línea 188**, la carta, fila `When you find out`:

> `| When you find out | she asks him first thing and calls you **before 7:00 a.m.** |`

Dos cláusulas conjugadas en una celda. `She asks him first thing.` es autónoma, es cierta con los
referentes correctos (doña Nubia pregunta al administrador), se dice tal cual y **es la noticia
entera de la carta**: que nada se cierra esta noche y que hay respuesta a las 7:00. La segunda
mitad —`and calls you before 7:00 a.m.`— la salva un pronombre (doña Nubia llama a Valentina, no a
Kevin), y con cambiarlo queda el resto de la frase montada.

**Reescritura:** `| When you find out | her question to him first thing · her call to you **before 7:00 a.m.** |`

### 3 · GRAVE — el precio de la carta, decible **y** ambiguo
**Línea 186**, la carta, fila `Price`:

> `| Price | **150,000 pesos** *(a hundred and fifty thousand)* · both nights · **she charges you** |`

`She charges you.` — presente simple, tres palabras, oración completa. Y tiene dos lecturas que
funcionan las dos:

- la que la ficha quiere: *doña Nubia se lo cobra a Valentina* — el hueco de 50.000 que la banda
  del diseñador explica en la línea 16;
- la que sale al leerla en voz alta delante de Kevin: *te lo cobra a ti* — una exigencia de pago
  perfectamente jugable, y además una de las salidas que Valentina puede querer.

Es decir: aquí el pronombre no protege nada, porque la lectura invertida **también es una jugada
que a A le sirve**. Y la ambigüedad es un defecto de contenido con independencia de §11: las
mismas tres palabras dicen dos cosas opuestas según quién las lea.

**Reescritura:** `| Price | **150,000 pesos** *(a hundred and fifty thousand)* · both nights · **charged to your reservation** |`

### 4 · MEDIO — el dato oculto de A, en una frase que es cierta por los dos lados
**Línea 47**, ROLE A, `Only you know`:

> `- **Sebastián you know**, last year's trip. **Andrea you've never seen.**`

`Sebastián you know, last year's trip.` dicho a Kevin **también es cierto**: Kevin conoce a
Sebastián, es su amigo y le cobró el cupo. Las dos lecturas —«a Sebastián lo conozco yo» y «a
Sebastián lo conoces tú»— son verdad, así que la frase se dice tal cual y aterriza; concede medio
escenario sin construir nada. Es el único caso del fichero donde el `you` no protege porque la
proposición vale para los dos.

La segunda mitad, `Andrea you've never seen.`, sí apunta mal (Kevin sí ha visto a Andrea) y se
queda en riesgo — pero es el riesgo más caro de A: `Andrea I've never seen` es la asimetría que
mueve toda su mitad y lo que el exponente `Who exactly is …?` existe para explotar.

Aparte de calcable, `Sebastián you know` es un objeto antepuesto, y eso no es A2 leído: §11 pide
«frases cortas, presente y pasado simple, cero subordinación larga».

**Reescritura:** `- **Sebastián**, last year's trip. **Andrea**, never a face.` *(9 palabras por 11)*

### 5 · MEDIO — el rechazo, ya redactado, en la línea de la caja de herramientas
**Línea 81**, ROLE A, `Your toolkit`:

> `… · **5**, 600,000 from your pocket, three weeks ago · **6**, Hernán's car stays out · **7** [grants] · …`

`Hernán's car stays out.` — presente simple, tercera persona, sin pronombres que reasignar,
decible y **jugable**: es la restricción 3 de Valentina («Hernán + car: one package») convertida en
un no. El bloque 6 de la caja es precisamente «decir que no», y la línea le entrega el no escrito.

**Es la más discutible de las cinco, y va dicho:** en mi primera pasada la marqué riesgo, porque
dentro del bloque la frase significa *«el carro de Hernán se queda fuera de lo que dices»*, que es
meta. Se mueve a FALLA porque leída sin ese contexto —que es como se lee, a mitad de turno— es un
enunciado autónomo, cierto y usable, y porque **la ambigüedad misma es el problema**: una línea de
ficha que puede leerse como instrucción o como parlamento ya está mal escrita. El arreglo cuesta
una palabra menos, así que no hay nada que sopesar.

**Reescritura:** `**6**, not Hernán's car` *(4 palabras por 5)*

**Y el toolkit de Kevin va detrás por el mismo camino:** `two people moved their weekend for you` y
`you can't pay tonight` (línea 156) son sus dos argumentos centrales a un pronombre de distancia.
En el escenario 2 esta sección se declaró limpia. Ya no lo es.

---

## Las 26 en riesgo — oración completa, a un pronombre de funcionar

### Riesgo caro (17) — el cambio es `you → I` y lo que sale es una jugada central

| # | línea | cita | qué sale con el pronombre | en nota |
|---|---|---|---|---|
| R1 | 46 (A, dato oculto) | `**The sixth was yours, Wednesday**` | `The sixth was mine.` — **la carta oculta de A**, y la propia línea dice *never to Kevin's face* | `**The sixth: yours, Wednesday**` |
| R2 | 62 (A, datos) | `\| The sixth \| Hernán · Wednesday · you put him in · car + gas \|` | `I put him in.` — el mismo secreto, otra vez, en la tabla de datos | `… · Wednesday, your call · car + gas` |
| R3 | 28 (A, encabezado de rol) | `You paid for the house — it's in your name` | `It's in my name.` — la base entera de su poder, en el título | `The house, paid by you — the reservation in your name` |
| R4 | 58 (A, datos, rótulo) | `\| You paid \| **600,000 pesos** … \|` | `I paid six hundred thousand pesos.` | `\| Out of your pocket \| **600,000 pesos** … \|` |
| R5 | 40 (A, `You can't` 1) | `You paid 600,000; his part is missing.` | dos jugadas en una línea | ver presupuesto, abajo |
| R6 | 40 (A, `You can't` 1) | `You *can* cover his, not a stranger's.` | `I can cover yours…` — la concesión, ya redactada | ídem |
| R7 | 49 (A, `If you walk away…`) | `Nobody has paid you.` | `Nobody has paid me.` — y duplica el exponente 87 | `… all five his · nothing paid.` |
| R8 | 70 (A, vocab `reservation`, `what it is`) | `the owner keeps the house for you, and your name is the one she has` | `My name is the one she has.` — dos cláusulas, y una definición que dejó de ser definición | `when the owner keeps the house for one person, under that person's name` |
| R9 | 47 (A, dato oculto) | `**Andrea you've never seen.**` | `Andrea I've never seen.` — la asimetría del escenario | ver fallo 4 |
| R10 | 45 (A, dato oculto) | `Tell him and he can use it.` | `You can use it.` — la concesión del carro | `Told: a card in his hand. Untold: bargaining blind.` |
| R11 | 30 (A) y 104 (B, nota de registro) | `You travel together tomorrow.` | `We travel together tomorrow.` — el cierre de las dos fichas | `Same car tomorrow.` |
| R12 | 114 (B, `You can't` 1) | `The 200,000 on you are Sebastián's and Andrea's.` | `The 200,000 on me are…` — **la defensa central de Kevin** | `The 200,000 on you: Sebastián's and Andrea's.` |
| R13 | 134 (B, datos, rótulo) | `\| You owe Valentina \| **100,000 pesos** … \|` | `I owe you a hundred thousand.` — su admisión de apertura | `\| Owed to Valentina \| **100,000 pesos** … \|` |
| R14 | 156 (B, toolkit) | `two people moved their weekend for you` | `…for me.` — su argumento del bloque 5, entero | `two weekends moved because of you` |
| R15 | 156 (B, toolkit) | `you can't pay tonight` | `I can't pay tonight.` — su imposibilidad, entera | `no money tonight` |
| R16 | 144 (B, vocab `to owe someone`) | `you did not pay it yet` | la misma cadena que **falla** en la ficha de A | ver fallo 1 |
| R17 | 188 (carta) | `and calls you **before 7:00 a.m.**` | `and calls me before seven.` | ver fallo 2 |

### Riesgo meta (9) — es oración, pero habla del juego, no dentro del juego

No hacen avanzar ningún turno. Van listadas porque son verbos conjugados en una ficha que §11
quiere en notas, y porque una de ellas es la más peligrosa del fichero.

| # | línea | cita | nota |
|---|---|---|---|
| R18 | 121 (B, dato oculto) | `**Three things she doesn't know:** Andrea's twenty minutes, Sebastián's shift, the hammock.` | **el riesgo meta más caro del fichero**: `she doesn't know` → `you don't know` es un cambio de una palabra y **vuelca los tres datos ocultos de Kevin de golpe**, contra la regla que la propia línea pone (*Only if she asks*). No es FALLA porque en tercera persona a la cara suena raro; está a una palabra de serlo. → `- **Three things new to her:**` |
| R19 | 30 · 104 | `you can interrupt` (las dos notas de registro) | |
| R20 | 37 (A) | `Decide nothing until he says who they are and why they matter.` | |
| R21 | 81 (A, toolkit) | `he comes to you` | |
| R22 | 98 (A, criterios) | `Kevin knows the beds and the gate list` · `the 100,000 got a date` · `the no was yours` · `tomorrow you still ride together` | → `Kevin:` en vez de `Kevin knows` |
| R23 | 111 (B) | `that one gets you a question back` | → `that one: a question back` |
| R24 | 148 · 150 (B, vocab `here`) | `how the six were meant to pay · five did` · `how much is missing, once the numbers are out` | |
| R25 | 173 (B, criterios) | `Valentina knows what tonight costs you` · `your car's 8:00 is settled` | → `Valentina:` en vez de `Valentina knows` |
| R26 | 179 · 195 · 198 (carta) | `Kevin opens here` · `the seventh person, if there is one` · `Kevin learns only what you tell him.` | |
| R27 | 204 · 210 (pantalla compartida) | `each of you says his own part…` · `When Valentina sends it, it's over.` | ver *Aparte 3* |

*(R11 toca una unidad por ficha. Total de unidades en riesgo: 26.)*

---

## Aparte 1: la tabla de datos sí es, esta vez, la sección segura

Hay que escribirlo porque corrige el *Aparte 1* del escenario 2, que decretó que la tabla de datos
había dejado de ser fiable. Aquí las **veinte celdas** de las dos tablas están en nota, sin un solo
verbo conjugado:

| ROLE A | ROLE B |
|---|---|
| `a guard at the gate · 3 bedrooms · **6 beds**` | `5 seats · gas on you` |
| `6 names + 6 ID numbers · changes: doña Nubia only` | `call center shift until 10:00 p.m., no answer before · hammock, no bed` |
| `4 seats · at the mechanic's · mechanic: 7:00 a.m.` | `at the parking lot in 20 minutes · no way there except your car` |

La regla operativa que pedía aquel informe —«en una celda de datos no entra un verbo conjugado»—
está aplicada. Lo que faltó fue extenderla al **rótulo**: los tres riesgos de datos (R2, R4, R13)
son rótulos, y los tres son la jugada central de su rol. La regla completa, para el resto del set:
*ni el rótulo ni la celda llevan verbo conjugado; el rótulo es un encabezado de columna, no un
sujeto.*

## Aparte 2: `Only you know` de Kevin es el modelo que hay que copiar

Los tres puntos del dato oculto de Kevin (119-121) son el contraejemplo, dentro del propio
fichero, de lo que falla en el de Valentina:

> `- **Tuesday: 100,000 collected from each of them.** If nobody goes: 200,000 back tonight, two people let down.`

Participio (`collected`, `let down`), dos puntos en vez de verbo, condición sin cláusula principal.
Cero decible, y aun así el estudiante sabe exactamente qué tiene y qué pierde. Enfrente, el mismo
bloque de Valentina (45-47) tiene tres puntos y los tres llevan verbo, y uno de ellos es el fallo 4.

## Aparte 3: la pantalla compartida no falla, pero tampoco está en nota

Aquí me separo de la ronda 1, que dio `Both screens` limpia 5/5. Los tres puntos numerados
(205-208) sí están impecables —preguntas indirectas y sintagmas nominales—, pero las dos líneas de
prosa que los envuelven (204 y 210) son cinco oraciones conjugadas seguidas
(`Kevin says point 2`, `Valentina says yes…`, `Then Valentina sends the message.`,
`When Valentina sends it, it's over.`). **No cuentan como FALLA y no lo son**: son acotaciones en
tercera persona sobre los dos jugadores, ninguna hace avanzar el turno, y la pantalla es
compartida, así que no hay asimetría que romper. Van marcadas como riesgo meta por una razón de
nivel, no de calcabilidad: es la prosa más densa del fichero después de la carta, y §11 la quiere
en A2 leído igual que al resto.

## Aparte 4: lo que se ve desde aquí y no es calcabilidad

- **Tres filas de vocabulario están compartidas literalmente entre las dos fichas** en la columna
  `what it is`: `to owe someone` (72/144), `a spot` (71/145) y `the guard at the gate` (75/147).
  §11 pide «solo las de **este** rol en **este** escenario». Aquí solo cambia la columna `here`, y
  el fallo 1 es la factura de eso.
- **Línea 204** — `each of you says **his** own part`. Valentina es una de las dos.
- **Línea 114** — `The 200,000 … are`: concordancia dudosa con una cantidad. La reescritura de R12
  la resuelve de paso al cambiar el verbo por dos puntos.
- **Líneas 179 y 198** — la prosa más subordinada del fichero, en la pantalla que el estudiante
  abre **a mitad de turno, con el reloj corriendo**.
- **Línea 81** — encadena seis incisos con guiones largos anidados y sin un punto, igual que en el
  escenario 2. Se apunta otra vez, para la pasada de nivel.

---

## Efecto sobre el presupuesto de prosa

Medido con el método que declara el propio fichero (líneas 259-262: toda línea que no empieza por
`|`, entre el encabezado de un rol y el separador siguiente). Verificado: da **374** y **370**, las
cifras declaradas.

**Ninguna reescritura añade palabras.** De las 27 propuestas, catorce tocan prosa contada; el resto
están dentro de tablas, que no cuentan.

| ficha | reescrituras de prosa | delta | antes | después |
|---|---|---|---|---|
| ROLE A | 30 (−1), 40 (−1), 45 (−3), 46 (−1), 47 (−2), 49 (−1), 81 (−1), 98 (−1) | **−11** | 374 | **363** |
| ROLE B | 104 (−1), 111 (−2), 114 (−1), 121 (0), 156 (−2), 173 (−1) | **−7** | 370 | **363** |
| La carta | ninguna: los tres arreglos son filas de tabla | 0 | 94 | 94 |

Las dos fichas bajan y quedan iguales entre sí. El control que el fichero declara —«el mismo texto
medido con la misma regla antes y después»— sigue en verde, con once y siete palabras más de
margen.

Las tres reescrituras de prosa que no son de una palabra:

**Línea 40** (30 palabras → 29):
> `1. Put money in for somebody else. 600,000 out of your pocket, his part missing. His, yes; a stranger's, no. Your share of a new split: fine, nobody else's.`

**Línea 45**, solo la cola (12 → 9):
> `… **call back: 7:00 a.m.** Told: a card in his hand. Untold: bargaining blind.`

**Línea 111**, solo la cola (7 → 5):
> `… — not just Valentina's name — that one: a question back, and a call to Valentina.`

---

## Contraste con la ronda 1

Las dos pasadas se hicieron por separado sobre el mismo fichero y convergen casi exactamente:

| | ronda 1 | ronda 2 (esta) |
|---|---|---|
| unidades | 105 | 106 |
| FALLA | 5 | 5 — **las mismas cinco líneas** |
| riesgo | 24 | 26 |
| veredicto | pasa con cambios | pasa con cambios |

Que dos recorridos independientes marquen **exactamente las mismas cinco líneas** es la mejor
señal que puede dar este informe: la prueba de §11 es reproducible, y los cinco fallos no son
opinión.

**Tres correcciones a la ronda 1, todas de número de línea** (verificadas con `grep -n` sobre el
fichero; importan porque quien aplique los arreglos va a buscar por línea):

| dónde | la ronda 1 dice | es |
|---|---|---|
| el grave del precio de la carta (`she charges you`) | línea 185 | **186** — la 185 es la fila `Room` |
| `how the six were meant to pay · five did` | línea 147 | **148** |
| `how much is missing, once the numbers are out` | línea 149 | **150** |

**Una diferencia de criterio, adjudicada:** la línea 81 (`Hernán's car stays out`). La ronda 1 la
puso en FALLA; mi primera pasada la puso en riesgo. Se resuelve **a favor de FALLA**, por el
motivo escrito en el fallo 5: leída fuera del contexto del bloque —que es como se lee— es autónoma
y jugable, y la ambigüedad entre instrucción y parlamento es en sí misma el defecto.

**Dos diferencias de recuento**, ninguna cambia el veredicto: cuento una unidad más (separo la
prosa meta de la carta en dos unidades) y dos riesgos más, las líneas 204 y 210 de la pantalla
compartida, que la ronda 1 da limpias — ver *Aparte 3*: no son decibles, se marcan por nivel.

**Y una cosa que la ronda 1 no tiene, que es lo que aporta esta pasada:** el motivo gramatical del
fallo 1. `you did not pay it yet` no solo entrega la jugada fuera de la tabla de exponentes: la
entrega en **pasado simple con `yet`**, que es el error de A2 contra el que el propio fichero puso
el anclaje `present-perfect-ever-never` (su *rationale*, línea 232, lo dice con todas las letras).
El exponente 87 enseña `You haven't paid me yet.`; la línea 72 enseña lo contrario, en la pantalla
que el estudiante lee primero. Eso sube el fallo 1 de «duplica un exponente» a «compite con él y
gana», y es la razón de que sea el primero de los tres bloqueantes.

---

## Lo que hay que hacer antes de publicar

**Bloqueante — los tres graves** (líneas 72, 188, 186). Mientras estén, el escenario se resuelve
leyendo por sus dos sitios más caros: la apertura de Valentina y la noticia entera de la carta,
que es justo la pieza que el diseño quiere que cueste.

**Después, en este orden:**

1. Los dos medios: líneas 47 y 81 — los dos son de A y los dos ahorran palabras.
2. R18 (línea 121), que está a **una palabra** de volcar los tres datos ocultos de Kevin.
3. Los tres rótulos con verbo: R2, R4, R13 (líneas 62, 58, 134) — las tres jugadas centrales.
4. Los riesgos caros del dato oculto y del toolkit: R1, R9, R10, R14, R15.
5. El resto, que son de una palabra cada uno.

**Dos reglas que salen de aquí para el resto del set:**

- **Una fila de vocabulario duplicada entre las dos fichas se lee dos veces, una por pantalla.** La
  misma cadena de caracteres puede ser inocua en un rol y ser el fallo grave del fichero en el
  otro, y el segundo no se ve desde el primero.
- **Cuando una línea de la ficha reproduce una jugada que ya está en la tabla de exponentes, hay
  que comprobar además que la reproduce bien.** Aquí la reproducía en el tiempo verbal que el
  escenario existe para corregir.
