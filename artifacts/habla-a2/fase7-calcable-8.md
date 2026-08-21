# Escenario 8 · `cancel-the-gym-i-am-leaving` — ¿se puede leer en voz alta?

Auditoría de calcabilidad contra la regla del §11 del blueprint
(`docs/habla-acompanado-blueprint.md`):

> La ficha se escribe **en notas, no en frases**. `Exam: Saturday 12, 8:00 a.m.` sí.
> `I'm taking the exam on Saturday at eight.` no, jamás, ni en los datos ni en la situación ni
> en los objetivos. Las frases decibles viven **solo** en la tabla de exponentes.
>
> Prueba para el redactor: si una línea de tu ficha se puede decir tal cual en la conversación y
> el turno avanza, esa línea está mal escrita. Reescríbela como dato.

Auditado: `artifacts/habla-a2/fase7-fichas-8-cancel-the-gym-i-am-leaving.md`, en su estado de hoy
(21 de agosto), línea por línea y a ciegas.

**Esta es la tercera pasada sobre el mismo archivo, y las dos anteriores siguen en disco.** La
ronda 1 auditó el borrador anterior a la corrección y está en `fase7-calcable-8-ronda1.md`. La
ronda 2 auditó **este mismo texto** —la ficha no ha cambiado una coma desde entonces: las
referencias de línea de aquel informe (exponentes 87-99 y 166-178, `After` 211-215) siguen
cuadrando— y se conserva en `fase7-calcable-8-ronda2.md`. Este archivo es una **verificación
independiente**: se hizo sin mirar el desglose de la ronda 2 y luego se reconcilió con él. Al
final hay una sección que dice en qué coincide y en qué no.

Fuera de alcance por diseño: las dos tablas *Say it here* (87-99 y 166-178), que son exponentes y
ahí las frases van a propósito; la cabecera del set (1-24), en español; el bloque *After*
(211-215), también en español; `grammarReferences` (219-254) y los dos anexos del final
(258-330), que son metadato del redactor y no llegan a pantalla.

## Cómo se marcó cada línea

- **FALLA** — la línea, o una cláusula autónoma donde el ojo puede parar, es un enunciado inglés
  bien formado que ese rol le puede decir al otro **sin tocar una palabra**, apuntando a la
  persona correcta, y el turno avanza.
- **RIESGO** — es oración, pero dicha *tal cual* apunta mal: hay que cambiar un pronombre o un
  posesivo para que funcione en la boca. No falla la prueba literal; **la salva un pronombre, no
  el redactor**.
- **Limpia** — nota sin verbo conjugado. Las elipsis (`No log, no case`, `Wilmer, fired last
  month`, `Ticket bought, in your name`) cuentan como limpias: son exactamente la forma que pide
  el §11.

Dos reglas de lectura que cambian el resultado y conviene dejar escritas:

1. **Las filas de tabla se leen de corrido, etiqueta incluida.** `| A freeze | up to 60 days |` es
   una sola unidad.
2. **Los dos puntos no se oyen.** En el papel, `Card: expires August 31` y `Card expires August
   31` son dos cosas distintas; **en la boca son la misma**. El signo se ve y no se pronuncia. Lo
   que mata un verbo es sustituirlo por un sustantivo o un participio, no ponerle un signo
   delante.

Y la prueba escrita que el §11 da solo para el vocabulario, aplicada tal cual: *si la celda
contiene algo entrecomillado o algo que empiece por un pronombre y un verbo conjugado,
reescríbela.*

---

## Veredicto

**PASA CON CAMBIOS.** Tal como está **no se puede publicar**, pero lo que falta son siete
reescrituras de una línea; ninguna sección hay que rehacerla.

Unidades de pantalla en inglés auditadas, sin contar exponentes: **108**.
Fallan **7** (6,5 %), repartidas en **5 líneas** —dos líneas llevan dos fallas cada una—.
Otras **34** están a un pronombre de fallar.

