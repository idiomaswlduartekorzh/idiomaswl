# Habla acompañada — inglés A2 · Fase 4: escenarios 7 y 8 corregidos

Motor de la conversación de las filas 7 y 8 de `artifacts/habla-a2/fase0-plan.md`, reescrito
después de las cinco auditorías de fase 3. **Sustituye a `fase1-escenarios-7-8.md`**: donde los
dos documentos se contradigan, manda este.

Fuente de verdad: `docs/habla-acompanado-blueprint.md`, en su versión del 19 de agosto de 2026
(§3 modo 1 con su reverso, §6 puertas 5 y 6, §9 la carta en su propia pantalla).

Esto **no** son las fichas de rol. Aquí no hay exponentes ni andamiaje: eso lo escribe
`habla-fichas-de-rol` y lo revisa `habla-calibrador-nivel`. Aquí está lo que tiene que ser
verdad para que la conversación exista.

El nº 7 está **rediseñado**: cambian los números, la carta, el reloj, quién es quién y por qué
no se puede cerrar esta noche. El nº 8 **se mantiene en pie** y se le arreglan cinco cosas
concretas.

---

## Los invariantes, y lo único que se movió

Vienen dados por fase 0 y no se tocan:

| | 7 · `two-more-people-for-the-trip` | 8 · `cancel-the-gym-i-am-leaving` |
|---|---|---|
| Actos de habla | `quejarse` + `rechazar` | `pedir-favor` + `rechazar` + `proponer-alternativa` |
| Poder | `a>b` | `b>a` |
| Arranca | B | A |
| Desenlace | `aplazado` | `sin-acuerdo` |
| Turnos por rol | A 7 · B 7 | A 8 · B 8 |
| **Minutos** | **5 → 6** | **6 → 7** |

**Los minutos suben porque la simulación los midió.** La pareja sólida, sin un solo atasco,
tardó 5:35 en el 7 y 7:50 en el 8; la floja, 9:20 y 8:40. Un ejercicio de 6 minutos que dura 10
se come el turno de los demás. Los nuevos números son los de la pareja sólida redondeados hacia
arriba, con el nº 8 ya aligerado (se le quita el tercer camino, ver §8).

**Aviso honesto sobre el nº 8:** §4 pone el techo del A2 en 6 minutos y este escenario mide 7.
Lo digo en vez de escribirlo bonito. La causa no es la lengua —la ruta mínima se escribe entera
en A2, lo comprobó el calibrador— sino la cantidad de datos duros con cifras y fechas. Dos
salidas posibles, y las dos son de David, no mías: o §4 admite que un `sin-acuerdo` de mostrador
con dos caminos cuesta 7 minutos, o el nº 8 pierde una fecha más. Lo que **no** hay que hacer es
declarar 6 y que dure 7: eso ya pasó y es lo que produjo el informe.

---

## Tres reglas que valen para los dos escenarios

### R1 · El final no se cuenta antes del turno 1

Las dos fichas de fase 2 traían impreso, antes de jugar, «hoy no se decide nada» y «hoy no te
llevas la cancelación». La intención era buena —que el estudiante no salga sintiendo que
fracasó— y el precio fue vaciar los turnos 1 a 4, que es donde viven la queja, el rechazo y la
petición. **La intención se conserva. El sitio cambia.** Dónde va exactamente cada cosa:

| Sitio | Qué puede decir | Qué no puede decir |
|---|---|---|
| **Cabecera, situación, objetivo, restricciones, datos duros, andamiaje** | Nada sobre el final | **Prohibida** cualquier frase que anticipe el desenlace, en cualquiera de las dos fichas |
| **Cierre** (idéntico en las dos fichas) | Los tres puntos, redactados como **preguntas que hay que contestar en voz alta**, más el gesto físico que termina la escena | Ninguno de los tres puntos puede leerse como respuesta. Nada de «hoy no se decide», nada de «no vas a conseguirlo» |
| **Debrief** (pantalla aparte, se abre **después** del gesto de cierre) | Ahí va la frase entera, en dos mitades: **(a)** qué estaba decidido antes de empezar y por qué, **(b)** qué era lo que sí se medía | — |

El debrief tiene que abrirse **detrás de un botón, en su propia vista**, exactamente como la
carta de complicación en §9 del blueprint. Si el debrief se imprime debajo del andamiaje, se lee
en el turno 2 y volvemos al punto de partida. Va en el encargo de `habla-integracion`.

### R2 · Quien negocia cara a cara deja de ser siempre un hombre

En el set entero, la autoridad que decide de verdad está fuera de escena y es mujer (doña Nubia,
Yeimy), y con quien se negocia en la mesa es hombre. De cinco mujeres nombradas, solo hablaba la
que pierde. Se arregla **moviendo el género de quien está en escena**, no dándole el poder a un
hombre:

- **Nº 7** — el rol A, el que tiene el poder formal (pagó la casa, la reserva está a su nombre),
  pasa a ser **Valentina**. Doña Nubia sigue fuera de escena, pero ahora **contesta**: manda la
  nota de voz, se le puede responder y responde otra vez a las 7:00 a. m. Y de los dos amigos de
  Kevin, uno es **Andrea**, con su propio fin de semana reorganizado y su propia plata en juego.
- **Nº 8** — quien está en el mostrador pasa a ser **Milena**, y quien autoriza desde el segundo
  piso pasa a ser un hombre, **Édison**. Se invierte el patrón sin inventar nada. **Yurany**, la
  posible cesionaria, deja de ser un objeto que hay que convencer: tiene una posición dicha (le
  interesa el gimnasio, no le interesa pagar los 30.000 del traspaso).

Recuento de mis dos escenarios: en escena hablan dos mujeres y un hombre; deciden fuera de
escena una mujer y un hombre; de las cinco personas nombradas que no hablan, tres tienen planes
y responsabilidad propia. El patrón se rompe sin tocar un solo dato del conflicto.

### R3 · El motivo se dice antes del turno 4, y está pedido por el escenario

Las cinco parejas simuladas se pasaron al español **en el mismo sitio en los dos escenarios**:
al decir *por qué* algo les importa. En el 7, turno 3, por qué Kevin no puede simplemente decir
que no. En el 8, turno 3, qué le prometió Duván. No es que falte andamiaje: es que el diseño
anterior no les pedía contarlo hasta que ya era tarde, y cuando llegaba el momento no había ni
la costumbre ni la herramienta.

Se coloca antes, y con mecanismo, no con instrucción:

- **Nº 7** — el objetivo de Valentina dice que **no contesta ni sí ni no hasta saber quiénes son
  los dos y por qué le importan a Kevin**. Kevin no puede avanzar sin decirlo. Turno global 3.
