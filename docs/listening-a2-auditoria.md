# Auditoría de las series A2 de listening

Revisión independiente de las 6 series recién escritas, previa a generar audio.

| Idioma | ¿Apto? | Bloqueantes | Importantes | Menores |
|---|---|---:|---:|---:|
| italiano | **NO** | 0 | 6 | 12 |
| frances | **NO** | 2 | 8 | 16 |
| portugues | **NO** | 1 | 6 | 12 |
| coreano | **NO** | 2 | 8 | 11 |
| japones | **NO** | 2 | 7 | 11 |
| ruso | **NO** | 2 | 7 | 12 |

---

## italiano

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


---

## frances

**¿Apto?** **NO**

NO apta todavía, pero está cerca: la lengua es muy buena y notablemente mejor que la de A1 en los puntos que allí fallaron. Revisé los 160 turnos y no hay ni un solo error de conjugación, de género o de concordancia: los participios con être están bien acordados según el hablante ('je suis venue' en boca de Léa, 'je suis descendu' en boca de Hugo, 'Cette carte est sortie'), y los seis participios con COD antepuesto del episodio 16 son correctos uno por uno ('la lettre que Claire m'a envoyée', 'Vous l'avez gardée', 'la seule chose que j'ai gardée', 'La carte que vous avez trouvée', 'une vieille boîte que personne n'a jamais ouverte'). La ortografía diacrítica es uniforme, el apóstrofo es siempre el tipográfico U+2019 (0 apóstrofos rectos en todo el fichero) y la ligadura œ está bien codificada. El nivel es A2 real y bien escalonado (passé composé → imparfait → alternancia → COD → COI → y → en → comparativos → futur → si+présent → conditionnel de politesse → qui/que → depuis/pendant → repaso): ni A1 disfrazado ni B1 encubierto. Las trampas de A1 no se repiten: no aparece «la chatte» ni una sola vez (se usa siempre «Biscotte»), no hay «Mademoiselle», no hay «la fête va être dans…» (aquí se usa correctamente «aura lieu»), y no hay dos turnos seguidos del mismo personaje en ningún episodio de los 20 — cosa que en A1 sí ocurría. Mecánicamente cumple el criterio de salida: 20 episodios, 6 palabras clave por episodio (todas verificadas por grep dentro de su propio guion, cero fallos), 1 pregunta global + 3 de detalle + 1 consolidación, detalles ordenados según aparecen en el audio, y ttsScript idéntico a la concatenación de los turnos en los 20 episodios. Lo que bloquea son dos cosas concretas y baratas de arreglar ANTES de gastar créditos: (1) la primera línea del episodio 14 —el clímax de la serie— es una fórmula telefónica mal formada que además no dice lo que dice su traducción; (2) el último turno del episodio 9 revela el limón, que es justamente el descubrimiento del episodio 10 y la respuesta a su pregunta global, de modo que la pregunta queda invalidada por el episodio anterior (y el limón está además en las tarjetas de vocabulario del 9). A eso se suma una tanda de contradicciones narrativas que un oyente atento pilla —la fiesta se anuncia «dans la cour» y cuatro turnos después Inès decora «la salle commune»; una «carte que Monsieur Bertin nous a prêtée» que nadie prestó nunca; un «cahier de Claire» que en el episodio 8 se dijo que estaba en Marsella— y un agujero de premisa que la temporada abre y no cierra: nunca se explica cómo llegó media receta de hace doce años al interior de un cuaderno nuevo. Ninguna ficha de personaje revela el desenlace (Claire aparece como pastelera en Marsella, que es información de los episodios 3-4, no del final). Con los dos bloqueantes y las siete continuidades corregidas —todo son retoques de una línea— la serie queda lista para generar.

**Blueprint:** incumple → respuestasDistribuidas, continuidadNarrativa

### Bloqueantes (2)

**fr-a2-14-allo-marseille · turno 1** · _lengua / traducción_

- Problema: Claire descuelga el teléfono de su pastelería con «Allô ? Pâtisserie des Oliviers, bonjour. Qu’est-ce que je peux faire ?». La fórmula está truncada: sin «pour vous», «Qu’est-ce que je peux faire ?» significa «¿y qué quiere que le haga yo?», un encogimiento de hombros resignado, no un ofrecimiento de ayuda. Ningún comercio francés atiende así. Además la traducción española dice «¿En qué puedo ayudar?», que es lo que se quiso escribir pero no lo que el francés dice: audio y subtítulo quedan desalineados. Es la primera línea del episodio clímax y la primera vez que se oye a Claire.
- Propuesta: target: 'Allô ? Pâtisserie des Oliviers, bonjour. Qu’est-ce que je peux faire pour vous ?' (o, más natural al teléfono, '…bonjour. Je vous écoute.' — aunque entonces conviene retocar el turno 5, que ya usa «Je vous écoute»). La traducción española actual ya vale.

**fr-a2-09-plus-sucre-moins-facile · turno 8 (+ keywords)** · _continuidad / validez de la pregunta_

- Problema: Hugo cierra el episodio 9 con «Patience. Demain, nous recommençons avec plus de citron.» y 'citron' figura además como palabra clave del episodio 9. Pero el descubrimiento del limón es el nudo del episodio 10: Madame Martin lo deduce («Claire ajoutait toujours un petit fruit jaune» → «Plus petit qu’une pomme et beaucoup plus acide» → «Un citron !») y la pregunta global del 10 es literalmente «¿Qué descubren gracias a Madame Martin? → Que falta un limón en la receta». Tal como está, el alumno ya sabe la respuesta un episodio antes, incluso desde la fase de vocabulario, y el descubrimiento del episodio 10 queda vacío. Es contradicción interna, no anticipación deliberada: el audit del propio episodio 10 dice «añade la pieza que falta».
- Propuesta: Cambiar el remate del episodio 9 por algo que no nombre el ingrediente: 'Patience. Demain, nous recommençons du début.' o 'Patience. Demain, nous demandons de l’aide à Madame Martin.' (esto último además encadena con el episodio 10). Y quitar 'citron' de las keywords del episodio 9, sustituyéndolo por 'demande' o 'temps', que sí son audibles ahí.

### Importantes (8)

**fr-a2-11-la-fete-du-quartier · turnos 1 y 4** · _continuidad interna_

- Problema: En el mismo audio de 52 segundos: Inès abre con «La fête du quartier aura lieu le premier samedi de juin, dans la cour» y cuatro turnos después dice «Et moi, je décorerai la salle commune avec des rubans rouges». Decora una sala donde no pasa nada. El episodio 20 confirma que la fiesta es en el patio (location: 'Patio del edificio, fiesta del barrio'). Peor: la pregunta de detalle 3 pregunta «¿Qué decorará Inès?» y da como correcta 'La sala común', con 'El patio' como distractor — es decir, el distractor es la única opción narrativamente coherente. Es exactamente el mismo tipo de fallo (salon/salle commune) que ya se detectó en A1.
- Propuesta: turno 4: 'Et moi, je décorerai la cour avec des rubans rouges.' y en la pregunta de detalle 3 cambiar la respuesta correcta a 'El patio' con distractores 'La sala común' y 'La panadería'. Alternativa si se quiere conservar la salle commune (que sí se usa en el episodio 19): añadir en el turno 4 «…et la salle commune, s’il pleut», que además recupera el gag de la lluvia de la temporada 1.

**fr-a2-20-le-gateau-de-claire · turno 1** · _naturalidad / fórmula_

- Problema: El coro recibe a Claire con «Bienvenue à Lyon, Claire ! Bon retour dans le quartier !». «Bon retour» es la fórmula que se dice a quien SE VA («buen viaje de vuelta»), no a quien acaba de llegar; existe «bon retour parmi nous» como bienvenida, pero «bon retour dans le quartier» a secas suena a despedida y choca de frente con «Bienvenue» de la frase anterior. Es la línea coral que abre el cierre de la temporada, la más expuesta de toda la serie.
- Propuesta: target: 'Bienvenue à Lyon, Claire ! Bon retour parmi nous !' o, más claro y más A2, 'Bienvenue à Lyon, Claire ! Le quartier est content de te revoir !'. La traducción española («¡Bienvenida de vuelta al barrio!») sigue valiendo.

**fr-a2-19-biscotte-recommence · turno 3** · _continuidad_

- Problema: Léa pregunta «Où est la carte que Monsieur Bertin nous a prêtée hier soir ?». Monsieur Bertin nunca prestó ninguna tarjeta: en el episodio 8 se ve una página con la letra C en SUS cuadernos, en el 12 se lee una dirección en la última página, y en ningún momento entrega nada. Y «la carte», en toda la temporada, designa un único objeto: la media receta que salió del cuaderno de Léa (ep. 1, ep. 16 «La carte que vous avez trouvée», ep. 20 «La deuxième moitié de la carte»). El oyente entiende que Biscotte se lleva LA tarjeta central, atribuida por error a Bertin. La pregunta global del episodio («Biscotte se lleva la tarjeta») refuerza la confusión.
- Propuesta: turno 3: 'Où est la carte de Claire ? Elle était sur la table hier soir.' y ajustar la pregunta de detalle 2, que hoy pregunta «¿Quién les prestó la tarjeta?» → sustituirla por una sobre el trato con Biscotte o sobre la silla.

**fr-a2-12-une-adresse-a-marseille · turno 1** · _continuidad_

- Problema: Monsieur Bertin dice «Si je retrouve le cahier de Claire, je vous appellerai tout de suite», pero en el episodio 8, cuatro episodios antes, él mismo zanjó el asunto: «Elle a emporté ses cahiers à Marseille. J’en suis absolument sûr.» El personaje se desdice sin motivo, y el «absolument sûr» del episodio 8 era precisamente el remate de aquel turno.
- Propuesta: turno 1: 'Si je retrouve mes vieux cahiers de cette année-là, je vous appellerai tout de suite.' Así el hallazgo del turno 4 («regardez la dernière page : il y a une adresse») cae sobre un cuaderno suyo, que es lo coherente con el episodio 8 y con la escena en la trastienda.

**fr-a2-01-une-carte-dans-le-carnet · turno 5** · _continuidad / autonomía del audio_

- Problema: Inès identifica la tarjeta con un «Le gâteau de Claire…» que el oyente no puede seguir: en todo el episodio nadie dice que la tarjeta esté firmada (la premisa de la serie sí lo dice, el guion no), y el episodio 3 existe precisamente para contar quién es Claire («Madame Martin cuenta quién es Claire»). Además, en la temporada 1 Claire solo se nombra en el episodio 15, en el sótano, escena en la que Inès no está presente (characters: Léa, Hugo, Madame Martin). Inès reconoce a una persona de la que nunca ha oído hablar, a partir de un dato que no se oye.
- Propuesta: turno 5: 'Regarde, c’est signé : Claire. Et quelqu’un a déchiré la deuxième moitié !' — una palabra hace audible la firma y deja intacta la revelación del episodio 3 (quién es Claire), que pasa a responder a una pregunta ya planteada.

**fr-a2-10-dur-comme-une-pierre · consolidación** · _calidad de pregunta (criterios 2 y 3 del blueprint)_

- Problema: «Completa: Il est aussi dur ___ une pierre.» con opciones ['que', 'qu’', 'de'] y respuesta 'qu’'. Es un ejercicio de ortografía disfrazado de escucha: la diferencia entre «que» y «qu’» es una convención escrita de elisión, no un dato que el alumno pueda localizar en el audio, y el blueprint prohíbe explícitamente el distractor que es «una trampa ortográfica» y exige que la pregunta «se pueda responder escuchando». Como pregunta de cierre de la fase 6 no comprueba nada de lo escuchado.
- Propuesta: Sustituir por un ítem anclado en el audio, p. ej.: «¿Con qué compara Madame Martin el limón?» ['Con una pomme, más grande', 'Con una pomme: más pequeño y más ácido', 'Con el beurre'] → 1, feedback: «Oíste “Plus petit qu’une pomme et beaucoup plus acide”». Si se quiere conservar el foco gramatical, usar la comparación audible: «Il est aussi dur ___ une pierre» con opciones ['plus', 'que', 'moins'], donde las tres se oyen y solo una encaja.

**serie completa (ep. 1 ↔ ep. 20)** · _continuidad / agujero de premisa_

- Problema: La temporada arranca porque media receta antigua aparece dentro del cuaderno rojo NUEVO que le regalaron a Léa en el episodio 20 de A1, y nunca se explica cómo llegó ahí. El episodio 16 solo dice de dónde viene el papel («vient du même cahier» que la carta de Claire) y el episodio 20 solo dice quién tenía la otra mitad («Je l’ai gardée pendant douze ans»). Nadie —ni Madame Martin, que es la candidata evidente— dice haberla puesto en el cuaderno. Se pierde además el gancho que A1 dejó servido: en A1 ep. 19 faltaba justamente «la page avec le gâteau» del cuaderno viejo.
- Propuesta: Un turno en el episodio 20, después de «La deuxième moitié de la carte», p. ej. Madame Martin: 'Et la première, c’est moi. Je l’ai glissée dans ton carnet neuf, le jour de mon anniversaire.' Cierra el arco, ata las dos temporadas y cabe en el nivel A2 (passé composé + COD antepuesto, ya practicados en el ep. 16).