| | |
|---|---|
| Unidades auditadas | 108 |
| **Frases decibles (FALLA)** | **7, en 5 líneas** |
| Reparto por rol | **ROLE A: 3 · ROLE B: 4** |
| A un pronombre (RIESGO) | 34 |
| Pantallas limpias enteras | la carta (7 unidades), `Both screens` (5), **`Facts` de los dos roles** (20) |

**Dónde se concentran: en la prosa que explica, no en los datos.** Las 7 caen en cuatro
secciones, y las cuatro son secciones de prosa. Las tablas de datos duros —20 unidades entre los
dos roles— están limpias, y la carta también.

**La sección peor es `Only you know`, con 4 de las 7.** Es el peor sitio posible en este escenario
concreto: el desenlace del 8 es *sin acuerdo*, de modo que lo único que se mide es si cada una
sacó lo que la otra tenía escondido. Con estas cuatro líneas la asimetría no se negocia, se lee.
Y una de ellas —el rebote del cobro del 5— es el único secreto de la ficha cuyo *momento* de
soltarlo está explícitamente en manos del jugador («You choose when to say it») y sobre el que se
apoya la pregunta 3 del debrief en español.

---

## Dónde se concentran

| sección | unidades | FALLA | riesgo | estado |
|---|---|---|---|---|
| **`Only you know`** (5 + 5) | 10 | **4** | 4 | **la peor**: 2 de A y 2 de B |
| **`You can't`** (3 + 3) | 6 | **1** | 4 | la de B es la definición de su propia restricción |
| **Vocabulario `what it is`** (10 + 10) | 20 | **1** | 3 | la única falla del vocabulario, y es de B |
| **`If you walk away with nothing`** (1 + 1) | 2 | **1** | 1 | 1 de 2 unidades: la peor densidad del archivo |
| **`Facts`** (10 + 10) | 20 | 0 | 1 | **limpia en los dos roles** |
| **Vocabulario `here`** (10 + 10) | 20 | 0 | 7 | **limpia**, y es la columna que el §11 marca como la más calcable |
| **La carta** (7) | 7 | 0 | 3 | **limpia**: las 4 filas, en nota |
| `You want` (1 + 5) | 6 | 0 | 2 | |
| Nota de registro + `Your screen only` (2 + 2) | 4 | 0 | 4 | todo meta |
| `Your toolkit` (1 + 1) | 2 | 0 | 2 | |
| `You did it if` (1 + 1) | 2 | 0 | 2 | meta |
| `Not about money` + `You can, but you don't have to` (A) | 2 | 0 | 1 | |
| `Where you are` (1 + 1) | 2 | 0 | 0 | **limpia** |
| `Both screens — how it ends` (5) | 5 | 0 | 0 | **limpia** |
| **total** | **108** | **7** | **34** | |

Tres lecturas de la tabla:

- **La disciplina de notas llegó a las tablas y se quedó.** `Facts` (20 unidades), la carta (7) y
  el vocabulario `here` (20) suman 47 unidades sin una sola frase decible. Que la columna `here`
  esté limpia es el mejor dato del archivo, porque el propio §11 avisa de que es «la más calcable
  de la ficha entera» y de que en un escenario llegó a entregar el dato oculto ya convertido en
  frase.
- **Se ensucia donde la ficha explica *por qué* importa un dato.** `Only you know` no es una lista
  de datos: es una lista de datos con su motivo pegado detrás, y el motivo se cuenta conjugando.
  De ahí salen 4 de las 7.
- **El suelo de riesgo (34) es estructural, no un defecto.** La ficha le habla al jugador de *tú*,
  así que casi cada instrucción es una oración en segunda persona a la que solo le falta girar un
  pronombre para volverse jugada. Ese giro es el cortafuegos, y es lo único que sostiene unas 20
  de las 34. **Cuando el sujeto deja de ser `you` o `I`, el cortafuegos desaparece** — y ahí es
  donde están 5 de las 7 fallas.

---

## Las 7, una por una

