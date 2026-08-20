# Habla acompañada — inglés A2 · Fase 7 · Escenario 1: naturalidad y vocabulario

Auditor: `habla-auditor-naturalidad`. Fecha: 20 de agosto de 2026.
Objeto auditado: `artifacts/habla-a2/fase7-fichas-1-the-bike-in-the-parking-lot.md`.
Contrastado contra: `artifacts/habla-a2/caja-de-herramientas-a2.md`,
`artifacts/habla-a2/fase7-modelo-ficha-en.md` (el molde),
`artifacts/habla-a2/fase4-fichas-1-3.md` y `fase6-fichas-1-3.md` (las dos versiones anteriores,
para ver qué se cayó al recortar) y `artifacts/habla-a2/fase5-naturalidad-1-6.md` (mi informe
anterior, donde varios de estos arreglos se dieron por cerrados).
Fuente de verdad: `docs/habla-acompanado-blueprint.md`, §3 y §10, más §11 para el bloque nuevo.

---

## Veredicto

**Pasa con cambios.** El motor está intacto y la aritmética del escenario es correcta: el tope de
B (350.000 en efectivo) y el suelo de A (390.000 con los cambios nuevos) dejan los 40.000 que
anuncia la cabecera; 350.000 + 70.000 de Nequi = 420.000, el precio publicado exacto; y el suelo
de A no es un capricho, es lo que le falta para la bicicleta de ruta (750.000 − 360.000 =
390.000). Nadie regatea y aun así el precio se mueve. Eso es difícil y está bien hecho.

Lo que no está bien es de dos clases, y las dos vienen del recorte:

1. **Al migrar el andamiaje a la caja común, cuatro formas que esta conversación necesitaba se
   quedaron sin sustituto.** Dos de ellas —los saludos propios de cada rol— las validé yo mismo
   como cerradas en fase 5 (hallazgo H1.1), y ya no están. El bloque de la caja al que apunta la
   ficha para taparlas no las contiene.
2. **El bloque de vocabulario, que es pieza nueva, tiene cuatro palabras que sobran y al menos
   cuatro huecos que mandan a la pareja al español**, incluida la palabra sobre la que gira la
   carta de la complicación (`truck`).

Y hay una avería aparte, de gravedad: **una línea del dato oculto de B contradice a su propia
tabla de datos duros y desactiva la carta.**

**19 hallazgos: 6 graves, 8 medios, 5 leves.** Ninguno obliga a rehacer el escenario. Todos
menos dos se arreglan dentro de tablas, que no cuentan contra el presupuesto de prosa —y ahí
está el margen, porque las dos fichas están a 348 y 354 palabras contadas por mí, es decir, al
tope.

---

# A · NATURALIDAD

## A.1 · Lo que se cayó al recortar

Esta es la parte que pediste mirar, y es donde está lo peor. Las cuatro formas siguientes
existían en `fase4-fichas-1-3.md`, se perdieron al pasar a fase 6 y fase 7 no las ha recuperado.
No es que se hayan sustituido por otra cosa: se sustituyeron por un puntero a un bloque de la
caja que no tiene esa forma dentro.

### N1 · **GRAVE** — Los dos saludos propios del escenario desaparecieron, y la caja no los cubre

`fase4` daba a cada rol su apertura, escrita para esta escena:

| rol | forma que había | qué hacía |
|---|---|---|
| A | `Hi — are you here for the bike?` | abrir cuando el otro llega y se queda mirando la rueda |
| B | `Good morning. Thanks for coming down with it.` | reconocer que el otro bajó cuatro pisos a esperarte |

En fase 5 di este hallazgo por cerrado, textualmente, con esas dos formas como evidencia. En
fase 7 no hay ninguna de las dos, y la ficha manda a la caja:

