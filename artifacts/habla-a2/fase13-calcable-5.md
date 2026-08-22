# Fase 13 · Calcabilidad con las tablas de exponentes DENTRO — escenario 5, `late-again-on-monday`

**Auditado:** `artifacts/habla-a2/fase7-fichas-5-late-again-on-monday.md` tal como está hoy en disco
(22 ago 2026). Último commit que toca la ficha: `0a57fe20`; en el árbol de trabajo hay además un
cambio sin commitear que **solo toca dos cifras declaradas**, no la ficha.

**Contra:** `artifacts/habla-a2/fase9-calcable-5.md` (12 decibles + 4 de forma) y, de paso,
`fase10-calcable-5.md` y `fase11-ultimas-lineas.md`, que tocaron las mismas líneas después.

**Alcance (blueprint §11, commit `a677b077`):** prosa de las dos fichas, `Facts`, vocabulario,
carta, `You did it if`, `how it ends` **y las dos tablas `Say it here`**. Las tablas ya no están
fuera: no se audita si sus `form` se pueden decir —claro que sí, para eso están—, sino si la tabla
**leída en orden es la conversación** y si la columna `what it does here` son notas o líneas.

**Prueba única:** *si la línea se puede decir tal cual y el turno avanza, está mal escrita.*
Criterio de corte aplicado en los casos dudosos: no basta con que sea gramatical, tiene que ser
**idiomática como turno**. Lo que nadie diría así, va al filo y no se cuenta.

**Techo de prosa — la única cifra viva** (`node artifacts/habla-a2/fase7-scripts/prosa-canonica.mjs`,
corrido hoy sobre el disco):

```
fase7-fichas-5-late-again-on-monday.md        448   445
```

**ROLE A 448 · ROLE B 445**, tope 450. Cumple, y coincide con la tabla de presupuesto (l. 288-289) y
con la l. 458. **No coincide con la l. 302-303**, que sigue diciendo 450 y 448: ver §5.

---

## Veredicto

**NO PASA · 6 líneas decibles sobre 152 unidades auditadas.**

152 unidades = **77 oraciones de prosa de rol** (39 A + 38 B) + **39 filas** de datos y vocabulario
(10+10 en A, 10+9 en B) + **18 filas de exponentes** (9+9, contadas por primera vez en este
escenario) + **8 unidades de la carta** + **10 de `how it ends`**.

| bloque | unidades | decibles |
|---|---|---|
| **`Say it here` de B — columna `what it does here`** | 9 | **2** |
| **`how it ends` (pantalla compartida)** | 10 | **1** |
| **`You did it if` de B** | 8 | **1** |
| **`You did it if` de A** | 7 | **1** |
| **carta** | 8 | **1** |
| prosa de rol (`Where you are`, `You want`, `You can't`, `Only you know`, `If you walk away`, `Your toolkit`) | 62 | **0** |
| `Facts` + vocabulario, las dos fichas | 39 | **0** |
| `Say it here` de A (las tres columnas) | 9 | **0** |
| `Say it here` de B, columnas `function` y `form` | — | 0 |

**Lo que hay que leer en ese reparto: el cepillo de prosa queda a cero.** Las 62 oraciones que
fase 9, fase 10 y fase 11 llevan tres rondas puliendo están limpias, y las cinco frases recortadas
hoy no rompieron ninguna (§0). **Las seis decibles están todas en unidades que hasta hoy no se
miraban con este cepillo**: dos en la columna de notas de la tabla de B —la pieza que entró en
alcance con `a677b077`—, dos en los `You did it if` —que fase 9 declaró limpios en bloque «criterios
en pasado», y hoy dos de los catorce están en presente—, una en el cierre compartido y una en la
carta que fase 9 clasificó al filo y aquí se revoca.

**Más un defecto estructural:** la última fila de la tabla de exponentes de B es la concesión con
condición, que es el último movimiento de B y lo que decide el desenlace. Es el mismo defecto que
`fase12-calcable-3.md` encontró en el molde y que el molde ya corrigió el mismo día; este escenario
se quedó sin el arreglo.

