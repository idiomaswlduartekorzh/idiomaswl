#!/usr/bin/env node

import { ENGLISH_TENSE_QUEST } from '../src/data/practica/english-tense-quest-config.ts'
import { FRENCH_STRUCTURE_QUEST } from '../src/data/practica/french-structure-quest-config.ts'
import { GERMAN_STRUCTURE_QUEST } from '../src/data/practica/german-structure-quest-config.ts'
import { ITALIAN_TENSE_QUEST } from '../src/data/practica/italian-tense-quest-config.ts'
import { JAPANESE_STRUCTURE_QUEST } from '../src/data/practica/japanese-structure-quest-config.ts'
import { KOREAN_STRUCTURE_QUEST } from '../src/data/practica/korean-structure-quest-config.ts'
import { PORTUGUESE_STRUCTURE_QUEST } from '../src/data/practica/portuguese-structure-quest-config.ts'
import { RUSSIAN_STRUCTURE_QUEST } from '../src/data/practica/russian-structure-quest-config.ts'
import { tokenizeSentence } from '../src/data/practica/sentence-production.ts'

const configs = [
  ['italian', ITALIAN_TENSE_QUEST],
  ['english', ENGLISH_TENSE_QUEST],
  ['french', FRENCH_STRUCTURE_QUEST],
  ['portuguese', PORTUGUESE_STRUCTURE_QUEST],
  ['german', GERMAN_STRUCTURE_QUEST],
  ['russian', RUSSIAN_STRUCTURE_QUEST],
  ['japanese', JAPANESE_STRUCTURE_QUEST],
  ['korean', KOREAN_STRUCTURE_QUEST],
]

const failures = []
const fail = (condition, message) => { if (!condition) failures.push(message) }
const sameOrder = (left, right) => left.length === right.length && left.every((value, index) => value === right[index])
const sameMultiset = (left, right) => (
  [...left].sort((a, b) => a.localeCompare(b)).join('\u0000')
  === [...right].sort((a, b) => a.localeCompare(b)).join('\u0000')
)
const maximumRun = (values) => values.reduce((state, value) => ({
  current: value === state.previous ? state.current + 1 : 1,
  maximum: Math.max(state.maximum, value === state.previous ? state.current + 1 : 1),
  previous: value,
}), { current: 0, maximum: 0, previous: undefined }).maximum

let reviewed = 0
for (const [language, config] of configs) {
  for (const form of config.forms) {
    if (config.separationChallenges?.length) {
      const challenges = config.separationChallenges.filter((challenge) => challenge.tense === form.id)
      fail(challenges.length === 10, `${language}/${form.id}: nivel 5 tiene ${challenges.length}/10 retos`)
      fail(new Set(challenges.map((challenge) => challenge.separation)).size === 2, `${language}/${form.id}: no contrasta separables e inseparables`)
      fail(maximumRun(challenges.map((challenge) => challenge.separation)) <= 2, `${language}/${form.id}: agrupa demasiadas clasificaciones iguales`)
      for (const challenge of challenges) {
        fail(challenge.answers.some((answer) => tokenizeSentence(answer).length >= 3), `${challenge.id}: la oración completa es demasiado corta`)
        fail(challenge.answers.every((answer) => answer !== challenge.prompt), `${challenge.id}: el esqueleto ya muestra la respuesta`)
        reviewed += 1
      }
      continue
    }

    const challenges = config.timelineChallenges.filter((challenge) => challenge.slots.some((slot) => slot.tense === form.id))
    fail(challenges.length === 10, `${language}/${form.id}: nivel 5 tiene ${challenges.length}/10 retos`)
    const answers = []
    let twoTokenItems = 0
    for (const challenge of challenges) {
      for (const slot of challenge.slots.filter((candidate) => candidate.tense === form.id)) {
        const production = slot.production
        fail(Boolean(production), `${challenge.id}: falta el contrato de producción escrita`)
        if (!production) continue
        const answer = production.answers[0]
        const sourceTokens = tokenizeSentence(answer)
        const minimum = language === 'russian' || language === 'korean' ? 2 : 3
        fail(production.tokens.length >= minimum, `${challenge.id}: solo ofrece ${production.tokens.length} elementos lingüísticos`)
        fail(Boolean(production.verb), `${challenge.id}: deja visible la forma conjugada objetivo`)
        fail(language === 'english' || production.answers[0] === slot.answer, `${challenge.id}: la producción no corresponde al evento objetivo`)
        fail(!production.tokens.includes('/'), `${challenge.id}: presenta dos lemas como si ambos fueran piezas obligatorias`)
        if (production.verb) {
          const lemmaTokens = tokenizeSentence(production.verb)
          fail(
            production.tokens.includes(production.verb) || lemmaTokens.every((token) => production.tokens.includes(token)),
            `${challenge.id}: el banco omite el verbo base`,
          )
        } else {
          fail(sameMultiset(production.tokens, sourceTokens), `${challenge.id}: el banco pierde o duplica elementos`)
          fail(answer.trim().length >= 8, `${challenge.id}: la respuesta completa es demasiado corta`)
        }
        fail(!sameOrder(production.tokens, sourceTokens), `${challenge.id}: el banco aparece en el orden resuelto`)
        answers.push(answer.normalize('NFKC').toLocaleLowerCase(config.copy.languageCode))
        if (sourceTokens.length === 2 && !production.verb) twoTokenItems += 1
        reviewed += 1
      }
    }
    fail(new Set(answers).size === answers.length, `${language}/${form.id}: repite respuestas dentro del nivel 5`)
    fail(twoTokenItems <= 2, `${language}/${form.id}: ${twoTokenItems}/10 retos solo reordenan dos elementos`)
    if (language === 'english' && (form.id === 'past-perfect' || form.id === 'past-perfect-continuous')) {
      fail(answers.every((answer) => /\b(before|when|by the time)\b/u.test(answer)), `${language}/${form.id}: falta un punto de referencia pasado explícito`)
    }
    if (language === 'english' && form.id === 'future-perfect-continuous') {
      fail(answers.every((answer) => /^by\b/u.test(answer)), `${language}/${form.id}: falta un límite futuro explícito`)
    }
  }
}

if (failures.length) {
  console.error(`Harness de usuario promedio: FAIL (${failures.length})`)
  failures.forEach((failure) => console.error(`- ${failure}`))
  process.exit(1)
}

console.log(`✓ Harness de usuario promedio: ${reviewed} retos del nivel 5 revisados en 92 formas y 8 idiomas`)
