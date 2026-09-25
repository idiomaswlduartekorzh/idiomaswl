import { requireAdmin } from '@/lib/auth/require-admin.server';
import { consumeExamReviewRateLimit } from '@/lib/exam-review/rate-limit.server';
import { persistDiagnosticPilotEnrollment } from '@/server/diagnostic/repository.server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{12}$/iu;
const COHORT = /^[a-z0-9][a-z0-9._-]{2,99}$/u;
const ACTIONS = ['invited', 'consented', 'revoked', 'completed'] as const;
const NO_STORE_HEADERS = { 'Cache-Control': 'private, no-store, max-age=0' };

function error(code: string, message: string, status: number): Response {
  return Response.json({ ok: false, code, error: message }, { status, headers: NO_STORE_HEADERS });
}

function sameOrigin(request: Request): boolean {
  const origin = request.headers.get('origin');
  return Boolean(origin && origin === new URL(request.url).origin);
}

export async function POST(request: Request): Promise<Response> {
  if (!sameOrigin(request)) return error('INVALID_ORIGIN', 'Solicitud no válida.', 403);
  if (!request.headers.get('content-type')?.toLowerCase().startsWith('application/json')) {
    return error('INVALID_CONTENT_TYPE', 'La solicitud debe usar JSON.', 415);
  }
  const contentLength = Number(request.headers.get('content-length') ?? 0);
  if (Number.isFinite(contentLength) && contentLength > 2_048) {
    return error('PAYLOAD_TOO_LARGE', 'La inscripción es demasiado grande.', 413);
  }
  let admin;
  try {
    admin = await requireAdmin();
  } catch {
    return error('ADMIN_REQUIRED', 'No tienes permisos de administrador.', 403);
  }
  const allowed = await consumeExamReviewRateLimit({
    namespace: 'diagnostic-pilot-enrollment-admin', identifier: admin.id, limit: 120, windowSeconds: 3600,
  });
  if (!allowed) return error('RATE_LIMITED', 'Espera antes de registrar otra inscripción.', 429);

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return error('INVALID_JSON', 'La solicitud no contiene JSON válido.', 400);
  }
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return error('INVALID_ENROLLMENT', 'La inscripción no es válida.', 400);
  }
  const candidate = body as Record<string, unknown>;
  const allowedKeys = new Set([
    'userId', 'cohortId', 'action', 'consentConfirmed', 'consentedAt', 'consentReference', 'reason',
  ]);
  if (Object.keys(candidate).some(key => !allowedKeys.has(key))) {
    return error('INVALID_ENROLLMENT', 'La inscripción contiene campos no permitidos.', 400);
  }
  const userId = typeof candidate.userId === 'string' ? candidate.userId : '';
  const cohortId = typeof candidate.cohortId === 'string' ? candidate.cohortId : '';
  const action = typeof candidate.action === 'string' ? candidate.action : '';
  const reason = typeof candidate.reason === 'string' ? candidate.reason.trim() : null;
  const consentReference = typeof candidate.consentReference === 'string'
    ? candidate.consentReference.trim() : null;
  if (!UUID.test(userId) || !COHORT.test(cohortId) || !ACTIONS.includes(action as typeof ACTIONS[number])) {
    return error('INVALID_ENROLLMENT', 'La inscripción no cumple el contrato.', 400);
  }

  const configuredConsentVersion = process.env.DIAGNOSTIC_PILOT_CONSENT_VERSION?.trim() ?? '';
  let pilotConsentVersion: string | null = null;
  let consentedAt: string | null = null;
  if (action === 'invited' || action === 'consented') {
    if (configuredConsentVersion.length < 3 || configuredConsentVersion.length > 160) {
      return error('SERVER_CONFIGURATION_INVALID', 'El consentimiento piloto no está configurado.', 503);
    }
  }
  if (action === 'consented') {
    const suppliedDate = typeof candidate.consentedAt === 'string'
      ? new Date(candidate.consentedAt) : new Date(Number.NaN);
    if (candidate.consentConfirmed !== true
      || Number.isNaN(suppliedDate.getTime())
      || suppliedDate.toISOString() !== candidate.consentedAt
      || suppliedDate.getTime() > Date.now() + 300_000
      || !consentReference
      || !/^[A-Za-z0-9][A-Za-z0-9._:/-]{2,199}$/u.test(consentReference)) {
      return error('INVALID_CONSENT', 'La evidencia de consentimiento no está completa.', 400);
    }
    pilotConsentVersion = configuredConsentVersion;
    consentedAt = suppliedDate.toISOString();
  } else if (candidate.consentConfirmed !== undefined
    || candidate.consentedAt !== undefined
    || candidate.consentReference !== undefined) {
    return error('INVALID_ENROLLMENT', 'Esta transición no acepta evidencia de consentimiento nueva.', 400);
  }
  if ((action === 'revoked' || action === 'completed') && (!reason || reason.length < 3 || reason.length > 500)) {
    return error('REASON_REQUIRED', 'Esta transición requiere una razón auditable.', 400);
  }
  if ((action === 'invited' || action === 'consented') && reason !== null) {
    return error('INVALID_ENROLLMENT', 'Esta transición no acepta una razón de cierre.', 400);
  }

  try {
    const receipt = await persistDiagnosticPilotEnrollment({
      userId,
      cohortId,
      action: action as typeof ACTIONS[number],
      pilotConsentVersion,
      consentedAt,
      consentReference,
      actedBy: admin.id,
      reason,
    });
    return Response.json({ ok: true, receipt }, { status: 201, headers: NO_STORE_HEADERS });
  } catch (cause) {
    const message = cause instanceof Error ? cause.message : 'unknown';
    if (message.includes('transition_invalid')) {
      return error('INVALID_TRANSITION', 'La transición no coincide con el estado actual.', 409);
    }
    if (message.includes('enrollment_invalid')) {
      return error('INVALID_ENROLLMENT', 'La inscripción no cumple el contrato.', 400);
    }
    if (message.includes('foreign key')) return error('USER_NOT_FOUND', 'Usuario no encontrado.', 404);
    console.error('[diagnostic] Pilot enrollment failed:', message);
    return error('SERVICE_UNAVAILABLE', 'No pudimos registrar la inscripción.', 503);
  }
}
