// ─── The Locked Phone — contenido del ejercicio ───────────────────────────────
// Comprensión integrada B1–B2: narrador (lectura) + 2 notas de voz (listening).
// Los audios viven en /public/audio/locked-phone/{girlfriend,boyfriend}.mp3
//
// Diseño pedagógico: ninguno de los dos personajes tiene toda la razón. El único
// hecho que confirman ambas versiones es el celular boca abajo; todo lo demás es
// interpretación. Las transcripciones deben coincidir palabra por palabra con los
// audios grabados — ver docs/audio-scripts-the-locked-phone.md.
//
// Esta historia es la referencia del formato: es la única que ya tiene las dos
// grabaciones hechas. Las demás copian su estructura.

import type { Historia, StoryQuestion as Question } from '../types';

// ─── Diccionario de traducción (click en cualquier palabra) ───────────────────
// Claves normalizadas: solo letras a-z en minúscula (así llegan desde el texto).

const DICT: Record<string, string> = {
  // Objetos y escena
  phone: 'teléfono / celular',
  screen: 'pantalla',
  notification: 'notificación',
  facedown: 'boca abajo',
  counter: 'mesón / encimera',
  sofa: 'sofá',
  dinner: 'cena',
  table: 'mesa',
  kitchen: 'cocina',
  photos: 'fotos',
  messages: 'mensajes',
  location: 'ubicación',
  lunch: 'almuerzo',
  dog: 'perro',
  scores: 'marcadores / resultados',
  football: 'fútbol',
  silent: 'en silencio / silenciado',
  dark: 'oscuridad / a oscuras',
  interviews: 'entrevistas (de trabajo)',
  job: 'trabajo / empleo',
  work: 'trabajo / trabajar',

  // Verbos clave
  lit: 'se iluminó / se encendió',
  lights: 'se ilumina / se enciende',
  flips: 'voltea / da vuelta',
  flipped: 'volteó / dio vuelta',
  turned: 'giró / volteó',
  noticed: 'notó / se dio cuenta',
  scrolling: 'deslizando la pantalla',
  pretending: 'fingiendo / haciendo como si',
  handing: 'entregar / pasar (algo a alguien)',
  hand: 'entregar / pasar',
  handed: 'entregó',
  refused: 'se negó',
  refusing: 'negarse',
  refusal: 'negativa / rechazo',
  crossed: 'cruzó / traspasó',
  halfjoking: 'medio en broma',
  handled: 'manejó / gestionó (una situación)',
  kept: 'siguió (haciendo algo)',
  prepares: 'prepara',
  sounded: 'sonaba / sonó',
  sounding: 'sonando / pareciendo',
  acting: 'actuando / comportándose',
  leaves: 'deja (algo en algún sitio)',
  losing: 'perdiendo',
  cost: 'costar / cuesta',
  hide: 'esconder / ocultar',
  hiding: 'escondiendo / ocultando',
  hidden: 'oculto/a',
  prove: 'demostrar / probar',
  proof: 'prueba',
  check: 'revisar / revisión',
  checking: 'revisando',
  investigated: 'investigado',
  investigating: 'investigando',
  explained: 'explicó',
  explaining: 'explicando',
  explanation: 'explicación',
  apologising: 'disculparse',
  apologizing: 'disculparse',
  apology: 'disculpa',
  slept: 'durmió / durmieron',
  woke: 'se despertó',
  offered: 'ofreció',
  replying: 'respondiendo / contestando',
  picks: 'elige / escoge',
  meant: 'lo dije en serio / quise decir',
  keeping: 'guardando / llevando (un registro)',
  point: 'señalar / el punto, el asunto',
  trust: 'confiar / confianza',
  admit: 'admitir / reconocer',
  admitted: 'admitió',
  settle: 'resolver / zanjar',

  // Vocabulario emocional / relacional
  off: 'raro / distinto (no como siempre)',
  feeling: 'presentimiento / sensación',
  gut: 'instinto / corazonada (lit. estómago)',
  instinct: 'instinto',
  privacy: 'privacidad',
  private: 'privado/a',
  boundary: 'límite',
  boundaries: 'límites',
  line: 'línea / límite',
  principle: 'principio',
  principles: 'principios',
  toxic: 'tóxico/a',
  jealous: 'celoso/a',
  jealousy: 'celos',
  paranoid: 'paranoico/a',
  crazy: 'loco/a',
  suspicious: 'sospechoso/a / desconfiado/a',
  suspicion: 'sospecha',
  guilty: 'culpable',
  guilt: 'culpa',
  crime: 'crimen / delito',
  trial: 'juicio',
  innocent: 'inocente',
  liar: 'mentiroso/a',
  lying: 'mintiendo / mentir',
  lie: 'mentira / mentir',
  betrayed: 'traicionado/a',
  hurt: 'herido/a / lastimado/a',
  insecure: 'inseguro/a',
  insecurity: 'inseguridad',
  reassurance: 'tranquilidad / que te den seguridad',
  defensive: 'a la defensiva',
  dismissive: 'despectivo/a / que resta importancia',
  exhausting: 'agotador/a',
  exhausted: 'agotado/a',
  overthinking: 'darle demasiadas vueltas',
  overreacting: 'exagerando la reacción',
  respect: 'respeto / respetar',
  relationship: 'relación',
  couple: 'pareja',
  girlfriend: 'novia',
  boyfriend: 'novio',
  ex: 'ex (pareja anterior)',
  awful: 'horrible / terrible',
  quiet: 'callado/a',
  distant: 'distante',
  genuinely: 'genuinamente / de verdad',
  genuine: 'genuino/a / auténtico/a',
  honestly: 'honestamente / la verdad',
  seriously: 'en serio',
  literally: 'literalmente',
  apparently: 'aparentemente / al parecer',
  obviously: 'obviamente',
  probably: 'probablemente',
  actually: 'en realidad',
  simply: 'simplemente',
  entirely: 'totalmente / por completo',
  suddenly: 'de repente',
  willing: 'dispuesto/a',
  unwilling: 'no dispuesto/a',
  normal: 'normal',
  evidence: 'evidencia / prueba',
  test: 'prueba / test',
  gesture: 'gesto',
  demand: 'exigencia / exigir',
  request: 'petición / solicitud',
  permission: 'permiso',
  access: 'acceso',
  control: 'control / controlar',
  controlling: 'controlador/a',
  precedent: 'precedente',
  pattern: 'patrón / conducta repetida',
  expectation: 'expectativa',
  expectations: 'expectativas',
  assumption: 'suposición',
  assumptions: 'suposiciones',
  perception: 'percepción',
  perspective: 'perspectiva / punto de vista',
  account: 'versión / relato de los hechos',
  version: 'versión',
  contested: 'cuestionado/a / en disputa',
  objective: 'objetivo/a / imparcial',
  neutral: 'neutral / imparcial',
  inference: 'inferencia / deducción',
  sarcasm: 'sarcasmo',
  sarcastic: 'sarcástico/a',
  irony: 'ironía',
  rhetorical: 'retórico/a',
  register: 'registro (nivel de formalidad)',
  metaphor: 'metáfora',
  label: 'etiqueta',
  hyperbole: 'hipérbole / exageración',
  vulnerable: 'vulnerable',
  indignant: 'indignado/a',
  frustrated: 'frustrado/a',
  joking: 'bromeando',
  joke: 'broma / bromear',

  // Conectores y expresiones frecuentes en los audios
  though: 'aunque / sin embargo',
  unless: 'a menos que',
  instead: 'en cambio / en su lugar',
  neither: 'ninguno de los dos',
  itself: 'en sí mismo / por sí solo',
  supposed: 'se supone que (debo / debe)',
  besides: 'además',
  anyway: 'de todos modos',
  whatever: 'da igual / lo que sea',
  nobody: 'nadie',
  nothing: 'nada',
  somebody: 'alguien',
  everywhere: 'en todas partes',
  moment: 'momento',
  thing: 'cosa',
  stuff: 'cosas',
  guy: 'tipo / hombre',
  speech: 'discurso',
  answer: 'respuesta / responder',
  answers: 'respuestas',
  question: 'pregunta',
  questions: 'preguntas',
  difference: 'diferencia',
  truth: 'verdad',
  whole: 'entero/a / todo el',
  past: 'superar algo / dejarlo atrás ("get past it")',
  face: 'cara ("face up" = boca arriba)',
  chats: 'chats / conversaciones',
  fair: 'justo/a',
  fairness: 'justicia / equidad',
  wrong: 'equivocado/a / mal',
  worse: 'peor',
  better: 'mejor',
  spring: 'primavera',
  night: 'noche',
  morning: 'mañana',
  weeks: 'semanas',
  weekend: 'fin de semana',
};

