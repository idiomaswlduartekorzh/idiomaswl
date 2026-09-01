export const TOEFL_MOCK_LIBRARY_HREF = '/examenes/toefl#practica' as const;

export type ToeflExerciseSectionId = 'reading' | 'listening' | 'writing' | 'speaking';

export type ToeflExerciseAvailability =
  | {
      kind: 'individual';
      href: string;
      actionLabel: string;
    }
  | {
      kind: 'mock-only';
      href: typeof TOEFL_MOCK_LIBRARY_HREF;
      actionLabel: 'Practicar en simulacros';
    };

export type ToeflExerciseCatalogItem = {
  id: string;
  officialName: string;
  spanishExplanation: string;
  availability: ToeflExerciseAvailability;
  sourceClaimIds: readonly string[];
};

export type ToeflExerciseSection = {
  id: ToeflExerciseSectionId;
  label: 'Reading' | 'Listening' | 'Writing' | 'Speaking';
  description: string;
  guideHref: string;
  sourceClaimId: 'C03' | 'C04' | 'C05' | 'C06';
  items: readonly ToeflExerciseCatalogItem[];
};

export const TOEFL_EXERCISE_SECTIONS = [
  {
    id: 'reading',
    label: 'Reading',
    description: 'Vocabulario en contexto, textos cotidianos y comprensión académica.',
    guideHref: '/practica/toefl/reading',
    sourceClaimId: 'C03',
    items: [
      {
        id: 'reading-complete-words',
        officialName: 'Complete the Words',
        spanishExplanation: 'Completa palabras parcialmente ocultas usando vocabulario, gramática y contexto.',
        availability: {
          kind: 'individual',
          href: '/practica/toefl/reading/formato-2026/complete-the-words',
          actionLabel: 'Practicar ahora',
        },
        sourceClaimIds: ['C03'],
      },
      {
        id: 'reading-daily-life',
        officialName: 'Read in Daily Life',
        spanishExplanation: 'Lee avisos, mensajes y textos informativos breves de situaciones cotidianas.',
        availability: {
          kind: 'individual',
          href: '/practica/toefl/reading/formato-2026/read-in-daily-life',
          actionLabel: 'Practicar ahora',
        },
        sourceClaimIds: ['C03'],
      },
      {
        id: 'reading-academic-passage',
        officialName: 'Read an Academic Passage',
        spanishExplanation: 'Trabaja ideas principales, detalles, inferencias y vocabulario en un texto académico.',
        availability: {
          kind: 'individual',
          href: '/practica/toefl/reading/formato-2026/read-an-academic-passage',
          actionLabel: 'Practicar ahora',
        },
        sourceClaimIds: ['C03'],
      },
    ],
  },
  {
    id: 'listening',
    label: 'Listening',
    description: 'Respuestas apropiadas, conversaciones, anuncios y charlas académicas.',
    guideHref: '/practica/toefl/listening',
    sourceClaimId: 'C04',
    items: [
      {
        id: 'listening-choose-response',
        officialName: 'Listen and Choose a Response',
        spanishExplanation: 'Escucha una intervención breve y elige la respuesta que mejor encaja.',
        availability: {
          kind: 'mock-only',
          href: TOEFL_MOCK_LIBRARY_HREF,
          actionLabel: 'Practicar en simulacros',
        },
        sourceClaimIds: ['C04'],
      },
      {
        id: 'listening-conversation',
        officialName: 'Listen to a Conversation',
        spanishExplanation: 'Identifica ideas, detalles e intención en una conversación de contexto universitario.',
        availability: {
          kind: 'mock-only',
          href: TOEFL_MOCK_LIBRARY_HREF,
          actionLabel: 'Practicar en simulacros',
        },
        sourceClaimIds: ['C04'],
      },
      {
        id: 'listening-announcement',
        officialName: 'Listen to an Announcement',
        spanishExplanation: 'Reconoce propósito, información clave y próximos pasos en un anuncio.',
        availability: {
          kind: 'mock-only',
          href: TOEFL_MOCK_LIBRARY_HREF,
          actionLabel: 'Practicar en simulacros',
        },
        sourceClaimIds: ['C04'],
      },
      {
        id: 'listening-academic-talk',
        officialName: 'Listen to an Academic Talk',
        spanishExplanation: 'Sigue la organización, las ideas y los ejemplos de una charla académica breve.',
        availability: {
          kind: 'mock-only',
          href: TOEFL_MOCK_LIBRARY_HREF,
          actionLabel: 'Practicar en simulacros',
        },
        sourceClaimIds: ['C04'],
      },
    ],
  },
  {
    id: 'writing',
    label: 'Writing',
    description: 'Construcción de oraciones, escritura funcional y discusión académica.',
    guideHref: '/practica/toefl/writing',
    sourceClaimId: 'C05',
    items: [
      {
        id: 'writing-build-sentence',
        officialName: 'Build a Sentence',
        spanishExplanation: 'Ordena palabras y frases para formar una oración o pregunta completa.',
        availability: {
          kind: 'individual',
          href: '/practica/toefl/writing/build-a-sentence',
          actionLabel: 'Practicar ahora',
        },
        sourceClaimIds: ['C05'],
      },
      {
        id: 'writing-email',
        officialName: 'Write an Email',
        spanishExplanation: 'Escribe un correo claro para solicitar, informar o proponer una solución.',
        availability: {
          kind: 'individual',
          href: '/practica/toefl/writing/write-an-email',
          actionLabel: 'Abrir guía y banco de prompts',
        },
        sourceClaimIds: ['C05'],
      },
      {
        id: 'writing-academic-discussion',
        officialName: 'Write for an Academic Discussion',
        spanishExplanation: 'Presenta y respalda una opinión dentro de una conversación académica.',
        availability: {
          kind: 'individual',
          href: '/practica/toefl/writing/academic-discussion',
          actionLabel: 'Abrir guía y banco de prompts',
        },
        sourceClaimIds: ['C05'],
      },
    ],
  },
  {
    id: 'speaking',
    label: 'Speaking',
    description: 'Repetición precisa y respuestas espontáneas en una entrevista simulada.',
    guideHref: '/practica/toefl/speaking',
    sourceClaimId: 'C06',
    items: [
      {
        id: 'speaking-repeat',
        officialName: 'Listen and Repeat',
        spanishExplanation: 'Escucha una oración y repítela con precisión e inteligibilidad.',
        availability: {
          kind: 'mock-only',
          href: TOEFL_MOCK_LIBRARY_HREF,
          actionLabel: 'Practicar en simulacros',
        },
        sourceClaimIds: ['C06'],
      },
      {
        id: 'speaking-interview',
        officialName: 'Take an Interview',
        spanishExplanation: 'Responde preguntas sobre experiencias y opiniones con claridad y ritmo natural.',
        availability: {
          kind: 'mock-only',
          href: TOEFL_MOCK_LIBRARY_HREF,
          actionLabel: 'Practicar en simulacros',
        },
        sourceClaimIds: ['C06'],
      },
    ],
  },
] as const satisfies readonly ToeflExerciseSection[];

export const TOEFL_EXERCISE_COUNT = TOEFL_EXERCISE_SECTIONS.reduce(
  (total, section) => total + section.items.length,
  0,
);
