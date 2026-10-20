import { IELTS_GUIDED_SPEAKING_AUDIO_STATUS } from './guided-speaking-audio.generated.ts';

export type IeltsGuidedListeningItem = {
  number: number;
  prompt: string;
  frame: string;
  answer: string;
  accepted: string[];
  startSeconds: number;
  endSeconds: number;
  audiblePhrase: string;
  explanation: string;
  trap: string;
};

export type IeltsGuidedReadingItem = {
  number: number;
  kind: 'fill' | 'choice';
  prompt: string;
  options?: string[];
  answer: string;
  accepted: string[];
  evidenceBefore: string;
  evidenceFocus: string;
  evidenceAfter: string;
  explanation: string;
  trap: string;
};

export const IELTS_GUIDED_SET_1_AUDIO = '/audio/ielts/ielts-listening-set-1.mp3';

/**
 * A deliberately small first vertical. Every timecode is copied from the
 * owner-reviewed Set 1 Listening evidence, rather than estimated in the UI.
 */
export const IELTS_GUIDED_SET_1_LISTENING: readonly IeltsGuidedListeningItem[] = [
  {
    number: 1,
    prompt: 'Complete the address with ONE WORD ONLY.',
    frame: '24 _____ Road',
    answer: 'Ardleigh',
    accepted: ['ardleigh'],
    startSeconds: 82.78,
    endSeconds: 84.38,
    audiblePhrase: '24 Ardley Road.',
    explanation: 'La respuesta es un nombre propio. En el examen debes conservar la ortografía del dato, aunque el sonido sea breve.',
    trap: 'Escribir “Road” repite una palabra que ya aparece después del espacio y no responde al dato que falta.',
  },
  {
    number: 3,
    prompt: 'Complete the note with ONE WORD ONLY.',
    frame: 'Customer wants to visit some _____ parks with her children.',
    answer: 'theme',
    accepted: ['theme'],
    startSeconds: 139.2,
    endSeconds: 144.32,
    audiblePhrase: "The first one begins in Los Angeles and there's plenty of time to visit some of the theme parks there.",
    explanation: 'La palabra que completa la colocación es “theme”: theme parks. “Los Angeles” solo ubica la actividad.',
    trap: 'Los nombres de lugar cercanos suelen sonar importantes, pero el espacio exige el tipo de parque.',
  },
  {
    number: 5,
    prompt: 'Complete the note with ONE WORD ONLY.',
    frame: 'Customer wants to see the _____ on the way to Cambria.',
    answer: 'castle',
    accepted: ['castle'],
    startSeconds: 176.26,
    endSeconds: 181.18,
    audiblePhrase: "Someone told me there's a really nice castle near Cambria. Will we go near that?",
    explanation: '“See” anticipa un lugar o atracción. La frase nombra “castle” justo antes de confirmar Cambria.',
    trap: '“Cambria” ya está en la pregunta; copiarlo no completa la relación “see the …”.',
  },
  {
    number: 8,
    prompt: 'Complete the table with ONE WORD ONLY.',
    frame: 'Trip One · £525 per person · Includes: _____',
    answer: 'flight',
    accepted: ['flight'],
    startSeconds: 273.28,
    endSeconds: 280.98,
    audiblePhrase: 'The cost is 525 pounds per person. That includes accommodation, car rental and a flight, but no meals.',
    explanation: 'La tabla ya da el precio. Después de “includes”, el audio enumera beneficios y “flight” es el dato que falta.',
    trap: '“Meals” aparece al final, pero la negación “no meals” lo excluye. IELTS suele colocar el distractor después de la respuesta.',
  },
] as const;

