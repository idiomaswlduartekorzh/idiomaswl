import { randomUUID } from 'node:crypto';
import { createAdminClient } from '@/lib/supabase/admin';
import { createClient } from '@/lib/supabase/server';
import { checkRateLimit, pruneExpired } from '@/lib/labs/rate-limit';
import {
  IELTS_MOCK4_SPEAKING_IDS,
  IELTS_SPEAKING_BUCKET,
  type IeltsMock4AudioDescriptor,
  type IeltsMock4SpeakingId,
  type IeltsMock4SubmissionPayload,
} from '@/lib/ielts/mock4-submission';
import { buildIeltsScoreSummary } from '@/lib/ielts/scoring';
import {
  createIeltsSubmissionToken,
  IELTS_SUBMISSION_ID_PATTERN,
  verifyIeltsSubmissionToken,
} from '@/lib/ielts/submission-token.server';

export const runtime = 'nodejs';

const PREPARE_RULE = { limit: 5, windowMs: 60 * 60 * 1000 };
const MAX_AUDIO_BYTES = 10 * 1024 * 1024;
const MAX_TOTAL_AUDIO_BYTES = 32 * 1024 * 1024;
const ALLOWED_MIME_TYPES = new Set([
  'audio/webm',
  'audio/mp4',
  'audio/ogg',
  'audio/mpeg',
  'audio/wav',
  'audio/x-m4a',
]);

interface ErrorResponse {
  ok: false;
  error: string;
}

function jsonError(error: string, status: number): Response {
  return Response.json({ ok: false, error } satisfies ErrorResponse, { status });
}

function cleanText(value: unknown, maxLength: number): string {
  return typeof value === 'string' ? value.trim().slice(0, maxLength) : '';
}

function cleanEssay(value: unknown): string {
  return typeof value === 'string' ? value.slice(0, 32_000) : '';
}

function cleanBand(value: unknown, nullable = false): number | null {
  if (nullable && value == null) return null;
  if (typeof value !== 'number' || !Number.isFinite(value)) return null;
  return Math.min(9, Math.max(0, Math.round(value * 2) / 2));
}

function isSpeakingId(value: unknown): value is IeltsMock4SpeakingId {
  return typeof value === 'string' && (IELTS_MOCK4_SPEAKING_IDS as readonly string[]).includes(value);
}

function cleanAudioDescriptors(value: unknown): IeltsMock4AudioDescriptor[] | null {
  if (!Array.isArray(value) || value.length > IELTS_MOCK4_SPEAKING_IDS.length) return null;
  const seen = new Set<string>();
  const descriptors: IeltsMock4AudioDescriptor[] = [];
  let totalBytes = 0;

  for (const item of value) {
    if (!item || typeof item !== 'object') return null;
    const candidate = item as Partial<IeltsMock4AudioDescriptor>;
    const mimeType = cleanText(candidate.mimeType, 64).split(';')[0].toLowerCase();
    if (!isSpeakingId(candidate.questionId) || seen.has(candidate.questionId)) return null;
    if (!ALLOWED_MIME_TYPES.has(mimeType)) return null;
    if (typeof candidate.size !== 'number' || candidate.size <= 0 || candidate.size > MAX_AUDIO_BYTES) return null;
    if (typeof candidate.durationSeconds !== 'number' || candidate.durationSeconds <= 0 || candidate.durationSeconds > 240) return null;

    totalBytes += candidate.size;
    if (totalBytes > MAX_TOTAL_AUDIO_BYTES) return null;
    seen.add(candidate.questionId);
    descriptors.push({
      questionId: candidate.questionId,
      mimeType,
      size: Math.round(candidate.size),
      durationSeconds: Math.round(candidate.durationSeconds),
    });
  }
  return descriptors;
}

function cleanSpeakingNotes(value: unknown): Record<string, string> {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return {};
  return Object.fromEntries(IELTS_MOCK4_SPEAKING_IDS.map(questionId => [
    questionId,
    cleanText((value as Record<string, unknown>)[questionId], 4_000),
  ]));
}

