import type { Metadata } from 'next'
import { practicaMetadata } from '@/lib/practica-metadata'
import Content from './Content'
import { QuizSchema } from '@/components/practica/EducationSchema'
export const metadata: Metadata = practicaMetadata('japones', 'b1', 'habla')
export default function Page() {
  return (
    <>
      <QuizSchema
        name="Expresión oral en Japonés B1 — Frases esenciales"
        url="https://www.idiomaswl.com/practica/japones/b1/habla"
        description="20 frases esenciales de Japonés B1 con kanji, romaji y fonética para debates y situaciones formales."
      />
      <Content />
    </>
  )
}
