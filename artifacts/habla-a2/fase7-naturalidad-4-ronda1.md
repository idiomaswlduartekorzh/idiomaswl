# Escenario 4 · `a-charge-i-did-not-make` — naturalidad y vocabulario

Auditoría de `fase7-fichas-4-a-charge-i-did-not-make.md`, contra `caja-de-herramientas-a2.md`,
§3 y §10 del blueprint (`docs/habla-acompanado-blueprint.md`) y el molde vivo
`fase7-modelo-ficha-en.md`. Al lado, para ver qué se cayó al recortar: la versión larga
`fase6-fichas-4-6.md` §4 y el motor `fase4-escenarios-4-6.md` §4.

**Veredicto: pasa con cambios.** El motor está sano y no lo toco: la asimetría es doble y real
(él tiene la actividad del teléfono, ella tiene los dos bloques de consumo y no puede enseñar la
prueba), hay tres salidas y ninguna es la obvia, los dos pierden si se van sin trato, y la carta
está bien colocada en el turno global 5. Lo que falla está todo en las dos tablas de abajo, y
falla de una manera muy concreta:

> **El rol B no tiene con qué hacer su jugada central.** Su tesis es que esto no se arregla
> devolviendo plata sino cambiando la configuración de la línea. Es el punto 2 del cierre, que
> los dos leen. Y en sus nueve exponentes **no hay ni uno que ofrezca el bloqueo**, ni uno que
> diga «desde cuándo», ni uno que cambie el dato por el dinero. Solo hay uno que dice lo que un
> plan **no** trae. B tiene la posición y no tiene la frase.

Y por debajo de eso, tres huecos de vocabulario que mandan a la pareja al español en los tres
momentos que más importan: la confesión del sobrino, la explicación de la madrugada y el chequeo
final del cierre.

Veintiuna correcciones. **Ninguna toca la prosa**: todas caben dentro de las tablas, y dos de
ellas quitan filas. El presupuesto de §11 no se mueve.

---

## A · NATURALIDAD

### A.1 Lo que sí suena a persona

Antes de los reparos, lo que no hay que tocar:

- **El reparto de la caja está bien pensado, y en dos sitios está bien pensado de verdad.**
  «**Not 5**» en la ficha de B es la mejor decisión de las dos fichas: el bloque 5 es «lo que
  *yo* pierdo», y lo que B pierde —el bono de la encuesta— es justo lo que no puede nombrar.
  Negarle el bloque entero es coherente con su dato oculto, no un descuido. Y «**Not 4, not 7**»
  en A también se sostiene: A no suelta jerga y A no concede nada, A resiste; y para resistir sin
  decir «no» tiene el bloque 8, que es exactamente la herramienta de su restricción 2.
- **La restricción 2 de A es de las mejores del set.** «No aceptar a la primera; antes: los
  42.000, qué te cuesta, la respuesta entera» convierte una queja en una secuencia de tres actos
  y le da al escenario sus turnos centrales sin ningún reloj de por medio.
- **`I've never paid extra data, not once.`** es la línea más lograda de las dieciocho: mete
  nueve años de historial en un present perfect de experiencia, que es lo único que el nivel
  aguanta, y no suena a amenaza.
- **`Was the phone with you all month?`** es la pregunta incómoda formulada sin señalar a nadie
  —el mérito es no decir «who used your phone?»—, y encima es literalmente la casilla del reclamo
  escrito. Que la pregunta oral y la casilla del papel sean la misma frase es un hallazgo, no una
  casualidad, y hay que conservarlo.
- **`to escalate a case` glosado en B y no en A, con «it goes up» en el lado de A**, es el reparto
  de §10 bien hecho: el que la produce lleva el término, el que la recibe lleva la versión llana.
  Es el modelo que el resto del bloque de vocabulario debería seguir y no sigue.
- **El cierre de tres puntos con el chequeo del número al final** es sólido y obliga a decidir en
  vez de recitar. (El número, eso sí, no existe: ver A.2.9.)

### A.2 Naturalidad — los reparos

**A.2.1 · B no tiene ninguna forma de ofrecer lo que el cierre le exige ofrecer. (GRAVE)**
El punto 2 del cierre, impreso en las dos pantallas, es «**qué se hace para que no se repita** —
bloqueo, alerta, cambio de plan— **y desde cuándo**». El criterio de éxito de B remata: «algo que
impida la repetición, activado hoy». Los datos duros de B tienen el bloqueo con todas sus
condiciones. Y sus nueve exponentes son estos:

| lo que hace | ¿lo tiene? |
|---|---|
| glosar `credit note` | sí |
| decir que un plan **no** trae bloqueo | sí |
| marcar el límite dinero/gigas | sí |
| las tres preguntas para sacar el dato | sí |
| enseñar los dos bloques | sí |
| contestar lo del aviso | sí |
| dejar elegir | sí |
| **ofrecer el bloqueo** | **no** |
| **decir desde cuándo** | **no** |
| **cambiar el dato por el dinero** | **no** |

Es un rol construido entero alrededor de una jugada para la que no se le da una sola forma. Y no
es una impresión mía: los propios `grammarReferences` del archivo lo delatan. `will-future` está
anclado a «*I'll sign now*» y «*the block will start today*», y **no hay un solo `will` en
ninguna de las dos tablas de exponentes** (comprobado: las cuatro apariciones de «will» en el
archivo están en una glosa de vocabulario y en el propio bloque de `grammarReferences`).
`first-conditional` está anclado a dos condiciones cruzadas —«*If you give me the date and the
time, I can do it today*» / «*If you block it today, I can sign now*»— y **solo existe la
segunda, la de A**. La que falta es la de B, y es su moneda de cambio entera.

