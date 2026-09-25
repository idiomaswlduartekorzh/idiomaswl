import type {
  DiagnosticPublicItem,
  DiagnosticSubmittedResponse,
} from '@/lib/diagnostic/types';
import type { DiagnosticBankRecord, DiagnosticScoringKey } from './types';

export type DiagnosticObjectiveOutcome = 'correct' | 'incorrect' | 'omitted';

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

