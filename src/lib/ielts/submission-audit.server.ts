import 'server-only'

import { createAdminClient } from '@/lib/supabase/admin'
import { loadIeltsMock } from '@/lib/labs/exam-bridge/ielts'
import { scoreIeltsObjectiveAnswers } from './mock-scoring'
import { countEssayWords, IELTS_SPEAKING_BUCKET, type IeltsObjectiveAnswers } from './submission'

interface SubmissionRow {
  id: string
  user_email: string | null
  user_name: string | null
  mock_id: string | null
  mock_title: string | null
  content_version: string | null
  created_at: string
  submission_status: string | null
  reviewed_at: string | null
  reviewed_by: string | null
  reading_band: number | null
  listening_band: number | null
  writing_band: number | null
  speaking_band: number | null
  total_score: number | null
  total_label: string | null
  objective_answers: IeltsObjectiveAnswers | null
  writing_task1_answer: string | null
  writing_task2_answer: string | null
  speaking_audio_paths: Record<string, string> | null
  speaking_audio_metadata: Record<string, { size?: number }> | null
}

function inferredMockId(row: SubmissionRow): string | null {
  if (row.mock_id) return row.mock_id
  const match = row.mock_title?.match(/Set\s+(\d{1,2})/i)
  return match ? `set-${match[1]}` : null
}

async function inspectAudio(row: SubmissionRow) {
  const paths = row.speaking_audio_paths ?? {}
  const entries = Object.entries(paths)
  const mockId = inferredMockId(row)
  if (!entries.length || !mockId) return { expected: entries.length, verified: 0, issues: [] as string[] }

  const admin = createAdminClient()
  const { data: files, error } = await admin.storage
    .from(IELTS_SPEAKING_BUCKET)
    .list(`${mockId}/${row.id}`, { limit: 20 })
  if (error) return { expected: entries.length, verified: 0, issues: ['No se pudo verificar el almacenamiento privado.'] }

  const byName = new Map((files ?? []).map(file => [file.name, file]))
  const issues: string[] = []
  let verified = 0
  for (const [questionId, storedPath] of entries) {
    const file = byName.get(storedPath.split('/').pop() ?? '')
    const actualSize = Number((file?.metadata as { size?: unknown } | null)?.size)
    const expectedSize = Number(row.speaking_audio_metadata?.[questionId]?.size)
    if (!file || !Number.isFinite(actualSize) || actualSize < 1024) {
      issues.push(`${questionId}: archivo ausente o incompleto`)
    } else if (Number.isFinite(expectedSize) && actualSize !== expectedSize) {
      issues.push(`${questionId}: tamaño distinto al registrado`)
    } else {
      verified += 1
    }
  }
  return { expected: entries.length, verified, issues }
}

async function auditRow(row: SubmissionRow, batch: 'previous' | 'new') {
  const mockId = inferredMockId(row)
  const mock = mockId && row.objective_answers ? await loadIeltsMock(mockId) : null
  const recalculated = mock && row.objective_answers
    ? scoreIeltsObjectiveAnswers(mock, row.objective_answers)
    : null
  const objectiveMatches = recalculated
    ? Number(row.listening_band) === Number(recalculated.listening?.band ?? null)
      && Number(row.reading_band) === Number(recalculated.reading.band)
    : null

  return {
    batch,
    id: row.id,
    studentName: row.user_name || 'Sin nombre',
    studentEmail: row.user_email || 'Sin correo',
    mockId,
    mockTitle: row.mock_title,
    contentVersion: row.content_version,
    createdAt: row.created_at,
    status: row.submission_status,
    reviewedAt: row.reviewed_at,
    reviewedBy: row.reviewed_by,
    stored: {
      listeningBand: row.listening_band,
      readingBand: row.reading_band,
      writingBand: row.writing_band,
      speakingBand: row.speaking_band,
      overallBand: row.total_score,
      label: row.total_label,
    },
    recalculated: recalculated ? {
      listeningCorrect: recalculated.listening?.correct ?? null,
      listeningTotal: recalculated.listening?.total ?? null,
      listeningBand: recalculated.listening?.band ?? null,
      readingCorrect: recalculated.reading.correct,
      readingTotal: recalculated.reading.total,
      readingBand: recalculated.reading.band,
    } : null,
    objectiveMatches,
    writing: {
      task1Words: countEssayWords(row.writing_task1_answer ?? ''),
      task2Words: countEssayWords(row.writing_task2_answer ?? ''),
    },
    audio: await inspectAudio(row),
  }
}

type AuditedAttempt = Awaited<ReturnType<typeof auditRow>>

function summarize(rows: AuditedAttempt[]) {
  return {
    total: rows.length,
    submitted: rows.filter(row => row.status === 'submitted').length,
    uploading: rows.filter(row => row.status === 'uploading').length,
    objectiveRecalculated: rows.filter(row => row.objectiveMatches !== null).length,
    objectiveMatches: rows.filter(row => row.objectiveMatches === true).length,
    objectiveMismatches: rows.filter(row => row.objectiveMatches === false).length,
    withWriting: rows.filter(row => row.writing.task1Words > 0 || row.writing.task2Words > 0).length,
    withVerifiedAudio: rows.filter(row => row.audio.expected > 0 && row.audio.expected === row.audio.verified).length,
    audioIssues: rows.filter(row => row.audio.issues.length > 0).length,
    reviewed: rows.filter(row => Boolean(row.reviewedAt)).length,
  }
}

async function mapWithConcurrency<T, R>(values: T[], concurrency: number, mapper: (value: T, index: number) => Promise<R>): Promise<R[]> {
  const result = new Array<R>(values.length)
  let cursor = 0
  async function worker() {
    while (cursor < values.length) {
      const index = cursor
      cursor += 1
      result[index] = await mapper(values[index], index)
    }
  }
  await Promise.all(Array.from({ length: Math.min(concurrency, values.length) }, worker))
  return result
}

export async function auditIeltsSubmissionBatches(baselineCount: number) {
  const admin = createAdminClient()
  const { data, error } = await admin
    .from('exam_submissions')
    .select('id,user_email,user_name,mock_id,mock_title,content_version,created_at,submission_status,reviewed_at,reviewed_by,reading_band,listening_band,writing_band,speaking_band,total_score,total_label,objective_answers,writing_task1_answer,writing_task2_answer,speaking_audio_paths,speaking_audio_metadata')
    .eq('exam_slug', 'ielts')
    .order('created_at', { ascending: true })
    .order('id', { ascending: true })
  if (error) throw new Error('No se pudo consultar la cola IELTS.')

  const rows = (data ?? []) as SubmissionRow[]
  if (baselineCount > rows.length) throw new Error('El corte anterior supera las entregas disponibles.')
  const audited = await mapWithConcurrency(rows, 6, (row, index) => auditRow(row, index < baselineCount ? 'previous' : 'new'))
  const previous = audited.filter(row => row.batch === 'previous')
  const current = audited.filter(row => row.batch === 'new')
  return {
    generatedAt: new Date().toISOString(),
    baselineCount,
    previous: { summary: summarize(previous), attempts: previous },
    new: { summary: summarize(current), attempts: current },
  }
}
