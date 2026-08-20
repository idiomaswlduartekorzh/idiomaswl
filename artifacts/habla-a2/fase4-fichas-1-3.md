# Habla acompañada — inglés A2 · Fase 4: fichas de rol 1, 2 y 3

Lo que ve cada jugador en su pantalla. Fuente de verdad: `docs/habla-acompanado-blueprint.md`
(§2 anatomía, §4 nivel, §6 puertas, **§9 la carta va en su propia pantalla**).
Motor: `artifacts/habla-a2/fase4-escenarios-1-3.md` — **el corregido, no el de fase 1**.

**Sustituye entera a `fase2-fichas-1-3.md`.** No es un parche: los tres escenarios cambiaron por
dentro (topes, cartas, restricciones, personajes), y una ficha vieja al lado de un motor nuevo
miente. La vieja queda como histórico.

**Cada ficha va en su propia URL y se lee sola.** Ninguna ficha resume la otra, ninguna dice lo
que el otro quiere ni lo que va a contestar. Si alguien lee las dos antes de jugar, el escenario
ya no sirve: se juega otro.

**Convención, unificada a `fase2-fichas-7-8.md`** —el formato que los auditores señalaron como el
bueno (equidad C4, naturalidad C6)—: la **situación**, el **objetivo**, las **restricciones**, los
**criterios**, el **cierre** y las **etiquetas** de los datos van en español; los **exponentes** y
los **valores** —lo que se dice en voz alta— van en inglés. Ni una frase en español que se pueda
traducir palabra por palabra: hay datos, y la frase la construye el estudiante. Inglés
**americano** en todo el bloque (H17). Etiquetas de rol neutras, sin género (equidad C3).

**La carta no está dentro de ninguna ficha.** Va en su propio bloque, al final de cada escenario,
marcada para **pantalla aparte**, con el **turno global** escrito. En las simulaciones, impresa
debajo del andamiaje, se leía sola.

**El inglés no marca usted/tú.** Donde el escenario pide distancia, la distancia va en las formas
(`I'm afraid…`, `Can I…?`, `I say this because…`), no en el pronombre. Cada ficha lo dice en su
cabecera (puerta 9).

Los mini-diálogos de comprobación del motor son material del diseñador. No entran aquí.

---

## Lo que esta versión arregla, y quién lo pidió

| qué entra en las seis fichas | quién lo devolvió |
|---|---|
| **Apertura social** en los seis roles: saludo, pre-secuencia o respuesta al saludo | naturalidad C1 (el set tenía **una** pre-secuencia en doce fichas) |
| **Despedida y agradecimiento** en los seis roles | naturalidad C2 (**cero** en doce fichas) |
| **Reparación en los dos lados**: preguntar *y* reformular (`I mean…`, `In other words…`, `Let me read it back to you.`) | naturalidad C3 y señal 2 (una sola fórmula, literal en cinco fichas; cero reformulaciones en todo el set) |
| **Decir por qué algo te importa**, una forma distinta por rol | simulación (el punto exacto de fuga al español en las ocho parejas) |
| **Sostener un secreto sin mentir**, con **evasiva** además de negativa, en los cuatro roles que tienen secreto | naturalidad C4 y señal 1 (diez roles lo necesitaban, uno lo tenía) |
| **Variedad**: `The thing is…` desaparece de las seis fichas; ninguna glosa se repite; `What if…?` pasa a **quien concede** (1A) | naturalidad C5 |
| Fuera present perfect **de duración con for/since**, fuera `could` de cortesía, fuera pasiva, fuera preguntas incrustadas | calibrador H1, H2, H4, H8 |
| Present perfect **de experiencia se queda**: el registro A2 de inglés tiene tres temas | calibrador H3 (la regla que aplicó el redactor anterior era falsa y borraba lengua válida) |
| **El dato oculto, con su palabra en inglés en la tabla**: `new gear set`, `truck`, `a piece of my back tooth`, `a reservation for forty people` | simulación (los tres puntos de fuga al español eran datos ocultos escritos solo en español) |
| El objetivo de quien vende deja de ser «el menor precio posible» | calibrador H6 (`negociar` es B1 y la fase 0 lo excluyó por escrito) |
| En el 3, quien concede lleva **una condición y un límite físico**, no tres condiciones | calibrador H7 · motor de fase 4 |
| **`debrief`** (3 preguntas en español por escenario) y **`grammarReferences`** | blueprint §2 y §7 · naturalidad C7 (nadie los había escrito) |

**Nota sobre los slugs.** Los `grammarReferences` están tomados del campo `slug` de cada archivo,
no del nombre de archivo, y comprobados uno a uno contra `src/data/grammar/registry`. Tres de los
que circulaban en el set —`connectors`, `relative-clauses`, `present-continuous-future`— **no
existen**: sus slugs reales llevan sufijo (`connectors-a2`, `relative-clauses-a2`,
`present-continuous-future-a2`). Escritos mal, el enlace rompe en silencio (calibrador H27).

**Dónde no hay evasiva, y por qué.** La lleva quien tiene un secreto que sostener: 1A, 1B, 2A y
3A. Los otros dos roles (2B y 3B) no esconden nada —tienen un dato que **revelar**, que es lo
contrario— y su décima fila se usa en lo que sí les hace falta.

---
---

# 1 · `the-bike-in-the-parking-lot`

`rechazar` + `conceder-con-condicion` · poder **a>b** · arranca **B** · desenlace **acuerdo** ·
**6 min** · A 6 turnos · B 6 turnos (12 globales) ·
**A = «Quien vende la bicicleta»**, **B = «Quien quiere la bicicleta»**

**Anclaje de gramática (A2):** `first-conditional` (conceder poniendo una condición),
`comparatives` (rechazar un precio comparando, no regateando), `quantifiers` (los topes y lo que
entra en el trato), `have-to-must` (por qué la bicicleta no puede quedarse aquí), `will-future`
(quién hace qué esta tarde), `past-simple-regular` (lo que costó y cuándo, con `ago`),
`prepositions-movement-a2` (el transporte, que es la segunda variable del trato).

---

## Ficha del rol A — «Quien vende la bicicleta»

> **Registro:** dos desconocidos en una portería. Cortesía de gente que no se conoce y que va a
> hacer un trato: se saluda, se da la mano, no se levanta la voz. El inglés no marca usted: la
> distancia va en las formas, no en el pronombre.
> **Empieza la otra persona.** Te tocan unos **6 turnos** y el juego dura unos **6 minutos**.

### Situación

Sábado 5 de septiembre, 10:15 de la mañana, portería de tu edificio en Cabecera (Calle 48).
Publicaste tu bicicleta en Marketplace hace tres semanas y has bajado con ella cuatro veces.
Quien escribió anoche acaba de llegar en bus y lleva medio minuto mirando la rueda de atrás
antes de saludarte. Vives en un cuarto piso y no hay ascensor.

### Tu objetivo

Vender la bicicleta **hoy**, en **un solo pago**, y que salga hoy de la portería. Por debajo de
$390.000 solo si cambia algo dentro del trato.

