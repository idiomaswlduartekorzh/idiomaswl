import assert from 'node:assert/strict'
import test from 'node:test'
import {
  buildIeltsScoreSummary,
  calculateIeltsOverall,
  calculateIeltsWritingBand,
  normalizeIeltsBand,
} from '../src/lib/ielts/scoring.ts'
import {
  buildIeltsDelegatedAgentWorkflow,
  findMissingIeltsSpeakingAudioIds,
  IELTS_OFFICIAL_RUBRICS,
  validateIeltsDelegatedReviewInput,
} from '../src/lib/ielts/delegated-review.ts'
import { ieltsSpeakingEvidenceIssues } from '../src/lib/ielts/submission.ts'
import { scoreIeltsObjectiveAnswers } from '../src/lib/ielts/mock-scoring.ts'
import { withIeltsAcademic2026Blueprint } from '../src/data/mocks/ielts-academic-2026.ts'
import ieltsSet4 from '../src/data/mocks/ielts-set-4.ts'
import ieltsSet13 from '../src/data/mocks/ielts-set-13.ts'

function correctObjectiveAnswers(mock) {
  const answers = { fills: {}, mcq: {}, ms: {}, match: {} }
  for (const section of mock.sections.filter(item => !item.comingSoon)) {
    for (const question of section.questions) {
      if (question.type === 'formgroup') {
        for (const blank of question.blanks) answers.fills[`${question.id}__${blank.num}`] = blank.answers[0]
      } else if (question.type === 'tablegroup') {
        for (const row of question.rows) for (const cell of row) {
          if (typeof cell !== 'string') answers.fills[`${question.id}__${cell.num}`] = cell.answers[0]
        }
      } else if (question.type === 'multiselect') {
        answers.ms[question.id] = [...question.answers]
      } else if (question.type === 'matching') {
        for (const item of question.items) answers.match[`${question.id}__${item.num}`] = item.answer
      } else if (question.type === 'mcq' || question.type === 'dialog') {
        answers.mcq[question.id] = question.answer
      }
    }
  }
  return answers
}

test('Task 2 counts twice when calculating the IELTS Writing band', () => {
  assert.equal(calculateIeltsWritingBand(6, 7), 6.5)
  assert.equal(calculateIeltsWritingBand(7.5, 8), 8)
})

test('overall requires all four IELTS skills and rounds to a half band', () => {
  assert.equal(calculateIeltsOverall([7, 6.5, 7, 7.5]), 7)
  assert.equal(calculateIeltsOverall([8, 7, 6.5, 7.5]), 7.5)
  assert.equal(calculateIeltsOverall([]), null)
  assert.equal(calculateIeltsOverall([7, 6.5]), null)
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

test('submission scoring uses the same audited option order and media release state as the browser', async () => {
  const released = withIeltsAcademic2026Blueprint(ieltsSet4)
  assert.equal(released.format, 'ielts-academic-2026')
  assert.deepEqual(scoreIeltsObjectiveAnswers(released, correctObjectiveAnswers(released)), {
    listening: { correct: 40, total: 40, band: 9 },
    reading: { correct: 40, total: 40, band: 9 },
  })

  const audioBlocked = withIeltsAcademic2026Blueprint(ieltsSet13)
  const blockedScore = scoreIeltsObjectiveAnswers(audioBlocked, correctObjectiveAnswers(audioBlocked))
  assert.equal(blockedScore.listening, null)
  assert.deepEqual(blockedScore.reading, { correct: 40, total: 40, band: 9 })
})

test('score summary does not invent Overall from a partial skill set', () => {
  const summary = buildIeltsScoreSummary({ listening: 7.5, reading: 7 })
  assert.equal(summary.totalScore, null)
  assert.equal(summary.skills.length, 2)
})

test('band normalization rejects invalid values and keeps official half bands', () => {
  assert.equal(normalizeIeltsBand(-1), null)
  assert.equal(normalizeIeltsBand(10), null)
  assert.equal(normalizeIeltsBand('7'), null)
  assert.equal(normalizeIeltsBand(7.24), null)
  assert.equal(normalizeIeltsBand(7.26), null)
  assert.equal(normalizeIeltsBand(7.5), 7.5)
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

test('Speaking delegated calls require every assigned recording', () => {
  const prompts = [{ questionId: 'sp1' }, { questionId: 'sp2' }, { questionId: 'sp3' }]
  assert.deepEqual(findMissingIeltsSpeakingAudioIds(prompts, { sp1: 'one.webm', sp3: 'three.webm' }), ['sp2'])
  assert.deepEqual(findMissingIeltsSpeakingAudioIds(prompts, { sp1: 'one.webm', sp2: 'two.webm', sp3: 'three.webm' }), [])
})

test('Speaking workflow requires audible pronunciation evidence and one-use submission', () => {
  const workflow = buildIeltsDelegatedAgentWorkflow('speaking')
  assert.equal(workflow.version, 'welearn-ielts-delegated-review-v2')
  assert.equal(workflow.steps.some(step => step.includes('todas las grabaciones')), true)
  assert.equal(workflow.evidenceRequirements.some(item => item.includes('evidencia audible')), true)
  assert.equal(workflow.evidenceRequirements.some(item => item.includes('acento solo por no ser nativo')), true)
})

test('Speaking evidence gate requires every part and a meaningful aggregate sample', () => {
  const prompts = [
    { questionId: 'sp1', partNumber: 1 },
    { questionId: 'sp2', partNumber: 2 },
    { questionId: 'sp3', partNumber: 3 },
  ]
  const complete = [
    { questionId: 'sp1', mimeType: 'audio/webm', size: 2000, durationSeconds: 100 },
    { questionId: 'sp2', mimeType: 'audio/webm', size: 3000, durationSeconds: 70 },
    { questionId: 'sp3', mimeType: 'audio/webm', size: 2500, durationSeconds: 100 },
  ]
  assert.deepEqual(ieltsSpeakingEvidenceIssues(prompts, complete), [])
  assert.equal(ieltsSpeakingEvidenceIssues(prompts, complete.slice(0, 2)).some(issue => issue.includes('SP3')), true)
})

test('Speaking delegated report requires an audible-evidence attestation', () => {
  const valid = {
    evaluatorName: 'Claude',
    evaluatorModel: 'Sonnet test',
    overallBand: 6.5,
    criteria: IELTS_OFFICIAL_RUBRICS.speaking.criteria.map(item => ({
      criterion: item.key,
      band: 6.5,
      reason: `Audible evidence-based explanation for ${item.label}.`,
    })),
    summary: 'The diagnostic sample is intelligible and sustained, with specific fluency and pronunciation evidence.',
    strengths: ['Intelligible delivery'],
    priorities: ['Develop longer turns'],
  }
  assert.equal(validateIeltsDelegatedReviewInput('speaking', valid).ok, false)
  assert.equal(validateIeltsDelegatedReviewInput('speaking', { ...valid, audioEvidenceAttested: true }).ok, true)
})
