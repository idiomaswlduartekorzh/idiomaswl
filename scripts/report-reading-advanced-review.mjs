#!/usr/bin/env node
/** Print a review queue without changing draft answers or claiming editorial approval. */
import { readFile, readdir } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const directory = path.join(root, 'src/data/reading/exercises')
const languages = ['en', 'fr', 'it', 'de', 'pt', 'ru', 'ja', 'ko']
const levels = ['B2', 'C1', 'C2']
const files = (await readdir(directory)).filter((file) => file.endsWith('.json')).sort()
const exercises = (await Promise.all(files.map(async (file) => ({
  file,
  exercise: JSON.parse(await readFile(path.join(directory, file), 'utf8')),
})))).filter(({ exercise }) => exercise.schemaVersion === '1.2.0')

function answerRank(question) {
  const lengths = question.options.map(({ text }) => Array.from(text).length)
  const answerIndex = question.options.findIndex(({ id }) => id === question.answer)
  if (answerIndex < 0) return { rank: 'missing', gap: 0 }
  const length = lengths[answerIndex]
  const otherLengths = lengths.filter((_, index) => index !== answerIndex)
  return {
    rank: length === Math.max(...lengths) ? 'longest' : length === Math.min(...lengths) ? 'shortest' : 'middle',
    gap: length - Math.max(...otherLengths),
  }
}

console.log('# Reading B2–C2: editorial review queue\n')
console.log('Generated from saved drafts. This report is a screening aid, not a linguistic or CEFR assessment.\n')
console.log('| Language | Level | Drafts | Missing to 20 | Shortest | Middle | Longest | Length gate |')
console.log('|---|---|---:|---:|---:|---:|---:|---|')

const groups = []
const allUniqueLongestCards = []
for (const language of languages) for (const level of levels) {
  const group = exercises.filter(({ exercise }) => exercise.language === language && exercise.level.cefr === level)
  const ranks = { shortest: 0, middle: 0, longest: 0 }
  const flagged = []
  for (const { file, exercise } of group) for (const question of exercise.questions) {
    const { rank, gap } = answerRank(question)
    if (rank in ranks) ranks[rank]++
    if (rank === 'longest' && gap > 0) flagged.push({ file, question: question.id, gap })
  }
  for (const { file, exercise } of group) {
    const alwaysLongest = exercise.questions.every((question) => {
      const sizes = question.options.map(({ text }) => Array.from(text).length)
      const answer = question.options.find(({ id }) => id === question.answer)
      return answer && Array.from(answer.text).length > Math.max(...sizes.filter((size) => size !== Array.from(answer.text).length)) && sizes.filter((size) => size === Array.from(answer.text).length).length === 1
    })
    if (alwaysLongest) allUniqueLongestCards.push(file)
  }
  const total = Object.values(ranks).reduce((sum, value) => sum + value, 0)
  const balanced = total > 0 && Object.values(ranks).every((value) => value / total >= 0.2 && value / total <= 0.45)
  groups.push({ language, level, group, ranks, flagged, balanced })
  console.log(`| ${language} | ${level} | ${group.length} | ${Math.max(0, 20 - group.length)} | ${ranks.shortest} | ${ranks.middle} | ${ranks.longest} | ${balanced ? 'pass' : 'fail'} |`)
}

console.log('\n## Largest answer length clues\n')
console.log(`**Cards where the correct answer is uniquely longest in all six questions: ${allUniqueLongestCards.length}.**\n`)
for (const file of allUniqueLongestCards) console.log(`- \`${file}\``)
console.log('')
console.log('Review the passage, prompt, evidence, correct answer, and all distractors together. Do not pad an answer merely to change its length.\n')
for (const { language, level, flagged } of groups) {
  const top = flagged.sort((a, b) => b.gap - a.gap || a.file.localeCompare(b.file)).slice(0, 10)
  if (!top.length) continue
  console.log(`### ${language}/${level}\n`)
  for (const { file, question, gap } of top) console.log(`- \`${file}\` · ${question}: correct option exceeds the longest distractor by ${gap} characters`)
  console.log('')
}

const total = exercises.length
console.log(`**Drafts: ${total}/480. Missing: ${Math.max(0, 480 - total)}.**`)
