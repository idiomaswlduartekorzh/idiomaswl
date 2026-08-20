# Habla acompañada — inglés A2 · Fase 5: reauditoría de tensión de los escenarios 1 a 6

Comprobación de los arreglos. Lo que se audita son **las fichas de fase 4**
(`fase4-fichas-1-3.md`, `fase4-fichas-4-6.md`) contra su motor (`fase4-escenarios-1-3.md`,
`fase4-escenarios-4-6.md`). Cuando motor y ficha se separan, gana la ficha: es lo único que el
jugador ve. Esa regla es la que decide tres de los hallazgos de este informe.

Marco: `docs/habla-acompanado-blueprint.md` §3 (las seis maneras de morir **y el reverso del
modo 1**), §6 (puertas 2, 5, 6 y 11) y **§9 (qué carta se puede mirar antes sin sacar ventaja)**.
Informe anterior: `fase3-tension-1-6.md`.

**Convención de conteo.** «Turnos» = turnos combinados. Presupuesto de fase 4: 1 → 12, 2 → 12,
3 → 14, 4 → 15, 5 → 14, 6 → 14. Sin cambios respecto de fase 0.

---

## Tabla de resultados

`✔` pasa · `~` pasa raspando, con la razón anotada · `✘` falla

| nº | slug | sí | silencio | única salida | carta | preguntas abiertas | aguanta | antes | presup. |
|---|---|---|---|---|---|---|---|---|---|
| 1 | `the-bike-in-the-parking-lot` | ✔ | ✔ | ~ | ✔ | ✔ | **11** | 10 | 12 |
| 2 | `no-appointment-until-thursday` | ✔ | ✔ | ~ | ✔ | ✔ | **9** | 6 | 12 |
| 3 | `swap-the-saturday-shift` | ✔ | ✔ | ✔ | ✔ | ✔ | **14** | 14 | 14 |
| 4 | `a-charge-i-did-not-make` | ✘ | ✔ | ~ | ~ | ✔ | **11** | 13 | 15 |
| 5 | `late-again-on-monday` | ✔ | ✔ | ✔ | ✔ | ✔ | **13** | 9 | 14 |
| 6 | `the-cousin-on-the-sofa` | ✔ | ✔ | ✔ | ✔ | ✔ | **14** | 14 | 14 |

Movimiento neto: **+3 en el 2, +4 en el 5, +1 en el 1, −2 en el 4.** Los tres fallos limpios de
la ronda anterior (el sí del 2, las cartas del 1 y del 5) están corregidos y verificados. Aparece
un fallo nuevo, en el 4, y es exactamente la enfermedad que el 2 tenía en la ronda anterior:
**una pieza que vive en el motor y no llegó a la ficha.**

**El atajista.** Ganaba el 1, el 2 y el 5. Ahora gana el **4**, limpio y sin romper una regla, y
tiene una salida barata en el **2**. El 1, el 3, el 5 y el 6 lo bloquean con impedimentos
verificables.

---

# 1 · La prueba del atajista, intentada en tres turnos

Dos intentos por escenario: **por las buenas** (cerrar cooperando, sin romper nada) y **por las
malas** (levantarse y dejarlo). La pregunta del blueprint es si alguien puede irse gratis.

| nº | por las buenas (cerrar en 3) | por las malas (irse) | veredicto |
|---|---|---|---|
| 1 | choca: el hueco de $40.000 entre dos topes numéricos no se cierra con dinero | se puede, y sale barato | **bloqueado a medias** |
| 2 | **A puede rematar en el turno 2** ofreciendo la sede del Centro | ninguno: A tiene la cuarta silla vacía, B el plan que solo sirve aquí | **atajo por el lado de A** |
| 3 | choca: la condición de B es escrita, verificable y no negociable | ninguno: el examen pagado contra el favor del mes que viene | **bloqueado** |
| 4 | **B puede conceder los $42.000 completos en el turno 2**, desde su propia tabla | — no hace falta irse: cerrar es más barato | **el atajista gana** |
| 5 | choca contra un renglón en blanco que B no puede llenar | ninguno: el memorando la expone a ella y le cuesta a él el bono y el ascenso | **bloqueado, y es el mejor del set** |
| 6 | choca: un «sí» temprano reordena la conversación, no la termina | imposible: viven ahí y desayunan mañana | **bloqueado** |

## Los tres intentos que importan

### Nº 5 — bloqueado, y así es como se comprueba

> **T1 (B)** — Pone las llaves y la hoja sobre el escritorio. «Te las quiero dar a ti. Y es el
> tercer lunes.»
> **T2 (A)** — Atajo por las buenas: «Firmo lo que sea y abro los sábados.»
> **T3 (B)** — No lo puede tomar. **El renglón «qué cambia» sigue en blanco y ella no lo puede
> llenar** (restricción 3 de B). Y los sábados no son lo que quiere: quiere dos mañanas de
> capacitación, y el camión pasa los lunes.

