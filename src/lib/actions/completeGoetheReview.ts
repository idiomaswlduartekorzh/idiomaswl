'use server'

import { requireAdmin } from '@/lib/auth/require-admin.server'
import { createAdminClient } from '@/lib/supabase/admin'
import goetheA1Set1 from '@/data/mocks/goethe-a1-set-1'
import goetheA1Set2 from '@/data/mocks/goethe-a1-set-2'
import goetheA1Set3 from '@/data/mocks/goethe-a1-set-3'
import goetheA1Set4 from '@/data/mocks/goethe-a1-set-4'
import goetheA1Set5 from '@/data/mocks/goethe-a1-set-5'
import goetheA1Set6 from '@/data/mocks/goethe-a1-set-6'
import goetheA1Set7 from '@/data/mocks/goethe-a1-set-7'
import type { MockExam } from '@/data/mocks/types'
import { completeGoetheScore, scoreGoetheAutomatic } from '@/lib/goethe/scoring'
import { GOETHE_SUBMISSION_ID_PATTERN } from '@/lib/goethe/submission-token.server'
import type { GoetheReviewPayload } from '@/lib/goethe/submission'

const WRITING_CONTENT = new Set([0, 1.5, 3])
const WRITING_CONVENTIONS = new Set([0, 0.5, 1])
const SPEAKING_PART1 = new Set([0, 0.5, 1, 1.5, 2, 2.5, 3])
const SPEAKING_PART23 = new Set(Array.from({ length: 13 }, (_, index) => index / 2))
const GOETHE_A1_MOCKS = new Map<string, MockExam>([goetheA1Set1, goetheA1Set2, goetheA1Set3, goetheA1Set4, goetheA1Set5, goetheA1Set6, goetheA1Set7].map(mock => [mock.id, mock]))

export async function completeGoetheReview(input: {
  submissionId: string
  writing: { content1: number; content2: number; content3: number; conventions: number }
  speaking: { part1: number; part2: number; part3: number }
  evidenceNotes: string
}) {
  const adminUser = await requireAdmin()
  if (!GOETHE_SUBMISSION_ID_PATTERN.test(input.submissionId)) throw new Error('La entrega no es válida.')
  if (![input.writing.content1, input.writing.content2, input.writing.content3].every(value => WRITING_CONTENT.has(value)) || !WRITING_CONVENTIONS.has(input.writing.conventions)) {
    throw new Error('La rúbrica de Schreiben contiene un valor no permitido.')
  }
  if (!SPEAKING_PART1.has(input.speaking.part1) || !SPEAKING_PART23.has(input.speaking.part2) || !SPEAKING_PART23.has(input.speaking.part3)) {
    throw new Error('La rúbrica de Sprechen contiene un valor no permitido.')
  }
  const evidenceNotes = input.evidenceNotes.trim().slice(0, 5_000)
  if (evidenceNotes.length < 20) throw new Error('Escribe una observación breve basada en el texto y los audios.')

  const admin = createAdminClient()
  const { data: submission, error: readError } = await admin.from('exam_submissions')
    .select('id, mock_id, objective_answers, reviewed_at').eq('id', input.submissionId).eq('exam_slug', 'goethe')
    .in('mock_id', [...GOETHE_A1_MOCKS.keys()]).eq('submission_status', 'submitted').maybeSingle()
  if (readError) throw readError
  if (!submission) throw new Error('No encontramos una entrega Goethe A1 válida.')
  if (submission.reviewed_at) throw new Error('Esta entrega ya tiene una revisión cerrada.')
  const mock = GOETHE_A1_MOCKS.get(submission.mock_id)
  if (!mock) throw new Error('El simulacro Goethe A1 no tiene una rúbrica registrada.')

  const responses = (submission.objective_answers ?? {}) as { answers?: Record<string, number>; formValues?: Record<string, string> }
  const automatic = scoreGoetheAutomatic(mock, responses.answers ?? {}, responses.formValues ?? {})
  const writingRaw = input.writing.content1 + input.writing.content2 + input.writing.content3 + input.writing.conventions
  const speakingRaw = input.speaking.part1 + input.speaking.part2 + input.speaking.part3
  const result = completeGoetheScore(automatic, writingRaw, speakingRaw)
  const reviewedAt = new Date().toISOString()
  const reviewedBy = adminUser.email ?? adminUser.id
  const review: GoetheReviewPayload = {
    writing: { ...input.writing, raw: writingRaw },
    speaking: { ...input.speaking, raw: speakingRaw },
    evidenceNotes,
    totalRaw: result.totalRaw,
    totalScore: result.totalScore,
    passed: result.passed,
    band: result.band,
    reviewedAt,
    reviewedBy,
  }
  const skills = [
    { skill: 'Hören', score: automatic.listeningCorrect, max: 15, label: `${automatic.listeningCorrect}/15 Rohpunkte · ${Math.round(automatic.listeningCorrect * 1.66)}/25` },
    { skill: 'Lesen', score: automatic.readingCorrect, max: 15, label: `${automatic.readingCorrect}/15 Rohpunkte · ${Math.round(automatic.readingCorrect * 1.66)}/25` },
    { skill: 'Schreiben', score: automatic.formCorrect + writingRaw, max: 15, label: `${automatic.formCorrect + writingRaw}/15 Rohpunkte · ${Math.round((automatic.formCorrect + writingRaw) * 1.66)}/25` },
    { skill: 'Sprechen', score: speakingRaw, max: 15, label: `${speakingRaw}/15 Rohpunkte · ${Math.round(speakingRaw * 1.66)}/25` },
  ]
  const { data: updated, error } = await admin.from('exam_submissions').update({
    writing_task1_assessment: { scale: 'goethe-a1-writing-v1', ...review.writing, evidenceNotes, reviewedAt, reviewedBy },
    speaking_assessment: { scale: 'goethe-a1-speaking-v1', ...review.speaking, evidenceNotes, reviewedAt, reviewedBy },
    skills,
    total_score: result.totalScore,
    total_max: 100,
    total_label: `${result.totalScore}/100 Punkte · ${result.passed ? 'BESTANDEN' : 'NICHT BESTANDEN'} · ${result.band}`,
    writing_band: automatic.formCorrect + writingRaw,
    speaking_band: speakingRaw,
    reviewed_at: reviewedAt,
    reviewed_by: reviewedBy,
  }).eq('id', input.submissionId).eq('exam_slug', 'goethe').is('reviewed_at', null).select('id').maybeSingle()
  if (error) throw error
  if (!updated) throw new Error('Otra persona cerró esta revisión. Actualiza el panel.')
  return { ok: true, result, review }
}