### ROLE A — Tatiana (3)

**1 · línea 46 · `Only you know`, viñeta 1 · FALLA — BLOQUEANTE**

> `- **Card: expires August 31.** New one: 8 business days, to an address you won't be at. **September 5 charge: bounces, whatever you do.** If you say it early, it sounds like a plan to stop paying. You choose when to say it.`

Dos frases decibles en la misma viñeta, en negrita las dos.

`Card expires August 31.` — presente simple, tercera persona, sujeto sin pronombre que girar,
cierto, y es la razón entera de que el cobro no vaya a poder pasar. Los dos puntos no se oyen.

`September 5 charge bounces, whatever you do.` — aquí el `you` **no** salva nada: apunta a
Milena, que es exactamente a quien se lo diría. Sale de la boca entera y el turno avanza.

Es el dato oculto número 1 y la ficha le pide al jugador que mida cuándo lo suelta. Escrito así,
no hay nada que medir: se lee. Y la pregunta 3 del debrief en español (línea 215) está construida
encima de la suposición de que callárselo cuesta algo.

**La corrección ya está escrita dieciséis líneas más abajo, en su propia tabla de datos** (línea
62): `| Your card | expiry: **August 31** · … |`. Sustantivo, no verbo. Y el participio, en la
carta (línea 194): `The charge on the 5th, bounced`.

**Nota** (mismo número de palabras, cero verbos conjugados):

> `- **Card: expiry August 31.** New one: 8 business days, to an address you won't be at. **September 5 charge: bounced, no matter what.** If you say it early, it sounds like a plan to stop paying. You choose when to say it.`

**2 · línea 52 · `If you walk away with nothing` · FALLA**

> `**If you walk away with nothing** · Thursday: your last day here. You fly, and the plan is still running. No counter here for you after Thursday.`

`The plan is still running.` es cláusula autónoma, presente continuo, tercera persona, cierta, y
es **su queja entera dicha en cinco palabras** —el título del rol es literalmente *«You're
leaving, and the plan is still running»*—. La primera mitad (`You fly`) la salva el pronombre,
que dicho a Milena apunta a Milena. La segunda no tiene pronombre que la salve.

**Nota** (−1 palabra):

> `**If you walk away with nothing** · Thursday: your last day here. August 30: your flight, and the plan still open. No counter here for you after Thursday.`

*(`still open` en vez de `still running` de paso: `to run a plan` no está en el vocabulario de
ninguna de las dos fichas y `open` sí es transparente. Si se prefiere conservar `running`, la
forma en nota es `the plan still running`, sin `is`.)*

**3 · línea 46 · segunda falla de la misma viñeta**

Contada arriba, dentro del hallazgo 1. Se anota aparte en la cuenta porque son **dos enunciados
independientes**, y arreglar uno no arregla el otro: `expires` pide sustantivo y `bounces` pide
participio.

### ROLE B — Milena (4)

**4 · línea 122 · `You can't`, restricción 3 · FALLA — BLOQUEANTE**

> `3. Ask her destination, her purpose, or her plan B. Allowed: **when she comes back**. **The form takes a reason, not a destination.**`

`The form takes a reason, not a destination.` — presente simple, sujeto abstracto, ocho palabras,
negrita y punto final. **Apunta a la persona correcta porque no apunta a ninguna**: es una regla,
y una regla se dice igual leída que pensada.

Y es justamente **la jugada**: la restricción 3 existe para que Milena tenga que explicarle a
Tatiana, con sus palabras, por qué le pide el motivo y no el destino. Aquí la explicación viene
impresa y lista.

**Nota** (−1 palabra, misma información):

> `3. Ask her destination, her purpose, or her plan B. Allowed: **when she comes back**. **The form: a reason, not a destination.**`

**5 y 6 · línea 125 · `Only you know`, viñeta 1 · FALLA ×2**

> `- **The case, opened today: the date, fixed.** Édison's answer, later, on the case date. No number: she misses the cut-off, the plan renews, **92,000 more** *(ninety-two thousand)*. It's all you have today.`

