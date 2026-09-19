import type { MockExam } from '@/data/mocks/types';
import { scoreIeltsObjectiveAnswers } from './mock-scoring';
import type { IeltsObjectiveAnswers } from './submission';

export type IeltsListeningPracticeAnswers = IeltsObjectiveAnswers;

export type IeltsListeningPracticeResult = {
  correct: number;
  denominator: 40;
  band: number;
  parts: Array<{ part: number; correct: number; total: number }>;
  disclosure: string;
};

export type IeltsListeningAllowedKeys = {
  fills: Set<string>;
  mcq: Set<string>;
  ms: Set<string>;
  match: Set<string>;
};

const blankKey = (groupId: string, num: number) => `${groupId}__${num}`;

export function getIeltsObjectiveAllowedKeys(mock: MockExam, skill: 'listening' | 'reading'): IeltsListeningAllowedKeys {
  const keys: IeltsListeningAllowedKeys = {
    fills: new Set(), mcq: new Set(), ms: new Set(), match: new Set(),
  };
  for (const section of mock.sections.filter(item => item.skill === skill && !item.comingSoon)) {
    for (const question of section.questions) {
      if (question.type === 'formgroup') {
        for (const blank of question.blanks) keys.fills.add(blankKey(question.id, blank.num));
      } else if (question.type === 'tablegroup') {
        for (const cell of question.rows.flat()) {
          if (typeof cell !== 'string') keys.fills.add(blankKey(question.id, cell.num));
        }
      } else if (question.type === 'multiselect') {
        keys.ms.add(question.id);
      } else if (question.type === 'matching') {
        for (const item of question.items) keys.match.add(blankKey(question.id, item.num));
      } else if (question.type === 'mcq' || question.type === 'dialog') {
        keys.mcq.add(question.id);
      }
    }
  }
  return keys;
}

export function getIeltsListeningAllowedKeys(mock: MockExam): IeltsListeningAllowedKeys {
  return getIeltsObjectiveAllowedKeys(mock, 'listening');
}

export function scoreIeltsListeningPracticeAttempt(
  mock: MockExam,
  answers: IeltsListeningPracticeAnswers,
): IeltsListeningPracticeResult {
  const overall = scoreIeltsObjectiveAnswers(mock, answers).listening;
  if (!overall || overall.total !== 40) throw new Error('invalid_ielts_listening_contract');

  const parts = mock.sections
    .filter(section => section.skill === 'listening' && !section.comingSoon)
    .sort((a, b) => a.part - b.part)
    .map(section => {
      const partMock: MockExam = { ...mock, sections: [section] };
      const score = scoreIeltsObjectiveAnswers(partMock, answers).listening;
      if (!score) throw new Error('invalid_ielts_listening_part');
      return { part: section.part, correct: score.correct, total: score.total };
    });

  return {
    correct: overall.correct,
    denominator: 40,
    band: overall.band,
    parts,
    disclosure: 'Estimated IELTS Listening band for this WeLearn practice set. It is not an official IELTS result.',
  };
}
