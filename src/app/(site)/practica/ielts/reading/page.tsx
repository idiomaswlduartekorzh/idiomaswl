import type { Metadata } from 'next'
import Content from './Content'

export const metadata: Metadata = {
  title: 'IELTS Reading — True/False/Not Given | Idiomas WeLearn',
  description: 'Practica IELTS Academic Reading: True/False/Not Given con pasaje real, feedback inmediato y estrategias para Band 6–8.',
  alternates: { canonical: 'https://idiomaswl.com/practica/ielts/reading' },
}

export default function Page() {
  return <Content />
}
