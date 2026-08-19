# Textos fuente — `sat-set-1-m1`, bloque Craft and Structure (q01–q08)

Los ocho textos que lee el estudiante en el bloque CS del módulo de enrutamiento. **Solo
textos**: aquí no hay enunciados ni opciones, y no debe haberlos. Cada bloque lleva lo que
el redactor de ítems necesita saber para no romper el texto —qué palabra se examina, qué
oración se señala, qué discriminador hace única la clave— y nada más.

Plan de origen: [`sat-set-1-m1.md`](sat-set-1-m1.md), filas 1 a 8.
Parámetros de longitud: [`sat-ingles-blueprint.md`](../sat-ingles-blueprint.md) §2, puerta 7.

## Cómo se cuenta la longitud

College Board define «palabra» como **6 caracteres**. Se cuentan *todos* los caracteres del
texto —letras, cifras, espacios y puntuación— y se dividen entre 6. El rango 25–150 palabras
es por tanto **150–900 caracteres**, y es lo que mide `scripts/check-sat-exam.mjs` sobre
`stimulus.length / 6`. Los recuentos de abajo salen de contar la cadena exacta que está en
el bloque de cita, sin el prefijo `> ` del markdown.

| ítem | tipo | tema | dif. | caracteres | palabras-SAT | oraciones | media/oración |
|---|---|---|---|---|---|---|---|
| q01 | words-in-context | ciencia | 1 | 444 | 74,0 | 5 | 15,6 |
| q02 | words-in-context | literatura | 1 | 415 | 69,2 | 6 | 13,3 |
| q03 | words-in-context | historia | 2 | 559 | 93,2 | 4 | 24,8 |
| q04 | words-in-context | humanidades | 3 | 539 | 89,8 | 5 | 20,2 |
| q05 | text-structure-purpose | literatura | 1 | 505 | 84,2 | 6 | 16,7 |
| q06 | text-structure-purpose | ciencia | 2 | 628 | 104,7 | 5 | 21,4 |
| q07 | text-structure-purpose | historia | 3 | 811 | 135,2 | 4 | 32,3 |
| q08 · texto 1 | cross-text-connections | ciencia | 3 | 421 | 70,2 | 3 | 23,3 |
| q08 · texto 2 | cross-text-connections | ciencia | 3 | 398 | 66,3 | 4 | 18,0 |
| **q08 · suma con etiquetas** | | | | **835** | **139,2** | 7 | 20,3 |

Los nueve textos caben entre 150 y 900 caracteres. El más largo es q07 (811 = 135,2
palabras-SAT) y el más ajustado al techo es la suma de q08 (835 = 139,2). El más corto,
q02 con 415, sobra por casi el triple del mínimo.

---

### q01 · words-in-context · ciencia · dificultad 1

**Texto** (444 caracteres = 74,0 palabras-SAT)

> Salt marshes look bare from a distance, but few habitats produce more life. Twice a day the tide floods the grass with seawater and leaves behind mud full of decaying plants. That mud feeds crabs, worms, and snails, which in turn feed fish and wading birds. A single hectare of marsh supports thousands of these animals, far more than the same area of open, sandy coast. In one plot no larger than a classroom, biologists counted sixty species.

**Métricas**: 5 oraciones · longitud media de oración 15,6 palabras · léxico exigente: habitats, decaying, wading, hectare

**Palabra que se examina**: **supports**, en «A single hectare of marsh supports thousands of these animals».

**Cómo lo fija el contexto**: Las dos oraciones previas encadenan *feeds… feed…*: el sentido es «sostener/mantener con vida». La acepción de diccionario más frecuente —«sostener físicamente» o «respaldar una opinión»— no cabe con *thousands of these animals* como objeto, pero es el distractor natural.

**Hecho real usado**: Hecho libre de ecología general: las marismas salobres están entre los ecosistemas más productivos del planeta y su detrito alimenta una cadena de invertebrados, peces y aves limícolas. Redacción y cifras del ejemplo (una hectárea, sesenta especies en una parcela) son mías; no reproducen ningún estudio concreto.

---

### q02 · words-in-context · literatura · dificultad 1

**Texto** (415 caracteres = 69,2 palabras-SAT)

> The bakery stood at the top of the hill. From its door Rosalía could see the whole town. Each morning at six she rang the brass bell above the counter, though the bell was not really needed. Then she leaned out and called that the first loaves were ready. Her voice carried farther than the bell did. Families in the lanes below could not see the bakery, but they heard her, and one by one they started up the hill.

