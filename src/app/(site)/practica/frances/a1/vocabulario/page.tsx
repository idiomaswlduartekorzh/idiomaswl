import type { Metadata } from 'next'
import { practicaMetadata } from '@/lib/practica-metadata'
import Content from './Content'
import { QuizSchema } from '@/components/practica/EducationSchema';

export const metadata: Metadata = practicaMetadata('frances', 'a1', 'vocabulario')

export default function Page() {
  return (
    <>
      <QuizSchema
        name="Vocabulario de Francés A1 — Ejercicios interactivos"
        url="https://idiomaswl.com/practica/frances/a1/vocabulario"
        description="Ejercicios de vocabulario de Francés nivel A1: tarjetas, listas temáticas y práctica activa."
      />
      <Content />
    </>
  )
}
