# Textos fuente — `sat-set-1-m1`, bloque Expression of Ideas (q23–q27)

Los cinco textos que lee el estudiante en el bloque EOI del módulo de enrutamiento. **Solo
textos**: aquí no hay enunciados, ni opciones, ni conectores candidatos, y no debe haberlos.
Cada bloque lleva lo que el redactor de ítems necesita para no romper el texto —dónde va el
hueco, qué relación lógica decide el contenido, qué nota sostiene la clave— y nada más.

Plan de origen: [`sat-set-1-m1.md`](sat-set-1-m1.md), filas 23 a 27.
Parámetros de longitud: [`sat-ingles-blueprint.md`](../sat-ingles-blueprint.md) §2, puerta 7.
Lote hermano ya escrito: [`sat-set-1-m1-textos-cs.md`](sat-set-1-m1-textos-cs.md).

## Cómo se cuenta la longitud

College Board define «palabra» como **6 caracteres**. Se cuentan *todos* los caracteres
—letras, cifras, espacios, viñetas y puntuación— y se dividen entre 6. El rango 25–150
palabras es por tanto **150–900 caracteres**, y es lo que mide `scripts/check-sat-exam.mjs`
sobre `stimulus.length / 6`.

En los dos ítems de rhetorical-synthesis el `stimulus` **no es prosa**: es la línea de
encabezado («While researching a topic, a student has taken the following notes:») más las
viñetas. Todo eso va dentro de `stimulus` y todo eso cuenta. Los recuentos de abajo salen de
contar la cadena exacta del bloque de cita, sin el prefijo `> ` del markdown, con las
viñetas separadas por saltos de línea simples y una línea en blanco tras el encabezado.

| ítem | tipo | tema | dif. | caracteres | palabras-SAT | oraciones / viñetas | media |
|---|---|---|---|---|---|---|---|
| q23 | rhetorical-synthesis | humanidades | 2 | 515 | 85,8 | 5 viñetas + encabezado | 16,2 palabras/viñeta |
| q24 | rhetorical-synthesis | ciencia | 3 | 611 | 101,8 | 6 viñetas + encabezado | 14,0 palabras/viñeta |
| q25 | transitions | humanidades | 1 | 402 | 67,0 | 5 oraciones | 14,6 palabras/oración |
| q26 | transitions | historia | 2 | 490 | 81,7 | 3 oraciones | 26,3 palabras/oración |
| q27 | transitions | humanidades | 3 | 701 | 116,8 | 5 oraciones | 23,8 palabras/oración |

Los cinco caben entre 150 y 900 caracteres. El más largo es q27 (701 = 116,8 palabras-SAT),
con casi 200 caracteres de margen antes del techo; el más corto, q25 (402), sobra por más
del doble del mínimo. En q23 y q24 el margen es real pero conviene no gastarlo: si al
maquetar se cambian las viñetas `•` por guiones, números o etiquetas de nota, hay que
volver a medir.

La curva de longitud media de oración sube con la dificultad en los tres de transitions
(14,6 → 26,3 → 23,8 con sintaxis más subordinada en q27), que es lo que pide la sección
«Qué mueve la dificultad» del plan: el peso lo lleva el texto, no el enunciado.

---

### q23 · rhetorical-synthesis · humanidades · dificultad 2

**Texto** (515 caracteres = 85,8 palabras-SAT)

> While researching a topic, a student has taken the following notes:
>
> • The ghazal is a poetic form that has been written for more than a thousand years, first in Arabic and Persian and later in Urdu.
> • A ghazal is built from couplets, or pairs of lines.
> • Each couplet is meant to stand on its own, and readers often quote one by itself.
> • In a ghazal, every couplet ends with the same repeated word or phrase.
> • Poets writing in English have adapted the form, some keeping the repeated ending and some dropping it.

**Métricas**: 5 viñetas + encabezado · 16,2 palabras por viñeta (25 / 10 / 16 / 13 / 17) ·
léxico exigente: couplets, adapted, form (en sentido técnico), repeated ending

**Objetivo que debe declarar el enunciado**: presentar el ghazal a un lector que no conoce
la forma. El objetivo tiene que estar escrito en el enunciado, no insinuado.

