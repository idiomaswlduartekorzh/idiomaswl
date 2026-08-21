# Escenario 4 (nuevo) · `the-pot-is-already-on` — ¿se puede leer en voz alta?

Auditoría de calcabilidad sobre `artifacts/habla-a2/fase8-fichas-4nuevo.md` (estado del 21 de
agosto), contra la regla del §11 del blueprint:

> **En las tablas** —datos duros, vocabulario, la carta— se escribe en notas, no en frases. Las
> frases decibles viven **solo** en la tabla de exponentes.
> **En la prosa** se escribe en inglés A2 legible, y ninguna de esas oraciones puede ser algo que
> el jugador diría: se escriben *sobre* él, no *por* él.
>
> Prueba: si una línea se puede decir tal cual en la conversación y el turno avanza, está mal
> escrita.

**Fuera de alcance por diseño:** las dos tablas de exponentes (líneas 91-100 y 176-185), donde las
frases van a propósito; la cabecera en español (1-19); el bloque `After` (224-229), en español; y
todo el metadato del redactor a partir de la línea 232 (recuento de prosa y las cinco notas de
«lo que se hizo distinto»), que no llega a pantalla.

**Segunda pasada, 21 de agosto.** La ficha no se ha tocado desde la primera —se comprobó
línea por línea: 26, 28, 31, 33, 36, 38, 41, 45, 53, 68, 112, 114, 122, 130, 136, 138, 145, 147,
149, 196 y 202 siguen literales—. Las 26 anteriores se recorrieron una a una y **se confirman las
26**. Aparece **una más**, en la tabla de la carta, que la primera pasada dejó en riesgo: la nº 27.

## Cómo se marcó cada línea

- **FALLA** — la línea, o una cláusula autónoma donde el ojo puede parar, es un enunciado inglés
  bien formado que ese rol le puede decir al otro **sin tocar una palabra**, apuntando a la
  persona correcta, y el turno avanza.
- **RIESGO** — es oración, pero dicha tal cual apunta mal: hay que girar un pronombre o un
  posesivo. La salva el pronombre, no el redactor.
- **Limpia** — nota sin verbo conjugado con sujeto. Las elipsis (`Twelve plates and nobody at the
  table`, `A cooler does`) cuentan como limpias: son la forma que pide el §11.

Tres reglas de lectura heredadas de las auditorías del set y aplicadas igual aquí:

1. **Las filas de tabla se leen de corrido, etiqueta incluida.** `| Marcela's car | stays until
   4:00 |` es una sola unidad, y en la boca es *Marcela's car stays until four*.
2. **Los dos puntos no se oyen.** `You know Marcela's car isn't coming back: at 11:11 she wrote…`
   se lee como dos enunciados, y el segundo va solo.
3. Lo que mata un verbo es sustituirlo por un sustantivo o un participio, no ponerle un signo
   delante.

---

## Veredicto

**NO PASA. Vuelve a `habla-fichas-de-rol`.** No hay que rehacer ninguna sección: son **27
reescrituras de línea**. Pero el volumen es de otro orden que el del resto del set —la peor ficha
auditada hasta hoy, el escenario 8, tenía 7 fallas en 108 unidades (6,5 %)— y tres de las 27
entregan, ya montada en inglés, una de las **seis frases obligatorias del cierre**, que es
justamente lo que el §11 del diseño dice que ningún jugador puede recibir hecho.

| | |
|---|---|
| Unidades auditadas (sin exponentes) | **146** |
| **Frases decibles (FALLA)** | **27 · 18,5 %** |
| Reparto | **ROLE A 13 · ROLE B 8 · la carta 6** |
| De ellas, **filas de tabla** | **9** |
| De ellas, **blandas** (necesitan contexto previo) | 5 |
| A un pronombre (RIESGO) | 41 |
| **Pantallas limpias enteras** | **vocabulario `here` (20/20)** · vocabulario `what it is` (20/20) · `Both screens — how it ends` (8/8) |

