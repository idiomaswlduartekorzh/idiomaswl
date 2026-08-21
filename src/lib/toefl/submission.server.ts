import 'server-only';

import { randomUUID } from 'node:crypto';
import { createAdminClient } from '@/lib/supabase/admin';
import { createClient } from '@/lib/supabase/server';
import { consumeExamReviewRateLimit } from '@/lib/exam-review/rate-limit.server';
import {
  getToeflSpeakingAssignment,
  getToeflWritingAssignment,
  loadToeflMock,
} from '@/lib/labs/exam-bridge/toefl';
import type {
  MockExam,
  ToeflBuildSentenceQuestion,
  ToeflListeningSingleQuestion,
  ToeflReadingMultiQuestion,
  ToeflReadingSingleQuestion,
  WordCompleteQuestion,
} from '@/data/mocks/types';
import { TOEFL_CTW_SCORING_BY_OBJECT_ID } from '@/server/toefl/complete-words-registry';
import { TOEFL_READING_SCORING_BY_OBJECT_ID } from '@/server/toefl/reading-registry';
import { TOEFL_FIXED_LISTENING_SCORING_BY_OBJECT_ID } from '@/server/toefl/listening-registry';
import { TOEFL_BUILD_SENTENCE_SCORING_BY_OBJECT_ID } from '@/server/toefl/build-sentence-registry';
import { scoreCompleteWords } from '@/lib/toefl/complete-words-contract';
import { scoreToeflReadingAttempt } from '@/lib/toefl/reading-contract';
import { scoreToeflListeningAttempt } from '@/lib/toefl/listening-contract';
import { scoreToeflBuildSentenceAttempt } from '@/lib/toefl/build-sentence-contract';
import { getToeflReviewBlueprint } from './review-blueprint';
import {
  TOEFL_SPEAKING_BUCKET,
  TOEFL_SUBMISSION_CONSENT_VERSION,
  toeflSpeakingEvidenceIssues,
  type ToeflAudioDescriptor,
  type ToeflObjectiveAnswers,
  type ToeflSubmissionPayload,
} from './submission';
import {
  createToeflSubmissionToken,
  TOEFL_SUBMISSION_ID_PATTERN,
  verifyToeflSubmissionToken,
} from './submission-token.server';

const PREPARE_IP_LIMIT = 100;
const PREPARE_EMAIL_LIMIT = 6;
const PREPARE_WINDOW_SECONDS = 60 * 60;
const MIN_AUDIO_BYTES = 1024;
const MAX_AUDIO_BYTES = 10 * 1024 * 1024;
const MAX_TOTAL_AUDIO_BYTES = 60 * 1024 * 1024;
const MIN_WRITING_CHARS = 150;
const ALLOWED_MIME_TYPES = new Set([
  'audio/webm', 'audio/mp4', 'audio/ogg', 'audio/mpeg', 'audio/wav', 'audio/x-m4a',
]);

interface ErrorResponse { ok: false; error: string }

function jsonError(error: string, status: number, headers?: HeadersInit): Response {
  return Response.json({ ok: false, error } satisfies ErrorResponse, { status, headers });
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}

function cleanText(value: unknown, maxLength: number): string {
  return typeof value === 'string' ? value.trim().slice(0, maxLength) : '';
}

function cleanEssay(value: unknown): string {
  return typeof value === 'string' ? value.slice(0, 32_000) : '';
}

function cleanId(value: unknown): string {
  const id = cleanText(value, 180);
  return /^[a-zA-Z0-9:._-]+$/.test(id) ? id : '';
}

function expectedQuestions(mock: MockExam) {
  const all = mock.sections.flatMap(section => section.questions);
  return {
    words: all.filter((question): question is WordCompleteQuestion & { objectId: string } =>
      question.type === 'wordcomplete'
      && question.serverScoring === 'toefl-complete-words'
      && typeof question.objectId === 'string'),
    reading: all.filter((question): question is ToeflReadingSingleQuestion | ToeflReadingMultiQuestion =>
      question.type === 'toefl-reading-single' || question.type === 'toefl-reading-multi'),
    listening: all.filter((question): question is ToeflListeningSingleQuestion =>
      question.type === 'toefl-listening-single' && question.mediaStatus === 'ready-existing'),
    build: all.filter((question): question is ToeflBuildSentenceQuestion => question.type === 'toefl-build-sentence'),
  };
}

