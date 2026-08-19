# Textos fuente — `sat-set-1-m1`, bloque Standard English Conventions (q16–q22)

Los siete textos que lee el estudiante en el bloque SEC del módulo de enrutamiento. **Solo
textos**: aquí no hay enunciados ni opciones, y no debe haberlos. Cada bloque lleva lo que el
redactor de ítems necesita para no romper el texto —qué regla examina, qué tramo exacto
sustituye el hueco, qué contenido tiene que ser la clave y qué opción crearía una segunda
clave— y nada más.

Plan de origen: [`sat-set-1-m1.md`](sat-set-1-m1.md), filas 16 a 22.
Parámetros de longitud: [`sat-ingles-blueprint.md`](../sat-ingles-blueprint.md) §2, puerta 7.

## Este bloque no funciona como los otros tres

En CS, II y EOI el texto es el objeto de la pregunta. Aquí es el soporte: el texto lleva un
hueco marcado `______` y las cuatro opciones son las cuatro maneras de rellenarlo. El
enunciado es siempre el mismo —«Which choice completes the text so that it conforms to the
conventions of Standard English?»— y no se pregunta por el sentido, sino por la norma del
inglés escrito estadounidense.

De ahí salen tres consecuencias que gobiernan todo lo que hay abajo:

1. **La regla tiene que decidir sola.** Cada texto está construido para que en ese hueco no
   quepa una segunda solución defendible por estilo. Donde había riesgo de que cupiera, lo
   dice el bloque del ítem con nombre y apellido (q16 y el colon, q20 y el punto y coma,
   q18 y la raya).
2. **La trampa 1 de la cabecera del plan se aplica al revés**, y es la excepción escrita en
   el propio plan: aquí lo que hace agramaticales a los distractores *es* la regla examinada.
   Un distractor de SEC que fuera gramatical sería el defecto.
3. **El hueco no coincide siempre con un signo de puntuación.** En varios ítems abarca la
   última palabra de la oración anterior, o la palabra siguiente, o el sintagma entero, para
   que las cuatro opciones se puedan escribir sin que la mayúscula o el orden de palabras
   regalen la respuesta. Cada bloque dice **qué tramo exacto sustituye el `______`**.

## Cómo se cuenta la longitud

College Board define «palabra» como **6 caracteres**. Se cuentan *todos* los caracteres del
texto —letras, cifras, espacios y puntuación— y se dividen entre 6. El rango 25–150 palabras
es por tanto **150–900 caracteres**, y es lo que mide `scripts/check-sat-exam.mjs` sobre
`stimulus.length / 6`.

Los recuentos de abajo se hacen **sobre la cadena con el hueco puesto** (`______`, seis
caracteres), que es exactamente lo que irá en `stimulus`. Las métricas de legibilidad
—oraciones y palabras por oración— se calculan sobre el texto **con la clave dentro**, porque
un párrafo con un hueco no tiene longitud media de oración.

| ítem | tipo | tema | dif. | regla | caracteres | palabras-SAT | oraciones | media/oración |
|---|---|---|---|---|---|---|---|---|
| q16 | boundaries | historia | 1 | empalme de comas | 490 | 81,7 | 5 | 18,4 |
| q17 | form-structure-sense | humanidades | 1 | concordancia con frase interpuesta | 463 | 77,2 | 5 | 16,6 |
| q18 | boundaries | ciencia | 2 | par de comas del inciso | 512 | 85,3 | 4 | 23,0 |
| q19 | form-structure-sense | historia | 2 | tiempo verbal por marcador temporal | 583 | 97,2 | 5 | 22,4 |
| q20 | boundaries | humanidades | 2 | dos puntos tras oración completa | 616 | 102,7 | 5 | 23,4 |
| q21 | form-structure-sense | ciencia | 3 | modificador inicial colgado | 511 | 85,2 | 4 | 25,0 |
| q22 | boundaries | historia | 3 | dos fronteras en la misma oración | 563 | 93,8 | 4 | 28,0 |

Los siete caben entre 150 y 900 caracteres, con margen amplio por los dos lados: el más largo
es q20 (616 = 102,7 palabras-SAT) y el más corto q17 (463 = 77,2). La longitud media de
oración sube a lo largo del bloque —16,6 → 28,0— acompañando la curva de dificultad que exige
la puerta 9, aunque en SEC quien manda es la regla, no el texto.

