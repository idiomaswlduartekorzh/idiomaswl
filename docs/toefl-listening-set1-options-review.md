# Set 1 — revisión académica de opciones (BORRADOR)

Estado: pendiente de revisión de Zhanna Korzh. Ninguna aprobación previa se extiende a estas redacciones. C09 sigue bloqueado; HR-06 no se cierra.

Esta hoja contiene claves: es material interno de curaduría, no una página para alumnos.

## Qué revisar

Escuchar cada audio; confirmar que la clave sigue siendo la única mejor respuesta, que los distractores son plausibles sin ser ambiguos y que el inglés suena natural. Anotar aceptar/cambiar por ID. La estadística no sustituye esa revisión.

Opciones propuestas exclusivamente: no se ha cambiado el banco que usa la página abierta. El audio, el enunciado, los IDs y la posición de la clave se conservan en la proyección de prueba. Revisar también las explicaciones de feedback antes de una integración futura.

## Resultado del control de longitud

| Medida (34 preguntas) | Original | Propuesta |
| --- | ---: | ---: |
| Correcta estrictamente más larga, caracteres | 29 | 8 |
| Correcta estrictamente más larga, palabras | 29 | 5 |
| Aciertos al elegir más caracteres, empate aleatorio | 85,3% | 28,4% |
| Aciertos al elegir menos caracteres, empate aleatorio | 8,8% | 41,2% |

Riesgo residual: elegir la más corta por caracteres todavía daría 41,2%; se deja visible para revisión, no se certifica ausencia de sesgo. El umbral propuesto de alerta (>45%, grupos de al menos 16) es solo cribado de ingeniería, no criterio ETS ni significancia estadística. Las familias pequeñas requieren inspección aunque no activen alerta.

Atención a las familias pequeñas: en anuncios, elegir menos palabras acierta 3/4; en conversación y académico, elegir menos caracteres acierta 3/6 y 4/8. No activar una alerta por tamaño mínimo NO significa aprobar estos grupos.

Los otros 19 sets NO están corregidos. El diagnóstico cubre los 680 ítems, incluidos los reutilizados.

## Evidencia y alcance

SHA-256 candidato: `6afedc554facae03c12103f7f238a0253292de9ea9d0b206fff44096e8f2ad5d`. Fuente base: `2ad1ce2fe31286b8b1c9d09212999c7de0f82cdc`.

A 2026-09-04 origin/main tiene dos commits IELTS posteriores a la base común; las fuentes Listening cotejadas no cambian. Reconciliar con main y repetir pruebas antes de implementar (D10). No se hizo merge, deploy ni cambio del registro de aprobaciones.

Los primeros cinco audios se cotejaron mediante transcripción automática local (whisper.cpp, modelo small.en ya instalado), no mediante revisión auditiva humana. Texto automático pendiente de confirmación:

1. Excuse me, could you tell me where the science library is?
2. We're all going out for dinner on Saturday. Would you like to come?
3. Oh no, I forgot my umbrella and it's pouring outside.
4. Could you send me the information about next week's workshop?
5. You look really cheerful today. Did something good happen?

## Comparación por pregunta

### 1. item:t1-l-cr1-fixed-v1

Choose the best response to what you heard.

Clave conservada: **A**. Familia: response.

