import type { MockSection } from '@/data/mocks/types';

/** Keeps the display contract explicit for any future, independently reviewed errata. */
export function displayIeltsSectionInstructions(
  _mockId: string,
  section: Pick<MockSection, 'skill' | 'part' | 'instructions'>,
): string {
  return section.instructions;
}
