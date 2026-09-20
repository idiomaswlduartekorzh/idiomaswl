import { NextResponse } from 'next/server';
import { getIcfesSecureExam } from '@/lib/icfes/exam-registry.server';
import { gradeIcfesAttempt, persistIcfesAttempt } from '@/lib/icfes/grading.server';
import { toIcfesFreeSummary, validateIcfesAnswers } from '@/lib/icfes/attempt-contract';
import { ICFES_ATTEMPT_COOKIE, verifyIcfesAttemptToken } from '@/lib/icfes/attempt-token.server';
import { isIcfesPersistenceEnabled } from '@/lib/icfes/product-config.server';
import type { MCQQuestion } from '@/data/mocks/types';
import type { IcfesGradeReceiptDto, IcfesUnavailableCommerceGradeDto } from '@/lib/icfes/attempt-contract';

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
  if (!isIcfesPersistenceEnabled()) {
    // Keep existing mocks usable while the private database and consent ledger
    // are not activated. Do not collect a lead or imply that paid detail exists.
    const fallback: IcfesUnavailableCommerceGradeDto = {
      ok: true,
      attemptId: result.attemptId,
      examId: result.examId,
      leadRequired: false,
      commerceAvailable: false,
      freeSummary: toIcfesFreeSummary(result),
    };
    return json(fallback);
  }
  try {
    const persisted = await persistIcfesAttempt({ attemptId: payload.attemptId, examId, token: String(body.attemptToken), answers, result });
    if (!persisted) return json({ ok: false, error: 'El guardado privado del intento no está habilitado.' }, 503);
  }
  catch (error) {
    console.error('[icfes-grade] secure persistence failed:', error instanceof Error ? error.message : 'unknown');
    return json({ ok: false, error: 'No pudimos guardar el intento seguro.' }, 503);
  }
  const receipt: IcfesGradeReceiptDto = {
    ok: true,
    attemptId: result.attemptId,
    examId: result.examId,
    leadRequired: true,
    officialResource: result.officialResource,
    premiumEligible: result.premiumEligible,
  };
  const response = json(receipt);
  response.cookies.set(ICFES_ATTEMPT_COOKIE, String(body.attemptToken), {
    httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax', path: '/', maxAge: 6 * 60 * 60,
  });
  return response;
}
