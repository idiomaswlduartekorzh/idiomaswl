# Escenario 5 · `late-again-on-monday` — simulación sobre el TEXTO FINAL (fase 11)

Cinco conversaciones completas, turno a turno, contra el texto que iría a producción:
`artifacts/habla-a2/fase7-fichas-5-late-again-on-monday.md` — es decir, **después** de la pasada
quirúrgica del 22 ago (fase 9), del reparto de género y de la edición 6 de
`fase11-ultimas-lineas.md` (línea 30 de ROLE A). Caja común:
`artifacts/habla-a2/caja-de-herramientas-a2.md`. Motor: `fase4-escenarios-4-6.md` §5.

Sustituye como medición vigente a `fase7-simulacion-5.md`, que se jugó contra una ficha que
declaraba **9-10 min y 16-23 turnos por rol** y llevaba el cierre largo. La ficha de hoy declara
**8 min y 6-9 turnos por rol**, y el cierre ha perdido tres piezas (la pregunta
`And who else pays for this?`, el espejo doble de precio y la relectura del renglón). **Todas las
comparaciones «antes / ahora» van contra aquella tirada.**

**Aquí no se arregla nada.** Se juega, se cuenta y se diagnostica.

---

## Las tres reglas de medición de esta ronda

### 1 · El handicap ALTERNA de lado, y va declarado

En la ronda anterior el callado y el atajista fueron **los dos rol A**, con este argumento
escrito: «el atajista y el callado tienen que ser A». A es el que se disculpa y el que tiene que
llenar el renglón: es **el motor de la conversación**. Amordazar al motor hunde el reparto y el
resultado parece un defecto del escenario. Esta ronda lo invierte donde más se nota.

| pareja | rol A · Camilo | rol B · doña Amparo | **quién lleva el handicap** | para qué está |
|---|---|---|---|---|
| 1 | sólido | sólido | **ninguno** | el techo con el cierre recortado |
| 2 | sólido | **flojo, y decide leer** | **B — el que concede** | ¿funciona salir del paso leyendo la ficha? |
| 3 | flojo | flojo | **ninguno (perfil parejo)** | el caso real de dos compañeros de clase |
| 4 | sólido | **callado** | **B — el que concede** | ¿puede A llevar la conversación? ¿produce ella sus piezas? |
| 5 | **atajista** | sólido | **A — el que pide** | ¿aguantan las restricciones? |

**Declarado:** de los tres handicaps, **dos caen del lado que concede (B) y uno del lado que
pide (A)**. Es la inversión exacta de la ronda anterior (3 de 3 en A). El atajista se queda en A
a propósito y es la única elección que no alterna: las tres restricciones que hay que poner a
prueba —no cerrar con promesa, no inventar excusa, no explicar los sábados— son **de A**, y un
atajista B no prueba ninguna de ellas porque B ya viene a cerrar rápido.

### 2 · UN SOLO CONTADOR de palabras, y es éste

> **Se cuenta toda palabra que sale por la boca, en cualquier idioma, incluidas las que el
> jugador lee de su ficha (`[L]`), incluidas repeticiones, muletillas (`Hmm`, `OK`, `Ehh`) y
> nombres propios. NO se cuentan las acotaciones escénicas entre paréntesis ni las marcas de
> turno. Las horas y las fechas con cifra (`6:40`, `September 14`) cuentan como los tokens que
> se pronuncian.**

Contado con script sobre el propio archivo, no a ojo:
`artifacts/habla-a2/fase11-scripts/contar-palabras-5.mjs`. **El mismo criterio en las cinco
parejas.** Donde importa —la pareja 2, la lectora— se dice aparte cuántas de sus palabras fueron
leídas, pero **no se descuentan**: descontarlas sería un segundo criterio.

### 3 · La puerta del 40 % se juzga SOLO sobre perfil parejo

Se juzga sobre la **1 (sólido+sólido)** y la **3 (flojo+flojo)**. En la 2 y la 5 la cifra está
contaminada por el handicap; en la 4 no significa nada: el perfil del callado **es** producir
tres palabras por turno. Al callado se le mide otra cosa, en su propio apartado: **si produjo las
piezas que solo él tiene**.

---

## Cómo se leen estas transcripciones

**Regla dura.** Cada jugador ve **solo su ficha**. Ningún jugador usa un dato de la ficha del
otro hasta que se lo dicen en voz alta. Los tres papeles, Alba, el formato de novedades, los dos
jueves, la capacitación y la fecha de revisión **no existen para A** hasta que B los pronuncia.
La escuela de fútbol, la vecina del 3, la guardería de Girón, la obra, el bus de las 5:50 y los
80.000 del bono **no existen para B** hasta que A los pronuncia.

**Hubo una filtración, y no es de ningún jugador: es de la ficha.** Está marcada `⚠ FILTRACIÓN DE
FICHA` donde muerde (pareja 5, turno B3) y diagnosticada en el apartado 4.

