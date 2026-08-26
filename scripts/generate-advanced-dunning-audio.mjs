import assert from 'node:assert/strict'
import fs from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import { DUNNING_KRUGER_GUIDED_LESSON } from '../src/data/practica/advanced-guided-dunning.ts'

const API = 'https://api.elevenlabs.io'
const MODEL_ID = 'eleven_v3_conversational'
const OUTPUT_FORMAT = 'mp3_44100_128'
const CREDIT_MULTIPLIER = 0.5
const PRICE_USD_PER_THOUSAND_CHARACTERS = 0.05
const generate = process.argv.includes('--generate')
const voiceByTrack = {
  'audio-a': { id: 'XrExE9yKIg1WjnnlVkGX', name: 'Matilda - Knowledgeable, Professional' },
  'audio-b': { id: 'onwK4e9ZLuTAKqWW03F9', name: 'Daniel - Steady Broadcaster' },
}

const tracks = DUNNING_KRUGER_GUIDED_LESSON.listeningLab.tracks ?? []
assert.equal(tracks.length, 2, 'the Dunning–Kruger pilot must contain exactly two listening tracks')

const jobs = tracks.map((track) => ({
  ...track,
  voice: voiceByTrack[track.id],
  outputPath: path.join(process.cwd(), 'public', track.audioSrc.replace(/^\//, '')),
}))

for (const job of jobs) {
  assert.ok(job.voice, `${job.id}: missing approved voice`)
  assert.ok(job.transcript.length <= 5000, `${job.id}: transcript exceeds the model’s 5,000-character request limit`)
}

const totalCharacters = jobs.reduce((sum, job) => sum + job.transcript.length, 0)
const estimatedCredits = Math.ceil(totalCharacters * CREDIT_MULTIPLIER)
const estimatedUsd = totalCharacters / 1000 * PRICE_USD_PER_THOUSAND_CHARACTERS

console.log('Dunning–Kruger dual listening budget')
for (const job of jobs) console.log(`  ${job.id}: ${job.transcript.length} characters · ${job.voice.name}`)
console.log(`  total: ${totalCharacters} characters · about ${estimatedCredits} credits · about USD ${estimatedUsd.toFixed(2)}`)
console.log(`  model: ${MODEL_ID} · output: ${OUTPUT_FORMAT}`)

if (!generate) {
  console.log('\nDry run only. Add --generate to make the two paid API requests.')
  process.exit(0)
}

const apiKey = process.env.ELEVENLABS_API_KEY
assert.ok(apiKey, 'ELEVENLABS_API_KEY is required for paid generation and is never stored in the repository')
const headers = { 'xi-api-key': apiKey }

const [modelsResponse, voicesResponse, subscriptionResponse] = await Promise.all([
  fetch(`${API}/v1/models`, { headers }),
  fetch(`${API}/v2/voices?page_size=100`, { headers }),
  fetch(`${API}/v1/user/subscription`, { headers }),
])
assert.ok(modelsResponse.ok && voicesResponse.ok && subscriptionResponse.ok, 'ElevenLabs preflight failed')

const models = await modelsResponse.json()
const voices = await voicesResponse.json()
const subscription = await subscriptionResponse.json()
const model = models.find((item) => item.model_id === MODEL_ID)
assert.ok(model, `${MODEL_ID} is unavailable in this account`)
assert.equal(model.model_rates?.character_cost_multiplier, CREDIT_MULTIPLIER, 'account model rate differs from the reviewed budget')
const availableVoiceIds = new Set((voices.voices ?? []).map((voice) => voice.voice_id))
for (const job of jobs) assert.ok(availableVoiceIds.has(job.voice.id), `${job.voice.name} is unavailable in this account`)

const remainingCredits = Math.max(0, (subscription.character_limit ?? 0) - (subscription.character_count ?? 0))
assert.ok(remainingCredits >= estimatedCredits, `generation needs about ${estimatedCredits} credits; only ${remainingCredits} remain`)
console.log(`\nPreflight passed: ${remainingCredits} credits remain before generation.`)

for (const job of jobs) {
  try {
    await fs.access(job.outputPath)
    console.log(`  skip ${job.id}: ${job.outputPath} already exists`)
    continue
  } catch {
    // Missing output is the expected state for a new or resumed generation.
  }

  const response = await fetch(`${API}/v1/text-to-speech/${job.voice.id}?output_format=${OUTPUT_FORMAT}`, {
    method: 'POST',
    headers: { ...headers, 'content-type': 'application/json' },
    body: JSON.stringify({
      text: job.transcript,
      model_id: MODEL_ID,
      language_code: 'en',
      voice_settings: {
        stability: 0.58,
        similarity_boost: 0.78,
        use_speaker_boost: true,
      },
    }),
  })
  if (!response.ok) throw new Error(`${job.id}: ElevenLabs returned ${response.status} ${await response.text()}`)

  const audio = Buffer.from(await response.arrayBuffer())
  assert.ok(audio.length > 50_000, `${job.id}: generated response is unexpectedly small`)
  await fs.mkdir(path.dirname(job.outputPath), { recursive: true })
  await fs.writeFile(job.outputPath, audio)
  console.log(`  generated ${job.id}: ${(audio.length / 1024 / 1024).toFixed(2)} MB`)
}

const afterResponse = await fetch(`${API}/v1/user/subscription`, { headers })
if (afterResponse.ok) {
  const after = await afterResponse.json()
  const afterRemaining = Math.max(0, (after.character_limit ?? 0) - (after.character_count ?? 0))
  console.log(`Done. ${afterRemaining} credits remain; ${remainingCredits - afterRemaining} credits were charged.`)
}
