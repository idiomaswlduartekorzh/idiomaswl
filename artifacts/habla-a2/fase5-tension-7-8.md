# Habla acompañada — inglés A2 · Fase 5: reauditoría de tensión de los escenarios 7 y 8

Audita: `artifacts/habla-a2/fase4-escenarios-7-8.md` y `artifacts/habla-a2/fase4-fichas-7-8.md`.
Contra: `docs/habla-acompanado-blueprint.md` §3 (las seis maneras de morir, **con el reverso del
modo 1**), §6 (puertas 2, 5, 6, 11) y **§9 (qué carta se puede mirar antes)**.
Ronda anterior: `artifacts/habla-a2/fase3-tension-7-8.md`.

**Qué mide esto.** No si el escenario es correcto, sino si hay razón para seguir hablando en el
turno seis. Y esta vez, además: si el arreglo se llevó por delante algo.

**No arreglo nada.** Donde digo «se apaga», digo el turno y la causa, y ahí lo dejo.

---

## Resumen ejecutivo

| | 7 · `two-more-people-for-the-trip` | 8 · `cancel-the-gym-i-am-leaving` |
|---|---|---|
| 1 · prueba del sí | **PASA** (antes: pasaba en T1, fallaba en T5) | **PASA** |
| 2 · prueba del silencio | **PASA** | **PASA** |
| 3 · prueba de la única salida | **PASA** (antes: con reserva) | **PASA con reserva** |
| 4 · prueba de la carta | **PASA con reserva** | **PASA con reserva** |
| 5 · prueba de las preguntas abiertas | **PASA con reserva** (misma reserva de antes) | **PASA** |
| Turnos previstos | A 7 · B 7 | A 8 · B 8 |
| **Ronda anterior** | 7 nominales · **4 con oposición real** · se apagaba en el **T5** | 8 · no se apagaba |
| **Ahora** | **7 · 7**, oposición viva hasta el T6 de 7 | **8 · 8 en una rama · 6 de 8 en la otra** |
| **Punto exacto donde se apaga** | no se apaga en la rama principal; **T3 (global) si Kevin capitula**, y ahí la carta cae muerta | **T12 global (6 de 8)** si Milena aplica su restricción 2 al radicado |

El nº 7 está arreglado en lo que estaba roto: **la aritmética ya no se resuelve sola**. Lo que
queda no es un resto del defecto viejo, es uno nuevo y de otra familia: la salida barata de
Kevin está **un turno antes** de que exista la carta.

El nº 8 estaba bien y ahora está mejor anclado, pero el arreglo le metió una contradicción en la
pieza que lo sostiene entero. **Es el mismo error que la ronda anterior encontró en el nº 7 —una
restricción que choca con los datos duros de su propia ficha— mudado de escenario.**

---
---

# 1 · Las cuentas del 7, rehechas

Lo que tumbó el diseño anterior fue aritmética, así que la comprobación se hace con aritmética.

## Los números de ahora

| | |
|---|---|
| Kevin tiene en la mano | 200.000 (100.000 de Sebastián + 100.000 de Andrea) |
| El cupo extra | **uno solo** · 150.000 por las dos noches · **se le pagan a Valentina** |
| Hay que devolverle al que no va | 100.000 |
| Kevin le debe a Valentina | 100.000 · 30 de julio |
| Puestos | Óscar 4 (**en el taller**) + Kevin 5 · grupo de 6 |

## Las tres escaseces, después de la carta

**Plata — SOBREVIVE.** 200.000 − 150.000 = 50.000, y hay que devolver 100.000: **faltan
50.000.** Y la comprobación que importa no es esa, sino la de la ronda anterior: **¿queda la
deuda saldada por efecto de la carta?** No, y por una razón estructural bien puesta: los 150.000
**entran y salen** del bolsillo de Valentina —doña Nubia se los cobra a ella— así que cobrar el
cupo no le paga un peso de lo suyo. Lo comprobé por las tres rutas que una pareja puede
construir:

