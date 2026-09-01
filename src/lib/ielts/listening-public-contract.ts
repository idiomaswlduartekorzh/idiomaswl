import type { IeltsListeningPublicPractice } from './listening-practice-contract';

export function ieltsListeningPublicQuestionNumbers(
  practice: IeltsListeningPublicPractice,
): number[] {
  return practice.groups.flatMap((group) => {
    if (group.type === 'form') return group.blanks.map((blank) => blank.number);
    if (group.type === 'table') {
      return group.rows.flatMap((row) =>
        row.flatMap((cell) => cell.type === 'blank' ? [cell.number] : []),
      );
    }
    throw new Error('Unsupported public IELTS Listening question group type.');
  }).sort((a, b) => a - b);
}

export function ieltsListeningStorageKey(
  practice: Pick<IeltsListeningPublicPractice, 'id' | 'contentVersion' | 'part'>,
): string {
  return `welearn:ielts:listening:part${practice.part}:${practice.id}:${practice.contentVersion}`;
}
