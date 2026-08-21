# Escenario 4 · `a-charge-i-did-not-make` — ¿se puede leer en voz alta?

Auditoría de calcabilidad contra §11 del blueprint (`docs/habla-acompanado-blueprint.md`,
líneas 242-258):

> La ficha se escribe **en notas, no en frases**. `Exam: Saturday 12, 8:00 a.m.` sí.
> `I'm taking the exam on Saturday at eight.` no, jamás, ni en los datos ni en la situación ni
> en los objetivos. Las frases decibles viven **solo** en la tabla de exponentes.
>
> Prueba: si una línea se puede decir tal cual en la conversación y el turno avanza, está mal
> escrita.

Auditado: `artifacts/habla-a2/fase7-fichas-4-a-charge-i-did-not-make.md` (versión del 20 ago
2026, la ya corregida con los 66 hallazgos de fase 7).

**Fuera de alcance por diseño:** las dos tablas *Say it here* (líneas 76-86 y 148-158), que son
exponentes y ahí las frases van a propósito; la nota de diseño de la carta (182-187), el bloque
*After* (203-208) y las secciones de contabilidad del final, que están en español; y
`grammarReferences` (212-239), que es metadato de código y no llega a pantalla.

## Cómo se marcó cada línea

- **FALLA** — la línea, o una cláusula autónoma donde el ojo puede parar, es un enunciado inglés
  bien formado, **en la persona correcta**, que ese rol le puede decir al otro y el turno avanza.
- **RIESGO** — es oración, pero dicha *tal cual* apunta mal: hace falta un cambio (un pronombre,
  un posesivo) para que funcione en la boca. No falla la prueba literal; la sostiene un pronombre.
- **ENTREGA** — no se dice tal cual, pero pone la frase hecha en la mano fuera de la tabla de
  exponentes.

**Unidad = una línea impresa**: una viñeta, una fila de tabla (leída de corrido, etiqueta
incluida), un bloque de prosa, una nota de cabecera. Mismo criterio que en los escenarios 1 y 2,
para que los tres números se puedan comparar.

---

## Veredicto

**PASA CON CAMBIOS.** 16 frases decibles repartidas en 15 unidades; ninguna obliga a rehacer una
sección, todas son reescrituras de una línea.

**Ninguna de las 15 entrega el dato oculto de A ya pronunciado**, y esa es la diferencia con el
escenario 2, donde tres lo hacían y eran bloqueantes. Aquí el sobrino, la tarde del 26 de julio y
la finca sin wifi viven en nota pura en los cuatro sitios donde aparecen —fila de datos, `Only you
know`, columna `here` de `to lend`, y la carta entera—. Eso está bien hecho y hay que decirlo.

Lo bloqueante es otra cosa, y no es una FALLA sino un patrón: **el dato oculto de B está tres
veces a un posesivo de ser pronunciable**, y el estudiante que lee en voz alta hace ese cambio
solo, sin darse cuenta. Y una FALLA sí es grave por sí sola: la ficha de B imprime su turno 1
entero, palabra por palabra, en la prosa del andamiaje.

Unidades en inglés auditadas, sin contar exponentes: **94**.
Fallan **15** (16,0 %). Otras **22** están a un pronombre de fallar. **2** son entregas.

| escenario | unidades | FALLA | % |
|---|---|---|---|
| 1 | 73 | 7 | 9,6 % |
| 2 | 94 | 18 | 19,1 % |
| **4** | **94** | **15** | **16,0 %** |

Está entre los dos, más cerca del 2. Y falla donde el 2 estaba limpio: la columna `what it is`
del vocabulario, que en el escenario 2 salió 20 de 20 sin un fallo, aquí es la peor sección de la
ficha.

---

## Dónde se concentran

