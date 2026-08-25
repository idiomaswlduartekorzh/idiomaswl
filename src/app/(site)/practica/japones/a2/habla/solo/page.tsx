import type { Metadata } from 'next'
import { QuizSchema } from '@/components/practica/EducationSchema'
import Content from '../Content'

export const metadata: Metadata = {
  title: 'Habla japonés A2: 20 frases | Idiomas WeLearn',
  description: 'Practica 20 frases esenciales de japonés A2 con escritura japonesa, romaji, pronunciación y seguimiento local.',
  alternates: { canonical: 'https://www.idiomaswl.com/practica/japones/a2/habla/solo' },
}

export default function Page() {
  return (
    <>
      <QuizSchema
        name="Expresión oral en japonés A2 — frases esenciales"
        url="https://www.idiomaswl.com/practica/japones/a2/habla/solo"
        description="20 frases esenciales de japonés A2 con escritura japonesa, romaji y guía contextual para hispanohablantes."
      />
      <Content />
    </>
  )
}
