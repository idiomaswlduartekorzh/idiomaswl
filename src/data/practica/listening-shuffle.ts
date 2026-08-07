import type { ListeningExercise, ListeningQuestion } from './ingles-a1-listening'

/**
 * Reparte la respuesta correcta entre las tres letras antes de pintar la serie.
 *
 * Por qué existe: una medición sobre las 24 series encontró que en inglés A1,
 * alemán A1/A2/B1 e italiano A1 —las cinco que ya estaban publicadas— la respuesta
 * correcta era la opción A en el 100 % de las preguntas, y en inglés A2 y B1 lo era
 * en todas las consolidaciones. Pulsando siempre la primera opción se completaba el
 * ejercicio entero sin escuchar nada. Las series nuevas no llegaban a ese extremo,
 * pero varias se acercaban: francés A1 tenía 17 de 20 ideas generales en la A y
 * ninguna en la C.
 *
 * Nadie lo vio revisando episodios de uno en uno, porque el sesgo solo existe en el
 * conjunto. Por eso la corrección va aquí, en el runner, y no en cada fichero: cubre
 * las 24 series de golpe y también las que se escriban después.
 *
 * El reparto es por bloques de tres preguntas del mismo tipo: dentro de cada bloque
 * cada letra sale exactamente una vez, y el orden dentro del bloque lo decide un hash.
 * Así la distribución final es uniforme por construcción —no por suerte, que con veinte
 * episodios deja colas de hasta el 70 %— y aun así no hay patrón que memorizar.
 *
 * Todo depende del id del ejercicio, no del azar: el servidor y el navegador pintan lo
 * mismo (nada de errores de hidratación) y quien vuelva al día siguiente encuentra el
 * ejercicio como lo dejó. `feedback` y `correct` viajan pegados a su opción, así que
 * reordenar no cambia ni una palabra de lo que escribieron los redactores.
 */

/** FNV-1a de 32 bits: estable, sin dependencias y suficiente para elegir una permutación. */
function hash(seed: string): number {
  let value = 0x811c9dc5
  for (let index = 0; index < seed.length; index += 1) {
    value ^= seed.charCodeAt(index)
    value = Math.imul(value, 0x01000193)
  }
  return value >>> 0
}

/** Las seis permutaciones de tres posiciones. */
const PERMUTATIONS = [
  [0, 1, 2],
  [0, 2, 1],
  [1, 0, 2],
  [1, 2, 0],
  [2, 0, 1],
  [2, 1, 0],
]

/**
 * Posición que le toca a la respuesta correcta de cada pregunta de un mismo tipo.
 * Bloques de tres para que ninguna letra se repita dentro del bloque.
 */
function targetPositions(count: number, seed: string): number[] {
  const positions: number[] = []
  for (let block = 0; positions.length < count; block += 1) {
    const permutation = PERMUTATIONS[hash(`${seed}|${block}`) % PERMUTATIONS.length]
    for (const position of permutation) {
      if (positions.length < count) positions.push(position)
    }
  }
  return positions
}

/** Coloca la opción correcta en `position` y decide el orden de los dos distractores. */
function place(question: ListeningQuestion, position: number, seed: string): ListeningQuestion {
  const correctIndex = question.options.findIndex((option) => option.correct)
  // Una pregunta sin opción correcta es un fallo de datos que atrapa el validador;
  // aquí se devuelve intacta en lugar de romper la página.
  if (correctIndex < 0 || question.options.length !== 3) return question

  const distractors = question.options.filter((_, index) => index !== correctIndex)
  if (hash(seed) % 2 === 1) distractors.reverse()

  const options = [...distractors]
  options.splice(Math.min(position, 2), 0, question.options[correctIndex])
  return { ...question, options }
}

/**
 * Devuelve la serie con las opciones repartidas. Se aplica a la lista entera, no a un
 * ejercicio suelto: el equilibrio solo se puede garantizar viendo todas las preguntas.
 */
export function balanceOptions(exercises: ListeningExercise[]): ListeningExercise[] {
  const seed = exercises[0]?.id ?? 'listening'
  const detailCount = exercises.reduce((total, exercise) => total + exercise.details.length, 0)

  const gistSlots = targetPositions(exercises.length, `${seed}|gist`)
  const detailSlots = targetPositions(detailCount, `${seed}|detalle`)
  const consolidationSlots = targetPositions(exercises.length, `${seed}|consolidacion`)

  let detailCursor = 0
  return exercises.map((exercise, index) => ({
    ...exercise,
    gist: place(exercise.gist, gistSlots[index], `${exercise.id}|gist`),
    details: exercise.details.map((question, detailIndex) => {
      const slot = detailSlots[detailCursor]
      detailCursor += 1
      return place(question, slot, `${exercise.id}|detalle-${detailIndex}`)
    }),
    consolidation: place(exercise.consolidation, consolidationSlots[index], `${exercise.id}|consolidacion`),
  }))
}
