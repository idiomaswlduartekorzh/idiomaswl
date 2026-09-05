import type { Metadata } from 'next';
import Link from 'next/link';
import ToeflPracticeSetCatalog from '@/components/toefl/ToeflPracticeSetCatalog';
import { TOEFL_COMPLETE_WORDS_PRACTICE_SETS, practiceSetNumber } from '@/data/toefl/practice-set-catalog';
import CompleteTheWordsPractice from './CompleteTheWordsPractice';

const PATH = '/practica/toefl/reading/formato-2026/complete-the-words';
export const metadata: Metadata = { title: 'TOEFL Complete the Words Practice Library', description: 'Choose from 20 Complete the Words exercises and practice missing letters in context.' };

export default async function Page({ searchParams }: { searchParams: Promise<{ set?: string | string[] }> }) {
  const setNumber = practiceSetNumber((await searchParams).set);
  const practice = setNumber ? TOEFL_COMPLETE_WORDS_PRACTICE_SETS[setNumber - 1] : null;
  return <main className="wl-section"><div className="wrap exam-practice-wrap" style={{ width: '100%', maxWidth: 1120 }}>
    <nav aria-label="Breadcrumb" style={{ display: 'flex', gap: '.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
      <Link href="/practica/toefl/ejercicios#reading">Exercises</Link><span>›</span><Link href={PATH}>Complete the Words</Link>{practice ? <><span>›</span><span>Set {setNumber}</span></> : null}
    </nav>
    {practice && setNumber ? <>
      <Link href={PATH} className="btn btn-ghost btn-sm" style={{ marginBottom: '1rem' }}>← Choose another exercise</Link>
      <CompleteTheWordsPractice practice={practice} setNumber={setNumber} />
    </> : <ToeflPracticeSetCatalog task="Complete the Words" description="Select a short passage. Each exercise contains ten partially hidden words and opens only after you choose it." sets={TOEFL_COMPLETE_WORDS_PRACTICE_SETS.map((set, index) => ({ number: index + 1, title: set.title, detail: '10 missing-letter items in one passage', href: `${PATH}?set=${index + 1}`, meta: 'About 5 minutes' }))} />}
  </div></main>;
}
