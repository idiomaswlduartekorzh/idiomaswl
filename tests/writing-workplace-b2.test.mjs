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

test('Japanese and Korean length guides count characters rather than spaces', () => {
  const altered = copy().slice(0, 1)
  altered[0].email.body = 'あ'.repeat(120)
  altered[0].model.body = '漢'.repeat(260)
  altered[0].model.annotations.forEach(note => { note.excerpt = '漢' })
  altered[0].task.wordGuide = '250–300字'
  const validIssues = validateWritingWorkplaceCases(altered, 1, { lengthUnit: 'characters' })
  assert.ok(!validIssues.some(issue => issue.includes('characters') || issue.includes('outside its published word guide')))
  altered[0].model.body = '漢'.repeat(200)
  assert.ok(validateWritingWorkplaceCases(altered, 1, { lengthUnit: 'characters' }).some(issue => issue.includes('model reply should contain 250–900 characters')))
})

test('a case cannot reuse feedback or annotation labels', () => {
  const altered = copy()
  altered[0].questions[0].options[1].feedback = altered[0].questions[0].options[0].feedback
  altered[0].model.annotations[1].label = altered[0].model.annotations[0].label
  const issues = validateWritingWorkplaceCases(altered, 20)
  assert.ok(issues.some(issue => issue.includes('options need distinct feedback')))
  assert.ok(issues.some(issue => issue.includes('annotation labels must differ')))
})

test('model subject must use the locale reply prefix', () => {
  const altered = copy()
  altered[0].model.subject = 'Respuesta: a mixed-language subject'
  assert.ok(validateWritingWorkplaceCases(altered, 20, { subjectPrefix: 'Re:' }).some(issue => issue.includes('target-language reply prefix')))
})
