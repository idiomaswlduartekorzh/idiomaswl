#!/usr/bin/env node
/** AI-assisted screening of advanced reading drafts. Never marks editorial approval. */
import { appendFile, readFile, readdir } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const directory = path.join(root, 'src/data/reading/exercises')
const args = Object.fromEntries(process.argv.slice(2).filter((arg) => arg.startsWith('--') && arg.includes('=')).map((arg) => arg.slice(2).split(/=(.*)/s).slice(0, 2)))
const output = args.output ?? '/private/tmp/welearn-reading-ai-audit.jsonl'
const model = args.model ?? 'gemini-3.1-flash-lite'
if (!['gemini-3.1-flash-lite', 'gemini-3.5-flash-lite', 'gemini-3-flash-preview'].includes(model)) throw new Error('Unsupported model')
const batchSize = Number(args['batch-size'] ?? 4)
const limit = Number(args.limit ?? Infinity)
if (!Number.isInteger(batchSize) || batchSize < 1 || batchSize > 4) throw new Error('batch-size must be 1–4')
if (!(Number.isInteger(limit) && limit > 0 || limit === Infinity)) throw new Error('limit must be a positive integer')
if (!process.env.GEMINI_API_KEY) throw new Error('GEMINI_API_KEY is required')

const files = (await readdir(directory)).filter((file) => file.endsWith('.json')).sort()
const allItems = (await Promise.all(files.map(async (file) => ({ file, exercise: JSON.parse(await readFile(path.join(directory, file), 'utf8')) }))))
  .filter(({ exercise }) => exercise.schemaVersion === '1.2.0' && (!args.language || exercise.language === args.language) && (!args.level || exercise.level.cefr === args.level) && (!args.id || exercise.id === args.id))
const items = args.sample === 'one-per-group' ? [...new Map(allItems.map((item) => [`${item.exercise.language}/${item.exercise.level.cefr}`, item])).values()] : allItems
const completed = new Set()
try {
  for (const line of (await readFile(output, 'utf8')).split('\n').filter(Boolean)) {
    const record = JSON.parse(line)
    if (Array.isArray(record.reviews)) for (const review of record.reviews) completed.add(review.id)
  }
} catch (error) {
  if (error.code !== 'ENOENT') throw error
}
const pending = items.filter(({ exercise }) => !completed.has(exercise.id))
const batches = Array.from({ length: Math.ceil(pending.length / batchSize) }, (_, index) => pending.slice(index * batchSize, (index + 1) * batchSize))
const levelRubric = {
  B2: 'Clear argument with a concession; the reader must distinguish claims, reasons and consequences.',
  C1: 'Detailed complex text with implicit stance and competing interpretations; questions require rereading and inference.',
  C2: 'Long complex text with subtle distinctions of style and implicit meaning; questions should test rhetorical nuance, not merely recall.',
}

async function review(batch) {
  const payload = batch.map(({ exercise }) => ({
    id: exercise.id, language: exercise.language, level: exercise.level.cefr, genre: exercise.classification.genre,
    text: exercise.content.targetText,
    vocabulary: exercise.content.vocabulary.map(({ surface, glosses }) => ({ surface, gloss: glosses.en })),
    questions: exercise.questions.map(({ id, prompt, options, answer, evidence }) => ({ id, prompt, options, answer, evidence })),
    production: exercise.production.prompt.en,
  }))
  const message = `Act as a critical editorial screener, not an approving human reviewer. Review ALL ${batch.length} reading exercises independently. Apply these CEFR reading aims: ${JSON.stringify(levelRubric)}. Check: naturalness and idiomatic language, internal chronology and coherence, cultural framing, vocabulary gloss accuracy, whether every keyed answer is uniquely supported by the FULL passage, whether distractors are plausible and false, question specificity, production prompt relevance, and whether complexity plausibly progresses from B2 to C2. One detail and one vocabulary question are intentionally included per exercise; assess the balance of the six-question set rather than treating either type as a flaw by itself. Flag uncertainty. Do not invent errors; quote a short exact span or question ID for each finding. Do not infer that a word-count target certifies CEFR. Return JSON with exactly one top-level field "reviews", an array of ${batch.length} objects in the same order. Each review: {"id": string, "verdict": "pass_screen" | "needs_edit" | "uncertain", "issues": [{"location": string, "severity": "blocker" | "major" | "minor", "finding": string, "suggestion": string}], "levelNote": string}. Limit to five concrete issues per exercise. "pass_screen" means only that this AI screen found no clear problem; it is NOT human approval. Input: ${JSON.stringify(payload)}`
  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`, {
    method: 'POST', headers: { 'content-type': 'application/json', 'x-goog-api-key': process.env.GEMINI_API_KEY },
    body: JSON.stringify({ contents: [{ role: 'user', parts: [{ text: message }] }], generationConfig: { responseMimeType: 'application/json', temperature: 0.15, thinkingConfig: { thinkingLevel: 'minimal' } } }),
    signal: AbortSignal.timeout(120_000),
  })
  const result = await response.json()
  if (!response.ok) throw new Error(`Gemini ${response.status}: ${result.error?.message?.slice(0, 300) ?? 'unknown error'}`)
  const raw = result.candidates?.[0]?.content?.parts?.map((part) => part.text ?? '').join('')
  if (!raw) throw new Error('Empty model response')
  const parsed = JSON.parse(raw)
  if (!Array.isArray(parsed.reviews) || parsed.reviews.length !== batch.length) throw new Error('Incomplete review batch')
  for (const [index, entry] of parsed.reviews.entries()) {
    if (entry.id !== batch[index].exercise.id || !['pass_screen', 'needs_edit', 'uncertain'].includes(entry.verdict) || !Array.isArray(entry.issues)) throw new Error(`Invalid review for ${batch[index].exercise.id}`)
  }
  return parsed.reviews
}

let done = 0
const previousInScope = items.length - pending.length
console.log(`${previousInScope} reviewed previously; ${pending.length} pending in selected scope.`)
for (const batch of batches.slice(0, limit)) {
  let reviews
  for (let attempt = 0; attempt < 3; attempt++) {
    try { reviews = await review(batch); break }
    catch (error) {
      console.error(`Batch ${batch[0].exercise.id}: ${error.message}`)
      if (/400|403|404|daily|per day/i.test(error.message)) throw error
      await new Promise((resolve) => setTimeout(resolve, 10_000 * (attempt + 1)))
    }
  }
  if (!reviews) throw new Error(`Could not review batch starting ${batch[0].exercise.id}`)
  await appendFile(output, `${JSON.stringify({ model, reviewedAt: new Date().toISOString(), reviews })}\n`, { mode: 0o600 })
  done += reviews.length
  console.log(`${previousInScope + done}/${items.length}: ${reviews.map(({ id, verdict }) => `${id}:${verdict}`).join(' ')}`)
  if (done < pending.length) await new Promise((resolve) => setTimeout(resolve, 5_000))
}