| ruta | qué pasa con los 100.000 de la deuda |
|---|---|
| Va Andrea, pone ella los 50.000 que faltan | Kevin devuelve 100.000 a Sebastián y se queda con **cero**. Deuda intacta |
| Va Sebastián, los 50.000 los pone Kevin | Kevin devuelve 100.000 a Andrea, pone 50.000 que no tiene. **Peor que antes** |
| No va nadie | Kevin devuelve 200.000 esta noche y se queda con cero. Deuda intacta |

**En las tres, Kevin termina la noche sin un peso propio y debiendo 100.000.** No hay ninguna
combinación en la que la carta pague la deuda. Comparado con el diseño anterior —donde
200.000 − 45.000×2 = 110.000 ≥ 100.000 y se pagaba todo con lo que ya había sobre la mesa— esto
es la corrección exacta del hallazgo 1. **La escasez sobrevive a la carta.**

**Personas — SOBREVIVE, y es lo mejor que le pasó al escenario.** Un cupo para dos amigos:
alguien se queda y **alguien tiene que decírselo por teléfono**. Eso no se resuelve con una
resta; es el único punto del par donde la lengua tiene que hacer algo que duele.

**Puestos — SOBREVIVE por incertidumbre, no por escasez.** 4 + 5 = 9 para 6 (7 con el extra):
si los dos carros salen, sobran puestos. Lo que hace que no se apague es que **no se sabe si
sale el de Óscar** hasta las 7:00 a. m. Es una escasez condicional, y está bien: nadie puede
cerrarla esta noche por más listo que sea.

## Una costura que la aritmética deja abierta

**La hamaca de Sebastián es exactamente el argumento que rompió la versión anterior**, y sigue
en la ficha de Kevin. La carta dice «cupo tengo uno solo, **me queda una colchoneta**». Una
pareja despierta une las dos cosas: *«Sebas trae hamaca, no necesita tu colchoneta — que vayan
los dos.»* Lo que lo bloquea es que el límite lo pone **el administrador autorizando persona
extra**, no la colchoneta; pero la carta menciona las dos cosas en la misma frase y la más
visible es la colchoneta. Si alguien «mejora» la redacción y deja el cupo colgando del número de
camas, el escenario vuelve al turno 5 de la ronda anterior.

Anexo: con un solo cupo, **la hamaca ya no sirve para nada** (la salida 2 del motor la usa para
decir que «la colchoneta se la queda quien quiera», que no es una consecuencia). Ha pasado de
ser el dato gated con consecuencia a ser el dato gated inofensivo —el papel que antes hacía
«Andrés no tiene cómo subir»—. El intercambio es favorable, porque los otros dos datos gated
(Andrea en veinte minutos, Sebastián a las 10:00 p. m.) ahora **sí** deciden quién viaja.

## Nota menor: 150.000 por una colchoneta, cuando la cama vale 100.000

Nadie lo cuestiona en ninguna ficha, y es la clase de dato que un estudiante sí cuestiona en voz
alta. No rompe nada —de hecho da conversación— pero si alguien lo iguala a 100.000 «por
coherencia», la resta deja de dar 50.000 y la escasez de plata se evapora otra vez. **La cifra
es carga estructural, no decoración.**

---

# 2 · El atajista, otra vez

## Nº 7 — Kevin capitula en su segundo turno. **Ya no gana la partida, pero sí gana la carta.**

Lo que se le puso de coste está escrito y es real: si capitula, **los 200.000 dejan de ser
ajenos y su restricción 2 le obliga a devolverlos esta noche**, y queda mal con dos personas que
ya movieron el fin de semana. Comparado con la ronda anterior —donde «listo, no van» cerraba la
escena en 2:10— es otra cosa. Pero hay que decir dónde para el freno y dónde no.

**Por las buenas.** Kevin capitula en el turno global 3 y, de paso, le entrega a Valentina sus
tres necesidades en una sola frase: *«no van, te pago el martes 25, mi carro sale a las ocho.»*
Y le sale gratis, porque **el martes 25 es su propio objetivo**, no una concesión. La
conversación no se acaba —Valentina no puede contestar el punto 1 del cierre sin destapar lo del
carro de Óscar— pero:

