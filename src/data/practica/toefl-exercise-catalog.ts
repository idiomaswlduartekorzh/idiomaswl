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
      actionLabel: 'Practice in full mocks';
    };

export type ToeflExerciseCatalogItem = {
  id: string;
  officialName: string;
  explanation: string;
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
    description: 'Context vocabulary, everyday texts, and academic reading.',
    guideHref: '/practica/toefl/reading',
    sourceClaimId: 'C03',
    items: [
      {
        id: 'reading-complete-words',
        officialName: 'Complete the Words',
        explanation: 'Complete partially hidden words by using grammar, vocabulary, and context.',
        availability: {
          kind: 'individual',
          href: '/practica/toefl/reading/formato-2026/complete-the-words',
          actionLabel: 'Choose an exercise',
        },
        sourceClaimIds: ['C03'],
      },
      {
        id: 'reading-daily-life',
        officialName: 'Read in Daily Life',
        explanation: 'Read notices, messages, and short informational texts from everyday situations.',
        availability: {
          kind: 'individual',
          href: '/practica/toefl/reading/formato-2026/read-in-daily-life',
          actionLabel: 'Choose an exercise',
        },
        sourceClaimIds: ['C03'],
      },
      {
        id: 'reading-academic-passage',
        officialName: 'Read an Academic Passage',
        explanation: 'Practice main ideas, details, inference, and vocabulary in academic passages.',
        availability: {
          kind: 'individual',
          href: '/practica/toefl/reading/formato-2026/read-an-academic-passage',
          actionLabel: 'Choose an exercise',
        },
        sourceClaimIds: ['C03'],
      },
    ],
  },
  {
    id: 'listening',
    label: 'Listening',
    description: 'Appropriate responses, conversations, announcements, and academic talks.',
    guideHref: '/practica/toefl/listening',
    sourceClaimId: 'C04',
    items: [
      {
        id: 'listening-choose-response',
        officialName: 'Listen and Choose a Response',
        explanation: 'Listen to a short exchange and choose the response that fits best.',
        availability: {
          kind: 'individual',
          href: '/practica/toefl/listening/simulacros',
          actionLabel: 'Choose a Listening set',
        },
        sourceClaimIds: ['C04'],
      },
      {
        id: 'listening-conversation',
        officialName: 'Listen to a Conversation',
        explanation: 'Identify ideas, details, and speaker intent in a campus conversation.',
        availability: {
          kind: 'individual',
          href: '/practica/toefl/listening/simulacros',
          actionLabel: 'Choose a Listening set',
        },
        sourceClaimIds: ['C04'],
      },
      {
        id: 'listening-announcement',
        officialName: 'Listen to an Announcement',
        explanation: 'Identify purpose, key information, and next steps in an announcement.',
        availability: {
          kind: 'individual',
          href: '/practica/toefl/listening/simulacros',
          actionLabel: 'Choose a Listening set',
        },
        sourceClaimIds: ['C04'],
      },
      {
        id: 'listening-academic-talk',
        officialName: 'Listen to an Academic Talk',
        explanation: 'Follow the organization, ideas, and examples in a short academic talk.',
        availability: {
          kind: 'individual',
          href: '/practica/toefl/listening/simulacros',
          actionLabel: 'Choose a Listening set',
        },
        sourceClaimIds: ['C04'],
      },
    ],
  },
  {
    id: 'writing',
    label: 'Writing',
    description: 'Sentence building, functional writing, and academic discussion.',
    guideHref: '/practica/toefl/writing',
    sourceClaimId: 'C05',
    items: [
      {
        id: 'writing-build-sentence',
        officialName: 'Build a Sentence',
        explanation: 'Arrange words and phrases to form a complete sentence or question.',
        availability: {
          kind: 'individual',
          href: '/practica/toefl/writing/build-a-sentence',
          actionLabel: 'Choose an exercise',
        },
        sourceClaimIds: ['C05'],
      },
      {
        id: 'writing-email',
        officialName: 'Write an Email',
        explanation: 'Write a clear email to request information, explain a situation, or propose a solution.',
        availability: {
          kind: 'individual',
          href: '/practica/toefl/writing/write-an-email',
          actionLabel: 'Choose an email prompt',
        },
        sourceClaimIds: ['C05'],
      },
      {
        id: 'writing-academic-discussion',
        officialName: 'Write for an Academic Discussion',
        explanation: 'State and support an opinion within an academic class discussion.',
        availability: {
          kind: 'individual',
          href: '/practica/toefl/writing/academic-discussion',
          actionLabel: 'Choose a discussion prompt',
        },
        sourceClaimIds: ['C05'],
      },
    ],
  },
  {
    id: 'speaking',
    label: 'Speaking',
    description: 'Accurate repetition and spontaneous answers in a simulated interview.',
    guideHref: '/practica/toefl/speaking',
    sourceClaimId: 'C06',
    items: [
      {
        id: 'speaking-repeat',
        officialName: 'Listen and Repeat',
        explanation: 'Listen to a sentence and repeat it accurately and clearly.',
        availability: {
          kind: 'individual',
          href: '/practica/toefl/speaking',
          actionLabel: 'Choose a Speaking set',
        },
        sourceClaimIds: ['C06'],
      },
      {
        id: 'speaking-interview',
        officialName: 'Take an Interview',
        explanation: 'Answer questions about experiences and opinions with clarity and natural pacing.',
        availability: {
          kind: 'individual',
          href: '/practica/toefl/speaking',
          actionLabel: 'Choose a Speaking set',
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
