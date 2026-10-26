import type { Metadata } from 'next'
import GermanAdvancedLevelHub from '@/components/practica/GermanAdvancedLevelHub'

export const metadata: Metadata = { title: 'Deutsch C1 — Fortgeschrittene Grammatik', description: 'Vollständiger Kurs zur deutschen Grammatik C1 mit 30 Lektionen, visuellen Karten, progressiven Übungen und PDF.', alternates: { canonical: 'https://www.idiomaswl.com/practica/aleman/c1' } }
export default function Page() { return <GermanAdvancedLevelHub level="c1" /> }
