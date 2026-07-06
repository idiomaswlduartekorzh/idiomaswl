export type IcfesBand = 'A-' | 'A' | 'A+' | 'B' | 'B+'

export type IcfesSkill =
  | 'vocabulary_basic'
  | 'vocabulary_context'
  | 'grammar_recognition'
  | 'connectors'
  | 'reference_words'
  | 'main_idea'
  | 'detail'
  | 'inference'
  | 'paraphrase'
  | 'tone'
  | 'purpose'
  | 'sentence_order'
  | 'dialogue_completion'
  | 'scanning'
  | 'time_management'
  | 'functional_texts'

export interface IcfesQuestion {
  id: string
  text: string
  options: string[]
  correctAnswer: string
  explanation: string
}

export interface SkillAccuracy {
  skill: IcfesSkill
  accuracy: number // 0-1
  questionsDone: number
  trend?: number // % change
}

export interface MockResult {
  id: string
  title: string
  subtitle?: string
  score: number
  maxScore: number
  band: IcfesBand
  timeSpent: number // segundos
  completedAt: Date
}

export interface WeaknessArea {
  skill: IcfesSkill
  accuracy: number
  targetAccuracy: number
  questionsDone: number
  trend?: number
}

export interface IcfesPrepPlan {
  examDate: Date
  weeksRemaining: number
  currentWeek: number
}

export interface IcfesDashboardData {
  studentName: string
  estimatedBand: IcfesBand
  overallAccuracy: number
  mocksTaken: number
  consistencyDays: number
  recentMocks: MockResult[]
  weaknesses: WeaknessArea[]
  allSkills: SkillAccuracy[]
  todayChallenge?: {
    skill: IcfesSkill
    questions: IcfesQuestion[]
  }
  prepPlan: IcfesPrepPlan
}
