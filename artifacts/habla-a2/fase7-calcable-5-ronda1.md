# Escenario 5 · `late-again-on-monday` — ¿se puede leer en voz alta?

Auditoría de calcabilidad contra la regla de §11 del blueprint
(`docs/habla-acompanado-blueprint.md`, líneas 250-262):

> La ficha se escribe **en notas, no en frases**. `Exam: Saturday 12, 8:00 a.m.` sí.
> `I'm taking the exam on Saturday at eight.` no, jamás, ni en los datos ni en la situación ni
> en los objetivos. Las frases decibles viven **solo** en la tabla de exponentes, que es donde
> el estudiante sabe que va a buscarlas.
>
> Prueba para el redactor: si una línea de tu ficha se puede decir tal cual en la conversación y
> el turno avanza, esa línea está mal escrita. Reescríbela como dato.

Auditado: `artifacts/habla-a2/fase7-fichas-5-late-again-on-monday.md`.

Fuera de alcance por diseño: las dos tablas *Say it here* (líneas 79-87 y 160-168), que son
exponentes y ahí las frases van a propósito; el metadato de producción de la carta (196-199), el
bloque *After* (215-217) y todo lo que va de la línea 249 abajo (presupuesto y hallazgos), que
están en español y no llegan a pantalla; y `grammarReferences` (221-245), que es metadato de
código.

## Cómo se marcó cada línea

Mismas tres marcas que en los escenarios 1 y 2, para que los tres informes se puedan comparar:

- **FALLA** — la línea, o una cláusula autónoma donde el ojo puede parar, es un enunciado inglés
  bien formado que ese rol le puede decir al otro y el turno avanza.
- **RIESGO** — es oración, pero dicha *tal cual* apunta mal: hace falta un cambio (un pronombre,
  un posesivo, borrar un subordinante) para que funcione en la boca.
- **META** — es oración, pero dicha en voz alta no produce nada: son instrucciones al jugador
  (`that's your argument`) o criterios en pasado (`You said sorry once`). No cuentan.

**Las filas de tabla se leen de corrido, etiqueta incluida**, igual que en el escenario 2: un
`| etiqueta | celda |` se lee como una sola línea.

---

## Veredicto

**PASA CON CAMBIOS**, y es el fichero más limpio de los tres auditados hasta ahora.

Unidades de pantalla en inglés auditadas, sin contar exponentes: **111**.
Fallan **5** (4,5 %). Otras **12** están a un pronombre de fallar.

| escenario | unidades | FALLA | % | graves |
|---|---|---|---|---|
| 1 · `the-bike-in-the-parking-lot` | 73 | 7 | 9,6 % | — |
| 2 · `no-appointment-until-thursday` | 94 | 18 | 19,1 % | 3 |
| **5 · `late-again-on-monday`** | **111** | **5** | **4,5 %** | **1** |

Y lo que se arregló entre el 2 y el 5 no es casualidad: **las cuatro secciones que hundieron al
escenario 2 están limpias aquí**. La carta: 0 de 8. El cierre compartido: 0 de 6. `If you walk
away with nothing`: 0 de 2. Las notas de registro de la cabecera: 0 fallas (1 riesgo cosmético).
Alguien leyó el informe anterior.

**Una sola es bloqueante**, y es la de siempre: el secreto del rol B, escrito en oración de pasado
simple, listo para leer.

---

## Dónde se concentran

| sección | unidades | FALLA | riesgo | estado |
|---|---|---|---|---|
| Vocabulario, columna `here` | 20 | **2** | 5 | **la peor otra vez** — pero baja de 6 a 2 |
| **Facts** (10 + 10 filas) | 20 | **2** | 1 | y las dos son **la misma frase, una en cada ficha** |
| `Only you know` (dato oculto) | 5 | **1** | 1 | la única grave sale de aquí, como en el escenario 2 |
| `Where you are` (situación) | 2 | 0 | 1 | solo ROLE A; la de B es nota pura |
| `You want` (objetivo) | 2 | 0 | 1 | |
| `You can't` (restricciones) | 6 | 0 | 1 | |
| `Your toolkit` | 2 | 0 | 1 | |
| Nota de registro (`>` inicial) | 2 | 0 | 1 | solo ROLE A; la de B es nota |
| Vocabulario, columna `what it is` | 20 | **0** | 0 | **limpia** (20/20, son definiciones) |
| `You did it if` (criterios) | 13 | **0** | 0 | **limpia** — texto meta en pasado |
| **La carta** | 8 | **0** | 0 | **limpia** — y en el escenario 2 no lo estaba |
| **`Both screens — how it ends`** | 6 | **0** | 0 | **limpia** — y en el escenario 2 no lo estaba |
| `If you walk away with nothing` | 2 | **0** | 0 | **limpia** |
| `Before you speak` (B) · `Your screen only` | 3 | 0 | 0 | limpia |

