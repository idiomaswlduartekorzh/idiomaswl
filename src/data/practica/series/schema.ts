export type Keyword = {
  target: string
  es: string
}

export type Turn = {
  speaker: string
  target: string
  es: string
  romanization?: string
}

export type Question = {
  prompt: string
  options: string[]
  answer: number
  feedback: string
}

/** Niveles con serie narrativa. Se amplía cuando un nivel nuevo se escribe. */
export type SeriesLevel = 'A1' | 'A2' | 'B1'

export type EpisodeAudit = {
  level: SeriesLevel
  grammarUsed: string[]
  newVocabulary: string[]
  possibleDifficulties: string[]
  estimatedDuration: number
  continuity: string
  pronunciationRisks: string[]
  recommendedChanges: string[]
}

export type A1ListeningEpisode = {
  id: string
  order: number
  title: string
  titleEs: string
  duration: number
  characters: string[]
  location: string
  objective: string
  grammar: string[]
  keywords: Keyword[]
  storyFunction: string
  turns: Turn[]
  ttsScript: string
  gist: Question
  details: [Question, Question, Question]
  consolidation: Question
  audit: EpisodeAudit
}

export type A1ListeningSeries = {
  language: string
  locale: string
  level: SeriesLevel
  seriesTitle: string
  seriesTitleEs: string
  premise: string
  characters: Array<{
    name: string
    role: string
    voiceProfile: string
  }>
  episodes: A1ListeningEpisode[]
}
