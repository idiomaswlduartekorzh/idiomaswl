import type { Metadata } from 'next';
import PracticeRouteShell from '@/components/exam-practice/PracticeRouteShell';
import ReadingPracticeSet from '@/components/toefl/ReadingPracticeSet';
import ToeflPracticeSetCatalog from '@/components/toefl/ToeflPracticeSetCatalog';
import { TOEFL_READING_PRACTICE_SETS, practiceSetNumber } from '@/data/toefl/practice-set-catalog';

const PATH = '/practica/toefl/reading/formato-2026/read-in-daily-life';
export const metadata: Metadata = { title: 'TOEFL Read in Daily Life Practice Library', description: 'Choose from 20 practical reading exercises with notices, messages, schedules, and instructions.', alternates: { canonical: PATH } };

export default async function Page({ searchParams }: { searchParams: Promise<{ set?: string | string[] }> }) {
  const setNumber = practiceSetNumber((await searchParams).set);
  const practice = setNumber ? TOEFL_READING_PRACTICE_SETS[setNumber - 1] : null;
  return <PracticeRouteShell section="reading" breadcrumbs={[
    { label: 'Exercises', href: '/practica/toefl/ejercicios#reading' },
    { label: 'Read in Daily Life', href: practice ? PATH : undefined },
    ...(practice ? [{ label: `Set ${setNumber}` }] : []),
  ]} backHref={practice ? PATH : undefined}>
    {practice && setNumber
      ? <ReadingPracticeSet objectId={practice.readingObjectId} setNumber={setNumber} task="Read in Daily Life" passages={practice.dailyLife} />
      : <ToeflPracticeSetCatalog section="reading" task="Read in Daily Life" description="Choose a set of everyday texts. You will read two practical messages and answer five questions." sets={TOEFL_READING_PRACTICE_SETS.map((set) => ({ number: set.setNumber, title: `${set.dailyLife[0].title} + ${set.dailyLife[1].title}`, detail: '2 everyday texts · 5 questions', href: `${PATH}?set=${set.setNumber}`, meta: 'About 8 minutes' }))} />}
  </PracticeRouteShell>;
}
