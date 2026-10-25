import type { Metadata } from 'next'
import AdvancedEnglishLevelHub from '@/components/grammar/AdvancedEnglishLevelHub'

export const metadata: Metadata = {
  title: 'Inglés C1 — Gramática avanzada con ejercicios',
  description: 'Piloto de gramática inglesa C1 con explicaciones, infografías, ejercicios progresivos y PDF descargables.',
  alternates: { canonical: 'https://www.idiomaswl.com/practica/ingles/c1' },
}

export default function EnglishC1Page() { return <AdvancedEnglishLevelHub level="c1" /> }
