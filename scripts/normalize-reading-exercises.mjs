// Rellena los campos derivados de cada lectura a partir del texto.
//
// La lección que dejó Escucha: "la duración de cada episodio sale del mp3, no se escribe
// a mano; si la inventas, la barra de progreso miente". Aquí pasa igual con el recuento
// de palabras y las métricas de frase: si un editor las escribe a ojo, el guardián valida
// una mentira y el nivel deja de significar nada.
//
// Lo que se escribe a mano: el texto, las preguntas, el vocabulario, la gramática.
// Lo que calcula este script: wordCount, averageSentenceWords, maxSentenceWords,
// estimatedMinutes, canonicalPath y los enlaces de la serie.
//
//   node scripts/normalize-reading-exercises.mjs            → dice qué está desajustado
//   node scripts/normalize-reading-exercises.mjs --write     → lo corrige en los JSON

import { readFile, readdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const exerciseDir = path.join(root, 'src/data/reading/exercises')

const LANGUAGE_SLUGS = {
  en: 'ingles', fr: 'frances', it: 'italiano', de: 'aleman',
  ru: 'ruso', ja: 'japones', ko: 'coreano', pt: 'portugues',
}

// El japonés no separa palabras con espacios, así que contar tokens da un número sin
// sentido y el umbral de nivel dejaría de medir nada. Cuando toque japonés hay que
// decidir su unidad (caracteres, bunsetsu o morfemas) antes de producir contenido.
const UNSUPPORTED_COUNTING = new Set(['ja'])

function sentences(text) {
  return text
    .split(/(?<=[.!?。！？])\s+/u)
    .map((sentence) => sentence.trim())
    .filter(Boolean)
}

function countWords(text) {
  return text.split(/\s+/u).map((token) => token.replace(/^[^\p{L}\p{N}]+|[^\p{L}\p{N}]+$/gu, '')).filter(Boolean).length
}

function derive(exercise) {
  const text = exercise.content?.targetText ?? ''
  const parts = sentences(text)
  const lengths = parts.map(countWords)
  const wordCount = countWords(text)
  return {
    wordCount,
    averageSentenceWords: lengths.length ? Number((wordCount / lengths.length).toFixed(1)) : 0,
    maxSentenceWords: lengths.length ? Math.max(...lengths) : 0,
    // Un ritmo de lectura de estudio, no de lectura rápida: releer cuenta.
    estimatedMinutes: Math.max(5, Math.round(wordCount / 25)),
    canonicalPath: `/practica/${LANGUAGE_SLUGS[exercise.language]}/${String(exercise.level?.cefr ?? '').toLowerCase()}/lectura/${exercise.slug}`,
  }
}

const files = (await readdir(exerciseDir)).filter((file) => file.endsWith('.json')).sort()
const write = process.argv.includes('--write')
let drifted = 0

for (const file of files) {
  const filePath = path.join(exerciseDir, file)
  const exercise = JSON.parse(await readFile(filePath, 'utf8'))

  // Las lecturas del esquema viejo se dejan como están: sus rutas ya están indexadas en
  // Google y recalcularlas les cambiaría el canonical sin ganar nada.
  if (exercise.schemaVersion !== '1.1.0') continue

  if (UNSUPPORTED_COUNTING.has(exercise.language)) {
    console.error(`✗ ${file}: falta definir cómo se cuentan las palabras en ${exercise.language}`)
    process.exitCode = 1
    continue
  }

  const derived = derive(exercise)
  const changes = []
  const check = (label, current, next) => {
    if (current !== next) changes.push(`${label}: ${current} → ${next}`)
  }

  check('wordCount', exercise.content.wordCount, derived.wordCount)
  check('estimatedMinutes', exercise.content.estimatedMinutes, derived.estimatedMinutes)
  check('averageSentenceWords', exercise.leveling.metrics.averageSentenceWords, derived.averageSentenceWords)
  check('maxSentenceWords', exercise.leveling.metrics.maxSentenceWords, derived.maxSentenceWords)
  check('canonicalPath', exercise.seo.canonicalPath, derived.canonicalPath)

  if (!changes.length) continue
  drifted += 1

  if (write) {
    exercise.content.wordCount = derived.wordCount
    exercise.content.estimatedMinutes = derived.estimatedMinutes
    exercise.leveling.metrics.averageSentenceWords = derived.averageSentenceWords
    exercise.leveling.metrics.maxSentenceWords = derived.maxSentenceWords
    exercise.seo.canonicalPath = derived.canonicalPath
    await writeFile(filePath, `${JSON.stringify(exercise, null, 2)}\n`)
    console.log(`↻ ${file}`)
  } else {
    console.error(`✗ ${file}`)
  }
  for (const change of changes) console.log(`    ${change}`)
}

if (!drifted) {
  console.log('Los campos derivados están al día.')
} else if (write) {
  console.log(`\n${drifted} lectura(s) actualizadas.`)
} else {
  console.error(`\n${drifted} lectura(s) con campos derivados a mano. Corrige con --write.`)
  process.exitCode = 1
}
