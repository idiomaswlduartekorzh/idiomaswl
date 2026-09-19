import type { MockExam } from '@/data/mocks/types';
import { scoreIeltsObjectiveAnswers } from './mock-scoring';
import type { IeltsObjectiveAnswers } from './submission';

export type IeltsReadingPracticeResult = {
  correct: number;
  denominator: 40;
  band: number;
  passages: Array<{ part: number; correct: number; total: number }>;
  disclosure: string;
};

export function scoreIeltsReadingPracticeAttempt(mock: MockExam, answers: IeltsObjectiveAnswers): IeltsReadingPracticeResult {
  const reading = scoreIeltsObjectiveAnswers(mock, answers).reading;
  if (reading.total !== 40) throw new Error('invalid_ielts_reading_contract');
  const passages = mock.sections
    .filter(section => section.skill === 'reading' && !section.comingSoon)
    .sort((a, b) => a.part - b.part)
    .map(section => {
      const score = scoreIeltsObjectiveAnswers({ ...mock, sections: [section] }, answers).reading;
      return { part: section.part, correct: score.correct, total: score.total };
    });
  return {
    correct: reading.correct,
    denominator: 40,
    band: reading.band,
    passages,
    disclosure: 'Estimated IELTS Academic Reading band for this WeLearn practice set. It is not an official IELTS result.',
  };
}
