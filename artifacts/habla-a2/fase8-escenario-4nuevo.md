# Habla acompañada — inglés A2 · Escenario 4 (nuevo) · `the-pot-is-already-on`

Motor del escenario que sustituye a `a-charge-i-did-not-make`. La fila que tiene que ocupar está
calculada en `artifacts/habla-a2/fase8-hueco-nuevo-4.md`; aquí se llena. Norma:
`docs/habla-acompanado-blueprint.md` §2 (anatomía), §3 (las seis maneras de morir **y el reverso
del atajista**), §4 (nivel), §9 (la carta), §11 (la ficha en inglés).

**Qué es esto y qué no.** Es el motor: qué quiere cada uno, qué sabe cada uno, dónde está la zona
de acuerdo, qué carta entra y cuándo, y cómo saben que terminó. **No es la ficha.** Los exponentes
los calibra `habla-calibrador-nivel` y las dos fichas en inglés las redacta `habla-fichas-de-rol`
contra `fase7-modelo-ficha-en.md`. Lo que sí trae, porque sin ello la fila no es verificable: el
**mapa de los 18 turnos** que produce las tres cuotas de actos, y el **encargo de vocabulario** de
20 entradas con cero de papel y cero de dinero.

---

## 0 · El bloqueo previo, resuelto: `insistir` en A2

§4 pone `insistir` en la fila de B1 y §5 exige que ningún acto declarado baje del 3 %. Sin cerrar
esa contradicción el escenario no se puede calibrar, porque cuatro de sus dieciocho turnos son
`insistir`. **Se toma la salida (a) del informe de fase 8: declarar la versión A2 del acto.** Texto
propuesto para que `habla-blueprint` lo pegue en §4, y que este escenario da por vigente:

> **`insistir` en A2** — volver a pedir lo mismo **con una razón nueva**, después de un «no», y
> añadir **una condición simple**. Tres formas, y ninguna más:
> 1. repetir la petición cambiando el porqué — `connectors-a2` (*because*, *so*, *but*);
> 2. volver a pedir con un plazo — `have-to-must` (*I have to know before twelve*);
> 3. poner la condición — `first-conditional` (*If you don't tell me, I…*).
>
> **Sigue prohibido en A2:** el atenuador largo (*I know it's a lot to ask, but if it weren't
> for…*), el reproche indirecto y la ironía. Ésos son B1 y ahí se quedan.
>
> **Y una regla de dosis que sale de este escenario:** `insistir` sin un reloj físico en escena se
> vuelve grosero; con un reloj, es cortés. Un escenario que declare `insistir` y no tenga algo que
> se enfríe, se dañe o se vaya mientras hablan, no lo está declarando: lo está decorando.

De paso cierra la misma contradicción que ya arrastran `poner-limite` (10 turnos producidos en el
set) y `negociar` (5), los dos etiquetados B1 en §4 y los dos publicándose desde la fase 1.

**Dependencia declarada:** si `habla-blueprint` escoge la salida (b) —borrar el turno de `insistir`
de la ficha 1B— este escenario **no cambia**: sus cuatro turnos siguen en pie y `insistir` pasa de
0 a 4 de 144. Lo que cambia es la aritmética del suelo, no el motor.

---

## 1 · La fila que ocupa

| campo | valor | lo que produce en el conjunto |
|---|---|---|
| actos declarados | `recomendar` · `insistir` · `conceder-con-condicion` | `insistir` 0,8 % → **3,4 %** · `recomendar` 3,1 % → **4,8 %** · `conceder` 3,1 % → **4,1 %** |
| poder | **`a>b`** — manda A | `a>b` 4/8 · **50,0 %** |
| quién arranca | **A** | A 4/8 · **50,0 %** |
| desenlace | **`acuerdo-parcial`** | acuerdo 3 · parcial 3 · aplazado 1 · sin-acuerdo 1 |
| quién causa el problema | **ni A ni B** — el grupo, fuera de escena | culpa de A 3/8 · **37,5 %** |
| escenografía | **patio de una casa, Girón, domingo** | aula 0/8 · mostrador 3/8 · **37,5 %** · martes 4/8 · Cabecera 4/8 |
| género | **los dos roles en escena, hombres; manda el hombre** | mandos con nombre **2 M · 2 H · 50,0 %** *(exige el punto 11 del acta en su variante nº 8)* |
| registro | **informal, entre iguales que se ven todos los domingos** | formal 3 · informal 5 |
| minutos · turnos | **7 minutos · 9 turnos por rol** (18 globales) | dentro del 5-8 min · 6-9 turnos de §4 |
| vocabulario | **20 entradas · 0 de papel · 0 de dinero** | papel+dinero 52,5 % → **39,2 %** |
| carta | rol **A**, **turno global 5**, **tarea nueva** | dentro de la ventana 3-6 de la puerta 6 |

```
id: 4 · slug: 'the-pot-is-already-on' · sequence: 4 · level: 'a2' · language: 'ingles'
title: 'La olla ya está prendida' · titleTarget: 'The pot is already on'
setting: 'Sunday, 11:20 a.m. The back patio of a house in Girón. Wood fire, big pot, on since nine.'
speechActs: ['recomendar', 'insistir', 'conceder-con-condicion']
power: 'a>b' · initiator: 'a' · outcome: 'acuerdo-parcial'
minutes: 7 · turnsTarget: 9   // por rol
twist: { afterTurn: 5, toRole: 'a', card: <la mamá, a la una, con cuatro más> }
```

**Calendario.** Domingo **20 de septiembre de 2026**, coherente con el resto del set (martes 1,
sábado 5, martes 8, sábado 12, domingo 13, viernes 18, sábado 19). Ningún escenario del set ocurre
en domingo ni en Girón.

---

## 2 · Situación

Domingo 20 de septiembre, 11:20 de la mañana, el patio de atrás de una casa en Girón. **Fabián**
tiene un sancocho de gallina al fuego de leña desde las nueve. El plan, hablado el viernes, era
comer aquí a la una y bajar al río por la tarde.

Esta mañana **el grupo cambió el plan por su cuenta**: a las diez, por el calor, se fueron todos
al río en el carro de Marcela y escribieron al chat que la comida se llevara para allá. **Duván**
es el único que se quedó: vino temprano a ayudar, y a las diez le dijo a Fabián que a la una
estaban todos de vuelta.

A las once y once llegó otro mensaje al chat que Fabián no ha visto. Duván tampoco lo ha
enseñado. En veinte minutos pasa Édgar, el vecino, en la moto, y ésa es la única forma de llegar
al río antes de la tarde.

---

## 3 · Lo que quiere cada uno y por qué chocan

- **Fabián (A) quiere** que el grupo coma aquí y que el río sea después: necesita saber **para
  cuántos** antes de que la moto arranque, porque a las doce entran la yuca y el plátano y la
  **segunda gallina** —partida y fuera de la nevera desde las siete— o entra a la olla o se daña
  hoy. Manda porque la casa, el fuego y la comida son suyos. Es el único poder de este tipo en el
  set: **el que manda es el que está dando de comer**, no el que está detrás de un mostrador.
- **Duván (B) quiere** salir a las 11:40 con la moto de Édgar y **no llegar con las manos
  vacías**. Él fue quien escribió al chat que llevaba el almuerzo. Su idea es que Fabián apague,
  lo eche en algo y se lo lleve.
- **Chocan en dos cosas a la vez**, y por eso no se acaba en tres turnos: **la comida** —lo que
  hay en la olla no es transportable ni está listo, y lo que sí está listo no es de nadie— y **la
  hora** —el reloj de Duván es las 11:40 y el de Fabián son las 12:00—. Si solo fuera la comida,
  Fabián dice que no y se acabó. Si solo fuera la hora, se espera media hora y se acabó. Con las
  dos, cada uno puede ceder en una para no ceder en la otra.

**El que manda también necesita algo, y no puede conseguirlo solo.** Fabián no puede salir del
patio: el fuego es de leña y hay que mirarlo cada veinte minutos. No puede ir al río, no puede ir
a la esquina, y no tiene el número de la mitad del grupo —los invitó Duván—. Lo único que le sirve
está dentro de la cabeza de Duván: **cuántos y a qué hora**. Y es exactamente el dato que Duván no
puede dar sin desdecirse de lo que dijo a las diez.

---

## 4 · Lo que sabe Fabián y Duván no

1. **Falta más de lo que huele.** La yuca y el plátano entran a las **12:00** y la olla está lista
   a la **1:00**, no antes. A las 11:40 lo que hay es caldo y gallina: no es un almuerzo para seis.
2. **La segunda gallina lleva fuera de la nevera desde las siete.** Está partida. Si entra antes
   de las doce, alcanza para doce; si no entra, se daña esta noche. **Y no cabe de vuelta en la
   nevera, porque ahí está el otro asunto.**
3. **En la nevera hay la comida del sábado** —arroz y pollo, en un tarro— que son sus almuerzos
   del lunes y el martes. Entre semana trabaja y no cocina. No lo ha ofrecido y no piensa
   ofrecerlo por nada.
4. **No se ha sentado desde las seis de la mañana y no ha desayunado.** No lo ha dicho.

**Restricciones de Fabián** (lo que no puede hacer, y por qué):
1. **La olla no se mueve y el fuego no se apaga.** No es terquedad: es yuca cruda y es una olla
   caliente. Nada sale de este patio hirviendo.
2. **No decir que el grupo lo hizo mal.** Los necesita aquí a la una y el que tiene que pedírselo
   es Duván; nadie va a buscar a gente de la que acaba de oír hablar mal.
3. **Nada sale de la nevera hasta tener un número y un nombre.** Poner **dos maneras sobre la
   mesa antes** de conseguir un sí.

## 5 · Lo que sabe Duván y Fabián no

1. **El carro de Marcela no vuelve.** A las 11:11 escribió al chat que se queda en el río hasta
   las cuatro. Duván le dijo a Fabián a las diez que a la una estaban todos aquí, y ese mensaje
   no lo ha enseñado.
2. **Se va en la moto de Édgar a las 11:40.** Un pasajero, y entre los pies no cabe nada grande.
   Fabián cree que se queda a ayudar hasta la una.
3. **Los seis del río no han comido desde las siete** y allá no venden nada los domingos.
   **Ésta es su carta más fuerte y es la que juega en su contra**: si la suelta temprano, Fabián
   contesta lo obvio —«que se devuelvan»— y Duván pierde el argumento con el que entró.

**Restricciones de Duván:**
1. **No llegar con las manos vacías.** Él escribió que llevaba el almuerzo.
2. **No corregir lo de las diez hasta no tener algo en las manos.** La verdad es lo único que
   tiene para dar, y se da una sola vez.
3. **En la moto solo cabe lo que quepa entre los pies.** Aunque la olla estuviera lista, no iría.

**Dato que solo sale preguntando abierto** (cura del ping-pong, §3.3): cuánto falta de verdad y
qué se puede llevar frío. Ninguno de los dos lo puede responder con un sí o un no.

---

## 6 · La zona de acuerdo

Tres salidas que los dos firmarían. **En las tres la olla se queda donde está** —eso es física, no
negociación—, y ninguna es partir la diferencia. Cada una le cuesta algo distinto a cada uno.

**Salida 1 — «Sale la nevera, se queda la olla. Todos comen aquí a las tres.»**
Duván se va a las 11:40 con la comida del sábado en la nevera pequeña, que sí cabe entre los pies.
Los seis comen algo a las doce; a las dos empiezan a caminar o Édgar sube dos en la moto, y a las
tres están todos en el patio. Fabián sirve a la una y vuelve a servir a las tres.
*Le cuesta a Fabián:* sus almuerzos de la semana, y sostener la olla dos horas a fuego bajo.
*Le cuesta a Duván:* llegar con comida fría y ser el que le dice a seis personas que el regreso es
a pie y al sol.
*Efecto lateral que la pareja puede encontrar sola:* con el tarro fuera, la nevera queda libre y la
segunda gallina se salva aunque no entre a la olla.

**Salida 2 — «Duván no va. La comida sí.»**
Édgar se lleva el tarro al río y vuelve; Duván se queda, cuida el fuego y recibe a la una. Los seis
comen a las doce y se devuelven a las cuatro con Marcela: sancocho recalentado.
*Le cuesta a Fabián:* servir lo bueno a la una y **recalentar** a las cuatro, que no es lo mismo y
él lo sabe.
*Le cuesta a Duván:* se queda sin río, sin domingo, y tiene que explicarlo por chat en vez de en
persona.

**Salida 3 — «No sale nada, pero la hora se mueve.»**
Duván se va a las 11:40 sin nada, pero con una hora firme y un encargo: los seis salen del agua a
la 1:30 y caminan; se come a las 2:30. La segunda gallina entra a las doce, para dieciséis.
*Le cuesta a Fabián:* dieciséis personas, dos tandas y una sola olla estirada.
*Le cuesta a Duván:* llegar a un río donde nadie ha comido desde las siete y decir que no hay nada
hasta las 2:30 — y fue su mensaje de las diez el que los mandó allá.

**Ninguna es evidente**, y se nota en que la primera que se le ocurre a cualquiera —apagar y
llevar— **no está en la lista**, porque no existe.

---

## 7 · La complicación

**Turno global 5 · al rol A · tarea nueva.**

> Llama la mamá de Fabián: viene a la una **con cuatro personas más** —su hermana y tres de la
> iglesia— y **ya salió**. No trae nada. Le dijeron que aquí había almuerzo.

**Qué le hace al escenario.** No le quita una palanca a Fabián: le pone un segundo reloj y le
**rompe una cuenta que él mismo dijo en voz alta** en los cuatro primeros turnos («hay para doce y
no hay nadie»). Desde el turno 5:

- ya no puede pedir que vuelvan **todos a la una**: a la una hay cinco personas más y no caben en
  una sola tanda;
- necesita **algo que a las 11:20 no necesitaba**: alguien en el portón a la una, y él no puede
  soltar el fuego. El único al alcance es Duván, que estaba a punto de irse;
- y el número que le pedía a Duván le hace **más** falta que antes, no menos.

**Qué pasa si la mira antes de tiempo:** nada bueno, y ése es el punto de §9. La carta no le da un
argumento, le da una obligación. Si la lee en el turno 1, tiene que abrir su posición sabiendo que
no se sostiene, y sigue sin el dato de Duván. **Adelantarla empeora su apertura y no le ahorra un
solo turno.**

---

## 8 · El cierre

**Se termina cuando cada uno ha dicho sus tres cosas, en voz alta, y el otro no se las ha dicho por
él.** Están escritas igual en las dos pantallas.

**Fabián dice** (nadie puede decir esto por él):
1. qué entra a la olla a las doce, y para cuántos;
2. qué sale de este patio ahora y qué no;
3. qué necesita a la una que no puede hacer con el fuego prendido.

**Duván dice** (nadie puede decir esto por él):
1. cuántos vuelven de verdad, y antes de qué hora — no lo que dijo a las diez;
2. cómo llegan, sin el carro de Marcela;
3. qué les dice a los seis del río, y antes de qué hora se lo dice.

**Juntos, una sola vez:** la hora de la segunda tanda y quién está en el portón cuando llegue el
primer grupo.

**Y una cosa queda abierta a propósito** —se dice en voz alta, con un nombre y una hora—: quién no
va a comer con los demás, y quién lo arregla.

**Tres reglas del cierre, y son las que lo hacen distinto:**
- **Nadie repite lo que dijo el otro.** Si dices la línea del otro, no cuenta: la vuelve a decir él.
- **Nadie asiente.** «Listo», «claro» y «hágale» no son ninguna de las seis líneas.
- **Nadie anota nada y nadie dicta nada.** Esto es un patio. No hay número que leer ni número que
  confirmar.

---

## 9 · El mapa de los 18 turnos

No es el guion —los exponentes son de `habla-calibrador-nivel`—: es la prueba de que las tres
cuotas de actos **se producen** y no se declaran. Reproduce exactamente el reparto de
`fase8-hueco-nuevo-4.md` §4.

| # | rol | acto | qué mueve |
|---|---|---|---|
| 1 | A | `pedir-aclaración` | cuántos platos a la una — la gallina entra a las doce |
| 2 | B | `dar-dato/razón` | se fueron a las diez por el calor · **y él se va a las 11:40** |
| 3 | A | `dar-dato/razón` | la yuca entra a las doce · listo a la una · un sancocho no viaja |
| 4 | B | `recomendar` | le aconseja a Fabián sobre **su propia olla**: bájele, tápela, véngase |
| 5 | A | `insistir` **+ carta** | vuelve a preguntar con una razón nueva: la mamá, a la una, con cuatro |
| 6 | B | `quejarse` | lleva aquí desde las nueve y le toca arreglar un plan que no cambió |
| 7 | A | `recomendar` | le aconseja a Duván qué decirles: el sol de las dos, el agua, las tres |
| 8 | B | `pedir-aclaración` | qué está listo de verdad y cuánto aguanta frío en una nevera |
| 9 | A | `insistir` | otra vez, razón nueva: la gallina lleva fuera desde las siete |
| 10 | B | `insistir` | otra vez, razón nueva y condición: sin nada en las manos, no va |
| 11 | A | `dar-dato/razón` | existe el tarro del sábado — y son sus almuerzos |
| 12 | B | `quejarse` | le toca ser el mensajero de los dos lados |
| 13 | A | `insistir` | razón nueva y condición simple: sin número antes de las doce, gallina para cuatro |
| 14 | B | `recomendar` | propone quién viene a la una y quién a las tres |
| 15 | A | `proponer-alternativa` | las dos tandas, o el tarro ahora y todos a las tres |
| 16 | B | `rechazar` | tumba una de las dos — **y aquí, lo más tarde, sale el carro de Marcela** |
| 17 | A | `conceder-con-condición` | sale el tarro, con condición |
| 18 | B | `conceder-con-condición` | vuelve con los que pueda, con condición |

**Cuadre:** A = `dar-dato` 2 · `recomendar` 1 · `insistir` 3 · `pedir-aclaración` 1 ·
`proponer-alternativa` 1 · `conceder` 1 = **9**. B = `rechazar` 1 · `quejarse` 2 · `dar-dato` 1 ·
`pedir-aclaración` 1 · `recomendar` 2 · `insistir` 1 · `conceder` 1 = **9**.

**Y `recomendar` sale en las dos direcciones** (A 1 · B 2), que es lo que rompe el 4/0 del set de
hoy: Duván aconseja sobre la olla y Fabián aconseja sobre el grupo. Ninguno aconseja sobre lo suyo.

---

## 10 · Encargo de vocabulario: 20 entradas, cero papel, cero dinero

Para `habla-fichas-de-rol` y `habla-calibrador-nivel`. Diez por rol, glosa en inglés sencillo
(§11), columna `here` como **nota de propósito, nunca ejemplo**. Ninguna entrada es de trámite ni
de dinero; ninguna se repite en los otros siete escenarios. Comprobar `to give someone a ride`,
`a spot` y `to be short`, que ya viven en el escenario 7.

**Fabián (A) — cocina y fuego, campo con 0 de 158 entradas en el set:**
`to simmer` · `firewood` · `raw` · `a lid` · `to stir` · `to go bad` · `a serving` · `leftovers` ·
`to reheat` · `to keep an eye on something`

**Duván (B) — transporte, ocio y cuerpo, los otros tres campos con 0:**
`to be starving` · `a cooler` · `to head out` · `to swing by` · `to show up` · `empty-handed` ·
`to pick someone up` · `to save someone a plate` · `the shade` · `to cool off`

**Datos duros para las dos fichas** (en nota, jamás en frase):

| | |
|---|---|
| Ahora | domingo 20 de septiembre, 11:20 a.m. |
| La olla | gallina, al fuego desde las 9:00 |
| A las 12:00 | entran yuca y plátano · listo a la **1:00** |
| La segunda gallina | partida, fuera de la nevera desde las 7:00 · entra antes de las 12 o se daña |
| La nevera | ocupada con el tarro del sábado (arroz y pollo) |
| Édgar | sale 11:40 en moto · vuelve ~12:40 · un pasajero · nada grande |
| El carro de Marcela | en el río, no se mueve hasta las 4:00 |
| El río | 15 minutos en moto · 40 caminando, sin sombra |
| En el río | seis personas desde las 10:00 · sin comer desde las 7:00 · no venden nada |
| La mamá | 1:00, con cuatro más *(carta)* |

**Anclas de gramática** (`grammarReferences`, contra `src/data/grammar/ingles/a2/`):

| slug | título | por qué aquí |
|---|---|---|
| `first-conditional` | El Primer Condicional en Inglés A2 | las dos concesiones con condición y el tercer `insistir` |
| `have-to-must` | Have to y Must en Inglés A2 | las obligaciones físicas: alguien tiene que quedarse con el fuego |
| `connectors-a2` | Conectores en Inglés A2 | la razón nueva de cada `insistir` — *because*, *so*, *but* |
| `should-advice` | Should y Shouldn't en Inglés A2 | los tres `recomendar`, en las dos direcciones |
| `quantifiers` | Cuantificadores en Inglés A2 | el número que decide la gallina: *how many*, *enough*, *too much* |

---

## 11 · Las tres cosas que este escenario trae y el resto del set no

1. **Sin papeles, sin mostrador y sin números que dictar.** No hay factura, ni cita, ni contrato,
   ni ticket, ni cédula. El cierre son seis compromisos hablados y una hora; **no hay nada que
   repetir en voz alta para confirmar**, porque no hay nada escrito. Es el primer cierre del set
   que no se puede pasar leyendo.
2. **Campos que el set no toca.** Comida y fuego en A; transporte, ocio y hambre en B. De las 158
   entradas del set actual, **cero** son de comer y **cero** de moverse. Las veinte se gastan
   enteras ahí.
3. **El cierre reparte quién dice qué.** Tres líneas de cada uno, y las tres de Duván son las que
   solo él puede producir: el número real, cómo llegan sin carro y qué les dice a los seis. **Un
   jugador callado no consigue su objetivo asintiendo**, porque su objetivo es decir tres cosas
   que nadie puede decir por él. Es el ataque de diseño al punto 8 del acta; medirlo es de
   `habla-simulador-parejas`, no de aquí.

---

## 12 · La prueba que decide

### Los tres primeros turnos

> **A1 — Fabián:** la gallina entra a las doce. ¿Cuántos son a la una? Y saca la mesa grande.
> **B1 — Duván:** no puede dar el número. Dice lo que sí puede: se fueron a las diez por el calor,
> están esperando, **y él se va a las 11:40**.
> **A2 — Fabián:** que no. Y la razón física: la yuca entra a las doce, esto está a la una, y un
> sancocho no viaja.

**Nadie puede decir «sí, claro» en el primero.** Duván no puede aceptar la pregunta de Fabián
—responderla con la verdad es desdecirse de lo que dijo a las diez, y responderla con mentira le
cierra la única moneda que tiene—. Fabián no puede aceptar lo que pide Duván: es yuca cruda y una
olla de veinte litros en una moto.

### El atajista, por los dos lados

**Si Duván se va a las 11:40 sin acuerdo:** llega a un río donde seis personas llevan cuatro horas
sin comer, donde no venden nada y de donde no se sale hasta las cuatro — y fue su mensaje el que
los mandó allá. Y deja a Fabián solo con comida para doce en la casa donde el grupo se reúne todos
los domingos.

**Si Fabián dice «que vengan a la una o no hay» y se da la vuelta:** se queda con doce platos que
nadie come, con una gallina que se daña esta noche porque la nevera está ocupada, **y con su mamá y
cuatro personas llegando a la una a una casa donde no hay a quién presentarles** — y sin nadie en
el portón, porque no puede soltar el fuego.

**Los dos pierden si se van. Ninguno puede ganar en dos turnos sin romper una regla.** Vivo.

---

## 13 · Lo que este escenario **no** arregla

Se dice para que nadie lo dé por cerrado:

- **La contradicción §10 / §11 sobre 6-9 o 6-10 exponentes.** Se escribe con **9** y no toma
  partido. Es del punto 15 del acta.
- **La nº 1, `a>b` o `igual`.** Con este escenario dentro el poder queda en 4/8, y aguanta la
  reetiqueta de la nº 1 sin caer del umbral. **No la resuelve**: sigue siendo del guardián.
- **La puerta 5 en los otros siete.** Aquí el callado tiene que producir; en los otros siete, no.
- **El punto 11 del acta.** Este escenario obliga a tomarlo en su variante **nº 8** (mando
  masculino), no en la de la nº 5. Con las dos, los mandos con nombre quedan 2 M · 2 H.
- **Equidad sobre las fichas en inglés.** Nunca se ha pasado. Éste entra en esa primera pasada.

Y una nota de equidad que se deja escrita para quien audite: **en escena hay dos hombres y ninguno
es el culpable.** La causa es el grupo —seis personas, mixto, decidiendo en un chat, sin un nombre
detrás—. Quienes deciden fuera de escena son Marcela (no vuelve, y no es un reproche: es un
hecho), Édgar (la moto) y la mamá (la carta). Ni el poder ni la culpa quedan concentrados en un
género, y el escenario **no** arregla el 100 % de mandos femeninos poniendo a una mujer a causar
el problema, que es el error del que avisa §5.

---

## 14 · Debrief — las dos pantallas, en español

1. Duván dijo a las diez algo que a las once ya no era verdad. ¿En qué turno lo corrigió? ¿Qué le
   costó decirlo — y qué le habría costado no decirlo nunca?
2. Aquí no se firma nada y no se anota nada: el acuerdo solo existe si los dos lo dijeron. Cada uno
   tenía tres frases que solo podía decir él. ¿Se dijeron las seis? ¿Alguna la dijo el otro por él?
3. Fabián manda porque la casa y la comida son suyas, no porque tenga un cargo. ¿En qué momento se
   notó? ¿Qué le tocó hacer a la lengua aquí que en un mostrador lo habría hecho el uniforme?
