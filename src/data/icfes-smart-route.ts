export const ICFES_SMART_SKILLS = [
  'vocabulary_basic',
  'vocabulary_context',
  'functional_texts',
  'grammar_recognition',
  'connectors',
  'reference_words',
  'main_idea',
  'detail',
  'inference',
  'purpose',
  'tone',
  'paraphrase',
  'sentence_order',
  'dialogue_completion',
  'scanning',
  'time_management',
] as const;

export type IcfesSmartSkill = (typeof ICFES_SMART_SKILLS)[number];
export type IcfesSmartLevel = 0 | 1 | 2 | 3 | 4 | 5;

export type IcfesSmartQuestionType =
  | 'multiple_choice'
  | 'dialogue_order'
  | 'matching'
  | 'cloze'
  | 'reference'
  | 'paraphrase'
  | 'timed_reading';

export interface IcfesSmartQuestion {
  id: string;
  level: IcfesSmartLevel;
  skill: IcfesSmartSkill;
  subskill: string;
  difficulty: 1 | 2 | 3 | 4 | 5;
  type: IcfesSmartQuestionType;
  prompt: string;
  passage?: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  wrongAnswerExplanations?: Record<string, string>;
  estimatedTimeSeconds: number;
  icfesVocabularyTags?: string[];
}

export interface IcfesLevelConfig {
  level: IcfesSmartLevel;
  label: string;
  shortLabel: string;
  focus: string[];
  color: string;
  targetTimeSeconds: number;
  baseQuestionCount: number;
  recoveryQuestionCount: number;
  description: string;
}

export const ICFES_LEVELS: Record<IcfesSmartLevel, IcfesLevelConfig> = {
  0: {
    level: 0,
    label: 'Nivel 0 — Base ICFES',
    shortLabel: 'Base / Pre-A1',
    focus: ['señales', 'instrucciones', 'vocabulario esencial', 'matching simple'],
    color: '#0f766e',
    targetTimeSeconds: 26,
    baseQuestionCount: 12,
    recoveryQuestionCount: 6,
    description: 'Reconocer señales, palabras esenciales e instrucciones cortas.',
  },
  1: {
    level: 1,
    label: 'Nivel 1 — A1 funcional',
    shortLabel: 'A1 funcional',
    focus: ['rutinas', 'familia', 'escuela', 'lugares', 'horarios', 'diálogos básicos'],
    color: '#2563eb',
    targetTimeSeconds: 28,
    baseQuestionCount: 12,
    recoveryQuestionCount: 6,
    description: 'Entender situaciones cotidianas y diálogos breves de alta frecuencia.',
  },
  2: {
    level: 2,
    label: 'Nivel 2 — A2 básico',
    shortLabel: 'A2 básico',
    focus: ['textos cortos', 'and/but/because/so', 'present/past simple', 'reference words'],
    color: '#534AB7',
    targetTimeSeconds: 31,
    baseQuestionCount: 12,
    recoveryQuestionCount: 7,
    description: 'Conectar ideas simples y reconocer vocabulario, gramática y referencias en contexto.',
  },
  3: {
    level: 3,
    label: 'Nivel 3 — A2 alto',
    shortLabel: 'A2 alto',
    focus: ['idea principal', 'detalles', 'inferencia simple', 'paráfrasis', 'however/although/therefore/instead'],
    color: '#7c3aed',
    targetTimeSeconds: 34,
    baseQuestionCount: 12,
    recoveryQuestionCount: 8,
    description: 'Leer textos cortos con distractores y reconocer información reformulada.',
  },
  4: {
    level: 4,
    label: 'Nivel 4 — B1 ICFES',
    shortLabel: 'B1 ICFES',
    focus: ['textos medianos', 'purpose', 'tone', 'inference', 'author’s intention', 'distractor analysis'],
    color: '#dc2626',
    targetTimeSeconds: 38,
    baseQuestionCount: 12,
    recoveryQuestionCount: 8,
    description: 'Responder preguntas de intención, tono, inferencia y distractores tipo examen.',
  },
  5: {
    level: 5,
    label: 'Nivel 5 — B1 avanzado (ruta interna)',
    shortLabel: 'B1 avanzado · interno',
    focus: ['velocidad', 'precisión', 'bloques tipo examen', 'lectura cronometrada', 'preguntas mixtas'],
    color: '#0f3d8c',
    targetTimeSeconds: 42,
    baseQuestionCount: 12,
    recoveryQuestionCount: 8,
    description: 'Optimizar lectura cronometrada, control de distractores y precisión bajo presión.',
  },
};

export const ICFES_SKILL_LABELS: Record<IcfesSmartSkill, string> = {
  vocabulary_basic: 'Vocabulario básico',
  vocabulary_context: 'Vocabulario en contexto',
  functional_texts: 'Textos funcionales',
  grammar_recognition: 'Gramática en contexto',
  connectors: 'Conectores',
  reference_words: 'Reference words',
  main_idea: 'Idea principal',
  detail: 'Detalles explícitos',
  inference: 'Inferencia',
  purpose: 'Propósito',
  tone: 'Tono',
  paraphrase: 'Paráfrasis',
  sentence_order: 'Orden de oraciones',
  dialogue_completion: 'Diálogos',
  scanning: 'Scanning',
  time_management: 'Manejo del tiempo',
};

export const ICFES_SKILL_GUIDES: Record<IcfesSmartSkill, { explanation: string; example: string }> = {
  vocabulary_basic: {
    explanation: 'Primero identifica la palabra clave y su función: lugar, acción, objeto o advertencia.',
    example: 'Si ves "closed", la idea no es comprar ni entrar; es que el lugar no está atendiendo.',
  },
  vocabulary_context: {
    explanation: 'No traduzcas palabra por palabra: mira las palabras antes y después para inferir el sentido.',
    example: 'En "The medicine reduced the pain", "reduced" se entiende como "made it less".',
  },
  functional_texts: {
    explanation: 'En avisos, emails y anuncios busca quién escribe, para quién y qué acción se espera.',
    example: 'Un aviso que dice "return the form by Friday" pide entregar un formulario antes de una fecha.',
  },
  grammar_recognition: {
    explanation: 'La gramática del ICFES aparece dentro de contexto: tiempo verbal, cantidad, preposición o forma correcta.',
    example: 'Every morning activa present simple: "She goes", no "She go".',
  },
  connectors: {
    explanation: 'El conector revela la relación lógica: contraste, causa, consecuencia, adición o alternativa.',
    example: '"However" marca contraste; "therefore" marca resultado.',
  },
  reference_words: {
    explanation: 'Vuelve a la frase anterior y pregunta qué sustantivo coincide en número y sentido.',
    example: 'En "The students finished the project. They presented it", "they" son los estudiantes e "it" es el proyecto.',
  },
  main_idea: {
    explanation: 'La idea principal resume todo el texto, no solo un detalle atractivo.',
    example: 'Si el texto menciona causas, efectos y soluciones de la contaminación, la idea principal no es solo "cars".',
  },
  detail: {
    explanation: 'Para detalles explícitos, localiza palabras equivalentes y evita opciones que agregan información nueva.',
    example: 'Si el texto dice "on Tuesday", no aceptes "next week" aunque suene relacionado.',
  },
  inference: {
    explanation: 'Inferir es concluir algo apoyado por el texto, no adivinar con conocimiento externo.',
    example: 'Si una comunidad camina horas por agua, se infiere que el acceso cercano es limitado.',
  },
  purpose: {
    explanation: 'El propósito responde qué busca hacer el texto: informar, advertir, invitar, persuadir o explicar.',
    example: 'Un texto con fecha, lugar y registro busca invitar o anunciar, no narrar una historia.',
  },
  tone: {
    explanation: 'El tono se reconoce por adjetivos y postura: neutral, worried, positive, critical o encouraging.',
    example: 'Palabras como "serious problem" y "must act" suelen indicar preocupación.',
  },
  paraphrase: {
    explanation: 'La respuesta correcta puede decir la misma idea con otras palabras.',
    example: '"Cut down on sugar" equivale a "reduce the amount of sugar".',
  },
  sentence_order: {
    explanation: 'Ordena buscando inicio general, pronombres que retoman ideas y cierre lógico.',
    example: 'Una oración con "this problem" normalmente va después de la oración que presenta el problema.',
  },
  dialogue_completion: {
    explanation: 'En diálogos, la respuesta debe respetar la situación, el tono y la intención del turno anterior.',
    example: 'Si alguien ofrece ayuda, una respuesta natural puede aceptar, rechazar o pedir detalles.',
  },
  scanning: {
    explanation: 'Busca datos específicos como nombres, fechas, precios, horarios y lugares antes de leer todo.',
    example: 'Para una pregunta de precio, salta directo a números o símbolos de dinero.',
  },
  time_management: {
    explanation: 'Lee primero la pregunta, subraya la pista y descarta distractores antes de decidir.',
    example: 'Si una opción copia palabras del texto pero cambia la intención, probablemente es distractor.',
  },
};

