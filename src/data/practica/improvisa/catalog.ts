import generated from './catalog.generated'
import { B1_EXERCISES } from './english-b1-original'
import type { ImprovisaExercise, ImprovisaLanguage, ImprovisaLevel } from './config'

export function getImprovisaExercises(language: ImprovisaLanguage, level: ImprovisaLevel): ImprovisaExercise[] {
  const catalog = generated as Record<ImprovisaLanguage, Record<ImprovisaLevel, ImprovisaExercise[]>>
  const exercises = catalog[language][level]
  if (language !== 'ingles' || level !== 'b1') return exercises
  return [
    ...B1_EXERCISES.map((item) => ({
      title: { es: item.title.es, target: item.title.en },
      question: item.question,
      followUp: item.followUp,
      focus: { es: item.focus.es, target: item.focus.en },
      cues: item.cues.map((cue) => ({
        category: { es: cue.category.es, target: cue.category.en },
        word: cue.word,
        gloss: '',
      })),
    })),
    ...exercises.slice(0, 15),
  ]
}