- **la carta entra después del turno global 4 y llega muerta.** Un cupo de 150.000 no le
  interesa a nadie cuando ya se decidió que no va nadie. Valentina puede callársela y no pierde
  ni un punto de sus criterios;
- la simulación de esa rama me da **8 turnos globales (4 por rol)**, contra los 14 previstos.

**Esto es el mismo defecto de colocación que la puerta 6 describe y que en el nº 8 se acaba de
arreglar:** la salida barata está en el turno global 3 y el freno entra después del 4. En el 8 se
adelantó la carta por este motivo exacto; en el 7 se dejó en el 4 y **el segundo turno de Kevin
es el global 3**.

**Por las malas.** Aquí está el agujero fino. Después de capitular, **Kevin no necesita nada de
Valentina**: va en la lista de los seis, tiene el carro y le debe plata (deber es una posición
cómoda cuando el otro te necesita). Todo lo que le cuesta capitular —devolver 200.000, quedar
mal— **ocurre fuera de escena y con terceros**. Valentina, en cambio, no puede cerrar en seco
porque necesita los cinco puestos: su coste sí está dentro de la conversación y sí la retiene.
El reverso de §3.1 pide que **los dos** pierdan algo si se van sin acuerdo; aquí uno pierde
dentro y el otro pierde fuera. Kevin no se levanta y se va —el gesto de cierre necesita a los
dos— pero puede quedarse sin trabajar, que en los turnos 5 a 7 es lo mismo.

## Nº 8 — Tatiana se levanta en el turno 3. **No gana. Pero no gana por el motivo que el motor cree.**

Intenté las dos vías y las dos chocan:

- **Por las buenas** («muchas gracias, ya volveré»): le cuesta **92.000 contados**, dicho por
  Milena en el turno 2, en cifras, sin depender de ningún secreto. Es el mejor freno de los
  cuatro roles auditados porque es un número, no una emoción.
- **Por las malas** («fírmeme lo que sea y deme el número»): es la salida más rápida que existe
  y **está bloqueada**, pero por la contradicción del §4 de este informe, no por diseño.

**Corrección al motor, que se atribuye un mérito que no le toca.** Dice: *«la carta llega antes
de que pueda irse. Turno global 3.»* No es así. `afterTurn: 3` significa que Milena la lee
**antes de su turno 4**, o sea **después** de la tercera intervención, que es justo donde la
atajista se levantaba. El freno que de verdad la retiene es **el radicado de 92.000, dicho en el
turno 2**. La carta sigue llegando un latido tarde; lo que pasa es que ya no hace falta que
llegue a tiempo. Conviene saberlo, porque significa que **toda la defensa antiatajo del nº 8
descansa sobre un solo objeto**: el número radicado hoy. Y ese objeto es el que está en
entredicho.

- **Y el atajista del otro lado** (Milena vaciando la ficha en dos turnos) está bien cerrado:
  quien suelta congelación + cesión + Édison + corte de golpe se queda sin la firma y sin el
  motivo, y sus dos criterios mínimos no se cumplen. Mejor que la «instrucción de conducta» de
  la ronda anterior.

---

# 3 · El aplazamiento del 7: ¿con el gesto se sabe que terminó?

**Sí.** Y es la corrección más limpia de las veintidós.

La ronda anterior tenía tres de cinco parejas preguntando «¿ya está?» al acabar el 7, y cero de
cinco en el 8, que sí tenía una firma. La diferencia era exactamente esa: **una lista de tres
puntos agotada no se siente como un final; un objeto que se produce, sí.** Ahora el 7 produce un
objeto: un mensaje dictado en voz alta y confirmado por el otro.

Tres comprobaciones:

1. **La condición de parada es binaria y observable.** «Dictado y confirmado» no admite duda,
   igual que una firma. Un checklist admite «¿ya contestamos el tercero?».
