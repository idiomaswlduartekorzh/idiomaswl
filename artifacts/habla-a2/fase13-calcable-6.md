# Fase 13 · Calcabilidad del escenario 6, `the-cousin-on-the-sofa` — con las tablas dentro

**Auditado:** `artifacts/habla-a2/fase7-fichas-6-the-cousin-on-the-sofa.md` **tal como está hoy en
disco** (22 ago 2026), después de la **pasada de carga** (§ *«el cierre pasa a repartir»*) y del
**recorte de prosa** (§ *«bajar del techo de §11»*). Las dos entran en la auditoría.

**Contra:** `artifacts/habla-a2/fase10-calcable-6.md` (la pasada anterior: 0 decibles, 5 al filo) y
`artifacts/habla-a2/fase12-calcable-3.md` (el método, que es de donde sale el alcance ampliado).

**Prueba única:** *si la línea se puede decir tal cual y el turno avanza, está mal escrita.* La prosa
está escrita **sobre** el jugador, en segunda persona: al decirse se invierte y se rompe. Lo que se
caza es lo que **no se invierte** — la tercera persona sobre alguien que no juega, y el dato suelto.

**Alcance (§11 del blueprint, commit `a677b077`):** prosa de las dos fichas, filas de datos, filas de
vocabulario, carta, `how it ends`, `You did it if` **y las dos tablas `Say it here`**.

**Contador canónico corrido hoy** (`node artifacts/habla-a2/fase7-scripts/prosa-canonica.mjs`):
**ROLE A 449 · ROLE B 449**, techo 450. Coincide con lo que el archivo declara y con lo que dice el
recorte. El set entero va 16/16 dentro del techo.

---

## Veredicto

**DEVUELTO A `habla-fichas-de-rol` · 1 línea decible sobre 162 unidades (0,6 %) · 2 defectos
estructurales, los dos en texto nuevo de hoy.**

162 unidades = 62 oraciones de prosa de rol (31 A + 31 B) + 20 filas de datos + 38 celdas de
vocabulario + 10 unidades de la carta (7 de prosa + 3 filas) + 15 líneas de `how it ends`
+ **17 filas de exponentes (8 + 9)**.

Lo que hay que saber en una línea: **el cepillo de prosa sigue limpio** —los 11 arreglos de fase 9
están vivos y ni el recorte ni la carga han metido una decible nueva en la prosa—, pero **las dos
piezas que se tocaron hoy fallan las dos**, y ninguna de las dos cuesta prosa arreglarla: el cierre
repartido imprime en la pantalla de Dani el resultado que Dani tiene que ceder, y la cola de la tabla
de Cris se ha convertido en su final de partida. La decible única es vieja y estaba **dada por buena
en la pasada anterior**: la fila `Why` de la carta.

**Las tres correcciones caben en cero palabras de presupuesto.** El contador va de `## ROLE X` a la
siguiente cabecera de nivel 2 y descuenta filas de tabla: la carta, el cierre y las dos tablas están
**fuera de la cuenta**. El 449/449 no se mueve con ninguno de los tres arreglos.

---

## 1 · Lo que sigue vivo de la pasada anterior

**Los 11 hallazgos de fase 9 (9 decibles + 2 defectos de forma) siguen arreglados, 11 de 11.** Se
releyeron una a una hoy: las dos restricciones y las dos viñetas de A, las tres restricciones y la
viñeta 3 de B, el desenlace de A, la línea de cierre de la carta y las dos celdas `here` de B.
Ninguna ha vuelto atrás, y ni la carga ni el recorte tocaron ninguna de ellas.

**Las 5 «a un cambio de fallar» de fase 10 siguen vivas, las cinco.** Ninguna cuenta, pero una se
movió hoy:

| # | dónde | línea de hoy | estado |
|---|---|---|---|
| 1 | B · `You can't` 1 (l. 147) | `From outside it sounds like an excuse.` | **un notch más cerca**: el recorte 3 le quitó el `only`. Sigue sin contar (no contesta nada, no cierra ninguna puerta), pero era la línea que fase 10 ya señalaba como la más fluida del bloque y ahora lo es más |
| 2 | B · `You can't` 2 (l. 148) | `…and if you say no, you are the bad guy at breakfast.` | igual. La salva que la unidad empieza en `You can't say no to the visit.` |
| 3 | B · `You can't` 1 (l. 147) | `You need that table or you lose the call.` | igual |
| 4 | A · `You can't` 1 (l. 76) | `Outside the family you give the same version: ten days of vacation.` | igual. Los dos puntos la salvan |
| 5 | A · `If you walk away` (l. 85) | `Tomorrow you have breakfast here, with the same person.` | igual. `the same person` es metalengua |

**Lo que fase 10 no podía ver:** declaró fuera de alcance las dos tablas `Say it here` y ahí está el
defecto 2 de hoy. `fase12-tablas.md` sí las miró y midió bien lo que midió —«los tres puntos de Cris
quedan en orden inverso al del cierre», cierto por índice de fila—, pero **no miró la fila del
otorgamiento**, que es la que hoy hace de bisagra en la cola.

---

## 2 · DEFECTO 1 (estructural, cierre nuevo) · el cierre imprime en la pantalla de Dani el resultado que Dani tiene que ceder

**Sitio:** `## Both screens — how it ends`, ll. 236-238. **Texto nuevo de hoy** (pasada de carga,
cambio 1).

**Línea literal:**

```
**Only Cris can say:** from what time to what time the living room is Cris's on Monday the 24th ·
the lease, and the day it has to carry the two names · what you did not decide today, and when you
talk about it — Sunday the 23rd, in the kitchen, after lunch.
```

**Qué pasa.** El bloque se llama `Both screens` y el propio archivo manda imprimirlo entero dentro de
las dos fichas (pendiente 53, y `## Lo que no se aplicó`, «el renderizador imprime el bloque de cierre
entero dentro de las dos»). O sea: **Dani lee esto antes del turno 1.** Compárese con lo que decía
antes de hoy (`git show d672a01c`):

```
2. **Who has the living room on Monday the 24th** — and from what time to what time.
```

La versión vieja dejaba **abierto** de quién es el salón el lunes 24. La nueva lo cierra —`the living
room is Cris's`— y lo cierra en la pantalla del jugador que tiene que cederlo. No es una decible: es
peor, es el **desenlace impreso** en la ficha del que negocia contra él. Un Dani que lee su propia
pantalla sabe, antes de abrir la boca, que va a perder el lunes por la mañana; y lo sabe **por
escrito**, no porque Cris se lo haya defendido.

Y con él viaja el segundo trozo: `the lease, and the day it has to carry the two names`. El contrato
**no estaba en el cierre viejo**. Es la tercera cosa del `Only you know` de Cris («Dani does not know
three things yet: … and the lease») y todo el diseño de B es soltarlo el último («One thing per turn,
and the lease last. Say it early and it sounds like payment for the visit»). El cierre nuevo le dice
a Dani que existe, que tiene fecha y que va a llevar dos firmas. Que el vocabulario de A ya traiga
`the lease` como palabra **de recepción** («their word, not yours — and the cue to change the
subject») no lo tapa: una cosa es saber que va a oír la palabra y otra es leer que la cosa aterriza
con día.

**Por qué es del cierre nuevo y no de la carga en sí.** El reparto está bien hecho: tres y tres,
nadie dice las del otro, y las cuatro reglas cierran el asentimiento. Lo que falla es **dónde se
imprime la rejilla**, no que exista.

**Arreglo, en palabras iguales o menos (coste de presupuesto: 0).** Partir el bloque por pantalla.
Cada uno ve **sus** tres; la rejilla completa se lee después, en el `After`, que ya es común y ya se
lee acabada la partida:

| hoy | propuesto | palabras |
|---|---|---|
| `**Only Dani can say:**` | `**Dani's screen · your three:**` | 4 → 4 |
| `**Only Cris can say:**` | `**Cris's screen · your three:**` | 4 → 4 |

