#!/usr/bin/env node

import assert from 'node:assert/strict'
import { existsSync, statSync } from 'node:fs'
import path from 'node:path'
import frenchA1 from '../src/data/grammar/frances/a1/index.ts'
import frenchA2 from '../src/data/grammar/frances/a2/index.ts'
import frenchB1 from '../src/data/grammar/frances/b1/index.ts'

const ROOT = process.cwd()
const levels = { a1: frenchA1, a2: frenchA2, b1: frenchB1 }
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
  assert.equal(topics.length, 20, `${level.toUpperCase()} : 20 thèmes attendus`)
  assert.equal(new Set(topics.map((topic) => topic.slug)).size, topics.length, `${level.toUpperCase()} : slugs dupliqués`)
  assert.deepEqual(topics.map((topic) => Number(topic.order)), Array.from({ length: 20 }, (_, index) => index + 1), `${level.toUpperCase()} : progression incomplète`)
  let levelInteractions = 0

  for (const topic of topics) {
    const label = `${level.toUpperCase()}/${topic.slug}`
    assert.ok(topic.title.length >= 12, `${label} : titre trop court`)
    assert.ok(topic.description.length >= 80, `${label} : description trop courte`)
    assert.ok(topic.outcomes.length >= 3, `${label} : objectifs incomplets`)
    assert.equal(topic.practice.levels.length, 6, `${label} : six étapes de pratique attendues`)
    const practiceTypes = new Set(topic.practice.levels.map((practice) => practice.type))
    for (const requiredType of ['choice', 'dual', 'guidedText', 'freeText', 'write']) {
      assert.ok(practiceTypes.has(requiredType), `${label} : type ${requiredType} manquant`)
    }

    for (const practice of topic.practice.levels) {
      const practiceLabel = `${label}/${practice.id}`
      assert.ok(practice.title?.trim() && practice.intro?.trim(), `${practiceLabel} : consigne incomplète`)
      if (practice.type === 'choice') {
        assert.ok(practice.items.length >= 5, `${practiceLabel} : étape trop courte`)
        for (const item of practice.items) {
          assert.equal(new Set(item.options).size, item.options.length, `${practiceLabel} : choix dupliqué`)
          assert.ok(item.options.some((option) => option.toLowerCase() === item.answer.toLowerCase()), `${practiceLabel} : réponse absente des choix`)
          assert.ok(item.explain?.trim().length >= 3, `${practiceLabel} : explication manquante`)
        }
      } else if (practice.type === 'dual') {
        assert.ok(practice.items.length >= 3, `${practiceLabel} : étape trop courte`)
        for (const item of practice.items) {
          assert.deepEqual(placeholders(item.lines.flat().join(' ')), item.blanks.map((_, index) => index), `${practiceLabel} : marqueurs invalides`)
        }
      } else if (practice.type === 'guidedText' || practice.type === 'freeText') {
        assert.ok(practice.blanks.length >= 4, `${practiceLabel} : texte trop court`)
        assert.deepEqual(placeholders(practice.text), practice.blanks.map((_, index) => index), `${practiceLabel} : marqueurs invalides`)
      } else {
        assert.ok(practice.items.length >= 2, `${practiceLabel} : production trop courte`)
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
    assert.ok(explanationWords >= minimumWords, `${label} : explication trop courte (${explanationWords})`)
    assert.ok(tableCount >= minimumTables && tableRows >= minimumRows, `${label} : tableaux insuffisants`)
    assert.ok(topic.visual.scene.length >= minimumVisuals, `${label} : carte visuelle trop courte`)
    assert.ok(topic.guide.decisions.length >= 10, `${label} : raisonnement guidé trop court`)
    assert.ok(interactions >= minimumInteractions, `${label} : seulement ${interactions} décisions`)

    if (withAssets) {
      const root = path.join(ROOT, 'private', 'site-materials', `frances-${level}`, 'grammar')
      const stem = topic.slug.endsWith(`-${level}`) ? `idiomaswl-${topic.slug}` : `idiomaswl-${topic.slug}-${level}`
      for (const suffix of ['', '-exercices', '-corrige']) {
        const file = path.join(root, `${stem}${suffix}.pdf`)
        assert.ok(existsSync(file), `${label} : PDF manquant ${path.relative(ROOT, file)}`)
        assert.ok(statSync(file).size > 50_000, `${label} : PDF anormalement petit`)
      }
    }
    levelInteractions += interactions
  }

  totalTopics += topics.length
  totalInteractions += levelInteractions
  console.log(`✓ Français ${level.toUpperCase()} : ${topics.length} leçons et ${levelInteractions} décisions d’apprentissage.`)
}

console.log(`✓ Français A1-B1 : ${totalTopics} leçons et ${totalInteractions} décisions${withAssets ? ' avec 180 PDF vérifiés' : ''}.`)