// ─── Textos ───────────────────────────────────────────────────────────────────

const NARRATOR_PARAGRAPHS = [
  'Jess and Tom have been together for two years, and they moved in together last spring.',
  "Last Friday, over dinner, Tom's phone lit up on the table and he turned it face-down without saying a word.",
  "Jess noticed. She didn't say anything at first.",
  'Later that night, half-joking, she asked if she could look through his phone.',
  'Tom said no.',
  "He wasn't angry. He told her his phone was private, and that handing it over wasn't something he was willing to do — for anybody.",
  'Instead, he offered to answer any question she wanted to ask.',
  'Jess told him that a refusal was an answer in itself.',
  'Neither of them slept much that night, and by Saturday morning both of them were telling the story to somebody else.',
];

const GF_PARAGRAPHS = [
  "Okay, I need to say this out loud, because I think I'm losing my mind.",
  'You know how Tom leaves his phone everywhere? On the sofa, on the kitchen counter, face up, no problem.',
  "Well, on Friday we're having dinner, his phone lights up, and he flips it over.",
  'Face-down.',
  "Didn't even look at me.",
  'And I sat there for an hour pretending it was nothing.',
  'So later I said, kind of joking, "let me see your phone."',
  'And he goes: "no."',
  'Not "sure, here." Not "why?" Just no.',
  'Two years together, and the answer is no?',
  'And then he starts explaining about privacy, and principles, and boundaries.',
  'Boundaries. Please.',
  "I wasn't going to read his messages. I wanted to watch him hand it over. That was the whole test.",
  "Because if you've got nothing to hide, why does it cost you so much to prove it?",
  'And the more he explained, the worse it sounded.',
  "Nobody prepares a speech about privacy unless they've already been thinking about it.",
  'He kept saying, "ask me anything, I\'ll tell you the truth."',
  "Great. So I'm supposed to trust the man who won't let me check.",
  "And now he's acting like I'm the one who did something wrong.",
  'Apparently I "crossed a line."',
  'I crossed a line.',
  "Honestly, if he'd just given me the phone, I probably wouldn't even have opened it.",
  "That's the part that kills me.",
];

