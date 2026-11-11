import { writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import readings from '../src/data/reading/advanced-pilot.mjs'
import { EXTENSIONS } from '../src/data/reading/advanced-pilot-extensions.mjs'
import { countJapaneseCharacters } from './lib/reading-blueprint.mjs'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const output = path.join(root, 'src/data/reading/advanced-pilot-extensions.mjs')
const args = Object.fromEntries(process.argv.slice(2).filter((arg) => arg.startsWith('--') && arg.includes('=')).map((arg) => arg.slice(2).split(/=(.*)/s).slice(0, 2)))
const names = { en: 'English', fr: 'French', it: 'Italian', de: 'German', pt: 'Brazilian Portuguese', ru: 'Russian', ja: 'Japanese', ko: 'Korean' }
const target = { B2: { default: 400, ja: 800, ko: 220 }, C1: { default: 650, ja: 1200, ko: 340 }, C2: { default: 800, ja: 1600, ko: 430 } }
const count = (text, language) => language === 'ja' ? countJapaneseCharacters(text) : text.trim().split(/\s+/u).filter(Boolean).length
const maximum = args.limit ? Number(args.limit) : Infinity
const model = args.model ?? 'gemini-3.1-flash-lite'
const key = process.env.GEMINI_API_KEY
if (!key) throw new Error('GEMINI_API_KEY is not configured')
if (!['gemini-3.1-flash-lite', 'gemini-3.5-flash-lite'].includes(model)) throw new Error('Unsupported model')
const extensions = structuredClone(EXTENSIONS)

async function generate(message) {
  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`, {
    method: 'POST', headers: { 'content-type': 'application/json', 'x-goog-api-key': key },
    body: JSON.stringify({ contents: [{ role: 'user', parts: [{ text: message }] }], generationConfig: { responseMimeType: 'application/json', temperature: 0.5 } }),
    signal: AbortSignal.timeout(120_000),
  })
  const result = await response.json()
  if (!response.ok) throw new Error(`Gemini ${response.status}: ${result.error?.message?.slice(0, 170) ?? 'unknown error'}`)
  return JSON.parse(result.candidates?.[0]?.content?.parts?.map((part) => part.text ?? '').join('') ?? '{}')
}

let completed = 0
let skipped = 0
for (const item of readings) {
  if (args.language && item.language !== args.language || args.level && item.level !== args.level) continue
  if (completed >= maximum) break
  const floor = target[item.level][item.language] ?? target[item.level].default
  const missing = floor - count(item.text, item.language)
  if (missing <= 0) continue
  const unit = item.language === 'ja' ? 'Japanese characters excluding spaces' : item.language === 'ko' ? 'Korean eojeol' : 'words'
  const request = `Return only JSON {"continuation":"..."}. Write at least ${Math.round(missing * 1.6)} ${unit} of new, original ${names[item.language]} prose to continue this ${item.level} reading. Use several substantial paragraphs. Keep all existing facts and timeline coherent. Deepen the concrete conflict and add a consequence or counterargument; do not repeat existing points or give generic filler. Do not change any existing passage or answer the reading questions explicitly. No Spanish. Existing text:\n${item.text}`
  let continuation
  for (let attempt = 0; attempt < 4; attempt++) {
    try {
      continuation = (await generate(request)).continuation
      if (typeof continuation !== 'string' || count(continuation, item.language) < missing) throw new Error(`continuation too short: ${count(continuation ?? '', item.language)}/${missing}`)
      break
    } catch (error) {
      console.error(`${item.language}/${item.level} attempt ${attempt + 1}: ${error.message}`)
      if (/429|quota/i.test(error.message)) break
      await new Promise((resolve) => setTimeout(resolve, 5000))
    }
  }
  if (!continuation || count(continuation, item.language) < missing) { skipped++; continue }
  extensions[item.language] ??= {}
  extensions[item.language][item.level] = [extensions[item.language][item.level], continuation.trim()].filter(Boolean).join('\n\n')
  await writeFile(output, `// Generated additions for the original 24 advanced drafts. All remain unpublished.\nexport const EXTENSIONS = ${JSON.stringify(extensions, null, 2)}\n`)
  completed++
  console.log(`✓ ${item.language}/${item.level}: ${count(item.text, item.language)} → ${count(`${item.text} ${continuation}`, item.language)} ${unit}`)
  await new Promise((resolve) => setTimeout(resolve, 5000))
}
if (skipped) process.exitCode = 1
console.log(`${completed} original readings expanded; ${skipped} skipped. Run node scripts/build-reading-advanced-pilot.mjs --write to refresh JSON.`)
