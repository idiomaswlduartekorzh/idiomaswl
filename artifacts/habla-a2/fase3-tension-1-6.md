# Habla acompañada — inglés A2 · Fase 3: auditoría de tensión de los escenarios 1 a 6

Lo que se audita son **las fichas** (`fase2-fichas-1-3.md`, `fase2-fichas-4-6.md`), no los
motores. El motor puede prometer tres salidas: si la ficha no lleva los datos que hacen
posibles esas tres, hay dos. Cuando motor y ficha se separan, gana la ficha, porque la ficha
es lo único que el jugador ve.

Marco: `docs/habla-acompanado-blueprint.md` §3 (las seis maneras de morir) y §6 (puertas 2,
5, 6 y 11). Las cinco pruebas de este informe son la versión operativa de §3.

**Convención de conteo.** «Turnos» = turnos combinados de los dos roles. El presupuesto de
fase 0 en turnos combinados es: 1 → 12, 2 → 12, 3 → 14, 4 → 15, 5 → 14, 6 → 14.

---

## Tabla de resultados

`✔` pasa · `~` pasa raspando, con la razón anotada · `✘` falla

| nº | slug | sí | silencio | única salida | carta | preguntas abiertas | aguanta | presupuesto |
|---|---|---|---|---|---|---|---|---|
| 1 | `the-bike-in-the-parking-lot` | ✔ | ✔ | ~ | ✘ | ✔ | **10** | 12 |
| 2 | `no-appointment-until-thursday` | ✘ | ~ | ~ | ~ | ✔ | **6** | 12 |
| 3 | `swap-the-saturday-shift` | ✔ | ✔ | ✔ | ✔ | ✔ | **14** | 14 |
| 4 | `a-charge-i-did-not-make` | ✔ | ✔ | ✔ | ~ | ✔ | **13** | 15 |
| 5 | `late-again-on-monday` | ✔ | ✔ | ~ | ✘ | ✔ | **9** | 14 |
| 6 | `the-cousin-on-the-sofa` | ✔ | ✔ | ✔ | ✔ | ✘ | **14** | 14 |

Tres fallos limpios (2 en la del sí, 1 y 5 en la de la carta, 6 en la de las preguntas
abiertas) y seis raspados. Ninguno de los seis muere por aburrimiento de tema: los que se
apagan lo hacen por aritmética de turnos o por una pieza que no llegó del motor a la ficha.

---

# 1 · `the-bike-in-the-parking-lot` — aguanta 10 de 12

## Prueba del sí — ✔

Juego a que A concede a la primera. No puede, y no puede por dos vías distintas, que es lo
que hace que esto respire:

- Al precio: la restricción no está en el precio, está en el **canje**. El objetivo dice
  «bajar de $400,000 solo te compensa si ganas algo a cambio», y nombra las tres monedas
  (hoy, contado, transporte ajeno). A puede decir «$360,000», pero no puede decirlo **gratis**.
- Al transporte: restricción 2, sin carro ni moto. Es un no físico, no una postura.

Y B tampoco puede aceptar los $420,000: trae $360,000 y no hay más hasta el viernes 11.
Los dos noes son concretos y las dos condiciones existen. La conversación no puede acabarse
en el turno tres ni queriendo.

## Prueba del silencio — ✔

6 y 6 sobre el papel, y en simulación se reparte solo, porque **el que manda necesita algo
que el otro no le puede dar por cortesía**: A tiene el martes 8 encima y no lo puede decir.
La restricción 1 («no puedes decir que tienes fecha límite») convierte la prisa en trabajo
lingüístico en vez de en un dato que se suelta. Ningún rol baja del 40 %.

## Prueba de la única salida — ~

El motor promete tres. La ficha sostiene dos y media, por una contradicción interna:

- **Restricción 2 de A:** «No puedes llevar la bicicleta a otro barrio ni a otro municipio.»
- **Dato duro de A:** «Si tuvieras que moverla tú | Puerta del Sol station is the furthest you
  can go, twenty minutes, and only on Monday 7 at midday.»

Puerta del Sol es otro sector de la ciudad. El jugador que lee la restricción al pie de la
letra —que es lo que se le pide— borra la salida 3 (el punto medio) antes de empezar. Quedan
dos, que es el mínimo, así que la prueba pasa; pero pasa por los pelos y por accidente.

Hay una segunda incoherencia en el mismo par de líneas: la restricción dice «el lunes 7
trabajas hasta las 5:00 de la tarde» y el dato ofrece «only on Monday 7 at midday». Un
jugador atento lo va a preguntar en voz alta y no hay respuesta en la ficha.

## Prueba de la carta — ✘

La carta es el mensaje de Yeison en el turno 4: *«he found another bike. He is not coming.»*

La quito mentalmente y la conversación termina igual. Tres razones:

1. **Yeison ya venía desactivado en la ficha.** El dato duro lo describe como «wrote
   yesterday, **no time, not confirmed**». La carta convierte «sin confirmar» en «no viene».
   La distancia entre esos dos estados, para un A2 y en el calor de un regateo, es cero.
2. **A no está obligado en ningún sitio a usar a Yeison.** Ni el objetivo, ni las
   restricciones, ni los criterios de éxito le piden que mencione al otro interesado. El
   motor razona sobre «la palanca de A se cae justo cuando la estaba usando», pero la ficha
   no le pone esa palanca en la mano. Si A no lo mencionó en los turnos 1-3 —y no tiene por
   qué—, la carta le quita algo que no tenía.
3. **La prisa de A ya estaba puesta por otra pieza más fuerte:** el dato oculto del martes 8.
   La carta es redundante con la fecha límite. Duplica una presión existente en vez de
   introducir una nueva.

Y el calendario la remata: entra en el turno 4 de 6 y el cierre exige recitar **cuatro
datos** por cabeza. Los dos turnos que quedan son el cierre. La carta llega cuando ya se
estaban despidiendo, aunque numéricamente esté dentro de la ventana de la puerta 6.

**Lectura anticipada.** Si A la lee antes: A sabe desde el turno 1 que es su único comprador
y no farolea. Efecto: cede antes, la conversación se acorta dos o tres turnos. No se rompe
—las restricciones siguen en pie— pero se apaga antes. Daño: medio, y no detectable por B.

## Prueba de las preguntas abiertas — ✔

Cuento tres datos que solo salen preguntando algo que no se contesta con sí o no:

| dato | quién lo obtiene | pregunta que hace falta |
|---|---|---|
| cómo piensa B sacar la bici de aquí (bus, camioneta del cuñado, carro por app) | A | *how / what are you going to…* |
| por qué B tiene prisa (trabajo nuevo el lunes en Cañaveral) | A | *why / when do you need it* |
| qué va incluido además de la bici (casco, luces, candado, factura) | B | *what's included / what do you have* |

Los tres están además anclados en los criterios de éxito de las dos fichas («preguntaste algo
abierto antes de dar tu última cifra» / «antes de discutir el precio»), que es la forma
correcta de exigirlo sin escribir la frase.

Bonus: «¿por qué la vende?» es una pregunta abierta natural que A **no puede** contestar con
la verdad. Eso produce lengua de la buena y no está contado arriba.

## Aguante: 10 turnos de 12. Se apaga en el turno combinado 10 (quinto de A)

Traza de la simulación:

1. B — cifra baja + Cañaveral.
2. A — rechaza las dos, da razón de las dos.
3. B — vino en bus, solo trae lo que trae hasta el viernes.
4. A — mete el casco y las luces sin bajar el precio. *(aquí abre la carta)*
5. B — camioneta del cuñado a las 6 p.m. o carro por app.
6. A — condición: si es hoy y de contado, $380,000.
7. B — $360,000 hoy, o $400,000 con la mitad el viernes 11.
8. A — elige y pone día y hora.
9. B — acepta.
10. A — **la tensión se acaba aquí.** Las dos variables (precio y transporte) están cerradas
    y no queda ninguna incógnita: la carta no aportó una tercera.
11-12. Recitado de los cuatro datos del cierre. Es trámite, no conversación.

Dos de doce turnos son ceremonia de cierre. Con un presupuesto de seis por rol, el cierre de
cuatro puntos se come un sexto del escenario.

---

# 2 · `no-appointment-until-thursday` — aguanta 6 de 12. **El más grave del set.**

## Prueba del sí — ✘

Aquí el que puede conceder es B, y B **puede decir que sí en su segundo turno**, con su propia
ficha en la mano y sin traicionar nada.

La cita que A ofrece es el **jueves 10 a las 7:00 a.m.** Miro la ficha de B a ver qué se lo
impide:

| ficha de B | dice |
|---|---|
| Objetivo (plan B) | «una fecha que puedas cumplir **sin faltar al trabajo**, y algo concreto que hacer esta noche… sin gastar más de $50,000» |
| Restricción 1 | no puede pedir un tercer permiso |
| Restricción 2 | no puede gastar más de $50,000 |
| Dato duro | «Tu horario: … the rest of the week **9:00 a.m. – 6:00 p.m.**, in Girón» |
| Dato duro | «De esta clínica a tu trabajo: **forty minutes**» |
| Dato de A | la cita del jueves «covered by the plan — **$0** to book it» |

El jueves a las 7:00 a.m. no exige permiso (entra a las 9 y hay 40 minutos de camino) y
cuesta $0. **Cumple el objetivo declarado de B y no toca ninguna de sus dos restricciones.**
Los dos números que hacen la cuenta —las 9:00 y los 40 minutos— están **en la misma tabla de
B, a cuatro filas de distancia**. El motor apostaba a que «B todavía no ha hecho esa cuenta»;
la ficha se la deja hecha.

La pieza que lo sostenía se perdió entre fase 1 y fase 2. El motor dice, literal:

> **B quiere** que lo vean **hoy**, y si no hoy, **cualquier día menos el jueves**.

«Cualquier día menos el jueves» **no está en la ficha de B**, ni como objetivo, ni como
restricción, ni como dato. Sin esa línea B no tiene razón concreta para negarse, y la
negativa queda a merced de si el jugador tiene ganas de actuar el dolor.

Consecuencia exacta: turno 1 B pide hoy · turno 2 A da el jueves · turno 3 B dice que sí. Lo
que queda después —teléfono, hora de llegada, qué hacer esta noche— no es una negociación:
es un formulario de cinco casillas que los dos rellenan por turnos.

## Prueba del silencio — ~

En turnos, 6 y 6, no baja del 40 %. Pero A es, funcionalmente, **el juez con silla que la
prueba busca**, y se salva por poco. A necesita tres cosas (el sí, el celular, la hora de
llegada) y las tres se las da B **cooperando**, no cediendo. No hay ni una sola cosa que A
necesite y que B tenga motivos para negarle.

Lo único que le da a A trabajo real es la presión de las tres citas perdidas de la semana, y
esa presión no se puede convertir en petición: A no puede decir «necesito que venga porque me
lo anotan a mí». Se queda de decorado.

Marco `~` y no `✘` porque la letra de la prueba se cumple. Pero conviene saber que se cumple
en el papel y no en la mesa.

## Prueba de la única salida — ~

El motor da tres. En la ficha, después de la carta del turno 4, quedan dos:

1. **Lista de espera de hoy** — la carta la mata a propósito. Deja de ser salida.
2. **Jueves 7:00 a.m. en firme + instrucciones para esta noche** — vive.
3. **Sede del Centro esta noche ($60,000) + jueves de respaldo** — vive, pero con una brecha:
   B trae $50,000 y la restricción 2 le prohíbe pasarse. Los $10,000 hay que resolverlos en
   voz alta (abono, o pagar el resto mañana). Está previsto y B tiene el exponente
   (`Can I pay part of it today?`). Bien.

Dos salidas: mínimo cumplido. El problema es cuál es evidente: la 2 es tan evidente que el
escenario ya se llama así. Y si sale el dato de la hinchazón, la 3 deja de ser una opción y
pasa a ser lo indicado, con lo que la pareja vuelve a tener una sola. La prueba pasa por el
canto.

## Prueba de la carta — ~

La carta (la paciente de las 5:20 confirma que viene) **sí cambia algo**, y es la única de las
seis que está construida para desmentir algo que el propio jugador dijo. La ficha de A la
prepara bien: el dato oculto le autoriza a insinuar («puedes insinuar que algo se podría
liberar, sin prometer nada») y la restricción 2 le prohíbe explicar por qué se cayó. Retirar
una casi-promesa sin poder dar el motivo es exactamente el ejercicio que se quiere.

Dos reservas, y por eso es `~` y no `✔`:

1. **Depende por completo de que A haya picado.** Si A no insinuó nada en los turnos 1-3 —y
   la insinuación es opcional, no un objetivo—, la carta le informa de algo que nunca puso
   sobre la mesa y no cambia una coma.
2. **Entra en el turno 4 de 6, y el cierre de este escenario tiene cinco puntos**, el más
   pesado del set. Los dos turnos que quedan no dan para metabolizar la carta y además
   recitar cinco datos por cabeza. La carta llega y no hay dónde jugarla.

