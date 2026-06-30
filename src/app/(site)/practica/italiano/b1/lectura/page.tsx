import type { Metadata } from 'next'
import { practicaMetadata } from '@/lib/practica-metadata'
import Content from './Content'
import { QuizSchema } from '@/components/practica/EducationSchema';

export const metadata: Metadata = practicaMetadata('italiano', 'b1', 'lectura')

export default function Page() {
  return (
    <>
      <QuizSchema
        name="Lettura Italiano B1 — Testi con vocabolario interattivo"
        url="https://idiomaswl.com/practica/italiano/b1/lectura"
        description="5 testi B1 de italiano (120-150 palabras) con vocabulario clickeable, 6 preguntas MCQ y producción libre."
      />
      <Content />
    </>
  )
}
