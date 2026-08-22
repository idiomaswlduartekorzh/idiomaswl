# Fase 13 · Calcabilidad — escenario 7, `two-more-people-for-the-trip`

**Auditado:** `artifacts/habla-a2/fase7-fichas-7-two-more-people-for-the-trip.md` **tal como está
hoy en disco** (22 ago 2026, commit `0a57fe20`, sin cambios sin commitear).
**Contra:** `artifacts/habla-a2/fase10-calcable-7.md` (PASA CON CAMBIOS · 1 decible / 142 unidades).
**Entran los dos cambios de hoy:** la pasada de carga (`2b6d494e`, cierre nuevo) y el recorte de
prosa de ROLE A (`0a57fe20`, seis frases).
**Alcance ampliado (blueprint §11, `a677b077`):** prosa de las dos fichas, filas de datos, filas de
vocabulario, carta, `how it ends` / `You did it if` **y las dos tablas `Say it here` auditadas como
objeto**.

**Prueba única:** si la línea se puede decir tal cual y el turno avanza, está mal escrita.

**Presupuesto, medido hoy** (`node artifacts/habla-a2/fase7-scripts/prosa-canonica.mjs`):
**ROLE A 449 · ROLE B 438**, techo 450. Cumple. *La cifra que declara la sección «Pasada de carga»
del propio archivo (B 442) está muerta; la del recorte (B 438) es la viva. Ver §6.*

---

## Veredicto

**NO PASA · 3 líneas decibles sobre 170 unidades (1,8 %) · 3 defectos estructurales.**

No pasa por una sola razón de peso: **la línea 113 de ROLE B revierte el hallazgo B-2 de fase 9**
—dato oculto convertido en oración lista para pronunciar, que §11 declara fatal— y lo revierte a
una forma **peor que la original**, porque la nueva no tiene ni un `you` que voltear. La revirtió la
pasada de carga, en una ficha que las dos bitácoras declaran **no tocada**.

| sección | unidades | decibles |
|---|---|---|
| A · prosa (regla propia, `You can't`, `Only you know`, situación, objetivo, toolkit, criterios, «si te vas sin nada») | 60 | **1** |
| B · prosa (íd.) | 58 | **1** |
| Tablas `Facts` (A 10 + B 10) | 20 | 0 |
| Vocabulario, las tres tablas (A 9 + B 10 + carta 2) | 21 | 0 |
| La carta (5 filas + 5 oraciones de nota) | 10 | 0 |
| **Tablas `Say it here` (9 + 9), contadas por segunda vez en el set** | 18 | 0 *(+2 estructurales)* |
| **`Both screens — how it ends`, reescrito hoy** | 22 | **1** *(+1 estructural)* |
| **total** | **170** | **3** |

Derivación desde las 142 de fase 10: −1 (la línea 113 pasó de tres oraciones a dos), +11 (el cierre
pasa de 11 a 22 unidades), +18 (las dos tablas de exponentes, que fase 10 declaraba fuera).

**Los tres arreglos de líneas cuestan 0 palabras de presupuesto**: dos son de palabra por palabra y
el tercero vive en el cierre, que el contador canónico no mide.

---

## 1 · Las tres decibles

### D-1 · GRAVE · ROLE B · `And a reason you can repeat` · línea 113

> `Andrea gets here in twenty minutes.`

Tercera persona, presente simple, sobre una ausente. **No hay `you` que voltear: no se rompe al
decirse.** Kevin la lee tal cual, Valentina la entiende entera, y el turno avanza — porque es
exactamente uno de los tres datos que la línea 123 de su propia ficha declara nuevos para ella:

> `**Three things are new to her:** Andrea's twenty minutes, Sebastián's shift, the hammock. Say them only if she asks.`

La ficha se contradice a diez líneas de distancia: manda dosificar un dato que ya ha impreso como
frase pronunciable. Y el mismo dato viaja **bien escrito** en la tabla de datos de la línea 140
(`Andrea | at the parking lot in 20 minutes · no ride there except yours`): nota, no oración. La
tabla lo tiene resuelto; la prosa lo regala.

**Es una reversión, no un fallo nuevo.** `fase9-calcable-7.md` §B-2 tumbó `You see Andrea here in
20 minutes.` por esto mismo, y `fase10-calcable-7.md` la dio por arreglada con
`Your twenty minutes with Andrea start now.` La pasada de carga (`2b6d494e`) reescribió la línea
entera y volvió al defecto sin declararlo.

**Arreglo (6 → 6 palabras):**
> `You have twenty minutes with Andrea.`

Volteada a Valentina es falsa y la ficha lo dice por escrito: `**You have never met Andrea.**`
(línea 49). Kevin tiene que convertirla él para soltar el dato.

### D-2 · `Both screens — how it ends` · línea 225

