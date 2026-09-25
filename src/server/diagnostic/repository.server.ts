import 'server-only';

import { createAdminClient } from '@/lib/supabase/admin';
import type { DiagnosticStageReceipt } from '@/lib/diagnostic/types';
import type { DiagnosticAttemptSnapshot } from './continue-core';
import type { DiagnosticObjectiveObservation } from './measurement';
import type { PersistDiagnosticAttemptInput } from './start-core';
import type { PersistObjectiveStageInput } from './continue-core';
import type { PersistWritingSubmissionInput } from './writing-submit-core';
import type { DiagnosticScoringAttempt, PersistDiagnosticFinalizationInput } from './finalize-core';
import type { DiagnosticAutomatedWritingEvaluation, DiagnosticHumanWritingEvaluation } from './writing';
import type { DiagnosticExternalWritingAuthorization } from './writing-provider';
import type { DiagnosticResumeSnapshot } from './resume-core';
import { diagnosticWritingResponseSha256, parseDiagnosticWritingEvaluation } from './writing';
import type {
  DiagnosticPilotAttemptRow,
  DiagnosticPilotReferenceRow,
  DiagnosticPilotResponseRow,
  DiagnosticPilotWritingRow,
} from './pilot-analytics';

export interface DiagnosticWritingReviewQueueRow {
  attemptId: string;
  attemptVersion: number;
  routeId: string | null;
  promptId: string;
  promptContentVersion: string;
  responseText: string;
  responseSha256: string;
  wordCount: number;
  status: 'pending' | 'automated-scored' | 'human-review' | 'adjudication';
  automatedEvaluation: DiagnosticAutomatedWritingEvaluation | null;
  humanEvaluation: DiagnosticHumanWritingEvaluation | null;
  createdAt: string;
}

export interface DiagnosticPendingWritingAutomationContext {
  attemptId: string;
  userId: string;
  promptId: string;
  promptContentVersion: string;
  responseText: string;
  authorization: DiagnosticExternalWritingAuthorization;
}

export interface DiagnosticDataDeletionReceipt {
  deletedAttempts: number;
  deletedStages: number;
  deletedResponses: number;
  deletedWritingEvaluations: number;
  deletedEvents: number;
  deletedPilotReferences: number;
  deletedPilotEnrollments: number;
  deletedPilotEnrollmentEvents: number;
  remainingAttempts: 0;
}

export interface DiagnosticPriorExposure {
  objectiveItemIds: readonly string[];
  writingPromptIds: readonly string[];
}

export async function loadDiagnosticPriorExposure(input: {
  userId: string;
  language: 'en';
  since: Date;
  excludeAttemptId?: string;
}): Promise<DiagnosticPriorExposure> {
  if (!input.userId || !Number.isFinite(input.since.getTime())) {
    throw new Error('diagnostic_exposure_query_invalid');
  }
  const admin = createAdminClient();
  let attemptQuery = admin.from('diagnostic_attempts')
    .select('id')
    .eq('user_id', input.userId)
    .eq('language', input.language)
    .gte('started_at', input.since.toISOString())
    .order('started_at', { ascending: false })
    .limit(101);
  if (input.excludeAttemptId) attemptQuery = attemptQuery.neq('id', input.excludeAttemptId);
  const { data: attempts, error: attemptError } = await attemptQuery;
  if (attemptError) throw new Error('diagnostic_exposure_unavailable');
  if ((attempts ?? []).length > 100) throw new Error('diagnostic_exposure_history_too_large');
  const attemptIds = (attempts ?? []).map(row => String(row.id));
  if (!attemptIds.length) return { objectiveItemIds: [], writingPromptIds: [] };
  const { data: stages, error: stageError } = await admin.from('diagnostic_stages')
    .select('kind,item_ids')
    .eq('user_id', input.userId)
    .in('attempt_id', attemptIds)
    .limit(401);
  if (stageError || !Array.isArray(stages) || stages.length > 400) {
    throw new Error('diagnostic_exposure_unavailable');
  }
  const objectiveItemIds = new Set<string>();
  const writingPromptIds = new Set<string>();
  for (const stage of stages) {
    if (!Array.isArray(stage.item_ids)) throw new Error('diagnostic_exposure_unavailable');
    const target = stage.kind === 'writing' ? writingPromptIds : objectiveItemIds;
    stage.item_ids.forEach(itemId => target.add(String(itemId)));
  }
  return {
    objectiveItemIds: [...objectiveItemIds].sort(),
    writingPromptIds: [...writingPromptIds].sort(),
  };
}

