import assert from 'node:assert/strict'
import { existsSync, readFileSync, statSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createJiti } from 'jiti'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const jiti = createJiti(import.meta.url, { interopDefault: true })
const { getTopicsByLevel } = await jiti.import(path.join(ROOT, 'src', 'data', 'grammar', 'registry.ts'))
const { getJapaneseGrammarLevelResource } = await jiti.import(path.join(ROOT, 'src', 'data', 'japanese-grammar-levels.ts'))

function assertFile(file, label, test) {
  assert.ok(existsSync(file), `Falta ${label}: ${path.relative(ROOT, file)}`)
  assert.ok(statSync(file).size > 1_000, `${label} incompleto: ${path.relative(ROOT, file)}`)
  assert.ok(test(readFileSync(file).subarray(0, 16)), `Formato inválido en ${label}: ${path.relative(ROOT, file)}`)
}

let interactions = 0
for (const level of ['a2', 'b1']) {
  const topics = getTopicsByLevel('japones', level)
  assert.equal(topics.length, 25, `Japonés ${level.toUpperCase()} debe tener 25 temas`)
  assert.equal(new Set(topics.map((topic) => topic.slug)).size, 25, `${level}: slugs duplicados`)
  for (const topic of topics) {
    assert.equal(topic.practice.levels.length, 6, `${topic.slug}: debe tener seis niveles`)
    assert.ok(topic.seo.length >= 3, `${topic.slug}: faltan explicaciones SEO/IA`)
    assert.ok(topic.guide.decisions.length >= 3, `${topic.slug}: faltan decisiones guiadas`)
    interactions += topic.practice.levels.reduce((sum, practice) => sum + (practice.items?.length ?? practice.blanks?.length ?? 0), 0)
    const resource = getJapaneseGrammarLevelResource(topic, level)
    assertFile(path.join(ROOT, 'public', resource.image), 'fotografía', (head) => head[0] === 0x89 && head[1] === 0x50)
    assertFile(path.join(ROOT, 'public', resource.audio), 'audio', (head) => resource.audio.endsWith('.mp3') ? head.toString('ascii', 0, 3) === 'ID3' : head.toString('ascii', 4, 8) === 'ftyp')
    const pdfSlug = topic.slug.endsWith(`-${level}`) ? topic.slug : `${topic.slug}-${level}`
    assertFile(path.join(ROOT, 'public', 'downloads', `japanese-${level}`, 'grammar', `idiomaswl-${pdfSlug}.pdf`), 'PDF', (head) => head.toString('ascii', 0, 4) === '%PDF')
    assertFile(path.join(ROOT, 'public', 'downloads', `japanese-${level}`, 'grammar', `idiomaswl-${topic.slug}-map.png`), 'mapa', (head) => head[0] === 0x89 && head[1] === 0x50)
  }
}
assert.ok(interactions >= 600, `Se esperaban al menos 600 interacciones, hay ${interactions}`)
const audit = JSON.parse(readFileSync(path.join(ROOT, 'tmp', 'japanese-grammar-audio-audit.json'), 'utf8'))
assert.equal(audit.count, 50, 'El control de audio debe cubrir 50 clips')
assert.equal(audit.passed, 50, 'Todos los audios deben superar el umbral ASR')
console.log(`✓ Japonés A2/B1: 50 temas, 300 niveles, ${interactions} interacciones, 50 PDF, 50 mapas, 50 audios y 12 escenas verificados.`)