### Lo que no puedes hacer

1. **No puedes vender por menos de $390.000 con los cambios nuevos puestos.** Es un número, no
   una preferencia.
2. **La bicicleta no puede quedarse en la portería después de hoy.** El portero ya te lo dijo dos
   veces, y arriba hay cuatro pisos sin ascensor.
3. **No puedes desmontar los cambios aquí.** Eso es taller, y el taller cierra a la **1:00 p.m.**

### Lo que sabes tú y nadie más

- **El juego de cambios que le montaste hace un mes te sirve tal cual para la bicicleta de ruta
  que quieres comprar.** Si vuelves a poner el viejo —funciona, solo va más duro en los dos
  piñones pequeños— puedes bajar hasta **$330.000** sin perder nada. Es la carta que da vuelta a
  la conversación. Si la sueltas en el primer turno, la regalas.
- Tienes **candado con sus dos llaves** y **juego de luces** que no van a la bicicleta de ruta.
  No están en la publicación y nadie los ha nombrado.
- Es la **cuarta persona en tres semanas**. Las tres anteriores dijeron lo mismo de la llanta.

### Lo que pierdes si te vas sin trato

Subes la bicicleta cuatro pisos a pulso otra vez, bloqueas otro sábado por la mañana para la
quinta persona —que te va a decir exactamente lo mismo— y la de ruta se queda donde está.

### Datos duros

| dato | valor |
|---|---|
| Precio publicado | **420,000 pesos** · Marketplace, three weeks ago |
| Lo que costó, y cuándo | **680,000 pesos**, sixteen months ago · you still have the receipt |
| Lo que le pusiste hace un mes | **new gear set, new brake pads, new cable — 95,000 pesos** · shop receipt in your pocket |
| Y lo que eso significa para ti | **the new gear set fits my next bike** |
| Los cambios viejos | they work · harder on the two small gears |
| La de ruta que quieres | **750,000 pesos** · you have **360,000 pesos** saved |
| Lo que no está en la publicación | a **lock with two keys** (45,000 pesos) · a set of **front and rear lights** (35,000 pesos) |
| Cómo está la bicicleta | **rear tire worn out** · seat torn on one corner · a scratch on the frame |
| El taller | **La Bici Roja**, two blocks away, Calle 48 · **rear tire, fitted: 38,000 pesos** · **gear change: 15,000 pesos** |
| Horario del taller | **closes at 1:00 p.m.** · long line on Saturdays · you pick it up around **3:00 p.m.** |
| La portería | **no bikes in the lobby after today** · your apartment: **4th floor, no elevator** |
| Nequi | same day, your number is **300 771 20 46** |
| Ahora mismo | **Saturday, September 5, 10:15 a.m.** |

### Andamiaje — puedes usarlo o ignorarlo

| forma | para qué sirve | registro |
|---|---|---|
| `Hi — are you here for the bike?` | abrir tú, cuando el otro llega y se queda mirando | informal |
| `I understand, but I can't go lower.` | reconocer lo que te dicen antes de decir que no, para que el «no» no sea un portazo | neutro |
| `I paid… for it last month.` | defender la cifra con un gasto que puedes enseñar | neutro |
| `It's important for me because…` | decir por qué te importa esto, en vez de repetir el precio otra vez | neutro |
| `If you…, I can…` | mover algo del precio solo si se mueve algo del trato | neutro |
| `What if…?` | poner tú una manera distinta encima de la mesa, sin prometerla todavía | informal |
| `I'd rather not say why.` | no contestar una pregunta sin mentir y sin inventarte un motivo | neutro |
| `Sorry, I didn't catch that.` | pedir que te lo repita cuando se te escapó, no cuando no lo entiendes | informal |
| `I mean…` | rescatar una frase tuya que se está cayendo, y decirla de otra forma | neutro |
| `Thanks — see you at…, then.` | cerrar con la hora dicha, que es lo que hace que el trato exista mañana | neutro |

### Lo consigues si

- La bicicleta sale hoy de la portería, y quedó dicho a qué hora y con quién.
- Cobras en **un solo pago**, y dijiste en voz alta cuánto y cómo.
- La otra persona dijo en voz alta cómo está la llanta trasera, y tú lo oíste.
- Cada vez que bajaste algo del precio, cambió algo dentro del trato.
- Preguntaste algo abierto y te llevaste un dato que no tenías al empezar.
- Nadie se enteró de que puedes bajar más si te quedas los cambios.

### Cómo termina

**El juego termina cuando los dos dicen en voz alta el trato completo, con estos cuatro datos, y
comprueban que dicen lo mismo:**

1. **El precio final y cómo se paga:** todo en efectivo, o cuánto en efectivo y cuánto por Nequi.
2. **Con qué se va la bicicleta:** cambios nuevos o cambios viejos, y qué más va dentro.
3. **Quién la mueve, a qué hora y hasta dónde.**
4. **La llanta trasera:** quién la arregla, dónde y quién la paga.

**Si falta uno de los cuatro, no han terminado.** Si los dos dicen los cuatro y coinciden, cerró.

---

## Ficha del rol B — «Quien quiere la bicicleta»

> **Registro:** dos desconocidos en una portería. Cortesía de gente que no se conoce y que va a
> hacer un trato: se saluda, se da la mano, no se levanta la voz. El inglés no marca usted: la
> distancia va en las formas, no en el pronombre.
> **Empiezas tú.** Te tocan unos **6 turnos** y el juego dura unos **6 minutos**.

### Situación

Sábado 5 de septiembre, 10:15 de la mañana, portería de un edificio de Cabecera (Calle 48). Viste
la bicicleta en Marketplace, escribiste anoche y acabas de llegar en bus. La persona que la vende
ya está abajo con ella. Antes de saludar te has quedado medio minuto mirando la rueda de atrás.

### Tu objetivo

Salir de aquí con la bicicleta —o con día y hora de recogerla— y con el transporte resuelto en
voz alta, sin pasar de **$350.000 de contado por la bicicleta sola**.

### Lo que no puedes hacer

1. **No puedes pagar más de $350.000 de contado por la bicicleta sola.** Es tu tope y es un
   número.
2. **Los $70.000 de Nequi solo salen si lo que compras con ellos entra en el trato.** Están
   apartados para lo que la bicicleta necesite, no para subir el precio.
3. **No puedes decir que esta es la única que te sirve.** Si lo dices, no se mueve un peso.

### Lo que sabes tú y nadie más

- Llevas **tres semanas buscando** y has visto **cuatro**. Esta es la única de tu talla y la única
  con factura.
- **Tu cuñado pasa hoy por Cabecera a las 6:00 de la tarde con la camioneta** y anoche te lo
  confirmó por WhatsApp. Sin esa camioneta no tienes cómo sacarla de aquí: con esa llanta no te
  vas montado hasta Floridablanca.
- Empiezas a ir a **Cañaveral** a trabajar. El bus te cuesta **$6.400 diarios** ida y vuelta.

### Lo que pierdes si te vas sin trato

Tres semanas y cuatro bicicletas para volver a empezar, la única de tu talla con papeles se queda
aquí, y sigues pagando el bus todos los días.

