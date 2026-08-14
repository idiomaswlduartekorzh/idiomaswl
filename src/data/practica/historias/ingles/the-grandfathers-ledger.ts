// ─── The Grandfather's Ledger — contenido del ejercicio ───────────────────────
// Comprensión integrada B1–B2: narrador (lectura) + 2 notas de voz (listening).
//
// HISTORIA DE ESTE ARCHIVO — leer antes de tocar los textos:
// La historia se escribió con una ABUELA como personaje que reclama los regalos.
// Se decidió que quien reclama es el ABUELO, y la conversión quedó a medias: el
// narrador y las preguntas ya hablaban de «Robert / he», pero la transcripción de
// la nuera seguía diciendo «Mark's mom», «this woman», «she», «Ma'am». Aquí queda
// coherente en las tres capas: narrador, las dos transcripciones y las 19
// preguntas con sus explicaciones.
//
// POR ESO SE REGRABÓ EL AUDIO. Los dos mp3 que había en
// /public/audio/grandmothers-ledger/ se hicieron con el guion viejo (voz de mujer,
// «she»), así que dejaron de coincidir con la transcripción: el alumno habría
// leído «he» mientras oía «she». Se retiraron y las tomas actuales están en
// /audio/historias/ingles/the-grandfathers-ledger/{a,b}.mp3, la b con voz de
// hombre (WL en · Grandpa Sam).

import type { Historia, StoryQuestion as Question } from '../types';

// ─── Diccionario de traducción (click en cualquier palabra) ───────────────────

const DICT: Record<string, string> = {
  luxury: 'lujoso / de lujo',
  stroller: 'cochecito de bebé',
  nursery: 'cuarto del bebé',
  spreadsheet: 'hoja de cálculo',
  inventory: 'inventario',
  warehouse: 'almacén / bodega',
  crib: 'cuna',
  dresser: 'cómoda',
  portfolio: 'portafolio / cartera de inversiones',
  receipt: 'recibo / factura',
  receipts: 'recibos / facturas',
  belongings: 'pertenencias / cosas',
  assets: 'activos / bienes',
  generous: 'generoso/a',
  generosity: 'generosidad',
  fortune: 'fortuna / mucho dinero',
  villain: 'villano/a',
  organised: 'organizado/a',
  organized: 'organizado/a',
  attitude: 'actitud',
  appreciation: 'agradecimiento',
  recognition: 'reconocimiento',
  struggling: 'pasando dificultades económicas',
  expecting: 'embarazada / esperando un bebé',
  pregnant: 'embarazada',
  generations: 'generaciones',
  greedy: 'codicioso/a / avaro/a',
  defensive: 'a la defensiva',
  invested: 'invirtió / invertido',
  invest: 'invertir',
  investment: 'inversión',
  outgrown: 'que ya no le queda / que superó',
  paperwork: 'papeleo / documentación',
  insisting: 'insistiendo',
  insisted: 'insistió',
  genuinely: 'genuinamente / de verdad',
  apparently: 'aparentemente / al parecer',
  literally: 'literalmente',
  honestly: 'honestamente',
  shocked: 'sorprendido/a / impactado/a',
  refused: 'se negó / rechazó',
  refusal: 'negativa / rechazo',
  dispute: 'disputa / conflicto',
  perception: 'percepción',
  assumption: 'suposición',
  assumptions: 'suposiciones',
  announced: 'anunció',
  conflict: 'conflicto',
  unconditional: 'incondicional',
  transactional: 'transaccional / como un negocio',
  sarcasm: 'sarcasmo',
  sarcastic: 'sarcástico/a',
  irony: 'ironía',
  rhetorical: 'retórico/a',
  inference: 'inferencia / deducción',
  neutral: 'neutral / imparcial',
  premeditation: 'premeditación',
  indignant: 'indignado/a',
  indignation: 'indignación',
  evidence: 'evidencia / prueba',
  entitlement: 'sentido de tener derecho a todo',
  complain: 'quejarse',
  monster: 'monstruo',
  reasonable: 'razonable',
  unreasonable: 'poco razonable',
  authority: 'autoridad',
  subtle: 'sutil',
  account: 'versión / relato de los hechos',
  perspective: 'perspectiva / punto de vista',
  boundary: 'límite',
  established: 'establecido/a',
  contested: 'cuestionado/a / en disputa',
  objective: 'objetivo/a',
  recovery: 'recuperación',
  fair: 'justo/a',
  fairness: 'justicia / equidad',
  ledger: 'libro de cuentas / registro contable',
  grandfather: 'abuelo',
  grandmother: 'abuela',
  grandson: 'nieto',
  granddaughter: 'nieta',
  grandchild: 'nieto/a',
  granddad: 'abuelo (coloquial)',
  sir: 'señor (tratamiento formal)',
  daughterinlaw: 'nuera',
  fatherinlaw: 'suegro',
  pregnancy: 'embarazo',
  insane: 'una locura / absurdo',
  storage: 'almacenamiento / bodega',
  crime: 'crimen / delito',
  suggest: 'sugerir',
  suggestion: 'sugerencia',
  discuss: 'hablar de / conversar sobre',
  sharing: 'compartir / repartir',
  entirely: 'totalmente / por completo',
  ultimately: 'en última instancia / finalmente',
  genuine: 'genuino/a / verdadero/a',
  simultaneously: 'simultáneamente / al mismo tiempo',
  spender: 'persona que gasta dinero',
  custom: 'personalizado / a medida',
  simply: 'simplemente',
  purchased: 'compró / adquirió',
  item: 'artículo / objeto',
  items: 'artículos / objetos',
  fund: 'fondo (de dinero)',
  college: 'universidad',
  lack: 'falta / carencia',
  complete: 'completa / total',
  helping: 'ayudando',
  craziest: 'más loca / más absurda',
  considered: 'considerado / visto como',
  rob: 'robar',
  bank: 'banco',
  bigger: 'más grandes',
  second: 'segundo / instante',
  brought: 'trajo / mencionó',
  bothered: 'molestó / perturbó',
  stuff: 'cosas / artículos',
  watched: 'vio / observó',
  moment: 'momento',
  suddenly: 'de repente / de pronto',
};