---

## 0 · Las cinco frases recortadas hoy, una por una

El recorte va en `0a57fe20` (A 452→448, B 453→445 según el contador de esa pasada; hoy el contador
da 448 y 445). **Ninguna de las cinco dejó una frase que se levante entera.** Dos quedan al filo y
se explican abajo.

| # | línea | antes → hoy | veredicto |
|---|---|---|---|
| 1 | 30 · A `You want` | `…y you want the second set of keys.` → `…and the second set of keys.` | **limpia.** Lo que la protege no es lo recortado sino `your August bonus`: Amparo no pierde bonificación, pierde un llamado de atención propio. El predicado no lo sostiene quien escucha |
| 2 | 38 · A `Only you know` | `You said it out loud once` → `You said it once` | **limpia.** El `it` sigue sin referente para Amparo y el `You coach…` de la oración anterior sigue siendo falso en su boca |
| 3 | 110 · B `Before you speak` | `…on the desk, then talk.` → `…on the desk.` | **al filo.** Ver §3: el recorte se llevó lo único que marcaba la línea como acotación de escena, y lo que queda es un imperativo limpio |
| 4 | 112 · B `Where you are` | `when the truck comes at ten past seven` → `when the truck comes` | **limpia, y mejora.** La hora era el dato que hacía la oración autónoma; ahora el turno depende de `The store you open` y `You are alone at the door`, los dos falsos en boca de Camilo. El dato no se pierde: sigue en `Facts` (`The truck | Mondays at 7:10`) |
| 5 | 126 · B `If you walk away with nothing` | `a warning of your own` → `your own warning` | **al filo.** Ver §3: la oración entera sigue protegida por `You open the store alone`, pero la segunda mitad quedó más suelta que antes, no menos |

---

## 1 · Las seis decibles — línea literal, sitio y arreglo

### 1 · GRAVE — `Say it here` de ROLE B, fila `why him`, columna `what it does here` (l. 175)

> `finish it with the store, not with a name · this is about the warehouse, not about the three Mondays`

La segunda mitad **no es una nota, es una línea**. `This is about the warehouse, not about the three
Mondays.` es idiomática, tiene deixis cero, la dice Amparo tal cual y el turno avanza: es su
movimiento de encuadre entero, el que saca la conversación del castigo y la mete en el almacén.
Está impresa en la columna que existe para explicar **para qué sirve la fila**, al lado de un
exponente que sí está bien hecho y con hueco (`You know this warehouse better than…`).

Es exactamente la prueba (d) del alcance nuevo, y es la primera vez que se mira esta columna.

**Arreglo — 19 → 17 palabras:**
`finish it with the store, not with a name · about the warehouse, not about the three Mondays`
(caen `this is`; lo demás no se toca)

### 2 · `Say it here` de ROLE B, fila `the rule, not the fight`, columna `what it does here` (l. 172)

> `it is the rule, not your decision`

`It is the rule, not your decision.` — pronombre + verbo conjugado, la forma que §11 nombra por su
nombre, y además decible: dicha a Camilo se entiende perfectamente («no lo decides tú») y avanza.
Que **el sentido se invierta** —la nota quiere decir «no lo decides tú, Amparo»— no la salva: la
prueba es si se levanta y mueve el turno, no si conserva el significado. Se levanta.

**Arreglo — 6 → 5 palabras:**
`an obligation, not your decision`
(sin cópula no hay oración; y de paso deja de repetir la etiqueta de la fila, que ya dice `the rule`)

### 3 · `how it ends` — pantalla compartida (l. 218)

> `**And to really finish:** you sign the commitment sheet on the desk. If the line does not say what happens next Monday before seven, you are not finished.`

La segunda oración es autónoma, idiomática y es **la palanca entera de Amparo**: dice el requisito y
la hora. Se dice tal cual y el turno avanza.