### Datos duros

| dato | valor |
|---|---|
| Lo que traes encima | **350,000 pesos in cash** |
| Lo que tienes en Nequi | **70,000 pesos** · money for the bike: tire, seat, lock |
| Precio publicado | **420,000 pesos** |
| Lo que ves en la bicicleta | **rear tire worn out** · seat torn on one corner · a scratch on the frame |
| Lo que cuesta dejarla lista | about **70,000 pesos**: **a new rear tire** and **a new seat** |
| Cómo la sacas de aquí | **my brother-in-law's truck, Cabecera, 6:00 p.m. — he confirmed last night** |
| Si no fuera en la camioneta | a car with an app: about **22,000 pesos** · or **ride it home**, and the rear tire is worn out |
| Dónde vives | **Floridablanca** · new job in **Cañaveral** |
| Lo que te cuesta el bus | **6,400 pesos a day** · **32,000 pesos a week** |
| Cuántas has visto | **four bikes in three weeks** |
| Ahora mismo | **Saturday, September 5, 10:15 a.m.** |

### Andamiaje — puedes usarlo o ignorarlo

| forma | para qué sirve | registro |
|---|---|---|
| `Good morning. Thanks for coming down with it.` | saludar y reconocer que el otro bajó a esperarte | formal |
| `That's more than I can pay today.` | rechazar un precio sin ponerte a regatear | neutro |
| `It needs a new… — that's about…` | poner encima de la mesa lo que hay que arreglar, con su cifra | neutro |
| `Every week without a bike costs me…` | poner en números por qué esto te importa | neutro |
| `Maybe we can…` | proponer una manera distinta cuando el precio ya no se mueve | neutro |
| `Can I…?` | pedir algo pequeño sin que suene a exigencia | neutro |
| `That's not important right now.` | cerrar un tema que no te conviene abrir, sin mentir | neutro |
| `Can you say that again, please?` | pedir que lo repita cuando la cifra te bailó | neutro |
| `In other words, …` | volver a decir lo tuyo con palabras más fáciles cuando ves que no te siguen | neutro |
| `Thanks a lot for your time.` | despedirte cerrando la relación, no solo el trato | neutro |

### Lo consigues si

- Sales con la bicicleta, o con día y hora de recogerla, y con **quién la mueve** dicho en voz
  alta.
- No pasaste de **$350.000 de contado** por la bicicleta sola.
- Si moviste dinero de Nequi, fue por algo que entró en el trato, y lo dijiste.
- Dijiste en voz alta cómo está la llanta trasera.
- Preguntaste algo abierto y te llevaste un dato que no tenías al empezar.
- Nadie se enteró de que esta es la única que te sirve.

### Cómo termina

**El juego termina cuando los dos dicen en voz alta el trato completo, con estos cuatro datos, y
comprueban que dicen lo mismo:**

1. **El precio final y cómo se paga:** todo en efectivo, o cuánto en efectivo y cuánto por Nequi.
2. **Con qué se va la bicicleta:** cambios nuevos o cambios viejos, y qué más va dentro.
3. **Quién la mueve, a qué hora y hasta dónde.**
4. **La llanta trasera:** quién la arregla, dónde y quién la paga.

**Si falta uno de los cuatro, no han terminado.** Si los dos dicen los cuatro y coinciden, cerró.

---

## Carta del escenario 1 — **pantalla aparte** · solo el rol B

> **Pantalla propia, detrás de un botón. No se imprime debajo del andamiaje.**
> **Se abre al terminar el turno global 5** (el tercero del rol B, porque arranca B).
> El rol A no la ve nunca: solo se entera de lo que el rol B le cuente.

> **WhatsApp · 10:34 a.m.**
> *No truck today. I'm going to Barrancabermeja. Sorry.*
> — my brother-in-law

**Si se lee antes de tiempo:** no se gana nada, se pierde. Quien la lee sabe desde el primer turno
que no tiene transporte, y tiene que negociar el transporte **antes** de haber asegurado el
precio, enseñando su punto débil cuando el otro todavía tiene toda la palanca. Las alternativas
cuestan lo mismo leídas antes o después. Mirar antes adelanta la debilidad y no quita el problema.

## Después del juego — las dos pantallas

1. ¿En qué turno dejó de moverse el precio y empezó a moverse **lo que entraba en el trato**?
   Búsquenlo: es el turno donde la conversación cambió de tema sin cambiar de tema.
2. Cada uno tenía un dato que le convenía no soltar de entrada. ¿Cuál era el del otro? ¿En qué
   momento apareció, y qué pregunta lo hizo aparecer?
3. Vuelvan a decir los cuatro datos del cierre, cada uno con sus palabras, sin mirar la pantalla.
   Si alguno de los cuatro sale distinto, ahí estaba el malentendido.

## `grammarReferences` — escenario 1

```ts
grammarReferences: [
  { slug: 'first-conditional', title: 'El Primer Condicional en Inglés A2',
    rationale: 'El acto conceder-con-condicion vive aquí, y es lo más alto del escenario: "If you take the old gear set, I can do 340,000". El tema autoriza can y have to dentro de la cláusula if.' }, // a2
  { slug: 'comparatives', title: 'Comparativos en Inglés A2',
    rationale: 'El precio se rechaza comparando, no regateando: "that\'s more than I can pay today", "the old gear set is harder on the small gears".' }, // a2
  { slug: 'quantifiers', title: 'Cuantificadores en Inglés A2',
    rationale: 'Los dos topes y lo que entra o sale del trato se dicen con cuantificadores: "I only have 350,000 in cash", "a bit more", "everything today".' }, // a2
  { slug: 'have-to-must', title: 'Have to y Must en Inglés A2',
    rationale: 'La razón por la que la bicicleta no se queda aquí es una obligación, no un capricho: "it has to leave today", "I have to carry it up four floors".' }, // a2
  { slug: 'will-future', title: 'El Futuro con Will en Inglés A2',
    rationale: 'El reparto de la tarde se compromete en will: "I\'ll take it to the shop before one", "I\'ll pick it up at three".' }, // a2
  { slug: 'past-simple-regular', title: 'Past Simple Verbos Regulares en Inglés A2',
    rationale: 'La historia de la bicicleta se cuenta con past simple y ago: "I paid 95,000 last month", "I bought it sixteen months ago". Con ago, nunca con since: since de duración es B1.' }, // a2
  { slug: 'prepositions-movement-a2', title: 'Preposiciones de movimiento en Inglés A2: into, out of, past, through, along',
    rationale: 'El transporte es la segunda variable del trato y fue donde las parejas flojas se pasaron al español: "take it to the shop", "ride it to Floridablanca", "it goes into the truck".' }, // a2
  { slug: 'can-ability', title: 'Can para habilidad en inglés A1',
    rationale: 'Sostiene todas las peticiones de los dos lados ("Can I…?", "Can you keep it until six?") y sustituye a los Could I…? que el registro no ancla.' }, // a1
  { slug: 'telling-time', title: 'Decir la hora en inglés A1',
    rationale: 'El cierre exige a qué hora se mueve la bicicleta, y el taller cierra a la una: sin la hora no hay cierre.' }, // a1
]
```

