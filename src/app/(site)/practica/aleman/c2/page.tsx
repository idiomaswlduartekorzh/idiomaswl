import type { Metadata } from 'next'
import GermanAdvancedLevelHub from '@/components/practica/GermanAdvancedLevelHub'

export const metadata: Metadata = { title: 'Deutsch C2 — Grammatik und Stil', description: 'Vollständiger Kurs zur deutschen Grammatik C2 mit 30 Lektionen, visuellen Karten, progressiven Übungen und PDF.', alternates: { canonical: 'https://www.idiomaswl.com/practica/aleman/c2' } }
export default function Page() { return <GermanAdvancedLevelHub level="c2" /> }
