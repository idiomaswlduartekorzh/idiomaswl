import { createSupplementalTopic } from '../create-supplemental-topic'

export const modalDeduction = createSupplementalTopic({
  slug: 'modal-deduction-b1', order: '21', color: '#7C3AED', category: 'Modals', level: 'B1',
  title: 'Modal verbs of deduction en inglés B1', shortTitle: 'Must / Might / Can\'t', metaTitle: 'Modal verbs of deduction B1 | Must, might, can\'t',
  description: 'Usa must, might, may, could y can\'t para expresar conclusiones seguras, posibilidades e imposibilidades basadas en evidencia.',
  lead: 'No siempre afirmamos hechos: muchas veces interpretamos señales. Estos modales muestran cuánta seguridad tienes sobre una conclusión.',
  outcomes: ['Usar must para una conclusión muy probable.', 'Usar might, may o could para posibilidades.', 'Usar can\'t para conclusiones imposibles.'],
  guide: { goal: 'Expresar el grado de certeza de una deducción basada en evidencia.', model: 'The lights are on. They must be home. / He can\'t be asleep.', formula: 'subject + must/might/may/could/can\'t + base verb', decisions: ['Must = conclusión casi segura.', 'Might/may/could = posibilidad.', 'Can\'t = conclusión imposible.', 'Después del modal usa verbo base, incluido be.'], table: [['Certeza', 'Modal', 'Ejemplo'], ['alta positiva', 'must', 'She must be tired.'], ['posible', 'might/may/could', 'She might be at work.'], ['alta negativa', 'can\'t', 'She can\'t be at home.']], mistakes: ['Usar mustn\'t para imposibilidad; mustn\'t expresa prohibición.', 'Añadir to después del modal.', 'Usar is después de must: must be, no must is.'] },
  seo: [
    { heading: 'Deducción no es obligación', paragraphs: ['Must puede expresar obligación o una conclusión lógica. The door is locked; they must be out no obliga a nadie: interpreta una señal.', 'El contexto y la evidencia determinan el significado.'] },
    { heading: 'La escala de certeza', paragraphs: ['Must expresa una conclusión fuerte. Might, may y could mantienen abierta una posibilidad. Can\'t descarta una explicación.', 'Esta escala permite sonar preciso en conversaciones, informes y relatos.'], table: [['Evidencia', 'Conclusión'], ['Her coat is here.', 'She must be nearby.'], ['I am not sure.', 'She might be in a meeting.'], ['I just saw him outside.', 'He can\'t be at home.']] },
    { heading: 'La forma después del modal', paragraphs: ['Todos estos modales van seguidos de verbo base: must be, might know, could have. No llevan to ni -s.', 'Para estados usa be: It must be difficult; para acciones usa el verbo base: They might arrive later.'] },
    { heading: 'Can\'t vs mustn\'t', paragraphs: ['Can\'t be expresa imposibilidad lógica. Mustn\'t expresa prohibición: You mustn\'t park here.', 'Confundirlos cambia una conclusión por una regla.'] },
  ],
  visual: { mode: 'certainty-meter', teacherLens: 'Un medidor va de imposible a posible y casi seguro.', graphicPrompt: 'Escala can\'t → might → must.', scene: [['can\'t be', 'imposible'], ['might be', 'posible'], ['must be', 'casi seguro']], learnerModes: ['visual: medidor', 'analítico: evidencia', 'oral: hipótesis'], practiceVerbs: ['Interpreta', 'Contrasta', 'Lee', 'Produce', 'Corrige', 'Argumenta'], reviewFocus: ['evidencia', 'certeza', 'verbo base', 'mustn\'t'] },
  practice: {
    choice: [
      { scene: 'Oficina', prompt: 'The lights are on. Someone ___ be inside.', options: ['must', 'can\'t', 'mustn\'t', 'to'], answer: 'must', explain: 'La evidencia apoya una conclusión fuerte.' },
      { scene: 'Teléfono', prompt: 'Ana is not answering. She ___ be in a meeting.', options: ['might', 'mustn\'t', 'can to', 'is might'], answer: 'might', explain: 'Es una posibilidad, no una certeza.' },
      { scene: 'Viaje', prompt: 'Leo posted a photo from Bogotá this morning. He ___ be in London now.', options: ['can\'t', 'must', 'may', 'mustn\'t'], answer: 'can\'t', explain: 'La evidencia descarta la conclusión.' },
      { scene: 'Cansancio', prompt: 'She worked all night. She ___ be exhausted.', options: ['must', 'might not', 'can\'t', 'mustn\'t'], answer: 'must', explain: 'Conclusión muy probable.' },
      { scene: 'Puerta cerrada', prompt: 'They ___ know we are here; perhaps they did not hear us.', options: ['might not', 'must', 'can\'t', 'mustn\'t'], answer: 'might not', explain: 'Posibilidad negativa.' },
      { scene: 'Edad', prompt: 'That man ___ be her grandfather; he is only thirty.', options: ['can\'t', 'must', 'may', 'could'], answer: 'can\'t', explain: 'La edad lo hace imposible.' },
      { scene: 'Paquete', prompt: 'This parcel is very light. It ___ contain books.', options: ['can\'t', 'must', 'mustn\'t', 'may to'], answer: 'can\'t', explain: 'La evidencia contradice libros pesados.' },
      { scene: 'Retraso', prompt: 'The bus is late. There ___ be heavy traffic.', options: ['may', 'can\'t', 'mustn\'t', 'is may'], answer: 'may', explain: 'Explicación posible.' },
    ],
    dual: [
      { scene: 'Casa', prompt: 'Her shoes are by the door, so she [[0]] be home. But she is not downstairs; she [[1]] be in her room.', blanks: [{ options: ['must', 'can\'t', 'might not'], answer: 'must', explain: 'Evidencia fuerte.' }, { options: ['might', 'mustn\'t', 'can\'t'], answer: 'might', explain: 'Ubicación posible.' }] },
      { scene: 'Trabajo', prompt: 'He knows every detail, so he [[0]] be involved. He [[1]] be the manager, but I am not certain.', blanks: [{ options: ['must', 'can\'t', 'may not'], answer: 'must', explain: 'Conclusión fuerte.' }, { options: ['could', 'must', 'can\'t'], answer: 'could', explain: 'Posibilidad.' }] },
      { scene: 'Clima', prompt: 'The ground is dry, so it [[0]] be raining. Those dark clouds mean it [[1]] rain later.', blanks: [{ options: ['can\'t', 'must', 'may'], answer: 'can\'t', explain: 'No está lloviendo.' }, { options: ['might', 'can\'t', 'mustn\'t'], answer: 'might', explain: 'Posibilidad futura.' }] },
      { scene: 'Mensaje', prompt: 'This message [[0]] be from Ana; she does not know my number. It [[1]] be from the delivery driver.', blanks: [{ options: ['can\'t', 'must', 'may'], answer: 'can\'t', explain: 'Evidencia negativa.' }, { options: ['might', 'mustn\'t', 'can\'t'], answer: 'might', explain: 'Alternativa posible.' }] },
    ],
    guided: { scene: 'Un ruido en la oficina', text: 'The office is normally empty at night, but a light is on. Someone [[0]] be inside. It [[1]] be the cleaner, because she often works late, or it [[2]] be the manager. It [[3]] be Leo because he is abroad. The open window [[4]] explain the noise, but the footsteps are clear. Whoever is there [[5]] know the alarm code. The situation [[6]] be dangerous, so we should call security.', blanks: [
      { options: ['must', 'can\'t', 'mustn\'t'], answer: 'must', explain: 'Luz encendida: fuerte inferencia.' }, { options: ['might', 'can\'t', 'must'], answer: 'might', explain: 'Una opción.' }, { options: ['could', 'mustn\'t', 'can\'t'], answer: 'could', explain: 'Otra posibilidad.' }, { options: ['can\'t', 'must', 'may'], answer: 'can\'t', explain: 'Está fuera.' }, { options: ['might', 'must', 'can\'t'], answer: 'might', explain: 'Explicación posible.' }, { options: ['must', 'can\'t', 'may not'], answer: 'must', explain: 'Entró sin activar alarma.' }, { options: ['could', 'mustn\'t', 'can\'t'], answer: 'could', explain: 'Riesgo posible, no seguro.' },
    ] },
    free: { scene: 'Interpretando señales', text: 'The road is wet, so it [[0]] (alta certeza) have rained. The sky is clear now, so it [[1]] (imposible) be raining. The driver is late; he [[2]] (posible) be stuck in traffic. That woman looks like Ana, but she [[3]] (imposible) be Ana because Ana is in Peru. The meeting room is locked, so everyone [[4]] (alta certeza) be outside.', blanks: [
      { answer: 'must', explain: 'Conclusión fuerte.' }, { answer: 'can\'t', accepted: ['cannot'], explain: 'Imposibilidad.' }, { answer: 'might', accepted: ['may', 'could'], explain: 'Posibilidad.' }, { answer: 'can\'t', accepted: ['cannot'], explain: 'Imposibilidad.' }, { answer: 'must', explain: 'Conclusión fuerte.' },
    ] },
    write: [
      { scene: 'Evidencia', prompt: 'Concluye que alguien está en casa porque su coche está afuera.', answer: 'Her car is outside, so she must be home.', accepted: ['must be'], explain: 'Must para deducción fuerte.' },
      { scene: 'Posibilidad', prompt: 'Di que quizá el correo esté en spam.', answer: 'The email might be in the spam folder.', accepted: ['might be'], explain: 'Might expresa posibilidad.' },
      { scene: 'Imposibilidad', prompt: 'Di que no puede ser correcto porque los números no coinciden.', answer: 'It can\'t be correct because the numbers do not match.', accepted: ['can\'t be', 'cannot be'], explain: 'Can\'t para conclusión imposible.' },
      { scene: 'Corrección', prompt: 'Corrige: He must to be tired.', answer: 'He must be tired.', accepted: ['must be'], explain: 'Sin to después del modal.' },
    ],
    mission: [
      { scene: 'Foto', prompt: 'Imagina una foto y escribe una deducción con must y otra con might.', answer: 'They must be friends, and they might be celebrating a birthday.', accepted: ['must', 'might'], explain: 'Dos grados de certeza.' },
      { scene: 'Problema', prompt: 'Propón tres explicaciones usando must, might y can\'t.', answer: 'The file must be old, it might be incomplete, and it can\'t be the final version.', accepted: ['must', 'might', 'can\'t'], explain: 'Escala completa.' },
      { scene: 'Persona ausente', prompt: 'Explica dónde podría estar alguien y dónde no puede estar.', answer: 'Ana might be at the bank, but she can\'t be at home.', accepted: ['might', 'can\'t'], explain: 'Posibilidad e imposibilidad.' },
      { scene: 'Evidencia cotidiana', prompt: 'Escribe una conclusión basada en una señal real de tu entorno.', answer: 'The lights are off, so everyone must be asleep.', accepted: ['must'], explain: 'Vincula evidencia y conclusión.' },
    ],
  },
})