La primera mitad de la viñeta es impecable —dos absolutos, cero verbos conjugados— y sirve de
modelo. Lo que falla es lo que viene detrás, y son dos cosas distintas:

`the plan renews` — cláusula autónoma en la que el ojo se para. El `she` de delante sí apunta mal
(a la interlocutora), pero `the plan` no apunta a nadie y no hay nada que girar. Dicha a Tatiana,
transmite entera la consecuencia y el turno avanza.

`It's all you have today.` — y esta es la peor del archivo, porque **el `you` gira y las dos
lecturas son ciertas y jugables**: el caso es todo lo que Milena puede dar hoy *y* todo lo que
Tatiana se lleva hoy. Una cadena que dice dos cosas según quién la lea y funciona en las dos no
tiene cortafuegos ninguno. Además, la lectura girada es **el cierre del no**, que es precisamente
la línea que a Milena más le cuesta producir.

**Nota** (misma información, cero verbos):

> `- **The case, opened today: the date, fixed.** Édison's answer, later, on the case date. No number: no case before the cut-off · one more month, **92,000 more** *(ninety-two thousand)*. Nothing else today.`

*(La forma nominal `no case before the cut-off` esquiva de paso la objeción de nivel a los
absolutos encadenados: no es `cut-off missed, plan renewed` ni es cláusula finita.)*

**7 · línea 156 · vocabulario, columna `what it is` · FALLA**

> `| retention / to authorize | the people who talk to members who want to leave · to say yes officially, and only some people in a company can | Édison's, second floor — not yours |`

`and only some people in a company can` — cláusula finita con elipsis verbal. Puesta después de
una pregunta de Tatiana del tipo *«can you do it?»*, se dice tal cual, es cierta y cierra el
turno. Es la más leve de las siete y la única discutible, pero rompe una racha que hasta aquí
era el mejor dato del set: **la columna `what it is` venía limpia en cinco fichas seguidas.**

Viene de haber quitado una pasiva (`can be done`), que había que quitar. La salida no era
conjugar en activa: era nominalizar.

**Nota**:

> `| retention / to authorize | the people who talk to members who want to leave · to say yes officially — a power only a few people in a company have | Édison's, second floor — not yours |`

---

## Los riesgos que más caros salen

No fallan la prueba literal, pero son los que se convierten en falla al primer retoque de
cualquier otro informe. Van con su nota por si se toca la línea.

| línea | tal como está | por qué se sostiene | nota |
|---|---|---|---|
| 85 · `Your toolkit` A | `**6**, your destination stays yours` | solo el posesivo: dicha a Milena habla del destino de Milena | `**6**, your destination: yours` |
| 116 · `You want` B 3 | `**the complaint comes to you**` | solo el `you`: dicha a Tatiana, apunta a Tatiana | `the complaint: yours` |
| 131 · `If you walk away…` B | `the next complaint has your name` | ídem | `the next complaint: with your name on it` |
| 143 · `Facts` B | `keeps **today's date**` | verbo sin sujeto: no es enunciado completo | `date kept: today's` |
| 189 · la carta | `he finally answers the one you sent at the start` | el `you` gira; `he finally answers` casi se sostiene solo | `his answer to the one you sent at the start` |
| 40 · `You can't` A 2 | `You work 7:00–6:00.` | el `you`, dicho a Milena, es falso | `Your hours: 7:00–6:00` |
| 47 · `Only you know` A 2 | `The 3-month minimum: in writing, and you signed it.` | el `you`, dicho a Milena, es falso | `…: in writing, with your signature` |

---

## Lo que aguantó, y por qué importa dejarlo escrito

- **`Facts`, los dos roles: 20 unidades, 0 fallas.** Veinte filas de contrato, fechas, plazos y
  precios sin un solo verbo conjugado. Es la prueba de que en este escenario —que es un
  calendario disfrazado de mostrador— **se puede dar toda la información dura sin escribir una
  frase**.
