import type {
  MockExam,
  FormGroupQuestion,
  TableGroupQuestion,
  MultiSelectQuestion,
  MatchingGroupQuestion,
  MCQQuestion,
} from '@/data/mocks/types';
import type { IeltsObjectiveAnswers } from './submission';

export const IELTS_LISTENING_BANDS: readonly (readonly [number, number])[] = [
  [39, 9], [37, 8.5], [35, 8], [33, 7.5], [30, 7], [27, 6.5],
  [23, 6], [20, 5.5], [16, 5], [13, 4.5], [10, 4], [8, 3.5],
  [6, 3], [4, 2.5], [0, 1],
];

export const IELTS_ACADEMIC_READING_BANDS: readonly (readonly [number, number])[] = [
  [39, 9], [37, 8.5], [35, 8], [33, 7.5], [30, 7], [27, 6.5],
  [23, 6], [19, 5.5], [15, 5], [13, 4.5], [10, 4], [8, 3.5],
  [6, 3], [4, 2.5], [0, 1],
];

function blankKey(groupId: string, num: number): string {
  return `${groupId}__${num}`;
}

function normalizeAnswer(value: string): string {
  return value.trim().toLowerCase().replace(/[.,!?;:'"]/g, '');
}

function isCorrect(input: string, accepted: string[]): boolean {
  const normalized = normalizeAnswer(input);
  return accepted.some(answer => normalizeAnswer(answer) === normalized);
}

export function rawIeltsScoreToBand(
  raw: number,
  table: readonly (readonly [number, number])[],
): number {
  for (const [minimum, band] of table) if (raw >= minimum) return band;
  return 1;
}

function scoreObjectiveSkill(
  mock: MockExam,
  skill: 'listening' | 'reading',
  answers: IeltsObjectiveAnswers,
): { correct: number; total: number } {
  let correct = 0;
  let total = 0;
  const sections = mock.sections.filter(section => section.skill === skill && !section.comingSoon);

  for (const section of sections) {
    for (const question of section.questions) {
      if (question.type === 'formgroup') {
        const item = question as FormGroupQuestion;
        total += item.blanks.length;
        for (const blank of item.blanks) {
          if (isCorrect(answers.fills[blankKey(item.id, blank.num)] ?? '', blank.answers)) correct += 1;
        }
      } else if (question.type === 'tablegroup') {
        const item = question as TableGroupQuestion;
        for (const row of item.rows) {
          for (const cell of row) {
            if (typeof cell === 'string') continue;
            total += 1;
            if (isCorrect(answers.fills[blankKey(item.id, cell.num)] ?? '', cell.answers)) correct += 1;
          }
        }
      } else if (question.type === 'multiselect') {
        const item = question as MultiSelectQuestion;
        total += item.selectCount;
        const selected = answers.ms[item.id] ?? [];
        if (item.answers.every(answer => selected.includes(answer)) && selected.every(answer => item.answers.includes(answer))) {
          correct += item.selectCount;
        }
      } else if (question.type === 'matching') {
        const item = question as MatchingGroupQuestion;
        total += item.items.length;
        for (const match of item.items) {
          if ((answers.match[blankKey(item.id, match.num)] ?? '') === match.answer) correct += 1;
        }
      } else if (question.type === 'mcq' || question.type === 'dialog') {
        const item = question as MCQQuestion;
        total += 1;
        if (answers.mcq[item.id] === item.answer) correct += 1;
      }
    }
  }

  return { correct, total };
}

export function scoreIeltsObjectiveAnswers(mock: MockExam, answers: IeltsObjectiveAnswers) {
  const listening = scoreObjectiveSkill(mock, 'listening', answers);
  const reading = scoreObjectiveSkill(mock, 'reading', answers);
  return {
    listening: listening.total > 0 ? {
      ...listening,
      band: rawIeltsScoreToBand(listening.correct, IELTS_LISTENING_BANDS),
    } : null,
    reading: {
      ...reading,
      band: rawIeltsScoreToBand(reading.correct, IELTS_ACADEMIC_READING_BANDS),
    },
  };
}
