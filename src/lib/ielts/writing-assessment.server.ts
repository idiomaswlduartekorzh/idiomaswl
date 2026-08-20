import 'server-only';

import { createAdminClient } from '@/lib/supabase/admin';
import type { FullAssessment } from '@/lib/labs/types';
import { buildIeltsScoreSummary, calculateIeltsWritingBand } from './scoring';
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
  const admin = createAdminClient();
  const { error: taskUpdateError } = await admin
    .from('exam_submissions')
    .update({ [context.task.assessmentColumn]: assessment })
    .eq('id', context.submission.id)
    .eq('exam_slug', 'ielts');

  if (taskUpdateError) {
    console.error('[ielts-writing] Could not persist task report:', taskUpdateError.message);
    return { ok: false, message: 'La evaluación se generó, pero no pudimos guardarla en la entrega.' };
  }

  // Re-read after the independent task update. When Task 1 and Task 2 run in
  // parallel, the last request to finish sees both committed reports and writes
  // the weighted Writing band without overwriting the other task's JSON.
  const { data, error: readError } = await admin
    .from('exam_submissions')
    .select('writing_task1_assessment, writing_task2_assessment, listening_band, reading_band, speaking_band')
    .eq('id', context.submission.id)
    .eq('exam_slug', 'ielts')
    .maybeSingle();

  if (readError || !data) {
    console.error('[ielts-writing] Could not recompute score summary:', readError?.message);
    return { ok: false, message: 'Guardamos el reporte, pero no pudimos actualizar la banda de Writing.' };
  }

  const task1 = data.writing_task1_assessment as FullAssessment | null;
  const task2 = data.writing_task2_assessment as FullAssessment | null;
  const writingBand = task1 && task2
    ? calculateIeltsWritingBand(task1.overallBand, task2.overallBand)
    : null;

  if (writingBand == null) return { ok: true, writingBand: null };

  const summary = buildIeltsScoreSummary({
    listening: data.listening_band,
    reading: data.reading_band,
    writing: writingBand,
    speaking: data.speaking_band,
  });
  const { error: scoreUpdateError } = await admin
    .from('exam_submissions')
    .update({
      writing_band: writingBand,
      skills: summary.skills,
      total_score: summary.totalScore,
      total_max: 9,
      total_label: summary.totalLabel,
    })
    .eq('id', context.submission.id)
    .eq('exam_slug', 'ielts');

  if (scoreUpdateError) {
    console.error('[ielts-writing] Could not persist Writing band:', scoreUpdateError.message);
    return { ok: false, message: 'Guardamos el reporte, pero no pudimos actualizar la banda de Writing.' };
  }

  return { ok: true, writingBand };
}
