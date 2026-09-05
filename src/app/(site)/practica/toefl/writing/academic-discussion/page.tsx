import type { Metadata } from 'next';
import Link from 'next/link';

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
  return <main className="wl-section"><div className="wrap exam-practice-wrap" style={{ width: '100%', maxWidth: 1120 }}>
    <nav aria-label="Breadcrumb" style={{ display: 'flex', gap: '.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
      <Link href="/practica/toefl/ejercicios#writing">Exercises</Link><span>›</span><Link href={PATH}>Academic Discussion</Link>{selected ? <><span>›</span><span>Set {setNumber}</span></> : null}
    </nav>
    {selected && setNumber ? <>
      <Link href={PATH} className="btn btn-ghost btn-sm" style={{ marginBottom: '1rem' }}>← Choose another exercise</Link>
      <TimedWritingTask task={asTask(selected, setNumber)} />
    </> : <ToeflPracticeSetCatalog task="Academic Discussion" description="Choose one class discussion. The prompt and ten-minute timer open only after you select an exercise." sets={exercises.map(({ number, question }) => ({ number, title: question.stimulus.match(/Professor [^:]+:\s*([^?]+\?)/)?.[1] ?? `Discussion Set ${number}`, detail: 'One complete academic response', href: `${PATH}?set=${number}`, meta: '10 minutes' }))} />}
  </div></main>;
}
