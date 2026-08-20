# Habla acompañada — inglés A2 · Fase 4: fichas de rol 4, 5 y 6

Lo que ve cada jugador en su pantalla. **Sustituye por completo a `fase2-fichas-4-6.md`**: no
es un parche, es una reescritura sobre el motor corregido de
`artifacts/habla-a2/fase4-escenarios-4-6.md`. El nº 4 y el nº 5 perdieron el reloj y el tercero
ausente; las fichas viejas describen escenarios que ya no existen.

Fuente de verdad: `docs/habla-acompanado-blueprint.md` — §2 anatomía, §4 nivel A2 (**5-8
minutos**, 6-9 turnos por rol), §6 las doce puertas y **§9 (la carta vive en su propia
pantalla)**.

Formato: el de `fase2-fichas-7-8.md`, que es el que los auditores señalaron como bueno. Las
tres fichas del set que iban por su cuenta se unifican aquí.

**Cada ficha va en su propia URL y se lee sola.** Ninguna ficha resume la otra, ninguna dice lo
que el otro quiere ni lo que va a contestar. Si alguien lee las dos antes de jugar, el escenario
ya no sirve: se juega otro.

Convención: la **situación**, el **objetivo**, las **restricciones** y las **etiquetas** de los
datos van en español. Los **exponentes** y los **valores** —lo que se dice en voz alta— van en
inglés. En ninguna ficha hay una frase en español que se pueda traducir palabra por palabra: hay
datos, y la frase la construye el estudiante.

**Dos bloques no van en la pantalla de la ficha:**

- La **carta de complicación** va detrás de un botón, en su propia vista, con el turno global
  escrito encima (§9). Aquí se escribe al final de la ficha del rol que la recibe, marcada.
- El bloque `grammarReferences` de cada escenario es insumo para `habla-integracion`, no texto de
  estudiante. Va al final de cada escenario. **Los nueve o diez slugs de cada bloque están
  comprobados uno a uno contra `src/data/grammar/registry`** (campo `slug`, no nombre de
  archivo): en estos tres escenarios el sufijo `-a2` lo llevan `connectors-a2`,
  `relative-clauses-a2`, `used-to-a2`, `present-continuous-future-a2` y `past-continuous-a2`,
  cuyos archivos se llaman `connectors.ts`, `relative-clauses.ts`, `used-to.ts`,
  `present-continuous-future.ts` y `past-continuous.ts`.

### Lo que este archivo corrige respecto de la versión anterior

| lo que faltaba | dónde está ahora |
|---|---|
| Apertura, despedida y agradecimiento (cero en doce fichas) | los seis roles abren y cierran con exponente propio |
| Reparación en los dos lados | cada par tiene quien pide que le repitan y quien reformula (`I mean…`, `It means…`, `I mean…, not…`) |
| `credit note` sin nadie que la explique | glosa en la tabla de Yolima + `It means…`, y la pregunta financiada en la otra ficha |
| Decir por qué algo te importa | una forma distinta en cada uno de los seis roles |
| La evasiva del que calla | 4A `I'm not sure about that.` · 4B `I can't say more than that, sorry.` · 5A `It's personal, sorry.` · 6A `I can't tell you why, sorry.` |
| `The thing is…` y `What if…?` repetidos con glosa calcada | `The thing is…` no aparece en ninguna de las seis; `What if…?` lo tiene ahora quien concede (5B) |
| `since` de duración, `could` de cortesía, pasiva, preguntas incrustadas | fuera de las seis fichas; ver la nota de nivel de cada escenario |
| Dosificar tres asuntos en siete turnos (acto de B1) | en el nº 6 es una restricción escrita con regla, no una habilidad que se supone |
| `debrief` y `grammarReferences` | tres preguntas y un bloque de anclaje por escenario |

---
---

# 4 · `a-charge-i-did-not-make`

`quejarse` + `pedir-aclaracion` · poder **b>a** · arranca **A** · desenlace **acuerdo-parcial** ·
7 min · A 8 turnos · B 7 turnos · **A = quien reclama la factura**, **B = Yolima, la asesora**

**Anclaje de gramática (A2):** `past-simple-questions` (la queja entera va en negativo de
pasado), `past-continuous-a2` (qué estaba haciendo el teléfono), `past-simple-be`,
`present-perfect-ever-never` (nunca he pagado datos de más — nunca `since`),
`relative-clauses-a2` (glosar una palabra de factura sin usar otra palabra de factura),
`first-conditional`, `quantifiers`, `will-future`, `past-simple-regular`, `can-ability`.

**Nota de nivel:** ninguna ficha trae `could`, ni `since` de duración, ni pregunta incrustada.
El año de la línea se dice en pasado simple (`I opened this line in 2017`) y la experiencia en
present perfect de experiencia (`I've never paid extra data, not once`), que sí es A2.

---

## Ficha del rol A — quien reclama la factura

> **Esta ficha es solo tuya.** No la enseñes y no leas la otra.
> **Registro:** mostrador. Los dos se tratan de usted y no se conocen. Se puede reclamar sin
> levantar la voz, y aquí levantar la voz no sirve de nada.
> **Empiezas tú.** Te tocan unos 8 turnos.

### Situación

Tienda de tu operadora de celular, en un centro comercial de Bucaramanga, martes 18 de agosto,
10:40 a. m. Traes la factura impresa: el recibo del 5 de agosto, que cobra el consumo de julio,
trae 42,000 pesos de datos fuera del plan encima de los 58,900 de tu plan de 8 GB. Acaban de
abrir la caja y en la pantalla está tu turno, el 07. Al otro lado del mostrador hay una asesora
que no conoces.

### Tu objetivo

Que te quiten esos 42,000 pesos de la factura **y** entender qué los produjo, para que el mes que
viene no llegue igual. Si sales solo con lo primero, vuelves dentro de treinta días.

### Lo que no puedes hacer

1. **No puedes cancelar la línea ni amenazar con irte a otro operador.** Ese número lo tienes
   desde hace nueve años: es el del trabajo y el que dejaste en tres formularios.
2. **No puedes volver otro día ni resolverlo por teléfono.** Ya lo intentaste dos veces, dos
   llamadas de más de media hora que se cayeron, y para venir hoy pediste permiso en el trabajo.
   No lo vas a pedir otra vez este mes.
3. **No puedes mentir.** Si te preguntan de frente si alguien más usó el teléfono, contestas la
   verdad.

### Lo que sabes tú y nadie más

El **domingo 26 de julio** le prestaste el celular a tu sobrino Brayan, de 12 años, toda la
tarde, en una finca de Piedecuesta sin wifi. Crees que ahí está una parte del consumo, no sabes
cuánta, y no piensas decirlo de entrada: te da miedo que si lo dices pierdas el reclamo completo.

