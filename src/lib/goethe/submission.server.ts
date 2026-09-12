import 'server-only'

import { randomUUID } from 'node:crypto'
import { createAdminClient } from '@/lib/supabase/admin'
import { createClient } from '@/lib/supabase/server'
import goetheA1Set1 from '@/data/mocks/goethe-a1-set-1'
import goetheA1Set2 from '@/data/mocks/goethe-a1-set-2'
import type { FormGroupQuestion, MCQQuestion, MockExam, SpeakQuestion } from '@/data/mocks/types'
import { consumeExamReviewRateLimit } from '@/lib/exam-review/rate-limit.server'
import { scoreGoetheAutomatic } from './scoring'
import {
  getGoetheA1ContentVersion,
  GOETHE_SPEAKING_BUCKET,
  GOETHE_SUBMISSION_CONSENT_VERSION,
  type GoetheAudioDescriptor,
  type GoetheSubmissionPayload,
} from './submission'
import {
  createGoetheSubmissionToken,
  GOETHE_SUBMISSION_ID_PATTERN,
  verifyGoetheSubmissionToken,
} from './submission-token.server'

const MAX_AUDIO_BYTES = 10 * 1024 * 1024
const MIN_AUDIO_BYTES = 1024
const MAX_TOTAL_AUDIO_BYTES = 30 * 1024 * 1024
const ALLOWED_MIME_TYPES = new Set(['audio/webm', 'audio/mp4', 'audio/ogg', 'audio/mpeg', 'audio/wav', 'audio/x-m4a'])

interface ErrorResponse { ok: false; error: string }

const GOETHE_A1_MOCKS = new Map<string, MockExam>([
  [goetheA1Set1.id, goetheA1Set1],
  [goetheA1Set2.id, goetheA1Set2],
])

function resolveMock(mockId: string): { mock: MockExam; contentVersion: string } | null {
  const mock = GOETHE_A1_MOCKS.get(mockId)
  const contentVersion = getGoetheA1ContentVersion(mockId)
  return mock && contentVersion ? { mock, contentVersion } : null
}

function jsonError(error: string, status: number, headers?: HeadersInit): Response {
  return Response.json({ ok: false, error } satisfies ErrorResponse, { status, headers })
}

function cleanText(value: unknown, maxLength: number): string {
  return typeof value === 'string' ? value.trim().slice(0, maxLength) : ''
}

function cleanStringMap(value: unknown, allowedKeys: ReadonlySet<string>, maxLength: number): Record<string, string> | null {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null
  const result: Record<string, string> = {}
  for (const [key, raw] of Object.entries(value as Record<string, unknown>)) {
    if (!allowedKeys.has(key) || typeof raw !== 'string') return null
    result[key] = raw.slice(0, maxLength)
  }
  return result
}

function cleanAnswers(value: unknown, questions: readonly MCQQuestion[]): Record<string, number> | null {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null
  const allowed = new Map(questions.map(question => [question.id, question.options.length]))
  const result: Record<string, number> = {}
  for (const [key, raw] of Object.entries(value as Record<string, unknown>)) {
    const optionCount = allowed.get(key)
    if (!optionCount || !Number.isInteger(raw) || Number(raw) < 0 || Number(raw) >= optionCount) return null
    result[key] = Number(raw)
  }
  return result
}

function cleanCardOrders(value: unknown): Record<string, number[]> | null {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null
  const allowed = new Set(['9', '10', '11'])
  const result: Record<string, number[]> = {}
  for (const [key, raw] of Object.entries(value as Record<string, unknown>)) {
    if (!allowed.has(key) || !Array.isArray(raw) || raw.length > 12 || raw.some(item => !Number.isInteger(item) || Number(item) < 0 || Number(item) > 20)) return null
    result[key] = raw.map(Number)
  }
  return result
}

