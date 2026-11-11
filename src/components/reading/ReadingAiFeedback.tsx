'use client'

import type { WritingAssignmentContext, WritingDraftRequirements } from '@/lib/writing-feedback-shared'
import { WritingFeedbackReview } from '@/components/writing/WritingFeedbackReview'

export function ReadingAiFeedback({ text, assignment, requirements, locale = 'es' }: { text: string; assignment: WritingAssignmentContext; requirements?: WritingDraftRequirements; locale?: 'es' | 'en' }) {
  return <WritingFeedbackReview text={text} assignment={assignment} requirements={requirements} locale={locale} />
}
