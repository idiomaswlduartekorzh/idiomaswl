import assert from 'node:assert/strict'
import { existsSync } from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

const ROOT = process.cwd()
const expected = { a1: 27, a2: 24, b1: 23 }
const withAssets = process.argv.includes('--assets')

function placeholders(text) {
  return [...String(text ?? '').matchAll(/\[\[(\d+)\]\]/g)].map((match) => Number(match[1]))
}

function countInteractions(level) {
  if (level.type === 'choice' || level.type === 'write') return level.items.length
  if (level.type === 'dual') return level.items.reduce((total, item) => total + item.blanks.length, 0)
  return level.blanks.length
}

function assertBlank(blank, label) {
  assert.ok(blank.answer?.trim(), `${label}: falta respuesta`)
  assert.ok(blank.explain?.trim().length >= 3, `${label}: falta explicación útil`)
  if (blank.options) {
    assert.ok(blank.options.length >= 2, `${label}: faltan opciones`)
    assert.equal(new Set(blank.options).size, blank.options.length, `${label}: opciones duplicadas`)
    assert.ok(blank.options.some((option) => option.toLowerCase() === blank.answer.toLowerCase()), `${label}: la respuesta no está en las opciones`)
  }
}

let totalTopics = 0
let totalInteractions = 0

for (const level of Object.keys(expected)) {
  const moduleUrl = pathToFileURL(path.join(ROOT, 'src', 'data', 'grammar', 'ingles', level, 'index.ts')).href
  const { default: topics } = await import(`${moduleUrl}?audit=${Date.now()}`)
  assert.equal(topics.length, expected[level], `${level.toUpperCase()}: cobertura incompleta`)
  assert.equal(new Set(topics.map((topic) => topic.slug)).size, topics.length, `${level.toUpperCase()}: slugs duplicados`)
  assert.deepEqual(topics.map((topic) => Number(topic.order)), Array.from({ length: topics.length }, (_, index) => index + 1), `${level.toUpperCase()}: orden con huecos`)

  let levelInteractions = 0
  for (const topic of topics) {
    const label = `${level.toUpperCase()}/${topic.slug}`
    assert.ok(topic.title.length >= 12, `${label}: título demasiado corto`)
    assert.ok(topic.description.length >= 80, `${label}: descripción insuficiente`)
    assert.ok(topic.lead.length >= 45, `${label}: introducción insuficiente`)
    assert.ok(topic.outcomes.length >= 3, `${label}: faltan resultados`)
    assert.ok(topic.seo.length >= 3, `${label}: desarrollo editorial insuficiente`)
    assert.ok(topic.guide.decisions.length >= 3, `${label}: faltan decisiones guiadas`)
    assert.ok(topic.guide.mistakes.length >= 3, `${label}: faltan errores frecuentes`)
    assert.ok(topic.guide.table.length >= 3, `${label}: tabla pedagógica insuficiente`)
    assert.ok(topic.visual.scene.length >= 3, `${label}: faltan ejemplos visuales`)
    assert.ok(topic.practice.levels.length >= 6, `${label}: deben existir al menos seis niveles`)
    const practiceTypes = new Set(topic.practice.levels.map((item) => item.type))
    for (const requiredType of ['choice', 'dual', 'guidedText', 'freeText', 'write']) {
      assert.ok(practiceTypes.has(requiredType), `${label}: falta práctica ${requiredType}`)
    }

    let interactions = 0
    for (const practice of topic.practice.levels) {
      const practiceLabel = `${label}/${practice.id}`
      assert.ok(practice.title?.trim() && practice.intro?.trim(), `${practiceLabel}: encabezado incompleto`)
      if (practice.type === 'choice') {
        assert.ok(practice.items.length >= 5, `${practiceLabel}: muy corto`)
        for (const item of practice.items) {
          assert.equal(new Set(item.options).size, item.options.length, `${practiceLabel}: opciones duplicadas`)
          assert.ok(item.options.some((option) => option.toLowerCase() === item.answer.toLowerCase()), `${practiceLabel}: respuesta fuera de opciones`)
          assert.ok(item.explain?.trim().length >= 3, `${practiceLabel}: falta explicación`)
        }
      } else if (practice.type === 'dual') {
        assert.ok(practice.items.length >= 3, `${practiceLabel}: muy corto`)
        for (const item of practice.items) {
          assert.deepEqual(placeholders(item.lines.flat().join(' ')), item.blanks.map((_, index) => index), `${practiceLabel}: marcadores inválidos`)
          item.blanks.forEach((blank, index) => assertBlank(blank, `${practiceLabel}/${index}`))
        }
      } else if (practice.type === 'guidedText' || practice.type === 'freeText') {
        assert.ok(practice.blanks.length >= 4, `${practiceLabel}: muy corto`)
        assert.deepEqual(placeholders(practice.text), practice.blanks.map((_, index) => index), `${practiceLabel}: marcadores inválidos`)
        practice.blanks.forEach((blank, index) => assertBlank(blank, `${practiceLabel}/${index}`))
      } else {
        assert.ok(practice.items.length >= 2, `${practiceLabel}: muy corto`)
        for (const item of practice.items) {
          assert.ok(item.prompt?.trim().length >= 10, `${practiceLabel}: consigna insuficiente`)
          assert.ok(item.answer?.trim() && item.explain?.trim().length >= 3, `${practiceLabel}: modelo o explicación incompletos`)
        }
      }
      interactions += countInteractions(practice)
    }
    assert.ok(interactions >= 28, `${label}: solo ${interactions} interacciones`)
    if (withAssets) {
      const file = topic.slug.endsWith(`-${level}`) ? `idiomaswl-${topic.slug}.pdf` : `idiomaswl-${topic.slug}-${level}.pdf`
      assert.ok(existsSync(path.join(ROOT, 'private', 'site-materials', `ingles-${level}`, 'grammar', file)), `${label}: falta PDF`)
      for (const audio of ['modelo-estructura', 'contraste-guiado', 'practica-contexto']) {
        assert.ok(existsSync(path.join(ROOT, 'public', 'audio', 'ingles', level, 'grammar', topic.slug, `${audio}.m4a`)), `${label}: falta audio ${audio}`)
      }
    }
    levelInteractions += interactions
  }
  totalTopics += topics.length
  totalInteractions += levelInteractions
  console.log(`✓ Inglés ${level.toUpperCase()}: ${topics.length} lecciones y ${levelInteractions} interacciones.`)
}

console.log(`✓ Total: ${totalTopics} lecciones, ${totalInteractions} interacciones${withAssets ? ', PDFs y audios completos' : ''}.`)
