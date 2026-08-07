# Auditoría A2 — italiano


**¿Apto?** **NO**

El italiano está limpio: revisados los 160 turnos, no hay un solo error de gramática, concordancia, conjugación ni ortografía. Los puntos donde el A1 se rompió en otros idiomas aquí están bien resueltos: concordancia del participio con ne y con pronombre directo (ne ho vista una, ne abbiamo contate, le ho portate, l'ha presa, le abbiamo lavate), si impersonale con sujeto plural (le sedie si chiedono), dislocación (la porta verde la vedo), elisiones (nell'officina, cos'è, dell'autobus, quarant'anni, anch'io) y registro estable por personaje (Lucia trata de Lei a todos; Bruno tutea a los jóvenes y el audit lo declara). No hay calcos del español en el texto italiano —a diferencia del ruso y el coreano A1—, ningún título tiene doble sentido ni lectura vulgar, y el nivel A2 es real: passato prossimo/imperfetto, pronombres directos e indirectos, ne, ci, comparativos, superlativos, futuro regular e irregular, condicional de cortesía y si impersonale, sin congiuntivo, sin pronombres combinados y sin condicional compuesto (que sí serían B1). Las 133 palabras clave se oyen LITERALMENTE en su episodio (comprobado con grep sobre el ttsScript, no con el matcher por prefijo del validador), los speakers coinciden con episode.characters y con series.characters en los 20 episodios, y las respuestas correctas se reparten 40/32/28 entre las tres posiciones. No aplica romanización (alfabeto latino, ningún turno lleva el campo, que es lo correcto). El validador pasa sin errores. Dicho esto, NO la generaría todavía. No por la lengua, sino por tres cosas que viven dentro del texto que se va a locutar y que después salen caras: (1) «finché qualcuno risponderà» sin el «non» pleonástico invierte la lectura del remate del episodio 11; (2) la aritmética de la cena no cuadra —20 sillas para 42 invitados, más un tercer número, «cinquanta persone», que no concuerda con ninguno de los dos— y las tres cifras son respuestas de preguntas de detalle; (3) «Per questo mi piaci» entre dos compañeras de curso dice en italiano algo distinto de lo que promete su traducción («me caes bien»). Son tres retoques de una línea cada uno. El resto de hallazgos vive en la columna española y en el diseño de las preguntas: se arreglan sin gastar un solo crédito de audio. Con esos tres cambios aplicados antes de generar, la serie es apta.

**Blueprint:** incumple → continuidadNarrativa

### Importantes (6)

**it-a2-11-domani-busseremo** · _gramatica / ambiguedad de significado_

- Problema: Turno 3, Valeria: «Certo. Ci torneremo il giorno dopo, finché qualcuno risponderà.» En italiano hablado «finché» sin el «non» expletivo se lee por defecto como 'mientras / todo el tiempo que': la frase suena a «volveremos mientras alguien conteste», lo contrario de la intención («hasta que alguien conteste»). Agrava el caso que «finché» esté declarado como newVocabulary del propio episodio: la serie enseña justamente la forma ambigua. Está en el ttsScript, así que corregirlo después obliga a regenerar el episodio 11.
- Propuesta: target: «Certo. Ci torneremo il giorno dopo, finché non risponderà qualcuno.» — es: «Claro. Volveremos al día siguiente, hasta que alguien conteste.» (Variante igual de A2 y más clara al oído: «finché non ci risponde qualcuno».) Actualizar también la entrada «finché» del audit a «finché non».

**it-a2-13 / it-a2-14 / it-a2-16 / it-a2-17** · _continuidad / aritmetica (las tres cifras son respuesta de quiz)_