2. **Y de paso es trabajo de lengua**, que antes no lo era: resumir en voz alta tres acuerdos
   con sus horas es un acto A2 legítimo y es lo último que hace la pareja. El cierre dejó de ser
   administración y pasó a ser producción.
3. **Falla en una cosa: nadie tiene asignado dictar.** «Uno de los dos» deja el arranque del
   gesto sin dueño. En el 8 está repartido con nombres (*Tatiana firma · Milena dice el número ·
   Tatiana lo repite*) y por eso funciona. Aquí es previsible el «dilo tú / no, dilo tú» de dos
   estudiantes que no quieren producir la frase más larga del ejercicio en inglés. **Estimo que
   el «¿ya está?» baja de 3 de 5 a 1 de 5, no a 0 de 5, y esa que queda es por esto.**

La cláusula «lo confirma **o le corrige una cosa**» termina igual: si corrige, se redicta y se
confirma. No hay bucle abierto.

---

# 4 · Lo que rompió el arreglo

Las dos sospechas del encargo eran buenas. Una no se cumplió; la otra sí, y en el escenario que
no la esperaba.

## 4.1 · «¿Poner coste a irse lo convirtió en un callejón sin salida?»

**En el nº 7, no.** El coste de irse es un coste *dentro* del escenario y deja las tres salidas
en pie. Además, la razón por la que el 7 no se cierra hoy ya **no es un muro arbitrario**: las
cédulas se consiguen esta noche (una en veinte minutos, otra a las 10:05, y el plazo es a las
7:00 a. m., así que las dos llegan) y lo que no se sabe es si **el administrador** autoriza. Es
un hecho externo a los dos jugadores. La contradicción de la ronda anterior —«no puedes dar
cédulas esta noche» contra dos datos duros que decían lo contrario— está eliminada, no
disimulada.

**En el nº 8, sí, y por una vía que nadie estaba mirando.** Después de la carta, **los dos
caminos se rompen a la vez y ninguno vuelve a abrirse**:

| | qué lo bloquea | ¿se puede desbloquear antes del jueves 27 a las 6:00 p. m.? |
|---|---|---|
| Congelación | soporte con fecha de regreso · lo firma Édison | Tatiana no tiene fecha de regreso, y Édison está **el miércoles 9-5**, cuando ella trabaja de 7 a 6. **No** |
| Cesión a Yurany | las dos presentes con cédula · lo firma Édison | Yurany vuelve **el miércoles por la noche** · el único hueco de Tatiana es el **jueves 12-1** · Édison **no está el jueves**. **No** |

Y el punto 2 del cierre —obligatorio, en las dos fichas— le pide a Tatiana que **elija un camino
y diga qué tiene que llevar**. Le está pidiendo que elija entre dos puertas que la carta acaba
de tapiar. El motor lo sabe y lo llama «las dos rehaciendo un plan que se acaba de caer», pero
**no dice en qué se rehace**. Solo hay una reconstrucción posible y es esta: *radicar hoy con
número, mandar el soporte después, y que Édison lo resuelva con fecha de hoy.* Es elegante, es
lo que hace que la escena valga la pena… y es justo lo que la ficha de Milena prohíbe.

## 4.2 · La contradicción que sostiene el nº 8 entero — **el hallazgo grave de esta ronda**

En la misma ficha de Milena, a once líneas de distancia:

> **Restricción 2** — «**No puedes radicar ninguna novedad sin soporte con las dos fechas**, y
> sabes por qué.»
>
> **Lo que sabes tú y nadie más** — «**Radicar hoy fija la fecha.** Una solicitud vale desde el
> día en que se radica, con número. […] Si ella se va sin número […] el plan se renueva: **un
> mes más, 92.000.** Es lo único que le puedes dar hoy, y vale eso.»

Y tres líneas más abajo, el «sabes por qué» de la restricción 2, por si quedaba duda:

