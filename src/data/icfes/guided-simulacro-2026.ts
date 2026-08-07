import { ICFES_PRACTICE_QUESTIONS, type IcfesPracticeQuestion } from './questions';
import type { IcfesOfficialPart } from './parts';

type Seed = {
  part: IcfesOfficialPart;
  id: string;
  stimulus: string;
  prompt: string;
  correct: string;
  distractors: [string, string, string];
  evidence: string;
  explanation: string;
  lesson: string;
};

const PART_META: Record<IcfesOfficialPart, Pick<IcfesPracticeQuestion, 'skill' | 'type' | 'targetSeconds' | 'reinforcement'>> = {
  1: { skill: 'vocabulary_basic', type: 'word-match', targetSeconds: 28, reinforcement: { label: 'Reforzar vocabulario', href: '/practica/icfes-saber-11/vocabulario' } },
  2: { skill: 'functional_texts', type: 'notice', targetSeconds: 32, reinforcement: { label: 'Practicar avisos', href: '/practica/icfes-saber-11/parte-2' } },
  3: { skill: 'dialogue_completion', type: 'dialogue', targetSeconds: 32, reinforcement: { label: 'Practicar conversaciones', href: '/practica/icfes-saber-11/parte-3' } },
  4: { skill: 'grammar_recognition', type: 'grammar-cloze', targetSeconds: 42, reinforcement: { label: 'Reforzar gramática', href: '/practica/icfes-saber-11/gramatica-conjunciones' } },
  5: { skill: 'literal_reading', type: 'reading', targetSeconds: 58, reinforcement: { label: 'Practicar lectura literal', href: '/practica/icfes-saber-11/parte-5' } },
  6: { skill: 'inferential_reading', type: 'reading', targetSeconds: 72, reinforcement: { label: 'Reforzar inferencia', href: '/practica/icfes-saber-11/sinonimos-inferencia' } },
  7: { skill: 'vocabulary_context', type: 'lexical-cloze', targetSeconds: 48, reinforcement: { label: 'Reforzar cloze', href: '/practica/icfes-saber-11/parte-7' } },
};

