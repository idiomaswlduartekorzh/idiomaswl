import 'server-only';

import { randomUUID } from 'node:crypto';

import { DIAGNOSTIC_CONSENT_VERSION, type DiagnosticStartRequest } from '@/lib/diagnostic/delivery';
import { consumeExamReviewRateLimit } from '@/lib/exam-review/rate-limit.server';
import { createClient } from '@/lib/supabase/server';
import {
  ENGLISH_DIAGNOSTIC_OBJECTIVE_BANK,
  ENGLISH_DIAGNOSTIC_OBJECTIVE_BANK_VERSION,
  ENGLISH_DIAGNOSTIC_WRITING_BANK,
} from './bank';
import { persistCreatedDiagnosticAttempt } from './repository.server';
import { DiagnosticStartError, prepareEnglishDiagnosticAttempt } from './start-core';

const NO_STORE_HEADERS = { 'Cache-Control': 'private, no-store, max-age=0' };

function jsonError(code: string, message: string, status: number): Response {
  return Response.json({ ok: false, code, error: message }, { status, headers: NO_STORE_HEADERS });
}

function parseStartRequest(value: unknown): DiagnosticStartRequest | null {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null;
  const candidate = value as Partial<DiagnosticStartRequest>;
  if (candidate.language !== 'en'
    || candidate.audioCheckPassed !== true
    || candidate.consentVersion !== DIAGNOSTIC_CONSENT_VERSION) return null;
  return {
    language: 'en', audioCheckPassed: true, consentVersion: DIAGNOSTIC_CONSENT_VERSION,
  };
}

function requestHasSameOrigin(request: Request): boolean {
  const origin = request.headers.get('origin');
  return Boolean(origin && origin === new URL(request.url).origin);
}

export async function handleDiagnosticAttemptStart(request: Request): Promise<Response> {
  if (process.env.DIAGNOSTIC_ADAPTIVE_ENABLED !== 'true') {
    return jsonError('PILOT_DISABLED', 'El diagnóstico adaptativo aún no está habilitado.', 503);
  }
  if (!requestHasSameOrigin(request)) return jsonError('INVALID_ORIGIN', 'Solicitud no válida.', 403);
  if (!request.headers.get('content-type')?.toLowerCase().startsWith('application/json')) {
    return jsonError('INVALID_CONTENT_TYPE', 'La solicitud debe usar JSON.', 415);
  }
  const contentLength = Number(request.headers.get('content-length') ?? 0);
  if (Number.isFinite(contentLength) && contentLength > 2048) return jsonError('PAYLOAD_TOO_LARGE', 'La solicitud es demasiado grande.', 413);

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return jsonError('INVALID_JSON', 'La solicitud no contiene JSON válido.', 400);
  }
  if (!parseStartRequest(body)) return jsonError('INVALID_REQUEST', 'Completa el control de audio y acepta el consentimiento vigente.', 400);

  const supabase = await createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) return jsonError('AUTH_REQUIRED', 'Inicia sesión para comenzar el diagnóstico.', 401);

  const capacityDeficits = ENGLISH_DIAGNOSTIC_OBJECTIVE_BANK.length === 0;
  if (capacityDeficits) return jsonError('BANK_NOT_READY', 'El banco diagnóstico todavía está en revisión académica.', 503);
  const allowed = await consumeExamReviewRateLimit({
    namespace: 'diagnostic-attempt-user', identifier: user.id, limit: 6, windowSeconds: 3600,
  });
  if (!allowed) return jsonError('RATE_LIMITED', 'Alcanzaste el límite de intentos por ahora.', 429);

  try {
    const delivery = await prepareEnglishDiagnosticAttempt(user.id, {
      bank: ENGLISH_DIAGNOSTIC_OBJECTIVE_BANK,
      writingBank: ENGLISH_DIAGNOSTIC_WRITING_BANK,
      bankVersion: ENGLISH_DIAGNOSTIC_OBJECTIVE_BANK_VERSION,
      selectionSecret: process.env.DIAGNOSTIC_SELECTION_SECRET ?? '',
      now: () => new Date(),
      newId: randomUUID,
      persist: persistCreatedDiagnosticAttempt,
    });
    return Response.json({ ok: true, delivery }, { status: 201, headers: NO_STORE_HEADERS });
  } catch (error) {
    if (error instanceof DiagnosticStartError && error.code === 'BANK_NOT_READY') {
      return jsonError(error.code, 'El banco diagnóstico todavía está en revisión académica.', 503);
    }
    if (error instanceof DiagnosticStartError && error.code === 'SERVER_CONFIGURATION_INVALID') {
      console.error('[diagnostic] Invalid server configuration:', error.message);
    } else {
      console.error('[diagnostic] Attempt start failed:', error instanceof Error ? error.message : 'unknown');
    }
    return jsonError('SERVICE_UNAVAILABLE', 'No pudimos iniciar el diagnóstico. Inténtalo más tarde.', 503);
  }
}
