import type { Metadata } from 'next'
import { practicaMetadata } from '@/lib/practica-metadata'
import Content from './Content'
import { QuizSchema } from '@/components/practica/EducationSchema';

export const metadata: Metadata = practicaMetadata('ruso', 'a2', 'escritura')

export default function Page() {
  return (
    <>
      <QuizSchema
        name="Escritura en Ruso A2 — Ejercicios interactivos"
        url="https://idiomaswl.com/practica/ruso/a2/escritura"
        description="Ejercicios de escritura guiada de Ruso nivel A2 con modelos en cirílico, transliteración, vocabulario y checklist."
      />
      <Content />
    </>
  )
}
