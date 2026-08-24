import type { Metadata } from 'next'
import { QuizSchema } from '@/components/practica/EducationSchema'
import Content from '../Content'

export const metadata: Metadata = {
  title: 'Habla coreano A2: 20 frases | Idiomas WeLearn',
  description: 'Practica 20 frases esenciales de coreano A2 con Hangul, romanización, pronunciación, contexto y seguimiento local.',
  alternates: { canonical: 'https://www.idiomaswl.com/practica/coreano/a2/habla/solo' },
}

export default function Page() {
  return (
    <>
      <QuizSchema
        name="Expresión oral en coreano A2 — frases esenciales"
        url="https://www.idiomaswl.com/practica/coreano/a2/habla/solo"
        description="20 frases esenciales de coreano A2 con Hangul, romanización y guía de pronunciación para hispanohablantes."
      />
      <Content />
    </>
  )
}