export const indirectQuestions = createSupplementalTopic({
  slug: 'indirect-questions-b1', order: '22', color: '#0F766E', category: 'Questions', level: 'B1',
  title: 'Indirect questions en inglés B1', shortTitle: 'Indirect questions', metaTitle: 'Indirect questions B1 | Could you tell me, Do you know',
  description: 'Formula preguntas indirectas educadas con Could you tell me, Do you know y I was wondering, sin invertir el orden dentro de la segunda parte.',
  lead: 'Could you tell me where the station is suena natural porque la pregunta interna vuelve al orden afirmativo. Esa es la decisión clave.',
  outcomes: ['Transformar preguntas directas en indirectas.', 'Mantener sujeto + verbo dentro de la cláusula indirecta.', 'Usar if o whether en preguntas de sí/no.'],
  guide: { goal: 'Hacer preguntas educadas sin conservar la inversión de la pregunta directa.', model: 'Where is the station? → Could you tell me where the station is?', formula: 'intro + question word + subject + verb | intro + if/whether + subject + verb', decisions: ['Conserva la palabra WH si existe.', 'Después de la introducción usa orden afirmativo.', 'Para yes/no usa if o whether.', 'Solo la introducción lleva signo e inversión de pregunta.'], table: [['Directa', 'Indirecta', 'Clave'], ['Where is it?', 'Do you know where it is?', 'where + subject + verb'], ['Does she work here?', 'Could you tell me if she works here?', 'if + subject + verb'], ['When does it start?', 'Do you know when it starts?', 'sin does interno']], mistakes: ['Decir Do you know where is it?', 'Mantener do/does dentro de la pregunta indirecta.', 'Olvidar if/whether en preguntas de sí/no.'] },
  seo: [
    { heading: 'Por qué cambia el orden', paragraphs: ['La introducción ya convierte toda la frase en pregunta. La cláusula interna funciona con orden afirmativo: where the station is.', 'Por eso la inversión solo aparece al principio: Could you tell me...?'] },
    { heading: 'Preguntas con WH', paragraphs: ['What, where, when, why, who y how se conservan. Después viene el sujeto y luego el verbo.', 'When does the class start? se transforma en Do you know when the class starts?'], table: [['Directa', 'Indirecta'], ['What time is it?', 'Could you tell me what time it is?'], ['Why did he leave?', 'Do you know why he left?'], ['How much does it cost?', 'Can you tell me how much it costs?']] },
    { heading: 'Preguntas de sí o no', paragraphs: ['Si la pregunta directa no tiene palabra WH, añade if o whether: Is the shop open? → Do you know if the shop is open?', 'Whether suena algo más formal; if es muy frecuente en conversación.'] },
    { heading: 'Introducciones útiles', paragraphs: ['Could you tell me...? es cortés y directo. Do you know...? pregunta por conocimiento. I was wondering... suaviza aún más la petición.', 'La puntuación depende de la introducción: I was wondering where he is. suele terminar en punto.'] },
  ],
  visual: { mode: 'word-order', teacherLens: 'La puerta es la introducción; detrás de ella la oración recupera el orden sujeto + verbo.', graphicPrompt: 'Direct question → polite opener → statement order.', scene: [['Where is it?', 'where it is'], ['When does it start?', 'when it starts'], ['Is it open?', 'if it is open']], learnerModes: ['visual: orden', 'analítico: WH o yes/no', 'oral: cortesía'], practiceVerbs: ['Transforma', 'Ordena', 'Lee', 'Produce', 'Corrige', 'Pregunta'], reviewFocus: ['introducción', 'WH', 'orden', 'if/whether'] },
  practice: {
    choice: [
      { scene: 'Estación', prompt: 'Could you tell me where ___?', options: ['the station is', 'is the station', 'does the station be', 'the station'], answer: 'the station is', explain: 'Orden afirmativo dentro de la pregunta.' },
      { scene: 'Horario', prompt: 'Do you know when the class ___?', options: ['starts', 'does start', 'start does', 'is start'], answer: 'starts', explain: 'Se elimina does; tercera persona starts.' },
      { scene: 'Tienda', prompt: 'Can you tell me ___ the shop is open?', options: ['if', 'what', 'does', 'where is'], answer: 'if', explain: 'Pregunta de sí/no: if.' },
      { scene: 'Precio', prompt: 'I was wondering how much it ___.', options: ['costs', 'does cost', 'cost', 'is cost'], answer: 'costs', explain: 'Orden afirmativo y tercera persona.' },
      { scene: 'Razón', prompt: 'Do you know why Ana ___ early?', options: ['left', 'did leave', 'leave did', 'leaved'], answer: 'left', explain: 'Sin did interno.' },
      { scene: 'Disponibilidad', prompt: 'Could you tell me whether you ___ available tomorrow?', options: ['are', 'do', 'is', 'be'], answer: 'are', explain: 'Whether + sujeto + verbo.' },
      { scene: 'Dirección', prompt: 'Do you know how I can ___ there?', options: ['get', 'to get', 'got', 'getting'], answer: 'get', explain: 'Después de can: verbo base.' },
      { scene: 'Persona', prompt: 'Can you tell me who ___ this document?', options: ['signed', 'did sign', 'sign did', 'was sign'], answer: 'signed', explain: 'Who es sujeto; no necesita did.' },
    ],
    dual: [
      { scene: 'Hotel', prompt: 'Could you tell me [[0]] breakfast starts and [[1]] it is included?', blanks: [{ options: ['when', 'when does', 'what time does'], answer: 'when', explain: 'WH conservada.' }, { options: ['if', 'does', 'that'], answer: 'if', explain: 'Pregunta yes/no.' }] },
      { scene: 'Curso', prompt: 'Do you know [[0]] the teacher is and how long the lesson [[1]]?', blanks: [{ options: ['who', 'who is', 'is who'], answer: 'who', explain: 'Who + subject/verbo.' }, { options: ['lasts', 'does last', 'last'], answer: 'lasts', explain: 'Orden afirmativo.' }] },
      { scene: 'Aeropuerto', prompt: 'Can you tell me [[0]] gate we need and whether the flight [[1]] delayed?', blanks: [{ options: ['which', 'does which', 'which does'], answer: 'which', explain: 'Which conserva el sustantivo gate.' }, { options: ['is', 'does', 'be'], answer: 'is', explain: 'Whether the flight is...' }] },
      { scene: 'Trabajo', prompt: 'I was wondering [[0]] the interview will be online and who I [[1]] contact.', blanks: [{ options: ['if', 'does', 'what'], answer: 'if', explain: 'Yes/no.' }, { options: ['should', 'do', 'am'], answer: 'should', explain: 'Orden sujeto + modal.' }] },
    ],
    guided: { scene: 'Llamando a una academia', text: 'Could you tell me [[0]] the next course starts? I would also like to know how much it [[1]]. Do you know [[2]] classes are online or in person? Could you explain what materials I [[3]]? I was wondering how many students there [[4]] in each group. Can you tell me who the teacher [[5]] and whether I [[6]] take a placement test?', blanks: [
      { options: ['when', 'when does', 'does when'], answer: 'when', explain: 'WH.' }, { options: ['costs', 'does cost', 'cost'], answer: 'costs', explain: 'Orden afirmativo.' }, { options: ['if', 'do', 'what'], answer: 'if', explain: 'Yes/no.' }, { options: ['need', 'do need', 'needs'], answer: 'need', explain: 'I need.' }, { options: ['are', 'do', 'is'], answer: 'are', explain: 'There are.' }, { options: ['is', 'does', 'be'], answer: 'is', explain: 'Who the teacher is.' }, { options: ['have to', 'do have to', 'must to'], answer: 'have to', explain: 'Whether I have to...' },
    ] },
    free: { scene: 'Información de viaje', text: 'Could you tell me where the bus [[0]] (stop)? Do you know how much a ticket [[1]] (cost)? I would like to know if I [[2]] (can) pay by card. Can you tell me when the last bus [[3]] (leave) and whether it [[4]] (go) to the airport?', blanks: [
      { answer: 'stops', explain: 'The bus stops.' }, { answer: 'costs', explain: 'A ticket costs.' }, { answer: 'can', explain: 'If I can.' }, { answer: 'leaves', explain: 'The last bus leaves.' }, { answer: 'goes', explain: 'It goes.' },
    ] },
    write: [
      { scene: 'Transformación', prompt: 'Transforma: Where is the bank? Usa Could you tell me.', answer: 'Could you tell me where the bank is?', accepted: ['where the bank is'], explain: 'Orden afirmativo.' },
      { scene: 'Yes/no', prompt: 'Transforma: Is the café open? Usa Do you know.', answer: 'Do you know if the café is open?', accepted: ['if the café is open', 'if the cafe is open'], explain: 'If para pregunta yes/no.' },
      { scene: 'Pasado', prompt: 'Transforma: Why did she leave? Usa Do you know.', answer: 'Do you know why she left?', accepted: ['why she left'], explain: 'Se elimina did.' },
      { scene: 'Corrección', prompt: 'Corrige: Can you tell me where is the station?', answer: 'Can you tell me where the station is?', accepted: ['where the station is'], explain: 'Sujeto antes del verbo.' },
    ],
    mission: [
      { scene: 'Hotel', prompt: 'Escribe tres preguntas indirectas para recepción.', answer: 'Could you tell me when breakfast starts, if Wi-Fi is included, and where the lift is?', accepted: ['could you tell me', 'if'], explain: 'Combina WH y yes/no.' },
      { scene: 'Entrevista', prompt: 'Pregunta educadamente por horario y salario.', answer: 'Could you tell me what the working hours are and how much the position pays?', accepted: ['could you tell me'], explain: 'Preguntas sensibles con cortesía.' },
      { scene: 'Curso', prompt: 'Pregunta si hay cupos y cuándo empieza el curso.', answer: 'Do you know if there are places available and when the course starts?', accepted: ['if', 'when'], explain: 'Dos cláusulas indirectas.' },
      { scene: 'Tu vida', prompt: 'Escribe una pregunta indirecta que podrías usar hoy.', answer: 'Could you tell me how I can get to the city centre?', accepted: ['could you tell me'], explain: 'Producción auténtica.' },
    ],
  },
})

