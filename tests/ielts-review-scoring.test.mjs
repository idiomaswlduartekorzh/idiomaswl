import assert from 'node:assert/strict'
import test from 'node:test'
import {
  buildIeltsScoreSummary,
  calculateIeltsOverall,
  calculateIeltsWritingBand,
  normalizeIeltsBand,
} from '../src/lib/ielts/scoring.ts'

test('Task 2 counts twice when calculating the IELTS Writing band', () => {
  assert.equal(calculateIeltsWritingBand(6, 7), 6.5)
  assert.equal(calculateIeltsWritingBand(7.5, 8), 8)
})

test('overall uses every available IELTS skill and rounds to a half band', () => {
  assert.equal(calculateIeltsOverall([7, 6.5, 7, 7.5]), 7)
  assert.equal(calculateIeltsOverall([8, 7, 6.5, 7.5]), 7.5)
  assert.equal(calculateIeltsOverall([]), null)
})

test('score summary preserves Listening and Reading after human review', () => {
  const summary = buildIeltsScoreSummary({
    listening: 7.5,
    reading: 7,
    writing: 6.5,
    speaking: 7,
  })

  assert.equal(summary.totalScore, 7)
  assert.equal(summary.totalLabel, 'Listening Band 7.5 · Reading Band 7 · Writing Band 6.5 · Speaking Band 7')
  assert.deepEqual(summary.skills.map(skill => skill.skill), ['Listening', 'Reading', 'Writing', 'Speaking'])
})

test('band normalization rejects invalid values and keeps official half bands', () => {
  assert.equal(normalizeIeltsBand(-1), null)
  assert.equal(normalizeIeltsBand(10), null)
  assert.equal(normalizeIeltsBand('7'), null)
  assert.equal(normalizeIeltsBand(7.24), 7)
  assert.equal(normalizeIeltsBand(7.26), 7.5)
})
