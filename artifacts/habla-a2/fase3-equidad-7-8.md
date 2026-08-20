# Habla acompañada — inglés A2 · Fase 3: equidad y sensibilidad de los escenarios 7 y 8

Se audita `artifacts/habla-a2/fase2-fichas-7-8.md` (las cuatro fichas). El motor
(`fase1-escenarios-7-8.md`) y el plan (`fase0-plan.md`) se leen como contexto, no como objeto:
lo que llega a la pantalla del estudiante es la ficha, y varias de las protecciones que el
diseñador escribió en fase 1 **no sobrevivieron el salto a fase 2**. Ese es el hallazgo de
fondo de este informe.

Puerta que se aplica: `docs/habla-acompanado-blueprint.md` §6, puerta 10 — «sin conocimiento
cultural que la ficha no dé, sin escenario que duela, sin rol humillante» — más la legibilidad
de la ficha y el §5 (conjunto).

Criterio del lector: estudiante colombiano adulto, la mayoría de Bucaramanga, preparando
examen o migración. No un universitario estadounidense de veinte años.

---

## Veredicto

| escenario | veredicto | hallazgos | bloqueante |
|---|---|---|---|
| **7 · `two-more-people-for-the-trip`** | **pasa con cambios** | 7 (1 grave, 3 medios, 3 leves) | E7-1 y E7-2 |
| **8 · `cancel-the-gym-i-am-leaving`** | **pasa con cambios** | 8 (2 graves, 3 medios, 3 leves) | E8-1 y E8-3 |

Ninguno se retira. Los dos son ejercicios legítimos: pedir un favor incómodo, cobrarle a un
amigo y reclamar en un mostrador es exactamente lo que hay que saber hacer. Lo que hay que
arreglar son bordes, y casi todos se arreglan con una línea.

---

# 7 · `two-more-people-for-the-trip`

## E7-1 · GRAVE · «No puedes poner más plata» se lee como incapacidad, no como decisión

**Dónde:** ficha del rol A (Mateo), «Lo que no puedes hacer», punto 1.

**Citado tal cual:**

> **No puedes poner más plata.** Van 600,000 pesos tuyos y todavía no han vuelto todos.

**Por qué falla.** Fase 1 dejó la protección escrita con todas las letras: «No es que le falte
plata para vivir: es que no piensa volver a poner de su bolsillo por gente que no conoce». Esa
frase **no está en ninguna parte de la ficha**. Lo que queda es un «no puedes» en segunda
persona que un lector de A2, leyendo rápido antes de hablar, entiende como *no tienes*. La
diferencia entre «no vuelvo a poner» y «no me queda» es la diferencia entre un escenario de
límites y un escenario de escasez, y el diseñador escribió que si aparece la palabra «no
tengo» el escenario se salió del carril. Aquí no aparece la palabra: aparece el sentido.

**Cambio concreto.** Reescribir el punto 1 como decisión, con la capacidad de pago explícita:

> **No vuelves a poner de tu bolsillo.** Ya pusiste los 600,000 y todavía falta el de Kevin.
> Puedes pagarlo; lo que no vas a hacer es pagar por gente que no conoces.

## E7-2 · GRAVE · «Tu sueldo entra el martes 25» convierte un compromiso en un apuro de liquidez

**Dónde:** ficha del rol B (Kevin), «Lo que no puedes hacer», punto 1, y «Datos duros».

**Citado tal cual:**

> **No puedes darle hoy a Mateo los 100,000 pesos.** Los 200,000 que tienes encima son de
> Sebastián y de Andrés hasta que se sepa si van o no. Tu sueldo entra el **martes 25**.

> | Tu día de pago | **Tuesday the 25th** |

**Por qué falla.** La primera razón es la buena y basta sola: *esa plata no es mía*. Es una
restricción moral, produce lengua y no dice nada de la situación económica de Kevin. La
segunda razón —«tu sueldo entra el martes 25», reforzada con una fila de datos duros titulada
«Tu día de pago»— dice otra cosa: que Kevin **no tiene 100,000 pesos propios hasta que le
paguen**. Eso es «no tengo con qué» dicho con otras palabras, y es la única de las dos razones
que el escenario no necesita. Además hace daño doble: pone al jugador de B a interpretar a
alguien que vive al día delante de un compañero de clase que tiene su ficha al lado.