Todo lo demás del bloque —la frase marco, `Together, once`, las cuatro reglas y `Six lines, or it
isn't closed. The one that gets skipped is Cris's third.`— **se queda igual y se imprime en las dos
pantallas**: sin contenido, `the one that gets skipped is Cris's third` es exactamente el gancho que
hace que Dani las **exija** en vez de leerlas. Y en el pendiente de renderizado (l. 457) hay que
cambiar una línea: donde dice que el bloque se imprime entero en las dos, que diga **que cada
pantalla imprime sus tres, las reglas y el `Together`, y nunca las tres del otro**.

---

## 3 · DEFECTO 2 (estructural, tabla de B) · la cola de `Say it here` de Cris es su final de partida

**Sitio:** ROLE B, `### Say it here`, **filas 8 y 9** (ll. 202-203). La fila 9 lleva **la forma que
alargó la pasada de carga hoy** (cambio 4).

**Líneas literales, en el orden en que están:**

```
| yes, with a condition | `If…, I'm OK with it.` | a yes with a day and an hour inside it |
| your Monday morning | `I need the living room on…, from… to…` · `I'll finish at…` | you book your hours with a day and two times, and you close them with the last one |
```

**Qué pasa.** Leídas de arriba abajo y dichas, esas dos filas son: **concedo con condición → reservo
la franja con día y dos horas → la cierro con la última**. Es el final de partida de Cris entero, en
orden, sin nada intercalado, y **cerrando la tabla**. Es la forma exacta del defecto que abrió esta
lente en el escenario 3 («la cola de la tabla es el cierre»), con un agravante que es de hoy: la
fila 9 **es**, por sí sola, la primera de las tres líneas del cierre de Cris —la que la pasada de
carga escribió precisamente para que Cris no pudiera ganarla asintiendo—. La ficha protege esa línea
en el cierre y la regala en la última fila de la tabla.

Que sean **dos** filas y no tres es lo único que lo mantiene por debajo del defecto grave del
escenario 3. Lo que lo empuja por encima del «al filo» es que (a) termina la tabla, (b) el orden no
es reversible —la condición precede a la reserva de forma natural— y (c) la fila 9 tiene **secuencia
interna**: reservar y después cerrar con la última hora.

**El alfabético no se toca: se tocan las etiquetas.** Dos renombres, cero prosa, cero presupuesto:

| hoy | propuesto | palabras | fila hoy → fila luego |
|---|---|---|---|
| `your Monday morning` | `booking the table` | 3 → 3 | 9 → **2** |
| `yes, with a condition` | `granting it` | 4 → **2** | 8 → **3** |

Orden resultante (alfabético estricto, comprobado): *a third door · booking the table · granting it ·
leaving something for later · saying yes to the cousin · taking it back · the lease, last · the
reason, if they ask · what you still don't know.*

Con eso: las tres piezas del cierre de Cris quedan en las filas **2, 4 y 7** (línea 1, línea 3, línea
2 — desordenadas y no contiguas), el otorgamiento queda **en mitad de la tabla** y **la cola termina
en las preguntas de recepción de sus primeros turnos** (`How many nights?` · `What's he going to do
all day?`), que es el remedio que ya se aplicó en el molde. La pareja 1-2 que queda arriba (`Can we
do it another way?` + `I need the living room on…, from… to…`) es la misma clase de par «al filo» que
la fase 12 aceptó en el rol A del molde: no es el arranque —B no abre, el bloque 1 no es suyo hoy— y
no es el cierre.

**Efecto colateral a arreglar en el mismo gesto (también fuera de la cuenta de prosa):** la tabla de
la `## Pasada de carga`, filas 3 y 4, cita las etiquetas `one at a time` y `putting yours down`, que
ya eran falsas antes de hoy (`fase12-tablas.md` §5 lo dejó anotado) y que con este renombre lo son
por segunda vez. Deben decir `the lease, last` y `booking the table`.

---

## 4 · La única línea decible · la fila `Why` de la carta

**Sitio:** `## The card — Role B's screen only`, l. 220.

**Línea literal:**

```
> | Why | she wants to be here on Monday |
```

