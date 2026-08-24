import assert from 'node:assert/strict'
import test from 'node:test'

import { ENGLISH_TENSE_QUEST } from '../src/data/practica/english-tense-quest.ts'
import { FRENCH_STRUCTURE_QUEST } from '../src/data/practica/french-structure-quest.ts'
import { GERMAN_STRUCTURE_QUEST } from '../src/data/practica/german-structure-quest.ts'
import { ITALIAN_TENSE_QUEST } from '../src/data/practica/italian-tense-quest-config.ts'
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
  const englishNegative = ENGLISH_TENSE_QUEST.microStories.find((item) => item.id === 'en-micro-present-perfect-3')
  assert.deepEqual(englishNegative?.gaps[0].answers, ['have not received', "haven't received"])

  const japaneseExperience = JAPANESE_STRUCTURE_QUEST.microStories.find((item) => item.id === 'japanese-structure-quest-micro-experience-1')
  assert.ok(japaneseExperience?.gaps[0].answers.includes('行ったことあります'))

  const russianYo = RUSSIAN_STRUCTURE_QUEST.microStories.find((item) => item.id === 'russian-structure-quest-micro-past-imperfective-3')
  assert.ok(russianYo?.gaps[0].answers.includes('шел'))
})
