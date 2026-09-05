import type { Metadata } from 'next';
import Link from 'next/link';
import BuildSentenceSet1Practice from '@/components/toefl/BuildSentenceSet1Practice';
import ToeflPracticeSetCatalog from '@/components/toefl/ToeflPracticeSetCatalog';
import { TOEFL_BUILD_SENTENCE_PRACTICE_SETS, practiceSetNumber } from '@/data/toefl/practice-set-catalog';

const PATH = '/practica/toefl/writing/build-a-sentence';
export const metadata: Metadata = { title: 'TOEFL Build a Sentence Practice Library', description: 'Choose from 20 Build a Sentence exercise sets with ten questions each.' };

export default async function Page({ searchParams }: { searchParams: Promise<{ set?: string | string[] }> }) {
  const setNumber = practiceSetNumber((await searchParams).set);
  const practice = setNumber ? TOEFL_BUILD_SENTENCE_PRACTICE_SETS[setNumber - 1] : null;
  return <main className="wl-section"><div className="wrap exam-practice-wrap" style={{ width: '100%', maxWidth: 1120 }}>
    <nav aria-label="Breadcrumb" style={{ display: 'flex', gap: '.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
      <Link href="/practica/toefl/ejercicios#writing">Exercises</Link><span>›</span><Link href={PATH}>Build a Sentence</Link>{practice ? <><span>›</span><span>Set {setNumber}</span></> : null}
    </nav>
    {practice && setNumber ? <>
      <Link href={PATH} className="btn btn-ghost btn-sm" style={{ marginBottom: '1rem' }}>← Choose another exercise</Link>
      <BuildSentenceSet1Practice practice={practice} setNumber={setNumber} />
    </> : <ToeflPracticeSetCatalog task="Build a Sentence" description="Choose a set before the sentence builder opens. Each set contains ten independent items." sets={TOEFL_BUILD_SENTENCE_PRACTICE_SETS.map((set, index) => ({ number: index + 1, title: `Sentence Set ${index + 1}`, detail: `${set.items.length} sentence-building items`, href: `${PATH}?set=${index + 1}`, meta: 'About 10 minutes' }))} />}
  </div></main>;
}