El atajo se detiene contra un espacio en blanco que está en las dos fichas como dato duro. No es
un criterio de éxito, es un impedimento que el otro jugador comprueba mirando el papel. Y por las
malas tampoco hay salida: el único papel que A puede firmar sola es la hoja, porque el memorando
la obliga a explicar los dos lunes que tapó. **Este escenario pasó de 9 turnos a 13. Es el mejor
arreglo del bloque.**

### Nº 4 — el atajista gana, y con la ficha de B en la mano

> **T1 (A)** — La factura, los $42.000, nueve años sin un cobro extra.
> **T2 (B)** — «No puedo devolver efectivo, pero le puedo hacer un cambio de plan: 12 GB al
> precio de 8 durante seis meses y los 42.000 completos en tres facturas de 14.000. Permanencia
> de seis meses.»
> **T3 (A)** — Acepta.

Miro qué se lo impide y no encuentro nada:

| ficha de B | dice |
|---|---|
| Restricción 1 | «No puedes pasar de 25,000 pesos… Por encima solo hay radicación escrita» |
| Datos duros | «Plan de retención (desde el mostrador) \| **12 GB for the price of 8** … + the **42,000 pesos back** in three bills of 14,000 + six months minimum» |

El tope de $25.000 —que es lo que el motor pone en el sitio que dejó vacío el reloj: *«lo que
bloquea es el tope de la asesora, que es una restricción real y no un plazo»*— **tiene escrita, a
seis filas de distancia, su propia excepción, y la excepción devuelve más de lo que el cliente
pidió.** Sin prerrequisito: la radicación necesita fecha y hora, la promoción de retención no
necesita nada.

Y A no tiene con qué resistirse. Su acuerdo condicional es «acepto si me llevo algo que impida
que se repita», y el cambio de plan lo es. El único coste de la salida 3 es la permanencia de
seis meses, y A **tiene prohibido irse a otro operador** (restricción 1): la cláusula le cobra
algo que no pensaba usar.

La resistencia existe, pero está en el sitio equivocado. El motor la escribe:

> *«cuando ella ofrece bloqueo, alerta y cambio de plan, él oye que le están vendiendo algo en vez
> de devolverle lo suyo»*

**Esa frase no está en la ficha de A**, ni como objetivo, ni como restricción, ni como dato. Es,
palabra por palabra, el mismo accidente que mató al nº 2 en la ronda anterior («cualquier día
menos el jueves» vivía solo en el motor). La diferencia es que el 2 perdía la negativa y el 4
pierde la desconfianza, que es más blanda —por eso el 4 no colapsa a 3 turnos, sino que pierde el
acto de `quejarse` y se queda con `pedir-aclaracion`, que sí aguanta.

### Nº 2 — el jueves ya no se puede aceptar, pero hay atajo por el otro lado

El arreglo del sí es correcto y verificable:

> **Restricción 1 de B:** «No puedes tomar ninguna cita entre semana antes de las 8:30… Entras a
> las **7:00** en el almacén de Girón, y **los jueves recibes el camión a las 6:30**: la llave del
> depósito la tienes tú. De la clínica al almacén hay **40 minutos**.»

Los tres números están en la ficha de B y se comprueban solos. El jueves 10 a las 7:00 dejó de ser
una incomodidad y es un imposible. **Esto era lo grave de la ronda anterior y está resuelto.**

El atajo nuevo es de A:

> **T1 (B)** — «Me duele la muela, ¿me pueden ver hoy?»
> **T2 (A)** — «Hoy no hay. Pero la sede del Centro atiende urgencias sin cita hasta las 8:00 por
> $40.000, y le aparto el sábado 12 a las 9:00 para el tratamiento, que ahí sí lo cubre el plan.»
> **T3 (B)** — Trae $70.000. Acepta.

A cumple su objetivo entero en el turno 2: fecha escrita, algo para esta noche, y solo le falta el
celular. Nada en sus restricciones le impide ofrecer la otra sede de entrada. Lo que salva al
escenario no es una restricción: es la carta del turno 5, que le pone encima de la mesa una opción
mejor y le obliga a reabrir. Funciona —por eso el 2 aguanta 9 y no 6— pero **el escenario depende
de que la carta llegue a tiempo, no de que el atajo esté cerrado.**

## Dónde el coste de irse no muerde: el nº 1

El bloque «lo que le cuesta a cada uno irse sin trato» está escrito en las dos fichas del 1 y es
honesto. Pero mido lo que pesa:

- **A:** subir la bicicleta cuatro pisos, bloquear otro sábado, la de ruta espera.
- **B:** tres semanas más de búsqueda y $6.400 diarios de bus.

Son **molestias, no pérdidas**, y no tienen fecha: es el escenario que se diseñó sin reloj a
propósito. Comparado con el 3 (un examen de más de un millón pagado) o el 5 (el bono, el ascenso y
un memorando que expone a la supervisora), el coste de levantarse en el 1 es el más barato de los
seis, y además **son dos desconocidos que no se van a volver a ver**: no hay relación que
proteger, que es el pegamento que sostiene al 3, al 5 y al 6.

