#!/usr/bin/env node

import assert from 'node:assert/strict'
import { existsSync, statSync } from 'node:fs'
import path from 'node:path'
import germanA1 from '../src/data/grammar/aleman/a1/index.ts'
import germanA2 from '../src/data/grammar/aleman/a2/index.ts'
import germanB1 from '../src/data/grammar/aleman/b1/index.ts'

const ROOT = process.cwd()
const levels = { a1: germanA1, a2: germanA2, b1: germanB1 }
const withAssets = process.argv.includes('--assets')

function placeholders(text) {
  return [...String(text ?? '').matchAll(/\[\[(\d+)\]\]/g)].map((match) => Number(match[1]))
}

function interactionCount(topic) {
  return topic.practice.levels.reduce((total, level) => {
    if (level.type === 'dual') return total + level.items.reduce((sum, item) => sum + item.blanks.length, 0)
    if (level.type === 'choice' || level.type === 'write') return total + level.items.length
    return total + level.blanks.length
  }, 0)
}

let totalTopics = 0
let totalInteractions = 0

for (const [level, topics] of Object.entries(levels)) {
  assert.equal(topics.length, 20, `${level.toUpperCase()}: 20 Themen erwartet`)
  assert.equal(new Set(topics.map((topic) => topic.slug)).size, topics.length, `${level.toUpperCase()}: doppelte Slugs`)
  assert.deepEqual(topics.map((topic) => Number(topic.order)), Array.from({ length: topics.length }, (_, index) => index + 1), `${level.toUpperCase()}: Reihenfolge mit Lücken`)

  let levelInteractions = 0
  for (const topic of topics) {
    const label = `${level.toUpperCase()}/${topic.slug}`
    assert.ok(topic.title.length >= 12, `${label}: Titel zu kurz`)
    assert.ok(topic.description.length >= 80, `${label}: Beschreibung zu kurz`)
    assert.ok(topic.outcomes.length >= 3, `${label}: Lernziele fehlen`)
    assert.equal(topic.practice.levels.length, 6, `${label}: sechs Übungsstufen erwartet`)
    const practiceTypes = new Set(topic.practice.levels.map((practice) => practice.type))
    for (const requiredType of ['choice', 'dual', 'guidedText', 'freeText', 'write']) {
      assert.ok(practiceTypes.has(requiredType), `${label}: Übungstyp ${requiredType} fehlt`)
    }

    for (const practice of topic.practice.levels) {
      const practiceLabel = `${label}/${practice.id}`
      assert.ok(practice.title?.trim() && practice.intro?.trim(), `${practiceLabel}: Überschrift unvollständig`)
      if (practice.type === 'choice') {
        assert.ok(practice.items.length >= 5, `${practiceLabel}: zu kurz`)
        for (const item of practice.items) {
          assert.equal(new Set(item.options).size, item.options.length, `${practiceLabel}: doppelte Auswahl`)
          assert.ok(item.options.some((option) => option.toLowerCase() === item.answer.toLowerCase()), `${practiceLabel}: Lösung nicht in Auswahl`)
          assert.ok(item.explain?.trim().length >= 3, `${practiceLabel}: Erklärung fehlt`)
        }
      } else if (practice.type === 'dual') {
        assert.ok(practice.items.length >= 3, `${practiceLabel}: zu kurz`)
        for (const item of practice.items) {
          assert.deepEqual(placeholders(item.lines.flat().join(' ')), item.blanks.map((_, index) => index), `${practiceLabel}: ungültige Platzhalter`)
        }
      } else if (practice.type === 'guidedText' || practice.type === 'freeText') {
        assert.ok(practice.blanks.length >= 4, `${practiceLabel}: zu kurz`)
        assert.deepEqual(placeholders(practice.text), practice.blanks.map((_, index) => index), `${practiceLabel}: ungültige Platzhalter`)
      } else {
        assert.ok(practice.items.length >= 2, `${practiceLabel}: zu kurz`)
      }
    }

    const explanationWords = [topic.description, topic.lead, ...topic.seo.flatMap((section) => section.paragraphs ?? [])].join(' ').split(/\s+/u).filter(Boolean).length
    const tableCount = 1 + topic.seo.filter((section) => section.table?.length).length
    const tableRows = topic.guide.table.length + topic.seo.reduce((total, section) => total + (section.table?.length ?? 0), 0)
    const interactions = interactionCount(topic)
    const minimumWords = level === 'b1' ? 750 : level === 'a2' ? 650 : 600
    const minimumTables = level === 'b1' ? 8 : level === 'a2' ? 7 : 6
    const minimumRows = level === 'b1' ? 40 : level === 'a2' ? 35 : 30
    const minimumVisuals = level === 'b1' ? 10 : level === 'a2' ? 9 : 8
    const minimumInteractions = level === 'b1' ? 50 : level === 'a2' ? 45 : 40
    assert.ok(explanationWords >= minimumWords, `${label}: Erklärung zu kurz (${explanationWords})`)
    assert.ok(tableCount >= minimumTables && tableRows >= minimumRows, `${label}: zu wenige Erklärungstabellen`)
    assert.ok(topic.visual.scene.length >= minimumVisuals, `${label}: visuelle Karte zu kurz`)
    assert.ok(topic.guide.decisions.length >= 10, `${label}: Entscheidungsweg zu kurz`)
    assert.ok(interactions >= minimumInteractions, `${label}: nur ${interactions} Lernentscheidungen`)

    if (withAssets) {
      const root = path.join(ROOT, 'private', 'site-materials', `aleman-${level}`, 'grammar')
      const stem = topic.slug.endsWith(`-${level}`) ? `idiomaswl-${topic.slug}` : `idiomaswl-${topic.slug}-${level}`
      for (const suffix of ['', '-uebungen', '-loesungen']) {
        const file = path.join(root, `${stem}${suffix}.pdf`)
        assert.ok(existsSync(file), `${label}: PDF fehlt ${path.relative(ROOT, file)}`)
        assert.ok(statSync(file).size > 50_000, `${label}: PDF ungewöhnlich klein`)
      }
    }
    levelInteractions += interactions
  }

  totalTopics += topics.length
  totalInteractions += levelInteractions
  console.log(`✓ Deutsch ${level.toUpperCase()}: ${topics.length} Lektionen und ${levelInteractions} Lernentscheidungen.`)
}

console.log(`✓ Deutsch A1-B1: ${totalTopics} Lektionen und ${totalInteractions} Lernentscheidungen${withAssets ? ' mit 180 geprüften PDFs' : ''}.`)
