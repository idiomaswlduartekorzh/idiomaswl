import type { Metadata } from 'next'
import { practicaMetadata } from '@/lib/practica-metadata'
import Content from './Content'
import { QuizSchema } from '@/components/practica/EducationSchema';

export const metadata: Metadata = practicaMetadata('ruso', 'b1', 'lectura')

export default function Page() {
  return (
    <>
      <QuizSchema
        name="Lectura de Ruso B1 — Textos interactivos"
        url="https://idiomaswl.com/practica/ruso/b1/lectura"
        description="5 textos de Ruso B1 con transliteración, vocabulario interactivo y 6 preguntas cada uno."
      />
      <Content />
    </>
  )
}
