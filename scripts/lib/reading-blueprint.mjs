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
//
// Estas bandas valen para las lenguas donde una palabra es una palabra: inglés, francés,
// italiano, alemán, portugués, ruso.
const WORD_TARGETS_DEFAULT = {
  A1: { min: 110, max: 140 },
  A2: { min: 200, max: 240 },
  B1: { min: 380, max: 450 },
}

// El coreano necesita su propia banda, y no por comodidad.
//
// En coreano las partículas y las terminaciones verbales se pegan a la palabra: `학교에서`
// es una sola unidad —un *eojeol*— y significa «en la escuela». Contar eojeol y contar
// palabras francesas no mide lo mismo, así que aplicar la banda de arriba produciría textos
// de nivel TOPIK II etiquetados como A1.
//
// La banda se fija con tres referencias, no a ojo:
//   1. Lo que WeLearn ya publica en coreano: A1 22-36 eojeol, A2 38-46, B1 67-85.
//   2. Las lecturas reales de TOPIK: TOPIK I (≈A1-A2) va de 20 a 80 eojeol;
//      TOPIK II (≈B1 y arriba), de 150 a 250.
//   3. La densidad: un eojeol carga en torno a 1,6-1,7 palabras de una lengua romance.
//
// El resultado sigue siendo una subida fuerte respecto a lo publicado —entre 2,4 y 3 veces
// más largo, igual que le subió al francés— pero se queda dentro de lo que un TOPIK del
// nivel correspondiente pone delante de un alumno.
//
// Confirmada por Zhanna Korzh el 17 de agosto de 2026.
// Las tres bandas caen además dentro de los límites del validador antiguo (A1 40-140,
// A2 120-240, B1 220-450), para que las dos capas de comprobación no se contradigan.
const WORD_TARGETS_KO = {
  A1: { min: 65, max: 85 },
  A2: { min: 120, max: 145 },
  B1: { min: 220, max: 270 },
}

// El japonés se mide en CARACTERES (文字数), no en palabras ni en morfemas.
//
// El problema: el japonés no separa palabras con espacios, así que no hay nada que contar
// por ahí. Había tres candidatos y esta es la razón de la elección:
//
//   1. Morfemas con un analizador (MeCab, Kuromoji). Es el más "exacto", y es el que se
//      descarta: su resultado depende del diccionario, y cuando el diccionario se actualiza
//      el recuento cambia solo. El guardián acabaría validando un número distinto para el
//      mismo texto sin que nadie tocara nada. Eso es peor que ser aproximado.
//   2. Bunsetsu (unidades sintagmáticas). Conceptualmente es el equivalente del eojeol
//      coreano, pero también exige análisis y arrastra el mismo problema.
//   3. Caracteres. Es la medida nativa —la educación y la edición japonesas cuentan
//      文字数—, es determinista, no depende de ninguna librería y una persona puede
//      comprobarla a mano. Gana por eso, no por ser la más fina.
//
// Pero contar caracteres NO basta para fijar el nivel, y aquí está lo importante: 250
// caracteres en hiragana y 250 con un 45 % de kanji son dos textos completamente distintos.
// En japonés la dificultad la marca la densidad de kanji, no la longitud. Así que la banda
// de caracteres va acompañada de una banda de kanji obligatoria, y el guardián comprueba
// las dos. Sin la segunda, la primera mediría humo.
//
// Las bandas salen de lo que WeLearn ya publica en japonés (A1 90-130 caracteres con 0 % de
// kanji, A2 150-204 con 23-39 %, B1 241-269 con 33-45 %), con la misma subida de en torno al
// doble que se aplicó al francés y al coreano, y comprobadas contra las lecturas del JLPT
// (N5 hasta ~200 caracteres, N4 200-400, N3 400-700).
const WORD_TARGETS_JA = {
  A1: { min: 160, max: 240 },
  A2: { min: 300, max: 400 },
  B1: { min: 500, max: 650 },
}

// Porcentaje de kanji sobre el total de caracteres japoneses del texto.
const KANJI_TARGETS_JA = {
  A1: { min: 0, max: 12 },
  A2: { min: 12, max: 30 },
  B1: { min: 28, max: 45 },
}

