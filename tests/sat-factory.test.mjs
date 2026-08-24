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
