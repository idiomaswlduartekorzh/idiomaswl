/**
 * Reparte la respuesta correcta entre todas las posiciones de un ejercicio de opción.
 *
 * POR QUÉ EXISTE
 *
 * Los motores de práctica construían sus opciones como `[correcta, ...distractores fijos]`
 * y confiaban el reparto a una rotación cíclica: `const shift = seed % items.length`. Una
 * rotación no es un barajado —conserva el orden relativo— y aquella semilla era el número
 * de nivel, igual para todos los ejercicios de ese nivel. Consecuencias medidas sobre los
 * 205 ejercicios de opción de IELTS Writing Task 2:
 *
 *  - La correcta estaba en el índice 0 del array fuente en 197 de 205 (96,1 %), y en el
 *    100 % de los nueve motores y talleres.
 *  - Como la semilla solo dependía del nivel, la secuencia de letras correctas era
 *    IDÉNTICA para los cinco tipos de ensayo: D-B-D-A en tres motores, C-A-C-D en otro.
 *    Memorizando cuatro letras se aprobaban cuatro motores enteros sin leer nada.
 *  - `LinkingLanguageClient` ni siquiera rotaba: la correcta era la A en las ocho preguntas.
 *
 * Y no se veía en el agregado. Sumando los 136 ítems de cuatro opciones, el reparto salía
 * uniforme (χ²=6,76). El sesgo solo aparece dentro de cada motor, que es como hay que
 * medirlo.
 *
 * CÓMO LO RESUELVE
 *
 * Mismo criterio que `src/data/practica/listening-shuffle.ts`, que ya corrigió este defecto
 * en las 24 series de escucha: la posición se asigna por BLOQUES del tamaño del número de
 * opciones, y dentro de cada bloque cada posición sale exactamente una vez. El reparto es
 * uniforme por construcción, no por suerte —con veinte preguntas, el azar deja colas de
 * hasta el 70 % en una letra—, y el orden dentro del bloque lo decide un hash del
 * identificador, así que no hay patrón que memorizar.
 *
 * Todo depende del identificador del ejercicio, no del reloj ni del azar: el servidor y el
 * navegador pintan lo mismo (nada de errores de hidratación) y quien vuelva al día
 * siguiente encuentra el ejercicio como lo dejó.
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

/**
 * Baraja de forma determinista con Fisher-Yates y un generador sembrado por el hash.
 * A diferencia de una rotación, aquí sí se pierde el orden relativo de los distractores,
 * que es lo que impide reconocerlos por su posición de siempre.
 */
function shuffle<T>(items: T[], seed: string): T[] {
  const result = [...items]
  let state = hash(seed) || 1
  for (let index = result.length - 1; index > 0; index -= 1) {
    // xorshift32: barato y con reparto suficiente para elegir un índice.
    state ^= state << 13
    state ^= state >>> 17
    state ^= state << 5
    state >>>= 0
    const pick = state % (index + 1)
    ;[result[index], result[pick]] = [result[pick], result[index]]
  }
  return result
}

/**
 * Posición que le toca a la respuesta correcta de la pregunta número `index` de una serie.
 *
 * Bloques del tamaño del número de opciones: dentro de cada bloque ninguna posición se
 * repite, así que el reparto no puede escorarse aunque la serie sea corta.
 */
export function correctPosition(index: number, optionCount: number, seed: string): number {
  const block = Math.floor(index / optionCount)
  const positions = shuffle(
    Array.from({ length: optionCount }, (_, position) => position),
    `${seed}|bloque-${block}`,
  )
  return positions[index % optionCount]
}

/**
 * Coloca la opción correcta en la posición que le toca y baraja los distractores.
 *
 * @param options   Opciones tal y como las escribió el redactor (normalmente la correcta primera).
 * @param correct   Índice de la correcta dentro de `options`.
 * @param seed      Identificador ÚNICO de esta pregunta. Tiene que incluir algo que
 *                  distinga un tipo de ensayo de otro: con solo el número de nivel, los
 *                  cinco tipos comparten secuencia y basta memorizar una.
 * @param index     Posición de la pregunta dentro de su serie, para repartir por bloques.
 */
export function placeOption<T>(
  options: T[],
  correct: number,
  seed: string,
  index: number,
): { options: T[]; correct: number } {
  if (options.length < 2 || correct < 0 || correct >= options.length) {
    return { options, correct }
  }

  const target = correctPosition(index, options.length, seed)
  const distractors = shuffle(
    options.filter((_, position) => position !== correct),
    `${seed}|distractores`,
  )

  const result = [...distractors]
  result.splice(target, 0, options[correct])
  return { options: result, correct: target }
}

/**
 * Atajo para el caso mayoritario en estos motores: la correcta va primera en el array
 * fuente. Devuelve las opciones repartidas y el nuevo índice de la correcta.
 */
export function placeFirstAsCorrect<T>(options: T[], seed: string, index: number) {
  return placeOption(options, 0, seed, index)
}
