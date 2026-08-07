# Auditoría A2 — frances


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

