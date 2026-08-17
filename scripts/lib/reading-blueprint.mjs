// Reglas del blueprint de lectura (esquema 1.1.0).
//
// El esquema 1.0.0 —las 30 lecturas de inglés que ya están publicadas— se valida con las
// reglas de siempre. El 1.1.0 añade lo que hace que una lectura sea parte de un curso y no
// un texto suelto con preguntas colgadas:
//
//   1. Acompasamiento: la gramática que usa el texto tiene que existir de verdad en el
//      currículo (`src/data/grammar/`), en su nivel o en uno anterior.
//   2. Refuerzo acumulado: en A2 y B1, cada lectura reencuentra al alumno con gramática
//      de niveles previos. No basta con estrenar cosas nuevas.
//   3. Longitud real: los textos de 1.0.0 se quedaron pegados al mínimo permitido. Aquí
//      hay un suelo mucho más alto, cerca del techo del nivel.
//   4. Que no aburra: variedad de destreza en las preguntas, vocabulario suficiente y
//      prosa con frases de largo desigual, no cadenas de oraciones clonadas.
//
// La comprobación de que dos lecturas no repiten género y tema vive en
// `check-reading-content.mjs`, porque necesita ver todos los archivos a la vez.

import { readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..')
const grammarIndex = JSON.parse(readFileSync(path.join(root, 'src/data/reading/grammar-index.json'), 'utf8'))

export const BLUEPRINT_SCHEMA_VERSION = '1.1.0'

// Suelo y techo por nivel. El techo es el del validador de siempre; el suelo es nuevo y
// es la respuesta a que los textos de inglés se quedaron todos en el mínimo.
export const WORD_TARGETS = {
  A1: { min: 110, max: 140 },
  A2: { min: 200, max: 240 },
  B1: { min: 380, max: 450 },
}

const LEVEL_ORDER = ['a1', 'a2', 'b1']

function topicsFor(language, level) {
  return grammarIndex.languages?.[language]?.[level] ?? []
}

/** Temas del nivel indicado y de todos los anteriores: el repertorio que el alumno ya conoce. */
export function cumulativeTopics(language, cefr) {
  const level = cefr.toLowerCase()
  const upTo = LEVEL_ORDER.indexOf(level)
  if (upTo < 0) return []
  return LEVEL_ORDER.slice(0, upTo + 1).flatMap((name) => topicsFor(language, name))
}

export function currentLevelSlugs(language, cefr) {
  return new Set(topicsFor(language, cefr.toLowerCase()).map((topic) => topic.slug))
}

export function earlierLevelSlugs(language, cefr) {
  const level = cefr.toLowerCase()
  const upTo = LEVEL_ORDER.indexOf(level)
  if (upTo <= 0) return new Set()
  return new Set(LEVEL_ORDER.slice(0, upTo).flatMap((name) => topicsFor(language, name)).map((topic) => topic.slug))
}

export function validateBlueprintExercise(exercise) {
  const errors = []
  const language = exercise.language
  const cefr = exercise.level?.cefr
  const level = String(cefr ?? '').toLowerCase()

  if (!LEVEL_ORDER.includes(level)) {
    errors.push(`el blueprint 1.1.0 solo cubre A1, A2 y B1 (llegó "${cefr}")`)
    return errors
  }
  if (!grammarIndex.languages?.[language]) {
    errors.push(`no hay currículo de gramática indexado para el idioma "${language}"`)
    return errors
  }

  // --- 1. Acompasamiento con el currículo de gramática -----------------------------
  const known = new Set(cumulativeTopics(language, cefr).map((topic) => topic.slug))
  const thisLevel = currentLevelSlugs(language, cefr)
  const earlier = earlierLevelSlugs(language, cefr)

  const allowed = exercise.leveling?.allowedGrammar ?? []
  const focus = exercise.content?.grammarFocus ?? []

  if (!allowed.length) errors.push('leveling.allowedGrammar no puede estar vacío en el blueprint 1.1.0')
  for (const slug of allowed) {
    if (!known.has(slug)) {
      errors.push(`allowedGrammar: "${slug}" no es un tema de gramática de ${language} en ${cefr} ni en niveles anteriores`)
    }
  }

  if (!focus.length) errors.push('content.grammarFocus no puede estar vacío: cada lectura ancla a un aspecto de gramática')
  for (const slug of focus) {
    if (!allowed.includes(slug)) errors.push(`grammarFocus: "${slug}" no está declarado en allowedGrammar`)
  }

  // Algo del nivel propio: la lectura tiene que aportar, no solo repasar.
  if (focus.length && !focus.some((slug) => thisLevel.has(slug))) {
    errors.push(`grammarFocus no toca ningún tema de ${cefr}: la lectura no aporta nada nuevo de su nivel`)
  }

  // --- 2. Refuerzo acumulado ------------------------------------------------------
  // En A1 no hay nivel anterior, así que la regla empieza en A2.
  if (earlier.size && focus.length && !focus.some((slug) => earlier.has(slug))) {
    errors.push(`grammarFocus no reencuentra ningún tema de niveles anteriores: falta el refuerzo acumulado de ${cefr}`)
  }

  // --- 3. Longitud ----------------------------------------------------------------
  const target = WORD_TARGETS[cefr]
  const wordCount = exercise.content?.wordCount ?? 0
  if (wordCount < target.min || wordCount > target.max) {
    errors.push(`wordCount ${wordCount}: en ${cefr} el blueprint pide entre ${target.min} y ${target.max} palabras`)
  }

  // --- 4. Que no aburra -----------------------------------------------------------
  const questions = exercise.questions ?? []
  if (questions.length < 5) errors.push(`el blueprint pide al menos 5 preguntas (hay ${questions.length})`)
  const skills = new Set(questions.map((question) => question.skill))
  if (skills.size < 3) {
    errors.push(`las preguntas ejercitan ${skills.size} destreza(s) distintas; el blueprint pide al menos 3`)
  }

  const vocabulary = exercise.content?.vocabulary ?? []
  if (vocabulary.length < 6) {
    errors.push(`el blueprint pide al menos 6 entradas de vocabulario glosado (hay ${vocabulary.length})`)
  }

  const average = exercise.leveling?.metrics?.averageSentenceWords ?? 0
  const longest = exercise.leveling?.metrics?.maxSentenceWords ?? 0
  if (average > 0 && longest < average * 1.25) {
    errors.push('las frases son todas del mismo largo: el texto lee a plantilla, no a prosa')
  }

  const hints = exercise.production?.hints ?? []
  if (hints.length < 2) errors.push('production.hints necesita al menos 2 pistas para que la escritura enganche con la lectura')

  // --- 5. Defectos que ya se colaron una vez --------------------------------------
  // Las 30 lecturas de inglés publicadas traen 69 glosas donde la "traducción" es la
  // misma palabra, 121 estrategias con el texto español duplicado en el campo inglés y
  // 7 verdadero/falso sin afirmación que juzgar. Aquí se cierran esas tres puertas.
  for (const item of vocabulary) {
    const spanish = item.glosses?.es?.trim() ?? ''
    if (!spanish) {
      errors.push(`vocabulario "${item.surface}": falta la glosa en español`)
    } else if (spanish.toLowerCase() === item.surface.trim().toLowerCase()) {
      errors.push(`vocabulario "${item.surface}": la glosa en español repite la palabra en vez de traducirla`)
    }
  }

  const prompts = new Set()
  for (const question of questions) {
    const prompt = (question.prompt ?? '').trim()
    if (prompt.length < 12) errors.push(`${question.id}: el enunciado es demasiado corto para decir algo`)
    if (prompts.has(prompt)) errors.push(`${question.id}: repite el enunciado de otra pregunta`)
    prompts.add(prompt)

    // Un verdadero/falso necesita una afirmación concreta dentro del propio enunciado.
    if ((question.type === 'true-false' || question.type === 'true-false-not-given') && prompt.length < 30) {
      errors.push(`${question.id}: un verdadero/falso tiene que enunciar la afirmación que se juzga`)
    }

    for (const [field, value] of Object.entries(question.feedback ?? {})) {
      if (field === 'distractorNotes' || !value || typeof value !== 'object') continue
      const es = value.es?.trim()
      const en = value.en?.trim()
      if (es && en && es === en && es.length > 15) {
        errors.push(`${question.id}: feedback.${field} tiene el mismo texto en español y en inglés (falta traducir uno)`)
      }
    }
  }

  return errors
}

/** Qué parte del currículo del nivel tocan, entre todas, las lecturas de un idioma+nivel. */
export function grammarCoverage(language, cefr, exercises) {
  const thisLevel = currentLevelSlugs(language, cefr)
  const touched = new Set()
  for (const exercise of exercises) {
    for (const slug of exercise.content?.grammarFocus ?? []) {
      if (thisLevel.has(slug)) touched.add(slug)
    }
  }
  return { touched: touched.size, total: thisLevel.size, missing: [...thisLevel].filter((slug) => !touched.has(slug)).sort() }
}
