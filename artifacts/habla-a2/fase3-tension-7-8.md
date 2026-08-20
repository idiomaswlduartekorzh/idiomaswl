# Habla acompañada — inglés A2 · Fase 3: auditoría de tensión de los escenarios 7 y 8

Audita: `artifacts/habla-a2/fase2-fichas-7-8.md` (las cuatro fichas).
Contra: `docs/habla-acompanado-blueprint.md` §3 (las seis maneras de morir) y §6 (puertas 2, 5, 6, 11).
Motor de referencia, no auditado aquí salvo cuando la ficha se separa de él:
`artifacts/habla-a2/fase1-escenarios-7-8.md`.

**Qué mide este informe.** No si el escenario es correcto, sino si hay razón para seguir
hablando en el turno 6. Un escenario puede pasar las doce puertas y morirse igual: eso se ve
simulando la pareja, no leyendo la ficha.

**Riesgo particular de estos dos.** Son los únicos del set en los que nadie consigue lo que
vino a buscar (7 `aplazado`, 8 `sin-acuerdo`). El peligro no es el habitual —resolverlo en tres
turnos— sino el contrario: que la pareja entienda pronto que **no hay nada que firmar** y deje
de intentarlo. Toda esta auditoría está orientada a esa pregunta.

**No arreglo nada.** Donde digo «se apaga», digo el turno y la causa, y ahí lo dejo.

---

## Resumen ejecutivo

| | 7 · `two-more-people-for-the-trip` | 8 · `cancel-the-gym-i-am-leaving` |
|---|---|---|
| 1 · prueba del sí | **PASA en el turno 1 · FALLA en el turno 5** | **PASA** |
| 2 · prueba del silencio | **PASA** | **PASA** (el más sólido de los cuatro roles) |
| 3 · prueba de la única salida | **PASA con reserva** | **PASA** |
| 4 · prueba de la carta | **PASA** | **PASA con reserva** |
| 5 · prueba de las preguntas abiertas | **PASA con reserva** | **PASA** |
| Turnos previstos | A 7 · B 7 | A 8 · B 8 |
| Turnos que aguanta mi simulación | **7 nominales · 4 con oposición real** | **8** |
| Punto exacto donde se apaga | **turno 5**, en cuanto A comunica la carta | no se apaga; el punto frágil es el **turno 2** |

El nº 8 es el escenario mejor construido de los dos y probablemente del set: el «sin acuerdo»
está diseñado como un cambio de objetivo a mitad de partida, no como un muro. El nº 7 tiene un
problema aritmético que le desactiva el conflicto exactamente cuando entra la carta, que es el
peor momento posible para desactivarlo.

---
---

# 7 · `two-more-people-for-the-trip`

`quejarse` + `rechazar` · poder a>b · arranca B · desenlace **aplazado** · A 7 · B 7

## Prueba 1 — la prueba del sí

Hay que correrla dos veces, porque este escenario tiene dos momentos en los que alguien puede
conceder: el turno 1 y el turno 5 (cuando cae la carta). Pasa la primera y falla la segunda.

### En el turno 1 — PASA

**B concede a la primera** («listo, no van»). ¿Se acabó? No. Queda:

- la deuda de 100.000 desde el 30 de julio, que B **no puede** pagar hoy (restricción 1 de su
  ficha: los 200.000 que tiene encima son ajenos hasta que se sepa si van), y que por objetivo
  explícito tiene que quedar con **fecha dicha en voz alta**;
- el reparto de mañana: qué carro sale y quién se sube;
- los tres puntos del cierre.

Sobreviven 4 o 5 turnos. Está por debajo de los 7 previstos, pero no es el colapso de §3.1.

**A concede a la primera** («bueno, que vayan»). Tampoco se acaba: A no tiene cómo meterlos en
la lista de la portería —no la cambia él— así que el sí de A no es ejecutable. Bien puesto.

Las dos piezas de §3.1 están en la ficha de B: razón concreta para negarse (200.000 ya
cobrados, dos personas que ya reorganizaron el fin de semana) y condición bajo la cual acepta
(implícita en «Sebastián lleva hamaca» + `Can I pay you on…?` + `What if…?`). La condición está
insinuada, no escrita como condición; ver reserva en la prueba 3.

### En el turno 5 — FALLA

Aquí está el hallazgo grave del escenario. Cuando A abre la carta y le pasa a B el contenido,
**se puede decir que sí sin que le cueste nada a nadie**. Las tres escaseces del escenario
—camas, puestos, plata— se resuelven todas con los números que están impresos en las fichas:

| escasez | antes de la carta | después de la carta |
|---|---|---|
| Camas | 6 camas, 8 personas | 6 camas + **2 colchonetas** = 8. Resuelto |
| Puestos | Laura 4 + Kevin 5 = 9 | 9 puestos para 8 personas. Sobra uno |
| Plata | B debe 100.000 y no puede pagar | B tiene **200.000** − 45.000×2 = **110.000** ≥ la deuda |

Esa última fila es la que rompe el escenario. B cobró 100.000 a cada amigo; doña Nubia cobra
45.000 por cada uno; le sobran 110.000, que es más que los 100.000 que le debe a A. **Si van los
dos amigos, B puede pagarle a doña Nubia, pagarle a Mateo esta misma noche y le quedan 10.000
sueltos.** Nadie pone plata de más, nadie duerme en el suelo, nadie se queda en Bucaramanga.

Desde el turno 5, A no tiene ninguna razón escrita para seguir diciendo que no. Su restricción 1
(«no puedes poner más plata») no se activa, porque nadie le está pidiendo plata. Su restricción 2
(«no puedes decirle que sí a nadie que no esté escrito») deja de ser un no y pasa a ser un
trámite: mandarle dos nombres y dos cédulas a doña Nubia. Su restricción 3 (Laura) nunca estuvo
en juego. El único motivo que le queda para negarse —lo que fase 1 llamaba «no piensa volver a
poner de su bolsillo por gente que no conoce»— **no sobrevivió a la fase 2**: no está en ninguna
parte de la ficha de A, y aunque estuviera, ya no viene al caso porque no tiene que poner nada.

Hay una fricción residual, y no está escrita en ninguna ficha: si B es honesto con sus amigos,
les tiene que devolver 55.000 a cada uno (pagaron 100.000 por un cupo que cuesta 45.000), y esos
110.000 son exactamente los que necesitaba para pagarle a A. Es el único conflicto que sobrevive
a la carta, requiere una cadena de tres inferencias aritméticas, no aparece en ningún dato duro
ni en ningún exponente, y **ninguna pareja de A2 lo va a construir en inglés**. Existe en la
hoja de cálculo, no en la conversación.

**Veredicto: PASA en el turno 1, FALLA en el turno 5.**

## Prueba 2 — la prueba del silencio

Previstos A 7 / B 7. En mi simulación (abajo): **A 7 · B 7**. Ninguno por debajo del 40 %.
Puerta 5, cumple.

**¿Es A un juez con silla?** No. A necesita tres cosas de B y ninguna la consigue solo: las
cédulas (solo B tiene el contacto), los 100.000, y el carro. Están las tres en su ficha. Es el
tratamiento correcto de §3.2.

**Pero la palanca del carro solo existe en la cabeza de A.** Esto sí es un defecto, y de los que
no se ven leyendo una ficha sola:

- Ficha de A: «una cuenta que no has hecho en voz alta: el carro de Laura tiene 4 puestos y son
  6. Sin el carro de Kevin, mañana se quedan dos en Bucaramanga.» A sabe que depende de B.
- Ficha de B: «Tu carro | **5 seats** · el gasto de la gasolina lo pones tú». Un dato neutro,
  en una tabla, sin ninguna señal de que sea una palanca.

B **no puede saber** que el grupo depende de su carro: no sabe quién es la sexta persona (es el
secreto de A), ni cuántos carros hay, ni de cuántos puestos. Y A tiene todos los motivos para no
decírselo, porque decirlo es entregarle el arma al otro. Resultado práctico: el único
contrapoder real de B **nunca se juega**, y a B le queda solo el argumento emocional («voy a
quedar mal»). En los turnos 5 a 7, cuando la queja y el rechazo ya se gastaron, es justo cuando
haría falta. El escenario no muere de monólogo porque B sí tiene una moneda que sabe que vale
(la fecha de pago de la deuda), pero se queda con una moneda en vez de dos.

**Veredicto: PASA.** Con la nota de que la carga de B en los turnos 5-7 se sostiene con menos
material del que el motor creía haberle dado.

## Prueba 3 — la prueba de la única salida

Desenlaces aceptables que quedan **en las fichas** (no en fase 1):

1. **Van los dos**, se le mandan dos nombres y dos cédulas a doña Nubia antes de las 9:00 a. m.,
   90.000 aparte, y de paso se salda la deuda.
2. **Va uno solo** (Sebastián, que lleva hamaca y no ocupa cama; Andrés se queda porque solo
   podía subir en el carro de B, lo cual no es un impedimento… ver más abajo).
3. **No va ninguno**, salen los seis de la lista y B paga el martes 25.