- **Nº 8** — el formato de novedad tiene una casilla de **motivo** que Milena tiene que
  rellenar con las palabras de la clienta, y su restricción 4 le acota qué puede preguntar. El
  motivo está pedido por el trámite en el turno global 2 y contestado en el 3.

Y los dos criterios de éxito lo cobran. Encargo a `habla-fichas-de-rol`: **cada uno de los
cuatro roles necesita al menos dos exponentes de motivo** —decir por qué algo importa, no decir
un dato—. Hoy las cuatro tablas están hechas solo de datos, plazos y actos administrativos.

---
---

# 7 · `two-more-people-for-the-trip`

`quejarse` + `rechazar` · poder **a>b** · arranca **B** · desenlace **aplazado** · **6 min** ·
A 7 · B 7

**A = Valentina** (puso la casa, la reserva está a su nombre) · **B = Kevin** (le debe su parte
y aparece con dos amigos). Fuera de escena: **doña Nubia** (dueña de la casa), **Óscar**
(hermano de Valentina, el sexto del viaje, pone el otro carro), **Sebastián** y **Andrea** (los
dos amigos de Kevin).

Registro: informal, se tutean, se interrumpen, nombres de pila. Mañana se suben al mismo carro.

## Situación

Parqueadero del conjunto, viernes 21 de agosto, 7:20 p. m. Salen mañana sábado a las 8:00 a. m.
para Mesa de los Santos, hora y media de camino. Valentina pagó hace tres semanas la casa
completa: **600.000 por dos noches, seis personas, 100.000 cada uno**. Falta el de Kevin. Kevin
baja a dejar su maleta en el baúl y, de paso, suelta que van dos amigos más.

## Lo que quiere cada uno

**Valentina.** Que mañana a las 8:00 a. m. salgan las personas que están en la lista y que
quepan en los carros. Y necesita tres cosas de Kevin, ninguna la consigue sola:

1. Los **100.000** que le debe desde el 30 de julio — o, si no hoy, **una fecha dicha en voz
   alta y escrita en el grupo de WhatsApp esta noche**.
2. **Su carro para las 8:00 a. m.**, con la gasolina que él pone.
3. Si al final hay que meter a alguien, **el nombre completo y el número de cédula** antes de
   las 7:00 a. m.

Y una regla que se pone ella: **no contesta ni sí ni no hasta saber quiénes son esos dos y por
qué le importan a Kevin.**

**Kevin.** Que Valentina mande esta noche a doña Nubia **un nombre y una cédula** —cuál de los
dos, es lo que hay que negociar— y que le acepte **el martes 25** para los 100.000. No es
capricho: **ya les cobró 100.000 a cada uno el martes** y tiene los 200.000 encima. Los dos
reorganizaron el fin de semana: Sebastián cambió un turno, Andrea pidió el sábado libre en el
trabajo y dijo que no a otra cosa.

**Por qué chocan.** La casa es de seis, la reserva es de Valentina y el que quiere meter gente
es el único que todavía no ha pagado. Y las dos cosas están atadas: Valentina no puede cobrar
sin tocar el tema de los amigos, y Kevin no puede pagar sin que se decida si van.

## Por qué Valentina no es un juez con silla

Tiene el poder formal —pagó, la reserva está a su nombre, si dice que no, no van— y aun así
depende de Kevin en tres frentes: la cédula (solo él tiene el contacto), los 100.000 y **el
carro**. Los seis van en dos carros y uno de los dos es el de Kevin; eso **está escrito también
en la ficha de él**, no solo en la de ella, para que la palanca se pueda jugar en vez de quedarse
en la cabeza de uno. Lo que Kevin no sabe es cuánto vale esa palanca hoy: eso es el secreto de
Valentina.

## Lo que sabe Valentina y Kevin no

- **El carro de Óscar está en el taller.** Le escribió a las 6:00 p. m.: lo dejó por un ruido en
  la caja y **el mecánico contesta mañana a las 7:00 a. m.** Si ese carro no sale, son seis
  personas para los cinco puestos de Kevin. Decirlo es entregarle el argumento a Kevin; callarlo
  es negociar a ciegas sobre mañana. Esa decisión es la mitad del trabajo de lengua de Valentina.
- **Óscar es el sexto y entró el miércoles** porque pone carro y gasolina. **Valentina lo
  escribió en el grupo de WhatsApp ese mismo miércoles**; Kevin no lo leyó. Va así a propósito:
  si ella hubiera metido a alguien a escondidas, el reparto de culpa de fase 0 se cae.
- **A Sebastián lo conoce** —viajó con el grupo el año pasado— **y a Andrea no la ha visto
  nunca.**

## Lo que sabe Kevin y Valentina no

- **Ya les cobró a los dos**, 100.000 a cada uno, el martes. Ese es el nudo y es la razón por la
  que no puede decir «bueno, no van» en el primer turno sin que le cueste.
- **Andrea llega al parqueadero en veinte minutos** a dejar su maleta en el baúl. Su cédula se
  puede tener esta noche, ya. Kevin no lo suelta de entrada porque no se le ha ocurrido que el
  problema pueda ser un número de cédula: él cree que el problema es la plata.
- **Sebastián está en turno en un call center hasta las 10:00 p. m.** y no contesta antes. Su
  cédula llega a las 10:05, no antes.
- **Sebastián duerme en hamaca** y ha dormido así en fincas de por allá; no necesita cama.

Los tres últimos solo salen si el otro pregunta abierto. Si la pareja hace ping-pong de
preguntas cerradas, no aparecen, y ahí es donde el escenario se les muere.

## Lo que ninguno de los dos puede hacer

**Valentina**

1. **No vuelve a poner de su bolsillo.** Ya puso 600.000 y todavía le falta el de Kevin. Puede
   pagarlo; lo que no va a hacer es pagar por alguien que no conoce. *(Es una decisión, no una
   falta de plata. Si al redactar aparece «no tengo», el escenario se salió del carril.)*
2. **No mete a nadie por la puerta de atrás.** Al conjunto no entra quien no esté en la lista de
   la portería con nombre completo y número de cédula, y la lista la cambia doña Nubia.
3. **No saca a Óscar para hacer sitio.** Óscar y su carro entran juntos: si sale él, salen
   cuatro puestos.

**Kevin**

1. **No puede darle hoy los 100.000.** Los 200.000 que tiene encima son de Sebastián y de
   Andrea. *(La razón es que esa plata no es suya. Punto. Nada de días de pago ni de sueldos: eso
   convierte un compromiso en un apuro y el escenario no va de eso.)*