/** Reading evidence is literal text from Passage 1 in IELTS Academic Set 1. */
export const IELTS_GUIDED_SET_1_READING: readonly IeltsGuidedReadingItem[] = [
  {
    number: 1,
    kind: 'fill',
    prompt: 'Some plastics behave in a similar way to _____ in that they melt under heat and can be moulded into new forms.',
    answer: 'candlewax',
    accepted: ['candlewax'],
    evidenceBefore: "Some are ‘thermoplastic’, which means that, like ",
    evidenceFocus: 'candlewax',
    evidenceAfter: ', they melt when heated and can then be reshaped.',
    explanation: 'La pregunta parafrasea “melt under heat” y “moulded into new forms”. La comparación literal es “like candlewax”.',
    trap: '“Eggs” aparece cerca, pero describe los plásticos thermosetting, que no pueden volver a su estado original.',
  },
  {
    number: 11,
    kind: 'choice',
    prompt: 'Modern-day plastic preparation is based on the same principles as that patented in 1907.',
    options: ['TRUE', 'FALSE', 'NOT GIVEN'],
    answer: 'TRUE',
    accepted: ['true'],
    evidenceBefore: 'On 13 July 1907, Baekeland took out his famous patent describing this preparation, the ',
    evidenceFocus: 'essential features of which are still in use today',
    evidenceAfter: '.',
    explanation: '“Still in use today” confirma directamente “modern-day … same principles”. Es una paráfrasis, no una coincidencia de palabras.',
    trap: 'NOT GIVEN no aplica: el texto sí conecta explícitamente el método de 1907 con el presente.',
  },
  {
    number: 12,
    kind: 'choice',
    prompt: 'Bakelite was immediately welcomed as a practical and versatile material.',
    options: ['TRUE', 'FALSE', 'NOT GIVEN'],
    answer: 'FALSE',
    accepted: ['false'],
    evidenceBefore: "Baekeland's invention, ",
    evidenceFocus: 'although treated with disdain in its early years',
    evidenceAfter: ', went on to enjoy an unparalleled popularity which lasted throughout the first half of the twentieth century.',
    explanation: '“Immediately welcomed” contradice “treated with disdain in its early years”. La respuesta es FALSE porque hay oposición explícita.',
    trap: 'La popularidad posterior es cierta, pero no demuestra aceptación inmediata; la palabra temporal cambia la respuesta.',
  },
  {
    number: 13,
    kind: 'choice',
    prompt: 'Bakelite was only available in a limited range of colours.',
    options: ['TRUE', 'FALSE', 'NOT GIVEN'],
    answer: 'FALSE',
    accepted: ['false'],
    evidenceBefore: 'Electrical manufacturers seized on its insulating properties, and consumers everywhere relished its ',
    evidenceFocus: 'dazzling array of shades',
    evidenceAfter: '.',
    explanation: '“Dazzling array” indica una variedad amplia y contradice “limited range”. Por eso la respuesta es FALSE.',
    trap: 'No necesitas encontrar la palabra “colours”: “shades” es la paráfrasis que decide la respuesta.',
  },
] as const;