Y hay una razón de fondo que conviene escribir, porque afecta a los ocho escenarios: **en la pantalla
compartida la segunda persona no protege**. En una ficha de rol el `you` se invierte al decirse —
apunta al que escucha y el predicado se cae—. En `how it ends` leen los dos, así que basta con que
el predicado se sostenga **en una sola dirección** para que la línea sea decible. Lo único que sujeta
el resto del bloque es la palabra `both` (`you both say these three things`, `you both agree`), y
esta línea es la única del cierre que se quedó sin ella.

**Arreglo — 28 → 22 palabras:**
`**And to really finish:** you both sign the commitment sheet on the desk. No time before seven on that line, no close.`
(`both` devuelve el `you` a la pareja; la segunda oración pierde el verbo y con él la posibilidad de
ser turno)

### 4 · `You did it if` de ROLE B, criterio 6 (l. 184)

> `You gave a training day you can keep and said what it costs you. If it costs you nothing, say why.`

`If it costs you nothing, say why.` es un primer condicional con imperativo, en segunda persona, y
dicho por Amparo a Camilo aterriza como un reto perfecto —encaja además con el punto 3 del cierre—.
El `you` no se invierte: ya apunta al que escucha.

**Y hay que decir de dónde viene:** esta línea decía `If it cost you nothing, say why.` y
`fase9-nivel-5.md` §3.5 la corrigió a `costs` (registrado en la l. 494 de la propia ficha). El
subjuntivo era lo único que la marcaba como hipótesis de pantalla; el presente la convirtió en una
condición real que se puede soltar en la mesa. **Un arreglo de nivel creó una decible.**

**Arreglo — 21 → 20 palabras:**
`You gave a training day you can keep, and said what it costs you — or why it costs you nothing.`
(vuelve al pasado, que es la forma de los otros seis criterios de B)

### 5 · `You did it if` de ROLE A, criterio 5 (l. 99)

> `Somebody can check the WHAT CHANGES line next Monday: a time, a bus, a name — not a promise.`

Presente, deixis cero, idiomática, y **es el argumento de cierre de Camilo dicho entero**: le dice a
Amparo qué tiene que llevar el renglón para que sirva. Se dice tal cual y el turno avanza.

`fase9-calcable-5.md` la dejó al filo con este motivo: «sin referente en la mesa hasta que el renglón
exista». **Se revoca:** el renglón está en la mesa desde el turno 1 —la propia ficha de B abre con
`Put the keys and the commitment sheet on the desk`— así que el referente existe antes de que
cualquiera hable.

**Arreglo — 18 → 17 palabras:**
`You put a time, a bus and a name on the WHAT CHANGES line — not a promise.`
(pasado, como los otros seis criterios de A; y dicho a Amparo es falso, porque su restricción 3 le
prohíbe escribir ese renglón)

### 6 · La carta, tercer bloque, primera viñeta (l. 201)

> `- A secret deal does not work now.`

Siete palabras, presente simple, sujeto nominal, cero deixis, y **es el mensaje entero de la carta**:
que ya no cabe trato discreto. Amparo la dice tal cual y Camilo reacciona.

`fase9-calcable-5.md` la dejó al filo con «Camilo no estuvo en el pasillo: no avanza, pregunta».
**Se revoca:** que el otro pregunte *es* avanzar, y aquí la pregunta es justo la que la carta quiere
provocar. Además la viñeta de al lado —`Nothing you give him now stays between the two of you.`—
se reescribió en la pasada quirúrgica (falla 8 de fase 9) exactamente por esta forma; esta se quedó
sin tocar por estar en la viñeta anterior.

**Arreglo — 7 → 7 palabras:**
`- No room now for a quiet deal.`
(sintagma sin verbo: no se levanta como turno, y dice lo mismo)

---

## 2 · Las dos tablas `Say it here`, auditadas como objeto

### (b) ¿Agrupada por función y alfabética por función?

**Sí, las dos.** Nueve funciones por rol, una función por fila, ninguna fila por turno.

- **A:** *an hour that cannot move · asking what the keys are for · naming the paper · one apology ·
  putting a name on the table · saying the job out loud · the price, both ways · what changed in
  August · what you can start.* Orden estricto, con el artículo dentro de la etiqueta —mismo criterio
  que el molde—.