### Tres concentraciones

**1 · La columna `here` del vocabulario sigue siendo la peor, y sigue siendo la misma causa.**
2 fallas y 5 riesgos de 20 celdas. Es la pieza que §11 añadió sin recorrido de auditoría, y la
celda `here` pide un ejemplo — y un ejemplo es una frase. Pero aquí baja de 6 fallas (escenario 2)
a 2, y se ve por qué: **8 de las 20 celdas están escritas con `·` y sin un solo verbo conjugado**
(`the second set · what you came to give`, `boxes counted against it · two people, always`,
`two of them · the price of the keys`). El formato de nota se aprendió; quedan dos celdas donde
no se aplicó.

**2 · Patrón nuevo, y no estaba en los informes 1 ni 2: la misma frase impresa en las dos
fichas.** `whoever opens the store signs the delivery note` está literal en la línea 54 (tabla de
A) y en la 135 (tabla de B). Es la regla que sostiene todo el regateo de las llaves —quien abre,
firma— y **las dos partes la llevan escrita**, así que ninguna tiene que decirla. Es peor que una
frase calcable normal: una frase que las dos leen no es que se pueda calcar, es que **desaparece
de la conversación**, porque las dos dan por dicho lo que ninguna dijo.

Regla operativa para los escenarios que falten: **ninguna cláusula debe aparecer verbatim en las
dos fichas.** Si el dato es común, cada lado lo escribe desde su lado.

**3 · El reparto entre roles se invierte respecto del escenario 2, y por un motivo distinto.**
**A falla 2, B falla 3** — casi parejo — pero:

- **A mete oración donde adorna.** Sus dos fallas son celdas de vocabulario y una fila de datos,
  y sus riesgos están en la cabecera y en la situación: sitios donde el redactor se puso a narrar.
- **B mete oración donde juega.** Su falla grave es su secreto entero; su otra falla
  (`somebody has to check what arrives`) es su argumento para pedir las llaves, y está escrita con
  `have to`, que es **uno de los diez temas de gramática declarados del escenario**. La ficha le
  entrega hecha una instancia de la estructura que el ejercicio existe para hacerle producir.

---

## La grave — el secreto de B, ya pronunciado

### 1 · GRAVE — los dos lunes que nunca llegaron al papel, en pasado simple
**Línea 117**, ROLE B, `Only you know`:

> `- The first two Mondays never reached the **incident form**. Write one today and the question comes back: the other two.`

`The first two Mondays never reached the incident form.` — sujeto, verbo conjugado en pasado
simple, negación con `never`, ocho palabras, decible verbatim.

Y es **la carta oculta entera de doña Amparo**. Es lo que la hace vulnerable, lo que le impide
escribir el memorando alegremente, y lo que su propio criterio de éxito 6 mide:
*«you did not lie about the two Mondays»*. Un criterio que mide si mentiste sobre algo solo
funciona si decirlo cuesta construirlo. Aquí no cuesta: está redactado.

**Y la propia ficha demuestra dos veces que se podía escribir bien.** El mismo dato aparece en
nota impecable en la fila 189 de la carta —`| The question one of them asked | the other two Mondays · not in the incident form |`— y toda la entrada de Alba (línea 118) es nota pura, sin
un verbo conjugado, con el mismo tipo de contenido. El modelo de arreglo está a una línea del
problema.

**Reescritura:**
`- The first two Mondays · never on the **incident form** · one written today = the question back, about the other two.`

(20 palabras → 19. El presupuesto de prosa de B baja, no sube.)

---

## Las otras 4 que fallan

### 2 · Línea 144 — ROLE B, vocabulario, celda `here` de `stock`
> `| stock | the boxes and the things the store sells and keeps | somebody has to check what arrives · today, only you |`

`Somebody has to check what arrives.` — presente simple con `have to`, decible tal cual, y es el
argumento de B para justificar por qué necesita a alguien con llaves. Que esté escrito con
`have to` es lo caro: `have-to-must` es uno de los diez `grammarReferences` del escenario, y su
*rationale* dice que ahí es donde Amparo «se ampara en una obligación». El exponente 166 ya le da
la forma buena (`I have to write something.`); la celda le regala una segunda gratis.

**Reescritura:** `| stock | the boxes and the things the store sells and keeps | a check on everything that arrives · today, nobody but you |`

### 3 · Línea 54 — ROLE A, Facts, `The warehouse job`
> `| The warehouse job | vacant from April · still nobody · whoever opens the store signs the delivery note |`

Las dos primeras mitades son nota perfecta. La tercera es oración completa en presente simple.

**Reescritura:** `| The warehouse job | vacant from April · still nobody · delivery note signed by whoever opens the store |`

(Participio en relativa reducida: no hay verbo conjugado, no se levanta como enunciado.)