**fr-a2-11-la-fete-du-quartier · turno 7** · _naturalidad / colocación_

- Problema: «Nous inviterons aussi Monsieur Bertin. Il connaîtra enfin nos progrès.» «Connaître les progrès de quelqu’un» no es colocación francesa: es calco de «conocerá nuestros progresos». Lo que hace un francófono con los progresos ajenos es verlos o descubrirlos.
- Propuesta: 'Il verra enfin nos progrès.' (o 'Il goûtera enfin nos progrès.', que además rima con el tema del episodio y mantiene el futur simple que se practica).

### Menors (16)

**fr-a2-08-jen-ai-des-centaines · turno 1** · _gramática de registro_

- Problema: «Des vieilles recettes, j’en ai des centaines dans ces cahiers gris.» Con adjetivo antepuesto al sustantivo plural, la norma es «de» y no «des»: «De vieilles recettes». El habla espontánea dice «des» constantemente, así que no es un error que chirríe, pero en material didáctico modela la forma que después se corrige en clase, y es la primera frase del episodio.
- Propuesta: 'De vieilles recettes, j’en ai des centaines dans ces cahiers gris.' Si se prefiere no complicar al alumno con esa regla, reformular: 'Des recettes anciennes, j’en ai des centaines…'

**fr-a2-10-dur-comme-une-pierre · turno 3** · _naturalidad / lógica_

- Problema: «C’est ma faute. J’ai attendu trop longtemps devant le four.» Esperar delante del horno no es lo que endurece un pastel; lo que se dejó demasiado tiempo es el pastel, no Hugo. La frase suena a traducción y no transmite la causa que el turno debe explicar.
- Propuesta: 'C’est ma faute. J’ai laissé le gâteau trop longtemps dans le four.' Mantiene el passé composé y hace audible el motivo.

**fr-a2-17-depuis-douze-ans · turno 6** · _naturalidad / didactismo forzado_

- Problema: «J’ai attendu pendant beaucoup trop longtemps.» Con «trop longtemps» el «pendant» sobra y el resultado no es idiomático: un nativo dice «J’ai attendu bien trop longtemps». Se nota que la preposición está ahí por el objetivo del episodio, no por la frase.
- Propuesta: 'Vous avez raison. J’ai attendu beaucoup trop longtemps.' El «pendant» ya queda practicado dos turnos antes («Pendant deux ans, nous avons beaucoup écrit») y en todo el episodio 18.

**fr-a2-05-une-recette-a-moitie · turno 6 (+ location)** · _continuidad / metadato_

- Problema: La escena está declarada en 'Cocina de Léa' y, estando ya allí, Léa dice «On essaie samedi ? Je vous invite chez moi.» Invitar a su casa a quien está sentado en su cocina suena raro en cuanto se escucha con atención.
- Propuesta: O bien cambiar la location a 'Cafetería de la universidad' (donde ya transcurre el ep. 6), o bien el turno: 'On essaie samedi ? Ici, chez moi, à dix heures.'

**fr-a2-02-le-papier-de-la-boulangerie · turno 2** · _naturalidad del diálogo_

- Problema: Léa acaba de decir «Regarde cette carte» y Hugo responde «Attends. Je suis descendu à la cave trois fois ce matin.» El turno no responde a nada: está ahí para colocar un verbo con être y un número que después pregunta el quiz («¿Cuántas veces bajó Hugo al sótano?»). Se oye la costura.
- Propuesta: 'Attends, je suis crevé : je suis descendu à la cave trois fois ce matin.' Con la causa explícita el turno deja de ser un no sequitur y el número sigue siendo audible para la pregunta.

**fr-a2-09-plus-sucre-moins-facile · turno 7** · _naturalidad / comparación_

- Problema: «Le résultat est quand même moins bon que la photo du cahier.» Se compara el sabor de un pastel con una fotografía. En francés se compara con lo que se ve EN la foto: «moins beau que sur la photo».
- Propuesta: 'Le résultat est quand même moins beau que sur la photo du cahier.'

**fr-a2-12-une-adresse-a-marseille · turno 5** · _traducción / ambigüedad_

- Problema: «Claire Martin, rue des Oliviers, Marseille. Elle écrivait très bien.» Por el contexto (Bertin está mirando una letra manuscrita, y el ep. 16 gira sobre «la même écriture») lo que se quiere decir es que tenía buena letra, pero «elle écrivait très bien» se entiende como «escribía bien» en el sentido literario. La traducción española («Escribía muy bien») arrastra la misma ambigüedad en vez de resolverla.
- Propuesta: target: 'Elle avait une très belle écriture.' · es: 'Tenía una letra preciosa.' Además prepara el vocabulario 'écriture' que es palabra clave del episodio 16.

**fr-a2-08-jen-ai-des-centaines · turno 5** · _naturalidad_

- Problema: «Mais la fin de la recette manque encore.» El orden natural en francés hablado es impersonal: «Il manque encore la fin de la recette». Tal como está suena a construcción escrita, y además el episodio 1 ya usa bien la forma idiomática («Oui, il manque la fin»).
- Propuesta: 'C comme Claire ! Mais il manque encore la fin de la recette.'

**fr-a2-05 (título) y fr-a2-18 (título)** · _títulos_

- Problema: «Une recette à moitié»: «à moitié» modifica normalmente a un verbo o adjetivo («à moitié écrite», «à moitié effacée»); suelto detrás del sustantivo queda cojo. Y «Deux heures de cuisine» anuncia una duración que no se menciona en ningún turno del episodio 18 — allí lo único que se cuantifica son diez minutos de mezcla y cuarenta años de oficio; el título no tiene apoyo audible.
- Propuesta: Ep. 5: 'Une recette à moitié effacée' o 'La moitié d’une recette'. Ep. 18: 'Dix minutes, pas plus' (cita literal del turno 4 y respuesta de la pregunta de detalle 2).

**serie completa (preguntas globales)** · _calidad de pregunta / distribución_

- Problema: La respuesta correcta de las 20 preguntas globales se reparte 8 / 11 / 1 entre las posiciones 1, 2 y 3: la tercera opción solo es correcta una vez en toda la serie (episodio 11). Un alumno que descarte sistemáticamente la última opción acierta 19 de 20 sin escuchar nada. En el conjunto de las 100 preguntas el reparto sí es aceptable (32 / 44 / 24).
- Propuesta: Rotar el orden de las opciones de la pregunta global en unos seis episodios para acercarse a un reparto 7/7/6. No afecta al audio: puede corregirse incluso después de generar.

**fr-a2-03, fr-a2-09, fr-a2-13 · consolidación** · _calidad de pregunta (criterio 2 del blueprint)_

- Problema: Tres consolidaciones son preguntas de metalengua que se responden sin haber oído el audio: «¿Qué forma describe una costumbre del pasado?» (ep. 3), «El comparativo de superioridad de bon es:» (ep. 9), «¿Cuál es la fórmula más cortés?» (ep. 13). La fase 6 debe comprobar que el alumno recupera lo escuchado sin la transcripción; aquí comprueba si recuerda una regla. Las otras diecisiete sí están ancladas en una frase concreta del guion, así que el patrón es corregible.
- Propuesta: Anclarlas en cita: ep. 3 → «¿Cuál de estas frases dijo Madame Martin?» ['Elle prépare ce gâteau', 'Elle préparait ce gâteau pour tous les anniversaires', 'Elle a préparé un gâteau'] → 1. Ep. 9 → «Hugo dice que la mantequilla es ___ que la margarina» ['plus bonne', 'meilleure', 'moins bonne'] → 1. Ep. 13 → «¿Con qué palabra empieza Léa su petición al teléfono?» ['Je veux', 'Je voudrais', 'Donnez-moi'] → 1.

**reparto de la serie (entrada 'Claire')** · _metadatos / anticipación_

- Problema: La ficha dice { name: 'Claire', role: 'Hermana de Madame Martin, pastelera en Marsella' }. No revela el desenlace (que viaja a Lyon con la mitad que falta), así que en ese punto la serie está limpia; pero sí adelanta las dos revelaciones de los episodios 3 y 4, que son precisamente lo que esos episodios existen para contar. Si la ficha se muestra en la UI del alumno antes de empezar, el episodio 3 pierde su función declarada.
- Propuesta: role: 'Voz al otro lado del teléfono, en Marsella' — suficiente para el brief de voz (mujer mayor, acento del sur) y sin destripar los episodios 3-4. Misma lógica que ya se aplicó al reparto coreano.

**fr-a2-20-le-gateau-de-claire (characters)** · _continuidad de reparto_

- Problema: Inès no habla en el episodio 20: characters es ['Tous', 'Claire', 'Madame Martin', 'Léa', 'Hugo']. Es una de las tres protagonistas de la temporada (aparece en 8 episodios, empuja la trama entera en el 6 y protagoniza el gag del 19) y desaparece de la escena final salvo, quizá, dentro del coro. En el cierre de la temporada 1 sí estaba presente y con línea propia.
- Propuesta: Darle el turno 5 en lugar de Léa ('Alors la recette est enfin complète…') o añadirla al remate. Si se decide dejarla fuera, al menos que el coro 'Tous' la incluya explícitamente en el voiceProfile para el casting.

**fr-a2-03 · turno 2 (vs. fr-a2-04 · turno 4)** · _traducción / coherencia_

- Problema: «Vous habitiez déjà dans cet immeuble ?» se traduce como «¿Ya vivían en este edificio?» (ustedes) y la palabra clave lo refuerza ('habitiez' = 'vivían'), mientras que en el episodio 4 el mismo «vous» dirigido a la misma persona se traduce en singular de cortesía: «Et vous, vous êtes restée ici» → «¿Y usted se quedó aquí?». El francés es ambiguo en el ep. 3 (cabe el plural por 'Claire et moi'), pero el español obliga a elegir y elige distinto en dos episodios seguidos.
- Propuesta: Unificar en el singular de cortesía, que es el trato estable entre Léa y Madame Martin en las dos temporadas: es: '¿Ya vivía usted en este edificio?' y keyword 'habitiez' = 'vivía usted'. Si se prefiere el plural, dejar claro el sujeto en francés: 'Vous habitiez déjà ici toutes les deux ?'

**fr-a2-06-ecris-lui · turno 5** · _continuidad_

- Problema: Inès aconseja «Alors demande son adresse à Madame Martin» y el consejo se evapora: la dirección acaba apareciendo cuatro episodios después en un cuaderno del sótano de la panadería, sin que nadie explique por qué la hermana de Claire —que además guarda una carta suya desde hace doce años, con remitente— no la dio. El oyente atento se queda con la pregunta durante seis episodios.
- Propuesta: Un inciso de una línea en el episodio 7 o al final del 6, p. ej. Léa: 'Je lui ai demandé. Elle a changé de sujet tout de suite.' Convierte el hueco en caracterización de Madame Martin y refuerza el motivo emocional que el episodio 17 desarrolla.

**varios (riesgos TTS antes de generar)** · _pronunciación / producción_

- Problema: Seis puntos que conviene validar en la primera muestra, cinco de ellos sobre datos que son respuesta de quiz: (1) «quatre œufs» (ep. 5) — el plural es /ø/, no /œf/, y los motores fallan mucho aquí; además la ligadura œ (U+0153) aparece en 5 episodios ('sœur', 'œufs') y algunos motores la normalizan mal, como ya pasó en A1. (2) «quarante ans» (eps. 7 y 18) y «douze ans» (eps. 16, 17, 20): liaison obligatoria /kaʁɑ̃t‿ɑ̃/, /duz‿ɑ̃/; sin ella el número queda borroso justo donde el quiz lo exige — es el mismo fallo que se marcó para «soixante ans» en A1. (3) «Pendant dix minutes» (ep. 18): «dix» ante consonante es /di/, no /dis/; es la respuesta de la pregunta de detalle 2. (4) «Inès» vuelve a aparecer en 8 episodios con el mismo riesgo de è que en A1. (5) El episodio 9 se sostiene entero sobre «plus», cuya /s/ final se pronuncia o no según el contexto. (6) El ttsScript concatena los ocho turnos con un espacio: si se genera desde ese campo se pierde la separación de voces, crítico en el episodio 20, que empieza con el coro 'Tous'.
- Propuesta: Generar turno a turno, nunca desde ttsScript. Validar en la primera muestra las líneas de 'quatre œufs', 'quarante ans' y 'Pendant dix minutes'; si el motor falla, forzar con coma («…j’ai travaillé quarante, ans») o con guion («quarante-ans»), como ya se hizo en A1 con «vingt assiettes».


---

## portugues

**¿Apto?** **NO**