2. **Esa plata se la devuelve esta noche a quien no vaya**, vaya alguien o no vaya nadie. No es
   suya ni un día más.
3. **No los sube por su cuenta**: la portería los devuelve.

**Los dos**

- **Nadie puede saber esta noche si hay cupo.** Doña Nubia contesta, pero lo que decide no lo
  decide ella sola (ver la carta).

## La zona de acuerdo

Como el desenlace es **aplazado**, estas no son soluciones que se firmen hoy: son los acuerdos
provisionales entre los que la pareja elige **cuál dejan sobre la mesa para las 7:00 a. m.**

**Salida 1 — el nombre que se manda esta noche es el de Andrea.** Es la única cédula que se
puede tener antes de las diez, porque llega en veinte minutos. Andrea pone los **50.000** que
faltan. Kevin llama a Sebastián a las 10:00 p. m. y le dice que no. La deuda queda para el
martes 25, escrita en el grupo esta noche. **Precio:** Valentina pone su nombre por alguien que
no ha visto nunca, y Kevin hace la llamada que no quiere hacer.

**Salida 2 — el nombre es el de Sebastián.** Valentina lo conoce y él duerme en hamaca, así que
la colchoneta se la puede quedar quien quiera. Hay que esperar a las 10:00 p. m. para la cédula.
Kevin le devuelve esta noche los 100.000 a Andrea y se queda sin nada para los 50.000 que
faltan: o los pone Sebastián mañana o los pone Kevin y entonces lo de Valentina pasa
inevitablemente al martes. **Precio:** Kevin le dice que no a la que ya pidió el sábado libre.

**Salida 3 — no va nadie más, y se cierra lo otro.** Kevin devuelve los 200.000 esta noche y le
paga a Valentina el martes 25, escrito en el grupo con fecha. A cambio, **su carro sale mañana a
las 8:00 con gasolina puesta pase lo que pase con el de Óscar**, y él ayuda a resolver los
puestos si el otro carro no aparece. **Precio:** Kevin queda mal con dos personas y sin excusa
el martes; Valentina espera cuatro días más.

Ninguna es la evidente («que no vayan y ya»: eso es media salida 3, y sin la parte del carro
no le sirve a Valentina). Las tres siguen dependiendo de las 7:00 a. m., porque a esa hora
contestan doña Nubia **y** el mecánico.

## Las cuentas, hechas — y por qué la carta no las apaga

Este es el punto por el que el diseño anterior se caía en el turno 5. Los números de ahora:

| | |
|---|---|
| Kevin tiene en la mano | **200.000** (100.000 de Sebastián + 100.000 de Andrea) |
| El cupo extra cuesta | **150.000** por las dos noches, y se le pagan a Valentina, que es quien tiene la reserva |
| Hay que devolverle al que no va | **100.000** |
| Kevin le debe a Valentina | **100.000** |

**200.000 − 150.000 = 50.000, y hacen falta 100.000 para devolver.** Una sola resta por turno,
con cifras redondas. Después de la carta siguen escaseando **tres** cosas y ninguna se arregla
sola:

1. **El cupo es uno para dos personas.** Alguien se queda, y alguien tiene que decírselo.
2. **Faltan 50.000** y ninguno de los dos los va a poner: Valentina por decisión (restricción 1),
   Kevin porque lo que tiene no es suyo (restricción 1). Los pone el que viaje, y hay que
   llamarlo y decírselo.
3. **Los puestos de mañana no se saben.** Si el carro de Óscar no sale, son cinco puestos para
   seis personas y el séptimo pasajero es lo primero que se cae.

Y Valentina conserva una razón escrita para seguir diciendo que no después de la carta: **le
están pidiendo que ponga su nombre y su reserva por 150.000 de alguien que todavía no le ha
pagado los 100.000 anteriores.** Eso se dice en A2 en una frase y es el escenario entero.

## La complicación

**Entra después del turno global 4 · va a Valentina · Kevin solo se entera de lo que ella le
cuente.** El disparador está escrito en turnos **globales**: en este escenario arranca B, así
que el turno 4 es el segundo de Valentina y ella la juega en el turno 6.

Nota de voz de doña Nubia:

> Mija, **cupo tengo uno solo**, me queda una colchoneta. Son **150.000** por las dos noches y me
> los pasa usted, que la reserva es suya. Pero el administrador es el que autoriza persona extra
> y ese señor no contesta de noche. **Yo le pregunto apenas se levante y antes de las 7:00 le
> aviso.** Mándeme el nombre completo y la cédula desde ya, para tenerlo listo.

**Por qué reabre y no apaga.** Hasta el turno 4 Valentina tenía la posición cómoda: «no se
puede, y no depende de mí». La carta se la quita —ahora quizá sí se puede— y a la vez le pone
precio: uno, no dos; 150.000; y a su cuenta. Tiene que decidir si lo cuenta, cuánto cuenta y si
dice que no **por decisión propia** en vez de esconderse detrás de la señora. Y el cerrojo del
aplazamiento ya no es un muro arbitrario sobre las cédulas —las cédulas se pueden conseguir
esta noche, una en veinte minutos y otra a las diez— sino un hecho externo a los dos: **el
administrador decide mañana**. Nadie tiene que ser terco para que esto no se cierre hoy.

## Por qué el que quiere salir del paso no gana

El diseño anterior estaba blindado solo en una dirección: el «sí» era imposible y el «no» era
gratis. Kevin capitulaba en su segundo turno —«listo, no van»— sin romper una sola regla y la
conversación se acababa a los dos minutos. Ahora **irse sin acuerdo le cuesta a los dos**:

- **Si Kevin capitula**, esos 200.000 dejan de ser de nadie más y su restricción 2 le obliga a
  devolverlos **esta noche**. Valentina lo tiene escrito en su objetivo: si no va nadie, quiere
  su plata hoy, y Kevin ya no tiene con qué escudarse. La capitulación no cierra la
  conversación: la lleva de cabeza al tramo que controla Valentina.
- **Si Valentina cierra en seco** («no van y punto»), se queda sin la respuesta que necesita: si
  el carro de Óscar no sale, mañana son seis personas y cinco puestos, y el que pone esos cinco
  puestos es justo el que acaba de dejar plantado. Su propia ficha se lo impide.
- **Y ninguno de los dos puede cerrar la escena solo**, porque el mensaje del grupo —el gesto de
  cierre— lo dicta uno y lo confirma el otro.

## El cierre

Idéntico en las dos fichas. **Termina cuando uno de los dos dicta en voz alta el mensaje que va
al grupo de WhatsApp y el otro lo confirma o le corrige una cosa.** Antes de dictarlo, los dos
tienen que haber contestado en voz alta:

1. **Qué pasa mañana a las 8:00 a. m. y de qué depende**: qué carros salen y quién se sube dónde.
2. **Quién llama a quién esta noche y para qué**: Andrea, Sebastián, doña Nubia.
3. **A qué hora se vuelven a hablar y qué se hace si a las 7:00 a. m. no hay respuesta.**

El mensaje dictado tiene que decir las tres. Cuando está dictado y confirmado, terminó.

*(El gesto no es adorno: tres de cinco parejas simuladas preguntaron en voz alta «¿ya está?» al
acabar el 7, y cero de cinco en el 8, que sí tenía un gesto —una firma—. Una lista de tres
puntos agotada no se siente como un final. Un teléfono que sale del bolsillo, sí. Y de paso
obliga a resumir en voz alta, que es trabajo de lengua y no lo era.)*

## Debrief (pantalla aparte, después del gesto)

1. Este escenario **no se cierra hoy**: el administrador contesta a las 7:00 a. m. y el mecánico
   también. Salir con un mensaje escrito, una hora y un plan B es exactamente lo que había que
   conseguir; no cerrarlo no es fallar el ejercicio. Lo que sí se medía: si os quejasteis sin
   acusar y si dijisteis que no sin romper nada.
2. ¿En qué momento dijo cada uno **por qué** le importaba? ¿Antes o después de discutir las
   cifras? ¿Cambió algo cuando se dijo?
3. Valentina sabía lo del carro de Óscar desde el principio. ¿Lo contó? ¿En qué turno? ¿Qué
   habría cambiado si lo hubiera contado en el primero, o si no lo hubiera contado nunca?

## Los cinco primeros turnos, jugados

- **T1 · Kevin** — Deja la maleta en el baúl y lo suelta: mañana van Sebastián y Andrea, ya les
  dijo que sí el martes.
- **T2 · Valentina** — Queja con dato duro: la casa es de seis, la lista de la portería es de
  seis, y él es el único que no ha pagado. Rechazo de frente y con razón. Y su condición: no
  contesta nada hasta saber quiénes son esos dos.
- **T3 · Kevin** — Aquí tiene que decir **por qué**: les cobró el martes, Andrea pidió el sábado
  libre, Sebastián cambió un turno. Y su condición: el martes 25 para los 100.000.
- **T4 · Valentina** — Segundo rechazo, ahora con el precio puesto: no vuelve a poner de su
  bolsillo por alguien que no conoce. Pregunta abierta (quiénes son, dónde dormirían), que es lo
  único que destapa la hamaca y lo de Andrea llegando en veinte minutos.
- **— Entra la nota de voz de doña Nubia, solo a Valentina —**
- **T5 · Kevin** — Insiste con lo único que le queda: su carro, y que sin él son dos carros menos
  uno.
- **T6 · Valentina** — Decide cuánto cuenta de la carta. Y ahí empieza la verdadera negociación:
  uno solo, 150.000, faltan 50.000, y ella todavía no ha cobrado los primeros 100.000.

Ninguno de los dos puede decir «sí, claro» en el primer turno: ella tiene seis camas, una lista
cerrada y 100.000 sin cobrar; él tiene 200.000 ajenos ya gastados en compromisos.

## Datos duros (para las fichas — nunca en español, nunca como frase hecha)

| dato | valor |
|---|---|
| Casa | Mesa de los Santos, condominio con portería, 3 habitaciones, 6 camas |
| Pagado por Valentina | 600.000 · 2 noches · 6 personas |
| Por persona | 100.000 |
| Lo que falta | el de Kevin · 100.000 · 30 de julio |
| Lo que Kevin tiene en la mano | 200.000 (de Sebastián y de Andrea, cobrados el martes) |
| Cupo extra (doña Nubia) | 1 · colchoneta · 150.000 por las dos noches · se le pagan a Valentina |
| Quién autoriza el cupo | el administrador del condominio · contesta antes de las 7:00 a. m. |
| El grupo | 6 personas · 2 carros, y uno es el de Kevin |
| Carro de Óscar | 4 puestos · en el taller · el mecánico contesta a las 7:00 a. m. |
| Carro de Kevin | 5 puestos · la gasolina la pone él |
| Sebastián | sale del turno a las 10:00 p. m. · duerme en hamaca |
| Andrea | llega al parqueadero en 20 minutos |
| Salida | sábado, 8:00 a. m., del parqueadero |
| Ahora mismo | viernes 21 de agosto, 7:20 p. m. |

**Para el redactor:** las cifras de seis dígitos se glosan en palabras la primera vez que
aparecen en la tabla; no hay tema de números en el registro de A1 ni de A2 y sin glosa el
estudiante lee la cifra en español. Y el 30 de julio se escribe como fecha suelta, no pegado a
un «desde»: `since` obliga a present perfect y ahí se produce el error canónico.

## Notas de equidad

El dinero de este escenario es una deuda pequeña entre amigos y un sobrecosto de logística.
**Nadie está sin plata.** Valentina puede pagar y decide no volver a poner; Kevin tiene 200.000
en la mano y lo que no puede es gastarse lo ajeno. Fuera quedan, por si alguien los quiere
recuperar: el día de pago de Kevin como razón de nada poder hacer (convertía un compromiso en un
apuro de liquidez) y cualquier fórmula del tipo «no me alcanza».

Ninguno de los dos roles es el malo: Kevin cobró y quiso resolver por su cuenta, Valentina puso
600.000 y le deben 100.000. Y el cupo que se puede liberar ya no es «la hermana que se puede
sacar»: es un carro que entra y sale con su dueño.

---
---

# 8 · `cancel-the-gym-i-am-leaving`

`pedir-favor` + `rechazar` + `proponer-alternativa` · poder **b>a** · arranca **A** · desenlace
**sin acuerdo** · **7 min** · A 8 · B 8

**A = Tatiana** (se va del país) · **B = Milena** (recepción). Fuera de escena: **Édison**
(coordinador de retención, segundo piso), **Yurany** (compañera de trabajo de Tatiana),
**Duván** (el vendedor que ya no trabaja ahí).

Registro: mostrador. **Milena trata a Tatiana de usted** todo el tiempo, también cuando dice que
no. Tatiana empieza neutra y tiene que quejarse sin ser grosera: es el escenario donde se aprende
que subir el tono con quien no decide no sirve de nada.

## Situación

