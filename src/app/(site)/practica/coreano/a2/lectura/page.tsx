import type { Metadata } from 'next'
import { practicaMetadata } from '@/lib/practica-metadata'
import Content from './Content'
import { QuizSchema } from '@/components/practica/EducationSchema';

export const metadata: Metadata = practicaMetadata('coreano', 'a2', 'lectura')

export default function Page() {
  return (
    <>
      <QuizSchema
        name="Lectura en Coreano A2 — Textos interactivos"
        url="https://idiomaswl.com/practica/coreano/a2/lectura"
        description="Textos de lectura en coreano nivel A2 con romanización, vocabulario interactivo y preguntas de comprensión."
      />
      <Content />
    </>
  )
}