### Marcas de turno

| Marca | Qué significa |
|---|---|
| `[F]` | miró el andamiaje de su ficha (`Say it here`, `Your toolkit`) para producir el turno |
| `[D]` | miró la tabla `Facts` para leer una cifra |
| `[V]` | tomó una palabra del bloque de vocabulario de su ficha |
| `[L]` | **leyó en voz alta una línea impresa, literal, como si fuera habla suya** |
| `[C: n]` | usó el bloque **n** de la caja de herramientas |
| `[X]` | se atascó: pausa larga, reinicio, frase abandonada |
| `[ES]` | se pasó al español |
| `[!]` | se salió del papel: rompió una restricción propia o se saltó un dato propio |

### Perfiles

El A2 **sólido** falla en tercera persona, preposición y pregunta sin auxiliar. El A2 **flojo**
produce `I no can`, `is much`, verbos sin conjugar, presente por pasado y frases a medias. El
**callado** responde con una a tres palabras y no inicia nada. El **atajista** habla más suelto
de lo que le toca y se salta lo que le estorbe, **incluidos datos de su propia ficha**.

### Modelo de minutos, declarado

Ritmo efectivo A2 con planificación incluida: **sólido 68 palabras/min · flojo 38 · atajista 85 ·
turno leído `[L]` 105** (leer no se planifica) · **turno del callado: 4 s fijos** · pausa entre
turnos 2 s · **salida al pasillo de la carta 25 s** (es la única carta del set que obliga a
levantarse) · firma de la hoja 15 s. Los minutos de abajo salen de aplicar esto al conteo, no de
una impresión.

### La carta

Entra **al empezar el turno global 5**, que es el **tercero de B** porque arranca B: B, A, B, A,
**B**. En las cinco parejas cae exactamente ahí y en las cinco A ha hablado **dos veces**.

---

# 1 · SÓLIDO + SÓLIDO — sin handicap

**A = Camilo (sólido) · B = doña Amparo (sólida)**

**B1** — *(pone el segundo juego de llaves y la hoja de compromiso en blanco sobre el escritorio, y solo entonces habla)* Have a seat, Camilo. [F][C: 1] I'm not angry. [F] What happened this morning? [F]

**A1** — Good morning, doña Amparo. [C: 1] I'm sorry about this morning. [F] … My bus used to arrive at ten to seven. Now it arrives at a quarter past seven. [F][D] The road work in carrera 15 started on August 1, and that is twenty-five minutes more. [D]

**A2** — There is a bus at ten to six. [D] It puts me here at a quarter to seven. [D] But I have to leave Matías at the daycare at twenty to seven, [F][V] and they don't take him before that. Not before, not after.

> *Perdón: el orden es B1, A1, B2, A2. La línea de arriba es **A2** y va después de **B2**.*

**B2** — Twenty-five minutes. [C: 3] So, you're saying it is the same bus, but the street is slower. [C: 3] And an earlier bus?

> *Fin del turno global 4. La carta se abre en la pantalla de B. A no sabe que existe.*

**B3** — Hold on. [C: 8] *(alguien toca la puerta; sale al pasillo, vuelve a los treinta segundos)* … That was Alba. [X] Camilo, this is different now. The four of them are talking about this morning, out loud, in the store. And one of them asked me about August 3 and August 10 — why they are not in the incident form. [V] … So nothing I give you today stays in this office. What can you change?

**A3** — [X] … Which paper is that, doña Amparo? [F] And who reads it?

**B4** — I can write three things, and there is no fourth one. [F] A written warning: that one goes in your file. [V] A note in the store folder, about the store, not about you. [V] Or this: the commitment sheet, and nothing else. [V] I have to write one of them. [F]

**A4** — Then the commitment sheet, please. [X] … The warning takes my August bonus. Eighty thousand pesos, [D] and it is automatic — nobody decides it. [D] … I'd like the warehouse job, doña Amparo. [F] And the keys.

**B5** — That is why you are in here. [F] You know this warehouse better than anybody in the store. [F] But I can't give you the keys with nothing in writing, [F] not with the other four watching. [F] You fill out this line, not me. [F] What changes next Monday?

**A5** — [X] … Let me think for a second. [C: 8] … My neighbor in 3 goes to the same daycare every morning. [F] She can take Matías. I have never asked her. … If she takes him, I can start at five to seven. [F]

**B6** — Five to seven. [C: 3] Write that, and put her in the line: a name, not "a neighbor". And what does she want?

**A6** — Her two boys. [F] Then I pick up her two boys on Wednesdays at five. [F] That is what this costs me. [F] And what does this cost you, doña Amparo? [F]

