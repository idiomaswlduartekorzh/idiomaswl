'use server';

import { hasExamScoreAccess } from '@/lib/exams/score-access.server';

export async function checkExamScoreAccess(examSlug: 'ielts' | 'toefl'): Promise<boolean> {
  return hasExamScoreAccess(examSlug);
}
