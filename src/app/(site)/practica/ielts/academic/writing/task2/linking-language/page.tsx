import type { Metadata } from 'next'
import { Task2SkillStructuredData } from '../Task2SkillStructuredData'

export const metadata: Metadata = {
  title: 'IELTS Task 2 linking words by function, with practice',
  description: 'Learn addition, contrast, cause, example, concession, comparison and conclusion linking language with punctuation and practice.',
  keywords: ['IELTS linking words', 'academic linking language', 'IELTS cohesion Task 2', 'IELTS linking word practice'],
  openGraph: {
    title: 'IELTS Task 2 linking words by function, with practice',
    description: 'Study linking language by logical function, including placement, punctuation, examples and corrected exercises.',
    type: 'website', locale: 'en_US',
  },
  alternates: { canonical: 'https://www.idiomaswl.com/practica/ielts/academic/writing/task2/linking-language' },
}

import LinkingHubClient from './LinkingHubClient';
export default function Page() {
  return (
    <>
      <Task2SkillStructuredData
        name="IELTS Task 2 linking language"
        path="/practica/ielts/academic/writing/task2/linking-language"
        teaches={['cohesion', 'linking language', 'essay logic']}
      />
      <LinkingHubClient />
    </>
  );
}