---

### q16 · boundaries · historia · dificultad 1

**Texto** (490 caracteres = 81,7 palabras-SAT)

> Before 1840, the cost of sending a letter in Britain fell on the person who received it, and the price rose with every mile the letter had traveled. Families who could not pay turned letters away at the door. In that year the post office moved the charge to the sender and fixed one low price for any distance within the country. The change looked ______ it decided who in Britain could afford to write at all. Ten years later, the number of letters carried each year had more than doubled.

**Métricas**: 5 oraciones · longitud media de oración 18,4 palabras · léxico exigente: fell on, charge, fixed, afford

**Regla que examina**: frontera entre dos oraciones independientes — **empalme de comas**.

**Qué tramo sustituye el hueco**: `minor; however,` — la última palabra de la primera oración
independiente, la frontera y el adverbio conjuntivo que abre la segunda. Con la clave dentro:
«The change looked minor; however, it decided who in Britain could afford to write at all.»

**Por qué la regla decide sola**: a los dos lados del hueco hay oraciones independientes
completas —*The change looked minor* / *it decided who in Britain could afford to write at
all*— y la segunda empieza por *however*, que es adverbio, no conjunción: no puede unir dos
oraciones con una coma delante. Eso deja fuera de golpe la coma sola (empalme) y la ausencia
de puntuación (frase seguida).

**Aviso al redactor de opciones**: el *colon* está a un paso de ser defendible en cualquier
par de oraciones donde la segunda explique a la primera. Aquí no lo es —*however* anuncia
contraste y los dos puntos anuncian explicación—, y por eso el texto lo lleva puesto. Tampoco
ofrezcas ninguna opción con conjunción coordinante (*but*, *and*): con dos oraciones
independientes, una coma más conjunción siempre es correcta.

> **Condición de clave única — vigilar en cada edición, no hay nada que arreglar.**
> Confirmado el 19 de agosto de 2026: tal como está publicado, q16 tiene una sola clave, y
> quien la sostiene es *however*. El adverbio va **dentro del tramo del hueco** —las cuatro
> opciones lo llevan— y es lo único que hace indefendibles los dos puntos, porque anuncia
> contraste donde los dos puntos anunciarían explicación. **Si alguien lo saca del tramo**
> (moviéndolo al texto fijo, sustituyéndolo por otro conector o dejando las opciones con solo
> el signo), el punto y coma y los dos puntos pasan a defenderse los dos y el ítem queda con
> dos claves. El aviso vale para cualquier reescritura futura del ítem, no solo para la
> primera: está repetido en la cabecera de `src/data/mocks/sat/blocks/sat-set-1-m1-sec.ts`.

**Hecho real usado**: Historia postal británica, hecho libre y de manual: hasta 1840 el porte
lo pagaba el destinatario y la tarifa dependía de la distancia; la reforma de ese año trasladó
el pago al remitente con una tarifa única baja, y el volumen de correo se disparó en la década
siguiente. La formulación es mía y no hay cifra exacta ni nombre propio en el texto.

---

### q17 · form-structure-sense · humanidades · dificultad 1

**Texto** (463 caracteres = 77,2 palabras-SAT)

> A dictionary is a record of how people write, not a list of permissions. In 2014 the editors of one Spanish dictionary accepted tuitear, a verb coined from the name of a social network. Several newspapers complained that the word was not proper Spanish. The editors replied that describing use is the whole point of the work. The list of terms that speakers add to a language each year ______ longer than the list the editors quietly drop, and it always has been.

**Métricas**: 5 oraciones · longitud media de oración 16,6 palabras · léxico exigente: permissions, coined, proper, quietly drop

**Regla que examina**: concordancia sujeto-verbo con una **frase preposicional y una relativa
interpuestas** entre el sujeto y el verbo.

**Qué tramo sustituye el hueco**: `is` — solo el verbo. Con la clave dentro: «The list of
terms that speakers add to a language each year is longer than the list the editors quietly
drop, and it always has been.»

