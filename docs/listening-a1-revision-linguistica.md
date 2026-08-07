# Revisión lingüística — series de listening A1

Filtro automático previo a generar audio. **No sustituye a un hablante nativo.**

| Idioma | ¿Apto? | Bloqueantes | Importantes | Menores | Riesgos TTS |
|---|---|---:|---:|---:|---:|
| Portugués brasileño | sí | 0 | 2 | 4 | 3 |
| Francés | **NO** | 0 | 4 | 6 | 7 |
| Coreano (한국어) | **NO** | 2 | 10 | 8 | 6 |
| Japonés (ja-JP) | **NO** | 5 | 6 | 5 | 8 |
| Ruso (ru-RU) | **NO** | 2 | 11 | 12 | 6 |

---

## Portugués brasileño

**¿Apto para generar?** Sí

La serie está en muy buen estado: portugués brasileño consistente (você, gerundio, contracciones no/na/do/da/pela bien usadas, «tem» existencial, «seu Antônio» como tratamiento), sin errores de concordancia ni de conjugación, y con nivel A1 respetado en todos los episodios. La continuidad narrativa cierra: la caja azul (ep. 2), las dos llaves azules (ep. 3/9), la cinta del perro (ep. 8/11), las veinte sillas más la de regalo (ep. 15/19) y el nombre en el collar (ep. 11/18) encajan sin contradicciones. Solo hay dos calcos del español que un nativo notaría y un par de retoques de estilo; nada bloqueante. Nota operativa ajena a la lengua: `ttsScript` concatena todos los turnos con un espacio, así que si se genera desde ese campo se perderá la separación de voces (crítico en el ep. 6, con dos turnos seguidos de Dona Célia, y en el ep. 20, con el coro «Todos»); conviene generar turno a turno.

### Importantes (2)

**pt-a1-13-debaixo-da-mesa** · turno 4 · _naturalidad_

- Actual: Mas no envelope diz: para os três detetives.
- Propuesta: Mas no envelope está escrito: para os três detetives.
- Motivo: Calco directo del español «en el sobre dice». En portugués el sujeto de «dizer» tiene que ser el propio soporte («o envelope diz») o hay que usar «está escrito»; con la preposición delante suena agramatical a un oído brasileño. Nótese que en el mismo episodio ya se usa bien la forma correcta: «A pista diz: procurem a mesa pequena».

**pt-a1-02-duas-malas-e-uma-caixa** · turno 3 · _naturalidad_

- Actual: Ela está muito pesada. Você tem ajuda?
- Propuesta: Ela está muito pesada. Você precisa de ajuda?
- Motivo: «Você tem ajuda?» es traducción literal de «¿Tienes ayuda?». Un brasileño ofrece ayuda con «Precisa de ajuda?» o «Quer uma ajuda?». «Ter ajuda» no se usa así. La respuesta de Sofía («Agora eu tenho você») sigue funcionando igual de bien como chiste.

### Menors (4)

**pt-a1-06-o-audio-errado** · turno 4 · _naturalidad_

- Actual: Vinte cadeiras? Existe uma festa secreta aqui?
- Propuesta: Vinte cadeiras? Tem uma festa secreta aqui?
- Motivo: «Existir» en habla espontánea brasileña suena libresco; lo natural en esa reacción es «tem». Es preferencia de estilo, no error: si se mantiene es porque el episodio practica «há / tem / existe», y en ese caso conviene dejarlo. Mismo comentario, más leve, para «por que existe uma chave azul?» (ep. 7, turno 5).

**pt-a1-14-a-mesa-pequena** · turno 4 · _naturalidad_

- Actual: O desenho traz uma porta azul e muitas estrelas.
- Propuesta: O desenho tem uma porta azul e muitas estrelas.
- Motivo: «Trazer» con sujeto inanimado en el sentido de «contener» pertenece al registro periodístico («a reportagem traz…»); aplicado a un dibujo suena raro y, además, es un uso opaco para un A1. El verbo «trazer» ya queda practicado en el último turno del mismo episodio («Pingo traz as pistas»).

**pt-a1-04-o-cafe-da-esquina** · turno 7 · _naturalidad_

- Actual: Perfeito. Assim eu estudo e provo o bairro.
- Propuesta: Perfeito. Assim eu estudo e conheço o bairro.
- Motivo: «Provar o bairro» no es una metáfora que exista en portugués; se entiende como error de vocabulario más que como juego. «Conheço» además recupera el «ainda não conheço o bairro» del episodio 1 y refuerza la continuidad.

**pt-a1-04-o-cafe-da-esquina** · turno 0 · _gramatica_

- Actual: grammar: ['presente dos verbos em -AR', 'artigos', 'contracções']
- Propuesta: grammar: ['presente dos verbos em -AR', 'artigos', 'contrações']
- Motivo: «Contracções» es grafía del portugués europeo anterior al Acuerdo Ortográfico; en Brasil se escribe «contrações» (así aparece, correctamente, en el episodio 10). No afecta al audio porque es metadato, pero queda incoherente si el campo se muestra al estudiante.

### Riesgos de pronunciación TTS

- **Sofía** (todos): El nombre lleva tilde española en todos los turnos. Una voz pt-BR puede tratar la «í» acentuada como sílaba enfática anómala o silabear «So-fí-a» de forma antinatural; en portugués el nombre se escribe «Sofia» y ya es oxítono en la «i». → Escribir «Sofia» (sin tilde) únicamente en el texto que se envía a ElevenLabs, manteniendo «Sofía» en la interfaz y en las traducciones si se quiere marcar su origen colombiano.
- **seu Antônio** (pt-a1-18-o-nome-na-coleira, pt-a1-19-a-chave-azul, pt-a1-20-parabens-seu-antonio): En minúscula, el TTS puede leer «seu» como posesivo átono y pegarlo a la palabra anterior, en vez de darle el contorno de tratamiento («Seu Antônio» ≈ «Don Antonio»). → Escribir «Seu Antônio» con mayúscula en el guion de TTS; si aun así la prosodia falla, usar «senhor Antônio» en el audio.
- **quarenta e dois** (pt-a1-05-o-grupo-do-predio): Cadena de números al final de frase: las voces pt-BR tienden a acelerar y a comerse la «e» átona, justo el dato que la pregunta de detalle exige captar. → Insertar una coma antes del número («Meu número novo termina em, quarenta e dois») o generar ese turno con velocidad reducida.

### Romanización

No aplica: el portugués usa alfabeto latino y el fichero no incluye campo `romanization` en ningún turno, que es lo correcto según el esquema. La ortografía sí es la brasileña vigente (Acordo Ortográfico) en todos los turnos hablados —acentuación de «prédio», «áudio», «Antônio», «parabéns», «às vezes», «debaixo» correcta—; la única grafía europea aparece en un metadato de gramática («contracções», ep. 4), no en texto que vaya a audio.

---

## Francés

**¿Apto para generar?** **NO**

La serie está en muy buen estado lingüístico: no encontré ni un solo error de gramática, conjugación o concordancia de género en los 20 episodios (colombienne, étudiante, chatte blanche, yeux verts, cette boîte jaune, une petite porte grise, la vieille table, je ne suis pas sûre — todo correcto), el nivel A1 se respeta con disciplina y la continuidad narrativa (carnet rojo → Biscotte → cinta → página → sótano → cumpleaños) cierra sin contradicciones de nombres, pisos ni relaciones. Lo que sí hay son tres o cuatro líneas que suenan a traducción del español y una decisión de registro (el uso insistente de «la chatte») que conviene revisar ANTES de gastar créditos, porque están dentro del ttsScript. Con esos retoques la serie queda lista para generar.

### Importantes (4)

**fr-a1-12-toujours-a-dix-huit-heures** · turno 7 · _naturalidad_

- Actual: Moi, je pose rarement beaucoup de questions.
- Propuesta: Moi, je pose rarement des questions.
- Motivo: Combinar «rarement» con «beaucoup de questions» es un calco del español «rara vez hago muchas preguntas». En francés la colocación natural es «poser rarement des questions»; un nativo no acumula el adverbio de frecuencia y el cuantificador en la misma frase. Además la versión corta refuerza la ironía del turno siguiente de Léa.

**fr-a1-17-il-pleut** · turno 4 · _naturalidad_

- Actual: La fête ne va pas être dans la cour.
- Propuesta: La fête ne va pas se faire dans la cour.
- Motivo: «Être dans un lieu» no se usa para un evento: una fiesta «se fait», «a lieu» o «se passe» en un sitio. Tal como está suena a traducción literal de «la fiesta no va a ser en el patio». «Se faire» mantiene el nivel A1 y el futur proche que el episodio practica.

**fr-a1-19-le-carnet-retrouve** · turno 7 · _traduccion_

- Actual: Biscotte, tu es une drôle de détective. / es: 'Biscotte, eres una detective muy graciosa.'
- Propuesta: es: 'Biscotte, eres una detective muy rara.' (o cambiar el francés a «tu es une détective très drôle» si se quiere el sentido de 'graciosa')
- Motivo: «une drôle de détective» significa 'una detective extraña/curiosa', no 'graciosa'. El sentido de 'gracioso' exige el adjetivo pospuesto («très drôle»). La traducción actual enseña una lectura falsa de una construcción que además es trampa clásica para hispanohablantes. No obliga a regenerar audio si se corrige solo el español.

**fr-a1-14-suivez-la-chatte** · turno 3 · _registro_

- Actual: Suivez la chatte ! (y el título 'Suivez la chatte !'; también ep. 9 «Une chatte avec un carnet ?» y ep. 18 «Cette chatte aime vraiment les histoires»)
- Propuesta: Suivez Biscotte ! / ep. 9: «Un chat avec un carnet ?» / ep. 18: «Cette petite chatte aime vraiment les histoires» o «Biscotte aime vraiment les histoires»
- Motivo: «La chatte» aislada y en imperativo es, en francés coloquial actual, un doble sentido vulgar muy conocido. En el ep. 6 («ma chatte, Biscotte») el contexto lo neutraliza y es normal, pero «Suivez la chatte !» gritado, y como título de un episodio de una academia, es el caso donde el chiste salta solo. Usar el nombre propio no cuesta nada y elimina el riesgo. Es decisión editorial, no error de lengua.

