'use client'

import { useEffect, useState } from 'react'
import SkillHub from '@/components/practica/SkillHub'
import ProgressBar from '@/components/practica/ProgressBar'
import SkillCompletionBadge from '@/components/practica/SkillCompletionBadge'
import XPStreak from '@/components/practica/XPStreak'
import { getSkillProgress } from '@/lib/progress'
import { listeningCard } from '@/data/practica/series/page-copy'


const HABILIDADES = [
  {
    id: 'lectura', emoji: '📖', name: 'Lectura', eng: 'Reading',
    desc: '10 lecturas A1 con audio narrado, cada palabra clickeable, comprensión y evidencia.',
    count: '10 lecturas · con audio', href: '/practica/ingles/a1/lectura',
  },
  {
    id: 'gramatica', emoji: '📐', name: 'Gramática', eng: 'Grammar',
    desc: 'Los 15 temas del A1: artículos, verbo to be, present simple, present continuous, can, there is/are, preposiciones y más. Cada tema con explicación, tablas, ejemplos y ejercicios.',
    count: '15 temas · 120+ ejercicios', href: '/practica/ingles/a1/gramatica',
  },
  {
    id: 'escritura', emoji: '✍️', name: 'Escritura', eng: 'Writing',
    desc: '5 tareas guiadas con modelo del texto, banco de vocabulario y lista de verificación antes de enviar.',
    count: '5 prompts guiados', href: '/practica/ingles/a1/escritura',
  },
  {
    id: 'habla', emoji: '🗣️', name: 'Expresión oral', eng: 'Speaking',
    desc: '15 frases de supervivencia con pronunciación detallada, notas fonéticas y guía para hispanohablantes.',
    count: '15 frases esenciales', href: '/practica/ingles/a1/habla',
  },
  {
    id: 'vocabulario', emoji: '📚', name: 'Vocabulario', eng: 'Vocabulary',
    desc: '6 sets temáticos (familia, colores, comida, días, cuerpo, números). Flashcards + 3 modos de práctica.',
    count: '6 sets · 60+ palabras', href: '/practica/ingles/a1/vocabulario',
  },
  {
    id: 'escucha', emoji: '🎧', name: 'Escucha', eng: 'Listening',
    ...listeningCard('ingles', 'a1', '«The Corner Shop»: Maya, su abuelo y el local vacío de la esquina, en veinte diálogos con voz nativa.'),
    href: '/practica/ingles/a1/escucha',
  },
]

export default function InglesA1Client() {
  const [completedCount, setCompletedCount] = useState(0)

  useEffect(() => {
    const count = HABILIDADES.filter(h =>
      getSkillProgress('ingles', 'a1', h.id)?.completed,
    ).length
    setCompletedCount(count)
  }, [])

  return (
    <SkillHub
      langHref="/practica/ingles"
      langLabel="🇬🇧 Inglés"
      levelLabel="A1"
      eyebrow="Inglés A1 — Principiante"
      title="Elige una habilidad"
      lead="Seis habilidades para empezar de cero en inglés. Cada una con ejercicios interactivos y corrección inmediata."
      accent="#0066cc"
      skills={HABILIDADES}
      headerAside={<XPStreak showMotivation />}
      beforeGrid={
        <>
          <ProgressBar completed={completedCount} total={HABILIDADES.length} color="var(--wlp-accent)" />
          <span>
            {completedCount === 0
              ? 'Ninguna habilidad completada todavía'
              : completedCount === HABILIDADES.length
              ? '¡Nivel A1 completado!'
              : `${completedCount} de ${HABILIDADES.length} habilidades completadas`}
          </span>
        </>
      }
      cardBadge={h => <SkillCompletionBadge lang="ingles" level="a1" skill={h.id} color="var(--wlp-accent)" />}
      tip={
        <>
          <strong>Consejo:</strong> Empieza por Lectura para activar vocabulario, luego refuerza con Gramática. Usa Vocabulario para repasar las palabras del texto en flashcards.
        </>
      }
    />
  )
}
