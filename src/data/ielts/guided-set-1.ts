import { getIeltsGuidedSpeakingReference } from './guided-speaking-references.ts';

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
  prompt: 'In some countries, many more people are choosing to live alone nowadays than in the past. Do you think this is a positive or negative development?\n\nGive reasons for your answer and include any relevant examples from your own knowledge or experience.\n\nWrite at least 250 words.',
  samples: {
    '5.5': {
      label: 'Referencia pedagógica aproximada · Banda 5.5',
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
        ['Grammatical Range & Accuracy', 'Combina oraciones simples y complejas, pero conserva errores visibles: “not the same like” y “other persons”.'],
      ],
      notice: ['postura visible desde la introducción', 'ideas comprensibles pero previsibles', 'errores que no impiden entender'],
    },
    '9.0': {
      label: 'Referencia pedagógica aproximada · Banda 9',
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
        ['Grammatical Range & Accuracy', 'Maneja estructuras complejas con naturalidad y puntuación precisa, sin errores que distraigan.'],
      ],
      notice: ['tesis matizada y directa', 'ejemplos integrados en el argumento', 'variedad sin vocabulario forzado'],
    },
  },
} as const;
export const IELTS_GUIDED_SET_1_SPEAKING = getIeltsGuidedSpeakingReference(1);
// End of the owner-reviewed IELTS Set 1 guided references.