El portugués es limpio: no encontré un solo error de gramática, concordancia, conjugación u ortografía en los 160 turnos, ni un calco que un brasileño tache, ni doble sentido en los títulos. Los defectos que la revisión de A1 detectó (el «no envelope diz», «Você tem ajuda?», «trazer» con sujeto inanimado, «provar o bairro», «contracções» y los dos turnos seguidos del mismo hablante que rompían el ttsScript) NO se repiten: aquí ningún episodio tiene dos turnos consecutivos del mismo personaje y la ortografía es brasileña vigente. Las comprobaciones mecánicas salen bien: `node scripts/validate-listening-series.mjs` pasa (20 episodios, 160 turnos, 8.931 caracteres); las 120 keywords se oyen LITERALMENTE en su episodio (verificado por substring, no por el stem heurístico del validador); las 100 respuestas correctas se reparten 30/34/36 entre las tres posiciones; las preguntas de detalle siguen el orden del audio en los 20 episodios; no hay campo `romanization`, que es lo correcto en alfabeto latino. El nivel es A2 real, sin A1 disfrazado ni B1 encubierto, salvo dos estructuras sueltas (infinitivo pessoal en la primera frase de la temporada y futuro do subjuntivo en el ep. 10). Lo que NO está listo es otra cosa: (1) la serie no se puede generar hoy — `scripts/generate-listening-audio.mjs` solo carga ficheros `*-a1-series.ts` y `scripts/listening-voice-casting.json` no tiene voz para «Seu Antônio», que habla 24 turnos, así que `checkCasting()` abortaría; y (2) la pista central del episodio 14, la carta, se contradice a sí misma y contradice la fecha de la lata del episodio 11, y ese texto va dentro del ttsScript, de modo que generar ahora es grabar el agujero. Con esos dos arreglos, más el título del episodio 15 (que promete una palabra que nadie pronuncia) y el paso de las traducciones a «ustedes», la serie queda apta.

**Blueprint:** incumple → continuidadNarrativa

### Bloqueantes (1)

**serie completa** · _operativo / pipeline de generación_

- Problema: La serie no se puede generar hoy, por dos motivos independientes. (a) `scripts/generate-listening-audio.mjs`, en `allSeries()`, filtra `fs.readdirSync(seriesDir).filter(name => name.endsWith('-a1-series.ts'))`: los ficheros A2 son invisibles para el generador y para el dry-run de facturación. (b) `scripts/listening-voice-casting.json` reparte por idioma, no por idioma+nivel, y `languages.portugues.cast` solo contiene ['Sofía','Tiago','Dona Célia','Nina','Todos']. «Seu Antônio», que en A2 habla 24 turnos (más que Dona Célia en toda la temporada 1), no tiene entrada, y `checkCasting()` devolvería «portugues · Seu Antônio: sin entrada en el reparto», que por diseño impide gastar créditos.
- Propuesta: Antes del piloto: extender el filtro a `-a1-series.ts` y `-a2-series.ts` (o parametrizar por nivel) y añadir a `languages.portugues.cast` la entrada de «Seu Antônio» con un voice_id de hombre mayor, voz grave y pausada, claramente distinto del de Tiago. Comprobar después con el dry-run que las seis voces aparecen listadas.

### Importantes (6)

**pt-a2-14-a-carta-dentro-do-livro** · _continuidad / lógica de la pista_

- Problema: La carta se firma a sí misma. Turno 1, Sofía: «A letra é igualzinha à letra da etiqueta» (la etiqueta de la lata, escrita por quien pintó), y turno 4, Sofía: «Não tem assinatura, só as mesmas duas iniciais no final». Es decir: misma letra y mismas iniciales C.M. Pero el contenido agradece el mural («O mural ficou mais bonito do que eu imaginava. Obrigada») y en el episodio 18 Dona Célia confirma que lo pintó «sozinha»: la autora se estaría agradeciendo a sí misma. Además la carta no vuelve a mencionarse en los episodios 18, 19 y 20, pese a figurar en la `premise` como una de las tres pistas.
- Propuesta: Hacer que la carta sea PARA C.M., no DE C.M. Turno 1: «Uma carta! O papel é tão antigo quanto a foto.» Turno 4: «Não tem assinatura de quem escreveu, mas começa com as mesmas duas iniciais: é uma carta para cê e eme.» Y recuperarla en el ep. 18 con un turno de Dona Célia: «Essa carta foi a única coisa boa daquele ano.»

**pt-a2-14-a-carta-dentro-do-livro** · _continuidad / dato falso dentro del audio_

- Problema: Turno 6, Nina: «E a mais antiga também: a carta é de oitenta e seis.» Es falso dentro de la propia serie: la etiqueta de la lata está fechada en «Março de oitenta e cinco» (ep. 11, turno 3) y la foto ya muestra el mural pintado. La carta de 1986 es la pista MÁS RECIENTE. El estudiante acaba de memorizar la fecha de la lata tres episodios antes, porque era respuesta de una pregunta de detalle.
- Propuesta: «E a mais recente também: a carta é de oitenta e seis, um ano depois da lata.» Conserva el año como respuesta de detalle y refuerza la cronología.

**pt-a2-09-um-pedido-educado / pt-a2-10-atras-da-prateleira** · _continuidad / el mural está en dos sitios_

- Problema: El mural está en el muro del patio (eps. 1, 2, 5, 15, 16, 17: «Vocês limparam quase o muro inteiro hoje»). Pero el descubrimiento ocurre dentro del depósito: ep. 9, Sofía: «Nós gostaríamos de olhar a parede atrás daquela prateleira grande», y ep. 10, Tiago: «Ou seja, o mural continua aí, escondido há muitos anos», sobre unas «manchas azuis» de esa pared interior. Ningún turno dice que esa pared sea el otro lado del muro del patio, y nada en los episodios 1-8 motiva ir a mirar detrás de un estante.
- Propuesta: Una línea lo cierra. Ep. 9, turno 2: «Nós gostaríamos de olhar a parede do depósito, porque ela é o outro lado do muro do pátio.» O en el ep. 10, turno 4, Nina: «Claro: esta parede e o muro do pátio são a mesma parede.»

**pt-a2-15-e-preciso-que-todos-ajudem** · _pregunta / palabra que no se oye_

- Problema: El título («É preciso que todos ajudem» / «Hace falta que todos ayuden») y la respuesta correcta de la consolidación («Completa: É preciso que todos ___.» → 'ajudem') usan una palabra que NO se pronuncia en el episodio. Los subjuntivos audibles son «aprovem», «expliquem» y «diga»; «ajudar» solo aparece en el ep. 16 («Eu vou te ajudar aqui»). Incumple el criterio 4 de «Criterios de calidad de pregunta» (la explicación debe apoyarse en una palabra audible) y repite el defecto del ep. 17 ruso, donde «Покажите» daba título y respuesta sin sonar en el audio.
- Propuesta: Opción barata: título «É preciso que todos aprovem» y consolidación «Completa: É preciso que todos os moradores ___.» → 'aprovem'. Opción narrativa: añadir la palabra al turno 2 de Nina: «Então vamos fazer uma reunião no sábado: é preciso que todos ajudem.»

**serie completa (traducciones al español)** · _traducción / variedad dialectal incoherente con la temporada 1_

- Problema: La columna española pasa al «vosotros» peninsular en 13 líneas, mientras la temporada 1 usa «ustedes» sin excepción («¿Ustedes son detectives o niños curiosos?», ep. 10 de A1; «Ahora ustedes conocen todos mis secretos», ep. 19 de A1) y el público es colombiano. Ejemplos: «¿por qué mandasteis esa foto al grupo?» (ep. 6), «¿os acordáis?» (ep. 3), «Guardad esa foto» (ep. 5), «Os oigo desde aquí» y «os lo voy a contar» (ep. 8), «coged la llave azul y devolvédmela» (ep. 9), «vosotros sujetáis estas cajas» (ep. 10), «decidí contaros una parte» (ep. 13), «que lo expliquéis todo» (ep. 15), «¿Trajisteis las esponjas?» y «Dadme una esponja» (ep. 16), «Habéis limpiado» (ep. 17), «¿los dos sois hermanos y nunca hablasteis?» (ep. 19), «Espero que le contéis esta historia» (ep. 20). El resto del léxico sí es latinoamericano («jugo», «celular»), lo que hace el contraste más visible; y la opción correcta de la consolidación del ep. 16, que se muestra en pantalla, es literalmente «Dadme una esponja».
- Propuesta: Reescribir esas líneas en «ustedes» (mandaron, se acuerdan, guarden, los oigo, se lo voy a contar, tomen la llave y devuélvanmela, ustedes sujetan, contarles, expliquen, ¿trajeron?, denme, limpiaron, son hermanos y nunca hablaron, espero que les cuenten) y cambiar la opción del ep. 16 a «Denme una esponja». En «Espero que le contéis esta historia a los próximos vecinos» corregir además el pronombre: «les cuenten».

**pt-a2-18-ce-e-eme / pt-a2-04-a-lupa-da-nina** · _naturalidad del título / ambigüedad de lectura_

- Problema: El título del episodio 18 es «Cê e eme». «Cê» es la grafía coloquial habitualísima de «você» en Brasil, así que un lector brasileño lo parsea como «Tú y eme» antes que como el nombre de la letra C — y es el título del episodio del desenlace, además de la pista central. Mismo efecto en el ep. 4, turno 2 («São duas iniciais bem pequenas, cê e eme») y en el ep. 13, turno 5 («E as iniciais cê e eme são o nome dela?»). Los nombres de las letras son correctos; el problema es que compiten con el pronombre.
- Propuesta: Título: «As duas iniciais» o «Um cê e um eme». En los turnos, desambiguar con artículo: «São duas iniciais bem pequenas: um cê e um eme» y «E as iniciais, um cê e um eme, são as do nome dela?». La pronunciación no cambia, así que no afecta al audio: es legibilidad para el estudiante.

### Menors (12)

**pt-a2-01-a-foto-esquecida** · _nivel / gramática no declarada_

- Problema: La primera frase de la temporada usa infinitivo pessoal flexionado: «Meninos, obrigada por guardarem as decorações da festa no depósito.» Es correcta y natural, pero es material B1 y el campo `grammar` del episodio declara solo ['pretérito perfeito', 'conectores: mas, porque, então']. El estudiante abre la temporada con la única estructura del episodio que no se le ha presentado.
- Propuesta: «Meninos, obrigada por guardar as decorações da festa no depósito.» (A2 puro), o mantenerla y declararla en `grammar` como reconocimiento pasivo.

**pt-a2-10-atras-da-prateleira** · _nivel / gramática no declarada_

- Problema: Turno 1, Nina: «Depois que ela sair do lugar, a gente olha a parede.» Es futuro do subjuntivo, típicamente B1, y el campo `grammar` solo lo presenta como conector ('conectores: enquanto, depois que, assim que, ou seja'). No es un error —es la forma obligatoria en portugués—, pero el estudiante no recibe aviso.
- Propuesta: Mantener la frase y añadir 'futuro do subjuntivo (reconhecimento)' a `grammar`, o simplificar a «Quando ela sair do lugar…» si se prefiere no abrir el tema.

**pt-a2-10-atras-da-prateleira** · _naturalidad / calco_

- Problema: Turno 7, Tiago: «E de permissão também, porque essa parede não pertence a nós.» «Pertencer a nós» es gramatical pero libresco y calca «no nos pertenece»; un brasileño resuelve la idea con el posesivo.
- Propuesta: «…porque essa parede não é nossa.» (o «não pertence à gente»). Sigue siendo A2 y refuerza el posesivo ya trabajado.

**pt-a2-03-quem-pintou-o-muro** · _naturalidad / calco_

- Problema: Turno 2, Tiago: «Mas por que uma pessoa cobre um desenho tão bonito?» El sujeto indefinido «uma pessoa» con presente genérico calca el español «¿por qué una persona tapa…?»; la propia traducción lo delata, porque ya escribe «alguien».
- Propuesta: «Mas por que alguém cobriria um desenho tão bonito?» — o, si se prefiere evitar el condicional por nivel, «Mas por que alguém pintou por cima de um desenho tão bonito?»

**pt-a2-09-um-pedido-educado** · _naturalidad / registro_

- Problema: Dos detalles en el episodio dedicado a la cortesía. (a) Turno 3, Tiago: «Seria possível entrar só dez minutinhos, com você junto?» — «com você junto» es marginal; lo natural es «junto com você». (b) Todo el episodio trata a Dona Célia de «você» («você poderia abrir o depósito», «Você pode ficar tranquila», «Você é a melhor administradora») y no usa nunca «a senhora», que es el marcador de cortesía real del portugués brasileño con una mujer mayor a la que además se llama «Dona». No es un error —en São Paulo se oye— pero es justo la palabra de cortesía que el episodio no enseña.
- Propuesta: (a) «Seria possível entrar só dez minutinhos, junto com você?». (b) Al menos en la petición inicial: «Dona Célia, a senhora poderia abrir o depósito para nós hoje?», dejando «você» en el resto: así el contraste se enseña sin cambiar el objetivo.

**pt-a2-15-e-preciso-que-todos-ajudem** · _naturalidad / traducción_

- Problema: Turno 4, Tiago: «Eu vou levar café e bolo para a reunião ficar simpática», traducido como «para que la reunión sea simpática». «Simpático» se aplica a personas; una reunión queda «animada», «agradável» o «mais leve». En español ocurre igual.
- Propuesta: «…para a reunião ficar mais animada.» / es: «…para que la reunión sea más amena.»

**pt-a2-05-o-muro-e-menor-agora** · _traducción_

- Problema: Turno 2, es: «Entonces alguien tiró un trozo cuando construyeron el garaje», para «Então alguém derrubou um pedaço». En español «tirar un trozo» se lee como «desechar/lanzar», no como «derribar»: el estudiante hispanohablante se imagina otra escena.
- Propuesta: es: «Entonces derribaron un trozo cuando construyeron el garaje.»

