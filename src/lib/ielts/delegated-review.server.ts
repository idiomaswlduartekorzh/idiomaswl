import 'server-only';

import { createHash } from 'node:crypto';
import { createAdminClient } from '@/lib/supabase/admin';
import { IELTS_SPEAKING_BUCKET } from './mock4-submission';
import { buildIeltsScoreSummary } from './scoring';
import {
  buildIeltsDelegatedAgentWorkflow,
  buildDelegatedReviewMetadata,
  findMissingIeltsSpeakingAudioIds,
  IELTS_OFFICIAL_RUBRICS,
  type IeltsDelegatedReviewCase,
  type IeltsDelegatedReviewInput,
  type IeltsDelegatedReviewTask,
  type IeltsDelegatedSpeakingPrompt,
  type IeltsDelegatedWritingAssessment,
  type IeltsSpeakingAssessment,
  isIeltsDelegatedReviewTask,
  taskLabel,
  validateIeltsDelegatedReviewInput,
} from './delegated-review';
import { getIeltsReviewBlueprint } from './review-blueprint';
import { persistIeltsDelegatedWritingAssessmentForSubmission } from './writing-assessment.server';
import { getIeltsSpeakingAssignment, getIeltsWritingAssignment } from '@/lib/labs/exam-bridge/ielts';

const REVIEW_TOKEN_PATTERN = /^[A-Za-z0-9_-]{43}$/;

interface DelegatedInviteRow {
  id: string;
  submission_id: string;
  mock_id: string;
  task_type: string;
  call_code: string;
  rubric_version: string;
  expires_at: string;
  revoked_at: string | null;
  used_at: string | null;
}

interface DelegatedSubmissionRow {
  id: string;
  mock_title: string | null;
  writing_task1_answer: string | null;
  writing_task2_answer: string | null;
  speaking_answers: Record<string, string> | null;
  speaking_audio_paths: Record<string, string> | null;
  listening_band: number | null;
  reading_band: number | null;
  writing_band: number | null;
  speaking_band: number | null;
  reviewed_at: string | null;
}

interface AuthorizedDelegatedReview {
  invite: DelegatedInviteRow;
  task: IeltsDelegatedReviewTask;
  submission: DelegatedSubmissionRow;
}

export type IeltsDelegatedReviewLookup =
  | { ok: true; reviewCase: IeltsDelegatedReviewCase }
  | { ok: false; status: 400 | 403 | 404 | 409 | 410; message: string };

export type IeltsDelegatedReviewSubmission =
  | { ok: true; taskBand: number; listeningBand: number | null; readingBand: number | null; writingBand: number | null; speakingBand: number | null; overallBand: number | null }
  | { ok: false; status: 400 | 403 | 404 | 409 | 410 | 500; message: string };

function hashIeltsDelegatedReviewToken(token: string): string {
  return createHash('sha256').update(token).digest('hex');
}

async function authorizeDelegatedReview(token: string): Promise<
  | { ok: true; context: AuthorizedDelegatedReview }
  | { ok: false; status: 400 | 403 | 404 | 409 | 410; message: string }
