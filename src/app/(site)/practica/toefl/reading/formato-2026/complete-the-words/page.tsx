import type { Metadata } from 'next';
import PracticeRouteShell from '@/components/exam-practice/PracticeRouteShell';
import ToeflPracticeSetCatalog from '@/components/toefl/ToeflPracticeSetCatalog';
import { TOEFL_COMPLETE_WORDS_PRACTICE_SETS, practiceSetNumber } from '@/data/toefl/practice-set-catalog';
import CompleteTheWordsPractice from './CompleteTheWordsPractice';

const PATH = '/practica/toefl/reading/formato-2026/complete-the-words';
export const metadata: Metadata = { title: 'TOEFL Complete the Words Practice Library', description: 'Choose from 20 Complete the Words exercises and practice missing letters in context.', alternates: { canonical: PATH } };

export default async function Page({ searchParams }: { searchParams: Promise<{ set?: string | string[] }> }) {
  const setNumber = practiceSetNumber((await searchParams).set);
  const practice = setNumber ? TOEFL_COMPLETE_WORDS_PRACTICE_SETS[setNumber - 1] : null;
  return <PracticeRouteShell section="reading" breadcrumbs={[
    { label: 'Exercises', href: '/practica/toefl/ejercicios#reading' },
    { label: 'Complete the Words', href: practice ? PATH : undefined },
    ...(practice ? [{ label: `Set ${setNumber}` }] : []),
  ]} backHref={practice ? PATH : undefined}>
    {practice && setNumber
      ? <CompleteTheWordsPractice practice={practice} setNumber={setNumber} />
      : <ToeflPracticeSetCatalog section="reading" task="Complete the Words" description="Select a short passage. Each exercise contains ten partially hidden words and opens only after you choose it." sets={TOEFL_COMPLETE_WORDS_PRACTICE_SETS.map((set, index) => ({ number: index + 1, title: set.title, detail: '10 missing-letter items in one passage', href: `${PATH}?set=${index + 1}`, meta: 'About 5 minutes' }))} />}
  </PracticeRouteShell>;
}
