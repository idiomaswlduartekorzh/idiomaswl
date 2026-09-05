import type { Metadata } from 'next';
import Link from 'next/link';

import TimedWritingTask from '@/components/toefl/TimedWritingTask';
import ToeflPracticeSetCatalog from '@/components/toefl/ToeflPracticeSetCatalog';
import { getMock } from '@/data/mocks';
import type { WriteQuestion } from '@/data/mocks/types';
import type { ToeflConstructedWritingTask } from '@/data/toefl/writing-constructed-set-1';
import { practiceSetNumber } from '@/data/toefl/practice-set-catalog';

const PATH = '/practica/toefl/writing/write-an-email';
const RUBRIC = [
  { id: 'task', label: 'Task completion', description: 'The email addresses every requested point.' },
  { id: 'organization', label: 'Organization', description: 'The purpose, details, request, and closing are easy to follow.' },
  { id: 'language', label: 'Language use', description: 'Grammar and vocabulary communicate the intended meaning clearly.' },
  { id: 'tone', label: 'Audience and tone', description: 'The email uses a suitable level of politeness for the recipient.' },
];

function emailQuestion(setNumber: number) {
  const mock = getMock('toefl', `set-${setNumber}`);
  return mock?.sections.flatMap((section) => section.questions).find((question): question is WriteQuestion => question.type === 'write' && question.taskNumber === 1);
}

function asTask(question: WriteQuestion, setNumber: number): ToeflConstructedWritingTask {
  return { id: question.id, legacyId: question.id, kind: 'email', title: `Write an Email · Set ${setNumber}`, contentVersion: '2026', timeLimitSeconds: question.timeLimitSeconds ?? 420, stimulus: question.stimulus, prompt: question.text, rubric: RUBRIC };
}

export const metadata: Metadata = { title: 'TOEFL Write an Email Practice Library', description: 'Choose from 20 timed TOEFL email prompts and complete one exercise at a time.' };

export default async function Page({ searchParams }: { searchParams: Promise<{ set?: string | string[] }> }) {
  const setNumber = practiceSetNumber((await searchParams).set);
  const selected = setNumber ? emailQuestion(setNumber) : null;
  const exercises = Array.from({ length: 20 }, (_, index) => ({ number: index + 1, question: emailQuestion(index + 1)! }));
  return <main className="wl-section"><div className="wrap exam-practice-wrap" style={{ width: '100%', maxWidth: 1120 }}>
    <nav aria-label="Breadcrumb" style={{ display: 'flex', gap: '.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
      <Link href="/practica/toefl/ejercicios#writing">Exercises</Link><span>›</span><Link href={PATH}>Write an Email</Link>{selected ? <><span>›</span><span>Set {setNumber}</span></> : null}
    </nav>
    {selected && setNumber ? <>
      <Link href={PATH} className="btn btn-ghost btn-sm" style={{ marginBottom: '1rem' }}>← Choose another exercise</Link>
      <TimedWritingTask task={asTask(selected, setNumber)} />
    </> : <ToeflPracticeSetCatalog task="Write an Email" description="Choose one situation. The prompt and seven-minute timer open only after you select an exercise." sets={exercises.map(({ number, question }) => ({ number, title: question.stimulus.split('\n')[0].replace(/^Situation:\s*/, '').split('. ')[0], detail: 'One complete email response', href: `${PATH}?set=${number}`, meta: '7 minutes' }))} />}
  </div></main>;
}
