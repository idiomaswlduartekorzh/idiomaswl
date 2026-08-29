import assert from 'node:assert/strict'
import test from 'node:test'

import { ENGLISH_TENSE_QUEST } from '../src/data/practica/english-tense-quest-config.ts'
import { FRENCH_STRUCTURE_QUEST } from '../src/data/practica/french-structure-quest.ts'
import { GERMAN_STRUCTURE_QUEST } from '../src/data/practica/german-structure-quest.ts'
import { EDITORIAL_ITALIAN_FORMS, ITALIAN_TENSE_QUEST } from '../src/data/practica/italian-tense-quest-config.ts'
import { JAPANESE_STRUCTURE_QUEST } from '../src/data/practica/japanese-structure-quest.ts'
import { KOREAN_STRUCTURE_QUEST } from '../src/data/practica/korean-structure-quest.ts'
import { PORTUGUESE_STRUCTURE_QUEST } from '../src/data/practica/portuguese-structure-quest.ts'
import { RUSSIAN_STRUCTURE_QUEST } from '../src/data/practica/russian-structure-quest.ts'

const CONFIGS = [
  ITALIAN_TENSE_QUEST,
  ENGLISH_TENSE_QUEST,
  FRENCH_STRUCTURE_QUEST,
  PORTUGUESE_STRUCTURE_QUEST,
  GERMAN_STRUCTURE_QUEST,
  RUSSIAN_STRUCTURE_QUEST,
  JAPANESE_STRUCTURE_QUEST,
  KOREAN_STRUCTURE_QUEST,
]

test('multiple-choice answers are balanced across A, B, C and D', () => {
  for (const config of CONFIGS) {
    const positions = [0, 0, 0, 0]
    for (const challenge of config.choiceChallenges) positions[challenge.options.indexOf(challenge.answer)] += 1
    assert.ok(positions.every((count) => count > 0), `${config.id}: ${positions.join('/')}`)
    assert.ok(Math.max(...positions) - Math.min(...positions) <= 1, `${config.id}: ${positions.join('/')}`)
  }
})

test('error targets are balanced across all three selectable verbs', () => {
  for (const config of CONFIGS) {
    const positions = [0, 0, 0]
    for (const challenge of config.errorChallenges) {
      positions[challenge.chunks.findIndex((chunk) => chunk.id === challenge.wrongId)] += 1
    }
    assert.ok(positions.every((count) => count > 0), `${config.id}: ${positions.join('/')}`)
    assert.ok(Math.max(...positions) - Math.min(...positions) <= 1, `${config.id}: ${positions.join('/')}`)
  }
})

test('function maps do not reveal their answer in the hint', () => {
  for (const config of CONFIGS) {
    for (const challenge of config.timelineChallenges) {
      assert.ok(challenge.options.length >= 2, challenge.id)
      for (const slot of challenge.slots) {
        assert.notEqual(slot.hint.trim(), slot.answer.trim(), `${challenge.id}/${slot.id}`)
      }
    }
  }
})

test('declared normative variants survive into every written-answer level', () => {
  const englishNegative = ENGLISH_TENSE_QUEST.microStories.find((item) => item.gaps.some((gap) => gap.tense === 'present-perfect' && gap.verb === 'not receive'))
  assert.deepEqual(englishNegative?.gaps.find((gap) => gap.verb === 'not receive')?.answers, ['have not received', "haven't received"])

  const japaneseExperience = JAPANESE_STRUCTURE_QUEST.microStories.find((item) => item.id === 'japanese-structure-quest-micro-experience-1')
  assert.ok(japaneseExperience?.gaps[0].answers.includes('行ったことあります'))

  const russianYo = RUSSIAN_STRUCTURE_QUEST.microStories.find((item) => item.id === 'russian-structure-quest-micro-past-imperfective-3')
  assert.ok(russianYo?.gaps[0].answers.includes('шел'))
})