Recepción de un gimnasio en Cabecera, martes 25 de agosto, 6:40 p. m., hora pico: detrás de
Tatiana hay cuatro personas esperando el carné. Firmó el 13 de julio un plan anual de 92.000 al
mes con **permanencia mínima de tres meses** —por eso le costó 92.000 y no 135.000— y débito
automático el día 5. Lleva un mes y doce días. Hoy le llegó el correo: le movieron la cita del
visado del 14 de noviembre al **3 de septiembre**, en Bogotá. Viaja el **30 de agosto** y no sabe
cuándo vuelve.

## Lo que quiere cada una

**Tatiana.** Que le cancelen el plan hoy y que no le cobren el 5 de septiembre. Y salir de aquí
en veinte minutos: entra a trabajar a las 7:00 a. m., sale a las 6:00 p. m., y el jueves 27 es su
último día en Bucaramanga.

**Milena.** Atender bien sin saltarse la única línea que no puede cruzar. Necesita de Tatiana
**cuatro** cosas, y esto es lo que impide que sea un mostrador diciendo que no ocho veces:

1. **Un soporte que sirva.** Y ahora **está dicho qué es**: una constancia de ausencia **de la
   ciudad**, a su nombre, **con fecha de salida y fecha de regreso**. Sirve un tiquete de ida y
   vuelta, una carta del trabajo con las dos fechas, una reserva a su nombre con las dos fechas.
   No sirve un correo sin fechas, ni un tiquete solo de ida.
2. **La fecha de regreso**, que es justo lo que Tatiana no tiene.
3. **Su firma y su cédula en el registro de atención.** Sin eso no puede radicar nada, y si
   después entra un reclamo sin registro, la que responde es ella.
4. **El motivo, en las palabras de la clienta**, para la casilla del formato.

**Por qué chocan.** Tatiana trae una fecha que no puede mover contra una cláusula que Milena no
puede mover. Ninguna de las dos escribió ninguna de las dos. Y el soporte, que sería el puente,
**falla por un solo dato**: su tiquete es de ida.

## Lo que sabe Tatiana y Milena no

- **Su tarjeta vence el 31 de agosto.** La de reposición llega en ocho días hábiles a la
  dirección registrada, donde no va a estar. El cobro del 5 de septiembre **va a rebotar haga lo
  que haga**. No lo dice de entrada porque suena a que piensa dejar de pagar a propósito. Cuándo
  lo suelte —o si lo suelta— es la decisión más interesante que toma en todo el juego, y la carta
  del turno 3 es lo que la convierte en urgente.
- **Los 92.000 los puede pagar sin problema.** Lo que no quiere es pagar dos meses de un gimnasio
  al que no va a poder ir. *(Esta línea va arriba, junto al objetivo. Sin ella, tarjeta vencida +
  cobranzas automáticas dibujan una precariedad que este escenario no tiene.)*
- **Duván, el vendedor, le prometió de palabra** que «si se va del país se lo cancelan». Duván ya
  no trabaja ahí y no hay nada escrito. Tiene razón y no tiene prueba.
- **Su tiquete Bucaramanga–Bogotá del 30 de agosto está comprado y a su nombre. Es solo de ida.**
- **Yurany, su compañera de trabajo, le preguntó por el gimnasio hace dos semanas** y no se metió
  por el precio.
- **No sabe cuándo vuelve**: el pasaporte lo entregan entre 10 y 15 días hábiles después de la
  cita.

## Lo que sabe Milena y Tatiana no

- **Radicar hoy fija la fecha.** Una solicitud vale desde el día en que se radica, con número.
  Si queda radicada hoy, Édison la puede resolver con fecha de hoy y la baja alcanza el 13 de
  octubre. Si Tatiana se va sin número y empieza de nuevo más adelante, se pasa el corte del mes
  y el plan se renueva: **un mes más, 92.000.** Esto es lo único que Milena puede darle hoy, y es
  la razón por la que a Tatiana le conviene quedarse aunque ya sepa que no le cancelan nada.
- **El contrato permite ceder el plan a otra persona.** 30.000, presencial, las dos con cédula, y
  **solo para alguien que nunca haya sido socia**. No está en la cartelera y no es lo primero que
  ofrece porque es papeleo y hay fila. Es la salida que Tatiana no sabía que existía.
- **La congelación existe y suspende el cobro hasta 60 días**, pero **no cancela**: esos días se
  suman al final de la permanencia. Tatiana cree que congelar es cancelar despacio, y no.
- **El corte de novedades del mes es el jueves 27 a las 6:00 p. m.**
- **Quien autoriza se llama Édison**, oficina del segundo piso.
- **A Milena le llamaron la atención el mes pasado** por radicar una congelación sin soporte. Es
  su razón interna y decirla en voz alta le cuesta algo.
- **A Duván lo sacaron por prometer cosas para vender**, y no fue el único. Puede decirlo o no.

## Lo que ninguna de las dos puede hacer

**Tatiana**

1. **No deja copia del correo de la embajada.** Trae su número de pasaporte, su dirección y el
   número de caso. Puede enseñarlo en la pantalla; dejarlo, no. De esta restricción sale media
   conversación: qué tapa, qué enseña, qué le sirve al formato.
2. **No puede volver en horario de oficina.** Trabaja de 7:00 a. m. a 6:00 p. m. El único hueco
   que tiene es el **jueves 27 de 12:00 a 1:00**.
3. **No pide que le devuelvan lo ya pagado ni discute el precio del plan.**
4. **No tiene que contar a dónde va ni por qué.** Con las fechas basta.

**Milena**

1. **No puede cancelar un plan con permanencia**: eso lo autoriza retención, por escrito.
2. **No puede radicar ninguna novedad sin soporte con las dos fechas**, y sabe por qué.
3. **No puede llamar a Édison ahora**: son las 6:40 p. m. y él salió a las 5:00.
4. **No pregunta a dónde va, ni para qué, ni qué pasa si no se lo dan.** Al formato le sirven las
   fechas, no el destino: pregunta **cuándo vuelve**, no **qué va a hacer allá**.

*(La cuarta es la que sostiene el veredicto de equidad y en el diseño anterior estaba prometida
en el documento del diseñador y ausente de la ficha del jugador. El visado es el reloj, no el
tema. Sin esta restricción, a un A2 que necesita una fecha de regreso le sale sola la pregunta
obvia —«where are you going?», «and if they say no?»— y el escenario se va al sitio que la
puerta 10 prohíbe. La línea espejo va en la ficha de Tatiana, y no es una prohibición: es un
permiso para no contarlo.)*

## La zona de acuerdo — **dos caminos, no tres**

