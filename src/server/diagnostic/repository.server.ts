import 'server-only';

import { createAdminClient } from '@/lib/supabase/admin';
import type { DiagnosticStageReceipt } from '@/lib/diagnostic/types';
import type { DiagnosticAttemptSnapshot } from './continue-core';
import type { DiagnosticObjectiveObservation } from './measurement';
import type { PersistDiagnosticAttemptInput } from './start-core';
import type { PersistObjectiveStageInput } from './continue-core';
import type { PersistWritingSubmissionInput } from './writing-submit-core';
import type { DiagnosticScoringAttempt, PersistDiagnosticFinalizationInput } from './finalize-core';
import type { DiagnosticResumeSnapshot } from './resume-core';

export async function loadDiagnosticAttemptForResume(input: {
  attemptId: string;
  userId: string;
}): Promise<DiagnosticResumeSnapshot | null> {
  const admin = createAdminClient();
  const [
    { data: attempt, error: attemptError },
    { data: stages, error: stageError },
    { data: writing, error: writingError },
  ] = await Promise.all([
    admin.from('diagnostic_attempts')
      .select('id,user_id,version,status,route_id,expires_at,bank_version,blueprint_version,engine_version,result_profile')
      .eq('id', input.attemptId).eq('user_id', input.userId).maybeSingle(),
    admin.from('diagnostic_stages')
      .select('id,stage_index,kind,route_id,status,item_ids,content_versions,selection_receipt,issued_at,completed_at')
      .eq('attempt_id', input.attemptId).eq('user_id', input.userId)
      .order('stage_index', { ascending: false }).limit(1),
    admin.from('diagnostic_writing_evaluations')
      .select('status').eq('attempt_id', input.attemptId).eq('user_id', input.userId).maybeSingle(),
  ]);
  if (attemptError || stageError || writingError) throw new Error('diagnostic_persistence_unavailable');
  if (!attempt) return null;
  const stage = stages?.[0] ?? null;
  if (stage && (!Array.isArray(stage.item_ids) || !stage.content_versions || typeof stage.content_versions !== 'object')) {
    throw new Error('diagnostic_persistence_unavailable');
  }
  return {
    attempt: {
      id: String(attempt.id), userId: String(attempt.user_id), version: Number(attempt.version),
      status: attempt.status as DiagnosticAttemptSnapshot['status'],
      routeId: attempt.route_id as DiagnosticAttemptSnapshot['routeId'], expiresAt: String(attempt.expires_at),
    },
    stage: stage ? {
      stageId: String(stage.id), kind: stage.kind as DiagnosticStageReceipt['kind'],
      routeId: stage.route_id as DiagnosticStageReceipt['routeId'], itemIds: stage.item_ids.map(String),
      contentVersions: stage.content_versions as Readonly<Record<string, string>>, issuedAt: String(stage.issued_at),
      ...(stage.completed_at ? { completedAt: String(stage.completed_at) } : {}),
    } : null,
    stageStatus: stage ? stage.status as DiagnosticResumeSnapshot['stageStatus'] : null,
    selectionReceipt: stage?.selection_receipt ?? null,
    bankVersion: String(attempt.bank_version), blueprintVersion: String(attempt.blueprint_version),
    engineVersion: String(attempt.engine_version), writingStatus: writing?.status ? String(writing.status) : null,
    resultProfile: attempt.result_profile ?? null,
  };
}

export async function authorizeDiagnosticMediaAccess(input: {
  userId: string;
  itemIds: readonly string[];
  now: Date;
}): Promise<boolean> {
  if (!input.userId || input.itemIds.length < 1) return false;
  const admin = createAdminClient();
  const { data: stages, error: stageError } = await admin.from('diagnostic_stages')
    .select('attempt_id,kind,item_ids')
    .eq('user_id', input.userId).eq('status', 'issued')
    .overlaps('item_ids', [...input.itemIds]).limit(10);
  if (stageError) throw new Error('diagnostic_persistence_unavailable');
  if (!stages?.length) return false;
  const attemptIds = [...new Set(stages.map(stage => String(stage.attempt_id)))];
  const { data: attempts, error: attemptError } = await admin.from('diagnostic_attempts')
    .select('id,status,expires_at')
    .eq('user_id', input.userId).in('id', attemptIds);
  if (attemptError) throw new Error('diagnostic_persistence_unavailable');
  return Boolean(attempts?.some(attempt => new Date(String(attempt.expires_at)).getTime() > input.now.getTime()
    && stages.some(stage => String(stage.attempt_id) === String(attempt.id) && stage.kind === attempt.status)));
}

