import type { Blank, GrammarTopic, WriteItem } from '../types.ts'
import { localizeAdvancedEnglishTopic } from './localize-advanced-topic.ts'

type ChoiceDraft = {
  scene: string
  prompt: string
  options: string[]
  answer: string
  explain: string
}

type DualDraft = {
  scene: string
  prompt: string
  blanks: Blank[]
}

type TextDraft = {
  scene: string
  text: string
  blanks: Blank[]
}

type SupplementalPractice = {
  choice: ChoiceDraft[]
  dual: DualDraft[]
  guided: TextDraft
  free: TextDraft
  write: WriteItem[]
  mission: WriteItem[]
}

export type SupplementalTopic = Omit<GrammarTopic, 'practice'> & {
  practice: SupplementalPractice
}

export function createSupplementalTopic(
  config: SupplementalTopic,
  options: { language?: 'es' | 'en' } = {},
): GrammarTopic {
  const english = options.language === 'en'
  const topic = english ? localizeAdvancedEnglishTopic(config) : config
  return {
    ...topic,
    practice: {
      levels: [
        {
          id: 'level-1',
          title: english ? 'Recognition in context' : 'Reconocimiento en contexto',
          tag: english ? 'Multiple choice' : 'Opción múltiple',
          intro: english ? 'Choose the form that completes each situation naturally.' : 'Elige la forma que completa naturalmente cada situación.',
          type: 'choice',
          items: topic.practice.choice.map((item) => ({
            scene: item.scene,
            lines: [['', item.prompt]],
            options: item.options,
            answer: item.answer,
            explain: item.explain,
          })),
        },
        {
          id: 'level-2',
          title: english ? 'Two connected decisions' : 'Dos decisiones conectadas',
          tag: english ? '2 gaps' : '2 espacios',
          intro: english ? 'Resolve two connected choices within the same context.' : 'Resuelve dos decisiones dentro de la misma situación.',
          type: 'dual',
          items: topic.practice.dual.map((item) => ({
            scene: item.scene,
            lines: [['', item.prompt]],
            blanks: item.blanks,
          })),
        },
        {
          id: 'level-3',
          title: english ? 'Guided text' : 'Texto guiado',
          tag: english ? 'Options' : 'Opciones',
          intro: english ? 'Maintain the target structure throughout a complete text.' : 'Mantén la estructura objetivo a lo largo de un texto completo.',
          type: 'guidedText',
          ...topic.practice.guided,
        },
        {
          id: 'level-4',
          title: english ? 'Open text' : 'Texto libre',
          tag: english ? 'No options' : 'Sin opciones',
          intro: english ? 'Supply every form without a word bank.' : 'Escribe cada forma sin banco de palabras.',
          type: 'freeText',
          ...topic.practice.free,
        },
        {
          id: 'level-5',
          title: english ? 'Controlled production' : 'Producción controlada',
          tag: english ? 'Production' : 'Producción',
          intro: english ? 'Transform the idea without changing its meaning.' : 'Transforma la idea sin perder el significado.',
          type: 'write',
          items: topic.practice.write,
        },
        {
          id: 'level-6',
          title: english ? 'Communicative mission' : 'Misión comunicativa',
          tag: english ? 'Final challenge' : 'Reto final',
          intro: english ? 'Use the structure in original responses and realistic situations.' : 'Usa la estructura en respuestas propias y situaciones reales.',
          type: 'write',
          items: topic.practice.mission,
        },
      ],
    },
  }
}
