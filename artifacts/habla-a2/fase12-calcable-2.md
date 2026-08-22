# Fase 12 · Calcabilidad del escenario 2 — `no-appointment-until-thursday`

**Auditado:** `/Users/josedavidduartesilva/Developer/idiomaswl/artifacts/habla-a2/fase7-fichas-2-no-appointment-until-thursday.md`
leído del disco el 22 ago 2026, después de `fase12-tablas.md` y `fase12-equidad-aplicada.md`.
Comparado contra mi pasada anterior, `fase10-calcable-2.md`, y contra el diff real
(`git diff HEAD -- …fichas-2…`, sin commitear).

**Prueba única:** *si la línea se puede decir tal cual y el turno avanza, está mal escrita.*

**Alcance ampliado hoy:** las dos tablas `Say it here` **entran**. No se audita si sus formas son
decibles —lo son a propósito, son los exponentes—, sino si **la tabla leída en orden es la
conversación**.

---

## Veredicto

**PASA CON CAMBIOS · 0 líneas decibles sobre 110 unidades.**

Unidades: **52 oraciones de prosa** (26 A + 26 B; B ganó una al partirse el bloque «If you walk
away with nothing») + **40 filas de tabla de datos y vocabulario** (10+10 por rol) + **18 filas de
exponentes**, que hoy se auditan por primera vez.

Los cambios que pido **no son decibles**: son (1) dos etiquetas de la tabla de B que nombran un
momento de la conversación en lugar de una función, y (2) una regresión de cifras declaradas que
esta misma serie de informes ya había cerrado.

---

## 1 · La tabla de exponentes, auditada por primera vez

Qué cambió hoy (diff real): las 18 etiquetas se reescribieron y se reordenaron, siete formas
pasaron de oración entera a tronco con puntos suspensivos, desapareció la glosa que decía
«the fourth point of the close», y la cabecera ganó `· use it or don't ·`.

### Los cuatro criterios, medidos sobre el archivo

| criterio | ROLE A | ROLE B |
|---|---|---|
| agrupada por función | 7 de 9 etiquetas son función | **7 de 9** — dos nombran un momento |
| orden alfabético estricto por función | **SÍ** (verificado con script) | **SÍ** |
| filas ≤ turnos | 9 filas / 9 turnos | 9 filas / 9 turnos |
| ninguna secuencia reproduce el cierre o el arranque | **no lo reproduce** | **no lo reproduce** |

### Lo que se arregló de verdad — la cola de A ya no es el cierre

Mapeo fila → punto del cierre, en el orden en que hoy se leen:

| fila | ROLE A | momento |
|---|---|---|
| 1 | asking, not guessing | primer movimiento de A |
| 2 | checking a number | cierre 3 |
| 3 | danger | cierre 4b |
| 4 | giving a time to arrive | cierre 1b |
| 5 | keeping one door shut | medio |
| 6 | naming the other branch | medio |
| 7 | saying what is not there | temprano (la mala noticia) |
| 8 | the pain tonight | cierre 4a |
| 9 | who pays, and where | cierre 2 |

Leída de arriba abajo da: apertura → 3 → 4b → 1b → medio → medio → temprano → 4a → 2. **No es el
cierre y no es la conversación.** Antes, las cinco últimas filas eran los cuatro puntos en orden y
la novena lo decía por escrito. Eso ya no está.

En B: mid, temprano, cierre 3, **arranque**, medio, medio, cierre 1b+2, temprano, medio. El turno
que abre la escena —`I don't have an appointment. Can you help me, please?`— está en la fila 4, no
en la 1. Tampoco se lee como la conversación.

### Residuo 1 — LEVE, ROLE A, filas 2-3

`checking a number` → `danger` son los puntos 3 y 4b del cierre, contiguos y **en orden**. Son dos
de cuatro, la fila 4 rompe la serie y el alfabeto lo produjo solo («checking» antes que «danger»).
No es el cierre, pero es la única pareja de la ficha que va en el orden del cierre. Se registra
para el conjunto: cuando el alfabeto encadene dos puntos del cierre, hay que romperlo renombrando
una de las dos etiquetas, no reordenando.

### Residuo 2 — MEDIA, ROLE B, filas 4 y 7 → **son los cambios que pido**

Dos etiquetas no nombran una función: nombran **dónde va la fila en la conversación**.

> `| how you walk in | I don't have an appointment. Can you help me, please? | say what you are before they ask |`

> `| the two questions before you leave | What time do I have to be there? · Does my plan cover it…? | the two things you leave without if nobody asks |`

El alfabeto barajó las filas, pero estas dos etiquetas **le devuelven el orden al estudiante**: una
dice «así se entra», la otra «esto es lo último», y la segunda además empaqueta dos puntos del
cierre (1b y 2) en una sola celda con la glosa «the two things you leave without». Con esas dos
filas se reconstruye por dónde empieza y por dónde acaba sin leer nada más. Es el mismo defecto que
la pasada de hoy fue a arreglar, a escala de etiqueta en vez de a escala de tabla.

**Qué hace falta, concretamente:**

1. `how you walk in` → una función, p. ej. `arriving with no appointment`. Con ese nombre la fila
   sube a la posición 1 por alfabeto, y ahí sí conviene otra —`saying what you need`, `starting
   without an appointment`— para que el arranque no quede primero. La forma no se toca.
