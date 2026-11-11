import assert from 'node:assert/strict'
import fs from 'node:fs'
import test from 'node:test'
import { validateWritingWorkplaceCases } from '../scripts/lib/writing-workplace-harness.mjs'

const cases = JSON.parse(fs.readFileSync(new URL('../src/data/practica/writing-workplace-b2.json', import.meta.url), 'utf8'))
const copy = () => structuredClone(cases)

test('twenty B2 cases satisfy the authoring contract', () => {
  assert.deepEqual(validateWritingWorkplaceCases(cases, 20), [])
})

test('harness rejects a question with invented evidence or a broken answer key', () => {
  const altered = copy()
  altered[0].questions[0].evidenceIds = ['F99']
  altered[0].questions[0].correctOptionId = 'missing'
  const issues = validateWritingWorkplaceCases(altered, 20)
  assert.ok(issues.some(issue => issue.includes('unknown evidence F99')))
  assert.ok(issues.some(issue => issue.includes('answer key is missing')))
})

test('harness rejects a model annotation that does not appear in the reply', () => {
  const altered = copy()
  altered[1].model.annotations[0].excerpt = 'a claim that does not exist'
  assert.ok(validateWritingWorkplaceCases(altered, 20).some(issue => issue.includes('excerpt is absent')))
})

test('harness rejects a case without an id', () => {
  const altered = copy()
  delete altered[0].id
  assert.ok(validateWritingWorkplaceCases(altered, 20).some(issue => issue.includes('missing an id')))
})

test('harness reports a missing model body without throwing', () => {
  const altered = copy()
  delete altered[0].model.body
  assert.ok(validateWritingWorkplaceCases(altered, 20).some(issue => issue.includes('incomplete model reply')))
})

test('twenty-case bank must balance its five workplace areas', () => {
  const altered = copy()
  altered[19].area = 'Marketing × Billing'
  const issues = validateWritingWorkplaceCases(altered, 20)
  assert.ok(issues.some(issue => issue.includes('Marketing: expected four cases; found 5')))
  assert.ok(issues.some(issue => issue.includes('Operations: expected four cases; found 3')))
})

test('answer keys cannot reveal a predictable position pattern', () => {
  const altered = copy()
  for (const item of altered) {
    for (const question of item.questions) question.correctOptionId = 'a'
  }
  const issues = validateWritingWorkplaceCases(altered, 20)
  assert.ok(issues.some(issue => issue.includes('distinct four-question patterns')))
  assert.ok(issues.some(issue => issue.includes('all four correct answers')))
})

test('distractor feedback cannot use one repeated stock opening', () => {
  const altered = copy()
  for (const item of altered) {
    for (const question of item.questions) {
      for (const option of question.options) if (option.id !== question.correctOptionId) option.feedback = 'That is not correct for this case.'
    }
  }
  assert.ok(validateWritingWorkplaceCases(altered, 20).some(issue => issue.includes('Distractor feedback repeats')))
})

test('distractor feedback must explain more than a quoted option', () => {
  const altered = copy()
  const question = altered[0].questions[0]
  const distractor = question.options.find(option => option.id !== question.correctOptionId)
  distractor.feedback = `«${distractor.text}» does not match the record.`
  assert.ok(validateWritingWorkplaceCases(altered, 20).some(issue => issue.includes('echoes the option')))
})
