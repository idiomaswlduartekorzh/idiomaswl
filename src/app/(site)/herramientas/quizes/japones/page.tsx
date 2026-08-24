import type { Metadata } from 'next'

import { GrammarLessonSchema, QuizSchema } from '@/components/practica/EducationSchema'
import TenseQuestEngine from '@/components/practica/TenseQuestEngine'
import { JAPANESE_STRUCTURE_QUEST } from '@/data/practica/japanese-structure-quest'

const URL = 'https://www.idiomaswl.com/herramientas/quizes/japones'
export const metadata: Metadata = {
  title: 'Quiz de tiempo y aspecto en japonés — 6 niveles',
  description: 'Practica 10 contrastes del japonés: no-pasado, pasado, aspecto, experiencia, condición y petición.',
  alternates: { canonical: URL },
  openGraph: { title: '時間と場面の研究室 — Quiz de japonés', description: 'Practica tiempo, aspecto y función comunicativa del japonés en seis niveles.', url: URL, type: 'website', siteName: 'Idiomas WeLearn', locale: 'es_CO' },
}
export default function QuizJaponesPage() { return <><GrammarLessonSchema course={{ name: 'Quizes de Japonés', url: 'https://www.idiomaswl.com/herramientas/quizes' }} description="Quiz configurable de tiempo, aspecto y función comunicativa del japonés." educationalLevel="A2, B1" inLanguage="ja" keywords={['tiempos japonés', 'ています', 'たことがある', 'たら']} name="時間と場面の研究室" url={URL} /><QuizSchema description="Quiz de tiempo y aspecto del japonés con seis niveles." name="時間と場面の研究室" url={URL} /><TenseQuestEngine config={JAPANESE_STRUCTURE_QUEST} /></> }