export async function loadDiagnosticFinalizationContext(attemptId: string): Promise<{
  attempt: DiagnosticScoringAttempt;
  promptId: string;
  promptContentVersion: string;
  responseText: string;
  observations: readonly DiagnosticObjectiveObservation[];
} | null> {
  const admin = createAdminClient();
  const [
    { data: attempt, error: attemptError },
    { data: writing, error: writingError },
    { data: responses, error: responsesError },
  ] = await Promise.all([
    admin.from('diagnostic_attempts')
      .select('id,user_id,version,status,bank_version,blueprint_version,engine_version')
      .eq('id', attemptId).maybeSingle(),
    admin.from('diagnostic_writing_evaluations')
      .select('prompt_id,content_version,response_text,status').eq('attempt_id', attemptId).maybeSingle(),
    admin.from('diagnostic_responses')
      .select('item_id,outcome').eq('attempt_id', attemptId),
  ]);
  if (attemptError || writingError || responsesError) throw new Error('diagnostic_persistence_unavailable');
  if (!attempt || !writing) return null;
  if (!Number.isInteger(attempt.version)
    || typeof writing.response_text !== 'string'
    || !['pending', 'automated-scored', 'human-review', 'adjudication'].includes(String(writing.status))
    || !Array.isArray(responses)
    || responses.some(response => !['correct', 'incorrect', 'omitted'].includes(String(response.outcome)))) {
    throw new Error('diagnostic_persistence_unavailable');
  }
  return {
    attempt: {
      id: String(attempt.id), userId: String(attempt.user_id), version: Number(attempt.version),
      status: String(attempt.status), bankVersion: String(attempt.bank_version),
      blueprintVersion: String(attempt.blueprint_version), engineVersion: String(attempt.engine_version),
    },
    promptId: String(writing.prompt_id), promptContentVersion: String(writing.content_version),
    responseText: writing.response_text,
    observations: responses.map(response => ({
      itemId: String(response.item_id), outcome: response.outcome as DiagnosticObjectiveObservation['outcome'],
    })),
  };
}

export async function persistDiagnosticFinalization(
  input: PersistDiagnosticFinalizationInput,
): Promise<{ replayed: boolean; version: number }> {
  const { data, error } = await createAdminClient().rpc('complete_diagnostic_attempt', {
    p_attempt_id: input.attempt.id,
    p_user_id: input.attempt.userId,
    p_expected_attempt_version: input.attempt.version,
    p_automated_evaluation: input.automated,
    p_human_evaluation: input.human,
    p_final_evidence: input.finalEvidence,
    p_result_profile: input.resultProfile,
  });
  if (error || !data || typeof data !== 'object') {
    console.error('[diagnostic] Atomic finalization failed:', error?.message ?? 'invalid RPC result');
    const knownCode = [
      'diagnostic_attempt_not_found', 'diagnostic_writing_not_found',
      'diagnostic_attempt_version_conflict', 'diagnostic_attempt_not_scoring',
      'diagnostic_writing_not_pending', 'diagnostic_finalization_invalid',
    ].find(code => error?.message.includes(code));
    if (knownCode) throw new Error(knownCode);
    throw new Error('diagnostic_persistence_unavailable');
  }
  const result = data as { replayed?: unknown; version?: unknown };
  if (typeof result.replayed !== 'boolean' || !Number.isInteger(result.version)) {
    throw new Error('diagnostic_persistence_unavailable');
  }
  return { replayed: result.replayed, version: Number(result.version) };
}

