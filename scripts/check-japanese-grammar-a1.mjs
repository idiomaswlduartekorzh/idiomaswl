import assert from 'node:assert/strict'
import { existsSync, readFileSync, statSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createJiti } from 'jiti'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const jiti = createJiti(import.meta.url, { interopDefault: true })
const registry = await jiti.import(path.join(ROOT, 'src', 'data', 'grammar', 'registry.ts'))
const resources = await jiti.import(path.join(ROOT, 'src', 'data', 'japanese-grammar-a1.ts'))
const topics = registry.getTopicsByLevel('japones', 'a1')
const scriptSlugs = new Set(['hiragana-basico', 'katakana-basico', 'kanji-esencial-a1'])
const grammarTopics = topics.filter((topic) => !scriptSlugs.has(topic.slug))
const addedSlugs = [
  'demostrativos-kosoado', 'particula-no-posesion', 'particulas-to-mo',
  'kara-made-origen-limite', 'ubicacion-posiciones', 'suki-kirai-gustos',
  'invitaciones-masenka-mashou',
]

assert.equal(topics.length, 28, 'Japonés A1 debe publicar 28 temas de gramática')
assert.equal(grammarTopics.length, 25, 'Deben existir 25 lecciones gramaticales no dedicadas a sistemas de escritura')
assert.equal(resources.JAPANESE_GRAMMAR_A1_RESOURCE_COUNT, 25, 'El manifiesto debe cubrir las 25 lecciones')
for (const slug of addedSlugs) assert.ok(topics.some((topic) => topic.slug === slug), `Falta el tema nuevo ${slug}`)

let interactions = 0
for (const topic of topics) {
  assert.ok(topic.title.length > 18, `${topic.slug}: título demasiado corto`)
  assert.ok(topic.description.length > 90, `${topic.slug}: explicación demasiado corta`)
  assert.ok(topic.outcomes.length >= 3, `${topic.slug}: faltan resultados de aprendizaje`)
  assert.ok(topic.practice.levels.length >= 5, `${topic.slug}: requiere al menos cinco niveles`)
  for (const level of topic.practice.levels) {
    interactions += level.items?.length ?? level.blanks?.length ?? 0
  }
}
assert.ok(interactions >= 780, `La ruta completa debe conservar al menos 780 interacciones; hay ${interactions}`)

function assertMagic(file, magic, label) {
  assert.ok(existsSync(file), `Falta ${label}: ${path.relative(ROOT, file)}`)
  assert.ok(statSync(file).size > 1_000, `${label} está vacío o incompleto: ${path.relative(ROOT, file)}`)
  const head = readFileSync(file).subarray(0, magic.length)
  assert.deepEqual([...head], [...magic], `${label} tiene formato inválido: ${path.relative(ROOT, file)}`)
}

for (const topic of grammarTopics) {
  const resource = resources.getJapaneseGrammarResource(topic.slug)
  assert.ok(resource, `${topic.slug}: no tiene manifiesto visual/audio`)
  assertMagic(path.join(ROOT, 'public', resource.image), Buffer.from([0xff, 0xd8, 0xff]), 'imagen editorial')
  assertMagic(path.join(ROOT, 'public', resource.audio), Buffer.from('ID3'), 'audio MP3')
  assertMagic(path.join(ROOT, 'public', 'downloads', 'japanese-a1', 'grammar', `idiomaswl-${topic.slug}-a1.pdf`), Buffer.from('%PDF'), 'cuaderno PDF')
  assertMagic(path.join(ROOT, 'public', 'downloads', 'japanese-a1', 'grammar', `idiomaswl-${topic.slug}-map.png`), Buffer.from([0x89, 0x50, 0x4e, 0x47]), 'mapa PNG')
}

console.log(`✓ Japonés A1: ${topics.length} temas, ${interactions} interacciones, 25 PDF, 25 mapas y 25 audios verificados.`)
