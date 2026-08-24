import type {
  ChoiceChallenge,
  ErrorChallenge,
  FormOption,
  GapChallenge,
  LevelMeta,
  QuestPreset,
  TenseQuestConfig,
  TimelineChallenge,
} from './tense-quest-types'

export type StructureExample = {
  context: string
  answer: string
  wrong: string
  lemma: string
  cue: string
  distractors: [string, string, string]
  accepted?: string[]
}

export type StructureSeed<FormId extends string> = {
  id: FormId
  explanation: string
  examples: [StructureExample, StructureExample, StructureExample]
}

export type FinalRow<FormId extends string> = {
  formId: FormId
  lemma: string
  before: string
  after: string
  answer: string
}

type QuestText = {
  choicePrompt: (cue: string) => string
  microInstruction: string
  storyInstruction: string
  errorInstruction: string
  timelineContext: string
  timelineFocus: string
  finalTitle: string
  finalInstruction: string
  finalExplanation: string
}

const DEFAULT_LEVELS: readonly LevelMeta[] = [
  { number: '01', title: 'Elección rápida', short: 'Opción múltiple', description: 'Reconoce la forma que encaja con cada contexto.' },
  { number: '02', title: 'Microtextos', short: 'Producción breve', description: 'Escribe la unidad verbal completa a partir de una pista precisa.' },
  { number: '03', title: 'Usos conectados', short: 'Contextos amplios', description: 'Mantén la misma lógica gramatical en tres situaciones.' },
  { number: '04', title: 'Laboratorio de errores', short: 'Detecta y repara', description: 'Encuentra la forma que rompe la lógica y corrígela.' },
  { number: '05', title: 'Mapa de funciones', short: 'Relaciona usos', description: 'Asocia cada enunciado completo con su función temporal o discursiva.' },
  { number: '06', title: 'Reconstrucción final', short: 'Banco cerrado', description: 'Reconstruye un texto completo sin depender de corrección abierta.' },
]

const DEFAULT_TEXT: QuestText = {
  choicePrompt: (cue) => `Elige la forma adecuada para: ${cue}.`,
  microInstruction: 'Escribe la forma verbal completa.',
  storyInstruction: 'Completa los tres contextos con la forma objetivo.',
  errorInstruction: 'Selecciona la unidad que rompe la lógica y reescríbela correctamente.',
  timelineContext: 'Relaciona cada enunciado completo con la pista que justifica esta forma.',
  timelineFocus: 'Función en contexto',
  finalTitle: 'El itinerario final',
  finalInstruction: 'Selecciona un espacio y después su tarjeta. Cada tarjeta se usa una vez.',
  finalExplanation: 'El texto integra todas las formas seleccionables dentro de una secuencia coherente.',
}

function split(context: string) {
  const parts = context.split('___')
  if (parts.length !== 2) throw new Error(`Cada ejemplo debe contener un solo hueco: ${context}`)
  return [parts[0], parts[1]] as const
}