**pt-a2-03-quem-pintou-o-muro** · _metadato / gramática que no se oye_

- Problema: `grammar: ['contraste perfeito / imperfeito', 'conectores: por isso, mesmo assim']`, pero «mesmo assim» no se pronuncia en el episodio 3: aparece en el 8 («Mesmo assim, ela não parece brava conosco») y en el 12. El campo `grammar` se muestra al estudiante, así que se le anuncia un conector que no va a oír. Es la misma clase de descuido que los `pronunciationRisks` con palabras ausentes señalados en la revisión de A1.
- Propuesta: Dejar en el ep. 3 `['contraste perfeito / imperfeito', 'conectores: por isso, e depois']` y reservar «mesmo assim» para los episodios 8 y 12.

**pt-a2-04-a-lupa-da-nina / pt-a2-09-um-pedido-educado** · _riesgo TTS heredado de A1_

- Problema: El nombre «Sofía» aparece con tilde española dentro del campo `target` en dos turnos que van al TTS: ep. 4 turno 0 («Sofía, me empresta a foto?») y ep. 9 turno 1 («Mas eu gostaria de saber o motivo, Sofía»). La revisión de A1 ya documentó que una voz pt-BR silabea «So-fí-a»; aquí solo el episodio 1 lleva la nota en `recommendedChanges`.
- Propuesta: Escribir «Sofia» sin tilde en el texto que se envía a ElevenLabs en esos dos turnos (manteniendo «Sofía» en pantalla) y replicar la nota en `recommendedChanges` de los episodios 4 y 9.

**pt-a2-08-dona-celia-muda-de-assunto** · _metadato / coherencia de escena_

- Problema: `location: 'Recepción del edificio'`, pero el diálogo transcurre en un pasillo («Este corredor devolve todas as palavras», turno 5), la keyword del episodio es 'corredor' = pasillo y el enunciado del gist pregunta «¿Qué pasa en el pasillo?». La ficha de ubicación que ve el estudiante contradice la pregunta que debe contestar.
- Propuesta: `location: 'Pasillo del edificio'`. El ep. 9, que sí ocurre en recepción, se queda como está.

**pt-a2-07-antes-aqui-era-uma-padaria** · _lógica narrativa_

- Problema: Turno 7, Sofía: «Oitenta e cinco... Essa data explica muita coisa sobre o muro.» En ese punto nada conecta 1985 con el muro: la lata fechada en marzo del 85 no aparece hasta el episodio 11. La conclusión va cuatro episodios por delante de la evidencia.
- Propuesta: «Oitenta e cinco... Vamos guardar essa data, ela pode servir depois.» Mantiene el año como respuesta de detalle sin adelantar la deducción.

**pt-a2-12-talvez-alguem-saiba** · _continuidad / plan sin ejecutar_

- Problema: El episodio cierra con un plan concreto: «Talvez existam papéis antigos na sala da administração» y «Então vamos procurar hoje». Ese registro nunca se busca: en el episodio 14 la carta aparece «dentro de um livro velho da estante» del salón común, sin relación con la administración.
- Propuesta: Cambiar el destino en el ep. 12 («Talvez existam papéis antigos nos livros velhos do salão») o abrir el ep. 14 reconociéndolo: Nina: «Na administração não tinha nada, mas olha o que eu achei no salão.»


---

## coreano

**¿Apto?** **NO**

La serie está muy por encima de lo que fue la temporada 1 en el momento equivalente. `node scripts/validate-listening-series.mjs` pasa en verde (20 episodios, 160 turnos, 4145 caracteres); las 120 palabras clave se oyen LITERALMENTE en su episodio (verificado por script, no de memoria: cero excepciones necesarias); la romanización está en los 160 turnos, sigue el criterio único ante ㅎ que el propio fichero declara en la cabecera (비슷해요→biseutaeyo, 급해서→geupaeseo, 가득해요→gadeukaeyo, 대답할→daedapal) y resuelve bien lo difícil (짧지만→jjaljiman, 읽었네요→ilgeonneyo, 많네요→manneyo, 놓을까요→noeulkkayo, 별아→Byeora, 별이가→Byeoriga); no hay ni un error de partícula, de conjugación, de ortografía ni de espaciado en los 160 turnos (빨개요, 뜨거워서, 밀려서, 못 했어요, 안 잊어요, 스물세 장, 다섯 장씩 — todo correcto); los títulos están limpios, sin dobles sentidos ni vulgaridades (revisé 「우리 말 놓을까요?」, 「이렇게 쓸 수 없어요」, 「알려 주세요」 uno a uno); el nivel es A2 real, ni A1 disfrazado ni B1 encubierto (-지만, -아/어서, -(으)면, -(으)ㄹ 거예요, -아/어 주세요, -(으)ㄹ 수 있다/없다, -고 있었어요, 반말); y —a diferencia de A1, donde la ficha de 별 revelaba el desenlace— NINGUNA ficha de personaje delata que 유나 escribe las cartas, y `adapt.ts` no expone `storyFunction` ni `audit` a la UI, así que los spoilers de los metadatos no llegan al alumno. Corregidos también los defectos heredados de A1: 학원 es coherente en toda la serie (ya no se mezcla con 학교), 두고 갔어요 sustituye al calco 놓았어요, no hay 원해요 ni coreano inventado, y el criterio de la ㅎ ya no es errático. DICHO ESTO, NO está lista para gastar créditos. Hay dos bloqueantes: (1) una frase agramatical en el episodio 3 que además es EL punto que ese episodio enseña y que la pregunta de consolidación cita textualmente —«-아/어서» causal no admite imperativo detrás, es regla dura del 국립국어원—, y (2) una contradicción sobre el contenido de la primera carta que enfrenta la premisa, el episodio 1, el 2 y el final del 20, y que deja la tercera pregunta de detalle del episodio 1 preguntando por «el texto» de una carta que el audio dice que no tiene texto. Los dos obligan a regenerar los episodios 1, 3 y 20 si se descubren después. Debajo, 7 importantes más (contradicción 한국/서울 en el clímax emocional, cinco cajas que aparecen de la nada, calcos del español en las dos frases más emotivas de la temporada, honoríficos ausentes al hablar a la profesora y a la señora mayor, y el hecho de que 17 de 20 consolidaciones se contestan sin escuchar el audio, que incumple el criterio 2 del blueprint) y 10 menores. Todos los arreglos son de una línea. Nota operativa ajena a la lengua: `EXPECTED_SERIES.a2` sigue en 0 en el validador aunque ya existen las seis series A2 escritas; el propio comentario del script dice que debe subir a 6, y mientras no suba una serie A2 puede desaparecer sin que el build falle.

**Blueprint:** incumple → continuidadNarrativa

### Bloqueantes (2)

**ko-a2-03-pyeonjijiga-teukbyeolhaeyo · turno 7 (유나)** · _gramatica_

- Problema: «수요일에는 문을 닫아서 목요일에 가세요.» es agramatical. El «-아/어서» de causa NO puede ir seguido de imperativo (-(으)세요) ni de propositivo (-(으)ㅂ시다): es una restricción dura del coreano estándar («비가 와서 우산을 가져가세요» es incorrecto; hay que decir «비가 오니까…»). El agravante es que este episodio declara objective «원인을 나타내는 -아/어서를 알아듣는다», que la frase es la única aparición causal clara del episodio, y que la consolidación la cita literalmente: «¿Qué expresa 닫아서 en 문을 닫아서 목요일에 가세요?». Es decir, la serie enseña como modelo una construcción que un coreano marca en rojo.
- Propuesta: Cambiar el turno a «수요일에는 문을 닫으니까 목요일에 가세요.» y, para no perder el punto declarado del episodio, mover el «-아/어서» a un turno declarativo del mismo episodio (por ejemplo el turno 4 de 지호 ya lo tiene bien: «편지를 두 장 받아서 우리는 지금 그 사람을 찾고 있어요»). Reescribir la consolidación sobre esa frase: «¿Qué expresa 받아서 en 편지를 두 장 받아서 그 사람을 찾고 있어요?». Si se prefiere conservar la escena tal cual, la alternativa mínima es partirla: «수요일에는 문을 닫아요. 그러니까 목요일에 가세요.»

**ko-a2-01-du-dal-hu (turnos 7-8) + premise + ko-a2-02 (turno 5) + ko-a2-20 (turno 5)** · _continuidad_

- Problema: La primera carta no puede tener y no tener texto a la vez. Episodio 1, turno 8, 지호: «이름은 없어요. 편지지에 작은 별 그림만 있어요.» (만 = SOLO); y la premise lo repite: «편지지에는 작은 별 그림뿐이다». Pero en el episodio 2, turno 5, 소피아 responde a la carta de 지호 («힘내세요. 잘하고 있어요.») con «제 편지하고 똑같아요», y en el episodio 20, turno 5, cierra la temporada con «제 첫 편지를 아직 가지고 있어요. 「잘하고 있어요.」». Consecuencia directa sobre una pregunta: la tercera de detalle del episodio 1 pregunta «¿Qué hay en el papel ADEMÁS DEL TEXTO?» cuando el audio que la sustenta afirma que solo hay un dibujo. La pregunta presupone lo contrario de lo que el alumno acaba de oír.
- Propuesta: Decidir que la primera carta SÍ lleva mensaje (es lo que exigen el ep. 2 y el ep. 20, que además es el remate de la temporada) y arreglar el origen: ep. 1, turno 8 → «이름은 없어요. 「잘하고 있어요.」 그리고 작은 별 그림이 있어요.»; premise → «편지지에는 짧은 인사와 작은 별 그림뿐이다»; y reformular la pregunta 3 del ep. 1 como «¿Qué hay en el papel además del mensaje?» o, mejor, «¿Qué NO hay en la carta?» → «El nombre de quien la escribe» (respuesta literal: 이름은 없어요).

### Importantes (8)

**ko-a2-17-dapjangi-wasseoyo · turno 3 (지호, leyendo la carta) frente a ko-a2-18 · turno 3 (유나)** · _continuidad / verosimilitud_

- Problema: La carta dice «저도 처음에는 한국이 아주 힘들었어요» («al principio COREA me resultó muy difícil»), frase que solo tiene sentido en boca de una extranjera. Pero la autora es 유나, que en el episodio 18 dice «삼 년 전에 저도 서울에 처음 왔어요» (llegó a SEÚL) y que en la temporada 1 y en la ficha de esta serie es «별 카페 직원이자 지호의 오랜 친구», con nombre coreano y voz de hablante nativa. El propio episodio 17 se desmiente a sí mismo cuatro turnos después: 지호 parafrasea «처음에는 서울에서 혼자 지냈어요». Un oyente coreano lee «한국이 힘들었어요» como «soy de fuera de Corea», y eso choca con todo lo demás.
- Propuesta: Cambiar el turno 3 del ep. 17 a «저도 처음에는 서울이 아주 낯설었어요» o «저도 처음에는 서울 생활이 아주 힘들었어요». Queda coherente con el ep. 18 y con la paráfrasis de 지호, y conserva intacto el paralelismo emocional con 소피아 (llegar sola a una ciudad nueva) sin convertir a 유나 en extranjera.

**ko-a2-15-yuna-ssiga-bappayo · turno 3 (지호) frente a ko-a2-14 · turnos 2-3** · _continuidad / dato inventado_

- Problema: 지호 pregunta «손님 한 명이 편지지를 다섯 상자나 두고 갔어요?». Las cinco cajas no existen en el episodio anterior: el ep. 14 habla de UNA sola («그런데 이 파란 상자는 뭐예요?» / 별: «제가 열었어요. 안에 하얀 편지지가 가득해요»). Lo único plural en el ep. 14 es «상자가 정말 많아요», pero 지호 aclara acto seguido que esas son de 컵하고 설탕. El alumno que siguió el episodio anterior oye un número que nadie le dio, y justo en la pregunta de detalle 1 del ep. 15, que gira sobre esa caja.
- Propuesta: O bien ajustar el ep. 15 a lo que sí se oyó: «손님 한 명이 편지지를 한 상자나 두고 갔어요?» (el -나 de sorpresa sigue funcionando con «una caja entera»), o bien sembrar el plural en el ep. 14, turno 3: «제가 열었어요. 이런 상자가 다섯 개 있어요. 안에 하얀 편지지가 가득해요.» La segunda opción es preferible porque refuerza la sospecha sobre 유나.

**ko-a2-20-byeol-kapeui-pyeonjiham · turno 6 (유나)** · _naturalidad / calco del español_

- Problema: «그날 소피아 씨 얼굴이 조금 슬펐어요.» es un calco de «ese día tenías la cara un poco triste». En coreano una cara no está triste: la persona lo está, o la cara lo PARECE. La colocación viva es 슬퍼 보였어요 («se te veía triste») o 표정이 어두웠어요. Tal como está suena a traducción, y no en una línea cualquiera: es la explicación de por qué existe toda la temporada, el remate emocional de veinte episodios.
- Propuesta: «그날 소피아 씨가 조금 슬퍼 보였어요. 그래서 썼어요.» Mantiene el 그래서 que la consolidación del episodio necesita, sigue siendo A2 y es lo que diría un nativo. La traducción española («Ese día tenías la cara un poco triste») puede quedarse igual.