---
---

# 2 · `no-appointment-until-thursday`

`dar-mala-noticia` + `recomendar` · poder **a>b** · arranca **B** · desenlace **acuerdo** ·
**6 min** · A 6 turnos · B 6 turnos (12 globales) ·
**A = «Quien está en recepción»**, **B = «Quien tiene el dolor de muela»**

**Anclaje de gramática (A2):** `should-advice` (recomendar en las dos direcciones),
`first-conditional` (en qué caso no se espera), `past-simple-questions` (las preguntas abiertas
que hacen salir el dato pivote), `have-to-must` (lo que toca y lo que no se puede),
`quantifiers` (dosis, dinero, tiempo de espera), `comparatives` (cómo está hoy frente a ayer),
`present-perfect-ever-never` (el aviso que nunca llegó — experiencia, no duración).

---

## Ficha del rol A — «Quien está en recepción»

> **Registro:** mostrador de clínica. Tratas con distancia y con calma a quien tienes delante,
> también cuando le dices que no. El inglés no marca usted: la distancia va en `I'm afraid…`,
> `Can I…?`, `Let me…`, no en el pronombre.
> **Empieza la otra persona.** Te tocan unos **6 turnos** y el juego dura unos **6 minutos**.

### Situación

Martes 8 de septiembre, 4:20 de la tarde, recepción de una clínica odontológica en Cabecera. Estás
sola en el mostrador. Entra alguien sin cita, con la mano en la mandíbula. La agenda de la doctora
Restrepo está llena hoy y mañana. El primer espacio libre es el **jueves 10 a las 7:00 a.m.**

### Tu objetivo

Que salga de aquí con **una fecha escrita, su celular verificado y algo que hacer esta noche** con
el dolor. Dar la mala noticia sin perder al paciente.

### Lo que no puedes hacer

1. **No puedes preguntarle nada a la doctora antes de las 5:00.** Está atendiendo. Ella sí te
   escribe a ti.
2. **No puedes contarle a nadie nada de la cita de otro paciente.** Ni de quién es, ni por qué
   crees lo que crees.
3. **No puedes despedir a nadie sin dejarle una fecha escrita y algo concreto para esta noche.**
   La administradora revisa la agenda al cierre.

### Lo que sabes tú y nadie más

- La cita de las **5:20 p.m. de hoy** es de una paciente que **ha faltado dos veces**. Puedes
  decir que puede que se libere algo, sin prometer nada. **No puedes decir de quién es la cita ni
  por qué lo crees.**
- La doctora Restrepo **sale a las 6:30** y ya se quedó de más el lunes. No le pides un favor por
  cualquier cosa — pero **por una muela partida no dice que no**. Eso lo sabes por experiencia y
  es la llave del escenario.
- Esta semana ya se perdieron **tres citas** por inasistencia, y cada silla vacía se le anota a
  recepción.

### Lo que pierdes si te vas sin trato

Una cuarta silla vacía en la semana y un paciente del plan que se va al consultorio de la esquina.
Las dos cosas anotadas a recepción.

### Datos duros

| dato | valor |
|---|---|
| Ahora mismo | **Tuesday, September 8, 4:20 p.m.** |
| La agenda | **full today and tomorrow** · first free slot: **Thursday 10, 7:00 a.m.** |
| Antes de la cita | **arrive 10 minutes early** · forms and X-ray |
| La otra sede | **Centro, Calle 36** · **emergency check, no appointment, until 8:00 p.m.** |
| Lo que cuesta esa urgencia | **40,000 pesos** · the plan does not pay for it |
| Sábado 12 | **9:00 a.m. free** · **Saturdays: only patients we have seen before** |
| Qué sí cubre el plan | **the plan pays for the treatment, and only in this clinic** |
| La doctora Restrepo | **leaves at 6:30 p.m.** · she writes to you, you don't call her |
| Para esta noche | **something cold outside, 10 minutes** · **don't chew on that side** · **soft food, nothing hot, nothing cold** |
| Cuándo no se espera | **if the pain goes to your ear or your eye, go to the hospital emergency room tonight** |
| Recordatorios | we send a text **the day before** · we need the right cell phone number |

### Andamiaje — puedes usarlo o ignorarlo

| forma | para qué sirve | registro |
|---|---|---|
| `Good afternoon. How can I help you?` | abrir tú, que estás en el mostrador y ves entrar a alguien así | formal |
| `What happened?` | abrir con una pregunta que no se contesta con sí o no | neutro |
| `I'm afraid…` | dar la mala noticia sin que la primera palabra sea «no» | formal |
| `Maybe…, but I can't promise anything.` | dejar una puerta entreabierta sin comprometerte a nada | neutro |
| `You should…` | recomendar un camino concreto, no una idea general | neutro |
| `I say this because…` | decir por qué te importa lo que le está pasando, y no sonar a formulario | neutro |
| `I can't talk about other patients.` | cerrar una puerta sin dar el motivo y sin inventarte uno | formal |
| `Sorry, was that a five or a nine?` | cazar el dígito que se te escapó en mitad de un número largo | neutro |
| `Let me read it back to you: …` | repetir con tus palabras lo que acabas de anotar para que lo confirme | formal |
| `Feel better. See you on…` | despedirte dejando el día dicho en voz alta | neutro |

### Lo consigues si

- Sale de aquí con **día, hora y sede** dichos en voz alta.
- Tienes su celular **verificado dígito a dígito**, y él te oyó repetirlo.
- Le diste algo concreto para esta noche, y él lo repitió con sus palabras.
- Hiciste al menos **una pregunta abierta** antes de proponer nada, y esa pregunta te trajo un
  dato que cambiaba las cosas.
- Quedó dicho **en qué caso no espera** y adónde va.
- Nadie se enteró de la cita de otro paciente.

### Cómo termina

**El juego termina cuando los dos dicen en voz alta el plan completo, con estos cuatro datos, y
comprueban que coinciden:**

1. **Día, hora y sede** de la cita, y a qué hora tiene que estar allí.
2. **Cuánto va a pagar y cuándo** (o «nada, lo cubre el plan»).
3. **El celular**, dicho en voz alta y confirmado dígito a dígito.
4. **Qué va a hacer con el dolor hasta entonces, y en qué caso no espera.**

**Si falta uno de los cuatro, no han terminado.** Si los dos dicen los cuatro y coinciden, cerró.

---

## Ficha del rol B — «Quien tiene el dolor de muela»

> **Registro:** mostrador de clínica. Estás en un sitio donde no conoces a nadie y llegas sin
> cita: se pide con distancia, aunque duela. El inglés no marca usted: la distancia va en
> `Can you help me, please?`, `Is there any other day?`, no en el pronombre.
> **Empiezas tú.** Te tocan unos **6 turnos** y el juego dura unos **6 minutos**.

### Situación

