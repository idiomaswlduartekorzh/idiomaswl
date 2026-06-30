import type { Metadata } from 'next'
import { practicaMetadata } from '@/lib/practica-metadata'
import Content from './Content'
import { QuizSchema } from '@/components/practica/EducationSchema'
export const metadata: Metadata = practicaMetadata('frances', 'b1', 'habla')
export default function Page() {
  return (
    <>
      <QuizSchema
        name="Expresión oral en Francés B1 — Frases esenciales"
        url="https://idiomaswl.com/practica/frances/b1/habla"
        description="20 frases esenciales de Francés B1 para debates, opiniones y conversaciones formales e informales."
      />
      <Content />
    </>
  )
}
