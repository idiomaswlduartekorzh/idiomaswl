import type { Metadata } from 'next'
import { practicaMetadata } from '@/lib/practica-metadata'
import Content from './Content'
import { QuizSchema } from '@/components/practica/EducationSchema'
export const metadata: Metadata = practicaMetadata('ingles', 'b1', 'habla')
export default function Page() {
  return (
    <>
      <QuizSchema
        name="Expresión oral en Inglés B1 — Frases esenciales"
        url="https://idiomaswl.com/practica/ingles/b1/habla"
        description="20 frases esenciales de Inglés B1 para debates, opiniones y situaciones formales e informales."
      />
      <Content />
    </>
  )
}