// El alemán también necesita banda propia, y por la misma razón de fondo que el coreano:
// la unidad «palabra» no carga lo mismo en todas las lenguas.
//
// El alemán compone. `Krankenversicherung` es una palabra y son tres en español. Medido
// sobre los textos que WeLearn ya publica, la longitud media de palabra sube con el nivel:
// 4,6 letras en A1, 5,6 en A2 y 6,7 en B1, frente a unas 5,0 estables en las lenguas
// romances. En B1 eso significa que cada palabra alemana carga en torno a un tercio más,
// así que 400 palabras de alemán no son 400 palabras de francés: son bastante más texto.
//
// La banda se fija con las mismas tres referencias de siempre:
//   1. Lo publicado por WeLearn en alemán: A1 50-69 palabras, A2 91-108, B1 88-103.
//   2. Las lecturas del Goethe-Zertifikat: A1 hasta ~100 palabras, A2 150-250, B1 200-400.
//   3. La densidad medida arriba, que corrige la banda romance a la baja según el nivel.
//
// Nota sobre el B1 publicado: sus textos apenas superan a los de A2, lo que es una anomalía
// de ese contenido y no una referencia. Por eso la subida en B1 es mayor que en A1 y A2.
const WORD_TARGETS_DE = {
  A1: { min: 95, max: 125 },
  A2: { min: 165, max: 205 },
  B1: { min: 300, max: 360 },
}

const WORD_TARGETS_BY_LANGUAGE = { ko: WORD_TARGETS_KO, ja: WORD_TARGETS_JA, de: WORD_TARGETS_DE }

export function wordTargetFor(language, cefr) {
  return (WORD_TARGETS_BY_LANGUAGE[language] ?? WORD_TARGETS_DEFAULT)[cefr]
}

/** Unidad en la que se mide cada idioma, para que los mensajes de error no engañen. */
export function countUnitFor(language) {
  if (language === 'ko') return 'eojeol'
  if (language === 'ja') return 'caracteres'
  return 'palabras'
}

const JAPANESE_CHAR = /[ぁ-ヿ一-鿿々〆]/gu
const KANJI_CHAR = /[一-鿿]/gu

/** Cuenta caracteres japoneses reales: sin espacios, sin puntuación, sin cifras latinas. */
export function countJapaneseCharacters(text) {
  return (text.match(JAPANESE_CHAR) ?? []).length
}

export function kanjiPercent(text) {
  const total = countJapaneseCharacters(text)
  if (!total) return 0
  return Math.round(((text.match(KANJI_CHAR) ?? []).length / total) * 100)
}

export const WORD_TARGETS = WORD_TARGETS_DEFAULT

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
  const target = wordTargetFor(language, cefr)
  const wordCount = exercise.content?.wordCount ?? 0
  if (wordCount < target.min || wordCount > target.max) {
    errors.push(
      `wordCount ${wordCount}: en ${cefr} de ${language} el blueprint pide entre ${target.min} y ${target.max} ${countUnitFor(language)}`,
    )
  }

  // El japonés lleva una segunda medida obligatoria: la densidad de kanji. Sin ella, la
  // longitud en caracteres no dice nada del nivel.
  if (language === 'ja') {
    const kanjiBand = KANJI_TARGETS_JA[cefr]
    const percent = kanjiPercent(exercise.content?.targetText ?? '')
    if (percent < kanjiBand.min || percent > kanjiBand.max) {
      errors.push(
        `kanji ${percent} %: en ${cefr} el blueprint pide entre ${kanjiBand.min} y ${kanjiBand.max} %. ` +
          'La longitud en caracteres sola no fija el nivel en japonés; la densidad de kanji sí.',
      )
    }
    // En A1 y A2 el kanji sin lectura encima es otra tarea, no la misma más difícil.
    if ((cefr === 'A1' || cefr === 'A2') && exercise.scriptSupport?.furigana !== true) {
      errors.push(`en ${cefr} de japonés hace falta scriptSupport.furigana: true`)
    }
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
