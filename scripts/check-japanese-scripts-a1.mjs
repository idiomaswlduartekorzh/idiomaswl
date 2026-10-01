import assert from 'node:assert/strict'
import { existsSync, statSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { JAPANESE_SCRIPTS_A1 } from '../src/data/japanese-scripts-a1.ts'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const expected = { hiragana: 46, katakana: 46, kanji: 20 }

for (const [id, lesson] of Object.entries(JAPANESE_SCRIPTS_A1)) {
  assert.equal(lesson.items.length, expected[id], `${id}: cantidad de caracteres incorrecta`)
  assert.equal(new Set(lesson.items.map((item) => item.glyph)).size, expected[id], `${id}: caracteres duplicados`)
  assert.equal(new Set(lesson.items.map((item) => item.code)).size, expected[id], `${id}: códigos de trazo duplicados`)
  assert.ok(lesson.intro.paragraphs.join(' ').length > 500, `${id}: explicación demasiado corta`)
  assert.equal(lesson.intro.examples.length, 6, `${id}: deben existir seis ejemplos con audio`)
  assert.equal(lesson.faqs.length, 4, `${id}: deben existir cuatro preguntas frecuentes`)

  const required = [lesson.image, lesson.resources.chart, lesson.resources.pdf, lesson.resources.strokes]
  for (const publicPath of required) {
    const target = path.join(ROOT, 'public', publicPath.replace(/^\//u, ''))
    assert.ok(existsSync(target), `${id}: falta ${publicPath}`)
    assert.ok(statSync(target).size > 1_000, `${id}: recurso vacío ${publicPath}`)
  }

  for (const item of lesson.items) {
    const svg = path.join(ROOT, 'public', 'japanese-a1', 'strokes', id, `${item.code}.svg`)
    assert.ok(existsSync(svg), `${id}: falta trazo ${item.glyph} (${item.code})`)
  }
}

const audioPaths = new Set(
  Object.values(JAPANESE_SCRIPTS_A1).flatMap((lesson) => [
    ...lesson.items.map((item) => item.audio),
    ...lesson.intro.examples.map((example) => example.audio),
  ]),
)

const requireAudio = process.argv.includes('--audio')
const missingAudio = [...audioPaths].filter((publicPath) => !existsSync(path.join(ROOT, 'public', publicPath.replace(/^\//u, ''))))
if (requireAudio) assert.deepEqual(missingAudio, [], `faltan audios:\n${missingAudio.join('\n')}`)

console.log(`✓ Japonés A1: 3 rutas, 112 trazos, 3 PDF, 3 tablas y ${audioPaths.size - missingAudio.length}/${audioPaths.size} audios presentes.`)