**Lectura anticipada — este es el escenario que se rompe.** La carta se autodestruye: si A la
lee antes de tiempo, A sabe que las 5:20 no se van a liberar y **no insinúa nada**, porque
insinuar sería mentir a sabiendas. Al no insinuar, la carta se queda sin nada que desmentir
cuando llega su turno. Es decir: mirar antes no le quita a A la sorpresa, le quita al
escenario **su única jugada de mitad de partida**. De los seis, el más frágil ante el ojo
curioso, y el que menos avisa de que se ha roto.

## Prueba de las preguntas abiertas — ✔

El mejor de los seis en esta prueba, con diferencia. Datos que solo salen preguntando abierto:

| dato | pregunta que hace falta |
|---|---|
| la hinchazón del lado derecho de la cara | la restricción 3 de B lo dice explícitamente: solo sale si le preguntan «cómo está hoy», «cómo amaneció» o algo parecido |
| cuándo empezó y cómo es el dolor (despierta de noche, todo el lado derecho) | *when did it start / how is it* |
| el horario de trabajo en Girón, que es lo que decide si el jueves sirve | *what's your week like* |

Y el enredo del teléfono (B da 300 412 88 57; en pantalla sale el 315 620 44 09, que es el de
la hermana) es un hallazgo de manual: obliga a confirmar dígito a dígito, es cerrado por
naturaleza y está bien que lo sea, y no cuenta para esta prueba pero produce lengua.

La ironía del escenario es que tiene la mejor máquina de preguntas del set montada encima de
un conflicto que se resuelve en el turno tres.

## Aguante: 6 turnos de 12. Se apaga en el turno combinado 6 (tercero de B)

Traza del caso realista (B lee su propia tabla de datos):

1. B — «me duele la muela, ¿me pueden ver hoy?»
2. A — hoy y mañana lleno; lo primero es el jueves 10 a las 7:00.
3. B — protesta: entra a trabajar a las nueve y ya pidió dos permisos.
4. A — la clínica está a 40 minutos de Girón; el jueves a las 7 sale justo. Y cuesta $0.
5. B — hace la cuenta. **Acepta.**
6. A — **aquí se apaga.** No queda nada que decidir.
7-12. Celular, hora de llegada, frío en la mejilla, señal de alarma, recitado de los cinco
   puntos. Todo esto es útil pedagógicamente y es información valiosa, pero **no es tensión**:
   es dictado con verificación.

En el caso optimista —B se niega al jueves por instinto teatral, sin apoyo en su ficha—
aguanta hasta el 9. No se puede diseñar contando con que el jugador actúe una negativa que su
propia ficha no le da.

---

# 3 · `swap-the-saturday-shift` — aguanta 14 de 14. **El sano del set.**

## Prueba del sí — ✔

El mejor de los seis. B tiene **tres** razones concretas para no decir que sí, todas con
número, y **una condición explícita** bajo la cual acepta:

- el bus del domingo 13 a las 5:00 a.m. a San Gil, pagado (imposible físico, no incomodidad);
- dos cambios ya este mes y la advertencia de Wilson delante de todos (tercero → lista de
  refuerzo, adiós fines de semana fijos);
- la reserva de 40 personas del sábado 12 a las 9:00, que convierte «cúbreme la apertura» en
  «cúbreme el peor turno del mes» — y A no lo sabe.

La condición está escrita en la restricción 1 de B con la precisión que hace falta: acepta
**si queda escrito hoy en el grupo del café que el cambio lo pidió el otro**. Esa condición es
la conversación entera, tal cual pide §3.1.

## Prueba del silencio — ✔

7 y 7, y en simulación B habla más que A en la segunda mitad, porque B es el que trae la
información que da la vuelta a la partida (la reserva de 40) y el que pone precio (la propina
del 19: $110,000 contra $45,000). Nadie juzga desde la silla: no hay silla, es el único junto
al 6 donde nadie manda.

## Prueba de la única salida — ✔

Tres salidas en el motor, y las tres tienen soporte en las fichas:

1. **Partir el sábado por la mitad** — datos presentes en las dos fichas (7:00-3:00, 3:00-11:00,
   A termina a la 1:30, 35 minutos de camino, B no puede pasar de las 8:00 p.m.).
2. **Cambio de sábados con la cuenta hecha** — B tiene las dos cifras de propina; A tiene el
   viernes 18 y el sábado 19 libres y el inventario del lunes 14 como moneda extra.
3. **Partirlo en tres con un hueco de dueño conocido** — la más floja en la ficha: A no lleva
   el dato del turno del jueves 17 de Katherine que el motor usa, y encima tiene prohibido
   decir que ya le preguntó. Sobrevive como «yo la llamo a las 6», que es suficiente.

Dos completas y una parcial. Y ninguna es evidente: el punto 5 del cierre («qué parte queda
pendiente, quién la resuelve y antes de qué hora de hoy») **obliga** a que algo quede colgando
con nombre y hora, lo que impide el final redondo de manual. Es el mejor criterio de cierre
de los seis: no comprueba que hayan acordado, comprueba que sepan qué no acordaron.

## Prueba de la carta — ✔

La carta (turno 5, a A: el Speaking se mueve al sábado 12 a las 4:00 p.m., check-in 3:30) es
la única de las seis que **destruye una salida ya pactada**.

La quito mentalmente: la pareja cierra la salida 1 (B abre hasta las 2, A remata hasta las 11)
y se acaba. Con ella, A ya no puede entrar a las 2:15 y quedarse hasta las 11 — tiene que
volver a salir a las 3:00 y no regresa antes de las 5:30. **A tiene que reabrir un trato que
él mismo pidió, con B a punto de entrar a su turno.** Eso es un acto de habla nuevo, no una
subida de volumen: no es la misma conversación con más presión, es otra conversación.

Y está reforzada donde toca: el criterio de éxito de A dice «cuando tu horario cambió, **lo
dijiste tú**, antes de que el trato quedara cerrado». La carta no se puede esconder.

Colocación: turno 5 de 7, dentro de la ventana de la puerta 6, y con dos turnos por delante,
que es lo que cuesta reabrir y volver a cerrar. Ajustado, pero suficiente porque el cierre
admite dejar algo pendiente.

