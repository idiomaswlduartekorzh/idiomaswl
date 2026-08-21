# Escenario 6 · `the-cousin-on-the-sofa` — ¿se puede leer en voz alta?

**Ronda 3 · 21 ago 2026.** Tercera pasada de calcabilidad, sobre la ficha **ya corregida con la
ronda 2** (versión del árbol de trabajo, 20 ago 2026). Las rondas 2 y 1 están conservadas íntegras
al final del archivo: la ficha las cita como fuente y sus números de línea son los de versiones
anteriores.

Auditado: `artifacts/habla-a2/fase7-fichas-6-the-cousin-on-the-sofa.md`.

Regla de §11 del blueprint (`docs/habla-acompanado-blueprint.md`, líneas 242-258):

> La ficha se escribe **en notas, no en frases**. `Exam: Saturday 12, 8:00 a.m.` sí.
> `I'm taking the exam on Saturday at eight.` no, jamás, ni en los datos ni en la situación ni
> en los objetivos. Las frases decibles viven **solo** en la tabla de exponentes.
>
> Prueba: si una línea se puede decir tal cual en la conversación y el turno avanza, está mal
> escrita.

Fuera de alcance por diseño: las dos tablas *Say it here* (86-96 y 163-173), que son exponentes y
ahí las frases van a propósito; la cabecera del set (1-28), el bloque *After* (213-221), la cuenta
de prosa (253-274), *Lo que no se aplicó* (278-346) y *Pendiente* (350-399), que están en español;
y `grammarReferences` (223-249), que es metadato de código.

## Cómo se marcó cada línea

El mismo criterio de las tres rondas y de los otros siete escenarios, para que las cifras se
comparen:

- **FALLA** — la línea, o una cláusula autónoma donde el ojo puede parar, es un enunciado inglés
  bien formado que ese rol le puede decir al otro **sin cambiar nada**, y el turno avanza.
- **RIESGO** — es oración, pero dicha *tal cual* apunta mal: hace falta un cambio (un pronombre,
  un posesivo, un artículo) para que funcione en la boca. O es oración pero es meta —habla del
  ejercicio, no de la ficción— y dicha en voz alta no hace avanzar nada.
- **ENTREGA** — no se dice tal cual, pero pone la frase hecha en la mano fuera de la tabla de
  exponentes. Va contada dentro de FALLA. **Esta ronda: cero.**

Las filas de tabla se leen de corrido, etiqueta incluida. Y §11 da una prueba escrita que se
aplica tal cual: *si la celda contiene algo entrecomillado o algo que empiece por un pronombre y
un verbo conjugado, reescríbela*.

Unidad = una línea de pantalla. En las tablas de vocabulario, cada fila son **dos** unidades
(`what it is` y `here`), porque cada columna falla por su cuenta.

---

## Veredicto

**PASA CON CAMBIOS**, y es el mejor número de los ocho escenarios con diferencia: **1 falla sobre
98 unidades, 1,0 %**. Venía de 10 sobre 99 (10,1 %) en la ronda 2 y de 16 sobre 95 (16,8 %) en la
ronda 1.

**Las diez fallas de la ronda 2 se aplicaron las diez, palabra por palabra.** Y —lo que importa
más— **esta ronda no encontró ni una falla nueva**. La regla de proceso que salió de la ronda 2
(hallazgo 27: la calcabilidad se aplica la última y se relee después de tocar la ficha) es lo
único que cambió en el método, y se nota justo donde tenía que notarse: en la ronda 2, siete de
diez fallas las había escrito la propia ronda de correcciones; en esta, ninguna.

La única frase decible que queda **no es nueva**: es la mitad que sobró de un riesgo de la ronda 2
que se aplicó a medias. `Sounds like an excuse.` sigue en la restricción 1 de Cris.

Unidades de pantalla en inglés auditadas, sin contar exponentes: **98**.
Falla **1** (1,0 %). Otras **21** están a un cambio de fallar.

| escenario | unidades | FALLA | % | sección peor |
|---|---|---|---|---|
| **6 · `the-cousin-on-the-sofa` (ronda 3)** | **98** | **1** | **1,0 %** | **`You can't` de Cris (1 de 6)** |
| 5 · `late-again-on-monday` | 111 | 5 | 4,5 % | `Only you know` |
| 1 · `the-bike-in-the-parking-lot` | 73 | 7 | 9,6 % | vocabulario `here` |
| 4 · `a-charge-i-did-not-make` | 89 | 9 | 10,1 % | Facts, ROLE B |
| 6 · `the-cousin-on-the-sofa` (ronda 2) | 99 | 10 | 10,1 % | `You can't` |
| 7 · `two-more-people-for-the-trip` | 101 | 16 | 15,8 % | vocabulario `here` |
| 8 · `cancel-the-gym-i-am-leaving` | 108 | 18 | 16,7 % | `Only you know` |
| 6 · `the-cousin-on-the-sofa` (ronda 1) | 95 | 16 | 16,8 % | la carta |
| 2 · `no-appointment-until-thursday` | 94 | 18 | 19,1 % | vocabulario `here` |

(Las unidades bajan de 99 a 98 porque la ficha de Dani perdió una fila de vocabulario a propósito
—de 10 a 9, hallazgo 33— y eso son dos unidades menos, mientras que las secciones de dato oculto
ganaron una. Se comparan porcentajes, no totales.)

**Nada de lo que queda es bloqueante para el motor.** La falla es una elipsis de tres palabras, no
un secreto ni una retractación ni una cesión. Se arregla cambiando una frase.

---

## Qué pasó con las 10 fallas de la ronda 2

| # ronda 2 | qué era | estado hoy |
|---|---|---|
| 1 · el motivo oculto de Cris | `the wifi drops by the window · … men unload boxes there` | **aplicada** — hoy `weak wifi by the window · your window: over a street full of bars · nine in the morning, boxes off a truck under it` (123) |
| 2 · la carta, la retractación | `He leaves before the 29th. That plan is dead now.` | **aplicada** — hoy `Your plan, now dead: nights cut, out before the 29th.` (195) |
| 3 · lo que Cris pierde | `the living room is taken and the video call is gone. Nobody signs…` | **aplicada** — hoy `living room taken, video call gone. No signatures before September 1` (125) |
| 4 · la concesión de Dani | `after the 26th, Iván does not need a bed.` | **aplicada, y mejorada** — hoy `after the 26th, no bed needed. The nights to let go: the last ones, never the first.` (46). Se fue además el imperativo `Give away the last nights` |
| 5 · la tapadera | `Outside the family, it's ten days of vacation.` | **aplicada** — hoy `the version is: ten days of vacation` (40) |
| 6 · la tía de Floridablanca | `her house is under construction. You already asked her, and she said no.` | **aplicada** — hoy `house under construction · asked already, and a no` (42) |
| 7 · la acusación de Cris | `If you say it early, it sounds like you're selling the visit.` | **aplicada** — hoy `Early, it reads as payment for the visit.` (115) |
| 8 · el exponente suelto del toolkit | `Yeah? What's up?` en la línea de bloques | **aplicada** — hoy la línea remite (`your form for that is the first row of your table`, 158) y la frase vive como fila de exponentes (164) |
| 9 · `a cousin`, columna `here` | `that's why the hostel is an insult` | **aplicada** — hoy `the reason the hostel is an insult` (71) |
| 10 · la pregunta del cierre | `is this what we agreed?` | **aplicada** — hoy `Then Cris confirms it, or corrects it.` (208) |

**Diez de diez, cero ignoradas, cero reaparecidas con otras palabras.** Es la primera vez en las
tres rondas que la carta y el dato oculto pasan limpios los dos a la vez.

De los **20 riesgos** de la ronda 2 se aplicaron **8 enteros y 2 a medias**; **8 siguen palabra
por palabra** y 2 estaban marcados «se deja». Ahí está lo único que hay que arreglar hoy: la falla
de esta ronda es la mitad no aplicada de uno de esos dos riesgos a medias.

---

## La única que falla

**1 · MEDIO — `Sounds like an excuse.`, en la restricción 1 de Cris**
**Línea 113**, `You can't`:

> `1. Do the interview in your room. Don't explain why — only if they ask. Sounds like an excuse. The living room, and nothing else.`

`Sounds like an excuse.` es una elipsis de sujeto que en inglés hablado es un enunciado completo y
corriente. Cris se la puede decir a Dani **sin cambiar nada**: Dani propone que Iván duerma en el
sofá y que ya se verá, o suelta `He's out all day — he has no plans.`, y Cris lee su ficha en voz
alta. Suena natural, encaja, y el turno avanza. Encima es una acusación, que es exactamente lo que
el criterio de éxito de Cris (176) penaliza —*«you never said the problem is them»*—: la ficha le
pone en la mano la frase por la que después le baja la nota.

