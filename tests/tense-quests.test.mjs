import assert from 'node:assert/strict'
import path from 'node:path'
import test from 'node:test'
import { fileURLToPath } from 'node:url'

import { ENGLISH_TENSE_QUEST } from '../src/data/practica/english-tense-quest-config.ts'
import { FRENCH_STRUCTURE_QUEST } from '../src/data/practica/french-structure-quest-config.ts'
import { GERMAN_STRUCTURE_QUEST } from '../src/data/practica/german-structure-quest-config.ts'
import { EDITORIAL_ITALIAN_FORMS, ITALIAN_TENSE_QUEST } from '../src/data/practica/italian-tense-quest-config.ts'
import { JAPANESE_STRUCTURE_QUEST } from '../src/data/practica/japanese-structure-quest-config.ts'
import { KOREAN_STRUCTURE_QUEST } from '../src/data/practica/korean-structure-quest-config.ts'
import { PORTUGUESE_STRUCTURE_QUEST } from '../src/data/practica/portuguese-structure-quest-config.ts'
import { RUSSIAN_STRUCTURE_QUEST } from '../src/data/practica/russian-structure-quest-config.ts'
import { normalizeSentenceAnswer } from '../src/data/practica/sentence-production.ts'
import { MIXED_LEVEL_MAXIMUM, selectMixedChallenges } from '../src/data/practica/tense-quest-selection.ts'
import { levelOneConnector, levelOnePlacement, loadHarness } from '../scripts/lib/german-tense-harness-core.mjs'

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const germanHarness = loadHarness(repoRoot)

function germanLevelFiveTopology(prompt) {
  const value = prompt.trim()
  if (value.endsWith('?')) return 'question'
  if (/^(?:Wenn|Falls|Nachdem|Obwohl|Weil|Sobald|Als)\b/u.test(value)) return 'fronted-subordinate'
  if (/\b(?:dass|weil|was)\b/u.test(value)) return 'embedded-clause'
  if (/^(?:Am|Im|Nach|Vor|Seit|Bei|Zum|Bis|Gestern|Heute|Morgen)\b/u.test(value)) return 'fronted-adverbial'
  return 'main-clause'
}

const CONFIGS = [
  ITALIAN_TENSE_QUEST,
  ENGLISH_TENSE_QUEST,
  FRENCH_STRUCTURE_QUEST,
  PORTUGUESE_STRUCTURE_QUEST,
  GERMAN_STRUCTURE_QUEST,
  RUSSIAN_STRUCTURE_QUEST,
  JAPANESE_STRUCTURE_QUEST,
  KOREAN_STRUCTURE_QUEST,
]

test('mixed practice is balanced, interleaved and capped', () => {
  const selected = ['present-perfect', 'past-continuous']
  const first = selectMixedChallenges(
    ENGLISH_TENSE_QUEST.choiceChallenges,
    selected,
    (challenge, tense) => challenge.tenses.includes(tense),
    'english-tense-quest:level-1',
  )
  const second = selectMixedChallenges(
    ENGLISH_TENSE_QUEST.choiceChallenges,
    selected,
    (challenge, tense) => challenge.tenses.includes(tense),
    'english-tense-quest:level-1',
  )
  const targets = first.map((challenge) => selected.find((tense) => challenge.tenses.includes(tense)))

  assert.equal(first.length, 12)
  assert.deepEqual(first.map((challenge) => challenge.id), second.map((challenge) => challenge.id))
  assert.equal(targets.filter((tense) => tense === selected[0]).length, 6)
  assert.equal(targets.filter((tense) => tense === selected[1]).length, 6)
  assert.ok(targets.some((tense, index) => index > 0 && tense !== targets[index - 1]))

  const everyEnglishForm = ENGLISH_TENSE_QUEST.forms.map((form) => form.id)
  const allForms = selectMixedChallenges(
    ENGLISH_TENSE_QUEST.choiceChallenges,
    everyEnglishForm,
    (challenge, tense) => challenge.tenses.includes(tense),
    'english-tense-quest:level-1',
  )
  assert.equal(allForms.length, everyEnglishForm.length)
  assert.ok(allForms.length <= MIXED_LEVEL_MAXIMUM)
  for (const tense of everyEnglishForm) {
    assert.ok(allForms.some((challenge) => challenge.tenses.includes(tense)), tense)
  }
})

test('multiple-choice answers are balanced across A, B, C and D', () => {
  for (const config of CONFIGS) {
    const positions = [0, 0, 0, 0]
    for (const challenge of config.choiceChallenges) positions[challenge.options.indexOf(challenge.answer)] += 1
    assert.ok(positions.every((count) => count > 0), `${config.id}: ${positions.join('/')}`)
    assert.ok(Math.max(...positions) - Math.min(...positions) <= 1, `${config.id}: ${positions.join('/')}`)
  }
})

test('error targets are balanced across every presented verb position', () => {
  for (const config of CONFIGS) {
    const positions = new Array(Math.max(...config.errorChallenges.map((challenge) => challenge.chunks.length))).fill(0)
    for (const challenge of config.errorChallenges) {
      positions[challenge.chunks.findIndex((chunk) => chunk.id === challenge.wrongId)] += 1
    }
    assert.ok(positions.every((count) => count > 0), `${config.id}: ${positions.join('/')}`)
    assert.ok(Math.max(...positions) - Math.min(...positions) <= 1, `${config.id}: ${positions.join('/')}`)
  }
})

