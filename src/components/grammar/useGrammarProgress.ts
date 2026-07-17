'use client'

import { useState, useEffect } from 'react'

export interface LevelScore {
  score: number
  total: number
  percent: number
}

export interface GrammarProgress {
  unlocked: number
  scores: Record<string, LevelScore>
}

const makeKey = (idioma: string, nivel: string, slug: string) =>
  `wl-gram-${idioma}-${nivel}-${slug}`

const empty = (): GrammarProgress => ({ unlocked: 1, scores: {} })

export function useGrammarProgress(idioma: string, nivel: string, slug: string) {
  const [progress, setProgress] = useState<GrammarProgress>(empty)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const key = makeKey(idioma, nivel, slug)
    try {
      const raw = localStorage.getItem(key)
      if (raw) setProgress({ ...empty(), ...JSON.parse(raw) })
    } catch { /* ignore */ }
    setMounted(true)
  }, [idioma, nivel, slug])

  function save(next: GrammarProgress) {
    setProgress(next)
    try {
      localStorage.setItem(makeKey(idioma, nivel, slug), JSON.stringify(next))
    } catch { /* ignore */ }
  }

  function recordLevel(levelId: string, score: number, total: number, levelIndex: number, totalLevels: number) {
    const percent = total ? Math.round((score / total) * 100) : 0
    const prev = progress.scores[levelId]
    const bestScore = !prev || percent > prev.percent ? { score, total, percent } : prev
    const unlocked = percent >= 65 && levelIndex + 1 >= progress.unlocked
      ? Math.min(totalLevels, progress.unlocked + 1)
      : progress.unlocked
    save({ unlocked, scores: { ...progress.scores, [levelId]: bestScore } })
  }

  return { progress, mounted, recordLevel }
}