### Menors (6)

**fr-a1-03-ou-est-la-cle** · turno 4 · _registro_

- Actual: Mademoiselle, la clé est dans votre poche.
- Propuesta: Madame, la clé est dans votre poche.
- Motivo: «Mademoiselle» se retiró de los documentos administrativos franceses en 2012 y hoy se percibe como anticuado o paternalista. Una portera mayor podría decirlo de forma verosímil, pero en material didáctico enseña una forma que el alumno no debería reproducir. Cambio de una palabra.

**fr-a1-02-deux-valises** · turno 4 · _naturalidad_

- Actual: Oui, elle a tous mes livres.
- Propuesta: Oui, il y a tous mes livres dedans.
- Motivo: «Avoir» con un objeto inanimado como poseedor de su contenido es calco del español 'tiene todos mis libros'. El francés prefiere «il y a … dedans» o «elle contient». La alternativa propuesta sigue siendo A1 y refuerza «il y a», que ya se practica en el ep. 3.

**fr-a1-10-le-sac-de-hugo** · turno 3 · _naturalidad_

- Actual: Mais ton sac est exactement comme mon sac !
- Propuesta: Mais ton sac est exactement comme le mien !
- Motivo: Repetir el sustantivo con dos posesivos suena a ejercicio, no a habla. «Comme le mien» es lo que diría un nativo. Contraargumento válido: el episodio practica precisamente los posesivos y la repetición es didáctica; si se prefiere mantenerla, no es un error.

**fr-a1-18-le-message-de-biscotte** · turno 7 · _naturalidad_

- Actual: Elle veut encore jouer avec nous maintenant.
- Propuesta: Elle veut encore jouer avec nous !
- Motivo: «Encore … maintenant» es redundante en la misma frase; el «maintenant» parece añadido para alargar el turno. Sobra sin pérdida de sentido.

**fr-a1-16-une-fete-secrete** · turno 8 · _continuidad_

- Actual: Madame Martin: 'Oui, elle aime beaucoup les grandes fêtes.' → Madame Martin: 'D’accord, mais gardez le secret !'
- Propuesta: Fundir en un turno («Oui, elle aime beaucoup les fêtes. Mais gardez le secret !») o mover el «D’accord» al turno que responde a la propuesta de Léa.
- Motivo: Dos turnos seguidos del mismo personaje y el segundo abre con «D’accord», que responde a algo que ella misma acaba de decir. En audio, con la misma voz encadenada, el «D’accord» queda colgado.

**fr-a1-17-il-pleut / fr-a1-20-bon-anniversaire** · turno 5 · _continuidad_

- Actual: ep. 17: «Nous allons tout mettre dans le salon.» / ep. 20: «La salle est magnifique.» (location: 'Sala común del edificio')
- Propuesta: Unificar en «la salle commune» en ambos episodios.
- Motivo: «Le salon» es el salón de una vivienda; «la salle» es la sala común del edificio. El oyente atento entiende que la fiesta se trasladó a dos sitios distintos. Una palabra en el ep. 17 lo resuelve.

### Riesgos de pronunciación TTS

- **vingt assiettes** (fr-a1-11-une-liste-etrange (y ep. 17 «les vingt assiettes»)): Liaison obligatoria: se pronuncia /vɛ̃t‿asjɛt/. Muchos TTS leen «vingt» aislado como /vɛ̃/ y cortan antes de la vocal, con lo que el número se vuelve ambiguo justo en el turno donde está la respuesta del quiz. → Escuchar ese turno primero. Si falla, forzar con guion en el ttsScript: «vingt-assiettes» o separar la cifra («il y a aussi vingt assiettes, oui, vingt»).
- **dix-huit heures** (fr-a1-12-toujours-a-dix-huit-heures): Cadena de dos liaisons /di.zɥi.t‿œʁ/. Es el punto donde los TTS franceses fallan más: suelen dar /dis‿ɥit/ + /œʁ/ con corte, o leer «dix» como /dis/. → Verificar antes de generar el resto. Alternativa segura si falla: «à six heures du soir», que además es más A1.
- **soixante ans** (fr-a1-16-une-fete-secrete): Liaison obligatoria /swa.sɑ̃.t‿ɑ̃/. Sin ella suena «soixante / an» y el dato clave del episodio (la edad, que es respuesta de quiz) queda borroso. → Ya está marcado en el audit del episodio; mantener ese QA. Si el motor no la hace, escribir «soixante-ans» en el ttsScript.
- **tous ensemble** (fr-a1-20-bon-anniversaire): Aquí «tous» es pronombre y se pronuncia /tus/. Los TTS tienden a la forma determinante /tu/ (correcta en «tous mes livres» del ep. 2 y «tous les sacs» del ep. 10, pero incorrecta aquí). → Comprobar solo esa línea final. Si sale /tu/, sustituir por «Et maintenant, on mange le gâteau ensemble !»
- **sœur** (fr-a1-15-la-boite-jaune): La ligadura œ (U+0153) la normalizan mal algunos motores y puede salir como «so-eur» o perderse el carácter. → Escuchar el turno «C’est ma petite sœur, Claire». Si falla, es un problema de codificación, no de texto: reenviar el fragmento solo.
- **Inès** (varios (5, 7, 8, 11, 12, 16, 17, 18, 20)): Nombre propio con è. Riesgo de que el motor lo lea a la española /ˈines/ o con -s muda /i.nɛ/ en vez de /i.nɛs/. → Aparece en 9 episodios: validarlo en el primer audio generado antes de lanzar el lote completo. Si falla, «Inesse» en el ttsScript.
- **Biscotte** (todos los de la gata (6, 8, 9, 13, 14, 18, 19, 20)): Es un nombre común («biscotte» = biscote) usado como nombre propio; algunos motores lo tratan bien, pero el riesgo real es la entonación: puede leerse como sustantivo dentro de la frase. → Verificar en el ep. 6, que es donde se presenta. Si suena raro, no hay arreglo textual: es cuestión de elegir voz.

### Romanización

No aplica y está correctamente resuelto: el francés usa alfabeto latino, así que ningún turno lleva campo `romanization` — es lo esperado y es coherente en los 20 episodios. Lo que sí revisé como equivalente es la ortografía diacrítica, y está limpia y uniforme: acentos correctos (à, é, è, ê, î, ô, û), cedilla en «Ça fait», ligadura en «sœur», tréma ausente donde no toca. El apóstrofo es siempre el tipográfico U+2019 (j’ai, l’appartement, n’est pas, s’il vous plaît, aujourd’hui), sin mezcla con el recto U+0027 en ningún turno ni en ningún ttsScript, lo cual evita el fallo típico de los TTS que parten la elisión en dos palabras.

---

## Coreano (한국어)

**¿Apto para generar?** **NO**

La serie está globalmente bien construida: arco narrativo coherente (paraguas → estrella → foto → recibo → 47 → apartamento → parque → collar → Mina), progresión gramatical razonable, 해요체 estable y romanización mayoritariamente correcta según la Romanización Revisada. No hay vulgaridades ni dobles sentidos: los nombres (소피아, 지호, 유나, 별, 미나, 콩이) son limpios y los chistes («¿también guardamos al perro?», «el pastel no es salario de detective») funcionan en coreano. PERO no está lista para generar audio: hay dos fallos que un nativo leería como error claro —el «돌려줘요» del episodio 20, que dicho a Mina significa «devuélvemelo» en vez de «te lo devolvemos», y la invención «사칠 호» que la profesora valida como coreano correcto en el episodio 9—, más un calco repetido («놓았어요» por «lo dejó olvidado»), un cambio de registro injustificado en el episodio 17 y dos errores de datos del reparto que afectan al casting de voces y revelan el desenlace. Todos los arreglos son retoques de una línea; con ellos la serie queda apta.

### Bloqueantes (2)

**ko-a1-20-bi-oneun-nal-ui-chingu** · turno 1 · _significado invertido / imperativo involuntario_

- Actual: 소피아: '미나 씨, 여기 노란 우산을 돌려줘요.' (es: «Mina, aquí te devolvemos el paraguas amarillo.»)
- Propuesta: '미나 씨, 노란 우산 여기 있어요. 미나 씨 우산이에요.' (es: «Mina, aquí está el paraguas amarillo. Es tuyo.») Y en keywords, cambiar '돌려줘요 = devuelve' por '돌려주다 = devolver' o por '여기 있어요'.
- Motivo: '-어요' dirigido a un interlocutor nombrado ('미나 씨, …') se lee como imperativo: un nativo entiende «Mina, devuélve(me)lo», exactamente lo contrario de la escena, donde Sofía es quien entrega el paraguas. Además, dar una orden con 해요체 a una mujer adulta (la tía de un amigo) suena descortés. Es la última frase de la serie y la que cierra el arco: si sale mal, se regenera el episodio entero.

**ko-a1-09-sasipchil-beon** · turno 3 · _coreano inventado y validado por la profesora_

- Actual: 소피아: '사 층 칠 호는 짧게 사칠 호예요?' / 김 선생님 (turno 4): '네, 건물에서는 사백칠 호라고도 해요.'
- Propuesta: 소피아: '사 층 칠 호는 사백칠 호예요?' / 김 선생님: '네, 보통 사백칠 호라고 해요. 그런데 영수증 번호도 사칠이에요.'
- Motivo: En coreano el 4.º piso, puerta 7, es 사백칠 호 (407호); nadie lo abrevia como «사칠 호». El problema no es el juego narrativo sino que quien lo confirma con un '네' es 김 선생님, la profesora de coreano: el personaje-autoridad está enseñando un uso que no existe. La propuesta conserva la coincidencia 47 del recibo ↔ 407 del edificio sin inventar lengua.

### Importantes (10)

