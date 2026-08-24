import { ENGLISH_TENSE_QUEST } from '../src/data/practica/english-tense-quest.ts'
import { ITALIAN_TENSE_QUEST } from '../src/data/practica/italian-tense-quest-config.ts'
import { FRENCH_STRUCTURE_QUEST } from '../src/data/practica/french-structure-quest.ts'
import { GERMAN_STRUCTURE_QUEST } from '../src/data/practica/german-structure-quest.ts'
import { JAPANESE_STRUCTURE_QUEST } from '../src/data/practica/japanese-structure-quest.ts'
import { KOREAN_STRUCTURE_QUEST } from '../src/data/practica/korean-structure-quest.ts'
import { PORTUGUESE_STRUCTURE_QUEST } from '../src/data/practica/portuguese-structure-quest.ts'
import { RUSSIAN_STRUCTURE_QUEST } from '../src/data/practica/russian-structure-quest.ts'

const failures = []

function assert(condition, message) {
  if (!condition) failures.push(message)
}

function countByForm(config, selector) {
  return new Map(config.forms.map((form) => [form.id, selector(form.id)]))
}

function checkUniqueIds(config) {
  const ids = [
    ...config.choiceChallenges.map((item) => item.id),
    ...config.microStories.map((item) => item.id),
    ...config.longStories.map((item) => item.id),
    ...config.errorChallenges.map((item) => item.id),
    ...config.timelineChallenges.map((item) => item.id),
    ...config.finalChallenges.map((item) => item.id),
  ]
  assert(new Set(ids).size === ids.length, `${config.id}: hay IDs de retos duplicados`)
}

function assertBalancedPositions(config) {
  const choicePositions = [0, 0, 0, 0]
  for (const challenge of config.choiceChallenges) {
    const position = challenge.options.indexOf(challenge.answer)
    if (position >= 0) choicePositions[position] += 1
  }
  assert(choicePositions.every((count) => count > 0), `${config.id}: la respuesta múltiple no usa las cuatro posiciones (${choicePositions.join('/')})`)
  assert(Math.max(...choicePositions) - Math.min(...choicePositions) <= 1, `${config.id}: distribución múltiple desequilibrada (${choicePositions.join('/')})`)

  const errorPositions = [0, 0, 0]
  for (const challenge of config.errorChallenges) {
    const position = challenge.chunks.findIndex((chunk) => chunk.id === challenge.wrongId)
    if (position >= 0 && position < errorPositions.length) errorPositions[position] += 1
  }
  assert(errorPositions.every((count) => count > 0), `${config.id}: el error no aparece en las tres posiciones (${errorPositions.join('/')})`)
  assert(Math.max(...errorPositions) - Math.min(...errorPositions) <= 1, `${config.id}: distribución de errores desequilibrada (${errorPositions.join('/')})`)
}

