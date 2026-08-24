import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

import { ITALIAN_PRONOUN_QUEST } from '../src/data/practica/italian-pronoun-quest.ts'
import { PRONOUN_QUESTS } from '../src/data/practica/pronoun-quest-registry.ts'

test('cada idioma y cada familia recorren cinco decisiones y la cadena final', () => {
  assert.equal(PRONOUN_QUESTS.length, 8)
  for (const { config } of PRONOUN_QUESTS) {
    const levels = [config.recognition, config.functions, config.placement, config.repairs, config.transformations]
    for (const topic of config.topics) {
      for (const items of levels) assert.equal(items.filter((item) => item.topic === topic.id).length, 3)
      assert.equal(config.finalChallenge.gaps.filter((gap) => gap.topic === topic.id).length, 1)
    }
    assert.ok(config.finalChallenge.cards.length > config.finalChallenge.gaps.length)
  }
})

test('las reparaciones cambian una forma realmente incorrecta', () => {
  for (const { config } of PRONOUN_QUESTS) {
    for (const item of config.repairs) {
      const [wrong, right] = item.answer.split(' → ')
      assert.notEqual(wrong, right)
      assert.ok(item.context.includes(wrong))
    }
  }
})

test('cada nivel practica una decisión distinta', () => {
  for (const { config } of PRONOUN_QUESTS) {
    for (let index = 0; index < config.placement.length; index += 1) {
      assert.notDeepEqual(
        { context: config.placement[index].context, answer: config.placement[index].answer },
        { context: config.transformations[index].context, answer: config.transformations[index].answer },
      )
    }
  }
})

test('el motor no contiene entradas de texto libre', async () => {
  const source = await readFile(new URL('../src/components/practica/PronounQuestEngine.tsx', import.meta.url), 'utf8')
  assert.doesNotMatch(source, /<input\b/u)
  assert.doesNotMatch(source, /<textarea\b/u)
})

test('las regresiones lingüísticas sensibles permanecen explícitas', () => {
  const allAnswers = [...ITALIAN_PRONOUN_QUEST.recognition.map((item) => item.answer), ...ITALIAN_PRONOUN_QUEST.transformations.map((item) => item.answer)]
  for (const expected of ['Lei', 'mia', 'l’ho', 'quell’edificio', 'Le ho portate ieri.', 'glielo', 'ce le', 'me la']) assert.ok(allAnswers.includes(expected), `falta la regresión ${expected}`)
})

test('los mapas no fuerzan las mismas categorías en todos los idiomas', () => {
  const bySlug = new Map(PRONOUN_QUESTS.map((entry) => [entry.slug, entry.config.topics.map((topic) => topic.id)]))
  assert.ok(bySlug.get('japones').includes('address'))
  assert.ok(bySlug.get('japones').includes('kosoa_pronouns'))
  assert.ok(bySlug.get('coreano').includes('address'))
  assert.ok(bySlug.get('ruso').includes('prepositional_n'))
  assert.ok(bySlug.get('aleman').includes('dativ'))
  assert.ok(bySlug.get('frances').includes('y_en'))
})
