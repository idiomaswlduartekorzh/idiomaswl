export interface ExamResultPresentationInput {
  examSlug: string
  totalScore: number | null
  totalMax: number | null
  reviewedAt?: string | null
}

export interface ExamResultPresentation {
  label: string
  percent: number | null
  pending: boolean
}

/**
 * Keeps IELTS' official band scale visible in student-facing history. A missing
 * Overall is a review state, never a zero. Other exams retain percentage copy.
 */
export function presentExamResult(input: ExamResultPresentationInput): ExamResultPresentation {
  const validScore = typeof input.totalScore === 'number' && Number.isFinite(input.totalScore)
  const validMax = typeof input.totalMax === 'number' && Number.isFinite(input.totalMax) && input.totalMax > 0

  if (!validScore || !validMax) {
    return { label: 'En revisión', percent: null, pending: true }
  }

  const percent = Math.max(0, Math.min(100, Math.round((input.totalScore! / input.totalMax!) * 100)))
  if (input.examSlug === 'ielts') {
    return { label: `Band ${input.totalScore}`, percent, pending: false }
  }

  return { label: `${percent}%`, percent, pending: false }
}
