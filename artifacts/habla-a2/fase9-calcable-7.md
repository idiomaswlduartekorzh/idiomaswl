# Fase 9 · ¿Se puede leer en voz alta? — escenario 7, `two-more-people-for-the-trip`

**Auditado:** `artifacts/habla-a2/fase7-fichas-7-two-more-people-for-the-trip.md`, tal como está en
disco hoy (22 ago 2026), con la reescritura a prosa y el reparto de género ya aplicados. Los
informes viejos (`fase7-calcable-7.md`, `fase7-calcable-7-ronda1.md`) se leyeron solo para saber
qué se dijo antes: **ninguna de sus conclusiones se hereda**, y la del cierre («PASA CON CAMBIOS ·
5 decibles») ya no describe este texto, porque el texto cambió entero.

**Regla aplicada (§11, con las dos correcciones del 21 ago):**
- Tablas → notas, nunca frases. Columna `here` → nota de propósito: ni comillas, ni pronombre +
  verbo conjugado.
- Prosa → inglés A2 legible, oraciones cortas y completas, escritas **sobre** el jugador.
- Prueba única: *si la línea se puede decir tal cual y el turno avanza, está mal escrita.*
- Deixis: el `you` protege **solo** cuando el que escucha no puede sostener el predicado. Si al
  voltear el `you` la frase sigue siendo cierta y sigue siendo la jugada del hablante, no protege.

**Fuera de alcance por diseño:** las dos tablas `Say it here` (88-97 y 163-172) y el bloque
`After — both screens, in Spanish` (214-218). **Sí entran** la carta (179-200) y la pantalla
compartida (204-212), que son inglés en pantalla.

**Techo de prosa, contador canónico** (`node artifacts/habla-a2/fase7-scripts/prosa-canonica.mjs`,
corrido hoy): ROLE A **448**, ROLE B **443**, tope 450. Cumple. Las reescrituras de abajo suben
A en +15 y B en +8, así que **cada rol lleva su recorte compensatorio indicado** (A −19, B −3).

---

## Veredicto

**NO PASA · 9 líneas decibles sobre 142 unidades** (76 oraciones de prosa —40 de A, 36 de B— +
20 filas de datos + 21 filas de vocabulario + 16 unidades de la carta + 11 de la pantalla
compartida, con `You did it if` contado como una unidad por rol). Más **2 defectos de forma** en la
columna `here` de Kevin, que no son decibles pero incumplen §11 al pie de la letra.

Se cae por dos, la **A-3** y la **B-2**: entregan el dato oculto ya convertido en oración lista
para pronunciar —el carro de Hernán en el taller, los veinte minutos de Andrea—, que es
literalmente el fallo que §11 declara fatal. La **B-1** es peor de leer aunque sea menos grave de
diseño: es el objetivo entero de Kevin escrito como su primera frase.

**Reparto: ROLE A 4 · ROLE B 5 · la carta 0 · pantalla compartida 0 · tablas de datos 0.**

| sección | unidades | decibles |
|---|---|---|
| A · `You can't` | 8 | **2** |
| A · `Only you know` | 8 | **2** |
| B · `You want` | 2 | **1** |
| B · `And a reason you can repeat` | 3 | **1** |
| B · `You can't` | 6 | **1** |
| B · `Only you know` | 6 | **2** |
| Vocabulario, columna `here` (A 9 + B 10 + carta 2) | 21 | 0 (+ **2 de forma**, las dos en B) |
| Tablas `Facts` (A 10 + B 10) | 20 | 0 |
| La carta (5 filas + 2 vocabulario + 9 prosa) | 16 | 0 |
| Pantalla compartida `how it ends` | 11 | 0 |
| resto de prosa (cabeceras, situación, objetivo A, toolkit, criterios) | 41 | 0 |

**Los 9 decibles son prosa. Cero en tablas.** Las veinte celdas de datos siguen en nota, y **la
carta se reparó de verdad**: las tres filas que la ronda de fase 7 señaló (`she charges you`,
`she asks him first thing`, `you did not pay it yet`) ya no están, y sus sustitutas
(`charged to your reservation`, `her question to him early tomorrow · her call to you`) son
nominales. El fallo se ha mudado entero al sitio nuevo: **la prosa en oraciones**. Al pasar de
telegrama a oración, cada explicación de restricción y cada dato oculto volvió a tener sujeto y
verbo, y ahí es donde se puede leer.