**Arreglo:** una fila que resuelve las tres cosas a la vez, y que es además el primer condicional
y el `will` que las referencias de gramática ya prometen:

| poner el bloqueo sobre la mesa | `If you give me the day and the hour, I'll block it today.` | cambiar el dato por algo que empieza hoy |

**A.2.2 · No hay una disculpa en toda la ficha, y la prueba de los tres turnos la exige. (GRAVE)**
La palabra `sorry` aparece **cero veces** en el archivo. La prueba de los tres turnos de
`fase4-escenarios-4-6.md` dice, literalmente, «**T2 (B) — Se disculpa**, pide la factura, mira el
sistema y pregunta». La caja del nivel no tiene ninguna forma de disculpa por la situación: el
`Sorry to bother you` del bloque 1 está marcado `[asks]` y es para interrumpir, y el `Sorry, I
didn't catch that` del bloque 3 es para no haber oído.

Y no es que la casa haya decidido que las disculpas no van: el escenario 5 tiene
`I'm sorry about this morning.` en su tabla propia y el 8 tiene `I know, and I'm sorry.`. Aquí
falta, y falta en el único rol de los dieciséis que trabaja de cara al público.

Lo bueno es que arreglarlo produce justo la distinción que el nivel necesita enseñar: **«I'm sorry
about this» no es «we made a mistake»**, y esa diferencia es exactamente la restricción 3 de B.
**Arreglo:**

| abrir sin admitir nada | `I'm sorry about this charge.` | disculparse por lo que le pasa, no por lo que hizo la empresa |

**A.2.3 · La ficha de B se contradice a sí misma sobre quién abre. (medio-grave)**
Cabecera de B: «**They start.** About 7 turns». Dos párrafos más abajo, su línea de caja de
herramientas: «Blocks **1** `[grants]` — **you're the counter, you open** —». Las dos frases no
pueden ser verdad. Viene heredada de fase 6, y en la práctica el que la lea va a hacer lo que
dice la línea de la caja, porque es la que le dice qué decir.

Hay además un problema de fondo detrás: en un mostrador con el turno 07 en pantalla, **quien abre
de verdad es el mostrador** («Good morning. How can I help you?»), y fase 0 fija que arranca A.
No se cambia fase 0; se escribe bien lo que hace cada uno.
**Arreglo, en la línea de B:** «Blocks **1** `[grants]` — they walk up with the bill; `Good
morning. How can I help you?` is your **answer**, not your opening —».

**A.2.4 · A A se le manda a un bloque 1 que no le sirve, y por la misma razón que en el escenario 2. (medio)**
La ficha manda a A al bloque 1 `[asks]`, cuyas filas son `Excuse me, do you have a minute?`,
`Sorry to bother you.` y `Hi — can we talk for a second?`. Las tres están escritas para
interrumpir a alguien que estaba a lo suyo. A **tiene un turno asignado y lo han llamado por
pantalla**: pedirle permiso al asesor para existir no es cortesía, es raro. De las seis filas del
bloque solo `I'm here about…` le sirve, y esa no lleva marca.
**Arreglo:** basta con decirlo en la línea de la caja: «Blocks **1** — of the six, only
`I'm here about…` fits: **your number was called, you don't ask for permission**».

**A.2.5 · La pregunta que la propia ficha llama incómoda no lleva ningún amortiguador. (medio)**
La celda de `Was the phone with you all month?` dice «the uncomfortable one». En inglés esa
pregunta, dicha a pelo por un empleado a un cliente que acaba de reclamar, no suena incómoda:
suena a acusación. Lo que la desactiva es una fórmula de dos palabras delante, y B no tiene
ninguna. Es el mismo agujero que A.2.2 en otra escala: al rol que atiende no se le ha dado el
inglés de atender.
**Arreglo, sin gastar fila:** `Just to check — was the phone with you all month?`

**A.2.6 · A no tiene con qué atenuar, y su única petición directa está a pelo. (medio)**
Los nueve exponentes de A son afirmaciones planas y preguntas directas. Como turnos 3 a 8 de una
queja están bien; como **primer contacto** de una conversación de mostrador, no: un
angloparlante entra diciendo que *cree que hay un error*, no soltando `I didn't use this data.` Y
`I want a written claim.` es la línea más brusca de las dieciocho —en un mostrador se dice
`I'd like…`, que es A2 de manual y no está en ninguna lista de estructuras prohibidas—.
**Arreglo:** cambiar `I want a written claim.` por `I'd like a written claim.` (sin coste de
fila) y añadir la apertura que hoy no existe: `I think there's a mistake on my bill.` — que es,
de paso, la manera de decir la queja sin acusar, que es lo que la restricción 1 le pide.

**A.2.7 · A tiene que hacer entender la carta y no tiene con qué reformularse. (medio)**
La ficha le niega a A el bloque 4, y en general está bien: la jerga la pone el mostrador. Pero hay
**un** contenido que solo existe en la cabeza de A y que tiene que llegar entero: lo que hizo
Brayan. Si «he shared your mobile data with the TV» no aterriza —y es lo más difícil de decir de
todo el escenario—, A no tiene `I mean…` ni `It's like…` para volver a intentarlo, y se pasa al
español en el pico dramático. Es exactamente el reparo A.2.4 del escenario 2, en el mismo sitio.
**Arreglo:** media ración del bloque 4 con la razón escrita: «**4**, half of it — you don't use
hard words, but **the phone story is yours and nobody else can say it again for you**».