**Cambio concreto.** Quitar la frase de la restricción y reetiquetar la fila de datos. La fecha
hace falta (es la Salida 3 del motor), pero como fecha que se ofrece, no como día en que por
fin llega el dinero:

> 1. **No puedes darle hoy a Mateo los 100,000 pesos.** Los 200,000 que tienes encima son de
>    Sebastián y de Andrés hasta que se sepa si van o no.

> | Fecha que puedes proponerle | **Tuesday the 25th** |

## E7-3 · MEDIO · Kevin no sabe lo único que le da posición, y eso deja el rol B pidiendo perdón siete turnos

**Dónde:** el dato vive solo en la ficha de A, «Lo que sabes tú y nadie más».

**Citado tal cual (ficha A):**

> Y una cuenta que no has hecho en voz alta: el carro de Laura tiene 4 puestos y son 6. Sin el
> carro de Kevin, mañana se quedan dos en Bucaramanga.

**Por qué falla.** Fase 1 dice que ese apalancamiento «es lo que impide que esto sea un examen
oral con dos sillas». Pero en las fichas vive **solo en la cabeza de A**, y A no tiene ningún
motivo para decirlo en voz alta: decirlo es debilitarse. La ficha de B solo trae «Tu carro |
5 seats». Resultado previsible: B entra debiendo plata, habiéndose comprometido por su cuenta
y sin nada que poner encima de la mesa, y la conversación se va al monólogo del §3.2 del
blueprint con B disculpándose. Eso no es asimetría, es desventaja.

Esto no es equidad de contenido sino equidad entre los dos asientos de la mesa: los dos roles
los juegan alumnos, y uno de los dos se lleva sistemáticamente el papel del que pide perdón.

**Cambio concreto.** Una fila en los datos duros de B, que no revela el número de puestos del
carro de Laura pero le deja hacer la cuenta:

> | El grupo | **6 people · 2 cars** · yours is one of them |

## E7-4 · MEDIO · La cuenta de los 600,000 obliga a una aritmética de tres pasos dentro de una restricción

**Citado tal cual (ficha A):** «Van 600,000 pesos tuyos y **todavía no han vuelto todos**»,
junto a «| De vuelta en tu bolsillo | **400,000 pesos** (four people) |» y «| Lo que falta |
Kevin · **100,000 pesos** |».

**Por qué falla.** El plural «todos» sugiere varios deudores; el deudor es uno. Para cuadrar
las cifras el estudiante tiene que caer en que A también es uno de los seis y puso su propia
parte (400.000 + 100.000 de Kevin + 100.000 de A = 600.000). Es una inferencia gratuita
metida en el sitio donde menos margen hay para pensar. El que se pierde leyendo no habla, y el
que lee peor no es el que peor habla.

**Cambio concreto.** «Ya pusiste 600,000. Han vuelto 400,000 y falta el de Kevin.»

## E7-5 · MEDIO · Laura es la única mujer del escenario, no habla, y es lo que se puede quitar

**Citado tal cual (ficha A, restricción 3):**

> **No puedes sacar a Laura del viaje para hacer sitio.** Su carro y su gasolina son parte del
> plan desde el miércoles.

**Por qué falla.** En el escenario 7 hablan y tienen nombre cuatro hombres (Mateo, Kevin,
Sebastián, Andrés). La única mujer del grupo de viaje es la hermana, que no aparece, no dice
nada, y cuya presencia está redactada como el hueco que se podría liberar. Que ponga el carro
y la gasolina lo compensa a medias —tiene un aporte propio, no es decorado— pero la frase que
la nombra es literalmente «no puedes sacarla». Un escenario suelto no parece nada; el conjunto
sí (ver el párrafo final).

**Cambio concreto.** Dos, y los dos son gratis: (a) redactar la restricción sobre el cupo y no
sobre la persona — «Laura y su carro entran juntos: si sale ella, salen 4 puestos»; (b)
cambiar **Andrés → Andrea** en las dos fichas, con lo que el grupo deja de ser una excursión
de hombres y no cambia ni un dato ni un turno.

