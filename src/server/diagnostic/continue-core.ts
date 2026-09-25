import { createHash, createHmac } from 'node:crypto';

import type {
  DiagnosticItemSubmission,
  DiagnosticStageDelivery,
  DiagnosticWritingStageDelivery,
} from '../../lib/diagnostic/delivery.ts';
import type { DiagnosticWritingPromptRecord } from '../../lib/diagnostic/writing.ts';
import {
  CEFR_LEVELS,
  type CefrLevel,
  type DiagnosticObjectiveSkill,
  type DiagnosticRouteId,
  type DiagnosticStageReceipt,
} from '../../lib/diagnostic/types.ts';
import {
  assertDiagnosticAttemptAccess,
  diagnosticSubmissionDigest,
  locatorDecisionFromResponses,
  scoreDiagnosticStage,
  type DiagnosticAttemptStatus,
  type DiagnosticScoredSubmission,
} from './attempt.ts';
import { toDiagnosticPublicItem } from './scoring.ts';
import {
  auditEnglishMstCapacity,
  selectEnglishConfirmationStage,
  selectEnglishPrecisionStage,
} from './selection.ts';
import { DiagnosticStartError } from './start-core.ts';
import type { DiagnosticBankRecord } from './types.ts';
import {
  ENGLISH_PILOT_CALIBRATION,
  estimateObjectiveSkillEvidence,
  type DiagnosticMeasuredSkillEvidence,
  type DiagnosticObjectiveObservation,
} from './measurement.ts';
import { selectDiagnosticWritingPrompt } from './writing.ts';

export interface DiagnosticAttemptSnapshot {
  id: string;
  userId: string;
  version: number;
  status: DiagnosticAttemptStatus;
  routeId: 'low-a1-a2' | 'mid-b1-b2' | 'high-c1-c2' | null;
  expiresAt: string;
}

export interface PersistObjectiveStageInput {
  attempt: DiagnosticAttemptSnapshot;
  stage: DiagnosticStageReceipt;
  submissionDigest: string;
  scoredResponses: readonly DiagnosticScoredSubmission[];
  nextStatus: 'precision' | 'confirmation' | 'writing';
  routeId: 'low-a1-a2' | 'mid-b1-b2' | 'high-c1-c2';
  nextStage: DiagnosticStageReceipt;
  nextStageIndex: number;
  nextSelectionReceipt: unknown;
}

export interface ContinueLocatorDependencies {
  bank: readonly DiagnosticBankRecord[];
  selectionSecret: string;
  now: () => Date;
  newId: () => string;
  excludedObjectiveItemIds?: ReadonlySet<string>;
  excludedWritingPromptIds?: ReadonlySet<string>;
  persist: (input: PersistObjectiveStageInput) => Promise<{
    replayed: boolean;
    version: number;
    nextStage?: DiagnosticStageReceipt;
  }>;
}

function precisionSeed(secret: string, attemptId: string, routeId: string): string {
  return createHmac('sha256', secret).update(`${attemptId}\u0000precision\u0000${routeId}`).digest('hex');
}

function writingSeed(secret: string, attemptId: string, level: CefrLevel): string {
  return createHmac('sha256', secret).update(`${attemptId}\u0000writing\u0000${level}`).digest('hex');
}

function confirmationSeed(secret: string, attemptId: string, routeId: DiagnosticRouteId): string {
  return createHmac('sha256', secret).update(`${attemptId}\u0000confirmation\u0000${routeId}`).digest('hex');
}

