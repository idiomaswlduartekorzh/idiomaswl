# Auditoría A2 — coreano


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

