import 'server-only';

import { randomUUID } from 'node:crypto';
import { createAdminClient } from '@/lib/supabase/admin';
import { createClient } from '@/lib/supabase/server';
import {
  getIeltsSpeakingAssignment,
  getIeltsWritingAssignment,
  loadIeltsMock,
} from '@/lib/labs/exam-bridge/ielts';
import { getIeltsReviewBlueprint } from './review-blueprint';
import { scoreIeltsObjectiveAnswers } from './mock-scoring';
import { consumeIeltsRateLimit } from './rate-limit.server';
import {
  IELTS_SPEAKING_BUCKET,
  IELTS_SUBMISSION_CONSENT_VERSION,
  ieltsSpeakingEvidenceIssues,
  countEssayWords,
  type IeltsAudioDescriptor,
  type IeltsObjectiveAnswers,
  type IeltsSubmissionPayload,
} from './submission';
import {
  createIeltsSubmissionToken,
  IELTS_SUBMISSION_ID_PATTERN,
  verifyIeltsSubmissionToken,
} from './submission-token.server';

const PREPARE_IP_LIMIT = 100;
const PREPARE_EMAIL_LIMIT = 6;
const PREPARE_WINDOW_SECONDS = 60 * 60;
const MAX_AUDIO_BYTES = 10 * 1024 * 1024;
const MAX_TOTAL_AUDIO_BYTES = 40 * 1024 * 1024;
const MIN_AUDIO_BYTES = 1024;
const ALLOWED_MIME_TYPES = new Set([
  'audio/webm', 'audio/mp4', 'audio/ogg', 'audio/mpeg', 'audio/wav', 'audio/x-m4a',
]);

interface ErrorResponse { ok: false; error: string }

function jsonError(error: string, status: number, headers?: HeadersInit): Response {
  return Response.json({ ok: false, error } satisfies ErrorResponse, { status, headers });
}

function cleanText(value: unknown, maxLength: number): string {
  return typeof value === 'string' ? value.trim().slice(0, maxLength) : '';
}

function cleanEssay(value: unknown): string {
  return typeof value === 'string' ? value.slice(0, 32_000) : '';
}

function cleanStringMap(value: unknown, maxEntries: number, valueLength: number): Record<string, string> | null {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null;
  const entries = Object.entries(value as Record<string, unknown>);
  if (entries.length > maxEntries) return null;
  const result: Record<string, string> = {};
  for (const [rawKey, rawValue] of entries) {
    const key = cleanText(rawKey, 100);
    if (!key || typeof rawValue !== 'string') return null;
    result[key] = rawValue.slice(0, valueLength);
  }
  return result;
}

function cleanObjectiveAnswers(value: unknown): IeltsObjectiveAnswers | null {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null;
  const candidate = value as Partial<IeltsObjectiveAnswers>;
  const fills = cleanStringMap(candidate.fills, 200, 300);
  const match = cleanStringMap(candidate.match, 200, 30);
  if (!fills || !match || !candidate.mcq || typeof candidate.mcq !== 'object' || Array.isArray(candidate.mcq)) return null;
  if (!candidate.ms || typeof candidate.ms !== 'object' || Array.isArray(candidate.ms)) return null;

  const mcqEntries = Object.entries(candidate.mcq as Record<string, unknown>);
  if (mcqEntries.length > 200) return null;
  const mcq: Record<string, number> = {};
  for (const [rawKey, rawValue] of mcqEntries) {
    const key = cleanText(rawKey, 100);
    if (!key || !Number.isInteger(rawValue) || Number(rawValue) < 0 || Number(rawValue) > 20) return null;
    mcq[key] = Number(rawValue);
  }

  const msEntries = Object.entries(candidate.ms as Record<string, unknown>);
  if (msEntries.length > 100) return null;
  const ms: Record<string, string[]> = {};
  for (const [rawKey, rawValue] of msEntries) {
    const key = cleanText(rawKey, 100);
    if (!key || !Array.isArray(rawValue) || rawValue.length > 10 || rawValue.some(item => typeof item !== 'string')) return null;
    ms[key] = rawValue.map(item => cleanText(item, 10));
  }
  return { fills, mcq, ms, match };
}

