import 'server-only';

import { createAdminClient } from '@/lib/supabase/admin';
import type { FullAssessment } from '@/lib/labs/types';
import {
  getToeflReviewBlueprint,
  type ToeflSubmissionReceipt,
  type ToeflWritingTaskBlueprint,
  type ToeflWritingTaskNumber,
} from './review-blueprint';
import { TOEFL_SUBMISSION_ID_PATTERN, verifyToeflSubmissionToken } from './submission-token.server';

interface SubmissionAssessmentRow {
  id: string;
  writing_task1_answer: string | null;
  writing_task2_answer: string | null;
  writing_task1_assessment: FullAssessment | null;
  writing_task2_assessment: FullAssessment | null;
}

export interface AuthorizedToeflWritingAssessment {
  submission: SubmissionAssessmentRow;
  task: ToeflWritingTaskBlueprint;
  cachedAssessment: FullAssessment | null;
}

export type ToeflWritingAssessmentAuthorization =
  | { ok: true; context: AuthorizedToeflWritingAssessment }
  | { ok: false; status: 400 | 403 | 404 | 409; message: string };

export async function authorizeToeflWritingAssessment(input: {
  mockId: string;
  taskNumber: ToeflWritingTaskNumber;
  essay: string;
  receipt: ToeflSubmissionReceipt;
}): Promise<ToeflWritingAssessmentAuthorization> {
  const blueprint = getToeflReviewBlueprint(input.mockId);
  if (!blueprint) return { ok: false, status: 400, message: 'Este simulacro no usa el flujo verificable TOEFL 2026.' };
  const { submissionId, completionToken } = input.receipt;
  if (!TOEFL_SUBMISSION_ID_PATTERN.test(submissionId) || !verifyToeflSubmissionToken(submissionId, completionToken)) {
    return { ok: false, status: 403, message: 'La autorización para guardar esta evaluación no es válida o venció.' };
  }
  const { data, error } = await createAdminClient()
    .from('exam_submissions')
    .select('id, writing_task1_answer, writing_task2_answer, writing_task1_assessment, writing_task2_assessment')
    .eq('id', submissionId)
    .eq('exam_slug', 'toefl')
    .eq('mock_id', input.mockId)
    .eq('mock_title', blueprint.mockTitle)
    .eq('submission_status', 'submitted')
    .maybeSingle();
  if (error) {
    console.error('[toefl-writing] Could not authorize assessment:', error.message);
    return { ok: false, status: 409, message: 'No pudimos verificar la entrega antes de evaluarla.' };
  }
  if (!data) return { ok: false, status: 404, message: 'No encontramos la entrega confirmada.' };
  const submission = data as SubmissionAssessmentRow;
  const task = blueprint.writingTasks[input.taskNumber];
  if ((submission[task.answerColumn] ?? '').trim() !== input.essay.trim()) {
    return { ok: false, status: 403, message: 'El texto recibido no coincide con la entrega guardada.' };
  }
  return { ok: true, context: { submission, task, cachedAssessment: submission[task.assessmentColumn] } };
}

export async function persistToeflWritingAssessment(
  context: AuthorizedToeflWritingAssessment,
  assessment: FullAssessment,
): Promise<{ ok: true } | { ok: false; message: string }> {
  const { data, error } = await createAdminClient()
    .from('exam_submissions')
    .update({ [context.task.assessmentColumn]: assessment })
    .eq('id', context.submission.id)
    .eq('exam_slug', 'toefl')
    .eq('submission_status', 'submitted')
    .select('id')
    .maybeSingle();
  if (error || !data) {
    console.error('[toefl-writing] Could not persist task report:', error?.message ?? 'No matching submission');
    return { ok: false, message: 'La evaluación se generó, pero no pudimos guardarla en la entrega.' };
  }
  return { ok: true };
}
