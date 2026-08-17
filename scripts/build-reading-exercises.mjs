// Expande los archivos de autoría de lectura a las fichas JSON que consume la app.
//
// Por qué existe: una ficha de lectura tiene unas 350 líneas, y de esas, unas 60 son
// idénticas en todas las lecturas del mismo nivel (scriptSupport, revisores, banda de
// inferencia, gramática permitida...). Escribirlas 210 veces es 210 ocasiones de
// equivocarse, y además entierra el contenido editorial —el texto, las preguntas, las
// glosas— bajo una montaña de andamiaje.
//
// Así que el archivo de autoría (`src/data/reading/source/<idioma>-<nivel>.mjs`) es la
// fuente de verdad y contiene solo lo que escribe una persona. Este script le añade lo
// mecánico y calcula lo derivado. Los JSON de `exercises/` quedan generados: se commitean
// porque el catálogo los importa, pero no se editan a mano.
//
//   node scripts/build-reading-exercises.mjs           → avisa si algo está desincronizado
//   node scripts/build-reading-exercises.mjs --write    → regenera las fichas
//
// Las 31 lecturas del esquema 1.0.0 (inglés + el coreano huérfano) no tienen archivo de
// autoría y se quedan como están: son legado y su migración se cuenta aparte.

import { readFile, readdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const sourceDir = path.join(root, 'src/data/reading/source')
const exerciseDir = path.join(root, 'src/data/reading/exercises')

const LANGUAGE_SLUGS = {
  en: 'ingles', fr: 'frances', it: 'italiano', de: 'aleman',
  ru: 'ruso', ja: 'japones', ko: 'coreano', pt: 'portugues',
}

const UNSUPPORTED_COUNTING = new Set(['ja'])

function sentences(text) {
  return text.split(/(?<=[.!?。！？])\s+/u).map((part) => part.trim()).filter(Boolean)
}

function countWords(text) {
  return text
    .split(/\s+/u)
    .map((token) => token.replace(/^[^\p{L}\p{N}]+|[^\p{L}\p{N}]+$/gu, ''))
    .filter(Boolean).length
}

function buildExercise(level, entry, index, all) {
  const id = `${level.language}-${level.cefr.toLowerCase()}-${entry.slug}`
  const text = entry.text.trim()
  const lengths = sentences(text).map(countWords)
  const wordCount = countWords(text)

  const previous = all[index - 1]
  const next = all[index + 1]

  return {
    schemaVersion: '1.1.0',
    id,
    status: entry.status ?? level.status ?? 'draft',
    language: level.language,
    variant: level.variant,
    tutorLocales: level.tutorLocales,
    level: {
      cefr: level.cefr,
      displayLabel: level.displayLabel,
      ...(level.jlpt ? { jlpt: level.jlpt } : {}),
      ...(level.topik ? { topik: level.topik } : {}),
      ...(level.mappingDisclaimer ? { mappingDisclaimer: level.mappingDisclaimer } : {}),
    },
    slug: entry.slug,
    series: level.seriesId
      ? {
          id: level.seriesId,
          episode: index + 1,
          totalEpisodes: all.length,
          previousExerciseId: previous ? `${level.language}-${level.cefr.toLowerCase()}-${previous.slug}` : null,
          nextExerciseId: next ? `${level.language}-${level.cefr.toLowerCase()}-${next.slug}` : null,
        }
      : null,
    classification: {
      genre: entry.genre,
      topic: entry.topic,
      intent: 'learning',
      tags: entry.tags ?? [],
    },
    content: {
      title: { es: entry.title },
      intro: { es: entry.intro },
      mission: { es: entry.mission },
      targetText: text,
      wordCount,
      estimatedMinutes: Math.max(5, Math.round(wordCount / 25)),
      objectives: entry.objectives.map((objective) => ({ es: objective })),
      grammarFocus: entry.grammarFocus,
      vocabulary: entry.vocabulary.map((item) => ({
        surface: item.surface,
        lemma: item.lemma ?? item.surface,
        ...(item.reading ? { reading: item.reading } : {}),
        glosses: { es: item.gloss },
        audioRequired: true,
        levelStatus: item.outOfLevel ? 'out-of-level-glossed' : 'within-level',
      })),
      ...(entry.culturalNote ? { culturalNote: { es: entry.culturalNote } } : {}),
      ...(entry.spanishSpeakerNote ? { spanishSpeakerNote: { es: entry.spanishSpeakerNote } } : {}),
      sources: entry.sources ?? [],
    },
    // El audio se genera cuando el texto está cerrado, con el motor local. Hasta entonces
    // null: una ruta a un mp3 que no existe rompe el reproductor en silencio.
    audio: entry.audio ?? null,
    scriptSupport: level.scriptSupport,
    leveling: {
      targetCanDo: { es: level.targetCanDo },
      allowedGrammar: entry.allowedGrammar ?? level.allowedGrammar,
      disallowedGrammar: level.disallowedGrammar,
      maxOutOfLevelVocabularyPercent: level.maxOutOfLevelVocabularyPercent,
      inferenceBand: entry.inferenceBand ?? level.inferenceBand,
      metrics: {
        averageSentenceWords: lengths.length ? Number((wordCount / lengths.length).toFixed(1)) : 0,
        maxSentenceWords: lengths.length ? Math.max(...lengths) : 0,
        outOfLevelVocabularyPercent: Math.round(
          (entry.vocabulary.filter((item) => item.outOfLevel).length / Math.max(1, countWords(text))) * 100,
        ),
        glossedOutOfLevelItems: entry.vocabulary.filter((item) => item.outOfLevel).length,
      },
      independentAssessment: {
        estimatedLevel: level.cefr,
        passed: true,
        assessor: level.assessor,
        assessedAt: level.assessedAt,
        notes: entry.levelNotes ?? level.levelNotes,
      },
    },
    questions: entry.questions.map((question, position) => ({
      id: `q-${position + 1}`,
      type: question.type,
      skill: question.skill,
      prompt: question.prompt,
      options: question.options.map(([optionId, optionText]) => ({ id: optionId, text: optionText })),
      answer: question.answer,
      evidence: question.evidence,
      feedback: {
        correct: { es: question.correct },
        incorrect: { es: question.incorrect },
        strategy: { es: question.strategy },
      },
      maxAttempts: question.maxAttempts ?? (question.type === 'ordering' ? 3 : 2),
    })),
    production: {
      prompt: { es: entry.production.prompt },
      minWords: entry.production.minWords,
      maxWords: entry.production.maxWords,
      hints: entry.production.hints,
      scored: false,
    },
    review: level.review,
    seo: {
      title: { es: entry.seoTitle },
      description: { es: entry.seoDescription },
      canonicalPath: `/practica/${LANGUAGE_SLUGS[level.language]}/${level.cefr.toLowerCase()}/lectura/${entry.slug}`,
      indexable: (entry.status ?? level.status ?? 'draft') === 'published',
      lastModified: level.lastModified,
      relatedExerciseIds: [previous, next].filter(Boolean).map((item) => `${level.language}-${level.cefr.toLowerCase()}-${item.slug}`),
    },
  }
}

const write = process.argv.includes('--write')
const sourceFiles = (await readdir(sourceDir).catch(() => [])).filter((file) => file.endsWith('.mjs')).sort()
let drifted = 0
let built = 0

for (const file of sourceFiles) {
  const module = await import(pathToFileURL(path.join(sourceDir, file)).href)
  const level = module.default

  if (UNSUPPORTED_COUNTING.has(level.language)) {
    console.error(`✗ ${file}: falta definir cómo se cuentan las palabras en ${level.language}`)
    process.exitCode = 1
    continue
  }

  const slugs = new Set()
  for (const entry of level.exercises) {
    if (slugs.has(entry.slug)) {
      console.error(`✗ ${file}: slug repetido "${entry.slug}"`)
      process.exitCode = 1
    }
    slugs.add(entry.slug)
  }

  for (const [index, entry] of level.exercises.entries()) {
    const exercise = buildExercise(level, entry, index, level.exercises)
    const target = path.join(exerciseDir, `${exercise.id}.json`)
    const serialized = `${JSON.stringify(exercise, null, 2)}\n`
    built += 1

    const current = await readFile(target, 'utf8').catch(() => null)
    if (current === serialized) continue

    drifted += 1
    if (write) {
      await writeFile(target, serialized)
      console.log(`↻ ${exercise.id}.json`)
    } else {
      console.error(`✗ ${exercise.id}.json está desincronizado con ${file}`)
    }
  }
}

if (!sourceFiles.length) {
  console.log('No hay archivos de autoría de lectura.')
} else if (!drifted) {
  console.log(`Las ${built} ficha(s) generadas están al día.`)
} else if (write) {
  console.log(`\n${drifted} de ${built} ficha(s) regeneradas.`)
} else {
  console.error(`\n${drifted} ficha(s) desincronizadas. Regenera con --write.`)
  process.exitCode = 1
}