- **B:** *asking, and then waiting · he thinks you're angry · naming your price · one more door · the
  rule, not the fight · the two things on the desk · what it costs each of you · why him · yes, with
  a condition.* Orden estricto.

### (c) ¿Más filas que turnos?

**Sí en el suelo de la banda, y esto es un hallazgo.** Las dos tablas tienen **9 filas** y la ficha
declara **`6-9 turns each`** (l. 9, 25 y 107). Un estudiante en el suelo de su propia banda juega 6
turnos con 9 filas delante: más andamio que turnos.

`fase12-tablas.md` §2 dio esto por bueno con esta frase: «Ninguna tabla tiene más filas que turnos:
**los ocho roles declaran 9 turnos por rol**». Para este escenario es falso desde la pasada de nivel:
la banda bajó de `16-23` a `6-9` (registrado en la l. 502 de la propia ficha). Nueve filas siguen
siendo legales —§11 fija 6-9 exponentes— pero **las tablas de este escenario no pueden crecer**, y el
recorte pendiente del `You did it if` (§1 recorte 4-5, l. 527-528) es el sitio natural para bajar
también una fila por rol si se quiere holgura.

### (a)/(e) ¿La tabla leída en orden es la conversación? ¿Alguna secuencia reproduce arranque o cierre?

**ROLE A — no es un guion.** Su primera pregunta (`asking what the keys are for`, la que exige el
criterio 1) está en la fila 2, no en la 1; la disculpa cae detrás de ella, al revés que en la mesa; y
la cola (fila 7 cierre punto 3 → fila 8 explicación temprana → fila 9 cierre punto 2) va y vuelve.
Ninguna carrera contigua reproduce el arranque ni el cierre.

Al filo, señalado y **no contado**: las filas 2→3→4 (`asking what the keys are for` → `naming the
paper` → `one apology`) se leen como un arranque plausible. No es el arco —el criterio 1 y el 2 de A
ponen la disculpa **antes** de los papeles— y el orden inverso es igual de plausible. Si alguien
quiere romperlo por si acaso, cuesta **dos palabras por dos**: `one apology` → `sorry, once`, que en
alfabético cae detrás de `saying the job out loud` y deja las filas 2-3-4 en turno 1 → medio →
tardío.

**ROLE B — DEFECTO: la última fila es el otorgamiento.**

