import type { MCQQuestion, MockExam, Question } from './types';

export const IELTS_CHOICE_PRESENTATION_VERSION = 'balanced-positions-v1';

const FIXED_LABEL_SETS = [
  ['TRUE', 'FALSE', 'NOT GIVEN'],
  ['YES', 'NO', 'NOT GIVEN'],
] as const;

function normalizeLabel(value: string): string {
  return value.trim().toUpperCase().replace(/\s+/gu, ' ');
}

function hasFixedSemanticPositions(question: MCQQuestion): boolean {
  const labels = question.options.map(normalizeLabel);
  return FIXED_LABEL_SETS.some(pattern => (
    pattern.length === labels.length && pattern.every((label, index) => label === labels[index])
  ));
}

function stableHash(value: string): number {
  let hash = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function moveCorrectOption(question: MCQQuestion, target: number): MCQQuestion {
  if (question.answer === target) return question;
  const correct = question.options[question.answer];
  const distractors = question.options.filter((_, index) => index !== question.answer);
  const options = [...distractors];
  options.splice(target, 0, correct);
  return { ...question, options, answer: target };
}

/**
 * Balances displayed answer positions inside each IELTS mock while preserving
 * the academically reviewed option text and keyed meaning. Fixed semantic
 * labels retain their conventional order. Browser and server use this same
 * deterministic transform.
 */
export function withIeltsBalancedChoicePositions(mock: MockExam): MockExam {
  if (mock.examSlug !== 'ielts') return mock;

  const positionCounts = new Map<number, number[]>();
  const sections = mock.sections.map(section => ({
    ...section,
    questions: section.questions.map((question: Question) => {
      if ((question.type !== 'mcq' && question.type !== 'dialog') || hasFixedSemanticPositions(question)) {
        return question;
      }

      const optionCount = question.options.length;
      const counts = positionCounts.get(optionCount) ?? Array(optionCount).fill(0);
      const minimum = Math.min(...counts);
      const candidates = counts.flatMap((count, index) => count === minimum ? [index] : []);
      const target = candidates[stableHash(`${mock.id}:${section.skill}:${question.id}`) % candidates.length];
      counts[target] += 1;
      positionCounts.set(optionCount, counts);
      return moveCorrectOption(question, target);
    }),
  }));

  return { ...mock, sections };
}