**Se dice tal cual y el turno avanza.** «She wants to be here on Monday.» Es tercera persona **sobre
alguien que no juega** —la mamá—, así que **no se invierte al decirse**: no hay ningún `you` que
cambie de dueño, ningún nombre que delate quién habla. Y es justo el dato que produce el turno: es
la razón que convierte la carta en obligación y no en dato, que es lo que `fase12-carga.md` §0 dice
que es lo único que un jugador callado no puede despachar en telegrama. Dicha después de «My mom's
ticket changed», entra entera y sin tocarle una palabra.

**Medido, no a ojo:** de las 23 filas de datos y carta del documento (10 + 10 + 3), **esta es la
única celda con sujeto + verbo conjugado formando oración independiente**. Las otras 22 son notas sin
verbo finito. Es un caso aislado, no un patrón: por eso se arregla en una celda.

**La pasada anterior la dio por buena, y se equivocó.** `fase10-calcable-6.md` §2 la despacha con
«la fila nueva de la carta es nota en tercera persona sobre la mamá». Ser tercera persona no la
salva: **la salvaría ser sobre el otro jugador**. Sobre un tercero, la tercera persona es
precisamente lo que la hace decible.

**Arreglo, en palabras menos:**

| hoy | propuesto | palabras |
|---|---|---|
| `she wants to be here on Monday` | `to be here on Monday` | 7 → **5** |

El infinitivo contesta al `Why` igual de bien, mantiene el dato entero y **no es una oración**: para
decirlo hay que construirlo («She changed it to be here on Monday»), que es exactamente el trabajo
que la ficha le debe pedir a Cris. Coste de presupuesto: 0 (la carta está fuera del contador, y
además es fila de tabla).

---

## 5 · Al filo, señaladas y **no** contadas

| dónde | literal | por qué no cuenta |
|---|---|---|
| cierre, l. 238 | `— Sunday the 23rd, in the kitchen, after lunch.` | la cola sí se dice tal cual, pero es **dato puro** y la misma fila está en las **dos** tablas de `Facts` («Sunday the 23rd \| kitchen, after lunch»). La cabeza de la unidad (`what you did not decide today, and when you talk about it`) sí se invierte (`you`→`we`). **No es nuevo:** venía idéntica del punto 3 del cierre viejo. Aviso: si alguien vuelve a tocar la tercera línea de Cris, que se caiga la cola |
| cierre, l. 245 | `*So, we're clear then*` | forma decible citada literal en pantalla común. No cuenta porque la propia regla dice que **no es una de las seis líneas** y comprobar no hace avanzar el turno. Es además la forma que los pendientes señalan como la que evita la última fuga al español |
| cierre, l. 246 | `*Yeah*, *sure*, *okay*, *fine* and *that works*` | cinco formas decibles citadas literales, pero **prohibidas** por la misma regla: decirlas no avanza nada, que es el sentido del cambio 2 de la carga |
| A · `You can't` 3, l. 78 | `She said no.` | oración independiente, decible, y cierra una salida. La salva que el antecedente (`your other aunt in Floridablanca`) vive en la oración anterior de **la misma unidad**, y esa sí se invierte (`You asked`→`I asked`). Distinta de la fila `Why` de la carta, que es **una celda completa por sí sola** |
| A · `If you walk away`, l. 85 | `he already has the ticket` | decible y mata el «¿y si viene otro día?», pero va entre guiones dentro de `You still have Iván on a bus…`, que se invierte |
| carta, l. 223 | `New day: Thursday the 20th, same day as Iván.` | fragmento sin verbo finito; `New day:` no se pronuncia |
| A · `You did it if`, l. 133 | `breakfast tomorrow still works` | cuatro palabras, decibles y fáticas: no mueven ninguna de las seis líneas. Mismo trato que `That is the plan.` en el molde |
| A y B · `Where you are`, ll. 71 y 142 | `It is Tuesday, August 18, 8:20 p.m.` | decir la hora no hace avanzar ningún turno. Heredado del molde, donde fase 12 mandó fundirla con la siguiente. Aquí van **las dos** sueltas |

---

## 6 · Las dos tablas `Say it here`, prueba por prueba