const EXTRA_SEEDS: Seed[] = [
  { part: 1, id: 'p1-health-002', stimulus: 'Health and care · clinic, nurse, pharmacy, dentist, bandage', prompt: 'You put this over a small cut to protect it.', correct: 'bandage', distractors: ['clinic', 'nurse', 'pharmacy'], evidence: 'put this over a small cut', explanation: 'Bandage es el objeto que cubre y protege una herida pequeña.', lesson: 'La estructura put this over pide un objeto, no una persona o lugar.' },
  { part: 1, id: 'p1-travel-002', stimulus: 'Travel · luggage, passport, platform, ticket, suitcase', prompt: 'This document proves who you are when you travel abroad.', correct: 'passport', distractors: ['platform', 'ticket', 'suitcase'], evidence: 'document ... travel abroad', explanation: 'Passport es el documento de identidad usado para viajes internacionales.', lesson: 'Clasifica primero: document elimina lugares y objetos de equipaje.' },
  { part: 1, id: 'p1-home-002', stimulus: 'At home · ceiling, drawer, fence, pillow, shelf', prompt: 'You rest your head on this when you sleep.', correct: 'pillow', distractors: ['drawer', 'fence', 'shelf'], evidence: 'rest your head ... sleep', explanation: 'Pillow es la almohada sobre la que apoyas la cabeza al dormir.', lesson: 'Dos pistas concretas juntas suelen ser más decisivas que una traducción aislada.' },

  { part: 2, id: 'p2-library-004', stimulus: 'PLEASE RETURN BOOKS HERE AFTER USE', prompt: 'Where would you most likely see this notice?', correct: 'In a library', distractors: ['At a bakery', 'In a gym', 'At a bus stop'], evidence: 'RETURN BOOKS', explanation: 'La acción de devolver libros identifica una biblioteca.', lesson: 'Une el objeto con la acción característica del lugar.' },
  { part: 2, id: 'p2-lab-005', stimulus: 'SAFETY GLASSES MUST BE WORN BEYOND THIS POINT', prompt: 'What is the notice telling people to do?', correct: 'Protect their eyes', distractors: ['Read more clearly', 'Turn off the lights', 'Leave their bags outside'], evidence: 'SAFETY GLASSES MUST BE WORN', explanation: 'El aviso obliga a usar gafas de seguridad para proteger los ojos.', lesson: 'Must be worn expresa obligación, no sugerencia.' },
  { part: 2, id: 'p2-pool-006', stimulus: 'CHILDREN UNDER 12 MUST BE WITH AN ADULT', prompt: 'Who is this notice mainly for?', correct: 'Young swimmers and their caregivers', distractors: ['Pool employees only', 'Professional athletes', 'People buying food'], evidence: 'CHILDREN UNDER 12 ... ADULT', explanation: 'La restricción se dirige a menores de 12 años y a los adultos responsables.', lesson: 'La audiencia puede incluir a quien debe cumplir y a quien debe supervisar.' },

  { part: 3, id: 'p3-invitation-004', stimulus: 'A: Would you like to join us for lunch?\nB: ___', prompt: 'Choose the best response.', correct: "I'd love to. What time?", distractors: ["It tasted good.", 'For two hours.', 'At the restaurant.'], evidence: 'Would you like to join us', explanation: 'La pregunta es una invitación; aceptar y pedir la hora mantiene la conversación.', lesson: 'Primero etiqueta la función: invitación, opinión, noticia o solicitud.' },
  { part: 3, id: 'p3-apology-005', stimulus: "A: I'm sorry I forgot your notebook.\nB: ___", prompt: 'Choose the most natural response.', correct: "That's all right. Bring it tomorrow.", distractors: ['Yes, I forgot it.', 'It is on the table.', 'No, I do not write.'], evidence: "I'm sorry", explanation: 'La respuesta reconoce la disculpa y propone una solución coherente.', lesson: 'Una disculpa suele recibir aceptación, consecuencia o solución.' },
  { part: 3, id: 'p3-direction-006', stimulus: 'A: Excuse me, how do I get to the science building?\nB: ___', prompt: 'Choose the best response.', correct: 'Go straight and turn left after the cafeteria.', distractors: ['It opened last year.', 'I study science twice a week.', 'Yes, the building is large.'], evidence: 'how do I get to', explanation: 'How do I get to pide instrucciones para llegar a un lugar.', lesson: 'La forma de la pregunta predice el tipo de respuesta antes de leer opciones.' },

  { part: 4, id: 'p4-present-perfect-004', stimulus: 'Our school ___ a recycling program since 2024.', prompt: 'Choose the correct option.', correct: 'has had', distractors: ['had', 'is having', 'have'], evidence: 'since 2024', explanation: 'Since conecta un inicio pasado con una situación vigente; corresponde present perfect.', lesson: 'Since + punto inicial suele activar have/has + participio.' },
  { part: 4, id: 'p4-comparative-005', stimulus: 'The new route is ___ than the old one, so students arrive earlier.', prompt: 'Choose the correct option.', correct: 'shorter', distractors: ['shortest', 'more short', 'short'], evidence: 'than the old one', explanation: 'Than señala una comparación entre dos rutas; short forma shorter.', lesson: 'Adjetivos cortos suelen formar comparativo con -er.' },
  { part: 4, id: 'p4-pronoun-006', stimulus: 'Maya found the keys and gave ___ to the receptionist.', prompt: 'Choose the correct option.', correct: 'them', distractors: ['they', 'their', 'it'], evidence: 'the keys ... gave', explanation: 'Keys es plural y funciona como objeto después de gave: them.', lesson: 'Comprueba número y función: sujeto they, objeto them, posesivo their.' },
  { part: 4, id: 'p4-modal-007', stimulus: 'Visitors ___ touch the paintings because the oils on their hands can damage them.', prompt: 'Choose the correct option.', correct: "mustn't", distractors: ['could', 'may', 'would'], evidence: 'can damage them', explanation: 'El riesgo de daño justifica una prohibición: must not.', lesson: 'Relaciona el modal con intención: obligación, permiso, posibilidad o prohibición.' },
  { part: 4, id: 'p4-passive-008', stimulus: 'The prizes ___ at the end of the ceremony yesterday.', prompt: 'Choose the correct option.', correct: 'were given', distractors: ['gave', 'are giving', 'was given'], evidence: 'prizes ... yesterday', explanation: 'Prizes recibe la acción, es plural y el evento ocurrió ayer: were given.', lesson: 'Pasiva = be concordado + participio; identifica quién recibe la acción.' },
  { part: 4, id: 'p4-first-conditional-009', stimulus: 'If the weather improves, we ___ the activity outside.', prompt: 'Choose the correct option.', correct: 'will hold', distractors: ['held', 'would hold', 'holding'], evidence: 'If ... improves', explanation: 'La condición futura posible usa presente en if y will en el resultado.', lesson: 'First conditional: if + presente, will + verbo base.' },
  { part: 4, id: 'p4-quantifier-010', stimulus: 'There are only ___ chairs left, so please arrive early.', prompt: 'Choose the correct option.', correct: 'a few', distractors: ['a little', 'much', 'any'], evidence: 'chairs', explanation: 'Chairs es contable plural; a few expresa una cantidad pequeña disponible.', lesson: 'Few acompaña contables; little acompaña incontables.' },

  { part: 5, id: 'p5-detail-004', stimulus: 'The art club meets on Tuesdays in Room 14. New members should bring a pencil, but paper and paint are provided.', prompt: 'What should new members bring?', correct: 'A pencil', distractors: ['Paint', 'Paper', 'A membership card'], evidence: 'should bring a pencil', explanation: 'El texto dice explícitamente qué deben llevar los nuevos miembros.', lesson: 'No elijas objetos verdaderos del texto si cumplen otra función.' },
  { part: 5, id: 'p5-reason-005', stimulus: 'Leo takes the earlier bus on Fridays because traffic near the stadium becomes heavy before evening games.', prompt: 'Why does Leo take an earlier bus on Fridays?', correct: 'To avoid heavy traffic', distractors: ['To attend a morning game', 'To meet the bus driver', 'To visit the stadium'], evidence: 'because traffic ... becomes heavy', explanation: 'Because introduce de forma directa la razón del cambio de horario.', lesson: 'Transforma la causa explícita en una paráfrasis breve.' },
  { part: 5, id: 'p5-sequence-006', stimulus: 'To borrow a camera, students complete an online form. A teacher then approves the request, and the equipment office sends a collection time.', prompt: 'What happens after a student completes the form?', correct: 'A teacher approves the request', distractors: ['The camera is returned', 'The office closes', 'The student buys equipment'], evidence: 'then approves the request', explanation: 'Then marca el paso inmediatamente posterior al formulario.', lesson: 'Los conectores de secuencia convierten el texto en una línea de tiempo.' },
  { part: 5, id: 'p5-paraphrase-007', stimulus: 'The café stopped offering plastic straws in May. Customers can ask for a paper straw, although most cold drinks now come with reusable lids.', prompt: 'What changed at the café in May?', correct: 'Plastic straws were no longer available', distractors: ['All cold drinks were removed', 'Customers had to bring cups', 'Paper lids became mandatory'], evidence: 'stopped offering plastic straws', explanation: 'Stopped offering se parafrasea como were no longer available.', lesson: 'La correcta suele cambiar las palabras sin cambiar el hecho.' },
  { part: 5, id: 'p5-location-008', stimulus: 'The workshop begins in the main hall. After the introduction, Group A stays there while Group B moves upstairs to the computer room.', prompt: 'Where does Group A work after the introduction?', correct: 'In the main hall', distractors: ['In the computer room', 'Upstairs', 'Outside the building'], evidence: 'Group A stays there', explanation: 'There retoma main hall; Group B es quien cambia de lugar.', lesson: 'Resuelve pronombres y adverbios de referencia antes de responder.' },
  { part: 5, id: 'p5-time-009', stimulus: 'Applications received before June 10 will be reviewed that month. Later applications will be considered in August.', prompt: 'When will an application sent on June 8 be reviewed?', correct: 'In June', distractors: ['In August', 'Before June 8', 'The following year'], evidence: 'before June 10 ... that month', explanation: 'June 8 cae antes del límite y that month refiere a junio.', lesson: 'Compara la fecha dada con el límite exacto, no solo con meses mencionados.' },

  { part: 6, id: 'p6-purpose-004', stimulus: 'Our river walk is popular, but litter has increased along its busiest section. Adding bins alone will not help unless visitors understand why their choices matter. The new signs should therefore explain how waste reaches the river.', prompt: 'What does the author recommend?', correct: 'Using signs to connect littering with river damage', distractors: ['Closing the entire river walk', 'Removing all bins', 'Making the path less popular'], evidence: 'signs should therefore explain how waste reaches the river', explanation: 'La recomendación combina señalización con explicación de consecuencias.', lesson: 'Distingue el problema, las opciones descartadas y la propuesta final.' },
  { part: 6, id: 'p6-inference-005', stimulus: 'At first, the school podcast had only one host and irregular episodes. After students created a calendar and divided research, recording, and editing roles, a new episode appeared every Friday.', prompt: 'What most likely improved the podcast?', correct: 'A clearer organization of the work', distractors: ['More expensive microphones', 'A shorter school week', 'Fewer student listeners'], evidence: 'created a calendar and divided ... roles', explanation: 'El calendario y la división de roles representan mejor organización y coinciden con la regularidad.', lesson: 'La inferencia debe explicar el cambio con evidencia mencionada.' },
  { part: 6, id: 'p6-tone-006', stimulus: 'The community garden is small and cannot supply every family. Even so, it has turned an unused corner into a meeting place where neighbors exchange seeds, recipes, and advice.', prompt: "How does the author view the garden?", correct: 'As limited but valuable', distractors: ['As a complete solution to food access', 'As an unsuccessful use of space', 'As harmful to neighbors'], evidence: 'small ... Even so ... meeting place', explanation: 'El autor reconoce el límite y después enfatiza su valor comunitario.', lesson: 'Conectores como even so revelan la postura que domina al final.' },

  { part: 7, id: 'p7-collocation-004', stimulus: 'Before making a decision, the committee will ___ the results of the student survey.', prompt: 'Choose the best word.', correct: 'consider', distractors: ['attend', 'borrow', 'perform'], evidence: 'results ... before making a decision', explanation: 'Consider the results significa analizarlos antes de decidir.', lesson: 'Comprueba qué verbo forma una combinación natural con el sustantivo.' },
  { part: 7, id: 'p7-preposition-005', stimulus: 'The campaign encourages residents to travel ___ bicycle whenever possible.', prompt: 'Choose the best word.', correct: 'by', distractors: ['at', 'for', 'with'], evidence: 'travel ... bicycle', explanation: 'By bicycle es la expresión fija para indicar medio de transporte.', lesson: 'Aprende preposiciones dentro de bloques: by bus, by bike, on foot.' },
  { part: 7, id: 'p7-context-006', stimulus: 'The path becomes slippery after rain, so walkers are advised to move ___ near the bridge.', prompt: 'Choose the best word.', correct: 'carefully', distractors: ['recently', 'nearly', 'widely'], evidence: 'slippery ... advised', explanation: 'Carefully describe cómo deben moverse ante el riesgo de resbalar.', lesson: 'Predice primero el significado necesario y luego la categoría gramatical.' },
  { part: 7, id: 'p7-reference-007', stimulus: 'Ana labeled every box before the move. This made ___ easier to find the kitchen supplies first.', prompt: 'Choose the best word.', correct: 'it', distractors: ['them', 'its', 'itself'], evidence: 'made ... easier to find', explanation: 'La estructura fija make it easier necesita el pronombre it.', lesson: 'Algunas respuestas dependen de una estructura completa, no de una sola palabra vecina.' },
  { part: 7, id: 'p7-connector-008', stimulus: 'The first experiment failed. ___, the team used its results to improve the next design.', prompt: 'Choose the best connector.', correct: 'Nevertheless', distractors: ['For instance', 'Because', 'Similarly'], evidence: 'failed ... used its results to improve', explanation: 'Nevertheless introduce un resultado positivo a pesar del fracaso.', lesson: 'Nombra la relación lógica antes de mirar conectores.' },
  { part: 7, id: 'p7-wordform-009', stimulus: 'Clear instructions are ___ for volunteers who are joining the event for the first time.', prompt: 'Choose the best word.', correct: 'helpful', distractors: ['help', 'helpfully', 'helped'], evidence: 'are ... for volunteers', explanation: 'Después de are se necesita un adjetivo que describa instructions: helpful.', lesson: 'Usa la posición para decidir si falta sustantivo, verbo, adjetivo o adverbio.' },
  { part: 7, id: 'p7-phrasal-010', stimulus: 'Please ___ the registration form and send it before Friday.', prompt: 'Choose the best option.', correct: 'fill out', distractors: ['turn over', 'look after', 'give away'], evidence: 'registration form ... send it', explanation: 'Fill out a form significa completar sus datos.', lesson: 'Estudia los phrasal verbs con su objeto habitual.' },
  { part: 7, id: 'p7-tense-011', stimulus: 'By the time the guests arrived, the students had already ___ the exhibition.', prompt: 'Choose the best word.', correct: 'prepared', distractors: ['prepare', 'preparing', 'prepares'], evidence: 'had already', explanation: 'Had exige participio pasado: prepared.', lesson: 'Busca auxiliares; suelen revelar la forma verbal requerida.' },
  { part: 7, id: 'p7-meaning-012', stimulus: 'Because the hall has limited space, attendance will be ___ to sixty people.', prompt: 'Choose the best word.', correct: 'restricted', distractors: ['repeated', 'repaired', 'reminded'], evidence: 'limited space ... sixty people', explanation: 'Restricted to expresa que la asistencia queda limitada a un máximo.', lesson: 'Usa la causa y el complemento con to para validar significado y colocación.' },
];

