import type { Metadata } from 'next'
import { practicaMetadata } from '@/lib/practica-metadata'
import Content from './Content'
import { QuizSchema } from '@/components/practica/EducationSchema'
export const metadata: Metadata = practicaMetadata('ruso', 'b1', 'habla')
export default function Page() {
  return (
    <>
      <QuizSchema
        name="Expresión oral en Ruso B1 — Frases esenciales"
        url="https://idiomaswl.com/practica/ruso/b1/habla"
        description="20 frases esenciales de Ruso B1 con cirílico, transliteración y fonética para debates y situaciones formales."
      />
      <Content />
    </>
  )
}
