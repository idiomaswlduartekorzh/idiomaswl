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
| q22 | boundaries | historia | 3 | dos fronteras en la misma oración | 856 | 142,7 | 6 | 28,0 |

Los siete caben entre 150 y 900 caracteres, con margen por los dos lados: el más largo es q22
(856 = 142,7 palabras-SAT, cuarenta y cuatro caracteres por debajo del tope, que es el precio
de que su sintaxis sea la más densa del bloque) y el más corto q17 (463 = 77,2). La tabla va por identificador, que **ya no es el orden en que se responden**: el
calibrador de dificultad devolvió el bloque el 19 de agosto de 2026 y `q19` y `q20` se
intercambiaron de posición sin cambiar de identificador, así que la secuencia publicada es
**q16 · q17 · q18 · q20 · q19 · q21 · q22**. En ese orden la longitud media de oración sube
—18,4 · 16,6 · 23,0 · 23,4 · 22,4 · 25,0 · 28,0—, acompañando la curva de dificultad que exige
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

**Corregido la tarde del 19 de agosto de 2026, y es la cuarta versión.** Las tres anteriores, por
orden: una relativa explicativa intercalada (*canal, which had taken eleven years to dig,*), que
el método R8 retiró porque 7 de 8 solucionadores la acertaban sin ver el texto —el inciso entre
dos comas es el dibujo canónico de un ejercicio de manual—; un predicado compuesto, que arregló
la prueba a ciegas y **perdió por el camino la segunda decisión** que encarga la fila 22 del plan
(el ítem se quedó en 9 sobre 15 y el bloque entero sin un solo ítem en la banda difícil:
bloqueante B2 del calibrador); y la de la mañana del 19 de agosto, que devolvió las dos
decisiones y subió a 12 sobre 15 **pero con dos claves**, que es puerta eliminatoria.

**Qué estaba mal por la mañana, porque es lo que no hay que repetir.** La primera decisión
—esencial frente a no esencial— se apoyaba en que «built with money raised in the valley itself»
fuera lo único que dijera de cuál de los dos canales se habla. No lo era: el predicado del hueco
decía «opened in 1836» y, con la línea vieja cavada «in the 1790s» y el segundo empezado «in
1825», la fecha de apertura bastaba para saber cuál era. Aplicada la prueba de supresión, «The
canal opened in 1836» se resolvía solo; el modificador comentaba, y el par de comas era tan
defendible como la clave.

**Qué cambia en esta versión.** De los dos caminos posibles se toma el primero —quitar el
identificador rival— y no el segundo —cambiar la primera decisión—, porque la decisión
esencial/no esencial es la que pide la fila 22 del plan y la que el bloque necesita para tener
banda difícil. Dos cambios, y ninguno más:

1. **El predicado del hueco pasa de `opened in 1836` a `carried the heavier traffic`.** No lleva
   fecha, y el texto **no dice en ninguna parte cuál de los dos canales llevó más tráfico**: el
   condado se pasa treinta años midiendo los ingresos de uno contra los del otro y el resultado
   no aparece hasta esta oración. El predicado deja de identificar y pasa a depender del párrafo
   incluso para entenderse: «the heavier traffic», ¿más que cuál? Solo el texto lo dice.
2. **La última oración deja de empezar por «Within fifteen years»**, que colgaba del 1836 que ya
   no existe —y que, sin él, solo tenía 1825 donde anclarse, el mismo defecto que el auditor
   lingüístico señaló en L-12 con «that winter»—. Ahora dice que **ninguna** de las dos compañías
   había saldado su deuda cuando llegó el ferrocarril, con lo que la mitad derecha de la oración
   del hueco tampoco identifica: «the tolls it collected never covered the debt» vale igual para
   las dos.

Se quedan como estaban las dos fechas de obra (1790s y 1825), que sostienen el «within forty
years of each other» de la primera oración, y se queda el tipo de discurso: **argumento
comparativo-causal**, tesis en la primera oración y las cinco siguientes como prueba, no crónica.
Es lo que el calibrador arbitró para poner el eje T en 3, y no se toca.

**Texto** (856 caracteres = 142,7 palabras-SAT)

> Two canals were cut through the same range of hills within forty years of each other, and what separated them in the end was not the engineering but the direction the money came from. The older line had been dug in the 1790s with money from merchants in the capital, none of whom ever saw the hills they had paid to cut through. Digging on the second began in 1825, in rock that the surveyors had called soft, and the estimate had doubled before the crews were halfway through. The two lines ended at the same river landing, and the county spent thirty years measuring the receipts of one against the receipts of the other. The ______ the tolls it collected never covered the debt its investors had signed for. A railway ran along the same valley floor before either company had cleared its debt, and both sold their works for whatever the stone was worth.

**Métricas**: 6 oraciones · longitud media de oración 28,0 palabras (la más alta del bloque, y
por encima del umbral de 24 que el calibrador fija para T = 3) · 12 palabras de ocho letras o
más · léxico exigente: engineering, merchants in the capital, surveyors, estimate, river landing,
tolls, investors, works