test('Italian exposes progressive periphrases and ten real challenges per form and level', () => {
  const ids = ITALIAN_TENSE_QUEST.forms.map((form) => form.id)
  assert.ok(ids.includes('presente-progressivo'))
  assert.ok(ids.includes('imperfetto-progressivo'))

  for (const id of ids) {
    assert.ok(ITALIAN_TENSE_QUEST.choiceChallenges.filter((item) => item.tenses.includes(id)).length >= 10, `${id}/choice`)
    assert.ok(ITALIAN_TENSE_QUEST.microStories.filter((item) => item.gaps.some((gap) => gap.tense === id)).length >= 10, `${id}/micro`)
    assert.ok(ITALIAN_TENSE_QUEST.longStories.filter((item) => item.gaps.some((gap) => gap.tense === id)).length >= 10, `${id}/long`)
    assert.ok(ITALIAN_TENSE_QUEST.errorChallenges.filter((item) => item.tense === id).length >= 10, `${id}/error`)
    assert.ok(ITALIAN_TENSE_QUEST.timelineChallenges.filter((item) => item.slots.some((slot) => slot.tense === id)).length >= 10, `${id}/timeline`)
    assert.ok(ITALIAN_TENSE_QUEST.finalChallenges.filter((item) => item.gaps.some((gap) => gap.tenseId === id)).length >= 10, `${id}/final`)
  }
})

test('Italian written answers never hide lexical adverbs inside the requested conjugation', () => {
  const lexicalAdverb = /\b(?:appena|già|ancora|mai|sempre)\b/iu
  for (const challenge of [...ITALIAN_TENSE_QUEST.microStories, ...ITALIAN_TENSE_QUEST.longStories]) {
    for (const gap of challenge.gaps) {
      for (const answer of gap.answers) assert.doesNotMatch(answer, lexicalAdverb, `${challenge.id}/${gap.id}`)
    }
  }

  const finire = ITALIAN_TENSE_QUEST.microStories.find((item) => item.id === 'it-pp-micro-editorial-5')
  assert.deepEqual(finire?.gaps[0].answers, ['ha finito'])
})

test('Italian remote pluperfect always exposes its literary temporal anchor', () => {
  const longs = ITALIAN_TENSE_QUEST.longStories.filter((item) => item.gaps.some((gap) => gap.tense === 'trapassato-remoto'))
  for (const item of longs) {
    const anchors = item.segments.join(' ').match(/\b(?:dopo che|quando|non appena|appena)\b/giu) ?? []
    assert.ok(anchors.length >= item.gaps.length, item.id)
  }

  const timelines = ITALIAN_TENSE_QUEST.timelineChallenges.filter((item) => item.slots.some((slot) => slot.tense === 'trapassato-remoto'))
  for (const item of timelines) {
    assert.ok(item.options.every((option) => /\b(?:dopo che|quando|non appena|appena)\b/iu.test(option) && option.includes(',')), item.id)
  }

  const errors = ITALIAN_TENSE_QUEST.errorChallenges.filter((item) => item.tense === 'trapassato-remoto')
  for (const item of errors) {
    const text = `${item.chunks.map((chunk) => chunk.before).join(' ')} ${item.after}`
    const anchors = text.match(/\b(?:dopo che|quando|non appena|appena)\b/giu) ?? []
    assert.ok(anchors.length >= item.chunks.length, item.id)
  }
})

