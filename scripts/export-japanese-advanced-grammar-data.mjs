#!/usr/bin/env node
import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
const ROOT = process.cwd(), TARGET = path.join(ROOT, 'tmp', 'japanese-advanced-grammar', 'topics.json'), topics = []
const levels = (process.env.JAPANESE_ADVANCED_GRAMMAR_LEVELS ?? 'b2,c1,c2').split(',').map((level) => level.trim()).filter(Boolean)
for (const level of levels) {
  const moduleUrl = pathToFileURL(path.join(ROOT, 'src', 'data', 'grammar', 'japones', level, 'index.ts')).href
  const { default: levelTopics } = await import(`${moduleUrl}?export=${Date.now()}`)
  topics.push(...levelTopics.map((topic) => ({ ...topic, level: level.toUpperCase() })))
}
await mkdir(path.dirname(TARGET), { recursive: true })
await writeFile(TARGET, `${JSON.stringify(topics, null, 2)}\n`, 'utf8')
console.log(`日本語上級文法${topics.length}レッスンを${path.relative(ROOT, TARGET)}に書き出しました。`)
