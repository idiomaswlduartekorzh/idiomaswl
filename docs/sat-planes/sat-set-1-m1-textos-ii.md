# Textos fuente — `sat-set-1-m1`, bloque Information and Ideas (q09–q15)

Los siete textos que lee el estudiante en el bloque II del módulo de enrutamiento. **Solo
textos**: aquí no hay enunciados, ni opciones, ni claves, y no debe haberlos. Cada bloque
lleva lo que el redactor de ítems necesita para no romper el texto —qué idea central sostiene
el cierre, qué cuatro detalles son citables, qué dos datos hay que juntar para inferir— y
nada más.

Plan de origen: [`sat-set-1-m1.md`](sat-set-1-m1.md), filas 9 a 15.
Parámetros de longitud: [`sat-ingles-blueprint.md`](../sat-ingles-blueprint.md) §2, puerta 7.
Bloque hermano ya escrito: [`sat-set-1-m1-textos-cs.md`](sat-set-1-m1-textos-cs.md).

## Cómo se cuenta la longitud

College Board define «palabra» como **6 caracteres**. Se cuentan *todos* los caracteres del
texto —letras, cifras, espacios, saltos de línea y puntuación— y se dividen entre 6. El rango
25–150 palabras es por tanto **150–900 caracteres**, y es lo que mide
`scripts/check-sat-exam.mjs` sobre `stimulus.length / 6`. Los recuentos de abajo salen de
contar la cadena exacta del bloque de cita, sin el prefijo `> ` del markdown. En q13 la tabla
de datos **cuenta**: va dentro del mismo `stimulus`.

| ítem | tipo | tema | dif. | caracteres | palabras-SAT | oraciones | media/oración |
|---|---|---|---|---|---|---|---|
| q09 | central-ideas-details | humanidades | 1 | 533 | 88,8 | 6 | 16,0 |
| q10 | central-ideas-details | ciencia | 2 | 611 | 101,8 | 6 | 18,2 |
| q11 | command-of-evidence-textual | literatura | 2 | 564 | 94,0 | 6 | 19,5 |
| q12 | command-of-evidence-textual | historia | 3 | 709 | 118,2 | 5 | 23,8 |
| q13 | command-of-evidence-quantitative | ciencia | 2 | 541 | 90,2 | 4 + tabla | 18,5 |
| q14 | inferences | literatura | 2 | 555 | 92,5 | 5 | 22,6 |
| q15 | inferences | ciencia | 3 | 600 | 100,0 | 3 | 35,7 |

Los siete caben entre 150 y 900 caracteres. El más largo es q12 (709 = 118,2 palabras-SAT),
a 191 caracteres del techo; el más corto, q09 con 533, sobra por más del triple del mínimo.
La curva de longitud media de oración sube con la dificultad dentro de cada par de tipo
(16,0 → 18,2 en central-ideas; 19,5 → 23,8 en command-of-evidence textual; 22,6 → 35,7 en
inferences), que es lo que pide la sección «Qué mueve la dificultad» del plan.

---

### q09 · central-ideas-details · humanidades · dificultad 1

**Texto** (533 caracteres = 88,8 palabras-SAT)

> The Ferreira Museum owns four hundred stringed instruments, but its most visited room holds no display case. It is a workshop behind a glass wall. Inside, two repairers mend the museum's violins and guitars while visitors watch from a bench. A sign names the tools on the table and the wood being used that week. Children stay longest, and many come back a second time. The director explains the room in one line: an instrument is not an object to be looked at, but something kept alive by hands, and the public should see the hands.

**Métricas**: 6 oraciones · longitud media de oración 16,0 palabras · léxico exigente: stringed, display case, repairers, workshop, mend

**Dónde está la idea central**: En la última oración, después de los dos puntos. Idea: el museo
expone el trabajo de reparación porque entiende el instrumento como algo que se mantiene vivo
con el uso y el oficio, no como una pieza para mirar. Está enunciada, que es lo que pide una
dificultad 1.

