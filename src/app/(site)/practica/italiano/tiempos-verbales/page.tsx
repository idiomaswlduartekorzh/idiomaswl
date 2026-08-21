import type { Metadata } from 'next'
import ItalianTenseQuest from '@/components/practica/ItalianTenseQuest'
import { GrammarLessonSchema, QuizSchema } from '@/components/practica/EducationSchema'

const URL = 'https://www.idiomaswl.com/practica/italiano/tiempos-verbales'

export const metadata: Metadata = {
  title: 'Tiempos verbales en italiano — Quiz acumulativo de 6 niveles',
  description: 'Ejercicio acumulativo de italiano con seis niveles: presente, pasados, trapassato remoto, futuro, condicional e imperativo, sin subjuntivo.',
  alternates: { canonical: URL },
}

export default function TiemposVerbalesItaliano() {
  return (
    <>
      <GrammarLessonSchema
        course={{ name: 'Práctica de Italiano', url: 'https://www.idiomaswl.com/practica/italiano' }}
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