**Qué notas sostienen la clave**: la **primera** (qué es y desde cuándo) más la **segunda**
(de qué está hecho). Es la única combinación que responde a las dos preguntas que se hace
quien no conoce la forma: *qué es* y *cómo está construida*. Nada más de las notas hace
falta para cumplir el encargo.

**Qué hacen las otras tres notas**: son ciertas y sirven para **otros** objetivos, que es
justo el error que debe capturar cada distractor.

- La cuarta (el final repetido) sirve a un objetivo técnico: explicar un recurso a quien ya
  sabe qué es un ghazal. Empieza por dentro, no por fuera.
- La tercera (cada pareja se sostiene sola y se cita suelta) sirve a un objetivo de
  recepción: cómo se lee un ghazal, no qué es.
- La quinta (adaptación al inglés) sirve a un objetivo histórico: qué le ha pasado a la
  forma últimamente. Todo cierto, y no presenta nada.

**Aviso al redactor de opciones**: no mezclar dos notas de dos objetivos distintos en una
misma opción. Una frase que junte «hace mil años» con «los poetas en inglés la adaptaron»
cumple el encargo a medias y abre una segunda clave defendible —la trampa 2 del plan—.

**Hecho real usado**: Hecho libre de historia literaria, de nivel enciclopédico: el ghazal
es una forma de origen árabe, desarrollada largamente en persa y después en urdu; se compone
de pareados autónomos que suelen citarse por separado, y cada pareado se cierra con una
palabra o frase repetida (el *radif*). La redacción es mía y las notas no llevan fechas de
adopción al inglés a propósito: la cronología de esa adaptación es discutida y una nota con
año sería un dato que el estudiante no puede verificar y el corrector sí. No se atribuye
ninguna afirmación a una persona real. Términos técnicos (*radif*, *qafia*) fuera: el texto
tiene que ser autosuficiente y esos nombres no aportan nada al ítem.

---

### q24 · rhetorical-synthesis · ciencia · dificultad 3

**Texto** (611 caracteres = 101,8 palabras-SAT)

> While researching a topic, a student has taken the following notes:
>
> • Seagrass meadows are beds of flowering plants that grow underwater and shelter young fish.
> • A storm destroyed most of the meadow in one shallow bay, and researchers tried two ways of restoring it.
> • Method 1: divers transplanted adult shoots taken from a healthy meadow nearby.
> • Method 2: volunteers scattered seeds gathered from flowering plants.
> • After three years, transplanted plots covered 46 percent of the seabed and seeded plots covered 31 percent.
> • Transplanting took about four times as many working hours per plot as seeding.

**Métricas**: 6 viñetas + encabezado · 14,0 palabras por viñeta (14 / 19 / 12 / 9 / 17 / 13)
· léxico exigente: seagrass meadows, transplanted, shoots, plots, seabed

**Objetivo que debe declarar el enunciado**: **comparar** los resultados de los dos métodos.
La palabra que hace el ítem es esa: comparar, no describir ni explicar.

**Qué notas sostienen la clave**: la **quinta** obligatoriamente —lleva las dos cifras, y sin
las dos no hay comparación— y, si la opción lo permite, la **sexta**, que compara la misma
pareja en otra dimensión (esfuerzo por parcela). Una opción que ponga los dos resultados
uno frente al otro cumple; cualquier otra cosa, no.

**El error que deben capturar los tres distractores**: cumplir **la mitad** del encargo. El
estudiante que lee las viñetas y no el enunciado escribe una frase correcta sobre *un*
método —46 % tras tres años, o el ahorro de horas de la siembra— y da el ítem por resuelto.
Las viñetas están escritas para que esa media respuesta sea fácil de construir y evidentemente
incompleta cuando se relee el objetivo. Otro medio cumplimiento disponible, y por tanto otro
distractor legítimo: describir el procedimiento de los dos métodos (notas 3 y 4) sin llegar a
ningún resultado.

