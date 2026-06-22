import type { Metadata } from 'next'
import MiVocabularioClient from './MiVocabularioClient'

export const metadata: Metadata = {
  title: 'Mi Vocabulario — Palabras guardadas | Idiomas WeLearn',
  description: 'Tu colección personal de vocabulario. Repasa las palabras que guardaste durante la práctica con flashcards interactivas.',
  alternates: { canonical: 'https://www.idiomaswl.com/practica/mi-vocabulario' },
}

export default function MiVocabularioPage() {
  return <MiVocabularioClient />
}
