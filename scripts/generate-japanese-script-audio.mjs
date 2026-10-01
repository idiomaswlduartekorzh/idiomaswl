import assert from 'node:assert/strict'
import { existsSync } from 'node:fs'
import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { elevenLabsApiKey } from './lib/elevenlabs-api-key.mjs'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const outputArg = process.argv.find((argument) => argument.startsWith('--output='))
const OUT = outputArg
  ? path.resolve(ROOT, outputArg.slice('--output='.length))
  : path.join(ROOT, 'public', 'audio', 'japones', 'a1', 'scripts')
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
  ['ie', 'いえ', '「家」という意味の日本語です。'],
  ['neko', 'ねこ', '「猫」という意味の日本語です。'],
  ['inu', 'いぬ', '「犬」という意味の日本語です。'],
  ['sakana', 'さかな', '「魚」という意味の日本語です。'],
  ['tsuki', 'つき', '「月」という意味の日本語です。'],
  ['watashi', 'わたし', '自分を指す「私」という意味です。'],
  ['hoteru', 'ホテル', '宿泊するホテルを表す日本語です。'],
  ['koohii', 'コーヒー', '飲み物のコーヒーを表す日本語です。'],
  ['terebi', 'テレビ', 'テレビを表す日本語です。'],
  ['basu', 'バス', '乗り物のバスを表す日本語です。'],
  ['kamera', 'カメラ', '写真を撮るカメラを表す日本語です。'],
  ['supein', 'スペイン', '国名のスペインを表す日本語です。'],
  ['nihon', 'にほん', '国名の「日本」の読み方です。'],
  ['hitori', 'ひとり', '人数の「一人」の読み方です。'],
  ['kazan', 'かざん', '「火山」の読み方です。'],
  ['mizu', 'みず', '「水」という意味の日本語です。'],
  ['tsuki-kanji', 'つき', '漢字の「月」の読み方です。'],
  ['sen-en', 'せん、えん', '金額の「千円」の読み方です。'],
].map(([file, text, nextText]) => ({ file: `examples/${file}.mp3`, text: `${text}。`, nextText }))

const manifest = [...kana, ...kanji, ...examples]
const generate = process.argv.includes('--generate')
const force = process.argv.includes('--force')
const groupArg = process.argv.find((argument) => argument.startsWith('--group='))
const group = groupArg?.slice('--group='.length)
assert.ok(!group || ['kana', 'kanji', 'examples'].includes(group), '--group debe ser kana, kanji o examples')
const selected = group ? manifest.filter((item) => item.file.startsWith(`${group}/`)) : manifest
const pending = selected.filter((item) => force || !existsSync(path.join(OUT, item.file)))
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
      previous_text: '日本語の発音練習です。音を一つずつ、ゆっくり正確に読みます。',
      next_text: item.nextText ?? `${item.text.replace(/。$/u, '')}の発音でした。`,
      apply_language_text_normalization: true,
      voice_settings: {
        stability: 0.78,
        similarity_boost: 0.8,
        style: 0,
        use_speaker_boost: true,
        speed: 0.78,
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