| prueba (§11 / fase 12) | ROLE A · Dani | ROLE B · Cris |
|---|---|---|
| (b) agrupada por función, una función por fila | sí, 8 funciones | sí, 9 funciones |
| (b) alfabética por función | **sí**, verificado carácter a carácter | **sí** |
| (c) filas ≤ turnos (9 por rol) | 8 ≤ 9 | **9 = 9** — al límite: una fila por turno |
| §11, rango 6-9 | 8 | 9 |
| (d) `what it does here` en notas, no en líneas decibles | 8/8 limpias (segunda persona sobre el jugador, se rompen al decirse) | 9/9 limpias |
| `form` en troncos o fórmulas sin dato | 12/12 | 11/11 |
| ninguna celda nombra «el punto N del cierre» | ✓ | ✓ |
| (a/e) **¿alguna carrera de filas es el arranque o el cierre?** | **no** | **sí — filas 8-9. Defecto 2** |

**ROLE A, por qué pasa (a):** la noticia con la que Dani abre —`the news itself`, `He's coming on…` ·
`He's going to sleep…`— es la **última** fila de la tabla; sus tres líneas de cierre caen en las
filas 8, 1 y 7, y la única pareja contigua (7-8) da **cierre-3 y después arranque**, o sea al revés.
Una tabla que empieza por la salida de emergencia (`a second bed`) y termina por la primera frase de
la conversación no es un guion.

Dos cosas menores de la tabla de A, anotadas y no contadas: `He's coming on…` aparece en las filas 7
y 8 (en el mensaje a la tía y en la noticia), lo cual es coherente pero repite forma; y el
marcador de hueco `[what]` de `Let's leave [what] for…` convive con los `…` del resto —está en las
dos fichas, es cuestión de molde, no de este escenario.

---

## 7 · Fuera de la lente (no es calcabilidad, pero se ve desde aquí)

1. **Cifras muertas dentro del propio archivo.** La `## Pasada de carga` declara «Prosa después:
   **A 444 · B 448**, sin cambios» (l. 521) y el `## Recorte de prosa` explica tres líneas más abajo
   que esas cifras estaban desfasadas y que lo real era 451/455. La tabla de la `## Cuenta de prosa`
   sí está bien (449/449, coincide con el script) y también los 8 y 9 exponentes. Conviene tachar la
   línea del 444/448 o marcarla como histórica: es el mismo mecanismo —cifras declaradas a mano— que
   obligó a escribir el contador único.
2. **`Only you know` 3 de B, l. 154, antecedente flotante:** `You have three reasons for the living
   room… You know two things about that window`. El sustantivo más cercano a `that window` es `the
   living room`, cuyo `Facts` dice literalmente `the only good light and good signal`. La ventana de
   la que habla es la del **cuarto** de Cris, y no se nombra en ninguna parte de la ficha. Viene de
   la fusión de dos oraciones en la pasada quirúrgica (cambio 11) y no lo introdujo hoy nadie.
3. **Citas de `grammarReferences` que ya no existen literales:** `"I'll finish at eleven"` y
   `The wifi drops next to the window.` son troncos desde `fase12-tablas.md`. Anotado allí, sigue
   pendiente, no afecta a nada decible.

---

## Qué se devuelve a `habla-fichas-de-rol`

Tres cambios, **todos fuera de la cuenta de prosa** (449/449 no se mueve), y ninguno toca el motor,
los datos, el desenlace ni el reparto tres-y-tres de la carga:

1. **Cierre, ll. 233 y 236** — `**Only Dani can say:**` → `**Dani's screen · your three:**` y
   `**Only Cris can say:**` → `**Cris's screen · your three:**`, con una línea del pendiente de
   renderizado (l. 457) diciendo que cada pantalla imprime **sus** tres. 4→4 palabras.
2. **Tabla de B, ll. 202-203** — `yes, with a condition` → `granting it` (4→2) y
   `your Monday morning` → `booking the table` (3→3). Y las dos celdas de la tabla de la
   `## Pasada de carga` que las citan.
3. **Carta, l. 220** — `she wants to be here on Monday` → `to be here on Monday`. 7→5 palabras.

Con los tres, el escenario 6 queda en **0 decibles sobre 162 unidades** y sus dos tablas dejan de ser
guion.