export async function hasDiagnosticPilotEnrollment(input: {
  userId: string;
  pilotConsentVersion: string;
}): Promise<boolean> {
  const { data, error } = await createAdminClient().from('diagnostic_pilot_enrollments')
    .select('user_id,status,pilot_consent_version,consented_at')
    .eq('user_id', input.userId)
    .maybeSingle();
  if (error) throw new Error('diagnostic_pilot_enrollment_unavailable');
  return Boolean(data
    && data.status === 'consented'
    && data.pilot_consent_version === input.pilotConsentVersion
    && typeof data.consented_at === 'string'
    && Number.isFinite(Date.parse(data.consented_at))
    && Date.parse(data.consented_at) <= Date.now());
}

export async function deleteDiagnosticUserData(userId: string): Promise<DiagnosticDataDeletionReceipt> {
  const { data, error } = await createAdminClient().rpc('delete_diagnostic_user_data', { p_user_id: userId });
  if (error || !data || typeof data !== 'object' || Array.isArray(data)) {
    throw new Error('diagnostic_deletion_unavailable');
  }
  const receipt = data as Record<string, unknown>;
  const keys = [
    'deletedAttempts', 'deletedStages', 'deletedResponses', 'deletedWritingEvaluations',
    'deletedEvents', 'deletedPilotReferences', 'deletedPilotEnrollments',
    'deletedPilotEnrollmentEvents', 'remainingAttempts',
  ] as const;
  if (keys.some(key => !Number.isInteger(receipt[key]) || Number(receipt[key]) < 0)
    || receipt.remainingAttempts !== 0) {
    throw new Error('diagnostic_deletion_unverified');
  }
  return receipt as unknown as DiagnosticDataDeletionReceipt;
}

export async function persistDiagnosticPilotEnrollment(input: {
  userId: string;
  cohortId: string;
  action: 'invited' | 'consented' | 'revoked' | 'completed';
  pilotConsentVersion: string | null;
  consentedAt: string | null;
  consentReference: string | null;
  actedBy: string;
  reason: string | null;
}): Promise<{ status: string; cohortId: string }> {
  const { data, error } = await createAdminClient().rpc('record_diagnostic_pilot_enrollment', {
    p_user_id: input.userId,
    p_cohort_id: input.cohortId,
    p_action: input.action,
    p_pilot_consent_version: input.pilotConsentVersion,
    p_consented_at: input.consentedAt,
    p_consent_reference: input.consentReference,
    p_acted_by: input.actedBy,
    p_reason: input.reason,
  });
  if (error || !data || typeof data !== 'object' || Array.isArray(data)) {
    const known = [
      'diagnostic_pilot_enrollment_invalid',
      'diagnostic_pilot_enrollment_transition_invalid',
      'foreign key constraint',
    ].find(code => error?.message.includes(code));
    if (known) throw new Error(known);
    throw new Error('diagnostic_pilot_enrollment_unavailable');
  }
  const receipt = data as Record<string, unknown>;
  if (receipt.status !== input.action || receipt.cohortId !== input.cohortId) {
    throw new Error('diagnostic_pilot_enrollment_unverified');
  }
  return { status: input.action, cohortId: input.cohortId };
}

/**
 * Trusted source for a future provider caller. Authorization is loaded with the
 * writing row and can never be supplied or overridden by a browser request.
 */
