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

// ── Input validation helpers ───────────────────────────────────────────────────
// These prevent a crafted server-action call from inserting arbitrary scores.

function clampScore(v: unknown, max: number): number | null {
  if (typeof v !== 'number' || !isFinite(v)) return null;
  return Math.min(Math.max(Math.round(v), 0), max);
}

function sanitizeText(v: unknown, maxLen = 32_000): string | null {
  if (typeof v !== 'string') return null;
  return v.slice(0, maxLen);
}

export async function saveExamResult(data: ExamReportData, ielts?: IELTSAnswers) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // Validate score fields — totalMax anchors the allowed range
  const safeMax   = typeof data.totalMax   === 'number' && data.totalMax   > 0 ? data.totalMax   : 100;
  const safeScore = clampScore(data.totalScore, safeMax) ?? 0;

  // Validate IELTS band scores (0–9 scale, half-band increments)
  const safeWritingBand  = ielts?.reading_band   != null ? clampScore(ielts.reading_band,   9) : undefined;
  const safeListeningBand = ielts?.listening_band != null ? clampScore(ielts.listening_band, 9) : undefined;

  await supabase.from('exam_submissions').insert({
    user_id: user?.id ?? null,
    user_email: user?.email ?? null,
    user_name: sanitizeText(user?.user_metadata?.full_name ?? user?.email),
    exam_slug: sanitizeText(data.examSlug, 64),
    exam_name: sanitizeText(data.examName, 128),
    mock_title: sanitizeText(data.mockTitle, 128),
    total_score: safeScore,
    total_max: safeMax,
    total_label: sanitizeText(data.totalLabel, 256),
    skills: Array.isArray(data.skills) ? data.skills : null,
    ...(ielts ? {
      writing_task1_answer: sanitizeText(ielts.writing_task1_answer ?? null),
      writing_task2_answer: sanitizeText(ielts.writing_task2_answer ?? null),
      speaking_answers: ielts.speaking_answers && typeof ielts.speaking_answers === 'object' ? ielts.speaking_answers : null,
      reading_band: safeWritingBand ?? null,
      listening_band: safeListeningBand ?? null,
    } : {}),
  })
}