**Lectura anticipada.** Es el segundo daño más grave del set, aunque no rompe. Si A la lee
antes, A no propondrá jamás la salida 1 —sabe que no puede cumplirla— y el escenario pierde
su acto de mayor valor: retractarse de lo propio sin sonar a tramposo. Queda una negociación
honesta y correcta, que sigue funcionando y sigue siendo A2 legítimo, pero es el escenario
mediocre en vez del bueno. Nadie se entera de la pérdida: ni B, ni el profesor, ni A.

## Prueba de las preguntas abiertas — ✔

| dato | pregunta que hace falta |
|---|---|
| por qué es precisamente ese sábado (el IELTS, el $1,150,000, la hora) | *why that Saturday* — está en el criterio de éxito de B, literal |
| qué haría falta para que B acepte (el mensaje escrito, la fecha de devolución) | *what would help / what do you need* |
| qué tiene B ese fin de semana (el bus del domingo, el grado de la hermana) | *what about your weekend* |

Tres, y una de ellas exigida por escrito en el criterio de éxito. La reserva de 40 personas B
la suelta él, no hace falta preguntarla — bien, porque si dependiera de una pregunta se
perdería la mitad de las veces.

## Aguante: 14 de 14. No se apaga

Único de los seis que llega vivo al último turno, y llega vivo **porque el cierre le obliga a
dejar algo abierto**. Los dos turnos finales, que en el 1 y en el 2 son recitado, aquí son
redacción conjunta en voz alta de un mensaje de WhatsApp con cinco datos, uno de los cuales
(el punto 5) todavía hay que decidir. La ceremonia de cierre es, en este escenario, el último
tramo de la negociación.

---

# 4 · `a-charge-i-did-not-make` — aguanta 13 de 15

## Prueba del sí — ✔

Ninguno de los dos puede conceder. B tiene un tope duro de **$25,000** sin la firma del jefe
regional, no puede devolver efectivo, y **necesita un dato que A todavía no le ha dado** (día,
hora aproximada y qué hacía el teléfono) para poder radicar la excepción. A pide $42,000, no
puede volver otro día (viaja el jueves 20), no puede irse a otro operador y no puede mentir.

La condición bajo la cual B acepta subir está escrita en su propio andamiaje sin ser una frase
calcable de resolución: `If you give me the date and the time, I can send the report today.`
Correcto: es la condición, no la solución.

La aritmética cierra: 42,000 − 25,000 = 17,000 de radicado. El motor calcula que el sobrino
explica como mucho 12,000 de los 42,000, así que A no se queda sin razón, se queda sin la
razón **completa**. Ahí es donde el `acuerdo-parcial` deja de ser etiqueta.

## Prueba del silencio — ✔

8 y 7 (B se queda con el 46,7 %, por encima del 40 % de la puerta 5). Y B no es un mostrador
que dice no: necesita dos cosas que solo A puede darle —el dato técnico y una encuesta que no
lo hunda— y una de ellas le toca el sueldo. Es la mejor implementación del §3.2 del set junto
con el 5.

Detalle bueno: la restricción 3 le prohíbe pedir la calificación antes de resolver, y el
criterio de éxito lo confirma («la encuesta solo la mencionaste después de cerrar, o no la
mencionaste»). La necesidad aprieta sin poder verbalizarse. Eso produce lengua.

## Prueba de la única salida — ✔

Tres salidas, las tres con soporte en las fichas y las tres con costes distintos:

1. **$25,000 hoy en nota crédito + radicado por los $17,000**, respuesta el lunes 24. A cobra
   rápido pero tiene que llamar el lunes, viajando, un día antes del vencimiento.
2. **$25,000 + 8 GB de bonificación**, caso cerrado en el mostrador. Menos plata, cero
   pendientes antes del viaje. Genuinamente atractiva por el viaje del 20 al 30.
3. **Nada hoy, todo el lunes 24** con el reporte firmado. La única que da los $42,000 completos
   y la única en la que A se puede quedar sin nada.

Ninguna es la obvia («que le devuelvan todo» no está en la lista). Y la ventana de 24 horas
entre la firma (lunes 24) y el vencimiento (martes 25) es el mejor reloj del set: no es una
fecha límite decorativa, es el margen exacto que hace elegir.

## Prueba de la carta — ~

La carta (turno 4, a A: la hermana confirma que Samuel tuvo el teléfono cinco horas viendo
vídeos con datos, hasta agotar la batería) es buena literatura y **media** complicación.

La quito mentalmente y la conversación **no termina igual, pero llega al mismo sitio**:

- B tiene en su objetivo la obligación de conseguir el dato técnico, y en su andamiaje la
  pregunta explícita `Was the phone with you all month?`;
- A tiene la restricción 3: «No puedes mentir. Si te preguntan de frente si alguien más usó el
  teléfono, contestas la verdad.»

Es decir: **el sobrino sale igual, por la vía de la pregunta obligatoria de B más la
prohibición de mentir de A.** Lo que la carta añade es precisión (cinco horas, partidos,
batería agotada) y un cambio de quién lo dice: con carta, A lo suelta; sin carta, A lo admite
al ser preguntado. Es una diferencia real de registro —confesar no es lo mismo que responder—
pero no es un desvío de la conversación, es un matiz de ella. Adorno bueno, no bisagra.

Colocación: turno 4 de 8, con cuatro turnos por delante. La mejor colocación del set: es la
única carta que tiene sitio para desplegarse.

**Lectura anticipada.** Daño medio. Si A la lee antes, A entra sabiendo con certeza que parte
del consumo es suyo, y se pierde la vuelta de tuerca que el motor buscaba («entró exigiendo y
tiene que terminar negociando»). Pero A puede abrir igual con la queja (no está mintiendo: el
recibo es real y los otros $30,000 no son suyos), y B hará su pregunta igual. Sigue en pie.

## Prueba de las preguntas abiertas — ✔

Es el escenario con más preguntas abiertas obligatorias de los seis, y van en las dos
direcciones, que es lo raro:

| dato | quién | pregunta |
|---|---|---|
| qué es «datos fuera del plan» y por qué no llegó ningún aviso | A | *what does that mean / why didn't I get a message* |
| qué se puede hacer para que no se repita (el bloqueo gratuito) | A | *what can we do so that…* |
| qué día, a qué hora y qué estaba haciendo el teléfono | B | *when did it start / do you remember what day* |
| si el teléfono estuvo con A todo el mes | B | formalmente cerrada, pero la respuesta útil es abierta |

El criterio de éxito de A lo fija: «preguntaste al menos dos cosas que no sabías al entrar, y
**esperaste la respuesta entera**». Esa segunda mitad es el antídoto contra el ping-pong y no
aparece en ninguna otra ficha del set.