En la ronda 2 esta línea se marcó **riesgo**, con el argumento de que «apunta a sí misma»: en la
ficha describe cómo se ve *el motivo de Cris* si lo explica. **Se reclasifica a falla**, y el
motivo es la prueba de §11, no la intención: la prueba pregunta si se puede decir tal cual y el
turno avanza, no si el sentido que tiene en la ficha es el mismo que tendrá en la boca. Aquí se
puede, y avanza. Es también la mitad que quedó del riesgo 12 de la ronda 2, que se aplicó a
medias: se cayó `You need the living room.`, se quedó esta.

**Reescritura:** `1. Do the interview in your room. Don't explain why — only if they ask. From outside, only an excuse. The living room, and nothing else.`

`From outside, only an excuse.` no tiene verbo conjugado, dice lo mismo, es A2 leído y no se puede
decir en la conversación sin montar la oración entera.

---

## Las 21 que están a un cambio de fallar

Ninguna se cuenta como fallo: dichas *tal cual*, o el enunciado sale falso o ajeno, o es meta
—habla del ejercicio— y no hace avanzar nada. Marcadas **[r2]** las que ya venían señaladas en la
ronda 2 y **no** se aplicaron, y **[r1·r2]** las que llevan **tres rondas** señaladas sin aplicar.

### Ficha de Dani — 8

| línea | sección | lo que hay | qué le falta para fallar | reescritura |
|---|---|---|---|---|
| 40 | `You can't` 1 | `Outside the family, the version is: ten days of vacation.` | solo los dos puntos la sostienen como nota; sin ellos es oración entera | `Outside the family, the version: ten days of vacation.` |
| 41 | `You can't` 2 **[r1·r2]** | `and tonight your aunt is going to know` | `your`→`my` | `In your family: an insult — and news for your aunt tonight.` |
| 47 | `Only you know`, Nelson | `one favor, and he owes it to you` | `you`→`me` | `one favor owed, one use only` (igual que la fila 63 de Facts) |
| 58 | Facts, viernes **[r1·r2]** | `something important — and you can't say what it is` | `you`→`I` | `something important · the what stays closed` |
| 75 | vocab `what it is`, `to owe someone a favor` **[r1·r2]** | `you have to do something for them later` | abre con pronombre + verbo conjugado, que es el disparo escrito de §11 | `something you must do for them later` |
| 76 | vocab `here`, `the lease` | `their word — you'll hear it, and then the subject changed` | es meta; celda nueva de esta ronda | `their word, not yours — and the cue to change the subject` |
| 81 | `Your toolkit` **[r1·r2]** | `(it matters and you can't say why)` · `*unload* is their word, not yours` | `you`→`I`; la segunda es meta | `(matters · reason locked)` · `*unload* — their word: ask for it` |
| 99 | `You did it if` | `you said it matters, you didn't say why` · `you never said the problem is them` | es evaluación en pasado | se deja |

### Ficha de Cris — 8

| línea | sección | lo que hay | qué le falta para fallar | reescritura |
|---|---|---|---|---|
| 115 | `You can't` 3 | `Early, it reads as payment for the visit.` | pronombre + verbo conjugado, pero dicho tal cual es meta y además no es A2 hablado | `Early: payment for the visit.` |
| 136 | Facts, `Iván` **[r2]** | `you don't know him` | `you`→`I` | `never met` |
| 147 | vocab `here`, `the couch` **[r1·r2]** | `one object, and three people want it` | dicho tal cual sale falso (dos personas necesitan el sofá, no tres) | `one object, three claims on it` |
| 150 | vocab `here`, `to be out all day` | `you'll hear it, and you have to catch it` | es meta; celda nueva de esta ronda | `their words, not yours — reception, and the cue you have to catch` |
| 151 | vocab `what it is`, `to owe someone a favor` **[r1·r2]** | `you have to do something for them later` | igual que la 75, la misma celda en las dos fichas | `something you must do for them later` |
| 154 | vocab `here`, `to drop` **[r2]** | `your reason, and you don't give it first` | es instrucción | `your reason — not the first thing you give` |
| 158 | `Your toolkit` **[r1·r2]** | `they stop you in your own kitchen` · `*lease*, *drop*, *unload* are your words, not theirs` | cambio de sujeto; la segunda es meta | `stopped in your own kitchen — your form: the first row of your table` |
| 176 | `You did it if` **[r2]** | `Monday the 24th, 8:00 to 11:00, is yours` | `yours`→`mine` | `Monday the 24th, 8:00 to 11:00, yours` |

### La carta y el cierre común — 5

| línea | sección | lo que hay | qué le falta para fallar | reescritura |
|---|---|---|---|---|
| 183 | carta, nota de diseño | `Role A never sees this screen and only finds out what you tell them.` | es meta, y nombra el rol | `Role A: never this screen — only what you tell them.` |
| 191 | carta, `Why she moved it` **[r1·r2]** | `to be with you on Monday` | `you`→`me` | `\| Why she moved it \| Monday \|` |
| 193 | carta, párrafo | `This changes one line in your Facts.` | es meta | `One line of your Facts, changed.` |
| 201 | cierre, marco | `do the two of you say the same thing?` | es meta | `same thing, in both mouths?` |
| 210 | cierre, `Point 3` | `Without it, the conversation only stops. With it, you have half an agreement.` | es meta | `Without it: a conversation that stops. With it: half an agreement.` |

**Ocho de los 21 llevan tres rondas señaladas y tres versiones de la ficha sin aplicarse** (41, 58,
75, 81, 147, 151, 158, 191). Ninguno ha subido a falla todavía, pero dos de las diez fallas de la
ronda 2 nacieron así: de un riesgo que se dejó estar y que la siguiente corrección de nivel o de
naturalidad terminó de convertir en oración. Son los que hay que aplicar cuando se toque la ficha
por cualquier otro motivo, aunque hoy no cuesten nada.

---

## Dónde se concentran

| sección | unidades | FALLA | riesgo | estado |
|---|---|---|---|---|
| **`You can't` (restricciones)** | 6 | **1** | 3 | **la peor otra vez, pero de 3 fallas a 1** |
| Tabla de vocabulario, columna `here` | 19 | 0 | 4 | de 1 falla a 0 · los riesgos son metalengua de recepción, nueva de esta ronda |
| **La carta** | 8 | **0** | 3 | **limpia por primera vez en tres rondas** |
| `Both screens — how it ends` | 6 | 0 | 2 | recupera la limpieza que había perdido |
| Tabla de vocabulario, `what it is` | 19 | 0 | 2 | la misma definición, la misma celda, las dos fichas |
| `Your toolkit` | 2 | 0 | 2 | el exponente entrecomillado se fue; queda la metalengua |
| Facts (10 + 10 filas) | 20 | 0 | 2 | **cero fallas por segunda ronda seguida** |
| `You did it if` (criterios) | 2 | 0 | 2 | evaluación en pasado, las dos |
| `Only you know` (dato oculto) | 6 | **0** | 1 | **de 2 fallas a 0 — el secreto de Cris y la cesión de Dani, los dos limpios** |
| `If you walk away with nothing` | 2 | **0** | 0 | de 1 falla a 0 |
| `Where you are` (situación) | 2 | 0 | 0 | las dos vuelven a nota con dos puntos |
| `You want` (objetivo) | 2 | 0 | 0 | limpia las tres rondas |
| Nota de registro + `Your screen only` | 4 | 0 | 0 | `Nobody's the boss, nobody can leave.` → `No boss here, no door out.` |

**Reparto por rol: la falla es de Cris.** De los 21 riesgos, 8 están en la pantalla de Dani, 8 en
la de Cris, 3 en la carta (que es pantalla de Cris) y 2 en el cierre común. Quien más podría leer
sigue siendo Cris: **1 falla + 11 riesgos contra 0 + 8.**

### Lo que cambió el método

No hay que buscar mucho para saber por qué esta ronda es distinta. En la ronda 2, **siete de las
diez fallas las escribió la propia ronda de correcciones**: notas telegráficas convertidas en
oraciones al aplicar nivel, naturalidad y simulación, que empujan justo al revés que §11. De ahí
salió el hallazgo 27, que la ficha declara en su cabecera:

> la auditoría de **calcabilidad se aplica la última**, y hay que releerla después de tocar la
> ficha por cualquier otro motivo.

Se aplicó, y el resultado se mide: **cero fallas nuevas**. Las secciones que la ronda 2 vio
convertirse en oraciones —las dos situaciones, los dos `Only you know`, lo que pierde cada uno—
volvieron a nota con dos puntos y ninguna se rompió otra vez al corregir lo demás. La regla
funciona y hay que escribirla en el blueprint, porque hoy vive solo en la cabecera de esta ficha.

---

## Lo que está bien y hay que dejar como está

- **La carta entera** (182-195), por primera vez sin una sola frase decible. `Your plan, now dead:
  nights cut, out before the 29th.` es el modelo de cómo se escribe una retractación sin
  escribirla: el plan muerto va en aposición, sin verbo, y la frase que hay que retirar en voz
  alta —`My mom is arriving on…`— vive donde tiene que vivir, en la tabla de exponentes de Cris.