**A.2.8 · «Cancel the line, or threaten another company» no quiere decir lo que se quiso decir. (medio)**
En fase 6 era «amenazar **con irte a** otro operador». Comprimido a inglés quedó *amenazar a otra
compañía*, que es otra cosa y además no tiene sentido en la escena. Un A2 que lea eso no entiende
qué se le está prohibiendo.
**Arreglo:** `Cancel the line. Say you'll go to another company.` — dos notas, y la segunda dice
lo que hay que decir.

**A.2.9 · El cierre pide un número que no existe en ningún sitio. (medio)**
«El asesor dice el **número** de lo que quede —la nota crédito o el reclamo escrito— y el cliente
lo repite dígito a dígito.» Es el remate del cierre y está en las dos pantallas. Pero **ni la
tabla de datos de A ni la de B contiene un número de nota crédito ni un radicado**: el único
número que comparten es el turno 07, que no es eso. B tiene que inventárselo en voz alta, que es
justo lo que la ficha evita en todas las demás piezas.
**Arreglo:** una fila en los datos de B —`Claim number | CL-0 8 2 6 1 4` o el formato que se
prefiera— y nada más; A no debe tenerlo, porque el ejercicio es recibirlo y devolverlo.

**A.2.10 · La carta está fechada veintidós minutos después del final de la conversación. (medio)**
Empieza a las 10:40 y dura 7 minutos: acaba sobre las 10:47. La carta entra en el turno global 5
de 15, o sea sobre las 10:43. Y lleva escrito **11:05 a.m.** Es el mismo fallo que el escenario 2
(carta a las 4:52 en una conversación que empieza a las 4:20): **dos de dos, conviene mirarlo en
los ocho.**
**Arreglo:** `10:44 a.m.`

**A.2.11 · `soccer` en la carta, `football` en la razón de gramática. (leve)**
§11 fija variedad americana. La carta ya dice `soccer`; el `rationale` de `past-simple-regular`
dice «he watched **football** all afternoon». Igual: la escena es un `shop` en las dos fichas
(4 veces), y el escenario 5 usa `store` (9 veces) para lo mismo. En americano, un local de
una operadora en un centro comercial es un **store**.
**Arreglo:** `soccer` en los dos sitios; `shop` → `store` en las cuatro apariciones.

**A.2.12 · La carta le da a A una frase entera lista para pronunciar. (leve)**
«he **shared your mobile data with the TV** to watch soccer» es una línea decible tal cual, en
una pantalla que A lee justo antes de hablar. Es el tipo de celda que §11 manda reescribir. Aquí
lo salva a medias que sea una cita de la hermana y que A tenga que cambiarle el pronombre
(*your* → *my*) para poder usarla —y ese cambio es trabajo de verdad—. **Lo dejo en leve, con una
sugerencia:** si se quiere blindar, la fila pasa a nota (`the TV · your mobile data, not wifi`) y
el trabajo de armar la frase vuelve al estudiante.

### A.3 Qué se cayó al recortar, y qué quedó sin su porqué

**A.3.1 · El objetivo de B afirma algo que su propia tabla de datos desmiente. (GRAVE)**
«**You want** · … Two things **only they have**: the day, the hour, what the phone was doing.»
Tres líneas más abajo, en sus datos duros: «On your screen · block one | **Sunday, July 26 ·
1:10 to 7:40 p.m.**». B tiene el día y la hora en la pantalla. Lo único que no tiene es **la
actividad**.

El motor de fase 4 sí lo explicaba: «Sin eso **no justifica ni un peso**». Es decir, el motivo de
B para preguntar no es informativo, es de trámite —lo necesita **dicho por el cliente** para
poder escribirlo en el formato—. Al comprimir se conservó la exigencia y se perdió la razón, y
lo que queda es una contradicción que el estudiante ve en la misma pantalla. Peor: deja el
exponente `When did it start?` sin sentido, porque B ya sabe cuándo empezó.

**Arreglo, y cabe en las mismas palabras:** «**You want** · Case closed today, here, not
escalated, customer happy. The screen has the hours; **the form needs them from their mouth** —
the day, the hour, and what the phone was doing, which the screen does **not** have. And a way
out that stops the repeat.»

**A.3.2 · La restricción de «no lo resuelvas por teléfono» desapareció y sus datos se quedaron. (medio)**
Fase 4 la tenía escrita: «**No puede** resolverlo por teléfono: ya lo intentó dos veces… y para
venir hoy pidió permiso en el trabajo —no lo va a pedir otra vez este mes—». En la ficha de fase 7
no está en las restricciones, y sin embargo sobreviven **dos filas de datos que solo existían para
sostenerla**: «The two calls to the call center» y «Time off work». Son datos huérfanos: el
estudiante los lee y no sabe qué hacer con ellos.

Y cuesta algo más que orden: sin esa restricción, **«llámenos usted» vuelve a ser una salida
barata**. B puede cerrar ofreciendo que le llamen del call center y A no tiene por escrito por qué
eso no le sirve.
**Arreglo:** las dos filas se fusionan en una y llevan el porqué dentro, que es donde §11 permite
la nota de propósito: `Other ways out | two calls, 30+ minutes, both dropped · this morning cost
you a day off you don't get again this month`.

**A.3.3 · El internet de casa sobrevivió sin su motivo, y era el argumento de una de las tres salidas. (medio)**
«Home internet | you work from home three days a week · the connection drops a lot». En fase 4
esa fila **es** la razón por la que la salida 2 (los 25.000 en gigas) vale más de lo que parece.
Sin la nota, A lee un dato de color y no evalúa la oferta —y su criterio de éxito le exige
elegir la forma—.
**Arreglo:** cerrar la fila con la nota de propósito: `· gigas are worth more to you than they
look`.

