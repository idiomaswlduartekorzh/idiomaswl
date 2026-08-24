import type { Metadata } from 'next'
import { QuizSchema } from '@/components/practica/EducationSchema'
import Content from '../Content'

export const metadata: Metadata = {
  title: 'Habla inglés B1: 20 frases | Idiomas WeLearn',
  description: 'Practica 20 frases esenciales de inglés B1 para debates, opiniones y situaciones formales e informales.',
  alternates: { canonical: 'https://www.idiomaswl.com/practica/ingles/b1/habla/solo' },
}

export default function Page() {
  return (
    <>
      <QuizSchema
        name="Expresión oral en Inglés B1 — Frases esenciales"
        url="https://www.idiomaswl.com/practica/ingles/b1/habla/solo"
        description="20 frases esenciales de Inglés B1 para debates, opiniones y situaciones formales e informales."
      />
      <Content />
    </>
  )
}