- **`Only you know` de Cris** (123). Era la falla grave de la ronda 2 y hoy es el mejor ejemplo del
  archivo: `weak wifi by the window · your window: over a street full of bars · nine in the
  morning, boxes off a truck under it`. Tres razones, cero verbos conjugados, y ninguna calca el
  exponente que existe para decirlas (`The wifi drops next to the window.`). El descalce es
  deliberado y está documentado; hay que mantenerlo.
- **`Only you know` de Dani** (46). `after the 26th, no bed needed. The nights to let go: the last
  ones, never the first.` Se fue la oración y también el imperativo que la ronda 2 había dejado
  pasar.
- **La tabla `Facts`**, 20 filas, **0 fallas por segunda ronda**. El patrón está fijado: etiqueta,
  dos puntos, dato. `one single mattress at home · place for it: a bedroom floor`, idéntico en las
  dos pantallas.
- **La línea de toolkit de Cris** (158), que ahora **remite** a la tabla de exponentes en vez de
  copiar la frase: `your form for that is the first row of your table`. Es la solución buena para
  cualquier muleta que espere a que la caja de herramientas la tenga.
- **Los dos `You want`** (37 y 110) y **los dos `Where you are`** (35 y 108): sintagmas nominales y
  notas con dos puntos, cero verbos finitos.
- **El cierre** (201-211): las tres preguntas incrustadas obligan a producir la respuesta, y la
  comprobación final ya no viene escrita.

---

## Coste del arreglo

**Una reescritura de tres palabras.** `Sounds like an excuse.` → `From outside, only an excuse.`
Nada más es obligatorio: no toca el motor, ni el conflicto, ni la asimetría, ni la carta, ni el
cierre, ni el reparto de turnos, ni la cuenta de prosa (la sustituta tiene una palabra más y la
línea 113 no está en el tope crítico).

Y ocho reescrituras opcionales, todas de una línea, todas iguales o más cortas: los ocho riesgos
que llevan tres rondas señalados (41, 58, 75, 81, 147, 151, 158, 191). No urgen. Pero la
experiencia de la ronda 2 dice qué pasa si se dejan otra vez: la próxima corrección de nivel o de
naturalidad los termina de montar y vuelven convertidos en fallas.

Orden por lo que cuesta dejarlas:

1. **`Sounds like an excuse.`** (113) — la única decible, y encima es la acusación que el propio
   criterio de Cris penaliza.
2. **Las dos celdas `you have to do something for them later`** (75 y 151) — es el único sitio de
   la ficha donde se incumple la prueba escrita de §11 tal como está redactada, y son dos.
3. **Los seis riesgos restantes de tres rondas** (41, 58, 81, 147, 158, 191).
4. **La metalengua nueva de recepción** (76, 150) — nació esta ronda al marcar las palabras que
   cada rol solo recibe. La idea es correcta; la forma, `you'll hear it`, es oración.

Y la recomendación de proceso, que ya no es una hipótesis sino una medida: **el orden funciona.**
Con la calcabilidad aplicada la última, este escenario pasó de 16 fallas a 10 y de 10 a 1.
Escríbase en §11, porque hoy solo está en la cabecera de esta ficha.

---
---

# Apéndice — rondas 2 y 1

*Se conservan íntegras porque la ficha las cita como fuente de sus hallazgos. Sus números y sus
líneas se refieren a versiones anteriores del archivo y ya no coinciden con la actual.*

## Ronda 2 · 20 ago 2026 — informe original

**Ronda 2 · 20 ago 2026.** Reauditoría de calcabilidad sobre la ficha **ya corregida** con los 64
hallazgos de fase 7. La ronda 1 de esta misma auditoría está conservada íntegra al final del
archivo, porque la ficha la cita como fuente y no se puede borrar.

Regla de §11 del blueprint (`docs/habla-acompanado-blueprint.md`, líneas 242-258):

> La ficha se escribe **en notas, no en frases**. `Exam: Saturday 12, 8:00 a.m.` sí.
> `I'm taking the exam on Saturday at eight.` no, jamás, ni en los datos ni en la situación ni
> en los objetivos. Las frases decibles viven **solo** en la tabla de exponentes.
>
> Prueba: si una línea se puede decir tal cual en la conversación y el turno avanza, está mal
> escrita.

Auditado: `artifacts/habla-a2/fase7-fichas-6-the-cousin-on-the-sofa.md`, versión del 20 ago 2026
(la del árbol de trabajo, no la del último commit).

Fuera de alcance por diseño: las dos tablas *Say it here* (82-92 y 154-165), que son exponentes y
ahí las frases van a propósito; la cabecera del set (1-23), el bloque *After* (209-216), la cuenta
de prosa (248-269), *Lo que no se aplicó* (273-324) y *Pendiente* (328-365), que están en español;
y `grammarReferences` (218-244), que es metadato de código.

## Cómo se marcó cada línea

Mismo criterio que en los escenarios 1, 2, 4, 5, 7 y 8, para que las ocho cifras se comparen:

- **FALLA** — la línea, o una cláusula autónoma donde el ojo puede parar, es un enunciado inglés
  bien formado que ese rol le puede decir al otro **sin cambiar nada**, y el turno avanza.
- **RIESGO** — es oración, pero dicha *tal cual* apunta mal: hace falta un cambio (un pronombre,
  un posesivo, un artículo) para que funcione en la boca. O es oración pero es meta —habla del
  ejercicio, no de la ficción— y dicha en voz alta no hace avanzar nada.
- **ENTREGA** — no se dice tal cual, pero pone la frase hecha en la mano fuera de la tabla de
  exponentes. Va contada dentro de FALLA.

Las filas de tabla se leen de corrido, etiqueta incluida. Y §11 da una prueba escrita que se
aplica tal cual: *si la celda contiene algo entrecomillado o algo que empiece por un pronombre y
un verbo conjugado, reescríbela*.

---

## Veredicto

**PASA CON CAMBIOS**, y el número global es el segundo mejor de los ocho escenarios: de **16
fallas a 10**, de 16,8 % a 10,1 %. Las correcciones de la ronda 1 se aplicaron casi enteras —**14
de 16, palabra por palabra**— y hay secciones que pasan de peor a impecable: la tabla *Facts*,
que fallaba 4, ahora falla 0; la columna `here` del vocabulario, que fallaba 3, ahora falla 1.

Pero hay que decir lo otro, porque es lo que importa: **de las 10 que quedan, 7 son nuevas**. No
sobrevivieron a la ronda 1: **las escribió la ronda de correcciones**. Seis secciones que estaban
limpias o en riesgo leve se convirtieron en oraciones al aplicar los hallazgos de las otras tres
auditorías —nivel, naturalidad, simulación—, que empujan justo al revés que §11.

Y el defecto que la ronda 1 marcó como bloqueante **volvió al mismo sitio con otras palabras**:
la carta. `She lands the same day as Iván…` desapareció; en su lugar está `He leaves before the
29th. That plan is dead now.` El turno más caro del set sigue escrito y sigue tres líneas por
encima de la nota que dice que es el mejor momento del juego.

Unidades de pantalla en inglés auditadas, sin contar exponentes: **99**.
Fallan **10** (10,1 %). Otras **20** están a un pronombre de fallar.

| escenario | unidades | FALLA | % | sección peor |
|---|---|---|---|---|
| 5 · `late-again-on-monday` | 111 | 5 | 4,5 % | `Only you know` |
| 1 · `the-bike-in-the-parking-lot` | 73 | 7 | 9,6 % | vocabulario `here` |
| 4 · `a-charge-i-did-not-make` | 89 | 9 | 10,1 % | Facts, ROLE B |
| **6 · `the-cousin-on-the-sofa` (ronda 2)** | **99** | **10** | **10,1 %** | **`You can't` (3 de 6)** |
| 7 · `two-more-people-for-the-trip` | 101 | 16 | 15,8 % | vocabulario `here` |
| 8 · `cancel-the-gym-i-am-leaving` | 108 | 18 | 16,7 % | `Only you know` |
| 6 · `the-cousin-on-the-sofa` (ronda 1) | 95 | 16 | 16,8 % | la carta |
| 2 · `no-appointment-until-thursday` | 94 | 18 | 19,1 % | vocabulario `here` |

(Las unidades suben de 95 a 99 porque la ficha ganó filas: `a cousin` y `to renew` en A, `a
hostel`, `to owe someone a favor`, `Iván` y `Sunday the 23rd` en B. Se comparan porcentajes, no
totales. Y el 5 aparece con 111/5, que es lo que dice su propio informe; las cifras 96/22 que
citan los otros archivos son de una versión anterior de ese fichero.)

**Cuatro son bloqueantes:** la carta (188), el motivo oculto de Cris (115), lo que Cris pierde
(117) y la concesión de Dani (41). Las cuatro entregan producción diana: la retractación, el
secreto, las consecuencias y la cesión.

---

## Qué pasó con las 16 de la ronda 1

Es la parte buena y conviene verla entera, porque dice que el circuito funciona.