**Los detalles secundarios que sirven de distractor** (verdaderos todos, y ninguno es la idea
central): las cuatrocientas piezas de la colección; la sala más visitada no tiene vitrina; el
cartel con las herramientas y la madera; los niños se quedan más rato y vuelven. Tres de ellos
son cuantificables y por eso atraen al estudiante que busca «el dato».

**Cuidado al escribir opciones**: esta nota decía antes que la idea central no podía
formularse repitiendo *hands*, *alive* ni *workshop* del cierre. Cumplirla a rajatabla en los
siete ítems es lo que produjo el defecto que devolvió el bloque: la clave pasó a ser la opción
que **menos** vocabulario del texto repetía, y contar coincidencias bastaba para acertar (ver
R4 del blueprint §4 bis). La regla buena es de conjunto: la clave puede repetir vocabulario
del cierre siempre que un distractor repita otro tanto, y ningún ítem se pase de +3 palabras
respecto al mejor distractor.

**Hecho real usado**: Práctica museística real y de dominio general: hay museos que colocan
el taller de conservación o restauración a la vista del público, tras un cristal, en vez de
esconderlo en la trastienda. El Museo Ferreira, las cuatrocientas piezas, los dos reparadores
y la frase del director son invención mía; no hay museo, colección ni cita reales detrás.

---

### q10 · central-ideas-details · ciencia · dificultad 2

**Texto** (611 caracteres = 101,8 palabras-SAT)

> The same volcano can erupt in ways that look unrelated. Sometimes lava runs downhill in slow sheets for weeks; other times ash is thrown kilometers upward in a single afternoon. Neither behavior depends on how much magma is involved. Magma rich in silica is stiff, so the gas bubbles that form inside it cannot rise, and pressure grows until the rock above gives way. Magma poor in silica is runnier, and the same gas leaks out steadily as the magma climbs. Temperature and dissolved water change how stiff a magma is, which is why the output of one vent can shift from one style to the other between eruptions.

**Métricas**: 6 oraciones · longitud media de oración 18,2 palabras · léxico exigente: silica, magma, dissolved, vent, eruptions

**Por qué hay que sintetizar**: La idea central —lo que decide el estilo de una erupción es si
el gas puede salir del magma, y eso lo fija la composición, no la cantidad— **no está en
ninguna oración**. Cada una aporta una pieza: la 1 y la 2 dan el contraste observable, la 3
descarta el volumen, la 4 y la 5 dan las dos mitades del mecanismo, y la 6 explica por qué un
mismo volcán cambia de estilo. El estudiante tiene que juntarlas.

**Qué puede y qué no puede hacer un distractor** (nota del plan): ninguno puede contradecir el
texto; solo estrecharlo (quedarse en el magma silícico, o en la temperatura y el agua) o
ampliarlo (convertirlo en «los volcanes son impredecibles»). El mejor distractor es verdadero
e incompleto, que es la firma de la dificultad 2.

**Hecho real usado**: Volcanología básica y de dominio público: el estilo eruptivo depende de
la viscosidad del magma —gobernada sobre todo por el contenido de sílice, y modulada por
temperatura y agua disuelta— porque de ella depende que el gas se desprenda de forma continua
o se acumule hasta romper la roca. El fenómeno es real y no lleva volcán, fecha ni cifra
concretos a propósito: no hay ninguna serie publicada detrás.

---

### q11 · command-of-evidence-textual · literatura · dificultad 2

**Texto** (564 caracteres = 94,0 palabras-SAT)

> My uncle Teodoro mended fishing nets on the dock, and for three summers I sat beside him and did nothing useful. He never once asked me to help. He would hold a torn section up against the light, find where the line had given way, and close it so evenly that afterward I could not say where the damage had been. At home I tied his knots with a length of cord of my own and never got a single one right. The afternoon he held out the wooden needle to me, I said the light was going, which was not true, and he put it back in the box without a word. I kept the cord.

