import { createHash, createHmac } from 'node:crypto';

import type {
  DiagnosticItemSubmission,
  DiagnosticStageDelivery,
} from '../../lib/diagnostic/delivery.ts';
import type { DiagnosticStageReceipt } from '../../lib/diagnostic/types.ts';
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
  nextStatus: 'precision';
  routeId: 'low-a1-a2' | 'mid-b1-b2' | 'high-c1-c2';
  nextStage: DiagnosticStageReceipt;
  nextSelectionReceipt: unknown;
}

export interface ContinueLocatorDependencies {
  bank: readonly DiagnosticBankRecord[];
  selectionSecret: string;
  now: () => Date;
  newId: () => string;
  persist: (input: PersistObjectiveStageInput) => Promise<{ replayed: boolean; version: number }>;
}

function precisionSeed(secret: string, attemptId: string, routeId: string): string {
  return createHmac('sha256', secret).update(`${attemptId}\u0000precision\u0000${routeId}`).digest('hex');
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
  if (input.attempt.status !== 'locator' || input.stage.kind !== 'locator' || input.stage.stageId.length < 1) {
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
    nextSelectionReceipt: {
      ...precision.receipt,
      locator: routeDecision,
      seedHash: createHash('sha256').update(seed).digest('hex'),
    },
  });
  if (persisted.replayed) throw new Error('diagnostic locator replay requires the persisted next-stage receipt');
  return {
    delivery: {
      attemptId: input.attempt.id,
      attemptVersion: persisted.version,
      expiresAt: input.attempt.expiresAt,
      stage: nextStage,
      items: precision.records.map(toDiagnosticPublicItem),
    },
    routeDecision,
  };
}

