import type { Metadata } from 'next'
import { practicaMetadata } from '@/lib/practica-metadata'
import Content from './Content'
import { QuizSchema } from '@/components/practica/EducationSchema';

export const metadata: Metadata = practicaMetadata('coreano', 'a2', 'escritura')

export default function Page() {
  return (
    <>
      <QuizSchema
        name="Escritura en Coreano A2 — Ejercicios interactivos"
        url="https://idiomaswl.com/practica/coreano/a2/escritura"
        description="Ejercicios de escritura guiada de Coreano nivel A2 con modelos en Hangul, romanización, banco de vocabulario y checklist."
      />
      <Content />
    </>
  )
}