export function createStructureQuest<FormId extends string>({
  id,
  storageKey,
  forms,
  presets,
  seeds,
  finalRows,
  copy,
  text = {},
}: {
  id: string
  storageKey: string
  forms: readonly FormOption<FormId>[]
  presets: readonly QuestPreset<FormId>[]
  seeds: readonly StructureSeed<FormId>[]
  finalRows: readonly FinalRow<FormId>[]
  copy: TenseQuestConfig<FormId>['copy']
  text?: Partial<QuestText>
}): TenseQuestConfig<FormId> {
  const labels = new Map(forms.map((form) => [form.id, form.label]))
  const ui = { ...DEFAULT_TEXT, ...text }

  const choices: ChoiceChallenge<FormId>[] = seeds.flatMap((seed) => seed.examples.map((example, index) => ({
    id: `${id}-choice-${seed.id}-${index + 1}`,
    tenses: [seed.id],
    focus: labels.get(seed.id) ?? seed.id,
    prompt: ui.choicePrompt(example.cue),
    context: example.context,
    options: [example.distractors[0], example.answer, example.distractors[1], example.distractors[2]],
    answer: example.answer,
    explanation: seed.explanation,
  })))

  const micros: GapChallenge<FormId>[] = seeds.flatMap((seed) => seed.examples.map((example, index) => ({
    id: `${id}-micro-${seed.id}-${index + 1}`,
    title: `${labels.get(seed.id) ?? seed.id} · ${index + 1}`,
    focus: example.cue,
    instruction: ui.microInstruction,
    segments: [...split(example.context)],
    gaps: [{
      id: `${id}-micro-gap-${seed.id}-${index + 1}`,
      tense: seed.id,
      verb: example.lemma,
      answers: [example.answer, ...(example.accepted ?? [])],
    }],
    explanation: seed.explanation,
  })))

  const stories: GapChallenge<FormId>[] = seeds.flatMap((seed) => [0, 1].map((variant) => {
    const examples = variant === 0 ? seed.examples : [seed.examples[1], seed.examples[2], seed.examples[0]]
    const parts = examples.map((example) => split(example.context))
    return {
      id: `${id}-story-${seed.id}-${variant + 1}`,
      title: `${labels.get(seed.id) ?? seed.id} · contexto ${variant + 1}`,
      focus: 'Tres usos contrastados',
      instruction: ui.storyInstruction,
      segments: [parts[0][0], `${parts[0][1]} ${parts[1][0]}`, `${parts[1][1]} ${parts[2][0]}`, parts[2][1]],
      gaps: examples.map((example, index) => ({
        id: `${id}-story-gap-${seed.id}-${variant + 1}-${index + 1}`,
        tense: seed.id,
        verb: example.lemma,
        answers: [example.answer, ...(example.accepted ?? [])],
      })),
      explanation: seed.explanation,
    }
  }))

  function createError(seed: StructureSeed<FormId>, wrongIndex: number): ErrorChallenge<FormId> {
    const parts = seed.examples.map((example) => split(example.context))
    return {
      id: `${id}-error-${seed.id}-${wrongIndex + 1}`,
      tense: seed.id,
      title: `${labels.get(seed.id) ?? seed.id} · reparación ${wrongIndex + 1}`,
      focus: seed.examples[wrongIndex].cue,
      instruction: ui.errorInstruction,
      chunks: seed.examples.map((example, index) => ({
        before: index === 0 ? parts[index][0] : `${parts[index - 1][1]} ${parts[index][0]}`,
        id: `${id}-error-token-${seed.id}-${wrongIndex + 1}-${index + 1}`,
        form: index === wrongIndex ? example.wrong : example.answer,
      })),
      after: parts[2][1],
      wrongId: `${id}-error-token-${seed.id}-${wrongIndex + 1}-${wrongIndex + 1}`,
      answers: [seed.examples[wrongIndex].answer, ...(seed.examples[wrongIndex].accepted ?? [])],
      explanation: seed.explanation,
    }
  }

  const errors = seeds.flatMap((seed) => [createError(seed, 0), createError(seed, 1)])

  const timelines: TimelineChallenge<FormId>[] = seeds.map((seed) => ({
    id: `${id}-timeline-${seed.id}`,
    title: `${labels.get(seed.id) ?? seed.id} · mapa`,
    focus: ui.timelineFocus,
    context: ui.timelineContext,
    slots: seed.examples.map((example, index) => ({
      id: `${id}-timeline-slot-${seed.id}-${index + 1}`,
      tense: seed.id,
      label: example.cue,
      hint: example.context.replace('___', '…'),
      answer: example.context.replace('___', example.answer),
    })),
    options: [2, 0, 1].map((index) => seed.examples[index].context.replace('___', seed.examples[index].answer)),
    explanation: seed.explanation,
  }))

  const finalCards = finalRows.map((row, index) => ({ id: `${id}-final-card-${index + 1}`, text: row.answer }))

  return {
    id,
    storageKey,
    forms,
    presets,
    levels: DEFAULT_LEVELS,
    choiceChallenges: choices,
    microStories: micros,
    longStories: stories,
    errorChallenges: errors,
    timelineChallenges: timelines,
    finalChallenges: [{
      id: `${id}-final`,
      title: ui.finalTitle,
      instruction: ui.finalInstruction,
      segments: [finalRows[0]?.before ?? '', ...finalRows.map((row, index) => `${row.after}${finalRows[index + 1]?.before ?? ''}`)],
      gaps: finalRows.map((row, index) => ({
        id: `${id}-final-gap-${index + 1}`,
        tenseId: row.formId,
        tense: labels.get(row.formId) ?? row.formId,
        answerCardId: `${id}-final-card-${index + 1}`,
      })),
      cards: [...finalCards.slice(Math.ceil(finalCards.length / 2)), ...finalCards.slice(0, Math.ceil(finalCards.length / 2))],
      explanation: ui.finalExplanation,
    }],
    copy,
  }
}
