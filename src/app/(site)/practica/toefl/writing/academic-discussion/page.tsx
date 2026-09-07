import type { Metadata } from 'next';

import PracticeRouteShell from '@/components/exam-practice/PracticeRouteShell';
import TimedWritingTask from '@/components/toefl/TimedWritingTask';
import ToeflPracticeSetCatalog from '@/components/toefl/ToeflPracticeSetCatalog';
import { getMock } from '@/data/mocks';
import type { WriteQuestion } from '@/data/mocks/types';
import type { ToeflConstructedWritingTask } from '@/data/toefl/writing-constructed-set-1';
import { practiceSetNumber } from '@/data/toefl/practice-set-catalog';

const PATH = '/practica/toefl/writing/academic-discussion';
const RUBRIC = [
  { id: 'task', label: 'Position', description: 'The response states and supports a clear position.' },
  { id: 'discussion', label: 'Contribution', description: 'The response adds a relevant idea to the discussion.' },
  { id: 'development', label: 'Development', description: 'Reasons and examples explain the main point.' },
  { id: 'language', label: 'Language use', description: 'Grammar and vocabulary communicate the intended meaning clearly.' },
];

function discussionQuestion(setNumber: number) {
  const mock = getMock('toefl', `set-${setNumber}`);
  return mock?.sections.flatMap((section) => section.questions).find((question): question is WriteQuestion => question.type === 'write' && question.taskNumber === 2);
}

function asTask(question: WriteQuestion, setNumber: number): ToeflConstructedWritingTask {
  return { id: question.id, legacyId: question.id, kind: 'academic-discussion', title: `Academic Discussion · Set ${setNumber}`, contentVersion: '2026', timeLimitSeconds: question.timeLimitSeconds ?? 600, recommendedMinimumWords: 100, stimulus: question.stimulus, prompt: question.text, rubric: RUBRIC };
}

export const metadata: Metadata = { title: 'TOEFL Academic Discussion Practice Library', description: 'Choose from 20 timed TOEFL Academic Discussion prompts and complete one exercise at a time.' };

export default async function Page({ searchParams }: { searchParams: Promise<{ set?: string | string[] }> }) {
  const setNumber = practiceSetNumber((await searchParams).set);
  const selected = setNumber ? discussionQuestion(setNumber) : null;
  const exercises = Array.from({ length: 20 }, (_, index) => ({ number: index + 1, question: discussionQuestion(index + 1)! }));
  return <PracticeRouteShell section="writing" breadcrumbs={[
    { label: 'Exercises', href: '/practica/toefl/ejercicios#writing' },
    { label: 'Academic Discussion', href: selected ? PATH : undefined },
    ...(selected ? [{ label: `Set ${setNumber}` }] : []),
  ]} backHref={selected ? PATH : undefined}>
    {selected && setNumber
      ? <TimedWritingTask task={asTask(selected, setNumber)} />
      : <ToeflPracticeSetCatalog section="writing" task="Academic Discussion" description="Choose one class discussion. The prompt and ten-minute timer open only after you select an exercise." sets={exercises.map(({ number, question }) => ({ number, title: question.stimulus.match(/Professor [^:]+:\s*([^?]+\?)/)?.[1] ?? `Discussion Set ${number}`, detail: 'One complete academic response', href: `${PATH}?set=${number}`, meta: '10 minutes' }))} />}
  </PracticeRouteShell>;
}
