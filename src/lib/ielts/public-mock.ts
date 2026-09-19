import type { MockExam, Question } from '@/data/mocks/types';

/** Keep the IELTS runner's question shape while removing all pre-submission keys. */
export function sanitizeIeltsMock(mock: MockExam): MockExam {
  if (mock.examSlug !== 'ielts') throw new Error('Expected an IELTS mock');

  const sections = mock.sections.map(section => {
    const { transcript: _transcript, insights: _insights, exampleAnswer: _exampleAnswer, ...publicSection } = section;
    void _transcript; void _insights; void _exampleAnswer;
    return {
      ...publicSection,
      questions: section.questions.map(question => {
        if (question.type === 'formgroup') {
          const { unorderedAnswerGroups: _groups, ...publicQuestion } = question;
          void _groups;
          return {
            ...publicQuestion,
            blanks: question.blanks.map(({ answers: _answers, ...blank }) => {
              void _answers;
              return blank;
            }),
          };
        }
        if (question.type === 'tablegroup') {
          return {
            ...question,
            rows: question.rows.map(row => row.map(cell => {
              if (typeof cell === 'string') return cell;
              const { answers: _answers, ...publicCell } = cell;
              void _answers;
              return publicCell;
            })),
          };
        }
        if (question.type === 'matching') {
          return {
            ...question,
            items: question.items.map(({ answer: _answer, ...item }) => {
              void _answer;
              return item;
            }),
          };
        }
        if ('answer' in question) {
          const { answer: _answer, ...publicQuestion } = question;
          void _answer;
          return publicQuestion;
        }
        if ('answers' in question) {
          const { answers: _answers, ...publicQuestion } = question;
          void _answers;
          return publicQuestion;
        }
        return question;
      }) as Question[],
    };
  });

  // The client only renders these fields. Scoring uses the original server mock.
  return { ...mock, sections };
}
