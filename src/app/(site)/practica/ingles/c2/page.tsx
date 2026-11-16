import type { Metadata } from 'next'
import AdvancedEnglishLevelHub from '@/components/grammar/AdvancedEnglishLevelHub'

export const metadata: Metadata = {
  title: 'Inglés C2 — Lectura, gramática, escritura y habla',
  description: 'Practica inglés C2 con 20 lecturas, gramática de nivel experto, escritura profesional y preguntas de expresión oral.',
  alternates: { canonical: 'https://www.idiomaswl.com/practica/ingles/c2' },
}

export default function EnglishC2Page() { return <AdvancedEnglishLevelHub level="c2" /> }