Son tres, ninguna evidente al empezar. Cumple el mínimo de dos y la puerta 2.

**Reserva 1 — desapareció la salida del camping.** Fase 1 tenía una cuarta salida (camping a 10
minutos, 35.000 por persona por noche). **No está en ninguna de las dos fichas**: ni en los datos
duros de A, ni en los de B, ni en la carta. Y con la carta autorizando *dos* colchonetas, la
Salida 1 y la Salida 2 de fase 1 se funden en una sola. El abanico de fase 1 (tres salidas con
precio) llega a fase 2 convertido en dos salidas sin precio y una tercera que es rendirse.

**Reserva 2 — la ficha le dice al jugador que hoy no se elige.** Las dos fichas traen, en
negrita, antes de jugar: «**Hoy no se decide si van dos personas más, una o ninguna.**» Es
exactamente lo que el encargo temía. El jugador lee el desenlace antes del turno 1. La intención
—que el aplazamiento no se sienta como una rendición— es buena, pero el efecto sobre los turnos
1 a 4 es que la pelea central está anunciada como decidida de antemano, y ahí es donde viven la
queja y el rechazo, que son los dos actos de habla del escenario. Un jugador que se crea esa
línea no pelea. Lo que la ficha convierte en decisión real —quién le escribe a quién, si el
carro sale, qué pasa a las 9:00 a. m.— es reparto de tareas, no negociación.

**Veredicto: PASA con reserva.** Hay más de una salida, pero la ficha las degrada de
«negociación» a «logística» y perdió por el camino la única que tenía precio para los dos.

## Prueba 4 — la prueba de la carta

**Después del turno 4 · va a A · B solo se entera de lo que A le cuente.**

¿Habría terminado igual sin ella? **No, y por mucho.** Sin la carta, A tiene una posición
inexpugnable —seis camas, lista cerrada, no la cambio yo— y la conversación desemboca
mecánicamente en «salen los seis, me pagas el martes». Eso es un **acuerdo**, no un aplazamiento:
el desenlace que fase 0 asignó al escenario **lo produce la carta y solo la carta**. No es
adorno; es el mecanismo. Entra después del turno 4, dentro de la ventana de la puerta 6, y va a
un solo rol. Formalmente, impecable.

Además está bien construida como carga de trabajo de lengua: le quita a A el escondite («no
depende de mí») y lo obliga a decir que no por decisión propia, o a decir que sí y cargar con
ello. Y solo la mitad de sus filas repiten datos que A ya tenía (la hora de cierre); las otras
tres son nuevas.

**El problema no es la carta: es lo que abre.** Dos cosas.

**a) Abre la puerta y no deja el cerrojo puesto.** El motor de fase 1 sostenía que la carta abre
una puerta con cerrojo —«B no tiene las cédulas y el que las tiene está en turno hasta las 10:00
p. m.»— y que de ahí sale el aplazamiento «sin que nadie tenga que ser terco». Ese cerrojo no
cierra:

- Son las **7:20 p. m.** y la carta cae hacia las **7:41 p. m.**
- El plazo de doña Nubia es **mañana a las 9:00 a. m.**, no esta noche.
- Sebastián sale del turno a las **10:00 p. m.** — o sea, dentro de dos horas y veinte, y once
  horas antes del plazo.
- Andrés, según la ficha de B, «**answers his phone**». Su cédula está a una llamada.

Una pareja despierta cierra esto en el turno 5: «a las diez le escribes a Sebas, Andrés te
contesta ya, se lo mandas a Nubia esta noche». No hay aplazamiento; hay una tarea de dos horas.
Y la hora de la cita que fija el cierre —mañana a las 7:00 a. m.— queda arbitraria: ¿por qué
esperar a las 7:00 a. m. si a las 10:05 p. m. ya está todo?

**b) La restricción 3 de B se contradice con sus propios datos duros.** La ficha de B dice:
«**No puedes dar números de cédula esta noche.** No los tienes tú, y el que los tiene está en
turno hasta las 10:00 p. m.» Dos problemas en dos líneas: las 10:00 p. m. **son esta noche**, y
la frase habla de «el que los tiene» en singular cuando son dos personas, una de las cuales
—Andrés— contesta el teléfono según la tabla de datos de la misma ficha, tres centímetros más
abajo. Si el jugador de B lo nota, la restricción no se sostiene y él mismo la desactiva; si no
lo nota, es un muro arbitrario que la ficha del otro puede derribar señalando el dato. Ninguna de
las dos salidas es buena.

