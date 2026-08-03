import type { IcfesOfficialPart } from './parts';

export type IcfesQuestionDifficulty = 'base' | 'estandar' | 'reto';
export type IcfesEditorialStatus = 'draft' | 'reviewed' | 'published';

export interface IcfesQuestionOption {
  text: string;
  rationale: string;
  trap?: 'categoría incorrecta' | 'pista parcial' | 'lugar plausible' | 'propósito incorrecto' | 'gramática sin sentido';
}
export interface IcfesEvidence {
  quote: string;
  reason: string;
}

export interface IcfesPracticeQuestion {
  id: string;
  officialPart: IcfesOfficialPart;
  skill: string;
  subskill: string;
  type: 'word-match' | 'notice' | 'dialogue' | 'grammar-cloze' | 'reading' | 'lexical-cloze';
  difficulty: IcfesQuestionDifficulty;
  stimulus: string;
  stimulusLabel?: string;
  wordBank?: string[];
  prompt: string;
  options: IcfesQuestionOption[];
  answerIndex: number;
  explanation: string;
  evidence: IcfesEvidence;
  strategy: string;
  microLesson: {
    title: string;
    body: string;
  };
  targetSeconds: number;
  tags: string[];
  reinforcement: {
    label: string;
    href: string;
  };
  source: {
    type: 'original-practice' | 'official-workbook';
    reference: string;
  };
  reviewedAt: string;
  editorialStatus: IcfesEditorialStatus;
}