const BF_PARAGRAPHS = [
  "Man, I don't even know how to explain this without sounding like the bad guy.",
  'Friday night. Dinner. My phone lights up, I put it face-down.',
  "I always put my phone face-down at dinner. I've done that since I was nineteen.",
  "Apparently that's evidence now.",
  'Later she asks to see my phone.',
  "And look — there's nothing on that phone. Nothing.",
  'Work group chats, my mother, football scores, forty photos of the dog.',
  "But that's not the point.",
  "The point is I'm not handing over my phone to prove I'm not a liar.",
  "Because once you do that, that's the new normal, isn't it?",
  "This month it's the phone. Next month it's my location, then it's who I had lunch with.",
  "I told her: ask me anything. Anything at all. I'll answer.",
  "She didn't want answers. She wanted the phone.",
  "And I get it, I do. I know she's been hurt before, and I know her ex was genuinely awful.",
  "But I'm not him.",
  "I'm being investigated for something somebody else did.",
  "And now I'm the suspicious one, because I said no.",
  "That's the part I can't get past.",
  "If saying no makes you guilty, then there's no answer that works.",
  'Look — maybe I could have handled the moment better. Maybe.',
  "But I'm not apologising for having a line.",
];

// ─── Preguntas ────────────────────────────────────────────────────────────────

const NARRATOR_QS: Question[] = [
  {
    type: 'Vocabulary',
    q: 'The narrator says Tom’s phone "lit up on the table." What does this mean?',
    opts: [
      'The phone caught fire',
      'The screen turned on because a message or notification arrived',
      'Tom picked the phone up and unlocked it',
      'The phone was unusually bright that evening',
    ],
    correct: 1,
    explanation:
      '"To light up" describes a screen switching on by itself — normally because a notification has just arrived. It is the trigger for everything that follows.',
  },
  {
    type: 'Inference',
    q: 'The narrator says Jess asked "half-joking." What does this word choice suggest?',
    opts: [
      'Jess had no real interest in the phone',
      'Jess was making fun of Tom to hurt him',
      'The request was wrapped in a joke but carried a real intention behind it',
      'Jess had already looked at the phone earlier that week',
    ],
    correct: 2,
    explanation:
      '"Half-joking" gives both people room to interpret the moment differently: Jess can say she was only playing; Tom can hear a serious accusation. That ambiguity is where the argument starts.',
  },
  {
    type: 'Comprehension',
    q: 'What did Tom offer instead of giving her the phone?',
    opts: [
      'To delete the messages in front of her',
      'To answer any question she wanted to ask',
      'To show her only the photos',
      'To give her the phone the following day',
    ],
    correct: 1,
    explanation:
      'The narrator states he "offered to answer any question she wanted to ask." Tom separates two things Jess treats as one: giving information and giving access.',
  },
  {
    type: 'Critical Thinking',
    q: '"Jess told him that a refusal was an answer in itself." What assumption is behind this statement?',
    opts: [
      'That people who refuse are usually tired or busy',
      'That an innocent person would have agreed, so saying no is itself evidence of guilt',
      'That Tom had legally promised to share his phone',
      'That refusing a request is always impolite in English',
    ],
    correct: 1,
    explanation:
      'Jess treats the refusal as proof. The hidden assumption — "innocent people agree" — leaves Tom with no possible way to demonstrate innocence, which is exactly what he objects to later.',
  },
];

