#!/usr/bin/env node

import assert from 'node:assert/strict'
import { statSync } from 'node:fs'
import { resolve } from 'node:path'
import { PORTUGUESE_NUMBER_DICTATION_SETS, portugueseNumberWords } from '../src/data/practica/portuguese-number-dictation.ts'

const root = resolve(import.meta.dirname, '..')
const pdfDirectory = resolve(root, 'private/site-materials/portugues-a1/grammar')
const pdfs = [
  'idiomaswl-numeros-ditado-a1.pdf',
  'idiomaswl-numeros-ditado-a1-exercicios.pdf',
  'idiomaswl-numeros-ditado-a1-gabarito.pdf',
]

assert.equal(PORTUGUESE_NUMBER_DICTATION_SETS.length, 6, 'The lesson must expose six dictation sets')
assert.equal(PORTUGUESE_NUMBER_DICTATION_SETS.reduce((sum, set) => sum + set.items.length, 0), 120, 'The lesson must contain 120 answers')
assert.ok(PORTUGUESE_NUMBER_DICTATION_SETS.every((set) => set.items.length === 20), 'Every set must contain 20 answers')
assert.ok(PORTUGUESE_NUMBER_DICTATION_SETS.every((set) => new Set(set.items.map((item) => item.value)).size === 20), 'Every set must contain 20 distinct values')
assert.equal(portugueseNumberWords(100_000), 'cem mil')

for (const set of PORTUGUESE_NUMBER_DICTATION_SETS) {
  const audio = resolve(root, 'public', set.audioUrl.replace(/^\//, ''))
  assert.ok(statSync(audio).size > 100_000, `Audio is missing or too small: ${audio}`)
}

for (const name of pdfs) {
  const pdf = resolve(pdfDirectory, name)
  assert.ok(statSync(pdf).size > 50_000, `PDF is missing or too small: ${pdf}`)
}

console.log('Portuguese number lesson verified: 6 audios, 120 answers and 3 printable PDFs.')