> `This one does not close tonight, and that is the plan: it closes with the two calls tomorrow, before 7:00 a.m.`

**Pantalla compartida: aquí la deixis no protege a nadie**, porque no hay `you` de dueño. Es
gramatical, es A2 de lectura, es verdadera en las dos bocas y **cierra la conversación**: dicha tal
cual es el desenlace aplazado servido. Además es 2/3 de la tercera línea de Valentina
(`what is not decided yet, the 7:00 a.m. call, and the plan B`), así que la pantalla que reparte
las seis líneas produce una de ellas por su cuenta.

Y de paso filtra: **la ficha de Kevin no menciona ninguna llamada, ni las 7:00 a. m., ni el 150.000**
(comprobado sobre las líneas 104-176). Que haya «dos llamadas mañana antes de las siete» es dato de
ella —el mecánico— y de la carta —doña Nubia—.

**Arreglo (21 → 11 palabras):**
> `This one does not close tonight, and that is the plan.`

El *cómo* cierra ya está asignado en la línea 210 como línea suya; no se pierde nada del diseño.

### D-3 · ROLE A · `If you walk away with nothing` · línea 51

> `And Kevin still hasn't paid.`

Sin `you`, presente perfecto, verdadera, y es **su queja central**. Nombrar al interlocutor en
tercera persona delante de él no rompe nada en la boca de un hispanohablante —«es que Kevin todavía
no ha pagado», dicho con Kevin delante, es idiomático—, así que el calco entra entero y el turno
avanza. Peor: duplica el exponente `You haven't paid me yet.`, que es justo la línea que la pasada
de carga quiere **producida** por ella y no pre-dicha en su prosa (cambio 2 de la carga: «la deuda
se resolvía sin que la acreedora la mencionara una sola vez»).

**Arreglo (5 → 5 palabras):**
> `And his 100,000 is missing.`

`his` ya tiene antecedente en la oración anterior (`all five are his`), y leída en voz alta apunta
fuera del interlocutor: se rompe.

---

## 2 · Los tres defectos estructurales

### E-1 · El cierre le enseña a Kevin la carta · línea 209

> `**Only Valentina can say:** how many beds there are, how many names and ID numbers the gate list carries, and who can change it · **the 150,000, and whose reservation the extra person goes on** · what is not decided yet, the 7:00 a.m. call, and the plan B if nobody answers before it.`

Los otros dos puntos nombran **la pregunta** (`how many beds there are`, `who can change it`). Este
nombra **la respuesta**, y la respuesta es el contenido entero de una pantalla que dice de sí misma
`Kevin never sees this screen` (línea 181) y `Kevin learns only what you tell him. You decide how
much.` (línea 200). Con la cifra impresa en la pantalla compartida, la discreción que la carta le
concede a Valentina no existe. La cifra es nueva de hoy: el cierre anterior no la traía.

**Arreglo (10 → 9 palabras):**
> `what an extra person costs, and on whose reservation`

### E-2 · Tabla `Say it here` de ROLE A: la última fila es el último movimiento · línea 97

> `| the message you send | `That's it — I'll send …` | say his part is fine, and send it |`

El cierre dice `Then Valentina sends the message to the WhatsApp group` — el gesto final del
escenario. En la tabla ocupa **la fila 9 de 9**, y la ocupa porque la etiqueta empieza por *the m*.
Es el defecto que `fase12-calcable-3.md` abrió en el molde: la cola de la tabla es el cierre. El
alfabético no se toca; se toca la etiqueta.

**Arreglo (4 → 2 palabras):** `the message you send` → **`group message`**.
Orden resultante: *asking about the people · asking about the plan · changing one thing · **group
message** · keeping the friendship · putting a price on a yes · saying what happens if · six beds,
six names · the debt*. El envío queda en mitad de tabla y la cola termina en la deuda, que es turno
medio.

**Segundo renombre, opcional pero del mismo precio (4 → 4):** `saying what happens if` →
**`if the day slips`**. Rompe la pareja adyacente `putting a price on a yes` → `saying what happens
if` (`OK — but only if …` seguido de `If I don't have it on …, I'll …`), que es exactamente la
secuencia que la regla nueva del cierre exige —conceder con condición, luego ponerle precio al día—
leída en orden.

### E-3 · Tabla `Say it here` de ROLE B: dos filas seguidas son dos de sus tres líneas de cierre · líneas 170-171

> `| the day you pay | `Can I pay you on …?` | ask for one exact day, not "soon" |`
> `| the words for outside | `What do I say to …?` | get an answer you can repeat outside |`

Filas 7 y 8. El cierre le asigna a Kevin, en este orden: nombre y cédula · **el día exacto del
pago** · **qué le dice a Sebastián y qué a Andrea**. Las filas 7→8 son la segunda y la tercera, en
orden y sin nada intercalado.

