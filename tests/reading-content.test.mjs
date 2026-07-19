import test from 'node:test'
import assert from 'node:assert/strict'
import { readFile, readdir } from 'node:fs/promises'
import { validateReadingExercise } from '../scripts/lib/reading-content-validator.mjs'

const fixture = JSON.parse(await readFile(new URL('../src/data/reading/exercises/en-a1-my-morning-at-the-cafe.json', import.meta.url), 'utf8'))
const koreanFixture = JSON.parse(await readFile(new URL('../src/data/reading/exercises/ko-a1-cafe-order.json', import.meta.url), 'utf8'))
const batchFiles = (await readdir(new URL('../src/data/reading/exercises/', import.meta.url)))
  .filter((filename) => filename.startsWith('en-') && filename.endsWith('.json'))
  .sort()
const batchFixtures = await Promise.all(batchFiles.map(async (filename) =>
  JSON.parse(await readFile(new URL(`../src/data/reading/exercises/${filename}`, import.meta.url), 'utf8'))
))

test('the A1 pilot satisfies structural and leveling preflight checks', () => {
  assert.deepEqual(validateReadingExercise(fixture), [])
})

test('publication is blocked while requested human changes await final approval', () => {
  const published = structuredClone(fixture)
  published.status = 'published'
  published.seo.indexable = true
  assert.match(validateReadingExercise(published).join('\n'), /approved language and pedagogy decisions/)
})

test('publication still requires identified human reviewers after approval', () => {
  const published = structuredClone(fixture)
  published.status = 'published'
  published.seo.indexable = true
  published.review.languageDecision = 'approved'
  published.review.pedagogyDecision = 'approved'
  published.review.languageReviewer = 'Pending human English review'
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

test('the Korean adapter fixture declares phrase-aware tokenization and readings', () => {
  assert.deepEqual(validateReadingExercise(koreanFixture), [])
  assert.equal(koreanFixture.scriptSupport.tokenizationMode, 'custom')
  assert.ok(koreanFixture.content.vocabulary.some((item) => item.surface.includes(' ')))
  assert.ok(koreanFixture.content.vocabulary.every((item) => item.reading))
})

test('Korean vocabulary must be present in the text and expose optional reading support', () => {
  const invalid = structuredClone(koreanFixture)
  invalid.content.vocabulary[0].surface = '없는 표현'
  delete invalid.content.vocabulary[1].reading
  const errors = validateReadingExercise(invalid).join('\n')
  assert.match(errors, /absent from target text/)
  assert.match(errors, /requires an optional-support reading/)
})

test('ordering answers must reference declared option IDs', () => {
  const invalid = structuredClone(fixture)
  const ordering = invalid.questions.find((question) => question.type === 'ordering')
  ordering.answer = ['unknown', 'reads', 'sandwich']
  assert.match(validateReadingExercise(invalid).join('\n'), /ordering answer/)
})

test('the complete English corpus passes content validation', () => {
  for (const exercise of batchFixtures) {
    assert.deepEqual(validateReadingExercise(exercise), [], exercise.id)
  }
})

test('English has ten reviewable readings at each requested level', () => {
  for (const level of ['A1', 'A2', 'B1']) {
    assert.equal(batchFixtures.filter((exercise) => exercise.level.cefr === level).length, 10)
  }

  assert.equal(batchFixtures.length, 30)
  assert.equal(new Set(batchFixtures.map((exercise) => exercise.id)).size, 30)
  assert.equal(new Set(batchFixtures.map((exercise) => exercise.slug)).size, 30)
  assert.ok(batchFixtures.every((exercise) => exercise.status !== 'published'))
  assert.ok(batchFixtures.every((exercise) => exercise.seo.indexable === false))
  assert.ok(batchFixtures.every((exercise) => exercise.audio === null))
  assert.ok(batchFixtures.every((exercise) => exercise.questions.length === 5))
  assert.ok(batchFixtures.every((exercise) => exercise.review.languageDecision !== 'approved'))
  assert.ok(batchFixtures.every((exercise) => exercise.review.pedagogyDecision !== 'approved'))
})

test('the English corpus forms one ordered thirty-episode series', () => {
  const episodes = batchFixtures.map((exercise) => exercise.series?.episode).sort((a, b) => a - b)
  assert.deepEqual(episodes, Array.from({ length: 30 }, (_, index) => index + 1))
  assert.ok(batchFixtures.every((exercise) => exercise.series?.totalEpisodes === 30))
})

test('question progression adds ordering sections as CEFR rises', () => {
  for (const level of ['A1', 'A2', 'B1']) {
    const readings = batchFixtures.filter((exercise) => exercise.level.cefr === level)
    const expectedOrderingSections = level === 'A1' ? 1 : level === 'A2' ? 2 : 3
    assert.ok(readings.every((exercise) => exercise.questions.filter((question) => question.type === 'ordering').length === expectedOrderingSections), level)
  }
})
