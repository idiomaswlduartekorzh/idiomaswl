import type { Metadata } from 'next'

import { GrammarLessonSchema, QuizSchema } from '@/components/practica/EducationSchema'
import TenseQuestEngine from '@/components/practica/TenseQuestEngine'
import { RUSSIAN_STRUCTURE_QUEST } from '@/data/practica/russian-structure-quest-config'

const URL = 'https://www.idiomaswl.com/herramientas/quizes/ruso'
export const metadata: Metadata = {
  title: 'Quiz de tiempo y aspecto en ruso — 6 niveles',
  description: 'Practica 10 contrastes reales del ruso: tiempo, aspecto, condición e imperativo.',
  alternates: { canonical: URL },
  openGraph: { title: 'Мастерская вида — Quiz de ruso', description: 'Practica tiempo, aspecto y modalidad del ruso en seis niveles.', url: URL, type: 'website', siteName: 'Idiomas WeLearn', locale: 'es_CO' },
}
export default function QuizRusoPage() { return <><GrammarLessonSchema course={{ name: 'Quizes de Ruso', url: 'https://www.idiomaswl.com/herramientas/quizes' }} description="Quiz configurable de tiempo, aspecto y modalidad del ruso." educationalLevel="A2, B1" inLanguage="ru" keywords={['aspecto verbal ruso', 'tiempos ruso', 'совершенный вид']} name="Мастерская вида" url={URL} /><QuizSchema description="Quiz de tiempo, aspecto y modalidad del ruso con seis niveles." name="Мастерская вида" url={URL} /><TenseQuestEngine config={RUSSIAN_STRUCTURE_QUEST} languageSlug="ruso" /></> }