**ko-a1-14-eoje-wasseoyo** · turno 5 · _calco del español / colocación incorrecta_

- Actual: 소피아: '노란 우산도 여기에 놓았어요?' — y en ko-a1-18, turno 5: 미나: '네, 어제 학원에 놓았어요.'
- Propuesta: Ep. 14: '노란 우산도 여기에 두고 갔어요?' — Ep. 18: '네, 어제 학원에 두고 왔어요. 미안해요.'
- Motivo: '놓다' es «poner/colocar» de forma deliberada; para «dejarse algo olvidado» el coreano usa 두고 가다/두고 오다. Tal como está, Mina no perdió el paraguas: lo dejó allí a propósito, lo que contradice la premisa del misterio. Es el mismo calco de «dejó» repetido en dos episodios, y '두고 왔어요' usa el mismo pasado -았/었어요 que ya se enseña en el episodio 14.

**reparto de la serie (characters, entrada '별')** · turno 0 · _dato falso + spoiler en metadatos_

- Actual: { name: '별', role: '노란 우산의 주인', voiceProfile: '젊은 남성, 차분하고 또렷한 표준 한국어' }
- Propuesta: { name: '별', role: '미나의 조카, 407호에 사는 학생' } (es: «sobrino de Mina, estudiante que vive en el 407»).
- Motivo: Es falso y revienta el desenlace. En el episodio 10 별 dice literalmente '노란 우산은 제 것이 아니에요', y la dueña resulta ser 미나 (ep. 18). Si esta ficha se muestra en la UI del alumno o se usa para escribir el brief de voz, la serie se estropea antes de empezar.

**reparto de la serie (characters, entrada '직원') + ko-a1-14-eoje-wasseoyo** · turno 2 · _incoherencia de reparto que afecta al casting de voces_

- Actual: Reparto: { name: '직원', role: '카페 직원', … } — pero el único episodio donde habla '직원' es el 14, en el 편의점, y ese episodio declara characters: ['소피아', '지호', '편의점 직원'].
- Propuesta: Poner role: '편의점 직원' en el reparto y, en el episodio 14, escribir characters: ['소피아', '지호', '직원'] para que coincida con la clave speaker de los turnos.
- Motivo: seriesCast() en adapt.ts cuenta turnos por turn.speaker y los cruza con series.characters por name: '편의점 직원' no casa con ningún hablante, y el rol «empleado de cafetería» describe a un personaje que nunca habla en la cafetería (allí habla 유나). El brief que se pase a ElevenLabs describirá al personaje equivocado y se confundirá con la escena de los episodios 6-7.

**ko-a1-10-usan-se-gae (gist) y ko-a1-09-sasipchil-beon (detalle 2)** · turno 0 · _traducción española: género equivocado_

- Actual: Ep. 10, gist: '¿Es Byeol la dueña?' / opción 'Ella no tiene paraguas'. Ep. 9, detalle: 'Una estudiante llamada Byeol'.
- Propuesta: Ep. 10: '¿Es Byeol el dueño?' / 'Él no tiene ese paraguas'. Ep. 9: 'Un estudiante llamado Byeol'.
- Motivo: 별 está definido en el reparto como '젊은 남성' y su voz será masculina. El alumno oirá una voz de hombre y leerá «la dueña», «una estudiante»: contradicción directa entre audio y pantalla, y además en las preguntas de comprensión que se puntúan.

**ko-a1-17-announcement** · turno 4 · _registro: alumnos hablando en 합니다체_

- Actual: 지호: '좋아요. 주인에게 바로 연락합니다.' — turno 6, 소피아: '아니요. 강아지는 물건이 아닙니다.' — turno 7, 지호: '다행이에요. 강아지가 그 말을 좋아합니다.'
- Propuesta: Dejar el 합니다체 solo en los dos turnos del '안내 방송' y devolver a los alumnos a su 해요체: '주인에게 바로 연락해요.' / '강아지는 물건이 아니에요.' / '강아지가 그 말을 좋아해요.' Si se quiere conservar la broma de imitar la megafonía, marcarla: 지호: '(방송처럼) 강아지는 물건이 아닙니다!'
- Motivo: Tres amigos charlando en un vestíbulo no usan 합니다체 entre ellos; suena a parodia sin señalar. El objetivo del episodio es que el alumno DISTINGA el estilo formal del anuncio del coloquial de los personajes, y aquí se mezclan sin aviso: se pierde justo el contraste que el episodio enseña.

**ko-a1-18-mina-ssiga-wasseoyo** · turno 1 · _registro incoherente dentro de la misma frase_

- Actual: 미나: '콩이야! 여기 있었어요? 정말 다행이에요.'
- Propuesta: '콩이야! 여기 있었어? 아, 정말 다행이에요.' (banmal al perro, 해요체 al dirigirse al grupo).
- Motivo: '콩이야' es vocativo en banmal dirigido al perro; encadenarlo con '있었어요' es tratar de usted a un cachorro dos palabras después de tutearlo. El episodio 16 ya lo hace bien ('강아지야, 안녕! 이모는 어디에 있어?'), así que además es incoherente con el propio material.

**ko-a1-11-yeoseot-si** · turno 7 · _calco del español, colocación imposible_

- Actual: 지호: '우산보다 우리가 먼저 비를 만나요.' (es: «Nosotros encontraremos la lluvia antes que al paraguas.»)
- Propuesta: '우산보다 비가 먼저 와요.' o, para conservar la gracia, '우산을 찾기 전에 우리가 비를 맞아요.'
- Motivo: En coreano no se «encuentra» la lluvia: 비를 만나다 no es colocación viva (se dice 비를 맞다 o 비가 오다). Es traducción literal del español y suena a diccionario. Es el remate del episodio, la frase que más se recuerda.

**ko-a1-13-ppang-hago-uyu** · turno 1 · _calco del español_

- Actual: 지호: '공원 전에 편의점에서 물하고 우유를 사요.' (es: «Antes del parque compramos agua y leche.»)
- Propuesta: '공원에 가기 전에 편의점에서 물하고 우유를 사요.' Si se quiere evitar '-기 전에' por nivel: '먼저 편의점에서 물하고 우유를 사요. 그다음에 공원에 가요.'
- Motivo: '공원 전에' calca «antes del parque»: 전에 con un sustantivo de lugar no funciona como temporal en coreano. La segunda propuesta usa solo estructuras ya enseñadas en el episodio 5 (먼저 … 다음에 …).

**ko-a1-19-byeol-kape-kupong** · turno 6 · _léxico impropio del registro oral y del nivel_

- Actual: 별: '저는 딸기 우유하고 케이크를 원해요.'
- Propuesta: '저는 딸기 우유하고 케이크를 먹고 싶어요.' o, si pide al mostrador, '딸기 우유하고 케이크 주세요.'
- Motivo: '원하다' es de registro escrito/formal (contratos, formularios); un chico pidiendo merienda jamás lo usa. Además contradice al propio curso: el episodio 12 enseña '-고 싶어요' precisamente para esto y el 19 es episodio de repaso. '원해요' tampoco figura en keywords.

**ko-a1-08-nugu-ui-beonhoyeyo** · turno 2 · _progresión: pasado antes de enseñarlo_

- Actual: 김 선생님: '어디에서 그 번호를 봤어요?' / 지호 (turno 3): '카페 영수증에서 봤어요.' — y ko-a1-10, turno 2: '노란 우산 한 개를 찾았어요.'
- Propuesta: Ep. 8: '그 번호가 어디에 있어요?' / '카페 영수증에 있어요.' — Ep. 10: '노란 우산 한 개가 여기 있어요. 별 스티커가 있어요.' Alternativa: declarar el pasado en el campo grammar de los episodios 8 y 10 y ajustar la ficha de auditoría.
- Motivo: El pasado -았/었어요 se presenta como gramática nueva en el episodio 14, pero aparece sin aviso en el 8 y en el 10, y los campos grammar de esos episodios no lo declaran. Para un principiante hispanohablante, oír '봤어요' seis episodios antes de que se le explique rompe la comprensión guiada, y la auditoría queda desmentida por el guion.

### Menors (8)

**ko-a1-05-kape-e-gayo** · turno 3 · _continuidad léxica 학원/학교_

- Actual: 지호: '네. 학교 옆 별 카페에 가요.' (location del episodio: '학원 앞'; premisa: '서울의 한국어 학원')
- Propuesta: '네. 학원 옆 별 카페에 가요.' (y en el feedback del detalle, '학원 옆 별 카페').
- Motivo: Toda la serie sitúa la acción en un 학원 (academia): la premisa, la ubicación del propio episodio y la confesión de Mina en el episodio 18 ('어제 학원에 놓았어요'). 학교 es un centro escolar reglado; el alumno acaba de aprender ambas palabras y aquí se le mezclan.

**ko-a1-19-byeol-kape-kupong** · turno 2 · _continuidad numérica_

- Actual: 별: '스티커가 몇 개 있어요?' / 지호: '하나, 둘, 셋, 넷, 다섯. 다섯 개 있어요.'
- Propuesta: Retocar la PRIMERA aparición, en el episodio 2, turno 2: '우산은 예뻐요. 작은 별 스티커도 있어요.' → '우산은 예뻐요. 작은 별 스티커가 여러 개 있어요.'
- Motivo: Los episodios 2, 3 y 10 hablan siempre de UNA pegatina ('작은 별 스티커도 있어요', '우산에도 같은 별이 있어요'); en el 19 aparecen cinco de golpe. No es imposible (una tira de sellos), pero el alumno que ha seguido las pistas nota el salto. Corregir el episodio 2 es más barato que rehacer el 19.

**ko-a1-08-nugu-ui-beonhoyeyo** · turno 4 · _precisión aritmética_

- Actual: 김 선생님: '사칠은 제 번호 마지막 숫자예요.'
- Propuesta: '사칠은 제 번호 마지막 두 자리예요.'
- Motivo: 사칠 son dos cifras, no un 숫자. En un episodio cuyo objetivo declarado es enseñar números, la imprecisión se nota; 두 자리 es la forma normal y sigue siendo A1.