const GF_QS: Question[] = [
  {
    type: 'Comprehension',
    q: 'According to Jess, what did she actually want when she asked for the phone?',
    opts: [
      'To read two years of his messages',
      'To find out who had sent the notification at dinner',
      'To watch him willingly hand it over — the request was a test',
      'To check his location history',
    ],
    correct: 2,
    explanation:
      'She says it directly: "I wasn\'t going to read his messages. I wanted to watch him hand it over. That was the whole test." For Jess the gesture mattered, not the contents.',
  },
  {
    type: 'Inference',
    q: '"If you\'ve got nothing to hide, why does it cost you so much to prove it?" What is the problem with this rhetorical question?',
    opts: [
      'It is grammatically incorrect in English',
      'It assumes refusal equals guilt, so no response Tom gives can clear him',
      'It shows Jess already knows what is on the phone',
      'It proves Jess does not care about the relationship',
    ],
    correct: 1,
    explanation:
      'A rhetorical question expects no answer — it delivers a verdict. The logic is closed: agreeing looks like proof, refusing looks like guilt. Tom names this same trap from his side later.',
  },
  {
    type: 'Tone',
    q: 'How would you best describe the tone of Jess’s voice note?',
    opts: [
      'Calm, measured and analytical',
      'Formal and professional',
      'Angry and sarcastic, but framed by self-doubt and hurt',
      'Playful and light-hearted throughout',
    ],
    correct: 2,
    explanation:
      'The sarcasm is real ("Boundaries. Please.") — but look at the frame around it: she opens with "I think I\'m losing my mind" and closes with "that\'s the part that kills me." The anger is sitting on top of hurt.',
  },
  {
    type: 'Vocabulary',
    q: '"Boundaries. Please." — what is Jess doing with this two-word reply?',
    opts: [
      'Politely agreeing that boundaries matter in a relationship',
      'Repeating Tom’s own vocabulary sarcastically to dismiss it as an excuse',
      'Asking Tom to explain the word to her',
      'Quoting a therapist she has been seeing',
    ],
    correct: 1,
    explanation:
      'Echoing somebody’s word back as a one-word sentence, followed by "please," is a common sarcastic move in spoken English: it rejects the word itself as fake or pretentious.',
  },
  {
    type: 'Vocabulary & Register',
    q: 'Jess says: Apparently I "crossed a line." Why does she put those words in quotation marks?',
    opts: [
      'She is quoting a legal document',
      'She is quoting Tom’s words to distance herself from them and signal she rejects the label',
      'It is a fixed expression that always requires quotation marks',
      'She is unsure how to translate the phrase',
    ],
    correct: 1,
    explanation:
      'These are "scare quotes." By repeating the phrase and then saying it again flatly — "I crossed a line." — she shows the accusation is his, not hers, and that she finds it absurd.',
  },
];