**La buena noticia va primero, porque es la que el encargo pedía mirar.** La columna `here` —«la
más calcable de la ficha entera», §11— está **limpia en las veinte entradas**, en los dos roles.
Ni una comilla, ni un ejemplo, ni un pronombre con verbo conjugado al principio: las veinte son
sintagmas nominales de propósito (*the clock on the second chicken*, *one word for your first no*,
*why they went at ten and not at four*). La columna `what it is`, igual: veinte glosas, ninguna
con sujeto y predicado. Lo que el redactor dice en su nota 4 es verdad y se verifica.

**El problema está donde el redactor no miró: en las tres cosas nuevas de esta ficha.**

- **La carta es la peor pantalla del archivo**: 6 fallas en 9 unidades (67 %). En el escenario 8
  la carta estaba limpia y en el molde es un correo en notas (`Speaking · Saturday the 12th,
  afternoon`). Aquí son cinco oraciones seguidas en presente, en tercera persona y apuntando bien,
  **y es la única pantalla que se lee con el otro delante y se habla tres segundos después**.
- **Los dos bloques propios** —*What the fire is doing while you talk* y *The bike, and what fits*,
  el orgullo de la nota 2— son los que meten verbo conjugado en fila de tabla: `then it dries out`,
  `Édgar comes back this way`, `Marcela's car finally leaves`. En el resto del set las tablas de
  datos estaban limpias (20/20 en el 8).
- **La tercera persona del dato oculto se aplicó a medias.** La nota 3 dice que las cuatro frases
  de A y las tres de B se pasaron a segunda persona «justamente porque en tercera se podían decir
  tal cual». Se pasó el **envoltorio** (`You know…`, `You took…`) y se dejó suelta la **segunda
  cláusula**, que es la que lleva el dato: `at 11:11 she wrote that she stays there until four`,
  `Saturday's rice and chicken are in there`, `Cassava and plantain go in at twelve`. El
  cortafuegos está puesto en la mitad de la oración que no lo necesitaba.

## Dónde se concentran

| sección | unidades | FALLA | riesgo | estado |
|---|---|---|---|---|
| **La carta** (5 prosa + 4 filas) | 9 | **6** | 2 | **la peor densidad del archivo: 67 %** |
| **`Nobody out there knows this` / `What you haven't said yet`** (8 + 7) | 15 | **3** | 12 | el dato oculto, servido en dos ocasiones |
| **A · restricciones + objetivo + situación** (10) | 10 | **6** | 3 | la apertura entera de A |
| **Tablas de datos duros** (10 + 10) | 20 | **4** | 2 | en el 8 estaban limpias las 20 |
| **Los dos relojes nuevos** (2 prosa + 10 filas) | 12 | **4** | 2 | el bloque que no tiene el resto del set |
| **`If he rides off…` / `If you leave at 11:40…`** (3 + 2) | 5 | **2** | 2 | |
| B · restricciones + objetivo + situación (10) | 10 | **2** | 8 | mejor que A: casi todo en segunda persona |
| Cabeceras de registro y pantalla (5 + 4) | 9 | 0 | 4 | meta |
| **Vocabulario `what it is`** (10 + 10) | 20 | **0** | 0 | **limpia** |
| **Vocabulario `here`** (10 + 10) | 20 | **0** | 3 | **limpia** — la columna que el §11 marca como la más peligrosa |
| Caja de herramientas (1 + 1) | 2 | 0 | 2 | meta |
| Criterios de cierre (1 + 1) | 2 | 0 | 0 | meta |
| **`Both screens — how it ends`** (8) | 8 | **0** | 0 | **limpia**: preguntas indirectas, nada decible |
| **total** | **146** | **27** | **40** | |

---

## ROLE A · las 13, citadas y reescritas

### Situación y objetivo

**1 · línea 26** — `On Friday everybody agreed to eat here at one and go to the river after.`
Sujeto en tercera persona, sin nada que girar, y es literalmente el argumento del turno 1 de A.
→ `**The patio, 11:20 a.m.** · Sunday, September 20, in Girón. You lit the fire at nine. Friday's plan, and everybody was there: lunch here at one, river after.`

**2 · línea 28** — `how many eat here at one`
Cláusula tras dos puntos; los dos puntos no se oyen y queda la pregunta del escenario entero, que
además ya vive en los exponentes (`How many are coming at one?`). *Blanda: le falta la entonación.*
→ `One number before the fire gets to twelve — the count for one o'clock.`

