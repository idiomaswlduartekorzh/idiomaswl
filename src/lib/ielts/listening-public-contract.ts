import type {
  IeltsListeningPublicPractice,
  IeltsListeningResponseSpec,
} from './listening-practice-contract';

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
    if (group.type === 'single-choice' || group.type === 'map-labelling') {
      return group.questions.map((question) => question.number);
    }
    throw new Error('Unsupported public IELTS Listening question group type.');
  }).sort((a, b) => a - b);
}

export function ieltsListeningPublicResponseSpecs(
  practice: IeltsListeningPublicPractice,
): IeltsListeningResponseSpec[] {
  const specs: IeltsListeningResponseSpec[] = [];
  for (const group of practice.groups) {
    if (group.type === 'form') {
      specs.push(...group.blanks.map((blank) => ({ number: blank.number, kind: 'text' as const })));
      continue;
    }
    if (group.type === 'table') {
      specs.push(...group.rows.flatMap((row) => row.flatMap((cell) =>
        cell.type === 'blank' ? [{ number: cell.number, kind: 'text' as const }] : [],
      )));
      continue;
    }
    if (group.type === 'single-choice') {
      specs.push(...group.questions.map((question) => ({
        number: question.number,
        kind: 'choice' as const,
        allowedValues: question.options.map((option) => option.key),
      })));
      continue;
    }
    if (group.type === 'map-labelling') {
      specs.push(...group.questions.map((question) => ({
        number: question.number,
        kind: 'choice' as const,
        allowedValues: group.options.map((option) => option.key),
      })));
      continue;
    }
    throw new Error('Unsupported public IELTS Listening question group type.');
  }
  return specs.sort((a, b) => a.number - b.number);
}

export function ieltsListeningStorageKey(
  practice: Pick<IeltsListeningPublicPractice, 'id' | 'contentVersion' | 'part'>,
): string {
  return `welearn:ielts:listening:part${practice.part}:${practice.id}:${practice.contentVersion}`;
}
