import assert from 'node:assert/strict'
import { existsSync } from 'node:fs'
import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { elevenLabsApiKey } from './lib/elevenlabs-api-key.mjs'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const OUT = path.join(ROOT, 'public', 'audio', 'japones', 'a1', 'scripts')
const API = 'https://api.elevenlabs.io'
const VOICE_ID = 'nBV906YvEOdwWKK9J8Hx' // Mio — narradora japonesa cálida y clara ya usada por WeLearn.
const MODEL_ID = 'eleven_multilingual_v2'

const kana = [
  ['a', 'あ'], ['i', 'い'], ['u', 'う'], ['e', 'え'], ['o', 'お'],
  ['ka', 'か'], ['ki', 'き'], ['ku', 'く'], ['ke', 'け'], ['ko', 'こ'],
  ['sa', 'さ'], ['shi', 'し'], ['su', 'す'], ['se', 'せ'], ['so', 'そ'],
  ['ta', 'た'], ['chi', 'ち'], ['tsu', 'つ'], ['te', 'て'], ['to', 'と'],
  ['na', 'な'], ['ni', 'に'], ['nu', 'ぬ'], ['ne', 'ね'], ['no', 'の'],
  ['ha', 'は'], ['hi', 'ひ'], ['fu', 'ふ'], ['he', 'へ'], ['ho', 'ほ'],
  ['ma', 'ま'], ['mi', 'み'], ['mu', 'む'], ['me', 'め'], ['mo', 'も'],
  ['ya', 'や'], ['yu', 'ゆ'], ['yo', 'よ'],
  ['ra', 'ら'], ['ri', 'り'], ['ru', 'る'], ['re', 'れ'], ['ro', 'ろ'],
  ['wa', 'わ'], ['wo', 'を'], ['n', 'ん'],
].map(([file, text]) => ({ file: `kana/${file}.mp3`, text: `${text}。` }))

const kanji = [
  [19968, 'いち'], [20108, 'に'], [19977, 'さん'], [22235, 'よん'], [20116, 'ご'],
  [20845, 'ろく'], [19971, 'なな'], [20843, 'はち'], [20061, 'きゅう'], [21313, 'じゅう'],
  [30334, 'ひゃく'], [21315, 'せん'], [26085, 'ひ'], [26376, 'つき'], [28779, 'ひ'],
  [27700, 'みず'], [26408, 'き'], [37329, 'かね'], [22303, 'つち'], [20154, 'ひと'],
].map(([file, text]) => ({ file: `kanji/${file}.mp3`, text: `${text}。` }))

const examples = [
  ['ie', 'いえ'], ['neko', 'ねこ'], ['inu', 'いぬ'], ['sakana', 'さかな'], ['tsuki', 'つき'], ['watashi', 'わたし'],
  ['hoteru', 'ホテル'], ['koohii', 'コーヒー'], ['terebi', 'テレビ'], ['basu', 'バス'], ['kamera', 'カメラ'], ['supein', 'スペイン'],
  ['nihon', 'にほん'], ['hitori', 'ひとり'], ['kazan', 'かざん'], ['mizu', 'みず'], ['tsuki-kanji', 'つき'], ['sen-en', 'せんえん'],
].map(([file, text]) => ({ file: `examples/${file}.mp3`, text: `${text}。` }))

const manifest = [...kana, ...kanji, ...examples]
const generate = process.argv.includes('--generate')
const force = process.argv.includes('--force')
const pending = manifest.filter((item) => force || !existsSync(path.join(OUT, item.file)))
const characters = pending.reduce((sum, item) => sum + [...item.text].length, 0)

console.log(`Audio japonés A1: ${manifest.length} clips (${kana.length} kana, ${kanji.length} kanji, ${examples.length} ejemplos).`)
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