**A.3.4 · El dato oculto de A perdió la actividad, y con ella la mitad de su respuesta. (medio)**
Fase 6 le daba a A, para cuando le preguntaran, «my nephew, twelve years old · Sunday, July 26 ·
from one to seven in the afternoon · a farm near Piedecuesta · no wifi · **he watched videos**».
Fase 7 conserva todo menos lo último. Consecuencia: si B hace su pregunta en el turno 2 —que es
lo que la prueba de los tres turnos manda—, A no tiene **nada** que contestar sobre la actividad
hasta el turno 5.

Puede ser deliberado y a favor: hace que la carta importe. Pero entonces hay que decirlo, porque
hoy el criterio de éxito de B («the day, the hour and **what the phone was doing**, from a
question of yours») queda inalcanzable durante la mitad del juego y B no sabe por qué.
**Arreglo (elegir uno):** o vuelve `he watched videos` como sospecha —y la carta la convierte en
otra cosa, que es lo que hace una buena carta—, o la fila de A se cierra con «`what he did: you
don't know yet`» y el criterio de B dice «by the end», no a secas.

**A.3.5 · La restricción 3 de B es la única sin motivo, y es la que más lo necesita. (leve)**
«3. Say the failure is the company's.» Punto. Las otras dos traen su razón pegada (el tope, la
firma que no existe). Esta no, y es la que produce la lengua más difícil del escenario: contestar
lo del aviso que nunca llegó sin echarle la culpa a nadie. Un A2 que no entiende por qué no
puede, la rompe.
**Arreglo, cuatro palabras:** «3. Say the failure is the company's — **that's a written
admission, and it isn't yours to make**.» Y de paso conviene apuntar que los cuatro reclamos
idénticos del dato oculto **son esta misma restricción en otra forma**: hoy las dos piezas están
en la ficha sin que nada las una.

**A.3.6 · Se cayó `Is that money, or is that data?` y el «pick your form» del cierre se quedó sin su pregunta. (leve)**
Fase 6 se lo daba a A. El punto 1 del cierre pide «en qué forma», y el criterio de éxito de A
remata con «the form picked by you». La pregunta que separa las formas ya no está.
**Arreglo:** si hace falta un hueco, sale de fundir dos filas de «measure what they offer»; si no,
se acepta que `What does that cost me?` haga las dos cosas y se anota como decisión.

**A.3.7 · La carta es del tipo que §9 dice no escribir nunca, y la propia ficha lo argumenta. (fuera de mi encargo, lo señalo)**
§9: «una carta que **quita una palanca** premia mirarla antes; una carta que **asigna una tarea
nueva** no se puede aprovechar mirándola. **Escribe siempre las del segundo tipo.**» La nota de
diseño de esta ficha describe con precisión una carta del primer tipo, y sostiene que aun así el
que mire antes pierde. Contrastado con el criterio de éxito de A, no pierde: **ninguno de los
siete puntos de su «You did it if» exige el reclamo escrito**, así que se puede saltar la vía del
papel entera y aprobar igual.

No es mi auditoría —esto es de tensión—, pero tiene un arreglo barato que sí es de naturalidad:
**la carta también asigna una tarea**, y hoy no lo dice. Le entrega a A justo el dato que B lleva
tres turnos pidiendo. Cambiando el remate de la carta se convierte en una del segundo tipo sin
tocar un solo hecho:

> Actual: «If you were building the written-claim way out, read the box you have to answer again.»
> Propuesto: «Now you have the one thing they've been asking for — **the day, the hours and what
> the phone was doing**. What it's worth is up to you. And if you were building the written-claim
> way out, read that box again.»

### A.4 Nota sobre el presupuesto

El archivo declara 347 y 347 palabras de prosa. Recontadas con un contador tosco (que también
cuenta numerales y fragmentos de tabla) salen 365 y 363. La diferencia es de método, no de
contenido, pero en cualquiera de las dos lecturas **el margen es de unas pocas palabras**. Por
eso todas las correcciones de arriba van dentro de las tablas o sustituyen texto por texto de
la misma longitud; las dos únicas que añaden prosa (A.3.1 y A.3.5) **quitan** más de lo que
ponen o se compensan entre sí.

---

## B · VOCABULARIO

Este bloque tiene el problema **contrario** al del escenario 2. Allí 8 de las 10 entradas eran
la misma palabra en las dos fichas y la diferenciación entera vivía en la columna `here`. Aquí
solo **una** palabra está en las dos listas (`credit note`), y esa una está impecable: glosa
idéntica, columna `here` de productor en B y de receptor en A. Es el modelo.

El resto se diferenció tanto que se rompió, y se rompió en una dirección concreta:

| lo que B produce y A recibe | ¿en la lista de B, que la dice? | ¿en la de A, que la oye? |
|---|---|---|
| `credit note` | **sí** | **sí** ✓ |
| `extra data` | **no** | sí |
| `block` | **no** | sí |
| `alert` | **no** | sí |
| `written claim` | **no** | sí |
| `minimum term` | sí | **no** |
| `usage` | sí | **no** |
| `idle` | sí | **no** |
| `retention plan` | sí | **no** |

**Las cuatro palabras que constituyen la respuesta entera de B al punto 2 del cierre están en la
lista del que las escucha y no en la del que las tiene que decir.** Y las cuatro que A tiene que
reconocer para entender lo que le ofrecen están solo en la del que las suelta. El reparto está
del revés en ocho de nueve casos.

