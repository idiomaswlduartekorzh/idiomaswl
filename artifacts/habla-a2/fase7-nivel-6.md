# Escenario 6 · `the-cousin-on-the-sofa` — auditoría de NIVEL, segunda ronda

Auditado: `artifacts/habla-a2/fase7-fichas-6-the-cousin-on-the-sofa.md`, versión del 20 ago 2026,
segunda ronda, la que declara aplicados los 66 hallazgos de las cuatro auditorías de fase 7.
La ronda 1 de esta misma auditoría queda archivada en `fase7-nivel-6-ronda1.md`.

Contra: §2, §4 y §11 del blueprint, el molde `fase7-modelo-ficha-en.md`, la caja
`caja-de-herramientas-a2.md`, y `src/data/grammar/registry.ts` →
`src/data/grammar/ingles/{a1,a2}`, leyendo el campo `slug` y el campo `title` de cada archivo.

Como la ficha está entera en inglés se auditan **dos niveles**: el que hay que **decir**
(A2 hablado, con lista de prohibidas) y el que hay que **leer** (A2 leído, que aguanta más).
Y las 19 definiciones de vocabulario, una a una.

> **Veredicto: PASA CON CAMBIOS.**
>
> El lado hablado está limpio: **cero estructuras prohibidas**, verificado por patrón sobre el
> archivo entero, no a ojo. Las **19 definiciones definen hacia abajo las 19** — ninguna se apoya
> en una palabra más difícil que la que define. Los **10 `grammarReferences` resuelven los 10**,
> con el título exacto carácter por carácter y el sufijo `-a2` bien puesto en los cinco que lo
> llevan y bien ausente en los cinco que no.
>
> Lo que falla se concentra en tres sitios, y los tres son locales y baratos: **el presupuesto de
> prosa no está medido y la ficha de B se pasa**, **una celda de vocabulario de A está rota**, y
> **el rationale de preposiciones cita un `at` que no está escrito en ninguna parte de la ficha**.
>
> 3 graves · 7 medios · 12 leves.

---

## 0. Lo que pasa limpio (y conviene no romper)

**Estructuras prohibidas: cero.** Buscadas por patrón sobre el archivo entero:

| prohibida | ocurrencias en la ficha |
|---|---|
| present perfect de duración con `for` / `since` | **0** |
| `could` de cortesía | **0** |
| `would` / `would rather` / `would prefer` | **0** — ni una vez en todo el archivo |
| modal + infinitivo perfecto | **0** |
| condicional hipotético (2.º condicional) | **0** |
| `may` / `might` | **0** |
| pregunta incrustada de tipo `do you know where…` | **0** en el lado hablado |
| pasiva plena (`be` + participio + agente) | **0** en el lado hablado · **1** en metalengua (L6, §2 M6) |

El único `should have` del documento vive en la línea 364, dentro de la sección en español de
pendientes, y está citado **precisamente para decir que hay que bajarlo de nivel**. Correcto,
igual que en la ronda 1.

**Las 19 definiciones de vocabulario definen hacia abajo, las 19.** Comprobadas una a una contra
la palabra que definen. Ninguna usa una palabra más difícil que la entrada, ninguna es traducción
disfrazada, ninguna se apoya en phrasal opaco. Cuatro son modélicas:

- `to drop` → *(about the wifi)* to stop for a moment and then come back — desambiguar la acepción
  entre paréntesis **antes** de definir sigue siendo lo mejor de la ficha, y lo sigue sin hacer
  ninguna otra del conjunto.
- `the lease` → the paper that says you can live in this apartment — define un concepto legal con
  seis palabras A1 y un relativo. No hay forma más barata de decirlo.
- `to put someone up (put him up)` → to let someone sleep in your home for a few days — el trozo
  fijo, entero y con el pronombre ya dentro.
- `to unload` → to take boxes out of a truck — y `truck`, no `lorry`.

**Reparto correcto entre lo que se dice y lo que se oye.** `to unload` vive solo en la lista de B,
que es quien la produce; A la recibe y su línea de toolkit le manda preguntarla con el bloque 3.
Eso es exactamente lo que el escenario 2 no hacía.

**Los 10 `grammarReferences` existen los 10.** Comprobado leyendo `slug` en los archivos:

| slug declarado | nivel | archivo | título en el archivo | ¿coincide? |
|---|---|---|---|---|
| `present-continuous-future-a2` | a2 | `a2/present-continuous-future.ts` | Present Continuous para el futuro en Inglés A2: planes concretos | ✔ |
| `first-conditional` | a2 | `a2/first-conditional.ts` | El Primer Condicional en Inglés A2 | ✔ |
| `will-future` | a2 | `a2/will-future.ts` | El Futuro con Will en Inglés A2 | ✔ |
| `quantifiers` | a2 | `a2/quantifiers.ts` | Cuantificadores en Inglés A2 | ✔ |
| `connectors-a2` | a2 | `a2/connectors.ts` | Conectores en Inglés A2: because, so, although, however, but | ✔ |
| `going-to` | a1 | `a1/going-to.ts` | Going to en inglés A1 | ✔ |
| `there-is-there-are` | a1 | `a1/there-is-there-are.ts` | There is / There are en inglés A1 | ✔ |
| `prepositions-time` | a1 | `a1/prepositions-time.ts` | Preposiciones de tiempo en inglés A1 | ✔ |
| `imperative` | a1 | `a1/imperative.ts` | El imperativo en inglés A1 | ✔ |
| `can-ability` | a1 | `a1/can-ability.ts` | Can para habilidad en inglés A1 | ✔ |

El sufijo está bien manejado en los dos sentidos: los cinco de A2 que lo necesitan lo llevan
(`present-continuous-future-a2`, `connectors-a2`) o no existen con él (`first-conditional`,
`will-future`, `quantifiers` están así, sin sufijo, en el A2). Ninguno de los diez devuelve null.

**Variedad americana: sostenida.** `couch`, `apartment`, `mom`, `vacation`, `truck`, `p.m.`
Ni un `sofa`, `flat`, `mum`, `holiday` ni `lorry` en toda la ficha.

**Neutralidad de género: se cumple.** Ni una concordancia sobre Dani ni sobre Cris en ninguna de
las dos fichas, la carta ni el cierre. Los terceros —Iván, la tía, Nelson, la mamá— llevan género
y ninguno es jugable. La ficha lo declara y es verdad.

**Ordinales dichos: bien resuelto donde importa más.** El único ordinal escrito en letra
—`Thursday the twentieth`— está en la tabla de exponentes, que es la que se lee para decirla.
En la tabla de datos van en cifra, que es lo correcto. Que quede un sitio sin resolver es M5.

---

## 1. GRAVE — tres

### G1 · El presupuesto de prosa no está medido: la tabla lleva `PROSA_A` y `PROSA_B` sin sustituir, y al medirla, B se pasa del tope

> Líneas 263-264:
> `| **ROLE A — Dani** | **PROSA_A** | 350 | …`
> `| **ROLE B — Cris** | **PROSA_B** | 350 | …`

La ficha dedica catorce líneas (255-259) a fijar una regla de conteo reproducible, la declara «la
primera cuenta del conjunto que se puede auditar sin discutirla»… y después no la corre. Los dos
marcadores llegaron a la versión final sin sustituir. En la versión anterior del archivo esa misma
tabla decía **347** y **348**.

La corrí yo, con la regla que la propia ficha declara —desde `## ROLE X` hasta el final de «You did
it if», descontando filas de tabla y encabezados `###`, contando la cita de registro y el bloque de
toolkit, palabra = token separado por espacios con al menos una letra—:

| ficha | contando la línea `## ROLE X` | sin contarla | tope |
|---|---|---|---|
| ROLE A — Dani | **352** | 346 | 350 |
| ROLE B — Cris | **365** | 359 | 350 |

**B se pasa por los dos caminos**: +15 o +9. A se pasa por uno y no por el otro. Y aquí sale un
segundo problema, más pequeño pero que vuelve cada ronda: **la regla no dice si la línea `## ROLE X`
cuenta**, y son 6 palabras de diferencia — justo las que deciden si A cumple. Esa frase hay que
escribirla («no se cuenta el encabezado `##`»), y va con el pendiente de §11 que la ficha ya tiene
abierto.

**Arreglo.** Medir, escribir los dos números, y quitarle a B unas veinte palabras. Las tres más
baratas no cuestan contenido porque ya están dichas en otro sitio:

1. **Línea 118**, `One per turn — and the lease last.` (7 palabras) repite literalmente la línea
   115, `One thing per turn. The lease last…`, que está tres líneas más arriba en la misma
   pantalla. Fuera. **−7**