## Aguante: 13 de 15. Se apaga en el turno combinado 13 (séptimo de A)

Se apaga cuando se nombra la combinación (25,000 en nota crédito + radicado por 17,000 con
número de caso, o 25,000 + 8 GB). A partir de ahí quedan dos turnos de recitado de los tres
puntos del cierre. Trece de quince es el mejor ratio del set después del 3 y el 6, y el
escenario aprovecha bien tener el presupuesto más largo.

---

# 5 · `late-again-on-monday` — aguanta 9 de 14

## El encargo específico: ¿pone B su necesidad antes del tercer turno? — Sí, la ficha lo fuerza

El aviso de fase 1 era explícito («si aparece como decorado, B lo omite, y el escenario se
convierte en el interrogatorio de dos sillas que §3.2 prohíbe»). Lo verifico sobre la ficha de
B, y está en **cuatro sitios**, que es todo lo que una ficha puede hacer sin escribir el
guion:

| sitio | qué dice |
|---|---|
| Objetivo | «**Esto no es un regaño: vienes con un problema tuyo y necesitas que te lo resuelvan.**» + las dos cosas con las que tiene que salir. Y el remate: «Si sales de aquí solo con una disculpa, no tienes nada.» |
| Criterio de éxito 2 | «Pusiste tu propia necesidad sobre la mesa **antes de tu tercer turno**, no al final.» |
| Andamiaje | `I need two people for the Saturdays.` / `Can you open one Saturday?` / `Which Saturday works for you?` |
| Datos duros | la lista de los cuatro sábados de septiembre, «2 covered, 2 empty», y la fecha de entrega |

**Verificado. Pasa.** La necesidad es objetivo, no contexto, exactamente como pedía el aviso.

Con una reserva de forma que conviene dejar dicha: vive en el objetivo, en los criterios y en
el andamiaje, pero **no en las restricciones**, que es la sección que el jugador obedece al
pie de la letra. Las restricciones de B son las tres cosas que no puede hacer; ninguna dice
«no puedes pasar de tu segundo turno sin pedir el sábado». Un jugador que lea el objetivo por
encima y se agarre al papel de supervisor todavía puede regalar dos turnos de sermón antes de
llegar al grano. La ficha lo hace improbable; no lo hace imposible.

**Sin esa pieza, ¿sería un monólogo?** Sí, y de los peores. Lo mido: la ficha de A entera se
resume en disculparse una vez, dar la razón del jardín y el bus, proponer una hora de entrada
y preguntar qué queda escrito. Si B solo juzgara, A hablaría cuatro turnos seguidos y B
contestaría «ya», «ya», «ya» y «firma aquí». Con la necesidad de B sobre la mesa, A tiene de
pronto una moneda —el sábado 26 de septiembre— y el sermón se convierte en trueque. La pieza
es el escenario.

## Prueba del sí — ✔

Ninguno concede. B **no puede** dejar el asunto sin registrar por cuarta vez (restricción 2),
así que «no pasa nada, no lo escribo» está prohibido de salida. A **no puede** aceptar el
memorando (pierde el bono de $80,000 y el ascenso de octubre) y **no puede** prometer que no
se repite sin cambiar algo concreto (restricción 2 de A: hora, ruta o turno). Y la condición
de B está en su andamiaje: `If you sign this today, I won't…`

Bien montado además el hecho de que B esté igual de expuesto (tapó las dos primeras llegadas
tarde y no las pasó al formato). Eso impide que B juegue de juez.

## Prueba del silencio — ✔

7 y 7, y el que manda necesita dos cosas que solo el otro le puede dar (una firma y un
sábado). Es, con el 4, la mejor aplicación del §3.2 del set.

## Prueba de la única salida — ~

Sobre el papel, tres. En la ficha, y sobre todo después de la carta, se estrechan a dos:

- **Salida 3 (cambio de turno con Yeison, entrada a las 9:00)** muere en cuanto entra la carta:
  el recargo lo autoriza el dueño, el dueño acaba de exigir respuesta para el mediodía, y la
  restricción 3 de B le prohíbe prometer el recargo. Queda como idea que se menciona y se
  descarta.
- **«Nada escrito»** no es una salida aunque figure en la lista de datos de B («lo que se puede
  escribir: … · nothing»), porque la restricción 2 lo prohíbe. El dato y la restricción se
  contradicen; gana la restricción.

Lo que queda de verdad: **llamado verbal registrado** contra **memorando**, y qué sábado se
apunta. Son dos configuraciones, mínimo cumplido, pero todo el mundo va a aterrizar en la
misma (verbal registrado + sábado 26 de septiembre), porque es la única que le sirve a los
dos. La decisión de la pareja es más de precio que de rumbo.

**Un agujero de datos que se va a notar en voz alta.** B tiene «Cómo va esa lista: 2 covered,
2 empty» y **no dice cuáles dos**. A va a preguntar «¿cuáles le faltan?» —es la pregunta
natural y además la que decide si su sábado 26 vale algo— y B no tiene respuesta en la ficha.
Si el 26 resultara ser uno de los cubiertos, A se queda sin moneda y el escenario se cae. La
pareja improvisará; el escenario depende de que improvise a favor.

## Prueba de la carta — ✘

La carta (turno 4, a B: el dueño adelanta la lista a hoy al mediodía y ya sabe que la tienda
abrió a las 7:20) es la más vacía del set junto con la del 1.

La quito mentalmente y no cambia nada. Punto por punto:

| lo que trae la carta | por qué no cambia nada |
|---|---|
| la lista pasa del viernes 21 a **hoy al mediodía** | la conversación ocurre a las 7:35 de la mañana y **termina antes de abrir la tienda**. El objetivo de B ya decía que tiene que salir de esta oficina con la hoja firmada y un sábado. Adelantar un plazo a un mediodía que la escena no alcanza no aprieta a nadie |
| «ya no puedes tapar nada más» | la restricción 2 de B **ya** le prohibía dejarlo sin registrar por cuarta vez. La carta le quita una opción que su propia ficha le había quitado antes de empezar |
| «me dijeron que hoy la tienda abrió a las 7:20» | es información nueva sobre el mundo, pero no altera lo que B puede ofrecer ni lo que puede exigir. No abre ni cierra ninguna salida |

Es una subida de volumen, no una complicación. Lo que el auditor de tensión llama adorno: la
conversación habría terminado en el mismo trato, con las mismas palabras.

Colocación: turno 4 de 7, formalmente dentro de la ventana. No es un problema de sitio, es de
contenido.

