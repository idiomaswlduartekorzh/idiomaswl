import assert from 'node:assert/strict'
import fs from 'node:fs'
import test from 'node:test'
import { validateWritingWorkplaceCases } from '../scripts/lib/writing-workplace-harness.mjs'

const cases = JSON.parse(fs.readFileSync(new URL('../src/data/practica/writing-workplace-b2.json', import.meta.url), 'utf8'))
const copy = () => structuredClone(cases)

test('preview cases satisfy the authoring contract', () => {
  assert.deepEqual(validateWritingWorkplaceCases(cases), [])
})

test('harness rejects a question with invented evidence or a broken answer key', () => {
  const altered = copy()
  altered[0].questions[0].evidenceIds = ['F99']
  altered[0].questions[0].correctOptionId = 'missing'
  const issues = validateWritingWorkplaceCases(altered)
  assert.ok(issues.some(issue => issue.includes('unknown evidence F99')))
  assert.ok(issues.some(issue => issue.includes('answer key is missing')))
})

test('harness rejects a model annotation that does not appear in the reply', () => {
  const altered = copy()
  altered[1].model.annotations[0].excerpt = 'a claim that does not exist'
  assert.ok(validateWritingWorkplaceCases(altered).some(issue => issue.includes('excerpt is absent')))
})

test('harness rejects a case without an id', () => {
  const altered = copy()
  delete altered[0].id
  assert.ok(validateWritingWorkplaceCases(altered).some(issue => issue.includes('missing an id')))
})

test('harness reports a missing model body without throwing', () => {
  const altered = copy()
  delete altered[0].model.body
  assert.ok(validateWritingWorkplaceCases(altered).some(issue => issue.includes('incomplete model reply')))
})