- **Vocabulario `here`, los dos roles: 20 unidades, 0 fallas.** La columna que el §11 señala como
  la más peligrosa está limpia en las dos fichas. Todas las celdas son sintagmas nominales o
  relativas libres (`what Wilmer never gave you`, `the one you can't say yes to`), nunca ejemplos
  entrecomillados.
- **La carta: 7 unidades, 0 fallas.** Sus cuatro filas son notas (`not authorized · not one`,
  `collections on the 12th · the system, on its own`). En la ronda 1 era la segunda peor pantalla.
- **`Both screens — how it ends`: 5 unidades, 0 fallas.** El cierre común habla en tercera persona
  y con los nombres propios (*Tatiana signs*, *Milena says*), que es lo que lo hace inservible
  como frase y perfecto como instrucción.

---

## La causa, en una línea

**Cinco de las siete tienen un sujeto que no es `you` ni `I`** —`the card`, `the charge`, `the
plan` (×2), `the form`—, y una sexta (`It's all you have today`) tiene un `you` que funciona en
los dos sentidos. El pronombre es el único cortafuegos automático que tiene este formato: mientras
el sujeto sea el jugador o el otro, la frase se rompe sola al decirla. **En cuanto el sujeto es
una cosa —una tarjeta, un cobro, un plan, un formulario— no hay nada que se rompa, y lo que se
escribió es una regla del oficio dicha en voz alta.**

Y el escenario 8 es, de los ocho, el que más habla de cosas: el trámite entero de Milena son
sujetos abstractos, y el problema de Tatiana es un calendario.

**Regla para el redactor, corta:** *si el sujeto de la línea no es `you` ni `I`, el verbo sobra.*
La salida no es la voz pasiva (prohibida) ni la cláusula finita en activa: es el sustantivo
(`expires` → `expiry`), el participio (`bounces` → `bounced`) o los dos puntos **con un
sustantivo detrás**, nunca con un verbo.

---

## Reconciliación con la ronda 2

La ronda 2 auditó este mismo texto y llegó a **6** fallas; esta pasada llega a **7**. Las dos
listas coinciden en todo salvo en un juicio de banda, y no hay ningún hallazgo nuevo en ninguna de
las dos direcciones:

| falla | ronda 2 | esta pasada |
|---|---|---|
| 46 · `Card expires August 31` | FALLA | FALLA |
| 46 · `September 5 charge bounces, whatever you do` | FALLA | FALLA |
| 52 · `The plan is still running` | FALLA | FALLA |
| 122 · `The form takes a reason, not a destination` | FALLA | FALLA |
| 125 · `It's all you have today` | FALLA | FALLA |
| 125 · `the plan renews` | **riesgo** (por consistencia con la ronda 1) | **FALLA** |
| 156 · `only some people in a company can` | FALLA | FALLA |

**La discrepancia es `the plan renews`,** y merece decidirse de una vez porque es exactamente el
caso que define la regla: sujeto abstracto, verbo finito, ninguna palabra que girar. La ronda 1 lo
dejó en riesgo argumentando que en habla natural pediría `will renew`. Es cierto que lo pediría, y
también es cierto que un A2 lo dice en presente y el turno avanza igual. **Se cuenta como falla
aquí**, y la nota propuesta la elimina de todas formas, así que la decisión no cambia el arreglo:
cambia solo la cifra.

Cuenta de riesgos: **34** en esta pasada, 38 en la ronda 2, con la misma definición. La diferencia
está en dónde se traza la banda entre *riesgo* y *limpia* en las líneas meta (las cabeceras de
registro, `You did it if`), no en hallazgos.

**Conclusión operativa: la lista de arreglos es la misma en las dos rondas.** Cinco líneas —46,
52, 122, 125 y 156—, siete reescrituras, todas de una línea, y en dos casos la forma correcta ya
está escrita en otro sitio del propio archivo (la fila 62 de `Facts` y la fila de la carta de la
línea 194).