**Por qué la regla decide sola**: el núcleo del sujeto es **list**, singular. Entre él y el
verbo van *of terms* y la relativa *that speakers add to a language each year*, que mete dos
plurales (*terms*, *speakers*) y un verbo en plural (*add*) justo antes del hueco. El
estudiante que concuerda con lo más cercano elige el plural; la norma concuerda con el núcleo.
La coda *and it always has been* remata con un pronombre singular que confirma la lectura sin
resolver el ítem por él (aparece después del hueco y solo funciona si ya se identificó el
núcleo).

**Aviso al redactor de opciones**: las cuatro opciones tienen que ser formas del mismo verbo
copulativo o de un tiempo compuesto que encaje con *longer* (*is / are / were / have been*).
Si una opción cambia de verbo léxico, el ítem deja de medir concordancia.

**Hecho real usado**: Lexicografía del español, hecho libre: la edición de 2014 del diccionario
académico incorporó *tuitear* y su familia, y hubo polémica pública sobre si esas voces eran
«correctas». El texto no nombra la institución ni cita a nadie: describe el episodio con
palabras propias y lo usa solo como escenario. La glosa («a verb coined from the name of a
social network») está para que el ítem no dependa de saber español ni de conocer la red.

---

### q18 · boundaries · ciencia · dificultad 2

**Texto** (512 caracteres = 85,3 palabras-SAT)

> Along the northern Pacific coast, kelp grows from the seafloor toward the light in stands thick enough to shelter fish, crabs, and young seals. Sea urchins feed on the base of the kelp, and where nothing feeds on the urchins, their numbers climb until the stand is stripped to bare rock. The sea otter, an animal lighter than most adult ______ eats enough urchins in a day to hold the forest in place. Ecologists reserve the word keystone for a species of that kind: remove it, and the structure around it falls.

**Métricas**: 4 oraciones · longitud media de oración 23,0 palabras · léxico exigente: kelp, stands, stripped, keystone, reserve

**Regla que examina**: elemento **no esencial delimitado por ambos lados** — el hueco cierra
el par que el texto ya abrió.

**Qué tramo sustituye el hueco**: `humans,` — la última palabra del inciso y la coma que lo
cierra. Con la clave dentro: «The sea otter, an animal lighter than most adult humans, eats
enough urchins in a day to hold the forest in place.»

**Por qué la regla decide sola**: la coma que abre el inciso —*The sea otter,*— ya está
escrita en el texto y el estudiante no la puede tocar. Un aposición no esencial se cierra con
el mismo signo con que se abrió, así que solo la coma cierra el par; sin signo, el sujeto y
su verbo quedan pegados a un aposición sin cerrar; con punto y coma o dos puntos se corta la
oración entre el sujeto (*The sea otter*) y su verbo (*eats*), que ninguna norma admite.

**Aviso al redactor de opciones**: la raya (*—*) es un distractor excelente **precisamente
porque parece correcta**: delimitaría bien el inciso si el texto lo hubiera abierto con raya,
y la única razón por la que falla es que el par no puede mezclar signos. Ese es el error del
estudiante que sabe que el inciso va marcado pero no mira con qué se abrió. No ofrezcas una
opción con coma *y* raya: sería doblemente mala por una razón distinta y el distractor deja
de estar vivo (puerta 5).

**Corregido el 19 de agosto de 2026**: el texto decía *…and where nothing feeds on the
urchins their numbers climb…*, sin la coma que cierra la subordinada antepuesta. Un ítem que
examina el par de comas del inciso no puede saltarse una coma obligatoria en su propio
párrafo, y además contradecía a q20 (*Once color could be bought sealed in a metal tube,*) y
a q21 (*as the layers beneath are pressed into solid ice,*) del mismo lote, que sí la ponen.
La coma añadida sube el recuento de 511 a 512 caracteres y no toca ninguna otra métrica.

**Hecho real usado**: Ecología marina de manual: la nutria marina controla las poblaciones de
erizo y su desaparición convierte los bosques de kelp del Pacífico norte en fondos pelados; es
el ejemplo canónico de especie clave. El hecho es libre y muy anterior a cualquier redacción
concreta; la formulación, la comparación de peso («lighter than most adult humans», cierta:
una nutria adulta pesa bastante menos que una persona) y la ausencia de cifras son mías. Sin
unidades imperiales y sin nombres propios, a propósito.

---

