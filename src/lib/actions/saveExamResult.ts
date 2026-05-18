'use server'

import { createClient } from '@/lib/supabase/server'
import type { ExamReportData } from '@/components/ExamReport'

export async function saveExamResult(data: ExamReportData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  await supabase.from('exam_submissions').insert({
    user_id: user?.id ?? null,
    user_email: user?.email ?? null,
    user_name: user?.user_metadata?.full_name ?? user?.email ?? null,
    exam_slug: data.examSlug,
    exam_name: data.examName,
    mock_title: data.mockTitle,
    total_score: data.totalScore,
    total_max: data.totalMax,
    total_label: data.totalLabel,
    skills: data.skills,
  })
}
