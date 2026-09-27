import type { DiagnosticResumeDelivery } from '../../lib/diagnostic/delivery.ts';
import type { DiagnosticWritingPromptRecord } from '../../lib/diagnostic/writing.ts';
import type { DiagnosticStageReceipt } from '../../lib/diagnostic/types.ts';
import type { DiagnosticAttemptSnapshot } from './continue-core.ts';
import { toDiagnosticPublicItem } from './scoring.ts';
import type { DiagnosticBankRecord } from './types.ts';
import { parseDiagnosticPersistedResultProfile } from './result-contract.ts';

export interface DiagnosticResumeSnapshot {
  attempt: DiagnosticAttemptSnapshot;
  stage: DiagnosticStageReceipt | null;
  stageStatus: 'issued' | 'completed' | 'expired' | null;
  selectionReceipt: unknown;
  bankVersion: string;
  blueprintVersion: string;
  engineVersion: string;
  writingStatus: string | null;
  resultProfile: unknown;
}

export function buildEnglishDiagnosticResumeDelivery(input: {
  authenticatedUserId: string;
  snapshot: DiagnosticResumeSnapshot;
  objectiveBank: readonly DiagnosticBankRecord[];
  objectiveBankVersion: string;
  writingBank: readonly DiagnosticWritingPromptRecord[];
  writingBankVersion: string;
  blueprintVersion: string;
  engineVersion: string;
  now: Date;
}): DiagnosticResumeDelivery {
  const { attempt } = input.snapshot;
  if (!input.authenticatedUserId || attempt.userId !== input.authenticatedUserId) {
    throw new Error('diagnostic attempt does not belong to the authenticated user');
  }
  if (input.snapshot.bankVersion !== input.objectiveBankVersion
    || input.snapshot.blueprintVersion !== input.blueprintVersion
    || input.snapshot.engineVersion !== input.engineVersion) {
    throw new Error('diagnostic version unavailable');
  }
  if (attempt.status === 'completed') {
    if (!input.snapshot.resultProfile) throw new Error('completed diagnostic has no result profile');
    const resultProfile = parseDiagnosticPersistedResultProfile({
      value: input.snapshot.resultProfile,
      attemptId: attempt.id,
      blueprintVersion: input.snapshot.blueprintVersion,
      bankVersion: input.snapshot.bankVersion,
    });
    if (!resultProfile) throw new Error('completed diagnostic has an invalid result profile');
    return { kind: 'result', attemptId: attempt.id, attemptVersion: attempt.version, status: 'completed', resultProfile };
  }
  if (attempt.status === 'expired' || attempt.status === 'abandoned') {
    return { kind: 'closed', attemptId: attempt.id, attemptVersion: attempt.version, status: attempt.status };
  }
  if (new Date(attempt.expiresAt).getTime() <= input.now.getTime()) {
    return { kind: 'closed', attemptId: attempt.id, attemptVersion: attempt.version, status: 'expired' };
  }
  if (attempt.status === 'scoring') {
    return {
      kind: 'processing', attemptId: attempt.id, attemptVersion: attempt.version,
      status: 'scoring', writingStatus: input.snapshot.writingStatus,
    };
  }
  const stage = input.snapshot.stage;
  if (!stage || input.snapshot.stageStatus !== 'issued' || stage.kind !== attempt.status) {
    throw new Error('diagnostic active stage is unavailable');
  }
  if (stage.kind === 'writing') {
    const receipt = input.snapshot.selectionReceipt;
    const version = receipt && typeof receipt === 'object' && !Array.isArray(receipt)
      ? (receipt as Record<string, unknown>).writingBankVersion : null;
    if (version !== input.writingBankVersion) throw new Error('diagnostic writing version unavailable');
    const prompt = input.writingBank.find(record => record.publicPrompt.id === stage.itemIds[0]
      && record.publicPrompt.contentVersion === stage.contentVersions[record.publicPrompt.id]);
    if (!prompt || stage.itemIds.length !== 1) throw new Error('diagnostic writing prompt is unavailable');
    return {
      kind: 'writing-stage',
      delivery: {
        attemptId: attempt.id, attemptVersion: attempt.version, expiresAt: attempt.expiresAt,
        stage: stage as DiagnosticStageReceipt & { kind: 'writing' },
        prompt: { ...prompt.publicPrompt, instructions: [...prompt.publicPrompt.instructions] },
      },
    };
  }
  const records = new Map(input.objectiveBank.map(record => [record.publicItem.id, record]));
  const resolved = stage.itemIds.map(itemId => records.get(itemId));
  if (resolved.some(record => !record)) throw new Error('diagnostic objective stage is unavailable');
  if (resolved.some(record => !record
    || record.publicItem.contentVersion !== stage.contentVersions[record.publicItem.id])) {
    throw new Error('diagnostic objective stage version is unavailable');
  }
  return {
    kind: 'objective-stage',
    delivery: {
      attemptId: attempt.id, attemptVersion: attempt.version, expiresAt: attempt.expiresAt,
      stage,
      items: (resolved as DiagnosticBankRecord[]).map(record => toDiagnosticPublicItem(record, stage.stageId)),
      listeningAccommodation: Boolean(input.snapshot.selectionReceipt
        && typeof input.snapshot.selectionReceipt === 'object'
        && !Array.isArray(input.snapshot.selectionReceipt)
        && (input.snapshot.selectionReceipt as Record<string, unknown>).listeningAccommodation === true),
    },
  };
}
