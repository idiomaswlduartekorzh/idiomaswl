import type { Metadata } from 'next'
import { practicaMetadata } from '@/lib/practica-metadata'
import Content from './Content'
import { QuizSchema } from '@/components/practica/EducationSchema';

export const metadata: Metadata = practicaMetadata('ingles', 'a2', 'vocabulario')

export default function Page() {
  return (
    <>
      <QuizSchema
        name="Vocabulario de Inglés A2 — Ejercicios interactivos"
        url="https://www.idiomaswl.com/practica/ingles/a2/vocabulario"
        description="Ejercicios de vocabulario de Inglés nivel A2: tarjetas, listas temáticas y práctica activa."
      />
      <Content />
    </>
  )
}