2. **Línea 158**, el inciso `(they stop you in your own kitchen — your form for that is the first
   row of your table)` (18) → `(no form here fits: yours is your table, first row)` (10). **−8**
   (y arregla parte de M7)
3. **Líneas 32 y 105**, `No boss here, no door out.` → `No boss here.` **−3 en cada ficha** (y
   arregla M2)

Total: **B −18 → 347**, **A −3 → 349**. Los dos por debajo del tope contando el encabezado, que es
la lectura estricta. Ojo: G3 devuelve **+2** a B (los dos `at`), así que el margen real de B queda
en 349, no en 347. Sigue cumpliendo, pero sin sitio para nada más.

### G2 · La celda `here` de `the lease` en la ficha de A no se puede leer

> Línea 76: `| the lease | the paper that says you can live in this apartment | their word — you'll hear it, and then the subject changed |`

`and then the subject changed` está en pasado, no tiene sujeto que lo sostenga en la línea, y el
lector no puede decidir entre tres lecturas distintas: que B cambia de tema, que A tiene que
cambiarlo, o que el tema fue cambiado. Es la única de las 19 celdas de vocabulario que no se
entiende, y le toca a la palabra que decide el final de B.

Viene de la ronda de correcciones: el hallazgo 42 mandaba marcar las tres palabras de recepción
como recepción, y esta se quedó a medias.

**Arreglo**, en A2 limpio, sin adelantar la estrategia de B y sin contradecir la línea de toolkit
de A (que solo manda preguntar por *unload*):

> `their word — you'll hear it, not say it`

### G3 · `prepositions-time` promete un `at` que no está escrito, y las dos veces que la ficha dice esa hora, lo quita

> Líneas 242-243: `rationale: 'El reparto se dice con on/at: "on Thursday the twentieth", "at nine in the morning".'`

`on Thursday the twentieth` sí existe (línea 87). **`at nine in the morning` no existe.** La ficha
dice `nine in the morning` dos veces —línea 123 y línea 155— y las dos veces **sin la
preposición**. O sea: la única referencia gramatical cuyo asunto entero es la preposición está
anclada a una cita inventada, y la página modela justo la omisión que el tema corrige.

No es solo un error de nota interna. Aunque el `rationale` sea editorial —en la implementación de
escritura solo se renderizan `slug` y `title`—, **lo que sí llega al estudiante es la página sin el
`at`**, debajo de un enlace que dice «Preposiciones de tiempo».

**Arreglo**, las dos cosas:

1. Escribir la preposición en los dos sitios: línea 123 y línea 155, `nine in the morning` →
   **`at nine in the morning`**. Cuesta 2 palabras en la ficha de B, que G1 ya deja con margen.
2. Corregir el rationale para que cite lo que hay: `"on Thursday the twentieth"`, `"at nine in the
   morning"` (ya escrito) y `"I'll finish at eleven."`, que es el `at` que sí estaba y que el
   rationale no menciona.

Y la promesa del `by` sí se cumple: el único `by` de tiempo se corrigió a `before 7:00 a.m.`
(línea 133) y los dos `by` que quedan son locativos (`by the window`, líneas 123 y 154). Esa mitad
del rationale es verdad.

---

## 2. MEDIO — siete

### M1 · Lo que B lee se apoya cuatro veces en metáfora de B1/B2, y las cuatro están en las primeras líneas

| línea | lo que dice | por qué no es A2 leído | propuesta |
|---|---|---|---|
| 115 | `Early, it reads as payment for the visit.` | `to read as` = «dar la impresión de» es uso figurado B2. Un A2 lee «leer». | `Early, it sounds like payment for the visit.` |
| 122 | `Dani's picture of you: working in your room.` | `picture` = imagen mental es B1+. Un A2 lee «foto». | `What Dani thinks: you work in your room.` |
| 125 | `two weeks of apartment hunting` | `hunting` = buscar casa es idioma fijo B1. Un A2 lee «cazar». | `two weeks looking for another apartment` |
| 148 | `already in the house — yours to propose too` | `yours to + infinitivo` es una construcción B2. | `already in the house — you can offer it too` |

La de 125 además **se contradice con su propia tabla de datos**: la fila de la línea 139 ya lo dice
en A2 correcto —`two weeks to find another apartment, the two of you`—. La prosa dice lo mismo
peor, doce líneas más arriba.

