import type { IcfesPracticeQuestion } from './questions';

export interface PartOneGuidedExample {
  id: string;
  definition: string;
  wordBank: string[];
  answer: string;
  decisiveClue: string;
  reasoning: string;
  distractor: string;
}

export interface PartOneExampleGroup {
  id: string;
  label: string;
  subtitle: string;
  icon: string;
  examples: PartOneGuidedExample[];
}

export interface PartOnePracticeStage {
  id: string;
  label: string;
  shortLabel: string;
  focus: string;
  questions: IcfesPracticeQuestion[];
}

export const PART_ONE_EXAMPLE_GROUPS: PartOneExampleGroup[] = [
  {
    id: 'places',
    label: 'Lugares',
    subtitle: 'Reconoce el lugar por la acción que ocurre allí.',
    icon: '⌂',
    examples: [
      {
        id: 'places-library',
        definition: 'You go to this place when you need to borrow a book.',
        wordBank: ['bakery', 'hospital', 'library', 'market', 'pharmacy', 'stadium', 'station', 'theater'],
        answer: 'library',
        decisiveClue: 'borrow a book',
        reasoning: 'Una biblioteca presta libros. La acción borrow diferencia este lugar de cualquier sitio donde también pueda haber libros.',
        distractor: 'Theater y stadium son lugares públicos, pero no cumplen la acción específica de prestar libros.',
      },
      {
        id: 'places-pharmacy',
        definition: 'People buy medicine here when they are ill.',
        wordBank: ['airport', 'bakery', 'bank', 'clinic', 'factory', 'pharmacy', 'restaurant', 'school'],
        answer: 'pharmacy',
        decisiveClue: 'buy medicine',
        reasoning: 'Medicine señala el campo de salud y buy indica un establecimiento comercial: pharmacy.',
        distractor: 'Clinic parece cercana por ill, pero allí las personas reciben atención; la definición exige comprar medicamentos.',
      },
      {
        id: 'places-station',
        definition: 'Passengers wait here before getting on a train.',
        wordBank: ['bridge', 'garage', 'harbor', 'hotel', 'park', 'station', 'street', 'warehouse'],
        answer: 'station',
        decisiveClue: 'passengers · train',
        reasoning: 'Las dos pistas deben coincidir: pasajeros y tren. Esa combinación identifica station.',
        distractor: 'Harbor también recibe pasajeros, pero se relaciona con barcos, no con trains.',
      },
    ],
  },
  {
    id: 'people',
    label: 'Personas y oficios',
    subtitle: 'Une cada profesión con su función exclusiva.',
    icon: '◎',
    examples: [
      {
        id: 'people-mechanic',
        definition: 'This person repairs cars and checks their engines.',
        wordBank: ['architect', 'chef', 'dentist', 'farmer', 'mechanic', 'nurse', 'photographer', 'waiter'],
        answer: 'mechanic',
        decisiveClue: 'repairs cars · engines',
        reasoning: 'Las dos acciones describen el trabajo central de un mechanic.',
        distractor: 'Architect y farmer pueden usar maquinaria, pero ninguno repara carros como función profesional.',
      },
      {
        id: 'people-architect',
        definition: 'This person designs buildings before they are constructed.',
        wordBank: ['architect', 'builder', 'cashier', 'driver', 'engineer', 'gardener', 'painter', 'pilot'],
        answer: 'architect',
        decisiveClue: 'designs buildings · before',
        reasoning: 'Designs y before indican la etapa de planeación propia del architect.',
        distractor: 'Builder es el distractor fuerte: participa en la construcción, pero no es la persona definida por diseñar el edificio antes.',
      },
      {
        id: 'people-optician',
        definition: 'This person checks your eyes and helps you choose glasses.',
        wordBank: ['dentist', 'doctor', 'mechanic', 'nurse', 'optician', 'photographer', 'teacher', 'vet'],
        answer: 'optician',
        decisiveClue: 'eyes · choose glasses',
        reasoning: 'Eyes abre el campo, pero choose glasses vuelve la respuesta específica: optician.',
        distractor: 'Doctor es demasiado general. En Parte 1 gana la palabra que explica todas las pistas, no solo una.',
      },
    ],
  },
  {
    id: 'objects',
    label: 'Objetos cotidianos',
    subtitle: 'Distingue objetos del mismo contexto por su función.',
    icon: '◇',
    examples: [
      {
        id: 'objects-receipt',
        definition: 'A shop gives you this after you pay, and it shows what you bought.',
        wordBank: ['basket', 'cash', 'coin', 'price', 'receipt', 'shelf', 'ticket', 'wallet'],
        answer: 'receipt',
        decisiveClue: 'gives you · after you pay · shows what you bought',
        reasoning: 'La secuencia completa de compra define receipt: la tienda lo entrega y registra la compra.',
        distractor: 'Wallet pertenece al mismo contexto y puede guardar el recibo, pero la tienda no te lo entrega al pagar.',
      },
      {
        id: 'objects-ruler',
        definition: 'Students use this to measure a straight line.',
        wordBank: ['board', 'eraser', 'folder', 'pencil', 'ruler', 'scissors', 'stapler', 'textbook'],
        answer: 'ruler',
        decisiveClue: 'measure · straight line',
        reasoning: 'Measure identifica la función y straight line confirma el objeto escolar: ruler.',
        distractor: 'Pencil sirve para dibujar la línea, pero no para medirla.',
      },
      {
        id: 'objects-scarf',
        definition: 'You wear this around your neck to keep warm.',
        wordBank: ['belt', 'boots', 'gloves', 'hat', 'jacket', 'necklace', 'scarf', 'socks'],
        answer: 'scarf',
        decisiveClue: 'around your neck · keep warm',
        reasoning: 'Neck ubica el objeto y keep warm define su propósito: scarf.',
        distractor: 'Necklace también va alrededor del cuello, pero no se usa para conservar el calor.',
      },
    ],
  },
  {
    id: 'states',
    label: 'Estados y sentimientos',
    subtitle: 'Traduce la situación, no solamente la palabra.',
    icon: '◌',
    examples: [
      {
        id: 'states-hungry',
        definition: 'You feel like this when you need something to eat.',
        wordBank: ['afraid', 'angry', 'cold', 'happy', 'hungry', 'sad', 'thirsty', 'tired'],
        answer: 'hungry',
        decisiveClue: 'need something to eat',
        reasoning: 'La necesidad de comer corresponde exclusivamente a hungry.',
        distractor: 'Thirsty comparte la idea de necesidad física, pero exige algo to drink.',
      },
      {
        id: 'states-thirsty',
        definition: 'People feel like this when they need a drink.',
        wordBank: ['bored', 'busy', 'excited', 'hungry', 'nervous', 'proud', 'thirsty', 'worried'],
        answer: 'thirsty',
        decisiveClue: 'need a drink',
        reasoning: 'Drink es la pista funcional que activa thirsty.',
        distractor: 'Hungry sería correcto con food o eat; cambiar una sola pista cambia la respuesta.',
      },
      {
        id: 'states-tired',
        definition: 'A person feels like this when they need to sleep after a long day.',
        wordBank: ['alone', 'calm', 'cold', 'ill', 'ready', 'surprised', 'tired', 'warm'],
        answer: 'tired',
        decisiveClue: 'need to sleep · after a long day',
        reasoning: 'La consecuencia de un día largo y la necesidad de dormir definen tired.',
        distractor: 'Calm puede aparecer al final del día, pero no significa necesitar dormir.',
      },
    ],
  },
];