| # ronda 1 | qué era | estado |
|---|---|---|
| 1 · carta, `The ticket` | `changed: she arrives Thursday the 20th…` | **aplicada** — hoy `changed · Thursday the 20th, afternoon` |
| 2 · carta, `How long` | `she stays until Tuesday the 25th` | **aplicada** — hoy `until Tuesday the 25th` |
| 3 · carta, párrafo | `She lands the same day as Iván…` + comillas | **a medias** — la frase se fue, pero la sustituta trae dos nuevas (ver falla 9) |
| 4 · A, `Only you know` | `This is news, not a request — and you know it.` | **aplicada** |
| 5 · A, Nelson | `He can say no.` | **aplicada** |
| 6 · A, lo que pierdes | `Iván lands Thursday anyway… and sleeps wherever` | **aplicada** — sección hoy limpia |
| 7 · A, Facts colchón | `it fits on a bedroom floor` | **aplicada** |
| 8 · A, Facts tía | `she calls tonight` | **aplicada** |
| 9 · A, vocab colchón | `it goes on a bedroom floor` | **aplicada** |
| 10 · A, criterios | `"it's important"` (comillas) | **aplicada** |
| 11 · B, `You can't` 1 | `It sounds like an excuse` | **a medias** — se quitó el pronombre y se añadió `You need the living room.` |
| 12 · B, `You can't` 2 | `Iván isn't the problem` | **aplicada** |
| 13 · B, Facts mamá | `the couch was her bed` | **aplicada** |
| 14 · B, Facts colchón | `it fits on a bedroom floor` | **aplicada** |
| 15 · B, vocab visita | `it's happening Thursday` | **aplicada** — la fila entera se sustituyó |
| 16 · B, vocab colchón | `it's already in the house` | **aplicada** |

**14 enteras, 2 a medias. Cero ignoradas.** El colchón, que él solo producía 4 de las 16 fallas,
está limpio en las cuatro pantallas.

De los **21 riesgos**, en cambio, **solo se aplicaron 7**. Siguen palabra por palabra, entre
otros: `Nobody's the boss, nobody can leave.` (27 · 101), `In your family that's an insult` (36),
`bus arrives Thursday the 20th` (51), `one object, and three people want it` (67 · 139), `you have
to do something for them later` (70 · 142), `Dani hangs up…` (104), `they stop you in your own
kitchen` (150), `to be with you on Monday` (183). Y dos empeoraron: `you can't say what` se hizo
más larga (`and you can't say what it is`, 53) y `wifi drops by the window` ganó el artículo que
le faltaba para ser oración (115), que es la subida de riesgo a falla más cara del archivo.

---

## Dónde se concentran

| sección | unidades | FALLA | riesgo | estado |
|---|---|---|---|---|
| **`You can't` (restricciones)** | 6 | **3** | 2 | **la peor, y nueva como peor: las tres son de esta ronda** |
| `Only you know` (dato oculto) | 5 | **2** | 1 | 1 de Dani, 1 de Cris — la de Cris es el motivo entero |
| `If you walk away with nothing` | 2 | **1** | 0 | la de Cris, que en la ronda 1 era el modelo a imitar |
| `Your toolkit` | 2 | **1** | 1 | un exponente entrecomillado dentro de la línea de bloques |
| **La carta** | 8 | **1** | 2 | de 3 fallas a 1 — pero la que queda es la misma de siempre |
| Tabla de vocabulario, columna `here` | 20 | **1** | 3 | de 3 a 1: la mejor corrección del archivo |
| `Both screens — how it ends` | 6 | **1** | 0 | pierde la limpieza que llevaba seis escenarios |
| **Facts** (10 + 10 filas) | 20 | **0** | 3 | **de 4 fallas a 0** |
| Tabla de vocabulario, `what it is` | 20 | 0 | 2 | la misma definición, ahora repetida en las dos fichas |
| `You did it if` (criterios) | 2 | 0 | 2 | las comillas se fueron |
| Nota de registro + `Your screen only` | 4 | 0 | 2 | intactas desde la ronda 1 |
| `Where you are` (situación) | 2 | 0 | 2 | **eran limpias; ahora las dos llevan verbo conjugado** |
| `You want` (objetivo) | 2 | **0** | 0 | **limpia en los dos roles, las dos rondas** |

**Reparto por rol: 4 de la ficha de Dani, 4 de la ficha de Cris, 1 de la carta y 1 del cierre
común.** Como la carta es pantalla de Cris, quien más puede leer sigue siendo Cris: **5 contra 4**.

### La causa: corregir para el nivel y para la naturalidad escribe oraciones

No hay misterio en de dónde salieron las 7 nuevas. Se ven en el diff, y todas tienen la misma
forma: **una nota con dos puntos se convirtió en una oración con sujeto y verbo.**

| sección | antes (ronda 1) | ahora | efecto |
|---|---|---|---|
| A · situación | `Call with your aunt: just over. Cris's laptop: open on…` | `The call with your aunt is over. Cris's laptop is open on…` | dos verbos donde no había ninguno |
| A · `You can't` 1 | `From outside: ten days of vacation.` | `Outside the family, it's ten days of vacation.` | la tapadera, montada |
| A · `You can't` 3 | `house under construction, already a no.` | `her house is under construction. You already asked her, and she said no.` | dos oraciones donde había una nota |
| A · `Only you know` | `after the 26th the last nights don't hold` | `after the 26th, Iván does not need a bed.` | la concesión, montada |
| B · situación | `Your laptop: open on…` · `Dani hangs up, walks in.` | `Your laptop is open on…` · `Dani hangs up and walks in.` | verbo añadido, coordinación añadida |
| B · `You can't` 3 | `the lease waits for something like a plan` | `If you say it early, it sounds like you're selling the visit.` | un primer condicional entero |
| B · `Only you know` | `wifi drops by the window · window over the bar street · nine in the morning, unloading boxes` | `the wifi drops by the window · your window looks at a street full of bars · at nine in the morning, men unload boxes there` | de tres notas a tres oraciones |
| B · lo que pierdes | `living room taken, one-hour video call gone. No two signatures…` | `the living room is taken and the video call is gone. Nobody signs…` | tres verbos donde no había ninguno |

Los hallazgos que pedían esto no estaban equivocados: pedían inglés más claro, más A2, menos
telegráfico. **Y esa petición y §11 tiran en direcciones opuestas.** La nota telegráfica es lo que
hace la ficha ilegible en voz alta; el inglés natural y bien formado es lo que la hace legible.
Cuando las cuatro auditorías se aplican en una sola pasada y la de calcabilidad se aplica primero,
las otras tres la deshacen sin querer.

**Es un hallazgo de proceso, no de este escenario: la auditoría de calcabilidad tiene que ser la
última que se aplica, y hay que releerla después de tocar la ficha por cualquier otro motivo.**

---

## Las 10 que fallan

### Bloqueantes

**1 · GRAVE — el motivo oculto de Cris, en tres oraciones, dos de ellas sin nada que cambiar**
**Línea 115**, `Only you know`:

> `Why the living room, not your room — don't say this first: the wifi drops by the window · your window looks at a street full of bars · at nine in the morning, men unload boxes there. If they ask you, tell them everything.`

`The wifi drops by the window.` se dice tal cual: pronombre no, pero sujeto, artículo y verbo
conjugado, y es **la misma frase que está en la tabla de exponentes** (línea 164:
`The wifi drops next to the window.`). `At nine in the morning, men unload boxes there.` también:
tercera persona, sin swap. De las tres partes del motivo, dos están escritas listas para
pronunciar dentro del bloque cuyo trabajo es guardarlas hasta que el otro pregunte. Y el criterio
de éxito de Cris (168) exige exactamente eso: *el motivo solo cuando lo pidan, y entonces entero*.

La ronda 1 marcó esta línea en riesgo y pidió `weak wifi by the window`. La corrección le puso el
artículo, que era justo lo único que le faltaba.

**Reescritura:** `Why the living room, not your room — don't say this first: weak wifi by the window · your window: over a street full of bars · nine in the morning, boxes off a truck under it. If they ask you, tell them everything.`

**2 · GRAVE — la retractación, otra vez escrita, en la carta**
**Línea 188**:

> `**Your plan was: he leaves before the 29th. That plan is dead now. Don't open this card early.**`

`He leaves before the 29th.` es tercera persona, presente, sin un pronombre que corregir, y es
**el plan que Cris tiene que romper en voz alta**. `That plan is dead now.` es la retractación
misma, y compite con el exponente que existe para eso (`That's not true any more.`, línea 162)
tres pantallas más arriba. Es el defecto bloqueante de la ronda 1, resuelto en la línea de arriba
y reaparecido en la de abajo.

**Reescritura:** `**Your plan, now dead: nights cut, out before the 29th. Don't open this card early.**`

**3 · GRAVE — lo que Cris pierde, en tres verbos conjugados**
**Línea 117**, `If you walk away with nothing`:

> `Monday the 24th: the living room is taken and the video call is gone. Nobody signs before September 1 — apartment hunting in two weeks, both of you.`

