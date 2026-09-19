import type {
  FormGroupQuestion,
  MatchingGroupQuestion,
  MCQQuestion,
  MockExam,
  MultiSelectQuestion,
  TableGroupQuestion,
} from '@/data/mocks/types';
import { IELTS_CHOICE_PRESENTATION_VERSION } from '@/data/mocks/ielts-choice-presentation';
import { displayIeltsSectionInstructions } from '@/data/ielts/listening-instruction-errata';
import { getIeltsReviewBlueprint } from '@/lib/ielts/review-blueprint';

export type PublicIeltsFormGroupQuestion = Omit<FormGroupQuestion, 'blanks' | 'unorderedAnswerGroups'> & {
  blanks: Array<Omit<FormGroupQuestion['blanks'][number], 'answers'>>;
};

export type PublicIeltsTableGroupQuestion = Omit<TableGroupQuestion, 'rows'> & {
  rows: Array<Array<string | { num: number; maxWords?: number }>>;
};

export type PublicIeltsMultiSelectQuestion = Omit<MultiSelectQuestion, 'answers'>;
export type PublicIeltsMatchingQuestion = Omit<MatchingGroupQuestion, 'items'> & {
  items: Array<Omit<MatchingGroupQuestion['items'][number], 'answer'>>;
};
export type PublicIeltsMcqQuestion = Omit<MCQQuestion, 'answer'>;

export type PublicIeltsListeningQuestion =
  | PublicIeltsFormGroupQuestion
  | PublicIeltsTableGroupQuestion
  | PublicIeltsMultiSelectQuestion
  | PublicIeltsMatchingQuestion
  | PublicIeltsMcqQuestion;

export type PublicIeltsListeningSection = {
  part: number;
  title: string;
  instructions: string;
  audioUrl: string;
  questions: PublicIeltsListeningQuestion[];
};

export type IeltsListeningSectionPractice = {
  id: string;
  sourceMockId: string;
  title: string;
  objectId: string;
  contentVersion: string;
  audioUrl: string;
  sections: PublicIeltsListeningSection[];
};

export const IELTS_SECTIONAL_LISTENING_SET_IDS = Object.freeze(
  Array.from({ length: 20 }, (_, index) => `set-${index + 1}`),
);

const SET_ID_LOOKUP = new Set(IELTS_SECTIONAL_LISTENING_SET_IDS);

export function isIeltsSectionalListeningSetId(mockId: string): boolean {
  return SET_ID_LOOKUP.has(mockId);
}

export function ieltsListeningResponseCount(question: PublicIeltsListeningQuestion): number {
  if (question.type === 'formgroup') return question.blanks.length;
  if (question.type === 'tablegroup') {
    return question.rows.flat().filter(cell => typeof cell !== 'string').length;
  }
  if (question.type === 'multiselect') return question.selectCount;
  if (question.type === 'matching') return question.items.length;
  return 1;
}

function sanitizeQuestion(question: FormGroupQuestion | TableGroupQuestion | MultiSelectQuestion | MatchingGroupQuestion | MCQQuestion): PublicIeltsListeningQuestion {
  if (question.type === 'formgroup') {
    const { unorderedAnswerGroups: _groups, ...publicQuestion } = question;
    void _groups;
    return {
      ...publicQuestion,
      blanks: question.blanks.map(({ answers: _answers, ...blank }) => {
        void _answers;
        return { ...blank };
      }),
    };
  }
  if (question.type === 'tablegroup') {
    return {
      ...question,
      headers: [...question.headers],
      rows: question.rows.map(row => row.map(cell => {
        if (typeof cell === 'string') return cell;
        const { answers: _answers, ...publicCell } = cell;
        void _answers;
        return { ...publicCell };
      })),
    };
  }
  if (question.type === 'multiselect') {
    const { answers: _answers, ...publicQuestion } = question;
    void _answers;
    return { ...publicQuestion, options: question.options.map(option => ({ ...option })) };
  }
  if (question.type === 'matching') {
    return {
      ...question,
      items: question.items.map(({ answer: _answer, ...item }) => {
        void _answer;
        return { ...item };
      }),
      endings: question.endings.map(ending => ({ ...ending })),
    };
  }
  const { answer: _answer, ...publicQuestion } = question;
  void _answer;
  return { ...publicQuestion, options: [...question.options] };
}

/**
 * Creates the client-safe Listening view from an audited full IELTS mock.
 * Answer keys and transcripts never cross the server/client boundary.
 */
export function selectIeltsListeningPractice(mock: MockExam): IeltsListeningSectionPractice | null {
  if (mock.examSlug !== 'ielts' || !isIeltsSectionalListeningSetId(mock.id)) return null;

  const blueprint = getIeltsReviewBlueprint(mock.id);
  const sourceSections = mock.sections
    .filter(section => section.skill === 'listening' && !section.comingSoon)
    .sort((a, b) => a.part - b.part);
  if (!blueprint || sourceSections.length !== 4) return null;

  const allowedTypes = new Set(['formgroup', 'tablegroup', 'multiselect', 'matching', 'mcq', 'dialog']);
  if (sourceSections.some(section => !section.audioUrl || section.questions.some(question => !allowedTypes.has(question.type)))) {
    return null;
  }

  const audioUrls = new Set(sourceSections.map(section => section.audioUrl!));
  if (audioUrls.size !== 1) return null;

  const sections = sourceSections.map<PublicIeltsListeningSection>(section => ({
    part: section.part,
    title: section.title,
    instructions: displayIeltsSectionInstructions(mock.id, section),
    audioUrl: section.audioUrl!,
    questions: section.questions.map(question => sanitizeQuestion(question as FormGroupQuestion | TableGroupQuestion | MultiSelectQuestion | MatchingGroupQuestion | MCQQuestion)),
  }));
  const responseCount = sections.flatMap(section => section.questions).reduce(
    (total, question) => total + ieltsListeningResponseCount(question),
    0,
  );
  if (responseCount !== 40) return null;

  const [audioUrl] = audioUrls;
  const contentVersion = `${blueprint.contentVersion}+${IELTS_CHOICE_PRESENTATION_VERSION}`;
  return {
    id: `${mock.id}-sectional-listening-${contentVersion}`,
    sourceMockId: mock.id,
    title: `IELTS Listening · ${mock.id.replace('set-', 'Set ')}`,
    objectId: `ielts-sectional-listening:${mock.id}`,
    contentVersion,
    audioUrl,
    sections,
  };
}
