import assert from 'node:assert/strict'
import mock from '../src/data/mocks/ielts-set-1.ts'
import { IELTS_SET_1_ANSWER_TEMPLATE } from '../src/data/mocks/ielts-set-1-answer-template.ts'
import { scoreIeltsObjectiveAnswers } from '../src/lib/ielts/mock-scoring.ts'

const expectedNumbers = Array.from({ length: 40 }, (_, index) => index + 1)

for (const skill of ['listening', 'reading']) {
  const entries = IELTS_SET_1_ANSWER_TEMPLATE[skill]
  assert.deepEqual(entries.map(entry => entry.number), expectedNumbers, `${skill}: la plantilla debe cubrir Q1-Q40 en orden`)
  assert.equal(new Set(entries.map(entry => entry.number)).size, 40, `${skill}: no puede haber preguntas duplicadas`)
  assert.ok(entries.every(entry => entry.accepted.length > 0 && entry.accepted.every(Boolean)), `${skill}: todas las respuestas deben ser explícitas`)
}

function answerFor(skill, number) {
  return IELTS_SET_1_ANSWER_TEMPLATE[skill].find(entry => entry.number === number)
}

const response = { fills: {}, mcq: {}, ms: {}, match: {} }
const seen = { listening: new Set(), reading: new Set() }

for (const section of mock.sections.filter(section => section.skill === 'listening' || section.skill === 'reading')) {
  const skill = section.skill
  for (const question of section.questions) {
    if (question.type === 'formgroup') {
      for (const blank of question.blanks) {
        const canonical = answerFor(skill, blank.num)
        assert.equal(canonical.kind, 'text', `${skill} Q${blank.num}: se esperaba respuesta de texto`)
        assert.deepEqual(blank.answers, [...canonical.accepted], `${skill} Q${blank.num}: mock y plantilla no coinciden`)
        response.fills[`${question.id}__${blank.num}`] = canonical.display
        seen[skill].add(blank.num)
      }
    } else if (question.type === 'tablegroup') {
      for (const row of question.rows) for (const cell of row) {
        if (typeof cell === 'string') continue
        const canonical = answerFor(skill, cell.num)
        assert.equal(canonical.kind, 'text', `${skill} Q${cell.num}: se esperaba respuesta de texto`)
        assert.deepEqual(cell.answers, [...canonical.accepted], `${skill} Q${cell.num}: mock y plantilla no coinciden`)
        response.fills[`${question.id}__${cell.num}`] = canonical.display
        seen[skill].add(cell.num)
      }
    } else if (question.type === 'multiselect') {
      const numbers = Array.from({ length: question.qRange[1] - question.qRange[0] + 1 }, (_, offset) => question.qRange[0] + offset)
      const canonical = numbers.map(number => answerFor(skill, number).display)
      assert.deepEqual(question.answers, canonical, `${skill} Q${question.qRange.join('-')}: mock y plantilla no coinciden`)
      response.ms[question.id] = [...canonical]
      numbers.forEach(number => seen[skill].add(number))
    } else if (question.type === 'matching') {
      for (const item of question.items) {
        const canonical = answerFor(skill, item.num)
        assert.equal(item.answer, canonical.display, `${skill} Q${item.num}: mock y plantilla no coinciden`)
        response.match[`${question.id}__${item.num}`] = canonical.display
        seen[skill].add(item.num)
      }
    } else if (question.type === 'mcq' || question.type === 'dialog') {
      const number = Number(question.id.match(/q(\d+)$/i)?.[1])
      const canonical = answerFor(skill, number)
      assert.equal(String.fromCharCode(65 + question.answer), canonical.display, `${skill} Q${number}: mock y plantilla no coinciden`)
      response.mcq[question.id] = question.answer
      seen[skill].add(number)
    }
  }
}

for (const skill of ['listening', 'reading']) {
  assert.deepEqual([...seen[skill]].sort((a, b) => a - b), expectedNumbers, `${skill}: el mock debe presentar Q1-Q40 sin saltos`)
}

const perfect = scoreIeltsObjectiveAnswers(mock, response)
assert.deepEqual(perfect.listening, { correct: 40, total: 40, band: 9 })
assert.deepEqual(perfect.reading, { correct: 40, total: 40, band: 9 })

const partial = structuredClone(response)
partial.ms['l2-multi'] = ['A', 'B']
const partialScore = scoreIeltsObjectiveAnswers(mock, partial)
assert.equal(partialScore.listening.correct, 39, 'una opción correcta de selección doble debe conservar un punto')

const overSelected = structuredClone(response)
overSelected.ms['l2-multi'] = ['A', 'B', 'C']
const overSelectedScore = scoreIeltsObjectiveAnswers(mock, overSelected)
assert.equal(overSelectedScore.listening.correct, 38, 'seleccionar más opciones de las permitidas no debe otorgar puntos')

const readingSections = mock.sections.filter(section => section.skill === 'reading')
const readingText = JSON.stringify(readingSections)
for (const required of ['Novalak', 'fillers', 'hexa', 'pressure', 'problem solving', 'evaluating information', 'Principia']) {
  assert.ok(readingText.includes(required), `Reading: falta la formulación canónica ${required}`)
}

console.log('✓ IELTS Set 1: plantilla canónica, Q1-Q40, mock y scoring verificados')
