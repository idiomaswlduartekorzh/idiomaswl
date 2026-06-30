import type { Metadata } from 'next'
import { practicaMetadata } from '@/lib/practica-metadata'
import Content from './Content'
import { QuizSchema } from '@/components/practica/EducationSchema';

export const metadata: Metadata = practicaMetadata('coreano', 'b1', 'vocabulario')

export default function Page() {
  return (
    <>
      <QuizSchema
        name="Vocabulario de Coreano B1 — Ejercicios interactivos"
        url="https://idiomaswl.com/practica/coreano/b1/vocabulario"
        description="Ejercicios de vocabulario de Coreano nivel B1: 8 temas, 80 palabras con Hangul y romanización. Flashcards, opción múltiple y práctica de escritura."
      />
      <Content />
    </>
  )
}