**Métricas**: 6 oraciones · longitud media de oración 19,5 palabras · léxico exigente: mended, dock, given way, evenly, cord

**Corrección (19 ago 2026, auditoría del bloque)**: el texto decía «At home I *untied* his
knots with a length of cord of my own», que no significa nada —no se deshacen los nudos de
otro con un cordel propio— y dejaba defendible la opción de apertura. Dice *tied*. Son dos
caracteres menos: 566 → 564, y el ítem `q11` de
`src/data/mocks/sat/blocks/sat-set-1-m1-ii.ts` lleva ya la misma frase.

**Formato del ítem**: el enunciado afirma algo sobre la actitud del narrador y pide **qué cita
del texto la ilustra**. Las cuatro opciones son citas literales; el texto tiene que contener
las cuatro, y las contiene.

**La afirmación tiene dos mitades**, y ahí está el ítem: el narrador *se siente atraído por el
oficio de su tío* **y** *no lo intenta donde su tío pueda verlo*. Solo un detalle sostiene las
dos: que deshacía los nudos en casa, con un cordel propio, sin conseguirlo nunca. Los otros
tres son reales y cada uno sostiene media afirmación o ninguna:

| detalle citable | qué sostiene |
|---|---|
| «close it so evenly that afterward I could not say where the damage had been» | solo la admiración |
| «At home I tied his knots with a length of cord of my own and never got a single one right» | **las dos mitades** |
| «I said the light was going, which was not true» | solo la evitación |
| «He never once asked me to help» | nada: es una conducta del tío, no del narrador |

**Cuidado al escribir el enunciado**: si la afirmación se formula con una sola mitad
(«admiraba a su tío»), el ítem pasa a tener dos claves defendibles y cae por la puerta 4. La
afirmación tiene que llevar las dos.

**Hecho real usado**: Ninguno, es ficción. Prosa narrativa original. El vocabulario marinero
está acotado a lo que el propio texto explica (una red rota, la línea cedida, una aguja de
madera): no hace falta haber visto un puerto para leerlo.

---

### q12 · command-of-evidence-textual · historia · dificultad 3

**Texto** (709 caracteres = 118,2 palabras-SAT)

> Sewing machines were a luxury in 1860 and an ordinary household object by 1900. The usual explanation is price: manufacturing improved, competitors entered the trade, and the cost of a machine fell by more than half. Historian Ana Belmonte argues that price alone cannot account for the change. Even at the lower figure, she notes, a machine still cost a garment worker several months of wages, and the households that bought first were not the households whose earnings had risen. What spread the machine, in her account, was the installment contract: agents sold on weekly payments and took the machine back when payments stopped, which let them reach buyers who could never have saved the full sum at once.

**Métricas**: 5 oraciones · longitud media de oración 23,8 palabras · léxico exigente: installment contract, garment, competitors, account (en «in her account»), figure

**Formato del ítem**: el enunciado enuncia la conclusión de Belmonte y pide **qué hallazgo, de
ser cierto, la apoyaría con más fuerza**. Las opciones son hallazgos, no citas: por eso el
texto trae la conclusión y la explicación rival, y **deja fuera la prueba a propósito**. Si el
texto ya contuviera el dato que apoya a Belmonte, el ítem se resolvería emparejando palabras.

**La conclusión tiene tres componentes**, y esa es toda la dificultad: (1) el crédito a plazos,
**no** la bajada de precio, es lo que difundió la máquina; (2) el mecanismo es que el vendedor
recupera la máquina si se dejan de pagar, lo que le permite fiar; (3) la población son los
hogares que **no** podían reunir la suma de golpe y cuyos ingresos no habían subido.

**Cómo fallan los distractores** (nota del plan): apoyan una versión **más débil** —que la
propiedad de máquinas creció, que los precios siguieron bajando— o **más amplia** —que la venta
a plazos se extendió a otros bienes, que el crédito cambió el consumo en general—. Todas son
compatibles con el texto y ninguna distingue la tesis de Belmonte de la explicación por precio,
que es exactamente el error que el ítem quiere capturar.

