import type { Metadata } from 'next'
import AdvancedEnglishLevelHub from '@/components/grammar/AdvancedEnglishLevelHub'

export const metadata: Metadata = {
  title: 'Inglés C1 — Lectura, gramática, escritura y habla',
  description: 'Practica inglés C1 con 20 lecturas, gramática avanzada, escritura profesional y preguntas de expresión oral.',
  alternates: { canonical: 'https://www.idiomaswl.com/practica/ingles/c1' },
}

export default function EnglishC1Page() { return <AdvancedEnglishLevelHub level="c1" /> }