- **A → bloque 1 `[grants]`.** Las dos formas `[grants]` de la caja son
  `Good morning. How can I help you?` («you're the one behind the counter») y
  `Come in. What's going on?` («you called them, not the other way round»). A no está detrás de
  un mostrador y no llamó a nadie: contestó un mensaje de Marketplace. La primera le hace sonar
  a dependiente; la segunda es directamente falsa.
- **B → bloque 1 `[asks]`.** Las tres formas `[asks]` son
  `Excuse me, do you have a minute?`, `Sorry to bother you.` y `Hi — can we talk for a second?`.
  Las tres son de quien interrumpe a un desconocido. **B tiene una cita**: escribió anoche y el
  otro bajó a esperarlo. Pedir permiso para hablar en una cita que tú pediste no lo dice nadie.

Le queda a B `I'm here about…`, que es la única fila que sirve, y a A no le queda nada.

**Arreglo.** Devolver una fila de apertura a cada tabla de exponentes —cuestan cero palabras de
prosa— o, mejor, añadir a la caja una fila `[grants]` de igual a igual, que hace falta también en
otros escenarios:

| función | forma | qué hace aquí |
|---|---|---|
| opening (A) | `Hi — are you here for the bike?` | abrir tú, cuando el otro llega y se queda mirando |
| opening (B) | `Good morning — thanks for coming down with it.` | reconocer los cuatro pisos antes de empezar a bajarle el precio |

Y en la caja, bloque 1: `Hi — you must be the one who wrote last night.` `[grants]`, para cuando
la cita estaba puesta y nadie interrumpe a nadie.

### N2 · **GRAVE** — El bloque 6 está asignado a los dos y sus cinco formas no las diría nadie aquí

La ficha manda a los dos roles al bloque 6 —callar sin mentir— y lo hace en el punto exacto donde
la conversación se decide:

> A: «**6** (offer the old gears back and they'll ask why: that's where the secret leaks)»
> B: «**6** (you have something you can't say)»

La ficha ha identificado bien el momento. El problema es lo que hay dentro del bloque:
`I can't say why, sorry.` · `It's personal.` · `It's a family thing.` ·
`I just can't do that day.` · `Can we leave it there?`

Las cinco son negativas a contestar. Sirven en una consulta médica o en un jefe que pregunta de
más. **En un trato entre dos desconocidos por una bicicleta, negarse a contestar «¿por qué le
quitarías los cambios?» con «It's personal» convierte al vendedor en un sospechoso y mata el
trato.** Lo que hace falta aquí no es negarse: es **contestar vago**. Y eso lo tenía `fase4`, en
la ficha de B, y se perdió:

> `That's not important right now.` — «cerrar un tema que no te conviene abrir, sin mentir»

(La forma equivalente de A en fase 4, `I'd rather not say why.`, se cayó con razón: `would
rather` está en la lista de estructuras prohibidas del nivel. Pero se cayó sin sustituto.)

**Arreglo.** Añadir a la caja, bloque 6, dos filas de respuesta vaga —que es lo que le falta al
bloque entero, no solo a este escenario—:

| Form | When you use it |
|---|---|
| `That's not important right now.` | close a subject that doesn't help you, without lying |
| `I have a use for it.` / `I have a reason.` | give an answer that is true and says nothing |

La segunda es exactamente lo que A necesita cuando le preguntan por los cambios viejos, y es la
diferencia entre que el secreto se filtre bien (por presión) o mal (por silencio raro).

### N3 · **MEDIO** — A se queda sin ninguna forma de decir por qué esto le importa

La ficha le dice a A: «**Not 5**: yours isn't a reason, it's a receipt.» La frase es buena y en
parte es verdad —A tiene una factura que puede enseñar—. Pero A tiene también una razón que no
es una factura y está escrita en su propia ficha: **cuatro pisos sin ascensor, otro sábado
bloqueado, y la bicicleta de ruta que no llega**. Eso es «lo que yo pierdo», que es literalmente
la definición del bloque 5 en la caja, y es el argumento que hace que su prisa no suene a
capricho.

En `fase4`, A tenía `It's important for me because…`. Hoy no tiene nada: se le negó el bloque 5 y
no se le dio sustituto propio.

Su exponente `It can't stay here after today.` glosado como «say what pushes you, without asking
for pity» intenta cubrirlo, y cubre la mitad —la obligación—, no la otra mitad —el coste—.

**Arreglo.** Una fila más en la tabla de A, coste cero de prosa:

| función | forma | qué hace aquí |
|---|---|---|
| today's clock | `If it doesn't go today, I carry it up four floors again.` | lo que él pierde, en una imagen, sin pedir lástima |

### N4 · **MEDIO** — El cierre perdió la forma que llevaba la hora dentro

`fase4` cerraba con `Thanks — see you at…, then.`, cuya gracia era que la despedida **obligaba a
decir la hora**, que es el dato 3 del criterio de cierre. La caja tiene `OK. See you tomorrow,
then.`, que lleva un día pero no una hora, y aquí todo pasa hoy.

**Arreglo.** Cambiar la fila de la caja a `OK. See you at …, then.` («someone you'll see again»
sigue valiendo) o devolver la forma con hora a las dos tablas de exponentes.

### N5 · **MEDIO** — B refuta tres veces y tiene una sola forma de rechazar

La ficha le dice a B: «**Not 7** — … you don't grant». Correcto por poder: el que concede es A.
Pero **rechazar no es lo mismo que conceder**, y B rechaza como mínimo tres veces: los 420.000
del anuncio, los 390.000 del suelo de A, y la petición de que suelte el dinero de Nequi. Su único
exponente de rechazo es `That's more than I can pay today.`

Dicho tres veces seguidas suena a bucle, y el tercer «no» de un A2 sin forma disponible sale en
español.

**Arreglo.** No hace falta darle el bloque 7 entero —eso desdibujaría el reparto de poder—.
Basta una fila propia:

| función | forma | qué hace aquí |
|---|---|---|
| the price | `I hear you, but that's not going to work for me today.` | segundo «no» que no repite el primero |

O bien marcar en la caja que la mitad amortiguadora del bloque 7 (`I want to help, but…`,
`The thing about that is…`) es de los dos y solo la mitad concesiva es `[grants]`.

### N6 · **MEDIO** — Nadie tiene una forma de decir que sí

El escenario cierra en **acuerdo**. El criterio de cierre exige que los dos digan cuatro datos en
voz alta y comprueben que dicen lo mismo. La caja da la comprobación (`So, we're clear then.`,
`Is that OK for you?`) y da el agradecimiento. **No da el momento del sí.** No hay
`OK — deal.`, `That works for me.`, `Let's do that.` en ningún sitio: ni en la caja ni en las
dos tablas de exponentes.

Es un agujero del conjunto, no de este escenario, y por eso el arreglo va a la caja:

| Form | When you use it | Register |
|---|---|---|
| `That works for me.` | you accept, and you want it on the record | neutral |
| `OK — deal.` | you accept and you close, in two words | informal |
| `Let's do that, then.` | you pick one of the options on the table | neutral |

### N7 · **LEVE** — Se perdió el apretón de manos y no pasa nada

El registro de `fase6` decía «se saluda, **se da la mano**, no se levanta la voz». Fase 7 deja
«nobody raises their voice». La instrucción física no hace falta en pantalla. Lo anoto solo para
que conste que la revisé y que la pérdida es deliberada y correcta.

## A.2 · Restricciones, datos ocultos y objetivos que perdieron su porqué

### N8 · **GRAVE** — El dato oculto de B contradice su propia tabla y desactiva la carta

Dos líneas separadas por quince renglones:

> **Only you know** — «Brother-in-law through Cabecera today, 6:00 p.m., with a truck — confirmed
> last night. **Without it, no way to get the bike out of here.**»

> **Facts** — «If not the truck | car with an app, about 22,000 · or ride it home on that tire»

O no hay manera de sacarla, o hay dos y cuestan 22.000 y una llanta. No las dos cosas.

En `fase6` la primera línea llevaba una coletilla que arreglaba la mitad del problema: «con esa
llanta no te vas montado hasta Floridablanca». Al recortar se quedó el absoluto y se fue la
explicación.

**Y esto no es una errata de estilo: rompe la complicación.** La nota de diseño de la carta dice,
correctamente, que «las alternativas cuestan lo mismo leídas antes o después». Ese razonamiento
depende de que las alternativas **existan y B lo sepa**. Un estudiante que se quede con «no way
to get the bike out of here» lee la carta a las 10:34 y da el escenario por muerto: no negocia el
transporte, lo abandona. La carta, que está puesta para abrir la segunda variable, la cierra.

**Arreglo.** Reescribir la línea del dato oculto para que diga lo que de verdad pierde:

> Brother-in-law through Cabecera **today, 6:00 p.m., with a truck** — confirmed last night.
> Without it, moving the bike costs money you counted for the tire.

### N9 · **MEDIO** — «One payment» dice una cosa y el resto de la ficha dice otra

El objetivo de A es «The bike out of here **today**, **one payment**». Pero:

- su propio exponente es `Cash, or part by Nequi?` — que es proponer **dos** pagos;
- el criterio de cierre compartido dice «all cash, **or how much cash and how much by Nequi**».

Lo que «one payment» quiere decir es «hoy y completo, no a plazos». Eso no está escrito en
ninguna parte, y un A2 lee «one payment» literalmente. Viene de `fase6`, no lo creó el recorte,
pero en una ficha de 348 palabras chirría más.

**Arreglo.** `**paid in full today** — no installments`, y el conflicto desaparece.

### N10 · **MEDIO** — «gear change 15,000» significa otra cosa de la que parece

En la tabla de datos de A: «La Bici Roja, two blocks | rear tire fitted 38,000 · **gear change
15,000** · closes 1:00 p.m.»

Un estudiante A2 lee «gear change» como *cambio de marcha*, no como *mano de obra de volver a
montar el juego viejo*. Y ese número es precisamente el coste de la jugada que decide el
escenario: si A no entiende su propia cifra, la jugada no se hace.

**Arreglo.** `putting the old gear set back on: 15,000`.

### N11 · **LEVE** — La restricción 2 de B y la carta se rozan sin decirse

Restricción: «Move the 70,000 in Nequi unless it buys something **inside the deal**». Cuando llega
la carta, la salida natural de B es pagar los 22.000 del carro con app — ¿eso está «dentro del
trato»? El criterio de cierre dice que quién la mueve **sí** es uno de los cuatro datos del
trato, así que sí. Pero la ficha no lo dice y la ambigüedad cae justo en el turno más caro.

**Arreglo.** Media línea en la restricción: «…inside the deal — **moving it counts**».

### N12 · **LEVE** — Restricciones y datos ocultos que SÍ conservaron su motivo

Lo anoto porque lo revisé uno a uno y conviene que conste:

| pieza | motivo | ¿sobrevivió? |
|---|---|---|
| A, restricción 1 (390.000) | 750.000 − 360.000 ahorrados | **sí**, pero solo por aritmética; nadie lo dice |
| A, restricción 2 (no se queda) | el portero, dos veces | sí |
| A, restricción 3 (no desmontar aquí) | es taller, y cierra a la 1:00 | sí |
| A, dato oculto (los cambios) | le sirven para la de ruta → puede bajar a 330.000 | sí, con la cuenta hecha |
| A, «si te vas sin nada» | cuatro pisos, quinto comprador, la de ruta parada | sí |
| B, restricción 1 (350.000) | tope duro | sí |
| B, restricción 2 (Nequi) | está apartado para llanta, sillín y candado | sí |
| B, restricción 3 (no digas que es la única) | «say it and nothing moves» | sí |
| B, dato oculto (la camioneta) | **ver N8** | **no** |
| B, el bus | 6.400 al día · 32.000 a la semana | sí, aunque pasó de dato oculto a dato duro |

Sobre la primera fila: la resta que justifica los 390.000 es elegante y funciona, pero está
enterrada. Seis palabras en «Only you know» —`390,000 = what the road bike still needs`— y la
restricción deja de parecer arbitraria sin regalar nada, porque la carta de A no es el número: es
que puede bajar a 330.000 quedándose los cambios.

---

# B · VOCABULARIO

La prueba es la de §11: **¿puede este rol llegar al cierre sin esta palabra?** Si puede, sobra.
Y la del §10: **la del que suelta la jerga no es la del que la recibe.**

## B.1 · Rol A, palabra por palabra

| palabra | ¿pasa la prueba de entrada? | veredicto |
|---|---|---|
| gear set | sí — restricción 1, dato oculto, dos exponentes | **queda** |
| brake pads | no llega al cierre por sí sola… | **queda, justificada**: la ficha la nombra como una de las tres palabras de jerga que A tiene que reformular (bloque 4). Su definición **es** la reformulación. Si hubiera que cortar una, sería esta |
| worn out | sí — dato 4 del cierre | **queda**, y bien repartida: A la recibe («they'll say it before you do»), B la produce |
| to fit | sí — es la carta oculta | **queda**, con reparo: ver V1 |
| receipt | sí — exponente y prueba de la cifra | **queda** |
| to throw something in | sí — es el mecanismo entero de la concesión | **cambiar**: ver V2 |
| lock | sí — 45.000 que puede regalar | **queda**, definición mal: ver V3 |
| to drop the price | **no** | **fuera**: ver V4 |
| the frame | **no** para A | **fuera de A**: ver V5 |
| in cash | sí — dato 1 del cierre | **queda**, y está bien repartida: misma definición, `here` distinto en cada rol. Es el modelo de cómo debería estar la fila `the frame` |

### V1 · **MEDIO** — La fila `to fit` regala el secreto ya redactado

`| to fit | to be the right size for something | *the new gears fit my next bike* — why you'd take them off |`

El molde permite fragmentos decibles en la columna `here` (`*I'm off on Friday the 18th*`,
`*sixteen hours in a row*`), así que la cursiva en sí no es el problema. El problema es **cuál**
frase se regala: esta es exactamente el dato oculto de A, servido como oración completa y
decible. La ficha dice tres líneas más arriba «Say it in turn one and you give it away» y luego
se la deja escrita para que la lea en voz alta.

**Arreglo.** Dejar el uso sin la frase: `why you'd want them back — and you can't say it yet`.

### V2 · **GRAVE** — `to throw something in` enseña justo la estructura que el nivel prohíbe

La caja declara, en su cabecera, que todo está «verificado contra las estructuras prohibidas», y
una de ellas es «**phrasal separable con pronombre en medio**». La forma de cita
`to throw something in` presenta el hueco en el centro; el A2 que la aprenda dirá
`I can throw them in`, que es exactamente la forma prohibida, y lo dirá porque se lo enseñó la
ficha.

Además es idiomática de más para A2: es lenguaje de vendedor experimentado.

**Arreglo.** Sustituir por `to include`, transparente por *incluir*, y que además cuadra el
reparto con B: **A incluye, B pregunta si viene incluido.**

| word | what it is | here |
|---|---|---|
| to include | to put it in the price without asking for more money | the lock, the lights — instead of cutting the number |

### V3 · **MEDIO** — La definición de `lock` describe otra cosa

`| lock | the metal chain you close a bike with |`

Un candado no es una cadena, y en inglés una bicicleta no se «cierra», se `locks`. La definición
esquivó la circularidad (definir *lock* con *lock*) y se fue a un objeto distinto y a un verbo que
no se usa así.

**Arreglo.** `the thing you put on a bike so nobody takes it`.

### V4 · **GRAVE de conjunto, aunque parezca menor** — `to drop the price` es la palabra de un juego que este escenario prohíbe

La cabecera de la ficha dice, en negrita, **«Ninguno de los dos regatea»**. Toda la mecánica está
construida para que el precio se mueva solo cuando se mueve otra cosa. Y luego el bloque de
vocabulario de A le entrega la palabra del regateo.

Prueba de entrada: A no la produce nunca —su exponente es `I can't go under…`—; B tampoco la
tiene ni la necesita —los suyos son `That's more than I can pay today` y `Maybe we can…`—. **No la
produce nadie.** Es una palabra para un movimiento que el escenario ha prohibido, en la ficha del
rol que más tiene que resistirse a hacerlo.

**Fuera.** Su hueco es donde entra `cable` (V6).

### V5 · **MEDIO** — `the frame` es la misma fila, palabra por palabra, en las dos fichas

| rol | word | what it is | here |
|---|---|---|---|
| A | the frame | the metal tubes, the body of the bike | where the scratch is |
| B | the frame | the metal tubes, the body of the bike | where the scratch is |

Idéntica en las tres columnas. §11 pide «solo las de **este** rol en **este** escenario», y §10
pide que la del que produce no sea la del que recibe. Aquí no se distinguió ni el uso.

Compárese con `in cash` y con `worn out`, que sí están diferenciadas en la columna `here` en las
dos fichas: se sabe hacer, aquí no se hizo.

**Arreglo.** Fuera de A (A la recibe, y su tabla de datos ya la trae en inglés). En B, la fila se
queda pero con el `here` de quien la produce: `you're pointing at it while you say the price`.
Si hace falta el hueco en B, se puede cortar también de B: el cierre no exige nombrar el cuadro,
y `a scratch here` resuelve.

### B.2 · Rol B, palabra por palabra

| palabra | ¿pasa la prueba de entrada? | veredicto |
|---|---|---|
| second-hand | **no** | **fuera**: no aparece en ningún dato duro ni en ningún exponente de B, y el cierre no la toca. Además el molde manda inglés americano y el americano dice **`used`**, no `second-hand` |
| worn out | sí — la produce B, dato 4 del cierre | **queda** |
| torn | sí — el sillín, y la cuenta de los 70.000 | **queda** |
| a scratch | sí — la produce B | **queda** |
| the frame | ver V5 | **rehacer o fuera** |
| to fix | sí — dato 4 del cierre («who fixes it») | **queda** |
| to come with | sí — es su manera de pedir sin pedir rebaja | **queda**, con dos reparos: V7 y V8 |
| in cash | sí — su tope y el dato 1 del cierre | **queda** |
| round trip | **no** | **fuera**: el bus es su argumento del bloque 5 y se dice con `6,400 a day`; `round trip` no aparece en ningún exponente y no toca el cierre. Palabra buena, americana y correcta —pero no aquí |
| to pick something up | sí — está en su objetivo y en el cierre | **queda**, y ver V10 |

### V6 · **GRAVE** — Los cuatro huecos que mandan a la pareja al español

Recorrí los datos duros y los exponentes de cada rol buscando lo que hay que decir o entender y
no está en su bloque. Estos cuatro son de primera clase: sin ellos no se llega al cierre.

| falta en | palabra | dónde está en la ficha, sin glosa | por qué es de primera clase |
|---|---|---|---|
| **A** | `cable` | tabla de datos («new gear set, brake pads, cable — 95,000») **y en la propia línea del bloque 4**: «*gear set*, *brake pads*, *cable* are your words» | La ficha nombra tres palabras de jerga que A tiene que saber reformular y le da la glosa de dos. La tercera se la deja sin definir. Es un fallo mecánico, no de criterio |
| **B** | `truck` | dato oculto, tabla de datos, **y la carta entera** («*No truck today.*») | La complicación está escrita en inglés y gira sobre esta palabra. Si B no la tiene, no puede contarle a A lo que acaba de pasar, que es el único uso que tiene la carta. En Colombia el vehículo es una *camioneta* y el A2 no llega solo a `truck` |
| **B** | `brother-in-law` | dato oculto, tabla de datos y **la firma de la carta** | *Cuñado* no tiene forma transparente en inglés y el parentesco es lo que hace creíble el favor. Sin ella, B dice «my family» y pierde el porqué |
| **B** | `lock` | **su propio exponente**: `Does the lock come with it?` | Está glosada en el bloque de **A**, que es quien la ofrece, y falta en el de **B**, que es quien tiene que preguntarla. Inversión de reparto, señalada por §10: aquí la producen los dos y solo la tiene uno |

**Estas cuatro son la respuesta a tu pregunta.** Son los huecos por los que la pareja se pasa al
español, y tres de los cuatro caen en el minuto de la carta, que es el minuto más caro del
escenario.

### V7 · **MEDIO** — Segunda tanda de huecos, de clase B

Se llega al cierre sin ellas, pero cada una obliga a rodear:

| falta en | palabra | dónde aparece sin glosa |
|---|---|---|
| A | `the doorman` | restricción 2 («The doorman, twice already») — es lo que convierte su prisa en obligación y no en capricho |
| A y B | `the lobby` | cabecera, situación, restricción 2, criterio de éxito de A («The bike leaves the lobby today»). Es el sustantivo de la escena y no está en ninguna de las dos listas. *Portería* → `lobby` no es evidente |
| A y B | `the ad` | exponente de A (`The lock and the lights are not in the ad.`) y `here` de B. Es donde vive el precio del que todos hablan |
| A | `to drop something off` | su tarde entera: taller antes de la 1:00, recogida a las 3:00 |
| B | `to ride` (una bicicleta) | «or ride it home on that tire» es su plan B después de la carta, y colisiona con `a ride` (en carro), que es su plan C |
| A | `torn`, `a scratch` | los dos están en su tabla de datos, los dos se los va a decir B, y A no tiene ninguno de los dos —ni el bloque 3 para preguntar. Ver V9 |

### V8 · **MEDIO** — Dos definiciones son más difíciles que la palabra que definen

| fila | problema |
|---|---|
| B · `to come with — to be included in the price` | **Es una pasiva**, y la caja declara «nada de pasiva» en A2. Se define un phrasal fácil con una construcción prohibida y un latinismo (`included`) más difícil que el phrasal. Arreglo: `to go in the price, with no extra money` |
| A · `to throw something in — to add it to the deal for free` | Se apoya en `the deal`, que no está glosado en ninguna de las dos fichas y que sostiene la mitad de la conversación y tres de los exponentes («moving the deal», «take out of the deal»). Se cae solo con el arreglo de V2 |

Las demás definiciones están bien y algunas están muy bien: `receipt — the paper the shop gives
you with the price`, `a scratch — a thin line where the paint came off`, `worn out — used so much
it doesn't work well`. Dos reparos menores: `brake pads` presionan la llanta o el disco, no «the
wheel» (simplificación aceptable, la dejo); y `to fix — to make something work again` describe la
llanta pero no el sillín, que no se arregla, se cambia.

### V9 · **GRAVE** — A está construido como si solo produjera jerga, y recibe cuatro términos sin red

La línea del bloque de A dice: «**Not 3**: the hard words are yours.»

No lo son del todo. A **recibe** de B, según los propios exponentes de B: `worn out`, `torn`,
`a scratch`, `round trip`, más todas las cifras. Y el bloque 3 no es solo para jerga: contiene
`Sorry — was that five or nine?`, que es la reparación de **números**, y contiene
`So, you're saying…?`, que es la comprobación que el criterio de cierre exige literalmente
(«check that you're both saying the same thing»).

**Este trato está hecho de números.** 420.000, 390.000, 350.000, 70.000, 38.000, 15.000, 22.000,
6.400, la 1:00, las 3:00, las 6:00. El rol que tiene que oírlos, confirmarlos y repetirlos al
cierre es al que se le ha quitado la única herramienta para pedir que se los repitan.

**Arreglo.** Cambiar la línea de A a: «**3** `[receives]` — solo para las cifras y para la
comprobación del cierre; las palabras difíciles sí son tuyas.» El reparto de §10 sigue en pie: A
tiene el 4 y B el 3 para la jerga; el 3 para los números es de los dos.

### V10 · **LEVE** — `to pick something up` está glosada en el rol que menos la necesita

Está en B, y bien: es su objetivo alternativo. Pero **la tabla de datos de A dice «pick-up around
3:00»** y A no la tiene. Es A quien deja la bicicleta en el taller y vuelve a las tres. Se arregla
con el `to drop something off` de V7, que trae su pareja consigo.

---

# Bloque de vocabulario propuesto

Diez filas por rol, dentro del tope de §11, sin tocar prosa.

## ROLE A — cambios: fuera `to drop the price` y `the frame`; entra `cable` y `the doorman`; se rehacen `to fit`, `to throw something in` y `lock`

| word | what it is | here |
|---|---|---|
| gear set | the parts that change how hard you pedal | the new one is on the bike, and it's your card |
| brake pads | the parts that press the wheel to stop it | part of the 95,000 you put in |
| cable | the thin metal line that makes the gears move | the third thing you paid for last month, and a word they may not have |
| worn out | used so much it doesn't work well | the rear tire — they'll say it before you do |
| to fit | to be the right size for something | why you'd want the new gears back — and you can't say it yet |
| receipt | the paper the shop gives you with the price | your proof, and it's in your pocket |
| to include | to put it in the price without asking for more money | the lock, the lights — instead of cutting the number |
| lock | the thing you put on a bike so nobody takes it | 45,000 that costs you nothing to give |
| the doorman | the man who works at the door of a building | he told you twice: no bikes here after today |
| in cash | in bills, not by phone or card | one payment, today |

Si se quiere meter `to drop something off` (V7/V10), el hueco sale de `brake pads`.

## ROLE B — cambios: fuera `second-hand` y `round trip`; entra `truck`, `brother-in-law` y `lock`; se rehacen `the frame` y `to come with`

| word | what it is | here |
|---|---|---|
| worn out | used so much it doesn't work well | the rear tire — your first argument, and you say it early |
| torn | with a cut or a hole in it | the seat, on one corner |
| a scratch | a thin line where the paint came off | small, but you count it |
| to fix | to make something work again | the tire and the seat, before you can use it |
| to come with | to go in the price, with no extra money | *does the lock come with it?* — how you add instead of asking for less |
| lock | the thing you put on a bike so nobody takes it | you ask for it; it isn't in the ad |
| truck | a big car for carrying things | how the bike gets out of here — and it isn't yours |
| brother-in-law | your wife's brother, or your sister's husband | the one with the truck, at six |
| to pick something up | to go somewhere later and take it | if the bike doesn't leave now, you need a day and a time |
| in cash | in bills, not by phone or card | the 350,000 in your pocket, and it's your number |

`the frame` se cae de las dos fichas: el cierre no lo exige y `a scratch here` resuelve. Si se
prefiere conservarlo, va solo en B —que es quien lo produce— a cambio de `torn`.

Nota sobre la fila `to come with`: el `here` repite literalmente el exponente
`Does the lock come with it?`. El molde permite fragmentos decibles, pero repetir entero un
exponente que está doce líneas más abajo gasta dos sitios en la misma frase. Si se toca, que sea
`— and the lights, and anything else that isn't in the ad`.

---

# Resumen para el que arregla

**Seis cosas graves, por orden de lo que más daño hace:**

1. **N8** — la línea «no way to get the bike out of here» contradice la tabla de datos de B y
   desactiva la carta. Es la única que rompe el motor.
2. **V6** — faltan `truck`, `brother-in-law` y `lock` en B, y `cable` en A. Tres de las cuatro
   caen en el turno de la carta.
3. **N2** — el bloque 6 no tiene ninguna forma que se pueda decir en un trato entre desconocidos;
   la que servía (`That's not important right now.`) existía en fase 4 y se perdió.
4. **N1** — los dos saludos propios del escenario se cayeron y las formas de la caja a las que
   apunta la ficha no encajan con la escena.
5. **V9** — a A se le quitó el bloque 3 por la jerga, y con él la reparación de números y la
   comprobación del cierre, en un trato hecho de once cifras.
6. **V2** — `to throw something in` enseña la estructura que el nivel prohíbe.

**Lo que no hay que tocar:** la aritmética de los dos topes, la mecánica de «el precio se mueve
solo si se mueve otra cosa», el disparador de la carta en el turno global 5 (está bien colocado:
§6 pide entre el 3 y el 6, y el tercero de B es el quinto global), el criterio de cierre de cuatro
datos idéntico en las dos pantallas, y las tres preguntas del debrief, que son las mejores del
set.
