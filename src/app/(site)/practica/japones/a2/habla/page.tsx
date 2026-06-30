import type { Metadata } from 'next'
import { practicaMetadata } from '@/lib/practica-metadata'
import Content from './Content'
import { QuizSchema } from '@/components/practica/EducationSchema';

export const metadata: Metadata = practicaMetadata('japones', 'a2', 'habla')

export default function Page() {
  return (
    <>
      <QuizSchema
        name="Expresión oral en Japonés A2 — Frases esenciales"
        url="https://idiomaswl.com/practica/japones/a2/habla"
        description="20 frases esenciales de Japonés A2 con pronunciación, romaji y contexto situacional para hispanohablantes."
      />
      <Content />
    </>
  )
}