const BF_QS: Question[] = [
  {
    type: 'Comprehension',
    q: 'What reason does Tom give for refusing?',
    opts: [
      'There are messages on the phone he does not want her to see',
      'The phone belongs to his employer',
      'Not that he is hiding something — but that agreeing once would create a permanent expectation of checks',
      'He had forgotten his password',
    ],
    correct: 2,
    explanation:
      'He insists the content is irrelevant ("there\'s nothing on that phone") and frames the refusal around what the act would establish going forward, not around what it would reveal.',
  },
  {
    type: 'Vocabulary',
    q: '"This month it\'s the phone. Next month it\'s my location, then it\'s who I had lunch with." What argument technique is this?',
    opts: [
      'A slippery-slope argument — one small concession is presented as leading to escalating demands',
      'A direct quotation of what Jess demanded',
      'An apology for his behaviour at dinner',
      'A factual account of what has already happened',
    ],
    correct: 0,
    explanation:
      'The slippery slope predicts a chain reaction from a single first step. It is persuasive — but notice it describes a future Tom imagines, not events that have occurred.',
  },
  {
    type: 'Inference',
    q: '"I\'m being investigated for something somebody else did." What does this line reveal?',
    opts: [
      'Tom is under investigation by the police',
      'Tom believes he is paying the price for the behaviour of Jess’s ex-partner',
      'Tom has done the same thing as her ex-partner',
      'Tom wants Jess to contact her ex',
    ],
    correct: 1,
    explanation:
      'The legal metaphor ("investigated," "suspicious," "evidence") runs through his whole account. He casts himself as wrongly accused — punished for a history that is not his.',
  },
  {
    type: 'Critical Thinking',
    q: '"If saying no makes you guilty, then there\'s no answer that works." What is Tom pointing out?',
    opts: [
      'That Jess never asks him questions',
      'That the request cannot be passed or failed honestly — any response confirms the suspicion',
      'That he plans to end the relationship',
      'That he did not understand the question she asked',
    ],
    correct: 1,
    explanation:
      'He is identifying an unfalsifiable claim: a suspicion no evidence could ever disprove. It is the exact mirror of Jess’s rhetorical question — the same logic, seen from the other side.',
  },
  {
    type: 'Tone',
    q: '"Look — maybe I could have handled the moment better. Maybe." What does the repeated "maybe" convey?',
    opts: [
      'Full acceptance of responsibility',
      'Complete confusion about what happened',
      'A minimal concession that he immediately withdraws — an apology-shaped sentence that admits nothing',
      'Genuine remorse and a plan to change',
    ],
    correct: 2,
    explanation:
      'The first "maybe" opens a door; the second closes it. He concedes the manner, never the decision — and the next line ("But I\'m not apologising…") confirms it.',
  },
];

const FINAL_QS: Question[] = [
  {
    type: 'Synthesis',
    q: 'Which detail is confirmed by BOTH accounts?',
    opts: [
      'Tom received a message from another woman',
      'Jess read part of the conversation before asking',
      'Tom turned his phone face-down at dinner',
      'Tom apologised the following morning',
    ],
    correct: 2,
    explanation:
      'The face-down phone is the only objective fact both people report. Its meaning is entirely contested: for Jess it is a reaction, for Tom it is a habit he has had since he was nineteen.',
  },
  {
    type: 'Perspective',
    q: 'Jess calls the request "a test." Tom calls it an "investigation." What does this gap show?',
    opts: [
      'One of them is deliberately lying about the event',
      'The same action carries opposite meanings depending on what each person believes it symbolises',
      'Neither of them remembers the evening clearly',
      'Tom uses more advanced vocabulary than Jess',
    ],
    correct: 1,
    explanation:
      'Intent versus impact. Jess intended a small gesture of reassurance; Tom experienced an accusation requiring proof. Neither is inventing the evening — they are describing different experiences of it.',
  },
  {
    type: 'Critical Thinking',
    q: 'Which is the most accurate ROOT cause of this conflict?',
    opts: [
      'Tom is hiding something on his phone',
      'Jess is simply a jealous person',
      'The couple had never agreed what privacy means between them before the moment it was tested',
      'Jess’s ex-partner',
    ],
    correct: 2,
    explanation:
      'Is a shared phone normal in this relationship or not? Nobody had ever decided. The rule was invented in the middle of an argument — which is why both feel the other broke it.',
  },
  {
    type: 'Vocabulary & Register',
    q: 'Jess says Tom accused her of "crossing a line." Tom says he will not apologise "for having a line." What does this shared metaphor show?',
    opts: [
      'They are quoting the same film',
      'Both use an identical boundary metaphor to defend opposite positions — each believes they are the one protecting a limit',
      '"Line" means something completely different in each case',
      'It proves Tom is copying Jess’s vocabulary',
    ],
    correct: 1,
    explanation:
      'The same image — a line that must not be crossed — is doing opposite work in each account. In most relationship conflicts, both people believe they are defending a boundary, not attacking one.',
  },
  {
    type: 'Inference',
    q: '"If he\'d just given me the phone, I probably wouldn\'t even have opened it." What does this reveal?',
    opts: [
      'Jess was lying about wanting to see the phone',
      'What Jess wanted was reassurance, not information — and the only thing that would have given it to her was the exact act Tom refused on principle',
      'Jess had already opened the phone earlier that week',
      'Jess does not know his password',
    ],
    correct: 1,
    explanation:
      'This is the trap at the centre of the story. She needed a gesture; he could only see a precedent. There was no version of that evening in which both of them got what they needed.',
  },
];