### q19 · form-structure-sense · historia · dificultad 2

**Texto** (583 caracteres = 97,2 palabras-SAT)

> Accounts of the Argentine wheat boom usually begin with the railway, and the emphasis is not misplaced. The line that crossed the district in 1883 cut the cost of moving a sack of grain to the port by more than half, and land that had been worth little sold within a year for six times its old price. But the farms that filled those wagons were not new. By the time the first train arrived, families in the district ______ wheat for more than thirty years, selling what they could to carts bound for the river. The railway did not create an agriculture; it found one and made it pay.

**Métricas**: 5 oraciones · longitud media de oración 22,4 palabras · léxico exigente: emphasis, misplaced, bound for, made it pay

**Regla que examina**: **tiempo verbal fijado por un marcador temporal del texto**, no por el
verbo de la oración vecina.

**Qué tramo sustituye el hueco**: `had been growing` — la forma verbal completa. Con la clave
dentro: «By the time the first train arrived, families in the district had been growing wheat
for more than thirty years, selling what they could to carts bound for the river.»

**Por qué la regla decide sola**: la oración trae dos marcadores que apuntan al mismo sitio.
*By the time the first train arrived* fija un punto en el pasado, y *for more than thirty
years* mide una duración que termina en ese punto: una acción anterior a otra acción pasada y
prolongada hasta ella pide pluscuamperfecto. Ni el presente ni el pretérito simple ni el
presente perfecto sostienen esa doble exigencia.

**Aviso al redactor de opciones**: el distractor que debe estar vivo es el **presente
perfecto** (*have been growing*), porque el texto abre en presente —*Accounts … usually begin
with the railway*— y quien ancla el tiempo en la oración vecina en vez de en el marcador cae
ahí. Es exactamente el error que la fila del plan pide provocar. No ofrezcas *had grown*: es
una segunda clave defendible (el aspecto continuo no lo decide ninguna regla, lo decide el
gusto).

**Hecho real usado**: Historia económica argentina, hecho libre y bien documentado: entre 1880
y 1900 la red ferroviaria abarató el transporte de grano hacia los puertos y el país pasó de
importar trigo a exportarlo, y las colonias agrícolas del litoral ya sembraban trigo desde la
década de 1850, o sea antes de que llegara el ferrocarril. El distrito sin nombre, la fecha de
1883, la caída de costo «a menos de la mitad» y el sextuplicarse del precio de la tierra son
invención mía: no reproducen ninguna serie estadística publicada.

---

### q20 · boundaries · humanidades · dificultad 2

**Texto** (616 caracteres = 102,7 palabras-SAT)

> Painters working in Europe in the 1830s are often described as heirs to a long tradition of craft, and in one narrow sense they were. A conservator who opens a paint box from any workshop of that decade finds ______ an earth or a mineral ground to powder for color, an oil pressed from seeds to bind it, and a tree resin thinned into varnish to give the dried surface its gloss. What changed after 1840 was not the recipe but who prepared it. Once color could be bought sealed in a metal tube, the apprentice who had spent his mornings at the grinding slab was no longer needed. Painters carried their work outdoors.

**Métricas**: 5 oraciones · longitud media de oración 23,4 palabras · léxico exigente: heirs, conservator, bind, varnish, grinding slab

**Regla que examina**: **dos puntos tras oración completa** para introducir una enumeración
explicativa.

**Qué tramo sustituye el hueco**: `the same three ingredients:` — el complemento del verbo
*finds* más los dos puntos. Con la clave dentro: «A conservator who opens a paint box from any
workshop of that decade finds the same three ingredients: an earth or a mineral ground to
powder for color, an oil pressed from seeds to bind it, and a tree resin thinned into varnish
to give the dried surface its gloss.»

**Por qué la regla decide sola**: los dos puntos solo pueden ir detrás de una oración completa,
y *A conservator … finds the same three ingredients* lo es. Lo que sigue **no** es una oración
independiente sino una enumeración de tres sintagmas nominales, y eso cierra por sí solo la
puerta al punto y coma —que exige oración completa a los dos lados— y al punto.

