import type { Metadata } from 'next'
import InglesA1Client from './InglesA1Client'
import { CourseSchema } from '@/components/practica/EducationSchema'

export const metadata: Metadata = {
  title: 'Inglés A1 — Elige una habilidad | Idiomas WeLearn',
  description: 'Inglés A1: lectura con 5 textos, gramática interactiva, escritura guiada, expresión oral, vocabulario temático y escucha.',
  alternates: { canonical: 'https://www.idiomaswl.com/practica/ingles/a1' },
}

export default function InglesA1Page() {
  return (
    <>
      <CourseSchema
        name="Inglés A1 — Lectura, Gramática, Vocabulario y más"
        description="Practica Inglés nivel A1: lectura, gramática, vocabulario, escritura, habla y escucha. Ejercicios interactivos con feedback inmediato."
        url="https://www.idiomaswl.com/practica/ingles/a1"
        educationalLevel="A1"
        teaches="Inglés, habilidades MCER"
        inLanguage="en"
      />
      <InglesA1Client />
    </>
  )
}