**Aviso al redactor de opciones** (puerta 2, longitud de la clave): una clave que compara dos
cifras tiende a salir más larga que las tres alternativas. En este ítem hay margen para
evitarlo —«Transplanted plots covered 46 percent of the seabed after three years; seeded plots
covered 31 percent» es corta— y conviene usarlo, porque el módulo solo admite ocho ítems con
la clave más larga y este bloque no debería gastar dos.

**Hecho real usado**: Hecho libre de ecología marina y restauración: las praderas submarinas
de fanerógamas marinas se restauran por dos vías conocidas, el trasplante de haces adultos
desde una pradera sana y la siembra de semillas recogidas de plantas en flor; el trasplante
suele prender más y costar mucho más trabajo por superficie, y las praderas son criadero de
peces juveniles. La bahía, la tormenta, los tres años, el 46 % y el 31 % y el factor cuatro
de horas son invención mía, elegidos para no rozar las cifras de ningún ensayo publicado. Sin
topónimos y sin nombres de equipo, a propósito. Unidades: porcentaje y horas de trabajo,
nada imperial.

---

### q25 · transitions · humanidades · dificultad 1

**Texto** (402 caracteres = 67,0 palabras-SAT)

> A century ago most public libraries in Europe kept their shelves closed to readers. A visitor copied a call number onto a slip of paper and handed it to a clerk. The clerk went into the back rooms and returned with the book. Nobody browsed. ______ readers in those same buildings now walk in among the shelves, pull down whatever catches their attention, and leave with books they had not come to find.

**Métricas**: 5 oraciones · 14,6 palabras por oración · léxico exigente: call number, clerk,
browsed, catches their attention

**Dónde va el hueco**: al principio de la quinta oración, «______ readers in those same
buildings now walk in among the shelves…». Lo que sigue al hueco es una oración independiente
completa, así que las cuatro opciones son igual de gramaticales ahí: ninguna se cae sin leer
—trampa 1 del plan—.

**Qué relación decide el contenido**: **contraste**, y de un tipo que el texto deja cerrado.
Las cuatro primeras oraciones describen una práctica —estanterías cerradas, papeleta,
empleado, «Nobody browsed»— y la quinta describe la práctica contraria en los mismos
edificios. El adverbio *now* lleva el tiempo, de modo que el conector solo tiene que llevar
la oposición: si el hueco cargara además con el cambio temporal, un conector de tiempo
competiría con la clave.

**Por qué fallan las otras relaciones** (esto es lo que el texto tiene que garantizar, y lo
garantiza): la quinta oración no es un ejemplo de lo anterior —dice lo opuesto—, no añade un
rasgo más al sistema cerrado —lo sustituye— y no se sigue de él como consecuencia —nada en el
texto dice que las estanterías cerradas produjeran las abiertas—. «Nobody browsed» está puesta
ahí para eso: es la frase que hace incompatible cualquier lectura de adición.

**Hecho real usado**: Hecho libre de historia de las bibliotecas: hasta bien entrado el siglo
XX lo normal en muchas bibliotecas públicas europeas era el depósito cerrado, con petición
por papeleta al mostrador, y el acceso libre a la estantería se generalizó después. Ninguna
biblioteca, ciudad ni fecha concreta aparece en el texto; «a century ago» es deliberadamente
vago para no afirmar una cronología que el ítem no necesita.

---

### q26 · transitions · historia · dificultad 2

**Texto** (490 caracteres = 81,7 palabras-SAT)

> The wheat harvest failed across the highland districts in 1846, and within a single season the price of bread in the provincial capitals doubled. Newspapers recorded the shortage in unusual detail: three of them printed weekly tables of grain prices, and a fourth sent a correspondent through the affected villages. ______ thousands of families left the highlands for work in the coastal ports during the two years that followed, and the census of 1850 found several hamlets standing empty.

**Métricas**: 3 oraciones · 26,3 palabras por oración · léxico exigente: harvest, provincial
capitals, correspondent, census, hamlets

**Dónde va el hueco**: al principio de la tercera oración, «______ thousands of families left
the highlands…». Lo que sigue es una oración independiente; las cuatro opciones encajan
sintácticamente.