> «**A ti te llamaron la atención el mes pasado** por radicar una congelación **sin soporte**.»

Tatiana no tiene soporte válido hoy —su tiquete es de ida, y ese es el descubrimiento del turno
5—. Por lo tanto, **una Milena que juegue su propia ficha con honestidad no puede darle el
número**. Y con eso caen, en cadena:

1. **el único freno del atajismo de Tatiana** (los 92.000 del turno 2 dejan de ser ciertos);
2. **la única reconstrucción posible del plan** tras la carta (§4.1);
3. **el gesto de cierre**, que consiste literalmente en que Milena le diga **el número** en voz
   alta y Tatiana lo repita;
4. **el punto 1 del cierre** —«qué queda escrito hoy y qué no»— cuya respuesta pasa a ser
   «nada».

Hay una lectura salvadora y hay que decirla: quizá **el registro de atención** (que se firma sin
soporte) y **la novedad radicada** (que lo necesita) son dos objetos distintos, y el número que
se dicta al final es el del primero. Es probablemente lo que el redactor tenía en la cabeza.
**Pero las fichas no lo dicen: usan «radicar» para los dos**, y el dato duro de Milena titula la
fila `Radicar hoy (dejarlo metido en el sistema, con número)`, que suena a la novedad, no al
registro. O la pareja lo nota y el escenario se queda sin final, o no lo nota y funciona sobre
una pieza que la otra ficha puede derribar señalando una línea. **Es, palabra por palabra, la
estructura del hallazgo 2 de la ronda anterior sobre las cédulas del nº 7, mudada al nº 8.**

**Dónde se apaga, si se aplica la restricción:** turno global 12 (el 6 de los 8 de Milena), en
el momento en que tocaba reconstruir el plan. Cuatro turnos por delante y nada que ponerles
dentro, y esta vez sin premio de consolación: no se sale con un mapa, se sale con dos puertas
tapiadas y un papel que no se pudo firmar.

## 4.3 · «¿Meterle tarea a la carta lo volvió logística?»

**En el nº 7, no.** Lo comprobé turno a turno. Lo que la carta pone encima de la mesa después del
turno 4 no es una lista de recados:

- **quién se queda** — hay que elegir a una persona y llamar a la otra. Es un acto de habla que
  cuesta, no una casilla;
- **quién pone los 50.000** — hay un desacuerdo real: Valentina no vuelve a poner (decisión, no
  falta de plata) y Kevin no puede tocar lo ajeno. Se resuelve negociando o no se resuelve;
- **si Valentina cuenta lo del carro de Óscar** — el punto 1 del cierre («de qué depende») la
  empuja a destaparlo, lo cual es un mecanismo bonito: **el cierre le saca el secreto sin
  pedírselo**.

Logística pura hay en los dos últimos turnos globales (quién llama a quién, a qué hora se
hablan). Dos de catorce. Aceptable.

**En el nº 8, tampoco** —los últimos turnos son de reconstrucción, no de reparto— pero solo si
sobrevive el radicado de §4.2. Si no, sí: pasan a ser dos personas repasando horarios de un
señor con el que ninguna de las dos va a poder hablar.

---
---

# Las cinco pruebas, una por una

## 7 · `two-more-people-for-the-trip`

**1 · La prueba del sí — PASA (antes: pasaba en T1, fallaba en T5).**
En el T1 sigue pasando: si Kevin concede, quedan la deuda, los puestos de mañana y el mensaje
del grupo; si Valentina concede, su sí no es ejecutable (la lista la cambia doña Nubia y el
administrador autoriza mañana). **Y en el T5 ya no falla**, que era el hallazgo: la carta deja
un cupo para dos personas, 50.000 sin dueño y una deuda intacta (§1). Valentina conserva la
frase que sostiene el escenario entero y se dice en A2 de un tirón: *le están pidiendo que ponga
su nombre por 150.000 de alguien que todavía no le ha pagado los 100.000 de julio.*
**Fuga menor:** el punto 1 de su objetivo acepta «una fecha dicha en voz alta» como equivalente
a cobrar, y el martes 25 es **el propio objetivo de Kevin**. Esa mitad del conflicto se cierra
con un sí de un turno. No mata nada —la queja de «tienes 200.000 en la mano y no me pagas» sigue
viva— pero de las tres necesidades de Valentina, una es gratis.