export async function loadDiagnosticObjectiveSubmissionContext(input: {
  attemptId: string;
  stageId: string;
  userId: string;
}): Promise<{
  attempt: DiagnosticAttemptSnapshot;
  stage: DiagnosticStageReceipt;
  stageIndex: number;
  selectionReceipt: unknown;
  priorObservations: readonly DiagnosticObjectiveObservation[];
  bankVersion: string;
  blueprintVersion: string;
  engineVersion: string;
} | null> {
  const admin = createAdminClient();
  const [
    { data: attempt, error: attemptError },
    { data: stage, error: stageError },
    { data: priorResponses, error: responsesError },
  ] = await Promise.all([
    admin.from('diagnostic_attempts')
      .select('id,user_id,version,status,route_id,expires_at,bank_version,blueprint_version,engine_version')
      .eq('id', input.attemptId).eq('user_id', input.userId).maybeSingle(),
    admin.from('diagnostic_stages')
      .select('id,attempt_id,user_id,stage_index,kind,route_id,status,item_ids,content_versions,selection_receipt,issued_at,completed_at')
      .eq('id', input.stageId).eq('attempt_id', input.attemptId).eq('user_id', input.userId).maybeSingle(),
    admin.from('diagnostic_responses')
      .select('item_id,outcome')
      .eq('attempt_id', input.attemptId).eq('user_id', input.userId).neq('stage_id', input.stageId),
  ]);
  if (attemptError || stageError || responsesError) throw new Error('diagnostic_persistence_unavailable');
  if (!attempt || !stage) return null;
  if (!Number.isInteger(attempt.version) || !Array.isArray(stage.item_ids)
    || !Number.isInteger(stage.stage_index)
    || !stage.content_versions || typeof stage.content_versions !== 'object'
    || !Array.isArray(priorResponses)
    || priorResponses.some(response => !['correct', 'incorrect', 'omitted'].includes(String(response.outcome)))) {
    throw new Error('diagnostic_persistence_unavailable');
  }
  return {
    attempt: {
      id: String(attempt.id),
      userId: String(attempt.user_id),
      version: Number(attempt.version),
      status: attempt.status as DiagnosticAttemptSnapshot['status'],
      routeId: attempt.route_id as DiagnosticAttemptSnapshot['routeId'],
      expiresAt: String(attempt.expires_at),
    },
    stage: {
      stageId: String(stage.id),
      kind: stage.kind as DiagnosticStageReceipt['kind'],
      routeId: stage.route_id as DiagnosticStageReceipt['routeId'],
      itemIds: stage.item_ids.map(String),
      contentVersions: stage.content_versions as Readonly<Record<string, string>>,
      issuedAt: String(stage.issued_at),
      ...(stage.completed_at ? { completedAt: String(stage.completed_at) } : {}),
    },
    stageIndex: Number(stage.stage_index),
    selectionReceipt: stage.selection_receipt,
    priorObservations: priorResponses.map(response => ({
      itemId: String(response.item_id),
      outcome: response.outcome as DiagnosticObjectiveObservation['outcome'],
    })),
    bankVersion: String(attempt.bank_version),
    blueprintVersion: String(attempt.blueprint_version),
    engineVersion: String(attempt.engine_version),
  };
}

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
): Promise<{ replayed: boolean; version: number; nextStage?: PersistObjectiveStageInput['nextStage'] }> {
  const admin = createAdminClient();
  const { data, error } = await admin.rpc('submit_diagnostic_objective_stage', {
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
    p_next_stage_index: input.nextStageIndex,
    p_next_item_ids: [...input.nextStage.itemIds],
    p_next_content_versions: input.nextStage.contentVersions,
    p_next_selection_receipt: input.nextSelectionReceipt,
  });
  if (error || !data || typeof data !== 'object') {
    console.error('[diagnostic] Atomic stage submission failed:', error?.message ?? 'invalid RPC result');
    const knownCode = [
      'diagnostic_stage_already_completed',
      'diagnostic_attempt_version_conflict',
      'diagnostic_attempt_expired',
      'diagnostic_stage_out_of_order',
      'diagnostic_response_binding_invalid',
      'diagnostic_response_count_invalid',
    ].find((code) => error?.message.includes(code));
    if (knownCode) throw new Error(knownCode);
    throw new Error('diagnostic_persistence_unavailable');
  }
  const result = data as { replayed?: unknown; version?: unknown };
  if (typeof result.replayed !== 'boolean' || !Number.isInteger(result.version)) {
    throw new Error('diagnostic_persistence_unavailable');
  }
  if (!result.replayed) return { replayed: false, version: Number(result.version) };

  const { data: row, error: replayError } = await admin
    .from('diagnostic_stages')
    .select('id,kind,route_id,item_ids,content_versions,issued_at,completed_at')
    .eq('attempt_id', input.attempt.id)
    .eq('user_id', input.attempt.userId)
    .eq('stage_index', input.nextStageIndex)
    .maybeSingle();
  if (replayError || !row || row.kind !== input.nextStage.kind || !Array.isArray(row.item_ids)
    || !row.content_versions || typeof row.content_versions !== 'object') {
    throw new Error('diagnostic_persistence_unavailable');
  }
  return {
    replayed: true,
    version: Number(result.version),
    nextStage: {
      stageId: String(row.id),
      kind: row.kind as PersistObjectiveStageInput['nextStage']['kind'],
      routeId: row.route_id as PersistObjectiveStageInput['routeId'],
      itemIds: row.item_ids.map(String),
      contentVersions: row.content_versions as Readonly<Record<string, string>>,
      issuedAt: String(row.issued_at),
      ...(row.completed_at ? { completedAt: String(row.completed_at) } : {}),
    },
  };
}

export async function persistDiagnosticWritingSubmission(
  input: PersistWritingSubmissionInput,
): Promise<{ replayed: boolean; version: number }> {
  const { data, error } = await createAdminClient().rpc('submit_diagnostic_writing_stage', {
    p_attempt_id: input.attempt.id,
    p_stage_id: input.stage.stageId,
    p_user_id: input.attempt.userId,
    p_expected_attempt_version: input.attempt.version,
    p_prompt_id: input.prompt.id,
    p_content_version: input.prompt.contentVersion,
    p_response_text: input.responseText,
    p_response_sha256: input.responseSha256,
    p_word_count: input.wordCount,
  });
  if (error || !data || typeof data !== 'object') {
    console.error('[diagnostic] Atomic writing submission failed:', error?.message ?? 'invalid RPC result');
    const knownCode = [
      'diagnostic_stage_already_completed',
      'diagnostic_attempt_version_conflict',
      'diagnostic_attempt_expired',
      'diagnostic_stage_out_of_order',
      'diagnostic_response_binding_invalid',
      'diagnostic_writing_response_invalid',
    ].find((code) => error?.message.includes(code));
    if (knownCode) throw new Error(knownCode);
    throw new Error('diagnostic_persistence_unavailable');
  }
  const result = data as { replayed?: unknown; version?: unknown };
  if (typeof result.replayed !== 'boolean' || !Number.isInteger(result.version)) {
    throw new Error('diagnostic_persistence_unavailable');
  }
  return { replayed: result.replayed, version: Number(result.version) };
}
