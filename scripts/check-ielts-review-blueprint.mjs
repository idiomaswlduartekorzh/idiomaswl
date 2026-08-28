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

const { default: set10 } = await import('../src/data/mocks/ielts-set-10.ts')
const set10Task1 = set10.sections.flatMap(section => section.questions).find(question => question.type === 'write' && question.taskNumber === 1)
assert.match(set10Task1.stimulus, /unemployment rate.*percentage.*2008.*2022/i, 'Set 10: la consigna debe declarar medida, unidad y periodo')
assert.match(set10Task1.imageAlt, /Spain.*Germany.*Brazil.*2008.*2022/i, 'Set 10: el texto alternativo debe enumerar países y periodo')

const { default: set11 } = await import('../src/data/mocks/ielts-set-11.ts')
const set11Task1 = set11.sections.flatMap(section => section.questions).find(question => question.type === 'write' && question.taskNumber === 1)
assert.match(set11Task1.stimulus, /water consumption per capita.*litres.*2010.*2023/i, 'Set 11: la consigna debe declarar medida, unidad y años')
assert.match(set11Task1.imageAlt, /Los Angeles.*Singapore.*Cape Town.*Copenhagen/i, 'Set 11: el texto alternativo debe enumerar las cuatro ciudades')

const { default: set12 } = await import('../src/data/mocks/ielts-set-12.ts')
const set12Task1 = set12.sections.flatMap(section => section.questions).find(question => question.type === 'write' && question.taskNumber === 1)
assert.match(set12Task1.stimulus, /coastal monitoring station.*1980.*2022.*degrees Celsius.*1961–1990/i, 'Set 12: la consigna debe declarar alcance, periodo, unidad y línea base')
assert.match(set12Task1.imageAlt, /0\.05.*0\.91.*1961–1990 baseline/i, 'Set 12: el texto alternativo debe comunicar extremos y línea base')

const { default: set13 } = await import('../src/data/mocks/ielts-set-13.ts')
const set13Task1 = set13.sections.flatMap(section => section.questions).find(question => question.type === 'write' && question.taskNumber === 1)
assert.match(set13Task1.stimulus, /international tourist arrivals.*millions.*five world regions.*2010.*2023/i, 'Set 13: la consigna debe declarar medida, unidad, alcance y años')
assert.match(set13Task1.imageAlt, /Europe.*Asia and the Pacific.*Americas.*Middle East.*Africa/i, 'Set 13: el texto alternativo debe enumerar las cinco regiones')

const { default: set14 } = await import('../src/data/mocks/ielts-set-14.ts')
const set14Task1 = set14.sections.flatMap(section => section.questions).find(question => question.type === 'write' && question.taskNumber === 1)
assert.match(set14Task1.stimulus, /simplified process.*municipal plant.*sludge.*two possible destinations/i, 'Set 14: la consigna debe delimitar proceso, planta, subproducto y salidas')
assert.match(set14Task1.imageAlt, /screening.*primary settling.*biological treatment.*disinfection.*reuse or discharge.*sludge.*biogas/i, 'Set 14: el texto alternativo debe comunicar etapas, destinos y rama de lodos')

const { default: set15 } = await import('../src/data/mocks/ielts-set-15.ts')
const set15Task1 = set15.sections.flatMap(section => section.questions).find(question => question.type === 'write' && question.taskNumber === 1)
assert.match(set15Task1.stimulus, /percentage shares.*total domestic electricity generation.*United Kingdom.*Australia.*2022/i, 'Set 15: la consigna debe declarar medida, alcance, países y año')
assert.match(set15Task1.imageAlt, /United Kingdom.*38\.5%.*28\.9%.*14\.6%.*12\.8%.*5\.2%.*Australia.*47%.*32%.*19%.*2%/i, 'Set 15: el texto alternativo debe comunicar todas las categorías y valores')

const { default: set16 } = await import('../src/data/mocks/ielts-set-16.ts')
const set16Task1 = set16.sections.flatMap(section => section.questions).find(question => question.type === 'write' && question.taskNumber === 1)
assert.match(set16Task1.stimulus, /global installed renewable power capacity.*gigawatts.*four technology groups.*2015.*2022/i, 'Set 16: la consigna debe declarar alcance, medida, grupos y años')
assert.match(set16Task1.imageAlt, /hydropower.*wind.*solar.*other technologies.*2015.*2022/i, 'Set 16: el texto alternativo debe comunicar tecnologías y años')

const { default: set17 } = await import('../src/data/mocks/ielts-set-17.ts')
const set17Task1 = set17.sections.flatMap(section => section.questions).find(question => question.type === 'write' && question.taskNumber === 1)
assert.match(set17Task1.stimulus, /life expectancy at birth.*years.*five World Bank regions.*1990.*2022/i, 'Set 17: la consigna debe declarar medida, unidad, alcance regional y años')
assert.match(set17Task1.imageAlt, /East Asia.*68\.3.*76\.7.*Europe.*72\.2.*77\.8.*Latin America.*67\.5.*74\.6.*North America.*75\.4.*77\.8.*Sub-Saharan Africa.*50\.0.*61\.9/i, 'Set 17: el texto alternativo debe comunicar todas las regiones y valores')

const { default: set18 } = await import('../src/data/mocks/ielts-set-18.ts')
const set18Task1 = set18.sections.flatMap(section => section.questions).find(question => question.type === 'write' && question.taskNumber === 1)
assert.match(set18Task1.stimulus, /stages involved.*recycling of plastic waste.*initial collection.*manufacture of new products/i, 'Set 18: la consigna debe delimitar material, inicio, proceso y salida')
assert.match(set18Task1.imageAlt, /collection.*sorting by resin type.*shredding and washing.*melting and extrusion.*pellets.*purity testing.*manufacture.*new products.*contaminated.*landfill/i, 'Set 18: el texto alternativo debe comunicar la secuencia y la salida de contaminantes')

console.log('✓ IELTS review blueprint: 20/20 sets, Writing, Speaking y prompt↔asset verificados')
