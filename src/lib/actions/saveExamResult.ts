'use server'

import { createClient } from '@/lib/supabase/server'
import type { ExamReportData } from '@/components/ExamReport'

export interface IELTSAnswers {
  writing_task1_answer?: string
  writing_task2_answer?: string
  speaking_answers?: Record<string, string>
  reading_band?: number
  listening_band?: number | null
}

export async function saveExamResult(data: ExamReportData, ielts?: IELTSAnswers) {
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
    ...(ielts ? {
      writing_task1_answer: ielts.writing_task1_answer ?? null,
      writing_task2_answer: ielts.writing_task2_answer ?? null,
      speaking_answers: ielts.speaking_answers ?? null,
      reading_band: ielts.reading_band ?? null,
      listening_band: ielts.listening_band ?? null,
    } : {}),
  })
}
