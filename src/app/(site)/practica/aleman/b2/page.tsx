import type { Metadata } from 'next'
import GermanAdvancedLevelHub from '@/components/practica/GermanAdvancedLevelHub'

export const metadata: Metadata = { title: 'Deutsch B2 — Fortgeschrittene Grammatik', description: 'Vollständiger Kurs zur deutschen Grammatik B2 mit 30 Lektionen, visuellen Karten, progressiven Übungen und PDF.', alternates: { canonical: 'https://www.idiomaswl.com/practica/aleman/b2' } }
export default function Page() { return <GermanAdvancedLevelHub level="b2" /> }