function cleanStringAnswers(value: unknown, allowedIds: ReadonlySet<string>, maxLength = 180): Record<string, string> | null {
  if (!isRecord(value) || Object.keys(value).some(key => !allowedIds.has(key))) return null;
  const result: Record<string, string> = {};
  for (const id of allowedIds) {
    const raw = value[id];
    if (raw === undefined) continue;
    if (typeof raw !== 'string') return null;
    result[id] = raw.slice(0, maxLength);
  }
  return result;
}

function cleanArrayAnswers(value: unknown, allowedIds: ReadonlySet<string>, maxItems: number): Record<string, string[]> | null {
  if (!isRecord(value) || Object.keys(value).some(key => !allowedIds.has(key))) return null;
  const result: Record<string, string[]> = {};
  for (const id of allowedIds) {
    const raw = value[id];
    if (raw === undefined) continue;
    if (!Array.isArray(raw) || raw.length > maxItems || raw.some(item => !cleanId(item))) return null;
    const cleaned = raw.map(item => cleanId(item));
    if (new Set(cleaned).size !== cleaned.length) return null;
    result[id] = cleaned;
  }
  return result;
}

function cleanWordAnswers(value: unknown, questions: readonly WordCompleteQuestion[]): ToeflObjectiveAnswers['word'] | null {
  if (!isRecord(value)) return null;
  const byId = new Map(questions.map(question => [question.id, question]));
  if (Object.keys(value).some(id => !byId.has(id))) return null;
  const result: ToeflObjectiveAnswers['word'] = {};
  for (const [id, question] of byId) {
    const raw = value[id];
    if (raw === undefined) continue;
    if (!isRecord(raw)) return null;
    const allowedNumbers = new Set(question.blanks.map(blank => String(blank.num)));
    if (Object.keys(raw).some(number => !allowedNumbers.has(number))) return null;
    result[id] = {};
    for (const blank of question.blanks) {
      const answer = raw[String(blank.num)];
      if (answer === undefined) continue;
      if (typeof answer !== 'string' || answer.length > 30) return null;
      result[id][blank.num] = answer;
    }
  }
  return result;
}

function cleanObjectiveAnswers(value: unknown, mock: MockExam): ToeflObjectiveAnswers | null {
  if (!isRecord(value)) return null;
  const questions = expectedQuestions(mock);
  const word = cleanWordAnswers(value.word, questions.words);
  const single = cleanStringAnswers(value.single, new Set(questions.reading.filter(q => q.type === 'toefl-reading-single').map(q => q.id)));
  const multi = cleanArrayAnswers(value.multi, new Set(questions.reading.filter(q => q.type === 'toefl-reading-multi').map(q => q.id)), 8);
  const listening = cleanStringAnswers(value.listening, new Set(questions.listening.map(q => q.id)));
  const build = cleanArrayAnswers(value.build, new Set(questions.build.map(q => q.id)), 12);
  return word && single && multi && listening && build ? { word, single, multi, listening, build } : null;
}

function cleanAudioDescriptors(value: unknown, allowedIds: ReadonlySet<string>): ToeflAudioDescriptor[] | null {
  if (!Array.isArray(value) || value.length > allowedIds.size) return null;
  const seen = new Set<string>();
  const descriptors: ToeflAudioDescriptor[] = [];
  let totalBytes = 0;
  for (const item of value) {
    if (!isRecord(item)) return null;
    const questionId = cleanId(item.questionId);
    const mimeType = cleanText(item.mimeType, 64).split(';')[0].toLowerCase();
    const size = Number(item.size);
    const durationSeconds = Number(item.durationSeconds);
    if (!allowedIds.has(questionId) || seen.has(questionId) || !ALLOWED_MIME_TYPES.has(mimeType)) return null;
    if (!Number.isFinite(size) || size < MIN_AUDIO_BYTES || size > MAX_AUDIO_BYTES) return null;
    if (!Number.isFinite(durationSeconds) || durationSeconds < 1 || durationSeconds > 180) return null;
    totalBytes += size;
    if (totalBytes > MAX_TOTAL_AUDIO_BYTES) return null;
    seen.add(questionId);
    descriptors.push({ questionId, mimeType, size: Math.round(size), durationSeconds: Math.round(durationSeconds) });
  }
  return descriptors;
}

