import type { Metadata } from 'next'

import { GrammarLessonSchema, QuizSchema } from '@/components/practica/EducationSchema'
import TenseQuestEngine from '@/components/practica/TenseQuestEngine'
import { KOREAN_STRUCTURE_QUEST } from '@/data/practica/korean-structure-quest-config'

const URL = 'https://www.idiomaswl.com/herramientas/quizes/coreano'
export const metadata: Metadata = {
  title: 'Quiz de tiempo, aspecto y registro en coreano — 6 niveles',
  description: 'Practica 10 contrastes del coreano: tiempo, niveles de habla, aspecto, condición e intención.',
  alternates: { canonical: URL },
  openGraph: { title: '시간과 높임말 실험실 — Quiz de coreano', description: 'Practica tiempo, aspecto y registro del coreano en seis niveles.', url: URL, type: 'website', siteName: 'Idiomas WeLearn', locale: 'es_CO' },
}
export default function QuizCoreanoPage() { return <><GrammarLessonSchema course={{ name: 'Quizes de Coreano', url: 'https://www.idiomaswl.com/herramientas/quizes' }} description="Quiz configurable de tiempo, aspecto y registro del coreano." educationalLevel="A2, B1" inLanguage="ko" keywords={['tiempos coreano', '고 있어요', '을 거예요', '높임말']} name="시간과 높임말 실험실" url={URL} /><QuizSchema description="Quiz de tiempo, aspecto y registro coreano con seis niveles." name="시간과 높임말 실험실" url={URL} /><TenseQuestEngine config={KOREAN_STRUCTURE_QUEST} languageSlug="coreano" /></> }
