import type { Metadata } from 'next'
import { QuizSchema } from '@/components/practica/EducationSchema'
import Content from '../Content'

export const metadata: Metadata = {
  title: 'Habla portugués A2: 20 frases | Idiomas WeLearn',
  description: 'Practica 20 frases esenciales de portugués brasileño A2 con pronunciación, contexto, notas culturales y seguimiento local.',
  alternates: { canonical: 'https://www.idiomaswl.com/practica/portugues/a2/habla/solo' },
}

export default function Page() {
  return (
    <>
      <QuizSchema
        name="Expresión oral en portugués A2 — frases esenciales"
        url="https://www.idiomaswl.com/practica/portugues/a2/habla/solo"
        description="20 frases esenciales de portugués brasileño A2 con pronunciación y guía contextual para hispanohablantes."
      />
      <Content />
    </>
  )
}
