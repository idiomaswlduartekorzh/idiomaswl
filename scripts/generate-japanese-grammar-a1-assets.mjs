import { readFile, mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createJiti } from 'jiti'
import sharp from 'sharp'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const OUT = path.join(ROOT, 'public', 'downloads', 'japanese-a1', 'grammar')
const DATA_OUT = path.join(ROOT, 'tmp', 'japanese-grammar-a1', 'topics.json')
const FONT = path.join(ROOT, 'public', 'fonts', 'welearn-ja-700.ttf')
const jiti = createJiti(import.meta.url, { interopDefault: true })
const { getTopicsByLevel } = await jiti.import(path.join(ROOT, 'src', 'data', 'grammar', 'registry.ts'))
const topics = getTopicsByLevel('japones', 'a1').filter((topic) => !['hiragana-basico', 'katakana-basico', 'kanji-esencial-a1'].includes(topic.slug))

function escapeXml(value) {
  return String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;')
}

function wrap(value, max = 44) {
  const words = String(value).split(/\s+/u).flatMap((word) => {
    if ([...word].length <= max) return [word]
    const chars = [...word]
    const chunks = []
    while (chars.length) chunks.push(chars.splice(0, max).join(''))
    return chunks
  })
  const lines = []
  let line = ''
  for (const word of words) {
    if (line && [...`${line} ${word}`].length > max) {
      lines.push(line)
      line = word
    } else {
      line = line ? `${line} ${word}` : word
    }
  }
  if (line) lines.push(line)
  return lines
}

function textLines(lines, x, y, size, lineHeight, attrs = '') {
  return lines.map((line, index) => `<text x="${x}" y="${y + index * lineHeight}" font-size="${size}" ${attrs}>${escapeXml(line)}</text>`).join('')
}

function buildSvg(topic, fontBase64) {
  const title = wrap(topic.title, 34).slice(0, 2)
  const formula = wrap(topic.guide.formula, 50).slice(0, 3)
  const model = wrap(topic.guide.model, 28).slice(0, 4)
  const rules = topic.guide.decisions.slice(0, 4)
  const mistakes = topic.guide.mistakes.slice(0, 2)
  const ruleSvg = rules.map((rule, index) => {
    const lines = wrap(rule, 36).slice(0, 2)
    const y = 500 + index * 102
    return `<circle cx="112" cy="${y - 8}" r="25" fill="#10266b"/><text x="112" y="${y + 1}" text-anchor="middle" font-size="19" fill="#fff">${index + 1}</text>${textLines(lines, 156, y, 22, 30, 'fill="#182653"')}`
  }).join('')
  const mistakeSvg = mistakes.map((item, index) => {
    const lines = wrap(item, 24).slice(0, 4)
    const y = 718 + index * 128
    return `<circle cx="978" cy="${y - 7}" r="17" fill="#e53935"/><text x="978" y="${y}" text-anchor="middle" font-size="18" fill="#fff">×</text>${textLines(lines, 1012, y, 20, 26, 'fill="#182653"')}`
  }).join('')

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="1000" viewBox="0 0 1600 1000">
    <defs><style>@font-face{font-family:WeLearnJP;src:url(data:font/ttf;base64,${fontBase64})}text{font-family:WeLearnJP,'Noto Sans JP',sans-serif}</style></defs>
    <rect width="1600" height="1000" fill="#f7f4ec"/>
    <path d="M0 0H390L0 390Z" fill="#10266b"/><path d="M1600 1000H1210L1600 610Z" fill="#e53935"/>
    <rect x="72" y="62" width="258" height="50" rx="25" fill="#fff" fill-opacity=".14"/>
    <text x="201" y="96" text-anchor="middle" font-size="22" fill="#fff">JAPONÉS · A1</text>
    <text x="390" y="90" font-size="25" fill="#10266b">Idiomas WeLearn · mapa visual</text>
    ${textLines(title, 410, 176, 43, 55, 'fill="#10266b"')}
    <rect x="72" y="286" width="1456" height="142" rx="24" fill="#fff" stroke="#d9deeb" stroke-width="3"/>
    <text x="106" y="328" font-size="19" fill="#e53935">FÓRMULA</text>
    ${textLines(formula, 106, 370, 27, 33, 'fill="#10266b"')}
    <text x="72" y="470" font-size="21" fill="#e53935">CÓMO DECIDIR</text>
    ${ruleSvg}
    <rect x="930" y="462" width="598" height="170" rx="24" fill="#10266b"/>
    <text x="970" y="500" font-size="18" fill="#aebbe9">MODELO</text>
    ${textLines(model, 970, 540, 22, 27, 'fill="#fff"')}
    <text x="930" y="680" font-size="21" fill="#e53935">EVITA ESTOS ERRORES</text>
    ${mistakeSvg}
    <text x="72" y="948" font-size="20" fill="#64708f">idiomaswl.com/practica/japones/a1/gramatica/${escapeXml(topic.slug)}</text>
  </svg>`
}

await mkdir(OUT, { recursive: true })
await mkdir(path.dirname(DATA_OUT), { recursive: true })
const fontBase64 = (await readFile(FONT)).toString('base64')

for (const topic of topics) {
  const output = path.join(OUT, `idiomaswl-${topic.slug}-map.png`)
  await sharp(Buffer.from(buildSvg(topic, fontBase64))).png({ compressionLevel: 9 }).toFile(output)
  console.log(path.relative(ROOT, output))
}

await writeFile(DATA_OUT, JSON.stringify(topics, null, 2))
console.log(`Listo: ${topics.length} mapas PNG y ${path.relative(ROOT, DATA_OUT)}.`)
