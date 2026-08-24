import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

import { ITALIAN_PRONOUN_QUEST } from '../src/data/practica/italian-pronoun-quest.ts'

test('cada familia recorre cinco decisiones y la cadena final', () => {
  const config = ITALIAN_PRONOUN_QUEST
  const levels = [config.recognition, config.functions, config.placement, config.repairs, config.transformations]
  for (const topic of config.topics) {
    for (const items of levels) assert.equal(items.filter((item) => item.topic === topic.id).length, 3)
    assert.equal(config.finalChallenge.gaps.filter((gap) => gap.topic === topic.id).length, 1)
  }
  assert.ok(config.finalChallenge.cards.length > config.finalChallenge.gaps.length)
})

test('las reparaciones cambian una forma realmente incorrecta', () => {
  for (const item of ITALIAN_PRONOUN_QUEST.repairs) {
    const [wrong, right] = item.answer.split(' → ')
    assert.notEqual(wrong, right)
    assert.ok(item.context.includes(wrong))
  }
})

test('el motor no contiene entradas de texto libre', async () => {
  const source = await readFile(new URL('../src/components/practica/PronounQuestEngine.tsx', import.meta.url), 'utf8')
  assert.doesNotMatch(source, /<input\b/u)
  assert.doesNotMatch(source, /<textarea\b/u)
})

test('las regresiones lingüísticas sensibles permanecen explícitas', () => {
  const allAnswers = [...ITALIAN_PRONOUN_QUEST.recognition.map((item) => item.answer), ...ITALIAN_PRONOUN_QUEST.transformations.map((item) => item.answer)]
  for (const expected of ['Lei', 'mia', 'l’', 'Le ho portate ieri.', 'glielo', 'ce le', 'me la']) assert.ok(allAnswers.includes(expected), `falta la regresión ${expected}`)
})
