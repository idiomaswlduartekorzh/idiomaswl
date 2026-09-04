import type { ToeflListeningSingleQuestion } from '../mocks/types';

export const LEGACY_LISTENING_ORDER = 'source-v1';
export const CURRENT_LISTENING_ORDER = 'set1-order-2026-09-04-v1';
export type ListeningOrderVersion = typeof LEGACY_LISTENING_ORDER | typeof CURRENT_LISTENING_ORDER;

// Display permutations approved in HR-06-SET1-ORDER-PRODUCT / -ACADEMIC.
// IDs remain canonical identities, even when their suffix differs from the visible letter.
const ORDERS: Readonly<Record<string, readonly string[]>> = {
  'item:t1-l-cr4-fixed-v1': ['d', 'b', 'c', 'a'],
  'item:t1-l-m1-cr6-v1': ['a', 'b', 'd', 'c'],
  'item:t1-l-m1-cr8-v1': ['b', 'a', 'c', 'd'],
};

/** Missing/unknown metadata must never silently opt an existing attempt into a new order. */
export function restoreListeningOrderVersion(value: unknown): ListeningOrderVersion {
  return value === CURRENT_LISTENING_ORDER ? CURRENT_LISTENING_ORDER : LEGACY_LISTENING_ORDER;
}

export function listeningDisplayOptions(
  question: Pick<ToeflListeningSingleQuestion, 'id' | 'options'>,
  version: ListeningOrderVersion,
): ToeflListeningSingleQuestion['options'] {
  const order = version === CURRENT_LISTENING_ORDER ? ORDERS[question.id] : undefined;
  if (!order) return question.options;
  const byId = new Map(question.options.map(option => [option.id, option]));
  const ids = order.map(suffix => `${question.id}:option-${suffix}`);
  if (question.options.length !== 4 || byId.size !== 4 || ids.some(id => !byId.has(id))) {
    throw new Error(`Invalid approved Listening option permutation: ${question.id}`);
  }
  return ids.map((id, index) => ({ ...byId.get(id)!, label: String.fromCharCode(65 + index) }));
}
