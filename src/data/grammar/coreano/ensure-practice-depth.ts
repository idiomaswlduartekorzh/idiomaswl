import type { ChoiceItem, GrammarTopic, WriteItem } from '../types'

const MINIMUM_ACTIVITY_COUNT = 28

const DECISION_FALLBACKS = [
  'Identifica primero la relación que quieres expresar y después elige la terminación.',
  'Comprueba el tallo verbal antes de añadir la estructura objetivo.',
  'Mantén el mismo registro de cortesía en toda la oración.',
]

const MISTAKE_FALLBACKS = [
  'No traduzcas la estructura palabra por palabra: decide primero su función en la escena.',
  'No mezcles terminaciones formales e informales dentro de la misma intervención.',
  'Revisa el orden coreano completo antes de añadir la terminación al verbo.',
]

export function ensureKoreanPracticeDepth(topic: GrammarTopic): GrammarTopic {
  const guide = {
    ...topic.guide,
    decisions: fillToMinimum(topic.guide.decisions, DECISION_FALLBACKS, 3),
    mistakes: fillToMinimum(topic.guide.mistakes, MISTAKE_FALLBACKS, 3),
  }

  if (countActivities(topic) >= MINIMUM_ACTIVITY_COUNT) {
    return { ...topic, guide }
  }

  const koreanOptions = topic.visual.scene.map(([korean]) => korean)
  const spanishOptions = topic.visual.scene.map(([, spanish]) => spanish)
  const choiceItems: ChoiceItem[] = topic.visual.scene.flatMap(([korean, spanish], index) => [
    {
      scene: `Comprensión ${index + 1}`,
      lines: [['Coreano', korean], ['Consigna', 'Elige el significado correcto.']],
      options: orderedOptions(spanishOptions, index),
      answer: spanish,
      explain: `${korean} significa: ${spanish}`,
    },
    {
      scene: `Reconstrucción ${index + 1}`,
      lines: [['Español', spanish], ['Consigna', 'Elige la frase coreana equivalente.']],
      options: orderedOptions(koreanOptions, index),
      answer: korean,
      explain: `La forma natural en esta escena es: ${korean}`,
    },
  ])
  const writeItems: WriteItem[] = topic.visual.scene.map(([korean, spanish], index) => ({
    scene: `Producción ${index + 1}`,
    prompt: `Escribe en coreano: «${spanish}»`,
    answer: korean,
    explain: `Modelo: ${korean}`,
  }))
  const strengthenedLevels = topic.practice.levels.map((level) => {
    if (level.type === 'choice' && level.items.length < 3) {
      return { ...level, items: [...level.items, ...choiceItems.slice(0, 3 - level.items.length)] }
    }
    if (level.type === 'write' && level.items.length < 3) {
      return { ...level, items: [...level.items, ...writeItems.slice(0, 3 - level.items.length)] }
    }
    return level
  })

  return {
    ...topic,
    guide,
    practice: {
      levels: [
        ...strengthenedLevels,
        {
          id: 'level-scene-comprehension',
          title: 'Comprensión y reconstrucción',
          tag: 'Escenas reales',
          intro: 'Relaciona cada escena con su significado y reconstruye la frase coreana.',
          type: 'choice',
          items: choiceItems,
        },
        {
          id: 'level-scene-production',
          title: 'Producción aplicada',
          tag: 'Escritura guiada',
          intro: 'Produce la estructura completa en situaciones cotidianas.',
          type: 'write',
          items: writeItems,
        },
      ],
    },
  }
}

function countActivities(topic: GrammarTopic): number {
  return topic.practice.levels.reduce((total, level) => {
    if (level.type === 'dual') {
      return total + level.items.reduce((sum, item) => sum + item.blanks.length, 0)
    }
    if (level.type === 'choice' || level.type === 'write') {
      return total + level.items.length
    }
    return total + level.blanks.length
  }, 0)
}

function orderedOptions(values: string[], answerIndex: number): string[] {
  return [values[answerIndex], ...values.filter((_, index) => index !== answerIndex)].slice(0, 4)
}

function fillToMinimum(values: string[], fallbacks: string[], minimum: number): string[] {
  const result = [...values]
  for (const fallback of fallbacks) {
    if (result.length >= minimum) break
    if (!result.includes(fallback)) result.push(fallback)
  }
  return result
}
