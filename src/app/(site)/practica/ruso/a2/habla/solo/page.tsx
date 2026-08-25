import type { Metadata } from 'next'
import { QuizSchema } from '@/components/practica/EducationSchema'
import Content from '../Content'

export const metadata: Metadata = {
  title: 'Habla ruso A2: 20 frases | Idiomas WeLearn',
  description: 'Practica 20 frases esenciales de ruso A2 con cirílico, transliteración, pronunciación y seguimiento local.',
  alternates: { canonical: 'https://www.idiomaswl.com/practica/ruso/a2/habla/solo' },
}

export default function Page() {
  return (
    <>
      <QuizSchema
        name="Expresión oral en ruso A2 — frases esenciales"
        url="https://www.idiomaswl.com/practica/ruso/a2/habla/solo"
        description="20 frases esenciales de ruso A2 con cirílico, transliteración y guía contextual para hispanohablantes."
      />
      <Content />
    </>
  )
}