El tercer camino del diseño anterior (no renovación + pago por PSE) **se borra**. Era una fila
suelta en una tabla, sin secreto, sin instrucción y sin nadie que lo ofreciera, y además empujaba
a Milena a nueve o diez turnos, fuera del techo del nivel. Un camino que no se puede decir no es
un camino: es una nota al pie. Quedan dos, y los dos están completos.

**Camino 1 — congelación de 60 días.** Suspende el cobro de septiembre y de octubre; la
permanencia se corre a diciembre. **Hoy no se puede:** el soporte necesita una fecha de regreso
que Tatiana no tiene, y lo firma Édison, que no está.

**Camino 2 — cesión del plan a Yurany.** 30.000, las dos presentes con cédula, y Yurany nunca ha
sido socia. **Hoy no se puede:** Yurany vuelve de Piedecuesta **el miércoles por la noche**, y la
cesión también la firma Édison. Y Yurany tiene su propia posición: le interesa el gimnasio, no le
interesa poner los 30.000 del traspaso. Alguien tendrá que ponerlos.

**Lo que sí pasa hoy, y no es un acuerdo:** Milena deja constancia de la solicitud, con **número
y fecha de hoy**, si Tatiana firma. No concede nada —lo que se conceda o no lo decide Édison— y
por eso el desenlace sigue siendo `sin-acuerdo`. Pero le para el reloj y le ahorra 92.000.

Lo que Tatiana se lleva y no traía: un número con la fecha de hoy, qué soporte sirve exactamente,
que la cesión existe, que congelar no es cancelar, el nombre y el piso de quien decide, la fecha
de corte y qué le pasa exactamente el 5 y el 12 de septiembre. Salió sin la cancelación y con un
mapa. Eso es lo que tiene que sentirse al final.

## La complicación

**Entra después del turno global 3 · va a Milena · Tatiana solo se entera de lo que ella le
diga.** Arranca A, así que el turno global 3 es el segundo de Tatiana y Milena la juega en el 4.

**Por qué se adelanta del turno 4 al 3.** En la simulación, la jugadora que quería salir del paso
se levantaba y se iba en el turno global 3 —su segunda intervención— y la carta que la habría
retenido entraba después del cuarto: el freno estaba puesto justo detrás de la salida. Con el
disparador en turnos globales (§6, puerta 6) el arreglo es de una línea.

Mensaje de Édison, que llega al fin al que Milena le mandó al empezar:

> No autorizo cancelaciones por viaje, ni una. Congelación sí, hasta 60 días, con soporte **con
> las dos fechas**. Dígale que si el cobro del día 5 rebota, el sistema lo manda a cobranzas
> **solo, el día 12**, y ahí ya no lo maneja nadie de aquí. Y **el jueves no estoy: tengo
> inventario. Miércoles, de 9 a 5, segundo piso.**

**Qué trae de nuevo, que es todo:**

1. **Cobranzas automático el día 12.** Le **cambia el objetivo a Tatiana a mitad de partida**: ya
   no se trata de que no le cobren, sino de que no la reporten. Y ahí su secreto —la tarjeta
   vence el 31— deja de ser cómodo y pasa a ser algo que le conviene decir. Los dos datos están
   hechos para engancharse.
2. **Édison no está el jueves.** Esto es lo que hace que el escenario no se encauce: el único
   hueco de Tatiana era el jueves de 12:00 a 1:00, y Yurany no vuelve hasta el miércoles por la
   noche. **Los dos caminos se rompen a la vez**, y los últimos cuatro turnos son las dos
   rehaciendo un plan que se acaba de caer. Sin esto, la carta anterior le repetía a Milena tres
   cosas que ya sabía y solo aportaba una.

Y le quita a Milena el colchón del «déjeme consultar»: a partir de aquí el no es suyo y lo tiene
que sostener de frente, que es el acto que le toca.

## Por qué la que quiere salir del paso no gana

Antes, Tatiana se iba en el turno 3 y no la retenía nada: su propio secreto la vacunaba contra la
única palanca disponible («la cobran el 5» — ya sabe que va a rebotar). Ahora:

- **Irse le cuesta 92.000 contados.** Sin número radicado hoy, se pasa el corte y el plan se
  renueva un mes más. Está dicho en la primera intervención de Milena, en cifras, y no depende de
  ningún secreto.
- **Y la carta llega antes de que pueda irse.** Turno global 3: el reporte a cobranzas del día 12
  está encima de la mesa cuando Tatiana todavía tiene seis turnos por delante.
- **Milena también pierde si Tatiana se va.** Necesita la firma; sin registro, un reclamo
  posterior cae sobre ella, que ya lleva un llamado de atención por escrito. **Cada una tiene lo
  que la otra necesita**, y por eso el mostrador deja de ser un muro: la obligación de Milena es,
  por fin, algo que Tatiana quiere.
- **Y si es Milena la que ataja** —soltar congelación, cesión, Édison y el corte de golpe en dos
  turnos— se queda sin la firma y sin el motivo para la casilla, y su propio criterio de éxito no
  se cumple.

## El cierre

Idéntico en las dos fichas. **Termina cuando Tatiana firma el registro y Milena le dice en voz
alta el número y la fecha, y Tatiana lo repite para comprobar que lo copió bien.** Antes de
firmar, las dos tienen que haber contestado en voz alta:

1. **Qué queda escrito hoy y qué no**, dicho por Tatiana con sus palabras.
2. **Cuál de los dos caminos va a intentar primero y qué tiene que llevar.**
3. **Con quién, dónde y a qué hora**, y qué pasa el 5 y el 12 de septiembre si no hace nada.

*(El punto 2 obliga a elegir **uno**. Si alguien «mejora» el cierre pidiendo que Tatiana resuma
los dos, el escenario pasa a medir memoria de trabajo en inglés y deja de ser A2. Queda anotado
como invariante. Y el número dicho, apuntado y repetido es a la vez el gesto que cierra la escena
y el único momento del set donde alguien tiene que pedir que le deletreen algo.)*

## Debrief (pantalla aparte, después de la firma)

1. **Nadie consigue hoy la cancelación**: está decidido por el escenario, no por cómo lo
   hicisteis, y no es fallar el ejercicio. Lo que se medía es otra cosa: si Tatiana consiguió
   salir con más de lo que traía, y si Milena dijo que no **y** dijo qué sí.
2. ¿Cuáles de los «no» de Milena eran suyos y cuáles eran de otro? ¿Se notó la diferencia al
   oírlos?
3. Tatiana sabía desde el principio que el cobro del 5 iba a rebotar. ¿Lo contó? ¿En qué turno?
   ¿Le sirvió de algo callárselo?

## Los cinco primeros turnos, jugados