function selectWritingLevel(
  routeId: DiagnosticRouteId,
  evidence: readonly DiagnosticMeasuredSkillEvidence[],
): CefrLevel {
  const routeLevels: Readonly<Record<DiagnosticRouteId, readonly [CefrLevel, CefrLevel]>> = {
    'low-a1-a2': ['A1', 'A2'],
    'mid-b1-b2': ['B1', 'B2'],
    'high-c1-c2': ['C1', 'C2'],
  };
  const candidates = evidence.flatMap(item => item.estimatedLevel ? [CEFR_LEVELS.indexOf(item.estimatedLevel)] : []);
  if (!candidates.length) return routeLevels[routeId][0];
  const average = candidates.reduce((sum, value) => sum + value, 0) / candidates.length;
  return [...routeLevels[routeId]].sort((a, b) => {
    const distance = Math.abs(CEFR_LEVELS.indexOf(a) - average) - Math.abs(CEFR_LEVELS.indexOf(b) - average);
    return distance || CEFR_LEVELS.indexOf(a) - CEFR_LEVELS.indexOf(b);
  })[0];
}

export async function continueEnglishDiagnosticLocator(input: {
  authenticatedUserId: string;
  attempt: DiagnosticAttemptSnapshot;
  stage: DiagnosticStageReceipt;
  stageRecords: readonly DiagnosticBankRecord[];
  submissions: readonly DiagnosticItemSubmission[];
}, dependencies: ContinueLocatorDependencies): Promise<{
  delivery: DiagnosticStageDelivery;
  routeDecision: ReturnType<typeof locatorDecisionFromResponses>;
}> {
  if (dependencies.selectionSecret.length < 32) {
    throw new DiagnosticStartError('SERVER_CONFIGURATION_INVALID', 'diagnostic selection secret must contain at least 32 characters');
  }
  assertDiagnosticAttemptAccess(input.attempt, input.authenticatedUserId, dependencies.now());
  const firstSubmission = input.attempt.status === 'locator' && !input.stage.completedAt;
  const idempotentReplay = input.attempt.status === 'precision' && Boolean(input.stage.completedAt);
  if ((!firstSubmission && !idempotentReplay) || input.stage.kind !== 'locator' || input.stage.stageId.length < 1) {
    throw new Error('diagnostic locator stage is out of order');
  }
  const deficits = auditEnglishMstCapacity(dependencies.bank);
  if (deficits.length) throw new DiagnosticStartError('BANK_NOT_READY', `diagnostic objective bank has ${deficits.length} capacity deficits`);

  const scoredResponses = scoreDiagnosticStage(input.stage, input.stageRecords, input.submissions);
  const routeDecision = locatorDecisionFromResponses(input.stageRecords, scoredResponses);
  const seed = precisionSeed(dependencies.selectionSecret, input.attempt.id, routeDecision.routeId);
  const precision = selectEnglishPrecisionStage(
    dependencies.bank,
    routeDecision.routeId,
    seed,
    new Set([...(dependencies.excludedObjectiveItemIds ?? []), ...input.stage.itemIds]),
  );
  const nextStage: DiagnosticStageReceipt = {
    stageId: dependencies.newId(),
    kind: 'precision',
    routeId: routeDecision.routeId,
    itemIds: precision.records.map(record => record.publicItem.id),
    contentVersions: Object.fromEntries(precision.records.map(record => [record.publicItem.id, record.publicItem.contentVersion])),
    issuedAt: dependencies.now().toISOString(),
  };
  const persisted = await dependencies.persist({
    attempt: input.attempt,
    stage: input.stage,
    submissionDigest: diagnosticSubmissionDigest(input.submissions),
    scoredResponses,
    nextStatus: 'precision',
    routeId: routeDecision.routeId,
    nextStage,
    nextStageIndex: 1,
    nextSelectionReceipt: {
      ...precision.receipt,
      locator: routeDecision,
      seedHash: createHash('sha256').update(seed).digest('hex'),
    },
  });
  const deliveredStage = persisted.replayed ? persisted.nextStage : nextStage;
  if (!deliveredStage) throw new Error('diagnostic locator replay requires the persisted next-stage receipt');
  if (deliveredStage.kind !== 'precision'
    || deliveredStage.routeId !== routeDecision.routeId
    || deliveredStage.itemIds.join('|') !== precision.receipt.itemIds.join('|')
    || deliveredStage.itemIds.some((itemId) => deliveredStage.contentVersions[itemId]
      !== precision.records.find((record) => record.publicItem.id === itemId)?.publicItem.contentVersion)) {
    throw new Error('diagnostic persisted precision stage does not match the current bank');
  }
  return {
    delivery: {
      attemptId: input.attempt.id,
      attemptVersion: persisted.version,
      expiresAt: input.attempt.expiresAt,
      stage: deliveredStage,
      items: precision.records.map(toDiagnosticPublicItem),
    },
    routeDecision,
  };
}