### 4 · Línea 135 — ROLE B, Facts, `The second set of keys`
> `| The second set of keys | whoever opens the store signs the delivery note |`

La misma oración, palabra por palabra, en la otra ficha. Ver la concentración 2: además de
calcable, es un dato que **ninguna de las dos tiene que producir**, porque las dos lo leyeron.

**Reescritura, deliberadamente distinta de la de A para que la frase no exista dos veces:**
`| The second set of keys | one signature on the delivery note · from whoever opens |`

### 5 · Línea 66 — ROLE A, vocabulario, celda `here` de `daycare`
> `| daycare | the place where somebody looks after your child while you work | 6:40, and nothing moves it · the 5:50 bus = thirty minutes alone at the door |`

`Nothing moves it.` — sujeto, verbo conjugado, tres palabras. Es corta, pero es autónoma, es
decible pegada a `daycare`, y es **la pieza inamovible de Liliana**: el único punto duro sobre el
que se apoya toda su explicación. El exponente 84 le da la versión A2
(`I have to leave Matías at the daycare at twenty to seven.`); esta celda le da una versión más
corta y más rotunda, fuera de la tabla donde debería buscarla.

La segunda mitad de la celda —`the 5:50 bus = thirty minutes alone at the door`— es el modelo:
mismo contenido dramático, cero verbos, imposible de leer.

**Reescritura:** `| daycare | the place where somebody looks after your child while you work | 6:40 sharp, nothing before or after · the 5:50 bus = thirty minutes alone at the door |`

---

## Los 12 en riesgo — oración completa, a un cambio de funcionar

| # | línea | sección | cita | por qué inquieta | en nota |
|---|---|---|---|---|---|
| R1 | 65 | A · vocab `road work` | `why the bus takes twenty-five minutes more` | **el riesgo más caro de A**: el ojo para después de `why` y queda `the bus takes twenty-five minutes more`, que es la mitad de su explicación causal y **no está en ningún exponente** (el 83 fecha la obra, el 82 da las horas, pero los veinticinco minutos no) | `| road work | … | twenty-five minutes more on the bus |` |
| R2 | 27 | A · `Where you are` | `Doña Amparo shuts the office door and puts two things on the desk.` | **la única oración narrativa de las dos situaciones**: dos verbos léxicos conjugados en un bloque que §11 nombra por su nombre. Verbatim apunta mal (tercera persona a la cara), pero la de B —línea 107, `Store still shut. Truck 7:10 · counting: two people`— demuestra que la nota pura llega igual | `… still closed. The office door shut behind you, two things on the desk.` |
| R3 | 70 | A · vocab `to sign` | `not before you know which paper it is` | `you`→`I` y es una negativa entera y muy fuerte, justo lo que mide su criterio 6 | `never before knowing which paper` |
| R4 | 73 | A · `Your toolkit` | `those mornings are yours, and you're not giving them` | `yours`→`mine`, `you're`→`I'm`, y es el criterio 4 completo (`You said no to Saturday mornings`) resuelto de una lectura | `— Saturday mornings, not on the table —` |
| R5 | 63 | A · vocab `commitment sheet` | `one line of it is yours` | oración copulativa; leída tal cual se la asigna a Amparo, que es al revés. El exponente 160 de B ya cubre la función (`This line is for you, not for me.`) | `blank · one line on it yours` |
| R6 | 62 | A · vocab `a written warning` | `the one thing you can't leave with` | sintagma, pero a un `That's` de ser su objetivo dicho en voz alta | `the one thing not to leave with` |
| R7 | 24 | A · nota de registro | `She's the supervisor` | cosmético: no avanza ningún turno. Va aquí solo porque la línea equivalente de B (102) lo dice sin verbo (`Two years together.`) y A no | `Your supervisor; two years together.` |
| R8 | 117 | B · `Only you know` | `Write one today and the question comes back: the other two.` | segunda mitad de la línea grave; `the question comes back` es cláusula conjugada. Se arregla con la misma reescritura | ver grave 1 |
| R9 | 133 | B · Facts | `\| When the warehouse is quiet \| Saturdays, 8:00 to 12:00 \|` | la etiqueta lleva verbo conjugado, única entre las veinte filas de datos. Y el dato es la bisagra del escenario: choca con la clase de inglés de A | `\| The warehouse, quiet \| Saturdays, 8:00 to 12:00 \|` |
| R10 | 150 | B · vocab `commitment sheet` | `the only paper you can sign safely` | a un `This is` de ser su jugada de cierre | `the only safe signature of the three` |
| R11 | 114 | B · `You can't` 3 | `Her words on it, or no paper.` | sin verbo, pero es un ultimátum elíptico que en inglés se dice tal cual cambiando `her`→`your` | `That line: her words, nobody else's.` |
| R12 | 109 | B · `You want` | `the only one who knows the warehouse and the trucks` | sintagma; el exponente 167 ya tiene la frase (`You know this warehouse better than anybody.`), así que el riesgo es de duplicación más que de calco | `the one person who knows the warehouse and the trucks` |

