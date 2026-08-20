# Escenario 2 · `no-appointment-until-thursday` — ¿se puede leer en voz alta?

Auditoría de calcabilidad contra la regla de §11 del blueprint
(`docs/habla-acompanado-blueprint.md`, líneas 242-258):

> La ficha se escribe **en notas, no en frases**. `Exam: Saturday 12, 8:00 a.m.` sí.
> `I'm taking the exam on Saturday at eight.` no, jamás, ni en los datos ni en la situación ni
> en los objetivos. Las frases decibles viven **solo** en la tabla de exponentes.
>
> Prueba: si una línea se puede decir tal cual en la conversación y el turno avanza, está mal
> escrita.

Auditado: `artifacts/habla-a2/fase7-fichas-2-no-appointment-until-thursday.md`.

Fuera de alcance por diseño: las dos tablas *Say it here* (líneas 80-88 y 150-159), que son
exponentes y ahí las frases van a propósito; la nota de diseño de la carta (179-182) y el bloque
*After* (197-199), que están en español; y `grammarReferences` (204-227), que es metadato de
código y no llega a pantalla.

---

## Veredicto

**PASA CON CAMBIOS**, pero con menos margen que el escenario 1. Son 18 reescrituras de una línea
cada una —ninguna obliga a rehacer una sección— pero **tres de ellas entregan el dato oculto ya
pronunciado**, y esas tres son bloqueantes: mientras estén, el escenario se puede resolver
leyendo, que es exactamente lo que §11 existe para impedir.

Unidades de pantalla en inglés auditadas, sin contar exponentes: **94**.
Fallan **18** (19,1 %). Otras **15** están a un pronombre de fallar.

Para comparar: el escenario 1 falló 7 de 73 (9,6 %). Este falla **el doble en proporción**, y
falla en una sección que en el escenario 1 estaba limpia — la tabla de datos.

---

## Dónde se concentran

| sección | unidades | FALLA | riesgo | estado |
|---|---|---|---|---|
| Tabla de vocabulario, columna `here` | 20 | **6** | 6 | **la peor otra vez** (3 en A, 3 en B) |
| **Facts** (10 + 10 filas) | 20 | **4** | 3 | **la novedad mala** — en el escenario 1 estaba limpia |
| `Only you know` (dato oculto) | 5 | **2** | 4 | la más cara: 2 de las 3 graves salen de aquí |
| `You can't` (restricciones) | 5 | **2** | 2 | las dos son de ROLE A |
| `If you walk away with nothing` | 2 | **1** | 0 | |
| Nota de registro (la del `>` inicial) | 2 | **1** | 0 | solo ROLE B; la de A está bien |
| La carta | 4 | **1** | 0 | y aquí **no** se protege sola |
| `Both screens — how it ends` | 6 | **1** | 0 | |
| Tabla de vocabulario, columna `what it is` | 20 | **0** | 0 | **limpia** (20/20, son definiciones) |
| `Where you are` (situación) | 2 | **0** | 0 | **limpia** |
| `You want` (objetivo) | 2 | **0** | 0 | **limpia** en los dos roles |
| `You did it if` (criterios) | 2 | **0** | 0 | **limpia** en los dos roles |
| `Your toolkit` | 2 | 0 | 0 | limpia de calcable (ver §Aparte 2) |
| `Your screen only` | 2 | 0 | 0 | limpia |

**Tres concentraciones, y la segunda es la que no estaba en el escenario 1.**

1. **La columna `here` del vocabulario: 6 de las 18.** Mismo defecto que en el escenario 1, misma
   causa —es la pieza que §11 añadió, sin recorrido de auditoría— y aquí es peor porque el
   escenario tiene vocabulario asimétrico: la ficha se esfuerza en dar a cada rol su glosa propia,
   y al esforzarse escribe ejemplos. Un ejemplo es una frase.