const DISTRACTOR_RATIONALES: Record<string, [string, string, string]> = {
  'p1-health-002': [
    'Clinic es el lugar donde se presta atención médica; no es un objeto que pueda ponerse sobre una cortada.',
    'Nurse nombra a la persona que cuida pacientes; la estructura “put this over” exige un objeto físico.',
    'Pharmacy es el establecimiento donde se obtienen medicamentos; no cubre ni protege una herida.',
  ],
  'p1-travel-002': [
    'Platform es el andén donde se espera un tren; es un lugar, no un documento de identidad.',
    'Ticket autoriza un viaje o una entrada, pero no demuestra oficialmente quién es el viajero.',
    'Suitcase es una maleta para llevar pertenencias; pertenece a equipaje, no a documentos.',
  ],
  'p1-home-002': [
    'Drawer es un cajón para guardar objetos; no se usa para apoyar la cabeza al dormir.',
    'Fence es una cerca que delimita un terreno; las pistas “head” y “sleep” no corresponden a su función.',
    'Shelf es un estante para sostener objetos; no es blando ni está destinado a descansar la cabeza.',
  ],
  'p2-library-004': [
    'Una bakery vende pan y alimentos; “RETURN BOOKS” no describe ninguna acción propia de ese lugar.',
    'Un gym contiene equipo de ejercicio, pero normalmente no dispone de un punto para devolver libros usados.',
    'En un bus stop se espera transporte; el objeto decisivo del aviso es “BOOKS”, no buses ni tiquetes.',
  ],
  'p2-lab-005': [
    'Las gafas de seguridad protegen los ojos frente a riesgos; el aviso no habla de aumentar la claridad de lectura.',
    '“Must be worn” ordena ponerse un objeto. No indica apagar luces ni contiene una referencia a iluminación.',
    'El aviso exige llevar gafas más allá del punto señalado; no menciona bolsos ni una zona para guardarlos.',
  ],
  'p2-pool-006': [
    'El aviso regula a menores de 12 años y a sus acompañantes; no se restringe al personal que trabaja en la piscina.',
    'La edad y la compañía de un adulto son las pistas centrales; no hay ninguna referencia a atletas profesionales.',
    'El aviso trata de supervisión infantil, no de compras, restaurantes o consumo de alimentos.',
  ],
  'p3-invitation-004': [
    '“It tasted good” evalúa comida ya consumida; no acepta ni rechaza la invitación futura.',
    '“For two hours” responde por duración, pero la invitación no pregunta cuánto tiempo.',
    '“At the restaurant” da un lugar sin mostrar si la persona acepta; tampoco responde la pregunta completa.',
  ],
  'p3-apology-005': [
    '“Yes, I forgot it” repite la acción desde la perspectiva equivocada y no responde a la disculpa de A.',
    '“It is on the table” contradice el problema: A afirma que olvidó llevar el cuaderno.',
    '“No, I do not write” cambia el tema hacia el hábito de escribir y no reconoce la disculpa.',
  ],
  'p3-direction-006': [
    '“It opened last year” informa cuándo abrió el edificio; no explica la ruta para llegar.',
    '“I study science twice a week” describe una frecuencia personal y no contiene instrucciones de dirección.',
    '“Yes, the building is large” responde sobre tamaño; la pregunta “how do I get to” necesita un recorrido.',
  ],
  'p4-present-perfect-004': [
    'Had sitúa la situación completamente en el pasado y no conecta por sí solo con el periodo que continúa desde 2024.',
    'Is having describe una acción temporal en progreso; “since 2024” pide una situación iniciada entonces y aún vigente.',
    'Have no concuerda con el sujeto singular “Our school”; el auxiliar correcto en tercera persona es has.',
  ],
  'p4-comparative-005': [
    'Shortest es superlativo y compara una ruta con todo un grupo; aquí “than” compara únicamente dos rutas.',
    'More short no es la forma estándar del comparativo de un adjetivo corto; se agrega -er: shorter.',
    'Short no marca comparación, aunque tenga el significado adecuado; “than” exige la forma comparativa.',
  ],
  'p4-pronoun-006': [
    'They es pronombre sujeto; después de “gave” se necesita un objeto directo.',
    'Their es determinante posesivo y tendría que acompañar un sustantivo, como “their keys”.',
    'It es objeto singular, pero el referente “the keys” es plural.',
  ],
  'p4-modal-007': [
    'Could expresa posibilidad o capacidad, no la prohibición necesaria para evitar que dañen las pinturas.',
    'May puede expresar permiso; dar permiso para tocar contradice la razón “can damage them”.',
    'Would plantea una situación hipotética o habitual, pero no comunica una regla de prohibición.',
  ],
  'p4-passive-008': [
    'Gave está en voz activa y necesitaría un sujeto que entregue los premios; aquí “The prizes” recibe la acción.',
    'Are giving es presente progresivo activo, incompatible con el pasado “yesterday” y con el sujeto receptor.',
    'Was given tiene la forma pasiva correcta, pero “prizes” es plural y exige were, no was.',
  ],
  'p4-first-conditional-009': [
    'Held es pasado simple; el resultado se refiere a una consecuencia futura de una condición posible.',
    'Would hold corresponde a una condición hipotética con if + pasado; aquí “improves” está en presente.',
    'Holding no puede formar por sí solo el predicado después del sujeto “we”; falta un auxiliar.',
  ],
  'p4-quantifier-010': [
    'A little acompaña sustantivos incontables, mientras “chairs” es contable plural.',
    'Much suele cuantificar incontables y además no encaja con el plural contable “chairs”.',
    'Any se usa sobre todo en negativas y preguntas; la oración afirmativa necesita expresar una cantidad pequeña disponible.',
  ],
  'p5-detail-004': [
    'Paint aparece en el texto, pero está incluido por el club; no es algo que el miembro deba llevar.',
    'Paper también es proporcionado en el salón, de modo que no responde a “should bring”.',
    'El texto no menciona una membership card; elegirla exigiría añadir información inexistente.',
  ],
  'p5-reason-005': [
    'El texto menciona juegos de la tarde, no un partido matutino al que Leo quiera asistir.',
    'No aparece ninguna reunión con el conductor; el cambio de bus se explica por el tráfico.',
    'El estadio ubica la congestión, pero el texto no dice que Leo vaya a visitarlo.',
  ],
  'p5-sequence-006': [
    'La devolución ocurriría después del préstamo; no es el paso que sigue inmediatamente al formulario.',
    'El cierre de la oficina no forma parte del proceso descrito.',
    'El procedimiento permite pedir una cámara prestada; en ningún momento el estudiante compra equipo.',
  ],
  'p5-paraphrase-007': [
    'El café mantuvo las bebidas frías; cambió el tipo de pitillo y de tapa, no retiró las bebidas.',
    'El texto no obliga a llevar vasos propios; indica que la mayoría de bebidas usa tapas reutilizables.',
    'Lo obligatorio no son tapas de papel: el texto menciona pitillos de papel disponibles a solicitud.',
  ],
  'p5-location-008': [
    'Group B, no Group A, es quien se traslada al computer room.',
    '“Upstairs” describe el destino de Group B; Group A “stays there” en el salón principal.',
    'No se menciona ninguna actividad fuera del edificio.',
  ],
  'p5-time-009': [
    'August corresponde a solicitudes posteriores al 10 de junio; el 8 de junio cae antes del límite.',
    'June 8 es la fecha de envío, no el periodo de revisión. El texto dice que se revisará “that month”.',
    'El texto contrasta junio y agosto del mismo ciclo; no menciona el año siguiente.',
  ],
  'p6-purpose-004': [
    'El autor afirma que el paseo es popular y propone educar; nunca recomienda cerrarlo por completo.',
    '“Adding bins alone will not help” no significa retirar los existentes, sino complementar la infraestructura con explicación.',
    'La popularidad contextualiza dónde creció la basura; reducir visitantes no es la solución propuesta.',
  ],
  'p6-inference-005': [
    'El texto no menciona compra ni mejora de micrófonos; atribuirles el cambio carece de evidencia.',
    'No hubo un cambio en la duración de la semana escolar; la nueva regularidad aparece después del calendario y los roles.',
    'La cantidad de oyentes no se relaciona en el texto con la frecuencia de publicación.',
  ],
  'p6-tone-006': [
    'El autor aclara que el jardín no puede abastecer a todas las familias, así que no lo presenta como solución completa.',
    'Convertir un rincón sin uso en punto de encuentro es descrito como beneficio, no como fracaso.',
    'El intercambio entre vecinos se presenta positivamente; no hay evidencia de daño hacia ellos.',
  ],
  'p7-collocation-004': [
    'Attend significa asistir y normalmente toma como objeto un evento, no “results” que deben analizarse.',
    'Borrow significa tomar algo prestado; los resultados no son un objeto que el comité solicite temporalmente.',
    'Perform significa ejecutar una actividad; se puede perform a test, pero no “perform the results”.',
  ],
  'p7-preposition-005': [
    'At bicycle no es la construcción inglesa para expresar medio de transporte.',
    'For bicycle expresaría finalidad o destinatario y no la manera de viajar.',
    'With bicycle sugeriría acompañamiento o instrumento, pero la colocación establecida es “by bicycle”.',
  ],
  'p7-context-006': [
    'Recently indica tiempo reciente y no describe la manera segura de caminar sobre una superficie resbalosa.',
    'Nearly significa casi; no funciona como adverbio de modo para indicar cómo deben moverse los caminantes.',
    'Widely significa de manera extensa o generalizada; no responde al riesgo concreto de resbalar.',
  ],
  'p7-reference-007': [
    'Them es plural y no forma la estructura impersonal “make it easier to + verbo”.',
    'Its es posesivo y necesita un sustantivo posterior; no puede ocupar solo el objeto de “made”.',
    'Itself es reflexivo y exigiría que el referente realizara y recibiera la acción; aquí se usa el it anticipatorio.',
  ],
  'p7-connector-008': [
    'For instance introduce un ejemplo, pero la segunda oración no ejemplifica que el experimento fallara.',
    'Because introduce una causa subordinada y dejaría la oración incompleta; además, la relación principal es contraste.',
    'Similarly indica semejanza, pero fallar y aprovechar el resultado presentan un giro contrastivo.',
  ],
  'p7-wordform-009': [
    'Help es sustantivo o verbo; después de “are” se necesita un adjetivo que describa instructions.',
    'Helpfully es adverbio y modificaría una acción, no el sustantivo “instructions” mediante el verbo copulativo.',
    'Helped es participio y sugeriría que las instrucciones recibieron ayuda, significado distinto del contexto.',
  ],
  'p7-phrasal-010': [
    'Turn over significa voltear o entregar el control; no significa escribir los datos solicitados en un formulario.',
    'Look after significa cuidar a una persona o cosa; no se combina con form para expresar completarlo.',
    'Give away significa regalar o revelar; contradice la acción de completar y enviar un formulario.',
  ],
  'p7-tense-011': [
    'Prepare es forma base; después del auxiliar “had” se necesita el participio pasado.',
    'Preparing es gerundio y requeriría “had been” para formar una construcción verbal válida.',
    'Prepares es presente de tercera persona y no puede seguir al auxiliar pasado “had”.',
  ],
  'p7-meaning-012': [
    'Repeated significa repetida; el límite de sesenta personas no describe una acción que ocurra de nuevo.',
    'Repaired significa reparada; attendance no está dañada ni recibe una reparación.',
    'Reminded significa recordada o avisada; no expresa una cantidad máxima de asistentes.',
  ],
};

