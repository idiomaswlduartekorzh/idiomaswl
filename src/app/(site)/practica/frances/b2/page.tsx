import type { Metadata } from 'next'
import FrenchAdvancedLevelHub from '@/components/practica/FrenchAdvancedLevelHub'

export const metadata: Metadata = { title: 'Français B2 — Grammaire avancée', description: 'Parcours complet de grammaire française B2 avec 30 leçons, cartes visuelles, exercices progressifs et PDF.', alternates: { canonical: 'https://www.idiomaswl.com/practica/frances/b2' } }
export default function Page() { return <FrenchAdvancedLevelHub level="b2" /> }
