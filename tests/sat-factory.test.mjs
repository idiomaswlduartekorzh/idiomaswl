import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import test from 'node:test'
import { spawnSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const catalogFile = path.join(ROOT, 'src/data/mocks/sat/catalog.json')

test('el catálogo registra exactamente los sets publicados', () => {
  const catalog = JSON.parse(fs.readFileSync(catalogFile, 'utf8'))
  const published = catalog.sets.filter((set) => set.status === 'published')
  const drafts = catalog.sets.filter((set) => set.status === 'draft')
  const cards = fs.readFileSync(path.join(ROOT, 'src/data/mocks/sat/catalog.generated.ts'), 'utf8')
  const registry = fs.readFileSync(path.join(ROOT, 'src/data/mocks/sat/registry.generated.ts'), 'utf8')

  for (const set of published) {
    assert.match(cards, new RegExp(`id: '${set.id}'`))
    assert.match(registry, new RegExp(`'sat:${set.id}'`))
  }
  for (const set of drafts) {
    assert.doesNotMatch(cards, new RegExp(`id: '${set.id}'`))
    assert.doesNotMatch(registry, new RegExp(`'sat:${set.id}'`))
  }
})

test('el generador ofrece un dry-run sin modificar el catálogo', () => {
  const before = fs.readFileSync(catalogFile, 'utf8')
  const result = spawnSync(process.execPath, ['scripts/scaffold-sat-set.mjs', '--set', '9999', '--dry-run'], {
    cwd: ROOT,
    encoding: 'utf8',
  })
  assert.equal(result.status, 0, result.stderr || result.stdout)
  assert.match(result.stdout, /81 slots/)
  assert.equal(fs.readFileSync(catalogFile, 'utf8'), before)
  assert.equal(fs.existsSync(path.join(ROOT, 'src/data/mocks/sat/drafts/set-9999')), false)
})

test('el guardián valida un módulo de borrador sin fingir que sus auditorías están completas', () => {
  const draftFile = 'src/data/mocks/sat/drafts/set-2/sat-set-2-m1.ts'
  const result = spawnSync(process.execPath, [
    'scripts/check-sat-exam.mjs', '--draft', '--file', draftFile, '--verbose',
  ], { cwd: ROOT, encoding: 'utf8' })

  assert.equal(result.status, 0, result.stderr || result.stdout)
  assert.match(result.stdout, /Ocho puertas mecánicas superadas/)
  assert.match(result.stdout, /NO publicable/)
})

test('el modo borrador no puede omitir actas fuera del directorio drafts', () => {
  const result = spawnSync(process.execPath, [
    'scripts/check-sat-exam.mjs', '--draft', '--file', 'src/data/mocks/sat/sat-set-1-m1.ts',
  ], { cwd: ROOT, encoding: 'utf8' })

  assert.notEqual(result.status, 0)
  assert.match(result.stderr, /solo admite archivos dentro de src\/data\/mocks\/sat\/drafts/)
})

test('la prueba ciega puede medir módulos que todavía viven en drafts', () => {
  const result = spawnSync(process.execPath, [
    'scripts/sat-blind-test.mjs', '--module', 'sat-set-2-m1',
    '--file', 'src/data/mocks/sat/drafts/set-2/sat-set-2-m1.ts', '--heuristics',
  ], { cwd: ROOT, encoding: 'utf8' })

  assert.equal(result.status, 0, result.stderr || result.stdout)
  assert.match(result.stdout, /media 23\.7 % · techo 35 %/)
  assert.match(result.stdout, /ítems acertados por ≥75 % de las heurísticas: ninguno/)
})
