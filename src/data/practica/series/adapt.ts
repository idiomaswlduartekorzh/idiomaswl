import type { ListeningExercise, ListeningQuestion } from '../ingles-a1-listening'
import type { A1ListeningSeries, Question } from './schema'

/**
 * Adaptador entre el esquema editorial de las series narrativas (turnos con hablante,
 * opciones como string[] + índice de respuesta) y el esquema que consume
 * ListeningJourney (transcripción plana, opciones como objetos con `correct`).
 *
 * La serie es la única fuente de verdad: el script de generación de audio lee los
 * mismos turnos que se pintan en pantalla, así que el audio y la transcripción no
 * pueden desincronizarse.
 */

/**
 * El runner guarda un feedback por opción; la serie escribe uno por pregunta.
 * Se repite en las tres, que es lo que ya hacen las series de inglés y alemán.
 */
function toQuestion(question: Question): ListeningQuestion {
  return {
    prompt: question.prompt,
    options: question.options.map((label, index) => ({
      label,
      correct: index === question.answer,
      feedback: question.feedback,
    })),
  }
}

export type AdaptOptions = {
  /**
   * `false` mientras los mp3 no estén en public/audio/<idioma>/<nivel>/.
   * Con `false`, ListeningJourney muestra «el audio se activará cuando esté grabado»
   * en lugar de pedir un archivo que devolvería 404.
   */
  audioAvailable: boolean
}

export function seriesToExercises(
  series: A1ListeningSeries,
  { audioAvailable }: AdaptOptions,
): ListeningExercise[] {
  return series.episodes
    .slice()
    .sort((a, b) => a.order - b.order)
    .map((episode) => ({
      id: episode.id,
      order: episode.order,
      title: episode.title,
      titleEs: episode.titleEs,
      objective: episode.objective,
      duration: episode.duration,
      grammar: episode.grammar,
      keywords: episode.keywords.map((keyword) => ({ en: keyword.target, es: keyword.es })),
      transcript: episode.turns.map((turn) => ({
        en: turn.target,
        es: turn.es,
        speaker: turn.speaker,
        ...(turn.romanization ? { romanization: turn.romanization } : {}),
      })),
      gist: toQuestion(episode.gist),
      details: episode.details.map(toQuestion),
      consolidation: toQuestion(episode.consolidation),
      audioAvailable,
      // Sin audioFile: el runner deriva listening-NN.mp3 desde `order`,
      // que es la convención de inglés y alemán.
    }))
}

/** Reparto de la serie, en orden descendente de turnos. Lo usa el casting de voces. */
export function seriesCast(series: A1ListeningSeries) {
  const turnsBySpeaker = new Map<string, number>()
  for (const episode of series.episodes) {
    for (const turn of episode.turns) {
      turnsBySpeaker.set(turn.speaker, (turnsBySpeaker.get(turn.speaker) ?? 0) + 1)
    }
  }

  return series.characters
    .map((character) => ({ ...character, turns: turnsBySpeaker.get(character.name) ?? 0 }))
    .sort((a, b) => b.turns - a.turns)
}