function validatePayload(value: unknown, mock: MockExam, speaking: readonly { questionId: string; taskType: 'repeat' | 'interview'; label: string }[]):
  { ok: true; payload: ToeflSubmissionPayload } | { ok: false; error: string } {
  if (!isRecord(value)) return { ok: false, error: 'La entrega no tiene un formato válido.' };
  const name = cleanText(value.name, 120);
  const email = cleanText(value.email, 254).toLowerCase();
  const attemptId = cleanId(value.attemptId);
  const writingEmail = cleanEssay(value.writingEmail);
  const writingDiscussion = cleanEssay(value.writingDiscussion);
  const objectiveAnswers = cleanObjectiveAnswers(value.objectiveAnswers, mock);
  const audio = cleanAudioDescriptors(value.audio, new Set(speaking.map(prompt => prompt.questionId)));

  if (name.length < 2) return { ok: false, error: 'Escribe el nombre completo de la estudiante.' };
  if (!/^\S+@\S+\.\S+$/.test(email)) return { ok: false, error: 'Escribe un correo electrónico válido.' };
  if (!attemptId) return { ok: false, error: 'El intento no tiene una identidad válida.' };
  if (value.consentVersion !== TOEFL_SUBMISSION_CONSENT_VERSION) return { ok: false, error: 'Debes aceptar el consentimiento académico vigente.' };
  if (!objectiveAnswers) return { ok: false, error: 'No pudimos verificar las respuestas objetivas.' };
  if (writingEmail.trim().length < MIN_WRITING_CHARS) return { ok: false, error: `Write an Email necesita al menos ${MIN_WRITING_CHARS} caracteres para entrar al corrector.` };
  if (writingDiscussion.trim().length < MIN_WRITING_CHARS) return { ok: false, error: `Academic Discussion necesita al menos ${MIN_WRITING_CHARS} caracteres para entrar al corrector.` };
  if (!audio) return { ok: false, error: 'Uno de los audios no tiene un formato válido.' };
  const evidenceIssues = toeflSpeakingEvidenceIssues(speaking, audio);
  if (evidenceIssues.length > 0) return { ok: false, error: evidenceIssues[0] };
  return { ok: true, payload: { name, email, consentVersion: TOEFL_SUBMISSION_CONSENT_VERSION, attemptId, objectiveAnswers, writingEmail, writingDiscussion, audio } };
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

function scoreObjective(mock: MockExam, answers: ToeflObjectiveAnswers, attemptId: string) {
  const questions = expectedQuestions(mock);
  let readingCorrect = 0;
  let readingTotal = 0;
  for (const question of questions.words) {
    const key = TOEFL_CTW_SCORING_BY_OBJECT_ID[question.objectId];
    if (!key) throw new Error(`Missing Complete Words key: ${question.objectId}`);
    const result = scoreCompleteWords(key, {
      objectId: question.objectId,
      attemptId,
      closeId: `submission:${attemptId}:${question.id}`,
      responses: Object.fromEntries(question.blanks.map(blank => [blank.id!, answers.word[question.id]?.[blank.num] ?? ''])),
      presentedBlankIds: question.blanks.map(blank => blank.id!),
    });
    readingCorrect += result.correct;
    readingTotal += result.denominator;
  }

  if (questions.reading.length > 0) {
    const objectIds = new Set(questions.reading.map(question => question.objectId));
    if (objectIds.size !== 1) throw new Error('Reading object identity mismatch');
    const objectId = [...objectIds][0];
    const config = TOEFL_READING_SCORING_BY_OBJECT_ID[objectId];
    if (!config) throw new Error(`Missing Reading key: ${objectId}`);
    const result = scoreToeflReadingAttempt(config, {
      attemptId,
      closeId: `submission:${attemptId}:${objectId}`,
      responses: Object.fromEntries(questions.reading.map(question => [
        question.id,
        question.type === 'toefl-reading-single' ? answers.single[question.id] ?? null : answers.multi[question.id] ?? [],
      ])),
      presentedItemIds: questions.reading.map(question => question.id),
    });
    readingCorrect += result.correct;
    readingTotal += result.denominator;
  }

  let listeningCorrect = 0;
  let listeningTotal = 0;
  if (questions.listening.length > 0) {
    const objectIds = new Set(questions.listening.map(question => question.objectId));
    if (objectIds.size !== 1) throw new Error('Listening object identity mismatch');
    const objectId = [...objectIds][0];
    const config = TOEFL_FIXED_LISTENING_SCORING_BY_OBJECT_ID[objectId];
    if (!config) throw new Error(`Missing Listening key: ${objectId}`);
    const result = scoreToeflListeningAttempt(config, {
      attemptId,
      closeId: `submission:${attemptId}:${objectId}`,
      responses: Object.fromEntries(questions.listening.map(question => [question.id, answers.listening[question.id] ?? null])),
      presentedItemIds: questions.listening.map(question => question.id),
    });
    listeningCorrect = result.correct;
    listeningTotal = result.denominator;
  }

  let buildCorrect = 0;
  let buildTotal = 0;
  if (questions.build.length > 0) {
    const objectIds = new Set(questions.build.map(question => question.objectId));
    if (objectIds.size !== 1) throw new Error('Build Sentence object identity mismatch');
    const objectId = [...objectIds][0];
    const config = TOEFL_BUILD_SENTENCE_SCORING_BY_OBJECT_ID[objectId];
    if (!config) throw new Error(`Missing Build Sentence key: ${objectId}`);
    const result = scoreToeflBuildSentenceAttempt(config, {
      attemptId,
      closeId: `submission:${attemptId}:${objectId}`,
      responses: Object.fromEntries(questions.build.map(question => [question.id, answers.build[question.id] ?? []])),
      presentedItemIds: questions.build.map(question => question.id),
    });
    buildCorrect = result.correct;
    buildTotal = result.denominator;
  }

  return { readingCorrect, readingTotal, listeningCorrect, listeningTotal, buildCorrect, buildTotal };
}

async function prepareSubmission(request: Request, mockId: string, rawPayload: unknown): Promise<Response> {
  const blueprint = getToeflReviewBlueprint(mockId);
  const [mock, speaking, writingEmail, writingDiscussion] = blueprint
    ? await Promise.all([
        loadToeflMock(mockId),
        getToeflSpeakingAssignment(mockId),
        getToeflWritingAssignment(mockId, 'write-email'),
        getToeflWritingAssignment(mockId, 'academic-discussion'),
      ])
    : [null, null, null, null];
  if (!blueprint || !mock || mock.title !== blueprint.mockTitle || !speaking || !writingEmail || !writingDiscussion) {
    return jsonError('Este simulacro no está conectado al blueprint verificable de TOEFL 2026.', 404);
  }
  const validated = validatePayload(rawPayload, mock, speaking);
  if (!validated.ok) return jsonError(validated.error, 400);
  const payload = validated.payload;

  const ipAllowed = await consumeExamReviewRateLimit({ namespace: 'toefl-submit-ip', identifier: clientIp(request), limit: PREPARE_IP_LIMIT, windowSeconds: PREPARE_WINDOW_SECONDS });
  const emailAllowed = ipAllowed && await consumeExamReviewRateLimit({ namespace: 'toefl-submit-email', identifier: payload.email, limit: PREPARE_EMAIL_LIMIT, windowSeconds: PREPARE_WINDOW_SECONDS });
  if (!ipAllowed || !emailAllowed) return jsonError('Alcanzaste el límite de entregas por ahora. Espera antes de intentarlo otra vez.', 429, { 'retry-after': '3600' });

  let objective;
  try {
    objective = scoreObjective(mock, payload.objectiveAnswers, payload.attemptId);
  } catch (error) {
    console.error('[toefl-submission] Objective scoring failed:', error);
    return jsonError('No pudimos verificar la corrección objetiva de este intento.', 409);
  }

  const submissionId = randomUUID();
  const admin = createAdminClient();
  const audioPaths = Object.fromEntries(payload.audio.map(audio => [
    audio.questionId,
    `${mockId}/${submissionId}/${audio.questionId}.${extensionForMime(audio.mimeType)}`,
  ]));
  const uploadResults = await Promise.all(payload.audio.map(async audio => {
    const path = audioPaths[audio.questionId];
    const { data, error } = await admin.storage.from(TOEFL_SPEAKING_BUCKET).createSignedUploadUrl(path);
    return { questionId: audio.questionId, path, data, error };
  }));
  if (uploadResults.some(result => result.error || !result.data?.token)) {
    console.error('[toefl-submission] Could not create signed audio uploads', { mockId });
    return jsonError('No pudimos abrir el almacenamiento privado de audios. Inténtalo otra vez.', 503);
  }

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const skills = [
    { skill: 'Reading', score: objective.readingCorrect, max: objective.readingTotal, label: `${objective.readingCorrect}/${objective.readingTotal} bruto`, raw: 'Práctica fija; no es score ETS.' },
    { skill: 'Listening', score: objective.listeningCorrect, max: objective.listeningTotal, label: `${objective.listeningCorrect}/${objective.listeningTotal} bruto`, raw: 'Práctica fija; no es score ETS.' },
    { skill: 'Writing · Build a Sentence', score: objective.buildCorrect, max: objective.buildTotal, label: `${objective.buildCorrect}/${objective.buildTotal} bruto`, raw: 'Email y Discussion pendientes de evaluación.' },
  ];
  const audioMetadata = Object.fromEntries(payload.audio.map(audio => {
    const prompt = speaking.find(item => item.questionId === audio.questionId)!;
    return [audio.questionId, { ...audio, taskType: prompt.taskType, label: prompt.label }];
  }));
  const { error: insertError } = await admin.from('exam_submissions').insert({
    id: submissionId,
    user_id: user?.id ?? null,
    user_email: payload.email,
    user_name: payload.name,
    exam_slug: 'toefl',
    exam_name: 'TOEFL iBT',
    mock_id: mockId,
    mock_title: blueprint.mockTitle,
    content_version: blueprint.contentVersion,
    assignment_snapshot: { writing: { email: writingEmail, discussion: writingDiscussion }, speaking },
    objective_answers: payload.objectiveAnswers,
    total_score: null,
    total_max: null,
    total_label: `R ${objective.readingCorrect}/${objective.readingTotal} · L ${objective.listeningCorrect}/${objective.listeningTotal} · Build ${objective.buildCorrect}/${objective.buildTotal} · W/S pendientes`,
    skills,
    writing_task1_answer: payload.writingEmail,
    writing_task2_answer: payload.writingDiscussion,
    speaking_answers: {},
    speaking_audio_paths: audioPaths,
    speaking_audio_metadata: audioMetadata,
    submission_status: 'uploading',
  });
  if (insertError) {
    console.error('[toefl-submission] Could not create submission:', insertError.message, { mockId });
    return jsonError('No pudimos guardar los textos. Tus respuestas siguen en el navegador; inténtalo otra vez.', 500);
  }

  return Response.json({
    ok: true,
    submissionId,
    completionToken: createToeflSubmissionToken(submissionId),
    uploads: uploadResults.map(result => ({ questionId: result.questionId, path: result.path, token: result.data!.token })),
  });
}

async function completeSubmission(mockId: string, submissionId: unknown, completionToken: unknown): Promise<Response> {
  const blueprint = getToeflReviewBlueprint(mockId);
  if (!blueprint) return jsonError('El simulacro no es válido.', 404);
  if (typeof submissionId !== 'string' || !TOEFL_SUBMISSION_ID_PATTERN.test(submissionId) || !verifyToeflSubmissionToken(submissionId, completionToken)) {
    return jsonError('La confirmación de la entrega no es válida o venció.', 403);
  }
  const admin = createAdminClient();
  const { data: submission, error: readError } = await admin
    .from('exam_submissions')
    .select('id, speaking_audio_paths, speaking_audio_metadata, submission_status')
    .eq('id', submissionId)
    .eq('exam_slug', 'toefl')
    .eq('mock_id', mockId)
    .eq('mock_title', blueprint.mockTitle)
    .maybeSingle();
  if (readError || !submission) return jsonError('No encontramos la entrega para confirmarla.', 404);
  if (submission.submission_status === 'submitted') return Response.json({ ok: true, submissionId });

  const paths = (submission.speaking_audio_paths ?? {}) as Record<string, string>;
  const metadata = (submission.speaking_audio_metadata ?? {}) as Record<string, ToeflAudioDescriptor>;
  const { data: files, error: listError } = await admin.storage.from(TOEFL_SPEAKING_BUCKET).list(`${mockId}/${submissionId}`, { limit: 20 });
  if (listError) return jsonError('No pudimos verificar los audios. Revisa tu conexión e inténtalo otra vez.', 503);
  const uploadedByName = new Map((files ?? []).map(file => [file.name, file]));
  for (const [questionId, path] of Object.entries(paths)) {
    const file = uploadedByName.get(path.split('/').pop() ?? '');
    if (!file) return jsonError(`El audio ${questionId} todavía no terminó de subir.`, 409);
    const expectedSize = metadata[questionId]?.size;
    const actualSize = Number((file.metadata as { size?: unknown } | null)?.size);
    if (!Number.isFinite(actualSize) || actualSize < MIN_AUDIO_BYTES || actualSize !== expectedSize) {
      return jsonError(`El audio ${questionId} llegó incompleto o con un tamaño distinto.`, 409);
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

export async function handleToeflSubmissionRequest(request: Request, mockId: string): Promise<Response> {
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