`The living room is taken and the video call is gone.` y `Nobody signs before September 1.` son
dos enunciados enteros, sin swap, y son el argumento de presión de Cris: leerlos es hacer el
turno. Esta sección era, en la ronda 1, **el modelo contra el que se reescribió la de Dani**
—*«tres consecuencias, cero verbos conjugados»*—. Hoy es al revés: la de Dani (44) está limpia y
esta falla.

**Reescritura:** `Monday the 24th: living room taken, video call gone. No signatures before September 1 — apartment hunting in two weeks, both of you.`

**4 · GRAVE — la concesión de Dani, montada, dentro del dato oculto**
**Línea 41**, `Only you know`:

> `Iván: appointment Friday the 21st, morning · answer Wednesday the 26th. Don't say this out loud. For you: after the 26th, Iván does not need a bed. Give away the last nights, not the first ones.`

`After the 26th, Iván does not need a bed.` es oración completa, tercera persona, sin swap. El
`For you:` que la precede intenta marcarla como razonamiento interno, pero no cambia nada: la
cláusula se levanta sola y es **la cesión que Dani tiene que construir**, que es el corazón del
acuerdo parcial. Además roza el secreto: dicho así, invita a la pregunta que Dani no puede
contestar.

**Reescritura:** `Iván: appointment Friday the 21st, morning · answer Wednesday the 26th. Don't say this out loud. For you: after the 26th, no bed needed. Give away the last nights, not the first ones.`

### Las otras seis

**5 · la tapadera, ya redactada**
**Línea 35**, `You can't` 1:

> `Say why Iván is coming. Family orders: nothing until there is an answer. Outside the family, it's ten days of vacation.`

`It's ten days of vacation.` — pronombre + verbo conjugado, la prueba escrita de §11. Y Cris **es**
el de fuera de la familia, así que la frase no es contexto: es la respuesta exacta que Dani tiene
que dar cuando le pregunten por qué viene Iván. La ronda 1 no la marcó porque antes decía `From
outside: ten days of vacation.`, que es nota.

**Reescritura:** `Say why Iván is coming. Family orders: nothing until there is an answer. Outside the family, the version is: ten days of vacation.`

**6 · la tercera salida cerrada, en dos oraciones**
**Línea 37**, `You can't` 3:

> `Your other aunt in Floridablanca: her house is under construction. You already asked her, and she said no.`

Dos cláusulas decibles sin tocar nada: `Her house is under construction.` y `She said no.` Son la
respuesta con la que Dani cierra esa vía si Cris la propone —turno avanzado leyendo—. Antes era
`house under construction, already a no.`, que es nota y no se puede decir.

**Reescritura:** `Your other aunt in Floridablanca: house under construction · asked already, and a no.`

**7 · la acusación que el criterio prohíbe, escrita para Cris**
**Línea 111**, `You can't` 3:

> `One thing per turn. Talk about the lease last, when you already have a plan. If you say it early, it sounds like you're selling the visit.`

`It sounds like you're selling the visit.` se dice tal cual a Dani, es natural y el turno avanza:
es una acusación. Que sea una acusación que a Cris le sale cara —los criterios cierran con *«you
never said the problem is them»*— no la salva; sigue siendo una frase decible fuera de la tabla, y
además es un primer condicional entero, que es la gramática ancla número dos del escenario.

**Reescritura:** `One thing per turn. The lease last, and only with a plan on the table. Early, it reads as payment for the visit.`

**8 · un exponente entrecomillado, en la línea de bloques**
**Línea 150**, `Your toolkit` de Cris:

> `Blocks **1** (they stop you in your own kitchen, and the box has no informal form for that: `Yeah? What's up?`), …`

`Yeah? What's up?` es una forma lista, en tipografía de código, **fuera de la tabla de
exponentes** — el otro disparo de la prueba escrita de §11. Es además la primera frase que Cris
dice en toda la partida. La ficha lo reconoce en su lista de pendientes (hallazgo 35): la forma
falta en la caja del nivel y se puso a mano mientras tanto. El sitio de esa muleta es la tabla de
exponentes, donde el estudiante ya sabe que hay frases; no la línea de bloques, que se lee de
corrido.

**Reescritura:** sacarla de la línea de toolkit —`Blocks **1** (they stop you in your own kitchen; the box has no informal form for that — see the table)`— y ponerla como fila de exponentes: `| picking up | `Yeah? What's up?` | you answer without opening anything |`. Como el rol ya tiene 10 filas, esta desplaza a la que menos trabaja.

**9 · la palabra del rechazo, con su razón conjugada**
**Línea 66**, vocabulario de Dani, `a cousin`, columna `here`:

> `| a cousin | your aunt's or your uncle's child | Iván — family, and that's why the hostel is an insult |`

`That's why the hostel is an insult.` — demostrativo + verbo conjugado, sin swap, decible, y es la
respuesta al hostal. El exponente ya la cubre (`He's not going to a hostel — not in this family.`,
línea 86). La celda es fila nueva de esta ronda; la columna `here` volvió a hacer lo que §11 avisa
que hace: explicar para qué sirve una palabra empuja sola hacia la frase que se dice con ella.

**Reescritura:** `Iván — family, and the reason the hostel is an insult`

**10 · LEVE, entrega — la pregunta de comprobación, en el cierre común**
**Línea 203**, `Both screens — how it ends`:

> `Then Cris answers yes or no: is this what we agreed? If Cris corrects one word, you did not agree on the same thing.`

`Is this what we agreed?` es la pregunta de comprobación entera, decible, en pantalla de los dos y
fuera de exponentes. Antes decía `Cris says whether that is what you agreed`, que es estilo
indirecto y no se puede leer. Es la única falla del bloque que llevaba seis escenarios limpio, y
la más barata de arreglar.

**Reescritura:** `Then Cris confirms it, or corrects it. One word corrected, and you did not agree on the same thing.`

---

## Las 20 que están a un cambio de fallar

No se cuentan como fallo porque dichas *tal cual* el enunciado sale falso, ajeno o meta. Fallan si
el estudiante hace el único cambio obvio. Marcadas **[r1]** las que ya venían señaladas en la
ronda 1 y no se aplicaron.

| línea | sección | lo que hay | lo que falta para fallar | reescritura |
|---|---|---|---|---|
| 27 · 101 | registro (×2) **[r1]** | `Nobody's the boss, nobody can leave.` | nada, pero no hace avanzar nada | `No boss here, and no exit.` |
| 28 · 102 | `Your screen only` (×2) | `Don't show it. Don't read from it.` | es instrucción | se deja |
| 30 | A · situación | `The call with your aunt is over.` · `Cris's laptop is open on…` | `your`→`my`; el nombre por `your` | `Call with your aunt: just over. Cris's laptop: open on the living room table.` |
| 36 | A · `You can't` 2 **[r1]** | `In your family that's an insult, and your aunt hears about it tonight.` | `your`→`my` | `In this family, an insult. And your aunt hears tonight.` |
| 51 | A · Facts, `Iván` **[r1]** | `bus arrives Thursday the 20th` | un artículo | `bus Thursday the 20th, 4:30 p.m.` |
| 53 | A · Facts, viernes **[r1]** | `and you can't say what it is` | `you`→`I` | `something important · the what stays closed` |
| 67 · 139 | vocab `here` (×2) **[r1]** | `one object, and three people want it` | contexto | `one object, three claims on it` |
| 70 · 142 | vocab `what it is` (×2) **[r1]** | `you have to do something for them later` | es definición, pero abre con pronombre + verbo | `something you must do for them later` |
| 77 | A · toolkit **[r1]** | `(it matters and you can't say why)` · `are their words, not yours` | `you`→`I` | `(matters · reason locked)` · `their words, not yours` |
| 95 | A · criterios | `nobody pays for a bed` · `you never said the problem is them` | es evaluación | se deja |
| 104 | B · situación **[r1]** | `Your laptop is open on…` · `Dani hangs up and walks in.` | `your`→`my`; la segunda es narración, que §11 prohíbe en la situación | `Your laptop: open on the living room table. Dani: off the phone, walking in.` |
| 109 | B · `You can't` 1 | `Sounds like an excuse.` · `You need the living room.` · `That's all.` | `you`→`I` en la segunda; la primera es decible pero apunta a sí misma | `The interview in your room. Don't explain why — only if they ask. Sounds like an excuse. The living room, and that is the whole reason you give.` |
| 114 | B · `Only you know` | `In Dani's head: you work from your room.` | `you`→`I` | se deja (el marco `In Dani's head:` ya la desactiva) |
| 115 | B · `Only you know` | `your window looks at a street full of bars` | `your`→`my` | `your window: over a street full of bars` |
| 128 | B · Facts, `Iván` | `you don't know him` | `you`→`I` | `never met` |
| 146 | B · vocab `to drop` | `your reason, and you don't give it first` | es instrucción | `your reason — not the first thing you give` |
| 150 | B · toolkit **[r1]** | `they stop you in your own kitchen` | cambio de sujeto | `stopped in your own kitchen` |
| 168 | B · criterios **[r1]** | `Monday the 24th, 8:00 to 11:00, is yours` · `breakfast tomorrow still works` | `yours`→`mine`; la segunda es evaluación | `Monday the 24th, 8:00 to 11:00, yours` · `breakfast tomorrow, still possible` |
| 183 | carta **[r1]** | `to be with you on Monday` | `you`→`me` | `| Why she moved it | Monday |` |
| 189 | carta | `you will not say that your mom arrives on the 29th` | `your`→`my`, y es la frase ancla del escenario | `Open it early and the sentence never gets said — and then never taken back.` |

