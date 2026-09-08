'use server'

import { createAdminClient } from '@/lib/supabase/admin'
import { requireAdmin } from '@/lib/auth/require-admin.server'
export type { StudentSubject } from './inviteStudent'
import type { StudentSubject } from './inviteStudent'

export async function assignSubject(userId: string, subject: StudentSubject): Promise<void> {
  await requireAdmin()
  const admin = createAdminClient()

  const isExamStudent = ['icfes', 'fce', 'ielts', 'toefl'].includes(subject)
  const targetExam = subject === 'fce' ? 'cambridge-b2' : isExamStudent ? subject : null
  const { error } = await admin
    .from('profiles')
    .update({
      subject,
      student_path: isExamStudent ? 'exam' : 'welearn',
      target_exam: targetExam,
      xpress_plan_interest: isExamStudent ? 'exam-auto' : null,
      onboarding_completed_at: new Date().toISOString(),
    })
    .eq('id', userId)

  if (error) throw new Error(error.message)
}
