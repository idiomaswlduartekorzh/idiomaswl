import type {
  PronounChoice,
  PronounLevel,
  PronounPreset,
  PronounQuestConfig,
  PronounTopicOption,
} from './pronoun-quest-types'

export type PronounExample = {
  context: string
  answer: string
  distractors: [string, string, string]
  cue: string
  functionAnswer: string
  functionDistractors: [string, string, string]
  wrong: string
  transformPrompt: string
  transformAnswer: string
  transformDistractors: [string, string, string]
}

export type PronounSeed<TopicId extends string> = {
  id: TopicId
  explanation: string
  examples: [PronounExample, PronounExample, PronounExample]
  final: { before: string; after: string; answer: string }
}

const LEVELS: readonly PronounLevel[] = [
  { number: '01', title: 'El referente', short: 'Elige la forma', description: 'Relaciona una persona, cosa o grupo con el pronombre que lo sustituye.' },
  { number: '02', title: 'La función', short: 'Lee la relación', description: 'Distingue qué trabajo realiza el pronombre dentro de la oración.' },
  { number: '03', title: 'La frase completa', short: 'Integra la forma', description: 'Escoge la oración completa que conserva referente, función y concordancia.' },
  { number: '04', title: 'La reparación', short: 'Error y cambio', description: 'Detecta la forma problemática y selecciona una corrección completa.' },
  { number: '05', title: 'La transformación', short: 'Sustituye sin perder', description: 'Reescribe mentalmente la idea y conserva referente, función y concordancia.' },
  { number: '06', title: 'La cadena final', short: 'Banco cerrado', description: 'Reconstruye una escena donde cada pronombre debe mantener claro su referente.' },
]

function options(correct: string, distractors: readonly string[], position: number) {
  const result = [...distractors]
  result.splice(position % 4, 0, correct)
  return result
}

export function createPronounQuest<TopicId extends string>({
  id,
  storageKey,
  languageName,
  languageCode,
  title,
  reviewLinks,
  finalTitle,
  finalExplanation,
  topics,
  presets,
  seeds,
  finalDistractors = [],
}: {
  id: string
  storageKey: string
  languageName: string
  languageCode: string
  title: string
  reviewLinks: readonly { href: string; label: string }[]
  finalTitle: string
  finalExplanation?: string
  topics: readonly PronounTopicOption<TopicId>[]
  presets: readonly PronounPreset<TopicId>[]
  seeds: readonly PronounSeed<TopicId>[]
  finalDistractors?: readonly string[]
}): PronounQuestConfig<TopicId> {
  const labels = new Map(topics.map((topic) => [topic.id, topic.label]))

  const makeChoices = (
    kind: string,
    build: (seed: PronounSeed<TopicId>, example: PronounExample, index: number, globalIndex: number) => Omit<PronounChoice<TopicId>, 'id' | 'topic' | 'explanation'>,
  ) => seeds.flatMap((seed, seedIndex) => seed.examples.map((example, index) => ({
    id: `${id}-${kind}-${seed.id}-${index + 1}`,
    topic: seed.id,
    explanation: seed.explanation,
    ...build(seed, example, index, seedIndex * 3 + index),
  })))

  const recognition = makeChoices('recognition', (seed, example, _index, globalIndex) => ({
    focus: labels.get(seed.id) ?? seed.id,
    prompt: example.cue,
    context: example.context,
    options: options(example.answer, example.distractors, globalIndex),
    answer: example.answer,
  }))

  const functions = makeChoices('function', (seed, example, _index, globalIndex) => ({
    focus: 'Función en contexto',
    prompt: `En esta frase, ¿qué función cumple «${example.answer}»?`,
    context: example.context.replace('___', example.answer),
    options: options(example.functionAnswer, example.functionDistractors, globalIndex + 1),
    answer: example.functionAnswer,
  }))

  const placement = makeChoices('placement', (seed, example, _index, globalIndex) => ({
    focus: labels.get(seed.id) ?? seed.id,
    prompt: 'Elige la oración completa que integra correctamente el pronombre.',
    context: example.cue,
    options: options(
      example.context.replace('___', example.answer),
      example.distractors.map((distractor) => example.context.replace('___', distractor)),
      globalIndex + 2,
    ),
    answer: example.context.replace('___', example.answer),
  }))

  const repairs = makeChoices('repair', (seed, example, _index, globalIndex) => ({
    focus: 'Error frecuente',
    prompt: `La forma «${example.wrong}» rompe la frase. ¿Qué cambio la repara?`,
    context: example.context.replace('___', example.wrong),
    options: options(`${example.wrong} → ${example.answer}`, example.distractors.map((item) => `${example.wrong} → ${item}`), globalIndex + 3),
    answer: `${example.wrong} → ${example.answer}`,
  }))

  const transformations = makeChoices('transformation', (seed, example, _index, globalIndex) => ({
    focus: 'Sustitución completa',
    prompt: 'Sustituye el elemento indicado sin cambiar el significado.',
    context: example.transformPrompt,
    options: options(example.transformAnswer, example.transformDistractors, globalIndex),
    answer: example.transformAnswer,
  }))

  const rows = seeds.map((seed) => seed.final)
  const cards = rows.map((row, index) => ({ id: `${id}-final-card-${index + 1}`, text: row.answer }))

  return {
    id,
    storageKey,
    languageName,
    languageCode,
    title,
    reviewLinks,
    topics,
    presets,
    levels: LEVELS,
    recognition,
    functions,
    placement,
    repairs,
    transformations,
    finalChallenge: {
      id: `${id}-final`,
      title: finalTitle,
      instruction: 'Selecciona un espacio y después la tarjeta que mantiene claro quién hace qué a quién.',
      segments: [rows[0]?.before ?? '', ...rows.map((row, index) => `${row.after}${rows[index + 1]?.before ?? ''}`)],
      gaps: seeds.map((seed, index) => ({
        id: `${id}-final-gap-${index + 1}`,
        topic: seed.id,
        label: labels.get(seed.id) ?? seed.id,
        answerCardId: `${id}-final-card-${index + 1}`,
      })),
      cards: [
        ...cards.slice(Math.ceil(cards.length / 2)),
        ...finalDistractors.map((text, index) => ({ id: `${id}-final-distractor-${index + 1}`, text })),
        ...cards.slice(0, Math.ceil(cards.length / 2)),
      ],
      explanation: finalExplanation ?? 'Cada forma conserva un referente distinto; la posición permite reconstruir la cadena sin repetir todos los nombres.',
    },
  }
}