| fila | función | forma | turno del diseño |
|---|---|---|---|
| 1 | asking, and then waiting | `What happened this morning?` | temprano |
| 2 | he thinks you're angry | `I'm not angry.` | temprano |
| 3 | naming your price | `That helps, but I need…` | medio-tardío |
| 4 | one more door | `What if we…?` | medio-tardío |
| 5 | the rule, not the fight | `I have to write…` | medio |
| 6 | the two things on the desk | `Have a seat, Camilo.` | **turno 1** |
| 7 | what it costs each of you | `Nobody pays me for…` | cierre, punto 3 |
| 8 | why him | `You know this warehouse better than…` | medio |
| **9** | **yes, with a condition** | **`If you write this line today, I can…`** | **el otorgamiento: el último movimiento de B** |

El arranque está a salvo: `Have a seat, Camilo.` cae en la fila 6 y la pregunta abierta en la 1, al
revés. Pero **la última fila es la concesión con condición**, que es el acto que da nombre al
escenario y lo único que decide el desenlace. Es literalmente el defecto que `fase12-calcable-3.md`
abrió contra el molde (`your condition` en la fila 6 de 6: «hasta le dice *cuándo* soltar la
condición»), y el molde ya lo corrigió el mismo día con un renombre. Aquí no se aplicó.

La fila 7 (cierre punto 3) está a dos filas de la 9, con la 8 en medio, así que no hay carrera de
tres: es una fila, pero es la fila que resuelve.

**Arreglo — 4 → 2 palabras, cero prosa, cero presupuesto:**
`yes, with a condition` → **`granting it`**, la misma etiqueta que adoptó el molde. Cae en la fila 2
por alfabético y el orden resultante es *asking, and then waiting · granting it · he thinks you're
angry · naming your price · one more door · the rule, not the fight · the two things on the desk ·
what it costs each of you · why him* → temprano, **cierre**, temprano, medio-tardío, medio-tardío,
medio, **turno 1**, cierre, medio. El otorgamiento queda en la cabeza de la tabla, la cola termina en
un turno medio y ninguna carrera reproduce nada.

### (d) ¿`what it does here` son notas o líneas decibles?

**A: 9 de 9 no decibles**, con tres celdas que son oración conjugada y conviene apretar cuando se
toque la tabla (ninguna cuenta: ninguna es idiomática como turno ni avanza nada).

| l. | celda | por qué no cuenta | arreglo, en palabras iguales o menos |
|---|---|---|---|
| 86 | `the three papers sound the same. They are not the same` | dicha por Camilo afirma un saber que él no tiene: es el que **pregunta** cuál es cuál | `three papers that sound the same, and are not` (11 → 8) |
| 89 | `say it once, in clear words. Nobody guesses it` | el `it` no tiene referente en voz alta | `say it once, in clear words · nobody guesses` (9 → 8) |
| 91 | `two times and a date. People understand times` | comentario meta, no turno | `two times and a date, which people follow` (8 → 7) |

**B: 7 de 9 limpias, 2 decibles** — son las fallas 1 y 2 de §1 (l. 175 y l. 172). Y una tercera con
defecto distinto, que no es de calcabilidad y sí de utilidad:

| l. | celda | defecto |
|---|---|---|
| 169 | `he thinks you're angry` / `he thinks you are angry — show him you are not` | **la etiqueta y la nota dicen lo mismo**: la fila explica su propio título y no explica la fila. Es nuevo: la etiqueta cambió hoy en `2b6d494e` (`clearing the air` → `he thinks you're angry`) y colisionó con una nota que ya estaba. Arreglo: etiqueta `taking the heat down` (4 → 4 palabras), que además cae entre `one more door` y `the rule, not the fight` y no crea ninguna carrera |

### Columna `form` — troncos y oraciones cerradas

**A: 1 cerrada de 11** (`What are the keys for, doña Amparo?`). **B: 4 cerradas de 14**
(`What happened this morning?`, `I'm not angry.`, `Have a seat, Camilo.`, `You fill out this line,
not me.`). Las cinco están **dentro del criterio declarado** en `fase12-tablas.md` §4 —se conserva
entera la forma que no lleva dato dentro, y las dos con nombre son la única marca de registro del
escenario, cosa que la propia ficha dice por escrito en la l. 12-15—. **Sin hallazgo.**

---

## 3 · Al filo, señalado y no contado

| l. | literal | por qué no cuenta, y qué haría falta |
|---|---|---|
| 110 | `Put the keys and the commitment sheet on the desk.` | Camilo no tiene ni las llaves ni la hoja: dicho a él nadie puede obedecer, y el turno no avanza. **Pero el recorte de hoy se llevó `then talk`, que era lo único que la marcaba como acotación.** Si alguien vuelve a tocar B, devuélvasele la marca sin devolver palabras: `**Before you speak** · Keys and commitment sheet on the desk. Without them, this is a complaint.` (sin verbo conjugado, −1 palabra) |
| 126 | `You open the store alone for two more years, and you get your own warning, with two Mondays to explain.` | la oración entera se cae en la primera cláusula —Camilo no abre la tienda—. Pero la segunda mitad, `you get your own warning, with two Mondays to explain`, es hoy una amenaza más limpia que el `a warning of your own` que había ayer: **el que la parta en dos, la publica** |
| 117 | `None of that is in your hands, and you don't want it.` | `that` sin referente en voz alta: Amparo no ha nombrado despidos ni recortes de sueldo cuando el jugador lee esto |
| 100 | `You can name the paper and say who reads it.` | `name the paper` es metalingüístico: nadie pide así que le digan qué papel es. Aun así rompe el paralelismo del bloque —es el otro criterio de A en presente—. Al tocar la falla 5, pásese también a pasado: `You said which paper it is, and who reads it.` (10 → 10) |
| 194 | `Alba knocks on the office door.` | narración de la carta en tercera persona; dicha en voz alta no mueve nada, y la oración siguiente (`You step into the hallway…`) es falsa en boca de Camilo |
| 220 | `Point 2: you cannot close with a promise.` · `Point 3: you cannot close without the price.` | **tal cual** llevan el prefijo `Point 2:` / `Point 3:`, que nadie pronuncia. Pero son la misma raíz que la falla 3: segunda persona sin `both` en la pantalla compartida. Si el cierre se retoca alguna vez, van con `both` o sin persona |
| 123 | `You never taught her the truck.` | riesgo heredado y anotado por `fase10-calcable-5.md`: Camilo **sí** sostiene el predicado, pero dicho por él es un reproche por algo que nadie le pidió y no comunica lo que Amparo necesita. Sigue igual |

