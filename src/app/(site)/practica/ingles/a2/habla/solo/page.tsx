import type { Metadata } from 'next'
import Content from '../Content'

export const metadata: Metadata = {
  title: 'Habla inglés A2: 20 frases | Idiomas WeLearn',
  description: 'Practica 20 frases esenciales de inglés A2 con pronunciación, contexto, variantes y seguimiento local de tu avance.',
  alternates: { canonical: 'https://www.idiomaswl.com/practica/ingles/a2/habla/solo' },
}

export default function Page() {
  return <Content />
}