export const ICFES_PRACTICE_QUESTIONS: readonly IcfesPracticeQuestion[] = [
  {
    id: 'p1-places-001', officialPart: 1, skill: 'vocabulary_basic', subskill: 'places', type: 'word-match', difficulty: 'base',
    stimulus: 'Places in town', stimulusLabel: 'Categoría', wordBank: ['bakery', 'library', 'pharmacy', 'stadium', 'station'],
    prompt: 'You go to this place when you need to borrow a book.',
    options: [
      { text: 'bakery', rationale: 'A bakery sells bread; it does not lend books.', trap: 'categoría incorrecta' },
      { text: 'library', rationale: 'A library lends books for reading or study.' },
      { text: 'pharmacy', rationale: 'A pharmacy sells medicine, not books.', trap: 'categoría incorrecta' },
      { text: 'stadium', rationale: 'A stadium hosts sports or events.', trap: 'lugar plausible' },
      { text: 'station', rationale: 'A station is associated with transport.', trap: 'lugar plausible' },
    ],
    answerIndex: 1,
    explanation: '“Borrow a book” identifica una biblioteca: borrow significa recibir algo temporalmente para devolverlo después.',
    evidence: { quote: 'borrow a book', reason: 'Es la acción característica que diferencia library de los otros lugares.' },
    strategy: 'Busca el verbo que define la función del lugar, no una palabra temática general.',
    microLesson: { title: 'Borrow no es buy', body: 'Borrow = tomar prestado; lend = prestar a otra persona; buy = comprar. En un banco de lugares, esa diferencia decide la respuesta.' },
    targetSeconds: 25, tags: ['places', 'borrow-lend', 'word-bank'],
    reinforcement: { label: 'Repasar vocabulario ICFES', href: '/practica/icfes-saber-11/vocabulario' },
    source: { type: 'original-practice', reference: 'Pregunta propia basada en la habilidad oficial de la Parte 1.' },
    reviewedAt: '2026-08-03', editorialStatus: 'published',
  },
  {
    id: 'p1-jobs-001', officialPart: 1, skill: 'vocabulary_basic', subskill: 'jobs', type: 'word-match', difficulty: 'base',
    stimulus: 'Jobs', stimulusLabel: 'Categoría', wordBank: ['chef', 'dentist', 'farmer', 'mechanic', 'photographer'],
    prompt: 'This person repairs cars and checks their engines.',
    options: [
      { text: 'chef', rationale: 'A chef prepares food.', trap: 'categoría incorrecta' },
      { text: 'dentist', rationale: 'A dentist treats teeth.', trap: 'categoría incorrecta' },
      { text: 'farmer', rationale: 'A farmer grows crops or raises animals.', trap: 'categoría incorrecta' },
      { text: 'mechanic', rationale: 'A mechanic repairs vehicles and engines.' },
      { text: 'photographer', rationale: 'A photographer takes pictures.', trap: 'categoría incorrecta' },
    ],
    answerIndex: 3,
    explanation: 'Las dos pistas —repairs cars y checks engines— corresponden de manera exclusiva a mechanic.',
    evidence: { quote: 'repairs cars and checks their engines', reason: 'Describe las funciones centrales de un mecánico.' },
    strategy: 'Exige que la opción cumpla todas las pistas, no solo una asociación vaga con trabajo.',
    microLesson: { title: 'Aprende profesiones por función', body: 'Memoriza pares útiles: mechanic–repair, dentist–teeth, chef–cook, photographer–pictures.' },
    targetSeconds: 22, tags: ['jobs', 'functions', 'word-bank'],
    reinforcement: { label: 'Practicar más Parte 1', href: '/practica/icfes-saber-11/parte-1' },
    source: { type: 'original-practice', reference: 'Pregunta propia basada en la habilidad oficial de la Parte 1.' },
    reviewedAt: '2026-08-03', editorialStatus: 'published',
  },
  {
    id: 'p1-objects-001', officialPart: 1, skill: 'vocabulary_basic', subskill: 'objects', type: 'word-match', difficulty: 'estandar',
    stimulus: 'Everyday objects', stimulusLabel: 'Categoría', wordBank: ['blanket', 'key', 'mirror', 'receipt', 'wallet'],
    prompt: 'A shop gives you this after you pay, and it shows what you bought.',
    options: [
      { text: 'blanket', rationale: 'A blanket keeps a person warm.', trap: 'categoría incorrecta' },
      { text: 'key', rationale: 'A key opens a lock.', trap: 'categoría incorrecta' },
      { text: 'mirror', rationale: 'A mirror reflects an image.', trap: 'categoría incorrecta' },
      { text: 'receipt', rationale: 'A receipt records the products and payment.' },
      { text: 'wallet', rationale: 'A wallet can hold money and receipts, but the shop does not give it after payment.', trap: 'pista parcial' },
    ],
    answerIndex: 3,
    explanation: 'Receipt es el comprobante que entrega una tienda. Wallet es tentador porque puede guardarlo, pero no es lo que la tienda te da.',
    evidence: { quote: 'gives you this after you pay', reason: 'La secuencia de compra identifica el comprobante de pago.' },
    strategy: 'Cuando dos palabras pertenecen al mismo contexto, usa quién entrega el objeto y cuándo.',
    microLesson: { title: 'Contexto no equivale a respuesta', body: 'Wallet y receipt aparecen al pagar, pero solo receipt muestra la compra y lo entrega la tienda.' },
    targetSeconds: 28, tags: ['objects', 'shopping', 'distractors'],
    reinforcement: { label: 'Entrenar distractores', href: '/practica/icfes-saber-11/parte-1' },
    source: { type: 'original-practice', reference: 'Pregunta propia basada en la habilidad oficial de la Parte 1.' },
    reviewedAt: '2026-08-03', editorialStatus: 'published',
  },
  {
    id: 'p2-notice-001', officialPart: 2, skill: 'functional_texts', subskill: 'place', type: 'notice', difficulty: 'base',
    stimulus: 'PLEASE RETURN ALL BOOKS AT THIS DESK', stimulusLabel: 'Aviso',
    prompt: 'Where would you most likely see this notice?',
    options: [
      { text: 'In a library', rationale: 'Libraries lend books and have a desk for returns.' },
      { text: 'In a restaurant', rationale: 'A restaurant has service desks or counters, but customers do not return books there.', trap: 'lugar plausible' },
      { text: 'At a bus station', rationale: 'A station can have a desk, but “return books” does not fit its purpose.', trap: 'pista parcial' },
    ],
    answerIndex: 0,
    explanation: 'Return all books es la pista decisiva: un escritorio para devolver libros pertenece a una biblioteca.',
    evidence: { quote: 'RETURN ALL BOOKS', reason: 'La acción y el objeto señalan una biblioteca, no cualquier lugar con un desk.' },
    strategy: 'No elijas por una palabra aislada como desk; combina objeto + acción.',
    microLesson: { title: 'Cruza dos pistas', body: 'Los distractores suelen compartir una palabra. La respuesta correcta explica simultáneamente book, return y desk.' },
    targetSeconds: 30, tags: ['notices', 'places', 'library'],
    reinforcement: { label: 'Practicar avisos por lugar', href: '/practica/icfes-saber-11/parte-2' },
    source: { type: 'original-practice', reference: 'Pregunta propia basada en la habilidad oficial de la Parte 2.' },
    reviewedAt: '2026-08-03', editorialStatus: 'published',
  },
  {
    id: 'p2-notice-002', officialPart: 2, skill: 'functional_texts', subskill: 'purpose', type: 'notice', difficulty: 'estandar',
    stimulus: 'STAFF ONLY — KEEP THIS DOOR CLOSED', stimulusLabel: 'Aviso',
    prompt: 'What is the purpose of this notice?',
    options: [
      { text: 'To invite visitors to enter', rationale: '“Staff only” excludes visitors instead of inviting them.', trap: 'propósito incorrecto' },
      { text: 'To restrict access and remind workers to close the door', rationale: 'Both parts of the notice support this purpose.' },
      { text: 'To tell customers that the business is closed', rationale: 'Closed describes the door, not the business.', trap: 'pista parcial' },
    ],
    answerIndex: 1,
    explanation: 'Staff only restringe quién entra y keep this door closed da una instrucción permanente al personal.',
    evidence: { quote: 'STAFF ONLY — KEEP THIS DOOR CLOSED', reason: 'La primera cláusula limita acceso; la segunda indica la acción requerida.' },
    strategy: 'Parafrasea todas las cláusulas del aviso; una opción incompleta puede ser distractor.',
    microLesson: { title: 'Closed puede cambiar de sentido', body: 'The door is closed habla del estado de la puerta. The business is closed habla del horario del establecimiento.' },
    targetSeconds: 35, tags: ['notices', 'purpose', 'imperatives'],
    reinforcement: { label: 'Repasar lenguaje funcional', href: '/practica/icfes-saber-11/parte-2' },
    source: { type: 'original-practice', reference: 'Pregunta propia basada en la habilidad oficial de la Parte 2.' },
    reviewedAt: '2026-08-03', editorialStatus: 'published',
  },
  {
    id: 'p2-notice-003', officialPart: 2, skill: 'functional_texts', subskill: 'audience', type: 'notice', difficulty: 'reto',
    stimulus: 'PASSENGERS MUST SHOW A BOARDING PASS BEFORE ENTERING THIS AREA', stimulusLabel: 'Aviso',
    prompt: 'Who is this notice mainly for?',
    options: [
      { text: 'People waiting to board a flight', rationale: 'Passengers entering a controlled area need a boarding pass.' },
      { text: 'Pilots applying for a job', rationale: 'A job applicant is not identified as a passenger and would not be boarding.', trap: 'lugar plausible' },
      { text: 'Visitors collecting someone outside', rationale: 'People outside the controlled area do not enter with a boarding pass.', trap: 'pista parcial' },
    ],
    answerIndex: 0,
    explanation: 'Passengers y boarding pass identifican directamente a viajeros que van a abordar, no a cualquier persona en el aeropuerto.',
    evidence: { quote: 'PASSENGERS ... BOARDING PASS', reason: 'Estas dos expresiones delimitan la audiencia específica.' },
    strategy: 'Para audiencia, pregunta quién debe actuar y qué documento u objeto necesita.',
    microLesson: { title: 'Lugar y audiencia no son lo mismo', body: 'El lugar probable es un aeropuerto, pero la audiencia exacta son pasajeros con intención de entrar a la zona de abordaje.' },
    targetSeconds: 32, tags: ['notices', 'audience', 'airport'],
    reinforcement: { label: 'Practicar propósito y audiencia', href: '/practica/icfes-saber-11/parte-2' },
    source: { type: 'original-practice', reference: 'Pregunta propia basada en la habilidad oficial de la Parte 2.' },
    reviewedAt: '2026-08-03', editorialStatus: 'published',
  },
  {
    id: 'p3-dialogue-001', officialPart: 3, skill: 'dialogue_completion', subskill: 'good-news', type: 'dialogue', difficulty: 'base',
    stimulus: 'Student A: I passed my driving test!', stimulusLabel: 'Conversación',
    prompt: 'What is the best response from Student B?',
    options: [
      { text: 'Congratulations!', rationale: 'It is the natural response to someone sharing a personal achievement.' },
      { text: 'Never mind.', rationale: 'This is used to dismiss a problem or apology, not to celebrate good news.', trap: 'propósito incorrecto' },
      { text: 'That is not allowed.', rationale: 'It introduces a prohibition that the conversation never suggests.', trap: 'pista parcial' },
    ],
    answerIndex: 0,
    explanation: 'Passing a test is good news, so the socially appropriate response is Congratulations!',
    evidence: { quote: 'I passed my driving test!', reason: 'Passed comunica un logro y el signo de exclamación refuerza entusiasmo.' },
    strategy: 'Clasifica primero la intención del hablante: noticia, petición, opinión, invitación o problema.',
    microLesson: { title: 'Reacciona a la intención', body: 'Good news suele recibir Congratulations!, That’s great! o Well done! La respuesta debe continuar la función social, no solo ser gramatical.' },
    targetSeconds: 25, tags: ['dialogues', 'good-news', 'pragmatics'],
    reinforcement: { label: 'Practicar más conversaciones', href: '/practica/icfes-saber-11/parte-3' },
    source: { type: 'original-practice', reference: 'Pregunta propia basada en la habilidad oficial de la Parte 3.' },
    reviewedAt: '2026-08-03', editorialStatus: 'published',
  },
  {
    id: 'p3-dialogue-002', officialPart: 3, skill: 'dialogue_completion', subskill: 'offer', type: 'dialogue', difficulty: 'estandar',
    stimulus: 'Student A: Would you like some help with those bags?', stimulusLabel: 'Conversación',
    prompt: 'What is the best response from Student B?',
    options: [
      { text: 'Yes, please. They are quite heavy.', rationale: 'It accepts the offer and explains why the help is useful.' },
      { text: 'No, they did not.', rationale: 'The auxiliary did answers a past-tense question, but Student A made a present offer.', trap: 'gramática sin sentido' },
      { text: 'At the supermarket.', rationale: 'This answers a where question that was not asked.', trap: 'propósito incorrecto' },
    ],
    answerIndex: 0,
    explanation: 'Would you like some help...? es un ofrecimiento; Yes, please acepta de forma natural y coherente.',
    evidence: { quote: 'Would you like some help', reason: 'Esta fórmula introduce un ofrecimiento cortés.' },
    strategy: 'Predice si la respuesta debe aceptar, rechazar o agradecer antes de leer las opciones.',
    microLesson: { title: 'Would you like...?', body: 'Para aceptar: Yes, please / That would be great. Para rechazar con cortesía: No, thanks / I’m fine, thanks.' },
    targetSeconds: 30, tags: ['dialogues', 'offers', 'politeness'],
    reinforcement: { label: 'Repetir funciones comunicativas', href: '/practica/icfes-saber-11/parte-3' },
    source: { type: 'original-practice', reference: 'Pregunta propia basada en la habilidad oficial de la Parte 3.' },
    reviewedAt: '2026-08-03', editorialStatus: 'published',
  },
  {
    id: 'p3-dialogue-003', officialPart: 3, skill: 'dialogue_completion', subskill: 'duration', type: 'dialogue', difficulty: 'reto',
    stimulus: 'Student A: How long have you lived in this neighborhood?', stimulusLabel: 'Conversación',
    prompt: 'What is the best response from Student B?',
    options: [
      { text: 'For almost three years.', rationale: 'For + period answers a question about duration.' },
      { text: 'Three houses away.', rationale: 'This describes distance or location, not duration.', trap: 'pista parcial' },
      { text: 'Before my neighbors.', rationale: 'It gives an imprecise comparison and does not state how long.', trap: 'propósito incorrecto' },
    ],
    answerIndex: 0,
    explanation: 'How long pregunta por duración. For almost three years expresa exactamente un periodo de tiempo.',
    evidence: { quote: 'How long', reason: 'La frase interrogativa solicita duración, no ubicación ni orden.' },
    strategy: 'Haz corresponder la palabra interrogativa con el tipo de dato: when→momento, where→lugar, how long→duración.',
    microLesson: { title: 'For y since', body: 'For acompaña un periodo: for three years. Since acompaña el inicio: since 2023.' },
    targetSeconds: 32, tags: ['dialogues', 'duration', 'present-perfect'],
    reinforcement: { label: 'Reforzar gramática relacionada', href: '/practica/icfes-saber-11/gramatica-conjunciones' },
    source: { type: 'original-practice', reference: 'Pregunta propia basada en la habilidad oficial de la Parte 3.' },
    reviewedAt: '2026-08-03', editorialStatus: 'published',
  },
  {
    id: 'p4-grammar-001', officialPart: 4, skill: 'grammar_recognition', subskill: 'present-simple', type: 'grammar-cloze', difficulty: 'base',
    stimulus: 'Every morning, Lina ___ her bicycle to school.', stimulusLabel: 'Texto con espacio',
    prompt: 'Choose the option that completes the sentence.',
    options: [
      { text: 'ride', rationale: 'The base form would agree with I/you/we/they, not with Lina.', trap: 'pista parcial' },
      { text: 'rides', rationale: 'Third-person singular Lina requires the -s ending in present simple.' },
      { text: 'riding', rationale: 'The -ing form needs an auxiliary such as is.', trap: 'gramática sin sentido' },
    ],
    answerIndex: 1,
    explanation: 'Every morning indica rutina y Lina es tercera persona singular; por eso el verbo es rides.',
    evidence: { quote: 'Every morning, Lina', reason: 'Every morning activa presente simple y Lina exige concordancia en -s.' },
    strategy: 'Antes de mirar opciones, identifica marcador de tiempo, sujeto y forma verbal necesaria.',
    microLesson: { title: 'La -s de tercera persona', body: 'En presente simple afirmativo usa works, goes, studies con he, she, it o un nombre singular.' },
    targetSeconds: 28, tags: ['grammar', 'present-simple', 'agreement'],
    reinforcement: { label: 'Practicar concordancia', href: '/practica/icfes-saber-11/gramatica-conjunciones' },
    source: { type: 'original-practice', reference: 'Pregunta propia basada en la habilidad oficial de la Parte 4.' },
    reviewedAt: '2026-08-03', editorialStatus: 'published',
  },
  {
    id: 'p4-grammar-002', officialPart: 4, skill: 'grammar_recognition', subskill: 'past-simple', type: 'grammar-cloze', difficulty: 'estandar',
    stimulus: 'Last Saturday, our class ___ a science museum.', stimulusLabel: 'Texto con espacio',
    prompt: 'Choose the option that completes the sentence.',
    options: [
      { text: 'visits', rationale: 'Present simple conflicts with the finished past time last Saturday.', trap: 'pista parcial' },
      { text: 'visited', rationale: 'The regular past form matches the finished event.' },
      { text: 'has visited', rationale: 'Present perfect normally avoids a finished time expression such as last Saturday.', trap: 'gramática sin sentido' },
    ],
    answerIndex: 1,
    explanation: 'Last Saturday sitúa la acción en un momento pasado y terminado, así que corresponde visited.',
    evidence: { quote: 'Last Saturday', reason: 'Es un marcador de pasado simple para una acción terminada.' },
    strategy: 'Los marcadores de tiempo suelen resolver el tiempo verbal antes que el significado del verbo.',
    microLesson: { title: 'Pasado terminado', body: 'Yesterday, last week y in 2024 suelen acompañar past simple, no present perfect.' },
    targetSeconds: 30, tags: ['grammar', 'past-simple', 'time-markers'],
    reinforcement: { label: 'Repasar tiempos verbales', href: '/practica/icfes-saber-11/gramatica-conjunciones' },
    source: { type: 'original-practice', reference: 'Pregunta propia basada en la habilidad oficial de la Parte 4.' },
    reviewedAt: '2026-08-03', editorialStatus: 'published',
  },
  {
    id: 'p4-grammar-003', officialPart: 4, skill: 'connectors', subskill: 'contrast', type: 'grammar-cloze', difficulty: 'reto',
    stimulus: 'The trail was difficult. ___, the group reached the top before noon.', stimulusLabel: 'Texto con espacio',
    prompt: 'Choose the connector that best completes the text.',
    options: [
      { text: 'However', rationale: 'It introduces the contrast between difficulty and successful arrival.' },
      { text: 'Because', rationale: 'Because must introduce a cause within a dependent clause and does not fit this punctuation.', trap: 'gramática sin sentido' },
      { text: 'For example', rationale: 'The second sentence is a contrasting result, not an example of difficulty.', trap: 'propósito incorrecto' },
    ],
    answerIndex: 0,
    explanation: 'Llegar a la cima a pesar de un sendero difícil crea contraste; However conecta esas ideas.',
    evidence: { quote: 'difficult ... reached the top', reason: 'El resultado positivo contrasta con el obstáculo previo.' },
    strategy: 'Nombra la relación lógica —contraste, causa, resultado o ejemplo— antes de elegir el conector.',
    microLesson: { title: 'However entre oraciones', body: 'However puede iniciar una segunda oración y suele ir seguido de coma: It was hard. However, we finished.' },
    targetSeconds: 35, tags: ['grammar', 'connectors', 'contrast'],
    reinforcement: { label: 'Entrenar conectores', href: '/practica/icfes-saber-11/gramatica-conjunciones' },
    source: { type: 'original-practice', reference: 'Pregunta propia basada en la habilidad oficial de la Parte 4.' },
    reviewedAt: '2026-08-03', editorialStatus: 'published',
  },
  {
    id: 'p7-lexical-001', officialPart: 7, skill: 'vocabulary_context', subskill: 'collocation', type: 'lexical-cloze', difficulty: 'base',
    stimulus: 'Residents meet in the community garden to grow food and ___ ideas.', stimulusLabel: 'Cloze contextual',
    prompt: 'Choose the word that best completes the text.',
    options: [
      { text: 'share', rationale: 'Share ideas is the natural collocation for exchanging thoughts.' },
      { text: 'lend', rationale: 'Lend is used for something temporarily given and does not collocate with ideas here.', trap: 'pista parcial' },
      { text: 'spend', rationale: 'Spend combines with time or money, not ideas.', trap: 'gramática sin sentido' },
      { text: 'grow', rationale: 'Grow already fits food/plants; repeating it with ideas is not the intended collocation.', trap: 'pista parcial' },
    ],
    answerIndex: 0,
    explanation: 'Share ideas significa intercambiar ideas y forma una colocación frecuente en contextos de comunidad.',
    evidence: { quote: 'Residents meet ... and ___ ideas', reason: 'Meet sugiere interacción; share completa la acción social paralela a grow food.' },
    strategy: 'Comprueba qué palabra suele combinarse con el sustantivo inmediatamente posterior.',
    microLesson: { title: 'Estudia bloques, no palabras sueltas', body: 'Aprende share ideas, spend time, lend money y grow food como unidades frecuentes.' },
    targetSeconds: 34, tags: ['cloze', 'collocations', 'community'],
    reinforcement: { label: 'Repasar vocabulario contextual', href: '/practica/icfes-saber-11/vocabulario' },
    source: { type: 'original-practice', reference: 'Pregunta propia basada en la habilidad oficial de la Parte 7.' },
    reviewedAt: '2026-08-03', editorialStatus: 'published',
  },
  {
    id: 'p7-lexical-002', officialPart: 7, skill: 'vocabulary_context', subskill: 'change-verbs', type: 'lexical-cloze', difficulty: 'estandar',
    stimulus: 'The project began two years ago, and participation has ___ steadily since then.', stimulusLabel: 'Cloze contextual',
    prompt: 'Choose the word that best completes the text.',
    options: [
      { text: 'increased', rationale: 'Participation can increase, and present perfect fits since then.' },
      { text: 'raised', rationale: 'Raise normally needs an object: the team raised participation.', trap: 'gramática sin sentido' },
      { text: 'improved', rationale: 'Quality can improve, but participation is more naturally described as increasing in amount.', trap: 'pista parcial' },
      { text: 'offered', rationale: 'Offer requires something being made available and does not express numerical growth.', trap: 'categoría incorrecta' },
    ],
    answerIndex: 0,
    explanation: 'Participation has increased expresa que la cantidad de participantes ha crecido desde el inicio.',
    evidence: { quote: 'began two years ago ... steadily since then', reason: 'La duración hasta el presente y steadily apuntan a una tendencia de aumento.' },
    strategy: 'Valida tres capas: significado, estructura verbal y colocación con el sustantivo.',
    microLesson: { title: 'Increase y raise', body: 'Participation increases sin objeto. An organization raises participation: raise es transitivo y necesita objeto.' },
    targetSeconds: 38, tags: ['cloze', 'trends', 'present-perfect'],
    reinforcement: { label: 'Practicar cambios y tendencias', href: '/practica/icfes-saber-11/vocabulario' },
    source: { type: 'original-practice', reference: 'Pregunta propia basada en la habilidad oficial de la Parte 7.' },
    reviewedAt: '2026-08-03', editorialStatus: 'published',
  },
  {
    id: 'p7-lexical-003', officialPart: 7, skill: 'vocabulary_context', subskill: 'phrasal-meaning', type: 'lexical-cloze', difficulty: 'reto',
    stimulus: 'Volunteers may take tools home, but they must ___ them before the weekend workshop.', stimulusLabel: 'Cloze contextual',
    prompt: 'Choose the word that best completes the text.',
    options: [
      { text: 'return', rationale: 'Return means bring an item back to its original place.' },
      { text: 'borrow', rationale: 'Borrow describes receiving the tools, an action already expressed by take home.', trap: 'pista parcial' },
      { text: 'avoid', rationale: 'Avoid does not take an object with the meaning of bringing it back.', trap: 'categoría incorrecta' },
      { text: 'provide', rationale: 'Provide means supply something; the volunteers are expected to bring existing tools back.', trap: 'pista parcial' },
    ],
    answerIndex: 0,
    explanation: 'Si los voluntarios llevan herramientas a casa, deben return them —devolverlas— antes del taller.',
    evidence: { quote: 'take tools home, but', reason: 'But introduce la obligación opuesta y them refiere a tools.' },
    strategy: 'Sigue los pronombres y la relación lógica entre acciones antes y después del espacio.',
    microLesson: { title: 'Borrow, lend y return', body: 'You borrow a tool from someone; they lend it to you; later you return it.' },
    targetSeconds: 40, tags: ['cloze', 'reference', 'borrow-lend-return'],
    reinforcement: { label: 'Repasar pares confusos', href: '/practica/icfes-saber-11/vocabulario' },
    source: { type: 'original-practice', reference: 'Pregunta propia basada en la habilidad oficial de la Parte 7.' },
    reviewedAt: '2026-08-03', editorialStatus: 'published',
  },
  {
    id: 'p5-literal-001', officialPart: 5, skill: 'detail', subskill: 'schedule', type: 'reading', difficulty: 'base',
    stimulus: 'The Westside Library opens at 9:00 a.m. from Monday to Saturday. On weekdays it closes at 7:00 p.m., but on Saturday it closes at 4:00 p.m. The study room is unavailable every Wednesday morning.', stimulusLabel: 'Texto de lectura',
    prompt: 'When does the library close on Saturday?',
    options: [
      { text: 'At 4:00 p.m.', rationale: 'The second sentence states this Saturday closing time explicitly.' },
      { text: 'At 7:00 p.m.', rationale: 'That time applies to weekdays, not Saturday.', trap: 'pista parcial' },
      { text: 'At 9:00 a.m.', rationale: '9:00 a.m. is the opening time.', trap: 'pista parcial' },
      { text: 'On Wednesday morning', rationale: 'This is when the study room is unavailable, not when the library closes.', trap: 'categoría incorrecta' },
    ],
    answerIndex: 0,
    explanation: 'El texto contrasta weekday con Saturday y dice directamente que el sábado cierra a las 4:00 p.m.',
    evidence: { quote: 'on Saturday it closes at 4:00 p.m.', reason: 'La oración contiene el mismo día y la información exacta solicitada.' },
    strategy: 'Busca primero la palabra clave de la pregunta y lee la oración completa donde reaparece.',
    microLesson: { title: 'Cuidado con datos vecinos', body: 'Los distractores literales suelen copiar otro horario verdadero del texto. Verifica que pertenezca al día o sujeto de la pregunta.' },
    targetSeconds: 40, tags: ['reading', 'detail', 'schedule'],
    reinforcement: { label: 'Practicar más lectura literal', href: '/practica/icfes-saber-11/parte-5' },
    source: { type: 'original-practice', reference: 'Texto y pregunta propios basados en la habilidad oficial de la Parte 5.' },
    reviewedAt: '2026-08-03', editorialStatus: 'published',
  },
  {
    id: 'p5-literal-002', officialPart: 5, skill: 'detail', subskill: 'sequence', type: 'reading', difficulty: 'estandar',
    stimulus: 'Students who join the school garden first attend a short safety talk. Then they choose a team and collect their tools. At the end of the session, every team cleans its tools and records what it planted.', stimulusLabel: 'Texto de lectura',
    prompt: 'What do students do immediately after the safety talk?',
    options: [
      { text: 'They choose a team.', rationale: 'Then marks this as the next action after the talk.' },
      { text: 'They clean their tools.', rationale: 'Cleaning happens at the end of the session.', trap: 'pista parcial' },
      { text: 'They record what they planted.', rationale: 'Recording also happens at the end.', trap: 'pista parcial' },
      { text: 'They give the safety talk.', rationale: 'Students attend the talk; the text does not say they deliver it.', trap: 'categoría incorrecta' },
    ],
    answerIndex: 0,
    explanation: 'Then organiza la secuencia: después de attend a safety talk, los estudiantes choose a team.',
    evidence: { quote: 'first attend a short safety talk. Then they choose a team', reason: 'First y then muestran el orden explícito de las acciones.' },
    strategy: 'Para preguntas de secuencia, marca conectores como first, then, after y finally.',
    microLesson: { title: 'Immediately after', body: 'La respuesta debe ser la acción siguiente, no cualquier acción posterior verdadera.' },
    targetSeconds: 45, tags: ['reading', 'sequence', 'connectors'],
    reinforcement: { label: 'Entrenar scanning', href: '/practica/icfes-saber-11/parte-5' },
    source: { type: 'original-practice', reference: 'Texto y pregunta propios basados en la habilidad oficial de la Parte 5.' },
    reviewedAt: '2026-08-03', editorialStatus: 'published',
  },
  {
    id: 'p5-literal-003', officialPart: 5, skill: 'paraphrase', subskill: 'explicit-reason', type: 'reading', difficulty: 'reto',
    stimulus: 'The museum introduced small group tours after visitors said the main hall was too noisy. Each tour now has a maximum of eight people, so guides can answer more questions and visitors can hear the explanations clearly.', stimulusLabel: 'Texto de lectura',
    prompt: 'Why did the museum start offering smaller tours?',
    options: [
      { text: 'Because visitors had difficulty hearing in the main hall.', rationale: 'This paraphrases the complaint that the hall was too noisy.' },
      { text: 'Because guides wanted to finish earlier.', rationale: 'The text mentions guides answering questions, not finishing time.', trap: 'pista parcial' },
      { text: 'Because the museum received fewer visitors.', rationale: 'No decline in visitor numbers is stated.', trap: 'categoría incorrecta' },
      { text: 'Because groups requested more expensive tickets.', rationale: 'Prices and ticket requests never appear.', trap: 'categoría incorrecta' },
    ],
    answerIndex: 0,
    explanation: 'Too noisy se parafrasea como difficulty hearing; esa queja provocó el cambio a grupos pequeños.',
    evidence: { quote: 'after visitors said the main hall was too noisy', reason: 'After conecta la queja de ruido con la introducción de tours pequeños.' },
    strategy: 'Busca una paráfrasis: la respuesta correcta rara vez repite exactamente las mismas palabras.',
    microLesson: { title: 'Noise y hearing', body: 'Too noisy describe la causa; difficulty hearing expresa su consecuencia. Reconocer esa relación ayuda con paráfrasis.' },
    targetSeconds: 50, tags: ['reading', 'paraphrase', 'cause'],
    reinforcement: { label: 'Practicar paráfrasis', href: '/practica/icfes-saber-11/sinonimos-inferencia' },
    source: { type: 'original-practice', reference: 'Texto y pregunta propios basados en la habilidad oficial de la Parte 5.' },
    reviewedAt: '2026-08-03', editorialStatus: 'published',
  },
  {
    id: 'p6-inference-001', officialPart: 6, skill: 'purpose', subskill: 'author-purpose', type: 'reading', difficulty: 'estandar',
    stimulus: 'Some residents worry that planting trees along busy streets will reduce parking spaces. That inconvenience is real, but it should be compared with cooler sidewalks, cleaner air, and safer walking routes. A neighborhood designed only around parked cars misses the needs of everyone who moves through it.', stimulusLabel: 'Texto argumentativo',
    prompt: 'What is the author mainly trying to do?',
    options: [
      { text: 'Persuade readers that street trees are worth a parking trade-off.', rationale: 'The author acknowledges the cost and then argues that broader benefits outweigh it.' },
      { text: 'Explain how to plant trees beside a road.', rationale: 'No planting instructions or steps are provided.', trap: 'propósito incorrecto' },
      { text: 'Prove that residents do not need cars.', rationale: 'The author criticizes car-only design but does not claim cars are unnecessary.', trap: 'pista parcial' },
      { text: 'Describe the history of neighborhood parking.', rationale: 'The passage contains no historical sequence.', trap: 'categoría incorrecta' },
    ],
    answerIndex: 0,
    explanation: 'El autor reconoce la pérdida de estacionamiento, pero enumera beneficios y concluye que el diseño debe atender a más personas: busca persuadir.',
    evidence: { quote: 'That inconvenience is real, but it should be compared with cooler sidewalks, cleaner air, and safer walking routes.', reason: 'La concesión seguida de but introduce el argumento favorable a los árboles.' },
    strategy: 'Resume qué hace cada oración y elige el propósito que explique el movimiento completo del texto.',
    microLesson: { title: 'Concesión + postura', body: 'Un autor puede reconocer una objeción para sonar razonable y luego defender su posición con but, however o still.' },
    targetSeconds: 65, tags: ['reading', 'purpose', 'argument'],
    reinforcement: { label: 'Entrenar propósito del autor', href: '/practica/icfes-saber-11/sinonimos-inferencia' },
    source: { type: 'original-practice', reference: 'Texto y pregunta propios basados en la habilidad oficial de la Parte 6.' },
    reviewedAt: '2026-08-03', editorialStatus: 'published',
  },
  {
    id: 'p6-inference-002', officialPart: 6, skill: 'inference', subskill: 'supported-conclusion', type: 'reading', difficulty: 'reto',
    stimulus: 'Nora expected online classes to save time because she no longer traveled to campus. During the first month, however, she often studied late into the night. After she began planning short breaks and turning off phone notifications, she finished her work earlier and remembered more of each lesson.', stimulusLabel: 'Texto de lectura',
    prompt: 'What can be inferred about Nora’s first month of online study?',
    options: [
      { text: 'She had not yet developed effective study habits.', rationale: 'Her later planning and notification changes improved both time and retention.' },
      { text: 'Her teachers gave her more work than campus students.', rationale: 'The passage never compares workloads or blames teachers.', trap: 'categoría incorrecta' },
      { text: 'She preferred traveling to campus every night.', rationale: 'Travel is described only as time she expected to save.', trap: 'pista parcial' },
      { text: 'She could not understand any online lesson.', rationale: 'Remembering more later does not mean she understood nothing before.', trap: 'pista parcial' },
    ],
    answerIndex: 0,
    explanation: 'La mejora posterior al planificar pausas y apagar notificaciones permite inferir que al inicio le faltaban hábitos efectivos.',
    evidence: { quote: 'After she began planning short breaks and turning off phone notifications, she finished her work earlier and remembered more', reason: 'El cambio de método causa una mejora, revelando el problema anterior sin decirlo de forma literal.' },
    strategy: 'Una inferencia válida conecta cambio y resultado sin añadir causas que el texto no menciona.',
    microLesson: { title: 'Inferir no es imaginar', body: 'La conclusión debe ser necesaria o muy probable por la evidencia. Evita opciones extremas como any, always o nothing.' },
    targetSeconds: 70, tags: ['reading', 'inference', 'study-habits'],
    reinforcement: { label: 'Practicar inferencias', href: '/practica/icfes-saber-11/sinonimos-inferencia' },
    source: { type: 'original-practice', reference: 'Texto y pregunta propios basados en la habilidad oficial de la Parte 6.' },
    reviewedAt: '2026-08-03', editorialStatus: 'published',
  },
  {
    id: 'p6-inference-003', officialPart: 6, skill: 'tone', subskill: 'balanced-tone', type: 'reading', difficulty: 'reto',
    stimulus: 'The new repair café will not solve the city’s waste problem by itself. Still, every repaired lamp or toaster keeps one object out of a landfill and gives a neighbor practical skills. Its value may be modest in numbers, but meaningful in the habits it encourages.', stimulusLabel: 'Texto de opinión',
    prompt: 'Which phrase best describes the author’s attitude toward the repair café?',
    options: [
      { text: 'Cautiously positive', rationale: 'The author limits the scale of impact but values the habits and individual results.' },
      { text: 'Completely disappointed', rationale: 'The passage explicitly identifies meaningful benefits.', trap: 'propósito incorrecto' },
      { text: 'Uncritically enthusiastic', rationale: 'The author acknowledges that it will not solve the whole problem and calls numerical impact modest.', trap: 'pista parcial' },
      { text: 'Uninterested and neutral', rationale: 'Evaluative words such as meaningful reveal a favorable position.', trap: 'pista parcial' },
    ],
    answerIndex: 0,
    explanation: 'El autor limita la promesa —no resolverá todo— pero destaca beneficios significativos; el tono es positivo con cautela.',
    evidence: { quote: 'Its value may be modest in numbers, but meaningful in the habits it encourages.', reason: 'Modest expresa cautela y meaningful expresa valoración positiva.' },
    strategy: 'Para tono, reúne palabras evaluativas de ambos lados y evita etiquetas extremas.',
    microLesson: { title: 'El tono puede ser mixto', body: 'Cautiously positive combina reconocimiento de límites con apoyo. Los distractores suelen exagerar solo una mitad.' },
    targetSeconds: 72, tags: ['reading', 'tone', 'evaluation'],
    reinforcement: { label: 'Entrenar tono e intención', href: '/practica/icfes-saber-11/sinonimos-inferencia' },
    source: { type: 'original-practice', reference: 'Texto y pregunta propios basados en la habilidad oficial de la Parte 6.' },
    reviewedAt: '2026-08-03', editorialStatus: 'published',
  },
] as const;

export function getIcfesQuestionsByPart(part: IcfesOfficialPart): IcfesPracticeQuestion[] {
  return ICFES_PRACTICE_QUESTIONS.filter((question) => question.officialPart === part);
}