- Problema: Los números de la cena no cuadran entre sí. Ep. 13, turno 3: «ci servirebbero venti sedie e quattro tavoli» (y ep. 16, turno 0: «hai visto le venti sedie?»). Ep. 17, turno 0: «Ne abbiamo contate quarantadue» personas. Ep. 14, turno 2: «una cena per cinquanta persone». Resultado: 20 sillas para 42 invitados, y un tercer aforo (50) que no concuerda con ninguno de los otros dos. No es un detalle escondido: las tres cifras son la respuesta correcta de una pregunta de detalle («¿Cuántas sillas hacen falta?» → Veinte; «¿Cuántas personas vendrán?» → Cuarenta y dos), así que el estudiante atento las retiene y ve el desajuste. Es el mismo tipo de fallo que en el coreano A1 (una pegatina en los eps. 2/3/10 y cinco de golpe en el 19).
- Propuesta: Lo más barato es subir las sillas y unificar el aforo: ep. 13 → «ci servirebbero quaranta sedie e sei tavoli» (ajustando el turno 4 de Giulia a «Quaranta sedie?» y el detalle 1 a Cuarenta / Catorce / Cuatro); ep. 16 → «hai visto le quaranta sedie?»; ep. 14 → «una cena per quaranta persone». Alternativa sin tocar el ep. 13: bajar el aforo del ep. 17, pero entonces los doce kilos de pan de Bruno quedan desproporcionados. Decidirlo ANTES de generar: afecta a tres episodios del ttsScript.

**it-a2-01 (t4), it-a2-06 (t1), it-a2-08 (t0), it-a2-13 (t6), it-a2-16 (t2)** · _traduccion / falso amigo enseñado al reves_

- Problema: «sera» se traduce cinco veces por «tarde»: «ieri sera» → «ayer por la tarde» (eps. 1, 6, 8, 16) y «domani sera» → «mañana por la tarde» (ep. 13). En italiano «sera» es la noche/el atardecer («ieri sera» = «anoche»); «tarde» es «pomeriggio». El propio fichero se desmiente dos veces: el ep. 20 traduce bien «Stasera» → «Esta noche», y el ep. 5 enseña la keyword «pomeriggio = tarde» y traduce «Che pomeriggio!» → «¡Qué tarde!». El estudiante acaba con dos palabras italianas distintas glosadas igual, y se le refuerza el falso amigo que todo hispanohablante arrastra. Ventaja operativa: solo cambia la columna española, no obliga a regenerar nada.
- Propuesta: ep. 1: «Cuarenta euros. La bicicleta la arreglé yo, anoche, en el taller de mi tío.» · ep. 6: «Todavía no. Pero anoche miré bien la foto.» · ep. 8: «Matteo, anoche le escribí un mensaje a la señora Lucia.» · ep. 16: «¿Y la guitarra? La dejé en el taller anoche.» · ep. 13: «Lo haremos mañana por la noche.» Si se quiere explotar el contraste, añadir «sera = noche / tarde-noche» a las keywords del ep. 1 frente a «pomeriggio = tarde» del ep. 5.

**it-a2-06-quando-ero-giovane** · _diseño de pregunta / la respuesta se regala sin escuchar_

- Problema: Detalle 3: «¿Qué ponían en el patio cada septiembre?» → opciones «Un tavolo lungo» (correcta), «Una bicicleta», «Una puerta nueva». La opción correcta es la única escrita en italiano; las dos distractoras están en español. El estudiante la marca por descarte formal sin haber oído nada, que es exactamente lo que el blueprint prohíbe («Se puede responder escuchando, no solo leyendo» y «el distractor representa una confusión natural y no una trampa»). Es el único caso de mezcla de idiomas en las 100 preguntas: las consolidaciones que van en italiano (eps. 1, 3, 4, 10, 14, 19) lo hacen en las tres opciones, que es lo correcto.
- Propuesta: Poner las tres opciones en español: «Una mesa larga» (correcta), «Una bicicleta», «Una puerta nueva». El italiano ya está donde corresponde, en el feedback: «Lucia dice «mettevamo un tavolo lungo nel cortile»».

**it-a2-11-domani-busseremo** · _registro / traduccion que no dice lo mismo_

