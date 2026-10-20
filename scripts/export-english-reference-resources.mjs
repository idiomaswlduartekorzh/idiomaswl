import { mkdir, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { IRREGULAR_VERBS_100, TOTAL_VERBS } from '@/data/practica/recursos/verbos-irregulares-100'
import {
  ADJECTIVE_PAIRS,
  ENGLISH_REFERENCE_RESOURCES,
  LINKING_WORDS,
  PHRASAL_VERBS,
  PREPOSITION_COMBINATIONS,
} from '@/data/practica/recursos/english-reference-resources'

const expectedCounts = {
  irregularVerbs: 100,
  adjectivePairs: 50,
  phrasalVerbs: 50,
  prepositionCombinations: 60,
  linkingWords: 40,
}

const actualCounts = {
  irregularVerbs: TOTAL_VERBS,
  adjectivePairs: ADJECTIVE_PAIRS.length,
  phrasalVerbs: PHRASAL_VERBS.length,
  prepositionCombinations: PREPOSITION_COMBINATIONS.length,
  linkingWords: LINKING_WORDS.length,
}

for (const [key, expected] of Object.entries(expectedCounts)) {
  if (actualCounts[key] !== expected) {
    throw new Error(`${key}: expected ${expected}, received ${actualCounts[key]}`)
  }
}

const outputDir = resolve('tmp/english-reference-resources')
await mkdir(outputDir, { recursive: true })
await writeFile(
  resolve(outputDir, 'data.json'),
  JSON.stringify({
    generatedAt: new Date().toISOString(),
    resources: ENGLISH_REFERENCE_RESOURCES,
    irregularVerbGroups: IRREGULAR_VERBS_100,
    adjectivePairs: ADJECTIVE_PAIRS,
    phrasalVerbs: PHRASAL_VERBS,
    prepositionCombinations: PREPOSITION_COMBINATIONS,
    linkingWords: LINKING_WORDS,
  }, null, 2),
)

console.log(`Exported five English reference resources to ${outputDir}/data.json`)
