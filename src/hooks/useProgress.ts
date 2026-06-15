'use client'

import { useState, useEffect, useCallback } from 'react'
import {
  getProgress,
  saveSkillCompletion,
  getSkillProgress,
  getLevelProgress,
  getStreakInfo,
  getTotalXP,
  getTotalCompletedSkills,
  saveWord,
  removeWord,
  getSavedWords,
  type ProgressStore,
  type SavedWord,
  type SkillProgress,
} from '@/lib/progress'

export type { ProgressStore, SavedWord, SkillProgress }

export function useProgress() {
  const [store, setStore] = useState<ProgressStore | null>(null)

  useEffect(() => {
    setStore(getProgress())
  }, [])

  const refresh = useCallback(() => {
    setStore(getProgress())
  }, [])

  const saveSkill = useCallback(
    (lang: string, level: string, skill: string, score: number): number => {
      const xpEarned = saveSkillCompletion(lang, level, skill, score)
      refresh()
      return xpEarned
    },
    [refresh],
  )

  const saveVocabWord = useCallback(
    (word: string, translation: string, lang: string, context?: string) => {
      saveWord(word, translation, lang, context)
      refresh()
    },
    [refresh],
  )

  const deleteWord = useCallback(
    (word: string, lang: string) => {
      removeWord(word, lang)
      refresh()
    },
    [refresh],
  )

  return {
    store,
    refresh,
    saveSkill,
    saveVocabWord,
    deleteWord,
    getSkillProgress,
    getLevelProgress,
    getStreakInfo,
    getTotalXP,
    getTotalCompletedSkills,
    getSavedWords,
  }
}