Si sale, sale porque te lo preguntan o porque decides decirlo. Y no puedes mentir. Las palabras,
por si te hacen falta: **my nephew, twelve years old · Sunday, July 26 · from one to seven in the
afternoon · a farm near Piedecuesta · no wifi · he watched videos**.

### Datos duros

| dato | valor |
|---|---|
| Ahora mismo | **Tuesday, August 18 · 10:40 a.m.** · your ticket: **07** |
| Recibo del 5 de agosto (consumo de julio) | plan **58,900 pesos** + **42,000 pesos of extra data** |
| Extra data | data over your **8 GB** — you pay it apart from the plan |
| Tu plan | **8 GB** a month · **58,900 pesos** |
| Tu línea | you opened it in **2017** · you have **never paid extra data, not once** |
| Avisos al pasar los 8 GB | **none** — no SMS, no email |
| Las dos llamadas al call center | **two calls, more than thirty minutes each** · both cut off |
| El permiso en el trabajo | **one morning** — not again this month |
| Tu internet en casa | you work from home **three days a week** · the connection drops a lot |

### Andamiaje — puedes usarlo o ignorarlo

| forma | para qué sirve | registro |
|---|---|---|
| `Good morning. I have a problem with this bill.` | abrir en un mostrador sin levantar la voz | formal |
| `I didn't use this data.` | decir de qué te quejas con un hecho, no con un adjetivo | neutro |
| `Why didn't I get a message?` | preguntar por el aviso que nunca llegó | neutro |
| `Sorry, what is a…?` | pedir que te expliquen una palabra de la factura | neutro |
| `I mean…` | volver a decirlo con otras palabras cuando ves que no te entendieron | neutro |
| `It's important for me because…` | decir por qué esto te importa, y no solo qué quieres | neutro |
| `I'm not sure about that.` | contestar sin mentir cuando todavía no quieres contarlo todo | neutro |
| `Is there anything else you can do?` | pedir más sin subir la voz y sin pedir un jefe | neutro |
| `If you…, I can sign today.` | aceptar poniendo tu propia condición | neutro |
| `Thanks for your help.` | despedirte de quien te acaba de atender | neutro |

### Lo consigues si

- Dijiste la cifra exacta, **desde qué año tienes la línea** y que nunca has pagado datos de más,
  sin gritar y sin amenazar con irte.
- Preguntaste al menos dos cosas que no sabías al entrar y esperaste la respuesta entera. Una de
  ellas, por qué no te llegó ningún aviso.
- Cuando salió una palabra de factura que no conocías, pediste que te la explicaran, y al final la
  puedes repetir con tus palabras.
- Dijiste en voz alta por qué esto te importa más allá de la plata.
- Sales sabiendo **qué se hace para que no se repita** y **desde cuándo**.
- Elegiste tú la forma de la compensación entre las que te ofrecieron, o dijiste por qué ninguna
  te sirve.
- Saludaste al llegar y te despediste al salir.

### Cómo termina

**El juego termina cuando los dos han dicho en voz alta estas tres cosas y los dos están de
acuerdo en cuáles son:**

1. **Cuánto se compensa y en qué forma:** nota crédito, gigas o descuento con permanencia.
2. **Qué se hace para que no se repita** —bloqueo, alerta, cambio de plan— **y desde cuándo.**
3. **Si el caso se cierra hoy**, o qué se lleva por escrito y qué queda pendiente.

Sin las tres, no terminó. El punto 2 no es adorno: obliga a decidir algo aquí, no a repetir lo ya
decidido.

### Carta de complicación — **pantalla aparte**

> **No va en esta pantalla.** Vive detrás de un botón, en su propia vista.
> **Ábrela al empezar el turno global 5** — contando los turnos de los dos: tú, ella, tú, ella,
> **tú**. Es tu tercer turno. La asesora no la ve.
>
> **WhatsApp de tu hermana · 11:05 a. m.**
>
> | dato | valor |
> |---|---|
> | Día | **Sunday, July 26** |
> | Cuánto tiempo | **all afternoon, about six hours** |
> | Qué hizo Brayan | he **shared your mobile data with the TV** to watch football |
> | Batería | **dead at seven** |
>
> Ya no es una sospecha. Y tú no puedes mentir. Si estabas contando con dejar un reclamo por
> escrito, vuelve a mirar qué hay que firmar para radicarlo.
>
> **Si la abres antes de tiempo:** entras confesando, y entonces no hay queja que hacer. El
> escenario se acaba en cinco turnos y no produces ni la mitad de lo que ibas a producir.

---

## Ficha del rol B — Yolima, la asesora

> **Esta ficha es solo tuya.** No la enseñes y no leas la otra.
> **Registro:** mostrador. Tratas de usted a la persona que tienes delante todo el tiempo,
> también cuando le dices que no.
> **Empieza la otra persona.** Te tocan unos 7 turnos.

### Situación

Tienda de la operadora en un centro comercial de Bucaramanga, martes 18 de agosto, 10:40 a. m.
Acabas de abrir la caja y en la pantalla está el turno 07. Se acerca al mostrador una persona con
una factura impresa en la mano. No viene a comprar nada.

### Tu objetivo

Cerrar este caso hoy, aquí, sin escalarlo y con el cliente contento. Para eso necesitas dos cosas
que solo esa persona puede darte: **el día, la hora aproximada y qué estaba haciendo el
teléfono**, y **que acepte una salida que impida que esto se repita**.

### Lo que no puedes hacer

1. **No puedes pasar de 25,000 pesos.** Es el tope del mostrador y hoy no existe ninguna firma que
   lo suba. Por encima de esa cifra solo hay radicación escrita, que no da plata hoy ni promete
   cuánto.
2. **No puedes devolver en efectivo.** Nota crédito en la próxima factura, compensación en gigas,
   o cambio de plan.
3. **No puedes decir que la falla es de la empresa.**

### Lo que sabes tú y nadie más

Al salir de aquí, a esa persona le llega el SMS de la encuesta de satisfacción, y **tu bono del
mes depende de esa calificación**. No la puedes pedir antes de resolver: quedaría fatal. La
necesitas y no la puedes nombrar.

Ves además, en la semana del 20 al 26 de julio, **otros cuatro reclamos idénticos de esta misma
tienda**, del mismo sector de la ciudad, y tienes instrucción interna de devolver hasta el tope
sin discutir. **Tienes prohibido decirlo con esas palabras.** Tienes en la pantalla la prueba que
le da la razón al cliente y no se la puedes enseñar.

Y sabes una cosa más: un cliente al que se le devuelve plata y vuelve el mes que viene con la
misma factura es una encuesta mala aplazada.

### Datos duros