test('every language hides level-four targets and finishes with open written production', () => {
  for (const config of CONFIGS) {
    assert.equal(config.errorIdentificationMode, 'write', `${config.id}/level-4-mode`)
    for (const form of config.forms) {
      const stories = config.finalStories?.filter((item) => item.gaps.some((gap) => gap.tense === form.id)) ?? []
      assert.equal(stories.length, 1, `${config.id}/${form.id}/final-story`)
      assert.ok(stories[0].gaps.length >= 10, `${config.id}/${form.id}/final-story-gaps`)
      assert.equal(stories[0].segments.length, stories[0].gaps.length + 1, `${config.id}/${form.id}/final-story-shape`)
    }
  }
})

test('adjacent pedagogical levels use independent scenes', () => {
  const normalize = (value, locale) => value.normalize('NFKC').toLocaleLowerCase(locale).replaceAll('___', ' ').replace(/[^\p{L}\p{N}]+/gu, ' ').trim()
  for (const config of CONFIGS) {
    const locale = config.copy.languageCode
    for (const form of config.forms) {
      const levelOne = new Set(config.choiceChallenges.filter((item) => item.tenses.includes(form.id)).map((item) => normalize(item.context, locale)))
      const levelTwo = config.microStories.filter((item) => item.gaps.some((gap) => gap.tense === form.id)).map((item) => normalize(item.segments.join(''), locale))
      assert.ok(levelTwo.every((scene) => !levelOne.has(scene)), `${config.id}/${form.id}/L1-L2`)

      const levelThree = new Set(config.longStories.filter((item) => item.gaps.some((gap) => gap.tense === form.id)).map((item) => normalize(
        item.segments.map((segment, index) => segment + (item.gaps[index]?.answers[0] ?? '')).join(''), locale,
      )))
      const levelFour = config.errorChallenges.filter((item) => item.tense === form.id).map((item) => normalize(
        item.chunks.map((chunk) => chunk.before + (chunk.id === item.wrongId ? item.answers[0] : chunk.form)).join('') + item.after, locale,
      ))
      assert.ok(levelFour.every((scene) => !levelThree.has(scene)), `${config.id}/${form.id}/L3-L4`)
    }
  }
})

test('level five requires a complete sentence even when one form is selected', () => {
  for (const config of CONFIGS.filter((item) => !item.separationChallenges?.length)) {
    for (const form of config.forms) {
      const timelines = config.timelineChallenges.filter((item) => item.slots.some((slot) => slot.tense === form.id))
      for (const challenge of timelines) {
        for (const slot of challenge.slots.filter((item) => item.tense === form.id)) {
          assert.ok(slot.production, `${challenge.id}/production`)
          assert.ok(slot.production.tokens.length >= 2, `${challenge.id}/tokens`)
          assert.ok(slot.production.answers.length >= 1, `${challenge.id}/answers`)
          assert.ok(slot.production.answers.every((answer) => !answer.includes('___')), `${challenge.id}/complete-answer`)
        }
      }
    }
  }
})

test('sentence production accepts ordinary terminal punctuation and typographic quotes', () => {
  const canonical = normalizeSentenceAnswer('The clinic has analyzed the samples', 'en')
  assert.equal(normalizeSentenceAnswer('The clinic has analyzed the samples.', 'en'), canonical)
  assert.equal(normalizeSentenceAnswer('“The clinic has analyzed the samples!”', 'en'), canonical)
})

test('declared normative variants survive into every written-answer level', () => {
  const englishNegative = ENGLISH_TENSE_QUEST.microStories.find((item) => item.gaps.some((gap) => gap.tense === 'present-perfect' && gap.verb === 'not receive'))
  assert.deepEqual(englishNegative?.gaps.find((gap) => gap.verb === 'not receive')?.answers, ['have not received', "haven't received"])

  const japaneseExperience = JAPANESE_STRUCTURE_QUEST.microStories.find((item) => item.gaps.some((gap) => gap.tense === 'experience'))
  assert.ok(japaneseExperience?.gaps[0].answers.includes('行ったことあります'))

  const russianYo = RUSSIAN_STRUCTURE_QUEST.microStories.find((item) => item.gaps.some((gap) => gap.verb === 'идти'))
  assert.ok(russianYo?.gaps[0].answers.includes('шел'))
})

test('Italian exposes progressive periphrases and ten real challenges per form and level', () => {
  const ids = ITALIAN_TENSE_QUEST.forms.map((form) => form.id)
  assert.ok(ids.includes('presente-progressivo'))
  assert.ok(ids.includes('imperfetto-progressivo'))

  for (const id of ids) {
    assert.ok(ITALIAN_TENSE_QUEST.choiceChallenges.filter((item) => item.tenses.includes(id)).length >= 10, `${id}/choice`)
    assert.ok(ITALIAN_TENSE_QUEST.microStories.filter((item) => item.gaps.some((gap) => gap.tense === id)).length >= 10, `${id}/micro`)
    assert.ok(ITALIAN_TENSE_QUEST.longStories.filter((item) => item.gaps.some((gap) => gap.tense === id)).length >= 10, `${id}/long`)
    assert.ok(ITALIAN_TENSE_QUEST.errorChallenges.filter((item) => item.tense === id).length >= 10, `${id}/error`)
    assert.ok(ITALIAN_TENSE_QUEST.timelineChallenges.filter((item) => item.slots.some((slot) => slot.tense === id)).length >= 10, `${id}/timeline`)
    assert.ok(ITALIAN_TENSE_QUEST.finalChallenges.filter((item) => item.gaps.some((gap) => gap.tenseId === id)).length >= 10, `${id}/final`)
  }
})

