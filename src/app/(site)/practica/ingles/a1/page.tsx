import type { Metadata } from 'next'
import InglesA1Client from './InglesA1Client'

export const metadata: Metadata = {
  title: 'Inglés A1 — Elige una habilidad | Idiomas WeLearn',
  description: 'Inglés A1: lectura con 5 textos, gramática interactiva, escritura guiada, expresión oral, vocabulario temático y escucha.',
  alternates: { canonical: 'https://idiomaswl.com/practica/ingles/a1' },
}

export default function InglesA1Page() {
  return <InglesA1Client />
}
