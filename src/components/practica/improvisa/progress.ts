import type { ImprovisaLanguage, ImprovisaLevel } from '@/data/practica/improvisa/config'

export function progressKey(language: ImprovisaLanguage, level: ImprovisaLevel) {
  return `improvisa:v3:${language}:${level}`
}

export function readCompleted(language: ImprovisaLanguage, level: ImprovisaLevel, count: number): number[] {
  const key = progressKey(language, level)
  const raw = window.localStorage.getItem(key)
  if (raw) {
    try {
      const parsed: unknown = JSON.parse(raw)
      if (Array.isArray(parsed)) return [...new Set(parsed.filter((index): index is number => Number.isInteger(index) && index >= 0 && index < count))]
    } catch { /* Fall back to the previous progress format. */ }
  }
  const legacy = Number(window.localStorage.getItem(`improvisa:v2:${language}:${level}`))
  if (!Number.isInteger(legacy) || legacy <= 0) return []
  return Array.from({ length: Math.min(legacy, count) }, (_, index) => index)
}

export function saveCompleted(language: ImprovisaLanguage, level: ImprovisaLevel, completed: number[]) {
  window.localStorage.setItem(progressKey(language, level), JSON.stringify(completed))
}
