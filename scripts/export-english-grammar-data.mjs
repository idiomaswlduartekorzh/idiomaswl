#!/usr/bin/env node

import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

const ROOT = process.cwd()
const TARGET = path.join(ROOT, 'tmp', 'english-grammar', 'topics.json')
const topics = []

for (const level of ['a1', 'a2', 'b1']) {
  const moduleUrl = pathToFileURL(path.join(ROOT, 'src', 'data', 'grammar', 'ingles', level, 'index.ts')).href
  const { default: levelTopics } = await import(`${moduleUrl}?export=${Date.now()}`)
  topics.push(...levelTopics.map((topic) => ({ ...topic, level: level.toUpperCase() })))
}

await mkdir(path.dirname(TARGET), { recursive: true })
await writeFile(TARGET, `${JSON.stringify(topics, null, 2)}\n`, 'utf8')
console.log(`Exportadas ${topics.length} lecciones a ${path.relative(ROOT, TARGET)}`)