| sección | unidades | FALLA | RIESGO | estado |
|---|---|---|---|---|
| Vocabulario, columna `what it is` | 20 | **5** | 1 | **la peor — y en el escenario 2 estaba limpia** |
| Vocabulario, columna `here` | 20 | **2** | 7 | mejoró: el 2 tenía 6 fallas aquí |
| **Facts** (9 de A + 10 de B) | 19 | **2** | 1 | las tres son de A · **las 10 filas de B: limpias** |
| `You can't` (3 + 3) | 6 | **2** | 3 | las dos fallas son de B |
| `Your toolkit` | 2 | **1** | 1 | la falla es de B, y es la peor de la ficha |
| `If you walk away with nothing` | 2 | **1** | 1 | |
| `You want` (objetivo) | 2 | **1** | 1 | |
| `Both screens — how it ends` | 6 | **1** | 0 | |
| `Only you know` (dato oculto) | 3 | 0 | **3** | 0 fallas, pero las 3 son el dato de B |
| `Where you are` (situación) | 2 | 0 | 2 | la de A es nota, la de B son cuatro oraciones |
| La carta (cabecera + 4 filas + prosa) | 6 | 0 | 1 | **las 4 filas: notas puras** |
| `You did it if` (criterios) | 2 | 0 | 1 | + 1 entrega |
| Notas de cabecera (`Formal…`, `Your screen only`) | 4 | 0 | 0 | limpias |
| **Total** | **94** | **15** | **22** | |

Por rol: **ROLE A** 40 unidades, 6 fallas (15,0 %). **ROLE B** 42 unidades, 8 fallas (19,0 %).
Compartidas (carta y cierre) 12 unidades, 1 falla.

**Cuatro concentraciones, en este orden de gravedad.**

1. **La definición del vocabulario dejó de ser una definición y se volvió una frase.** Cinco de
   las quince. El defecto es mecánico y se ve a simple vista: una definición correcta es un
   sintagma nominal (`money the company puts on your bill`), y estas cinco tienen sujeto y verbo
   conjugado (`It tells you before something happens`, `The store writes it`, `the plan does not
   pay for it`, `nobody is using it`, `it goes to another office`). El delator es que en la misma
   tabla hay quince definiciones bien escritas: no es que no se sepa hacer, es que en cinco filas
   se explicó con una oración en vez de con un nombre.

2. **El andamiaje de B imprime la primera línea de B.** `Good morning. How can I help you?` está
   en la prosa de *Your toolkit*, en code-span, fuera de la tabla de exponentes. No es un riesgo
   de que se lea: **es el turno 1 de B, entero, y el turno avanza.** La ficha de A hace lo mismo
   en pequeño con `"I don't know"`. Que las dos citas vengan de la caja de herramientas no las
   salva: §11 dice que lo pronunciable vive solo en la tabla de exponentes, y esto está impreso
   arriba de ella.

3. **El dato oculto de B, tres veces a un posesivo.** `Your bonus depends on that survey`,
   `that survey is your bonus`, `The proof is on your screen`. Ninguna falla la prueba literal
   —dichas tal cual, con `your`, apuntan al cliente y no significan nada—. Pero el cambio que las
   convierte en confesión es `your` → `my`, que es exactamente el cambio que hace un estudiante
   cuando lee su propia ficha en voz alta. En el escenario 2 el equivalente sí llegó a FALLA y se
   marcó como bloqueante; aquí se queda a un pelo, y el pelo es un pronombre.

4. **La frase que B tiene prohibido decir está impresa dos veces en forma decible.**
   `Don't say the failure is the company's.` y `You never said it was the company's fault`. Las
   dos veces la prohibición se escribe citando la frase prohibida entera y bien formada. Un rol
   que lee su ficha en voz alta dice justo lo que la ficha existe para impedirle decir, y encima
   rompe su propio criterio de éxito.

**Y lo que salió bien, que es la mitad del informe.** Las diez filas de datos de B son notas
puras, sin una sola oración —la fila 119, con los dos bloques de consumo, es el modelo de cómo se
escribe un dato complejo sin verbo—. La fila 122 (`SMS alert: dead since the June system change`)
es la prueba de que la ficha sabe la regla: el mismo hecho vive en nota en la tabla de datos y en
frase en el exponente (`In June the company changed its system, and the SMS stopped.`), que es
exactamente el reparto que pide §11. La carta, que en el escenario 2 fallaba, aquí son cuatro
filas nominales. Y los dos bloques `You did it if` no tienen ni una frase decible.