2. **La tabla de datos de ROLE B está escrita en primera persona con verbo conjugado.** Esto es
   nuevo. En el escenario 1 las 20 filas de datos eran notas puras y no fallaba ni una. Aquí las
   de A siguen siendo notas —van sin sujeto: `full today and tomorrow`, `9:00 a.m. free`— pero
   las de B tienen sujeto y verbo: `I have the key`, `nobody is waiting for me`,
   `the delivery truck arrives at 6:30 a.m.`. Son oraciones, y son **las jugadas centrales de B**:
   su imposibilidad y su oferta.

   Lo delator es que en la misma tabla está la forma correcta. La fila 119 dice el dato oculto de
   B en nota impecable — `Sunday — a piece of my lower back tooth, broken · sharp edge on my
   tongue when I talk`: primera persona, cero verbos conjugados, imposible de leer en voz alta. El
   modelo de arreglo está tres filas más arriba del problema.

3. **El reparto entre roles se invierte respecto del escenario 1.** Allí A era la ficha floja
   (5 de 7). Aquí es parejo —**A: 9, B: 7**, más 1 de la carta y 1 de la pantalla compartida— pero
   por motivos distintos: A falla por explicar de más (tres de sus fallos son justificaciones en
   presente simple sobre terceros: la doctora, el administrador, Centro), B falla por escribir sus
   datos como si ya fueran su parlamento.

**Un cuarto patrón, y es el más barato de arreglar:** **5 de las 18 repiten algo que ya está en la
tabla de exponentes.** `Thursday at seven is the only one` (línea 64) contra el exponente 80
`The first free time is Thursday at seven.`; `it only covers here` (71) y `the plan does not pay
for it` (50) contra el exponente 84 `The plan pays for it here, and only here.`;
`nobody is waiting for me` (124) contra `I can wait here.` (154); `I have the key` (123) contra
`I can't come at seven, because I open the warehouse.` (153). El exponente ya existe. El cuerpo
de la ficha no tiene ninguna razón para repetirlo, y al repetirlo lo saca del único sitio donde
el estudiante sabe que hay frases.

Y un quinto, más pequeño: `Centro takes nobody without one` está **dos veces dentro de la misma
ficha de A** —fila de datos 51 y entrada de vocabulario 66—, las dos veces como oración.

---

## Las 3 graves — el dato oculto, ya pronunciado

### 1 · GRAVE — A lleva escrita la promesa que no puede prometer
**Línea 38**, ROLE A, `Only you know`:

> `- Dr. Restrepo leaves at 6:30, stayed late Monday. You don't ask her for favors — but for a broken tooth she doesn't say no. The key here.`

Dos oraciones decibles en un solo punto, y la ficha misma marca la segunda: *The key here*.

`Dr. Restrepo leaves at 6:30.` es presente simple, tercera persona, verbatim. Y ya está en nota
en la fila de datos 54 (`| Dr. Restrepo | leaves at 6:30 p.m. · …`), donde le corresponde: la
misma información, dos veces, una bien escrita y otra mal.

`For a broken tooth she doesn't say no.` es peor. Es la carta oculta entera de A —lo único que
convierte «no hay nada hasta el jueves» en «puede que sí»— y está redactada, en presente simple,
lista para leer en el turno uno. La restricción 1 de la propia ficha (línea 32) prohíbe hablar
con la doctora antes de las 5:00, y el exponente 81 le da a A la versión prudente
(`Something may open up later, but I can't promise anything.`). El dato oculto le devuelve la
versión imprudente, hecha frase.

**Reescritura:** `Dr. Restrepo · out at 6:30 · stayed late Monday · no favors from you — but a broken tooth, never a no from her. The key here.`

### 2 · GRAVE — B lleva escrito su imposible, en primera persona
**Línea 123**, ROLE B, fila de datos `Thursdays`:

> `| Thursdays | the delivery truck arrives at 6:30 a.m. — I have the key |`

