#!/usr/bin/env node

import assert from 'node:assert/strict'
import { PORTUGUESE_NUMBER_DICTATION_SETS, portugueseNumberWords } from '../src/data/practica/portuguese-number-dictation.ts'

const FLASH_CREDITS_PER_CHARACTER = 0.5

const spellingChecks = new Map([
  [0, 'zero'],
  [14, 'catorze'],
  [33, 'trinta e três'],
  [100, 'cem'],
  [101, 'cento e um'],
  [1_000, 'mil'],
  [1_001, 'mil e um'],
  [1_999, 'mil novecentos e noventa e nove'],
  [2_500, 'dois mil e quinhentos'],
  [33_333, 'trinta e três mil trezentos e trinta e três'],
  [40_500, 'quarenta mil e quinhentos'],
  [100_000, 'cem mil'],
])

for (const [value, expected] of spellingChecks) {
  assert.equal(portugueseNumberWords(value), expected, `Unexpected Portuguese spelling for ${value}`)
}

assert.equal(PORTUGUESE_NUMBER_DICTATION_SETS.length, 6)
assert.ok(PORTUGUESE_NUMBER_DICTATION_SETS.every((set) => set.items.length === 20))
for (let index = 0; index < PORTUGUESE_NUMBER_DICTATION_SETS.length; index += 2) {
  const digitsSet = PORTUGUESE_NUMBER_DICTATION_SETS[index]
  const wordsSet = PORTUGUESE_NUMBER_DICTATION_SETS[index + 1]
  assert.equal(digitsSet.answerMode, 'digits')
  assert.equal(wordsSet.answerMode, 'words')
  assert.deepEqual(wordsSet.items, digitsSet.items, `Paired sets must reuse the same audio at index ${index}`)
}

const seenAudioUrls = new Set()
const sets = PORTUGUESE_NUMBER_DICTATION_SETS.map((set) => {
  const newAudioItems = set.items.filter((item) => {
    if (seenAudioUrls.has(item.audioUrl)) return false
    seenAudioUrls.add(item.audioUrl)
    return true
  })
  const characters = newAudioItems.reduce((total, item) => total + item.spoken.length, 0)
  const conservativeFlashCredits = newAudioItems.reduce(
    (total, item) => total + Math.ceil(item.spoken.length * FLASH_CREDITS_PER_CHARACTER),
    0,
  )
  return {
    id: set.id,
    range: set.range,
    answerMode: set.answerMode,
    exercises: set.items.length,
    newAudioFiles: newAudioItems.length,
    characters,
    conservativeFlashCredits,
  }
})

const totalCharacters = sets.reduce((total, set) => total + set.characters, 0)
const conservativeFlashCredits = sets.reduce((total, set) => total + set.conservativeFlashCredits, 0)

console.log(JSON.stringify({
  model: 'eleven_flash_v2_5',
  sets,
  totals: {
    sets: sets.length,
    exercises: PORTUGUESE_NUMBER_DICTATION_SETS.reduce((total, set) => total + set.items.length, 0),
    uniqueAudioFiles: seenAudioUrls.size,
    characters: totalCharacters,
    creditsAtExactHalfRate: Math.ceil(totalCharacters * FLASH_CREDITS_PER_CHARACTER),
    conservativeCreditsWithPerRequestRounding: conservativeFlashCredits,
  },
  note: 'Dry run only. This script does not read a key, call ElevenLabs, or create audio.',
}, null, 2))