**ko-a1-14-eoje-wasseoyo** · turno 1 · _cortesía al referirse a un tercero ante un desconocido_

- Actual: 소피아: '어제 여자가 왔어요?' — turno 3, 지호: '그 여자는 무엇을 샀어요?'
- Propuesta: '어제 여자분이 왔어요?' / '그 여자분은 무엇을 샀어요?'
- Motivo: Preguntar a un empleado por una clienta llamándola 여자 a secas suena brusco; 여자분 es el registro neutro-cortés esperable. En descripción interna ('사진 속 여자', eps. 3-5) 여자 está bien: el problema es solo al hablar con un tercero desconocido.

**ko-a1-12-gachi-gago-sipeoyo** · turno 7 · _colocación usada como chiste_

- Actual: 별: '그럼 케이크도 같이 데리고 가요.' (es: «Entonces llevemos también al pastel.»)
- Propuesta: Si se conserva el chiste, dejarlo (funciona como personificación deliberada); si se prefiere no arriesgar, '그럼 케이크도 같이 가져가요.'
- Motivo: '데리고 가다' solo se usa con seres animados. Un nativo lo lee como personificación y sonríe, pero un principiante puede fijar la colocación errónea y el guion no señala en ningún sitio que sea un juego. Es decisión editorial: gracia frente a riesgo pedagógico.

**ko-a1-08-nugu-ui-beonhoyeyo** · turno 7 · _remate poco idiomático_

- Actual: 지호: '같은 번호, 다른 우산. 뭐가 쉬워요?' (es: «Mismo número, otro paraguas. ¿Qué es fácil aquí?»)
- Propuesta: '같은 번호, 다른 우산. 쉬운 게 하나도 없어요.' (es: «Mismo número, otro paraguas. Aquí no hay nada fácil.»)
- Motivo: '뭐가 쉬워요?' como pregunta retórica no transmite ironía en coreano: se entiende literalmente («¿qué cosa es fácil?»). La propuesta mantiene el chiste, sigue siendo A1 y no depende de una entonación que la TTS no va a clavar.

**ko-a1-08-nugu-ui-beonhoyeyo (metadatos audit)** · turno 0 · _metadato incorrecto_

- Actual: pronunciationRisks: ['끝나는', '누구']
- Propuesta: pronunciationRisks: ['사칠', '영수증']
- Motivo: '끝나는' no aparece en ningún turno del episodio. Si esa lista se usa para preparar el prompt o la revisión del audio, se vigilará una palabra que nadie pronuncia y no la que sí tiene riesgo real (la lectura de las cifras).

**ko-a1-20-bi-oneun-nal-ui-chingu** · turno 1 · _tratamiento a una adulta_

- Actual: 소피아 se dirige a la tía de Byeol como '미나 씨' (también la nombra así en ko-a1-11 y ko-a1-12).
- Propuesta: Aceptable si se asume que Mina es joven; si no, en la interpelación directa del ep. 20 usar '이모님' o dejar que Byeol la presente: 별: '우리 이모예요.' / 소피아: '안녕하세요!'
- Motivo: 'nombre + 씨' con alguien claramente mayor (la tía de un amigo) queda en el filo de lo descortés. No es error de gramática y muchos jóvenes lo dirían igual, pero en material didáctico conviene no modelar un tratamiento discutible justo en la escena de cierre.

### Riesgos de pronunciación TTS

- **사 층 칠 호 / 사백칠 호** (ko-a1-09-sasipchil-beon): Cadena de cifras y contadores con espacios: la TTS tiende a comprimir '칠 호' en [치로] y a pegar '사 층' al numeral siguiente, con lo que el alumno no distingue 4-7 de 407, que es el nudo del episodio. → Escribir '사층 칠호' y '사백칠 호' con separación estable y una coma antes de la cifra ('여기, 사층 칠호가 있어요'). La ficha ya pide separar las cifras con pausas breves: aplicarlo también a la línea de la profesora.
- **47번 (título del episodio 9)** (ko-a1-09-sasipchil-beon): Cifra arábiga en el título: si llega a locutarse o a un lector de pantalla puede leerse '마흔일곱 번' (nativo) en vez de '사십칠 번' (sino-coreano), que es lo que exige la consolidación del propio episodio. → Escribir el título en hangul: '사십칠 번'. Además elimina la incoherencia con el diálogo, que insiste en '사칠'.
- **말 못 해요** (ko-a1-16-gangajineun-mal-mothaeyo): Con el espacio entre 못 y 해요, algunos motores leen [몯 해요] silabeado en vez de la aspiración real [모태요]; la romanización del fichero ('mal motaeyo') asume la forma aspirada. → Mantener la ortografía correcta (con espacio) pero verificar esta línea en la primera muestra de audio antes de generar el episodio completo; si sale silabeada, escribir '말을 못해요'.
- **사칠** (ko-a1-07-je-geos-i-anieyo / ko-a1-08-nugu-ui-beonhoyeyo): '사칠' aislado puede locutarse como una palabra bisílaba sin pausa entre dígitos y el alumno no reconocerá que son dos números (4 y 7), que es la pista central de tres episodios. → Escribir '사, 칠' con coma en la primera aparición (ep. 7, turno 6) para forzar la pausa; a partir de ahí ya se reconoce.
- **콩이야 / 강아지야** (ko-a1-18-mina-ssiga-wasseoyo / ko-a1-16-gangajineun-mal-mothaeyo): Vocativos exclamativos: sin marca de emoción la TTS los lee planos y el reencuentro con el perro —el momento emotivo de la serie— se pierde. La ficha del ep. 16 ya lo señala ('debe sonar dirigida con cariño a un animal'), pero la del 18 no. → Añadir la misma nota a recommendedChanges del episodio 18 y separar el vocativo con exclamación y pausa: '콩이야! … 여기 있었어?'
- **지하철역** (ko-a1-05-kape-e-gayo): Se pronuncia [지하철력] (inserción de ㄴ y asimilación a ㄹ); la romanización del fichero ('jihacheol-yeok') sugiere una lectura sílaba a sílaba que no coincidirá con el audio. → Corregir la romanización a 'jihacheollyeok'. El hangul está bien, no hay que tocar el guion.

### Romanización

Romanización Revisada aplicada con buen criterio y casi siempre correcta: se transcribe la PRONUNCIACIÓN, no la ortografía, y los casos difíciles están bien resueltos (첫날이에요 → cheonnarieyo; 없어요 → eopseoyo; 음료 → eumnyo; 숫자 → sutja; 많이 → mani; 밖에 → bakke; 월요일이에요 → woryoirieyo; 여섯 시 → yeoseot si; 못 해요 → motaeyo; 사진 속 → sajin sok). Está presente en los 140 turnos, sin huecos. Defectos concretos, todos menores salvo el primero: (1) ERROR real: 지하철역 → 'jihacheol-yeok' (ep. 5, turno 4); debe ser 'jihacheollyeok' [지하철력]. (2) CRITERIO INCOHERENTE ante ㅎ: 산책해요 → 'sanchaekhaeyo' conserva la h tras oclusiva, pero 못 해요 → 'motaeyo' fusiona la aspiración; la RR admite ambos, pero no mezclados en la misma serie: elegir uno. (3) GUION DESAMBIGUADOR ERRÁTICO: '사진과' → 'sajin-gwa' (ep. 3, turno 7) frente a '한 명과' → 'myeonggwa' (mismo episodio, turno 3); '건물에서는' → 'geonmur-eseoneun' (ep. 9) frente a 'gireseo', 'jibe', 'gyosire' sin guion. Recomendación: reservar el guion solo para ambigüedad silábica real ('kape-e', 'gongwon-e') y quitarlo del resto. (4) 'ppanghago' (빵하고) y 'mokjulhago' (목줄하고) son legibles pero inducen corte erróneo (ppan-ghago): aquí el guion sí ayuda ('ppang-hago', 'mokjul-hago'). (5) Curiosidad sin gravedad pero conviene conocerla antes de que la vea un alumno: 우산도 romaniza como 'usando' (eps. 14 y 18), que un hispanohablante lee espontáneamente como el gerundio español «usando». Es correcto en RR y no hay que cambiarlo.

---

## Japonés (ja-JP)

**¿Apto para generar?** **NO**

La serie está bien construida en conjunto: el arco narrativo (libreta perdida → pistas → dueña → devolución) es coherente, la progresión gramatical A1 es ordenada (です → 助詞 → 形容詞 → 助数詞 → 時刻 → たい形 → て形 → 否定 → 接続詞 → repaso), el registro です・ます se mantiene estable y la romanización Hepburn es correcta y coherente en los 140 turnos. Pero NO está lista para generar audio: hay cinco turnos con japonés que un nativo consideraría erróneo, y dos de ellos enseñan justo lo contrario de lo que el episodio declara enseñar (el ep. 8 usa ありません para un gato en el episodio dedicado a あります/います; el ep. 18 abre con una pregunta de causa mal formada en el episodio dedicado a las negaciones). Además hay riesgos reales de lectura TTS en nombres propios que aparecen en los 20 episodios (春, 恵美, 星見町): si ElevenLabs los lee mal, obliga a regenerar la serie entera, así que conviene fijarlos en kana antes de gastar la primera generación. No hay nada vulgar ni cómico involuntario: el humor de 春 es intencionado y funciona. Corregidos los bloqueantes y fijadas las lecturas de los nombres propios, la serie es apta.

### Bloqueantes (5)

**ja-a1-08-heya-ni-neko (ep. 8)** · turno 5 · _gramática / contradicción pedagógica_