**ko-a2-14-changgoui-paran-sangja · turno 5 (별) y su pregunta de detalle 3** · _naturalidad + traduccion_

- Problema: «유나 씨가 아까 창고에 자주 들어갔어요.» mezcla dos marcos temporales incompatibles: 아까 acota un momento concreto del pasado reciente («hace un rato») y 자주 es frecuencia habitual («a menudo»). Un coreano no las combina. La propia traducción española delata el desajuste: dice «entró VARIAS VECES», que en coreano es 여러 번, no 자주. La pregunta de detalle 3 repite el error («Que Yuna entraba a menudo al almacén») sobre un audio que quiere decir otra cosa.
- Propuesta: Turno: «유나 씨가 아까 창고에 여러 번 들어갔어요.» Pregunta de detalle 3: «Que Yuna entró varias veces al almacén hace un rato», con feedback «Dice 아까 창고에 여러 번 들어갔어요.». Si se quisiera conservar 자주, habría que quitar 아까 y pasar a hábito: «유나 씨는 창고에 자주 들어가요.», pero entonces se pierde el efecto de flagrancia que la escena busca.

**ko-a2-12-dowajul-geoyeyo · turno 1 (소피아)** · _naturalidad + traduccion_

- Problema: «유나 씨, 목요일에 제가 카페를 도와줄 거예요.» tiene dos problemas encadenados. Primero, la traducción no dice lo mismo que el coreano: el español es «voy a ayudarTE en el café» (=유나 씨를 도와주다), pero el coreano dice «voy a ayudar AL CAFÉ». Segundo, 카페를 도와주다 es colocación floja: lo natural es 카페 일을 도와주다. Además, al ofrecerse a hacer algo POR el interlocutor, el coreano usa -(으)ㄹ게요, no -(으)ㄹ 거예요; con -(으)ㄹ 거예요 suena a decisión ya tomada que se le comunica a 유나, no a un ofrecimiento, lo que hace algo brusca la escena en la que 소피아 pide entrar a trabajar en el local de otra persona.
- Propuesta: «유나 씨, 목요일에 제가 카페 일을 도와줄 거예요.» como mínimo (arregla la colocación y ya casa mejor con la traducción, que puede quedar «el jueves voy a echarte una mano en el café»). Si se puede tocar la gramática declarada, lo idiomático es «…제가 카페 일을 도와줄게요.»: el episodio conserva -(으)ㄹ 거예요 en los turnos 5 (닦을 거예요) y 8 (만들 거예요), que son los que la consolidación contrasta.

**ko-a2-07 · turno 6 (소피아) y ko-a2-09 · turno 6 (소피아)** · _registro / honorificos_

- Problema: Dos preguntas dirigidas a personas de estatus superior omiten el honorífico de sujeto -(으)시-: «선생님도 이렇게 쓸 수 있어요?» (a la profesora, sobre una acción de la profesora) y «얼굴을 봤어요?» (a la 문구점 아주머니, señora mayor, sobre lo que ella vio). Lo esperable es 쓰실 수 있어요? y 보셨어요?. Lo que lo convierte en hallazgo y no en licencia de nivel es que la propia serie SÍ usa honoríficos con esas mismas personas en otros turnos: «잠깐 시간 괜찮으세요?» y «천천히 쓰세요» (ep. 6), «주인 아주머니께 물어볼 거예요» (ep. 4, con 께). El alumno recibe dos modelos contradictorios de cortesía en la misma temporada.
- Propuesta: Ep. 7, turno 6: «선생님도 이렇게 쓰실 수 있어요?». Ep. 9, turno 6: «얼굴을 보셨어요? 남자예요, 여자예요?». Son dos sílabas y no alteran ni la duración ni las preguntas del ejercicio. La romanización pasa a «sseusil su isseoyo?» y «bosyeosseoyo?».

**toda la serie — campo consolidation (17 de 20 episodios)** · _diseno de pregunta / blueprint_

- Problema: El blueprint exige, en «Criterios de calidad de pregunta», que una pregunta «se pueda responder ESCUCHANDO, no solo leyendo la transcripción». Diecisiete de las veinte consolidaciones son preguntas de teoría gramatical descontextualizadas que se contestan sin haber abierto el audio ni la transcripción: «¿Qué expresa 쓰고 있어요?» (ep. 1), «¿Qué significa 짧지만?» (ep. 2), «¿Qué significa 쓸 수 없어요?» (ep. 7), «¿Cuál describe una acción en curso?» (ep. 10), «¿Qué significa 할 수 있어요?» (ep. 11), «¿Qué significa 대답할 수 없어요?» (ep. 15), etc. Quien sepa la gramática acierta el 100% sin escuchar, así que la fase 6 («recuperar significado sin volver a leer todo») no mide nada. Los tres episodios que SÍ lo hacen bien —4, 8 y 18— son huecos sobre una frase del audio («Completa: 오늘 밤에 숙제를 ___», «편지를 ___ 기분이 좋아요», «힘든 사람을 ___ 편지를 놓아요») y demuestran que el formato correcto ya existe en el fichero.
- Propuesta: Convertir la mayoría al patrón de los eps. 4/8/18: hueco sobre una frase que se oyó, o «¿cuál de estas frases escuchaste?» con dos variantes sonoramente cercanas. Ejemplos: ep. 1 → «Completa: 저는 한국어로 짧은 이야기를 ___.» (쓰고 있어요 / 썼어요 / 쓸 거예요); ep. 10 → «¿Cuál frase oíste?» (신문을 읽고 있지만 / 신문을 읽었지만 / 신문을 읽을 거지만); ep. 15 → «Completa: 지금 주문이 밀려서 ___.» El feedback actual, que ya explica la forma, se puede reutilizar tal cual.

**ko-a2-01-du-dal-hu · turno 2 (소피아), título y pregunta de detalle 1** · _continuidad_

- Problema: El episodio se titula 두 달 후 / «Dos meses después» y la premise dice «노란 우산 사건이 끝나고 두 달 후». Pero 소피아 sitúa el caso en «지난달에» (el mes pasado), y la primera pregunta de detalle consagra el error: «¿Qué hizo Sofía el mes pasado?». Título, premisa y diálogo dan tres versiones del mismo intervalo en el episodio piloto, que es exactamente donde el alumno construye el marco temporal de la temporada.
- Propuesta: Turno 2: «저는 두 달 전에 지호 씨하고 노란 우산의 주인을 찾았어요.» (romanización: «Jeoneun du dal jeone Jiho ssihago noran usanui juineul chajasseoyo.»). Pregunta de detalle 1: «¿Qué hizo Sofía hace dos meses?». Como bonus, 두 달 전 refuerza el título, que es la primera palabra que el alumno lee.

### Menors (11)

**ko-a2-15-yuna-ssiga-bappayo · turno 7 (지호)** · _naturalidad / calco_

- Problema: «유나 씨는 우리 눈을 안 봐요» calca «no nos mira a los ojos». El coreano tiene expresión propia para eso: 눈을 안 마주쳐요 o 우리 눈을 피해요. 눈을 보다 existe, pero en imperativo afectivo («내 눈을 봐»), no como descripción de una evasiva.
- Propuesta: «이상해요. 유나 씨가 우리하고 눈을 안 마주쳐요.» Sigue siendo A2 y es lo que diría un nativo describiendo justo esa incomodidad.

**ko-a2-12-dowajul-geoyeyo · turnos 5 y 6** · _colocacion_

- Problema: Dos colocaciones flojas seguidas en el mismo episodio: «접시를 닦을 거예요», traducido como «lavar los platos» (닦다 es frotar/secar, no lavar; fregar los platos es 설거지(를) 하다), y «앞치마를 입고», cuando la colocación estándar del delantal es 앞치마를 두르다 (입다 se oye, pero 두르다 es la forma que registra el diccionario). El keyword «닦을 거예요 = voy a lavar» propaga el desajuste a la fase 1.
- Propuesta: Turno 5: «저도 같이 와서 설거지를 할 거예요» (y keyword «설거지 = fregar los platos»); si se quiere conservar 닦다 por sonoridad, basta ajustar el español a «voy a secar los platos». Turno 6: «그럼 앞치마를 두르고 컵을 준비해 주세요.»

**ko-a2-19-pyeonjihameul-mandeureoyo · turno 6 (유나)** · _naturalidad_

- Problema: «봉투도 조금 사 주세요». Con un contable como 봉투, 조금 fuerza la lectura de «una cantidad pequeña de sobre»; el atenuador que un nativo pone en esa petición es 좀 (o una cantidad explícita).
- Propuesta: «미나 씨, 그럼 봉투도 좀 사 주세요.» o «봉투도 몇 장 사 주세요.» La traducción española («compre también algunos sobres») ya apunta a la segunda.

**ko-a2-10-sonnimeul-bogo-isseoyo · turno 8 (유나)** · _naturalidad_

- Problema: «자, 저는 다시 일해요!» como anuncio de que se vuelve al trabajo. El presente declarativo describe un hábito, no una decisión que se toma en ese instante; para eso el coreano usa -(으)ㄹ게요. Tal cual, el turno suena plano justo donde la ficha de auditoría pide que suene apresurado («El último turno de Yuna debe sonar apresurado: corta la conversación»).
- Propuesta: «아, 그건 제가 썼어요. 자, 저는 다시 일할게요!» — un carácter, y la prosodia de corte que pide el audit sale sola.

**ko-a2-18-sam-nyeon-jeonui-pyeonji · turno 5 (유나) — traducción española** · _traduccion_

- Problema: «어떤 손님이 제 책 사이에 편지를 넣었어요» se traduce «Una CLIENTA metió una carta entre las páginas de mi libro». 어떤 손님 no marca género; el español lo inventa. Es el mismo defecto que la revisión de A1 documentó («traducción española: género equivocado») y conviene no reintroducirlo, porque el alumno usa la traducción para inferir el significado del coreano.
- Propuesta: «Un cliente metió una carta entre las páginas de mi libro» o, si se quiere mantener la indefinición del original, «Alguien metió una carta entre las páginas de mi libro».

**ko-a2-17-dapjangi-wasseoyo · turno 7 (소피아)** · _colocacion_

- Problema: «글씨가 조금 떨렸지만 마음이 아주 따뜻해요». 떨리다 se usa con la voz, las manos o la persona; aplicado a la letra ya escrita, lo habitual es 글씨가 조금 삐뚤삐뚤해요 o 글씨가 조금 흔들렸어요. No es agramatical y se entiende, pero es la lectura que un hispanohablante haría desde «la letra tiembla».
- Propuesta: «글씨가 조금 흔들렸지만 마음이 아주 따뜻해요.» La consolidación del episodio («¿Qué significa 떨렸지만?») pasaría a «¿Qué significa 흔들렸지만?» con el mismo feedback sobre -지만.

**ko-a2-04-mogyoil-gyehoek · turno 5 (별) frente a ko-a2-05 y ko-a2-06** · _continuidad_

- Problema: 별 se compromete a un papel concreto en el operativo: «저는 문구점 앞에서 기다릴 거예요. 사진도 찍을 거예요.» En los dos episodios que ejecutan ese plan (5 y 6, ambos en el 문구점) 별 no aparece ni se le menciona, y las fotos no vuelven a salir en toda la temporada. Es el único hilo que se abre y no se cierra.
- Propuesta: Basta una línea en el ep. 5 o 6 que lo recoja, por ejemplo en el ep. 5, turno 8: 소피아 «벌써 네 시예요. 별 씨도 밖에서 사진을 못 찍었어요.», o retirar la promesa de las fotos del ep. 4 dejando solo «저는 문구점 앞에서 기다릴 거예요».

**ko-a2-11-yeonseupago-isseoyo — campo audit.continuity** · _metadato_

- Problema: El audit dice «La TERCERA carta llega justo cuando Sofía duda». Contando lo que la serie ha mostrado, es la cuarta: 소피아 (ep. 1), 지호 (ep. 2), 미나 (ep. 8) y esta. El campo no llega al alumno, pero sí lo usa quien prepare el brief de audio y quien vuelva a auditar la serie.
- Propuesta: «La cuarta carta —y la segunda para Sofía— llega justo cuando duda, lo que estrecha el círculo a alguien que conoce su horario.»

**ko-a2-13-uri-mal-noeulkkayo — campo grammar** · _metadato_

- Problema: El episodio declara grammar: ['반말', '-지만'], pero en los ocho turnos no hay ni una terminación -지만: lo único parecido es el conector independiente 하지만 del turno 8. Como `grammarUsed` del audit se deriva de este campo, la auditoría afirma practicar algo que el audio no contiene.
- Propuesta: Declarar grammar: ['반말', '-(으)ㄹ까요?'] —que sí es la estructura que abre el episodio, «우리 말 놓을까요?», y que no está declarada en ninguna parte— o añadir un -지만 real, p. ej. turno 7: «반말은 아주 친한 사이에 쓰지만 선생님한테는 안 써요.»

**eps. 2, 8, 11, 16, 17, 20 — corchetes 「」 dentro de ttsScript** · _riesgo TTS_

