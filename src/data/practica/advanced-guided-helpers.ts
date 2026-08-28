import type { GuidedChoiceQuestion } from './advanced-guided-topics.ts'

type FourStrings = readonly [string, string, string, string]

export function guidedQuestion(
  id: string,
  family: string,
  prompt: string,
  options: FourStrings,
  answer: 0 | 1 | 2 | 3,
  evidence: string,
  errorCode: string,
  feedback: FourStrings,
): GuidedChoiceQuestion {
  return {
    id,
    family,
    prompt,
    options: options.map((text, index) => ({
      text,
      feedback: index === answer ? `This is the best-supported answer: ${evidence}` : feedback[index],
    })),
    answer,
    evidence,
    errorCode,
  }
}
