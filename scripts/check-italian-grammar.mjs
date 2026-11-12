#!/usr/bin/env node
import assert from 'node:assert/strict'
import { existsSync, statSync } from 'node:fs'
import path from 'node:path'
import italianA1 from '../src/data/grammar/italiano/a1/index.ts'
import italianA2 from '../src/data/grammar/italiano/a2/index.ts'
import italianB1 from '../src/data/grammar/italiano/b1/index.ts'

const ROOT = process.cwd()
const levels = { a1: italianA1, a2: italianA2, b1: italianB1 }
const withAssets = process.argv.includes('--assets')
const placeholders = (text) => [...String(text ?? '').matchAll(/\[\[(\d+)\]\]/g)].map((match) => Number(match[1]))
const interactionCount = (topic) => topic.practice.levels.reduce((total, level) => level.type === 'dual' ? total + level.items.reduce((sum, item) => sum + item.blanks.length, 0) : level.type === 'choice' || level.type === 'write' ? total + level.items.length : total + level.blanks.length, 0)

let totalTopics = 0
let totalInteractions = 0
for (const [level, topics] of Object.entries(levels)) {
  assert.equal(topics.length, 20, `${level.toUpperCase()}: sono attese 20 lezioni`)
  assert.equal(new Set(topics.map((topic) => topic.slug)).size, 20, `${level.toUpperCase()}: slug duplicati`)
  assert.deepEqual(topics.map((topic) => Number(topic.order)), Array.from({ length: 20 }, (_, index) => index + 1), `${level.toUpperCase()}: progressione incompleta`)
  let levelInteractions = 0
  for (const topic of topics) {
    const label = `${level.toUpperCase()}/${topic.slug}`
    assert.ok(topic.description.length >= 80, `${label}: spiegazione iniziale troppo corta`)
    assert.ok(topic.outcomes.length >= 3, `${label}: obiettivi incompleti`)
    assert.equal(topic.practice.levels.length, 6, `${label}: servono sei fasi di pratica`)
    const practiceTypes = new Set(topic.practice.levels.map((practice) => practice.type))
    for (const required of ['choice', 'dual', 'guidedText', 'freeText', 'write']) assert.ok(practiceTypes.has(required), `${label}: manca ${required}`)
    for (const practice of topic.practice.levels) {
      const practiceLabel = `${label}/${practice.id}`
      if (practice.type === 'choice') {
        assert.ok(practice.items.length >= 5, `${practiceLabel}: fase troppo corta`)
        for (const item of practice.items) {
          assert.equal(new Set(item.options).size, item.options.length, `${practiceLabel}: opzioni duplicate`)
          assert.ok(item.options.some((option) => option.toLocaleLowerCase('it') === item.answer.toLocaleLowerCase('it')), `${practiceLabel}: risposta assente`)
        }
      } else if (practice.type === 'dual') {
        assert.ok(practice.items.length >= 3, `${practiceLabel}: fase troppo corta`)
        for (const item of practice.items) assert.deepEqual(placeholders(item.lines.flat().join(' ')), item.blanks.map((_, index) => index), `${practiceLabel}: marcatori non validi`)
      } else if (practice.type === 'guidedText' || practice.type === 'freeText') {
        assert.ok(practice.blanks.length >= 4, `${practiceLabel}: testo troppo corto`)
        assert.deepEqual(placeholders(practice.text), practice.blanks.map((_, index) => index), `${practiceLabel}: marcatori non validi`)
      }
    }
    const words = [topic.description, topic.lead, ...topic.seo.flatMap((section) => section.paragraphs ?? [])].join(' ').split(/\s+/u).filter(Boolean).length
    const tables = 1 + topic.seo.filter((section) => section.table?.length).length
    const rows = topic.guide.table.length + topic.seo.reduce((total, section) => total + (section.table?.length ?? 0), 0)
    const interactions = interactionCount(topic)
    assert.ok(words >= (level === 'b1' ? 750 : level === 'a2' ? 650 : 600), `${label}: spiegazione troppo corta (${words})`)
    assert.ok(tables >= (level === 'b1' ? 8 : level === 'a2' ? 7 : 6), `${label}: mancano tabelle`)
    assert.ok(rows >= (level === 'b1' ? 40 : level === 'a2' ? 35 : 30), `${label}: tabelle troppo brevi`)
    assert.ok(topic.visual.scene.length >= (level === 'b1' ? 10 : level === 'a2' ? 9 : 8), `${label}: mappa visiva incompleta`)
    assert.ok(interactions >= (level === 'b1' ? 50 : level === 'a2' ? 45 : 40), `${label}: pratica troppo corta`)
    if (withAssets) {
      const root = path.join(ROOT, 'private', 'site-materials', `italiano-${level}`, 'grammar')
      const stem = topic.slug.endsWith(`-${level}`) ? `idiomaswl-${topic.slug}` : `idiomaswl-${topic.slug}-${level}`
      for (const suffix of ['', '-esercizi', '-soluzioni']) {
        const file = path.join(root, `${stem}${suffix}.pdf`)
        assert.ok(existsSync(file), `${label}: PDF mancante ${path.relative(ROOT, file)}`)
        assert.ok(statSync(file).size > 50_000, `${label}: PDF troppo piccolo`)
      }
    }
    levelInteractions += interactions
  }
  totalTopics += topics.length
  totalInteractions += levelInteractions
  console.log(`✓ Italiano ${level.toUpperCase()}: ${topics.length} lezioni e ${levelInteractions} decisioni.`)
}
console.log(`✓ Italiano A1-B1: ${totalTopics} lezioni e ${totalInteractions} decisioni${withAssets ? ' con 180 PDF verificati' : ''}.`)
