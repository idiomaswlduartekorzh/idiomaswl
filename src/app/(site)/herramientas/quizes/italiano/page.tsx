import type { Metadata } from 'next'

import { GrammarLessonSchema, QuizSchema } from '@/components/practica/EducationSchema'
import ItalianTenseQuest from '@/components/practica/ItalianTenseQuest'

const URL = 'https://www.idiomaswl.com/herramientas/quizes/italiano'

export const metadata: Metadata = {
  title: 'Quiz de tiempos verbales en italiano — 6 niveles',
  description:
    'Practica 13 tiempos y perífrasis del italiano en seis niveles con mínimo 10 ejercicios, corrección diferida e informe final.',
  alternates: { canonical: URL },
  openGraph: {
    title: 'La macchina del tempo — Quiz de italiano',
    description: 'Elige entre 13 tiempos y perífrasis, completa seis niveles y recibe un informe final de mejora.',
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
        description="Quiz configurable de seis niveles y diez ejercicios mínimos por nivel para practicar tiempos y perífrasis progresivas del italiano, incluido el trapassato remoto, sin subjuntivo."
        educationalLevel="A2, B1, B2"
        inLanguage="it"
        keywords={['tiempos verbales italiano', 'stare más gerundio', 'trapassato remoto', 'passato prossimo', 'condizionale italiano', 'quiz italiano']}
        name="La macchina del tempo — Quiz acumulativo de tiempos verbales"
        url={URL}
      />
      <QuizSchema
        description="Quiz configurable de 13 tiempos y perífrasis italianas, con mínimo diez retos por nivel, corrección diferida e informe global."
        name="La macchina del tempo"
        url={URL}
      />
      <ItalianTenseQuest />
    </>
  )
}