- **T1 · Tatiana** — Pide la cancelación y da la razón: le movieron la cita, viaja el 30, trae el
  correo. Petición directa con razón.
- **T2 · Milena** — Saluda, y rechaza con razón concreta: permanencia hasta el 13 de octubre, y
  ella no autoriza eso. No es «no se puede»: es «yo no puedo, y le digo quién sí». Y pone encima
  lo único que sí puede hacer hoy —el número con fecha de hoy— con lo que cuesta no hacerlo:
  92.000. Pide el motivo para la casilla.
- **T3 · Tatiana** — Aquí dice **por qué**: lo que le prometió Duván cuando firmó, y que el jueves
  27 es su último día. Queja educada. Y choca la restricción del correo: enseñar sí, dejar no.
- **— Entra el mensaje de Édison, solo a Milena —**
- **T4 · Milena** — Sostiene el no sin colchón, pide el soporte y dice **qué es**: nombre y las
  dos fechas. Suelta el día 12. Ahí cambia el objetivo de Tatiana.
- **T5 · Tatiana** — Ofrece lo que tiene: el tiquete del 30, comprado y a su nombre. Y descubre
  que falla por un solo dato: es de ida.

Milena no puede decir «sí, claro» en el primer turno: la permanencia está firmada, la
autorización no es suya y el mes pasado radicó algo sin soporte y le llamaron la atención. Su
condición para ayudar es explícita: **con soporte con las dos fechas, con Édison, y antes del
corte del jueves 27 a las 6:00 p. m.**

## Datos duros (para las fichas — nunca en español, nunca como frase hecha)

| dato | valor |
|---|---|
| Hoy | martes 25 de agosto, 6:40 p. m. |
| Firma del contrato | 13 de julio |
| Plan | 12 meses · 92.000 al mes · permanencia mínima 3 meses |
| Por qué firmó 3 meses | le salía 92.000 en vez de 135.000 |
| Fin de la permanencia | 13 de octubre |
| Débito automático | día 5 de cada mes |
| Cita del visado | 3 de septiembre, Bogotá |
| Viaje | 30 de agosto |
| Tiquete de Tatiana | comprado, a su nombre, **solo de ida** |
| Entrega del pasaporte | entre 10 y 15 días hábiles después de la cita |
| Tarjeta de Tatiana | vence el 31 de agosto; reposición en 8 días hábiles |
| Soporte que sirve | nombre + fecha de salida **y** fecha de regreso |
| Cobranzas | automático el día 12, si el cobro del 5 rebota |
| Congelación | hasta 60 días, con soporte; corre la permanencia |
| Cesión del plan | 30.000 · presencial · las dos con cédula · solo para quien nunca haya sido socia |
| Radicar hoy | fija la fecha; sin número, se pasa el corte y se renueva un mes (92.000) |
| Corte de novedades | jueves 27, 6:00 p. m. |
| Édison (retención) | 2.º piso · **miércoles**, 9:00 a. m.–5:00 p. m. |
| Yurany | vuelve de Piedecuesta el miércoles por la noche |
| Horario de Tatiana | 7:00 a. m.–6:00 p. m.; libre el jueves de 12:00 a 1:00 |

**Para el redactor:** el precio sin permanencia deja de ser un dato prohibido y pasa a ser la
razón por la que firmó tres meses. Y el léxico de trámite —cobranzas, días hábiles, corte,
radicar— se glosa una vez, en su primera aparición: `collections` es el dato que le cambia el
objetivo a Tatiana, y si no lo descodifica, la carta no reabre nada.

## Notas de equidad

1. **El visado es el reloj, no el tema.** Nadie pregunta a dónde va, nadie opina sobre migrar,
   nadie pregunta si se lo van a dar — y ahora **está escrito en la ficha de quien podría
   preguntarlo**, no solo en el documento del diseñador. Todo lo que se discute es de ciudad y de
   fechas: el soporte es una constancia de ausencia **de la ciudad** y el tiquete es
   Bucaramanga–Bogotá.
2. **Milena no es la villana.** Tiene una política que no escribió, una advertencia encima por
   haber intentado ayudar de más el mes pasado, y termina dándole a Tatiana más de lo que Tatiana
   vino a pedir. Y ahora tiene **con qué** ejercer criterio: sabe qué soporte sirve y puede
   decirlo. Un empleado que solo puede negar es un muro; uno que puede decir qué sí, es una
   persona.
3. **Tatiana no queda humillada.** Pierde la petición y gana el mapa: un número con fecha, dos
   caminos, un nombre, un piso y un horario. El aprendizaje es que reclamar bien a quien no
   decide sirve para averiguar quién decide.
4. **No hay crisis económica**, y ahora está dicho en positivo: puede pagar los 92.000 y lo que
   no quiere es pagar dos meses de algo que no va a usar.
5. **Duván tiene derecho a réplica**, en boca de Milena: lo sacaron por prometer para vender, y
   no fue el único. Deja de ser el ausente al que se le cuelga el muerto.

---
---

# Lo que le queda por decidir a `habla-fichas-de-rol`

No lo cierro yo porque no es motor, es redacción, pero no se improvisa:

1. **Cuatro funciones que el andamiaje de fase 2 no tenía y que estos dos motores exigen.** No
   escribo las formas; digo qué tiene que poder hacer cada rol:
   - **decir por qué algo importa** (motivo, no dato) — los dos puntos de fuga al español del
     set están ahí, y ahora el escenario lo pide en el turno 3 (regla R3);
   - **resolver una reparación**, no solo iniciarla: hoy los cuatro roles pueden preguntar «¿qué
     quiere decir?» y ninguno puede reformular. La primera vez que alguien lo pregunte, la pareja
     se pasa al español;
   - **abrir y cerrar socialmente**: un saludo de parqueadero y uno de mostrador, un
     agradecimiento, una despedida. Los dos cierres de fase 4 terminan en un gesto, y un gesto sin
     una palabra encima queda cortado en seco;
   - **buscar una palabra que no se sabe**. Es el turno más frecuente entre dos A2 y no existe en
     ninguna de las cuatro fichas.
2. **Las dos cartas se entregan en su propia pantalla**, detrás de un botón, con el turno global
   escrito encima (§9). Nunca debajo del andamiaje.
3. **El andamiaje no puede traer resuelta ninguna salida.** Si un exponente dice entera la frase
   que cierra la negociación, la puerta 4 se cae.
4. **Prohibido en los dos** (fase 0, anclaje de nivel): ironía, concesión larga, discurso
   indirecto extenso y condicional de cortesía compuesto. El nº 7 es una queja + un rechazo con
   dato duro, no un atenuador de B1 disfrazado. Y el traslado de las dos cartas se hace con datos,
   no con «ella dijo que…».