type QuestionInput = Omit<IcfesSmartQuestion, 'options' | 'wrongAnswerExplanations'> & {
  options: readonly string[];
  wrongAnswerExplanations?: Record<string, string>;
};

function makeQuestion(input: QuestionInput): IcfesSmartQuestion {
  const wrongAnswerExplanations = input.options.reduce<Record<string, string>>((acc, option) => {
    if (option !== input.correctAnswer) {
      acc[option] =
        input.wrongAnswerExplanations?.[option] ??
        'Esta opción no encaja con la pista principal del texto o cambia la relación lógica que se evalúa.';
    }
    return acc;
  }, {});

  return {
    ...input,
    options: [...input.options],
    wrongAnswerExplanations,
  };
}

const commonTags = ['school', 'class', 'homework', 'teacher', 'students', 'library'];
const travelTags = ['trip', 'travel', 'ticket', 'airport', 'hotel', 'reservation'];
const healthTags = ['health', 'appointment', 'doctor', 'medicine'];
const environmentTags = ['environment', 'recycling', 'pollution', 'animals'];
const workTags = ['jobs', 'interview', 'schedule', 'office'];
const dailyTags = ['family', 'friends', 'hobbies', 'sports'];
const foodTags = ['food', 'restaurant', 'menu', 'recipe'];
const techTags = ['technology', 'email', 'website', 'app', 'password'];
const signTags = ['exit', 'entrance', 'warning', 'danger', 'sale', 'closed', 'open', 'quiet', 'do not enter'];
const connectorTags = ['because', 'but', 'so', 'although', 'however', 'therefore', 'instead', 'also', 'in addition'];

const LEVEL0_SIGNS = [
  ['exit', 'EXIT', 'What does this sign mean?', 'This is the way out', 'This is the entrance', 'You can buy tickets here', 'You must be quiet'],
  ['entrance', 'ENTRANCE', 'Where can people go through?', 'The door to go in', 'The office for staff', 'The place to pay', 'The emergency exit'],
  ['quiet', 'QUIET PLEASE', 'What should people do?', 'Speak softly', 'Run quickly', 'Open the door', 'Call a doctor'],
  ['closed', 'CLOSED ON SUNDAYS', 'When is the place not open?', 'On Sundays', 'On Mondays', 'Every morning', 'At lunchtime'],
  ['open', 'OPEN 8 A.M. - 5 P.M.', 'What information does the sign give?', 'The opening hours', 'The price of tickets', 'The name of a teacher', 'The weather forecast'],
  ['warning', 'WARNING: WET FLOOR', 'What is the danger?', 'The floor may be slippery', 'The room is too hot', 'The door is locked', 'The food is cold'],
  ['danger', 'DANGER: DO NOT TOUCH', 'What should people avoid?', 'Touching the object', 'Reading the notice', 'Leaving the room', 'Asking for help'],
  ['sale', 'SALE - 30% OFF', 'What does this sign announce?', 'A lower price', 'A school meeting', 'A lost object', 'A medical appointment'],
  ['do not enter', 'DO NOT ENTER', 'What does the sign tell you?', 'You must not go in', 'You should wait in line', 'You need a password', 'You can enter now'],
  ['library', 'RETURN BOOKS HERE', 'What should students do?', 'Leave borrowed books there', 'Buy new books there', 'Eat snacks there', 'Print homework there'],
] as const;

const LEVEL0_VOCAB = [
  ['teacher', 'A person who helps students learn in class is a...', 'teacher', 'ticket', 'doctor', 'password'],
  ['homework', 'Work students do after class is called...', 'homework', 'medicine', 'reservation', 'pollution'],
  ['library', 'A place where students read and borrow books is a...', 'library', 'restaurant', 'airport', 'office'],
  ['ticket', 'You usually need this to travel by bus or plane.', 'ticket', 'recipe', 'warning', 'interview'],
  ['doctor', 'A person who helps sick people is a...', 'doctor', 'student', 'waiter', 'pilot'],
  ['medicine', 'You take this when you are ill.', 'medicine', 'homework', 'menu', 'website'],
  ['password', 'You use this to enter an app or email account.', 'password', 'library', 'schedule', 'danger'],
  ['menu', 'You read this in a restaurant before ordering food.', 'menu', 'ticket', 'class', 'recycling'],
  ['recycling', 'Using old paper, plastic or glass again is...', 'recycling', 'pollution', 'homework', 'reservation'],
  ['schedule', 'A list that shows times for classes or work is a...', 'schedule', 'family', 'medicine', 'airport'],
] as const;

const LEVEL0_FUNCTIONAL = [
  ['School notice', 'CLASS STARTS AT 7:00 A.M.\nPlease arrive ten minutes early.', 'What should students do?', 'Arrive before 7:00 a.m.', 'Arrive after lunch', 'Bring a doctor', 'Buy a new ticket'],
  ['Email', 'Hi Ana,\nPlease send your homework before Friday.\nMr. Lee', 'What does Mr. Lee ask Ana to do?', 'Send homework before Friday', 'Visit the library on Sunday', 'Cancel her class', 'Open a bank account'],
  ['Ad', 'USED BIKE FOR SALE\nGood condition. Call 310 555 1234.', 'What can you buy?', 'A second-hand bike', 'A plane ticket', 'A school uniform', 'A computer password'],
  ['Health note', 'Doctor appointment: Tuesday, 3:30 p.m.\nBring your ID.', 'What should the patient bring?', 'An ID', 'A menu', 'A bicycle', 'A library book'],
  ['Travel notice', 'Bus to Bogotá leaves at Gate 4.', 'Where should passengers go?', 'Gate 4', 'The library', 'Room 12', 'The restaurant kitchen'],
  ['Restaurant sign', 'Breakfast served until 10:00 a.m.', 'When can people get breakfast?', 'Before 10:00 a.m.', 'Only at night', 'After 6:00 p.m.', 'On Sundays only'],
  ['Office message', 'Meeting moved to Room 205.', 'What changed?', 'The meeting room', 'The teacher', 'The password', 'The medicine'],
  ['Technology note', 'New password required every 30 days.', 'What must users change?', 'Their password', 'Their lunch', 'Their address', 'Their ticket'],
  ['Sports notice', 'Soccer practice cancelled because of rain.', 'Why is practice cancelled?', 'Because it is raining', 'Because the team won', 'Because tickets are sold out', 'Because the coach is sick'],
  ['Shop sign', 'Please pay at the cashier.', 'What should customers do?', 'Pay at the cashier', 'Leave food on tables', 'Enter the staff room', 'Return books'],
] as const;

function level0Questions(): IcfesSmartQuestion[] {
  const signs = LEVEL0_SIGNS.map((item, index) =>
    makeQuestion({
      id: `l0-sign-${index + 1}`,
      level: 0,
      skill: 'functional_texts',
      subskill: `signs:${item[0]}`,
      difficulty: 1,
      type: 'multiple_choice',
      passage: item[1],
      prompt: item[2],
      options: [item[3], item[4], item[5], item[6]],
      correctAnswer: item[3],
      explanation: `La señal "${item[1]}" apunta directamente a la acción o lugar: ${item[3].toLowerCase()}.`,
      estimatedTimeSeconds: 18,
      icfesVocabularyTags: signTags,
    })
  );

  const vocab = LEVEL0_VOCAB.map((item, index) =>
    makeQuestion({
      id: `l0-vocab-${index + 1}`,
      level: 0,
      skill: 'vocabulary_basic',
      subskill: `essential:${item[0]}`,
      difficulty: 1,
      type: 'matching',
      prompt: item[1],
      options: [item[2], item[3], item[4], item[5]],
      correctAnswer: item[2],
      explanation: `"${item[2]}" es la palabra esencial que corresponde a la descripción.`,
      estimatedTimeSeconds: 20,
      icfesVocabularyTags: [...commonTags, ...travelTags, ...healthTags, ...foodTags, ...techTags],
    })
  );

  const functional = LEVEL0_FUNCTIONAL.map((item, index) =>
    makeQuestion({
      id: `l0-functional-${index + 1}`,
      level: 0,
      skill: 'functional_texts',
      subskill: item[0].toLowerCase(),
      difficulty: 1,
      type: 'multiple_choice',
      passage: item[1],
      prompt: item[2],
      options: [item[3], item[4], item[5], item[6]],
      correctAnswer: item[3],
      explanation: 'La respuesta está explícita en el texto funcional; basta identificar la acción solicitada.',
      estimatedTimeSeconds: 24,
      icfesVocabularyTags: [...commonTags, ...travelTags, ...healthTags, ...foodTags, ...techTags],
    })
  );

  const matching = LEVEL0_VOCAB.map((item, index) =>
    makeQuestion({
      id: `l0-match-${index + 1}`,
      level: 0,
      skill: 'scanning',
      subskill: `keyword:${item[0]}`,
      difficulty: 1,
      type: 'matching',
      passage: `Word bank: ${item[2]} · ${item[3]} · ${item[4]} · ${item[5]}`,
      prompt: `Choose the word that best matches this clue: ${item[1]}`,
      options: [item[5], item[3], item[2], item[4]],
      correctAnswer: item[2],
      explanation: 'En matching simple, compara la pista con cada palabra del banco y descarta las categorías que no coinciden.',
      estimatedTimeSeconds: 22,
      icfesVocabularyTags: commonTags,
    })
  );

  return [...signs, ...vocab, ...functional, ...matching];
}

