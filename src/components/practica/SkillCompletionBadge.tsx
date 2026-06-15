'use client'

import { useEffect, useState } from 'react'
import { getSkillProgress, type SkillProgress } from '@/lib/progress'

interface Props {
  lang: string
  level: string
  skill: string
  color?: string
}

export default function SkillCompletionBadge({ lang, level, skill, color = '#059669' }: Props) {
  const [prog, setProg] = useState<SkillProgress | null>(null)

  useEffect(() => {
    setProg(getSkillProgress(lang, level, skill))
  }, [lang, level, skill])

  if (!prog) {
    return (
      <span
        title="Sin intentos"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 22,
          height: 22,
          borderRadius: '50%',
          border: '1.5px solid var(--line-soft)',
          background: 'transparent',
          flexShrink: 0,
        }}
      />
    )
  }

  if (prog.completed) {
    return (
      <span
        title={`Completado · Mejor: ${prog.bestScore}%`}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 22,
          height: 22,
          borderRadius: '50%',
          background: color,
          color: '#fff',
          fontSize: '0.7rem',
          fontWeight: 900,
          flexShrink: 0,
        }}
      >
        ✓
      </span>
    )
  }

  return (
    <span
      title={`En progreso · ${prog.attempts} intento(s)`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 22,
        height: 22,
        borderRadius: '50%',
        border: `1.5px solid ${color}`,
        background: `${color}15`,
        fontSize: '0.55rem',
        fontWeight: 900,
        color,
        flexShrink: 0,
      }}
    >
      ●
    </span>
  )
}
