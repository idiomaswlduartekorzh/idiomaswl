import type { Metadata } from 'next'
import { Task2SkillStructuredData } from '../task2/Task2SkillStructuredData'
import VocabularyHubClient from './VocabularyHubClient'

export const metadata: Metadata = {
  title: 'Vocabulario para IELTS Writing: por parte del examen y por función',
  description: 'Vocabulario específico para IELTS Academic Writing, organizado por lo que estás escribiendo: introducción, overview, tendencias, comparaciones y las funciones transversales. Cada palabra con su patrón.',
  keywords: [
    'vocabulario IELTS writing',
    'vocabulario académico inglés IELTS',
    'vocabulario para task 1 IELTS',
    'vocabulario de tendencias en inglés',
    'lexical resource IELTS',
  ],
  openGraph: {
    title: 'Vocabulario para IELTS Writing: por parte del examen y por función',
    description: 'Vocabulario específico para IELTS Academic Writing, organizado por lo que estás escribiendo. Cada palabra con la construcción que exige.',
    type: 'website', locale: 'es_CO',
  },
  alternates: { canonical: 'https://www.idiomaswl.com/practica/ielts/academic/writing/vocabulario' },
}

export default function Page() {
  return (
    <>
      <Task2SkillStructuredData
        name="Vocabulario para IELTS Academic Writing"
        path="/practica/ielts/academic/writing/vocabulario"
        teaches={['academic vocabulary', 'lexical resource', 'collocation']}
      />
      <VocabularyHubClient />
    </>
  )
}