- Actual: ホテル係: 「いいえ。部屋には猫も荷物もありません。」 (es: «No. No hay gato ni equipaje.»; feedback del detalle 3: '猫もありません.')
- Propuesta: target: 「いいえ。部屋に猫はいません。荷物もありません。」 · romanization: 'Iie. Heya ni neko wa imasen. Nimotsu mo arimasen.' · es: «No. En la habitación no hay gato. Tampoco equipaje.» · Y cambiar el feedback del detalle 3 de '猫もありません.' a '猫はいません.'
- Motivo: 猫 es un ser animado y exige いません, nunca ありません. El error es doblemente grave porque el objetivo declarado del episodio es 「人と物の存在を区別して聞く」 y su grammar es ['あります/います']; la consolidación del mismo episodio enseña «います se usa con personas y animales» y el diálogo la desmiente. El alumno oye en el audio exactamente el error que se le acaba de corregir.

**ja-a1-18-namae-ga-arimasen (ep. 18)** · turno 1 · _gramática_

- Actual: アナ: 「どうして手帳に名前がありませんか。」 (rom.: 'Doushite techou ni namae ga arimasen ka.')
- Propuesta: target: 「手帳に名前がありませんね。どうしてですか。」 · romanization: 'Techou ni namae ga arimasen ne. Doushite desu ka.' · es: «La libreta no tiene nombre. ¿Por qué?»
- Motivo: どうして + ~ませんか no funciona como pregunta de causa: ~ませんか es invitación («¿no quiere usted…?»), de modo que la frase suena a «¿por qué no tiene usted nombre?» y a un nativo le resulta agramatical. Preguntar por la causa de un estado exige のです/んですか o partir la frase en dos, como propongo (esto último se mantiene dentro del A1).

**ja-a1-16-mite-mo-ii-desu-ka (ep. 16)** · turno 3 · _léxico / traducción_

- Actual: 田中ゆき: 「田中ゆきです。中の写真を開けてください。」 (es: «Soy Yuki Tanaka. Abra la foto interior, por favor.»)
- Propuesta: target: 「田中ゆきです。手帳を開けて、中の写真を見てください。」 · romanization: 'Tanaka Yuki desu. Techou o akete, naka no shashin o mite kudasai.' · es: «Soy Yuki Tanaka. Abran la libreta y miren la foto de dentro, por favor.»
- Motivo: 写真を開ける no existe en japonés: se abre el 手帳, no la foto. La traducción española «Abra la foto interior» es igual de incomprensible, así que el error se propaga al subtítulo. Además usa usted en singular («Abra») cuando se dirige a Ana y Haru, que son dos.

**ja-a1-14-rokuji-han (ep. 14)** · turno 4 · _gramática_

- Actual: アナ: 「カードには火曜日と木曜日とあります。」 (rom.: 'Kaado ni wa kayoubi to mokuyoubi to arimasu.')
- Propuesta: target: 「カードには火曜日と木曜日と書いてあります。」 · romanization: 'Kaado ni wa kayoubi to mokuyoubi to kaite arimasu.' · es: «La tarjeta dice martes y jueves.»
- Motivo: El と de cita necesita un verbo de decir o escribir (と書いてあります / と言います); 「〜とあります」 sin 書いて es una construcción de registro escrito-arcaico que aquí suena a error. El turno 1 del mismo episodio ya usa correctamente 「〜と書いてあります」, así que la corrección además unifica el episodio.

**ja-a1-07-toshokan-de (ep. 7)** · turno 1 · _registro / naturalidad_

- Actual: 図書館員: 「いらっしゃいませ。図書館で何をしますか。」
- Propuesta: target: 「こんにちは。何かお探しですか。」 · romanization: 'Konnichiwa. Nanika osagashi desu ka.' · es: «Hola. ¿Buscan algo?» · Variante A1 estricta: 「こんにちは。何を探していますか。」 ('Konnichiwa. Nani o sagashite imasu ka.')
- Motivo: いらっしゃいませ es el saludo comercial de tiendas y restaurantes; en una biblioteca pública japonesa nadie lo dice y suena a error de guion. Y 「図書館で何をしますか」 preguntado a un usuario suena a interrogatorio («¿qué va usted a hacer aquí?»), no a ofrecimiento de ayuda.

### Importantes (6)

**ja-a1-15-hanashitai-desu (ep. 15)** · turno 5 · _gramática (persona de たい)_

- Actual: アナ: 「春さんはいつも食べ物の話をしたいですね。」
- Propuesta: target: 「春さんはいつも食べ物の話をしますね。」 · romanization: 'Haru-san wa itsumo tabemono no hanashi o shimasu ne.' · es: «Haru siempre habla de comida.»
- Motivo: ~たいです describe el deseo propio; aplicado a otra persona en afirmativa plana el japonés exige ~たがる o ~たいんですね. Es un error clásico de hispanohablante y aparece precisamente en el episodio cuyo objetivo es 「たい形で希望を聞き取る」, así que refuerza el error que se quiere evitar.

**ja-a1-08-heya-ni-neko (ep. 8)** · turno 1 · _naturalidad / desfase con la traducción_

- Actual: ホテル係: 「こんにちは。ロビーに何かありますか。」 (es: «Hola. ¿Buscan algo en el lobby?»)
- Propuesta: target: 「こんにちは。何かお探しですか。」 · romanization: 'Konnichiwa. Nanika osagashi desu ka.' · es: «Hola. ¿Buscan algo?» · Variante A1: 「こんにちは。何を探していますか。」
- Motivo: 「ロビーに何かありますか」 significa «¿hay algo en el lobby?», no «¿buscan algo?»: el japonés y el español dicen cosas distintas y el audio quedará desalineado con el subtítulo. Además, un recepcionista de hotel jamás abordaría así a un visitante.

**ja-a1-04-neko-ga-imasu (ep. 4)** · turno 7 · _colocación léxica_

- Actual: 恵美: 「猫は手帳を書きません。たぶん女性の物です。」
- Propuesta: target: 「猫は字を書きません。たぶん女性の物です。」 · romanization: 'Neko wa ji o kakimasen. Tabun josei no mono desu.' · es: «Los gatos no escriben. Seguramente es de la mujer.»
- Motivo: 手帳を書く no es una colocación japonesa: se escribe EN la libreta (手帳に書く). El chiste funciona igual con 字を書きません y deja de sonar a calco del español «escribir una libreta».

**ja-a1-09-akai-kooto (ep. 9)** · turno 7 · _léxico + nivel_

- Actual: アナ: 「でもイベントの住所は小さくて読めません。」
- Propuesta: target: 「でもイベントの住所は字が小さいです。よく見えません。」 · romanization: 'Demo ibento no juusho wa ji ga chiisai desu. Yoku miemasen.' · es: «Pero la dirección del evento está en letra pequeña. No se ve bien.»
- Motivo: Una dirección no es «pequeña»: lo pequeño es la letra (字が小さい). Además 読めません es potencial, forma que no figura en el grammar declarado del episodio (['い形容詞','は/が']) ni ha aparecido en ningún episodio anterior: es la única estructura del episodio que el alumno no ha visto nunca.

**ja-a1-16-mite-mo-ii-desu-ka (ep. 16)** · turno 6 · _uso de la estructura enseñada_

- Actual: アナ: 「手帳を返してもいいですね。」 (es: «Entonces podemos devolverle la libreta.»)
- Propuesta: target: 「じゃあ、手帳を返しますね。」 · romanization: 'Jaa, techou o kaeshimasu ne.' · es: «Entonces le devolvemos la libreta.»
- Motivo: ~てもいいですね pide o concede permiso: aquí Ana estaría pidiendo permiso a la propietaria para devolverle su propio objeto, lo que resulta cómico y confuso. El episodio ya ejemplifica ~てもいいですか en los turnos 1, 2 y 7, así que no se pierde exposición a la estructura.

**ja-a1-11-mainichi-hatarakimasu (ep. 11) y ja-a1-12-doko-desu-ka (ep. 12)** · turno 0 · _consistencia de datos / asignación de voz_

- Actual: characters: ['アナ', '春', '祭りの店員'] — pero los turnos usan speaker: '店員', y en series.characters el personaje se llama '店員' (role: '店の店員')
- Propuesta: Poner characters: ['アナ', '春', '店員'] en ambos episodios, o renombrar el personaje a '祭りの店員' de forma uniforme en series.characters y en todos los speaker.
- Motivo: '祭りの店員' no coincide con ningún name de series.characters, de modo que cualquier lookup de voiceProfile por nombre (justo lo que alimenta la generación TTS) fallará o caerá en un valor por defecto. Son los dos únicos episodios de los 20 con esta discrepancia; en el resto characters y speaker coinciden exactamente.

### Menors (5)

**ja-a1-02-aoi-techou (ep. 2)** · turno 3 · _naturalidad_

- Actual: アナ: 「わかりません。人はもういません。」 (es: «No sé. Ya no hay nadie.»)
- Propuesta: target: 「わかりません。近くにだれもいません。」 · romanization: 'Wakarimasen. Chikaku ni dare mo imasen.' · es: «No sé. No hay nadie cerca.»
- Motivo: 「人はもういません」 suena a traducción literal de «ya no hay gente»; el japonés natural para «no hay nadie» es だれもいません. だれ ya es vocabulario del ep. 12, así que no rompe la progresión.

**ja-a1-13-neko-sanbiki (ep. 13)** · turno 7 · _gramática del remate cómico_

- Actual: アナ: 「たぶん。猫は三匹でも本を読みません。」 (es: «Tal vez. Aunque sean tres, los gatos no leen.»)
- Propuesta: target: 「たぶん。でも猫は本を読みません。三匹いても読みません。」 · romanization: 'Tabun. Demo neko wa hon o yomimasen. Sanbiki ite mo yomimasen.' · es: «Tal vez. Pero los gatos no leen. Ni aunque sean tres.»
- Motivo: El でも concesivo sobre un numeral pide 「三匹いても」; tal como está, el remate se lee a trompicones. Y es la frase que cierra el episodio, la que más se recuerda.

**ja-a1-18-namae-ga-arimasen (ep. 18)** · turno 3 · _continuidad interna_