Y una nota que no es de calcabilidad pero sale de leer la misma pantalla: la línea 190 dice
`And saying it, and then changing it, is the best moment of this game.` El propio documento
declara, en *Lo que no se aplicó* (hallazgo 1), que ese párrafo **se borra de la ficha** porque su
sitio es el documento de fase. No se borró: se reescribió más corto y sigue en la pantalla del
jugador, contándole de antemano cuál es el momento bueno.

---

## Lo que está bien y hay que dejar como está

- **Los dos `You want`** (32 y 106): sintagmas nominales, cero verbos finitos, las dos rondas.
  `A bed for Iván, ten nights, no fight, and a plan for your aunt tonight.`
- **La tabla `Facts` entera**, 20 filas, **0 fallas**. En la ronda 1 fallaba 4. La fila del colchón
  —`one single mattress at home · place for it: a bedroom floor`— es hoy el patrón: el dato con
  dos puntos, sin verbo, idéntico en las dos pantallas.
- **`If you walk away with nothing` de Dani** (44): `Iván on Thursday anyway — ticket bought — bed:
  wherever, nothing agreed.` Es exactamente la reescritura que pidió la ronda 1, y ahora es la
  limpia de las dos.
- **La tabla de la carta** (181-183): las dos filas de la noticia, en notas. Era el peor sitio del
  archivo y hoy es de los mejores.
- **Los dos primeros párrafos de la carta** (185-186): `Saturday the 29th: gone. New day: Thursday
  the 20th, same day as Iván.` Es cómo se da una noticia sin escribirla.
- **La columna `here` de Dani**, 9 de 10 limpias: `one paper, two names` · `same paper, more
  months` · `Iván, from Friday on` · `about the wifi, not about falling`. Cuatro maneras distintas
  de decir para qué sirve una palabra sin decir cómo se dice.
- **Los tres puntos del cierre** (198-200): preguntas incrustadas que obligan a producir la
  respuesta. Solo se cayó el párrafo de abajo.

---

## Coste del arreglo

Diez reescrituras de una línea. Ninguna toca el motor: ni el conflicto, ni la asimetría, ni las
salidas, ni el cierre, ni el reparto de turnos. Nueve son iguales o más cortas que el original, y
la única que crece —sacar `Yeah? What's up?` a la tabla de exponentes— desplaza una fila en vez de
añadir prosa, así que el presupuesto de 333/341 palabras no se mueve.

Orden por lo que cuesta dejarlas:

1. **La carta** (188) y **el motivo oculto de Cris** (115) — bloqueantes. Son el turno más caro
   del set y el único secreto que se gana preguntando.
2. **Lo que Cris pierde** (117) y **la concesión de Dani** (41) — bloqueantes. Producción diana.
3. **Las tres de `You can't`** (35, 37, 111) — la sección peor del archivo, y las tres nacieron en
   esta ronda.
4. **El exponente suelto del toolkit** (150) y **la fila `a cousin`** (66).
5. **La pregunta del cierre** (203) — leve, pero está en las dos pantallas de los ocho escenarios
   si el bloque se comparte.

Y una recomendación de proceso, que vale más que las diez: **releer esta auditoría después de
aplicar las otras tres.** Siete de las diez fallas de hoy no existían antes de corregir la ficha.

---
---

# Apéndice — ronda 1, informe original (20 ago 2026)

*Se conserva íntegro porque la ficha lo cita como fuente de sus hallazgos. Sus números y sus
líneas se refieren a la versión anterior del archivo y ya no coinciden con la actual.*

## Ronda 1 · ¿se puede leer en voz alta? (versión anterior de la ficha)

Auditoría de calcabilidad contra la regla de §11 del blueprint
(`docs/habla-acompanado-blueprint.md`, líneas 242-258):

> La ficha se escribe **en notas, no en frases**. `Exam: Saturday 12, 8:00 a.m.` sí.
> `I'm taking the exam on Saturday at eight.` no, jamás, ni en los datos ni en la situación ni
> en los objetivos. Las frases decibles viven **solo** en la tabla de exponentes.
>
> Prueba: si una línea se puede decir tal cual en la conversación y el turno avanza, está mal
> escrita.

Auditado: `artifacts/habla-a2/fase7-fichas-6-the-cousin-on-the-sofa.md`.

Fuera de alcance por diseño: las dos tablas *Say it here* (líneas 71-81 y 141-151), que son
exponentes y ahí las frases van a propósito; la cabecera del set (1-14) y el bloque *After*
(197-204), que están en español; la nota de diseño de la carta (175-178), que habla del ejercicio
en tercera persona y no llega a la pantalla del jugador; `grammarReferences` (206-232), que es
metadato de código; y la nota de presupuesto (236-250), que es del redactor.

## Cómo se marcó cada línea

Mismo criterio que en los escenarios 1, 2, 4 y 5, para que las cinco cifras se puedan comparar:

- **FALLA** — la línea, o una cláusula autónoma donde el ojo puede parar, es un enunciado inglés
  bien formado que ese rol le puede decir al otro y el turno avanza.
- **RIESGO** — es oración, pero dicha *tal cual* apunta mal: hace falta un cambio (un pronombre,
  un posesivo, un artículo) para que funcione en la boca. O es oración pero es meta —habla del
  ejercicio, no de la ficción— y dicha en voz alta no hace avanzar nada.
- **ENTREGA** — no se dice tal cual, pero pone la frase hecha en la mano fuera de la tabla de
  exponentes. Va contada dentro de FALLA.

**Las filas de tabla se leen de corrido, etiqueta incluida.** `| Your aunt | she calls tonight |`
se lee como una sola línea. Y §11 da una prueba escrita que aquí se aplica tal cual: *si la celda
contiene algo entrecomillado o algo que empiece por un pronombre y un verbo conjugado,
reescríbela*. **Nueve celdas de este escenario empiezan literalmente por pronombre y verbo
conjugado**, y una línea de criterios lleva comillas.

---

## Veredicto

**PASA CON CAMBIOS.** El motor está intacto y hay secciones enteras impecables: los dos
`You want`, el `If you walk away with nothing` de Cris, las 20 definiciones de `what it is`
—19 limpias— y el bloque de cierre común, que van seis escenarios seguidos sin un fallo. Ninguna
de las 16 reescrituras obliga a rehacer una sección: todas son de una línea.

Pero el defecto **se ha mudado de sitio**, y al sitio peor: **la carta**. Es la pantalla que Role B
abre en el turno global 6, la que contiene la única noticia que nadie más puede dar, y **3 de sus
7 unidades se leen en voz alta tal cual**. Las tres son la noticia.

Unidades de pantalla en inglés auditadas, sin contar exponentes: **95**.
Fallan **16** (16,8 %). Otras **21** están a un pronombre de fallar.

| escenario | unidades | FALLA | % | sección peor |
|---|---|---|---|---|
| 1 · `the-bike-in-the-parking-lot` | 73 | 7 | 9,6 % | vocabulario `here` |
| 4 · `a-charge-i-did-not-make` | 89 | 9 | 10,1 % | vocabulario `here` |
| **6 · `the-cousin-on-the-sofa`** | **95** | **16** | **16,8 %** | **la carta (43 %) · Facts (4 líneas)** |
| 2 · `no-appointment-until-thursday` | 94 | 18 | 19,1 % | vocabulario `here` |
| 5 · `late-again-on-monday` | 96 | 22 | 22,9 % | Facts |

**Tres son bloqueantes**, y son las tres de la carta (líneas 165, 166 y 171-173). Mientras estén,
el turno más caro del set entero se resuelve leyendo. La propia ficha lo dice en su nota de
diseño: retractarse en voz alta de un dato que uno mismo puso sobre la mesa es *«el turno más
valioso de todo el conjunto»*. Ese turno está escrito, conjugado y listo para pronunciar, tres
líneas por encima de esa misma nota.

**Dos más son caras** aunque no bloqueen: las dos de `Only you know` de Dani (31 y 33), que sacan
decibles la postura asimétrica del rol y la tercera salida.

---

## Dónde se concentran