export const thirdConditional = createSupplementalTopic({
  slug: 'third-conditional-b1', order: '23', color: '#B91C1C', category: 'Conditionals', level: 'B1',
  title: 'Third conditional en inglés B1', shortTitle: 'Third conditional', metaTitle: 'Third conditional B1 | If I had known, I would have',
  description: 'Construye third conditionals para imaginar un pasado diferente, expresar arrepentimientos y analizar consecuencias que ya no pueden cambiarse.',
  lead: 'El third conditional mira hacia atrás: cambia una condición pasada imaginaria y calcula un resultado alternativo que ya no ocurrió.',
  outcomes: ['Formar if + past perfect.', 'Formar would have + past participle.', 'Usar el patrón para arrepentimientos y análisis de decisiones.'],
  guide: { goal: 'Imaginar cómo habría cambiado un resultado si el pasado hubiera sido diferente.', model: 'If I had known, I would have called.', formula: 'If + subject + had + participle | subject + would have + participle', decisions: ['La cláusula if usa past perfect.', 'El resultado usa would have + participio.', 'La condición es irreal porque el pasado ya terminó.', 'Podrías usar could have o might have para capacidad o posibilidad.'], table: [['Parte', 'Forma', 'Ejemplo'], ['condición', 'if + had + participle', 'If we had left earlier'], ['resultado', 'would have + participle', 'we would have arrived on time'], ['realidad', 'pasado opuesto', 'We left late and arrived late.']], mistakes: ['Usar would en la cláusula if.', 'Usar pasado simple en lugar de had + participio.', 'Decir would have went en vez de would have gone.'] },
  seo: [
    { heading: 'Qué expresa el third conditional', paragraphs: ['El third conditional imagina una condición pasada que no ocurrió y su consecuencia alternativa. If I had studied, I would have passed implica que no estudié y no aprobé.', 'Se usa para reflexión, arrepentimiento, crítica y análisis de decisiones.'] },
    { heading: 'Las dos mitades de la estructura', paragraphs: ['La condición usa past perfect: had + participio. El resultado usa would have + participio.', 'Las cláusulas pueden cambiar de orden sin cambiar el sentido; la coma se usa normalmente cuando la cláusula if va primero.'], table: [['If primero', 'Resultado primero'], ['If I had seen you, I would have stopped.', 'I would have stopped if I had seen you.'], ['If they had asked, we could have helped.', 'We could have helped if they had asked.']] },
    { heading: 'Would, could y might have', paragraphs: ['Would have presenta el resultado esperado. Could have expresa capacidad u oportunidad. Might have mantiene la consecuencia como posibilidad.', 'Estos matices permiten evitar afirmar con demasiada seguridad un pasado hipotético.'] },
    { heading: 'Participios irregulares', paragraphs: ['La precisión depende de participios como gone, seen, known, taken y written. Después de had y would have nunca uses el pasado simple.', 'If I had went y would have saw son errores frecuentes; las formas correctas son had gone y would have seen.'] },
  ],
  visual: { mode: 'alternate-past', teacherLens: 'Dos líneas del tiempo: lo que ocurrió y la ruta alternativa que ya no puede activarse.', graphicPrompt: 'Past fact vs unreal alternative with a branching timeline.', scene: [['We left late', 'realidad'], ['If we had left early', 'pasado alternativo'], ['we would have arrived', 'resultado imaginario']], learnerModes: ['visual: bifurcación', 'analítico: dos participios', 'oral: reflexión'], practiceVerbs: ['Reconoce', 'Construye', 'Lee', 'Produce', 'Corrige', 'Reflexiona'], reviewFocus: ['past perfect', 'would have', 'participio', 'realidad opuesta'] },
  practice: {
    choice: [
      { scene: 'Examen', prompt: 'If I ___ more, I would have passed.', options: ['had studied', 'studied', 'would study', 'have studied'], answer: 'had studied', explain: 'If + past perfect.' },
      { scene: 'Tráfico', prompt: 'We would have arrived on time if we ___ earlier.', options: ['had left', 'left', 'would leave', 'have left'], answer: 'had left', explain: 'Condición pasada irreal.' },
      { scene: 'Llamada', prompt: 'If she had known, she ___ you.', options: ['would have called', 'would call', 'had called', 'called'], answer: 'would have called', explain: 'Resultado: would have + participio.' },
      { scene: 'Ayuda', prompt: 'I could have helped if you ___.', options: ['had asked', 'asked', 'would ask', 'have asked'], answer: 'had asked', explain: 'Past perfect en if.' },
      { scene: 'Vuelo', prompt: 'If they had taken a taxi, they ___ the flight.', options: ['would not have missed', 'did not miss', 'would not miss', 'had not missed'], answer: 'would not have missed', explain: 'Resultado alternativo negativo.' },
      { scene: 'Clima', prompt: 'We might have gone out if it ___.', options: ['had not rained', 'did not rain', 'would not rain', 'has not rained'], answer: 'had not rained', explain: 'Condición pasada negativa.' },
      { scene: 'Información', prompt: 'If I ___ the address, I would have visited.', options: ['had known', 'knew', 'would know', 'have known'], answer: 'had known', explain: 'Know → known en past perfect.' },
      { scene: 'Error', prompt: 'She would have seen the sign if she ___.', options: ['had looked', 'looked', 'would have looked', 'has looked'], answer: 'had looked', explain: 'If + had looked.' },
    ],
    dual: [
      { scene: 'Reserva', prompt: 'If we [[0]] earlier, we [[1]] a better room.', blanks: [{ options: ['had booked', 'booked', 'would book'], answer: 'had booked', explain: 'Condición.' }, { options: ['would have found', 'would find', 'had found'], answer: 'would have found', explain: 'Resultado.' }] },
      { scene: 'Mensaje', prompt: 'She [[0]] the meeting if she [[1]] the email.', blanks: [{ options: ['would not have missed', 'did not miss', 'had not missed'], answer: 'would not have missed', explain: 'Resultado alternativo.' }, { options: ['had read', 'read', 'would read'], answer: 'had read', explain: 'Condición pasada.' }] },
      { scene: 'Dinero', prompt: 'If I [[0]] about the fee, I [[1]] more money.', blanks: [{ options: ['had known', 'knew', 'would know'], answer: 'had known', explain: 'Had known.' }, { options: ['would have brought', 'would bring', 'had brought'], answer: 'would have brought', explain: 'Would have brought.' }] },
      { scene: 'Trabajo', prompt: 'They [[0]] the deadline if the system [[1]].', blanks: [{ options: ['could have met', 'could meet', 'had met'], answer: 'could have met', explain: 'Capacidad alternativa.' }, { options: ['had not failed', 'did not fail', 'would not fail'], answer: 'had not failed', explain: 'Condición pasada.' }] },
    ],
    guided: { scene: 'Un viaje complicado', text: 'If we [[0]] (check) the weather, we would have packed differently. We [[1]] (bring) warmer clothes if we had known about the storm. If the train [[2]] (not/be) delayed, we [[3]] (catch) the last bus. We might have found the hotel faster if I [[4]] (download) the map. If we [[5]] (plan) better, the first night would have been easier, but we [[6]] (not/meet) the helpful family at the station.', blanks: [
      { options: ['had checked', 'checked', 'would check'], answer: 'had checked', explain: 'Condición.' }, { options: ['would have brought', 'brought', 'had brought'], answer: 'would have brought', explain: 'Resultado.' }, { options: ['had not been', 'was not', 'would not be'], answer: 'had not been', explain: 'Past perfect negativo.' }, { options: ['would have caught', 'caught', 'had caught'], answer: 'would have caught', explain: 'Resultado.' }, { options: ['had downloaded', 'downloaded', 'would download'], answer: 'had downloaded', explain: 'Condición.' }, { options: ['had planned', 'planned', 'would plan'], answer: 'had planned', explain: 'Condición.' }, { options: ['would not have met', 'did not meet', 'had not met'], answer: 'would not have met', explain: 'Consecuencia alternativa.' },
    ] },
    free: { scene: 'Proyecto retrasado', text: 'If the team [[0]] (start) earlier, we [[1]] (finish) on time. We could have avoided the error if someone [[2]] (review) the data. If I [[3]] (know) about the problem, I [[4]] (ask) for help.', blanks: [
      { answer: 'had started', explain: 'Past perfect.' }, { answer: 'would have finished', accepted: ["would've finished"], explain: 'Resultado.' }, { answer: 'had reviewed', explain: 'Past perfect.' }, { answer: 'had known', explain: 'Know → known.' }, { answer: 'would have asked', accepted: ["would've asked"], explain: 'Resultado.' },
    ] },
    write: [
      { scene: 'Une ideas', prompt: 'Une: I did not see the message. I did not reply.', answer: 'If I had seen the message, I would have replied.', accepted: ['had seen', 'would have replied'], explain: 'Invierte ambos hechos pasados.' },
      { scene: 'Corrección', prompt: 'Corrige: If I would have known, I would have called.', answer: 'If I had known, I would have called.', accepted: ['if i had known'], explain: 'No would en la cláusula if.' },
      { scene: 'Oportunidad', prompt: 'Di que habrías ayudado si te lo hubieran pedido.', answer: 'I would have helped if they had asked me.', accepted: ['would have helped', 'had asked'], explain: 'Resultado + condición.' },
      { scene: 'Posibilidad', prompt: 'Usa might have para una consecuencia alternativa.', answer: 'If we had left earlier, we might have avoided the traffic.', accepted: ['might have'], explain: 'Consecuencia posible.' },
    ],
    mission: [
      { scene: 'Decisión', prompt: 'Reflexiona sobre una decisión pasada con third conditional.', answer: 'If I had compared the options, I would have chosen a different course.', accepted: ['if i had', 'would have'], explain: 'Pasado alternativo completo.' },
      { scene: 'Trabajo', prompt: 'Explica cómo un proyecto habría cambiado con mejor planificación.', answer: 'If we had planned the schedule, we would have finished earlier.', accepted: ['had planned', 'would have finished'], explain: 'Causa y resultado alternativos.' },
      { scene: 'Consejo retrospectivo', prompt: 'Escribe una frase con could have.', answer: 'If you had called me, I could have given you the address.', accepted: ['could have'], explain: 'Capacidad pasada alternativa.' },
      { scene: 'Historia', prompt: 'Escribe dos third conditionals conectados sobre un viaje.', answer: 'If we had checked the map, we would not have got lost. If we had arrived earlier, we might have seen the sunset.', accepted: ['had checked', 'would not have', 'might have'], explain: 'Dos rutas alternativas.' },
    ],
  },
})