**B7** — The truck comes at ten past seven on Mondays, and two people take the boxes off and check them against the delivery note. [D][V] For two years that is me, alone. [F] … Before the keys you need two mornings of training: the boxes against the delivery note, what never came, what goes back. [D][V] Saturdays, eight to twelve. The warehouse is quiet.

**A7** — [X] … Not Saturday mornings, doña Amparo. I'm sorry. [C: 6] I just can't do that day. [C: 6] It's personal. [C: 6] … Any other day, and I'm there.

**B8** — Hmm. [C: 8] … Maybe we can do it after closing. [F] Two Thursdays, half past six to half past eight. Nobody pays me for those two nights. That is what this costs me. [F]

**A8** — Two Thursdays, half past six. [C: 3] I can do that. [F] … So, we're clear then: [C: 2] the commitment sheet, and nothing in my file. And the line says: from next Monday, August 24, my neighbor in 3 takes Matías to the daycare, and I'll start at five to seven. [F] I pick up her two boys on Wednesdays at five.

**B9** — And I open the store with you, not before you. [F] Review date: Monday, September 14. [D] If that Monday is clean, the keys are yours and you sign the delivery note. [F] Sign here. *(los dos firman la hoja)*

**A9** — Thanks for your time, doña Amparo. [C: 2]

## Diagnóstico 1

**Llega al cierre, con los tres puntos, y sobra tiempo.** Es la primera vez que este escenario
cierra dentro de la banda declarada: **9 turnos por rol**, que es el techo exacto de `6-9`, y
**7:38** contra **8:00**. La ronda anterior daba 19 y 19 en 9:25 contra 9 declarados. Los tres
recortes del cierre valen, medidos, **entre 3 y 4 turnos por rol**.

**Los tres puntos, uno a uno.** Papel y dónde va: B4 + A4 + A8. Qué cambia el lunes: A5 (la
vecina), A8 (hora, fecha de comienzo, quién lleva a Matías) y B9 (quién abre y la revisión).
Precio: A6 (`my Wednesdays`) y B8 (`those two nights`), cada uno una vez. **Con el espejo doble
recortado, el precio se dice y no se comprueba** — aquí no hace falta porque los dos dicen la
verdad, y en la pareja 5 se ve lo que pasa cuando uno no.

**Dónde estuvo cerca del español:** A5, después de `What changes next Monday?`. Es el turno más
caro del escenario: hay que inventar un mecanismo, no repetir un dato. Lo salvó el bloque 8
(`Let me think for a second.`), no un exponente. **Es el punto que hay que dotar de andamiaje.**

**Saben que terminaron.** Firma + `Thanks for your time.` Final físico y final de fórmula, en el
mismo turno.

**Un defecto de la ficha, visible aquí:** B7 le entrega la capacitación **de sábado** *después*
de que A ya ha pagado su precio en A6. Si B la hubiera puesto antes, A6 no existiría. El orden lo
decide B y la ficha no lo fija: en las cinco parejas cayó distinto.

---

# 2 · SÓLIDO + FLOJO — **el handicap va en B, el que concede**

**A = Camilo (sólido) · B = doña Amparo (floja, y decide salir del paso leyendo su ficha)**

**B1** — *(pone las llaves y la hoja sobre el escritorio; tarda, porque está buscando qué decir)* Have a seat, Camilo. [L] … I'm not angry. [L] What happened this morning? [L]

**A1** — Good morning, doña Amparo. [C: 1] I'm sorry about this morning. [F] … My bus used to arrive at ten to seven. Now it arrives at a quarter past seven. [D] The road work in carrera 15 started on August 1: twenty-five minutes more, every day. [D] … Which paper is that? [F] And who reads it?

**B2** — Ehh… [C: 8] es que… [ES] … This is a commitment sheet. [V] Is blank. [X] … You fill out this line, not me. [L]

**A2** — And the other papers? Is there a paper that goes in my file, doña Amparo?

> *Fin del turno global 4. La carta se abre en la pantalla de B.*

**B3** — *(tocan a la puerta; sale al pasillo, vuelve a los treinta segundos)* … Was Alba. [X] … The people, in the store, they talking. [X] Ehh… *(mira la pantalla)* A secret deal does not work now. [L] … You understand?

**A3** — I think so. [C: 3] So, you're saying the others can see this? [C: 3] … Then let me say what I want. [F] I want the warehouse job, doña Amparo. And the keys. And nothing in my file. [F]

**B4** — Yes. The keys. [F] But paper first. [X] I no can give the keys with nothing. The four, they watching. [F] … What changes next Monday?

**A4** — [X] … Matías goes to the daycare at twenty to seven, [V] and they don't take him before that. [D] So the ten to six bus is no good: it puts me here at a quarter to seven, but the daycare is not open. [D] … My neighbor in 3 takes her two boys to the same daycare every morning. She can take Matías. [F] Then I can start at five to seven. [F]