**3 · línea 28** — `The river comes after lunch, not instead of it.`
Es la posición de A, dicha por A, sin tocar una palabra.
→ `River after lunch, not instead of it.`

### Restricciones

**4 · línea 31** — `The pot stays on the fire.`
Duplica el exponente `This pot doesn't leave the fire.` en prosa, donde el estudiante no espera
encontrarla y por tanto la lee en voz alta sin darse cuenta.
→ En nota, fundida con la siguiente: `**Pot on the fire, always** · raw cassava, twenty liters, boiling water — not stubbornness.`

**5 · línea 31** — `Raw cassava and boiling water are the reason, not stubbornness.`
Sayable tal cual en cuanto B le diga terco. *Blanda: register escrito.*
→ Misma reescritura que la 4: las dos se van en la misma nota.

**6 · línea 33** — `Nothing leaves the fridge before you have a number and a name.`
La cláusula principal va sola: *Nothing leaves the fridge.* *Blanda: nivel de cláusula.*
→ `You don't open that fridge until you have a number and a name. Put **two ways** on the table **before** the yes.`

### Dato oculto

**7 · línea 36** — `Cassava and plantain go in at twelve, and at 11:40 there's only broth.`
Las dos mitades son decibles y las dos hacen avanzar el turno 3.
→ `You put the cassava and the plantain in at twelve. At 11:40 you have broth, and broth is not lunch for six.`

**8 · línea 38** — `Saturday's rice and chicken are in there`
Es el turno 11 del mapa, ya redactado.
→ `You can't put it back: you have Saturday's rice and chicken in there, one container, and that container is your Monday and Tuesday lunch.`

### Lo que se pierde

**9 · línea 41** — `The chicken goes bad tonight.`
**10 · línea 41** — `And the same people come back to this patio next Sunday.`
Las dos, tercera persona, presente, apuntando bien. La segunda es la presión social del escenario,
servida como frase.
→ `Twelve plates and nobody at the table. You lose the chicken tonight. And you see these same people in this patio next Sunday.`

### El reloj de la olla

**11 · línea 45** — `That's firewood, not habit.`
*Blanda*, pero es una oración completa, en registro y en el punto: justifica no salir del patio.
→ `You look at it every twenty minutes, because it's firewood and not a stove.`

**12 · línea 53** — `| after 1:00 | low fire, two hours · then it dries out |`
→ `| after 1:00 | low fire · two hours max · then dry |`

**13 · línea 68** — `| The gate | nobody can watch it from the fire |`
Leída de corrido es *Nobody can watch the gate from the fire*, que es **una de las tres frases que
solo A puede decir** («qué necesita a la una que no puede hacer con el fuego prendido»).
→ `| The gate | out of sight from the fire |`

---

## ROLE B · las 8, citadas y reescritas

**14 · línea 112** — `The heat took six of your friends down to the river at ten.`
El posesivo no salva nada: son amigos de los dos, así que dicha a Fabián apunta bien. Y es el
turno 2 del mapa, que en exponentes ya está como `They left at ten because of the heat.`
→ `**The patio, and one foot outside it** · Sunday, September 20, 11:20 a.m., in Girón. You watched six of them leave for the river at ten, because of the heat. You stayed.`

**15 · línea 114** — `Édgar passes at 11:40, and that bike is the only way to the river before the afternoon.`
→ `You're getting on Édgar's bike at 11:40. It's your only way to the river before the afternoon, and you want food in your hands when you get on it.`

**16 · línea 122** — `at 11:11 she wrote that she stays there until four`
**La peor de la ficha.** Es la carta escondida de B —la que el mapa deja salir en el turno 16 «lo
más tarde»— entregada en presente, en tercera persona y lista para pronunciar.
→ `You know Marcela's car isn't coming back. Her message came at 11:11, and you haven't shown it: river until four.`

**17 · línea 136** — `| ~12:40 | Édgar comes back this way |` → `| ~12:40 | Édgar back this way |`

**18 · línea 138** — `| 4:00 | Marcela's car finally leaves |` → `| 4:00 | Marcela's car, finally out |`

