import type { Metadata } from 'next'
import InglesPageClient from './InglesPageClient'

export const metadata: Metadata = {
  title: 'Práctica de Inglés — Elige tu nivel MCER | Idiomas WeLearn',
  description: 'Ejercicios interactivos de inglés por nivel: A1 disponible con lectura, gramática, escritura, habla, vocabulario y escucha. A2, B1, B2, C1 próximamente.',
  alternates: { canonical: 'https://idiomaswl.com/practica/ingles' },
}

export default function InglesPage() {
  return <InglesPageClient />
}
