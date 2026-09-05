import type { Metadata } from 'next';
import Link from 'next/link';

import ToeflPracticeSetCatalog from '@/components/toefl/ToeflPracticeSetCatalog';

export const metadata: Metadata = { title: 'TOEFL Speaking Practice Sets', description: 'Choose from 20 TOEFL Speaking sets with Listen and Repeat and Take an Interview tasks.' };

export default function ToeflSpeakingPage() {
  const sets = Array.from({ length: 20 }, (_, index) => ({
    number: index + 1,
    title: `Speaking Set ${index + 1}`,
    detail: 'Listen and Repeat · Take an Interview',
    href: `/examenes/toefl/practica/set-${index + 1}`,
    meta: 'Part of a full mock',
  }));
  return <main id="practice-sets" className="wl-section"><div className="wrap" style={{ maxWidth: 1120 }}>
    <nav aria-label="Breadcrumb" style={{ display: 'flex', gap: '.5rem', marginBottom: '1rem' }}><Link href="/practica/toefl/ejercicios#speaking">Exercises</Link><span>›</span><span>Speaking</span></nav>
    <ToeflPracticeSetCatalog task="Speaking" description="Choose a set with both current Speaking task families. Speaking currently opens inside the corresponding full mock so microphone recording and submission stay together." sets={sets} />
  </div></main>;
}