function cleanAudioDescriptors(
  value: unknown,
  allowedQuestionIds: ReadonlySet<string>,
): IeltsAudioDescriptor[] | null {
  if (!Array.isArray(value) || value.length > allowedQuestionIds.size) return null;
  const seen = new Set<string>();
  const descriptors: IeltsAudioDescriptor[] = [];
  let totalBytes = 0;

  for (const item of value) {
    if (!item || typeof item !== 'object') return null;
    const candidate = item as Partial<IeltsAudioDescriptor>;
    const questionId = cleanText(candidate.questionId, 100);
    const mimeType = cleanText(candidate.mimeType, 64).split(';')[0].toLowerCase();
    if (!allowedQuestionIds.has(questionId) || seen.has(questionId)) return null;
    if (!ALLOWED_MIME_TYPES.has(mimeType)) return null;
    if (typeof candidate.size !== 'number' || candidate.size < MIN_AUDIO_BYTES || candidate.size > MAX_AUDIO_BYTES) return null;
    if (typeof candidate.durationSeconds !== 'number' || candidate.durationSeconds <= 0 || candidate.durationSeconds > 300) return null;
    totalBytes += candidate.size;
    if (totalBytes > MAX_TOTAL_AUDIO_BYTES) return null;
    seen.add(questionId);
    descriptors.push({
      questionId,
      mimeType,
      size: Math.round(candidate.size),
      durationSeconds: Math.round(candidate.durationSeconds),
    });
  }
  return descriptors;
}

function validatePayload(
  value: unknown,
  speakingAssignment: readonly { questionId: string; partNumber: number }[],
): { ok: true; payload: IeltsSubmissionPayload } | { ok: false; error: string } {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return { ok: false, error: 'La entrega no tiene un formato válido.' };
  }
  const candidate = value as Partial<IeltsSubmissionPayload>;
  const name = cleanText(candidate.name, 120);
  const email = cleanText(candidate.email, 254).toLowerCase();
  const writingTask1 = cleanEssay(candidate.writingTask1);
  const writingTask2 = cleanEssay(candidate.writingTask2);
  const objectiveAnswers = cleanObjectiveAnswers(candidate.objectiveAnswers);
  const allowedIds = new Set(speakingAssignment.map(prompt => prompt.questionId));
  const audio = cleanAudioDescriptors(candidate.audio, allowedIds);
  const speakingNotes = cleanStringMap(candidate.speakingNotes, allowedIds.size, 4_000);

  if (name.length < 2) return { ok: false, error: 'Escribe el nombre completo de la estudiante.' };
  if (!/^\S+@\S+\.\S+$/.test(email)) return { ok: false, error: 'Escribe un correo electrónico válido.' };
  if (candidate.consentVersion !== IELTS_SUBMISSION_CONSENT_VERSION) {
    return { ok: false, error: 'Debes aceptar el consentimiento académico vigente.' };
  }
  if (!objectiveAnswers) return { ok: false, error: 'No pudimos verificar las respuestas de Listening y Reading.' };
  if (countEssayWords(writingTask1) < 150) return { ok: false, error: 'Writing Task 1 necesita al menos 150 palabras para enviarse.' };
  if (countEssayWords(writingTask2) < 250) return { ok: false, error: 'Writing Task 2 necesita al menos 250 palabras para enviarse.' };
  if (!audio || !speakingNotes) return { ok: false, error: 'Uno de los audios o notas no tiene un formato válido.' };
  const evidenceIssues = ieltsSpeakingEvidenceIssues(speakingAssignment, audio);
  if (evidenceIssues.length > 0) return { ok: false, error: evidenceIssues[0] };

  return {
    ok: true,
    payload: {
      name,
      email,
      consentVersion: IELTS_SUBMISSION_CONSENT_VERSION,
      objectiveAnswers,
      writingTask1,
      writingTask2,
      speakingNotes: Object.fromEntries([...allowedIds].map(questionId => [questionId, speakingNotes[questionId] ?? ''])),
      audio,
    },
  };
}

function extensionForMime(mimeType: string): string {
  if (mimeType === 'audio/mp4' || mimeType === 'audio/x-m4a') return 'm4a';
  if (mimeType === 'audio/ogg') return 'ogg';
  if (mimeType === 'audio/mpeg') return 'mp3';
  if (mimeType === 'audio/wav') return 'wav';
  return 'webm';
}

