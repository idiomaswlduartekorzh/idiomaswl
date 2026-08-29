export type FormOption<FormId extends string> = {
  id: FormId
  label: string
  group: string
}

export type QuestPreset<FormId extends string> = {
  label: string
  ids: FormId[]
}

export type ChoiceChallenge<FormId extends string> = {
  id: string
  tenses: FormId[]
  focus: string
  prompt: string
  context: string
  options: string[]
  answer: string
  explanation: string
}

export type Gap<FormId extends string> = {
  id: string
  tense: FormId
  verb: string
  answers: string[]
}

export type GapChallenge<FormId extends string> = {
  id: string
  title: string
  focus: string
  instruction: string
  segments: string[]
  gaps: Gap<FormId>[]
  explanation: string
}

export type ErrorChunk = { before: string; id: string; form: string }

export type ErrorChallenge<FormId extends string> = {
  id: string
  tense: FormId
  title: string
  focus: string
  instruction: string
  chunks: ErrorChunk[]
  after: string
  wrongId: string
  answers: string[]
  explanation: string
}

export type TimelineSlot<FormId extends string> = {
  id: string
  tense: FormId
  label: string
  hint: string
  answer: string
}

export type TimelineChallenge<FormId extends string> = {
  id: string
  title: string
  focus: string
  context: string
  slots: TimelineSlot<FormId>[]
  options: string[]
  explanation: string
}

export type BankCard = { id: string; text: string }

export type BankGap<FormId extends string> = {
  id: string
  tenseId: FormId
  tense: string
  answerCardId: string
  candidateCardIds?: string[]
  standalone?: { before: string; after: string }
}

export type BankChallenge<FormId extends string> = {
  id: string
  title: string
  instruction: string
  segments: string[]
  gaps: BankGap<FormId>[]
  cards: BankCard[]
  explanation: string
}

export type LevelMeta = {
  number: string
  title: string
  short: string
  description: string
}

export type QuestCopy = {
  languageName: string
  languageCode: string
  eyebrow: string
  title: string
  lead: string
  range: string
  selectedLabel: string
  selectorTitle: string
  selectorLead: string
  configuredEyebrow: string
  levelsTitle: string
  levelsLead: string
  mapLabels: [string, string, string, string]
  reviewLinks: { href: string; label: string }[]
  accent?: string
}

export type TenseQuestConfig<FormId extends string> = {
  id: string
  storageKey: string
  forms: readonly FormOption<FormId>[]
  presets: readonly QuestPreset<FormId>[]
  levels: readonly LevelMeta[]
  choiceChallenges: ChoiceChallenge<FormId>[]
  microStories: GapChallenge<FormId>[]
  longStories: GapChallenge<FormId>[]
  errorChallenges: ErrorChallenge<FormId>[]
  timelineChallenges: TimelineChallenge<FormId>[]
  finalChallenges: BankChallenge<FormId>[]
  copy: QuestCopy
}
