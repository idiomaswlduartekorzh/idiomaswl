import 'server-only';

import { randomUUID } from 'node:crypto';

import { ENGLISH_DIAGNOSTIC_BLUEPRINT } from '@/lib/diagnostic/blueprint';
import {
  DIAGNOSTIC_ENGINE_VERSION,
  parseDiagnosticObjectiveStageSubmitRequest,
  parseDiagnosticWritingStageSubmitRequest,
} from '@/lib/diagnostic/delivery';
import { consumeExamReviewRateLimit } from '@/lib/exam-review/rate-limit.server';
import { createClient } from '@/lib/supabase/server';
import {
  ENGLISH_DIAGNOSTIC_OBJECTIVE_BANK,
  ENGLISH_DIAGNOSTIC_OBJECTIVE_BANK_VERSION,
  ENGLISH_DIAGNOSTIC_WRITING_BANK,
  ENGLISH_DIAGNOSTIC_WRITING_BANK_VERSION,
} from './bank';
import {
  continueEnglishDiagnosticLocator,
  continueEnglishDiagnosticConfirmation,
  continueEnglishDiagnosticPrecision,
} from './continue-core';
import {
  loadDiagnosticObjectiveSubmissionContext,
  persistDiagnosticObjectiveStage,
  persistDiagnosticWritingSubmission,
} from './repository.server';
import { submitEnglishDiagnosticWriting } from './writing-submit-core';

const NO_STORE_HEADERS = { 'Cache-Control': 'private, no-store, max-age=0' };
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/iu;

function jsonError(code: string, message: string, status: number): Response {
  return Response.json({ ok: false, code, error: message }, { status, headers: NO_STORE_HEADERS });
}

function sameOrigin(request: Request): boolean {
  const origin = request.headers.get('origin');
  return Boolean(origin && origin === new URL(request.url).origin);
}

function locatorRequestedConfirmation(selectionReceipt: unknown): boolean {
  if (!selectionReceipt || typeof selectionReceipt !== 'object' || Array.isArray(selectionReceipt)) return false;
  const locator = (selectionReceipt as Record<string, unknown>).locator;
  return Boolean(locator && typeof locator === 'object' && !Array.isArray(locator)
    && (locator as Record<string, unknown>).requiresConfirmation === true);
}

function selectedWritingBankVersion(selectionReceipt: unknown): string | null {
  if (!selectionReceipt || typeof selectionReceipt !== 'object' || Array.isArray(selectionReceipt)) return null;
  const version = (selectionReceipt as Record<string, unknown>).writingBankVersion;
  return typeof version === 'string' ? version : null;
}