function cleanAudio(value: unknown, speakingIds: ReadonlySet<string>): GoetheAudioDescriptor[] | null {
  if (!Array.isArray(value) || value.length !== speakingIds.size) return null
  const seen = new Set<string>()
  let totalBytes = 0
  const result: GoetheAudioDescriptor[] = []
  for (const raw of value) {
    if (!raw || typeof raw !== 'object') return null
    const item = raw as Partial<GoetheAudioDescriptor>
    const questionId = cleanText(item.questionId, 100)
    const mimeType = cleanText(item.mimeType, 64).split(';')[0].toLowerCase()
    if (!speakingIds.has(questionId) || seen.has(questionId) || !ALLOWED_MIME_TYPES.has(mimeType)) return null
    if (typeof item.size !== 'number' || item.size < MIN_AUDIO_BYTES || item.size > MAX_AUDIO_BYTES) return null
    if (typeof item.durationSeconds !== 'number' || item.durationSeconds < 2 || item.durationSeconds > 300) return null
    totalBytes += item.size
    if (totalBytes > MAX_TOTAL_AUDIO_BYTES) return null
    seen.add(questionId)
    result.push({ questionId, mimeType, size: Math.round(item.size), durationSeconds: Math.round(item.durationSeconds) })
  }
  return seen.size === speakingIds.size ? result : null
}

function validatePayload(value: unknown, mock: MockExam, contentVersion: string): { ok: true; payload: GoetheSubmissionPayload } | { ok: false; error: string } {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return { ok: false, error: 'La entrega no tiene un formato válido.' }
  const candidate = value as Partial<GoetheSubmissionPayload>
  const objective = mock.sections.flatMap(section => section.questions.filter(question => question.type === 'mcq') as MCQQuestion[])
  const form = mock.sections.flatMap(section => section.questions).find(question => question.type === 'formgroup') as FormGroupQuestion
  const speaking = mock.sections.flatMap(section => section.questions.filter(question => question.type === 'speak') as SpeakQuestion[])
  const answers = cleanAnswers(candidate.answers, objective)
  const formValues = cleanStringMap(candidate.formValues, new Set(form.blanks.map(blank => String(blank.num))), 100)
  const cardOrders = cleanCardOrders(candidate.cardOrders)
  const audio = cleanAudio(candidate.audio, new Set(speaking.map(question => question.id)))
  const name = cleanText(candidate.name, 120)
  const email = cleanText(candidate.email, 254).toLowerCase()
  const writing = typeof candidate.writing === 'string' ? candidate.writing.slice(0, 5_000) : ''

  if (candidate.contentVersion !== contentVersion) return { ok: false, error: 'El examen cambió mientras estaba abierto. Recarga la página antes de enviarlo.' }
  if (candidate.consentVersion !== GOETHE_SUBMISSION_CONSENT_VERSION) return { ok: false, error: 'Debes aceptar el consentimiento académico vigente.' }
  if (name.length < 2) return { ok: false, error: 'Escribe el nombre completo del estudiante.' }
  if (!/^\S+@\S+\.\S+$/.test(email)) return { ok: false, error: 'Escribe un correo electrónico válido.' }
  if (!answers || !formValues || !cardOrders) return { ok: false, error: 'No pudimos verificar una de las respuestas del examen.' }
  if (!audio) return { ok: false, error: 'Necesitamos las tres grabaciones de Sprechen para completar la evaluación.' }
  return { ok: true, payload: { contentVersion, consentVersion: GOETHE_SUBMISSION_CONSENT_VERSION, name, email, answers, formValues, writing, cardOrders, audio } }
}

function extensionForMime(mimeType: string): string {
  if (mimeType === 'audio/mp4' || mimeType === 'audio/x-m4a') return 'm4a'
  if (mimeType === 'audio/ogg') return 'ogg'
  if (mimeType === 'audio/mpeg') return 'mp3'
  if (mimeType === 'audio/wav') return 'wav'
  return 'webm'
}

function clientIp(request: Request): string {
  return request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || request.headers.get('x-real-ip') || 'unknown'
}

function objectiveSnapshot(mock: MockExam) {
  return mock.sections.flatMap(section =>
    (section.questions.filter(question => question.type === 'mcq') as MCQQuestion[]).map(question => ({
      id: question.id,
      skill: section.skill,
      part: section.part,
      text: question.text,
      options: question.options,
      answer: question.answer,
    })),
  )
}

