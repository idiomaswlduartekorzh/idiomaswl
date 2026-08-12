import type { Metadata } from 'next'
import { Task2SkillStructuredData } from '../Task2SkillStructuredData'
import AcademicVocabularyHubClient from './AcademicVocabularyHubClient'

/**
 * El contenido va en inglés, porque es lo que se aprende; los metadatos en español, porque es
 * como busca esta audiencia. Mismo criterio que las siete familias de conectores, las cinco
 * técnicas de paráfrasis y la gramática de práctica.
 */

export const metadata: Metadata = {
  title: 'Vocabulario académico en inglés para IELTS, organizado por función',
  description: 'Matizar, afirmar, atribuir, cuantificar, causar, valorar, proponer y el registro: las 8 funciones del vocabulario en IELTS Writing Task 2, con el patrón de cada palabra y ejercicios corregidos.',
  keywords: [
    'vocabulario académico inglés IELTS',
    'vocabulario IELTS writing task 2',
    'palabras avanzadas en inglés para ensayos',
    'lexical resource IELTS',
    'registro académico en inglés',
  ],
  openGraph: {
    title: 'Vocabulario académico en inglés para IELTS, organizado por función',
    description: 'Matizar, afirmar, atribuir, cuantificar, causar, valorar, proponer y el registro: las 8 funciones del vocabulario en IELTS Writing Task 2, con el patrón de cada palabra y ejercicios corregidos.',
    type: 'website',
    locale: 'es_CO',
  },
  alternates: { canonical: 'https://www.idiomaswl.com/practica/ielts/academic/writing/task2/academic-vocabulary' },
}

export default function Page() {
  return (
    <>
      <Task2SkillStructuredData
        name="IELTS Task 2 academic vocabulary"
        path="/practica/ielts/academic/writing/task2/academic-vocabulary"
        teaches={['academic vocabulary', 'lexical resource', 'collocation']}
      />
      <AcademicVocabularyHubClient />
    </>
  )
}