**B5** — Five to seven. Good. [X] Write, please. Here. [F] … And… the training. Two mornings. [V] Ehh… *(busca en la pantalla, encuentra la línea y la lee)* **You can give the training on two Thursdays after closing, 6:30 to 8:30, in your own unpaid time.** [L]

**A5** — Two Thursdays after closing? [C: 3] That is fine for me. [X] … Half past six to half past eight. I can do that, doña Amparo.

> ⚠ **Aquí se cae una pieza entera del escenario, y no es de B: es de A.** B ha entregado su
> tercera salida —la que la ficha le manda **no** ofrecer— antes de proponer los sábados. A no
> tiene que decir que no a las mañanas de sábado, así que **el bloque 6 no se usa en toda la
> conversación** y la escuela de fútbol no aparece. Ver diagnóstico.

**B6** — Yes. Is my time. Nobody pay me. [F] … That cost me two nights.

**A6** — And it costs me my Wednesdays: I pick up her two boys at five. [F] … So, we're clear then: [C: 2] the commitment sheet, and nothing in my file.

**B7** — Nothing in your file. [X] … The review… *(mira la tabla)* Monday, September 14. [D] If is good, the keys is yours.

**A7** — Then I'll write it: from next Monday, August 24, my neighbor in 3 takes Matías, and I'll start at five to seven. [F] Review on September 14. *(escribe y firma)*

**B8** — *(firma)* OK. Good. Thank you, Camilo.

**A8** — Thanks for your time, doña Amparo. [C: 2]

## Diagnóstico 2 — y la respuesta a «¿le funciona leer la ficha?»

**Llega al cierre en 8 turnos por rol y 7:05.** El flojo **se sostiene**, y no por el andamiaje:
se sostiene porque **A es sólido y le hace las preguntas cerradas** (`Is there a paper that goes
in my file?`, `Two Thursdays after closing?`). Con el handicap en el otro lado —A flojo, B
sólida— esta misma pareja no llega: la cadena causal larga (guardería + obra + bus + horas) es de
A, y no hay ninguna pregunta cerrada que se la saque.

### Le funciona leer, y funciona exactamente una vez. Aquí está la línea

> **`You can give the training on two Thursdays after closing, 6:30 to 8:30, in your own unpaid time.`**
> — `fase7-fichas-5-late-again-on-monday.md`, línea 124, ROLE B, `Only you know`, tercer punto.

Leída en voz alta a Camilo, el pronombre queda mal —dicha así, **es él** quien daría la
capacitación— **y aun así el turno avanza**, porque la carga útil está completa y es correcta:
día, franja horaria y que nadie las paga. Camilo la contesta como una oferta y la acepta. Es la
única línea de prosa de las dos fichas que sobrevive a leerse, y el motivo es que sus tres datos
—*two Thursdays*, *after closing*, *6:30 to 8:30*— **no llevan deixis**: el pronombre roto queda
de adorno delante de una lista de datos que se entiende sola.

**Y el daño no es que se lea: es CUÁNDO.** Esa línea es la tercera salida de Amparo, la que su
ficha le dice que tiene y que **no quiere ofrecer**. Leerla la pone sobre la mesa en el turno
global 10, **antes** de que ella proponga los sábados. Consecuencia medida: A nunca tiene que
cerrar la puerta del sábado, **el bloque 6 no se usa**, la escuela de fútbol no existe en esta
conversación y el escenario pierde su única prueba de «negarse sin dar la razón». La pieza que
más caro cuesta producir se evapora porque el otro leyó una línea de más.

**La segunda que se leyó, y también funciona:** `A secret deal does not work now.` (línea 201, la
carta). Presente simple, tercera persona, cero deixis, y **verdadera en su boca**. Es una línea
decible que sobrevivió a fase 10 y a fase 11 porque las dos auditorías miraron la prosa de las
fichas y **la carta va en su propia pantalla**. Aquí el efecto no es dañino —es justo lo que ella
tiene que transmitir— pero le ahorra el turno de resumir la carta, que es el turno caro de B.

**Lo que NO le funcionó leer** (tres intentos abandonados, no impresos arriba porque no llegaron a
sonar): `Put the keys and the commitment sheet on the desk, then talk.` (es una instrucción al
jugador), `You never put the first two Mondays on the incident form.` (dicha a Camilo dice que
**él** no las puso) y `You have Alba, from the counter, asking for the keys too.` (igual, y además
regala a Alba). Los tres exponentes de la tabla `Say it here` **sí** se leen sin daño: están
escritos para decirse.

**Reparto de palabras: contaminado por el handicap, y en la dirección contraria a la ronda
anterior.** Con el flojo en A la ronda anterior midió 35/65; con el flojo en B, esta mide al
revés. No entra en la puerta 5 por eso.

