import type { Metadata } from 'next'
import { practicaMetadata } from '@/lib/practica-metadata'
import Content from './Content'
import { QuizSchema } from '@/components/practica/EducationSchema'
export const metadata: Metadata = practicaMetadata('coreano', 'b1', 'habla')
export default function Page() {
  return (
    <>
      <QuizSchema
        name="Expresión oral en Coreano B1 — Frases esenciales"
        url="https://www.idiomaswl.com/practica/coreano/b1/habla"
        description="20 frases esenciales de Coreano B1 con Hangul, romaja y fonética para debates y situaciones formales."
      />
      <Content />
    </>
  )
}