- Problema: Turno 4, Giulia: «Sei molto testarda, Valeria. Per questo mi piaci.» — es: «Eres muy testaruda, Valeria. Por eso me caes bien.» «Mi piaci» dirigido a una persona se lee en italiano, por defecto, como atracción; «me caes bien» es «mi stai simpatica». O bien la traducción enseña una equivalencia falsa (y el alumno saldrá diciéndole «mi piaci» a un compañero creyendo que dice «me caes bien»), o bien la línea dice entre dos compañeras de curso algo que el guion no pretende. Está en el ttsScript. Es el mismo tipo de decisión editorial que el «Suivez la chatte !» del francés A1: no es error de lengua, es riesgo evitable a coste cero.
- Propuesta: target: «Sei molto testarda, Valeria. Per questo mi stai simpatica.» (la traducción española actual queda exacta) o, más cálido y todavía A2, «Per questo ti voglio bene».

**serie — fuera del fichero: src/data/practica/series/page-copy.ts y /practica/italiano/a2/escucha** · _operativo / publicacion_

- Problema: El fichero de la serie está bien, pero la tubería que lo publica sigue siendo A1-only. `listeningCopy()` en page-copy.ts codifica el nivel a mano en cinco sitios: `url = .../practica/${language}/a1/escucha`, el título («… A1: …»), la descripción («20 episodios A1 en …»), `progressKey: wl-listening-${language}-a1-progress` y, lo más caro, `audioBasePath: /audio/${language}/a1`. Si esta serie A2 se publica por ahí, la página se anuncia como «Temporada A1», canonicaliza una URL A1 y busca los mp3 en la carpeta A1. Además, /practica/italiano/a2/escucha hoy sirve una página heredada de «Próximamente» con tres diálogos que no tienen nada que ver con esta serie (aeropuerto, entrevista de trabajo, vacaciones en Cerdeña) — justo el precedente que el comentario de cabecera de page-copy.ts dice querer evitar.
- Propuesta: Parametrizar el nivel en `ListeningSeriesCopy` (añadir `level: 'a1' | 'a2'`) y derivar de él url, título, descripción, progressKey y audioBasePath antes de generar y publicar; y sustituir la página heredada de /practica/italiano/a2/escucha por el runner de la serie. No es un hallazgo de lengua, pero bloquea la publicación igual que uno.

### Menors (12)

**it-a2-10-il-pane-piu-buono** · _traduccion_

- Problema: Turno 3, Bruno: «Il più buono della città, cara. E anche il più caro, purtroppo.» — es: «El más rico de la ciudad, guapa.» «Cara» es «querida», tratamiento afectuoso y neutro en boca de un panadero mayor; «guapa» introduce un comentario sobre el aspecto físico que el italiano no hace, dicho por un hombre mayor a una joven extranjera a la que acaba de conocer. Añadido: «guapa» es peninsular y en Colombia «guapo/a» no es el piropo neutro que es en España. Solo afecta a la columna española.
- Propuesta: es: «El más rico de la ciudad, querida. Y también el más caro, por desgracia.»

**serie (traducciones al español)** · _variedad de español / publico objetivo_

- Problema: La columna española es peninsular de forma consistente: «Vale» ×4 (eps. 5, 8, 11, 15), «guapa» (ep. 10), «cogió» ×2 (ep. 16) y voseo peninsular en cinco turnos — «tenéis razón» (ep. 9), «Pasad, chicas» (ep. 12), «Podríais llamar» (ep. 13), «¿Los habéis lavado?» (ep. 16), «Sentaos, por favor» y «Mirad» (ep. 20). El público es una academia colombiana y la protagonista es explícitamente colombiana («Ho studiato architettura a Bogotá», «In Colombia si fa una festa simile»). Comprobado en las otras series: coreano A2, ruso A2, japonés A2 y portugués A1 no usan ninguna forma de vosotros. Es coherente dentro del fichero, así que lo trato como decisión de estilo a confirmar, no como error.
- Propuesta: Si la casa escribe en español neutro/colombiano: «Listo» o «Bueno» por «Vale»; «tienen razón», «Pasen, chicas», «Podrían llamar», «¿Los lavaron?», «Siéntense, por favor», «Miren»; «La tomó Giulia» por «La cogió Giulia». Ninguno toca el audio.

**it-a2-14-qui-si-fa-cosi** · _diseño de pregunta / distractor imposible_