**Regla que examina**: **dos fronteras en la misma oración**, y ninguna opción acierta las dos
por casualidad.

1. **Elemento esencial frente a no esencial.** El párrafo mantiene dos canales vivos y la oración
   del hueco no da ningún otro dato que separe uno del otro, así que el tramo del dinero
   identifica, y lo que identifica no se separa con comas; entre comas solo va lo que comenta.
2. **Frontera entre oraciones independientes sin conjunción coordinante.** Dos oraciones con
   sujeto y verbo propios, sin *and* ni *but* que las una, se separan con punto y coma, nunca
   con coma.

**Qué tramo sustituye el hueco**: `canal built with money raised in the valley itself carried the
heavier traffic;` — el núcleo del sujeto, el modificador entero, el predicado de la principal y
la frontera con la oración siguiente. Con la clave dentro: «The canal built with money raised in
the valley itself carried the heavier traffic; the tolls it collected never covered the debt its
investors had signed for.»

**Por qué el párrafo decide solo la primera decisión — la prueba de supresión, hecha y escrita**

Se tapa el modificador y se lee la oración entera, con el párrafo delante:

> The canal carried the heavier traffic; the tolls it collected never covered the debt its
> investors had signed for.

Pregunta: ¿de cuál de los dos canales habla? El párrafo no lo puede decir, y se comprueba sitio
por sitio, que son los cuatro donde podría esconderse una pista:

| dónde podría estar la pista | qué dice el texto | ¿identifica? |
|---|---|---|
| una fecha en la oración del hueco | no hay ninguna: el predicado es «carried the heavier traffic» | **no** |
| el tráfico o los ingresos | «the county spent thirty years measuring the receipts of one against the receipts of the other»; el texto nunca dice cuál de los dos ganó esa cuenta | **no** |
| la deuda impagada | «before either company had cleared its debt»: ninguna de las dos la saldó, así que «never covered the debt» no señala a una | **no** |
| las dos fechas de obra (1790s, 1825) | son de excavación, no de apertura, y la oración del hueco no trae fecha con que compararlas | **no** |

Sin el modificador, la oración se queda sin referente. Eso es, por definición, un elemento
**esencial**: va sin comas, y la clave es B. En la dirección contraria vale el mismo argumento:
el par de comas de A y D afirma que «The canal» ya está identificado antes de leerlas, y el
párrafo dice lo contrario —abre con «Two canals» y la oración inmediatamente anterior al hueco
los mantiene vivos a los dos y los nombra a los dos, «the receipts of one against the receipts of
the other»—.

La identificación positiva se hace **por exclusión**, y es lo que sostiene el eje de localización
en 3: la segunda oración dice de dónde salió el dinero de **uno** solo (*money from merchants in
the capital*, la línea vieja), el texto **nunca** dice que el segundo se pagara con dinero de la
comarca, y hay que deducirlo cruzando dos oraciones que no están juntas.

A la derecha del hueco, «the tolls it collected never covered the debt its investors had signed
for» es oración con sujeto y verbo propios y no trae conjunción: punto y coma. La última oración
del texto enseña el otro caso, con la coma delante de *and*.

**Por qué no se puede resolver sin el texto**: las cuatro opciones llevan **las mismas palabras**
y se diferencian solo en dos signos, que es el modelo de q18 y q20. La matriz es completa —las
dos decisiones cruzadas— y ninguna opción es incoherente consigo misma: lo que tumba a cada una
es el párrafo, no su propio dibujo (R7). El predicado se eligió además sin ninguna marca que
delate la decisión 1 a quien no ve el texto: no dice «of the two» ni nombra al otro canal, así
que a ciegas no hay manera de saber que «The canal» necesita ser identificado. Y la decisión 2
vive **fuera** de la opción, en la oración que sigue al hueco: sin el texto no se sabe siquiera
que detrás hay una oración independiente.

| opción | decisión 1 · el modificador | decisión 2 · la frontera | |
|---|---|---|---|
| `canal, built with money raised in the valley itself, carried the heavier traffic;` | comenta | punto y coma | media |
| `canal built with money raised in the valley itself carried the heavier traffic;` | identifica | punto y coma | **clave** |
| `canal built with money raised in the valley itself carried the heavier traffic,` | identifica | coma | media |
| `canal, built with money raised in the valley itself, carried the heavier traffic,` | comenta | coma | ninguna |

Las dos heurísticas de quien no lee apuntan fuera de la clave: la de «un participio detrás del
sujeto es un inciso, va entre comas» lleva a la primera o a la cuarta, y la de «cuantas menos
comas, mejor» lleva a la tercera. La clave es la combinación mixta, y solo el párrafo la elige.
Las cuatro miden 81, 79, 79 y 81 caracteres en el orden A-D: la clave no es la más larga y no
gasta cupo de la puerta 2.

**Aviso al redactor de opciones**: cuatro cautelas, y las cuatro son condiciones de clave única.

