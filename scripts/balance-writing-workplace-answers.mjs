import fs from 'node:fs'
import { createHash } from 'node:crypto'

const [file, flag] = process.argv.slice(2)
if (!file) {
  console.error('Usage: node scripts/balance-writing-workplace-answers.mjs <case-bank.json> [--write]')
  process.exit(1)
}

const cases = JSON.parse(fs.readFileSync(file, 'utf8'))
if (cases.length !== 20 || cases.some(item => item.questions?.length !== 4)) {
  throw new Error('Answer balancing needs a complete 20-case bank with four questions per case.')
}

function random(seed) {
  let state = seed >>> 0
  return () => {
    state = (state + 0x6D2B79F5) >>> 0
    let value = state
    value = Math.imul(value ^ (value >>> 15), value | 1)
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61)
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296
  }
}

function shuffle(values, seed) {
  const result = [...values]
  const next = random(seed)
  for (let index = result.length - 1; index > 0; index--) {
    const other = Math.floor(next() * (index + 1))
    ;[result[index], result[other]] = [result[other], result[index]]
  }
  return result
}

function hash(value) {
  return createHash('sha256').update(value).digest().readUInt32BE(0)
}

let columns
let patterns
for (let attempt = 0; attempt < 100000; attempt++) {
  columns = Array.from({ length: 4 }, (_, axis) => shuffle('aaaaaaabbbbbbbcccccc', attempt * 11 + axis))
  patterns = cases.map((_, index) => columns.map(column => column[index]).join(''))
  if (new Set(patterns).size === 20 && patterns.every(pattern => new Set(pattern).size > 1)) break
}
if (new Set(patterns).size !== 20 || patterns.some(pattern => new Set(pattern).size === 1)) {
  throw new Error('Could not generate distinct, varied answer patterns.')
}

for (const [caseIndex, item] of cases.entries()) {
  for (const [axisIndex, question] of item.questions.entries()) {
    const correct = question.options.find(option => option.id === question.correctOptionId)
    if (!correct || question.options.length !== 3) throw new Error(`${item.id}/${question.id}: invalid options.`)
    const incorrect = shuffle(question.options.filter(option => option !== correct).sort((a, b) => a.text.localeCompare(b.text)), hash(`${item.id}|${question.id}`))
    const target = 'abc'.indexOf(columns[axisIndex][caseIndex])
    const arranged = Array(3)
    arranged[target] = correct
    for (let index = 0; index < 3; index++) if (!arranged[index]) arranged[index] = incorrect.pop()
    arranged.forEach((option, index) => { option.id = 'abc'[index] })
    question.options = arranged
    question.correctOptionId = 'abc'[target]
  }
}

console.log(patterns.join(' '))
if (flag === '--write') fs.writeFileSync(file, `${JSON.stringify(cases, null, 2)}\n`)
