#!/usr/bin/env node

import { existsSync, readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { ENGLISH_TENSE_QUEST } from '../src/data/practica/english-tense-quest-config.ts'
import { FRENCH_STRUCTURE_QUEST } from '../src/data/practica/french-structure-quest-config.ts'
import { GERMAN_STRUCTURE_QUEST } from '../src/data/practica/german-structure-quest-config.ts'
import { ITALIAN_TENSE_QUEST } from '../src/data/practica/italian-tense-quest-config.ts'
import { JAPANESE_STRUCTURE_QUEST } from '../src/data/practica/japanese-structure-quest-config.ts'
import { KOREAN_STRUCTURE_QUEST } from '../src/data/practica/korean-structure-quest-config.ts'
import { PORTUGUESE_STRUCTURE_QUEST } from '../src/data/practica/portuguese-structure-quest-config.ts'
import { RUSSIAN_STRUCTURE_QUEST } from '../src/data/practica/russian-structure-quest-config.ts'
import { selectMixedChallenges } from '../src/data/practica/tense-quest-selection.ts'

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const policyFile = path.join(repoRoot, 'config/tense-quest-harness/policy.json')
const policy = JSON.parse(readFileSync(policyFile, 'utf8'))
const configs = [
  ['italian', ITALIAN_TENSE_QUEST, 'it'],
  ['english', ENGLISH_TENSE_QUEST, 'en'],
  ['french', FRENCH_STRUCTURE_QUEST, 'fr'],
  ['portuguese', PORTUGUESE_STRUCTURE_QUEST, 'pt-BR'],
  ['german', GERMAN_STRUCTURE_QUEST, 'de'],
  ['russian', RUSSIAN_STRUCTURE_QUEST, 'ru'],
  ['japanese', JAPANESE_STRUCTURE_QUEST, 'ja'],
  ['korean', KOREAN_STRUCTURE_QUEST, 'ko'],
]

const failures = []
const fail = (condition, message) => { if (!condition) failures.push(message) }
const normalize = (value, locale) => String(value)
  .replaceAll('___', ' ')
  .normalize('NFKC')
  .toLocaleLowerCase(locale)
  .replace(/[^\p{L}\p{N}]+/gu, ' ')
  .trim()
const renderGap = (challenge) => challenge.segments
  .map((segment, index) => segment + (challenge.gaps[index]?.answers[0] ?? ''))
  .join('')
const renderCorrection = (challenge) => challenge.chunks
  .map((chunk) => chunk.before + (chunk.id === challenge.wrongId ? challenge.answers[0] : chunk.form))
  .join('') + challenge.after

function repeatedToken(value, locale) {
  const tokens = String(value).normalize('NFKC').toLocaleLowerCase(locale).match(/[\p{L}\p{N}]+/gu) ?? []
  for (let index = 1; index < tokens.length; index += 1) {
    if (tokens[index] === tokens[index - 1]) return `${tokens[index - 1]} ${tokens[index]}`
  }
  return null
}

function maximumRun(values) {
  let maximum = 0
  let current = 0
  let previous
  for (const value of values) {
    current = value === previous ? current + 1 : 1
    previous = value
    maximum = Math.max(maximum, current)
  }
  return maximum
}

function periodicAccuracy(values, period) {
  return values.filter((value, index) => value === values[index % period]).length / values.length
}

function sceneFeatures(value, locale) {
  const normalized = normalize(value, locale)
  if (locale === 'ja' || locale === 'ko') {
    const characters = [...normalized.replaceAll(' ', '')]
    return new Set(characters.slice(0, -1).map((character, index) => `${character}${characters[index + 1]}`))
  }
  return new Set(normalized.split(' ').filter(Boolean))
}

function jaccard(left, right) {
  if (!left.size && !right.size) return 1
  const intersection = [...left].filter((feature) => right.has(feature)).length
  return intersection / (left.size + right.size - intersection)
}

function openingSignature(value, locale) {
  const normalized = normalize(value, locale)
  if (locale === 'ja' || locale === 'ko') return [...normalized.replaceAll(' ', '')].slice(0, 6).join('')
  return normalized.split(' ').slice(0, 3).join(' ')
}

const connectorProfiles = {
  italian: ['perché', 'quando', 'non appena', 'mentre'],
  english: ['that', 'because', 'although', 'as soon as'],
  french: ['parce que', 'lorsque', 'dès que', 'pendant que'],
  portuguese: ['porque', 'quando', 'assim que', 'enquanto'],
  german: ['dass', 'weil', 'obwohl', 'sobald'],
  russian: ['потому что', 'когда', 'как только', 'пока'],
  japanese: ['ので', 'から', 'とき', 'ため'],
  korean: ['때문에', '때', '후에', '전에'],
}

for (const [language, config, locale] of configs) {
  fail(policy.languages.includes(language), `${language}: falta en policy.languages`)
  fail(config.errorIdentificationMode === policy.contracts.errorIdentificationMode, `${language}: nivel 4 debe ocultar los verbos y exigir identificación escrita`)

  for (const form of config.forms) {
    const choices = config.choiceChallenges.filter((item) => item.tenses.includes(form.id))
    const micros = config.microStories.filter((item) => item.gaps.some((gap) => gap.tense === form.id))
    const longs = config.longStories.filter((item) => item.gaps.some((gap) => gap.tense === form.id))
    const errors = config.errorChallenges.filter((item) => item.tense === form.id)
    const timelines = config.timelineChallenges.filter((item) => item.slots.some((slot) => slot.tense === form.id))
    const finalStories = (config.finalStories ?? []).filter((item) => item.gaps.some((gap) => gap.tense === form.id))
    const expected = policy.contracts.itemsPerFormPerLevel

    for (const [level, items] of [[1, choices], [2, micros], [3, longs], [4, errors]]) {
      fail(items.length === expected, `${language}/${form.id}/L${level}: ${items.length}/${expected} retos`)
    }

    const levelOne = new Set(choices.map((item) => normalize(item.context, locale)))
    const levelTwo = new Set(micros.map((item) => normalize(item.segments.join(''), locale)))
    const overlap12 = [...levelOne].filter((scene) => levelTwo.has(scene))
    fail(overlap12.length === policy.contracts.levelOneLevelTwoExactOverlap, `${language}/${form.id}: L1-L2 repiten ${overlap12.length} escenas`)

    const nearDuplicates = choices.flatMap((choice) => micros.map((micro) => ({
      score: jaccard(sceneFeatures(choice.context, locale), sceneFeatures(micro.segments.join(''), locale)),
      choice: choice.id,
      micro: micro.id,
    }))).filter(({ score }) => score > policy.contracts.levelOneLevelTwoMaximumSimilarity)
    fail(nearDuplicates.length === 0, `${language}/${form.id}: L1-L2 tienen ${nearDuplicates.length} escenas demasiado similares${nearDuplicates[0] ? ` (${nearDuplicates[0].choice} ↔ ${nearDuplicates[0].micro}: ${nearDuplicates[0].score.toFixed(2)})` : ''}`)

    const choicePositions = choices.map((challenge) => challenge.options.indexOf(challenge.answer))
    fail(choicePositions.every((position) => position >= 0), `${language}/${form.id}/L1: hay respuestas ausentes de sus opciones`)
    fail(new Set(choicePositions).size >= policy.contracts.choiceMinimumAnswerPositionsPerForm, `${language}/${form.id}/L1: usa menos de tres posiciones de respuesta`)
    fail(maximumRun(choicePositions) <= policy.contracts.choiceMaximumAnswerPositionRun, `${language}/${form.id}/L1: racha predecible de respuestas`)
    for (let period = 1; period <= 4; period += 1) {
      fail(periodicAccuracy(choicePositions, period) <= policy.contracts.choiceMaximumPeriodicAccuracy, `${language}/${form.id}/L1: patrón de posiciones predecible con período ${period}`)
    }

    const openings = new Set(choices.map((challenge) => openingSignature(challenge.context, locale)))
    fail(openings.size >= policy.contracts.minimumSyntacticFamiliesPerTen, `${language}/${form.id}/L1: solo ${openings.size} aperturas sintácticas distintas`)
    const normalizedChoices = choices.map((challenge) => ` ${normalize(challenge.context, locale)} `)
    for (const connector of connectorProfiles[language]) {
      const normalizedConnector = normalize(connector, locale)
      const repetitions = normalizedChoices.filter((context) => context.includes(` ${normalizedConnector} `) || (locale === 'ja' || locale === 'ko') && context.includes(normalizedConnector)).length
      fail(repetitions <= policy.contracts.maximumRepeatedConnectorPerTen, `${language}/${form.id}/L1: el conector «${connector}» aparece ${repetitions}/10 veces`)
    }

    const finalScenes = new Set(config.finalChallenges.flatMap((item) => item.gaps
      .filter((gap) => gap.tenseId === form.id)
      .map((gap) => normalize(`${gap.standalone?.before ?? ''}___${gap.standalone?.after ?? ''}`, locale))))
    const overlap16 = [...levelOne].filter((scene) => finalScenes.has(scene))
    fail(overlap16.length === policy.contracts.levelOneLevelSixExactOverlap, `${language}/${form.id}: L1-L6 repiten ${overlap16.length} escenas`)

    const levelThree = new Set(longs.map((item) => normalize(renderGap(item), locale)))
    const levelFour = new Set(errors.map((item) => normalize(renderCorrection(item), locale)))
    const overlap34 = [...levelThree].filter((scene) => levelFour.has(scene))
    fail(overlap34.length === policy.contracts.levelThreeLevelFourExactOverlap, `${language}/${form.id}: L3-L4 repiten ${overlap34.length} escenas corregidas`)

    fail(finalStories.length === 1, `${language}/${form.id}/L6: se requiere un dossier escrito por forma`)
    if (finalStories[0]) {
      fail(finalStories[0].gaps.length >= expected, `${language}/${form.id}/L6: ${finalStories[0].gaps.length}/${expected} respuestas escritas`)
      fail(finalStories[0].segments.length === finalStories[0].gaps.length + 1, `${language}/${form.id}/L6: estructura de texto inválida`)
      const formLabels = new Set([form.id, form.label, finalStories[0].focus].map((value) => normalize(value ?? '', locale)).filter(Boolean))
      for (const gap of finalStories[0].gaps) {
        const verb = normalize(gap.verb ?? '', locale)
        fail(Boolean(verb), `${gap.id}: el dossier final carece del lema que debe conjugarse`)
        fail(!formLabels.has(verb), `${gap.id}: muestra el nombre del tiempo («${gap.verb}») en vez del lema`)
      }
    }

    if (!config.separationChallenges?.length) {
      fail(timelines.length === expected, `${language}/${form.id}/L5: ${timelines.length}/${expected} retos`)
      for (const challenge of timelines) {
        for (const slot of challenge.slots) {
          const production = slot.production
          fail(Boolean(production), `${challenge.id}: nivel 5 carece de producción escrita`)
          if (!production) continue
          fail(production.tokens.length >= 2, `${challenge.id}: nivel 5 carece de elementos reordenables`)
          fail(production.answers.length >= 1, `${challenge.id}: nivel 5 carece de respuesta completa`)
          fail(production.answers.every((answer) => !answer.includes('___')), `${challenge.id}: nivel 5 conserva un hueco en la respuesta`)
          fail(!production.answers.includes(production.tokens.join(' ')), `${challenge.id}: nivel 5 presenta los elementos en el orden resuelto`)
        }
      }
    }
  }

  const rendered = [
    ...config.microStories.map(renderGap),
    ...config.longStories.map(renderGap),
    ...config.errorChallenges.map(renderCorrection),
    ...(config.finalStories ?? []).map(renderGap),
  ]
  for (const text of rendered) {
    const duplicate = repeatedToken(text, locale)
    const licensed = (language === 'english' && duplicate === 'had had') || (language === 'german' && duplicate === 'werden werden')
    if (duplicate && !licensed) {
      failures.push(`${language}: token duplicado en texto correcto: «${duplicate}»`)
    }
  }

  const allFormIds = config.forms.map((form) => form.id)
  const mixedLevels = [
    [1, config.choiceChallenges, (item, tense) => item.tenses.includes(tense)],
    [2, config.microStories, (item, tense) => item.gaps.some((gap) => gap.tense === tense)],
    [3, config.longStories, (item, tense) => item.gaps.some((gap) => gap.tense === tense)],
    [4, config.errorChallenges, (item, tense) => item.tense === tense],
    config.separationChallenges?.length
      ? [5, config.separationChallenges, (item, tense) => item.tense === tense]
      : [5, config.timelineChallenges, (item, tense) => item.slots.some((slot) => slot.tense === tense)],
  ]
  for (const selected of [allFormIds.slice(0, 2), allFormIds]) {
    for (const [level, items, matcher] of mixedLevels) {
      const route = selectMixedChallenges(items, selected, matcher, `${config.id}:level-${level}`)
      const targets = route.map((item) => selected.find((tense) => matcher(item, tense)))
      const expectedMinimum = Math.min(items.length, policy.contracts.mixedLevelMinimumItems, policy.contracts.mixedLevelMaximumItems)
      fail(route.length >= expectedMinimum, `${language}/L${level}: recorrido mixto demasiado corto (${route.length})`)
      fail(route.length <= policy.contracts.mixedLevelMaximumItems, `${language}/L${level}: recorrido mixto supera ${policy.contracts.mixedLevelMaximumItems}`)
      if (policy.contracts.mixedLevelMustCoverEverySelectedForm) {
        for (const tense of selected) fail(targets.includes(tense), `${language}/L${level}: el recorrido mixto omite ${tense}`)
      }
      fail(maximumRun(targets) <= policy.contracts.mixedLevelMaximumSameFormRun, `${language}/L${level}: agrupa demasiados retos de la misma forma`)
    }
  }
}

for (const role of policy.pipeline) {
  const prompt = policy.roles[role]
  fail(typeof prompt === 'string' && existsSync(path.join(repoRoot, prompt)), `harness: falta prompt del rol ${role}`)
}

if (failures.length) {
  console.error(`Harness pedagógico multilingüe: FAIL (${failures.length})`)
  failures.forEach((failure) => console.error(`- ${failure}`))
  process.exit(1)
}

const forms = configs.reduce((sum, [, config]) => sum + config.forms.length, 0)
console.log(`✓ Harness pedagógico multilingüe: ${configs.length} idiomas, ${forms} formas, ${policy.pipeline.length} revisores y cero fugas entre niveles adyacentes`)
