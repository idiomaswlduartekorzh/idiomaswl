import { readFile, readdir } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { countJapaneseCharacters } from './lib/reading-blueprint.mjs'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const directory = path.join(root, 'src/data/reading/exercises')
const languages = ['en', 'fr', 'it', 'de', 'pt', 'ru', 'ja', 'ko']
const levels = ['B2', 'C1', 'C2']
const minimum = 20
const minimumLength = {
  B2: { default: 400, ja: 800, ko: 220 },
  C1: { default: 650, ja: 1200, ko: 340 },
  C2: { default: 800, ja: 1600, ko: 430 },
}
const files = (await readdir(directory)).filter((file) => file.endsWith('.json'))
const exercises = (await Promise.all(files.map(async (file) => JSON.parse(await readFile(path.join(directory, file), 'utf8')))))
  .filter((exercise) => exercise.schemaVersion === '1.2.0')
const count = (text, language) => language === 'ja' ? countJapaneseCharacters(text) : text.trim().split(/\s+/u).filter(Boolean).length

function shingles(text) {
  const words = text.toLocaleLowerCase().match(/[\p{L}\p{N}]+/gu) ?? []
  const units = words.length >= 20 ? words : Array.from(text.replace(/\s+/gu, ''))
  return new Set(Array.from({ length: Math.max(0, units.length - 4) }, (_, index) => units.slice(index, index + 5).join(' ')))
}

function overlap(left, right) {
  const a = shingles(left)
  const b = shingles(right)
  const common = [...a].filter((value) => b.has(value)).length
  return common / Math.max(1, Math.min(a.size, b.size))
}

let failed = false
for (const language of languages) {
  for (const level of levels) {
    const group = exercises.filter((exercise) => exercise.language === language && exercise.level.cefr === level)
    const titles = new Set(group.map((exercise) => exercise.content.title.en?.trim().toLocaleLowerCase()))
    const texts = new Set(group.map((exercise) => exercise.content.targetText.normalize('NFKC').replace(/\s+/gu, ' ').trim()))
    const topics = new Set(group.map((exercise) => exercise.classification.topic.trim().toLocaleLowerCase()))
    const lengthFloor = minimumLength[level][language] ?? minimumLength[level].default
    const short = group.filter((exercise) => count(exercise.content.targetText, language) < lengthFloor)
    const miscounted = group.filter((exercise) => exercise.content.wordCount !== count(exercise.content.targetText, language))
    const ranks = { shortest: 0, middle: 0, longest: 0 }
    const cardsWithOnlyLongAnswers = []
    for (const exercise of group) for (const question of exercise.questions) {
      const sizes = question.options.map((option) => Array.from(option.text).length)
      const answer = question.options.find((option) => option.id === question.answer)
      if (!answer) continue
      const size = Array.from(answer.text).length
      ranks[size === Math.max(...sizes) ? 'longest' : size === Math.min(...sizes) ? 'shortest' : 'middle']++
    }
    for (const exercise of group) {
      const allUniqueLongest = exercise.questions.every((question) => {
        const sizes = question.options.map((option) => Array.from(option.text).length)
        const answer = question.options.find((option) => option.id === question.answer)
        if (!answer) return false
        const size = Array.from(answer.text).length
        return size > Math.max(...sizes.filter((other) => other !== size)) && sizes.filter((other) => other === size).length === 1
      })
      if (allUniqueLongest) cardsWithOnlyLongAnswers.push(exercise.id)
    }
    const total = Object.values(ranks).reduce((sum, value) => sum + value, 0)
    const balanced = total > 0 && Object.values(ranks).every((value) => value / total >= 0.2 && value / total <= 0.45)
    const tooSimilar = group.some((first, index) => group.slice(index + 1).some((second) => overlap(first.content.targetText, second.content.targetText) > 0.45))
    const enough = group.length >= minimum && titles.size === group.length && texts.size === group.length && topics.size === group.length && !short.length && !miscounted.length && balanced && !tooSimilar && !cardsWithOnlyLongAnswers.length
    console.log(`${enough ? '✓' : '✗'} ${language}/${level}: ${group.length}/${minimum} lecturas; ${titles.size} títulos, ${texts.size} textos y ${topics.size} temas distintos; ${short.length} bajo ${lengthFloor} ${language === 'ja' ? 'caracteres' : language === 'ko' ? 'eojeol' : 'palabras'}; ${miscounted.length} conteos incoherentes; sesgo ${JSON.stringify(ranks)}; ${cardsWithOnlyLongAnswers.length} lecturas con seis respuestas únicamente más largas${tooSimilar ? '; textos demasiado parecidos' : ''}`)
    if (!enough) failed = true
  }
}

if (failed) {
  console.error('\nLa colección avanzada aún no cumple el mínimo editorial. No declararla completa ni publicarla como ruta B2–C2 terminada.')
  process.exitCode = 1
} else {
  console.log(`\nColección avanzada completa: al menos ${minimum} lecturas distintas por nivel e idioma.`)
}