- Problema: Las citas de las cartas van entre corchetes de esquina japoneses 「」, que quedan dentro del `ttsScript` (se concatena directamente desde turn.target). Algunos motores los vocalizan, otros los ignoran y otros insertan una pausa espuria. La serie de A1 no usaba este carácter, así que no hay precedente comprobado con la voz elegida. Añadido: en la romanización esas mismas citas van con comillas rectas ("…"), criterio distinto del hangul.
- Propuesta: Comprobar UNA línea antes del lote —ep. 2, turno 4, que es la primera cita— y, si el motor los lee, sustituirlos en el ttsScript por comillas tipográficas «…» o quitarlos del texto enviado a TTS conservándolos en la transcripción que ve el alumno. Unificar de paso el criterio con la romanización.

**eps. 2, 9, 19, 20 — homofonía 별 (personaje) / 별 그림 / 별 카페** · _riesgo pedagogico / TTS_

- Problema: La misma sílaba nombra al personaje, al dibujo de la estrella y al café, y en varios turnos coinciden los tres usos con 별 presente en escena: «이름은 없지만 별 그림이 있어요» seguido de 별: «별 그림이요?» (ep. 2), «별 카페 컵을 들고 있었어요» (ep. 9, con 별 en la sala), «별아, 상자에 별을 그려 줘» (ep. 19) y «케이크는 별이가 사요» (ep. 20). Es herencia deliberada de A1 y es buena literatura, pero en escucha sin apoyo visual un A2 puede perder de quién se habla justo en los turnos que sostienen preguntas de detalle.
- Propuesta: No cambiar el texto: pedir a la voz una pausa breve antes del vocativo y del nombre propio (별아 / 별이가 / 별 씨) y añadirlo a `recommendedChanges` de los eps. 9 y 19, que hoy no lo mencionan. El ep. 2 ya lo tiene resuelto por el propio diálogo.


---

## japones

**¿Apto?** **NO**

La serie está MUY por encima de la A1 original: los siete riesgos de TTS que hicieron fallar la temporada 1 están resueltos (0 apariciones de 春, 恵美, 星見町 o 緑駅 en kanji dentro de los turnos: se usan はるさん, えみさん, ほしみ町, みどり駅), la ficha de 田中ゆき ya no revela el desenlace como hacía en A1 («青い手帳の持ち主»), las 120 palabras clave se oyen las 120 en su episodio (verificado por script sobre ttsScript, no de memoria), los 158 turnos llevan romanización Hepburn correcta y coherente, la distribución de la respuesta correcta es 32/32/36 y ninguna pregunta tiene opciones duplicadas ni distractores tramposos. El nivel es A2 real (て形＋います → てください → てもいいですか/ないでください → から → ので → た形＋名詞 → たり → と思います → ながら → ができます → 可能形 → つもり), sin B1 encubierto ni A1 disfrazado. El validador pasa. PERO no la generaría todavía: hay dos frases que un nativo marcaría como error y que van dentro del audio, y ambas caen justo en el episodio que dice enseñar esa estructura — exactamente el patrón que dejó a la A1 en «NO apto». A eso se suma un agujero en el eje narrativo de la temporada (por qué el papel dice «ほしの» nunca se explica, y el episodio 12 y el 17 dan explicaciones distintas) y una contradicción entre el ep. 18 y el ep. 20 sobre quién estampa el sello. Corregidos los dos bloqueantes y, como mínimo, el hilo de «ほしの» y el remate del ep. 20, la serie queda apta: el resto son ajustes de metadatos y de traducción que no obligan a regenerar nada.

**Blueprint:** incumple → continuidadNarrativa

### Bloqueantes (2)

**ja-a2-11-sono-ji-ga-yomemasen** · _gramática / contradicción pedagógica_

- Problema: Turno 5, アナ: 「名前が違いますから、袋は店に行けませんでした。」 El potencial 行ける aplicado a un sujeto inanimado (袋) es agramatical para un nativo: una bolsa no «puede ir» a ningún sitio, se entrega o llega (届く/届けられる). Y ocurre en el episodio cuyo objective declarado es 「動詞の可能形で「できる・できない」を聞き取る」 y cuyo grammar es ['動詞の可能形']: el alumno oye el error precisamente en el audio que debe fijarle la forma potencial. Es el mismo patrón que dejó la temporada 1 en «NO apto» (ep. 8 de A1 usaba ありません para un gato en el episodio de あります/います).
- Propuesta: target: 「名前が違いましたから、駅の人は袋を店に届けられませんでした。」 · romanization: 'Namae ga chigaimashita kara, eki no hito wa fukuro o mise ni todokeraremasen deshita.' · es: «Como el nombre no coincidía, el personal de la estación no pudo llevar la bolsa a la tienda.» Mantiene el 可能形 del episodio pero con un agente animado, que es donde la forma es correcta.

**ja-a2-10-kakunin-ga-dekimasen** · _semántica / contradicción interna_

- Problema: Turno 8, 恵美: 「倉庫は土曜日の朝まで開いていますよ。」 En japonés esto significa que el depósito permanece abierto de forma continua HASTA la mañana del sábado, no que el sábado abra por la mañana. Lo dicen un miércoles por la noche y queda desmentido dos episodios después: el ep. 12 dice 「倉庫は十二時に閉まります」 y el ep. 14 「九時に開きます」 (es decir, cierra cada noche y el sábado abre a las 9). Además el detalle 3 del propio episodio consagra la lectura equivocada: «¿Hasta cuándo está abierto el depósito?» → «Hasta el sábado por la mañana». Va dentro del audio y del banco de preguntas, así que corregirlo después obliga a regenerar el episodio.
- Propuesta: target: 「倉庫は土曜日の朝も開いていますよ。」 · romanization: 'Souko wa doyoubi no asa mo aite imasu yo.' · es: «El depósito abre también el sábado por la mañana.» Y reformular el detalle 3 a «¿Cuándo pueden ir al depósito?» → «El sábado por la mañana» / «Solo entre semana» / «El domingo».

### Importantes (7)

**ja-a2-08-kaeshita-to-omoimasu · ja-a2-12-iku-tsumori-desu · ja-a2-17-nijuunen-mae-no-hanashi** · _continuidad / lógica del misterio_

- Problema: El eje de la temporada —por qué el papel dice 「ほしの」— nunca se explica. El ep. 8 establece que quien escribió el nombre en la bolsa fue 佐藤先生 con prisa y mala letra («急いでいましたから、字がきれいじゃないと思います»). El ep. 12 afirma que lo escrito ES 「ほしの」 («「ほしみ」ではありません。「ほしの」と書いてあります»), no que se lea mal. Pero nada explica por qué la profesora escribiría el nombre antiguo del pueblo, que ella no tiene motivo para conocer. Encima las dos revelaciones no coinciden: el ep. 12 dice que ほしの era el nombre del FESTIVAL (「あの祭りは「ほしの祭り」でした」) y el ep. 17 que era el nombre del PUEBLO (「この町の名前は「ほしの」でした」).
- Propuesta: Cerrar el círculo en el ep. 8 con un turno que dé el origen: p. ej. 佐藤先生: 「箱の紙に書いてあった名前を写しました。」 ('Hako no kami ni kaite atta namae o utsushimashita.' / «Copié el nombre que había escrito en el papel de la caja»), de modo que el nombre antiguo venga del propio material del festival y no de su letra. Y unificar ep. 12 y ep. 17 en una sola versión (o el pueblo o el festival, no las dos).

**ja-a2-20-nijuunenme-no-sutanpu** · _continuidad / remate del final_

- Problema: Turno 5, 春: 「押すことはできませんが、応援はできます。」 («Estampar no puedo, pero animar sí»). Contradice frontalmente el ep. 18, donde 田中ゆき les encarga a los dos estampar: 「アナさん、はるさん、六時半に最初のスタンプを押してください。」 y 「二人が見つけましたから、二人が押します。」 Nada en el ep. 19 ni en el 20 explica por qué Haru ya no puede. Es el chiste que cierra la temporada y aterriza como error, no como gracia.
- Propuesta: Si el gesto debe ser de Ana (su libreta), motivarlo: 春: 「手帳はアナさんのですから、アナさんが押してください。ぼくは応援します。」 ('Techou wa Ana-san no desu kara, Ana-san ga oshite kudasai. Boku wa ouen shimasu.'). Si deben estampar los dos, mantener el ep. 18 y cambiar el turno de Ana del 20 a 「二人で押します。」

**series.characters** · _continuidad con la temporada 1_

- Problema: La ficha de アナ dice 「東京で二年目の留学生」 («estudiante en su segundo año en Tokio»), pero el premise del mismo fichero sitúa la temporada 「三か月後」 del final de A1, y en A1 ep. 1 Ana acaba de llegar: 佐藤先生 la presenta como 「新しい学生のアナさん」 y ella dice 「コロンビアから来ました」 en su primer día de clase. Tres meses después no puede ir por su segundo año. La ficha es visible para el alumno y contradice el propio premise dos líneas más abajo.
- Propuesta: role: 「東京に来て半年の留学生」 o simplemente 「東京の留学生、日本語のクラス二学期目」. No afecta al audio (los roles no se locutan), pero conviene arreglarlo antes de publicar las páginas.

**ja-a2-13-kinyoubi-no-denwa** · _registro / naturalidad_

- Problema: Turno 1, 田中ゆき contesta el teléfono de su tienda con 「ゆきです。今、店で紙を切っています。」 Una adulta que atiende el teléfono de su negocio ante dos estudiantes se identifica por el apellido o por el nombre del comercio (「はい、田中です」), nunca solo por el nombre de pila: eso es lo que se dice en familia o entre amigos íntimos. En A1 ella misma se presenta correctamente como 「田中ゆきです」 (ep. 16). Suena a calco del «Soy Yuki» español.
- Propuesta: target: 「はい、田中です。今、店で紙を切っています。」 · romanization: 'Hai, Tanaka desu. Ima, mise de kami o kitte imasu.' · es: «Sí, soy Tanaka. Ahora estoy cortando papel en la tienda.»

**ja-a2-02-sutanpu-ga-arimasen** · _lógica narrativa_

- Problema: Yuki denuncia la desaparición («祭りの木のスタンプがありません») y enseña la caja vacía sin mencionar en ningún momento que ella misma prestó el sello a 佐藤先生 en abril, dato que el ep. 7 da por establecido («ゆきさんに借りました»). Durante quince episodios nadie le pregunta a la dueña a quién se lo prestó —que es lo primero que preguntaría cualquiera— y ella tampoco reacciona en el ep. 13, cuando le cuentan lo del papel. Todo el misterio depende de que la dueña haya olvidado a quién entregó su objeto más valioso.
- Propuesta: Añadir una línea de Yuki en el ep. 2 que cierre la vía por adelantado y de paso justifique el arranque: 「春に先生に貸しましたが、店に返ってきたと思っていました。」 ('Haru ni sensei ni kashimashita ga, mise ni kaette kita to omotte imashita.' / «En primavera se lo presté a la profesora, pero creía que había vuelto a la tienda»). Convierte el olvido en un malentendido verosímil.

**ja-a2-13 · ja-a2-14 · ja-a2-19 · ja-a2-20** · _progresión curricular_

- Problema: Cuatro episodios declarados de repaso introducen estructuras nuevas que no aparecen en ningún grammar de la serie ni de A1: 〜までに (ep. 13, 「六時半までに持って行きます」), la nominalización con の (ep. 14, 「地図を見るのは大変です」) y la nominalización con こと (ep. 19 「休むことも準備ですから」 y ep. 20 「押すことはできませんが」). El ep. 20 está declarado como 「A2総合復習」, es decir, explícitamente sin material nuevo. Los propios possibleDifficulties reconocen las tres estructuras, así que el autor las vio, pero no están declaradas en grammar y el blueprint fija un máximo de dos elementos realmente nuevos por audio.
- Propuesta: O declararlas en grammar (ep. 13: '〜までに'; ep. 14: '〜のは＋形容詞'; ep. 19-20: '〜ことができます') y añadirlas a las palabras clave, o sustituirlas por formas ya trabajadas (ep. 20: 「ぼくは押しませんが、応援します。」).

**ja-a2 (traducción española, 9 turnos)** · _variedad de español / audiencia_

- Problema: La temporada 2 cambia de variedad respecto a la 1. A1 tiene CERO pretéritos perfectos compuestos; A2 tiene ocho («hemos venido», «He mirado todas las listas», «He sacado todas las cajas», «Lo hemos podido encontrar», «Ha estado tres meses», «Ha salido el dibujo»…). El caso más serio es ja-a2-15 turno 1: «Como hoy libro, he venido yo también» — «librar» con el sentido de tener el día libre es peninsular y en Colombia, que es la audiencia del sitio, resulta directamente opaco. El japonés dice 「今日は休みですから」, que es neutro.
- Propuesta: Unificar con la variedad de A1 (pretérito simple, ustedes): «Como hoy tengo el día libre, vine yo también», «Miré todas las listas», «Saqué todas las cajas de abril», «Lo pudimos encontrar», «Estuvo tres meses en este estante», «Salió el dibujo del gato y la estrella».

### Menors (11)

**ja-a2-13-kinyoubi-no-denwa** · _metadatos residuales_