function validatePayload(value: unknown): { ok: true; payload: IeltsMock4SubmissionPayload } | { ok: false; error: string } {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return { ok: false, error: 'La entrega no tiene un formato válido.' };
  const candidate = value as Partial<IeltsMock4SubmissionPayload>;
  const name = cleanText(candidate.name, 120);
  const email = cleanText(candidate.email, 254).toLowerCase();
  const readingBand = cleanBand(candidate.readingBand);
  const listeningBand = cleanBand(candidate.listeningBand, true);
  const audio = cleanAudioDescriptors(candidate.audio);

  if (name.length < 2) return { ok: false, error: 'Escribe el nombre completo de la estudiante.' };
  if (!/^\S+@\S+\.\S+$/.test(email)) return { ok: false, error: 'Escribe un correo electrónico válido.' };
  if (readingBand == null) return { ok: false, error: 'No pudimos validar el resultado de Reading.' };
  if (audio == null) return { ok: false, error: 'Uno de los audios no tiene un formato o tamaño válido.' };

  return {
    ok: true,
    payload: {
      name,
      email,
      readingBand,
      listeningBand,
      writingTask1: cleanEssay(candidate.writingTask1),
      writingTask2: cleanEssay(candidate.writingTask2),
      speakingNotes: cleanSpeakingNotes(candidate.speakingNotes),
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

async function prepareSubmission(request: Request, rawPayload: unknown): Promise<Response> {
  pruneExpired();
  if (!checkRateLimit(`ielts-mock4:${clientIp(request)}`, PREPARE_RULE)) {
    return jsonError('Alcanzaste el límite de entregas por ahora. Espera unos minutos antes de intentarlo otra vez.', 429);
  }

  const validated = validatePayload(rawPayload);
  if (!validated.ok) return jsonError(validated.error, 400);
  const payload = validated.payload;
  const submissionId = randomUUID();
  const admin = createAdminClient();

  const audioPaths = Object.fromEntries(payload.audio.map(audio => [
    audio.questionId,
    `set-4/${submissionId}/${audio.questionId}.${extensionForMime(audio.mimeType)}`,
  ]));

  const uploadResults = await Promise.all(payload.audio.map(async audio => {
    const path = audioPaths[audio.questionId];
    const { data, error } = await admin.storage.from(IELTS_SPEAKING_BUCKET).createSignedUploadUrl(path);
    return { questionId: audio.questionId, path, data, error };
  }));
  if (uploadResults.some(result => result.error || !result.data?.token)) {
    console.error('[ielts-mock4] Could not create signed audio uploads');
    return jsonError('No pudimos abrir el almacenamiento privado de audios. Inténtalo otra vez.', 503);
  }

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const scoreSummary = buildIeltsScoreSummary({
    listening: payload.listeningBand,
    reading: payload.readingBand,
  });

  const { error: insertError } = await admin.from('exam_submissions').insert({
    id: submissionId,
    user_id: user?.id ?? null,
    user_email: payload.email,
    user_name: payload.name,
    exam_slug: 'ielts',
    exam_name: 'IELTS Academic',
    mock_title: 'IELTS Academic Set 4',
    total_score: scoreSummary.totalScore,
    total_max: 9,
    total_label: scoreSummary.totalLabel,
    skills: scoreSummary.skills,
    writing_task1_answer: payload.writingTask1 || null,
    writing_task2_answer: payload.writingTask2 || null,
    speaking_answers: payload.speakingNotes,
    speaking_audio_paths: Object.keys(audioPaths).length > 0 ? audioPaths : null,
    reading_band: payload.readingBand,
    listening_band: payload.listeningBand,
    submission_status: 'uploading',
  });

  if (insertError) {
    console.error('[ielts-mock4] Could not create submission:', insertError.message);
    return jsonError('No pudimos guardar los textos. Tus respuestas siguen en el navegador; inténtalo otra vez.', 500);
  }

  return Response.json({
    ok: true,
    submissionId,
    completionToken: createIeltsSubmissionToken(submissionId),
    uploads: uploadResults.map(result => ({
      questionId: result.questionId,
      path: result.path,
      token: result.data!.token,
    })),
  });
}

async function completeSubmission(submissionId: unknown, completionToken: unknown): Promise<Response> {
  if (typeof submissionId !== 'string' || !IELTS_SUBMISSION_ID_PATTERN.test(submissionId) || !verifyIeltsSubmissionToken(submissionId, completionToken)) {
    return jsonError('La confirmación de la entrega no es válida o venció.', 403);
  }

  const admin = createAdminClient();
  const { data: submission, error: readError } = await admin
    .from('exam_submissions')
    .select('id, speaking_audio_paths, submission_status')
    .eq('id', submissionId)
    .eq('exam_slug', 'ielts')
    .eq('mock_title', 'IELTS Academic Set 4')
    .maybeSingle();

  if (readError || !submission) return jsonError('No encontramos la entrega para confirmarla.', 404);
  if (submission.submission_status === 'submitted') return Response.json({ ok: true, submissionId });

  const expectedPaths = submission.speaking_audio_paths && typeof submission.speaking_audio_paths === 'object'
    ? Object.values(submission.speaking_audio_paths as Record<string, string>)
    : [];

  if (expectedPaths.length > 0) {
    const folder = `set-4/${submissionId}`;
    const { data: files, error: listError } = await admin.storage.from(IELTS_SPEAKING_BUCKET).list(folder, { limit: 10 });
    if (listError) return jsonError('No pudimos verificar los audios. Revisa tu conexión e inténtalo otra vez.', 503);
    const uploadedNames = new Set((files ?? []).map(file => file.name));
    const missingAudio = expectedPaths.some(path => !uploadedNames.has(path.split('/').pop() ?? ''));
    if (missingAudio) return jsonError('Uno de los audios todavía no terminó de subir. Espera unos segundos e inténtalo otra vez.', 409);
  }

  const { error: updateError } = await admin
    .from('exam_submissions')
    .update({ submission_status: 'submitted' })
    .eq('id', submissionId)
    .eq('submission_status', 'uploading');
  if (updateError) return jsonError('Los archivos llegaron, pero no pudimos cerrar la entrega. Inténtalo otra vez.', 500);

  return Response.json({ ok: true, submissionId });
}

export async function POST(request: Request): Promise<Response> {
  let body: Record<string, unknown>;
  try {
    body = await request.json() as Record<string, unknown>;
  } catch {
    return jsonError('La solicitud no contiene JSON válido.', 400);
  }

  if (body.action === 'prepare') return prepareSubmission(request, body.payload);
  if (body.action === 'complete') return completeSubmission(body.submissionId, body.completionToken);
  return jsonError('Acción de entrega no válida.', 400);
}
