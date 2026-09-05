#!/usr/bin/env node

import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { GERMAN_STRUCTURE_QUEST } from '../src/data/practica/german-structure-quest-config.ts'
import {
  fingerprint,
  loadHarness,
  materializeFormContent,
  stableStringify,
} from './lib/german-tense-harness-core.mjs'

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const harness = loadHarness(repoRoot)
const categories = ['choice', 'micro', 'long', 'error', 'separation', 'finalStories']
const args = Object.fromEntries(process.argv.slice(2).map((argument) => {
  const [key, ...value] = argument.replace(/^--/u, '').split('=')
  return [key, value.length ? value.join('=') : true]
}))

function valueDiff(current, candidate, location = '$') {
  if (stableStringify(current) === stableStringify(candidate)) return []
  if (Array.isArray(current) && Array.isArray(candidate)) {
    const output = []
    const length = Math.max(current.length, candidate.length)
    for (let index = 0; index < length; index += 1) {
      if (index >= current.length) output.push({ path: `${location}[${index}]`, current: '<missing>', candidate: candidate[index] })
      else if (index >= candidate.length) output.push({ path: `${location}[${index}]`, current: current[index], candidate: '<missing>' })
      else output.push(...valueDiff(current[index], candidate[index], `${location}[${index}]`))
    }
    return output
  }
  if (current && candidate && typeof current === 'object' && typeof candidate === 'object') {
    const output = []
    const keys = [...new Set([...Object.keys(current), ...Object.keys(candidate)])].sort()
    for (const key of keys) {
      if (!Object.hasOwn(current, key)) output.push({ path: `${location}.${key}`, current: '<missing>', candidate: candidate[key] })
      else if (!Object.hasOwn(candidate, key)) output.push({ path: `${location}.${key}`, current: current[key], candidate: '<missing>' })
      else output.push(...valueDiff(current[key], candidate[key], `${location}.${key}`))
    }
    return output
  }
  return [{ path: location, current, candidate }]
}

function duplicateIds(items) {
  const seen = new Set()
  return items.map((item) => item?.id).filter((id) => seen.has(id) || !seen.add(id))
}

function compareCategory(currentItems, candidateItems, category) {
  const currentById = new Map(currentItems.map((item) => [item.id, item]))
  const candidateById = new Map(candidateItems.map((item) => [item.id, item]))
  const currentIds = currentItems.map((item) => item.id)
  const candidateIds = candidateItems.map((item) => item.id)
  const missingInRuntime = candidateIds.filter((id) => !currentById.has(id))
  const extraInRuntime = currentIds.filter((id) => !candidateById.has(id))
  const changed = currentIds
    .filter((id) => candidateById.has(id) && stableStringify(currentById.get(id)) !== stableStringify(candidateById.get(id)))
    .map((id) => ({
      id,
      currentFingerprint: fingerprint(currentById.get(id)),
      candidateFingerprint: fingerprint(candidateById.get(id)),
      changes: valueDiff(currentById.get(id), candidateById.get(id), `${category}.${id}`),
    }))
  return {
    category,
    currentCount: currentItems.length,
    candidateCount: candidateItems.length,
    currentDuplicateIds: duplicateIds(currentItems),
    candidateDuplicateIds: duplicateIds(candidateItems),
    orderMatches: stableStringify(currentIds) === stableStringify(candidateIds),
    missingInRuntime,
    extraInRuntime,
    changed,
    matches: missingInRuntime.length === 0
      && extraInRuntime.length === 0
      && changed.length === 0
      && stableStringify(currentIds) === stableStringify(candidateIds),
  }
}

function compareForm(formId) {
  const directory = path.join(repoRoot, harness.policy.artifactRoot, formId, String(args.run || 'round-1'))
  const authorFile = path.join(directory, 'author.json')
  if (!existsSync(authorFile)) return { formId, error: `Falta ${path.relative(repoRoot, authorFile)}`, matches: false }
  const author = JSON.parse(readFileSync(authorFile, 'utf8'))
  const current = materializeFormContent(GERMAN_STRUCTURE_QUEST, formId)
  const candidate = author.candidate?.runtime
  if (!candidate) return { formId, error: 'author.json no contiene candidate.runtime', matches: false }
  const comparisons = categories.map((category) => compareCategory(current[category] ?? [], candidate[category] ?? [], category))
  return {
    formId,
    currentRuntimeFingerprint: fingerprint(current),
    candidateRuntimeFingerprint: fingerprint(candidate),
    matches: comparisons.every((comparison) => comparison.matches),
    categories: comparisons,
  }
}

const forms = args.form
  ? String(args.form).split(',').map((formId) => formId.trim()).filter(Boolean)
  : harness.campaign.queue
const result = {
  schemaVersion: 1,
  referenceForm: harness.policy.referenceForm,
  forms: forms.map(compareForm),
}
result.matches = result.forms.every((form) => form.matches)

if (typeof args.json === 'string') writeFileSync(path.resolve(repoRoot, args.json), `${JSON.stringify(result, null, 2)}\n`)

for (const form of result.forms) {
  if (form.error) {
    console.log(`${form.formId}\tERROR\t${form.error}`)
    continue
  }
  const changedIds = form.categories.flatMap((category) => category.changed.map((item) => `${category.category}:${item.id}`))
  const missingIds = form.categories.flatMap((category) => category.missingInRuntime.map((id) => `${category.category}:${id}`))
  const extraIds = form.categories.flatMap((category) => category.extraInRuntime.map((id) => `${category.category}:${id}`))
  const order = form.categories.filter((category) => !category.orderMatches).map((category) => category.category)
  console.log(`${form.formId}\t${form.matches ? 'MATCH' : 'DIFF'}\tchanged=${changedIds.length}\tmissing=${missingIds.length}\textra=${extraIds.length}\torder=${order.join(',') || 'ok'}`)
  if (changedIds.length) console.log(`  changed: ${changedIds.join(', ')}`)
  if (missingIds.length) console.log(`  missing: ${missingIds.join(', ')}`)
  if (extraIds.length) console.log(`  extra: ${extraIds.join(', ')}`)
}

process.exitCode = result.matches ? 0 : 1