Martes 8 de septiembre, 4:20 de la tarde. Sales de trabajar en Girón a las 3:30 y te viniste
directo a la clínica odontológica de Cabecera, sin cita, con la mano en la mandíbula. Es la única
tarde de la semana que tienes libre.

### Tu objetivo

Que te vean **hoy**. Y si hoy no puede ser, salir con una fecha a la que **sí puedas llegar** y
con algo para el dolor esta noche.

### Lo que no puedes hacer

1. **No puedes tomar ninguna cita entre semana antes de las 8:30 de la mañana.** Entras a las
   **7:00** en el almacén de Girón, y **los jueves recibes el camión de mercancía a las 6:30**: la
   llave del depósito la tienes tú y no la tiene nadie más. De la clínica al almacén hay 40
   minutos.
2. **No puedes volver otro día a hacer la misma cola.** Hoy es la tarde que tienes libre.

### Lo que sabes tú y nadie más

- **El domingo se te partió un pedazo de la muela de abajo, y el borde te corta la lengua al
  hablar.** No es que te lo prohíban contar: **es que a ti lo que te importa es el dolor** y lo
  del pedazo te parece un detalle. Si te preguntan algo abierto —cómo es, qué pasó, desde
  cuándo—, sale.
- La vez pasada diste **el número de tu hermana** como contacto. Por eso nunca te han llegado los
  recordatorios. No te acuerdas de haberlo hecho.

### Lo que pierdes si te vas sin trato

Sales con el dolor, sin fecha y sin nada que hacer esta noche. Y en cualquier otra clínica el
tratamiento lo pagas completo, porque el plan solo te sirve aquí.

### Datos duros

| dato | valor |
|---|---|
| Ahora mismo | **Tuesday, September 8, 4:20 p.m.** |
| Qué te pasó | **a piece of my back tooth broke on Sunday — the edge cuts my tongue** |
| Cómo está hoy | **it's worse than yesterday** · it hurts more when I drink something cold |
| Lo que has tomado | **two painkillers a day — the first one on Sunday night** |
| Tu trabajo | warehouse in **Girón** · **7:00 a.m. to 3:30 p.m., Monday to Friday** |
| Los jueves | **the delivery truck arrives at 6:30 a.m. — I have the key** |
| Sábados | **I don't work on Saturdays** |
| De la clínica al almacén | **forty minutes** |
| Lo que traes encima | **70,000 pesos** |
| Tu plan | **the plan pays for the treatment, and only in this clinic** |
| Tu celular | **310 542 88 06** · say it one number at a time |
| Los recordatorios | **I've never got a text from this clinic** |

### Andamiaje — puedes usarlo o ignorarlo

| forma | para qué sirve | registro |
|---|---|---|
| `Good afternoon. Can you help me, please?` | entrar sin cita y pedir ayuda antes de contar el problema | formal |
| `Oh no — really?` | reaccionar a una mala noticia antes de ponerte a contestarla | neutro |
| `I can't come at…, because…` | cerrar una hora concreta dando el motivo, no la gana | neutro |
| `Is there any other day?` | pedir otra salida sin proponerla tú | neutro |
| `What can I do tonight?` | pedir consejo para ahora mismo, no para el jueves | neutro |
| `I can't eat like this — that's why I came today.` | decir por qué esto te importa, uniendo el problema con estar aquí | neutro |
| `Can I…?` | pedir permiso para algo pequeño: esperar, sentarte, volver más tarde | neutro |
| `Sorry, I don't understand.` | pararlo cuando te perdiste, en vez de asentir y seguir perdido | neutro |
| `What I mean is…` | volver a decir lo tuyo de otra forma cuando ves que no te siguen | neutro |
| `Thank you, really — you helped me a lot.` | despedirte agradeciendo el consejo, no solo la cita | neutro |

### Lo consigues si

- Sales con una fecha **a la que puedes llegar de verdad**, y lo dijiste con tu horario en la
  mano.
- Dijiste tu celular en voz alta, dígito a dígito, y te lo confirmaron.
- Sabes qué hacer esta noche, y **en qué caso no esperas**.
- Cuando te preguntaron, contaste **cómo es** el dolor, no solo que duele.
- Sabes cuánto vas a pagar y cuándo, o que no pagas nada.

### Cómo termina

**El juego termina cuando los dos dicen en voz alta el plan completo, con estos cuatro datos, y
comprueban que coinciden:**

1. **Día, hora y sede** de la cita, y a qué hora tiene que estar allí.
2. **Cuánto va a pagar y cuándo** (o «nada, lo cubre el plan»).
3. **El celular**, dicho en voz alta y confirmado dígito a dígito.
4. **Qué va a hacer con el dolor hasta entonces, y en qué caso no espera.**

**Si falta uno de los cuatro, no han terminado.** Si los dos dicen los cuatro y coinciden, cerró.

---

## Carta del escenario 2 — **pantalla aparte** · solo el rol A

> **Pantalla propia, detrás de un botón. No se imprime debajo del andamiaje.**
> **Se abre al terminar el turno global 5** (el tercero del rol B, porque arranca B).
> El rol B no la ve nunca: solo se entera de lo que el rol A le cuente.

> **Dra. Restrepo · 4:52 p.m.**
> | Hoy | **one more patient, 6:15 p.m., between two appointments** |
> | Antes te pido dos cosas | **the exact problem** + **the date for the full treatment** |
> | Hora límite | **confirm before 5:30 p.m.** |

**Si se lee antes de tiempo:** no se gana nada. La tarea es la misma leída antes o después —hay
que conseguir el motivo y la fecha, y eso solo se consigue hablando— y adelantarla sale mal: una
pregunta por la urgencia en el primer turno se contesta con «me duele mucho», y la pregunta se
gasta. El dato pivote aparece cuando hay conversación, no cuando hay prisa.

## Después del juego — las dos pantallas

1. Hubo un momento en que la conversación cambió de prioridad. ¿Cuál fue **la pregunta** que lo
   provocó? ¿Era abierta o era de sí o no?
2. El jueves a las 7:00 no era un capricho: era un imposible con dos números detrás. ¿Los dos
   entendieron cuáles eran esos dos números? Díganlos ahora.
3. El celular es el único dato del cierre que se puede decir mal sin que nadie se entere.
   Repítanlo los dos, dígito a dígito, y comprueben si coincide con lo que quedó anotado.

## `grammarReferences` — escenario 2

