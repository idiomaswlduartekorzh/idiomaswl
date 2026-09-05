import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { GERMAN_STRUCTURE_QUEST } from '../src/data/practica/german-structure-quest-config.ts'
import { loadHarness, validateHarness } from './lib/german-tense-harness-core.mjs'

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const harness = loadHarness(repoRoot)
const failures = validateHarness(harness, GERMAN_STRUCTURE_QUEST)

if (failures.length) {
  console.error(`German tense agent harness check failed (${failures.length})`)
  failures.forEach((failure) => console.error(`- ${failure}`))
  process.exit(1)
}

console.log(`✓ German tense agent harness: ${Object.keys(harness.forms).length} formas, ${harness.policy.roles.length} agentes y cobertura 10/10/10/10/10 + historia final`)
