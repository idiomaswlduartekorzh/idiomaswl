import { requireAdmin } from '@/lib/auth/require-admin.server';
import { consumeExamReviewRateLimit } from '@/lib/exam-review/rate-limit.server';
import {
  ENGLISH_DIAGNOSTIC_OBJECTIVE_BANK,
  ENGLISH_DIAGNOSTIC_OBJECTIVE_BANK_VERSION,
  ENGLISH_DIAGNOSTIC_WRITING_BANK,
} from '@/server/diagnostic/bank';
import { finalizeEnglishDiagnostic } from '@/server/diagnostic/finalize-core';
import {
  loadDiagnosticFinalizationContext,
  persistDiagnosticFinalization,
} from '@/server/diagnostic/repository.server';
import {
  parseDiagnosticWritingEvaluation,
  type DiagnosticAutomatedWritingEvaluation,
  type DiagnosticHumanWritingEvaluation,
} from '@/server/diagnostic/writing';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/iu;
const NO_STORE_HEADERS = { 'Cache-Control': 'private, no-store, max-age=0' };

function jsonError(code: string, error: string, status: number): Response {
  return Response.json({ ok: false, code, error }, { status, headers: NO_STORE_HEADERS });
}

function sameOrigin(request: Request): boolean {
  const origin = request.headers.get('origin');
  return Boolean(origin && origin === new URL(request.url).origin);
}

export async function POST(
  request: Request,
  context: { params: Promise<{ attemptId: string }> },
): Promise<Response> {
  if (process.env.DIAGNOSTIC_ADAPTIVE_ENABLED !== 'true') return jsonError('PILOT_DISABLED', 'El diagnóstico no está habilitado.', 503);
  if (!sameOrigin(request)) return jsonError('INVALID_ORIGIN', 'Solicitud no válida.', 403);
  if (!request.headers.get('content-type')?.toLowerCase().startsWith('application/json')) {
    return jsonError('INVALID_CONTENT_TYPE', 'La solicitud debe usar JSON.', 415);
  }
  const contentLength = Number(request.headers.get('content-length') ?? 0);
  if (Number.isFinite(contentLength) && contentLength > 131_072) return jsonError('PAYLOAD_TOO_LARGE', 'La evaluación es demasiado grande.', 413);
  const { attemptId } = await context.params;
  if (!UUID.test(attemptId)) return jsonError('NOT_FOUND', 'Intento no encontrado.', 404);

  let admin;
  try {
    admin = await requireAdmin();
  } catch {
    return jsonError('ADMIN_REQUIRED', 'No tienes permisos de administrador.', 403);
  }
  const allowed = await consumeExamReviewRateLimit({
    namespace: 'diagnostic-finalize-admin', identifier: admin.id, limit: 60, windowSeconds: 3600,
  });
  if (!allowed) return jsonError('RATE_LIMITED', 'Espera antes de finalizar otra evaluación.', 429);

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return jsonError('INVALID_JSON', 'La solicitud no contiene JSON válido.', 400);
  }
  if (!body || typeof body !== 'object' || Array.isArray(body)) return jsonError('INVALID_EVALUATION', 'La evaluación no es válida.', 400);
  const candidate = body as Record<string, unknown>;
  const automated = parseDiagnosticWritingEvaluation(candidate.automated, 'automated') as DiagnosticAutomatedWritingEvaluation | null;
  const humanInput = parseDiagnosticWritingEvaluation(candidate.human, 'human') as DiagnosticHumanWritingEvaluation | null;
  const adjudicatedInput = candidate.adjudicated === undefined
    ? undefined
    : parseDiagnosticWritingEvaluation(candidate.adjudicated, 'human') as DiagnosticHumanWritingEvaluation | null;
  if (!automated || !humanInput || adjudicatedInput === null) return jsonError('INVALID_EVALUATION', 'La evaluación no cumple el contrato.', 400);
  const human = { ...humanInput, reviewerId: admin.id };
  const adjudicated = adjudicatedInput ? { ...adjudicatedInput, reviewerId: admin.id } : undefined;

  try {
    const finalization = await loadDiagnosticFinalizationContext(attemptId);
    if (!finalization) return jsonError('NOT_FOUND', 'Intento no encontrado.', 404);
    const promptRecord = ENGLISH_DIAGNOSTIC_WRITING_BANK.find(record =>
      record.publicPrompt.id === finalization.promptId
      && record.publicPrompt.contentVersion === finalization.promptContentVersion);
    if (!promptRecord) return jsonError('VERSION_UNAVAILABLE', 'La consigna versionada no está disponible.', 409);
    const result = await finalizeEnglishDiagnostic({
      authenticatedAdminId: admin.id,
      attempt: finalization.attempt,
      prompt: promptRecord.publicPrompt,
      responseText: finalization.responseText,
      observations: finalization.observations,
      automated, human, adjudicated,
    }, {
      objectiveBank: ENGLISH_DIAGNOSTIC_OBJECTIVE_BANK,
      objectiveBankVersion: ENGLISH_DIAGNOSTIC_OBJECTIVE_BANK_VERSION,
      now: () => new Date(),
      persist: persistDiagnosticFinalization,
    });
    return Response.json({ ok: true, result }, { status: 200, headers: NO_STORE_HEADERS });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'unknown';
    if (message.includes('adjudication required')) return jsonError('ADJUDICATION_REQUIRED', 'La discrepancia exige adjudicación.', 409);
    if (message.includes('not publishable')) return jsonError('WRITING_NOT_PUBLISHABLE', 'La evidencia escrita no se puede publicar.', 409);
    if (message.includes('not awaiting scoring') || message.includes('not_scoring') || message.includes('version conflict')) {
      return jsonError('STATE_CONFLICT', 'El intento cambió o ya no espera evaluación.', 409);
    }
    if (message.includes('invalid diagnostic writing evaluation') || message.includes('reviewer identity mismatch')) {
      return jsonError('INVALID_EVALUATION', 'La evaluación no coincide con la respuesta guardada.', 400);
    }
    console.error('[diagnostic] Finalization failed:', message);
    return jsonError('SERVICE_UNAVAILABLE', 'No pudimos finalizar el diagnóstico.', 503);
  }
}
