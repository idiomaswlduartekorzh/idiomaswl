#!/usr/bin/env node
/** Resume the 24 advanced-reading groups without regenerating saved drafts. */
import { spawn } from 'node:child_process'
import { readdir } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const exerciseDir = path.join(root, 'src/data/reading/exercises')
const languages = ['en', 'fr', 'it', 'de', 'pt', 'ru', 'ja', 'ko']
const levels = ['B2', 'C1', 'C2']
const supportedModels = new Set(['gemini-3.8-flash', 'gemini-3.6-flash', 'gemini-3.1-flash-lite', 'gemini-3.5-flash-lite', 'gemini-3-flash-preview', 'gemini-2.5-flash-lite', 'gemini-2.5-flash'])
const requestedModels = process.argv.find((arg) => arg.startsWith('--models='))?.slice('--models='.length)
const models = requestedModels ? requestedModels.split(',') : [...supportedModels]
if (!models.length || models.some((model) => !supportedModels.has(model))) throw new Error('Invalid --models selection')
const minimum = 20
const pause = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

async function countGroup(language, level) {
  const prefix = `${language}-${level.toLowerCase()}-`
  return (await readdir(exerciseDir)).filter((file) => file.startsWith(prefix) && file.endsWith('.json')).length
}

async function run(args) {
  return await new Promise((resolve) => {
    const child = spawn(process.execPath, args, { cwd: root, env: process.env, stdio: ['ignore', 'pipe', 'pipe'] })
    let tail = ''
    const collect = (stream, output) => stream.on('data', (chunk) => {
      const text = chunk.toString()
      output.write(text)
      tail = `${tail}${text}`.slice(-3000)
    })
    collect(child.stdout, process.stdout)
    collect(child.stderr, process.stderr)
    child.on('error', (error) => resolve({ code: 1, tail: error.message }))
    child.on('exit', (code) => resolve({ code: code ?? 1, tail }))
  })
}

let completed = 0
for (const level of levels) {
  for (const language of languages) {
    let stalled = 0
    while (await countGroup(language, level) < minimum) {
      const before = await countGroup(language, level)
      const model = models[stalled % models.length]
      console.log(`\n[reading] ${language}/${level}: ${before}/${minimum}; trying ${model}`)
      const result = await run([
        'scripts/generate-reading-advanced-free.mjs',
        `--language=${language}`, `--level=${level}`, `--model=${model}`,
      ])
      const after = await countGroup(language, level)
      if (/Less than 1 GB of free disk space/.test(result.tail)) throw new Error('Generation paused because the disk has less than 1 GB free.')
      if (/(?:Gemini|Groq) (?:400|403|404):|API_KEY is not configured/.test(result.tail)) throw new Error(`Provider access failed for ${language}/${level}; ${result.tail.slice(-250)}`)
      if (/per day limit exceeded|PerDay|requests per day limit/i.test(result.tail)) throw new Error(`Daily free API quota exhausted at ${language}/${level}; resume after its reset.`)
      if (after > before) {
        completed += after - before
        stalled = 0
        console.log(`[reading] ${language}/${level}: saved ${after - before}; ${after}/${minimum}`)
        await pause(5000)
      } else {
        stalled++
        if (stalled >= 3) throw new Error(`${language}/${level} made no progress after three runs. Stop before wasting more free API requests.`)
        const delay = /429|quota|503|high demand/i.test(result.tail) ? 180_000 : 60_000
        console.log(`[reading] ${language}/${level}: no new draft; pause ${Math.round(delay / 1000)}s before retry ${stalled + 1}/3`)
        await pause(delay)
      }
    }
  }
}

const gate = await run(['scripts/check-reading-advanced-scale.mjs'])
console.log(`[reading] Generated ${completed} drafts in this run; scale gate ${gate.code === 0 ? 'passed' : 'failed'}.`)
process.exitCode = gate.code