**Veredicto: PASA.** La carta cambia el final del escenario, que es lo que se le pide. Pero
paga ese cambio abriendo una salida gratis (prueba 1) y su cerrojo no cierra (a y b).

## Prueba 5 — la prueba de las preguntas abiertas

Datos que **solo** se obtienen preguntando algo que no se contesta con sí o no:

1. **Sebastián lleva hamaca y colchoneta, no necesita cama.** Solo sale si A pregunta por dónde
   dormirían o quiénes son. Exponentes que lo habilitan en la ficha de A: `Who exactly is…?`,
   `What if…?`, `Sorry, what do you mean?`.
2. **Andrés no tiene cómo subir si no es en el carro de B.** Igual.

Son dos. Cumple el mínimo de §3.3 justo en el umbral.

**Reserva.** El «lo consigues si» de B dice: «Contaste **al menos una** de las dos cosas que solo
sabes tú, y la contaste porque venía al caso». Con una basta para que B gane. Y como su criterio
de éxito le premia contarlo, un jugador aplicado suelta los dos datos sin que nadie le pregunte,
y el escenario se queda con **cero** datos gated. La única defensa es la línea «solo salen si
alguien te pregunta bien», que es una instrucción de conducta, no un mecanismo. Depende de la
disciplina del jugador de B, y la disciplina de un jugador de B no es un mecanismo de diseño.

Marginal, pero conviene anotarlo: el dato 2 (Andrés no tiene cómo subir) es información **inútil**
para la negociación, porque el carro de B tiene 5 puestos y va a ir de todos modos. Es un dato
que se obtiene preguntando y que no mueve nada. De los dos, solo uno —la hamaca— tiene
consecuencia.

**Veredicto: PASA con reserva.** Dos datos justos, uno de ellos inconsecuente, y la puerta que
los protege es una instrucción, no un cierre.

## La simulación

Pareja sólida, los dos con andamiaje delante, inglés A2 real.

| turno | quién | qué pasa | ¿hay tensión? |
|---|---|---|---|
| 1 | B | «Tomorrow at eight. I'm bringing Sebas and Andrés, I already told them yes.» | sí |
| 2 | A | Queja con cifra: 6 beds, 6 names at the gate. Y de paso: `You still owe me 100,000 since July 30`. Rechazo de frente | **alta** |
| 3 | B | `They paid me on Tuesday` · `Can I pay you on Tuesday the 25th?` — su condición | **alta** |
| 4 | A | Segundo rechazo + pregunta abierta: `Who exactly is Sebastián?` `Where would they sleep?` | **alta** |
| 4 | B | Sale la hamaca. Primer desplazamiento real del problema: de la plata a las camas | **alta** |
| — | — | **Entra la carta a A** | |
| 5 | A | Decide cuánto cuenta. Si cuenta: 2 more people, 45,000 each, names + ID numbers before 9:00 a.m. | **se apaga aquí** |
| 5 | B | Hace la cuenta: 200,000 − 90,000 = 110,000. Puede pagar a Nubia, pagar a Mateo y le sobra | ninguna |
| 6 | A/B | Quién llama a quién: Andrés contesta ya, Sebas a las 10:00 p. m. | ninguna |
| 7 | A/B | Los tres puntos del cierre, leídos de la ficha | ninguna |

**Aguanta 7 turnos por rol. Cumple el número previsto y no cumple el propósito:** los turnos 5,
6 y 7 son dos amigos organizando un viaje que ya salió bien. La oposición dura 4 turnos.

**Se apaga en el turno 5, en el momento exacto en que A comunica el precio de doña Nubia.** La
causa no es que la pareja se rinda: es que ganan los dos a la vez, y a partir de ahí no hay nada
que negociar. Es una variante de §3.6 (la vía única) que se activa tarde: no es que solo haya un
desenlace, es que a partir del turno 5 hay uno que domina a los otros dos para los dos jugadores.

**Rama alternativa: A se guarda la carta.** La ficha se lo permite explícitamente («Cuánto le
cuentas es cosa tuya»). Entonces la conversación sigue por la vía vieja y termina en el turno 5 o
6 con «salen los seis, me pagas el martes» — que es un **acuerdo**, no un `aplazado`, y contradice
la línea del propio cierre que dice que hoy no se decide. Sí se decidió: lo decidió A callándose.
En las dos ramas el escenario se sale del desenlace que fase 0 le asignó.

## Nota menor de coherencia

Fase 1 dice «cinco ya le pagaron» y a la vez «solo ha recuperado 400.000», que no cuadra. La
ficha de fase 2 lo corrigió en silencio a «400.000 pesos (four people)», y con A contando como
uno de los seis la aritmética cierra. No afecta a la tensión; lo anoto para que nadie lo
«arregle» hacia atrás.

