import type { Metadata } from 'next'
import { QuizSchema } from '@/components/practica/EducationSchema'
import Content from '../Content'

export const metadata: Metadata = {
  title: 'Habla inglés B1: frases e improvisación | Idiomas WeLearn',
  description: 'Practica 20 frases esenciales y cinco historias de improvisación B1 con seis palabras sorpresa en cada ejercicio.',
  alternates: { canonical: 'https://www.idiomaswl.com/practica/ingles/b1/habla/solo' },
}

export default function Page() {
  return (
    <>
      <QuizSchema
        name="Expresión oral en Inglés B1 — Frases e improvisación"
        url="https://www.idiomaswl.com/practica/ingles/b1/habla/solo"
        description="20 frases esenciales y cinco ejercicios de improvisación en inglés B1."
      />
      <Content />
    </>
  )
}
