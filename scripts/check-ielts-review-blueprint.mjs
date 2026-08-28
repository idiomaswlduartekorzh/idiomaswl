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
assert.match(set2Task1.stimulusLabel, /commuters.*Norchester/i, 'Set 2: la consigna debe describir los desplazamientos en Norchester')
assert.match(set2Task1.stimulusLabel, /2005.*2015.*2025/i, 'Set 2: la consigna debe coincidir con los años del gráfico')
assert.match(set2Task1.imageAlt, /car.*bus.*rail.*bicycle.*foot/i, 'Set 2: el texto alternativo debe enumerar los cinco modos')

const { default: set3 } = await import('../src/data/mocks/ielts-set-3.ts')
const set3Task1 = set3.sections.flatMap(section => section.questions).find(question => question.type === 'write' && question.taskNumber === 1)
assert.match(set3Task1.stimulusLabel, /passengers.*Larton/i, 'Set 3: la consigna debe describir los pasajeros en Larton')
assert.match(set3Task1.stimulusLabel, /2010.*2015.*2020.*2025/i, 'Set 3: la consigna debe coincidir con los años del gráfico')
assert.match(set3Task1.imageAlt, /metro.*tram.*ferry/i, 'Set 3: el texto alternativo debe enumerar los tres medios')

const { default: set6 } = await import('../src/data/mocks/ielts-set-6.ts')
const set6Task1 = set6.sections.flatMap(section => section.questions).find(question => question.type === 'write' && question.taskNumber === 1)
assert.match(set6Task1.stimulus, /households.*Bellmere/i, 'Set 6: la consigna debe identificar hogares y la ciudad ficticia')
assert.match(set6Task1.stimulus, /2000.*2022/i, 'Set 6: la consigna debe coincidir con los años del gráfico')
assert.match(set6Task1.imageAlt, /Central.*North.*Riverside.*East.*South/i, 'Set 6: el texto alternativo debe enumerar los cinco distritos')

const { default: set7 } = await import('../src/data/mocks/ielts-set-7.ts')
const set7Task1 = set7.sections.flatMap(section => section.questions).find(question => question.type === 'write' && question.taskNumber === 1)
assert.match(set7Task1.stimulus, /household waste.*Alderwick.*Brenton/i, 'Set 7: la consigna debe identificar la medida y las dos ciudades ficticias')
assert.match(set7Task1.stimulus, /2025/i, 'Set 7: la consigna debe coincidir con el año del gráfico')
assert.match(set7Task1.imageAlt, /food.*paper and card.*plastic.*glass.*other/i, 'Set 7: el texto alternativo debe enumerar las cinco categorías')

const { default: set8 } = await import('../src/data/mocks/ielts-set-8.ts')
const set8Task1 = set8.sections.flatMap(section => section.questions).find(question => question.type === 'write' && question.taskNumber === 1)
assert.match(set8Task1.stimulus, /solar-panel.*home.*battery storage.*national grid/i, 'Set 8: la consigna debe describir el sistema y sus tres destinos')
assert.match(set8Task1.imageAlt, /direct current.*inverter.*alternating current/i, 'Set 8: el texto alternativo debe explicar la conversión DC a AC')

const { default: set9 } = await import('../src/data/mocks/ielts-set-9.ts')
const set9Task1 = set9.sections.flatMap(section => section.questions).find(question => question.type === 'write' && question.taskNumber === 1)
assert.match(set9Task1.stimulus, /five university subject areas.*2005.*2023/i, 'Set 9: la consigna debe coincidir con las cinco categorías y los dos años')
assert.match(set9Task1.stimulus, /in thousands/i, 'Set 9: la consigna debe declarar la unidad del gráfico')
assert.match(set9Task1.imageAlt, /Business and Management.*Computer Science.*Engineering.*Health Sciences.*Humanities/i, 'Set 9: el texto alternativo debe enumerar las cinco áreas')

console.log('✓ IELTS review blueprint: 20/20 sets, Writing, Speaking y prompt↔asset verificados')