[Escuchar audio local](http://127.0.0.1:3026/audio/toefl/set-1/listen-choose-1.mp3)

| Opción | Original | Propuesta |
| --- | --- | --- |
| A | It's on the first floor, next to the café. | On the first floor, beside the café. |
| B | No, I don't like tennis. | It opens at nine on weekday mornings. |
| C | The soup is ready. | Your card lets you borrow three books. |
| D | She left this morning. | The library café serves lunch until two. |

La pregunta oral pide la ubicación de la biblioteca de ciencias. A conserva la ubicación original; B responde un horario, C una norma de préstamo y D el horario del café. Transcripción automática pendiente de cotejo humano.

Decisión humana: **pendiente**.

### 2. item:t1-l-cr2-fixed-v1

Choose the best response to what you heard.

Clave conservada: **C**. Familia: response.

[Escuchar audio local](http://127.0.0.1:3026/audio/toefl/set-1/listen-choose-2.mp3)

| Opción | Original | Propuesta |
| --- | --- | --- |
| A | Yes, he is a doctor. | The dinner menu changes every Saturday. |
| B | It is two meters long. | We all enjoyed our meal there last week. |
| C | Sure, I'd love to join you for dinner. | Sure, I'd love to join you for dinner. |
| D | The gate is closed. | You can reserve a table on their website. |

El audio invita al oyente a cenar el sábado. C acepta la invitación; las otras opciones hablan del menú, de una salida anterior o del procedimiento de reserva, sin contestar la invitación. Transcripción automática pendiente de cotejo humano.

Decisión humana: **pendiente**.

### 3. item:t1-l-cr3-fixed-v1

Choose the best response to what you heard.

Clave conservada: **C**. Familia: response.

[Escuchar audio local](http://127.0.0.1:3026/audio/toefl/set-1/listen-choose-3.mp3)

| Opción | Original | Propuesta |
| --- | --- | --- |
| A | He arrives on Friday. | You can leave your coat at the front desk. |
| B | It costs five dollars. | The lobby windows were cleaned this morning. |
| C | You can borrow one from the front desk. | You can borrow one from the front desk. |
| D | The tea is cold. | The forecast said it would rain tomorrow. |

La persona olvidó el paraguas y está lloviendo. C propone pedir uno prestado; A ofrece guardar otra prenda, B informa de limpieza y D habla de otra previsión. Revisar que C conserve una interpretación única. Transcripción automática pendiente de cotejo humano.

Decisión humana: **pendiente**.

### 4. item:t1-l-cr4-fixed-v1

Choose the best response to what you heard.

Clave conservada: **A**. Familia: response.

[Escuchar audio local](http://127.0.0.1:3026/audio/toefl/set-1/listen-choose-4.mp3)

| Opción | Original | Propuesta |
| --- | --- | --- |
| A | Of course — I'll email you the details. | Of course—I'll email you the details. |
| B | The bus was late. | The workshop covered a different topic. |
| C | No, I have not read it. | I sent my application in last Tuesday. |
| D | It is made of wood. | The speaker asked us to arrive early. |

El audio pide que le envíen información del taller de la semana siguiente. A promete enviarla; B habla de un taller pasado, C de una solicitud ya enviada y D de una instrucción aislada sin responder a la petición. Transcripción automática pendiente de cotejo humano.

Decisión humana: **pendiente**.

### 5. item:t1-l-cr5-fixed-v1

Choose the best response to what you heard.

Clave conservada: **A**. Familia: response.

[Escuchar audio local](http://127.0.0.1:3026/audio/toefl/set-1/listen-choose-5.mp3)

| Opción | Original | Propuesta |
| --- | --- | --- |
| A | Yes, I passed all my exams! | Yes, I passed all my exams! |
| B | The store is far. | I wore this sweater yesterday. |
| C | She teaches music. | The exam starts next week. |
| D | It is quite cheap. | She seemed cheerful today. |

El audio pregunta si pasó algo bueno al ver alegre al interlocutor. A explica la alegría con un logro; B y C no describen una buena noticia y D cambia de persona. Transcripción automática pendiente de cotejo humano.

Decisión humana: **pendiente**.

### 6. item:t1-l-m1-cr6-v1

Choose the best response to what you heard.

Clave conservada: **C**. Familia: response.

[Escuchar audio local](http://127.0.0.1:3026/audio/toefl/set-1/listening-m1-choose-6.mp3)

| Opción | Original | Propuesta |
| --- | --- | --- |
| A | It closes after the final exam. | The tutoring session lasts an hour. |
| B | I studied there yesterday. | I went there to study yesterday. |
| C | It is across from the main library. | It's across from the main library. |
| D | The tutor called this morning. | Your tutor called this morning. |

El guion pide dónde está el centro de tutorías. C da la ubicación; A da una duración, B una visita pasada y D una llamada. No se altera el audio.

Decisión humana: **pendiente**.

### 7. item:t1-l-m1-cr7-v1

Choose the best response to what you heard.

Clave conservada: **B**. Familia: response.

[Escuchar audio local](http://127.0.0.1:3026/audio/toefl/set-1/listening-m1-choose-7.mp3)

| Opción | Original | Propuesta |
| --- | --- | --- |
| A | The report I printed earlier has only three pages. | The report was printed yesterday. |
| B | I will bring a new package from the supply room. | I'll get more from the supply room. |
| C | Printing at the library costs ten cents per page. | We pay ten cents for each page. |
| D | The paper in that article was easy to read. | I finished reading that paper. |

La impresora se quedó sin papel. B ofrece reponerlo; A y C describen impresión sin resolver el problema, y D interpreta paper como un texto. La correcta puede ser la más larga en un ítem aislado.

Decisión humana: **pendiente**.

### 8. item:t1-l-m1-cr8-v1

Choose the best response to what you heard.

Clave conservada: **A**. Familia: response.

[Escuchar audio local](http://127.0.0.1:3026/audio/toefl/set-1/listening-m1-choose-8.mp3)

| Opción | Original | Propuesta |
| --- | --- | --- |
| A | Not at all. I will keep it here. | Not at all. I'll keep an eye on it. |
| B | The bag was on sale. | This bag has a pocket for my watch. |
| C | I missed the last minute. | I bought my bag at the station. |
| D | You can watch the news online. | The café closes in a few minutes. |

El guion pide cuidar una bolsa un minuto. A acepta correctamente Would you mind; B confunde watch sustantivo con el verbo, C comenta una compra y D se limita al tiempo. Revisar naturalidad y dificultad de los distractores.

Decisión humana: **pendiente**.

### 9. item:t1-l-cv1-fixed-v1

What decision is the woman trying to make?

Clave conservada: **C**. Familia: conversation.

[Escuchar audio local](http://127.0.0.1:3026/audio/toefl/set-1/conversation.mp3)

| Opción | Original | Propuesta |
| --- | --- | --- |
| A | What job to apply for | Which career to pursue after college |
| B | Whether to change universities | Which friend to ask for course advice |
| C | Which elective to take next term | Which elective to take next term |
| D | Where to live | Which presentation topic to prepare |

La decisión es entre Psychology y Public Speaking como electivas. A confunde la motivación profesional con la decisión; B confunde a quien aconseja con la elección; D confunde practicar presentaciones con escoger su tema.

Decisión humana: **pendiente**.

### 10. item:t1-l-cv2-fixed-v1

Why is the woman considering the public speaking course despite dreading it?

Clave conservada: **D**. Familia: conversation.

[Escuchar audio local](http://127.0.0.1:3026/audio/toefl/set-1/conversation.mp3)

| Opción | Original | Propuesta |
| --- | --- | --- |
| A | It has no exams. | She expects the class to require less work. |
| B | Her friend forced her to. | Her friend needs a partner for the class. |
| C | It is the easiest course. | Her preferred psychology course is full. |
| D | She will need presentation skills in almost any career and won't improve by avoiding it. | She needs presentation skills for work. |

La mujer dice que necesitará presentar en casi cualquier profesión y no mejorará evitando hacerlo. D mantiene esa motivación. A confunde ejercicios iniciales pequeños con menos trabajo total; B y C no se afirman en la conversación.

Decisión humana: **pendiente**.

### 11. item:t1-l-cv3-fixed-v1

What did the woman's friend say about the public speaking teacher?

Clave conservada: **A**. Familia: conversation.

[Escuchar audio local](http://127.0.0.1:3026/audio/toefl/set-1/conversation.mp3)

| Opción | Original | Propuesta |
| --- | --- | --- |
| A | The teacher is supportive and starts with small, low-pressure exercises. | The teacher builds up from easy exercises. |
| B | The teacher gives no feedback. | Students can opt out of speeches. |
| C | The teacher cancels classes often. | Students give a major talk first. |
| D | The teacher is very strict. | Most work is completed in writing. |

La amiga describe progresión desde ejercicios pequeños con apoyo. A conserva esa idea; B convierte apoyo en exención, C invierte el orden explícito y D sustituye práctica oral por escrita.

Decisión humana: **pendiente**.

### 12. item:t1-l-cv4-fixed-v1

What does the woman decide at the end?

Clave conservada: **B**. Familia: conversation.

[Escuchar audio local](http://127.0.0.1:3026/audio/toefl/set-1/conversation.mp3)

| Opción | Original | Propuesta |
| --- | --- | --- |
| A | To take psychology | Enroll in psychology with her friend |
| B | To sign up for public speaking | Enroll in the public speaking course |
| C | To take neither course | Postpone choosing until next term |
| D | To wait a year | Drop both electives from her schedule |

La conclusión explícita es inscribirse en Public Speaking. A usa la alternativa descartada; C desplaza el aplazamiento de Psychology a toda decisión; D niega la matrícula elegida.

Decisión humana: **pendiente**.

### 13. item:t1-l-an1-fixed-v1

What is the announcement mainly about?

Clave conservada: **C**. Familia: announcement.

[Escuchar audio local](http://127.0.0.1:3026/audio/toefl/set-1/announcement.mp3)

| Opción | Original | Propuesta |
| --- | --- | --- |
| A | A cafeteria closure | Repairs that will close the cafeteria |
| B | A new cafeteria building | Plans for an additional campus café |
| C | Changes to the cafeteria based on student feedback | Changes prompted by student feedback |
| D | A rise in food prices | Higher prices for late-night meals |

El anuncio introduce cambios derivados de una encuesta. C resume el propósito. A y B plantean obras no mencionadas; D confunde el depósito reembolsable de envases con una subida del precio de las comidas.

Decisión humana: **pendiente**.

### 14. item:t1-l-an2-fixed-v1

What change to opening hours is mentioned?

Clave conservada: **D**. Familia: announcement.

[Escuchar audio local](http://127.0.0.1:3026/audio/toefl/set-1/announcement.mp3)

| Opción | Original | Propuesta |
| --- | --- | --- |
| A | It will open only at weekends. | Weekend service will extend until nine. |
| B | Hours will not change. | Weekday breakfast will begin earlier. |
| C | The cafeteria will close earlier. | Evening meals will move to weekends. |
| D | It will stay open until 9 p.m. on weekdays. | Weekday service will continue until nine. |

El audio extiende el cierre a las nueve los días entre semana. A cambia los días; B cambia cierre por apertura; C traslada el servicio nocturno a fines de semana.

Decisión humana: **pendiente**.

### 15. item:t1-l-at1-fixed-v1

What is the main topic of the lecture?

Clave conservada: **B**. Familia: academic.

[Escuchar audio local](http://127.0.0.1:3026/audio/toefl/set-1/academic-talk.mp3)

| Opción | Original | Propuesta |
| --- | --- | --- |
| A | How to paint with purple | How ancient dyes damaged the environment |
| B | The history of the color purple and how scarcity shaped its value | How scarcity gave purple its status |
| C | The biology of sea snails | How sea snails adapted to coastal life |
| D | Roman fashion in general | How Roman rulers designed ceremonial robes |

El profesor organiza la charla en torno a escasez, valor y estatus de la púrpura. B recoge esa tesis; A añade un efecto no tratado, C toma la materia prima como tema biológico y D reduce la charla al ejemplo romano.

Decisión humana: **pendiente**.

### 16. item:t1-l-at2-fixed-v1

How was Tyrian purple dye made in the ancient world?

Clave conservada: **C**. Familia: academic.

[Escuchar audio local](http://127.0.0.1:3026/audio/toefl/set-1/academic-talk.mp3)

| Opción | Original | Propuesta |
| --- | --- | --- |
| A | From tree bark | From bark stripped off coastal trees |
| B | From flowers | From petals of Mediterranean flowers |
| C | From the mucus of certain sea snails, requiring thousands of snails for a tiny amount | From mucus produced by sea snails |
| D | From a rare mineral | From minerals ground into a powder |

La fuente descrita es el mucus de ciertos caracoles marinos: C. A, B y D son fuentes materiales alternativas no indicadas. Se elimina de C la explicación adicional de cantidades, que no es necesaria para responder cómo se obtenía.

Decisión humana: **pendiente**.

### 17. item:t1-l-at3-fixed-v1

Why did purple become a symbol of wealth and power?

Clave conservada: **D**. Familia: academic.

[Escuchar audio local](http://127.0.0.1:3026/audio/toefl/set-1/academic-talk.mp3)

| Opción | Original | Propuesta |
| --- | --- | --- |
| A | Because it was the emperor's favorite color | It marked military victories. |
| B | Because it never faded | Its pigment protected fabrics. |
| C | Because it was easy to make | Its color was favored by artisans. |
| D | Because it was extremely costly and scarce, so only the rich could afford it | Its scarcity made it costly to obtain. |

La charla atribuye el estatus a escasez y coste: D. A y C ofrecen causas sociales no indicadas y B una ventaja material no indicada. No se cambia la causalidad de la clave.

Decisión humana: **pendiente**.

### 18. item:t1-l-at4-fixed-v1

What did William Perkin accidentally create in 1856?

Clave conservada: **A**. Familia: academic.

[Escuchar audio local](http://127.0.0.1:3026/audio/toefl/set-1/academic-talk.mp3)

| Opción | Original | Propuesta |
| --- | --- | --- |
| A | The first synthetic purple dye | The first synthetic purple dye |
| B | A new type of snail | A treatment for malarial fever |
| C | A cheaper gold | A way to breed more sea snails |
| D | A cure for malaria | A method for recovering gold |

Perkin buscaba un antimalárico, pero creó accidentalmente tinte púrpura sintético: A. B es su objetivo, no el resultado; C y D reciclan detalles históricos sin ser el descubrimiento.

Decisión humana: **pendiente**.

### 19. item:t1-l-m2-cr1-v1

Choose the best response to what you heard.

Clave conservada: **D**. Familia: response.

[Escuchar audio local](http://127.0.0.1:3026/audio/toefl/set-1/listening-m2-choose-1.mp3)

| Opción | Original | Propuesta |
| --- | --- | --- |
| A | The experiment took two hours. | The experiment lasted two hours. |
| B | It is in the science building. | The lab opened at eight today. |
| C | We opened the windows. | We finish chemistry after lunch. |
| D | Until nine o’clock. | It will close at nine tonight. |

How long will the lab stay open tonight pide el límite de apertura de esta noche. D conserva Until nine o'clock. A da duración de un experimento, B una apertura pasada y C un horario de clase distinto.

Decisión humana: **pendiente**.

### 20. item:t1-l-m2-cr2-v1

Choose the best response to what you heard.

Clave conservada: **B**. Familia: response.

[Escuchar audio local](http://127.0.0.1:3026/audio/toefl/set-1/listening-m2-choose-2.mp3)

| Opción | Original | Propuesta |
| --- | --- | --- |
| A | Her presentation was clear. | Her first slide has the schedule. |
| B | The schedule was changed this morning. | They changed the order this morning. |
| C | The first chapter is short. | She was first to arrive today. |
| D | Maya studies engineering. | Her topic was changed yesterday. |

I thought Maya was presenting first expresa sorpresa por el orden. B explica el cambio; A habla del contenido de una diapositiva, C confunde llegada con turno y D cambia tema, no orden.

Decisión humana: **pendiente**.

### 21. item:t1-l-m2-cr3-v1

Choose the best response to what you heard.

Clave conservada: **C**. Familia: response.

[Escuchar audio local](http://127.0.0.1:3026/audio/toefl/set-1/listening-m2-choose-3.mp3)

| Opción | Original | Propuesta |
| --- | --- | --- |
| A | The station is underground. | The train from yesterday was late. |
| B | I bought the ticket online. | My return ticket is for tomorrow. |
| C | Good idea. Then we will avoid the rush. | Good idea; we'll avoid the rush. |
| D | The train was painted blue. | The station clock is ten minutes fast. |

Why do we not take the earlier train es una sugerencia. C la acepta y da una ventaja. A y B trasladan la conversación a otro viaje, D comenta un reloj sin responder a la propuesta.

Decisión humana: **pendiente**.

### 22. item:t1-l-m2-cr4-v1

Choose the best response to what you heard.

Clave conservada: **A**. Familia: response.

[Escuchar audio local](http://127.0.0.1:3026/audio/toefl/set-1/listening-m2-choose-4.mp3)

| Opción | Original | Propuesta |
| --- | --- | --- |
| A | Let me ask the manager what we can do. | Let me check our exchange policy. |
| B | The changing room is over there. | The receipt shows the original price. |
| C | I usually wear a medium. | The changing room is just over there. |
| D | The receipt lists two items. | This shirt was made from cotton. |

La clienta pregunta si puede cambiar una camisa sin recibo. A propone averiguar la política, conservando la función de consultar al encargado. B presupone un recibo disponible, C confunde exchange con probarse ropa y D habla del tejido.

Decisión humana: **pendiente**.

### 23. item:t1-l-m2-cr5-v1

Choose the best response to what you heard.

Clave conservada: **D**. Familia: response.

[Escuchar audio local](http://127.0.0.1:3026/audio/toefl/set-1/listening-m2-choose-5.mp3)

| Opción | Original | Propuesta |
| --- | --- | --- |
| A | The professor arrived by bus. | I wrote the lecture time in my diary. |
| B | My expectations are written down. | The example appears on the last slide. |
| C | The lecture hall has new seats. | The lecturer arrived a little early. |
| D | I thought so too, especially the final example. | Me too—the final example was fascinating. |

La persona valora la charla como más interesante de lo esperado. D comparte esa valoración; A y C son datos logísticos y B localiza un ejemplo sin valorarlo. Revisar que el eco de final example no vuelva trivial la elección.

Decisión humana: **pendiente**.

### 24. item:t1-l-m2-cr6-v1

Choose the best response to what you heard.

Clave conservada: **B**. Familia: response.

[Escuchar audio local](http://127.0.0.1:3026/audio/toefl/set-1/listening-m2-choose-6.mp3)

| Opción | Original | Propuesta |
| --- | --- | --- |
| A | The library has many books. | We studied in that room last Tuesday. |
| B | I did, but my confirmation was cancelled. | I did, but the booking was cancelled. |
| C | We studied the first chapter. | My library card expires next month. |
| D | The room has a large table. | The room was renovated last summer. |

Did you not reserve a study room pide confirmar una reserva. B responde y explica la cancelación. A habla de otra visita, C de la tarjeta y D de obras; ninguna confirma la reserva preguntada.

Decisión humana: **pendiente**.

### 25. item:t1-l-m2-cr7-v1

Choose the best response to what you heard.

Clave conservada: **A**. Familia: response.

[Escuchar audio local](http://127.0.0.1:3026/audio/toefl/set-1/listening-m2-choose-7.mp3)

| Opción | Original | Propuesta |
| --- | --- | --- |
| A | That is all right. I sent the information by email. | No problem; I emailed you the information. |
| B | The call lasted ten minutes. | I keep my phone beside the computer. |
| C | My phone is on the desk. | The call yesterday lasted ten minutes. |
| D | I missed the morning bus. | I left the meeting before it finished. |

La persona se disculpa por perder una llamada. A acepta la disculpa e indica otro canal. B informa dónde guarda el teléfono, C describe otra llamada y D confunde perder una llamada con salir de una reunión.

Decisión humana: **pendiente**.

### 26. item:t1-l-m2-cr8-v1

Choose the best response to what you heard.

Clave conservada: **C**. Familia: response.

[Escuchar audio local](http://127.0.0.1:3026/audio/toefl/set-1/listening-m2-choose-8.mp3)

| Opción | Original | Propuesta |
| --- | --- | --- |
| A | It took me an hour to complete. | Before the office closes this evening. |
| B | The form has two pages. | With your full name on the first page. |
| C | Put it in the tray beside the office door. | In the tray beside the office door. |
| D | I left campus after lunch. | After your adviser has signed it. |

El guion pregunta dónde dejar un formulario completo. C especifica lugar; A y D especifican cuándo y B cómo completarlo. Las cuatro opciones pertenecen al contexto de entrega de documentos.

Decisión humana: **pendiente**.

### 27. item:t1-l-m2-cv1-v1

Why can the student not collect the originally assigned kit now?

Clave conservada: **B**. Familia: conversation.

[Escuchar audio local](http://127.0.0.1:3026/audio/toefl/set-1/listening-m2-conversation.mp3)

| Opción | Original | Propuesta |
| --- | --- | --- |
| A | The student reserved the wrong building. | The kit was sent away for repairs. |
| B | It has not yet been returned. | Another borrower still has the kit. |
| C | The assignment deadline changed. | The student missed the collection time. |
| D | The staff member cannot find the reservation. | The reservation lacks a confirmation. |

El empleado dice que el kit asignado sigue prestado: B. El alumno necesita adelantar la recogida, no la perdió (C), y sí tiene confirmación (D); no se mencionan reparaciones (A).

Decisión humana: **pendiente**.

### 28. item:t1-l-m2-cv2-v1

What will the student obtain from a classmate?

Clave conservada: **D**. Familia: conversation.

[Escuchar audio local](http://127.0.0.1:3026/audio/toefl/set-1/listening-m2-conversation.mp3)

| Opción | Original | Propuesta |
| --- | --- | --- |
| A | A microphone | A microphone |
| B | A recorder | A recorder |
| C | A confirmation email | A carrying case |
| D | A tripod | A tripod |

El kit pequeño incluye micrófono y grabadora; el alumno conseguirá el trípode de un compañero. C propone otro accesorio no mencionado. Se evita introducir un sinónimo de tripod como distractor.

Decisión humana: **pendiente**.

### 29. item:t1-l-m2-an1-v1

Why will the pool close early?

Clave conservada: **A**. Familia: announcement.

[Escuchar audio local](http://127.0.0.1:3026/audio/toefl/set-1/listening-m2-announcement.mp3)

| Opción | Original | Propuesta |
| --- | --- | --- |
| A | Technicians need to inspect the ventilation system. | To inspect the ventilation system |
| B | A swimming competition begins tonight. | To prepare the pool for a competition |
| C | The morning schedule has changed. | To repair the equipment used in lessons |
| D | The instructors are attending a meeting. | To clean the pool before morning classes |

El anuncio atribuye el cierre temprano a una inspección de ventilación: A. B, C y D son razones operativas plausibles pero distintas de la causa indicada.

Decisión humana: **pendiente**.

### 30. item:t1-l-m2-an2-v1

What must registered beginners do to attend the rescheduled class?

Clave conservada: **C**. Familia: announcement.

[Escuchar audio local](http://127.0.0.1:3026/audio/toefl/set-1/listening-m2-announcement.mp3)

| Opción | Original | Propuesta |
| --- | --- | --- |
| A | Pay a second registration fee | Confirm attendance at the front desk. |
| B | Choose a different instructor | Choose another class on the website. |
| C | Nothing; their places will be kept. | Nothing; their places are reserved. |
| D | Arrive at seven tomorrow morning | Bring a new registration form Thursday. |

Las plazas se conservan automáticamente y no hay que reinscribirse: C. A, B y D añaden trámites no solicitados. Revisar el cambio de redacción de la correcta contra keep their places automatically.

Decisión humana: **pendiente**.

### 31. item:t1-l-m2-at1-v1

What is the talk mainly about?

Clave conservada: **B**. Familia: academic.

[Escuchar audio local](http://127.0.0.1:3026/audio/toefl/set-1/listening-m2-academic-talk.mp3)

| Opción | Original | Propuesta |
| --- | --- | --- |
| A | Why all corals live in deep water | How deep-sea corals reproduce without light |
| B | A beneficial partnership in many shallow-water corals | How a coral-algae partnership works |
| C | How coral skeletons move between reefs | How reef skeletons are formed from algae |
| D | Why algae are classified as animals | Why corals and plankton compete for sunlight |

El tema central es la asociación beneficiosa coral-alga y sus límites: B. A convierte una excepción alimentaria en reproducción, C atribuye a algas la formación del esqueleto y D inventa competencia por luz como tesis.

Decisión humana: **pendiente**.

### 32. item:t1-l-m2-at2-v1

What do the algae provide to the coral?

Clave conservada: **C**. Familia: academic.

[Escuchar audio local](http://127.0.0.1:3026/audio/toefl/set-1/listening-m2-academic-talk.mp3)

| Opción | Original | Propuesta |
| --- | --- | --- |
| A | A colder ocean current | Shelter from strong ocean currents |
| B | Protection from every disease | Compounds used during photosynthesis |
| C | Oxygen and energy-rich materials | Oxygen and energy-rich materials |
| D | A new limestone skeleton each day | Plankton and other organic particles |

Las algas aportan oxígeno y materiales energéticos: C. B invierte quién suministra compuestos, D corresponde a la dieta descrita para corales profundos y A cambia la dirección y naturaleza de la protección.

Decisión humana: **pendiente**.

### 33. item:t1-l-m2-at3-v1

Why does a bleached coral appear pale?

Clave conservada: **A**. Familia: academic.

[Escuchar audio local](http://127.0.0.1:3026/audio/toefl/set-1/listening-m2-academic-talk.mp3)

| Opción | Original | Propuesta |
| --- | --- | --- |
| A | The coral has lost much of the algae that contribute color. | It has lost the algae that give it color. |
| B | Its skeleton has dissolved completely. | The pale skeleton has dissolved away. |
| C | It has moved into deep water. | Its tissue has grown much thicker. |
| D | The algae have produced extra pigments. | Its algae have made new pale pigments. |

La pérdida de algas que contribuyen color deja visible el esqueleto claro: A. B confunde quedar visible con disolverse; C y D ofrecen cambios no descritos.

Decisión humana: **pendiente**.

### 34. item:t1-l-m2-at4-v1

Why does the professor mention deep-sea corals?

Clave conservada: **D**. Familia: academic.

[Escuchar audio local](http://127.0.0.1:3026/audio/toefl/set-1/listening-m2-academic-talk.mp3)

| Opción | Original | Propuesta |
| --- | --- | --- |
| A | To show that they receive more sunlight | To show how they adapt to warmer water |
| B | To argue that plankton causes bleaching | To link bleaching to a shortage of plankton |
| C | To explain why every coral needs algae | To explain how they use algae without light |
| D | To qualify the partnership as important but not universal | To show that the partnership has exceptions |

Los corales profundos muestran que no todos dependen de algas: D. A confunde la excepción con estrés térmico, B atribuye blanqueamiento al alimento y C contradice que viven sin esa asociación.

Decisión humana: **pendiente**.
