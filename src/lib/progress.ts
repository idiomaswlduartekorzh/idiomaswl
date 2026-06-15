export interface SavedWord {
  word: string
  translation: string
  lang: string
  context?: string
  savedAt: string
}

export interface SkillProgress {
  completed: boolean
  score: number
  bestScore: number
  attempts: number
  lastAttempt: string
}

export interface ProgressStore {
  version: 1
  lastSeen: string
  streak: { count: number; lastDate: string }
  xp: number
  languages: {
    [lang: string]: {
      [level: string]: {
        [skill: string]: SkillProgress
      }
    }
  }
  savedWords: SavedWord[]
}

const KEY = 'wl_progress'

const DEFAULT: ProgressStore = {
  version: 1,
  lastSeen: '',
  streak: { count: 0, lastDate: '' },
  xp: 0,
  languages: {},
  savedWords: [],
}

function todayStr(): string {
  return new Date().toISOString().split('T')[0]
}

function yesterdayStr(): string {
  const d = new Date()
  d.setDate(d.getDate() - 1)
  return d.toISOString().split('T')[0]
}

export function getProgress(): ProgressStore {
  if (typeof window === 'undefined') return { ...DEFAULT }
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return { ...DEFAULT }
    const parsed = JSON.parse(raw)
    return {
      ...DEFAULT,
      ...parsed,
      streak: { ...DEFAULT.streak, ...parsed.streak },
      languages: parsed.languages ?? {},
      savedWords: parsed.savedWords ?? [],
    }
  } catch {
    return { ...DEFAULT }
  }
}

function setProgress(store: ProgressStore): void {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(KEY, JSON.stringify(store))
  } catch {
    // Private browsing or storage full — silently ignore
  }
}

// Returns XP earned from this completion
export function saveSkillCompletion(
  lang: string,
  level: string,
  skill: string,
  score: number,
): number {
  const store = getProgress()
  const langData = store.languages[lang] ?? {}
  const levelData = langData[level] ?? {}
  const existing = levelData[skill]

  const isFirstAttempt = !existing
  const bestScore = existing ? Math.max(existing.bestScore, score) : score

  let xpEarned = 20
  if (isFirstAttempt) xpEarned += 5
  if (score >= 80) xpEarned += 10
  if (score === 100) xpEarned += 10 // stacks with 80%+ bonus

  const today = todayStr()
  const lastDate = store.streak.lastDate
  let newStreak = store.streak.count

  if (lastDate !== today) {
    if (!lastDate || lastDate === yesterdayStr()) {
      newStreak = store.streak.count + 1
    } else {
      newStreak = 1
    }
    xpEarned += 15 // streak day bonus
  }

  const updated: ProgressStore = {
    ...store,
    xp: store.xp + xpEarned,
    streak: { count: newStreak, lastDate: today },
    lastSeen: new Date().toISOString(),
    languages: {
      ...store.languages,
      [lang]: {
        ...langData,
        [level]: {
          ...levelData,
          [skill]: {
            completed: true,
            score,
            bestScore,
            attempts: (existing?.attempts ?? 0) + 1,
            lastAttempt: new Date().toISOString(),
          },
        },
      },
    },
  }

  setProgress(updated)
  return xpEarned
}

export function getSkillProgress(
  lang: string,
  level: string,
  skill: string,
): SkillProgress | null {
  const store = getProgress()
  return store.languages[lang]?.[level]?.[skill] ?? null
}

export function getLevelProgress(
  lang: string,
  level: string,
): { completed: number; avgScore: number } {
  const store = getProgress()
  const levelData = store.languages[lang]?.[level] ?? {}
  const skills = Object.values(levelData)
  const completed = skills.filter(s => s.completed).length
  const avgScore =
    skills.length > 0
      ? Math.round(skills.reduce((sum, s) => sum + s.bestScore, 0) / skills.length)
      : 0
  return { completed, avgScore }
}

export function getLanguageProgress(lang: string): {
  totalSkills: number
  completedSkills: number
} {
  const store = getProgress()
  const langData = store.languages[lang] ?? {}
  let totalSkills = 0
  let completedSkills = 0
  for (const levelData of Object.values(langData)) {
    const skills = Object.values(levelData)
    totalSkills += skills.length
    completedSkills += skills.filter(s => s.completed).length
  }
  return { totalSkills, completedSkills }
}

export function getStreakInfo(): { count: number; isActiveToday: boolean } {
  const store = getProgress()
  return {
    count: store.streak.count,
    isActiveToday: store.streak.lastDate === todayStr(),
  }
}

export function addXP(amount: number): void {
  const store = getProgress()
  setProgress({ ...store, xp: store.xp + amount })
}

export function getTotalXP(): number {
  return getProgress().xp
}

export function getTotalCompletedSkills(): number {
  const store = getProgress()
  let total = 0
  for (const langData of Object.values(store.languages)) {
    for (const levelData of Object.values(langData)) {
      for (const skill of Object.values(levelData)) {
        if (skill.completed) total++
      }
    }
  }
  return total
}

export function saveWord(
  word: string,
  translation: string,
  lang: string,
  context?: string,
): void {
  const store = getProgress()
  if (store.savedWords.some(w => w.word === word && w.lang === lang)) return
  setProgress({
    ...store,
    savedWords: [
      ...store.savedWords,
      { word, translation, lang, context, savedAt: new Date().toISOString() },
    ],
  })
}

export function removeWord(word: string, lang: string): void {
  const store = getProgress()
  setProgress({
    ...store,
    savedWords: store.savedWords.filter(
      w => !(w.word === word && w.lang === lang),
    ),
  })
}

export function getSavedWords(): SavedWord[] {
  return getProgress().savedWords
}