# Encargos a `habla-integracion`

1. **El debrief va detrás de un botón, en su propia vista**, y se abre después del gesto de
   cierre. Es lo que hace posible la regla R1: la frase que evita que el estudiante se sienta
   fracasado existe, y existe **después**.
2. El disparador de las dos cartas se escribe en **turnos globales** (`afterTurn: 4` en el 7,
   `afterTurn: 3` en el 8), y la vista lo dice con esas palabras.
3. `minutes` del nº 8 va a 7, por encima del techo de §4. O se ajusta §4 o se recorta el
   escenario: no se declara 6 y se dejan durar 7.

---

# Qué cambió y qué informe lo pidió

| # | Cambio | Escenario | Lo pidió |
|---|---|---|---|
| 1 | Las cuentas se rehacen: **un cupo, no dos**; 150.000, no 45.000×2; y se le pagan a quien tiene la reserva. Después de la carta siguen escaseando el cupo, 50.000 y los puestos de mañana | 7 | tensión (hallazgo 1: se apagaba en el turno 5 · 200.000 − 90.000 > la deuda) |
| 2 | El aplazamiento deja de colgar de un muro arbitrario: las cédulas **sí** se pueden conseguir esta noche, y lo que no se puede saber es si el administrador autoriza el cupo. Contesta a las 7:00 a. m. | 7 | tensión (hallazgo 2: la restricción de las cédulas se contradecía con sus propios datos) |
| 3 | El carro de Óscar entra en el taller y el mecánico contesta a las 7:00 a. m.: hay una segunda razón, independiente de los amigos, por la que mañana no se sabe hoy | 7 | tensión (hallazgo 2) · simulación («por qué el 7 no cierra») |
| 4 | **El «no» deja de ser gratis**: si Kevin capitula, los 200.000 dejan de ser ajenos y Valentina los reclama esta noche; si Valentina cierra en seco, se queda sin los cinco puestos que necesita | 7 | blueprint §3 modo 1, reverso · simulación 7.5 (el atajista ganaba en 2:10) |
| 5 | Kevin sabe que el grupo va en dos carros y que uno es el suyo. La palanca deja de vivir solo en la cabeza de Valentina | 7 | tensión (hallazgo 5) · equidad E7-3 |
| 6 | El cierre pasa a tener **gesto**: uno dicta el mensaje del grupo en voz alta y el otro lo confirma | 7 | simulación (3 de 5 parejas preguntaron «¿ya está?»; 0 de 5 en el 8, que tenía firma) |
| 7 | «No puedes poner más plata» → «no vuelves a poner de tu bolsillo, **puedes** pagarlo». Fuera el día de pago de Kevin como razón | 7 | equidad E7-1 y E7-2 |
| 8 | Fuera los 400.000 y el «todavía no han vuelto todos»: se dice «ya pusiste 600.000, falta el de Kevin» | 7 | equidad E7-4 |
| 9 | La hermana que se podía sacar desaparece: entra **Óscar** y la restricción es sobre el cupo del carro, no sobre una persona. **Andrés → Andrea**, con su propio fin de semana en juego. Laura fuera (chocaba con el escenario 6) | 7 | equidad E7-5, E7-6 · encargo 9 |
| 10 | **A pasa a ser Valentina**: quien tiene el poder formal y está en escena es una mujer, y doña Nubia contesta en vez de decidir en ausencia | 7 | equidad (conjunto, punto 1 y 2) · encargo 9 |
| 11 | La carta del 8 se adelanta al **turno global 3** | 8 | simulación 8.5 (la atajista se iba en T3; el freno entraba después del T4) · blueprint §6 puerta 6 |
| 12 | **El radicado con número y fecha**: lo único que Milena puede dar hoy, vale 92.000 y es la razón por la que a Tatiana le conviene quedarse. Y ella necesita la firma tanto como Tatiana el número | 8 | simulación 8.5 (nada la retenía; la obligación de B no era un derecho de B) · tensión §3.2 |
| 13 | **Cuarta restricción de quien atiende, escrita**: no pregunta a dónde va, ni para qué, ni si se lo van a dar. Con línea espejo en la otra ficha | 8 | equidad E8-2 (bloqueante) |
| 14 | **El soporte queda definido**: nombre + las dos fechas; y Tatiana tiene algo que ofrecer —su tiquete— que falla por un solo dato, porque es de ida | 8 | equidad E8-1 (bloqueante) · tensión (B solo podía negar) |
| 15 | **Se borra el camino del PSE.** Dos caminos, completos y decibles, en vez de tres con uno huérfano | 8 | calibrador S8.3 (opción B: sin él, B se iba a 9-10 turnos) · tensión (reserva de la prueba 3) |
| 16 | La carta trae **dos cosas nuevas** —cobranzas el día 12 y que Édison no está el jueves— en vez de repetirle a Milena tres que ya sabía. Y al romper el jueves rompe los dos caminos a la vez | 8 | tensión (prueba 4, reserva 1 y 2: el único aporte de la carta no estaba anclado en ningún criterio) |
| 17 | «Puede pagar los 92.000» sube al lado del objetivo; el precio sin permanencia pasa de dato prohibido a razón | 8 | equidad E8-3 y E8-5 |
| 18 | **B pasa a ser Milena y quien autoriza pasa a ser Édison**: se invierte el patrón sin darle el poder a un hombre en escena. Yurany gana una posición propia; Duván gana derecho a réplica | 8 | equidad (conjunto, puntos 1 y 2) · E8-7 · encargo 9 |
| 19 | **El aviso del final sale de la cabecera**: los tres puntos del cierre se redactan como preguntas, y la frase que evita el sentimiento de fracaso va en el **debrief**, en pantalla aparte | 7 y 8 | tensión (hallazgo 3) · encargo 8 |
| 20 | **El motivo se pide antes del turno 4**, y con mecanismo: en el 7, Valentina no contesta hasta saber por qué; en el 8, el formato tiene casilla de motivo | 7 y 8 | simulación (diagnóstico transversal 3: los dos puntos de fuga al español son el mismo acto y el mismo turno) |
| 21 | **Minutos: 5 → 6 y 6 → 7**, con el desvío del 8 sobre §4 declarado en vez de disimulado | 7 y 8 | simulación (diagnóstico transversal 5) |
| 22 | Cifras redondas y pocas, con glosa exigida; el 30 de julio como fecha suelta y la regla de la cesión escrita sin infinitivo perfecto | 7 y 8 | calibrador T4, T5, S7.2, S8.2 |
