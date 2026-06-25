import type { Metadata } from 'next'
import { practicaMetadata } from '@/lib/practica-metadata'
import Content from './Content'
import { QuizSchema } from '@/components/practica/EducationSchema'
export const metadata: Metadata = practicaMetadata('aleman', 'b1', 'habla')
export default function Page() {
  return (
    <>
      <QuizSchema
        name="Expresión oral en Alemán B1 — Frases esenciales"
        url="https://idiomaswl.com/practica/aleman/b1/habla"
        description="20 frases esenciales de Alemán B1 para debates, opiniones y conversaciones formales e informales."
      />
      <Content />
    </>
  )
}