- Problema: audit.pronunciationRisks incluye 'なつかしい', palabra que no aparece en ningún turno del episodio ni de la serie (verificado por script). Es residuo de una versión anterior del guion, exactamente el mismo defecto que la revisión de A1 detectó con '受付' en ja-a1-07.
- Propuesta: Sustituir 'なつかしい' por un riesgo real del episodio: '紙を切っています' o '準備'.

**ja-a2-17-nijuunen-mae-no-hanashi** · _metadatos residuales_

- Problema: audit.possibleDifficulties dice «〜になりました indica cambio de estado», pero 〜になりました no aparece en el ep. 17: la única ocurrencia de la serie está en el ep. 19 (「六時になりました」). La dificultad real del episodio es otra (た形＋名詞 con sujeto explícito: 「たくさんの人が押したスタンプ」).
- Propuesta: Cambiar a «la た形 delante del nombre lleva aquí sujeto propio (が): 町の人が作ったスタンプ».

**ja-a2-05-eki-wa-isogashii-node** · _metadatos / coherencia con el guion_

- Problema: audit.possibleDifficulties afirma «ので pide forma llana o です», pero el primer ので que el alumno oye en toda la serie es 「スタンプが見つかりませんので」 (forma ます), y lo mismo ocurre en el ep. 13 dos veces (「わかりましたので」, 「準備がありますので」). El japonés es correcto —ますので es cortés y muy frecuente—, pero la nota de producción contradice los tres ejemplos que la serie va a locutar.
- Propuesta: Reescribir la nota: «ので admite forma llana y también ます／です; con ます el registro sube y es el que usan los adultos del episodio».

**ja-a2-05-eki-wa-isogashii-node · ja-a2-13-kinyoubi-no-denwa** · _consistencia de la colección_

- Problema: Son los dos únicos episodios con 7 turnos; los otros 18 tienen 8. El total queda en 158 turnos frente a los 160 exactos de las otras cinco series A2 del repo (coreano, francés, italiano, portugués, ruso), y la duración declarada (54 s y 55 s) es la misma que la de episodios con un turno más.
- Propuesta: Añadir un turno de cierre en cada uno. En el ep. 5, una réplica de Ana tras 「夕方に来てください」 («はい、また来ます。»); en el ep. 13, un cierre de Yuki tras 「まかせてください」.

**ja-a2-07-oshitari-kaitari** · _naturalidad / desfase con la traducción_

- Problema: Turno 7, 佐藤先生: 「箱に入れたり、机に置いたりして、最後は紙の袋です。」 El cierre 「最後は紙の袋です」 es elíptico y suena a frase cortada; además el español lo explicita más que el japonés («y al final acabó en una bolsa de papel»), así que subtítulo y audio no dicen lo mismo.
- Propuesta: target: 「箱に入れたり、机に置いたりして、最後は紙の袋に入れました。」 · romanization: '…saigo wa kami no fukuro ni iremashita.'

**ja-a2-15-souko-ni-haitte-mo-ii-desu-ka** · _continuidad de personaje_

- Problema: 恵美 dijo en el ep. 10 「私は倉庫の仕事ができません」 y sin embargo en el 15 es ella quien autoriza la entrada, ordena 「係の人と一緒に入ってください」 —un 係の人 que nunca aparece ni habla— y acaba manipulando las cajas ella misma (「私が箱を取ります」, y en el 16 「四月の箱を全部出しました」). O puede o no puede.
- Propuesta: Ajustar el ep. 10 a 「私はこの駅の係ですから、倉庫の箱は開けられません」 y en el 15 dejar claro que el 係 les acompaña, o eliminar la mención al 係の人 y que Emi asuma abiertamente el papel de acompañante autorizada.

**ja-a2-16-kami-no-fukuro** · _ambigüedad gramatical_

- Problema: Turno 6, アナ: 「見つけられましたね。」 En audio, 見つけられました es homófono del pasivo («fue encontrado / nos encontraron») y solo el contexto lo desambigua. Para el hallazgo de un objeto, el japonés espontáneo es 見つかりましたね, que además es la forma que la propia serie usa correctamente en el ep. 18 (「見つかりました」).
- Propuesta: Si se quiere conservar el 可能形 del episodio, moverlo a un sujeto explícito: 「やっと見つけられましたね、二人で。」 Si no, 「見つかりましたね。」 · rom.: 'Mitsukarimashita ne.'

**ja-a2-05-eki-wa-isogashii-node · ja-a2-09-arukinagara-kangaemasu** · _continuidad temporal_

- Problema: En el ep. 5 恵美 les cita para esa misma tarde («電車が遅れているので、夕方に来てください»), pero ellos van al río (ep. 6), quedan para el día siguiente («明日、佐藤先生に聞きましょう»), pasan la mañana en clase (eps. 7-8) y solo entonces, en el ep. 9, citan la frase de Emi como si fuera de ese día: 「えみさんは「夕方に来てください」と言いました。今、五時半です。」 「ちょうどいい時間です。」 Se saltaron la cita un día entero. Lo mismo pasa entre el ep. 12 («今夜、その名前を調べるつもりです», miércoles) y el ep. 13, titulado 金曜日の電話: el jueves desaparece y la llamada informa de un hallazgo de dos días antes.
- Propuesta: O bien mover el ep. 6 a la mañana siguiente, o cambiar la frase del ep. 9 a 「えみさんは夕方がいいと言っていましたね。」; y en el ep. 13, abrir con 「昨日は電話ができませんでしたが…」 para justificar el salto.

**ja-a2 (títulos en español)** · _diseño de pregunta_

- Problema: En varios episodios el titleEs, que se ve en el listado antes de escuchar, contiene la respuesta del gist: ep. 3 «¿Podemos abrir?» → gist «Piden permiso para revisar cajas y estantes»; ep. 11 «No podemos leer esa letra» → gist «Que el nombre escrito no se puede leer»; ep. 16 «Apareció la bolsa de papel» → gist «El sello de madera dentro de una bolsa de papel». El blueprint pide que la tarjeta del listado no muestre respuestas. Es un defecto heredado de A1 (ep. 2 «La libreta azul» → gist «Una libreta azul»), no una regresión nueva.
- Propuesta: Titular por situación y no por desenlace: ep. 3 «La trastienda», ep. 11 «Una copia borrosa», ep. 16 «El estante de la ho».

**ja-a2-05-eki-wa-isogashii-node · ja-a2-03-akete-mo-ii-desu-ka** · _desajuste título/opción con el audio_

- Problema: Dos desajustes pequeños entre lo que se lee y lo que se oye. (1) El título del ep. 5, 駅は忙しいので / «Como la estación está ocupada», afirma algo que nadie dice: las razones que se oyen son 「祭りが近いので」 y 「電車が遅れているので」. (2) En el ep. 3, la opción correcta del detalle 2 es «El cajón del escritorio», pero el audio solo dice 「引き出しは開けないでください」, sin mencionar ningún escritorio; el distractor «La caja vieja» sí es audible.
- Propuesta: Título del ep. 5: 電車が遅れているので / «Porque el tren va con retraso». Opción del ep. 3: «El cajón».

**ja-a2 (cabecera del fichero)** · _metadatos_

- Problema: Los 20 episodios llevan audit.level: 'A1' aunque la serie es A2. El comentario de cabecera lo justifica (EpisodeAudit y scripts/validate-listening-series.mjs exigen ese literal), y el validador pasa, pero cualquier informe o filtro que lea audit.level etiquetará mal los 20 episodios. Menor pero silencioso.
- Propuesta: Ampliar el tipo a level: 'A1' | 'A2' en schema.ts y actualizar el validador, en lugar de dejar el literal falso en 20 objetos.


---

## ruso

**¿Apto?** **NO**

El ruso está limpio: en los 160 turnos no hay un solo error de caso, aspecto, concordancia de género en pasado (нашла/начала/была en boca de mujeres; написал/боялся/помнил en boca de hombres), conjugación ni ortografía; la ё está escrita en las 29 palabras que la llevan; no hay cifras sin desarrollar; la romanización pasa una comprobación automática turno a turno con 0 divergencias (BGN/PCGN con ё→yo y е→ye en inicial de palabra, el sistema documentado en A1); ids, locations y objectives están todos en ruso (no se repiten los deslices de A1); y ninguna de las 13 correcciones lingüísticas del informe A1 (свой/твой, приходит/подходит, стоит→не едет, брать на себя ответственность, нет+genitivo, каждый вторник, в первом ряду, ко входу…) reaparece. Las 125 palabras clave se oyen literalmente en su episodio (coincidencia exacta, no por lema). Lo que falla no es la lengua, es la lógica narrativa y el diseño de preguntas: dos contradicciones que un oyente atento detecta —el ep. 15 dice haber leído «Зимин» junto a la palabra «текст» cuando el ep. 8 afirma «Автор текста не указан» y sitúa a Зимин entre los actores; y el ep. 9 se titula «Una pregunta en vez de respuesta» y remata con «Он ответил вопросом» aunque el profesor no formula ninguna pregunta—, cuatro preguntas de detalle sostenidas por palabras que la fase 1 no presenta (ремонт, чернила, шкаф, лицо), una pista de género leída por la voz equivocada (ep. 10) y un gist final cuya explicación cita una frase de otro episodio. Añadido: el condicional con бы sostiene cinco episodios y en el estándar ruso pertenece a ТРКИ-1/B1. Todo se corrige en el texto, sin rehacer la serie; ninguna corrección toca más de dos o tres turnos.

**Blueprint:** incumple → continuidadNarrativa

### Bloqueantes (2)

**ep08 ↔ ep15** · _continuidad / contradicción de la pista central_

- Problema: El ep. 8 establece dos veces que el nombre no está junto al texto: София «Автор текста не указан. Опять только луна.» y Миша «Зато есть фамилии актёров: Зимин, Морозова, Ковалёв.» — Зимин aparece como ACTOR, y la respuesta correcta del gist del ep. 8 es literalmente «Los apellidos de los actores, pero no el autor». Pero en el ep. 15, turno 8, Миша dice «В программке студии Луна, рядом со словом текст.» Si el apellido estuviera junto a la palabra «текст», el misterio se habría resuelto en el ep. 8 y la respuesta que el alumno marcó como correcta sería falsa.
- Propuesta: Ep. 15, turno 8 → «В программке студии Луна, рядом со словом актёры.» (es: «En el programa del grupo Luna, junto a la palabra actores.»; rom: «V programmke studii Luna, ryadom so slovom aktyory.»). La deducción sigue en pie: la prueba real la da el ep. 17 (se sabe el texto de memoria).

**ep09** · _coherencia interna / pregunta sin evidencia audible_

- Problema: El título es «Вопрос вместо ответа» y el último turno de Миша es «Он ответил вопросом. Так делают только опытные свидетели.», que además es el feedback del gist. Pero Виктор Петрович no formula ninguna pregunta: sus cuatro turnos son «Слышал. Она работала при университете…», «Один раз. Потом студия закрылась…», «Откройте тетради…» y «Я знаю, что домашнее задание вы ещё не сделали.» — todos afirmativos. Título, remate y explicación de la respuesta describen algo que no está en el audio.
- Propuesta: Convertir el turno 7 en pregunta conservando el chiste y la palabra clave «домашнее задание»: «А домашнее задание вы уже сделали?» (es: «¿Y la tarea, ya la han hecho?»; rom: «A domashneye zadaniye vy uzhe sdelali?»).

### Importantes (7)

**ep02, ep04, ep08, ep12** · _diseño de pregunta / vocabulario no presentado (blueprint fase 1 y §3)_

- Problema: Cuatro detalles se deciden con una palabra que no está entre las 6 palabras clave del episodio. Ep. 2: «Porque hay obras en el teatro» depende de «ремонт» (keywords: потому что, фонарём, тетрадь, ручка, программка, коробка). Ep. 4: «¿Cómo es la tinta?» depende de «чернила» (las seis keywords son comparativos). Ep. 8: «¿Dónde encontró los programas?» depende de «шкаф». Ep. 12: las dos opciones principales, «La cara pero no el nombre» y «El nombre pero no la cara», sólo se distinguen por «лицо», tampoco presentada. El blueprint prohíbe expresamente «opciones que dependan de vocabulario aún no presentado».
- Propuesta: Los cuatro episodios tienen 6 keywords y el blueprint admite 8: añadir ремонт (ep. 2), чернила (ep. 4), шкаф (ep. 8) y лицо (ep. 12). No hay que tocar ningún turno.

**ep20** · _calidad de pregunta / feedback tomado de otro episodio_

- Problema: El gist «¿Cómo termina la historia?» tiene como correcta «La obra se estrena y el autor la ve desde la sala» y como feedback «Спектакль называется Луна… Роль автора — сидеть в зале.» La segunda frase pertenece al ep. 18 (Елена, turno 8) y no se pronuncia en el ep. 20. Además en este audio la función aún no ha empezado (location «Театр перед спектаклем», «Все билеты проданы») y quien se sienta en primera fila es la abuela de Анна, no el autor. La respuesta no se puede contestar escuchando este episodio (criterio 2 de «Criterios de calidad de pregunta»).
- Propuesta: Opción correcta → «El teatro se llena y la obra vuelve a escena cuarenta años después»; feedback → «Все билеты проданы. Спектакль называется Луна, как студия сорок лет назад.», dos frases audibles en el propio ep. 20.