function validate(config, minimums) {
  const formIds = new Set(config.forms.map((form) => form.id))
  assert(formIds.size === config.forms.length, `${config.id}: hay IDs de forma duplicados`)
  assert(config.forms.every((form) => form.label.trim() && form.group.trim()), `${config.id}: hay formas sin etiqueta o grupo`)
  assert(config.copy.languageCode.trim(), `${config.id}: falta el código de idioma`)
  checkUniqueIds(config)
  assertBalancedPositions(config)
  assert(config.levels.length === 6, `${config.id}: debe declarar exactamente seis niveles`)

  for (const challenge of config.choiceChallenges) {
    assert(challenge.options.length === 4, `${challenge.id}: debe tener cuatro opciones`)
    assert(new Set(challenge.options).size === 4, `${challenge.id}: contiene opciones duplicadas`)
    assert(challenge.options.includes(challenge.answer), `${challenge.id}: la respuesta no aparece entre las opciones`)
    assert(challenge.context.split('___').length === 2, `${challenge.id}: debe contener exactamente un hueco`)
    assert(challenge.tenses.length > 0 && challenge.tenses.every((id) => formIds.has(id)), `${challenge.id}: referencia una forma inexistente`)
  }

  for (const challenge of [...config.microStories, ...config.longStories]) {
    assert(challenge.segments.length === challenge.gaps.length + 1, `${challenge.id}: segmentos y huecos no están alineados`)
    assert(new Set(challenge.gaps.map((gap) => gap.id)).size === challenge.gaps.length, `${challenge.id}: tiene IDs de hueco duplicados`)
    for (const gap of challenge.gaps) {
      assert(formIds.has(gap.tense), `${challenge.id}/${gap.id}: referencia una forma inexistente`)
      assert(gap.answers.length > 0 && gap.answers.every(Boolean), `${challenge.id}/${gap.id}: no tiene respuesta válida`)
    }
  }

  for (const challenge of config.errorChallenges) {
    const chunkIds = challenge.chunks.map((chunk) => chunk.id)
    assert(new Set(chunkIds).size === chunkIds.length, `${challenge.id}: tiene tokens duplicados`)
    assert(chunkIds.includes(challenge.wrongId), `${challenge.id}: el token erróneo no existe`)
    assert(formIds.has(challenge.tense), `${challenge.id}: referencia una forma inexistente`)
    assert(challenge.answers.length > 0 && challenge.answers.every(Boolean), `${challenge.id}: no tiene corrección válida`)
    const wrongForm = challenge.chunks.find((chunk) => chunk.id === challenge.wrongId)?.form
    assert(!challenge.answers.includes(wrongForm), `${challenge.id}: la forma marcada como errónea también figura como solución`)
  }

  for (const challenge of config.timelineChallenges) {
    assert(challenge.slots.length > 0, `${challenge.id}: no tiene posiciones temporales`)
    assert(challenge.options.length >= 2, `${challenge.id}: necesita al menos dos funciones plausibles`)
    assert(new Set(challenge.slots.map((slot) => slot.id)).size === challenge.slots.length, `${challenge.id}: tiene posiciones duplicadas`)
    assert(new Set(challenge.options).size === challenge.options.length, `${challenge.id}: contiene opciones repetidas`)
    for (const slot of challenge.slots) {
      assert(formIds.has(slot.tense), `${challenge.id}/${slot.id}: referencia una forma inexistente`)
      assert(challenge.options.includes(slot.answer), `${challenge.id}/${slot.id}: su respuesta no está entre las opciones`)
      assert(slot.hint.trim() !== slot.answer.trim(), `${challenge.id}/${slot.id}: la pista revela literalmente la respuesta`)
    }
  }

  for (const challenge of config.finalChallenges) {
    const cardIds = challenge.cards.map((card) => card.id)
    assert(challenge.segments.length === challenge.gaps.length + 1, `${challenge.id}: segmentos y huecos no están alineados`)
    assert(new Set(cardIds).size === cardIds.length, `${challenge.id}: tiene tarjetas con IDs duplicados`)
    assert(new Set(challenge.cards.map((card) => card.text)).size === challenge.cards.length, `${challenge.id}: tiene tarjetas con texto duplicado`)
    assert(challenge.cards.length === challenge.gaps.length, `${challenge.id}: el banco debe tener una tarjeta por hueco`)
    assert(new Set(challenge.gaps.map((gap) => gap.id)).size === challenge.gaps.length, `${challenge.id}: tiene huecos duplicados`)
    for (const gap of challenge.gaps) {
      assert(formIds.has(gap.tenseId), `${challenge.id}/${gap.id}: referencia una forma inexistente`)
      assert(cardIds.includes(gap.answerCardId), `${challenge.id}/${gap.id}: su tarjeta correcta no existe`)
    }
    assert(new Set(challenge.gaps.map((gap) => gap.answerCardId)).size === challenge.gaps.length, `${challenge.id}: una tarjeta correcta se reutiliza en varios huecos`)
  }

  const coverage = {
    choice: countByForm(config, (id) => config.choiceChallenges.filter((item) => item.tenses.includes(id)).length),
    micro: countByForm(config, (id) => config.microStories.filter((item) => item.gaps.some((gap) => gap.tense === id)).length),
    long: countByForm(config, (id) => config.longStories.filter((item) => item.gaps.some((gap) => gap.tense === id)).length),
    error: countByForm(config, (id) => config.errorChallenges.filter((item) => item.tense === id).length),
    timeline: countByForm(config, (id) => config.timelineChallenges.reduce((sum, item) => sum + item.slots.filter((slot) => slot.tense === id).length, 0)),
    final: countByForm(config, (id) => config.finalChallenges.reduce((sum, item) => sum + item.gaps.filter((gap) => gap.tenseId === id).length, 0)),
  }

  for (const form of config.forms) {
    for (const [kind, minimum] of Object.entries(minimums)) {
      const actual = coverage[kind].get(form.id) ?? 0
      assert(actual >= minimum, `${config.id}/${form.id}: cobertura ${kind} ${actual}/${minimum}`)
    }
  }
}

validate(ITALIAN_TENSE_QUEST, { choice: 1, micro: 1, long: 1, error: 1, timeline: 1, final: 1 })
validate(ENGLISH_TENSE_QUEST, { choice: 3, micro: 3, long: 2, error: 2, timeline: 3, final: 1 })

const GENERATED_CONFIGS = [
  FRENCH_STRUCTURE_QUEST,
  PORTUGUESE_STRUCTURE_QUEST,
  GERMAN_STRUCTURE_QUEST,
  RUSSIAN_STRUCTURE_QUEST,
  JAPANESE_STRUCTURE_QUEST,
  KOREAN_STRUCTURE_QUEST,
]

for (const config of GENERATED_CONFIGS) {
  validate(config, { choice: 3, micro: 3, long: 2, error: 2, timeline: 3, final: 1 })
}

const allConfigs = [ITALIAN_TENSE_QUEST, ENGLISH_TENSE_QUEST, ...GENERATED_CONFIGS]
assert(new Set(allConfigs.map((config) => config.storageKey)).size === allConfigs.length, 'los storageKey deben ser únicos por idioma')
assert(allConfigs.every((config) => /-v\d+$/.test(config.storageKey)), 'cada storageKey debe declarar una versión de esquema')

if (failures.length) {
  console.error(`Tense quest check failed (${failures.length})`)
  failures.forEach((failure) => console.error(`- ${failure}`))
  process.exit(1)
}

console.log('✓ Tense quests: estructura, respuestas y cobertura verificadas')
