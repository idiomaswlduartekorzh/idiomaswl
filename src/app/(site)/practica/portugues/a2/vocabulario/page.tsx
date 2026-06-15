import type { Metadata } from 'next'
import { practicaMetadata } from '@/lib/practica-metadata'
import Content from './Content'
import { QuizSchema } from '@/components/practica/EducationSchema';

export const metadata: Metadata = practicaMetadata('portugues', 'a2', 'vocabulario')

export default function Page() {
  return (
    <>
      <QuizSchema
        name="Vocabulario de Portugués A2 — Ejercicios interactivos"
        url="https://idiomaswl.com/practica/portugues/a2/vocabulario"
        description="Ejercicios de vocabulario de Portugués nivel A2: tarjetas, listas temáticas y práctica activa."
      />
      <Content />
    </>
  )
}
