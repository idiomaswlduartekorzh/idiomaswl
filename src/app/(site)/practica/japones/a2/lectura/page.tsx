import type { Metadata } from 'next'
import { practicaMetadata } from '@/lib/practica-metadata'
import Content from './Content'
import { QuizSchema } from '@/components/practica/EducationSchema';

export const metadata: Metadata = practicaMetadata('japones', 'a2', 'lectura')

export default function Page() {
  return (
    <>
      <QuizSchema
        name="Lectura en Japonés A2 — Textos interactivos"
        url="https://www.idiomaswl.com/practica/japones/a2/lectura"
        description="5 textos de lectura en japonés nivel A2 con romaji, vocabulario interactivo y 6 preguntas por texto."
      />
      <Content />
    </>
  )
}