function clientIp(request: Request): string {
  return request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
    || request.headers.get('x-real-ip')
    || 'unknown';
}

async function prepareSubmission(request: Request, mockId: string, rawPayload: unknown): Promise<Response> {
  const blueprint = getIeltsReviewBlueprint(mockId);
  const mock = blueprint ? await loadIeltsMock(mockId) : null;
  const speakingAssignment = blueprint ? await getIeltsSpeakingAssignment(mockId) : null;
  const writingTask1 = blueprint ? await getIeltsWritingAssignment(mockId, 1) : null;
  const writingTask2 = blueprint ? await getIeltsWritingAssignment(mockId, 2) : null;
  if (!blueprint || !mock || mock.title !== blueprint.mockTitle || !speakingAssignment || !writingTask1 || !writingTask2) {
    return jsonError('Este simulacro no está conectado al blueprint verificable de IELTS.', 404);
  }

  const validated = validatePayload(rawPayload, speakingAssignment);
  if (!validated.ok) return jsonError(validated.error, 400);
  const payload = validated.payload;
  const ipAllowed = await consumeIeltsRateLimit({
    namespace: 'ielts-submit-ip',
    identifier: clientIp(request),
    limit: PREPARE_IP_LIMIT,
    windowSeconds: PREPARE_WINDOW_SECONDS,
  });
  const emailAllowed = ipAllowed && await consumeIeltsRateLimit({
    namespace: 'ielts-submit-email',
    identifier: payload.email,
    limit: PREPARE_EMAIL_LIMIT,
    windowSeconds: PREPARE_WINDOW_SECONDS,
  });
  if (!ipAllowed || !emailAllowed) {
    return jsonError('Alcanzaste el límite de entregas por ahora. Espera antes de intentarlo otra vez.', 429, { 'retry-after': '3600' });
  }

  const submissionId = randomUUID();
  const admin = createAdminClient();
  const audioPaths = Object.fromEntries(payload.audio.map(audio => [
    audio.questionId,
    `${mockId}/${submissionId}/${audio.questionId}.${extensionForMime(audio.mimeType)}`,
  ]));
  const uploadResults = await Promise.all(payload.audio.map(async audio => {
    const path = audioPaths[audio.questionId];
    const { data, error } = await admin.storage.from(IELTS_SPEAKING_BUCKET).createSignedUploadUrl(path);
    return { questionId: audio.questionId, path, data, error };
  }));
  if (uploadResults.some(result => result.error || !result.data?.token)) {
    console.error('[ielts-submission] Could not create signed audio uploads', { mockId });
    return jsonError('No pudimos abrir el almacenamiento privado de audios. Inténtalo otra vez.', 503);
  }

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const objectiveScore = scoreIeltsObjectiveAnswers(mock, payload.objectiveAnswers);
  const listeningBand = objectiveScore.listening?.band ?? null;
  const readingBand = objectiveScore.reading.band;
  const skills = [
    ...(objectiveScore.listening ? [{
      skill: 'Listening', score: listeningBand, max: 9, label: `Band ${listeningBand}`,
      raw: `${objectiveScore.listening.correct}/${objectiveScore.listening.total} correct`,
    }] : []),
    {
      skill: 'Reading', score: readingBand, max: 9, label: `Band ${readingBand}`,
      raw: `${objectiveScore.reading.correct}/${objectiveScore.reading.total} correct`,
    },
  ];
  const audioMetadata = Object.fromEntries(payload.audio.map(audio => {
    const prompt = speakingAssignment.find(item => item.questionId === audio.questionId)!;
    return [audio.questionId, { ...audio, partNumber: prompt.partNumber }];
  }));

  const { error: insertError } = await admin.from('exam_submissions').insert({
    id: submissionId,
    user_id: user?.id ?? null,
    user_email: payload.email,
    user_name: payload.name,
    exam_slug: 'ielts',
    exam_name: 'IELTS Academic',
    mock_id: mockId,
    mock_title: blueprint.mockTitle,
    content_version: blueprint.contentVersion,
    assignment_snapshot: {
      writing: { task1: writingTask1, task2: writingTask2 },
      speaking: speakingAssignment,
    },
    objective_answers: payload.objectiveAnswers,
    total_score: null,
    total_max: 9,
    total_label: skills.map(skill => `${skill.skill} Band ${skill.score}`).join(' · '),
    skills,
    writing_task1_answer: payload.writingTask1,
    writing_task2_answer: payload.writingTask2,
    speaking_answers: payload.speakingNotes,
    speaking_audio_paths: audioPaths,
    speaking_audio_metadata: audioMetadata,
    reading_band: readingBand,
    listening_band: listeningBand,
    submission_status: 'uploading',
  });
  if (insertError) {
    console.error('[ielts-submission] Could not create submission:', insertError.message, { mockId });
    return jsonError('No pudimos guardar los textos. Tus respuestas siguen en el navegador; inténtalo otra vez.', 500);
  }

  return Response.json({
    ok: true,
    submissionId,
    completionToken: createIeltsSubmissionToken(submissionId),
    objectiveScores: objectiveScore,
    uploads: uploadResults.map(result => ({
      questionId: result.questionId,
      path: result.path,
      token: result.data!.token,
    })),
  });
}

