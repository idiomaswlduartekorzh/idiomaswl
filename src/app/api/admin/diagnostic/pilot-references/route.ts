import { createHmac } from 'node:crypto';

import { requireAdmin } from '@/lib/auth/require-admin.server';
import { consumeExamReviewRateLimit } from '@/lib/exam-review/rate-limit.server';
import { persistDiagnosticPilotReference } from '@/server/diagnostic/repository.server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{12}$/iu;
const LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'] as const;
const SOURCES = ['external-test', 'tutor-judgement', 'course-placement'] as const;
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
  if (Number.isFinite(contentLength) && contentLength > 8_192) return error('PAYLOAD_TOO_LARGE', 'La referencia es demasiado grande.', 413);
  let admin;
  try {
    admin = await requireAdmin();
  } catch {
    return error('ADMIN_REQUIRED', 'No tienes permisos de administrador.', 403);
  }
  const allowed = await consumeExamReviewRateLimit({
    namespace: 'diagnostic-pilot-reference-admin', identifier: admin.id, limit: 120, windowSeconds: 3600,
  });
  if (!allowed) return error('RATE_LIMITED', 'Espera antes de registrar otra referencia.', 429);
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return error('INVALID_JSON', 'La solicitud no contiene JSON válido.', 400);
  }
  if (!body || typeof body !== 'object' || Array.isArray(body)) return error('INVALID_REFERENCE', 'La referencia no es válida.', 400);
  const candidate = body as Record<string, unknown>;
  const attemptId = typeof candidate.attemptId === 'string' ? candidate.attemptId : '';
  const referenceLevel = typeof candidate.referenceLevel === 'string' ? candidate.referenceLevel : '';
  const source = typeof candidate.source === 'string' ? candidate.source : '';
  const sourceVersion = typeof candidate.sourceVersion === 'string' ? candidate.sourceVersion.trim() : '';
  const assessedAt = typeof candidate.assessedAt === 'string' ? new Date(candidate.assessedAt) : new Date(Number.NaN);
  if (!UUID.test(attemptId)
    || !LEVELS.includes(referenceLevel as typeof LEVELS[number])
    || !SOURCES.includes(source as typeof SOURCES[number])
    || sourceVersion.length < 3 || sourceVersion.length > 160
    || Number.isNaN(assessedAt.getTime())) {
    return error('INVALID_REFERENCE', 'La referencia no cumple el contrato.', 400);
  }
  const secret = process.env.DIAGNOSTIC_SELECTION_SECRET ?? '';
  if (secret.length < 32) return error('SERVER_CONFIGURATION_INVALID', 'La referencia no se puede registrar.', 503);
  const assessorRefHash = createHmac('sha256', secret).update(`pilot-reference\0${admin.id}`).digest('hex');
  try {
    await persistDiagnosticPilotReference({
      attemptId, referenceLevel, source, sourceVersion,
      assessorRefHash, assessedAt: assessedAt.toISOString(), recordedBy: admin.id,
    });
    return Response.json({ ok: true, attemptId }, { status: 201, headers: NO_STORE_HEADERS });
  } catch (cause) {
    const message = cause instanceof Error ? cause.message : 'unknown';
    if (message.includes('not_found')) return error('NOT_FOUND', 'Intento no encontrado.', 404);
    if (message.includes('not_eligible')) return error('ATTEMPT_NOT_ELIGIBLE', 'El intento no tiene un resultado integral terminado.', 409);
    if (message.includes('duplicate key')) return error('REFERENCE_EXISTS', 'El intento ya tiene una referencia independiente.', 409);
    if (message.includes('reference_invalid')) return error('INVALID_REFERENCE', 'La referencia no cumple el contrato.', 400);
    console.error('[diagnostic] Pilot reference failed:', message);
    return error('SERVICE_UNAVAILABLE', 'No pudimos registrar la referencia.', 503);
  }
}