export const IELTS_GUIDED_SET_1_WRITING = {
  prompt: 'In some countries, many more people are choosing to live alone nowadays than in the past. Do you think this is a positive or negative development?',
  samples: {
    '5.5': {
      label: 'Referencia aproximada · Banda 5.5',
      wordCount: 257,
      answer: [
        'Nowadays, in several countries, the number of people who choose to live alone is increasing. Some people think this is good because they can have more freedom, but other people believe it creates many social problems. In my opinion, this development has more negative effects than positive ones.',
        'Firstly, living alone is expensive and sometimes difficult. A person must pay all the rent, electricity and food without help from another person. For example, a young worker may have a normal salary but most of this money is used for the apartment. Therefore, they cannot save money or enjoy other activities. Also, when a person becomes sick, there is nobody in the house to help them, so this can be a serious problem.',
        'Secondly, people who live alone can feel lonely. They may come home after work and do not speak with anyone for the rest of the day. Although they can contact friends by phone, it is not the same like living with family. This situation can make people feel sad and they can lose connection with other persons. For this reason, many of them spend more time online, but this does not always solve the problem. However, living alone also teaches independence because people learn cooking, cleaning and organising their life by themselves.',
        'In conclusion, living alone gives freedom and independence, but I think the disadvantages are bigger. It costs more money and can cause loneliness, especially for young and old people. Governments and communities should create more activities where people living alone can meet others.',
      ].join('\n\n'),
      verdict: 'La posición es clara y la respuesta cubre la tarea, pero el desarrollo es general y el control lingüístico es irregular.',
      criteria: [
        ['Task Response', 'Responde la pregunta y mantiene una postura, aunque las ideas se desarrollan con ejemplos bastante generales.'],
        ['Coherence & Cohesion', 'Tiene párrafos claros, pero usa conectores previsibles y repite algunas relaciones lógicas.'],
        ['Lexical Resource', 'El vocabulario comunica el mensaje, con repetición y colocaciones poco naturales como “the disadvantages are bigger”.'],
        ['Grammar', 'Combina oraciones simples y complejas, pero conserva errores visibles: “not the same like” y “other persons”.'],
      ],
      notice: ['postura visible desde la introducción', 'ideas comprensibles pero previsibles', 'errores que no impiden entender'],
    },
    '9.0': {
      label: 'Referencia avanzada · Banda 9',
      wordCount: 274,
      answer: [
        'The growing preference for single-person households is often interpreted as evidence of social fragmentation. Although the trend can expose individuals to financial pressure and isolation, I regard it as broadly positive because it reflects greater personal autonomy and can produce more deliberate forms of social connection.',
        'The clearest benefit is that living alone allows adults to organise their lives without being constrained by the expectations of a household. Decisions about work, expenditure and daily routines can be made independently, which is particularly valuable for people leaving restrictive family environments or relationships. This autonomy also develops practical competence: an individual who alone must budget, maintain a home and resolve everyday problems is less able to depend passively on others. The arrangement is therefore not merely a preference for privacy, but can be an important stage in becoming self-reliant.',
        'Admittedly, a single occupant bears costs that would otherwise be shared, and an empty home can intensify loneliness. Neither outcome, however, is inevitable. People who live alone frequently invest more actively in friendships, neighbourhood groups and professional networks precisely because companionship is not automatically available at home. Their social lives may consequently be broader and more intentional than those of people who share accommodation but interact little beyond it. Moreover, policy can address the material disadvantages through affordable housing and accessible community spaces without removing the freedom to choose this way of life.',
        'In conclusion, the expansion of one-person households creates genuine financial and social risks, but these are manageable consequences rather than reasons to resist the trend. On balance, the independence it enables and the more purposeful relationships it can encourage make it a positive development.',
      ].join('\n\n'),
      verdict: 'La postura es matizada y constante; cada párrafo desarrolla una línea distinta con precisión, control y progresión natural.',
      criteria: [
        ['Task Response', 'Responde por completo, reconoce la objeción y sostiene una evaluación clara sin perder el foco.'],
        ['Coherence & Cohesion', 'Las ideas progresan de autonomía a conexión social; los enlaces son variados y casi invisibles.'],
        ['Lexical Resource', 'Usa vocabulario preciso y flexible: “social fragmentation”, “practical competence”, “purposeful relationships”.'],
        ['Grammar', 'Maneja estructuras complejas con naturalidad y puntuación precisa, sin errores que distraigan.'],
      ],
      notice: ['tesis matizada y directa', 'ejemplos integrados en el argumento', 'variedad sin vocabulario forzado'],
    },
  },
} as const;
export const IELTS_GUIDED_SET_1_SPEAKING = {
  cueCard: 'Describe a time when you visited a friend or family member at their workplace.',
  bullets: [
    'who you visited and where they work',
    'why you visited them there',
    'what you did during your visit',
    'how you felt about the experience',
  ],
  samples: {
    '5.5': {
      label: 'Referencia aproximada · Banda 5.5',
      audio: IELTS_GUIDED_SPEAKING_AUDIO_STATUS.files['5.5'],
      transcript: 'I want to talk about when I visited my cousin at his office. He works in a small travel company in Bogotá. I went there, um, last year because I was near the place and he told me to visit him. The office was not very big, but it was nice and there were maybe ten people working there. First, he showed me his desk and introduced me with his colleagues. Then we drank coffee in the kitchen and talked about his job. He works with customers and organises trips, so he uses the computer and phone a lot. I stayed for, I think, one hour. I felt happy because I never saw his workplace before and I understood his job more. It was interesting, but also a little noisy because everybody was speaking on phones.',
      verdict: 'Cubre la tarjeta y se entiende, pero las pausas, la repetición y algunos errores limitan la flexibilidad.',
      criteria: [
        ['Fluency & Coherence', 'Mantiene la respuesta, aunque depende de “and/then”, hace pausas y desarrolla poco algunos detalles.'],
        ['Lexical Resource', 'Vocabulario suficiente pero común; repite “office”, “job” y “nice”.'],
        ['Grammar', 'Alterna estructuras básicas con algunos errores: “introduced me with” y control irregular del pasado.'],
        ['Pronunciation', 'La referencia prioriza claridad general; una banda real exige evaluar ritmo, acento y sonidos en la voz del candidato.'],
      ],
    },
    '9.0': {
      label: 'Referencia avanzada · Banda 9',
      audio: IELTS_GUIDED_SPEAKING_AUDIO_STATUS.files['9.0'],
      transcript: [
        "A workplace visit that has stayed with me was the afternoon I spent at my aunt's architectural studio in Medellín. I had always associated her job with sketches and attractive buildings, but I had very little idea of how collaborative the work actually was. I went because I was considering architecture as a possible degree, and she suggested that observing the studio would be more useful than simply reading about the profession.",
        'When I arrived, she was preparing a proposal for a small public library. She showed me an early hand-drawn concept and then the detailed digital model her team had developed from it. What fascinated me most was a design meeting in which the architects challenged one another\'s assumptions about light, accessibility and cost. Later, I helped organise material samples for a client presentation. It was a minor task, but it made me feel briefly involved rather than merely being a visitor.',
        'I left feeling impressed and slightly overwhelmed. The visit confirmed that architecture can be highly creative, but it also revealed the patience and negotiation hidden behind the finished building. Although I eventually chose a different field, that afternoon changed the way I look at public spaces because I now notice the decisions that shape how people move through them.',
      ].join('\n\n'),
      verdict: 'La respuesta avanza con naturalidad, desarrolla detalles precisos y utiliza el lenguaje con flexibilidad y control.',
      criteria: [
        ['Fluency & Coherence', 'Construye una historia completa, enlaza reflexión y detalle, y mantiene el ritmo sin conectores mecánicos.'],
        ['Lexical Resource', 'El vocabulario es específico y natural: “collaborative”, “challenged assumptions”, “material samples”.'],
        ['Grammar', 'Combina tiempos y estructuras complejas con control, incluido contraste, subordinación y énfasis.'],
        ['Pronunciation', 'El audio facilita seguir el ritmo del modelo; la banda real depende de la pronunciación producida por cada candidato.'],
      ],
    },
  },
} as const;
// End of the owner-reviewed IELTS Set 1 guided references.