---

## ROLE A — las seis que fallan

**A-1 · línea 31 · `You want`**
> `Only the money, and the same bill comes back in thirty days.`

`the same bill comes back in thirty days` es presente simple, tercera persona, bien formado, y es
**el argumento central de A**: por qué el dinero solo no le sirve. Dicho tal cual en el mostrador
funciona y el turno avanza.
**En nota:** `Only the money = same bill in thirty days.`

**A-2 · línea 51 · Facts, fila `A written claim`**
> `the store writes it, you sign it, and they send it to another office`

`The store writes it.` es cláusula autónoma, coma delante y detrás, persona correcta, y sirve para
comprobar que se ha entendido el trámite. La segunda cláusula apunta mal (`you sign it` dicho a B
le atribuye a B la firma), pero la primera no necesita nada.
**En nota:** `store writes it · your signature · goes to another office`

**A-3 · línea 52 · Facts, fila `Other ways out`**
> `the call ended both times`

Pasado simple, tercera persona, y es una de las razones por las que A está hoy en el mostrador.
Se dice tal cual.
**En nota:** `2 calls to the call center · 30+ min each · cut off both times`

**A-4 · línea 66 · Vocabulario, `an alert`, columna `what it is`**
> `a short message. It tells you before something happens`

La única definición de la ficha de A escrita como oración con punto y seguido. `It tells you
before something happens.` se dice tal cual cuando A reformula lo que le acaban de explicar.
**En nota:** `a short message that comes before something happens`

**A-5 · línea 67 · Vocabulario, `a written claim`, columna `what it is`**
> `a paper. The store writes it, you sign it, and they send it to another office`

Misma frase que A-2, duplicada en la otra tabla. Se arreglan las dos o no se arregla ninguna.
**En nota:** `a paper written by the store, signed by you, sent to another office`

**A-6 · línea 60 · Vocabulario, `a bill`, columna `here`**
> `yours is from August 5, and it covers July`

Dos cláusulas coordinadas, las dos bien formadas, las dos en la persona correcta. `Yours is from
August 5, and it covers July.` es literalmente lo que A dice al poner la factura en el mostrador.
Es el caso exacto que §11 describe para esta columna: explicar para qué sirve la palabra empujó
hacia la frase que se dice con ella.
**En nota:** `yours: August 5, for July`

---

## ROLE B — las ocho que fallan

**B-1 y B-2 · línea 103 · `You can't`, restricción 1** — dos frases en una sola unidad
> `it costs three things`
> `the form only takes what the customer says, not what your screen says`

`It costs three things.` es la advertencia que B tiene que poner sobre la mesa antes de que nadie
firme, y está impresa lista. `The form only takes what the customer says` es la palanca con la que
B saca el dato al cliente —tercera persona, bien formada, autónoma antes de la coma— y también
está lista.
**En nota:** `a change of plan · price: three things — day, hour and activity in the form · form
takes only the customer's words, not the screen's · six months signed · no block. One missing, no
plan.`

**B-3 · línea 105 · `You can't`, restricción 3**
> `Don't say the failure is the company's.`

La prohibición imprime la frase prohibida entera: `The failure is the company's.` Persona
correcta, bien formada, y el turno avanza —hacia donde no debe—.
**En nota:** `Blame on the company: forbidden out loud · goes on paper · not your call.`

**B-4 · línea 111 · `If you walk away with nothing`**
> `And the same case comes back to this counter later, the long way, and bigger.`

Espejo exacto de A-1: la misma construcción de presente simple con `comes back` en la sección de
consecuencias de los dos roles. Dicha tal cual es el argumento de B para cerrar hoy.
**En nota:** `same case back at this counter later — the long way, and bigger`

**B-5 · línea 133 · Vocabulario, `extra data`, columna `what it is`**
> `the plan does not pay for it`