const EXTRA_ANSWER_SLOTS = [
  2, 0, 3, 1, 2, 1, 3, 2, 0, 3, 1, 2, 3, 1, 2, 0, 3,
  2, 1, 3, 2, 1, 0, 3, 2, 1, 3, 2, 0, 1, 3, 2, 1, 3,
] as const;

function buildQuestion(seed: Seed, seedIndex: number): IcfesPracticeQuestion {
  const meta = PART_META[seed.part];
  const answerIndex = EXTRA_ANSWER_SLOTS[seedIndex];
  const optionTexts = [...seed.distractors];
  optionTexts.splice(answerIndex, 0, seed.correct);
  return {
    id: seed.id,
    officialPart: seed.part,
    skill: meta.skill,
    subskill: seed.id.split('-').slice(1, -1).join('-'),
    type: meta.type,
    difficulty: seed.id.endsWith('002') || seed.id.endsWith('004') ? 'base' : seed.id.endsWith('006') || seed.id.endsWith('009') ? 'reto' : 'estandar',
    stimulus: seed.stimulus,
    stimulusLabel: seed.part === 2 ? 'Aviso' : seed.part === 3 ? 'Conversación' : seed.part >= 4 ? 'Texto' : 'Banco temático',
    prompt: seed.prompt,
    options: optionTexts.map((text, index) => {
      const distractorIndex = seed.distractors.indexOf(text);
      return {
        text,
        rationale: index === answerIndex
          ? seed.explanation
          : DISTRACTOR_RATIONALES[seed.id][distractorIndex],
      };
    }),
    answerIndex,
    explanation: seed.explanation,
    evidence: { quote: seed.evidence, reason: seed.explanation },
    strategy: seed.lesson,
    microLesson: { title: 'Regla transferible', body: seed.lesson },
    targetSeconds: meta.targetSeconds,
    tags: [`part-${seed.part}`, meta.skill, 'guided-55'],
    reinforcement: meta.reinforcement,
    source: { type: 'original-practice', reference: `Pregunta original de WeLearn basada en la habilidad evaluada en la Parte ${seed.part}.` },
    reviewedAt: '2026-08-03',
    editorialStatus: 'published',
  };
}

const EXTRA_QUESTIONS = EXTRA_SEEDS.map(buildQuestion);

export const GUIDED_SIMULACRO_2026_QUESTIONS: readonly IcfesPracticeQuestion[] = [
  ...ICFES_PRACTICE_QUESTIONS,
  ...EXTRA_QUESTIONS,
].sort((a, b) => a.officialPart - b.officialPart);

export const GUIDED_SIMULACRO_2026_COUNTS = Object.fromEntries(
  ([1, 2, 3, 4, 5, 6, 7] as const).map((part) => [part, GUIDED_SIMULACRO_2026_QUESTIONS.filter((question) => question.officialPart === part).length]),
) as Record<IcfesOfficialPart, number>;