---
---

# 8 · `cancel-the-gym-i-am-leaving`

`pedir-favor` + `rechazar` + `proponer-alternativa` · poder b>a · arranca A · desenlace
**sin acuerdo** · A 8 · B 8

## Prueba 1 — la prueba del sí

**B concede a la primera** («claro, se lo cancelo»): se acaba en dos turnos. Por eso todo
depende de que B no pueda, y no puede, con las dos piezas de §3.1 escritas y separadas:

- **Razón concreta para negarse** — tres capas, no una: la permanencia firmada hasta el 13 de
  octubre (contractual), la autorización que no es suya (jerárquica) y el llamado de atención por
  escrito del mes pasado por radicar sin soporte (personal). Esta última es la buena: convierte
  el no en algo que a B **le cuesta a él**, no en una política recitada.
- **Condición bajo la cual acepta** — explícita y accionable: *con soporte, con Yeimy, antes del
  jueves 27 a las 6:00 p. m.* Las tres partes de la condición son cosas que A puede intentar y
  ninguna la puede hacer hoy en este mostrador.

**A concede a la primera** («bueno, entonces nada»): tampoco se acaba, y esto es lo bien resuelto.
El objetivo de A tiene **dos mitades**: «que te cancelen el plan hoy» y «**que no te cobren el 5
de septiembre**». La primera muere en el turno 2. La segunda sobrevive intacta, y la carta del
turno 4 la agrava. Es el diseño correcto para un `sin-acuerdo`: no se le quita al jugador el
motivo de estar ahí, se le cambia.

**Veredicto: PASA.** Es el mejor tratamiento de la prueba del sí de los dos escenarios.

## Prueba 2 — la prueba del silencio

Previstos A 8 / B 8. En mi simulación: **A 8 · B 8**. Puerta 5, cumple con holgura.

**¿Es B un mostrador que dice que no ocho veces?** No, y está bien cerrado: B necesita tres cosas
de A, y **dos de las tres son estructuralmente imposibles de obtener hoy**:

| lo que B necesita | ¿puede dárselo A? |
|---|---|
| Un soporte que sirva para el formato | **No como B lo pide**: A puede enseñar el correo en la pantalla pero no dejar copia (restricción 1). De ahí sale media conversación |
| La fecha de regreso | **No la sabe**: el pasaporte lo entregan 10-15 días hábiles después del 3 de septiembre |
| Su firma en el registro de atención | Sí, trivial |

Que dos de las tres necesidades de B choquen contra dos restricciones de A y no se resuelvan es
lo que le da a B ocho turnos de trabajo real en vez de ocho negativas. El que manda necesita algo
y no lo consigue: §3.2 resuelto de libro.

Y A tampoco pide en el vacío: la fila de cuatro personas detrás aprieta a los dos (está escrito
en las dos fichas, con la misma cifra), y el hueco único del jueves de 12:00 a 1:00 le pone a
ella un reloj propio.

**Veredicto: PASA.** Los cuatro roles auditados, este es el que mejor reparte la carga.

## Prueba 3 — la prueba de la única salida

Tres salidas, las tres presentes en las fichas de fase 2 (a diferencia del nº 7, aquí no se cayó
ninguna por el camino):

1. **Congelación de 60 días**, radicada antes del corte del jueves 27 a las 6:00 p. m. Necesita
   soporte y a Yeimy. Cuesta: el plan sigue vivo y la permanencia se corre.
2. **Cesión del plan a Yurany.** 30.000, los dos presentes con cédula. Cuesta: A tiene que
   convencer a alguien que ya dijo que no por el precio.
3. **No renovación + pago por PSE.** Cuesta: paga un mes que no usa. Y hay un cerrojo real: la
   referencia la genera cartera el día 1 y hoy es 25, y el día 1 A ya está fuera.

Ninguna es la que A vino a pedir, ninguna es evidente, y el punto 2 del cierre **obliga** a la
pareja a elegir cuál intenta primero. Eso convierte la elección en trabajo de conversación en
lugar de dejarla flotando.

Detalle que merece crédito, porque es lo que da vida a los turnos 6-8: **las tres salidas
convergen en la misma hora**. A solo tiene libre el jueves 27 de 12:00 a 1:00; Yeimy atiende
miércoles a viernes de 9 a 5 y almuerza de 1 a 2; el corte de novedades es el jueves 27 a las
6:00 p. m.; Yurany vuelve de Piedecuesta el jueves. Todo cabe en una sola hora de un solo día, y
comprobar que cabe **es** la conversación de los últimos turnos.