**Qué relación decide el contenido**: **consecuencia**, y la causa está **dos oraciones
antes**. Lo que empuja a las familias fuera de la montaña es la cosecha perdida y el pan al
doble (oración 1), no que los periódicos lo contaran con detalle (oración 2). El estudiante
tiene que saltar por encima de la oración intermedia, que es toda la dificultad del ítem.

**El distractor que el texto está construido para alimentar**: un conector de **adición**. Si
se lee solo la oración anterior al hueco, «los periódicos lo documentaron mucho» + «además,
miles de familias se marcharon» suena impecable: dos hechos de la misma época, uno detrás de
otro. Solo deja de sonar bien cuando se recupera la oración 1 y se ve que la marcha no es un
dato más de la lista, sino el efecto de la carestía.

**Aviso al redactor de opciones**: la oración 2 no puede quedar como una causa alternativa
defendible. Está escrita para que no lo sea —documentar una escasez no vacía los pueblos—,
pero si al redactar se le añade un verbo de influencia («los periódicos alarmaron a…»), el
ítem gana una segunda clave.

**Hecho real usado**: Patrón histórico libre y bien documentado: una cosecha fallida encarece
el pan, la carestía dispara la emigración desde las zonas de montaña hacia puertos y ciudades,
y el censo siguiente registra despoblamiento. Ni el país, ni la región, ni los periódicos
existen: no hay topónimo alguno en el texto y el año 1846 se usa solo para fechar una serie
inventada, no para aludir a ninguna crisis concreta.

---

### q27 · transitions · humanidades · dificultad 3

**Texto** (701 caracteres = 116,8 palabras-SAT)

> Historians of the first decade of photography often describe the medium as pure recording: the camera took down whatever stood in front of it, and the operator chose nothing. The description is not baseless: exposures ran to minutes in the earliest years, the apparatus was heavy and slow to set up, and anyone who shifted position during that time ruined the picture. ______ the portraits that survive from those years are far from uniform. One operator lit a face from a single side and left the other half in shadow; another arranged a room so that the subject appeared to have been interrupted at work. The conditions narrowed the range of choices open to the photographer; they did not eliminate it.

**Métricas**: 5 oraciones · 23,8 palabras por oración · léxico exigente: medium, pure
recording, apparatus, exposures, uniform, narrowed

**Dónde va el hueco**: al principio de la tercera oración, «______ the portraits that survive
from those years are far from uniform». Lo que sigue es una oración independiente y las
cuatro opciones son gramaticales ahí.

**Qué relación decide el contenido**: **concesión ya hecha + vuelta al argumento propio**. La
oración 2 concede que la descripción ajena tiene fundamento y enumera tres razones. El hueco
abre la vuelta: pese a lo concedido, los retratos no se parecen entre sí. No es una oposición
entre dos objetos comparables; es el autor retomando su tesis después de haber cedido terreno.

**Por qué es de dificultad 3, y qué lo mantiene con una sola clave**: dos conectores
contrastivos parecen plausibles y solo la **dirección** los separa, así que el texto lleva
dentro el discriminador —la última oración—. Ahí se dice que las condiciones *estrecharon* el
margen de elección y no lo *suprimieron*: la concesión sigue siendo verdadera al terminar el
párrafo. Por eso un conector que **niegue** lo concedido (del tipo «al contrario»: lo anterior
es falso, esto otro es lo cierto) queda descartado por el propio texto, mientras que el que
**mantiene** lo concedido y aun así afirma lo contrario encaja. Sin esa última oración el
ítem tendría dos claves; no se puede recortar el texto por ahí.

**Aviso al redactor de opciones** (trampa 2 del plan): no pueden convivir en el juego dos
conectores concesivos intercambiables. Si una opción hace de bisagra concesiva, ninguna otra
puede hacer lo mismo con otras palabras: el segundo contrastivo tiene que ser de una
dirección distinta —negación de lo anterior, o contraste entre dos objetos comparables que
aquí no existen—, no un sinónimo más suave.