**Arreglo (4 → 3 palabras):** `the words for outside` → **`Andrea and Sebastián`**.
Pasa a la fila 1 (*andrea…* < *asking…*), la pareja se rompe, y la cola queda en
`the day you pay` → `when they paid you`, que no es ningún tramo del cierre. La fila 1 tampoco
reproduce el arranque: Kevin abre con `I know it's last minute, but …`, que sigue en mitad de tabla.

### Lo que las dos tablas SÍ cumplen

| prueba | ROLE A | ROLE B |
|---|---|---|
| (b) una función por fila, no un turno | sí, 9 funciones | sí, 9 funciones |
| (b) alfabético por función | sí, verificado fila a fila | sí, verificado fila a fila |
| (c) filas ≤ turnos (9 por rol) | 9 = 9 | 9 = 9 |
| §11, 6-9 exponentes | 9 | 9 |
| (d) `what it does here` en notas, no en líneas decibles | 9/9 (todas empiezan por infinitivo o sintagma) | 9/9 |
| (a) leída en orden ≠ la conversación | sí, salvo E-2 | sí, salvo E-3 |

**Aviso sobre (c):** nueve filas para nueve turnos no incumple la letra —no hay *más* filas que
turnos— pero es **una fila por turno, el máximo posible**. El molde va 6/7. Un jugador que baje la
tabla fila a fila llena la conversación entera sin escuchar. Esto es del guardián, no de un
escenario.

**Aviso sobre la columna `form`:** dos de las nueve de A (`Wait — we didn't say that.`,
`You haven't paid me yet.`) y dos de las nueve de B (`When did that change?`, `We're good, right?`)
son **oraciones cerradas**, no troncos con `…`. El molde tiene 0. Están así a propósito según la
bitácora §C, y la tabla es decible por diseño, así que no las cuento; queda dicho que son las que
un jugador flojo lee verbatim.

---

## 3 · El cierre reescrito, línea a línea

Es lo que más miré, por encargo. Aparte de D-2 y E-1, **está limpio**: 20 de las 22 unidades son
acotación en tercera persona sobre los dos jugadores o sintagma nominal sin verbo conjugado.

- `Each of you says three things out loud. Six in total. Nobody says the other person's three.` —
  instrucción, no turno.
- `**Only Kevin can say:** the full name and the ID number he sends tonight, and who he gets them
  from …` — los tres puntos son **preguntas encapsuladas**, no respuestas. Bien escrito: es el
  patrón que E-1 rompe en el punto de ella.
- `A day is not closed until the other one says what happens if it slips. The 100,000 needs two
  mouths, not one.` — `the other one` en tercera persona; no se le puede decir a nadie sin
  convertirla. Limpia.
- `The message says two numbers … and the two have to be the ones you just said out loud.` — el
  `you` es plural y de pantalla compartida, así que no voltea; sigue siendo instrucción, no turno.

**Un roce, no un hallazgo:** la regla 4 (línea 223) prohíbe `okay` mientras dos exponentes vivos
abren con él (`OK — but only if …` en A, `OK — I'll say it like this: …` en B) y el bloque 8 de la
caja —asignado a Valentina en su toolkit— lo trae impreso. La letra no se contradice (prohíbe el
asentimiento solo, no la concesión con precio), pero un jugador flojo tacha el exponente.
**Arreglo (18 → 18 palabras):**
> `Nobody nods their way through. *Yeah*, *sure*, *okay*, *fine* and *that works*, alone, are none of the six.`

---

## 4 · Las seis frases recortadas hoy, una por una

| línea | cómo queda | veredicto |
|---|---|---|
| 37 | `Kevin has to pay the 100,000, or give you a date tonight.` | **limpia.** El `you` interior la rompe al voltearla (le estaría pidiendo a Kevin que le dé fecha a Kevin) |
| 42 | `You can pay his part, nobody else's.` | **limpia** como decible (`his` apunta fuera del interlocutor). Nota de estilo, no de calcabilidad: la restricción ahora termina dos oraciones seguidas en `nobody else's`; el recorte compró una palabra con una repetición |
| 43 | `Your reservation has six names and six ID numbers, and only doña Nubia can change your list.` | **limpia.** `Your reservation` / `your list` son falsos en boca de Kevin; la reparación de fase 9 (el sujeto ya no es la portería) sobrevive al recorte |
| 47 | `…and the mechanic will call you at 7:00 a.m.` | **limpia, y mejor que antes.** Suelta sería decible, pero cuelga de `At 6:00 p.m. you watched Hernán leave his car…`, que volteado es falso; y `call you` volteado le da la llamada a Kevin, que no la tiene |
| 48 | `…with his car and gas, and you never told Kevin.` | **limpia.** Nombra a Kevin en tercera persona *dentro* de una oración cuyo sujeto es ella; no se levanta sola |
| 83 | `**2**: tomorrow you share a car.` | **al filo.** El recorte cambió `, because` por `:` y convirtió una subordinada en cláusula independiente con punto. La línea entera del toolkit sigue siendo telegráfica y no se puede decir, así que no la cuento. **Arreglo a coste cero: `**2**, tomorrow you share a car.`** |