Dos oraciones completas en una celda de datos. `The delivery truck arrives at six thirty` y
`I have the key` se dicen tal cual, y son **el motivo por el que el jueves a las 7:00 es
imposible**, que es el motor del escenario. Dicho de corrido, B resuelve su mitad del conflicto
leyendo, sin construir nada.

El exponente 153 ya le da la jugada montada —`I can't come at seven, because I open the
warehouse.`— y a propósito le esconde el detalle del camión, para que B tenga que explicarse.
La celda se lo devuelve.

**Reescritura:** `| Thursdays | delivery truck, 6:30 a.m. · storeroom key mine |`

### 3 · GRAVE — el detalle que da vuelta al escenario, en el vocabulario
**Línea 142**, ROLE B, vocabulario, entrada `chipped`:

> `| chipped | when a small piece breaks off | your tooth, in one word — and the edge is **sharp** |`

`The edge is sharp.` — presente simple, tercera persona, cuatro palabras, verbatim decible, y es
**el dato que hace que la conversación cambie de prioridad**: la propia ficha dice en la línea 109
que el trozo roto «sale si preguntan algo abierto», y la pregunta abierta es lo que la pauta de
cierre y la pregunta 1 del *After* miden. Si el estudiante lo lee, la pregunta abierta de A deja
de servir para nada y el escenario pierde su bisagra.

Y otra vez el arreglo ya está escrito en la misma ficha: la fila 119 lo dice en nota,
`sharp edge on my tongue when I talk`.

**Reescritura:** `| chipped | when a small piece breaks off | your tooth, in one word · plus **sharp** for the edge |`

---

## Las otras 15 que fallan

### ROLE A (6 más)

**4 · Línea 32**, `You can't` 1:
> `1. Ask Dr. Restrepo anything before 5:00 — she's mid-consultation. She writes to you; you don't call her.`

