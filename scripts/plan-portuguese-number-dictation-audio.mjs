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

const sets = PORTUGUESE_NUMBER_DICTATION_SETS.map((set) => {
  const characters = set.items.reduce((total, item) => total + item.spoken.length, 0)
  const conservativeFlashCredits = set.items.reduce(
    (total, item) => total + Math.ceil(item.spoken.length * FLASH_CREDITS_PER_CHARACTER),
    0,
  )
  return {
    id: set.id,
    range: set.range,
    items: set.items.length,
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
    items: PORTUGUESE_NUMBER_DICTATION_SETS.reduce((total, set) => total + set.items.length, 0),
    characters: totalCharacters,
    creditsAtExactHalfRate: Math.ceil(totalCharacters * FLASH_CREDITS_PER_CHARACTER),
    conservativeCreditsWithPerRequestRounding: conservativeFlashCredits,
  },
  note: 'Dry run only. This script does not read a key, call ElevenLabs, or create audio.',
}, null, 2))