En la ficha de A la misma cláusula lleva `your plan` y se queda en riesgo. Aquí va en tercera
persona, que es justo la persona en la que B lo dice: `The plan does not pay for it.`
**En nota:** `data over the 8 GB in the plan — outside what the plan pays`

**B-6 · línea 136 · Vocabulario, `idle`, columna `what it is`**
> `on, but nobody is using it`

`Nobody is using it.` es enunciado completo, natural y turn-advancing: es la explicación del
segundo bloque de consumo, la que limpia al sobrino. La definición entrega la frase que el
criterio de éxito de B exige producir.
**En nota:** `on, with nobody using it`

**B-7 · línea 140 · Vocabulario, `a written claim`, columna `what it is`**
> `a paper you write and they sign, and it goes to another office`

`It goes to another office.` es la mitad de lo que B tiene que explicar del reclamo escrito.
**En nota:** `a paper written by you, signed by them, for another office`

**B-8 · línea 137 · Vocabulario, `a retention plan`, columna `here`**
> `your last card, and it costs three things`

Tercera aparición de `it costs three things` en la ficha (restricción 1, esta fila, y de rebote el
criterio de éxito). Las tres se reescriben juntas.
**En nota:** `your last card — price: three things`

**B-9 · línea 144 · `Your toolkit`** — la más grave de la ficha
> «`Good morning. How can I help you?`» *is your answer, not your opening*

Dos enunciados completos, en code-span, fuera de la tabla de exponentes, y son **el turno 1 de B
palabra por palabra**. No hay ninguna versión de esto que no sea calcable: la línea existe para
decir cuándo se usa esa frase, y para decirlo la imprime.
**En nota:** `block 1 [grants] is your answer, not your opening — they walk up with the bill`

---

## Compartida — la que falla en las dos pantallas

**C-1 · línea 195 · `Both screens — how it ends`, punto 3**
> `**Does the case close today?**`

Pregunta completa, bien formada, que cualquiera de los dos puede hacerle al otro tal cual, y el
turno avanza. Los puntos 1 y 2 del mismo bloque están escritos como rótulos nominales
(`How much money comes back, and how:`, `What stops it from happening again`); el 3 rompe el
patrón y se escribe como pregunta.
**En nota:** `**Whether the case closes today.** If not: what goes on paper, and what stays open.`

---

## Las 22 que están a un pronombre

No fallan la prueba literal. Se listan porque el cambio que las convierte en frase es el que hace
solo quien lee su ficha en voz alta, y porque tres de ellas son el dato oculto de B.

### Las tres caras — dato oculto de B

| línea | cita literal | a un cambio de | en nota |
|---|---|---|---|
| 108 | `**Your bonus depends on that survey**` | `your` → `my` | `bonus: tied to that survey` |
| 111 | `that survey is your bonus` | `your` → `my` | `a bad survey → the bonus` (o fundirla con la fila 108 y no repetir el dato) |
| 109 | `The proof is on your screen, and it stays there.` | `your` → `my` | `proof: on your screen · stays there` |

### ROLE A (12)

| línea | cita literal | en nota |
|---|---|---|
| 29 | `You have the printed bill and ticket 07.` | `with you: the printed bill, ticket 07` |
| 34 | `say you will go to another company` | `no threat of another company` |
| 36 | `did someone else use the phone?` — pregunta de B impresa en la pantalla de A | `if they ask straight about who used the phone: the truth` |
| 36 | `you say the truth` | `the truth, always` |
| 38 | `How much, and what he did: you don't know yet.` | `how much, and what he did: not known yet` |
| 38 | `You don't say it first — you think the claim dies with it.` | `not said first — your read: the claim dies with it` |
| 40 | `42,000 you didn't spend` | `42,000 of charges that aren't yours` |
| 53 | `gigas are worth more to you than they look` | `gigas: worth more to you than they look` |
| 53 | `connection drops often` | `connection: drops often` |
| 62 | `your plan does not pay for it` | `outside what your plan pays` |
| 61 / 62 / 65 / 67 | `the 42,000 you didn't make` · `the line on the bill you don't accept` · `they'll offer it` · `it has one hard box` | `the 42,000 not yours` · `the line under dispute` · `on their list of offers` · `one hard box in it` |
| 72 | `these bill words are new to you` | `bill words: new to you` |

