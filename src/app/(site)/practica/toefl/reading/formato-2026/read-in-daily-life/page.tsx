import type { Metadata } from 'next';
import Link from 'next/link';
import ReadingPracticeSet from '@/components/toefl/ReadingPracticeSet';
import ToeflPracticeSetCatalog from '@/components/toefl/ToeflPracticeSetCatalog';
import { TOEFL_READING_PRACTICE_SETS, practiceSetNumber } from '@/data/toefl/practice-set-catalog';

const PATH = '/practica/toefl/reading/formato-2026/read-in-daily-life';
export const metadata: Metadata = { title: 'TOEFL Read in Daily Life Practice Library', description: 'Choose from 20 practical reading exercises with notices, messages, schedules, and instructions.' };

export default async function Page({ searchParams }: { searchParams: Promise<{ set?: string | string[] }> }) {
  const setNumber = practiceSetNumber((await searchParams).set);
  const practice = setNumber ? TOEFL_READING_PRACTICE_SETS[setNumber - 1] : null;
  return <main className="wl-section"><div className="wrap exam-practice-wrap" style={{ width: '100%', maxWidth: 1120 }}>
    <nav aria-label="Breadcrumb" style={{ display: 'flex', gap: '.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
      <Link href="/practica/toefl/ejercicios#reading">Exercises</Link><span>›</span><Link href={PATH}>Read in Daily Life</Link>{practice ? <><span>›</span><span>Set {setNumber}</span></> : null}
    </nav>
    {practice && setNumber ? <>
      <Link href={PATH} className="btn btn-ghost btn-sm" style={{ marginBottom: '1rem' }}>← Choose another exercise</Link>
      <ReadingPracticeSet objectId={practice.readingObjectId} setNumber={setNumber} task="Read in Daily Life" passages={practice.dailyLife} />
    </> : <ToeflPracticeSetCatalog task="Read in Daily Life" description="Choose a set of everyday texts. You will read two practical messages and answer five questions." sets={TOEFL_READING_PRACTICE_SETS.map((set) => ({ number: set.setNumber, title: `${set.dailyLife[0].title} + ${set.dailyLife[1].title}`, detail: '2 everyday texts · 5 questions', href: `${PATH}?set=${set.setNumber}`, meta: 'About 8 minutes' }))} />}
  </div></main>;
}