export interface ContinuePrecisionDependencies extends ContinueLocatorDependencies {
  writingBank: readonly DiagnosticWritingPromptRecord[];
  writingBankVersion: string;
}

function objectiveEvidenceFromObservations(
  bank: readonly DiagnosticBankRecord[],
  observations: readonly DiagnosticObjectiveObservation[],
): readonly DiagnosticMeasuredSkillEvidence[] {
  if (new Set(observations.map(item => item.itemId)).size !== observations.length) {
    throw new Error('diagnostic objective evidence contains duplicate observations');
  }
  const records = new Map(bank.map(record => [record.publicItem.id, record]));
  if (observations.some(observation => !records.has(observation.itemId))) {
    throw new Error('diagnostic objective evidence contains an item outside the versioned bank');
  }
  const skills: readonly DiagnosticObjectiveSkill[] = ['reading', 'listening', 'grammar', 'vocabulary'];
  return skills.map(skill => estimateObjectiveSkillEvidence(
    skill,
    bank,
    observations.filter(observation => records.get(observation.itemId)?.publicItem.skill === skill),
    ENGLISH_PILOT_CALIBRATION,
  ));
}

export function needsEnglishDiagnosticConfirmation(
  evidence: readonly DiagnosticMeasuredSkillEvidence[],
  locatorRequestedConfirmation: boolean,
): { required: boolean; reasons: readonly string[] } {
  const reasons: string[] = [];
  if (evidence.some(skill => skill.status === 'not-estimated')) reasons.push('INSUFFICIENT_SKILL_EVIDENCE');
  const indexes = evidence.flatMap(skill => skill.estimatedLevel ? [CEFR_LEVELS.indexOf(skill.estimatedLevel)] : []);
  if (indexes.length && Math.max(...indexes) - Math.min(...indexes) >= 2) reasons.push('UNEVEN_OBJECTIVE_PROFILE');
  if (locatorRequestedConfirmation && evidence.some(skill => {
    if (!skill.plausibleRange) return true;
    return CEFR_LEVELS.indexOf(skill.plausibleRange[1]) - CEFR_LEVELS.indexOf(skill.plausibleRange[0]) >= 2;
  })) reasons.push('LOCATOR_BOUNDARY_UNRESOLVED');
  return { required: reasons.length > 0, reasons };
}

