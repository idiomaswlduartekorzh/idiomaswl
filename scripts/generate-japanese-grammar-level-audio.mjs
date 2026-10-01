import assert from 'node:assert/strict'
import { existsSync } from 'node:fs'
import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createJiti } from 'jiti'
import { elevenLabsApiKey } from './lib/elevenlabs-api-key.mjs'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const level = process.argv.find((arg) => /^--level=(a2|b1)$/u.test(arg))?.split('=')[1]
if (!level) throw new Error('Usa --level=a2 o --level=b1')
const generate = process.argv.includes('--generate'); const force = process.argv.includes('--force')
const OUT = path.join(ROOT, 'public', 'audio', 'japones', level, 'grammar')
const jiti = createJiti(import.meta.url, { interopDefault: true })
const { getTopicsByLevel } = await jiti.import(path.join(ROOT, 'src', 'data', 'grammar', 'registry.ts'))
const { getJapaneseGrammarLevelResource } = await jiti.import(path.join(ROOT, 'src', 'data', 'japanese-grammar-levels.ts'))
const manifest = getTopicsByLevel('japones', level).map((topic) => ({ slug: topic.slug, text: getJapaneseGrammarLevelResource(topic, level).audioText }))
for (const item of manifest) assert.match(item.text, /[ぁ-んァ-ヶ一-龯々]/u, `${item.slug}: el audio no contiene japonés`)
const pending = manifest.filter((item) => force || !existsSync(path.join(OUT, `${item.slug}.mp3`)))
console.log(JSON.stringify({ level, total: manifest.length, pending: pending.length, characters: pending.reduce((sum, item) => sum + [...item.text].length, 0), manifest }, null, 2))
if (!generate) process.exit(0)
assert.ok(pending.length, 'No hay clips pendientes.')
const apiKey = elevenLabsApiKey(ROOT); const voice = 'nBV906YvEOdwWKK9J8Hx'
await mkdir(OUT, { recursive: true })
for (const [index, item] of pending.entries()) {
  const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voice}?output_format=mp3_44100_128&enable_logging=true`, { method: 'POST', headers: { 'content-type': 'application/json', 'xi-api-key': apiKey }, body: JSON.stringify({ text: item.text, model_id: 'eleven_multilingual_v2', language_code: 'ja', voice_settings: { stability: 0.7, similarity_boost: 0.78, style: 0.04, use_speaker_boost: true, speed: 0.84 } }) })
  if (!response.ok) throw new Error(`${response.status} ${item.slug}: ${await response.text()}`)
  await writeFile(path.join(OUT, `${item.slug}.mp3`), Buffer.from(await response.arrayBuffer())); console.log(`${index + 1}/${pending.length} ${item.slug}: ${item.text}`)
}
