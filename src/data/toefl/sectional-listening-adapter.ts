import type {
  MockExam,
  MockSection,
  ToeflListeningSingleQuestion,
} from '@/data/mocks/types';

export type ToeflListeningSectionPractice = {
  id: string;
  sourceMockId: string;
  title: string;
  disclosure: string;
  objectId: string;
  sections: MockSection[];
};

export const TOEFL_SECTIONAL_LISTENING_SET_IDS = Object.freeze(
  Array.from({ length: 20 }, (_, index) => `set-${index + 1}`),
);

const TOEFL_SECTIONAL_LISTENING_SET_ID_LOOKUP = new Set(TOEFL_SECTIONAL_LISTENING_SET_IDS);

export function isToeflSectionalListeningSetId(mockId: string): boolean {
  return TOEFL_SECTIONAL_LISTENING_SET_ID_LOOKUP.has(mockId);
}

function cloneQuestion(question: ToeflListeningSingleQuestion): ToeflListeningSingleQuestion {
  return {
    ...question,
    options: question.options.map((option) => ({ ...option })),
  };
}

/**
 * Projects the Listening subset of an already-normalized TOEFL mock.
 * Source IDs, object IDs, media IDs and audio URLs remain unchanged so the
 * sectional runner can be checked for exact parity with the full mock.
 */
export function selectToeflListeningPractice(mock: MockExam): ToeflListeningSectionPractice | null {
  if (mock.examSlug !== 'toefl' || mock.format !== 'toefl-2026') return null;

  const sourceSections = mock.sections.filter((section) => section.skill === 'listening');
  if (sourceSections.length === 0) return null;

  const questions = sourceSections.flatMap((section) => section.questions);
  if (questions.some((question) => question.type !== 'toefl-listening-single')) return null;

  const listeningQuestions = questions as ToeflListeningSingleQuestion[];
  const objectIds = new Set(listeningQuestions.map((question) => question.objectId));
  if (objectIds.size !== 1) return null;

  const [objectId] = objectIds;
  const sections = sourceSections.map<MockSection>((section) => ({
    ...section,
    questions: (section.questions as ToeflListeningSingleQuestion[]).map(cloneQuestion),
  }));

  return {
    id: `${mock.id}-listening`,
    sourceMockId: mock.id,
    title: `TOEFL Listening · ${mock.id.replace('set-', 'Set ')}`,
    disclosure:
      'Recorrido fijo de práctica creado por WeLearn. No reproduce la adaptación ni la puntuación oficial del TOEFL iBT.',
    objectId,
    sections,
  };
}