### B.1 Prueba de entrada, palabra por palabra

**ROL A**

| palabra | ¿llega al cierre sin ella? | veredicto |
|---|---|---|
| a bill | no | entra |
| a charge | no | entra — pero es la otra mitad de `a bill`; **funde con la anterior** y libera casilla |
| extra data | no | entra — **la glosa está mal**, ver B.4 |
| credit note | no | entra. La mejor fila de las veinte |
| a refund | a medias | **sobra tal como está.** La palabra aparece **una sola vez en todo el escenario: en su propia fila**. Ni en sus datos, ni en sus exponentes, ni en su criterio de éxito. Funde con `in cash`, que es el mismo movimiento |
| in cash | no | entra — pero **filtra la ficha del otro**, ver B.3.1 |
| to block something | no | entra — reencuadrar como receptor, y ver la colisión de B.2.2 |
| an alert | no | entra — **filtra un dato de B** (el 80 %), ver B.3.1 |
| a written claim | no | entra — la glosa se apoya en un idiom sin glosar, ver B.4 |
| to lend | no | entra. Bien elegida: *prestar* es el trampa clásico, y aquí es el verbo de la confesión |

**ROL B**

| palabra | ¿llega al cierre sin ella? | veredicto |
|---|---|---|
| credit note | no | entra ✓ |
| to take a charge off a bill | no | entra — la definición usa una palabra más difícil, ver B.4 |
| a cap | **sí, y por escrito** | **sobra.** Su propio exponente dice «mark the limit **without naming your cap**». Es una palabra que la ficha le prohíbe expresamente decir, y que A nunca va a oír. Sirve para leerse a sí mismo, que no es la prueba de §11 |
| usage | no | entra — **pero su propio exponente dice otra palabra**, ver B.3.2 |
| overnight | **sí** | **sobra.** Sus datos ya le dan el reloj («between two and five in the morning»), que es más claro y más A2. Y es un adverbio que A no tiene ninguna forma de recibir |
| idle | no | entra — **pero la columna `here` le dice lo contrario de lo que le exige su criterio de éxito**, ver B.2.3. Es el fallo más caro del bloque |
| a retention plan | no | entra — funde con `minimum term`, que es su precio |
| minimum term | no | entra — **y tiene que entrar también en A**, ver B.2.4 |
| a form | no | entra — `fill in` → `fill out`, ver B.4 |
| to escalate a case | a medias | **sobra hoy.** Solo vive en la prosa de su objetivo. El cierre habla de «what goes on paper», no de escalar, y A ya tiene la versión llana («it goes up»). La casilla hace más falta abajo |

### B.2 Lo que falta

Recorridos los datos duros, los exponentes, la carta y el cierre de cada rol, buscando lo que
tiene que decir o entender y no está en su bloque.

**B.2.1 · `extra data` no está en la lista del que la produce. (GRAVE)**
Es la línea de la factura por la que existe el escenario. Está ocho veces en el archivo, incluida
la fila de datos de B. La glosa B, no A: es su jerga de oficio, y su línea de caja de herramientas
le asigna el bloque 4 «for **three** bill words they've never heard». Tiene glosa propia para una
sola (`credit note`).

Y se puede reconstruir exactamente cómo se cayó: fase 6 la tenía **dos veces** en la ficha de B
—una fila de datos («Datos fuera del plan | *extra data — data over your 8 GB, paid apart from the
plan*») y un exponente (`Extra data is data over your 8 GB.`)—. Al pasar a fase 7, la fila de
datos se quitó bien (es trabajo del bloque de vocabulario) y el exponente se cortó por espacio,
pero **la entrada de vocabulario nunca se creó**. La palabra se fue por el hueco entre las dos
piezas.
**Arreglo:** entra en la lista de B, y vuelve el exponente que la glosa. `extra data — data your
plan does not pay for, over your 8 GB` · *here:* «the line they're fighting — **you** have to say
what it means».

**B.2.2 · `block` significa dos cosas distintas dentro de la misma tabla de B. (GRAVE)**
En los datos duros de B, con tres líneas de diferencia:

> `On your screen · block one | Sunday, July 26 · 1:10 to 7:40 p.m.`
> `The block and the alert | block: free, no extra data, from today`

El primero es un **tramo de consumo**; el segundo es la **barrera** que impide gastar de más. Son
las dos piezas centrales de B —su prueba y su solución— y comparten palabra. Su exponente
`I see two blocks here, not one.` usa la primera acepción; A tiene en su vocabulario `to block
something` con la segunda. Cuando B diga «two blocks», A va a entender que le están poniendo dos
bloqueos.

Es la colisión que en el escenario 2 estaba entre `emergency check` y `emergency room`, pero
aquí es peor, porque las dos acepciones son de la misma persona.
**Arreglo, y sale gratis:** **la barrera siempre en verbo, el tramo siempre en sustantivo.** «We
can **block** extra data, free, from today» / «I see two **blocks** of usage here». Con eso la fila
de datos de B pasa a `Blocking extra data | free, from today · only with an 8 GB plan`, y la
entrada de A pasa a `to block extra data`.

**B.2.3 · La columna `here` de `idle` le dice a B que se calle justo lo que su criterio de éxito le exige decir. (GRAVE)**
- Vocabulario: `idle — on, but nobody is using it` · *here:* «the phone in that second block:
  **your proof, and you can't show it**».
- Criterio de éxito, treinta líneas más abajo: «**out loud: two blocks of usage, and when** —
  nobody leaves blaming a twelve-year-old».

