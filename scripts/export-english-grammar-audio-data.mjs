import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

const root = process.cwd()
const output = path.join(root, 'tmp', 'english-grammar-audio', 'tracks.json')
const changesOutput = path.join(path.dirname(output), 'changed-tracks.json')
const definitions = [
  ['modelo-estructura', 'Modelo y estructura'],
  ['contraste-guiado', 'Contraste guiado'],
  ['practica-contexto', 'Práctica en contexto'],
]

function normalize(text) {
  const clean = text
    .replace(/\s*\([^)]*\)\s*/gu, ' ')
    .replace(/\[[^\]]+\]/gu, 'something')
    .replace(/\s*(?:→|\/)\s*/gu, '. ')
    .replace(/\s*(?:--|—)\s*/gu, '. ')
    .replace(/([.!?])\s*\.\s*/gu, '$1 ')
    .replace(/\.{2,}/gu, '.')
    .replace(/\s+/gu, ' ')
    .replace(/\s+(['’](?:s|re|ve|ll|d|m|t)\b)/giu, '$1')
    .replace(/(^|[.!?]\s+)([a-z])/gu, (_match, boundary, letter) => `${boundary}${letter.toUpperCase()}`)
    .trim()
  const spoken = /[.!?]$/u.test(clean) ? clean : `${clean}.`
  return spoken.length < 8 ? `${spoken} ${spoken}` : spoken
}

function pickThree(items) {
  const values = [...new Set(items.filter(Boolean))]
  return [values[0], values[Math.floor((values.length - 1) / 2)], values.at(-1)]
}

function trackExamples(topic) {
  const choice = topic.practice.levels.find((practice) => practice.type === 'choice')
  const examples = choice?.items.map(choiceExample).filter((text) => !/___|\[\[/u.test(text)) ?? []
  const fallback = topic.visual.scene.map(([english]) => String(english))
  return pickThree(examples.length >= 3 ? examples : fallback)
}

function choiceExample(item) {
  const parts = item.answer.split(/\s+\/\s+/u)
  let partIndex = 0
  return item.lines.map(([, text]) => text.replace(/___|\[\[\d+\]\]/gu, (_blank, offset) => {
    let answer = parts[Math.min(partIndex, parts.length - 1)]
    partIndex += 1
    if (/^(?:--|—)$/u.test(answer)) answer = ''
    const prefix = text.slice(0, offset).trimEnd()
    if (!prefix || /[.!?]$/u.test(prefix)) answer = answer.charAt(0).toUpperCase() + answer.slice(1)
    return answer
  })).join(' ')
}

const lessons = []
for (const level of ['a1', 'a2', 'b1']) {
  const moduleUrl = pathToFileURL(path.join(root, 'src', 'data', 'grammar', 'ingles', level, 'index.ts')).href
  const { default: topics } = await import(`${moduleUrl}?audio=${Date.now()}`)
  for (const topic of topics) {
    const selected = trackExamples(topic)
    lessons.push({
      level,
      slug: topic.slug,
      title: topic.shortTitle,
      tracks: definitions.map(([id, title], index) => ({
        id,
        title,
        text: normalize(selected[index] ?? topic.guide.model),
        translation: topic.visual.scene[index]?.[1] ?? topic.guide.goal,
      })),
    })
  }
}

await mkdir(path.dirname(output), { recursive: true })
let previous = { lessons: [] }
try {
  previous = JSON.parse(await readFile(output, 'utf8'))
} catch {
  previous = { lessons: [] }
}
const previousText = new Map(previous.lessons.flatMap((lesson) => lesson.tracks.map((track) => [`${lesson.level}/${lesson.slug}/${track.id}`, track.text])))
const changedTracks = lessons.flatMap((lesson) => lesson.tracks
  .filter((track) => previousText.has(`${lesson.level}/${lesson.slug}/${track.id}`) && previousText.get(`${lesson.level}/${lesson.slug}/${track.id}`) !== track.text)
  .map((track) => ({ level: lesson.level, slug: lesson.slug, track: track.id, before: previousText.get(`${lesson.level}/${lesson.slug}/${track.id}`), after: track.text })))
let earlierChanges = []
try {
  earlierChanges = JSON.parse(await readFile(changesOutput, 'utf8'))
} catch {
  earlierChanges = []
}
const accumulatedChanges = new Map(earlierChanges.map((change) => [`${change.level}/${change.slug}/${change.track}`, change]))
for (const change of changedTracks) accumulatedChanges.set(`${change.level}/${change.slug}/${change.track}`, change)
await writeFile(output, `${JSON.stringify({ lessons }, null, 2)}\n`, 'utf8')
await writeFile(changesOutput, `${JSON.stringify([...accumulatedChanges.values()], null, 2)}\n`, 'utf8')
console.log(`Exportadas ${lessons.length} lecciones y ${lessons.reduce((sum, lesson) => sum + lesson.tracks.length, 0)} pistas a ${path.relative(root, output)}`)
console.log(`Pistas con texto actualizado: ${changedTracks.length} en esta exportación · ${accumulatedChanges.size} acumuladas`)