**2 · La prueba del silencio — PASA.** A 7 · B 7 en mi simulación; ninguno por debajo del 40 %.
Valentina no es un juez con silla: necesita la cédula, la fecha y **el carro**. Y el hallazgo 5
de la ronda anterior está corregido — `El grupo | 6 people · 2 cars — and one of them is yours`
está ahora **en la ficha de Kevin**, así que la palanca se puede jugar en vez de vivir en la
cabeza del otro. Se nota: en mi simulación es su turno 5, y es lo único que le queda cuando la
queja y el rechazo ya se gastaron.

**3 · La prueba de la única salida — PASA (antes: con reserva).** Tres salidas con precio para
los dos, y las tres siguen dependiendo de las 7:00 a. m. Y —esto es lo que levanta la reserva—
**el «hoy no se decide» ya no está impreso en ninguna de las dos fichas**: comprobado, `aplazado`
y `sin acuerdo` aparecen solo en la banda del diseñador, marcada como que no va en pantalla, y
la frase que evita el sentimiento de fracaso vive en el debrief, detrás de un botón. R1
ejecutada. La salida del camping de fase 1 sigue sin existir; ya no importa, porque las tres que
quedan sí tienen precio.

**4 · La prueba de la carta — PASA con reserva.** Sin ella, Valentina tiene una posición
inexpugnable y el escenario termina en «salen los seis, me pagas el martes», que es un
`acuerdo`. Con ella hay cupo, precio, alguien a quien decirle que no y 50.000 que faltan. Cambia
el final: no es adorno. **Reserva 1:** entra después del turno global 4 y la salida barata de
Kevin está en el 3 (§2). **Reserva 2 (§9 del blueprint):** la ficha promete que mirarla antes no
paga porque «trae una tarea nueva y una corrección a algo que ya habrás dicho». La mitad de la
tarea aguanta. La mitad de la corrección **no es un antídoto, es el premio**: quien la mira
antes simplemente no dice «no hay sitio» y se ahorra la contradicción. Aquí se salva por poco,
porque el turno 2 de Valentina es su queja con cifras y es muy probable que ya haya dicho *there
are only six beds* antes de que la carta exista.

**5 · La prueba de las preguntas abiertas — PASA con reserva (la misma).** Ahora hay datos
gated en las **dos** direcciones, que antes no: hacia Valentina, Andrea en veinte minutos,
Sebastián hasta las 10:00 p. m. y la hamaca —y los dos primeros **sí deciden quién viaja**, así
que se corrigió el hallazgo 8 (dato gated inútil), aunque el papel de inútil lo hereda la
hamaca—; hacia Kevin, quién es el sexto y por qué entró. La reserva es literalmente la de la
ronda anterior, sin tocar: el «lo consigues si» de Kevin premia contar **«al menos una»** de las
cosas que solo sabe él, y la ficha añade ahora *«o si a ti se te ocurre que vienen al caso»*, que
**debilita** la puerta en vez de reforzarla. Sigue dependiendo de la disciplina del jugador.

**Turnos: 7 · 7.** Oposición viva del T1 al T12 global (turno 6 de 7 por rol); el séptimo es
cierre, pero cierre con producción de lengua. **Ronda anterior: 7 nominales con 4 de oposición y
apagón en el T5.** El apagón se corrigió.

## 8 · `cancel-the-gym-i-am-leaving`

**1 · La prueba del sí — PASA.** Milena no puede conceder (permanencia firmada, autorización
ajena, llamado de atención propio) y su condición está escrita y es accionable. Tatiana no puede
irse con un «bueno, nada», porque la segunda mitad de su objetivo sobrevive y la carta la
empeora. Sigue siendo el mejor tratamiento del par.

