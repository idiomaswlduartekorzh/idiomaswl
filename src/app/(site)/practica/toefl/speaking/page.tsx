import type { Metadata } from 'next';
import Link from 'next/link';

import SpeakingPracticeSet from '@/components/toefl/SpeakingPracticeSet';
import ToeflPracticeSetCatalog from '@/components/toefl/ToeflPracticeSetCatalog';
import { getMock } from '@/data/mocks';
import type { RepeatQuestion, SpeakQuestion } from '@/data/mocks/types';
import { practiceSetNumber } from '@/data/toefl/practice-set-catalog';

export const metadata: Metadata = { title: 'TOEFL Speaking Practice Sets', description: 'Choose from 20 TOEFL Speaking sets with Listen and Repeat and Take an Interview tasks.' };

const PATH = '/practica/toefl/speaking';

function speakingQuestions(setNumber: number) {
  const mock = getMock('toefl', `set-${setNumber}`);
  return mock?.sections.flatMap((section) => section.questions).filter(
    (question): question is RepeatQuestion | SpeakQuestion => question.type === 'repeat' || question.type === 'speak',
  ) ?? [];
}

export default async function ToeflSpeakingPage({ searchParams }: { searchParams: Promise<{ set?: string | string[] }> }) {
  const selectedSet = practiceSetNumber((await searchParams).set);
  const questions = selectedSet ? speakingQuestions(selectedSet) : [];
  const sets = Array.from({ length: 20 }, (_, index) => ({
    number: index + 1,
    title: `Speaking Set ${index + 1}`,
    detail: 'Listen and Repeat · Take an Interview',
    href: `${PATH}?set=${index + 1}`,
    meta: '11 speaking prompts',
  }));
  return <main id="practice-sets" className="wl-section"><div className="wrap" style={{ maxWidth: 1120 }}>
    <nav aria-label="Breadcrumb" style={{ display: 'flex', gap: '.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}><Link href="/practica/toefl/ejercicios#speaking">Exercises</Link><span>›</span><Link href={PATH}>Speaking</Link>{selectedSet ? <><span>›</span><span>Set {selectedSet}</span></> : null}</nav>
    {selectedSet && questions.length ? <>
      <Link href={PATH} className="btn btn-ghost btn-sm" style={{ marginBottom: '1rem' }}>← Choose another exercise</Link>
      <SpeakingPracticeSet setNumber={selectedSet} questions={questions} />
    </> : <ToeflPracticeSetCatalog task="Speaking" description="Choose a set with both current Speaking task families. Each set opens here with replayable audio, free navigation, and microphone recording." sets={sets} />}
  </div></main>;
}