### M2 · `no door out` es un idioma inventado, está en la primerísima línea que se lee, y es el único escenario que lo usa

> Líneas 32 y 105: `**Informal.** Eight months sharing this apartment. Breakfast here tomorrow. No boss here, no door out.`

Medido sobre los siete escenarios y el molde: **`no door out` aparece 2 veces, las dos aquí, y 0
veces en los otros seis y en `fase7-modelo-ficha-en.md`**. Las demás líneas de registro describen
en llano («Same rank, same shifts, you see each other every day», «A counter, two strangers»).

`no door out` no es inglés que un A2 pueda decodificar, y no hace falta: **`Breakfast here
tomorrow` ya dice que nadie se escapa**, y lo dice mejor.

**Arreglo:** borrar `, no door out` en las dos líneas. Es la propuesta 3 de G1 y paga 3 palabras
de presupuesto en cada ficha.

### M3 · Cinco construcciones sin sujeto ni verbo finito que cargan el sentido de la línea

El molde autoriza el absoluto corto de etiqueta (`ticket paid` en el modelo, `ticket bought`,
`living room taken`, `video call gone` aquí). Eso se queda. Estas cinco pasan de ahí: **no
etiquetan, dicen la línea entera**, y un A2 no las desmonta.

| línea | lo que dice | propuesta |
|---|---|---|
| 45 | `Sunday: the yes to your aunt, already given.` | `Sunday · your answer to your aunt: yes.` |
| 46 | `The nights to let go: the last ones, never the first.` | `Nights you can give back: the last ones · never the first.` |
| 113 | `Sounds like an excuse.` (sin sujeto: ¿qué suena a excusa?) | `Your room · sounds like an excuse.` |
| 195 | `Your plan, now dead: nights cut, out before the 29th.` | `Your old plan is gone: fewer nights, and everyone out before the 29th.` |
| 208 | `One word corrected, and you did not agree on the same thing.` | `If Cris corrects one word, you did not agree on the same thing.` |

La 45 es además un participio pasivo encubierto (`already given`), y la 46 mete un relativo
reducido encima de un phrasal figurado (`to let go` = renunciar). Las dos están en la parte de la
ficha que A lee justo antes de abrir la boca.

### M4 · El exponente más largo de A dice el futuro con presente simple en el verbo principal — lo que la ronda 1 corrigió por dentro y dejó por fuera

> Línea 95: `So I tell her he's coming on Thursday and he's sleeping…, right?`

La ronda 1 (G1 de aquel informe) tumbó `he arrives Thursday, and he sleeps…`. La corrección puso
los dos verbos internos en presente continuo, que es lo correcto y lo que el rationale de
`present-continuous-future-a2` necesita. Pero **el verbo matriz sigue siendo presente simple con
sentido de futuro** (`I tell her` = «le digo»), y es el primero que el estudiante pronuncia.

Y aparte del tiempo: son **14 palabras, con una oración de estilo indirecto, un hueco en medio y un
tag al final**. Es el exponente más largo de las dos fichas. Sostener eso en A2 hablado no es
realista.

**Arreglo:** quitar el marco de estilo indirecto y dejar el mensaje en directo, que es como se
comprueba un recado de verdad.

> `So: he's coming on Thursday, and he's sleeping…, right?`

Conserva los dos presentes continuos que el rationale reclama, quita el presente simple de futuro,
quita la subordinada y ahorra 3 palabras.

### M5 · El cierre es el único sitio donde los dos tienen que decir fechas en voz alta, y da 30 ordinales en cifra y uno en letra

Contados sobre el cuerpo de la ficha: **30 ordinales en cifra** (`the 20th`, `the 21st`, `the
24th`, `the 23rd`, `the 26th`, `24th–30th`) y **un solo ordinal de fecha escrito en letra**,
`the twentieth`, en un exponente de A.

Los tres puntos del cierre (líneas 203-205) obligan a los dos a decir en voz alta `Thursday the
20th`, `Monday the 24th` y `Sunday the 23rd`. Un A2 hispanohablante no produce *the twenty-fourth*
mirando `the 24th`: dice *the twenty-four*, y esa es exactamente la fuga que el ejercicio quiere
cerrar. La ficha enseña a repartir días y no enseña a decirlos.

**Arreglo**, y es gratis para el presupuesto porque el bloque de cierre queda fuera de la cuenta
por rol: poner la forma dicha una vez, en cursiva, en los tres puntos.

