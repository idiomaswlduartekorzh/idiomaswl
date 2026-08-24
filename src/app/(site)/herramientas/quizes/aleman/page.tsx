import type { Metadata } from 'next'

import { GrammarLessonSchema, QuizSchema } from '@/components/practica/EducationSchema'
import TenseQuestEngine from '@/components/practica/TenseQuestEngine'
import { GERMAN_STRUCTURE_QUEST } from '@/data/practica/german-structure-quest'

const URL = 'https://www.idiomaswl.com/herramientas/quizes/aleman'
export const metadata: Metadata = {
  title: 'Quiz de tiempos y estructuras en alemán — 6 niveles',
  description: 'Practica 10 estructuras del alemán: auxiliares, orden verbal, futuro, hipótesis e imperativo.',
  alternates: { canonical: URL },
  openGraph: { title: 'Die Zeitwerkstatt — Quiz de alemán', description: 'Practica 10 estructuras del alemán en seis niveles configurables.', url: URL, type: 'website', siteName: 'Idiomas WeLearn', locale: 'es_CO' },
}
export default function QuizAlemanPage() { return <><GrammarLessonSchema course={{ name: 'Quizes de Alemán', url: 'https://www.idiomaswl.com/herramientas/quizes' }} description="Quiz configurable de Zeitformen y lógica verbal alemana." educationalLevel="A2, B1, B2" inLanguage="de" keywords={['Zeitformen Deutsch', 'Perfekt', 'Präteritum', 'Futur']} name="Die Zeitwerkstatt" url={URL} /><QuizSchema description="Quiz de tiempos y estructuras del alemán con seis niveles." name="Die Zeitwerkstatt" url={URL} /><TenseQuestEngine config={GERMAN_STRUCTURE_QUEST} /></> }
