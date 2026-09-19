import type { MockSection } from '@/data/mocks/types';

/** Corrects the approved Set 4 display copy without changing its hash-bound academic source. */
export function displayIeltsSectionInstructions(
  mockId: string,
  section: Pick<MockSection, 'skill' | 'part' | 'instructions'>,
): string {
  if (mockId === 'set-4' && section.skill === 'listening' && section.part === 3) {
    return section.instructions.replace('Questions 21–30.', 'Questions 21–27.');
  }
  return section.instructions;
}
