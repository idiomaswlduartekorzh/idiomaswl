export type TutorLocale = 'es' | 'en'
export type ReadingLanguage = 'en' | 'fr' | 'it' | 'de' | 'ru' | 'ja' | 'ko' | 'pt'
export type CefrLevel = 'A0' | 'A1' | 'A2' | 'B1' | 'B2' | 'C1'
export type ReadingStatus = 'draft' | 'review' | 'approved' | 'published' | 'retired'
export type ReadingSkill = 'global' | 'detail' | 'vocabulary' | 'inference' | 'organization' | 'reference' | 'purpose' | 'tone'

export type LocalizedText = Partial<Record<TutorLocale, string>>

export type ReadingOption = {
  id: string
  text: string
}

export type ReadingQuestion = {
  id: string
  type:
    | 'single-choice'
    | 'multiple-choice'
    | 'true-false'
    | 'true-false-not-given'
    | 'matching'
    | 'ordering'
    | 'gap-fill'
    | 'select-in-text'
    | 'short-answer'
    | 'main-idea'
    | 'detail'
    | 'inference'
    | 'reference'
    | 'purpose'
    | 'tone'
    | 'vocabulary-in-context'
  skill: ReadingSkill
  prompt: string
  options?: ReadingOption[]
  answer: string | boolean | string[] | Record<string, unknown>
  feedback: {
    correct: LocalizedText
    incorrect: LocalizedText
    strategy: LocalizedText
    distractorNotes?: Record<string, LocalizedText>
  }
  evidence: string
  maxAttempts?: number
}

export type ReadingExercise = {
  schemaVersion: '1.0.0'
  id: string
  status: ReadingStatus
  language: ReadingLanguage
  variant: string
  tutorLocales: TutorLocale[]
  level: {
    cefr: CefrLevel
    displayLabel: string
    jlpt?: 'N5' | 'N4' | 'N3' | 'N2' | 'N1'
    topik?: number
    mappingDisclaimer?: LocalizedText
  }
  slug: string
  series: null | {
    id: string
    episode: number
    totalEpisodes: number
    previousExerciseId?: string | null
    nextExerciseId?: string | null
  }
  classification: {
    genre: string
    topic: string
    intent: string
    tags?: string[]
  }
  content: {
    title: LocalizedText
    intro: LocalizedText
    mission: LocalizedText
    targetText: string
    plainTextForAnalysis?: string
    wordCount: number
    estimatedMinutes: number
    objectives: LocalizedText[]
    grammarFocus?: string[]
    vocabulary: Array<{
      surface: string
      lemma: string
      reading?: string
      glosses: LocalizedText
      audioRequired: boolean
      levelStatus?: 'within-level' | 'out-of-level-glossed'
    }>
    culturalNote?: LocalizedText
    spanishSpeakerNote?: LocalizedText
    sources?: Array<{ label: string; url: string; accessedAt?: string }>
  }
  audio?: null | {
    src: string
    speakerVariant: string
    transcriptMatchesText: true
    defaultRate?: number
  }
  scriptSupport?: {
    furigana?: boolean
    romanization?: 'none' | 'optional' | 'a0-only'
    stressMarks?: boolean
    tokenizationMode?: 'space' | 'morphological' | 'custom'
  }
  leveling: {
    targetCanDo: LocalizedText
    allowedGrammar: string[]
    disallowedGrammar?: string[]
    maxOutOfLevelVocabularyPercent: number
    inferenceBand: 'none' | 'minimal' | 'light' | 'moderate' | 'high'
    metrics: {
      averageSentenceWords: number
      maxSentenceWords: number
      outOfLevelVocabularyPercent: number
      glossedOutOfLevelItems?: number
    }
    independentAssessment: {
      estimatedLevel: CefrLevel
      passed: boolean
      assessor?: string
      assessedAt: string
      notes?: string
    }
  }
  questions: ReadingQuestion[]
  production: {
    prompt: LocalizedText
    minWords: number
    maxWords: number
    hints: string[]
    scored: boolean
  }
  review: {
    author: string
    languageReviewer: string
    pedagogyReviewer: string
    reviewedAt: string
    copyrightChecked: true
    cultureChecked: true
    aiAssisted?: boolean
    aiUseNote?: string
  }
  seo: {
    title: LocalizedText
    description: LocalizedText
    canonicalPath: string
    indexable: boolean
    lastModified: string
    relatedExerciseIds?: string[]
  }
}
