import { ITALIAN_PRONOUN_QUEST } from '../src/data/practica/italian-pronoun-quest.ts'

const failures = []
const assert = (condition, message) => { if (!condition) failures.push(message) }
const config = ITALIAN_PRONOUN_QUEST
const topicIds = new Set(config.topics.map((topic) => topic.id))
const levels = [config.recognition, config.functions, config.placement, config.repairs, config.transformations]

assert(config.levels.length === 6, 'debe declarar exactamente seis niveles')
assert(config.topics.length === 7, 'el piloto italiano debe cubrir siete familias')
assert(topicIds.size === config.topics.length, 'hay IDs de familia duplicados')
assert(/-v\d+$/.test(config.storageKey), 'storageKey debe terminar en versión')
assert(config.presets.every((preset) => preset.ids.length && preset.ids.every((id) => topicIds.has(id))), 'hay presets vacíos o con familias inexistentes')

for (const [levelIndex, items] of levels.entries()) {
  assert(new Set(items.map((item) => item.id)).size === items.length, `nivel ${levelIndex + 1}: IDs duplicados`)
  for (const topic of config.topics) assert(items.filter((item) => item.topic === topic.id).length === 3, `nivel ${levelIndex + 1}/${topic.id}: requiere tres contextos`)
  for (const item of items) {
    assert(topicIds.has(item.topic), `${item.id}: familia inexistente`)
    assert(item.options.length === 4, `${item.id}: debe tener cuatro opciones`)
    assert(new Set(item.options).size === 4, `${item.id}: opciones duplicadas`)
    assert(item.options.includes(item.answer), `${item.id}: la respuesta no aparece en las opciones`)
    assert(item.prompt.trim() && item.context.trim() && item.explanation.trim(), `${item.id}: contenido editorial incompleto`)
  }
}

for (const item of config.recognition) assert(item.context.split('___').length === 2, `${item.id}: debe tener exactamente un hueco contextual`)
for (const item of config.functions) assert(!item.prompt.toLocaleLowerCase('it').includes(item.answer.toLocaleLowerCase('it')), `${item.id}: la pregunta revela su respuesta funcional`)

const choicePositions = [0, 0, 0, 0]
for (const item of config.recognition) choicePositions[item.options.indexOf(item.answer)] += 1
assert(choicePositions.every((count) => count > 0), `la respuesta no usa las cuatro posiciones (${choicePositions.join('/')})`)
assert(Math.max(...choicePositions) - Math.min(...choicePositions) <= 1, `distribución desequilibrada (${choicePositions.join('/')})`)

const final = config.finalChallenge
assert(final.segments.length === final.gaps.length + 1, 'final: segmentos y huecos desalineados')
assert(final.gaps.length === config.topics.length, 'final: falta una familia')
assert(final.cards.length > final.gaps.length, 'final: el banco debe conservar distractores al practicar todas las familias')
assert(new Set(final.cards.map((card) => card.id)).size === final.cards.length, 'final: IDs de tarjeta duplicados')
assert(new Set(final.cards.map((card) => card.text)).size === final.cards.length, 'final: textos de tarjeta duplicados')
for (const gap of final.gaps) {
  assert(topicIds.has(gap.topic), `${gap.id}: familia inexistente`)
  assert(final.cards.some((card) => card.id === gap.answerCardId), `${gap.id}: tarjeta correcta inexistente`)
}

if (failures.length) {
  console.error(`Pronoun quest check failed (${failures.length})`)
  failures.forEach((failure) => console.error(`- ${failure}`))
  process.exit(1)
}

console.log('✓ Pronoun quests: estructura, cobertura y bancos cerrados verificados')