### ROLE B (9)

| línea | cita literal | en nota |
|---|---|---|
| 98 | `You are in the mall store.` | `the mall store` |
| 98 | `ticket 07 is on your screen` | `on your screen: ticket 07` |
| 98 | `Someone is at the counter with a printed bill, and they are not buying anything.` | `at the counter: a printed bill, and nothing to buy` |
| 100 | `You want to close the case today, at this counter.` | `the case closed today, at this counter` |
| 100 | `Your screen has the day and the hours.` | `on your screen: the day, the hours` |
| 104 | `Credit note, gigas, or a change of plan.` — el menú de la oferta, listo para leer | `three ways out: credit note · gigas · change of plan` |
| 105 | `that decision is not yours` | `not your decision` |
| 134 | `way out three cuts the 42,000 into three bills` | `way out three: the 42,000 in three bills` |
| 138 / 135 | `it goes on the table before anybody signs` · `it clears whoever had the phone` | `on the table before anybody signs` · `clears whoever had the phone` |
| 161 | `Something starts today that stops the same bill next month` | `something starting today that stops next month's bill` |
| 180 | `You also have the one thing they keep asking for` (carta) | `in your hands now: the one thing they keep asking for` |

### Las dos entregas

| línea | cita literal | por qué |
|---|---|---|
| 72 | `you can't answer "I don't know", because you know` | imprime entrecomillada una frase decible fuera de exponentes. **En nota:** `no room for a "don't know" answer — you know` |
| 161 | `You never said it was the company's fault` | segunda impresión decible de la frase prohibida de B (ver B-3). **En nota:** `no blame put on the company, and still an answer about the message that never came` |

---

## Aparte — dos cosas que vi y no son calcabilidad

1. **La tabla de presupuesto de prosa va con marcadores sin rellenar.** Líneas 251-252:
   `**PLACEHOLDER_A palabras**` y `**PLACEHOLDER_B palabras**`. La ficha se entrega sin la
   medición de §11 hecha. No es mi encargo, pero sale del archivo tal como está.

2. **`Say it here` de A tiene 9 filas y `Say it here` de B tiene 9**, dentro del rango 6-9 de
   §11, y la nota de cabecera de las dos dice `**don't read it out loud**`. Esa advertencia es lo
   correcto para la tabla de exponentes; el problema de este informe es todo lo que está **fuera**
   de ella y no lleva ninguna advertencia.

---

## Qué habría que hacer

**Antes de publicar** (las 15, ninguna cuesta más de una línea):

1. **B-9 primero.** Sacar `Good morning. How can I help you?` de la prosa del andamiaje. Es la
   única falla que entrega un turno completo.
2. **Las cinco definiciones del vocabulario** (A-4, A-5, B-5, B-6, B-7). Regla mecánica, no de
   criterio: si la celda `what it is` tiene sujeto y verbo conjugado, se reescribe como sintagma
   nominal. Las quince definiciones que sí lo son sirven de modelo dentro del mismo archivo.
3. **Las dos impresiones de la frase prohibida de B** (B-3 y la entrega de la línea 161): nombrar
   el tema sin formar la frase.
4. **Las tres de `it costs three things`** (B-1, B-8 y su eco en el criterio) en una pasada.
5. **Los dos `comes back`** simétricos (A-1 y B-4).
6. **Las tres filas de datos de A** (A-2, A-3 y el duplicado A-5): las diez filas de B, que están
   limpias, son el modelo a copiar sin salir del archivo.
7. **El punto 3 del cierre** (C-1), que además desalinea el patrón de sus dos hermanos.

**Después, y no en este escenario:** las tres de `your` → `my` del dato oculto de B. La decisión
de fondo —si la segunda persona es andamiaje legítimo o es una falla a un pronombre— es del
conjunto, aparece en los tres escenarios auditados hasta ahora y va a fase 8, igual que el
hallazgo 66 de la ronda anterior.