**Patrón único, dicho una vez:** los 9 fallan por lo mismo — **el sujeto es un tercero ausente o
un hecho del mundo** (el portero, doña Nubia, Hernán, el mecánico, «the group», Sebastián y
Andrea), y ahí el `you` no está para proteger nada. Las 34 oraciones de prosa que empiezan por
`you` + verbo aguantan todas: al voltearlas salen falsas (Kevin no pagó los 600.000, Valentina no
tiene 200.000 ajenos en el bolsillo, ella no le dio el sexto puesto a nadie). **La regla operativa
para la reescritura es una: mete el hecho dentro de una cláusula subordinada colgada de un
predicado que el otro no pueda sostener.**

---

## Las 9, literal, con reescritura

### A-1 · ROLE A · `You can't` 2 · línea 43
> `Get anyone in without the list. The gate wants a name and an ID number, and only doña Nubia can change it.`

`The gate wants a name and an ID number, and only doña Nubia can change it.` Sujeto: la portería y
doña Nubia. Dicho a Kevin es cierto, es fluido y **es el rechazo con dato que la ficha le pide a
Valentina** — con la avería de que además delega el no en doña Nubia, contra su propio criterio de
éxito («el no fue tuyo, no de doña Nubia»).

**Reescritura (22 → 26 palabras):**
`Get anyone in without the list. Your reservation has six names and six ID numbers on it, and only doña Nubia changes what you wrote there.`
(*your reservation* y *what you wrote there* son falsos en boca de Kevin.)

### A-2 · ROLE A · `You can't` 3 · línea 44
> `Drop Hernán to make room. He and his car come together, and without him there are four seats less.`

Tercera persona sobre un ausente, cierta, y es el argumento con el que ella se niega. Se dice tal
cual y el turno avanza.

**Reescritura (19 → 23):**
`Drop Hernán to make room. You gave him the sixth place for his car, and taking it back costs you his four seats.`

### A-3 · GRAVE · ROLE A · `Only you know` · línea 47
> `Hernán left his car at the mechanic's at 6:00 p.m. with a strange noise. The mechanic calls back at 7:00 a.m.`

**El dato oculto, en dos oraciones que se dicen sin tocar una letra.** Las dos son ciertas dichas a
Kevin, las dos son noticia para él y las dos avanzan turno: la primera abre el problema del carro,
la segunda pone la hora del plan B que exige el punto 3 del cierre. Es el caso que §11 nombra como
fatal.

**Reescritura (21 → 28, cuenta A-3 y A-4 juntas):**
`At 6:00 p.m. you watched Hernán leave his car at the mechanic's with a strange noise, and you are the one waiting for his call at 7:00 a.m.`
(el hecho queda dentro del complemento de *you watched*, y *you are the one waiting* es falso en
boca de Kevin.)

### A-4 · ROLE A · `Only you know` · línea 47
> `The mechanic calls back at 7:00 a.m.`

Siete palabras, presente simple, cierta, y es la hora que el cierre pide en voz alta. Se repara en
la misma reescritura de A-3.

### B-1 · GRAVE de lectura · ROLE B · `You want` · línea 111
> `Sebastián and Andrea need a spot — both of them, or one.`

**El objetivo de Kevin escrito como la frase con la que abre.** Kevin arranca el escenario; esta es
la primera línea que su ojo encuentra y se dice tal cual a Valentina. Sin deixis, sin nada que
voltear.

**Reescritura (11 → 17):**
`You came down to get a spot for Sebastián and Andrea — both of them, or one.`

### B-2 · GRAVE · ROLE B · `And a reason you can repeat` · línea 113
> `You see Andrea here in 20 minutes.`

Aquí el `you` no protege: **Valentina también va a estar en el parqueadero**, así que volteada
sigue siendo cierta y sigue entregando lo que la línea 123 declara nuevo para ella («Andrea's
twenty minutes»). Dato oculto convertido en frase.

**Reescritura (7 → 7, sin coste):**
`Your twenty minutes with Andrea start now.`

### B-3 · ROLE B · `You can't` 3 · línea 118
> `Take them in yourself. The guard wants a name and an ID number, and without them nobody enters.`