**19 · línea 145** — `| At the river | six people since 10:00 · they ate at 7:00 |`
→ `| At the river | six people since 10:00 · last food 7:00 |`

**20 · línea 147** — `| Marcela's car | stays until 4:00 — chat, 11:11 |`
Segunda entrega en tabla del mismo dato oculto.
→ `| Marcela's car | there until 4:00 — chat, 11:11 |`

**21 · línea 149** — `| What you wrote in the chat | lunch is coming to the river |`
→ `| What you wrote in the chat | lunch, on its way to the river |`

---

## La carta · las 6

La carta se lee **en mitad de la conversación** y se habla inmediatamente después. Es la pantalla
donde una frase hecha se calca con más probabilidad que en ninguna otra, y es la única del archivo
escrita entera en oraciones. La cabecera avisa —*don't read it out loud*, línea 194—, y ese aviso
es lo único que separa hoy al jugador de leerla: el §11 no pide un aviso, pide que no haya nada
que leer.

**Citada tal cual (líneas 196, 202 y 203):**

> `Your mother is on the phone. She's coming at one with four more people — your aunt and three
> from the church. They already left the house. They're not bringing anything. Somebody told her
> there was lunch here.`
>
> `| Twelve servings | now feed seven of the group, or none |`
> `| The gate at 1:00 | somebody has to be there, and it can't be you |`

- **22** `She's coming at one with four more people` — *blanda*: necesita nombrar antes a la mamá.
- **23** `They already left the house.` — dura.
- **24** `They're not bringing anything.` — dura.
- **25** `Somebody told her there was lunch here.` — dura.
- **26** `somebody has to be there` — dura, y es **la tercera frase obligatoria de A**.
- **27** `| Twelve servings | now feed seven of the group, or none |` — leída de corrido, *Twelve
  servings now feed seven of the group, or none*: verbo conjugado, presente, y es la cuenta que la
  carta obliga a rehacer en voz alta en el turno 5. La primera pasada la dejó en riesgo; no lo es,
  porque no hay pronombre que girar. Ya va resuelta en la reescritura de abajo
  (`| Twelve servings | seven of the group, or none |`).

**Reescritura, en la forma del molde** (el correo del escenario 3 es la referencia):

```
**Phone · your mother · 11:2x**

| | |
|---|---|
| Coming at 1:00 | her, your aunt, three from the church |
| Already | on the road |
| Bringing | nothing |
| Where she heard it | somebody told her, lunch here |
| At 1:00 | five more people |
| Twelve servings | seven of the group, or none |
| The gate at 1:00 | somebody there · not you · the fire |
```

Y debajo, en prosa y en segunda persona, la obligación que la carta tiene que crear (§9: la carta
da una tarea, no un argumento):
`From now on you can't ask for everybody at one, and you need somebody at the gate. You can't be that somebody.`

---

## Lo que está bien y conviene no tocar al corregir

- **Las 20 celdas `here` y las 20 `what it is`.** Es el mejor resultado del set en la columna que
  el §11 señala como la más peligrosa. Ninguna de las 27 correcciones debe tocarlas.
- **`Both screens — how it ends`.** Las seis obligaciones están escritas como preguntas indirectas
  (*what goes in the pot at twelve, and for how many*), que es la forma que no se puede leer en
  voz alta. Aquí el redactor acertó, y por eso duele más que las mismas seis frases estén servidas
  hechas en la carta, en el dato oculto de B y en dos filas de tabla.
- **Las restricciones de B** (líneas 117-119): cinco oraciones seguidas en segunda persona, cero
  fallas. Es el patrón que hay que copiar en las restricciones de A, que tienen tres.

## El coste de la corrección

Ninguna reescritura toca el motor: no cambia un dato, ni una hora, ni un acto del mapa de 18
turnos. En prosa, once de las trece de A y tres de las de B se arreglan **girando la oración a
segunda persona**, que es lo que la propia ficha ya hace bien en otros sitios; ocho son filas de
tabla y se arreglan quitando el verbo. La carta se rehace entera, y al pasarla a tabla **baja**
el recuento de prosa. Ninguna de las 27 sube palabras por encima del techo de 450: A queda cerca
de 440 y B por debajo de 445, y si se apura la reescritura 7 se compensa sola.
