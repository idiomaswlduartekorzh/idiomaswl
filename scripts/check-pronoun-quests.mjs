import { PRONOUN_QUESTS } from '../src/data/practica/pronoun-quest-registry.ts'

const failures = []
const assert = (condition, message) => { if (!condition) failures.push(message) }
assert(PRONOUN_QUESTS.length === 8, 'el catálogo debe publicar los ocho idiomas de la plataforma')
assert(new Set(PRONOUN_QUESTS.map((entry) => entry.slug)).size === PRONOUN_QUESTS.length, 'hay slugs de idioma duplicados')
assert(new Set(PRONOUN_QUESTS.map((entry) => entry.config.storageKey)).size === PRONOUN_QUESTS.length, 'hay storageKey compartidas entre idiomas')

for (const { slug, config } of PRONOUN_QUESTS) {
  const prefix = `${slug}: `
  const topicIds = new Set(config.topics.map((topic) => topic.id))
  const levels = [config.recognition, config.functions, config.placement, config.repairs, config.transformations]
  assert(config.levels.length === 6, `${prefix}debe declarar exactamente seis niveles`)
  assert(config.topics.length >= 7, `${prefix}debe cubrir al menos siete familias pertinentes`)
  assert(topicIds.size === config.topics.length, `${prefix}hay IDs de familia duplicados`)
  assert(/-v\d+$/.test(config.storageKey), `${prefix}storageKey debe terminar en versión`)
  assert(config.title.trim() && config.reviewLinks.length >= 2, `${prefix}faltan título o enlaces de repaso`)
  assert(config.presets.every((preset) => preset.ids.length && preset.ids.every((id) => topicIds.has(id))), `${prefix}hay presets vacíos o con familias inexistentes`)

  for (const [levelIndex, items] of levels.entries()) {
    assert(new Set(items.map((item) => item.id)).size === items.length, `${prefix}nivel ${levelIndex + 1}: IDs duplicados`)
    for (const topic of config.topics) assert(items.filter((item) => item.topic === topic.id).length === 3, `${prefix}nivel ${levelIndex + 1}/${topic.id}: requiere tres contextos`)
    for (const item of items) {
      assert(topicIds.has(item.topic), `${prefix}${item.id}: familia inexistente`)
      assert(item.options.length === 4, `${prefix}${item.id}: debe tener cuatro opciones`)
      assert(new Set(item.options).size === 4, `${prefix}${item.id}: opciones duplicadas`)
      assert(item.options.includes(item.answer), `${prefix}${item.id}: la respuesta no aparece en las opciones`)
      assert(item.prompt.trim() && item.context.trim() && item.explanation.trim(), `${prefix}${item.id}: contenido editorial incompleto`)
    }
  }

  for (const item of config.recognition) {
    const [before, after, extra] = item.context.split('___')
    assert(typeof extra === 'undefined' && before !== undefined && after !== undefined, `${prefix}${item.id}: debe tener exactamente un hueco contextual`)
    if (!['ja', 'ko'].includes(config.languageCode)) assert(!/[A-Za-zÀ-ÖØ-öø-ÿ]$/u.test(before ?? '') && !/^[A-Za-zÀ-ÖØ-öø-ÿ]/u.test(after ?? ''), `${prefix}${item.id}: el hueco no puede dejar fragmentos fijos pegados`)
    assert(!/[’'-]$/u.test(item.answer), `${prefix}${item.id}: la respuesta no puede terminar en un fragmento elidido o ligado`)
  }
  for (const item of config.functions) assert(!item.prompt.toLocaleLowerCase(config.languageCode).includes(item.answer.toLocaleLowerCase(config.languageCode)), `${prefix}${item.id}: la pregunta revela su respuesta funcional`)
  for (let index = 0; index < config.placement.length; index += 1) {
    const placement = config.placement[index]
    const transformation = config.transformations[index]
    assert(placement.context !== transformation.context || placement.answer !== transformation.answer, `${prefix}${placement.id}: duplica exactamente el nivel de transformación`)
  }

  const choicePositions = [0, 0, 0, 0]
  for (const item of config.recognition) choicePositions[item.options.indexOf(item.answer)] += 1
  assert(choicePositions.every((count) => count > 0), `${prefix}la respuesta no usa las cuatro posiciones (${choicePositions.join('/')})`)
  assert(Math.max(...choicePositions) - Math.min(...choicePositions) <= 1, `${prefix}distribución desequilibrada (${choicePositions.join('/')})`)

  const final = config.finalChallenge
  assert(final.segments.length === final.gaps.length + 1, `${prefix}final: segmentos y huecos desalineados`)
  assert(final.gaps.length === config.topics.length, `${prefix}final: falta una familia`)
  assert(final.cards.length > final.gaps.length, `${prefix}final: el banco debe conservar distractores al practicar todas las familias`)
  assert(new Set(final.cards.map((card) => card.id)).size === final.cards.length, `${prefix}final: IDs de tarjeta duplicados`)
  assert(new Set(final.cards.map((card) => card.text)).size === final.cards.length, `${prefix}final: textos de tarjeta duplicados`)
  for (const gap of final.gaps) {
    assert(topicIds.has(gap.topic), `${prefix}${gap.id}: familia inexistente`)
    assert(final.cards.some((card) => card.id === gap.answerCardId), `${prefix}${gap.id}: tarjeta correcta inexistente`)
  }
}

if (failures.length) {
  console.error(`Pronoun quest check failed (${failures.length})`)
  failures.forEach((failure) => console.error(`- ${failure}`))
  process.exit(1)
}

console.log('✓ Pronoun quests: estructura, cobertura y bancos cerrados verificados')