> 1. **Where Iván sleeps on Thursday the 20th (*the twentieth*)**, …
> 2. **Who has the living room on Monday the 24th (*the twenty-fourth*)** — …
> 3. … Sunday the 23rd (*the twenty-third*), in the kitchen, after lunch.

### M6 · La metalengua de la carta: la única pasiva del documento y un `once` conjuntivo, en la pantalla que se abre a mitad de partida

> Línea 182: `**Its own screen, behind a button. It is never printed under the exponents.**`
> Línea 183: `**Or earlier, but only once your first two things are already on the table…**`

- `It is never printed` es **la única pasiva plena de todo el archivo**, y es una instrucción. Si
  es nota de implementación, va en español como el resto de la metalengua; si es para el
  estudiante, va en activa: `Never print it under the exponents.`
- `once` con valor de «cuando ya» es B1. → `but only after your first two things are on the table`.

Y de paso, una contradicción que el nivel destapa al leerlas seguidas: la **línea 183 autoriza**
abrir la carta antes («Or earlier, but only once…») y la **línea 195 lo prohíbe** («Don't open this
card early»). Una de las dos sobra.

### M7 · La línea de toolkit de B es una sola oración de 42 palabras, con seis guiones, dos incisos y una referencia cruzada

> Línea 158: `Blocks **1** (they stop you in your own kitchen — your form for that is the first row of your table), **2**, **3** [receives], **4** [jargon] — *lease*, *drop*, *unload* are your words, not theirs — **5**, **6** — only for the living room, and only until they ask you directly — **7** [grants], **8**.`

42 palabras medidas. La de A son 31 y ya está en el límite. Además de la longitud, el inciso manda
al lector a **otra tabla que todavía no ha leído** («the first row of your table») antes de
terminar la frase: eso es una carga de memoria de trabajo que un A2 no tiene libre mientras
prepara un rol.

**Arreglo:** partir en dos y acortar el inciso.

> Blocks **1**, **2**, **3** `[receives]`, **4** `[jargon]` — *lease*, *drop*, *unload* are your
> words, not theirs — **5**, **6**, **7** `[grants]`, **8**.
> Block **1** has no form for this — yours is your table, first row. Block **6**: only for the
> living room, and only until they ask you directly.

Dice lo mismo, pero ninguna de las tres oraciones pasa de 25 palabras y la referencia cruzada deja
de estar dentro de otra frase. No ahorra presupuesto —queda casi igual de larga—, así que si el
tope aprieta, hay que aplicar además el corte de una línea de G1 (**−8**).

---

## 3. LEVE — doce

**L1 · `a cousin` gasta una fila de vocabulario en una palabra A1.** Las palabras de familia son
A1 y `cousin` es una de ellas; la definición (`your aunt's or your uncle's child`) es más larga que
la entrada y no aporta. No hay que quitarla ahora —la lista de A tiene 9 filas a propósito, como
reserva—, pero cuando una ronda futura necesite sitio, **esta es la fila que sale, no `to drop`**.

**L2 · `the ask` (línea 70) es jerga de oficina.** `the ask, in three words` → `what you want, in
three words`.

**L3 · `assume` es falso amigo (línea 149).** `Ask, don't assume` — el *asumir* español no
significa suponer. → `Ask, don't guess.` (`guess` es A2 y está en el registro).

**L4 · Cuatro items B1 en celdas `here`.** Ninguno bloquea por sí solo; van juntos para que la
próxima pasada los tenga en un sitio.

| línea | ahora | propuesta |
|---|---|---|
| 146 | `what they are about to ask you for` | `what they want from you tonight` |
| 74 | `Iván, from Friday on` | `Iván, every day from Friday` |
| 152 | `the last one you bring out` | `the last one you say` |
| 73 | `your second way out` | `your second option` |

**L5 · `wherever` (línea 49) es B1, y aquí va elíptico.** `bed: wherever, nothing agreed` →
`bed: no place, nothing agreed`.

**L6 · `It's already done.` (línea 89) es pasiva estativa y `already` con presente simple.**
Está lexicalizado y suena bien; **yo lo dejaría**, y lo anoto para que la próxima auditoría no lo
vuelva a abrir. Si algún día tiene que caer, el reemplazo A2 limpio es `I can't change it now.`