## E7-6 · LEVE · Nombres repetidos dentro del propio set

Laura es compañera de piso en el escenario 6 y hermana de Mateo en el 7; Dani es rol A en el 6
y Daniela es rol A en el 8. El estudiante que juega tres o cuatro de estos en la misma sesión
arrastra la persona anterior. **Cambio:** renombrar en el 7 (p. ej. Laura → Paola).

## E7-7 · LEVE · La carta mezcla inglés y español en la misma fila

> | Hora límite | **Saturday, 9:00 a.m.** — después se va al mercado y no vuelve a mirar el celular |

El resto de la ficha respeta la convención (etiqueta en español, valor en inglés). Aquí el
valor lleva media frase en español pegada. **Cambio:** partir en dos filas, o pasar la coletilla
a una línea suelta debajo de la tabla.

---

## Las dos preguntas del encargo, respondidas para el nº 7

**¿Aparece «no tengo con qué»?** Literalmente no; en sentido, **sí, y en los dos roles**:
E7-1 en el de A («no puedes poner más plata», sin decir que sí podría) y E7-2 en el de B («tu
sueldo entra el martes 25»). Son las dos únicas cosas de este escenario que hay que tocar sí o
sí. Con esas dos frases reescritas, el dinero del nº 7 vuelve a ser lo que el motor prometió:
una deuda pequeña entre amigos (100.000 pesos, tres semanas) y un sobrecosto de logística.

**¿Conocimiento local que la ficha no da?** No. Y conviene decirlo porque está bien resuelto:
la regla que sostiene el conflicto —que a un conjunto cerrado no entra quien no esté en la
lista de la portería con nombre completo y número de cédula, y que la lista la cambia la dueña
de la casa— **está escrita en las dos fichas**, en las restricciones, no dada por sabida. «Mesa
de los Santos» viene con su hora y media de camino. Así es como se hace.

---

# 8 · `cancel-the-gym-i-am-leaving`

## E8-1 · GRAVE · El «soporte» se exige cuatro veces y no se dice nunca qué es — Édison queda como obstáculo sin criterio

**Dónde:** ficha del rol B (Édison), objetivo punto 1, restricción 2 y «Lo que sabes tú y nadie
más».

**Citado tal cual:**

> 1. Un **soporte** que sirva para el formato de novedad.

> 2. **No puedes radicar ninguna novedad sin soporte.** Esa es la línea que no cruzas hoy, y
>    sabes por qué.

**Por qué falla.** Fase 1 sí lo definía: «El formato de novedad por viaje pide **constancia de
ausencia de la ciudad**». Esa línea **no está en ninguna de las cuatro fichas** (comprobado:
la palabra «constancia» no aparece en el archivo). Lo que le queda a Édison es pedir un papel
sin poder decir cuál. Y lo que le queda a Daniela es que le nieguen algo por un requisito que
nadie le sabe describir. Justo el rol que el encargo señalaba como el de más riesgo se
convierte en lo que la puerta 10 prohíbe: un empleado de servicio que funciona como muro y no
como persona con criterio. No por cómo está caracterizado —está bien caracterizado— sino
porque **no le dieron con qué ser útil**.

Efecto secundario: como Daniela tampoco tiene en sus datos duros ningún documento salvo el
correo de la embajada, que no puede dejar, el camino queda cerrado por vacío en vez de por
regla, y el «sin acuerdo» se vuelve arbitrario.

**Cambio concreto.** Una fila en los datos duros de B, y solo en los de B:

> | Soporte que sirve | a letter or a ticket **with her name and the dates she'll be away** ·
>   an email with no dates is not enough |

Y, si se quiere que ella tenga algo que ofrecer, una fila en los de A: `| Tu tiquete | bought,
August 30 |`. Con eso Édison puede decir que no **y decir qué sí**, que es su acto.

## E8-2 · GRAVE · Nada impide que Édison pregunte a dónde va, por qué, o si se lo van a dar

**Dónde:** ficha del rol B, «Tu objetivo», punto 2, y «Lo que no puedes hacer» (por omisión).

**Citado tal cual:**

> 2. Una **fecha de regreso** —de ella depende cuál de los caminos le sirve—.