**Lectura anticipada.** Prácticamente indiferente — y esa indiferencia es el diagnóstico. Si B
la lee antes, juega con más prisa desde el turno 1 y no se pierde nada, porque no había nada
que perder. Es la prueba más limpia de que la carta no es una carta: la única complicación del
set que sobrevive intacta a que la miren antes es también la única que no complica.

## Prueba de las preguntas abiertas — ✔

| dato | quién | pregunta |
|---|---|---|
| por qué llegó tarde tres lunes (el jardín a las 6:40, la obra de la carrera 15, los 25 minutos) | B | `What happened?` — está en el andamiaje y en el criterio de éxito («preguntaste en abierto al menos dos veces y **dejaste que él propusiera primero**») |
| qué puede ofrecer A (el sábado 26 de septiembre, las tardes) | B | `Which Saturday works for you?` |
| qué queda escrito exactamente y en qué papel | A | criterio de éxito de A: «preguntaste exactamente qué queda escrito y en qué papel» |

Tres, y la instrucción de «dejar que él proponga primero» es justo lo contrario del ping-pong.
El curso de inglés y la visa no salen nunca —está prohibido— y eso está bien: es la asimetría
que se queda de pie hasta el final.

## Aguante: 9 turnos de 14. Se apaga en el turno combinado 9 (quinto de A)

El punto exacto: **cuando A ofrece el sábado 26 de septiembre.** En ese momento los dos tienen
lo que vinieron a buscar (B su sábado y su firma; A su llamado verbal en lugar del memorando)
y no queda nada por decidir salvo la hora de entrada, que es un número que A ya trae calculado
(6:45, el bus de las 5:50) y que nadie va a discutir.

El problema es cuándo llega ese momento, y la ficha de A lo empuja hacia adelante. En «Lo que
sabes y nadie más sabe» pone, literalmente:

> Y sabes una cosa que **sí puedes usar**: el sábado 26 de septiembre no tienes clase.

La moneda va etiquetada como moneda y con permiso de uso. Un A espabilado la pone sobre la
mesa en su segundo o tercer turno, en cuanto B menciona los sábados, y el trueque se cierra
hacia el turno combinado 6-8. Un A que se la guarde estira hasta el 12. Cuento 9 como caso
central. Los cinco turnos restantes son la hoja de compromiso (hora, día de comienzo, fecha de
revisión, firma) y el recitado de los tres puntos del cierre: burocracia bien hecha, tensión
cero.

Lo que le falta a este escenario no es carta: es que a B **no le baste con un sábado**. Su
propio dato dice que tiene dos huecos y su objetivo se conforma con «al menos un sábado». Con
esa rebaja, la partida se acaba en cuanto A suelta el 26.

---

# 6 · `the-cousin-on-the-sofa` — aguanta 14 de 14

## Prueba del sí — ✔

Laura no puede conceder de entrada, y por una razón elegante: **aunque conceda, no ha
terminado**. Restricción 3: «No puedes salir de esta cocina sin sacar el tema del contrato.»
Aunque dijera «vale, que se quede diez noches», siguen abiertos el lunes 24, la mamá y las dos
firmas del 1 de septiembre. Es el único de los seis en el que un «sí» temprano no acorta la
conversación, la reordena.

Y tiene razones concretas para no decirlo: la entrevista final del lunes 24 a las 9:00, por
videollamada, en la única mesa con luz y señal; el pasaje comprado de su mamá; y $200,000 de
administración que no puede poner sola. Su condición está en el andamiaje:
`If he leaves at eight, I'm OK with it.`

Dani, por su parte, tampoco puede ceder: ya le dijo que sí a su tía el domingo, el pasaje está
comprado, no puede pagar y no puede mandarlo a Floridablanca.

## Prueba del silencio — ✔

7 y 7, y ninguno manda. Laura tiene, si acaso, más agenda que Dani (tres asuntos propios más
la carta). Dani no se queda de oyente porque tiene tres alternativas que ofrecer y una de
ellas (dormir él en el sofá diez noches) le cuesta de verdad, que es lo que su criterio de
éxito le exige: «una de ellas te costaba a ti algo real».

## Prueba de la única salida — ✔

Tres salidas antes de la carta (seis noches con la mañana del 24 blindada · Andrés al cuarto
de Dani y Dani al sofá · mitad y mitad con el apartamento de Sebastián del 402), y **después
de la carta el espacio no se cierra, se reconfigura**: el jueves 20 hay dos personas para un
solo sofá y dos cuartos. El cierre de tres puntos exige nombrar qué queda sin decidir, con
día, sitio y hora, así que el escenario está obligado a terminar sin terminar. Eso es lo que
convierte el `acuerdo-parcial` en algo que pasa en la mesa y no en una etiqueta de la tabla.

## Prueba de la carta — ✔

La carta (turno 4, a Laura: la mamá adelanta el pasaje, llega el jueves 20 por la tarde en vez
del sábado 29, se queda hasta el martes 25, y se ha adelantado precisamente **para acompañarla
el lunes 24**) es, con la del 3, la única del set que es de verdad una complicación.

La quito mentalmente: la pareja cierra en «seis noches, del 20 al 26, la sala recogida antes
de las 7:00, la mañana del lunes blindada, y Dani firma el contrato esta noche». Un acuerdo
limpio. Con la carta, esa solución **deja de existir**, porque estaba construida sobre «que
Andrés se vaya antes del 29» y ya no hay un antes del 29 que valga: la colisión se ha mudado
al jueves 20, que es pasado mañana. Y el motivo del adelanto ataca justo el punto que Laura
estaba defendiendo. Es decir: la carta no sube la presión, **cambia el problema**. Es la que
produce el desenlace que la tabla de fase 0 dice que tiene que producir.

Colocación: turno 4 de 7, tres turnos por delante para reconfigurar. Correcta.

**Lectura anticipada — se rompe, y de una forma particular.** El diseño de Laura descansa en
una decisión suya: «Los tres van a salir en esta conversación. **El orden en que salgan lo
eliges tú**», y su criterio de éxito la premia por dosificar («no los tres de golpe en un
turno»). Si lee la carta antes de tiempo, sabe desde el turno 1 que el choque es el jueves 20
y que su mamá viene por lo del lunes: lo racional pasa a ser **soltarlo todo de golpe en el
primer turno**. La carta convierte en irracional exactamente la conducta que la ficha
recompensa. Y de paso Dani nunca llega a proponer las alternativas 1 y 3, porque ambas se
refieren a un calendario que ya no existe.

