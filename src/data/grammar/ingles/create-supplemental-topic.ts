import type { Blank, GrammarTopic, WriteItem } from '../types'

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

export function createSupplementalTopic(config: SupplementalTopic): GrammarTopic {
  return {
    ...config,
    practice: {
      levels: [
        {
          id: 'level-1',
          title: 'Reconocimiento en contexto',
          tag: 'Opción múltiple',
          intro: 'Elige la forma que completa naturalmente cada situación.',
          type: 'choice',
          items: config.practice.choice.map((item) => ({
            scene: item.scene,
            lines: [['', item.prompt]],
            options: item.options,
            answer: item.answer,
            explain: item.explain,
          })),
        },
        {
          id: 'level-2',
          title: 'Dos decisiones conectadas',
          tag: '2 espacios',
          intro: 'Resuelve dos decisiones dentro de la misma situación.',
          type: 'dual',
          items: config.practice.dual.map((item) => ({
            scene: item.scene,
            lines: [['', item.prompt]],
            blanks: item.blanks,
          })),
        },
        {
          id: 'level-3',
          title: 'Texto guiado',
          tag: 'Opciones',
          intro: 'Mantén la estructura objetivo a lo largo de un texto completo.',
          type: 'guidedText',
          ...config.practice.guided,
        },
        {
          id: 'level-4',
          title: 'Texto libre',
          tag: 'Sin opciones',
          intro: 'Escribe cada forma sin banco de palabras.',
          type: 'freeText',
          ...config.practice.free,
        },
        {
          id: 'level-5',
          title: 'Producción controlada',
          tag: 'Producción',
          intro: 'Transforma la idea sin perder el significado.',
          type: 'write',
          items: config.practice.write,
        },
        {
          id: 'level-6',
          title: 'Misión comunicativa',
          tag: 'Reto final',
          intro: 'Usa la estructura en respuestas propias y situaciones reales.',
          type: 'write',
          items: config.practice.mission,
        },
      ],
    },
  }
}