const EXTRA_PART_ONE_QUESTIONS: IcfesPracticeQuestion[] = [
  {
    id: 'p1-feelings-002', officialPart: 1, skill: 'vocabulary_basic', subskill: 'feelings', type: 'word-match', difficulty: 'base',
    stimulus: 'Feelings and states', stimulusLabel: 'Categoría', wordBank: ['afraid', 'angry', 'hungry', 'sad', 'thirsty', 'tired'],
    prompt: 'You feel like this when you need something to eat.',
    options: [
      { text: 'afraid', rationale: 'Afraid describes fear, not the need for food.', trap: 'categoría incorrecta' },
      { text: 'hungry', rationale: 'Hungry means needing or wanting food.' },
      { text: 'thirsty', rationale: 'Thirsty means needing a drink, not food.', trap: 'pista parcial' },
      { text: 'tired', rationale: 'Tired describes needing rest or sleep.', trap: 'pista parcial' },
    ],
    answerIndex: 1,
    explanation: '“Need something to eat” define hungry. La acción eat evita confundirlo con thirsty.',
    evidence: { quote: 'need something to eat', reason: 'Eat es la pista que separa hambre de sed o cansancio.' },
    strategy: 'Convierte la descripción en una situación concreta antes de buscar la palabra.',
    microLesson: { title: 'Aprende en pares contrastivos', body: 'Hungry–eat, thirsty–drink y tired–sleep forman pares de alta frecuencia en Parte 1.' },
    targetSeconds: 22, tags: ['feelings', 'states', 'word-bank'],
    reinforcement: { label: 'Repasar vocabulario ICFES', href: '/practica/icfes-saber-11/vocabulario' },
    source: { type: 'original-practice', reference: 'Pregunta propia basada en la habilidad oficial de la Parte 1.' },
    reviewedAt: '2026-08-03', editorialStatus: 'published',
  },
  {
    id: 'p1-school-ruler-003', officialPart: 1, skill: 'vocabulary_basic', subskill: 'school-objects', type: 'word-match', difficulty: 'estandar',
    stimulus: 'School objects', stimulusLabel: 'Categoría', wordBank: ['board', 'eraser', 'folder', 'pencil', 'ruler', 'scissors'],
    prompt: 'Students use this to measure a straight line.',
    options: [
      { text: 'board', rationale: 'A board displays writing for a class.', trap: 'categoría incorrecta' },
      { text: 'pencil', rationale: 'A pencil can draw the line but does not measure it.', trap: 'pista parcial' },
      { text: 'ruler', rationale: 'A ruler measures length and guides straight lines.' },
      { text: 'scissors', rationale: 'Scissors cut paper or other material.', trap: 'categoría incorrecta' },
    ],
    answerIndex: 2,
    explanation: 'Measure es la función decisiva. Pencil comparte “line”, pero solo ruler mide.',
    evidence: { quote: 'measure a straight line', reason: 'La combinación de medir y línea recta identifica ruler.' },
    strategy: 'Desconfía de una opción asociada con una sola palabra; exige que cumpla la función completa.',
    microLesson: { title: 'Función antes que asociación', body: 'Pencil se asocia con line; ruler se define por measure. La pregunta premia la función exacta.' },
    targetSeconds: 25, tags: ['school', 'objects', 'functions'],
    reinforcement: { label: 'Practicar más Parte 1', href: '/practica/icfes-saber-11/parte-1' },
    source: { type: 'original-practice', reference: 'Pregunta propia basada en la habilidad oficial de la Parte 1.' },
    reviewedAt: '2026-08-03', editorialStatus: 'published',
  },
  {
    id: 'p1-clothes-scarf-004', officialPart: 1, skill: 'vocabulary_basic', subskill: 'clothes', type: 'word-match', difficulty: 'estandar',
    stimulus: 'Clothes and accessories', stimulusLabel: 'Categoría', wordBank: ['belt', 'gloves', 'hat', 'jacket', 'necklace', 'scarf'],
    prompt: 'You wear this around your neck to keep warm.',
    options: [
      { text: 'gloves', rationale: 'Gloves keep hands warm, not the neck.', trap: 'pista parcial' },
      { text: 'jacket', rationale: 'A jacket keeps the upper body warm but is not worn around the neck.', trap: 'pista parcial' },
      { text: 'necklace', rationale: 'A necklace goes around the neck but its purpose is decoration.', trap: 'pista parcial' },
      { text: 'scarf', rationale: 'A scarf is worn around the neck for warmth.' },
    ],
    answerIndex: 3,
    explanation: 'Scarf cumple ambas pistas: ubicación around your neck y propósito keep warm.',
    evidence: { quote: 'around your neck to keep warm', reason: 'Una pista elimina jacket; la otra elimina necklace.' },
    strategy: 'Si hay dos candidatos, asigna una pista a cada descarte y conserva el que cumple ambas.',
    microLesson: { title: 'La respuesta es una intersección', body: 'Necklace cumple neck. Jacket cumple warm. Scarf está en la intersección de las dos pistas.' },
    targetSeconds: 28, tags: ['clothes', 'accessories', 'double-clue'],
    reinforcement: { label: 'Repasar campos semánticos', href: '/practica/icfes-saber-11/vocabulario' },
    source: { type: 'original-practice', reference: 'Pregunta propia basada en la habilidad oficial de la Parte 1.' },
    reviewedAt: '2026-08-03', editorialStatus: 'published',
  },
  {
    id: 'p1-places-pharmacy-005', officialPart: 1, skill: 'vocabulary_basic', subskill: 'places', type: 'word-match', difficulty: 'estandar',
    stimulus: 'Places in town', stimulusLabel: 'Categoría', wordBank: ['bakery', 'bank', 'clinic', 'factory', 'pharmacy', 'restaurant'],
    prompt: 'People buy medicine here when they are ill.',
    options: [
      { text: 'bank', rationale: 'A bank manages money, not medicine.', trap: 'categoría incorrecta' },
      { text: 'clinic', rationale: 'A clinic treats patients, but the definition says buy medicine.', trap: 'pista parcial' },
      { text: 'pharmacy', rationale: 'A pharmacy sells medicine.' },
      { text: 'restaurant', rationale: 'A restaurant sells meals.', trap: 'categoría incorrecta' },
    ],
    answerIndex: 2,
    explanation: 'Ill acerca clinic y pharmacy, pero buy medicine deja una sola respuesta: pharmacy.',
    evidence: { quote: 'buy medicine', reason: 'El verbo buy y el objeto medicine definen el establecimiento.' },
    strategy: 'Usa el verbo para resolver palabras del mismo campo semántico.',
    microLesson: { title: 'Campo semántico + función', body: 'Clinic y pharmacy pertenecen a salud. Treat apunta a clinic; buy medicine apunta a pharmacy.' },
    targetSeconds: 27, tags: ['places', 'health', 'verbs'],
    reinforcement: { label: 'Practicar vocabulario por lugares', href: '/practica/icfes-saber-11/vocabulario' },
    source: { type: 'original-practice', reference: 'Pregunta propia basada en la habilidad oficial de la Parte 1.' },
    reviewedAt: '2026-08-03', editorialStatus: 'published',
  },
  {
    id: 'p1-jobs-architect-006', officialPart: 1, skill: 'vocabulary_basic', subskill: 'jobs', type: 'word-match', difficulty: 'reto',
    stimulus: 'Jobs', stimulusLabel: 'Categoría', wordBank: ['architect', 'builder', 'cashier', 'engineer', 'gardener', 'painter'],
    prompt: 'This person designs buildings before they are constructed.',
    options: [
      { text: 'architect', rationale: 'An architect plans and designs buildings before construction.' },
      { text: 'builder', rationale: 'A builder constructs the building; “designs” and “before” point elsewhere.', trap: 'pista parcial' },
      { text: 'engineer', rationale: 'An engineer may work on structures, but the general lexical definition given is architect.', trap: 'pista parcial' },
      { text: 'painter', rationale: 'A painter applies paint or creates art.', trap: 'categoría incorrecta' },
    ],
    answerIndex: 0,
    explanation: 'La cronología importa: designs y before construction describen al architect, no al builder.',
    evidence: { quote: 'designs buildings before they are constructed', reason: 'Función y momento separan profesiones relacionadas.' },
    strategy: 'Cuando las opciones comparten contexto, busca el verbo y la etapa del proceso.',
    microLesson: { title: 'Lee también los marcadores de tiempo', body: 'Architect: before construction. Builder: during construction. Una palabra temporal puede ser la pista decisiva.' },
    targetSeconds: 30, tags: ['jobs', 'process-stage', 'distractors'],
    reinforcement: { label: 'Entrenar distractores', href: '/practica/icfes-saber-11/parte-1' },
    source: { type: 'original-practice', reference: 'Pregunta propia basada en la habilidad oficial de la Parte 1.' },
    reviewedAt: '2026-08-03', editorialStatus: 'published',
  },
  {
    id: 'p1-transport-bridge-007', officialPart: 1, skill: 'vocabulary_basic', subskill: 'transport-and-places', type: 'word-match', difficulty: 'reto',
    stimulus: 'Transport and places', stimulusLabel: 'Categoría', wordBank: ['boat', 'bridge', 'harbor', 'road', 'station', 'tunnel'],
    prompt: 'People can walk or drive over this to cross a river.',
    options: [
      { text: 'boat', rationale: 'A boat crosses on the water, but people do not normally walk or drive over it.', trap: 'pista parcial' },
      { text: 'bridge', rationale: 'A bridge lets people and vehicles travel over a river.' },
      { text: 'road', rationale: 'A road supports travel but does not necessarily cross a river.', trap: 'pista parcial' },
      { text: 'tunnel', rationale: 'A tunnel goes through or under something, not over the river.', trap: 'pista parcial' },
    ],
    answerIndex: 1,
    explanation: 'Cross a river abre varias posibilidades; walk or drive over deja bridge como respuesta precisa.',
    evidence: { quote: 'walk or drive over this', reason: 'Over y los dos modos de desplazamiento eliminan boat y tunnel.' },
    strategy: 'No te detengas en la primera asociación. Lee preposiciones y verbos de movimiento.',
    microLesson: { title: 'Las preposiciones también son vocabulario', body: 'Over → bridge; through/under → tunnel; on the water → boat.' },
    targetSeconds: 32, tags: ['transport', 'prepositions', 'movement'],
    reinforcement: { label: 'Repasar vocabulario espacial', href: '/practica/icfes-saber-11/vocabulario' },
    source: { type: 'original-practice', reference: 'Pregunta propia basada en la habilidad oficial de la Parte 1.' },
    reviewedAt: '2026-08-03', editorialStatus: 'published',
  },
  {
    id: 'p1-jobs-optician-008', officialPart: 1, skill: 'vocabulary_basic', subskill: 'jobs', type: 'word-match', difficulty: 'reto',
    stimulus: 'Health professions', stimulusLabel: 'Categoría', wordBank: ['dentist', 'doctor', 'nurse', 'optician', 'pharmacist', 'vet'],
    prompt: 'This person checks your eyes and helps you choose glasses.',
    options: [
      { text: 'doctor', rationale: 'Doctor is too general and does not capture choosing glasses.', trap: 'pista parcial' },
      { text: 'nurse', rationale: 'A nurse cares for patients but does not specialize in glasses.', trap: 'categoría incorrecta' },
      { text: 'optician', rationale: 'An optician works with eyesight tests and glasses.' },
      { text: 'pharmacist', rationale: 'A pharmacist prepares or sells medicine.', trap: 'categoría incorrecta' },
    ],
    answerIndex: 2,
    explanation: 'Eyes es general; choose glasses hace específica la profesión optician.',
    evidence: { quote: 'checks your eyes and helps you choose glasses', reason: 'Las dos funciones juntas identifican la especialidad.' },
    strategy: 'Prefiere la palabra más específica que cubre todas las funciones descritas.',
    microLesson: { title: 'General versus específico', body: 'Doctor puede tratar ojos; optician está definido por revisar la visión y trabajar con gafas.' },
    targetSeconds: 34, tags: ['jobs', 'health', 'specificity'],
    reinforcement: { label: 'Practicar profesiones', href: '/practica/icfes-saber-11/vocabulario' },
    source: { type: 'original-practice', reference: 'Pregunta propia basada en la habilidad oficial de la Parte 1.' },
    reviewedAt: '2026-08-03', editorialStatus: 'published',
  },
  {
    id: 'p1-home-fridge-009', officialPart: 1, skill: 'vocabulary_basic', subskill: 'home-objects', type: 'word-match', difficulty: 'reto',
    stimulus: 'Things at home', stimulusLabel: 'Categoría', wordBank: ['cupboard', 'freezer', 'fridge', 'oven', 'sink', 'stove'],
    prompt: 'This keeps food cold, but it is not normally used to freeze it.',
    options: [
      { text: 'cupboard', rationale: 'A cupboard stores food but does not keep it cold.', trap: 'pista parcial' },
      { text: 'freezer', rationale: 'A freezer keeps food below freezing; the definition explicitly excludes that function.', trap: 'pista parcial' },
      { text: 'fridge', rationale: 'A fridge keeps food cold without normally freezing it.' },
      { text: 'oven', rationale: 'An oven heats and cooks food.', trap: 'categoría incorrecta' },
    ],
    answerIndex: 2,
    explanation: 'Keep food cold apunta a fridge/freezer; “not used to freeze” elimina freezer.',
    evidence: { quote: 'cold, but ... not ... freeze', reason: 'La segunda cláusula convierte una categoría amplia en una respuesta única.' },
    strategy: 'Palabras como but, not y without suelen contener la pista que elimina el distractor más cercano.',
    microLesson: { title: 'Lee después de but', body: 'El comienzo propone candidatos; el contraste final decide. No respondas antes de terminar la definición.' },
    targetSeconds: 35, tags: ['home', 'contrast', 'negation'],
    reinforcement: { label: 'Entrenar palabras de contraste', href: '/practica/icfes-saber-11/parte-1' },
    source: { type: 'original-practice', reference: 'Pregunta propia basada en la habilidad oficial de la Parte 1.' },
    reviewedAt: '2026-08-03', editorialStatus: 'published',
  },
];

export function buildPartOneStages(baseQuestions: IcfesPracticeQuestion[]): PartOnePracticeStage[] {
  return [
    {
      id: 'category',
      label: 'Nivel 1 · Reconoce la categoría',
      shortLabel: 'Reconoce',
      focus: 'Activa el campo semántico y conecta una función directa con la palabra correcta.',
      questions: [...baseQuestions.slice(0, 3), EXTRA_PART_ONE_QUESTIONS[0]],
    },
    {
      id: 'clue',
      label: 'Nivel 2 · Encuentra la pista decisiva',
      shortLabel: 'Distingue',
      focus: 'Separa palabras cercanas usando verbo, propósito, ubicación y situación.',
      questions: EXTRA_PART_ONE_QUESTIONS.slice(1, 5),
    },
    {
      id: 'distractors',
      label: 'Nivel 3 · Vence los distractores',
      shortLabel: 'Transfiere',
      focus: 'Combina dos o más pistas y resiste opciones que solo coinciden parcialmente.',
      questions: EXTRA_PART_ONE_QUESTIONS.slice(5),
    },
  ];
}
