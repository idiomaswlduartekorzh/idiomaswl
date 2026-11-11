'use client'

import type { WritingAssignmentContext, WritingDraftRequirements } from '@/lib/writing-feedback-shared'
import { WritingFeedbackReview } from '@/components/writing/WritingFeedbackReview'

export function ReadingAiFeedback({ text, assignment, requirements, locale = 'es', freeReview = false }: { text: string; assignment: WritingAssignmentContext; requirements?: WritingDraftRequirements; locale?: 'es' | 'en'; freeReview?: boolean }) {
  return <WritingFeedbackReview text={text} assignment={assignment} requirements={requirements} locale={locale} endpoint={freeReview ? '/api/reading/feedback' : undefined} provider={freeReview ? 'Google Gemini' : undefined} />
}