// ─── Textos ───────────────────────────────────────────────────────────────────

const NARRATOR_PARAGRAPHS = [
  "Three years ago, when baby Ethan was born, his grandfather Robert became the family's biggest spender.",
  'He bought nearly everything: a luxury stroller, a custom nursery set, expensive toys, and even started a college fund.',
  'Everyone thought he was simply being generous.',
  "Then Robert's daughter announced she was pregnant.",
  'Suddenly, Robert began making comments about how some of Ethan\'s gifts could be "shared" with the new baby.',
  "A few weeks later, he arrived at his son and daughter-in-law's house carrying a spreadsheet listing every expensive gift he had ever purchased.",
  "He asked for thousands of dollars' worth of items back.",
  'The daughter-in-law refused.',
  'Now both sides are telling very different versions of what happened.',
];

const DIL_PARAGRAPHS = [
  'Girl, I am still shaking.',
  "You know how Mark's dad bought all that stuff when Ethan was born? The stroller, the nursery furniture, all those expensive gifts he kept insisting on buying?",
  'Tell me why this man showed up at my house yesterday with an actual spreadsheet.',
  'A spreadsheet.',
  "I'm not joking.",
  'He sat at my kitchen table and started going item by item, like he was doing an inventory check at a warehouse.',
  "The stroller. The crib. The dresser. Even the money he'd put into Ethan's college fund.",
  'Then he says, completely serious, "I think it\'s only fair that some of these things go to Emma\'s baby now."',
  "And I'm sitting there thinking... fair to who?",
  'Because Ethan is literally using this stuff.',
  "Like, these aren't extra boxes sitting in storage. These are his things.",
  'Then he starts saying he invested a lot of money and that family assets should stay in the family.',
  'Family assets?',
  "Sir, that's your grandson, not a real-estate portfolio.",
  'And then he pulls out receipts.',
  'Receipts.',
  'From three years ago.',
  "Who keeps receipts for baby gifts unless they think they're getting them back one day?",
  'The whole thing felt insane.',
  'The worst part is that he genuinely seemed shocked when I said no.',
  "Like he honestly expected me to hand over my kid's belongings because another grandchild is on the way.",
  "I swear, if he'd just asked whether we had anything Ethan had outgrown, I would've happily helped.",
  'But showing up with paperwork and a recovery plan?',
  'Absolutely not.',
];