| dato | valor |
|---|---|
| Ahora mismo | **Tuesday, August 18 · 10:40 a.m.** · ticket **07** on the screen |
| Su recibo del 5 de agosto | plan **58,900 pesos** + **42,000 pesos of extra data** |
| Lo que ves en el sistema · primer bloque | **Sunday, July 26 · 1:10 to 7:40 p.m.** · six hours of video |
| Lo que ves en el sistema · segundo bloque | **July 21 to 24 · between two and five in the morning** · the phone was not moving · this is the big one |
| Tu tope | **up to 25,000 pesos** · never cash |
| Nota crédito | **credit note** — *money which goes on your next bill, not cash* |
| Datos fuera del plan | **extra data** — *data over your 8 GB, paid apart from the plan* |
| Compensación en gigas | **8 GB more** this month and the next one, instead of the money |
| Bloqueo | **a free block: no extra data, from today** |
| Alerta del 80 % | **an alert at 80%** — it only works **in the app** |
| Por qué no llegó ningún aviso | the SMS alert **stopped in the June migration** · her line **has no app** |
| Plan de retención (desde el mostrador) | **12 GB for the price of 8 — 58,900 pesos, six months** + the **42,000 pesos** back in **three bills of 14,000** + **six months minimum: if you leave before, you pay it back** |
| Radicación escrita | **no money today, no date** · and one box to tick: **the phone was with you all the time — yes / no** |

### Andamiaje — puedes usarlo o ignorarlo

| forma | para qué sirve | registro |
|---|---|---|
| `Good morning. How can I help you?` | atender antes de que te cuenten el problema | formal |
| `When did it start?` | preguntar el día sin acusar a nadie | neutro |
| `What were you doing that afternoon?` | preguntar por la actividad, que es el dato que de verdad te falta | neutro |
| `Was the phone with you all month?` | preguntar lo incómodo sin señalar a nadie | neutro |
| `It means…` | explicar una palabra de la factura cuando te la preguntan | neutro |
| `Sorry, I didn't catch that.` | pedir que te lo repitan cuando no oíste bien | formal |
| `I can't do that, but I can…` | decir que no y ofrecer otra cosa en la misma frase | formal |
| `I can't say more than that, sorry.` | sostener lo que no puedes contar sin inventarte nada | formal |
| `For me the problem is…` | decir qué te preocupa de verdad, no solo qué ofreces | neutro |
| `Thanks for coming in today.` | despedirte de quien acabas de atender | formal |

### Lo consigues si

- Tienes el día, la hora aproximada **y qué estaba haciendo el teléfono**, y salió de una pregunta
  tuya, no de que te lo regalaran.
- Explicaste cada palabra de factura que usaste, y la otra persona la pudo repetir con sus
  palabras.
- No dijiste ni una vez que la falla es de la empresa, y aun así diste una respuesta a lo del
  aviso que no llegó.
- No pasaste de tu tope y no prometiste efectivo.
- Ofreciste al menos **dos formas distintas** de compensar y dejaste elegir.
- Esa persona sale de aquí con algo que impide que se repita, activado hoy.
- Saludaste al empezar y te despediste al terminar.

### Cómo termina

**El juego termina cuando los dos han dicho en voz alta estas tres cosas y los dos están de
acuerdo en cuáles son:**

1. **Cuánto se compensa y en qué forma:** nota crédito, gigas o descuento con permanencia.
2. **Qué se hace para que no se repita** —bloqueo, alerta, cambio de plan— **y desde cuándo.**
3. **Si el caso se cierra hoy**, o qué se lleva por escrito y qué queda pendiente.

Sin las tres, no terminó. El punto 2 no es adorno: obliga a decidir algo aquí, no a repetir lo ya
decidido.

---

## Después del juego — las dos pantallas

1. ¿Cuál fue la primera palabra de la factura que uno de los dos no entendió? ¿Cómo se resolvió:
   preguntando, adivinando o pasándose al español? Busquen el turno.
2. ¿En qué momento se dejó de hablar de plata y se empezó a hablar de qué hacer para que no se
   repita? ¿Quién lo movió?
3. Lo que acordaron, ¿lo firmarían los dos otra vez dentro de un mes? Cada uno diga qué se lleva y
   qué no se lleva.

## `grammarReferences` — insumo para `habla-integracion`, no va en la pantalla

```ts
// 4 · a-charge-i-did-not-make
grammarReferences: [
  { slug: 'past-simple-questions', title: 'Preguntas y Negativos en Past Simple A2',
    rationale: 'La queja entera se sostiene en el negativo de pasado y en la pregunta directa: "I didn\'t use this data", "Why didn\'t I get a message?", "When did it start?".' }, // a2
  { slug: 'past-continuous-a2', title: 'Past Continuous en Inglés A2',
    rationale: 'El dato que la asesora necesita y no conseguía pedir: "What were you doing that afternoon?". Sin este tema, la actividad del teléfono solo llega si el cliente la regala.' }, // a2
  { slug: 'past-simple-be', title: 'Past Simple de "to be" en Inglés A2',
    rationale: 'La pregunta incómoda, sin acusar a nadie: "Was the phone with you all month?".' }, // a2
  { slug: 'present-perfect-ever-never', title: 'Present Perfect con Ever, Never, Already y Yet',
    rationale: 'El historial del cliente en A2: "I\'ve never paid extra data, not once". Es la salida al since de duración, que sería B1.' }, // a2
  { slug: 'relative-clauses-a2', title: 'Cláusulas de relativo en Inglés A2: who, which, that',
    rationale: 'Sin este tema el acto pedir-aclaracion no tiene respuesta: "It\'s money which goes on your next bill".' }, // a2
  { slug: 'first-conditional', title: 'El Primer Condicional en Inglés A2',
    rationale: 'Las dos condiciones cruzadas del mostrador: "If you give me the date and the time, I can do it today" / "If you can block it today, I can sign now".' }, // a2
  { slug: 'quantifiers', title: 'Cuantificadores en Inglés A2',
    rationale: 'El acuerdo es parcial y se dice en cantidades: "up to 25,000", "8 GB more", "the other 17,000".' }, // a2
  { slug: 'will-future', title: 'El Futuro con Will en Inglés A2',
    rationale: 'El compromiso de cada lado en el cierre: "I\'ll sign now", "the block will start today".' }, // a2
  { slug: 'past-simple-regular', title: 'Past Simple Verbos Regulares en Inglés A2',
    rationale: 'La antigüedad se dice con año, no con since: "I opened this line in 2017"; y el consumo, con pasado simple: "he watched football all afternoon".' }, // a2
  { slug: 'can-ability', title: 'Can para habilidad en inglés A1',
    rationale: 'El tope de la asesora se dice negando y ofreciendo a la vez: "I can\'t do that, but I can…". Sustituye a los Could I…? que el registro no ancla.' }, // a1
],
```

---
---

# 5 · `late-again-on-monday`

`disculparse` + `conceder-con-condicion` · poder **b>a** · arranca **B** · desenlace **acuerdo** ·
7 min · A 7 turnos · B 7 turnos · **A = Julián**, **B = doña Amparo**