| sección | unidades | FALLA | riesgo | estado |
|---|---|---|---|---|
| **La carta** (turno 6, pantalla de B) | 7 | **3** | 1 | **43 % — la peor por densidad, y es nueva como peor** |
| **Facts** (9 + 8 filas) | 17 | **4** | 3 | la peor por número absoluto |
| Tabla de vocabulario, columna `here` | 20 | **3** | 5 | 1 en A, 2 en B — mejor que en 1, 2 y 4 |
| `Only you know` (dato oculto) | 5 | **2** | 3 | las dos de Dani |
| `You can't` (restricciones) | 6 | **2** | 2 | las dos de Cris |
| `If you walk away with nothing` | 2 | **1** | 0 | la de Dani |
| `You did it if` (criterios) | 2 | **1** | 1 | comillas en la de Dani |
| Tabla de vocabulario, `what it is` | 20 | 0 | 1 | 19/20 — primera vez que no sale perfecta |
| `Your toolkit` | 2 | 0 | 2 | |
| Nota de registro + `Your screen only` | 4 | 0 | 2 | |
| `Where you are` (situación) | 2 | 0 | 1 | |
| `You want` (objetivo) | 2 | **0** | 0 | **limpia en los dos roles** |
| `Both screens — how it ends` | 6 | **0** | 0 | **limpia** |

**Reparto por rol: 7 de la ficha de Dani, 6 de la ficha de Cris, 3 de la carta.** Como la carta es
pantalla de Cris, quien más puede leer en voz alta es Cris: **9 líneas contra 7**. Y las tres suyas
llegan justo cuando más caro es leer.

### La causa número uno: aquí todo el mundo llega, y las llegadas se escribieron con verbo

El escenario entero está hecho de gente que aparece en una fecha —Iván el jueves, la mamá el
sábado, la mamá otra vez el jueves— y para marcar la llegada la redacción alcanzó un verbo
conjugado. Con verbo, un dato deja de ser dato:

| línea | quién llega | lo que se escribió |
|---|---|---|
| 35 | Iván, en el peor caso | `Iván lands Thursday anyway … and sleeps wherever` |
| 42 | el bus de Iván | `bus arrives Thursday the 20th` |
| 48 | la tía | `she calls tonight` |
| 126 | la visita, en vocabulario | `it's happening Thursday` |
| 165 | la mamá, en la carta | `she arrives Thursday the 20th, in the afternoon` |
| 166 | la mamá, en la carta | `she stays until Tuesday the 25th` |
| 172 | la mamá, otra vez | `She lands the same day as Iván and she is here on Monday.` |

Las siete son **producción diana**. El primer `grammarReference` del escenario es
`present-continuous-future-a2`, y su `rationale` (línea 212) cita palabra por palabra dos frases
que el estudiante tendría que construir: *«He's coming on Thursday the twentieth»* y *«my mom is
arriving on Thursday too»*. La segunda ya está escrita en la carta, sólo que en presente simple.
Si la llegada viene conjugada, el estudiante no construye el futuro: lo lee.

### La causa número dos: el colchón está escrito dos veces, y falla las dos

Las dos fichas comparten cuatro filas literales (colchón, apartamento, sofá, `put someone up`).
Eso es correcto —son el inventario común de la casa— pero significa que **un defecto en una fila
compartida se cobra doble**. El colchón, él solo, produce **4 de las 16 fallas**:

| línea | pantalla | lo que se escribió |
|---|---|---|
| 46 | Facts de Dani | `it fits on a bedroom floor` |
| 118 | Facts de Cris | `it fits on a bedroom floor` (idéntica) |
| 58 | vocabulario de Dani | `it goes on a bedroom floor` |
| 128 | vocabulario de Cris | `it's already in the house` |

Cuatro veces el mismo objeto, cuatro veces pronombre + verbo conjugado, y las cuatro decibles. Y
el colchón es **la segunda salida** de Dani, una de las dos que los criterios le exigen poner
sobre la mesa. Está servida en las dos pantallas.

Lo mismo, en grado menor, con el sofá: `one object, and three people want it` aparece en las líneas
57 y 127, riesgo las dos veces.

### La causa número tres: la carta no pasó por la misma disciplina que las fichas

Las fichas se escribieron contra el molde, con su presupuesto de prosa y su columna `here`
vigilada. La carta se escribió después, no tiene molde, y se nota: es la única pantalla del
escenario donde una tabla de dos columnas lleva **oración completa en las dos filas de datos**.
El resto de tablas de datos del escenario —17 filas— fallan 4. La carta falla 2 de 3.

---

## Las 16 que fallan

### La carta — pantalla de Cris, turno global 6

**1 · GRAVE — la noticia, ya conjugada**
**Línea 165**, tabla de la carta:

> `| The ticket | changed: she arrives Thursday the 20th, in the afternoon |`

Pronombre + presente simple con valor de futuro. Se dice tal cual, sin cambiar nada, y el turno
avanza: es exactamente la noticia que Cris tiene que dar. Es además el punto donde el escenario
paga su gramática ancla número uno.

**Reescritura:** `| The ticket | changed · Thursday the 20th, afternoon |`

**2 · GRAVE — la segunda mitad de la noticia, igual**
**Línea 166**:

> `| How long | she stays until Tuesday the 25th |`

Pronombre + verbo conjugado. Decible entera. Y es el dato que mata la salida que los dos estaban
construyendo, así que leerlo cierra el escenario sin producirlo.

**Reescritura:** `| How long | until Tuesday the 25th |`

**3 · GRAVE — la retractación, escrita y regalada**
**Líneas 171-173**, párrafo bajo la carta:

> `She lands the same day as Iván and she is here on Monday.`

Dos cláusulas, tercera persona, sin un solo pronombre que corregir. Es **el turno más valioso del
set** según la nota de diseño que está cuatro líneas más abajo: el único sitio donde alguien tiene
que romper en voz alta un dato que puso sobre la mesa. Está redactado como frase lista.

La misma frase, además, contiene `there is no "before the 29th" now`, con comillas —el otro
disparo de la prueba escrita de §11.

**Reescritura del párrafo entero, en notas:**

> **This card replaces a row in your Facts table.** Saturday the 29th: gone. New day: Thursday
> the 20th, same day as Iván. Monday the 24th: in the apartment. Way out now dead — cutting
> nights so he leaves before the 29th. No before-the-29th left.

### ROLE A — Dani

**4 · la postura del rol, en una frase perfecta**
**Línea 31**, `Only you know`:

> `You said yes to your aunt on Sunday. This is news, not a request — and you know it.`

La primera oración necesita un cambio de pronombre y se queda en riesgo. La segunda no necesita
nada: `This is news, not a request — and you know it.` se dice tal cual a Cris, es natural, es
demoledora y el turno avanza. Es la posición asimétrica entera del rol, redactada como réplica.
Y está dentro del bloque que guarda lo que el otro rol no debe recibir hecho.

**Reescritura:** `Sunday: yes already given to your aunt. Status tonight: news, not a request.`

**5 · la tercera salida, con su matiz incluido**
**Línea 33**, `Only you know`:

> `Not offered yet: Nelson, 402, away the 24th–30th, owes you a favor. Call tonight; he can say no.`

`He can say no.` es oración completa, tercera persona, sin swap, y es precisamente la reserva con
la que Dani ofrece a Nelson sin comprometerse. Turno avanzado leyendo. (`owes you a favor` se
queda en riesgo: le falta cambiar el pronombre.)

**Reescritura:** `Not offered yet: Nelson, 402 · away the 24th–30th · a favor owed to you. Call tonight · answer not guaranteed.`

**6 · el hecho consumado, narrado**
**Línea 35**, `If you walk away with nothing`:

> `Iván lands Thursday anyway — ticket bought — and sleeps wherever, nothing agreed.`

Sujeto y dos verbos conjugados, tercera persona, sin nada que tocar. `Iván lands Thursday anyway`
es el argumento del hecho consumado, que es la carta más fuerte de Dani.

**Reescritura:** `Iván on Thursday anyway — ticket bought — bed: wherever, nothing agreed.`

**7 · el colchón (1 de 4)**
**Línea 46**, Facts, fila `The mattress`:

> `| The mattress | one single mattress at home · it fits on a bedroom floor |`

Pronombre + verbo conjugado, la prueba escrita de §11. Es la segunda salida de Dani, servida.

**Reescritura:** `one single mattress at home · place for it: a bedroom floor`

**8 · la tía, conjugada**
**Línea 48**, Facts, fila `Your aunt`:

> `| Your aunt | she calls tonight |`

Dos palabras de las tres son pronombre y verbo. `She calls tonight.` se dice tal cual y es el reloj
del escenario. El exponente 81 (`I have to call my aunt tonight.`) ya cubre esta función: el cuerpo
no gana nada duplicándolo, y al duplicarlo la saca del único sitio donde el estudiante sabe que
hay frases.

**Reescritura:** `| Your aunt | her call: tonight |`

**9 · el colchón (2 de 4), en vocabulario**
**Línea 58**, vocabulario, `a mattress`, columna `here`:

> `| a mattress | the flat soft thing you sleep on | your second way out — it goes on a bedroom floor |`

Pronombre + verbo. Decible: `It goes on a bedroom floor.` Y es la propuesta, no el dato.

**Reescritura:** `your second way out — bedroom floor, not the couch`