export async function loadDiagnosticPendingWritingForAutomation(input: {
  attemptId: string;
  userId: string;
}): Promise<DiagnosticPendingWritingAutomationContext | null> {
  const admin = createAdminClient();
  const [
    { data: attempt, error: attemptError },
    { data: writing, error: writingError },
  ] = await Promise.all([
    admin.from('diagnostic_attempts')
      .select('id,user_id,status,external_writing_processing_consent,external_writing_consent_version,external_writing_provider_policy_version,external_writing_consented_at')
      .eq('id', input.attemptId).eq('user_id', input.userId).maybeSingle(),
    admin.from('diagnostic_writing_evaluations')
      .select('attempt_id,user_id,prompt_id,content_version,response_text,status,automated_evaluation')
      .eq('attempt_id', input.attemptId).eq('user_id', input.userId).maybeSingle(),
  ]);
  if (attemptError || writingError) throw new Error('diagnostic_persistence_unavailable');
  if (!attempt || !writing
    || attempt.status !== 'scoring'
    || writing.status !== 'pending'
    || writing.automated_evaluation !== null
    || attempt.external_writing_processing_consent !== true
    || typeof attempt.external_writing_consent_version !== 'string'
    || typeof attempt.external_writing_provider_policy_version !== 'string'
    || typeof attempt.external_writing_consented_at !== 'string'
    || Number.isNaN(Date.parse(attempt.external_writing_consented_at))
    || typeof writing.response_text !== 'string') return null;
  return {
    attemptId: String(attempt.id), userId: String(attempt.user_id),
    promptId: String(writing.prompt_id), promptContentVersion: String(writing.content_version),
    responseText: writing.response_text,
    authorization: {
      externalProcessingConsent: true,
      consentVersion: attempt.external_writing_consent_version,
      providerPolicyVersion: attempt.external_writing_provider_policy_version,
      consentedAt: attempt.external_writing_consented_at,
    },
  };
}

export async function loadDiagnosticWritingReviewQueue(limit = 100): Promise<readonly DiagnosticWritingReviewQueueRow[]> {
  const boundedLimit = Math.max(1, Math.min(250, Math.trunc(limit)));
  const admin = createAdminClient();
  const { data: writingRows, error: writingError } = await admin.from('diagnostic_writing_evaluations')
    .select('attempt_id,prompt_id,content_version,response_text,word_count,status,automated_evaluation,human_evaluation,created_at')
    .in('status', ['pending', 'automated-scored', 'human-review', 'adjudication'])
    .order('created_at', { ascending: true })
    .limit(boundedLimit);
  if (writingError) throw new Error('diagnostic_persistence_unavailable');
  const attemptIds = [...new Set((writingRows ?? []).map(row => String(row.attempt_id)))];
  if (!attemptIds.length) return [];
  const { data: attempts, error: attemptError } = await admin.from('diagnostic_attempts')
    .select('id,version,route_id,status').in('id', attemptIds);
  if (attemptError) throw new Error('diagnostic_persistence_unavailable');
  const attemptsById = new Map((attempts ?? []).map(attempt => [String(attempt.id), attempt]));
  return (writingRows ?? []).flatMap(row => {
    const attempt = attemptsById.get(String(row.attempt_id));
    const automated = row.automated_evaluation === null
      ? null
      : parseDiagnosticWritingEvaluation(row.automated_evaluation, 'automated') as DiagnosticAutomatedWritingEvaluation | null;
    const human = row.human_evaluation === null
      ? null
      : parseDiagnosticWritingEvaluation(row.human_evaluation, 'human') as DiagnosticHumanWritingEvaluation | null;
    const status = String(row.status);
    const coherentState = (status === 'pending' && !automated && !human)
      || (status === 'automated-scored' && Boolean(automated) && !human)
      || (status === 'human-review' && Boolean(human))
      || (status === 'adjudication' && Boolean(human));
    if (!attempt || attempt.status !== 'scoring' || !coherentState
      || (row.human_evaluation !== null && !human)
      || typeof row.response_text !== 'string'
      || !Number.isInteger(row.word_count)
      || !['pending', 'automated-scored', 'human-review', 'adjudication'].includes(status)) return [];
    return [{
      attemptId: String(row.attempt_id), attemptVersion: Number(attempt.version),
      routeId: attempt.route_id ? String(attempt.route_id) : null,
      promptId: String(row.prompt_id), promptContentVersion: String(row.content_version),
      responseText: row.response_text, responseSha256: diagnosticWritingResponseSha256(row.response_text),
      wordCount: Number(row.word_count), status: row.status as DiagnosticWritingReviewQueueRow['status'],
      automatedEvaluation: automated, humanEvaluation: human, createdAt: String(row.created_at),
    }];
  });
}

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
  automatedEvaluation: unknown;
  humanEvaluation: unknown;
  observations: readonly DiagnosticObjectiveObservation[];
} | null> {
  const admin = createAdminClient();
  const [
    { data: attempt, error: attemptError },
    { data: writing, error: writingError },
    { data: responses, error: responsesError },
  ] = await Promise.all([
    admin.from('diagnostic_attempts')
      .select('id,user_id,version,status,bank_version,blueprint_version,engine_version,result_validity_days')
      .eq('id', attemptId).maybeSingle(),
    admin.from('diagnostic_writing_evaluations')
      .select('prompt_id,content_version,response_text,status,automated_evaluation,human_evaluation').eq('attempt_id', attemptId).maybeSingle(),
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
      resultValidityDays: Number(attempt.result_validity_days),
    },
    promptId: String(writing.prompt_id), promptContentVersion: String(writing.content_version),
    responseText: writing.response_text,
    automatedEvaluation: writing.automated_evaluation,
    humanEvaluation: writing.human_evaluation,
    observations: responses.map(response => ({
      itemId: String(response.item_id), outcome: response.outcome as DiagnosticObjectiveObservation['outcome'],
    })),
  };
}

