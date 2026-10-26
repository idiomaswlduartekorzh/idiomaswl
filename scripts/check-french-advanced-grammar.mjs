#!/usr/bin/env node

import { existsSync, statSync } from 'node:fs'
import path from 'node:path'
import b2Topics from '../src/data/grammar/frances/b2/index.ts'
import c1Topics from '../src/data/grammar/frances/c1/index.ts'
import c2Topics from '../src/data/grammar/frances/c2/index.ts'

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
  if (topics.length !== 30) problems.push(`${level.toUpperCase()}: 30 thèmes attendus, ${topics.length} trouvés`)
  const slugs = new Set()
  const orders = new Set()
  for (const topic of topics) {
    const location = `${level}/${topic.slug}`
    if (slugs.has(topic.slug)) problems.push(`${location}: slug dupliqué`)
    if (orders.has(topic.order)) problems.push(`${location}: ordre ${topic.order} dupliqué`)
    slugs.add(topic.slug)
    orders.add(topic.order)
    if (topic.level !== level.toUpperCase()) problems.push(`${location}: niveau interne incorrect`)
    if (topic.practice.levels.length !== 6) problems.push(`${location}: six étapes de pratique attendues`)
    if (decisionCount(topic) < 30) problems.push(`${location}: moins de 30 décisions d’apprentissage`)
    if (topic.seo.length < 4) problems.push(`${location}: quatre sections pédagogiques attendues`)
    if (topic.outcomes.length < 4) problems.push(`${location}: quatre objectifs attendus`)
    if (topic.guide.table.length < 4) problems.push(`${location}: tableau de référence incomplet`)
    if (topic.visual.scene.length < 3) problems.push(`${location}: carte visuelle incomplète`)

    const stem = `idiomaswl-${topic.slug}`
    for (const suffix of ['', '-exercices', '-corrige']) {
      const file = path.join(ROOT, 'private', 'site-materials', `frances-${level}`, 'grammar', `${stem}${suffix}.pdf`)
      if (!existsSync(file)) problems.push(`${location}: PDF manquant ${path.relative(ROOT, file)}`)
      else if (statSync(file).size < 50_000) problems.push(`${location}: PDF anormalement petit ${path.relative(ROOT, file)}`)
    }
  }
}

if (problems.length) {
  console.error(`French B2-C2 grammar check failed with ${problems.length} problem(s):`)
  problems.forEach((problem) => console.error(`- ${problem}`))
  process.exit(1)
}

console.log('✓ Français B2-C2 : 90 thèmes complets, 6 étapes par thème et 270 PDF de marque vérifiés.')