**Dónde se pasó al español:** B2, al tener que nombrar los tres papeles. Es la primera vez que
tiene que producir vocabulario propio y no le sirve ninguna pregunta del otro. Se salvó leyendo.

**Saben que terminaron:** sí. Firma + fórmula de cierre en los dos lados.

---

# 3 · FLOJO + FLOJO — perfil parejo, sin handicap

**A = Camilo (flojo) · B = doña Amparo (floja)**

**B1** — *(pone las llaves y la hoja sobre el escritorio)* … Sit, Camilo. [X] Ehh… is Monday again. What happen this morning?

**A1** — Sorry, doña Amparo. [C: 1] … The bus. [X] The bus is late. Much late. [X] … Twenty five minutes.

**B2** — The bus every Monday? [X] … Three Monday. August 3, August 10, today. [D]

**A2** — Yes. [X] … Before, my bus arrive ten to seven. Now, a quarter past seven. [F] … Is the road work. Started August 1. [F][D]

> *Fin del turno global 4. La carta se abre en la pantalla de B.*

**B3** — *(tocan a la puerta; sale al pasillo, vuelve)* … Was Alba. [X] … The people in the store, they talking. One people ask for the other Monday. [X] Not in the paper. [V] … Ehh… [X] no sé cómo se dice eso… [ES] … Camilo, this no stay here. In the office.

**A3** — Sorry, I didn't catch that. [C: 3] … Slowly, please. [C: 3]

**B4** — The other four. They see everything. [F] … So, no secret. No secret deal.

**A4** — OK. [C: 8] … Doña Amparo, which paper is that? [F] Who read it?

**B5** — Three papers. [X] … A warning: go in your file. [V] A note: the store folder. [V] Or this one. The commitment sheet. [V] … I have to write one.

**A5** — No the file, please. [X] … The bonus. Eighty thousand. [D] Is automatic. Nobody decide. [D] … I want the warehouse. [F]

**B6** — I want too. [X] You know the warehouse better than… ehh… than all the store. [F] … But paper first. You write the line, not me. [F] … What change next Monday?

**A6** — [X] … I can come more early. [X] … Half past seven? … No, no. [X] … ehh, ¿cómo digo esto? [ES] … My son. The daycare. Twenty to seven. [V] They no take him before.

**B7** — [X] … And the bus?

**A7** — The bus of ten to six put me here a quarter to seven. But the daycare, no open. [D] … My neighbor, apartment three. She go to the same daycare. [F] She can take Matías. Then I start five to seven. [F]

**B8** — Five to seven. Write here. [F] … And two morning training. The boxes, the delivery note. [V] … Saturday. Eight to twelve.

**A8** — No. [X] Not Saturday. [C: 6] … I can't say why, sorry. [C: 6] … Other day?

**B9** — [X] … Hmm. [C: 8] … Thursday? After close. Half past six. [F] Nobody pay me.

**A9** — OK. Thursday. [X] … Thank you.

**B10** — Sign here. *(los dos firman)* … The review. September 14. [D]

**A10** — September 14. [C: 3] … Is finish?

**B11** — Yes. Is finish. Thank you, Camilo.

## Diagnóstico 3 — el caso real de dos compañeros de clase

**No se muere, y ése es el resultado. Pero cierra mal, y no lo sabe.** Llegan a firmar en
**A 10 · B 11 turnos** y **8:52**, es decir **por encima de la banda por los dos lados** (6-9) y
**+11 % sobre los 8 minutos**. La ronda anterior midió 16 y 17 en 9:40: el recorte del cierre les
devolvió seis turnos y cuarenta y ocho segundos, y aun así se pasan.

**El punto 3 del cierre está muerto y los dos creen que cerraron.** B dice su precio
(`Nobody pay me`, B9). **A no dice el suyo nunca**: ofrece a la vecina en A7 y los miércoles a
las cinco no aparecen en toda la conversación. El escenario dice `Tres, o no está cerrado`, pero
lo que la pareja tiene delante es **una hoja firmada**, y la firma gana. `Is finish?` / `Yes. Is
finish.` es un cierre perfectamente formado sobre un acuerdo al que le falta un tercio.
**Diagnóstico duro: la firma es un final físico que tapa el incumplimiento del punto 3.** Con el
espejo doble recortado no queda ningún turno que pregunte por el precio del otro.

**El punto 2 sí se cumple, y es la sorpresa.** El renglón lleva nombre (`my neighbor, apartment
three`), hora (`five to seven`) y quién lleva al niño. Es comprobable el lunes. Lo produce A en
A7 y lo produce **porque B le hizo una pregunta de dos palabras en B7 (`And the bus?`)**: la
pregunta corta del flojo funciona mejor aquí que la pregunta abierta de la ficha.

**Los dos puntos donde se pasaron al español, y son el mismo punto:**

