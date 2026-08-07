# Auditoría A2 — japones


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

