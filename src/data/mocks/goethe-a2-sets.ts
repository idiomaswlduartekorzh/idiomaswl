import golden from './goethe-a2-golden-set-1';
import { GOETHE_A2_ORIGINAL_SETS } from './goethe-a2-original-sets';
import type { GoetheA2Set } from './goethe-a2-golden-types';

export const GOETHE_A2_SETS: GoetheA2Set[] = [golden, ...GOETHE_A2_ORIGINAL_SETS];

export function getGoetheA2Set(set: number): GoetheA2Set {
  return GOETHE_A2_SETS.find(candidate => candidate.id === `a2-${set}`) ?? golden;
}