**Anclaje de gramática (A2):** `used-to-a2` (lo que hacía el bus antes y lo que hace ahora),
`first-conditional` (conceder poniendo una condición), `have-to-must`, `past-simple-regular` (la
obra empezó el 1 de agosto — fechada, nunca con `since`), `past-simple-questions`, `will-future`,
`connectors-a2`, `can-ability`, `telling-time`.

**Nota de nivel:** fuera `Let me explain what happened.` (pregunta incrustada) → `Can I explain?`.
Fuera `since 1 August` → `they started on August 1`. Fuera `leave it like this` y `logged in the
personnel file` → `a note in the shop folder`, `a written warning in your file`.

---

## Ficha del rol A — Julián

> **Esta ficha es solo tuya.** No la enseñes y no leas la otra.
> **Registro:** tú tratas de usted a doña Amparo; ella te tutea y manda. Llevan dos años
> trabajando juntos y mañana abren la tienda otra vez.
> **Empieza ella.** Te tocan unos 7 turnos.

### Situación

Almacén de repuestos para carro en la carrera 15, lunes 17 de agosto, 7:35 a. m. La tienda debía
abrir a las 7:00 y la persiana sigue a medio subir. Es el tercer lunes seguido que llegas tarde.
Doña Amparo te hace pasar a la oficina de atrás y cierra la puerta.

### Tu objetivo

Salir de esta oficina **sin memorando en la hoja de vida** y, si se puede, **con el segundo juego
de llaves del almacén**. Quien abre y recibe el camión es quien firma la guía.

### Lo que no puedes hacer

1. **No puedes decir por qué las mañanas de sábado son intocables.** Si en el almacén se enteran
   de lo tuyo, el puesto se lo dan a otro.
2. **No puedes inventar una excusa falsa ni echarle la culpa a un compañero.**
3. **No puedes cerrar esto con una promesa.** Ya prometiste lo mismo los dos lunes anteriores y no
   cambió nada: cualquier cosa que aceptes tiene que nombrar **qué cambia exactamente**.

### Lo que sabes tú y nadie más

Pagas un curso de inglés los **sábados de 8:00 a 12:00** porque necesitas el certificado B1 para
un trámite. Ya está pagado, no hay otro grupo y no hay reembolso. Si en el almacén se enteran de
que piensas irte, el ascenso se acabó. Esto no se dice en voz alta en ningún momento.

Y sabes algo que **puedes ofrecer y todavía no has ofrecido**: la vecina del 3 lleva a su hija al
mismo jardín y nunca se lo has pedido, porque pedirlo significa recoger a las dos niñas los
miércoles a las cinco, y los miércoles son tuyos. Las palabras, por si te hacen falta: **the
neighbor in apartment 3 takes her daughter to the same nursery** · **you would have to pick up both
girls on Wednesdays at five**.

### Datos duros

| dato | valor |
|---|---|
| Ahora mismo | **Monday, August 17 · 7:35 a.m.** · the shop opens at **7:00** |
| El camión de la distribuidora | **Mondays at 7:10** · two people to unload and count |
| Los tres lunes | **August 3, August 10, August 17** |
| Tu hijo | **Matías** · nursery in Girón · drop-off at **6:40** |
| Tu bus | it **used to arrive at ten to seven** · now it arrives at **a quarter past seven** |
| La obra de la carrera 15 | roadworks — they **started on August 1** · **twenty-five minutes more** |
| El bus de las 5:50 | it gets you there at **6:45** — but then the boy waits **thirty minutes alone** at the nursery door |
| Bono de puntualidad de agosto | **80,000 pesos** — you lose it with a written warning |
| El puesto de jefe de bodega | **empty for four months** |
| La hoja de compromiso | a **commitment sheet**: entry time · start date · review date · **and one line: WHAT CHANGES** |

### Andamiaje — puedes usarlo o ignorarlo

| forma | para qué sirve | registro |
|---|---|---|
| `I'm really sorry about this morning.` | disculparte una vez, al principio, y no repetirlo cada turno | formal |
| `Can I explain?` | pedir el turno para dar tu razón antes de que se decida nada | formal |
| `My bus used to arrive at…, now it arrives at…` | contar qué cambió, con las dos horas puestas | neutro |
| `Saturday mornings are difficult for me, sorry.` | cerrar una puerta sin dar el motivo | formal |
| `It's personal, sorry.` | sostener lo que no vas a contar cuando te preguntan por qué | neutro |
| `I can start at…, and…` | poner un mecanismo con hora encima de la mesa, no una promesa | neutro |
| `Sorry, can you say that again?` | pedir que te lo repitan cuando te estás jugando algo en esa frase | formal |
| `I mean…` | volver a decirlo con otras palabras cuando ves que no te entendieron | neutro |
| `I want that job.` | decir qué quieres de verdad, no solo pedir perdón | neutro |
| `Thank you, doña Amparo.` | cerrar con quien acaba de escucharte | formal |

### Lo consigues si

- **Preguntaste algo abierto en tu primer turno**, antes de empezar a disculparte, por lo que te
  encontraste al entrar.
- Te disculpaste **una vez** y después diste la razón entera: el jardín, la obra y el bus, con sus
  horas.
- Dijiste en voz alta qué quieres de verdad, y no solo lo que sientes.
- Cerraste la puerta de las mañanas de sábado **sin dar el motivo** y sin inventarte otro.
- Del renglón «qué cambia» salió algo que se puede comprobar el lunes que viene: una hora, un bus
  o una persona con nombre. Nada de «voy a cumplir».
- Sabes exactamente **qué queda escrito, en qué papel y quién lo lee**, y lo puedes repetir con tus
  palabras.
- Dijiste qué te cuesta a ti lo que aceptaste.

### Cómo termina

**El juego termina cuando los dos han dicho en voz alta estas tres cosas y los dos están de
acuerdo en cuáles son:**

1. **Qué queda escrito y dónde:** memorando en la hoja de vida · llamado escrito en la carpeta del
   almacén · la hoja de compromiso y nada más.
2. **Qué cambia exactamente el lunes que viene:** la hora de entrada, **el mecanismo** —quién lleva
   al niño, qué bus, quién abre— y la fecha de revisión.
3. **Cuándo y dónde se hace la capacitación de recepción, y qué le cuesta a cada uno**, dicho por
   el que lo paga.

Sin las tres, no terminó. El punto 2 impide cerrar con una promesa; el punto 3 impide cerrar sin
mirar el precio.

---

## Ficha del rol B — doña Amparo

> **Esta ficha es solo tuya.** No la enseñes y no leas la otra.
> **Registro:** tuteas a Julián y mandas; él te trata de usted. Llevan dos años trabajando juntos
> y en veinte minutos abren la tienda.
> **Empiezas tú.** Te tocan unos 7 turnos.