Lo que B no puede enseñar son los **cuatro reclamos idénticos** y la instrucción interna —eso
está bien escrito en su dato oculto—. La madrugada del 21 al 24 **sí** la puede decir, y decirla
es lo único que impide que esa pareja salga de ahí creyendo que los 42.000 los gastó un niño de
doce años. Tal como está, la fila desactiva el desenlace moral del escenario.
**Arreglo:** `idle` · *here:* «the second block — **say it out loud and explain the word**: it's
what clears the twelve-year-old».

**B.2.4 · `minimum term` está en el cierre compartido y no está en la lista de A. (GRAVE)**
El punto 1 del cierre, que las dos pantallas imprimen palabra por palabra y los dos tienen que
producir en voz alta, dice «credit note, gigas, or **change of plan with a minimum term**». La
entrada está en B y no está en A. No es transparente desde el español y no se deduce: *término
mínimo* no dice nada, la palabra que buscan es *permanencia*.

Es el mismo hueco que `branch` en el escenario 2, en el mismo sitio: **manda al español en el
momento del chequeo final**, que es el único punto del juego donde los dos tienen que decir lo
mismo.
**Arreglo:** entra en las dos listas. B (productor): «one of the three things your plan costs —
**you** have to say it before anybody signs». A (receptor): «the months you can't leave — ask how
many **before** you say yes».