**Métricas**: 6 oraciones · longitud media de oración 13,3 palabras · léxico exigente: brass, loaves, lanes, leaned

**Palabra que se examina**: **carried**, en «Her voice carried farther than the bell did».

**Cómo lo fija el contexto**: Uso intransitivo con un comparativo de distancia frente a la campana, y la oración siguiente confirma el efecto: quienes no ven la panadería la oyen. El sentido es «llegar lejos, oírse a distancia».

> ⚠️ **Corrección (19 ago 2026).** Aquí decía que la estructura de la frase descarta «de golpe» las acepciones que piden complemento directo, «sin necesidad de matizar». Eso resultó ser el defecto, no la virtud: dos auditores independientes comprobaron que con esas opciones el ítem se resuelve sin leer el pasaje, que es justo lo que castiga la puerta 6. Las cuatro opciones tienen que encajar en el hueco y fallar por **sentido**. El modelo bueno es q01 de este mismo bloque.

**Hecho real usado**: Ninguno, es ficción. Prosa narrativa original.

---

### q03 · words-in-context · historia · dificultad 2

**Texto** (559 caracteres = 93,2 palabras-SAT)

> When the council of the river port of Elmsford met in 1889 to consider a filtration plant, the three engineers it had hired did not simply approve the design. They agreed that beds of sand would remove most of what made the river water cloudy, but they warned that those beds would clog within a year unless the town also built a settling basin upstream, and they declined to sign until the basin appeared in the budget. Historians who read the engineers' report as an endorsement therefore miss its tone. Their support was qualified, and the council knew it.

**Métricas**: 4 oraciones · longitud media de oración 24,8 palabras · léxico exigente: filtration, settling basin, endorsement, clog, upstream

**Palabra que se examina**: **qualified**, en «Their support was qualified, and the council knew it».

**Cómo lo fija el contexto**: La oración que la contiene no da ninguna pista: hay que haber leído antes que los ingenieros pusieron una condición y se negaron a firmar sin ella, y que leer el informe como un respaldo llano «pierde su tono». Sentido: «limitado, con reservas». Quien lea solo la línea cae en la acepción de diccionario más frecuente («competente, con credenciales»), que además encaja gramaticalmente.

**Hecho real usado**: Hecho libre de historia de la ingeniería sanitaria: los filtros lentos de arena eran la técnica municipal habitual para clarificar agua de río a finales del siglo XIX, y se colmatan si el agua llega con demasiado sedimento (de ahí la balsa de decantación previa). Elmsford, el año 1889 y los tres ingenieros son invención mía: no hay ciudad ni informe reales detrás.

---

### q04 · words-in-context · humanidades · dificultad 3

**Texto** (539 caracteres = 89,8 palabras-SAT)

> Critics who praise the economy of Hanne Lindqvist's late woodcuts often mistake what they are praising. Her final prints contain a fraction of the lines of the crowded harbor scenes that made her name: a gull, a mast, and the edge of a wave may be all that remains, and yet the scene reads at once. This was not a matter of working faster. Her notebooks record that one late print occupied her for four months, most of that time spent deciding which of thirty marks to cut away. She would not state what the eye could be trusted to supply.

**Métricas**: 5 oraciones · longitud media de oración 20,2 palabras · léxico exigente: economy, woodcuts, prints, occupied, supply

**Palabra que se examina**: **economy**, en «Critics who praise the economy of Hanne Lindqvist's late woodcuts…».

**Cómo lo fija el contexto**: Sentido: «parquedad de medios» —decir con cuatro líneas lo que antes pedía treinta—. El texto incluye a propósito el discriminador que deja una sola respuesta defendible: «This was not a matter of working faster» más los cuatro meses por estampa cierran la puerta a *rapidez*.

> ⚠️ **Corrección (19 ago 2026).** Aquí se daba por hecho que ese mismo discriminador cerraba también la puerta a *efficiency*. No la cierra: los cuatro meses solo muerden si *economy* se lee como propiedad del proceso, y el enunciado la predica de las estampas. *Efficiency* era una segunda clave defendible y hubo que sustituirla. Con este texto, **todo sinónimo parcial de *restraint* es una segunda clave**: las cuatro opciones tienen que abrir dimensiones distintas (quedaron: ritmo de trabajo · disposición de las partes · parquedad de medios · precio). Ojo al redactar opciones: la palabra «restraint» se retiró del texto para que la clave no esté escrita dentro (puerta 3, solape léxico).

