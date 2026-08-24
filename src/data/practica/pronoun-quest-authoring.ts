import type { PronounExample, PronounSeed } from './create-pronoun-quest.ts'

export type CompactPronounExample = {
  context: string
  answer: string
  distractors: [string, string, string]
  cue: string
  wrong: string
  transform: [prompt: string, answer: string, distractors: [string, string, string]]
}

/** Keeps language banks compact while preserving the complete audited engine contract. */
export function authorPronounSeed<TopicId extends string>({
  id,
  explanation,
  functionAnswer,
  functionDistractors,
  examples,
  final,
}: {
  id: TopicId
  explanation: string
  functionAnswer: string
  functionDistractors: [string, string, string]
  examples: [CompactPronounExample, CompactPronounExample, CompactPronounExample]
  final: PronounSeed<TopicId>['final']
}): PronounSeed<TopicId> {
  return {
    id,
    explanation,
    examples: examples.map((example) => ({
      context: example.context,
      answer: example.answer,
      distractors: example.distractors,
      cue: example.cue,
      functionAnswer,
      functionDistractors,
      wrong: example.wrong,
      transformPrompt: example.transform[0],
      transformAnswer: example.transform[1],
      transformDistractors: example.transform[2],
    })) as [PronounExample, PronounExample, PronounExample],
    final,
  }
}