> {
  if (!REVIEW_TOKEN_PATTERN.test(token)) {
    return { ok: false, status: 400, message: 'El enlace de evaluación no tiene un formato válido.' };
  }

  const admin = createAdminClient();
  const { data: inviteData, error: inviteError } = await admin
    .from('ielts_delegated_review_invites')
    .select('id, submission_id, mock_id, task_type, call_code, rubric_version, expires_at, revoked_at, used_at')
    .eq('token_hash', hashIeltsDelegatedReviewToken(token))
    .maybeSingle();

  if (inviteError) {
    console.error('[ielts-delegated-review] Could not read invitation:', inviteError.message);
    return { ok: false, status: 409, message: 'No pudimos verificar la invitación en este momento.' };
  }
  if (!inviteData) return { ok: false, status: 404, message: 'La invitación no existe.' };

  const invite = inviteData as DelegatedInviteRow;
  if (invite.revoked_at) return { ok: false, status: 403, message: 'Esta invitación fue revocada.' };
  if (invite.used_at) return { ok: false, status: 410, message: 'Esta evaluación ya fue entregada.' };
  if (Date.parse(invite.expires_at) <= Date.now()) {
    return { ok: false, status: 410, message: 'Esta invitación venció. Solicita un llamado nuevo al administrador.' };
  }
  if (!isIeltsDelegatedReviewTask(invite.task_type)) {
    return { ok: false, status: 409, message: 'La invitación tiene una tarea desconocida.' };
  }
  if (invite.rubric_version !== IELTS_OFFICIAL_RUBRICS[invite.task_type].version) {
    return { ok: false, status: 409, message: 'La rúbrica cambió desde que se creó el llamado. Solicita una invitación nueva.' };
  }

  const blueprint = getIeltsReviewBlueprint(invite.mock_id);
  if (!blueprint) return { ok: false, status: 409, message: 'Este simulacro no está conectado al flujo de revisión.' };

  const { data: submissionData, error: submissionError } = await admin
    .from('exam_submissions')
    .select('id, mock_title, writing_task1_answer, writing_task2_answer, speaking_answers, speaking_audio_paths, listening_band, reading_band, writing_band, speaking_band, reviewed_at')
    .eq('id', invite.submission_id)
    .eq('exam_slug', 'ielts')
    .eq('mock_title', blueprint.mockTitle)
    .eq('submission_status', 'submitted')
    .maybeSingle();

  if (submissionError) {
    console.error('[ielts-delegated-review] Could not read submission:', submissionError.message);
    return { ok: false, status: 409, message: 'No pudimos abrir la entrega vinculada.' };
  }
  if (!submissionData) return { ok: false, status: 404, message: 'La entrega vinculada ya no está disponible.' };
  if (submissionData.reviewed_at) {
    return { ok: false, status: 409, message: 'La entrega ya tiene una evaluación final del administrador.' };
  }

  return {
    ok: true,
    context: {
      invite,
      task: invite.task_type,
      submission: submissionData as DelegatedSubmissionRow,
    },
  };
}

function responseContract(task: IeltsDelegatedReviewTask): IeltsDelegatedReviewCase['responseContract'] {
  return {
    evaluatorName: 'Nombre del agente o evaluador',
    evaluatorModel: 'Modelo y versión, por ejemplo Claude Sonnet 4.5',
    overallBand: 'Número de 0 a 9 en pasos de 0.5',
    criteria: IELTS_OFFICIAL_RUBRICS[task].criteria.map(criterion => ({
      criterion: criterion.key,
      band: 'Número de 0 a 9 en pasos de 0.5',
      reason: `Justificación verificable para ${criterion.label}`,
    })),
    summary: 'Resumen sustentado en la respuesta de la estudiante',
    strengths: 'Lista JSON de 1 a 8 fortalezas concretas',
    priorities: 'Lista JSON de 1 a 8 mejoras prioritarias',
  };
}