---

## 4 · `fase9-calcable-5.md` — qué sigue vivo

**Nada de las doce decibles ni de los cuatro defectos de forma sigue vivo en el texto.** Verificado
sobre el disco, línea a línea:

| # | l. | estado hoy |
|---|---|---|
| 1 | 114 | aplicado · `He gives you the WHAT CHANGES line and two mornings of training first.` |
| 2 | 123 | aplicado · `You never taught her the truck.` (riesgo anotado, §3) |
| 3 | 124 | aplicado · `…6:30 to 8:30, in your own unpaid time.` |
| 4-5 | 112 | aplicado, y **recortado otra vez hoy**: `…when the truck comes, and you have opened alone three Mondays.` |
| 6 | 118 | aplicado · `, not with the other four watching.` |
| 7 | 141 | aplicado · `eyes on everything` |
| 8 | 202 | aplicado · `Nothing you give him now stays between the two of you.` |
| **9** | **30** | **superado por otra pasada.** La línea de hoy no es la que pidió fase 9 ni la que registra la propia ficha: es `You want your August bonus safe from that paper, and the second set of keys.` Limpia, ver §0 y §5 |
| 10 | 41 | aplicado modificado · `Your bonus goes with it, and the warehouse job and the keys go too.` |
| 11 | 52 | aplicado · `daycare, never before 6:40` |
| 12 | 55 | aplicado · `keys and delivery note, always together` |
| F1-F4 | 63, 148, 151, 150 | los cuatro aplicados |

**Dos clasificaciones de fase 9 se revocan**, y las dos se cuentan hoy: la carta l. 201 (`A secret
deal does not work now.`, §1 falla 6) y el criterio 5 de A l. 99 (§1 falla 5).

**Y una afirmación de bloque de fase 9 no se sostiene:** «`You did it if`, 14 unidades, 0 fallas en
las dos fichas: criterios en pasado». Dos de los catorce están en presente (l. 99 y l. 100) y el de
B (l. 184) pasó a presente **después**, dentro del arreglo de nivel §3.5. La regla que hacía limpio
ese bloque —todo en pasado— dejó de cumplirse sin que nadie lo mirara.

---

## 5 · El documento ya no se describe a sí mismo

Ninguno de estos puntos va a pantalla del estudiante. Todos hacen que la próxima pasada trabaje sobre
datos falsos, que es lo que creó el contador canónico.

1. **l. 302-303 · la conclusión caducada.** `c424fdbb` (hoy, 18:22) puso al día la tabla de
   presupuesto (288-289) y la l. 458, y pasó la l. 299 a pasado (`A subió a 450 y B a 448`), que como
   relato de la pasada anterior es cierto. **Lo que quedó vivo y ya no lo es** es la conclusión que
   cuelga de esa cifra: `Ninguna ficha se pasa, pero **A queda clavada en el techo**: la próxima
   línea que crezca en su prosa tiene que salir de otra`. Hoy A está en 448: tiene dos palabras de
   aire, y las dos reescrituras que este informe pide caben sin quitar nada de ninguna otra línea.