**B.2.5 · `nephew` no está en ninguna de las dos listas, y es el sustantivo que carga la confesión. (GRAVE)**
Está dos veces en el archivo —el dato oculto de A y la fila «If you have to say it»— y en ninguna
de las veinte filas de vocabulario. *Sobrino* → *nephew* no es cognado, y es la palabra que A
tiene que producir en el momento más difícil del juego y que B tiene que entender para escribirla
en el formato. Su criterio de éxito habla de «a twelve-year-old» precisamente porque la palabra
no existe en su ficha.
**Arreglo:** se pliega dentro de `to lend`, como el escenario 2 pliega `sharp` dentro de
`chipped`. `to lend — to give a thing to someone for a short time` · *here:* «your phone, one
Sunday, to your **nephew** (your sister's son), twelve years old». Y `nephew` entra igual en la
lista de B, plegada donde toque: la va a oír una sola vez y tiene que escribirla.

**B.2.6 · `a written claim` no está en la lista del que lo tramita. (medio-grave)**
A lo tiene. B, que es quien lo redacta, quien no puede negarlo si se lo piden y quien tiene que
decir su número en el chequeo final del cierre, no. Y el punto 3 del cierre —«what goes on paper
and what stays open»— es suyo tanto como de A.
**Arreglo:** entra en B, con `here` de productor: «you write it, they sign it — **if they ask for
it you can't say no**, and the number goes back to them».

**B.2.7 · `to drop a call`: A tiene el dato y no tiene el verbo, y el verbo natural es pasivo. (medio)**
«The two calls to the call center | two calls, more than thirty minutes each · **both cut off**».
Es uno de los argumentos fuertes de A. Para decirlo, el inglés natural es pasivo (*the call was
cut off*) y la pasiva está prohibida en el nivel. La única alternativa que la ficha le da está en
otra fila y con otra palabra: «the connection **drops** a lot». Dos palabras para el mismo suceso,
ninguna enseñada.
**Arreglo:** `to drop a call — when a phone call stops before you finish` · *here:* «twice, more
than thirty minutes each — **the reason you came in person**». Y unificar la otra fila a `drops`.

**B.2.8 · Huecos menores, por orden de riesgo. (leve)**
- **`to share data`** (A): es el verbo de la carta y **la actividad que B necesita para el
  formato**. Se salva a medias porque *compartir* es cognado, pero la distinción *mobile data* /
  *wifi* es justo la que un A2 confunde y es el eje del escenario. Cabe plegada en `extra data`
  de A: «· and what you can do with it: **share** it with another screen».
- **`time off work`** (A): está en su prosa («a morning off work you don't have») y es su
  contenido más probable para el bloque 5 de la caja. Se resuelve solo si se aplica A.3.2, que ya
  reescribe esa fila.
- **`gigas`** (A): B lo va a decir en su exponente. En Colombia se usa en español, así que el
  riesgo es bajo; lo dejo apuntado y no gasto casilla.
- **`digit`** (los dos): está en el cierre común, que los dos leen. Es transparente. Leve.

### B.3 Reparto: quién produce y quién recibe

**B.3.1 · Dos celdas de A le cuentan a A la ficha de B. (medio-grave)**
§2 del blueprint: «La ficha del rol A **no contiene nunca** la ficha del rol B. Ni resumida.» Y
§11 avisa de que la columna `here` es la más calcable de la ficha entera. Aquí se juntan las dos
cosas:

- `in cash` · *here:* «**the one form they will not give you**». Eso es la restricción 2 de B,
  literal, en la pantalla de A. Si A ya sabe que no hay efectivo, no lo pide, y **la negativa de
  B nunca ocurre** —con ella se pierde todo el bloque 7 que la ficha de B tiene asignado—.
  **Arreglo:** «the form you walked in for — **ask for it**».
- `an alert` · *here:* «the one at **80 %** that never came». El 80 % es dato de B («the 80 %
  alert: in the app only»). A no lo puede saber: no le llegó nada. Y saberlo desactiva su propia
  pregunta, que es una de las dos que su criterio de éxito le exige hacer.
  **Arreglo:** «the word **they'll** use for the message that never came».

Media más, menor: `to block something` · *here:* «what keeps next month's bill clean» presenta el
bloqueo como algo que A ya conoce, cuando es la carta de B. Reencuadrar: «they'll offer it —
it's the piece your deal has to have».

**B.3.2 · Tres nombres para la misma cosa, y el que va a salir por la boca de B no es el que A tiene marcado. (medio)**
- Vocabulario de B: `usage`.
- Criterio de éxito de B: «two blocks of **usage**».
- Exponente de B, el único que va a decir en voz alta: `I see two **blocks** here, not one.`
- Vocabulario de A: nada.

Es el hallazgo `slot` / `free time` del escenario 2, calcado.
**Arreglo:** una sola palabra en las tres capas. `I see two blocks of usage here, not one.` — y
con eso, más el arreglo de B.2.2, `block` y `usage` dejan de pisarse.

Lo mismo, un grado más suave, con **`alert`**: A tiene la palabra en su vocabulario, su exponente
dice `Why didn't I get a **message**?` y B dice `The **alert** only works in the app.` Aquí la
mezcla es defendible —el lego dice «message», el que atiende dice «alert»— pero hay que decirlo en
la celda, no dejarlo a la suerte: `an alert` · *here:* «**their** word for the message that never
came — you can say *message*, they'll say *alert*».

**B.3.3 · `to lend` en A, nada en B. (leve)**
B tiene que entender «I lent my phone to my nephew» y convertirlo en una casilla de formato.
*Prestar* cubre *lend* y *borrow* a la vez, así que el error va a salir. Con el pliegue de B.2.5
queda resuelto en las dos fichas a la vez.

**B.3.4 · `a refund` y `in cash` en A, nada en B. (leve)**
B tiene que **negarlas**, y son el primer «no» de la conversación. Con la fila de `to take a
charge off a bill` cerca, es suficiente contexto; lo dejo apuntado por si sobra casilla.

### B.4 Definiciones que usan una palabra más difícil que la que definen

Seis, y la primera está en la palabra que da nombre al escenario.

| entrada | qué falla | arreglo |
|---|---|---|
| `extra data` (A) — «data over your 8 GB, **paid apart from the plan**» | *apart from* en inglés significa «excepto», no «aparte de». Es un calco del español, y la frase se lee «pagado excepto el plan». La definición es más opaca que el término | «data over your 8 GB — **your plan does not pay for it**» |
| `in cash` (A) — «in **bills** and coins, in your hand» | `a bill` es la **fila 1 de la misma lista**, definida como el papel que se paga. Dos sentidos del mismo sustantivo a diez líneas de distancia, en la lista de un A2 | «in **paper money** and coins, in your hand» |
| `a written claim` (A) — «a paper the shop writes, you sign, and **it goes up**» | *goes up* es idiom opaco: un A2 lee «sube». Y es la versión llana de `escalate`, que en la lista de B **sí** está bien glosada («to send it up to **another office**») | «a paper the store writes, you sign, and it goes **to another office**» |
| `to take a charge off a bill` (B) — «to **remove** money from what somebody pays» | *remove* es más difícil que *take off*. Definir un phrasal con un cultismo | «to take money **out of** what somebody has to pay» |
| `a cap` (B) — «the most one person is **allowed to** give» | *the most* como sustantivo + *be allowed to*, dos estructuras por encima de la palabra. (Si se aplica B.1, la fila desaparece) | — |
| `a form` (B) — «a paper with boxes you **fill in**» | phrasal para definir, y en americano es `fill out` (§11) | «a paper with boxes you **write in**» |

Media entrada más, estructural: `credit note` (A) — la columna `what it is` empieza con «**a word
you will hear**: money on your next bill, not cash». Eso es contenido de la columna `here`
metido en la de la definición. Las dos cosas están bien dichas, están en la casilla equivocada.

Y una nota sobre `credit note` como término, que no es de nivel sino de variedad: en inglés
americano, una operadora de celular no dice *credit note* (que es contabilidad B2B), dice **a
credit on your next bill**. §11 fija variedad americana. Cambiarlo toca el `rationale` de
`relative-clauses-a2`, así que lo dejo como decisión consciente y no como corrección: si se
cambia, el exponente queda `A credit is money which goes on your next bill.` y sigue anclando el
relativo igual de bien.

### B.5 Las dos listas, como quedarían

Cabe todo dentro de 10 filas por rol, sin tocar prosa.

**Rol A** — se funden `a bill` + `a charge` en una fila (son el papel y sus renglones) y `a
refund` + `in cash` en otra (son el mismo movimiento). Eso libera **dos** casillas, que van a
`minimum term` (B.2.4) y `to drop a call` (B.2.7). `nephew` se pliega dentro de `to lend` y
`to share data` dentro de `extra data`. Se reescriben las columnas `here` de `in cash`,
`an alert` y `to block extra data` (B.3.1), y las definiciones de `extra data`, `in cash` y
`a written claim` (B.4).

| | fila |
|---|---|
| 1 | a bill / a charge |
| 2 | extra data *(+ to share it)* |
| 3 | credit note |
| 4 | a refund, in cash |
| 5 | to block extra data |
| 6 | an alert |
| 7 | a written claim |
| 8 | to lend *(+ nephew)* |
| 9 | minimum term ← **nueva** |
| 10 | to drop a call ← **nueva** |

**Rol B** — salen `a cap` (le está prohibido decirla), `overnight` (el reloj de sus datos hace el
mismo trabajo) y `to escalate a case` (solo vive en su prosa). Se funden `a retention plan` +
`minimum term`, que son la oferta y su precio. Las cuatro casillas que quedan van a las cuatro
palabras que hoy produce sin tener: `extra data`, `to block`, `an alert`, `a written claim`. Se
reescribe la columna `here` de `idle` (B.2.3) y las definiciones de `to take a charge off a bill`
y `a form` (B.4).

| | fila |
|---|---|
| 1 | extra data ← **nueva** |
| 2 | credit note |
| 3 | to take a charge off a bill |
| 4 | usage |
| 5 | idle *(`here` reescrita)* |
| 6 | to block extra data ← **nueva** |
| 7 | an alert ← **nueva** |
| 8 | a retention plan *(+ minimum term)* |
| 9 | a form |
| 10 | a written claim ← **nueva** |

Con esto, las palabras que los dos manejan están en las dos listas —cada una con `here` de
productor en B y de receptor en A, como ya está `credit note`— y las que solo toca uno, en una
sola.

**Y las tablas de exponentes, que es donde está el problema grave:**

- **B pasa de 9 a 10** (dentro del 6-10 de §10). Sale `When did it start?` —ya sabe cuándo
  empezó, y el condicional nuevo lo subsume—. Entran tres: `I'm sorry about this charge.`
  (A.2.2), `If you give me the day and the hour, I'll block it today.` (A.2.1, que resuelve el
  bloqueo, el «desde cuándo» y el trueque en una sola línea), y la ampliación de la fila que ya
  existe a `I see two blocks of usage here — and in the second one, nobody was using the phone.`
  (B.2.3 + B.3.2, sin gastar fila). Se suaviza `Just to check — was the phone with you all
  month?` (A.2.5). Vuelve `Extra data is data over your 8 GB.` — o se acepta que la glosa viva
  solo en el vocabulario, y entonces B se queda en 9.
- **A pasa de 9 a 10.** `I want` → `I'd like` (A.2.6, sin coste). Entra `I think there's a mistake
  on my bill.` como apertura (A.2.6). Y queda pendiente `And the other 17,000?` —que es la forma
  del acuerdo parcial, que los `grammarReferences` prometen en el `rationale` de `quantifiers` y
  que no existe en ninguna tabla—: si no cabe, sale de fundir las dos filas de «measure what they
  offer».

---

## Resumen de correcciones, por gravedad

| # | Qué | Dónde |
|---|---|---|
| 1 | B no tiene ningún exponente que ofrezca el bloqueo, diga «desde cuándo» ni cambie el dato por el dinero — y es el punto 2 del cierre | A.2.1 |
| 2 | No hay una disculpa en toda la ficha (`sorry` = 0), y la prueba de los tres turnos la exige en el turno 2 de B | A.2.2 |
| 3 | El objetivo de B dice «dos cosas que solo ellos tienen» y sus datos duros le dan una de las dos en pantalla | A.3.1 |
| 4 | `block` significa dos cosas distintas en la misma tabla de B: el tramo de consumo y la barrera | B.2.2 |
| 5 | La columna `here` de `idle` le prohíbe a B lo que su criterio de éxito le exige decir | B.2.3 |
| 6 | `minimum term` está en el cierre compartido y no está en la lista de A | B.2.4 |
| 7 | `extra data` no está en la lista del que la produce — se cayó entre la fila de datos y el exponente | B.2.1 |
| 8 | `nephew` no está en ninguna de las dos listas, y es el sustantivo de la confesión | B.2.5 |
| 9 | La ficha de B se contradice sobre quién abre: «They start» vs «you're the counter, you open» | A.2.3 |
| 10 | Dos celdas `here` de A le cuentan la ficha de B: el no-efectivo y el 80 % | B.3.1 |
| 11 | `a written claim` no está en la lista del que lo tramita | B.2.6 |
| 12 | La restricción de «no lo resuelvas por teléfono» desapareció y sus dos filas de datos se quedaron huérfanas — y reabre una salida barata | A.3.2 |
| 13 | El internet de casa perdió su motivo, y era el argumento entero de una de las tres salidas | A.3.3 |
| 14 | La pregunta que la ficha llama incómoda no lleva amortiguador | A.2.5 |
| 15 | A no tiene apertura atenuada y su única petición directa está a pelo (`I want`) | A.2.6 |
| 16 | El cierre pide un número de nota crédito o de radicado que no existe en ninguna tabla | A.2.9 |
| 17 | A tiene que hacer entender la carta y no tiene media ración del bloque 4 | A.2.7 |
| 18 | Tres nombres para el consumo (`usage` / `blocks` / nada en A); ídem `alert` / `message` | B.3.2 |
| 19 | «Cancel the line, or threaten another company» no dice lo que se quiso decir | A.2.8 |
| 20 | Definiciones más difíciles que la palabra: `extra data`, `in cash` (choca con `a bill`), `a written claim`, `to take a charge off`, `a form` | B.4 |
| 21 | `a cap`, `overnight`, `to escalate a case` y `a refund` no pasan la prueba de entrada | B.1 |

Y cuatro notas sin gravedad asignada:

- **La carta está fechada a las 11:05 en una conversación que acaba sobre las 10:47** (A.2.10).
  Es el segundo escenario de dos auditados con el mismo fallo: **conviene revisar los ocho**.
- **La carta es del tipo que §9 manda no escribir nunca** (A.3.7). No es mi encargo —es de
  tensión—, pero el remate propuesto la convierte en una del tipo bueno sin tocar un hecho.
- **`soccer`/`football` y `shop`/`store`** (A.2.11): variedad americana, §11.
- **El bloque de cierre está en un apartado común y no impreso dentro de las dos fichas.** La
  cabecera del archivo declara que sí va al pie de las dos pantallas; la puerta 7 pide que esté
  escrito **dentro**. Misma nota que en el escenario 2.
