export type TimeReading = [time: string, model: string, alternatives: string[], reading?: string]
export type Dialog = [question: string, answer: string, questionReading?: string, answerReading?: string, answerEs?: string]
export type Gap = [sentence: string, answer: string, distractor1: string, distractor2: string, explanation: string]
export type Situation = [prompt: string, answer: string, alternatives: string[], explanation: string]

export interface ClockCopy {
  lead: string
  rule: string
  question: string
  readings: TimeReading[]
  notes: string[]
  vocabulary: [term: string, meaning: string, example: string][]
  tips: [title: string, example: string, explanation: string][]
  compare: [string, string]
  dialogs: [Dialog, Dialog, Dialog, Dialog]
  gaps: Gap[]
  situations: Situation[]
  reference: [name: string, url: string]
}