test('Italian written answers never hide lexical adverbs inside the requested conjugation', () => {
  const lexicalAdverb = /\b(?:appena|già|ancora|mai|sempre)\b/iu
  for (const challenge of [...ITALIAN_TENSE_QUEST.microStories, ...ITALIAN_TENSE_QUEST.longStories]) {
    for (const gap of challenge.gaps) {
      for (const answer of gap.answers) assert.doesNotMatch(answer, lexicalAdverb, `${challenge.id}/${gap.id}`)
    }
  }

  const finire = ITALIAN_TENSE_QUEST.microStories.find((item) => item.id === 'it-pp-micro-editorial-5')
  assert.deepEqual(finire?.gaps[0].answers, ['ha finito'])
})

test('Italian remote pluperfect always exposes its literary temporal anchor', () => {
  const longs = ITALIAN_TENSE_QUEST.longStories.filter((item) => item.gaps.some((gap) => gap.tense === 'trapassato-remoto'))
  for (const item of longs) {
    const anchors = item.segments.join(' ').match(/\b(?:dopo che|quando|non appena|appena)\b/giu) ?? []
    assert.ok(anchors.length >= item.gaps.length, item.id)
  }

  const timelines = ITALIAN_TENSE_QUEST.timelineChallenges.filter((item) => item.slots.some((slot) => slot.tense === 'trapassato-remoto'))
  for (const item of timelines) {
    assert.ok(item.options.every((option) => /\b(?:dopo che|quando|non appena|appena)\b/iu.test(option) && option.includes(',')), item.id)
  }

  const errors = ITALIAN_TENSE_QUEST.errorChallenges.filter((item) => item.tense === 'trapassato-remoto')
  for (const item of errors) {
    const text = `${item.chunks.map((chunk) => chunk.before).join(' ')} ${item.after}`
    const anchors = text.match(/\b(?:dopo che|quando|non appena|appena)\b/giu) ?? []
    assert.ok(anchors.length >= item.chunks.length, item.id)
  }
})

