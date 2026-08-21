import type { Metadata } from 'next'

import { GrammarLessonSchema, QuizSchema } from '@/components/practica/EducationSchema'
import ItalianTenseQuest from '@/components/practica/ItalianTenseQuest'

const URL = 'https://www.idiomaswl.com/herramientas/quizes/italiano'

export const metadata: Metadata = {
  title: 'Quiz de tiempos verbales en italiano — 6 niveles',
  description:
    'Elige los tiempos verbales de italiano que quieres practicar y completa seis niveles con resultados al final de cada nivel.',
  alternates: { canonical: URL },
  openGraph: {
    title: 'La macchina del tempo — Quiz de italiano',
    description: 'Elige los tiempos y completa seis niveles autocorregibles de italiano.',
    url: URL,
    type: 'website',
    siteName: 'Idiomas WeLearn',
    locale: 'es_CO',
  },
}

export default function QuizItalianoPage() {
  return (
    <>
      <GrammarLessonSchema
        course={{ name: 'Quizes de Italiano', url: 'https://www.idiomaswl.com/herramientas/quizes' }}
        description="Quiz configurable de seis niveles para practicar los tiempos principales del italiano, incluido el trapassato remoto, sin formas del subjuntivo."
        educationalLevel="A2, B1, B2"
        inLanguage="it"
        keywords={['tiempos verbales italiano', 'trapassato remoto', 'passato prossimo', 'condizionale italiano', 'quiz italiano']}
        name="La macchina del tempo — Quiz acumulativo de tiempos verbales"
        url={URL}
      />
      <QuizSchema
        description="Quiz configurable de tiempos verbales italianos, desde opción múltiple hasta reconstrucción narrativa, con resultados por nivel."
        name="La macchina del tempo"
        url={URL}
      />
      <ItalianTenseQuest />
    </>
  )
}