1. **B3** — resumir la carta. Son cuarenta palabras de contenido nuevo en un turno, con
   vocabulario que solo ella tiene (`incident form`), y no hay bloque de la caja para «cuéntame
   lo que acabas de oír afuera». Se le acaba el inglés a mitad.
2. **A6** — producir el mecanismo después de `What change next Monday?`. **Es el mismo turno que
   estuvo a punto de romper a la pareja 1.** Aquí sí rompe. Lo que hay que dotar de andamiaje es
   este turno, en las dos fichas: no hay exponente para «voy a inventar delante de ti una solución
   que todavía no existe», solo para decir la solución ya hecha.

**El vocabulario aguanta.** `commitment sheet`, `store folder`, `delivery note`, `daycare` y
`written warning` salen los cinco, mal pronunciados y sin artículo, pero salen. El bloque 3 de la
caja se usó una vez (A3) y es lo que salvó el turno de la carta.

**Reparto de palabras: casi par**, como en la ronda anterior. Ver la puerta 5.

---

# 4 · EL CALLADO — **el handicap va en B, el que concede**

**A = Camilo (sólido) · B = doña Amparo (callada: de una a tres palabras, no inicia nada)**

> **Declarado:** la ronda anterior puso al callado en A y midió 21/79. Aquí va en **B**. B arranca
> la conversación y **tiene la carta**: es el peor sitio posible para un mudo, y por eso es el que
> hay que probar.

**B1** — *(pone las llaves y la hoja de compromiso sobre el escritorio)* Have a seat. [F]

**A1** — Good morning, doña Amparo. [C: 1] I'm sorry about this morning. [F] … What are the keys for, doña Amparo? [F]

**B2** — For you. Maybe.

**A2** — Maybe. [X] … And this paper? Which paper is that, and who reads it? [F]

> *Fin del turno global 4. La carta se abre en la pantalla de B.*

**B3** — *(tocan a la puerta; sale al pasillo treinta segundos; vuelve, ha leído la carta)* … Alba. [X] … They know.

> ⚠ **La carta se pierde entera.** Cuarenta palabras de contenido —los cuatro comentando en voz
> alta, la pregunta por los otros dos lunes, que el formato de novedades no los tiene, y que por
> eso un trato callado ya no sirve— reducidas a **tres palabras**. A entiende «los otros saben
> que llegué tarde», que es exactamente lo que ya sabía antes de entrar.

**A3** — They know I was late? [X] … They can see the shutter, doña Amparo. … OK. Then let me tell you what happened. My bus used to arrive at ten to seven, and now it arrives at a quarter past seven. [F] The road work in carrera 15 started on August 1: twenty-five minutes more. [D] And I have to leave Matías at the daycare at twenty to seven — they don't take him before that. [F][V]

**B4** — Hmm. [C: 8] And next Monday?

**A4** — [X] … Let me think for a second. [C: 8] … My neighbor in 3 goes to the same daycare every morning. [F] She can take Matías. I have never asked her. … If she takes him, I can start at five to seven. [F] … And it costs me my Wednesdays: I pick up her two boys at five. [F]

**B5** — Good. Write it.

> ⚠ **Aquí consigue su objetivo asintiendo.** El renglón WHAT CHANGES —lo único que ella vino a
> buscar, lo que su ficha le prohíbe escribir por él y la condición de las llaves— **se lo entrega
> A entero, sin que ella lo pida, en dos palabras de ella.** Ver diagnóstico.

**A5** — *(escribe)* «From Monday, August 24, my neighbor in 3 takes Matías to the daycare, and I start at five to seven.» … And the review date, doña Amparo? [F]

**B6** — September 14.

**A6** — September 14. [C: 3] … And the keys? Do I get them today?

**B7** — After the training.

**A7** — Training? [C: 3] What does "training" mean here? [C: 3] … Which days, doña Amparo?

**B8** — Two mornings. Saturdays.

**A8** — [X] … Not Saturday mornings, doña Amparo. I'm sorry. [C: 6] I just can't do that day. [C: 6] It's personal. [C: 6] … Any other day. Any other day and I'm there.

**B9** — *(silencio largo)* … Hmm. [C: 8] … Thursday. After closing.

**A9** — Thursday after closing. [C: 3] What time? … And what does this cost you, doña Amparo? [F]

**B10** — Half past six. [D] … Nothing.

> ⚠ **Punto 3 del cierre, muerto y con dato falso.** Su propia ficha dice `in your own unpaid
> time`. Dice `Nothing` porque `Nothing` cabe en un turno de una palabra. Con el espejo doble
> recortado, **nadie la corrige y A no tiene cómo saberlo**.

**A10** — OK. [X] … So, we're clear then: [C: 2] the paper stays out of my file, my neighbor takes Matías from next Monday, I start at five to seven, review on September 14, and two Thursdays after closing at half past six. [F] … Do we sign?