**Aviso al redactor de opciones**: la fila del plan pide que un distractor ponga los dos puntos
**tras oración incompleta**, y para eso las cuatro opciones tienen que variar la redacción del
tramo, no solo el signo. El distractor de ese tipo se escribe cerrando el hueco con una
subordinada colgada (del tipo *…finds three ingredients, which are:*), que es el error real de
quien cree que los dos puntos anuncian una lista y no que rematan una oración. Los otros dos
distractores viven de romper la misma regla por el otro lado: sin signo ninguno, y con punto y
coma delante de un fragmento. La enumeración lleva **coma de Oxford** (…*to bind it, and a
tree resin*…), que es la norma estadounidense y no está en juego en este ítem: no la conviertas
en la variable de ninguna opción.

**Hecho real usado**: Historia material de la pintura, hecho libre: hasta bien entrado el
siglo XIX el color se molía en el taller a partir de pigmento en polvo, aceite secante y
resina, y el tubo metálico plegable —patentado a comienzos de la década de 1840— permitió
comprar el color ya preparado y sacar la pintura al aire libre. Los tres ingredientes son
descripción genérica y correcta; no hay taller, pintor, patente ni nombre propio detrás, y el
texto no atribuye la invención a nadie.

---

### q21 · form-structure-sense · ciencia · dificultad 3

**Texto** (511 caracteres = 85,2 palabras-SAT)

> Snow that falls on the high plateau of East Antarctica never melts. Each year's fall is buried by the next, and as the layers beneath are pressed into solid ice, the gaps between the old snowflakes close into bubbles, each holding a little of the air of that year. A drilling team brings the ice up in a column, and the column is a stack of dated samples, the oldest near the bottom. Trapped in the ice for as long as eight hundred thousand years, ______ the atmosphere of a day that no one was there to record.

**Métricas**: 4 oraciones · longitud media de oración 25,0 palabras · léxico exigente: plateau, buried, layers, column, dated samples

**Regla que examina**: **modificador inicial no personal** — el sujeto de la oración principal
tiene que ser aquello de lo que el modificador habla. Tres opciones son gramaticales una a una
y solo una no deja el modificador colgado.

**Qué tramo sustituye el hueco**: `those bubbles preserve` — el sujeto de la principal y su
verbo. Con la clave dentro: «Trapped in the ice for as long as eight hundred thousand years,
those bubbles preserve the atmosphere of a day that no one was there to record.»

**Por qué la regla decide sola**: lo único que el texto describe atrapado en el hielo son las
burbujas —el párrafo las nombra y dice que cada una guarda aire de su año—. Ni el equipo de
perforación, ni la atmósfera, ni un gerundio nominalizado están atrapados en el hielo, así que
cualquier sujeto que no sean las burbujas produce una frase perfectamente gramatical y
falsa: el defecto está en la relación entre el modificador y el sujeto, que es justo la regla.

**Aviso al redactor de opciones**: dos cosas que este ítem pone en riesgo y que el texto ya
prepara.
1. **Puerta 2 (longitud de la clave).** La clave es un sintagma corto de tres palabras a
   propósito. Los tres distractores deben ser **iguales o más largos** (*researchers can
   recover*, *the drilling team can recover*, *recovering the bubbles gives us*): si la clave
   sale la más larga, este ítem se come parte del cupo de ≤ 8 del módulo por nada.
2. **Puerta 3 (solape léxico).** La clave repite *bubbles*, que está en el texto. Por eso el
   texto nombra también *drilling team*, *column* y *samples*: al menos dos distractores tienen
   que reutilizar una de esas palabras, o la clave será la única que rime con el párrafo y se
   podrá acertar emparejando.

**Hecho real usado**: Glaciología, hecho libre y publicado hasta la saciedad: en el hielo
antártico el aire queda encerrado en burbujas al compactarse la nieve, los sondeos profundos
del plateau oriental han recuperado hielo de en torno a 800.000 años y esas burbujas se leen
como muestras fechadas de la atmósfera del pasado. El texto no nombra sondeo, base ni programa
alguno, y no da ninguna cifra de composición del aire.

---

### q22 · boundaries · historia · dificultad 3

**Texto** (563 caracteres = 93,8 palabras-SAT)

