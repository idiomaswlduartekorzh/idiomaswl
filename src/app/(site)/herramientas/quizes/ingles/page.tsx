import type { Metadata } from 'next'

import { GrammarLessonSchema, QuizSchema } from '@/components/practica/EducationSchema'
import EnglishTenseQuest from '@/components/practica/EnglishTenseQuest'

const URL = 'https://www.idiomaswl.com/herramientas/quizes/ingles'

export const metadata: Metadata = {
  title: 'Quiz de tiempos verbales en inglés — 6 niveles',
  description: 'Elige entre 19 tiempos y estructuras del inglés. Practica con seis niveles y recibe la corrección únicamente al terminar cada nivel.',
  alternates: { canonical: URL },
  openGraph: {
    title: 'The aspect control room — Quiz de inglés',
    description: 'Practica tiempos, aspectos y condicionales ingleses en seis niveles configurables.',
    url: URL,
    type: 'website',
    siteName: 'Idiomas WeLearn',
    locale: 'es_CO',
  },
}

export default function QuizInglesPage() {
  return (
    <>
      <GrammarLessonSchema
        course={{ name: 'Quizes de Inglés', url: 'https://www.idiomaswl.com/herramientas/quizes' }}
        description="Quiz configurable para contrastar 19 tiempos y estructuras del inglés sin corrección inmediata."
        educationalLevel="A2, B1, B2"
        inLanguage="en"
        keywords={['tiempos verbales inglés', 'english tenses quiz', 'conditionals', 'present perfect', 'future perfect']}
        name="The aspect control room — Quiz acumulativo de tiempos verbales"
        url={URL}
      />
      <QuizSchema
        description="Quiz configurable de tiempos, aspectos y condicionales ingleses con seis niveles y resultados diferidos."
        name="The aspect control room"
        url={URL}
      />
      <EnglishTenseQuest />
    </>
  )
}