const FIL_PARAGRAPHS = [
  "I need to tell somebody what actually happened because apparently I'm the villain now.",
  'Three years ago, when Ethan was born, I spent a fortune helping those kids.',
  'A fortune.',
  'Not because anybody forced me to. Because I wanted my grandson to have everything.',
  'The nursery furniture alone cost more than my first car.',
  'Did I complain? No.',
  'Did I ever ask for recognition? No.',
  'Now my daughter Emma is expecting her first baby, and she\'s struggling financially.',
  "So I thought maybe some of the expensive items that aren't being fully used anymore could be passed down.",
  'You know... like families have done for generations.',
  'Instead, Sarah acted like I was trying to rob a bank.',
  'I never said I wanted every single thing back.',
  'I said maybe we could discuss sharing some of the bigger items.',
  'But the second I brought up the stroller, she got defensive.',
  'And honestly?',
  "What bothered me wasn't even the stuff.",
  'It was the attitude.',
  'The complete lack of appreciation.',
  "For three years I've watched them enjoy things I paid for, and the moment I suggest helping another grandchild, suddenly I'm some greedy monster.",
  'Also, everybody keeps making fun of my spreadsheet.',
  'Excuse me for being organised.',
  "If you're talking about tens of thousands of dollars, maybe writing things down isn't the craziest thing in the world.",
  "I wasn't trying to take from Ethan.",
  'I was trying to help Emma.',
  "But apparently in this family, that's now considered a crime.",
];

// ─── Preguntas ────────────────────────────────────────────────────────────────

const NARRATOR_QS: Question[] = [
  {
    type: 'Vocabulary',
    q: 'The narrator describes the stroller as "luxury." What does this word choice suggest?',
    opts: [
      'He bought affordable, practical items',
      'He spent large amounts on premium, high-end products',
      'He preferred second-hand items for the baby',
      'He only bought items on sale',
    ],
    correct: 1,
    explanation:
      '"Luxury" signals expensive, premium-quality goods — indicating Robert spent far more than the average gift-giver would.',
  },
  {
    type: 'Inference',
    q: 'The narrator uses the word "Suddenly" when describing Robert\'s change in attitude. What does this imply?',
    opts: [
      'The change was gradual and long expected',
      'Robert always planned to reclaim the items eventually',
      "The shift happened quickly after one specific event: his daughter's pregnancy",
      'Emma personally asked Robert to request the items back',
    ],
    correct: 2,
    explanation:
      '"Suddenly" contrasts with three years of generosity, implying Robert\'s motivation changed the moment his own daughter became pregnant — not gradually.',
  },
  {
    type: 'Comprehension',
    q: "What information did Robert's spreadsheet contain?",
    opts: [
      'A list of future purchases for the new baby',
      'A record of every expensive gift he had ever purchased',
      'A household budget for the family',
      'A legal contract between Robert and his son',
    ],
    correct: 1,
    explanation:
      'The narrator states Robert arrived "carrying a spreadsheet listing every expensive gift he had ever purchased."',
  },
  {
    type: 'Critical Thinking',
    q: '"Everyone thought he was simply being generous." What does the word "simply" suggest?',
    opts: [
      'Robert was definitely generous with no hidden motives',
      "There may be more to Robert's generosity than it appeared at the time",
      'The family always knew Robert had conditions on his gifts',
      'Robert was openly trying to control the family',
    ],
    correct: 1,
    explanation:
      '"Simply" hints that appearances were deceiving — leaving open the possibility that Robert\'s generosity had conditions nobody noticed until now.',
  },
];