Es el caso más claro del set de un escenario que se rompe si alguien mira antes de tiempo: no
pierde intensidad, pierde su mecánica. Y como el que mira es el único que lo sabe, el otro
jugador nunca se entera de que jugó a otra cosa.

## Prueba de las preguntas abiertas — ✘

Es el único de los seis que se queda por debajo de dos. Reviso qué datos salen **porque
alguien pregunta abierto** y no por otra vía:

| dato | cómo sale realmente |
|---|---|
| la entrevista del lunes 24 | Laura la suelta. Su propio criterio de éxito la obliga a sacar sus tres asuntos, y el motor la coloca en su segundo turno. No hace falta preguntar |
| el pasaje de la mamá | idem: lo saca ella |
| la renovación del contrato y los $200,000 | idem, y además es **restricción**: no puede salir de la cocina sin sacarlo. Es lo más lejos que se puede estar de una pregunta abierta |
| por qué viene Andrés | **nadie lo puede obtener.** Dani tiene prohibido decirlo. Preguntar abierto aquí no produce un dato: produce una evasiva |
| cuántas noches, desde cuándo, dónde | las tres preguntas que el criterio de éxito de Laura le exige hacer, y las tres son de respuesta corta: un número, una fecha, un sitio. `Wait, how many nights?` es exactamente el ping-pong que §3.3 describe |

Queda una sola pregunta abierta con rendimiento real, la de Dani: «¿cómo tienes la semana?»
—que su criterio de éxito le pide («preguntaste por su semana antes de cerrar ningún plan»)—.
Y es optativa en la práctica, porque Laura va a contar sus tres cosas de todos modos.

**Uno, no dos.** El escenario funciona por confesión sucesiva, no por indagación. No es un
fallo de interés —el 6 es de los más vivos del set— pero sí un fallo de la prueba: la lengua
que produce es la de anunciar y reaccionar, no la de averiguar. Y en un set donde el 6 es el
único con dos roles iguales en casa, era el sitio natural para exigir preguntar.

## Aguante: 14 de 14. No se apaga

Llega vivo al final por la misma razón que el 3: el cierre le obliga a nombrar lo que queda
sin decidir, con día, sitio y hora. La carta reabre en el turno 8 combinado y los últimos seis
turnos son el intento de recolocar el jueves 20 con dos personas y un sofá. Es el que más
tensión por minuto tiene del set.

Con una condición: **que Laura no haya mirado la carta.** Si la mira, aguanta 8.

---

# Hallazgos de conjunto

Lo que no se ve escenario a escenario y sí se ve con los seis delante.

## 1. Los seis funcionan con el mismo motor: una fecha límite más un tercero ausente que decide

No es «casi siempre». Es **seis de seis, y las dos cosas a la vez**.

| nº | la fecha límite que no se puede mover | el tercero ausente que decide de verdad |
|---|---|---|
| 1 | lunes 7 a las 6:00 p.m. (el trasteo a Bogotá es el martes 8) | Yeison, el otro interesado |
| 2 | jueves 10 a las 7:00 a.m. (primer hueco); las 8:00 p.m. de la sede del Centro | la paciente de las 5:20 · la Dra. Restrepo, a la que no se puede interrumpir |
| 3 | sábado 12 a las 8:00 a.m. (el IELTS) | Wilson, que no contesta hasta las 6:00 · Katherine · Duván |
| 4 | martes 25 (vence la factura) contra lunes 24 (firma) | el jefe regional, en Bogotá |
| 5 | viernes 21 → hoy al mediodía (la lista) | don Álvaro, el dueño · Yeison, el de mostrador |
| 6 | 1 de septiembre (las firmas) · jueves 20 (llega Andrés) | la tía · la mamá · Sebastián del 402 · la arrendadora |

Consecuencias medibles:

- **La lengua que produce el set es siempre la misma.** Fechas, horas y cifras, más la fórmula
  «tengo que preguntarle a X». No hay ni un escenario cuya tensión nazca de que dos personas
  valoren distinto la misma cosa sin que haya un reloj o un ausente de por medio. Un estudiante
  que haga los seis habrá practicado el calendario seis veces.
- **Ningún rol puede decidir del todo.** En los seis, alguien que no está en la escena tiene la
  última palabra sobre algo. Eso está bien una o dos veces —enseña a acordar sin autoridad— y
  seis veces enseña a aplazar.
- **Se echa en falta el conflicto sin reloj**: el desacuerdo de gusto, de costumbre, de
  prioridad, de cómo se hacen las cosas. Ese es el que no se resuelve mirando la agenda.

## 2. Las seis cartas llegan por el teléfono, de alguien que no está

WhatsApp de Yeison (1) · WhatsApp al teléfono de recepción (2) · correo del centro de exámenes
(3) · WhatsApp de la hermana (4) · audio del dueño (5) · audio de la mamá (6).

Seis de seis son un mensaje entrante de un tercero ausente. Ninguna complicación nace de la
propia conversación —algo que uno dice y no puede retirar, algo que el otro descubre mirándole
la cara, algo que entra por la puerta—. Es el mismo truco seis veces, y además refuerza el
hallazgo 1: el tercero ausente no solo decide, también interrumpe.

## 3. Solo tres de las seis cartas son cartas

| nº | veredicto | qué cambia |
|---|---|---|
| 3 | **complicación** | destruye una salida ya pactada y obliga a reabrir un trato propio |
| 6 | **complicación** | cambia el problema: la colisión se muda al jueves 20 |
| 2 | media | desmiente algo que A dijo, **si** A lo dijo |
| 4 | media | adelanta una revelación que la ficha de B ya obligaba a arrancar |
| 1 | **adorno** | retira una palanca que la ficha etiquetó como «not confirmed» y que A no tenía por qué usar |
| 5 | **adorno** | adelanta un plazo que la escena no alcanza y retira una opción que la restricción 2 ya había retirado |

El patrón que las separa: **las dos buenas destruyen una solución que la pareja ya estaba
construyendo; las dos malas aumentan la presión sobre una solución que sigue en pie.** Subir
la presión no es complicar.

## 4. La carta impresa en la propia ficha: tres se rompen si alguien mira antes

Las seis cartas viven dentro de la ficha del rol que las recibe, tapadas solo por una línea en
negrita. No hay página aparte, ni ruta distinta, ni pliegue. Y §8 del blueprint acepta que no
haya sincronía. Medido escenario a escenario:

| nº | qué pasa si se mira antes | daño |
|---|---|---|
| 6 | Laura suelta sus tres asuntos de golpe (lo racional pasa a ser lo que su criterio penaliza) y Dani nunca propone dos de sus tres alternativas | **rompe** |
| 2 | A no insinúa lo de las 5:20 —sería mentir a sabiendas—, y la carta se queda sin nada que desmentir. La jugada de mitad de partida desaparece | **rompe** |
| 3 | A no propone nunca la salida 1, y se pierde el acto más valioso del set: retractarse de lo propio | **rompe** (queda un escenario correcto, no el bueno) |
| 4 | se pierde el vuelco de A, pero la conversación llega al mismo sitio por la pregunta obligatoria de B | degrada |
| 1 | A no farolea y cede antes; dos o tres turnos menos | degrada |
| 5 | nada apreciable | indiferente |

Dos cosas que conviene decir juntas:

- **El daño es invisible.** Solo lo sabe quien miró. El compañero, el profesor y cualquier
  medición posterior verán una conversación que ocurrió y llegó al cierre. No hay señal.
- **La única carta que sobrevive a que la miren es la única que no complica.** El 5 es
  indiferente a la lectura anticipada porque no aporta nada; el 6 se rompe porque aporta todo.
  La resistencia al espía es, en este set, un indicador inverso de calidad de la carta.

Y una inconsistencia de forma, menor pero real: las fichas 1-3 dicen «**no la leas** hasta
terminar tu cuarto turno» y las 4-6 dicen «**ábrela cuando termines** tu cuarto turno». Dos
redacciones para la misma instrucción en el mismo set.

## 5. El cierre pesa más donde menos turnos hay

| nº | puntos que hay que recitar | turnos por rol | turnos que se come el cierre |
|---|---|---|---|
| 1 | 4 | 6 | ~2 de 12 (17 %) |
| 2 | 5 | 6 | ~2-3 de 12 (hasta 25 %) |
| 3 | 5 | 7 | 0 — el punto 5 obliga a decidir algo, así que el cierre **es** negociación |
| 4 | 3 | 8 y 7 | ~2 de 15 (13 %) |
| 5 | 3 | 7 | ~2 de 14 (14 %) |
| 6 | 3 | 7 | 0 — el punto 3 obliga a nombrar lo pendiente |

Los dos escenarios de entrada, que son los que menos presupuesto tienen (6 turnos por rol, el
suelo de A2), cargan con los cierres más largos (4 y 5 puntos). Y son también los dos donde la
carta entra con solo dos turnos por delante. El resultado, en el 1 y en el 2, es que la carta
y el cierre ocupan la misma franja de la conversación: la complicación entra cuando ya se
están despidiendo.

En cambio, los dos escenarios que llegan vivos al último turno (3 y 6) son exactamente los dos
cuyo cierre **exige nombrar lo que quedó sin decidir**. No es casualidad: un cierre que pide
recitar lo acordado es un trámite; un cierre que pide decidir qué queda abierto es el último
tramo del juego.

## 6. Dos nombres se repiten entre escenarios, como personas distintas

- **Wilson**: administrador del café en el 3 · don Wilson, supervisor del almacén de repuestos
  en el 5.
- **Yeison**: el otro interesado en la bicicleta en el 1 · el de mostrador que vive a tres
  cuadras en el 5.

Los seis comparten ciudad (Bucaramanga y su área), moneda, meses (agosto y septiembre de 2026)
y textura. Un estudiante que haga el 3 y el 5 seguidos va a preguntar si es el mismo Wilson.
No es un fallo de tensión, pero es del mismo tipo de defecto de conjunto que solo se ve con
los seis delante.

## 7. Lo que el conjunto sí hace bien, y conviene no perder al arreglar

- **Nadie muere de traducción literal (§3.4).** Ni una ficha trae la frase que hay que decir.
  Todo son cifras, fechas y horas, y el andamiaje va en inglés con uso y registro. Las seis
  fichas cumplen la puerta 3 sin excepción.
- **Ninguna ficha filtra la del otro.** Comprobado en los seis. El aviso de fase 1 sobre el 4
  («el dato del sobrino no puede aparecer en la ficha de B, ni como sospecha») se cumplió: la
  ficha de la asesora no lo menciona. Único roce, menor: la ficha de Laura afirma qué cree Dani
  («Dani cree que trabajas siempre desde tu cuarto»), que es una suposición sobre el otro más
  que un dato del otro.
- **Las fechas cuadran con el calendario real.** Comprobadas las de agosto y septiembre de
  2026 en los seis: 17/08 lunes, 18/08 martes, 20/08 jueves, 21/08 viernes, 24/08 lunes, 25/08
  martes, 29/08 sábado, 30/08 domingo; 05/09, 12/09, 19/09 y 26/09 sábados; 07/09 lunes, 08/09
  martes, 10/09 jueves, 11/09 viernes, 13/09 domingo, 17/09 jueves, 18/09 viernes. Ninguna
  fecha del set cae en el día de la semana equivocado.
- **Ninguna carta entra después del turno 6.** Turnos 4, 4, 5, 4, 4 y 4. La puerta 6 se cumple
  en los seis por colocación; donde falla (1 y 5) es por contenido.
- **La equidad se sostiene.** Nadie es despedido, nadie es humillado, el motivo médico del 6
  no se dice nunca en escena, y el dolor de muela del 2 es del propio jugador y de intensidad
  ordinaria. No hay drama importado para tapar la falta de conflicto. La tensión, donde la
  hay, sale de que los dos quieren cosas razonables y distintas — que es de donde tiene que
  salir.

---

## Resumen de lo que hay que mirar primero (no lo arreglo yo)

1. **El 2 no tiene conflicto.** A B le falta la razón para rechazar el jueves, que el motor
   tenía escrita y la ficha perdió. Seis turnos de doce.
2. **Las cartas del 1 y del 5 no son cartas.** La conversación termina igual sin ellas.
3. **El 6 se rompe si Laura mira antes de tiempo**, y el 2 y el 3 también, cada uno a su
   manera. El daño no deja rastro.
4. **El 5 se apaga en el turno 9** porque su propia ficha le enseña a A la moneda con permiso
   de uso, y porque a B le basta con un sábado teniendo dos huecos.
5. **El 6 no pregunta.** Todo lo que sabe cada uno se confiesa; solo hay una pregunta abierta
   con rendimiento.
6. **Y el conjunto entero corre sobre un solo motor**: fecha límite más tercero ausente, seis
   de seis, con la complicación entrando siempre por el teléfono.

Los sanos son el **3** y el **6** (14 de 14 cada uno), y el **4** con buen margen (13 de 15).