**Siete de los doce son de ROLE A, y cinco de ellos son sintagmas o segundas personas** — es
decir, la ficha de A se protege por accidente, no por diseño: la sostiene un pronombre. Los cinco
de B, en cambio, son verbos conjugados de verdad.

---

## Aparte 1 · la tabla de datos, comparada con el escenario 2

En el escenario 2 la tabla de datos fue «la novedad mala»: 4 fallas y 3 roces en 20 filas, con
celdas escritas desde dentro del personaje (`I have the key`, `nobody is waiting for me`).

Aquí **no queda ni una primera persona con verbo conjugado en las veinte filas**. La regla
operativa que salió de aquel informe —*en una celda de datos no entra un verbo conjugado*— se
aplicó, y se aplicó bien: las filas 49 y 50 de A guardan en nota exactamente lo que los exponentes
82 y 83 dicen en frase, y ese es el modelo entero del formato:

| en la tabla de datos (nota) | en la tabla de exponentes (frase) |
|---|---|
| `\| Your bus \| before: ten to seven · now: a quarter past \|` | `My bus used to arrive at ten to seven — now it arrives at a quarter past.` |
| `\| The road work \| carrera 15 · start date August 1 · twenty-five minutes more \|` | `The road work started on August 1.` |

Lo que se coló es de otra especie: **una regla de tercera persona** (`whoever opens…signs…`),
impersonal, que no suena a personaje y por eso pasó desapercibida dos veces. Es el hueco que deja
la regla anterior: prohíbe el yo, no prohíbe el impersonal.

**Regla ampliada:** en una celda de datos no entra un verbo conjugado, **tampoco si el sujeto es
impersonal** (`whoever`, `somebody`, `nothing`, `the question`). Los cuatro sujetos impersonales
del fichero producen tres de las cinco fallas.

## Aparte 2 · la carta se protege, y esta vez sí por diseño

En el escenario 2 la carta fallaba porque la primera persona de la doctora y la de A coincidían:
leerla en voz alta producía una jugada correcta. Aquí no pasa, y merece anotarse por qué, porque
es replicable:

- El contenido peligroso —los otros dos lunes— está en **fila de tabla con etiqueta nominal**
  (línea 189), no en prosa.
- Lo único que hay en oración es acotación escénica (`Alba knocks on the office door.`), que
  Liliana está viendo suceder: leerla en voz alta no adelanta nada.
- Las tres viñetas de instrucción (191-193) son opacas a propósito (`Nothing quiet works now.`),
  así que ni siquiera son decibles.

## Aparte 3 · no es calcabilidad, pero se ve desde aquí

Tres apuntes para las pasadas de nivel y de naturalidad, no para esta:

1. **Las líneas meta opacas.** `that's your argument` (145), `she may ask` (147),
   `Nothing quiet works now.` (191), `Yours if you want it, and you don't` (119). No son calcables
   —dichas en voz alta no significan nada— pero tampoco son A2 leído: la última, en particular,
   exige entender una elipsis inglesa que ningún A2 tiene.
2. **Los dos bloques `Your toolkit`** (73 y 154) repiten el defecto señalado en los escenarios 1 y
   2: cinco incisos anidados sin un punto, guiones largos dentro de guiones largos. §11 pide
   «frases cortas, cero subordinación larga».
3. **`want out` sigue impreso en la línea 32.** El hallazgo 6 del propio fichero (línea 316)
   afirma que se sacó junto con `sayable`, `checkable` y las pasivas. Se sacaron esas; `want out`
   no. Es un phrasal figurado en la restricción más importante de A.

---

## Efecto sobre el presupuesto de prosa

De las 5 fallas, **una sola toca prosa contada** (la grave, línea 117); las otras cuatro están en
tablas, que no cuentan. De los 12 riesgos, cuatro tocan prosa: R2 (27), R4 (73), R7 (24) en A, y
R11 (114) en B.

| ficha | reescrituras de prosa | delta | prosa antes | después | tope §11 |
|---|---|---|---|---|---|
| ROLE A — Liliana | R7 (−1), R2 (−2), R4 (−3) | **−6** | 320 | **314** | ≤ 350 |
| ROLE B — doña Amparo | grave 1 (−1), R11 (−1) | **−2** | 331 | **329** | ≤ 350 |

**Ninguna reescritura añade una palabra**, y aquí, a diferencia del escenario 2, había margen de
sobra (30 y 19 palabras). Después de la pasada el margen sube a 36 y 21 — y con la variante de
cuenta que incluye los `###`, de 340/349 a 334/347, las dos por debajo del tope.
