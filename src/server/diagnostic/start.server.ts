import 'server-only';

import { randomUUID } from 'node:crypto';

import { DIAGNOSTIC_CONSENT_VERSION, type DiagnosticStartRequest } from '@/lib/diagnostic/delivery';
import deliveryPolicy from '../../../config/diagnostic/delivery-policy.json' with { type: 'json' };
import { consumeExamReviewRateLimit } from '@/lib/exam-review/rate-limit.server';
import { createClient } from '@/lib/supabase/server';
import {
  ENGLISH_DIAGNOSTIC_OBJECTIVE_BANK,
  ENGLISH_DIAGNOSTIC_OBJECTIVE_BANK_VERSION,
  ENGLISH_DIAGNOSTIC_WRITING_BANK,
} from './bank';
import {
  hasDiagnosticPilotEnrollment,
  loadDiagnosticPriorExposure,
  persistCreatedDiagnosticAttempt,
} from './repository.server';
import { getDiagnosticProductionReleaseReadiness } from './release-runtime';
import { DiagnosticStartError, prepareEnglishDiagnosticAttempt } from './start-core';
import {
  diagnosticDeliveryRules,
  type DiagnosticDeliveryPolicy,
} from './delivery-policy';

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
  const accessMode = process.env.DIAGNOSTIC_ACCESS_MODE;
  if (accessMode !== 'pilot' && accessMode !== 'production') {
    console.error('[diagnostic] Missing or invalid diagnostic access mode.');
    return jsonError('SERVER_CONFIGURATION_INVALID', 'El diagnóstico aún no está disponible.', 503);
  }
  let deliveryRules;
  try {
    deliveryRules = diagnosticDeliveryRules(deliveryPolicy as DiagnosticDeliveryPolicy, accessMode);
  } catch (cause) {
    console.error('[diagnostic] Delivery policy rejected:', cause instanceof Error ? cause.message : 'unknown');
    return jsonError('SERVER_CONFIGURATION_INVALID', 'El diagnóstico aún no está disponible.', 503);
  }
  if (accessMode === 'production') {
    const release = getDiagnosticProductionReleaseReadiness();
    if (!release.ready) {
      console.error('[diagnostic] Production release certificate rejected:', release.blockers.join(','));
      return jsonError('RELEASE_NOT_AUTHORIZED', 'El diagnóstico aún no está disponible.', 503);
    }
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
  if (accessMode === 'pilot') {
    const pilotConsentVersion = process.env.DIAGNOSTIC_PILOT_CONSENT_VERSION?.trim() ?? '';
    if (!pilotConsentVersion) {
      console.error('[diagnostic] Pilot consent version is missing.');
      return jsonError('SERVER_CONFIGURATION_INVALID', 'El piloto aún no está disponible.', 503);
    }
    let enrolled = false;
    try {
      enrolled = await hasDiagnosticPilotEnrollment({ userId: user.id, pilotConsentVersion });
    } catch (cause) {
      console.error('[diagnostic] Pilot enrollment check failed:', cause instanceof Error ? cause.message : 'unknown');
      return jsonError('SERVICE_UNAVAILABLE', 'No pudimos verificar el acceso al piloto.', 503);
    }
    if (!enrolled) return jsonError('PILOT_ACCESS_REQUIRED', 'Este piloto requiere una invitación vigente.', 403);
  }

  const capacityDeficits = ENGLISH_DIAGNOSTIC_OBJECTIVE_BANK.length === 0;
  if (capacityDeficits) return jsonError('BANK_NOT_READY', 'El banco diagnóstico todavía está en revisión académica.', 503);
  const allowed = await consumeExamReviewRateLimit({
    namespace: 'diagnostic-attempt-user', identifier: user.id, limit: 6, windowSeconds: 3600,
  });
  if (!allowed) return jsonError('RATE_LIMITED', 'Alcanzaste el límite de intentos por ahora.', 429);

  try {
    const startedAt = new Date();
    const priorExposure = await loadDiagnosticPriorExposure({
      userId: user.id,
      language: 'en',
      since: new Date(startedAt.getTime() - deliveryRules.exposureLookbackDays * 86_400_000),
    });
    const delivery = await prepareEnglishDiagnosticAttempt(user.id, {
      bank: ENGLISH_DIAGNOSTIC_OBJECTIVE_BANK,
      writingBank: ENGLISH_DIAGNOSTIC_WRITING_BANK,
      bankVersion: ENGLISH_DIAGNOSTIC_OBJECTIVE_BANK_VERSION,
      consentVersion: DIAGNOSTIC_CONSENT_VERSION,
      deliveryPolicyVersion: deliveryPolicy.policyVersion,
      accessMode,
      minimumDaysBetweenCompletedAttempts: deliveryRules.minimumDaysBetweenCompletedAttempts,
      maximumConcurrentActiveAttempts: deliveryRules.maximumConcurrentActiveAttempts,
      exposureLookbackDays: deliveryRules.exposureLookbackDays,
      resultValidityDays: deliveryRules.resultValidityDays,
      excludedObjectiveItemIds: new Set(priorExposure.objectiveItemIds),
      selectionSecret: process.env.DIAGNOSTIC_SELECTION_SECRET ?? '',
      now: () => startedAt,
      newId: randomUUID,
      persist: persistCreatedDiagnosticAttempt,
    });
    return Response.json({ ok: true, delivery }, { status: 201, headers: NO_STORE_HEADERS });
  } catch (error) {
    if (error instanceof Error && error.message.includes('diagnostic_attempt_active_limit')) {
      return jsonError('ACTIVE_ATTEMPT_EXISTS', 'Ya tienes un diagnóstico activo. Continúalo antes de iniciar otro.', 409);
    }
    if (error instanceof Error && error.message.includes('diagnostic_attempt_cooldown')) {
      return jsonError('RETAKE_NOT_YET_AVAILABLE', 'Tu próximo diagnóstico aún no está disponible.', 429);
    }
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