2. **El recorte de hoy no está registrado en ninguna parte.** La sección «Pasada quirúrgica del 22 ago
   2026» abre con «**Ninguna otra línea se tocó**: ni para acortarla, ni para mejorarla» y lista 16 +
   15 cambios. Después de escribirla, `0a57fe20` recortó **cinco líneas de prosa más** (30, 38, 110,
   112, 126) que no aparecen en ninguna lista. La declaración es hoy falsa y las cinco frases hay que
   poder auditarlas sin `git log`.
3. **La fila 9 del registro (l. 472) describe una línea que ya no existe.** Dice
   `You don't want a written warning in your file.` → `You want to walk out with no warning about you
   on paper.` La segunda mitad la sustituyó `ae708726` (`fase11-ultimas-lineas.md` §6) porque también
   era decible. La l. 30 de hoy no es ninguna de las dos.
4. **Cuatro citas de `grammarReferences` citan formas que la pasada de tablas convirtió en troncos.**
   `used-to-a2` (l. 246) cita `"My bus used to arrive at ten to seven — now…"`; `will-future`
   (l. 254) cita `"I'll start at… from next Monday"`; `can-ability` (l. 262) cita `"I can start at
   five to seven."` y `"The neighbor in 3 can take…"`; y **`telling-time` (l. 264) afirma «las horas
   se dicen completas en los exponentes: "a quarter past seven", "five to seven"»**, que ya no es
   cierto: ninguna de las dos está en ninguna de las dos tablas. La cuarta es la que hay que arreglar
   sí o sí, porque es una afirmación, no una cita. Estaban avisadas en `fase12-tablas.md` §5.1.
5. **El párrafo de prosa l. 309-310** cita el par `I can start at five to seven.` → `I'll start at…
   from next Monday.`; la tabla dice hoy `I can start at…` → `I'll start at…, from…`.
6. **Dos números de línea del registro quirúrgico apuntan a otra fila.** La l. 498 manda a la «línea
   172» por `You fill out this line, not me.`, que hoy está en la **173**; la l. 499 manda a la «176»
   por `What if we…?`, que hoy está en la **171**. Las filas se reordenaron por alfabético después de
   escribir el registro.
7. **`fase12-tablas.md` §2** afirma que «los ocho roles declaran 9 turnos por rol». Para este
   escenario la banda es `6-9` desde la pasada de nivel. Ver §2(c).

---

## 6 · Efecto sobre el presupuesto

De los seis arreglos, **solo dos tocan prosa que el script cuenta**: la falla 5 (criterio de A, 18 →
17) y la falla 4 (criterio de B, 21 → 20). Las fallas 1 y 2 son celdas de tabla, la 6 es la carta y
la 3 vive fuera de los bloques `## ROLE`: el contador no ve ninguna de las tres.

| ficha | hoy | después de aplicar | tope |
|---|---|---|---|
| ROLE A | 448 | **447** | 450 |
| ROLE B | 445 | **444** | 450 |

Las etiquetas de función (`granting it`, `taking the heat down`, `sorry, once`) y las tres celdas de
la columna `what it does here` de A no cuentan prosa. **Vuélvase a correr
`node artifacts/habla-a2/fase7-scripts/prosa-canonica.mjs` después de aplicar y escríbase lo que
imprima**, no lo estimado aquí: es el fallo que esta ficha ha cometido tres rondas seguidas y el que
sigue vivo hoy en su l. 302.

---

**Devuelto a `habla-fichas-de-rol`.** Seis líneas, tres etiquetas de función, tres celdas de notas y
siete correcciones de registro. **Cero prosa reescrita por estilo, cero datos, cero motor, cero
piezas.** Lo que cierra el escenario no es ninguna de las seis por separado: es que las tres piezas
que hasta hoy nadie auditaba —la columna de notas de las tablas, los `You did it if` y la pantalla
compartida— resultaron llevar las seis, mientras la prosa, que es lo único que se ha estado
cepillando, ya estaba limpia.
