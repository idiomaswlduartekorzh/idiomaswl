import { ENGLISH_TENSE_QUEST } from '../src/data/practica/english-tense-quest-config.ts'
import { EDITORIAL_ITALIAN_FORMS, ITALIAN_TENSE_QUEST } from '../src/data/practica/italian-tense-quest-config.ts'
import { ITALIAN_DRILL_SERIES } from '../src/data/practica/italian-tense-intensive-bank.ts'
import { FRENCH_STRUCTURE_QUEST } from '../src/data/practica/french-structure-quest-config.ts'
import { FRENCH_PRESENT_EDITORIAL } from '../src/data/practica/french-present-editorial.ts'
import { FRENCH_PASSE_COMPOSE_EDITORIAL } from '../src/data/practica/french-passe-compose-editorial.ts'
import { FRENCH_IMPARFAIT_EDITORIAL } from '../src/data/practica/french-imparfait-editorial.ts'
import { FRENCH_PLUS_QUE_PARFAIT_EDITORIAL } from '../src/data/practica/french-plus-que-parfait-editorial.ts'
import { FRENCH_PASSE_SIMPLE_EDITORIAL } from '../src/data/practica/french-passe-simple-editorial.ts'
import { FRENCH_FUTUR_PROCHE_EDITORIAL } from '../src/data/practica/french-futur-proche-editorial.ts'
import { FRENCH_FUTUR_SIMPLE_EDITORIAL } from '../src/data/practica/french-futur-simple-editorial.ts'
import { FRENCH_FUTUR_ANTERIEUR_EDITORIAL } from '../src/data/practica/french-futur-anterieur-editorial.ts'
import { FRENCH_CONDITIONNEL_PRESENT_EDITORIAL } from '../src/data/practica/french-conditionnel-present-editorial.ts'
import { FRENCH_CONDITIONNEL_PASSE_EDITORIAL } from '../src/data/practica/french-conditionnel-passe-editorial.ts'
import { GERMAN_EDITORIAL_PACKS, GERMAN_STRUCTURE_QUEST } from '../src/data/practica/german-structure-quest-config.ts'
import { JAPANESE_EDITORIAL_PACKS, JAPANESE_STRUCTURE_QUEST } from '../src/data/practica/japanese-structure-quest-config.ts'
import { KOREAN_EDITORIAL_PACKS, KOREAN_STRUCTURE_QUEST } from '../src/data/practica/korean-structure-quest-config.ts'
import { PORTUGUESE_STRUCTURE_QUEST } from '../src/data/practica/portuguese-structure-quest-config.ts'
import { PORTUGUESE_PRESENT_EDITORIAL } from '../src/data/practica/portuguese-present-editorial.ts'
import { PORTUGUESE_PROGRESSIVE_EDITORIAL } from '../src/data/practica/portuguese-progressive-editorial.ts'
import { PORTUGUESE_PRETERITE_PERFECT_EDITORIAL } from '../src/data/practica/portuguese-preterite-perfect-editorial.ts'
import { PORTUGUESE_PRETERITE_IMPERFECT_EDITORIAL } from '../src/data/practica/portuguese-preterite-imperfect-editorial.ts'
import { PORTUGUESE_PLUPERFECT_EDITORIAL } from '../src/data/practica/portuguese-pluperfect-editorial.ts'
import { PORTUGUESE_NEAR_FUTURE_EDITORIAL } from '../src/data/practica/portuguese-near-future-editorial.ts'
import { PORTUGUESE_FORMAL_FUTURE_EDITORIAL } from '../src/data/practica/portuguese-formal-future-editorial.ts'
import { PORTUGUESE_FUTURE_PERFECT_EDITORIAL } from '../src/data/practica/portuguese-future-perfect-editorial.ts'
import { PORTUGUESE_FUTURE_IN_PAST_EDITORIAL } from '../src/data/practica/portuguese-future-in-past-editorial.ts'
import { PORTUGUESE_PAST_CONDITIONAL_EDITORIAL } from '../src/data/practica/portuguese-past-conditional-editorial.ts'
import { RUSSIAN_EDITORIAL_PACKS, RUSSIAN_STRUCTURE_QUEST } from '../src/data/practica/russian-structure-quest-config.ts'

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
    const usesCandidateSets = challenge.gaps.some((gap) => gap.candidateCardIds?.length)
    if (!usesCandidateSets) {
      assert(new Set(challenge.cards.map((card) => card.text)).size === challenge.cards.length, `${challenge.id}: tiene tarjetas con texto duplicado`)
      assert(challenge.cards.length === challenge.gaps.length, `${challenge.id}: el banco debe tener una tarjeta por hueco`)
    }
    assert(new Set(challenge.gaps.map((gap) => gap.id)).size === challenge.gaps.length, `${challenge.id}: tiene huecos duplicados`)
    for (const gap of challenge.gaps) {
      assert(formIds.has(gap.tenseId), `${challenge.id}/${gap.id}: referencia una forma inexistente`)
      assert(cardIds.includes(gap.answerCardId), `${challenge.id}/${gap.id}: su tarjeta correcta no existe`)
      if (gap.candidateCardIds) {
        assert(gap.candidateCardIds.length >= 4, `${challenge.id}/${gap.id}: necesita al menos tres distractores plausibles`)
        assert(gap.candidateCardIds.includes(gap.answerCardId), `${challenge.id}/${gap.id}: sus candidatos excluyen la respuesta`)
        assert(gap.candidateCardIds.every((id) => cardIds.includes(id)), `${challenge.id}/${gap.id}: referencia candidatos inexistentes`)
        assert(Boolean(gap.standalone?.before.trim() || gap.standalone?.after.trim()), `${challenge.id}/${gap.id}: necesita contexto autónomo`)
      }
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

function assertItalianInferability() {
  const hiddenLexicalTokens = /\b(?:appena|già|ancora|mai|sempre)\b/iu
  for (const series of ITALIAN_DRILL_SERIES) {
    for (const [index, drill] of series.drills.entries()) {
      assert(
        !hiddenLexicalTokens.test(drill.answer),
        `italian/${series.id}/${index + 1}: la respuesta exige un adverbio léxico que no pertenece a la conjugación («${drill.answer}»)` ,
      )
    }
  }

  const finire = ITALIAN_TENSE_QUEST.microStories.find((item) => item.id === 'it-pp-micro-editorial-5')
  assert(finire?.gaps[0].answers.includes('ha finito'), 'italian/passato-prossimo: «ha finito» debe aceptarse sin exigir «appena»')

  for (const challenge of [...ITALIAN_TENSE_QUEST.microStories, ...ITALIAN_TENSE_QUEST.longStories]) {
    for (const gap of challenge.gaps) {
      for (const answer of gap.answers) {
        assert(!hiddenLexicalTokens.test(answer), `${challenge.id}/${gap.id}: la respuesta escrita esconde un adverbio léxico («${answer}»)`)
      }
    }
  }
}

function assertItalianEditorialContract() {
  assert(EDITORIAL_ITALIAN_FORMS.size === ITALIAN_TENSE_QUEST.forms.length, 'italian: las 13 formas deben estar declaradas editoriales')
  assert(ITALIAN_TENSE_QUEST.forms.every((form) => EDITORIAL_ITALIAN_FORMS.has(form.id)), 'italian: ninguna forma puede conservar bancos generados')
  for (const formId of EDITORIAL_ITALIAN_FORMS) {
    const micro = ITALIAN_TENSE_QUEST.microStories.filter((item) => item.gaps.some((gap) => gap.tense === formId))
    const long = ITALIAN_TENSE_QUEST.longStories.filter((item) => item.gaps.some((gap) => gap.tense === formId))
    const errors = ITALIAN_TENSE_QUEST.errorChallenges.filter((item) => item.tense === formId)
    const timelines = ITALIAN_TENSE_QUEST.timelineChallenges.filter((item) => item.slots.some((slot) => slot.tense === formId))
    for (const item of [...micro, ...long, ...errors, ...timelines]) {
      assert(item.id.includes('-editorial-'), `${item.id}: una forma declarada editorial no puede usar un reto generado`)
    }
    assert(long.every((item) => !item.segments.join('').includes(' · ')), `${formId}: los relatos no pueden pegar escenas con «·»`)
    assert(long.every((item) => item.gaps.length >= 3), `${formId}: cada relato largo debe integrar al menos tres decisiones conectadas`)
    assert(errors.every((item) => item.chunks.length === 3), `${formId}: cada edición debe ofrecer tres verbos dentro de un mismo contexto`)
    assert(timelines.every((item) => item.options.length === 3), `${formId}: cada secuencia debe contrastar tres eventos plausibles`)

    const fingerprints = [...micro, ...long].map((item) => item.segments.join('___').toLocaleLowerCase('it'))
    assert(new Set(fingerprints).size === fingerprints.length, `${formId}: hay textos repetidos entre niveles escritos`)
  }

  const remotePluperfectLong = ITALIAN_TENSE_QUEST.longStories.filter((item) => item.gaps.some((gap) => gap.tense === 'trapassato-remoto'))
  for (const item of remotePluperfectLong) {
    const anchors = item.segments.join(' ').match(/\b(?:dopo che|quando|non appena|appena)\b/giu) ?? []
    assert(anchors.length >= item.gaps.length, `${item.id}: cada trapassato remoto necesita una subordinada temporal propia`)
  }
  const remotePluperfectTimelines = ITALIAN_TENSE_QUEST.timelineChallenges.filter((item) => item.slots.some((slot) => slot.tense === 'trapassato-remoto'))
  for (const item of remotePluperfectTimelines) {
    assert(item.options.every((option) => /\b(?:dopo che|quando|non appena|appena)\b/iu.test(option) && option.includes(',')), `${item.id}: cada opción debe unir anterioridad y consecuencia narrativa`)
  }
  const remotePluperfectErrors = ITALIAN_TENSE_QUEST.errorChallenges.filter((item) => item.tense === 'trapassato-remoto')
  for (const item of remotePluperfectErrors) {
    const text = `${item.chunks.map((chunk) => chunk.before).join(' ')} ${item.after}`
    const anchors = text.match(/\b(?:dopo che|quando|non appena|appena)\b/giu) ?? []
    assert(anchors.length >= item.chunks.length, `${item.id}: cada forma editable necesita una subordinada temporal propia`)
  }

  const futureAnchor = /\b(?:entro|prima|quando|dopo che|appena|a quest[’']ora)\b/giu
  const futurePerfectLong = ITALIAN_TENSE_QUEST.longStories.filter((item) => item.gaps.some((gap) => gap.tense === 'futuro-anteriore'))
  for (const item of futurePerfectLong) {
    const anchors = item.segments.join(' ').match(futureAnchor) ?? []
    assert(anchors.length >= item.gaps.length, `${item.id}: cada futuro anteriore necesita un límite o punto futuro explícito`)
  }
  const futurePerfectErrors = ITALIAN_TENSE_QUEST.errorChallenges.filter((item) => item.tense === 'futuro-anteriore')
  for (const item of futurePerfectErrors) {
    const text = `${item.chunks.map((chunk) => chunk.before).join(' ')} ${item.after}`
    const anchors = text.match(futureAnchor) ?? []
    assert(anchors.length >= item.chunks.length, `${item.id}: cada forma editable necesita su propio límite futuro`)
  }
  const futurePerfectTimelines = ITALIAN_TENSE_QUEST.timelineChallenges.filter((item) => item.slots.some((slot) => slot.tense === 'futuro-anteriore'))
  for (const item of futurePerfectTimelines) {
    assert(item.options.every((option) => /\b(?:entro|prima|quando|dopo che|appena|a quest[’']ora)\b/iu.test(option) && option.includes(',')), `${item.id}: cada opción debe relacionar dos puntos futuros`)
  }

  const negativeTu = ITALIAN_TENSE_QUEST.microStories.find((item) => item.id === 'it-imperative-micro-editorial-4')
  assert(negativeTu?.segments[0].trim().endsWith('Non') && negativeTu.gaps[0].answers.includes('premere'), 'imperativo: non + tu debe aceptar el infinitivo')
  const formalLei = ITALIAN_TENSE_QUEST.microStories.find((item) => item.id === 'it-imperative-micro-editorial-3')
  assert(formalLei?.gaps[0].answers.includes('attenda'), 'imperativo: la forma di cortesia Lei debe conservar attenda')

  const finalContextsByForm = new Map(ITALIAN_TENSE_QUEST.forms.map((form) => [form.id, []]))
  for (const challenge of ITALIAN_TENSE_QUEST.finalChallenges) {
    for (const gap of challenge.gaps) finalContextsByForm.get(gap.tenseId)?.push(`${gap.standalone?.before ?? ''}___${gap.standalone?.after ?? ''}`)
  }
  for (const form of ITALIAN_TENSE_QUEST.forms) {
    const choiceContexts = new Set(ITALIAN_TENSE_QUEST.choiceChallenges.filter((item) => item.tenses.includes(form.id)).map((item) => item.context.toLocaleLowerCase('it')))
    const finalContexts = finalContextsByForm.get(form.id) ?? []
    assert(finalContexts.length === 10, `${form.id}: el dossier final necesita diez escenas editoriales`)
    assert(new Set(finalContexts).size === finalContexts.length, `${form.id}: el dossier final repite escenas`)
    assert(finalContexts.every((context) => !choiceContexts.has(context.toLocaleLowerCase('it'))), `${form.id}: el dossier final reutiliza una frase del nivel 1`)
  }

  const answerPatterns = new Map([
    ['presente-progressivo', /^(?:sto|stai|sta|stiamo|state|stanno) \S+(?:ando|endo)$/iu],
    ['passato-prossimo', /^(?:(?:mi|ti|si|ci|vi) )?(?:ho|hai|ha|abbiamo|avete|hanno|sono|siamo|siete|è) \S+(?: \S+)?$/iu],
    ['imperfetto', /^(?:ero|eri|era|eravamo|eravate|erano|(?:(?:mi|ti|si|ci|vi) )?\S+(?:vo|vi|va|vamo|vate|vano))$/iu],
    ['imperfetto-progressivo', /^(?:stavo|stavi|stava|stavamo|stavate|stavano) \S+(?:ando|endo)$/iu],
    ['trapassato-prossimo', /^(?:(?:mi|ti|si|ci|vi) )?(?:avevo|avevi|aveva|avevamo|avevate|avevano|ero|eri|era|eravamo|eravate|erano) \S+(?: \S+)?$/iu],
    ['trapassato-remoto', /^(?:(?:mi|ti|si|ci|vi) )?(?:ebbi|avesti|ebbe|avemmo|aveste|ebbero|fui|fosti|fu|fummo|foste|furono) \S+(?: \S+)?$/iu],
    ['futuro-semplice', /^\S+(?:rò|rai|rà|remo|rete|ranno)$/iu],
    ['futuro-anteriore', /^(?:(?:mi|ti|si|ci|vi) )?(?:avrò|avrai|avrà|avremo|avrete|avranno|sarò|sarai|sarà|saremo|sarete|saranno) \S+(?: \S+)?$/iu],
    ['condizionale-presente', /^\S+(?:rei|resti|rebbe|remmo|reste|rebbero)$/iu],
    ['condizionale-passato', /^(?:(?:mi|ti|si|ci|vi) )?(?:avrei|avresti|avrebbe|avremmo|avreste|avrebbero|sarei|saresti|sarebbe|saremmo|sareste|sarebbero) \S+(?: \S+)?$/iu],
  ])
  const writtenByTense = new Map(ITALIAN_TENSE_QUEST.forms.map((form) => [form.id, []]))
  for (const challenge of [...ITALIAN_TENSE_QUEST.microStories, ...ITALIAN_TENSE_QUEST.longStories]) {
    for (const gap of challenge.gaps) writtenByTense.get(gap.tense)?.push(...gap.answers)
  }
  for (const challenge of ITALIAN_TENSE_QUEST.errorChallenges) writtenByTense.get(challenge.tense)?.push(...challenge.answers)
  for (const [tenseId, pattern] of answerPatterns) {
    for (const answer of writtenByTense.get(tenseId) ?? []) assert(pattern.test(answer), `${tenseId}: «${answer}» no tiene la morfología esperada`)
  }
}

validate(ITALIAN_TENSE_QUEST, { choice: 10, micro: 10, long: 10, error: 10, timeline: 10, final: 10 })
assertItalianInferability()
assertItalianEditorialContract()
validate(ENGLISH_TENSE_QUEST, { choice: 10, micro: 10, long: 10, error: 10, timeline: 10, final: 10 })

const ENGLISH_EDITORIAL_FORMS = ['present-simple', 'present-continuous', 'present-perfect', 'present-perfect-continuous', 'past-simple', 'past-continuous', 'past-perfect', 'past-perfect-continuous', 'future-will', 'future-going-to', 'future-continuous', 'future-perfect', 'future-perfect-continuous', 'conditional-zero', 'conditional-first', 'conditional-second', 'conditional-third', 'conditional-mixed', 'imperative']
for (const formId of ENGLISH_EDITORIAL_FORMS) {
  const choice = ENGLISH_TENSE_QUEST.choiceChallenges.filter((item) => item.tenses.includes(formId))
  const micro = ENGLISH_TENSE_QUEST.microStories.filter((item) => item.gaps.some((gap) => gap.tense === formId))
  const long = ENGLISH_TENSE_QUEST.longStories.filter((item) => item.gaps.some((gap) => gap.tense === formId))
  const errors = ENGLISH_TENSE_QUEST.errorChallenges.filter((item) => item.tense === formId)
  const timelines = ENGLISH_TENSE_QUEST.timelineChallenges.filter((item) => item.slots.some((slot) => slot.tense === formId))
  const final = ENGLISH_TENSE_QUEST.finalChallenges.flatMap((item) => item.gaps.filter((gap) => gap.tenseId === formId))
  for (const [kind, items] of Object.entries({ choice, micro, long, errors, timelines, final })) {
    assert(items.length === 10, `english/${formId}: el banco editorial ${kind} debe contener 10 ejercicios, no ${items.length}`)
  }
  for (const item of [...choice, ...micro, ...long, ...errors, ...timelines]) {
    assert(item.id.includes('editorial'), `english/${formId}: sobrevivió contenido generado (${item.id})`)
  }
  for (const item of long) {
    assert(item.gaps.length === 3, `${item.id}: el relato editorial debe tener tres huecos conectados`)
    assert(!item.segments.join('').includes(' · '), `${item.id}: el relato conserva un separador de frases pegadas`)
  }
  for (const item of errors) assert(item.chunks.length === 3, `${item.id}: el laboratorio editorial debe mostrar tres verbos`)
  for (const gap of final) {
    assert(gap.candidateCardIds?.length === 4, `${gap.id}: el dossier final necesita cuatro candidatos cerrados`)
    assert(Boolean(gap.standalone?.before.trim() || gap.standalone?.after.trim()), `${gap.id}: el dossier final necesita contexto autónomo completo`)
  }
}

for (const formId of ['past-perfect', 'past-perfect-continuous']) {
  const written = [
    ...ENGLISH_TENSE_QUEST.microStories.filter((item) => item.gaps.some((gap) => gap.tense === formId)).map((item) => item.segments.join(' ')),
    ...ENGLISH_TENSE_QUEST.longStories.filter((item) => item.gaps.some((gap) => gap.tense === formId)).map((item) => item.segments.join(' ')),
    ...ENGLISH_TENSE_QUEST.errorChallenges.filter((item) => item.tense === formId).map((item) => `${item.chunks.map((chunk) => chunk.before).join(' ')} ${item.after}`),
    ...ENGLISH_TENSE_QUEST.finalChallenges.flatMap((item) => item.gaps.filter((gap) => gap.tenseId === formId).map((gap) => `${gap.standalone?.before ?? ''} ${gap.standalone?.after ?? ''}`)),
  ]
  for (const context of written) {
    assert(/\b(?:before|when|after|because|since|for|by|so|at midnight|at the)\b/i.test(context), `english/${formId}: falta un segundo punto pasado o una duración explícita («${context}»)`)
  }
}

const ENGLISH_FUTURE_ANCHORS = new Map([
  ['future-continuous', /\b(?:at|when|while|during|around|throughout|this time|this afternoon|after lunch|next week)\b/i],
  ['future-perfect', /\b(?:by|before|when|at the end)\b/i],
  ['future-perfect-continuous', /\b(?:by|when|at|next|for|since)\b/i],
])
for (const [formId, anchor] of ENGLISH_FUTURE_ANCHORS) {
  const written = [
    ...ENGLISH_TENSE_QUEST.microStories.filter((item) => item.gaps.some((gap) => gap.tense === formId)).map((item) => item.segments.join(' ')),
    ...ENGLISH_TENSE_QUEST.longStories.filter((item) => item.gaps.some((gap) => gap.tense === formId)).map((item) => item.segments.join(' ')),
    ...ENGLISH_TENSE_QUEST.errorChallenges.filter((item) => item.tense === formId).map((item) => `${item.chunks.map((chunk) => chunk.before).join(' ')} ${item.after}`),
    ...ENGLISH_TENSE_QUEST.finalChallenges.flatMap((item) => item.gaps.filter((gap) => gap.tenseId === formId).map((gap) => `${gap.standalone?.before ?? ''} ${gap.standalone?.after ?? ''}`)),
  ]
  for (const context of written) assert(anchor.test(context), `english/${formId}: falta el punto futuro o la duración explícita («${context}»)`)
}

function englishWrittenAnswers(formId) {
  return [
    ...ENGLISH_TENSE_QUEST.microStories.flatMap((item) => item.gaps.filter((gap) => gap.tense === formId).flatMap((gap) => gap.answers)),
    ...ENGLISH_TENSE_QUEST.longStories.flatMap((item) => item.gaps.filter((gap) => gap.tense === formId).flatMap((gap) => gap.answers)),
    ...ENGLISH_TENSE_QUEST.errorChallenges.filter((item) => item.tense === formId).flatMap((item) => item.answers),
  ]
}

for (const answer of englishWrittenAnswers('conditional-zero')) assert(!/\b(?:will|would)\b/i.test(answer), `english/conditional-zero: «${answer}» introduce futuro o hipótesis en una regla general`)
for (const answer of englishWrittenAnswers('conditional-first')) assert(!/\bwould\b/i.test(answer), `english/conditional-first: «${answer}» convierte una posibilidad real en hipótesis`)
for (const answer of englishWrittenAnswers('conditional-second')) assert(!/\bwill\b/i.test(answer), `english/conditional-second: «${answer}» usa will dentro de una hipótesis irreal`)
for (const answer of englishWrittenAnswers('conditional-third')) assert(/^(?:had(?: not|n't)?|would(?: not|n't)? have)\b/i.test(answer), `english/conditional-third: «${answer}» no conserva la estructura contrafactual pasada`)
for (const answer of englishWrittenAnswers('conditional-mixed')) assert(/^would(?: not|n't)? (?:have )?\S+/i.test(answer), `english/conditional-mixed: «${answer}» no expresa el resultado cruzado esperado`)

const mixedContexts = [
  ...ENGLISH_TENSE_QUEST.microStories.filter((item) => item.gaps.some((gap) => gap.tense === 'conditional-mixed')).map((item) => item.segments.join(' ')),
  ...ENGLISH_TENSE_QUEST.longStories.filter((item) => item.gaps.some((gap) => gap.tense === 'conditional-mixed')).map((item) => item.segments.join(' ')),
  ...ENGLISH_TENSE_QUEST.errorChallenges.filter((item) => item.tense === 'conditional-mixed').map((item) => `${item.chunks.map((chunk) => chunk.before).join(' ')} ${item.after}`),
  ...ENGLISH_TENSE_QUEST.finalChallenges.flatMap((item) => item.gaps.filter((gap) => gap.tenseId === 'conditional-mixed').map((gap) => `${gap.standalone?.before ?? ''} ${gap.standalone?.after ?? ''}`)),
]
for (const context of mixedContexts) assert(/\b(?:now|today|yesterday|last|in 20\d\d|spring|summer|March)\b/i.test(context), `english/conditional-mixed: falta un marcador que haga visible el cruce temporal («${context}»)`)

const FRENCH_EDITORIAL_PACKS = [
  ['present', FRENCH_PRESENT_EDITORIAL],
  ['passe-compose', FRENCH_PASSE_COMPOSE_EDITORIAL],
  ['imparfait', FRENCH_IMPARFAIT_EDITORIAL],
  ['plus-que-parfait', FRENCH_PLUS_QUE_PARFAIT_EDITORIAL],
  ['passe-simple', FRENCH_PASSE_SIMPLE_EDITORIAL],
  ['futur-proche', FRENCH_FUTUR_PROCHE_EDITORIAL],
  ['futur-simple', FRENCH_FUTUR_SIMPLE_EDITORIAL],
  ['futur-anterieur', FRENCH_FUTUR_ANTERIEUR_EDITORIAL],
  ['conditionnel-present', FRENCH_CONDITIONNEL_PRESENT_EDITORIAL],
  ['conditionnel-passe', FRENCH_CONDITIONNEL_PASSE_EDITORIAL],
]
for (const [formId, pack] of FRENCH_EDITORIAL_PACKS) {
  assert(pack.choices.length === 10, `french/${formId}: se requieren 10 decisiones editoriales`)
  assert(pack.micro.length === 10, `french/${formId}: se requieren 10 microtextos editoriales`)
  assert(pack.long.length === 10 && pack.long.every((item) => item.gaps.length === 3), `french/${formId}: se requieren 10 relatos conectados de tres huecos`)
  assert(pack.errors.length === 10 && pack.errors.every((item) => item.chunks.length === 3), `french/${formId}: se requieren 10 textos de reparación de tres verbos`)
  assert(pack.timelines.length === 10, `french/${formId}: se requieren 10 secuencias semánticas`)
  assert(pack.finalGaps.length === 10 && pack.finalGaps.every((gap) => gap.candidateCardIds?.length === 4 && (gap.standalone?.before.trim() || gap.standalone?.after.trim())), `french/${formId}: se requieren 10 decisiones finales autónomas con cuatro candidatos`)
  for (const item of [...pack.choices, ...pack.micro, ...pack.long, ...pack.errors, ...pack.timelines]) assert(item.id.includes('editorial'), `${item.id}: sobrevivió contenido francés heredado`)
}

const frenchPlusPastContexts = [
  ...FRENCH_PLUS_QUE_PARFAIT_EDITORIAL.micro.map((item) => item.segments.join(' ')),
  ...FRENCH_PLUS_QUE_PARFAIT_EDITORIAL.long.map((item) => item.segments.join(' ')),
  ...FRENCH_PLUS_QUE_PARFAIT_EDITORIAL.errors.map((item) => `${item.title} ${item.chunks.map((chunk) => chunk.before).join(' ')} ${item.after}`),
  ...FRENCH_PLUS_QUE_PARFAIT_EDITORIAL.finalGaps.map((gap) => `${gap.standalone?.before ?? ''} ${gap.standalone?.after ?? ''}`),
]
for (const context of frenchPlusPastContexts) assert(/(?:quand|lorsque|avant|après|parce que|car|la veille|plus tôt|à (?:l’|notre )arrivée|au début|depuis|sommes partis|ne pouvait|était|préparatifs)/i.test(context), `french/plus-que-parfait: falta un segundo plano pasado explícito («${context}»)`)

for (const item of [...FRENCH_PASSE_SIMPLE_EDITORIAL.choices, ...FRENCH_PASSE_SIMPLE_EDITORIAL.micro, ...FRENCH_PASSE_SIMPLE_EDITORIAL.long, ...FRENCH_PASSE_SIMPLE_EDITORIAL.errors, ...FRENCH_PASSE_SIMPLE_EDITORIAL.timelines]) {
  assert(/littéraire/i.test(`${item.focus} ${item.explanation}`), `${item.id}: el passé simple debe declarar su registro literario`)
}
for (const gap of FRENCH_PASSE_SIMPLE_EDITORIAL.finalGaps) assert(/littéraire/i.test(gap.tense), `${gap.id}: el dossier final debe marcar el passé simple como literario`)

const frenchFuturePerfectContexts = [
  ...FRENCH_FUTUR_ANTERIEUR_EDITORIAL.micro.map((item) => item.segments.join(' ')),
  ...FRENCH_FUTUR_ANTERIEUR_EDITORIAL.long.map((item) => item.segments.join(' ')),
  ...FRENCH_FUTUR_ANTERIEUR_EDITORIAL.errors.map((item) => `${item.title} ${item.chunks.map((chunk) => chunk.before).join(' ')} ${item.after}`),
  ...FRENCH_FUTUR_ANTERIEUR_EDITORIAL.finalGaps.map((gap) => `${gap.standalone?.before ?? ''} ${gap.standalone?.after ?? ''}`),
]
for (const context of frenchFuturePerfectContexts) assert(/(?:d’ici|quand|lorsque|avant|à (?:la fin|midi|minuit|dix-huit heures|vingt heures)|en juin|en septembre|2030)/i.test(context), `french/futur-anterieur: falta una échéance o un segundo punto futuro («${context}»)`)

const PORTUGUESE_EDITORIAL_PACKS = [
  ['presente', PORTUGUESE_PRESENT_EDITORIAL],
  ['progressivo', PORTUGUESE_PROGRESSIVE_EDITORIAL],
  ['preterito-perfeito', PORTUGUESE_PRETERITE_PERFECT_EDITORIAL],
  ['preterito-imperfeito', PORTUGUESE_PRETERITE_IMPERFECT_EDITORIAL],
  ['mais-que-perfeito', PORTUGUESE_PLUPERFECT_EDITORIAL],
  ['futuro-proximo', PORTUGUESE_NEAR_FUTURE_EDITORIAL],
  ['futuro-presente', PORTUGUESE_FORMAL_FUTURE_EDITORIAL],
  ['futuro-composto', PORTUGUESE_FUTURE_PERFECT_EDITORIAL],
  ['futuro-preterito', PORTUGUESE_FUTURE_IN_PAST_EDITORIAL],
  ['condicional-passado', PORTUGUESE_PAST_CONDITIONAL_EDITORIAL],
]
for (const [formId, pack] of PORTUGUESE_EDITORIAL_PACKS) {
  assert(pack.choices.length === 10 && pack.micro.length === 10, `portuguese/${formId}: se requieren 10 decisiones y 10 microtextos`)
  assert(pack.long.length === 10 && pack.long.every((item) => item.gaps.length === 3), `portuguese/${formId}: se requieren 10 relatos conectados de tres huecos`)
  assert(pack.errors.length === 10 && pack.errors.every((item) => item.chunks.length === 3), `portuguese/${formId}: se requieren 10 reparaciones de tres verbos`)
  assert(pack.timelines.length === 10, `portuguese/${formId}: se requieren 10 secuencias semánticas`)
  assert(pack.finalGaps.length === 10 && pack.finalGaps.every((gap) => gap.candidateCardIds?.length === 4 && (gap.standalone?.before.trim() || gap.standalone?.after.trim())), `portuguese/${formId}: se requieren 10 decisiones finales autónomas`)
  for (const item of [...pack.choices, ...pack.micro, ...pack.long, ...pack.errors, ...pack.timelines]) assert(item.id.includes('editorial'), `${item.id}: sobrevivió contenido portugués heredado`)
}

const portuguesePluperfectContexts = [
  ...PORTUGUESE_PLUPERFECT_EDITORIAL.micro.map((item) => item.segments.join(' ')),
  ...PORTUGUESE_PLUPERFECT_EDITORIAL.long.map((item) => item.segments.join(' ')),
  ...PORTUGUESE_PLUPERFECT_EDITORIAL.errors.map((item) => `${item.title} ${item.chunks.map((chunk) => chunk.before).join(' ')} ${item.after}`),
  ...PORTUGUESE_PLUPERFECT_EDITORIAL.finalGaps.map((gap) => `${gap.standalone?.before ?? ''} ${gap.standalone?.after ?? ''}`),
]
for (const context of portuguesePluperfectContexts) assert(/(?:quando|antes|porque|na véspera|dois anos antes|depois|começo|chegamos|viajamos|conseguimos)/i.test(context), `portuguese/mais-que-perfeito: falta outro marco passado explícito («${context}»)`)

for (const item of [...PORTUGUESE_FORMAL_FUTURE_EDITORIAL.choices, ...PORTUGUESE_FORMAL_FUTURE_EDITORIAL.micro, ...PORTUGUESE_FORMAL_FUTURE_EDITORIAL.long, ...PORTUGUESE_FORMAL_FUTURE_EDITORIAL.errors, ...PORTUGUESE_FORMAL_FUTURE_EDITORIAL.timelines]) assert(/formal/i.test(`${item.focus} ${item.explanation}`), `${item.id}: el futuro sintético brasileño debe declarar su registro`)

const portugueseFuturePerfectContexts = [
  ...PORTUGUESE_FUTURE_PERFECT_EDITORIAL.micro.map((item) => item.segments.join(' ')),
  ...PORTUGUESE_FUTURE_PERFECT_EDITORIAL.long.map((item) => item.segments.join(' ')),
  ...PORTUGUESE_FUTURE_PERFECT_EDITORIAL.errors.map((item) => `${item.title} ${item.chunks.map((chunk) => chunk.before).join(' ')} ${item.after}`),
  ...PORTUGUESE_FUTURE_PERFECT_EDITORIAL.finalGaps.map((gap) => `${gap.standalone?.before ?? ''} ${gap.standalone?.after ?? ''}`),
]
for (const context of portugueseFuturePerfectContexts) assert(/(?:até|quando|antes|à meia-noite|ao meio-dia|às seis|às oito|ao fim)/i.test(context), `portuguese/futuro-composto: falta prazo ou segundo ponto futuro («${context}»)`)

const portuguesePastConditionalContexts = [
  ...PORTUGUESE_PAST_CONDITIONAL_EDITORIAL.micro.map((item) => item.segments.join(' ')),
  ...PORTUGUESE_PAST_CONDITIONAL_EDITORIAL.long.map((item) => item.segments.join(' ')),
  ...PORTUGUESE_PAST_CONDITIONAL_EDITORIAL.errors.map((item) => `${item.title} ${item.chunks.map((chunk) => chunk.before).join(' ')} ${item.after}`),
  ...PORTUGUESE_PAST_CONDITIONAL_EDITORIAL.finalGaps.map((gap) => `${gap.standalone?.before ?? ''} ${gap.standalone?.after ?? ''}`),
]
for (const context of portuguesePastConditionalContexts) assert(/(?:com|sem|se |mas |não |cancelad|negad|recusad|adiad|fechad|prazo curto|impedid|perdid|faltou)/i.test(context), `portuguese/condicional-passado: falta condición o resultado real explícito («${context}»)`)

const GENERATED_CONFIGS = []

for (const config of GENERATED_CONFIGS) {
  validate(config, { choice: 3, micro: 3, long: 2, error: 2, timeline: 3, final: 1 })
}

validate(FRENCH_STRUCTURE_QUEST, { choice: 10, micro: 10, long: 10, error: 10, timeline: 10, final: 10 })
validate(PORTUGUESE_STRUCTURE_QUEST, { choice: 10, micro: 10, long: 10, error: 10, timeline: 10, final: 10 })
validate(GERMAN_STRUCTURE_QUEST, { choice: 10, micro: 10, long: 10, error: 10, timeline: 10, final: 10 })
validate(RUSSIAN_STRUCTURE_QUEST, { choice: 10, micro: 10, long: 10, error: 10, timeline: 10, final: 10 })
validate(JAPANESE_STRUCTURE_QUEST, { choice: 10, micro: 10, long: 10, error: 10, timeline: 10, final: 10 })
validate(KOREAN_STRUCTURE_QUEST, { choice: 10, micro: 10, long: 10, error: 10, timeline: 10, final: 10 })

for (const [index, pack] of GERMAN_EDITORIAL_PACKS.entries()) {
  const formId = GERMAN_STRUCTURE_QUEST.forms[index].id
  assert(pack.choices.length === 10 && pack.micro.length === 10, `german/${formId}: se requieren 10 decisiones y 10 microtextos`)
  assert(pack.long.length === 10 && pack.long.every((item) => item.gaps.length === 3), `german/${formId}: se requieren 10 relatos conectados de tres huecos`)
  assert(pack.errors.length === 10 && pack.errors.every((item) => item.chunks.length === 3), `german/${formId}: se requieren 10 reparaciones de tres verbos`)
  assert(pack.timelines.length === 10 && pack.finalGaps.length === 10, `german/${formId}: faltan secuencias o decisiones finales`)
  for (const item of [...pack.choices, ...pack.micro, ...pack.long, ...pack.errors, ...pack.timelines]) assert(item.id.includes('editorial'), `${item.id}: sobrevivió contenido alemán heredado`)
}

const germanPresentParadigms = [
  ['wohne', 'wohnst', 'wohnt', 'wohnen'], ['lerne', 'lernst', 'lernt', 'lernen'],
  ['trinke', 'trinkst', 'trinkt', 'trinken'], ['koche', 'kochst', 'kocht', 'kochen'],
  ['spiele', 'spielst', 'spielt', 'spielen'], ['lese', 'liest', 'lest', 'lesen'],
  ['stehe', 'stehst', 'steht', 'stehen'], ['mache', 'machst', 'macht', 'machen'],
  ['kaufe', 'kaufst', 'kauft', 'kaufen'], ['fahre', 'fährst', 'fährt', 'fahren'],
]
const germanPresentPack = GERMAN_EDITORIAL_PACKS[0]
for (const [index, item] of germanPresentPack.choices.entries()) {
  const expected = germanPresentParadigms[index]
  assert(expected?.length === 4 && item.options.every((option) => expected.includes(option)), `${item.id}: las cuatro opciones deben ser conjugaciones del mismo verbo en Präsens`)
}
const germanPresentChoices = new Set(germanPresentPack.choices.map((item) => item.context.replace('___', '').toLocaleLowerCase('de')))
for (const item of germanPresentPack.micro) assert(!germanPresentChoices.has(item.segments.join('').toLocaleLowerCase('de')), `${item.id}: el nivel 2 no puede reciclar la escena del nivel 1`)
const germanSeparableParticles = new Map([['aufstehen', 'auf'], ['anrufen', 'an'], ['fernsehen', 'fern'], ['mitbringen', 'mit']])
for (const item of germanPresentPack.micro) {
  const gap = item.gaps[0]
  const particle = germanSeparableParticles.get(gap.verb)
  if (!particle) continue
  assert(new RegExp(`\\b${particle}\\.`, 'iu').test(item.segments[1]), `${item.id}: la partícula separable debe permanecer visible al final`)
  assert(gap.answers.every((answer) => !answer.split(/\s+/u).includes(particle)), `${item.id}: la respuesta no puede duplicar la partícula separable`)
}

const germanWrittenAnswers = (pack) => [...pack.micro, ...pack.long].flatMap((item) => item.gaps.flatMap((gap) => gap.answers))
const germanCompositePatterns = [
  [1, /\b(?:habe|hast|hat|haben|habt)$/i], [2, /\b(?:bin|bist|ist|sind|seid)$/i],
  [4, /\b(?:hatte|hattest|hatten|hattet|war|warst|waren|wart)$/i], [5, /\b(?:werde|wirst|wird|werden|werdet)$/i],
  [6, /\b(?:werde|wirst|wird|werden|werdet)$/i], [7, /\b(?:würde|würdest|würden|würdet)$/i],
  [8, /\b(?:hätte|hättest|hätten|hättet|wäre|wärst|wären|wärt)$/i],
]
for (const [index, pattern] of germanCompositePatterns) for (const answer of germanWrittenAnswers(GERMAN_EDITORIAL_PACKS[index])) assert(pattern.test(answer), `german/${GERMAN_STRUCTURE_QUEST.forms[index].id}: la respuesta no contiene la unidad verbal completa («${answer}»)`)

const germanFutureTwoContexts = [
  ...GERMAN_EDITORIAL_PACKS[6].micro.map((item) => item.segments.join(' ')),
  ...GERMAN_EDITORIAL_PACKS[6].long.map((item) => item.segments.join(' ')),
  ...GERMAN_EDITORIAL_PACKS[6].finalGaps.map((gap) => `${gap.standalone?.before ?? ''} ${gap.standalone?.after ?? ''}`),
]
for (const context of germanFutureTwoContexts) assert(/(?:bis|wenn|bevor|um |bei tagesanbruch|am 31\.|am freitag|vor sonnenuntergang|vor der|vor dem)/i.test(context), `german/futur-zwei: falta plazo o segundo punto futuro («${context}»)`)

const germanImperativeContexts = [
  ...GERMAN_EDITORIAL_PACKS[9].micro.map((item) => item.segments.join(' ')),
  ...GERMAN_EDITORIAL_PACKS[9].long.map((item) => item.segments.join(' ')),
  ...GERMAN_EDITORIAL_PACKS[9].finalGaps.map((gap) => `${gap.standalone?.before ?? ''} ${gap.standalone?.after ?? ''}`),
]
for (const context of germanImperativeContexts) assert(/(?:Paul|Frau|Herr|Kinder|Spieler|Nora|Lea|Amir|Gäste|Ihr|Mara und Tom|Meine Damen)/i.test(context), `german/imperativ: falta destinatario visible («${context}»)`)

for (const [index, pack] of RUSSIAN_EDITORIAL_PACKS.entries()) {
  const formId = RUSSIAN_STRUCTURE_QUEST.forms[index].id
  assert(pack.choices.length === 10 && pack.micro.length === 10, `russian/${formId}: se requieren 10 decisiones y 10 microtextos`)
  assert(pack.long.length === 10 && pack.long.every((item) => item.gaps.length === 3), `russian/${formId}: se requieren 10 relatos conectados de tres huecos`)
  assert(pack.errors.length === 10 && pack.errors.every((item) => item.chunks.length === 3), `russian/${formId}: se requieren 10 reparaciones de tres verbos`)
  assert(pack.timelines.length === 10 && pack.finalGaps.length === 10, `russian/${formId}: faltan secuencias o decisiones finales`)
  for (const item of [...pack.choices, ...pack.micro, ...pack.long, ...pack.errors, ...pack.timelines]) assert(item.id.includes('editorial'), `${item.id}: sobrevivió contenido ruso heredado`)
}

const russianContexts = (pack) => [
  ...pack.micro.map((item) => item.segments.join(' ')), ...pack.long.map((item) => item.segments.join(' ')),
  ...pack.finalGaps.map((gap) => `${gap.standalone?.before ?? ''} ${gap.standalone?.after ?? ''}`),
]
const russianWrittenAnswers = (pack) => [...pack.micro, ...pack.long].flatMap((item) => item.gaps.flatMap((gap) => gap.answers))

for (const context of russianContexts(RUSSIAN_EDITORIAL_PACKS[1])) assert(/(?:весь|всю|кажд|пока|когда|в тот момент|несколько|часто|раньше|в прошлом|по вечерам|во время|до закрытия|с .+ до|два часа|полчаса|в восемь|в полдень)/i.test(context), `russian/past-imperfective: falta proceso, fondo o repetición visible («${context}»)`)
for (const context of russianContexts(RUSSIAN_EDITORIAL_PACKS[2])) assert(/(?:наконец|до |к |за | и |затем|потом|сразу|после|когда|в субботу|вчера|один)/i.test(context), `russian/past-perfective: falta resultado o cadena cerrada («${context}»)`)
for (const answer of russianWrittenAnswers(RUSSIAN_EDITORIAL_PACKS[3])) assert(/^(?:буду|будешь|будет|будем|будете|будут)\s/u.test(answer), `russian/future-imperfective: falta futuro analítico completo («${answer}»)`)
for (const context of russianContexts(RUSSIAN_EDITORIAL_PACKS[4])) assert(/(?:к |до |после|когда|перед|скоро|в субботу|приед|сигнал|сразу|началу|захода)/i.test(context), `russian/future-perfective: falta límite o resultado futuro («${context}»)`)
for (const answer of [...russianWrittenAnswers(RUSSIAN_EDITORIAL_PACKS[5]), ...russianWrittenAnswers(RUSSIAN_EDITORIAL_PACKS[6])]) assert(/\sбы$/u.test(answer), `russian/conditional: la respuesta debe incluir «бы» («${answer}»)`)
for (const context of russianContexts(RUSSIAN_EDITORIAL_PACKS[5])) assert(/(?:сейчас|сегодня|на твоём месте|на её месте|при большем|если бы|без |текущ)/i.test(context), `russian/conditional-present: falta ancla actual («${context}»)`)
for (const context of russianContexts(RUSSIAN_EDITORIAL_PACKS[6])) assert(/(?:вчера|тогда|прошл|в субботу|ночью|год назад|закрыт|отмен|потер|слом|поздн|не состоя)/i.test(context), `russian/conditional-past: falta ancla pasada cerrada («${context}»)`)
for (const context of russianContexts(RUSSIAN_EDITORIAL_PACKS[7])) assert(/(?:пока|кажд|весь|всю|в течение|во время|всегда|не |продолж|регуляр|несколько|по вечерам|никогда)/i.test(context), `russian/imperative-imperfective: falta motivación de proceso o repetición («${context}»)`)
for (const context of russianContexts(RUSSIAN_EDITORIAL_PACKS[8])) assert(/(?:до |после|перед|когда|сначала|затем|потом|сразу|один|конкрет|в конце|у ворот|ошибка|в этой|на карте|страниц)/i.test(context), `russian/imperative-perfective: falta resultado único («${context}»)`)
for (const answer of russianWrittenAnswers(RUSSIAN_EDITORIAL_PACKS[9])) assert(/(?:ть|ти|чь)(?:ся)?$/u.test(answer), `russian/infinitive-aspect: la respuesta no es infinitivo («${answer}»)`)

for (const [index, pack] of JAPANESE_EDITORIAL_PACKS.entries()) {
  const formId = JAPANESE_STRUCTURE_QUEST.forms[index].id
  assert(pack.choices.length === 10 && pack.micro.length === 10, `japanese/${formId}: se requieren 10 decisiones y 10 microtextos`)
  assert(pack.long.length === 10 && pack.long.every((item) => item.gaps.length === 3), `japanese/${formId}: se requieren 10 relatos conectados de tres huecos`)
  assert(pack.errors.length === 10 && pack.errors.every((item) => item.chunks.length === 3), `japanese/${formId}: se requieren 10 reparaciones de tres verbos`)
  assert(pack.timelines.length === 10 && pack.finalGaps.length === 10, `japanese/${formId}: faltan secuencias o decisiones finales`)
  for (const item of [...pack.choices, ...pack.micro, ...pack.long, ...pack.errors, ...pack.timelines]) assert(item.id.includes('editorial'), `${item.id}: sobrevivió contenido japonés heredado`)
}
const japaneseContexts = (pack) => [...pack.micro.map((item) => item.segments.join(' ')), ...pack.long.map((item) => item.segments.join(' ')), ...pack.finalGaps.map((gap) => `${gap.standalone?.before ?? ''} ${gap.standalone?.after ?? ''}`)]
const japaneseWrittenGaps = (pack) => [...pack.micro, ...pack.long].flatMap((item) => item.gaps)
for (const answer of japaneseWrittenGaps(JAPANESE_EDITORIAL_PACKS[0]).flatMap((gap) => gap.answers)) assert(/ます$/u.test(answer) && !/ています$/u.test(answer), `japanese/nonpast-affirmative: forma no-pasada inválida («${answer}»)`)
for (const answer of japaneseWrittenGaps(JAPANESE_EDITORIAL_PACKS[1]).flatMap((gap) => gap.answers)) assert(/ません$/u.test(answer), `japanese/nonpast-negative: falta ません («${answer}»)`)
for (const answer of japaneseWrittenGaps(JAPANESE_EDITORIAL_PACKS[2]).flatMap((gap) => gap.answers)) assert(/ました$/u.test(answer), `japanese/past-affirmative: falta ました («${answer}»)`)
for (const answer of japaneseWrittenGaps(JAPANESE_EDITORIAL_PACKS[3]).flatMap((gap) => gap.answers)) assert(/ませんでした$/u.test(answer), `japanese/past-negative: falta ませんでした («${answer}»)`)
for (const context of japaneseContexts(JAPANESE_EDITORIAL_PACKS[4])) assert(/(?:今|現在|今月|今週|今学期|生中継|目の前|進行|この時間)/u.test(context), `japanese/progressive: falta marco de actividad en curso («${context}»)`)
for (const answer of japaneseWrittenGaps(JAPANESE_EDITORIAL_PACKS[4]).flatMap((gap) => gap.answers)) assert(/(?:て|で)います$/u.test(answer), `japanese/progressive: falta construcción completa («${answer}»)`)
for (const context of japaneseContexts(JAPANESE_EDITORIAL_PACKS[5])) assert(/(?:寒|暗|明る|動きません|入れません|事故|後|現在|今|まだ|まま|雨|閉館|故障|準備|停電|冬|開店前|路肩|三列|床|滑り)/u.test(context), `japanese/result-state: falta evidencia del estado resultante («${context}»)`)
for (const answer of japaneseWrittenGaps(JAPANESE_EDITORIAL_PACKS[5]).flatMap((gap) => gap.answers)) assert(answer.length > 4 && /(?:て|で)います$/u.test(answer), `japanese/result-state: la respuesta debe contener la construcción completa («${answer}»)`)
for (const gap of japaneseWrittenGaps(JAPANESE_EDITORIAL_PACKS[6])) assert(gap.answers.length === 2 && gap.answers.every((answer) => /こと(?:が)?あり/u.test(answer)), `japanese/experience: faltan variantes normativas completas (${gap.id})`)
for (const answer of japaneseWrittenGaps(JAPANESE_EDITORIAL_PACKS[7]).flatMap((gap) => gap.answers)) assert(/(?:つもり|予定)です$/u.test(answer), `japanese/plan-intention: falta construcción completa («${answer}»)`)
for (const answer of japaneseWrittenGaps(JAPANESE_EDITORIAL_PACKS[8]).flatMap((gap) => gap.answers)) assert(answer.length > 2 && /たら$/u.test(answer), `japanese/tara: falta forma condicional completa («${answer}»)`)
for (const answer of japaneseWrittenGaps(JAPANESE_EDITORIAL_PACKS[9]).flatMap((gap) => gap.answers)) assert(/ください$/u.test(answer), `japanese/request-prohibition: falta función completa («${answer}»)`)

for (const [index, pack] of KOREAN_EDITORIAL_PACKS.entries()) {
  const formId = KOREAN_STRUCTURE_QUEST.forms[index].id
  assert(pack.choices.length === 10 && pack.micro.length === 10, `korean/${formId}: se requieren 10 decisiones y 10 microtextos`)
  assert(pack.long.length === 10 && pack.long.every((item) => item.gaps.length === 3), `korean/${formId}: se requieren 10 relatos conectados de tres huecos`)
  assert(pack.errors.length === 10 && pack.errors.every((item) => item.chunks.length === 3), `korean/${formId}: se requieren 10 reparaciones de tres expresiones`)
  assert(pack.timelines.length === 10 && pack.finalGaps.length === 10, `korean/${formId}: faltan secuencias o decisiones finales`)
  for (const item of [...pack.choices, ...pack.micro, ...pack.long, ...pack.errors, ...pack.timelines]) assert(item.id.includes('editorial'), `${item.id}: sobrevivió contenido coreano heredado`)
}
const koreanContexts = (pack) => [...pack.micro.map((item) => item.segments.join(' ')), ...pack.long.map((item) => item.segments.join(' ')), ...pack.finalGaps.map((gap) => `${gap.standalone?.before ?? ''} ${gap.standalone?.after ?? ''}`)]
const koreanWrittenAnswers = (pack) => [...pack.micro, ...pack.long].flatMap((item) => item.gaps.flatMap((gap) => gap.answers))
for (const context of koreanContexts(KOREAN_EDITORIAL_PACKS[0])) assert(/(?:친구|가족|일상|이웃|학생|편하게|아이|동료|손님|집에서)/u.test(context), `korean/present-polite: falta interlocutor cotidiano («${context}»)`)
for (const answer of koreanWrittenAnswers(KOREAN_EDITORIAL_PACKS[0])) assert(/요$/u.test(answer) && !/습니다$/u.test(answer), `korean/present-polite: nivel de habla inválido («${answer}»)`)
for (const context of koreanContexts(KOREAN_EDITORIAL_PACKS[1])) assert(/(?:공식|안내|방송|보고|발표|업무|면접|규정|기술|기관|과학|박물관|역 |공항|회사|관리자|기자|행사)/u.test(context), `korean/present-formal: falta situación formal visible («${context}»)`)
for (const answer of koreanWrittenAnswers(KOREAN_EDITORIAL_PACKS[1])) assert(/(?:합니다|됩니다|습니다|납니다|립니다)$/u.test(answer), `korean/present-formal: falta 합니다체 completo («${answer}»)`)
for (const context of koreanContexts(KOREAN_EDITORIAL_PACKS[2])) assert(/(?:어제|지난|방금|아까|오늘 아침|한 시간 전|두 시간 전|어젯밤|주말|아침에|점심에)/u.test(context), `korean/past-polite: falta ancla pasada cerrada («${context}»)`)
for (const context of koreanContexts(KOREAN_EDITORIAL_PACKS[3])) assert(/(?:내일|다음|주말|곧|향후|휴가|졸업|저녁|토요일|봄|예보|계획|끝나면|결승|현재)/u.test(context), `korean/future-intention: falta ancla futura o evidencia («${context}»)`)
for (const answer of koreanWrittenAnswers(KOREAN_EDITORIAL_PACKS[3])) assert(/^.+ 거예요$/u.test(answer), `korean/future-intention: falta construcción completa («${answer}»)`)
for (const context of koreanContexts(KOREAN_EDITORIAL_PACKS[4])) assert(/(?:지금|현재|요즘|이번|말하는 순간|창밖|눈앞|계속|진행)/u.test(context), `korean/progressive: falta actividad en curso visible («${context}»)`)
for (const answer of koreanWrittenAnswers(KOREAN_EDITORIAL_PACKS[4])) assert(/고 있어요$/u.test(answer), `korean/progressive: falta -고 있어요 completo («${answer}»)`)
for (const context of koreanContexts(KOREAN_EDITORIAL_PACKS[5])) assert(/(?:이미|결과|뒤|끝|상태|남|놓|잠|깨|닫|꺼|걸|붙|덮|묻|배치|설치|수리|아무도|벽|열쇠|조각|두고|명찰|대기실|준비해 둔|예약석|정리해서|주차해 두어서|밤이 되어)/u.test(context), `korean/result-state: falta evidencia posterior al cambio («${context}»)`)
for (const answer of koreanWrittenAnswers(KOREAN_EDITORIAL_PACKS[5])) assert(answer.length > 5 && / 있어요$/u.test(answer) && !/고 있어요$/u.test(answer), `korean/result-state: falta construcción completa («${answer}»)`)
for (const answer of koreanWrittenAnswers(KOREAN_EDITORIAL_PACKS[6])) assert(/적이 (?:있|없)어요$/u.test(answer), `korean/experience: falta construcción completa («${answer}»)`)
for (const answer of koreanWrittenAnswers(KOREAN_EDITORIAL_PACKS[7])) assert(answer.length > 1 && /면$/u.test(answer), `korean/conditional: falta -(으)면 completo («${answer}»)`)
for (const answer of koreanWrittenAnswers(KOREAN_EDITORIAL_PACKS[8])) assert(/려고 해요$/u.test(answer), `korean/purpose-intention: falta construcción completa («${answer}»)`)
for (const answer of koreanWrittenAnswers(KOREAN_EDITORIAL_PACKS[9])) assert(answer.length > 2 && /(?:세요|주세요|마세요)$/u.test(answer) && !/^(?:마세요|주세요)$/u.test(answer), `korean/request-prohibition: falta función completa («${answer}»)`)

const allConfigs = [ITALIAN_TENSE_QUEST, ENGLISH_TENSE_QUEST, FRENCH_STRUCTURE_QUEST, PORTUGUESE_STRUCTURE_QUEST, GERMAN_STRUCTURE_QUEST, RUSSIAN_STRUCTURE_QUEST, JAPANESE_STRUCTURE_QUEST, KOREAN_STRUCTURE_QUEST, ...GENERATED_CONFIGS]
assert(new Set(allConfigs.map((config) => config.storageKey)).size === allConfigs.length, 'los storageKey deben ser únicos por idioma')
assert(allConfigs.every((config) => /-v\d+$/.test(config.storageKey)), 'cada storageKey debe declarar una versión de esquema')

if (failures.length) {
  console.error(`Tense quest check failed (${failures.length})`)
  failures.forEach((failure) => console.error(`- ${failure}`))
  process.exit(1)
}

console.log('✓ Tense quests: estructura, respuestas y cobertura verificadas')