**2 · La prueba del silencio — PASA.** A 8 · B 8. Milena necesita **cuatro** cosas de Tatiana y
dos son imposibles de conseguir hoy; y ahora, además, **su obligación es un derecho de la otra**:
ella necesita la firma tanto como Tatiana necesita el número. Eso es lo que convierte el
mostrador en una negociación. Con la salvedad de §4.2: si el número no existe, el intercambio se
vuelve unilateral otra vez.

**3 · La prueba de la única salida — PASA con reserva.** Dos caminos en vez de tres, y borrar el
del PSE fue correcto: era una fila de tabla que nadie podía decir. La reserva es nueva y es de
§4.1: después de la carta **ninguno de los dos caminos es ejecutable por Tatiana antes de
irse**, así que el punto 2 del cierre le pide elegir entre dos puertas tapiadas. Sigue habiendo
más de una salida —eso lo cumple— pero lo que se elige ya no es un desenlace, es una tarea para
después.

**4 · La prueba de la carta — PASA con reserva.** La reserva grave de la ronda anterior está
**resuelta**: el único aporte real de la carta (cobranzas el día 12) ya está anclado en el punto
3 del cierre, en el mínimo de Tatiana y en el mínimo de Milena, así que un B que lo olvide **ya
no gana igual**. Y la carta trae dos cosas nuevas en vez de repetir tres que la jugadora ya
sabía. **Reserva:** su segunda novedad —Édison no está el jueves— rompe los dos caminos a la vez
y la ficha no dice en qué se reconstruye el plan, salvo por la pieza contradicha de §4.2.
**Y el §9:** la «corrección de algo que ya dijiste» aquí es casi vacía, porque Milena juega los
turnos 2, 4, 6 y 8 y el horario de Édison lo suelta normalmente en el 4 o el 6 — o sea, **después**
de que la carta llegue. No hay nada que corregir. Lo único que impide que mirarla antes pague es
la tarea del día 12, que hay que transmitir de todos modos.

**5 · La prueba de las preguntas abiertas — PASA.** Seis datos gated, y ahora uno más y bueno:
**qué documento sirve exactamente**, que salió de los datos duros de Tatiana y se quedó solo en
los de Milena. Eso convierte el turno 5 (ofrecer el tiquete y descubrir que falla por un dato)
en un descubrimiento en vez de una comprobación. Y la fila perdió el `no return date`, que
señalaba justo lo que había que descubrir. Bien hecho. Sin riesgo de ping-pong.

**Turnos: 8 · 8 en la rama en la que Milena concede el radicado. 6 de 8 en la rama en la que
aplica su restricción 2 al pie de la letra**, y en esa rama no hay aterrizaje: se apaga en el
**turno global 12** con cuatro turnos por delante. **Ronda anterior: 8 · 8 sin apagón.** El
escenario no ha perdido turnos; ha ganado una rama en la que los pierde todos de golpe.

---

# Los tres hallazgos, por gravedad

## 1 · (nº 8) `radicar` significa dos cosas en la misma ficha, y de eso cuelga el escenario entero

Restricción 2 prohíbe radicar sin soporte con las dos fechas; el dato oculto y el gesto de
cierre dependen de radicar hoy, cuando el soporte no existe. Es la pieza que retiene a la
atajista (92.000), la que reconstruye el plan cuando la carta rompe los dos caminos, y el objeto
físico que termina la escena (el número dicho y repetido). **Se apaga en el turno global 12** si
la pareja lo nota. Misma estructura que el hallazgo 2 de la ronda anterior sobre las cédulas del
nº 7, en el otro escenario.

## 2 · (nº 7) La salida barata de Kevin está un turno antes que la carta

Capitular en el turno global 3 le cuesta —200.000 devueltos esta noche, dos amigos plantados—
pero deja la carta sin objeto: un cupo de 150.000 no le importa a nadie si ya se decidió que no
va nadie. La rama da **4 turnos por rol** contra 7. Es exactamente el defecto de colocación que
el nº 8 acaba de corregir adelantando su carta al turno global 3, y que en el nº 7 se quedó en
el 4.

