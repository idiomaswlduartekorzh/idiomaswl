#!/usr/bin/env node

// Editorial report, not a release gate: the published banks still contain
// length cues. Use this before and after rewriting options in each bank.
import { readFile } from 'node:fs/promises'

const languages = [
  ['ingles', ''], ['frances', 'frances-'], ['aleman', 'aleman-'],
  ['italiano', 'italiano-'], ['portugues', 'portugues-'], ['ruso', 'ruso-'],
  ['japones', 'japones-'], ['coreano', 'coreano-'],
]
const levels = ['b2', 'c1', 'c2']
const characterLanguages = new Set(['japones', 'coreano'])
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
        rows.push({
          language, level, axis: question.axis, caseId: item.id, questionId: question.id,
          correctLength, wrongLengths,
          longest: correctLength > Math.max(...wrongLengths),
          shortest: correctLength < Math.min(...wrongLengths),
          ratio: correctLength / (wrongLengths[0] + wrongLengths[1]) * 2,
        })
      }
    }
  }
}

function report(label, selection) {
  const longest = selection.filter(row => row.longest).length
  const shortest = selection.filter(row => row.shortest).length
  const overOneAndHalf = selection.filter(row => row.ratio >= 1.5).length
  const meanRatio = selection.reduce((sum, row) => sum + row.ratio, 0) / selection.length
  console.log(`${label.padEnd(20)} ${String(longest).padStart(3)}/${selection.length} longest (${(longest / selection.length * 100).toFixed(1)}%) · ${String(shortest).padStart(3)} shortest · ≥1.5× ${String(overOneAndHalf).padStart(3)} · mean ratio ${meanRatio.toFixed(2)}`)
}

for (const [language] of languages) {
  for (const level of levels) report(`${language}/${level}`, rows.filter(row => row.language === language && row.level === level))
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
