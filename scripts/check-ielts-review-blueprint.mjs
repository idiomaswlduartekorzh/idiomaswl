import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { IELTS_REVIEW_BLUEPRINTS } from '../src/lib/ielts/review-blueprint.ts'

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

for (let setNumber = 1; setNumber <= 20; setNumber += 1) {
  const mockId = `set-${setNumber}`
  const { default: mock } = await import(`../src/data/mocks/ielts-set-${setNumber}.ts`)
  const blueprint = IELTS_REVIEW_BLUEPRINTS[mockId]

  assert.ok(blueprint, `${mockId}: falta blueprint de revisión`)
  assert.equal(mock.id, mockId, `${mockId}: el id del mock no coincide`)
  assert.equal(mock.title, `IELTS Academic Set ${setNumber}`, `${mockId}: título no canónico`)
  assert.equal(blueprint.mockTitle, mock.title, `${mockId}: título del blueprint desalineado`)
  assert.equal(blueprint.contentVersion, `ielts-set-${setNumber}-v1`, `${mockId}: versión de contenido inesperada`)

  const writing = mock.sections
    .filter(section => section.skill === 'writing')
    .flatMap(section => section.questions)
    .filter(question => question.type === 'write')
  assert.deepEqual(writing.map(question => question.taskNumber).sort(), [1, 2], `${mockId}: debe tener Task 1 y Task 2`)
  const task1 = writing.find(question => question.taskNumber === 1)
  assert.ok(task1?.imageUrl, `${mockId}: Task 1 necesita un artefacto visual`)
  assert.ok(fs.existsSync(path.join(repoRoot, 'public', task1.imageUrl)), `${mockId}: no existe ${task1.imageUrl}`)
  assert.ok((task1.stimulusLabel || task1.stimulus)?.trim(), `${mockId}: Task 1 no tiene consigna visual`)

  const speaking = mock.sections
    .filter(section => section.skill === 'speaking')
    .flatMap(section => section.questions)
    .filter(question => question.type === 'speak')
  assert.ok(speaking.length >= 3, `${mockId}: Speaking necesita evidencia de las tres partes`)
  assert.deepEqual([...new Set(speaking.map(question => question.partNumber))].sort(), [1, 2, 3], `${mockId}: faltan Part 1, 2 o 3`)
  assert.equal(new Set(speaking.map(question => question.id)).size, speaking.length, `${mockId}: IDs de Speaking repetidos`)
}

const { default: set2 } = await import('../src/data/mocks/ielts-set-2.ts')
const set2Task1 = set2.sections.flatMap(section => section.questions).find(question => question.type === 'write' && question.taskNumber === 1)
assert.match(set2Task1.stimulusLabel, /global sales/i, 'Set 2: la consigna debe describir ventas globales')
assert.match(set2Task1.stimulusLabel, /2000.*2006/i, 'Set 2: la consigna debe coincidir con los años del gráfico')
assert.match(set2Task1.imageAlt, /mobile phone.*online.*console.*handheld/i, 'Set 2: el texto alternativo debe enumerar las cuatro series')

console.log('✓ IELTS review blueprint: 20/20 sets, Writing, Speaking y prompt↔asset verificados')
