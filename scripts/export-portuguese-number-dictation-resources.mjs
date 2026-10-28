#!/usr/bin/env node

import { mkdir, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { PORTUGUESE_NUMBER_DICTATION_SETS, portugueseNumberWords } from '../src/data/practica/portuguese-number-dictation.ts'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const output = resolve(root, 'tmp/portuguese-number-dictation/resources.json')

const payload = {
  generatedAt: new Date().toISOString(),
  route: '/practica/portugues/a1/gramatica/numeros-ditado',
  reference: Array.from({ length: 100 }, (_, value) => ({ value, spoken: portugueseNumberWords(value) })),
  sets: PORTUGUESE_NUMBER_DICTATION_SETS,
}

await mkdir(dirname(output), { recursive: true })
await writeFile(output, `${JSON.stringify(payload, null, 2)}\n`, 'utf8')
console.log(`Exported ${payload.reference.length} reference numbers and ${payload.sets.length} dictation sets to ${output}`)