**Hecho real usado**: Hecho libre y bien documentado de historia económica del siglo XIX: la
venta a plazos con reserva de dominio —el vendedor recupera el bien si el comprador deja de
pagar— fue el instrumento comercial que puso la máquina de coser en hogares que no podían
pagarla al contado, y la máquina pasó de artículo de lujo a objeto doméstico corriente entre
1860 y 1900. Ana Belmonte es una historiadora inventada; «más de la mitad» de caída de precio,
los «varios meses de salario» y los pagos semanales son cifras mías, redondeadas a propósito
para no acercarse a ninguna serie publicada ni a ningún fabricante real (el texto no nombra
ninguno).

---

### q13 · command-of-evidence-quantitative · ciencia · dificultad 2

**Texto con datos** (541 caracteres = 90,2 palabras-SAT, tabla incluida)

> Lichens have no roots: whatever they need reaches them from the air, and so does whatever the air is carrying. That is why surveyors treat them as a gauge of local pollution. To measure the effect of vehicle exhaust, a team recorded the share of stone wall covered by two lichens—a bushy gray species and a flat orange one—at four distances from a busy highway. Each figure below is the average of ten walls.
>
> Distance from highway · bushy gray cover · flat orange cover
> 20 m · 3% · 28%
> 100 m · 8% · 33%
> 400 m · 22% · 31%
> 1,000 m · 30% · 29%

**Métricas**: 4 oraciones de prosa + cabecera y 4 filas de datos · longitud media de oración 18,5 palabras · léxico exigente: lichens, surveyors, gauge, exhaust, share (de superficie)

**Corrección (19 ago 2026, auditoría del bloque)**: la columna naranja era 34 → 30 → 27 → 26 %,
un descenso monótono con la distancia. Eso *es* un gradiente: la serie respondía a la
carretera y contradecía el enunciado del ítem («only one of the two lichens is sensitive»).
Se sustituyó por 28 → 33 → 31 → 29 %, que no sigue la distancia. Los cuatro valores tienen el
mismo número de dígitos, así que el `stimulus` sigue midiendo 541 caracteres y la puerta 7 no
cambia.

**Cómo va el gráfico**: en el examen real este ítem lleva tabla o barras. Nuestro motor solo
pinta texto en `stimulus`, así que **los datos van dentro del texto como tabla de texto plano**,
con las filas separadas por salto de línea y las columnas por `·`. No se menciona ninguna
imagen y no hay que añadir ninguna. Los 131 caracteres de la tabla **cuentan** para la puerta 7
y ya están en el total de 541.

**Las dos series**: cobertura del liquen gris ramificado (3 → 8 → 22 → 30 %, sube al alejarse
de la carretera) y del liquen naranja plano (28 → 33 → 31 → 29 %, va y viene en cinco puntos y
acaba donde empezó, sin relación con la distancia). Están construidas para que **haya que
comparar**: solo una de las dos responde al gradiente de contaminación, y eso no se ve leyendo
una sola columna.

**El distractor obligatorio** (nota del plan): un dato **leído correctamente que no responde**
—por ejemplo, que el liquen gris cubría el 30 % de los muros a 1.000 m—. Es cierto, sale de la
tabla y no compara nada. Otros dos huecos disponibles: invertir cuál especie es cuál, y
y comparar niveles en vez de tendencias (que el naranja cubre más muro que el gris en casi
todas las filas; es cierto en tres de las cuatro y no dice nada sobre sensibilidad, porque una
diferencia de nivel no es una respuesta al gradiente).