const LEVEL1_DIALOGUES = [
  ['A: Where is the library?\nB: It is next to the science room.\nA: ___', 'What does A probably say?', 'Thanks, I will go there now.', 'I do not like science.', 'The library is closed forever.', 'My family is large.'],
  ['Waiter: Are you ready to order?\nCustomer: Yes, I would like soup, please.\nWaiter: ___', 'What does the waiter probably ask next?', 'Would you like something to drink?', 'Where is your homework?', 'Can you repair my phone?', 'Why are you late for class?'],
  ['Teacher: Please open your books on page 20.\nStudent: Sorry, I forgot my book.\nTeacher: ___', 'What is the best response?', 'You can share with Laura today.', 'The restaurant is open.', 'The bus leaves at six.', 'I need a doctor.'],
  ['Receptionist: Good morning. How can I help you?\nPatient: I need an appointment.\nReceptionist: ___', 'What should the receptionist say?', 'Is Thursday morning OK?', 'The menu is on the table.', 'The library has many books.', 'The password is wrong.'],
  ['Ana: Do you play basketball after school?\nLuis: Yes, on Mondays and Wednesdays.\nAna: ___', 'What is a natural reply?', 'Great, maybe I can join you.', 'No, I am a doctor.', 'The ticket is expensive.', 'Please recycle the bottle.'],
  ['Mother: What time is your English class?\nSon: It starts at 8:30.\nMother: ___', 'What is a natural response?', 'Then leave home early.', 'I am buying medicine.', 'The hotel is full.', 'Pollution is a problem.'],
  ['Tourist: Excuse me, is the museum near here?\nLocal: Yes, it is two blocks away.\nTourist: ___', 'What should the tourist say?', 'Thank you for your help.', 'I have two brothers.', 'The exam was difficult.', 'I lost my password.'],
  ['Friend: What do you usually do on weekends?\nYou: I visit my grandparents and play soccer.\nFriend: ___', 'What is the best continuation?', 'That sounds fun.', 'Turn left at the bank.', 'The medicine is strong.', 'Do not enter the room.'],
  ['Student: Can I use the computer?\nTeacher: Yes, but save your work.\nStudent: ___', 'What is the best reply?', 'OK, I will save it.', 'I want chicken soup.', 'The airport is busy.', 'The dog is small.'],
  ['Clerk: The blue shirt is on sale today.\nCustomer: Really? ___', 'What does the customer probably say?', 'How much is it?', 'Where is my class?', 'I need an appointment.', 'The website is slow.'],
] as const;

const LEVEL1_SENTENCES = [
  ['Every morning, Sofia ___ breakfast before school.', 'has', 'have', 'having', 'had', 'routines'],
  ['My brother ___ soccer on Saturdays.', 'plays', 'play', 'playing', 'played', 'sports'],
  ['There ___ two libraries in my town.', 'are', 'is', 'be', 'am', 'places'],
  ['We ___ English homework after class yesterday.', 'did', 'do', 'does', 'doing', 'school'],
  ['The students are ___ the classroom now.', 'in', 'on', 'at', 'to', 'school'],
  ['My aunt works ___ a hospital.', 'in', 'under', 'between', 'from', 'jobs'],
  ['The train leaves ___ 6:45.', 'at', 'on', 'in', 'from', 'schedules'],
  ['I usually go to school ___ bus.', 'by', 'on', 'in', 'with', 'travel'],
  ['She likes reading books ___ watching films.', 'and', 'because', 'so', 'although', 'hobbies'],
  ['The restaurant is closed, ___ we can cook at home.', 'so', 'but', 'although', 'instead of', 'food'],
] as const;

const LEVEL1_TEXTS = [
  ['Marta lives with her parents and two sisters. They have dinner together at 7 p.m. every day.', 'Who does Marta live with?', 'Her parents and two sisters', 'Only her grandparents', 'Her teacher and classmates', 'A doctor and a nurse', 'detail'],
  ['The school library opens at 8 a.m. and closes at 4 p.m. Students can borrow two books each week.', 'How many books can students borrow?', 'Two books each week', 'Four books every day', 'One book a month', 'No books at all', 'scanning'],
  ['Tom is tired because he studied until midnight for his English test.', 'Why is Tom tired?', 'Because he studied late', 'Because he went swimming', 'Because he missed the bus', 'Because he cooked dinner', 'detail'],
  ['Laura needs a new password for the school website. She should ask the computer teacher for help.', 'Who can help Laura?', 'The computer teacher', 'The waiter', 'The bus driver', 'The doctor', 'functional_texts'],
  ['The hotel reservation is for Friday night. Guests must arrive before 9 p.m.', 'When must guests arrive?', 'Before 9 p.m.', 'After midnight', 'On Sunday morning', 'At lunchtime', 'scanning'],
  ['Daniel is making a sandwich with bread, cheese and tomatoes. He reads the recipe carefully.', 'What is Daniel preparing?', 'A sandwich', 'A password', 'A school trip', 'A medicine label', 'detail'],
  ['The students are cleaning the park. They put plastic bottles in recycling bags.', 'What are the students doing?', 'Helping recycle in a park', 'Buying tickets', 'Taking medicine', 'Booking a hotel', 'main_idea'],
  ['The office schedule changed. The interview is now at 10 a.m., not 9 a.m.', 'What changed?', 'The interview time', 'The office address', 'The job title', 'The website password', 'detail'],
  ['Paula cannot go to class today because she has a doctor appointment.', 'Why is Paula absent?', 'She has a doctor appointment', 'She is travelling to the airport', 'She is cooking dinner', 'She lost a ticket', 'detail'],
  ['The sports club offers volleyball on Tuesdays and swimming on Fridays.', 'Which activity is on Fridays?', 'Swimming', 'Volleyball', 'Homework club', 'English class', 'scanning'],
] as const;

function level1Questions(): IcfesSmartQuestion[] {
  const dialogues = LEVEL1_DIALOGUES.map((item, index) =>
    makeQuestion({
      id: `l1-dialogue-${index + 1}`,
      level: 1,
      skill: 'dialogue_completion',
      subskill: 'daily-dialogue',
      difficulty: 1,
      type: 'multiple_choice',
      passage: item[0],
      prompt: item[1],
      options: [item[2], item[3], item[4], item[5]],
      correctAnswer: item[2],
      explanation: 'La respuesta correcta mantiene la situación comunicativa y responde al turno anterior de forma natural.',
      estimatedTimeSeconds: 27,
      icfesVocabularyTags: [...commonTags, ...healthTags, ...foodTags, ...dailyTags],
    })
  );

  const grammar = LEVEL1_SENTENCES.map((item, index) =>
    makeQuestion({
      id: `l1-grammar-${index + 1}`,
      level: 1,
      skill: item[5] === 'hobbies' || item[5] === 'food' ? 'connectors' : 'grammar_recognition',
      subskill: item[5],
      difficulty: 1,
      type: 'cloze',
      prompt: item[0],
      options: [item[1], item[2], item[3], item[4]],
      correctAnswer: item[1],
      explanation: 'La forma correcta se activa por la pista de tiempo, sujeto o relación lógica dentro de la oración.',
      estimatedTimeSeconds: 25,
      icfesVocabularyTags: [...commonTags, ...dailyTags],
    })
  );

  const texts = LEVEL1_TEXTS.map((item, index) =>
    makeQuestion({
      id: `l1-text-${index + 1}`,
      level: 1,
      skill: item[6] as IcfesSmartSkill,
      subskill: 'short-daily-text',
      difficulty: 1,
      type: 'multiple_choice',
      passage: item[0],
      prompt: item[1],
      options: [item[2], item[3], item[4], item[5]],
      correctAnswer: item[2],
      explanation: 'La información aparece de manera directa en el texto corto.',
      estimatedTimeSeconds: 30,
      icfesVocabularyTags: [...commonTags, ...travelTags, ...healthTags, ...foodTags, ...techTags],
    })
  );

  const paraphrases = LEVEL1_TEXTS.map((item, index) =>
    makeQuestion({
      id: `l1-para-${index + 1}`,
      level: 1,
      skill: 'paraphrase',
      subskill: 'simple-restatement',
      difficulty: 2,
      type: 'paraphrase',
      passage: item[0],
      prompt: 'Which sentence says the same idea?',
      options: [item[2], item[3], item[4], item[5]],
      correctAnswer: item[2],
      explanation: 'La opción correcta conserva la misma idea del texto con palabras más simples.',
      estimatedTimeSeconds: 30,
      icfesVocabularyTags: commonTags,
    })
  );

  return [...dialogues, ...grammar, ...texts, ...paraphrases];
}