test('Italian future perfect always exposes a deadline or a second future point', () => {
  const anchor = /\b(?:entro|prima|quando|dopo che|appena|a quest[’']ora)\b/giu
  const longs = ITALIAN_TENSE_QUEST.longStories.filter((item) => item.gaps.some((gap) => gap.tense === 'futuro-anteriore'))
  for (const item of longs) assert.ok((item.segments.join(' ').match(anchor) ?? []).length >= item.gaps.length, item.id)

  const errors = ITALIAN_TENSE_QUEST.errorChallenges.filter((item) => item.tense === 'futuro-anteriore')
  for (const item of errors) {
    const text = `${item.chunks.map((chunk) => chunk.before).join(' ')} ${item.after}`
    assert.ok((text.match(anchor) ?? []).length >= item.chunks.length, item.id)
  }

  const timelines = ITALIAN_TENSE_QUEST.timelineChallenges.filter((item) => item.slots.some((slot) => slot.tense === 'futuro-anteriore'))
  for (const item of timelines) assert.ok(item.options.every((option) => /\b(?:quando|dopo che|appena)\b/iu.test(option) && option.includes(',')), item.id)
})

test('Italian final decisions use autonomous context and same-verb candidate sets', () => {
  const answerPositions = [0, 0, 0, 0]
  for (const challenge of ITALIAN_TENSE_QUEST.finalChallenges) {
    const cardIds = new Set(challenge.cards.map((card) => card.id))
    for (const gap of challenge.gaps) {
      assert.ok(gap.standalone?.before || gap.standalone?.after, gap.id)
      assert.equal(gap.candidateCardIds?.length, 4, gap.id)
      assert.ok(gap.candidateCardIds?.includes(gap.answerCardId), gap.id)
      assert.ok(gap.candidateCardIds?.every((id) => cardIds.has(id)), gap.id)
      answerPositions[gap.candidateCardIds.indexOf(gap.answerCardId)] += 1
    }
  }
  assert.ok(answerPositions.every((count) => count > 0), answerPositions.join('/'))
  assert.ok(Math.max(...answerPositions) - Math.min(...answerPositions) <= 1, answerPositions.join('/'))
  assert.ok(answerPositions[0] / answerPositions.reduce((sum, count) => sum + count, 0) < 0.3)
})

test('Italian final dossiers never repeat level-one scenes', () => {
  for (const form of ITALIAN_TENSE_QUEST.forms) {
    const levelOne = new Set(ITALIAN_TENSE_QUEST.choiceChallenges.filter((item) => item.tenses.includes(form.id)).map((item) => item.context.toLocaleLowerCase('it')))
    const finals = ITALIAN_TENSE_QUEST.finalChallenges.flatMap((item) => item.gaps.filter((gap) => gap.tenseId === form.id).map((gap) => `${gap.standalone?.before ?? ''}___${gap.standalone?.after ?? ''}`))
    assert.equal(finals.length, 10, form.id)
    assert.equal(new Set(finals).size, 10, form.id)
    assert.ok(finals.every((context) => !levelOne.has(context.toLocaleLowerCase('it'))), form.id)
  }
})

test('each migrated Italian form uses independent editorial banks for every discursive level', () => {
  assert.deepEqual(new Set(ITALIAN_TENSE_QUEST.forms.map((form) => form.id)), EDITORIAL_ITALIAN_FORMS)
  for (const formId of EDITORIAL_ITALIAN_FORMS) {
    const micro = ITALIAN_TENSE_QUEST.microStories.filter((item) => item.gaps.some((gap) => gap.tense === formId))
    const long = ITALIAN_TENSE_QUEST.longStories.filter((item) => item.gaps.some((gap) => gap.tense === formId))
    const errors = ITALIAN_TENSE_QUEST.errorChallenges.filter((item) => item.tense === formId)
    const timelines = ITALIAN_TENSE_QUEST.timelineChallenges.filter((item) => item.slots.some((slot) => slot.tense === formId))

    assert.ok([...micro, ...long, ...errors, ...timelines].every((item) => item.id.includes('-editorial-')), formId)
    assert.ok(long.every((item) => item.gaps.length >= 3 && !item.segments.join('').includes(' · ')), formId)
    assert.ok(errors.every((item) => item.chunks.length === 3), formId)
    assert.ok(timelines.every((item) => item.options.length === 3), formId)

    const fingerprints = [...micro, ...long].map((item) => item.segments.join('___').toLocaleLowerCase('it'))
    assert.equal(new Set(fingerprints).size, fingerprints.length, formId)
  }
})

test('Italian imperative preserves negative tu and formal Lei', () => {
  const negativeTu = ITALIAN_TENSE_QUEST.microStories.find((item) => item.id === 'it-imperative-micro-editorial-4')
  assert.ok(negativeTu?.segments[0].trim().endsWith('Non'))
  assert.deepEqual(negativeTu?.gaps[0].answers, ['premere'])

  const formalLei = ITALIAN_TENSE_QUEST.microStories.find((item) => item.id === 'it-imperative-micro-editorial-3')
  assert.deepEqual(formalLei?.gaps[0].answers, ['attenda'])
})

test('French exposes ten independent editorial challenges per form and level', () => {
  for (const form of FRENCH_STRUCTURE_QUEST.forms) {
    const id = form.id
    assert.equal(FRENCH_STRUCTURE_QUEST.choiceChallenges.filter((item) => item.tenses.includes(id)).length, 10, `${id}/choice`)
    assert.equal(FRENCH_STRUCTURE_QUEST.microStories.filter((item) => item.gaps.some((gap) => gap.tense === id)).length, 10, `${id}/micro`)
    assert.equal(FRENCH_STRUCTURE_QUEST.longStories.filter((item) => item.gaps.some((gap) => gap.tense === id)).length, 10, `${id}/long`)
    assert.equal(FRENCH_STRUCTURE_QUEST.errorChallenges.filter((item) => item.tense === id).length, 10, `${id}/error`)
    assert.equal(FRENCH_STRUCTURE_QUEST.timelineChallenges.filter((item) => item.slots.some((slot) => slot.tense === id)).length, 10, `${id}/timeline`)
    assert.equal(FRENCH_STRUCTURE_QUEST.finalChallenges.filter((item) => item.gaps.some((gap) => gap.tenseId === id)).length, 10, `${id}/final`)
  }
})

test('French final dossiers use fresh autonomous contexts and balanced same-verb decisions', () => {
  const answerPositions = [0, 0, 0, 0]
  for (const form of FRENCH_STRUCTURE_QUEST.forms) {
    const levelOne = new Set(FRENCH_STRUCTURE_QUEST.choiceChallenges.filter((item) => item.tenses.includes(form.id)).map((item) => item.context.toLocaleLowerCase('fr')))
    const finals = FRENCH_STRUCTURE_QUEST.finalChallenges.flatMap((item) => item.gaps.filter((gap) => gap.tenseId === form.id))
    assert.equal(finals.length, 10, form.id)
    assert.equal(new Set(finals.map((gap) => `${gap.standalone?.before ?? ''}___${gap.standalone?.after ?? ''}`)).size, 10, form.id)
    for (const gap of finals) {
      const context = `${gap.standalone?.before ?? ''}___${gap.standalone?.after ?? ''}`
      assert.ok(gap.standalone?.before || gap.standalone?.after, gap.id)
      assert.ok(!levelOne.has(context.toLocaleLowerCase('fr')), gap.id)
      assert.equal(gap.candidateCardIds?.length, 4, gap.id)
      answerPositions[gap.candidateCardIds.indexOf(gap.answerCardId)] += 1
    }
  }
  assert.ok(Math.max(...answerPositions) - Math.min(...answerPositions) <= 1, answerPositions.join('/'))
})

test('Brazilian Portuguese exposes ten editorial challenges per form and level', () => {
  for (const form of PORTUGUESE_STRUCTURE_QUEST.forms) {
    const id = form.id
    assert.equal(PORTUGUESE_STRUCTURE_QUEST.choiceChallenges.filter((item) => item.tenses.includes(id)).length, 10, `${id}/choice`)
    assert.equal(PORTUGUESE_STRUCTURE_QUEST.microStories.filter((item) => item.gaps.some((gap) => gap.tense === id)).length, 10, `${id}/micro`)
    assert.equal(PORTUGUESE_STRUCTURE_QUEST.longStories.filter((item) => item.gaps.some((gap) => gap.tense === id)).length, 10, `${id}/long`)
    assert.equal(PORTUGUESE_STRUCTURE_QUEST.errorChallenges.filter((item) => item.tense === id).length, 10, `${id}/error`)
    assert.equal(PORTUGUESE_STRUCTURE_QUEST.timelineChallenges.filter((item) => item.slots.some((slot) => slot.tense === id)).length, 10, `${id}/timeline`)
    assert.equal(PORTUGUESE_STRUCTURE_QUEST.finalChallenges.filter((item) => item.gaps.some((gap) => gap.tenseId === id)).length, 10, `${id}/final`)
  }
})

test('Brazilian Portuguese final dossiers are fresh, autonomous and balanced', () => {
  const answerPositions = [0, 0, 0, 0]
  for (const form of PORTUGUESE_STRUCTURE_QUEST.forms) {
    const levelOne = new Set(PORTUGUESE_STRUCTURE_QUEST.choiceChallenges.filter((item) => item.tenses.includes(form.id)).map((item) => item.context.toLocaleLowerCase('pt-BR')))
    const finals = PORTUGUESE_STRUCTURE_QUEST.finalChallenges.flatMap((item) => item.gaps.filter((gap) => gap.tenseId === form.id))
    assert.equal(finals.length, 10, form.id)
    assert.equal(new Set(finals.map((gap) => `${gap.standalone?.before ?? ''}___${gap.standalone?.after ?? ''}`)).size, 10, form.id)
    for (const gap of finals) {
      const context = `${gap.standalone?.before ?? ''}___${gap.standalone?.after ?? ''}`
      assert.ok(gap.standalone?.before || gap.standalone?.after, gap.id)
      assert.ok(!levelOne.has(context.toLocaleLowerCase('pt-BR')), gap.id)
      assert.equal(gap.candidateCardIds?.length, 4, gap.id)
      answerPositions[gap.candidateCardIds.indexOf(gap.answerCardId)] += 1
    }
  }
  assert.ok(Math.max(...answerPositions) - Math.min(...answerPositions) <= 1, answerPositions.join('/'))
})

test('German exposes ten drills per form before a long written final story', () => {
  for (const form of GERMAN_STRUCTURE_QUEST.forms) {
    const id = form.id
    assert.equal(GERMAN_STRUCTURE_QUEST.choiceChallenges.filter((item) => item.tenses.includes(id)).length, 10, `${id}/choice`)
    assert.equal(GERMAN_STRUCTURE_QUEST.microStories.filter((item) => item.gaps.some((gap) => gap.tense === id)).length, 10, `${id}/micro`)
    assert.equal(GERMAN_STRUCTURE_QUEST.longStories.filter((item) => item.gaps.some((gap) => gap.tense === id)).length, 10, `${id}/long`)
    assert.equal(GERMAN_STRUCTURE_QUEST.errorChallenges.filter((item) => item.tense === id).length, 10, `${id}/error`)
    assert.equal(GERMAN_STRUCTURE_QUEST.finalChallenges.filter((item) => item.gaps.some((gap) => gap.tenseId === id)).length, 10, `${id}/final`)
    const separation = GERMAN_STRUCTURE_QUEST.separationChallenges?.filter((item) => item.tense === id) ?? []
    assert.equal(separation.length, 10, `${id}/separation`)
    assert.equal(separation.filter((item) => item.separation === 'separable').length, 5, `${id}/separable`)
    assert.equal(separation.filter((item) => item.separation === 'inseparable').length, 5, `${id}/inseparable`)
    const sequence = separation.map((item) => item.separation)
    const changes = sequence.slice(1).filter((value, index) => value !== sequence[index]).length
    const runs = sequence.reduce((lengths, value) => {
      const previous = lengths.at(-1)
      if (previous?.value === value) previous.length += 1
      else lengths.push({ value, length: 1 })
      return lengths
    }, [])
    assert.ok(changes >= 6, `${id}/mixed-separation-order`)
    assert.ok(Math.max(...runs.map((run) => run.length)) <= 2, `${id}/separation-run`)
    if (['perfekt-haben', 'perfekt-sein', 'futur-eins'].includes(id)) {
      assert.ok(separation.filter((item) => /\bdass\b/u.test(item.prompt)).length <= 4, `${id}/dass-diversity`)
      assert.ok(new Set(separation.map((item) => germanLevelFiveTopology(item.prompt))).size >= 4, `${id}/syntax-topologies`)
    }
    for (const item of separation) {
      assert.match(item.prompt, /___/, `${item.id}/prompt`)
      assert.ok(item.answers[0].split(/\s+/).length >= 4, `${item.id}/complete-sentence`)
      if (item.separation === 'separable' && ['praesens', 'praeteritum', 'imperativ'].includes(id)) {
        assert.ok(!/\s(?:auf|an|mit|vor|teil|zurück|weg|ab|ein|aus)[.!?]$/.test(item.prompt), `${item.id}/hidden-particle`)
      }
      if (['wuerde-form', 'konjunktiv-vergangenheit'].includes(id)) {
        const answerWords = item.answers[0].match(/[\p{L}-]+/gu) ?? []
        const verbalTail = answerWords.at(-1) ?? ''
        assert.equal(item.prompt.match(/___/g)?.length, 2, `${item.id}/hidden-verbal-unit`)
        assert.ok(verbalTail && !item.prompt.includes(verbalTail), `${item.id}/visible-verbal-tail`)
      }
    }
    const finalStories = GERMAN_STRUCTURE_QUEST.finalStories?.filter((item) => item.gaps.some((gap) => gap.tense === id)) ?? []
    assert.equal(finalStories.length, 1, `${id}/written-final-story`)
    assert.ok(finalStories[0].gaps.length >= 10, `${id}/written-final-story-gaps`)
    assert.equal(finalStories[0].segments.length, finalStories[0].gaps.length + 1, `${id}/written-final-story-shape`)
  }
})

test('German Präsens level 1 tests agreement inside Präsens and does not recycle level 2', () => {
  const choices = GERMAN_STRUCTURE_QUEST.choiceChallenges.filter((item) => item.tenses.includes('praesens'))
  const micros = GERMAN_STRUCTURE_QUEST.microStories.filter((item) => item.gaps.some((gap) => gap.tense === 'praesens'))
  const paradigms = [
    ['wohne', 'wohnst', 'wohnt', 'wohnen'],
    ['lerne', 'lernst', 'lernt', 'lernen'],
    ['trinke', 'trinkst', 'trinkt', 'trinken'],
    ['koche', 'kochst', 'kocht', 'kochen'],
    ['spiele', 'spielst', 'spielt', 'spielen'],
    ['lese', 'liest', 'lest', 'lesen'],
    ['stehe', 'stehst', 'steht', 'stehen'],
    ['mache', 'machst', 'macht', 'machen'],
    ['kaufe', 'kaufst', 'kauft', 'kaufen'],
    ['fahre', 'fährst', 'fährt', 'fahren'],
  ]

  assert.equal(choices.length, paradigms.length)
  choices.forEach((item, index) => assert.deepEqual([...item.options].sort(), [...paradigms[index]].sort(), item.id))

  const choiceContexts = new Set(choices.map((item) => item.context.replace('___', '').toLocaleLowerCase('de')))
  for (const item of micros) {
    assert.ok(!choiceContexts.has(item.segments.join('').toLocaleLowerCase('de')), item.id)
  }
})

test('German Präsens separable verbs keep the visible particle outside the answer', () => {
  const separable = new Map([
    ['aufstehen', 'auf'],
    ['anrufen', 'an'],
    ['fernsehen', 'fern'],
    ['mitbringen', 'mit'],
  ])
  const micros = GERMAN_STRUCTURE_QUEST.microStories.filter((item) => item.gaps.some((gap) => gap.tense === 'praesens'))

  for (const item of micros) {
    const gap = item.gaps[0]
    const particle = separable.get(gap.verb)
    if (!particle) continue
    assert.match(item.segments[1], new RegExp(`\\b${particle}\\.`, 'iu'), item.id)
    assert.ok(gap.answers.every((answer) => !answer.split(/\s+/u).includes(particle)), item.id)
  }
})

test('Every German level 1 bank is independent from level 2', () => {
  for (const form of GERMAN_STRUCTURE_QUEST.forms) {
    const choices = GERMAN_STRUCTURE_QUEST.choiceChallenges.filter((item) => item.tenses.includes(form.id))
    const micros = GERMAN_STRUCTURE_QUEST.microStories.filter((item) => item.gaps.some((gap) => gap.tense === form.id))
    const levelOneContexts = new Set(choices.map((item) => item.context.replace('___', '').toLocaleLowerCase('de')))
    for (const item of micros) assert.ok(!levelOneContexts.has(item.segments.join('').toLocaleLowerCase('de')), `${form.id}/${item.id}`)
  }
})

test('German compound level 1 distractors stay inside the selected construction', () => {
  const endings = new Map([
    ['perfekt-haben', /\b(?:habe|hast|hat|haben|habt)$/iu],
    ['perfekt-sein', /\b(?:bin|bist|ist|sind|seid)$/iu],
    ['plusquamperfekt', /\b(?:hatte|hattest|hatten|hattet|war|warst|waren|wart)$/iu],
    ['futur-eins', /\b(?:werde|wirst|wird|werden|werdet)$/iu],
    ['futur-zwei', /\b(?:werde|wirst|wird|werden|werdet)$/iu],
    ['wuerde-form', /\b(?:würde|würdest|würden|würdet)$/iu],
    ['konjunktiv-vergangenheit', /\b(?:hätte|hättest|hätten|hättet|wäre|wärst|wären|wärt)$/iu],
  ])

  for (const [formId, ending] of endings) {
    const choices = GERMAN_STRUCTURE_QUEST.choiceChallenges.filter((item) => item.tenses.includes(formId))
    for (const item of choices) {
      assert.ok(item.options.every((option) => ending.test(option)), item.id)
      assert.equal(new Set(item.options.map((option) => option.replace(ending, '').trim())).size, 1, item.id)
    }
  }
})

test('German compound level 1 varies target-clause connectors and placement in the runtime', () => {
  for (const [formId, spec] of Object.entries(germanHarness.forms)) {
    const contract = spec.levelOneClauseContract
    if (!contract) continue

    const choices = GERMAN_STRUCTURE_QUEST.choiceChallenges.filter((item) => item.tenses.includes(formId))
    const connectors = choices.map((item) => levelOneConnector(item.context))
    const counts = new Map()
    for (const connector of connectors) counts.set(connector, (counts.get(connector) ?? 0) + 1)
    const placements = choices.map((item) => levelOnePlacement(item.context))

    assert.equal(choices.length, 10, `${formId}/choice`)
    assert.ok(connectors.every((connector) => contract.allowedConnectors.includes(connector)), `${formId}/connectors`)
    assert.ok(counts.size >= contract.minimumDistinctConnectors, `${formId}/distinct-connectors`)
    assert.ok([...counts.values()].every((count) => count <= contract.maximumUsesPerConnector), `${formId}/connector-frequency`)
    assert.ok(choices.filter((item) => /\?\s*$/u.test(item.context)).length >= contract.minimumInterrogativeContexts, `${formId}/questions`)
    assert.ok(placements.filter((placement) => placement === 'matrix-ob').length >= contract.minimumMatrixObQuestions, `${formId}/matrix-ob`)
    assert.ok(placements.filter((placement) => placement === 'preposed').length >= contract.minimumPreposedTargetClauses, `${formId}/preposed`)
  }
})

test('German separable verbs render complete sentences without repeated or misplaced particles', () => {
  const sentences = new Map([
    ['de-imperativ-micro-editorial-6', 'Lina und Paul, nehmt eure Taschenlampen mit!'],
    ['de-imperativ-micro-editorial-8', 'Herr Klein, füllen Sie bitte dieses Formular aus!'],
    ['de-imperativ-micro-editorial-9', 'Spieler, gebt den Ball schneller ab!'],
    ['de-praesens-long-editorial-4', 'Der Produzent wählt um fünf Uhr die Themen aus. Die Redakteurin überprüft jeden Namen, und der Moderator liest um sechs Uhr die Meldungen vor.'],
  ])
  const challenges = [...GERMAN_STRUCTURE_QUEST.microStories, ...GERMAN_STRUCTURE_QUEST.longStories]
  for (const [id, expected] of sentences) {
    const item = challenges.find((item) => item.id === id)
    assert.ok(item, id)
    const rendered = item.segments.map((segment, index) => segment + (item.gaps[index]?.answers[0] ?? '')).join('')
    assert.equal(rendered, expected, id)
  }

  const correctedRepairs = GERMAN_STRUCTURE_QUEST.errorChallenges
    .filter((item) => item.tense === 'praesens')
    .map((repair) => repair.chunks.map((chunk) => chunk.before + (chunk.id === repair.wrongId ? repair.answers[0] : chunk.form)).join('') + repair.after)
  assert.ok(correctedRepairs.some((sentence) => sentence.includes('Yusuf die Werkstatt auf.')))
})

test('German level 3 and level 4 use independent sentence banks', () => {
  const normalize = (value) => value.toLocaleLowerCase('de').replace(/[^\p{L}\p{N}]+/gu, ' ').trim()
  const levelThree = new Set(GERMAN_STRUCTURE_QUEST.longStories.map((item) => normalize(
    item.segments.map((segment, index) => segment + (item.gaps[index]?.answers[0] ?? '')).join(''),
  )))
  for (const repair of GERMAN_STRUCTURE_QUEST.errorChallenges) {
    const corrected = repair.chunks
      .map((chunk) => chunk.before + (chunk.id === repair.wrongId ? repair.answers[0] : chunk.form))
      .join('') + repair.after
    assert.ok(!levelThree.has(normalize(corrected)), repair.id)
  }
})

test('German level 4 presents five-sentence texts with no selectable verb hints', () => {
  for (const repair of GERMAN_STRUCTURE_QUEST.errorChallenges) {
    assert.equal(repair.chunks.length, 5, repair.id)
    assert.ok(repair.chunks.some((chunk) => chunk.id === repair.wrongId), repair.id)
  }
  assert.equal(GERMAN_STRUCTURE_QUEST.errorIdentificationMode, 'write')
})

test('German final dossiers are autonomous and balance the four answer positions', () => {
  const positions = [0, 0, 0, 0]
  for (const form of GERMAN_STRUCTURE_QUEST.forms) {
    const finals = GERMAN_STRUCTURE_QUEST.finalChallenges.flatMap((item) => item.gaps.filter((gap) => gap.tenseId === form.id))
    assert.equal(new Set(finals.map((gap) => `${gap.standalone?.before ?? ''}___${gap.standalone?.after ?? ''}`)).size, 10, form.id)
    for (const gap of finals) {
      assert.equal(gap.candidateCardIds?.length, 4, gap.id)
      positions[gap.candidateCardIds.indexOf(gap.answerCardId)] += 1
    }
  }
  assert.ok(Math.max(...positions) - Math.min(...positions) <= 1, positions.join('/'))
})

test('Russian exposes ten editorial challenges per contrast and level', () => {
  for (const form of RUSSIAN_STRUCTURE_QUEST.forms) {
    const id = form.id
    assert.equal(RUSSIAN_STRUCTURE_QUEST.choiceChallenges.filter((item) => item.tenses.includes(id)).length, 10, `${id}/choice`)
    assert.equal(RUSSIAN_STRUCTURE_QUEST.microStories.filter((item) => item.gaps.some((gap) => gap.tense === id)).length, 10, `${id}/micro`)
    assert.equal(RUSSIAN_STRUCTURE_QUEST.longStories.filter((item) => item.gaps.some((gap) => gap.tense === id)).length, 10, `${id}/long`)
    assert.equal(RUSSIAN_STRUCTURE_QUEST.errorChallenges.filter((item) => item.tense === id).length, 10, `${id}/error`)
    assert.equal(RUSSIAN_STRUCTURE_QUEST.timelineChallenges.filter((item) => item.slots.some((slot) => slot.tense === id)).length, 10, `${id}/timeline`)
    assert.equal(RUSSIAN_STRUCTURE_QUEST.finalChallenges.filter((item) => item.gaps.some((gap) => gap.tenseId === id)).length, 10, `${id}/final`)
  }
})

test('Russian final dossiers are autonomous and balanced', () => {
  const positions = [0, 0, 0, 0]
  for (const form of RUSSIAN_STRUCTURE_QUEST.forms) {
    const finals = RUSSIAN_STRUCTURE_QUEST.finalChallenges.flatMap((item) => item.gaps.filter((gap) => gap.tenseId === form.id))
    assert.equal(new Set(finals.map((gap) => `${gap.standalone?.before ?? ''}___${gap.standalone?.after ?? ''}`)).size, 10, form.id)
    for (const gap of finals) positions[gap.candidateCardIds.indexOf(gap.answerCardId)] += 1
  }
  assert.ok(Math.max(...positions) - Math.min(...positions) <= 1, positions.join('/'))
})

test('Japanese exposes ten editorial challenges per contrast and level', () => {
  for (const form of JAPANESE_STRUCTURE_QUEST.forms) {
    const id = form.id
    assert.equal(JAPANESE_STRUCTURE_QUEST.choiceChallenges.filter((item) => item.tenses.includes(id)).length, 10, `${id}/choice`)
    assert.equal(JAPANESE_STRUCTURE_QUEST.microStories.filter((item) => item.gaps.some((gap) => gap.tense === id)).length, 10, `${id}/micro`)
    assert.equal(JAPANESE_STRUCTURE_QUEST.longStories.filter((item) => item.gaps.some((gap) => gap.tense === id)).length, 10, `${id}/long`)
    assert.equal(JAPANESE_STRUCTURE_QUEST.errorChallenges.filter((item) => item.tense === id).length, 10, `${id}/error`)
    assert.equal(JAPANESE_STRUCTURE_QUEST.timelineChallenges.filter((item) => item.slots.some((slot) => slot.tense === id)).length, 10, `${id}/timeline`)
    assert.equal(JAPANESE_STRUCTURE_QUEST.finalChallenges.filter((item) => item.gaps.some((gap) => gap.tenseId === id)).length, 10, `${id}/final`)
  }
})

test('Japanese final dossiers are autonomous and balanced', () => {
  const positions = [0, 0, 0, 0]
  for (const form of JAPANESE_STRUCTURE_QUEST.forms) {
    const finals = JAPANESE_STRUCTURE_QUEST.finalChallenges.flatMap((item) => item.gaps.filter((gap) => gap.tenseId === form.id))
    assert.equal(new Set(finals.map((gap) => `${gap.standalone?.before ?? ''}___${gap.standalone?.after ?? ''}`)).size, 10, form.id)
    for (const gap of finals) positions[gap.candidateCardIds.indexOf(gap.answerCardId)] += 1
  }
  assert.ok(Math.max(...positions) - Math.min(...positions) <= 1, positions.join('/'))
})

test('Korean exposes ten editorial challenges per contrast and level', () => {
  for (const form of KOREAN_STRUCTURE_QUEST.forms) {
    const id = form.id
    assert.equal(KOREAN_STRUCTURE_QUEST.choiceChallenges.filter((item) => item.tenses.includes(id)).length, 10, `${id}/choice`)
    assert.equal(KOREAN_STRUCTURE_QUEST.microStories.filter((item) => item.gaps.some((gap) => gap.tense === id)).length, 10, `${id}/micro`)
    assert.equal(KOREAN_STRUCTURE_QUEST.longStories.filter((item) => item.gaps.some((gap) => gap.tense === id)).length, 10, `${id}/long`)
    assert.equal(KOREAN_STRUCTURE_QUEST.errorChallenges.filter((item) => item.tense === id).length, 10, `${id}/error`)
    assert.equal(KOREAN_STRUCTURE_QUEST.timelineChallenges.filter((item) => item.slots.some((slot) => slot.tense === id)).length, 10, `${id}/timeline`)
    assert.equal(KOREAN_STRUCTURE_QUEST.finalChallenges.filter((item) => item.gaps.some((gap) => gap.tenseId === id)).length, 10, `${id}/final`)
  }
})

test('Korean final dossiers are autonomous and balanced', () => {
  const positions = [0, 0, 0, 0]
  for (const form of KOREAN_STRUCTURE_QUEST.forms) {
    const finals = KOREAN_STRUCTURE_QUEST.finalChallenges.flatMap((item) => item.gaps.filter((gap) => gap.tenseId === form.id))
    assert.equal(finals.length, 10, form.id)
    assert.equal(new Set(finals.map((gap) => `${gap.standalone?.before ?? ''}___${gap.standalone?.after ?? ''}`)).size, 10, form.id)
    for (const gap of finals) {
      assert.ok(gap.standalone?.before || gap.standalone?.after, gap.id)
      assert.equal(gap.candidateCardIds?.length, 4, gap.id)
      positions[gap.candidateCardIds.indexOf(gap.answerCardId)] += 1
    }
  }
  assert.ok(Math.max(...positions) - Math.min(...positions) <= 1, positions.join('/'))
})
