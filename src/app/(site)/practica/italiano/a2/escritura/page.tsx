import type { Metadata } from 'next'
import { practicaMetadata } from '@/lib/practica-metadata'
import Content from './Content'
import { QuizSchema } from '@/components/practica/EducationSchema';

export const metadata: Metadata = practicaMetadata('italiano', 'a2', 'escritura')

export default function Page() {
  return (
    <>
      <QuizSchema
        name="Escritura en Italiano A2 — Ejercicios interactivos"
        url="https://www.idiomaswl.com/practica/italiano/a2/escritura"
        description="Ejercicios de escritura guiada de Italiano nivel A2 con modelos, banco de vocabulario y checklist."
      />
      <Content />
    </>
  )
}