const LEVEL2_CONNECTORS = [
  ['I was hungry, ___ I made a sandwich.', 'so', 'but', 'although', 'instead', 'result'],
  ['Sara likes science, ___ she does not like math.', 'but', 'because', 'so', 'also', 'contrast'],
  ['We stayed home ___ it was raining.', 'because', 'so', 'but', 'instead', 'cause'],
  ['The teacher explained the topic, ___ the students understood it.', 'so', 'although', 'but', 'however', 'result'],
  ['I wanted to buy the ticket, ___ I did not have enough money.', 'but', 'because', 'so', 'also', 'contrast'],
  ['The website was slow, ___ many students sent their homework late.', 'so', 'but', 'although', 'instead', 'result'],
  ['She took medicine ___ she had a headache.', 'because', 'but', 'so', 'however', 'cause'],
  ['The hotel was clean ___ comfortable.', 'and', 'because', 'although', 'therefore', 'addition'],
  ['He missed the bus, ___ he walked to school.', 'so', 'but', 'although', 'also', 'result'],
  ['The app is useful, ___ it needs a better password system.', 'but', 'so', 'because', 'therefore', 'contrast'],
] as const;

const LEVEL2_REFERENCES = [
  ['The students finished the science project. They presented it on Friday.', 'What does "it" refer to?', 'The science project', 'The students', 'Friday', 'The classroom'],
  ['Laura bought two tickets, but she lost them at the airport.', 'What does "them" refer to?', 'The tickets', 'The airport', 'Laura', 'The trip'],
  ['The library has new computers. They are faster than the old ones.', 'What does "They" refer to?', 'The new computers', 'The library', 'The students', 'The books'],
  ['Recycling bins are next to the entrance. Use these for plastic bottles.', 'What does "these" refer to?', 'Recycling bins', 'Plastic bottles', 'The entrance', 'The school'],
  ['My brother works at a hotel. He helps guests with reservations.', 'What does "He" refer to?', 'My brother', 'The hotel', 'Guests', 'Reservations'],
  ['The medicine is on the table. Do not take it without water.', 'What does "it" refer to?', 'The medicine', 'The table', 'Water', 'The doctor'],
  ['The animals were rescued yesterday. They are now safe.', 'What does "They" refer to?', 'The animals', 'The rescuers', 'Yesterday', 'The city'],
  ['The password was too simple. This caused a security problem.', 'What does "This" refer to?', 'The password being too simple', 'A new app', 'The user name', 'A school email'],
  ['The recipe includes eggs and milk. Those ingredients must be fresh.', 'What does "Those ingredients" refer to?', 'Eggs and milk', 'The recipe', 'The kitchen', 'Fresh vegetables'],
  ['The office changed its schedule. It now opens at 9 a.m.', 'What does "It" refer to?', 'The office', 'The schedule', 'The interview', 'The job'],
] as const;

const LEVEL2_GRAMMAR = [
  ['Last weekend, we ___ a school trip to the museum.', 'took', 'take', 'takes', 'taking'],
  ['She ___ English every afternoon.', 'studies', 'study', 'studying', 'studied yesterday'],
  ['There is not ___ pollution in this small town.', 'much', 'many', 'few', 'several'],
  ['The students ___ their homework when the teacher arrived.', 'were doing', 'do', 'does', 'have do'],
  ['I am interested ___ technology and apps.', 'in', 'on', 'at', 'of'],
  ['The interview ___ at 8 a.m. yesterday.', 'started', 'starts', 'starting', 'start'],
  ['You should ___ your password private.', 'keep', 'keeps', 'keeping', 'kept'],
  ['The medicine must be taken ___ breakfast.', 'after', 'many', 'because', 'also'],
  ['This menu is ___ than the old one.', 'better', 'best', 'good', 'well'],
  ['If you study daily, you ___ improve.', 'will', 'would', 'were', 'are'],
] as const;

const LEVEL2_CONTEXT = [
  ['The airport was crowded, so we arrived early to avoid missing the flight.', 'What does "crowded" mean?', 'Full of people', 'Very cheap', 'Completely closed', 'Easy to clean'],
  ['The doctor said the pain was mild and gave me simple medicine.', 'What does "mild" mean?', 'Not very serious', 'Very dangerous', 'Impossible to treat', 'Related to travel'],
  ['The students were proud because their recycling campaign worked.', 'What does "proud" mean?', 'Happy about an achievement', 'Afraid of a problem', 'Late for class', 'Unable to read'],
  ['The office is looking for reliable workers who arrive on time.', 'What does "reliable" mean?', 'People you can trust', 'People who travel often', 'People who cook fast', 'People who need medicine'],
  ['The app allows users to reset their password by email.', 'What does "reset" mean?', 'Create a new one', 'Share it publicly', 'Forget it forever', 'Print it on paper'],
  ['The hotel confirmed our reservation yesterday.', 'What does "confirmed" mean?', 'Said it was official', 'Cancelled immediately', 'Changed the price', 'Lost the tickets'],
  ['The recipe requires fresh vegetables.', 'What does "requires" mean?', 'Needs', 'Forgets', 'Sells', 'Repairs'],
  ['The teacher encouraged students to read for ten minutes every day.', 'What does "encouraged" mean?', 'Motivated', 'Punished', 'Ignored', 'Confused'],
  ['Pollution affects animals that live near rivers.', 'What does "affects" mean?', 'Has an impact on', 'Protects from danger', 'Travels with', 'Learns about'],
  ['The website provides useful information about scholarships.', 'What does "provides" mean?', 'Gives', 'Hides', 'Deletes', 'Breaks'],
] as const;

function level2Questions(): IcfesSmartQuestion[] {
  const connectors = LEVEL2_CONNECTORS.map((item, index) =>
    makeQuestion({
      id: `l2-connector-${index + 1}`,
      level: 2,
      skill: 'connectors',
      subskill: item[5],
      difficulty: 2,
      type: 'cloze',
      prompt: item[0],
      options: [item[1], item[2], item[3], item[4]],
      correctAnswer: item[1],
      explanation: `La oración necesita un conector de ${item[5]}; por eso la opción correcta mantiene la relación lógica.`,
      estimatedTimeSeconds: 28,
      icfesVocabularyTags: connectorTags,
    })
  );

  const references = LEVEL2_REFERENCES.map((item, index) =>
    makeQuestion({
      id: `l2-reference-${index + 1}`,
      level: 2,
      skill: 'reference_words',
      subskill: 'pronoun-reference',
      difficulty: 2,
      type: 'reference',
      passage: item[0],
      prompt: item[1],
      options: [item[2], item[3], item[4], item[5]],
      correctAnswer: item[2],
      explanation: 'El pronombre retoma el sustantivo anterior que coincide en número y sentido.',
      estimatedTimeSeconds: 32,
      icfesVocabularyTags: [...commonTags, ...travelTags, ...healthTags, ...techTags],
    })
  );

  const grammar = LEVEL2_GRAMMAR.map((item, index) =>
    makeQuestion({
      id: `l2-grammar-${index + 1}`,
      level: 2,
      skill: 'grammar_recognition',
      subskill: 'grammar-in-context',
      difficulty: 2,
      type: 'cloze',
      prompt: item[0],
      options: [item[1], item[2], item[3], item[4]],
      correctAnswer: item[1],
      explanation: 'La forma correcta se deduce por tiempo verbal, cantidad, preposición o estructura de la oración.',
      estimatedTimeSeconds: 30,
      icfesVocabularyTags: [...commonTags, ...travelTags, ...healthTags, ...workTags],
    })
  );

  const context = LEVEL2_CONTEXT.map((item, index) =>
    makeQuestion({
      id: `l2-context-${index + 1}`,
      level: 2,
      skill: 'vocabulary_context',
      subskill: 'meaning-from-context',
      difficulty: 2,
      type: 'multiple_choice',
      passage: item[0],
      prompt: item[1],
      options: [item[2], item[3], item[4], item[5]],
      correctAnswer: item[2],
      explanation: 'La pista de contexto alrededor de la palabra revela su sentido probable.',
      estimatedTimeSeconds: 33,
      icfesVocabularyTags: [...travelTags, ...healthTags, ...environmentTags, ...workTags, ...techTags],
    })
  );

  return [...connectors, ...references, ...grammar, ...context];
}

