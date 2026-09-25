import type {
  DiagnosticPublicItem,
  DiagnosticSubmittedResponse,
} from '@/lib/diagnostic/types';
import type { DiagnosticBankRecord, DiagnosticScoringKey } from './types';

export type DiagnosticObjectiveOutcome = 'correct' | 'incorrect' | 'omitted';

function wordCount(value: string): number {
  const trimmed = value.trim();
  return trimmed ? trimmed.split(/\s+/u).length : 0;
}

export function validateDiagnosticResponseForRecord(input: {
  record: DiagnosticBankRecord;
  response: DiagnosticSubmittedResponse;
  responseMs: number | null;
  audioPlayCount: number | null;
}): void {
  const contract = input.record.publicItem.response;
  const response = input.response;
  if (contract.kind !== response.kind) throw new Error(`${input.record.publicItem.id}: response kind mismatch`);
  if (!Number.isInteger(input.responseMs) && input.responseMs !== null) {
    throw new Error(`${input.record.publicItem.id}: responseMs must be an integer or null`);
  }
  if (input.responseMs !== null && (input.responseMs < 0 || input.responseMs > 3_600_000)) {
    throw new Error(`${input.record.publicItem.id}: responseMs is outside the accepted range`);
  }
  if (response.kind === 'single-choice' && contract.kind === 'single-choice'
    && response.optionId !== null && !contract.optionIds.includes(response.optionId)) {
    throw new Error(`${input.record.publicItem.id}: unknown option`);
  }
  if (response.kind === 'multiple-choice' && contract.kind === 'multiple-choice') {
    if (new Set(response.optionIds).size !== response.optionIds.length) throw new Error(`${input.record.publicItem.id}: duplicate option`);
    if (response.optionIds.some(optionId => !contract.optionIds.includes(optionId))) {
      throw new Error(`${input.record.publicItem.id}: unknown option`);
    }
    if (response.optionIds.length !== 0 && response.optionIds.length !== contract.selectCount) {
      throw new Error(`${input.record.publicItem.id}: unexpected selection count`);
    }
  }
  if (response.kind === 'short-text' && contract.kind === 'short-text'
    && wordCount(response.value) > contract.maxWords) {
    throw new Error(`${input.record.publicItem.id}: short response exceeds its word limit`);
  }
  if (!Number.isInteger(input.audioPlayCount) && input.audioPlayCount !== null) {
    throw new Error(`${input.record.publicItem.id}: audioPlayCount must be an integer or null`);
  }
  if (input.record.publicItem.stimulus.kind === 'audio') {
    if (input.audioPlayCount === null || input.audioPlayCount < 0
      || input.audioPlayCount > input.record.publicItem.stimulus.maxPlays) {
      throw new Error(`${input.record.publicItem.id}: audio play count is outside the served limit`);
    }
  } else if (input.audioPlayCount !== null && input.audioPlayCount !== 0) {
    throw new Error(`${input.record.publicItem.id}: non-audio response reported audio playback`);
  }
}

function clonePublicItem(item: DiagnosticPublicItem): DiagnosticPublicItem {
  return {
    ...item,
    stimulus: { ...item.stimulus },
    response: {
      ...item.response,
      ...('optionIds' in item.response ? { optionIds: [...item.response.optionIds] } : {}),
    },
    displayOptions: item.displayOptions?.map(option => ({ ...option })),
  };
}

/** Explicit allow-list boundary for API payloads. */
export function toDiagnosticPublicItem(record: DiagnosticBankRecord): DiagnosticPublicItem {
  return clonePublicItem(record.publicItem);
}

function isOmitted(response: DiagnosticSubmittedResponse): boolean {
  if (response.kind === 'single-choice') return response.optionId === null;
  if (response.kind === 'multiple-choice') return response.optionIds.length === 0;
  return response.value.trim().length === 0;
}

function canonicalIds(ids: readonly string[]): string {
  return [...ids].sort().join('\u0000');
}

export function scoreDiagnosticResponse(
  key: DiagnosticScoringKey,
  response: DiagnosticSubmittedResponse,
): DiagnosticObjectiveOutcome {
  if (key.kind !== response.kind) throw new Error('response kind does not match the served item');
  if (isOmitted(response)) return 'omitted';

  if (key.kind === 'single-choice' && response.kind === 'single-choice') {
    return response.optionId === key.optionId ? 'correct' : 'incorrect';
  }
  if (key.kind === 'multiple-choice' && response.kind === 'multiple-choice') {
    return canonicalIds(response.optionIds) === canonicalIds(key.optionIds) ? 'correct' : 'incorrect';
  }
  if (key.kind === 'short-text' && response.kind === 'short-text') {
    const normalized = response.value.trim().toLocaleLowerCase('en');
    return key.accepted.some(value => value.trim().toLocaleLowerCase('en') === normalized)
      ? 'correct'
      : 'incorrect';
  }
  throw new Error('unsupported diagnostic response');
}