- Actual: 春: 「でも今日はミルクが駅にいませんでした。」 seguido de 田中ゆき: 「ミルクは手帳をベンチに置きました。」
- Propuesta: Cambiar el turno 3 a 「でもぼくたちは駅でミルクを見ませんでした。」 · romanization: 'Demo bokutachi wa eki de Miruku o mimasen deshita.' · es: «Pero nosotros no vimos a Milk en la estación.»
- Motivo: Tal como está, Haru afirma que Milk no estuvo en la estación y Yuki responde acto seguido que Milk dejó la libreta en la banca de esa estación: se contradicen en dos turnos consecutivos. Con «no lo vimos», la explicación de Yuki encaja (el gato pasó y se fue) y la revelación final gana sentido.

**ja-a1-07-toshokan-de (ep. 7)** · turno 0 · _metadatos / coherencia con la voz_

- Actual: audit.pronunciationRisks: ['届けます', '受付'] — 受付 no aparece en ningún turno del episodio. Y el feedback del gist dice «La bibliotecaria reconoce a Tanaka», pero 図書館員 tiene voiceProfile '成人男性、静かでゆっくりした声'.
- Propuesta: Sustituir '受付' por '図書館' en pronunciationRisks y cambiar el feedback del gist a «El bibliotecario reconoce a Tanaka».
- Motivo: El género del feedback en español contradice la voz masculina que se va a generar: el alumno leerá «bibliotecaria» mientras oye a un hombre. 受付 en la lista de riesgos es residuo de otra versión del guion.

**ja-a1-05-kippu-o-mimasu (ep. 5)** · turno 2 · _traducción_

- Actual: 恵美: 「この切符を見ます。昨日の午後の切符です。」 (es: «Miremos el boleto. Es de ayer por la tarde.»)
- Propuesta: es: «Voy a mirar este boleto. Es de ayer por la tarde.» (o bien cambiar el japonés a 「この切符を見ましょう。」 / 'Kono kippu o mimashou.')
- Motivo: El español propone una acción conjunta (~ましょう) que el japonés no expresa. Es un desajuste pequeño, pero el ep. 5 aún no ha introducido ~ましょう y el subtítulo se lo adelanta al alumno.

### Riesgos de pronunciación TTS

- **春 (nombre del coprotagonista)** (Todos los episodios (1–20); crítico en ep. 1 turno 3: 「ぼくは春です。」): 春 tiene lectura kun はる y lectura on シュン. Como nombre propio aislado y sin furigana, un TTS japonés puede leerlo «Shun», y en 「春さん」 la ambigüedad persiste. Es el nombre que más veces se pronuncia en toda la serie: si sale mal, hay que regenerar los 20 episodios. → Escribir el nombre en hiragana en el campo target: 「はる」 / 「はるさん」 (la romanización 'Haru' ya confirma la lectura buscada). Como mínimo, generar un episodio de prueba y escucharlo antes de lanzar el lote completo.
- **恵美 (駅員)** (ep. 3 turnos 1, 4, 6; también ep. 4, 10 y 20): 恵美 admite えみ (previsto por la romanización 'Emi') pero también めぐみ, lectura muy frecuente en Japón. Un TTS puede optar por «Megumi». → Escribir 「えみ」 en kana en target, o 「恵美（えみ）」 si se quiere conservar el kanji en pantalla y el motor respeta la lectura entre paréntesis.
- **星見町** (ep. 10 turnos 1 y 2, con referencias en ep. 11 y 12): El sufijo 町 se lee ちょう o まち según el topónimo, sin regla fija; la romanización fija 'Hoshimi-chou' pero el TTS puede decir «Hoshimi-machi». Además 星見 podría leerse «Seiken» si el motor lo trata como compuesto on. → Escribir 「ほしみ町」 o directamente 「ほしみちょう」 la primera vez que aparece y mantener la misma forma en los episodios 11 y 12.
- **一日** (ep. 14 turno 7: 「探偵の一日は時計より長いですね。」): 一日 se lee いちにち («un día») o ついたち («día 1 del mes»). Aquí el sentido exige いちにち, pero es justo el kanji que más equivoca un TTS, y va en la frase de cierre del episodio. → Escribir 「探偵のいちにちは時計より長いですね。」 (la romanización ya dice 'ichinichi').
- **何 (何ですか / 何をしますか)** (ep. 7 turno 1, ep. 8 turno 1, ep. 12 turno 5): 何 alterna なん (何ですか) y なに (何をしますか) y la serie usa las dos. Si el motor elige mal producirá «nani desu ka» o «nan o shimasu ka», ambos claramente incorrectos para un oído nativo. → Escribir 「なんですか」 en kana en ep. 12 turno 5 y 「なにを」 en ep. 7 turno 1, o verificarlo en la generación de prueba. Es el único kanji que aparece en la misma serie con dos lecturas distintas.
- **緑駅** (ep. 5 turnos 4 y 5): 緑 en compuestos suele leerse りょく (緑茶 = ryokucha); como nombre de estación inventado, el TTS puede producir «Ryoku-eki» en vez de «Midori-eki». → Escribir 「みどり駅」 en target; la romanización 'Midori-eki' ya es la correcta.
- **三十分 / 一匹 / 二匹 / 三匹** (ep. 14 turno 2; ep. 13 turnos 1, 2 y 3): 三十分 admite さんじっぷん y さんじゅっぷん (la romanización fija 'sanjuppun'); los contadores de 匹 sufren cambio fonético (ippiki / nihiki / sanbiki) que algunos motores resuelven mal cuando van seguidos. → Riesgo bajo pero verificable: escuchar el ep. 13 en primer lugar, ya que su objetivo depende por completo de que los tres contadores suenen distintos. Mantener la nota ya presente en su audit («Pausar brevemente entre cada cantidad»).
- **二人 / 今日** (ep. 1 turno 6 (二人の席); 今日 en ep. 1, 5, 7, 11, 14 y 17): 二人 debe sonar ふたり (nunca ににん) y 今日 きょう (nunca こんにち). Son lecturas estándar que casi todos los motores aciertan, pero el fallo pasaría desapercibido en la revisión de texto. → No requiere cambio en el fichero: basta incluir estos dos turnos en la escucha de control del primer episodio generado antes de lanzar el lote.

### Romanización

Sistema Hepburn con vocales largas por dígrafo (techou, Toukyou, gogo rokuji, jouhou, koohii, Sutaa Hoteru), geminadas duplicadas (massugu, ippiki, sandoicchi, sanjuppun) y partículas transcritas por su valor fonético (wa, e, o). He revisado los 140 turnos: la transliteración es correcta y coherente en todos, incluidos los puntos donde suele fallar — 「へ」→ 'e' (ep. 7: 'toshokan e kimasu'), 「は」→ 'wa' (ep. 4: 'Shashin ni wa'), 「を」→ 'o' (ep. 2: 'techou o misemasu') y los cambios fonéticos de 匹 (ippiki / nihiki / sanbiki, ep. 13). Nombres propios en mayúscula y con guion para el sufijo (Midori-eki, Hoshimi-chou, Tanaka-san, Ana-san). No he encontrado ningún error de transliteración. Única inconsistencia de estilo: 電話番号 va sin espacio ('denwabangou', ep. 3) mientras compuestos equivalentes sí se separan ('neko matsuri' ep. 10, 'eki sutanpu' ep. 20); no afecta al audio, pero conviene unificar a 'denwa bangou'. AVISO OPERATIVO: si se aplican las correcciones de los hallazgos, hay que actualizar en paralelo el campo romanization de esos mismos turnos — quedarían desincronizados en los episodios 2, 4, 5, 7, 8, 9, 13, 14, 15, 16 y 18.

---

## Ruso (ru-RU)

**¿Apto para generar?** **NO**

La serie está, en conjunto, bien construida: el ruso es sobrio, el léxico es realmente A1, la ё está escrita en TODAS las palabras que la llevan (тёплый, чёрный, актёры, пьёт, звёзды, идём, берёт, её, ещё) — eso por sí solo evita la mayoría de los errores típicos de TTS ruso —, no hay cifras sin desarrollar, la concordancia de género de los personajes en pasado es correcta (нашла/получила en boca de mujeres, ningún conflicto con Кассир mujer aunque el sustantivo sea masculino) y la continuidad narrativa cierra bien (el número de Sofía del ep. 13 explica que Elena la llame a ella en el ep. 14). NO es apto para generar todavía: hay dos errores de lengua que un profesor ruso tacharía y que además se enseñan justo en el episodio equivocado, más una docena de frases que suenan a traducción del español, un desajuste entre un turno y su clave de respuesta (ep. 10) y una opción de ejercicio corrupta («нету есть», ep. 9). Todo se arregla en el texto, sin rehacer la serie.

RESPUESTA A LAS TRES DUDAS MARCADAS COMO «REVISAR» EN scripts/validate-listening-series.mjs:

1) Episodio 6, «не моя» — NO. En todo el episodio (ni en toda la serie) se oye ninguna forma femenina. Solo el masculino, dos veces: turno 3, Анна: «Нет, шарф не мой. Я не ношу шарфы.» y turno 5, Анна: «Тоже не мой. Я люблю звёзды, а не луну.» Es correcto que sea masculino (шарф y значок lo son); lo que está mal es la ficha de vocabulario, que promete «не моя». Corregir la keyword a «не мой» (y, si se quiere conservar el contraste con el español «bufanda» femenina, explicarlo en la nota didáctica, no en el audio).

2) Episodio 6, «звезда» — SÍ, se oye, en acusativo plural. Turno 5, Анна: «Тоже не мой. Я люблю звёзды, а не луну.» La keyword «звезда» es el lema correcto, pero el alumno oirá [zvyózdy] con ё; conviene que la ficha muestre «звезда → звёзды».

3) Episodio 15, «бежать» — SÍ, se oye, en 1.ª persona del plural. Turno 6, Миша: «Значит, теперь бежим к входу номер два.» Uso correcto y natural. Único matiz: la norma prefiere «ко входу» ante el grupo consonántico (ver hallazgo menor).

### Bloqueantes (2)

**13 — Письмо Елене** · turno 5 · _gramática (posesivo reflexivo свой)_