const LEVEL3_PASSAGES = [
  {
    topic: 'online learning',
    passage: 'Online learning gives students flexibility because they can study from home and organize their schedule. However, some students miss face-to-face interaction and need stronger study habits to stay focused.',
    main: 'Online learning has benefits but also requires discipline.',
    detail: 'Students can study from home.',
    inference: 'Some students may feel less motivated without classroom contact.',
    paraphrase: 'Students need good habits to succeed in virtual classes.',
  },
  {
    topic: 'recycling',
    passage: 'The school started a recycling program after students noticed too much plastic in the cafeteria. Instead of throwing bottles away, students now separate them in special bins near the entrance.',
    main: 'A school program helps students reduce plastic waste.',
    detail: 'The bins are near the entrance.',
    inference: 'Students helped identify an environmental problem at school.',
    paraphrase: 'Students put plastic bottles in separate containers.',
  },
  {
    topic: 'public libraries',
    passage: 'Public libraries are no longer only places for books. They also offer internet access, language clubs and workshops for job interviews. Therefore, they are useful for people with different goals.',
    main: 'Libraries provide several services beyond books.',
    detail: 'They offer workshops for job interviews.',
    inference: 'Libraries can support both education and employment.',
    paraphrase: 'Libraries help people in more than one area of life.',
  },
  {
    topic: 'healthy food',
    passage: 'Many teenagers prefer fast food because it is cheap and quick. Although it is convenient, eating it every day can cause health problems. Schools are adding healthier options to their menus.',
    main: 'Fast food is convenient, but schools are promoting healthier choices.',
    detail: 'Teenagers often choose fast food because it is cheap and quick.',
    inference: 'Schools are concerned about students’ eating habits.',
    paraphrase: 'Schools are offering food that is better for students’ health.',
  },
  {
    topic: 'travel apps',
    passage: 'Travel apps help tourists compare prices, reserve hotels and find routes. However, users should protect their passwords and check if the website is official before paying online.',
    main: 'Travel apps are useful, but users must be careful online.',
    detail: 'Apps can help reserve hotels.',
    inference: 'Some online travel services may be unsafe.',
    paraphrase: 'People should verify a site before making an online payment.',
  },
  {
    topic: 'school sports',
    passage: 'The school sports club increased participation by offering volleyball, soccer and swimming at different times. This change allowed students with busy schedules to join at least one activity.',
    main: 'Flexible schedules helped more students join sports.',
    detail: 'The club offers volleyball, soccer and swimming.',
    inference: 'Some students could not participate before because of time conflicts.',
    paraphrase: 'More timetable options made sports more accessible.',
  },
  {
    topic: 'doctor appointments',
    passage: 'The local clinic now lets patients book appointments online. This has reduced waiting lines in the morning, although older patients sometimes need help using the website.',
    main: 'Online appointments made the clinic faster but not equally easy for everyone.',
    detail: 'Morning waiting lines have decreased.',
    inference: 'Some patients may not feel confident with technology.',
    paraphrase: 'Booking on the website has made the clinic service more efficient.',
  },
  {
    topic: 'homework habits',
    passage: 'Students who divide homework into short sessions often remember more information. In contrast, those who study only the night before an exam usually feel stressed and forget details.',
    main: 'Short regular study sessions are more effective than last-minute study.',
    detail: 'Last-minute study can make students feel stressed.',
    inference: 'A study plan can improve exam performance.',
    paraphrase: 'Studying little by little helps students retain information.',
  },
  {
    topic: 'animals',
    passage: 'A group of students created posters about endangered animals. Their campaign asked people not to buy products made from wild species and to report illegal wildlife trade.',
    main: 'Students campaigned to protect endangered animals.',
    detail: 'The posters asked people to report illegal wildlife trade.',
    inference: 'Buying wildlife products can harm endangered species.',
    paraphrase: 'The campaign discouraged products made from wild animals.',
  },
  {
    topic: 'job interviews',
    passage: 'Before a job interview, applicants should research the company and prepare examples of their skills. In addition, arriving on time shows respect and responsibility.',
    main: 'Good interview preparation includes research, examples and punctuality.',
    detail: 'Applicants should research the company.',
    inference: 'Employers may value punctual candidates.',
    paraphrase: 'Being on time can create a positive impression.',
  },
] as const;

function level3Questions(): IcfesSmartQuestion[] {
  return LEVEL3_PASSAGES.flatMap((item, index) => [
    makeQuestion({
      id: `l3-main-${index + 1}`,
      level: 3,
      skill: 'main_idea',
      subskill: item.topic,
      difficulty: 3,
      type: 'multiple_choice',
      passage: item.passage,
      prompt: 'What is the main idea of the text?',
      options: [item.main, item.detail, 'The text only gives a date and a place.', 'The text mainly describes a personal problem with no solution.'],
      correctAnswer: item.main,
      explanation: 'La idea principal resume el texto completo, incluyendo sus dos lados o su propósito general.',
      estimatedTimeSeconds: 36,
      icfesVocabularyTags: [...commonTags, ...environmentTags, ...workTags, ...techTags],
    }),
    makeQuestion({
      id: `l3-detail-${index + 1}`,
      level: 3,
      skill: 'detail',
      subskill: item.topic,
      difficulty: 3,
      type: 'multiple_choice',
      passage: item.passage,
      prompt: 'Which detail is mentioned in the text?',
      options: [item.detail, 'Students must pay a high fee.', 'The activity was cancelled permanently.', 'The text says the problem has no cause.'],
      correctAnswer: item.detail,
      explanation: 'El detalle correcto aparece en el texto; las demás opciones agregan información no mencionada.',
      estimatedTimeSeconds: 34,
      icfesVocabularyTags: commonTags,
    }),
    makeQuestion({
      id: `l3-inference-${index + 1}`,
      level: 3,
      skill: 'inference',
      subskill: item.topic,
      difficulty: 3,
      type: 'multiple_choice',
      passage: item.passage,
      prompt: 'What can be inferred from the text?',
      options: [item.inference, 'The writer thinks the topic is completely useless.', 'The situation only affects tourists.', 'The text says students never need help.'],
      correctAnswer: item.inference,
      explanation: 'La inferencia correcta se apoya en una pista del texto sin contradecirla.',
      estimatedTimeSeconds: 38,
      icfesVocabularyTags: [...dailyTags, ...environmentTags, ...techTags],
    }),
    makeQuestion({
      id: `l3-paraphrase-${index + 1}`,
      level: 3,
      skill: 'paraphrase',
      subskill: item.topic,
      difficulty: 3,
      type: 'paraphrase',
      passage: item.passage,
      prompt: 'Which option best paraphrases one important idea from the text?',
      options: [item.paraphrase, 'The text says the opposite of its central message.', 'The writer only describes prices and addresses.', 'The text focuses on a topic not mentioned in the passage.'],
      correctAnswer: item.paraphrase,
      explanation: 'La paráfrasis mantiene la misma idea, aunque cambia las palabras originales.',
      estimatedTimeSeconds: 39,
      icfesVocabularyTags: connectorTags,
    }),
  ]);
}