**Hecho real usado**: Hecho libre y de dominio general en biología ambiental: los líquenes se
usan como bioindicadores de calidad del aire porque, al no tener raíces, absorben agua y
nutrientes —y con ellos los contaminantes— directamente de la atmósfera; las especies
ramificadas suelen ser sensibles a los compuestos nitrogenados del tráfico, mientras que
algunas especies costrosas de tonos anaranjados los toleran o incluso se ven favorecidas. El
gradiente respecto a una carretera es un diseño de muestreo clásico. Las cuatro distancias, los
diez muros por punto y los ocho porcentajes son inventados por mí, y las especies van sin
nombre científico para que ningún estudio publicado quede a tiro y para que el estudiante no
necesite saber taxonomía.

---

### q14 · inferences · literatura · dificultad 2

**Texto** (555 caracteres = 92,5 palabras-SAT)

> Nadia had been away for eleven years, and the innkeeper looked at her the way he would have looked at any traveler off the evening bus. He asked her to spell her name, and then asked again while he wrote it in the register. He remarked that no family by that name had lived in the village for a long time. Then he carried her bag up to the room she had slept in as a girl, which she had not asked for. When she came down at six, a pot of the bitter mountain tea her grandmother used to make was waiting on the table, and she had not mentioned that either.

**Métricas**: 5 oraciones · longitud media de oración 22,6 palabras · léxico exigente: innkeeper, register, remarked, traveler, bitter

**Dónde se corta el texto**: justo antes de la consecuencia. Lo que el texto pone son dos
conductas incompatibles con la indiferencia que el posadero exhibe —le da sin preguntar la
habitación en la que dormía de niña y le sirve un té que ella no ha pedido ni nombrado— y ahí
se detiene. La conclusión que el estudiante debe completar es que **el posadero la reconoció y
prefirió no decirlo**.

**Que se siga del texto y no del mundo**: las dos pruebas son internas y explícitas —«which she
had not asked for» y «she had not mentioned that either»—. Sin esas dos coletillas la inferencia
dependería de suponer cómo funcionan las posadas de pueblo, y eso es conocimiento del mundo, no
del texto. No se toquen al editar.

**Lo que la inferencia no autoriza**: nada sobre por qué calla (rencor, discreción, una deuda
vieja). El texto no lo da, así que ninguna opción puede pedirlo, ni siquiera la clave.

**Hecho real usado**: Ninguno, es ficción. Prosa narrativa original. El único elemento cultural
—una infusión amarga de montaña— queda explicado por su función dentro de la escena y no exige
saber qué planta es.

---

### q15 · inferences · ciencia · dificultad 3

**Texto** (600 caracteres = 100,0 palabras-SAT)

> A stalagmite grows only while water moves through the rock above it, dissolving carbonate on the way down and leaving a thin film of it behind at every drip; ground that stays frozen the year round shuts the process off, and the column stops. Caves in the far north of Siberia therefore hold an unusual archive. In one of them, at a latitude where the soil today never thaws below the first meter, a team dated the growth bands of a single column and found that deposition ran without interruption from about 402,000 to 381,000 years ago, and then ceased for the hundred thousand years that followed.

**Métricas**: 3 oraciones · longitud media de oración 35,7 palabras · léxico exigente: stalagmite, carbonate, deposition, latitude, growth bands

**Los dos datos que hay que combinar**:

1. **La regla** (oración 1): la columna solo crece si el agua atraviesa la roca de encima, y un
   suelo permanentemente helado corta el proceso.
2. **El caso** (oración 3): en una cueva cuyo suelo *hoy* no se deshiela por debajo del primer
   metro, el depósito fue continuo entre 402.000 y 381.000 años atrás.

**La inferencia**: durante esos ~21.000 años el terreno sobre esa cueva **no** estuvo helado
todo el año, es decir, allí hizo menos frío que ahora. No está escrita en ninguna parte y no se
sigue de ninguno de los dos datos por separado.

**El distractor más cercano** (nota del plan): el que se sigue de **uno solo**. Con el dato 1
basta para decir «hacía falta agua líquida»; con el dato 2 basta para decir «la columna dejó de
crecer hace 381.000 años». Las dos son ciertas, ninguna es la inferencia, y la segunda es la
trampa buena porque parece una conclusión y es una paráfrasis.