Misma cadena que A-1, y aquí hace un daño extra: el toolkit de Kevin dice `3 [receives]:
reservations, ID numbers and gate lists are her words, not yours, so ask`. La ficha le manda
preguntar y tres líneas antes le regala la respuesta ya pronunciable. **Auditar la fila una vez y
darla por buena es el error: está en las dos fichas y hace daño distinto en cada una.**

**Reescritura (18 → 21):**
`Take them in yourself. Whatever the guard asks for at that gate, you have never seen the list, and Valentina has.`

### B-4 · ROLE B · `Only you know` · línea 122
> `On Tuesday the group was five people, and you said yes to two.`

`On Tuesday the group was five people.` es autónoma, cierta y **es su defensa entera**: el hecho
consumado con el que se sostiene. La segunda mitad sí está protegida.

### B-5 · ROLE B · `Only you know` · línea 122
> `The sixth came after that, and nobody told you to your face.`

`The sixth came after that.` es autónoma, cierta y es **la queja** —el acto que el motor le asigna
(`quejarse`)—, servida hecha.

**Reescritura de B-4 y B-5 juntas (25 → 24, ahorra 1):**
`You said yes to two people on Tuesday, when the group was still five, and you heard about the sixth from somebody else, days later.`

---

## Los 2 defectos de forma — columna `here` de Kevin

No son decibles (no avanzan turno), pero §11 prohíbe la forma por escrito: *«Si la celda contiene
algo entrecomillado o algo que empiece por un pronombre y un verbo conjugado, reescríbela.»*

1. **Línea 146**, `a hammock` → `Sebastián's bed · it moves the bed count`
   `it moves` es exactamente pronombre + verbo conjugado. **Reescritura:** `Sebastián's bed · one bed less to find`
2. **Línea 149**, `ID card` → `their two cards tonight — the number is what she needs`
   Oración completa con verbo conjugado dentro de una celda de nota. **Reescritura:** `their two cards tonight · the number, not just the name`

**Las otras 19 celdas `here` están limpias, y ésa es la noticia buena del informe.** La columna que
el blueprint marca como la más calcable de la ficha —y que en la ronda de fase 7 llegó a entregar
la deuda conjugada— hoy es nota de propósito en las 19: `none left in the house — the whole fight`,
`where your power comes from`, `Andrea's only way there`, `why nothing closes tonight`. Las
elipsis del tipo `no name on the list, no entry` son la forma que §11 pide, no un fallo. Las 21
celdas `what it is` también están limpias: todas empiezan por artículo o por infinitivo.

---

## Presupuesto después de reparar

| ficha | hoy | reescrituras | recorte compensatorio propuesto | queda |
|---|---|---|---|---|
| ROLE A | 448 | +4 (A-1) +4 (A-2) +7 (A-3/A-4) = **+15** | −6 `and nobody uses them at home` (toolkit) · −5 `that left your pocket three weeks ago` → `, three weeks ago` · −2 `because` (toolkit, bloque 1) · −6 `but not the part of someone you don't know` → `not somebody else's` = **−19** | **444** |
| ROLE B | 443 | +6 (B-1) +0 (B-2) +3 (B-3) −1 (B-4/B-5) = **+8** | −3 `because you open, and you open with` → `you open, and with` (toolkit) = **−3** | **448** |

**No hay que quitar ninguna pieza.** Lo que paga las nueve reparaciones es explicación del toolkit,
que es donde sobra.

---

## Lo que este informe revoca de los anteriores

1. **`fase7-calcable-7.md` cerró en «PASA CON CAMBIOS · 5 decibles» sobre un texto que ya no
   existe** (el de 374/370 palabras, telegráfico). De sus cinco fallos, los cinco están arreglados.
   Ninguno de los 9 de hoy estaba en aquella lista: **la reescritura a prosa no heredó fallos,
   creó otros nuevos**, y los creó en el sitio contrario —antes la carta y el vocabulario, ahora
   restricciones y datos ocultos—.
2. Su principio de que «la segunda persona protege» sigue siendo falso tal como estaba escrito, y
   B-2 es la prueba en este fichero: `You see Andrea here in 20 minutes` volteada sigue siendo
   cierta porque **las dos personas van a estar en el mismo parqueadero**.
3. Lo que sí se confirma medido: **cero decibles en las veinte filas de datos y cero en la carta.**
