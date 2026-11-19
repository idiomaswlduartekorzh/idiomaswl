#!/usr/bin/env node

// Use as an editorial report, or with --check as the release gate for all 24 banks.
import { readFile } from 'node:fs/promises'

const languages = [
  ['ingles', ''], ['frances', 'frances-'], ['aleman', 'aleman-'],
  ['italiano', 'italiano-'], ['portugues', 'portugues-'], ['ruso', 'ruso-'],
  ['japones', 'japones-'], ['coreano', 'coreano-'],
]
const levels = ['b2', 'c1', 'c2']
const characterLanguages = new Set(['japones', 'coreano'])
const check = process.argv.includes('--check')
const failures = []
const words = text => text.match(/[\p{L}\p{N}]+(?:['’][\p{L}\p{N}]+)?/gu)?.length ?? 0
const characters = text => Array.from(text).filter(char => /[\p{L}\p{N}]/u.test(char)).length
const rows = []

for (const [language, prefix] of languages) {
  for (const level of levels) {
    const path = new URL(`../src/data/practica/writing-workplace-${prefix}${level}.json`, import.meta.url)
    const cases = JSON.parse(await readFile(path, 'utf8'))
    const count = characterLanguages.has(language) ? characters : words
    for (const item of cases) {
      for (const question of item.questions) {
        const answer = question.options.find(option => option.id === question.correctOptionId)
        const wrong = question.options.filter(option => option.id !== question.correctOptionId)
        if (!answer || wrong.length !== 2) throw new Error(`${language}/${level}/${item.id}/${question.id}: invalid answer key`)
        const correctLength = count(answer.text)
        const wrongLengths = wrong.map(option => count(option.text))
        const allLengths = [correctLength, ...wrongLengths]
        const visualCorrectLength = characters(answer.text)
        const visualWrongLengths = wrong.map(option => characters(option.text))
        rows.push({
          language, level, axis: question.axis, caseId: item.id, questionId: question.id,
          correctLength, wrongLengths,
          longest: correctLength > Math.max(...wrongLengths),
          shortest: correctLength < Math.min(...wrongLengths),
          middle: correctLength > Math.min(...wrongLengths) && correctLength < Math.max(...wrongLengths),
          tied: wrongLengths.includes(correctLength),
          ratio: correctLength / (wrongLengths[0] + wrongLengths[1]) * 2,
          spread: Math.max(...allLengths) / Math.min(...allLengths),
          visualLongest: visualCorrectLength > Math.max(...visualWrongLengths),
          visualShortest: visualCorrectLength < Math.min(...visualWrongLengths),
        })
      }
    }
  }
}

function report(label, selection, bank = false) {
  const longest = selection.filter(row => row.longest).length
  const shortest = selection.filter(row => row.shortest).length
  const middle = selection.filter(row => row.middle).length
  const tied = selection.filter(row => row.tied).length
  const visualLongest = selection.filter(row => row.visualLongest).length
  const visualShortest = selection.filter(row => row.visualShortest).length
  const overOneAndHalf = selection.filter(row => row.ratio >= 1.5).length
  const wideSpread = selection.filter(row => row.spread >= 1.8).length
  const meanRatio = selection.reduce((sum, row) => sum + row.ratio, 0) / selection.length
  console.log(`${label.padEnd(20)} ${String(longest).padStart(3)}/${selection.length} longest (${(longest / selection.length * 100).toFixed(1)}%) · ${String(shortest).padStart(3)} shortest · ${String(middle).padStart(3)} middle · ${String(tied).padStart(3)} tied · visual L/S ${String(visualLongest).padStart(3)}/${String(visualShortest).padStart(3)} · correct ≥1.5× ${String(overOneAndHalf).padStart(3)} · spread ≥1.8× ${String(wideSpread).padStart(3)} · mean ratio ${meanRatio.toFixed(2)}`)
  if (check && bank) {
    if (selection.length !== 80) failures.push(`${label}: expected 80 questions, found ${selection.length}`)
    if (longest > selection.length * 0.4) failures.push(`${label}: correct answer uniquely longest in ${longest}/${selection.length} (max 40%)`)
    if (shortest < selection.length * 0.15 || shortest > selection.length * 0.4) failures.push(`${label}: correct answer uniquely shortest in ${shortest}/${selection.length} (target 15–40%)`)
    if (visualLongest > selection.length * 0.5) failures.push(`${label}: correct answer visually longest in ${visualLongest}/${selection.length} (max 50%)`)
    if (visualShortest < selection.length * 0.1) failures.push(`${label}: correct answer visually shortest in ${visualShortest}/${selection.length} (min 10%)`)
  }
}

for (const [language] of languages) {
  for (const level of levels) report(`${language}/${level}`, rows.filter(row => row.language === language && row.level === level), true)
}
console.log('')
for (const axis of ['Evidence', 'Scope', 'Intent', 'Purpose']) report(axis, rows.filter(row => row.axis === axis))
report('TOTAL', rows)

if (process.argv.includes('--outliers')) {
  const outliers = rows.filter(row => row.ratio >= 1.5).sort((a, b) => b.ratio - a.ratio)
  console.log('\nLargest cues (correct length / mean distractor length):')
  for (const row of outliers.slice(0, 30)) {
    console.log(`${row.language}/${row.level}/${row.caseId}/${row.questionId}: ${row.correctLength}/${row.wrongLengths.join(',')} = ${row.ratio.toFixed(2)}×`)
  }
}

if (check) {
  if (failures.length > 0) {
    console.error(`\nLength audit failed:\n${failures.map(failure => `- ${failure}`).join('\n')}`)
    process.exitCode = 1
  } else {
    console.log('\nLength audit passed: every bank meets word/character rank limits.')
  }
}