**L7 · El rationale de `will-future` dice «Solo hay un will escrito» y no es literalmente cierto.**
Hay tres `'ll` en la ficha: el exponente `I'll finish at eleven.` (línea 140) y dos `you'll hear
it` en celdas de vocabulario (líneas 76 y 150). La afirmación vale para los exponentes; que lo
diga: «solo hay un will **decible**».

**L8 · `can-ability`: ninguno de los dos ejemplos es `can` de habilidad.** `He can sleep…` es
posibilidad y `Can we do it another way?` es petición. El enlace está bien —es el único sitio del
A1 donde vive `can`—, pero el rationale debería decir eso en vez de dar por hecho que son
habilidad.

**L9 · El rationale de `imperative` dice «tres veces» y enumera cuatro.** Dos de la ficha
(`Wait — when?`, `Let's leave [what] for Sunday.`) y dos de la caja (`Hold on.`, `Let me say that
again.`). Cambiar el número o separar las de la caja.

**L10 · Mezcla de tiempos en la línea 211.** `If you skip it, the game did not finish.` — presente
en la condición, pasado en la principal, y sujeto inanimado que «no termina». →
`If you skip it, you did not finish the game.`

**L11 · `a room again before 7:00 a.m.` (línea 133).** Es una habitación siempre; lo que tiene que
volver a ser es la **sala**. → `a living room again before 7:00 a.m.`

**L12 · Dos interrogativas incrustadas en el lado leído, que es lo que el lado hablado prohíbe.**
No es infracción —la prohibición es de producción— pero es el modelo que el estudiante copia:

- Línea 58: `something important — and you can't say what it is` → `something important · you can't
  say what.`
- Línea 203: `and who sleeps where that night` (doble wh) → `and where the two of you sleep that
  night.`

---

## 4. Presupuesto de §11 — lo medido

| ficha | prosa medida | tope | datos | vocabulario | exponentes |
|---|---|---|---|---|---|
| ROLE A — Dani | **352** ✗ (346 sin el `##`) | 350 | 10 filas ✔ (≤10) | 9 ✔ (8-10) | 10 ✔ (6-10) |
| ROLE B — Cris | **365** ✗ | 350 | 10 filas ✔ (≤10) | 10 ✔ (8-10) | 10 ✔ (6-10) |

Datos, vocabulario y exponentes: contados fila a fila, los seis cumplen. La prosa es lo único que
se pasa, y G1 trae los cortes.

La rebaja del rango de exponentes a 6-10 que la ficha aplica es la de §2 y es correcta; el
pendiente de armonizar §11 con §2 sigue abierto y ya está escrito en el archivo.

---

## 5. Cómo aplicar esto sin romper lo que ya está bien

La propia ficha aprendió en la ronda pasada (hallazgo 27) que **calcabilidad se aplica la última**.
Este informe lo respeta: **ninguna de las propuestas de arriba es una oración que el jugador pueda
leer en voz alta y avanzar el turno**. Las de M3 y M1 están redactadas a propósito en forma de nota
(dos puntos, punto medio, sujeto nominal), no de frase. Las de M4 y G3 tocan la tabla de
exponentes, que es donde las frases decibles **deben** vivir.

Orden sugerido:

1. **G2** y **G3** — dos celdas y un rationale. Sin efecto sobre nada más.
2. **M1, M3, M6, L1-L12** — sustituciones locales.
3. **M2, M7** — pagan presupuesto.
4. **G1 al final**: recontar con la regla, escribir los dos números de verdad, y comprobar que
   siguen por debajo de 350 después de todo lo anterior.
5. Releer `fase7-calcable-6.md` sobre las líneas tocadas.

---

## 6. Lo que no es de esta ficha

Dos cosas que aparecieron midiendo y que no se arreglan aquí:

- **La regla de conteo no dice si el encabezado `## ROLE X` cuenta.** Son 6 palabras y deciden si A
  cumple o no. Va con el pendiente de §11 que la ficha ya tiene abierto (hallazgos 51/13 y 52).
- **`If you walk away with nothing` es del molde**, no de este escenario: aparece 2 veces en los
  siete fichas y 2 en `fase7-modelo-ficha-en.md`. `walk away with nothing` es idioma B1. Si alguna
  vez se baja de nivel, se baja en el molde y para los ocho a la vez — cambiarlo solo aquí
  desalinearía el conjunto.