**ep10** · _casting de voz / la pista clave se vuelve ambigua en audio_

- Problema: Todo el episodio se apoya en oír la desinencia masculina de la nota: Елена deduce «Значит, автор мужчина: он написал хотел, а не хотела», y de eso dependen el gist y el detalle 1. Pero la frase citada la lee Миша (turno 4): «А дальше: я бы хотел увидеть её на сцене.» En audio, una voz masculina diciendo «я бы хотел» se atribuye por defecto al propio Миша, no al autor: la marca de género se anula justo donde se enseña.
- Propuesta: Dar el turno 4 a София, que ya lee la primera mitad de la nota en el turno 3. Sólo cambia el campo speaker; con voz femenina, «я бы хотел» queda inequívocamente como cita.

**ep07 ↔ ep18** · _continuidad / cabo suelto en el desenlace_

- Problema: El ep. 7 dedica un episodio entero a explicar cómo llegó la caja al teatro: «Вот запись: коробку студии Луна никто не забрал» y «Мы отдали её театру. Театр был ближе всего.» En el desenlace, Елена resume «Студия закрылась, и коробка осталась под сценой» (ep. 18, turno 3), lo que borra esa cadena; y nadie explica nunca lo que el ep. 7 planteó: quién perdió la caja en el metro. El autor, que recibió él mismo la pluma, no lo menciona.
- Propuesta: Un turno cierra las dos cosas. Ep. 18, turno 3, en boca de Виктор Петрович: «Я забыл коробку в метро, а потом было поздно её искать.» (es: «Olvidé la caja en el metro y después ya era tarde para buscarla.»; rom: «Ya zabyl korobku v metro, a potom bylo pozdno yeyo iskat'.»). Enlaza con «Сначала я ждал, потом привык ждать» del turno siguiente.

**premise ↔ ep01** · _continuidad con la temporada 1 / calendario imposible_

- Problema: La premisa declara «Второй семестр. София возвращается в Москву», pero el ep. 1 sitúa el regreso tras las vacaciones de VERANO: «София вернулась в Москву после каникул» y Миша «А я всё лето отдыхал и ничего не повторял.» En el calendario ruso el verano nunca separa el primer semestre del segundo. Además la A1 transcurre en temporada fría (шарф, тёплый, красное пальто), así que el audit del ep. 1 («seis meses después del final de A1») tampoco cuadra con «всё лето».
- Propuesta: Elegir una: (a) mantener el verano y cambiar la premisa a «Новый учебный год. София возвращается в Москву…» —no toca ningún turno—; o (b) mantener «второй семестр» y pasar el ep. 1 a vacaciones de invierno («после зимних каникул», «всю зиму отдыхал»).

**ep10, ep12, ep18, ep19, ep20** · _nivel — B1 encubierto_

- Problema: El condicional con бы sostiene cinco de los veinte episodios y se declara como gramática de cuatro («условное наклонение с бы»), con casos dobles: «Если бы он подписался, мы бы уже пили чай», «Если бы мы не искали, ремонт закончился бы без истории». En el estándar ruso (ТРКИ) el сослагательное наклонение entra en el Первый сертификационный / B1; el Базовый (A2) cubre indicativo, imperativo y condición real con если. El resto sí es A2 legítimo (aspecto, comparativos, instrumental de profesión, dativo de destinatario, prefijos de movimiento), así que no es A1 disfrazada, pero el bloque de бы empuja por encima del nivel declarado. Léxico en la misma línea: чернила, обложка, псевдоним, кулисы, приклеена.
- Propuesta: Decidirlo explícitamente. Opción conservadora: dejar бы sólo como exposición receptiva en los dos remates cómicos (ep. 10 turno 7, ep. 20 turno 6) y reconvertir los ejes gramaticales del ep. 12 y del ep. 18 a condición real con если + futuro perfectivo, que sí es A2 («Если мы узнаем фамилию, дело закончится сегодня»). Si se mantiene, documentarlo en el audit como exposición anticipada, no objetivo evaluable.

**ep13 → ep15** · _verosimilitud / bisagra del arco narrativo_

- Problema: El giro exige que София y Миша no conozcan el apellido de su propio profesor: en el ep. 13 oyen «Зимин стал преподавателем» sin reaccionar y en el ep. 15 se sorprenden al leer «Моя фамилия Зимин». Un estudiante ruso conoce siempre la фамилия de su profesor (расписание, зачётка); un oyente adulto lo nota y el arco 13→15 se lee como truco.
- Propuesta: Una línea lo justifica y además es cierta en la vida real (el trato diario es sólo имя-отчество). Ep. 14, tras «Мне кажется, что мы говорим о Викторе Петровиче», añadir en boca de Миша: «Мы даже не знаем его фамилию — мы всегда говорим Виктор Петрович.» (rom: «My dazhe ne znayem yego familiyu — my vsegda govorim Viktor Petrovich.»).

### Menors (12)

**ep11** · _calidad de pregunta / un distractor también es correcto_

- Problema: Detalle 3: «¿Qué falta bajo la foto?» → correcta «Los nombres»; distractores «La fecha» y «El lugar». El audio dice «Под фотографией написано: студия Луна, весенний спектакль» y «Здесь только фамилии». Bajo la foto tampoco hay fecha: «La fecha» es igual de correcta, y el blueprint pide confusiones plausibles, no opciones verdaderas.
- Propuesta: Sustituir los distractores por cosas que sí aparecen bajo la foto: «El nombre del grupo» y «La temporada del espectáculo». Así sólo «Los nombres» (frente a фамилии) queda como respuesta.

**ep08** · _coherencia léxica dentro del episodio_

- Problema: Миша dice primero «Здесь только имена и один рисунок» (turno 4) y dos turnos después «Зато есть фамилии актёров: Зимин, Морозова, Ковалёв» — los tres son apellidos. En un episodio cuyo detalle 3 es precisamente «¿Qué apellidos se leen?», mezclar имена y фамилии borra la distinción que el episodio necesita.
- Propuesta: Turno 4 → «Почему? Здесь только фамилии и один рисунок.» (rom: «Pochemu? Zdes' tol'ko familii i odin risunok.»).

**ep16 ↔ ep02** · _continuidad de objetos_

- Problema: El ep. 2 coloca los objetos así: «Внутри лежат толстая тетрадь и серебряная ручка» y «А под тетрадью лежит старая программка». En el ep. 16 Миша dice de la pluma «Она лежала под тетрадью, рядом с программкой», es decir, la sitúa donde estaba el programa.
- Propuesta: Ep. 16, turno 3 → «Она лежала в коробке, рядом с тетрадью.» (rom: «Ona lezhala v korobke, ryadom s tetrad'yu.»).

**ep15** · _título ambiguo con el objeto central de la trama_

- Problema: «Подпись на тетради» / «La firma en el cuaderno». El objeto que la serie llama тетрадь es el cuaderno de la obra, del que se repite que NO tiene firma («тетрадь без имени», «Здесь нет фамилии»). El título anuncia lo contrario de lo que la trama sostiene; y la firma está dentro de los cuadernos de deberes, no en la cubierta («на» frente a «в»).
- Propuesta: Título «Подпись преподавателя» / «La firma del profesor»: describe el episodio y no colisiona con la тетрадь del misterio.

**ep04** · _título que promete una frase que no se oye_

- Problema: Título «Бумага старше нас» / «Un papel más viejo que nosotros», pero el Продавец dice «Эта бумага старше меня»; «нас» no aparece. En un episodio de comparativos el alumno busca en el audio exactamente la forma del título.
- Propuesta: Título «Бумага старше меня» / «Un papel más viejo que yo», literal respecto al turno 1.

**ep15** · _cronología interna_

- Problema: София dice «Просто эту фамилию мы уже читали сегодня утром», pero entre la lectura de los apellidos (ep. 8) y esta clase han pasado al menos los dos días que el librero tardó en encontrar el libro («Я искал ваш сборник два дня», ep. 11) y una llamada al instituto (ep. 13).
- Propuesta: «Просто эту фамилию мы уже читали на этой неделе.» (rom: «Prosto etu familiyu my uzhe chitali na etoy nedele.»).

**ep11** · _hueco narrativo / traducción_

- Problema: El episodio abre con «Я искал ваш сборник два дня и наконец нашёл его», pero nunca se estableció que hubieran encargado un сборник: el alumno oye un objeto nuevo dado por sabido. La traducción «Estuve buscando su volumen dos días» tampoco es español natural.
- Propuesta: Cerrar el hueco en el propio turno: «Вы просили книгу о студенческих театрах. Я искал её два дня и наконец нашёл.» (es: «Me pidieron un libro sobre los teatros estudiantiles. Lo busqué dos días y por fin lo encontré.»), ajustando la keyword сборник si se aplica.

**ep07** · _metadatos: gramática declarada que no aparece_

- Problema: Declara grammar: ['дательный падеж с глаголом отдать', 'приставки при-/у-']. El dativo está («Мы отдали её театру») y при- está («принесли»), pero no hay ni un verbo con prefijo у- en los ocho turnos (забрал es за-, вернулась es вер-).
- Propuesta: O declarar ['приставки при-/за-'], que es lo que realmente se oye (принесли / забрал), o añadir у- al turno 7: «Мы отдали её театру, а сами ушли домой.»

**ep03, ep09, ep11, ep13, ep15, ep18** · _traducción española poco natural o ambigua_

- Problema: Ep. 3: «Мне тоже нравится язык» → «me gusta la lengua» (aquí язык es el lenguaje/estilo de la obra). Ep. 9: «Так делают только опытные свидетели» → «Así hacen solo los testigos con experiencia» (falta el objeto). Ep. 11: «все очень мелкие» → «y muy diminutos» (es letra pequeña). Ep. 13: «Морозова стала музыкантом» → «Morozova se hizo música», que en español se lee como «se convirtió en música». Ep. 15: «очень старая школа» es calco de «muy de la vieja escuela»; la fórmula rusa es «чувствуется старая школа», sin очень. Ep. 18: la keyword «молчали» se glosa «callaba usted» cuando el turno es «Почему вы молчали так долго?» = «calló usted».
- Propuesta: Ep. 3 «me gusta el lenguaje: sencillo, pero bonito»; ep. 9 «Eso solo lo hacen los testigos con experiencia»; ep. 11 «con letra muy pequeña»; ep. 13 «Morozova se dedicó a la música» y opción del detalle «Música (profesión)»; ep. 15 «Красивая подпись, чувствуется старая школа»; ep. 18 keyword «callar (usted calló)».

**toda la serie** · _riesgos de TTS a verificar en el piloto_

- Problema: Cinco puntos que sólo se detectan escuchando: (1) стоит es homógrafo (стоИт «figura» / стОит «cuesta») y aparece en dos líneas de trama —ep. 3 «Внизу стоит только одно слово: Луна» y ep. 15 «здесь внизу стоит ваша подпись?»—; el informe A1 obligó a reescribir esta misma palabra. (2) уже (ужЕ/Уже) aparece 4 veces. (3) Здравствуйте (grupo -вств-) 3 veces. (4) Морозова tiene acento no deducible (МорОзова, no МорозОва) y es dato de respuesta en los ep. 8, 12 y 13 — mismo riesgo que Соколова en A1. (5) «Луна» va entrecomillada en el título de la serie pero desnuda dentro de los turnos («студия Луна», «Спектакль называется Луна»), y el TTS decide solo si es nombre propio.
- Propuesta: Comprobar los cinco en la muestra antes del lote completo. Preventivo sin coste: escribir «студия «Луна»» dentro de los turnos; si стоит falla, reescribir a «Внизу написано только одно слово» y «здесь внизу ваша подпись?».

**toda la serie** · _deuda heredada de A1 no resuelta_

- Problema: Dos observaciones del informe A1 se repiten sin corregir. (1) La romanización es transliteración de letras, no transcripción: сегодня→'segodnya' (suena sevódnya), что→'chto' (shto), конечно→'konechno' (kanéshna), его→'yego' (yevó); aparecen en 12 turnos de esta serie y el principiante lee esa columna como pronunciación. (2) El campo objective, que ListeningJourney sí muestra al alumno, está en ruso metalingüístico: «Различать законченное и незаконченное действие в прошлом», «Понять придаточные после глаголов чувства» — ilegible para un A2.
- Propuesta: (1) Añadir la nota de pronunciación de esas cuatro palabras en la ficha de vocabulario, como ya recomendaba el informe A1. (2) Decisión sistémica (afecta a las 11 series): duplicar objective en español o traducirlo.

**ep01 (y ep02, ep09, ep12)** · _posición de la respuesta correcta dentro del episodio_

- Problema: La posición se deriva de un hash del enunciado: en el ep. 1 caen 4 de las 5 preguntas en la opción A (0,1,0,0,0) y los ep. 2, 9 y 12 tienen tres. En el conjunto de la serie el reparto es equilibrado (32/35/33 sobre 100), pero el primer episodio es el que forma el hábito del alumno.
- Propuesta: No es fallo de contenido; si molesta, basta reformular un enunciado del ep. 1 (p. ej. «¿Qué hizo Sofía durante las vacaciones?») para que el hash desplace la respuesta.

