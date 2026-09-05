#!/usr/bin/env node

import { execFileSync } from 'node:child_process'
import { existsSync, mkdirSync, readdirSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { GERMAN_STRUCTURE_QUEST } from '../src/data/practica/german-structure-quest-config.ts'
import {
  createWorkOrder,
  deriveState,
  fingerprintsForForm,
  loadHarness,
  readJson,
  readRunReports,
  requiredRoleIds,
  validateHarness,
} from './lib/german-tense-harness-core.mjs'

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const args = Object.fromEntries(process.argv.slice(2).map((argument) => {
  const [key, ...parts] = argument.replace(/^--/, '').split('=')
  return [key, parts.length ? parts.join('=') : true]
}))
const mode = args.mode || 'inventory'
const harness = loadHarness(repoRoot)
const failures = validateHarness(harness, GERMAN_STRUCTURE_QUEST)

if (failures.length) {
  console.error(`German tense harness inválido (${failures.length})`)
  failures.forEach((failure) => console.error(`- ${failure}`))
  process.exit(1)
}

function runName(formId) {
  if (args.run) return String(args.run)
  const formRoot = path.join(repoRoot, harness.policy.artifactRoot, formId)
  if (!existsSync(formRoot)) return 'current'
  return readdirSync(formRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort()
    .at(-1) ?? 'current'
}

function runDirectory(formId) {
  return path.join(repoRoot, harness.policy.artifactRoot, formId, runName(formId))
}

function stateFor(formId) {
  const spec = harness.forms[formId]
  const directory = runDirectory(formId)
  const workOrderFile = path.join(directory, 'work-order.json')
  const workOrder = existsSync(workOrderFile) ? readJson(workOrderFile) : null
  const reports = existsSync(directory) ? readRunReports(directory, harness.policy) : {}
  const fingerprints = fingerprintsForForm(harness, GERMAN_STRUCTURE_QUEST, formId)
  return deriveState({
    approval: harness.approvals.approvals[formId],
    fingerprints,
    policy: harness.policy,
    reports,
    requiredRoles: requiredRoleIds(harness.policy, formId),
    spec,
    workOrder,
  })
}

function inventory() {
  const rows = GERMAN_STRUCTURE_QUEST.forms.map((form) => ({
    form: form.id,
    role: form.id === harness.policy.referenceForm ? 'referencia aprobada' : 'cola editorial',
    run: runName(form.id) === 'current' ? '—' : runName(form.id),
    state: stateFor(form.id),
  }))
  console.table(rows)
  return rows
}

if (mode === 'check') {
  console.log(`✓ German tense agent harness: ${Object.keys(harness.forms).length} formas, ${harness.policy.roles.length} agentes y ${harness.policy.runtimeGates.length} puertas`)
} else if (mode === 'inventory' || mode === 'status' || mode === 'report') {
  inventory()
} else if (mode === 'next') {
  const next = harness.campaign.queue.find((formId) => stateFor(formId) !== 'APPROVED')
  if (!next) console.log('No hay formas pendientes.')
  else console.log(JSON.stringify({ formId: next, state: stateFor(next), scaffold: `npm run german:harness:scaffold -- --form=${next}` }, null, 2))
} else if (mode === 'scaffold') {
  const formId = String(args.form || '')
  if (!harness.campaign.queue.includes(formId) && formId !== harness.policy.referenceForm) {
    throw new Error(`Usa --form con una forma conocida: ${Object.keys(harness.forms).join(', ')}`)
  }
  const directory = runDirectory(formId)
  const file = path.join(directory, 'work-order.json')
  if (existsSync(file) && !args.force) throw new Error(`${file} ya existe; usa --force solo para invalidar y recrear la orden`)
  mkdirSync(directory, { recursive: true })
  const baseCommit = execFileSync('git', ['rev-parse', 'HEAD'], { cwd: repoRoot, encoding: 'utf8' }).trim()
  const order = createWorkOrder(harness, GERMAN_STRUCTURE_QUEST, formId, baseCommit)
  writeFileSync(file, `${JSON.stringify(order, null, 2)}\n`)
  console.log(file)
} else {
  throw new Error(`Modo desconocido: ${mode}`)
}