export async function handleDiagnosticStageSubmission(
  request: Request,
  identifiers: { attemptId: string; stageId: string },
): Promise<Response> {
  if (process.env.DIAGNOSTIC_ADAPTIVE_ENABLED !== 'true') {
    return jsonError('PILOT_DISABLED', 'El diagnóstico adaptativo aún no está habilitado.', 503);
  }
  if (!UUID.test(identifiers.attemptId) || !UUID.test(identifiers.stageId)) {
    return jsonError('NOT_FOUND', 'Intento no encontrado.', 404);
  }
  if (!sameOrigin(request)) return jsonError('INVALID_ORIGIN', 'Solicitud no válida.', 403);
  if (!request.headers.get('content-type')?.toLowerCase().startsWith('application/json')) {
    return jsonError('INVALID_CONTENT_TYPE', 'La solicitud debe usar JSON.', 415);
  }
  const contentLength = Number(request.headers.get('content-length') ?? 0);
  if (Number.isFinite(contentLength) && contentLength > 65_536) {
    return jsonError('PAYLOAD_TOO_LARGE', 'La solicitud es demasiado grande.', 413);
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return jsonError('INVALID_JSON', 'La solicitud no contiene JSON válido.', 400);
  }
  const objectiveSubmission = parseDiagnosticObjectiveStageSubmitRequest(body);
  const writingSubmission = parseDiagnosticWritingStageSubmitRequest(body);
  if (!objectiveSubmission && !writingSubmission) {
    return jsonError('INVALID_REQUEST', 'La respuesta enviada no es válida.', 400);
  }

  const supabase = await createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) return jsonError('AUTH_REQUIRED', 'Inicia sesión para continuar.', 401);
  if (ENGLISH_DIAGNOSTIC_OBJECTIVE_BANK.length === 0) {
    return jsonError('BANK_NOT_READY', 'El banco diagnóstico todavía está en revisión académica.', 503);
  }
  const allowed = await consumeExamReviewRateLimit({
    namespace: 'diagnostic-submit-user', identifier: user.id, limit: 120, windowSeconds: 3600,
  });
  if (!allowed) return jsonError('RATE_LIMITED', 'Espera un momento antes de volver a enviar.', 429);

  try {
    const context = await loadDiagnosticObjectiveSubmissionContext({ ...identifiers, userId: user.id });
    if (!context) return jsonError('NOT_FOUND', 'Intento no encontrado.', 404);
    const submissionVersion = context.stage.kind === 'writing'
      ? writingSubmission?.attemptVersion
      : objectiveSubmission?.attemptVersion;
    if (submissionVersion === undefined) {
      return jsonError('INVALID_REQUEST', 'La respuesta no corresponde a la etapa activa.', 400);
    }
    const replayStatuses = context.stage.kind === 'locator' ? ['precision']
      : context.stage.kind === 'precision' ? ['confirmation', 'writing']
        : context.stage.kind === 'confirmation' ? ['writing']
          : context.stage.kind === 'writing' ? ['scoring']
            : [];
    const idempotentReplayVersion = Boolean(context.stage.completedAt)
      && replayStatuses.includes(context.attempt.status)
      && submissionVersion === context.attempt.version - 1;
    if (submissionVersion !== context.attempt.version && !idempotentReplayVersion) {
      return jsonError('VERSION_CONFLICT', 'El intento cambió. Recarga la etapa actual.', 409);
    }
    if (context.bankVersion !== ENGLISH_DIAGNOSTIC_OBJECTIVE_BANK_VERSION
      || context.blueprintVersion !== ENGLISH_DIAGNOSTIC_BLUEPRINT.id
      || context.engineVersion !== DIAGNOSTIC_ENGINE_VERSION) {
      return jsonError('VERSION_UNAVAILABLE', 'Esta versión del diagnóstico ya no está disponible.', 409);
    }
    if (!['locator', 'precision', 'confirmation', 'writing'].includes(context.stage.kind) || context.stage.stageId !== identifiers.stageId) {
      return jsonError('STAGE_OUT_OF_ORDER', 'La etapa ya no está activa.', 409);
    }
    if (context.stage.kind === 'writing') {
      if (selectedWritingBankVersion(context.selectionReceipt) !== ENGLISH_DIAGNOSTIC_WRITING_BANK_VERSION) {
        return jsonError('VERSION_UNAVAILABLE', 'Esta versión de la consigna ya no está disponible.', 409);
      }
      const prompt = ENGLISH_DIAGNOSTIC_WRITING_BANK.find(record =>
        record.publicPrompt.id === context.stage.itemIds[0]
        && record.publicPrompt.contentVersion === context.stage.contentVersions[record.publicPrompt.id])?.publicPrompt;
      if (!prompt || !writingSubmission) {
        return jsonError('VERSION_UNAVAILABLE', 'Esta versión de la consigna ya no está disponible.', 409);
      }
      const result = await submitEnglishDiagnosticWriting({
        authenticatedUserId: user.id,
        attempt: context.attempt,
        stage: context.stage,
        prompt,
        submission: writingSubmission,
      }, { now: () => new Date(), persist: persistDiagnosticWritingSubmission });
      return Response.json({ ok: true, submission: result }, { status: 202, headers: NO_STORE_HEADERS });
    }
    if (!objectiveSubmission) return jsonError('INVALID_REQUEST', 'Las respuestas enviadas no son válidas.', 400);
    const bankById = new Map(ENGLISH_DIAGNOSTIC_OBJECTIVE_BANK.map((record) => [record.publicItem.id, record]));
    const stageRecords = context.stage.itemIds.map((itemId) => bankById.get(itemId));
    if (stageRecords.some((record) => !record)) {
      return jsonError('VERSION_UNAVAILABLE', 'Esta versión del diagnóstico ya no está disponible.', 409);
    }
    const sharedDependencies = {
      bank: ENGLISH_DIAGNOSTIC_OBJECTIVE_BANK,
      selectionSecret: process.env.DIAGNOSTIC_SELECTION_SECRET ?? '',
      now: () => new Date(),
      newId: randomUUID,
      persist: persistDiagnosticObjectiveStage,
    };
    let result;
    if (context.stage.kind === 'locator') {
      result = await continueEnglishDiagnosticLocator({
        authenticatedUserId: user.id,
        attempt: context.attempt,
        stage: context.stage,
        stageRecords: stageRecords as typeof ENGLISH_DIAGNOSTIC_OBJECTIVE_BANK,
        submissions: objectiveSubmission.responses,
      }, sharedDependencies);
    } else if (context.stage.kind === 'precision') {
      result = await continueEnglishDiagnosticPrecision({
        authenticatedUserId: user.id,
        attempt: context.attempt,
        stage: context.stage,
        stageRecords: stageRecords as typeof ENGLISH_DIAGNOSTIC_OBJECTIVE_BANK,
        priorObservations: context.priorObservations,
        locatorRequestedConfirmation: locatorRequestedConfirmation(context.selectionReceipt),
        submissions: objectiveSubmission.responses,
      }, {
        ...sharedDependencies,
        writingBank: ENGLISH_DIAGNOSTIC_WRITING_BANK,
        writingBankVersion: ENGLISH_DIAGNOSTIC_WRITING_BANK_VERSION,
      });
    } else {
      result = await continueEnglishDiagnosticConfirmation({
        authenticatedUserId: user.id,
        attempt: context.attempt,
        stage: context.stage,
        stageRecords: stageRecords as typeof ENGLISH_DIAGNOSTIC_OBJECTIVE_BANK,
        priorObservations: context.priorObservations,
        submissions: objectiveSubmission.responses,
      }, {
        ...sharedDependencies,
        writingBank: ENGLISH_DIAGNOSTIC_WRITING_BANK,
        writingBankVersion: ENGLISH_DIAGNOSTIC_WRITING_BANK_VERSION,
      });
    }
    return Response.json({ ok: true, delivery: result.delivery }, { status: 200, headers: NO_STORE_HEADERS });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'unknown';
    if (message.includes('expired')) return jsonError('ATTEMPT_EXPIRED', 'El intento expiró.', 410);
    if (message.includes('out of order') || message.includes('out_of_order')
      || message.includes('version conflict') || message.includes('version_conflict')
      || message.includes('already_completed')) {
      return jsonError('STAGE_OUT_OF_ORDER', 'La etapa ya no está activa.', 409);
    }
    if (message.includes('missing') || message.includes('duplicate') || message.includes('mismatch')
      || message.includes('unserved') || message.includes('invalid')) {
      return jsonError('INVALID_RESPONSES', 'Las respuestas no coinciden con la etapa entregada.', 400);
    }
    console.error('[diagnostic] Stage submission failed:', message);
    return jsonError('SERVICE_UNAVAILABLE', 'No pudimos guardar esta etapa. Inténtalo otra vez.', 503);
  }
}
