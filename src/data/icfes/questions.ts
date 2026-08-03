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
] as const;

export function getIcfesQuestionsByPart(part: IcfesOfficialPart): IcfesPracticeQuestion[] {
  return ICFES_PRACTICE_QUESTIONS.filter((question) => question.officialPart === part);
}