**Cuidado al editar**: el «today» de la tercera oración es el gozne. Si se cae, el texto ya no
permite comparar el pasado con el presente y el ítem se queda sin clave.

**Hecho real usado**: Método real de paleoclimatología: los espeleotemas —estalagmitas y
formaciones afines— solo crecen con agua de infiltración líquida, de modo que en latitudes
altas su crecimiento se usa como indicador de que el permafrost retrocedió, y sus bandas se
datan por series de uranio. El método y su lógica son de dominio público. La cueva sin nombre,
el equipo, las fechas de 402.000 y 381.000 años y el metro de deshielo actual son invención
mía: no reproducen ningún registro publicado.

---

## Lo que este lote da por resuelto y lo que no

**Equidad (puerta 10).** Ninguno de los siete textos pide un dato que el estudiante de
Bucaramanga no tenga dentro: no hay sistema escolar estadounidense, ni deporte escolar, ni
festividad local, ni medida imperial. Las unidades son métricas (metros, kilómetros, porcentajes)
y los tres objetos que podrían no ser cotidianos —la aguja de red de q11, la venta a plazos de
q12 y la estalagmita de q15— quedan explicados en la propia frase que los introduce.

**Originalidad (puerta 11).** Los siete textos están escritos aquí. Donde hay un hecho real
—talleres de restauración a la vista en museos, viscosidad del magma, venta a plazos de la
máquina de coser, líquenes como bioindicadores, espeleotemas como indicador de permafrost— el
hecho es libre y la formulación es propia; los nombres, fechas y cifras que los acompañan son
inventados a propósito para no acercarse a ningún estudio, serie o empresa reales. Se
comprobaron además tres secuencias de riesgo (la de burbujas de gas de q10, la de absorción por
el aire de q13 y la de crecimiento de la estalagmita de q15): la de q13 se reescribió por
parecerse demasiado a la formulación divulgativa habitual, y ninguna de las tres coincide ahora
con material publicado.

**Registro.** Divulgación seria en q10, q13 y q15; práctica museística y crítica en q09; historia
social en q12; prosa narrativa original en q11 y q14. Ni conversacional ni florido. Inglés
estadounidense: *kilometers*, *meter*, *gray*, coma de Oxford, y la coma decimal a la inglesa en
«1,000 m».

**Variedad de nombres**: Ferreira (q09), Teodoro (q11), Ana Belmonte (q12), Nadia (q14). Cuatro
procedencias distintas, ningún topónimo real salvo Siberia en q15, que es donde el hecho ocurre.

**Lo que falta y no es de este puesto**: enunciados, opciones, claves y el registro de qué error
representa cada distractor (puerta 5). Los textos están escritos para admitir la clave que fija
el plan —C, A, B, D, A, C, B— pero la clave la escribe el redactor de ítems.

## Filas del plan que no se pueden cumplir tal como están escritas

Una, y se resuelve dentro del texto sin tocar el plan:

- **q13 · «Lleva gráfico (tabla o barras)».** El motor de simulacros solo pinta el texto de
  `stimulus`; no hay campo de imagen ni componente de gráfico, y el contrato de datos de §3 del
  blueprint no lo contempla. La fila se cumple **en su intención** —dos series que hay que
  comparar— con una tabla de texto plano incrustada en el propio `stimulus`, presentada como los
  resultados del estudio. Consecuencia práctica que el redactor de ítems tiene que saber: los
  131 caracteres de la tabla cuentan para la puerta 7, y si al maquetar se cambia el separador
  `·` o se añaden líneas, **hay que volver a medir**. La alternativa —barras reales— exigiría
  tocar `MCQQuestion`, que usan otros cuatro exámenes ya publicados; queda fuera de este puesto.

Las otras seis filas (q09–q12, q14, q15) se cumplen tal como están escritas.