async function persistWritingStage(input: {
  attempt: DiagnosticAttemptSnapshot;
  stage: DiagnosticStageReceipt;
  submissions: readonly DiagnosticItemSubmission[];
  scoredResponses: readonly DiagnosticScoredSubmission[];
  objectiveEvidence: readonly DiagnosticMeasuredSkillEvidence[];
  nextStageIndex: number;
}, dependencies: ContinuePrecisionDependencies): Promise<DiagnosticWritingStageDelivery> {
  if (!input.attempt.routeId) throw new Error('diagnostic route is required before writing');
  const promptLevel = selectWritingLevel(input.attempt.routeId, input.objectiveEvidence);
  const seed = writingSeed(dependencies.selectionSecret, input.attempt.id, promptLevel);
  const prompt = selectDiagnosticWritingPrompt(
    dependencies.writingBank, 'en', promptLevel, seed, dependencies.excludedWritingPromptIds,
  );
  const nextStage: DiagnosticStageReceipt & { kind: 'writing' } = {
    stageId: dependencies.newId(),
    kind: 'writing',
    routeId: input.attempt.routeId,
    itemIds: [prompt.id],
    contentVersions: { [prompt.id]: prompt.contentVersion },
    issuedAt: dependencies.now().toISOString(),
  };
  const persisted = await dependencies.persist({
    attempt: input.attempt,
    stage: input.stage,
    submissionDigest: diagnosticSubmissionDigest(input.submissions),
    scoredResponses: input.scoredResponses,
    nextStatus: 'writing',
    routeId: input.attempt.routeId,
    nextStage,
    nextStageIndex: input.nextStageIndex,
    nextSelectionReceipt: {
      stage: 'writing',
      promptId: prompt.id,
      promptLevel,
      writingBankVersion: dependencies.writingBankVersion,
      seedHash: createHash('sha256').update(seed).digest('hex'),
      objectiveEvidence: input.objectiveEvidence,
    },
  });
  const deliveredStage = persisted.replayed ? persisted.nextStage : nextStage;
  if (!deliveredStage) throw new Error('diagnostic objective replay requires the persisted writing-stage receipt');
  if (deliveredStage.kind !== 'writing'
    || deliveredStage.routeId !== input.attempt.routeId
    || deliveredStage.itemIds.length !== 1
    || deliveredStage.itemIds[0] !== prompt.id
    || deliveredStage.contentVersions[prompt.id] !== prompt.contentVersion) {
    throw new Error('diagnostic persisted writing stage does not match the current prompt bank');
  }
  return {
    attemptId: input.attempt.id,
    attemptVersion: persisted.version,
    expiresAt: input.attempt.expiresAt,
    stage: deliveredStage as DiagnosticStageReceipt & { kind: 'writing' },
    prompt,
  };
}

export async function continueEnglishDiagnosticPrecision(input: {
  authenticatedUserId: string;
  attempt: DiagnosticAttemptSnapshot;
  stage: DiagnosticStageReceipt;
  stageRecords: readonly DiagnosticBankRecord[];
  priorObservations: readonly DiagnosticObjectiveObservation[];
  locatorRequestedConfirmation?: boolean;
  submissions: readonly DiagnosticItemSubmission[];
}, dependencies: ContinuePrecisionDependencies): Promise<{
  delivery: DiagnosticStageDelivery | DiagnosticWritingStageDelivery;
  objectiveEvidence: readonly DiagnosticMeasuredSkillEvidence[];
  confirmationDecision: ReturnType<typeof needsEnglishDiagnosticConfirmation>;
}> {
  if (dependencies.selectionSecret.length < 32) {
    throw new DiagnosticStartError('SERVER_CONFIGURATION_INVALID', 'diagnostic selection secret must contain at least 32 characters');
  }
  assertDiagnosticAttemptAccess(input.attempt, input.authenticatedUserId, dependencies.now());
  const firstSubmission = input.attempt.status === 'precision' && !input.stage.completedAt;
  const idempotentReplay = input.attempt.status === 'writing' && Boolean(input.stage.completedAt);
  if ((!firstSubmission && !idempotentReplay)
    || input.stage.kind !== 'precision'
    || !input.attempt.routeId
    || input.stage.routeId !== input.attempt.routeId
    || input.stage.stageId.length < 1) {
    throw new Error('diagnostic precision stage is out of order');
  }

  const scoredResponses = scoreDiagnosticStage(input.stage, input.stageRecords, input.submissions);
  const observations = [
    ...input.priorObservations,
    ...scoredResponses.map(response => ({ itemId: response.itemId, outcome: response.outcome })),
  ];
  const objectiveEvidence = objectiveEvidenceFromObservations(dependencies.bank, observations);
  const confirmationDecision = needsEnglishDiagnosticConfirmation(
    objectiveEvidence,
    input.locatorRequestedConfirmation ?? false,
  );
  if (confirmationDecision.required) {
    const seed = confirmationSeed(dependencies.selectionSecret, input.attempt.id, input.attempt.routeId);
    const confirmation = selectEnglishConfirmationStage(
      dependencies.bank,
      input.attempt.routeId,
      seed,
      new Set([
        ...(dependencies.excludedObjectiveItemIds ?? []),
        ...observations.map(observation => observation.itemId),
      ]),
    );
    const nextStage: DiagnosticStageReceipt = {
      stageId: dependencies.newId(), kind: 'confirmation', routeId: input.attempt.routeId,
      itemIds: confirmation.records.map(record => record.publicItem.id),
      contentVersions: Object.fromEntries(confirmation.records.map(record => [record.publicItem.id, record.publicItem.contentVersion])),
      issuedAt: dependencies.now().toISOString(),
    };
    const persisted = await dependencies.persist({
      attempt: input.attempt, stage: input.stage,
      submissionDigest: diagnosticSubmissionDigest(input.submissions), scoredResponses,
      nextStatus: 'confirmation', routeId: input.attempt.routeId, nextStage, nextStageIndex: 2,
      nextSelectionReceipt: {
        ...confirmation.receipt, reasons: confirmationDecision.reasons,
        seedHash: createHash('sha256').update(seed).digest('hex'), objectiveEvidence,
      },
    });
    const deliveredStage = persisted.replayed ? persisted.nextStage : nextStage;
    if (!deliveredStage || deliveredStage.kind !== 'confirmation'
      || deliveredStage.itemIds.join('|') !== confirmation.receipt.itemIds.join('|')) {
      throw new Error('diagnostic persisted confirmation stage does not match the current bank');
    }
    return {
      delivery: {
        attemptId: input.attempt.id, attemptVersion: persisted.version, expiresAt: input.attempt.expiresAt,
        stage: deliveredStage, items: confirmation.records.map(toDiagnosticPublicItem),
      },
      objectiveEvidence,
      confirmationDecision,
    };
  }
  return {
    delivery: await persistWritingStage({
      attempt: input.attempt, stage: input.stage, submissions: input.submissions, scoredResponses,
      objectiveEvidence, nextStageIndex: 2,
    }, dependencies),
    objectiveEvidence,
    confirmationDecision,
  };
}

