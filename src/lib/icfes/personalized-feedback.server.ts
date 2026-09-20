import 'server-only';

import { createHash } from 'node:crypto';
import type {
  IcfesBasicResultDto,
  IcfesPersonalizedFeedbackDto,
  IcfesPremiumQuestionDto,
} from './attempt-contract';
import {
  icfesOfferIncludes,
  ICFES_PERSONALIZED_FEEDBACK_BENEFIT,
  type IcfesCommercialOfferId,
} from './commercial-contract';

export const ICFES_PERSONALIZED_FEEDBACK_VERSION = 'icfes-personalized-feedback-v1' as const;

function sha256(value: string): string {
  return createHash('sha256').update(value, 'utf8').digest('hex');
}

function stableEvidence(result: IcfesBasicResultDto, questions: readonly IcfesPremiumQuestionDto[]) {
  return {
    attemptId: result.attemptId,
    examId: result.examId,
    correct: result.correct,
    total: result.total,
    percentage: result.percentage,
    bySkill: [...result.bySkill].map(({ key, label, correct, total, percentage }) => ({
      key, label, correct, total, percentage,
    })).sort((left, right) => left.key.localeCompare(right.key)),
    missedQuestionIds: questions.filter((question) => !question.correct).map((question) => question.id).sort(),
  };
}

export function buildIcfesPersonalizedFeedback(input: {
  offerId: IcfesCommercialOfferId;
  result: IcfesBasicResultDto;
  questions: readonly IcfesPremiumQuestionDto[];
}): IcfesPersonalizedFeedbackDto | null {
  if (!icfesOfferIncludes(input.offerId, 'personalized-feedback')) return null;

  const evidence = stableEvidence(input.result, input.questions);
  const inputDigest = sha256(JSON.stringify(evidence));
  const feedbackId = sha256(`${ICFES_PERSONALIZED_FEEDBACK_VERSION}:${inputDigest}`);
  const ranked = [...input.result.bySkill]
    .filter((row) => row.total > 0)
    .sort((left, right) => left.percentage - right.percentage || left.key.localeCompare(right.key));
  const weakest = ranked[0] ?? null;
  const strongest = ranked.at(-1) ?? null;
  const missed = input.questions.filter((question) => !question.correct);
  const priorityQuestionIds = missed.slice(0, 3).map((question) => question.id);

  const strength = strongest ? {
    label: strongest.label,
    evidence: `${strongest.correct}/${strongest.total} respuestas correctas (${strongest.percentage}%).`,
    action: 'Mantén esta área con un bloque breve y exige evidencia textual para cada respuesta.',
  } : null;
  const priority = weakest ? {
    label: weakest.label,
    evidence: `${weakest.correct}/${weakest.total} respuestas correctas (${weakest.percentage}%).`,
    action: priorityQuestionIds.length
      ? `Revisa primero ${priorityQuestionIds.join(', ')} y escribe qué evidencia descarta cada distractor.`
      : 'Resuelve un bloque nuevo y registra la evidencia usada para cada elección.',
  } : null;
  const targetCorrect = Math.min(input.result.total, input.result.correct + Math.max(1, Math.ceil(missed.length * 0.25)));

  return Object.freeze({
    version: ICFES_PERSONALIZED_FEEDBACK_VERSION,
    feedbackId,
    headline: ICFES_PERSONALIZED_FEEDBACK_BENEFIT,
    executiveReading: `Este intento terminó con ${input.result.correct}/${input.result.total} respuestas correctas (${input.result.percentage}%). ${priority ? `La prioridad observada es ${priority.label}.` : 'No hay suficiente evidencia por competencia para fijar una prioridad.'}`,
    strength,
    priority,
    nextMockGoal: `Alcanzar al menos ${targetCorrect}/${input.result.total} respuestas correctas y justificar cada cambio con evidencia del texto o del contexto.`,
    sevenDayPlan: Object.freeze([
      { day: 1, focus: priority?.label ?? 'Diagnóstico', task: 'Revisar las respuestas falladas y clasificar el tipo de error.' },
      { day: 2, focus: priority?.label ?? 'Evidencia', task: 'Resolver diez ítems y anotar por qué se descartan las otras opciones.' },
      { day: 3, focus: strongest?.label ?? 'Mantenimiento', task: 'Completar un bloque corto sin consultar apuntes.' },
      { day: 4, focus: priority?.label ?? 'Transferencia', task: 'Repetir los ítems fallados con una explicación escrita de una frase.' },
      { day: 5, focus: 'Tiempo', task: 'Resolver un bloque cronometrado y marcar las dudas sin detener el avance.' },
      { day: 6, focus: 'Corrección', task: 'Comparar respuestas con las explicaciones disponibles y registrar un patrón.' },
      { day: 7, focus: 'Verificación', task: 'Completar el siguiente simulacro y contrastar el resultado con la meta.' },
    ]),
    traceability: Object.freeze({
      attemptId: input.result.attemptId,
      examId: input.result.examId,
      inputDigest,
      resultVersion: ICFES_PERSONALIZED_FEEDBACK_VERSION,
      evidenceKeys: Object.freeze([
        ...ranked.map((row) => `skill:${row.key}`),
        ...missed.map((question) => `question:${question.id}`),
      ]),
    }),
  });
}
