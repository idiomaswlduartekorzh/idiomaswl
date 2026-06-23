import type { Metadata } from 'next'
import { practicaMetadata } from '@/lib/practica-metadata'
import Content from './Content'
import { QuizSchema } from '@/components/practica/EducationSchema';

export const metadata: Metadata = practicaMetadata('coreano', 'a2', 'habla')

export default function Page() {
  return (
    <>
      <QuizSchema
        name="Expresión oral en Coreano A2 — Frases esenciales"
        url="https://idiomaswl.com/practica/coreano/a2/habla"
        description="20 frases esenciales de Coreano A2 con Hangul, romanización y guía de pronunciación para hispanohablantes."
      />
      <Content />
    </>
  )
}
