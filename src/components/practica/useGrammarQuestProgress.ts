'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'

interface LevelScore {
  score: number
  total: number
  percent: number
}

interface GrammarQuestProgress {
  version: 1
  unlocked: number
  activeLevel: number
  localXp: number
  levelScores: Record<string, LevelScore>
  completedAt?: string
}

interface SaveResult {
  percent: number
  xpEarned: number
  topicCompletedNow: boolean
  aggregatePercent: number
}

function emptyProgress(): GrammarQuestProgress {
  return {
    version: 1,
    unlocked: 1,
    activeLevel: 0,
    localXp: 0,
    levelScores: {},
  }
}

function clampUnlocked(value: number, totalLevels: number) {
  return Math.max(1, Math.min(totalLevels, value))
}

function safePercent(score: number, total: number) {
  return total > 0 ? Math.round((score / total) * 100) : 0
}

function aggregate(levelScores: Record<string, LevelScore>) {
  const scores = Object.values(levelScores)
  const total = scores.reduce((sum, item) => sum + item.total, 0)
  const score = scores.reduce((sum, item) => sum + item.score, 0)
  return safePercent(score, total)
}

export function useGrammarQuestProgress(storageKey: string, totalLevels: number) {
  const [mounted, setMounted] = useState(false)
  const [progress, setProgress] = useState<GrammarQuestProgress>(() => emptyProgress())

  useEffect(() => {
    let cancelled = false
    let nextProgress = emptyProgress()
    try {
      const raw = localStorage.getItem(storageKey)
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<GrammarQuestProgress>
        nextProgress = {
          ...emptyProgress(),
          ...parsed,
          version: 1,
          unlocked: clampUnlocked(parsed.unlocked ?? 1, totalLevels),
          activeLevel: Math.max(0, Math.min(totalLevels - 1, parsed.activeLevel ?? 0)),
          localXp: parsed.localXp ?? 0,
          levelScores: parsed.levelScores ?? {},
        }
      }
    } catch {
      nextProgress = emptyProgress()
    }

    queueMicrotask(() => {
      if (cancelled) return
      setProgress(nextProgress)
      setMounted(true)
    })

    return () => {
      cancelled = true
    }
  }, [storageKey, totalLevels])

  const persist = useCallback((next: GrammarQuestProgress) => {
    setProgress(next)
    try {
      localStorage.setItem(storageKey, JSON.stringify(next))
    } catch {
      // Storage can fail in private mode; the practice still works for the session.
    }
  }, [storageKey])

  const setActiveLevel = useCallback((activeLevel: number) => {
    setProgress((current) => {
      const next = {
        ...current,
        activeLevel: Math.max(0, Math.min(totalLevels - 1, activeLevel)),
      }
      try {
        localStorage.setItem(storageKey, JSON.stringify(next))
      } catch {}
      return next
    })
  }, [storageKey, totalLevels])

  const saveLevelResult = useCallback((
    levelId: string,
    levelIndex: number,
    score: number,
    total: number,
  ): SaveResult => {
    const percent = safePercent(score, total)
    let result: SaveResult = {
      percent,
      xpEarned: 0,
      topicCompletedNow: false,
      aggregatePercent: percent,
    }

    setProgress((current) => {
      const previous = current.levelScores[levelId]
      const previousScore = previous?.score ?? 0
      const improvedBy = Math.max(0, score - previousScore)
      const firstCompletionBonus = previous ? 0 : 15
      const passBonus = percent >= 85 && !previous ? 10 : 0
      const xpEarned = improvedBy * 10 + firstCompletionBonus + passBonus
      const nextScores = {
        ...current.levelScores,
        [levelId]: previous && previous.percent > percent
          ? previous
          : { score, total, percent },
      }
      const unlocked = percent >= 65
        ? Math.max(current.unlocked, Math.min(totalLevels, levelIndex + 2))
        : current.unlocked
      const completed = unlocked >= totalLevels && Object.keys(nextScores).length >= totalLevels
      const topicCompletedNow = completed && !current.completedAt
      const next: GrammarQuestProgress = {
        ...current,
        activeLevel: levelIndex,
        unlocked,
        localXp: current.localXp + xpEarned,
        levelScores: nextScores,
        completedAt: topicCompletedNow ? new Date().toISOString() : current.completedAt,
      }

      result = {
        percent,
        xpEarned,
        topicCompletedNow,
        aggregatePercent: aggregate(nextScores),
      }

      try {
        localStorage.setItem(storageKey, JSON.stringify(next))
      } catch {}

      return next
    })

    return result
  }, [storageKey, totalLevels])

  const resetProgress = useCallback(() => {
    const next = emptyProgress()
    persist(next)
  }, [persist])

  const completedLevels = useMemo(() => Object.keys(progress.levelScores).length, [progress.levelScores])

  return {
    mounted,
    progress,
    completedLevels,
    saveLevelResult,
    setActiveLevel,
    resetProgress,
  }
}