```ts
grammarReferences: [
  { slug: 'should-advice', title: 'Should y Shouldn\'t en Inglés A2',
    rationale: 'Ancla el acto recomendar en las dos direcciones: "What should I do tonight?" desde el paciente y "You should go to the other clinic before eight" desde el mostrador.' }, // a2
  { slug: 'first-conditional', title: 'El Primer Condicional en Inglés A2',
    rationale: 'El cuarto punto del cierre es un condicional: "If the pain goes to your ear, go to the emergency room tonight".' }, // a2
  { slug: 'past-simple-questions', title: 'Preguntas y Negativos en Past Simple A2',
    rationale: 'Sin pregunta abierta no sale el dato que da vuelta al escenario: "What happened?", "When did it start?". En directa, nunca incrustada.' }, // a2
  { slug: 'have-to-must', title: 'Have to y Must en Inglés A2',
    rationale: 'Los dos imposibles del escenario son obligaciones externas: "I have to be in Girón at seven", "you have to arrive ten minutes early".' }, // a2
  { slug: 'quantifiers', title: 'Cuantificadores en Inglés A2',
    rationale: 'Dosis, dinero y espera se dicen en cantidades: "two painkillers a day", "about an hour", "I have seventy thousand".' }, // a2
  { slug: 'comparatives', title: 'Comparativos en Inglés A2',
    rationale: 'El paciente describe cómo está comparando, que es como se describe un dolor: "it\'s worse than yesterday", "it hurts more with something cold".' }, // a2
  { slug: 'present-perfect-ever-never', title: 'Present Perfect con Ever, Never, Already y Yet',
    rationale: 'El aviso que nunca llegó: "I\'ve never got a text from this clinic". Present perfect de experiencia, que sí es A2; el de duración con for o since sería B1 y no aparece.' }, // a2
  { slug: 'imperative', title: 'El imperativo en inglés A1',
    rationale: 'Todo lo que hay que hacer esta noche se dice en imperativo: "Put something cold on it", "Don\'t chew on that side".' }, // a1
  { slug: 'telling-time', title: 'Decir la hora en inglés A1',
    rationale: 'El escenario entero son horas —4:20, 6:15, 7:00, 8:30— y el cierre exige la de la cita y la de llegada.' }, // a1
]
```

---
---

# 3 · `swap-the-saturday-shift`

`pedir-favor` + `conceder-con-condicion` · poder **igual** · arranca **A** · desenlace
**acuerdo-parcial** · **7 min** · A 7 turnos · B 7 turnos (14 globales) ·
**A = «Quien pide el cambio»**, **B = «Quien tiene el turno de cierre»**

> **Aviso de tiempo.** Este escenario declara **7 minutos** y el techo de A2 en §4 del blueprint
> son 6. Se declara lo que dura de verdad con pareja sólida (7:30 medido), no lo que cabría. La
> decisión está escrita en `fase4-escenarios-1-3.md` y se pasa al guardián: o se reconoce en §4
> que un A2 con cierre dictado llega a 7, o se baja el cierre de 5 datos a 3 —que mata lo mejor
> que tiene el set—.

**Anclaje de gramática (A2):** `first-conditional` (la condición bajo la que se acepta),
`will-future` (la devolución con fecha y lo que queda pendiente), `have-to-must` (la obligación
externa que hay detrás del favor), `connectors-a2` (pedir y rechazar con because y but),
`past-simple-irregular` (los dos cambios ya hechos, una cláusula y no más),
`present-continuous-future-a2` (planes cerrados con billete o inscripción pagada),
`comparatives` (medir si el cambio es parejo).

---

## Ficha del rol A — «Quien pide el cambio»

> **Registro:** informal. Son compañeros del mismo rango, se tutean, se ven todos los días en la
> trastienda. Frases cortas, se pueden interrumpir. Mañana trabajan juntos otra vez.
> **Empiezas tú.** Te tocan unos **7 turnos** y el juego dura unos **7 minutos**.

### Situación

Martes 8 de septiembre, 3:40 de la tarde, trastienda del café de Cabecera, entre el turno del
almuerzo y el de la tarde. Nayibe, la administradora, no está. Llevas media hora buscando el
momento y se lo sueltas ahora porque el sábado es dentro de cuatro días. El sábado 12 hay dos
turnos: **apertura de 7:00 a.m. a 3:00 p.m.** y **cierre de 3:00 p.m. a 11:00 p.m.** Tú tienes la
apertura.

### Tu objetivo

Que te cubran la apertura del sábado 12, y que quede **escrito hoy** en el grupo del café. Sin
eso, llegas al sábado con la duda.

### Lo que no puedes hacer

1. **No puedes ofrecer dinero.** Nayibe prohibió delante de todos que se paguen turnos entre
   compañeros.
2. **No puedes pedir el sábado en bloque.** Tienes que poner **al menos dos maneras de partirlo**
   encima de la mesa **antes** de que te digan que sí.
3. **No puedes llamar a Nayibe ahora.** Está en la sede de la Autopista y no contesta hasta las
   6:00, así que lo que se acuerde aquí depende de que los dos lo sostengan después.

### Lo que sabes tú y nadie más

- Ya se lo pediste a **Katherine** y a **Duván** y los dos dijeron que no: Katherine está en la
  sede de la Autopista ese sábado y Duván está incapacitado hasta el 20. **La persona que tienes
  delante es tu último recurso.** Si eso sale, sabe que tiene toda la palanca.
- El **Speaking está agendado el domingo 13 a las 9:00 a.m.** (por ahora), así que el sábado
  después de la 1:30 lo tienes libre. Eso abre la puerta a partir el sábado en dos, y todavía no
  lo has puesto sobre la mesa.
- Puedes devolver el favor con fecha: tienes libres el **viernes 18 por la noche** y el **sábado
  19**, y te toca el **inventario del lunes 14**.

### Lo que pierdes si te vas sin trato

El examen, que ya está pagado y no se reprograma sin volver a pagar; o el turno. Y te vas a ver
con esta persona mañana, y pasado.

### Datos duros

| dato | valor |
|---|---|
| Ahora mismo | **Tuesday, September 8, 3:40 p.m.** |
| Sábado 12 · turnos | **opening: 7:00 a.m. to 3:00 p.m.** · **closing: 3:00 p.m. to 11:00 p.m.** |
| Tu examen | **I'm taking the IELTS on Saturday 12, at 8:00 a.m.** · exam center in **Floridablanca** |
| Lo que costó | **more than a million pesos — you can't change the date, and there's no refund** |
| Speaking | **Sunday 13, 9:00 a.m.** (for now) |
| Cuándo sales del examen | **about 1:30 p.m.** · from Floridablanca to the café: **forty minutes** |
| Lo que puedes devolver | **Friday 18, night** · **Saturday 19** · **the stock count on Monday 14** |
| Lo que no puedes ofrecer | **money — Nayibe said no paying for shifts, in front of everybody** |
| Nayibe | at the Autopista café · **she answers after 6:00 p.m.** |
| El canal | **the café group on WhatsApp** — that's where the shifts are written |

### Andamiaje — puedes usarlo o ignorarlo

| forma | para qué sirve | registro |
|---|---|---|
| `Do you have a second, before you go in?` | comprobar que es el momento antes de soltar lo que traes | informal |
| `Can I ask you a favor?` | abrir el favor por la puerta, no por la ventana | informal |
| `If I miss it, I lose…` | decir qué pierdes si sale mal, que es como se dice por qué te importa | informal |
| `We can do it two ways: … or …` | poner dos maneras encima de la mesa en vez de pedir el bloque entero | informal |
| `I can take your shift on…` | devolver el favor con una fecha, no con un «cuando puedas» | informal |
| `It's a long story.` | no contestar «¿y por qué no se lo pides a otro?» sin mentir | informal |
| `So you mean…?` | comprobar que entendiste lo que te acaban de poner como condición | informal |
| `Sorry, let me start again.` | recoger una frase tuya que se cayó a mitad y volver a decirla | informal |
| `There's a problem: …` | dar una noticia que rompe algo que tú mismo ya habías dicho | informal |
| `Thanks, seriously — I owe you one.` | despedirte dejando la relación mejor de lo que estaba | informal |