> The case for the canal had been made in the language of freight since the 1790s: one barge could move in a single trip what forty carts moved in a day, and the mills of the upper valley could then sell flour beyond the county line. Digging began in 1825, in rock that the surveyors had promised would be soft. The finished ______ opened in the spring of 1836 to a crowd the county paper counted at four thousand. Within fifteen years a railway ran along the same valley floor, and the tolls the canal collected never covered the debt its investors had signed for.

**Métricas**: 4 oraciones · longitud media de oración 28,0 palabras · léxico exigente: freight, barge, surveyors, tolls, investors

**Regla que examina**: **dos fronteras en la misma oración** — una subordinada de relativo
intercalada que es elemento no esencial y que, por serlo, exige coma de apertura *y* coma de
cierre. Ninguna opción puede acertar las dos por casualidad.

**Qué tramo sustituye el hueco**: `canal, which had taken eleven years to dig,` — el núcleo del
sujeto más la relativa entera con sus dos comas. Con la clave dentro: «The finished canal,
which had taken eleven years to dig, opened in the spring of 1836 to a crowd the county paper
counted at four thousand.»

**Por qué la regla decide sola**: la relativa no restringe nada. En el párrafo hay un solo
canal y ya viene identificado por *The finished*, así que la información que añade la relativa
es prescindible y va entre comas por los dos lados; encima empieza por *which*, que en la
norma estadounidense marca relativa explicativa (la restrictiva usa *that* y va sin comas). Y
el dato que da la relativa —once años— es el que el propio texto ya permite calcular con 1825
y 1836, que es la comprobación de que no restringe: no identifica, comenta.

**Aviso al redactor de opciones**: el ítem nace de dos decisiones independientes —marcar la
apertura del inciso y marcar su cierre—, y esa es su razón de ser: quien acierta una frontera
y falla la otra tiene dónde caer. Las celdas candidatas son cuatro —abre y cierra / solo abre
/ solo cierra / ninguna—, pero **no se publican las cuatro tal cual**, por lo que dice la
cautela 1. Tres cautelas.
1. **La celda «ninguna» no es opcional (R5).** La primera redacción publicada dejó fuera la
   opción sin comas y montó las otras tres sobre signos desemparejados —coma solo al cerrar,
   punto y coma al abrir y coma al cerrar—. Resultado: la clave era **la única opción
   internamente coherente en puntuación**, y se acertaba emparejando signos sin leer una
   palabra del texto. Cada opción tiene que ser consistente consigo misma; que sea falsa lo
   tiene que decidir el párrafo, no su propio dibujo.
2. **Puerta 2.** La opción con las dos comas es, por construcción, dos caracteres más larga
   que la de sin comas, y si la clave es «la más larga» el ítem gasta cupo. Se neutraliza con
   el **par de punto y coma** (…*canal; which had taken eleven years to dig;*): 43 caracteres,
   exactamente los mismos que la clave, error distinto y perfectamente vivo —marcar el inciso
   a los dos lados con el signo que exige oración independiente a cada lado, cortando el
   sujeto de su verbo—.
3. **No cambies *which* por *that* en ninguna opción.** Sería un segundo eje de decisión
   —restrictiva contra explicativa— y el ítem dejaría de medir fronteras para medir dos cosas
   a la vez con una sola clave.

**La matriz que se publica** (19 de agosto de 2026), con la clave en la segunda posición que
fija el plan:

| opción | forma | por qué es coherente consigo misma | qué la descarta |
|---|---|---|---|
| `canal which had taken eleven years to dig` | sin signos | ningún signo a ninguno de los dos lados | el párrafo: un solo canal, ya identificado por *The finished*, y los once años ya se deducen de 1825 y 1836 → la relativa no restringe |
| `canal, which had taken eleven years to dig,` | par de comas — **clave** | mismo signo al abrir y al cerrar | — |
| `canal; which had taken eleven years to dig;` | par de punto y coma | mismo signo al abrir y al cerrar | el punto y coma exige oración independiente a los dos lados y aquí corta sujeto y verbo |
| `canal, which had taken eleven years to dig` | solo apertura | un solo signo, y la opción termina ahí: nada dentro de la cadena delata el fallo | el párrafo: la oración sigue con *opened in the spring of 1836*, que sin la coma de cierre queda dentro de la relativa |

