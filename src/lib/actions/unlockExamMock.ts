'use server';

import { headers } from 'next/headers';
import { getMock, getGoetheA2PracticeMock, getGoetheB1PracticeMock } from '@/data/mocks';
import type { MockExam } from '@/data/mocks/types';
import { consumeExamReviewRateLimit } from '@/lib/exam-review/rate-limit.server';
import { parseGoetheA2PracticeTeil, parseGoetheB1PracticeTeil } from '@/lib/goethe/practice';
import { verifyExamLeadReceipt } from '@/lib/exams/lead-receipt.server';
import type { MCQQuestion } from '@/data/mocks/types';
import { currentExamScoreAccess } from '@/lib/exams/score-access.server';
import { examCan } from '@/lib/xpress-commerce/access';

export async function unlockExamMock(input: {
  examSlug: string;
  mockId: string;
  receipt: string;
  focusedPractice?: { level: 'A2' | 'B1'; skill: 'reading' | 'writing' | 'speaking'; part?: number };
}): Promise<MockExam> {
  if (!verifyExamLeadReceipt(input.receipt, input.examSlug, input.mockId)) {
    throw new Error('No pudimos validar el registro. Intenta de nuevo.');
  }
  const access = await currentExamScoreAccess(input.examSlug);
  if (!access || !examCan(access.level, 'view-detailed-results')) {
    throw new Error('Tu plan actual incluye el puntaje total, pero no la revisión pregunta por pregunta.');
  }

  let mock: MockExam | null = getMock(input.examSlug, input.mockId);
  const focused = input.focusedPractice;
  if (focused) {
    if (input.examSlug !== 'goethe') throw new Error('Práctica no disponible.');
    const part = focused.level === 'A2'
      ? parseGoetheA2PracticeTeil(focused.skill, focused.part === undefined ? undefined : String(focused.part))
      : parseGoetheB1PracticeTeil(focused.skill, focused.part === undefined ? undefined : String(focused.part));
    mock = focused.level === 'A2'
      ? getGoetheA2PracticeMock(input.mockId, focused.skill, part)
      : getGoetheB1PracticeMock(input.mockId, focused.skill, part);
  }
  if (!mock || mock.examSlug !== input.examSlug) throw new Error('Examen no disponible.');
  return mock;
}

/** Only the SAT branch is returned; the answer key and raw score stay server-side. */
export async function routeSatModule(mockId: string, answers: Record<string, number>): Promise<'low' | 'high'> {
  const mock = getMock('sat', mockId);
  const routing = mock?.adaptive;
  if (!mock || !routing || !answers || typeof answers !== 'object' || Array.isArray(answers)) throw new Error('Intento inválido.');
  const first = mock.sections.flatMap(section => section.questions)
    .filter((question): question is MCQQuestion => question.part === routing.routeAfterPart && question.type === 'mcq');
  if (first.length < 1 || Object.keys(answers).length > first.length
    || Object.entries(answers).some(([id, value]) => !first.some(question => question.id === id && value >= 0 && value < question.options.length && Number.isInteger(value)))) {
    throw new Error('Respuestas inválidas.');
  }
  const requestHeaders = await headers();
  const forwarded = requestHeaders.get('x-forwarded-for')?.split(',')[0]?.trim();
  const identifier = forwarded && /^[0-9a-fA-F:.]{3,64}$/.test(forwarded) ? forwarded : 'unknown';
  if (!await consumeExamReviewRateLimit({ namespace: 'sat-adaptive-branch-ip', identifier, limit: 12, windowSeconds: 3600 })) {
    throw new Error('Demasiados intentos seguidos. Espera unos minutos.');
  }
  const correct = first.filter(question => answers[question.id] === question.answer).length;
  return correct >= routing.correctToRouteHigh ? 'high' : 'low';
}