async function prepareSubmission(request: Request, mockId: string, rawPayload: unknown): Promise<Response> {
  const resolved = resolveMock(mockId)
  if (!resolved) return jsonError('Este simulacro todavía no admite entregas verificables.', 404)
  const { mock, contentVersion } = resolved
  const validated = validatePayload(rawPayload, mock, contentVersion)
  if (!validated.ok) return jsonError(validated.error, 400)
  const payload = validated.payload
  const ipAllowed = await consumeExamReviewRateLimit({ namespace: 'goethe-submit-ip', identifier: clientIp(request), limit: 100, windowSeconds: 3600 })
  const emailAllowed = ipAllowed && await consumeExamReviewRateLimit({ namespace: 'goethe-submit-email', identifier: payload.email, limit: 8, windowSeconds: 3600 })
  if (!ipAllowed || !emailAllowed) return jsonError('Alcanzaste el límite de entregas por ahora. Espera antes de intentarlo otra vez.', 429, { 'retry-after': '3600' })

  const submissionId = randomUUID()
  const admin = createAdminClient()
  const audioPaths = Object.fromEntries(payload.audio.map(audio => [audio.questionId, `${mockId}/${submissionId}/${audio.questionId}.${extensionForMime(audio.mimeType)}`]))
  const uploads = await Promise.all(payload.audio.map(async audio => {
    const path = audioPaths[audio.questionId]
    const { data, error } = await admin.storage.from(GOETHE_SPEAKING_BUCKET).createSignedUploadUrl(path)
    return { questionId: audio.questionId, path, data, error }
  }))
  if (uploads.some(upload => upload.error || !upload.data?.token)) return jsonError('No pudimos abrir el almacenamiento privado de audios. Inténtalo otra vez.', 503)

  const automatic = scoreGoetheAutomatic(mock, payload.answers, payload.formValues)
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const speakingMetadata = Object.fromEntries(payload.audio.map(audio => [audio.questionId, audio]))
  const { error } = await admin.from('exam_submissions').insert({
    id: submissionId,
    user_id: user?.id ?? null,
    user_email: payload.email,
    user_name: payload.name,
    exam_slug: 'goethe',
    exam_name: 'Goethe-Zertifikat A1',
    mock_id: mockId,
    mock_title: mock.title,
    content_version: contentVersion,
    assignment_snapshot: {
      objective: objectiveSnapshot(mock),
      form: (mock.sections.flatMap(section => section.questions).find(question => question.type === 'formgroup') as FormGroupQuestion),
      speaking: mock.sections.flatMap(section => section.questions.filter(question => question.type === 'speak')),
      cardOrders: payload.cardOrders,
      scoring: { scale: 'Start Deutsch 1 raw 60 × 1.66, rounded', passScore: 60 },
    },
    objective_answers: { answers: payload.answers, formValues: payload.formValues },
    writing_task2_answer: payload.writing,
    speaking_audio_paths: audioPaths,
    speaking_audio_metadata: speakingMetadata,
    total_score: null,
    total_max: 100,
    total_label: `${automatic.automaticScaled} Punkte automatisch bestätigt · Schreiben Teil 2 und Sprechen pendiente`,
    skills: [
      { skill: 'Hören', score: automatic.listeningCorrect, max: 15, label: `${automatic.listeningCorrect}/15 Rohpunkte` },
      { skill: 'Lesen', score: automatic.readingCorrect, max: 15, label: `${automatic.readingCorrect}/15 Rohpunkte` },
      { skill: 'Schreiben Teil 1', score: automatic.formCorrect, max: 5, label: `${automatic.formCorrect}/5 Rohpunkte` },
    ],
    submission_status: 'uploading',
  })
  if (error) {
    console.error('[goethe-submission] Could not create submission', error.message, { mockId })
    return jsonError('No pudimos guardar las respuestas. Siguen en esta pantalla; inténtalo otra vez.', 500)
  }

  const completionToken = createGoetheSubmissionToken(submissionId)
  return Response.json({ ok: true, submissionId, completionToken, uploads: uploads.map(upload => ({ questionId: upload.questionId, path: upload.path, token: upload.data!.token })) })
}