const DIL_QS: Question[] = [
  {
    type: 'Vocabulary',
    q: 'Sarah compares Robert\'s visit to "an inventory check at a warehouse." What does this reveal?',
    opts: [
      'Metaphor — she means Robert physically moved her furniture',
      'Simile — she portrays Robert as cold and businesslike, treating gifts as recoverable stock',
      'Hyperbole — she is simply exaggerating for humour',
      'Personification — she gives the spreadsheet human qualities',
    ],
    correct: 1,
    explanation:
      "This simile strips all warmth from Robert's visit — comparing it to a warehouse audit shows Sarah saw the interaction as transactional, not familial.",
  },
  {
    type: 'Inference',
    q: '"Who keeps receipts for baby gifts unless they think they\'re getting them back one day?" What does this rhetorical question imply?',
    opts: [
      'Sarah thinks everyone should keep all receipts',
      'Robert was simply very organised but nothing more',
      'The receipts are evidence Robert always intended to reclaim the gifts',
      'Sarah lost her own receipts and is projecting',
    ],
    correct: 2,
    explanation:
      "A rhetorical question doesn't expect an answer — Sarah uses it to suggest Robert's receipts are proof of premeditation, not just good record-keeping.",
  },
  {
    type: 'Tone',
    q: "How would you best describe the overall tone of Sarah's voice note?",
    opts: [
      'Calm and analytical',
      'Emotionally charged, indignant, and disbelieving',
      'Sad and regretful',
      'Formal and professional',
    ],
    correct: 1,
    explanation:
      '"I am still shaking," repeated one-word sentences ("A spreadsheet."), and sarcasm ("not a real-estate portfolio") all mark a tone of emotional indignation.',
  },
  {
    type: 'Comprehension',
    q: 'According to Sarah, what request from Robert WOULD have been acceptable?',
    opts: [
      'Bringing a detailed spreadsheet of all gifts',
      'Demanding the stroller and crib back immediately',
      'Asking whether Ethan had outgrown anything that could be passed on',
      'Sending a formal written request by mail',
    ],
    correct: 2,
    explanation:
      'Sarah says: "if he\'d just asked whether we had anything Ethan had outgrown, I would\'ve happily helped." HOW Robert asked mattered as much as WHAT he asked.',
  },
  {
    type: 'Vocabulary',
    q: '"Sir, that\'s your grandson, not a real-estate portfolio." What technique is Sarah using?',
    opts: [
      "A literal statement about Robert's real estate business",
      'Irony to highlight how Robert treats a family relationship like a financial investment',
      "A polite way to agree with Robert's perspective",
      'A direct quote from the spreadsheet',
    ],
    correct: 1,
    explanation:
      'Using the vocabulary of finance ("portfolio") sarcastically mocks Robert\'s transactional approach to what should be an unconditional family relationship. Note the mock-formal "Sir": politeness used as a weapon.',
  },
];