**Hecho real usado**: Hecho libre de historia de la fotografía: en la primera década del
medio las exposiciones eran de minutos, el equipo pesaba mucho y el movimiento del retratado
arruinaba la imagen; aun así los retratos conservados muestran decisiones de iluminación y de
puesta en escena muy distintas entre sí. La discusión sobre si esa primera fotografía fue
registro puro o práctica con elecciones es una discusión real de la disciplina. No se cita a
ningún historiador, ni a ningún fotógrafo, ni a ninguna imagen concreta: los dos ejemplos del
final («un operador…, otro…») son ilustrativos y anónimos a propósito.

---

## Lo que este lote da por resuelto y lo que no

**Equidad (puerta 10).** Ninguno de los cinco textos pide un dato que el estudiante de
Bucaramanga no tenga dentro: nada de sistema escolar estadounidense, deporte escolar,
festividad local ni medida imperial. Las únicas unidades son porcentaje y horas de trabajo
(q24). Los tres términos que podrían no ser cotidianos quedan explicados en la propia línea
que los introduce: *couplets* → «or pairs of lines» (q23), *seagrass meadows* → «beds of
flowering plants that grow underwater» (q24), *call number* → «copied … onto a slip of paper
and handed it to a clerk» (q25).

**Originalidad (puerta 11).** Los cinco están escritos aquí. Donde hay hecho real —forma del
ghazal, restauración de praderas marinas, depósito cerrado en las bibliotecas, carestía y
emigración, exposiciones largas de la fotografía temprana— el hecho es libre y la formulación
es propia; cifras, fechas de ejemplo y personajes están inventados a propósito para no
acercarse a ningún estudio, archivo o manual publicado. Cero nombres propios de personas en
todo el lote.

**Trampa 1 del plan (una opción que se cae por gramática).** En los tres ítems de transitions
el hueco precede a una oración independiente completa, de modo que cualquier conector
adverbial cabe ahí sin romper la sintaxis: las cuatro opciones se separan por contenido, que
es lo que exige EOI. En los dos de rhetorical-synthesis no aplica —las opciones son frases
enteras—, pero el equivalente sí: ninguna opción debe poder descartarse por ser falsa
respecto de las notas. Todas las opciones tienen que ser **verdaderas** y fallar por
objetivo.

**Trampa 2 del plan (sinónimo parcial = segunda clave).** Está anotada dentro de q27, donde
muerde de verdad, y dentro de q24, donde el medio cumplimiento se parece demasiado al
cumplimiento entero. En los dos casos el discriminador está escrito en el texto, no en el
enunciado.

**Registro.** Divulgación seria en q24 y q25, prosa histórica en q26, crítica académica en
q27, notas telegráficas de estudiante en q23 y q24. Ni conversacional ni florido. Inglés
estadounidense: coma de Oxford en las tres enumeraciones del lote (q24 no la necesita,
q25 y q27 sí), *percent* en una sola palabra, y cero variantes británicas de ortografía o
puntuación.

**Lo que falta y no es de este puesto**: enunciados, opciones, claves y el registro de qué
error representa cada distractor (puerta 5). Los textos están escritos para admitir la clave
que fija el plan —C, A, D, B, C— pero la clave la escribe el redactor de ítems.

## Filas del plan que no se pudieron cumplir tal como están escritas

**q23 — «Cuatro notas en viñetas».** Se escribieron **cinco**. Con cuatro notas y una clave
que usa dos, quedan dos notas libres para tres distractores: al menos un distractor tiene que
reutilizar una nota de la clave, y entonces se parece a ella por construcción, que es
exactamente el defecto que el plan llama trampa 2. Con cinco notas cada distractor tiene su
propia nota y su propio objetivo fallido, y el `stimulus` sigue holgado en longitud (515 de
900 caracteres). Si se prefiere respetar el «cuatro» literal, hay que renunciar a que los
tres distractores sean independientes entre sí; no hay una tercera salida.

**q24 — puerta 2 (longitud de la clave), riesgo heredado.** La fila pide una clave que
compare dos resultados. Una frase comparativa es casi siempre la más larga del juego, así que
este ítem tiende a consumir uno de los ocho cupos de «clave más larga» del módulo. No es un
incumplimiento del texto —las viñetas permiten una clave corta, y arriba queda anotada una—,
pero es una restricción que el redactor de opciones tiene que asumir a sabiendas, no
descubrir al medir el módulo entero.