### Situación

Almacén de repuestos para carro en la carrera 15, lunes 17 de agosto, 7:35 a. m. La tienda debía
abrir a las 7:00 y sigue con la persiana a medio subir. Los lunes, a las 7:10, pasa el camión de
la distribuidora: descargar y contar contra la guía se hace entre dos, y los tres últimos lunes lo
hiciste sola. Haces pasar a Julián a la oficina de atrás y cierras la puerta.

### Cómo empieza tu primer turno — **antes de hablar**

**Pon sobre el escritorio el segundo juego de llaves del almacén y la hoja de compromiso en
blanco.** Después habla. No es decoración: es lo que dice a qué has venido, y si no lo haces, esto
se convierte en un regaño de veinte minutos.

### Tu objetivo

**Entregar hoy el segundo juego de llaves** a la única persona que conoce la bodega y a los
proveedores. Para poder hacerlo necesitas dos cosas de él: **la hoja de compromiso con el renglón
«qué cambia» lleno**, y **dos mañanas de capacitación de recepción**.

### Lo que no puedes hacer

1. **No puedes despedir ni descontar sueldo**, ni pagar recargos, ni subir sueldos. No está en tu
   mano y tampoco es lo que quieres.
2. **No puedes entregar las llaves a alguien con tres lunes tarde sin nada escrito.** Lo verían los
   otros cuatro del almacén.
3. **No puedes llenar tú el renglón «qué cambia».** Si no lo llena él, no tienes ningún papel que
   firmar.

### Lo que sabes tú y nadie más

**Tapaste los dos primeros lunes**: no los pasaste al formato de novedades (**the incident form**). Si hoy escribes un
memorando por el tercero, la pregunta que te van a hacer a ti es por qué faltan los otros dos. Por
eso estás aquí adentro con la puerta cerrada y no afuera delante de todos.

**Alba, la del mostrador, ya te pidió las llaves**: vive a tres cuadras y nunca llega tarde, pero
lleva cinco meses y no sabe recibir mercancía. Darle las llaves a Alba resuelve la puerta y no
resuelve el camión. Las palabras: **Alba, from the counter · three blocks away · never late · five
months here, she can't receive stock yet**.

Y hay algo que **podrías ofrecer y no piensas ofrecer**: dar la capacitación **two Thursdays, 6:30
to 8:30 p.m., after closing**. Son dos noches tuyas que nadie te paga, y los lunes ya trabajas
doce horas.

### Datos duros

| dato | valor |
|---|---|
| Ahora mismo | **Monday, August 17 · 7:35 a.m.** · the shop opens at **7:00** |
| El camión de la distribuidora | **Mondays at 7:10** · two people to unload and count against the delivery note |
| Los tres lunes | **August 3, August 10, August 17** |
| La hoja de compromiso | a **commitment sheet**: entry time · start date · review date · **and one line: WHAT CHANGES** |
| Lo que se puede escribir, y no hay más | **1)** a written warning **in his file** · **2)** a note **in the shop folder** · **3)** the commitment sheet and nothing else |
| La capacitación de recepción | **two mornings**: counting against the delivery note, missing items, returns |
| Cuándo está quieta la bodega | **Saturdays, 8:00 to 12:00** |
| Fecha de revisión | **Monday, September 14** |
| El segundo juego de llaves | whoever opens **signs the delivery note** |
| Los otros del almacén | **four people** — they see everything |

### Andamiaje — puedes usarlo o ignorarlo

| forma | para qué sirve | registro |
|---|---|---|
| `Sit down. I want to give you these keys.` | poner tu necesidad encima de la mesa antes que nada | informal |
| `I'm not angry.` | quitar de en medio lo que el otro está esperando oír | informal |
| `What happened?` | preguntar abierto y esperar la respuesta entera | neutro |
| `I have to write something.` | ampararte en la obligación en vez de regañar | neutro |
| `I'm asking you because…` | decir por qué se lo pides a esta persona y no a otra | neutro |
| `What if…?` | abrir una salida sin comprometerte todavía con ella | neutro |
| `If you…, I can…` | conceder poniendo una condición | neutro |
| `That helps, but I need…` | decir que se queda corto sin humillar a nadie | neutro |
| `I mean…, not…` | marcar la diferencia entre dos cosas que suenan parecidas | neutro |
| `Thanks. Let's open the shop.` | cerrar y volver al trabajo | informal |

### Lo consigues si

- **Tu necesidad estaba encima de la mesa antes de tu tercer turno** — y lo primero que hiciste fue
  ponerla ahí, no hablar.
- Preguntaste abierto al menos dos veces y esperaste la respuesta entera antes de decidir nada.
- Dijiste por qué se lo pides **a él** y no a otra persona.
- El renglón «qué cambia» quedó lleno **con sus palabras, no con las tuyas**, y con algo que se
  puede comprobar el lunes que viene.
- Dejaste claro qué papel es cuál, y él lo pudo repetir sin equivocarse.
- Sales con una fecha de capacitación que **tú puedas cumplir**, y dijiste qué te cuesta.
- No prometiste nada que no esté en tu mano.

### Cómo termina

**El juego termina cuando los dos han dicho en voz alta estas tres cosas y los dos están de
acuerdo en cuáles son:**

1. **Qué queda escrito y dónde:** memorando en la hoja de vida · llamado escrito en la carpeta del
   almacén · la hoja de compromiso y nada más.
2. **Qué cambia exactamente el lunes que viene:** la hora de entrada, **el mecanismo** —quién lleva
   al niño, qué bus, quién abre— y la fecha de revisión.
3. **Cuándo y dónde se hace la capacitación de recepción, y qué le cuesta a cada uno**, dicho por
   el que lo paga.

Sin las tres, no terminó. El punto 2 impide cerrar con una promesa; el punto 3 impide cerrar sin
mirar el precio.

### Carta de complicación — **pantalla aparte**

> **No va en esta pantalla.** Vive detrás de un botón, en su propia vista.
> **Ábrela al empezar el turno global 5** — contando los turnos de los dos: tú, él, tú, él,
> **tú**. Es tu tercer turno. Él no la ve.
>
> **Alba toca a la puerta.** Sales al pasillo treinta segundos y vuelves. Esto no llega por el
> teléfono de nadie: entra por la puerta.
>
> | dato | valor |
> |---|---|
> | Lo que ya se comenta afuera | **the four of them are talking about this morning** |
> | La pregunta que hizo uno | **why the other two Mondays are not in the incident form** |
>
> Lo que firmes ahora **tiene que poder decirse delante de los otros cuatro**. Un arreglo callado
> ya no te sirve, y cualquier cambio de horario que los demás vean va a tener que explicarse con
> algo que él dé a cambio a la vista de todos. Cuánto de esto le cuentas es cosa tuya.
>
> **Si la abres antes de tiempo:** esto deja de ser una negociación y pasa a ser un ultimátum de
> cinco turnos en el que él dice veintiuna palabras. Se te caen el jardín, la obra y el bus, que
> son justo lo que tenías que sacarle.

