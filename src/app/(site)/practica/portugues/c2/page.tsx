import type { Metadata } from 'next'
import PortugueseAdvancedLevelHub from '@/components/practica/PortugueseAdvancedLevelHub'
export const metadata: Metadata = { title: 'Português C2 — Domínio gramatical', description: 'Curso completo de gramática portuguesa C2 com 30 aulas, mapas visuais, exercícios progressivos e PDF.', alternates: { canonical: 'https://www.idiomaswl.com/practica/portugues/c2' } }
export default function Page() { return <PortugueseAdvancedLevelHub level="c2" /> }