const LEVEL4_PASSAGES = [
  {
    topic: 'urban transport',
    passage: 'Several Colombian cities are expanding bike lanes to reduce traffic and pollution. Supporters say the plan offers a cheaper and healthier way to move around. Critics, however, argue that bike lanes are unsafe unless drivers also receive road-safety education.',
    purpose: 'To present benefits and concerns about bike lanes',
    tone: 'Balanced and informative',
    inference: 'Infrastructure alone may not be enough to make cycling safe.',
    distractor: 'It mentions pollution, but it is not only about air quality.',
  },
  {
    topic: 'scholarships',
    passage: 'A local foundation offers scholarships to students from rural areas who have strong academic records. The program covers tuition and transport, but students must volunteer in their communities twice a month.',
    purpose: 'To describe the conditions of a scholarship program',
    tone: 'Informative and practical',
    inference: 'The foundation expects students to give something back to their communities.',
    distractor: 'The scholarship is not open to all students without conditions.',
  },
  {
    topic: 'digital security',
    passage: 'Teenagers often use the same password for games, email and school platforms. This habit is convenient, but it increases the risk of losing access to several accounts if one password is stolen.',
    purpose: 'To warn about a risky digital habit',
    tone: 'Cautious',
    inference: 'Using different passwords can reduce the impact of one security problem.',
    distractor: 'The text is not advertising a new game or app.',
  },
  {
    topic: 'healthy sleep',
    passage: 'Researchers have found that students who sleep fewer than six hours often perform worse on memory tasks. Although extra study time may seem useful, replacing sleep with study can damage concentration the next day.',
    purpose: 'To explain why sleep matters for academic performance',
    tone: 'Advisory and evidence-based',
    inference: 'Studying all night can be counterproductive.',
    distractor: 'The text does not say students should stop studying.',
  },
  {
    topic: 'tourism',
    passage: 'Community tourism can bring income to small towns and help visitors learn about local culture. Nevertheless, it must be managed carefully so that traditions are respected and natural areas are not damaged.',
    purpose: 'To discuss advantages and responsibilities of community tourism',
    tone: 'Thoughtful and cautious',
    inference: 'Tourism can harm communities if it grows without planning.',
    distractor: 'The text does not reject all forms of tourism.',
  },
  {
    topic: 'food waste',
    passage: 'Many restaurants now donate unsold food to local organizations instead of throwing it away. The practice reduces waste and supports families in need, but it requires careful storage to keep food safe.',
    purpose: 'To explain a solution to food waste and its requirement',
    tone: 'Positive but careful',
    inference: 'Food donation programs need health controls.',
    distractor: 'The text is not mainly about restaurant prices.',
  },
  {
    topic: 'reading habits',
    passage: 'Short reading challenges have become popular in schools because they make reading feel achievable. Instead of asking students to finish long books immediately, teachers set weekly goals and celebrate progress.',
    purpose: 'To show how schools encourage reading through smaller goals',
    tone: 'Encouraging',
    inference: 'Small goals can make students feel more confident about reading.',
    distractor: 'The text does not claim long books are bad.',
  },
  {
    topic: 'water access',
    passage: 'In some rural communities, students miss class because they must help their families collect water. New water filters in schools have improved attendance, although homes still need long-term solutions.',
    purpose: 'To describe how water access affects education',
    tone: 'Concerned and factual',
    inference: 'School-based solutions help but do not solve the whole problem.',
    distractor: 'The text is not about students avoiding school for fun.',
  },
  {
    topic: 'remote work',
    passage: 'Remote work allows people to avoid long commutes and organize their time more freely. However, some workers report feeling isolated when communication depends only on messages and video calls.',
    purpose: 'To compare advantages and disadvantages of remote work',
    tone: 'Balanced',
    inference: 'Flexibility does not automatically create better social connection.',
    distractor: 'The text does not say remote work is impossible.',
  },
  {
    topic: 'exam strategy',
    passage: 'Students sometimes choose an answer because it repeats words from the text. In reading exams, this can be dangerous: a distractor may copy vocabulary but change the meaning or purpose of the original sentence.',
    purpose: 'To warn students about a common reading-test mistake',
    tone: 'Strategic and cautionary',
    inference: 'Students should compare meaning, not only repeated words.',
    distractor: 'The text does not recommend choosing the longest answer.',
  },
] as const;

function level4Questions(): IcfesSmartQuestion[] {
  return LEVEL4_PASSAGES.flatMap((item, index) => [
    makeQuestion({
      id: `l4-purpose-${index + 1}`,
      level: 4,
      skill: 'purpose',
      subskill: item.topic,
      difficulty: 4,
      type: 'multiple_choice',
      passage: item.passage,
      prompt: 'What is the main purpose of the text?',
      options: [item.purpose, 'To tell a fictional story with a surprising ending', 'To give personal instructions for a private event', 'To compare two unrelated historical facts'],
      correctAnswer: item.purpose,
      explanation: 'El propósito se identifica por la función global del texto: explicar, advertir, comparar o presentar una postura.',
      estimatedTimeSeconds: 40,
      icfesVocabularyTags: [...environmentTags, ...workTags, ...techTags, ...connectorTags],
    }),
    makeQuestion({
      id: `l4-tone-${index + 1}`,
      level: 4,
      skill: 'tone',
      subskill: item.topic,
      difficulty: 4,
      type: 'multiple_choice',
      passage: item.passage,
      prompt: 'Which word best describes the tone of the text?',
      options: [item.tone, 'Angry and insulting', 'Comic and exaggerated', 'Completely indifferent'],
      correctAnswer: item.tone,
      explanation: 'El tono se reconoce por la postura del autor y las palabras que muestran valoración o cautela.',
      estimatedTimeSeconds: 38,
      icfesVocabularyTags: connectorTags,
    }),
    makeQuestion({
      id: `l4-inference-${index + 1}`,
      level: 4,
      skill: 'inference',
      subskill: item.topic,
      difficulty: 4,
      type: 'multiple_choice',
      passage: item.passage,
      prompt: 'What can be inferred from the text?',
      options: [item.inference, 'The problem has already disappeared completely.', 'The author gives no reason for the situation.', 'Only one group is affected and no one else matters.'],
      correctAnswer: item.inference,
      explanation: 'La inferencia correcta combina una pista explícita con una conclusión prudente.',
      estimatedTimeSeconds: 42,
      icfesVocabularyTags: [...commonTags, ...environmentTags, ...workTags],
    }),
    makeQuestion({
      id: `l4-distractor-${index + 1}`,
      level: 4,
      skill: 'time_management',
      subskill: 'distractor-analysis',
      difficulty: 4,
      type: 'multiple_choice',
      passage: item.passage,
      prompt: 'Why would one tempting wrong answer be incorrect?',
      options: [item.distractor, 'Because every word from the passage is always wrong', 'Because the text has no topic sentence at all', 'Because ICFES never asks about purpose or tone'],
      correctAnswer: item.distractor,
      explanation: 'En ICFES, muchos distractores repiten una palabra del texto pero cambian el alcance o la intención.',
      estimatedTimeSeconds: 44,
      icfesVocabularyTags: connectorTags,
    }),
  ]);
}

const LEVEL5_BLOCKS = [
  {
    topic: 'airport delay',
    passage: 'Flight 204 to Medellín is delayed due to weather conditions. Passengers with connections before 6 p.m. should go to the service desk immediately. Meal vouchers will be available after 90 minutes of delay.',
    scan: 'Passengers with connections before 6 p.m.',
    strategy: 'Go to the service desk immediately',
    trap: 'Meal vouchers are not available immediately.',
  },
  {
    topic: 'school email',
    passage: 'Dear students, the English mock exam will begin at 7:30 a.m. in Room 301. Bring your ID and a pencil. Dictionaries, phones and smart watches are not allowed during the test.',
    scan: 'Room 301',
    strategy: 'Bring ID and a pencil, but no electronic devices',
    trap: 'The email bans dictionaries and devices, not pencils.',
  },
  {
    topic: 'clinic instructions',
    passage: 'Patients taking this medicine should drink plenty of water and avoid driving if they feel sleepy. If symptoms continue after three days, contact your doctor before increasing the dose.',
    scan: 'After three days',
    strategy: 'Contact the doctor before increasing the dose',
    trap: 'The text does not say to take more medicine automatically.',
  },
  {
    topic: 'job announcement',
    passage: 'The office assistant position requires basic English, punctuality and experience with spreadsheets. Interviews will be held on Thursday morning. Applicants must upload their CV by Tuesday night.',
    scan: 'By Tuesday night',
    strategy: 'Upload the CV before the interview day',
    trap: 'The interview is Thursday, but the CV deadline is Tuesday night.',
  },
  {
    topic: 'environment campaign',
    passage: 'The city campaign invites families to reduce plastic use by bringing reusable bags to supermarkets. Participants can register online and receive a recycling guide by email.',
    scan: 'Register online',
    strategy: 'Use reusable bags and check the emailed guide',
    trap: 'The campaign reduces plastic use; it does not promote plastic bags.',
  },
  {
    topic: 'hotel notice',
    passage: 'Guests who need airport transportation must request it at reception before 8 p.m. The service is free for reservations of three nights or more; otherwise, a small fee applies.',
    scan: 'Before 8 p.m.',
    strategy: 'Ask reception before the deadline and check the reservation length',
    trap: 'The service is not free for every guest.',
  },
  {
    topic: 'library workshop',
    passage: 'The public library will offer a free workshop on writing scholarship emails. Places are limited to 25 students, and registration closes when all seats are filled.',
    scan: '25 students',
    strategy: 'Register early because places are limited',
    trap: 'The workshop is free, but it still requires registration.',
  },
  {
    topic: 'restaurant policy',
    passage: 'Online orders can be changed within five minutes of payment. After that time, the kitchen begins preparing the food and changes are no longer possible.',
    scan: 'Within five minutes of payment',
    strategy: 'Review the order quickly after paying',
    trap: 'Changes are limited by time, not by the type of food.',
  },
  {
    topic: 'app security',
    passage: 'For security reasons, the app sends a verification code whenever users log in from a new device. Never share this code, even if a message says your account will be closed.',
    scan: 'A new device',
    strategy: 'Do not share the verification code',
    trap: 'Threatening messages may be scams.',
  },
  {
    topic: 'exam pacing',
    passage: 'In the English section, students should not spend too long on one difficult question. It is better to mark the best option, continue, and return later if time remains.',
    scan: 'One difficult question',
    strategy: 'Move on and return later if possible',
    trap: 'The advice is not to leave every difficult question blank.',
  },
] as const;

