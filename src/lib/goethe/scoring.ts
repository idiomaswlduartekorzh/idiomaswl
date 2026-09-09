import type { FormGroupQuestion, MCQQuestion, MockExam } from '@/data/mocks/types'

export const GOETHE_RAW_MAX = 60
export const GOETHE_PASS_SCORE = 60
export const GOETHE_FACTOR = 1.66

export interface GoetheAutomaticScore {
  listeningCorrect: number
  readingCorrect: number
  formCorrect: number
  automaticRaw: number
  automaticScaled: number
}

export interface GoetheFinalScore extends GoetheAutomaticScore {
  writingOpenRaw: number
  speakingRaw: number
  totalRaw: number
  totalScore: number
  passed: boolean
  band: string
}

function normalise(value: string): string {
  return value.trim().toLocaleLowerCase('de-DE').replace(/[.,;:!?]+$/g, '').replace(/\s+/g, ' ')
}

function objectiveQuestions(mock: MockExam, skill: 'listening' | 'reading'): MCQQuestion[] {
  return mock.sections
    .filter(section => section.skill === skill)
    .flatMap(section => section.questions.filter(question => question.type === 'mcq') as MCQQuestion[])
}

function formQuestion(mock: MockExam): FormGroupQuestion {
  const question = mock.sections
    .filter(section => section.skill === 'writing')
    .flatMap(section => section.questions)
    .find(item => item.type === 'formgroup') as FormGroupQuestion | undefined
  if (!question) throw new Error('El simulacro Goethe no contiene el formulario esperado.')
  return question
}

export function scaleGoetheRaw(rawPoints: number): number {
  return Math.min(100, Math.max(0, Math.round(rawPoints * GOETHE_FACTOR)))
}

export function formatGoetheModule(rawPoints: number): string {
  return (rawPoints * GOETHE_FACTOR).toFixed(2).replace('.', ',')
}

export function goetheScoreBand(score: number): string {
  if (score >= 90) return 'sehr gut'
  if (score >= 80) return 'gut'
  if (score >= 70) return 'befriedigend'
  if (score >= 60) return 'ausreichend'
  return 'nicht bestanden'
}

export function scoreGoetheAutomatic(
  mock: MockExam,
  answers: Record<string, number>,
  formValues: Record<string, string>,
): GoetheAutomaticScore {
  const listeningCorrect = objectiveQuestions(mock, 'listening')
    .filter(question => answers[question.id] === question.answer).length
  const readingCorrect = objectiveQuestions(mock, 'reading')
    .filter(question => answers[question.id] === question.answer).length
  const formCorrect = formQuestion(mock).blanks.filter(blank =>
    blank.answers.some(answer => normalise(answer) === normalise(formValues[String(blank.num)] ?? ''))
  ).length
  const automaticRaw = listeningCorrect + readingCorrect + formCorrect
  return {
    listeningCorrect,
    readingCorrect,
    formCorrect,
    automaticRaw,
    automaticScaled: scaleGoetheRaw(automaticRaw),
  }
}

export function completeGoetheScore(
  automatic: GoetheAutomaticScore,
  writingOpenRaw: number,
  speakingRaw: number,
): GoetheFinalScore {
  const totalRaw = automatic.automaticRaw + writingOpenRaw + speakingRaw
  const totalScore = scaleGoetheRaw(totalRaw)
  return {
    ...automatic,
    writingOpenRaw,
    speakingRaw,
    totalRaw,
    totalScore,
    passed: totalScore >= GOETHE_PASS_SCORE,
    band: goetheScoreBand(totalScore),
  }
}