**Hecho real usado**: Ninguno, es ficción. Hanne Lindqvist es una grabadora inventada; el vocabulario de la xilografía (planchas, líneas, marcas que se retiran) es de dominio general y el texto lo explica solo. Ninguna afirmación se atribuye a una persona real.

---

### q05 · text-structure-purpose · literatura · dificultad 1

**Texto** (505 caracteres = 84,2 palabras-SAT)

> Amara had planned the walk to the lighthouse the way she planned everything, on paper and well in advance. She knew the distance, the hours of the tide, and the time the keeper unlocked the door for visitors. She had even packed a second pair of socks. Then the path ended at a stream that no map of hers showed. For a long minute she stood on the bank with the tide table in her hand, and the paper told her nothing at all. She put it away and looked, for the first time that morning, at the land itself.

**Métricas**: 6 oraciones · longitud media de oración 16,7 palabras · léxico exigente: lighthouse, keeper, bank, tide table

**Oración señalada (la que se subraya en el ítem)**: «Then the path ended at a stream that no map of hers showed.»

**Qué hace esa oración**: Es el giro: separa las tres oraciones de preparación exhaustiva de las tres de preparación inútil. Su función —marcar el punto en que los datos que trae dejan de servirle— no coincide con lo que dice, que es solo que hay un arroyo. Los distractores de contenido («describe el paisaje», «explica por qué salió temprano») quedan claramente falsos con el texto delante, que es lo que pide una dificultad 1.

**Hecho real usado**: Ninguno, es ficción. Prosa narrativa original. «Tide table» queda explicado dentro del texto («the hours of the tide» → «the paper»), que es lo que necesita un estudiante sin costa cerca.

---

### q06 · text-structure-purpose · ciencia · dificultad 2

**Texto** (628 caracteres = 104,7 palabras-SAT)

> For part of each year, rain turns wide stretches of the Amazon lowlands into flooded forest, and the water stands deep enough for fish to swim among the trunks. Botanists working there noticed that seedlings of one palm were rising far from any adult tree, on ground that no current could have reached. Drifting fruit could not explain the pattern, so the team proposed that fish were eating the fruit and depositing the seeds elsewhere. To test the idea, they netted fish during the flood, examined the stomachs of more than four hundred, and planted every intact seed they recovered. Roughly a quarter of those seeds sprouted.

**Métricas**: 5 oraciones · longitud media de oración 21,4 palabras · léxico exigente: seedlings, intact, depositing, stretches, sprouted

**Estructura que debe leer el estudiante**: observación (plántulas donde el agua no llega) → descarte de la explicación fácil e hipótesis (los peces las llevan) → prueba (redes, contenido estomacal, siembra) → resultado. Cada tramo está en una oración distinta, así que un distractor que describa bien solo la prueba, o solo la observación, es verdadero y aun así falla.

**Hecho real usado**: Hecho libre y bien documentado: en la llanura amazónica inundable los peces frugívoros tragan fruta y dispersan semillas viables a distancias que ningún animal terrestre alcanza (ictiocoria). El fenómeno es real; la palmera sin nombre, el equipo, los cuatrocientos peces y el cuarto de semillas germinadas son invención mía, para no rozar las cifras de ningún estudio publicado.

---

### q07 · text-structure-purpose · historia · dificultad 3

**Texto** (811 caracteres = 135,2 palabras-SAT)

> The spread of reading in the northern provinces during the eighteenth century has usually been credited to the schools: parish records show that the number of village schoolmasters tripled between 1720 and 1790, and literacy, measured by signatures on marriage contracts, rose along with it. A second group of historians has questioned the direction of that relationship. The villages that gained schools, they note, were also the villages where merchants began keeping written accounts and where paper first became cheap; the schools may therefore record a demand for reading rather than create it. The objection is a fair one, but narrower than its authors allow: it fits the market towns their evidence comes from, and it says little about the upland parishes, where schools arrived long before commerce did.

**Métricas**: 4 oraciones · longitud media de oración 32,3 palabras · léxico exigente: credited, parish records, literacy, objection, upland parishes

**Las dos posturas**: (1) las escuelas explican la difusión de la lectura; (2) escuelas y alfabetización aparecen juntas porque el comercio y el papel barato crearon antes la demanda.

**Qué hace el autor con la segunda**: La admite y acto seguido le recorta el alcance: vale para las ciudades de mercado de donde salen sus datos y no para las parroquias de montaña, donde el orden temporal se invierte. No la refuta ni la adopta, y esa distinción —conceder y limitar— es todo el ítem.

