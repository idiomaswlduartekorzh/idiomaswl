import type { Metadata } from 'next'

import { GrammarLessonSchema, QuizSchema } from '@/components/practica/EducationSchema'
import TenseQuestEngine from '@/components/practica/TenseQuestEngine'
import { FRENCH_STRUCTURE_QUEST } from '@/data/practica/french-structure-quest'

const URL = 'https://www.idiomaswl.com/herramientas/quizes/frances'
export const metadata: Metadata = { title: 'Quiz de tiempos y estructuras en francés — 6 niveles', description: 'Practica 10 formas del francés, del présent al conditionnel passé, con resultados al terminar cada nivel.', alternates: { canonical: URL } }

export default function QuizFrancesPage() {
  return <><GrammarLessonSchema course={{ name: 'Quizes de Francés', url: 'https://www.idiomaswl.com/herramientas/quizes' }} description="Quiz configurable de tiempos y estructuras del francés." educationalLevel="A2, B1, B2" inLanguage="fr" keywords={['tiempos verbales francés', 'passé composé', 'imparfait', 'conditionnel']} name="Le laboratoire du récit" url={URL} /><QuizSchema description="Quiz de tiempos y estructuras del francés con seis niveles." name="Le laboratoire du récit" url={URL} /><TenseQuestEngine config={FRENCH_STRUCTURE_QUEST} /></>
}