**10 · las comillas de los criterios**
**Línea 84**, `You did it if`:

> `· "it's important" with no reason and no substitute ·`

Es la mitad de la prueba escrita de §11 —contenido entrecomillado fuera de exponentes— y son dos
palabras que forman un enunciado completo y decible: `It's important.` Es literalmente el movimiento
que el criterio pide. La más barata de arreglar de las 16.

**Reescritura:** `· importance stated, reason refused, nothing offered instead ·`

### ROLE B — Cris

**11 · la restricción, hecha réplica**
**Línea 98**, `You can't` 1:

> `The interview in your room — no explaining unless they ask. It sounds like an excuse: the living room, full stop.`

`It sounds like an excuse.` empieza por pronombre y verbo conjugado, y es decible tal cual: Cris
puede adelantarse con esa frase exacta. Basta quitar el pronombre para que vuelva a ser nota.

**Reescritura:** `The interview in your room — no explaining unless they ask. Sounds like an excuse: the living room, full stop.`

**12 · el movimiento retórico más difícil del rol, regalado**
**Línea 99**, `You can't` 2:

> `Say no to the visit. Iván isn't the problem; that answer makes you the bad person at breakfast.`

`Iván isn't the problem` es tercera persona, presente, sin swap. Es la jugada que separa a la
persona del problema —el criterio que cierra las dos fichas: *«the problem never theirs»*— y está
escrita palabra por palabra. (`that answer makes you the bad person` se queda en riesgo.)

**Reescritura:** `Say no to the visit. The visit itself: never the target. Cost of a no: the bad person at breakfast.`

**13 · el sofá de la mamá, en pasado simple**
**Línea 115**, Facts, fila `Your mom`:

> `| Your mom | arriving Saturday the 29th, staying the weekend · ticket bought · the couch was her bed |`

`the couch was her bed` es sujeto + verbo, decible tal cual, y es la reclamación de Cris sobre el
mueble en disputa. Los dos participios de la misma fila (`arriving`, `staying`) están bien: no son
finitos. El problema es sólo el tercer trozo.

**Reescritura:** `arriving Saturday the 29th, staying the weekend · ticket bought · her bed on other visits: the couch`

**14 · el colchón (3 de 4)**
**Línea 118**, Facts, fila `The mattress`:

> `| The mattress | one single mattress at home · it fits on a bedroom floor |`

Idéntica a la 46. Misma reescritura, y hay que hacerla en las dos pantallas o la fila deja de ser
común.

**Reescritura:** `one single mattress at home · place for it: a bedroom floor`

**15 · la visita, en presente continuo, en vocabulario**
**Línea 126**, `to have someone over`, columna `here`:

> `| to have someone over | to have a visitor staying in your home | it's happening Thursday, and you're not against it |`

`It's happening Thursday.` — pronombre + presente continuo con valor de futuro, que es la gramática
ancla número uno del escenario, entregada montada. Y `you're not against it` es, a un pronombre de
distancia, el otro movimiento obligatorio de Cris (nunca decir que no a la visita). Una sola celda
con las dos cosas.

**Reescritura:** `set for Thursday · not the part you fight`

**16 · el colchón (4 de 4)**
**Línea 128**, `a mattress`, columna `here`:

> `| a mattress | the flat soft thing you sleep on | it's already in the house — you can propose it too |`

Pronombre + verbo. `It's already in the house.` es decible y es la propuesta que Cris puede hacer.

**Reescritura:** `already in the house — yours to propose too`

---

## Las 21 que están a un cambio de fallar

No se cuentan como fallo porque dichas *tal cual* el enunciado sale falso, ajeno o meta. Fallan si
el estudiante hace el único cambio obvio.

| línea | sección | lo que hay | lo que falta para fallar | reescritura |
|---|---|---|---|---|
| 18 · 90 | registro (×2) | `Nobody's the boss, nobody can leave.` | nada, pero no hace avanzar nada | `No boss here, and no exit.` |
| 27 | A · `You can't` 2 | `In your family that's an insult, and your aunt hears tonight.` | `your` → `my` | `In this family, an insult. And your aunt hears tonight.` |
| 32 | A · `Only you know` | `after the 26th the last nights don't hold` | que Cris entienda a qué se refiere | `the last nights, weak after the 26th` |
| 42 | A · Facts, `Iván` | `bus arrives Thursday the 20th` | un artículo | `bus Thursday the 20th, 4:30 p.m.` |
| 44 | A · Facts, viernes | `you can't say what` | `you` → `I` | `something important · the what stays closed` |
| 49 | A · Facts, 402 | `owes you one` | `you` → `me` | `a favor owed to you` |
| 55 | A · vocab `here` | `this is the thing you're asking for` | es meta: habla de la palabra | `the thing you're asking for` |
| 57 · 127 | vocab `here` (×2) | `one object, and three people want it` | contexto para que signifique algo | `one object, three claims on it` |
| 62 | A · vocab `what it is` | `you have to do something for them later` | pronombre + verbo, pero es definición | `something you must do for them later` |
| 63 | A · vocab `here` | `they'll put this on the table; it isn't your topic yet` | `they` → `you` | `their card, not yours — not tonight's topic` |
| 67 | A · toolkit | `(it matters and you can't say why)` | `you` → `I` | `(matters, reason locked)` |
| 84 · 154 | criterios (×2) | `breakfast tomorrow still works` | nada, pero es evaluación | `breakfast tomorrow, still possible` |
| 93 | B · `Where you are` | `Dani hangs up, walks in.` | es narración; §11 prohíbe verbo en la situación | `Dani: off the phone, walking in.` |
| 100 | B · `You can't` 3 | `the lease waits for something like a plan` | que deje de ser metáfora | `the lease: only after something like a plan · earlier, a price` |
| 103 | B · `Only you know` | `Dani thinks you always work from your room.` | `Dani` → `you`, `you` → `I` | `In Dani's head: you always work from your room.` |
| 104 | B · `Only you know` | `wifi drops by the window` | un artículo — y repite el exponente 151 | `weak wifi by the window` |
| 131 | B · vocab `here` | `with no signatures, you're both renting somewhere else` | `you're` → `we're` | `no signatures → both of you renting somewhere else` |
| 137 | B · toolkit | `they stop you in your own kitchen` | cambio de sujeto | `stopped in your own kitchen` |
| 167 | carta | `to be with you on Monday` | `you` → `me` | `| Why she moved it | Monday |` |

---

## Lo que está bien y hay que dejar como está

No es cortesía: son el patrón contra el que se reescribe lo demás.

- **Los dos `You want`** (23 y 95) son listas de sintagmas nominales sin un solo verbo finito.
  `A bed for Iván, ten nights, no fight, and a plan for your aunt tonight.` es exactamente la
  forma que §11 pide.
- **`If you walk away with nothing` de Cris** (106): tres consecuencias, cero verbos conjugados.
  Compárese con la de Dani (35), que dice lo mismo narrando.
- **`Where you are` de Dani** (21): cuatro datos con dos puntos, ni un verbo. La de Cris es igual
  hasta la última frase.
- **`The other days` de Dani** (45): `nothing fixed · out early, back late`. Es el dato que decide
  el lunes de Cris, y está en nota. El exponente 76 lo dice conjugado, que es su trabajo.
- **`to be out all day`** (60), columna `here`: `the fact that saves the other person's Monday`.
  Sintagma nominal que dice para qué sirve sin decir cómo se dice. Es el modelo de la columna.
- **`to drop`** (132): `the wifi, next to your window — the reason you keep back`. La misma
  información que la línea 104 arruina con un verbo, aquí resuelta en nota.
- **Las 10 definiciones de `what it is` de Cris**: 10/10 limpias.
- **`Both screens — how it ends`** (184-195): seis unidades, cero fallos. Las tres condiciones de
  cierre están escritas como preguntas incrustadas (`Where Iván sleeps…`, `Who has the living
  room…`), que es la forma que obliga a producir la respuesta.

---

## Coste del arreglo

Dieciséis reescrituras de una línea. Ninguna toca el motor: ni el conflicto, ni la asimetría, ni
las salidas, ni el cierre, ni el reparto de turnos. Cuatro de las dieciséis son la misma fila del
colchón repetida, así que en la práctica son **trece decisiones de redacción**.

Orden sugerido, por lo que cuesta dejarlas:

1. **La carta** (165, 166, 171-173) — bloqueantes. Sin esto, el turno 6 se lee.
2. **`Only you know` de Dani** (31, 33) — el dato oculto y la tercera salida.
3. **El colchón, en las cuatro pantallas** (46, 58, 118, 128) — una decisión, cuatro ediciones.
4. **Las llegadas conjugadas que quedan** (35, 48, 115, 126) — la gramática ancla del escenario.
5. **Las dos de Cris en `You can't`** (98, 99) y **las comillas del criterio** (84) — baratas.

El presupuesto de prosa no corre peligro: doce de las dieciséis reescrituras son más cortas que el
original, y ninguna es más larga que la que sustituye.
