import type { Metadata } from 'next'
import { Task2SkillStructuredData } from '../Task2SkillStructuredData'

export const metadata: Metadata = {
  title: 'IELTS Writing Task 2 — Linking Language — Conectores académicos',
  description: 'Practica los conectores y linking words del IELTS Writing Task 2: adición, contraste, causa-efecto, ejemplificación y conclusión. Vocabulario cohesivo Band 7.',
  keywords: ['IELTS linking words', 'IELTS conectores académicos', 'IELTS cohesion task 2', 'IELTS vocabulary linking'],
  openGraph: {
    title: 'IELTS Task 2: Linking Language — Conectores académicos',
    description: 'Practica los conectores y linking words del IELTS Writing Task 2: adición, contraste, causa-efecto, ejemplificación y conclusión. Vocabulario cohesivo Band 7.',
    type: 'website', locale: 'es_CO',
  },
  alternates: { canonical: 'https://www.idiomaswl.com/practica/ielts/academic/writing/task2/linking-language' },
}

import LinkingLanguageClient from './LinkingLanguageClient';
export default function Page() {
  return (
    <>
      <Task2SkillStructuredData
        name="IELTS Task 2 linking language"
        path="/practica/ielts/academic/writing/task2/linking-language"
        teaches={['cohesion', 'linking language', 'essay logic']}
      />
      <LinkingLanguageClient />
    </>
  );
}
