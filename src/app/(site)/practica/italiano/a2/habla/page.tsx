import type { Metadata } from 'next'
import { practicaMetadata } from '@/lib/practica-metadata'
import Content from './Content'
import { QuizSchema } from '@/components/practica/EducationSchema';

export const metadata: Metadata = practicaMetadata('italiano', 'a2', 'habla')

export default function Page() {
  return (
    <>
      <QuizSchema
        name="Expresión oral en Italiano A2 — Frases esenciales"
        url="https://www.idiomaswl.com/practica/italiano/a2/habla"
        description="20 frases esenciales de Italiano A2 con pronunciación, contexto situacional y variantes formal/informal."
      />
      <Content />
    </>
  )
}
