import 'server-only';

import { ENGLISH_DIAGNOSTIC_BLUEPRINT } from '@/lib/diagnostic/blueprint';
import { DIAGNOSTIC_ENGINE_VERSION } from '@/lib/diagnostic/delivery';
import { consumeExamReviewRateLimit } from '@/lib/exam-review/rate-limit.server';
import { createClient } from '@/lib/supabase/server';
import {
  ENGLISH_DIAGNOSTIC_OBJECTIVE_BANK,
  ENGLISH_DIAGNOSTIC_OBJECTIVE_BANK_VERSION,
  ENGLISH_DIAGNOSTIC_WRITING_BANK,
  ENGLISH_DIAGNOSTIC_WRITING_BANK_VERSION,
} from './bank';
import { loadDiagnosticAttemptForResume } from './repository.server';
import { buildEnglishDiagnosticResumeDelivery } from './resume-core';
import { logDiagnosticInternalFailure } from './observability';

const NO_STORE_HEADERS = { 'Cache-Control': 'private, no-store, max-age=0' };
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/iu;

function jsonError(code: string, message: string, status: number): Response {
  return Response.json({ ok: false, code, error: message }, { status, headers: NO_STORE_HEADERS });
}

export async function handleDiagnosticAttemptResume(attemptId: string): Promise<Response> {
  if (process.env.DIAGNOSTIC_ADAPTIVE_ENABLED !== 'true') {
    return jsonError('PILOT_DISABLED', 'El diagnóstico adaptativo aún no está habilitado.', 503);
  }
  if (!UUID.test(attemptId)) return jsonError('NOT_FOUND', 'Intento no encontrado.', 404);
  const supabase = await createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) return jsonError('AUTH_REQUIRED', 'Inicia sesión para continuar.', 401);
  const allowed = await consumeExamReviewRateLimit({
    namespace: 'diagnostic-resume-user', identifier: user.id, limit: 240, windowSeconds: 3600,
  });
  if (!allowed) return jsonError('RATE_LIMITED', 'Espera un momento antes de volver a consultar.', 429);
  try {
    const snapshot = await loadDiagnosticAttemptForResume({ attemptId, userId: user.id });
    if (!snapshot) return jsonError('NOT_FOUND', 'Intento no encontrado.', 404);
    const resume = buildEnglishDiagnosticResumeDelivery({
      authenticatedUserId: user.id, snapshot,
      objectiveBank: ENGLISH_DIAGNOSTIC_OBJECTIVE_BANK,
      objectiveBankVersion: ENGLISH_DIAGNOSTIC_OBJECTIVE_BANK_VERSION,
      writingBank: ENGLISH_DIAGNOSTIC_WRITING_BANK,
      writingBankVersion: ENGLISH_DIAGNOSTIC_WRITING_BANK_VERSION,
      blueprintVersion: ENGLISH_DIAGNOSTIC_BLUEPRINT.id,
      engineVersion: DIAGNOSTIC_ENGINE_VERSION,
      now: new Date(),
    });
    return Response.json({ ok: true, resume }, { status: 200, headers: NO_STORE_HEADERS });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'unknown';
    if (message.includes('version') || message.includes('unavailable')) {
      return jsonError('VERSION_UNAVAILABLE', 'Esta versión del diagnóstico ya no está disponible.', 409);
    }
    logDiagnosticInternalFailure({ component: 'attempt-resume', reason: 'attempt-resume-failed' });
    return jsonError('SERVICE_UNAVAILABLE', 'No pudimos recuperar el intento.', 503);
  }
}
