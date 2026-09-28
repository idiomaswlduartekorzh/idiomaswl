import { createHash, createHmac } from 'node:crypto';

import { ENGLISH_DIAGNOSTIC_BLUEPRINT } from '../../lib/diagnostic/blueprint.ts';
import { DIAGNOSTIC_ENGINE_VERSION, type DiagnosticStageDelivery } from '../../lib/diagnostic/delivery.ts';
import type { DiagnosticStageReceipt } from '../../lib/diagnostic/types.ts';
import type { DiagnosticAccessMode } from './delivery-policy.ts';
import { toDiagnosticPublicItem } from './scoring.ts';
import { auditEnglishMstCapacity, selectEnglishLocator } from './selection.ts';
import type { DiagnosticBankRecord } from './types.ts';

export type DiagnosticStartErrorCode =
  | 'BANK_NOT_READY'
  | 'SERVER_CONFIGURATION_INVALID'
  | 'PERSISTENCE_UNAVAILABLE';

export class DiagnosticStartError extends Error {
  readonly code: DiagnosticStartErrorCode;

  constructor(code: DiagnosticStartErrorCode, message: string) {
    super(message);
    this.code = code;
    this.name = 'DiagnosticStartError';
  }
}

export interface PersistDiagnosticAttemptInput {
  attemptId: string;
  userId: string;
  language: 'en';
  blueprintVersion: string;
  bankVersion: string;
  engineVersion: string;
  consentVersion: string;
  consentedAt: string;
  deliveryPolicyVersion: string;
  accessMode: DiagnosticAccessMode;
  minimumDaysBetweenCompletedAttempts: number;
  maximumConcurrentActiveAttempts: number;
  exposureLookbackDays: number;
  resultValidityDays: number;
  selectionSeedHash: string;
  expiresAt: string;
  stage: DiagnosticStageReceipt;
  selectionReceipt: unknown;
}

export interface PrepareDiagnosticAttemptDependencies {
  bank: readonly DiagnosticBankRecord[];
  bankVersion: string;
  consentVersion: string;
  deliveryPolicyVersion: string;
  accessMode: DiagnosticAccessMode;
  minimumDaysBetweenCompletedAttempts: number;
  maximumConcurrentActiveAttempts: number;
  exposureLookbackDays: number;
  resultValidityDays: number;
  listeningAccommodation?: boolean;
  excludedObjectiveItemIds: ReadonlySet<string>;
  selectionSecret: string;
  now: () => Date;
  newId: () => string;
  persist: (input: PersistDiagnosticAttemptInput) => Promise<void>;
}

function selectionSeed(secret: string, attemptId: string, stage: string): string {
  return createHmac('sha256', secret).update(`${attemptId}\u0000${stage}`).digest('hex');
}

export async function prepareEnglishDiagnosticAttempt(
  userId: string,
  dependencies: PrepareDiagnosticAttemptDependencies,
): Promise<DiagnosticStageDelivery> {
  if (!userId) throw new DiagnosticStartError('SERVER_CONFIGURATION_INVALID', 'authenticated user id is required');
  if (!dependencies.consentVersion.trim() || dependencies.consentVersion.length > 100) {
    throw new DiagnosticStartError('SERVER_CONFIGURATION_INVALID', 'diagnostic consent version is invalid');
  }
  if (!dependencies.deliveryPolicyVersion.trim() || dependencies.deliveryPolicyVersion.length > 100
    || !['pilot', 'production'].includes(dependencies.accessMode)
    || !Number.isInteger(dependencies.minimumDaysBetweenCompletedAttempts)
    || dependencies.minimumDaysBetweenCompletedAttempts < 0
    || dependencies.minimumDaysBetweenCompletedAttempts > 365
    || !Number.isInteger(dependencies.maximumConcurrentActiveAttempts)
    || dependencies.maximumConcurrentActiveAttempts < 1
    || dependencies.maximumConcurrentActiveAttempts > 3
    || !Number.isInteger(dependencies.exposureLookbackDays)
    || dependencies.exposureLookbackDays < 1
    || dependencies.exposureLookbackDays > 730
    || !Number.isInteger(dependencies.resultValidityDays)
    || dependencies.resultValidityDays < 1
    || dependencies.resultValidityDays > 730) {
    throw new DiagnosticStartError('SERVER_CONFIGURATION_INVALID', 'diagnostic delivery policy is invalid');
  }
  if (dependencies.selectionSecret.length < 32) {
    throw new DiagnosticStartError('SERVER_CONFIGURATION_INVALID', 'diagnostic selection secret must contain at least 32 characters');
  }
  const deficits = auditEnglishMstCapacity(dependencies.bank);
  if (deficits.length) {
    throw new DiagnosticStartError('BANK_NOT_READY', `diagnostic bank has ${deficits.length} objective capacity deficits`);
  }

  const now = dependencies.now();
  const attemptId = dependencies.newId();
  const stageId = dependencies.newId();
  const seed = selectionSeed(dependencies.selectionSecret, attemptId, 'locator');
  let selected;
  try {
    selected = selectEnglishLocator(dependencies.bank, seed, dependencies.excludedObjectiveItemIds);
  } catch (cause) {
    if (cause instanceof Error && cause.message.includes('bank exhausted')) {
      throw new DiagnosticStartError('BANK_NOT_READY', 'diagnostic bank cannot satisfy the exposure policy');
    }
    throw cause;
  }
  const issuedAt = now.toISOString();
  const expiresAt = new Date(now.getTime() + 2 * 60 * 60 * 1000).toISOString();
  const stage: DiagnosticStageReceipt = {
    stageId,
    kind: 'locator',
    routeId: null,
    itemIds: selected.records.map(record => record.publicItem.id),
    contentVersions: Object.fromEntries(selected.records.map(record => [
      record.publicItem.id,
      record.publicItem.contentVersion,
    ])),
    issuedAt,
  };
  await dependencies.persist({
    attemptId,
    userId,
    language: 'en',
    blueprintVersion: ENGLISH_DIAGNOSTIC_BLUEPRINT.id,
    bankVersion: dependencies.bankVersion,
    engineVersion: DIAGNOSTIC_ENGINE_VERSION,
    consentVersion: dependencies.consentVersion,
    consentedAt: issuedAt,
    deliveryPolicyVersion: dependencies.deliveryPolicyVersion,
    accessMode: dependencies.accessMode,
    minimumDaysBetweenCompletedAttempts: dependencies.minimumDaysBetweenCompletedAttempts,
    maximumConcurrentActiveAttempts: dependencies.maximumConcurrentActiveAttempts,
    exposureLookbackDays: dependencies.exposureLookbackDays,
    resultValidityDays: dependencies.resultValidityDays,
    selectionSeedHash: createHash('sha256').update(seed).digest('hex'),
    expiresAt,
    stage,
    selectionReceipt: { ...selected.receipt, listeningAccommodation: dependencies.listeningAccommodation === true },
  });
  return {
    attemptId,
    attemptVersion: 1,
    expiresAt,
    stage,
    items: selected.records.map(record => toDiagnosticPublicItem(record, stage.stageId)),
    listeningAccommodation: dependencies.listeningAccommodation === true,
  };
}
