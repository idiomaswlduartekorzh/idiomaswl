import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import fs from 'node:fs'
import test from 'node:test'
import { ROLEPLAY_INGLES_A2_CANDIDATE } from '../src/data/practica/habla-acompanado/drafts/index.ts'
import { ENGLISH_A2_RELEASE_APPROVAL, ENGLISH_A2_RELEASE_AUDITS } from '../src/data/practica/habla-acompanado/drafts/audit-ingles-a2.ts'

const digest = (value) => createHash('sha256').update(JSON.stringify(value)).digest('hex')

test('la aprobación de inglés A2 cubre exactamente los 20 escenarios vivos', () => {
  assert.equal(ROLEPLAY_INGLES_A2_CANDIDATE.length, 20)
  assert.equal(ENGLISH_A2_RELEASE_AUDITS.length, 20)
  assert.deepEqual(
    ENGLISH_A2_RELEASE_AUDITS.map((audit) => audit.slug).sort(),
    ROLEPLAY_INGLES_A2_CANDIDATE.map((scenario) => scenario.slug).sort(),
  )
  assert.equal(digest(ROLEPLAY_INGLES_A2_CANDIDATE), ENGLISH_A2_RELEASE_APPROVAL.contentDigest)
  for (const evidencePath of ENGLISH_A2_RELEASE_APPROVAL.evidence) assert.equal(fs.existsSync(evidencePath), true)
})

test('una edición del runtime invalida la huella aprobada', () => {
  const changed = structuredClone(ROLEPLAY_INGLES_A2_CANDIDATE)
  changed[0].title = `${changed[0].title} editado`
  assert.notEqual(digest(changed), ENGLISH_A2_RELEASE_APPROVAL.contentDigest)
})
