import type { Metadata } from 'next'
import { practicaMetadata } from '@/lib/practica-metadata'
import Content from './Content'
import { QuizSchema } from '@/components/practica/EducationSchema';

export const metadata: Metadata = practicaMetadata('coreano', 'a1', 'vocabulario')

export default function Page() {
  return (
    <>
      <QuizSchema
        name="Vocabulario de Coreano A1 — Ejercicios interactivos"
        url="https://www.idiomaswl.com/practica/coreano/a1/vocabulario"
        description="Ejercicios de vocabulario de Coreano nivel A1: tarjetas, listas temáticas y práctica activa."
      />
      <Content />
    </>
  )
}
