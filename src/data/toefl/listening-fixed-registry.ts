import { TOEFL_FIXED_LISTENING_SETS_1_TO_5 } from './listening-fixed-sets-1-5.ts';
import { TOEFL_FIXED_LISTENING_SETS_6_TO_10 } from './listening-fixed-sets-6-10.ts';
import { TOEFL_FIXED_LISTENING_SETS_11_TO_15 } from './listening-fixed-sets-11-15.ts';
import { TOEFL_FIXED_LISTENING_SETS_16_TO_20 } from './listening-fixed-sets-16-20.ts';
import type { ToeflFixedListeningExpansionSet } from './listening-fixed-types.ts';

export const TOEFL_FIXED_LISTENING_SETS = [
  ...TOEFL_FIXED_LISTENING_SETS_1_TO_5,
  ...TOEFL_FIXED_LISTENING_SETS_6_TO_10,
  ...TOEFL_FIXED_LISTENING_SETS_11_TO_15,
  ...TOEFL_FIXED_LISTENING_SETS_16_TO_20,
] as readonly ToeflFixedListeningExpansionSet[];

export const TOEFL_FIXED_LISTENING_BY_SET = Object.fromEntries(
  TOEFL_FIXED_LISTENING_SETS.map((set) => [set.setNumber, set]),
) as Readonly<Record<number, ToeflFixedListeningExpansionSet>>;

// This registry is the runtime release gate. The repository guardian verifies
// that every ID below belongs to the approved 400-file batch and that the
// checked-in MP3 still matches its audited SHA-256 digest.
export const TOEFL_RELEASED_FIXED_LISTENING_MEDIA_IDS = new Set<string>(
  TOEFL_FIXED_LISTENING_SETS.flatMap((set) => [
    ...set.module1ChooseAdditions.map((entry) => entry.mediaId),
    ...set.module2.choose.map((entry) => entry.mediaId),
    set.module2.conversation.mediaId,
    set.module2.announcement.mediaId,
    set.module2.academic.mediaId,
  ]),
);
