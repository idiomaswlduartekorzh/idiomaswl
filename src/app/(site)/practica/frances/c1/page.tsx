import type { Metadata } from 'next'
import FrenchAdvancedLevelHub from '@/components/practica/FrenchAdvancedLevelHub'

export const metadata: Metadata = { title: 'Français C1 — Grammaire avancée', description: 'Parcours complet de grammaire française C1 avec 30 leçons, cartes visuelles, exercices progressifs et PDF.', alternates: { canonical: 'https://www.idiomaswl.com/practica/frances/c1' } }
export default function Page() { return <FrenchAdvancedLevelHub level="c1" /> }
