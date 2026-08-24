export type PronounTopicOption<TopicId extends string> = {
  id: TopicId
  label: string
  group: string
  level: string
}

export type PronounPreset<TopicId extends string> = {
  label: string
  ids: TopicId[]
}

export type PronounChoice<TopicId extends string> = {
  id: string
  topic: TopicId
  focus: string
  prompt: string
  context: string
  options: string[]
  answer: string
  explanation: string
}

export type PronounBankCard = { id: string; text: string }

export type PronounBankGap<TopicId extends string> = {
  id: string
  topic: TopicId
  label: string
  answerCardId: string
}

export type PronounBankChallenge<TopicId extends string> = {
  id: string
  title: string
  instruction: string
  segments: string[]
  gaps: PronounBankGap<TopicId>[]
  cards: PronounBankCard[]
  explanation: string
}

export type PronounLevel = {
  number: string
  title: string
  short: string
  description: string
}

export type PronounQuestConfig<TopicId extends string> = {
  id: string
  storageKey: string
  languageName: string
  languageCode: string
  topics: readonly PronounTopicOption<TopicId>[]
  presets: readonly PronounPreset<TopicId>[]
  levels: readonly PronounLevel[]
  recognition: PronounChoice<TopicId>[]
  functions: PronounChoice<TopicId>[]
  placement: PronounChoice<TopicId>[]
  repairs: PronounChoice<TopicId>[]
  transformations: PronounChoice<TopicId>[]
  finalChallenge: PronounBankChallenge<TopicId>
}
