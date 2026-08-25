import type { MockExam } from './types';

/**
 * Removes every objective answer key before a mock crosses the Server Component
 * boundary. The authored mock remains the private scoring registry.
 */
export function toPublicIeltsMock(mock: MockExam): MockExam {
  const publicMock = structuredClone(mock) as MockExam;

  for (const section of publicMock.sections) {
    for (const question of section.questions) {
      if ('answer' in question) delete (question as { answer?: unknown }).answer;
      if ('answers' in question) delete (question as { answers?: unknown }).answers;
      if ('blanks' in question) {
        for (const blank of question.blanks) delete (blank as { answers?: unknown }).answers;
      }
      if ('rows' in question) {
        for (const cell of question.rows.flat()) {
          if (typeof cell === 'object' && cell && 'answers' in cell) {
            delete (cell as { answers?: unknown }).answers;
          }
        }
      }
      if ('items' in question) {
        for (const item of question.items) {
          if ('answer' in item) delete (item as { answer?: unknown }).answer;
        }
      }
    }
  }

  return publicMock;
}
