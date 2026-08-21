import type { Metadata } from 'next'

import { GrammarLessonSchema, QuizSchema } from '@/components/practica/EducationSchema'
import ItalianTenseQuest from '@/components/practica/ItalianTenseQuest'

const URL = 'https://www.idiomaswl.com/herramientas/quizes/italiano'

export const metadata: Metadata = {
  title: 'Quiz de tiempos verbales en italiano — 6 niveles',
  description:
    'Ejercicio acumulativo de italiano con seis niveles: presente, pasados, trapassato remoto, futuro, condicional e imperativo, sin subjuntivo.',
  alternates: { canonical: URL },
  openGraph: {
    title: 'La macchina del tempo — Quiz de italiano',
    description: 'Seis niveles autocorregibles para dominar los tiempos verbales italianos.',
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
        description="Quiz acumulativo de seis niveles para practicar todos los tiempos principales del italiano, incluido el trapassato remoto, sin formas del subjuntivo."
        educationalLevel="A2, B1, B2"
        inLanguage="it"
        keywords={['tiempos verbales italiano', 'trapassato remoto', 'passato prossimo', 'condizionale italiano', 'quiz italiano']}
        name="La macchina del tempo — Quiz acumulativo de tiempos verbales"
        url={URL}
      />
      <QuizSchema
        description="Seis niveles autocorregibles de tiempos verbales italianos, desde opción múltiple hasta reconstrucción narrativa."
        name="La macchina del tempo"
        url={URL}
      />
      <ItalianTenseQuest />
    </>
  )
}