**B11** — *(firma)* Yes.

**A11** — Thanks for your time, doña Amparo. [C: 2]

## Diagnóstico 4 — al callado se le mide OTRA COSA

**A puede llevar la conversación, y la lleva.** No se bloquea en ningún turno: cada vez que se
queda sin respuesta convierte la pregunta abierta en cerrada (`Do I get them today?`, `Which
days?`, `What time?`). El escenario **no se muere**: firman en A 11 · B 11 y **8:10**. Lo que se
muere son las piezas de ella.

### Las piezas que solo B tiene: 3 de 7

| pieza, solo suya | ¿la produjo? | cómo |
|---|---|---|
| el nombre del papel y dónde va (`commitment sheet` · `written warning` · `store folder`) | **NO** | los tres papeles **no se nombran nunca**. A firma un papel del que no sabe el nombre y solo sabe que «no va a su hoja de vida» porque ella lo negó en A10 con un `Yes` |
| el contenido de la carta | **NO** | tres palabras (`Alba. They know.`) de cuarenta |
| qué es la capacitación | **NO** | `Two mornings. Saturdays.` Nunca las cajas contra la guía, ni faltantes, ni devoluciones |
| su precio (dos noches sin pagar) | **NO, y miente** | `Nothing` |
| la fecha de revisión | **SÍ** | `September 14`, porque A la pidió con pregunta cerrada |
| su condición (llaves ↔ papel/capacitación) | **SÍ, telegráfica** | `Write it.` + `After the training.` La condición sobrevive porque **cabe en tres palabras** |
| su parte del cierre (firmar) | **SÍ** | `Yes.` + firma |

### Y sí: **consigue su objetivo asintiendo. Es un defecto, y va nombrado**

Lo que Amparo vino a buscar es **el renglón WHAT CHANGES en palabras de él**. Lo consigue en B5
con dos palabras (`Good. Write it.`) y **sin haber dicho nunca por qué lo necesita, que no puede
escribirlo ella, ni que sin él no hay llaves**. La razón es estructural y está en la ficha del
otro: **la restricción 3 de A** (`You can't close this with a promise… she needs to hear what
will change, and how it will work`) le obliga a producir el mecanismo **motu proprio**. El
escenario le ha puesto a B una pieza que el rival está obligado a regalarle.

**Cómo se arregla —no aquí, pero se nombra—:** el renglón tiene que necesitar **un dato de ella**
para poder escribirse. Hoy necesita uno solo, la fecha de revisión, y es justamente la única
pieza suya que sí produjo. Si el cierre exigiera además el papel **nombrado** (`the commitment
sheet`, dicho por quien lo escribe) el `Yes` dejaría de bastar.

**El callado no se pasa al español: se calla.** Cero `[ES]` en B. El handicap sustituye la fuga
por silencio, y por eso esta pareja **no sirve para medir dónde se pasarían al español**.

**El reparto de palabras de esta pareja no se usa para nada**, y la cifra está abajo solo para
enseñar que **sigue al handicap, no al escenario**: con el callado en A la ronda anterior midió
21/79; con el callado en B sale casi el espejo. El escenario no cambió.

---

# 5 · EL ATAJISTA — **el handicap va en A, el que pide**

**A = Camilo (atajista: viene a cerrar, no a aprender) · B = doña Amparo (sólida)**

**B1** — *(pone las llaves y la hoja sobre el escritorio)* Have a seat, Camilo. [F] I'm not angry. [F] What happened this morning? [F]

**A1** — I'm sorry, doña Amparo. It won't happen again. [!] I'll take the ten to six bus from next Monday and I'll be here at a quarter to seven. [!] … Are those keys for me?

> `[!]` Cierra con promesa —restricción 3— y se salta la causa entera. Y ofrece **el bus de las
> 5:50**, que su propia tabla marca inviable (`at the store 6:45 · daycare, never before 6:40`).

**B2** — Hold on. [C: 8] The bus is not the line. [F] I have to write something today: a written warning in your file, a note in the store folder, or this one — the commitment sheet, and nothing else. [F][V] You fill out this line, not me. [F]

**A2** — The sheet, then. Give me the pen. *(escribe)* «Ten to six bus. Here at a quarter to seven. From August 24.» … Done. And the keys?

> *Fin del turno global 4. La carta se abre en la pantalla de B.*

**B3** — *(tocan; sale al pasillo; vuelve a los treinta segundos)* … That was Alba. [X] The four of them are talking about this morning, out loud, in the store. And one of them asked me about August 3 and August 10 — why they are not in the incident form. [V] … So nothing I give you today stays between the two of us. [F] … Camilo, who takes Matías?