`Ask Dr. Restrepo anything before 5:00` está bien (infinitivo bajo *You can't*). `She's
mid-consultation.` es oración completa y es literalmente la excusa que A le da a B.
**Reescritura:** `Ask Dr. Restrepo anything before 5:00 — in consultation until then · in writing only, never a call.`
(16 palabras por 16: el presupuesto de prosa no se mueve.)

**5 · Línea 34**, `You can't` 3:
> `3. Send anyone away without a written date **and** something for tonight. The administrator checks the book at closing.`

`The administrator checks the book at closing.` — presente simple, tercera persona, y es una
jugada de presión real sobre B.
**Reescritura:** `Send anyone away without a written date **and** something for tonight. Book checked by the administrator at closing.`

**6 · Línea 39**, `Only you know`:
> `- Three no-shows this week. Every empty chair counts against reception — a patient sent elsewhere too.`

`Three no-shows this week.` es nota. `Every empty chair counts against reception.` es oración
completa, y es justo lo que A no debería soltar: su propia presión interna.
**Reescritura:** `Three no-shows this week · every empty chair against reception, a patient sent elsewhere too.`

**7 · Línea 50**, datos, `That check`:
> `| That check | 40,000 pesos · the plan does not pay for it |`

`The plan does not pay for it.` se levanta entera y es el negativo del exponente 84.
**Reescritura:** `| That check | 40,000 pesos · out of pocket, not on the plan |`

**8 · Línea 51**, datos, `To send someone there`:
> `| To send someone there | a referral note with the exact problem — Centro takes nobody without one |`

`Centro takes nobody without one.` — oración, y jugada (es como A justifica la nota).
**Reescritura:** `| To send someone there | a referral note with the exact problem · no note, no patient at Centro |`

**9 · Línea 64**, vocabulario, `slot`:
> `| slot | one free time in the book | Thursday at seven is the only one |`

Oración completa, y es **la mala noticia del escenario**, la misma que el exponente 80 dice
como exponente. Es el patrón exacto del hallazgo 2 del escenario 1: la frase existe dos veces,
una donde debe y otra donde no.
**Reescritura:** `| slot | one free time in the book | one only: Thursday, 7:00 a.m. |`

**10 · Línea 66**, vocabulario, `referral note`:
> `| referral note | a paper that says what's wrong, for another clinic | Centro takes nobody without one |`

Segunda aparición de la misma oración dentro de la misma ficha.
**Reescritura:** `| referral note | a paper that says what's wrong, for another clinic | your only key to Centro |`

**11 · Línea 71**, vocabulario, `to cover`:
> `| to cover | when the plan pays for the treatment | your best argument: it only covers here |`

`It only covers here.` es oración, es jugada, y duplica el exponente 84.
**Reescritura:** `| to cover | when the plan pays for the treatment | your best argument — here, and nowhere else |`

### ROLE B (4 más)

**12 · Línea 97**, nota de registro:
> `> **Formal.** Somebody else's counter, nobody you know. Distance even when it hurts: \`Can you help me, please?\`. **You start.** 6 turns · 6 minutes.`

Una pregunta completa, entre comillas invertidas, fuera de la tabla de exponentes — y es
**la apertura de B**, que además es quien arranca. Se lee y el turno 1 está resuelto.

Compárese con la nota equivalente de ROLE A (línea 24), que hace lo mismo **bien**: `I'm
afraid…`, `Let me…` son arranques con puntos suspensivos, no enunciados; marcan registro sin
dar una frase entera.
**Reescritura:** `Distance even when it hurts: \`Can you…?\`, never \`Hey\`.`

**13 · Línea 112**, `If you walk away with nothing`:
> `**If you walk away with nothing** · The pain, no date, nothing for tonight. And anywhere else the treatment is out of pocket — the plan works only here.`

La primera oración es nota impecable. Las otras dos son cláusulas completas en presente simple, y
la segunda —`The plan works only here.`— es **la palanca de B**, lo que le da derecho a insistir.
**Reescritura:** `The pain, no date, nothing for tonight. And the treatment out of pocket anywhere else — the plan, only here.`

**14 · Línea 124**, datos, `Today I can stay`:
> `| Today I can stay | until seven · nobody is waiting for me |`

Dos problemas en una fila. La **etiqueta** de la izquierda ya es primera persona con verbo
conjugado —única en las 20 filas de datos de las dos fichas— y leída de corrido con su celda da
`Today I can stay until seven`, que es la oferta de B palabra por palabra. Y
`nobody is waiting for me` es otra oración completa, que dice lo mismo que el exponente 154
(`I can wait here.`).
**Reescritura:** `| Today | free until seven · nobody waiting for me at home |`

**15 · Línea 137**, vocabulario, `emergency check`:
> `| emergency check | a short visit for pain, no appointment needed | another branch, tonight, and it costs money |`

`It costs money.` es corta pero es oración y es objeción real de B.
**Reescritura:** `| emergency check | a short visit for pain, no appointment needed | another branch, tonight · costs money |`

**16 · Línea 139**, vocabulario, `to squeeze someone in`:
> `| to squeeze someone in | to put a patient between two appointments | if it happens it isn't a full visit — ask how long |`

`If it happens, it isn't a full visit.` es un condicional completo y decible.
**Reescritura:** `| to squeeze someone in | to put a patient between two appointments | never a full visit — ask how long |`

### La carta (1)

**17 · Línea 176**, carta de Dr. Restrepo:
> `> | First I need two things | the exact problem + the date for the full treatment |`

`First I need two things: the exact problem and the date for the full treatment.` es exactamente
lo que A tiene que trasladarle a B, y se lee de la carta sin cambiar una palabra.

**Y aquí la carta no se protege sola, que es la diferencia con el escenario 1.** Allí el mensaje
citado era `I'm going to Barrancabermeja`, que leído en voz alta por el estudiante sale mentira
—no va a ninguna parte— y por eso le obliga al estilo indirecto, que era el ejercicio. Aquí la
primera persona de la doctora y la primera persona de A **coinciden en la necesidad**: A
efectivamente necesita esas dos cosas. Leerla en voz alta no produce nada falso, produce una
jugada correcta. Se pierde la transformación entera.

Las otras tres unidades de la carta —`one more patient, 6:15 p.m., between two appointments`,
`confirm before 5:30 p.m.` y el encabezado— están en nota y aguantan.
**Reescritura:** `| Before that, two things | the exact problem + the date for the full treatment |`

### Pantalla compartida (1)

**18 · Línea 189**, `Both screens — how it ends`, punto 2:
> `2. **How much gets paid, and when** (or "nothing, the plan covers it").`

`The plan covers it.` es cláusula completa, entrecomillada, decible, y cierra el punto 2 de los
cuatro del acuerdo. Es leve —está en pantalla compartida, así que no rompe la asimetría entre
roles— pero es una frase decible fuera de la tabla de exponentes, y los otros tres puntos de la
lista están en nota.
**Reescritura:** `2. **How much gets paid, and when** (or: nothing, covered).`

---

## Las 15 en riesgo — oración completa, a un pronombre de funcionar

No fallan la prueba literal: dichas *tal cual*, la segunda persona apunta al interlocutor y el
enunciado sale falso o absurdo. Fallan si el estudiante hace el único cambio obvio.

| # | línea | cita | por qué inquieta | en nota |
|---|---|---|---|---|
| R1 | 109 (B, dato oculto) | `a piece of your lower back tooth broke, and the edge cuts your tongue` | **el riesgo más caro del fichero**: `your`→`my` y es el secreto entero, en pasado simple. La fila 119 ya lo dice bien | `Sunday: a piece of your lower back tooth, broken · sharp edge cutting your tongue.` |
| R2 | 110 (B, dato oculto) | `Last time you gave your sister's number as the contact.` | `you gave`→`I gave` y es la reparación que el exponente 159 ya cubre | `Last time: your sister's number given as the contact.` |
| R3 | 109 (B, dato oculto) | `the pain is what matters, the piece looks like a detail` | dos cláusulas de presente simple; la primera es encuadre decible | `pain first, the broken piece as a detail` |
| R4 | 32 (A, `You can't` 1) | `She writes to you; you don't call her.` | `you`→`me` y es la excusa completa | ver reescritura 4 |
| R5 | 37 (A, dato oculto) | `You can say something may open up.` | quitando tres palabras queda el exponente 81 | `something may open up · never whose, never why` |
| R6 | 106 (B, `You can't` 2) | `This is your free afternoon.` | `your`→`my` y es argumento real | `Your one free afternoon.` |
| R7 | 53 (A, datos) | `\| The plan \| pays for the treatment, and only in this clinic \|` | la celda no lleva sujeto, pero leída con su etiqueta es oración; solo la separa el `\|` | `\| The plan \| treatment covered · this clinic only \|` |
| R8 | 126 (B, datos) | `\| My plan \| pays for the treatment, and only in this clinic \|` | idéntico, del otro lado del mostrador | `\| My plan \| treatment covered · this clinic only \|` |
| R9 | 54 (A, datos) | `\| Dr. Restrepo \| leaves at 6:30 p.m. · she writes to you, you don't call her \|` | sin sujeto en la celda, pero la segunda mitad se levanta con un pronombre | `\| Dr. Restrepo \| out at 6:30 p.m. · writes to you, never a call from you \|` |
| R10 | 62 (A, vocab `appointment`) | `the thing you don't have today` | relativa con `you`, un giro y es la mala noticia | `today: nothing to give` |
| R11 | 63 (A, vocab `walk-in`) | `that's the person in front of you` | `that's` completa; dicho a B es absurdo, pero está a un dedo | `the person in front of you, right now` |
| R12 | 133 (B, vocab `appointment`) | `you don't have one, and that's the problem` | `you`→`I` y es la apertura de B | `none, and that's the problem` |
| R13 | 134 (B, vocab `walk-in`) | `that's you, today` | igual que R11, del otro lado | `you, today` |
| R14 | 136 (B, vocab `slot`) | `they'll offer you one you can't take` | oración con futuro; `they`→`you` y es jugada | `one coming that you can't take` |
| R15 | 141 (B, vocab `waiting list`) | `you can ask to be on it` | instrucción al lector; `you can ask`→`can I` y es petición real | `something you can ask for` |

**Cinco de los quince riesgos son la misma cosa: la columna `here` del vocabulario escrita en
segunda persona.** No fallan porque el `you` apunta al interlocutor equivocado. Es una protección
accidental, no un diseño: la sostiene un pronombre.

---

## Aparte 1: la tabla de datos ya no es la sección segura

En el escenario 1 las 20 filas de datos pasaron limpias, con un solo roce. Aquí fallan 4 y rozan
3. El defecto no es aleatorio: **las 10 filas de A están escritas sin sujeto y las de B con
sujeto**.

| ROLE A — nota | ROLE B — oración |
|---|---|
| `full today and tomorrow · first free slot: Thursday 10, 7:00 a.m.` | `the delivery truck arrives at 6:30 a.m. — I have the key` |
| `9:00 a.m. free · Saturdays: only patients seen here before` | `until seven · nobody is waiting for me` |
| `something cold outside, 10 minutes · no chewing on that side` | |

Las dos columnas dicen datos del mismo tipo —una hora, una condición, una disponibilidad—, así
que no es que los datos de B sean más difíciles de anotar. Es que se escribieron desde dentro del
personaje en vez de desde su libreta. La prueba de que se podía: la fila 119 de la propia B.

Regla operativa para la pasada de arreglo, y para los escenarios que falten: **en una celda de
datos no entra un verbo conjugado.** Ni `arrives`, ni `is waiting`, ni `have`. Si hace falta un
verbo, va en participio (`broken`), en gerundio (`waiting`) o en sustantivo (`delivery`).

## Aparte 2: no es calcabilidad, pero se ve desde aquí

Igual que en el escenario 1, los dos bloques `Your toolkit` (líneas 74 y 145) no tienen ni una
línea decible —son instrucciones meta— pero son la prosa más densa del fichero: guiones largos
anidados dentro de guiones largos, listas de números mezcladas con etiquetas en `código` y con
cursivas. La línea 74 encadena cinco incisos sin un punto. §11 pide «frases cortas, presente y
pasado simple, cero subordinación larga» para el inglés A2 leído. Ese bloque no lo cumple, en las
dos fichas. No es lo que se me pidió medir; lo apunto para quien haga la pasada de nivel.

## Efecto sobre el presupuesto de prosa

**Las 18 reescrituras restan o empatan. Ninguna añade.** Importa más que en el escenario 1 porque
aquí **ROLE B está en 350 de 350** (línea 240 del fichero): cero margen. Una sola reescritura que
añadiera una palabra rompe el presupuesto declarado.

De las 18, **seis tocan prosa contada** —la grave 1 (línea 38) y las número 4, 5, 6 (ROLE A), 12
y 13 (ROLE B)—; las doce restantes están dentro de tablas, que no cuentan para el presupuesto.
Contadas palabra a palabra:

| ficha | reescrituras de prosa | delta | prosa antes | después | presupuesto |
|---|---|---|---|---|---|
| ROLE A | 1 (−2), 4 (0), 5 (0), 6 (−1) | **−3** | 346 | **343** | ≤ 350 |
| ROLE B | 12 (−1), 13 (−2) | **−3** | 350 | **347** | ≤ 350 |

Es decir: ROLE B sale del filo. Hoy está clavado en el tope y cualquier retoque posterior lo
rompe; después de estas dos reescrituras tiene tres palabras de margen.