**Por qué falla.** Fase 1 se comprometió por escrito: «El visado es el reloj, no el tema. Nadie
pregunta si se lo van a dar, nadie opina sobre migrar, nadie cuenta a dónde va ni por qué».
Ese compromiso está en el documento del diseñador y **no está en la ficha del jugador**. Las
tres restricciones de Édison son sobre cancelar, radicar y llamar a Yeimy; ninguna es sobre
qué no se pregunta. Y a un estudiante de A2 que necesita una fecha de regreso, preguntar
«where are you going?», «what visa is it?», «and if they say no?» le sale solo: es
exactamente el tipo de pregunta abierta que el resto del set le está entrenando a hacer.

Aquí es donde el escenario se cae del lado malo de la línea. **Tal como está escrito, el
escenario cae del lado útil** —el documento aparece una sola vez, como pantalla que se enseña
y no se entrega; el «no sabes cuándo vuelves» está anclado a los 10-15 días hábiles de entrega
del pasaporte y no a la incertidumbre del resultado; el debrief no pregunta nada sobre migrar—
**pero no está protegido**: depende de que el compañero no improvise la pregunta obvia. Y el
compañero que la va a hacer es otro alumno que a lo mejor tiene su propia cita el mes que
viene.

**Cambio concreto.** Un cuarto punto en «Lo que no puedes hacer» de Édison, redactado como lo
que es —criterio profesional, no censura—:

> 4. **No preguntas a dónde va, ni para qué, ni qué pasa si no se lo dan.** Al formato le
>    sirven las fechas, no el motivo. Preguntas *cuándo* vuelve, no *qué* va a hacer.

Y una línea equivalente en la de Daniela: «No tienes que contar a dónde vas ni por qué. Con las
fechas basta.»

## E8-3 · MEDIO · La ficha nunca dice que Daniela puede pagar, y luego le pone una tarjeta que rebota y un reporte a cobranzas

**Citado tal cual (ficha A):**

> **Tu tarjeta vence el 31 de agosto.** La de reposición llega en 8 días hábiles a tu dirección
> registrada, donde no vas a estar. El cobro del 5 de septiembre va a rebotar hagas lo que
> hagas.

**Citado tal cual (carta de B):**

> | Si el cobro del día 5 rebota | the system sends it to collections **automatically, on the 12th** |

**Por qué falla — y por qué no falla del todo.** El mecanismo está bien blindado: el cobro
rebota **por vencimiento de la tarjeta**, no por falta de fondos, y la ficha lo dice con esas
palabras. Eso salva la mayor parte. Lo que falta es la otra mitad de la protección de fase 1:
«no hay crisis económica. A paga 92.000 al mes y los puede pagar». Esa frase tampoco llegó a
la ficha. El resultado es un cuadro en el que una persona se va del país, deja una dirección
donde no estará, y una deuda que entra en cobranzas sola el día 12 — y nada, en ninguna de las
dos pantallas, dice que podría pagarla si quisiera. Para un alumno que se está yendo de
verdad y que lleva semanas haciendo la lista de lo que tiene que dejar cerrado, ese cuadro se
parece demasiado a su semana.

**Cambio concreto.** Una línea en la ficha de A, arriba de todo, en «Tu objetivo» o justo
debajo:

> Los 92,000 los puedes pagar sin problema. Lo que no quieres es pagar dos meses de un
> gimnasio al que no vas a poder ir.

Con eso el escenario se queda donde tiene que estar: incómodo (que es el ejercicio) y no
doloroso.

## E8-4 · MEDIO · Vocabulario administrativo en español, sin glosar, y sostiene el rol entero

«Radicar», «formato de novedad», «corte de novedades», «cartera», «retención». Son el andamio
del rol B y ninguno se explica. Un adulto que ha tramitado cosas en Colombia los reconoce; un
chico de 16 que viene por el ICFES, no necesariamente. Y es el mismo defecto que la puerta 10
persigue, solo que del revés: conocimiento que la ficha da por sabido y que separa a los
lectores por biografía, no por inglés.

**Cambio concreto.** Glosar una vez, en la primera aparición, sin párrafo aparte:
«**radicar** (dejar el trámite metido en el sistema, con número)», «**cartera** (el área que
cobra)», «**retención** (el área que autoriza bajas)».

