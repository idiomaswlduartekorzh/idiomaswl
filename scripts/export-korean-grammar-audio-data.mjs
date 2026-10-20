import { mkdir, readdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const output = path.join(root, 'tmp', 'korean-grammar-audio', 'tracks.json')
const source = path.join(root, 'src', 'data', 'grammar', 'coreano')
const definitions = [
  ['modelo-estructura', 'Modelo y estructura'],
  ['contraste-guiado', 'Contraste guiado'],
  ['practica-contexto', 'Práctica en contexto'],
]

function normalizeSpokenKorean(text) {
  const normalized = text
    .replace(/\s*\([^)]*\)\s*/gu, ' ')
    .replace(/\[[^\]]+\]/gu, '어디')
    .replace(/\s*(?:→|\/)\s*/gu, '. ')
    .replace(/\s*—\s*/gu, ' ')
    .replace(/10분/gu, '십 분')
    .replace(/1990년에/gu, '천구백구십 년에')
    .replace(/\.{2,}/gu, '.')
    .replace(/\s+/gu, ' ')
    .trim()
  return /[.!?。！？]$/u.test(normalized) ? normalized : `${normalized}.`
}

function groupsFor(scene) {
  return [[scene[0]], [scene[Math.floor((scene.length - 1) / 2)]], [scene.at(-1)]]
}

function repeatShortSpoken(text) {
  return text.length < 8 ? `${text} ${text}` : text
}

const lessons = []
for (const level of ['a1', 'a2', 'b1']) {
  const directory = path.join(source, level)
  const files = (await readdir(directory)).filter((name) => name.endsWith('.ts') && name !== 'index.ts')
  const topics = []
  for (const file of files) {
    const module = await import(`${pathToFileURL(path.join(directory, file)).href}?audio=${Date.now()}`)
    topics.push(module.default)
  }
  topics.sort((a, b) => Number(a.order) - Number(b.order))
  for (const topic of topics) {
    if (topic.slug === 'hangul-basico') continue
    const groups = groupsFor(topic.visual.scene)
    lessons.push({
      level,
      slug: topic.slug,
      title: topic.shortTitle,
      tracks: definitions.map(([id, title], index) => ({
        id,
        title,
        text: repeatShortSpoken(groups[index].map(([korean]) => normalizeSpokenKorean(korean)).join(' ')),
        translation: groups[index].map(([, spanish]) => spanish).join(' · '),
      })),
    })
  }
}

await mkdir(path.dirname(output), { recursive: true })
await writeFile(output, `${JSON.stringify({ lessons }, null, 2)}\n`, 'utf8')
console.log(`Exportadas ${lessons.length} lecciones y ${lessons.reduce((sum, lesson) => sum + lesson.tracks.length, 0)} pistas a ${path.relative(root, output)}`)
