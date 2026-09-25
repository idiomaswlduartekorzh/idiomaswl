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
import { auditEnglishMstCapacity, selectEnglishPrecisionStage } from './selection.ts';
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
  nextStatus: 'precision' | 'writing';
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
    new Set(input.stage.itemIds),
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

export async function continueEnglishDiagnosticPrecision(input: {
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
  if (new Set(observations.map(item => item.itemId)).size !== observations.length) {
    throw new Error('diagnostic objective evidence contains duplicate observations');
  }
  const skills: readonly DiagnosticObjectiveSkill[] = ['reading', 'listening', 'grammar', 'vocabulary'];
  const objectiveEvidence = skills.map(skill => estimateObjectiveSkillEvidence(
    skill,
    dependencies.bank,
    observations.filter(observation => dependencies.bank.find(record =>
      record.publicItem.id === observation.itemId && record.publicItem.skill === skill)),
    ENGLISH_PILOT_CALIBRATION,
  ));
  const promptLevel = selectWritingLevel(input.attempt.routeId, objectiveEvidence);
  const seed = writingSeed(dependencies.selectionSecret, input.attempt.id, promptLevel);
  const prompt = selectDiagnosticWritingPrompt(dependencies.writingBank, 'en', promptLevel, seed);
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
    scoredResponses,
    nextStatus: 'writing',
    routeId: input.attempt.routeId,
    nextStage,
    nextStageIndex: 2,
    nextSelectionReceipt: {
      stage: 'writing',
      promptId: prompt.id,
      promptLevel,
      writingBankVersion: dependencies.writingBankVersion,
      seedHash: createHash('sha256').update(seed).digest('hex'),
      objectiveEvidence,
    },
  });
  const deliveredStage = persisted.replayed ? persisted.nextStage : nextStage;
  if (!deliveredStage) throw new Error('diagnostic precision replay requires the persisted writing-stage receipt');
  if (deliveredStage.kind !== 'writing'
    || deliveredStage.routeId !== input.attempt.routeId
    || deliveredStage.itemIds.length !== 1
    || deliveredStage.itemIds[0] !== prompt.id
    || deliveredStage.contentVersions[prompt.id] !== prompt.contentVersion) {
    throw new Error('diagnostic persisted writing stage does not match the current prompt bank');
  }
  return {
    delivery: {
      attemptId: input.attempt.id,
      attemptVersion: persisted.version,
      expiresAt: input.attempt.expiresAt,
      stage: deliveredStage as DiagnosticStageReceipt & { kind: 'writing' },
      prompt,
    },
    objectiveEvidence,
  };
}
