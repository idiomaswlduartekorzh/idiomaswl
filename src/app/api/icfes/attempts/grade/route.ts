import { NextResponse } from 'next/server';
import { getIcfesSecureExam } from '@/lib/icfes/exam-registry.server';
import { gradeIcfesAttempt, persistIcfesAttempt } from '@/lib/icfes/grading.server';
import {
  disableIcfesPremiumAfterPersistenceFailure,
  toIcfesPublicResult,
  validateIcfesAnswers,
} from '@/lib/icfes/attempt-contract';
import {
  ICFES_RESULT_ACCESS_DAYS,
  createIcfesResultAccessToken,
  icfesAttemptCookieName,
  verifyIcfesAttemptToken,
} from '@/lib/icfes/attempt-token.server';
import type { MCQQuestion } from '@/data/mocks/types';

export const runtime = 'nodejs';

function json(body: unknown, status = 200) {
  const response = NextResponse.json(body, { status });
  response.headers.set('cache-control', 'private, no-store, max-age=0');
  return response;
}

export async function POST(request: Request): Promise<Response> {
  let body: Record<string, unknown>;
  try { body = await request.json() as Record<string, unknown>; }
  catch { return json({ ok: false, error: 'Solicitud inválida.' }, 400); }
  const examId = typeof body.examId === 'string' ? body.examId : '';
  const payload = verifyIcfesAttemptToken(body.attemptToken, examId);
  if (!payload) return json({ ok: false, error: 'El intento no es válido o venció.' }, 403);
  const found = getIcfesSecureExam(examId);
  if (!found) return json({ ok: false, error: 'El simulacro no existe.' }, 404);
  const questions = found.exam.sections.flatMap((section) => section.questions)
    .filter((question): question is MCQQuestion => question.type === 'mcq' || question.type === 'dialog');
  const answers = validateIcfesAnswers(body.responses, questions);
  if (!answers) return json({ ok: false, error: 'Las respuestas no corresponden a este simulacro.' }, 400);
  const result = gradeIcfesAttempt(examId, payload.attemptId, answers);
  if (!result) return json({ ok: false, error: 'No fue posible calificar el intento.' }, 404);
  const resultAccessToken = createIcfesResultAccessToken(payload.attemptId, examId);
  const ageAssurance = body.ageAssurance === 'ADULT_ATTESTED' || body.ageAssurance === 'MINOR_GUARDIAN_ATTESTED'
    ? body.ageAssurance : null;
  let persisted = false;
  try {
    if (!ageAssurance) throw new Error('Falta la declaración de edad para guardar el intento.');
    persisted = await persistIcfesAttempt({
      attemptId: payload.attemptId,
      examId,
      token: resultAccessToken,
      answers,
      result,
      ageAssurance,
    });
  }
  catch (error) {
    console.error('[icfes-grade] secure persistence failed:', error instanceof Error ? error.message : 'unknown');
  }
  const publicResult = toIcfesPublicResult(result);
  const responseResult = persisted ? publicResult : disableIcfesPremiumAfterPersistenceFailure(publicResult);
  const response = json({ ok: true, result: responseResult });
  if (persisted) {
    response.cookies.set(icfesAttemptCookieName(payload.attemptId), resultAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: ICFES_RESULT_ACCESS_DAYS * 24 * 60 * 60,
    });
  }
  return response;
}