No es un fallo —nadie se va *gratis*— pero es donde el reverso del modo 1 muerde menos. Si un
escenario del set se va a caer por abandono, es este.

---

# 2 · Las cartas nuevas contra la regla de §9

La regla: **una carta que quita una palanca premia mirarla antes; una carta que asigna una tarea
nueva, o que rompe un hecho que el propio jugador ya dijo en voz alta, no se puede aprovechar
mirándola.**

## Colocación: los seis disparadores están bien, y en turnos globales

Es la corrección más limpia del bloque. Verifico la aritmética uno por uno:

| nº | arranca | disparador | a quién | ¿de quién es ese turno global? | ventana 3-6 |
|---|---|---|---|---|---|
| 1 | B | fin del global **5** | B | 1B 2A 3B 4A **5B** → tercero de B | ✔ |
| 2 | B | fin del global **5** | A | 1B 2A 3B 4A **5B** → tercero de B | ✔ |
| 3 | A | fin del global **6** | A | 1A 2B 3A 4B 5A **6B** → tercero de B | ✔ (justo) |
| 4 | A | inicio del global **5** | A | 1A 2B 3A 4B **5A** → tercero de A | ✔ |
| 5 | B | inicio del global **5** | B | 1B 2A 3B 4A **5B** → tercero de B | ✔ |
| 6 | A | inicio del global **6** | B | 1A 2B 3A 4B 5A **6B** → tercero de B | ✔ (justo) |

Las seis cuentas cuadran y las seis van escritas en turnos globales, con el desglose delante. Se
acabó el «al terminar tu cuarto turno» que la puerta 6 prohíbe. Y las cartas viven **en pantalla
aparte**, con el turno escrito encima: los seis bloques lo dicen.

**Residuo de forma, el mismo defecto de la ronda anterior con ropa nueva:** las fichas 1-3 dicen
«se abre **al terminar** el turno global N» y las 4-6 «ábrela **al empezar** el turno global N».
No es equivalente —en 4-6 el que la recibe la lee antes de hablar; en 1-3, después— y son dos
convenciones para la misma instrucción dentro del mismo set. Se arregla eligiendo una.

## Las tres cartas rehechas: ¿traen tarea o quitan palanca?

### Nº 1 — la camioneta del cuñado se cae, al rol B

**Trae tarea, y rompe un hecho que B ya dijo por obligación.** El punto 3 del cierre («quién la
mueve, a qué hora y hasta dónde») está en las dos fichas: B no puede llegar al final sin haber
nombrado la camioneta. Cuando la carta la mata, B tiene que reabrir un término ya pactado y pedirle
a A lo único que A no está obligado a dar: que la guarde, con cuatro pisos sin ascensor detrás.
Sin la carta, la pareja cierra en el turno 8 o 9 y se despide. **Es carta. ✔**

**Pero la lectura anticipada no es inocua, y la ficha afirma que sí.** Dice: *«no se gana nada, se
pierde… mirar antes adelanta la debilidad».* Hay una rama donde eso no se cumple: la **salida 2**
($390.000 con la llanta cambiada, el candado y las luces dentro) deja la bicicleta rodando hoy, y
con llanta nueva B se va montado hasta Floridablanca. **Es inmune a la carta.** Un B que la mire
antes no tiene que enseñar ninguna debilidad: le basta con empujar hacia la salida 2 desde el
turno 1 —pagando $40.000 de Nequi que ya tenía apartados para eso— y la carta llega a una
conversación donde el transporte ya no depende de nadie. No es una ventaja enorme; es que la
frase escrita en la ficha («no se gana nada») es falsa en esa rama, y §9 pide que la respuesta sea
«nada bueno», no «casi nada».

### Nº 2 — la doctora ofrece las 6:15 y pide dos cosas antes de las 5:30, al rol A

**Trae tarea con hora.** Es el modelo del segundo tipo de §9: no retira una insinuación opcional
—que era el defecto de la carta vieja— sino que pone una salida real detrás de dos datos que solo
se consiguen hablando. Y desactiva el atajo de la sede del Centro, porque llega con una opción
mejor. **Es carta. ✔**

