import 'server-only';

import { createHash } from 'node:crypto';
import { createAdminClient } from '@/lib/supabase/admin';
import { createClient } from '@/lib/supabase/server';
import type { MCQQuestion } from '@/data/mocks/types';
import type { IcfesAnswerMap, IcfesBasicResultDto, IcfesPremiumQuestionDto } from './attempt-contract';
import { getIcfesPremiumAvailability, getIcfesSecureExam } from './exam-registry.server';
import { isIcfesPersistenceEnabled } from './product-config.server';
import { buildIcfesQuestionSnapshot, hashIcfesQuestionSnapshot, isSameIcfesAttemptEvidence } from './attempt-evidence';

const SKILLS: Record<number, string> = {
  1: 'Uso comunicativo', 2: 'Vocabulario', 3: 'Conversaciones', 4: 'Gramática en contexto',
  5: 'Comprensión literal', 6: 'Inferencia y propósito', 7: 'Lectura crítica',
};

function rate(correct: number, total: number) {
  return total ? Math.round(correct / total * 100) : 0;
}

export function gradeIcfesAttempt(examId: string, attemptId: string, answers: IcfesAnswerMap): IcfesBasicResultDto | null {
  const found = getIcfesSecureExam(examId);
  if (!found) return null;
  const byPart = found.exam.sections.map((section) => {
    const questions = section.questions.filter((item) => item.type === 'mcq' || item.type === 'dialog') as MCQQuestion[];
    const correct = questions.filter((question) => answers[question.id] === question.answer).length;
    return { key: String(section.part), label: `Parte ${section.part}`, correct, total: questions.length, percentage: rate(correct, questions.length) };
  });
  const total = byPart.reduce((sum, row) => sum + row.total, 0);
  const correct = byPart.reduce((sum, row) => sum + row.correct, 0);
  const weakest = [...byPart].filter((row) => row.total > 0).sort((a, b) => a.percentage - b.percentage)[0] ?? byPart[0];
  const premium = getIcfesPremiumAvailability(examId);
  return {
    attemptId, examId, correct, total, percentage: rate(correct, total), byPart,
    bySkill: byPart.map((row) => ({ ...row, label: SKILLS[Number(row.key)] ?? row.label })),
    recommendation: {
      label: weakest ? `Reforzar ${SKILLS[Number(weakest.key)] ?? weakest.label}` : 'Seguir practicando',
      href: weakest ? `/practica/icfes-saber-11/parte-${weakest.key}` : '/practica/icfes-saber-11',
    },
    officialResource: found.officialResource,
    premiumEligible: premium.eligible,
    ...(premium.reason ? { premiumUnavailableReason: premium.reason } : {}),
  };
}

export async function persistIcfesAttempt(input: {
  attemptId: string; examId: string; token: string; answers: IcfesAnswerMap; result: IcfesBasicResultDto;
}): Promise<boolean> {
  if (!isIcfesPersistenceEnabled()) return false;
  const { data: { user } } = await (await createClient()).auth.getUser();
  const found = getIcfesSecureExam(input.examId);
  if (!found) throw new Error('No pudimos fijar la evidencia del intento.');
  const questionSnapshot = buildIcfesQuestionSnapshot(found.exam);
  const evidence = {
    exam_id: input.examId,
    access_token_hash: createHash('sha256').update(input.token, 'utf8').digest('hex'),
    answers: input.answers,
    basic_result: input.result,
    question_snapshot_version: questionSnapshot.version,
    question_snapshot_hash: hashIcfesQuestionSnapshot(questionSnapshot),
    question_snapshot: questionSnapshot,
  };
  const admin = createAdminClient();
  const { error } = await admin.from('icfes_attempts').insert({
    id: input.attemptId,
    user_id: user?.id ?? null,
    ...evidence,
    completed_at: new Date().toISOString(),
  });
  if (error) {
    const { data: existing } = await admin.from('icfes_attempts')
      .select('exam_id,access_token_hash,answers,basic_result,question_snapshot_version,question_snapshot_hash,question_snapshot')
      .eq('id', input.attemptId).maybeSingle();
    if (!existing || !isSameIcfesAttemptEvidence(existing as typeof evidence, evidence)) {
      throw new Error('No pudimos guardar el intento seguro: evidencia incompatible.');
    }
  }
  return true;
}

export function buildPremiumQuestions(examId: string, answers: IcfesAnswerMap): IcfesPremiumQuestionDto[] | null {
  const found = getIcfesSecureExam(examId);
  if (!found || found.officialResource) return null;
  let number = 0;
  return found.exam.sections.flatMap((section) => section.questions
    .filter((item) => item.type === 'mcq' || item.type === 'dialog')
    .map((item) => {
      const question = item as MCQQuestion;
      number += 1;
      const selected = answers[question.id];
      const insight = section.insights?.[question.id];
      const letter = String.fromCharCode(65 + question.answer);
      return {
        id: question.id, number, part: section.part, prompt: question.text,
        selectedOption: selected === undefined ? null : question.options[selected] ?? null,
        correctOption: question.options[question.answer] ?? letter,
        correct: selected === question.answer,
        rationale: insight?.rationales?.[letter] ?? 'La opción indicada completa o responde mejor según el texto y el uso evaluado.',
      };
    }));
}
