#!/usr/bin/env node

import { existsSync, statSync } from 'node:fs'
import path from 'node:path'
import b2Topics from '../src/data/grammar/ingles/b2/index.ts'
import c1Topics from '../src/data/grammar/ingles/c1/index.ts'
import c2Topics from '../src/data/grammar/ingles/c2/index.ts'

const ROOT = process.cwd()
const levels = { b2: b2Topics, c1: c1Topics, c2: c2Topics }
const problems = []
const spanish = /[¿¡]|\b(?:gramática|explicación|ejercicios|práctica|escribe|corrige|transforma|elige|pasado|presente|respuesta|soluciones)\b/i

function inspectStrings(value, location) {
  if (typeof value === 'string') {
    if (spanish.test(value)) problems.push(`${location}: Spanish UI/content fragment: ${value}`)
    return
  }
  if (Array.isArray(value)) return value.forEach((item, index) => inspectStrings(item, `${location}[${index}]`))
  if (value && typeof value === 'object') Object.entries(value).forEach(([key, item]) => inspectStrings(item, `${location}.${key}`))
}

for (const [level, topics] of Object.entries(levels)) {
  if (topics.length !== 30) problems.push(`${level.toUpperCase()}: expected 30 topics, found ${topics.length}`)
  const slugs = new Set()
  const orders = new Set()
  for (const topic of topics) {
    const location = `${level}/${topic.slug}`
    if (slugs.has(topic.slug)) problems.push(`${location}: duplicate slug`)
    if (orders.has(topic.order)) problems.push(`${location}: duplicate order ${topic.order}`)
    slugs.add(topic.slug)
    orders.add(topic.order)
    if (topic.practice.levels.length !== 6) problems.push(`${location}: expected 6 practice stages`)
    if (topic.seo.length < 4) problems.push(`${location}: expected at least 4 explanation sections`)
    if (topic.outcomes.length < 3) problems.push(`${location}: expected at least 3 outcomes`)
    if (topic.guide.table.length < 3) problems.push(`${location}: reference table is incomplete`)
    if (topic.visual.scene.length < 3) problems.push(`${location}: visual map needs at least 3 contrasts`)
    inspectStrings(topic, location)

    const stem = topic.slug.endsWith(`-${level}`) ? `idiomaswl-${topic.slug}` : `idiomaswl-${topic.slug}-${level}`
    for (const suffix of ['', '-exercises', '-answer-key']) {
      const file = path.join(ROOT, 'private', 'site-materials', `ingles-${level}`, 'grammar', `${stem}${suffix}.pdf`)
      if (!existsSync(file)) problems.push(`${location}: missing ${path.relative(ROOT, file)}`)
      else if (statSync(file).size < 50_000) problems.push(`${location}: suspiciously small PDF ${path.relative(ROOT, file)}`)
    }
  }
}

if (problems.length) {
  console.error(`English B2-C2 grammar check failed with ${problems.length} problem(s):`)
  problems.forEach((problem) => console.error(`- ${problem}`))
  process.exit(1)
}

console.log('✓ English B2-C2: 90 complete topics, 6 practice stages each and 270 branded PDFs verified.')