## E8-5 · MEDIO · Un dato duro que existe solo para no usarse

> | Precio sin permanencia | **135,000 pesos a month** | (ficha A)

Contra la restricción 3 de la misma ficha: «**No puedes pedir que te devuelvan lo ya pagado ni
discutir el precio del plan.**» El dato más llamativo de la tabla es el único que tiene
prohibido tocar. **Cambio:** o se quita, o se reetiqueta como lo que sí puede usar —«Por qué
firmaste 3 meses: te salía 92,000 en vez de 135,000»— para que sirva de razón y no de trampa.

## E8-6 · LEVE · Un criterio de éxito que nadie puede comprobar

> - No prometiste nada que no puedas cumplir, **y la fila siguió avanzando**.

No hay fila. Los dos jugadores están en un salón o en una llamada. Es el único criterio de la
lista que no se puede verificar al terminar. **Cambio:** sustituir por algo observable —«no
te alargaste: la conversación no pasó de seis minutos»—.

## E8-7 · LEVE · Duván, el vendedor ausente, carga con la culpa

> **Duván**, el vendedor que te atendió el 13 de julio, te dijo de palabra que si te ibas del
> país te lo cancelaban. Duván ya no trabaja ahí y no tienes nada escrito.

No lo interpreta nadie, así que no incumple la regla del rol humillante. Pero es la segunda
vez en dos escenarios que el problema lo trae un trabajador ausente al que no se le da derecho
a réplica. Se anota para el conjunto, no para bloquear. **Cambio opcional:** que Édison pueda
decir en su ficha que a Duván «le pasó por prometer para vender», y no que se fue.

## E8-8 · LEVE · Siete criterios de éxito por rol, y tres de ellos son el cierre

Las listas «Lo consigues si» de las dos fichas tienen siete puntos, de los que tres repiten el
cierre. Al terminar una conversación de seis minutos nadie repasa siete. **Cambio:** marcar
los tres del cierre como «lo mínimo» y el resto como «además».

---

## Las dos preguntas del encargo, respondidas para el nº 8

**¿Aparece «no tengo con qué»?** No, y el mecanismo está protegido a propósito: el cobro
rebota por tarjeta vencida, dicho con esas palabras. Lo que falta es la afirmación positiva —
que puede pagar— y sin ella la suma de tarjeta vencida + cobranzas automáticas el día 12 deja
un residuo de precariedad que el motor había descartado. Ver E8-3. Es una línea de texto.

**¿De qué lado cae el visado?** **Del lado útil, tal como está escrito.** Es la conversación
real que un alumno que se va va a tener: cancelar servicios antes de irse. No se juega a que
le nieguen la visa, nadie opina sobre migrar, no se dice a dónde va, y el trámite no le sale
mal: le sale **antes**, que es un problema de calendario, no de destino. El «no sabes cuándo
vuelves» está atado a un plazo administrativo publicado (10-15 días hábiles), no a una duda
sobre el resultado.

Pero cae ahí **por buena redacción, no por diseño**: nada en la ficha de Édison le impide
hacer la pregunta que lo mueve de sitio. E8-2 es lo que hay que arreglar para que el escenario
siga del lado útil también cuando la pareja improvisa. Con esa restricción añadida, el nº 8
pasa sin reservas por la puerta 10 en este punto.

**¿Queda alguno de los cuatro roles como obstáculo sin criterio?** Édison está bien construido
—tiene tres cosas que necesita, una razón propia y costosa para su línea roja (la llamada de
atención del mes pasado), la llave de una puerta que ella no sabía que existía, y un debrief
que le devuelve la agencia: «¿cuáles de esos "no" eran suyos y cuáles no?»— pero **le falta la
munición** para ejercer ese criterio: sin saber qué soporte sirve, todo lo que puede hacer es
negar. E8-1 lo arregla. Con esa fila, es el mejor rol de servicio de los ocho.

---

## El conjunto — lo que ninguno de los ocho enseña por separado

Cuatro cosas se ven solo poniendo los ocho encima de la mesa, y tres de ellas no son culpa de
estos dos escenarios, pero se cierran aquí porque el 7 y el 8 son los últimos.