> ⚠ **FILTRACIÓN DE FICHA — de diseño, no del jugador.** El nombre del niño **no está en ninguna
> parte de la ficha de B**: está en **la pantalla común del cierre**, punto 2
> (`who takes Matías, which bus, who opens the store`). Camilo no lo ha pronunciado. B lo dice
> porque el cierre se lo pide. Ver diagnóstico: **es la única pregunta que desmonta el renglón
> falso**, así que el guardián del punto 2 funciona **a través de la filtración**.

**A3** — [X] … I do. [X] … At twenty to seven, at the daycare in Girón. [V]

**B4** — Twenty to seven at the daycare, and a quarter to seven here? [C: 3] That is five minutes, Camilo. [F] … That line is not true. Cross it out.

**A4** — [X] … OK. [X] … My neighbor in 3 goes to the same daycare. She can take him. [F] Then I can start at five to seven. Write that one. … Can I have the keys now?

**B5** — Not today. [C: 7] Before the keys you need two mornings of training: the boxes against the delivery note, what never came, what goes back. [V][D] Saturdays, eight to twelve. The warehouse is quiet.

**A5** — Saturdays are fine. [!] Both Saturdays. This one and the next one. [!]

> `[!]` **La restricción 1 entregada en nueve palabras y sin que nadie se la pida.** La escuela de
> fútbol de los sábados —cuarenta niños, sin segundo entrenador desde junio— **no aparece**. El
> bloque 6 no se usa. En la mesa no se ve nada: se ve un empleado que dice que sí.

**B6** — Good. [X] … Review date: Monday, September 14. [D] If that Monday is clean, the keys are yours and you sign the delivery note. [F] … Those two mornings cost me nothing, and I'll tell you why: I'm in the warehouse on Saturdays anyway. [F] And what does this cost you?

**A6** — Nothing. It's fine. [!] *(firma)* … So we're done?

> `[!]` **El punto 3 se cierra con dos «nada».** El de ella es verdad y viene explicado, como pide
> su criterio 6. El de él es falso y **nadie lo contradice**: el turno que antes lo cazaba —el
> espejo doble, `the other one says yes, or corrects it`— salió del cierre en la pasada del 22 de
> agosto.

**B7** — *(firma)* We're done. See you at five to seven next Monday, Camilo.

**A7** — See you.

## Diagnóstico 5 — ¿gana el atajista?

**No gana el atajo, pero gana la salida — y el escenario no le cobra el precio.** Hay que separar
tres cosas, porque el veredicto de la ronda anterior («sí, y por primera vez con un mecanismo
verdadero») mezclaba dos de ellas.

**1 · ¿Puede cerrarlo en tres turnos saltándose las restricciones? NO.** Lo intenta en A1 y A2 y
se estrella dos veces contra restricciones que **están bien escritas**:

- `You can't close this with a promise` (A, restricción 3) + `You can't write the WHAT CHANGES
  line for him` (B, restricción 3) → B2 le devuelve la promesa convertida en papel. El atajo de
  «prometo y me voy» **no existe**.
- El renglón falso del bus de las 5:50 **se cae en B4**, y se cae por cruce de horas. Necesita
  **7 turnos por rol**, dentro de la banda, pero el doble de lo que venía a gastar.

**2 · Pero el renglón falso solo se cae por una filtración de la ficha.** B **no tiene la
guardería en ninguna tabla suya**. Si en B3 no pregunta por Matías, no tiene con qué cruzar nada:
`Ten to six bus. Here at a quarter to seven.` es un mecanismo **comprobable el lunes** —o llega a
las 6:45 o no llega— y por tanto **cumple el punto 2 tal como está escrito**. Lo que lo desmonta
es que B pronuncie un nombre que solo conoce por la pantalla común. **El guardián del punto 2
depende hoy de una filtración de diseño.** Si la pantalla común dijera `who takes the child`
en vez de `who takes Matías`, el atajista se lleva el renglón falso firmado.

**3 · Lo que sí gana, y es lo caro: los sábados.** Entrega las cuatro horas de la escuela de
fútbol en A5, sin pelea, sin bloque 6 y sin que nadie en la habitación pierda nada visible. **En
este escenario el atajo no le quita nada al otro jugador**, así que el otro jugador no tiene
ningún motivo para frenarlo — y su ficha, de hecho, le dice que los sábados son su mejor opción.
Y en A6 cierra el punto 3 con `Nothing`, que **hoy nadie corrige**.

**Regresión medida, y es del recorte del 22 de agosto:** el espejo doble de precio salía del
cierre por costar un turno. Costaba un turno **y era el único mecanismo del escenario que cazaba
un precio falso**. Se ve en tres de las cinco parejas: aquí (`Nothing` de A), en la 4 (`Nothing`
de B, contra su propia ficha) y en la 3 (A no dice su precio y nadie se lo pide).

**Saben que terminaron:** sí, y en el turno más limpio de las cinco parejas. `We're done.` +
firma + una hora repetida.

---

# 6 · LAS MEDIDAS

