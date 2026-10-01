import assert from 'node:assert/strict'
import { existsSync } from 'node:fs'
import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { elevenLabsApiKey } from './lib/elevenlabs-api-key.mjs'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const OUT = path.join(ROOT, 'public', 'audio', 'japones', 'a1', 'grammar')
const API = 'https://api.elevenlabs.io'
const VOICE_ID = 'nBV906YvEOdwWKK9J8Hx' // Mio, la voz japonesa aprobada para Japonés A1.
const MODEL_ID = 'eleven_multilingual_v2'

const manifest = [
  ['estructura-sov-particulas', 'パンを食べます。'],
  ['desu-masu', '学生です。'],
  ['particula-wa-ga', '猫がいます。'],
  ['particula-wo-ni', '学校に行きます。'],
  ['particula-de-e', 'カフェで勉強します。'],
  ['arimasu-imasu', '本があります。'],
  ['i-keiyoshi', '大きいです。'],
  ['na-keiyoshi', 'きれいです。'],
  ['masu-kei-conjugacion', '食べました。'],
  ['interrogativos-ka', 'これは何ですか。'],
  ['numeros-contadores', 'りんごが三つあります。'],
  ['jikan-tiempo', '七時です。'],
  ['tai-form', '日本へ行きたいです。'],
  ['te-form-permission', '入ってもいいですか。'],
  ['adverbios-frecuencia', '毎日勉強します。'],
  ['negacion-completa', '肉を食べません。'],
  ['conjunciones', 'そして、勉強します。'],
  ['expresiones-cotidianas', 'ありがとうございます。'],
  ['demostrativos-kosoado', 'これは本です。'],
  ['particula-no-posesion', 'わたしの本です。'],
  ['particulas-to-mo', '猫と犬がいます。'],
  ['kara-made-origen-limite', '九時から五時までです。'],
  ['ubicacion-posiciones', '本は机の上です。'],
  ['suki-kirai-gustos', '音楽が好きです。'],
  ['invitaciones-masenka-mashou', 'いっしょに行きませんか。'],
].map(([slug, text]) => ({ file: `${slug}.mp3`, text }))

const generate = process.argv.includes('--generate')
const force = process.argv.includes('--force')
const pending = manifest.filter((item) => force || !existsSync(path.join(OUT, item.file)))
const characters = pending.reduce((sum, item) => sum + [...item.text].length, 0)

console.log(`Gramática japonesa A1: ${manifest.length} modelos de pronunciación.`)
console.log(`Pendientes: ${pending.length} clips · ${characters} caracteres enviados a ElevenLabs.`)

if (!generate) {
  console.log('Dry run: usa --generate para crear los MP3. No se consumieron créditos.')
  process.exit(0)
}

assert.ok(pending.length, 'No hay clips pendientes. Usa --force solo si necesitas regenerarlos.')
const apiKey = elevenLabsApiKey(ROOT)

for (const [index, item] of pending.entries()) {
  const target = path.join(OUT, item.file)
  await mkdir(path.dirname(target), { recursive: true })
  const response = await fetch(`${API}/v1/text-to-speech/${VOICE_ID}?output_format=mp3_44100_128`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'xi-api-key': apiKey,
    },
    body: JSON.stringify({
      text: item.text,
      model_id: MODEL_ID,
      language_code: 'ja',
      voice_settings: {
        stability: 0.68,
        similarity_boost: 0.78,
        style: 0.08,
        use_speaker_boost: true,
        speed: 0.86,
      },
    }),
  })
  if (!response.ok) {
    throw new Error(`${response.status} al generar ${item.file}: ${await response.text()}`)
  }
  await writeFile(target, Buffer.from(await response.arrayBuffer()))
  console.log(`${String(index + 1).padStart(2, '0')}/${pending.length} ${item.file}`)
}

console.log(`Listo: ${pending.length} MP3 generados con ${MODEL_ID}.`)