test('Italian future perfect always exposes a deadline or a second future point', () => {
  const anchor = /\b(?:entro|prima|quando|dopo che|appena|a quest[’']ora)\b/giu
  const longs = ITALIAN_TENSE_QUEST.longStories.filter((item) => item.gaps.some((gap) => gap.tense === 'futuro-anteriore'))
  for (const item of longs) assert.ok((item.segments.join(' ').match(anchor) ?? []).length >= item.gaps.length, item.id)

  const errors = ITALIAN_TENSE_QUEST.errorChallenges.filter((item) => item.tense === 'futuro-anteriore')
  for (const item of errors) {
    const text = `${item.chunks.map((chunk) => chunk.before).join(' ')} ${item.after}`
    assert.ok((text.match(anchor) ?? []).length >= item.chunks.length, item.id)
  }

  const timelines = ITALIAN_TENSE_QUEST.timelineChallenges.filter((item) => item.slots.some((slot) => slot.tense === 'futuro-anteriore'))
  for (const item of timelines) assert.ok(item.options.every((option) => /\b(?:quando|dopo che|appena)\b/iu.test(option) && option.includes(',')), item.id)
})

test('Italian final decisions use autonomous context and same-verb candidate sets', () => {
  const answerPositions = [0, 0, 0, 0]
  for (const challenge of ITALIAN_TENSE_QUEST.finalChallenges) {
    const cardIds = new Set(challenge.cards.map((card) => card.id))
    for (const gap of challenge.gaps) {
      assert.ok(gap.standalone?.before || gap.standalone?.after, gap.id)
      assert.equal(gap.candidateCardIds?.length, 4, gap.id)
      assert.ok(gap.candidateCardIds?.includes(gap.answerCardId), gap.id)
      assert.ok(gap.candidateCardIds?.every((id) => cardIds.has(id)), gap.id)
      answerPositions[gap.candidateCardIds.indexOf(gap.answerCardId)] += 1
    }
  }
  assert.ok(answerPositions.every((count) => count > 0), answerPositions.join('/'))
  assert.ok(Math.max(...answerPositions) - Math.min(...answerPositions) <= 1, answerPositions.join('/'))
  assert.ok(answerPositions[0] / answerPositions.reduce((sum, count) => sum + count, 0) < 0.3)
})

test('Italian final dossiers never repeat level-one scenes', () => {
  for (const form of ITALIAN_TENSE_QUEST.forms) {
    const levelOne = new Set(ITALIAN_TENSE_QUEST.choiceChallenges.filter((item) => item.tenses.includes(form.id)).map((item) => item.context.toLocaleLowerCase('it')))
    const finals = ITALIAN_TENSE_QUEST.finalChallenges.flatMap((item) => item.gaps.filter((gap) => gap.tenseId === form.id).map((gap) => `${gap.standalone?.before ?? ''}___${gap.standalone?.after ?? ''}`))
    assert.equal(finals.length, 10, form.id)
    assert.equal(new Set(finals).size, 10, form.id)
    assert.ok(finals.every((context) => !levelOne.has(context.toLocaleLowerCase('it'))), form.id)
  }
})

test('each migrated Italian form uses independent editorial banks for every discursive level', () => {
  assert.deepEqual(new Set(ITALIAN_TENSE_QUEST.forms.map((form) => form.id)), EDITORIAL_ITALIAN_FORMS)
  for (const formId of EDITORIAL_ITALIAN_FORMS) {
    const micro = ITALIAN_TENSE_QUEST.microStories.filter((item) => item.gaps.some((gap) => gap.tense === formId))
    const long = ITALIAN_TENSE_QUEST.longStories.filter((item) => item.gaps.some((gap) => gap.tense === formId))
    const errors = ITALIAN_TENSE_QUEST.errorChallenges.filter((item) => item.tense === formId)
    const timelines = ITALIAN_TENSE_QUEST.timelineChallenges.filter((item) => item.slots.some((slot) => slot.tense === formId))

    assert.ok([...micro, ...long, ...errors, ...timelines].every((item) => item.id.includes('-editorial-')), formId)
    assert.ok(long.every((item) => item.gaps.length >= 3 && !item.segments.join('').includes(' · ')), formId)
    assert.ok(errors.every((item) => item.chunks.length === 3), formId)
    assert.ok(timelines.every((item) => item.options.length === 3), formId)

    const fingerprints = [...micro, ...long].map((item) => item.segments.join('___').toLocaleLowerCase('it'))
    assert.equal(new Set(fingerprints).size, fingerprints.length, formId)
  }
})

test('Italian imperative preserves negative tu and formal Lei', () => {
  const negativeTu = ITALIAN_TENSE_QUEST.microStories.find((item) => item.id === 'it-imperative-micro-editorial-4')
  assert.ok(negativeTu?.segments[0].trim().endsWith('Non'))
  assert.deepEqual(negativeTu?.gaps[0].answers, ['premere'])

  const formalLei = ITALIAN_TENSE_QUEST.microStories.find((item) => item.id === 'it-imperative-micro-editorial-3')
  assert.deepEqual(formalLei?.gaps[0].answers, ['attenda'])
})