function level5Questions(): IcfesSmartQuestion[] {
  return LEVEL5_BLOCKS.flatMap((item, index) => [
    makeQuestion({
      id: `l5-scan-${index + 1}`,
      level: 5,
      skill: 'scanning',
      subskill: item.topic,
      difficulty: 5,
      type: 'timed_reading',
      passage: item.passage,
      prompt: 'Find the key detail quickly. Which detail answers the question?',
      options: [item.scan, 'A detail from another topic', 'A number not included in the text', 'A personal opinion from the reader'],
      correctAnswer: item.scan,
      explanation: 'Para scanning, busca fechas, lugares, límites o condiciones antes de leer palabra por palabra.',
      estimatedTimeSeconds: 34,
      icfesVocabularyTags: [...travelTags, ...healthTags, ...workTags, ...techTags],
    }),
    makeQuestion({
      id: `l5-strategy-${index + 1}`,
      level: 5,
      skill: 'time_management',
      subskill: item.topic,
      difficulty: 5,
      type: 'timed_reading',
      passage: item.passage,
      prompt: 'What is the best action according to the text?',
      options: [item.strategy, 'Ignore the condition and choose later', 'Choose the option with the most words', 'Use outside knowledge instead of the text'],
      correctAnswer: item.strategy,
      explanation: 'La estrategia correcta sigue la condición específica del texto y evita decisiones por intuición.',
      estimatedTimeSeconds: 42,
      icfesVocabularyTags: connectorTags,
    }),
    makeQuestion({
      id: `l5-trap-${index + 1}`,
      level: 5,
      skill: 'inference',
      subskill: 'trap-control',
      difficulty: 5,
      type: 'multiple_choice',
      passage: item.passage,
      prompt: 'Which observation helps avoid a distractor?',
      options: [item.trap, 'Any repeated word proves the option is correct.', 'The longest option is normally the safest answer.', 'The first option should be selected to save time.'],
      correctAnswer: item.trap,
      explanation: 'Controlar distractores exige verificar condiciones, excepciones y límites de tiempo.',
      estimatedTimeSeconds: 44,
      icfesVocabularyTags: [...connectorTags, ...techTags],
    }),
    makeQuestion({
      id: `l5-order-${index + 1}`,
      level: 5,
      skill: 'sentence_order',
      subskill: item.topic,
      difficulty: 5,
      type: 'dialogue_order',
      passage: item.passage,
      prompt: 'Which order is the most efficient reading strategy?',
      options: ['Read the question, scan for the key detail, then verify the option', 'Translate every word before reading the question', 'Pick the option that repeats the first noun', 'Skip the text and answer from memory'],
      correctAnswer: 'Read the question, scan for the key detail, then verify the option',
      explanation: 'En bloques cronometrados, primero ubica la demanda de la pregunta, luego escanea y finalmente verifica.',
      estimatedTimeSeconds: 40,
      icfesVocabularyTags: connectorTags,
    }),
  ]);
}

