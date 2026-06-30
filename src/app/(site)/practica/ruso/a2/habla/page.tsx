import type { Metadata } from 'next'
import { practicaMetadata } from '@/lib/practica-metadata'
import Content from './Content'
import { QuizSchema } from '@/components/practica/EducationSchema';

export const metadata: Metadata = practicaMetadata('ruso', 'a2', 'habla')

export default function Page() {
  return (
    <>
      <QuizSchema
        name="Expresión oral en Ruso A2 — Frases esenciales"
        url="https://idiomaswl.com/practica/ruso/a2/habla"
        description="20 frases esenciales de Ruso A2 con cirílico, transliteración y guía de pronunciación para hispanohablantes."
      />
      <Content />
    </>
  )
}