La celda que se retiró es **solo cierre** (…*canal which had taken eleven years to dig,*):
una coma de cierre sin apertura se ve mal desde dentro de la propia opción, sin mirar el
texto, y por eso era la que regalaba la poda.

**Hecho real usado**: Historia del transporte del siglo XIX, hecho libre: los canales se
justificaron durante décadas por el abaratamiento del flete frente al acarreo por carretera y
quedaron desplazados por el ferrocarril pocos años después de abrirse, con peajes que a menudo
no cubrieron la deuda de construcción. El valle, el condado, las fechas de 1825 y 1836, el
periódico, la multitud de cuatro mil y la proporción «una barcaza contra cuarenta carros» son
invención mía y no describen ningún canal concreto.

---

## Lo que este lote da por resuelto y lo que no

**Regla nombrable en los siete (requisito del bloque).** Ninguna clave depende de una
preferencia de estilo: empalme de comas (q16), concordancia con interpuesto (q17), par de
comas del inciso (q18), tiempo por marcador temporal (q19), dos puntos tras oración completa
(q20), modificador colgado (q21) y doble frontera del inciso intercalado (q22). Los siete
nombres pasan tal cual al campo `regla` del `SatItemMeta`. **Terreno en disputa evitado**: no
hay *who/whom*, ni *they* singular, ni preposición final, ni concordancia de nombre colectivo,
ni *than I/than me*.

**Norma estadounidense.** Coma de Oxford en las dos enumeraciones del lote (q18 *fish, crabs,
and young seals*; q20 los tres ingredientes), *toward* sin *s* en q18, ortografía y puntuación
de EE. UU. en todo el bloque, *traveled* con una ele en q16, y la distinción *which*
explicativa / *that* restrictiva sosteniendo q22.

**Equidad (puerta 10).** Ningún texto pide un dato que el estudiante de Bucaramanga no tenga
dentro: no hay sistema escolar estadounidense, ni deporte escolar, ni festividad, ni medida
imperial. Las tres referencias que podrían no ser cotidianas —el bosque de kelp de q18, la caja
de pinturas de q20 y el testigo de hielo de q21— quedan explicadas en la propia frase que las
introduce. La única palabra en español, *tuitear* (q17), va glosada en inglés y el ítem se
resuelve sin ella.

**Originalidad (puerta 11).** Los siete textos están escritos aquí. Donde hay hecho real
—reforma postal británica de 1840, incorporación de *tuitear* al diccionario, nutria marina
como especie clave, ferrocarril y trigo en la Argentina de 1880, tubo de pintura metálico,
burbujas de aire en el hielo antártico, canales desplazados por el ferrocarril— el hecho es
libre y la formulación es propia. Todas las cifras concretas que acompañan a esos hechos
(1883, seis veces el precio de la tierra, cuatro mil personas, once años, cuarenta carros) son
inventadas a propósito, para no acercarse a ninguna serie publicada.

**Curva de dificultad (puerta 9).** El bloque va 1-1-2-2-2-3-3 **sin agrupar por tipo**:
boundaries y form-structure-sense se alternan (B, F, B, F, B, F, B), que es la excepción
verificada de College Board y está escrita así en el plan. Los temas tampoco se repiten en
posiciones contiguas: historia, humanidades, ciencia, historia, humanidades, ciencia, historia
—y el empalme con los bloques vecinos también aguanta (q15 ciencia → q16 historia; q22
historia → q23 humanidades)—.

**Riesgos vivos que quedan anotados, no corregidos.** Uno solo, y es de q16: la clave única
depende de que *however* siga **dentro del tramo del hueco**. Mientras esté ahí, los dos
puntos son indefendibles y solo el punto y coma sostiene la frontera; el día que se saque,
punto y coma y dos puntos se defienden los dos y el ítem tiene dos claves. No es un defecto
del ítem publicado: es la condición que lo mantiene sano, y por eso se escribe aquí y en la
cabecera del bloque en código.

**Lo que falta y no es de este puesto**: enunciados, opciones, claves y el registro de qué
error representa cada distractor (puerta 5). Los textos están escritos para admitir la clave
que fija el plan —D, B, A, C, D, A, B— pero las opciones las escribe el redactor de ítems, y
cada bloque de arriba lleva el aviso de qué opción concreta crearía una segunda clave o
gastaría cupo de la puerta 2.
