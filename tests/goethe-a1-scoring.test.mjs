import test from 'node:test'
import assert from 'node:assert/strict'
import { completeGoetheScore, scaleGoetheRaw, scoreGoetheAutomatic } from '../src/lib/goethe/scoring.ts'

const objective = (prefix, part) => Array.from({ length: 15 }, (_, index) => ({
  type: 'mcq', id: `${prefix}${index + 1}`, part, text: `Aufgabe ${index + 1}`, options: ['A', 'B', 'C'], answer: index % 3,
}))
const mock = {
  id: 'a1-1', examSlug: 'goethe', title: 'Fixture', timeMinutes: 80,
  sections: [
    { part: 1, skill: 'listening', title: 'Hören', instructions: '', questions: objective('h', 1) },
    { part: 4, skill: 'reading', title: 'Lesen', instructions: '', questions: objective('l', 4) },
    { part: 7, skill: 'writing', title: 'Schreiben', instructions: '', questions: [{ type: 'formgroup', id: 's1', part: 7, qRange: [1, 5], groupLabel: '', title: '', template: '', blanks: [
      { num: 1, answers: ['27'] }, { num: 2, answers: ['Köln'] }, { num: 3, answers: ['01574089231'] }, { num: 4, answers: ['14. Oktober'] }, { num: 5, answers: ['bar'] },
    ] }] },
  ],
}

test('Goethe A1 converts the 60-point raw scale to 100 and passes at 60', () => {
  assert.equal(scaleGoetheRaw(60), 100)
  assert.equal(scaleGoetheRaw(36), 60)
  assert.equal(completeGoetheScore({ listeningCorrect: 15, readingCorrect: 15, formCorrect: 5, automaticRaw: 35, automaticScaled: 58 }, 10, 15).totalScore, 100)
  assert.equal(completeGoetheScore({ listeningCorrect: 10, readingCorrect: 10, formCorrect: 1, automaticRaw: 21, automaticScaled: 35 }, 7, 8).passed, true)
})

test('automatic score ignores client claims and uses the frozen answer key', () => {
  const answers = Object.fromEntries(mock.sections.flatMap(section => section.questions).flatMap(question => question.type === 'mcq' ? [[question.id, question.answer]] : []))
  const formValues = { '1': '27', '2': 'Köln', '3': '01574089231', '4': '14. Oktober', '5': 'bar' }
  assert.deepEqual(scoreGoetheAutomatic(mock, answers, formValues), {
    listeningCorrect: 15,
    readingCorrect: 15,
    formCorrect: 5,
    automaticRaw: 35,
    automaticScaled: 58,
  })
})
