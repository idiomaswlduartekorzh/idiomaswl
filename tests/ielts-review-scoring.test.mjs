import assert from 'node:assert/strict'
import test from 'node:test'
import {
  buildIeltsScoreSummary,
  calculateIeltsOverall,
  calculateIeltsWritingBand,
  normalizeIeltsBand,
} from '../src/lib/ielts/scoring.ts'
import {
  IELTS_OFFICIAL_RUBRICS,
  validateIeltsDelegatedReviewInput,
} from '../src/lib/ielts/delegated-review.ts'

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

test('delegated calls use the task-specific official IELTS criteria', () => {
  assert.deepEqual(
    IELTS_OFFICIAL_RUBRICS.writing_task_1.criteria.map(item => item.key),
    ['taskAchievement', 'coherenceCohesion', 'lexicalResource', 'grammaticalRange'],
  )
  assert.deepEqual(
    IELTS_OFFICIAL_RUBRICS.writing_task_2.criteria.map(item => item.key),
    ['taskResponse', 'coherenceCohesion', 'lexicalResource', 'grammaticalRange'],
  )
  assert.deepEqual(
    IELTS_OFFICIAL_RUBRICS.speaking.criteria.map(item => item.key),
    ['fluencyCoherence', 'lexicalResource', 'grammaticalRangeAccuracy', 'pronunciation'],
  )
})

test('delegated review validation accepts a complete report and rejects rubric drift', () => {
  const valid = {
    evaluatorName: 'Claude',
    evaluatorModel: 'Sonnet test',
    overallBand: 6.5,
    criteria: IELTS_OFFICIAL_RUBRICS.writing_task_2.criteria.map(item => ({
      criterion: item.key,
      band: 6.5,
      reason: `Evidence-based explanation for ${item.label}.`,
    })),
    summary: 'The response addresses the prompt but needs more specific development and language control.',
    strengths: ['Clear position'],
    priorities: ['Develop examples'],
  }

  assert.equal(validateIeltsDelegatedReviewInput('writing_task_2', valid).ok, true)
  assert.equal(validateIeltsDelegatedReviewInput('writing_task_1', valid).ok, false)
  assert.equal(validateIeltsDelegatedReviewInput('writing_task_2', { ...valid, overallBand: 6.25 }).ok, false)
  assert.equal(validateIeltsDelegatedReviewInput('writing_task_2', { ...valid, overallBand: 7 }).ok, false)
})
