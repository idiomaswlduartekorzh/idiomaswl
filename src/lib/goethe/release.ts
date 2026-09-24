import audioRelease from '@/data/mocks/goethe-a1-audio-release.json' with { type: 'json' };

import type { GoethePracticeSkill } from './practice';

export const GOETHE_A1_SET_COUNT = 10;
export const GOETHE_A1_AUDIO_READY_SETS = new Set<number>(audioRelease.releasedSets);

export function goetheA1SetNumber(mockId: string): number | null {
  const match = mockId.match(/^a1-(\d+)$/);
  if (!match) return null;
  const number = Number(match[1]);
  return Number.isInteger(number) && number >= 1 && number <= GOETHE_A1_SET_COUNT ? number : null;
}

export function hasGoetheA1Audio(mockId: string): boolean {
  const number = goetheA1SetNumber(mockId);
  return number !== null && GOETHE_A1_AUDIO_READY_SETS.has(number);
}

export function goethePracticeSetNumbers(skill: GoethePracticeSkill): number[] {
  return Array.from({ length: GOETHE_A1_SET_COUNT }, (_, index) => index + 1)
    .filter(number => skill !== 'listening' || GOETHE_A1_AUDIO_READY_SETS.has(number));
}
