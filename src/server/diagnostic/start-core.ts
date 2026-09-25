import { createHash, createHmac } from 'node:crypto';

import { ENGLISH_DIAGNOSTIC_BLUEPRINT } from '../../lib/diagnostic/blueprint.ts';
import { DIAGNOSTIC_ENGINE_VERSION, type DiagnosticStageDelivery } from '../../lib/diagnostic/delivery.ts';
import type { DiagnosticStageReceipt } from '../../lib/diagnostic/types.ts';
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
  selectionSeedHash: string;
  expiresAt: string;
  stage: DiagnosticStageReceipt;
  selectionReceipt: unknown;
}

export interface PrepareDiagnosticAttemptDependencies {
  bank: readonly DiagnosticBankRecord[];
  bankVersion: string;
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
  if (dependencies.selectionSecret.length < 32) {
    throw new DiagnosticStartError('SERVER_CONFIGURATION_INVALID', 'diagnostic selection secret must contain at least 32 characters');
  }
  const deficits = auditEnglishMstCapacity(dependencies.bank);
  if (deficits.length) {
    throw new DiagnosticStartError('BANK_NOT_READY', `diagnostic objective bank has ${deficits.length} capacity deficits`);
  }

  const now = dependencies.now();
  const attemptId = dependencies.newId();
  const stageId = dependencies.newId();
  const seed = selectionSeed(dependencies.selectionSecret, attemptId, 'locator');
  const selected = selectEnglishLocator(dependencies.bank, seed);
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
    selectionSeedHash: createHash('sha256').update(seed).digest('hex'),
    expiresAt,
    stage,
    selectionReceipt: selected.receipt,
  });
  return {
    attemptId,
    attemptVersion: 1,
    expiresAt,
    stage,
    items: selected.records.map(toDiagnosticPublicItem),
  };
}
