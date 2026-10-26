import type { Metadata } from 'next'
import FrenchAdvancedLevelHub from '@/components/practica/FrenchAdvancedLevelHub'

export const metadata: Metadata = { title: 'Français C2 — Grammaire de maîtrise', description: 'Parcours complet de grammaire française C2 avec 30 leçons, cartes visuelles, exercices progressifs et PDF.', alternates: { canonical: 'https://www.idiomaswl.com/practica/frances/c2' } }
export default function Page() { return <FrenchAdvancedLevelHub level="c2" /> }
