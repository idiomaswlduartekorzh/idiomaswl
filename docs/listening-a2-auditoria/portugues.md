# Auditoría A2 — portugues


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

