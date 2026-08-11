import type { Metadata } from 'next'
import { Task2SkillStructuredData } from '../Task2SkillStructuredData'

export const metadata: Metadata = {
  title: 'Conectores en inglés: las 7 familias con ejemplos y ejercicios',
  description: 'Conectores de adición, contraste, causa-efecto, ejemplo, concesión, comparación y conclusión. Dónde va cada uno, con qué puntuación, y ejercicios corregidos.',
  keywords: ['IELTS linking words', 'IELTS conectores académicos', 'IELTS cohesion task 2', 'IELTS vocabulary linking'],
  openGraph: {
    title: 'Conectores en inglés: las 7 familias con ejemplos y ejercicios',
    description: 'Conectores de adición, contraste, causa-efecto, ejemplo, concesión, comparación y conclusión. Dónde va cada uno, con qué puntuación, y ejercicios corregidos.',
    type: 'website', locale: 'es_CO',
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