**Lo que la lectura anticipada sí cuesta, y no está escrito:** la ficha dice que adelantar la
pregunta la gasta («una pregunta por la urgencia en el primer turno se contesta con "me duele
mucho"»). Eso **no** es lo que dice la ficha de B:

> «No es que te lo prohíban contar: **es que a ti lo que te importa es el dolor** y lo del pedazo
> te parece un detalle. **Si te preguntan algo abierto —cómo es, qué pasó, desde cuándo—, sale.**»

Y `What happened?` es el segundo exponente del andamiaje de A, y uno de sus criterios de éxito es
hacer una pregunta abierta antes de proponer nada. O sea: **el dato pivote sale en el turno 2 por
diseño**, con carta o sin ella. Lo que gana el que mira antes es otra cosa: sabiendo que las 6:15
existen, **no ofrece nunca la sede del Centro ni la lista de espera**. Y `recomendar` es uno de los
dos actos de habla declarados del escenario. Mirar antes en el nº 2 no acorta la conversación: le
quita la mitad de su definición, y nadie se entera.

### Nº 4 — el sobrino compartió datos con el televisor, al rol A

**Aquí el diagnóstico de la ronda anterior no cambia: sigue siendo media carta, y el ascenso a
carta entera no ocurrió.** El motor lo explica así:

> *«le quita a A la salida que estaba construyendo. La radicación escrita… lleva la casilla de
> custodia del equipo, y A no puede marcarla "sí" sin mentir.»*

Tres cosas lo desactivan, y las tres se comprueban sobre las fichas:

1. **A no sabe que la radicación existe.** No aparece en su ficha: ni en datos duros, ni en el
   andamiaje, ni en el objetivo. Solo está en la tabla de B. No se le puede quitar a A una salida
   que A no puede haber empezado a construir.
2. **B está motivada a no ofrecerla.** Su objetivo literal es «cerrar este caso hoy, aquí, **sin
   escalarlo**». La radicación es escalarlo. La va a nombrar para descartarla, no para ofrecerla.
3. **La confesión salía igual.** B tiene `Was the phone with you all month?` en el andamiaje y A
   tiene prohibido mentir. Es el mismo argumento que hizo `~` a esta carta en la ronda anterior, y
   sigue en pie.

La propia ficha lo delata al escribir el efecto en condicional: *«**Si estabas contando** con
dejar un reclamo por escrito, vuelve a mirar qué hay que firmar»*. Una carta cuyo efecto empieza
por «si» es una carta que puede no tener efecto. **Se queda en `~`.**

Lo que sí añade, y no es poco: precisión (seis horas, el televisor, la batería) y un cambio de
registro —confesar no es responder—. Eso es real. No es una bisagra.

## Las tres cartas que no se rehicieron

- **Nº 3 (ventana de hora desconocida, 3:00-6:00).** El cambio es correcto y resuelve el incentivo
  perverso de la ronda anterior: la incertidumbre no se puede pre-cocinar. Y la restricción 2 nueva
  de A —poner **dos maneras de partir el sábado** sobre la mesa antes del sí— impide que el que
  mira antes se calle para no tener que retractarse. **Queda un resto:** la salida 2 (cambio de
  sábados enteros) es inmune a la ventana, igual que la salida 2 del nº 1 es inmune a la camioneta.
  Quien mire antes propondrá las dos maneras porque está obligado, y luego empujará hacia el cambio
  de sábados. El daño baja de «rompe» a «degrada». Es una mejora real, no una cura.
- **Nº 5 (Alba toca a la puerta).** La única del set que no llega por el teléfono de un ausente:
  entra por la puerta, en persona. No es un plazo ni un aumento de volumen —cambia la **forma** del
  trato: lo que se firme tiene que poder decirse delante de los otros cuatro—. Es carta. Con una
  particularidad que conviene saber: **es la única cuyo efecto pasa entero por la discreción del que
  la recibe** («cuánto de esto le cuentas es cosa tuya»). Está sostenida por una instrucción
  imperativa en la propia tarjeta, así que muerde; pero si el nº 1 le quita a B el transporte y no
  hay elección, aquí sí la hay.
- **Nº 6 (la mamá adelanta el pasaje).** Sigue siendo la mejor del set y ahora entra en el global 6,
  cuando B ya ha puesto sobre la mesa el sábado 29 (su restricción 3 la obliga a sacar los asuntos
  de uno en uno, así que el 29 cae en el global 4). Rompe un hecho que ella misma dijo. ✔
  **El aviso impreso en la tarjeta apunta al exploit equivocado:** dice que quien la mire antes
  «suelta sus tres asuntos de golpe en el primer turno», y eso es justo lo que su **restricción 3
  ya prohíbe**. El exploit vivo es otro: quien la mire antes **nunca dirá que su mamá llega el
  sábado 29**, porque sabe que tendrá que desdecirse. Se salta la retractación, que es el acto de
  más valor del escenario. Menos grave que antes, misma dirección.

---

# 3 · El motor del conjunto

## ¿Perdieron de verdad el reloj y el tercero ausente?

| nº | reloj | tercero que decide | veredicto |
|---|---|---|---|
| 1 | no hay fecha límite; **queda el taller que cierra a la 1:00 y la camioneta de las 6:00** | ninguno con nombre… salvo el cuñado, que es quien manda la carta | **perdió el reloj que decide, conserva el reloj logístico** |
| 4 | limpio: fuera el vencimiento del 25, la firma del jefe regional y el viaje | nadie: las tres salidas se firman en el mostrador | **lo perdió de verdad** |
| 5 | limpio: fuera la lista del viernes y el mediodía; el camión de los lunes a las 7:10 es un hecho, no un plazo | nadie: Amparo decide | **lo perdió de verdad, y es el mejor rediseño del set** |

**El 1 se queda a medio camino, y hay que decirlo.** El desacuerdo ya no lo decide el calendario
—eso es cierto y es el logro—, pero la segunda mitad del escenario es horario: el taller cierra a
la 1:00, se recoge a las 3:00, la camioneta pasa a las 6:00, y la carta es un WhatsApp de un
tercero ausente que cancela. El plazo no se disfrazó de otra cosa: se mudó de la decisión a la
logística. Cuenta como perdido para el reparto del conjunto; no cuenta como perdido para la lengua
que produce.

**Y el cuarto no existe.** El encargo hablaba de cuatro de ocho sin reloj. En mi bloque son tres.
En el otro, el nº 7 mantiene deliberadamente las 7:00 a. m. del administrador y del mecánico (y el
`aplazado` depende de ellas) y el nº 8 declara por escrito que «el visado es el reloj». **El set va
por 3 de 8, no por 4.** No es un fallo de estos seis; es un número que conviene no dar por hecho.

## ¿Se parecen entre sí los que quedaron sin reloj?

Sí, pero no por donde se temía. No hay un molde nuevo de situación: la bicicleta, el mostrador y la
oficina de atrás producen lenguas distintas (comparativos y cuantificadores en el 1; aclaración de
términos en el 4; mecanismos y papeles en el 5). Lo que se repite es **el mecanismo**:

> En el 1, en el 4, en el 5 y en el 6, la salida buena está **en el bolsillo de uno de los dos y
> solo sale si el otro pregunta.**

- 1 · el juego de cambios que sirve para la bicicleta de ruta (A) · la camioneta (B)
- 4 · el sobrino (A) · el plan de retención y los cuatro reclamos idénticos (B)
- 5 · la vecina del 3 (A) · los dos jueves después de cerrar (B)
- 6 · Óscar del 402 y los días libres de Iván (A) · por qué la sala y no el cuarto (B)

Cuatro de seis. Es un molde mejor que «fecha límite más tercero ausente» —produce preguntas
abiertas en vez de calendario, que es justo lo que el set necesitaba— pero es un molde, y trae su
propio modo de fallar: **si ninguno de los dos pregunta, los cuatro aterrizan en su peor salida** y
lo hacen sin que nada se ponga rojo. En el 5 y en el 6 hay criterios de éxito que lo empujan; en el
1 el empujón es genérico («preguntaste algo abierto»); en el 4 el dato pivote de B ni siquiera hace
falta si toma el atajo de la retención.

## Lo que sigue igual y no se arregló

**Cinco de las seis cartas siguen llegando por el teléfono de alguien que no está**: el cuñado (1),
la doctora (2), el centro de exámenes (3), la hermana (4), la mamá (6). Solo el nº 5 entra por la
puerta, y su documento lo señala con razón. De 6 de 6 a 5 de 6.

---

# 4 · Lo que rompió el arreglo

Cuatro cosas. La primera es la grave.

## 4.1 · El tope de $25.000 del nº 4 no es un tope

Ya está desarrollado arriba. Resumen: el motor puso la restricción de la asesora en el sitio que
dejó vacío el reloj, y la ficha le escribió al lado una promoción de retención que devuelve
**$42.000 completos** sin prerrequisito y con una cláusula de permanencia que a A no le cuesta nada
porque tiene prohibido irse. Consecuencia medida: `quejarse` se acaba en el turno 3; lo que sigue
—que es bueno— es `pedir-aclaracion`. **El escenario baja de 13 turnos a 11 y pierde uno de sus dos
actos declarados.**

Nota de origen: no lo rompió el bloque de coste de irse. Lo rompió **quitar el reloj sin sustituir
lo que el reloj hacía**. La ventana de 24 horas entre la firma del lunes 24 y el vencimiento del
martes 25 era, en la ronda anterior, «el mejor reloj del set: no una fecha límite decorativa, sino
el margen exacto que hace elegir». Al quitarla, las tres salidas se pueden firmar hoy, sin coste
temporal, y la que devuelve más dinero domina a las otras dos. **No hay decisión.** Ahí es donde la
prueba de la única salida se cae a `~`: hay tres, pero una es la buena para los dos.

## 4.2 · El nº 2 se acerca al callejón sin salida, y B se queda sin propuestas

Esto sí lo produjo el endurecimiento. Ahora es verdad, a la vez, que:

- el único hueco de agenda (jueves 10, 7:00) es un imposible físico para B;
- el sábado 12 no sirve para primera consulta;
- B no puede volver otro día;
- A no puede despedir a nadie sin fecha escrita **y** algo concreto para esta noche.

Es decir: **la zona de acuerdo entera vive en los datos ocultos de A** (las 6:15 con la doctora, la
sede del Centro, la lista de espera). Como diseño de presión está bien —A no puede quedarse quieta,
o incumple su propia restricción 3—. Como reparto de la conversación, tiene un coste: entre el
turno 3 y el 5, **B no tiene ni una sola propuesta que hacer.** Su andamiaje son peticiones
(`Is there any other day?`, `What can I do tonight?`, `Can I…?`), no ofertas. Puede preguntar,
insistir y negarse; no puede proponer.

No falla la prueba del silencio en turnos ni previsiblemente en palabras, porque B narra el dolor,
el horario y el celular. Pero es la franja del set donde más cerca se está del examen oral de dos
sillas, con los papeles invertidos respecto de lo habitual: aquí el que no puede hacer nada es el
que pide.

## 4.3 · El nº 1 aguanta más turnos y produce menos tensión en ellos

Ganó un turno (10 → 11) y perdió temperatura en el tramo final. La carta traslada la conversación
del **valor** (cuánto vale la misma bicicleta, que es lo que se diseñó) a la **logística** (quién
la mueve, a qué hora, con qué, y quién la guarda). Sumado a que el cierre ya dedicaba dos de sus
cuatro puntos a transporte y llanta, la mitad de atrás del escenario es una hoja de ruta con horas.

Es lo que el encargo temía: *meterle una tarea a la carta puede haberlo vuelto logística.* Aquí
pasó. Matiz importante: **no es un fallo pedagógico** —`prepositions-movement-a2` y `telling-time`
son dos de los anclajes declarados, y esa lengua se produce de verdad—. Es un fallo de tensión:
los turnos 8 a 11 se deciden con un horario, no con un desacuerdo.

Dos incoherencias internas del 1, menores pero vivas en voz alta:

1. **La restricción 2 de B choca con su propia alternativa.** «Los $70.000 de Nequi solo salen si
   lo que compras con ellos entra en el trato», y su tabla ofrece «a car with an app: about 22,000
   pesos». Un carro por aplicación no entra en el trato. El motor gasta esos $70.000 en transporte
   sin darse cuenta de que la ficha lo prohíbe. Un jugador literal se queda sin la alternativa
   barata justo cuando la carta se la pide.
2. **La aritmética de las salidas no cuadra para A.** Salida 1: $340.000 − $15.000 de taller, y se
   queda el juego de cambios que le sirve para la de ruta ($95.000). Salida 2: $390.000 − $38.000
   de llanta − $45.000 de candado − $35.000 de luces, y pierde los cambios. La salida 1 le vale a A
   más de cien mil pesos más que la 2. Ningún A2 va a hacer esa cuenta, y por eso la prueba de la
   única salida pasa; pero **dos de las tres salidas están dominadas** y la que domina es
   precisamente la que el dato oculto de A ya señalaba como buena.

## 4.4 · El bloque «lo que cuesta irse» no llegó a las fichas 4, 5 y 6

Comprobado sobre los archivos:

| archivo | apariciones de «Lo que pierdes si te vas sin trato» |
|---|---|
| `fase4-fichas-1-3.md` | **6 de 6 roles** |
| `fase4-fichas-4-6.md` | **0** |

En el motor de 4-6 sí está, y bien escrito: «Qué pasa si nadie cede» aparece en los tres
escenarios, y en el nº 5 con el añadido excelente de «qué pasa si alguien cede de golpe». **Se
quedó ahí.**

Medido rol por rol, el contenido sobrevive disperso en cinco de los seis roles y por eso no
convierto esto en un fallo de la prueba:

- 4A: la restricción 2 («pediste permiso en el trabajo, no lo vas a pedir otra vez este mes»).
- 4B: la encuesta y el bono, en «lo que sabes tú y nadie más».
- 5A: el bono de $80.000 y el puesto vacante, en datos duros.
- 5B: los dos lunes tapados y lo que la expone el memorando.
- 6B: «sin las dos firmas, los dos buscan apartamento en dos semanas».
- **6A (Dani): nada.** Es el único rol de los doce sin coste escrito de no acordar. Se salva porque
  no se puede levantar de la cocina.

Aun así, la asimetría de formato importa: en 1-3 el jugador lee un bloque titulado que le dice qué
pierde; en 4-6 tiene que deducirlo de una fila de una tabla. **La pieza que se inventó para matar
al atajista llegó entera a la mitad del bloque.**

## 4.5 · Dos avisos que ya no describen la realidad

Menor, pero es ruido que se propaga. `fase4-escenarios-1-3.md` (y la cabecera del nº 3 en sus
fichas) avisa por escrito de que 7 minutos **«rompe el techo de 6 de §4»** y deja la decisión
abierta. `fase4-escenarios-4-6.md` hace lo mismo con 7, 7 y 8. Pero §4 del blueprint ya dice
**5-8 minutos y 6-9 turnos por rol** para A2: los seis escenarios caben. Solo `fase4-fichas-4-6.md`
se dio cuenta y lo escribió («queda cerrado por el techo nuevo de §4»). Los otros tres documentos
piden a David una decisión que ya está tomada.

---

# Detalle por escenario

## 1 · `the-bike-in-the-parking-lot` — 11 de 12 (antes 10)

**Sí ✔.** Dos topes numéricos que no se cruzan ($390.000 con cambios nuevos / $350.000 de contado
por la bicicleta sola) y un hueco de $40.000 que no se cierra con dinero. Las contradicciones de la
ronda anterior (Puerta del Sol, el lunes a mediodía) desaparecieron con el rediseño.
**Silencio ✔.** 6 y 6, y el que manda necesita tres cosas: que salga hoy, un solo pago, y que el
otro diga en voz alta cómo está la llanta.
**Única salida ~.** Tres, pero dos dominadas para A (§4.3).
**Carta ✔.** Rompe un hecho que B dijo por obligación del cierre. Con la fuga de la salida 2 (§2).
**Preguntas abiertas ✔.** Cómo la sacas de aquí · para qué la quieres · qué va incluido · qué hay
que arreglarle y cuánto cuesta.

**Traza (pareja sólida):** 1 B lowball + la llanta · 2 A rechaza con el recibo · 3 B dice lo que
trae y pregunta qué incluye · 4 A mete candado y luces sin bajar, pregunta cómo se la lleva · 5 B
nombra la camioneta *(se abre la carta)* · 6 A propone taller antes de la 1:00 o cambios viejos ·
7 B confiesa que no hay camioneta · 8 A pone precio a guardarla · 9-10 se cruzan taller, hora y
llanta · **11 cierra el trato: aquí se apaga** · 12 recitado de los cuatro datos.

**Rama corta:** si la pareja aterriza la salida 2 antes del turno 5, la carta no muerde y el
escenario se cierra en 7.

## 2 · `no-appointment-until-thursday` — 9 de 12 (antes 6)

**Sí ✔.** Arreglado y verificable con dos números de la propia ficha de B.
**Silencio ✔.** A deja de ser juez con silla: la carta le pone una tarea con hora (antes de las
5:30) y necesita de B un dato que B no cree importante.
**Única salida ~.** Tres antes de la carta; después, las 6:15 en esta clínica ($0, misma noche, sin
cruzar la ciudad) dominan a la sede del Centro ($40.000). La decisión deja de ser entre salidas y
pasa a ser si B suelta lo del pedazo de muela.
**Carta ✔.** Tarea, no palanca. Y desactiva el atajo de A. Con la reserva de §2 sobre lo que cuesta
mirarla antes.
**Preguntas abiertas ✔.** Sigue siendo el mejor del set en esta prueba: qué pasó / cómo es / desde
cuándo (pivote), el horario de Girón, qué hacer esta noche, y el enredo del celular.

**Se apaga en el turno 9**, cuando se acepta la cita de las 6:15. Los tres últimos turnos son el
celular dígito a dígito, el frío en la mejilla y la señal de alarma: pedagogía buena, tensión cero.
El cierre bajó de 5 datos a 4 y se nota.

## 3 · `swap-the-saturday-shift` — 14 de 14 (igual)

Sigue siendo el sano del set y ahora también el modelo del atajista: sus restricciones son
impedimentos comprobables, no preferencias. Las cinco pruebas en `✔`.

**Lo único que sigue sin cuadrar, y viene de fase 1:** la salida 3 (partirlo en tres, con Katherine
cubriendo las horas del medio) choca con el dato oculto del propio A —«Katherine está en la sede de
la Autopista ese sábado»—. Sobrevive como «yo la llamo a las 6 por su turno del jueves 17», que es
lo que el motor describe, pero un jugador atento va a preguntarlo en voz alta. Quedan dos salidas
completas: mínimo cumplido.

## 4 · `a-charge-i-did-not-make` — 11 de 15 (antes 13)

**Sí ✘** (§1 y §4.1). **Silencio ✔** (B necesita dos cosas que solo A tiene, y el bono que no puede
nombrar). **Única salida ~** (una domina). **Carta ~** (§2). **Preguntas abiertas ✔**, y mejor que
antes: B ya tiene respuesta a «¿por qué no me llegó ningún aviso?» (la app, la migración de junio)
y ve los dos bloques de consumo, uno de madrugada con el teléfono quieto. `What were you doing that
afternoon?` está financiado con `past-continuous-a2`. Ese arreglo es impecable.

**Se apaga en el turno 11**, cuando se nombra la forma de la compensación. En la rama del atajo, en
el 6. Lo que perdió no fue lengua: fue la obligación de elegir.

## 5 · `late-again-on-monday` — 13 de 14 (antes 9)

El mejor arreglo del bloque, y por tres piezas que se pueden señalar con el dedo:

1. **La necesidad de B es un objeto, no una frase.** «Pon sobre el escritorio el segundo juego de
   llaves y la hoja de compromiso en blanco. Después habla.» Un B mudo ya ha comunicado a qué vino,
   y A tiene una pregunta abierta obligatoria en su primer turno. Esto mata el sermón de dos sillas
   sin depender de que nadie lea la prosa.
2. **El renglón «qué cambia» está en las dos fichas como dato duro**, y B tiene prohibido llenarlo.
   Es el freno estructural contra el atajo, y funciona (§1).
3. **El tercer punto del cierre** —qué le cuesta a cada uno, **dicho por el que lo paga**— obliga a
   oírse pagando. Quien regale sus sábados tiene que decir en voz alta que ha regalado el curso.

Y desapareció lo que lo mataba en el turno 9: ya no hay una moneda etiquetada como moneda con
permiso de uso, ni un B al que le baste con un sábado teniendo dos huecos.

Las cinco pruebas en `✔`. La única salida es ahora de las mejores del set: tres salidas con precios
genuinamente distintos, y la 2 existe para que se pueda **elegir mal** (llevarse el papel cómodo a
cambio del curso, el B1 y el trámite). Eso es una decisión de verdad.

**Se apaga en el turno 13**, cuando quedan cerrados el papel y las dos mañanas de capacitación. El
14 es el recitado, pero su punto 3 todavía obliga a nombrar un precio.

## 6 · `the-cousin-on-the-sofa` — 14 de 14 (igual)

**Preguntas abiertas: de ✘ a ✔.** Era el fallo de la ronda anterior y está corregido con dos datos
que dejaron de ser confesables:

| dato | quién lo tiene | por qué no sale solo |
|---|---|---|
| por qué la sala y no el cuarto (el wifi junto a la ventana, la calle del bar, las cajas a las nueve) | Cris | «te da rabia y suena a excusa: dices que necesitas la sala y punto» |
| qué va a hacer Iván durante el día (nada fijo, puede salir temprano) | Dani | «no lo va a decir solo, porque no sabe que importa» |

Y una tercera natural (por qué no le paga un hostal). Las dos primeras están ancladas en los
criterios de éxito de los dos lados, y la respuesta va en inglés en la tabla del que la tiene. El
colchón ya está en las dos fichas, así que la salida 2 es alcanzable jugando limpio.

**El precio del arreglo, y es pequeño:** dosificar los tres asuntos era una decisión de Cris («el
orden en que salgan lo eliges tú») y ahora es una restricción con regla («uno por turno como mucho,
y el del contrato no lo sacas hasta que haya algo parecido a un plan»). Se hizo a propósito, para
bajar de B1 a A2, y cierra de paso el exploit de la lectura anticipada. Lo que se pierde es una
decisión del jugador; lo que se gana es que el escenario no dependa de una habilidad de B1. Cambio
razonable, dicho para que conste.

---

# Resumen de lo que hay que mirar primero (no lo arreglo yo)

1. **El nº 4 perdió el conflicto por donde lo perdió el nº 2 en la ronda anterior.** El plan de
   retención devuelve los $42.000 completos desde la tabla de la asesora, sin prerrequisito, y la
   desconfianza de A que lo impediría está en el motor y no en su ficha. El atajista gana en el
   turno 3.
2. **El coste de irse llegó a las fichas 1-3 y no a las 4-6.** Cero apariciones del bloque en
   `fase4-fichas-4-6.md`. El contenido sobrevive disperso en cinco de los seis roles; Dani (6A) se
   queda sin ninguno.
3. **La carta del nº 4 sigue siendo media carta.** Cierra una salida que A no sabe que existe y que
   B está motivada a no ofrecer.
4. **Dos cartas tienen refugio contra el que mira antes:** la salida 2 del nº 1 (bicicleta que rueda
   hoy) y la salida 2 del nº 3 (cambio de sábados enteros). En los dos casos la ficha afirma que
   mirar antes «no gana nada», y en esa rama gana algo.
5. **Los avisos de que 7 y 8 minutos rompen el techo de §4 son falsos:** §4 dice 5-8. Tres
   documentos piden una decisión ya tomada.
6. **En el nº 2, entre el turno 3 y el 5, B no tiene nada que proponer.** Toda la zona de acuerdo
   vive en los datos ocultos de A.
7. **El set va por 3 de 8 sin reloj, no por 4**, y el nº 1 solo lo perdió a medias: el plazo se mudó
   de la decisión a la logística.
8. **El molde nuevo:** en cuatro de los seis la salida buena está en el bolsillo de uno y solo sale
   si el otro pregunta. Es mejor motor que el calendario, pero falla igual en los cuatro cuando
   nadie pregunta, y sin señal.

Los sanos son el **3**, el **6** (14 de 14) y ahora el **5** (13 de 14). El **2** dejó de estar en
la UCI. El **1** aguanta más y calienta menos. El **4** es el que hay que devolver.