**1. La autoridad que decide de verdad es siempre una mujer, y siempre está fuera de la
escena.** Doña Nubia cierra la lista de la portería y pone el precio; Yeimy autoriza o no
autoriza. Ninguna de las dos aparece: llegan por nota de voz y por mensaje, a las 7:41 y a las
6:52 de la tarde, y las dos vienen redactadas en corto y con un horario que no encaja con el
de nadie —«de ahí no reviso más el celular», «no autorizo cancelaciones por viaje, ni una».
Mientras tanto, la autoridad que sí se sienta en la mesa a hablar es masculina: Don Wilson en
el 5, Édison en el 8. El patrón no es que haya mujeres con poder —las hay, y es bueno— sino
que su poder se ejerce por escrito, tarde, en ausencia y sin posibilidad de réplica, mientras
que el poder que se puede negociar cara a cara lo tiene un hombre. Ninguno de los dos
escenarios es sesgado por su cuenta. Los dos juntos, y con el 5 al lado, dibujan una regla.
**Se arregla barato:** que doña Nubia conteste la llamada en el 7, o que Yeimy sea quien
aparezca en escena en algún escenario futuro del set.

**2. Del reparto de mujeres nombradas, ninguna habla.** En el 7: Laura (no habla, y es el cupo
que se podría quitar) y doña Nubia (no habla). En el 8: Yeimy (no habla), Yurany (no habla, y
su función es ser la persona a la que hay que convencer de asumir un gasto que ya rechazó
por precio), y Daniela, que sí habla y es la única de las cinco — y es la que pierde. Los
hombres nombrados en los dos escenarios son cinco y hablan dos, pero los tres que no hablan
(Sebastián, Andrés, Duván) tienen razones, planes y responsabilidad propia. Con el cambio de
E7-5 (Andrés → Andrea) y el de E7-3 el desequilibrio baja a ruido.

**3. En los dos escenarios el que dice que no está repitiendo la norma de otro.** Mateo se
escuda en la lista de doña Nubia hasta que la carta del turno 4 se lo quita; Édison se escuda
en «déjeme consultar» hasta que el mensaje de Yeimy se lo quita. Es la misma máquina dos veces
seguidas, y es una máquina buena —obliga a sostener el no en primera persona, que es el acto
de habla que se está enseñando— pero el estudiante que juegue el 7 y el 8 seguidos va a
reconocerla y a esperar la carta. Vale la pena separarlos en el orden de la secuencia, o que
una de las dos cartas **abra** en vez de cerrar.

**4. Las fichas del set no se leen igual entre sí, y eso se paga en tiempo de lectura, no en
inglés.** Los escenarios 1-3 usan roles sin nombre («El que vende la bicicleta») y encabezados
«Restricciones / Criterios de éxito / Cierre»; los 4-6 usan «Tus restricciones / Lo haces bien
si / Cómo saben que terminaron»; los 7-8 usan «Lo que no puedes hacer / Lo consigues si / Cómo
termina» y personajes con nombre propio y apellido de rol. Son tres plantillas para el mismo
producto. El alumno que juega cuatro escenarios en una tarde vuelve a aprender la disposición
cada vez, y el que se pierde leyendo no habla. Los 7-8 son, de los tres formatos, el mejor:
«Lo que no puedes hacer» y «Lo consigues si» son las etiquetas más claras del set. **La
recomendación es unificar hacia estas dos fichas, no desde ellas.**

Un apunte a favor, para que no se pierda entre los hallazgos: los dos escenarios hacen bien lo
más difícil de esta puerta, que es dar en la ficha el conocimiento local del que depende el
conflicto. La regla de la portería (lista con nombre y cédula, la cambia la dueña) está escrita
en las dos fichas del 7; la permanencia, la congelación y la cesión están escritas en las del
8. Nada se resuelve aquí por haber vivido en un sitio concreto. El defecto de estos dos
documentos no es lo que dan por sabido: es lo que el diseñador protegió en fase 1 y el
redactor no copió en fase 2 — el «puede pagar» de Mateo, el «puede pagar» de Daniela, el
«constancia de ausencia de la ciudad» de Édison y el «nadie pregunta a dónde va». Cuatro
frases. Las cuatro estaban escritas. Ninguna llegó a la pantalla.