async function buildReviewCase(
  token: string,
  context: AuthorizedDelegatedReview,
): Promise<IeltsDelegatedReviewLookup> {
  const blueprint = getIeltsReviewBlueprint(context.invite.mock_id)!;
  const rubric = IELTS_OFFICIAL_RUBRICS[context.task];
  const submissionEndpoint = `/api/ielts/delegated-reviews/${token}`;

  if (context.task === 'writing_task_1' || context.task === 'writing_task_2') {
    const taskNumber = context.task === 'writing_task_1' ? 1 : 2;
    const answer = taskNumber === 1
      ? context.submission.writing_task1_answer
      : context.submission.writing_task2_answer;
    const assignment = await getIeltsWritingAssignment(context.invite.mock_id, taskNumber);

    if (!assignment || !answer?.trim()) {
      return { ok: false, status: 409, message: 'La tarea asignada no contiene una respuesta evaluable.' };
    }

    return {
      ok: true,
      reviewCase: {
        callCode: context.invite.call_code,
        submissionId: context.submission.id,
        mockId: context.invite.mock_id,
        mockTitle: blueprint.mockTitle,
        taskType: context.task,
        taskLabel: taskLabel(context.task),
        expiresAt: context.invite.expires_at,
        rubric,
        assignment: {
          kind: 'writing',
          prompt: assignment.promptText,
          answer,
          wordCount: answer.trim().split(/\s+/).length,
          minWords: assignment.minWords,
          imageUrl: assignment.imageUrl,
        },
        agentWorkflow: buildIeltsDelegatedAgentWorkflow(context.task),
        submissionEndpoint,
        responseContract: responseContract(context.task),
      },
    };
  }

  const speakingAssignment = await getIeltsSpeakingAssignment(context.invite.mock_id);
  if (!speakingAssignment) {
    return { ok: false, status: 409, message: 'El simulacro no tiene tareas de Speaking evaluables.' };
  }

  const audioPaths = context.submission.speaking_audio_paths ?? {};
  const notes = context.submission.speaking_answers ?? {};
  const missingAudioIds = findMissingIeltsSpeakingAudioIds(speakingAssignment, audioPaths);
  if (missingAudioIds.length > 0) {
    return {
      ok: false,
      status: 409,
      message: `Faltan ${missingAudioIds.length} grabaciones requeridas de Speaking (${missingAudioIds.join(', ')}). No se puede emitir una banda completa sin escucharlas.`,
    };
  }

  const admin = createAdminClient();
  const prompts: IeltsDelegatedSpeakingPrompt[] = await Promise.all(speakingAssignment.map(async prompt => {
    const audioPath = audioPaths[prompt.questionId];
    let audioUrl: string | undefined;
    if (audioPath) {
      const { data } = await admin.storage.from(IELTS_SPEAKING_BUCKET).createSignedUrl(audioPath, 60 * 60);
      audioUrl = data?.signedUrl;
    }
    return {
      ...prompt,
      notes: typeof notes[prompt.questionId] === 'string' ? notes[prompt.questionId] : undefined,
      audioUrl,
    };
  }));

  if (prompts.some(prompt => !prompt.audioUrl)) {
    return { ok: false, status: 409, message: 'No pudimos preparar todas las grabaciones privadas. Solicita un llamado nuevo.' };
  }

  return {
    ok: true,
    reviewCase: {
      callCode: context.invite.call_code,
      submissionId: context.submission.id,
      mockId: context.invite.mock_id,
      mockTitle: blueprint.mockTitle,
      taskType: context.task,
      taskLabel: taskLabel(context.task),
      expiresAt: context.invite.expires_at,
      rubric,
      assignment: {
        kind: 'speaking',
        prompts,
        recordingCoverage: {
          available: prompts.length,
          expected: speakingAssignment.length,
          complete: true,
        },
      },
      agentWorkflow: buildIeltsDelegatedAgentWorkflow(context.task),
      submissionEndpoint,
      responseContract: responseContract(context.task),
    },
  };
}

export async function readIeltsDelegatedReviewCase(token: string): Promise<IeltsDelegatedReviewLookup> {
  const authorization = await authorizeDelegatedReview(token);
  if (!authorization.ok) return authorization;
  return buildReviewCase(token, authorization.context);
}

function buildWritingAssessment(input: {
  assessment: IeltsDelegatedReviewInput;
  callCode: string;
  task: IeltsDelegatedReviewTask;
  wordCount: number;
  submittedAt: string;
}): IeltsDelegatedWritingAssessment {
  return {
    overallBand: input.assessment.overallBand,
    criteria: input.assessment.criteria,
    topIssues: [],
    wordCount: input.wordCount,
    hiddenIssueCount: 0,
    allIssues: [],
    rewritten: '',
    delegatedReview: buildDelegatedReviewMetadata({
      callCode: input.callCode,
      rubric: IELTS_OFFICIAL_RUBRICS[input.task],
      assessment: input.assessment,
      submittedAt: input.submittedAt,
    }),
  };
}

async function releaseClaim(inviteId: string, usedAt: string): Promise<void> {
  const admin = createAdminClient();
  const { error } = await admin
    .from('ielts_delegated_review_invites')
    .update({
      used_at: null,
      evaluator_name: null,
      evaluator_model: null,
      assessment: null,
    })
    .eq('id', inviteId)
    .eq('used_at', usedAt);
  if (error) console.error('[ielts-delegated-review] Could not release failed claim:', error.message);
}