---

## Después del juego — las dos pantallas

1. ¿En qué turno se supo a qué había venido cada uno? ¿Se dijo con palabras o se dedujo de algo
   que se puso encima de la mesa?
2. Lean en voz alta el renglón «qué cambia» tal como quedó. ¿Es un mecanismo o es una promesa?
   ¿Cómo lo sabrían el lunes que viene?
3. Cada uno diga qué le costó lo que aceptó. Si a alguno no le costó nada, ¿quién lo pagó?

## `grammarReferences` — insumo para `habla-integracion`, no va en la pantalla

```ts
// 5 · late-again-on-monday
grammarReferences: [
  { slug: 'used-to-a2', title: 'Used to en Inglés A2: hábitos y estados del pasado',
    rationale: 'El corazón de la explicación de Julián y el mejor anclaje del set: "My bus used to arrive at ten to seven — now it arrives at a quarter past".' }, // a2
  { slug: 'first-conditional', title: 'El Primer Condicional en Inglés A2',
    rationale: 'El acto conceder-con-condicion de la supervisora: "If you fill in this line today, I can give you the keys". El tema autoriza can y have to en la cláusula if.' }, // a2
  { slug: 'have-to-must', title: 'Have to y Must en Inglés A2',
    rationale: 'Ella no regaña, se ampara en una obligación: "I have to write something"; y él explica la suya: "I have to leave him at the nursery at twenty to seven".' }, // a2
  { slug: 'past-simple-regular', title: 'Past Simple Verbos Regulares en Inglés A2',
    rationale: 'La causa se fecha en pasado, nunca con since: "the roadworks started on August 1".' }, // a2
  { slug: 'past-simple-questions', title: 'Preguntas y Negativos en Past Simple A2',
    rationale: 'Las dos preguntas abiertas que el criterio exige antes de decidir nada: "What happened?", "What time did you leave?".' }, // a2
  { slug: 'will-future', title: 'El Futuro con Will en Inglés A2',
    rationale: 'El mecanismo se compromete con hora y día de comienzo: "I\'ll start at five to seven from next Monday".' }, // a2
  { slug: 'connectors-a2', title: 'Conectores en Inglés A2: because, so, although, however, but',
    rationale: 'Razón y contraste en la disculpa y en la negativa amortiguada: "I\'m sorry, but the bus takes twenty-five minutes more because of the roadworks".' }, // a2
  { slug: 'can-ability', title: 'Can para habilidad en inglés A1',
    rationale: 'Él cierra una puerta sin dar el motivo y abre otra: "Saturday mornings are difficult for me" / "I can start at five to seven". Sustituye a los Could… que el registro no ancla.' }, // a1
  { slug: 'telling-time', title: 'Decir la hora en inglés A1',
    rationale: 'El escenario entero son horas —7:00, 7:10, 7:35, 6:40, 5:50— y el cierre exige decir la hora de entrada en voz alta.' }, // a1
],
```

---
---

# 6 · `the-cousin-on-the-sofa`

`dar-mala-noticia` + `proponer-alternativa` · poder **igual** · arranca **A** · desenlace
**acuerdo-parcial** · 8 min · A 7 turnos · B 7 turnos · **A = Dani**, **B = Cris**

**Anclaje de gramática (A2):** `present-continuous-future-a2` (planes cerrados con pasaje
comprado), `first-conditional` (la condición que desbloquea el acuerdo), `will-future`,
`quantifiers` (lo que se reparte son noches, no dinero), `connectors-a2`, `going-to`,
`there-is-there-are`, `prepositions-time`, `can-ability`.

**Nota de nivel:** fuera `by 8:00` (el registro A1 solo enseña in/on/at) → `at eight`. Ninguna de
las dos fichas trae la propuesta hecha: `six nights instead of ten` y `he sleeps in my room` eran
las salidas 1 y 2 del motor servidas en el andamiaje viejo, y aquí son plantillas vacías.

**Dani es un nombre neutro a propósito.** No hay ni una concordancia de género sobre Dani ni sobre
Cris en ninguna de las dos fichas: los dos roles los puede jugar cualquiera.

---

## Ficha del rol A — Dani

> **Esta ficha es solo tuya.** No la enseñes y no leas la otra.
> **Registro:** informal. Comparten este apartamento hace ocho meses, se tutean, y mañana
> desayunan aquí mismo. Nadie manda y nadie se puede ir.
> **Empiezas tú.** Te tocan unos 7 turnos.

### Situación

Cocina de un apartamento de dos habitaciones en Cabecera, martes 18 de agosto, 8:20 p. m. Acabas
de colgar con tu tía y entras a la cocina. Cris acaba de dejar el portátil abierto en la mesa de
la sala. Tu primo Iván llega de Cúcuta el jueves 20 y va a dormir en el sofá diez noches, hasta el
domingo 30.

### Tu objetivo

Que Iván se quede, que esto no acabe en pelea, y salir de la cocina con un plan que puedas
contarle a tu tía esta misma noche.

### Lo que no puedes hacer

1. **No puedes decir a qué viene Iván.** En la familia pidieron no contarlo hasta que haya
   respuesta. Desde fuera esto parece un primo que se viene diez días de paseo, y tú tienes que
   defender que es importante sin poder decir por qué.
2. **No puedes mandarlo a un hostal ni pagarle alojamiento.** En tu familia eso es una ofensa —un
   sobrino no paga cama teniendo dónde— y tu tía se enteraría esta misma noche.
3. **No puedes mandarlo donde tu otra tía de Floridablanca.** La casa está en obra y ya dijo que
   no.

### Lo que sabes tú y nadie más

**Ya le dijiste que sí a tu tía el domingo.** No estás pidiendo permiso: estás avisando, y lo
sabes.

Iván viene a la **entrevista final de una beca**, el viernes 21 por la mañana, y le dan la
respuesta en persona el **miércoles 26**. Eso no se dice en voz alta en ningún momento. Para ti,
y solo para ti, significa esto: a partir del 26 las últimas noches ya no son defendibles, y por
eso puedes ceder los días del final y no los del principio.

Y hay algo que **puedes ofrecer y todavía no has ofrecido**: **Óscar, in apartment 402, is in
Barranquilla from the 24th to the 30th** y te debe un favor. Hay que llamarlo esta noche y puede
decir que no.

### Datos duros