export const DIAGNOSTIC_QUESTIONS: IcfesSmartQuestion[] = [
  makeQuestion({
    id: 'diag-01',
    level: 0,
    skill: 'functional_texts',
    subskill: 'signs',
    difficulty: 1,
    type: 'multiple_choice',
    passage: 'NO ENTRY\nStaff only',
    prompt: 'What does this sign mean?',
    options: ['Only workers can go in', 'Visitors can enter freely', 'The shop is open', 'People should speak quietly'],
    correctAnswer: 'Only workers can go in',
    explanation: '"Staff only" indica que el espacio es solo para trabajadores.',
    estimatedTimeSeconds: 18,
    icfesVocabularyTags: signTags,
  }),
  makeQuestion({
    id: 'diag-02',
    level: 0,
    skill: 'vocabulary_basic',
    subskill: 'school',
    difficulty: 1,
    type: 'matching',
    prompt: 'A place where students borrow books is a...',
    options: ['library', 'ticket', 'medicine', 'restaurant'],
    correctAnswer: 'library',
    explanation: 'La palabra que corresponde a libros y préstamo escolar es "library".',
    estimatedTimeSeconds: 18,
    icfesVocabularyTags: commonTags,
  }),
  makeQuestion({
    id: 'diag-03',
    level: 1,
    skill: 'dialogue_completion',
    subskill: 'restaurant',
    difficulty: 1,
    type: 'multiple_choice',
    passage: 'Waiter: Are you ready to order?\nCustomer: Yes, I would like chicken soup, please.\nWaiter: ___',
    prompt: 'What does the waiter probably say next?',
    options: ['Anything to drink?', 'Where is your homework?', 'The airport is closed.', 'I lost my password.'],
    correctAnswer: 'Anything to drink?',
    explanation: 'En un restaurante, después de pedir comida es natural preguntar por la bebida.',
    estimatedTimeSeconds: 24,
    icfesVocabularyTags: foodTags,
  }),
  makeQuestion({
    id: 'diag-04',
    level: 1,
    skill: 'grammar_recognition',
    subskill: 'present-simple',
    difficulty: 1,
    type: 'cloze',
    prompt: 'She ___ to school by bus every morning.',
    options: ['goes', 'go', 'going', 'gone'],
    correctAnswer: 'goes',
    explanation: 'Con "she" en present simple se usa "goes".',
    estimatedTimeSeconds: 22,
    icfesVocabularyTags: commonTags,
  }),
  makeQuestion({
    id: 'diag-05',
    level: 2,
    skill: 'connectors',
    subskill: 'cause-result',
    difficulty: 2,
    type: 'cloze',
    prompt: 'I was sick, ___ I did not go to school.',
    options: ['so', 'but', 'although', 'instead'],
    correctAnswer: 'so',
    explanation: '"So" introduce el resultado: estaba enfermo, por eso no fue al colegio.',
    estimatedTimeSeconds: 25,
    icfesVocabularyTags: connectorTags,
  }),
  makeQuestion({
    id: 'diag-06',
    level: 2,
    skill: 'reference_words',
    subskill: 'it',
    difficulty: 2,
    type: 'reference',
    passage: 'The teacher gave us a project. It is due on Friday.',
    prompt: 'What does "It" refer to?',
    options: ['The project', 'The teacher', 'Friday', 'The class'],
    correctAnswer: 'The project',
    explanation: '"It" retoma el sustantivo singular anterior: "a project".',
    estimatedTimeSeconds: 28,
    icfesVocabularyTags: commonTags,
  }),
  makeQuestion({
    id: 'diag-07',
    level: 2,
    skill: 'vocabulary_context',
    subskill: 'health',
    difficulty: 2,
    type: 'multiple_choice',
    passage: 'The medicine reduced the pain after twenty minutes.',
    prompt: 'What does "reduced" mean?',
    options: ['Made it less', 'Made it worse', 'Started it', 'Ignored it'],
    correctAnswer: 'Made it less',
    explanation: 'La pista "pain after twenty minutes" muestra que el dolor bajó.',
    estimatedTimeSeconds: 30,
    icfesVocabularyTags: healthTags,
  }),
  makeQuestion({
    id: 'diag-08',
    level: 3,
    skill: 'main_idea',
    subskill: 'environment',
    difficulty: 3,
    type: 'multiple_choice',
    passage: 'Many schools are reducing plastic waste. Students bring reusable bottles, and cafeterias use fewer plastic bags. These actions help protect the environment.',
    prompt: 'What is the main idea?',
    options: ['Schools are taking actions to reduce plastic waste', 'Students dislike cafeterias', 'Plastic bags are cheaper than bottles', 'The text is about sports'],
    correctAnswer: 'Schools are taking actions to reduce plastic waste',
    explanation: 'La idea principal reúne todas las acciones mencionadas contra el plástico.',
    estimatedTimeSeconds: 34,
    icfesVocabularyTags: environmentTags,
  }),
  makeQuestion({
    id: 'diag-09',
    level: 3,
    skill: 'detail',
    subskill: 'travel',
    difficulty: 3,
    type: 'multiple_choice',
    passage: 'The museum trip is on Thursday. Students must bring lunch and arrive at school by 6:45 a.m.',
    prompt: 'What must students bring?',
    options: ['Lunch', 'A hotel reservation', 'Medicine', 'A new password'],
    correctAnswer: 'Lunch',
    explanation: 'El detalle explícito dice "must bring lunch".',
    estimatedTimeSeconds: 30,
    icfesVocabularyTags: [...commonTags, ...travelTags],
  }),
  makeQuestion({
    id: 'diag-10',
    level: 3,
    skill: 'inference',
    subskill: 'study-habits',
    difficulty: 3,
    type: 'multiple_choice',
    passage: 'Carlos studies English for fifteen minutes every day. He says long sessions make him tired, but short practice helps him remember words.',
    prompt: 'What can be inferred?',
    options: ['Carlos prefers short regular practice', 'Carlos never studies English', 'Carlos only studies before exams', 'Carlos dislikes learning words'],
    correctAnswer: 'Carlos prefers short regular practice',
    explanation: 'La inferencia se apoya en "short practice helps him remember words".',
    estimatedTimeSeconds: 35,
    icfesVocabularyTags: commonTags,
  }),
  makeQuestion({
    id: 'diag-11',
    level: 3,
    skill: 'paraphrase',
    subskill: 'technology',
    difficulty: 3,
    type: 'paraphrase',
    passage: 'Users should not share their password with anyone.',
    prompt: 'Which sentence has the same meaning?',
    options: ['People must keep their password private', 'People should send their password by email', 'Passwords are not necessary', 'Everyone can use the same account'],
    correctAnswer: 'People must keep their password private',
    explanation: '"Keep private" expresa la misma idea que "not share".',
    estimatedTimeSeconds: 30,
    icfesVocabularyTags: techTags,
  }),
  makeQuestion({
    id: 'diag-12',
    level: 4,
    skill: 'purpose',
    subskill: 'notice',
    difficulty: 4,
    type: 'multiple_choice',
    passage: 'Due to repairs, the computer room will be closed on Monday. Students who need to print homework should use the library computers.',
    prompt: 'What is the purpose of the notice?',
    options: ['To inform students about a temporary change', 'To advertise a new computer game', 'To invite parents to a meeting', 'To explain how computers are built'],
    correctAnswer: 'To inform students about a temporary change',
    explanation: 'El aviso comunica un cierre temporal y una alternativa.',
    estimatedTimeSeconds: 36,
    icfesVocabularyTags: [...commonTags, ...techTags],
  }),
  makeQuestion({
    id: 'diag-13',
    level: 4,
    skill: 'tone',
    subskill: 'health',
    difficulty: 4,
    type: 'multiple_choice',
    passage: 'Doctors warn that teenagers should not ignore constant headaches, especially when they affect sleep or school performance.',
    prompt: 'What is the tone?',
    options: ['Concerned', 'Humorous', 'Celebratory', 'Indifferent'],
    correctAnswer: 'Concerned',
    explanation: 'El verbo "warn" y el problema de salud muestran preocupación.',
    estimatedTimeSeconds: 34,
    icfesVocabularyTags: healthTags,
  }),
  makeQuestion({
    id: 'diag-14',
    level: 4,
    skill: 'connectors',
    subskill: 'contrast',
    difficulty: 4,
    type: 'cloze',
    prompt: 'The app is easy to use. ___, it does not protect personal data well.',
    options: ['However', 'Therefore', 'Because', 'Also'],
    correctAnswer: 'However',
    explanation: '"However" contrasta una ventaja con una limitación.',
    estimatedTimeSeconds: 30,
    icfesVocabularyTags: connectorTags,
  }),
  makeQuestion({
    id: 'diag-15',
    level: 4,
    skill: 'sentence_order',
    subskill: 'cohesion',
    difficulty: 4,
    type: 'dialogue_order',
    passage: '1. Finally, they presented the results.\n2. First, students collected information.\n3. Then, they organized the data in charts.',
    prompt: 'What is the logical order?',
    options: ['2 - 3 - 1', '1 - 2 - 3', '3 - 1 - 2', '2 - 1 - 3'],
    correctAnswer: '2 - 3 - 1',
    explanation: 'El orden lógico usa marcadores: First, Then, Finally.',
    estimatedTimeSeconds: 35,
    icfesVocabularyTags: commonTags,
  }),
  makeQuestion({
    id: 'diag-16',
    level: 5,
    skill: 'scanning',
    subskill: 'time',
    difficulty: 5,
    type: 'timed_reading',
    passage: 'Registration closes on March 31. Applicants must upload their ID, grades and recommendation letter before midnight.',
    prompt: 'What date is the deadline?',
    options: ['March 31', 'Before midnight every day', 'April 30', 'The recommendation letter'],
    correctAnswer: 'March 31',
    explanation: 'Scanning busca la fecha exacta junto a "closes".',
    estimatedTimeSeconds: 26,
    icfesVocabularyTags: workTags,
  }),
  makeQuestion({
    id: 'diag-17',
    level: 5,
    skill: 'time_management',
    subskill: 'distractor',
    difficulty: 5,
    type: 'multiple_choice',
    passage: 'A product may be returned within seven days only if it is unused and the receipt is included.',
    prompt: 'Which condition is necessary?',
    options: ['The product must be unused and have the receipt', 'The product can be used for seven days', 'No receipt is necessary', 'Returns are possible after a month'],
    correctAnswer: 'The product must be unused and have the receipt',
    explanation: 'La palabra "only if" introduce condiciones obligatorias.',
    estimatedTimeSeconds: 38,
    icfesVocabularyTags: ['sale', ...connectorTags],
  }),
  makeQuestion({
    id: 'diag-18',
    level: 5,
    skill: 'inference',
    subskill: 'author-intention',
    difficulty: 5,
    type: 'multiple_choice',
    passage: 'The writer says that copying text from the internet may seem fast, but it prevents students from developing their own ideas.',
    prompt: 'What does the writer suggest?',
    options: ['Students should write using their own thinking', 'Copying always improves learning', 'The internet should not be used for research', 'Fast work is always better'],
    correctAnswer: 'Students should write using their own thinking',
    explanation: 'La crítica a copiar apunta a valorar ideas propias.',
    estimatedTimeSeconds: 40,
    icfesVocabularyTags: commonTags,
  }),
  makeQuestion({
    id: 'diag-19',
    level: 2,
    skill: 'functional_texts',
    subskill: 'email',
    difficulty: 2,
    type: 'multiple_choice',
    passage: 'Hi Juan,\nThe meeting was moved to 4 p.m. Please tell your team.\nLaura',
    prompt: 'What should Juan do?',
    options: ['Inform his team about the new time', 'Cancel the meeting', 'Buy a ticket', 'Send medicine to Laura'],
    correctAnswer: 'Inform his team about the new time',
    explanation: 'El email pide comunicar el cambio de hora.',
    estimatedTimeSeconds: 28,
    icfesVocabularyTags: workTags,
  }),
  makeQuestion({
    id: 'diag-20',
    level: 3,
    skill: 'dialogue_completion',
    subskill: 'advice',
    difficulty: 3,
    type: 'multiple_choice',
    passage: 'Student: I understand the text, but I always choose between two similar options.\nTutor: ___',
    prompt: 'What is the best advice?',
    options: ['Compare the exact meaning, not just repeated words', 'Always pick the longest option', 'Never read the question first', 'Choose quickly without checking'],
    correctAnswer: 'Compare the exact meaning, not just repeated words',
    explanation: 'El problema describe distractores; la solución es comparar significado y alcance.',
    estimatedTimeSeconds: 36,
    icfesVocabularyTags: connectorTags,
  }),
];

export const ICFES_SMART_QUESTIONS: IcfesSmartQuestion[] = [
  ...level0Questions(),
  ...level1Questions(),
  ...level2Questions(),
  ...level3Questions(),
  ...level4Questions(),
  ...level5Questions(),
];

export const ICFES_SMART_QUESTIONS_BY_ID: Record<string, IcfesSmartQuestion> =
  Object.fromEntries(
    [...DIAGNOSTIC_QUESTIONS, ...ICFES_SMART_QUESTIONS].map((question) => [question.id, question])
  );

export const ICFES_SMART_BANK_SUMMARY = {
  diagnostic: DIAGNOSTIC_QUESTIONS.length,
  perLevel: ([0, 1, 2, 3, 4, 5] as IcfesSmartLevel[]).reduce<Record<IcfesSmartLevel, number>>(
    (acc, level) => {
      acc[level] = ICFES_SMART_QUESTIONS.filter((question) => question.level === level).length;
      return acc;
    },
    { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
  ),
  total: DIAGNOSTIC_QUESTIONS.length + ICFES_SMART_QUESTIONS.length,
};