1. **No dejes un solo canal en el texto**, ni digas en ninguna oración que el segundo se pagó
   por suscripción local. Cualquiera de las dos cosas convierte el modificador en un comentario
   y la opción del par de comas pasa a ser correcta: el ítem tendría dos claves.
2. **No metas en la oración del hueco ningún dato que identifique por su cuenta**: ni fecha de
   apertura, ni el resultado de la comparación de ingresos, ni una deuda que solo tenga uno de
   los dos. Aquí es donde cayó la versión de la mañana del 19 de agosto, con «opened in 1836».
   La comprobación es la prueba de supresión de arriba, y hay que rehacerla entera cada vez que
   se toque una palabra del párrafo o del predicado.
3. **No pongas conjunción detrás del hueco.** Si «the tolls it collected…» llegara precedido de
   *and*, la coma sería correcta y la mitad derecha del ítem se caería.
4. **Ni *which* ni *that* en ninguna opción.** Una relativa explícita marcaría por sí sola si el
   tramo comenta o identifica y regalaría la primera decisión sin leer el párrafo, que es
   exactamente lo que hundió la primera versión de este ítem. El participio no marca nada: sirve
   igual de bien para las dos lecturas, y esa es su gracia.

**Hecho real usado**: Historia del transporte del siglo XIX, hecho libre: en muchos valles
convivieron un canal antiguo financiado desde fuera y otro pagado por suscripción de los
propios vecinos, los dos justificados por el abaratamiento del flete frente al acarreo y los
dos desplazados por el ferrocarril pocos años después, con peajes que no cubrieron la deuda de
construcción. Los dos canales, el valle, el condado, la década de 1790, 1825, el sobrecosto de
la roca, el embarcadero y el reparto del tráfico son invención mía y no describen ningún canal
concreto. Sin nombres propios y sin unidades imperiales.

---

## Lo que este lote da por resuelto y lo que no

**Regla nombrable en los siete (requisito del bloque).** Ninguna clave depende de una
preferencia de estilo: empalme de comas (q16), concordancia con interpuesto (q17), par de
comas del inciso (q18), tiempo por marcador temporal (q19), dos puntos tras oración completa
(q20), modificador colgado (q21) y, en q22, doble frontera: esencial frente a no esencial, y
punto y coma entre oraciones independientes. Los siete nombres pasan tal cual al campo `regla`
del `SatItemMeta`. **Terreno en disputa evitado**: no
hay *who/whom*, ni *they* singular, ni preposición final, ni concordancia de nombre colectivo,
ni *than I/than me*.

**Norma estadounidense.** Coma de Oxford en las dos enumeraciones del lote (q18 *fish, crabs,
and young seals*; q20 los tres ingredientes), *toward* sin *s* en q18, ortografía y puntuación
de EE. UU. en todo el bloque, y *traveled* con una ele en q16. La distinción *which*
explicativa / *that* restrictiva **ya no interviene en ninguna parte del bloque**: sostenía la
primera versión de q22 y se retiró con ella, porque un relativizador explícito decide por sí
solo si el tramo comenta o identifica y deja la primera de las dos decisiones resuelta sin leer
el párrafo.

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
(1883, seis veces el precio de la tierra, los dos canales de q22, la década de 1790, 1825 y el
estimado que se dobla) son inventadas a propósito, para no acercarse a ninguna serie
publicada. La fecha de apertura de 1836 que llevaba q22 se retiró la tarde del 19 de agosto:
no por originalidad, sino porque identificaba (ver su sección).

**Curva de dificultad (puerta 9).** En el orden publicado —**q16 · q17 · q18 · q20 · q19 · q21
· q22**, con `q19` y `q20` intercambiados de posición el 19 de agosto de 2026— el bloque va
1-1-2-2-2-3-3 **sin agrupar por tipo**, que es la excepción verificada de College Board y está
escrita así en el plan. Los tipos quedan B, F, B, B, F, F, B: ya no alternan uno a uno, y no
tienen por qué, porque en SEC lo que manda es la dificultad creciente y no la agrupación. Los
temas siguen sin repetirse en posiciones contiguas: historia, humanidades, ciencia,
humanidades, historia, ciencia, historia —y el empalme con los bloques vecinos también aguanta
(q15 ciencia → q16 historia; q22 historia → q23 humanidades)—. Las claves, en ese mismo orden:
D · B · A · D · C · A · B.

**Riesgos vivos que quedan anotados, no corregidos.** Dos, y los dos son condiciones de clave
única que hay que releer antes de tocar nada. El de q22 va escrito en su sección: el ítem se
sostiene sobre que el párrafo tenga **dos** canales y calle de dónde salió el dinero del
segundo, sobre que **nada más en la oración del hueco identifique** —ni una fecha, ni el
resultado del pleito de ingresos, ni la deuda— y sobre que detrás del hueco no haya conjunción.
La condición del medio es la que se rompió la mañana del 19 de agosto y costó el ítem entero. El de q16: la clave única
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