| dato | valor |
|---|---|
| Ahora mismo | **Tuesday, August 18 · 8:20 p.m.** |
| Iván | your cousin, from Cúcuta · his bus arrives **Thursday the 20th at 4:30 p.m.** · ticket already bought |
| Las noches | **ten nights: Thursday the 20th to Sunday the 30th** |
| El viernes 21 por la mañana | he has something important — **you can't say what** |
| Los otros días | **nothing fixed** — he can go out early and come back late |
| El colchón | **one single mattress at home** — it fits on the floor of a bedroom |
| La casa | **two bedrooms · one sofa · one table in the living room** |
| Tu tía | she calls **tonight** |

### Andamiaje — puedes usarlo o ignorarlo

| forma | para qué sirve | registro |
|---|---|---|
| `Have you got a minute?` | abrir sin soltar la noticia de golpe | informal |
| `I need to tell you something.` | avisar de que viene algo antes de decirlo | informal |
| `I can't tell you why, sorry.` | sostener lo que no puedes contar sin mentir | informal |
| `This is important for me, not just for him.` | decir por qué te importa a ti, ya que no puedes decir el motivo | informal |
| `What about…?` | poner una salida encima de la mesa sin prometerla | informal |
| `He can sleep…` | proponer dónde duerme sin darlo por hecho | informal |
| `Wait — when?` | reaccionar a un dato nuevo antes de contestarlo | informal |
| `What's wrong with…?` | preguntar por el motivo de un no, en vez de proponer lo mismo otra vez | neutro |
| `There's something else.` | encadenar otro asunto tuyo sin cambiar de tema de golpe | informal |
| `We're OK, right?` | cerrar sin que quede mal ambiente | informal |

### Lo consigues si

- Diste la noticia entera —cuándo llega, cuántas noches y dónde iba a dormir— en tu primer turno,
  sin adornarla.
- Sostuviste que es importante **sin dar el motivo** y sin inventarte otro.
- Cuando te dijeron que no a algo, **preguntaste por qué** en vez de proponer lo mismo otra vez. Y
  te llevaste una razón que no tenías al empezar.
- Contaste qué va a hacer Iván durante el día, porque te lo preguntaron o porque viste que hacía
  falta.
- Propusiste al menos **dos** salidas distintas, y ninguna era pagarle un sitio donde dormir.
- Sales de la cocina sin haber dicho ni una vez que el problema es de la otra persona.
- Te despediste de manera que mañana se puede desayunar aquí.

### Cómo termina

**El juego termina cuando los dos han dicho en voz alta estas tres cosas y los dos están de
acuerdo en cuáles son:**

1. **Dónde duerme Iván el jueves 20**, y quién duerme dónde esa noche.
2. **Quién tiene la sala el lunes 24 de 8:00 a 11:00.**
3. **Qué queda sin decidir y cuándo lo hablan** — el domingo 23, en la cocina, después del
   almuerzo.

El tercer punto no es adorno: es lo que convierte esto en un acuerdo parcial y no en una
conversación que se apaga. Si lo saltan, no terminó.

---

## Ficha del rol B — Cris

> **Esta ficha es solo tuya.** No la enseñes y no leas la otra.
> **Registro:** informal. Comparten este apartamento hace ocho meses, se tutean, y mañana
> desayunan aquí mismo. Nadie manda y nadie se puede ir.
> **Empieza Dani.** Te tocan unos 7 turnos.

### Situación

Apartamento de dos habitaciones en Cabecera, martes 18 de agosto, 8:20 p. m. Acabas de dejar el
portátil abierto en la mesa de la sala. Dani cuelga el teléfono y entra a la cocina.

### Tu objetivo

Que la mañana del **lunes 24** sea tuya, entera, con la mesa de la sala; y que Dani **firme la
renovación** antes del 1 de septiembre.

### Lo que no puedes hacer

1. **No puedes hacer la entrevista en tu cuarto, y no vas a explicar por qué si no te lo
   preguntan.** Te da rabia y suena a excusa: dices que necesitas la sala y punto.
2. **No puedes decir que no a la visita.** No te molesta que Iván venga, y decirlo así te dejaría
   de mala persona con alguien con quien desayunas mañana.
3. **No puedes sacar tus tres asuntos de golpe.** Uno por turno como mucho, y **el del contrato no
   lo sacas hasta que haya algo parecido a un plan**: sacarlo antes suena a que estás cobrando.

### Lo que sabes tú y nadie más

Los tres asuntos son tuyos y ninguno lo sabe Dani, que cree que trabajas siempre desde el cuarto:
la entrevista del lunes 24, el pasaje de tu mamá y la renovación del contrato.

Y sabes **por qué la sala y no el cuarto**, que es lo que no vas a decir por tu cuenta: **the wifi
drops next to the window · the window is over the bar street · at nine in the morning they are
unloading boxes**. Si te lo preguntan abierto, lo cuentas entero.

### Datos duros

| dato | valor |
|---|---|
| Ahora mismo | **Tuesday, August 18 · 8:20 p.m.** |
| Tu entrevista | **Monday the 24th at 9:00 a.m.** · **one hour** · video call · the final one |
| Dónde | **the table in the living room** — the only place with good light and good signal |
| Tu mamá | **arriving Saturday the 29th**, staying the weekend · **ticket already bought** · she was going to sleep **on the sofa** |
| La renovación | **both signatures before September 1** · without them, **you both look for an apartment in two weeks** |
| El colchón | **one single mattress at home** — it fits on the floor of a bedroom |
| La casa | **two bedrooms · one sofa · one table in the living room** |

### Andamiaje — puedes usarlo o ignorarlo

| forma | para qué sirve | registro |
|---|---|---|
| `I'm not saying no, but…` | no cerrar la puerta y poner lo tuyo en la misma frase | informal |
| `How many nights?` | pedir el dato que falta antes de opinar | informal |
| `I need the living room on…` | poner tu franja con día y hora, sin explicar más | informal |
| `I mean…` | decirlo otra vez con otras palabras cuando ves que no te entendieron | informal |
| `There's something else.` | encadenar tu segundo asunto sin cambiar de tema de golpe | informal |
| `And one more thing.` | sacar lo último que te faltaba, cuando ya hay algo parecido a un plan | informal |
| `If…, I'm OK with it.` | aceptar poniendo una condición | informal |
| `Can we do it another way?` | pedir otra salida cuando la que te proponen no te sirve | neutro |
| `If I lose this, I lose the job.` | decir qué te juegas, no solo qué necesitas | informal |
| `Thanks for telling me tonight.` | reconocer que te lo contaron a tiempo, aunque no te guste | informal |

### Lo consigues si

- Sacaste tus asuntos **de uno en uno**, en el orden que tú elegiste, y el del contrato el último.
- No dijiste que no a la visita ni una vez, y aun así la mañana del lunes 24 quedó blindada con
  hora de principio y hora de final.
- Contaste por qué la sala y no el cuarto **solo cuando te lo preguntaron**, y entonces lo contaste
  entero.
