import { readFile, readdir, statfs, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { ADVANCED_BRIEFS } from '../src/data/reading/advanced-scale-briefs.mjs'
import { countJapaneseCharacters } from './lib/reading-blueprint.mjs'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const exerciseDir = path.join(root, 'src/data/reading/exercises')
const catalogFile = path.join(root, 'src/data/reading/advanced-scale-catalog.ts')
const args = Object.fromEntries(process.argv.slice(2).filter((arg) => arg.startsWith('--') && arg.includes('=')).map((arg) => arg.slice(2).split(/=(.*)/s).slice(0, 2)))
const languages = { en: 'English', fr: 'French', it: 'Italian', de: 'German', pt: 'Brazilian Portuguese', ru: 'Russian', ja: 'Japanese', ko: 'Korean' }
const levels = ['B2', 'C1', 'C2']
const slugs = { en: 'english', fr: 'french', it: 'italian', de: 'german', pt: 'portuguese', ru: 'russian', ja: 'japanese', ko: 'korean' }
const units = { en: 'words', fr: 'words', it: 'words', de: 'words', pt: 'words', ru: 'words', ja: 'Japanese characters excluding spaces', ko: 'Korean eojeol separated by spaces' }
const targets = { B2: { en: [400, 700], ja: [800, 1300], ko: [220, 380] }, C1: { en: [650, 1100], ja: [1200, 1900], ko: [340, 550] }, C2: { en: [800, 1500], ja: [1600, 2500], ko: [430, 700] } }
const skills = ['global', 'detail', 'inference', 'purpose', 'tone', 'vocabulary']
const date = new Date().toISOString()
const minimumFreeBytes = 1_000_000_000
const ui = (value) => ({ es: value, en: value })
const count = (text, language) => language === 'ja' ? countJapaneseCharacters(text) : text.trim().split(/\s+/u).filter(Boolean).length
const target = (language, level) => targets[level][language] ?? targets[level].en
async function ensureDiskSpace() {
  const disk = await statfs(root)
  if (disk.bavail * disk.bsize < minimumFreeBytes) throw new Error('Less than 1 GB of free disk space; stop generation before writing another draft.')
}

function nearestSurface(text, surface) {
  const source = [...text.matchAll(/[\p{L}\p{N}]+/gu)].map((match) => ({ value: match[0], start: match.index, end: match.index + match[0].length }))
  const wanted = surface.match(/[\p{L}\p{N}]+/gu) ?? []
  if (!wanted.length || wanted.length > 4) return null
  const normalize = (value) => value.normalize('NFKD').replace(/\p{M}/gu, '').toLocaleLowerCase()
  const similarity = (left, right) => {
    const a = normalize(left)
    const b = normalize(right)
    const row = Array.from({ length: b.length + 1 }, (_, index) => index)
    for (let i = 1; i <= a.length; i++) {
      let diagonal = row[0]
      row[0] = i
      for (let j = 1; j <= b.length; j++) {
        const previous = row[j]
        row[j] = Math.min(row[j] + 1, row[j - 1] + 1, diagonal + (a[i - 1] === b[j - 1] ? 0 : 1))
        diagonal = previous
      }
    }
    return 1 - row[b.length] / Math.max(a.length, b.length, 1)
  }
  let winner = null
  let best = 0
  for (let index = 0; index <= source.length - wanted.length; index++) {
    const scores = wanted.map((word, offset) => similarity(word, source[index + offset].value))
    if (scores.some((score) => score < 0.72)) continue
    const score = scores.reduce((sum, value) => sum + value, 0) / scores.length
    if (score > best) {
      best = score
      winner = text.slice(source[index].start, source[index + wanted.length - 1].end)
    }
  }
  return best >= 0.78 ? winner : null
}

if (args.language && !languages[args.language]) throw new Error(`Unknown language: ${args.language}`)
if (args.level && !levels.includes(args.level)) throw new Error(`Unknown level: ${args.level}`)
const maximum = args.limit ? Number(args.limit) : Infinity
if (!Number.isInteger(maximum) && maximum !== Infinity || maximum < 1) throw new Error('Invalid --limit')
const provider = args.provider ?? 'gemini'
if (!['gemini', 'groq'].includes(provider)) throw new Error('Invalid --provider')

function prompt(language, level, brief) {
  const [min, max] = target(language, level)
  return `Create ONE original, fictional educational reading exercise in ${languages[language]} at CEFR ${level}. Return only a valid JSON object. The public-facing text must contain no Spanish. The English glosses and support copy may be in English.\n\nEditorial brief: ${brief[level]}\nTopic: ${brief.topic}. Genre: ${brief.genre}. Write a specific situation with named roles, concrete details, a conflict and a consequential ending. Keep the timeline internally coherent: an evening event cannot cause earlier morning sales. Avoid unnecessary exact percentages or dates. The text must be genuinely different from other topics, without real organisations or unverifiable facts.\n\nLength: ${min}–${max} ${units[language]}; AIM FOR ${Math.round(min + (max - min) * 0.4)} ${units[language]}. Plan five substantial paragraphs before writing. B2: clear argument with a concession. C1: implicit position and competing interpretations. C2: rhetorical nuance and an unresolved tension. Do not inflate with repetition.\n\nReturn a JSON object with exactly these top-level fields: title, intro, mission, text, vocabulary, questions, production. Title, intro, mission, text and production are strings. Vocabulary is an array of objects with string fields surface and gloss. Questions is an array of objects with fields skill, prompt, options, correct and evidence; options contains three strings and correct is an integer from 0 to 2. Do not copy field descriptions into the JSON response.\n\nExactly six vocabulary entries; each surface MUST be copied literally from text and gloss must be in English. Exactly six questions in this skill order: ${skills.join(', ')}. Each question has three plausible options in ${languages[language]}, correct is a 0-based index, and evidence MUST be copied verbatim as an exact contiguous substring of text, preserving spelling and punctuation. Ask precise, answerable questions, never generic pros/cons. Wrong options must be plausible but contradicted or unsupported. The correct option must NOT always be longest; arrange two correct answers shortest, two middle, and two longest by character count across the six questions. Title, intro, mission, text, question prompts/options and production prompt are all in ${languages[language]}. No markdown, no extra keys.`
}

async function requestGemini(message) {
  const key = process.env.GEMINI_API_KEY
  if (!key) throw new Error('GEMINI_API_KEY is not configured')
  const model = args.model ?? 'gemini-3.1-flash-lite'
  if (!['gemini-3.8-flash', 'gemini-3.6-flash', 'gemini-3.5-flash-lite', 'gemini-3.1-flash-lite', 'gemini-3-flash-preview', 'gemini-2.5-flash-lite', 'gemini-2.5-flash'].includes(model)) throw new Error('Unsupported Gemini model')
  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`, {
    method: 'POST', headers: { 'content-type': 'application/json', 'x-goog-api-key': key },
    body: JSON.stringify({ contents: [{ role: 'user', parts: [{ text: message }] }], generationConfig: {
      responseMimeType: 'application/json', temperature: 0.55,
      thinkingConfig: model.startsWith('gemini-2.5-') ? { thinkingBudget: 0 } : { thinkingLevel: model === 'gemini-3.8-flash' ? 'low' : 'minimal' },
    } }),
    signal: AbortSignal.timeout(120_000),
  })
  const result = await response.json()
  if (!response.ok) throw new Error(`Gemini ${response.status}: ${result.error?.message?.slice(0, 800) ?? 'unknown error'}`)
  return result.candidates?.[0]?.content?.parts?.map((part) => part.text ?? '').join('') ?? ''
}

async function requestGroq(message) {
  const key = process.env.GROQ_API_KEY
  if (!key) throw new Error('GROQ_API_KEY is not configured')
  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST', headers: { 'content-type': 'application/json', authorization: `Bearer ${key}` },
    body: JSON.stringify({ model: 'openai/gpt-oss-120b', messages: [{ role: 'user', content: message }], temperature: 0.55, reasoning_effort: 'low', include_reasoning: false, max_completion_tokens: 6500 }),
    signal: AbortSignal.timeout(120_000),
  })
  const result = await response.json()
  if (!response.ok) throw new Error(`Groq ${response.status}: ${result.error?.message?.slice(0, 180) ?? 'unknown error'}`)
  return result.choices?.[0]?.message?.content ?? ''
}

function parseAndCheck(raw, language, level, { allowShort = false } = {}) {
  const item = JSON.parse(raw.replace(/^```(?:json)?\s*|\s*```$/g, '').trim())
  const errors = []
  for (const key of ['title', 'intro', 'mission', 'text', 'production']) {
    const minimum = key === 'title' ? 3 : ['ja', 'ko'].includes(language) ? 6 : 10
    if (typeof item[key] !== 'string' || Array.from(item[key].trim()).length < minimum) errors.push(`${key} missing`)
  }
  if (errors.length) throw new Error(errors.join('; '))
  const length = count(item.text, language)
  const [min, max] = target(language, level)
  if ((!allowShort && length < min) || length > max) errors.push(`length ${length}, expected ${min}–${max}`)
  if (!Array.isArray(item.vocabulary) || item.vocabulary.length !== 6) errors.push('expected six vocabulary items')
  else for (const vocab of item.vocabulary) {
    if (typeof vocab.surface !== 'string' || typeof vocab.gloss !== 'string' || !vocab.gloss.trim()) { errors.push('invalid vocabulary surface/gloss'); continue }
    if (!item.text.includes(vocab.surface)) {
      const index = item.text.toLocaleLowerCase().indexOf(vocab.surface.toLocaleLowerCase())
      if (index >= 0) vocab.surface = item.text.slice(index, index + vocab.surface.length)
      else {
        const replacement = nearestSurface(item.text, vocab.surface)
        if (replacement) vocab.surface = replacement
        else errors.push(`vocabulary surface absent from text: ${vocab.surface.slice(0, 70)}`)
      }
    }
  }
  if (!Array.isArray(item.questions) || item.questions.length !== 6) errors.push('expected six questions')
  else item.questions.forEach((question, index) => {
    // The six prompts are requested in this order; normalize translated skill labels.
    question.skill = skills[index]
    if (typeof question.prompt !== 'string' || Array.from(question.prompt.trim()).length < (['ja', 'ko'].includes(language) ? 6 : 12)) errors.push(`question ${index + 1}: prompt`)
    if (!Array.isArray(question.options) || question.options.length !== 3 || question.options.some((option) => typeof option !== 'string' || !option.trim())) errors.push(`question ${index + 1}: options`)
    if (![0, 1, 2].includes(question.correct)) errors.push(`question ${index + 1}: correct`)
    if (typeof question.evidence !== 'string' || !item.text.includes(question.evidence)) {
      const position = typeof question.evidence === 'string' ? item.text.toLocaleLowerCase().indexOf(question.evidence.toLocaleLowerCase()) : -1
      if (position >= 0) question.evidence = item.text.slice(position, position + question.evidence.length)
      else errors.push(`question ${index + 1}: evidence`)
    }
  })
  if (errors.length) throw new Error(errors.join('; '))
  return item
}

async function extendIfNeeded(item, language, level, call) {
  const [minimum] = target(language, level)
  for (let attempt = 0; attempt < 2 && count(item.text, language) < minimum; attempt++) {
    const needed = minimum - count(item.text, language) + Math.min(120, Math.round(minimum * 0.15))
    const raw = await call(`Return only a JSON object with one string field, "paragraph". Write a coherent additional final paragraph in ${languages[language]} of about ${needed} ${units[language]}. It must develop a consequence or counterargument of this fictional ${level} reading without contradicting any fact, undoing its ending, or repeating sentences. Preserve the same style. Existing text:\n${item.text}`)
    const addition = JSON.parse(raw.replace(/^```(?:json)?\s*|\s*```$/g, '').trim()).paragraph
    if (typeof addition !== 'string' || !addition.trim()) throw new Error('Expansion paragraph missing')
    item.text = `${item.text.trim()}\n\n${addition.trim()}`
  }
  return item
}

function answerRank(question) {
  const sizes = question.options.map((option) => Array.from(option).length)
  const correct = sizes[question.correct]
  return correct === Math.max(...sizes) ? 'longest' : correct === Math.min(...sizes) ? 'shortest' : 'middle'
}

async function balanceOptionLengths(item, language, call) {
  const desired = ['shortest', 'middle', 'longest', 'shortest', 'middle', 'longest']
  const needed = item.questions.map((question, index) => ({ question, index })).filter(({ question, index }) => answerRank(question) !== desired[index])
  if (!needed.length) return item
  const message = `Return only a JSON object with a replacements array. Each item needs an integer index and wrongOptions with exactly two strings. Rewrite the two WRONG answer options for each question below in ${languages[language]}. Keep the correct answer unchanged. Each new wrong option must remain plausible but clearly false or unsupported by the quoted evidence; avoid silly, generic or meta distractors. Make their lengths such that the correct answer has the requested STRICT rank by Unicode character count: shortest means both wrong options longer, middle means one shorter and one longer, longest means both shorter. No ties. Respond for every requested index.\n${needed.map(({ question, index }) => JSON.stringify({ index, prompt: question.prompt, evidence: question.evidence, correct: question.options[question.correct], wrongOptions: question.options.filter((_, optionIndex) => optionIndex !== question.correct), desiredRank: desired[index] })).join('\n')}`
  try {
    const raw = await call(message)
    const result = JSON.parse(raw.replace(/^```(?:json)?\s*|\s*```$/g, '').trim())
    if (!Array.isArray(result.replacements)) return item
    const candidate = structuredClone(item)
    for (const replacement of result.replacements) {
      if (!Number.isInteger(replacement.index) || !needed.some((entry) => entry.index === replacement.index) || !Array.isArray(replacement.wrongOptions) || replacement.wrongOptions.length !== 2 || replacement.wrongOptions.some((option) => typeof option !== 'string' || option.trim().length < 3)) continue
      const question = candidate.questions[replacement.index]
      const original = structuredClone(question)
      let wrongIndex = 0
      question.options = question.options.map((option, index) => index === question.correct ? option : replacement.wrongOptions[wrongIndex++].trim())
      const rankIndex = { shortest: 0, middle: 1, longest: 2 }
      const oldDistance = Math.abs(rankIndex[answerRank(original)] - rankIndex[desired[replacement.index]])
      const newDistance = Math.abs(rankIndex[answerRank(question)] - rankIndex[desired[replacement.index]])
      if (newDistance >= oldDistance) candidate.questions[replacement.index] = original
    }
    return candidate
  } catch (error) { console.error(`Option-length repair skipped: ${error.message}`) }
  return item
}

function makeExercise(item, language, level, brief, template) {
  const id = `${language}-${level.toLowerCase()}-${brief.slug}`
  const wordCount = count(item.text, language)
  const exercise = structuredClone(template)
  exercise.id = id
  exercise.slug = brief.slug
  exercise.classification = { genre: brief.genre, topic: brief.topic, intent: 'study', tags: [language, level.toLowerCase(), 'advanced reading'] }
  exercise.content = { ...exercise.content, title: ui(item.title.trim()), intro: ui(item.intro.trim()), mission: ui(item.mission.trim()), targetText: item.text.trim(), wordCount, estimatedMinutes: Math.min(30, Math.max(7, Math.round(wordCount / (language === 'ja' ? 120 : language === 'ko' ? 24 : 60)))), vocabulary: item.vocabulary.map((vocab) => ({ surface: vocab.surface, lemma: vocab.surface, glosses: ui(vocab.gloss), audioRequired: false, levelStatus: 'within-level' })) }
  exercise.leveling.metrics = { averageSentenceWords: Number((wordCount / Math.max(item.text.split(/[.!?。！？]+/u).filter(Boolean).length, 1)).toFixed(1)), maxSentenceWords: Math.max(...item.text.split(/[.!?。！？]+/u).filter(Boolean).map((sentence) => count(sentence, language))), outOfLevelVocabularyPercent: 0, glossedOutOfLevelItems: 0 }
  exercise.questions = item.questions.map((question, index) => {
    const correctText = question.options[question.correct]
    const others = question.options.filter((_, optionIndex) => optionIndex !== question.correct)
    const position = index % 3
    const ordered = [...others]
    ordered.splice(position, 0, correctText)
    return { id: `q-${index + 1}`, type: question.skill === 'global' ? 'main-idea' : question.skill === 'vocabulary' ? 'vocabulary-in-context' : question.skill, skill: question.skill, prompt: question.prompt, options: ordered.map((text, optionIndex) => ({ id: `a${optionIndex + 1}`, text })), answer: `a${position + 1}`, evidence: question.evidence, feedback: { correct: ui('Yes. The highlighted evidence supports this answer.'), incorrect: ui('Read the highlighted passage again and compare the options.'), strategy: template.questions[index].feedback.strategy }, maxAttempts: 2 }
  })
  exercise.production = { ...exercise.production, prompt: ui(item.production.trim()), hints: [item.mission.trim(), 'Quote one phrase from the text and explain why it matters.'] }
  exercise.review = { ...exercise.review, author: 'WeLearn editorial draft assisted by AI', languageReviewer: 'Pending', pedagogyReviewer: 'Pending', reviewedAt: date, languageDecision: 'pending', pedagogyDecision: 'pending', aiAssisted: true, aiUseNote: 'Original AI-assisted draft; requires human language and pedagogy review.' }
  exercise.leveling.independentAssessment = { estimatedLevel: level, passed: false, assessor: 'Pending independent assessment', assessedAt: date, notes: 'Difficulty and naturalness require human review.' }
  exercise.seo = { title: ui(`${item.title.trim()} | ${level} Reading | WeLearn`), description: ui(item.intro.trim()), canonicalPath: `/en/practice/${slugs[language]}/${level.toLowerCase()}/reading/${brief.slug}`, indexable: false, lastModified: date }
  return exercise
}

async function rebuildCatalog() {
  const files = (await readdir(exerciseDir)).filter((file) => /^(en|fr|it|de|pt|ru|ja|ko)-(b2|c1|c2)-/.test(file) && file.endsWith('.json'))
  const generated = files.filter((file) => ADVANCED_BRIEFS.some((brief) => file.endsWith(`-${brief.slug}.json`))).sort()
  const entries = generated.map((file) => `  require('./exercises/${file}')`)
  await writeFile(catalogFile, `/* eslint-disable @typescript-eslint/no-require-imports */\n// Generated by scripts/generate-reading-advanced-free.mjs. New items remain drafts.\n// Static require keeps the large JSON shapes out of TypeScript's inference graph.\nexport const ADVANCED_SCALE_EXERCISES: unknown[] = [\n${entries.join(',\n')}\n]\n`)
}

if (args['input-file']) {
  const language = args.language
  const level = args.level
  const brief = ADVANCED_BRIEFS.find((entry) => entry.slug === args.slug)
  if (!language || !level || !brief) throw new Error('Import requires --language, --level and a known --slug')
  const filename = `${language}-${level.toLowerCase()}-${brief.slug}.json`
  if ((await readdir(exerciseDir)).includes(filename)) throw new Error(`${filename} already exists; refusing to overwrite it`)
  const templateName = (await readdir(exerciseDir)).find((file) => file.startsWith(`${language}-${level.toLowerCase()}-`) && !ADVANCED_BRIEFS.some((candidate) => file.endsWith(`-${candidate.slug}.json`)))
  if (!templateName) throw new Error(`No pilot template for ${language}/${level}`)
  const item = parseAndCheck(await readFile(args['input-file'], 'utf8'), language, level)
  const template = JSON.parse(await readFile(path.join(exerciseDir, templateName), 'utf8'))
  const exercise = makeExercise(item, language, level, brief, template)
  await ensureDiskSpace()
  await writeFile(path.join(exerciseDir, filename), `${JSON.stringify(exercise, null, 2)}\n`)
  await rebuildCatalog()
  console.log(`✓ ${exercise.id}: ${exercise.content.wordCount} ${units[language]} (manual draft; review pending)`)
  process.exit(0)
}

const selectedLanguages = args.language ? [args.language] : Object.keys(languages)
const selectedLevels = args.level ? [args.level] : levels
const jobs = selectedLanguages.flatMap((language) => selectedLevels.flatMap((level) => ADVANCED_BRIEFS.map((brief) => ({ language, level, brief }))))
const existing = new Set(await readdir(exerciseDir))
const pending = jobs.filter(({ language, level, brief }) => !existing.has(`${language}-${level.toLowerCase()}-${brief.slug}.json`))
console.log(`${jobs.length - pending.length}/${jobs.length} new advanced readings already generated in selected scope; ${pending.length} pending.`)
if (args['rebuild-catalog'] === 'true') { await rebuildCatalog(); process.exit(0) }
if (args['dry-run'] === 'true') process.exit(0)
let completed = 0
let failedCount = 0
let providerOutageStreak = 0
for (const { language, level, brief } of pending) {
  if (completed >= maximum) break
  await ensureDiskSpace()
  const templateName = (await readdir(exerciseDir)).find((file) => file.startsWith(`${language}-${level.toLowerCase()}-`) && !ADVANCED_BRIEFS.some((candidate) => file.endsWith(`-${candidate.slug}.json`)))
  if (!templateName) throw new Error(`No pilot template for ${language}/${level}`)
  const template = JSON.parse(await readFile(path.join(exerciseDir, templateName), 'utf8'))
  let item
  let lastError
  for (let attempt = 0; attempt < 4; attempt++) {
    try {
      const call = provider === 'gemini' ? requestGemini : requestGroq
      const text = await call(prompt(language, level, brief))
      const preliminary = parseAndCheck(text, language, level, { allowShort: true })
      item = parseAndCheck(JSON.stringify(await extendIfNeeded(preliminary, language, level, call)), language, level)
      // Length repair is an optional extra provider call. Drafts remain blocked
      // by the editorial bias gate until their choices have been reviewed.
      if (args['repair-option-lengths'] === 'true') item = await balanceOptionLengths(item, language, call)
      break
    } catch (error) {
      lastError = error
      console.error(`${language}/${level}/${brief.slug} attempt ${attempt + 1}: ${error.message}`)
      if (/(?:Gemini|Groq) (?:400|403|404):|API_KEY is not configured/.test(error.message)) break
      if (/per day|PerDay|daily quota/i.test(error.message)) break
      if (/fetch failed|network error/i.test(error.message)) {
        if (attempt > 0) break
        await new Promise((resolve) => setTimeout(resolve, 5_000))
        continue
      }
      if (/429|quota|RESOURCE_EXHAUSTED|rate.limit/i.test(error.message)) await new Promise((resolve) => setTimeout(resolve, 65_000))
      else if (/503|high demand/i.test(error.message)) await new Promise((resolve) => setTimeout(resolve, 15_000 * (attempt + 1)))
    }
  }
  if (!item) {
    failedCount++
    console.error(`Skipped ${language}/${level}/${brief.slug}: ${lastError?.message}`)
    if (/(?:Gemini|Groq) (?:400|403|404):|API_KEY is not configured|429|quota|RESOURCE_EXHAUSTED|rate.limit|fetch failed|network error/i.test(lastError?.message ?? '')) break
    providerOutageStreak = /503|high demand/i.test(lastError?.message ?? '') ? providerOutageStreak + 1 : 0
    if (providerOutageStreak >= 2) { console.error('Provider remains unavailable; stop and resume this batch later.'); break }
    continue
  }
  providerOutageStreak = 0
  const exercise = makeExercise(item, language, level, brief, template)
  await ensureDiskSpace()
  await writeFile(path.join(exerciseDir, `${exercise.id}.json`), `${JSON.stringify(exercise, null, 2)}\n`)
  completed++
  console.log(`✓ ${exercise.id}: ${exercise.content.wordCount} ${units[language]}`)
  await rebuildCatalog()
  if (completed < maximum) await new Promise((resolve) => setTimeout(resolve, provider === 'groq' ? 25_000 : 20_000))
}
if (failedCount) process.exitCode = 1
console.log(`Generated ${completed} new drafts; ${failedCount} skipped in this run. All remain unpublished.`)