2. `the two questions before you leave` → `checking cost and arrival time`, o dos etiquetas
   funcionales si se separan; **si se separan, la tabla pasa a 10 filas con 9 turnos** y rompe el
   tercer criterio, así que la salida buena es renombrar sin dividir. La glosa pierde
   «before you leave» y dice qué preguntan, no cuándo.
3. Tras cualquiera de los dos renombres, **reordenar alfabéticamente otra vez** y volver a mirar
   que ninguna pareja nueva encadene dos puntos del cierre (residuo 1).

### Lo que está bien y conviene no tocar

- Las glosas de la tercera columna son instrucciones al jugador, no turnos: `close one door without
  a reason`, `describe by comparing`, `your money as an option, not as a complaint`. Ninguna de las
  18 se puede decir en voz alta y hacer avanzar nada.
- Ninguna glosa nombra ya un punto del cierre por su número.
- Los troncos con puntos suspensivos (`We're fully booked…`, `Come… minutes early`, `I can't come
  at…, because I open…`) obligan a poner el dato, que es lo que se quería.
- 9 filas para 9 turnos es el límite, no un margen: cada turno tiene su fila. Es la razón por la que
  el orden de las etiquetas importa tanto en esta ficha y no se puede volver a declarar fuera de
  alcance.

---

## 2 · Cepillo de siempre — prosa, datos y vocabulario

### Prosa, 52 oraciones · 0 decibles

Único cambio del día (viene de `fase12-equidad-aplicada.md`, ROLE B):

> antes · `You go home with the pain, no date and nothing for tonight. And anywhere else you pay the whole treatment yourself: your plan works only here.`
> ahora · `You go home with the pain and no date. Tonight you have your 70,000. Anywhere else you pay the whole treatment yourself: your plan works only here.`

Las tres oraciones llevan `you` / `your` con el jugador como referente: dicha a A, `Tonight you have
your 70,000` pondría el dinero en el bolsillo del mostrador. No es decible. Coste: **+1 palabra**
(ver punto 3).

Siguen sin contar, y siguen ahí, las de fase 10: `That person has a hand on the face.` (A,
`Where you are`) es todavía **la única oración de la prosa de A sin deixis**, protegida solo por
coincidencia de referente; y las ocho «al filo» de fase 9.

### Datos, 20 filas · 0 decibles · **byte a byte** como en fase 10

El diff no toca ninguna fila de `Facts`. Sigue vigente el aviso: la tabla de B está en primera
persona y `the edge sharp … on my tongue when I talk` está a un `is` de ser decible.

### Vocabulario, 20 filas · 0 decibles · **byte a byte** como en fase 10

Las dos columnas revisadas otra vez. `to cover` conserva en las dos fichas la redacción de
calcabilidad (`when the plan pays and the patient pays nothing`), y la casilla vacía a propósito de
`referral note` en B sigue siendo instrucción al jugador, no turno.

---

## 3 · Regresión que hay que devolver con los cambios — cifras declaradas

En `fase10-calcable-2.md` cerré este punto: declarado = medido, y dejé escrito **«A 450/450, margen
cero: la próxima corrección de prosa tiene que ser de coste negativo»**. Hoy hay dos correcciones
de coste positivo hechas por separado, y ninguna de las dos lo sabía:

| cambio | de dónde viene | coste |
|---|---|---|
| cabecera `· use it or don't ·` en las dos tablas | `fase12-tablas.md` | **+5 palabras por rol** |
| `Tonight you have your 70,000.` | `fase12-equidad-aplicada.md` | **+1 palabra en B** |

`fase12-tablas.md` declara «solo se tocaron las ocho tablas y sus dos líneas de cabecera» dando por
hecho que eso no cuesta prosa. **Cuesta:** el contador canónico excluye las líneas que empiezan por
`|`, no los encabezados `###`. Medido hoy con el único contador válido
(`node artifacts/habla-a2/fase7-scripts/prosa-canonica.mjs`):

**ROLE A 455 · ROLE B 454**, techo 450. La ficha sigue declarando **450 / 448** en tres sitios
(tabla de cuenta de prosa, punto 7 de la pasada del 21, cierre de la pasada quirúrgica). Es
exactamente el defecto que el contador único existe para impedir: tres números para una ficha.

Del conjunto: la misma cabecera entró en los escenarios 2, 5, 6 y 7, y ahora **7 de 16 fichas se
pasan** (media 448, peor 462). No es un problema de esta ficha sola, pero esta ficha es la que hay
que devolver.

**Qué hace falta:** o quitar `· use it or don't ·` de las dos cabeceras —el «use it or don't» ya lo
dice `don't read it out loud` y `not in order`—, o compensar 5 palabras de prosa en A y 6 en B; y
después actualizar las tres cifras declaradas. Y cerrar de una vez el hallazgo 62: la regla de §11
sobre si los `###` cuentan, que es el hueco por el que entró esto.

---

## 4 · Para el resto del conjunto

1. La tabla de exponentes **no vuelve a estar fuera de alcance**. Se audita con cuatro preguntas
   mecánicas: función / alfabeto / filas ≤ turnos / ninguna secuencia que reproduzca cierre o
   arranque. Las cuatro se comprueban con script sobre el archivo.
2. El alfabeto no basta: una etiqueta que nombra **cuándo** («how you walk in», «before you leave»)
   reinyecta el orden que el alfabeto acababa de romper.
3. Toda corrección de tabla que toque un encabezado `###` **cuesta prosa** con el contador canónico.
   Medir después, siempre, aunque el encargo diga «solo tablas».
