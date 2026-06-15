'use client'

import { useEffect, useState } from 'react'
import { getStreakInfo, getTotalXP } from '@/lib/progress'

interface Props {
  showMotivation?: boolean
}

export default function XPStreak({ showMotivation = false }: Props) {
  const [xp, setXp] = useState<number | null>(null)
  const [streak, setStreak] = useState<{ count: number; isActiveToday: boolean } | null>(null)

  useEffect(() => {
    setXp(getTotalXP())
    setStreak(getStreakInfo())
  }, [])

  if (xp === null || streak === null) return null
  if (xp === 0 && streak.count === 0) return null

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.85rem',
        padding: '0.45rem 0.9rem',
        borderRadius: 20,
        background: 'var(--bg)',
        border: '1.5px solid var(--line-soft)',
        fontSize: '0.82rem',
        fontFamily: 'var(--mono)',
        fontWeight: 700,
        flexWrap: 'wrap',
      }}
    >
      {streak.count > 0 && (
        <span
          style={{
            color: streak.isActiveToday ? '#d97706' : 'var(--muted)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.25rem',
          }}
          title={streak.isActiveToday ? '¡Racha activa hoy!' : 'Racha en pausa'}
        >
          🔥 {streak.count} {streak.count === 1 ? 'día' : 'días'}
          {showMotivation && streak.isActiveToday && (
            <span style={{ fontSize: '0.68rem', fontWeight: 600, marginLeft: 2 }}>
              ¡Sigue así!
            </span>
          )}
        </span>
      )}
      {streak.count > 0 && xp > 0 && (
        <span style={{ color: 'var(--muted)', fontSize: '0.65rem' }}>·</span>
      )}
      {xp > 0 && (
        <span style={{ color: '#2563eb', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
          ⚡ {xp} XP
        </span>
      )}
    </div>
  )
}