Única ambigüedad: «Yurany está en Piedecuesta **hasta el jueves**» admite las dos lecturas
(vuelve el jueves / está fuera todo el jueves). La convergencia entera cuelga de esa preposición.

**Veredicto: PASA.**

## Prueba 4 — la prueba de la carta

**Después del turno 4 · va a B · A solo se entera de lo que B le diga.**

¿Habría terminado igual sin ella? **No.** La carta hace tres cosas y las tres se notan:

1. **Le quita a B el colchón del «déjeme consultar».** A partir de aquí el no es suyo y lo tiene
   que sostener de frente, que es el acto de habla que le tocaba.
2. **Mete un peligro nuevo que no estaba en la mesa:** si el cobro del día 5 rebota, el sistema
   lo manda a cobranzas **automático el día 12**. Eso le **cambia el objetivo a A a mitad de
   partida**: ya no se trata de que no le cobren, sino de que no la reporten. Es el mecanismo por
   el que un `sin-acuerdo` no se apaga.
3. **Activa el dato oculto de A.** La tarjeta de A vence el 31 de agosto y el cobro del 5 va a
   rebotar haga lo que haga. Antes de la carta, callárselo era cómodo. Después, callárselo es
   ponerse una bomba. Los dos secretos están hechos para engancharse, y enganchan.

Sin la carta, A se iría con «pues que me cobren un mes» y la conversación se apaga en el turno 5.
Con ella, hay tres turnos más de trabajo. Cumple la ventana de la puerta 6 y va a un solo rol.

**Reserva 1 — tres de sus cuatro filas ya están en la ficha de B.** «Congelación, hasta 60 días,
solo con soporte» y «Yeimy, 2.º piso, miércoles a viernes, 9 a 5» **ya están en los datos duros de
B** antes de empezar. La carta le repite a B lo que B ya sabía. Lo único nuevo es la fila de
cobranzas del día 12. Toda la fuerza de la complicación descansa sobre una fila de cuatro; el
resto es relleno que además le baja el impacto percibido al jugador («esto ya lo sabía»).

**Reserva 2, la más importante — el pago de la carta no está anclado en ningún criterio.** El día
12 es lo único que la carta aporta, y:

- El **cierre** (idéntico en las dos fichas) dice «qué pasa el **5 de septiembre** si no hace
  nada». Nombra el día 5, que es el susto pequeño, y **no nombra el día 12**, que es el grande.
- El «**lo consigues si**» de B tiene siete puntos y **ninguno** menciona cobranzas ni el día 12.
- El «**lo consigues si**» de A dice «sabes qué te pasa exactamente el 5 de septiembre… y qué
  pasa después de esa fecha» — «después de esa fecha» es lo más cerca que llega, y es vago.
- Ni una ni otra ficha premia (ni penaliza) que A revele o se guarde lo de la tarjeta vencida,
  aunque su propia ficha diga que «no es una decisión pequeña».

Consecuencia práctica: un B que se olvide de mencionar el día 12 **gana igual** según su propia
lista, A sale sin saber lo único que la carta trajo, y la decisión más interesante que A toma en
todo el juego —contar o no contar lo de la tarjeta— no tiene nada que la dispare. La carta puede
caer y no cambiar nada, y ninguno de los dos jugadores se dará cuenta.

**Veredicto: PASA con reserva.** Cambia el final cuando se juega bien; nada en la ficha obliga a
jugarla bien.

## Prueba 5 — la prueba de las preguntas abiertas

Datos que solo salen preguntando abierto:

**Hacia A** (cuatro, muy por encima del mínimo de dos):

1. **Que existe la cesión del plan.** B no la ofrece de entrada por diseño. Se abre con
   `Is there any other way?` o `Who can…?`. Es la salida que A no sabía que existía.
2. **Que congelar no es cancelar** (los días se suman al final de la permanencia). A cree que sí
   lo es; solo se rompe si pregunta qué implica.
3. **Quién decide, dónde y cuándo** — `Who can…?`.
4. **Qué pasa si no hace nada** — `What happens if…?`, y es la pregunta que engancha con la carta.

**Hacia B** (dos):

5. **La fecha de regreso.** `Do you know when…?` parece cerrada pero la respuesta real de A es
   «no lo sé, entre 10 y 15 días hábiles después del 3 de septiembre», que obliga a elaborar.
6. **Qué documento puede aportar realmente**, dada la restricción de enseñar sin dejar. No hay
   respuesta de una palabra posible: hay que negociar qué se tapa y qué se enseña.