- Actual: Дай ей твой номер. Мой телефон почти разряжен.
- Propuesta: Дай ей свой номер. Мой телефон почти разряжен.
- Motivo: Cuando el poseedor coincide con el sujeto (aquí el «tú» implícito del imperativo), el ruso exige свой. «Дай ей твой номер» es un calco directo del español «dale tu número» y un nativo lo corrige de inmediato. Agrava el problema que свой figure como palabra clave del ep. 10 («свои вещи») y que Елена lo use bien en el ep. 16 («Я хочу найти свой шарф»): el audio enseñaría la forma correcta y la incorrecta en la misma serie.

**15 — Идём или едем?** · turno 3 · _verbo de movimiento / aspecto_

- Actual: Тогда идём быстро. Елена уже приходит к станции.
- Propuesta: Тогда идём быстро. Елена уже подходит к станции.
- Motivo: приходить es el verbo de llegada consumada o habitual («Лена приходит сюда по четвергам»). Para «ya se está acercando / está llegando ahora mismo» el ruso usa подходит (o идёт). El error es especialmente caro porque este episodio es precisamente el de los verbos de movimiento: se estaría fijando por audio el uso equivocado. Si se quiere conservar приходить en la ficha de vocabulario, mantenerlo solo como lema con la glosa «llegar (habitualmente)».

### Importantes (11)

**10 — Её шарф** · turno 7 · _desajuste con la clave de respuesta + verosimilitud_

- Actual: Вот адрес её дома и номер театра.
- Propuesta: Вот адрес театра и номер кассы.
- Motivo: Doble problema. (a) La pregunta de detalle del propio episodio da como respuesta correcta «Dirección y teléfono del teatro», pero el audio dice «la dirección de SU CASA y el número del teatro»: el alumno atento marcará la opción como falsa. (b) Un librero que entrega a dos desconocidos la dirección del domicilio de una clienta —después de haberles enseñado una foto de ella en su móvil (turno 2)— resulta inverosímil y ligeramente inquietante para un oyente adulto. El dato nunca se usa: quedan en el metro. Cambiarlo por la dirección del teatro arregla las dos cosas de una vez y deja la clave correcta.

**9 — Нет хозяйки шарфа** · turno 0 · _opción de ejercicio corrupta (consolidación, no es un turno)_

- Actual: ['Completa: Лены сейчас ___.', 'нет', 'не', 'нету есть', 'Нет exige genitivo.']
- Propuesta: ['Completa: Лены сейчас ___.', 'нет', 'не', 'нету', 'Нет exige genitivo.']
- Motivo: «нету есть» no es una palabra ni una secuencia posible en ruso: parece un distractor mal fusionado. Se muestra en pantalla al alumno y desconcierta. «нету» solo ya es un distractor válido (coloquial, no apto en registro neutro).

**12 — В пять часов** · turno 6 · _tiempo verbal / desajuste con la traducción_

- Actual: Через полчаса я уже очень голодный.
- Propuesta: Через полчаса я буду очень голодный.
- Motivo: «Через полчаса» proyecta al futuro, pero la frase va con cópula cero de presente: es agramatical en ese contexto y suena a traducción literal. Además la línea española ya dice futuro («ya tendré mucha hambre»), así que el ruso no coincide con su propia traducción. быть en futuro se introduce formalmente en el ep. 18, pero aquí es comprensión receptiva y no estorba.

**13 — Письмо Елене** · turno 1 · _frase telegráfica / falta de cópula_

- Actual: Репетиция дольше. Напишите Елене короткую записку.
- Propuesta: Репетиция будет дольше. Напишите Елене короткую записку.
- Motivo: «Репетиция дольше» es un comparativo sin término de comparación ni verbo: ningún nativo lo diría así. La traducción española ya usa futuro («El ensayo durará más»), luego el ruso está por debajo de su propia versión. Alternativa igual de A1: «Репетиция ещё идёт».

**15 — Идём или едем?** · turno 2 · _ambigüedad (homógrafo стоит) — afecta al audio_

- Actual: Можно ехать на автобусе, но автобус стоит.
- Propuesta: Можно ехать на автобусе, но автобус не едет.
- Motivo: стоит es homógrafo: стоИт «está parado» / стОит «cuesta». Sin tildes en el texto, ElevenLabs puede leer «el autobús CUESTA», que además tiene sentido en el contexto («podemos ir en bus, pero cuesta dinero») y el alumno A1 no tiene forma de desambiguar. Es exactamente el tipo de línea que obliga a regenerar. «не едет» elimina el riesgo y encaja con el remate del turno 4 («наш автобус наконец едет!»).

**7 — Мы ищем Лену** · turno 7 · _colocación (calco del español)_

- Actual: Отлично. Я беру карту, а София берёт ответственность.
- Propuesta: Отлично. Я беру карту, а София берёт на себя ответственность.
- Motivo: En ruso la colocación fija es «брать на себя ответственность». «Берёт ответственность» a secas es un calco de «toma la responsabilidad» y suena a extranjero justo en el remate cómico del episodio, que es donde más se nota.

**19 — Луна на сцене** · turno 6 · _colocación (calco del español)_

- Actual: Хорошо. Один шарф уже сделал достаточно драмы.
- Propuesta: Хорошо. Один шарф уже устроил достаточно драмы.
- Motivo: «Сделать драму» no existe como colocación en ruso; es traducción directa de «hacer suficiente drama». Los verbos naturales son устроить (más coloquial y cómico) o создать. La frase es la línea de humor del episodio: si suena a traducción, el chiste muere.

**13 — Письмо Елене** · turno 7 · _humor que no funciona en la lengua meta_

- Actual: Спасибо. А буфету можно передать наш голод?
- Propuesta: Спасибо. А в буфет можно передать, что мы очень голодные?
- Motivo: El chiste está construido sobre el dativo español («transmitirle nuestra hambre al bufé»), pero «передать голод буфету» en ruso no evoca nada gracioso: suena a error de caso mal resuelto, no a broma. La versión propuesta mantiene el paralelismo con «Я передам записку Елене» del turno anterior, que es donde está la gracia, y sigue siendo A1.

**14 — К станции** · turno 7 · _continuidad + naturalidad_

- Actual: Главное — не пойти домой с чужим шарфом.
- Propuesta: Главное — не уйти домой без Елены.
- Motivo: Dos problemas. (a) Continuidad: la bufanda está en la oficina de objetos perdidos del metro desde el ep. 3 y ellos mismos lo repiten en los eps. 10 y 14 («Ваш шарф в бюро находок метро»); no pueden irse a casa con una bufanda que no tienen. (b) «не пойти домой» con пойти perfectivo suena forzado; para «no acabar yéndose» el ruso usa уйти. Cualquier remate que no implique tener el objeto en la mano sirve.

**2 — Красный шарф** · turno 5 · _negación de existencia (construcción calcada)_

- Actual: Но хозяйка шарфа уже не здесь.
- Propuesta: Но хозяйки шарфа здесь уже нет.
- Motivo: Para negar la presencia de alguien el ruso usa нет + genitivo, no «не» + adverbio de lugar. «Хозяйка уже не здесь» es un calco de «la dueña ya no está aquí». Lo confirma la propia serie: el ep. 9 lo hace bien («Лены сейчас нет в магазине», «Телефона нет»), así que el ep. 2 contradice el modelo que se enseña siete episodios después. Ojo: hay que corregir también el feedback del detalle 3, que cita «Она уже не здесь.»

**5 — Кто, где, когда?** · turno 6 · _expresión de frecuencia_

- Actual: Во вторник и четверг, после шести часов.
- Propuesta: Каждый вторник и четверг, после шести часов.
- Motivo: La pregunta del turno anterior es «Когда Лена обычно приходит сюда?» (habitual), pero «во вторник и четверг» designa unos días concretos y próximos, no una costumbre. La respuesta normativa sería «по вторникам и четвергам», pero el dativo plural queda fuera de A1: «каждый вторник и четверг» resuelve la habitualidad con acusativo, que sí es nivel.

### Menors (12)

**6 — Это не Анна** · turno 3 · _ficha de vocabulario que no coincide con el audio_

- Actual: keywords: { target: 'не моя', es: 'no es mía' } — audio: «Нет, шарф не мой. Я не ношу шарфы.»
- Propuesta: keywords: { target: 'не мой', es: 'no es mío (mi bufanda no es mía)' }
- Motivo: Respuesta al REVISAR n.º 1: la forma femenina no aparece en ningún turno. La ficha promete una palabra que el alumno nunca oirá. El género es correcto en el audio (шарф y значок son masculinos); lo que hay que cambiar es la keyword, no el diálogo.

**4, 10 y 14** · turno 2 · _fichas de vocabulario que no coinciden con el audio_

- Actual: ep.4 'ищет' (se oye «Мы ищем хозяйку…»); ep.10 'ваша' (se oye «на вашем телефоне»); ep.14 'в метро' (se oye «идём к метро», nunca «в метро»)
- Propuesta: ep.4 → 'ищем'; ep.10 → 'ваш'; ep.14 → 'к метро' (o añadir «Мы спускаемся в метро» a un turno)
- Motivo: Mismo problema que «не моя»: la lista de palabras nuevas anuncia formas que no suenan en el episodio. En una serie de comprensión auditiva la ficha debe reflejar exactamente lo que el oído recibe, o el alumno cree que se le ha escapado algo.

**7 — Мы ищем Лену** · turno 6 · _cita incorrecta en el feedback / metadatos_

- Actual: detalle 3 feedback: 'Синюю дверь.' — audio: «У театра синяя дверь и белая вывеска.»; audit.pronunciationRisks: ['ответственность', 'вывеску']
- Propuesta: feedback: 'Синяя дверь.'; pronunciationRisks: ['ответственность', 'вывеска']
- Motivo: El feedback cita un acusativo que no se pronuncia nunca; en un episodio dedicado justamente al acusativo, mostrar «синюю дверь» como si se hubiera oído induce a error. Mismo tipo de descuido en el ep. 19, cuyos pronunciationRisks incluyen 'декорация', palabra que no aparece en ningún turno.