const FIL_QS: Question[] = [
  {
    type: 'Vocabulary',
    q: 'Robert says items could "be passed down" to Emma\'s baby. What tradition does this phrase reference?',
    opts: [
      'Returning purchased goods to a store for a refund',
      'The family practice of handing possessions from one member to another across generations',
      'A formal legal inheritance process',
      'Donating items to charity',
    ],
    correct: 1,
    explanation:
      '"Passed down" invokes a familiar family tradition — not repayment. Robert frames his request as cultural practice, not a financial demand.',
  },
  {
    type: 'Comprehension',
    q: 'According to Robert, what specifically did he ask for — as opposed to what Sarah claims?',
    opts: [
      'Every single item on his list, returned immediately',
      'Only the college fund money',
      'A conversation about sharing some of the bigger items',
      'A formal written apology from Sarah',
    ],
    correct: 2,
    explanation:
      'Robert says: "I never said I wanted every single thing back. I said maybe we could discuss sharing some of the bigger items." This directly contradicts Sarah\'s account.',
  },
  {
    type: 'Inference',
    q: '"What bothered me wasn\'t even the stuff. It was the attitude." What does this reveal about Robert\'s deeper concern?',
    opts: [
      'He is only pretending not to care about the items',
      'He feels emotionally disrespected and unappreciated despite years of generosity',
      'He wants Sarah removed from the family',
      'He regrets ever buying the gifts',
    ],
    correct: 1,
    explanation:
      'By separating "the stuff" from "the attitude," Robert signals that the emotional wound — feeling dismissed after years of investment — matters more than the monetary value.',
  },
  {
    type: 'Tone',
    q: '"Excuse me for being organised" — what tone does this phrase convey?',
    opts: [
      'Genuine apology and remorse',
      "Sarcastic defensiveness — he doesn't think he did anything wrong",
      'Confusion about why anyone is upset',
      'Academic, formal register',
    ],
    correct: 1,
    explanation:
      '"Excuse me for being organised" is a non-apology: he defends his action while implying the criticism of the spreadsheet is absurd.',
  },
  {
    type: 'Vocabulary',
    q: '"Apparently I\'m the villain now." What does Robert\'s use of "villain" reveal?',
    opts: [
      'He fully agrees his behaviour was wrong',
      'He feels unjustly cast as the bad character in a story others are telling about him',
      'He is using technical legal language',
      'He is seeking sympathy through flattery',
    ],
    correct: 1,
    explanation:
      '"Villain" is a storytelling word, not a real-life term. Robert uses it to signal he feels he has been assigned a narrative role unfairly — he\'s a character in someone else\'s story.',
  },
];

const FINAL_QS: Question[] = [
  {
    type: 'Synthesis',
    q: 'Both Sarah and Robert agree on which of the following facts?',
    opts: [
      'Robert asked to permanently take back all items',
      'Sarah had already offered to share some items voluntarily',
      'Robert brought a spreadsheet to the meeting',
      'Emma personally requested the items from Robert',
    ],
    correct: 2,
    explanation:
      'The spreadsheet is the one objective detail confirmed by both accounts. Everything else — intent, tone, scope — is contested.',
  },
  {
    type: 'Perspective',
    q: 'The narrator says Robert "asked for thousands of dollars\' worth of items back." Robert says he "suggested discussing sharing some items." This gap suggests:',
    opts: [
      'The narrator is biased against Robert',
      "There is a significant difference between Robert's stated intention and how his request was perceived",
      'Sarah invented most of the confrontation',
      'The narrator made a factual error',
    ],
    correct: 1,
    explanation:
      'Intent vs. impact: Robert believed he was opening a conversation; Sarah (and the narrator) experienced it as a demand. This gap between intention and perception drives the entire conflict.',
  },
  {
    type: 'Critical Thinking',
    q: 'If you had to identify the ROOT cause of this conflict, which is most accurate?',
    opts: [
      "Robert's financial greed",
      "Sarah's selfishness and lack of gratitude",
      'No expectations were discussed when the gifts were originally given',
      "Emma's decision to have a baby",
    ],
    correct: 2,
    explanation:
      'Were the items gifts or conditional loans? The failure to establish that boundary at the time — not greed or selfishness alone — is the structural cause of the dispute.',
  },
  {
    type: 'Inference',
    q: 'Sarah says Robert "genuinely seemed shocked" when refused. What does this reaction suggest about Robert?',
    opts: [
      'Robert was pretending to be surprised as a tactic',
      'Robert had genuinely not anticipated that Sarah would view his request as unreasonable',
      'Robert knew Sarah would refuse and was testing her',
      'Robert had never been refused anything in his life',
    ],
    correct: 1,
    explanation:
      "Genuine shock reveals that Robert operated with a completely different set of assumptions — he didn't expect refusal because, in his own framework, his request seemed reasonable.",
  },
  {
    type: 'Vocabulary & Register',
    q: 'Robert refers to his son and daughter-in-law as "those kids." What does this word choice suggest?',
    opts: [
      'His son and Sarah are literally young children',
      'Robert sees himself as the authority figure and them as less experienced people he helped',
      'Robert has forgotten their names',
      'It is a formal, affectionate term in English',
    ],
    correct: 1,
    explanation:
      '"Those kids" infantilises the couple — framing them as recipients of Robert\'s wisdom and money rather than equals. It subtly reinforces his sense of authority and entitlement.',
  },
];

