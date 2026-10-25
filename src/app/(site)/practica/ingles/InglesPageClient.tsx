'use client'

import { useEffect, useState, type ReactNode } from 'react'
import ProgressBar from '@/components/practica/ProgressBar'
import LanguageHub from '@/components/practica/LanguageHub'
import { getLevelProgress } from '@/lib/progress'


const SKILL_TOTALS: Record<string, number> = { a1: 6, a2: 6, b2: 3, c1: 1, c2: 1 }

const NIVELES = [
  {
    nivel: 'A1', key: 'a1', name: 'Principiante',
    desc: 'Primeras palabras, presente simple, vocabulario cotidiano y frases de supervivencia.',
    href: '/practica/ingles/a1', available: true,
    count: '6 habilidades · 40+ ejercicios',
  },
  {
    nivel: 'A2', key: 'a2', name: 'Elemental',
    desc: 'Pasado simple, comparativos, present continuous, going to/will y modales (can/could/should).',
    href: '/practica/ingles/a2', available: true,
    count: '6 habilidades · 50+ ejercicios',
  },
  {
    nivel: 'B1', key: 'b1', name: 'Intermedio',
    desc: 'Present perfect, primer condicional, ensayos de opinión, listening.',
    href: '/practica/ingles/b1', available: true,
    count: '20 temas de gramática',
  },
  {
    nivel: 'B2', key: 'b2', name: 'Intermedio alto',
    desc: 'Gramática avanzada, Use of English y conectores con práctica progresiva de nivel FCE.',
    href: '/practica/ingles/b2', available: true,
    count: '3 habilidades · 12 lecciones',
  },
  {
    nivel: 'C1', key: 'c1', name: 'Avanzado',
    desc: 'Gramática compleja, colocaciones, escritura avanzada y nivel CAE.',
    href: '/practica/ingles/c1', available: true,
    count: '4 temas de gramática avanzada',
  },
  {
    nivel: 'C2', key: 'c2', name: 'Maestría',
    desc: 'Cohesión, estructura informativa, evidencialidad y transformación de registro.',
    href: '/practica/ingles/c2', available: true,
    count: '4 temas de gramática experta',
  },
]

// `historiasCard` llega ya renderizada desde el servidor. Se pasa como slot en
// vez de importar HistoriasCard aquí a propósito: importarlo arrastraría el
// registro entero de historias —los textos de los ocho idiomas— al bundle de
// esta página, que solo necesita pintar una tarjeta.
export default function InglesPageClient({ historiasCard }: { historiasCard?: ReactNode }) {
  const [levelData, setLevelData] = useState<Record<string, { completed: number }>>({})

  useEffect(() => {
    const data: Record<string, { completed: number }> = {}
    for (const n of NIVELES) {
      if (n.available && n.key) data[n.key] = getLevelProgress('ingles', n.key)
    }
    setLevelData(data)
  }, [])

  return (
    <LanguageHub
      language="ingles"
      langLabel="🇬🇧 Inglés"
      eyebrow="🇬🇧 Inglés"
      title="Elige tu nivel"
      lead="Ejercicios organizados por nivel MCER. Empieza en A1 y avanza a tu ritmo."
      accent="#0066cc"
      levels={NIVELES}
      beforeLevels={historiasCard}
      levelExtra={(n) => {
        const clave = (n as { key?: string }).key
        const prog = clave ? levelData[clave] : undefined
        const total = clave ? (SKILL_TOTALS[clave] ?? 0) : 0
        if (!prog || total <= 0 || prog.completed <= 0) return null
        return <ProgressBar completed={prog.completed} total={total} color="var(--wlp-accent)" size="sm" />
      }}
    />
  )
}