- Problema: Consolidación: «Completa: Le sedie ___ ai vicini.» → opciones «si chiedono» (correcta), «si chiede», «si chiesto». «Si chiesto» no es una secuencia posible en italiano: es una opción muerta que nadie puede considerar, del mismo tipo que el «нету есть» señalado en el ruso A1. Deja la pregunta efectivamente en dos opciones. Caso más leve del mismo problema en el ep. 19: «Mi piacerò» existe como forma pero es semánticamente absurdo y nadie lo confundiría.
- Propuesta: ep. 14: sustituir «si chiesto» por «sono chieste» (contraste real si impersonale / pasiva, y sigue siendo A2). ep. 19: sustituir «Mi piacerò» por «Mi piaceva», que sí es una confusión natural de tiempo.

**it-a2-16-le-abbiamo-lavate-ieri** · _traduccion / coherencia interna_

- Problema: titleEs: «Las lavamos ayer». El referente son «le tovaglie», que el propio fichero traduce como «manteles» (masculino en español) en la keyword («lavate = lavados») y en el turno 5 («Sí, los lavamos ayer y los tendimos al sol»). Título y transcripción del mismo episodio discrepan en género.
- Propuesta: titleEs: «Los lavamos ayer».

**it-a2-04 / it-a2-15 / reparto de la serie** · _terminologia española inconsistente_

- Problema: La señora Lucia recibe tres etiquetas distintas en español para el mismo oficio: «Sastra del barrio» (ficha de personaje), «La costurera de via delle Rose» (titleEs del ep. 4 y keyword «sarta = costurera» del ep. 15) y «La sastra abre y resulta que vive en ese patio» (feedback del gist del ep. 12), mientras su local es siempre «la sastrería». El estudiante que está construyendo el par sarta/sartoria recibe tres anclas distintas.
- Propuesta: Elegir una y aplicarla en los cuatro sitios. «Costurera» es la más transparente para sarta; «sastra» encaja mejor con «sastrería». Cualquiera vale; lo que no vale es alternarlas.

**it-a2-07-pioveva-forte** · _continuidad / pista sin resolver_

- Problema: Turno 7, Valeria: «Una bicicletta gialla disegnata con il gesso, proprio uguale alla mia.» El dibujo de tiza cierra el episodio, es la respuesta del detalle 3 y el storyFunction lo declara como LA pista («La primera visita fracasa, pero deja la pista dibujada en el portón»). Pero no vuelve a aparecer: ni en el ep. 12, cuando llaman a ese mismo portón, ni en el ep. 18, donde Lucia explica la tradición completa. El estudiante que siguió la pista no cobra nunca.
- Propuesta: Un turno del ep. 18 lo resuelve sin subir de nivel: Lucia, «E il disegno sul portone? Lo faccio io ogni anno, così chi arriva sa di essere nel posto giusto.» O, más barato, en el ep. 12 tras abrirse la puerta: Valeria, «E la bicicletta disegnata sul portone?» → Lucia, «Ah, quella la disegno io ogni settembre.»

**it-a2-01 / it-a2-18 / it-a2-19** · _continuidad / agujero de verosimilitud_

