import { TOEFL_FIXED_LISTENING_SETS_1_TO_5 } from './listening-fixed-sets-1-5';
import { TOEFL_FIXED_LISTENING_SETS_6_TO_10 } from './listening-fixed-sets-6-10';
import { TOEFL_FIXED_LISTENING_SETS_11_TO_15 } from './listening-fixed-sets-11-15';
import { TOEFL_FIXED_LISTENING_SETS_16_TO_20 } from './listening-fixed-sets-16-20';
import type { ToeflFixedListeningExpansionSet } from './listening-fixed-types';

export const TOEFL_FIXED_LISTENING_SETS = [
  ...TOEFL_FIXED_LISTENING_SETS_1_TO_5,
  ...TOEFL_FIXED_LISTENING_SETS_6_TO_10,
  ...TOEFL_FIXED_LISTENING_SETS_11_TO_15,
  ...TOEFL_FIXED_LISTENING_SETS_16_TO_20,
] as readonly ToeflFixedListeningExpansionSet[];

export const TOEFL_FIXED_LISTENING_BY_SET = Object.fromEntries(
  TOEFL_FIXED_LISTENING_SETS.map((set) => [set.setNumber, set]),
) as Readonly<Record<number, ToeflFixedListeningExpansionSet>>;

// New media stays unavailable until the owner approves the exact audio batch
// and the generated files pass technical plus human review. Approved media IDs
// are added here only as part of that later release gate.
export const TOEFL_RELEASED_FIXED_LISTENING_MEDIA_IDS = new Set<string>();