const KEY_LANGUAGE = [
  { phrase: 'to light up', meaning: 'a screen switching on by itself (a notification arrives)' },
  { phrase: 'face-down', meaning: 'turned so the screen cannot be seen — literal act, symbolic meaning' },
  { phrase: 'scare quotes', meaning: "quoting somebody's words to show you reject them" },
  { phrase: 'slippery slope', meaning: 'arguing that one small concession leads to worse ones' },
  { phrase: 'non-apology', meaning: 'sounds like an apology but admits nothing ("maybe… maybe")' },
  { phrase: 'unfalsifiable', meaning: 'a suspicion that no evidence could ever disprove' },
];

// ─── Historia ─────────────────────────────────────────────────────────────────

export const theLockedPhone: Historia = {
  slug: 'the-locked-phone',
  lang: 'ingles',
  icon: '📵',
  color: '#be185d',
  level: 'B1–B2',
  title: 'The Locked Phone',
  tagline: 'Ella pidió revisarle el celular. Él dijo que no. Dos versiones de la misma noche.',
  metaTitle: 'The Locked Phone — comprensión en inglés B1–B2',
  metaDescription:
    
    
    'Ella pidió revisarle el celular. Él dijo que no. Dos versiones de la misma noche. Dos audios, transcripción y 19 preguntas en inglés B1–B2.',
  intro:
    "A couple, one phone, and two completely different versions of the same Friday night. Read the narrator's account, listen to both voice notes, and answer 19 comprehension questions covering vocabulary, inference, tone and critical thinking.",
  narrator: {
    paragraphs: NARRATOR_PARAGRAPHS,
    questions: NARRATOR_QS,
    tip: 'Notice how little actually happened — nobody read a message, nobody was caught doing anything. The whole argument is built out of small details and the meaning each person gives them. Watch the words the narrator chooses: they are not neutral either.',
  },
  voices: [
    {
      key: 'a',
      name: 'Jess',
      role: 'Girlfriend',
      sex: 'female',
      color: '#0f3d8c',
      audioSrc: '/audio/locked-phone/girlfriend.mp3',
      paragraphs: GF_PARAGRAPHS,
      questions: GF_QS,
      listenHint: 'Listen carefully. There is no transcript yet — just focus on what you can understand.',
      transcriptHint: 'mark them and see their translation. Then write again what you understood.',
      write1Prompt: "Without looking at any transcript, write in your own words what you understood from Jess's voice note.",
      write1Hint: "Don't worry about being perfect — this is a first impression. Write in English or Spanish.",
      write2Prompt: 'Now write again what you understood — you can be more detailed this time.',
    },
    {
      key: 'b',
      name: 'Tom',
      role: 'Boyfriend',
      sex: 'male',
      color: '#7c3aed',
      audioSrc: '/audio/locked-phone/boyfriend.mp3',
      paragraphs: BF_PARAGRAPHS,
      questions: BF_QS,
      listenHint: 'Listen without the transcript first. Tom repeats one detail Jess also mentioned — listen for it. Then write what you understood, and compare with the transcript.',
      transcriptHint: "compare Tom's account with Jess's — which details do they both report? Where do they contradict each other?",
      write1Prompt: "Without the transcript, write in your own words what you understood from Tom's voice note.",
      write1Hint: 'This is the other side of the story. What is he saying happened? Write in English or Spanish.',
      write2Prompt: "Now write again what you understood from Tom's perspective.",
    },
  ],
  finalQuestions: FINAL_QS,
  finalIntro: [
    'Now you know something neither of them knows: you have heard both accounts. These questions ask you to hold them side by side — which details survive in both versions, where each person is right, and where being right is not the same as being fair.',
    'Pay attention to the words both of them reach for. When two people use the same image to defend opposite positions, that is usually where the real disagreement is hiding.',
  ],
  dict: DICT,
  keyLanguage: KEY_LANGUAGE,
  discussion: {
    question: 'Is refusing the same as hiding? And can a request be reasonable and still be unfair?',
    note: 'There is no single correct answer. The skill being tested is defending your position with evidence from the texts — specific words, phrases and details from each account. That is exactly what B2–C1 English requires.',
  },
  ui: 'en',
};

export default theLockedPhone;