**Ninguna de las seis introdujo una decible.** El recorte hizo lo que declara.

---

## 5 · Al filo, señaladas y NO contadas

| dónde | literal | por qué no cuenta |
|---|---|---|
| A · `Only you know` 1, l. 47 | `If you say nothing, maybe you promise seats you don't have.` | volteada, Kevin no ha prometido *seats* sino *spots* —la ficha separa las dos palabras en su vocabulario—, así que le sale falsa. Si alguien vuelve a tocar la línea: `If you say nothing, you promise Hernán's four seats.` (11 → 9) la cierra del todo |
| A · `Only you know` 3, l. 49 | `You have met Sebastián — he was on last year's trip.` | volteada es **verdadera** (Kevin conoce a Sebastián), pero dicha tal cual le cuenta a Kevin lo que Kevin ya sabe: el turno no avanza, y además dice lo contrario de lo que ella necesita |
| A · `You want`, l. 37 y `If you walk away…`, l. 51 | `Tomorrow six people go and five seats leave, and all five are his.` | proyección del fracaso, no hecho de ahora, y el `his` se rompe. Ya venía revisada de fase 10 |
| Carta, nota, l. 200 | `And you have to change something you already said out loud.` | volteada le exige a Kevin retractarse, que es jugada de ella, pero el contenido es `something`: obliga a una reparación, no produce un turno. Micro-arreglo (10 → 9): `And it changes something you already said out loud.` |
| Carta, nota, l. 200 | `You decide how much.` | instrucción de pantalla, sin contenido de escenario |
| Cabeceras, l. 32 y 106 | `Tomorrow you travel together.` | excluye al hablante; la forma de boca es `we`, y hay que convertirla |

---

## 6 · Fuera del cepillo: la contabilidad del archivo miente sobre ROLE B

No es calcabilidad, pero lo encontré midiendo y afecta a quien audite después.

- `fase12-carga.md` §3 y la sección «Pasada de carga» del propio archivo declaran: **«La ficha de B
  no se tocó»**, y ninguno de sus seis cambios es de ROLE B.
- El commit `2b6d494e` **reescribió la línea 113 de ROLE B** —dos oraciones fuera, una nueva— y con
  ella se fue el arreglo B-2 de fase 9 (D-1 de este informe).
- Medido sobre los tres commits con el contador canónico: **B 442 → 438 en la pasada de carga**, y
  **A 443 → 462 → 449**. La sección de carga declara `B 442` y la del recorte, tres párrafos más
  abajo, declara `B 438`: **el archivo se contradice consigo mismo en dos secciones contiguas**, y
  la del recorte —que además dice «ROLE B no se tocó»— es la que acierta la cifra por accidente.

Un cambio no declarado en la ficha que nadie estaba mirando es lo que produjo la única grave de
hoy. Merece una línea en el guardián: **si el contador se mueve en un rol, ese rol se tocó**.

---

## 7 · Qué hay que devolver a `habla-fichas-de-rol`

**Tres líneas y tres celdas. Cero palabras de presupuesto: A se queda en 449 y B en 438.**

| # | sitio | de | a |
|---|---|---|---|
| D-1 | l. 113, ROLE B | `Andrea gets here in twenty minutes.` | `You have twenty minutes with Andrea.` |
| D-2 | l. 225, cierre | `This one does not close tonight, and that is the plan: it closes with the two calls tomorrow, before 7:00 a.m.` | `This one does not close tonight, and that is the plan.` |
| D-3 | l. 51, ROLE A | `And Kevin still hasn't paid.` | `And his 100,000 is missing.` |
| E-1 | l. 209, cierre | `the 150,000, and whose reservation the extra person goes on` | `what an extra person costs, and on whose reservation` |
| E-2 | l. 97, tabla A, columna `function` | `the message you send` | `group message` |
| E-3 | l. 171, tabla B, columna `function` | `the words for outside` | `Andrea and Sebastián` |

Opcionales del mismo precio: l. 94 `saying what happens if` → `if the day slips`; l. 83 `:` → `,`;
l. 200 `And you have to change…` → `And it changes…`; l. 223 la lista de asentimientos con `alone`.

Con D-1, D-2 y D-3 el escenario queda en **0 decibles sobre 170**. Con E-1 la carta vuelve a ser
secreta, y con E-2/E-3 ninguna de las dos tablas es un guion.