### Lo consigues si

- Alguien abre el sábado 12, y quedó dicho **quién y a qué hora**.
- Pusiste **dos maneras de partir el sábado** encima de la mesa **antes** de que te dijeran que sí.
- Diste una **fecha exacta** de devolución, no un «cuando pueda».
- **Dijiste tú** lo del cambio de horario del examen, antes de cerrar, y no esperaste a que se
  enterara por otro lado.
- Quedó dicha en voz alta la parte que **no** se resolvió, con nombre y con hora.
- Nadie se enteró de a quién más se lo pediste.

### Cómo termina

**El acuerdo es parcial: algo queda colgando, y tiene que quedar colgando con dueño y con hora.**

**El juego termina cuando los dos redactan en voz alta, juntos, el mensaje que va hoy al grupo del
café, con estos cinco datos:**

1. **Quién abre el sábado 12 y a qué hora.**
2. **Hasta qué hora se queda esa persona, y quién entra después.**
3. **Qué turno se devuelve, y qué día exacto.**
4. **Que el cambio lo pidió quien lo pidió** — la frase que protege a quien acepta.
5. **Qué parte queda pendiente, quién la resuelve y antes de qué hora de hoy.**

**Si el mensaje no tiene los cinco, no está cerrado.** Si los dos lo dicen igual y el punto 5
tiene nombre y hora, cerró — y cerró parcial, que es como tenía que cerrar.

---

## Ficha del rol B — «Quien tiene el turno de cierre»

> **Registro:** informal. Son compañeros del mismo rango, se tutean, se ven todos los días en la
> trastienda. Frases cortas, se pueden interrumpir. Mañana trabajan juntos otra vez.
> **Empieza la otra persona.** Te tocan unos **7 turnos** y el juego dura unos **7 minutos**.

### Situación

Martes 8 de septiembre, 3:40 de la tarde, trastienda del café de Cabecera. Entras a tu turno en un
rato y estás dejando las cosas listas. Nayibe, la administradora, no está. El sábado 12 hay dos
turnos: **apertura de 7:00 a.m. a 3:00 p.m.** y **cierre de 3:00 p.m. a 11:00 p.m.** Tú tienes el
cierre.

### Tu objetivo

Ayudar **sin doblar dieciséis horas** y **sin que este cambio te cuente como el tercero del mes**.

### Lo que no puedes hacer

1. **Una sola condición, y no la negocias:** no aceptas nada que Nayibe pueda contarte como tu
   tercer cambio, **salvo que quede escrito hoy en el grupo que el cambio lo pidió la otra
   persona**.
2. **No puedes quedarte después de las 8:00 p.m. del sábado 12.** El domingo a las **5:00 a.m.**
   sale tu bus a San Gil y el pasaje está comprado.

### Lo que sabes tú y nadie más

- El sábado 12 hay una **reserva de 40 personas a las 9:00 de la mañana**, un desayuno de empresa
  que se anunció en el grupo del café el viernes. **La apertura del 12 no es un turno tranquilo:
  es el peor del mes.** La otra persona no lo sabe: entró tarde al grupo. Cuando esto sale, se
  entiende por qué el favor es mucho más grande de lo que parece.
- Ya cambiaste turno **dos veces este mes** (el 28 y el 4). Nayibe te dijo delante de todos que al
  tercero te pasa a la **lista de refuerzo**: se acabaron los fines de semana fijos, que son los
  de propina.
- El **sábado 19 hay un matrimonio de 60 personas** en el segundo piso. Eso lo puedes decir; no es
  una condición, es una cuenta.

### Lo que pierdes si te vas sin trato

Trabajan juntos todos los días, se ven en la trastienda cada tarde, y **vas a necesitar
exactamente esto el mes que viene**. Decir que no y dar media vuelta te cuesta el favor que aún no
has pedido.

### Datos duros

| dato | valor |
|---|---|
| Ahora mismo | **Tuesday, September 8, 3:40 p.m.** |
| Sábado 12 · turnos | **opening: 7:00 a.m. to 3:00 p.m.** · **closing: 3:00 p.m. to 11:00 p.m.** |
| Lo que hay ese día | **there's a reservation for forty people at 9:00 a.m. — a company breakfast** |
| Dónde se anunció | **in the café group, on Friday** |
| Tus cambios de este mes | **two swaps: the 28th and the 4th** |
| Lo que dijo Nayibe delante de todos | **third swap → the back-up list: no more fixed weekends** |
| Tu domingo | **my bus is leaving at 5:00 a.m. on Sunday 13** · San Gil, **two hours** · ticket paid |
| Tu tope del sábado | **I can't stay after 8:00 p.m.** |
| Propina de un sábado normal | about **45,000 pesos** |
| Propina del sábado 19 | **a wedding, sixty people, second floor — about 110,000 pesos** |
| El canal | **the café group on WhatsApp** — that's where the shifts are written |

### Andamiaje — puedes usarlo o ignorarlo

| forma | para qué sirve | registro |
|---|---|---|
| `Sure — what's up?` | contestar a alguien que te para antes de entrar a turno | informal |
| `Hold on. Which Saturday?` | parar y pedir el dato exacto antes de contestar a nada | informal |
| `I want to help, but…` | no cerrar la puerta y poner tu problema en la misma frase | informal |
| `It's worse than you think, because…` | avisar de que lo que te piden pesa más de lo que cree, y decir por qué te importa | informal |
| `I can do it, but only if…` | conceder poniendo **una** condición, la tuya, y no soltarla | informal |
| `I can't stay after…` | poner una hora tope, que no es una gana sino un bus | informal |
| `How about…?` | proponer tú una manera distinta en vez de esperar a que te la propongan | informal |
| `Just write it in the group today, OK?` | pedir que quede escrito donde se escriben los turnos de verdad | informal |
| `Let me say that again.` | volver a decir tu condición cuando ves que se entendió a medias | informal |
| `No problem. See you tomorrow.` | cerrar sin que quede tensión con alguien que ves cada día | informal |

### Lo consigues si

- Quedó **escrito hoy en el grupo** que el cambio lo pidió la otra persona.
- **No te quedas después de las 8:00 p.m.** del sábado 12.
- Dijiste lo de la reserva de las 40 personas, y lo dijiste **cuando venía al caso**, no de
  entrada.
- Si aceptaste, aceptaste con **tu** condición dicha en voz alta, no dada por supuesta.
- Quedó nombrada la parte que **no** se resolvió, con dueño y con hora.
- No te fuiste dando media vuelta: mañana trabajan juntos.

### Cómo termina

**El acuerdo es parcial: algo queda colgando, y tiene que quedar colgando con dueño y con hora.**

**El juego termina cuando los dos redactan en voz alta, juntos, el mensaje que va hoy al grupo del
café, con estos cinco datos:**

