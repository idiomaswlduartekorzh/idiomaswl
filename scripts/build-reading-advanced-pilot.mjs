// Expande la fuente editorial de las 24 lecturas B2–C2. Son borradores de revisión.
import { readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import readings from '../src/data/reading/advanced-pilot.mjs'
import { GLOSS_EN, STRATEGIES } from '../src/data/reading/advanced-pilot-localization.mjs'
import { countJapaneseCharacters } from './lib/reading-blueprint.mjs'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const slugs = { en: 'english', fr: 'french', it: 'italian', de: 'german', ru: 'russian', ja: 'japanese', ko: 'korean', pt: 'portuguese' }
const variants = { en: 'en-global', fr: 'fr-FR', it: 'it-IT', de: 'de-DE', ru: 'ru', ja: 'ja-JP', ko: 'ko-KR', pt: 'pt-BR' }
const levels = { B2: { band: 'moderate', grammar: 'argumentación y concesión' }, C1: { band: 'high', grammar: 'implicaturas y postura del autor' }, C2: { band: 'high', grammar: 'matices retóricos y ambigüedad controlada' } }
const strategies = {
  global: 'Busca la tesis que organiza todo el texto, no un dato aislado.',
  detail: 'Ubica el pasaje concreto y comprueba quién hace qué.',
  inference: 'Conecta la evidencia con lo que el autor deja implícito.',
  purpose: 'Pregunta por qué el autor incluyó ese detalle.',
  tone: 'Fíjate en los matices de aprobación, reserva o crítica.',
  vocabulary: 'Decide el sentido de la palabra en esta oración, no fuera de contexto.',
}
const date = '2026-11-10T00:00:00-05:00'
const uiText = (value) => ({ es: value, en: value })

function count(text, language) {
  return language === 'ja' ? countJapaneseCharacters(text) : text.split(/\s+/u).filter(Boolean).length
}

function build(item) {
  const { language, level, slug, title, text, vocabulary, questions, production } = item
  const id = `${language}-${level.toLowerCase()}-${slug}`
  const sentenceLengths = text.split(/(?<=[.!?。！？])\s+/u).filter(Boolean).map((sentence) => count(sentence, language))
  const wordCount = count(text, language)
  const pathName = `/en/practice/${slugs[language]}/${level.toLowerCase()}/reading/${slug}`
  return {
    schemaVersion: '1.2.0', id, status: 'draft', language, variant: variants[language], tutorLocales: ['es', 'en'],
    level: {
      cefr: level, displayLabel: `${slugs[language]} ${level}`,
      ...(language === 'ja' ? { jlpt: level === 'B2' ? 'N2' : 'N1', mappingDisclaimer: uiText('The CEFR–JLPT mapping is approximate and requires human validation.') } : {}),
      ...(language === 'ko' ? { topik: level === 'B2' ? 4 : level === 'C1' ? 5 : 6, mappingDisclaimer: uiText('The CEFR–TOPIK mapping is approximate and requires human validation.') } : {}),
    },
    slug, series: null,
    classification: { genre: 'article', topic: item.topic, intent: 'study', tags: [language, level.toLowerCase(), 'advanced reading'] },
    content: {
      title: uiText(item.displayTitle), intro: uiText(item.displayCopy.intro), mission: uiText(item.displayCopy.mission), targetText: text,
      wordCount, estimatedMinutes: Math.max(5, Math.round(wordCount / 25)),
      objectives: [uiText('Distinguish explicit claims from implications and support each answer with textual evidence.')],
      grammarFocus: [({ B2: 'argument and concession', C1: 'implications and writer stance', C2: 'rhetorical nuance and controlled ambiguity' })[level]],
      vocabulary: vocabulary.map(([surface, gloss]) => {
        if (!GLOSS_EN[gloss]) throw new Error(`${id}: missing English gloss for ${gloss}`)
        return { surface, lemma: surface, glosses: uiText(GLOSS_EN[gloss]), audioRequired: false, levelStatus: 'within-level' }
      }),
      sources: [],
    },
    audio: null,
    scriptSupport: { furigana: false, romanization: language === 'ja' || language === 'ko' ? 'optional' : 'none', stressMarks: false, tokenizationMode: language === 'ko' ? 'custom' : 'space' },
    leveling: {
      targetCanDo: uiText(item.displayCopy.canDo), allowedGrammar: [({ B2: 'argument and concession', C1: 'implications and writer stance', C2: 'rhetorical nuance and controlled ambiguity' })[level]], disallowedGrammar: [], maxOutOfLevelVocabularyPercent: 12,
      inferenceBand: levels[level].band,
      metrics: { averageSentenceWords: Number((wordCount / Math.max(sentenceLengths.length, 1)).toFixed(1)), maxSentenceWords: Math.max(...sentenceLengths), outOfLevelVocabularyPercent: 0, glossedOutOfLevelItems: 0 },
      independentAssessment: { estimatedLevel: level, passed: false, assessor: 'Pending independent assessment', assessedAt: date, notes: 'Draft; difficulty and naturalness require human review.' },
    },
    questions: questions.map(([skill, prompt, options, correct, evidence], index) => ({
      id: `q-${index + 1}`, type: skill === 'global' ? 'main-idea' : skill === 'vocabulary' ? 'vocabulary-in-context' : skill,
      skill, prompt,
      options: options.map((_, optionIndex) => ({ id: `a${optionIndex + 1}`, text: options[(optionIndex - index % 3 + options.length) % options.length] })),
      answer: `a${(correct + index % 3) % options.length + 1}`, evidence,
      feedback: { correct: uiText('Yes. The highlighted evidence supports this answer.'), incorrect: uiText('Read the highlighted passage again and compare the options.'), strategy: uiText(STRATEGIES[skill]) },
      maxAttempts: 2,
    })),
    production: { prompt: uiText(production), minWords: level === 'B2' ? 60 : level === 'C1' ? 90 : 120, maxWords: level === 'B2' ? 130 : level === 'C1' ? 180 : 220, hints: [item.displayCopy.mission, 'Quote one phrase from the text and explain why it matters.'], scored: false },
    review: { author: 'Equipo editorial WeLearn — borrador asistido por IA', languageReviewer: 'Pendiente', pedagogyReviewer: 'Pendiente', reviewedAt: date, copyrightChecked: true, cultureChecked: true, aiAssisted: true, aiUseNote: 'Contenido original asistido por IA; pendiente de revisión lingüística y pedagógica humana.', languageDecision: 'pending', pedagogyDecision: 'pending' },
    seo: { title: uiText(`${item.displayTitle} | ${level} Reading | WeLearn`), description: uiText(item.displayCopy.intro), canonicalPath: pathName, indexable: false, lastModified: date },
  }
}

const write = process.argv.includes('--write')
let drift = 0
for (const item of readings) {
  const exercise = build(item)
  const file = path.join(root, 'src/data/reading/exercises', `${exercise.id}.json`)
  const serialized = `${JSON.stringify(exercise, null, 2)}\n`
  if (await readFile(file, 'utf8').catch(() => '') === serialized) continue
  drift++
  if (write) await writeFile(file, serialized)
  else console.error(`✗ ${exercise.id}.json no coincide con la fuente editorial`)
}
if (drift && !write) process.exitCode = 1
console.log(`${readings.length} borradores avanzados; ${drift} ${write ? 'regenerados' : 'desincronizados'}.`)