Seis datos gated en un escenario de 8 turnos. No hay riesgo de ping-pong, y el andamiaje de A
está construido casi entero con aperturas (`Is there any other way?`, `What happens if…?`,
`Who can…?`, `So I have to…?`) en vez de con frases hechas.

**Veredicto: PASA.** El más limpio de las veinte pruebas de este informe.

## La simulación

| turno | quién | qué pasa | ¿hay tensión? |
|---|---|---|---|
| 1 | A | Pide la cancelación con la razón: cita movida al 3 de septiembre, viaja el 30, trae el correo | sí |
| 2 | B | Rechazo con razón concreta: permanencia hasta el 13 de octubre, «yo no autorizo eso» | **alta** |
| 3 | A | Queja educada: `When I signed, …` (Duván) + no puede volver en horario de oficina | **alta** |
| 3 | B | `I need something in writing…` + `Do you know when…?` | **alta** |
| 4 | A | `I can show you…, but…` — choque de la restricción del correo. Aquí A ya sabe que no se cancela | **alta** |
| — | — | **Entra la carta a B** | |
| 5 | B | Sostiene el no sin colchón y suelta el día 12. **Cambia el objetivo de A** | **alta** |
| 5 | A | `So I have to…?` `What happens if…?` — reacciona al reporte a cobranzas | **alta** |
| 6 | A | `Is there any other way?` → B suelta la cesión → aparece Yurany | **alta** |
| 6/7 | B | Congelar ≠ cancelar · PSE el día 1 · corte del jueves 27 a las 6:00 p. m. · Yeimy | media-alta |
| 7 | A | Decide si cuenta lo de la tarjeta vencida. Cuadra el jueves 12-1 con Yurany y con Yeimy | **alta si lo cuenta** |
| 8 | los dos | Cierre: por qué no se firma · qué camino primero y con qué · con quién, dónde y a qué hora | media |

**Aguanta los 8 turnos por rol. No se apaga.** El turno 8 es cierre, pero es cierre con contenido
disputable (cuál de los tres caminos, y si cabe en la hora del jueves), no lectura de checklist.

### Respuesta directa a la pregunta del encargo

*«Si el estudiante entiende en el turno 3 que no puede cancelar, ¿qué lo mantiene en la
conversación?»* — Tres cosas, y las tres son mecánicas, no motivacionales:

1. **La segunda mitad de su objetivo sobrevive**: que no le cobren el 5. Y la carta la convierte
   en algo peor y más urgente que lo que vino a pedir.
2. **Tiene una sola hora libre** antes de irse de la ciudad (jueves 12-1) y necesita saber si vale
   la pena gastarla, y en qué. Eso no lo puede averiguar sola.
3. **Sale con algo que no traía** y la ficha se lo dice: tres caminos, un nombre, un piso, unos
   horarios y una fecha de corte. El «lo consigues si» de A tiene siete puntos y ninguno es la
   cancelación.

Está resuelto. Es exactamente el problema que el nº 7 no resuelve.

## Los dos puntos frágiles

**1. El turno 2, si B suelta la cesión demasiado pronto.** Toda la segunda mitad del escenario
depende de que B se guarde la cesión hasta que le pregunten. Lo que lo sostiene es una frase de su
ficha: «no es lo primero que ofreces porque es papeleo y hay fila». Eso es una instrucción de
conducta, no un mecanismo, igual que la reserva del nº 7 en la prueba 5. Un jugador nervioso —el
perfil normal de quien juega de B en el mostrador— vacía la ficha en dos turnos para «hacerlo
bien», y entonces los turnos 6 a 8 se quedan sin contenido y la pareja cierra en el 5 o el 6.
Es el único camino por el que este escenario se apaga antes de tiempo, y no está bloqueado.

**2. El spoiler del «lo consigues si» de A.** «Hoy no te llevas la cancelación. Eso está decidido
antes de empezar y **no es fallar el ejercicio**.» La intención es correcta y necesaria —sin ella
A se va sintiéndose derrotada— pero está impresa **antes** de que A juegue sus turnos 1 a 4, que
son precisamente el `pedir-favor` y el `quejarse`. Se le pide a la jugadora que pelee por algo que
la ficha ya le dijo que no va a conseguir. Es el mismo defecto que el «hoy no se decide» del nº 7,
en versión más leve porque aquí sí queda media petición viva (que no le cobren) y porque el texto
se molesta en decirle qué sí puede ganar. Aun así, es un jugador al que le contaron el final.

---
---

# Los tres hallazgos más graves

