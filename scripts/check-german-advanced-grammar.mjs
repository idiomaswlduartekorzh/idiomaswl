#!/usr/bin/env node

import { existsSync, statSync } from 'node:fs'
import path from 'node:path'
import b2Topics from '../src/data/grammar/aleman/b2/index.ts'
import c1Topics from '../src/data/grammar/aleman/c1/index.ts'
import c2Topics from '../src/data/grammar/aleman/c2/index.ts'

const ROOT = process.cwd()
const levels = { b2: b2Topics, c1: c1Topics, c2: c2Topics }
const problems = []

function decisionCount(topic) {
  return topic.practice.levels.reduce((total, level) => {
    if (level.type === 'dual') return total + level.items.reduce((sum, item) => sum + item.blanks.length, 0)
    if (level.type === 'choice' || level.type === 'write') return total + level.items.length
    return total + level.blanks.length
  }, 0)
}

for (const [level, topics] of Object.entries(levels)) {
  if (topics.length !== 30) problems.push(`${level.toUpperCase()}: 30 Themen erwartet, ${topics.length} gefunden`)
  const slugs = new Set()
  const orders = new Set()
  for (const topic of topics) {
    const location = `${level}/${topic.slug}`
    if (slugs.has(topic.slug)) problems.push(`${location}: doppelter Slug`)
    if (orders.has(topic.order)) problems.push(`${location}: doppelte Reihenfolge ${topic.order}`)
    slugs.add(topic.slug)
    orders.add(topic.order)
    if (topic.level !== level.toUpperCase()) problems.push(`${location}: falsches internes Niveau`)
    if (topic.practice.levels.length !== 6) problems.push(`${location}: sechs Übungsstufen erwartet`)
    if (decisionCount(topic) < 30) problems.push(`${location}: weniger als 30 Lernentscheidungen`)
    if (topic.seo.length < 4) problems.push(`${location}: vier pädagogische Abschnitte erwartet`)
    if (topic.outcomes.length < 4) problems.push(`${location}: vier Lernziele erwartet`)
    if (topic.guide.table.length < 4) problems.push(`${location}: unvollständige Referenztabelle`)
    if (topic.visual.scene.length < 3) problems.push(`${location}: unvollständige visuelle Karte`)

    const stem = `idiomaswl-${topic.slug}`
    for (const suffix of ['', '-uebungen', '-loesungen']) {
      const file = path.join(ROOT, 'private', 'site-materials', `aleman-${level}`, 'grammar', `${stem}${suffix}.pdf`)
      if (!existsSync(file)) problems.push(`${location}: PDF fehlt ${path.relative(ROOT, file)}`)
      else if (statSync(file).size < 50_000) problems.push(`${location}: PDF ungewöhnlich klein ${path.relative(ROOT, file)}`)
    }
  }
}

if (problems.length) {
  console.error(`German B2-C2 grammar check failed with ${problems.length} problem(s):`)
  problems.forEach((problem) => console.error(`- ${problem}`))
  process.exit(1)
}

console.log('✓ Deutsch B2-C2: 90 vollständige Themen, 6 Stufen pro Thema und 270 Marken-PDFs geprüft.')