**Hecho real usado**: Método real de historia social: la alfabetización de los siglos XVIII y XIX se mide por la proporción de quienes firman —en lugar de marcar una cruz— en registros parroquiales y contratos matrimoniales, y existe una discusión historiográfica genuina sobre si las escuelas crearon la demanda de lectura o la registraron. Las «provincias del norte», las fechas y el dato de los maestros triplicados son invención mía: no hay región ni serie estadística reales detrás.

---

### q08 · cross-text-connections · ciencia · dificultad 3

**Textos** (texto 1: 421 caracteres = 70,2 palabras-SAT · texto 2: 398 caracteres = 66,3 palabras-SAT · **suma con etiquetas: 835 caracteres = 139,2 palabras-SAT**)

> **Text 1**
>
> Songbirds in cities sing at a higher pitch than members of the same species in nearby woodland. Traffic noise sits at low frequencies, so a song pitched above it carries through the din unmasked. Having tracked one urban population for thirty years, researchers argue that the shift is an adaptation: males whose songs rise clear of the traffic are the ones that attract mates, and the population has changed accordingly.
>
> **Text 2**
>
> That city birds sing higher is not in doubt; the explanation is. Birds raise their volume in noise, and in songbirds pitch and loudness come from the same set of muscles, so lifting one lifts the other. The urban songs on record are also the loudest, and their added pitch is about what that mechanical link predicts. Nothing needs to evolve to produce a change a bird can make within an afternoon.

**Métricas**: texto 1, 3 oraciones y 23,3 palabras por oración; texto 2, 4 oraciones y 18,0 palabras por oración · léxico exigente: pitch, frequencies, unmasked, adaptation, mechanical

**Afirmación del texto 1 sobre la que gira el ítem**: «the shift is an adaptation»: las hembras eligen a los machos que se oyen sobre el tráfico y la población ha cambiado por selección.

**Qué comparten y en qué difieren**: Comparten el hecho —las aves urbanas cantan más agudo— y hasta los datos. Difieren solo en la interpretación: el texto 2 no niega el patrón («not in doubt»), propone una causa mecánica y cierra con que el cambio ocurre en una tarde, o sea dentro de la vida de un individuo, que es exactamente lo que una explicación por selección no necesita.

**Longitud**: Texto 1 421 caracteres + texto 2 398 = 819; con las etiquetas «Text 1» y «Text 2» dentro del `stimulus`, 834-835 caracteres = 139,0-139,2 palabras-SAT según cuántos saltos de línea separen los bloques. Dentro del rango, con unos 65 caracteres de margen antes del tope de 900. Si al maquetar se añaden más etiquetas o corchetes, hay que volver a medir.

**Hecho real usado**: Debate científico real: está bien establecido que muchas aves cantoras urbanas cantan más agudo que las de bosque, y hay una discusión abierta entre quienes lo leen como adaptación al ruido de baja frecuencia y quienes lo explican como subproducto del efecto Lombard —cantar más fuerte sube el tono, porque en la siringe amplitud y frecuencia dependen de la misma musculatura—. Los hechos son reales y de dominio público; la redacción, los treinta años de seguimiento y la ausencia de nombres propios son míos.

---

## Lo que este lote da por resuelto y lo que no

**Equidad (puerta 10).** Ninguno de los ocho textos pide un dato que el estudiante de
Bucaramanga no tenga dentro: no hay sistema escolar estadounidense, ni deporte escolar, ni
festividad local, ni medida imperial. Las únicas unidades son métricas (una hectárea) y las
dos referencias que podrían no ser cotidianas —la tabla de mareas de q05 y el filtro de
arena de q03— quedan explicadas en la propia frase que las introduce.

**Originalidad (puerta 11).** Los nueve textos están escritos aquí. Donde hay un hecho real
—productividad de las marismas, filtros lentos de arena, ictiocoria amazónica, alfabetización
medida por firmas, canto agudo de las aves urbanas— el hecho es libre y la formulación es
propia; las cifras y los nombres propios que acompañan a esos hechos son inventados a
propósito, para no acercarse a las de ningún estudio publicado.

**Registro.** Divulgación seria en ciencia e historia, crítica académica en q04, prosa
narrativa en q02 y q05. Ni conversacional ni florido. Inglés estadounidense: coma de Oxford
en las cuatro enumeraciones del lote, *farther* en q02, ortografía y puntuación de EE. UU.

**Lo que falta y no es de este puesto**: enunciados, opciones, claves y el registro de qué
error representa cada distractor (puerta 5). Los textos están escritos para admitir la clave
que fija el plan —B, D, A, C, A, B, D, C— pero la clave la escribe el redactor de ítems.
