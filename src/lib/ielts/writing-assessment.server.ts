import 'server-only';

import { createAdminClient } from '@/lib/supabase/admin';
import type { FullAssessment } from '@/lib/labs/types';
import { recomputeIeltsSubmissionScore } from './recompute-score.server';
import {
  getIeltsReviewBlueprint,
  type IeltsSubmissionReceipt,
  type IeltsWritingTaskNumber,
  type IeltsWritingTaskBlueprint,
} from './review-blueprint';
import { IELTS_SUBMISSION_ID_PATTERN, verifyIeltsSubmissionToken } from './submission-token.server';

interface SubmissionAssessmentRow {
  id: string;
  writing_task1_answer: string | null;
  writing_task2_answer: string | null;
  writing_task1_assessment: FullAssessment | null;
  writing_task2_assessment: FullAssessment | null;
  listening_band: number | null;
  reading_band: number | null;
  writing_band: number | null;
  speaking_band: number | null;
}

export interface AuthorizedWritingAssessment {
  submission: SubmissionAssessmentRow;
  task: IeltsWritingTaskBlueprint;
  cachedAssessment: FullAssessment | null;
}

export type WritingAssessmentAuthorization =
  | { ok: true; context: AuthorizedWritingAssessment }
  | { ok: false; status: 400 | 403 | 404 | 409; message: string };

export async function authorizeIeltsWritingAssessment(input: {
  mockId: string;
  taskNumber: IeltsWritingTaskNumber;
  essay: string;
  receipt: IeltsSubmissionReceipt;
}): Promise<WritingAssessmentAuthorization> {
  const blueprint = getIeltsReviewBlueprint(input.mockId);
  if (!blueprint) return { ok: false, status: 400, message: 'Este simulacro todavía no usa el flujo de entrega verificable.' };

  const { submissionId, completionToken } = input.receipt;
  if (!IELTS_SUBMISSION_ID_PATTERN.test(submissionId) || !verifyIeltsSubmissionToken(submissionId, completionToken)) {
    return { ok: false, status: 403, message: 'La autorización para guardar esta evaluación no es válida o venció.' };
  }

  const admin = createAdminClient();
  const { data, error } = await admin
    .from('exam_submissions')
    .select('id, writing_task1_answer, writing_task2_answer, writing_task1_assessment, writing_task2_assessment, listening_band, reading_band, writing_band, speaking_band')
    .eq('id', submissionId)
    .eq('exam_slug', 'ielts')
    .eq('mock_title', blueprint.mockTitle)
    .eq('submission_status', 'submitted')
    .maybeSingle();

  if (error) {
    console.error('[ielts-writing] Could not authorize assessment:', error.message);
    return { ok: false, status: 409, message: 'No pudimos verificar la entrega antes de evaluarla.' };
  }
  if (!data) return { ok: false, status: 404, message: 'No encontramos la entrega confirmada.' };

  const submission = data as SubmissionAssessmentRow;
  const task = blueprint.writingTasks[input.taskNumber];
  if ((submission[task.answerColumn] ?? '').trim() !== input.essay.trim()) {
    return { ok: false, status: 403, message: 'El texto recibido no coincide con la entrega guardada.' };
  }

  return {
    ok: true,
    context: {
      submission,
      task,
      cachedAssessment: submission[task.assessmentColumn],
    },
  };
}

export async function persistIeltsWritingAssessment(
  context: AuthorizedWritingAssessment,
  assessment: FullAssessment,
): Promise<{ ok: true; writingBand: number | null } | { ok: false; message: string }> {
  return persistIeltsWritingAssessmentForSubmission({
    submissionId: context.submission.id,
    task: context.task,
    assessment,
  });
}

export async function persistIeltsWritingAssessmentForSubmission(input: {
  submissionId: string;
  task: IeltsWritingTaskBlueprint;
  assessment: FullAssessment;
}): Promise<{ ok: true; writingBand: number | null } | { ok: false; message: string }> {
  return persistIeltsWritingAssessmentInColumn({
    ...input,
    assessmentColumn: input.task.assessmentColumn,
  });
}

export async function persistIeltsDelegatedWritingAssessmentForSubmission(input: {
  submissionId: string;
  task: IeltsWritingTaskBlueprint;
  assessment: FullAssessment;
}): Promise<{ ok: true; writingBand: number | null } | { ok: false; message: string }> {
  return persistIeltsWritingAssessmentInColumn({
    ...input,
    assessmentColumn: input.task.assessmentColumn === 'writing_task1_assessment'
      ? 'writing_task1_delegated_assessment'
      : 'writing_task2_delegated_assessment',
    requireUnreviewed: true,
  });
}

async function persistIeltsWritingAssessmentInColumn(input: {
  submissionId: string;
  task: IeltsWritingTaskBlueprint;
  assessment: FullAssessment;
  assessmentColumn:
    | 'writing_task1_assessment'
    | 'writing_task2_assessment'
    | 'writing_task1_delegated_assessment'
    | 'writing_task2_delegated_assessment';
  requireUnreviewed?: boolean;
}): Promise<{ ok: true; writingBand: number | null } | { ok: false; message: string }> {
  const admin = createAdminClient();
  const taskUpdate = admin
    .from('exam_submissions')
    .update({ [input.assessmentColumn]: input.assessment })
    .eq('id', input.submissionId)
    .eq('exam_slug', 'ielts');
  const { data: updatedTask, error: taskUpdateError } = input.requireUnreviewed
    ? await taskUpdate.is('reviewed_at', null).select('id').maybeSingle()
    : await taskUpdate.select('id').maybeSingle();

  if (taskUpdateError || !updatedTask) {
    console.error('[ielts-writing] Could not persist task report:', taskUpdateError?.message ?? 'No matching submission');
    return { ok: false, message: input.requireUnreviewed
      ? 'La entrega ya tiene una evaluación final y no admite cambios delegados.'
      : 'La evaluación se generó, pero no pudimos guardarla en la entrega.' };
  }

  try {
    const consolidated = await recomputeIeltsSubmissionScore(input.submissionId);
    if (input.requireUnreviewed && consolidated.final) {
      return { ok: false, message: 'La entrega ya tiene una evaluación final y no admite cambios delegados.' };
    }
    return { ok: true, writingBand: consolidated.writingBand };
  } catch (error) {
    console.error('[ielts-writing] Could not recompute Writing band:', error);
    return { ok: false, message: 'Guardamos el reporte, pero no pudimos actualizar la banda de Writing.' };
  }
}