const KEY_LANGUAGE = [
  { phrase: 'inventory check', meaning: 'systematic count of stock/goods' },
  { phrase: 'rhetorical question', meaning: 'question asked for effect, not expecting an answer' },
  { phrase: 'passed down', meaning: 'given from one generation or family member to another' },
  { phrase: 'sarcasm / irony', meaning: 'saying one thing to mean the opposite, often critically' },
  { phrase: 'non-apology', meaning: 'a statement that sounds like an apology but contains no genuine remorse' },
];

// ─── Historia ─────────────────────────────────────────────────────────────────

export const theGrandfathersLedger: Historia = {
  slug: 'the-grandfathers-ledger',
  lang: 'ingles',
  icon: '🎙️',
  color: '#059669',
  level: 'B1–B2',
  title: "The Grandfather's Ledger",
  tagline: 'Pagó todo cuando nació el nieto. Tres años después llegó con la hoja de cálculo.',
  metaTitle: 'The Grandfather\'s Ledger — comprensión en inglés B1–B2',
  metaDescription:
    
    
    'Pagó todo cuando nació el nieto. Tres años después llegó con la hoja de cálculo. Dos audios, transcripción y 19 preguntas en inglés B1–B2.',
  intro:
    "A family dispute. Two versions. You decide who's right. Read the narrator's account, listen to both voice notes, and answer 19 comprehension questions covering vocabulary, inference, tone, and critical thinking.",
  narrator: {
    paragraphs: NARRATOR_PARAGRAPHS,
    questions: NARRATOR_QS,
    tip: 'Pay attention to word choices and timing — the narrator is not neutral. Look for clues about whose side the language leans toward.',
  },
  voices: [
    {
      key: 'a',
      name: 'Sarah',
      role: 'Daughter-in-law',
      sex: 'female',
      color: '#0f3d8c',
      audioSrc: '/audio/historias/ingles/the-grandfathers-ledger/a.mp3',
      paragraphs: DIL_PARAGRAPHS,
      questions: DIL_QS,
      listenHint: 'Listen carefully. There is no transcript yet — just focus on what you can understand.',
      transcriptHint: 'mark them and see their translation. Then write again what you understood.',
      write1Prompt:
        "Without looking at any transcript, write in your own words what you understood from Sarah's voice note.",
      write1Hint: "Don't worry about being perfect — this is a first impression. Write in English or Spanish.",
      write2Prompt: 'Now write again what you understood — you can be more detailed this time.',
    },
    {
      key: 'b',
      name: 'Robert',
      role: 'Father-in-law',
      sex: 'male',
      color: '#7c3aed',
      audioSrc: '/audio/historias/ingles/the-grandfathers-ledger/b.mp3',
      paragraphs: FIL_PARAGRAPHS,
      questions: FIL_QS,
      listenHint:
        'Listen without the transcript first. Then write what you understood, and compare with the transcript.',
      transcriptHint:
        "compare Robert's account with Sarah's — where do they agree? Where do they contradict each other?",
      write1Prompt:
        "Without the transcript, write in your own words what you understood from Robert's voice note.",
      write1Hint: 'This is the other side of the story. What is he saying happened? Write in English or Spanish.',
      write2Prompt: "Now write again what you understood from Robert's perspective.",
    },
  ],
  finalQuestions: FINAL_QS,
  finalIntro: [
    'These questions require you to hold both accounts in mind simultaneously and think critically about what happened, why, and how language shapes our perception.',
  ],
  dict: DICT,
  keyLanguage: KEY_LANGUAGE,
  discussion: {
    question: 'After hearing both sides — who do you think has the stronger argument, and why?',
    note: 'There is no single correct answer. The most important skill is justifying your position with evidence from the texts — using specific words, phrases, and details. That\'s exactly what B2–C1 English requires.',
  },
  ui: 'en',
};

export default theGrandfathersLedger;
