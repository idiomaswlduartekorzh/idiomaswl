/** Keep this comparison shared by the exam runner and the admin answer audit. */
export function normalizeExamAnswer(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[.,;:!?]+$/g, '')
    .replace(/\s+/g, ' ');
}

export function acceptsExamAnswer(value: string | undefined, answers: readonly string[]): boolean {
  if (!value) return false;
  const candidate = normalizeExamAnswer(value);
  return answers.some(answer => normalizeExamAnswer(answer) === candidate);
}