async function completeSubmission(mockId: string, submissionId: unknown, token: unknown): Promise<Response> {
  const resolved = resolveMock(mockId)
  if (!resolved || typeof submissionId !== 'string' || !GOETHE_SUBMISSION_ID_PATTERN.test(submissionId) || !verifyGoetheSubmissionToken(submissionId, token)) {
    return jsonError('La confirmación de la entrega no es válida o venció.', 403)
  }
  const admin = createAdminClient()
  const { data: submission, error: readError } = await admin.from('exam_submissions')
    .select('id, objective_answers, speaking_audio_paths, speaking_audio_metadata, submission_status')
    .eq('id', submissionId).eq('exam_slug', 'goethe').eq('mock_id', mockId).maybeSingle()
  if (readError || !submission) return jsonError('No encontramos la entrega para confirmarla.', 404)
  const objective = (submission.objective_answers ?? {}) as { answers?: Record<string, number>; formValues?: Record<string, string> }
  const automatic = scoreGoetheAutomatic(resolved.mock, objective.answers ?? {}, objective.formValues ?? {})
  if (submission.submission_status !== 'submitted') {
    const paths = (submission.speaking_audio_paths ?? {}) as Record<string, string>
    const metadata = (submission.speaking_audio_metadata ?? {}) as Record<string, GoetheAudioDescriptor>
    const { data: files, error: listError } = await admin.storage.from(GOETHE_SPEAKING_BUCKET).list(`${mockId}/${submissionId}`, { limit: 10 })
    if (listError) return jsonError('No pudimos verificar los audios. Inténtalo otra vez.', 503)
    const byName = new Map((files ?? []).map(file => [file.name, file]))
    for (const [questionId, path] of Object.entries(paths)) {
      const file = byName.get(path.split('/').pop() ?? '')
      const actualSize = Number((file?.metadata as { size?: unknown } | null)?.size)
      if (!file || !Number.isFinite(actualSize) || actualSize < MIN_AUDIO_BYTES || actualSize !== metadata[questionId]?.size) return jsonError(`El audio ${questionId.toUpperCase()} llegó incompleto.`, 409)
    }
    const { data: updated, error } = await admin.from('exam_submissions').update({ submission_status: 'submitted' })
      .eq('id', submissionId).eq('submission_status', 'uploading').select('id').maybeSingle()
    if (error || !updated) return jsonError('Los archivos llegaron, pero no pudimos cerrar la entrega.', 500)
  }
  return Response.json({ ok: true, submissionId, completionToken: token, automatic })
}

export async function handleGoetheSubmissionRequest(request: Request, mockId: string): Promise<Response> {
  let body: Record<string, unknown>
  try { body = await request.json() as Record<string, unknown> } catch { return jsonError('La solicitud no contiene JSON válido.', 400) }
  if (body.action === 'prepare') return prepareSubmission(request, mockId, body.payload)
  if (body.action === 'complete') return completeSubmission(mockId, body.submissionId, body.completionToken)
  return jsonError('Acción de entrega no válida.', 400)
}

export async function handleGoetheResultRequest(request: Request, mockId: string): Promise<Response> {
  const url = new URL(request.url)
  const submissionId = url.searchParams.get('submissionId')
  const token = url.searchParams.get('token')
  if (!resolveMock(mockId) || !submissionId || !GOETHE_SUBMISSION_ID_PATTERN.test(submissionId) || !verifyGoetheSubmissionToken(submissionId, token)) {
    return jsonError('El comprobante de resultado no es válido o venció.', 403)
  }
  const { data, error } = await createAdminClient().from('exam_submissions')
    .select('total_score, total_label, skills, writing_task1_assessment, reviewed_at')
    .eq('id', submissionId).eq('exam_slug', 'goethe').eq('mock_id', mockId).eq('submission_status', 'submitted').maybeSingle()
  if (error || !data) return jsonError('No encontramos este resultado.', 404)
  const review = (data.writing_task1_assessment ?? {}) as { evidenceNotes?: unknown }
  return Response.json({
    ok: true,
    status: data.reviewed_at ? 'reviewed' : 'pending',
    totalScore: data.total_score,
    totalLabel: data.total_label ?? 'Evaluación pendiente',
    skills: Array.isArray(data.skills) ? data.skills : [],
    feedback: typeof review.evidenceNotes === 'string' ? review.evidenceNotes : null,
    reviewedAt: data.reviewed_at,
  })
}