## 3 · (nº 7) El coste de irse es de dentro para uno y de fuera para el otro

Valentina no puede cerrar en seco porque necesita los cinco puestos del carro de Kevin: su
pérdida ocurre **en la conversación**. Kevin, una vez capitula, no necesita nada de Valentina
—va en la lista, tiene el carro, y deber plata es una posición cómoda cuando el otro te
necesita— y todo lo que pierde ocurre **fuera de escena y con terceros**. El reverso de §3.1
pide que los dos pierdan algo si se van sin acuerdo. No se levanta y se va, porque el gesto de
cierre necesita a los dos; se queda sin trabajar, que en los turnos 5 a 7 produce el mismo
silencio.

---

# Otros hallazgos, por orden

4. **(nº 8) El motor se atribuye un mérito que no le corresponde.** «La carta llega antes de que
   pueda irse» es falso: `afterTurn: 3` la pone en manos de Milena **antes de su turno 4**, o sea
   después de la tercera intervención, que es donde la atajista se levantaba. Quien la retiene es
   el radicado del turno 2. Importa porque significa que la defensa antiatajo del nº 8 depende de
   una sola pieza, y es la del hallazgo 1.
5. **(nº 7) La hamaca de Sebastián sigue ahí y la carta habla de colchoneta.** El límite lo pone
   la autorización de persona extra, no la colchoneta, pero las dos cosas van en la misma frase y
   la colchoneta es la visible. Es el argumento que rompió la versión anterior, todavía a mano.
6. **(§9, los dos) «Una corrección a algo que ya habrás dicho» no es un antídoto contra mirar la
   carta antes: es el premio.** Quien la mira antes no dice la frase y se ahorra la
   contradicción. En el nº 7 se salva por poco (Valentina probablemente ya dijo lo de las seis
   camas en su turno 2); en el nº 8 no hay nada que corregir, porque el horario de Édison suele
   decirse después de que la carta llegue. La mitad que sí funciona en los dos es la tarea.
7. **(nº 7) El gesto de cierre no tiene dueño.** «Uno de los dos dicta» deja sin asignar la frase
   más larga del ejercicio. En el nº 8 está repartido con nombres y por eso cierra limpio.
   Estimo el «¿ya está?» en 1 de 5 parejas, contra 3 de 5 antes.
8. **(nº 7) Una de las tres necesidades de Valentina es gratis.** Su objetivo acepta «una fecha
   dicha en voz alta» y el martes 25 es el objetivo declarado de Kevin. Ese hilo se cierra con un
   sí en un turno.
9. **(nº 7) La hamaca ha pasado a ser el dato gated sin consecuencia**, el papel que antes hacía
   «Andrés no tiene cómo subir». El cambio es favorable —los otros dos datos gated ahora deciden
   quién viaja— pero el hueco no está vacío.
10. **(nº 7) La reserva de la prueba 5 no se tocó, y empeoró un poco.** «Contaste **al menos una**
    de las cosas que solo sabes tú» sigue permitiendo terminar con cero datos arrancados por una
    pregunta, y la ficha añade ahora «o si a ti se te ocurre que vienen al caso», que abre la
    puerta en vez de cerrarla.
11. **(nº 7) Los 150.000 son carga estructural.** Si alguien los iguala a los 100.000 de la cama
    «por coherencia», la resta deja de dar 50.000 y la escasez de plata vuelve a evaporarse. Que
    nadie los redondee.
12. **(nº 8) Menor.** Los datos duros de Milena dicen que Édison «doesn't answer at night» y la
    carta es un mensaje suyo a las 6:52 p. m. Se sostiene porque la carta contesta a lo que ella
    le mandó al empezar y porque zanja de antemano lo único que se le podría volver a preguntar
    («no autorizo cancelaciones por viaje, ni una»). Queda anotado por si alguien lo toca.