**1 — Новая студентка** · turno 6 · _preposición no estándar_

- Actual: Ваши места рядом с окном, на первом ряду.
- Propuesta: Ваши места рядом с окном, в первом ряду.
- Motivo: Para filas de asientos (aula, teatro, cine) el ruso estándar es «в первом ряду»; «на первом ряду» es coloquial y está desaconsejado. El personaje es el profesor de ruso: es el último que debería usar una variante marcada.

**15 — Идём или едем?** · turno 6 · _variante de preposición_

- Actual: Значит, теперь бежим к входу номер два.
- Propuesta: Значит, теперь бежим ко входу номер два.
- Motivo: Ante el grupo consonántico вх- la norma prefiere ко. «К входу» se oye, pero «ко входу» es la forma recomendada y además se pronuncia con más claridad en TTS (evita la fusión k-vkh). Corregir también el feedback del detalle 3, que repite «К входу номер два».

**12 — В пять часов** · turno 5 · _expresión de hora poco natural_

- Actual: Значит, мы можем ждать здесь до шести тридцати.
- Propuesta: Значит, мы можем ждать здесь до половины седьмого.
- Motivo: «Шесть тридцать» se usa para horarios de transporte o espectáculos, pero «до шести тридцати» en habla espontánea suena administrativo; lo natural es repetir «до половины седьмого», que además refuerza por repetición la expresión que el episodio quiere enseñar (y que aparece en el turno 4).

**11 — Два билета** · turno 7 · _remate cómico con sintaxis calcada_

- Actual: Но два детектива хорошо подходят к двум билетам.
- Propuesta: Но к двум билетам как раз подходят два детектива.
- Motivo: «Подходить к» en el sentido de «combinar con» exige el orden inverso para sonar idiomático; tal como está, la frase se lee como «dos detectives se acercan a dos entradas» antes de entenderse como chiste. El cambio de orden salva el juego sin tocar el vocabulario.

**7 y 18** · turno 0 · _metadatos incoherentes (campo location)_

- Actual: ep.7 location: 'Calle frente al café'; ep.18 location: 'Vestíbulo del metro'
- Propuesta: ep.7 → 'Улица перед кафе'; ep.18 → 'Вестибюль метро'
- Motivo: Los otros 18 episodios tienen el campo location en ruso ('Станция метро', 'Книжный магазин', 'Театральная касса'…). Estos dos están en español: si el campo se muestra en la ficha del episodio, la serie aparecerá con dos idiomas mezclados.

**5 — Кто, где, когда?** · turno 0 · _id que no corresponde al título_

- Actual: id: 'ru-a1-05-chto-gde-kogda' / title: 'Кто, где, когда?'
- Propuesta: id: 'ru-a1-05-kto-gde-kogda' (o devolver el título a «Что, где, когда?»)
- Motivo: El slug dice chto y el título dice Кто. Los ids se usan como URL y probablemente como nombre de los ficheros de audio: conviene decidirlo ANTES de generar, porque renombrar después implica tocar rutas. Mismo caso menor en el ep. 10, cuyo slug 'ey-sharf' translitera её como 'ey' cuando el resto del fichero usa 'yeyo', y en el ep. 9, 'hozyayki' frente a 'khozyayki' de los turnos.

**17 — Покажите карман** · turno 0 · _título y ejercicio con una palabra que no se pronuncia_

- Actual: title: 'Покажите карман'; consolidación: '¿Cuál es una orden cortés plural/formal?' → 'Покажите'
- Propuesta: Añadir «Покажите значок ещё раз, пожалуйста.» en boca del Сотрудник, o cambiar título y opción a «Опишите» / «Назовите», que sí se oyen
- Motivo: En el episodio se oyen назовите, опишите, подождите, подпишите, возьмите y держите, pero покажите no aparece en ningún turno pese a dar título al episodio y ser la respuesta correcta del ejercicio. El alumno buscará en el audio una palabra que no está.

**1 (y 6, 9, 12, 17, 19)** · turno 7 · _romanización fiel a la letra, engañosa como guía de pronunciación_

- Actual: Spasibo. Segodnya moy pervyy den' v Moskve. (сегодня); también 'Chto v zakaze?' (ep.9), 'Konechno' (eps.16,18), 'derzhite yego krepko' (ep.17)
- Propuesta: Mantener la transliteración y añadir una nota de pronunciación para las cuatro palabras: сегодня [sevódnya], что [shto], конечно [kanéshna], его [yevó]
- Motivo: El sistema usado es una transliteración de letras, no una transcripción fonética, y es coherente en los 140 turnos. Pero un principiante hispanohablante lee la columna como si fuera pronunciación, y en estas cuatro palabras (que aparecen en 10 turnos) la letra г, ч y о se pronuncian de otro modo. Es la única grieta pedagógica del sistema.

**16 — Хочу и могу** · turno 5 · _traducción española poco natural_

- Actual: Хорошо. Я иду с вами к сотруднику. → 'Bien. Voy con usted al empleado.'
- Propuesta: 'Bien. La acompaño a hablar con el empleado.'
- Motivo: «Ir al empleado» no es español natural (к + persona se traduce por «donde», «a ver a» o «a hablar con»). El ruso está bien; lo que hay que retocar es la línea es.

### Riesgos de pronunciación TTS

- **стоит** (15 — Идём или едем? (turno 2)): Homógrafo sin desambiguar: стоИт «está parado» / стОит «cuesta». ElevenLabs elige el acento por estadística y aquí las dos lecturas encajan en el contexto («pero el autobús cuesta»), así que un error no se detecta hasta escuchar el resultado. → Reescribir a «но автобус не едет» (recomendado) o, si se quiere conservar el verbo, «но автобус стоит на остановке», donde el complemento fuerza la lectura correcta.
- **значок-луна / значок-луну** (4 (turno 3), 10 (turno 2), 16 (turno 3)): El guion en un compuesto aposicional suele provocar una pausa o una entonación de inciso en TTS ruso, y a veces se lee como raya. Aparece tres veces en momentos clave de la trama. → Usar la fórmula que la propia serie ya emplea en el ep. 6: «значок в форме луны», o «лунный значок». Ambas son A1 y se leen sin sobresaltos.
- **Соколова** (9 (turno 5), 11 (turno 2)): Apellido con acento no deducible: СоколОва (correcto) frente a СокОлова. Es el dato que el alumno tiene que retener del ep. 9, así que un acento erróneo arruina justo la información clave. → Escuchar expresamente las dos apariciones en la primera muestra; si falla, generar ese turno por separado con la variante acentuada «Соколо́ва».
- **в половине седьмого** (12 (turno 4)): Numeral ordinal en genitivo dentro de una expresión de hora: es donde más se equivocan los TTS rusos (седьмОго / сЕдьмого) y donde el alumno menos margen tiene para reconstruir. → Verificarlo en la primera muestra; el propio audit del episodio ya pide «marcar pausas antes de cada hora», que es la mitigación correcta: coma antes de la expresión horaria.
- **Здравствуйте** (1, 3, 4, 8, 9, 14 (6 apariciones)): Grupo -вств-: algunas voces rusas sobrearticulan la в y producen [zdravstvuytye] en lugar de la forma real [zdrastvuytye]; se repite seis veces, así que el defecto queda grabado en toda la serie. → Comprobarlo en el primer episodio antes de lanzar el lote completo. Si la voz elegida lo sobrearticula, cambiar de voz o alternar con «Добрый день» en dos o tres saludos.
- **уже** (2 (turno 5), 10 (turno 3), 15 (turnos 3 y 5), 19 (turno 6)): Homógrafo ужЕ «ya» / Уже «más estrecho». El contexto lo resuelve casi siempre, pero es una palabra muy frecuente en la serie (5 apariciones) y un acento inicial erróneo suena claramente extranjero. → Chequeo rápido en la muestra del ep. 2; no requiere cambio de texto si la voz acierta.

### Romanización

Sistema empleado: transliteración práctica de tipo BGN/PCGN, aplicada de forma COHERENTE en los 140 turnos. No he encontrado ni un solo error de transliteración por turno. Correspondencias verificadas: х→kh (khozyayka, khorosho), ц→ts (stantsii, stsene), ч→ch, ш→sh, щ→shch (ploshchad', yeshchyo, veshch'), ж→zh, ы→y (krasnyy, vyveska), й→y (moy, seychas), я→ya, ю→yu, ь→apóstrofo (den', dver', pomoshch'), ъ no aparece. La regla de е se aplica bien: «ye» en inicial, tras vocal y tras ь (Yelena, yest', Navernoye, kliyenta, Druz'ya, yeyo), «e» en el resto (teatre, tetradi, Zdravstvuyte).

Única desviación respecto al BGN/PCGN estricto: la ё se romaniza «yo» en lugar de «ë/yë» (tyoplyy, chyornyy, aktyory, otnesyom, p'yot, idyom, beryot, zvyozdy, zhyoltaya, yeshchyo). Es una desviación deliberada y sistemática, sin una sola excepción en toda la serie, y para un hispanohablante es más útil que la diéresis. La dejaría tal cual: no hay nada que corregir, solo conviene documentarla para que futuras series (coreana, japonesa, francesa) no usen otro criterio.

Dos observaciones que sí requieren acción, ya recogidas como hallazgos menores: (1) los ids de episodio usan un criterio distinto al de los turnos —'hozyayki' frente a 'khozyayki', 'ey-sharf' frente a 'yeyo'—, y si los ids nombran los ficheros de audio conviene unificarlos ANTES de generar; (2) al ser transliteración de letras y no transcripción fonética, cuatro palabras muy frecuentes engañan al principiante: сегодня→'segodnya' (se pronuncia sevódnya), что→'chto' (shto), конечно→'konechno' (kanéshna), его→'yego' (yevó). Recomiendo mantener la transliteración y añadir una nota de pronunciación para esas cuatro, no alterar el sistema.
