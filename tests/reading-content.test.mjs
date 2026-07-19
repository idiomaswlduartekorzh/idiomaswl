import test from 'node:test'
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { validateReadingExercise } from '../scripts/lib/reading-content-validator.mjs'

const fixture = JSON.parse(await readFile(new URL('../src/data/reading/exercises/en-a1-my-morning-at-the-cafe.json', import.meta.url), 'utf8'))

test('the A1 pilot satisfies structural and leveling preflight checks', () => {
  assert.deepEqual(validateReadingExercise(fixture), [])
})

test('publication is blocked while human reviewers are pending', () => {
  const published = structuredClone(fixture)
  published.status = 'published'
  published.seo.indexable = true
  assert.match(validateReadingExercise(published).join('\n'), /identified human reviewers/)
})

test('Korean content requires TOPIK and an explicit mapping disclaimer', () => {
  const korean = structuredClone(fixture)
  korean.id = 'ko-a1-test-fixture'
  korean.language = 'ko'
  korean.variant = 'ko-KR'
  delete korean.level.topik
  delete korean.level.mappingDisclaimer
  const errors = validateReadingExercise(korean).join('\n')
  assert.match(errors, /TOPIK/)
})

test('ordering answers must reference declared option IDs', () => {
  const invalid = structuredClone(fixture)
  const ordering = invalid.questions.find((question) => question.type === 'ordering')
  ordering.answer = ['unknown', 'reads', 'sandwich']
  assert.match(validateReadingExercise(invalid).join('\n'), /ordering answer/)
})

