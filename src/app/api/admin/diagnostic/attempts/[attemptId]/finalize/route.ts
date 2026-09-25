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
  persistDiagnosticHumanWritingEvaluation,
  persistDiagnosticFinalization,
} from '@/server/diagnostic/repository.server';
import {
  compareWritingEvaluations,
  parseDiagnosticWritingEvaluation,
  validateDiagnosticWritingEvaluation,
  type DiagnosticAutomatedWritingEvaluation,
  type DiagnosticHumanWritingEvaluation,
} from '@/server/diagnostic/writing';
import { logDiagnosticInternalFailure, observeDiagnosticRoute } from '@/server/diagnostic/observability';

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

async function handleDiagnosticFinalization(
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
  const humanInput = candidate.human === undefined
    ? undefined
    : parseDiagnosticWritingEvaluation(candidate.human, 'human') as DiagnosticHumanWritingEvaluation | null;
  const adjudicatedInput = candidate.adjudicated === undefined
    ? undefined
    : parseDiagnosticWritingEvaluation(candidate.adjudicated, 'human') as DiagnosticHumanWritingEvaluation | null;
  if (humanInput === null || adjudicatedInput === null) return jsonError('INVALID_EVALUATION', 'La evaluación no cumple el contrato.', 400);

  try {
    const finalization = await loadDiagnosticFinalizationContext(attemptId);
    if (!finalization) return jsonError('NOT_FOUND', 'Intento no encontrado.', 404);
    const promptRecord = ENGLISH_DIAGNOSTIC_WRITING_BANK.find(record =>
      record.publicPrompt.id === finalization.promptId
      && record.publicPrompt.contentVersion === finalization.promptContentVersion);
    if (!promptRecord) return jsonError('VERSION_UNAVAILABLE', 'La consigna versionada no está disponible.', 409);
    const automated = finalization.automatedEvaluation === null
      ? null
      : parseDiagnosticWritingEvaluation(
          finalization.automatedEvaluation,
          'automated',
        ) as DiagnosticAutomatedWritingEvaluation | null;
    if (finalization.automatedEvaluation !== null && !automated) {
      return jsonError('REVIEW_STATE_INVALID', 'La evaluación automatizada guardada no cumple el contrato.', 409);
    }
    const storedHuman = parseDiagnosticWritingEvaluation(
      finalization.humanEvaluation,
      'human',
    ) as DiagnosticHumanWritingEvaluation | null;
    if (finalization.humanEvaluation !== null && !storedHuman) {
      return jsonError('REVIEW_STATE_INVALID', 'La revisión guardada no cumple el contrato.', 409);
    }
    if (storedHuman && humanInput) {
      return jsonError('HUMAN_REVIEW_IMMUTABLE', 'La primera revisión humana ya fue registrada.', 409);
    }
    if (!storedHuman && !humanInput) {
      return jsonError('HUMAN_REVIEW_REQUIRED', 'Falta la revisión humana inicial.', 400);
    }
    const human = storedHuman ?? { ...humanInput!, reviewerId: admin.id };
    const humanErrors = validateDiagnosticWritingEvaluation(human, promptRecord.publicPrompt, finalization.responseText);
    if (humanErrors.length) return jsonError('INVALID_EVALUATION', 'La revisión humana no coincide con la respuesta guardada.', 400);
    if (automated && automated.rubricVersion !== human.rubricVersion) {
      return jsonError('RUBRIC_VERSION_CONFLICT', 'Las evaluaciones usan versiones distintas de la rúbrica.', 409);
    }
    const agreement = automated ? compareWritingEvaluations(automated, human) : null;
    const requiresAdjudication = human.decision !== 'accept' || agreement?.requiresAdjudication === true;
    if (!storedHuman) {
      await persistDiagnosticHumanWritingEvaluation({
        attemptId: finalization.attempt.id,
        userId: finalization.attempt.userId,
        evaluation: human,
        nextStatus: requiresAdjudication ? 'adjudication' : 'human-review',
      });
    }
    if (requiresAdjudication && !adjudicatedInput) {
      return jsonError('ADJUDICATION_REQUIRED', 'La discrepancia exige adjudicación por otro revisor.', 409);
    }
    if (!requiresAdjudication && adjudicatedInput) {
      return jsonError('ADJUDICATION_NOT_REQUIRED', 'Esta revisión no requiere adjudicación.', 409);
    }
    const adjudicated = adjudicatedInput
      ? { ...adjudicatedInput, reviewerId: admin.id }
      : undefined;
    if (adjudicated && adjudicated.reviewerId === human.reviewerId) {
      return jsonError('INDEPENDENT_ADJUDICATOR_REQUIRED', 'La adjudicación requiere otro revisor.', 403);
    }
    if (adjudicated) {
      const adjudicationErrors = validateDiagnosticWritingEvaluation(adjudicated, promptRecord.publicPrompt, finalization.responseText);
      if (adjudicationErrors.length || adjudicated.rubricVersion !== (automated?.rubricVersion ?? human.rubricVersion)) {
        return jsonError('INVALID_EVALUATION', 'La adjudicación no coincide con la respuesta o la rúbrica guardada.', 400);
      }
    }
    const result = await finalizeEnglishDiagnostic({
      authenticatedAdminId: admin.id,
      attempt: finalization.attempt,
      prompt: promptRecord.publicPrompt,
      responseText: finalization.responseText,
      observations: finalization.observations,
      ...(automated ? { automated } : {}),
      human, adjudicated,
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
    logDiagnosticInternalFailure({ component: 'writing-finalization', reason: 'writing-finalization-failed' });
    return jsonError('SERVICE_UNAVAILABLE', 'No pudimos finalizar el diagnóstico.', 503);
  }
}

export async function POST(
  request: Request,
  context: { params: Promise<{ attemptId: string }> },
): Promise<Response> {
  return observeDiagnosticRoute(
    { route: '/api/admin/diagnostic/attempts/[attemptId]/finalize', method: 'POST' },
    () => handleDiagnosticFinalization(request, context),
  );
}