export async function persistDiagnosticAutomatedWritingEvaluation(input: {
  attemptId: string;
  userId: string;
  evaluation: DiagnosticAutomatedWritingEvaluation;
}): Promise<{ replayed: boolean }> {
  const { data, error } = await createAdminClient().rpc('record_diagnostic_automated_writing_evaluation', {
    p_attempt_id: input.attemptId,
    p_user_id: input.userId,
    p_automated_evaluation: input.evaluation,
  });
  if (error || !data || typeof data !== 'object') {
    const knownCode = [
      'diagnostic_attempt_not_found', 'diagnostic_attempt_not_scoring', 'diagnostic_writing_not_found',
      'diagnostic_writing_not_pending', 'diagnostic_automated_evaluation_invalid',
      'diagnostic_automated_evaluation_conflict',
    ].find(code => error?.message.includes(code));
    if (knownCode) throw new Error(knownCode);
    throw new Error('diagnostic_persistence_unavailable');
  }
  const result = data as { replayed?: unknown };
  if (typeof result.replayed !== 'boolean') throw new Error('diagnostic_persistence_unavailable');
  return { replayed: result.replayed };
}

export async function persistDiagnosticHumanWritingEvaluation(input: {
  attemptId: string;
  userId: string;
  evaluation: DiagnosticHumanWritingEvaluation;
  nextStatus: 'human-review' | 'adjudication';
}): Promise<{ replayed: boolean; status: 'human-review' | 'adjudication' }> {
  const { data, error } = await createAdminClient().rpc('record_diagnostic_human_writing_evaluation', {
    p_attempt_id: input.attemptId,
    p_user_id: input.userId,
    p_human_evaluation: input.evaluation,
    p_next_status: input.nextStatus,
  });
  if (error || !data || typeof data !== 'object') {
    const knownCode = [
      'diagnostic_attempt_not_found', 'diagnostic_attempt_not_scoring', 'diagnostic_writing_not_found',
      'diagnostic_automated_evaluation_missing', 'diagnostic_human_evaluation_invalid',
      'diagnostic_human_evaluation_conflict', 'diagnostic_writing_not_ready_for_human_review',
    ].find(code => error?.message.includes(code));
    if (knownCode) throw new Error(knownCode);
    throw new Error('diagnostic_persistence_unavailable');
  }
  const result = data as { replayed?: unknown; status?: unknown };
  if (typeof result.replayed !== 'boolean' || !['human-review', 'adjudication'].includes(String(result.status))) {
    throw new Error('diagnostic_persistence_unavailable');
  }
  return { replayed: result.replayed, status: result.status as 'human-review' | 'adjudication' };
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
  exposureLookbackDays: number;
} | null> {
  const admin = createAdminClient();
  const [
    { data: attempt, error: attemptError },
    { data: stage, error: stageError },
    { data: priorResponses, error: responsesError },
  ] = await Promise.all([
    admin.from('diagnostic_attempts')
      .select('id,user_id,version,status,route_id,expires_at,bank_version,blueprint_version,engine_version,exposure_lookback_days')
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
  if (!Number.isInteger(attempt.version) || !Number.isInteger(attempt.exposure_lookback_days)
    || attempt.exposure_lookback_days < 1 || attempt.exposure_lookback_days > 730
    || !Array.isArray(stage.item_ids)
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
    exposureLookbackDays: Number(attempt.exposure_lookback_days),
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
    p_consent_version: input.consentVersion,
    p_consented_at: input.consentedAt,
    p_delivery_policy_version: input.deliveryPolicyVersion,
    p_access_mode: input.accessMode,
    p_minimum_days_between_completed: input.minimumDaysBetweenCompletedAttempts,
    p_maximum_concurrent_active: input.maximumConcurrentActiveAttempts,
    p_exposure_lookback_days: input.exposureLookbackDays,
    p_result_validity_days: input.resultValidityDays,
    p_selection_seed_hash: input.selectionSeedHash,
    p_expires_at: input.expiresAt,
    p_stage_id: input.stage.stageId,
    p_item_ids: [...input.stage.itemIds],
    p_content_versions: input.stage.contentVersions,
    p_selection_receipt: input.selectionReceipt,
  });
  if (error) {
    console.error('[diagnostic] Atomic attempt creation failed:', error.message);
    const known = ['diagnostic_attempt_active_limit', 'diagnostic_attempt_cooldown']
      .find(code => error.message.includes(code));
    if (known) throw new Error(known);
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

async function loadDiagnosticPilotPages(
  table: string,
  columns: string,
  configure: (query: any) => any,
): Promise<Record<string, any>[]> {
  const admin = createAdminClient();
  const rows: Record<string, any>[] = [];
  const pageSize = 1_000;
  for (let from = 0; ; from += pageSize) {
    const query = configure(admin.from(table).select(columns)).range(from, from + pageSize - 1);
    const { data, error } = await query;
    if (error || !Array.isArray(data)) throw new Error('diagnostic_pilot_data_unavailable');
    rows.push(...data);
    if (data.length < pageSize) return rows;
  }
}

async function loadDiagnosticPilotRowsForAttempts(
  table: string,
  columns: string,
  attemptIds: readonly string[],
): Promise<Record<string, any>[]> {
  const rows: Record<string, any>[] = [];
  for (let index = 0; index < attemptIds.length; index += 100) {
    const chunk = attemptIds.slice(index, index + 100);
    rows.push(...await loadDiagnosticPilotPages(table, columns, query => query.in('attempt_id', chunk)));
  }
  return rows;
}

export async function loadDiagnosticPilotDataset(input: {
  language: string;
  since: Date;
}): Promise<{
  attempts: DiagnosticPilotAttemptRow[];
  responses: DiagnosticPilotResponseRow[];
  writing: DiagnosticPilotWritingRow[];
  references: DiagnosticPilotReferenceRow[];
}> {
  const attemptRows = await loadDiagnosticPilotPages(
    'diagnostic_attempts',
    'id,status,route_id,bank_version,started_at,updated_at,completed_at,result_profile',
    query => query.eq('language', input.language).gte('started_at', input.since.toISOString()).order('started_at', { ascending: true }),
  );
  const attempts = attemptRows.map(row => ({
    attemptId: String(row.id), status: String(row.status), routeId: row.route_id ? String(row.route_id) : null,
    bankVersion: String(row.bank_version), startedAt: String(row.started_at), updatedAt: String(row.updated_at),
    completedAt: row.completed_at ? String(row.completed_at) : null,
  }));
  const attemptIds = attempts.map(row => row.attemptId);
  if (!attemptIds.length) return { attempts, responses: [], writing: [], references: [] };
  const [responseRows, writingRows, referenceRows] = await Promise.all([
    loadDiagnosticPilotRowsForAttempts(
      'diagnostic_responses',
      'attempt_id,item_id,content_version,skill,outcome,submitted_response,response_ms,audio_play_count',
      attemptIds,
    ),
    loadDiagnosticPilotRowsForAttempts(
      'diagnostic_writing_evaluations',
      'attempt_id,prompt_id,content_version,status,final_evidence',
      attemptIds,
    ),
    loadDiagnosticPilotRowsForAttempts(
      'diagnostic_pilot_references',
      'attempt_id,reference_level,source',
      attemptIds,
    ),
  ]);
  const responses: DiagnosticPilotResponseRow[] = responseRows.map(row => ({
    attemptId: String(row.attempt_id), itemId: String(row.item_id), contentVersion: String(row.content_version),
    skill: String(row.skill), outcome: row.outcome as DiagnosticPilotResponseRow['outcome'],
    submittedResponse: row.submitted_response, responseMs: row.response_ms === null ? null : Number(row.response_ms),
    audioPlayCount: row.audio_play_count === null ? null : Number(row.audio_play_count),
  }));
  const writing: DiagnosticPilotWritingRow[] = writingRows.map(row => {
    const finalEvidence = row.final_evidence && typeof row.final_evidence === 'object' && !Array.isArray(row.final_evidence)
      ? row.final_evidence as Record<string, any> : {};
    const evidence = finalEvidence.writing && typeof finalEvidence.writing === 'object' ? finalEvidence.writing as Record<string, any> : {};
    const agreement = evidence.agreement && typeof evidence.agreement === 'object' ? evidence.agreement as Record<string, any> : {};
    return {
      attemptId: String(row.attempt_id), promptId: String(row.prompt_id),
      contentVersion: String(row.content_version), status: String(row.status),
      exactAgreement: typeof agreement.exactAgreement === 'number' ? agreement.exactAgreement : null,
      meanAbsoluteLevelDifference: typeof agreement.meanAbsoluteLevelDifference === 'number' ? agreement.meanAbsoluteLevelDifference : null,
      requiresAdjudication: typeof agreement.requiresAdjudication === 'boolean' ? agreement.requiresAdjudication : null,
    };
  });
  const attemptById = new Map(attemptRows.map(row => [String(row.id), row]));
  const references: DiagnosticPilotReferenceRow[] = referenceRows.flatMap(row => {
    const attempt = attemptById.get(String(row.attempt_id));
    const profile = attempt?.result_profile && typeof attempt.result_profile === 'object' && !Array.isArray(attempt.result_profile)
      ? attempt.result_profile as Record<string, any> : {};
    const diagnosticLevel = typeof profile.globalLevel === 'string' ? profile.globalLevel : null;
    if (!diagnosticLevel) return [];
    return [{
      attemptId: String(row.attempt_id), diagnosticLevel: diagnosticLevel as DiagnosticPilotReferenceRow['diagnosticLevel'],
      referenceLevel: String(row.reference_level) as DiagnosticPilotReferenceRow['referenceLevel'],
      source: String(row.source) as DiagnosticPilotReferenceRow['source'],
    }];
  });
  return { attempts, responses, writing, references };
}

export async function persistDiagnosticPilotReference(input: {
  attemptId: string;
  referenceLevel: string;
  source: string;
  sourceVersion: string;
  assessorRefHash: string;
  assessedAt: string;
  recordedBy: string;
}): Promise<void> {
  const { data, error } = await createAdminClient().rpc('record_diagnostic_pilot_reference', {
    p_attempt_id: input.attemptId,
    p_reference_level: input.referenceLevel,
    p_source: input.source,
    p_source_version: input.sourceVersion,
    p_assessor_ref_hash: input.assessorRefHash,
    p_assessed_at: input.assessedAt,
    p_recorded_by: input.recordedBy,
  });
  if (error || String(data) !== input.attemptId) {
    const known = [
      'diagnostic_attempt_not_found',
      'diagnostic_reference_attempt_not_eligible',
      'diagnostic_reference_invalid',
      'duplicate key value',
    ].find(code => error?.message.includes(code));
    if (known) throw new Error(known);
    throw new Error('diagnostic_persistence_unavailable');
  }
}
