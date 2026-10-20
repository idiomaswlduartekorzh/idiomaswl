#!/usr/bin/env node

import { mkdir, readdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

const ROOT = process.cwd()
const SOURCE = path.join(ROOT, 'src', 'data', 'grammar', 'coreano')
const TARGET = path.join(ROOT, 'tmp', 'pdfs', 'korean-grammar', 'topics.json')
const { ensureKoreanPracticeDepth } = await import(
  `${pathToFileURL(path.join(SOURCE, 'ensure-practice-depth.ts')).href}?pdf=${Date.now()}`,
)

const topics = []
for (const level of ['a1', 'a2', 'b1']) {
  const directory = path.join(SOURCE, level)
  const files = (await readdir(directory)).filter((name) => name.endsWith('.ts') && name !== 'index.ts')
  const levelTopics = []
  for (const file of files) {
    const module = await import(`${pathToFileURL(path.join(directory, file)).href}?pdf=${Date.now()}`)
    const topic = level === 'a1' ? module.default : ensureKoreanPracticeDepth(module.default)
    levelTopics.push({ ...topic, level: level.toUpperCase() })
  }
  levelTopics.sort((a, b) => Number(a.order) - Number(b.order))
  topics.push(...levelTopics)
}

await mkdir(path.dirname(TARGET), { recursive: true })
await writeFile(TARGET, `${JSON.stringify(topics, null, 2)}\n`, 'utf8')
console.log(`Exportados ${topics.length} temas a ${path.relative(ROOT, TARGET)}`)
