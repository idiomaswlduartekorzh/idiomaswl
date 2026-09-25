import 'server-only';

import { createAdminClient } from '@/lib/supabase/admin';
import type { PersistDiagnosticAttemptInput } from './start-core';
import type { PersistObjectiveStageInput } from './continue-core';

export async function persistCreatedDiagnosticAttempt(input: PersistDiagnosticAttemptInput): Promise<void> {
  const { error } = await createAdminClient().rpc('create_diagnostic_attempt', {
    p_attempt_id: input.attemptId,
    p_user_id: input.userId,
    p_language: input.language,
    p_blueprint_version: input.blueprintVersion,
    p_bank_version: input.bankVersion,
    p_engine_version: input.engineVersion,
    p_selection_seed_hash: input.selectionSeedHash,
    p_expires_at: input.expiresAt,
    p_stage_id: input.stage.stageId,
    p_item_ids: [...input.stage.itemIds],
    p_content_versions: input.stage.contentVersions,
    p_selection_receipt: input.selectionReceipt,
  });
  if (error) {
    console.error('[diagnostic] Atomic attempt creation failed:', error.message);
    throw new Error('diagnostic_persistence_unavailable');
  }
}

export async function persistDiagnosticObjectiveStage(
  input: PersistObjectiveStageInput,
): Promise<{ replayed: boolean; version: number }> {
  const { data, error } = await createAdminClient().rpc('submit_diagnostic_objective_stage', {
    p_attempt_id: input.attempt.id,
    p_stage_id: input.stage.stageId,
    p_user_id: input.attempt.userId,
    p_expected_attempt_version: input.attempt.version,
    p_submission_digest: input.submissionDigest,
    p_responses: input.scoredResponses.map(response => ({
      itemId: response.itemId,
      contentVersion: response.contentVersion,
      skill: response.skill,
      response: response.response,
      outcome: response.outcome,
      responseMs: response.responseMs,
      audioPlayCount: response.audioPlayCount,
    })),
    p_next_status: input.nextStatus,
    p_route_id: input.routeId,
    p_next_stage_id: input.nextStage.stageId,
    p_next_stage_kind: input.nextStage.kind,
    p_next_stage_index: 1,
    p_next_item_ids: [...input.nextStage.itemIds],
    p_next_content_versions: input.nextStage.contentVersions,
    p_next_selection_receipt: input.nextSelectionReceipt,
  });
  if (error || !data || typeof data !== 'object') {
    console.error('[diagnostic] Atomic stage submission failed:', error?.message ?? 'invalid RPC result');
    throw new Error('diagnostic_persistence_unavailable');
  }
  const result = data as { replayed?: unknown; version?: unknown };
  if (typeof result.replayed !== 'boolean' || !Number.isInteger(result.version)) {
    throw new Error('diagnostic_persistence_unavailable');
  }
  return { replayed: result.replayed, version: Number(result.version) };
}

