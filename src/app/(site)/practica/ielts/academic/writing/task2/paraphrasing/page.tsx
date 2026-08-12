import type { Metadata } from 'next'
import { Task2SkillStructuredData } from '../Task2SkillStructuredData'
import ParaphrasingHubClient from './ParaphrasingHubClient'

/**
 * El contenido de la página va en inglés, porque es lo que se aprende; los metadatos van en
 * español, porque es como busca esta audiencia. «Cómo parafrasear en inglés» tiene volumen en
 * Colombia y «how to paraphrase» no lo tiene para este lector. Mismo criterio que las siete
 * familias de conectores y que la gramática de práctica.
 */

export const metadata: Metadata = {
  title: 'Cómo parafrasear en inglés: las 5 técnicas con ejemplos y ejercicios',
  description: 'Parafrasear en inglés con sinónimos, orden de palabras, forma de la palabra, voz pasiva y estructura de la frase. Con los calcos del español que hay que evitar y ejercicios corregidos.',
  keywords: [
    'cómo parafrasear en inglés',
    'parafrasear IELTS writing',
    'sinónimos en inglés para IELTS',
    'voz pasiva en inglés',
    'IELTS paraphrasing task 2',
  ],
  openGraph: {
    title: 'Cómo parafrasear en inglés: las 5 técnicas con ejemplos y ejercicios',
    description: 'Parafrasear en inglés con sinónimos, orden de palabras, forma de la palabra, voz pasiva y estructura de la frase. Con los calcos del español que hay que evitar y ejercicios corregidos.',
    type: 'website',
    locale: 'es_CO',
  },
  alternates: { canonical: 'https://www.idiomaswl.com/practica/ielts/academic/writing/task2/paraphrasing' },
}

export default function Page() {
  return (
    <>
      <Task2SkillStructuredData
        name="IELTS Task 2 paraphrasing"
        path="/practica/ielts/academic/writing/task2/paraphrasing"
        teaches={['paraphrasing', 'synonyms', 'lexical resource']}
      />
      <ParaphrasingHubClient />
    </>
  )
}