export async function submitIeltsDelegatedReview(
  token: string,
  value: unknown,
): Promise<IeltsDelegatedReviewSubmission> {
  const authorization = await authorizeDelegatedReview(token);
  if (!authorization.ok) return authorization;

  const { context } = authorization;
  const validation = validateIeltsDelegatedReviewInput(context.task, value);
  if (!validation.ok) return { ok: false, status: 400, message: validation.message };

  const reviewCase = await buildReviewCase(token, context);
  if (!reviewCase.ok) return reviewCase;

  const submittedAt = new Date().toISOString();
  const assignment = reviewCase.reviewCase.assignment;
  const storedAssessment = assignment.kind === 'writing'
    ? buildWritingAssessment({
      assessment: validation.assessment,
      callCode: context.invite.call_code,
      task: context.task,
      wordCount: assignment.wordCount,
      submittedAt,
    })
    : {
      overallBand: validation.assessment.overallBand,
      criteria: validation.assessment.criteria,
      delegatedReview: buildDelegatedReviewMetadata({
        callCode: context.invite.call_code,
        rubric: IELTS_OFFICIAL_RUBRICS[context.task],
        assessment: validation.assessment,
        submittedAt,
      }),
    } satisfies IeltsSpeakingAssessment;

  const admin = createAdminClient();
  const { data: claimed, error: claimError } = await admin
    .from('ielts_delegated_review_invites')
    .update({
      used_at: submittedAt,
      evaluator_name: validation.assessment.evaluatorName,
      evaluator_model: validation.assessment.evaluatorModel,
      assessment: storedAssessment,
    })
    .eq('id', context.invite.id)
    .is('used_at', null)
    .is('revoked_at', null)
    .gt('expires_at', submittedAt)
    .select('id')
    .maybeSingle();

  if (claimError) {
    console.error('[ielts-delegated-review] Could not claim invitation:', claimError.message);
    return { ok: false, status: 409, message: 'No pudimos reservar esta invitación para guardar la evaluación.' };
  }
  if (!claimed) return { ok: false, status: 410, message: 'La invitación venció, fue revocada o ya se utilizó.' };

  let persistenceError: string | null = null;
  if (assignment.kind === 'writing') {
    const taskNumber = context.task === 'writing_task_1' ? 1 : 2;
    const blueprint = getIeltsReviewBlueprint(context.invite.mock_id)!;
    const result = await persistIeltsDelegatedWritingAssessmentForSubmission({
      submissionId: context.submission.id,
      task: blueprint.writingTasks[taskNumber],
      assessment: storedAssessment as IeltsDelegatedWritingAssessment,
    });
    if (!result.ok) persistenceError = result.message;
  } else {
    const scoreSummary = buildIeltsScoreSummary({
      listening: context.submission.listening_band,
      reading: context.submission.reading_band,
      writing: context.submission.writing_band,
      speaking: validation.assessment.overallBand,
    });
    const { data: updatedSpeaking, error } = await admin
      .from('exam_submissions')
      .update({
        speaking_assessment: storedAssessment,
        speaking_band: validation.assessment.overallBand,
        skills: scoreSummary.skills,
        total_score: scoreSummary.totalScore,
        total_max: 9,
        total_label: scoreSummary.totalLabel,
      })
      .eq('id', context.submission.id)
      .eq('exam_slug', 'ielts')
      .eq('submission_status', 'submitted')
      .is('reviewed_at', null)
      .select('id')
      .maybeSingle();
    if (error || !updatedSpeaking) {
      console.error('[ielts-delegated-review] Could not persist Speaking report:', error?.message ?? 'Submission was finalized concurrently');
      persistenceError = 'No pudimos añadir el reporte de Speaking: la entrega pudo haber sido finalizada por el administrador.';
    }
  }

  if (persistenceError) {
    await releaseClaim(context.invite.id, submittedAt);
    return { ok: false, status: 500, message: `${persistenceError} La invitación sigue disponible para reintentar.` };
  }

  const { data: consolidated } = await admin
    .from('exam_submissions')
    .select('writing_band, speaking_band, total_score')
    .eq('id', context.submission.id)
    .maybeSingle();

  return {
    ok: true,
    taskBand: validation.assessment.overallBand,
    listeningBand: context.submission.listening_band == null ? null : Number(context.submission.listening_band),
    readingBand: context.submission.reading_band == null ? null : Number(context.submission.reading_band),
    writingBand: consolidated?.writing_band == null ? null : Number(consolidated.writing_band),
    speakingBand: consolidated?.speaking_band == null ? null : Number(consolidated.speaking_band),
    overallBand: consolidated?.total_score == null ? null : Number(consolidated.total_score),
  };
}
