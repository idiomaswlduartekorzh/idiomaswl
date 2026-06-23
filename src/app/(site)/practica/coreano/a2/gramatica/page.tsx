import type { Metadata } from 'next'
import { practicaMetadata } from '@/lib/practica-metadata'
import Content from './Content'
import { QuizSchema } from '@/components/practica/EducationSchema';

export const metadata: Metadata = practicaMetadata('coreano', 'a2', 'gramatica')

export default function Page() {
  return (
    <>
      <QuizSchema
        name="Gramática de Coreano A2 — Ejercicios interactivos"
        url="https://idiomaswl.com/practica/coreano/a2/gramatica"
        description="Ejercicios de gramática de Coreano nivel A2: pasado 았/었어요, intención, conjetura, contraste y causa/secuencia."
      />
      <Content />
    </>
  )
}