1. **Quién abre el sábado 12 y a qué hora.**
2. **Hasta qué hora se queda esa persona, y quién entra después.**
3. **Qué turno se devuelve, y qué día exacto.**
4. **Que el cambio lo pidió quien lo pidió** — la frase que protege a quien acepta.
5. **Qué parte queda pendiente, quién la resuelve y antes de qué hora de hoy.**

**Si el mensaje no tiene los cinco, no está cerrado.** Si los dos lo dicen igual y el punto 5
tiene nombre y hora, cerró — y cerró parcial, que es como tenía que cerrar.

---

## Carta del escenario 3 — **pantalla aparte** · solo el rol A

> **Pantalla propia, detrás de un botón. No se imprime debajo del andamiaje.**
> **Se abre al terminar el turno global 6** (el tercero del rol B, porque arranca A).
> El rol B no la ve nunca: solo se entera de lo que el rol A le cuente.

> **Exam center · 3:12 p.m.**
> | Speaking test | **Saturday 12, in the afternoon** |
> | Tu hora exacta | **we send it by text at 3:00 p.m. that day** |
> | Lo que te piden | **keep 3:00 to 6:00 p.m. free** · **confirm now** |

**Si se lee antes de tiempo:** no se gana nada, y probablemente se pierde. El agujero de las 3:00
a las 6:00 existe igual y **no hay plan que lo esquive**: cualquier reparto con este rol entrando
por la tarde cae dentro de la ventana. Lo único que puede hacer quien la haya visto es pedir el
sábado entero, y eso ya está rechazado por el bus del domingo y por las dieciséis horas: llega al
mismo sitio habiendo gastado turnos y credibilidad. Y su restricción 2 le obliga igualmente a
poner dos maneras de partir el sábado encima de la mesa **antes** del sí: no se puede callar para
no tener que retractarse.

## Después del juego — las dos pantallas

1. Uno de los dos sabía algo del sábado 12 que el otro no. ¿En qué turno salió? ¿Habría cambiado
   la conversación si sale en el primero?
2. El punto 5 del mensaje —lo que queda pendiente— es el que más veces se olvida. ¿Lo dijeron?
   Vuelvan a decirlo ahora: qué queda, quién lo resuelve y antes de qué hora.
3. Aquí nadie manda sobre nadie: no había cargo detrás del que esconderse. ¿En qué momento se
   notó, y qué tuvo que hacer la lengua que en otro escenario habría hecho el cargo?

## `grammarReferences` — escenario 3

```ts
grammarReferences: [
  { slug: 'first-conditional', title: 'El Primer Condicional en Inglés A2',
    rationale: 'La condición bajo la que se acepta, que es el escenario entero: "If you write it in the group today, I can open on Saturday". Una condición simple, que es lo que A2 autoriza.' }, // a2
  { slug: 'will-future', title: 'El Futuro con Will en Inglés A2',
    rationale: 'La devolución con fecha y la parte que queda colgando: "I\'ll take your shift on Friday the eighteenth", "I\'ll call Nayibe at six and I\'ll tell you before eight".' }, // a2
  { slug: 'have-to-must', title: 'Have to y Must en Inglés A2',
    rationale: 'El favor se pide amparado en una obligación externa, no en una gana: "I have to be there at eight", "I can\'t stay after eight, I have to take the bus at five".' }, // a2
  { slug: 'connectors-a2', title: 'Conectores en Inglés A2: because, so, although, however, but',
    rationale: 'Pedir un favor y no concederlo del todo son el mismo movimiento con because y but: "I want to help, but I did two swaps this month".' }, // a2
  { slug: 'past-simple-irregular', title: 'Past Simple Verbos Irregulares en Inglés A2',
    rationale: 'Los dos cambios ya hechos y la única cita admitida, en una sola cláusula: "I did two swaps", "Nayibe said no more fixed weekends". Si el dato crece, el escenario sube de nivel solo.' }, // a2
  { slug: 'present-continuous-future-a2', title: 'Present Continuous para el futuro en Inglés A2: planes concretos',
    rationale: 'Los dos planes cerrados con dinero pagado, que son los que no se mueven: "I\'m taking the IELTS on Saturday", "my bus is leaving at five".' }, // a2
  { slug: 'comparatives', title: 'Comparativos en Inglés A2',
    rationale: 'Se mide si el cambio es parejo comparando, que es lo que hace que el acuerdo salga parcial: "that\'s not the same", "the nineteenth is worse for me".' }, // a2
  { slug: 'there-is-there-are', title: 'There is / There are en inglés A1',
    rationale: 'El dato oculto y la mala noticia de la carta salen por la misma puerta: "There\'s a reservation for forty people", "There\'s a problem".' }, // a1
  { slug: 'telling-time', title: 'Decir la hora en inglés A1',
    rationale: 'El mensaje del grupo lleva cinco datos y cuatro son horas: sin la hora no hay mensaje, y sin mensaje no hay cierre.' }, // a1
]
```

---
---

## Lo que estas seis fichas no traen, y es a propósito

- **Ni una frase en español calcable.** Ningún bloque dice «dile que no puedes»: dice
  «$390.000», «jueves 10, 7:00 a.m.», «a reservation for forty people at 9:00 a.m.». El dato
  como dato; la frase la construye el estudiante (blueprint §3.4).
- **Ninguna ficha resume la otra.** Ni «probablemente te dirá que no», ni «el otro necesita».
  Cada rol solo sabe lo suyo y lo que el otro le cuente.
- **Ningún orden de turnos.** Punto de partida y objetivo; el camino lo hacen ellos.
- **Nunca más de tres restricciones**, y todas comprobables por el otro jugador: un número, una
  hora o un imposible físico. Una restricción que nadie nota que existe no es una restricción.
- **Ningún exponente resuelve el escenario entero.** Los que sirven una salida de la zona de
  acuerdo van como plantilla con puntos suspensivos (`If you…, I can…`, `We can do it two ways:
  … or …`), nunca con la cifra puesta.
- **Ningún `could` de cortesía, ninguna pasiva, ninguna pregunta incrustada, ningún present
  perfect de duración con `for`/`since`.** El present perfect de experiencia sí: el registro A2
  de inglés tiene tres temas y borrarlo era borrar lengua válida.

## Lo que queda abierto, escrito y no escondido

1. **Los 7 minutos del escenario 3 rompen el techo de 6 de §4.** Decisión de producto, no del
   redactor. Está arriba, en la cabecera del escenario.
2. **Ninguna cifra tiene anclaje**: no existe tema de números cardinales en el registro de inglés
   A1 ni A2 (calibrador H16). Por eso `$1.150.000` bajó a `more than a million pesos` y todas las
   demás son redondas. Mientras no exista ese tema, el criterio se mantiene.
3. **`grammarReferences` no tiene dónde poner el nivel** y seis de las veintisiete referencias de
   este bloque son de A1 (calibrador H28). Se marcan en comentario. `habla-integracion` decide si
   añade `level` al tipo o si el resolvedor cae hacia abajo.
