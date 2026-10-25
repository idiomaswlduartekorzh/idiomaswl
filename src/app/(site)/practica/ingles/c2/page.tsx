import type { Metadata } from 'next'
import AdvancedEnglishLevelHub from '@/components/grammar/AdvancedEnglishLevelHub'

export const metadata: Metadata = {
  title: 'Inglés C2 — Gramática de maestría con ejercicios',
  description: 'Piloto de gramática inglesa C2 con explicaciones, infografías, ejercicios progresivos y PDF descargables.',
  alternates: { canonical: 'https://www.idiomaswl.com/practica/ingles/c2' },
}

export default function EnglishC2Page() { return <AdvancedEnglishLevelHub level="c2" /> }