- Preguntaste algo abierto sobre los días de Iván y te llevaste un dato que no tenías al empezar.
- Dijiste qué te juegas, no solo qué necesitas.
- Sales de la cocina sin haber dicho ni una vez que el problema es de la otra persona.
- Te despediste de manera que mañana se puede desayunar aquí.

### Cómo termina

**El juego termina cuando los dos han dicho en voz alta estas tres cosas y los dos están de
acuerdo en cuáles son:**

1. **Dónde duerme Iván el jueves 20**, y quién duerme dónde esa noche.
2. **Quién tiene la sala el lunes 24 de 8:00 a 11:00.**
3. **Qué queda sin decidir y cuándo lo hablan** — el domingo 23, en la cocina, después del
   almuerzo.

El tercer punto no es adorno: es lo que convierte esto en un acuerdo parcial y no en una
conversación que se apaga. Si lo saltan, no terminó.

### Carta de complicación — **pantalla aparte**

> **No va en esta pantalla.** Vive detrás de un botón, en su propia vista.
> **Ábrela al empezar el turno global 6** — contando los turnos de los dos: Dani, tú, Dani, tú,
> Dani, **tú**. Es tu tercer turno. Dani no la ve.
>
> **Audio de tu mamá · 8:44 p. m.**
>
> | dato | valor |
> |---|---|
> | El pasaje | **changed: she arrives on Thursday the 20th, in the afternoon** |
> | Hasta cuándo | **she stays until Tuesday the 25th** |
> | Por qué lo adelantó | **to be with you on Monday** |
>
> **Esta tarjeta sustituye el dato de tu tabla:** tu mamá ya no llega el sábado 29. Llega el mismo
> día que Iván, y se queda justo el lunes. Lo que estabais armando —recortar días para que se
> vaya antes del 29— ya no existe: no hay un «antes del 29». Dani se entera solo por lo que le
> cuentes.
>
> **Si la abres antes de tiempo:** sueltas tus tres asuntos de golpe en tu primer turno, el choque
> de la sala aparece en el turno 2 en vez del 12 y esto se acaba en cuatro turnos de logística de
> camas. Llegaríais al mismo acuerdo con la mitad de lengua.

---

## Después del juego — las dos pantallas

1. ¿Qué dato del otro no habrían sabido nunca si nadie pregunta? Busquen el turno exacto en el que
   salió y quién lo sacó.
2. ¿Hubo algún momento en que uno de los dos estuvo a punto de decir «el problema eres tú»? ¿Con
   qué lo cambió?
3. Quedó algo sin decidir. ¿Entendieron los dos lo mismo sobre qué es y cuándo se habla?
   Compruébenlo: díganlo otra vez, cada uno con sus palabras.

## `grammarReferences` — insumo para `habla-integracion`, no va en la pantalla

```ts
// 6 · the-cousin-on-the-sofa
grammarReferences: [
  { slug: 'present-continuous-future-a2', title: 'Present Continuous para el futuro en Inglés A2: planes concretos',
    rationale: 'Las tres noticias del escenario son planes cerrados con pasaje comprado: "He\'s coming on Thursday the twentieth", "my mum is arriving on Thursday too".' }, // a2
  { slug: 'first-conditional', title: 'El Primer Condicional en Inglés A2',
    rationale: 'La condición que desbloquea el acuerdo y lo que cada uno se juega: "If he leaves at eight, I\'m OK with it", "If I lose this, I lose the job".' }, // a2
  { slug: 'will-future', title: 'El Futuro con Will en Inglés A2',
    rationale: 'El compromiso con hora y la firma: "I promise he\'ll be out at eight", "I\'ll sign this week".' }, // a2
  { slug: 'quantifiers', title: 'Cuantificadores en Inglés A2',
    rationale: 'Lo que se reparte no es dinero, es un número de noches y una franja de horas: "How many nights?", "only three hours".' }, // a2
  { slug: 'connectors-a2', title: 'Conectores en Inglés A2: because, so, although, however, but',
    rationale: 'Nadie cierra la puerta y todos ponen lo suyo con el mismo but: "I\'m not saying no, but on Monday I have an interview".' }, // a2
  { slug: 'going-to', title: 'Going to en inglés A1',
    rationale: 'La mala noticia se da en futuro planeado, y eso es lo que la hace sonar a hecho consumado: "He\'s going to sleep on the sofa".' }, // a1
  { slug: 'there-is-there-are', title: 'There is / There are en inglés A1',
    rationale: 'El inventario de la casa y la apertura de cada asunto nuevo: "There\'s a mattress at home", "There\'s something else".' }, // a1
  { slug: 'prepositions-time', title: 'Preposiciones de tiempo en inglés A1',
    rationale: 'Todo el reparto se dice con on/from/to/at/before: "on Thursday the twentieth", "from the twenty-fourth to the thirtieth", "before September the first". Nunca con by, que no está en el registro.' }, // a1
  { slug: 'can-ability', title: 'Can para habilidad en inglés A1',
    rationale: 'Dani sostiene lo que no puede contar y Cris pide otra salida: "I can\'t tell you why, sorry", "Can we do it another way?".' }, // a1
],
```

---
---

# Comprobaciones antes de entregar

| puerta de §6 | 4 | 5 | 6 |
|---|---|---|---|
| 3 · cero español calcable | solo cifras, fechas, horas y términos en inglés | ídem | ídem |
| 4 · andamiaje 6-10, ninguno resuelve el escenario | 10 y 10 · las tres salidas no están en ningún exponente | 10 y 10 · ni la vecina, ni Alba, ni los jueves | 10 y 10 · las salidas 1 y 2 son plantillas vacías |
| 6 · complicación en turno global 3-6 | **global 5**, a A, pantalla aparte | **global 5**, a B, pantalla aparte | **global 6**, a B, pantalla aparte |
| 7 · cierre idéntico | 3 puntos, mismas palabras | 3 puntos, mismas palabras | 3 puntos, mismas palabras |
| 8 · nivel | sin `could`, sin `since` de duración, sin incrustadas, sin pasiva | ídem | ídem |
| 9 · registro | de usted los dos, dicho en las dos fichas | ella tutea, él trata de usted, dicho en las dos | se tutean, dicho en las dos |

**Minutos contra §4.** La horquilla A2 del blueprint es hoy **5-8 minutos** y **6-9 turnos por
rol**. Los tres escenarios caben: 7 (A 8 · B 7), 7 (A 7 · B 7) y 8 (A 7 · B 7). El aviso que la
fase 4 del motor dejaba abierto queda cerrado por el techo nuevo de §4.

**Lo que sigue sin ser mío:** los actos, el poder, quién arranca, el desenlace y los turnos por
rol vienen de `fase0-plan.md` y no se han tocado. El reparto de conjunto (§5) se mide sobre los
ocho escenarios, no aquí.
