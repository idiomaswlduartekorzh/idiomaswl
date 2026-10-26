import type { Metadata } from 'next'
import PortugueseAdvancedLevelHub from '@/components/practica/PortugueseAdvancedLevelHub'

export const metadata: Metadata = { title: 'Português B2 — Gramática completa', description: 'Curso completo de gramática portuguesa B2 com 30 aulas, mapas visuais, exercícios progressivos e PDF.', alternates: { canonical: 'https://www.idiomaswl.com/practica/portugues/b2' } }
export default function Page() { return <PortugueseAdvancedLevelHub level="b2" /> }