async function completeSubmission(mockId: string, submissionId: unknown, completionToken: unknown): Promise<Response> {
  const blueprint = getIeltsReviewBlueprint(mockId);
  if (!blueprint) return jsonError('El simulacro no es válido.', 404);
  if (typeof submissionId !== 'string' || !IELTS_SUBMISSION_ID_PATTERN.test(submissionId)
      || !verifyIeltsSubmissionToken(submissionId, completionToken)) {
    return jsonError('La confirmación de la entrega no es válida o venció.', 403);
  }

  const admin = createAdminClient();
  const { data: submission, error: readError } = await admin
    .from('exam_submissions')
    .select('id, speaking_audio_paths, speaking_audio_metadata, submission_status')
    .eq('id', submissionId)
    .eq('exam_slug', 'ielts')
    .eq('mock_id', mockId)
    .eq('mock_title', blueprint.mockTitle)
    .maybeSingle();
  if (readError || !submission) return jsonError('No encontramos la entrega para confirmarla.', 404);
  if (submission.submission_status === 'submitted') return Response.json({ ok: true, submissionId });

  const paths = (submission.speaking_audio_paths ?? {}) as Record<string, string>;
  const metadata = (submission.speaking_audio_metadata ?? {}) as Record<string, IeltsAudioDescriptor>;
  const folder = `${mockId}/${submissionId}`;
  const { data: files, error: listError } = await admin.storage.from(IELTS_SPEAKING_BUCKET).list(folder, { limit: 20 });
  if (listError) return jsonError('No pudimos verificar los audios. Revisa tu conexión e inténtalo otra vez.', 503);
  const uploadedByName = new Map((files ?? []).map(file => [file.name, file]));
  for (const [questionId, path] of Object.entries(paths)) {
    const file = uploadedByName.get(path.split('/').pop() ?? '');
    if (!file) return jsonError(`El audio ${questionId.toUpperCase()} todavía no terminó de subir.`, 409);
    const expectedSize = metadata[questionId]?.size;
    const actualSize = Number((file.metadata as { size?: unknown } | null)?.size);
    if (!Number.isFinite(actualSize) || actualSize < MIN_AUDIO_BYTES || actualSize !== expectedSize) {
      return jsonError(`El audio ${questionId.toUpperCase()} llegó incompleto o con un tamaño distinto. Grábalo y envíalo otra vez.`, 409);
    }
  }

  const { data: updated, error: updateError } = await admin
    .from('exam_submissions')
    .update({ submission_status: 'submitted' })
    .eq('id', submissionId)
    .eq('submission_status', 'uploading')
    .select('id')
    .maybeSingle();
  if (updateError || !updated) return jsonError('Los archivos llegaron, pero no pudimos cerrar la entrega. Inténtalo otra vez.', 500);
  return Response.json({ ok: true, submissionId });
}

export async function handleIeltsSubmissionRequest(request: Request, mockId: string): Promise<Response> {
  let body: Record<string, unknown>;
  try {
    body = await request.json() as Record<string, unknown>;
  } catch {
    return jsonError('La solicitud no contiene JSON válido.', 400);
  }
  if (body.action === 'prepare') return prepareSubmission(request, mockId, body.payload);
  if (body.action === 'complete') return completeSubmission(mockId, body.submissionId, body.completionToken);
  return jsonError('Acción de entrega no válida.', 400);
}