- Problema: El ep. 18 revela que Lucia y Bruno dejan la misma bicicleta amarilla en el mercadillo cada año («L'abbiamo lasciata lì noi. Ogni anno facciamo la stessa cosa»). Pero Matteo vende en ese mercadillo todos los domingos (ep. 1: «lavoro qui la domenica»), es mecánico de bicis y afirma haberla puesto a punto la noche anterior en el taller de su tío. Es decir: revisó la bici sin ver el sobre bajo el sillín —que Valeria encuentra al primer lavado, ep. 2— y no reconoció una bicicleta que reaparece en su puesto todos los años. En el ep. 19 se ofrece a devolverla al mercadillo sin ninguna reacción de reconocimiento. No es una contradicción cerrada, pero es el hilo del que tira un estudiante atento.
- Propuesta: Una línea lo neutraliza y de paso premia al que escuchaba: en el ep. 18 o 19, Matteo, «Allora ecco perché ogni anno trovo una bicicletta gialla al mercatino…». Alternativa: en el ep. 1, quitarle el mérito de la reparación («L'ha sistemata mio zio, ieri sera») para que nunca haya tenido la bici en las manos.

**it-a2-02-sotto-la-sella** · _diseño de pregunta / distractor muerto y anticipacion_

- Problema: Detalle 3: «¿Qué le falta a la nota?» → distractor «La firma del panadero». En el episodio 2 no ha aparecido ningún panadero: Bruno entra de oídas en el ep. 8. El estudiante no puede evaluar la opción (no es una confusión plausible, es ruido) y, de paso, se le adelanta que hay un panadero en la historia.
- Propuesta: Sustituir por «La firma de quien la escribió», que sí es confusión natural frente a «Non c'è né una data né un indirizzo» y no adelanta nada.

**it-a2-11-domani-busseremo** · _redaccion de la pregunta (español ambiguo)_

- Problema: Detalle 1: «¿Por qué van a preguntar?» → correcta «Por la cena de septiembre». En español «¿Por qué…?» se lee primero como causa ('why'), no como «¿acerca de qué?». La pregunta pide una cosa y su formulación sugiere otra; solo las opciones desambiguan.
- Propuesta: «¿Qué van a preguntar?» o «¿Sobre qué van a preguntar?».

**it-a2-06 (t5, t6), it-a2-07 (t1), it-a2-13 (t5), it-a2-18 (t4)** · _naturalidad (retoques de estilo, ninguno erroneo)_

- Problema: Cinco líneas correctas pero por debajo de lo que diría un nativo. Ep. 6 t5: «faceva i vestiti per me» → el italiano coloca el clítico («mi faceva i vestiti»). Ep. 6 t6: «Allora capisce.» a secas queda cortado, falta el complemento. Ep. 7 t1: «una porta verde piccola» apila dos adjetivos pospuestos; lo natural es anteponer el de tamaño. Ep. 13 t5: «spiegare la festa» — se explica algo A alguien o se habla DE la fiesta; la propia traducción («explicar lo de la fiesta») delata la incomodidad. Ep. 18 t4: «come è arrivata» sin elidir, cuando el fichero elide en todos los demás casos («cos'è», ep. 2).
- Propuesta: Ep. 6 t5: «Quando ero piccola, mi faceva i vestiti.» · Ep. 6 t6: «Allora mi capisce.» · Ep. 7 t1: «Il primo cortile aveva una piccola porta verde.» · Ep. 13 t5: «Potreste bussare a tutte le porte e parlare della festa.» · Ep. 18 t4: «E allora com'è arrivata al mercatino dell'usato?» Todos dentro del A2 y sin tocar keywords ni preguntas.

**it-a2-04-la-sarta-di-via-delle-rose** · _ortografia (no audible)_

- Problema: Turno 0: «Posso farle una domanda?» es el único clítico de cortesía escrito en minúscula. El resto de la serie lo capitaliza sistemáticamente: «con Lei» (ep. 6), «per Lei» y «Le faccio vedere» (ep. 10), «se non Le dispiace» (ep. 13), «Suo fratello» (ep. 18). No afecta al audio, pero la transcripción se ve en pantalla y es justo el rasgo que distingue la cortesía del pronombre de 3.ª persona.
- Propuesta: «Posso farLe una domanda?»

**serie (characters, entrada 'Tutti')** · _spoiler en ficha de personaje_

- Problema: role: «Coro de vecinos en la cena del patio (episodio 20)». Es la única ficha que nombra el desenlace: confirma que la cena existe, que ocurre en el patio y en qué episodio, cuando el enigma de toda la temporada es precisamente si esa cena existe y dónde. Honestidad: hoy no llega al alumno — `series.characters` solo alimenta `seriesCast()` en adapt.ts para el casting de voces, y la premisa que se muestra en pantalla se escribe aparte en page-copy.ts. El riesgo es futuro (si el reparto se llega a pintar en la ficha de la serie) y es el mismo caso que la entrada «별» del coreano A1.
- Propuesta: role: «Coro de vecinos del barrio», voiceProfile sin cambios. La información de producción («la misma línea con tres voces mezcladas») ya está en el voiceProfile y en recommendedChanges del ep. 20, que es donde le corresponde estar.

