#!/usr/bin/env node
import fs from 'node:fs'
import path from 'node:path'
import vm from 'node:vm'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'

/**
 * Detecta reutilización interna de secuencias de ocho palabras en estímulos y opciones.
 * No sustituye una búsqueda contra fuentes externas, pero impide que un set nuevo copie
 * sin querer material de otro set del propio repositorio.
 */

const require = createRequire(import.meta.url)
const ts = require('typescript')
const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const satRoot = path.join(repoRoot, 'src/data/mocks/sat')
const cache = new Map()

function loadTs(file) {
  const resolved = path.resolve(file)
  if (cache.has(resolved)) return cache.get(resolved)
  const out = ts.transpileModule(fs.readFileSync(resolved, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
    reportDiagnostics: true,
  })
  const errors = (out.diagnostics || []).filter((item) => item.category === ts.DiagnosticCategory.Error)
  if (errors.length) throw new Error(`${resolved}: ${ts.flattenDiagnosticMessageText(errors[0].messageText, ' ')}`)
  const localRequire = (spec) => {
    if (!spec.startsWith('.')) return require(spec)
    const base = path.resolve(path.dirname(resolved), spec)
    for (const candidate of [base, `${base}.ts`, path.join(base, 'index.ts')]) {
      if (fs.existsSync(candidate) && fs.statSync(candidate).isFile()) return loadTs(candidate)
    }
    return {}
  }
  const sandbox = { exports: {}, module: { exports: {} }, require: localRequire, console }
  sandbox.module.exports = sandbox.exports
  vm.runInNewContext(out.outputText, sandbox, { filename: resolved })
  cache.set(resolved, sandbox.exports)
  return sandbox.exports
}

function walk(dir) {
  if (!fs.existsSync(dir)) return []
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const target = path.join(dir, entry.name)
    return entry.isDirectory() ? walk(target) : [target]
  })
}

const moduleFiles = [
  ...fs.readdirSync(satRoot)
    .filter((name) => /^sat-set-\d+-m(?:1|2-(?:facil|dificil))\.ts$/.test(name))
    .map((name) => path.join(satRoot, name)),
  ...walk(path.join(satRoot, 'drafts'))
    .filter((file) => /sat-set-\d+-m(?:1|2-(?:facil|dificil))\.ts$/.test(file)),
]

const loadedModules = moduleFiles.flatMap((file) =>
  Object.values(loadTs(file)).filter((value) => value?.id && Array.isArray(value.items)),
)
const modules = [...new Map(loadedModules.map((module) => [module.id, module])).values()]
const canonical = 'while researching a topic a student has taken the following notes'
const seen = new Map()
const collisions = new Map()

for (const module of modules) {
  for (const item of module.items) {
    for (const raw of [item.stimulus, ...item.options]) {
      const words = raw.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim().split(/\s+/)
      for (let index = 0; index <= words.length - 8; index++) {
        const phrase = words.slice(index, index + 8).join(' ')
        if (canonical.includes(phrase) || phrase.startsWith('a student has taken the following notes')) continue
        const owner = `${module.id}:${item.id}`
        const previous = seen.get(phrase)
        if (previous && previous !== owner) {
          collisions.set(`${phrase}|${previous}|${owner}`, { phrase, previous, owner })
        } else seen.set(phrase, owner)
      }
    }
  }
}

if (collisions.size) {
  console.error(`❌ Originalidad local: ${collisions.size} coincidencia(s) de 8+ palabras.`)
  for (const match of collisions.values()) {
    console.error(`   · ${match.previous} ↔ ${match.owner}: “${match.phrase}”`)
  }
  process.exit(1)
}

console.log(`✅ Originalidad local: sin coincidencias de 8+ palabras entre ${modules.length} módulos y ${modules.reduce((sum, module) => sum + module.items.length, 0)} ítems.`)
