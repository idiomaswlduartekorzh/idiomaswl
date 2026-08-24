import type { Metadata } from 'next'

import { GrammarLessonSchema, QuizSchema } from '@/components/practica/EducationSchema'
import TenseQuestEngine from '@/components/practica/TenseQuestEngine'
import { PORTUGUESE_STRUCTURE_QUEST } from '@/data/practica/portuguese-structure-quest'

const URL = 'https://www.idiomaswl.com/herramientas/quizes/portugues'
export const metadata: Metadata = {
  title: 'Quiz de tiempos y estructuras en portugués — 6 niveles',
  description: 'Practica 10 formas del portugués brasileño con contexto, aspecto y corrección diferida.',
  alternates: { canonical: URL },
  openGraph: { title: 'A central da narrativa — Quiz de portugués', description: 'Practica portugués brasileño en seis niveles configurables.', url: URL, type: 'website', siteName: 'Idiomas WeLearn', locale: 'es_CO' },
}
export default function QuizPortuguesPage() { return <><GrammarLessonSchema course={{ name: 'Quizes de Portugués', url: 'https://www.idiomaswl.com/herramientas/quizes' }} description="Quiz configurable de tiempo y estructura del portugués brasileño." educationalLevel="A2, B1, B2" inLanguage="pt-BR" keywords={['tempos verbais português', 'pretérito perfeito', 'futuro do pretérito']} name="A central da narrativa" url={URL} /><QuizSchema description="Quiz de portugués brasileño con seis niveles." name="A central da narrativa" url={URL} /><TenseQuestEngine config={PORTUGUESE_STRUCTURE_QUEST} /></> }