export async function continueEnglishDiagnosticConfirmation(input: {
  authenticatedUserId: string;
  attempt: DiagnosticAttemptSnapshot;
  stage: DiagnosticStageReceipt;
  stageRecords: readonly DiagnosticBankRecord[];
  priorObservations: readonly DiagnosticObjectiveObservation[];
  submissions: readonly DiagnosticItemSubmission[];
}, dependencies: ContinuePrecisionDependencies): Promise<{
  delivery: DiagnosticWritingStageDelivery;
  objectiveEvidence: readonly DiagnosticMeasuredSkillEvidence[];
}> {
  if (dependencies.selectionSecret.length < 32) {
    throw new DiagnosticStartError('SERVER_CONFIGURATION_INVALID', 'diagnostic selection secret must contain at least 32 characters');
  }
  assertDiagnosticAttemptAccess(input.attempt, input.authenticatedUserId, dependencies.now());
  const firstSubmission = input.attempt.status === 'confirmation' && !input.stage.completedAt;
  const idempotentReplay = input.attempt.status === 'writing' && Boolean(input.stage.completedAt);
  if ((!firstSubmission && !idempotentReplay)
    || input.stage.kind !== 'confirmation'
    || !input.attempt.routeId
    || input.stage.routeId !== input.attempt.routeId) {
    throw new Error('diagnostic confirmation stage is out of order');
  }
  const scoredResponses = scoreDiagnosticStage(input.stage, input.stageRecords, input.submissions);
  const observations = [
    ...input.priorObservations,
    ...scoredResponses.map(response => ({ itemId: response.itemId, outcome: response.outcome })),
  ];
  const objectiveEvidence = objectiveEvidenceFromObservations(dependencies.bank, observations);
  return {
    delivery: await persistWritingStage({
      attempt: input.attempt, stage: input.stage, submissions: input.submissions, scoredResponses,
      objectiveEvidence, nextStageIndex: 3,
    }, dependencies),
    objectiveEvidence,
  };
}