## 1 · (nº 7) La carta desactiva el precio de todas las salidas — se apaga en el turno 5

200.000 cobrados − 45.000×2 a doña Nubia = 110.000, que es más que los 100.000 de la deuda.
6 camas + 2 colchonetas = 8 personas. 4 + 5 puestos = 9. Después del turno 5 no hay escasez de
camas, ni de puestos, ni de plata, y A no tiene ninguna razón escrita para seguir diciendo que
no. Los turnos 5, 6 y 7 son dos amigos organizando un viaje que ya salió bien. La única fricción
que sobrevive —que B tendría que devolverles 55.000 a cada amigo— no está escrita en ninguna
ficha y exige tres inferencias aritméticas que no van a ocurrir en inglés A2.

## 2 · (nº 7) El aplazamiento no se sostiene, y una restricción se contradice con su propia tabla

El plazo de doña Nubia es mañana a las **9:00 a. m.**, no esta noche. Son las 7:20 p. m., Sebastián
sale del turno a las **10:00 p. m.** —dentro de dos horas— y de Andrés dice la propia ficha de B
que «**answers his phone**». La restricción «no puedes dar números de cédula **esta noche**» se
contradice con los dos datos duros que tiene tres centímetros más abajo. O la pareja lo nota y
cierra el asunto esta misma noche (y el desenlace deja de ser `aplazado`), o no lo nota y obedece
un muro arbitrario. La cita de mañana a las 7:00 a. m., que es lo que sostiene todo el
aplazamiento, no tiene por qué existir.

## 3 · (los dos) Las fichas le cuentan el final al jugador antes del turno 1

Nº 7, en las dos fichas y en negrita: «**Hoy no se decide si van dos personas más, una o
ninguna.**» Nº 8, en el «lo consigues si» de A: «**Hoy no te llevas la cancelación. Eso está
decidido antes de empezar.**» En los dos casos la línea existe por un motivo legítimo —que el
final raro no se sienta como una rendición— y en los dos casos se paga en los turnos 1 a 4, que
es donde viven la queja, el rechazo y la petición. Se le pide al jugador que pelee por algo que su
propia pantalla acaba de declarar decidido. En el nº 8 el daño es menor porque queda media
petición viva; en el nº 7 la línea anula la pregunta central del escenario.

---

## Otros hallazgos, por orden de gravedad

4. **(nº 8) El único aporte de la carta no está anclado en ningún criterio.** Tres de sus cuatro
   filas ya están en los datos duros de B; lo único nuevo es el reporte a cobranzas del día 12, y
   ni el cierre (que nombra el día 5) ni las siete condiciones de éxito de B lo exigen. Un B que
   lo olvide gana igual, y el secreto de A (tarjeta vencida el 31) se queda sin disparador.
5. **(nº 7) La palanca del carro solo existe en la ficha de A.** B ve «5 seats» como un dato
   neutro y no puede saber que el grupo depende de él; A lo sabe y no tiene ningún motivo para
   decírselo. El único contrapoder real de B nunca se juega, justo en los turnos 5-7.
6. **(nº 7) Se cayó la salida del camping de fase 1.** Los 35.000 por persona por noche no están
   en ninguna de las dos fichas, y con la carta autorizando dos colchonetas las salidas 1 y 2 del
   motor se funden en una. Quedan dos salidas y una rendición, ninguna con precio.
7. **(nº 8) La cesión depende de la disciplina del jugador de B.** Si la suelta en el turno 2 —el
   reflejo natural de quien quiere «hacerlo bien»— los turnos 6-8 se quedan vacíos y la pareja
   cierra en el 5. Lo único que lo evita es una frase de conducta en la ficha.
8. **(nº 7) De los dos datos gated, uno no sirve para nada.** «Andrés no tiene cómo subir» no
   mueve la negociación, porque el carro de B tiene 5 puestos y va a ir igual. La prueba de las
   preguntas abiertas pasa con dos datos, y en la práctica solo la hamaca tiene consecuencia. Y el
   «lo consigues si» de B le pide contar «al menos una» de las dos, con lo que puede quedar cero.
9. **(nº 8) «Yurany está en Piedecuesta hasta el jueves» es ambiguo.** La convergencia de las tres
   salidas en la hora del jueves 12-1 —que es lo mejor que tiene el escenario— cuelga de si «hasta
   el jueves» significa que vuelve ese día o que sigue fuera.
10. **(nº 7) Marginal.** La ficha corrige en silencio el «cinco ya le pagaron» de fase 1 a «400.000
    (four people)». La versión de la ficha es la que cuadra; que nadie lo revierta.
