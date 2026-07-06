export type IcfesBand = 'A-' | 'A' | 'A+' | 'B' | 'B+'

/** Student profile captured by the onboarding wizard. */
export interface OnboardingProfile {
  level: 0 | 20 | 40 | 60 | 80 | 100
  minPerDay: 30 | 60 | 90 | 120
  goal: 'pass' | 'bandA' | 'bandAPlus'
  examDate: Date
  weeksAvailable: number
  recommendedPace: 'slow' | 'normal' | 'fast'
}

/** A single answer captured during the diagnostic test. */
export interface DiagnosticAnswer {
  question_number: number
  question_id: string
  student_answer: string
  correct_answer: string
  is_correct: boolean
  skill: string
  time_spent_seconds: number
}

/** Computed scoring of a diagnostic attempt (server-authored, client-rendered). */
export interface DiagnosticResults {
  overall_level: number
  skill_levels: Record<string, number>
  top_weaknesses: string[]
  top_strengths: string[]
  recommendations: string[]
}

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
