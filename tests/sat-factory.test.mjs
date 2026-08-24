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

test('un acta debe declarar publicable true; omitir el campo no da luz verde', () => {
  const checker = fs.readFileSync(path.join(ROOT, 'scripts/check-sat-exam.mjs'), 'utf8')
  assert.match(checker, /a\.publicable !== true/)
  assert.doesNotMatch(checker, /a\.publicable === false/)
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

test('los tres módulos publicados del set 2 conservan todas las puertas y la progresión adaptativa', () => {
  const manifest = JSON.parse(fs.readFileSync(path.join(
    ROOT, 'src/data/mocks/sat/drafts/set-2/manifest.json',
  ), 'utf8'))
  const means = {}

  assert.equal(manifest.status, 'published')
  assert.equal(manifest.publishable, true)

  for (const publishedModule of manifest.modules) {
    assert.equal(publishedModule.status, 'published')
    assert.equal(publishedModule.writtenQuestions, 27)
    assert.equal(publishedModule.mechanicalGates, 'PASS')
    assert.equal(publishedModule.editorialGates, 'PASS_WITH_DECLARED_LIMITS')
    assert.equal(publishedModule.productGate, 'PASS')
    assert.equal(publishedModule.slots.filter((slot) => slot.status === 'written').length, 27)
    means[publishedModule.variant] = publishedModule.slots.reduce((sum, slot) => sum + slot.difficulty, 0) / 27

    const result = spawnSync(process.execPath, [
      'scripts/check-sat-exam.mjs', '--module', publishedModule.id,
    ], { cwd: ROOT, encoding: 'utf8' })
    assert.equal(result.status, 0, result.stderr || result.stdout)
  }

  assert.ok(means['M2-facil'] < means.M1, JSON.stringify(means))
  assert.ok(means['M2-dificil'] > means.M1, JSON.stringify(means))
})

test('ningún módulo SAT reutiliza secuencias internas de ocho palabras', () => {
  const result = spawnSync(process.execPath, ['scripts/check-sat-originality-local.mjs'], {
    cwd: ROOT,
    encoding: 'utf8',
  })
  assert.equal(result.status, 0, result.stderr || result.stdout)
  assert.match(result.stdout, /sin coincidencias de 8\+ palabras/)
})

test('el set 2 publicado supera el contrato adaptativo desde el catálogo', () => {
  const catalog = JSON.parse(fs.readFileSync(catalogFile, 'utf8'))
  assert.equal(catalog.sets.find((set) => set.id === 'set-2')?.status, 'published')
  const result = spawnSync(process.execPath, ['scripts/check-sat-adaptive.mjs'], {
    cwd: ROOT,
    encoding: 'utf8',
  })
  assert.equal(result.status, 0, result.stderr || result.stdout)
  assert.match(result.stdout, /2 set\(s\) publicado\(s\) auditado\(s\)/)
})
